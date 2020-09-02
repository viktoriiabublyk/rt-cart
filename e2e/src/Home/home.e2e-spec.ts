import { HomePage } from './home.po';
import { element, by, browser } from 'protractor';

describe('workspace-project App', () => {
  let page: HomePage;

  beforeAll(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('should display list products', () => {
    page.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod')).isPresent()).toBeTruthy();
    expect(element(by.css('app-star-rating')).isPresent()).toBeTruthy();

  });

  it('should click to product name ', () => {
    page.showBreadCurrentProd();
  });
  it('should click to "show more" ', () => {
    page.showMore();
  });

  it('should click to category ', () => {
    page.chooseCat();
  });

  it('should display breadcrumbs', () => {
    page.showBread();
   });


});
