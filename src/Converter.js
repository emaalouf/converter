import React, { Component } from 'react';
import axios from 'axios';
import './Converter.css';

export default class Converter extends Component {
  state = {
    result1: null,
    result2: null,
    result3: null,
    result4: null,
    result5: null,
    fromCurrency1: 'USD',
    toCurrency1: '',
    fromCurrency2: 'USD',
    toCurrency2: 'GBP',
    fromCurrency3: 'USD',
    toCurrency3: 'CAD',
    fromCurrency4: 'USD',
    toCurrency4: 'EUR',
    fromCurrency5: 'USD',
    toCurrency5: 'AUD',

    amount1: 1,
    amount2: 1,
    amount3: 1,
    amount4: 1,
    amount5: 1,
    currencies: [],
    // wholeCurrencies: [
    //   'British Pound (GBP)',
    //   'Hong Kong Dollar (HKD)',
    //   'Indonesian Rupiah (IDR)',
    //   'Israeli Shekel (ILS)',
    //   'Danish Krone (DKK)',
    //   'Indian Rupee (INR)',
    //   'Swiss Franc (CHF)',
    //   'Mexican Peso (MXN)',
    //   'Czech Koruna (CZK)',
    //   'Singapore Dollar (SGD)',
    //   'Thai Baht (THB)',
    //   'Croatian Kuna (HRK)',
    //   'Malaysian Ringgit (MYR)',
    //   'Norwegian Krone (NOK)',
    //   'Chinese Yuan (CNY)',
    //   'Bulgarian Lev (BGN)',
    //   'Philippine Peso (PHP)',
    //   'Swedish Krona (SEK)',
    //   'Polish Zloty (PLN)',
    //   'South African Rand (ZAR)',
    //   'Canadian Dollar (CAD)',
    //   'Iceland Krona (ISK)',
    //   'Brazilian Real (BRL)'
    // ],
    wholeCurrencies: [],
    countryName: '',
    countryCode: ''
  };

  //get country name , code, currency

