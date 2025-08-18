import { CharacterDAO } from '../dao/character.dao';

export const CharacterService = {
  listTree: () => CharacterDAO.listAsTree()
};