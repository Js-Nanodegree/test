import axios from 'axios';
import * as R from 'ramda';

const url = 'https://testnet.binancefuture.com';
const wsUrl = 'wss://dstream.binancefuture.com';

class MarkerDataBinance {
  constructor() {
    this.get = axios.get;
  }
  async exchangeInfo() {
    const {data} = await this.get(url + '/dapi/v1/exchangeInfo');
    return data;
  }

  async orderBook(symbol, limit) {
    const {data} = await this.get(url + '/dapi/v1/depth', {
      params: {symbol, limit},
    });
    return data;
  }

  async trades(symbol, limit) {
    const {data} = await this.get(url + '/dapi/v1/trades', {
      params: {symbol, limit},
    });
    return data;
  }

  async historicalTrades(symbol, limit, fromId) {
    // symbol	STRING	YES
    // limit	INT	NO	Default 500; max 1000.
    // fromId	LONG	NO	TradeId to fetch from.Default gets most recent trades.
    const {data} = await this.get(url + '/dapi/v1/historicalTrades', {
      params: {symbol, limit},
    });
    return data;
  }

  async premiumIndex(symbol, pair) {
    // symbol	STRING	NO BTCUSD_210924
    // pair	STRING	NO BTCUSD_210924
    const {data} = await this.get(url + '/dapi/v1/premiumIndex', {
      params: {symbol, pair},
    });
    return data;
  }

  async fundingRate(symbol, startTime, endTime, limit) {
    // symbol	STRING	YES
    // startTime	LONG	NO	Timestamp in ms to get funding rate from INCLUSIVE.
    // endTime	LONG	NO	Timestamp in ms to get funding rate until INCLUSIVE.
    // limit	INT	NO	Default 100; max 1000
    const {data} = await this.get(url + '/dapi/v1/fundingRate', {
      params: {symbol, startTime, endTime, limit},
    });
    return data;
  }

  async klines(symbol, interval, startTime, endTime, limit) {
    // symbol	STRING	YES
    // startTime	LONG	NO
    // endTime	LONG	NO
    // limit	INT	NO	Default 500; max 1500.

    const {data} = await this.get(url + '/dapi/v1/klines', {
      params: {symbol, interval, startTime, endTime, limit},
    });
    return data;
  }

  async indexPriceKlines(
    pair,
    contractType,
    interval,
    startTime,
    endTime,
    limit,
  ) {
    // pair	STRING	YES
    // interval	ENUM	YES || 1m || 3m || 5m || 15m || 30m || 1h || 2h || 4h || 6h || 8h || 12h || 1d || 3d || 1w || 1M
    // startTime	LONG	NO
    // endTime	LONG	NO
    // limit	INT	NO	Default 500; max 1500.
    const {data} = await this.get(url + '/dapi/v1/indexPriceKlines', {
      params: {pair, contractType, interval, startTime, endTime, limit},
    });
    return data;
  }

  async continuousKlines(
    pair,
    contractType,
    interval,
    startTime,
    endTime,
    limit,
  ) {
    // pair	STRING	YES
    // contractType	ENUM	YES   PERPETUAL || CURRENT_QUARTER || NEXT_QUARTER
    // interval	ENUM	YES || 1m || 3m || 5m || 15m || 30m || 1h || 2h || 4h || 6h || 8h || 12h || 1d || 3d || 1w || 1M
    // startTime	LONG	NO
    // endTime	LONG	NO
    // limit	INT	NO	Default 500; max 1500.
    const {data} = await this.get(url + '/dapi/v1/continuousKlines', {
      params: {pair, contractType, interval, startTime, endTime, limit},
    });
    return data;
  }

  async markPriceKlines(symbol, interval, startTime, endTime, limit) {
    // symbol	STRING	YES
    // interval	ENUM	YES || 1m || 3m || 5m || 15m || 30m || 1h || 2h || 4h || 6h || 8h || 12h || 1d || 3d || 1w || 1M
    // startTime	LONG	NO
    // endTime	LONG	NO
    // limit	INT	NO	Default 500; max 1500.
    const {data} = await this.get(url + '/dapi/v1/markPriceKlines', {
      params: {symbol, interval, startTime, endTime, limit},
    });
    return data;
  }

  async hr24Change(symbol, pair) {
    // symbol	STRING	NO
    // pair	STRING	NO
    const {data} = await this.get(url + '/dapi/v1/ticker/24hr', {
      params: {symbol, pair},
    });
    return data;
  }

