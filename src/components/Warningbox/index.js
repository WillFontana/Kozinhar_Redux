import React from 'react';

export default function Warningbox({ icon, status, title, message }) {
  return (
    <aside className={`warning-box -${status}`}>
      <i className="svg-icon">
        {icon}
      </i>
      <p className="text typo-body-2 typo-fw-regular">
        <span className="typo-sub-heading typo-fw-bold _pr-sm">
          {title}
        </span>
        {message}
      </p>
    </aside>
  );
}
