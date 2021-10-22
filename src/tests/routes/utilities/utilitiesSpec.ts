import path from 'path';
import {
  imageResizer,
  paramValidator,
  isErrnoException,
} from '../../../routes/utilities/utilities';

describe('Tests utilities functions', () => {
  const filename = 'santamonica';
  const width = 600;
  const height = 400;
  const outputPath = path.resolve(`./src/assets/thumb/${filename}.jpg`);

  it('imageResizer must return the outputPath', async () => {
    expect(await imageResizer('santamonica', 600, 400)).toEqual(outputPath);
  });

  it('paramValidator must return a object with properties filename, width and height', () => {
    expect(paramValidator(filename, width, height)).toEqual({
      filename,
      width,
      height,
    });
  });

  const error: unknown = (): void => {
    throw Object.assign(new Error('Parameter is not a number!'), {
      code: 400,
    });
  };

  it('isErrnoException must return false', () => {
    expect(isErrnoException(error)).toBeFalse();
  });
});
