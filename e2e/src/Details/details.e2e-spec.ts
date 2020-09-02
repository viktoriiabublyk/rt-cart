import { DetailsPage } from './../Details/details.po';
import { element, by, browser } from 'protractor';

describe('workspace-project details page', () => {
  let page: DetailsPage;

  beforeAll(() => {
    page = new DetailsPage();
    page.navigateTo();
  });

  it('should display id#161 product page', () => {
    page.toPage('STL tutorial and reference guide');
    expect<any>(page.getParagraphText()).toEqual('STL tutorial and reference guide');
    page.backHome();
  });

  it('should display id#162 price details', () => {
    page.toPage('Bridging the Communication Gap');
    expect<any>(page.getPriceText()).toEqual('£20.99');
    // page.checkSliderPresent();
    page.sliderIsMissing();
    page.backHome();
  });

  it('should display id#206 product page and navigate to last page', () => {
    page.toPage('Visual Guide to Lock Picking');
    page.sliderIsMissing();
    expect<any>(page.getParagraphText()).toEqual('Visual Guide to Lock Picking');
    page.navigateToLastPage();
    page.backHome();
  });

  it('should display id#206 price details', () => {
    page.toPage('Visual Guide to Lock Picking');
    page.sliderIsMissing();
    expect<any>(page.getPriceText()).toEqual('£24.99');
    page.backHome();
  });

  it('should display id#206 price details and add sort option', () => {
    page.toPageWithReviews('Visual Guide to Lock Picking');
    expect<any>(page.getPriceText()).toEqual('£24.99');
    page.sliderIsMissing();
    page.goToAllReview();
    page.setSortOption();
    page.backHome();
  });

  it('should display id#206 and navigate to next page after select all review', () => {
    page.toPageWithReviews('Visual Guide to Lock Picking');
    page.sliderIsMissing();
    page.goToAllReview();
    page.navigateToNextPage();
    page.backHome();
  });

  it('should display id#206 and check image slider when image is missing', () => {
    page.toPageWithReviews('Visual Guide to Lock Picking');
    page.sliderIsMissing();
    page.goToAllReview();
    page.navigateToNextPage();
    page.backHome();
  });

  it('should display id#207 price details', () => {
    page.toPageWithReviews('Coders at Work');
    expect<any>(page.getPriceText()).toEqual('£19.99');
    // page.checkSliderPresent();
    page.sliderIsMissing();
    page.goToAllReview();
    page.navigateToNextPage();
    page.backHome();
  });

  it('should display id#207 price details and check page after select review', () => {
    page.toPageWithReviews('Coders at Work');
    expect<any>(page.getPriceText()).toEqual('£19.99');
    // page.checkSliderPresent();
    page.sliderIsMissing();
    page.goToAllReview();
    page.selectReview('Cool');
    page.backHome();
  });

  it('should display id#205 price details', () => {
    page.toPageWithReviews('Studyguide for Counter Hack Reloaded');
    expect<any>(page.getPriceText()).toEqual('£15.99');
    // page.checkSliderPresent();
    page.sliderIsMissing();
    page.addReviewFromAllReviewPage();
    page.backHome();
  });

  it('should display id#196 check navigate after add review', () => {
    page.toPageWithReviews('Silence On The Wire');
    expect<any>(page.getPriceText()).toEqual('£4.99');
    // page.checkSliderPresent();
    page.sliderIsMissing();
    page.addReviewFromAllReviewPage();
    page.backHome();
  });

  it('should display id#177 product page', () => {
    page.toPage('Reviewing Java');
    expect<any>(page.getParagraphText()).toEqual('Reviewing Java');
    // page.checkSliderPresent();
    page.sliderIsMissing();
    page.goToAllReview();
    page.addReviewFromAllReviewPage();
    page.backHome();
  });

  it('should display id#165 price details', () => {
    page.toPage('Fearless Change');
    expect<any>(page.getPriceText()).toEqual('£20.99');
    // page.checkSliderPresent(); use if count of images more than 1
    page.sliderIsMissing();
    page.backHome();
  });

  it('should set searchParam', () => {
    page.setSearchParam('amazing');
    page.setSearchParam('book');
    page.backHome();

  });

  it('should set searchParam and back home and set param again', () => {
    page.setSearchParam('document');
    page.setSearchParam('hacking');
    page.backHome();
    page.setSearchParam('book');
    page.backHome();

  });

  it(`recently viewed section must should'nt be more 6 items`, () => {
    page.toPage('Fearless Change');
    page.sliderIsMissing();
    // page.checkSliderPresent();
    page.backHome();

    page.toPage('Bridging the Communication Gap');
    page.sliderIsMissing();
    // page.checkSliderPresent();
    page.backHome();

    page.toPage('Scrum and XP from the Trenches');
    page.sliderIsMissing();
    // page.checkSliderPresent();
    page.backHome();

    page.toPage('Extreme Programming Explained.');
    page.sliderIsMissing();
    // page.checkSliderPresent();
    page.backHome();

    page.toPage('Genetic Programming');
    page.sliderIsMissing();
    // page.checkSliderPresent();
    page.backHome();

    page.toPage('Agile Retrospective');
    page.sliderIsMissing();
    // page.checkSliderPresent();
    page.backHome();

    page.toPage('Specification by Example');
    const items = element.all(by.css('.recent-viewed-list__item'));
    expect<any>(items.count()).toEqual(6);
    expect<any>(element(by.css('.recent-viewed-list__item')).isPresent()).toBe(true);
    page.backHome();
  });

  it(`recently viewed hide when user seen only 1 item`, () => {
    browser.refresh();
    page.toPage('Specification by Example');

    expect<any>(element(by.css('.recent-viewed-list__item')).isPresent()).toBe(false);
    page.backHome();
  });

  it(`recently viewed shown when user seen 2 or more item(s)`, () => {
    browser.refresh();

    page.toPage('Specification by Example');
    page.sliderIsMissing();
    // page.checkSliderPresent();
    page.backHome();

    page.toPage('Genetic Programming');
    page.sliderIsMissing();
    // page.checkSliderPresent();
    expect<any>(element(by.css('.recent-viewed-list__item')).isPresent()).toBe(true);
    page.backHome();
  });

});
