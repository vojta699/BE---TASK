import db from '../db/knex';
import { CharacterDAO } from '../dao/character.dao';

function yearsBetween(from: Date, to = new Date()): number {
  const diff = to.getTime() - from.getTime();
  const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
  return Math.floor(diff / msPerYear);
}

export const StatsService = {
  async compute() {
    const [characters, nemeses, weightRow] = await Promise.all([
      db('character').select('id', 'born', 'gender'),
      db('nemesis').select('id', 'born'),
      db('character').avg<{ avg: string }>('weight as avg').first()
    ]);

    const characters_count = characters.length;
    const genders = (await CharacterDAO.genderCounts());

    const charAges = characters
      .filter((c: any) => c.born)
      .map((c: any) => yearsBetween(new Date(c.born)));
    const nemAges = nemeses
      .filter((n: any) => n.born)
      .map((n: any) => yearsBetween(new Date(n.born)));

    const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

    return {
      characters_count,
      average_age: {
        characters: Number(avg(charAges).toFixed(2)),
        nemeses: Number(avg(nemAges).toFixed(2))
      },
      average_weight: weightRow?.avg ? Number(Number(weightRow.avg).toFixed(2)) : 0,
      genders
    };
  }
};