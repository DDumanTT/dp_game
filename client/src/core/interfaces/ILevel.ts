import { IPickupFactory } from "./../Factories/AbstractFactory";
import { Dict } from "@pixi/utils";
import { Application, Container, Loader, LoaderResource } from "pixi.js";

export default interface ILevel {
  get pickupFactory(): IPickupFactory;
  container: Container;
  load(app: Application): void;
  addToContainer(): void;
  loadAssets(): void;
  loadSprites(loader: Loader, resources: Dict<LoaderResource>): void;
}
