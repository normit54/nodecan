//temel express js yapısı

var express = require('express');
var router = express.Router();

//video 8 dk 24 authentication denemesi
const isAuthhenticated = false;  //degeri false ve true icin dene
router.all("*", (req, res, next) => {
   if (isAuthhenticated) {
       next();
    } else {
        res.json({success: false, error: "Not authenticated"});
    }
})

/* GET users listing. */
router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
  res.json({success: true});
});




module.exports = router;