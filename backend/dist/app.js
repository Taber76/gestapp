"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const environment_1 = require("./config/environment");
const mogodb_1 = __importDefault(require("./config/mogodb"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
// ---------- Database connection --
mogodb_1.default.getInstance().getConnection();
if (!mogodb_1.default.getInstance().getConnection()) {
    console.log('No connection to database');
}
// ---------- Middlewares ----------
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// ---------- Routes ---------------
app.use('/api/v1/user', user_route_1.default);
// ---------- Websocket ------------
// ---------- Start server ---------
app.listen(environment_1.PORT, () => {
    console.log(`Server running on port ${environment_1.PORT}`);
});
exports.default = app;
