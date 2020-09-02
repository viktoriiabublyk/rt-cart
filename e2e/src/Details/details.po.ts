import { browser, by, element, protractor } from 'protractor';

export class DetailsPage {
  navigateTo() {
    return browser.get(`/catalogue`);
  }

  enterInputValue(_CLASS: string, _NAME: string) {
    const rtControl = element(by.css(`rt-input-block.${_CLASS}`));
    rtControl.click();
    const inputRtEmail = rtControl.element(by.css('input'));
    inputRtEmail.sendKeys(_NAME);
  }
  enterTextAreaValue(_CLASS: string, _NAME: string) {
    const rtControl = element(by.css(`rt-input-block-textarea.${_CLASS}`));
    rtControl.click();
    const textAreaRtEmail = rtControl.element(by.css('textarea'));
    textAreaRtEmail.sendKeys(_NAME);
  }
  clearingInput(_CLASS: string) {
    const rtControl = element(by.css(`rt-input-block.${_CLASS}`));
    const inputRtInput = rtControl.element(by.css('input'));
    inputRtInput.clear();
  }
  enterScoreValue(_CLASS: string) {
    const optionScore = element.all(by.css(`.${_CLASS} div`)).last();
    optionScore.click();
  }
  setSortOption() {
    const rtControl = element(by.css('mat-form-field.sort input'));
    rtControl.click();
    this.waitFor(element(by.css('mat-option')));

    const rtOption = element.all(by.css('mat-option')).first();
    rtOption.click();
    this.waitFor(element(by.linkText('Sort')));

    const rtButton = element(by.cssContainingText('a', 'Sort'));
    rtButton.click();

  }
  setSearchParam(searchParam: string) {
    element(by.css('form.search_form')).isPresent().then((result) => {
      if (result) {
        this.enterInputValue('search', searchParam);

        element(by.css('form.search_form button[type=submit]')).click();
      }
    });
    browser.sleep(2000);

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

  navigateToNextPage() {
    this.waitFor(element(by.css('.td-paging-bar-next-page')));
    const rtNextButton = element(by.css('.td-paging-bar-next-page'));
    rtNextButton.click();
  }

  navigateToLastPage() {
    this.waitFor(element(by.css('.td-paging-bar-last-page')));
    const rtNextButton = element(by.css('.td-paging-bar-last-page'));
    rtNextButton.click();
  }

  toPage(name) {

    this.waitFor(element(by.linkText(name)));

    expect(element(by.linkText(name)).isPresent()).toBeTruthy();
    element(by.cssContainingText('a', name)).click();
    browser.sleep(2000);

    expect(element(by.css('div.content')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-3')).isPresent()).toBeTruthy();
  }
  toPageWithReviews(name) {

    this.waitFor(element(by.linkText(name)));

    expect(element(by.linkText(name)).isPresent()).toBeTruthy();
    element(by.cssContainingText('a', name)).click();
    browser.sleep(2000);
    expect(element(by.css('div.content')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-5.rating app-star-rating')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-3')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-2.rating app-star-rating')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-6.title')).isPresent()).toBeTruthy();

  }

  checkAddedReview() {
    this.waitFor(element(by.css('app-review')));
    expect(element(by.css('app-review')).isPresent()).toBeTruthy();
    expect(element(by.css('div.content')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-5.rating app-star-rating')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-3.reviews')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-3.write')).isPresent()).toBeTruthy();

    expect(element(by.css('div.col-sm-2.rating app-star-rating')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-6.title')).isPresent()).toBeTruthy();
    expect(element.all(by.cssContainingText('p', 'Something amazing')).last().isPresent()).toBeTruthy();
    expect(element.all(by.cssContainingText('a', 'Amazing')).last().isPresent()).toBeTruthy();

    expect(element(by.css('button.td-paging-bar-link-page')).isPresent()).toBeTruthy();
    expect(element(by.css('span')).isPresent()).toBeTruthy();
  }
  goToAllReview() {
    this.waitFor(element(by.css('.textLink a')));
    const name: any = element(by.css('.textLink a')).getText();
    element(by.cssContainingText('a', name)).click();
    browser.sleep(2000);
    expect(element(by.css('div.col-sm-3.rating app-star-rating')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-2.reviews')).isPresent()).toBeTruthy();

    expect(element(by.css('div.col-sm-3.write')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-2.rating app-star-rating')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-6.title')).isPresent()).toBeTruthy();
  }

  addReviewFromAllReviewPage() {
    this.waitFor(element(by.linkText('Write a review')));

    expect(element(by.linkText('Write a review')).isPresent()).toBeTruthy();
    element(by.cssContainingText('a', 'Write a review')).click();
    browser.sleep(2000);
    element(by.css('form.addReview')).isPresent().then((result) => {
      if (result) {
        this.enterInputValue('title', 'Amazing');
        this.enterTextAreaValue('body', 'Something amazing');
        this.enterInputValue('name', 'Grishania ');
        this.enterInputValue('email', 'grisha@mail.ru');
        this.enterScoreValue('score');
        element(by.css('form.addReview button[type=submit]')).click();
      }
    });
    browser.sleep(2000);
    this.checkAddedReview();

  }
  selectReview(name) {
    this.waitFor(element(by.linkText(name)));
    expect(element(by.linkText(name)).isPresent()).toBeTruthy();
    element.all(by.cssContainingText('a', name)).first().click();
    browser.sleep(2000);
    this.checkSelectedReviewPage(name);
  }
  checkSliderPresent() {
    this.waitFor(element(by.css('div.slider')));
    expect(element(by.css('div.slider')).isPresent()).toBeTruthy();
    expect(element(by.css('div.slider ng-image-slider')).isPresent()).toBeTruthy();
    expect(element(by.css('ng-image-slider .ng-image-slider')).isPresent()).toBeTruthy();

  }
  sliderIsMissing() {
    this.waitFor(element(by.css('div.image_gallery')));
    expect(element(by.css('div.slider')).isPresent()).toBeFalsy();
  }
  checkSelectedReviewPage(name) {
    expect(element(by.css('div.col-sm-3.rating app-star-rating')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-2.reviews')).isPresent()).toBeTruthy();
    expect(element(by.css('div.col-sm-3.write')).isPresent()).toBeTruthy();
    expect(element(by.css('.col-sm-6.title')).getText()).toEqual(name);
    expect(element(by.css('.col-sm-2.rating app-star-rating')).isPresent()).toBeTruthy();
    expect<any>(element(by.css('p.body')).getText()).toEqual('great book');
    expect(element.all(by.css('div.col-sm-12')).first().isPresent()).toBeTruthy();
    expect(element.all(by.css('div.col-sm-12')).last().isPresent()).toBeTruthy();
  }
  getParagraphText() {
    this.waitFor(element(by.css('.product_main h1')));
    return element(by.css('.product_main h1')).getText();
  }

  getPriceText() {
    this.waitFor(element(by.css('.product_main .price_color')));
    return element(by.css('.product_main .price_color')).getText();
  }

  waitFor(el, time = 5000) {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(el), time, 'Element taking too long to appear in the DOM');
  }

  backHome() {
    element(by.cssContainingText('a', 'Home')).click();
    element(by.cssContainingText('a', 'go to catalogue')).click();
    this.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod')).isPresent()).toBeTruthy();
    expect(element(by.css('ol.row ul li article.product_pod')).isPresent()).toBeTruthy();
    expect(element(by.css('article.product_pod app-star-rating')).isPresent()).toBeTruthy();

  }
}
