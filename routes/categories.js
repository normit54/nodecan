//temel express js yapısı

var express = require('express');
var router = express.Router();

//VERİTABANINDAN OKUMA  VIDEO 
const Categories = require("../db/models/Categories");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
//bazi degerleri belli bir standarta oturtuyoruz http kodları gibi
const Enum = require("../config/Enum"); 


//video 8 dk 24 authentication denemesi middleware ornek
// const isAuthhenticated = false;  //degeri false ve true icin dene
// router.all("*", (req, res, next) => {
//    if (isAuthhenticated) {
//        next();
//     } else {
//         res.json({success: false, error: "Not authenticated"});
//     }
// })

/**
 * CREATE / READ / UPDATE / DELETE  --- C R U D
 */


/* GET users listing. */
// router.get('/', function(req, res, next) {
router.get('/',  async (req, res, next) => {
//   res.send('respond with a resource');
  try {
    let categories = await Categories.find({});
    // res.json(categories);
    res.json(Response.successResponse(categories));

  } catch (err) {
    //lib klasoru olusturduk
    // res.json(Response.errorResponse(err));
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
  // res.json({success: true});
});

//video 9 dk 11 kayıt ekleme  next mecbur değil
//video 9 dk13:13 body name var mı kontrol ediyoruz
router.post("/add", async (req, res) => {
  let body = req.body; 
  try {
      if (!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "name field must be filled ");
        // isim alani girilmisse kaydi yapabiliriz
   
      let category = new Categories({
        name: body.name,
        is_active: true,
        created_by: req.user?.id
    });

    await category.save();

    res.json(Response.successResponse({ success: true }));

    } catch (err) {
      let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }

});

router.post("/update", async (req, res) => {
  let body = req.body;
  try {
    if (!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "id field must be filled ");
      let updates = {};

      if (body.name) updates.name = body.name;
      if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

      await Categories.updateOne({ _id: body._id }, updates);

      
      res.json(Response.successResponse({ success: true }));

  } catch (err) {
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);
  }
})


router.post("/delete", async (req, res) => {
    let body = req.body;

    try {
        if (!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "id field must be filled ");

        await Categories.deleteMany({ _id: body._id });

        res.json(Response.successResponse({ success: true }));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }

})


module.exports = router;