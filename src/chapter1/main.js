import { createRequire } from "module";

/*
 * JSONデータ読み込み
 */
// const require = createRequire(import.meta.url);
// let invoices = require("../../data/invoices.json");
// let plays = require("../../data/plays.json");
// console.log(statement(invoices[0], plays));

export function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText(statementData, plays);

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
}

export function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // 注文の内訳を出力
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.volumeCredits;
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }
    return result;
  }
}
