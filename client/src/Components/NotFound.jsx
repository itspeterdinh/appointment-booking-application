import React from 'react';
//https://squareup.com/appointments/book/reservations/a4mgd2jtrktnhy
function NotFound() {
  return (
    <div className="container landing">
      <div className="l-catch-all">
        <div className="l-catch-all-content">
          <div className="l-catch-all-title">Not Found</div>
          <div className="l-catch-all-body">
            <div className="l-catch-all-intro">We couldn't find that.</div>
            <div className="l-catch-all-message">
              Sorry, we couldn’t find what you were looking for. Try one of
              these alternate routes instead.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
