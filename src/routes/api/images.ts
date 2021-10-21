import express from 'express';
import { promises as fsPromises } from 'fs';
import sharp from 'sharp';
import path from 'path';

const images = express.Router();

images.post('/images', async (req, res) => {
  try {
    const { filename } = req.query;
    const width = parseInt(req.query.width as unknown as string, 10);
    const height = parseInt(req.query.height as unknown as string, 10);

    const inputImage = `./src/assets/full/${filename}.jpg`;
    const outputPath = `./src/assets/thumb/${filename}.jpg`;
    const image = await fsPromises.readFile(inputImage);

    const imageResized = await sharp(image)
      .resize(width, height)
      .toFile(outputPath);

    console.log(imageResized);

    res.set('Content-Type', 'image/jpg');
    res.statusMessage = 'Created - The image was converted!';
    res.status(201).end();
  } catch (error) {
    res.status(400).send("The image doesn't exist!");
  }
});

images.get('/images', async (req, res) => {
  try {
    const { filename } = req.query;
    const outputPath = `./src/assets/thumb/${filename}.jpg`;

    await fsPromises.stat(outputPath);

    res.statusMessage = `Ok - Image ${filename}`;
    res.status(200).sendFile(path.resolve(outputPath));
  } catch (error) {
    res.status(400).send("The image doesn't exist!");
  }
});

export = images;
