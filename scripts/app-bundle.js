var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/services/eventService',["require", "exports", "aurelia-dependency-injection", "aurelia-event-aggregator"], function (require, exports, aurelia_dependency_injection_1, aurelia_event_aggregator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventService = (function () {
        function EventService(eventAggregator) {
            this._eventAggregator = eventAggregator;
        }
        EventService.prototype.publish = function (eventType, data) {
            if (data === void 0) { data = null; }
            this._eventAggregator.publish(eventType, data);
        };
        EventService.prototype.subscribe = function (eventType, callback) {
            this._eventAggregator.subscribe(eventType, callback);
        };
        EventService = __decorate([
            aurelia_dependency_injection_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], EventService);
        return EventService;
    }());
    exports.EventService = EventService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('shell/routerService',["require", "exports", "aurelia-framework", "aurelia-router", "aurelia-event-aggregator", "../resources/services/eventService"], function (require, exports, aurelia_framework_1, aurelia_router_1, aurelia_event_aggregator_1, eventService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RouterService = (function () {
        function RouterService(router, eventAggregator, eventService) {
            var _this = this;
            this.currentRoute = 'statistics';
            this.eventAggregator = eventAggregator;
            this.eventService = eventService;
            this.eventAggregator.subscribe('router:navigation:complete', function (data) {
                if (data.instruction.fragment == '/') {
                    _this.currentRoute = 'statistics';
                }
                else {
                    _this.currentRoute = _this.determineRoute(data.instruction.fragment);
                }
                _this.eventService.publish('routed', _this.currentRoute);
            });
        }
        RouterService.prototype.configure = function (config) {
            config.title = "ppppool",
                config.map([
                    { route: [""], moduleId: "./main/statistics/statistics", title: 'Statistics', nav: true },
                    { route: ["picks"], moduleId: "./main/picks/picks", title: 'Picks', nav: true },
                    { route: ["winners"], moduleId: "./main/winners/winners", title: 'Winners', nav: true },
                    { route: ["feedback"], moduleId: "./main/feedback/feedback", title: 'Feedback' },
                    { route: ["admin"], moduleId: "./main/admin/admin", title: 'Admin', nav: true },
                    { route: ["settings"], moduleId: "./main/settings/settings", title: 'Settings', nav: true },
                ]);
            return config;
        };
        RouterService.prototype.determineRoute = function (route) {
            var firstSlash = false;
            var buffer = '';
            for (var _i = 0, route_1 = route; _i < route_1.length; _i++) {
                var c = route_1[_i];
                if (!firstSlash) {
                    if (c == '/') {
                        firstSlash = true;
                        continue;
                    }
                }
                if (c == '/') {
                    return buffer;
                }
                buffer = buffer + c;
            }
            return buffer;
        };
        RouterService = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router, aurelia_event_aggregator_1.EventAggregator, eventService_1.EventService),
            __metadata("design:paramtypes", [aurelia_router_1.Router, aurelia_event_aggregator_1.EventAggregator, eventService_1.EventService])
        ], RouterService);
        return RouterService;
    }());
    exports.RouterService = RouterService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('app',["require", "exports", "aurelia-dependency-injection", "./resources/services/eventService", "./shell/routerService", "aurelia-router"], function (require, exports, aurelia_dependency_injection_1, eventService_1, routerService_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(eventService, router, routerService) {
            this.eventService = eventService;
            this.router = router;
            this.routerService = routerService;
        }
        App.prototype.activate = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.router.configure(this.routerService.configure)];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        App = __decorate([
            aurelia_dependency_injection_1.inject(eventService_1.EventService, aurelia_router_1.Router, routerService_1.RouterService),
            __metadata("design:paramtypes", [eventService_1.EventService, aurelia_router_1.Router, routerService_1.RouterService])
        ], App);
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('resources/services/restService',["require", "exports", "aurelia-dependency-injection", "aurelia-fetch-client"], function (require, exports, aurelia_dependency_injection_1, aurelia_fetch_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RestService = (function () {
        function RestService(http) {
            this.http = http;
        }
        RestService.prototype.post = function (url, query, headers, body) {
            if (query === void 0) { query = null; }
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var urlQuery, response, content, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            urlQuery = this.getQueryUrl(url, query);
                            this.requestDiagnostic();
                            if (!headers) {
                                headers = {};
                            }
                            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                            return [4, this.http.fetch(urlQuery, {
                                    method: 'post',
                                    headers: headers ? headers : {},
                                    body: body ? JSON.stringify(body) : JSON.stringify({ empty: true })
                                })];
                        case 1:
                            response = _a.sent();
                            this.responseDiagnostic();
                            content = {};
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, response.json()];
                        case 3:
                            content = _a.sent();
                            return [3, 5];
                        case 4:
                            err_1 = _a.sent();
                            content = {};
                            console.log(err_1);
                            return [3, 5];
                        case 5: return [2, new Response(content["Status"] ? content["Status"] : response.status, content["StatusText"] ? content["StatusText"] : response.statusText, content)];
                    }
                });
            });
        };
        RestService.prototype.getQueryUrl = function (url, query) {
            return !query ? url : url + "?" + this.serialize(query);
        };
        RestService.prototype.serialize = function (obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        };
        RestService.prototype.requestDiagnostic = function () {
        };
        RestService.prototype.responseDiagnostic = function () {
        };
        RestService = __decorate([
            aurelia_dependency_injection_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
        ], RestService);
        return RestService;
    }());
    exports.RestService = RestService;
    var Response = (function () {
        function Response(status, statusText, data) {
            if (data === void 0) { data = null; }
            this.Status = status;
            this.StatusText = statusText;
            this.Data = data;
            this.IsError = status != 200;
        }
        return Response;
    }());
    exports.Response = Response;
});

define('resources/services/cookieService',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CookieService = (function () {
        function CookieService() {
        }
        CookieService.prototype.setCookie = function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        };
        CookieService.prototype.getCookie = function (cname) {
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
        };
        CookieService.prototype.cookieExists = function (cname) {
            var value = this.getCookie(cname);
            return value != "";
        };
        return CookieService;
    }());
    exports.CookieService = CookieService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('resources/services/authService',["require", "exports", "aurelia-dependency-injection", "./cookieService", "aurelia-framework", "./eventService"], function (require, exports, aurelia_dependency_injection_1, cookieService_1, aurelia_framework_1, eventService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = aurelia_framework_1.LogManager.getLogger('authService');
    var AuthService = (function () {
        function AuthService(cs, ea) {
            this.adminRequestCallback = null;
            this.cookieService = cs;
            this.eventService = ea;
        }
        AuthService.prototype.login = function (token) {
            log.debug('storing auth cookie');
            this.cookieService.setCookie("authToken", JSON.stringify(token), 1000);
            this.eventService.publish('login');
        };
        AuthService.prototype.isLoggedIn = function () {
            var isLoggedIn = this.cookieService.cookieExists("authToken");
            log.debug("is logged in: " + isLoggedIn);
            return isLoggedIn;
        };
        AuthService.prototype.getWebToken = function () {
            if (this.isLoggedIn()) {
                var data = JSON.parse(this.cookieService.getCookie("authToken"));
                return new WebToken(data.email, data.authToken, data.userId, data.name);
            }
            return null;
        };
        AuthService.prototype.logout = function () {
            log.debug("logging out.");
            this.cookieService.setCookie("authToken", "", 1);
            window.location.replace("#");
            this.eventService.publish('logout');
            window.location.reload(true);
        };
        AuthService.prototype.setAdminRequestCallback = function (adminRequestCallback) {
            log.debug("setting admin request callback");
            this.adminRequestCallback = adminRequestCallback;
        };
        AuthService.prototype.requestAdminAuthorization = function () {
            return __awaiter(this, void 0, void 0, function () {
                var authToken, isAdmin;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isLoggedIn()) {
                                return [2];
                            }
                            log.debug("Requesting admin authorization");
                            authToken = this.getWebToken().authToken;
                            return [4, this.adminRequestCallback(authToken)];
                        case 1:
                            isAdmin = _a.sent();
                            log.debug("Admin authorization: " + isAdmin);
                            if (isAdmin) {
                                this.eventService.publish('adminDetected');
                            }
                            else {
                                this.eventService.publish('notAdmin');
                            }
                            return [2, isAdmin];
                    }
                });
            });
        };
        AuthService = __decorate([
            aurelia_dependency_injection_1.inject(cookieService_1.CookieService, eventService_1.EventService),
            __metadata("design:paramtypes", [cookieService_1.CookieService, eventService_1.EventService])
        ], AuthService);
        return AuthService;
    }());
    exports.AuthService = AuthService;
    var WebToken = (function () {
        function WebToken(email, authToken, userId, name) {
            this.email = email;
            this.authToken = authToken;
            this.userId = userId;
            this.name = name;
        }
        return WebToken;
    }());
    exports.WebToken = WebToken;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/auth/authClient',["require", "exports", "aurelia-dependency-injection", "../../resources/services/restService", "aurelia-framework", "../../resources/services/authService"], function (require, exports, aurelia_dependency_injection_1, restService_1, aurelia_framework_1, authService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = aurelia_framework_1.LogManager.getLogger('authClient');
    var AuthClient = (function () {
        function AuthClient(restService, authService) {
            var _this = this;
            this.serviceUrl = "https://ppppoolauthservice.azurewebsites.net";
            this.restService = restService;
            this.authService = authService;
            this.authService.setAdminRequestCallback(function (authToken) { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.authorize("admin", authToken)];
                        case 1:
                            result = _a.sent();
                            return [2, result];
                    }
                });
            }); });
        }
        AuthClient.prototype.login = function (userId, password) {
            return __awaiter(this, void 0, void 0, function () {
                var response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/login", {
                                userId: userId,
                                password: password
                            })];
                        case 1:
                            response = _a.sent();
                            if (!response.IsError) {
                                data = response.Data;
                                this.authService.login(new authService_1.WebToken(data["email"], data["authToken"], data["userId"], data["name"]));
                            }
                            return [2, !response.IsError];
                    }
                });
            });
        };
        AuthClient.prototype.authorize = function (role, authToken) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/authenticate", {
                                role: role,
                                authToken: authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, !response.IsError];
                    }
                });
            });
        };
        AuthClient = __decorate([
            aurelia_dependency_injection_1.inject(restService_1.RestService, authService_1.AuthService),
            __metadata("design:paramtypes", [restService_1.RestService, authService_1.AuthService])
        ], AuthClient);
        return AuthClient;
    }());
    exports.AuthClient = AuthClient;
});

define('main',["require", "exports", "./environment", "aurelia-framework", "aurelia-logging-console", "aurelia-fetch-client", "aurelia-event-aggregator", "./microservices/auth/authClient"], function (require, exports, environment_1, aurelia_framework_1, aurelia_logging_console_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, authClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Promise.config({
        longStackTraces: false,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .feature('microservices/auth')
            .feature('shell')
            .feature('microservices/stats/current')
            .feature('microservices/stats/history')
            .feature('microservices/stats/majors')
            .feature('microservices/stats/monthly')
            .feature('microservices/stats/playoffs')
            .feature('microservices/stats/season')
            .feature('microservices/picks')
            .feature('microservices/users')
            .feature('microservices/tournaments');
        if (environment_1.default.debug) {
            aurelia_framework_1.LogManager.addAppender(new aurelia_logging_console_1.ConsoleAppender());
            aurelia_framework_1.LogManager.setLevel(aurelia_framework_1.LogManager.logLevel.debug);
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        var log = aurelia_framework_1.LogManager.getLogger('RestService');
        var ea = aurelia.container.get(aurelia_event_aggregator_1.EventAggregator);
        var httpClient = aurelia.container.get(aurelia_fetch_client_1.HttpClient);
        httpClient.configure(function (config) {
            config
                .withDefaults({
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch'
                }
            })
                .withInterceptor({
                request: function (request) {
                    log.info(request);
                    ea.publish('request');
                    return request;
                },
                response: function (response) {
                    log.info(response);
                    ea.publish('response');
                    return response;
                }
            });
        });
        var authClient = aurelia.container.get(authClient_1.AuthClient);
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            'bootstrap/css/bootstrap.css',
            'resources/styles/iconfonts.css',
            'resources/styles/datatablestyles.css',
            'resources/styles/minton/css/components.css',
            'resources/styles/minton/css/core.css',
            'resources/styles/minton/css/elements.css',
            'resources/styles/minton/css/icons.css',
            'resources/styles/minton/css/menu.css',
            'resources/styles/minton/css/pages.css',
            'resources/styles/minton/css/responsive.css',
            'resources/styles/minton/css/variables.css',
            'resources/valueConverters/dateFormat',
            'resources/valueConverters/objectKeys'
        ]);
    }
    exports.configure = configure;
});

define('shell/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            "./shell"
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('shell/nav-bar',["require", "exports", "aurelia-framework", "../resources/services/eventService", "../resources/services/authService"], function (require, exports, aurelia_framework_1, eventService_1, authService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NavBarCustomElement = (function () {
        function NavBarCustomElement(es, as) {
            var _this = this;
            this.currentRoute = 'statistics';
            this.eventService = es;
            this.authService = as;
            this.eventService.subscribe('routed', function (data) {
                _this.currentRoute = data;
            });
            this.eventService.subscribe('adminDetected', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.isAdmin = true;
                    return [2];
                });
            }); });
            this.eventService.subscribe('notAdmin', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.isAdmin = false;
                    return [2];
                });
            }); });
            this.eventService.subscribe('logout', function () {
                _this.isAdmin = false;
            });
        }
        NavBarCustomElement = __decorate([
            aurelia_framework_1.inject(eventService_1.EventService, authService_1.AuthService),
            __metadata("design:paramtypes", [eventService_1.EventService, authService_1.AuthService])
        ], NavBarCustomElement);
        return NavBarCustomElement;
    }());
    exports.NavBarCustomElement = NavBarCustomElement;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('shell/progress-bar',["require", "exports", "aurelia-framework", "aurelia-event-aggregator"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProgressBarCustomElement = (function () {
        function ProgressBarCustomElement(ea) {
            var _this = this;
            this.show = false;
            this.ea = ea;
            this.ea.subscribe("request", function () {
                _this.show = true;
            });
            this.ea.subscribe("response", function () {
                _this.show = false;
            });
        }
        ProgressBarCustomElement = __decorate([
            aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator),
            __metadata("design:paramtypes", [Object])
        ], ProgressBarCustomElement);
        return ProgressBarCustomElement;
    }());
    exports.ProgressBarCustomElement = ProgressBarCustomElement;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('shell/shell',["require", "exports", "aurelia-dependency-injection", "../resources/services/eventService", "../resources/services/authService", "./routerService", "aurelia-router"], function (require, exports, aurelia_dependency_injection_1, eventService_1, authService_1, routerService_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ShellCustomElement = (function () {
        function ShellCustomElement(es, as, rs, r) {
            var _this = this;
            this.currentRoute = 'statistics';
            this.eventService = es;
            this.authService = as;
            this.routerService = rs;
            this.router = r;
            this.eventService.subscribe('routed', function (data) {
                _this.currentRoute = data;
            });
            this.eventService.subscribe('login', function () {
                _this.loggedIn = true;
            });
            this.eventService.subscribe('logout', function () {
                _this.loggedIn = false;
            });
            this.loggedIn = this.authService.isLoggedIn();
        }
        ShellCustomElement.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.authService.requestAdminAuthorization()];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        ShellCustomElement = __decorate([
            aurelia_dependency_injection_1.inject(eventService_1.EventService, authService_1.AuthService, routerService_1.RouterService, aurelia_router_1.Router),
            __metadata("design:paramtypes", [eventService_1.EventService, authService_1.AuthService, routerService_1.RouterService, aurelia_router_1.Router])
        ], ShellCustomElement);
        return ShellCustomElement;
    }());
    exports.ShellCustomElement = ShellCustomElement;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('shell/top-bar',["require", "exports", "aurelia-framework", "../resources/services/eventService", "../resources/services/authService"], function (require, exports, aurelia_framework_1, eventService_1, authService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TopBarCustomElement = (function () {
        function TopBarCustomElement(authService, eventService) {
            var _this = this;
            this.title = "PPP PGA Pool 2017";
            this.currentRoute = 'statistics';
            this.loggedIn = false;
            this.authService = authService;
            this.eventService = eventService;
            this.eventService.subscribe('routed', function (data) {
                _this.currentRoute = data;
            });
            this.eventService.subscribe('login', function () {
                _this.loggedIn = true;
            });
            this.eventService.subscribe('logout', function () {
                _this.loggedIn = false;
            });
            this.loggedIn = this.authService.isLoggedIn();
        }
        TopBarCustomElement.prototype.logout = function () {
            this.authService.logout();
        };
        TopBarCustomElement = __decorate([
            aurelia_framework_1.inject(authService_1.AuthService, eventService_1.EventService),
            __metadata("design:paramtypes", [Object, Object])
        ], TopBarCustomElement);
        return TopBarCustomElement;
    }());
    exports.TopBarCustomElement = TopBarCustomElement;
});

define('main/admin/admin',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Admin = (function () {
        function Admin() {
        }
        return Admin;
    }());
    exports.Admin = Admin;
});

define('main/feedback/feedback',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Feedback = (function () {
        function Feedback() {
        }
        return Feedback;
    }());
    exports.Feedback = Feedback;
});

define('main/picks/picks',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Picks = (function () {
        function Picks() {
        }
        return Picks;
    }());
    exports.Picks = Picks;
});

define('main/statistics/statistics',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Statistics = (function () {
        function Statistics() {
            this.message = "statistics";
        }
        return Statistics;
    }());
    exports.Statistics = Statistics;
});

define('main/winners/winners',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Winners = (function () {
        function Winners() {
        }
        return Winners;
    }());
    exports.Winners = Winners;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/picks/pickClient',["require", "exports", "aurelia-dependency-injection", "../../resources/services/restService", "aurelia-framework", "../../resources/services/authService"], function (require, exports, aurelia_dependency_injection_1, restService_1, aurelia_framework_1, authService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = aurelia_framework_1.LogManager.getLogger('pickClient');
    var PickClient = (function () {
        function PickClient(restService, authService) {
            this.serviceUrl = "https://ppppoolpicksservice.azurewebsites.net";
            this.restService = restService;
            this.authService = authService;
        }
        PickClient.prototype.getCurrentPickInfo = function (userId) {
            if (userId === void 0) { userId = null; }
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getGolfers", userId ? { userId: userId } : null, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        PickClient.prototype.getPickForCurrent = function (tournamentIndex) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getPicks", {
                                season: 'current', tour: 'PGA TOUR', tournamentIndex: tournamentIndex, user: 'true'
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        PickClient.prototype.pickGolfer = function (playerId, playerName) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/pickGolfer", {
                                tour: 'PGA TOUR', playerId: playerId, playerName: playerName
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        PickClient.prototype.emergencyPick = function (playerId, playerName, email, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/emergencyPick", {
                                tour: 'PGA TOUR', playerId: playerId, playerName: playerName, email: email, userId: userId
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2];
                    }
                });
            });
        };
        PickClient.prototype.getUsers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getUsers", null, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        PickClient.prototype.getPickSummary = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getPickSummary", {
                                season: 'current', tour: "PGA TOUR"
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        PickClient = __decorate([
            aurelia_dependency_injection_1.inject(restService_1.RestService, authService_1.AuthService),
            __metadata("design:paramtypes", [restService_1.RestService, authService_1.AuthService])
        ], PickClient);
        return PickClient;
    }());
    exports.PickClient = PickClient;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/picks/emergency-pick',["require", "exports", "aurelia-framework", "./pickClient"], function (require, exports, aurelia_framework_1, pickClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmergencyPickCustomElement = (function () {
        function EmergencyPickCustomElement(pc) {
            this.pickClient = pc;
        }
        EmergencyPickCustomElement.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4, this.pickClient.getUsers()];
                        case 1:
                            _a.profiles = _b.sent();
                            return [2];
                    }
                });
            });
        };
        EmergencyPickCustomElement.prototype.loadGolfers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.selectedProfile) {
                                return [2];
                            }
                            _a = this;
                            return [4, this.pickClient.getCurrentPickInfo()];
                        case 1:
                            _a.golfersDataForUser = _b.sent();
                            this.tournament = this.golfersDataForUser["Tournament"];
                            this.golfers = this.golfersDataForUser["Golfers"];
                            return [2];
                    }
                });
            });
        };
        EmergencyPickCustomElement.prototype.submit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.selectedProfile || !this.selectedGolfer) {
                                return [2];
                            }
                            return [4, this.pickClient.emergencyPick(this.selectedGolfer["TournamentPlayerId"], this.selectedGolfer["PlayerName"], this.selectedProfile["Email"], this.selectedProfile["UserId"])];
                        case 1:
                            response = _a.sent();
                            return [2];
                    }
                });
            });
        };
        EmergencyPickCustomElement = __decorate([
            aurelia_framework_1.inject(pickClient_1.PickClient),
            __metadata("design:paramtypes", [pickClient_1.PickClient])
        ], EmergencyPickCustomElement);
        return EmergencyPickCustomElement;
    }());
    exports.EmergencyPickCustomElement = EmergencyPickCustomElement;
});

define('microservices/picks/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            "./picks-main",
            "./emergency-pick",
            "./pick-summary"
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/picks/pick-summary',["require", "exports", "aurelia-framework", "./pickClient", "aurelia-framework"], function (require, exports, aurelia_framework_1, pickClient_1, aurelia_framework_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PickSummary = (function () {
        function PickSummary(pc) {
            this.search = '';
            this.golfer = '';
            this.pickClient = pc;
        }
        PickSummary.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4, this.pickClient.getPickSummary()];
                        case 1:
                            _a.picks = _b.sent();
                            this.pooliePicks = this.picks;
                            this.golferPicks = this.pooliePicks;
                            console.log(this.picks);
                            return [2];
                    }
                });
            });
        };
        PickSummary.prototype.searchChanged = function () {
            if (this.search === '') {
                this.pooliePicks = this.picks;
                this.golferPicks = this.pooliePicks;
            }
            else {
                this.pooliePicks = {};
                var names = Object.getOwnPropertyNames(this.picks);
                for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
                    var rawName = names_1[_i];
                    var name_1 = rawName.substr(0, rawName.indexOf(':'));
                    if (name_1.toLowerCase().includes(this.search.toLowerCase())) {
                        this.pooliePicks[rawName] = this.picks[rawName];
                    }
                }
                this.golferPicks = this.pooliePicks;
            }
            if (this.golfer === '') {
                return;
            }
            this.golferPicks = {};
            for (var property in this.pooliePicks) {
                if (this.pooliePicks.hasOwnProperty(property)) {
                    var golfers = this.pooliePicks[property];
                    for (var _a = 0, golfers_1 = golfers; _a < golfers_1.length; _a++) {
                        var player = golfers_1[_a];
                        if (player["PlayerName"].toLowerCase().includes(this.golfer.toLowerCase())) {
                            this.golferPicks[property] = this.pooliePicks[property];
                        }
                    }
                }
            }
        };
        PickSummary.prototype.golferChanged = function () {
            this.searchChanged();
        };
        __decorate([
            aurelia_framework_2.observable,
            __metadata("design:type", String)
        ], PickSummary.prototype, "search", void 0);
        __decorate([
            aurelia_framework_2.observable,
            __metadata("design:type", String)
        ], PickSummary.prototype, "golfer", void 0);
        PickSummary = __decorate([
            aurelia_framework_1.inject(pickClient_1.PickClient),
            __metadata("design:paramtypes", [pickClient_1.PickClient])
        ], PickSummary);
        return PickSummary;
    }());
    exports.PickSummary = PickSummary;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/picks/picks-main',["require", "exports", "aurelia-framework", "./pickClient"], function (require, exports, aurelia_framework_1, pickClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PicksMainCustomElement = (function () {
        function PicksMainCustomElement(pc) {
            this.submitting = false;
            this.pickClient = pc;
        }
        PicksMainCustomElement.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, pickData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.pickClient.getCurrentPickInfo()];
                        case 1:
                            data = _a.sent();
                            this.tournament = data["Tournament"];
                            this.golfers = data["Golfers"];
                            return [4, this.pickClient.getPickForCurrent(this.tournament["Index"])];
                        case 2:
                            pickData = _a.sent();
                            if (pickData["empty"]) {
                                this.pick = 'none';
                            }
                            else {
                                this.pick = pickData;
                            }
                            return [2];
                    }
                });
            });
        };
        PicksMainCustomElement.prototype.submitPick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response, pickData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.selectedPlayer) {
                                return [2];
                            }
                            this.submitting = true;
                            return [4, this.pickClient.pickGolfer(this.selectedPlayer["TournamentPlayerId"], this.selectedPlayer["PlayerName"])];
                        case 1:
                            response = _a.sent();
                            return [4, this.pickClient.getPickForCurrent(this.tournament["Index"])];
                        case 2:
                            pickData = _a.sent();
                            if (pickData["empty"]) {
                                this.pick = 'none';
                            }
                            else {
                                this.pick = pickData;
                            }
                            this.submitting = false;
                            return [2];
                    }
                });
            });
        };
        PicksMainCustomElement = __decorate([
            aurelia_framework_1.inject(pickClient_1.PickClient),
            __metadata("design:paramtypes", [pickClient_1.PickClient])
        ], PicksMainCustomElement);
        return PicksMainCustomElement;
    }());
    exports.PicksMainCustomElement = PicksMainCustomElement;
});

define('microservices/auth/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            "./login"
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/auth/login',["require", "exports", "aurelia-dependency-injection", "./authClient"], function (require, exports, aurelia_dependency_injection_1, authClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoginCustomElement = (function () {
        function LoginCustomElement(ac) {
            this.errorMessage = '';
            this.authClient = ac;
        }
        LoginCustomElement.prototype.login = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.errorMessage = "";
                            if (!this.userId || !this.password) {
                                return [2];
                            }
                            return [4, this.authClient.login(this.userId, this.password)];
                        case 1:
                            response = _a.sent();
                            if (!response) {
                                this.errorMessage = "Login failed";
                            }
                            return [2];
                    }
                });
            });
        };
        LoginCustomElement = __decorate([
            aurelia_dependency_injection_1.inject(authClient_1.AuthClient),
            __metadata("design:paramtypes", [authClient_1.AuthClient])
        ], LoginCustomElement);
        return LoginCustomElement;
    }());
    exports.LoginCustomElement = LoginCustomElement;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/stats/statsClient',["require", "exports", "aurelia-dependency-injection", "../../resources/services/restService", "aurelia-framework", "../../resources/services/authService"], function (require, exports, aurelia_dependency_injection_1, restService_1, aurelia_framework_1, authService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = aurelia_framework_1.LogManager.getLogger('statsClient');
    var StatsClient = (function () {
        function StatsClient(restService, authService) {
            this.serviceUrl = "https://ppppoolstatsservice.azurewebsites.net";
            this.restService = restService;
            this.authService = authService;
        }
        StatsClient.prototype.getTournamentStats = function (season, tour, key, value) {
            if (season === void 0) { season = 'current'; }
            if (tour === void 0) { tour = 'PGA TOUR'; }
            if (key === void 0) { key = 'current'; }
            if (value === void 0) { value = ''; }
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getTournament", {
                                season: season, tour: tour, key: key, value: value
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        StatsClient.prototype.getSpecificTournamentStats = function (index) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getTournament", {
                                season: 'current', tour: 'PGA TOUR', key: 'index', value: index
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        StatsClient.prototype.getSeasonStats = function (season, tour) {
            if (season === void 0) { season = 'current'; }
            if (tour === void 0) { tour = 'PGA TOUR'; }
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getSeason", {
                                season: season, tour: tour
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        StatsClient.prototype.getMonthlyStats = function (season, tour, key) {
            if (season === void 0) { season = 'current'; }
            if (tour === void 0) { tour = 'PGA TOUR'; }
            if (key === void 0) { key = 'user'; }
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getMonthly", {
                                season: season, tour: tour, key: key
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        StatsClient.prototype.getMajorsStats = function (season, tour) {
            if (season === void 0) { season = 'current'; }
            if (tour === void 0) { tour = 'PGA TOUR'; }
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post("https://ppppoolmajors.azurewebsites.net/api/GetMajors", {
                                season: season
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        StatsClient = __decorate([
            aurelia_dependency_injection_1.inject(restService_1.RestService, authService_1.AuthService),
            __metadata("design:paramtypes", [restService_1.RestService, authService_1.AuthService])
        ], StatsClient);
        return StatsClient;
    }());
    exports.StatsClient = StatsClient;
});

define('microservices/users/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            "./registration"
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/users/usersClient',["require", "exports", "aurelia-dependency-injection", "../../resources/services/restService", "aurelia-framework", "../../resources/services/authService"], function (require, exports, aurelia_dependency_injection_1, restService_1, aurelia_framework_1, authService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = aurelia_framework_1.LogManager.getLogger('pickClient');
    var UsersClient = (function () {
        function UsersClient(restService, authService) {
            this.serviceUrl = "https://ppppooluserservice.azurewebsites.net";
            this.restService = restService;
            this.authService = authService;
        }
        UsersClient.prototype.setProfile = function (profileData) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/setProfile", null, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            }, profileData)];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        UsersClient.prototype.getProfile = function (key, value) {
            if (key === void 0) { key = 'all'; }
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getProfile", {
                                key: key, value: value
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        UsersClient.prototype.getRegistration = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getRegistration", null, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        UsersClient = __decorate([
            aurelia_dependency_injection_1.inject(restService_1.RestService, authService_1.AuthService),
            __metadata("design:paramtypes", [restService_1.RestService, authService_1.AuthService])
        ], UsersClient);
        return UsersClient;
    }());
    exports.UsersClient = UsersClient;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/users/registration',["require", "exports", "aurelia-framework", "./usersClient"], function (require, exports, aurelia_framework_1, usersClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RegistrationCustomElement = (function () {
        function RegistrationCustomElement(uc) {
            this.usersClient = uc;
        }
        RegistrationCustomElement.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4, this.usersClient.getRegistration()];
                        case 1:
                            _a.registrations = _b.sent();
                            window.setTimeout(function () {
                                $('#regtable').dataTable(_this.getRegTableConfig());
                                $('input').addClass("form-control input-sm");
                            }, 1000);
                            return [2];
                    }
                });
            });
        };
        RegistrationCustomElement.prototype.getRegTableConfig = function () {
            return {
                columnDefs: [
                    { type: "string" },
                    { type: "string" },
                    { type: "num" }
                ],
                order: [[0, 'asc']],
                paging: false,
                info: false
            };
        };
        RegistrationCustomElement = __decorate([
            aurelia_framework_1.inject(usersClient_1.UsersClient),
            __metadata("design:paramtypes", [usersClient_1.UsersClient])
        ], RegistrationCustomElement);
        return RegistrationCustomElement;
    }());
    exports.RegistrationCustomElement = RegistrationCustomElement;
});

define('microservices/tournaments/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            "./tournament-selector"
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/tournaments/tournamentsClient',["require", "exports", "aurelia-dependency-injection", "../../resources/services/restService", "aurelia-framework", "../../resources/services/authService"], function (require, exports, aurelia_dependency_injection_1, restService_1, aurelia_framework_1, authService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = aurelia_framework_1.LogManager.getLogger('statsClient');
    var TournamentsClient = (function () {
        function TournamentsClient(restService, authService) {
            this.serviceUrl = "https://ppppooltournamentservice.azurewebsites.net";
            this.restService = restService;
            this.authService = authService;
        }
        TournamentsClient.prototype.getSeason = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/Season", {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        TournamentsClient.prototype.getTournaments = function (season, tour, key) {
            if (season === void 0) { season = 'current'; }
            if (tour === void 0) { tour = 'PGA TOUR'; }
            if (key === void 0) { key = "all"; }
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.restService.post(this.serviceUrl + "/api/getTournaments", {
                                season: season, tour: tour, key: key
                            }, {
                                Authorization: "Bearer " + this.authService.getWebToken().authToken
                            })];
                        case 1:
                            response = _a.sent();
                            return [2, response.Data];
                    }
                });
            });
        };
        TournamentsClient.prototype.getAvailableTournaments = function () {
            return __awaiter(this, void 0, void 0, function () {
                var tournaments, filtered, _i, tournaments_1, tournament;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getTournaments()];
                        case 1:
                            tournaments = _a.sent();
                            filtered = [];
                            for (_i = 0, tournaments_1 = tournaments; _i < tournaments_1.length; _i++) {
                                tournament = tournaments_1[_i];
                                if (tournament["Used"] && tournament["State"] != 'future') {
                                    filtered.push(tournament);
                                }
                            }
                            return [2, filtered];
                    }
                });
            });
        };
        TournamentsClient = __decorate([
            aurelia_dependency_injection_1.inject(restService_1.RestService, authService_1.AuthService),
            __metadata("design:paramtypes", [restService_1.RestService, authService_1.AuthService])
        ], TournamentsClient);
        return TournamentsClient;
    }());
    exports.TournamentsClient = TournamentsClient;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/tournaments/tournament-selector',["require", "exports", "aurelia-framework", "./tournamentsClient", "../../resources/services/eventService"], function (require, exports, aurelia_framework_1, tournamentsClient_1, eventService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TournamentSelector = (function () {
        function TournamentSelector(tournamentsClient, eventService) {
            this.tournamentsClient = tournamentsClient;
            this.eventService = eventService;
        }
        TournamentSelector.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4, this.tournamentsClient.getAvailableTournaments()];
                        case 1:
                            _a.tournaments = _b.sent();
                            return [2];
                    }
                });
            });
        };
        TournamentSelector.prototype.tournamentChanged = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.eventService.publish('tournamentChanged', this.selectedTournament);
                    return [2];
                });
            });
        };
        TournamentSelector = __decorate([
            aurelia_framework_1.inject(tournamentsClient_1.TournamentsClient, eventService_1.EventService),
            __metadata("design:paramtypes", [Object, Object])
        ], TournamentSelector);
        return TournamentSelector;
    }());
    exports.TournamentSelector = TournamentSelector;
});

define('resources/valueConverters/dateFormat',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateFormatValueConverter = (function () {
        function DateFormatValueConverter() {
        }
        DateFormatValueConverter.prototype.toView = function (value) {
            var date = new Date(value);
            var year = date.getFullYear();
            var month = this.getNumber(date.getMonth() + 1);
            var day = this.getNumber(date.getDate());
            return year + "-" + month + "-" + day;
        };
        DateFormatValueConverter.prototype.getNumber = function (number) {
            return ("0" + number).slice(-2);
        };
        return DateFormatValueConverter;
    }());
    exports.DateFormatValueConverter = DateFormatValueConverter;
});

define('resources/valueConverters/objectKeys',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjectKeysValueConverter = (function () {
        function ObjectKeysValueConverter() {
        }
        ObjectKeysValueConverter.prototype.toView = function (value) {
            if (!value) {
                return [''];
            }
            return Object.keys(value);
        };
        return ObjectKeysValueConverter;
    }());
    exports.ObjectKeysValueConverter = ObjectKeysValueConverter;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/stats/current/current-stats',["require", "exports", "aurelia-framework", "../statsClient", "../../../resources/services/eventService"], function (require, exports, aurelia_framework_1, statsClient_1, eventService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CurrentStatsCustomElement = (function () {
        function CurrentStatsCustomElement(sc, es) {
            var _this = this;
            this.tournament = null;
            this.course = {};
            this.golfers = [];
            this.poolies = [];
            this.statsClient = sc;
            this.eventService = es;
            this.eventService.subscribe('tournamentChanged', function (data) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(data);
                            this.tournament = null;
                            this.poolieTable.fnDestroy();
                            this.golferTable.fnDestroy();
                            if (!(data == 'Current')) return [3, 2];
                            return [4, this.getData()];
                        case 1:
                            _a.sent();
                            return [3, 4];
                        case 2:
                            if (!data) return [3, 4];
                            return [4, this.getData(data["Index"])];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            this.setupTables();
                            return [2];
                    }
                });
            }); });
        }
        CurrentStatsCustomElement.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getData()];
                        case 1:
                            _a.sent();
                            this.setupTables();
                            return [2];
                    }
                });
            });
        };
        CurrentStatsCustomElement.prototype.setupTables = function () {
            var _this = this;
            window.setTimeout(function () {
                _this.poolieTable = $('#pooliestable').dataTable(_this.getPooliesConfig());
                console.log(_this.poolieTable);
                _this.golferTable = $('#golferstable').dataTable(_this.getGolfersConfig());
                $('input').addClass("form-control input-sm");
            }, 1000);
        };
        CurrentStatsCustomElement.prototype.reSetupTables = function () {
            window.setTimeout(function () {
                $('#pooliestable').dataTable();
                $('#golferstable').dataTable();
                $('input').addClass("form-control input-sm");
            }, 1000);
        };
        CurrentStatsCustomElement.prototype.getData = function (index) {
            if (index === void 0) { index = null; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, points;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!index) return [3, 2];
                            _a = this;
                            return [4, this.statsClient.getSpecificTournamentStats(index)];
                        case 1:
                            _a.tournament = _c.sent();
                            return [3, 4];
                        case 2:
                            _b = this;
                            return [4, this.statsClient.getTournamentStats()];
                        case 3:
                            _b.tournament = _c.sent();
                            _c.label = 4;
                        case 4:
                            this.course = this.tournament["Course"];
                            this.poolies = this.tournament["Poolies"];
                            this.golfers = this.tournament["Golfers"];
                            points = [];
                            this.golfers.forEach(function (golfer) {
                                points.push(golfer.Points);
                            });
                            this.maxPoints = Math.max.apply(null, points);
                            return [2];
                    }
                });
            });
        };
        CurrentStatsCustomElement.prototype.padZeros = function (num, size) {
            var s = "000000000" + num;
            return s.substr(s.length - size);
        };
        CurrentStatsCustomElement.prototype.getPooliesConfig = function () {
            return {
                columnDefs: [
                    { type: "num" },
                    { type: "num" },
                    { type: "string" },
                    { type: "string" }
                ],
                order: [[1, 'asc']],
                paging: false,
                info: false
            };
        };
        CurrentStatsCustomElement.prototype.getGolfersConfig = function () {
            return {
                columnDefs: [
                    { type: "string", targets: [0] },
                    { type: "num", targets: [1] },
                    { type: "num", targets: [2], orderData: [3] },
                    { type: "num", targets: [3], visible: false, searchable: false },
                    { type: "num", targets: [4] },
                    { type: "num", targets: [5] },
                    { type: "num", targets: [6] }
                ],
                order: [[1, 'desc']],
                paging: false,
                info: false
            };
        };
        CurrentStatsCustomElement = __decorate([
            aurelia_framework_1.inject(statsClient_1.StatsClient, eventService_1.EventService),
            __metadata("design:paramtypes", [statsClient_1.StatsClient, eventService_1.EventService])
        ], CurrentStatsCustomElement);
        return CurrentStatsCustomElement;
    }());
    exports.CurrentStatsCustomElement = CurrentStatsCustomElement;
});

define('microservices/stats/current/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            './current-stats'
        ]);
    }
    exports.configure = configure;
});

define('microservices/stats/history/history-stats',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HistoryStatsCustomElement = (function () {
        function HistoryStatsCustomElement() {
        }
        return HistoryStatsCustomElement;
    }());
    exports.HistoryStatsCustomElement = HistoryStatsCustomElement;
});

define('microservices/stats/history/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            './history-stats'
        ]);
    }
    exports.configure = configure;
});

define('microservices/stats/majors/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            './majors-stats'
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/stats/majors/majors-stats',["require", "exports", "aurelia-framework", "../statsClient"], function (require, exports, aurelia_framework_1, statsClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MajorsStatsCustomElement = (function () {
        function MajorsStatsCustomElement(sc) {
            this.statsClient = sc;
        }
        MajorsStatsCustomElement.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getData()];
                        case 1:
                            _a.sent();
                            window.setTimeout(function () {
                                $('#majorstable').dataTable(_this.getTableConfig());
                                $('input').addClass("form-control input-sm");
                            }, 1000);
                            return [2];
                    }
                });
            });
        };
        MajorsStatsCustomElement.prototype.getData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.statsClient.getMajorsStats()];
                        case 1:
                            data = _a.sent();
                            this.week = data["Week"];
                            this.season = data["Season"];
                            this.tournamentName = data["Tournament"];
                            this.tournamentName = this.tournamentName.toLowerCase().startsWith("the ") ? this.tournamentName : "The " + this.tournamentName;
                            this.poolies = data["Poolies"];
                            this.getMaxValues();
                            return [2];
                    }
                });
            });
        };
        MajorsStatsCustomElement.prototype.getTableConfig = function () {
            return {
                columnDefs: [
                    { type: "num" },
                    { type: "num" },
                    { type: "string" },
                    { type: "num" },
                    { type: "num" },
                    { type: "num" },
                    { type: "num" },
                    { type: "num" },
                    { type: "num" },
                    { type: "num" }
                ],
                order: [[0, 'asc']],
                paging: false,
                info: false
            };
        };
        MajorsStatsCustomElement.prototype.getMaxValues = function () {
            var array = [];
            this.poolies.forEach(function (poolie) {
                if (poolie["Wins"]) {
                    array.push(poolie["Wins"]);
                }
            });
            this.maxWins = Math.max.apply(null, array);
            array = [];
            this.poolies.forEach(function (poolie) {
                if (poolie["Top5"]) {
                    array.push(poolie["Top5"]);
                }
            });
            this.maxTop5 = Math.max.apply(null, array);
            array = [];
            this.poolies.forEach(function (poolie) {
                if (poolie["Top10"]) {
                    array.push(poolie["Top10"]);
                }
            });
            this.maxTop10 = Math.max.apply(null, array);
            array = [];
            this.poolies.forEach(function (poolie) {
                if (poolie["Cuts"]) {
                    array.push(poolie["Cuts"]);
                }
            });
            this.maxCuts = Math.max.apply(null, array);
            array = [];
            this.poolies.forEach(function (poolie) {
                if (poolie["PlusMinus"]) {
                    array.push(poolie["PlusMinus"]);
                }
            });
            this.maxPlusMinus = Math.max.apply(null, array);
        };
        MajorsStatsCustomElement = __decorate([
            aurelia_framework_1.inject(statsClient_1.StatsClient),
            __metadata("design:paramtypes", [statsClient_1.StatsClient])
        ], MajorsStatsCustomElement);
        return MajorsStatsCustomElement;
    }());
    exports.MajorsStatsCustomElement = MajorsStatsCustomElement;
});

define('microservices/stats/monthly/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            './monthly-stats'
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/stats/monthly/monthly-stats',["require", "exports", "aurelia-framework", "../statsClient"], function (require, exports, aurelia_framework_1, statsClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MonthlyStatsCustomElement = (function () {
        function MonthlyStatsCustomElement(sc) {
            this.statsClient = sc;
        }
        MonthlyStatsCustomElement.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getData()];
                        case 1:
                            _a.sent();
                            window.setTimeout(function () {
                                $('#monthtable').dataTable(_this.getTableConfig());
                                $('input').addClass("form-control input-sm");
                            }, 1000);
                            return [2];
                    }
                });
            });
        };
        MonthlyStatsCustomElement.prototype.getData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.statsClient.getMonthlyStats()];
                        case 1:
                            data = _a.sent();
                            this.poolies = data;
                            this.currentMonth = this.poolies[0]["Points"].length;
                            this.monthNames = [];
                            for (i = 0; i < this.currentMonth; i++) {
                                this.monthNames.push(this.getMonthName(i + 1));
                            }
                            return [2];
                    }
                });
            });
        };
        MonthlyStatsCustomElement.prototype.getMonthName = function (month) {
            var strMonth = month > 9 ? "" + month : "0" + month;
            var date = new Date(strMonth + "/02/2000");
            var locale = 'en-us';
            return date.toLocaleString(locale, { month: "long" });
        };
        MonthlyStatsCustomElement.prototype.getTableConfig = function () {
            var columnDefs = [
                { type: 'string' },
                { type: 'num' }
            ];
            for (var i = 0; i < this.currentMonth; i++) {
                columnDefs.push({ type: 'num' });
            }
            return {
                columnDefs: columnDefs,
                order: [[1, 'desc']],
                paging: false,
                info: false
            };
        };
        MonthlyStatsCustomElement.prototype.getMonthNameLiteral = function (month) {
            switch (month) {
                case 0: return "Invalid";
                case 1: return 'January';
                case 2: return 'Februray';
                case 3: return 'March';
                case 4: return 'April';
                case 5: return 'May';
                case 6: return 'June';
                case 7: return 'July';
                case 8: return 'August';
                case 9: return 'September';
                case 10: return 'October';
                case 11: return 'November';
                case 12: return 'December';
                default:
                    return 'invalid';
            }
        };
        MonthlyStatsCustomElement = __decorate([
            aurelia_framework_1.inject(statsClient_1.StatsClient),
            __metadata("design:paramtypes", [statsClient_1.StatsClient])
        ], MonthlyStatsCustomElement);
        return MonthlyStatsCustomElement;
    }());
    exports.MonthlyStatsCustomElement = MonthlyStatsCustomElement;
});

define('microservices/stats/playoffs/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            './playoff-stats'
        ]);
    }
    exports.configure = configure;
});

define('microservices/stats/playoffs/playoff-stats',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PlayoffStatsCustomElement = (function () {
        function PlayoffStatsCustomElement() {
        }
        return PlayoffStatsCustomElement;
    }());
    exports.PlayoffStatsCustomElement = PlayoffStatsCustomElement;
});

define('microservices/stats/season/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            './season-stats'
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('microservices/stats/season/season-stats',["require", "exports", "aurelia-framework", "../statsClient"], function (require, exports, aurelia_framework_1, statsClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeasonStatsCustomElement = (function () {
        function SeasonStatsCustomElement(sc) {
            this.statsClient = sc;
        }
        SeasonStatsCustomElement.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getData()];
                        case 1:
                            _a.sent();
                            window.setTimeout(function () {
                                $('#seasontable').dataTable(_this.getTableConfig());
                                $('input').addClass("form-control input-sm");
                            }, 1000);
                            return [2];
                    }
                });
            });
        };
        SeasonStatsCustomElement.prototype.getData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.statsClient.getSeasonStats()];
                        case 1:
                            data = _a.sent();
                            this.week = data["Week"];
                            this.season = data["Season"];
                            this.tournamentName = data["Tournament"];
                            this.tournamentName = this.tournamentName.toLowerCase().startsWith("the ") ? this.tournamentName : "The " + this.tournamentName;
                            this.poolies = data["Poolies"];
                            this.getMaxValues();
                            return [2];
                    }
                });
            });
        };
        SeasonStatsCustomElement.prototype.getTableConfig = function () {
            return {
                columnDefs: [
                    { type: "num" },
                    { type: "num" },
                    { type: "string" },
                    { type: "num" },
                    { type: "num" },
                    { type: "num" },
                    { type: "num" },
                    { type: "num" },
                    { type: "num" },
                    { type: "num" }
                ],
                order: [[0, 'asc']],
                paging: false,
                info: false
            };
        };
        SeasonStatsCustomElement.prototype.getMaxValues = function () {
            var array = [];
            this.poolies.forEach(function (poolie) {
                if (poolie["Wins"]) {
                    array.push(poolie["Wins"]);
                }
            });
            this.maxWins = Math.max.apply(null, array);
            array = [];
            this.poolies.forEach(function (poolie) {
                if (poolie["Top5"]) {
                    array.push(poolie["Top5"]);
                }
            });
            this.maxTop5 = Math.max.apply(null, array);
            array = [];
            this.poolies.forEach(function (poolie) {
                if (poolie["Top10"]) {
                    array.push(poolie["Top10"]);
                }
            });
            this.maxTop10 = Math.max.apply(null, array);
            array = [];
            this.poolies.forEach(function (poolie) {
                if (poolie["Cuts"]) {
                    array.push(poolie["Cuts"]);
                }
            });
            this.maxCuts = Math.max.apply(null, array);
            array = [];
            this.poolies.forEach(function (poolie) {
                if (poolie["PlusMinus"]) {
                    array.push(poolie["PlusMinus"]);
                }
            });
            this.maxPlusMinus = Math.max.apply(null, array);
        };
        SeasonStatsCustomElement = __decorate([
            aurelia_framework_1.inject(statsClient_1.StatsClient),
            __metadata("design:paramtypes", [statsClient_1.StatsClient])
        ], SeasonStatsCustomElement);
        return SeasonStatsCustomElement;
    }());
    exports.SeasonStatsCustomElement = SeasonStatsCustomElement;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <shell></shell>\r\n  <!--<div class=\"col-sm-5\">\r\n    <div class=\"card-box\">\r\n      <pool-table data.bind=\"data\"></pool-table>\r\n    </div>\r\n  </div>-->\r\n</template>\r\n\r\n"; });
define('text!shell/top-bar.css', ['module'], function(module) { module.exports = "#topnav .top-bar-color {\r\n  background-color: #55bb22;\r\n}"; });
define('text!shell/nav-bar.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"navbar-custom\">\r\n    <div class=\"container\">\r\n      <div class=\"navigation\">\r\n        <ul class=\"navigation-menu\">\r\n          <li class=\"has-submenu ${currentRoute == 'statistics' ? 'active' : ''}\">\r\n            <a href=\"#\"><i class=\"glyphicon glyphicon-stats\" style=\"font-size: 15px\"></i>Statistics</a>\r\n          </li>\r\n          <li class=\"has-submenu ${currentRoute == 'picks' ? 'active' : ''}\">\r\n            <a href=\"/#/picks\"><i class=\"fa fa-heart\"></i>Picks</a>\r\n          </li>\r\n          <li class=\"has-submenu ${currentRoute == 'winners' ? 'active' : ''}\">\r\n            <a href=\"/#/winners\"><i class=\"fa fa-usd\"></i>Winners</a>\r\n          </li>         \r\n          <li class=\"has-submenu ${currentRoute == 'feedback' ? 'active' : ''}\">\r\n            <a href=\"/#/feedback\"><i class=\"fa fa-comments\"></i>Info</a>\r\n          </li>\r\n          <li if.bind=\"isAdmin\" class=\"has-submenu ${currentRoute == 'admin' ? 'active' : ''}\">\r\n            <a href=\"/#/admin\"><i class=\"fa fa-cog fa-spin\"></i>Admin</a>\r\n          </li>\r\n        </ul>\r\n        <ul class=\"navigation-menu pull-right\">\r\n          <li class=\"has-submenu\">\r\n            <a class=\"pull-right\" href=\"https://ppp-pga-pool.slack.com\" target=\"_blank\">Join us on Slack</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!resources/styles/datatablestyles.css', ['module'], function(module) { module.exports = "div.dataTables_length label {\r\n\tfont-weight: normal;\r\n\ttext-align: left;\r\n\twhite-space: nowrap;\r\n}\r\n\r\ndiv.dataTables_length select {\r\n\twidth: 75px;\r\n\tdisplay: inline-block;\r\n}\r\n\r\ndiv.dataTables_filter {\r\n\ttext-align: right;\r\n}\r\n\r\ndiv.dataTables_filter label {\r\n\tfont-weight: normal;\r\n\twhite-space: nowrap;\r\n\ttext-align: left;\r\n}\r\n\r\ndiv.dataTables_filter input {\r\n\tmargin-left: 0.5em;\r\n\tdisplay: inline-block;\r\n}\r\n\r\ndiv.dataTables_info {\r\n\tpadding-top: 8px;\r\n\twhite-space: nowrap;\r\n}\r\n\r\ndiv.dataTables_paginate {\r\n\tmargin: 0;\r\n\twhite-space: nowrap;\r\n\ttext-align: right;\r\n}\r\n\r\ndiv.dataTables_paginate ul.pagination {\r\n\tmargin: 2px 0;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n@media screen and (max-width: 767px) {\r\n\tdiv.dataTables_length,\r\n\tdiv.dataTables_filter,\r\n\tdiv.dataTables_info,\r\n\tdiv.dataTables_paginate {\r\n\t\ttext-align: center;\r\n\t}\r\n}\r\n\r\n\r\ntable.dataTable td,\r\ntable.dataTable th {\r\n\tbox-sizing: content-box;\r\n}\r\n\r\n\r\ntable.dataTable {\r\n\tclear: both;\r\n\tmargin-top: 6px !important;\r\n\tmargin-bottom: 6px !important;\r\n\tmax-width: none !important;\r\n}\r\n\r\ntable.dataTable thead .sorting,\r\ntable.dataTable thead .sorting_asc,\r\ntable.dataTable thead .sorting_desc,\r\ntable.dataTable thead .sorting_asc_disabled,\r\ntable.dataTable thead .sorting_desc_disabled {\r\n\tcursor: pointer;\r\n\tposition: relative;\r\n}\r\n\r\ntable.dataTable thead .sorting:after,\r\ntable.dataTable thead .sorting_asc:after,\r\ntable.dataTable thead .sorting_desc:after {\r\n\tposition: absolute;\r\n\ttop: 8px;\r\n\tright: 8px;\r\n\tdisplay: block;\r\n\tfont-family: 'Glyphicons Halflings Edit';\r\n\topacity: 0.5;\r\n}\r\ntable.dataTable thead .sorting:after {\r\n\topacity: 0.2;\r\n\tcontent: \"\\e150\"; /* sort */\r\n}\r\ntable.dataTable thead .sorting_asc:after {\r\n\tcontent: \"\\e155\"; /* sort-by-attributes */\r\n}\r\ntable.dataTable thead .sorting_desc:after {\r\n\tcontent: \"\\e156\"; /* sort-by-attributes-alt */\r\n}\r\n\r\ntable.dataTable thead .sorting_asc_disabled:after,\r\ntable.dataTable thead .sorting_desc_disabled:after {\r\n\tcolor: #eee;\r\n}\r\n\r\ntable.dataTable thead > tr > th {\r\n\tpadding-left: 8px;\r\n\tpadding-right: 30px;\r\n}\r\n\r\ntable.dataTable th:active {\r\n\toutline: none;\r\n}\r\n\r\n/* Scrolling */\r\ndiv.dataTables_scrollHead table {\r\n\tmargin-bottom: 0 !important;\r\n\tborder-bottom-left-radius: 0;\r\n\tborder-bottom-right-radius: 0;\r\n}\r\n\r\ndiv.dataTables_scrollHead table thead tr:last-child th:first-child,\r\ndiv.dataTables_scrollHead table thead tr:last-child td:first-child {\r\n\tborder-bottom-left-radius: 0 !important;\r\n\tborder-bottom-right-radius: 0 !important;\r\n}\r\n\r\ndiv.dataTables_scrollBody table {\r\n\tborder-top: none;\r\n\tmargin-top: 0 !important;\r\n\tmargin-bottom: 0 !important;\r\n}\r\n\r\ndiv.dataTables_scrollBody tbody tr:first-child th,\r\ndiv.dataTables_scrollBody tbody tr:first-child td {\r\n\tborder-top: none;\r\n}\r\n\r\ndiv.dataTables_scrollFoot table {\r\n\tmargin-top: 0 !important;\r\n\tborder-top: none;\r\n}\r\n\r\n/* Frustratingly the border-collapse:collapse used by Bootstrap makes the column\r\n   width calculations when using scrolling impossible to align columns. We have\r\n   to use separate\r\n */\r\ntable.table-bordered.dataTable {\r\n\tborder-collapse: separate !important;\r\n}\r\ntable.table-bordered thead th,\r\ntable.table-bordered thead td {\r\n\tborder-left-width: 0;\r\n\tborder-top-width: 0;\r\n}\r\ntable.table-bordered tbody th,\r\ntable.table-bordered tbody td {\r\n\tborder-left-width: 0;\r\n\tborder-bottom-width: 0;\r\n}\r\ntable.table-bordered th:last-child,\r\ntable.table-bordered td:last-child {\r\n\tborder-right-width: 0;\r\n}\r\ndiv.dataTables_scrollHead table.table-bordered {\r\n\tborder-bottom-width: 0;\r\n}\r\n\r\n\r\n\r\n\r\n/*\r\n * TableTools styles\r\n */\r\n.table.dataTable tbody tr.active td,\r\n.table.dataTable tbody tr.active th {\r\n\tbackground-color: #08C;\r\n\tcolor: white;\r\n}\r\n\r\n.table.dataTable tbody tr.active:hover td,\r\n.table.dataTable tbody tr.active:hover th {\r\n\tbackground-color: #0075b0 !important;\r\n}\r\n\r\n.table.dataTable tbody tr.active th > a,\r\n.table.dataTable tbody tr.active td > a {\r\n\tcolor: white;\r\n}\r\n\r\n.table-striped.dataTable tbody tr.active:nth-child(odd) td,\r\n.table-striped.dataTable tbody tr.active:nth-child(odd) th {\r\n\tbackground-color: #017ebc;\r\n}\r\n\r\ntable.DTTT_selectable tbody tr {\r\n\tcursor: pointer;\r\n}\r\n\r\ndiv.DTTT .btn:hover {\r\n\ttext-decoration: none !important;\r\n}\r\n\r\nul.DTTT_dropdown.dropdown-menu {\r\n  z-index: 2003;\r\n}\r\n\r\nul.DTTT_dropdown.dropdown-menu a {\r\n\tcolor: #333 !important; /* needed only when demo_page.css is included */\r\n}\r\n\r\nul.DTTT_dropdown.dropdown-menu li {\r\n\tposition: relative;\r\n}\r\n\r\nul.DTTT_dropdown.dropdown-menu li:hover a {\r\n\tbackground-color: #0088cc;\r\n\tcolor: white !important;\r\n}\r\n\r\ndiv.DTTT_collection_background {\r\n\tz-index: 2002;\t\r\n}\r\n\r\n/* TableTools information display */\r\ndiv.DTTT_print_info {\r\n\tposition: fixed;\r\n\ttop: 50%;\r\n\tleft: 50%;\r\n\twidth: 400px;\r\n\theight: 150px;\r\n\tmargin-left: -200px;\r\n\tmargin-top: -75px;\r\n\ttext-align: center;\r\n\tcolor: #333;\r\n\tpadding: 10px 30px;\r\n\topacity: 0.95;\r\n\r\n\tbackground-color: white;\r\n\tborder: 1px solid rgba(0, 0, 0, 0.2);\r\n\tborder-radius: 6px;\r\n\tbox-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);\r\n}\r\n\r\ndiv.DTTT_print_info h6 {\r\n\tfont-weight: normal;\r\n\tfont-size: 28px;\r\n\tline-height: 28px;\r\n\tmargin: 1em;\r\n}\r\n\r\ndiv.DTTT_print_info p {\r\n\tfont-size: 14px;\r\n\tline-height: 20px;\r\n}\r\n\r\ndiv.dataTables_processing {\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    width: 100%;\r\n    height: 60px;\r\n    margin-left: -50%;\r\n    margin-top: -25px;\r\n    padding-top: 20px;\r\n    padding-bottom: 20px;\r\n    text-align: center;\r\n    font-size: 1.2em;\r\n    background-color: white;\r\n    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,0.9) 75%, rgba(255,255,255,0) 100%);\r\n}\r\n\r\n\r\n\r\n/*\r\n * FixedColumns styles\r\n */\r\ndiv.DTFC_LeftHeadWrapper table,\r\ndiv.DTFC_LeftFootWrapper table,\r\ndiv.DTFC_RightHeadWrapper table,\r\ndiv.DTFC_RightFootWrapper table,\r\ntable.DTFC_Cloned tr.even {\r\n    background-color: white;\r\n    margin-bottom: 0;\r\n}\r\n \r\ndiv.DTFC_RightHeadWrapper table ,\r\ndiv.DTFC_LeftHeadWrapper table {\r\n\tborder-bottom: none !important;\r\n    margin-bottom: 0 !important;\r\n    border-top-right-radius: 0 !important;\r\n    border-bottom-left-radius: 0 !important;\r\n    border-bottom-right-radius: 0 !important;\r\n}\r\n \r\ndiv.DTFC_RightHeadWrapper table thead tr:last-child th:first-child,\r\ndiv.DTFC_RightHeadWrapper table thead tr:last-child td:first-child,\r\ndiv.DTFC_LeftHeadWrapper table thead tr:last-child th:first-child,\r\ndiv.DTFC_LeftHeadWrapper table thead tr:last-child td:first-child {\r\n    border-bottom-left-radius: 0 !important;\r\n    border-bottom-right-radius: 0 !important;\r\n}\r\n \r\ndiv.DTFC_RightBodyWrapper table,\r\ndiv.DTFC_LeftBodyWrapper table {\r\n    border-top: none;\r\n    margin: 0 !important;\r\n}\r\n \r\ndiv.DTFC_RightBodyWrapper tbody tr:first-child th,\r\ndiv.DTFC_RightBodyWrapper tbody tr:first-child td,\r\ndiv.DTFC_LeftBodyWrapper tbody tr:first-child th,\r\ndiv.DTFC_LeftBodyWrapper tbody tr:first-child td {\r\n    border-top: none;\r\n}\r\n \r\ndiv.DTFC_RightFootWrapper table,\r\ndiv.DTFC_LeftFootWrapper table {\r\n    border-top: none;\r\n    margin-top: 0 !important;\r\n}\r\n\r\n\r\n/*\r\n * FixedHeader styles\r\n */\r\ndiv.FixedHeader_Cloned table {\r\n\tmargin: 0 !important\r\n}\r\n"; });
define('text!shell/progress-bar.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"progress\" if.bind=\"show\">\r\n    <div class=\"progress-bar progress-bar-purple progress-bar-striped active\" \r\n      role=\"progressbar\" \r\n      aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\" \r\n      style=\"width: 100%\"></div>\r\n  </div>\r\n</template>"; });
define('text!resources/styles/iconfonts.css', ['module'], function(module) { module.exports = "@font-face {\r\n  font-family: 'Glyphicons Halflings Edit';\r\n\r\n  src: url('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot');\r\n  src: url('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff') format('woff'), url('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');\r\n}\r\n\r\n.glyphicon {\r\n  position: relative;\r\n  top: 1px;\r\n  display: inline-block;\r\n  font-family: 'Glyphicons Halflings Edit' !important;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'FontAwesome Edit';\r\n  src: url('src/resources/styles/minton/fonts/fontawesome-webfont.eot?v=4.5.0');\r\n  src: url('src/resources/styles/minton/fonts/fontawesome-webfont.eot?#iefix&v=4.5.0') format('embedded-opentype'), url('src/resources/styles/minton/fonts/fontawesome-webfont.woff2?v=4.5.0') format('woff2'), url('src/resources/styles/minton/fonts/fontawesome-webfont.woff?v=4.5.0') format('woff'), url('src/resources/styles/minton/fonts/fontawesome-webfont.ttf?v=4.5.0') format('truetype'), url('src/resources/styles/minton/fonts/fontawesome-webfont.svg?v=4.5.0#fontawesomeregular') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n.fa {\r\n  display: inline-block;\r\n  font: normal normal normal 14px/1 FontAwesome Edit !important;\r\n  font-size: inherit;\r\n  text-rendering: auto;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Material Design Iconic Font Edit';\r\n  src: url('src/resources/styles/minton/fonts/Material-Design-Iconic-Font.eot?v=1.0.1');\r\n  src: url('src/resources/styles/minton/fonts/Material-Design-Iconic-Font.eot?#iefix&v=1.0.1') format('embedded-opentype'), url('src/resources/styles/minton/fonts/Material-Design-Iconic-Font.ttf?v=1.0.1') format('truetype'), url('src/resources/styles/minton/fonts/Material-Design-Iconic-Font.svg?v=1.0.1#Material-Design-Iconic-Font') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n\r\n.md {\r\n  font: normal normal normal 14px/1 'Material Design Iconic Font Edit' !important;\r\n}"; });
define('text!shell/shell.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./top-bar\"></require>\r\n  <require from=\"./nav-bar\"></require>\r\n  <require from=\"./progress-bar\"></require>\r\n  <header id=\"topnav\">\r\n    <top-bar></top-bar>\r\n    <nav-bar if.bind=\"loggedIn\"></nav-bar>\r\n    <progress-bar></progress-bar>\r\n  </header>\r\n  <div class=\"wrapper container\">\r\n    <router-view if.bind=\"loggedIn\"></router-view>\r\n    <login if.bind=\"!loggedIn\"></login>\r\n  </div>\r\n</template>"; });
define('text!microservices/stats/current/current-stats-styles.css', ['module'], function(module) { module.exports = ".table-green {\r\n  color: #00bb00;\r\n}\r\n\r\n.table-red {\r\n  color: #cc0000;\r\n}\r\n\r\n.table-grey {\r\n  color: #aaaaaa;\r\n}\r\n\r\n.form-control {\r\n  \r\n  width: 75%;\r\n\ttransition: none;\r\n}"; });
define('text!shell/top-bar.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./top-bar.css\"></require>\r\n  <div class=\"topbar-main top-bar-color\">\r\n    <div class=\"container\">\r\n      <div class=\"logo nav navbar-nav\">\r\n        <ul class=\"nav navbar-nav\">\r\n          <li><a href=\"#\"><span>${title}</span></a></li>\r\n        </ul>\r\n      </div>\r\n      <div if.bind=\"loggedIn\">\r\n        <ul class=\"nav navbar-nav navbar-right pull-right\">\r\n          <li><a href=\"/#/settings\"><i class=\"fa fa-cog\" css=\"${currentRoute === 'settings' ? 'color:black;' : ''}\"></i></a></li>\r\n          <li><a href=\"/#/user/:id\"><span class=\"fa fa-user\" css=\"${currentRoute.includes('user/') ? 'color:black;' : ''}\"></span></a></li>\r\n          <li><a href=\"#\"><span class=\"glyphicon glyphicon-log-out\" title=\"Logout\" click.trigger=\"logout()\"></span></a></li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>  \r\n</template>"; });
define('text!microservices/stats/majors/majors-stats-styles.css', ['module'], function(module) { module.exports = ".table-green {\n  color: #00bb00;\n}\n\n.table-red {\n  color: #cc0000;\n}\n\n.table-grey {\n  color: #aaaaaa;\n}\n\n.form-control {\n  \n  width: 75%;\n\ttransition: none;\n}\n"; });
define('text!main/admin/admin.html', ['module'], function(module) { module.exports = "<template>\r\n  <ul class=\"nav nav-pills m-b-30\">\r\n      <li class=\"active\"><a data-toggle=\"pill\" href=\"#registration\" aria-expanded=\"true\"><h4>Registration</h4></a></li>\r\n      <li><a data-toggle=\"pill\" href=\"#emergency\" aria-expanded=\"true\"><h4>Emergency Pick</h4></a></li>\r\n      <li><a data-toggle=\"pill\" href=\"#invite\" aria-expanded=\"true\"><h4>Invite User</h4></a></li>\r\n  </ul>\r\n  <div class=\"tab-content br-n pn\">\r\n    <div id=\"registration\" class=\"tab-pane fade in active\">\r\n      <registration></registration>\r\n    </div>\r\n    <div id=\"emergency\" class=\"tab-pane fade\">\r\n      <emergency-pick></emergency-pick>\r\n    </div>\r\n    <div id=\"invite\" class=\"tab-pane fade\">\r\n      <p>Invite User</p>\r\n    </div>      \r\n  </div>  \r\n</template>"; });
define('text!microservices/stats/season/season-stats-styles.css', ['module'], function(module) { module.exports = ".table-green {\r\n  color: #00bb00;\r\n}\r\n\r\n.table-red {\r\n  color: #cc0000;\r\n}\r\n\r\n.table-grey {\r\n  color: #aaaaaa;\r\n}\r\n\r\n.form-control {\r\n  \r\n  width: 75%;\r\n\ttransition: none;\r\n}"; });
define('text!main/feedback/feedback.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-5\">\r\n      <h2>PPP PGA Golf Pool Info</h2>\r\n      <div class=\"panel panel-border panel-primary\">\r\n        <div class=\"panel-heading\">\r\n          <h3 class=\"panel-title\">Under construction...</h3>\r\n        </div>\r\n        <div class=\"panel-body\">\r\n          <p>This is where we'll put important announcements, etc.</p>\r\n          <p>Feedback can be left in the pool Slack community in the #webiste_issues_ideas channel.</p>\r\n          <p class=\"pull-right\">- Michael</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!resources/styles/minton/css/components.css', ['module'], function(module) { module.exports = "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);\r\n@import url(https://fonts.googleapis.com/css?family=Poppins:500,600);\r\n@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:600,400,700);\r\n/* ===========\r\n   Components List\r\n\r\n   - Buttons\r\n   - Panels\r\n   - Portlets\r\n   - Checkbox and radio\r\n   - Progressbars\r\n   - Carousel\r\n   - Tables\r\n   - Form Elements\r\n   - Calendar\r\n   - Widgets\r\n =============*/\r\n/* ===========\r\n   Buttons\r\n =============*/\r\n.btn {\r\n  border-radius: 2px;\r\n  padding: 6px 14px;\r\n}\r\n.btn-group-lg > .btn,\r\n.btn-lg {\r\n  padding: 10px 16px !important;\r\n  font-size: 16px;\r\n}\r\n.btn-group-sm > .btn,\r\n.btn-sm {\r\n  padding: 5px 10px !important;\r\n}\r\n.btn-group-xs > .btn,\r\n.btn-xs {\r\n  padding: 1px 5px !important;\r\n}\r\n.btn-group .btn + .btn,\r\n.btn-group .btn + .btn-group,\r\n.btn-group .btn-group + .btn,\r\n.btn-group .btn-group + .btn-group {\r\n  margin-left: 0px;\r\n}\r\n.btn-group.open .dropdown-toggle {\r\n  box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.1) inset;\r\n}\r\n.btn-primary,\r\n.btn-success,\r\n.btn-info,\r\n.btn-warning,\r\n.btn-danger,\r\n.btn-inverse,\r\n.btn-purple,\r\n.btn-pink {\r\n  color: #ffffff !important;\r\n}\r\n.btn-default {\r\n  background-color: #dae6ec;\r\n  border-color: #dae6ec;\r\n}\r\n.btn-default:focus {\r\n  background-color: #dae6ec;\r\n  border-color: #C2CED4;\r\n}\r\n.btn-default:hover {\r\n  background-color: #dae6ec;\r\n  border-color: #C2CED4;\r\n}\r\n.btn-default:active {\r\n  background-color: #dae6ec;\r\n  border-color: #C2CED4;\r\n}\r\n.btn-default.active,\r\n.btn-default:active,\r\n.open > .dropdown-toggle.btn-default {\r\n  background-color: #dae6ec !important;\r\n  border-color: #C2CED4 !important;\r\n}\r\n.btn-primary {\r\n  background-color: #3bafda !important;\r\n  border: 1px solid #3bafda !important;\r\n}\r\n.btn-primary:hover,\r\n.btn-primary:focus,\r\n.btn-primary:active,\r\n.btn-primary.active,\r\n.btn-primary.focus,\r\n.btn-primary:active,\r\n.btn-primary:focus,\r\n.btn-primary:hover,\r\n.open > .dropdown-toggle.btn-primary {\r\n  background-color: #28a5d4 !important;\r\n  border: 1px solid #28a5d4 !important;\r\n}\r\n.btn-success {\r\n  background-color: #00b19d !important;\r\n  border: 1px solid #00b19d !important;\r\n}\r\n.btn-success:hover,\r\n.btn-success:focus,\r\n.btn-success:active,\r\n.btn-success.active,\r\n.btn-success.focus,\r\n.btn-success:active,\r\n.btn-success:focus,\r\n.btn-success:hover,\r\n.open > .dropdown-toggle.btn-success {\r\n  background-color: #009886 !important;\r\n  border: 1px solid #009886 !important;\r\n}\r\n.btn-info {\r\n  background-color: #3ddcf7 !important;\r\n  border: 1px solid #3ddcf7 !important;\r\n}\r\n.btn-info:hover,\r\n.btn-info:focus,\r\n.btn-info:active,\r\n.btn-info.active,\r\n.btn-info.focus,\r\n.btn-info:active,\r\n.btn-info:focus,\r\n.btn-info:hover,\r\n.open > .dropdown-toggle.btn-info {\r\n  background-color: #25d8f6 !important;\r\n  border: 1px solid #25d8f6 !important;\r\n}\r\n.btn-warning {\r\n  background-color: #ffaa00 !important;\r\n  border: 1px solid #ffaa00 !important;\r\n}\r\n.btn-warning:hover,\r\n.btn-warning:focus,\r\n.btn-warning:active,\r\n.btn-warning.active,\r\n.btn-warning.focus,\r\n.btn-warning:active,\r\n.btn-warning:focus,\r\n.btn-warning:hover,\r\n.open > .dropdown-toggle.btn-warning {\r\n  background-color: #e69900 !important;\r\n  border: 1px solid #e69900 !important;\r\n}\r\n.btn-danger {\r\n  background-color: #ef5350 !important;\r\n  border: 1px solid #ef5350 !important;\r\n}\r\n.btn-danger:active,\r\n.btn-danger:focus,\r\n.btn-danger:hover,\r\n.btn-danger.active,\r\n.btn-danger.focus,\r\n.btn-danger:active,\r\n.btn-danger:focus,\r\n.btn-danger:hover,\r\n.open > .dropdown-toggle.btn-danger {\r\n  background-color: #ed3c39 !important;\r\n  border: 1px solid #ed3c39 !important;\r\n}\r\n.btn-inverse {\r\n  background-color: #4c5667 !important;\r\n  border: 1px solid #4c5667 !important;\r\n}\r\n.btn-inverse:hover,\r\n.btn-inverse:focus,\r\n.btn-inverse:active,\r\n.btn-inverse.active,\r\n.btn-inverse.focus,\r\n.btn-inverse:active,\r\n.btn-inverse:focus,\r\n.btn-inverse:hover,\r\n.open > .dropdown-toggle.btn-inverse {\r\n  background-color: #414a58 !important;\r\n  border: 1px solid #414a58 !important;\r\n}\r\n.btn-purple {\r\n  background-color: #7266ba !important;\r\n  border: 1px solid #7266ba !important;\r\n}\r\n.btn-purple:hover,\r\n.btn-purple:focus,\r\n.btn-purple:active {\r\n  background-color: #6254b2 !important;\r\n  border: 1px solid #6254b2 !important;\r\n}\r\n.btn-pink {\r\n  background-color: #f76397 !important;\r\n  border: 1px solid #f76397 !important;\r\n}\r\n.btn-pink:hover,\r\n.btn-pink:focus,\r\n.btn-pink:active {\r\n  background-color: #f64b87 !important;\r\n  border: 1px solid #f64b87 !important;\r\n}\r\n.btn-custom {\r\n  border-bottom: 3px solid transparent;\r\n}\r\n.btn-custom.btn-default {\r\n  background-color: #dae6ec;\r\n  border-bottom: 2px solid #a4b6bf !important;\r\n}\r\n.btn-custom.btn-primary {\r\n  border-bottom: 2px solid #2494be !important;\r\n}\r\n.btn-custom.btn-success {\r\n  border-bottom: 2px solid #007e70 !important;\r\n}\r\n.btn-custom.btn-info {\r\n  border-bottom: 2px solid #08aac6 !important;\r\n}\r\n.btn-custom.btn-warning {\r\n  border-bottom: 2px solid #cc8800 !important;\r\n}\r\n.btn-custom.btn-danger {\r\n  border-bottom: 2px solid #c71612 !important;\r\n}\r\n.btn-custom.btn-inverse {\r\n  border-bottom: 2px solid #21252c !important;\r\n}\r\n.btn-custom.btn-purple {\r\n  border-bottom: 2px solid #443a80 !important;\r\n}\r\n.btn-custom.btn-pink {\r\n  border-bottom: 2px solid #e80c59 !important;\r\n}\r\n.btn-rounded {\r\n  border-radius: 2em;\r\n  padding: 6px 18px;\r\n}\r\n.fileupload {\r\n  overflow: hidden;\r\n  position: relative;\r\n}\r\n.fileupload input.upload {\r\n  cursor: pointer;\r\n  filter: alpha(opacity=0);\r\n  font-size: 20px;\r\n  margin: 0;\r\n  opacity: 0;\r\n  padding: 0;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n}\r\n/* ===========\r\n   Panels\r\n =============*/\r\n.panel {\r\n  border-radius: 0;\r\n  margin-bottom: 20px;\r\n  background-color: #323b44;\r\n  border: 2px solid rgba(238, 238, 238, 0.1);\r\n  border-top: none;\r\n}\r\n.panel .panel-body {\r\n  padding: 20px;\r\n  color: rgba(255, 255, 255, 0.6);\r\n}\r\n.panel .panel-body p {\r\n  margin: 0px;\r\n}\r\n.panel .panel-body p + p {\r\n  margin-top: 15px;\r\n}\r\n.panel-heading {\r\n  border-radius: 0;\r\n  border: none !important;\r\n  padding: 10px 20px;\r\n  margin: 0 -2px;\r\n}\r\n.panel-default > .panel-heading {\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n  border-bottom: none;\r\n}\r\n.panel-title {\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  margin-bottom: 0;\r\n  margin-top: 0;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.03em;\r\n  color: #ffffff;\r\n}\r\n.panel-sub-title {\r\n  margin-bottom: 3px;\r\n  color: rgba(255, 255, 255, 0.6) !important;\r\n  margin-top: -3px;\r\n}\r\n.panel-footer {\r\n  background: transparent;\r\n  border-top: 1px solid rgba(238, 238, 238, 0.2);\r\n}\r\n.panel-color .panel-title {\r\n  color: #ffffff;\r\n}\r\n.panel-primary > .panel-heading {\r\n  background-color: #3bafda;\r\n}\r\n.panel-success > .panel-heading {\r\n  background-color: #00b19d;\r\n}\r\n.panel-info > .panel-heading {\r\n  background-color: #3ddcf7;\r\n}\r\n.panel-warning > .panel-heading {\r\n  background-color: #ffaa00;\r\n}\r\n.panel-danger > .panel-heading {\r\n  background-color: #ef5350;\r\n}\r\n.panel-purple > .panel-heading {\r\n  background-color: #7266ba;\r\n}\r\n.panel-pink > .panel-heading {\r\n  background-color: #f76397;\r\n}\r\n.panel-inverse > .panel-heading {\r\n  background-color: #4c5667;\r\n}\r\n.panel-border {\r\n  border-radius: 3px;\r\n}\r\n.panel-border .panel-heading {\r\n  background-color: transparent;\r\n  border-top: 3px solid #ccc !important;\r\n  border-radius: 3px;\r\n  padding: 10px 20px 0px;\r\n}\r\n.panel-border .panel-body {\r\n  padding: 15px 20px 20px 20px;\r\n}\r\n.panel-border.panel-primary .panel-heading {\r\n  border-color: #3bafda !important;\r\n  color: #3bafda !important;\r\n}\r\n.panel-border.panel-success .panel-heading {\r\n  border-color: #00b19d !important;\r\n  color: #00b19d !important;\r\n}\r\n.panel-border.panel-info .panel-heading {\r\n  border-color: #3ddcf7 !important;\r\n  color: #3ddcf7 !important;\r\n}\r\n.panel-border.panel-warning .panel-heading {\r\n  border-color: #ffaa00 !important;\r\n  color: #ffaa00 !important;\r\n}\r\n.panel-border.panel-danger .panel-heading {\r\n  border-color: #ef5350 !important;\r\n  color: #ef5350 !important;\r\n}\r\n.panel-border.panel-purple .panel-heading {\r\n  border-color: #7266ba !important;\r\n  color: #7266ba !important;\r\n}\r\n.panel-border.panel-pink .panel-heading {\r\n  border-color: #f76397 !important;\r\n  color: #f76397 !important;\r\n}\r\n.panel-border.panel-inverse .panel-heading {\r\n  border-color: #4c5667 !important;\r\n  color: #4c5667 !important;\r\n}\r\n.panel-group .panel .panel-heading a[data-toggle=collapse].collapsed:before {\r\n  content: '\\f067';\r\n}\r\n.panel-group .panel .panel-heading .accordion-toggle.collapsed:before {\r\n  content: '\\f067';\r\n}\r\n.panel-group .panel .panel-heading a[data-toggle=collapse] {\r\n  display: block;\r\n}\r\n.panel-group .panel .panel-heading a[data-toggle=collapse]:before {\r\n  content: '\\f068';\r\n  display: block;\r\n  float: right;\r\n  font-family: 'FontAwesome';\r\n  font-size: 14px;\r\n  text-align: right;\r\n  width: 25px;\r\n}\r\n.panel-group .panel .panel-heading .accordion-toggle {\r\n  display: block;\r\n}\r\n.panel-group .panel .panel-heading .accordion-toggle:before {\r\n  content: '\\f068';\r\n  display: block;\r\n  float: right;\r\n  font-family: 'FontAwesome';\r\n  font-size: 14px;\r\n  text-align: right;\r\n  width: 25px;\r\n}\r\n.panel-group .panel .panel-heading + .panel-collapse .panel-body {\r\n  border-top: none;\r\n}\r\n.panel-group .panel-heading {\r\n  padding: 12px 26px;\r\n}\r\n.panel-group.panel-group-joined .panel + .panel {\r\n  border-top: 1px solid rgba(255, 255, 255, 0.3);\r\n  margin-top: 0;\r\n}\r\n.panel-group-joined .panel-group .panel + .panel {\r\n  border-top: 1px solid #eeeeee;\r\n  margin-top: 0;\r\n}\r\n/* ===========\r\n   Portlets\r\n =============*/\r\n.portlet {\r\n  border: 2px solid rgba(238, 238, 238, 0.1);\r\n  -moz-transition: all 0.4s;\r\n  -o-transition: all 0.4s;\r\n  -webkit-transition: all 0.4s;\r\n  margin-bottom: 20px;\r\n  transition: all 0.4s;\r\n}\r\n.portlet .portlet-heading {\r\n  border-radius: 3px;\r\n  color: #ffffff;\r\n  padding: 12px 20px;\r\n  margin: -1px;\r\n}\r\n.portlet .portlet-heading .portlet-title {\r\n  color: #ffffff;\r\n  float: left;\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  margin-bottom: 0;\r\n  margin-top: 0;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.03em;\r\n}\r\n.portlet .portlet-heading .portlet-widgets {\r\n  display: inline-block;\r\n  float: right;\r\n  font-size: 15px;\r\n  line-height: 30px;\r\n  padding-left: 15px;\r\n  position: relative;\r\n  text-align: right;\r\n}\r\n.portlet .portlet-heading .portlet-widgets .divider {\r\n  margin: 0 5px;\r\n}\r\n.portlet .portlet-heading a {\r\n  color: #999999;\r\n}\r\n.portlet .portlet-body {\r\n  -moz-border-radius-bottomleft: 5px;\r\n  -moz-border-radius-bottomright: 5px;\r\n  -webkit-border-bottom-left-radius: 5px;\r\n  -webkit-border-bottom-right-radius: 5px;\r\n  border-bottom-left-radius: 5px;\r\n  border-bottom-right-radius: 5px;\r\n  padding: 15px;\r\n  color: #98a6ad;\r\n}\r\n.portlet .portlet-heading .portlet-widgets .collapsed .ion-minus-round:before {\r\n  content: \"\\f217\" !important;\r\n}\r\n.portlet .portlet-heading.bg-purple a,\r\n.portlet .portlet-heading.bg-info a,\r\n.portlet .portlet-heading.bg-success a,\r\n.portlet .portlet-heading.bg-primary a,\r\n.portlet .portlet-heading.bg-danger a,\r\n.portlet .portlet-heading.bg-warning a,\r\n.portlet .portlet-heading.bg-inverse a,\r\n.portlet .portlet-heading.bg-pink a {\r\n  color: #ffffff;\r\n}\r\n.panel-disabled {\r\n  background: rgba(238, 238, 238, 0.2);\r\n  cursor: progress;\r\n  bottom: 20px;\r\n  left: 10px;\r\n  position: absolute;\r\n  right: 10px;\r\n  top: 0;\r\n}\r\n.loader-1 {\r\n  width: 30px;\r\n  height: 30px;\r\n  background-color: #3bafda;\r\n  border-radius: 3px;\r\n  -moz-border-radius: 3px;\r\n  background-clip: padding-box;\r\n  animation: sk-rotateplane 1.2s infinite ease-in-out;\r\n  position: absolute;\r\n  left: 50%;\r\n  top: 50%;\r\n  margin-left: -15px;\r\n  margin-top: -15px;\r\n}\r\n@keyframes sk-rotateplane {\r\n  0% {\r\n    transform: perspective(120px) rotateX(0deg) rotateY(0deg);\r\n    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\r\n  }\r\n  50% {\r\n    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\r\n    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\r\n  }\r\n  100% {\r\n    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\r\n    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\r\n  }\r\n}\r\n/* ===========\r\n   Checkbox and Radio\r\n =============*/\r\n.checkbox {\r\n  padding-left: 20px;\r\n}\r\n.checkbox label {\r\n  display: inline-block;\r\n  padding-left: 5px;\r\n  position: relative;\r\n}\r\n.checkbox label::before {\r\n  -o-transition: 0.3s ease-in-out;\r\n  -webkit-transition: 0.3s ease-in-out;\r\n  background-color: transparent;\r\n  border-radius: 3px;\r\n  border: 2px solid #98a6ad;\r\n  content: \"\";\r\n  display: inline-block;\r\n  height: 17px;\r\n  left: 0;\r\n  margin-left: -20px;\r\n  position: absolute;\r\n  transition: 0.3s ease-in-out;\r\n  width: 17px;\r\n  outline: none !important;\r\n}\r\n.checkbox label::after {\r\n  color: #eeeeee;\r\n  display: inline-block;\r\n  font-size: 11px;\r\n  height: 16px;\r\n  left: 0;\r\n  margin-left: -20px;\r\n  padding-left: 3px;\r\n  padding-top: 1px;\r\n  position: absolute;\r\n  top: 0;\r\n  width: 16px;\r\n}\r\n.checkbox input[type=\"checkbox\"] {\r\n  cursor: pointer;\r\n  opacity: 0;\r\n  z-index: 1;\r\n  outline: none !important;\r\n}\r\n.checkbox input[type=\"checkbox\"]:disabled + label {\r\n  opacity: 0.65;\r\n}\r\n.checkbox input[type=\"checkbox\"]:focus + label::before {\r\n  outline-offset: -2px;\r\n  outline: none;\r\n}\r\n.checkbox input[type=\"checkbox\"]:checked + label::after {\r\n  content: \"\\f00c\";\r\n  font-family: 'FontAwesome';\r\n}\r\n.checkbox input[type=\"checkbox\"]:disabled + label::before {\r\n  background-color: #eeeeee;\r\n  cursor: not-allowed;\r\n}\r\n.checkbox.checkbox-circle label::before {\r\n  border-radius: 50%;\r\n}\r\n.checkbox.checkbox-inline {\r\n  margin-top: 0;\r\n}\r\n.checkbox.checkbox-single label {\r\n  height: 17px;\r\n}\r\n.checkbox-primary input[type=\"checkbox\"]:checked + label::before {\r\n  background-color: #3bafda;\r\n  border-color: #3bafda;\r\n}\r\n.checkbox-primary input[type=\"checkbox\"]:checked + label::after {\r\n  color: #ffffff;\r\n}\r\n.checkbox-danger input[type=\"checkbox\"]:checked + label::before {\r\n  background-color: #ef5350;\r\n  border-color: #ef5350;\r\n}\r\n.checkbox-danger input[type=\"checkbox\"]:checked + label::after {\r\n  color: #ffffff;\r\n}\r\n.checkbox-info input[type=\"checkbox\"]:checked + label::before {\r\n  background-color: #3ddcf7;\r\n  border-color: #3ddcf7;\r\n}\r\n.checkbox-info input[type=\"checkbox\"]:checked + label::after {\r\n  color: #ffffff;\r\n}\r\n.checkbox-warning input[type=\"checkbox\"]:checked + label::before {\r\n  background-color: #ffaa00;\r\n  border-color: #ffaa00;\r\n}\r\n.checkbox-warning input[type=\"checkbox\"]:checked + label::after {\r\n  color: #ffffff;\r\n}\r\n.checkbox-success input[type=\"checkbox\"]:checked + label::before {\r\n  background-color: #00b19d;\r\n  border-color: #00b19d;\r\n}\r\n.checkbox-success input[type=\"checkbox\"]:checked + label::after {\r\n  color: #ffffff;\r\n}\r\n.checkbox-purple input[type=\"checkbox\"]:checked + label::before {\r\n  background-color: #7266ba;\r\n  border-color: #7266ba;\r\n}\r\n.checkbox-purple input[type=\"checkbox\"]:checked + label::after {\r\n  color: #ffffff;\r\n}\r\n.checkbox-pink input[type=\"checkbox\"]:checked + label::before {\r\n  background-color: #f76397;\r\n  border-color: #f76397;\r\n}\r\n.checkbox-pink input[type=\"checkbox\"]:checked + label::after {\r\n  color: #ffffff;\r\n}\r\n.checkbox-inverse input[type=\"checkbox\"]:checked + label::before {\r\n  background-color: #4c5667;\r\n  border-color: #4c5667;\r\n}\r\n.checkbox-inverse input[type=\"checkbox\"]:checked + label::after {\r\n  color: #ffffff;\r\n}\r\n.radio {\r\n  padding-left: 20px;\r\n}\r\n.radio label {\r\n  display: inline-block;\r\n  padding-left: 5px;\r\n  position: relative;\r\n}\r\n.radio label::before {\r\n  -o-transition: border 0.5s ease-in-out;\r\n  -webkit-transition: border 0.5s ease-in-out;\r\n  background-color: transparent;\r\n  border-radius: 50%;\r\n  border: 2px solid #98a6ad;\r\n  content: \"\";\r\n  display: inline-block;\r\n  height: 17px;\r\n  left: 0;\r\n  margin-left: -20px;\r\n  outline: none !important;\r\n  position: absolute;\r\n  transition: border 0.5s ease-in-out;\r\n  width: 17px;\r\n}\r\n.radio label::after {\r\n  -moz-transition: -moz-transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);\r\n  -ms-transform: scale(0, 0);\r\n  -o-transform: scale(0, 0);\r\n  -o-transition: -o-transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);\r\n  -webkit-transform: scale(0, 0);\r\n  -webkit-transition: -webkit-transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);\r\n  background-color: #98a6ad;\r\n  border-radius: 50%;\r\n  content: \" \";\r\n  display: inline-block;\r\n  height: 11px;\r\n  left: 3px;\r\n  margin-left: -20px;\r\n  position: absolute;\r\n  top: 3px;\r\n  transform: scale(0, 0);\r\n  transition: transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);\r\n  width: 11px;\r\n}\r\n.radio input[type=\"radio\"] {\r\n  cursor: pointer;\r\n  opacity: 0;\r\n  z-index: 1;\r\n  outline: none !important;\r\n}\r\n.radio input[type=\"radio\"]:disabled + label {\r\n  opacity: 0.65;\r\n}\r\n.radio input[type=\"radio\"]:focus + label::before {\r\n  outline-offset: -2px;\r\n  outline: 5px auto -webkit-focus-ring-color;\r\n  outline: thin dotted;\r\n}\r\n.radio input[type=\"radio\"]:checked + label::after {\r\n  transform: scale(1, 1);\r\n}\r\n.radio input[type=\"radio\"]:disabled + label::before {\r\n  cursor: not-allowed;\r\n}\r\n.radio.radio-inline {\r\n  margin-top: 0;\r\n}\r\n.radio.radio-single label {\r\n  height: 17px;\r\n}\r\n.radio-primary input[type=\"radio\"] + label::after {\r\n  background-color: #3bafda;\r\n}\r\n.radio-primary input[type=\"radio\"]:checked + label::before {\r\n  border-color: #3bafda;\r\n}\r\n.radio-primary input[type=\"radio\"]:checked + label::after {\r\n  background-color: #3bafda;\r\n}\r\n.radio-danger input[type=\"radio\"] + label::after {\r\n  background-color: #ef5350;\r\n}\r\n.radio-danger input[type=\"radio\"]:checked + label::before {\r\n  border-color: #ef5350;\r\n}\r\n.radio-danger input[type=\"radio\"]:checked + label::after {\r\n  background-color: #ef5350;\r\n}\r\n.radio-info input[type=\"radio\"] + label::after {\r\n  background-color: #3ddcf7;\r\n}\r\n.radio-info input[type=\"radio\"]:checked + label::before {\r\n  border-color: #3ddcf7;\r\n}\r\n.radio-info input[type=\"radio\"]:checked + label::after {\r\n  background-color: #3ddcf7;\r\n}\r\n.radio-warning input[type=\"radio\"] + label::after {\r\n  background-color: #ffaa00;\r\n}\r\n.radio-warning input[type=\"radio\"]:checked + label::before {\r\n  border-color: #ffaa00;\r\n}\r\n.radio-warning input[type=\"radio\"]:checked + label::after {\r\n  background-color: #ffaa00;\r\n}\r\n.radio-success input[type=\"radio\"] + label::after {\r\n  background-color: #00b19d;\r\n}\r\n.radio-success input[type=\"radio\"]:checked + label::before {\r\n  border-color: #00b19d;\r\n}\r\n.radio-success input[type=\"radio\"]:checked + label::after {\r\n  background-color: #00b19d;\r\n}\r\n.radio-purple input[type=\"radio\"] + label::after {\r\n  background-color: #7266ba;\r\n}\r\n.radio-purple input[type=\"radio\"]:checked + label::before {\r\n  border-color: #7266ba;\r\n}\r\n.radio-purple input[type=\"radio\"]:checked + label::after {\r\n  background-color: #7266ba;\r\n}\r\n.radio-pink input[type=\"radio\"] + label::after {\r\n  background-color: #f76397;\r\n}\r\n.radio-pink input[type=\"radio\"]:checked + label::before {\r\n  border-color: #f76397;\r\n}\r\n.radio-pink input[type=\"radio\"]:checked + label::after {\r\n  background-color: #f76397;\r\n}\r\n.radio-inverse input[type=\"radio\"] + label::after {\r\n  background-color: #4c5667;\r\n}\r\n.radio-inverse input[type=\"radio\"]:checked + label::before {\r\n  border-color: #4c5667;\r\n}\r\n.radio-inverse input[type=\"radio\"]:checked + label::after {\r\n  background-color: #4c5667;\r\n}\r\n/* ===========\r\n   Progressbars\r\n =============*/\r\n.progress {\r\n  -webkit-box-shadow: none !important;\r\n  background-color: rgba(152, 166, 173, 0.4);\r\n  box-shadow: none !important;\r\n  height: 10px;\r\n  margin-bottom: 18px;\r\n  overflow: hidden;\r\n}\r\n.progress-bar {\r\n  box-shadow: none;\r\n  font-size: 8px;\r\n  font-weight: 600;\r\n  line-height: 12px;\r\n}\r\n.progress.progress-sm {\r\n  height: 5px !important;\r\n}\r\n.progress.progress-sm .progress-bar {\r\n  font-size: 8px;\r\n  line-height: 5px;\r\n}\r\n.progress.progress-md {\r\n  height: 15px !important;\r\n}\r\n.progress.progress-md .progress-bar {\r\n  font-size: 10.8px;\r\n  line-height: 14.4px;\r\n}\r\n.progress.progress-lg {\r\n  height: 20px !important;\r\n}\r\n.progress.progress-lg .progress-bar {\r\n  font-size: 12px;\r\n  line-height: 20px;\r\n}\r\n.progress-bar-primary {\r\n  background-color: #3bafda;\r\n}\r\n.progress-bar-success {\r\n  background-color: #00b19d;\r\n}\r\n.progress-bar-info {\r\n  background-color: #3ddcf7;\r\n}\r\n.progress-bar-warning {\r\n  background-color: #ffaa00;\r\n}\r\n.progress-bar-danger {\r\n  background-color: #ef5350;\r\n}\r\n.progress-bar-inverse {\r\n  background-color: #4c5667;\r\n}\r\n.progress-bar-purple {\r\n  background-color: #7266ba;\r\n}\r\n.progress-bar-pink {\r\n  background-color: #f76397;\r\n}\r\n.progress-animated {\r\n  -webkit-animation-duration: 5s;\r\n  -webkit-animation-name: animationProgress;\r\n  -webkit-transition: 5s all;\r\n  animation-duration: 5s;\r\n  animation-name: animationProgress;\r\n  transition: 5s all;\r\n}\r\n/* ===========\r\n   Carousel\r\n =============*/\r\n.carousel-control {\r\n  width: 10%;\r\n}\r\n.carousel-control span {\r\n  position: absolute;\r\n  top: 50%;\r\n  /* pushes the icon in the middle of the height */\r\n  z-index: 5;\r\n  display: inline-block;\r\n  font-size: 30px;\r\n}\r\n.carousel-indicators li {\r\n  border: 2px solid #ffffff;\r\n}\r\n/* ===========\r\n   Tables\r\n =============*/\r\n.table {\r\n  margin-bottom: 10px;\r\n}\r\ntbody {\r\n  color: rgba(255, 255, 255, 0.4);\r\n}\r\nth {\r\n  color: rgba(255, 255, 255, 0.7);\r\n  font-size: 15px;\r\n  font-weight: 500;\r\n}\r\n.table > tbody > tr > td,\r\n.table > tbody > tr > th,\r\n.table > tfoot > tr > td,\r\n.table > tfoot > tr > th,\r\n.table > thead > tr > td,\r\n.table > thead > tr > th {\r\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\r\n}\r\n.table > thead > tr > th {\r\n  border-bottom: 2px solid rgba(255, 255, 255, 0.1);\r\n}\r\n.table-hover > tbody > tr:hover {\r\n  background-color: #323b44;\r\n}\r\n.table-striped > tbody > tr:nth-of-type(odd),\r\n.table-hover > tbody > tr:hover,\r\n.table > thead > tr > td.active,\r\n.table > tbody > tr > td.active,\r\n.table > tfoot > tr > td.active,\r\n.table > thead > tr > th.active,\r\n.table > tbody > tr > th.active,\r\n.table > tfoot > tr > th.active,\r\n.table > thead > tr.active > td,\r\n.table > tbody > tr.active > td,\r\n.table > tfoot > tr.active > td,\r\n.table > thead > tr.active > th,\r\n.table > tbody > tr.active > th,\r\n.table > tfoot > tr.active > th {\r\n  background-color: #323b44 !important;\r\n}\r\n.table > tbody > tr.success > td,\r\n.table > tbody > tr.success > th,\r\n.table > tbody > tr > td.success,\r\n.table > tbody > tr > th.success,\r\n.table > tfoot > tr.success > td,\r\n.table > tfoot > tr.success > th,\r\n.table > tfoot > tr > td.success,\r\n.table > tfoot > tr > th.success,\r\n.table > thead > tr.success > td,\r\n.table > thead > tr.success > th,\r\n.table > thead > tr > td.success,\r\n.table > thead > tr > th.success {\r\n  background-color: rgba(0, 177, 157, 0.15);\r\n}\r\n.table > tbody > tr.info > td,\r\n.table > tbody > tr.info > th,\r\n.table > tbody > tr > td.info,\r\n.table > tbody > tr > th.info,\r\n.table > tfoot > tr.info > td,\r\n.table > tfoot > tr.info > th,\r\n.table > tfoot > tr > td.info,\r\n.table > tfoot > tr > th.info,\r\n.table > thead > tr.info > td,\r\n.table > thead > tr.info > th,\r\n.table > thead > tr > td.info,\r\n.table > thead > tr > th.info {\r\n  background-color: rgba(61, 220, 247, 0.15);\r\n}\r\n.table > tbody > tr.warning > td,\r\n.table > tbody > tr.warning > th,\r\n.table > tbody > tr > td.warning,\r\n.table > tbody > tr > th.warning,\r\n.table > tfoot > tr.warning > td,\r\n.table > tfoot > tr.warning > th,\r\n.table > tfoot > tr > td.warning,\r\n.table > tfoot > tr > th.warning,\r\n.table > thead > tr.warning > td,\r\n.table > thead > tr.warning > th,\r\n.table > thead > tr > td.warning,\r\n.table > thead > tr > th.warning {\r\n  background-color: rgba(255, 170, 0, 0.15);\r\n}\r\n.table > tbody > tr.danger > td,\r\n.table > tbody > tr.danger > th,\r\n.table > tbody > tr > td.danger,\r\n.table > tbody > tr > th.danger,\r\n.table > tfoot > tr.danger > td,\r\n.table > tfoot > tr.danger > th,\r\n.table > tfoot > tr > td.danger,\r\n.table > tfoot > tr > th.danger,\r\n.table > thead > tr.danger > td,\r\n.table > thead > tr.danger > th,\r\n.table > thead > tr > td.danger,\r\n.table > thead > tr > th.danger {\r\n  background-color: rgba(239, 83, 80, 0.15);\r\n}\r\n.table-bordered {\r\n  border: 1px solid rgba(238, 238, 238, 0.3);\r\n}\r\n.table-striped > tbody > tr:nth-of-type(odd) {\r\n  background-color: #323b44;\r\n}\r\n.table-bordered > thead > tr > th,\r\n.table-bordered > tbody > tr > th,\r\n.table-bordered > tfoot > tr > th,\r\n.table-bordered > thead > tr > td,\r\n.table-bordered > tbody > tr > td,\r\n.table-bordered > tfoot > tr > td {\r\n  border: 1px solid rgba(255, 255, 255, 0.2);\r\n}\r\n.modal-block {\r\n  background: transparent;\r\n  margin: 40px auto;\r\n  max-width: 600px;\r\n  padding: 0;\r\n  position: relative;\r\n  text-align: left;\r\n}\r\n/* Data table */\r\n#datatable-editable .actions a {\r\n  padding: 5px;\r\n}\r\n#datatable-editable .form-control {\r\n  background-color: transparent;\r\n  width: 100%;\r\n}\r\n#datatable-editable .fa-trash-o {\r\n  color: #ef5350;\r\n}\r\n#datatable-editable .fa-times {\r\n  color: #ef5350;\r\n}\r\n#datatable-editable .fa-pencil {\r\n  color: #29b6f6;\r\n}\r\n#datatable-editable .fa-save {\r\n  color: #33b86c;\r\n}\r\n#datatable td {\r\n  font-weight: normal;\r\n}\r\ndiv.dataTables_paginate ul.pagination {\r\n  margin-top: 30px;\r\n}\r\ndiv.dataTables_info {\r\n  padding-top: 38px;\r\n}\r\n.dt-buttons {\r\n  float: left;\r\n}\r\ndiv#datatable-buttons_info {\r\n  float: left;\r\n}\r\n/* Fixed Header */\r\n.fixedHeader-floating {\r\n  top: 70px !important;\r\n}\r\n/* Key table */\r\ntable.dataTable th.focus,\r\ntable.dataTable td.focus {\r\n  outline: 3px solid #3bafda !important;\r\n  outline-offset: -1px;\r\n}\r\n.fixedHeader-floating {\r\n  border: none !important;\r\n}\r\n.fixedHeader-floating .sorting,\r\n.fixedHeader-floating .sorting_asc {\r\n  background-color: #323b44;\r\n  border-color: rgba(238, 238, 238, 0.3);\r\n}\r\ndiv.DTS tbody tr.even {\r\n  background-color: #272e35;\r\n}\r\ndiv.DTS div.dataTables_scrollBody {\r\n  background: none !important;\r\n}\r\n/* Responsive table */\r\n.table-rep-plugin .table-responsive {\r\n  border: none !important;\r\n}\r\n.table-rep-plugin .dropdown-menu li.checkbox-row {\r\n  color: #ffffff !important;\r\n  background-color: transparent !important;\r\n}\r\n.table-rep-plugin tbody th {\r\n  font-size: 14px;\r\n  font-weight: normal;\r\n}\r\n.table-rep-plugin .checkbox-row {\r\n  padding-left: 40px;\r\n}\r\n.table-rep-plugin .checkbox-row label {\r\n  display: inline-block;\r\n  padding-left: 5px;\r\n  position: relative;\r\n}\r\n.table-rep-plugin .checkbox-row label::before {\r\n  -o-transition: 0.3s ease-in-out;\r\n  -webkit-transition: 0.3s ease-in-out;\r\n  background-color: #ffffff;\r\n  border-radius: 3px;\r\n  border: 1px solid #cccccc;\r\n  content: \"\";\r\n  display: inline-block;\r\n  height: 17px;\r\n  left: 0;\r\n  margin-left: -20px;\r\n  position: absolute;\r\n  transition: 0.3s ease-in-out;\r\n  width: 17px;\r\n  outline: none !important;\r\n}\r\n.table-rep-plugin .checkbox-row label::after {\r\n  color: #555555;\r\n  display: inline-block;\r\n  font-size: 11px;\r\n  height: 16px;\r\n  left: 0;\r\n  margin-left: -20px;\r\n  padding-left: 3px;\r\n  padding-top: 1px;\r\n  position: absolute;\r\n  top: -1px;\r\n  width: 16px;\r\n}\r\n.table-rep-plugin .checkbox-row input[type=\"checkbox\"] {\r\n  cursor: pointer;\r\n  opacity: 0;\r\n  z-index: 1;\r\n  outline: none !important;\r\n}\r\n.table-rep-plugin .checkbox-row input[type=\"checkbox\"]:disabled + label {\r\n  opacity: 0.65;\r\n}\r\n.table-rep-plugin .checkbox-row input[type=\"checkbox\"]:focus + label::before {\r\n  outline-offset: -2px;\r\n  outline: none;\r\n}\r\n.table-rep-plugin .checkbox-row input[type=\"checkbox\"]:checked + label::after {\r\n  content: \"\\f00c\";\r\n  font-family: 'FontAwesome';\r\n}\r\n.table-rep-plugin .checkbox-row input[type=\"checkbox\"]:disabled + label::before {\r\n  background-color: #eeeeee;\r\n  cursor: not-allowed;\r\n}\r\n.table-rep-plugin .checkbox-row input[type=\"checkbox\"]:checked + label::before {\r\n  background-color: #3bafda;\r\n  border-color: #3bafda;\r\n}\r\n.table-rep-plugin .checkbox-row input[type=\"checkbox\"]:checked + label::after {\r\n  color: #ffffff;\r\n}\r\n/* Tablesaw */\r\n.tablesaw thead {\r\n  background: rgba(255, 255, 255, 0.05);\r\n  background-image: none;\r\n  border: none;\r\n}\r\n.tablesaw thead th {\r\n  text-shadow: none;\r\n  letter-spacing: 0.06em;\r\n  color: rgba(255, 255, 255, 0.7) !important;\r\n}\r\n.tablesaw thead tr:first-child th {\r\n  padding-top: 1.1em;\r\n  padding-bottom: 0.9em;\r\n  font-weight: 600;\r\n  font-family: inherit;\r\n  border: none;\r\n}\r\n.tablesaw td,\r\n.tablesaw tbody th {\r\n  font-size: inherit;\r\n  line-height: inherit;\r\n  padding: 10px !important;\r\n}\r\n.tablesaw-stack tbody tr,\r\n.tablesaw tbody tr {\r\n  border-bottom: none;\r\n}\r\n.tablesaw-swipe .tablesaw-cell-persist {\r\n  border-right: 1px solid rgba(255, 255, 255, 0.1);\r\n}\r\n.tablesaw-sortable .tablesaw-sortable-head.tablesaw-sortable-ascending button:after,\r\n.tablesaw-sortable .tablesaw-sortable-head.tablesaw-sortable-descending button:after {\r\n  font-family: FontAwesome;\r\n  font-size: 10px;\r\n}\r\n.tablesaw-sortable .tablesaw-sortable-head.tablesaw-sortable-ascending button:after {\r\n  content: \"\\f176\";\r\n}\r\n.tablesaw-sortable .tablesaw-sortable-head.tablesaw-sortable-descending button:after {\r\n  content: \"\\f175\";\r\n}\r\n.tablesaw-bar .btn-select.btn-small:after,\r\n.tablesaw-bar .btn-select.btn-micro:after {\r\n  font-size: 8px;\r\n  padding-right: 10px;\r\n}\r\n.tablesaw-swipe .tablesaw-cell-persist {\r\n  box-shadow: none;\r\n}\r\n.tablesaw-enhanced .tablesaw-bar .btn {\r\n  text-shadow: none;\r\n  background-image: none;\r\n  color: rgba(255, 255, 255, 0.7) !important;\r\n}\r\n.tablesaw-enhanced .tablesaw-bar .btn.btn-select:hover {\r\n  background: transparent;\r\n}\r\n.tablesaw-enhanced .tablesaw-bar .btn:hover,\r\n.tablesaw-enhanced .tablesaw-bar .btn:focus,\r\n.tablesaw-enhanced .tablesaw-bar .btn:active {\r\n  color: #3bafda !important;\r\n  background-color: #f5f5f5;\r\n  outline: none !important;\r\n  box-shadow: none !important;\r\n  background-image: none;\r\n}\r\n/* Footable */\r\n.footable-odd {\r\n  background-color: #2e363e;\r\n}\r\n/* Responsive table */\r\ntable.focus-on tbody tr.unfocused th,\r\ntable.focus-on tbody tr.unfocused td {\r\n  color: rgba(255, 255, 255, 0.25);\r\n}\r\ntable.focus-on tbody tr.focused th {\r\n  background-color: #3bafda;\r\n  color: #ffffff;\r\n}\r\ntable.focus-on tbody tr.focused td {\r\n  background-color: #3bafda;\r\n  color: #ffffff;\r\n}\r\n.table-rep-plugin .sticky-table-header.fixed-solution {\r\n  top: 70px !important;\r\n  background-color: #272e35;\r\n  border: 0;\r\n}\r\n/* =============\r\n     Form elements\r\n  ============= */\r\n.error {\r\n  color: #ef5350;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n}\r\n.parsley-error {\r\n  border-color: #ef5350 !important;\r\n}\r\n.parsley-errors-list {\r\n  display: none;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n.parsley-errors-list.filled {\r\n  display: block;\r\n}\r\n.parsley-errors-list > li {\r\n  font-size: 12px;\r\n  list-style: none;\r\n  color: #f6504d;\r\n}\r\n/* Datepicker */\r\n.datepicker {\r\n  padding: 8px;\r\n}\r\n.datepicker th {\r\n  font-size: 14px !important;\r\n}\r\n.datepicker table tr td.today,\r\n.datepicker table tr td.today:hover,\r\n.datepicker table tr td.today.disabled,\r\n.datepicker table tr td.today.disabled:hover,\r\n.datepicker table tr td.selected,\r\n.datepicker table tr td.selected:hover,\r\n.datepicker table tr td.selected.disabled,\r\n.datepicker table tr td.selected.disabled:hover,\r\n.datepicker table tr td span.active,\r\n.datepicker table tr td span.active:hover,\r\n.datepicker table tr td span.active.disabled,\r\n.datepicker table tr td span.active.disabled:hover {\r\n  background-image: none;\r\n}\r\n.datepicker table tr td span.active:hover,\r\n.datepicker table tr td span.active:hover:hover,\r\n.datepicker table tr td span.active.disabled:hover,\r\n.datepicker table tr td span.active.disabled:hover:hover,\r\n.datepicker table tr td span.active:active,\r\n.datepicker table tr td span.active:hover:active,\r\n.datepicker table tr td span.active.disabled:active,\r\n.datepicker table tr td span.active.disabled:hover:active,\r\n.datepicker table tr td span.active.active,\r\n.datepicker table tr td span.active:hover.active,\r\n.datepicker table tr td span.active.disabled.active,\r\n.datepicker table tr td span.active.disabled:hover.active,\r\n.datepicker table tr td span.active.disabled,\r\n.datepicker table tr td span.active:hover.disabled,\r\n.datepicker table tr td span.active.disabled.disabled,\r\n.datepicker table tr td span.active.disabled:hover.disabled,\r\n.datepicker table tr td span.active[disabled],\r\n.datepicker table tr td span.active:hover[disabled],\r\n.datepicker table tr td span.active.disabled[disabled],\r\n.datepicker table tr td span.active.disabled:hover[disabled] {\r\n  background-color: #3bafda;\r\n}\r\n.datepicker table tr td.active,\r\n.datepicker table tr td.active:hover,\r\n.datepicker table tr td.active.disabled,\r\n.datepicker table tr td.active.disabled:hover {\r\n  background-color: #3bafda !important;\r\n  background-image: none;\r\n  box-shadow: none;\r\n  text-shadow: none;\r\n}\r\n.datepicker thead tr:first-child th:hover,\r\n.datepicker tfoot tr th:hover {\r\n  background-color: #1c2127;\r\n}\r\n.datepicker-inline {\r\n  border: 2px solid rgba(238, 238, 238, 0.3);\r\n}\r\n.daterangepicker td.active,\r\n.daterangepicker td.active:hover {\r\n  background-color: #3bafda;\r\n  border-color: #3bafda;\r\n}\r\n.daterangepicker .input-mini.active {\r\n  border: 1px solid #AAAAAA;\r\n}\r\n.daterangepicker .ranges li {\r\n  border-radius: 2px;\r\n  -moz-border-radius: 2px;\r\n  background-clip: padding-box;\r\n  color: #98a6ad;\r\n  font-weight: 600;\r\n  font-size: 12px;\r\n  border-color: #323b44;\r\n  background-color: #323b44;\r\n}\r\n.daterangepicker select.hourselect,\r\n.daterangepicker select.minuteselect,\r\n.daterangepicker select.secondselect,\r\n.daterangepicker select.ampmselect {\r\n  border: 1px solid #e3e3e3;\r\n  padding: 2px;\r\n  width: 60px;\r\n}\r\n.daterangepicker .ranges li.active,\r\n.daterangepicker .ranges li:hover {\r\n  background-color: #3bafda;\r\n  border: 1px solid #3bafda;\r\n}\r\n.search-input {\r\n  margin-bottom: 10px;\r\n}\r\n.ms-selectable {\r\n  box-shadow: none;\r\n  outline: none !important;\r\n}\r\n.ms-container .ms-list.ms-focus {\r\n  box-shadow: none;\r\n}\r\n.ms-container .ms-selectable li.ms-hover {\r\n  background-color: #3bafda;\r\n}\r\n.ms-container .ms-selection li.ms-hover {\r\n  background-color: #3bafda;\r\n}\r\n.note-editor {\r\n  border: 2px solid rgba(255, 255, 255, 0.2);\r\n  position: relative;\r\n  color: #98a6ad;\r\n}\r\n.note-editor .note-toolbar {\r\n  background-color: transparent;\r\n  border-bottom: 1px solid #eeeeee;\r\n  margin: 0;\r\n}\r\n.note-editor .note-statusbar {\r\n  background-color: transparent;\r\n}\r\n.note-editor .note-statusbar .note-resizebar {\r\n  border-top: none;\r\n  height: 15px;\r\n  padding-top: 3px;\r\n}\r\n.note-editor .note-editing-area .note-editable {\r\n  background: transparent;\r\n  color: #98a6ad;\r\n}\r\n.note-popover .popover .popover-content .note-color .dropdown-menu .btn-group .note-palette-title,\r\n.panel-heading.note-toolbar .note-color .dropdown-menu .btn-group .note-palette-title,\r\n.note-popover .popover .popover-content .note-color .dropdown-menu .btn-group .note-color-reset,\r\n.panel-heading.note-toolbar .note-color .dropdown-menu .btn-group .note-color-reset {\r\n  color: #323b44;\r\n}\r\n.note-popover .popover .popover-content {\r\n  padding: 5px 0 10px 5px;\r\n}\r\n.note-toolbar {\r\n  padding: 5px 0 10px 5px;\r\n}\r\n/* Timepicker */\r\n.bootstrap-timepicker-widget table td a:hover {\r\n  background-color: transparent;\r\n  border-color: transparent;\r\n  border-radius: 4px;\r\n  color: #3bafda;\r\n  text-decoration: none;\r\n}\r\n.editor-horizontal .popover-content {\r\n  padding: 9px 30px;\r\n}\r\n.datepicker table tr td.active,\r\n.datepicker table tr td.active:hover,\r\n.datepicker table tr td.active.disabled,\r\n.datepicker table tr td.active.disabled:hover {\r\n  background-color: #3bafda !important;\r\n  background-image: none;\r\n  box-shadow: none;\r\n}\r\n/* Dropzone */\r\n.dropzone {\r\n  min-height: 230px;\r\n  border: 2px dashed rgba(255, 255, 255, 0.2);\r\n  background: transparent;\r\n  border-radius: 6px;\r\n}\r\n.dropzone .dz-message {\r\n  font-size: 30px;\r\n}\r\n/* =============\r\n   Calendar\r\n============= */\r\n.calendar {\r\n  float: left;\r\n  margin-bottom: 0px;\r\n}\r\n.fc-view {\r\n  margin-top: 30px;\r\n}\r\n.none-border .modal-footer {\r\n  border-top: none;\r\n}\r\n.fc-toolbar {\r\n  margin-bottom: 5px;\r\n  margin-top: 15px;\r\n}\r\n.fc-toolbar h2 {\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n  line-height: 30px;\r\n  text-transform: uppercase;\r\n}\r\n.fc-day {\r\n  background: transparent;\r\n}\r\n.fc-toolbar .fc-state-active,\r\n.fc-toolbar .ui-state-active,\r\n.fc-toolbar button:focus,\r\n.fc-toolbar button:hover,\r\n.fc-toolbar .ui-state-hover {\r\n  z-index: 0;\r\n}\r\n.fc-widget-header {\r\n  border: 1px solid #f5f5f5;\r\n}\r\n.fc-widget-content {\r\n  border: 1px solid #f5f5f5;\r\n}\r\n.fc th.fc-widget-header {\r\n  background: rgba(255, 255, 255, 0.2);\r\n  font-size: 14px;\r\n  line-height: 20px;\r\n  padding: 10px 0px;\r\n  text-transform: uppercase;\r\n}\r\n.fc-unthemed th,\r\n.fc-unthemed td,\r\n.fc-unthemed thead,\r\n.fc-unthemed tbody,\r\n.fc-unthemed .fc-divider,\r\n.fc-unthemed .fc-row,\r\n.fc-unthemed .fc-popover {\r\n  background-color: transparent;\r\n  border-color: rgba(255, 255, 255, 0.1);\r\n}\r\n.fc-button {\r\n  background: #ffffff;\r\n  border: 1px solid #f5f5f5;\r\n  color: #555555;\r\n  text-transform: capitalize;\r\n}\r\n.fc-text-arrow {\r\n  font-family: inherit;\r\n  font-size: 16px;\r\n}\r\n.fc-state-hover {\r\n  background: #F5F5F5;\r\n}\r\n.fc-state-highlight {\r\n  background: #f0f0f0;\r\n}\r\n.fc-cell-overlay {\r\n  background: #f0f0f0;\r\n}\r\n.fc-unthemed .fc-today {\r\n  background: transparent;\r\n}\r\n.fc-event {\r\n  border-radius: 2px;\r\n  border: none;\r\n  cursor: move;\r\n  font-size: 13px;\r\n  margin: 5px 7px;\r\n  padding: 5px 5px;\r\n  text-align: center;\r\n}\r\n.external-event {\r\n  color: #ffffff;\r\n  cursor: move;\r\n  margin: 10px 0;\r\n  padding: 6px 10px;\r\n}\r\n.fc-basic-view td.fc-week-number span {\r\n  padding-right: 5px;\r\n}\r\n.fc-basic-view td.fc-day-number {\r\n  padding-right: 5px;\r\n}\r\n/* ===========\r\n   Widgets\r\n =============*/\r\n/* Inbox-widget */\r\n.inbox-widget .inbox-item {\r\n  border-bottom: 1px solid #323b44;\r\n  overflow: hidden;\r\n  padding: 10px 0;\r\n  position: relative;\r\n}\r\n.inbox-widget .inbox-item .inbox-item-img {\r\n  display: block;\r\n  float: left;\r\n  margin-right: 15px;\r\n  width: 40px;\r\n}\r\n.inbox-widget .inbox-item img {\r\n  width: 40px;\r\n}\r\n.inbox-widget .inbox-item .inbox-item-author {\r\n  color: #f5f5f5;\r\n  display: block;\r\n  margin: 0;\r\n}\r\n.inbox-widget .inbox-item .inbox-item-text {\r\n  color: #98a6ad;\r\n  display: block;\r\n  font-size: 12px;\r\n  margin: 0;\r\n}\r\n.inbox-widget .inbox-item .inbox-item-date {\r\n  color: #98a6ad;\r\n  font-size: 11px;\r\n  position: absolute;\r\n  right: 7px;\r\n  top: 2px;\r\n}\r\n/* Chat widget */\r\n.conversation-list {\r\n  list-style: none;\r\n  height: 332px;\r\n  padding: 0px 20px;\r\n}\r\n.conversation-list li {\r\n  margin-bottom: 24px;\r\n}\r\n.conversation-list .chat-avatar {\r\n  display: inline-block;\r\n  float: left;\r\n  text-align: center;\r\n  width: 42px;\r\n}\r\n.conversation-list .chat-avatar img {\r\n  border-radius: 100%;\r\n  width: 100%;\r\n}\r\n.conversation-list .chat-avatar i {\r\n  font-size: 12px;\r\n  font-style: normal;\r\n  color: #98a6ad;\r\n}\r\n.conversation-list .ctext-wrap {\r\n  -moz-border-radius: 3px;\r\n  -webkit-border-radius: 3px;\r\n  background: rgba(255, 255, 255, 0.1);\r\n  border-radius: 3px;\r\n  display: inline-block;\r\n  padding: 12px;\r\n  position: relative;\r\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\r\n}\r\n.conversation-list .ctext-wrap i {\r\n  color: #f5f5f5;\r\n  display: block;\r\n  font-size: 12px;\r\n  font-style: normal;\r\n  font-weight: bold;\r\n  position: relative;\r\n}\r\n.conversation-list .ctext-wrap p {\r\n  margin: 0px;\r\n  padding-top: 3px;\r\n  color: #98a6ad;\r\n}\r\n.conversation-list .ctext-wrap:after {\r\n  right: 100%;\r\n  top: 0%;\r\n  border: solid transparent;\r\n  content: \" \";\r\n  height: 0;\r\n  width: 0;\r\n  position: absolute;\r\n  pointer-events: none;\r\n  border-top-color: rgba(255, 255, 255, 0.1);\r\n  border-width: 8px;\r\n  margin-left: -1px;\r\n  border-right-color: rgba(255, 255, 255, 0.1);\r\n}\r\n.conversation-list .conversation-text {\r\n  display: inline-block;\r\n  float: left;\r\n  font-size: 12px;\r\n  margin-left: 12px;\r\n  width: 70%;\r\n}\r\n.conversation-list .odd .chat-avatar {\r\n  float: right !important;\r\n}\r\n.conversation-list .odd .conversation-text {\r\n  float: right !important;\r\n  margin-right: 12px;\r\n  text-align: right;\r\n  width: 70% !important;\r\n}\r\n.conversation-list .odd .ctext-wrap:after {\r\n  border-color: rgba(238, 238, 242, 0) !important;\r\n  border-left-color: rgba(255, 255, 255, 0.1) !important;\r\n  border-top-color: rgba(255, 255, 255, 0.1) !important;\r\n  left: 100% !important;\r\n  margin-right: -1px;\r\n}\r\n.chat-send {\r\n  padding-left: 0px;\r\n  padding-right: 30px;\r\n}\r\n.chat-send button {\r\n  width: 100%;\r\n}\r\n.chat-inputbar {\r\n  padding-left: 30px;\r\n}\r\n/* Todos widget */\r\n#todo-message {\r\n  font-size: 16px;\r\n}\r\n.todo-list li {\r\n  border-radius: 0px;\r\n  border: 0px;\r\n  margin: 0px;\r\n  padding: 1px;\r\n  color: #98a6ad;\r\n}\r\n.todo-list li:last-of-type {\r\n  border-bottom: none;\r\n}\r\n.todo-list li:hover {\r\n  background: transparent !important;\r\n}\r\n.todo-send {\r\n  padding-left: 0px;\r\n}\r\n/* Widget-chart */\r\n.widget-chart ul li {\r\n  width: 31.5%;\r\n  display: inline-block;\r\n  padding: 0px;\r\n}\r\n.widget-panel {\r\n  padding: 30px 20px;\r\n  padding-left: 30px;\r\n  border-radius: 4px;\r\n  position: relative;\r\n  margin-bottom: 20px;\r\n}\r\n.widget-panel i {\r\n  font-size: 60px;\r\n  padding: 30px;\r\n  background: rgba(255, 255, 255, 0.2);\r\n  position: absolute;\r\n  right: 0px;\r\n  bottom: 0px;\r\n  top: 0px;\r\n  line-height: 60px;\r\n}\r\n.widget-user {\r\n  min-height: 112px;\r\n}\r\n.widget-user img {\r\n  height: 72px;\r\n  float: left;\r\n}\r\n.widget-user .wid-u-info {\r\n  margin-left: 90px;\r\n}\r\n.widget-user .wid-u-info p {\r\n  white-space: nowrap;\r\n  display: block;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n.widget-simple-chart .circliful-chart {\r\n  float: left;\r\n  margin-top: -5px;\r\n}\r\n.widget-icon i {\r\n  float: left;\r\n  font-size: 48px;\r\n}\r\n.widget-icon .wid-icon-info {\r\n  margin-left: 80px;\r\n}\r\n"; });
define('text!main/picks/picks.html', ['module'], function(module) { module.exports = "<template>\r\n  <ul class=\"nav nav-pills m-b-15\">\r\n      <li class=\"active\"><a data-toggle=\"pill\" href=\"#currentPick\" aria-expanded=\"true\"><h4>Current</h4></a></li>\r\n      <li><a data-toggle=\"pill\" href=\"#pickSummary\" aria-expanded=\"true\"><h4>Summary</h4></a></li>\r\n  </ul>\r\n  <div class=\"tab-content br-n pn\">\r\n    <div id=\"currentPick\" class=\"tab-pane fade in active\">\r\n      <picks-main></picks-main>\r\n    </div>\r\n    <div id=\"pickSummary\" class=\"tab-pane fade\">\r\n      <pick-summary></pick-summary>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!resources/styles/minton/css/core.css', ['module'], function(module) { module.exports = "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);\r\n@import url(https://fonts.googleapis.com/css?family=Poppins:500,600);\r\n@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:600,400,700);\r\n/* ===========\r\n   Core file List\r\n\r\n   - Common\r\n   - Bootstrap custom\r\n   - Helper class\r\n   - Waves effect\r\n   - Animation\r\n   - Print css\r\n =============*/\r\n/* ===========\r\n   Common\r\n =============*/\r\nbody {\r\n  background: #2d353d;\r\n  font-family: 'Roboto', sans-serif;\r\n  margin: 0;\r\n  color: #98a6ad;\r\n  overflow-x: hidden !important;\r\n}\r\nhtml {\r\n  overflow-x: hidden;\r\n  position: relative;\r\n  min-height: 100%;\r\n  background: #2d353d;\r\n}\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6 {\r\n  color: rgba(255, 255, 255, 0.8);\r\n  font-family: 'Source Sans Pro', sans-serif;\r\n  margin: 10px 0;\r\n}\r\nh1 small,\r\nh2 small,\r\nh3 small,\r\nh4 small,\r\nh5 small,\r\nh6 small {\r\n  color: rgba(255, 255, 255, 0.5);\r\n}\r\nh1 {\r\n  line-height: 43px;\r\n}\r\nh2 {\r\n  line-height: 35px;\r\n}\r\nh3 {\r\n  line-height: 30px;\r\n}\r\nh4 {\r\n  line-height: 22px;\r\n}\r\n* {\r\n  outline: none !important;\r\n}\r\na:hover {\r\n  outline: 0;\r\n  text-decoration: none;\r\n}\r\na:active {\r\n  outline: 0;\r\n  text-decoration: none;\r\n}\r\na:focus {\r\n  outline: 0;\r\n  text-decoration: none;\r\n}\r\n.container {\r\n  width: auto;\r\n}\r\n.container-alt {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n}\r\n.footer {\r\n  background-color: #323b44;\r\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\r\n  bottom: 0;\r\n  color: #98a6ad;\r\n  text-align: left !important;\r\n  padding: 20px 30px;\r\n  position: absolute;\r\n  right: 0;\r\n  left: 240px;\r\n}\r\n#wrapper {\r\n  height: 100%;\r\n  overflow: hidden;\r\n  width: 100%;\r\n}\r\n.page {\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n}\r\n.page-title {\r\n  margin-bottom: 0px;\r\n  margin-top: 0px;\r\n}\r\n.page-header {\r\n  border-bottom: 1px solid rgba(238, 238, 238, 0.2);\r\n}\r\n.page-title-box {\r\n  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.03), 0 1px 0 rgba(0, 0, 0, 0.03);\r\n  padding: 20px;\r\n  margin: -20px -20px 0 -20px;\r\n}\r\n.page-title-box .breadcrumb {\r\n  margin-top: 0px;\r\n  padding-top: 2px;\r\n}\r\n.page-title-box .breadcrumb a {\r\n  color: #3bafda;\r\n}\r\n.page-title-box .breadcrumb > .active {\r\n  color: #98a6ad;\r\n}\r\n.card-box {\r\n  padding: 20px;\r\n  border: 1px solid rgba(255, 255, 255, 0.07);\r\n  border-radius: 5px;\r\n  -moz-border-radius: 5px;\r\n  background-clip: padding-box;\r\n  margin-bottom: 20px;\r\n  background-color: #323b44;\r\n}\r\n.header-title {\r\n  text-transform: uppercase;\r\n  font-size: 15px;\r\n  font-weight: 600;\r\n  letter-spacing: 0.04em;\r\n  line-height: 16px;\r\n  margin-bottom: 8px;\r\n}\r\n.social-links li a {\r\n  -webkit-border-radius: 50%;\r\n  background: #EFF0F4;\r\n  border-radius: 50%;\r\n  color: #7A7676;\r\n  display: inline-block;\r\n  height: 30px;\r\n  line-height: 30px;\r\n  text-align: center;\r\n  width: 30px;\r\n}\r\n/* ===========\r\n   Bootstrap-custom\r\n =============*/\r\n.row {\r\n  margin-right: -10px;\r\n  margin-left: -10px;\r\n}\r\n.col-lg-1,\r\n.col-lg-10,\r\n.col-lg-11,\r\n.col-lg-12,\r\n.col-lg-2,\r\n.col-lg-3,\r\n.col-lg-4,\r\n.col-lg-5,\r\n.col-lg-6,\r\n.col-lg-7,\r\n.col-lg-8,\r\n.col-lg-9,\r\n.col-md-1,\r\n.col-md-10,\r\n.col-md-11,\r\n.col-md-12,\r\n.col-md-2,\r\n.col-md-3,\r\n.col-md-4,\r\n.col-md-5,\r\n.col-md-6,\r\n.col-md-7,\r\n.col-md-8,\r\n.col-md-9,\r\n.col-sm-1,\r\n.col-sm-10,\r\n.col-sm-11,\r\n.col-sm-12,\r\n.col-sm-2,\r\n.col-sm-3,\r\n.col-sm-4,\r\n.col-sm-5,\r\n.col-sm-6,\r\n.col-sm-7,\r\n.col-sm-8,\r\n.col-sm-9,\r\n.col-xs-1,\r\n.col-xs-10,\r\n.col-xs-11,\r\n.col-xs-12,\r\n.col-xs-2,\r\n.col-xs-3,\r\n.col-xs-4,\r\n.col-xs-5,\r\n.col-xs-6,\r\n.col-xs-7,\r\n.col-xs-8,\r\n.col-xs-9 {\r\n  padding-left: 10px;\r\n  padding-right: 10px;\r\n}\r\n.breadcrumb {\r\n  background-color: transparent;\r\n  margin-bottom: 15px;\r\n  margin-top: 5px;\r\n}\r\n.dropdown-menu {\r\n  padding: 4px 0;\r\n  background-color: #1c2127;\r\n  animation: dropdownOpen 0.3s ease-out;\r\n  border: 0;\r\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\r\n}\r\n.dropdown-menu > li > a {\r\n  padding: 6px 20px;\r\n  color: #98a6ad;\r\n}\r\n.dropdown-menu .divider {\r\n  background-color: rgba(238, 238, 238, 0.2);\r\n}\r\n.dropdown-menu > li > a:focus,\r\n.dropdown-menu > li > a:hover {\r\n  color: rgba(255, 255, 255, 0.7);\r\n  text-decoration: none;\r\n  background-color: #121518;\r\n}\r\nhr {\r\n  border-top: 1px solid rgba(238, 238, 238, 0.3);\r\n}\r\ncode {\r\n  color: #3bafda;\r\n  border-radius: 4px;\r\n}\r\ncode,\r\npre {\r\n  background-color: rgba(255, 255, 255, 0.1);\r\n}\r\npre {\r\n  background-color: #21272c;\r\n  color: #eeeeee;\r\n  border: 1px solid rgba(238, 238, 238, 0.3);\r\n}\r\n.bg-empty {\r\n  background: transparent !important;\r\n}\r\n.bg-primary {\r\n  background-color: #3bafda !important;\r\n}\r\n.bg-success {\r\n  background-color: #00b19d !important;\r\n}\r\n.bg-info {\r\n  background-color: #3ddcf7 !important;\r\n}\r\n.bg-warning {\r\n  background-color: #ffaa00 !important;\r\n}\r\n.bg-danger {\r\n  background-color: #ef5350 !important;\r\n}\r\n.bg-muted {\r\n  background-color: #F5F5F5 !important;\r\n}\r\n.bg-inverse {\r\n  background-color: #4c5667 !important;\r\n}\r\n.bg-purple {\r\n  background-color: #7266ba !important;\r\n}\r\n.bg-pink {\r\n  background-color: #f76397 !important;\r\n}\r\n.bg-white {\r\n  background-color: #ffffff !important;\r\n}\r\n.text-white {\r\n  color: #ffffff;\r\n}\r\n.text-danger {\r\n  color: #ef5350;\r\n}\r\n.text-muted {\r\n  color: #98a6ad !important;\r\n}\r\n.text-primary {\r\n  color: #3bafda;\r\n}\r\n.text-warning {\r\n  color: #ffaa00;\r\n}\r\n.text-success {\r\n  color: #00b19d;\r\n}\r\n.text-info {\r\n  color: #3ddcf7;\r\n}\r\n.text-inverse {\r\n  color: rgba(255, 255, 255, 0.6);\r\n}\r\n.text-pink {\r\n  color: #f76397;\r\n}\r\n.text-purple {\r\n  color: #7266ba;\r\n}\r\n.form-control {\r\n  background-color: #323b44;\r\n  border: 2px solid rgba(238, 238, 238, 0.1);\r\n  border-radius: 4px;\r\n  color: #ffffff;\r\n  height: 36px;\r\n  max-width: 100%;\r\n  box-shadow: none;\r\n  transition: all 300ms linear;\r\n}\r\n.form-control:focus {\r\n  background-color: #323b44;\r\n  border: 2px solid rgba(238, 238, 238, 0.3);\r\n  box-shadow: none;\r\n  outline: 0 !important;\r\n  color: #ffffff;\r\n}\r\n.form-control[disabled],\r\n.form-control[readonly],\r\nfieldset[disabled] .form-control {\r\n  background-color: rgba(255, 255, 255, 0.1);\r\n}\r\ninput.form-control::-webkit-input-placeholder {\r\n  color: rgba(255, 255, 255, 0.3);\r\n  font-weight: normal;\r\n}\r\ninput.form-control:-moz-placeholder {\r\n  color: rgba(255, 255, 255, 0.3);\r\n  font-weight: normal;\r\n}\r\ninput.form-control::-moz-placeholder {\r\n  color: rgba(255, 255, 255, 0.3);\r\n  font-weight: normal;\r\n}\r\ninput.form-control:-ms-input-placeholder {\r\n  color: rgba(255, 255, 255, 0.3);\r\n  font-weight: normal;\r\n}\r\n.label {\r\n  color: #ffffff !important;\r\n}\r\n.label-primary {\r\n  background-color: #3bafda;\r\n}\r\n.label-success {\r\n  background-color: #00b19d;\r\n}\r\n.label-info {\r\n  background-color: #3ddcf7;\r\n}\r\n.label-warning {\r\n  background-color: #ffaa00;\r\n}\r\n.label-danger {\r\n  background-color: #ef5350;\r\n}\r\n.label-purple {\r\n  background-color: #7266ba;\r\n}\r\n.label-pink {\r\n  background-color: #f76397;\r\n}\r\n.label-dark {\r\n  background: #4f595b;\r\n}\r\n.label-inverse {\r\n  background-color: #4c5667;\r\n}\r\n.badge {\r\n  font-weight: 600;\r\n  padding: 3px 5px;\r\n  font-size: 12px;\r\n  margin-top: 1px;\r\n}\r\n.badge-xs {\r\n  font-size: 9px;\r\n}\r\n.badge-xs,\r\n.badge-sm {\r\n  transform: translate(0, -2px);\r\n}\r\n.badge-primary {\r\n  background-color: #3bafda;\r\n}\r\n.badge-success {\r\n  background-color: #00b19d;\r\n}\r\n.badge-info {\r\n  background-color: #3ddcf7;\r\n}\r\n.badge-warning {\r\n  background-color: #ffaa00;\r\n}\r\n.badge-danger {\r\n  background-color: #ef5350;\r\n}\r\n.badge-purple {\r\n  background-color: #7266ba;\r\n}\r\n.badge-pink {\r\n  background-color: #f76397;\r\n}\r\n.badge-inverse {\r\n  background-color: #4c5667;\r\n}\r\n/* Pagination/ Pager */\r\n.pagination > li:first-child > a,\r\n.pagination > li:first-child > span {\r\n  border-bottom-left-radius: 3px;\r\n  border-top-left-radius: 3px;\r\n}\r\n.pagination > li:last-child > a,\r\n.pagination > li:last-child > span {\r\n  border-bottom-right-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n}\r\n.pagination > li > a,\r\n.pagination > li > span {\r\n  color: #ffffff;\r\n  background-color: transparent;\r\n  border: 1px solid rgba(255, 255, 255, 0.1);\r\n}\r\n.pagination > li > a:hover,\r\n.pagination > li > span:hover,\r\n.pagination > li > a:focus,\r\n.pagination > li > span:focus {\r\n  background-color: #e4e7ea;\r\n}\r\n.pagination-split li {\r\n  margin-left: 5px;\r\n  display: inline-block;\r\n  float: left;\r\n}\r\n.pagination-split li:first-child {\r\n  margin-left: 0;\r\n}\r\n.pagination-split li a {\r\n  border-radius: 3px;\r\n}\r\n.pagination > .active > a,\r\n.pagination > .active > span,\r\n.pagination > .active > a:hover,\r\n.pagination > .active > span:hover,\r\n.pagination > .active > a:focus,\r\n.pagination > .active > span:focus {\r\n  background-color: #3bafda;\r\n  border-color: #3bafda;\r\n}\r\n.pager li > a,\r\n.pager li > span {\r\n  border-radius: 3px;\r\n  color: #ffffff;\r\n  background: transparent;\r\n}\r\n.pager li > a:hover,\r\n.pager li > span:hover {\r\n  background: rgba(255, 255, 255, 0.2);\r\n}\r\n.pagination > .disabled > a,\r\n.pagination > .disabled > a:focus,\r\n.pagination > .disabled > a:hover,\r\n.pagination > .disabled > span,\r\n.pagination > .disabled > span:focus,\r\n.pagination > .disabled > span:hover,\r\n.pager .disabled > a,\r\n.pager .disabled > a:focus,\r\n.pager .disabled > a:hover,\r\n.pager .disabled > span {\r\n  background: rgba(255, 255, 255, 0.2);\r\n  color: #ffffff;\r\n  border: 1px solid rgba(255, 255, 255, 0.1);\r\n}\r\nblockquote .small,\r\nblockquote footer,\r\nblockquote small {\r\n  color: #ffffff;\r\n}\r\n/* Tabs */\r\n.tabs {\r\n  margin: 0 auto;\r\n  padding: 0px;\r\n  position: relative;\r\n  white-space: nowrap;\r\n  width: 100%;\r\n}\r\n.tabs li.tab {\r\n  display: block;\r\n  float: left;\r\n  margin: 0;\r\n  text-align: center;\r\n}\r\n.tabs li.tab a {\r\n  -moz-transition: color 0.28s ease;\r\n  -ms-transition: color 0.28s ease;\r\n  -o-transition: color 0.28s ease;\r\n  -webkit-transition: color 0.28s ease;\r\n  color: #eeeeee;\r\n  display: block;\r\n  height: 100%;\r\n  text-decoration: none;\r\n  transition: color 0.28s ease;\r\n  width: 100%;\r\n}\r\n.tabs li.tab a.active {\r\n  color: #3bafda !important;\r\n}\r\n.tabs .indicator {\r\n  background-color: #3bafda;\r\n  bottom: 0;\r\n  height: 2px;\r\n  position: absolute;\r\n  will-change: left, right;\r\n}\r\n.tabs-top .indicator {\r\n  top: 0;\r\n}\r\n.nav-pills li a {\r\n  line-height: 36px !important;\r\n}\r\n.nav-pills li.active a {\r\n  background-color: #3bafda !important;\r\n}\r\n.nav-pills li.active a:hover {\r\n  background-color: #3bafda !important;\r\n}\r\n.nav-pills li.active a:focus {\r\n  background-color: #3bafda !important;\r\n}\r\n.nav-pills li a:hover {\r\n  color: #3bafda;\r\n  background: transparent !important;\r\n}\r\n.nav.nav-tabs + .tab-content {\r\n  border: 2px solid rgba(255, 255, 255, 0.1);\r\n  margin-bottom: 30px;\r\n  padding: 30px;\r\n  color: #98a6ad;\r\n  background-color: #323b44;\r\n}\r\n.tabs-vertical-env {\r\n  margin-bottom: 30px;\r\n}\r\n.tabs-vertical-env .tab-content {\r\n  border: 2px solid rgba(255, 255, 255, 0.1);\r\n  display: table-cell;\r\n  margin-bottom: 30px;\r\n  padding: 30px;\r\n  color: #98a6ad;\r\n  vertical-align: top;\r\n  background-color: #272e35;\r\n}\r\n.tabs-vertical-env .nav.tabs-vertical {\r\n  display: table-cell;\r\n  min-width: 120px;\r\n  vertical-align: top;\r\n  width: 150px;\r\n}\r\n.tabs-vertical-env .nav.tabs-vertical li.active > a {\r\n  background-color: #ffffff;\r\n  border: 0;\r\n}\r\n.tabs-vertical-env .nav.tabs-vertical li > a {\r\n  color: #333333;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n}\r\n.nav.nav-tabs > li.active > a {\r\n  border: 0;\r\n}\r\n.nav.nav-tabs > li > a,\r\n.nav.tabs-vertical > li > a {\r\n  background: rgba(255, 255, 255, 0.1) !important;\r\n  border-radius: 0;\r\n  border: none;\r\n  cursor: pointer;\r\n  line-height: 50px;\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n  letter-spacing: 0.03em;\r\n  font-weight: 600;\r\n  text-transform: uppercase;\r\n  font-family: 'Source Sans Pro', sans-serif;\r\n}\r\n.nav.nav-tabs > li > a:hover,\r\n.nav.tabs-vertical > li > a:hover {\r\n  color: #3bafda !important;\r\n  background: rgba(255, 255, 255, 0.1) !important;\r\n}\r\n.nav.nav-tabs > li:last-of-type a {\r\n  margin-right: 0px;\r\n}\r\n.nav.nav-tabs {\r\n  border-bottom: 0;\r\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\r\n}\r\n.nav-tabs.nav-justified > .active > a,\r\n.nav-tabs.nav-justified > .active > a:hover,\r\n.nav-tabs.nav-justified > .active > a:focus,\r\n.tabs-vertical-env .nav.tabs-vertical li.active > a {\r\n  border: none;\r\n}\r\n.nav-tabs > li.active > a,\r\n.nav-tabs > li.active > a:focus,\r\n.nav-tabs > li.active > a:hover,\r\n.tabs-vertical > li.active > a,\r\n.tabs-vertical > li.active > a:focus,\r\n.tabs-vertical > li.active > a:hover {\r\n  color: #3bafda !important;\r\n}\r\n.navtab-custom li {\r\n  margin-bottom: -2px;\r\n}\r\n.navtab-custom li a {\r\n  border-top: 2px solid transparent !important;\r\n}\r\n.navtab-custom li.active a {\r\n  border-top: 2px solid #3bafda !important;\r\n}\r\n.nav-tab-left.navtab-custom li a {\r\n  border: none !important;\r\n  border-left: 2px solid transparent !important;\r\n}\r\n.nav-tab-left.navtab-custom li.active a {\r\n  border-left: 2px solid #3bafda !important;\r\n}\r\n.nav-tab-right.navtab-custom li a {\r\n  border: none !important;\r\n  border-right: 2px solid transparent !important;\r\n}\r\n.nav-tab-right.navtab-custom li.active a {\r\n  border-right: 2px solid #3bafda !important;\r\n}\r\n.nav-tabs.nav-justified > .active > a,\r\n.nav-tabs.nav-justified > .active > a:hover,\r\n.nav-tabs.nav-justified > .active > a:focus,\r\n.tabs-vertical-env .nav.tabs-vertical li.active > a {\r\n  border: none;\r\n}\r\n.nav-tabs > li.active > a,\r\n.nav-tabs > li.active > a:focus,\r\n.nav-tabs > li.active > a:hover,\r\n.tabs-vertical > li.active > a,\r\n.tabs-vertical > li.active > a:focus,\r\n.tabs-vertical > li.active > a:hover {\r\n  color: #3bafda !important;\r\n}\r\n/* Dropcap */\r\n.dropcap {\r\n  font-size: 3.1em;\r\n}\r\n.dropcap,\r\n.dropcap-circle,\r\n.dropcap-square {\r\n  display: block;\r\n  float: left;\r\n  font-weight: 400;\r\n  line-height: 36px;\r\n  margin-right: 6px;\r\n  text-shadow: none;\r\n}\r\n/* Modal */\r\n.modal .modal-dialog .modal-content {\r\n  -moz-box-shadow: none;\r\n  -webkit-box-shadow: none;\r\n  border-color: rgba(238, 238, 238, 0.3);\r\n  border-radius: 2px;\r\n  box-shadow: none;\r\n  padding: 30px;\r\n  background-color: #323b44;\r\n}\r\n.modal .modal-dialog .modal-content .modal-header {\r\n  margin: 0;\r\n  padding: 0;\r\n  border-bottom: 2px solid rgba(238, 238, 238, 0.3);\r\n  padding-bottom: 15px;\r\n}\r\n.modal .modal-dialog .modal-content .modal-body {\r\n  padding: 20px 0;\r\n}\r\n.modal .modal-dialog .modal-content .modal-footer {\r\n  padding: 0;\r\n  padding-top: 15px;\r\n  border-top: 1px solid rgba(238, 238, 238, 0.3);\r\n}\r\n.modal .close {\r\n  color: #ffffff;\r\n  text-shadow: none;\r\n}\r\n.modal-full {\r\n  width: 98%;\r\n}\r\n.modal-backdrop {\r\n  background-color: #eeeeee;\r\n}\r\n.modal-content .nav.nav-tabs + .tab-content {\r\n  margin-bottom: 0px;\r\n}\r\n.modal-content .panel-group {\r\n  margin-bottom: 0px;\r\n}\r\n.modal-content .panel {\r\n  border-top: none;\r\n}\r\n/* Custom-modal */\r\n.modal-demo {\r\n  background-color: #FFF;\r\n  width: 600px;\r\n  border-radius: 4px;\r\n  -moz-border-radius: 4px;\r\n  background-clip: padding-box;\r\n  display: none;\r\n}\r\n.modal-demo .close {\r\n  position: absolute;\r\n  top: 15px;\r\n  right: 25px;\r\n  color: #eeeeee;\r\n}\r\n.custom-modal-title {\r\n  padding: 15px 25px 15px 25px;\r\n  line-height: 22px;\r\n  font-size: 18px;\r\n  background-color: #3bafda;\r\n  color: #ffffff;\r\n  text-align: left;\r\n  margin: 0px;\r\n}\r\n.custom-modal-text {\r\n  padding: 20px;\r\n}\r\n.custombox-modal-flash .close,\r\n.custombox-modal-rotatedown .close {\r\n  top: 20px;\r\n  z-index: 9999;\r\n}\r\n.tabs-vertical-env .tab-content {\r\n  margin-bottom: 0px;\r\n}\r\n.table > thead > tr > td.middle-align,\r\n.table > tbody > tr > td.middle-align {\r\n  vertical-align: middle;\r\n}\r\n.legendLabel {\r\n  padding-left: 10px !important;\r\n}\r\n/* Alerts */\r\n.alert-success {\r\n  background-color: rgba(0, 177, 157, 0.25) !important;\r\n  border-color: rgba(0, 177, 157, 0.5) !important;\r\n  color: #00b19d;\r\n}\r\n.alert-success .alert-link {\r\n  color: #00b19d;\r\n}\r\n.alert-info {\r\n  background-color: rgba(61, 220, 247, 0.2) !important;\r\n  border-color: rgba(61, 220, 247, 0.5) !important;\r\n  color: #3ddcf7;\r\n}\r\n.alert-info .alert-link {\r\n  color: #3ddcf7;\r\n}\r\n.alert-warning {\r\n  background-color: rgba(255, 170, 0, 0.2) !important;\r\n  border-color: rgba(255, 170, 0, 0.5) !important;\r\n  color: #ffaa00;\r\n}\r\n.alert-warning .alert-link {\r\n  color: #ffaa00;\r\n}\r\n.alert-danger {\r\n  background-color: rgba(239, 83, 80, 0.2) !important;\r\n  border-color: rgba(239, 83, 80, 0.5) !important;\r\n  color: #ef5350;\r\n}\r\n.alert-danger .alert-link {\r\n  color: #ef5350;\r\n}\r\n/* List group */\r\n.list-group-item {\r\n  border: 1px solid rgba(238, 238, 238, 0.3);\r\n  background: transparent;\r\n  color: #ffffff !important;\r\n}\r\n.list-group-item:hover {\r\n  background-color: rgba(255, 255, 255, 0.07) !important;\r\n}\r\n.list-group-item.disabled,\r\n.list-group-item.disabled:focus,\r\n.list-group-item.disabled:hover {\r\n  background-color: rgba(255, 255, 255, 0.07) !important;\r\n}\r\n.list-group-item.active,\r\n.list-group-item.active:hover,\r\n.list-group-item.active:focus {\r\n  background-color: #3bafda !important;\r\n  border-color: #3bafda;\r\n}\r\n.list-group-item.disabled .list-group-item-text,\r\n.list-group-item.disabled:focus .list-group-item-text,\r\n.list-group-item.disabled:hover .list-group-item-text {\r\n  color: rgba(255, 255, 255, 0.5);\r\n}\r\na.list-group-item .list-group-item-heading,\r\nbutton.list-group-item .list-group-item-heading {\r\n  color: #ffffff;\r\n}\r\n.nav-pills > .active > a > .badge {\r\n  color: #3bafda;\r\n}\r\n.has-success .form-control {\r\n  border-color: #00b19d;\r\n  box-shadow: none !important;\r\n}\r\n.has-warning .form-control {\r\n  border-color: #ffaa00;\r\n  box-shadow: none !important;\r\n}\r\n.has-error .form-control {\r\n  border-color: #ef5350;\r\n  box-shadow: none !important;\r\n}\r\n.input-group-addon {\r\n  border-radius: 2px;\r\n  border: none;\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n  color: #ffffff;\r\n}\r\n/* Tooltips */\r\n.tooltip-inner {\r\n  border-radius: 1px;\r\n  padding: 6px 10px;\r\n}\r\n.jqstooltip {\r\n  box-sizing: content-box;\r\n  width: auto !important;\r\n  height: auto !important;\r\n}\r\n/* Popover */\r\n.popover {\r\n  font-family: inherit;\r\n  border: none;\r\n  border-radius: 3px;\r\n  -moz-border-radius: 3px;\r\n  background-clip: padding-box;\r\n}\r\n.popover .popover-title {\r\n  background-color: transparent;\r\n  color: #3bafda;\r\n  font-weight: 600;\r\n}\r\n/* ===========\r\n   Helper classes\r\n =============*/\r\n.p-0 {\r\n  padding: 0px !important;\r\n}\r\n.p-t-0 {\r\n  padding-top: 0px !important;\r\n}\r\n.p-t-10 {\r\n  padding-top: 10px !important;\r\n}\r\n.p-b-0 {\r\n  padding-bottom: 0px !important;\r\n}\r\n.p-b-10 {\r\n  padding-bottom: 10px !important;\r\n}\r\n.m-0 {\r\n  margin: 0px !important;\r\n}\r\n.m-r-5 {\r\n  margin-right: 5px;\r\n}\r\n.m-r-10 {\r\n  margin-right: 10px;\r\n}\r\n.m-r-15 {\r\n  margin-right: 15px !important;\r\n}\r\n.m-l-5 {\r\n  margin-left: 5px;\r\n}\r\n.m-l-10 {\r\n  margin-left: 10px;\r\n}\r\n.m-l-15 {\r\n  margin-left: 15px;\r\n}\r\n.m-t-5 {\r\n  margin-top: 5px !important;\r\n}\r\n.m-t-0 {\r\n  margin-top: 0px;\r\n}\r\n.m-t-10 {\r\n  margin-top: 10px !important;\r\n}\r\n.m-t-15 {\r\n  margin-top: 15px !important;\r\n}\r\n.m-t-20 {\r\n  margin-top: 20px !important;\r\n}\r\n.m-t-30 {\r\n  margin-top: 30px !important;\r\n}\r\n.m-t-40 {\r\n  margin-top: 40px !important;\r\n}\r\n.m-b-0 {\r\n  margin-bottom: 0px !important;\r\n}\r\n.m-b-5 {\r\n  margin-bottom: 5px;\r\n}\r\n.m-b-10 {\r\n  margin-bottom: 10px;\r\n}\r\n.m-b-15 {\r\n  margin-bottom: 15px;\r\n}\r\n.m-b-20 {\r\n  margin-bottom: 20px;\r\n}\r\n.m-b-25 {\r\n  margin-bottom: 25px;\r\n}\r\n.m-b-30 {\r\n  margin-bottom: 30px !important;\r\n}\r\n.w-xs {\r\n  min-width: 80px;\r\n}\r\n.w-sm {\r\n  min-width: 95px;\r\n}\r\n.w-md {\r\n  min-width: 110px;\r\n}\r\n.w-lg {\r\n  min-width: 140px;\r\n}\r\n.m-h-50 {\r\n  min-height: 50px;\r\n}\r\n.l-h-34 {\r\n  line-height: 34px !important;\r\n}\r\n.font-light {\r\n  font-weight: 300;\r\n}\r\n.font-500 {\r\n  font-weight: 500;\r\n}\r\n.font-normal {\r\n  font-weight: normal;\r\n}\r\n.font-13 {\r\n  font-size: 13px;\r\n}\r\n.wrapper-md {\r\n  padding: 20px;\r\n}\r\n.center-page {\r\n  float: none !important;\r\n  margin: 0 auto;\r\n}\r\n.pull-in {\r\n  margin-left: -20px;\r\n  margin-right: -20px;\r\n}\r\n.b-0 {\r\n  border: none !important;\r\n}\r\n.no-border {\r\n  border: none;\r\n}\r\n.bx-s-0 {\r\n  box-shadow: none !important;\r\n}\r\n.bx-shadow {\r\n  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);\r\n}\r\n.mx-box {\r\n  max-height: 380px;\r\n  min-height: 380px;\r\n}\r\n.thumb-sm {\r\n  height: 32px;\r\n  width: 32px;\r\n}\r\n.thumb-md {\r\n  height: 48px;\r\n  width: 48px;\r\n}\r\n.thumb-lg {\r\n  height: 88px;\r\n  width: 88px;\r\n}\r\n/* Demo Only */\r\n.grid-structure .grid-container {\r\n  background-color: rgba(255, 255, 255, 0.03);\r\n  margin-bottom: 10px;\r\n  padding: 10px 20px;\r\n}\r\n.icon-list-demo div {\r\n  cursor: pointer;\r\n  line-height: 45px;\r\n  white-space: nowrap;\r\n  color: #98a6ad;\r\n}\r\n.icon-list-demo div p {\r\n  margin-bottom: 0px;\r\n  line-height: inherit;\r\n}\r\n.icon-list-demo i {\r\n  -webkit-transition: all 0.2s;\r\n  display: inline-block;\r\n  font-size: 18px;\r\n  margin: 0;\r\n  text-align: center;\r\n  transition: all 0.2s;\r\n  vertical-align: middle;\r\n  width: 40px;\r\n}\r\n.icon-list-demo .col-md-4 {\r\n  border-radius: 3px;\r\n  -moz-border-radius: 3px;\r\n  background-clip: padding-box;\r\n}\r\n.icon-list-demo .col-md-4:hover {\r\n  color: #3bafda;\r\n}\r\n.icon-list-demo .col-md-4:hover i {\r\n  -o-transform: scale(1.5);\r\n  -webkit-transform: scale(1.5);\r\n  moz-transform: scale(1.5);\r\n  transform: scale(1.5);\r\n}\r\n.ionicon-list i {\r\n  font-size: 16px;\r\n}\r\n.ionicon-list .col-md-3:hover i {\r\n  -o-transform: scale(2);\r\n  -webkit-transform: scale(2);\r\n  moz-transform: scale(2);\r\n  transform: scale(2);\r\n}\r\n.button-list {\r\n  margin-left: -8px;\r\n  margin-bottom: -12px;\r\n}\r\n.button-list .btn {\r\n  margin-bottom: 12px;\r\n  margin-left: 8px;\r\n}\r\n/* ===========\r\n   Waves Effect\r\n =============*/\r\n/*!\r\n * Waves v0.6.0\r\n * http://fian.my.id/Waves\r\n *\r\n * Copyright 2014 Alfiana E. Sibuea and other contributors\r\n * Released under the MIT license\r\n * https://github.com/fians/Waves/blob/master/LICENSE\r\n */\r\n.waves-effect {\r\n  position: relative;\r\n  cursor: pointer;\r\n  display: inline-block;\r\n  overflow: hidden;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  -webkit-tap-highlight-color: transparent;\r\n  vertical-align: middle;\r\n  z-index: 1;\r\n  will-change: opacity, transform;\r\n  transition: all 0.3s ease-out;\r\n}\r\n.waves-effect .waves-ripple {\r\n  position: absolute;\r\n  border-radius: 50%;\r\n  width: 20px;\r\n  height: 20px;\r\n  margin-top: -10px;\r\n  margin-left: -10px;\r\n  opacity: 0;\r\n  background: rgba(0, 0, 0, 0.2);\r\n  transition: all 0.7s ease-out;\r\n  transition-property: transform, opacity;\r\n  transform: scale(0);\r\n  pointer-events: none;\r\n}\r\n.waves-effect.waves-light .waves-ripple {\r\n  background-color: rgba(255, 255, 255, 0.45);\r\n}\r\n.waves-effect.waves-red .waves-ripple {\r\n  background-color: rgba(244, 67, 54, 0.7);\r\n}\r\n.waves-effect.waves-yellow .waves-ripple {\r\n  background-color: rgba(255, 235, 59, 0.7);\r\n}\r\n.waves-effect.waves-orange .waves-ripple {\r\n  background-color: rgba(255, 152, 0, 0.7);\r\n}\r\n.waves-effect.waves-purple .waves-ripple {\r\n  background-color: rgba(156, 39, 176, 0.7);\r\n}\r\n.waves-effect.waves-green .waves-ripple {\r\n  background-color: rgba(76, 175, 80, 0.7);\r\n}\r\n.waves-effect.waves-teal .waves-ripple {\r\n  background-color: rgba(0, 150, 136, 0.7);\r\n}\r\n.waves-effect.waves-primary .waves-ripple {\r\n  background-color: rgba(59, 175, 218, 0.4);\r\n}\r\n.waves-notransition {\r\n  transition: none !important;\r\n}\r\n.waves-circle {\r\n  transform: translateZ(0);\r\n  text-align: center;\r\n  width: 2.5em;\r\n  height: 2.5em;\r\n  line-height: 2.5em;\r\n  border-radius: 50%;\r\n  -webkit-mask-image: none;\r\n}\r\n.waves-input-wrapper {\r\n  border-radius: 0.2em;\r\n  vertical-align: bottom;\r\n}\r\n.waves-input-wrapper .waves-button-input {\r\n  position: relative;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 1;\r\n}\r\n.waves-block {\r\n  display: block;\r\n}\r\n/* ===========\r\n  Animation\r\n =============*/\r\n/* Bounce 1 */\r\n@keyframes cd-bounce-1 {\r\n  0% {\r\n    opacity: 0;\r\n    transform: scale(0.5);\r\n  }\r\n  60% {\r\n    opacity: 1;\r\n    transform: scale(1.2);\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    transform: scale(1);\r\n  }\r\n}\r\n/* Bounce 2 */\r\n@keyframes cd-bounce-2 {\r\n  0% {\r\n    opacity: 0;\r\n    transform: translateX(-100px);\r\n  }\r\n  60% {\r\n    opacity: 1;\r\n    transform: translateX(20px);\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    transform: translateX(0);\r\n  }\r\n}\r\n/* Dropdown */\r\n@keyframes dropdownOpen {\r\n  0% {\r\n    opacity: 0;\r\n    transform: scale(0);\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    transform: scale(1);\r\n  }\r\n}\r\n/* Progressbar Animated */\r\n@keyframes animationProgress {\r\n  from {\r\n    width: 0;\r\n  }\r\n}\r\n/* Portlets loader */\r\n@keyframes loaderAnimate {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: rotate(220deg);\r\n  }\r\n}\r\n@keyframes loaderAnimate2 {\r\n  0% {\r\n    box-shadow: inset #555 0 0 0 8px;\r\n    transform: rotate(-140deg);\r\n  }\r\n  50% {\r\n    box-shadow: inset #555 0 0 0 2px;\r\n  }\r\n  100% {\r\n    box-shadow: inset #555 0 0 0 8px;\r\n    transform: rotate(140deg);\r\n  }\r\n}\r\n@keyframes loaderAnimate2 {\r\n  0% {\r\n    box-shadow: inset #999 0 0 0 17px;\r\n    transform: rotate(-140deg);\r\n  }\r\n  50% {\r\n    box-shadow: inset #999 0 0 0 2px;\r\n  }\r\n  100% {\r\n    box-shadow: inset #999 0 0 0 17px;\r\n    transform: rotate(140deg);\r\n  }\r\n}\r\n/* =============\r\n   Print css\r\n============= */\r\n@media print {\r\n  .logo,\r\n  .breadcrumb,\r\n  .page-title,\r\n  .footer,\r\n  .topbar-left {\r\n    display: none;\r\n    margin: 0px;\r\n    padding: 0px;\r\n  }\r\n  .left,\r\n  .right-bar {\r\n    display: none;\r\n  }\r\n  .content {\r\n    margin-top: 0px !important;\r\n    padding-top: 0px;\r\n  }\r\n  .content-page {\r\n    margin-left: 0px !important;\r\n    margin-top: 0px;\r\n  }\r\n}\r\n"; });
define('text!main/statistics/statistics.html', ['module'], function(module) { module.exports = "<template>\r\n  <ul class=\"nav nav-pills m-b-15\">\r\n      <li class=\"active\"><a data-toggle=\"pill\" href=\"#current\" aria-expanded=\"true\"><h4>Tournaments</h4></a></li>\r\n      <li><a data-toggle=\"pill\" href=\"#season\" aria-expanded=\"true\"><h4>Season</h4></a></li>\r\n      <li><a data-toggle=\"pill\" href=\"#monthly\" aria-expanded=\"true\"><h4>Monthly</h4></a></li>\r\n      <li><a data-toggle=\"pill\" href=\"#majors\" aria-expanded=\"true\"><h4>Majors</h4></a></li>\r\n      <li><a data-toggle=\"pill\" href=\"#playoffs\" aria-expanded=\"true\"><h4>Playoffs</h4></a></li>\r\n  </ul>\r\n  <div class=\"tab-content br-n pn\">\r\n    <div id=\"current\" class=\"tab-pane fade in active\">\r\n      <current-stats></current-stats>\r\n    </div>\r\n    <div id=\"season\" class=\"tab-pane fade\">\r\n      <season-stats></season-stats>\r\n    </div>\r\n    <div id=\"monthly\" class=\"tab-pane fade\">\r\n      <monthly-stats></season-stats>\r\n    </div>\r\n    <div id=\"majors\" class=\"tab-pane fade\">\r\n      <majors-stats></season-stats>\r\n    </div>\r\n    <div id=\"playoffs\" class=\"tab-pane fade\">\r\n      <playoff-stats></season-stats>\r\n    </div>            \r\n    <div id=\"history\" class=\"tab-pane fade\">\r\n      <history-stats></season-stats>\r\n    </div>    \r\n  </div>\r\n</template>"; });
define('text!resources/styles/minton/css/elements.css', ['module'], function(module) { module.exports = ""; });
define('text!main/winners/winners.html', ['module'], function(module) { module.exports = "<template>\r\n    Info regarding which poolie has in each category will go here.\r\n</template>"; });
define('text!resources/styles/minton/css/icons.css', ['module'], function(module) { module.exports = "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);\r\n@import url(https://fonts.googleapis.com/css?family=Poppins:500,600);\r\n@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:600,400,700);\r\n/*\r\nTemplate Name: Minton Dashboard\r\nAuthor: CoderThemes\r\nEmail: coderthemes@gmail.com\r\nFile: Icons\r\n*/\r\n/*!\r\n *  Font Awesome 4.5.0 by @davegandy - http://fontawesome.io - @fontawesome\r\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\r\n */\r\n/* FONT PATH\r\n * -------------------------- */\r\n@font-face {\r\n  font-family: 'FontAwesome';\r\n  src: url('../fonts/fontawesome-webfont.eot?v=4.5.0');\r\n  src: url('../fonts/fontawesome-webfont.eot?#iefix&v=4.5.0') format('embedded-opentype'), url('../fonts/fontawesome-webfont.woff2?v=4.5.0') format('woff2'), url('../fonts/fontawesome-webfont.woff?v=4.5.0') format('woff'), url('../fonts/fontawesome-webfont.ttf?v=4.5.0') format('truetype'), url('../fonts/fontawesome-webfont.svg?v=4.5.0#fontawesomeregular') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n.fa {\r\n  display: inline-block;\r\n  font: normal normal normal 14px/1 FontAwesome;\r\n  font-size: inherit;\r\n  text-rendering: auto;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n/* makes the font 33% larger relative to the icon container */\r\n.fa-lg {\r\n  font-size: 1.33333333em;\r\n  line-height: 0.75em;\r\n  vertical-align: -15%;\r\n}\r\n.fa-2x {\r\n  font-size: 2em;\r\n}\r\n.fa-3x {\r\n  font-size: 3em;\r\n}\r\n.fa-4x {\r\n  font-size: 4em;\r\n}\r\n.fa-5x {\r\n  font-size: 5em;\r\n}\r\n.fa-fw {\r\n  width: 1.28571429em;\r\n  text-align: center;\r\n}\r\n.fa-ul {\r\n  padding-left: 0;\r\n  margin-left: 2.14285714em;\r\n  list-style-type: none;\r\n}\r\n.fa-ul > li {\r\n  position: relative;\r\n}\r\n.fa-li {\r\n  position: absolute;\r\n  left: -2.14285714em;\r\n  width: 2.14285714em;\r\n  top: 0.14285714em;\r\n  text-align: center;\r\n}\r\n.fa-li.fa-lg {\r\n  left: -1.85714286em;\r\n}\r\n.fa-border {\r\n  padding: .2em .25em .15em;\r\n  border: solid 0.08em #eeeeee;\r\n  border-radius: .1em;\r\n}\r\n.fa-pull-left {\r\n  float: left;\r\n}\r\n.fa-pull-right {\r\n  float: right;\r\n}\r\n.fa.fa-pull-left {\r\n  margin-right: .3em;\r\n}\r\n.fa.fa-pull-right {\r\n  margin-left: .3em;\r\n}\r\n/* Deprecated as of 4.4.0 */\r\n.pull-right {\r\n  float: right;\r\n}\r\n.pull-left {\r\n  float: left;\r\n}\r\n.fa.pull-left {\r\n  margin-right: .3em;\r\n}\r\n.fa.pull-right {\r\n  margin-left: .3em;\r\n}\r\n.fa-spin {\r\n  animation: fa-spin 2s infinite linear;\r\n}\r\n.fa-pulse {\r\n  animation: fa-spin 1s infinite steps(8);\r\n}\r\n@keyframes fa-spin {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: rotate(359deg);\r\n  }\r\n}\r\n.fa-rotate-90 {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\r\n  transform: rotate(90deg);\r\n}\r\n.fa-rotate-180 {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\r\n  transform: rotate(180deg);\r\n}\r\n.fa-rotate-270 {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);\r\n  transform: rotate(270deg);\r\n}\r\n.fa-flip-horizontal {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);\r\n  transform: scale(-1, 1);\r\n}\r\n.fa-flip-vertical {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);\r\n  transform: scale(1, -1);\r\n}\r\n:root .fa-rotate-90,\r\n:root .fa-rotate-180,\r\n:root .fa-rotate-270,\r\n:root .fa-flip-horizontal,\r\n:root .fa-flip-vertical {\r\n  filter: none;\r\n}\r\n.fa-stack {\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 2em;\r\n  height: 2em;\r\n  line-height: 2em;\r\n  vertical-align: middle;\r\n}\r\n.fa-stack-1x,\r\n.fa-stack-2x {\r\n  position: absolute;\r\n  left: 0;\r\n  width: 100%;\r\n  text-align: center;\r\n}\r\n.fa-stack-1x {\r\n  line-height: inherit;\r\n}\r\n.fa-stack-2x {\r\n  font-size: 2em;\r\n}\r\n.fa-inverse {\r\n  color: #ffffff;\r\n}\r\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\r\n   readers do not read off random characters that represent icons */\r\n.fa-glass:before {\r\n  content: \"\\f000\";\r\n}\r\n.fa-music:before {\r\n  content: \"\\f001\";\r\n}\r\n.fa-search:before {\r\n  content: \"\\f002\";\r\n}\r\n.fa-envelope-o:before {\r\n  content: \"\\f003\";\r\n}\r\n.fa-heart:before {\r\n  content: \"\\f004\";\r\n}\r\n.fa-star:before {\r\n  content: \"\\f005\";\r\n}\r\n.fa-star-o:before {\r\n  content: \"\\f006\";\r\n}\r\n.fa-user:before {\r\n  content: \"\\f007\";\r\n}\r\n.fa-film:before {\r\n  content: \"\\f008\";\r\n}\r\n.fa-th-large:before {\r\n  content: \"\\f009\";\r\n}\r\n.fa-th:before {\r\n  content: \"\\f00a\";\r\n}\r\n.fa-th-list:before {\r\n  content: \"\\f00b\";\r\n}\r\n.fa-check:before {\r\n  content: \"\\f00c\";\r\n}\r\n.fa-remove:before,\r\n.fa-close:before,\r\n.fa-times:before {\r\n  content: \"\\f00d\";\r\n}\r\n.fa-search-plus:before {\r\n  content: \"\\f00e\";\r\n}\r\n.fa-search-minus:before {\r\n  content: \"\\f010\";\r\n}\r\n.fa-power-off:before {\r\n  content: \"\\f011\";\r\n}\r\n.fa-signal:before {\r\n  content: \"\\f012\";\r\n}\r\n.fa-gear:before,\r\n.fa-cog:before {\r\n  content: \"\\f013\";\r\n}\r\n.fa-trash-o:before {\r\n  content: \"\\f014\";\r\n}\r\n.fa-home:before {\r\n  content: \"\\f015\";\r\n}\r\n.fa-file-o:before {\r\n  content: \"\\f016\";\r\n}\r\n.fa-clock-o:before {\r\n  content: \"\\f017\";\r\n}\r\n.fa-road:before {\r\n  content: \"\\f018\";\r\n}\r\n.fa-download:before {\r\n  content: \"\\f019\";\r\n}\r\n.fa-arrow-circle-o-down:before {\r\n  content: \"\\f01a\";\r\n}\r\n.fa-arrow-circle-o-up:before {\r\n  content: \"\\f01b\";\r\n}\r\n.fa-inbox:before {\r\n  content: \"\\f01c\";\r\n}\r\n.fa-play-circle-o:before {\r\n  content: \"\\f01d\";\r\n}\r\n.fa-rotate-right:before,\r\n.fa-repeat:before {\r\n  content: \"\\f01e\";\r\n}\r\n.fa-refresh:before {\r\n  content: \"\\f021\";\r\n}\r\n.fa-list-alt:before {\r\n  content: \"\\f022\";\r\n}\r\n.fa-lock:before {\r\n  content: \"\\f023\";\r\n}\r\n.fa-flag:before {\r\n  content: \"\\f024\";\r\n}\r\n.fa-headphones:before {\r\n  content: \"\\f025\";\r\n}\r\n.fa-volume-off:before {\r\n  content: \"\\f026\";\r\n}\r\n.fa-volume-down:before {\r\n  content: \"\\f027\";\r\n}\r\n.fa-volume-up:before {\r\n  content: \"\\f028\";\r\n}\r\n.fa-qrcode:before {\r\n  content: \"\\f029\";\r\n}\r\n.fa-barcode:before {\r\n  content: \"\\f02a\";\r\n}\r\n.fa-tag:before {\r\n  content: \"\\f02b\";\r\n}\r\n.fa-tags:before {\r\n  content: \"\\f02c\";\r\n}\r\n.fa-book:before {\r\n  content: \"\\f02d\";\r\n}\r\n.fa-bookmark:before {\r\n  content: \"\\f02e\";\r\n}\r\n.fa-print:before {\r\n  content: \"\\f02f\";\r\n}\r\n.fa-camera:before {\r\n  content: \"\\f030\";\r\n}\r\n.fa-font:before {\r\n  content: \"\\f031\";\r\n}\r\n.fa-bold:before {\r\n  content: \"\\f032\";\r\n}\r\n.fa-italic:before {\r\n  content: \"\\f033\";\r\n}\r\n.fa-text-height:before {\r\n  content: \"\\f034\";\r\n}\r\n.fa-text-width:before {\r\n  content: \"\\f035\";\r\n}\r\n.fa-align-left:before {\r\n  content: \"\\f036\";\r\n}\r\n.fa-align-center:before {\r\n  content: \"\\f037\";\r\n}\r\n.fa-align-right:before {\r\n  content: \"\\f038\";\r\n}\r\n.fa-align-justify:before {\r\n  content: \"\\f039\";\r\n}\r\n.fa-list:before {\r\n  content: \"\\f03a\";\r\n}\r\n.fa-dedent:before,\r\n.fa-outdent:before {\r\n  content: \"\\f03b\";\r\n}\r\n.fa-indent:before {\r\n  content: \"\\f03c\";\r\n}\r\n.fa-video-camera:before {\r\n  content: \"\\f03d\";\r\n}\r\n.fa-photo:before,\r\n.fa-image:before,\r\n.fa-picture-o:before {\r\n  content: \"\\f03e\";\r\n}\r\n.fa-pencil:before {\r\n  content: \"\\f040\";\r\n}\r\n.fa-map-marker:before {\r\n  content: \"\\f041\";\r\n}\r\n.fa-adjust:before {\r\n  content: \"\\f042\";\r\n}\r\n.fa-tint:before {\r\n  content: \"\\f043\";\r\n}\r\n.fa-edit:before,\r\n.fa-pencil-square-o:before {\r\n  content: \"\\f044\";\r\n}\r\n.fa-share-square-o:before {\r\n  content: \"\\f045\";\r\n}\r\n.fa-check-square-o:before {\r\n  content: \"\\f046\";\r\n}\r\n.fa-arrows:before {\r\n  content: \"\\f047\";\r\n}\r\n.fa-step-backward:before {\r\n  content: \"\\f048\";\r\n}\r\n.fa-fast-backward:before {\r\n  content: \"\\f049\";\r\n}\r\n.fa-backward:before {\r\n  content: \"\\f04a\";\r\n}\r\n.fa-play:before {\r\n  content: \"\\f04b\";\r\n}\r\n.fa-pause:before {\r\n  content: \"\\f04c\";\r\n}\r\n.fa-stop:before {\r\n  content: \"\\f04d\";\r\n}\r\n.fa-forward:before {\r\n  content: \"\\f04e\";\r\n}\r\n.fa-fast-forward:before {\r\n  content: \"\\f050\";\r\n}\r\n.fa-step-forward:before {\r\n  content: \"\\f051\";\r\n}\r\n.fa-eject:before {\r\n  content: \"\\f052\";\r\n}\r\n.fa-chevron-left:before {\r\n  content: \"\\f053\";\r\n}\r\n.fa-chevron-right:before {\r\n  content: \"\\f054\";\r\n}\r\n.fa-plus-circle:before {\r\n  content: \"\\f055\";\r\n}\r\n.fa-minus-circle:before {\r\n  content: \"\\f056\";\r\n}\r\n.fa-times-circle:before {\r\n  content: \"\\f057\";\r\n}\r\n.fa-check-circle:before {\r\n  content: \"\\f058\";\r\n}\r\n.fa-question-circle:before {\r\n  content: \"\\f059\";\r\n}\r\n.fa-info-circle:before {\r\n  content: \"\\f05a\";\r\n}\r\n.fa-crosshairs:before {\r\n  content: \"\\f05b\";\r\n}\r\n.fa-times-circle-o:before {\r\n  content: \"\\f05c\";\r\n}\r\n.fa-check-circle-o:before {\r\n  content: \"\\f05d\";\r\n}\r\n.fa-ban:before {\r\n  content: \"\\f05e\";\r\n}\r\n.fa-arrow-left:before {\r\n  content: \"\\f060\";\r\n}\r\n.fa-arrow-right:before {\r\n  content: \"\\f061\";\r\n}\r\n.fa-arrow-up:before {\r\n  content: \"\\f062\";\r\n}\r\n.fa-arrow-down:before {\r\n  content: \"\\f063\";\r\n}\r\n.fa-mail-forward:before,\r\n.fa-share:before {\r\n  content: \"\\f064\";\r\n}\r\n.fa-expand:before {\r\n  content: \"\\f065\";\r\n}\r\n.fa-compress:before {\r\n  content: \"\\f066\";\r\n}\r\n.fa-plus:before {\r\n  content: \"\\f067\";\r\n}\r\n.fa-minus:before {\r\n  content: \"\\f068\";\r\n}\r\n.fa-asterisk:before {\r\n  content: \"\\f069\";\r\n}\r\n.fa-exclamation-circle:before {\r\n  content: \"\\f06a\";\r\n}\r\n.fa-gift:before {\r\n  content: \"\\f06b\";\r\n}\r\n.fa-leaf:before {\r\n  content: \"\\f06c\";\r\n}\r\n.fa-fire:before {\r\n  content: \"\\f06d\";\r\n}\r\n.fa-eye:before {\r\n  content: \"\\f06e\";\r\n}\r\n.fa-eye-slash:before {\r\n  content: \"\\f070\";\r\n}\r\n.fa-warning:before,\r\n.fa-exclamation-triangle:before {\r\n  content: \"\\f071\";\r\n}\r\n.fa-plane:before {\r\n  content: \"\\f072\";\r\n}\r\n.fa-calendar:before {\r\n  content: \"\\f073\";\r\n}\r\n.fa-random:before {\r\n  content: \"\\f074\";\r\n}\r\n.fa-comment:before {\r\n  content: \"\\f075\";\r\n}\r\n.fa-magnet:before {\r\n  content: \"\\f076\";\r\n}\r\n.fa-chevron-up:before {\r\n  content: \"\\f077\";\r\n}\r\n.fa-chevron-down:before {\r\n  content: \"\\f078\";\r\n}\r\n.fa-retweet:before {\r\n  content: \"\\f079\";\r\n}\r\n.fa-shopping-cart:before {\r\n  content: \"\\f07a\";\r\n}\r\n.fa-folder:before {\r\n  content: \"\\f07b\";\r\n}\r\n.fa-folder-open:before {\r\n  content: \"\\f07c\";\r\n}\r\n.fa-arrows-v:before {\r\n  content: \"\\f07d\";\r\n}\r\n.fa-arrows-h:before {\r\n  content: \"\\f07e\";\r\n}\r\n.fa-bar-chart-o:before,\r\n.fa-bar-chart:before {\r\n  content: \"\\f080\";\r\n}\r\n.fa-twitter-square:before {\r\n  content: \"\\f081\";\r\n}\r\n.fa-facebook-square:before {\r\n  content: \"\\f082\";\r\n}\r\n.fa-camera-retro:before {\r\n  content: \"\\f083\";\r\n}\r\n.fa-key:before {\r\n  content: \"\\f084\";\r\n}\r\n.fa-gears:before,\r\n.fa-cogs:before {\r\n  content: \"\\f085\";\r\n}\r\n.fa-comments:before {\r\n  content: \"\\f086\";\r\n}\r\n.fa-thumbs-o-up:before {\r\n  content: \"\\f087\";\r\n}\r\n.fa-thumbs-o-down:before {\r\n  content: \"\\f088\";\r\n}\r\n.fa-star-half:before {\r\n  content: \"\\f089\";\r\n}\r\n.fa-heart-o:before {\r\n  content: \"\\f08a\";\r\n}\r\n.fa-sign-out:before {\r\n  content: \"\\f08b\";\r\n}\r\n.fa-linkedin-square:before {\r\n  content: \"\\f08c\";\r\n}\r\n.fa-thumb-tack:before {\r\n  content: \"\\f08d\";\r\n}\r\n.fa-external-link:before {\r\n  content: \"\\f08e\";\r\n}\r\n.fa-sign-in:before {\r\n  content: \"\\f090\";\r\n}\r\n.fa-trophy:before {\r\n  content: \"\\f091\";\r\n}\r\n.fa-github-square:before {\r\n  content: \"\\f092\";\r\n}\r\n.fa-upload:before {\r\n  content: \"\\f093\";\r\n}\r\n.fa-lemon-o:before {\r\n  content: \"\\f094\";\r\n}\r\n.fa-phone:before {\r\n  content: \"\\f095\";\r\n}\r\n.fa-square-o:before {\r\n  content: \"\\f096\";\r\n}\r\n.fa-bookmark-o:before {\r\n  content: \"\\f097\";\r\n}\r\n.fa-phone-square:before {\r\n  content: \"\\f098\";\r\n}\r\n.fa-twitter:before {\r\n  content: \"\\f099\";\r\n}\r\n.fa-facebook-f:before,\r\n.fa-facebook:before {\r\n  content: \"\\f09a\";\r\n}\r\n.fa-github:before {\r\n  content: \"\\f09b\";\r\n}\r\n.fa-unlock:before {\r\n  content: \"\\f09c\";\r\n}\r\n.fa-credit-card:before {\r\n  content: \"\\f09d\";\r\n}\r\n.fa-feed:before,\r\n.fa-rss:before {\r\n  content: \"\\f09e\";\r\n}\r\n.fa-hdd-o:before {\r\n  content: \"\\f0a0\";\r\n}\r\n.fa-bullhorn:before {\r\n  content: \"\\f0a1\";\r\n}\r\n.fa-bell:before {\r\n  content: \"\\f0f3\";\r\n}\r\n.fa-certificate:before {\r\n  content: \"\\f0a3\";\r\n}\r\n.fa-hand-o-right:before {\r\n  content: \"\\f0a4\";\r\n}\r\n.fa-hand-o-left:before {\r\n  content: \"\\f0a5\";\r\n}\r\n.fa-hand-o-up:before {\r\n  content: \"\\f0a6\";\r\n}\r\n.fa-hand-o-down:before {\r\n  content: \"\\f0a7\";\r\n}\r\n.fa-arrow-circle-left:before {\r\n  content: \"\\f0a8\";\r\n}\r\n.fa-arrow-circle-right:before {\r\n  content: \"\\f0a9\";\r\n}\r\n.fa-arrow-circle-up:before {\r\n  content: \"\\f0aa\";\r\n}\r\n.fa-arrow-circle-down:before {\r\n  content: \"\\f0ab\";\r\n}\r\n.fa-globe:before {\r\n  content: \"\\f0ac\";\r\n}\r\n.fa-wrench:before {\r\n  content: \"\\f0ad\";\r\n}\r\n.fa-tasks:before {\r\n  content: \"\\f0ae\";\r\n}\r\n.fa-filter:before {\r\n  content: \"\\f0b0\";\r\n}\r\n.fa-briefcase:before {\r\n  content: \"\\f0b1\";\r\n}\r\n.fa-arrows-alt:before {\r\n  content: \"\\f0b2\";\r\n}\r\n.fa-group:before,\r\n.fa-users:before {\r\n  content: \"\\f0c0\";\r\n}\r\n.fa-chain:before,\r\n.fa-link:before {\r\n  content: \"\\f0c1\";\r\n}\r\n.fa-cloud:before {\r\n  content: \"\\f0c2\";\r\n}\r\n.fa-flask:before {\r\n  content: \"\\f0c3\";\r\n}\r\n.fa-cut:before,\r\n.fa-scissors:before {\r\n  content: \"\\f0c4\";\r\n}\r\n.fa-copy:before,\r\n.fa-files-o:before {\r\n  content: \"\\f0c5\";\r\n}\r\n.fa-paperclip:before {\r\n  content: \"\\f0c6\";\r\n}\r\n.fa-save:before,\r\n.fa-floppy-o:before {\r\n  content: \"\\f0c7\";\r\n}\r\n.fa-square:before {\r\n  content: \"\\f0c8\";\r\n}\r\n.fa-navicon:before,\r\n.fa-reorder:before,\r\n.fa-bars:before {\r\n  content: \"\\f0c9\";\r\n}\r\n.fa-list-ul:before {\r\n  content: \"\\f0ca\";\r\n}\r\n.fa-list-ol:before {\r\n  content: \"\\f0cb\";\r\n}\r\n.fa-strikethrough:before {\r\n  content: \"\\f0cc\";\r\n}\r\n.fa-underline:before {\r\n  content: \"\\f0cd\";\r\n}\r\n.fa-table:before {\r\n  content: \"\\f0ce\";\r\n}\r\n.fa-magic:before {\r\n  content: \"\\f0d0\";\r\n}\r\n.fa-truck:before {\r\n  content: \"\\f0d1\";\r\n}\r\n.fa-pinterest:before {\r\n  content: \"\\f0d2\";\r\n}\r\n.fa-pinterest-square:before {\r\n  content: \"\\f0d3\";\r\n}\r\n.fa-google-plus-square:before {\r\n  content: \"\\f0d4\";\r\n}\r\n.fa-google-plus:before {\r\n  content: \"\\f0d5\";\r\n}\r\n.fa-money:before {\r\n  content: \"\\f0d6\";\r\n}\r\n.fa-caret-down:before {\r\n  content: \"\\f0d7\";\r\n}\r\n.fa-caret-up:before {\r\n  content: \"\\f0d8\";\r\n}\r\n.fa-caret-left:before {\r\n  content: \"\\f0d9\";\r\n}\r\n.fa-caret-right:before {\r\n  content: \"\\f0da\";\r\n}\r\n.fa-columns:before {\r\n  content: \"\\f0db\";\r\n}\r\n.fa-unsorted:before,\r\n.fa-sort:before {\r\n  content: \"\\f0dc\";\r\n}\r\n.fa-sort-down:before,\r\n.fa-sort-desc:before {\r\n  content: \"\\f0dd\";\r\n}\r\n.fa-sort-up:before,\r\n.fa-sort-asc:before {\r\n  content: \"\\f0de\";\r\n}\r\n.fa-envelope:before {\r\n  content: \"\\f0e0\";\r\n}\r\n.fa-linkedin:before {\r\n  content: \"\\f0e1\";\r\n}\r\n.fa-rotate-left:before,\r\n.fa-undo:before {\r\n  content: \"\\f0e2\";\r\n}\r\n.fa-legal:before,\r\n.fa-gavel:before {\r\n  content: \"\\f0e3\";\r\n}\r\n.fa-dashboard:before,\r\n.fa-tachometer:before {\r\n  content: \"\\f0e4\";\r\n}\r\n.fa-comment-o:before {\r\n  content: \"\\f0e5\";\r\n}\r\n.fa-comments-o:before {\r\n  content: \"\\f0e6\";\r\n}\r\n.fa-flash:before,\r\n.fa-bolt:before {\r\n  content: \"\\f0e7\";\r\n}\r\n.fa-sitemap:before {\r\n  content: \"\\f0e8\";\r\n}\r\n.fa-umbrella:before {\r\n  content: \"\\f0e9\";\r\n}\r\n.fa-paste:before,\r\n.fa-clipboard:before {\r\n  content: \"\\f0ea\";\r\n}\r\n.fa-lightbulb-o:before {\r\n  content: \"\\f0eb\";\r\n}\r\n.fa-exchange:before {\r\n  content: \"\\f0ec\";\r\n}\r\n.fa-cloud-download:before {\r\n  content: \"\\f0ed\";\r\n}\r\n.fa-cloud-upload:before {\r\n  content: \"\\f0ee\";\r\n}\r\n.fa-user-md:before {\r\n  content: \"\\f0f0\";\r\n}\r\n.fa-stethoscope:before {\r\n  content: \"\\f0f1\";\r\n}\r\n.fa-suitcase:before {\r\n  content: \"\\f0f2\";\r\n}\r\n.fa-bell-o:before {\r\n  content: \"\\f0a2\";\r\n}\r\n.fa-coffee:before {\r\n  content: \"\\f0f4\";\r\n}\r\n.fa-cutlery:before {\r\n  content: \"\\f0f5\";\r\n}\r\n.fa-file-text-o:before {\r\n  content: \"\\f0f6\";\r\n}\r\n.fa-building-o:before {\r\n  content: \"\\f0f7\";\r\n}\r\n.fa-hospital-o:before {\r\n  content: \"\\f0f8\";\r\n}\r\n.fa-ambulance:before {\r\n  content: \"\\f0f9\";\r\n}\r\n.fa-medkit:before {\r\n  content: \"\\f0fa\";\r\n}\r\n.fa-fighter-jet:before {\r\n  content: \"\\f0fb\";\r\n}\r\n.fa-beer:before {\r\n  content: \"\\f0fc\";\r\n}\r\n.fa-h-square:before {\r\n  content: \"\\f0fd\";\r\n}\r\n.fa-plus-square:before {\r\n  content: \"\\f0fe\";\r\n}\r\n.fa-angle-double-left:before {\r\n  content: \"\\f100\";\r\n}\r\n.fa-angle-double-right:before {\r\n  content: \"\\f101\";\r\n}\r\n.fa-angle-double-up:before {\r\n  content: \"\\f102\";\r\n}\r\n.fa-angle-double-down:before {\r\n  content: \"\\f103\";\r\n}\r\n.fa-angle-left:before {\r\n  content: \"\\f104\";\r\n}\r\n.fa-angle-right:before {\r\n  content: \"\\f105\";\r\n}\r\n.fa-angle-up:before {\r\n  content: \"\\f106\";\r\n}\r\n.fa-angle-down:before {\r\n  content: \"\\f107\";\r\n}\r\n.fa-desktop:before {\r\n  content: \"\\f108\";\r\n}\r\n.fa-laptop:before {\r\n  content: \"\\f109\";\r\n}\r\n.fa-tablet:before {\r\n  content: \"\\f10a\";\r\n}\r\n.fa-mobile-phone:before,\r\n.fa-mobile:before {\r\n  content: \"\\f10b\";\r\n}\r\n.fa-circle-o:before {\r\n  content: \"\\f10c\";\r\n}\r\n.fa-quote-left:before {\r\n  content: \"\\f10d\";\r\n}\r\n.fa-quote-right:before {\r\n  content: \"\\f10e\";\r\n}\r\n.fa-spinner:before {\r\n  content: \"\\f110\";\r\n}\r\n.fa-circle:before {\r\n  content: \"\\f111\";\r\n}\r\n.fa-mail-reply:before,\r\n.fa-reply:before {\r\n  content: \"\\f112\";\r\n}\r\n.fa-github-alt:before {\r\n  content: \"\\f113\";\r\n}\r\n.fa-folder-o:before {\r\n  content: \"\\f114\";\r\n}\r\n.fa-folder-open-o:before {\r\n  content: \"\\f115\";\r\n}\r\n.fa-smile-o:before {\r\n  content: \"\\f118\";\r\n}\r\n.fa-frown-o:before {\r\n  content: \"\\f119\";\r\n}\r\n.fa-meh-o:before {\r\n  content: \"\\f11a\";\r\n}\r\n.fa-gamepad:before {\r\n  content: \"\\f11b\";\r\n}\r\n.fa-keyboard-o:before {\r\n  content: \"\\f11c\";\r\n}\r\n.fa-flag-o:before {\r\n  content: \"\\f11d\";\r\n}\r\n.fa-flag-checkered:before {\r\n  content: \"\\f11e\";\r\n}\r\n.fa-terminal:before {\r\n  content: \"\\f120\";\r\n}\r\n.fa-code:before {\r\n  content: \"\\f121\";\r\n}\r\n.fa-mail-reply-all:before,\r\n.fa-reply-all:before {\r\n  content: \"\\f122\";\r\n}\r\n.fa-star-half-empty:before,\r\n.fa-star-half-full:before,\r\n.fa-star-half-o:before {\r\n  content: \"\\f123\";\r\n}\r\n.fa-location-arrow:before {\r\n  content: \"\\f124\";\r\n}\r\n.fa-crop:before {\r\n  content: \"\\f125\";\r\n}\r\n.fa-code-fork:before {\r\n  content: \"\\f126\";\r\n}\r\n.fa-unlink:before,\r\n.fa-chain-broken:before {\r\n  content: \"\\f127\";\r\n}\r\n.fa-question:before {\r\n  content: \"\\f128\";\r\n}\r\n.fa-info:before {\r\n  content: \"\\f129\";\r\n}\r\n.fa-exclamation:before {\r\n  content: \"\\f12a\";\r\n}\r\n.fa-superscript:before {\r\n  content: \"\\f12b\";\r\n}\r\n.fa-subscript:before {\r\n  content: \"\\f12c\";\r\n}\r\n.fa-eraser:before {\r\n  content: \"\\f12d\";\r\n}\r\n.fa-puzzle-piece:before {\r\n  content: \"\\f12e\";\r\n}\r\n.fa-microphone:before {\r\n  content: \"\\f130\";\r\n}\r\n.fa-microphone-slash:before {\r\n  content: \"\\f131\";\r\n}\r\n.fa-shield:before {\r\n  content: \"\\f132\";\r\n}\r\n.fa-calendar-o:before {\r\n  content: \"\\f133\";\r\n}\r\n.fa-fire-extinguisher:before {\r\n  content: \"\\f134\";\r\n}\r\n.fa-rocket:before {\r\n  content: \"\\f135\";\r\n}\r\n.fa-maxcdn:before {\r\n  content: \"\\f136\";\r\n}\r\n.fa-chevron-circle-left:before {\r\n  content: \"\\f137\";\r\n}\r\n.fa-chevron-circle-right:before {\r\n  content: \"\\f138\";\r\n}\r\n.fa-chevron-circle-up:before {\r\n  content: \"\\f139\";\r\n}\r\n.fa-chevron-circle-down:before {\r\n  content: \"\\f13a\";\r\n}\r\n.fa-html5:before {\r\n  content: \"\\f13b\";\r\n}\r\n.fa-css3:before {\r\n  content: \"\\f13c\";\r\n}\r\n.fa-anchor:before {\r\n  content: \"\\f13d\";\r\n}\r\n.fa-unlock-alt:before {\r\n  content: \"\\f13e\";\r\n}\r\n.fa-bullseye:before {\r\n  content: \"\\f140\";\r\n}\r\n.fa-ellipsis-h:before {\r\n  content: \"\\f141\";\r\n}\r\n.fa-ellipsis-v:before {\r\n  content: \"\\f142\";\r\n}\r\n.fa-rss-square:before {\r\n  content: \"\\f143\";\r\n}\r\n.fa-play-circle:before {\r\n  content: \"\\f144\";\r\n}\r\n.fa-ticket:before {\r\n  content: \"\\f145\";\r\n}\r\n.fa-minus-square:before {\r\n  content: \"\\f146\";\r\n}\r\n.fa-minus-square-o:before {\r\n  content: \"\\f147\";\r\n}\r\n.fa-level-up:before {\r\n  content: \"\\f148\";\r\n}\r\n.fa-level-down:before {\r\n  content: \"\\f149\";\r\n}\r\n.fa-check-square:before {\r\n  content: \"\\f14a\";\r\n}\r\n.fa-pencil-square:before {\r\n  content: \"\\f14b\";\r\n}\r\n.fa-external-link-square:before {\r\n  content: \"\\f14c\";\r\n}\r\n.fa-share-square:before {\r\n  content: \"\\f14d\";\r\n}\r\n.fa-compass:before {\r\n  content: \"\\f14e\";\r\n}\r\n.fa-toggle-down:before,\r\n.fa-caret-square-o-down:before {\r\n  content: \"\\f150\";\r\n}\r\n.fa-toggle-up:before,\r\n.fa-caret-square-o-up:before {\r\n  content: \"\\f151\";\r\n}\r\n.fa-toggle-right:before,\r\n.fa-caret-square-o-right:before {\r\n  content: \"\\f152\";\r\n}\r\n.fa-euro:before,\r\n.fa-eur:before {\r\n  content: \"\\f153\";\r\n}\r\n.fa-gbp:before {\r\n  content: \"\\f154\";\r\n}\r\n.fa-dollar:before,\r\n.fa-usd:before {\r\n  content: \"\\f155\";\r\n}\r\n.fa-rupee:before,\r\n.fa-inr:before {\r\n  content: \"\\f156\";\r\n}\r\n.fa-cny:before,\r\n.fa-rmb:before,\r\n.fa-yen:before,\r\n.fa-jpy:before {\r\n  content: \"\\f157\";\r\n}\r\n.fa-ruble:before,\r\n.fa-rouble:before,\r\n.fa-rub:before {\r\n  content: \"\\f158\";\r\n}\r\n.fa-won:before,\r\n.fa-krw:before {\r\n  content: \"\\f159\";\r\n}\r\n.fa-bitcoin:before,\r\n.fa-btc:before {\r\n  content: \"\\f15a\";\r\n}\r\n.fa-file:before {\r\n  content: \"\\f15b\";\r\n}\r\n.fa-file-text:before {\r\n  content: \"\\f15c\";\r\n}\r\n.fa-sort-alpha-asc:before {\r\n  content: \"\\f15d\";\r\n}\r\n.fa-sort-alpha-desc:before {\r\n  content: \"\\f15e\";\r\n}\r\n.fa-sort-amount-asc:before {\r\n  content: \"\\f160\";\r\n}\r\n.fa-sort-amount-desc:before {\r\n  content: \"\\f161\";\r\n}\r\n.fa-sort-numeric-asc:before {\r\n  content: \"\\f162\";\r\n}\r\n.fa-sort-numeric-desc:before {\r\n  content: \"\\f163\";\r\n}\r\n.fa-thumbs-up:before {\r\n  content: \"\\f164\";\r\n}\r\n.fa-thumbs-down:before {\r\n  content: \"\\f165\";\r\n}\r\n.fa-youtube-square:before {\r\n  content: \"\\f166\";\r\n}\r\n.fa-youtube:before {\r\n  content: \"\\f167\";\r\n}\r\n.fa-xing:before {\r\n  content: \"\\f168\";\r\n}\r\n.fa-xing-square:before {\r\n  content: \"\\f169\";\r\n}\r\n.fa-youtube-play:before {\r\n  content: \"\\f16a\";\r\n}\r\n.fa-dropbox:before {\r\n  content: \"\\f16b\";\r\n}\r\n.fa-stack-overflow:before {\r\n  content: \"\\f16c\";\r\n}\r\n.fa-instagram:before {\r\n  content: \"\\f16d\";\r\n}\r\n.fa-flickr:before {\r\n  content: \"\\f16e\";\r\n}\r\n.fa-adn:before {\r\n  content: \"\\f170\";\r\n}\r\n.fa-bitbucket:before {\r\n  content: \"\\f171\";\r\n}\r\n.fa-bitbucket-square:before {\r\n  content: \"\\f172\";\r\n}\r\n.fa-tumblr:before {\r\n  content: \"\\f173\";\r\n}\r\n.fa-tumblr-square:before {\r\n  content: \"\\f174\";\r\n}\r\n.fa-long-arrow-down:before {\r\n  content: \"\\f175\";\r\n}\r\n.fa-long-arrow-up:before {\r\n  content: \"\\f176\";\r\n}\r\n.fa-long-arrow-left:before {\r\n  content: \"\\f177\";\r\n}\r\n.fa-long-arrow-right:before {\r\n  content: \"\\f178\";\r\n}\r\n.fa-apple:before {\r\n  content: \"\\f179\";\r\n}\r\n.fa-windows:before {\r\n  content: \"\\f17a\";\r\n}\r\n.fa-android:before {\r\n  content: \"\\f17b\";\r\n}\r\n.fa-linux:before {\r\n  content: \"\\f17c\";\r\n}\r\n.fa-dribbble:before {\r\n  content: \"\\f17d\";\r\n}\r\n.fa-skype:before {\r\n  content: \"\\f17e\";\r\n}\r\n.fa-foursquare:before {\r\n  content: \"\\f180\";\r\n}\r\n.fa-trello:before {\r\n  content: \"\\f181\";\r\n}\r\n.fa-female:before {\r\n  content: \"\\f182\";\r\n}\r\n.fa-male:before {\r\n  content: \"\\f183\";\r\n}\r\n.fa-gittip:before,\r\n.fa-gratipay:before {\r\n  content: \"\\f184\";\r\n}\r\n.fa-sun-o:before {\r\n  content: \"\\f185\";\r\n}\r\n.fa-moon-o:before {\r\n  content: \"\\f186\";\r\n}\r\n.fa-archive:before {\r\n  content: \"\\f187\";\r\n}\r\n.fa-bug:before {\r\n  content: \"\\f188\";\r\n}\r\n.fa-vk:before {\r\n  content: \"\\f189\";\r\n}\r\n.fa-weibo:before {\r\n  content: \"\\f18a\";\r\n}\r\n.fa-renren:before {\r\n  content: \"\\f18b\";\r\n}\r\n.fa-pagelines:before {\r\n  content: \"\\f18c\";\r\n}\r\n.fa-stack-exchange:before {\r\n  content: \"\\f18d\";\r\n}\r\n.fa-arrow-circle-o-right:before {\r\n  content: \"\\f18e\";\r\n}\r\n.fa-arrow-circle-o-left:before {\r\n  content: \"\\f190\";\r\n}\r\n.fa-toggle-left:before,\r\n.fa-caret-square-o-left:before {\r\n  content: \"\\f191\";\r\n}\r\n.fa-dot-circle-o:before {\r\n  content: \"\\f192\";\r\n}\r\n.fa-wheelchair:before {\r\n  content: \"\\f193\";\r\n}\r\n.fa-vimeo-square:before {\r\n  content: \"\\f194\";\r\n}\r\n.fa-turkish-lira:before,\r\n.fa-try:before {\r\n  content: \"\\f195\";\r\n}\r\n.fa-plus-square-o:before {\r\n  content: \"\\f196\";\r\n}\r\n.fa-space-shuttle:before {\r\n  content: \"\\f197\";\r\n}\r\n.fa-slack:before {\r\n  content: \"\\f198\";\r\n}\r\n.fa-envelope-square:before {\r\n  content: \"\\f199\";\r\n}\r\n.fa-wordpress:before {\r\n  content: \"\\f19a\";\r\n}\r\n.fa-openid:before {\r\n  content: \"\\f19b\";\r\n}\r\n.fa-institution:before,\r\n.fa-bank:before,\r\n.fa-university:before {\r\n  content: \"\\f19c\";\r\n}\r\n.fa-mortar-board:before,\r\n.fa-graduation-cap:before {\r\n  content: \"\\f19d\";\r\n}\r\n.fa-yahoo:before {\r\n  content: \"\\f19e\";\r\n}\r\n.fa-google:before {\r\n  content: \"\\f1a0\";\r\n}\r\n.fa-reddit:before {\r\n  content: \"\\f1a1\";\r\n}\r\n.fa-reddit-square:before {\r\n  content: \"\\f1a2\";\r\n}\r\n.fa-stumbleupon-circle:before {\r\n  content: \"\\f1a3\";\r\n}\r\n.fa-stumbleupon:before {\r\n  content: \"\\f1a4\";\r\n}\r\n.fa-delicious:before {\r\n  content: \"\\f1a5\";\r\n}\r\n.fa-digg:before {\r\n  content: \"\\f1a6\";\r\n}\r\n.fa-pied-piper:before {\r\n  content: \"\\f1a7\";\r\n}\r\n.fa-pied-piper-alt:before {\r\n  content: \"\\f1a8\";\r\n}\r\n.fa-drupal:before {\r\n  content: \"\\f1a9\";\r\n}\r\n.fa-joomla:before {\r\n  content: \"\\f1aa\";\r\n}\r\n.fa-language:before {\r\n  content: \"\\f1ab\";\r\n}\r\n.fa-fax:before {\r\n  content: \"\\f1ac\";\r\n}\r\n.fa-building:before {\r\n  content: \"\\f1ad\";\r\n}\r\n.fa-child:before {\r\n  content: \"\\f1ae\";\r\n}\r\n.fa-paw:before {\r\n  content: \"\\f1b0\";\r\n}\r\n.fa-spoon:before {\r\n  content: \"\\f1b1\";\r\n}\r\n.fa-cube:before {\r\n  content: \"\\f1b2\";\r\n}\r\n.fa-cubes:before {\r\n  content: \"\\f1b3\";\r\n}\r\n.fa-behance:before {\r\n  content: \"\\f1b4\";\r\n}\r\n.fa-behance-square:before {\r\n  content: \"\\f1b5\";\r\n}\r\n.fa-steam:before {\r\n  content: \"\\f1b6\";\r\n}\r\n.fa-steam-square:before {\r\n  content: \"\\f1b7\";\r\n}\r\n.fa-recycle:before {\r\n  content: \"\\f1b8\";\r\n}\r\n.fa-automobile:before,\r\n.fa-car:before {\r\n  content: \"\\f1b9\";\r\n}\r\n.fa-cab:before,\r\n.fa-taxi:before {\r\n  content: \"\\f1ba\";\r\n}\r\n.fa-tree:before {\r\n  content: \"\\f1bb\";\r\n}\r\n.fa-spotify:before {\r\n  content: \"\\f1bc\";\r\n}\r\n.fa-deviantart:before {\r\n  content: \"\\f1bd\";\r\n}\r\n.fa-soundcloud:before {\r\n  content: \"\\f1be\";\r\n}\r\n.fa-database:before {\r\n  content: \"\\f1c0\";\r\n}\r\n.fa-file-pdf-o:before {\r\n  content: \"\\f1c1\";\r\n}\r\n.fa-file-word-o:before {\r\n  content: \"\\f1c2\";\r\n}\r\n.fa-file-excel-o:before {\r\n  content: \"\\f1c3\";\r\n}\r\n.fa-file-powerpoint-o:before {\r\n  content: \"\\f1c4\";\r\n}\r\n.fa-file-photo-o:before,\r\n.fa-file-picture-o:before,\r\n.fa-file-image-o:before {\r\n  content: \"\\f1c5\";\r\n}\r\n.fa-file-zip-o:before,\r\n.fa-file-archive-o:before {\r\n  content: \"\\f1c6\";\r\n}\r\n.fa-file-sound-o:before,\r\n.fa-file-audio-o:before {\r\n  content: \"\\f1c7\";\r\n}\r\n.fa-file-movie-o:before,\r\n.fa-file-video-o:before {\r\n  content: \"\\f1c8\";\r\n}\r\n.fa-file-code-o:before {\r\n  content: \"\\f1c9\";\r\n}\r\n.fa-vine:before {\r\n  content: \"\\f1ca\";\r\n}\r\n.fa-codepen:before {\r\n  content: \"\\f1cb\";\r\n}\r\n.fa-jsfiddle:before {\r\n  content: \"\\f1cc\";\r\n}\r\n.fa-life-bouy:before,\r\n.fa-life-buoy:before,\r\n.fa-life-saver:before,\r\n.fa-support:before,\r\n.fa-life-ring:before {\r\n  content: \"\\f1cd\";\r\n}\r\n.fa-circle-o-notch:before {\r\n  content: \"\\f1ce\";\r\n}\r\n.fa-ra:before,\r\n.fa-rebel:before {\r\n  content: \"\\f1d0\";\r\n}\r\n.fa-ge:before,\r\n.fa-empire:before {\r\n  content: \"\\f1d1\";\r\n}\r\n.fa-git-square:before {\r\n  content: \"\\f1d2\";\r\n}\r\n.fa-git:before {\r\n  content: \"\\f1d3\";\r\n}\r\n.fa-y-combinator-square:before,\r\n.fa-yc-square:before,\r\n.fa-hacker-news:before {\r\n  content: \"\\f1d4\";\r\n}\r\n.fa-tencent-weibo:before {\r\n  content: \"\\f1d5\";\r\n}\r\n.fa-qq:before {\r\n  content: \"\\f1d6\";\r\n}\r\n.fa-wechat:before,\r\n.fa-weixin:before {\r\n  content: \"\\f1d7\";\r\n}\r\n.fa-send:before,\r\n.fa-paper-plane:before {\r\n  content: \"\\f1d8\";\r\n}\r\n.fa-send-o:before,\r\n.fa-paper-plane-o:before {\r\n  content: \"\\f1d9\";\r\n}\r\n.fa-history:before {\r\n  content: \"\\f1da\";\r\n}\r\n.fa-circle-thin:before {\r\n  content: \"\\f1db\";\r\n}\r\n.fa-header:before {\r\n  content: \"\\f1dc\";\r\n}\r\n.fa-paragraph:before {\r\n  content: \"\\f1dd\";\r\n}\r\n.fa-sliders:before {\r\n  content: \"\\f1de\";\r\n}\r\n.fa-share-alt:before {\r\n  content: \"\\f1e0\";\r\n}\r\n.fa-share-alt-square:before {\r\n  content: \"\\f1e1\";\r\n}\r\n.fa-bomb:before {\r\n  content: \"\\f1e2\";\r\n}\r\n.fa-soccer-ball-o:before,\r\n.fa-futbol-o:before {\r\n  content: \"\\f1e3\";\r\n}\r\n.fa-tty:before {\r\n  content: \"\\f1e4\";\r\n}\r\n.fa-binoculars:before {\r\n  content: \"\\f1e5\";\r\n}\r\n.fa-plug:before {\r\n  content: \"\\f1e6\";\r\n}\r\n.fa-slideshare:before {\r\n  content: \"\\f1e7\";\r\n}\r\n.fa-twitch:before {\r\n  content: \"\\f1e8\";\r\n}\r\n.fa-yelp:before {\r\n  content: \"\\f1e9\";\r\n}\r\n.fa-newspaper-o:before {\r\n  content: \"\\f1ea\";\r\n}\r\n.fa-wifi:before {\r\n  content: \"\\f1eb\";\r\n}\r\n.fa-calculator:before {\r\n  content: \"\\f1ec\";\r\n}\r\n.fa-paypal:before {\r\n  content: \"\\f1ed\";\r\n}\r\n.fa-google-wallet:before {\r\n  content: \"\\f1ee\";\r\n}\r\n.fa-cc-visa:before {\r\n  content: \"\\f1f0\";\r\n}\r\n.fa-cc-mastercard:before {\r\n  content: \"\\f1f1\";\r\n}\r\n.fa-cc-discover:before {\r\n  content: \"\\f1f2\";\r\n}\r\n.fa-cc-amex:before {\r\n  content: \"\\f1f3\";\r\n}\r\n.fa-cc-paypal:before {\r\n  content: \"\\f1f4\";\r\n}\r\n.fa-cc-stripe:before {\r\n  content: \"\\f1f5\";\r\n}\r\n.fa-bell-slash:before {\r\n  content: \"\\f1f6\";\r\n}\r\n.fa-bell-slash-o:before {\r\n  content: \"\\f1f7\";\r\n}\r\n.fa-trash:before {\r\n  content: \"\\f1f8\";\r\n}\r\n.fa-copyright:before {\r\n  content: \"\\f1f9\";\r\n}\r\n.fa-at:before {\r\n  content: \"\\f1fa\";\r\n}\r\n.fa-eyedropper:before {\r\n  content: \"\\f1fb\";\r\n}\r\n.fa-paint-brush:before {\r\n  content: \"\\f1fc\";\r\n}\r\n.fa-birthday-cake:before {\r\n  content: \"\\f1fd\";\r\n}\r\n.fa-area-chart:before {\r\n  content: \"\\f1fe\";\r\n}\r\n.fa-pie-chart:before {\r\n  content: \"\\f200\";\r\n}\r\n.fa-line-chart:before {\r\n  content: \"\\f201\";\r\n}\r\n.fa-lastfm:before {\r\n  content: \"\\f202\";\r\n}\r\n.fa-lastfm-square:before {\r\n  content: \"\\f203\";\r\n}\r\n.fa-toggle-off:before {\r\n  content: \"\\f204\";\r\n}\r\n.fa-toggle-on:before {\r\n  content: \"\\f205\";\r\n}\r\n.fa-bicycle:before {\r\n  content: \"\\f206\";\r\n}\r\n.fa-bus:before {\r\n  content: \"\\f207\";\r\n}\r\n.fa-ioxhost:before {\r\n  content: \"\\f208\";\r\n}\r\n.fa-angellist:before {\r\n  content: \"\\f209\";\r\n}\r\n.fa-cc:before {\r\n  content: \"\\f20a\";\r\n}\r\n.fa-shekel:before,\r\n.fa-sheqel:before,\r\n.fa-ils:before {\r\n  content: \"\\f20b\";\r\n}\r\n.fa-meanpath:before {\r\n  content: \"\\f20c\";\r\n}\r\n.fa-buysellads:before {\r\n  content: \"\\f20d\";\r\n}\r\n.fa-connectdevelop:before {\r\n  content: \"\\f20e\";\r\n}\r\n.fa-dashcube:before {\r\n  content: \"\\f210\";\r\n}\r\n.fa-forumbee:before {\r\n  content: \"\\f211\";\r\n}\r\n.fa-leanpub:before {\r\n  content: \"\\f212\";\r\n}\r\n.fa-sellsy:before {\r\n  content: \"\\f213\";\r\n}\r\n.fa-shirtsinbulk:before {\r\n  content: \"\\f214\";\r\n}\r\n.fa-simplybuilt:before {\r\n  content: \"\\f215\";\r\n}\r\n.fa-skyatlas:before {\r\n  content: \"\\f216\";\r\n}\r\n.fa-cart-plus:before {\r\n  content: \"\\f217\";\r\n}\r\n.fa-cart-arrow-down:before {\r\n  content: \"\\f218\";\r\n}\r\n.fa-diamond:before {\r\n  content: \"\\f219\";\r\n}\r\n.fa-ship:before {\r\n  content: \"\\f21a\";\r\n}\r\n.fa-user-secret:before {\r\n  content: \"\\f21b\";\r\n}\r\n.fa-motorcycle:before {\r\n  content: \"\\f21c\";\r\n}\r\n.fa-street-view:before {\r\n  content: \"\\f21d\";\r\n}\r\n.fa-heartbeat:before {\r\n  content: \"\\f21e\";\r\n}\r\n.fa-venus:before {\r\n  content: \"\\f221\";\r\n}\r\n.fa-mars:before {\r\n  content: \"\\f222\";\r\n}\r\n.fa-mercury:before {\r\n  content: \"\\f223\";\r\n}\r\n.fa-intersex:before,\r\n.fa-transgender:before {\r\n  content: \"\\f224\";\r\n}\r\n.fa-transgender-alt:before {\r\n  content: \"\\f225\";\r\n}\r\n.fa-venus-double:before {\r\n  content: \"\\f226\";\r\n}\r\n.fa-mars-double:before {\r\n  content: \"\\f227\";\r\n}\r\n.fa-venus-mars:before {\r\n  content: \"\\f228\";\r\n}\r\n.fa-mars-stroke:before {\r\n  content: \"\\f229\";\r\n}\r\n.fa-mars-stroke-v:before {\r\n  content: \"\\f22a\";\r\n}\r\n.fa-mars-stroke-h:before {\r\n  content: \"\\f22b\";\r\n}\r\n.fa-neuter:before {\r\n  content: \"\\f22c\";\r\n}\r\n.fa-genderless:before {\r\n  content: \"\\f22d\";\r\n}\r\n.fa-facebook-official:before {\r\n  content: \"\\f230\";\r\n}\r\n.fa-pinterest-p:before {\r\n  content: \"\\f231\";\r\n}\r\n.fa-whatsapp:before {\r\n  content: \"\\f232\";\r\n}\r\n.fa-server:before {\r\n  content: \"\\f233\";\r\n}\r\n.fa-user-plus:before {\r\n  content: \"\\f234\";\r\n}\r\n.fa-user-times:before {\r\n  content: \"\\f235\";\r\n}\r\n.fa-hotel:before,\r\n.fa-bed:before {\r\n  content: \"\\f236\";\r\n}\r\n.fa-viacoin:before {\r\n  content: \"\\f237\";\r\n}\r\n.fa-train:before {\r\n  content: \"\\f238\";\r\n}\r\n.fa-subway:before {\r\n  content: \"\\f239\";\r\n}\r\n.fa-medium:before {\r\n  content: \"\\f23a\";\r\n}\r\n.fa-yc:before,\r\n.fa-y-combinator:before {\r\n  content: \"\\f23b\";\r\n}\r\n.fa-optin-monster:before {\r\n  content: \"\\f23c\";\r\n}\r\n.fa-opencart:before {\r\n  content: \"\\f23d\";\r\n}\r\n.fa-expeditedssl:before {\r\n  content: \"\\f23e\";\r\n}\r\n.fa-battery-4:before,\r\n.fa-battery-full:before {\r\n  content: \"\\f240\";\r\n}\r\n.fa-battery-3:before,\r\n.fa-battery-three-quarters:before {\r\n  content: \"\\f241\";\r\n}\r\n.fa-battery-2:before,\r\n.fa-battery-half:before {\r\n  content: \"\\f242\";\r\n}\r\n.fa-battery-1:before,\r\n.fa-battery-quarter:before {\r\n  content: \"\\f243\";\r\n}\r\n.fa-battery-0:before,\r\n.fa-battery-empty:before {\r\n  content: \"\\f244\";\r\n}\r\n.fa-mouse-pointer:before {\r\n  content: \"\\f245\";\r\n}\r\n.fa-i-cursor:before {\r\n  content: \"\\f246\";\r\n}\r\n.fa-object-group:before {\r\n  content: \"\\f247\";\r\n}\r\n.fa-object-ungroup:before {\r\n  content: \"\\f248\";\r\n}\r\n.fa-sticky-note:before {\r\n  content: \"\\f249\";\r\n}\r\n.fa-sticky-note-o:before {\r\n  content: \"\\f24a\";\r\n}\r\n.fa-cc-jcb:before {\r\n  content: \"\\f24b\";\r\n}\r\n.fa-cc-diners-club:before {\r\n  content: \"\\f24c\";\r\n}\r\n.fa-clone:before {\r\n  content: \"\\f24d\";\r\n}\r\n.fa-balance-scale:before {\r\n  content: \"\\f24e\";\r\n}\r\n.fa-hourglass-o:before {\r\n  content: \"\\f250\";\r\n}\r\n.fa-hourglass-1:before,\r\n.fa-hourglass-start:before {\r\n  content: \"\\f251\";\r\n}\r\n.fa-hourglass-2:before,\r\n.fa-hourglass-half:before {\r\n  content: \"\\f252\";\r\n}\r\n.fa-hourglass-3:before,\r\n.fa-hourglass-end:before {\r\n  content: \"\\f253\";\r\n}\r\n.fa-hourglass:before {\r\n  content: \"\\f254\";\r\n}\r\n.fa-hand-grab-o:before,\r\n.fa-hand-rock-o:before {\r\n  content: \"\\f255\";\r\n}\r\n.fa-hand-stop-o:before,\r\n.fa-hand-paper-o:before {\r\n  content: \"\\f256\";\r\n}\r\n.fa-hand-scissors-o:before {\r\n  content: \"\\f257\";\r\n}\r\n.fa-hand-lizard-o:before {\r\n  content: \"\\f258\";\r\n}\r\n.fa-hand-spock-o:before {\r\n  content: \"\\f259\";\r\n}\r\n.fa-hand-pointer-o:before {\r\n  content: \"\\f25a\";\r\n}\r\n.fa-hand-peace-o:before {\r\n  content: \"\\f25b\";\r\n}\r\n.fa-trademark:before {\r\n  content: \"\\f25c\";\r\n}\r\n.fa-registered:before {\r\n  content: \"\\f25d\";\r\n}\r\n.fa-creative-commons:before {\r\n  content: \"\\f25e\";\r\n}\r\n.fa-gg:before {\r\n  content: \"\\f260\";\r\n}\r\n.fa-gg-circle:before {\r\n  content: \"\\f261\";\r\n}\r\n.fa-tripadvisor:before {\r\n  content: \"\\f262\";\r\n}\r\n.fa-odnoklassniki:before {\r\n  content: \"\\f263\";\r\n}\r\n.fa-odnoklassniki-square:before {\r\n  content: \"\\f264\";\r\n}\r\n.fa-get-pocket:before {\r\n  content: \"\\f265\";\r\n}\r\n.fa-wikipedia-w:before {\r\n  content: \"\\f266\";\r\n}\r\n.fa-safari:before {\r\n  content: \"\\f267\";\r\n}\r\n.fa-chrome:before {\r\n  content: \"\\f268\";\r\n}\r\n.fa-firefox:before {\r\n  content: \"\\f269\";\r\n}\r\n.fa-opera:before {\r\n  content: \"\\f26a\";\r\n}\r\n.fa-internet-explorer:before {\r\n  content: \"\\f26b\";\r\n}\r\n.fa-tv:before,\r\n.fa-television:before {\r\n  content: \"\\f26c\";\r\n}\r\n.fa-contao:before {\r\n  content: \"\\f26d\";\r\n}\r\n.fa-500px:before {\r\n  content: \"\\f26e\";\r\n}\r\n.fa-amazon:before {\r\n  content: \"\\f270\";\r\n}\r\n.fa-calendar-plus-o:before {\r\n  content: \"\\f271\";\r\n}\r\n.fa-calendar-minus-o:before {\r\n  content: \"\\f272\";\r\n}\r\n.fa-calendar-times-o:before {\r\n  content: \"\\f273\";\r\n}\r\n.fa-calendar-check-o:before {\r\n  content: \"\\f274\";\r\n}\r\n.fa-industry:before {\r\n  content: \"\\f275\";\r\n}\r\n.fa-map-pin:before {\r\n  content: \"\\f276\";\r\n}\r\n.fa-map-signs:before {\r\n  content: \"\\f277\";\r\n}\r\n.fa-map-o:before {\r\n  content: \"\\f278\";\r\n}\r\n.fa-map:before {\r\n  content: \"\\f279\";\r\n}\r\n.fa-commenting:before {\r\n  content: \"\\f27a\";\r\n}\r\n.fa-commenting-o:before {\r\n  content: \"\\f27b\";\r\n}\r\n.fa-houzz:before {\r\n  content: \"\\f27c\";\r\n}\r\n.fa-vimeo:before {\r\n  content: \"\\f27d\";\r\n}\r\n.fa-black-tie:before {\r\n  content: \"\\f27e\";\r\n}\r\n.fa-fonticons:before {\r\n  content: \"\\f280\";\r\n}\r\n.fa-reddit-alien:before {\r\n  content: \"\\f281\";\r\n}\r\n.fa-edge:before {\r\n  content: \"\\f282\";\r\n}\r\n.fa-credit-card-alt:before {\r\n  content: \"\\f283\";\r\n}\r\n.fa-codiepie:before {\r\n  content: \"\\f284\";\r\n}\r\n.fa-modx:before {\r\n  content: \"\\f285\";\r\n}\r\n.fa-fort-awesome:before {\r\n  content: \"\\f286\";\r\n}\r\n.fa-usb:before {\r\n  content: \"\\f287\";\r\n}\r\n.fa-product-hunt:before {\r\n  content: \"\\f288\";\r\n}\r\n.fa-mixcloud:before {\r\n  content: \"\\f289\";\r\n}\r\n.fa-scribd:before {\r\n  content: \"\\f28a\";\r\n}\r\n.fa-pause-circle:before {\r\n  content: \"\\f28b\";\r\n}\r\n.fa-pause-circle-o:before {\r\n  content: \"\\f28c\";\r\n}\r\n.fa-stop-circle:before {\r\n  content: \"\\f28d\";\r\n}\r\n.fa-stop-circle-o:before {\r\n  content: \"\\f28e\";\r\n}\r\n.fa-shopping-bag:before {\r\n  content: \"\\f290\";\r\n}\r\n.fa-shopping-basket:before {\r\n  content: \"\\f291\";\r\n}\r\n.fa-hashtag:before {\r\n  content: \"\\f292\";\r\n}\r\n.fa-bluetooth:before {\r\n  content: \"\\f293\";\r\n}\r\n.fa-bluetooth-b:before {\r\n  content: \"\\f294\";\r\n}\r\n.fa-percent:before {\r\n  content: \"\\f295\";\r\n}\r\n/*!\r\n *  Material Design Iconic Font 1.0.1 by Sergey Kupletsky (@zavoloklom) - http://zavoloklom.github.io/material-design-iconic-font/\r\n *  License - https://github.com/zavoloklom/material-design-iconic-font/blob/gh-pages/License.md (Attribution-ShareAlike 4.0 International license)\r\n */\r\n@font-face {\r\n  font-family: 'Material Design Iconic Font';\r\n  src: url('../fonts/Material-Design-Iconic-Font.eot?v=1.0.1');\r\n  src: url('../fonts/Material-Design-Iconic-Font.eot?#iefix&v=1.0.1') format('embedded-opentype'), url('../fonts/Material-Design-Iconic-Font.ttf?v=1.0.1') format('truetype'), url('../fonts/Material-Design-Iconic-Font.svg?v=1.0.1#Material-Design-Iconic-Font') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n[class^=\"md-\"],\r\n[class*=\" md-\"] {\r\n  display: inline-block;\r\n  font: normal normal normal 14px/1 'Material Design Iconic Font';\r\n  font-size: inherit;\r\n  speak: none;\r\n  text-rendering: auto;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n.md {\r\n  line-height: inherit;\r\n  vertical-align: bottom;\r\n}\r\n.md-lg {\r\n  font-size: 1.5em;\r\n  line-height: .5em;\r\n  vertical-align: -35%;\r\n}\r\n.md-2x {\r\n  font-size: 2em;\r\n}\r\n.md-3x {\r\n  font-size: 3em;\r\n}\r\n.md-4x {\r\n  font-size: 4em;\r\n}\r\n.md-5x {\r\n  font-size: 5em;\r\n}\r\n.md-border {\r\n  padding: .2em .25em .15em;\r\n  border: solid 0.08em grey;\r\n  border-radius: .1em;\r\n}\r\n.md-border-circle {\r\n  padding: .2em .25em .15em;\r\n  border: solid 0.08em grey;\r\n  border-radius: 50%;\r\n}\r\n[class^=\"md-\"].pull-left,\r\n[class*=\" md-\"].pull-left {\r\n  float: left;\r\n  margin-right: .3em;\r\n}\r\n[class^=\"md-\"].pull-right,\r\n[class*=\" md-\"].pull-right {\r\n  float: right;\r\n  margin-left: .3em;\r\n}\r\n.md-spin {\r\n  animation: md-spin 1.5s infinite linear;\r\n}\r\n.md-spin-reverse {\r\n  animation: md-spin-reverse 1.5s infinite linear;\r\n}\r\n@keyframes md-spin {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: rotate(359deg);\r\n  }\r\n}\r\n@keyframes md-spin-reverse {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: rotate(-359deg);\r\n  }\r\n}\r\n.md-rotate-90 {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\r\n  transform: rotate(90deg);\r\n}\r\n.md-rotate-180 {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\r\n  transform: rotate(180deg);\r\n}\r\n.md-rotate-270 {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);\r\n  transform: rotate(270deg);\r\n}\r\n.md-flip-horizontal {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);\r\n  transform: scale(-1, 1);\r\n}\r\n.md-flip-vertical {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);\r\n  transform: scale(1, -1);\r\n}\r\n:root .md-rotate-90,\r\n:root .md-rotate-180,\r\n:root .md-rotate-270,\r\n:root .md-flip-horizontal,\r\n:root .md-flip-vertical {\r\n  filter: none;\r\n}\r\n/* Material Design Iconic Font uses the Unicode Private Use Area (PUA) to ensure screen\r\n   readers do not read off random characters that represent icons */\r\n/* If you do not want use all icons you can disable icon set here */\r\n.md-3d-rotation:before {\r\n  content: \"\\f000\";\r\n}\r\n.md-accessibility:before {\r\n  content: \"\\f001\";\r\n}\r\n.md-account-balance:before {\r\n  content: \"\\f002\";\r\n}\r\n.md-account-balance-wallet:before {\r\n  content: \"\\f003\";\r\n}\r\n.md-account-box:before {\r\n  content: \"\\f004\";\r\n}\r\n.md-account-child:before {\r\n  content: \"\\f005\";\r\n}\r\n.md-account-circle:before {\r\n  content: \"\\f006\";\r\n}\r\n.md-add-shopping-cart:before {\r\n  content: \"\\f007\";\r\n}\r\n.md-alarm:before {\r\n  content: \"\\f008\";\r\n}\r\n.md-alarm-add:before {\r\n  content: \"\\f009\";\r\n}\r\n.md-alarm-off:before {\r\n  content: \"\\f00a\";\r\n}\r\n.md-alarm-on:before {\r\n  content: \"\\f00b\";\r\n}\r\n.md-android:before {\r\n  content: \"\\f00c\";\r\n}\r\n.md-announcement:before {\r\n  content: \"\\f00d\";\r\n}\r\n.md-aspect-ratio:before {\r\n  content: \"\\f00e\";\r\n}\r\n.md-assessment:before {\r\n  content: \"\\f00f\";\r\n}\r\n.md-assignment:before {\r\n  content: \"\\f010\";\r\n}\r\n.md-assignment-ind:before {\r\n  content: \"\\f011\";\r\n}\r\n.md-assignment-late:before {\r\n  content: \"\\f012\";\r\n}\r\n.md-assignment-return:before {\r\n  content: \"\\f013\";\r\n}\r\n.md-assignment-returned:before {\r\n  content: \"\\f014\";\r\n}\r\n.md-assignment-turned-in:before {\r\n  content: \"\\f015\";\r\n}\r\n.md-autorenew:before {\r\n  content: \"\\f016\";\r\n}\r\n.md-backup:before {\r\n  content: \"\\f017\";\r\n}\r\n.md-book:before {\r\n  content: \"\\f018\";\r\n}\r\n.md-bookmark:before {\r\n  content: \"\\f019\";\r\n}\r\n.md-bookmark-outline:before {\r\n  content: \"\\f01a\";\r\n}\r\n.md-bug-report:before {\r\n  content: \"\\f01b\";\r\n}\r\n.md-cached:before {\r\n  content: \"\\f01c\";\r\n}\r\n.md-class:before {\r\n  content: \"\\f01d\";\r\n}\r\n.md-credit-card:before {\r\n  content: \"\\f01e\";\r\n}\r\n.md-dashboard:before {\r\n  content: \"\\f01f\";\r\n}\r\n.md-delete:before {\r\n  content: \"\\f020\";\r\n}\r\n.md-description:before {\r\n  content: \"\\f021\";\r\n}\r\n.md-dns:before {\r\n  content: \"\\f022\";\r\n}\r\n.md-done:before {\r\n  content: \"\\f023\";\r\n}\r\n.md-done-all:before {\r\n  content: \"\\f024\";\r\n}\r\n.md-event:before {\r\n  content: \"\\f025\";\r\n}\r\n.md-exit-to-app:before {\r\n  content: \"\\f026\";\r\n}\r\n.md-explore:before {\r\n  content: \"\\f027\";\r\n}\r\n.md-extension:before {\r\n  content: \"\\f028\";\r\n}\r\n.md-face-unlock:before {\r\n  content: \"\\f029\";\r\n}\r\n.md-favorite:before {\r\n  content: \"\\f02a\";\r\n}\r\n.md-favorite-outline:before {\r\n  content: \"\\f02b\";\r\n}\r\n.md-find-in-page:before {\r\n  content: \"\\f02c\";\r\n}\r\n.md-find-replace:before {\r\n  content: \"\\f02d\";\r\n}\r\n.md-flip-to-back:before {\r\n  content: \"\\f02e\";\r\n}\r\n.md-flip-to-front:before {\r\n  content: \"\\f02f\";\r\n}\r\n.md-get-app:before {\r\n  content: \"\\f030\";\r\n}\r\n.md-grade:before {\r\n  content: \"\\f031\";\r\n}\r\n.md-group-work:before {\r\n  content: \"\\f032\";\r\n}\r\n.md-help:before {\r\n  content: \"\\f033\";\r\n}\r\n.md-highlight-remove:before {\r\n  content: \"\\f034\";\r\n}\r\n.md-history:before {\r\n  content: \"\\f035\";\r\n}\r\n.md-home:before {\r\n  content: \"\\f036\";\r\n}\r\n.md-https:before {\r\n  content: \"\\f037\";\r\n}\r\n.md-info:before {\r\n  content: \"\\f038\";\r\n}\r\n.md-info-outline:before {\r\n  content: \"\\f039\";\r\n}\r\n.md-input:before {\r\n  content: \"\\f03a\";\r\n}\r\n.md-invert-colors:before {\r\n  content: \"\\f03b\";\r\n}\r\n.md-label:before {\r\n  content: \"\\f03c\";\r\n}\r\n.md-label-outline:before {\r\n  content: \"\\f03d\";\r\n}\r\n.md-language:before {\r\n  content: \"\\f03e\";\r\n}\r\n.md-launch:before {\r\n  content: \"\\f03f\";\r\n}\r\n.md-list:before {\r\n  content: \"\\f040\";\r\n}\r\n.md-lock:before {\r\n  content: \"\\f041\";\r\n}\r\n.md-lock-open:before {\r\n  content: \"\\f042\";\r\n}\r\n.md-lock-outline:before {\r\n  content: \"\\f043\";\r\n}\r\n.md-loyalty:before {\r\n  content: \"\\f044\";\r\n}\r\n.md-markunread-mailbox:before {\r\n  content: \"\\f045\";\r\n}\r\n.md-note-add:before {\r\n  content: \"\\f046\";\r\n}\r\n.md-open-in-browser:before {\r\n  content: \"\\f047\";\r\n}\r\n.md-open-in-new:before {\r\n  content: \"\\f048\";\r\n}\r\n.md-open-with:before {\r\n  content: \"\\f049\";\r\n}\r\n.md-pageview:before {\r\n  content: \"\\f04a\";\r\n}\r\n.md-payment:before {\r\n  content: \"\\f04b\";\r\n}\r\n.md-perm-camera-mic:before {\r\n  content: \"\\f04c\";\r\n}\r\n.md-perm-contact-cal:before {\r\n  content: \"\\f04d\";\r\n}\r\n.md-perm-data-setting:before {\r\n  content: \"\\f04e\";\r\n}\r\n.md-perm-device-info:before {\r\n  content: \"\\f04f\";\r\n}\r\n.md-perm-identity:before {\r\n  content: \"\\f050\";\r\n}\r\n.md-perm-media:before {\r\n  content: \"\\f051\";\r\n}\r\n.md-perm-phone-msg:before {\r\n  content: \"\\f052\";\r\n}\r\n.md-perm-scan-wifi:before {\r\n  content: \"\\f053\";\r\n}\r\n.md-picture-in-picture:before {\r\n  content: \"\\f054\";\r\n}\r\n.md-polymer:before {\r\n  content: \"\\f055\";\r\n}\r\n.md-print:before {\r\n  content: \"\\f056\";\r\n}\r\n.md-query-builder:before {\r\n  content: \"\\f057\";\r\n}\r\n.md-question-answer:before {\r\n  content: \"\\f058\";\r\n}\r\n.md-receipt:before {\r\n  content: \"\\f059\";\r\n}\r\n.md-redeem:before {\r\n  content: \"\\f05a\";\r\n}\r\n.md-report-problem:before {\r\n  content: \"\\f05b\";\r\n}\r\n.md-restore:before {\r\n  content: \"\\f05c\";\r\n}\r\n.md-room:before {\r\n  content: \"\\f05d\";\r\n}\r\n.md-schedule:before {\r\n  content: \"\\f05e\";\r\n}\r\n.md-search:before {\r\n  content: \"\\f05f\";\r\n}\r\n.md-settings:before {\r\n  content: \"\\f060\";\r\n}\r\n.md-settings-applications:before {\r\n  content: \"\\f061\";\r\n}\r\n.md-settings-backup-restore:before {\r\n  content: \"\\f062\";\r\n}\r\n.md-settings-bluetooth:before {\r\n  content: \"\\f063\";\r\n}\r\n.md-settings-cell:before {\r\n  content: \"\\f064\";\r\n}\r\n.md-settings-display:before {\r\n  content: \"\\f065\";\r\n}\r\n.md-settings-ethernet:before {\r\n  content: \"\\f066\";\r\n}\r\n.md-settings-input-antenna:before {\r\n  content: \"\\f067\";\r\n}\r\n.md-settings-input-component:before {\r\n  content: \"\\f068\";\r\n}\r\n.md-settings-input-composite:before {\r\n  content: \"\\f069\";\r\n}\r\n.md-settings-input-hdmi:before {\r\n  content: \"\\f06a\";\r\n}\r\n.md-settings-input-svideo:before {\r\n  content: \"\\f06b\";\r\n}\r\n.md-settings-overscan:before {\r\n  content: \"\\f06c\";\r\n}\r\n.md-settings-phone:before {\r\n  content: \"\\f06d\";\r\n}\r\n.md-settings-power:before {\r\n  content: \"\\f06e\";\r\n}\r\n.md-settings-remote:before {\r\n  content: \"\\f06f\";\r\n}\r\n.md-settings-voice:before {\r\n  content: \"\\f070\";\r\n}\r\n.md-shop:before {\r\n  content: \"\\f071\";\r\n}\r\n.md-shopping-basket:before {\r\n  content: \"\\f072\";\r\n}\r\n.md-shopping-cart:before {\r\n  content: \"\\f073\";\r\n}\r\n.md-shop-two:before {\r\n  content: \"\\f074\";\r\n}\r\n.md-speaker-notes:before {\r\n  content: \"\\f075\";\r\n}\r\n.md-spellcheck:before {\r\n  content: \"\\f076\";\r\n}\r\n.md-star-rate:before {\r\n  content: \"\\f077\";\r\n}\r\n.md-stars:before {\r\n  content: \"\\f078\";\r\n}\r\n.md-store:before {\r\n  content: \"\\f079\";\r\n}\r\n.md-subject:before {\r\n  content: \"\\f07a\";\r\n}\r\n.md-swap-horiz:before {\r\n  content: \"\\f07b\";\r\n}\r\n.md-swap-vert:before {\r\n  content: \"\\f07c\";\r\n}\r\n.md-swap-vert-circle:before {\r\n  content: \"\\f07d\";\r\n}\r\n.md-system-update-tv:before {\r\n  content: \"\\f07e\";\r\n}\r\n.md-tab:before {\r\n  content: \"\\f07f\";\r\n}\r\n.md-tab-unselected:before {\r\n  content: \"\\f080\";\r\n}\r\n.md-theaters:before {\r\n  content: \"\\f081\";\r\n}\r\n.md-thumb-down:before {\r\n  content: \"\\f082\";\r\n}\r\n.md-thumbs-up-down:before {\r\n  content: \"\\f083\";\r\n}\r\n.md-thumb-up:before {\r\n  content: \"\\f084\";\r\n}\r\n.md-toc:before {\r\n  content: \"\\f085\";\r\n}\r\n.md-today:before {\r\n  content: \"\\f086\";\r\n}\r\n.md-track-changes:before {\r\n  content: \"\\f087\";\r\n}\r\n.md-translate:before {\r\n  content: \"\\f088\";\r\n}\r\n.md-trending-down:before {\r\n  content: \"\\f089\";\r\n}\r\n.md-trending-neutral:before {\r\n  content: \"\\f08a\";\r\n}\r\n.md-trending-up:before {\r\n  content: \"\\f08b\";\r\n}\r\n.md-turned-in:before {\r\n  content: \"\\f08c\";\r\n}\r\n.md-turned-in-not:before {\r\n  content: \"\\f08d\";\r\n}\r\n.md-verified-user:before {\r\n  content: \"\\f08e\";\r\n}\r\n.md-view-agenda:before {\r\n  content: \"\\f08f\";\r\n}\r\n.md-view-array:before {\r\n  content: \"\\f090\";\r\n}\r\n.md-view-carousel:before {\r\n  content: \"\\f091\";\r\n}\r\n.md-view-column:before {\r\n  content: \"\\f092\";\r\n}\r\n.md-view-day:before {\r\n  content: \"\\f093\";\r\n}\r\n.md-view-headline:before {\r\n  content: \"\\f094\";\r\n}\r\n.md-view-list:before {\r\n  content: \"\\f095\";\r\n}\r\n.md-view-module:before {\r\n  content: \"\\f096\";\r\n}\r\n.md-view-quilt:before {\r\n  content: \"\\f097\";\r\n}\r\n.md-view-stream:before {\r\n  content: \"\\f098\";\r\n}\r\n.md-view-week:before {\r\n  content: \"\\f099\";\r\n}\r\n.md-visibility:before {\r\n  content: \"\\f09a\";\r\n}\r\n.md-visibility-off:before {\r\n  content: \"\\f09b\";\r\n}\r\n.md-wallet-giftcard:before {\r\n  content: \"\\f09c\";\r\n}\r\n.md-wallet-membership:before {\r\n  content: \"\\f09d\";\r\n}\r\n.md-wallet-travel:before {\r\n  content: \"\\f09e\";\r\n}\r\n.md-work:before {\r\n  content: \"\\f09f\";\r\n}\r\n.md-error:before {\r\n  content: \"\\f0a0\";\r\n}\r\n.md-warning:before {\r\n  content: \"\\f0a1\";\r\n}\r\n.md-album:before {\r\n  content: \"\\f0a2\";\r\n}\r\n.md-av-timer:before {\r\n  content: \"\\f0a3\";\r\n}\r\n.md-closed-caption:before {\r\n  content: \"\\f0a4\";\r\n}\r\n.md-equalizer:before {\r\n  content: \"\\f0a5\";\r\n}\r\n.md-explicit:before {\r\n  content: \"\\f0a6\";\r\n}\r\n.md-fast-forward:before {\r\n  content: \"\\f0a7\";\r\n}\r\n.md-fast-rewind:before {\r\n  content: \"\\f0a8\";\r\n}\r\n.md-games:before {\r\n  content: \"\\f0a9\";\r\n}\r\n.md-hearing:before {\r\n  content: \"\\f0aa\";\r\n}\r\n.md-high-quality:before {\r\n  content: \"\\f0ab\";\r\n}\r\n.md-loop:before {\r\n  content: \"\\f0ac\";\r\n}\r\n.md-mic:before {\r\n  content: \"\\f0ad\";\r\n}\r\n.md-mic-none:before {\r\n  content: \"\\f0ae\";\r\n}\r\n.md-mic-off:before {\r\n  content: \"\\f0af\";\r\n}\r\n.md-movie:before {\r\n  content: \"\\f0b0\";\r\n}\r\n.md-my-library-add:before {\r\n  content: \"\\f0b1\";\r\n}\r\n.md-my-library-books:before {\r\n  content: \"\\f0b2\";\r\n}\r\n.md-my-library-music:before {\r\n  content: \"\\f0b3\";\r\n}\r\n.md-new-releases:before {\r\n  content: \"\\f0b4\";\r\n}\r\n.md-not-interested:before {\r\n  content: \"\\f0b5\";\r\n}\r\n.md-pause:before {\r\n  content: \"\\f0b6\";\r\n}\r\n.md-pause-circle-fill:before {\r\n  content: \"\\f0b7\";\r\n}\r\n.md-pause-circle-outline:before {\r\n  content: \"\\f0b8\";\r\n}\r\n.md-play-arrow:before {\r\n  content: \"\\f0b9\";\r\n}\r\n.md-play-circle-fill:before {\r\n  content: \"\\f0ba\";\r\n}\r\n.md-play-circle-outline:before {\r\n  content: \"\\f0bb\";\r\n}\r\n.md-playlist-add:before {\r\n  content: \"\\f0bc\";\r\n}\r\n.md-play-shopping-bag:before {\r\n  content: \"\\f0bd\";\r\n}\r\n.md-queue:before {\r\n  content: \"\\f0be\";\r\n}\r\n.md-queue-music:before {\r\n  content: \"\\f0bf\";\r\n}\r\n.md-radio:before {\r\n  content: \"\\f0c0\";\r\n}\r\n.md-recent-actors:before {\r\n  content: \"\\f0c1\";\r\n}\r\n.md-repeat:before {\r\n  content: \"\\f0c2\";\r\n}\r\n.md-repeat-one:before {\r\n  content: \"\\f0c3\";\r\n}\r\n.md-replay:before {\r\n  content: \"\\f0c4\";\r\n}\r\n.md-shuffle:before {\r\n  content: \"\\f0c5\";\r\n}\r\n.md-skip-next:before {\r\n  content: \"\\f0c6\";\r\n}\r\n.md-skip-previous:before {\r\n  content: \"\\f0c7\";\r\n}\r\n.md-snooze:before {\r\n  content: \"\\f0c8\";\r\n}\r\n.md-stop:before {\r\n  content: \"\\f0c9\";\r\n}\r\n.md-subtitles:before {\r\n  content: \"\\f0ca\";\r\n}\r\n.md-surround-sound:before {\r\n  content: \"\\f0cb\";\r\n}\r\n.md-videocam:before {\r\n  content: \"\\f0cc\";\r\n}\r\n.md-videocam-off:before {\r\n  content: \"\\f0cd\";\r\n}\r\n.md-video-collection:before {\r\n  content: \"\\f0ce\";\r\n}\r\n.md-volume-down:before {\r\n  content: \"\\f0cf\";\r\n}\r\n.md-volume-mute:before {\r\n  content: \"\\f0d0\";\r\n}\r\n.md-volume-off:before {\r\n  content: \"\\f0d1\";\r\n}\r\n.md-volume-up:before {\r\n  content: \"\\f0d2\";\r\n}\r\n.md-web:before {\r\n  content: \"\\f0d3\";\r\n}\r\n.md-business:before {\r\n  content: \"\\f0d4\";\r\n}\r\n.md-call:before {\r\n  content: \"\\f0d5\";\r\n}\r\n.md-call-end:before {\r\n  content: \"\\f0d6\";\r\n}\r\n.md-call-made:before {\r\n  content: \"\\f0d7\";\r\n}\r\n.md-call-merge:before {\r\n  content: \"\\f0d8\";\r\n}\r\n.md-call-missed:before {\r\n  content: \"\\f0d9\";\r\n}\r\n.md-call-received:before {\r\n  content: \"\\f0da\";\r\n}\r\n.md-call-split:before {\r\n  content: \"\\f0db\";\r\n}\r\n.md-chat:before {\r\n  content: \"\\f0dc\";\r\n}\r\n.md-clear-all:before {\r\n  content: \"\\f0dd\";\r\n}\r\n.md-comment:before {\r\n  content: \"\\f0de\";\r\n}\r\n.md-contacts:before {\r\n  content: \"\\f0df\";\r\n}\r\n.md-dialer-sip:before {\r\n  content: \"\\f0e0\";\r\n}\r\n.md-dialpad:before {\r\n  content: \"\\f0e1\";\r\n}\r\n.md-dnd-on:before {\r\n  content: \"\\f0e2\";\r\n}\r\n.md-email:before {\r\n  content: \"\\f0e3\";\r\n}\r\n.md-forum:before {\r\n  content: \"\\f0e4\";\r\n}\r\n.md-import-export:before {\r\n  content: \"\\f0e5\";\r\n}\r\n.md-invert-colors-off:before {\r\n  content: \"\\f0e6\";\r\n}\r\n.md-invert-colors-on:before {\r\n  content: \"\\f0e7\";\r\n}\r\n.md-live-help:before {\r\n  content: \"\\f0e8\";\r\n}\r\n.md-location-off:before {\r\n  content: \"\\f0e9\";\r\n}\r\n.md-location-on:before {\r\n  content: \"\\f0ea\";\r\n}\r\n.md-message:before {\r\n  content: \"\\f0eb\";\r\n}\r\n.md-messenger:before {\r\n  content: \"\\f0ec\";\r\n}\r\n.md-no-sim:before {\r\n  content: \"\\f0ed\";\r\n}\r\n.md-phone:before {\r\n  content: \"\\f0ee\";\r\n}\r\n.md-portable-wifi-off:before {\r\n  content: \"\\f0ef\";\r\n}\r\n.md-quick-contacts-dialer:before {\r\n  content: \"\\f0f0\";\r\n}\r\n.md-quick-contacts-mail:before {\r\n  content: \"\\f0f1\";\r\n}\r\n.md-ring-volume:before {\r\n  content: \"\\f0f2\";\r\n}\r\n.md-stay-current-landscape:before {\r\n  content: \"\\f0f3\";\r\n}\r\n.md-stay-current-portrait:before {\r\n  content: \"\\f0f4\";\r\n}\r\n.md-stay-primary-landscape:before {\r\n  content: \"\\f0f5\";\r\n}\r\n.md-stay-primary-portrait:before {\r\n  content: \"\\f0f6\";\r\n}\r\n.md-swap-calls:before {\r\n  content: \"\\f0f7\";\r\n}\r\n.md-textsms:before {\r\n  content: \"\\f0f8\";\r\n}\r\n.md-voicemail:before {\r\n  content: \"\\f0f9\";\r\n}\r\n.md-vpn-key:before {\r\n  content: \"\\f0fa\";\r\n}\r\n.md-add:before {\r\n  content: \"\\f0fb\";\r\n}\r\n.md-add-box:before {\r\n  content: \"\\f0fc\";\r\n}\r\n.md-add-circle:before {\r\n  content: \"\\f0fd\";\r\n}\r\n.md-add-circle-outline:before {\r\n  content: \"\\f0fe\";\r\n}\r\n.md-archive:before {\r\n  content: \"\\f0ff\";\r\n}\r\n.md-backspace:before {\r\n  content: \"\\f100\";\r\n}\r\n.md-block:before {\r\n  content: \"\\f101\";\r\n}\r\n.md-clear:before {\r\n  content: \"\\f102\";\r\n}\r\n.md-content-copy:before {\r\n  content: \"\\f103\";\r\n}\r\n.md-content-cut:before {\r\n  content: \"\\f104\";\r\n}\r\n.md-content-paste:before {\r\n  content: \"\\f105\";\r\n}\r\n.md-create:before {\r\n  content: \"\\f106\";\r\n}\r\n.md-drafts:before {\r\n  content: \"\\f107\";\r\n}\r\n.md-filter-list:before {\r\n  content: \"\\f108\";\r\n}\r\n.md-flag:before {\r\n  content: \"\\f109\";\r\n}\r\n.md-forward:before {\r\n  content: \"\\f10a\";\r\n}\r\n.md-gesture:before {\r\n  content: \"\\f10b\";\r\n}\r\n.md-inbox:before {\r\n  content: \"\\f10c\";\r\n}\r\n.md-link:before {\r\n  content: \"\\f10d\";\r\n}\r\n.md-mail:before {\r\n  content: \"\\f10e\";\r\n}\r\n.md-markunread:before {\r\n  content: \"\\f10f\";\r\n}\r\n.md-redo:before {\r\n  content: \"\\f110\";\r\n}\r\n.md-remove:before {\r\n  content: \"\\f111\";\r\n}\r\n.md-remove-circle:before {\r\n  content: \"\\f112\";\r\n}\r\n.md-remove-circle-outline:before {\r\n  content: \"\\f113\";\r\n}\r\n.md-reply:before {\r\n  content: \"\\f114\";\r\n}\r\n.md-reply-all:before {\r\n  content: \"\\f115\";\r\n}\r\n.md-report:before {\r\n  content: \"\\f116\";\r\n}\r\n.md-save:before {\r\n  content: \"\\f117\";\r\n}\r\n.md-select-all:before {\r\n  content: \"\\f118\";\r\n}\r\n.md-send:before {\r\n  content: \"\\f119\";\r\n}\r\n.md-sort:before {\r\n  content: \"\\f11a\";\r\n}\r\n.md-text-format:before {\r\n  content: \"\\f11b\";\r\n}\r\n.md-undo:before {\r\n  content: \"\\f11c\";\r\n}\r\n.md-access-alarm:before {\r\n  content: \"\\f11d\";\r\n}\r\n.md-access-alarms:before {\r\n  content: \"\\f11e\";\r\n}\r\n.md-access-time:before {\r\n  content: \"\\f11f\";\r\n}\r\n.md-add-alarm:before {\r\n  content: \"\\f120\";\r\n}\r\n.md-airplanemode-off:before {\r\n  content: \"\\f121\";\r\n}\r\n.md-airplanemode-on:before {\r\n  content: \"\\f122\";\r\n}\r\n.md-battery-20:before {\r\n  content: \"\\f123\";\r\n}\r\n.md-battery-30:before {\r\n  content: \"\\f124\";\r\n}\r\n.md-battery-50:before {\r\n  content: \"\\f125\";\r\n}\r\n.md-battery-60:before {\r\n  content: \"\\f126\";\r\n}\r\n.md-battery-80:before {\r\n  content: \"\\f127\";\r\n}\r\n.md-battery-90:before {\r\n  content: \"\\f128\";\r\n}\r\n.md-battery-alert:before {\r\n  content: \"\\f129\";\r\n}\r\n.md-battery-charging-20:before {\r\n  content: \"\\f12a\";\r\n}\r\n.md-battery-charging-30:before {\r\n  content: \"\\f12b\";\r\n}\r\n.md-battery-charging-50:before {\r\n  content: \"\\f12c\";\r\n}\r\n.md-battery-charging-60:before {\r\n  content: \"\\f12d\";\r\n}\r\n.md-battery-charging-80:before {\r\n  content: \"\\f12e\";\r\n}\r\n.md-battery-charging-90:before {\r\n  content: \"\\f12f\";\r\n}\r\n.md-battery-charging-full:before {\r\n  content: \"\\f130\";\r\n}\r\n.md-battery-full:before {\r\n  content: \"\\f131\";\r\n}\r\n.md-battery-std:before {\r\n  content: \"\\f132\";\r\n}\r\n.md-battery-unknown:before {\r\n  content: \"\\f133\";\r\n}\r\n.md-bluetooth:before {\r\n  content: \"\\f134\";\r\n}\r\n.md-bluetooth-connected:before {\r\n  content: \"\\f135\";\r\n}\r\n.md-bluetooth-disabled:before {\r\n  content: \"\\f136\";\r\n}\r\n.md-bluetooth-searching:before {\r\n  content: \"\\f137\";\r\n}\r\n.md-brightness-auto:before {\r\n  content: \"\\f138\";\r\n}\r\n.md-brightness-high:before {\r\n  content: \"\\f139\";\r\n}\r\n.md-brightness-low:before {\r\n  content: \"\\f13a\";\r\n}\r\n.md-brightness-medium:before {\r\n  content: \"\\f13b\";\r\n}\r\n.md-data-usage:before {\r\n  content: \"\\f13c\";\r\n}\r\n.md-developer-mode:before {\r\n  content: \"\\f13d\";\r\n}\r\n.md-devices:before {\r\n  content: \"\\f13e\";\r\n}\r\n.md-dvr:before {\r\n  content: \"\\f13f\";\r\n}\r\n.md-gps-fixed:before {\r\n  content: \"\\f140\";\r\n}\r\n.md-gps-not-fixed:before {\r\n  content: \"\\f141\";\r\n}\r\n.md-gps-off:before {\r\n  content: \"\\f142\";\r\n}\r\n.md-location-disabled:before {\r\n  content: \"\\f143\";\r\n}\r\n.md-location-searching:before {\r\n  content: \"\\f144\";\r\n}\r\n.md-multitrack-audio:before {\r\n  content: \"\\f145\";\r\n}\r\n.md-network-cell:before {\r\n  content: \"\\f146\";\r\n}\r\n.md-network-wifi:before {\r\n  content: \"\\f147\";\r\n}\r\n.md-nfc:before {\r\n  content: \"\\f148\";\r\n}\r\n.md-now-wallpaper:before {\r\n  content: \"\\f149\";\r\n}\r\n.md-now-widgets:before {\r\n  content: \"\\f14a\";\r\n}\r\n.md-screen-lock-landscape:before {\r\n  content: \"\\f14b\";\r\n}\r\n.md-screen-lock-portrait:before {\r\n  content: \"\\f14c\";\r\n}\r\n.md-screen-lock-rotation:before {\r\n  content: \"\\f14d\";\r\n}\r\n.md-screen-rotation:before {\r\n  content: \"\\f14e\";\r\n}\r\n.md-sd-storage:before {\r\n  content: \"\\f14f\";\r\n}\r\n.md-settings-system-daydream:before {\r\n  content: \"\\f150\";\r\n}\r\n.md-signal-cellular-0-bar:before {\r\n  content: \"\\f151\";\r\n}\r\n.md-signal-cellular-1-bar:before {\r\n  content: \"\\f152\";\r\n}\r\n.md-signal-cellular-2-bar:before {\r\n  content: \"\\f153\";\r\n}\r\n.md-signal-cellular-3-bar:before {\r\n  content: \"\\f154\";\r\n}\r\n.md-signal-cellular-4-bar:before {\r\n  content: \"\\f155\";\r\n}\r\n.md-signal-cellular-connected-no-internet-0-bar:before {\r\n  content: \"\\f156\";\r\n}\r\n.md-signal-cellular-connected-no-internet-1-bar:before {\r\n  content: \"\\f157\";\r\n}\r\n.md-signal-cellular-connected-no-internet-2-bar:before {\r\n  content: \"\\f158\";\r\n}\r\n.md-signal-cellular-connected-no-internet-3-bar:before {\r\n  content: \"\\f159\";\r\n}\r\n.md-signal-cellular-connected-no-internet-4-bar:before {\r\n  content: \"\\f15a\";\r\n}\r\n.md-signal-cellular-no-sim:before {\r\n  content: \"\\f15b\";\r\n}\r\n.md-signal-cellular-null:before {\r\n  content: \"\\f15c\";\r\n}\r\n.md-signal-cellular-off:before {\r\n  content: \"\\f15d\";\r\n}\r\n.md-signal-wifi-0-bar:before {\r\n  content: \"\\f15e\";\r\n}\r\n.md-signal-wifi-1-bar:before {\r\n  content: \"\\f15f\";\r\n}\r\n.md-signal-wifi-2-bar:before {\r\n  content: \"\\f160\";\r\n}\r\n.md-signal-wifi-3-bar:before {\r\n  content: \"\\f161\";\r\n}\r\n.md-signal-wifi-4-bar:before {\r\n  content: \"\\f162\";\r\n}\r\n.md-signal-wifi-off:before {\r\n  content: \"\\f163\";\r\n}\r\n.md-storage:before {\r\n  content: \"\\f164\";\r\n}\r\n.md-usb:before {\r\n  content: \"\\f165\";\r\n}\r\n.md-wifi-lock:before {\r\n  content: \"\\f166\";\r\n}\r\n.md-wifi-tethering:before {\r\n  content: \"\\f167\";\r\n}\r\n.md-attach-file:before {\r\n  content: \"\\f168\";\r\n}\r\n.md-attach-money:before {\r\n  content: \"\\f169\";\r\n}\r\n.md-border-all:before {\r\n  content: \"\\f16a\";\r\n}\r\n.md-border-bottom:before {\r\n  content: \"\\f16b\";\r\n}\r\n.md-border-clear:before {\r\n  content: \"\\f16c\";\r\n}\r\n.md-border-color:before {\r\n  content: \"\\f16d\";\r\n}\r\n.md-border-horizontal:before {\r\n  content: \"\\f16e\";\r\n}\r\n.md-border-inner:before {\r\n  content: \"\\f16f\";\r\n}\r\n.md-border-left:before {\r\n  content: \"\\f170\";\r\n}\r\n.md-border-outer:before {\r\n  content: \"\\f171\";\r\n}\r\n.md-border-right:before {\r\n  content: \"\\f172\";\r\n}\r\n.md-border-style:before {\r\n  content: \"\\f173\";\r\n}\r\n.md-border-top:before {\r\n  content: \"\\f174\";\r\n}\r\n.md-border-vertical:before {\r\n  content: \"\\f175\";\r\n}\r\n.md-format-align-center:before {\r\n  content: \"\\f176\";\r\n}\r\n.md-format-align-justify:before {\r\n  content: \"\\f177\";\r\n}\r\n.md-format-align-left:before {\r\n  content: \"\\f178\";\r\n}\r\n.md-format-align-right:before {\r\n  content: \"\\f179\";\r\n}\r\n.md-format-bold:before {\r\n  content: \"\\f17a\";\r\n}\r\n.md-format-clear:before {\r\n  content: \"\\f17b\";\r\n}\r\n.md-format-color-fill:before {\r\n  content: \"\\f17c\";\r\n}\r\n.md-format-color-reset:before {\r\n  content: \"\\f17d\";\r\n}\r\n.md-format-color-text:before {\r\n  content: \"\\f17e\";\r\n}\r\n.md-format-indent-decrease:before {\r\n  content: \"\\f17f\";\r\n}\r\n.md-format-indent-increase:before {\r\n  content: \"\\f180\";\r\n}\r\n.md-format-italic:before {\r\n  content: \"\\f181\";\r\n}\r\n.md-format-line-spacing:before {\r\n  content: \"\\f182\";\r\n}\r\n.md-format-list-bulleted:before {\r\n  content: \"\\f183\";\r\n}\r\n.md-format-list-numbered:before {\r\n  content: \"\\f184\";\r\n}\r\n.md-format-paint:before {\r\n  content: \"\\f185\";\r\n}\r\n.md-format-quote:before {\r\n  content: \"\\f186\";\r\n}\r\n.md-format-size:before {\r\n  content: \"\\f187\";\r\n}\r\n.md-format-strikethrough:before {\r\n  content: \"\\f188\";\r\n}\r\n.md-format-textdirection-l-to-r:before {\r\n  content: \"\\f189\";\r\n}\r\n.md-format-textdirection-r-to-l:before {\r\n  content: \"\\f18a\";\r\n}\r\n.md-format-underline:before {\r\n  content: \"\\f18b\";\r\n}\r\n.md-functions:before {\r\n  content: \"\\f18c\";\r\n}\r\n.md-insert-chart:before {\r\n  content: \"\\f18d\";\r\n}\r\n.md-insert-comment:before {\r\n  content: \"\\f18e\";\r\n}\r\n.md-insert-drive-file:before {\r\n  content: \"\\f18f\";\r\n}\r\n.md-insert-emoticon:before {\r\n  content: \"\\f190\";\r\n}\r\n.md-insert-invitation:before {\r\n  content: \"\\f191\";\r\n}\r\n.md-insert-link:before {\r\n  content: \"\\f192\";\r\n}\r\n.md-insert-photo:before {\r\n  content: \"\\f193\";\r\n}\r\n.md-merge-type:before {\r\n  content: \"\\f194\";\r\n}\r\n.md-mode-comment:before {\r\n  content: \"\\f195\";\r\n}\r\n.md-mode-edit:before {\r\n  content: \"\\f196\";\r\n}\r\n.md-publish:before {\r\n  content: \"\\f197\";\r\n}\r\n.md-vertical-align-bottom:before {\r\n  content: \"\\f198\";\r\n}\r\n.md-vertical-align-center:before {\r\n  content: \"\\f199\";\r\n}\r\n.md-vertical-align-top:before {\r\n  content: \"\\f19a\";\r\n}\r\n.md-wrap-text:before {\r\n  content: \"\\f19b\";\r\n}\r\n.md-attachment:before {\r\n  content: \"\\f19c\";\r\n}\r\n.md-cloud:before {\r\n  content: \"\\f19d\";\r\n}\r\n.md-cloud-circle:before {\r\n  content: \"\\f19e\";\r\n}\r\n.md-cloud-done:before {\r\n  content: \"\\f19f\";\r\n}\r\n.md-cloud-download:before {\r\n  content: \"\\f1a0\";\r\n}\r\n.md-cloud-off:before {\r\n  content: \"\\f1a1\";\r\n}\r\n.md-cloud-queue:before {\r\n  content: \"\\f1a2\";\r\n}\r\n.md-cloud-upload:before {\r\n  content: \"\\f1a3\";\r\n}\r\n.md-file-download:before {\r\n  content: \"\\f1a4\";\r\n}\r\n.md-file-upload:before {\r\n  content: \"\\f1a5\";\r\n}\r\n.md-folder:before {\r\n  content: \"\\f1a6\";\r\n}\r\n.md-folder-open:before {\r\n  content: \"\\f1a7\";\r\n}\r\n.md-folder-shared:before {\r\n  content: \"\\f1a8\";\r\n}\r\n.md-cast:before {\r\n  content: \"\\f1a9\";\r\n}\r\n.md-cast-connected:before {\r\n  content: \"\\f1aa\";\r\n}\r\n.md-computer:before {\r\n  content: \"\\f1ab\";\r\n}\r\n.md-desktop-mac:before {\r\n  content: \"\\f1ac\";\r\n}\r\n.md-desktop-windows:before {\r\n  content: \"\\f1ad\";\r\n}\r\n.md-dock:before {\r\n  content: \"\\f1ae\";\r\n}\r\n.md-gamepad:before {\r\n  content: \"\\f1af\";\r\n}\r\n.md-headset:before {\r\n  content: \"\\f1b0\";\r\n}\r\n.md-headset-mic:before {\r\n  content: \"\\f1b1\";\r\n}\r\n.md-keyboard:before {\r\n  content: \"\\f1b2\";\r\n}\r\n.md-keyboard-alt:before {\r\n  content: \"\\f1b3\";\r\n}\r\n.md-keyboard-arrow-down:before {\r\n  content: \"\\f1b4\";\r\n}\r\n.md-keyboard-arrow-left:before {\r\n  content: \"\\f1b5\";\r\n}\r\n.md-keyboard-arrow-right:before {\r\n  content: \"\\f1b6\";\r\n}\r\n.md-keyboard-arrow-up:before {\r\n  content: \"\\f1b7\";\r\n}\r\n.md-keyboard-backspace:before {\r\n  content: \"\\f1b8\";\r\n}\r\n.md-keyboard-capslock:before {\r\n  content: \"\\f1b9\";\r\n}\r\n.md-keyboard-control:before {\r\n  content: \"\\f1ba\";\r\n}\r\n.md-keyboard-hide:before {\r\n  content: \"\\f1bb\";\r\n}\r\n.md-keyboard-return:before {\r\n  content: \"\\f1bc\";\r\n}\r\n.md-keyboard-tab:before {\r\n  content: \"\\f1bd\";\r\n}\r\n.md-keyboard-voice:before {\r\n  content: \"\\f1be\";\r\n}\r\n.md-laptop:before {\r\n  content: \"\\f1bf\";\r\n}\r\n.md-laptop-chromebook:before {\r\n  content: \"\\f1c0\";\r\n}\r\n.md-laptop-mac:before {\r\n  content: \"\\f1c1\";\r\n}\r\n.md-laptop-windows:before {\r\n  content: \"\\f1c2\";\r\n}\r\n.md-memory:before {\r\n  content: \"\\f1c3\";\r\n}\r\n.md-mouse:before {\r\n  content: \"\\f1c4\";\r\n}\r\n.md-phone-android:before {\r\n  content: \"\\f1c5\";\r\n}\r\n.md-phone-iphone:before {\r\n  content: \"\\f1c6\";\r\n}\r\n.md-phonelink:before {\r\n  content: \"\\f1c7\";\r\n}\r\n.md-phonelink-off:before {\r\n  content: \"\\f1c8\";\r\n}\r\n.md-security:before {\r\n  content: \"\\f1c9\";\r\n}\r\n.md-sim-card:before {\r\n  content: \"\\f1ca\";\r\n}\r\n.md-smartphone:before {\r\n  content: \"\\f1cb\";\r\n}\r\n.md-speaker:before {\r\n  content: \"\\f1cc\";\r\n}\r\n.md-tablet:before {\r\n  content: \"\\f1cd\";\r\n}\r\n.md-tablet-android:before {\r\n  content: \"\\f1ce\";\r\n}\r\n.md-tablet-mac:before {\r\n  content: \"\\f1cf\";\r\n}\r\n.md-tv:before {\r\n  content: \"\\f1d0\";\r\n}\r\n.md-watch:before {\r\n  content: \"\\f1d1\";\r\n}\r\n.md-add-to-photos:before {\r\n  content: \"\\f1d2\";\r\n}\r\n.md-adjust:before {\r\n  content: \"\\f1d3\";\r\n}\r\n.md-assistant-photo:before {\r\n  content: \"\\f1d4\";\r\n}\r\n.md-audiotrack:before {\r\n  content: \"\\f1d5\";\r\n}\r\n.md-blur-circular:before {\r\n  content: \"\\f1d6\";\r\n}\r\n.md-blur-linear:before {\r\n  content: \"\\f1d7\";\r\n}\r\n.md-blur-off:before {\r\n  content: \"\\f1d8\";\r\n}\r\n.md-blur-on:before {\r\n  content: \"\\f1d9\";\r\n}\r\n.md-brightness-1:before {\r\n  content: \"\\f1da\";\r\n}\r\n.md-brightness-2:before {\r\n  content: \"\\f1db\";\r\n}\r\n.md-brightness-3:before {\r\n  content: \"\\f1dc\";\r\n}\r\n.md-brightness-4:before {\r\n  content: \"\\f1dd\";\r\n}\r\n.md-brightness-5:before {\r\n  content: \"\\f1de\";\r\n}\r\n.md-brightness-6:before {\r\n  content: \"\\f1df\";\r\n}\r\n.md-brightness-7:before {\r\n  content: \"\\f1e0\";\r\n}\r\n.md-brush:before {\r\n  content: \"\\f1e1\";\r\n}\r\n.md-camera:before {\r\n  content: \"\\f1e2\";\r\n}\r\n.md-camera-alt:before {\r\n  content: \"\\f1e3\";\r\n}\r\n.md-camera-front:before {\r\n  content: \"\\f1e4\";\r\n}\r\n.md-camera-rear:before {\r\n  content: \"\\f1e5\";\r\n}\r\n.md-camera-roll:before {\r\n  content: \"\\f1e6\";\r\n}\r\n.md-center-focus-strong:before {\r\n  content: \"\\f1e7\";\r\n}\r\n.md-center-focus-weak:before {\r\n  content: \"\\f1e8\";\r\n}\r\n.md-collections:before {\r\n  content: \"\\f1e9\";\r\n}\r\n.md-colorize:before {\r\n  content: \"\\f1ea\";\r\n}\r\n.md-color-lens:before {\r\n  content: \"\\f1eb\";\r\n}\r\n.md-compare:before {\r\n  content: \"\\f1ec\";\r\n}\r\n.md-control-point:before {\r\n  content: \"\\f1ed\";\r\n}\r\n.md-control-point-duplicate:before {\r\n  content: \"\\f1ee\";\r\n}\r\n.md-crop:before {\r\n  content: \"\\f1ef\";\r\n}\r\n.md-crop-3-2:before {\r\n  content: \"\\f1f0\";\r\n}\r\n.md-crop-5-4:before {\r\n  content: \"\\f1f1\";\r\n}\r\n.md-crop-7-5:before {\r\n  content: \"\\f1f2\";\r\n}\r\n.md-crop-16-9:before {\r\n  content: \"\\f1f3\";\r\n}\r\n.md-crop-din:before {\r\n  content: \"\\f1f4\";\r\n}\r\n.md-crop-free:before {\r\n  content: \"\\f1f5\";\r\n}\r\n.md-crop-landscape:before {\r\n  content: \"\\f1f6\";\r\n}\r\n.md-crop-original:before {\r\n  content: \"\\f1f7\";\r\n}\r\n.md-crop-portrait:before {\r\n  content: \"\\f1f8\";\r\n}\r\n.md-crop-square:before {\r\n  content: \"\\f1f9\";\r\n}\r\n.md-dehaze:before {\r\n  content: \"\\f1fa\";\r\n}\r\n.md-details:before {\r\n  content: \"\\f1fb\";\r\n}\r\n.md-edit:before {\r\n  content: \"\\f1fc\";\r\n}\r\n.md-exposure:before {\r\n  content: \"\\f1fd\";\r\n}\r\n.md-exposure-minus-1:before {\r\n  content: \"\\f1fe\";\r\n}\r\n.md-exposure-minus-2:before {\r\n  content: \"\\f1ff\";\r\n}\r\n.md-exposure-zero:before {\r\n  content: \"\\f200\";\r\n}\r\n.md-exposure-plus-1:before {\r\n  content: \"\\f201\";\r\n}\r\n.md-exposure-plus-2:before {\r\n  content: \"\\f202\";\r\n}\r\n.md-filter:before {\r\n  content: \"\\f203\";\r\n}\r\n.md-filter-1:before {\r\n  content: \"\\f204\";\r\n}\r\n.md-filter-2:before {\r\n  content: \"\\f205\";\r\n}\r\n.md-filter-3:before {\r\n  content: \"\\f206\";\r\n}\r\n.md-filter-4:before {\r\n  content: \"\\f207\";\r\n}\r\n.md-filter-5:before {\r\n  content: \"\\f208\";\r\n}\r\n.md-filter-6:before {\r\n  content: \"\\f209\";\r\n}\r\n.md-filter-7:before {\r\n  content: \"\\f20a\";\r\n}\r\n.md-filter-8:before {\r\n  content: \"\\f20b\";\r\n}\r\n.md-filter-9:before {\r\n  content: \"\\f20c\";\r\n}\r\n.md-filter-9-plus:before {\r\n  content: \"\\f20d\";\r\n}\r\n.md-filter-b-and-w:before {\r\n  content: \"\\f20e\";\r\n}\r\n.md-filter-center-focus:before {\r\n  content: \"\\f20f\";\r\n}\r\n.md-filter-drama:before {\r\n  content: \"\\f210\";\r\n}\r\n.md-filter-frames:before {\r\n  content: \"\\f211\";\r\n}\r\n.md-filter-hdr:before {\r\n  content: \"\\f212\";\r\n}\r\n.md-filter-none:before {\r\n  content: \"\\f213\";\r\n}\r\n.md-filter-tilt-shift:before {\r\n  content: \"\\f214\";\r\n}\r\n.md-filter-vintage:before {\r\n  content: \"\\f215\";\r\n}\r\n.md-flare:before {\r\n  content: \"\\f216\";\r\n}\r\n.md-flash-auto:before {\r\n  content: \"\\f217\";\r\n}\r\n.md-flash-off:before {\r\n  content: \"\\f218\";\r\n}\r\n.md-flash-on:before {\r\n  content: \"\\f219\";\r\n}\r\n.md-flip:before {\r\n  content: \"\\f21a\";\r\n}\r\n.md-gradient:before {\r\n  content: \"\\f21b\";\r\n}\r\n.md-grain:before {\r\n  content: \"\\f21c\";\r\n}\r\n.md-grid-off:before {\r\n  content: \"\\f21d\";\r\n}\r\n.md-grid-on:before {\r\n  content: \"\\f21e\";\r\n}\r\n.md-hdr-off:before {\r\n  content: \"\\f21f\";\r\n}\r\n.md-hdr-on:before {\r\n  content: \"\\f220\";\r\n}\r\n.md-hdr-strong:before {\r\n  content: \"\\f221\";\r\n}\r\n.md-hdr-weak:before {\r\n  content: \"\\f222\";\r\n}\r\n.md-healing:before {\r\n  content: \"\\f223\";\r\n}\r\n.md-image:before {\r\n  content: \"\\f224\";\r\n}\r\n.md-image-aspect-ratio:before {\r\n  content: \"\\f225\";\r\n}\r\n.md-iso:before {\r\n  content: \"\\f226\";\r\n}\r\n.md-landscape:before {\r\n  content: \"\\f227\";\r\n}\r\n.md-leak-add:before {\r\n  content: \"\\f228\";\r\n}\r\n.md-leak-remove:before {\r\n  content: \"\\f229\";\r\n}\r\n.md-lens:before {\r\n  content: \"\\f22a\";\r\n}\r\n.md-looks:before {\r\n  content: \"\\f22b\";\r\n}\r\n.md-looks-1:before {\r\n  content: \"\\f22c\";\r\n}\r\n.md-looks-2:before {\r\n  content: \"\\f22d\";\r\n}\r\n.md-looks-3:before {\r\n  content: \"\\f22e\";\r\n}\r\n.md-looks-4:before {\r\n  content: \"\\f22f\";\r\n}\r\n.md-looks-5:before {\r\n  content: \"\\f230\";\r\n}\r\n.md-looks-6:before {\r\n  content: \"\\f231\";\r\n}\r\n.md-loupe:before {\r\n  content: \"\\f232\";\r\n}\r\n.md-movie-creation:before {\r\n  content: \"\\f233\";\r\n}\r\n.md-nature:before {\r\n  content: \"\\f234\";\r\n}\r\n.md-nature-people:before {\r\n  content: \"\\f235\";\r\n}\r\n.md-navigate-before:before {\r\n  content: \"\\f236\";\r\n}\r\n.md-navigate-next:before {\r\n  content: \"\\f237\";\r\n}\r\n.md-palette:before {\r\n  content: \"\\f238\";\r\n}\r\n.md-panorama:before {\r\n  content: \"\\f239\";\r\n}\r\n.md-panorama-fisheye:before {\r\n  content: \"\\f23a\";\r\n}\r\n.md-panorama-horizontal:before {\r\n  content: \"\\f23b\";\r\n}\r\n.md-panorama-vertical:before {\r\n  content: \"\\f23c\";\r\n}\r\n.md-panorama-wide-angle:before {\r\n  content: \"\\f23d\";\r\n}\r\n.md-photo:before {\r\n  content: \"\\f23e\";\r\n}\r\n.md-photo-album:before {\r\n  content: \"\\f23f\";\r\n}\r\n.md-photo-camera:before {\r\n  content: \"\\f240\";\r\n}\r\n.md-photo-library:before {\r\n  content: \"\\f241\";\r\n}\r\n.md-portrait:before {\r\n  content: \"\\f242\";\r\n}\r\n.md-remove-red-eye:before {\r\n  content: \"\\f243\";\r\n}\r\n.md-rotate-left:before {\r\n  content: \"\\f244\";\r\n}\r\n.md-rotate-right:before {\r\n  content: \"\\f245\";\r\n}\r\n.md-slideshow:before {\r\n  content: \"\\f246\";\r\n}\r\n.md-straighten:before {\r\n  content: \"\\f247\";\r\n}\r\n.md-style:before {\r\n  content: \"\\f248\";\r\n}\r\n.md-switch-camera:before {\r\n  content: \"\\f249\";\r\n}\r\n.md-switch-video:before {\r\n  content: \"\\f24a\";\r\n}\r\n.md-tag-faces:before {\r\n  content: \"\\f24b\";\r\n}\r\n.md-texture:before {\r\n  content: \"\\f24c\";\r\n}\r\n.md-timelapse:before {\r\n  content: \"\\f24d\";\r\n}\r\n.md-timer:before {\r\n  content: \"\\f24e\";\r\n}\r\n.md-timer-3:before {\r\n  content: \"\\f24f\";\r\n}\r\n.md-timer-10:before {\r\n  content: \"\\f250\";\r\n}\r\n.md-timer-auto:before {\r\n  content: \"\\f251\";\r\n}\r\n.md-timer-off:before {\r\n  content: \"\\f252\";\r\n}\r\n.md-tonality:before {\r\n  content: \"\\f253\";\r\n}\r\n.md-transform:before {\r\n  content: \"\\f254\";\r\n}\r\n.md-tune:before {\r\n  content: \"\\f255\";\r\n}\r\n.md-wb-auto:before {\r\n  content: \"\\f256\";\r\n}\r\n.md-wb-cloudy:before {\r\n  content: \"\\f257\";\r\n}\r\n.md-wb-incandescent:before {\r\n  content: \"\\f258\";\r\n}\r\n.md-wb-irradescent:before {\r\n  content: \"\\f259\";\r\n}\r\n.md-wb-sunny:before {\r\n  content: \"\\f25a\";\r\n}\r\n.md-beenhere:before {\r\n  content: \"\\f25b\";\r\n}\r\n.md-directions:before {\r\n  content: \"\\f25c\";\r\n}\r\n.md-directions-bike:before {\r\n  content: \"\\f25d\";\r\n}\r\n.md-directions-bus:before {\r\n  content: \"\\f25e\";\r\n}\r\n.md-directions-car:before {\r\n  content: \"\\f25f\";\r\n}\r\n.md-directions-ferry:before {\r\n  content: \"\\f260\";\r\n}\r\n.md-directions-subway:before {\r\n  content: \"\\f261\";\r\n}\r\n.md-directions-train:before {\r\n  content: \"\\f262\";\r\n}\r\n.md-directions-transit:before {\r\n  content: \"\\f263\";\r\n}\r\n.md-directions-walk:before {\r\n  content: \"\\f264\";\r\n}\r\n.md-flight:before {\r\n  content: \"\\f265\";\r\n}\r\n.md-hotel:before {\r\n  content: \"\\f266\";\r\n}\r\n.md-layers:before {\r\n  content: \"\\f267\";\r\n}\r\n.md-layers-clear:before {\r\n  content: \"\\f268\";\r\n}\r\n.md-local-airport:before {\r\n  content: \"\\f269\";\r\n}\r\n.md-local-atm:before {\r\n  content: \"\\f26a\";\r\n}\r\n.md-local-attraction:before {\r\n  content: \"\\f26b\";\r\n}\r\n.md-local-bar:before {\r\n  content: \"\\f26c\";\r\n}\r\n.md-local-cafe:before {\r\n  content: \"\\f26d\";\r\n}\r\n.md-local-car-wash:before {\r\n  content: \"\\f26e\";\r\n}\r\n.md-local-convenience-store:before {\r\n  content: \"\\f26f\";\r\n}\r\n.md-local-drink:before {\r\n  content: \"\\f270\";\r\n}\r\n.md-local-florist:before {\r\n  content: \"\\f271\";\r\n}\r\n.md-local-gas-station:before {\r\n  content: \"\\f272\";\r\n}\r\n.md-local-grocery-store:before {\r\n  content: \"\\f273\";\r\n}\r\n.md-local-hospital:before {\r\n  content: \"\\f274\";\r\n}\r\n.md-local-hotel:before {\r\n  content: \"\\f275\";\r\n}\r\n.md-local-laundry-service:before {\r\n  content: \"\\f276\";\r\n}\r\n.md-local-library:before {\r\n  content: \"\\f277\";\r\n}\r\n.md-local-mall:before {\r\n  content: \"\\f278\";\r\n}\r\n.md-local-movies:before {\r\n  content: \"\\f279\";\r\n}\r\n.md-local-offer:before {\r\n  content: \"\\f27a\";\r\n}\r\n.md-local-parking:before {\r\n  content: \"\\f27b\";\r\n}\r\n.md-local-pharmacy:before {\r\n  content: \"\\f27c\";\r\n}\r\n.md-local-phone:before {\r\n  content: \"\\f27d\";\r\n}\r\n.md-local-pizza:before {\r\n  content: \"\\f27e\";\r\n}\r\n.md-local-play:before {\r\n  content: \"\\f27f\";\r\n}\r\n.md-local-post-office:before {\r\n  content: \"\\f280\";\r\n}\r\n.md-local-print-shop:before {\r\n  content: \"\\f281\";\r\n}\r\n.md-local-restaurant:before {\r\n  content: \"\\f282\";\r\n}\r\n.md-local-see:before {\r\n  content: \"\\f283\";\r\n}\r\n.md-local-shipping:before {\r\n  content: \"\\f284\";\r\n}\r\n.md-local-taxi:before {\r\n  content: \"\\f285\";\r\n}\r\n.md-location-history:before {\r\n  content: \"\\f286\";\r\n}\r\n.md-map:before {\r\n  content: \"\\f287\";\r\n}\r\n.md-my-location:before {\r\n  content: \"\\f288\";\r\n}\r\n.md-navigation:before {\r\n  content: \"\\f289\";\r\n}\r\n.md-pin-drop:before {\r\n  content: \"\\f28a\";\r\n}\r\n.md-place:before {\r\n  content: \"\\f28b\";\r\n}\r\n.md-rate-review:before {\r\n  content: \"\\f28c\";\r\n}\r\n.md-restaurant-menu:before {\r\n  content: \"\\f28d\";\r\n}\r\n.md-satellite:before {\r\n  content: \"\\f28e\";\r\n}\r\n.md-store-mall-directory:before {\r\n  content: \"\\f28f\";\r\n}\r\n.md-terrain:before {\r\n  content: \"\\f290\";\r\n}\r\n.md-traffic:before {\r\n  content: \"\\f291\";\r\n}\r\n.md-apps:before {\r\n  content: \"\\f292\";\r\n}\r\n.md-cancel:before {\r\n  content: \"\\f293\";\r\n}\r\n.md-arrow-drop-down-circle:before {\r\n  content: \"\\f294\";\r\n}\r\n.md-arrow-drop-down:before {\r\n  content: \"\\f295\";\r\n}\r\n.md-arrow-drop-up:before {\r\n  content: \"\\f296\";\r\n}\r\n.md-arrow-back:before {\r\n  content: \"\\f297\";\r\n}\r\n.md-arrow-forward:before {\r\n  content: \"\\f298\";\r\n}\r\n.md-check:before {\r\n  content: \"\\f299\";\r\n}\r\n.md-close:before {\r\n  content: \"\\f29a\";\r\n}\r\n.md-chevron-left:before {\r\n  content: \"\\f29b\";\r\n}\r\n.md-chevron-right:before {\r\n  content: \"\\f29c\";\r\n}\r\n.md-expand-less:before {\r\n  content: \"\\f29d\";\r\n}\r\n.md-expand-more:before {\r\n  content: \"\\f29e\";\r\n}\r\n.md-fullscreen:before {\r\n  content: \"\\f29f\";\r\n}\r\n.md-fullscreen-exit:before {\r\n  content: \"\\f2a0\";\r\n}\r\n.md-menu:before {\r\n  content: \"\\f2a1\";\r\n}\r\n.md-more-horiz:before {\r\n  content: \"\\f2a2\";\r\n}\r\n.md-more-vert:before {\r\n  content: \"\\f2a3\";\r\n}\r\n.md-refresh:before {\r\n  content: \"\\f2a4\";\r\n}\r\n.md-unfold-less:before {\r\n  content: \"\\f2a5\";\r\n}\r\n.md-unfold-more:before {\r\n  content: \"\\f2a6\";\r\n}\r\n.md-adb:before {\r\n  content: \"\\f2a7\";\r\n}\r\n.md-bluetooth-audio:before {\r\n  content: \"\\f2a8\";\r\n}\r\n.md-disc-full:before {\r\n  content: \"\\f2a9\";\r\n}\r\n.md-dnd-forwardslash:before {\r\n  content: \"\\f2aa\";\r\n}\r\n.md-do-not-disturb:before {\r\n  content: \"\\f2ab\";\r\n}\r\n.md-drive-eta:before {\r\n  content: \"\\f2ac\";\r\n}\r\n.md-event-available:before {\r\n  content: \"\\f2ad\";\r\n}\r\n.md-event-busy:before {\r\n  content: \"\\f2ae\";\r\n}\r\n.md-event-note:before {\r\n  content: \"\\f2af\";\r\n}\r\n.md-folder-special:before {\r\n  content: \"\\f2b0\";\r\n}\r\n.md-mms:before {\r\n  content: \"\\f2b1\";\r\n}\r\n.md-more:before {\r\n  content: \"\\f2b2\";\r\n}\r\n.md-network-locked:before {\r\n  content: \"\\f2b3\";\r\n}\r\n.md-phone-bluetooth-speaker:before {\r\n  content: \"\\f2b4\";\r\n}\r\n.md-phone-forwarded:before {\r\n  content: \"\\f2b5\";\r\n}\r\n.md-phone-in-talk:before {\r\n  content: \"\\f2b6\";\r\n}\r\n.md-phone-locked:before {\r\n  content: \"\\f2b7\";\r\n}\r\n.md-phone-missed:before {\r\n  content: \"\\f2b8\";\r\n}\r\n.md-phone-paused:before {\r\n  content: \"\\f2b9\";\r\n}\r\n.md-play-download:before {\r\n  content: \"\\f2ba\";\r\n}\r\n.md-play-install:before {\r\n  content: \"\\f2bb\";\r\n}\r\n.md-sd-card:before {\r\n  content: \"\\f2bc\";\r\n}\r\n.md-sim-card-alert:before {\r\n  content: \"\\f2bd\";\r\n}\r\n.md-sms:before {\r\n  content: \"\\f2be\";\r\n}\r\n.md-sms-failed:before {\r\n  content: \"\\f2bf\";\r\n}\r\n.md-sync:before {\r\n  content: \"\\f2c0\";\r\n}\r\n.md-sync-disabled:before {\r\n  content: \"\\f2c1\";\r\n}\r\n.md-sync-problem:before {\r\n  content: \"\\f2c2\";\r\n}\r\n.md-system-update:before {\r\n  content: \"\\f2c3\";\r\n}\r\n.md-tap-and-play:before {\r\n  content: \"\\f2c4\";\r\n}\r\n.md-time-to-leave:before {\r\n  content: \"\\f2c5\";\r\n}\r\n.md-vibration:before {\r\n  content: \"\\f2c6\";\r\n}\r\n.md-voice-chat:before {\r\n  content: \"\\f2c7\";\r\n}\r\n.md-vpn-lock:before {\r\n  content: \"\\f2c8\";\r\n}\r\n.md-cake:before {\r\n  content: \"\\f2c9\";\r\n}\r\n.md-domain:before {\r\n  content: \"\\f2ca\";\r\n}\r\n.md-location-city:before {\r\n  content: \"\\f2cb\";\r\n}\r\n.md-mood:before {\r\n  content: \"\\f2cc\";\r\n}\r\n.md-notifications-none:before {\r\n  content: \"\\f2cd\";\r\n}\r\n.md-notifications:before {\r\n  content: \"\\f2ce\";\r\n}\r\n.md-notifications-off:before {\r\n  content: \"\\f2cf\";\r\n}\r\n.md-notifications-on:before {\r\n  content: \"\\f2d0\";\r\n}\r\n.md-notifications-paused:before {\r\n  content: \"\\f2d1\";\r\n}\r\n.md-pages:before {\r\n  content: \"\\f2d2\";\r\n}\r\n.md-party-mode:before {\r\n  content: \"\\f2d3\";\r\n}\r\n.md-group:before {\r\n  content: \"\\f2d4\";\r\n}\r\n.md-group-add:before {\r\n  content: \"\\f2d5\";\r\n}\r\n.md-people:before {\r\n  content: \"\\f2d6\";\r\n}\r\n.md-people-outline:before {\r\n  content: \"\\f2d7\";\r\n}\r\n.md-person:before {\r\n  content: \"\\f2d8\";\r\n}\r\n.md-person-add:before {\r\n  content: \"\\f2d9\";\r\n}\r\n.md-person-outline:before {\r\n  content: \"\\f2da\";\r\n}\r\n.md-plus-one:before {\r\n  content: \"\\f2db\";\r\n}\r\n.md-poll:before {\r\n  content: \"\\f2dc\";\r\n}\r\n.md-public:before {\r\n  content: \"\\f2dd\";\r\n}\r\n.md-school:before {\r\n  content: \"\\f2de\";\r\n}\r\n.md-share:before {\r\n  content: \"\\f2df\";\r\n}\r\n.md-whatshot:before {\r\n  content: \"\\f2e0\";\r\n}\r\n.md-check-box:before {\r\n  content: \"\\f2e1\";\r\n}\r\n.md-check-box-outline-blank:before {\r\n  content: \"\\f2e2\";\r\n}\r\n.md-radio-button-off:before {\r\n  content: \"\\f2e3\";\r\n}\r\n.md-radio-button-on:before {\r\n  content: \"\\f2e4\";\r\n}\r\n.md-star:before {\r\n  content: \"\\f2e5\";\r\n}\r\n.md-star-half:before {\r\n  content: \"\\f2e6\";\r\n}\r\n.md-star-outline:before {\r\n  content: \"\\f2e7\";\r\n}\r\n/*!\r\nIonicons, v1.5.0\r\nCreated by Ben Sperry for the Ionic Framework, http://ionicons.com/\r\nhttps://twitter.com/benjsperry  https://twitter.com/ionicframework\r\nMIT License: https://github.com/driftyco/ionicons\r\n*/\r\n@font-face {\r\n  font-family: \"Ionicons\";\r\n  src: url(\"../fonts/ionicons.eot?v=1.5.0\");\r\n  src: url(\"../fonts/ionicons.eot?v=1.5.0#iefix\") format(\"embedded-opentype\"), url(\"../fonts/ionicons.ttf?v=1.5.0\") format(\"truetype\"), url(\"../fonts/ionicons.woff?v=1.5.0\") format(\"woff\"), url(\"../fonts/ionicons.svg?v=1.5.0#Ionicons\") format(\"svg\");\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n.ion,\r\n.ion-loading-a,\r\n.ion-loading-b,\r\n.ion-loading-c,\r\n.ion-loading-d,\r\n.ion-looping,\r\n.ion-refreshing,\r\n.ion-ios7-reloading,\r\n.ionicons,\r\n.ion-alert,\r\n.ion-alert-circled,\r\n.ion-android-add,\r\n.ion-android-add-contact,\r\n.ion-android-alarm,\r\n.ion-android-archive,\r\n.ion-android-arrow-back,\r\n.ion-android-arrow-down-left,\r\n.ion-android-arrow-down-right,\r\n.ion-android-arrow-forward,\r\n.ion-android-arrow-up-left,\r\n.ion-android-arrow-up-right,\r\n.ion-android-battery,\r\n.ion-android-book,\r\n.ion-android-calendar,\r\n.ion-android-call,\r\n.ion-android-camera,\r\n.ion-android-chat,\r\n.ion-android-checkmark,\r\n.ion-android-clock,\r\n.ion-android-close,\r\n.ion-android-contact,\r\n.ion-android-contacts,\r\n.ion-android-data,\r\n.ion-android-developer,\r\n.ion-android-display,\r\n.ion-android-download,\r\n.ion-android-drawer,\r\n.ion-android-dropdown,\r\n.ion-android-earth,\r\n.ion-android-folder,\r\n.ion-android-forums,\r\n.ion-android-friends,\r\n.ion-android-hand,\r\n.ion-android-image,\r\n.ion-android-inbox,\r\n.ion-android-information,\r\n.ion-android-keypad,\r\n.ion-android-lightbulb,\r\n.ion-android-locate,\r\n.ion-android-location,\r\n.ion-android-mail,\r\n.ion-android-microphone,\r\n.ion-android-mixer,\r\n.ion-android-more,\r\n.ion-android-note,\r\n.ion-android-playstore,\r\n.ion-android-printer,\r\n.ion-android-promotion,\r\n.ion-android-reminder,\r\n.ion-android-remove,\r\n.ion-android-search,\r\n.ion-android-send,\r\n.ion-android-settings,\r\n.ion-android-share,\r\n.ion-android-social,\r\n.ion-android-social-user,\r\n.ion-android-sort,\r\n.ion-android-stair-drawer,\r\n.ion-android-star,\r\n.ion-android-stopwatch,\r\n.ion-android-storage,\r\n.ion-android-system-back,\r\n.ion-android-system-home,\r\n.ion-android-system-windows,\r\n.ion-android-timer,\r\n.ion-android-trash,\r\n.ion-android-user-menu,\r\n.ion-android-volume,\r\n.ion-android-wifi,\r\n.ion-aperture,\r\n.ion-archive,\r\n.ion-arrow-down-a,\r\n.ion-arrow-down-b,\r\n.ion-arrow-down-c,\r\n.ion-arrow-expand,\r\n.ion-arrow-graph-down-left,\r\n.ion-arrow-graph-down-right,\r\n.ion-arrow-graph-up-left,\r\n.ion-arrow-graph-up-right,\r\n.ion-arrow-left-a,\r\n.ion-arrow-left-b,\r\n.ion-arrow-left-c,\r\n.ion-arrow-move,\r\n.ion-arrow-resize,\r\n.ion-arrow-return-left,\r\n.ion-arrow-return-right,\r\n.ion-arrow-right-a,\r\n.ion-arrow-right-b,\r\n.ion-arrow-right-c,\r\n.ion-arrow-shrink,\r\n.ion-arrow-swap,\r\n.ion-arrow-up-a,\r\n.ion-arrow-up-b,\r\n.ion-arrow-up-c,\r\n.ion-asterisk,\r\n.ion-at,\r\n.ion-bag,\r\n.ion-battery-charging,\r\n.ion-battery-empty,\r\n.ion-battery-full,\r\n.ion-battery-half,\r\n.ion-battery-low,\r\n.ion-beaker,\r\n.ion-beer,\r\n.ion-bluetooth,\r\n.ion-bonfire,\r\n.ion-bookmark,\r\n.ion-briefcase,\r\n.ion-bug,\r\n.ion-calculator,\r\n.ion-calendar,\r\n.ion-camera,\r\n.ion-card,\r\n.ion-cash,\r\n.ion-chatbox,\r\n.ion-chatbox-working,\r\n.ion-chatboxes,\r\n.ion-chatbubble,\r\n.ion-chatbubble-working,\r\n.ion-chatbubbles,\r\n.ion-checkmark,\r\n.ion-checkmark-circled,\r\n.ion-checkmark-round,\r\n.ion-chevron-down,\r\n.ion-chevron-left,\r\n.ion-chevron-right,\r\n.ion-chevron-up,\r\n.ion-clipboard,\r\n.ion-clock,\r\n.ion-close,\r\n.ion-close-circled,\r\n.ion-close-round,\r\n.ion-closed-captioning,\r\n.ion-cloud,\r\n.ion-code,\r\n.ion-code-download,\r\n.ion-code-working,\r\n.ion-coffee,\r\n.ion-compass,\r\n.ion-compose,\r\n.ion-connection-bars,\r\n.ion-contrast,\r\n.ion-cube,\r\n.ion-disc,\r\n.ion-document,\r\n.ion-document-text,\r\n.ion-drag,\r\n.ion-earth,\r\n.ion-edit,\r\n.ion-egg,\r\n.ion-eject,\r\n.ion-email,\r\n.ion-eye,\r\n.ion-eye-disabled,\r\n.ion-female,\r\n.ion-filing,\r\n.ion-film-marker,\r\n.ion-fireball,\r\n.ion-flag,\r\n.ion-flame,\r\n.ion-flash,\r\n.ion-flash-off,\r\n.ion-flask,\r\n.ion-folder,\r\n.ion-fork,\r\n.ion-fork-repo,\r\n.ion-forward,\r\n.ion-funnel,\r\n.ion-game-controller-a,\r\n.ion-game-controller-b,\r\n.ion-gear-a,\r\n.ion-gear-b,\r\n.ion-grid,\r\n.ion-hammer,\r\n.ion-happy,\r\n.ion-headphone,\r\n.ion-heart,\r\n.ion-heart-broken,\r\n.ion-help,\r\n.ion-help-buoy,\r\n.ion-help-circled,\r\n.ion-home,\r\n.ion-icecream,\r\n.ion-icon-social-google-plus,\r\n.ion-icon-social-google-plus-outline,\r\n.ion-image,\r\n.ion-images,\r\n.ion-information,\r\n.ion-information-circled,\r\n.ion-ionic,\r\n.ion-ios7-alarm,\r\n.ion-ios7-alarm-outline,\r\n.ion-ios7-albums,\r\n.ion-ios7-albums-outline,\r\n.ion-ios7-americanfootball,\r\n.ion-ios7-americanfootball-outline,\r\n.ion-ios7-analytics,\r\n.ion-ios7-analytics-outline,\r\n.ion-ios7-arrow-back,\r\n.ion-ios7-arrow-down,\r\n.ion-ios7-arrow-forward,\r\n.ion-ios7-arrow-left,\r\n.ion-ios7-arrow-right,\r\n.ion-ios7-arrow-thin-down,\r\n.ion-ios7-arrow-thin-left,\r\n.ion-ios7-arrow-thin-right,\r\n.ion-ios7-arrow-thin-up,\r\n.ion-ios7-arrow-up,\r\n.ion-ios7-at,\r\n.ion-ios7-at-outline,\r\n.ion-ios7-barcode,\r\n.ion-ios7-barcode-outline,\r\n.ion-ios7-baseball,\r\n.ion-ios7-baseball-outline,\r\n.ion-ios7-basketball,\r\n.ion-ios7-basketball-outline,\r\n.ion-ios7-bell,\r\n.ion-ios7-bell-outline,\r\n.ion-ios7-bolt,\r\n.ion-ios7-bolt-outline,\r\n.ion-ios7-bookmarks,\r\n.ion-ios7-bookmarks-outline,\r\n.ion-ios7-box,\r\n.ion-ios7-box-outline,\r\n.ion-ios7-briefcase,\r\n.ion-ios7-briefcase-outline,\r\n.ion-ios7-browsers,\r\n.ion-ios7-browsers-outline,\r\n.ion-ios7-calculator,\r\n.ion-ios7-calculator-outline,\r\n.ion-ios7-calendar,\r\n.ion-ios7-calendar-outline,\r\n.ion-ios7-camera,\r\n.ion-ios7-camera-outline,\r\n.ion-ios7-cart,\r\n.ion-ios7-cart-outline,\r\n.ion-ios7-chatboxes,\r\n.ion-ios7-chatboxes-outline,\r\n.ion-ios7-chatbubble,\r\n.ion-ios7-chatbubble-outline,\r\n.ion-ios7-checkmark,\r\n.ion-ios7-checkmark-empty,\r\n.ion-ios7-checkmark-outline,\r\n.ion-ios7-circle-filled,\r\n.ion-ios7-circle-outline,\r\n.ion-ios7-clock,\r\n.ion-ios7-clock-outline,\r\n.ion-ios7-close,\r\n.ion-ios7-close-empty,\r\n.ion-ios7-close-outline,\r\n.ion-ios7-cloud,\r\n.ion-ios7-cloud-download,\r\n.ion-ios7-cloud-download-outline,\r\n.ion-ios7-cloud-outline,\r\n.ion-ios7-cloud-upload,\r\n.ion-ios7-cloud-upload-outline,\r\n.ion-ios7-cloudy,\r\n.ion-ios7-cloudy-night,\r\n.ion-ios7-cloudy-night-outline,\r\n.ion-ios7-cloudy-outline,\r\n.ion-ios7-cog,\r\n.ion-ios7-cog-outline,\r\n.ion-ios7-compose,\r\n.ion-ios7-compose-outline,\r\n.ion-ios7-contact,\r\n.ion-ios7-contact-outline,\r\n.ion-ios7-copy,\r\n.ion-ios7-copy-outline,\r\n.ion-ios7-download,\r\n.ion-ios7-download-outline,\r\n.ion-ios7-drag,\r\n.ion-ios7-email,\r\n.ion-ios7-email-outline,\r\n.ion-ios7-expand,\r\n.ion-ios7-eye,\r\n.ion-ios7-eye-outline,\r\n.ion-ios7-fastforward,\r\n.ion-ios7-fastforward-outline,\r\n.ion-ios7-filing,\r\n.ion-ios7-filing-outline,\r\n.ion-ios7-film,\r\n.ion-ios7-film-outline,\r\n.ion-ios7-flag,\r\n.ion-ios7-flag-outline,\r\n.ion-ios7-folder,\r\n.ion-ios7-folder-outline,\r\n.ion-ios7-football,\r\n.ion-ios7-football-outline,\r\n.ion-ios7-gear,\r\n.ion-ios7-gear-outline,\r\n.ion-ios7-glasses,\r\n.ion-ios7-glasses-outline,\r\n.ion-ios7-heart,\r\n.ion-ios7-heart-outline,\r\n.ion-ios7-help,\r\n.ion-ios7-help-empty,\r\n.ion-ios7-help-outline,\r\n.ion-ios7-home,\r\n.ion-ios7-home-outline,\r\n.ion-ios7-infinite,\r\n.ion-ios7-infinite-outline,\r\n.ion-ios7-information,\r\n.ion-ios7-information-empty,\r\n.ion-ios7-information-outline,\r\n.ion-ios7-ionic-outline,\r\n.ion-ios7-keypad,\r\n.ion-ios7-keypad-outline,\r\n.ion-ios7-lightbulb,\r\n.ion-ios7-lightbulb-outline,\r\n.ion-ios7-location,\r\n.ion-ios7-location-outline,\r\n.ion-ios7-locked,\r\n.ion-ios7-locked-outline,\r\n.ion-ios7-loop,\r\n.ion-ios7-loop-strong,\r\n.ion-ios7-medkit,\r\n.ion-ios7-medkit-outline,\r\n.ion-ios7-mic,\r\n.ion-ios7-mic-off,\r\n.ion-ios7-mic-outline,\r\n.ion-ios7-minus,\r\n.ion-ios7-minus-empty,\r\n.ion-ios7-minus-outline,\r\n.ion-ios7-monitor,\r\n.ion-ios7-monitor-outline,\r\n.ion-ios7-moon,\r\n.ion-ios7-moon-outline,\r\n.ion-ios7-more,\r\n.ion-ios7-more-outline,\r\n.ion-ios7-musical-note,\r\n.ion-ios7-musical-notes,\r\n.ion-ios7-navigate,\r\n.ion-ios7-navigate-outline,\r\n.ion-ios7-paper,\r\n.ion-ios7-paper-outline,\r\n.ion-ios7-paperplane,\r\n.ion-ios7-paperplane-outline,\r\n.ion-ios7-partlysunny,\r\n.ion-ios7-partlysunny-outline,\r\n.ion-ios7-pause,\r\n.ion-ios7-pause-outline,\r\n.ion-ios7-paw,\r\n.ion-ios7-paw-outline,\r\n.ion-ios7-people,\r\n.ion-ios7-people-outline,\r\n.ion-ios7-person,\r\n.ion-ios7-person-outline,\r\n.ion-ios7-personadd,\r\n.ion-ios7-personadd-outline,\r\n.ion-ios7-photos,\r\n.ion-ios7-photos-outline,\r\n.ion-ios7-pie,\r\n.ion-ios7-pie-outline,\r\n.ion-ios7-play,\r\n.ion-ios7-play-outline,\r\n.ion-ios7-plus,\r\n.ion-ios7-plus-empty,\r\n.ion-ios7-plus-outline,\r\n.ion-ios7-pricetag,\r\n.ion-ios7-pricetag-outline,\r\n.ion-ios7-pricetags,\r\n.ion-ios7-pricetags-outline,\r\n.ion-ios7-printer,\r\n.ion-ios7-printer-outline,\r\n.ion-ios7-pulse,\r\n.ion-ios7-pulse-strong,\r\n.ion-ios7-rainy,\r\n.ion-ios7-rainy-outline,\r\n.ion-ios7-recording,\r\n.ion-ios7-recording-outline,\r\n.ion-ios7-redo,\r\n.ion-ios7-redo-outline,\r\n.ion-ios7-refresh,\r\n.ion-ios7-refresh-empty,\r\n.ion-ios7-refresh-outline,\r\n.ion-ios7-reload,\r\n.ion-ios7-reverse-camera,\r\n.ion-ios7-reverse-camera-outline,\r\n.ion-ios7-rewind,\r\n.ion-ios7-rewind-outline,\r\n.ion-ios7-search,\r\n.ion-ios7-search-strong,\r\n.ion-ios7-settings,\r\n.ion-ios7-settings-strong,\r\n.ion-ios7-shrink,\r\n.ion-ios7-skipbackward,\r\n.ion-ios7-skipbackward-outline,\r\n.ion-ios7-skipforward,\r\n.ion-ios7-skipforward-outline,\r\n.ion-ios7-snowy,\r\n.ion-ios7-speedometer,\r\n.ion-ios7-speedometer-outline,\r\n.ion-ios7-star,\r\n.ion-ios7-star-half,\r\n.ion-ios7-star-outline,\r\n.ion-ios7-stopwatch,\r\n.ion-ios7-stopwatch-outline,\r\n.ion-ios7-sunny,\r\n.ion-ios7-sunny-outline,\r\n.ion-ios7-telephone,\r\n.ion-ios7-telephone-outline,\r\n.ion-ios7-tennisball,\r\n.ion-ios7-tennisball-outline,\r\n.ion-ios7-thunderstorm,\r\n.ion-ios7-thunderstorm-outline,\r\n.ion-ios7-time,\r\n.ion-ios7-time-outline,\r\n.ion-ios7-timer,\r\n.ion-ios7-timer-outline,\r\n.ion-ios7-toggle,\r\n.ion-ios7-toggle-outline,\r\n.ion-ios7-trash,\r\n.ion-ios7-trash-outline,\r\n.ion-ios7-undo,\r\n.ion-ios7-undo-outline,\r\n.ion-ios7-unlocked,\r\n.ion-ios7-unlocked-outline,\r\n.ion-ios7-upload,\r\n.ion-ios7-upload-outline,\r\n.ion-ios7-videocam,\r\n.ion-ios7-videocam-outline,\r\n.ion-ios7-volume-high,\r\n.ion-ios7-volume-low,\r\n.ion-ios7-wineglass,\r\n.ion-ios7-wineglass-outline,\r\n.ion-ios7-world,\r\n.ion-ios7-world-outline,\r\n.ion-ipad,\r\n.ion-iphone,\r\n.ion-ipod,\r\n.ion-jet,\r\n.ion-key,\r\n.ion-knife,\r\n.ion-laptop,\r\n.ion-leaf,\r\n.ion-levels,\r\n.ion-lightbulb,\r\n.ion-link,\r\n.ion-load-a,\r\n.ion-load-b,\r\n.ion-load-c,\r\n.ion-load-d,\r\n.ion-location,\r\n.ion-locked,\r\n.ion-log-in,\r\n.ion-log-out,\r\n.ion-loop,\r\n.ion-magnet,\r\n.ion-male,\r\n.ion-man,\r\n.ion-map,\r\n.ion-medkit,\r\n.ion-merge,\r\n.ion-mic-a,\r\n.ion-mic-b,\r\n.ion-mic-c,\r\n.ion-minus,\r\n.ion-minus-circled,\r\n.ion-minus-round,\r\n.ion-model-s,\r\n.ion-monitor,\r\n.ion-more,\r\n.ion-mouse,\r\n.ion-music-note,\r\n.ion-navicon,\r\n.ion-navicon-round,\r\n.ion-navigate,\r\n.ion-network,\r\n.ion-no-smoking,\r\n.ion-nuclear,\r\n.ion-outlet,\r\n.ion-paper-airplane,\r\n.ion-paperclip,\r\n.ion-pause,\r\n.ion-person,\r\n.ion-person-add,\r\n.ion-person-stalker,\r\n.ion-pie-graph,\r\n.ion-pin,\r\n.ion-pinpoint,\r\n.ion-pizza,\r\n.ion-plane,\r\n.ion-planet,\r\n.ion-play,\r\n.ion-playstation,\r\n.ion-plus,\r\n.ion-plus-circled,\r\n.ion-plus-round,\r\n.ion-podium,\r\n.ion-pound,\r\n.ion-power,\r\n.ion-pricetag,\r\n.ion-pricetags,\r\n.ion-printer,\r\n.ion-pull-request,\r\n.ion-qr-scanner,\r\n.ion-quote,\r\n.ion-radio-waves,\r\n.ion-record,\r\n.ion-refresh,\r\n.ion-reply,\r\n.ion-reply-all,\r\n.ion-ribbon-a,\r\n.ion-ribbon-b,\r\n.ion-sad,\r\n.ion-scissors,\r\n.ion-search,\r\n.ion-settings,\r\n.ion-share,\r\n.ion-shuffle,\r\n.ion-skip-backward,\r\n.ion-skip-forward,\r\n.ion-social-android,\r\n.ion-social-android-outline,\r\n.ion-social-apple,\r\n.ion-social-apple-outline,\r\n.ion-social-bitcoin,\r\n.ion-social-bitcoin-outline,\r\n.ion-social-buffer,\r\n.ion-social-buffer-outline,\r\n.ion-social-designernews,\r\n.ion-social-designernews-outline,\r\n.ion-social-dribbble,\r\n.ion-social-dribbble-outline,\r\n.ion-social-dropbox,\r\n.ion-social-dropbox-outline,\r\n.ion-social-facebook,\r\n.ion-social-facebook-outline,\r\n.ion-social-foursquare,\r\n.ion-social-foursquare-outline,\r\n.ion-social-freebsd-devil,\r\n.ion-social-github,\r\n.ion-social-github-outline,\r\n.ion-social-google,\r\n.ion-social-google-outline,\r\n.ion-social-googleplus,\r\n.ion-social-googleplus-outline,\r\n.ion-social-hackernews,\r\n.ion-social-hackernews-outline,\r\n.ion-social-instagram,\r\n.ion-social-instagram-outline,\r\n.ion-social-linkedin,\r\n.ion-social-linkedin-outline,\r\n.ion-social-pinterest,\r\n.ion-social-pinterest-outline,\r\n.ion-social-reddit,\r\n.ion-social-reddit-outline,\r\n.ion-social-rss,\r\n.ion-social-rss-outline,\r\n.ion-social-skype,\r\n.ion-social-skype-outline,\r\n.ion-social-tumblr,\r\n.ion-social-tumblr-outline,\r\n.ion-social-tux,\r\n.ion-social-twitter,\r\n.ion-social-twitter-outline,\r\n.ion-social-usd,\r\n.ion-social-usd-outline,\r\n.ion-social-vimeo,\r\n.ion-social-vimeo-outline,\r\n.ion-social-windows,\r\n.ion-social-windows-outline,\r\n.ion-social-wordpress,\r\n.ion-social-wordpress-outline,\r\n.ion-social-yahoo,\r\n.ion-social-yahoo-outline,\r\n.ion-social-youtube,\r\n.ion-social-youtube-outline,\r\n.ion-speakerphone,\r\n.ion-speedometer,\r\n.ion-spoon,\r\n.ion-star,\r\n.ion-stats-bars,\r\n.ion-steam,\r\n.ion-stop,\r\n.ion-thermometer,\r\n.ion-thumbsdown,\r\n.ion-thumbsup,\r\n.ion-toggle,\r\n.ion-toggle-filled,\r\n.ion-trash-a,\r\n.ion-trash-b,\r\n.ion-trophy,\r\n.ion-umbrella,\r\n.ion-university,\r\n.ion-unlocked,\r\n.ion-upload,\r\n.ion-usb,\r\n.ion-videocamera,\r\n.ion-volume-high,\r\n.ion-volume-low,\r\n.ion-volume-medium,\r\n.ion-volume-mute,\r\n.ion-wand,\r\n.ion-waterdrop,\r\n.ion-wifi,\r\n.ion-wineglass,\r\n.ion-woman,\r\n.ion-wrench,\r\n.ion-xbox {\r\n  display: inline-block;\r\n  font-family: \"Ionicons\";\r\n  speak: none;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  font-variant: normal;\r\n  text-transform: none;\r\n  text-rendering: auto;\r\n  line-height: 1;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n.ion-spin,\r\n.ion-loading-a,\r\n.ion-loading-b,\r\n.ion-loading-c,\r\n.ion-loading-d,\r\n.ion-looping,\r\n.ion-refreshing,\r\n.ion-ios7-reloading {\r\n  animation: spin 1s infinite linear;\r\n}\r\n@keyframes spin {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: rotate(359deg);\r\n  }\r\n}\r\n.ion-loading-a {\r\n  animation-timing-function: steps(8, start);\r\n}\r\n.ion-alert:before {\r\n  content: \"\\f101\";\r\n}\r\n.ion-alert-circled:before {\r\n  content: \"\\f100\";\r\n}\r\n.ion-android-add:before {\r\n  content: \"\\f2c7\";\r\n}\r\n.ion-android-add-contact:before {\r\n  content: \"\\f2c6\";\r\n}\r\n.ion-android-alarm:before {\r\n  content: \"\\f2c8\";\r\n}\r\n.ion-android-archive:before {\r\n  content: \"\\f2c9\";\r\n}\r\n.ion-android-arrow-back:before {\r\n  content: \"\\f2ca\";\r\n}\r\n.ion-android-arrow-down-left:before {\r\n  content: \"\\f2cb\";\r\n}\r\n.ion-android-arrow-down-right:before {\r\n  content: \"\\f2cc\";\r\n}\r\n.ion-android-arrow-forward:before {\r\n  content: \"\\f30f\";\r\n}\r\n.ion-android-arrow-up-left:before {\r\n  content: \"\\f2cd\";\r\n}\r\n.ion-android-arrow-up-right:before {\r\n  content: \"\\f2ce\";\r\n}\r\n.ion-android-battery:before {\r\n  content: \"\\f2cf\";\r\n}\r\n.ion-android-book:before {\r\n  content: \"\\f2d0\";\r\n}\r\n.ion-android-calendar:before {\r\n  content: \"\\f2d1\";\r\n}\r\n.ion-android-call:before {\r\n  content: \"\\f2d2\";\r\n}\r\n.ion-android-camera:before {\r\n  content: \"\\f2d3\";\r\n}\r\n.ion-android-chat:before {\r\n  content: \"\\f2d4\";\r\n}\r\n.ion-android-checkmark:before {\r\n  content: \"\\f2d5\";\r\n}\r\n.ion-android-clock:before {\r\n  content: \"\\f2d6\";\r\n}\r\n.ion-android-close:before {\r\n  content: \"\\f2d7\";\r\n}\r\n.ion-android-contact:before {\r\n  content: \"\\f2d8\";\r\n}\r\n.ion-android-contacts:before {\r\n  content: \"\\f2d9\";\r\n}\r\n.ion-android-data:before {\r\n  content: \"\\f2da\";\r\n}\r\n.ion-android-developer:before {\r\n  content: \"\\f2db\";\r\n}\r\n.ion-android-display:before {\r\n  content: \"\\f2dc\";\r\n}\r\n.ion-android-download:before {\r\n  content: \"\\f2dd\";\r\n}\r\n.ion-android-drawer:before {\r\n  content: \"\\f310\";\r\n}\r\n.ion-android-dropdown:before {\r\n  content: \"\\f2de\";\r\n}\r\n.ion-android-earth:before {\r\n  content: \"\\f2df\";\r\n}\r\n.ion-android-folder:before {\r\n  content: \"\\f2e0\";\r\n}\r\n.ion-android-forums:before {\r\n  content: \"\\f2e1\";\r\n}\r\n.ion-android-friends:before {\r\n  content: \"\\f2e2\";\r\n}\r\n.ion-android-hand:before {\r\n  content: \"\\f2e3\";\r\n}\r\n.ion-android-image:before {\r\n  content: \"\\f2e4\";\r\n}\r\n.ion-android-inbox:before {\r\n  content: \"\\f2e5\";\r\n}\r\n.ion-android-information:before {\r\n  content: \"\\f2e6\";\r\n}\r\n.ion-android-keypad:before {\r\n  content: \"\\f2e7\";\r\n}\r\n.ion-android-lightbulb:before {\r\n  content: \"\\f2e8\";\r\n}\r\n.ion-android-locate:before {\r\n  content: \"\\f2e9\";\r\n}\r\n.ion-android-location:before {\r\n  content: \"\\f2ea\";\r\n}\r\n.ion-android-mail:before {\r\n  content: \"\\f2eb\";\r\n}\r\n.ion-android-microphone:before {\r\n  content: \"\\f2ec\";\r\n}\r\n.ion-android-mixer:before {\r\n  content: \"\\f2ed\";\r\n}\r\n.ion-android-more:before {\r\n  content: \"\\f2ee\";\r\n}\r\n.ion-android-note:before {\r\n  content: \"\\f2ef\";\r\n}\r\n.ion-android-playstore:before {\r\n  content: \"\\f2f0\";\r\n}\r\n.ion-android-printer:before {\r\n  content: \"\\f2f1\";\r\n}\r\n.ion-android-promotion:before {\r\n  content: \"\\f2f2\";\r\n}\r\n.ion-android-reminder:before {\r\n  content: \"\\f2f3\";\r\n}\r\n.ion-android-remove:before {\r\n  content: \"\\f2f4\";\r\n}\r\n.ion-android-search:before {\r\n  content: \"\\f2f5\";\r\n}\r\n.ion-android-send:before {\r\n  content: \"\\f2f6\";\r\n}\r\n.ion-android-settings:before {\r\n  content: \"\\f2f7\";\r\n}\r\n.ion-android-share:before {\r\n  content: \"\\f2f8\";\r\n}\r\n.ion-android-social:before {\r\n  content: \"\\f2fa\";\r\n}\r\n.ion-android-social-user:before {\r\n  content: \"\\f2f9\";\r\n}\r\n.ion-android-sort:before {\r\n  content: \"\\f2fb\";\r\n}\r\n.ion-android-stair-drawer:before {\r\n  content: \"\\f311\";\r\n}\r\n.ion-android-star:before {\r\n  content: \"\\f2fc\";\r\n}\r\n.ion-android-stopwatch:before {\r\n  content: \"\\f2fd\";\r\n}\r\n.ion-android-storage:before {\r\n  content: \"\\f2fe\";\r\n}\r\n.ion-android-system-back:before {\r\n  content: \"\\f2ff\";\r\n}\r\n.ion-android-system-home:before {\r\n  content: \"\\f300\";\r\n}\r\n.ion-android-system-windows:before {\r\n  content: \"\\f301\";\r\n}\r\n.ion-android-timer:before {\r\n  content: \"\\f302\";\r\n}\r\n.ion-android-trash:before {\r\n  content: \"\\f303\";\r\n}\r\n.ion-android-user-menu:before {\r\n  content: \"\\f312\";\r\n}\r\n.ion-android-volume:before {\r\n  content: \"\\f304\";\r\n}\r\n.ion-android-wifi:before {\r\n  content: \"\\f305\";\r\n}\r\n.ion-aperture:before {\r\n  content: \"\\f313\";\r\n}\r\n.ion-archive:before {\r\n  content: \"\\f102\";\r\n}\r\n.ion-arrow-down-a:before {\r\n  content: \"\\f103\";\r\n}\r\n.ion-arrow-down-b:before {\r\n  content: \"\\f104\";\r\n}\r\n.ion-arrow-down-c:before {\r\n  content: \"\\f105\";\r\n}\r\n.ion-arrow-expand:before {\r\n  content: \"\\f25e\";\r\n}\r\n.ion-arrow-graph-down-left:before {\r\n  content: \"\\f25f\";\r\n}\r\n.ion-arrow-graph-down-right:before {\r\n  content: \"\\f260\";\r\n}\r\n.ion-arrow-graph-up-left:before {\r\n  content: \"\\f261\";\r\n}\r\n.ion-arrow-graph-up-right:before {\r\n  content: \"\\f262\";\r\n}\r\n.ion-arrow-left-a:before {\r\n  content: \"\\f106\";\r\n}\r\n.ion-arrow-left-b:before {\r\n  content: \"\\f107\";\r\n}\r\n.ion-arrow-left-c:before {\r\n  content: \"\\f108\";\r\n}\r\n.ion-arrow-move:before {\r\n  content: \"\\f263\";\r\n}\r\n.ion-arrow-resize:before {\r\n  content: \"\\f264\";\r\n}\r\n.ion-arrow-return-left:before {\r\n  content: \"\\f265\";\r\n}\r\n.ion-arrow-return-right:before {\r\n  content: \"\\f266\";\r\n}\r\n.ion-arrow-right-a:before {\r\n  content: \"\\f109\";\r\n}\r\n.ion-arrow-right-b:before {\r\n  content: \"\\f10a\";\r\n}\r\n.ion-arrow-right-c:before {\r\n  content: \"\\f10b\";\r\n}\r\n.ion-arrow-shrink:before {\r\n  content: \"\\f267\";\r\n}\r\n.ion-arrow-swap:before {\r\n  content: \"\\f268\";\r\n}\r\n.ion-arrow-up-a:before {\r\n  content: \"\\f10c\";\r\n}\r\n.ion-arrow-up-b:before {\r\n  content: \"\\f10d\";\r\n}\r\n.ion-arrow-up-c:before {\r\n  content: \"\\f10e\";\r\n}\r\n.ion-asterisk:before {\r\n  content: \"\\f314\";\r\n}\r\n.ion-at:before {\r\n  content: \"\\f10f\";\r\n}\r\n.ion-bag:before {\r\n  content: \"\\f110\";\r\n}\r\n.ion-battery-charging:before {\r\n  content: \"\\f111\";\r\n}\r\n.ion-battery-empty:before {\r\n  content: \"\\f112\";\r\n}\r\n.ion-battery-full:before {\r\n  content: \"\\f113\";\r\n}\r\n.ion-battery-half:before {\r\n  content: \"\\f114\";\r\n}\r\n.ion-battery-low:before {\r\n  content: \"\\f115\";\r\n}\r\n.ion-beaker:before {\r\n  content: \"\\f269\";\r\n}\r\n.ion-beer:before {\r\n  content: \"\\f26a\";\r\n}\r\n.ion-bluetooth:before {\r\n  content: \"\\f116\";\r\n}\r\n.ion-bonfire:before {\r\n  content: \"\\f315\";\r\n}\r\n.ion-bookmark:before {\r\n  content: \"\\f26b\";\r\n}\r\n.ion-briefcase:before {\r\n  content: \"\\f26c\";\r\n}\r\n.ion-bug:before {\r\n  content: \"\\f2be\";\r\n}\r\n.ion-calculator:before {\r\n  content: \"\\f26d\";\r\n}\r\n.ion-calendar:before {\r\n  content: \"\\f117\";\r\n}\r\n.ion-camera:before {\r\n  content: \"\\f118\";\r\n}\r\n.ion-card:before {\r\n  content: \"\\f119\";\r\n}\r\n.ion-cash:before {\r\n  content: \"\\f316\";\r\n}\r\n.ion-chatbox:before {\r\n  content: \"\\f11b\";\r\n}\r\n.ion-chatbox-working:before {\r\n  content: \"\\f11a\";\r\n}\r\n.ion-chatboxes:before {\r\n  content: \"\\f11c\";\r\n}\r\n.ion-chatbubble:before {\r\n  content: \"\\f11e\";\r\n}\r\n.ion-chatbubble-working:before {\r\n  content: \"\\f11d\";\r\n}\r\n.ion-chatbubbles:before {\r\n  content: \"\\f11f\";\r\n}\r\n.ion-checkmark:before {\r\n  content: \"\\f122\";\r\n}\r\n.ion-checkmark-circled:before {\r\n  content: \"\\f120\";\r\n}\r\n.ion-checkmark-round:before {\r\n  content: \"\\f121\";\r\n}\r\n.ion-chevron-down:before {\r\n  content: \"\\f123\";\r\n}\r\n.ion-chevron-left:before {\r\n  content: \"\\f124\";\r\n}\r\n.ion-chevron-right:before {\r\n  content: \"\\f125\";\r\n}\r\n.ion-chevron-up:before {\r\n  content: \"\\f126\";\r\n}\r\n.ion-clipboard:before {\r\n  content: \"\\f127\";\r\n}\r\n.ion-clock:before {\r\n  content: \"\\f26e\";\r\n}\r\n.ion-close:before {\r\n  content: \"\\f12a\";\r\n}\r\n.ion-close-circled:before {\r\n  content: \"\\f128\";\r\n}\r\n.ion-close-round:before {\r\n  content: \"\\f129\";\r\n}\r\n.ion-closed-captioning:before {\r\n  content: \"\\f317\";\r\n}\r\n.ion-cloud:before {\r\n  content: \"\\f12b\";\r\n}\r\n.ion-code:before {\r\n  content: \"\\f271\";\r\n}\r\n.ion-code-download:before {\r\n  content: \"\\f26f\";\r\n}\r\n.ion-code-working:before {\r\n  content: \"\\f270\";\r\n}\r\n.ion-coffee:before {\r\n  content: \"\\f272\";\r\n}\r\n.ion-compass:before {\r\n  content: \"\\f273\";\r\n}\r\n.ion-compose:before {\r\n  content: \"\\f12c\";\r\n}\r\n.ion-connection-bars:before {\r\n  content: \"\\f274\";\r\n}\r\n.ion-contrast:before {\r\n  content: \"\\f275\";\r\n}\r\n.ion-cube:before {\r\n  content: \"\\f318\";\r\n}\r\n.ion-disc:before {\r\n  content: \"\\f12d\";\r\n}\r\n.ion-document:before {\r\n  content: \"\\f12f\";\r\n}\r\n.ion-document-text:before {\r\n  content: \"\\f12e\";\r\n}\r\n.ion-drag:before {\r\n  content: \"\\f130\";\r\n}\r\n.ion-earth:before {\r\n  content: \"\\f276\";\r\n}\r\n.ion-edit:before {\r\n  content: \"\\f2bf\";\r\n}\r\n.ion-egg:before {\r\n  content: \"\\f277\";\r\n}\r\n.ion-eject:before {\r\n  content: \"\\f131\";\r\n}\r\n.ion-email:before {\r\n  content: \"\\f132\";\r\n}\r\n.ion-eye:before {\r\n  content: \"\\f133\";\r\n}\r\n.ion-eye-disabled:before {\r\n  content: \"\\f306\";\r\n}\r\n.ion-female:before {\r\n  content: \"\\f278\";\r\n}\r\n.ion-filing:before {\r\n  content: \"\\f134\";\r\n}\r\n.ion-film-marker:before {\r\n  content: \"\\f135\";\r\n}\r\n.ion-fireball:before {\r\n  content: \"\\f319\";\r\n}\r\n.ion-flag:before {\r\n  content: \"\\f279\";\r\n}\r\n.ion-flame:before {\r\n  content: \"\\f31a\";\r\n}\r\n.ion-flash:before {\r\n  content: \"\\f137\";\r\n}\r\n.ion-flash-off:before {\r\n  content: \"\\f136\";\r\n}\r\n.ion-flask:before {\r\n  content: \"\\f138\";\r\n}\r\n.ion-folder:before {\r\n  content: \"\\f139\";\r\n}\r\n.ion-fork:before {\r\n  content: \"\\f27a\";\r\n}\r\n.ion-fork-repo:before {\r\n  content: \"\\f2c0\";\r\n}\r\n.ion-forward:before {\r\n  content: \"\\f13a\";\r\n}\r\n.ion-funnel:before {\r\n  content: \"\\f31b\";\r\n}\r\n.ion-game-controller-a:before {\r\n  content: \"\\f13b\";\r\n}\r\n.ion-game-controller-b:before {\r\n  content: \"\\f13c\";\r\n}\r\n.ion-gear-a:before {\r\n  content: \"\\f13d\";\r\n}\r\n.ion-gear-b:before {\r\n  content: \"\\f13e\";\r\n}\r\n.ion-grid:before {\r\n  content: \"\\f13f\";\r\n}\r\n.ion-hammer:before {\r\n  content: \"\\f27b\";\r\n}\r\n.ion-happy:before {\r\n  content: \"\\f31c\";\r\n}\r\n.ion-headphone:before {\r\n  content: \"\\f140\";\r\n}\r\n.ion-heart:before {\r\n  content: \"\\f141\";\r\n}\r\n.ion-heart-broken:before {\r\n  content: \"\\f31d\";\r\n}\r\n.ion-help:before {\r\n  content: \"\\f143\";\r\n}\r\n.ion-help-buoy:before {\r\n  content: \"\\f27c\";\r\n}\r\n.ion-help-circled:before {\r\n  content: \"\\f142\";\r\n}\r\n.ion-home:before {\r\n  content: \"\\f144\";\r\n}\r\n.ion-icecream:before {\r\n  content: \"\\f27d\";\r\n}\r\n.ion-icon-social-google-plus:before {\r\n  content: \"\\f146\";\r\n}\r\n.ion-icon-social-google-plus-outline:before {\r\n  content: \"\\f145\";\r\n}\r\n.ion-image:before {\r\n  content: \"\\f147\";\r\n}\r\n.ion-images:before {\r\n  content: \"\\f148\";\r\n}\r\n.ion-information:before {\r\n  content: \"\\f14a\";\r\n}\r\n.ion-information-circled:before {\r\n  content: \"\\f149\";\r\n}\r\n.ion-ionic:before {\r\n  content: \"\\f14b\";\r\n}\r\n.ion-ios7-alarm:before {\r\n  content: \"\\f14d\";\r\n}\r\n.ion-ios7-alarm-outline:before {\r\n  content: \"\\f14c\";\r\n}\r\n.ion-ios7-albums:before {\r\n  content: \"\\f14f\";\r\n}\r\n.ion-ios7-albums-outline:before {\r\n  content: \"\\f14e\";\r\n}\r\n.ion-ios7-americanfootball:before {\r\n  content: \"\\f31f\";\r\n}\r\n.ion-ios7-americanfootball-outline:before {\r\n  content: \"\\f31e\";\r\n}\r\n.ion-ios7-analytics:before {\r\n  content: \"\\f321\";\r\n}\r\n.ion-ios7-analytics-outline:before {\r\n  content: \"\\f320\";\r\n}\r\n.ion-ios7-arrow-back:before {\r\n  content: \"\\f150\";\r\n}\r\n.ion-ios7-arrow-down:before {\r\n  content: \"\\f151\";\r\n}\r\n.ion-ios7-arrow-forward:before {\r\n  content: \"\\f152\";\r\n}\r\n.ion-ios7-arrow-left:before {\r\n  content: \"\\f153\";\r\n}\r\n.ion-ios7-arrow-right:before {\r\n  content: \"\\f154\";\r\n}\r\n.ion-ios7-arrow-thin-down:before {\r\n  content: \"\\f27e\";\r\n}\r\n.ion-ios7-arrow-thin-left:before {\r\n  content: \"\\f27f\";\r\n}\r\n.ion-ios7-arrow-thin-right:before {\r\n  content: \"\\f280\";\r\n}\r\n.ion-ios7-arrow-thin-up:before {\r\n  content: \"\\f281\";\r\n}\r\n.ion-ios7-arrow-up:before {\r\n  content: \"\\f155\";\r\n}\r\n.ion-ios7-at:before {\r\n  content: \"\\f157\";\r\n}\r\n.ion-ios7-at-outline:before {\r\n  content: \"\\f156\";\r\n}\r\n.ion-ios7-barcode:before {\r\n  content: \"\\f323\";\r\n}\r\n.ion-ios7-barcode-outline:before {\r\n  content: \"\\f322\";\r\n}\r\n.ion-ios7-baseball:before {\r\n  content: \"\\f325\";\r\n}\r\n.ion-ios7-baseball-outline:before {\r\n  content: \"\\f324\";\r\n}\r\n.ion-ios7-basketball:before {\r\n  content: \"\\f327\";\r\n}\r\n.ion-ios7-basketball-outline:before {\r\n  content: \"\\f326\";\r\n}\r\n.ion-ios7-bell:before {\r\n  content: \"\\f159\";\r\n}\r\n.ion-ios7-bell-outline:before {\r\n  content: \"\\f158\";\r\n}\r\n.ion-ios7-bolt:before {\r\n  content: \"\\f15b\";\r\n}\r\n.ion-ios7-bolt-outline:before {\r\n  content: \"\\f15a\";\r\n}\r\n.ion-ios7-bookmarks:before {\r\n  content: \"\\f15d\";\r\n}\r\n.ion-ios7-bookmarks-outline:before {\r\n  content: \"\\f15c\";\r\n}\r\n.ion-ios7-box:before {\r\n  content: \"\\f15f\";\r\n}\r\n.ion-ios7-box-outline:before {\r\n  content: \"\\f15e\";\r\n}\r\n.ion-ios7-briefcase:before {\r\n  content: \"\\f283\";\r\n}\r\n.ion-ios7-briefcase-outline:before {\r\n  content: \"\\f282\";\r\n}\r\n.ion-ios7-browsers:before {\r\n  content: \"\\f161\";\r\n}\r\n.ion-ios7-browsers-outline:before {\r\n  content: \"\\f160\";\r\n}\r\n.ion-ios7-calculator:before {\r\n  content: \"\\f285\";\r\n}\r\n.ion-ios7-calculator-outline:before {\r\n  content: \"\\f284\";\r\n}\r\n.ion-ios7-calendar:before {\r\n  content: \"\\f163\";\r\n}\r\n.ion-ios7-calendar-outline:before {\r\n  content: \"\\f162\";\r\n}\r\n.ion-ios7-camera:before {\r\n  content: \"\\f165\";\r\n}\r\n.ion-ios7-camera-outline:before {\r\n  content: \"\\f164\";\r\n}\r\n.ion-ios7-cart:before {\r\n  content: \"\\f167\";\r\n}\r\n.ion-ios7-cart-outline:before {\r\n  content: \"\\f166\";\r\n}\r\n.ion-ios7-chatboxes:before {\r\n  content: \"\\f169\";\r\n}\r\n.ion-ios7-chatboxes-outline:before {\r\n  content: \"\\f168\";\r\n}\r\n.ion-ios7-chatbubble:before {\r\n  content: \"\\f16b\";\r\n}\r\n.ion-ios7-chatbubble-outline:before {\r\n  content: \"\\f16a\";\r\n}\r\n.ion-ios7-checkmark:before {\r\n  content: \"\\f16e\";\r\n}\r\n.ion-ios7-checkmark-empty:before {\r\n  content: \"\\f16c\";\r\n}\r\n.ion-ios7-checkmark-outline:before {\r\n  content: \"\\f16d\";\r\n}\r\n.ion-ios7-circle-filled:before {\r\n  content: \"\\f16f\";\r\n}\r\n.ion-ios7-circle-outline:before {\r\n  content: \"\\f170\";\r\n}\r\n.ion-ios7-clock:before {\r\n  content: \"\\f172\";\r\n}\r\n.ion-ios7-clock-outline:before {\r\n  content: \"\\f171\";\r\n}\r\n.ion-ios7-close:before {\r\n  content: \"\\f2bc\";\r\n}\r\n.ion-ios7-close-empty:before {\r\n  content: \"\\f2bd\";\r\n}\r\n.ion-ios7-close-outline:before {\r\n  content: \"\\f2bb\";\r\n}\r\n.ion-ios7-cloud:before {\r\n  content: \"\\f178\";\r\n}\r\n.ion-ios7-cloud-download:before {\r\n  content: \"\\f174\";\r\n}\r\n.ion-ios7-cloud-download-outline:before {\r\n  content: \"\\f173\";\r\n}\r\n.ion-ios7-cloud-outline:before {\r\n  content: \"\\f175\";\r\n}\r\n.ion-ios7-cloud-upload:before {\r\n  content: \"\\f177\";\r\n}\r\n.ion-ios7-cloud-upload-outline:before {\r\n  content: \"\\f176\";\r\n}\r\n.ion-ios7-cloudy:before {\r\n  content: \"\\f17a\";\r\n}\r\n.ion-ios7-cloudy-night:before {\r\n  content: \"\\f308\";\r\n}\r\n.ion-ios7-cloudy-night-outline:before {\r\n  content: \"\\f307\";\r\n}\r\n.ion-ios7-cloudy-outline:before {\r\n  content: \"\\f179\";\r\n}\r\n.ion-ios7-cog:before {\r\n  content: \"\\f17c\";\r\n}\r\n.ion-ios7-cog-outline:before {\r\n  content: \"\\f17b\";\r\n}\r\n.ion-ios7-compose:before {\r\n  content: \"\\f17e\";\r\n}\r\n.ion-ios7-compose-outline:before {\r\n  content: \"\\f17d\";\r\n}\r\n.ion-ios7-contact:before {\r\n  content: \"\\f180\";\r\n}\r\n.ion-ios7-contact-outline:before {\r\n  content: \"\\f17f\";\r\n}\r\n.ion-ios7-copy:before {\r\n  content: \"\\f182\";\r\n}\r\n.ion-ios7-copy-outline:before {\r\n  content: \"\\f181\";\r\n}\r\n.ion-ios7-download:before {\r\n  content: \"\\f184\";\r\n}\r\n.ion-ios7-download-outline:before {\r\n  content: \"\\f183\";\r\n}\r\n.ion-ios7-drag:before {\r\n  content: \"\\f185\";\r\n}\r\n.ion-ios7-email:before {\r\n  content: \"\\f187\";\r\n}\r\n.ion-ios7-email-outline:before {\r\n  content: \"\\f186\";\r\n}\r\n.ion-ios7-expand:before {\r\n  content: \"\\f30d\";\r\n}\r\n.ion-ios7-eye:before {\r\n  content: \"\\f189\";\r\n}\r\n.ion-ios7-eye-outline:before {\r\n  content: \"\\f188\";\r\n}\r\n.ion-ios7-fastforward:before {\r\n  content: \"\\f18b\";\r\n}\r\n.ion-ios7-fastforward-outline:before {\r\n  content: \"\\f18a\";\r\n}\r\n.ion-ios7-filing:before {\r\n  content: \"\\f18d\";\r\n}\r\n.ion-ios7-filing-outline:before {\r\n  content: \"\\f18c\";\r\n}\r\n.ion-ios7-film:before {\r\n  content: \"\\f18f\";\r\n}\r\n.ion-ios7-film-outline:before {\r\n  content: \"\\f18e\";\r\n}\r\n.ion-ios7-flag:before {\r\n  content: \"\\f191\";\r\n}\r\n.ion-ios7-flag-outline:before {\r\n  content: \"\\f190\";\r\n}\r\n.ion-ios7-folder:before {\r\n  content: \"\\f193\";\r\n}\r\n.ion-ios7-folder-outline:before {\r\n  content: \"\\f192\";\r\n}\r\n.ion-ios7-football:before {\r\n  content: \"\\f329\";\r\n}\r\n.ion-ios7-football-outline:before {\r\n  content: \"\\f328\";\r\n}\r\n.ion-ios7-gear:before {\r\n  content: \"\\f195\";\r\n}\r\n.ion-ios7-gear-outline:before {\r\n  content: \"\\f194\";\r\n}\r\n.ion-ios7-glasses:before {\r\n  content: \"\\f197\";\r\n}\r\n.ion-ios7-glasses-outline:before {\r\n  content: \"\\f196\";\r\n}\r\n.ion-ios7-heart:before {\r\n  content: \"\\f199\";\r\n}\r\n.ion-ios7-heart-outline:before {\r\n  content: \"\\f198\";\r\n}\r\n.ion-ios7-help:before {\r\n  content: \"\\f19c\";\r\n}\r\n.ion-ios7-help-empty:before {\r\n  content: \"\\f19a\";\r\n}\r\n.ion-ios7-help-outline:before {\r\n  content: \"\\f19b\";\r\n}\r\n.ion-ios7-home:before {\r\n  content: \"\\f32b\";\r\n}\r\n.ion-ios7-home-outline:before {\r\n  content: \"\\f32a\";\r\n}\r\n.ion-ios7-infinite:before {\r\n  content: \"\\f19e\";\r\n}\r\n.ion-ios7-infinite-outline:before {\r\n  content: \"\\f19d\";\r\n}\r\n.ion-ios7-information:before {\r\n  content: \"\\f1a1\";\r\n}\r\n.ion-ios7-information-empty:before {\r\n  content: \"\\f19f\";\r\n}\r\n.ion-ios7-information-outline:before {\r\n  content: \"\\f1a0\";\r\n}\r\n.ion-ios7-ionic-outline:before {\r\n  content: \"\\f1a2\";\r\n}\r\n.ion-ios7-keypad:before {\r\n  content: \"\\f1a4\";\r\n}\r\n.ion-ios7-keypad-outline:before {\r\n  content: \"\\f1a3\";\r\n}\r\n.ion-ios7-lightbulb:before {\r\n  content: \"\\f287\";\r\n}\r\n.ion-ios7-lightbulb-outline:before {\r\n  content: \"\\f286\";\r\n}\r\n.ion-ios7-location:before {\r\n  content: \"\\f1a6\";\r\n}\r\n.ion-ios7-location-outline:before {\r\n  content: \"\\f1a5\";\r\n}\r\n.ion-ios7-locked:before {\r\n  content: \"\\f1a8\";\r\n}\r\n.ion-ios7-locked-outline:before {\r\n  content: \"\\f1a7\";\r\n}\r\n.ion-ios7-loop:before {\r\n  content: \"\\f32d\";\r\n}\r\n.ion-ios7-loop-strong:before {\r\n  content: \"\\f32c\";\r\n}\r\n.ion-ios7-medkit:before {\r\n  content: \"\\f289\";\r\n}\r\n.ion-ios7-medkit-outline:before {\r\n  content: \"\\f288\";\r\n}\r\n.ion-ios7-mic:before {\r\n  content: \"\\f1ab\";\r\n}\r\n.ion-ios7-mic-off:before {\r\n  content: \"\\f1a9\";\r\n}\r\n.ion-ios7-mic-outline:before {\r\n  content: \"\\f1aa\";\r\n}\r\n.ion-ios7-minus:before {\r\n  content: \"\\f1ae\";\r\n}\r\n.ion-ios7-minus-empty:before {\r\n  content: \"\\f1ac\";\r\n}\r\n.ion-ios7-minus-outline:before {\r\n  content: \"\\f1ad\";\r\n}\r\n.ion-ios7-monitor:before {\r\n  content: \"\\f1b0\";\r\n}\r\n.ion-ios7-monitor-outline:before {\r\n  content: \"\\f1af\";\r\n}\r\n.ion-ios7-moon:before {\r\n  content: \"\\f1b2\";\r\n}\r\n.ion-ios7-moon-outline:before {\r\n  content: \"\\f1b1\";\r\n}\r\n.ion-ios7-more:before {\r\n  content: \"\\f1b4\";\r\n}\r\n.ion-ios7-more-outline:before {\r\n  content: \"\\f1b3\";\r\n}\r\n.ion-ios7-musical-note:before {\r\n  content: \"\\f1b5\";\r\n}\r\n.ion-ios7-musical-notes:before {\r\n  content: \"\\f1b6\";\r\n}\r\n.ion-ios7-navigate:before {\r\n  content: \"\\f1b8\";\r\n}\r\n.ion-ios7-navigate-outline:before {\r\n  content: \"\\f1b7\";\r\n}\r\n.ion-ios7-paper:before {\r\n  content: \"\\f32f\";\r\n}\r\n.ion-ios7-paper-outline:before {\r\n  content: \"\\f32e\";\r\n}\r\n.ion-ios7-paperplane:before {\r\n  content: \"\\f1ba\";\r\n}\r\n.ion-ios7-paperplane-outline:before {\r\n  content: \"\\f1b9\";\r\n}\r\n.ion-ios7-partlysunny:before {\r\n  content: \"\\f1bc\";\r\n}\r\n.ion-ios7-partlysunny-outline:before {\r\n  content: \"\\f1bb\";\r\n}\r\n.ion-ios7-pause:before {\r\n  content: \"\\f1be\";\r\n}\r\n.ion-ios7-pause-outline:before {\r\n  content: \"\\f1bd\";\r\n}\r\n.ion-ios7-paw:before {\r\n  content: \"\\f331\";\r\n}\r\n.ion-ios7-paw-outline:before {\r\n  content: \"\\f330\";\r\n}\r\n.ion-ios7-people:before {\r\n  content: \"\\f1c0\";\r\n}\r\n.ion-ios7-people-outline:before {\r\n  content: \"\\f1bf\";\r\n}\r\n.ion-ios7-person:before {\r\n  content: \"\\f1c2\";\r\n}\r\n.ion-ios7-person-outline:before {\r\n  content: \"\\f1c1\";\r\n}\r\n.ion-ios7-personadd:before {\r\n  content: \"\\f1c4\";\r\n}\r\n.ion-ios7-personadd-outline:before {\r\n  content: \"\\f1c3\";\r\n}\r\n.ion-ios7-photos:before {\r\n  content: \"\\f1c6\";\r\n}\r\n.ion-ios7-photos-outline:before {\r\n  content: \"\\f1c5\";\r\n}\r\n.ion-ios7-pie:before {\r\n  content: \"\\f28b\";\r\n}\r\n.ion-ios7-pie-outline:before {\r\n  content: \"\\f28a\";\r\n}\r\n.ion-ios7-play:before {\r\n  content: \"\\f1c8\";\r\n}\r\n.ion-ios7-play-outline:before {\r\n  content: \"\\f1c7\";\r\n}\r\n.ion-ios7-plus:before {\r\n  content: \"\\f1cb\";\r\n}\r\n.ion-ios7-plus-empty:before {\r\n  content: \"\\f1c9\";\r\n}\r\n.ion-ios7-plus-outline:before {\r\n  content: \"\\f1ca\";\r\n}\r\n.ion-ios7-pricetag:before {\r\n  content: \"\\f28d\";\r\n}\r\n.ion-ios7-pricetag-outline:before {\r\n  content: \"\\f28c\";\r\n}\r\n.ion-ios7-pricetags:before {\r\n  content: \"\\f333\";\r\n}\r\n.ion-ios7-pricetags-outline:before {\r\n  content: \"\\f332\";\r\n}\r\n.ion-ios7-printer:before {\r\n  content: \"\\f1cd\";\r\n}\r\n.ion-ios7-printer-outline:before {\r\n  content: \"\\f1cc\";\r\n}\r\n.ion-ios7-pulse:before {\r\n  content: \"\\f335\";\r\n}\r\n.ion-ios7-pulse-strong:before {\r\n  content: \"\\f334\";\r\n}\r\n.ion-ios7-rainy:before {\r\n  content: \"\\f1cf\";\r\n}\r\n.ion-ios7-rainy-outline:before {\r\n  content: \"\\f1ce\";\r\n}\r\n.ion-ios7-recording:before {\r\n  content: \"\\f1d1\";\r\n}\r\n.ion-ios7-recording-outline:before {\r\n  content: \"\\f1d0\";\r\n}\r\n.ion-ios7-redo:before {\r\n  content: \"\\f1d3\";\r\n}\r\n.ion-ios7-redo-outline:before {\r\n  content: \"\\f1d2\";\r\n}\r\n.ion-ios7-refresh:before {\r\n  content: \"\\f1d6\";\r\n}\r\n.ion-ios7-refresh-empty:before {\r\n  content: \"\\f1d4\";\r\n}\r\n.ion-ios7-refresh-outline:before {\r\n  content: \"\\f1d5\";\r\n}\r\n.ion-ios7-reload:before {\r\n  content: \"\\f28e\";\r\n}\r\n.ion-ios7-reverse-camera:before {\r\n  content: \"\\f337\";\r\n}\r\n.ion-ios7-reverse-camera-outline:before {\r\n  content: \"\\f336\";\r\n}\r\n.ion-ios7-rewind:before {\r\n  content: \"\\f1d8\";\r\n}\r\n.ion-ios7-rewind-outline:before {\r\n  content: \"\\f1d7\";\r\n}\r\n.ion-ios7-search:before {\r\n  content: \"\\f1da\";\r\n}\r\n.ion-ios7-search-strong:before {\r\n  content: \"\\f1d9\";\r\n}\r\n.ion-ios7-settings:before {\r\n  content: \"\\f339\";\r\n}\r\n.ion-ios7-settings-strong:before {\r\n  content: \"\\f338\";\r\n}\r\n.ion-ios7-shrink:before {\r\n  content: \"\\f30e\";\r\n}\r\n.ion-ios7-skipbackward:before {\r\n  content: \"\\f1dc\";\r\n}\r\n.ion-ios7-skipbackward-outline:before {\r\n  content: \"\\f1db\";\r\n}\r\n.ion-ios7-skipforward:before {\r\n  content: \"\\f1de\";\r\n}\r\n.ion-ios7-skipforward-outline:before {\r\n  content: \"\\f1dd\";\r\n}\r\n.ion-ios7-snowy:before {\r\n  content: \"\\f309\";\r\n}\r\n.ion-ios7-speedometer:before {\r\n  content: \"\\f290\";\r\n}\r\n.ion-ios7-speedometer-outline:before {\r\n  content: \"\\f28f\";\r\n}\r\n.ion-ios7-star:before {\r\n  content: \"\\f1e0\";\r\n}\r\n.ion-ios7-star-half:before {\r\n  content: \"\\f33a\";\r\n}\r\n.ion-ios7-star-outline:before {\r\n  content: \"\\f1df\";\r\n}\r\n.ion-ios7-stopwatch:before {\r\n  content: \"\\f1e2\";\r\n}\r\n.ion-ios7-stopwatch-outline:before {\r\n  content: \"\\f1e1\";\r\n}\r\n.ion-ios7-sunny:before {\r\n  content: \"\\f1e4\";\r\n}\r\n.ion-ios7-sunny-outline:before {\r\n  content: \"\\f1e3\";\r\n}\r\n.ion-ios7-telephone:before {\r\n  content: \"\\f1e6\";\r\n}\r\n.ion-ios7-telephone-outline:before {\r\n  content: \"\\f1e5\";\r\n}\r\n.ion-ios7-tennisball:before {\r\n  content: \"\\f33c\";\r\n}\r\n.ion-ios7-tennisball-outline:before {\r\n  content: \"\\f33b\";\r\n}\r\n.ion-ios7-thunderstorm:before {\r\n  content: \"\\f1e8\";\r\n}\r\n.ion-ios7-thunderstorm-outline:before {\r\n  content: \"\\f1e7\";\r\n}\r\n.ion-ios7-time:before {\r\n  content: \"\\f292\";\r\n}\r\n.ion-ios7-time-outline:before {\r\n  content: \"\\f291\";\r\n}\r\n.ion-ios7-timer:before {\r\n  content: \"\\f1ea\";\r\n}\r\n.ion-ios7-timer-outline:before {\r\n  content: \"\\f1e9\";\r\n}\r\n.ion-ios7-toggle:before {\r\n  content: \"\\f33e\";\r\n}\r\n.ion-ios7-toggle-outline:before {\r\n  content: \"\\f33d\";\r\n}\r\n.ion-ios7-trash:before {\r\n  content: \"\\f1ec\";\r\n}\r\n.ion-ios7-trash-outline:before {\r\n  content: \"\\f1eb\";\r\n}\r\n.ion-ios7-undo:before {\r\n  content: \"\\f1ee\";\r\n}\r\n.ion-ios7-undo-outline:before {\r\n  content: \"\\f1ed\";\r\n}\r\n.ion-ios7-unlocked:before {\r\n  content: \"\\f1f0\";\r\n}\r\n.ion-ios7-unlocked-outline:before {\r\n  content: \"\\f1ef\";\r\n}\r\n.ion-ios7-upload:before {\r\n  content: \"\\f1f2\";\r\n}\r\n.ion-ios7-upload-outline:before {\r\n  content: \"\\f1f1\";\r\n}\r\n.ion-ios7-videocam:before {\r\n  content: \"\\f1f4\";\r\n}\r\n.ion-ios7-videocam-outline:before {\r\n  content: \"\\f1f3\";\r\n}\r\n.ion-ios7-volume-high:before {\r\n  content: \"\\f1f5\";\r\n}\r\n.ion-ios7-volume-low:before {\r\n  content: \"\\f1f6\";\r\n}\r\n.ion-ios7-wineglass:before {\r\n  content: \"\\f294\";\r\n}\r\n.ion-ios7-wineglass-outline:before {\r\n  content: \"\\f293\";\r\n}\r\n.ion-ios7-world:before {\r\n  content: \"\\f1f8\";\r\n}\r\n.ion-ios7-world-outline:before {\r\n  content: \"\\f1f7\";\r\n}\r\n.ion-ipad:before {\r\n  content: \"\\f1f9\";\r\n}\r\n.ion-iphone:before {\r\n  content: \"\\f1fa\";\r\n}\r\n.ion-ipod:before {\r\n  content: \"\\f1fb\";\r\n}\r\n.ion-jet:before {\r\n  content: \"\\f295\";\r\n}\r\n.ion-key:before {\r\n  content: \"\\f296\";\r\n}\r\n.ion-knife:before {\r\n  content: \"\\f297\";\r\n}\r\n.ion-laptop:before {\r\n  content: \"\\f1fc\";\r\n}\r\n.ion-leaf:before {\r\n  content: \"\\f1fd\";\r\n}\r\n.ion-levels:before {\r\n  content: \"\\f298\";\r\n}\r\n.ion-lightbulb:before {\r\n  content: \"\\f299\";\r\n}\r\n.ion-link:before {\r\n  content: \"\\f1fe\";\r\n}\r\n.ion-load-a:before {\r\n  content: \"\\f29a\";\r\n}\r\n.ion-load-b:before {\r\n  content: \"\\f29b\";\r\n}\r\n.ion-load-c:before {\r\n  content: \"\\f29c\";\r\n}\r\n.ion-load-d:before {\r\n  content: \"\\f29d\";\r\n}\r\n.ion-location:before {\r\n  content: \"\\f1ff\";\r\n}\r\n.ion-locked:before {\r\n  content: \"\\f200\";\r\n}\r\n.ion-log-in:before {\r\n  content: \"\\f29e\";\r\n}\r\n.ion-log-out:before {\r\n  content: \"\\f29f\";\r\n}\r\n.ion-loop:before {\r\n  content: \"\\f201\";\r\n}\r\n.ion-magnet:before {\r\n  content: \"\\f2a0\";\r\n}\r\n.ion-male:before {\r\n  content: \"\\f2a1\";\r\n}\r\n.ion-man:before {\r\n  content: \"\\f202\";\r\n}\r\n.ion-map:before {\r\n  content: \"\\f203\";\r\n}\r\n.ion-medkit:before {\r\n  content: \"\\f2a2\";\r\n}\r\n.ion-merge:before {\r\n  content: \"\\f33f\";\r\n}\r\n.ion-mic-a:before {\r\n  content: \"\\f204\";\r\n}\r\n.ion-mic-b:before {\r\n  content: \"\\f205\";\r\n}\r\n.ion-mic-c:before {\r\n  content: \"\\f206\";\r\n}\r\n.ion-minus:before {\r\n  content: \"\\f209\";\r\n}\r\n.ion-minus-circled:before {\r\n  content: \"\\f207\";\r\n}\r\n.ion-minus-round:before {\r\n  content: \"\\f208\";\r\n}\r\n.ion-model-s:before {\r\n  content: \"\\f2c1\";\r\n}\r\n.ion-monitor:before {\r\n  content: \"\\f20a\";\r\n}\r\n.ion-more:before {\r\n  content: \"\\f20b\";\r\n}\r\n.ion-mouse:before {\r\n  content: \"\\f340\";\r\n}\r\n.ion-music-note:before {\r\n  content: \"\\f20c\";\r\n}\r\n.ion-navicon:before {\r\n  content: \"\\f20e\";\r\n}\r\n.ion-navicon-round:before {\r\n  content: \"\\f20d\";\r\n}\r\n.ion-navigate:before {\r\n  content: \"\\f2a3\";\r\n}\r\n.ion-network:before {\r\n  content: \"\\f341\";\r\n}\r\n.ion-no-smoking:before {\r\n  content: \"\\f2c2\";\r\n}\r\n.ion-nuclear:before {\r\n  content: \"\\f2a4\";\r\n}\r\n.ion-outlet:before {\r\n  content: \"\\f342\";\r\n}\r\n.ion-paper-airplane:before {\r\n  content: \"\\f2c3\";\r\n}\r\n.ion-paperclip:before {\r\n  content: \"\\f20f\";\r\n}\r\n.ion-pause:before {\r\n  content: \"\\f210\";\r\n}\r\n.ion-person:before {\r\n  content: \"\\f213\";\r\n}\r\n.ion-person-add:before {\r\n  content: \"\\f211\";\r\n}\r\n.ion-person-stalker:before {\r\n  content: \"\\f212\";\r\n}\r\n.ion-pie-graph:before {\r\n  content: \"\\f2a5\";\r\n}\r\n.ion-pin:before {\r\n  content: \"\\f2a6\";\r\n}\r\n.ion-pinpoint:before {\r\n  content: \"\\f2a7\";\r\n}\r\n.ion-pizza:before {\r\n  content: \"\\f2a8\";\r\n}\r\n.ion-plane:before {\r\n  content: \"\\f214\";\r\n}\r\n.ion-planet:before {\r\n  content: \"\\f343\";\r\n}\r\n.ion-play:before {\r\n  content: \"\\f215\";\r\n}\r\n.ion-playstation:before {\r\n  content: \"\\f30a\";\r\n}\r\n.ion-plus:before {\r\n  content: \"\\f218\";\r\n}\r\n.ion-plus-circled:before {\r\n  content: \"\\f216\";\r\n}\r\n.ion-plus-round:before {\r\n  content: \"\\f217\";\r\n}\r\n.ion-podium:before {\r\n  content: \"\\f344\";\r\n}\r\n.ion-pound:before {\r\n  content: \"\\f219\";\r\n}\r\n.ion-power:before {\r\n  content: \"\\f2a9\";\r\n}\r\n.ion-pricetag:before {\r\n  content: \"\\f2aa\";\r\n}\r\n.ion-pricetags:before {\r\n  content: \"\\f2ab\";\r\n}\r\n.ion-printer:before {\r\n  content: \"\\f21a\";\r\n}\r\n.ion-pull-request:before {\r\n  content: \"\\f345\";\r\n}\r\n.ion-qr-scanner:before {\r\n  content: \"\\f346\";\r\n}\r\n.ion-quote:before {\r\n  content: \"\\f347\";\r\n}\r\n.ion-radio-waves:before {\r\n  content: \"\\f2ac\";\r\n}\r\n.ion-record:before {\r\n  content: \"\\f21b\";\r\n}\r\n.ion-refresh:before {\r\n  content: \"\\f21c\";\r\n}\r\n.ion-reply:before {\r\n  content: \"\\f21e\";\r\n}\r\n.ion-reply-all:before {\r\n  content: \"\\f21d\";\r\n}\r\n.ion-ribbon-a:before {\r\n  content: \"\\f348\";\r\n}\r\n.ion-ribbon-b:before {\r\n  content: \"\\f349\";\r\n}\r\n.ion-sad:before {\r\n  content: \"\\f34a\";\r\n}\r\n.ion-scissors:before {\r\n  content: \"\\f34b\";\r\n}\r\n.ion-search:before {\r\n  content: \"\\f21f\";\r\n}\r\n.ion-settings:before {\r\n  content: \"\\f2ad\";\r\n}\r\n.ion-share:before {\r\n  content: \"\\f220\";\r\n}\r\n.ion-shuffle:before {\r\n  content: \"\\f221\";\r\n}\r\n.ion-skip-backward:before {\r\n  content: \"\\f222\";\r\n}\r\n.ion-skip-forward:before {\r\n  content: \"\\f223\";\r\n}\r\n.ion-social-android:before {\r\n  content: \"\\f225\";\r\n}\r\n.ion-social-android-outline:before {\r\n  content: \"\\f224\";\r\n}\r\n.ion-social-apple:before {\r\n  content: \"\\f227\";\r\n}\r\n.ion-social-apple-outline:before {\r\n  content: \"\\f226\";\r\n}\r\n.ion-social-bitcoin:before {\r\n  content: \"\\f2af\";\r\n}\r\n.ion-social-bitcoin-outline:before {\r\n  content: \"\\f2ae\";\r\n}\r\n.ion-social-buffer:before {\r\n  content: \"\\f229\";\r\n}\r\n.ion-social-buffer-outline:before {\r\n  content: \"\\f228\";\r\n}\r\n.ion-social-designernews:before {\r\n  content: \"\\f22b\";\r\n}\r\n.ion-social-designernews-outline:before {\r\n  content: \"\\f22a\";\r\n}\r\n.ion-social-dribbble:before {\r\n  content: \"\\f22d\";\r\n}\r\n.ion-social-dribbble-outline:before {\r\n  content: \"\\f22c\";\r\n}\r\n.ion-social-dropbox:before {\r\n  content: \"\\f22f\";\r\n}\r\n.ion-social-dropbox-outline:before {\r\n  content: \"\\f22e\";\r\n}\r\n.ion-social-facebook:before {\r\n  content: \"\\f231\";\r\n}\r\n.ion-social-facebook-outline:before {\r\n  content: \"\\f230\";\r\n}\r\n.ion-social-foursquare:before {\r\n  content: \"\\f34d\";\r\n}\r\n.ion-social-foursquare-outline:before {\r\n  content: \"\\f34c\";\r\n}\r\n.ion-social-freebsd-devil:before {\r\n  content: \"\\f2c4\";\r\n}\r\n.ion-social-github:before {\r\n  content: \"\\f233\";\r\n}\r\n.ion-social-github-outline:before {\r\n  content: \"\\f232\";\r\n}\r\n.ion-social-google:before {\r\n  content: \"\\f34f\";\r\n}\r\n.ion-social-google-outline:before {\r\n  content: \"\\f34e\";\r\n}\r\n.ion-social-googleplus:before {\r\n  content: \"\\f235\";\r\n}\r\n.ion-social-googleplus-outline:before {\r\n  content: \"\\f234\";\r\n}\r\n.ion-social-hackernews:before {\r\n  content: \"\\f237\";\r\n}\r\n.ion-social-hackernews-outline:before {\r\n  content: \"\\f236\";\r\n}\r\n.ion-social-instagram:before {\r\n  content: \"\\f351\";\r\n}\r\n.ion-social-instagram-outline:before {\r\n  content: \"\\f350\";\r\n}\r\n.ion-social-linkedin:before {\r\n  content: \"\\f239\";\r\n}\r\n.ion-social-linkedin-outline:before {\r\n  content: \"\\f238\";\r\n}\r\n.ion-social-pinterest:before {\r\n  content: \"\\f2b1\";\r\n}\r\n.ion-social-pinterest-outline:before {\r\n  content: \"\\f2b0\";\r\n}\r\n.ion-social-reddit:before {\r\n  content: \"\\f23b\";\r\n}\r\n.ion-social-reddit-outline:before {\r\n  content: \"\\f23a\";\r\n}\r\n.ion-social-rss:before {\r\n  content: \"\\f23d\";\r\n}\r\n.ion-social-rss-outline:before {\r\n  content: \"\\f23c\";\r\n}\r\n.ion-social-skype:before {\r\n  content: \"\\f23f\";\r\n}\r\n.ion-social-skype-outline:before {\r\n  content: \"\\f23e\";\r\n}\r\n.ion-social-tumblr:before {\r\n  content: \"\\f241\";\r\n}\r\n.ion-social-tumblr-outline:before {\r\n  content: \"\\f240\";\r\n}\r\n.ion-social-tux:before {\r\n  content: \"\\f2c5\";\r\n}\r\n.ion-social-twitter:before {\r\n  content: \"\\f243\";\r\n}\r\n.ion-social-twitter-outline:before {\r\n  content: \"\\f242\";\r\n}\r\n.ion-social-usd:before {\r\n  content: \"\\f353\";\r\n}\r\n.ion-social-usd-outline:before {\r\n  content: \"\\f352\";\r\n}\r\n.ion-social-vimeo:before {\r\n  content: \"\\f245\";\r\n}\r\n.ion-social-vimeo-outline:before {\r\n  content: \"\\f244\";\r\n}\r\n.ion-social-windows:before {\r\n  content: \"\\f247\";\r\n}\r\n.ion-social-windows-outline:before {\r\n  content: \"\\f246\";\r\n}\r\n.ion-social-wordpress:before {\r\n  content: \"\\f249\";\r\n}\r\n.ion-social-wordpress-outline:before {\r\n  content: \"\\f248\";\r\n}\r\n.ion-social-yahoo:before {\r\n  content: \"\\f24b\";\r\n}\r\n.ion-social-yahoo-outline:before {\r\n  content: \"\\f24a\";\r\n}\r\n.ion-social-youtube:before {\r\n  content: \"\\f24d\";\r\n}\r\n.ion-social-youtube-outline:before {\r\n  content: \"\\f24c\";\r\n}\r\n.ion-speakerphone:before {\r\n  content: \"\\f2b2\";\r\n}\r\n.ion-speedometer:before {\r\n  content: \"\\f2b3\";\r\n}\r\n.ion-spoon:before {\r\n  content: \"\\f2b4\";\r\n}\r\n.ion-star:before {\r\n  content: \"\\f24e\";\r\n}\r\n.ion-stats-bars:before {\r\n  content: \"\\f2b5\";\r\n}\r\n.ion-steam:before {\r\n  content: \"\\f30b\";\r\n}\r\n.ion-stop:before {\r\n  content: \"\\f24f\";\r\n}\r\n.ion-thermometer:before {\r\n  content: \"\\f2b6\";\r\n}\r\n.ion-thumbsdown:before {\r\n  content: \"\\f250\";\r\n}\r\n.ion-thumbsup:before {\r\n  content: \"\\f251\";\r\n}\r\n.ion-toggle:before {\r\n  content: \"\\f355\";\r\n}\r\n.ion-toggle-filled:before {\r\n  content: \"\\f354\";\r\n}\r\n.ion-trash-a:before {\r\n  content: \"\\f252\";\r\n}\r\n.ion-trash-b:before {\r\n  content: \"\\f253\";\r\n}\r\n.ion-trophy:before {\r\n  content: \"\\f356\";\r\n}\r\n.ion-umbrella:before {\r\n  content: \"\\f2b7\";\r\n}\r\n.ion-university:before {\r\n  content: \"\\f357\";\r\n}\r\n.ion-unlocked:before {\r\n  content: \"\\f254\";\r\n}\r\n.ion-upload:before {\r\n  content: \"\\f255\";\r\n}\r\n.ion-usb:before {\r\n  content: \"\\f2b8\";\r\n}\r\n.ion-videocamera:before {\r\n  content: \"\\f256\";\r\n}\r\n.ion-volume-high:before {\r\n  content: \"\\f257\";\r\n}\r\n.ion-volume-low:before {\r\n  content: \"\\f258\";\r\n}\r\n.ion-volume-medium:before {\r\n  content: \"\\f259\";\r\n}\r\n.ion-volume-mute:before {\r\n  content: \"\\f25a\";\r\n}\r\n.ion-wand:before {\r\n  content: \"\\f358\";\r\n}\r\n.ion-waterdrop:before {\r\n  content: \"\\f25b\";\r\n}\r\n.ion-wifi:before {\r\n  content: \"\\f25c\";\r\n}\r\n.ion-wineglass:before {\r\n  content: \"\\f2b9\";\r\n}\r\n.ion-woman:before {\r\n  content: \"\\f25d\";\r\n}\r\n.ion-wrench:before {\r\n  content: \"\\f2ba\";\r\n}\r\n.ion-xbox:before {\r\n  content: \"\\f30c\";\r\n}\r\n@font-face {\r\n  font-family: 'themify';\r\n  src: url('../fonts/themify.eot?-fvbane');\r\n  src: url('../fonts/themify.eot?#iefix-fvbane') format('embedded-opentype'), url('../fonts/themify.woff?-fvbane') format('woff'), url('../fonts/themify.ttf?-fvbane') format('truetype'), url('../fonts/themify.svg?-fvbane#themify') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n[class^=\"ti-\"],\r\n[class*=\" ti-\"] {\r\n  font-family: 'themify';\r\n  speak: none;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  font-variant: normal;\r\n  text-transform: none;\r\n  line-height: 1;\r\n  /* Better Font Rendering =========== */\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n.ti-wand:before {\r\n  content: \"\\e600\";\r\n}\r\n.ti-volume:before {\r\n  content: \"\\e601\";\r\n}\r\n.ti-user:before {\r\n  content: \"\\e602\";\r\n}\r\n.ti-unlock:before {\r\n  content: \"\\e603\";\r\n}\r\n.ti-unlink:before {\r\n  content: \"\\e604\";\r\n}\r\n.ti-trash:before {\r\n  content: \"\\e605\";\r\n}\r\n.ti-thought:before {\r\n  content: \"\\e606\";\r\n}\r\n.ti-target:before {\r\n  content: \"\\e607\";\r\n}\r\n.ti-tag:before {\r\n  content: \"\\e608\";\r\n}\r\n.ti-tablet:before {\r\n  content: \"\\e609\";\r\n}\r\n.ti-star:before {\r\n  content: \"\\e60a\";\r\n}\r\n.ti-spray:before {\r\n  content: \"\\e60b\";\r\n}\r\n.ti-signal:before {\r\n  content: \"\\e60c\";\r\n}\r\n.ti-shopping-cart:before {\r\n  content: \"\\e60d\";\r\n}\r\n.ti-shopping-cart-full:before {\r\n  content: \"\\e60e\";\r\n}\r\n.ti-settings:before {\r\n  content: \"\\e60f\";\r\n}\r\n.ti-search:before {\r\n  content: \"\\e610\";\r\n}\r\n.ti-zoom-in:before {\r\n  content: \"\\e611\";\r\n}\r\n.ti-zoom-out:before {\r\n  content: \"\\e612\";\r\n}\r\n.ti-cut:before {\r\n  content: \"\\e613\";\r\n}\r\n.ti-ruler:before {\r\n  content: \"\\e614\";\r\n}\r\n.ti-ruler-pencil:before {\r\n  content: \"\\e615\";\r\n}\r\n.ti-ruler-alt:before {\r\n  content: \"\\e616\";\r\n}\r\n.ti-bookmark:before {\r\n  content: \"\\e617\";\r\n}\r\n.ti-bookmark-alt:before {\r\n  content: \"\\e618\";\r\n}\r\n.ti-reload:before {\r\n  content: \"\\e619\";\r\n}\r\n.ti-plus:before {\r\n  content: \"\\e61a\";\r\n}\r\n.ti-pin:before {\r\n  content: \"\\e61b\";\r\n}\r\n.ti-pencil:before {\r\n  content: \"\\e61c\";\r\n}\r\n.ti-pencil-alt:before {\r\n  content: \"\\e61d\";\r\n}\r\n.ti-paint-roller:before {\r\n  content: \"\\e61e\";\r\n}\r\n.ti-paint-bucket:before {\r\n  content: \"\\e61f\";\r\n}\r\n.ti-na:before {\r\n  content: \"\\e620\";\r\n}\r\n.ti-mobile:before {\r\n  content: \"\\e621\";\r\n}\r\n.ti-minus:before {\r\n  content: \"\\e622\";\r\n}\r\n.ti-medall:before {\r\n  content: \"\\e623\";\r\n}\r\n.ti-medall-alt:before {\r\n  content: \"\\e624\";\r\n}\r\n.ti-marker:before {\r\n  content: \"\\e625\";\r\n}\r\n.ti-marker-alt:before {\r\n  content: \"\\e626\";\r\n}\r\n.ti-arrow-up:before {\r\n  content: \"\\e627\";\r\n}\r\n.ti-arrow-right:before {\r\n  content: \"\\e628\";\r\n}\r\n.ti-arrow-left:before {\r\n  content: \"\\e629\";\r\n}\r\n.ti-arrow-down:before {\r\n  content: \"\\e62a\";\r\n}\r\n.ti-lock:before {\r\n  content: \"\\e62b\";\r\n}\r\n.ti-location-arrow:before {\r\n  content: \"\\e62c\";\r\n}\r\n.ti-link:before {\r\n  content: \"\\e62d\";\r\n}\r\n.ti-layout:before {\r\n  content: \"\\e62e\";\r\n}\r\n.ti-layers:before {\r\n  content: \"\\e62f\";\r\n}\r\n.ti-layers-alt:before {\r\n  content: \"\\e630\";\r\n}\r\n.ti-key:before {\r\n  content: \"\\e631\";\r\n}\r\n.ti-import:before {\r\n  content: \"\\e632\";\r\n}\r\n.ti-image:before {\r\n  content: \"\\e633\";\r\n}\r\n.ti-heart:before {\r\n  content: \"\\e634\";\r\n}\r\n.ti-heart-broken:before {\r\n  content: \"\\e635\";\r\n}\r\n.ti-hand-stop:before {\r\n  content: \"\\e636\";\r\n}\r\n.ti-hand-open:before {\r\n  content: \"\\e637\";\r\n}\r\n.ti-hand-drag:before {\r\n  content: \"\\e638\";\r\n}\r\n.ti-folder:before {\r\n  content: \"\\e639\";\r\n}\r\n.ti-flag:before {\r\n  content: \"\\e63a\";\r\n}\r\n.ti-flag-alt:before {\r\n  content: \"\\e63b\";\r\n}\r\n.ti-flag-alt-2:before {\r\n  content: \"\\e63c\";\r\n}\r\n.ti-eye:before {\r\n  content: \"\\e63d\";\r\n}\r\n.ti-export:before {\r\n  content: \"\\e63e\";\r\n}\r\n.ti-exchange-vertical:before {\r\n  content: \"\\e63f\";\r\n}\r\n.ti-desktop:before {\r\n  content: \"\\e640\";\r\n}\r\n.ti-cup:before {\r\n  content: \"\\e641\";\r\n}\r\n.ti-crown:before {\r\n  content: \"\\e642\";\r\n}\r\n.ti-comments:before {\r\n  content: \"\\e643\";\r\n}\r\n.ti-comment:before {\r\n  content: \"\\e644\";\r\n}\r\n.ti-comment-alt:before {\r\n  content: \"\\e645\";\r\n}\r\n.ti-close:before {\r\n  content: \"\\e646\";\r\n}\r\n.ti-clip:before {\r\n  content: \"\\e647\";\r\n}\r\n.ti-angle-up:before {\r\n  content: \"\\e648\";\r\n}\r\n.ti-angle-right:before {\r\n  content: \"\\e649\";\r\n}\r\n.ti-angle-left:before {\r\n  content: \"\\e64a\";\r\n}\r\n.ti-angle-down:before {\r\n  content: \"\\e64b\";\r\n}\r\n.ti-check:before {\r\n  content: \"\\e64c\";\r\n}\r\n.ti-check-box:before {\r\n  content: \"\\e64d\";\r\n}\r\n.ti-camera:before {\r\n  content: \"\\e64e\";\r\n}\r\n.ti-announcement:before {\r\n  content: \"\\e64f\";\r\n}\r\n.ti-brush:before {\r\n  content: \"\\e650\";\r\n}\r\n.ti-briefcase:before {\r\n  content: \"\\e651\";\r\n}\r\n.ti-bolt:before {\r\n  content: \"\\e652\";\r\n}\r\n.ti-bolt-alt:before {\r\n  content: \"\\e653\";\r\n}\r\n.ti-blackboard:before {\r\n  content: \"\\e654\";\r\n}\r\n.ti-bag:before {\r\n  content: \"\\e655\";\r\n}\r\n.ti-move:before {\r\n  content: \"\\e656\";\r\n}\r\n.ti-arrows-vertical:before {\r\n  content: \"\\e657\";\r\n}\r\n.ti-arrows-horizontal:before {\r\n  content: \"\\e658\";\r\n}\r\n.ti-fullscreen:before {\r\n  content: \"\\e659\";\r\n}\r\n.ti-arrow-top-right:before {\r\n  content: \"\\e65a\";\r\n}\r\n.ti-arrow-top-left:before {\r\n  content: \"\\e65b\";\r\n}\r\n.ti-arrow-circle-up:before {\r\n  content: \"\\e65c\";\r\n}\r\n.ti-arrow-circle-right:before {\r\n  content: \"\\e65d\";\r\n}\r\n.ti-arrow-circle-left:before {\r\n  content: \"\\e65e\";\r\n}\r\n.ti-arrow-circle-down:before {\r\n  content: \"\\e65f\";\r\n}\r\n.ti-angle-double-up:before {\r\n  content: \"\\e660\";\r\n}\r\n.ti-angle-double-right:before {\r\n  content: \"\\e661\";\r\n}\r\n.ti-angle-double-left:before {\r\n  content: \"\\e662\";\r\n}\r\n.ti-angle-double-down:before {\r\n  content: \"\\e663\";\r\n}\r\n.ti-zip:before {\r\n  content: \"\\e664\";\r\n}\r\n.ti-world:before {\r\n  content: \"\\e665\";\r\n}\r\n.ti-wheelchair:before {\r\n  content: \"\\e666\";\r\n}\r\n.ti-view-list:before {\r\n  content: \"\\e667\";\r\n}\r\n.ti-view-list-alt:before {\r\n  content: \"\\e668\";\r\n}\r\n.ti-view-grid:before {\r\n  content: \"\\e669\";\r\n}\r\n.ti-uppercase:before {\r\n  content: \"\\e66a\";\r\n}\r\n.ti-upload:before {\r\n  content: \"\\e66b\";\r\n}\r\n.ti-underline:before {\r\n  content: \"\\e66c\";\r\n}\r\n.ti-truck:before {\r\n  content: \"\\e66d\";\r\n}\r\n.ti-timer:before {\r\n  content: \"\\e66e\";\r\n}\r\n.ti-ticket:before {\r\n  content: \"\\e66f\";\r\n}\r\n.ti-thumb-up:before {\r\n  content: \"\\e670\";\r\n}\r\n.ti-thumb-down:before {\r\n  content: \"\\e671\";\r\n}\r\n.ti-text:before {\r\n  content: \"\\e672\";\r\n}\r\n.ti-stats-up:before {\r\n  content: \"\\e673\";\r\n}\r\n.ti-stats-down:before {\r\n  content: \"\\e674\";\r\n}\r\n.ti-split-v:before {\r\n  content: \"\\e675\";\r\n}\r\n.ti-split-h:before {\r\n  content: \"\\e676\";\r\n}\r\n.ti-smallcap:before {\r\n  content: \"\\e677\";\r\n}\r\n.ti-shine:before {\r\n  content: \"\\e678\";\r\n}\r\n.ti-shift-right:before {\r\n  content: \"\\e679\";\r\n}\r\n.ti-shift-left:before {\r\n  content: \"\\e67a\";\r\n}\r\n.ti-shield:before {\r\n  content: \"\\e67b\";\r\n}\r\n.ti-notepad:before {\r\n  content: \"\\e67c\";\r\n}\r\n.ti-server:before {\r\n  content: \"\\e67d\";\r\n}\r\n.ti-quote-right:before {\r\n  content: \"\\e67e\";\r\n}\r\n.ti-quote-left:before {\r\n  content: \"\\e67f\";\r\n}\r\n.ti-pulse:before {\r\n  content: \"\\e680\";\r\n}\r\n.ti-printer:before {\r\n  content: \"\\e681\";\r\n}\r\n.ti-power-off:before {\r\n  content: \"\\e682\";\r\n}\r\n.ti-plug:before {\r\n  content: \"\\e683\";\r\n}\r\n.ti-pie-chart:before {\r\n  content: \"\\e684\";\r\n}\r\n.ti-paragraph:before {\r\n  content: \"\\e685\";\r\n}\r\n.ti-panel:before {\r\n  content: \"\\e686\";\r\n}\r\n.ti-package:before {\r\n  content: \"\\e687\";\r\n}\r\n.ti-music:before {\r\n  content: \"\\e688\";\r\n}\r\n.ti-music-alt:before {\r\n  content: \"\\e689\";\r\n}\r\n.ti-mouse:before {\r\n  content: \"\\e68a\";\r\n}\r\n.ti-mouse-alt:before {\r\n  content: \"\\e68b\";\r\n}\r\n.ti-money:before {\r\n  content: \"\\e68c\";\r\n}\r\n.ti-microphone:before {\r\n  content: \"\\e68d\";\r\n}\r\n.ti-menu:before {\r\n  content: \"\\e68e\";\r\n}\r\n.ti-menu-alt:before {\r\n  content: \"\\e68f\";\r\n}\r\n.ti-map:before {\r\n  content: \"\\e690\";\r\n}\r\n.ti-map-alt:before {\r\n  content: \"\\e691\";\r\n}\r\n.ti-loop:before {\r\n  content: \"\\e692\";\r\n}\r\n.ti-location-pin:before {\r\n  content: \"\\e693\";\r\n}\r\n.ti-list:before {\r\n  content: \"\\e694\";\r\n}\r\n.ti-light-bulb:before {\r\n  content: \"\\e695\";\r\n}\r\n.ti-Italic:before {\r\n  content: \"\\e696\";\r\n}\r\n.ti-info:before {\r\n  content: \"\\e697\";\r\n}\r\n.ti-infinite:before {\r\n  content: \"\\e698\";\r\n}\r\n.ti-id-badge:before {\r\n  content: \"\\e699\";\r\n}\r\n.ti-hummer:before {\r\n  content: \"\\e69a\";\r\n}\r\n.ti-home:before {\r\n  content: \"\\e69b\";\r\n}\r\n.ti-help:before {\r\n  content: \"\\e69c\";\r\n}\r\n.ti-headphone:before {\r\n  content: \"\\e69d\";\r\n}\r\n.ti-harddrives:before {\r\n  content: \"\\e69e\";\r\n}\r\n.ti-harddrive:before {\r\n  content: \"\\e69f\";\r\n}\r\n.ti-gift:before {\r\n  content: \"\\e6a0\";\r\n}\r\n.ti-game:before {\r\n  content: \"\\e6a1\";\r\n}\r\n.ti-filter:before {\r\n  content: \"\\e6a2\";\r\n}\r\n.ti-files:before {\r\n  content: \"\\e6a3\";\r\n}\r\n.ti-file:before {\r\n  content: \"\\e6a4\";\r\n}\r\n.ti-eraser:before {\r\n  content: \"\\e6a5\";\r\n}\r\n.ti-envelope:before {\r\n  content: \"\\e6a6\";\r\n}\r\n.ti-download:before {\r\n  content: \"\\e6a7\";\r\n}\r\n.ti-direction:before {\r\n  content: \"\\e6a8\";\r\n}\r\n.ti-direction-alt:before {\r\n  content: \"\\e6a9\";\r\n}\r\n.ti-dashboard:before {\r\n  content: \"\\e6aa\";\r\n}\r\n.ti-control-stop:before {\r\n  content: \"\\e6ab\";\r\n}\r\n.ti-control-shuffle:before {\r\n  content: \"\\e6ac\";\r\n}\r\n.ti-control-play:before {\r\n  content: \"\\e6ad\";\r\n}\r\n.ti-control-pause:before {\r\n  content: \"\\e6ae\";\r\n}\r\n.ti-control-forward:before {\r\n  content: \"\\e6af\";\r\n}\r\n.ti-control-backward:before {\r\n  content: \"\\e6b0\";\r\n}\r\n.ti-cloud:before {\r\n  content: \"\\e6b1\";\r\n}\r\n.ti-cloud-up:before {\r\n  content: \"\\e6b2\";\r\n}\r\n.ti-cloud-down:before {\r\n  content: \"\\e6b3\";\r\n}\r\n.ti-clipboard:before {\r\n  content: \"\\e6b4\";\r\n}\r\n.ti-car:before {\r\n  content: \"\\e6b5\";\r\n}\r\n.ti-calendar:before {\r\n  content: \"\\e6b6\";\r\n}\r\n.ti-book:before {\r\n  content: \"\\e6b7\";\r\n}\r\n.ti-bell:before {\r\n  content: \"\\e6b8\";\r\n}\r\n.ti-basketball:before {\r\n  content: \"\\e6b9\";\r\n}\r\n.ti-bar-chart:before {\r\n  content: \"\\e6ba\";\r\n}\r\n.ti-bar-chart-alt:before {\r\n  content: \"\\e6bb\";\r\n}\r\n.ti-back-right:before {\r\n  content: \"\\e6bc\";\r\n}\r\n.ti-back-left:before {\r\n  content: \"\\e6bd\";\r\n}\r\n.ti-arrows-corner:before {\r\n  content: \"\\e6be\";\r\n}\r\n.ti-archive:before {\r\n  content: \"\\e6bf\";\r\n}\r\n.ti-anchor:before {\r\n  content: \"\\e6c0\";\r\n}\r\n.ti-align-right:before {\r\n  content: \"\\e6c1\";\r\n}\r\n.ti-align-left:before {\r\n  content: \"\\e6c2\";\r\n}\r\n.ti-align-justify:before {\r\n  content: \"\\e6c3\";\r\n}\r\n.ti-align-center:before {\r\n  content: \"\\e6c4\";\r\n}\r\n.ti-alert:before {\r\n  content: \"\\e6c5\";\r\n}\r\n.ti-alarm-clock:before {\r\n  content: \"\\e6c6\";\r\n}\r\n.ti-agenda:before {\r\n  content: \"\\e6c7\";\r\n}\r\n.ti-write:before {\r\n  content: \"\\e6c8\";\r\n}\r\n.ti-window:before {\r\n  content: \"\\e6c9\";\r\n}\r\n.ti-widgetized:before {\r\n  content: \"\\e6ca\";\r\n}\r\n.ti-widget:before {\r\n  content: \"\\e6cb\";\r\n}\r\n.ti-widget-alt:before {\r\n  content: \"\\e6cc\";\r\n}\r\n.ti-wallet:before {\r\n  content: \"\\e6cd\";\r\n}\r\n.ti-video-clapper:before {\r\n  content: \"\\e6ce\";\r\n}\r\n.ti-video-camera:before {\r\n  content: \"\\e6cf\";\r\n}\r\n.ti-vector:before {\r\n  content: \"\\e6d0\";\r\n}\r\n.ti-themify-logo:before {\r\n  content: \"\\e6d1\";\r\n}\r\n.ti-themify-favicon:before {\r\n  content: \"\\e6d2\";\r\n}\r\n.ti-themify-favicon-alt:before {\r\n  content: \"\\e6d3\";\r\n}\r\n.ti-support:before {\r\n  content: \"\\e6d4\";\r\n}\r\n.ti-stamp:before {\r\n  content: \"\\e6d5\";\r\n}\r\n.ti-split-v-alt:before {\r\n  content: \"\\e6d6\";\r\n}\r\n.ti-slice:before {\r\n  content: \"\\e6d7\";\r\n}\r\n.ti-shortcode:before {\r\n  content: \"\\e6d8\";\r\n}\r\n.ti-shift-right-alt:before {\r\n  content: \"\\e6d9\";\r\n}\r\n.ti-shift-left-alt:before {\r\n  content: \"\\e6da\";\r\n}\r\n.ti-ruler-alt-2:before {\r\n  content: \"\\e6db\";\r\n}\r\n.ti-receipt:before {\r\n  content: \"\\e6dc\";\r\n}\r\n.ti-pin2:before {\r\n  content: \"\\e6dd\";\r\n}\r\n.ti-pin-alt:before {\r\n  content: \"\\e6de\";\r\n}\r\n.ti-pencil-alt2:before {\r\n  content: \"\\e6df\";\r\n}\r\n.ti-palette:before {\r\n  content: \"\\e6e0\";\r\n}\r\n.ti-more:before {\r\n  content: \"\\e6e1\";\r\n}\r\n.ti-more-alt:before {\r\n  content: \"\\e6e2\";\r\n}\r\n.ti-microphone-alt:before {\r\n  content: \"\\e6e3\";\r\n}\r\n.ti-magnet:before {\r\n  content: \"\\e6e4\";\r\n}\r\n.ti-line-double:before {\r\n  content: \"\\e6e5\";\r\n}\r\n.ti-line-dotted:before {\r\n  content: \"\\e6e6\";\r\n}\r\n.ti-line-dashed:before {\r\n  content: \"\\e6e7\";\r\n}\r\n.ti-layout-width-full:before {\r\n  content: \"\\e6e8\";\r\n}\r\n.ti-layout-width-default:before {\r\n  content: \"\\e6e9\";\r\n}\r\n.ti-layout-width-default-alt:before {\r\n  content: \"\\e6ea\";\r\n}\r\n.ti-layout-tab:before {\r\n  content: \"\\e6eb\";\r\n}\r\n.ti-layout-tab-window:before {\r\n  content: \"\\e6ec\";\r\n}\r\n.ti-layout-tab-v:before {\r\n  content: \"\\e6ed\";\r\n}\r\n.ti-layout-tab-min:before {\r\n  content: \"\\e6ee\";\r\n}\r\n.ti-layout-slider:before {\r\n  content: \"\\e6ef\";\r\n}\r\n.ti-layout-slider-alt:before {\r\n  content: \"\\e6f0\";\r\n}\r\n.ti-layout-sidebar-right:before {\r\n  content: \"\\e6f1\";\r\n}\r\n.ti-layout-sidebar-none:before {\r\n  content: \"\\e6f2\";\r\n}\r\n.ti-layout-sidebar-left:before {\r\n  content: \"\\e6f3\";\r\n}\r\n.ti-layout-placeholder:before {\r\n  content: \"\\e6f4\";\r\n}\r\n.ti-layout-menu:before {\r\n  content: \"\\e6f5\";\r\n}\r\n.ti-layout-menu-v:before {\r\n  content: \"\\e6f6\";\r\n}\r\n.ti-layout-menu-separated:before {\r\n  content: \"\\e6f7\";\r\n}\r\n.ti-layout-menu-full:before {\r\n  content: \"\\e6f8\";\r\n}\r\n.ti-layout-media-right-alt:before {\r\n  content: \"\\e6f9\";\r\n}\r\n.ti-layout-media-right:before {\r\n  content: \"\\e6fa\";\r\n}\r\n.ti-layout-media-overlay:before {\r\n  content: \"\\e6fb\";\r\n}\r\n.ti-layout-media-overlay-alt:before {\r\n  content: \"\\e6fc\";\r\n}\r\n.ti-layout-media-overlay-alt-2:before {\r\n  content: \"\\e6fd\";\r\n}\r\n.ti-layout-media-left-alt:before {\r\n  content: \"\\e6fe\";\r\n}\r\n.ti-layout-media-left:before {\r\n  content: \"\\e6ff\";\r\n}\r\n.ti-layout-media-center-alt:before {\r\n  content: \"\\e700\";\r\n}\r\n.ti-layout-media-center:before {\r\n  content: \"\\e701\";\r\n}\r\n.ti-layout-list-thumb:before {\r\n  content: \"\\e702\";\r\n}\r\n.ti-layout-list-thumb-alt:before {\r\n  content: \"\\e703\";\r\n}\r\n.ti-layout-list-post:before {\r\n  content: \"\\e704\";\r\n}\r\n.ti-layout-list-large-image:before {\r\n  content: \"\\e705\";\r\n}\r\n.ti-layout-line-solid:before {\r\n  content: \"\\e706\";\r\n}\r\n.ti-layout-grid4:before {\r\n  content: \"\\e707\";\r\n}\r\n.ti-layout-grid3:before {\r\n  content: \"\\e708\";\r\n}\r\n.ti-layout-grid2:before {\r\n  content: \"\\e709\";\r\n}\r\n.ti-layout-grid2-thumb:before {\r\n  content: \"\\e70a\";\r\n}\r\n.ti-layout-cta-right:before {\r\n  content: \"\\e70b\";\r\n}\r\n.ti-layout-cta-left:before {\r\n  content: \"\\e70c\";\r\n}\r\n.ti-layout-cta-center:before {\r\n  content: \"\\e70d\";\r\n}\r\n.ti-layout-cta-btn-right:before {\r\n  content: \"\\e70e\";\r\n}\r\n.ti-layout-cta-btn-left:before {\r\n  content: \"\\e70f\";\r\n}\r\n.ti-layout-column4:before {\r\n  content: \"\\e710\";\r\n}\r\n.ti-layout-column3:before {\r\n  content: \"\\e711\";\r\n}\r\n.ti-layout-column2:before {\r\n  content: \"\\e712\";\r\n}\r\n.ti-layout-accordion-separated:before {\r\n  content: \"\\e713\";\r\n}\r\n.ti-layout-accordion-merged:before {\r\n  content: \"\\e714\";\r\n}\r\n.ti-layout-accordion-list:before {\r\n  content: \"\\e715\";\r\n}\r\n.ti-ink-pen:before {\r\n  content: \"\\e716\";\r\n}\r\n.ti-info-alt:before {\r\n  content: \"\\e717\";\r\n}\r\n.ti-help-alt:before {\r\n  content: \"\\e718\";\r\n}\r\n.ti-headphone-alt:before {\r\n  content: \"\\e719\";\r\n}\r\n.ti-hand-point-up:before {\r\n  content: \"\\e71a\";\r\n}\r\n.ti-hand-point-right:before {\r\n  content: \"\\e71b\";\r\n}\r\n.ti-hand-point-left:before {\r\n  content: \"\\e71c\";\r\n}\r\n.ti-hand-point-down:before {\r\n  content: \"\\e71d\";\r\n}\r\n.ti-gallery:before {\r\n  content: \"\\e71e\";\r\n}\r\n.ti-face-smile:before {\r\n  content: \"\\e71f\";\r\n}\r\n.ti-face-sad:before {\r\n  content: \"\\e720\";\r\n}\r\n.ti-credit-card:before {\r\n  content: \"\\e721\";\r\n}\r\n.ti-control-skip-forward:before {\r\n  content: \"\\e722\";\r\n}\r\n.ti-control-skip-backward:before {\r\n  content: \"\\e723\";\r\n}\r\n.ti-control-record:before {\r\n  content: \"\\e724\";\r\n}\r\n.ti-control-eject:before {\r\n  content: \"\\e725\";\r\n}\r\n.ti-comments-smiley:before {\r\n  content: \"\\e726\";\r\n}\r\n.ti-brush-alt:before {\r\n  content: \"\\e727\";\r\n}\r\n.ti-youtube:before {\r\n  content: \"\\e728\";\r\n}\r\n.ti-vimeo:before {\r\n  content: \"\\e729\";\r\n}\r\n.ti-twitter:before {\r\n  content: \"\\e72a\";\r\n}\r\n.ti-time:before {\r\n  content: \"\\e72b\";\r\n}\r\n.ti-tumblr:before {\r\n  content: \"\\e72c\";\r\n}\r\n.ti-skype:before {\r\n  content: \"\\e72d\";\r\n}\r\n.ti-share:before {\r\n  content: \"\\e72e\";\r\n}\r\n.ti-share-alt:before {\r\n  content: \"\\e72f\";\r\n}\r\n.ti-rocket:before {\r\n  content: \"\\e730\";\r\n}\r\n.ti-pinterest:before {\r\n  content: \"\\e731\";\r\n}\r\n.ti-new-window:before {\r\n  content: \"\\e732\";\r\n}\r\n.ti-microsoft:before {\r\n  content: \"\\e733\";\r\n}\r\n.ti-list-ol:before {\r\n  content: \"\\e734\";\r\n}\r\n.ti-linkedin:before {\r\n  content: \"\\e735\";\r\n}\r\n.ti-layout-sidebar-2:before {\r\n  content: \"\\e736\";\r\n}\r\n.ti-layout-grid4-alt:before {\r\n  content: \"\\e737\";\r\n}\r\n.ti-layout-grid3-alt:before {\r\n  content: \"\\e738\";\r\n}\r\n.ti-layout-grid2-alt:before {\r\n  content: \"\\e739\";\r\n}\r\n.ti-layout-column4-alt:before {\r\n  content: \"\\e73a\";\r\n}\r\n.ti-layout-column3-alt:before {\r\n  content: \"\\e73b\";\r\n}\r\n.ti-layout-column2-alt:before {\r\n  content: \"\\e73c\";\r\n}\r\n.ti-instagram:before {\r\n  content: \"\\e73d\";\r\n}\r\n.ti-google:before {\r\n  content: \"\\e73e\";\r\n}\r\n.ti-github:before {\r\n  content: \"\\e73f\";\r\n}\r\n.ti-flickr:before {\r\n  content: \"\\e740\";\r\n}\r\n.ti-facebook:before {\r\n  content: \"\\e741\";\r\n}\r\n.ti-dropbox:before {\r\n  content: \"\\e742\";\r\n}\r\n.ti-dribbble:before {\r\n  content: \"\\e743\";\r\n}\r\n.ti-apple:before {\r\n  content: \"\\e744\";\r\n}\r\n.ti-android:before {\r\n  content: \"\\e745\";\r\n}\r\n.ti-save:before {\r\n  content: \"\\e746\";\r\n}\r\n.ti-save-alt:before {\r\n  content: \"\\e747\";\r\n}\r\n.ti-yahoo:before {\r\n  content: \"\\e748\";\r\n}\r\n.ti-wordpress:before {\r\n  content: \"\\e749\";\r\n}\r\n.ti-vimeo-alt:before {\r\n  content: \"\\e74a\";\r\n}\r\n.ti-twitter-alt:before {\r\n  content: \"\\e74b\";\r\n}\r\n.ti-tumblr-alt:before {\r\n  content: \"\\e74c\";\r\n}\r\n.ti-trello:before {\r\n  content: \"\\e74d\";\r\n}\r\n.ti-stack-overflow:before {\r\n  content: \"\\e74e\";\r\n}\r\n.ti-soundcloud:before {\r\n  content: \"\\e74f\";\r\n}\r\n.ti-sharethis:before {\r\n  content: \"\\e750\";\r\n}\r\n.ti-sharethis-alt:before {\r\n  content: \"\\e751\";\r\n}\r\n.ti-reddit:before {\r\n  content: \"\\e752\";\r\n}\r\n.ti-pinterest-alt:before {\r\n  content: \"\\e753\";\r\n}\r\n.ti-microsoft-alt:before {\r\n  content: \"\\e754\";\r\n}\r\n.ti-linux:before {\r\n  content: \"\\e755\";\r\n}\r\n.ti-jsfiddle:before {\r\n  content: \"\\e756\";\r\n}\r\n.ti-joomla:before {\r\n  content: \"\\e757\";\r\n}\r\n.ti-html5:before {\r\n  content: \"\\e758\";\r\n}\r\n.ti-flickr-alt:before {\r\n  content: \"\\e759\";\r\n}\r\n.ti-email:before {\r\n  content: \"\\e75a\";\r\n}\r\n.ti-drupal:before {\r\n  content: \"\\e75b\";\r\n}\r\n.ti-dropbox-alt:before {\r\n  content: \"\\e75c\";\r\n}\r\n.ti-css3:before {\r\n  content: \"\\e75d\";\r\n}\r\n.ti-rss:before {\r\n  content: \"\\e75e\";\r\n}\r\n.ti-rss-alt:before {\r\n  content: \"\\e75f\";\r\n}\r\n/*!\r\n *  Weather Icons 2.0\r\n *  Updated August 1, 2015\r\n *  Weather themed icons for Bootstrap\r\n *  Author - Erik Flowers - erik@helloerik.com\r\n *  Email: erik@helloerik.com\r\n *  Twitter: http://twitter.com/Erik_UX\r\n *  ------------------------------------------------------------------------------\r\n *  Maintained at http://erikflowers.github.io/weather-icons\r\n *\r\n *  License\r\n *  ------------------------------------------------------------------------------\r\n *  - Font licensed under SIL OFL 1.1 -\r\n *    http://scripts.sil.org/OFL\r\n *  - CSS, SCSS and LESS are licensed under MIT License -\r\n *    http://opensource.org/licenses/mit-license.html\r\n *  - Documentation licensed under CC BY 3.0 -\r\n *    http://creativecommons.org/licenses/by/3.0/\r\n *  - Inspired by and works great as a companion with Font Awesome\r\n *    \"Font Awesome by Dave Gandy - http://fontawesome.io\"\r\n */\r\n@font-face {\r\n  font-family: 'weathericons';\r\n  src: url('../fonts/weathericons-regular-webfont.eot');\r\n  src: url('../fonts/weathericons-regular-webfont.eot?#iefix') format('embedded-opentype'), url('../fonts/weathericons-regular-webfont.woff2') format('woff2'), url('../fonts/weathericons-regular-webfont.woff') format('woff'), url('../fonts/weathericons-regular-webfont.ttf') format('truetype'), url('../fonts/weathericons-regular-webfont.svg#weather_iconsregular') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n.wi {\r\n  display: inline-block;\r\n  font-family: 'weathericons';\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n.wi-fw {\r\n  text-align: center;\r\n  width: 1.4em;\r\n}\r\n.wi-rotate-90 {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\r\n  transform: rotate(90deg);\r\n}\r\n.wi-rotate-180 {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\r\n  transform: rotate(180deg);\r\n}\r\n.wi-rotate-270 {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);\r\n  transform: rotate(270deg);\r\n}\r\n.wi-flip-horizontal {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);\r\n  transform: scale(-1, 1);\r\n}\r\n.wi-flip-vertical {\r\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);\r\n  transform: scale(1, -1);\r\n}\r\n.wi-day-sunny:before {\r\n  content: \"\\f00d\";\r\n}\r\n.wi-day-cloudy:before {\r\n  content: \"\\f002\";\r\n}\r\n.wi-day-cloudy-gusts:before {\r\n  content: \"\\f000\";\r\n}\r\n.wi-day-cloudy-windy:before {\r\n  content: \"\\f001\";\r\n}\r\n.wi-day-fog:before {\r\n  content: \"\\f003\";\r\n}\r\n.wi-day-hail:before {\r\n  content: \"\\f004\";\r\n}\r\n.wi-day-haze:before {\r\n  content: \"\\f0b6\";\r\n}\r\n.wi-day-lightning:before {\r\n  content: \"\\f005\";\r\n}\r\n.wi-day-rain:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-day-rain-mix:before {\r\n  content: \"\\f006\";\r\n}\r\n.wi-day-rain-wind:before {\r\n  content: \"\\f007\";\r\n}\r\n.wi-day-showers:before {\r\n  content: \"\\f009\";\r\n}\r\n.wi-day-sleet:before {\r\n  content: \"\\f0b2\";\r\n}\r\n.wi-day-sleet-storm:before {\r\n  content: \"\\f068\";\r\n}\r\n.wi-day-snow:before {\r\n  content: \"\\f00a\";\r\n}\r\n.wi-day-snow-thunderstorm:before {\r\n  content: \"\\f06b\";\r\n}\r\n.wi-day-snow-wind:before {\r\n  content: \"\\f065\";\r\n}\r\n.wi-day-sprinkle:before {\r\n  content: \"\\f00b\";\r\n}\r\n.wi-day-storm-showers:before {\r\n  content: \"\\f00e\";\r\n}\r\n.wi-day-sunny-overcast:before {\r\n  content: \"\\f00c\";\r\n}\r\n.wi-day-thunderstorm:before {\r\n  content: \"\\f010\";\r\n}\r\n.wi-day-windy:before {\r\n  content: \"\\f085\";\r\n}\r\n.wi-solar-eclipse:before {\r\n  content: \"\\f06e\";\r\n}\r\n.wi-hot:before {\r\n  content: \"\\f072\";\r\n}\r\n.wi-day-cloudy-high:before {\r\n  content: \"\\f07d\";\r\n}\r\n.wi-day-light-wind:before {\r\n  content: \"\\f0c4\";\r\n}\r\n.wi-night-clear:before {\r\n  content: \"\\f02e\";\r\n}\r\n.wi-night-alt-cloudy:before {\r\n  content: \"\\f086\";\r\n}\r\n.wi-night-alt-cloudy-gusts:before {\r\n  content: \"\\f022\";\r\n}\r\n.wi-night-alt-cloudy-windy:before {\r\n  content: \"\\f023\";\r\n}\r\n.wi-night-alt-hail:before {\r\n  content: \"\\f024\";\r\n}\r\n.wi-night-alt-lightning:before {\r\n  content: \"\\f025\";\r\n}\r\n.wi-night-alt-rain:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-night-alt-rain-mix:before {\r\n  content: \"\\f026\";\r\n}\r\n.wi-night-alt-rain-wind:before {\r\n  content: \"\\f027\";\r\n}\r\n.wi-night-alt-showers:before {\r\n  content: \"\\f029\";\r\n}\r\n.wi-night-alt-sleet:before {\r\n  content: \"\\f0b4\";\r\n}\r\n.wi-night-alt-sleet-storm:before {\r\n  content: \"\\f06a\";\r\n}\r\n.wi-night-alt-snow:before {\r\n  content: \"\\f02a\";\r\n}\r\n.wi-night-alt-snow-thunderstorm:before {\r\n  content: \"\\f06d\";\r\n}\r\n.wi-night-alt-snow-wind:before {\r\n  content: \"\\f067\";\r\n}\r\n.wi-night-alt-sprinkle:before {\r\n  content: \"\\f02b\";\r\n}\r\n.wi-night-alt-storm-showers:before {\r\n  content: \"\\f02c\";\r\n}\r\n.wi-night-alt-thunderstorm:before {\r\n  content: \"\\f02d\";\r\n}\r\n.wi-night-cloudy:before {\r\n  content: \"\\f031\";\r\n}\r\n.wi-night-cloudy-gusts:before {\r\n  content: \"\\f02f\";\r\n}\r\n.wi-night-cloudy-windy:before {\r\n  content: \"\\f030\";\r\n}\r\n.wi-night-fog:before {\r\n  content: \"\\f04a\";\r\n}\r\n.wi-night-hail:before {\r\n  content: \"\\f032\";\r\n}\r\n.wi-night-lightning:before {\r\n  content: \"\\f033\";\r\n}\r\n.wi-night-partly-cloudy:before {\r\n  content: \"\\f083\";\r\n}\r\n.wi-night-rain:before {\r\n  content: \"\\f036\";\r\n}\r\n.wi-night-rain-mix:before {\r\n  content: \"\\f034\";\r\n}\r\n.wi-night-rain-wind:before {\r\n  content: \"\\f035\";\r\n}\r\n.wi-night-showers:before {\r\n  content: \"\\f037\";\r\n}\r\n.wi-night-sleet:before {\r\n  content: \"\\f0b3\";\r\n}\r\n.wi-night-sleet-storm:before {\r\n  content: \"\\f069\";\r\n}\r\n.wi-night-snow:before {\r\n  content: \"\\f038\";\r\n}\r\n.wi-night-snow-thunderstorm:before {\r\n  content: \"\\f06c\";\r\n}\r\n.wi-night-snow-wind:before {\r\n  content: \"\\f066\";\r\n}\r\n.wi-night-sprinkle:before {\r\n  content: \"\\f039\";\r\n}\r\n.wi-night-storm-showers:before {\r\n  content: \"\\f03a\";\r\n}\r\n.wi-night-thunderstorm:before {\r\n  content: \"\\f03b\";\r\n}\r\n.wi-lunar-eclipse:before {\r\n  content: \"\\f070\";\r\n}\r\n.wi-stars:before {\r\n  content: \"\\f077\";\r\n}\r\n.wi-storm-showers:before {\r\n  content: \"\\f01d\";\r\n}\r\n.wi-thunderstorm:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-night-alt-cloudy-high:before {\r\n  content: \"\\f07e\";\r\n}\r\n.wi-night-cloudy-high:before {\r\n  content: \"\\f080\";\r\n}\r\n.wi-night-alt-partly-cloudy:before {\r\n  content: \"\\f081\";\r\n}\r\n.wi-cloud:before {\r\n  content: \"\\f041\";\r\n}\r\n.wi-cloudy:before {\r\n  content: \"\\f013\";\r\n}\r\n.wi-cloudy-gusts:before {\r\n  content: \"\\f011\";\r\n}\r\n.wi-cloudy-windy:before {\r\n  content: \"\\f012\";\r\n}\r\n.wi-fog:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-hail:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-rain:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-rain-mix:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-rain-wind:before {\r\n  content: \"\\f018\";\r\n}\r\n.wi-showers:before {\r\n  content: \"\\f01a\";\r\n}\r\n.wi-sleet:before {\r\n  content: \"\\f0b5\";\r\n}\r\n.wi-snow:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-sprinkle:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-storm-showers:before {\r\n  content: \"\\f01d\";\r\n}\r\n.wi-thunderstorm:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-snow-wind:before {\r\n  content: \"\\f064\";\r\n}\r\n.wi-snow:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-smog:before {\r\n  content: \"\\f074\";\r\n}\r\n.wi-smoke:before {\r\n  content: \"\\f062\";\r\n}\r\n.wi-lightning:before {\r\n  content: \"\\f016\";\r\n}\r\n.wi-raindrops:before {\r\n  content: \"\\f04e\";\r\n}\r\n.wi-raindrop:before {\r\n  content: \"\\f078\";\r\n}\r\n.wi-dust:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-snowflake-cold:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-windy:before {\r\n  content: \"\\f021\";\r\n}\r\n.wi-strong-wind:before {\r\n  content: \"\\f050\";\r\n}\r\n.wi-sandstorm:before {\r\n  content: \"\\f082\";\r\n}\r\n.wi-earthquake:before {\r\n  content: \"\\f0c6\";\r\n}\r\n.wi-fire:before {\r\n  content: \"\\f0c7\";\r\n}\r\n.wi-flood:before {\r\n  content: \"\\f07c\";\r\n}\r\n.wi-meteor:before {\r\n  content: \"\\f071\";\r\n}\r\n.wi-tsunami:before {\r\n  content: \"\\f0c5\";\r\n}\r\n.wi-volcano:before {\r\n  content: \"\\f0c8\";\r\n}\r\n.wi-hurricane:before {\r\n  content: \"\\f073\";\r\n}\r\n.wi-tornado:before {\r\n  content: \"\\f056\";\r\n}\r\n.wi-small-craft-advisory:before {\r\n  content: \"\\f0cc\";\r\n}\r\n.wi-gale-warning:before {\r\n  content: \"\\f0cd\";\r\n}\r\n.wi-storm-warning:before {\r\n  content: \"\\f0ce\";\r\n}\r\n.wi-hurricane-warning:before {\r\n  content: \"\\f0cf\";\r\n}\r\n.wi-wind-direction:before {\r\n  content: \"\\f0b1\";\r\n}\r\n.wi-alien:before {\r\n  content: \"\\f075\";\r\n}\r\n.wi-celsius:before {\r\n  content: \"\\f03c\";\r\n}\r\n.wi-fahrenheit:before {\r\n  content: \"\\f045\";\r\n}\r\n.wi-degrees:before {\r\n  content: \"\\f042\";\r\n}\r\n.wi-thermometer:before {\r\n  content: \"\\f055\";\r\n}\r\n.wi-thermometer-exterior:before {\r\n  content: \"\\f053\";\r\n}\r\n.wi-thermometer-internal:before {\r\n  content: \"\\f054\";\r\n}\r\n.wi-cloud-down:before {\r\n  content: \"\\f03d\";\r\n}\r\n.wi-cloud-up:before {\r\n  content: \"\\f040\";\r\n}\r\n.wi-cloud-refresh:before {\r\n  content: \"\\f03e\";\r\n}\r\n.wi-horizon:before {\r\n  content: \"\\f047\";\r\n}\r\n.wi-horizon-alt:before {\r\n  content: \"\\f046\";\r\n}\r\n.wi-sunrise:before {\r\n  content: \"\\f051\";\r\n}\r\n.wi-sunset:before {\r\n  content: \"\\f052\";\r\n}\r\n.wi-moonrise:before {\r\n  content: \"\\f0c9\";\r\n}\r\n.wi-moonset:before {\r\n  content: \"\\f0ca\";\r\n}\r\n.wi-refresh:before {\r\n  content: \"\\f04c\";\r\n}\r\n.wi-refresh-alt:before {\r\n  content: \"\\f04b\";\r\n}\r\n.wi-umbrella:before {\r\n  content: \"\\f084\";\r\n}\r\n.wi-barometer:before {\r\n  content: \"\\f079\";\r\n}\r\n.wi-humidity:before {\r\n  content: \"\\f07a\";\r\n}\r\n.wi-na:before {\r\n  content: \"\\f07b\";\r\n}\r\n.wi-train:before {\r\n  content: \"\\f0cb\";\r\n}\r\n.wi-moon-new:before {\r\n  content: \"\\f095\";\r\n}\r\n.wi-moon-waxing-cresent-1:before {\r\n  content: \"\\f096\";\r\n}\r\n.wi-moon-waxing-cresent-2:before {\r\n  content: \"\\f097\";\r\n}\r\n.wi-moon-waxing-cresent-3:before {\r\n  content: \"\\f098\";\r\n}\r\n.wi-moon-waxing-cresent-4:before {\r\n  content: \"\\f099\";\r\n}\r\n.wi-moon-waxing-cresent-5:before {\r\n  content: \"\\f09a\";\r\n}\r\n.wi-moon-waxing-cresent-6:before {\r\n  content: \"\\f09b\";\r\n}\r\n.wi-moon-first-quarter:before {\r\n  content: \"\\f09c\";\r\n}\r\n.wi-moon-waxing-gibbous-1:before {\r\n  content: \"\\f09d\";\r\n}\r\n.wi-moon-waxing-gibbous-2:before {\r\n  content: \"\\f09e\";\r\n}\r\n.wi-moon-waxing-gibbous-3:before {\r\n  content: \"\\f09f\";\r\n}\r\n.wi-moon-waxing-gibbous-4:before {\r\n  content: \"\\f0a0\";\r\n}\r\n.wi-moon-waxing-gibbous-5:before {\r\n  content: \"\\f0a1\";\r\n}\r\n.wi-moon-waxing-gibbous-6:before {\r\n  content: \"\\f0a2\";\r\n}\r\n.wi-moon-full:before {\r\n  content: \"\\f0a3\";\r\n}\r\n.wi-moon-waning-gibbous-1:before {\r\n  content: \"\\f0a4\";\r\n}\r\n.wi-moon-waning-gibbous-2:before {\r\n  content: \"\\f0a5\";\r\n}\r\n.wi-moon-waning-gibbous-3:before {\r\n  content: \"\\f0a6\";\r\n}\r\n.wi-moon-waning-gibbous-4:before {\r\n  content: \"\\f0a7\";\r\n}\r\n.wi-moon-waning-gibbous-5:before {\r\n  content: \"\\f0a8\";\r\n}\r\n.wi-moon-waning-gibbous-6:before {\r\n  content: \"\\f0a9\";\r\n}\r\n.wi-moon-third-quarter:before {\r\n  content: \"\\f0aa\";\r\n}\r\n.wi-moon-waning-crescent-1:before {\r\n  content: \"\\f0ab\";\r\n}\r\n.wi-moon-waning-crescent-2:before {\r\n  content: \"\\f0ac\";\r\n}\r\n.wi-moon-waning-crescent-3:before {\r\n  content: \"\\f0ad\";\r\n}\r\n.wi-moon-waning-crescent-4:before {\r\n  content: \"\\f0ae\";\r\n}\r\n.wi-moon-waning-crescent-5:before {\r\n  content: \"\\f0af\";\r\n}\r\n.wi-moon-waning-crescent-6:before {\r\n  content: \"\\f0b0\";\r\n}\r\n.wi-moon-alt-new:before {\r\n  content: \"\\f0eb\";\r\n}\r\n.wi-moon-alt-waxing-cresent-1:before {\r\n  content: \"\\f0d0\";\r\n}\r\n.wi-moon-alt-waxing-cresent-2:before {\r\n  content: \"\\f0d1\";\r\n}\r\n.wi-moon-alt-waxing-cresent-3:before {\r\n  content: \"\\f0d2\";\r\n}\r\n.wi-moon-alt-waxing-cresent-4:before {\r\n  content: \"\\f0d3\";\r\n}\r\n.wi-moon-alt-waxing-cresent-5:before {\r\n  content: \"\\f0d4\";\r\n}\r\n.wi-moon-alt-waxing-cresent-6:before {\r\n  content: \"\\f0d5\";\r\n}\r\n.wi-moon-alt-first-quarter:before {\r\n  content: \"\\f0d6\";\r\n}\r\n.wi-moon-alt-waxing-gibbous-1:before {\r\n  content: \"\\f0d7\";\r\n}\r\n.wi-moon-alt-waxing-gibbous-2:before {\r\n  content: \"\\f0d8\";\r\n}\r\n.wi-moon-alt-waxing-gibbous-3:before {\r\n  content: \"\\f0d9\";\r\n}\r\n.wi-moon-alt-waxing-gibbous-4:before {\r\n  content: \"\\f0da\";\r\n}\r\n.wi-moon-alt-waxing-gibbous-5:before {\r\n  content: \"\\f0db\";\r\n}\r\n.wi-moon-alt-waxing-gibbous-6:before {\r\n  content: \"\\f0dc\";\r\n}\r\n.wi-moon-alt-full:before {\r\n  content: \"\\f0dd\";\r\n}\r\n.wi-moon-alt-waning-gibbous-1:before {\r\n  content: \"\\f0de\";\r\n}\r\n.wi-moon-alt-waning-gibbous-2:before {\r\n  content: \"\\f0df\";\r\n}\r\n.wi-moon-alt-waning-gibbous-3:before {\r\n  content: \"\\f0e0\";\r\n}\r\n.wi-moon-alt-waning-gibbous-4:before {\r\n  content: \"\\f0e1\";\r\n}\r\n.wi-moon-alt-waning-gibbous-5:before {\r\n  content: \"\\f0e2\";\r\n}\r\n.wi-moon-alt-waning-gibbous-6:before {\r\n  content: \"\\f0e3\";\r\n}\r\n.wi-moon-alt-third-quarter:before {\r\n  content: \"\\f0e4\";\r\n}\r\n.wi-moon-alt-waning-crescent-1:before {\r\n  content: \"\\f0e5\";\r\n}\r\n.wi-moon-alt-waning-crescent-2:before {\r\n  content: \"\\f0e6\";\r\n}\r\n.wi-moon-alt-waning-crescent-3:before {\r\n  content: \"\\f0e7\";\r\n}\r\n.wi-moon-alt-waning-crescent-4:before {\r\n  content: \"\\f0e8\";\r\n}\r\n.wi-moon-alt-waning-crescent-5:before {\r\n  content: \"\\f0e9\";\r\n}\r\n.wi-moon-alt-waning-crescent-6:before {\r\n  content: \"\\f0ea\";\r\n}\r\n.wi-moon-0:before {\r\n  content: \"\\f095\";\r\n}\r\n.wi-moon-1:before {\r\n  content: \"\\f096\";\r\n}\r\n.wi-moon-2:before {\r\n  content: \"\\f097\";\r\n}\r\n.wi-moon-3:before {\r\n  content: \"\\f098\";\r\n}\r\n.wi-moon-4:before {\r\n  content: \"\\f099\";\r\n}\r\n.wi-moon-5:before {\r\n  content: \"\\f09a\";\r\n}\r\n.wi-moon-6:before {\r\n  content: \"\\f09b\";\r\n}\r\n.wi-moon-7:before {\r\n  content: \"\\f09c\";\r\n}\r\n.wi-moon-8:before {\r\n  content: \"\\f09d\";\r\n}\r\n.wi-moon-9:before {\r\n  content: \"\\f09e\";\r\n}\r\n.wi-moon-10:before {\r\n  content: \"\\f09f\";\r\n}\r\n.wi-moon-11:before {\r\n  content: \"\\f0a0\";\r\n}\r\n.wi-moon-12:before {\r\n  content: \"\\f0a1\";\r\n}\r\n.wi-moon-13:before {\r\n  content: \"\\f0a2\";\r\n}\r\n.wi-moon-14:before {\r\n  content: \"\\f0a3\";\r\n}\r\n.wi-moon-15:before {\r\n  content: \"\\f0a4\";\r\n}\r\n.wi-moon-16:before {\r\n  content: \"\\f0a5\";\r\n}\r\n.wi-moon-17:before {\r\n  content: \"\\f0a6\";\r\n}\r\n.wi-moon-18:before {\r\n  content: \"\\f0a7\";\r\n}\r\n.wi-moon-19:before {\r\n  content: \"\\f0a8\";\r\n}\r\n.wi-moon-20:before {\r\n  content: \"\\f0a9\";\r\n}\r\n.wi-moon-21:before {\r\n  content: \"\\f0aa\";\r\n}\r\n.wi-moon-22:before {\r\n  content: \"\\f0ab\";\r\n}\r\n.wi-moon-23:before {\r\n  content: \"\\f0ac\";\r\n}\r\n.wi-moon-24:before {\r\n  content: \"\\f0ad\";\r\n}\r\n.wi-moon-25:before {\r\n  content: \"\\f0ae\";\r\n}\r\n.wi-moon-26:before {\r\n  content: \"\\f0af\";\r\n}\r\n.wi-moon-27:before {\r\n  content: \"\\f0b0\";\r\n}\r\n.wi-time-1:before {\r\n  content: \"\\f08a\";\r\n}\r\n.wi-time-2:before {\r\n  content: \"\\f08b\";\r\n}\r\n.wi-time-3:before {\r\n  content: \"\\f08c\";\r\n}\r\n.wi-time-4:before {\r\n  content: \"\\f08d\";\r\n}\r\n.wi-time-5:before {\r\n  content: \"\\f08e\";\r\n}\r\n.wi-time-6:before {\r\n  content: \"\\f08f\";\r\n}\r\n.wi-time-7:before {\r\n  content: \"\\f090\";\r\n}\r\n.wi-time-8:before {\r\n  content: \"\\f091\";\r\n}\r\n.wi-time-9:before {\r\n  content: \"\\f092\";\r\n}\r\n.wi-time-10:before {\r\n  content: \"\\f093\";\r\n}\r\n.wi-time-11:before {\r\n  content: \"\\f094\";\r\n}\r\n.wi-time-12:before {\r\n  content: \"\\f089\";\r\n}\r\n.wi-direction-up:before {\r\n  content: \"\\f058\";\r\n}\r\n.wi-direction-up-right:before {\r\n  content: \"\\f057\";\r\n}\r\n.wi-direction-right:before {\r\n  content: \"\\f04d\";\r\n}\r\n.wi-direction-down-right:before {\r\n  content: \"\\f088\";\r\n}\r\n.wi-direction-down:before {\r\n  content: \"\\f044\";\r\n}\r\n.wi-direction-down-left:before {\r\n  content: \"\\f043\";\r\n}\r\n.wi-direction-left:before {\r\n  content: \"\\f048\";\r\n}\r\n.wi-direction-up-left:before {\r\n  content: \"\\f087\";\r\n}\r\n.wi-wind-beaufort-0:before {\r\n  content: \"\\f0b7\";\r\n}\r\n.wi-wind-beaufort-1:before {\r\n  content: \"\\f0b8\";\r\n}\r\n.wi-wind-beaufort-2:before {\r\n  content: \"\\f0b9\";\r\n}\r\n.wi-wind-beaufort-3:before {\r\n  content: \"\\f0ba\";\r\n}\r\n.wi-wind-beaufort-4:before {\r\n  content: \"\\f0bb\";\r\n}\r\n.wi-wind-beaufort-5:before {\r\n  content: \"\\f0bc\";\r\n}\r\n.wi-wind-beaufort-6:before {\r\n  content: \"\\f0bd\";\r\n}\r\n.wi-wind-beaufort-7:before {\r\n  content: \"\\f0be\";\r\n}\r\n.wi-wind-beaufort-8:before {\r\n  content: \"\\f0bf\";\r\n}\r\n.wi-wind-beaufort-9:before {\r\n  content: \"\\f0c0\";\r\n}\r\n.wi-wind-beaufort-10:before {\r\n  content: \"\\f0c1\";\r\n}\r\n.wi-wind-beaufort-11:before {\r\n  content: \"\\f0c2\";\r\n}\r\n.wi-wind-beaufort-12:before {\r\n  content: \"\\f0c3\";\r\n}\r\n.wi-yahoo-0:before {\r\n  content: \"\\f056\";\r\n}\r\n.wi-yahoo-1:before {\r\n  content: \"\\f00e\";\r\n}\r\n.wi-yahoo-2:before {\r\n  content: \"\\f073\";\r\n}\r\n.wi-yahoo-3:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-yahoo-4:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-yahoo-5:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-yahoo-6:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-yahoo-7:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-yahoo-8:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-yahoo-9:before {\r\n  content: \"\\f01a\";\r\n}\r\n.wi-yahoo-10:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-yahoo-11:before {\r\n  content: \"\\f01a\";\r\n}\r\n.wi-yahoo-12:before {\r\n  content: \"\\f01a\";\r\n}\r\n.wi-yahoo-13:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-yahoo-14:before {\r\n  content: \"\\f00a\";\r\n}\r\n.wi-yahoo-15:before {\r\n  content: \"\\f064\";\r\n}\r\n.wi-yahoo-16:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-yahoo-17:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-yahoo-18:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-yahoo-19:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-yahoo-20:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-yahoo-21:before {\r\n  content: \"\\f021\";\r\n}\r\n.wi-yahoo-22:before {\r\n  content: \"\\f062\";\r\n}\r\n.wi-yahoo-23:before {\r\n  content: \"\\f050\";\r\n}\r\n.wi-yahoo-24:before {\r\n  content: \"\\f050\";\r\n}\r\n.wi-yahoo-25:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-yahoo-26:before {\r\n  content: \"\\f013\";\r\n}\r\n.wi-yahoo-27:before {\r\n  content: \"\\f031\";\r\n}\r\n.wi-yahoo-28:before {\r\n  content: \"\\f002\";\r\n}\r\n.wi-yahoo-29:before {\r\n  content: \"\\f031\";\r\n}\r\n.wi-yahoo-30:before {\r\n  content: \"\\f002\";\r\n}\r\n.wi-yahoo-31:before {\r\n  content: \"\\f02e\";\r\n}\r\n.wi-yahoo-32:before {\r\n  content: \"\\f00d\";\r\n}\r\n.wi-yahoo-33:before {\r\n  content: \"\\f083\";\r\n}\r\n.wi-yahoo-34:before {\r\n  content: \"\\f00c\";\r\n}\r\n.wi-yahoo-35:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-yahoo-36:before {\r\n  content: \"\\f072\";\r\n}\r\n.wi-yahoo-37:before {\r\n  content: \"\\f00e\";\r\n}\r\n.wi-yahoo-38:before {\r\n  content: \"\\f00e\";\r\n}\r\n.wi-yahoo-39:before {\r\n  content: \"\\f00e\";\r\n}\r\n.wi-yahoo-40:before {\r\n  content: \"\\f01a\";\r\n}\r\n.wi-yahoo-41:before {\r\n  content: \"\\f064\";\r\n}\r\n.wi-yahoo-42:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-yahoo-43:before {\r\n  content: \"\\f064\";\r\n}\r\n.wi-yahoo-44:before {\r\n  content: \"\\f00c\";\r\n}\r\n.wi-yahoo-45:before {\r\n  content: \"\\f00e\";\r\n}\r\n.wi-yahoo-46:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-yahoo-47:before {\r\n  content: \"\\f00e\";\r\n}\r\n.wi-yahoo-3200:before {\r\n  content: \"\\f077\";\r\n}\r\n.wi-forecast-io-clear-day:before {\r\n  content: \"\\f00d\";\r\n}\r\n.wi-forecast-io-clear-night:before {\r\n  content: \"\\f02e\";\r\n}\r\n.wi-forecast-io-rain:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-forecast-io-snow:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-forecast-io-sleet:before {\r\n  content: \"\\f0b5\";\r\n}\r\n.wi-forecast-io-wind:before {\r\n  content: \"\\f050\";\r\n}\r\n.wi-forecast-io-fog:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-forecast-io-cloudy:before {\r\n  content: \"\\f013\";\r\n}\r\n.wi-forecast-io-partly-cloudy-day:before {\r\n  content: \"\\f002\";\r\n}\r\n.wi-forecast-io-partly-cloudy-night:before {\r\n  content: \"\\f031\";\r\n}\r\n.wi-forecast-io-hail:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-forecast-io-thunderstorm:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-forecast-io-tornado:before {\r\n  content: \"\\f056\";\r\n}\r\n.wi-wmo4680-0:before,\r\n.wi-wmo4680-00:before {\r\n  content: \"\\f055\";\r\n}\r\n.wi-wmo4680-1:before,\r\n.wi-wmo4680-01:before {\r\n  content: \"\\f013\";\r\n}\r\n.wi-wmo4680-2:before,\r\n.wi-wmo4680-02:before {\r\n  content: \"\\f055\";\r\n}\r\n.wi-wmo4680-3:before,\r\n.wi-wmo4680-03:before {\r\n  content: \"\\f013\";\r\n}\r\n.wi-wmo4680-4:before,\r\n.wi-wmo4680-04:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-5:before,\r\n.wi-wmo4680-05:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-10:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-11:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-12:before {\r\n  content: \"\\f016\";\r\n}\r\n.wi-wmo4680-18:before {\r\n  content: \"\\f050\";\r\n}\r\n.wi-wmo4680-20:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-21:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-wmo4680-22:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-wmo4680-23:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-24:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-wmo4680-25:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-wmo4680-26:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-wmo4680-27:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-wmo4680-28:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-wmo4680-29:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-wmo4680-30:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-31:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-32:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-33:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-34:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-35:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-wmo4680-40:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-wmo4680-41:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-wmo4680-42:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-43:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-wmo4680-44:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-45:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-wmo4680-46:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-wmo4680-47:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-wmo4680-48:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-wmo4680-50:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-wmo4680-51:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-wmo4680-52:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-53:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-54:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-wmo4680-55:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-wmo4680-56:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-wmo4680-57:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-wmo4680-58:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-60:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-wmo4680-61:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-wmo4680-62:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-63:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-64:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-wmo4680-65:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-wmo4680-66:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-wmo4680-67:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-wmo4680-68:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-wmo4680-70:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-wmo4680-71:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-wmo4680-72:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-wmo4680-73:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-wmo4680-74:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-wmo4680-75:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-wmo4680-76:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-wmo4680-77:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-wmo4680-78:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-wmo4680-80:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-81:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-wmo4680-82:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-83:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-wmo4680-84:before {\r\n  content: \"\\f01d\";\r\n}\r\n.wi-wmo4680-85:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-wmo4680-86:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-wmo4680-87:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-wmo4680-89:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-wmo4680-90:before {\r\n  content: \"\\f016\";\r\n}\r\n.wi-wmo4680-91:before {\r\n  content: \"\\f01d\";\r\n}\r\n.wi-wmo4680-92:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-wmo4680-93:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-wmo4680-94:before {\r\n  content: \"\\f016\";\r\n}\r\n.wi-wmo4680-95:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-wmo4680-96:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-wmo4680-99:before {\r\n  content: \"\\f056\";\r\n}\r\n.wi-owm-200:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-owm-201:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-owm-202:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-owm-210:before {\r\n  content: \"\\f016\";\r\n}\r\n.wi-owm-211:before {\r\n  content: \"\\f016\";\r\n}\r\n.wi-owm-212:before {\r\n  content: \"\\f016\";\r\n}\r\n.wi-owm-221:before {\r\n  content: \"\\f016\";\r\n}\r\n.wi-owm-230:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-owm-231:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-owm-232:before {\r\n  content: \"\\f01e\";\r\n}\r\n.wi-owm-300:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-owm-301:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-owm-302:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-owm-310:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-owm-311:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-owm-312:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-owm-313:before {\r\n  content: \"\\f01a\";\r\n}\r\n.wi-owm-314:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-owm-321:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-owm-500:before {\r\n  content: \"\\f01c\";\r\n}\r\n.wi-owm-501:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-owm-502:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-owm-503:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-owm-504:before {\r\n  content: \"\\f019\";\r\n}\r\n.wi-owm-511:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-owm-520:before {\r\n  content: \"\\f01a\";\r\n}\r\n.wi-owm-521:before {\r\n  content: \"\\f01a\";\r\n}\r\n.wi-owm-522:before {\r\n  content: \"\\f01a\";\r\n}\r\n.wi-owm-531:before {\r\n  content: \"\\f01d\";\r\n}\r\n.wi-owm-600:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-owm-601:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-owm-602:before {\r\n  content: \"\\f0b5\";\r\n}\r\n.wi-owm-611:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-owm-612:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-owm-615:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-owm-616:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-owm-620:before {\r\n  content: \"\\f017\";\r\n}\r\n.wi-owm-621:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-owm-622:before {\r\n  content: \"\\f01b\";\r\n}\r\n.wi-owm-701:before {\r\n  content: \"\\f01a\";\r\n}\r\n.wi-owm-711:before {\r\n  content: \"\\f062\";\r\n}\r\n.wi-owm-721:before {\r\n  content: \"\\f0b6\";\r\n}\r\n.wi-owm-731:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-owm-741:before {\r\n  content: \"\\f014\";\r\n}\r\n.wi-owm-761:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-owm-762:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-owm-771:before {\r\n  content: \"\\f011\";\r\n}\r\n.wi-owm-781:before {\r\n  content: \"\\f056\";\r\n}\r\n.wi-owm-800:before {\r\n  content: \"\\f00d\";\r\n}\r\n.wi-owm-801:before {\r\n  content: \"\\f011\";\r\n}\r\n.wi-owm-802:before {\r\n  content: \"\\f011\";\r\n}\r\n.wi-owm-803:before {\r\n  content: \"\\f011\";\r\n}\r\n.wi-owm-803:before {\r\n  content: \"\\f012\";\r\n}\r\n.wi-owm-804:before {\r\n  content: \"\\f013\";\r\n}\r\n.wi-owm-900:before {\r\n  content: \"\\f056\";\r\n}\r\n.wi-owm-901:before {\r\n  content: \"\\f01d\";\r\n}\r\n.wi-owm-902:before {\r\n  content: \"\\f073\";\r\n}\r\n.wi-owm-903:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-owm-904:before {\r\n  content: \"\\f072\";\r\n}\r\n.wi-owm-905:before {\r\n  content: \"\\f021\";\r\n}\r\n.wi-owm-906:before {\r\n  content: \"\\f015\";\r\n}\r\n.wi-owm-957:before {\r\n  content: \"\\f050\";\r\n}\r\n.wi-owm-day-200:before {\r\n  content: \"\\f010\";\r\n}\r\n.wi-owm-day-201:before {\r\n  content: \"\\f010\";\r\n}\r\n.wi-owm-day-202:before {\r\n  content: \"\\f010\";\r\n}\r\n.wi-owm-day-210:before {\r\n  content: \"\\f005\";\r\n}\r\n.wi-owm-day-211:before {\r\n  content: \"\\f005\";\r\n}\r\n.wi-owm-day-212:before {\r\n  content: \"\\f005\";\r\n}\r\n.wi-owm-day-221:before {\r\n  content: \"\\f005\";\r\n}\r\n.wi-owm-day-230:before {\r\n  content: \"\\f010\";\r\n}\r\n.wi-owm-day-231:before {\r\n  content: \"\\f010\";\r\n}\r\n.wi-owm-day-232:before {\r\n  content: \"\\f010\";\r\n}\r\n.wi-owm-day-300:before {\r\n  content: \"\\f00b\";\r\n}\r\n.wi-owm-day-301:before {\r\n  content: \"\\f00b\";\r\n}\r\n.wi-owm-day-302:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-owm-day-310:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-owm-day-311:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-owm-day-312:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-owm-day-313:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-owm-day-314:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-owm-day-321:before {\r\n  content: \"\\f00b\";\r\n}\r\n.wi-owm-day-500:before {\r\n  content: \"\\f00b\";\r\n}\r\n.wi-owm-day-501:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-owm-day-502:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-owm-day-503:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-owm-day-504:before {\r\n  content: \"\\f008\";\r\n}\r\n.wi-owm-day-511:before {\r\n  content: \"\\f006\";\r\n}\r\n.wi-owm-day-520:before {\r\n  content: \"\\f009\";\r\n}\r\n.wi-owm-day-521:before {\r\n  content: \"\\f009\";\r\n}\r\n.wi-owm-day-522:before {\r\n  content: \"\\f009\";\r\n}\r\n.wi-owm-day-531:before {\r\n  content: \"\\f00e\";\r\n}\r\n.wi-owm-day-600:before {\r\n  content: \"\\f00a\";\r\n}\r\n.wi-owm-day-601:before {\r\n  content: \"\\f0b2\";\r\n}\r\n.wi-owm-day-602:before {\r\n  content: \"\\f00a\";\r\n}\r\n.wi-owm-day-611:before {\r\n  content: \"\\f006\";\r\n}\r\n.wi-owm-day-612:before {\r\n  content: \"\\f006\";\r\n}\r\n.wi-owm-day-615:before {\r\n  content: \"\\f006\";\r\n}\r\n.wi-owm-day-616:before {\r\n  content: \"\\f006\";\r\n}\r\n.wi-owm-day-620:before {\r\n  content: \"\\f006\";\r\n}\r\n.wi-owm-day-621:before {\r\n  content: \"\\f00a\";\r\n}\r\n.wi-owm-day-622:before {\r\n  content: \"\\f00a\";\r\n}\r\n.wi-owm-day-701:before {\r\n  content: \"\\f009\";\r\n}\r\n.wi-owm-day-711:before {\r\n  content: \"\\f062\";\r\n}\r\n.wi-owm-day-721:before {\r\n  content: \"\\f0b6\";\r\n}\r\n.wi-owm-day-731:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-owm-day-741:before {\r\n  content: \"\\f003\";\r\n}\r\n.wi-owm-day-761:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-owm-day-762:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-owm-day-781:before {\r\n  content: \"\\f056\";\r\n}\r\n.wi-owm-day-800:before {\r\n  content: \"\\f00d\";\r\n}\r\n.wi-owm-day-801:before {\r\n  content: \"\\f000\";\r\n}\r\n.wi-owm-day-802:before {\r\n  content: \"\\f000\";\r\n}\r\n.wi-owm-day-803:before {\r\n  content: \"\\f000\";\r\n}\r\n.wi-owm-day-804:before {\r\n  content: \"\\f00c\";\r\n}\r\n.wi-owm-day-900:before {\r\n  content: \"\\f056\";\r\n}\r\n.wi-owm-day-902:before {\r\n  content: \"\\f073\";\r\n}\r\n.wi-owm-day-903:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-owm-day-904:before {\r\n  content: \"\\f072\";\r\n}\r\n.wi-owm-day-906:before {\r\n  content: \"\\f004\";\r\n}\r\n.wi-owm-day-957:before {\r\n  content: \"\\f050\";\r\n}\r\n.wi-owm-night-200:before {\r\n  content: \"\\f02d\";\r\n}\r\n.wi-owm-night-201:before {\r\n  content: \"\\f02d\";\r\n}\r\n.wi-owm-night-202:before {\r\n  content: \"\\f02d\";\r\n}\r\n.wi-owm-night-210:before {\r\n  content: \"\\f025\";\r\n}\r\n.wi-owm-night-211:before {\r\n  content: \"\\f025\";\r\n}\r\n.wi-owm-night-212:before {\r\n  content: \"\\f025\";\r\n}\r\n.wi-owm-night-221:before {\r\n  content: \"\\f025\";\r\n}\r\n.wi-owm-night-230:before {\r\n  content: \"\\f02d\";\r\n}\r\n.wi-owm-night-231:before {\r\n  content: \"\\f02d\";\r\n}\r\n.wi-owm-night-232:before {\r\n  content: \"\\f02d\";\r\n}\r\n.wi-owm-night-300:before {\r\n  content: \"\\f02b\";\r\n}\r\n.wi-owm-night-301:before {\r\n  content: \"\\f02b\";\r\n}\r\n.wi-owm-night-302:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-owm-night-310:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-owm-night-311:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-owm-night-312:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-owm-night-313:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-owm-night-314:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-owm-night-321:before {\r\n  content: \"\\f02b\";\r\n}\r\n.wi-owm-night-500:before {\r\n  content: \"\\f02b\";\r\n}\r\n.wi-owm-night-501:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-owm-night-502:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-owm-night-503:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-owm-night-504:before {\r\n  content: \"\\f028\";\r\n}\r\n.wi-owm-night-511:before {\r\n  content: \"\\f026\";\r\n}\r\n.wi-owm-night-520:before {\r\n  content: \"\\f029\";\r\n}\r\n.wi-owm-night-521:before {\r\n  content: \"\\f029\";\r\n}\r\n.wi-owm-night-522:before {\r\n  content: \"\\f029\";\r\n}\r\n.wi-owm-night-531:before {\r\n  content: \"\\f02c\";\r\n}\r\n.wi-owm-night-600:before {\r\n  content: \"\\f02a\";\r\n}\r\n.wi-owm-night-601:before {\r\n  content: \"\\f0b4\";\r\n}\r\n.wi-owm-night-602:before {\r\n  content: \"\\f02a\";\r\n}\r\n.wi-owm-night-611:before {\r\n  content: \"\\f026\";\r\n}\r\n.wi-owm-night-612:before {\r\n  content: \"\\f026\";\r\n}\r\n.wi-owm-night-615:before {\r\n  content: \"\\f026\";\r\n}\r\n.wi-owm-night-616:before {\r\n  content: \"\\f026\";\r\n}\r\n.wi-owm-night-620:before {\r\n  content: \"\\f026\";\r\n}\r\n.wi-owm-night-621:before {\r\n  content: \"\\f02a\";\r\n}\r\n.wi-owm-night-622:before {\r\n  content: \"\\f02a\";\r\n}\r\n.wi-owm-night-701:before {\r\n  content: \"\\f029\";\r\n}\r\n.wi-owm-night-711:before {\r\n  content: \"\\f062\";\r\n}\r\n.wi-owm-night-721:before {\r\n  content: \"\\f0b6\";\r\n}\r\n.wi-owm-night-731:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-owm-night-741:before {\r\n  content: \"\\f04a\";\r\n}\r\n.wi-owm-night-761:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-owm-night-762:before {\r\n  content: \"\\f063\";\r\n}\r\n.wi-owm-night-781:before {\r\n  content: \"\\f056\";\r\n}\r\n.wi-owm-night-800:before {\r\n  content: \"\\f02e\";\r\n}\r\n.wi-owm-night-801:before {\r\n  content: \"\\f022\";\r\n}\r\n.wi-owm-night-802:before {\r\n  content: \"\\f022\";\r\n}\r\n.wi-owm-night-803:before {\r\n  content: \"\\f022\";\r\n}\r\n.wi-owm-night-804:before {\r\n  content: \"\\f086\";\r\n}\r\n.wi-owm-night-900:before {\r\n  content: \"\\f056\";\r\n}\r\n.wi-owm-night-902:before {\r\n  content: \"\\f073\";\r\n}\r\n.wi-owm-night-903:before {\r\n  content: \"\\f076\";\r\n}\r\n.wi-owm-night-904:before {\r\n  content: \"\\f072\";\r\n}\r\n.wi-owm-night-906:before {\r\n  content: \"\\f024\";\r\n}\r\n.wi-owm-night-957:before {\r\n  content: \"\\f050\";\r\n}\r\n"; });
define('text!microservices/auth/login.html', ['module'], function(module) { module.exports = "<template>\r\n  <div>\r\n    <h1>Log In</h1>\r\n    <div class=\"col-sm-4\">\r\n      <form>\r\n        <div class=\"form-group\">\r\n          <label for=\"exampleInputEmail1\">Email address</label>\r\n          <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" placeholder=\"Email\" value.bind=\"userId\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"exampleInputPassword1\">Password</label>\r\n          <input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\" value.bind=\"password\">\r\n        </div>\r\n        <button class=\"btn btn-primary\" click.trigger=\"login()\">Login</button>\r\n        <p style=\"color: red\">${errorMessage}</p>\r\n      </form>\r\n    </div>\r\n  </div>  \r\n</template>"; });
define('text!resources/styles/minton/css/menu.css', ['module'], function(module) { module.exports = "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);\r\n@import url(https://fonts.googleapis.com/css?family=Poppins:500,600);\r\n@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:600,400,700);\r\n/*\r\nTemplate Name: Minton Dashboard\r\nAuthor: CoderThemes\r\nEmail: coderthemes@gmail.com\r\nFile: Menu\r\n*/\r\nbody {\r\n  padding-bottom: 61px;\r\n}\r\n.wrapper {\r\n  margin-top: 145px;\r\n}\r\n.container {\r\n  width: 95%;\r\n}\r\n.page-title {\r\n  margin-bottom: 20px;\r\n  margin-top: 0;\r\n}\r\n#topnav {\r\n  position: fixed;\r\n  right: 0;\r\n  left: 0;\r\n  top: 0;\r\n  z-index: 1030;\r\n  background-color: transparent;\r\n  border: 0;\r\n  transition: all .5s ease;\r\n  min-height: 62px;\r\n}\r\n#topnav .has-submenu.active a {\r\n  color: #3bafda;\r\n}\r\n#topnav .has-submenu.active a i {\r\n  color: #3bafda;\r\n}\r\n#topnav .has-submenu.active .submenu li.active > a {\r\n  color: #3bafda;\r\n}\r\n#topnav .topbar-main {\r\n  background-color: #3bafda;\r\n}\r\n#topnav .topbar-main .logo {\r\n  color: #ffffff !important;\r\n  font-size: 18px;\r\n  font-weight: 700;\r\n  letter-spacing: .05em;\r\n  margin-top: 9px;\r\n  float: left;\r\n}\r\n#topnav .topbar-main .logo h1 {\r\n  margin: 0px auto;\r\n  text-align: center;\r\n}\r\n#topnav .topbar-main .logo i {\r\n  color: #ffffff;\r\n}\r\n#topnav .topbar-main .badge {\r\n  position: absolute;\r\n  top: 12px;\r\n  right: 7px;\r\n}\r\n#topnav .topbar-main .nav > li > a {\r\n  color: #ffffff !important;\r\n  line-height: 60px;\r\n  padding: 0px 15px !important;\r\n  position: relative;\r\n  background: transparent !important;\r\n}\r\n#topnav .topbar-main .nav > li > a i {\r\n  font-size: 16px;\r\n}\r\n#topnav .topbar-main .nav > li > a {\r\n  padding: 0px 15px !important;\r\n}\r\n#topnav .topbar-main .navbar-nav > .open > a {\r\n  background-color: rgba(255, 255, 255, 0.1) !important;\r\n}\r\n#topnav .topbar-main .profile img {\r\n  border: 2px solid #edf0f0;\r\n  height: 36px;\r\n  width: 36px;\r\n}\r\n#topnav .topbar-main .dropdown-menu-lg {\r\n  width: 300px;\r\n}\r\n#topnav .topbar-main .dropdown-menu-lg .list-group {\r\n  margin-bottom: 0px;\r\n}\r\n#topnav .topbar-main .dropdown-menu-lg .list-group-item {\r\n  border: none;\r\n  padding: 10px 20px;\r\n}\r\n#topnav .topbar-main .dropdown-menu-lg .media-heading {\r\n  margin-bottom: 0px;\r\n}\r\n#topnav .topbar-main .dropdown-menu-lg .media-body p {\r\n  color: #828282;\r\n}\r\n#topnav .topbar-main .notification-list {\r\n  max-height: 230px;\r\n}\r\n#topnav .topbar-main .notification-list em {\r\n  width: 34px;\r\n  text-align: center;\r\n}\r\n#topnav .topbar-main .notification-list .media-body {\r\n  display: inherit;\r\n  width: auto;\r\n  overflow: hidden;\r\n  margin-left: 50px;\r\n}\r\n#topnav .topbar-main .notification-list .media-body h5 {\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  display: block;\r\n  width: 100%;\r\n  font-weight: normal;\r\n  overflow: hidden;\r\n}\r\n#topnav .topbar-main .notifi-title {\r\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\r\n  font-size: 15px;\r\n  text-transform: uppercase;\r\n  font-weight: 600;\r\n  padding: 11px 20px 15px;\r\n  font-family: 'Source Sans Pro', sans-serif;\r\n}\r\n#topnav .topbar-main .navbar-nav {\r\n  margin: 0;\r\n}\r\n#topnav .app-search {\r\n  position: relative;\r\n  margin: 14px 20px 14px 10px;\r\n}\r\n#topnav .app-search a {\r\n  position: absolute;\r\n  top: 6px;\r\n  right: 20px;\r\n  color: rgba(255, 255, 255, 0.7);\r\n}\r\n#topnav .app-search .form-control,\r\n#topnav .app-search .form-control:focus {\r\n  border: none;\r\n  font-size: 13px;\r\n  color: #ffffff;\r\n  padding-left: 20px;\r\n  padding-right: 40px;\r\n  background: rgba(255, 255, 255, 0.2);\r\n  box-shadow: none;\r\n  border-radius: 30px;\r\n  height: 34px;\r\n  width: 180px;\r\n}\r\n#topnav .app-search input::-webkit-input-placeholder {\r\n  color: rgba(255, 255, 255, 0.7);\r\n  font-weight: normal;\r\n}\r\n#topnav .app-search input:-moz-placeholder {\r\n  color: rgba(255, 255, 255, 0.7);\r\n}\r\n#topnav .app-search input::-moz-placeholder {\r\n  color: rgba(255, 255, 255, 0.7);\r\n}\r\n#topnav .app-search input:-ms-input-placeholder {\r\n  color: rgba(255, 255, 255, 0.7);\r\n}\r\n#topnav .notifi-title {\r\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\r\n  color: #ffffff;\r\n  font-size: 16px;\r\n  font-weight: 400;\r\n  padding: 5px 0px 10px;\r\n}\r\n#topnav .notification-list em {\r\n  width: 30px;\r\n  text-align: center;\r\n  height: 30px;\r\n  line-height: 28px;\r\n  border-radius: 50%;\r\n  margin-top: 4px;\r\n}\r\n#topnav .notification-list .list-group-item {\r\n  padding: 12px 20px;\r\n}\r\n#topnav .notification-list .media-body {\r\n  display: inherit;\r\n  width: auto;\r\n  overflow: hidden;\r\n  margin-left: 50px;\r\n}\r\n#topnav .notification-list .media-body h5 {\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  display: block;\r\n  width: 100%;\r\n  font-weight: normal;\r\n  overflow: hidden;\r\n}\r\n#topnav .noti-primary {\r\n  color: #3bafda;\r\n  border: 2px solid #3bafda;\r\n}\r\n#topnav .noti-success {\r\n  color: #00b19d;\r\n  border: 2px solid #00b19d;\r\n}\r\n#topnav .noti-info {\r\n  color: #3ddcf7;\r\n  border: 2px solid #3ddcf7;\r\n}\r\n#topnav .noti-warning {\r\n  color: #ffaa00;\r\n  border: 2px solid #ffaa00;\r\n}\r\n#topnav .noti-danger {\r\n  color: #ef5350;\r\n  border: 2px solid #ef5350;\r\n}\r\n#topnav .noti-purple {\r\n  color: #7266ba;\r\n  border: 2px solid #7266ba;\r\n}\r\n#topnav .noti-pink {\r\n  color: #f76397;\r\n  border: 2px solid #f76397;\r\n}\r\n#topnav .noti-inverse {\r\n  color: #4c5667;\r\n  border: 2px solid #4c5667;\r\n}\r\n#topnav .navbar-custom {\r\n  background-color: #323b44;\r\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\r\n}\r\n#topnav .navbar-toggle {\r\n  border: 0;\r\n  position: relative;\r\n  width: 60px;\r\n  height: 60px;\r\n  padding: 0;\r\n  margin: 0;\r\n  cursor: pointer;\r\n}\r\n#topnav .navbar-toggle:hover {\r\n  background-color: transparent;\r\n}\r\n#topnav .navbar-toggle:hover span {\r\n  background-color: #ffffff;\r\n}\r\n#topnav .navbar-toggle:focus {\r\n  background-color: transparent;\r\n}\r\n#topnav .navbar-toggle:focus span {\r\n  background-color: #3bafda;\r\n}\r\n#topnav .navbar-toggle .lines {\r\n  width: 25px;\r\n  display: block;\r\n  position: relative;\r\n  margin: 23px auto 17px auto;\r\n  height: 18px;\r\n}\r\n#topnav .navbar-toggle span {\r\n  height: 2px;\r\n  width: 100%;\r\n  background-color: #ffffff;\r\n  display: block;\r\n  margin-bottom: 5px;\r\n  transition: transform .5s ease;\r\n}\r\n#topnav .navbar-toggle.open span {\r\n  position: absolute;\r\n}\r\n#topnav .navbar-toggle.open span:first-child {\r\n  top: 6px;\r\n  transform: rotate(45deg);\r\n}\r\n#topnav .navbar-toggle.open span:nth-child(2) {\r\n  visibility: hidden;\r\n}\r\n#topnav .navbar-toggle.open span:last-child {\r\n  width: 100%;\r\n  top: 6px;\r\n  transform: rotate(-45deg);\r\n}\r\n#topnav .navigation-menu {\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n#topnav .navigation-menu > li {\r\n  float: left;\r\n  display: block;\r\n  position: relative;\r\n}\r\n#topnav .navigation-menu > li > a {\r\n  display: block;\r\n  color: rgba(255, 255, 255, 0.7);\r\n  font-weight: 500;\r\n  transition: all .3s ease;\r\n  line-height: 20px;\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n#topnav .navigation-menu > li > a:hover {\r\n  color: #3bafda;\r\n}\r\n#topnav .navigation-menu > li > a:hover i {\r\n  color: #3bafda;\r\n}\r\n#topnav .navigation-menu > li > a:focus {\r\n  color: #3bafda;\r\n}\r\n#topnav .navigation-menu > li > a:focus i {\r\n  color: #3bafda;\r\n}\r\n#topnav .navigation-menu > li > a:active {\r\n  color: #3bafda;\r\n}\r\n#topnav .navigation-menu > li > a:active i {\r\n  color: #3bafda;\r\n}\r\n#topnav .navigation-menu > li > a i {\r\n  font-size: 18px;\r\n  margin-right: 5px;\r\n  color: rgba(255, 255, 255, 0.7);\r\n}\r\n#topnav .navigation-menu > li > a:hover,\r\n#topnav .navigation-menu > li > a:focus {\r\n  background-color: transparent;\r\n}\r\n/*\r\n  Responsive Menu\r\n*/\r\n@media (min-width: 101px) {\r\n  #topnav .navigation-menu > li > a {\r\n    padding-top: 22px;\r\n    padding-bottom: 22px;\r\n  }\r\n  #topnav .navigation-menu > li.last-elements .submenu {\r\n    left: auto;\r\n    right: 0;\r\n  }\r\n  #topnav .navigation-menu > li.last-elements .submenu > li.has-submenu .submenu {\r\n    left: auto;\r\n    right: 100%;\r\n    margin-left: 0;\r\n    margin-right: 10px;\r\n  }\r\n  #topnav .navigation-menu > li:first-of-type a {\r\n    padding-left: 0px;\r\n  }\r\n  #topnav .navigation-menu > li:hover a {\r\n    color: #3bafda;\r\n  }\r\n  #topnav .navigation-menu > li:hover a i {\r\n    color: #3bafda;\r\n  }\r\n  #topnav .navigation-menu > li .submenu {\r\n    position: absolute;\r\n    top: 100%;\r\n    left: 0;\r\n    z-index: 1000;\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    padding: 15px 0;\r\n    list-style: none;\r\n    min-width: 200px;\r\n    visibility: hidden;\r\n    opacity: 0;\r\n    margin-top: 10px;\r\n    transition: all .2s ease;\r\n    background-color: #272e35;\r\n    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);\r\n  }\r\n  #topnav .navigation-menu > li .submenu.megamenu {\r\n    white-space: nowrap;\r\n    width: auto;\r\n  }\r\n  #topnav .navigation-menu > li .submenu.megamenu > li {\r\n    overflow: hidden;\r\n    width: 200px;\r\n    display: inline-block;\r\n    vertical-align: top;\r\n  }\r\n  #topnav .navigation-menu > li .submenu > li.has-submenu > a:after {\r\n    content: \"\\e649\";\r\n    font-family: \"themify\";\r\n    position: absolute;\r\n    right: 20px;\r\n    font-size: 9px;\r\n    top: 15px;\r\n  }\r\n  #topnav .navigation-menu > li .submenu > li .submenu {\r\n    left: 100%;\r\n    top: 0;\r\n    margin-left: 10px;\r\n    margin-top: -1px;\r\n  }\r\n  #topnav .navigation-menu > li .submenu li {\r\n    position: relative;\r\n  }\r\n  #topnav .navigation-menu > li .submenu li ul {\r\n    list-style: none;\r\n    padding-left: 0;\r\n    margin: 0;\r\n  }\r\n  #topnav .navigation-menu > li .submenu li a {\r\n    display: block;\r\n    padding: 8px 25px;\r\n    clear: both;\r\n    white-space: nowrap;\r\n    color: rgba(255, 255, 255, 0.6);\r\n  }\r\n  #topnav .navigation-menu > li .submenu li a:hover {\r\n    color: #3bafda;\r\n  }\r\n  #topnav .navigation-menu > li .submenu li span {\r\n    display: block;\r\n    padding: 8px 25px;\r\n    clear: both;\r\n    line-height: 1.42857143;\r\n    white-space: nowrap;\r\n    font-size: 10px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 2px;\r\n    font-weight: 500;\r\n    color: #949ba1;\r\n  }\r\n  #topnav .navbar-toggle {\r\n    display: none;\r\n  }\r\n  #topnav #navigation {\r\n    display: block !important;\r\n  }\r\n}\r\n@media (max-width: 100px) {\r\n  .wrapper {\r\n    margin-top: 80px;\r\n  }\r\n  .container {\r\n    width: auto;\r\n  }\r\n  #topnav .navigation-menu {\r\n    float: none;\r\n    max-height: 400px;\r\n  }\r\n  #topnav .navigation-menu > li {\r\n    float: none;\r\n  }\r\n  #topnav .navigation-menu > li > a {\r\n    color: rgba(255, 255, 255, 0.7);\r\n    padding: 15px;\r\n  }\r\n  #topnav .navigation-menu > li > a i {\r\n    display: inline-block;\r\n    margin-right: 10px;\r\n    margin-bottom: 0px;\r\n  }\r\n  #topnav .navigation-menu > li > a:after {\r\n    position: absolute;\r\n    right: 15px;\r\n  }\r\n  #topnav .navigation-menu > li .submenu {\r\n    display: none;\r\n    list-style: none;\r\n    padding-left: 20px;\r\n    margin: 0;\r\n  }\r\n  #topnav .navigation-menu > li .submenu li a {\r\n    display: block;\r\n    position: relative;\r\n    padding: 7px 20px;\r\n    color: rgba(255, 255, 255, 0.5);\r\n  }\r\n  #topnav .navigation-menu > li .submenu li a:hover {\r\n    color: #3bafda;\r\n  }\r\n  #topnav .navigation-menu > li .submenu li.has-submenu > a:after {\r\n    content: \"\\e64b\";\r\n    font-family: \"themify\";\r\n    position: absolute;\r\n    right: 30px;\r\n  }\r\n  #topnav .navigation-menu > li .submenu.open {\r\n    display: block;\r\n  }\r\n  #topnav .navigation-menu > li .submenu .submenu {\r\n    display: none;\r\n    list-style: none;\r\n  }\r\n  #topnav .navigation-menu > li .submenu .submenu.open {\r\n    display: block;\r\n  }\r\n  #topnav .navigation-menu > li .submenu.megamenu > li > ul {\r\n    list-style: none;\r\n    padding-left: 0;\r\n  }\r\n  #topnav .navigation-menu > li .submenu.megamenu > li > ul > li > span {\r\n    display: block;\r\n    position: relative;\r\n    padding: 15px;\r\n    text-transform: uppercase;\r\n    font-size: 11px;\r\n    letter-spacing: 2px;\r\n    color: #79818a;\r\n  }\r\n  #topnav .navigation-menu > li.has-submenu.open > a {\r\n    color: #3bafda;\r\n  }\r\n  #topnav .navbar-header {\r\n    float: left;\r\n  }\r\n  #navigation {\r\n    position: absolute;\r\n    top: 60px;\r\n    left: 0;\r\n    width: 100%;\r\n    display: none;\r\n    height: auto;\r\n    padding-bottom: 0;\r\n    overflow: auto;\r\n    border-top: 1px solid rgba(255, 255, 255, 0.5);\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.5);\r\n    background-color: #323b44;\r\n  }\r\n  #navigation.open {\r\n    display: block;\r\n    overflow-y: auto;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  #topnav .navigation-menu > li.has-submenu:hover > .submenu {\r\n    visibility: visible;\r\n    opacity: 1;\r\n    margin-top: 0;\r\n  }\r\n  #topnav .navigation-menu > li.has-submenu:hover > .submenu > li.has-submenu:hover > .submenu {\r\n    visibility: visible;\r\n    opacity: 1;\r\n    margin-left: 0;\r\n    margin-right: 0;\r\n  }\r\n  .navbar-toggle {\r\n    display: block;\r\n  }\r\n}\r\n/* Footer */\r\n.footer {\r\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\r\n  bottom: 0px;\r\n  color: #58666e;\r\n  text-align: left !important;\r\n  padding: 20px 0px;\r\n  position: absolute;\r\n  right: 0px;\r\n  left: 0px;\r\n}\r\n"; });
define('text!microservices/picks/emergency-pick.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"col-8-lg\">\r\n        <div class=\"card-box\">\r\n            <h4 class=\"text-dark header-title\" if.bind=\"tournament\">Emergency Pick for ${tournament.Name}</h4>\r\n            <form>\r\n                <div class=\"form-group\">\r\n                    <label for=\"email\">User's Full Name</label>\r\n                    <select id=\"email\" class=\"form-control\" value.bind=\"selectedProfile\">\r\n                <option model.bind=\"null\">Choose a User by Name...</option>\r\n                <option repeat.for=\"profile of profiles\"\r\n                        model.bind=\"profile\">\r\n                    ${profile.LastFirst}\r\n                </option>\r\n            </select>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"golferselect\">Golfer</label>\r\n                    <select id=\"golferselect\" class=\"form-control\" value.bind=\"selectedGolfer\">\r\n                <option model.bind=\"null\">Choose a Golfer...</option>\r\n                <option repeat.for=\"golfer of golfers\"\r\n                        model.bind=\"golfer\">\r\n                    ${golfer.PlayerName}\r\n                </option>\r\n            </select>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-sm-2\">\r\n                        <button class=\"btn btn-primary\" disabled.bind=\"!selectedProfile || !selectedGolfer\" click.trigger=\"submit()\">Make pick</button>\r\n                    </div>\r\n                    <!--<div class=\"col-sm-1\" style=\"margin-right: 20px\">\r\n                        <button class=\"btn btn-default pull-right\" click.trigger=\"loadProfiles()\">Load Users</button>\r\n                    </div>-->\r\n                    <div class=\"col-sm-1\">\r\n                        <button class=\"btn btn-default pull-right\" click.trigger=\"loadGolfers()\">Load Golfers</button>\r\n                    </div>\r\n                </div>\r\n                <p style=\"color: red\">${errorMessage}</p>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!resources/styles/minton/css/pages.css', ['module'], function(module) { module.exports = "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);\r\n@import url(https://fonts.googleapis.com/css?family=Poppins:500,600);\r\n@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:600,400,700);\r\n/* ===========\r\n   Core file List\r\n\r\n   - Timeline\r\n   - Timeline-2\r\n   - Sweet Alerts\r\n   - Notification\r\n   - Nestable list\r\n   - Maps\r\n   - Email\r\n   - Form Advanced\r\n   - Charts\r\n   - Maintenance\r\n   - Countdown\r\n   - Gallery\r\n   - Tree view\r\n   - Pricing\r\n   - FAQ\r\n\r\n =============*/\r\n/* ===========\r\n  Timeline\r\n =============*/\r\n.timeline {\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n  display: table;\r\n  margin-bottom: 50px;\r\n  position: relative;\r\n  table-layout: fixed;\r\n  width: 100%;\r\n}\r\n.timeline .time-show {\r\n  margin-bottom: 30px;\r\n  margin-right: -75px;\r\n  margin-top: 30px;\r\n  position: relative;\r\n}\r\n.timeline .time-show a {\r\n  color: #ffffff;\r\n}\r\n.timeline:before {\r\n  background-color: #98a6ad;\r\n  bottom: 0px;\r\n  content: \"\";\r\n  left: 50%;\r\n  position: absolute;\r\n  top: 30px;\r\n  width: 1px;\r\n  z-index: 0;\r\n}\r\n.timeline .timeline-icon {\r\n  -webkit-border-radius: 50%;\r\n  background: #98a6ad;\r\n  border-radius: 50%;\r\n  border: 1px solid #98a6ad;\r\n  color: #ffffff;\r\n  display: block;\r\n  height: 20px;\r\n  left: -54px;\r\n  margin-top: -10px;\r\n  position: absolute;\r\n  text-align: center;\r\n  top: 50%;\r\n  width: 20px;\r\n}\r\n.timeline .timeline-icon i {\r\n  margin-top: 9px;\r\n}\r\n.timeline .time-icon:before {\r\n  font-size: 16px;\r\n  margin-top: 5px;\r\n}\r\nh3.timeline-title {\r\n  color: #c8ccd7;\r\n  font-size: 20px;\r\n  font-weight: 400;\r\n  margin: 0 0 5px;\r\n  text-transform: uppercase;\r\n}\r\n.timeline-item {\r\n  display: table-row;\r\n}\r\n.timeline-item:before {\r\n  content: \"\";\r\n  display: block;\r\n  width: 50%;\r\n}\r\n.timeline-item .timeline-desk .arrow {\r\n  border-bottom: 8px solid transparent;\r\n  border-right: 8px solid #272e35 !important;\r\n  border-top: 8px solid transparent;\r\n  display: block;\r\n  height: 0;\r\n  left: -7px;\r\n  margin-top: -10px;\r\n  position: absolute;\r\n  top: 50%;\r\n  width: 0;\r\n}\r\n.timeline-item.alt:after {\r\n  content: \"\";\r\n  display: block;\r\n  width: 50%;\r\n}\r\n.timeline-item.alt .timeline-desk .arrow-alt {\r\n  border-bottom: 8px solid transparent;\r\n  border-left: 8px solid #272e35 !important;\r\n  border-top: 8px solid transparent;\r\n  display: block;\r\n  height: 0;\r\n  left: auto;\r\n  margin-top: -10px;\r\n  position: absolute;\r\n  right: -7px;\r\n  top: 50%;\r\n  width: 0;\r\n}\r\n.timeline-item.alt .timeline-desk .album {\r\n  float: right;\r\n  margin-top: 20px;\r\n}\r\n.timeline-item.alt .timeline-desk .album a {\r\n  float: right;\r\n  margin-left: 5px;\r\n}\r\n.timeline-item.alt .timeline-icon {\r\n  left: auto;\r\n  right: -56px;\r\n}\r\n.timeline-item.alt:before {\r\n  display: none;\r\n}\r\n.timeline-item.alt .panel {\r\n  margin-left: 0;\r\n  margin-right: 45px;\r\n}\r\n.timeline-item.alt .panel .panel-body p + p {\r\n  margin-top: 10px !important;\r\n}\r\n.timeline-item.alt h4 {\r\n  text-align: right;\r\n}\r\n.timeline-item.alt p {\r\n  text-align: right;\r\n}\r\n.timeline-item.alt .timeline-date {\r\n  text-align: right;\r\n}\r\n.timeline-desk {\r\n  display: table-cell;\r\n  vertical-align: top;\r\n  width: 50%;\r\n}\r\n.timeline-desk h4 {\r\n  font-size: 16px;\r\n  font-weight: 300;\r\n  margin: 0;\r\n}\r\n.timeline-desk .panel {\r\n  background: #272e35;\r\n  display: block;\r\n  margin-bottom: 5px;\r\n  margin-left: 45px;\r\n  position: relative;\r\n  text-align: left;\r\n}\r\n.timeline-desk h5 span {\r\n  color: #797979;\r\n  display: block;\r\n  font-size: 12px;\r\n  margin-bottom: 4px;\r\n}\r\n.timeline-desk p {\r\n  color: #98a6ad;\r\n  font-size: 14px;\r\n  margin-bottom: 0;\r\n}\r\n.timeline-desk .album {\r\n  margin-top: 12px;\r\n}\r\n.timeline-desk .album a {\r\n  float: left;\r\n  margin-right: 5px;\r\n}\r\n.timeline-desk .album img {\r\n  height: 36px;\r\n  width: auto;\r\n  border-radius: 3px;\r\n  -moz-border-radius: 3px;\r\n  background-clip: padding-box;\r\n}\r\n.timeline-desk .notification {\r\n  background: none repeat scroll 0 0 #ffffff;\r\n  margin-top: 20px;\r\n  padding: 8px;\r\n}\r\n/* ===========\r\n   Timeline-2\r\n =============*/\r\n.timeline-2 {\r\n  border-left: 2px solid #3bafda;\r\n  position: relative;\r\n}\r\n.timeline-2 .time-item:after {\r\n  background-color: #ffffff;\r\n  border-color: #3bafda;\r\n  border-radius: 10px;\r\n  border-style: solid;\r\n  border-width: 2px;\r\n  bottom: 0;\r\n  content: '';\r\n  height: 10px;\r\n  left: 0;\r\n  margin-left: -6px;\r\n  position: absolute;\r\n  top: 5px;\r\n  width: 10px;\r\n}\r\n.time-item {\r\n  border-color: #dee5e7;\r\n  padding-bottom: 10px;\r\n  position: relative;\r\n}\r\n.time-item:before {\r\n  content: \" \";\r\n  display: table;\r\n}\r\n.time-item:after {\r\n  background-color: #ffffff;\r\n  border-color: #3bafda;\r\n  border-radius: 10px;\r\n  border-style: solid;\r\n  border-width: 2px;\r\n  bottom: 0;\r\n  content: '';\r\n  height: 14px;\r\n  left: 0;\r\n  margin-left: -8px;\r\n  position: absolute;\r\n  top: 5px;\r\n  width: 14px;\r\n}\r\n.time-item-item:after {\r\n  content: \" \";\r\n  display: table;\r\n}\r\n.item-info {\r\n  margin-bottom: 15px;\r\n  margin-left: 15px;\r\n}\r\n.item-info p {\r\n  font-size: 13px;\r\n}\r\n/* ===========\r\n  Sweet Alert\r\n =============*/\r\n.sweet-alert h2 {\r\n  font-size: 22px;\r\n  color: #323b44;\r\n}\r\n.sweet-alert p {\r\n  font-size: 14px;\r\n  line-height: 22px;\r\n}\r\n.sweet-alert .icon.success .placeholder {\r\n  border: 4px solid rgba(0, 177, 157, 0.3);\r\n}\r\n.sweet-alert .icon.success .line {\r\n  background-color: #00b19d;\r\n}\r\n.sweet-alert .icon.warning {\r\n  border-color: #ffaa00;\r\n}\r\n.sweet-alert .icon.info {\r\n  border-color: #3ddcf7;\r\n}\r\n.sweet-alert .btn-warning:focus,\r\n.sweet-alert .btn-info:focus,\r\n.sweet-alert .btn-success:focus,\r\n.sweet-alert .btn-danger:focus,\r\n.sweet-alert .btn-default:focus {\r\n  box-shadow: none;\r\n}\r\n/* =============\r\n   Notification\r\n============= */\r\n.notifyjs-metro-base {\r\n  position: relative;\r\n  min-height: 52px;\r\n  min-width: 250px;\r\n  color: #444;\r\n  border-radius: 3px;\r\n  -webkit-border-radius: 3px;\r\n  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);\r\n  animation: dropdownOpen 0.3s ease-out;\r\n}\r\n.notifyjs-metro-base .image {\r\n  display: table;\r\n  position: absolute;\r\n  height: auto;\r\n  width: auto;\r\n  left: 25px;\r\n  top: 50%;\r\n  font-size: 24px;\r\n  transform: translate(-50%, -50%);\r\n}\r\n.notifyjs-metro-base .text-wrapper {\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  text-align: left;\r\n  margin: 10px 10px 10px 52px;\r\n  clear: both;\r\n}\r\n.notifyjs-metro-base .title {\r\n  font-size: 15px;\r\n  line-height: 20px;\r\n  margin-bottom: 5px;\r\n  font-weight: bold;\r\n}\r\n.notifyjs-metro-base .text {\r\n  font-size: 12px;\r\n  font-weight: normal;\r\n  max-width: 360px;\r\n  vertical-align: middle;\r\n}\r\n.notifyjs-metro-cool {\r\n  color: #fafafa !important;\r\n  background-color: #4A525F;\r\n  border: 1px solid #4A525F;\r\n}\r\n/* =============\r\n   Nestable\r\n============= */\r\n.custom-dd .dd-list .dd-item .dd-handle {\r\n  background: rgba(152, 166, 173, 0.25) !important;\r\n  border: none;\r\n  padding: 8px 16px;\r\n  height: auto;\r\n  font-weight: 600;\r\n  color: #98a6ad;\r\n  border-radius: 3px;\r\n  -moz-border-radius: 3px;\r\n  background-clip: padding-box;\r\n}\r\n.custom-dd .dd-list .dd-item .dd-handle:hover {\r\n  color: #3bafda;\r\n}\r\n.custom-dd .dd-list .dd-item button {\r\n  height: auto;\r\n  font-size: 17px;\r\n  margin: 8px auto;\r\n  color: #98a6ad;\r\n  width: 30px;\r\n}\r\n.custom-dd-empty .dd-list .dd3-handle {\r\n  border: none;\r\n  background: rgba(152, 166, 173, 0.25) !important;\r\n  height: 36px;\r\n  width: 36px;\r\n  color: #98a6ad;\r\n}\r\n.custom-dd-empty .dd-list .dd3-handle:before {\r\n  top: 7px;\r\n}\r\n.custom-dd-empty .dd-list .dd3-handle:hover {\r\n  color: #3bafda;\r\n}\r\n.custom-dd-empty .dd-list .dd3-content {\r\n  height: auto;\r\n  border: none;\r\n  color: #98a6ad;\r\n  padding: 8px 16px 8px 46px;\r\n  background: rgba(152, 166, 173, 0.25) !important;\r\n  font-weight: 600;\r\n}\r\n.custom-dd-empty .dd-list .dd3-content:hover {\r\n  color: #3bafda;\r\n}\r\n.custom-dd-empty .dd-list button {\r\n  width: 26px;\r\n  height: 26px;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n}\r\n/* ===========\r\n  Maps\r\n =============*/\r\n.gmaps,\r\n.gmaps-panaroma {\r\n  height: 300px;\r\n  background: #eeeeee;\r\n  border-radius: 3px;\r\n}\r\n.gmaps-overlay {\r\n  display: block;\r\n  text-align: center;\r\n  color: #ffffff;\r\n  font-size: 16px;\r\n  line-height: 40px;\r\n  background: #3bafda;\r\n  border-radius: 4px;\r\n  padding: 10px 20px;\r\n}\r\n.gmaps-overlay_arrow {\r\n  left: 50%;\r\n  margin-left: -16px;\r\n  width: 0;\r\n  height: 0;\r\n  position: absolute;\r\n}\r\n.gmaps-overlay_arrow.above {\r\n  bottom: -15px;\r\n  border-left: 16px solid transparent;\r\n  border-right: 16px solid transparent;\r\n  border-top: 16px solid #3bafda;\r\n}\r\n.gmaps-overlay_arrow.below {\r\n  top: -15px;\r\n  border-left: 16px solid transparent;\r\n  border-right: 16px solid transparent;\r\n  border-bottom: 16px solid #3bafda;\r\n}\r\n/* =============\r\n   Email\r\n============= */\r\n.mails a {\r\n  color: #98a6ad;\r\n}\r\n.mails td {\r\n  vertical-align: middle !important;\r\n  position: relative;\r\n}\r\n.mails td:last-of-type {\r\n  width: 100px;\r\n  padding-right: 20px;\r\n}\r\n.mails tr:hover .text-white {\r\n  display: none;\r\n}\r\n.mails .mail-select {\r\n  padding: 12px 20px;\r\n  min-width: 134px;\r\n}\r\n.mails .checkbox {\r\n  margin-bottom: 0px;\r\n  margin-top: 0px;\r\n  vertical-align: middle;\r\n  display: inline-block;\r\n  height: 17px;\r\n}\r\n.mails .checkbox label {\r\n  min-height: 16px;\r\n}\r\n.mail-list .list-group-item {\r\n  background-color: transparent !important;\r\n}\r\n.mail-list .list-group-item:hover {\r\n  background-color: #eeeeee;\r\n}\r\n.mail-list .list-group-item:focus {\r\n  background-color: #eeeeee;\r\n}\r\n.mail-list .list-group-item.active {\r\n  background-color: #3bafda !important;\r\n  color: #4c5667;\r\n  font-weight: 600;\r\n  border-radius: 3px;\r\n  -moz-border-radius: 3px;\r\n  background-clip: padding-box;\r\n}\r\n.unread a {\r\n  font-weight: 600;\r\n  color: rgba(238, 238, 238, 0.7);\r\n}\r\n/* =============\r\n   Form Advanced\r\n============= */\r\n.bootstrap-tagsinput {\r\n  box-shadow: none;\r\n  background-color: transparent;\r\n  padding: 3px 7px 6px;\r\n  border: 2px solid rgba(238, 238, 238, 0.3);\r\n}\r\n.bootstrap-tagsinput .label-info {\r\n  background-color: #3bafda !important;\r\n  display: inline-block;\r\n  padding: 5px;\r\n}\r\n/* Multiple */\r\n.ms-container {\r\n  background: transparent url('../images/multiple-arrow.png') no-repeat 50% 50%;\r\n}\r\n.ms-container .ms-list {\r\n  box-shadow: none;\r\n  border: 2px solid rgba(255, 255, 255, 0.2);\r\n}\r\n.ms-container .ms-list.ms-focus {\r\n  box-shadow: none;\r\n  border: 2px solid rgba(255, 255, 255, 0.3);\r\n}\r\n.ms-container .ms-selectable li.ms-elem-selectable {\r\n  border: none;\r\n  padding: 5px 10px;\r\n}\r\n.ms-container .ms-selection li.ms-elem-selection {\r\n  border: none;\r\n  padding: 5px 10px;\r\n}\r\n.ms-selectable {\r\n  box-shadow: none;\r\n  outline: none !important;\r\n}\r\n.ms-container .ms-list.ms-focus {\r\n  box-shadow: none;\r\n}\r\n.ms-container .ms-selectable li.ms-hover {\r\n  background-color: #3bafda;\r\n  color: #ffffff !important;\r\n}\r\n.ms-container .ms-selection li.ms-hover {\r\n  background-color: #3bafda;\r\n  color: #ffffff !important;\r\n}\r\n.ms-container .ms-selectable,\r\n.ms-container .ms-selection {\r\n  background-color: transparent;\r\n}\r\n.ms-container .ms-selectable li.ms-elem-selectable,\r\n.ms-container .ms-selection li.ms-elem-selection {\r\n  color: #98a6ad;\r\n}\r\n/* Select2 */\r\n.select2-container .select2-choice {\r\n  background-image: none !important;\r\n  border: none !important;\r\n  height: auto  !important;\r\n  padding: 0px !important;\r\n  line-height: 22px !important;\r\n  background-color: transparent !important;\r\n  box-shadow: none !important;\r\n  color: #ffffff;\r\n}\r\n.select2-container .select2-choice .select2-arrow {\r\n  background-image: none !important;\r\n  background: transparent;\r\n  border: none;\r\n  width: 14px;\r\n  top: -2px;\r\n}\r\n.select2-container .select2-container-multi.form-control {\r\n  height: auto;\r\n}\r\n.select2-results .select2-highlighted {\r\n  color: #ffffff;\r\n  background-color: #3bafda;\r\n}\r\n.select2-drop-active {\r\n  border: 1px solid #e3e3e3 !important;\r\n  padding-top: 5px;\r\n  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);\r\n  -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);\r\n}\r\n.select2-search input {\r\n  border: 1px solid #e3e3e3;\r\n}\r\n.select2-container-multi {\r\n  width: 100%;\r\n}\r\n.select2-container-multi .select2-choices {\r\n  border: 2px solid rgba(255, 255, 255, 0.2) !important;\r\n  box-shadow: none !important;\r\n  background: transparent !important;\r\n  background-image: none  !important;\r\n  border-radius: 4px !important;\r\n  -moz-border-radius: 4px !important;\r\n  background-clip: padding-box !important;\r\n  min-height: 38px;\r\n}\r\n.select2-container-multi .select2-choices .select2-search-choice {\r\n  padding: 6px 8px 7px 19px;\r\n  margin: 5px 0 3px 5px;\r\n  color: #ffffff;\r\n  background: rgba(255, 255, 255, 0.2);\r\n  border: none;\r\n  box-shadow: none;\r\n}\r\n.select2-container-multi .select2-choices .select2-search-field input {\r\n  padding: 7px 7px 7px 10px;\r\n  font-family: inherit;\r\n}\r\n.select2-container-multi .select2-choices .select2-search-choice-close {\r\n  top: 6px;\r\n}\r\n/* Wysiwig */\r\n.mce-tinymce {\r\n  background-color: transparent !important;\r\n}\r\n.mce-content-body p {\r\n  color: #9398a0;\r\n  font-size: 14px;\r\n  font-weight: 300;\r\n}\r\n.mce-popover .mce-arrow:after {\r\n  border-bottom-color: red;\r\n}\r\n.mce-popover .mce-colorbutton-grid {\r\n  margin: 0px;\r\n  border: 1px solid #d7dce5 !important;\r\n  padding: 4px;\r\n}\r\n.mce-reset .mce-window-head {\r\n  border-bottom: 1px solid #d7dce5;\r\n}\r\n.mce-reset .mce-window-head .mce-title {\r\n  color: #707780;\r\n  font-size: 16px;\r\n  font-weight: 400;\r\n}\r\n.mce-reset .mce-textbox {\r\n  border-radius: 0px;\r\n  box-shadow: none;\r\n  outline: 0;\r\n  border-color: #d7dce5;\r\n  height: 30px;\r\n  font-weight: 300;\r\n  line-height: 30px;\r\n  color: #aaaaaa;\r\n  font-size: 14px;\r\n}\r\n.mce-reset .mce-textbox:focus {\r\n  box-shadow: none;\r\n  border-color: #3bafda;\r\n}\r\n.mce-reset .mce-checkbox .mce-ico {\r\n  background-image: none;\r\n  background-color: #ffffff;\r\n  border-radius: 0px;\r\n  border: 1px solid #d7dce5;\r\n}\r\n.mce-reset .mce-checkbox .mce-label {\r\n  color: #707780;\r\n  font-size: 12px;\r\n  font-weight: 400;\r\n}\r\n.mce-container {\r\n  border-radius: 0px !important;\r\n  border-width: 0px !important;\r\n}\r\n.mce-container .mce-menubar {\r\n  background-color: rgba(255, 255, 255, 0.2) !important;\r\n  border: none !important;\r\n  padding: 2px;\r\n}\r\n.mce-container .mce-menubar .mce-btn button span {\r\n  color: #707780;\r\n  font-size: 14px;\r\n  font-weight: 400;\r\n  text-transform: capitalize;\r\n}\r\n.mce-container .mce-menubar .mce-btn button .mce-caret {\r\n  border-top-color: #ffffff;\r\n}\r\n.mce-caret {\r\n  border-top: 4px solid #ffffff !important;\r\n}\r\n.mce-menubar .mce-menubtn:hover,\r\n.mce-menubar .mce-menubtn.mce-active,\r\n.mce-menubar .mce-menubtn:focus {\r\n  background-color: transparent !important;\r\n}\r\n.mce-container .mce-menubar .mce-btn button:hover {\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n}\r\n.mce-container .mce-menubar .mce-btn.mce-active button {\r\n  background-color: #e8ebf1;\r\n}\r\n.mce-container .mce-btn {\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n  background-image: none;\r\n  outline: 0;\r\n  border: 0px;\r\n  border-radius: 0px;\r\n}\r\n.mce-container .mce-btn button {\r\n  color: #ffffff !important;\r\n  font-size: 14px;\r\n  font-weight: 400;\r\n  text-shadow: none;\r\n  padding: 5px 10px;\r\n}\r\n.mce-container .mce-primary {\r\n  background-color: #3bafda;\r\n  background-image: none;\r\n  outline: 0;\r\n  border: 0px;\r\n  border-radius: 0px;\r\n}\r\n.mce-container .mce-primary button {\r\n  color: #ffffff;\r\n  font-size: 14px;\r\n  font-weight: 400;\r\n  text-shadow: none;\r\n}\r\n.mce-container .mce-primary:hover {\r\n  background-color: #0c7cd5;\r\n  background-image: none;\r\n}\r\n.mce-container .mce-toolbar-grp {\r\n  background-color: rgba(255, 255, 255, 0.2) !important;\r\n  border: none !important;\r\n  border-top-width: 0px !important;\r\n  padding: 6px;\r\n}\r\n.mce-container .mce-btn-group .mce-btn:hover,\r\n.mce-container .mce-btn-group .mce-btn:focus {\r\n  background-color: rgba(255, 255, 255, 0.2) !important;\r\n  color: #323b44;\r\n}\r\n.mce-stack-layout-item body {\r\n  background-color: transparent !important;\r\n}\r\ndiv.mce-edit-area {\r\n  background: transparent !important;\r\n}\r\n.mce-btn.mce-active button,\r\n.mce-btn.mce-active:hover button {\r\n  color: #323b44 !important;\r\n}\r\n.mce-container .mce-statusbar {\r\n  background-color: rgba(255, 255, 255, 0.2) !important;\r\n  border: none !important;\r\n}\r\n.mce-container .mce-statusbar .mce-path .mce-path-item {\r\n  color: #ffffff;\r\n  font-size: 14px;\r\n  font-weight: 400;\r\n}\r\n.mce-container .mce-widget {\r\n  color: #ffffff;\r\n  font-size: 14px;\r\n  font-weight: 400;\r\n  border-left: 1px solid transparent;\r\n}\r\n.mce-container .mce-btn-group {\r\n  border: none;\r\n}\r\n.mce-container .mce-btn-group .mce-btn {\r\n  box-shadow: none;\r\n  background-image: none;\r\n  border-width: 0px;\r\n  border-radius: 0px !important;\r\n}\r\n.mce-container .mce-btn-group .mce-btn:hover,\r\n.mce-container .mce-btn-group .mce-btn:focus {\r\n  box-shadow: none;\r\n  background-image: none;\r\n  background-color: #ffffff;\r\n}\r\n.mce-container .mce-btn-group .mce-btn button span {\r\n  color: #707780;\r\n  font-size: 14px;\r\n  font-weight: 300;\r\n}\r\n.mce-container .mce-btn-group .mce-btn button .mce-caret {\r\n  color: #ffffff;\r\n  font-size: 14px;\r\n}\r\n.mce-container .mce-ico {\r\n  color: #ffffff;\r\n  font-size: 14px;\r\n}\r\n.mce-container .mce-panel {\r\n  background-image: none;\r\n}\r\n.mce-container.mce-menu {\r\n  border: 1px solid #d7dce5 !important;\r\n}\r\n.mce-container.mce-menu .mce-menu-item {\r\n  background-image: none;\r\n}\r\n.mce-container.mce-menu .mce-menu-item .mce-ico {\r\n  color: #3bafda;\r\n  font-size: 14px;\r\n}\r\n.mce-container.mce-menu .mce-menu-item .mce-text {\r\n  color: #707780 !important;\r\n  font-size: 14px;\r\n  font-weight: 400;\r\n  text-transform: capitalize;\r\n}\r\n.mce-container.mce-menu .mce-menu-item .mce-menu-shortcut {\r\n  color: #aaaaaa;\r\n  font-size: 12px;\r\n  font-weight: 300;\r\n  text-transform: capitalize;\r\n}\r\n.mce-container.mce-menu .mce-menu-item:hover,\r\n.mce-container.mce-menu .mce-menu-item:focus,\r\n.mce-container.mce-menu .mce-menu-item.mce-selected {\r\n  background-color: #3bafda;\r\n}\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled .mce-ico,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled .mce-text,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled .mce-menu-shortcut {\r\n  color: #aaaaaa;\r\n}\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled:hover,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled:focus,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled.mce-selected {\r\n  background-color: #d7dce5;\r\n}\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled:hover .mce-ico,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled:focus .mce-ico,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled.mce-selected .mce-ico,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled:hover .mce-text,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled:focus .mce-text,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled.mce-selected .mce-text,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled:hover .mce-menu-shortcut,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled:focus .mce-menu-shortcut,\r\n.mce-container.mce-menu .mce-menu-item.mce-disabled.mce-selected .mce-menu-shortcut {\r\n  color: #ffffff;\r\n}\r\n.mce-container.mce-menu .mce-menu-item-sep {\r\n  background-color: #d7dce5;\r\n}\r\n.mce-container.mce-menu .mce-menu-item-sep:hover {\r\n  background-color: #d7dce5;\r\n}\r\n.mce-menubtn button {\r\n  color: #323b44 !important;\r\n}\r\n.mce-menu-item-normal.mce-active {\r\n  background-color: #3bafda !important;\r\n}\r\n.mce-menu-item-normal.mce-active .mce-text {\r\n  color: #ffffff !important;\r\n}\r\n/* Time picker */\r\n.bootstrap-timepicker-widget table td input {\r\n  border: none;\r\n  font-size: 16px;\r\n  font-weight: 500;\r\n  background-color: transparent;\r\n}\r\n.bootstrap-timepicker-widget table td a {\r\n  color: rgba(238, 238, 238, 0.2);\r\n}\r\n/* =============\r\n   Charts\r\n============= */\r\n.morris-hover.morris-default-style {\r\n  border-radius: 5px;\r\n  padding: 10px 12px;\r\n  background-color: #f5f5f5;\r\n  border: none;\r\n  color: #323b44 !important;\r\n}\r\n.morris-hover.morris-default-style .morris-hover-point {\r\n  color: #323b44 !important;\r\n}\r\n.chart-detail-list li {\r\n  margin: 0px 10px;\r\n}\r\n.chart-detail-list li h5 {\r\n  font-size: 15px;\r\n}\r\n.pieLabel div {\r\n  font-size: 14px !important;\r\n}\r\n.jqstooltip {\r\n  box-sizing: content-box;\r\n}\r\n.chart {\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 110px;\r\n  height: 110px;\r\n  margin-top: 20px;\r\n  margin-bottom: 20px;\r\n  text-align: center;\r\n}\r\n.chart canvas {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n.chart.chart-widget-pie {\r\n  margin-top: 5px;\r\n  margin-bottom: 5px;\r\n}\r\n.percent {\r\n  display: inline-block;\r\n  line-height: 110px;\r\n  z-index: 2;\r\n  font-weight: 600;\r\n  font-size: 18px;\r\n  color: #797979;\r\n}\r\n.percent:after {\r\n  content: '%';\r\n  margin-left: 0.1em;\r\n  font-size: .8em;\r\n}\r\n/* Flot chart */\r\n#flotTip {\r\n  padding: 8px 12px;\r\n  background-color: #f5f5f5;\r\n  border: 1px solid rgba(50, 59, 68, 0.1);\r\n  z-index: 100;\r\n  color: #323b44;\r\n  font-weight: 500;\r\n  opacity: 0.9;\r\n  font-size: 13px;\r\n  border-radius: 3px;\r\n}\r\n.legend tr {\r\n  height: 20px;\r\n}\r\n.legendLabel {\r\n  padding-left: 5px !important;\r\n  line-height: 10px;\r\n  padding-right: 10px;\r\n}\r\n.legend div:first-of-type {\r\n  background-color: transparent !important;\r\n}\r\n.flot-tick-label {\r\n  color: #ffffff !important;\r\n}\r\n/* Chartist chart */\r\n.ct-golden-section:before {\r\n  float: none;\r\n}\r\n.ct-grid {\r\n  stroke: rgba(255, 255, 255, 0.1);\r\n}\r\n.ct-chart {\r\n  max-height: 300px;\r\n}\r\n.ct-chart .ct-label {\r\n  fill: #a3afb7;\r\n  color: #a3afb7;\r\n  font-size: 12px;\r\n  line-height: 1;\r\n}\r\n.ct-chart.simple-pie-chart-chartist .ct-label {\r\n  color: #ffffff;\r\n  fill: #ffffff;\r\n  font-size: 16px;\r\n}\r\n.ct-chart .ct-series.ct-series-a .ct-bar,\r\n.ct-chart .ct-series.ct-series-a .ct-line,\r\n.ct-chart .ct-series.ct-series-a .ct-point,\r\n.ct-chart .ct-series.ct-series-a .ct-slice-donut {\r\n  stroke: #3bafda;\r\n}\r\n.ct-chart .ct-series.ct-series-b .ct-bar,\r\n.ct-chart .ct-series.ct-series-b .ct-line,\r\n.ct-chart .ct-series.ct-series-b .ct-point,\r\n.ct-chart .ct-series.ct-series-b .ct-slice-donut {\r\n  stroke: #f76397;\r\n}\r\n.ct-chart .ct-series.ct-series-c .ct-bar,\r\n.ct-chart .ct-series.ct-series-c .ct-line,\r\n.ct-chart .ct-series.ct-series-c .ct-point,\r\n.ct-chart .ct-series.ct-series-c .ct-slice-donut {\r\n  stroke: #00b19d;\r\n}\r\n.ct-chart .ct-series.ct-series-d .ct-bar,\r\n.ct-chart .ct-series.ct-series-d .ct-line,\r\n.ct-chart .ct-series.ct-series-d .ct-point,\r\n.ct-chart .ct-series.ct-series-d .ct-slice-donut {\r\n  stroke: #3ddcf7;\r\n}\r\n.ct-chart .ct-series.ct-series-e .ct-bar,\r\n.ct-chart .ct-series.ct-series-e .ct-line,\r\n.ct-chart .ct-series.ct-series-e .ct-point,\r\n.ct-chart .ct-series.ct-series-e .ct-slice-donut {\r\n  stroke: #797979;\r\n}\r\n.ct-chart .ct-series.ct-series-f .ct-bar,\r\n.ct-chart .ct-series.ct-series-f .ct-line,\r\n.ct-chart .ct-series.ct-series-f .ct-point,\r\n.ct-chart .ct-series.ct-series-f .ct-slice-donut {\r\n  stroke: #7266ba;\r\n}\r\n.ct-chart .ct-series.ct-series-g .ct-bar,\r\n.ct-chart .ct-series.ct-series-g .ct-line,\r\n.ct-chart .ct-series.ct-series-g .ct-point,\r\n.ct-chart .ct-series.ct-series-g .ct-slice-donut {\r\n  stroke: #ffaa00;\r\n}\r\n.ct-series-a .ct-area,\r\n.ct-series-a .ct-slice-pie {\r\n  fill: #3bafda;\r\n}\r\n.ct-series-b .ct-area,\r\n.ct-series-b .ct-slice-pie {\r\n  fill: #f76397;\r\n}\r\n.ct-series-c .ct-area,\r\n.ct-series-c .ct-slice-pie {\r\n  fill: #00b19d;\r\n}\r\n.ct-series-d .ct-area,\r\n.ct-series-d .ct-slice-pie {\r\n  fill: #3ddcf7;\r\n}\r\n/* Sparkline chart */\r\n.jqstooltip {\r\n  background-color: #36404a !important;\r\n  padding: 5px 10px !important;\r\n  border-radius: 3px;\r\n  -moz-border-radius: 3px;\r\n  background-clip: padding-box;\r\n  border-color: #36404a !important;\r\n}\r\n.jqsfield {\r\n  font-size: 12px !important;\r\n  line-height: 18px !important;\r\n}\r\n/* Circliful charts */\r\n.circliful-chart {\r\n  margin: 0px auto;\r\n}\r\n.circle-text,\r\n.circle-info,\r\n.circle-text-half,\r\n.circle-info-half {\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n/* Nvd3 Chart */\r\n.nvd3 text {\r\n  fill: #98a6ad;\r\n}\r\n.nvd3 .nv-axis line,\r\n.nvd3 .nv-axis path {\r\n  stroke: #2c333b;\r\n}\r\n.nvd3 .nv-discretebar .nv-groups text,\r\n.nvd3 .nv-multibarHorizontal .nv-groups text {\r\n  fill: rgba(255, 255, 255, 0.8);\r\n}\r\n.multi-chart .nv-legend-symbol {\r\n  fill: #ffffff !important;\r\n  fill-opacity: 0;\r\n  stroke: #ffffff !important;\r\n}\r\n/* ===========\r\n   Count Down\r\n =============*/\r\n.home-wrapper {\r\n  margin: 10% 0px;\r\n}\r\n.app-countdown {\r\n  margin-top: 40px;\r\n  text-align: center;\r\n}\r\n.app-countdown div {\r\n  display: inline-block;\r\n}\r\n.app-countdown div span {\r\n  display: block;\r\n  width: 150px;\r\n}\r\n.app-countdown div span:first-child {\r\n  font-size: 3em;\r\n  font-weight: 700;\r\n  height: 48px;\r\n  line-height: 48px;\r\n}\r\n.app-countdown div span:last-child {\r\n  color: #333333;\r\n  font-size: 0.9em;\r\n  height: 25px;\r\n  line-height: 25px;\r\n}\r\n.app-countdown > * {\r\n  text-align: center;\r\n}\r\n/* ===========\r\n   Gallery\r\n =============*/\r\n.portfolioFilter a {\r\n  -moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);\r\n  -moz-transition: all 0.3s ease-out;\r\n  -ms-transition: all 0.3s ease-out;\r\n  -o-transition: all 0.3s ease-out;\r\n  -webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);\r\n  -webkit-transition: all 0.3s ease-out;\r\n  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);\r\n  color: #98a6ad;\r\n  padding: 5px 10px;\r\n  display: inline-block;\r\n  transition: all 0.3s ease-out;\r\n}\r\n.portfolioFilter a:hover {\r\n  background-color: #3bafda;\r\n  color: #ffffff;\r\n}\r\n.portfolioFilter a.current {\r\n  background-color: #3bafda;\r\n  color: #ffffff;\r\n}\r\n.thumb {\r\n  background-color: #272e35;\r\n  border-radius: 3px;\r\n  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);\r\n  margin-top: 30px;\r\n  padding-bottom: 10px;\r\n  padding-left: 10px;\r\n  padding-right: 10px;\r\n  padding-top: 10px;\r\n  width: 100%;\r\n}\r\n.thumb-img {\r\n  border-radius: 2px;\r\n  overflow: hidden;\r\n  width: 100%;\r\n}\r\n.gal-detail h4 {\r\n  margin: 16px auto 10px auto;\r\n  width: 80%;\r\n  white-space: nowrap;\r\n  display: block;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n.gal-detail .ga-border {\r\n  height: 3px;\r\n  width: 40px;\r\n  background-color: #3bafda;\r\n  margin: 10px auto;\r\n}\r\n/* ===========\r\n   Maintenance\r\n =============*/\r\n.icon-main {\r\n  font-size: 60px;\r\n}\r\n.maintenance-page {\r\n  margin: 10% 0%;\r\n}\r\n.home-text {\r\n  letter-spacing: 1px;\r\n}\r\n/* ===========\r\n   Accounts\r\n =============*/\r\n.wrapper-page {\r\n  margin: 7.5% auto;\r\n  width: 360px;\r\n}\r\n.wrapper-page .form-control {\r\n  height: 40px;\r\n  padding-left: 40px;\r\n}\r\n.wrapper-page .form-control-feedback {\r\n  left: 15px;\r\n  top: 3px;\r\n  color: rgba(255, 255, 255, 0.4);\r\n  font-size: 20px;\r\n}\r\n.wrapper-page .btn-email {\r\n  padding: 9px 20px;\r\n}\r\n.logo-lg {\r\n  font-size: 28px !important;\r\n  color: #ffffff !important;\r\n}\r\n.user-thumb img {\r\n  height: 88px;\r\n  margin: 0px auto;\r\n  width: 88px;\r\n}\r\n.ex-page-content .svg-box {\r\n  float: right;\r\n}\r\n.message-box {\r\n  margin-top: 120px;\r\n  margin-left: 50px;\r\n  font-weight: 300;\r\n}\r\n.message-box h1 {\r\n  color: #ffffff;\r\n  font-size: 98px;\r\n  font-weight: 700;\r\n  line-height: 98px;\r\n  text-shadow: rgba(255, 255, 255, 0.3) 1px 1px, rgba(255, 255, 255, 0.2) 2px 2px, rgba(255, 255, 255, 0.3) 3px 3px;\r\n}\r\n#Polygon-1,\r\n#Polygon-2,\r\n#Polygon-3,\r\n#Polygon-4,\r\n#Polygon-4,\r\n#Polygon-5 {\r\n  animation: float 1s infinite ease-in-out alternate;\r\n}\r\n#Polygon-2 {\r\n  animation-delay: .2s;\r\n}\r\n#Polygon-3 {\r\n  animation-delay: .4s;\r\n}\r\n#Polygon-4 {\r\n  animation-delay: .6s;\r\n}\r\n#Polygon-5 {\r\n  animation-delay: .8s;\r\n}\r\n@keyframes float {\r\n  100% {\r\n    transform: translateY(20px);\r\n  }\r\n}\r\n/* =============\r\n   Tree view page\r\n============= */\r\n.jstree-default .jstree-clicked,\r\n.jstree-default .jstree-wholerow-clicked {\r\n  background: rgba(59, 175, 218, 0.4);\r\n  box-shadow: none;\r\n}\r\n.jstree-default .jstree-hovered,\r\n.jstree-default .jstree-wholerow-hovered {\r\n  background: rgba(59, 175, 218, 0.2);\r\n  box-shadow: none;\r\n}\r\n.jstree-default .zmdi {\r\n  font-size: 16px;\r\n}\r\n/* =============\r\n   Pricing\r\n============= */\r\n.pricing-column {\r\n  position: relative;\r\n  margin-bottom: 40px;\r\n}\r\n.pricing-column .inner-box {\r\n  position: relative;\r\n  padding: 0 0 50px;\r\n}\r\n.pricing-column .plan-header {\r\n  position: relative;\r\n  padding: 30px 20px 25px;\r\n}\r\n.pricing-column .plan-title {\r\n  font-size: 16px;\r\n  margin-bottom: 10px;\r\n  color: #00b19d;\r\n  text-transform: uppercase;\r\n  letter-spacing: 1px;\r\n  font-weight: 400;\r\n}\r\n.pricing-column .plan-price {\r\n  font-size: 48px;\r\n  margin-bottom: 10px;\r\n  color: #ffffff;\r\n}\r\n.pricing-column .plan-duration {\r\n  font-size: 13px;\r\n  color: #98a6ad;\r\n}\r\n.pricing-column .plan-stats {\r\n  position: relative;\r\n  padding: 30px 20px 15px;\r\n}\r\n.pricing-column .plan-stats li {\r\n  margin-bottom: 15px;\r\n  line-height: 24px;\r\n}\r\n.pricing-column .plan-stats li i {\r\n  font-size: 16px;\r\n  vertical-align: middle;\r\n  margin-right: 5px;\r\n}\r\n.ribbon {\r\n  position: absolute;\r\n  left: 5px;\r\n  top: -5px;\r\n  z-index: 1;\r\n  overflow: hidden;\r\n  width: 75px;\r\n  height: 75px;\r\n  text-align: right;\r\n}\r\n.ribbon span {\r\n  font-size: 10px;\r\n  font-weight: bold;\r\n  color: #ffffff;\r\n  text-transform: uppercase;\r\n  text-align: center;\r\n  line-height: 20px;\r\n  transform: rotate(-45deg);\r\n  -webkit-transform: rotate(-45deg);\r\n  width: 100px;\r\n  display: block;\r\n  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(0, 0, 0, 0.02);\r\n  background: #00b19d;\r\n  background: linear-gradient(#00b19d 0%, #00b19d 100%);\r\n  position: absolute;\r\n  top: 19px;\r\n  letter-spacing: 1px;\r\n  left: -21px;\r\n}\r\n.ribbon span:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 100%;\r\n  z-index: -1;\r\n  border-left: 3px solid #007e70;\r\n  border-right: 3px solid transparent;\r\n  border-bottom: 3px solid transparent;\r\n  border-top: 3px solid #007e70;\r\n}\r\n.ribbon span:after {\r\n  content: \"\";\r\n  position: absolute;\r\n  right: 0;\r\n  top: 100%;\r\n  z-index: -1;\r\n  border-left: 3px solid transparent;\r\n  border-right: 3px solid #007e70;\r\n  border-bottom: 3px solid transparent;\r\n  border-top: 3px solid #007e70;\r\n}\r\n/* =============\r\n   FAQ\r\n============= */\r\n.question-q-box {\r\n  height: 30px;\r\n  width: 30px;\r\n  color: #ffffff;\r\n  background-color: #ef5350;\r\n  text-align: center;\r\n  border-radius: 50%;\r\n  float: left;\r\n  line-height: 30px;\r\n  font-weight: 700;\r\n}\r\n.question {\r\n  margin-top: 0;\r\n  margin-left: 50px;\r\n  font-weight: 400;\r\n  font-size: 16px;\r\n}\r\n.answer {\r\n  margin-left: 50px;\r\n  color: #98a6ad;\r\n  margin-bottom: 40px;\r\n  line-height: 26px;\r\n}\r\n"; });
define('text!microservices/picks/pick-summary.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./user-picks.html\"></require>\r\n  <form class=\"form-inline\" style=\"margin-bottom: 10px\">\r\n    <label for=\"picksummarysearch\">Poolie:</label>\r\n    <input class=\"form-control\" type=\"text\" value.bind=\"search\"></input>\r\n    <label for=\"picksummarygolfer\" style=\"margin-left: 15px\">Golfer:</label>\r\n    <input class=\"form-control\" type=\"text\" value.bind=\"golfer\"></input>\r\n  </form>\r\n  <user-picks repeat.for=\"pick of golferPicks | objectKeys\" key.bind=\"pick\" picks.bind=\"golferPicks[pick]\">\r\n</template>"; });
define('text!resources/styles/minton/css/responsive.css', ['module'], function(module) { module.exports = "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);\r\n@import url(https://fonts.googleapis.com/css?family=Poppins:500,600);\r\n@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:600,400,700);\r\n/*\r\nTemplate Name: Minton Dashboard\r\nAuthor: CoderThemes\r\nEmail: coderthemes@gmail.com\r\nFile: Responsive\r\n*/\r\n@media only screen and (max-width: 6000px) and (min-width: 700px) {\r\n  .wrapper.right-bar-enabled .right-bar {\r\n    right: 0;\r\n    z-index: 99;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  body {\r\n    overflow-x: hidden;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  body {\r\n    overflow-x: hidden;\r\n  }\r\n  .mobile-sidebar {\r\n    left: 0px;\r\n  }\r\n  .mobile-content {\r\n    left: 250px;\r\n    right: -250px;\r\n  }\r\n  .wrapper-page {\r\n    width: 90%;\r\n  }\r\n  .navbar-nav .open .dropdown-menu {\r\n    background-color: #ffffff;\r\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\r\n    left: auto;\r\n    position: absolute;\r\n    right: 0;\r\n  }\r\n  .todo-send {\r\n    margin-top: 10px;\r\n    padding-left: 15px;\r\n  }\r\n  .chat-inputbar {\r\n    padding-left: 15px;\r\n  }\r\n  .chat-send {\r\n    margin-top: 10px;\r\n    padding-left: 15px;\r\n    padding-right: 15px;\r\n  }\r\n  .fixedHeader-floating {\r\n    top: 60px !important;\r\n  }\r\n  div#datatable-buttons_info {\r\n    float: none;\r\n  }\r\n}\r\n@media (max-width: 480px) {\r\n  .side-menu {\r\n    z-index: 10 !important;\r\n  }\r\n  .button-menu-mobile {\r\n    display: block;\r\n  }\r\n  .search-bar {\r\n    display: none !important;\r\n  }\r\n}\r\n@media (max-width: 420px) {\r\n  .hide-phone {\r\n    display: none !important;\r\n  }\r\n}\r\n/* Container-alt */\r\n@media (min-width: 768px) {\r\n  .container-alt {\r\n    width: 750px;\r\n  }\r\n}\r\n@media (min-width: 992px) {\r\n  .container-alt {\r\n    width: 970px;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .container-alt {\r\n    width: 1170px;\r\n  }\r\n}\r\n"; });
define('text!microservices/picks/picks-main.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./picks-title.html\"></require>\r\n  <require from=\"./picks-start.html\"></require>\r\n  <require from=\"./picks-state.html\"></require>\r\n  <require from=\"./picks-pick.html\"></require>\r\n  <div if.bind=\"tournament.State === 'picking' || tournament.State === 'progressing'\">\r\n    <picks-title name=\"${tournament.Name}\" state=\"${tournament.State}\"></picks-title>\r\n    <div class=\"card-box col-sm-7\">\r\n      <picks-start date=\"${tournament.Start}\" state=\"${tournament.State}\"></picks-start>\r\n      <picks-state state=\"${tournament.State}\"></picks-state>\r\n      <picks-pick golfer.bind=\"pick\"></picks-pick>\r\n        <div if.bind=\"golfers && tournament.State === 'picking'\">\r\n          <div if.bind=\"tournament.State === 'picking'\" class=\"form-group\">\r\n            <select class=\"form-control\" value.bind=\"selectedPlayer\">\r\n            <option model.bind=\"null\">Choose a Golfer...</option>\r\n            <option repeat.for=\"golfer of golfers\"\r\n                    model.bind=\"golfer\">\r\n                ${golfer.PlayerName}\r\n            </option>\r\n          </select>\r\n          </div>\r\n          <button class=\"btn btn-primary\" disabled.bind=\"!selectedPlayer || submitting\" click.trigger=\"submitPick()\">Submit Golfer</button>\r\n          <p class=\"m-t-10\"><span class=\"text-warning\">Note: </span>You can change your submission any time before the day the tournament begins.</p>\r\n          <p class=\"text-primary\">Also note that golfers unavailable to you (those you've already chosen twice), will not appear in the list.</p>\r\n        </div>\r\n    </div>\r\n  </div>\r\n  <div if.bind=\"tournament && tournament.State !== 'picking' && tournament.State !== 'progressing'\">\r\n    <h1>There is no tournament this coming weekend.</h1>\r\n  </div>\r\n</template>"; });
define('text!resources/styles/minton/css/variables.css', ['module'], function(module) { module.exports = "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);\r\n@import url(https://fonts.googleapis.com/css?family=Poppins:500,600);\r\n@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:600,400,700);\r\n"; });
define('text!microservices/picks/picks-pick.html', ['module'], function(module) { module.exports = "<template bindable=\"golfer\">\r\n  <h3 if.bind=\"golfer === 'none'\" class=\"text-danger\">You have not picked a golfer for this tournament!</h3>\r\n  <div if.bind=\"golfer && golfer !== 'none'\">\r\n    <h1><small>Your submission for this tournament:</small></h1>\r\n    <h3 class=\"text-info\">${golfer.PlayerName}</h3>\r\n  </div>\r\n</template>"; });
define('text!microservices/picks/picks-start.html', ['module'], function(module) { module.exports = "<template bindable=\"date, state\">\r\n    <require from=\"resources/valueConverters/dateFormat\"></require>\r\n    <p if.bind=\"state === 'picking'\" class=\"lead\">This tournament starts on <strong class=\"text-warning\">${date | dateFormat}</strong></p>\r\n    <p if.bind=\"state === 'progressing'\" class=\"lead\">This tournament started on <strong class=\"text-warning\">${date | dateFormat}</strong></p>\r\n</template>\r\n"; });
define('text!microservices/picks/picks-state.html', ['module'], function(module) { module.exports = "<template bindable=\"state\">\r\n    <h2 if.bind=\"state === 'picking'\"><small class=\"text-success\">Pick submissions are now open.</small></h2>\r\n    <h2 if.bind=\"state === 'progressing'\"><small class=\"text-danger\">Pick submissions are now closed.</small></h2>\r\n</template>"; });
define('text!microservices/picks/picks-title.html', ['module'], function(module) { module.exports = "<template bindable=\"name, state\">\r\n    <h1 if.bind=\"state === 'picking'\"><small>up next: </small> <span class=\"text-primary\">${name}</span></h1>\r\n    <h1 if.bind=\"state === 'progressing'\"><small>right now: </small> <span class=\"text-primary\">${name}</span></h1>\r\n</template>"; });
define('text!microservices/picks/user-picks.html', ['module'], function(module) { module.exports = "<template bindable=\"key, picks\">\r\n  <div class=\"card-box\">\r\n    <h4 class=\"header-title\">${key.substr(0, key.indexOf(':'))}</h4>\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12\">\r\n        <p repeat.for=\"pick of picks\" class=\"${pick.Instance > 1 ? 'text-danger' : ''}\">\r\n          ${pick.PlayerName}\r\n        </p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!microservices/tournaments/tournament-selector.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"form-group\">\r\n    <form class=\"form-inline\">\r\n      <label for=\"tournamentSelect\">Tournament: </label>\r\n      <div class=\"form-group\">\r\n        <select id=\"tournamentSelect\" class=\"form-control\" value.bind=\"selectedTournament\" change.delegate=\"tournamentChanged()\">\r\n          <option>Current</option>\r\n          <option repeat.for=\"tournament of tournaments\"\r\n                  model.bind=\"tournament\">\r\n              ${tournament.Name} - Week ${tournament.WeekNumber}\r\n          </option>\r\n        </select>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</template>"; });
define('text!microservices/users/registration.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-8\">\r\n      <div class=\"card-box\">\r\n        <table id=\"regtable\" class=\"table\">\r\n          <thead>\r\n            <tr>\r\n              <th>Name</th>\r\n              <th>Email</th>\r\n              <th>Picked</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr repeat.for=\"registration of registrations\">\r\n              <td><b>${registration.LastFirst}</b></td>\r\n              <td>${registration.Email}</td>\r\n              <td>\r\n                <i class=\"${registration.Picked ? 'fa fa-check text-success' : 'fa fa-close text-danger'}\"></i>\r\n                <p style=\"visibility: hidden\">${registration.Picked ? '1' : '0'}</p>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!microservices/stats/current/current-course.html', ['module'], function(module) { module.exports = "<template bindable=\"course\">\r\n  <div class=\"card-box\">\r\n    <h4 class=\"header-title\"><span>${course.Name}</span></h4>\r\n    <p>Designed by ${course.Designer}</p>\r\n    <p>Established ${course.Established}</p>\r\n    <p>${course.City}${course.City ? \",\" : \"\"} ${course.State}${course.State ? \",\" : \"\"} ${course.Country}${course.Country ? \",\" : \"\"}</p>\r\n  </div>\r\n</template>"; });
define('text!microservices/stats/current/current-golfers-table.html', ['module'], function(module) { module.exports = "<template bindable=\"golfers, maxPoints\">\r\n  <require from=\"./current-stats-styles.css\"></require>\r\n  <table id=\"golferstable\" class=\"table\">\r\n    <thead>\r\n      <tr>\r\n        <th>Golfer</th>\r\n        <th>Pick Count</th>\r\n        <th>Position</th>\r\n        <th hidden=\"hidden\">PositonHidden</th>\r\n        <th>Par</th>\r\n        <th>Thru</th>\r\n        <th>Points</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr repeat.for=\"golfer of golfers\">\r\n        <td><a href=\"http://www.pgatour.com/players/player.${golfer.Id}.html\" target=\"_blank\">${golfer.Name}</a></td>\r\n        <td>${golfer.PickCount}</td>\r\n        <td class=\"${golfer.Status === 'active' ? '' : 'table-red' }\">${golfer.Status === 'active' ? golfer.Rank : golfer.Status}</td>\r\n        <td hidden=\"hidden\">${golfer.Status === 'active' ? golfer.Rank : 999}</td>\r\n        <td>${golfer.ParTotal}</td>\r\n        <td>${golfer.Thru}</td>\r\n        <td class=\"${golfer.Points === maxPoints ? 'table-green' : ''}\">${golfer.Points}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</template>"; });
define('text!microservices/stats/current/current-poolies-table.html', ['module'], function(module) { module.exports = "<template bindable=\"poolies, state\">\r\n  <require from=\"./current-stats-styles.css\"></require>\r\n  <table id=\"pooliestable\" class=\"table\">\r\n    <thead>\r\n      <tr>\r\n        <th>Start Rank</th>\r\n        <th>${state === 'progressing' ? 'Proj. Rank' : 'Final Rank'}</th>\r\n        <th>Poolie</th>\r\n        <th>Golfer</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr repeat.for=\"poolie of poolies\">\r\n        <td>${poolie.Rank}</td>\r\n        <td class=\"${poolie.ProjectedRank < poolie.Rank ? 'table-green' : (poolie.ProjectedRank > poolie.Rank ? 'table-red' : '')}\">${poolie.ProjectedRank}</td>\r\n        <td>${poolie.LastFirst}</td>\r\n        <td>${poolie.GolferName}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</template>"; });
define('text!microservices/stats/current/current-stats.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./current-tournament.html\"></require>\r\n  <require from=\"./current-course.html\"></require>\r\n  <require from=\"./current-poolies-table.html\"></require>\r\n  <require from=\"./current-golfers-table.html\"></require>\r\n  <div class=\"row\">\r\n    <div class-\"col-lg-4\">\r\n      <tournament-selector></tournament-selector>\r\n    </div>\r\n  </div>\r\n  <p if.bind=\"tournament.State === 'dequeued'\" class=\"text-info\">You're viewing a past tournament. Start and Final Rank refer to the poolie's rank before the tournament started, and after it finished, respectively.</p>\r\n  <div class=\"row\" if.bind=\"tournament\">\r\n    <div class=\"col-sm-5\">\r\n      <current-tournament tournament.bind=\"tournament\"></current-tournament>\r\n    </div>\r\n    <div class=\"col-sm-5\">\r\n      <current-course course.bind=\"course\"></current-course>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\" if.bind=\"tournament\">\r\n    <div class=\"col-lg-6\">\r\n      <div class=\"card-box\">\r\n        <current-poolies-table poolies.bind=\"poolies\" state.bind=\"tournament.State\"></current-poolies-table>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-lg-6\">\r\n      <div class=\"card-box\">\r\n        <current-golfers-table golfers.bind=\"golfers\" max-points.bind=\"maxPoints\"></current-poolies-table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!microservices/stats/current/current-tournament.html', ['module'], function(module) { module.exports = "<template bindable=\"tournament\">\r\n  <div class=\"card-box\">\r\n    <h4 class=\"header-title\"><span class=\"text-info\">${tournament.Name}</span></h4>\r\n    <h4 class=\"pull-right\"></h4>\r\n    <h4 if.bind=\"tournament.State === 'progressing'\"><b class=\"text-warning m-r-10\">This tournament is in progress</b> (Round ${tournament.CurrentRound}/${tournament.TotalRounds})</h4>\r\n    <h4 if.bind=\"tournament.State === 'completed'\"><b class=\"text-success\">This tournament is Complete</b></h4>\r\n    <h4 if.bind=\"tournament.State === 'dequeued'\"><b class=\"text-success\">This tournament is ancient history.</b></h4>\r\n    <p>${tournament.Start | dateFormat} to ${tournament.End | dateFormat}</p>\r\n    <h4>${tournament.State === 'progressing' ? 'Champion' : 'Champion'}: <b>${tournament.Champion.FirstName} ${tournament.Champion.LastName}</b></h4>\r\n  </div>\r\n</template>\r\n\r\n<!--<a target=\"_blank\" href=\"${tournament.Link}\" class=\"m-l-10\">(pga.com)</a>-->"; });
define('text!microservices/stats/history/history-stats.html', ['module'], function(module) { module.exports = "<template>\r\n  history\r\n</template>"; });
define('text!microservices/stats/monthly/monthly-stats.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"col-lg-12\" if.bind=\"poolies\">\r\n    <h2><span style=\"margin-right: 20px\">FedEx Cup Points per Month</span><small>as of ${getMonthName(currentMonth)}</small></h2>\r\n    <div class=\"card-box\">\r\n      <table id=\"monthtable\" class=\"table\">\r\n        <thead>\r\n          <tr>\r\n            <th>Poolie</th>\r\n            <th>Curr. Month Projection</th>\r\n            <th repeat.for=\"monthName of monthNames\">${monthName}</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr repeat.for=\"poolie of poolies\">\r\n            <td>${poolie.LastFirst}</td>\r\n            <td>${poolie.projectedPoints}</td>\r\n            <td repeat.for=\"points of poolie.Points\">${points}</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!microservices/stats/playoffs/playoff-stats.html', ['module'], function(module) { module.exports = "<template>\r\n  playoff\r\n</template>"; });
define('text!microservices/stats/majors/majors-stats.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./majors-stats-styles.css\"></require>\n  <div class=\"col-lg-12\" if.bind=\"poolies\">\n    <h2><span style=\"margin-right: 20px\">${season} Majors Stats</span><small>after week ${week - 1} / <span class=\"text-primary\">${tournamentName}</span></small></h2>\n    <div class=\"card-box\">\n      <table id=\"majorstable\" class=\"table\">\n        <thead>\n          <tr>\n            <th>Rank</th>\n            <th>Poolie</th>\n            <th>Points</th>\n            <th>Behind</th>\n            <th>Wins</th>\n            <th>Top 5s</th>\n            <th>Top 10s</th>\n            <th>Cuts</th>\n            <th>+/-</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"poolie of poolies\">\n            <td>${poolie.Rank}</td>\n            <td>${poolie.LastFirst}</td>\n            <td>${poolie.Points}</td>\n            <td>${poolie.Behind}</td>\n            <td class=\"${poolie.Wins === maxWins ? 'table-green' : ''}\">${poolie.Wins}</td>\n            <td class=\"${poolie.Top5 === maxTop5 ? 'table-green' : ''}\">${poolie.Top5}</td>\n            <td class=\"${poolie.Top10 === maxTop10 ? 'table-green' : ''}\">${poolie.Top10}</td>\n            <td class=\"${poolie.Cuts === 0 ? 'table-green' : ''}\">${poolie.Cuts}</td>\n            <td class=\"${poolie.PlusMinus === maxPlusMinus ? 'table-green' : ''}\">${poolie.PlusMinus}</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</template>\n"; });
define('text!microservices/stats/season/season-stats.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./season-stats-styles.css\"></require>\r\n  <div class=\"col-lg-12\" if.bind=\"poolies\">\r\n    <h2><span style=\"margin-right: 20px\">${season} Season Stats</span><small>after week ${week - 1} / <span class=\"text-primary\">${tournamentName}</span></small></h2>\r\n    <div class=\"card-box\">\r\n      <table id=\"seasontable\" class=\"table\">\r\n        <thead>\r\n          <tr>\r\n            <th>Rank</th>\r\n            <th>Change</th>\r\n            <th>Poolie</th>\r\n            <th>Points</th>\r\n            <th>Behind</th>\r\n            <th>Wins</th>\r\n            <th>Top 5s</th>\r\n            <th>Top 10s</th>\r\n            <th>Cuts</th>\r\n            <th>+/-</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr repeat.for=\"poolie of poolies\">\r\n            <td>${poolie.Rank}</td>\r\n            <td class=\"${poolie.Change > 0 ? 'table-green' : (poolie.Change < 0 ? 'table-red' : '')}\">${poolie.Change}</td>\r\n            <td>${poolie.LastFirst}</td>\r\n            <td>${poolie.Points}</td>\r\n            <td>${poolie.Behind}</td>\r\n            <td class=\"${poolie.Wins === maxWins ? 'table-green' : ''}\">${poolie.Wins}</td>\r\n            <td class=\"${poolie.Top5 === maxTop5 ? 'table-green' : ''}\">${poolie.Top5}</td>\r\n            <td class=\"${poolie.Top10 === maxTop10 ? 'table-green' : ''}\">${poolie.Top10}</td>\r\n            <td class=\"${poolie.Cuts === 0 ? 'table-green' : ''}\">${poolie.Cuts}</td>\r\n            <td class=\"${poolie.PlusMinus === maxPlusMinus ? 'table-green' : ''}\">${poolie.PlusMinus}</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map