import { Flatpages } from './flatpages.po';

describe('workspace-project flatpages', () => {
    let page: Flatpages;

    beforeAll(() => {
        page = new Flatpages();
    });

    it('should success loaded from service', () => {
        page.navigateToPage('faq');
        page.waitForCss('section', 'faq page content here');
    });

    it('should view 404 page for failed loaded status', () => {
        page.navigateToPage('test123');
        page.waitForCss('section', '404 not found');
    });

    it('should view 404 page for empty pagename', () => {
        page.navigateToPage('');
        page.waitForCss('section', '404 not found');
    });
});
