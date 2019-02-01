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

    expect(Config.getInstance().get('foo-bar')).toBe('1337');
});

test('should load config property from environment rather then from config file', () => {
    process.env.CONFIG_FILE = 'test.json';
    process.env.FOO = 'foo';
    expect(Config.getInstance().get('foo')).toBe('foo');
});
