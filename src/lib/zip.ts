// Shared by BasicInfoTab.tsx and EditModal.tsx so the "what counts as a
// valid ZIP" rule can't drift between the two forms.
export const ZIP_PATTERN = /^\d{5}$/;

export function isValidZip(zip: string | null | undefined): boolean {
  return ZIP_PATTERN.test(zip ?? "");
}
