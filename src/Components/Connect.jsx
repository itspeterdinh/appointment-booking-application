import React, { useEffect, useState } from 'react';

function getWindowSize() {
  const { innerWidth } = window;
  if (innerWidth < 600) return true;
  else return false;
}

function Connect() {
  const [isMobile, setIsMobile] = useState(getWindowSize());
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    function handleWindowResize() {
      setIsMobile(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <section className="company-connect m-bottom--32--xs-only">
      {(!isMobile || toggle) && (
        <div className="m-bottom--24">
          <h5 className="font--bold m-bottom--16">Connect</h5>
          <div className="company-contact-info link--browser font--bold">
            <span className="data-descriptive-icon obs-icon--envelope-stroked"></span>
            <a href="mailto:peterdinh94@gmail.com">peterdinh94@gmail</a>
            <span className="data-descriptive-icon obs-icon--mobile"></span>
            <a href="tel:+14088595184">(408) 859-5184</a>
            <span className="data-descriptive-icon obs-icon--social-instagram"></span>
            <a
              href="https://www.instagram.com/blinkk.esthetics/"
              target="_blank"
              rel="noreferrer"
            >
              blinkk.esthetics
            </a>
          </div>
        </div>
      )}
      {isMobile && (
        <button
          className="w-button w-button--large w-button--secondary w-button--rounded w-button--full-width-mobile"
          onClick={() => setToggle((prev) => !prev)}
        >
          {toggle ? 'Less' : 'More'}
        </button>
      )}
    </section>
  );
}

export default Connect;
