import { Application } from "pixi.js";

export default interface AutoService {
    execute(app: Application): void;
}