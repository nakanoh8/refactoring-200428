import { createRequire } from "module";

/*
 * JSONデータ読み込み
 */
const require = createRequire(import.meta.url);
let invoices = require('../../data/invoices.json');
let plays = require('../../data/plays.json');
// console.log(statement(invoices[0], plays));


export function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;

    const format = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2
    }).format;

    for (let perf of invoice.performances) {

        volumeCredits += volumeCreditsFor(perf);
        
        // 注文の内訳を出力
        result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
            perf.audience
            } seats)\n`;
        totalAmount += amountFor(perf);
    }

    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    return result;

    function amountFor(aPerformances){
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

    function playFor(aPerformances){
        return plays[aPerformances.playID];
    }

    function volumeCreditsFor(perf){
        let volumeCredits = 0;
        volumeCredits += Math.max(perf.audience - 30, 0);
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
        return volumeCredits;
    }
}