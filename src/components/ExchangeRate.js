import React from 'react';

const ExchangeRate = (props) => {
  return (
    <div className='exchange-rate'>
      <h4>Exchange Rate</h4>

      <h2>{props.exchangeRate} </h2>
      <p>{props.primaryCurrency} to {props.secondaryCurrency}</p>
    </div>
  );
};

export default ExchangeRate;
