import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const path = useLocation();

  return (
    <div className="widget-header">
      <header className="widget-bar">
        <div className="widget-bar__main-content font--bold link--browser">
          {path.pathname !== '/' && (
            <div className="widget-bar__title-section">
              <div className="ember-view homepage-link-unless-embedded--inline">
                <Link to="/">
                  <div className="merchant-header">
                    <div className="company-branding item-image-holder">
                      <div
                        className="item-image company-brading-picture"
                        style={{
                          backgroundImage:
                            'url(' +
                            'https://cdn.shopify.com/s/files/1/0536/8990/9410/products/image_2d73ff50-2829-4fbc-995f-9f74b2cf689b_600x.jpg?v=1645647673' +
                            ')',
                        }}
                      />
                    </div>
                    <h2 className="font--bold merchant-header__unit-title merchant-header__unit-name color--full-black">
                      Blinkk.Esthetics
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
    </div>
  );
}

export default Header;
