import { CataloguePage } from './catalogue.po';
import { element, by, browser } from 'protractor';

describe('Catalogue', () => {
  let page: CataloguePage;

  beforeEach(() => {
    page = new CataloguePage();
    page.navigateTo();
  });

  it('should display catalogue', () => {
    expect<any>(page.getParagraphText()).toEqual('All products');
  });
  it('should display categories', () => {
    expect<any>(page.getParagraphTextForCategory()).toEqual('Categories');
  });
  it('should display list products', () => {
    page.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod')).isPresent()).toBeTruthy();
  });

  it('should click to "show more" for products by category ', () => {
    page.showMoreByCategory('Essential programming');
    page.backHome();

  });
  it('should display list of categories', () => {
    page.waitFor(element(by.css('li.col-xs-6 app-category')));
    expect(element(by.css('li.col-xs-6 app-category')).isPresent()).toBeTruthy();
  });

  it('should display product', () => {
    page.selectProduct('STL tutorial and reference guide');
    page.backHome();
  });
  it('should display product', () => {
    page.selectProduct('Bridging the Communication Gap');
    page.backHome();
  });

  it('should display category 1', () => {
    page.selectCategory('Clothing');
    page.backHome();
  });

  it('should display category 2', () => {
    page.selectCategory('Books');
    page.backHome();
  });

  it('should display category 7', () => {
    page.selectCategory('Hacking');
    page.backHome();
  });

  it('should click to "show more" ', () => {
    page.showMore();
  });

  it('should select product through click to image', () => {
    page.selectProductThroughImage();
  });

  it('should select category through click to bredcrumb "Books" ', () => {
    page.selectCategoryViaBread('Computers in Literature', 'Books');
  });

  it('should select category through click to bredcrumb "Fiction" ', () => {
    page.selectCategoryViaBread('Computers in Literature', 'Fiction');
  });

  it('should select category through click to bredcrumb "Non-Fiction" ', () => {
    page.selectCategoryViaBread('Essential programming', 'Non-Fiction');
  });

  it('should show All Products after choose category "Computers in Literature" ', () => {
    page.afterSelectCategory('Computers in Literature', 'Catalogue');
    page.backHome();
  });

  it('should click to "show more" and check page info ', () => {
    page.checkPageAfterShowMore();
    page.backHome();

  });

  it('should set searchParam', () => {
    page.setSearchParam('amazing');
    page.backHome();
    page.setSearchParam('book');
    page.backHome();
  });

  it('should set searchParam and back home and set param again', () => {
    page.setSearchParam('document');
    page.setSearchParam('hacking exposed');
    page.backHome();
    page.setSearchParam('book');
  });

  it('should click to "show more" after choose category ', () => {
    page.checkPageAfterShowMoreCategory();
    page.backHome();
  });

});
