import { apiFetch, apiFetchVoid } from "./apiClient";

export interface TestimonialSubmission {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface ApprovedTestimonial {
  id: string;
  name: string;
  content: string;
  featured: boolean;
}

export function submitTestimonial(payload: TestimonialSubmission): Promise<void> {
  return apiFetchVoid("/testimonials", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchApprovedTestimonials(): Promise<ApprovedTestimonial[]> {
  return apiFetch<ApprovedTestimonial[]>("/testimonials");
}
