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

import { Router, Request, Response } from 'express';
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export const categoriesRoutes = Router();

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
categoriesRoutes.get('/', async (req: Request, res: Response, next) => {
  try {
    const categories = await prisma.category.findMany()
    res.send(categories);
  } catch(err){
    next(err);
  }
});


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
categoriesRoutes.get('/:id', async (req: Request, res: Response, next) => {
  const id = parseInt(req.params.id);
  try{
      const category = await prisma.category.findUnique({
        where: {
          CategoryID: id,
        },
      })
      return res.send({category})
  } catch (err) {
    next(err)
  }
});

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
categoriesRoutes.post('/', async (req: Request, res: Response, next) => {
  const { title } = req.body;
  try {
    const category = await prisma.category.create({
      data: {
        Title: title,
      }
    })
    return res.send({category})
  } catch (err) {
    next(err);
  }
});

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
categoriesRoutes.patch('/:id', async (req: Request, res: Response, next) => {
  const { title } = req.body;
  const id = parseInt(req.params.id);
  const isIdLegit = await prisma.category.findUnique({where: { CategoryID: id}});

  if(isIdLegit){
    try {
      const category = await prisma.category.update({
        where: {
            CategoryID: id,
        },
        data: {
          Title: title,
        },
      })
      return res.send({category})
    } catch (err) {
      next(err)
    }
  } 
  return next()
});

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
categoriesRoutes.delete('/:id', async (req: Request, res: Response, next) => {
  const id = parseInt(req.params.id);
  const isIdLegit = await prisma.category.findUnique({where: { CategoryID: id}});

  if(isIdLegit){
    try {
      await prisma.category.delete({
        where: {
          CategoryID: id,
        }
      })
      return res.send({ 
        "Message": `Category by ID: ${id} has been deleted successfully.`,
        "Status": 200
      })
    } catch (err) {
      next(err)
    }
  } 
  return next()
});