// jest.config.js
module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
      "/^@\/(.*)$/": "C:\Users\Ricco Lim\Desktop\Orbital-memoryleak\src\$1"
  },
  "resolver": undefined,
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community)/)',
  ],
};
