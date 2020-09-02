import { browser, by, element, protractor, By } from 'protractor';

export class AuthPage {
  navigateTo() {
    return browser.get('/auth/login');
  }

  enterInputValue(_CLASS, _NAME) {
    const rtEmail = element(by.css(`rt-input-block.${_CLASS}`));
    rtEmail.click();
    const inputRtEmail = rtEmail.element(by.css('input'));
    inputRtEmail.sendKeys(_NAME);
  }

  login() {
    element(by.css('form.login')).isPresent().then((result) => {
      if (result) {
        this.enterInputValue('email', 'superuser@example.com');
        this.enterInputValue('password', 'testing');

        element(by.css('form.login button[type=submit]')).click();
        expect(element(by.cssContainingText('li a i', 'Account')).isPresent).toBeTruthy();
      }
    });
  }

  loginError() {
    element(by.css('form.login')).isPresent().then((result) => {
      if (result) {
        this.enterInputValue('email', 'superuser@example.com');
        this.enterInputValue('password', 'test');

        element(by.css('form.login button[type=submit]')).click();
      }
    });
  }

  logout() {
    expect(element(by.cssContainingText('li a i', 'Logout')).isPresent).toBeTruthy();
    this.waitFor(element(by.id('logout_link')));
    element(by.id('logout_link')).click();
    expect(element(by.cssContainingText('li a i', 'Login or register')).isPresent).toBeTruthy();
  }

  account() {
    expect(element(by.cssContainingText('li a i', 'Account')).isPresent).toBeTruthy();
    this.waitFor(element(by.id('accounts_link')));
    element(by.id('accounts_link')).click();
    expect(element(by.cssContainingText('div.page-header h1', 'Profile')).isPresent()).toBeTruthy();
  }

  editProfile() {
    element(by.cssContainingText('a', 'Edit profile')).click();
    expect(element(by.cssContainingText('div.page-header h1', 'Edit Profile')).isPresent()).toBeTruthy();
    this.changeValue();
  }

  changeValue() {
    this.enterInputValue('first_name', 't');
    this.enterInputValue('last_name', 'g');
    element(by.css('button[type=unsubmit]')).click();
    this.waitFor(element(by.cssContainingText('div.page-header h1', 'Profile')));
    expect(element(by.cssContainingText('div.page-header h1', 'Profile')).isPresent()).toBeTruthy();

  }

  forgotPassword() {
    expect(element(by.css('form.login')).isPresent()).toBeTruthy();
    element(by.css('a.forgotPassword')).click();
    expect(element(by.css('form.reset')).isPresent()).toBeTruthy();
    this.enterInputValue('email', 'superuser@example.com');
    element(by.cssContainingText('button', 'Send reset email')).click();
    this.waitFor(element(by.cssContainingText('h2', 'Log In')));
    expect(element(by.css('form.login')).isPresent()).toBeTruthy();
  }


  register() {

  }

  resetUser() {
    browser.waitForAngularEnabled(false);

    // browser.get('/dashboard/api/quest/clear/');

    // browser.driver.findElement(by.css('form fieldset div.form-actions button.btn-primary')).isEnabled().then((result) => {
    //   browser.driver.findElement(by.id('djHideToolBarButton')).isDisplayed().then((result) => {
    //     if (result)
    //       browser.driver.findElement(by.id('djHideToolBarButton')).click();
    //   });
    //   if (result) {
    //     browser.driver.findElements(By.css('.form-actions button')).then(elements => elements[0].click());
    //     // browser.sleep(10000);
    //   }
    // });

    browser.waitForAngularEnabled(true);
    browser.get('/');
    browser.waitForAngular();
  }

  IsLogInForm() {
    expect(element(by.css('form.login')).isPresent()).toBeTruthy();
    expect(element(by.cssContainingText('form.login', 'Log In')).isPresent()).toBeTruthy();
  }

  IsRegisterForm() {
    expect(element(by.css('form.register')).isPresent()).toBeTruthy();
    expect(element(by.cssContainingText('form.register', 'Register')).isPresent()).toBeTruthy();
  }

  switchForm() {
    element(by.css('div.text-center strong')).click();
  }

  waitFor(el, time = 5000) {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(el), time, 'Element taking too long to appear in the DOM');
  }
}
