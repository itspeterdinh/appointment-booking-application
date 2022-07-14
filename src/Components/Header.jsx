import React from 'react';

function Header() {
  return (
    <div className="widget-header">
      <header className="widget-bar">
        <div className="widget-bar__menu-section font--bold link--browser">
          <div className="widget-bar__menu">
            <span id="sign-in">
              <h5>Sign in</h5>
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