  getGeoInfo = () => {
    //get ip address
    axios
      .get('https://api.ipify.org?format=json')
      // .get(
      //   'https://api.ipapi.com/91.210.107.60?access_key=f23a0af3e90c52ddb69e6ecf20c74b1d'
      // )
      //   .get('https://ipapi.co/json/')
      .then(response => {
        let myIp = response.data.ip;
        axios
          .get(
            'https://api.ipapi.com/' +
              myIp +
              '?access_key=f23a0af3e90c52ddb69e6ecf20c74b1d'
          )
          .then(responseIp => {
            const country_name = responseIp.data.country_name;
            var getCountry = require('country-currency-map').getCountry;
            const myCurrency = getCountry(country_name).currency;
            this.setState({
              toCurrency1: myCurrency
            });
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  //   setWhole = async () => {
  //     const { currencies } = this.state;
  //     var getCurrency = require('country-currency-map').getCurrency;
  //     var wholeCurrencies = [];
  //     console.log('await', currencies);
  //     for (const curr in currencies) {
  //       wholeCurrencies.push(getCurrency(currencies[curr]));
  //     }
  //     this.setState({
  //       wholeCurrencies
  //     });
  //   };

  getCurrencyUnit = async () => {
    await axios
      .get(
        'https://apilayer.net/api/live?access_key=a7a79858888b6a6f60eb926536633007'
      )
      .then(response => {
        // Initialized with 'EUR' because the base currency is 'EUR'
        // and it is not included in the response
        // var getCurrency = require('country-currency-map').getCurrency;
        // const { fromCurrency } = this.state;
        // console.log({ fromCurrency }, response.data.quotes[fromCurrency]);
        const currencyAr = [];
        //const currencyAr = ['EUR'];
        for (const key in response.data.quotes) {
          currencyAr.push(key.slice(3));
          console.log(key.slice(3));
        }
        this.setState({
          currencies: currencyAr.sort()
        });
      })
      .catch(err => {
        console.log(
          "Oops, something broke with GET in componentDidMount() - we've got a: ",
          err.message
        );
      });
  };

  componentDidMount() {
    this.getGeoInfo();
    this.getCurrencyUnit();
    // this.setWhole();
  }

  // Event handler for the conversion BROKEN due to CORS policy
  // https://q777nnrzpw.codesandbox.io/ WORKS here -
  convertHandler = () => {
    axios
      // .get(
      //   `https://api.openrates.io/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`
      // )
      .get(
        'https://apilayer.net/api/live?access_key=a7a79858888b6a6f60eb926536633007'
      )
      .then(response => {
        if (this.state.fromCurrency1 !== this.state.toCurrency1) {
          const { fromCurrency1, toCurrency1 } = this.state;
          const fromRate = response.data.quotes['USD' + fromCurrency1];
          const toRate = response.data.quotes['USD' + toCurrency1];
          const result1 = (this.state.amount1 * toRate) / fromRate;
          // this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result1: result1.toFixed(5) });
        } else {
          this.setState({ result1: "You can't convert the same currency!" });
        }

        if (this.state.fromCurrency2 !== this.state.toCurrency2) {
          const { fromCurrency2, toCurrency2 } = this.state;
          const fromRate = response.data.quotes['USD' + fromCurrency2];
          const toRate = response.data.quotes['USD' + toCurrency2];
          const result2 = (this.state.amount2 * toRate) / fromRate;
          console.log(fromRate, toRate);
          // this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result2: result2.toFixed(5) });
        } else {
          this.setState({ result2: "You can't convert the same currency!" });
        }

        if (this.state.fromCurrency3 !== this.state.toCurrency3) {
          const { fromCurrency3, toCurrency3 } = this.state;
          const fromRate = response.data.quotes['USD' + fromCurrency3];
          const toRate = response.data.quotes['USD' + toCurrency3];
          const result3 = (this.state.amount3 * toRate) / fromRate;
          console.log(fromRate, toRate);
          // this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result3: result3.toFixed(5) });
        } else {
          this.setState({ result3: "You can't convert the same currency!" });
        }

        if (this.state.fromCurrency4 !== this.state.toCurrency4) {
          const { fromCurrency4, toCurrency4 } = this.state;
          const fromRate = response.data.quotes['USD' + fromCurrency4];
          const toRate = response.data.quotes['USD' + toCurrency4];
          const result4 = (this.state.amount4 * toRate) / fromRate;
          console.log(fromRate, toRate);
          // this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result4: result4.toFixed(5) });
        } else {
          this.setState({ result4: "You can't convert the same currency!" });
        }

        if (this.state.fromCurrency4 !== this.state.toCurrency4) {
          const { fromCurrency4, toCurrency4 } = this.state;
          const fromRate = response.data.quotes['USD' + fromCurrency4];
          const toRate = response.data.quotes['USD' + toCurrency4];
          const result4 = (this.state.amount4 * toRate) / fromRate;
          console.log(fromRate, toRate);
          // this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result4: result4.toFixed(5) });
        } else {
          this.setState({ result4: "You can't convert the same currency!" });
        }

        if (this.state.fromCurrency5 !== this.state.toCurrency5) {
          const { fromCurrency5, toCurrency5 } = this.state;
          const fromRate = response.data.quotes['USD' + fromCurrency5];
          const toRate = response.data.quotes['USD' + toCurrency5];
          const result5 = (this.state.amount5 * toRate) / fromRate;
          console.log(fromRate, toRate);
          // this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result5: result5.toFixed(5) });
        } else {
          this.setState({ result5: "You can't convert the same currency!" });
        }
      })
      .catch(err => {
        console.log(
          "Oops, something broke with GET in convertHandler() - we've got a: ",
          err.message
        );
      });
  };

  // Updates the states based on the dropdown that was changed
  selectHandler1 = event => {
    if (event.target.name === 'from') {
      this.setState({ fromCurrency1: event.target.value });
    }
    if (event.target.name === 'to') {
      this.setState({ toCurrency1: event.target.value });
    }
  };
  selectHandler2 = event => {
    if (event.target.name === 'from') {
      this.setState({ fromCurrency2: event.target.value });
    }
    if (event.target.name === 'to') {
      this.setState({ toCurrency2: event.target.value });
    }
  };
  selectHandler3 = event => {
    if (event.target.name === 'from') {
      this.setState({ fromCurrency3: event.target.value });
    }
    if (event.target.name === 'to') {
      this.setState({ toCurrency3: event.target.value });
    }
  };
  selectHandler4 = event => {
    if (event.target.name === 'from') {
      this.setState({ fromCurrency4: event.target.value });
    }
    if (event.target.name === 'to') {
      this.setState({ toCurrency4: event.target.value });
    }
  };
  selectHandler5 = event => {
    if (event.target.name === 'from') {
      this.setState({ fromCurrency5: event.target.value });
    }
    if (event.target.name === 'to') {
      this.setState({ toCurrency5: event.target.value });
    }
  };

  getCurrentCountryAndCurrency = async () => {
    const access_key = '9553e431c17617a714c94cc9367d7264';
    const ssl_secure = false;
    try {
      const ipstack_coutry_code_resp = await axios.get(
        (ssl_secure ? 'https://' : 'http://') +
          'api.ipstack.com/check?access_key=' +
          access_key +
          '&output=json'
      );

      const restcountries_currency_code_resp = await axios.get(
        'https://restcountries.eu/rest/v2/alpha/' +
          ipstack_coutry_code_resp.data.country_code
      );

      return restcountries_currency_code_resp.data.currencies[0].code;
    } catch (error) {
      return error;
    }
  };

  getCurrencyLayerExchangeRate = async () => {
    const currency_layer_access_token = 'a7a79858888b6a6f60eb926536633007';
    const ssl_secure = false;

    try {
      const current_currency_code = await this.getCurrentCountryAndCurrency();

      console.log(current_currency_code);

      const currency_layer_exchange_rates_resp = await axios.get(
        (ssl_secure ? 'https://' : 'http://') +
          'apilayer.net/api/live?access_key=' +
          currency_layer_access_token
      );

      const exchange_rates = currency_layer_exchange_rates_resp.data.quotes;

      const exchange_rates_base_code =
        currency_layer_exchange_rates_resp.data.source;

      const exchange_rate_object_refrence =
        exchange_rates_base_code + current_currency_code;

      const exchange_rate_value = exchange_rates[exchange_rate_object_refrence];

      return exchange_rate_value;
    } catch (error) {
      return error;
    }
  };
  //   fromCurrency: 'USD',
  //   toCurrency: '',
  //   amount: 1,
  //   shouldComponentUpdate(nextProps, nextState) {
  //     if (
  //       nextState.fromCurrency !== this.state.fromCurrency ||
  //       nextState.toCurrency !== this.state.toCurrency ||
  //       nextState.amount !== this.state.amount ||
  //       nextState.result !== this.state.result
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }

  render() {
    const { currencies, wholeCurrencies } = this.state;

    // var getCurrency = require('country-currency-map').getCurrency;

    return (
      <div className="Converter">
        <h2>
          <span>Shopify Converter </span>{' '}
        </h2>{' '}
        Converter
        <div>
          <button onClick={this.convertHandler} className="button">
            Convert
          </button>
        </div>
        <div className="Form">
          <input
            name="amount"
            type="text"
            value={this.state.amount1}
            onChange={event => this.setState({ amount1: event.target.value })}
          ></input>

          <select
            name="from"
            onChange={event => this.selectHandler1(event)}
            value={this.state.fromCurrency1}
            // value={this.state.currencies[0]}
          >
            {this.state.currencies.map((cur, key) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>

          <select
            name="to"
            onChange={event => this.selectHandler1(event)}
            value={this.state.toCurrency1}
          >
            {this.state.currencies.map((cur, key) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>
        {this.state.result1 && <h3>{this.state.result1}</h3>}
        <div className="Form">
          <input
            name="amount"
            type="text"
            value={this.state.amount2}
            onChange={event => this.setState({ amount2: event.target.value })}
          ></input>

          <select
            name="from"
            onChange={event => this.selectHandler2(event)}
            value={this.state.fromCurrency2}
            // value={this.state.currencies[0]}
          >
            {this.state.currencies.map((cur, key) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>

          <select
            name="to"
            onChange={event => this.selectHandler2(event)}
            value={this.state.toCurrency2}
          >
            {this.state.currencies.map((cur, key) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>
        {this.state.result2 && <h3>{this.state.result2}</h3>}
        <div className="Form">
          <input
            name="amount3"
            type="text"
            value={this.state.amount3}
            onChange={event => this.setState({ amount3: event.target.value })}
          ></input>

          <select
            name="from"
            onChange={event => this.selectHandler3(event)}
            value={this.state.fromCurrency3}
            // value={this.state.currencies[0]}
          >
            {this.state.currencies.map((cur, key) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>

          <select
            name="to"
            onChange={event => this.selectHandler3(event)}
            value={this.state.toCurrency3}
          >
            {this.state.currencies.map((cur, key) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>
        {this.state.result3 && <h3>{this.state.result3}</h3>}
        <div className="Form">
          <input
            name="amount"
            type="text"
            value={this.state.amount4}
            onChange={event => this.setState({ amount4: event.target.value })}
          ></input>

          <select
            name="from"
            onChange={event => this.selectHandler4(event)}
            value={this.state.fromCurrency4}
            // value={this.state.currencies[0]}
          >
            {this.state.currencies.map((cur, key) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>

          <select
            name="to"
            onChange={event => this.selectHandler4(event)}
            value={this.state.toCurrency4}
          >
            {this.state.currencies.map((cur, key) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>
        {this.state.result4 && <h3>{this.state.result4}</h3>}
        <div className="Form">
          <input
            name="amount"
            type="text"
            value={this.state.amount5}
            onChange={event => this.setState({ amount5: event.target.value })}
          ></input>

          <select
            name="from"
            onChange={event => this.selectHandler5(event)}
            value={this.state.fromCurrency5}
            // value={this.state.currencies[0]}
          >
            {this.state.currencies.map((cur, key) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>

          <select
            name="to"
            onChange={event => this.selectHandler5(event)}
            value={this.state.toCurrency5}
          >
            {this.state.currencies.map((cur, key) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>
        {this.state.result5 && <h3>{this.state.result5}</h3>}
      </div>
    );
  }
}

// export default Converter;
