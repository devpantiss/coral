import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { HiPause, HiPlay } from "react-icons/hi2";
import "./HeroVideo.css";

export default function HeroVideo({ src, poster }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (preference.matches) ref.current?.pause();
      else ref.current?.play().catch(() => {});
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [src]);
  return <>
    <video className="coral-inner-hero__video" ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    <div className="coral-inner-hero__video-shade" aria-hidden="true" />
    <button className="coral-inner-hero__video-toggle" type="button" onClick={() => { if (playing) ref.current.pause(); else ref.current.play().catch(() => {}); }} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? <HiPause aria-hidden="true" /> : <HiPlay aria-hidden="true" />}<span>{playing ? "Pause video" : "Play video"}</span></button>
  </>;
}
HeroVideo.propTypes = { src: PropTypes.string.isRequired, poster: PropTypes.string };
