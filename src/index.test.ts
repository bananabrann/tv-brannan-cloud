import { describe, it, expect } from "vitest";

describe("sum test", () => {
  it("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

describe("hello test", () => {
  it("says hello world", () => {
    expect("hello world").toBe("hello world");
  });
});
