export function createStatementData(invoice, plays) {
    const result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;
  
    // performanceごとにシャローコピーし、情報を追加する
    function enrichPerformance(aPerformances) {
      const calculator = createPerformanceCalculator(aPerformances, playFor(aPerformances));
      const result = Object.assign({}, aPerformances); //ディープコピーのように使っている？
      result.play = calculator.play;
      result.amount = calculator.amount;
      result.volumeCredits = calculator.volumeCredits;
      return result;
    }
  
    function playFor(aPerformances) {
      return plays[aPerformances.playID];
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

  function createPerformanceCalculator(aPerformances, aPlay){
    switch(aPlay.type){
      case "tragedy":
        return new TragedyCalculator(aPerformances, aPlay)
      case "comedy":
        return new ComedyCalculator(aPerformances, aPlay)
      default:
        throw new Error(`未知の演劇の種類:${aPlay.type}`)
    }
    return new PerformanceCalculator(aPerformances, aPlay)
  }

  class PerformanceCalculator{
    constructor(aPerformances, aPlay){
      this.performances = aPerformances;
      this.play = aPlay;
    }

    get amount(){
      throw new Error(`サブクラスの責務`);
    }

    get volumeCredits(){
      return Math.max(this.performances.audience - 30, 0);
    }
  }

  class TragedyCalculator extends PerformanceCalculator{
    get amount(){
      let result = 40000;
      if (this.performances.audience > 30) {
        result += 1000 * (this.performances.audience - 30);
      }
      return result;
    }
  }

  class ComedyCalculator extends PerformanceCalculator{
    get amount(){
      let result = 0;
      result = 30000;
      if (this.performances.audience > 20) {
        result += 10000 + 500 * (this.performances.audience - 20);
      }
      result += 300 * this.performances.audience;
      return result;
    }

    get volumeCredits(){
      return super.volumeCredits + Math.floor(this.performances.audience / 5);
    }
  }