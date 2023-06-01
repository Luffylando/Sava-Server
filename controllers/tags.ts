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

import { Router, Request, Response } from 'express';
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export const tagsRoutes = Router();
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
tagsRoutes.get('/', async (req: Request, res: Response, next) => {
  try {
    const tags = await prisma.tag.findMany()
    res.send(tags);
  } catch(err){
    next(err);
  }
});

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
tagsRoutes.get('/:id', async (req: Request, res: Response, next) => {
  const id = parseInt(req.params.id);
  try{
      const tag = await prisma.tag.findUnique({
        where: {
          TagID: id,
        },
      })
      return res.send({tag})
  } catch (err) {
    next(err)
  }
});

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
tagsRoutes.post('/', async (req: Request, res: Response, next) => {
  const { title } = req.body;
  try {
    const tag = await prisma.tag.create({
      data: {
        Title: title,
      }
    })
    return res.send({tag})
  } catch (err) {
    next(err);
  }
});

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
tagsRoutes.patch('/:id', async (req: Request, res: Response, next) => {
  const { title } = req.body;
  const id = parseInt(req.params.id);
  const isIdLegit = await prisma.tag.findUnique({where: { TagID: id}});

  if(isIdLegit){
    try {
      const tag = await prisma.tag.update({
        where: {
            TagID: id,
        },
        data: {
          Title: title,
        },
      })
      return res.send({tag})
    } catch (err) {
      next(err)
    }
  } 
  return next()
});

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
tagsRoutes.delete('/:id', async (req: Request, res: Response, next) => {
  const id = parseInt(req.params.id);
  const isIdLegit = await prisma.tag.findUnique({where: { TagID: id}});

  if(isIdLegit){
    try {
      await prisma.tag.delete({
        where: {
          TagID: id,
        }
      })
      return res.send({ 
        "Message": `Tag by ID: ${id} has been deleted successfully.`,
        "Status": 200
      })
    } catch (err) {
      next(err)
    }
  } 
  return next()
});