import React from 'react';
import './css/LoginComponent.css';
//
function LoginComponent() {
  return (
    <div className="login-element">
      <h2>
        Your internet is not just a goal, <br />
        <span
          style={{
            background: 'linear-gradient(to right, red, blue)',
            WebkitBackgroundClip: 'text',
            MozBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          it&apos;s our top priority
        </span>
      </h2>
      <p>
        To ensure quality work, we work with a limited amount of clients per
        month.
      </p>
      <p>See all our best plans for dedicated network and broadwidth.</p>
      <br />

      <input
        type="submit"
        value="See all Plans"
        style={{
          backgroundColor: '#4CAF50' /* Green */,
          border: 'none',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer'
        }}
      />
    </div>
  );
}

export default LoginComponent;
