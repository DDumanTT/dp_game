export enum EntityType {
  Enemy,
  Player,
}

export interface PickupArtifact {
  name: string;
  ability(): void;
}

export enum CirclePickupType {
  Grow,
  Speed,
}

export enum SquarePickupType {
  Grow,
  Speed,
}
