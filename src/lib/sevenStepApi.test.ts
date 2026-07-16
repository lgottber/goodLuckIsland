import { describe, expect, it } from "vitest";
import { countCompleted, isStepLocked, type UserProgress } from "./sevenStepApi";

const allDone: UserProgress = {
  one_question_challenge: true,
  wayfair_tool: true,
  values_and_beliefs: true,
  finding_your_purpose: true,
  new_skills: true,
  retirement: true,
  give_back_step: true,
};

const noneDone: UserProgress = {
  one_question_challenge: false,
  wayfair_tool: false,
  values_and_beliefs: false,
  finding_your_purpose: false,
  new_skills: false,
  retirement: false,
  give_back_step: false,
};

describe("countCompleted", () => {
  it("returns 0 for null progress", () => {
    expect(countCompleted(null)).toBe(0);
  });

  it("returns 0 when nothing is completed", () => {
    expect(countCompleted(noneDone)).toBe(0);
  });

  it("returns 7 when everything is completed", () => {
    expect(countCompleted(allDone)).toBe(7);
  });

  it("counts only the completed steps", () => {
    expect(countCompleted({ ...noneDone, one_question_challenge: true, retirement: true })).toBe(2);
  });
});

describe("isStepLocked", () => {
  it("never locks the first step", () => {
    expect(isStepLocked(0, null)).toBe(false);
    expect(isStepLocked(0, noneDone)).toBe(false);
  });

  it("locks every subsequent step when progress is null", () => {
    expect(isStepLocked(1, null)).toBe(true);
    expect(isStepLocked(6, null)).toBe(true);
  });

  it("locks a step when the previous step isn't complete", () => {
    expect(isStepLocked(1, noneDone)).toBe(true);
  });

  it("unlocks a step once the previous step is complete", () => {
    expect(isStepLocked(1, { ...noneDone, one_question_challenge: true })).toBe(false);
  });

  it("unlocks the last step when everything before it is complete", () => {
    expect(isStepLocked(6, { ...allDone, give_back_step: false })).toBe(false);
  });
});
