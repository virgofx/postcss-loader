import {
  compile,
  getCompiler,
  getErrors,
  getCodeFromBundle,
  getWarnings,
} from '../helpers/index';

describe('Options Stringifier', () => {
  it('should work Stringifier - {String}', async () => {
    const compiler = getCompiler('./css/index.js', {
      stringifier: 'sugarss',
    });
    const stats = await compile(compiler);

    const codeFromBundle = getCodeFromBundle('style.css', stats);

    expect(codeFromBundle.css).toMatchSnapshot('css');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
    expect(getErrors(stats)).toMatchSnapshot('errors');
  });

  it('should work Stringifier - {Object}', async () => {
    const compiler = getCompiler('./css/index.js', {
      // eslint-disable-next-line global-require
      stringifier: require('sugarss'),
    });
    const stats = await compile(compiler);

    const codeFromBundle = getCodeFromBundle('style.css', stats);

    expect(codeFromBundle.css).toMatchSnapshot('css');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
    expect(getErrors(stats)).toMatchSnapshot('errors');
  });

  it('should work Stringifier - {Function}', async () => {
    // eslint-disable-next-line global-require
    const Midas = require('midas');
    const midas = new Midas();

    const compiler = getCompiler('./css/index.js', {
      // eslint-disable-next-line global-require
      stringifier: midas.stringifier,
    });
    const stats = await compile(compiler);

    const codeFromBundle = getCodeFromBundle('style.css', stats);

    expect(codeFromBundle.css).toMatchSnapshot('css');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
    expect(getErrors(stats)).toMatchSnapshot('errors');
  });

  it('should emit error Stringifier', async () => {
    const compiler = getCompiler('./css/index.js', {
      // eslint-disable-next-line global-require
      stringifier: 'unresolved',
    });
    const stats = await compile(compiler);

    expect(getWarnings(stats)).toMatchSnapshot('warnings');
    expect(getErrors(stats, true)).toMatchSnapshot('errors');
  });
});
