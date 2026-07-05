import { apiFetchVoid } from "./apiClient";

export interface TestimonialSubmission {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export function submitTestimonial(payload: TestimonialSubmission): Promise<void> {
  return apiFetchVoid("/testimonials", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
