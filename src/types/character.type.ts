import { Gender } from "./global.types";

export interface CharacterRow {
  id: number;
  name: string;
  gender: Gender;
  ability: string | null;
  minimal_distance: number | null;
  weight: number | null;
  born: Date;
  in_space_since: Date | null;
  beer_consumption: number | null;
  knows_the_answer: boolean | null;
}