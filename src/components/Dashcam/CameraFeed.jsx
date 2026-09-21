import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineVideoCamera, HiArrowPath, HiSignal, HiMapPin, HiBolt } from 'react-icons/hi2';

function LiveTimestamp() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</>;
}

export default function CameraFeed({ camera, operator }) {
  const [state, setState] = useState(camera.url ? 'Connecting' : 'Not connected');
  const [attempt, setAttempt] = useState(0);
  const isPlaying = state === 'Playing';

  return (
    <section className="dashcam-feed" aria-label={camera.label}>
      <header>
        <span>{camera.channel}</span>
        <h3>{camera.label}</h3>
        <span className={`dc-feed-status dc-feed-status--${state.toLowerCase().replace(' ', '-')}`}>
          <span className="dc-feed-status__dot" />
          {state}
        </span>
      </header>

      <div className="dashcam-feed__screen">
        {camera.url && state !== 'Unavailable' ? (
          <div className="dc-video-wrap">
            <video
              key={attempt}
              src={camera.url}
              controls
              autoPlay
              muted
              loop
              playsInline
              aria-label={camera.label}
              onPlaying={() => setState('Playing')}
              onPause={() => setState('Paused')}
              onWaiting={() => setState('Buffering')}
              onError={() => setState('Unavailable')}
            />
            {/* HUD overlay — shown while playing */}
            {isPlaying && operator && (
              <div className="dc-hud">
                <div className="dc-hud__top">
                  <span className="dc-hud__device">DEVICE-{operator.id}</span>
                  <span className="dc-hud__rec"><span className="dc-hud__rec-dot" />REC</span>
                </div>
                <div className="dc-hud__bottom">
                  <span className="dc-hud__kpi"><HiBolt />{operator.speed} km/h</span>
                  <span className="dc-hud__kpi"><HiMapPin />{operator.site}</span>
                  <span className="dc-hud__kpi dc-hud__kpi--time"><LiveTimestamp /></span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="dashcam-feed__empty">
            <HiOutlineVideoCamera />
            <strong>{camera.url ? 'Camera unavailable' : 'Waiting for connection'}</strong>
            <p>
              {camera.url
                ? 'The stream could not be played. Check the device and retry.'
                : 'Footage will appear here when the device stream is connected.'}
            </p>
            {camera.url && (
              <button onClick={() => { setState('Connecting'); setAttempt(v => v + 1); }}>
                <HiArrowPath /> Retry stream
              </button>
            )}
          </div>
        )}
      </div>

      <footer>
        <span className="dc-feed-footer__left">
          <HiSignal style={{ opacity: isPlaying ? 1 : 0.3 }} />
          {isPlaying ? 'Live · H.264 / 1080p' : 'No signal'}
        </span>
        <span>{camera.url ? 'Use controls for sound &amp; fullscreen' : 'No stream configured'}</span>
      </footer>
    </section>
  );
}

CameraFeed.propTypes = {
  camera: PropTypes.shape({
    label:   PropTypes.string.isRequired,
    channel: PropTypes.string.isRequired,
    url:     PropTypes.string,
  }).isRequired,
  operator: PropTypes.object,
};
