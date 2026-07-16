import { describe, expect, it } from "vitest";
import { MAX_ONE_QUESTION_TOTAL, parseAnswerTotal } from "./oneQuestionTotal";

describe("parseAnswerTotal", () => {
  it("parses a valid numeric string", () => {
    expect(parseAnswerTotal("7")).toBe(7);
  });

  it("returns 0 for null, empty, or non-numeric input", () => {
    expect(parseAnswerTotal(null)).toBe(0);
    expect(parseAnswerTotal("")).toBe(0);
    expect(parseAnswerTotal("abc")).toBe(0);
  });

  it("returns 0 for a negative value instead of throwing on Array(-1)", () => {
    expect(parseAnswerTotal("-5")).toBe(0);
  });

  it("clamps values above the max instead of allocating an unbounded array", () => {
    expect(parseAnswerTotal("999999999")).toBe(MAX_ONE_QUESTION_TOTAL);
    expect(parseAnswerTotal(String(MAX_ONE_QUESTION_TOTAL + 1))).toBe(MAX_ONE_QUESTION_TOTAL);
  });

  it("allows exactly the max", () => {
    expect(parseAnswerTotal(String(MAX_ONE_QUESTION_TOTAL))).toBe(MAX_ONE_QUESTION_TOTAL);
  });
});
