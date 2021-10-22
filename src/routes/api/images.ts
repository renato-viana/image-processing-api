import express from 'express';
import {
  imageResizer,
  paramValidator,
  isErrnoException,
} from '../utilities/utilities';

const images = express.Router();

images.post('/images', async (req, res): Promise<void> => {
  try {
    const paramFilename: unknown = req.query.filename;
    const paramWidth: unknown = req.query.width;
    const paramHeight: unknown = req.query.height;

    const { filename, width, height } = paramValidator(
      paramFilename,
      paramWidth,
      paramHeight
    );

    await imageResizer(filename, width, height);

    res.set('Content-Type', 'image/jpg');
    res.statusMessage = 'Created - The image was converted!';
    res.status(201).end();
  } catch (error) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      res.status(404).send("The image doesn't exist!");
    } else if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

images.get('/images', async (req, res): Promise<void> => {
  try {
    const paramFilename: unknown = req.query.filename;
    const paramWidth: unknown = req.query.width;
    const paramHeight: unknown = req.query.height;

    const { filename, width, height } = paramValidator(
      paramFilename,
      paramWidth,
      paramHeight
    );

    const imageResized = await imageResizer(filename, width, height);

    res.statusMessage = `Ok - Image ${filename}`;
    res.status(200).sendFile(imageResized);
  } catch (error) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      res.status(404).send("The image doesn't exist!");
    } else if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default images;
