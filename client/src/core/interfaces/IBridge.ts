import MainPlayer from "../../components/MainPlayer";

export default interface IBridge{
    activate(player: MainPlayer): void;
    destroy(): void;
}