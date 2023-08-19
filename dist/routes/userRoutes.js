"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/login', userController_1.authUser, (res) => {
    return res.status(200).json({ msg: "Successful login!" });
});
router.post('/', userController_1.registerUser, (res) => {
    return res.status(200).json({ msg: "Successful register!" });
});
exports.default = router;
