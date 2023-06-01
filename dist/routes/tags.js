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
exports.tagsRoutes = void 0;
const express_1 = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.tagsRoutes = (0, express_1.Router)();
/**
 * returns tags
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
 * returns single tag by id
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
 * creates new tag
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
 * edits already existing tag
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
 * hard deletes tag resource
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
