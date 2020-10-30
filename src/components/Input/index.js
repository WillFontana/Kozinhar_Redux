import React from 'react';

function TextField({ onChange, grid, label, ...rest }) {
  return (
    <div className={`${grid} text-box`}>
      <input onChange={onChange} {...rest} />
      <div className="label">
        <div className="text">
          {label}
        </div>
      </div>
    </div>
  );
}

export default TextField;