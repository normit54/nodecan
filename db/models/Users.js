const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    first_name: String,
    last_name: String,
    phone_number: String,
    language: { type: String, default: DEFAULT_LANG }
}, {
    versionKey: false,
    //timestamps: true olarak da yazılabilir
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

//root kismi yazılırken detay girilecek
class Users extends mongoose.Model {
    constructor(parameters) {
        
    }
}

schema.loadClass(Users);
//users tablo ismi - schema da sema
module.exports = mongoose.model("users", schema);