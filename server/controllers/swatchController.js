// import db from "../models/swatchModel";
import Vibrant from 'node-vibrant';
import sharp from 'sharp';
import fetch from 'node-fetch';

// Just a simple cache for images that we already have seen before
const cache = {};

export const swatchController = {};

swatchController.test = (req, res, next) => {
  console.log('running swatchController.testNow!');
  return next();
};

swatchController.getPalette = async (req, res, next) => {
  try {
    const url = req.body.url;
    if (cache.hasOwnProperty(url)) {
      res.locals.swatches = cache[url];
    } else {
      // Some online URL are webp, and `node-vibrant` does not support webp
      // So we need to download and convert the image to JPEG before
      // abstracting the color palette
      const image = await fetch(req.body.url);
      const imageBuffer = await image.arrayBuffer();
      const jpeg = await sharp(imageBuffer).jpeg().toBuffer();
      const palettes = await Vibrant.from(jpeg).getPalette();
      const swatches = Object.values(palettes).map((swatch) => swatch.getHex());
      cache[url] = res.locals.swatches = swatches;
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
