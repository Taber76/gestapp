"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../config/environment");
const user_model_1 = __importDefault(require("../models/user.model"));
const user_helper_1 = require("../helpers/user.helper");
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.password = (0, user_helper_1.checkAndHashPassword)(req.body.password);
                const user = yield user_model_1.default.register(req.body);
                user.password = '';
                res.status(201).json(user);
            }
            catch (error) {
                res.status(500).json({ error: `Error to register user: ${error}` });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.login(req.body.email, req.body.username);
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                }
                else if (!(0, user_helper_1.checkPassword)(req.body.password, user.password)) {
                    res.status(401).json({ error: 'Wrong password' });
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ id: user._id }, environment_1.JWT_SECRET, { expiresIn: environment_1.JWT_EXPIRES_IN });
                    user.password = '';
                    res.status(202).json({ token, user: user });
                }
            }
            catch (error) {
                res.status(500).json({ error: `Error to login user: ${error}` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user.id;
                if (req.body.password) {
                    req.body.password = (0, user_helper_1.checkAndHashPassword)(req.body.password);
                }
                const updatedUser = yield user_model_1.default.update(id, req.body);
                if (!updatedUser) {
                    res.status(404).json({ error: 'User not found' });
                }
                else {
                    res.status(202).json(updatedUser);
                }
            }
            catch (error) {
                res.status(500).json({ error: `Error to update user: ${error}` });
            }
        });
    }
}
exports.default = new UserController();
