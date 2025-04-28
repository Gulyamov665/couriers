module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'], // Корень поиска
        alias: {
          '@store': './src/store',
          '@components': './src/components',
          '@screens': './src/screens',
          // добавляй свои алиасы
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
