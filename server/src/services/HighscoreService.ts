import IPlayerService from "src/interfaces/IPlayerService";

export default class HighScoreService {
    private readonly _playerService: IPlayerService;
    constructor(playerService: IPlayerService) {
        this._playerService = playerService;
    }
}