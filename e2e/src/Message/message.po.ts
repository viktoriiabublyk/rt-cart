import { browser, by, element, protractor } from 'protractor';

export class MessageAlert {

  waitFor(el, time = 5000) {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(el), time, 'Element taking too long to appear in the DOM');
  }

  deleleAlert() {
    expect(element(by.css('div.alert')).isPresent()).toBeTruthy();
    element(by.css('div.alert mat-icon.mat-icon')).click();
  }
}
