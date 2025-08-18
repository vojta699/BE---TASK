import db from '../db/knex';
import type { TreeNode } from '../types/global.types.js';
import type { CharacterRow } from '../types/character.type';

export const CharacterDAO = {
  async listAll(): Promise<CharacterRow[]> {
    return db<CharacterRow>('character').select('*').orderBy('id');
  },

  async listAsTree(): Promise<Array<TreeNode<CharacterRow>>> {
    const chars = await db<CharacterRow>('character').select('*');
    const nemeses = await db('nemesis').select('*');
    const secrets = await db('secret').select('*');

    const secretsByNemesis = new Map<number, any[]>();
    for (const s of secrets) {
      const arr = secretsByNemesis.get(s.nemesis_id) || [];
      arr.push({ data: s, children: {} });
      secretsByNemesis.set(s.nemesis_id, arr);
    }

    const nemesesByChar = new Map<number, any[]>();
    for (const n of nemeses) {
      const arr = nemesesByChar.get(n.character_id) || [];
      arr.push({
        data: n,
        children: {
          has_secret: { records: (secretsByNemesis.get(n.id) || []) }
        }
      });
      nemesesByChar.set(n.character_id, arr);
    }

    const tree = chars.map(ch => ({
      data: ch,
      children: {
        has_nemesis: { records: (nemesesByChar.get(ch.id) || []) }
      }
    }));

    return tree;
  },

  async countCharacters(): Promise<number> {
    const r = await db('character').count<{ count: string }>('id as count').first();
    return Number(r?.count ?? 0);
  },

  async genderCounts(): Promise<Record<string, number>> {
    const rows = await db('character')
      .select('gender')
      .count<{ gender: string; count: string }[]>({ count: 'id' })
      .groupBy('gender');
    const out: Record<string, number> = { female: 0, male: 0, other: 0 };
    for (const row of rows) out[row.gender] = Number(row.count);
    return out;
  }
};