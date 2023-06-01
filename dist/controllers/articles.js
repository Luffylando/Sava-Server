"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         ArticleID:
 *           type: integer
 *           description: The auto-generated id of the article
 *         Title:
 *           type: string
 *           description: The title of your Article
 *         Reporter:
 *           type: string
 *           description: The Article Reporter
 *         Category:
 *           type: object
 *           description: The Article Category
 *         Tags:
 *           type: array
 *           description: The Article Tags
 *         PublishDate:
 *           type: string
 *           format: date
 *           description: The date article was added
 *       example:
 *         ArticleID: 1
 *         Title: Article Title Test
 *         Reporter: Luffylando
 *         Category: {"CategoryID": 1, "Title": "cat title"}
 *         Tags: [{"TagID": 1, "Title": "tag title 123"},{"TagID": 4, "Title": "Tag title"}]
 *         PublishDate: 2020-03-10T04:05:06.157Z
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
exports.articleRoutes = void 0;
const express_1 = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.articleRoutes = (0, express_1.Router)();
/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Retrieve a list of Articles.
 *     responses:
 *       200:
 *         description: A list of articles.
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
 *                       ArticleID:
 *                         type: integer
 *                         example: 1
 *                       Title:
 *                         type: string
 *                         description: The Article title.
 *                         example: Article 123
 *                       Reporter:
 *                         type: string
 *                         description: The Article Reporter.
 *                         example: John Doe
 *                       Body:
 *                         type: string
 *                         description: The Article Body.
 *                         example: Article 123 Body
 *                       Category:
 *                         type: object
 *                         description: The Article Category.
 *                         example:  { "CategoryID": 16,"Title": "cat2"}
 *                       Tags:
 *                         type: array
 *                         description: The Article Tags.
 *                         example: [
 *                          {"TagID": 29,"Title": "tag1"},
 *                          {"TagID": 3,"Title": "tag1"}]
 */
/**
 * @swagger
 * /api/articles?tag={tagId}:
 *   get:
 *     summary: Retrieve a list of Articles by tag id.
 *     responses:
 *       200:
 *         description: A list of articles by Tag id.
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
 *                       ArticleID:
 *                         type: integer
 *                         example: 1
 *                       Title:
 *                         type: string
 *                         description: The Article title.
 *                         example: Article 123
 *                       Reporter:
 *                         type: string
 *                         description: The Article Reporter.
 *                         example: John Doe
 *                       Body:
 *                         type: string
 *                         description: The Article Body.
 *                         example: Article 123 Body
 *                       Category:
 *                         type: object
 *                         description: The Article Category.
 *                         example:  { "CategoryID": 16,"Title": "cat2"}
 *                       Tags:
 *                         type: array
 *                         description: The Article Tags.
 *                         example: [
 *                          {"TagID": 29,"Title": "tag1"},
 *                          {"TagID": 3,"Title": "tag1"}]
 */
/**
 * @swagger
 * /api/articles?category={categoryId}:
 *   get:
 *     summary: Retrieve a list of Articles by category id.
 *     responses:
 *       200:
 *         description: A list of articles by category id.
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
 *                       ArticleID:
 *                         type: integer
 *                         example: 1
 *                       Title:
 *                         type: string
 *                         description: The Article title.
 *                         example: Article 123
 *                       Reporter:
 *                         type: string
 *                         description: The Article Reporter.
 *                         example: John Doe
 *                       Body:
 *                         type: string
 *                         description: The Article Body.
 *                         example: Article 123 Body
 *                       Category:
 *                         type: object
 *                         description: The Article Category.
 *                         example:  { "CategoryID": 16,"Title": "cat2"}
 *                       Tags:
 *                         type: array
 *                         description: The Article Tags.
 *                         example: [
 *                          {"TagID": 29,"Title": "tag1"},
 *                          {"TagID": 3,"Title": "tag1"}]
 */
exports.articleRoutes.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = prisma.category.findUnique({ where: { CategoryID: Number(req.query.category) } }) && Number(req.query.category);
    const tagId = prisma.tag.findUnique({ where: { TagID: Number(req.query.tag) } }) && Number(req.query.tag);
    let articles;
    try {
        if (categoryId) {
            articles = yield prisma.article.findMany({
                include: {
                    Category: true,
                    Tags: true
                },
                where: {
                    CategoryID: Number(categoryId),
                }
            });
        }
        else if (tagId) {
            articles = yield prisma.article.findMany({
                include: {
                    Category: true,
                    Tags: true
                },
                where: {
                    Tags: {
                        every: {
                            TagID: {
                                in: [tagId]
                            }
                        }
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
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Retrieve a single Article.
 *     responses:
 *       200:
 *         description: A single article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     ArticleID:
 *                       type: integer
 *                       example: 1
 *                     Title:
 *                       type: string
 *                       description: The Article title.
 *                       example: Article 123
 *                     Reporter:
 *                         type: string
 *                         description: The Article Reporter.
 *                         example: John Doe
 *                     Body:
 *                         type: string
 *                         description: The Article Body.
 *                         example: Article 123 Body
 *                     Category:
 *                         type: object
 *                         description: The Article Category.
 *                         example:  { "CategoryID": 16,"Title": "cat2"}
 *                     Tags:
 *                         type: array
 *                         description: The Article Tags.
 *                         example: [
 *                          {"TagID": 29,"Title": "tag1"},
 *                          {"TagID": 3,"Title": "tag1"}]
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
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Create an Article.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The Article Title.
 *                 example: Article 123
 *               reporter:
 *                 type: string
 *                 description: The Article Reporter.
 *                 example: John Doe
 *               publishDate:
 *                 type: string
 *                 description: The Article Reporter.
 *                 example: 2023-06-01 13:27:44.349
 *               body:
 *                 type: string
 *                 description: The Article Body.
 *                 example: Article 123 Body
 *               categoryId:
 *                 type: integer
 *                 description: The Article Category.
 *                 example:  1
 *               tags:
 *                 type: array
 *                 description: The Article Tags.
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         ...
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
                CategoryID: categoryId ? categoryId : undefined,
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
 * @swagger
 * /api/articles/{id}:
 *   patch:
 *     summary: Update an Article.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The Article Title.
 *                 example: Article 123
 *               reporter:
 *                 type: string
 *                 description: The Article Reporter.
 *                 example: John Doe
 *               publishDate:
 *                 type: string
 *                 description: The Article Reporter.
 *                 example: 2023-06-01 13:27:44.349
 *               body:
 *                 type: string
 *                 description: The Article Body.
 *                 example: Article 123 Body
 *               categoryId:
 *                 type: integer
 *                 description: The Article Category.
 *                 example:  1
 *               tags:
 *                 type: array
 *                 description: The Article Tags.
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         ...
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
                            CategoryID: categoryId ? categoryId : undefined
                        }
                    },
                    Tags: {
                        disconnect: old.length ? old : [],
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
    }
    return next();
}));
/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Delete an Article.
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
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
