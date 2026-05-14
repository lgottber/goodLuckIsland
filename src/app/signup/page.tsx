"use client";

import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./signup.css";

const PRIVACY_POLICY = `Welcome to Good Luck Island 🌴

Let's put the bar rules in there and grounds for getting kicked off the Island. Manners. Else dad slaps you from across the table (literally).

Heckling is fine as long as it's at me. But towards other members? Nope. Use of ethnic slurs or political or religious rock throwing. Ehhk.. You're outa here. TKO... bye bye...

Ok.. Ya get it.. click here that says you agree to these rules. No shirt, No Shoes, No Problem. No manners???? Git da fucouddaheeeer.

---

GLIC is a sanctuary for those who want to learn more about retirement life and how that translates into action we should be considering from a lifestyle perspective. We are not a financial planning company, but we do think everyone should start here before they pick up a phone and call a financial advisor.

I built this so you can learn in peace and not worry if you're going to get slammed by Andre the Giant (big financial companies paying top $ for your leads) with marketing and stuff you didn't ask for.

So we're gonna let you have it all and protect your info from being sold out.`;

export default function SignupPage() {
  const { loginWithRedirect } = useAuth0();
  const [agreed, setAgreed] = useState(false);

  function handleCreateAccount() {
    if (!agreed) return;
    loginWithRedirect({
      authorizationParams: { screen_hint: "signup" },
      appState: { returnTo: "/profile" },
    });
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <img
          src="/privacyPolicy.png"
          alt="Good Luck Island Privacy Seal"
          className="signup-seal"
        />
        <h1 className="signup-title">Join the Island</h1>
        <p className="signup-subtitle">
          Please read and agree to our community rules before creating your
          account.
        </p>

        <div className="signup-policy-scroll">
          <pre className="signup-policy-text">{PRIVACY_POLICY}</pre>
        </div>

        <label className="signup-checkbox-label">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="signup-checkbox"
          />
          I have read and agree to the Good Luck Island community rules
        </label>

        <div className="signup-actions">
          <a href="/auth/login" className="signup-btn-login">
            Already a member? Log in
          </a>
          <button
            type="button"
            className="signup-btn-accept"
            onClick={handleCreateAccount}
            disabled={!agreed}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
