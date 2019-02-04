import { Config } from '../src/Config';

test('should only be one instance of Config', () => {
    expect(Config.getInstance()).toEqual(Config.getInstance());
});

test('should load config from default.json', () => {
    expect(Config.getInstance().get('foo')).toBe('bar');
});

test('should load config from environment', () => {
    process.env.CONFIG_FILE = 'test.json';
    expect(Config.getInstance().get('foo')).toBe('baz');
});

test('should load config property from environment', () => {
    process.env.FOO_BAR = '1337';

    expect(Config.getInstance().get('foo-bar')).toBe(1337);

    process.env.FOO_BAR = 'a';

    expect(Config.getInstance().get('foo-bar')).toBe('a');
});

test('should load config property from environment rather then from config file', () => {
    process.env.CONFIG_FILE = 'test.json';
    process.env.FOO = 'foo';
    expect(Config.getInstance().get('foo')).toBe('foo');
});

test('should load default value if config property not set', () => {
    expect(Config.getInstance().get('1337', '42')).toBe('42');
});

test('should return undefined without default and if config property not set', () => {
    expect(Config.getInstance().get('1337')).toBe(undefined);

    process.env.CONFIG_FILE = 'test.json';
    expect(Config.getInstance().get('1337')).toBe(undefined);
});

test('should return number if property is number', () => {
    process.env.FOO = '1337';

    expect(Config.getInstance().get('foo')).toBe(1337);
});
