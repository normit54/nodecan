const mongoose = require("mongoose");
const RolePrivileges = require("./RolePrivileges");
//ilk asama created_by  require true yı kaldırdık
const schema = mongoose.Schema({
    role_name: {type: mongoose.SchemaTypes.String, required: true, unique: true},
    is_active: {type: Boolean, default: true},
    created_by: {
        type: mongoose.SchemaTypes.ObjectId
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

//routes role silme de yetki silme burada yapıldı
class Roles extends mongoose.Model {
    static async deleteMany(query) {
        
        if (query._id) {
            await RolePrivileges.deleteMany({role_id: query._id});  

        }
        
        await super.deleteMany(query);
    }
}

schema.loadClass(Roles);
//roles tablo ismi - schema da sema
module.exports = mongoose.model("roles", schema);