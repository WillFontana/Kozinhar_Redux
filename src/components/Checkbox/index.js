import React from 'react';
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';

function Checkbox({ onChange, label, ...rest }) {
  return (
    <label htmlFor="flkeeploged" className="switch-svg">
      <input type="checkbox" onChange={onChange} {...rest} name="flkeeploged" id="flkeeploged" className="input" />
      <MdRadioButtonUnchecked className="svg-icon -uncheck" />
      <MdRadioButtonChecked className="svg-icon -check" />
      <p className="text typo-body-1 typo-color-dark-secondary">
        {label}
      </p>
    </label>
  );
}

export default Checkbox;