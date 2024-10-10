import { Record } from "./weather";

export type Response = {
  message: string;
  cod: string;
  count: number;
  list: Record[];
};
