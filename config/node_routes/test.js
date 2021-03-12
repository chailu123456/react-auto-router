
module.exports = function(source) {
  console.log(this.query);
  // console.log(this);
  const callback = this.async();
  let v2 = "{";
  v2 += `
    name: '${this.query.name}',
    age: 77
  `
  v2+="}"
  callback(null, ` export default ${v2}`);  // callback返回数据（异步），异步不可以使用return
}