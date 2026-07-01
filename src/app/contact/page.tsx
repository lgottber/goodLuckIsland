"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "../../components/NavBarDynamic";
import Icon from "../../components/Icon";
import { useSubmitFeedback } from "../../hooks/useSubmitFeedback";
import SubmitLabel from "../about/SubmitLabel";
import "./contact.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, triggerSubmitted] = useSubmitFeedback(3500);

  function handleSubmit() {
    if (!formData.email || !formData.message) return;
    triggerSubmitted();
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
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

          <div className="contact-form-wrap">
            <div className="contact-form-row">
              <input
                className="contact-input"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <input
                className="contact-input"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
            <input
              className="contact-input"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <textarea
              className="contact-textarea"
              placeholder="Your message..."
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            <button
              type="button"
              className="contact-submit"
              onClick={handleSubmit}
            >
              <SubmitLabel submitted={submitted} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
