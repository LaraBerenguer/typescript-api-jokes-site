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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var _this = this;
var button = document.querySelector(".jokes_btn");
var jokesContainer = document.querySelector(".joke_container");
var weatherContainer = document.querySelector(".weather_container");
var scoreBtn1 = document.getElementById("score1");
var scoreBtn2 = document.getElementById("score2");
var scoreBtn3 = document.getElementById("score3");
//get jokes
var reportJokes = [];
var getJokes = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, finalJoke;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://icanhazdadjoke.com/", { headers: { 'Accept': 'application/json' } })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("API mal " + response.status);
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                console.log("data: ", data);
                finalJoke = data.joke;
                return [2 /*return*/, finalJoke];
        }
    });
}); };
var getChuckNorrisJokes = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, finalNorrisJoke;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://api.chucknorris.io/jokes/random", { headers: { 'Accept': 'application/json' } })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("API mal " + response.status);
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                console.log("Norris data: ", data);
                finalNorrisJoke = data.value;
                return [2 /*return*/, finalNorrisJoke];
        }
    });
}); };
//decide random jokes
var getRandomJoke = function () { return __awaiter(_this, void 0, void 0, function () {
    var randomNumber;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                randomNumber = Math.random() < 0.5 ? getJokes() : getChuckNorrisJokes();
                return [4 /*yield*/, randomNumber];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//print joke
var printJokes = function () { return __awaiter(_this, void 0, void 0, function () {
    var finalJoke, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getRandomJoke()];
            case 1:
                finalJoke = _a.sent();
                jokesContainer.textContent = finalJoke;
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                jokesContainer.textContent = "Error: joke couldn't load";
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//rating jokes
var rateJokes = function (scoreValue) { return __awaiter(_this, void 0, void 0, function () {
    var jokeString, score, currentDate, objectScores, existingJoke;
    return __generator(this, function (_a) {
        jokeString = (jokesContainer === null || jokesContainer === void 0 ? void 0 : jokesContainer.textContent) || "";
        score = scoreValue;
        currentDate = (new Date()).toISOString();
        objectScores = {};
        objectScores.date = currentDate;
        objectScores.joke = jokeString;
        objectScores.score = score;
        existingJoke = reportJokes.find(function (jokes) { return jokes.joke === jokeString; });
        if (!existingJoke) {
            reportJokes.push(objectScores);
        }
        else {
            existingJoke.score = scoreValue;
            existingJoke.date = currentDate;
        }
        return [2 /*return*/, console.log(reportJokes)];
    });
}); };
//get weather
var getWeather = function () { return __awaiter(_this, void 0, void 0, function () {
    var weatherResponse, weatherData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/08019", { headers: { 'Accept': 'application/json' } })];
            case 1:
                weatherResponse = _a.sent();
                if (!weatherResponse.ok) {
                    throw new Error("API mal " + weatherResponse.status);
                }
                return [4 /*yield*/, weatherResponse.json()];
            case 2:
                weatherData = _a.sent();
                console.log("Weather data: ", weatherData);
                return [2 /*return*/, weatherData];
        }
    });
}); };
var printWeather = function () { return __awaiter(_this, void 0, void 0, function () {
    var currentWeather, sky, temperature, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getWeather()];
            case 1:
                currentWeather = _a.sent();
                sky = currentWeather.stateSky.description;
                temperature = currentWeather.temperatura_actual;
                weatherContainer.textContent = "Current weather: ".concat(sky, ", ").concat(temperature, "\u00B0C");
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                weatherContainer.textContent = "Weather couldn't load";
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//buttons and jokes on load
button.addEventListener('click', printJokes);
scoreBtn1 === null || scoreBtn1 === void 0 ? void 0 : scoreBtn1.addEventListener('click', function () { return rateJokes(parseInt((scoreBtn1 === null || scoreBtn1 === void 0 ? void 0 : scoreBtn1.getAttribute("data-score")) || "0")); });
scoreBtn2 === null || scoreBtn2 === void 0 ? void 0 : scoreBtn2.addEventListener('click', function () { return rateJokes(parseInt((scoreBtn2 === null || scoreBtn2 === void 0 ? void 0 : scoreBtn2.getAttribute("data-score")) || "0")); });
scoreBtn3 === null || scoreBtn3 === void 0 ? void 0 : scoreBtn3.addEventListener('click', function () { return rateJokes(parseInt((scoreBtn3 === null || scoreBtn3 === void 0 ? void 0 : scoreBtn3.getAttribute("data-score")) || "0")); });
document.addEventListener('DOMContentLoaded', printJokes);
document.addEventListener('DOMContentLoaded', printWeather);
