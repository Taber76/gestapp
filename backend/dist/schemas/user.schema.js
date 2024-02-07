"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: false },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                return re.test(v);
            },
            message: props => `${props.value} no es un correo electrónico válido`
        }
    },
    phone: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['GESTOR', 'USUARIO']
    },
    avatar: { type: String, required: false },
    services: { type: Object, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    active: { type: Boolean, default: false },
});
