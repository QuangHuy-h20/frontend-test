export type Record = {
  id: number;
  name: string;
  coord: Coord;
  main: Main;
  dt: number;
  wind: Wind;
  sys: Sys;
  rain: unknown;
  snow: unknown;
  clouds: Clouds;
  weather: Weather[];
  recordTime?: string;
};

export type Coord = {
  lat: number;
  lon: number;
};

export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

export type Wind = {
  speed: number;
  deg: number;
};

export type Sys = {
  country: string;
};

export type Clouds = {
  all: number;
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
