"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/login", userController_1.authUser);
router.post("/register", userController_1.registerUser);
router.delete("/:email", userController_1.deleteUserByEmail);
router.get("/:userId", userController_1.getUserById);
exports.default = router;
