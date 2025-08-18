import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

  const existing = await knex('character').count<{ count: string }>('id as count').first();
  if (existing && Number(existing.count) > 0) {
    console.log('Seed skipped: characters already exist.');
    return;
  }

  const genders = ['female', 'male', 'other'] as const;
  const abilities = ['mathematician', 'engineer', 'pilot', 'scientist', 'explorer', null];

  const characterIds: number[] = [];

  for (let i = 1; i <= 20; i++) {
    const [charId] = await knex('character')
      .insert({
        name: `Character ${i}`,
        gender: genders[Math.floor(Math.random() * genders.length)],
        ability: abilities[Math.floor(Math.random() * abilities.length)],
        minimal_distance: Number((Math.random() * 10).toFixed(2)),
        weight: Math.floor(Math.random() * 50) + 50,
        born: `19${Math.floor(Math.random() * 50 + 50)}-01-01`,
        in_space_since: `20${Math.floor(Math.random() * 20 + 0)}-01-01`,
        beer_consumption: Math.floor(Math.random() * 10000),
        knows_the_answer: Math.random() < 0.5
      })
      .returning('id');

    characterIds.push(charId.id ?? charId);
  }

  for (const charId of characterIds) {
    const nemesisCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 1; j <= nemesisCount; j++) {
      const [nemId] = await knex('nemesis')
        .insert({
          character_id: charId,
          name: `Nemesis ${charId}-${j}`,
          gender: genders[Math.floor(Math.random() * genders.length)],
          born: `19${Math.floor(Math.random() * 50 + 50)}-06-15`,
          is_alive: Math.random() < 0.9
        })
        .returning('id');

      const secretCount = Math.floor(Math.random() * 2) + 1;
      for (let k = 0; k < secretCount; k++) {
        await knex('secret').insert({
          nemesis_id: nemId.id ?? nemId,
          secret_code: Math.floor(Math.random() * 1000000000)
        });
      }
    }
  }

  console.log('Seed completed: 20 characters with nemeses and secrets generated.');
}