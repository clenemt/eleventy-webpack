module.exports = (config) => {
  // Needed to prevent eleventy from ignoring changes to `webpack.njk`
  // since it is in our `.gitignore`
  config.setUseGitIgnore(false);

  return {
    dir: { input: 'src', output: 'dist' },
    htmlTemplateEngine: 'njk'
  };
};
