import { test, expect, beforeEach, vi, describe } from "vitest";
import { mock } from "vitest-mock-extended";
import { LeaderBoardHelper } from "../src/assets/Leaderboard";

describe("LeaderBoardTest", () => {
  beforeEach(() => {});
  // Parameterized test that contains stub and mock
  test("Testing div component", () => {
    const text = "DASDA";
    // Arrange
    const leaderboard = new LeaderBoardHelper();
    const emptydiv = leaderboard.addDiv(text);
    expect(emptydiv).equals(`<div>${text}</div>`);
  });

  test("Testing empty div component", () => {
    const text = "";
    const leaderboard = new LeaderBoardHelper();
    const emptydiv = leaderboard.addDiv(text);
    expect(emptydiv).equals(`<div>${text}</div>`);
  });

  test("Testing ul component", () => {
    const text = "DASDA";
    const leaderboard = new LeaderBoardHelper();
    const emptydiv = leaderboard.addUl(text);
    expect(emptydiv).equals(`<ul>${text}</ul>`);
  });

  test("Testing empty ul domponent", () => {
    const text = "";
    const leaderboard = new LeaderBoardHelper();
    const emptyUl = leaderboard.addUl(text);
    expect(emptyUl).equals(`<ul>${text}</ul>`);
  });

  test("Testing li component", () => {
    const text = "DASDA";
    const leaderboard = new LeaderBoardHelper();
    const emptydiv = leaderboard.addLi(text);
    expect(emptydiv).equals(`${text}<br/>`);
  });

  test("Testing empty li component", () => {
    const text = "";
    const leaderboard = new LeaderBoardHelper();
    const emptydiv = leaderboard.addLi(text);
    expect(emptydiv).equals(`${text}<br/>`);
  });
});
