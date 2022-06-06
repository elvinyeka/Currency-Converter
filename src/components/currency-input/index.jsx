import React from 'react';

import PropTypes from "prop-types";
import './styles.scss';


const CurrencyInput = ({ amount, currency, currencies, onAmountChanges, onCurrencyChanges }) => {
  return (
    <div className="currency-input__group">
      <input type="text"
        value={amount}
        onChange={(e) => onAmountChanges(+e.target.value)}
      />
      <select
        value={currency}
        onChange={(e) => onCurrencyChanges(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  )
}

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChanges: PropTypes.func,
  onCurrencyChanges: PropTypes.func,
}

export default CurrencyInput