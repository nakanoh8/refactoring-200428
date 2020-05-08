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
    expect(statement(invoices[0], plays)).equal(5);
  });
});
