export interface IPlanet {
  name: string;
  climate: string;
  diameter: string;
  orbital_period: string;
  rotation_period: string;
  surface_water: string;
  created?: string;
  edited?: string;
  url?: string;
  gravity?: string;
  terrain?: string;
  population?: string;
  more_info?: string;
}

export interface IData {
  count: string;
  next: string;
  previous: string;
  results: IPlanet[];
}
