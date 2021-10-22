import { promises as fsPromises } from 'fs';
import path from 'path';
import sharp from 'sharp';

const imageResizer = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const inputImage = path.resolve(`./src/assets/full/${filename}.jpg`);
  const outputPath = path.resolve(`./src/assets/thumb/${filename}.jpg`);
  const image = await fsPromises.readFile(inputImage);

  await sharp(image).resize(width, height).toFile(outputPath);

  return outputPath;
};

const paramValidator = (
  paramFilename: unknown,
  paramWidth: unknown,
  paramHeight: unknown
): { filename: string; width: number; height: number } => {
  const filename: string = paramFilename as string;
  const width: number = parseInt(paramWidth as unknown as string, 10);
  const height: number = parseInt(paramHeight as unknown as string, 10);

  if (!filename) {
    throw Object.assign(new Error('Parameter filename invalid!'), {
      code: 400,
    });
  }

  if (Number.isNaN(width) || Number.isNaN(height)) {
    throw Object.assign(new Error('Parameter is not a number!'), {
      code: 400,
    });
  }

  return { filename, width, height };
};

const isErrnoException = (error: unknown): error is NodeJS.ErrnoException => {
  if ('code' in (error as object)) {
    return true;
  }
  return false;
};

export { imageResizer, paramValidator, isErrnoException };
