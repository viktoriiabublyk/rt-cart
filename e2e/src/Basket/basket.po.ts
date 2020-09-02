import { browser, by, element, protractor } from 'protractor';

export class Basket {
  navigateToCatalogue() {
    return browser.get(`/catalogue/`);
  }

  navigateTo(url: string) {
    return browser.get(`/${url}`);
  }

  toPage(name) {
    this.waitFor(element(by.css('h3 > a')));

    this.waitFor(element(by.linkText(name)));

    expect(element(by.linkText(name)).isPresent()).toBeTruthy();

    element(by.cssContainingText('a', name)).click();

    expect(element(by.css('div.content')).isPresent()).toBeTruthy();
  }


  waitElementWithTextByCss(elCss, text, time = 5000) {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(element(by
      .cssContainingText(elCss, text))), time, '[CSS] Element taking too long to appear in the DOM');
  }

  waitFor(el, time = 5000) {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(el), time, 'Element taking too long to appear in the DOM');
  }

  backHome() {
    element(by.cssContainingText('a', 'Oscar')).click();
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod')).isPresent()).toBeTruthy();
  }

  selectFirstProduct() {
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('ol.row ul li article.product_pod')).isPresent()).toBeTruthy();
    element(by.css('article.product_pod')).element(by.xpath('div[2]/app-button-add/form/div')).click();
  }

  toNumber(promiseOrValue) {
    // if it is not a promise, then convert a value
    if (!protractor.promise.isPromise(promiseOrValue)) {
      return parseFloat(promiseOrValue);
    }

    // if promise - convert result to number
    return promiseOrValue.then((stringNumber) => {
      return parseFloat(stringNumber);
    });
  }
}
