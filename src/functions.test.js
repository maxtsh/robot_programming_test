import { vi } from "vitest";
import { detectLanguage } from "./functions";

describe("Detect language", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("English Test", () => {
    const mock = vi.fn().mockImplementation(detectLanguage);
    const { left, right, forward } = mock("RFRFFRFRF");
    expect(mock).toHaveBeenCalledTimes(1);
    expect(left).toBe("l");
    expect(right).toBe("r");
    expect(forward).toBe("f");
  });

  test("Swedish Test", () => {
    const mock = vi.fn().mockImplementation(detectLanguage);
    const { left, right, forward } = mock("VGGHGHGHGG");
    expect(mock).toHaveBeenCalledTimes(1);
    expect(left).toBe("v");
    expect(right).toBe("h");
    expect(forward).toBe("g");
  });

  test("French Test", () => {
    const mock = vi.fn().mockImplementation(detectLanguage);
    const { left, right, forward } = mock("GAADADADAA");
    expect(mock).toHaveBeenCalledTimes(1);
    expect(left).toBe("g");
    expect(right).toBe("d");
    expect(forward).toBe("a");
  });
});
