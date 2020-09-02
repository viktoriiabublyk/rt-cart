import { MessageAlert } from './message.po';
import { element, by, browser } from 'protractor';
import { AuthPage } from '../Auth/auth.po';

describe('workspace-project Message', () => {
  let alert: MessageAlert;
  let page: AuthPage;

  beforeAll(() => {
    alert = new MessageAlert();
    page = new AuthPage();
  });

  it('should display alert in Home Page', () => {
    page.navigateTo();
    page.login();
    alert.waitFor(element(by.css('article.product_pod')));
    expect(element(by.css('article.product_pod')).isPresent()).toBeTruthy();
    expect(element(by.css('div.alert')).isPresent()).toBeTruthy();
  });

  it('should display and delete alert in Login Form" ', () => {
    page.logout();
    page.navigateTo();
    page.loginError();
    alert.waitFor(element(by.css('div.alert')));
    expect(element(by.css('div.alert')).isPresent()).toBeTruthy();
    alert.deleleAlert();
    expect(element(by.css('div.alert')).isPresent()).toBeFalsy();
  });

});
