import db from '../db/knex';
import { normalizeGender } from './character.service';

function yearsBetween(from: Date, to = new Date()): number {
  const diff = to.getTime() - from.getTime();
  const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
  return Math.floor(diff / msPerYear);
}

export const StatsService = {
  async compute() {
    const [characters, nemeses, weightRow] = await Promise.all([
      db('character').select('id', 'born', 'gender'),
      db('nemesis').select('id', 'years'),
      db('character').avg<{ avg: string }>('weight as avg').first()
    ]);

    const characters_count = characters.length;

    const genders = characters.reduce(
      (acc, c) => {
        const g = normalizeGender(c.gender);
        acc[g] = (acc[g] || 0) + 1;
        return acc;
      },
      { male: 0, female: 0, other: 0 }
    );

    const charAges = characters
      .filter(c => c.born)
      .map(c => new Date().getFullYear() - new Date(c.born).getFullYear());
    const nemAges = nemeses
      .filter((n: any) => n.years)
      .map((n: any) => yearsBetween(new Date(n.years)));

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