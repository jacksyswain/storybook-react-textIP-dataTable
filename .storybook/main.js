module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react',
  typescript: { reactDocgen: 'react-docgen' },
};
