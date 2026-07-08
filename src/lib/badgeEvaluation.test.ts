import { describe, expect, it } from "vitest";
import { countStepsCompleted, isEarned, isImplementedMetricType } from "./badgeEvaluation";

describe("isEarned", () => {
  it("evaluates less-than", () => {
    expect(isEarned(2, "<", 5)).toBe(true);
    expect(isEarned(5, "<", 5)).toBe(false);
  });

  it("evaluates greater-than", () => {
    expect(isEarned(6, ">", 5)).toBe(true);
    expect(isEarned(5, ">", 5)).toBe(false);
  });

  it("evaluates equals", () => {
    expect(isEarned(5, "=", 5)).toBe(true);
    expect(isEarned(4, "=", 5)).toBe(false);
  });
});

describe("countStepsCompleted", () => {
  it("returns 0 for a null row", () => {
    expect(countStepsCompleted(null)).toBe(0);
  });

  it("counts only the completed steps", () => {
    expect(
      countStepsCompleted({
        one_question_challenge: 1,
        wayfair_tool: 1,
        values_and_beliefs: 0,
        finding_your_purpose: 0,
        new_skills: 0,
        retirement: 0,
        give_back_step: 0,
      }),
    ).toBe(2);
  });

  it("counts all seven when fully complete", () => {
    expect(
      countStepsCompleted({
        one_question_challenge: 1,
        wayfair_tool: 1,
        values_and_beliefs: 1,
        finding_your_purpose: 1,
        new_skills: 1,
        retirement: 1,
        give_back_step: 1,
      }),
    ).toBe(7);
  });
});

describe("isImplementedMetricType", () => {
  it("accepts the metrics with real data sources", () => {
    expect(isImplementedMetricType("steps_completed")).toBe(true);
    expect(isImplementedMetricType("feedback_given")).toBe(true);
    expect(isImplementedMetricType("assignments_completed")).toBe(true);
  });

  it("rejects metrics with no tracking source yet", () => {
    expect(isImplementedMetricType("articles_read")).toBe(false);
    expect(isImplementedMetricType("videos_seen")).toBe(false);
    expect(isImplementedMetricType("podcasts_listened")).toBe(false);
  });

  it("rejects unrecognized values", () => {
    expect(isImplementedMetricType("not_a_metric")).toBe(false);
  });
});
