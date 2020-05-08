import { createRequire } from "module";
import { statement } from "../../src/chapter1/main.js";

const require = createRequire(import.meta.url);
let chai = require("chai");
let expect = chai.expect;

describe("statement", function () {
  it("", function () {
    const require = createRequire(import.meta.url);
    let invoices = require("../../data/invoices.json");
    let plays = require("../../data/plays.json");

    const output =
      "Statement for BigCo\n" +
      " Hamlet: $650.00 (55 seats)\n" +
      " As You Like It: $580.00 (35 seats)\n" +
      " Othello: $500.00 (40 seats)\n" +
      "Amount owed is $1,730.00\n" +
      "You earned 47 credits\n";

    expect(statement(invoices[0], plays)).equal(output);
  });
});
