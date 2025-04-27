const mongoose = require("mongoose");

const schema = mongoose.Schema({
    role_name: {type: mongoose.SchemaTypes.String, required: true},
    is_active: {type: Boolean, default: true},
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
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
class Roles extends mongoose.Model {
    constructor(parameters) {
        
    }
}

schema.loadClass(Roles);
//roles tablo ismi - schema da sema
module.exports = mongoose.model("roles", schema);