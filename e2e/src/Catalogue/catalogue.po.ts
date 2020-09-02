import { browser, by, element, protractor } from 'protractor';

export class CataloguePage {
  navigateTo() {
    return browser.get('/catalogue');
  }

  getParagraphText() {
    return element(by.css('.page-header.action.sm h1')).getText();
  }
  getParagraphTextForCategory() {
    return element(by.css('.page-header.action.small h1')).getText();
  }
  enterInputValue(_CLASS: string, _NAME: string) {
    const rtControl = element(by.css(`rt-input-block.${_CLASS}`));
    rtControl.click();
    const inputRtEmail = rtControl.element(by.css('input'));
    inputRtEmail.sendKeys(_NAME);
  }
  selectProduct(name) {
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('ol.row ul li article.product_pod')).isPresent()).toBeTruthy();
    expect(element(by.linkText(name)).isPresent()).toBeTruthy();
    element(by.cssContainingText('a', name)).click();
    expect(element(by.css('div.content')).isPresent()).toBeTruthy();
  }
  clearingInput(_CLASS: string) {
    const rtControl = element(by.css(`rt-input-block.${_CLASS}`));
    const inputRtInput = rtControl.element(by.css('input'));
    inputRtInput.clear();
  }
  setSearchParam(searchParam: string) {
    this.waitFor(element(by.css('article.product_pod')));
    element(by.css('form.search_form')).isPresent().then((result) => {
      if (result) {
        this.enterInputValue('search', searchParam);
        element(by.css('form.search_form button[type=submit]')).click();
      }
    });
    this.waitFor(element(by.css('article.product_pod')));
    this.waitForCss('h1.title', `Results of searching "${searchParam}"`);
    // browser.sleep(2000);
    this.checkPageAfterSeaching(searchParam);
  }
  checkPageAfterSeaching(searchParam: string) {
    expect<any>(element(by.cssContainingText('h1', `Results of searching "${searchParam}"`)).isPresent()).toBeTruthy();
    expect<any>(element(by.cssContainingText('li', 'Results of searching')).isPresent()).toBeTruthy();
    expect<any>(element(by.cssContainingText('li.active', `${searchParam}`)).isPresent()).toBeTruthy();
    expect<any>(element(by.css('li.active')).getText()).toEqual(searchParam);
    this.clearingInput('search');
    expect<any>(element(by.cssContainingText('form', 'results of searching - showing')).isPresent()).toBeTruthy();

  }
  selectCategory(name) {
    this.waitFor(element(by.css('li.col-xs-6')));
    expect(element(by.css('li.col-xs-6 app-category')).isPresent()).toBeTruthy();
    expect(element(by.linkText(name)).isPresent()).toBeTruthy();
    element(by.cssContainingText('a', name)).click();
    browser.sleep(4000);
    expect(element(by.css('h1.title')).isPresent()).toBeTruthy();
    expect(element(by.css('h1.title')).getText()).toEqual(name);
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod app-star-rating')).isPresent()).toBeTruthy();
  }
  afterSelectCategory(name, buttonName) {
    this.waitFor(element(by.css('li.col-xs-6')));
    expect(element(by.css('li.col-xs-6 app-category')).isPresent()).toBeTruthy();
    expect(element(by.linkText(name)).isPresent()).toBeTruthy();
    element(by.cssContainingText('a', name)).click();
    browser.sleep(4000);
    expect(element(by.css('h1.title')).isPresent()).toBeTruthy();
    expect(element(by.css('h1.title')).getText()).toEqual(name);
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod app-star-rating')).isPresent()).toBeTruthy();
    element(by.cssContainingText('a', buttonName)).click();
    browser.sleep(4000);
    expect(element(by.css('h1.title')).isPresent()).toBeTruthy();
    expect<any>(element(by.css('h1.title')).getText()).toEqual('All products');
    expect<any>(element(by.css('strong.page')).getText()).toEqual('1');
    expect<any>(element(by.css('strong.count')).getText()).toEqual('209');
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod app-star-rating')).isPresent()).toBeTruthy();
  }

  selectProductThroughImage() {
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod')).isPresent()).toBeTruthy();
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod app-star-rating')).isPresent()).toBeTruthy();
    element.all(by.css('.product_pod img')).first().click();
    expect(element(by.css('div.content')).isPresent()).toBeTruthy();
  }

  selectCategoryViaBread(name, breadcrumb) {
    this.waitFor(element(by.css('li.col-xs-6')));
    expect(element(by.css('li.col-xs-6 app-category')).isPresent()).toBeTruthy();
    expect(element(by.linkText(name)).isPresent()).toBeTruthy();
    element(by.cssContainingText('a', name)).click();
    browser.sleep(2000);
    element(by.cssContainingText('a', breadcrumb)).click();
    browser.sleep(2000);
    expect(element(by.css('h1.title')).getText()).toEqual(breadcrumb);
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod app-star-rating')).isPresent()).toBeTruthy();

  }

  backHome() {
    element(by.cssContainingText('a', 'Home')).click();
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod')).isPresent()).toBeTruthy();
    expect(element(by.css('article.product_pod app-star-rating')).isPresent()).toBeTruthy();
  }

  checkPageAfterShowMore() {
    this.waitFor(element(by.css('article.product_pod')));
    this.waitForCss('a', 'C');
    element(by.css('li.next button')).click();

    this.waitForCss('a', 'Little LISPer');
    expect(element(by.cssContainingText('.page', '2')).isDisplayed()).toBeTruthy();
    expect(element(by.css('h1.title')).isPresent()).toBeTruthy();
    expect<any>(element(by.css('h1.title')).getText()).toEqual('All products');
    expect(element(by.css('article.product_pod app-star-rating')).isPresent()).toBeTruthy();

    this.waitForCss('.page', '2');
    expect(element(by.cssContainingText('.page', '2')).isDisplayed()).toBeTruthy();
    expect<any>(element(by.css('strong.page')).getText()).toEqual('2');
    expect<any>(element(by.css('strong.count')).getText()).toEqual('209');
    expect<any>(element(by.css('strong.length')).getText()).toEqual('100');
  }
  checkPageAfterShowMoreCategory() {
    this.backHome();
    element(by.cssContainingText('a', 'Hacking')).click();
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('h1.title')).isPresent()).toBeTruthy();
    expect<any>(element(by.css('h1.title')).getText()).toEqual('Hacking');
    expect(element(by.css('article.product_pod app-star-rating')).isPresent()).toBeTruthy();

    this.waitForCss('.page', '1');
    expect(element(by.cssContainingText('.page', '1')).isDisplayed()).toBeTruthy();

    expect<any>(element(by.css('strong.page')).getText()).toEqual('1');
    expect<any>(element(by.css('strong.count')).getText()).toEqual('33');
    expect<any>(element(by.css('strong.length')).getText()).toEqual('33');

    expect(element(by.css('li.next button')).isPresent()).toBeFalsy();
  }
  showMore() {
    this.waitFor(element(by.css('article.product_pod')));

    element(by.css('li.next button')).click();
    expect(element(by.cssContainingText('.page', '2')).isDisplayed()).toBeTruthy();
    this.waitFor(element(by.linkText('The Agile Samurai')));
    expect(element(by.linkText('The Agile Samurai')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Oscar T-shirt')).isPresent()).toBeFalsy();

    element(by.css('li.next button')).click();
    expect(element(by.cssContainingText('.page', '3')).isDisplayed()).toBeTruthy();
    this.waitFor(element(by.linkText('Star Wars trilogy')));
    expect(element(by.linkText('Star Wars trilogy')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Oscar T-shirt')).isPresent()).toBeFalsy();

    element(by.css('li.next button')).click();
    expect(element(by.cssContainingText('.page', '4')).isDisplayed()).toBeTruthy();
    this.waitFor(element(by.linkText('Cryptonomicon')));
    expect(element(by.linkText('Cryptonomicon')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Oscar T-shirt')).isPresent()).toBeFalsy();

    element(by.css('li.next button')).click();
    expect(element(by.cssContainingText('.page', '5')).isDisplayed()).toBeTruthy();
    this.waitFor(element(by.linkText('Oscar T-shirt')));
    expect(element(by.linkText('Oscar T-shirt')).isPresent()).toBeTruthy();

    expect(element(by.css('li.next button')).isPresent()).toBeFalsy();
  }
  showMoreByCategory(name) {
    this.waitFor(element(by.css('article.product_pod')));
    element(by.cssContainingText('a', name)).click();
    this.waitFor(element(by.css('article.product_pod')));

    this.waitForCss('.page', '1');
    expect(element(by.cssContainingText('.page', '1')).isDisplayed()).toBeTruthy();
    this.waitForCss('a', 'Thinking Forth');

    expect(element(by.linkText('Thinking Forth')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Algorithms')).isPresent()).toBeFalsy();

    element(by.css('li.next button')).click();
    this.waitForCss('a', 'Algorithms');
    this.waitForCss('a', 'The C Programming Language');
    expect(element(by.cssContainingText('.page', '2')).isDisplayed()).toBeTruthy();
    expect(element(by.cssContainingText('a', 'Algorithms')).isPresent()).toBeTruthy();

    expect(element(by.css('li.next button')).isPresent()).toBeFalsy();

  }
  waitFor(el, time = 5000) {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(el), time, 'Element taking too long to appear in the DOM');
  }

  waitForCss(elCss, text, time = 5000) {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(element(by.cssContainingText(elCss, text))), time, '[CSS] Element taking too long to appear in the DOM');
  }
}
