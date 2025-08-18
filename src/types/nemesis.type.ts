import { Gender } from "./global.types";

export interface NemesisRow {
  id: number;
  character_id: number;
  name: string | null;
  gender: Gender | null;
  born: Date | null;
  is_alive: boolean;
}