const mongoose = require("mongoose");

const schema = mongoose.Schema({
    role_id: {type: mongoose.SchemaTypes.ObjectId, required: true},
    user_id: {type: mongoose.SchemaTypes.ObjectId, required: true},
       
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
class UserRoles extends mongoose.Model {
    constructor(parameters) {
        
    }
}

schema.loadClass(UserRoles);
//userroles tablo ismi - schema da sema
module.exports = mongoose.model("user_roles", schema);