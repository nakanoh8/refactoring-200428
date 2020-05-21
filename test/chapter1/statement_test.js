import { createRequire } from "module";
import { statement, htmlStatement } from "../../src/chapter1/statement.js";

const require = createRequire(import.meta.url);
let chai = require("chai");
let expect = chai.expect;

describe("statement", function () {
  it("plainText", function () {
    /*
     * JSONデータ読み込み
     */
    const require = createRequire(import.meta.url);
    let invoices = require("../../data/invoices.json");
    let plays = require("../../data/plays.json");

    const output = "Statement for BigCo\n" +
      " Hamlet: $650.00 (55 seats)\n" +
      " As You Like It: $580.00 (35 seats)\n" +
      " Othello: $500.00 (40 seats)\n" +
      "Amount owed is $1,730.00\n" +
      "You earned 47 credits\n";
    
    console.log(">>>statement(invoices[0], plays)");
    console.log(statement(invoices[0], plays));
    expect(statement(invoices[0], plays)).equal(output);
  });

  it("html", function () {
    /*
     * JSONデータ読み込み
     */
    const require = createRequire(import.meta.url);
    let invoices = require("../../data/invoices.json");
    let plays = require("../../data/plays.json");

    const output = "<h1>Statement for BigCo</h1>\n" +
    "<table>\n" +
    "<tr><th>play</th><th>seats</th><th>cost</th></tr> <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n" +
    " <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n" +
    " <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n" +
    "</table>\n" +
    "<p>Amount owed is <em>$1,730.00</em></p>\n" +
    "<p>You earned <em>47</em> credits</p>\n";
    
    console.log(">>>htmlStatement(invoices[0], plays)");
    console.log(htmlStatement(invoices[0], plays));
    expect(htmlStatement(invoices[0], plays)).equal(output);
  });
});
