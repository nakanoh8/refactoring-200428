class testClass{
    constructor(hoge, fuga){
        this._hoge = hoge;
        this._fuga = fuga;
    }
    get hoge(){
        return this._hoge;
    }
    set hoge(hoge){
        this._hoge = hoge;
    }
    get hogefuga(){
        return this.gattai();
    }
    gattai(){
        return this._hoge + this._fuga;
    }
    gethoge(){
        return this._hoge; 
    }
}

let t = new testClass('hogeだよ', 'fugaだよ');
// console.log(t.hoge);
// t.hoge = 'hogeDAYO';
// console.log(t.hoge);
// console.log(t.hogefuga);
console.log(t.gethoge());