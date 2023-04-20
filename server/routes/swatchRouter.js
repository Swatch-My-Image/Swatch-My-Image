// const express = require('express');
import { swatchController } from '../controllers/swatchController.js';
import express from 'express';

export const swatchRouter = express.Router();

swatchRouter.get('/', swatchController.test, (req, res) => res.sendStatus(200));

swatchRouter.post('/getPalette', swatchController.getPalette, (_, res) =>
  res.status(200).json({ swatches: res.locals.swatches })
);
