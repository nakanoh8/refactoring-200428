import { createRequire } from "module";
import { createStatementData } from "../../src/chapter1/createStatementData.js";

const require = createRequire(import.meta.url);
let chai = require("chai");
let expect = chai.expect;

describe("createStatementData", function () {
  it("", function () {
    /*
     * JSONデータ読み込み
     */
    const require = createRequire(import.meta.url);
    const invoices = require("../../data/invoices.json");
    const plays = require("../../data/plays.json");

    const statementData = createStatementData(invoices[0], plays);

    expect(statementData.customer).equal("BigCo");
    expect(statementData.performances.length).equal(3); //プロパティ全部確認すべき？
    expect(statementData.totalAmount).equal(173000);
    expect(statementData.totalVolumeCredits).equal(47);
  });
});
