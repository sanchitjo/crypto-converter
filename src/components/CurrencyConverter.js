import React, { useState } from 'react';
import axios from 'axios';
import ExchangeRate from './ExchangeRate';


const CurrencyConverter = () => {

  const currencies = ['BTC', 'ETH', 'USD', 'EUR', 'INR', 'XRP', 'LTC', 'ADA']

  const [primaryCurrency, setprimaryCurrency] = useState('BTC');
  const [secondaryCurrency, setsecondaryCurrency] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setexchangeRate] = useState(0);
  const [primaryCurrencyExchanged, setprimaryCurrencyExchanged] = useState('BTC');
  const [secondaryCurrencyExchanged, setsecondaryCurrencyExchanged] = useState('INR');
  const [result, setResult] = useState(0);

  const convert = () => {


    const options = {
      method: 'GET',
      url: 'https://crypto-backend0.herokuapp.com/convert',
      params: { from_currency: primaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: secondaryCurrency },

    };

    axios.request(options)
      .then((response) => {
        // console.log(response);
        

        setexchangeRate(response.data.exchange_rate)

        setResult(response.data.exchange_rate * amount)

        setprimaryCurrencyExchanged(primaryCurrency)
        setsecondaryCurrencyExchanged(secondaryCurrency)


      }).catch((error) => {
        console.error(error);
      });
  }
  // console.log(exchangeRate)


  return (
    <div className='currency-converter'>
      <h2>Currency Converter</h2>

      <div className='input-box'>
        <table>
          <tbody>
            <tr>
              <td><strong>Primary Currency: </strong></td>
              <td>
                <input
                  className='form-control'
                  type='number'
                  name='currency-amount-1'
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value) }}
                />
              </td>
              <select
                value={primaryCurrency}
                name='currency-option-1'
                className='form-select'
                onChange={(e) => { setprimaryCurrency(e.target.value) }}
              >
                {currencies.map((currency) => { return (<option>{currency}</option>) })}

              </select>
            </tr>

            <tr>
              <td><strong>Secondary Currency: </strong></td>
              <td>
                <input
                  className='form-control'
                  type='number'
                  name='currency-amount-2'
                  value={result}
                />
              </td>
              <select
                value={secondaryCurrency}
                name='currency-option-2'
                className='form-select'
                onChange={(e) => { setsecondaryCurrency(e.target.value) }}
              >
                {currencies.map((currency) => { return (<option>{currency}</option>) })}

              </select>
            </tr>
          </tbody>
        </table>

        <button id='conver-button' onClick={convert} className='btn btn-dark'>Convert</button>

      </div>

      <ExchangeRate
        exchangeRate={exchangeRate}
        primaryCurrency={primaryCurrencyExchanged}
        secondaryCurrency={secondaryCurrencyExchanged}
      />
    </div>);
};

export default CurrencyConverter;
