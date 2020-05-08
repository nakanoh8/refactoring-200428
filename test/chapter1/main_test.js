import { createRequire } from "module";
import { statement, renderPlainText } from "../../src/chapter1/main.js";

const require = createRequire(import.meta.url);
let chai = require("chai");
let expect = chai.expect;

describe("chapter1", function () {
  const require = createRequire(import.meta.url);
  let invoices;
  let plays;

  const invoiceCustomer = "BigCo";
  const play1 = {};
  play1.name = "Hamlet";
  play1.amount = "$650.00";
  play1.perfAudience = 55;
  const play2 = {};
  play2.name = "As You Like It";
  play2.amount = "$580.00";
  play2.perfAudience = 35;
  const play3 = {};
  play3.name = "Othello";
  play3.amount = "$500.00";
  play3.perfAudience = 40;
  const totalAmount = "$1,730.00";
  const volumeCredits = 47;

  const output =
    `Statement for ${invoiceCustomer}\n` +
    ` ${play1.name}: ${play1.amount} (${play1.perfAudience} seats)\n` +
    ` ${play2.name}: ${play2.amount} (${play2.perfAudience} seats)\n` +
    ` ${play3.name}: ${play3.amount} (${play3.perfAudience} seats)\n` +
    `Amount owed is ${totalAmount}\n` +
    `You earned ${volumeCredits} credits\n`;

  beforeEach(function () {
    /*
     * JSONデータ読み込み
     */
    invoices = require("../../data/invoices.json");
    plays = require("../../data/plays.json");
  });

  it("statement", function () {
    expect(statement(invoices[0], plays)).equal(output);
  });

//   it("renderPlainText", function () {
//     expect(renderPlainText({}, invoices[0], plays)).equal(output);
//   });
});
