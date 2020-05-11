export function createStatementData(invoice, plays) {
    const result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;
  
    // performanceごとにシャローコピーし、情報を追加する
    function enrichPerformance(aPerformances) {
      const result = Object.assign({}, aPerformances);
      result.play = playFor(result);
      result.amount = amountFor(result);
      result.volumeCredits = volumeCreditsFor(result);
      return result;
    }
  
    function playFor(aPerformances) {
      return plays[aPerformances.playID];
    }
  
    function amountFor(aPerformances) {
      let result = 0;
      switch (aPerformances.play.type) {
        case "tragedy":
          result = 40000;
          if (aPerformances.audience > 30) {
            result += 1000 * (aPerformances.audience - 30);
          }
          break;
        case "comedy":
          result = 30000;
          if (aPerformances.audience > 20) {
            result += 10000 + 500 * (aPerformances.audience - 20);
          }
          result += 300 * aPerformances.audience;
          break;
        default:
          throw new Error(`unknown type: ${aPerformances.play.type}`);
      }
      return result;
    }
  
    function volumeCreditsFor(aPerformances) {
      let result = 0;
      result += Math.max(aPerformances.audience - 30, 0);
      if ("comedy" === aPerformances.play.type)
        result += Math.floor(aPerformances.audience / 5);
      return result;
    }
  
    function totalVolumeCredits(data) {
      let result = 0;
      for (let perf of data.performances) {
        result += perf.volumeCredits;
      }
      return result;
    }
  
    function totalAmount(data) {
      let result = 0;
      for (let perf of data.performances) {
        result += perf.amount;
      }
      return result;
    }
  }