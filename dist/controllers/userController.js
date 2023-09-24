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
exports.authUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// ENDPOINT  POST api/users
// PURPOSE   Register a new user
// ACCESS    Public
const registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const isValidEmail = email.match(/[\w\d\.]+@[a-z]+\.[\w]+$/gim);
    if (!isValidEmail) {
        return next();
    }
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: "User already exists!" });
        return;
    }
    const user = yield userModel_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: (0, generateToken_1.default)(user._id.toString()),
        });
    }
    else {
        res.status(400).json({ message: "Invalid user data!" });
    }
}));
exports.registerUser = registerUser;
// ENDPOINT  POST api/users/login
// PURPOSE   Authenticate User and get token
// ACCESS    Public
const authUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: (0, generateToken_1.default)(user._id.toString()),
        });
    }
    else {
        res.status(400).json({ message: "Invalid email or password!" });
    }
}));
exports.authUser = authUser;
