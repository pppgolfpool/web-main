// http://www.w3schools.com/js/js_cookies.asp
export class CookieService {
    
    constructor(){
      
    }

    setCookie(cname: string, cvalue: string, exdays: number) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname: string) : string {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
        if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    cookieExists(cname: string) : boolean {
        var value = this.getCookie(cname);
        return value != "";
    }
}