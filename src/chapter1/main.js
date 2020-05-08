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
        const play = playFor(perf);
        let thisAmount = amountFor(perf, play);

        // ボリューム特典のポイントを加算
        volumeCredits += Math.max(perf.audience - 30, 0);
        // 喜劇のときは 10人につき、 さらにポイントを加算
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
        // 注文の内訳を出力
        result += ` ${play.name}: ${format(thisAmount / 100)} (${
            perf.audience
            } seats)\n`;
        totalAmount += thisAmount;
    }

    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    return result;

    function amountFor(aPerformances, play){
        let result = 0;
        switch (play.type) {
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
                throw new Error(`unknown type: ${play.type}`);
        }
        return result;
    }

    function playFor(aPerformances){
        return plays[aPerformances.playID];
    }
}