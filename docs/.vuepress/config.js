const processEnv = process.env;
const envIsDev = processEnv.isDev;
const corePath = processEnv.corePath || 'core.docs.wavesplatform';
const envHost = processEnv.host || '127.0.0.1';
if(envIsDev) {
    const inspector = require('inspector');
    inspector.open(9229, '127.0.0.1');
}
const path = require('path');
const rootDir = process.cwd();
const coreDocsWavesplatform = require(corePath);
const getVuepressConfig = coreDocsWavesplatform.getVuepressConfig;

const enLocaleConfig = require('./locales/en');
const ruLocaleConfig = require('./locales/ru');
const colorationConfig = require('./colouration');

module.exports = (ctx) => {
    const vuepressComputedConfig = getVuepressConfig(ctx, {
        host: envHost,
        dest: path.join(rootDir, 'dist'),
        locales: {
            '/en/': {
                lang: 'en-US',
                title: 'Wavesplatform Docs',
                description: 'Waves documentation in English'
            },
            '/ru/': {
                lang: 'ru-RU',
                title: 'Wavesplatform Документация',
                description: 'Документация Waves на русском',
            }
        },
        themeConfig: {
            // activeColouration: 'default',
            colouration: colorationConfig,
            locales: {
                '/en/': enLocaleConfig,
                '/ru/': ruLocaleConfig,
            },
        },
    });
    const configureWebpackOriginal = vuepressComputedConfig.configureWebpack;
    vuepressComputedConfig.configureWebpack = (webpackConfig, isServer) => {
        webpackConfig.resolve.alias['@themeExtend'] = __dirname;
        configureWebpackOriginal(webpackConfig, isServer);
    };
    return vuepressComputedConfig;
};