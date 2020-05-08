import { createRequire } from "module";
import { Province, sampleProvinceData } from "../chapter4.js"

const require = createRequire(import.meta.url);

let assert = require("assert");

// describe("Array", function () {
//   describe("#indexOf()", function () {
//     it("should return -1 when the value is not present", function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvinceData());
    assert.equal(asia.shortfall, 5);
  });
});
