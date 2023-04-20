import Vibrant from 'node-vibrant';
import sharp from 'sharp';
import fetch from 'node-fetch';
import { db } from '../models/swatchModel.js';
import kvjs from '@heyputer/kv.js';

const cache = new kvjs();
const ONE_HOUR_IN_SECONDS = 3600;

export const swatchController = {};

swatchController.test = (req, res, next) => {
  console.log('running swatchController.testNow!');
  const queryStr = `SELECT * FROM users`;
  db.query(queryStr, (err, result) => {
    // error handler
    // if there's error, return next({error obj})
    if (err) {
      return next({
        log: 'swatchController.test caught unknown error',
        status: 500,
        message: { err },
      });
    }
    console.log(result.rows);
    return next();
  });
};

swatchController.getPalette = async (req, res, next) => {
  try {
    const url = req.body.url;
    const cacheValue = cache.get(url);
    if (cacheValue === null) {
      // Some online URL are webp, and `node-vibrant` does not support webp
      // So we need to download and convert the image to JPEG before
      // abstracting the color palette
      const image = await fetch(req.body.url);
      const imageBuffer = await image.arrayBuffer();
      const jpeg = await sharp(imageBuffer).jpeg().toBuffer();
      const palettes = await Vibrant.from(jpeg).getPalette();
      const swatches = Object.values(palettes).map((swatch) => swatch.getHex());
      res.locals.swatches = swatches;
      cache.set(url, swatches);
      cache.expire(url, ONE_HOUR_IN_SECONDS);
    } else {
      res.locals.swatches = cacheValue;
    }
    return next();
  } catch (error) {
    return next({
      log: error,
      status: 400,
      message: { err: 'An error occurred in `swatchController.getPalette`' },
    });
  }
};
