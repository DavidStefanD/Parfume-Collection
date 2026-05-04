'use strict';



import logger from "./utils/logger.js";
import express from 'express';

const router = express.Router();

import parfumelist from './controllers/parfume.js';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import stats from './controllers/stats.js';
import accounts from './controllers/accounts.js';

router.get('/start', start.createView);

router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/parfume-collection/:id', parfumelist.createView);
router.get('/parfume-collection/:id/deleteparfume/:parfumeid', parfumelist.deleteParfume);
router.get('/dashboard/deletecollection/:id', dashboard.deleteCollection);
router.get('/stats', stats.createView);

router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/searchCategory', dashboard.createView);

router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.post('/parfume-collection/:id/addparfume', parfumelist.addParfume);
router.post('/dashboard/addcollection', dashboard.addcollection);
router.post('/parfume-collection/:id/updateparfume/:parfumeid', parfumelist.updateParfume);

export default router;

