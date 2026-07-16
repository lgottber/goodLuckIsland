import { beforeEach, describe, expect, it } from "vitest";
import {
  clearPendingAccountDeletion,
  getPendingAccountDeletion,
  midnightAfter,
  PENDING_ACCOUNT_DELETION_KEY,
  setPendingAccountDeletion,
} from "./pendingAccountDeletion";

// vitest's default "node" environment has no localStorage global; this repo
// has no jsdom dependency, so stub the minimal Storage surface these
// functions actually use.
function installLocalStorageStub() {
  const store = new Map<string, string>();
  const stub = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: stub,
    configurable: true,
  });
  return stub;
}

beforeEach(() => {
  installLocalStorageStub();
});

describe("setPendingAccountDeletion / getPendingAccountDeletion", () => {
  it("returns null when nothing has been set", () => {
    expect(getPendingAccountDeletion()).toBeNull();
  });

  it("round-trips a requestedAt timestamp", () => {
    setPendingAccountDeletion();
    const result = getPendingAccountDeletion();
    expect(result).not.toBeNull();
    expect(typeof result?.requestedAt).toBe("string");
    expect(Number.isNaN(new Date(result!.requestedAt).getTime())).toBe(false);
  });

  it("returns null for malformed JSON", () => {
    localStorage.setItem(PENDING_ACCOUNT_DELETION_KEY, "not json");
    expect(getPendingAccountDeletion()).toBeNull();
  });

  it("returns null when the stored shape is missing requestedAt", () => {
    localStorage.setItem(PENDING_ACCOUNT_DELETION_KEY, JSON.stringify({ foo: "bar" }));
    expect(getPendingAccountDeletion()).toBeNull();
  });
});

describe("clearPendingAccountDeletion", () => {
  it("removes the stored value", () => {
    setPendingAccountDeletion();
    clearPendingAccountDeletion();
    expect(getPendingAccountDeletion()).toBeNull();
  });
});

describe("midnightAfter", () => {
  it("returns local midnight on the calendar day after the given timestamp", () => {
    const result = midnightAfter("2026-07-04T15:30:00.000Z");
    const requested = new Date("2026-07-04T15:30:00.000Z");
    expect(result.getFullYear()).toBe(requested.getFullYear());
    expect(result.getMonth()).toBe(requested.getMonth());
    expect(result.getDate()).toBe(requested.getDate() + 1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("rolls over into the next month correctly", () => {
    const result = midnightAfter(new Date(2026, 0, 31, 12, 0, 0).toISOString());
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(1);
  });
});
