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
exports.articleRoutes = void 0;
const express_1 = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.articleRoutes = (0, express_1.Router)();
/**
 * returns many articles
 */
exports.articleRoutes.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = prisma.category.findUnique({ where: { CategoryID: Number(req.query.category) } }) && Number(req.query.category);
    const tagId = prisma.tag.findUnique({ where: { TagID: Number(req.query.tag) } }) && Number(req.query.tag);
    let articles;
    try {
        if (categoryId) {
            articles = yield prisma.article.findMany({
                where: {
                    CategoryID: Number(categoryId),
                }
            });
        }
        else if (tagId) {
            articles = yield prisma.article.findMany({
                include: {
                    Tags: {
                        where: {
                            TagID: tagId,
                        },
                    }
                }
            });
        }
        else {
            articles = yield prisma.article.findMany({
                include: {
                    Category: true,
                    Tags: true
                }
            });
        }
        res.send(articles);
    }
    catch (err) {
        next(err);
    }
}));
/**
 * returns single article by id
 */
exports.articleRoutes.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const article = yield prisma.article.findUnique({
            where: {
                ArticleID: id,
            },
            include: {
                Category: true,
                Tags: true
            }
        });
        return res.send({ article });
    }
    catch (err) {
        next(err);
    }
}));
/**
 * creates new article resourse
 */
exports.articleRoutes.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, reporter, body, categoryId, tags } = req.body;
    let parsedTags = tags.map((tag) => {
        return {
            TagID: tag
        };
    });
    try {
        const article = yield prisma.article.create({
            data: {
                Title: title,
                Reporter: reporter,
                Body: body,
                Category: {
                    connect: {
                        CategoryID: categoryId ? categoryId : [],
                    }
                },
                Tags: {
                    connect: parsedTags.length ? parsedTags : []
                },
            },
            include: {
                Category: true,
                Tags: true
            }
        });
        return res.send({ article });
    }
    catch (err) {
        next(err);
    }
}));
/**
 * edits already existing article resource
 */
exports.articleRoutes.patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, reporter, body, categoryId, tags } = req.body;
  
    const id = parseInt(req.params.id);
    const isIdLegit = yield prisma.article.findUnique({ where: { ArticleID: id }, include: { Tags: true } });
    const old = isIdLegit.Tags.map((tag) => {
        return {
            TagID: tag.TagID
        };
    });
    let parsedTags = tags.map((tag) => {
        return {
            TagID: tag
        };
    });
    console.log('par', parsedTags);
    if (isIdLegit) {
        try {
            const article = yield prisma.article.update({
                where: {
                    ArticleID: id,
                },
                data: {
                    Title: title,
                    Reporter: reporter,
                    Body: body,
                    Category: {
                        connect: {
                            CategoryID: categoryId ? categoryId : [],
                        }
                    },
                    Tags: {
                        disconnect: old.length ? old : [],
                        connect: parsedTags.length ? parsedTags : []
                        // connect: parsedTags.length ? parsedTags : []
                    },
                },
                include: {
                    Category: true,
                    Tags: true
                }
            });
            return res.send({ article });
        }
        catch (err) {
            next(err);
        }
    }
    return next();
}));
/**
 * hard deletes article resource
 */
exports.articleRoutes.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const isIdLegit = yield prisma.article.findUnique({ where: { ArticleID: id } });
    if (isIdLegit) {
        try {
            yield prisma.article.delete({
                where: {
                    ArticleID: id,
                }
            });
            return res.send({
                "Message": `Article by ID: ${id} has been deleted.`,
                "Status": 200
            });
        }
        catch (err) {
            next(err);
        }
    }
    return next();
}));
