import Vibrant from "node-vibrant";
import sharp from "sharp";
import fetch from "node-fetch";
import { db } from "../models/swatchModel.js";

// Just a simple cache for images that we already have seen before
const cache = {};

export const swatchController = {};

swatchController.test = (req, res, next) => {
  console.log("running swatchController.test");
  const queryStr = `SELECT * FROM users`;
  db.query(queryStr, (err, result) => {
    // error handler
    // if there's error, return next({error obj})
    if (err) {
      return next({
        log: "swatchController.test caught unknown error",
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
      message: { err: "An error occurred in `swatchController.getPalette`" },
    });
  }
};

swatchController.saveImage = async (req, res, next) => {
  try {
    console.log("running swatchController.saveImage");
    const url = req.body.url;
    console.log("url:", url);

    const queryForImage = `
    SELECT id
    FROM images
    WHERE url = '${url}'
    `;

    const queryToInsert = `
    INSERT INTO images (url)
    VALUES ('${url}')
    ON CONFLICT DO NOTHING
    RETURNING id
    `;

    // queryForImage
    let queryResult = await db.query(queryForImage);

    if (queryResult.rows.length === 0) {
      queryResult = await db.query(queryToInsert);
    }

    const imageID = queryResult.rows[0].id;
    console.log("imageID:", imageID);
    res.locals.imageID = imageID;
    return next();
  } catch (error) {
    return next({
      log: "swatchController.saveImage caught unknown error",
      status: 500,
      message: { error },
    });
  }
};

swatchController.savePalette = async (req, res, next) => {};
