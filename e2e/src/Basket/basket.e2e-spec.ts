import { Basket } from './basket.po';
import { browser, element, by } from 'protractor';

describe('basket', () => {
  let page: Basket;

  beforeAll(() => {
    page = new Basket();
  });

  beforeEach(() => {
    page.navigateToCatalogue(); // #FIXME сделать без перезагрузки страницы
  });

  it('should shown 404 page', () => {
    page.navigateTo('basket/add/');
    page.waitElementWithTextByCss('section', '404 not found');
  });

  it('should shown message about empty basket', () => {
    page.navigateTo('basket/add/160');
    page.waitElementWithTextByCss('h2', 'Sorry, your basket is empty now');
  });

  it('should redirect to /basket/add page', () => {
    page.selectFirstProduct();
    expect(browser.getCurrentUrl()).toContain('/basket/add/');
  });

  it('should shown 20 recommended items', () => {
    page.selectFirstProduct();
    expect(browser.getCurrentUrl()).toContain('/basket/add/');
    page.waitFor(element(by.css('.product_pod')));
    const items = element.all(by.css('.product_pod'));
    expect<any>(items.count()).toEqual(20);
  });

  it('should shown correct current item', () => {
    page.toPage('Fearless Change');
    element(by.className('btn btn-lg btn-primary btn-add-to-basket')).click();

    page.navigateToCatalogue();
    page.toPage('Bridging the Communication Gap');
    element(by.className('btn btn-lg btn-primary btn-add-to-basket')).click();
    expect<any>(element(by.className('basket-preview__row')).isPresent()).toBe(true);

    page.waitFor(element(by.className('basket-preview__title')));
    const title = element(by.className('basket-preview__title')).getText();
    expect(title).toContain('Bridging the Communication Gap');
  });

  it('should redirect to basket page with click on icon basket-mini', () => {
    element(by.className('basket-mini')).click();
    page.waitElementWithTextByCss('h2', 'Basket');
  });

  it('check quantity and price template on basket page', () => {
    page.toPage('Hacking Exposed Wireless');
    page.waitFor(element(by.className('btn')));
    element(by.className('btn btn-lg btn-primary btn-add-to-basket')).click();
    page.backHome();

    page.toPage('Hacking Exposed Wireless');
    page.waitFor(element(by.className('price_color')));
    const priceFromDetailsPage = element(by.className('price_color')).getText();

    page.waitFor(element(by.className('btn')));
    element(by.className('btn btn-lg btn-primary btn-add-to-basket')).click();

    page.waitFor(element(by.className('basket-preview__quantity')));
    const quantity = element(by.className('basket-preview__quantity')).getText();
    expect<any>(quantity).toEqual('2');

    page.waitFor(element(by.className('basket-preview__price')));
    const priceFromBasketPage = element(by.className('basket-preview__price')).getText();
    expect(page.toNumber(priceFromBasketPage)).toEqual(page.toNumber(priceFromDetailsPage) * 2);
    page.backHome();
  });

  it('testing UI incr and decr buttons in basket', () => {
    page.toPage('Bridging the Communication Gap');
    element(by.className('btn btn-lg btn-primary btn-add-to-basket')).click();
    element(by.className('basket-mini')).click();

    const decrementBtn = element(by.className('quantity-decrement'));
    const incrementBtn = element(by.className('quantity-increment'));

    expect<any>(element(by.className('quantity-output')).getAttribute('value')).toBe('1');
    incrementBtn.click();
    expect<any>(element(by.className('quantity-output')).getAttribute('value')).toBe('2');
    incrementBtn.click();
    incrementBtn.click();
    expect<any>(element(by.className('quantity-output')).getAttribute('value')).toBe('4');
    decrementBtn.click();
    decrementBtn.click();
    decrementBtn.click();
    expect<any>(element(by.className('quantity-output')).getAttribute('value')).toBe('1');
    decrementBtn.click();
    page.waitFor(element(by.css('.basket-item')));

    element.all(by.css('.basket-item')).then((items) => {
      expect(items.length).toBe(1);
    });
    page.backHome();
  });

  it('testing UI remove item btn removed item', () => {
    page.toPage('Bridging the Communication Gap');
    element(by.className('btn btn-lg btn-primary btn-add-to-basket')).click();
    page.waitFor(element(by.className('basket-mini')));
    element(by.className('basket-mini')).click();

    page.waitFor(element(by.className('quantity-output')));
    expect<any>(element(by.className('quantity-output')).getAttribute('value')).toBe('1');
    element(by.className('glyphicon-trash')).click();
    browser.sleep(500);
    element.all(by.css('.basket-item')).then((items) => {
      expect(items.length).toBe(0);
    });
    page.backHome();
  });

  it('check totalPrice fn in basket template', () => {
    page.toPage('Hacking Exposed Wireless');
    element(by.className('btn btn-lg btn-primary btn-add-to-basket')).click();
    const price1 = element(by.className('basket-preview__price')).getText();
    page.backHome();

    page.toPage(`The shellcoder's handbook`);
    element(by.className('btn btn-lg btn-primary btn-add-to-basket')).click();
    const price2 = element(by.className('basket-preview__price')).getText();
    page.backHome();

    page.toPage('Coders at Work');
    element(by.className('btn btn-lg btn-primary btn-add-to-basket')).click();
    const price3 = element(by.className('basket-preview__price')).getText();
    element(by.className('basket-mini')).click();

    const totalPriceInBasketPage = element(by.className('total align-right')).getText();

    Promise.all([price1, price2, price3])
      .then(values => {
        const reducer = (accumulator, currentValue) => accumulator + parseFloat(currentValue.substring(1));
        const totalFromDetails = values.reduce(reducer, 0);

        expect(totalFromDetails).toBe(page.toNumber(totalPriceInBasketPage));
      });
  });

});
