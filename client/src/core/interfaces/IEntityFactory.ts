export enum EntityType {
  Mass = 1,
  Player,
}

export interface IEntityFactory {
  name: string;
  move(): void;
}
