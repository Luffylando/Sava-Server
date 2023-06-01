import express from 'express';
import { defaultRoute } from './defaultRoutes';
import { articleRoutes } from './articles';
import { categoriesRoutes } from './categories';
import { tagsRoutes } from './tags';

export const routes = express.Router();
routes.use(express.json());

routes.use(defaultRoute);
routes.use('/api/articles', articleRoutes);
routes.use('/api/categories', categoriesRoutes);
routes.use('/api/tags', tagsRoutes);
