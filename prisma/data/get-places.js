"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRunningShoeStores = getRunningShoeStores;
require('dotenv').config({ path: '.env.local' });
var axios_1 = require("axios");
var path = require("path");
var fs_1 = require("fs");
// finalize new Extract Transform Load pipeline workflow
// get yourself a fucking job you idiot
var en = function (str) { return encodeURIComponent(str); };
function getRunningShoeStores(keyword_1, cityState_1) {
    return __awaiter(this, arguments, void 0, function (keyword, cityState, radius) {
        var baseUrl, coordinates, queryParamString, url, response;
        if (radius === void 0) { radius = 5000; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = "".concat(process.env.HOST, ":").concat(process.env.PORT, "/api");
                    return [4 /*yield*/, axios_1.default.get("".concat(baseUrl, "/coordinates-from-city-state?cityState=").concat(cityState))];
                case 1:
                    coordinates = ((_a.sent()).data);
                    queryParamString = "?keyword=".concat(en(keyword), "&lat=").concat(coordinates.lat, "&lng=").concat(coordinates.lng, "&radius=").concat(radius);
                    url = "".concat(baseUrl, "/places").concat(queryParamString);
                    console.log('SENDING.....', url);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function jsonAsString(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, JSON.stringify(data, null, 2)];
        });
    });
}
function writeToRaw(str) {
    return __awaiter(this, void 0, void 0, function () {
        var filepath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filepath = path.join(__dirname, './raw', 'running_shoe_stores.json');
                    return [4 /*yield*/, fs_1.promises.writeFile(filepath, str)];
                case 1:
                    _a.sent();
                    console.log('written to.. vscode://file' + filepath);
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var USAGE_STRING, args, keyword, cityState, runningShoeStores, str;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    USAGE_STRING = 'Usage: node program.js <keyword> <cityState>';
                    args = process.argv.slice(2);
                    if (args.length !== 2)
                        console.log(USAGE_STRING);
                    keyword = args[0], cityState = args[1];
                    if (!keyword || !cityState || typeof keyword !== 'string' || typeof cityState !== 'string') {
                        console.log(USAGE_STRING);
                    }
                    console.log("keyword: ".concat(keyword, ", cityState: ").concat(cityState));
                    return [4 /*yield*/, getRunningShoeStores(keyword, cityState)];
                case 1:
                    runningShoeStores = _a.sent();
                    return [4 /*yield*/, jsonAsString(runningShoeStores)];
                case 2:
                    str = _a.sent();
                    return [4 /*yield*/, writeToRaw(str)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main().then().catch(function (err) { return console.log(err); });
