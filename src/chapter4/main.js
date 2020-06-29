export class Province { //chiiki
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }
  addProducer(arg) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get name() {
    return this._name;
  }
  get producers() {
    return this._producers.slice();
  }
  get totalProduction() {
    return this._totalProduction;
  }
  set totalProduction(arg) {
    this._totalProduction = arg;
  }
  get demand() { //juyou
    return this._demand;
  }
  set demand(arg) { //juyou
    this._demand = parseInt(arg);
  }
  get price() {
    return this._price;
  }
  set price(arg) {
    this._price = parseInt(arg);
  }
  get shortfall() { //husoku
    return this._demand - this.totalProduction;
  }

  get profit() {
    return this.demandValue - this.demandCost; //total_uriage - total_shiharai
  }
  get demandCost() { //total_shiharai = (cost * seisanryou) + ...seisansyabun
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost) //コストの安い生産者から順に生産を依頼する
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production); //需要以上は生産しない
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }
  get demandValue() { //total_uriage = total_seisanryou * kakaku
    return this.satisfiedDemand * this.price;
  }
  get satisfiedDemand() { //total_seisanryou
    return Math.min(this.demand, this.totalProduction); //需要以上生産したら売れない
  }
}

export class Producer {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }
  get name() {
    return this._name;
  }
  get cost() {
    return this._cost;
  }
  set cost(arg) {
    this._cost = parseInt(arg);
  }
  get production() {
    return this._production;
  }
  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}

export function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "Byzantium", cost: 10, production: 9 },
      { name: "Attalia", cost: 12, production: 10 },
      { name: "Sinope", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}
