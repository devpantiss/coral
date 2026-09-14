import { useState } from "react";
import { HiArrowUpRight, HiOutlineEnvelope } from "react-icons/hi2";
import "./Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = event => {
    event.preventDefault();
    const body = `Please add ${email.trim()} to Coral’s newsletter mailing list. I would like to receive mining, shipping and event updates.`;
    window.location.href = `mailto:info@coralmines.com?subject=${encodeURIComponent("Newsletter subscription request")}&body=${encodeURIComponent(body)}`;
    setMessage("Send the prepared email to request your subscription. If your email app did not open, contact info@coralmines.com.");
  };

  return <section className="coral-newsletter" aria-labelledby="newsletter-title">
    <div className="coral-shell coral-newsletter__inner">
      <div className="coral-newsletter__copy"><p className="coral-eyebrow"><span /> The Coral newsletter</p><h2 id="newsletter-title">Stay connected.<br /><em>Stay a step ahead.</em></h2><p>Perspectives from the mine to the market. Get updates on our work, industry insights and upcoming events.</p></div>
      <form className="coral-newsletter__form" onSubmit={subscribe}>
        <label htmlFor="newsletter-email">Your email address</label>
        <div className="coral-newsletter__field"><HiOutlineEnvelope aria-hidden="true" /><input id="newsletter-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" value={email} onChange={event => { setEmail(event.target.value); setMessage(""); }} aria-describedby="newsletter-note" /><button type="submit">Subscribe <HiArrowUpRight aria-hidden="true" /></button></div>
        <p id="newsletter-note">Request updates via your email app. You can unsubscribe at any time.</p>
        <p className="coral-newsletter__status" role="status">{message}</p>
      </form>
    </div>
  </section>;
}
