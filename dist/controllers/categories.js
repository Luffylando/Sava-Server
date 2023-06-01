"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         CategoryID:
 *           type: integer
 *           description: The auto-generated id of the category
 *         Title:
 *           type: string
 *           description: The title of your Category
 *       example:
 *         CategoryID: 1
 *         Title: Sport
 */
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
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve a list of Categories.
 *     responses:
 *       200:
 *         description: A list of Categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       CategoryID:
 *                         type: integer
 *                         example: 1
 *                       Title:
 *                         type: string
 *                         description: The Category title.
 *                         example: Category 1
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
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retrieve a single Category.
 *     responses:
 *       200:
 *         description: A single category.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     CategoryID:
 *                       type: integer
 *                       example: 1
 *                     Title:
 *                       type: string
 *                       description: The Category title.
 *                       example: Cat 123
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
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a Category.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The Category Title.
 *                 example: Category 123
 *     responses:
 *       201:
 *         ...
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
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     summary: Update a Category.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The Category Title.
 *                 example: Category 1234
 *     responses:
 *       201:
 *         ...
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
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a Category.
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
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
