import { HiOutlineUser, HiOutlineDocumentCheck, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { leadershipRoles, milestones } from "../../data/aboutContent";
import { AboutHeading, ContentNote } from "./AboutPrimitives";

export default function AboutCredibility() {
  return <>
    <section className="mdo-section" aria-labelledby="mdo-leadership-title"><div className="coral-shell">
      <AboutHeading id="mdo-leadership-title" eyebrow="Leadership" title="Accountability starts" accent="with people." />
      <ContentNote>Leadership names, appointments and biographies await company confirmation.</ContentNote>
      <div className="mdo-leaders">{leadershipRoles.map(role => <article key={role}><div className="mdo-leaders__portrait"><HiOutlineUser aria-hidden="true" /><span>[APPROVED PORTRAIT]</span></div><p>{role}</p><h3>[LEADER NAME]</h3><p className="mdo-placeholder">[SHORT BIOGRAPHY · EXPERIENCE & RESPONSIBILITIES]</p></article>)}</div>
    </div></section>
    <section className="mdo-section mdo-sand" aria-labelledby="mdo-journey-title"><div className="coral-shell"><AboutHeading id="mdo-journey-title" eyebrow="Our journey" title="Built over time." accent="Looking ahead." description="A place for the milestones that define Coral’s evolution. Dates and achievements are awaiting verification." /><ol className="mdo-timeline">{milestones.map(milestone => <li key={milestone}><span className="mdo-placeholder">[YEAR]</span><i aria-hidden="true" /><h3>{milestone}</h3><p>[VERIFIED MILESTONE DETAILS]</p></li>)}</ol><ContentNote>Timeline entries are placeholders, not a statement of company history.</ContentNote></div></section>
    <section className="mdo-section" aria-labelledby="mdo-credentials-title"><div className="coral-shell"><AboutHeading id="mdo-credentials-title" eyebrow="Certifications & partners" title="Trust, backed" accent="by evidence." description="Credentials belong alongside their scope, validity and issuing authority. Approved records will be presented here." /><div className="mdo-credentials">
      <article><HiOutlineDocumentCheck aria-hidden="true" /><h3>Certifications & accreditations</h3><p className="mdo-placeholder">[CERTIFICATION / ACCREDITATION]</p><dl><div><dt>Issuer</dt><dd>[ISSUING BODY]</dd></div><div><dt>Scope & validity</dt><dd>[VERIFIED DETAILS]</dd></div></dl></article>
      <article><HiOutlineBuildingOffice2 aria-hidden="true" /><h3>Industry relationships</h3><p className="mdo-placeholder">[CLIENT / PARTNER / MEMBERSHIP]</p><dl><div><dt>Relationship</dt><dd>[APPROVED SCOPE]</dd></div><div><dt>Brand asset</dt><dd>[PERMITTED LOGO]</dd></div></dl></article>
    </div><ContentNote>No certification, accreditation or commercial relationship is claimed by these placeholders.</ContentNote></div></section>
  </>;
}
