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
var _a = require('./placeSearch'), queryName = _a.queryName, RandomDayQuery = _a.RandomDayQuery;
var LocationAPI = /** @class */ (function () {
    function LocationAPI() {
    }
    LocationAPI.queryLocation = function (location, numResponses) {
        if (numResponses === void 0) { numResponses = 5; }
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryName(location, numResponses)];
                    case 1:
                        results = _a.sent();
                        if (results.length === 0) {
                            throw new Error("No locations found");
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    return LocationAPI;
}());
var WeatherAPI = /** @class */ (function () {
    function WeatherAPI() {
    }
    /** Gets the weather at each hour of the day. Also returns the suntime and moon phase "data".
     * @param location Location returned from LocationAPI.queryLocation
     * @param day day the "week" starts on
     * @returns Array of data on individual days, each containing data on individual hours [0 to 23].
     */
    WeatherAPI.queryWeatherThroughoutWeek = function (location, day) {
        var weekData = [];
        for (var i = 0; i < 7; i++) {
            var currentDay = day + i;
            var dayData = new RandomDayQuery().queryDay(location.easting, location.northing, currentDay);
            weekData.push(dayData);
        }
        return weekData;
    };
    /** Gets the weather at each hour of the day. Also returns the suntime and moon phase "data".
     * @param location Location returned from LocationAPI.queryLocation
     * @param day between 0 and 21 for now
     * @returns Array of data on individual hours [0 to 23].
     */
    WeatherAPI.queryWeatherThroughoutDay = function (location, day) {
        return new RandomDayQuery().queryDay(location.easting, location.northing, day);
    };
    /** Gets the weather at each hour of the day. Run queryWeatherThroughoutDay to get suntime and moon phase "data".
     * @param location Location returned from LocationAPI.queryLocation
     * @param day between 0 and 21 for now
     * @param hour between 0 and 24
     * @returns weather metrics for the hour specified.
     */
    WeatherAPI.queryWeatherOnHour = function (location, day, hour) {
        var dayData = new RandomDayQuery().queryDay(location.easting, location.northing, day);
        return dayData.hourQueryResults[hour];
    };
    return WeatherAPI;
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var locations, location_1, weatherOnWeek, weatherOnDay, weatherOnHour, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, LocationAPI.queryLocation("Cambridge")];
                case 1:
                    locations = _a.sent();
                    if (locations.length === 0) {
                        throw new Error("No locations found for the specified query.");
                    }
                    location_1 = locations[0];
                    console.log("Location fetched:", location_1.name);
                    console.log();
                    weatherOnWeek = WeatherAPI.queryWeatherThroughoutWeek(location_1, 0);
                    console.log("Day 1: moonPhaseMetric:", weatherOnWeek[1].moonPhaseMetric.getDisplayValue());
                    console.log("Day 1: suntimeMetric:", weatherOnWeek[1].suntimeMetric.getDisplayValue());
                    console.log();
                    console.log("Hour 09: cloudCoverMetric:", weatherOnWeek[0].hourQueryResults[9].cloudCoverMetric.getDisplayValue());
                    console.log("Hour 09: precipitationMetric:", weatherOnWeek[0].hourQueryResults[9].precipitationMetric.getDisplayValue());
                    console.log("Hour 09: temperatureMetric:", weatherOnWeek[0].hourQueryResults[9].temperatureMetric.getDisplayValue());
                    console.log();
                    weatherOnDay = WeatherAPI.queryWeatherThroughoutDay(location_1, 0);
                    console.log("Day 0: moonPhaseMetric:", weatherOnDay.moonPhaseMetric.getDisplayValue());
                    console.log("Day 0: suntimeMetric:", weatherOnDay.suntimeMetric.getDisplayValue());
                    console.log();
                    console.log("Hour 10: cloudCoverMetric:", weatherOnDay.hourQueryResults[10].cloudCoverMetric.getDisplayValue());
                    console.log("Hour 10: precipitationMetric:", weatherOnDay.hourQueryResults[10].precipitationMetric.getDisplayValue());
                    console.log("Hour 10: temperatureMetric:", weatherOnDay.hourQueryResults[10].temperatureMetric.getDisplayValue());
                    console.log();
                    weatherOnHour = WeatherAPI.queryWeatherOnHour(location_1, 0, 11);
                    console.log("Hour 11: cloudCoverMetric:", weatherOnHour.cloudCoverMetric.getDisplayValue());
                    console.log("Hour 11: precipitationMetric:", weatherOnHour.precipitationMetric.getDisplayValue());
                    console.log("Hour 11: temperatureMetric:", weatherOnHour.temperatureMetric.getDisplayValue());
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error:", error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
main();
