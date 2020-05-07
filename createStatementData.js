export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  //中間データ構造に対する値を設定
  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    const calculator = new createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
      case "tragedy":
        return new TragedyCalculator(aPerformance, aPlay);
      case "comedy":
        return new ComedyCalculator(aPerformance, aPlay);
      default:
        throw new Error(` 未知の演劇の種類: ${aPlay.type}`);
    }
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}

//公園に応じた計算を行うクラス
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw "想定外の呼び出し";
  }

  get volumeCredits() {
    let result = 0;
    // ボリューム特典のポイントを加算
    result += Math.max(this.performance.audience - 30, 0);
    // 喜劇のときは 10人につき、 さらにポイントを加算
    if ("comedy" === this.play.type)
      result += Math.floor(this.performance.audience / 5);
    return result;
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 3000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    return result;
  }
}
