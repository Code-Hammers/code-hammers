"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorControllers_1 = require("./controllers/errorControllers");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.default)();
app.use("/api/users", userRoutes_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "/client/build")));
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html")));
}
else {
    app.get("/api", (req, res) => {
        res.json({ message: "API Running - Hazzah!" });
    });
}
app.use(errorControllers_1.notFound);
app.use(errorControllers_1.errorHandler);
const PORT = Number(process.env.PORT) || 3000;
const startServer = () => {
    return app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
};
exports.startServer = startServer;
if (require.main === module) {
    (0, exports.startServer)();
}
exports.default = app;
