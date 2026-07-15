import { KeyboardEvent, useEffect, useState } from "react";
import Field from "./Field";
import InterestTagList from "./InterestTagList";
import PillGroup from "./PillGroup";
import GenderField from "./GenderField";
import { useDebounce } from "../../hooks/useDebounce";
import { isValidZip } from "../../lib/zip";
import type { ProfileForm, SetField } from "./types";

const HOUSEHOLD_COMPOSITION_OPTIONS = [
  "Empty nest",
  "Adult children at home",
  "Caregiver for parents",
  "Multigenerational household",
  "Living alone",
];

const GEO_CLASSIFIER_OPTIONS = ["Urban", "Suburban", "Rural"];

interface ZipLookupResponse {
  places?: { "place name": string; "state abbreviation": string }[];
}

export default function BasicInfoTab({
  form,
  set,
  interestInput,
  setInterestInput,
  addInterest,
  removeInterest,
}: {
  form: Pick<ProfileForm, "firstName" | "lastName" | "username" | "age" | "email" | "zipCode" | "city" | "state" | "address" | "bio" | "mantra" | "interests" | "gender" | "householdComposition" | "geoClassifier">;
  set: SetField;
  interestInput: string;
  setInterestInput: (v: string) => void;
  addInterest: (e: KeyboardEvent<HTMLInputElement>) => void;
  removeInterest: (tag: string) => void;
}) {
  const [zipStatus, setZipStatus] = useState<"idle" | "loading" | "found" | "not_found" | "error">("idle");
  const debouncedZip = useDebounce(form.zipCode, 400);

  // Auto-populate city/state from the ZIP -- both stay editable afterward,
  // so this only overwrites what the lookup actually returns.
  useEffect(() => {
    if (!isValidZip(debouncedZip)) {
      setZipStatus("idle");
      return;
    }
    const controller = new AbortController();
    setZipStatus("loading");
    async function lookupZip(): Promise<ZipLookupResponse> {
      const res = await fetch(`https://api.zippopotam.us/us/${debouncedZip}`, { signal: controller.signal });
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    }
    lookupZip()
      .then((data) => {
        const place = data.places?.[0];
        if (!place) {
          setZipStatus("not_found");
          return;
        }
        set("city", place["place name"]);
        set("state", place["state abbreviation"]);
        setZipStatus("found");
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (err === 404) setZipStatus("not_found");
        else setZipStatus("error");
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run on the debounced zip changing
  }, [debouncedZip]);

  const zipHint =
    zipStatus === "loading"
      ? "Looking up city & state…"
      : zipStatus === "not_found"
      ? "ZIP code not found — you can still fill in city/state manually"
      : zipStatus === "error"
      ? "Couldn't look up that ZIP — you can still fill in city/state manually"
      : "5-digit US ZIP, required — auto-fills city & state below";
  const zipTouched = (form.zipCode?.length ?? 0) > 0;
  const zipError = zipTouched && !isValidZip(form.zipCode) ? "Enter a valid 5-digit ZIP code" : null;

  return (
    <div className="edit-modal-body">
      <div className="modal-section-label">Identity</div>
      <Field label="First Name">
        <input
          type="text"
          value={form.firstName}
          onChange={(e) => set("firstName", e.target.value)}
          placeholder="First name"
        />
      </Field>
      <Field label="Last Name">
        <input
          type="text"
          value={form.lastName}
          onChange={(e) => set("lastName", e.target.value)}
          placeholder="Last name"
        />
      </Field>
      <Field label="Username">
        <input
          type="text"
          value={form.username}
          onChange={(e) => set("username", e.target.value)}
          placeholder="@username"
        />
      </Field>
      <Field label="Age">
        <input
          type="number"
          value={form.age}
          onChange={(e) => set("age", e.target.value)}
          placeholder="e.g. 52"
          min="1"
          max="120"
        />
      </Field>
      <Field label="Email">
        <input
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
        />
      </Field>

      <div className="modal-section-label modal-section-label--spaced">
        Location
      </div>
      <div className="field-row">
        <Field label="Zip Code" hint={zipError ?? zipHint} error={!!zipError}>
          <input
            type="text"
            inputMode="numeric"
            value={form.zipCode}
            onChange={(e) => set("zipCode", e.target.value.replace(/[^0-9]/g, "").slice(0, 5))}
            placeholder="e.g. 90210"
            maxLength={5}
          />
        </Field>
        <Field label="City (optional)">
          <input
            type="text"
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="City"
          />
        </Field>
        <Field label="State (optional)">
          <input
            type="text"
            value={form.state}
            onChange={(e) => set("state", e.target.value)}
            placeholder="State"
          />
        </Field>
      </div>
      <Field label="Mailing Address" hint="So we can send you gifts 🎁">
        <input
          type="text"
          value={form.address}
          onChange={(e) => set("address", e.target.value)}
          placeholder="Street, City, State, ZIP"
        />
      </Field>
      <Field label="Area Type">
        <PillGroup
          options={GEO_CLASSIFIER_OPTIONS}
          value={form.geoClassifier}
          onChange={(v) => set("geoClassifier", v)}
        />
      </Field>

      <div className="modal-section-label modal-section-label--spaced">
        Demographics
      </div>
      <Field label="Gender">
        <GenderField value={form.gender} onChange={(v) => set("gender", v)} />
      </Field>
      <Field label="Household Composition">
        <PillGroup
          options={HOUSEHOLD_COMPOSITION_OPTIONS}
          value={form.householdComposition}
          onChange={(v) => set("householdComposition", v)}
        />
      </Field>

      <div className="modal-section-label modal-section-label--spaced">
        About You
      </div>
      <Field label="Mantra" hint={`${(form.mantra || "").length} / 120 characters`}>
        <input
          type="text"
          value={form.mantra}
          onChange={(e) => set("mantra", e.target.value)}
          placeholder="Enter your mantra..."
          maxLength={120}
        />
      </Field>
      <Field label="Bio" hint={`${(form.bio || "").length} / 300 characters`}>
        <textarea
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          placeholder="Tell the collective about yourself..."
          maxLength={300}
        />
      </Field>
      <Field label="Interests" hint="Press Enter to add each interest">
        <input
          type="text"
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          onKeyDown={addInterest}
          placeholder="e.g. Travel, Golf, Cooking..."
        />
        {form.interests.length > 0 && (
          <InterestTagList tags={form.interests} onRemove={removeInterest} />
        )}
      </Field>
    </div>
  );
}
