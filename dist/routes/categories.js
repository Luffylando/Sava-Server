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
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.categoriesRoutes = (0, express_1.Router)();
/**
 * returns categories
 */
exports.categoriesRoutes.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany();
        res.send(categories);
    }
    catch (err) {
        next(err);
    }
}));
/**
 * returns single category by id
 */
exports.categoriesRoutes.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const category = yield prisma.category.findUnique({
            where: {
                CategoryID: id,
            },
        });
        return res.send({ category });
    }
    catch (err) {
        next(err);
    }
}));
/**
 * creates new category
 */
exports.categoriesRoutes.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const category = yield prisma.category.create({
            data: {
                Title: title,
            }
        });
        return res.send({ category });
    }
    catch (err) {
        next(err);
    }
}));
/**
 * edits already existing category
 */
exports.categoriesRoutes.patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const id = parseInt(req.params.id);
    const isIdLegit = yield prisma.category.findUnique({ where: { CategoryID: id } });
    if (isIdLegit) {
        try {
            const category = yield prisma.category.update({
                where: {
                    CategoryID: id,
                },
                data: {
                    Title: title,
                },
            });
            return res.send({ category });
        }
        catch (err) {
            next(err);
        }
    }
    return next();
}));
/**
 * hard deletes category resource
 */
exports.categoriesRoutes.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const isIdLegit = yield prisma.category.findUnique({ where: { CategoryID: id } });
    if (isIdLegit) {
        try {
            yield prisma.category.delete({
                where: {
                    CategoryID: id,
                }
            });
            return res.send({
                "Message": `Category by ID: ${id} has been deleted successfully.`,
                "Status": 200
            });
        }
        catch (err) {
            next(err);
        }
    }
    return next();
}));
