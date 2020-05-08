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
    return renderPlainText(statementData, invoice, plays);
}

export function renderPlainText(data, invoice, plays) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of invoice.performances) {
    // 注文の内訳を出力
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;

  return result;

  function amountFor(aPerformances) {
    let result = 0;
    switch (playFor(aPerformances).type) {
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
        throw new Error(`unknown type: ${playFor(aPerformances).type}`);
    }
    return result;
  }

  function playFor(aPerformances) {
    return plays[aPerformances.playID];
  }

  function volumeCreditsFor(aPerformances) {
    let result = 0;
    result += Math.max(aPerformances.audience - 30, 0);
    if ("comedy" === playFor(aPerformances).type)
      result += Math.floor(aPerformances.audience / 5);
    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
        result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount(){
    let result = 0;
    for (let perf of invoice.performances) {
        result += amountFor(perf);
    }
    return result;
  }
}
