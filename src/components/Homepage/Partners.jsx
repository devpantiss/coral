import { useState } from "react";
import { HiPause, HiPlay } from "react-icons/hi2";
import "./Partners.css";

// Illustrative industry selection; commercial partnerships require confirmation.
const partners = [
  { name: "BHP", logo: "bhp" },
  { name: "Rio Tinto", logo: "rio-tinto" },
  { name: "Maersk", logo: "maersk" },
  { name: "MSC", logo: "msc" },
];

export default function Partners() {
  const [paused, setPaused] = useState(false);
  return <section className="coral-partners" id="partners" aria-labelledby="partners-title">
    <div className="coral-shell coral-partners__heading">
      <div><p className="coral-eyebrow"><span /> Our partners</p><h2 id="partners-title">Progress is a<br /><em>shared endeavour.</em></h2></div>
      <div className="coral-partners__intro"><p>Connecting expertise, people and resources across the mining lifecycle.</p><span>Illustrative industry logos · Partnerships to be confirmed</span></div>
    </div>
    <div className={`coral-partners__marquee${paused ? " is-paused" : ""}`}>
      <div className="coral-partners__track">
        {[0, 1].map(copy => <ul className="coral-partners__group" key={copy} aria-label={copy === 0 ? "Mining and shipping company logos" : undefined} aria-hidden={copy === 1 ? true : undefined}>
          {partners.map(partner => <li key={partner.name}><img src={`${import.meta.env.BASE_URL}coral/partners/${partner.logo}.svg`} alt={partner.name} width="180" height="60" /></li>)}
        </ul>)}
      </div>
    </div>
    <div className="coral-shell coral-partners__footer"><p>Shared ambition. Lasting relationships.</p><button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <HiPlay aria-hidden="true" /> : <HiPause aria-hidden="true" />}{paused ? "Resume logos" : "Pause logos"}</button></div>
  </section>;
}
