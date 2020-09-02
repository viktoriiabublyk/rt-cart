import { AuthPage } from './auth.po';
import { element, by, browser, } from 'protractor';

describe('Auth', () => {
  let page: AuthPage;

  beforeEach(() => {
    // beforeAll(() => {
      page = new AuthPage();
      page.navigateTo();
  });

  it('should display login form', () => {
    page.IsLogInForm();
    page.switchForm();
    page.IsRegisterForm();
  });

  it('should display register form', () => {
    page.IsLogInForm();
    page.switchForm();
    page.IsRegisterForm();
    page.switchForm();
    page.IsLogInForm();
  });

  it('should login', () => {
    page.IsLogInForm();
    page.login();
  });

  it('should logout', () => {
    page.IsLogInForm();
    page.login();
    page.logout();
  });

  it('should display profile', () => {
    page.IsLogInForm();
    page.login();
    page.account();
  });

  it('should display Editprofile', () => {
    page.account();
    page.editProfile();
    page.logout();
  });

  it('should display reset password', () => {
    page.IsLogInForm();
    page.forgotPassword();
  });


});
