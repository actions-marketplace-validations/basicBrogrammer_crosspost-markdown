"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
exports.__esModule = true;
var core = require("@actions/core");
var github = require("@actions/github");
var fs = require("fs");
var frontmatter_1 = require("@github-docs/frontmatter");
var getFiles = function () { return __awaiter(void 0, void 0, void 0, function () {
    var octokit, commit;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                octokit = github.getOctokit(core.getInput('github-token'));
                return [4 /*yield*/, octokit.repos.getCommit(__assign(__assign({}, github.context.repo), { ref: github.context.sha }))];
            case 1:
                commit = _b.sent();
                return [2 /*return*/, (((_a = commit === null || commit === void 0 ? void 0 : commit.data) === null || _a === void 0 ? void 0 : _a.files) || [])
                        .map(function (file) { return file.filename; })
                        .filter(function (filename) {
                        return filename.includes(core.getInput('content-dir'));
                    })];
        }
    });
}); };
var publish = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var markdown, data;
    return __generator(this, function (_a) {
        try {
            markdown = fs.readFileSync("./" + path, 'utf8');
            data = frontmatter_1["default"](markdown).data;
            if (data.published) {
                // logResponse(data.title, 'Dev.to', devTo.publish(markdown))
                console.log("Article " + data.title + " published. Skipping.");
            }
            else {
                console.log("Article " + data.title + " NOT published. Skipping.");
            }
        }
        catch (err) {
            console.error(err);
        }
        return [2 /*return*/];
    });
}); };
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var files, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // const files = await getFiles()
                    console.log('starting...');
                    files = [
                        '__tests__/fixtures/articles/published.md',
                        '__tests__/fixtures/articles/not-published.md'
                    ];
                    return [4 /*yield*/, files.forEach(publish)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    core.setFailed(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
run();
