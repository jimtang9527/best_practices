module.exports = {
    roots: [
        "<rootDir>/src/MultiCheck"
    ],
    testRegex: '(.+)\\.test\\.(jsx?|tsx?)$',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleNameMapper: {
        "\\.(css|sass)$": "identity-obj-proxy",
    },
};