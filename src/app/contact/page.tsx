"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "../../components/NavBarDynamic";
import Icon from "../../components/Icon";
import { trackEvent } from "../../lib/analyticsApi";
import { submitTestimonial } from "../../lib/testimonialsApi";
import { ApiError } from "../../lib/apiClient";
import ContactForm from "../about/ContactForm";
import ContactFormSuccess from "../about/ContactFormSuccess";
import "./contact.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!formData.email || !formData.message || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await submitTestimonial(formData);
      trackEvent("contact_form_submitted");
      setSubmitted(true);
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 429
          ? "You've submitted a few of these already — please try again later."
          : "Something went wrong sending your message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <NavBar activePage="contact" largeAvatar />

      <div className="contact-page">
        <div className="contact-header">
          <p className="contact-eyebrow">Get in Touch</p>
          <h1>
            We&apos;d love to <em>hear from you.</em>
          </h1>
          <p className="contact-subtext">
            Whether you have a question about the platform, want to share your
            story, or are interested in working with Nicholas — we&apos;re here. No
            bots. No auto-replies. Just real people.
          </p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <Icon name="link" size={18} />
              </div>
              goodluckislandcollective.com
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <Icon name="mail" size={18} />
              </div>
              hello@goodluckislandcollective.com
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <Icon name="mic" size={18} />
              </div>
              <Link href="/articles" className="contact-detail-link">
                Listen to the Podcast
              </Link>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <Icon name="book" size={18} />
              </div>
              <Link href="/shop" className="contact-detail-link">
                Get the Book
              </Link>
            </div>
          </div>

          {submitted ? (
            <ContactFormSuccess />
          ) : (
            <ContactForm
              formData={formData}
              onChange={setFormData}
              submitting={submitting}
              error={error}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
}
