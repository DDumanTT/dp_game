import IEntity from "../interfaces/IEntity";
import IEntities from "../interfaces/IEntities";

export default class Entities implements IEntities {
  private _entities: Array<IEntity>;

  constructor(entities: Array<IEntity>) {
    this._entities = entities;
  }

  entities(): Array<IEntity> {
    return this._entities;
  }
}
