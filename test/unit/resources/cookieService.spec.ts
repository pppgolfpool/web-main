import { CookieService } from '../../../src/resources/services/cookieService';

describe('the cookie service', () => {
  it('saves and retrieves cookies', () => {
    let service = new CookieService();
    service.setCookie("testCookie", "", 1);
    service.setCookie("testCookie", "testCookieValue", 1);
    var value = service.getCookie("testCookie");
    expect(value).toBe("testCookieValue");
  });
  it('tests for the existence of cookies', () =>{
    let service = new CookieService();
    service.setCookie("testCookie", "", 1);
    service.setCookie("testCookie", "testCookieValue", 1);
    let exists = service.cookieExists("testCookie");
    expect(exists).toBeTruthy();
  });
  it('deletes cookies', () => {
    let service = new CookieService();
    service.setCookie("testCookie", "", 1);
    let exists = service.cookieExists("testCookie");
    expect(exists).toBeFalsy();
  });
});