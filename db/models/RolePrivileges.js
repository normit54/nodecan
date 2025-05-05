const mongoose = require("mongoose");
//ilk asama created_by  require true yı kaldırdık
const schema = mongoose.Schema({
    role_id: {type: mongoose.SchemaTypes.ObjectId, required: true},
    permission: {type: String, required: true},
    created_by: {type: mongoose.SchemaTypes.ObjectId},
       
}, {
    //mogoose un versionKey i otomatik olusturmasını kapattık
    versionKey: false,
    //timestamps: true olarak da yazılabilir
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

//root kismi yazılırken detay girilecek
class RolePrivileges extends mongoose.Model {
    constructor(parameters) {
        
    }
}

schema.loadClass(RolePrivileges);
//userroles tablo ismi - schema da sema
module.exports = mongoose.model("role_privileges", schema);