import React from 'react';

function ToolBar() {
  return (
    <nav className="widget-toolbar-container">
      <div className="widget-toolbar-container__actions">
        <button
          type="button"
          className="w-button w-button--small w-button--primary w-button--rounded 
          widget-toolbar-container__button widget-toolbar-container__button--continue 
          ember-view button"
          disabled={false}
        >
          Continue
        </button>
      </div>
    </nav>
  );
}

export default ToolBar;
