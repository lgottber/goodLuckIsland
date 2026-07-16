import { describe, expect, it } from "vitest";
import { computeScores, scoreBand, scoreColor } from "./pinwirlScoring";

describe("scoreBand", () => {
  it("buckets scores at the 40/60/80 boundaries", () => {
    expect(scoreBand(0)).toBe("Needs Attention");
    expect(scoreBand(39)).toBe("Needs Attention");
    expect(scoreBand(40)).toBe("Developing");
    expect(scoreBand(59)).toBe("Developing");
    expect(scoreBand(60)).toBe("Building Strength");
    expect(scoreBand(79)).toBe("Building Strength");
    expect(scoreBand(80)).toBe("Strong");
    expect(scoreBand(100)).toBe("Strong");
  });
});

describe("scoreColor", () => {
  it("returns a color matching each band's boundary", () => {
    expect(scoreColor(39)).toBe("#ff7b7b");
    expect(scoreColor(40)).toBe("#ffd073");
    expect(scoreColor(59)).toBe("#ffd073");
    expect(scoreColor(60)).toBe("#a8e6df");
    expect(scoreColor(79)).toBe("#a8e6df");
    expect(scoreColor(80)).toBe("#ffffff");
  });
});

describe("computeScores", () => {
  const questions = [
    { external_id: "q1", section: "Physical", question_type: "scale" },
    { external_id: "q2", section: "Physical", question_type: "scale" },
    { external_id: "q3", section: "Physical", question_type: "text" },
    { external_id: "q4", section: "Emotional", question_type: "scale" },
  ];

  it("averages scale answers per dimension and scales to 0-100", () => {
    const scores = computeScores({ q1: 5, q2: 7 }, questions);
    // avg(5,7) = 6 -> 6 * 10 = 60
    expect(scores.Physical).toBe(60);
  });

  it("ignores non-scale questions even if answered", () => {
    const scores = computeScores({ q1: 5, q2: 7, q3: 9 }, questions);
    expect(scores.Physical).toBe(60);
  });

  it("returns 0 for a dimension with no answers", () => {
    const scores = computeScores({}, questions);
    expect(scores.Physical).toBe(0);
    expect(scores.Emotional).toBe(0);
  });

  it("drops out-of-range or non-numeric answers before averaging", () => {
    const scores = computeScores({ q1: 5, q2: 11 }, questions);
    // q2=11 is out of the 1-10 range and dropped, so only q1=5 counts
    expect(scores.Physical).toBe(50);
  });

  it("drops empty-string and undefined answers", () => {
    const scores = computeScores({ q1: 5, q2: "" }, questions);
    expect(scores.Physical).toBe(50);
  });

  it("accepts numeric strings", () => {
    const scores = computeScores({ q1: "5", q2: "7" }, questions);
    expect(scores.Physical).toBe(60);
  });

  it("returns a score for every dimension, including ones absent from the question list", () => {
    const scores = computeScores({}, questions);
    expect(Object.keys(scores).sort()).toEqual(
      [
        "Physical",
        "Emotional",
        "Intellectual",
        "Spiritual",
        "Social",
        "Environmental",
        "Purpose / Vision / Mission",
        "Financial",
      ].sort(),
    );
  });
});
