//temel express js yapısı

var express = require('express');
var router = express.Router();

//video 8 dk 13 yeni sitemde alttaki blok değişiyor
//environments config klasorunu tanımladık - views index.js de basacağız
// const config = require("../config");
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'GURKAN Express', config: config });
// });
// dk 15:10 yeni tasarım  dinamik routing yapısı

const fs = require("fs");
// ./ kullanmaktansa  __dirname kullan
let routes = fs.readdirSync(__dirname);

for (let route of routes) {
  if (route.includes(".js") && route != "index.js") {
    router.use("/"+route.replace(".js", ""), require('./'+route));
  }
}



module.exports = router;
