var fs = require('fs');  
var path = require('path');  
let catalog = '../../src/pages'
//解析需要遍历的文件夹，我这以E盘根目录为例  
// var filePath = path.resolve('D:');  
var filePath = path.resolve(__dirname, catalog);
var icon_json = {"path": "font-icon/other/","templates": []};
  
function asyncReaddir(path, option) {
  return new Promise((resolve, _) => {
    fs.readdir(path, option, (err, files) => {
      if (err) {
        throw err;
      }
      resolve(files);
    });
  });
}

function asyncStat(path) {
  return new Promise((resolve, _) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        throw err;
      }
      resolve(stats);
    });
  });
}



/** 
 * 文件遍历方法 
 * @param filePath 需要遍历的文件路径 
 */  
async function fileDisplay(filePath,parentPath){  
  const fileArray = [];
  const files = await asyncReaddir(filePath)
  // console.log(files)

  for (let filename of files) {
    var filejson = {};
    //获取当前文件的绝对路径  
    var filedir = path.join(filePath,filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象  
    const stats = await asyncStat(filedir)
    var isFile = stats.isFile(); // 是文件  
    var isDir = stats.isDirectory(); // 是文件夹  
    if(isFile){
      // console.log(filedir);  
    }
    if(isDir){
      filejson.name = filename
      filejson.path = parentPath ? '/' + parentPath + '/' + filename : '/' + filename;
      filejson.component = `() => import(/* webpackPrefetch: true */ '@/pages${filejson.path}')`
      filejson.routes = [];
      fileArray.push(filejson);
      filejson.routes = await fileDisplay(filedir, filename);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
    }  
  };
  return fileArray
  // let res = '['
  // for (let file of fileArray) {
  //   res += `{
  //     name: "analysis",
  //     path: "/analysis",
  //     component: () => import(''),
  //     routes: [
  //       { name: "mainOverview", path: "/analysis/mainOverview", routes: [] },
  //       { name: "sdkMonitor", path: "/analysis/sdkMonitor", routes: [] },
  //     ],
  //   },`
  // }
  // res += ']'
  // return res
}

function jsontranslate(fileArray) {
  let res = '['
  for (let file of fileArray) {

    res += `{
      name: '${file.name}',
      path: '${file.path}',
      component: ${file.component},
      routes: ${jsontranslate(file.routes)},
    },`
  }
  res += ']'
  return res
}

// (async function(){
//   //调用文件遍历方法  
// let a = await fileDisplay(filePath, '')
// let v = jsontranslate(a)
// console.log(66666);
// console.log(v);
// console.log(66666);

//   console.log(JSON.stringify(a))
// })()


function parsePath(p) {
  return p.replace(/\\/g, "/");
}

module.exports = async function(source) {
  // const path= `${this.context}\\page`
  const path= `${this.context}\\page`
  const callback = this.async();
  this.addContextDependency(path)
  
  console.log('asf',this._compiler.options.resolve.alias)
  // _compiler.options.resolve
  try{
    // const st= fs.statSync(path)
    // if(!st.isDirectory()){
    //   console.error('page，应该为目录');
    //   callback(null, source);
    //   return ;
    // }
    // let res= await readFileList(path);
    let a = await fileDisplay(filePath, '')
    let v = jsontranslate(a)
    console.log(7777);
    console.log(v)
    console.log(7777);

    callback(null, ` export default ${v}`);
  }catch(e){
    callback(null, source);
  }
};
 


