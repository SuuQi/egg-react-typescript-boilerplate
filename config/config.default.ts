import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    config.keys = appInfo.name + '_1537442153535_79088';

    config.static = {
        prefix: '/public/',
        dir: path.join(appInfo.baseDir, 'client/public')
    };

    config.view = {
        root: path.join(appInfo.baseDir, 'dist/client'),
        mapping: {
            '.ejs': 'ejs'
        }
    }

    config.ejs = {
        delimiter: '$'
    };

    config.logger = {
        
    };

    config.middleware = [];

    return config;
};
