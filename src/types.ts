export type AircraftType = 'Helicóptero' | 'Turboélice' | 'Jato';

export interface Aircraft {
  id: string;
  model: string;
  type: AircraftType;
  capacity: number;
  luggage: string;
  range: string;
  pricePerHour: number;
  image: string;
  interiorImage: string;
  gallery?: string[];
  shareLinks?: string[];
  description: string;
}

export interface City {
  name: string;
  state: string;
  lat: number;
  lng: number;
}

export interface Budget {
  origin: string;
  destination: string;
  date: string;
  time: string;
  aircraftId: string;
  passengers: number;
  pets: boolean;
  extraLuggage: boolean;
}
