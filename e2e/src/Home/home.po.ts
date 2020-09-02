import { browser, by, element, protractor } from 'protractor';

export class HomePage {
    navigateTo() {
      return browser.get('/');
    }
    showMore() {
      element(by.css('li.next button')).click();
      this.waitFor(element(by.cssContainingText('article.product_pod', 'Hacking Exposed Wireless')));
      expect(element(by.linkText('Hacking Exposed Wireless')).isPresent()).toBeTruthy();

      element(by.css('li.next button')).click();
      this.waitFor(element(by.cssContainingText('article.product_pod', 'Hacking Exposed Wireless')));
      expect(element(by.linkText('Hacking Exposed Wireless')).isPresent()).toBeTruthy();
      expect(element(by.linkText('Programming Ruby')).isPresent()).toBeFalsy();
    }
    chooseCat() {
      element(by.css('li.col-xs-6')).click();
      this.waitFor(element(by.cssContainingText('h1.title', 'Clothing')));
      expect(element(by.linkText('Clothing')).isPresent()).toBeTruthy();
      expect(element(by.linkText('Bookses')).isPresent()).toBeFalsy();
    }
    showBread() {
      element(by.css('li.col-xs-6')).click();
      this.waitFor(element(by.css('ul.breadcrumb')));
      expect(element(by.css('ul.breadcrumb')).isPresent()).toBeTruthy();
      this.waitFor(element(by.css('ul.breadcrumb li')));
      expect(element(by.css('ul.breadcrumb li')).isPresent()).toBeTruthy();
      expect(element(by.css('ul.breadcrumb li a')).isPresent()).toString();
      expect(element(by.css('ul.breadcrumb li.active')).isPresent()).toBeFalsy();
    }
    showBreadCurrentProd() {
      element(by.css('app-product h3 a')).click();
      this.waitFor(element(by.css('ul.breadcrumb')));
      expect(element(by.css('ul.breadcrumb')).isPresent()).toBeTruthy();
      element(by.css('ul.breadcrumb li a')).click();
    }
    waitFor(el, time = 4000) {
      const until = protractor.ExpectedConditions;
      browser.wait(until.presenceOf(el), time, 'Element taking too long to appear in the DOM');
    }
}
