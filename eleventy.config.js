import { EleventyRenderPlugin } from '@11ty/eleventy';
export default function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addFilter('moduleData', module => ({ ...module.data, content: module.templateContent }));
  eleventyConfig.addPassthroughCopy('assets/*.{css,webp,png,ico}');
  eleventyConfig.ignores.add('assets/originals/**');
  eleventyConfig.ignores.add('docs/**');
  eleventyConfig.ignores.add('README.md');
  eleventyConfig.ignores.add('**/AGENTS.md');
  eleventyConfig.addCollection('introModules', api => api.getFilteredByTag('introModule').sort((a,b) => a.data.order-b.data.order));
  eleventyConfig.addCollection('aboutModules', api => api.getFilteredByTag('aboutModule').sort((a,b) => a.data.order-b.data.order));
  eleventyConfig.addCollection('pressReleases', api => api.getFilteredByTag('pressRelease').sort((a,b) => b.data.releaseDate.localeCompare(a.data.releaseDate)));
  eleventyConfig.addFilter('money', value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value));
  return { dir: { input: '.', output: 'dist', includes: 'templates', data: '_data' }, templateFormats: ['html','njk','md'], htmlTemplateEngine:'njk', markdownTemplateEngine:'njk' };
}
