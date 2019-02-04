export class Config {

    private static instance: Config;

    private static configFile: string;

    private readonly properties: { [x: string]: any; };

    private constructor() {
        Config.configFile = 'default.json';
        if (process.env.CONFIG_FILE !== undefined) {
            Config.configFile = process.env.CONFIG_FILE;
        }

        this.properties = require(`../config/${Config.configFile}`);
    }

    private static configFileHasChanged(): boolean {
        return process.env.CONFIG_FILE !== undefined && process.env.CONFIG_FILE !== Config.configFile;
    }

    static getInstance() {
        if (!Config.instance || Config.configFileHasChanged()) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    private static toEnvironmentPropertyName(propertyName: string): string {
        return propertyName.toUpperCase().replace('-', '_');
    }

    private static toNumber(value: string | undefined) {
        const convertedNumber = Number(value);
        if (isNaN(convertedNumber)) {
            return value;
        } else {
            return convertedNumber;
        }
    }

    get(propertyName: string, defaultValue?: string | number): string | number | undefined {
        const envPropertyName = Config.toEnvironmentPropertyName(propertyName);

        if (process.env[envPropertyName] !== undefined) {
            return Config.toNumber(process.env[envPropertyName]);
        }

        if (this.properties[propertyName] !== undefined) {
            return Config.toNumber(this.properties[propertyName]);
        }

        return defaultValue;
    }
}
