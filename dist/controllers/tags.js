"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         TagID:
 *           type: integer
 *           description: The auto-generated id of the tag
 *         Title:
 *           type: string
 *           description: The title of your Tag
 *       example:
 *         TagID: 1
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
exports.tagsRoutes = void 0;
const express_1 = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.tagsRoutes = (0, express_1.Router)();
/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Retrieve a list of tags.
 *     responses:
 *       200:
 *         description: A list of tags.
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
 *                       TagID:
 *                         type: integer
 *                         example: 1
 *                       Title:
 *                         type: string
 *                         description: The Tag title.
 *                         example: TAG 1
 */
exports.tagsRoutes.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield prisma.tag.findMany();
        res.send(tags);
    }
    catch (err) {
        next(err);
    }
}));
/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     summary: Retrieve a single tag.
 *     responses:
 *       200:
 *         description: A single tag.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     TagID:
 *                       type: integer
 *                       example: 1
 *                     Title:
 *                       type: string
 *                       description: The Tag title.
 *                       example: Tag 123
*/
exports.tagsRoutes.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const tag = yield prisma.tag.findUnique({
            where: {
                TagID: id,
            },
        });
        return res.send({ tag });
    }
    catch (err) {
        next(err);
    }
}));
/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Create a Tag.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The Tag Title.
 *                 example: Tag 1234
 *     responses:
 *       201:
 *         ...
*/
exports.tagsRoutes.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const tag = yield prisma.tag.create({
            data: {
                Title: title,
            }
        });
        return res.send({ tag });
    }
    catch (err) {
        next(err);
    }
}));
/**
 * @swagger
 * /api/tags/{id}:
 *   patch:
 *     summary: Update a Tag.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The Tag Title.
 *                 example: Tag 123456
 *     responses:
 *       201:
 *         ...
*/
exports.tagsRoutes.patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const id = parseInt(req.params.id);
    const isIdLegit = yield prisma.tag.findUnique({ where: { TagID: id } });
    if (isIdLegit) {
        try {
            const tag = yield prisma.tag.update({
                where: {
                    TagID: id,
                },
                data: {
                    Title: title,
                },
            });
            return res.send({ tag });
        }
        catch (err) {
            next(err);
        }
    }
    return next();
}));
/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     summary: Delete a Tag.
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
*/
exports.tagsRoutes.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const isIdLegit = yield prisma.tag.findUnique({ where: { TagID: id } });
    if (isIdLegit) {
        try {
            yield prisma.tag.delete({
                where: {
                    TagID: id,
                }
            });
            return res.send({
                "Message": `Tag by ID: ${id} has been deleted successfully.`,
                "Status": 200
            });
        }
        catch (err) {
            next(err);
        }
    }
    return next();
}));
