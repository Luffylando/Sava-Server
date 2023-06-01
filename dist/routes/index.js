"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const defaultRoutes_1 = require("./defaultRoutes");
const articles_1 = require("./articles");
const categories_1 = require("./categories");
const tags_1 = require("./tags");
exports.routes = express_1.default.Router();
exports.routes.use(express_1.default.json());
exports.routes.use(defaultRoutes_1.defaultRoute);
exports.routes.use('/articles', articles_1.articleRoutes);
exports.routes.use('/categories', categories_1.categoriesRoutes);
exports.routes.use('/tags', tags_1.tagsRoutes);
