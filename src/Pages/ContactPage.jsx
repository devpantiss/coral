import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";

function ContactPage() {
  return <InnerPage eyebrow="Contact" title="Start a" accent="conversation." intro="Tell us about an asset, operating challenge, logistics requirement or career enquiry.">
    <section className="coral-contact coral-shell"><div className="coral-contact__details"><p className="coral-eyebrow"><span /> Connect with Coral</p><h2>Let’s move the right opportunity forward.</h2><p>Share a brief overview and the appropriate team will respond.</p><ul><li><HiOutlineEnvelope /><span><small>Business enquiries</small><a href="mailto:business@coralmines.com">business@coralmines.com</a></span></li><li><HiOutlinePhone /><span><small>Telephone</small><a href="tel:+910000000000">+91 00000 00000</a></span></li><li><HiOutlineMapPin /><span><small>Office</small><address>Odisha, India</address></span></li></ul></div><form className="coral-contact-form" onSubmit={(event) => event.preventDefault()}><div><label>Full name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="name@company.com" /></label></div><div><label>Company<input name="company" placeholder="Organisation" /></label><label>Enquiry type<select name="type" defaultValue="project"><option value="project">Project opportunity</option><option value="operations">Operating partnership</option><option value="logistics">Logistics & shipping</option><option value="career">Careers</option></select></label></div><label>How can we help?<textarea required name="message" rows="6" placeholder="Tell us a little about your requirement…" /></label><button type="submit">Send enquiry</button><small>Form submission requires connection to your preferred email or CRM service.</small></form></section>
  </InnerPage>;
}

export default ContactPage;