  async priceChange(symbol, pair) {
    // symbol	STRING	NO
    // pair	STRING	NO
    const {data} = await this.get(url + '/dapi/v1/ticker/price', {
      params: {symbol, pair},
    });
    return data;
  }

  async bookTicker(symbol, pair) {
    // symbol	STRING	NO
    // pair	STRING	NO
    const {data} = await this.get(url + '/dapi/v1/ticker/bookTicker', {
      params: {symbol, pair},
    });
    return data;
  }

  async openInterest(symbol, pair) {
    // symbol	STRING	NO
    // pair	STRING	NO
    const {data} = await this.get(url + '/dapi/v1/openInterest', {
      params: {symbol, pair},
    });
    return data;
  }

  async openInterestHist(
    pair,
    contractType,
    period,
    limit,
    startTime,
    endTime,
  ) {
    // pair	STRING	YES	BTCUSD
    // contractType	ENUM	YES	ALL, CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL
    // period	ENUM	YES	"5m", "15m", "30m", "1h", "2h", "4h", "6h", "12h", "1d"
    // limit	LONG	NO	Default 30, Max 500
    // startTime	LONG	NO
    // endTime	LONG	NO
    const {data} = await this.get(url + '/futures/data/openInterestHist', {
      params: {pair, contractType, period, limit, startTime, endTime},
    });
    return data;
  }

  async topLongShortAccountRatio(pair, period, limit, startTime, endTime) {
    // pair	STRING	YES	BTCUSD
    // period	ENUM	YES	"5m", "15m", "30m", "1h", "2h", "4h", "6h", "12h", "1d"
    // limit	LONG	NO	Default 30, Max 500
    // startTime	LONG	NO
    // endTime	LONG	NO
    const {data} = await this.get(
      url + '/futures/data/topLongShortAccountRatio',
      {
        params: {pair, period, limit, startTime, endTime},
      },
    );
    return data;
  }

  async topLongShortPositionRatio(pair, period, limit, startTime, endTime) {
    // pair	STRING	YES	BTCUSD
    // period	ENUM	YES	"5m", "15m", "30m", "1h", "2h", "4h", "6h", "12h", "1d"
    // limit	LONG	NO	Default 30, Max 500
    // startTime	LONG	NO
    // endTime	LONG	NO
    const {data} = await this.get(
      url + '/futures/data/topLongShortPositionRatio',
      {
        params: {pair, period, limit, startTime, endTime},
      },
    );
    return data;
  }

  async globalLongShortAccountRatio(pair, period, limit, startTime, endTime) {
    // pair	STRING	YES	BTCUSD
    // period	ENUM	YES	"5m", "15m", "30m", "1h", "2h", "4h", "6h", "12h", "1d"
    // limit	LONG	NO	Default 30, Max 500
    // startTime	LONG	NO
    // endTime	LONG	NO
    const {data} = await this.get(
      url + '/futures/data/globalLongShortAccountRatio',
      {
        params: {pair, period, limit, startTime, endTime},
      },
    );
    return data;
  }

  async takerBuySellVol(pair, contractType, period, limit, startTime, endTime) {
    // pair	STRING	YES	BTCUSD
    // contractType	ENUM	YES	ALL, CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL
    // period	ENUM	YES	"5m", "15m", "30m", "1h", "2h", "4h", "6h", "12h", "1d"
    // limit	LONG	NO	Default 30, Max 500
    // startTime	LONG	NO
    // endTime	LONG	NO
    const {data} = await this.get(url + '/futures/data/takerBuySellVol', {
      params: {pair, contractType, period, limit, startTime, endTime},
    });
    return data;
  }

  async basis(pair, contractType, period, limit, startTime, endTime) {
    // pair	STRING	YES	BTCUSD
    // contractType	ENUM	YES	CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL
    // period	ENUM	YES	"5m", "15m", "30m", "1h", "2h", "4h", "6h", "12h", "1d"
    // limit	LONG	NO	Default 30, Max 500
    // startTime	LONG	NO
    // endTime	LONG	NO
    const {data} = await this.get(url + '/futures/data/basis', {
      params: {pair, contractType, period, limit, startTime, endTime},
    });
    return data;
  }
}

const MarkerDataBinanceData = new MarkerDataBinance();

export default MarkerDataBinanceData;
