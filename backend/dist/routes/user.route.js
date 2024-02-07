"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_mid_1 = __importDefault(require("../middlewares/auth.mid"));
const userRouter = express_1.default.Router();
userRouter.post('/register', user_controller_1.default.register);
userRouter.post('/login', user_controller_1.default.login);
userRouter.put('/update', auth_mid_1.default.authenticate('userJWT', { session: false }), user_controller_1.default.update);
exports.default = userRouter;
