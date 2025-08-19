import db from '../db/knex';
import type { CharacterRow } from '../types/character.type';
import type { NemesisRow } from '../types/nemesis.type';
import type { SecretRow } from '../types/secret.type';

export const CharacterDAO = {
  async listAll(limit?: number, offset?: number): Promise<CharacterRow[]> {
    let q = db<CharacterRow>('character').select('*').orderBy('id');
    if (typeof limit === 'number') q = q.limit(limit);
    if (typeof offset === 'number') q = q.offset(offset);
    return q;
  },

  async listNemesesByCharacterIds(charIds: number[]): Promise<NemesisRow[]> {
    if (!charIds.length) return [];
    return db<NemesisRow>('nemesis')
      .select('*')
      .whereIn('character_id', charIds)
      .orderBy('id');
  },

  async listSecretsByNemesisIds(nemesisIds: number[]): Promise<SecretRow[]> {
    if (!nemesisIds.length) return [];
    return db<SecretRow>('secret')
      .select('*')
      .whereIn('nemesis_id', nemesisIds)
      .orderBy('id');
  },

  async countCharacters(): Promise<number> {
    const r = await db('character').count<{ count: string }>('id as count').first();
    return Number(r?.count ?? 0);
  },
};