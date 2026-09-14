import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { whatWeDoServices } from "../../data/whatWeDoServices";
import ShippingComingSoon from "./ShippingComingSoon";
import "./ExpertiseTabs.css";

function WhatWeDoSlider() {
  const [activeTab, setActiveTab] = useState("mining");
  const tabs = useRef([]);
  const changeTab = (event, index) => {
    let next;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") next = 1 - index;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 1;
    if (next === undefined) return;
    event.preventDefault();
    setActiveTab(next === 0 ? "mining" : "shipping");
    tabs.current[next]?.focus();
  };
  return (
    <section className="coral-services" id="what-we-do" aria-labelledby="what-we-do-title">
      <div className="coral-shell">
        <div className="coral-services__header">
          <div>
            <p className="coral-eyebrow"><span /> Our expertise</p>
            <h2 id="what-we-do-title">What We Do</h2>
          </div>
          <div className="coral-services__intro">
            <p>
              {activeTab === "mining" ? "Practical expertise for the complete mining lifecycle—from securing the ground to shaping what comes next." : "From the ground to the open sea. A new chapter in Coral’s shipping expertise is on the horizon."}
            </p>
          </div>
        </div>

        <div className="coral-expertise-tabs" role="tablist" aria-label="Areas of expertise">
          {["mining", "shipping"].map((tab, index) => <button key={tab} ref={element => { tabs.current[index] = element; }} id={`expertise-tab-${tab}`} type="button" role="tab" aria-selected={activeTab === tab} aria-controls={`expertise-panel-${tab}`} tabIndex={activeTab === tab ? 0 : -1} onClick={() => setActiveTab(tab)} onKeyDown={event => changeTab(event, index)}>{tab === "mining" ? "Mining" : "Shipping"}<span aria-hidden="true">{tab === "mining" ? "01" : "02"}</span></button>)}
        </div>

        <div id="expertise-panel-mining" role="tabpanel" aria-labelledby="expertise-tab-mining" hidden={activeTab !== "mining"} tabIndex={0}>
        <div className="coral-services__grid">
          {whatWeDoServices.map((service) => {
            const Icon = service.icon;
            return <Link className="coral-service-card" to={`/services/${service.slug}`} key={service.number} aria-label={`Explore ${service.title}`}>
              <img className="coral-service-card__image" src={service.image} alt="" loading="lazy" />
              <span className="coral-service-card__shade" aria-hidden="true" />
              <div className="coral-service-card__top"><span>{service.number}</span><Icon aria-hidden="true" /></div>
              <div><h3>{service.title}</h3><p>{service.cardDescription}</p><small>Explore service <HiArrowUpRight aria-hidden="true" /></small></div>
              <span className="coral-service-card__line" aria-hidden="true" />
            </Link>;
          })}
        </div>
        </div>
        <div id="expertise-panel-shipping" role="tabpanel" aria-labelledby="expertise-tab-shipping" hidden={activeTab !== "shipping"} tabIndex={0}><ShippingComingSoon /></div>
      </div>
    </section>
  );
}

export default WhatWeDoSlider;
