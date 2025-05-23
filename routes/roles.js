const express = require('express');
const router = express.Router();

const Roles = require("../db/models/Roles");
const RolePrivileges = require("../db/models/RolePrivileges");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
//bazi degerleri belli bir standarta oturtuyoruz http kodları gibi
const Enum = require("../config/Enum"); 
const role_privileges = require("../config/role_privileges");

router.get('/',  async (req, res, next) => {
  try {
    let roles = await Roles.find({});
    res.json(Response.successResponse(roles));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
});

router.post("/add", async (req, res) => {
  let body = req.body; 
  try {
      if (!body.role_name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "Role name field must be filled ");
      if (!body.permissions || !Array.isArray(body.permissions) || body.permissions.length == 0) {
           throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "Permissions field must be an Array ");
       }

      let role = new Roles({
        role_name: body.role_name,
        is_active: true,
        created_by: req.user?.id
    });
    await role.save();

    for (let i = 0; i < body.permissions.length; i++) {
             let priv = new RolePrivileges({
                 role_id: role._id,
                 permission: body.permissions[i],
                 created_by: req.user?.id
             });

             await priv.save();
    }

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

      if (body.role_name) updates.role_name = body.role_name;
      if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

      if (body.permissions && Array.isArray(body.permissions) && body.permissions.length > 0) {
         //gonderilen ile db de olan permission karsılastırılmalı   
        let permissions = await RolePrivileges.find({role_id: body._id});

        // body.permissions => ["category_view", "user_add"]
        // db deki permissions => [{role_id: "abc", permission: "user_add", _id: "bcd"}];
        // db ile body permission aynı yapıda değil o uzden db d map kullanıldı
        //veri tabanında olan donen body de olmayanlar
        let removedPermissions = permissions.filter(x => !body.permissions.includes(x.permission));
        //body permission da olan db de olmayan
        let newPermissions = body.permissions.filter(x => !permissions.map(p => p.permission).includes(x));

        if (removedPermissions.length > 0) {
               await RolePrivileges.deleteMany({ _id: { $in: removedPermissions.map(x => x._id) } });
            }
        
        if (newPermissions.length > 0) {
             for (let i = 0; i < newPermissions.length; i++) {
                let priv = new RolePrivileges({
                role_id: body._id,
                permission: newPermissions[i],
                created_by: req.user?.id
             });
        
             await priv.save();
             }
        }
       
      }

      await Roles.updateOne({ _id: body._id }, updates);

      
      res.json(Response.successResponse({ success: true }));

  } catch (err) {
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);
  }
})

//roleprivileges silmeyi model s de router icinde yaptık
router.post("/delete", async (req, res) => {
    let body = req.body;
    try {
        if (!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "id field must be filled ");
        await Roles.deleteMany({ _id: body._id });
        res.json(Response.successResponse({ success: true }));
    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
})

router.get('/role_privileges',  async (req, res, next) => {
        
      res.json(role_privileges);
});



module.exports = router;
