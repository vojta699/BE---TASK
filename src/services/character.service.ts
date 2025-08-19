import { CharacterDAO } from '../dao/character.dao';
import type { TreeNode } from '../types/global.types';
import type { CharacterRow } from '../types/character.type';
import type { Gender } from '../types/global.types';

const normalizeCharacter = (r: any): CharacterRow => ({
  id: r.id,
  name: r.name,
  gender: normalizeGender(r.gender),
  ability: r.ability ?? null,
  minimal_distance: r.minimal_distance ? Number(r.minimal_distance) : null,
  weight: r.weight ? Number(r.weight) : null,
  born: new Date(r.born),
  in_space_since: r.in_space_since ? new Date(r.in_space_since) : null,
  beer_consumption: r.beer_consumption !== null ? Number(r.beer_consumption) : null,
  knows_the_answer: Boolean(r.knows_the_answer),
});

export const normalizeGender = (g: string | null): Gender => {
  if (!g) return 'other';
  const low = g.toLowerCase();
  if (['m', 'male'].includes(low)) return 'male';
  if (['f', 'female'].includes(low)) return 'female';
  return 'other';
};

export const CharacterService = {
  async listTree(limit?: number, offset?: number): Promise<Array<TreeNode<CharacterRow>>> {
    // 1) Load characters
    const characters = await CharacterDAO.listAll(limit, offset);
    const charIds = characters.map(c => c.id);

    // 2) Load nemesis and secret
    const nemeses = await CharacterDAO.listNemesesByCharacterIds(charIds);
    const nemesisIds = nemeses.map(n => n.id);
    const secrets = await CharacterDAO.listSecretsByNemesisIds(nemesisIds);

    // 3) Group secrets by nemesis_id
    const secretsByNem = new Map<number, TreeNode<any>[]>();
    secrets.forEach(s => {
      const arr = secretsByNem.get(s.nemesis_id) || [];
      arr.push({ data: s, children: {} });
      secretsByNem.set(s.nemesis_id, arr);
    });

    // 4) Group nemesis by character_id
    const nemesesByChar = new Map<number, TreeNode<any>[]>();
    nemeses.forEach(n => {
      const arr = nemesesByChar.get(n.character_id) || [];
      arr.push({
        data: n,
        children: { has_secret: { records: secretsByNem.get(n.id) || [] } },
      });
      nemesesByChar.set(n.character_id, arr);
    });

    // 5) Build tree
    return characters.map(c => ({
      data: normalizeCharacter(c),
      children: { has_nemesis: { records: nemesesByChar.get(c.id) || [] } },
    }));
  },
};