import { Application } from "pixi.js";
import IAutoService from "../interfaces/IAutoService";

export default abstract class CommunicatorBase implements IAutoService {
    protected uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }
    abstract execute(app: Application): void;
}