// @ts-nocheck
import { beforeEach, describe, expect, test } from "vitest";

import PlayerService from "../src/services/PlayerService";
import config from "@shared/config";

describe("PlayerService", () => {
  beforeEach(() => {
    PlayerService.getInstance = () => new PlayerService();
  });

  test("Spawned player should be within world bounds", () => {
    const playerService = PlayerService.getInstance();

    const player = playerService.spawnPlayer("", "", 0);

    expect(player.position.x).toBeGreaterThanOrEqual(0);
    expect(player.position.x).toBeLessThanOrEqual(config.world.width);
    expect(player.position.y).toBeGreaterThanOrEqual(0);
    expect(player.position.y).toBeLessThanOrEqual(config.world.height);
  });

  test("Spawned player fields should match", () => {
    const playerService = PlayerService.getInstance();

    const id = "test_id";
    const name = "test_name";
    const color = 1;

    const player = playerService.spawnPlayer(id, name, color);

    expect(player.id).toBe(id);
    expect(player.name).toBe(name);
    expect(player.color).toBe(color);
  });

  test("New player added to players list", () => {
    const playerService = PlayerService.getInstance();

    const id = "test";

    playerService.spawnPlayer(id, "test", 0);

    const players = playerService.getPlayers();

    expect(players[0].id).toBe(id);
  });

  test("Remove player from players list", () => {
    const playerService = PlayerService.getInstance();

    const id = "remove_me";

    playerService.spawnPlayer(id, "test", 0);

    playerService.removePlayerById(id);

    expect(playerService.getPlayers().find((p) => p.id === id)).toBeUndefined();
  });

  test("Update player", () => {
    const playerService = PlayerService.getInstance();

    const id = "update_me";
    const new_size = 10;
    const new_x = 10;
    const new_y = 10;

    const player = playerService.spawnPlayer(id, "test", 0);

    playerService.updatePlayerPosition({
      ...player,
      size: new_size,
      position: { x: new_x, y: new_y },
    });

    expect(player.id).toBe(id);
    expect(player.size).toBe(new_size);
    expect(player.position.x).toBe(new_x);
    expect(player.position.y).toBe(new_y);
  });
});
