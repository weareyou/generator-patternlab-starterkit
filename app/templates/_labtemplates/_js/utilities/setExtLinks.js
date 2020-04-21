/**
 * Handles external links based on target="_blank"
 *
 * Adds rel="noopener" to the external links as per:
 * https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/
 */

const setExtLinks = {
  init: (context = document) => {
    const links = context.querySelectorAll('a[target="_blank"]');
    setExtLinks.initAll(links);
  },

  initAll: (links) => {
    if (links) {
      [...links].forEach((link) => {
        link.setAttribute('rel', 'noopener');
      });
    }
  },
};

setExtLinks.init();

export default setExtLinks;
