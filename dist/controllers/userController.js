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
exports.deleteUserByEmail = exports.getUserById = exports.authUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// ENDPOINT  POST api/users/register
// PURPOSE   Register a new user
// ACCESS    Public
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const isValidEmail = email.match(/[\w\d\.]+@[a-z]+\.[\w]+$/gim);
        if (!isValidEmail) {
            return res.status(400).json("Invalid Email");
        }
        const userExists = yield userModel_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const user = yield userModel_1.default.create({
            name,
            email,
            password,
        });
        if (user) {
            res.locals.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: (0, generateToken_1.default)(user._id.toString()),
            };
            return res.status(201).json(res.locals.user);
        }
    }
    catch (error) {
        console.error("Error during user signup:", error);
        return next({
            log: "Express error in createUser Middleware",
            status: 503,
            message: { err: "An error occurred during sign-up" },
        });
    }
});
exports.registerUser = registerUser;
// ENDPOINT  POST api/users/login
// PURPOSE   Authenticate User and get token
// ACCESS    Public
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const isValidEmail = email.match(/[\w\d\.]+@[a-z]+\.[\w]+$/gim);
    if (!isValidEmail) {
        return res.status(400).json({ msg: "Please enter a valid email" }); //TODO Move to global error handler
    }
    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required!" }); //TODO Move to global error handler
    }
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "User not found!" }); //TODO Move to global error handler
        }
        if (user && (yield user.matchPassword(password))) {
            res.locals.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: (0, generateToken_1.default)(user._id.toString()),
            };
            return res.status(200).json(res.locals.user);
        }
        else {
            return res.status(401).json({ msg: "Incorrect password" }); //TODO Move to global error handler
        }
    }
    catch (error) {
        console.error("Error during user authentication:", error);
        return next({
            log: "Express error in createUser Middleware",
            status: 503,
            message: { err: "An error occurred during login" },
        });
    }
});
exports.authUser = authUser;
// ENDPOINT  GET api/users/:userId
// PURPOSE   Get user by id
// ACCESS    Private
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield userModel_1.default.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "User not found!" }); //TODO Move to global error handler
        }
        res.locals.user = user;
        return res.status(200).json(res.locals.user);
    }
    catch (error) {
        return next({
            log: "Express error in getUserById Middleware",
            status: 500,
            message: { err: "An error occurred during retrieval" },
        });
    }
});
exports.getUserById = getUserById;
// ENDPOINT  DELETE api/users/:email
// PURPOSE   Delete user by email
// ACCESS    Private
const deleteUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const user = yield userModel_1.default.findOneAndRemove({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found!" }); //TODO Move to global error handler
        }
        return res.status(200).json({ msg: "User successfully deleted!" });
    }
    catch (error) {
        return next({
            log: "Express error in getUserByEmail Middleware",
            status: 500,
            message: { err: "An error occurred during removal" },
        });
    }
});
exports.deleteUserByEmail = deleteUserByEmail;
