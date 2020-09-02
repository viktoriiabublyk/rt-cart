import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject, tick, fakeAsync} from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User, Token, EmailPasswordData } from './auth.model';
import { last } from 'lodash';
import { Validators } from '@angular/forms';

export const user: User = {
  pk: 1,
  username: 'superuser',
  email: 'superuser@example.com',
  first_name: 'Ld',
  last_name: 'Sv',
  is_staff: true,
  is_superuser: true,
  is_authenticated: true,
  date_joined: '2012-09-12T18:00:02+01:00'
};

export const anonimousUser: User = {
  pk: null,
  username: '',
  is_staff: false,
  is_superuser: false,
  is_authenticated: false
};

export const editedUser: User = {
  first_name: 'First',
  last_name: 'Second',
  username: 'superuser',
  pk: 1,
  email: 'superuser@example.com',
};

export const token: Token = {
  key: 'erfereverv'
};

export const editProfileForm = {
  first_name: 'First',
  last_name: 'Second',
  username: 'superuser',
};
export const loginForm: EmailPasswordData = {
  email: 'superuser@example.com',
  password: 'testing'
};
export const registrationForm = {
    username: 'superuser',
    email: 'superuser@example.com',
    password1: 'testing',
    password2: 'testing'
};

describe('AuthService', () => {
  let httpMock: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService
      ]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should done http get user', fakeAsync(() => {
  //   let data = null;
  //   service.getUser().subscribe(dataUser => {
  //     data = dataUser;
  //   });
  //   const req = httpMock.expectOne('/api/rt-auth/user/');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(user);
  //   tick();
  //   expect(data).toEqual(user);
  //   httpMock.verify();
  // }));

  // it('should done http get user and user is not found', fakeAsync(() => {
  //   let data = null;
  //   service.getUser().subscribe(dataUser => {
  //     data = dataUser;
  //   });
  //   const req = httpMock.expectOne('/api/rt-auth/user/');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(anonimousUser);
  //   tick();
  //   expect(data).toEqual(anonimousUser);
  //   httpMock.verify();
  // }));

  // it('should done http put user', fakeAsync(() => {
  //   const responses = [];

  //   service.putUser(editProfileForm).subscribe(resp => responses.push(resp));

  //   const req = httpMock.expectOne(`${service.API_ENDPOINT}/user/`);
  //   expect(req.request.method).toBe('PUT');
  //   req.flush({
  //     pk: 1,
  //     first_name: 'First',
  //     last_name: 'Second',
  //     username: 'superuser',
  //     email: 'superuser@example.com',
  //   });

  //   tick();
  //   expect(last(responses)).toEqual(editedUser);
  //   expect(last(responses)).not.toEqual(user);
  //   httpMock.verify();
  // }));

  it('should done http post sign in with email and password', fakeAsync(() => {
    let data = null;
    service.signInWithEmailAndPassword(loginForm).subscribe(key => {
      data = key;
    });
    const req = httpMock.expectOne(`${service.API_ENDPOINT}/login/`);
    expect(req.request.method).toBe('POST');
    req.flush(token);

    tick();
    expect(data).toEqual(token);
    httpMock.verify();

  }));

  it('should done http post registration', fakeAsync(() => {
    let data = null;
    service.registration(registrationForm).subscribe(key => {
      data = key;
    });
    const req = httpMock.expectOne(`${service.API_ENDPOINT}/registration/`);
    expect(req.request.method).toBe('POST');
    req.flush(token);

    tick();
    expect(data).toEqual(token);
    httpMock.verify();

  }));

  it('should done http post logout', fakeAsync(() => {

    let data = null;
    service.logout().subscribe(str => {
      data = str;
    });
    const req = httpMock.expectOne(`${service.API_ENDPOINT}/logout/`);
    expect(req.request.method).toBe('POST');
    req.flush('Successfully logged out.');

    tick();
    expect(data).toEqual('Successfully logged out.');
    httpMock.verify();

  }));

  it('should done http post password reset', fakeAsync(() => {
    const form = {
      email: 'superuser@example.com',
    };
    let data = null;
    service.passwordReset(form.email).subscribe(str => {
      data = str;
    });
    const req = httpMock.expectOne(`${service.API_ENDPOINT}/password/reset/`);
    expect(req.request.method).toBe('POST');
    req.flush('Password reset e-mail has been sent');

    tick();
    expect(data).toEqual('Password reset e-mail has been sent');
    httpMock.verify();

  }));

  it('should done http post password reset confirm', fakeAsync(() => {
    const uid = 'MQ';
    const form = {
      password1: ['testing', Validators.required],
      password2: ['testing', Validators.required]
    };

    let data = null;
    service.resetPasswordConfirm(form.password1, form.password2, uid, token).subscribe(str => {
      data = str;
    });
    const req = httpMock.expectOne(`${service.API_ENDPOINT}/password/reset/confirm/`);
    expect(req.request.method).toBe('POST');
    req.flush('Password reset confirm has been sent');

    tick();
    expect(data).toEqual('Password reset confirm has been sent');
    httpMock.verify();

  }));

});
