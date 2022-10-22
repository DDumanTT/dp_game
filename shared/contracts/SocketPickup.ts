import PickupType from "../constants/PickupType";
import SocketPosition from "./SocketPosition";

export default class SocketPickup {
  public id: number;
  public position: SocketPosition;
  public type: PickupType;
}
