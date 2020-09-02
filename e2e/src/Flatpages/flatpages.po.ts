import { browser, by, element, protractor } from 'protractor';


export class Flatpages {
    navigateToPage(page: string) {
        return browser.get(`/page/${page}`);
    }

    waitForCss(elCss, text, time = 5000) {
        const until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(element(by
            .cssContainingText(elCss, text))), time, '[CSS] Element taking too long to appear in the DOM');
      }

    waitFor(el, time = 5000) {
        const until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(el), time, 'Element taking too long to appear in the DOM');
    }

    backHome() {
        element(by.cssContainingText('a', 'Home')).click();
        this.waitFor(element(by.css('article.product_pod')));
        expect(element(by.css('article.product_pod')).isPresent()).toBeTruthy();
    }
}
