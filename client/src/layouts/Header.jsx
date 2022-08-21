/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../contexts/app-context';

function Header({ business }) {
  const ctx = useContext(AppContext);
  const path = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      ctx.setError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [ctx.error]);

  return (
    <div className="widget-header w-background-light">
      <header className="widget-bar m-bottom--8">
        <div className="widget-bar__main-content font--bold link--browser">
          {path.pathname !== `/book/${business._id}` && (
            <div className="widget-bar__title-section">
              <div className="ember-view homepage-link-unless-embedded--inline">
                <Link to={`/book/${business._id}`}>
                  <div className="merchant-header">
                    <div className="company-branding item-image-holder">
                      <div
                        className="item-image company-brading-picture"
                        style={{
                          backgroundImage: `url(${business.avatar})`
                        }}
                      />
                    </div>
                    <h2 className="font--bold merchant-header__unit-title merchant-header__unit-name color--full-black">
                      {business.name}
                    </h2>
                  </div>
                </Link>
              </div>
            </div>
          )}
          <div className="widget-bar__menu-section link--browser font--bold">
            <div className="widget-bar__menu ember-view">
              <span id="sign-in">
                <h5>Sign in</h5>
              </span>
            </div>
          </div>
        </div>
      </header>
      {/* {ctx.error && ( */}
      <div
        className={
          'ember-view flash-message flash-message--is-visible ' +
          (ctx.error ? '' : 'displayNone')
        }
      >
        <div className="container w-background-light">
          <div className="row">
            <div className="col col-12">
              <div className="card card--secondary flash-message__wrapper">
                <div className="flash-message__body link--browser font--small flash-message--is-error .flash-message__body">
                  <span className="data-descriptive-icon obs-icon--error"></span>
                  <p className="flash-message--is-error .flash-message__body">
                    {ctx.errorText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default Header;
