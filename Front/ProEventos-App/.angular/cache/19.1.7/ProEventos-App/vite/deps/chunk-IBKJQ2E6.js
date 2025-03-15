// node_modules/ngx-bootstrap/chronos/fesm2022/ngx-bootstrap-chronos.mjs
function mod(n, x) {
  return (n % x + x) % x;
}
function absFloor(num) {
  return num < 0 ? Math.ceil(num) || 0 : Math.floor(num);
}
function isString(str) {
  return typeof str === "string";
}
function isDate(value) {
  return value instanceof Date || Object.prototype.toString.call(value) === "[object Date]";
}
function isDateValid(date) {
  return date && date.getTime && !isNaN(date.getTime());
}
function isFunction(fn) {
  return fn instanceof Function || Object.prototype.toString.call(fn) === "[object Function]";
}
function isNumber(value) {
  return typeof value === "number" || Object.prototype.toString.call(value) === "[object Number]";
}
function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
}
function hasOwnProp(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
function isObject(input) {
  return input != null && Object.prototype.toString.call(input) === "[object Object]";
}
function isObjectEmpty(obj) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj).length === 0;
  }
  let k;
  for (k in obj) {
    if (obj.hasOwnProperty(k)) {
      return false;
    }
  }
  return true;
}
function isUndefined(input) {
  return input === void 0;
}
function toInt(argumentForCoercion) {
  const coercedNumber = +argumentForCoercion;
  let value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }
  return value;
}
var aliases = {};
var _mapUnits = {
  date: "day",
  hour: "hours",
  minute: "minutes",
  second: "seconds",
  millisecond: "milliseconds"
};
function addUnitAlias(unit, shorthand) {
  const lowerCase = unit.toLowerCase();
  let _unit = unit;
  if (lowerCase in _mapUnits) {
    _unit = _mapUnits[lowerCase];
  }
  aliases[lowerCase] = aliases[`${lowerCase}s`] = aliases[shorthand] = _unit;
}
function normalizeUnits(units2) {
  return isString(units2) ? aliases[units2] || aliases[units2.toLowerCase()] : void 0;
}
function normalizeObjectUnits(inputObject) {
  const normalizedInput = {};
  let normalizedProp;
  let prop;
  for (prop in inputObject) {
    if (hasOwnProp(inputObject, prop)) {
      normalizedProp = normalizeUnits(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }
  return normalizedInput;
}
var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;
function zeroFill(num, targetLength, forceSign) {
  const absNumber = `${Math.abs(num)}`;
  const zerosToFill = targetLength - absNumber.length;
  const sign = num >= 0;
  const _sign = sign ? forceSign ? "+" : "" : "-";
  const _zeros = Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1);
  return _sign + _zeros + absNumber;
}
var formatFunctions = {};
var formatTokenFunctions = {};
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
function addFormatToken(token, padded, ordinal, callback) {
  if (token) {
    formatTokenFunctions[token] = callback;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function() {
      return zeroFill(callback.apply(null, arguments), padded[1], padded[2]);
    };
  }
  if (ordinal) {
    formatTokenFunctions[ordinal] = function(date, opts) {
      return opts.locale.ordinal(callback.apply(null, arguments), token);
    };
  }
}
function makeFormatFunction(format) {
  const array = format.match(formattingTokens);
  const length = array.length;
  const formatArr = new Array(length);
  for (let i = 0; i < length; i++) {
    formatArr[i] = formatTokenFunctions[array[i]] ? formatTokenFunctions[array[i]] : removeFormattingTokens(array[i]);
  }
  return function(date, locale, isUTC, offset = 0) {
    let output = "";
    for (let j = 0; j < length; j++) {
      output += isFunction(formatArr[j]) ? formatArr[j].call(null, date, {
        format,
        locale,
        isUTC,
        offset
      }) : formatArr[j];
    }
    return output;
  };
}
function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function createUTCDate(y, m, d) {
  const date = new Date(Date.UTC.apply(null, arguments));
  if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
    date.setUTCFullYear(y);
  }
  return date;
}
function createDate(y, m = 0, d = 1, h = 0, M = 0, s = 0, ms = 0) {
  const date = new Date(y, m, d, h, M, s, ms);
  if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
    date.setFullYear(y);
  }
  return date;
}
function getHours(date, isUTC = false) {
  return isUTC ? date.getUTCHours() : date.getHours();
}
function getMinutes(date, isUTC = false) {
  return isUTC ? date.getUTCMinutes() : date.getMinutes();
}
function getSeconds(date, isUTC = false) {
  return isUTC ? date.getUTCSeconds() : date.getSeconds();
}
function getMilliseconds(date, isUTC = false) {
  return isUTC ? date.getUTCMilliseconds() : date.getMilliseconds();
}
function getTime(date) {
  return date.getTime();
}
function getDay(date, isUTC = false) {
  return isUTC ? date.getUTCDay() : date.getDay();
}
function getDate(date, isUTC = false) {
  return isUTC ? date.getUTCDate() : date.getDate();
}
function getMonth(date, isUTC = false) {
  return isUTC ? date.getUTCMonth() : date.getMonth();
}
function getFullYear(date, isUTC = false) {
  return isUTC ? date.getUTCFullYear() : date.getFullYear();
}
function unix(date) {
  return Math.floor(date.valueOf() / 1e3);
}
function getFirstDayOfMonth(date) {
  return createDate(date.getFullYear(), date.getMonth(), 1, date.getHours(), date.getMinutes(), date.getSeconds());
}
function isFirstDayOfWeek(date, firstDayOfWeek) {
  return date.getDay() === Number(firstDayOfWeek);
}
function isSameMonth(date1, date2) {
  if (!date1 || !date2) {
    return false;
  }
  return isSameYear(date1, date2) && getMonth(date1) === getMonth(date2);
}
function isSameYear(date1, date2) {
  if (!date1 || !date2) {
    return false;
  }
  return getFullYear(date1) === getFullYear(date2);
}
function isSameDay$1(date1, date2) {
  if (!date1 || !date2) {
    return false;
  }
  return isSameYear(date1, date2) && isSameMonth(date1, date2) && getDate(date1) === getDate(date2);
}
var match1 = /\d/;
var match2 = /\d\d/;
var match3 = /\d{3}/;
var match4 = /\d{4}/;
var match6 = /[+-]?\d{6}/;
var match1to2 = /\d\d?/;
var match3to4 = /\d\d\d\d?/;
var match5to6 = /\d\d\d\d\d\d?/;
var match1to3 = /\d{1,3}/;
var match1to4 = /\d{1,4}/;
var match1to6 = /[+-]?\d{1,6}/;
var matchUnsigned = /\d+/;
var matchSigned = /[+-]?\d+/;
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi;
var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/;
var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
var regexes = {};
function addRegexToken(token, regex, strictRegex) {
  if (isFunction(regex)) {
    regexes[token] = regex;
    return;
  }
  regexes[token] = function(isStrict, locale) {
    return isStrict && strictRegex ? strictRegex : regex;
  };
}
function getParseRegexForToken(token, locale) {
  const _strict = false;
  if (!hasOwnProp(regexes, token)) {
    return new RegExp(unescapeFormat(token));
  }
  return regexes[token](_strict, locale);
}
function unescapeFormat(str) {
  return regexEscape(str.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, (matched, p1, p2, p3, p4) => p1 || p2 || p3 || p4));
}
function regexEscape(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var tokens = {};
function addParseToken(token, callback) {
  const _token = isString(token) ? [token] : token;
  let func = callback;
  if (isNumber(callback)) {
    func = function(input, array, config) {
      array[callback] = toInt(input);
      return config;
    };
  }
  if (isArray(_token) && isFunction(func)) {
    let i;
    for (i = 0; i < _token.length; i++) {
      tokens[_token[i]] = func;
    }
  }
}
function addWeekParseToken(token, callback) {
  addParseToken(token, function(input, array, config, _token) {
    config._w = config._w || {};
    return callback(input, config._w, config, _token);
  });
}
function addTimeToArrayFromToken(token, input, config) {
  if (input != null && hasOwnProp(tokens, token)) {
    tokens[token](input, config._a, config, token);
  }
  return config;
}
var priorities = {};
function addUnitPriority(unit, priority) {
  priorities[unit] = priority;
}
function initDayOfMonth() {
  addFormatToken("D", ["DD", 2, false], "Do", function(date, opts) {
    return getDate(date, opts.isUTC).toString(10);
  });
  addUnitAlias("date", "D");
  addUnitPriority("date", 9);
  addRegexToken("D", match1to2);
  addRegexToken("DD", match1to2, match2);
  addRegexToken("Do", function(isStrict, locale) {
    return locale._dayOfMonthOrdinalParse || locale._ordinalParse;
  });
  addParseToken(["D", "DD"], DATE);
  addParseToken("Do", function(input, array, config) {
    array[DATE] = toInt(input.match(match1to2)[0]);
    return config;
  });
}
function defaultParsingFlags() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function getParsingFlags(config) {
  if (config._pf == null) {
    config._pf = defaultParsingFlags();
  }
  return config._pf;
}
function getYear(date, opts) {
  if (opts.locale.getFullYear) {
    return opts.locale.getFullYear(date, opts.isUTC).toString();
  }
  return getFullYear(date, opts.isUTC).toString();
}
function initYear() {
  addFormatToken("Y", null, null, function(date, opts) {
    const y = getFullYear(date, opts.isUTC);
    return y <= 9999 ? y.toString(10) : `+${y}`;
  });
  addFormatToken(null, ["YY", 2, false], null, function(date, opts) {
    return (getFullYear(date, opts.isUTC) % 100).toString(10);
  });
  addFormatToken(null, ["YYYY", 4, false], null, getYear);
  addFormatToken(null, ["YYYYY", 5, false], null, getYear);
  addFormatToken(null, ["YYYYYY", 6, true], null, getYear);
  addUnitAlias("year", "y");
  addUnitPriority("year", 1);
  addRegexToken("Y", matchSigned);
  addRegexToken("YY", match1to2, match2);
  addRegexToken("YYYY", match1to4, match4);
  addRegexToken("YYYYY", match1to6, match6);
  addRegexToken("YYYYYY", match1to6, match6);
  addParseToken(["YYYYY", "YYYYYY"], YEAR);
  addParseToken("YYYY", function(input, array, config) {
    array[YEAR] = input.length === 2 ? parseTwoDigitYear(input) : toInt(input);
    return config;
  });
  addParseToken("YY", function(input, array, config) {
    array[YEAR] = parseTwoDigitYear(input);
    return config;
  });
  addParseToken("Y", function(input, array, config) {
    array[YEAR] = parseInt(input, 10);
    return config;
  });
}
function parseTwoDigitYear(input) {
  return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
}
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function daysInMonth(year, month) {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  const modMonth = mod(month, 12);
  const _year = year + (month - modMonth) / 12;
  return modMonth === 1 ? isLeapYear(_year) ? 29 : 28 : 31 - modMonth % 7 % 2;
}
function initMonth() {
  addFormatToken("M", ["MM", 2, false], "Mo", function(date, opts) {
    return (getMonth(date, opts.isUTC) + 1).toString(10);
  });
  addFormatToken("MMM", null, null, function(date, opts) {
    return opts.locale.monthsShort(date, opts.format, opts.isUTC);
  });
  addFormatToken("MMMM", null, null, function(date, opts) {
    return opts.locale.months(date, opts.format, opts.isUTC);
  });
  addUnitAlias("month", "M");
  addUnitPriority("month", 8);
  addRegexToken("M", match1to2);
  addRegexToken("MM", match1to2, match2);
  addRegexToken("MMM", function(isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
  });
  addRegexToken("MMMM", function(isStrict, locale) {
    return locale.monthsRegex(isStrict);
  });
  addParseToken(["M", "MM"], function(input, array, config) {
    array[MONTH] = toInt(input) - 1;
    return config;
  });
  addParseToken(["MMM", "MMMM"], function(input, array, config, token) {
    const month = config._locale.monthsParse(input, token, config._strict);
    if (month != null) {
      array[MONTH] = month;
    } else {
      getParsingFlags(config).invalidMonth = !!input;
    }
    return config;
  });
}
var defaultTimeUnit = {
  year: 0,
  month: 0,
  day: 0,
  hour: 0,
  minute: 0,
  seconds: 0
};
function shiftDate(date, unit) {
  const _unit = Object.assign({}, defaultTimeUnit, unit);
  const year = date.getFullYear() + (_unit.year || 0);
  const month = date.getMonth() + (_unit.month || 0);
  let day = date.getDate() + (_unit.day || 0);
  if (_unit.month && !_unit.day) {
    day = Math.min(day, daysInMonth(year, month));
  }
  return createDate(year, month, day, date.getHours() + (_unit.hour || 0), date.getMinutes() + (_unit.minute || 0), date.getSeconds() + (_unit.seconds || 0));
}
function setFullDate(date, unit) {
  return createDate(
    getNum(date.getFullYear(), unit.year),
    getNum(date.getMonth(), unit.month),
    1,
    // day, to avoid issue with wrong months selection at the end of current month (#5371)
    getNum(date.getHours(), unit.hour),
    getNum(date.getMinutes(), unit.minute),
    getNum(date.getSeconds(), unit.seconds),
    getNum(date.getMilliseconds(), unit.milliseconds)
  );
}
function getNum(def, num) {
  return isNumber(num) ? num : def;
}
function setMonth(date, value, isUTC) {
  const dayOfMonth = Math.min(getDate(date), daysInMonth(getFullYear(date), value));
  isUTC ? date.setUTCMonth(value, dayOfMonth) : date.setMonth(value, dayOfMonth);
  return date;
}
function setHours(date, value, isUTC) {
  isUTC ? date.setUTCHours(value) : date.setHours(value);
  return date;
}
function setMinutes(date, value, isUTC) {
  isUTC ? date.setUTCMinutes(value) : date.setMinutes(value);
  return date;
}
function setSeconds(date, value, isUTC) {
  isUTC ? date.setUTCSeconds(value) : date.setSeconds(value);
  return date;
}
function setMilliseconds(date, value, isUTC) {
  isUTC ? date.setUTCMilliseconds(value) : date.setMilliseconds(value);
  return date;
}
function setDate(date, value, isUTC) {
  isUTC ? date.setUTCDate(value) : date.setDate(value);
  return date;
}
function setTime(date, value) {
  date.setTime(value);
  return date;
}
function cloneDate(date) {
  return new Date(date.getTime());
}
function startOf(date, unit, isUTC) {
  const _date = cloneDate(date);
  switch (unit) {
    case "year":
      setMonth(_date, 0, isUTC);
    /* falls through */
    case "quarter":
    case "month":
      setDate(_date, 1, isUTC);
    /* falls through */
    case "week":
    case "isoWeek":
    case "day":
    case "date":
      setHours(_date, 0, isUTC);
    /* falls through */
    case "hours":
      setMinutes(_date, 0, isUTC);
    /* falls through */
    case "minutes":
      setSeconds(_date, 0, isUTC);
    /* falls through */
    case "seconds":
      setMilliseconds(_date, 0, isUTC);
  }
  if (unit === "week") {
    setLocaleDayOfWeek(_date, 0, {
      isUTC
    });
  }
  if (unit === "isoWeek") {
    setISODayOfWeek(_date, 1);
  }
  if (unit === "quarter") {
    setMonth(_date, Math.floor(getMonth(_date, isUTC) / 3) * 3, isUTC);
  }
  return _date;
}
function endOf(date, unit, isUTC) {
  let _unit = unit;
  if (_unit === "date") {
    _unit = "day";
  }
  const start = startOf(date, _unit, isUTC);
  const _step = add(start, 1, _unit === "isoWeek" ? "week" : _unit, isUTC);
  const res = subtract(_step, 1, "milliseconds", isUTC);
  return res;
}
function initDayOfYear() {
  addFormatToken("DDD", ["DDDD", 3, false], "DDDo", function(date) {
    return getDayOfYear(date).toString(10);
  });
  addUnitAlias("dayOfYear", "DDD");
  addUnitPriority("dayOfYear", 4);
  addRegexToken("DDD", match1to3);
  addRegexToken("DDDD", match3);
  addParseToken(["DDD", "DDDD"], function(input, array, config) {
    config._dayOfYear = toInt(input);
    return config;
  });
}
function getDayOfYear(date, isUTC) {
  const date1 = +startOf(date, "day", isUTC);
  const date2 = +startOf(date, "year", isUTC);
  const someDate = date1 - date2;
  const oneDay = 1e3 * 60 * 60 * 24;
  return Math.round(someDate / oneDay) + 1;
}
function firstWeekOffset(year, dow, doy) {
  const fwd = dow - doy + 7;
  const fwdlw = (createUTCDate(year, 0, fwd).getUTCDay() - dow + 7) % 7;
  return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks(year, week2, weekday, dow, doy) {
  const localWeekday = (7 + weekday - dow) % 7;
  const weekOffset = firstWeekOffset(year, dow, doy);
  const dayOfYear = 1 + 7 * (week2 - 1) + localWeekday + weekOffset;
  let resYear;
  let resDayOfYear;
  if (dayOfYear <= 0) {
    resYear = year - 1;
    resDayOfYear = daysInYear(resYear) + dayOfYear;
  } else if (dayOfYear > daysInYear(year)) {
    resYear = year + 1;
    resDayOfYear = dayOfYear - daysInYear(year);
  } else {
    resYear = year;
    resDayOfYear = dayOfYear;
  }
  return {
    year: resYear,
    dayOfYear: resDayOfYear
  };
}
function weekOfYear(date, dow, doy, isUTC) {
  const weekOffset = firstWeekOffset(getFullYear(date, isUTC), dow, doy);
  const week2 = Math.floor((getDayOfYear(date, isUTC) - weekOffset - 1) / 7) + 1;
  let resWeek;
  let resYear;
  if (week2 < 1) {
    resYear = getFullYear(date, isUTC) - 1;
    resWeek = week2 + weeksInYear(resYear, dow, doy);
  } else if (week2 > weeksInYear(getFullYear(date, isUTC), dow, doy)) {
    resWeek = week2 - weeksInYear(getFullYear(date, isUTC), dow, doy);
    resYear = getFullYear(date, isUTC) + 1;
  } else {
    resYear = getFullYear(date, isUTC);
    resWeek = week2;
  }
  return {
    week: resWeek,
    year: resYear
  };
}
function weeksInYear(year, dow, doy) {
  const weekOffset = firstWeekOffset(year, dow, doy);
  const weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
  return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
var defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
var defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
var defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
var defaultLongDateFormat = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
var defaultOrdinal = "%d";
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;
var defaultMonthsShortRegex = matchWord;
var defaultMonthsRegex = matchWord;
var Locale = class {
  constructor(config) {
    if (config) {
      this.set(config);
    }
  }
  set(config) {
    let confKey;
    for (confKey in config) {
      if (!config.hasOwnProperty(confKey)) {
        continue;
      }
      const prop = config[confKey];
      const key = isFunction(prop) ? confKey : `_${confKey}`;
      this[key] = prop;
    }
    this._config = config;
  }
  calendar(key, date, now) {
    const output = this._calendar[key] || this._calendar["sameElse"];
    return isFunction(output) ? output.call(null, date, now) : output;
  }
  longDateFormat(key) {
    const format = this._longDateFormat[key];
    const formatUpper = this._longDateFormat[key.toUpperCase()];
    if (format || !formatUpper) {
      return format;
    }
    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function(val) {
      return val.slice(1);
    });
    return this._longDateFormat[key];
  }
  get invalidDate() {
    return this._invalidDate;
  }
  set invalidDate(val) {
    this._invalidDate = val;
  }
  ordinal(num, token) {
    return this._ordinal.replace("%d", num.toString(10));
  }
  preparse(str, format) {
    return str;
  }
  getFullYear(date, isUTC = false) {
    return getFullYear(date, isUTC);
  }
  postformat(str) {
    return str;
  }
  relativeTime(num, withoutSuffix, str, isFuture) {
    const output = this._relativeTime[str];
    return isFunction(output) ? output(num, withoutSuffix, str, isFuture) : output.replace(/%d/i, num.toString(10));
  }
  pastFuture(diff, output) {
    const format = this._relativeTime[diff > 0 ? "future" : "past"];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }
  months(date, format, isUTC = false) {
    if (!date) {
      return isArray(this._months) ? this._months : this._months.standalone;
    }
    if (isArray(this._months)) {
      return this._months[getMonth(date, isUTC)];
    }
    const key = (this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? "format" : "standalone";
    return this._months[key][getMonth(date, isUTC)];
  }
  monthsShort(date, format, isUTC = false) {
    if (!date) {
      return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
    }
    if (isArray(this._monthsShort)) {
      return this._monthsShort[getMonth(date, isUTC)];
    }
    const key = MONTHS_IN_FORMAT.test(format) ? "format" : "standalone";
    return this._monthsShort[key][getMonth(date, isUTC)];
  }
  monthsParse(monthName, format, strict) {
    let date;
    let regex;
    if (this._monthsParseExact) {
      return this.handleMonthStrictParse(monthName, format, strict);
    }
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    }
    let i;
    for (i = 0; i < 12; i++) {
      date = new Date(Date.UTC(2e3, i));
      if (strict && !this._longMonthsParse[i]) {
        const _months = this.months(date, "", true).replace(".", "");
        const _shortMonths = this.monthsShort(date, "", true).replace(".", "");
        this._longMonthsParse[i] = new RegExp(`^${_months}$`, "i");
        this._shortMonthsParse[i] = new RegExp(`^${_shortMonths}$`, "i");
      }
      if (!strict && !this._monthsParse[i]) {
        regex = `^${this.months(date, "", true)}|^${this.monthsShort(date, "", true)}`;
        this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
      }
      if (strict && format === "MMMM" && this._longMonthsParse[i].test(monthName)) {
        return i;
      }
      if (strict && format === "MMM" && this._shortMonthsParse[i].test(monthName)) {
        return i;
      }
      if (!strict && this._monthsParse[i].test(monthName)) {
        return i;
      }
    }
  }
  monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, "_monthsRegex")) {
        this.computeMonthsParse();
      }
      if (isStrict) {
        return this._monthsStrictRegex;
      }
      return this._monthsRegex;
    }
    if (!hasOwnProp(this, "_monthsRegex")) {
      this._monthsRegex = defaultMonthsRegex;
    }
    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  }
  monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, "_monthsRegex")) {
        this.computeMonthsParse();
      }
      if (isStrict) {
        return this._monthsShortStrictRegex;
      }
      return this._monthsShortRegex;
    }
    if (!hasOwnProp(this, "_monthsShortRegex")) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }
    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }
  /** Week */
  week(date, isUTC) {
    return weekOfYear(date, this._week.dow, this._week.doy, isUTC).week;
  }
  firstDayOfWeek() {
    return this._week.dow;
  }
  firstDayOfYear() {
    return this._week.doy;
  }
  weekdays(date, format, isUTC) {
    if (!date) {
      return isArray(this._weekdays) ? this._weekdays : this._weekdays.standalone;
    }
    if (isArray(this._weekdays)) {
      return this._weekdays[getDay(date, isUTC)];
    }
    const _key = this._weekdays.isFormat.test(format) ? "format" : "standalone";
    return this._weekdays[_key][getDay(date, isUTC)];
  }
  weekdaysMin(date, format, isUTC) {
    return date ? this._weekdaysMin[getDay(date, isUTC)] : this._weekdaysMin;
  }
  weekdaysShort(date, format, isUTC) {
    return date ? this._weekdaysShort[getDay(date, isUTC)] : this._weekdaysShort;
  }
  // proto.weekdaysParse  =        localeWeekdaysParse;
  weekdaysParse(weekdayName, format, strict) {
    let i;
    let regex;
    if (this._weekdaysParseExact) {
      return this.handleWeekStrictParse(weekdayName, format, strict);
    }
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }
    for (i = 0; i < 7; i++) {
      const date = setDayOfWeek(new Date(Date.UTC(2e3, 1)), i, null, true);
      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp(`^${this.weekdays(date, "", true).replace(".", ".?")}$`, "i");
        this._shortWeekdaysParse[i] = new RegExp(`^${this.weekdaysShort(date, "", true).replace(".", ".?")}$`, "i");
        this._minWeekdaysParse[i] = new RegExp(`^${this.weekdaysMin(date, "", true).replace(".", ".?")}$`, "i");
      }
      if (!this._weekdaysParse[i]) {
        regex = `^${this.weekdays(date, "", true)}|^${this.weekdaysShort(date, "", true)}|^${this.weekdaysMin(date, "", true)}`;
        this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
      }
      if (!isArray(this._fullWeekdaysParse) || !isArray(this._shortWeekdaysParse) || !isArray(this._minWeekdaysParse) || !isArray(this._weekdaysParse)) {
        return;
      }
      if (strict && format === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
        return i;
      }
    }
  }
  // proto.weekdaysRegex       =        weekdaysRegex;
  weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        this.computeWeekdaysParse();
      }
      if (isStrict) {
        return this._weekdaysStrictRegex;
      } else {
        return this._weekdaysRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        this._weekdaysRegex = matchWord;
      }
      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
  }
  // proto.weekdaysShortRegex  =        weekdaysShortRegex;
  // proto.weekdaysMinRegex    =        weekdaysMinRegex;
  weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        this.computeWeekdaysParse();
      }
      if (isStrict) {
        return this._weekdaysShortStrictRegex;
      } else {
        return this._weekdaysShortRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysShortRegex")) {
        this._weekdaysShortRegex = matchWord;
      }
      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
  }
  weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        this.computeWeekdaysParse();
      }
      if (isStrict) {
        return this._weekdaysMinStrictRegex;
      } else {
        return this._weekdaysMinRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysMinRegex")) {
        this._weekdaysMinRegex = matchWord;
      }
      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
  }
  isPM(input) {
    return input.toLowerCase().charAt(0) === "p";
  }
  meridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? "pm" : "PM";
    }
    return isLower ? "am" : "AM";
  }
  formatLongDate(key) {
    this._longDateFormat = this._longDateFormat ? this._longDateFormat : defaultLongDateFormat;
    const format = this._longDateFormat[key];
    const formatUpper = this._longDateFormat[key.toUpperCase()];
    if (format || !formatUpper) {
      return format;
    }
    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, (val) => {
      return val.slice(1);
    });
    return this._longDateFormat[key];
  }
  handleMonthStrictParse(monthName, format, strict) {
    const llc = monthName.toLocaleLowerCase();
    let i;
    let ii;
    let mom;
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
      for (i = 0; i < 12; ++i) {
        mom = new Date(2e3, i);
        this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
      }
    }
    if (strict) {
      if (format === "MMM") {
        ii = this._shortMonthsParse.indexOf(llc);
        return ii !== -1 ? ii : null;
      }
      ii = this._longMonthsParse.indexOf(llc);
      return ii !== -1 ? ii : null;
    }
    if (format === "MMM") {
      ii = this._shortMonthsParse.indexOf(llc);
      if (ii !== -1) {
        return ii;
      }
      ii = this._longMonthsParse.indexOf(llc);
      return ii !== -1 ? ii : null;
    }
    ii = this._longMonthsParse.indexOf(llc);
    if (ii !== -1) {
      return ii;
    }
    ii = this._shortMonthsParse.indexOf(llc);
    return ii !== -1 ? ii : null;
  }
  handleWeekStrictParse(weekdayName, format, strict) {
    let ii;
    const llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];
      let i;
      for (i = 0; i < 7; ++i) {
        const date = setDayOfWeek(new Date(Date.UTC(2e3, 1)), i, null, true);
        this._minWeekdaysParse[i] = this.weekdaysMin(date).toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(date).toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(date, "").toLocaleLowerCase();
      }
    }
    if (!isArray(this._weekdaysParse) || !isArray(this._shortWeekdaysParse) || !isArray(this._minWeekdaysParse)) {
      return;
    }
    if (strict) {
      if (format === "dddd") {
        ii = this._weekdaysParse.indexOf(llc);
        return ii !== -1 ? ii : null;
      } else if (format === "ddd") {
        ii = this._shortWeekdaysParse.indexOf(llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = this._minWeekdaysParse.indexOf(llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === "dddd") {
        ii = this._weekdaysParse.indexOf(llc);
        if (ii !== -1) {
          return ii;
        }
        ii = this._shortWeekdaysParse.indexOf(llc);
        if (ii !== -1) {
          return ii;
        }
        ii = this._minWeekdaysParse.indexOf(llc);
        return ii !== -1 ? ii : null;
      } else if (format === "ddd") {
        ii = this._shortWeekdaysParse.indexOf(llc);
        if (ii !== -1) {
          return ii;
        }
        ii = this._weekdaysParse.indexOf(llc);
        if (ii !== -1) {
          return ii;
        }
        ii = this._minWeekdaysParse.indexOf(llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = this._minWeekdaysParse.indexOf(llc);
        if (ii !== -1) {
          return ii;
        }
        ii = this._weekdaysParse.indexOf(llc);
        if (ii !== -1) {
          return ii;
        }
        ii = this._shortWeekdaysParse.indexOf(llc);
        return ii !== -1 ? ii : null;
      }
    }
  }
  computeMonthsParse() {
    const shortPieces = [];
    const longPieces = [];
    const mixedPieces = [];
    let date;
    let i;
    for (i = 0; i < 12; i++) {
      date = new Date(2e3, i);
      shortPieces.push(this.monthsShort(date, ""));
      longPieces.push(this.months(date, ""));
      mixedPieces.push(this.months(date, ""));
      mixedPieces.push(this.monthsShort(date, ""));
    }
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }
    this._monthsRegex = new RegExp(`^(${mixedPieces.join("|")})`, "i");
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp(`^(${longPieces.join("|")})`, "i");
    this._monthsShortStrictRegex = new RegExp(`^(${shortPieces.join("|")})`, "i");
  }
  computeWeekdaysParse() {
    const minPieces = [];
    const shortPieces = [];
    const longPieces = [];
    const mixedPieces = [];
    let i;
    for (i = 0; i < 7; i++) {
      const date = setDayOfWeek(new Date(Date.UTC(2e3, 1)), i, null, true);
      const minp = this.weekdaysMin(date);
      const shortp = this.weekdaysShort(date);
      const longp = this.weekdays(date);
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp);
    }
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }
    this._weekdaysRegex = new RegExp(`^(${mixedPieces.join("|")})`, "i");
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp(`^(${longPieces.join("|")})`, "i");
    this._weekdaysShortStrictRegex = new RegExp(`^(${shortPieces.join("|")})`, "i");
    this._weekdaysMinStrictRegex = new RegExp(`^(${minPieces.join("|")})`, "i");
  }
};
function cmpLenRev(a, b) {
  return b.length - a.length;
}
var defaultCalendar = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
var defaultInvalidDate = "Invalid date";
var defaultLocaleWeek = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 1st is the first week of the year.
};
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
var defaultRelativeTime = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
var baseConfig = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,
  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,
  week: defaultLocaleWeek,
  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,
  meridiemParse: defaultLocaleMeridiemParse
};
function compareArrays(array1, array2, dontConvert) {
  const len = Math.min(array1.length, array2.length);
  const lengthDiff = Math.abs(array1.length - array2.length);
  let diffs = 0;
  let i;
  for (i = 0; i < len; i++) {
    if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
      diffs++;
    }
  }
  return diffs + lengthDiff;
}
function initWeek() {
  addFormatToken("w", ["ww", 2, false], "wo", function(date, opts) {
    return getWeek(date, opts.locale).toString(10);
  });
  addFormatToken("W", ["WW", 2, false], "Wo", function(date) {
    return getISOWeek(date).toString(10);
  });
  addUnitAlias("week", "w");
  addUnitAlias("isoWeek", "W");
  addUnitPriority("week", 5);
  addUnitPriority("isoWeek", 5);
  addRegexToken("w", match1to2);
  addRegexToken("ww", match1to2, match2);
  addRegexToken("W", match1to2);
  addRegexToken("WW", match1to2, match2);
  addWeekParseToken(["w", "ww", "W", "WW"], function(input, week2, config, token) {
    week2[token.substr(0, 1)] = toInt(input);
    return config;
  });
}
function getWeek(date, locale = getLocale(), isUTC) {
  return locale.week(date, isUTC);
}
function getISOWeek(date, isUTC) {
  return weekOfYear(date, 1, 4, isUTC).week;
}
function initWeekYear() {
  addFormatToken(null, ["gg", 2, false], null, function(date, opts) {
    return (getWeekYear(date, opts.locale) % 100).toString();
  });
  addFormatToken(null, ["GG", 2, false], null, function(date) {
    return (getISOWeekYear(date) % 100).toString();
  });
  addWeekYearFormatToken("gggg", _getWeekYearFormatCb);
  addWeekYearFormatToken("ggggg", _getWeekYearFormatCb);
  addWeekYearFormatToken("GGGG", _getISOWeekYearFormatCb);
  addWeekYearFormatToken("GGGGG", _getISOWeekYearFormatCb);
  addUnitAlias("weekYear", "gg");
  addUnitAlias("isoWeekYear", "GG");
  addUnitPriority("weekYear", 1);
  addUnitPriority("isoWeekYear", 1);
  addRegexToken("G", matchSigned);
  addRegexToken("g", matchSigned);
  addRegexToken("GG", match1to2, match2);
  addRegexToken("gg", match1to2, match2);
  addRegexToken("GGGG", match1to4, match4);
  addRegexToken("gggg", match1to4, match4);
  addRegexToken("GGGGG", match1to6, match6);
  addRegexToken("ggggg", match1to6, match6);
  addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week2, config, token) {
    week2[token.substr(0, 2)] = toInt(input);
    return config;
  });
  addWeekParseToken(["gg", "GG"], function(input, week2, config, token) {
    week2[token] = parseTwoDigitYear(input);
    return config;
  });
}
function addWeekYearFormatToken(token, getter) {
  addFormatToken(null, [token, token.length, false], null, getter);
}
function _getWeekYearFormatCb(date, opts) {
  return getWeekYear(date, opts.locale).toString();
}
function _getISOWeekYearFormatCb(date) {
  return getISOWeekYear(date).toString();
}
function getWeekYear(date, locale = getLocale(), isUTC) {
  return weekOfYear(date, locale.firstDayOfWeek(), locale.firstDayOfYear(), isUTC).year;
}
function getISOWeekYear(date, isUTC) {
  return weekOfYear(date, 1, 4, isUTC).year;
}
function initTimezone() {
  addFormatToken("z", null, null, function(date, opts) {
    return opts.isUTC ? "UTC" : "";
  });
  addFormatToken("zz", null, null, function(date, opts) {
    return opts.isUTC ? "Coordinated Universal Time" : "";
  });
}
function initTimestamp() {
  addFormatToken("X", null, null, function(date) {
    return unix(date).toString(10);
  });
  addFormatToken("x", null, null, function(date) {
    return date.valueOf().toString(10);
  });
  addRegexToken("x", matchSigned);
  addRegexToken("X", matchTimestamp);
  addParseToken("X", function(input, array, config) {
    config._d = new Date(parseFloat(input) * 1e3);
    return config;
  });
  addParseToken("x", function(input, array, config) {
    config._d = new Date(toInt(input));
    return config;
  });
}
function initSecond() {
  addFormatToken("s", ["ss", 2, false], null, function(date, opts) {
    return getSeconds(date, opts.isUTC).toString(10);
  });
  addUnitAlias("second", "s");
  addUnitPriority("second", 15);
  addRegexToken("s", match1to2);
  addRegexToken("ss", match1to2, match2);
  addParseToken(["s", "ss"], SECOND);
}
function initQuarter() {
  addFormatToken("Q", null, "Qo", function(date, opts) {
    return getQuarter(date, opts.isUTC).toString(10);
  });
  addUnitAlias("quarter", "Q");
  addUnitPriority("quarter", 7);
  addRegexToken("Q", match1);
  addParseToken("Q", function(input, array, config) {
    array[MONTH] = (toInt(input) - 1) * 3;
    return config;
  });
}
function getQuarter(date, isUTC = false) {
  return Math.ceil((getMonth(date, isUTC) + 1) / 3);
}
function addOffsetFormatToken(token, separator) {
  addFormatToken(token, null, null, function(date, config) {
    let offset = getUTCOffset(date, {
      _isUTC: config.isUTC,
      _offset: config.offset
    });
    let sign = "+";
    if (offset < 0) {
      offset = -offset;
      sign = "-";
    }
    return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
  });
}
function initOffset() {
  addOffsetFormatToken("Z", ":");
  addOffsetFormatToken("ZZ", "");
  addRegexToken("Z", matchShortOffset);
  addRegexToken("ZZ", matchShortOffset);
  addParseToken(["Z", "ZZ"], function(input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
    return config;
  });
}
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher, str) {
  const matches = (str || "").match(matcher);
  if (matches === null) {
    return null;
  }
  const chunk = matches[matches.length - 1];
  const parts = chunk.match(chunkOffset) || ["-", "0", "0"];
  const minutes = parseInt(parts[1], 10) * 60 + toInt(parts[2]);
  const _min = parts[0] === "+" ? minutes : -minutes;
  return minutes === 0 ? 0 : _min;
}
function cloneWithOffset(input, date, config = {}) {
  if (!config._isUTC) {
    return input;
  }
  const res = cloneDate(date);
  const offsetDiff = (config._offset || 0) * 6e4;
  const diff = input.valueOf() - res.valueOf() + offsetDiff;
  res.setTime(res.valueOf() + diff);
  return res;
}
function getDateOffset(date) {
  return -Math.round(date.getTimezoneOffset() / 15) * 15;
}
function getUTCOffset(date, config = {}) {
  const _offset = config._offset || 0;
  return config._isUTC ? _offset : getDateOffset(date);
}
function initMinute() {
  addFormatToken("m", ["mm", 2, false], null, function(date, opts) {
    return getMinutes(date, opts.isUTC).toString(10);
  });
  addUnitAlias("minute", "m");
  addUnitPriority("minute", 14);
  addRegexToken("m", match1to2);
  addRegexToken("mm", match1to2, match2);
  addParseToken(["m", "mm"], MINUTE);
}
function initMillisecond() {
  addFormatToken("S", null, null, function(date, opts) {
    return (~~(getMilliseconds(date, opts.isUTC) / 100)).toString(10);
  });
  addFormatToken(null, ["SS", 2, false], null, function(date, opts) {
    return (~~(getMilliseconds(date, opts.isUTC) / 10)).toString(10);
  });
  addFormatToken(null, ["SSS", 3, false], null, function(date, opts) {
    return getMilliseconds(date, opts.isUTC).toString(10);
  });
  addFormatToken(null, ["SSSS", 4, false], null, function(date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 10).toString(10);
  });
  addFormatToken(null, ["SSSSS", 5, false], null, function(date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 100).toString(10);
  });
  addFormatToken(null, ["SSSSSS", 6, false], null, function(date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 1e3).toString(10);
  });
  addFormatToken(null, ["SSSSSSS", 7, false], null, function(date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 1e4).toString(10);
  });
  addFormatToken(null, ["SSSSSSSS", 8, false], null, function(date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 1e5).toString(10);
  });
  addFormatToken(null, ["SSSSSSSSS", 9, false], null, function(date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 1e6).toString(10);
  });
  addUnitAlias("millisecond", "ms");
  addUnitPriority("millisecond", 16);
  addRegexToken("S", match1to3, match1);
  addRegexToken("SS", match1to3, match2);
  addRegexToken("SSS", match1to3, match3);
  let token;
  for (token = "SSSS"; token.length <= 9; token += "S") {
    addRegexToken(token, matchUnsigned);
  }
  function parseMs(input, array, config) {
    array[MILLISECOND] = toInt(parseFloat(`0.${input}`) * 1e3);
    return config;
  }
  for (token = "S"; token.length <= 9; token += "S") {
    addParseToken(token, parseMs);
  }
}
function initHour() {
  function hFormat(date, isUTC) {
    return getHours(date, isUTC) % 12 || 12;
  }
  function kFormat(date, isUTC) {
    return getHours(date, isUTC) || 24;
  }
  addFormatToken("H", ["HH", 2, false], null, function(date, opts) {
    return getHours(date, opts.isUTC).toString(10);
  });
  addFormatToken("h", ["hh", 2, false], null, function(date, opts) {
    return hFormat(date, opts.isUTC).toString(10);
  });
  addFormatToken("k", ["kk", 2, false], null, function(date, opts) {
    return kFormat(date, opts.isUTC).toString(10);
  });
  addFormatToken("hmm", null, null, function(date, opts) {
    const _h = hFormat(date, opts.isUTC);
    const _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
    return `${_h}${_mm}`;
  });
  addFormatToken("hmmss", null, null, function(date, opts) {
    const _h = hFormat(date, opts.isUTC);
    const _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
    const _ss = zeroFill(getSeconds(date, opts.isUTC), 2);
    return `${_h}${_mm}${_ss}`;
  });
  addFormatToken("Hmm", null, null, function(date, opts) {
    const _H = getHours(date, opts.isUTC);
    const _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
    return `${_H}${_mm}`;
  });
  addFormatToken("Hmmss", null, null, function(date, opts) {
    const _H = getHours(date, opts.isUTC);
    const _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
    const _ss = zeroFill(getSeconds(date, opts.isUTC), 2);
    return `${_H}${_mm}${_ss}`;
  });
  function meridiem(token, lowercase) {
    addFormatToken(token, null, null, function(date, opts) {
      return opts.locale.meridiem(getHours(date, opts.isUTC), getMinutes(date, opts.isUTC), lowercase);
    });
  }
  meridiem("a", true);
  meridiem("A", false);
  addUnitAlias("hour", "h");
  addUnitPriority("hour", 13);
  function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
  }
  addRegexToken("a", matchMeridiem);
  addRegexToken("A", matchMeridiem);
  addRegexToken("H", match1to2);
  addRegexToken("h", match1to2);
  addRegexToken("k", match1to2);
  addRegexToken("HH", match1to2, match2);
  addRegexToken("hh", match1to2, match2);
  addRegexToken("kk", match1to2, match2);
  addRegexToken("hmm", match3to4);
  addRegexToken("hmmss", match5to6);
  addRegexToken("Hmm", match3to4);
  addRegexToken("Hmmss", match5to6);
  addParseToken(["H", "HH"], HOUR);
  addParseToken(["k", "kk"], function(input, array, config) {
    const kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
    return config;
  });
  addParseToken(["a", "A"], function(input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
    return config;
  });
  addParseToken(["h", "hh"], function(input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
    return config;
  });
  addParseToken("hmm", function(input, array, config) {
    const pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
    return config;
  });
  addParseToken("hmmss", function(input, array, config) {
    const pos1 = input.length - 4;
    const pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
    return config;
  });
  addParseToken("Hmm", function(input, array, config) {
    const pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    return config;
  });
  addParseToken("Hmmss", function(input, array, config) {
    const pos1 = input.length - 4;
    const pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    return config;
  });
}
var locales = {};
var localeFamilies = {};
var globalLocale;
function normalizeLocale(key) {
  return key ? key.toLowerCase().replace("_", "-") : key;
}
function chooseLocale(names) {
  let next;
  let locale;
  let i = 0;
  while (i < names.length) {
    const split = normalizeLocale(names[i]).split("-");
    let j = split.length;
    next = normalizeLocale(names[i + 1]);
    next = next ? next.split("-") : null;
    while (j > 0) {
      locale = loadLocale(split.slice(0, j).join("-"));
      if (locale) {
        return locale;
      }
      if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
        break;
      }
      j--;
    }
    i++;
  }
  return null;
}
function mergeConfigs(parentConfig, childConfig) {
  const res = Object.assign({}, parentConfig);
  for (const childProp in childConfig) {
    if (!hasOwnProp(childConfig, childProp)) {
      continue;
    }
    if (isObject(parentConfig[childProp]) && isObject(childConfig[childProp])) {
      res[childProp] = {};
      Object.assign(res[childProp], parentConfig[childProp]);
      Object.assign(res[childProp], childConfig[childProp]);
    } else if (childConfig[childProp] != null) {
      res[childProp] = childConfig[childProp];
    } else {
      delete res[childProp];
    }
  }
  for (const parentProp in parentConfig) {
    if (hasOwnProp(parentConfig, parentProp) && !hasOwnProp(childConfig, parentProp) && isObject(parentConfig[parentProp])) {
      res[parentProp] = Object.assign({}, res[parentProp]);
    }
  }
  return res;
}
function loadLocale(name) {
  if (!locales[name]) {
    console.error(`Khronos locale error: please load locale "${name}" before using it`);
  }
  return locales[name];
}
function getSetGlobalLocale(key, values) {
  let data;
  if (key) {
    if (isUndefined(values)) {
      data = getLocale(key);
    } else if (isString(key)) {
      data = defineLocale(key, values);
    }
    if (data) {
      globalLocale = data;
    }
  }
  return globalLocale && globalLocale._abbr;
}
function defineLocale(name, config) {
  if (config === null) {
    delete locales[name];
    globalLocale = getLocale("en");
    return null;
  }
  if (!config) {
    return;
  }
  let parentConfig = baseConfig;
  config.abbr = name;
  if (config.parentLocale != null) {
    if (locales[config.parentLocale] != null) {
      parentConfig = locales[config.parentLocale]._config;
    } else {
      if (!localeFamilies[config.parentLocale]) {
        localeFamilies[config.parentLocale] = [];
      }
      localeFamilies[config.parentLocale].push({
        name,
        config
      });
      return null;
    }
  }
  locales[name] = new Locale(mergeConfigs(parentConfig, config));
  if (localeFamilies[name]) {
    localeFamilies[name].forEach(function(x) {
      defineLocale(x.name, x.config);
    });
  }
  getSetGlobalLocale(name);
  return locales[name];
}
function updateLocale(name, config) {
  let _config = config;
  if (_config != null) {
    let parentConfig = baseConfig;
    const tmpLocale = loadLocale(name);
    if (tmpLocale != null) {
      parentConfig = tmpLocale._config;
    }
    _config = mergeConfigs(parentConfig, _config);
    const locale = new Locale(_config);
    locale.parentLocale = locales[name];
    locales[name] = locale;
    getSetGlobalLocale(name);
  } else {
    if (locales[name] != null) {
      if (locales[name].parentLocale != null) {
        locales[name] = locales[name].parentLocale;
      } else if (locales[name] != null) {
        delete locales[name];
      }
    }
  }
  return locales[name];
}
function getLocale(key) {
  setDefaultLocale();
  if (!key) {
    return globalLocale;
  }
  const _key = isArray(key) ? key : [key];
  return chooseLocale(_key);
}
function listLocales() {
  return Object.keys(locales);
}
function setDefaultLocale() {
  if (locales[`en`]) {
    return void 0;
  }
  getSetGlobalLocale("en", {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal(num) {
      const b = num % 10;
      const output = toInt(num % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
      return num + output;
    }
  });
  initWeek();
  initWeekYear();
  initYear();
  initTimezone();
  initTimestamp();
  initSecond();
  initQuarter();
  initOffset();
  initMonth();
  initMinute();
  initMillisecond();
  initHour();
  initDayOfYear();
  initDayOfWeek();
  initDayOfMonth();
}
var ordering = ["year", "quarter", "month", "week", "day", "hours", "minutes", "seconds", "milliseconds"];
var orderingHash = ordering.reduce((mem, order) => {
  mem[order] = true;
  return mem;
}, {});
function isDurationValid(duration) {
  const durationKeys = Object.keys(duration);
  if (durationKeys.some((key) => {
    return key in orderingHash && duration[key] === null || isNaN(duration[key]);
  })) {
    return false;
  }
  let unitHasDecimal = false;
  for (let i = 0; i < ordering.length; ++i) {
    if (duration[ordering[i]]) {
      if (unitHasDecimal) {
        return false;
      }
      if (duration[ordering[i]] !== toInt(duration[ordering[i]])) {
        unitHasDecimal = true;
      }
    }
  }
  return true;
}
function absCeil(number) {
  return number < 0 ? Math.floor(number) : Math.ceil(number);
}
function bubble(dur) {
  let milliseconds = dur._milliseconds;
  let days = dur._days;
  let months2 = dur._months;
  const data = dur._data;
  if (!(milliseconds >= 0 && days >= 0 && months2 >= 0 || milliseconds <= 0 && days <= 0 && months2 <= 0)) {
    milliseconds += absCeil(monthsToDays(months2) + days) * 864e5;
    days = 0;
    months2 = 0;
  }
  data.milliseconds = milliseconds % 1e3;
  const seconds = absFloor(milliseconds / 1e3);
  data.seconds = seconds % 60;
  const minutes = absFloor(seconds / 60);
  data.minutes = minutes % 60;
  const hours = absFloor(minutes / 60);
  data.hours = hours % 24;
  days += absFloor(hours / 24);
  const monthsFromDays = absFloor(daysToMonths(days));
  months2 += monthsFromDays;
  days -= absCeil(monthsToDays(monthsFromDays));
  const years = absFloor(months2 / 12);
  months2 %= 12;
  data.day = days;
  data.month = months2;
  data.year = years;
  return dur;
}
function daysToMonths(day) {
  return day * 4800 / 146097;
}
function monthsToDays(month) {
  return month * 146097 / 4800;
}
var round = Math.round;
var thresholds = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month
  M: 11
  // months to year
};
function substituteTimeAgo(str, num, withoutSuffix, isFuture, locale) {
  return locale.relativeTime(num || 1, !!withoutSuffix, str, isFuture);
}
function relativeTime(posNegDuration, withoutSuffix, locale) {
  const duration = createDuration(posNegDuration).abs();
  const seconds = round(duration.as("s"));
  const minutes = round(duration.as("m"));
  const hours = round(duration.as("h"));
  const days = round(duration.as("d"));
  const months2 = round(duration.as("M"));
  const years = round(duration.as("y"));
  const a = seconds <= thresholds["ss"] && ["s", seconds] || seconds < thresholds["s"] && ["ss", seconds] || minutes <= 1 && ["m"] || minutes < thresholds["m"] && ["mm", minutes] || hours <= 1 && ["h"] || hours < thresholds["h"] && ["hh", hours] || days <= 1 && ["d"] || days < thresholds["d"] && ["dd", days] || months2 <= 1 && ["M"] || months2 < thresholds["M"] && ["MM", months2] || years <= 1 && ["y"] || ["yy", years];
  const b = [a[0], a[1], withoutSuffix, +posNegDuration > 0, locale];
  return substituteTimeAgo.apply(null, b);
}
var Duration = class {
  constructor(duration, config = {}) {
    this._data = {};
    this._locale = getLocale();
    this._locale = config && config._locale || getLocale();
    const normalizedInput = duration;
    const years = normalizedInput.year || 0;
    const quarters = normalizedInput.quarter || 0;
    const months2 = normalizedInput.month || 0;
    const weeks = normalizedInput.week || 0;
    const days = normalizedInput.day || 0;
    const hours = normalizedInput.hours || 0;
    const minutes = normalizedInput.minutes || 0;
    const seconds = normalizedInput.seconds || 0;
    const milliseconds = normalizedInput.milliseconds || 0;
    this._isValid = isDurationValid(normalizedInput);
    this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 60 * 1e3 + // 1000 * 60
    hours * 1e3 * 60 * 60;
    this._days = +days + weeks * 7;
    this._months = +months2 + quarters * 3 + years * 12;
    return bubble(this);
  }
  isValid() {
    return this._isValid;
  }
  humanize(withSuffix) {
    if (!this.isValid()) {
      return this.localeData().invalidDate;
    }
    const locale = this.localeData();
    let output = relativeTime(this, !withSuffix, locale);
    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }
    return locale.postformat(output);
  }
  localeData() {
    return this._locale;
  }
  locale(localeKey) {
    if (!localeKey) {
      return this._locale._abbr;
    }
    this._locale = getLocale(localeKey) || this._locale;
    return this;
  }
  abs() {
    const mathAbs = Math.abs;
    const data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.month = mathAbs(data.month);
    data.year = mathAbs(data.year);
    return this;
  }
  as(_units) {
    if (!this.isValid()) {
      return NaN;
    }
    let days;
    let months2;
    const milliseconds = this._milliseconds;
    const units2 = normalizeUnits(_units);
    if (units2 === "month" || units2 === "year") {
      days = this._days + milliseconds / 864e5;
      months2 = this._months + daysToMonths(days);
      return units2 === "month" ? months2 : months2 / 12;
    }
    days = this._days + Math.round(monthsToDays(this._months));
    switch (units2) {
      case "week":
        return days / 7 + milliseconds / 6048e5;
      case "day":
        return days + milliseconds / 864e5;
      case "hours":
        return days * 24 + milliseconds / 36e5;
      case "minutes":
        return days * 1440 + milliseconds / 6e4;
      case "seconds":
        return days * 86400 + milliseconds / 1e3;
      // Math.floor prevents floating point math errors here
      case "milliseconds":
        return Math.floor(days * 864e5) + milliseconds;
      default:
        throw new Error(`Unknown unit ${units2}`);
    }
  }
  valueOf() {
    if (!this.isValid()) {
      return NaN;
    }
    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
  }
};
function isDuration(obj) {
  return obj instanceof Duration;
}
function isValid(config) {
  if (config._isValid == null) {
    const flags = getParsingFlags(config);
    const parsedParts = Array.prototype.some.call(flags.parsedDateParts, function(i) {
      return i != null;
    });
    let isNowValid = !isNaN(config._d && config._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
    if (config._strict) {
      isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
    }
    if (Object.isFrozen == null || !Object.isFrozen(config)) {
      config._isValid = isNowValid;
    } else {
      return isNowValid;
    }
  }
  return config._isValid;
}
function createInvalid(config, flags) {
  config._d = /* @__PURE__ */ new Date(NaN);
  Object.assign(getParsingFlags(config), flags || {
    userInvalidated: true
  });
  return config;
}
function markInvalid(config) {
  config._isValid = false;
  return config;
}
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
var isoDates = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/, true],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/, true],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/, true],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/, true],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/, true],
  ["YYYYMMDD", /\d{8}/, true],
  // YYYYMM is NOT allowed by the standard
  ["GGGG[W]WWE", /\d{4}W\d{3}/, true],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/, true]
];
var isoTimes = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]];
var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
var obsOffsets = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
function configFromISO(config) {
  if (!isString(config._i)) {
    return config;
  }
  const input = config._i;
  const match = extendedIsoRegex.exec(input) || basicIsoRegex.exec(input);
  let allowTime;
  let dateFormat;
  let timeFormat;
  let tzFormat;
  if (!match) {
    config._isValid = false;
    return config;
  }
  let i;
  let l;
  for (i = 0, l = isoDates.length; i < l; i++) {
    if (isoDates[i][1].exec(match[1])) {
      dateFormat = isoDates[i][0];
      allowTime = isoDates[i][2] !== false;
      break;
    }
  }
  if (dateFormat == null) {
    config._isValid = false;
    return config;
  }
  if (match[3]) {
    for (i = 0, l = isoTimes.length; i < l; i++) {
      if (isoTimes[i][1].exec(match[3])) {
        timeFormat = (match[2] || " ") + isoTimes[i][0];
        break;
      }
    }
    if (timeFormat == null) {
      config._isValid = false;
      return config;
    }
  }
  if (!allowTime && timeFormat != null) {
    config._isValid = false;
    return config;
  }
  if (match[4]) {
    if (tzRegex.exec(match[4])) {
      tzFormat = "Z";
    } else {
      config._isValid = false;
      return config;
    }
  }
  config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
  return configFromStringAndFormat(config);
}
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  const result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];
  if (secondStr) {
    result.push(parseInt(secondStr, 10));
  }
  return result;
}
function untruncateYear(yearStr) {
  const year = parseInt(yearStr, 10);
  return year <= 49 ? year + 2e3 : year;
}
function preprocessRFC2822(str) {
  return str.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
function checkWeekday(weekdayStr, parsedInput, config) {
  if (weekdayStr) {
    const weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr);
    const weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
    if (weekdayProvided !== weekdayActual) {
      getParsingFlags(config).weekdayMismatch = true;
      config._isValid = false;
      return false;
    }
  }
  return true;
}
function calculateOffset(obsOffset, militaryOffset, numOffset) {
  if (obsOffset) {
    return obsOffsets[obsOffset];
  } else if (militaryOffset) {
    return 0;
  } else {
    const hm = parseInt(numOffset, 10);
    const m = hm % 100;
    const h = (hm - m) / 100;
    return h * 60 + m;
  }
}
function configFromRFC2822(config) {
  if (!isString(config._i)) {
    return config;
  }
  const match = rfc2822.exec(preprocessRFC2822(config._i));
  if (!match) {
    return markInvalid(config);
  }
  const parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
  if (!checkWeekday(match[1], parsedArray, config)) {
    return config;
  }
  config._a = parsedArray;
  config._tzm = calculateOffset(match[8], match[9], match[10]);
  config._d = createUTCDate.apply(null, config._a);
  config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  getParsingFlags(config).rfc2822 = true;
  return config;
}
function configFromString(config) {
  if (!isString(config._i)) {
    return config;
  }
  const matched = aspNetJsonRegex.exec(config._i);
  if (matched !== null) {
    config._d = /* @__PURE__ */ new Date(+matched[1]);
    return config;
  }
  configFromISO(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return config;
  }
  configFromRFC2822(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return config;
  }
  return createInvalid(config);
}
function formatDate(date, format, locale, isUTC, offset = 0) {
  const _locale = getLocale(locale || "en");
  if (!_locale) {
    throw new Error(`Locale "${locale}" is not defined, please add it with "defineLocale(...)"`);
  }
  const _format = format || (isUTC ? "YYYY-MM-DDTHH:mm:ss[Z]" : "YYYY-MM-DDTHH:mm:ssZ");
  const output = formatMoment(date, _format, _locale, isUTC, offset);
  if (!output) {
    return output;
  }
  return _locale.postformat(output);
}
function formatMoment(date, _format, locale, isUTC, offset = 0) {
  if (!isDateValid(date)) {
    return locale.invalidDate;
  }
  const format = expandFormat(_format, locale);
  formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
  return formatFunctions[format](date, locale, isUTC, offset);
}
function expandFormat(_format, locale) {
  let format = _format;
  let i = 5;
  const localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
  const replaceLongDateFormatTokens = (input) => {
    return locale.formatLongDate(input) || input;
  };
  localFormattingTokens.lastIndex = 0;
  while (i >= 0 && localFormattingTokens.test(format)) {
    format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
    localFormattingTokens.lastIndex = 0;
    i -= 1;
  }
  return format;
}
function defaults(a, b, c) {
  if (a != null) {
    return a;
  }
  if (b != null) {
    return b;
  }
  return c;
}
function currentDateArray(config) {
  const nowValue = /* @__PURE__ */ new Date();
  if (config._useUTC) {
    return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
  }
  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
function configFromArray(config) {
  const input = [];
  let i;
  let date;
  let yearToUse;
  if (config._d) {
    return config;
  }
  const currentDate = currentDateArray(config);
  if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
    dayOfYearFromWeekInfo(config);
  }
  if (config._dayOfYear != null) {
    yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
    if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
      getParsingFlags(config)._overflowDayOfYear = true;
    }
    date = new Date(Date.UTC(yearToUse, 0, config._dayOfYear));
    config._a[MONTH] = date.getUTCMonth();
    config._a[DATE] = date.getUTCDate();
  }
  for (i = 0; i < 3 && config._a[i] == null; ++i) {
    config._a[i] = input[i] = currentDate[i];
  }
  for (; i < 7; i++) {
    config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
  }
  if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
    config._nextDay = true;
    config._a[HOUR] = 0;
  }
  config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
  const expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
  if (config._tzm != null) {
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  }
  if (config._nextDay) {
    config._a[HOUR] = 24;
  }
  if (config._w && typeof config._w["d"] !== "undefined" && config._w["d"] !== expectedWeekday) {
    getParsingFlags(config).weekdayMismatch = true;
  }
  return config;
}
function dayOfYearFromWeekInfo(config) {
  let weekYear, week2, weekday, dow, doy, temp, weekdayOverflow;
  const w = config._w;
  if (w["GG"] != null || w["W"] != null || w["E"] != null) {
    dow = 1;
    doy = 4;
    weekYear = defaults(w["GG"], config._a[YEAR], weekOfYear(/* @__PURE__ */ new Date(), 1, 4).year);
    week2 = defaults(w["W"], 1);
    weekday = defaults(w["E"], 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config._locale._week.dow;
    doy = config._locale._week.doy;
    const curWeek = weekOfYear(/* @__PURE__ */ new Date(), dow, doy);
    weekYear = defaults(w["gg"], config._a[YEAR], curWeek.year);
    week2 = defaults(w["w"], curWeek.week);
    if (w["d"] != null) {
      weekday = w["d"];
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w["e"] != null) {
      weekday = w["e"] + dow;
      if (w["e"] < 0 || w["e"] > 6) {
        weekdayOverflow = true;
      }
    } else {
      weekday = dow;
    }
  }
  if (week2 < 1 || week2 > weeksInYear(weekYear, dow, doy)) {
    getParsingFlags(config)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags(config)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks(weekYear, week2, weekday, dow, doy);
    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }
  return config;
}
function checkOverflow(config) {
  let overflow;
  const a = config._a;
  if (a && getParsingFlags(config).overflow === -2) {
    overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
    if (getParsingFlags(config)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
      overflow = DATE;
    }
    if (getParsingFlags(config)._overflowWeeks && overflow === -1) {
      overflow = WEEK;
    }
    if (getParsingFlags(config)._overflowWeekday && overflow === -1) {
      overflow = WEEKDAY;
    }
    getParsingFlags(config).overflow = overflow;
  }
  return config;
}
var ISO_8601 = "ISO_8601";
var RFC_2822 = "RFC_2822";
function configFromStringAndFormat(config) {
  if (config._f === ISO_8601) {
    return configFromISO(config);
  }
  if (config._f === RFC_2822) {
    return configFromRFC2822(config);
  }
  config._a = [];
  getParsingFlags(config).empty = true;
  if (isArray(config._f) || !config._i && config._i !== 0) {
    return config;
  }
  let input = config._i.toString();
  let totalParsedInputLength = 0;
  const inputLength = input.length;
  const tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
  let i;
  let token;
  let parsedInput;
  let skipped;
  for (i = 0; i < tokens2.length; i++) {
    token = tokens2[i];
    parsedInput = (input.match(getParseRegexForToken(token, config._locale)) || [])[0];
    if (parsedInput) {
      skipped = input.substr(0, input.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags(config).unusedInput.push(skipped);
      }
      input = input.slice(input.indexOf(parsedInput) + parsedInput.length);
      totalParsedInputLength += parsedInput.length;
    }
    if (formatTokenFunctions[token]) {
      if (parsedInput) {
        getParsingFlags(config).empty = false;
      } else {
        getParsingFlags(config).unusedTokens.push(token);
      }
      addTimeToArrayFromToken(token, parsedInput, config);
    } else if (config._strict && !parsedInput) {
      getParsingFlags(config).unusedTokens.push(token);
    }
  }
  getParsingFlags(config).charsLeftOver = inputLength - totalParsedInputLength;
  if (input.length > 0) {
    getParsingFlags(config).unusedInput.push(input);
  }
  if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
    getParsingFlags(config).bigHour = void 0;
  }
  getParsingFlags(config).parsedDateParts = config._a.slice(0);
  getParsingFlags(config).meridiem = config._meridiem;
  config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
  configFromArray(config);
  return checkOverflow(config);
}
function meridiemFixWrap(locale, _hour, meridiem) {
  let hour = _hour;
  if (meridiem == null) {
    return hour;
  }
  if (locale.meridiemHour != null) {
    return locale.meridiemHour(hour, meridiem);
  }
  if (locale.isPM == null) {
    return hour;
  }
  const isPm = locale.isPM(meridiem);
  if (isPm && hour < 12) {
    hour += 12;
  }
  if (!isPm && hour === 12) {
    hour = 0;
  }
  return hour;
}
function configFromStringAndArray(config) {
  let tempConfig;
  let bestMoment;
  let scoreToBeat;
  let currentScore;
  if (!config._f || config._f.length === 0) {
    getParsingFlags(config).invalidFormat = true;
    return createInvalid(config);
  }
  let i;
  for (i = 0; i < config._f.length; i++) {
    currentScore = 0;
    tempConfig = Object.assign({}, config);
    if (config._useUTC != null) {
      tempConfig._useUTC = config._useUTC;
    }
    tempConfig._f = config._f[i];
    configFromStringAndFormat(tempConfig);
    if (!isValid(tempConfig)) {
      continue;
    }
    currentScore += getParsingFlags(tempConfig).charsLeftOver;
    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
    getParsingFlags(tempConfig).score = currentScore;
    if (scoreToBeat == null || currentScore < scoreToBeat) {
      scoreToBeat = currentScore;
      bestMoment = tempConfig;
    }
  }
  return Object.assign(config, bestMoment || tempConfig);
}
function configFromObject(config) {
  if (config._d) {
    return config;
  }
  const input = config._i;
  if (isObject(input)) {
    const i = normalizeObjectUnits(input);
    config._a = [i.year, i.month, i.day, i.hours, i.minutes, i.seconds, i.milliseconds].map((obj) => isString(obj) ? parseInt(obj, 10) : obj);
  }
  return configFromArray(config);
}
function createFromConfig(config) {
  const res = checkOverflow(prepareConfig(config));
  res._d = new Date(res._d != null ? res._d.getTime() : NaN);
  if (!isValid(Object.assign({}, res, {
    _isValid: null
  }))) {
    res._d = /* @__PURE__ */ new Date(NaN);
  }
  return res;
}
function prepareConfig(config) {
  let input = config._i;
  const format = config._f;
  config._locale = config._locale || getLocale(config._l);
  if (input === null || format === void 0 && input === "") {
    return createInvalid(config, {
      nullInput: true
    });
  }
  if (isString(input)) {
    config._i = input = config._locale.preparse(input, format);
  }
  if (isDate(input)) {
    config._d = cloneDate(input);
    return config;
  }
  if (isArray(format)) {
    configFromStringAndArray(config);
  } else if (format) {
    configFromStringAndFormat(config);
  } else {
    configFromInput(config);
  }
  if (!isValid(config)) {
    config._d = null;
  }
  return config;
}
function configFromInput(config) {
  const input = config._i;
  if (isUndefined(input)) {
    config._d = /* @__PURE__ */ new Date();
  } else if (isDate(input)) {
    config._d = cloneDate(input);
  } else if (isString(input)) {
    configFromString(config);
  } else if (isArray(input) && input.length) {
    const _arr = input.slice(0);
    config._a = _arr.map((obj) => isString(obj) ? parseInt(obj, 10) : obj);
    configFromArray(config);
  } else if (isObject(input)) {
    configFromObject(config);
  } else if (isNumber(input)) {
    config._d = new Date(input);
  } else {
    return createInvalid(config);
  }
  return config;
}
function createLocalOrUTC(input, format, localeKey, strict, isUTC) {
  const config = {};
  let _input = input;
  if (isObject(_input) && isObjectEmpty(_input) || isArray(_input) && _input.length === 0) {
    _input = void 0;
  }
  config._useUTC = config._isUTC = isUTC;
  config._l = localeKey;
  config._i = _input;
  config._f = format;
  config._strict = strict;
  return createFromConfig(config);
}
function parseDate(input, format, localeKey, strict, isUTC) {
  if (isDate(input)) {
    return input;
  }
  const config = createLocalOrUTC(input, format, localeKey, strict, isUTC);
  return config._d;
}
function utcAsLocal(date) {
  if (!(date instanceof Date)) {
    return null;
  }
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}
function absRound(num) {
  return num < 0 ? Math.round(num * -1) * -1 : Math.round(num);
}
function isAfter(date1, date2, units2 = "milliseconds") {
  if (!date1 || !date2) {
    return false;
  }
  if (units2 === "milliseconds") {
    return date1.valueOf() > date2.valueOf();
  }
  return date2.valueOf() < startOf(date1, units2).valueOf();
}
function isBefore(date1, date2, units2 = "milliseconds") {
  if (!date1 || !date2) {
    return false;
  }
  if (units2 === "milliseconds") {
    return date1.valueOf() < date2.valueOf();
  }
  return endOf(date1, units2).valueOf() < date2.valueOf();
}
function isDisabledDay(date, daysDisabled) {
  if (typeof daysDisabled === "undefined" || !daysDisabled || !daysDisabled.length) {
    return false;
  }
  return daysDisabled.some((day) => day === date.getDay());
}
function isSame(date1, date2, units2 = "milliseconds") {
  if (!date1 || !date2) {
    return false;
  }
  if (units2 === "milliseconds") {
    return date1.valueOf() === date2.valueOf();
  }
  const inputMs = date2.valueOf();
  return startOf(date1, units2).valueOf() <= inputMs && inputMs <= endOf(date1, units2).valueOf();
}
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(input, key, config = {}) {
  const duration = convertDuration(input, key);
  return new Duration(duration, config);
}
function convertDuration(input, key) {
  if (input == null) {
    return {};
  }
  if (isDuration(input)) {
    return {
      milliseconds: input._milliseconds,
      day: input._days,
      month: input._months
    };
  }
  if (isNumber(input)) {
    return key ? {
      [key]: input
    } : {
      milliseconds: input
    };
  }
  if (isString(input)) {
    let match = aspNetRegex.exec(input);
    if (match) {
      const sign = match[1] === "-" ? -1 : 1;
      return {
        year: 0,
        day: toInt(match[DATE]) * sign,
        hours: toInt(match[HOUR]) * sign,
        minutes: toInt(match[MINUTE]) * sign,
        seconds: toInt(match[SECOND]) * sign,
        // the millisecond decimal point is included in the match
        milliseconds: toInt(absRound(toInt(match[MILLISECOND]) * 1e3)) * sign
      };
    }
    match = isoRegex.exec(input);
    if (match) {
      const sign = match[1] === "-" ? -1 : match[1] === "+" ? 1 : 1;
      return {
        year: parseIso(match[2], sign),
        month: parseIso(match[3], sign),
        week: parseIso(match[4], sign),
        day: parseIso(match[5], sign),
        hours: parseIso(match[6], sign),
        minutes: parseIso(match[7], sign),
        seconds: parseIso(match[8], sign)
      };
    }
  }
  if (isObject(input) && ("from" in input || "to" in input)) {
    const diffRes = momentsDifference(parseDate(input.from), parseDate(input.to));
    return {
      milliseconds: diffRes.milliseconds,
      month: diffRes.months
    };
  }
  return input;
}
function parseIso(inp, sign) {
  const res = inp && parseFloat(inp.replace(",", "."));
  return (isNaN(res) ? 0 : res) * sign;
}
function positiveMomentsDifference(base, other) {
  const res = {
    milliseconds: 0,
    months: 0
  };
  res.months = getMonth(other) - getMonth(base) + (getFullYear(other) - getFullYear(base)) * 12;
  const _basePlus = add(cloneDate(base), res.months, "month");
  if (isAfter(_basePlus, other)) {
    --res.months;
  }
  res.milliseconds = +other - +add(cloneDate(base), res.months, "month");
  return res;
}
function momentsDifference(base, other) {
  if (!(isDateValid(base) && isDateValid(other))) {
    return {
      milliseconds: 0,
      months: 0
    };
  }
  let res;
  const _other = cloneWithOffset(other, base, {
    _offset: base.getTimezoneOffset()
  });
  if (isBefore(base, _other)) {
    res = positiveMomentsDifference(base, _other);
  } else {
    res = positiveMomentsDifference(_other, base);
    res.milliseconds = -res.milliseconds;
    res.months = -res.months;
  }
  return res;
}
function add(date, val, period, isUTC) {
  const dur = createDuration(val, period);
  return addSubtract(date, dur, 1, isUTC);
}
function subtract(date, val, period, isUTC) {
  const dur = createDuration(val, period);
  return addSubtract(date, dur, -1, isUTC);
}
function addSubtract(date, duration, isAdding, isUTC) {
  const milliseconds = duration._milliseconds;
  const days = absRound(duration._days);
  const months2 = absRound(duration._months);
  if (months2) {
    setMonth(date, getMonth(date, isUTC) + months2 * isAdding, isUTC);
  }
  if (days) {
    setDate(date, getDate(date, isUTC) + days * isAdding, isUTC);
  }
  if (milliseconds) {
    setTime(date, getTime(date) + milliseconds * isAdding);
  }
  return cloneDate(date);
}
function initDayOfWeek() {
  addFormatToken("d", null, "do", function(date, opts) {
    return getDay(date, opts.isUTC).toString(10);
  });
  addFormatToken("dd", null, null, function(date, opts) {
    return opts.locale.weekdaysMin(date, opts.format, opts.isUTC);
  });
  addFormatToken("ddd", null, null, function(date, opts) {
    return opts.locale.weekdaysShort(date, opts.format, opts.isUTC);
  });
  addFormatToken("dddd", null, null, function(date, opts) {
    return opts.locale.weekdays(date, opts.format, opts.isUTC);
  });
  addFormatToken("e", null, null, function(date, opts) {
    return getLocaleDayOfWeek(date, opts.locale, opts.isUTC).toString(10);
  });
  addFormatToken("E", null, null, function(date, opts) {
    return getISODayOfWeek(date, opts.isUTC).toString(10);
  });
  addUnitAlias("day", "d");
  addUnitAlias("weekday", "e");
  addUnitAlias("isoWeekday", "E");
  addUnitPriority("day", 11);
  addUnitPriority("weekday", 11);
  addUnitPriority("isoWeekday", 11);
  addRegexToken("d", match1to2);
  addRegexToken("e", match1to2);
  addRegexToken("E", match1to2);
  addRegexToken("dd", function(isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken("ddd", function(isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken("dddd", function(isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
  });
  addWeekParseToken(["dd", "ddd", "dddd"], function(input, week2, config, token) {
    const weekday = config._locale.weekdaysParse(input, token, config._strict);
    if (weekday != null) {
      week2["d"] = weekday;
    } else {
      getParsingFlags(config).invalidWeekday = !!input;
    }
    return config;
  });
  addWeekParseToken(["d", "e", "E"], function(input, week2, config, token) {
    week2[token] = toInt(input);
    return config;
  });
}
function parseWeekday(input, locale) {
  if (!isString(input)) {
    return input;
  }
  const _num = parseInt(input, 10);
  if (!isNaN(_num)) {
    return _num;
  }
  const _weekDay = locale.weekdaysParse(input);
  if (isNumber(_weekDay)) {
    return _weekDay;
  }
  return null;
}
function parseIsoWeekday(input, locale = getLocale()) {
  if (isString(input)) {
    return locale.weekdaysParse(input) % 7 || 7;
  }
  return isNumber(input) && isNaN(input) ? null : input;
}
function setDayOfWeek(date, input, locale = getLocale(), isUTC) {
  const day = getDay(date, isUTC);
  const _input = parseWeekday(input, locale);
  return add(date, _input - day, "day");
}
function getDayOfWeek(date, isUTC) {
  return getDay(date, isUTC);
}
function getLocaleDayOfWeek(date, locale = getLocale(), isUTC) {
  return (getDay(date, isUTC) + 7 - locale.firstDayOfWeek()) % 7;
}
function setLocaleDayOfWeek(date, input, opts = {}) {
  const weekday = getLocaleDayOfWeek(date, opts.locale, opts.isUTC);
  return add(date, input - weekday, "day");
}
function getISODayOfWeek(date, isUTC) {
  return getDay(date, isUTC) || 7;
}
function setISODayOfWeek(date, input, opts = {}) {
  const weekday = parseIsoWeekday(input, opts.locale);
  return setDayOfWeek(date, getDayOfWeek(date) % 7 ? weekday : weekday - 7);
}
var symbolMap$2 = {
  1: "١",
  2: "٢",
  3: "٣",
  4: "٤",
  5: "٥",
  6: "٦",
  7: "٧",
  8: "٨",
  9: "٩",
  0: "٠"
};
var numberMap$2 = {
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
  "٠": "0"
};
var pluralForm$1 = function(num) {
  return num === 0 ? 0 : num === 1 ? 1 : num === 2 ? 2 : num % 100 >= 3 && num % 100 <= 10 ? 3 : num % 100 >= 11 ? 4 : 5;
};
var plurals$1 = {
  s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"],
  m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"],
  h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"],
  d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"],
  M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"],
  y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"]
};
var pluralize$1 = function(u) {
  return function(num, withoutSuffix) {
    const f = pluralForm$1(num);
    let str = plurals$1[u][pluralForm$1(num)];
    if (f === 2) {
      str = str[withoutSuffix ? 0 : 1];
    }
    return str.replace(/%d/i, num.toString());
  };
};
var months$3 = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
var arLocale = {
  abbr: "ar",
  months: months$3,
  monthsShort: months$3,
  weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
  weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
  weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "D/‏M/‏YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm"
  },
  meridiemParse: /ص|م/,
  isPM(input) {
    return "م" === input;
  },
  meridiem(hour, minute, isLower) {
    if (hour < 12) {
      return "ص";
    } else {
      return "م";
    }
  },
  calendar: {
    sameDay: "[اليوم عند الساعة] LT",
    nextDay: "[غدًا عند الساعة] LT",
    nextWeek: "dddd [عند الساعة] LT",
    lastDay: "[أمس عند الساعة] LT",
    lastWeek: "dddd [عند الساعة] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "بعد %s",
    past: "منذ %s",
    s: pluralize$1("s"),
    ss: pluralize$1("s"),
    m: pluralize$1("m"),
    mm: pluralize$1("m"),
    h: pluralize$1("h"),
    hh: pluralize$1("h"),
    d: pluralize$1("d"),
    dd: pluralize$1("d"),
    M: pluralize$1("M"),
    MM: pluralize$1("M"),
    y: pluralize$1("y"),
    yy: pluralize$1("y")
  },
  preparse(str) {
    return str.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(match) {
      return numberMap$2[match];
    }).replace(/،/g, ",");
  },
  postformat(str) {
    return str.replace(/\d/g, function(match) {
      return symbolMap$2[match];
    }).replace(/,/g, "،");
  },
  week: {
    dow: 6,
    // Saturday is the first day of the week.
    doy: 12
    // The week that contains Jan 1st is the first week of the year.
  }
};
var bgLocale = {
  abbr: "bg",
  months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
  monthsShort: "янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
  weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
  weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
  weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "D.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY H:mm",
    LLLL: "dddd, D MMMM YYYY H:mm"
  },
  calendar: {
    sameDay: "[Днес в] LT",
    nextDay: "[Утре в] LT",
    nextWeek: "dddd [в] LT",
    lastDay: "[Вчера в] LT",
    lastWeek: function(d) {
      switch (d) {
        case 0:
        case 3:
        case 6:
          return "[В изминалата] dddd [в] LT";
        case 1:
        case 2:
        case 4:
        case 5:
          return "[В изминалия] dddd [в] LT";
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "след %s",
    past: "преди %s",
    s: "няколко секунди",
    ss: "%d секунди",
    m: "минута",
    mm: "%d минути",
    h: "час",
    hh: "%d часа",
    d: "ден",
    dd: "%d дни",
    M: "месец",
    MM: "%d месеца",
    y: "година",
    yy: "%d години"
  },
  dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
  ordinal: function(_num) {
    const number = Number(_num);
    let lastDigit = number % 10, last2Digits = number % 100;
    if (number === 0) {
      return number + "-ев";
    } else if (last2Digits === 0) {
      return number + "-ен";
    } else if (last2Digits > 10 && last2Digits < 20) {
      return number + "-ти";
    } else if (lastDigit === 1) {
      return number + "-ви";
    } else if (lastDigit === 2) {
      return number + "-ри";
    } else if (lastDigit === 7 || lastDigit === 8) {
      return number + "-ми";
    } else {
      return number + "-ти";
    }
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 7
    // The week that contains Jan 1st is the first week of the year.
  }
};
var monthsShortDot$5 = "gen._feb._mar._abr._mai._jun._jul._ago._set._oct._nov._des.".split("_");
var monthsShort$7 = "ene_feb_mar_abr_mai_jun_jul_ago_set_oct_nov_des".split("_");
var monthsParse$6 = [/^gen/i, /^feb/i, /^mar/i, /^abr/i, /^mai/i, /^jun/i, /^jul/i, /^ago/i, /^set/i, /^oct/i, /^nov/i, /^des/i];
var monthsRegex$5 = /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre|gen\.?|feb\.?|mar\.?|abr\.?|mai\.?|jun\.?|jul\.?|ago\.?|set\.?|oct\.?|nov\.?|des\.?)/i;
var caLocale = {
  abbr: "ca",
  months: "gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
  monthsShort(date, format, isUTC) {
    if (!date) {
      return monthsShortDot$5;
    }
    if (/-MMM-/.test(format)) {
      return monthsShort$7[getMonth(date, isUTC)];
    }
    return monthsShortDot$5[getMonth(date, isUTC)];
  },
  monthsRegex: monthsRegex$5,
  monthsShortRegex: monthsRegex$5,
  monthsStrictRegex: /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre)/i,
  monthsShortStrictRegex: /^(gen\.?|feb\.?|mar\.?|abr\.?|mai\.?|jun\.?|jul\.?|ago\.?|set\.?|oct\.?|nov\.?|des\.?)/i,
  monthsParse: monthsParse$6,
  longMonthsParse: monthsParse$6,
  shortMonthsParse: monthsParse$6,
  weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
  weekdaysShort: "diu._dil._dim._dix._dij._div._dis.".split("_"),
  weekdaysMin: "dg_dl_dt_dc_dj_dv_ds".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY H:mm",
    LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
  },
  calendar: {
    sameDay(date) {
      return "[avui a " + ("la" + (getHours(date) !== 1) ? "les" : "") + "] LT";
    },
    nextDay(date) {
      return "[dema a " + ("la" + (getHours(date) !== 1) ? "les" : "") + "] LT";
    },
    nextWeek(date) {
      return "dddd [a " + ("la" + (getHours(date) !== 1) ? "les" : "") + "] LT";
    },
    lastDay(date) {
      return "[ahir a " + ("la" + (getHours(date) !== 1) ? "les" : "") + "] LT";
    },
    lastWeek(date) {
      return "[el] dddd [" + ("passada la " + (getHours(date) !== 1) ? "passades les" : "") + "] LT";
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "en %s",
    past: "fa %s",
    s: "uns segons",
    ss: "%d segons",
    m: "un minut",
    mm: "%d minuts",
    h: "una hora",
    hh: "%d hores",
    d: "un dia",
    dd: "%d dies",
    M: "un mes",
    MM: "%d mesos",
    y: "un any",
    yy: "%d anys"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|on|er|rt|é)/,
  ordinal(_num) {
    const num = Number(_num);
    const output = num > 4 ? "é" : num === 1 || num === 3 ? "r" : num === 2 ? "n" : num === 4 ? "t" : "é";
    return num + output;
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var months$2 = "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_");
var monthsShort$6 = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");
function plural$4(num) {
  return num > 1 && num < 5 && ~~(num / 10) !== 1;
}
function translate$6(num, withoutSuffix, key, isFuture) {
  const result = num + " ";
  switch (key) {
    case "s":
      return withoutSuffix || isFuture ? "pár sekund" : "pár sekundami";
    case "ss":
      if (withoutSuffix || isFuture) {
        return result + (plural$4(num) ? "sekundy" : "sekund");
      } else {
        return result + "sekundami";
      }
    // break;
    case "m":
      return withoutSuffix ? "minuta" : isFuture ? "minutu" : "minutou";
    case "mm":
      if (withoutSuffix || isFuture) {
        return result + (plural$4(num) ? "minuty" : "minut");
      } else {
        return result + "minutami";
      }
    // break;
    case "h":
      return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";
    case "hh":
      if (withoutSuffix || isFuture) {
        return result + (plural$4(num) ? "hodiny" : "hodin");
      } else {
        return result + "hodinami";
      }
    // break;
    case "d":
      return withoutSuffix || isFuture ? "den" : "dnem";
    case "dd":
      if (withoutSuffix || isFuture) {
        return result + (plural$4(num) ? "dny" : "dní");
      } else {
        return result + "dny";
      }
    // break;
    case "M":
      return withoutSuffix || isFuture ? "měsíc" : "měsícem";
    case "MM":
      if (withoutSuffix || isFuture) {
        return result + (plural$4(num) ? "měsíce" : "měsíců");
      } else {
        return result + "měsíci";
      }
    // break;
    case "y":
      return withoutSuffix || isFuture ? "rok" : "rokem";
    case "yy":
      if (withoutSuffix || isFuture) {
        return result + (plural$4(num) ? "roky" : "let");
      } else {
        return result + "lety";
      }
  }
}
var csLocale = {
  abbr: "cs",
  months: months$2,
  monthsShort: monthsShort$6,
  monthsParse: function(months2, monthsShort2) {
    let i, _monthsParse = [];
    for (i = 0; i < 12; i++) {
      _monthsParse[i] = new RegExp("^" + months2[i] + "$|^" + monthsShort2[i] + "$", "i");
    }
    return _monthsParse;
  }(months$2, monthsShort$6),
  shortMonthsParse: function(monthsShort2) {
    let i, _shortMonthsParse = [];
    for (i = 0; i < 12; i++) {
      _shortMonthsParse[i] = new RegExp("^" + monthsShort2[i] + "$", "i");
    }
    return _shortMonthsParse;
  }(monthsShort$6),
  longMonthsParse: function(months2) {
    let i, _longMonthsParse = [];
    for (i = 0; i < 12; i++) {
      _longMonthsParse[i] = new RegExp("^" + months2[i] + "$", "i");
    }
    return _longMonthsParse;
  }(months$2),
  weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
  weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
  weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY H:mm",
    LLLL: "dddd D. MMMM YYYY H:mm",
    l: "D. M. YYYY"
  },
  calendar: {
    sameDay: "[dnes v] LT",
    nextDay: "[zítra v] LT",
    nextWeek(date) {
      switch (getDayOfWeek(date)) {
        case 0:
          return "[v neděli v] LT";
        case 1:
        case 2:
          return "[v] dddd [v] LT";
        case 3:
          return "[ve středu v] LT";
        case 4:
          return "[ve čtvrtek v] LT";
        case 5:
          return "[v pátek v] LT";
        case 6:
          return "[v sobotu v] LT";
      }
    },
    lastDay: "[včera v] LT",
    lastWeek(date) {
      switch (getDayOfWeek(date)) {
        case 0:
          return "[minulou neděli v] LT";
        case 1:
        case 2:
          return "[minulé] dddd [v] LT";
        case 3:
          return "[minulou středu v] LT";
        case 4:
        case 5:
          return "[minulý] dddd [v] LT";
        case 6:
          return "[minulou sobotu v] LT";
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "za %s",
    past: "před %s",
    s: translate$6,
    ss: translate$6,
    m: translate$6,
    mm: translate$6,
    h: translate$6,
    hh: translate$6,
    d: translate$6,
    dd: translate$6,
    M: translate$6,
    MM: translate$6,
    y: translate$6,
    yy: translate$6
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var daLocale = {
  abbr: "da",
  months: "Januar_Februar_Marts_April_Maj_Juni_Juli_August_September_Oktober_November_December".split("_"),
  monthsShort: "Jan_Feb_Mar_Apr_Maj_Jun_Jul_Aug_Sep_Okt_Nov_Dec".split("_"),
  weekdays: "Søndag_Mandag_Tirsdag_Onsdag_Torsdag_Fredag_Lørdag".split("_"),
  weekdaysShort: "Søn_Man_Tir_Ons_Tor_Fre_Lør".split("_"),
  weekdaysMin: "Sø_Ma_Ti_On_To_Fr_Lø".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY HH:mm",
    LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm"
  },
  calendar: {
    sameDay: "[i dag kl.] LT",
    nextDay: "[i morgen kl.] LT",
    nextWeek: "på dddd [kl.] LT",
    lastDay: "[i går kl.] LT",
    lastWeek: "[i] dddd[s kl.] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "om %s",
    past: "%s siden",
    s: "få sekunder",
    m: "et minut",
    mm: "%d minutter",
    h: "en time",
    hh: "%d timer",
    d: "en dag",
    dd: "%d dage",
    M: "en måned",
    MM: "%d måneder",
    y: "et år",
    yy: "%d år"
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
function processRelativeTime$2(num, withoutSuffix, key, isFuture) {
  const format = {
    "m": ["eine Minute", "einer Minute"],
    "h": ["eine Stunde", "einer Stunde"],
    "d": ["ein Tag", "einem Tag"],
    "dd": [num + " Tage", num + " Tagen"],
    "M": ["ein Monat", "einem Monat"],
    "MM": [num + " Monate", num + " Monaten"],
    "y": ["ein Jahr", "einem Jahr"],
    "yy": [num + " Jahre", num + " Jahren"]
  };
  return withoutSuffix ? format[key][0] : format[key][1];
}
var deLocale = {
  abbr: "de",
  months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
  monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
  monthsParseExact: true,
  weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
  weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
  weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY HH:mm",
    LLLL: "dddd, D. MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[heute um] LT [Uhr]",
    sameElse: "L",
    nextDay: "[morgen um] LT [Uhr]",
    nextWeek: "dddd [um] LT [Uhr]",
    lastDay: "[gestern um] LT [Uhr]",
    lastWeek: "[letzten] dddd [um] LT [Uhr]"
  },
  relativeTime: {
    future: "in %s",
    past: "vor %s",
    s: "ein paar Sekunden",
    ss: "%d Sekunden",
    m: processRelativeTime$2,
    mm: "%d Minuten",
    h: processRelativeTime$2,
    hh: "%d Stunden",
    d: processRelativeTime$2,
    dd: processRelativeTime$2,
    M: processRelativeTime$2,
    MM: processRelativeTime$2,
    y: processRelativeTime$2,
    yy: processRelativeTime$2
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var enGbLocale = {
  abbr: "en-gb",
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
  weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "[Last] dddd [at] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
  ordinal(_num) {
    const num = Number(_num);
    const b = num % 10, output = ~~(num % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return num + output;
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var monthsShortDot$4 = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_");
var monthsShort$5 = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
var monthsParse$5 = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
var monthsRegex$4 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
var esDoLocale = {
  abbr: "es-do",
  months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
  monthsShort(date, format, isUTC) {
    if (!date) {
      return monthsShortDot$4;
    } else if (/-MMM-/.test(format)) {
      return monthsShort$5[getMonth(date, isUTC)];
    } else {
      return monthsShortDot$4[getMonth(date, isUTC)];
    }
  },
  monthsRegex: monthsRegex$4,
  monthsShortRegex: monthsRegex$4,
  monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
  monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
  monthsParse: monthsParse$5,
  longMonthsParse: monthsParse$5,
  shortMonthsParse: monthsParse$5,
  weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
  weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
  weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "DD/MM/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY h:mm A",
    LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
  },
  calendar: {
    sameDay(date) {
      return "[hoy a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    nextDay(date) {
      return "[mañana a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    nextWeek(date) {
      return "dddd [a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    lastDay(date) {
      return "[ayer a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    lastWeek(date) {
      return "[el] dddd [pasado a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    ss: "%d segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años"
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var monthsShortDot$3 = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_");
var monthsShort$4 = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
var monthsParse$4 = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
var monthsRegex$3 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
var esLocale = {
  abbr: "es",
  months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
  monthsShort(date, format, isUTC) {
    if (!date) {
      return monthsShortDot$3;
    }
    if (/-MMM-/.test(format)) {
      return monthsShort$4[getMonth(date, isUTC)];
    }
    return monthsShortDot$3[getMonth(date, isUTC)];
  },
  monthsRegex: monthsRegex$3,
  monthsShortRegex: monthsRegex$3,
  monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
  monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
  monthsParse: monthsParse$4,
  longMonthsParse: monthsParse$4,
  shortMonthsParse: monthsParse$4,
  weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
  weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
  weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY H:mm",
    LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
  },
  calendar: {
    sameDay(date) {
      return "[hoy a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    nextDay(date) {
      return "[mañana a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    nextWeek(date) {
      return "dddd [a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    lastDay(date) {
      return "[ayer a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    lastWeek(date) {
      return "[el] dddd [pasado a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    ss: "%d segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años"
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var monthsShortDot$2 = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_");
var monthsShort$3 = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
var esPrLocale = {
  abbr: "es-pr",
  months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
  monthsShort(date, format, isUTC) {
    if (!date) {
      return monthsShortDot$2;
    } else if (/-MMM-/.test(format)) {
      return monthsShort$3[getMonth(date, isUTC)];
    } else {
      return monthsShortDot$2[getMonth(date, isUTC)];
    }
  },
  monthsParseExact: true,
  weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
  weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
  weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "MM/DD/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY h:mm A",
    LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
  },
  calendar: {
    sameDay(date) {
      return "[hoy a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    nextDay(date) {
      return "[mañana a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    nextWeek(date) {
      return "dddd [a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    lastDay(date) {
      return "[ayer a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    lastWeek(date) {
      return "[el] dddd [pasado a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    ss: "%d segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años"
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº",
  week: {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6
    // The week that contains Jan 1st is the first week of the year.
  }
};
var monthsShortDot$1 = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_");
var monthsShort$2 = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
var esUsLocale = {
  abbr: "es-us",
  months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
  monthsShort(date, format, isUTC) {
    if (!date) {
      return monthsShortDot$1;
    } else if (/-MMM-/.test(format)) {
      return monthsShort$2[getMonth(date, isUTC)];
    } else {
      return monthsShortDot$1[getMonth(date, isUTC)];
    }
  },
  monthsParseExact: true,
  weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
  weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
  weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "MM/DD/YYYY",
    LL: "MMMM [de] D [de] YYYY",
    LLL: "MMMM [de] D [de] YYYY h:mm A",
    LLLL: "dddd, MMMM [de] D [de] YYYY h:mm A"
  },
  calendar: {
    sameDay(date) {
      return "[hoy a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    nextDay(date) {
      return "[mañana a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    nextWeek(date) {
      return "dddd [a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    lastDay(date) {
      return "[ayer a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    lastWeek(date) {
      return "[el] dddd [pasado a la" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    ss: "%d segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años"
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº",
  week: {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6
    // The week that contains Jan 1st is the first week of the year.
  }
};
var processRelativeTime$1 = function(num, withoutSuffix, key, isFuture) {
  const format = {
    s: ["mõne sekundi", "mõni sekund", "paar sekundit"],
    ss: [num + "sekundi", num + "sekundit"],
    m: ["ühe minuti", "üks minut"],
    mm: [num + " minuti", num + " minutit"],
    h: ["ühe tunni", "tund aega", "üks tund"],
    hh: [num + " tunni", num + " tundi"],
    d: ["ühe päeva", "üks päev"],
    M: ["kuu aja", "kuu aega", "üks kuu"],
    MM: [num + " kuu", num + " kuud"],
    y: ["ühe aasta", "aasta", "üks aasta"],
    yy: [num + " aasta", num + " aastat"]
  };
  if (withoutSuffix) {
    return format[key][2] ? format[key][2] : format[key][1];
  }
  return isFuture ? format[key][0] : format[key][1];
};
var etLocale = {
  abbr: "et",
  months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
  monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
  weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
  weekdaysShort: "P_E_T_K_N_R_L".split("_"),
  weekdaysMin: "P_E_T_K_N_R_L".split("_"),
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY H:mm",
    LLLL: "dddd, D. MMMM YYYY H:mm"
  },
  calendar: {
    sameDay: "[Täna,] LT",
    nextDay: "[Homme,] LT",
    nextWeek: "[Järgmine] dddd LT",
    lastDay: "[Eile,] LT",
    lastWeek: "[Eelmine] dddd LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s pärast",
    past: "%s tagasi",
    s: processRelativeTime$1,
    ss: processRelativeTime$1,
    m: processRelativeTime$1,
    mm: processRelativeTime$1,
    h: processRelativeTime$1,
    hh: processRelativeTime$1,
    d: processRelativeTime$1,
    dd: "%d päeva",
    M: processRelativeTime$1,
    MM: processRelativeTime$1,
    y: processRelativeTime$1,
    yy: processRelativeTime$1
  },
  dayOfMonthOrdinalParse: /\d{1,2}./,
  ordinal: "%d.",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var numbersPast = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" ");
var numbersFuture = ["nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", numbersPast[7], numbersPast[8], numbersPast[9]];
function translate$5(num, withoutSuffix, key, isFuture) {
  var result = "";
  switch (key) {
    case "s":
      return isFuture ? "muutaman sekunnin" : "muutama sekunti";
    case "ss":
      return isFuture ? "sekunnin" : "sekuntia";
    case "m":
      return isFuture ? "minuutin" : "minuutti";
    case "mm":
      result = isFuture ? "minuutin" : "minuuttia";
      break;
    case "h":
      return isFuture ? "tunnin" : "tunti";
    case "hh":
      result = isFuture ? "tunnin" : "tuntia";
      break;
    case "d":
      return isFuture ? "päivän" : "päivä";
    case "dd":
      result = isFuture ? "päivän" : "päivää";
      break;
    case "M":
      return isFuture ? "kuukauden" : "kuukausi";
    case "MM":
      result = isFuture ? "kuukauden" : "kuukautta";
      break;
    case "y":
      return isFuture ? "vuoden" : "vuosi";
    case "yy":
      result = isFuture ? "vuoden" : "vuotta";
      break;
  }
  result = verbalNumber(num, isFuture) + " " + result;
  return result;
}
function verbalNumber(num, isFuture) {
  return num < 10 ? isFuture ? numbersFuture[num] : numbersPast[num] : num;
}
var fiLocale = {
  abbr: "fi",
  months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
  monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
  weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
  weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
  weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
  longDateFormat: {
    LT: "HH.mm",
    LTS: "HH.mm.ss",
    L: "DD.MM.YYYY",
    LL: "Do MMMM[ta] YYYY",
    LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
    LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
    l: "D.M.YYYY",
    ll: "Do MMM YYYY",
    lll: "Do MMM YYYY, [klo] HH.mm",
    llll: "ddd, Do MMM YYYY, [klo] HH.mm"
  },
  calendar: {
    sameDay: "[tänään] [klo] LT",
    nextDay: "[huomenna] [klo] LT",
    nextWeek: "dddd [klo] LT",
    lastDay: "[eilen] [klo] LT",
    lastWeek: "[viime] dddd[na] [klo] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s päästä",
    past: "%s sitten",
    s: translate$5,
    ss: translate$5,
    m: translate$5,
    mm: translate$5,
    h: translate$5,
    hh: translate$5,
    d: translate$5,
    dd: translate$5,
    M: translate$5,
    MM: translate$5,
    y: translate$5,
    yy: translate$5
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var frLocale = {
  abbr: "fr",
  months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
  monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
  monthsParseExact: true,
  weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
  weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
  weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Aujourd’hui à] LT",
    nextDay: "[Demain à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[Hier à] LT",
    lastWeek: "dddd [dernier à] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "dans %s",
    past: "il y a %s",
    s: "quelques secondes",
    ss: "%d secondes",
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
  ordinal(_num, period) {
    const num = Number(_num);
    switch (period) {
      // TODO: Return 'e' when day of month > 1. Move this case inside
      // block for masculine words below.
      // See https://github.com/moment/moment/issues/3375
      case "D":
        return num + (num === 1 ? "er" : "");
      // Words with masculine grammatical gender: mois, trimestre, jour
      default:
      case "M":
      case "Q":
      case "DDD":
      case "d":
        return num + (num === 1 ? "er" : "e");
      // Words with feminine grammatical gender: semaine
      case "w":
      case "W":
        return num + (num === 1 ? "re" : "e");
    }
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var frCaLocale = {
  abbr: "fr-ca",
  months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
  monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
  monthsParseExact: true,
  weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
  weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
  weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY-MM-DD",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Aujourd’hui à] LT",
    nextDay: "[Demain à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[Hier à] LT",
    lastWeek: "dddd [dernier à] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "dans %s",
    past: "il y a %s",
    s: "quelques secondes",
    ss: "%d secondes",
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e|)/,
  ordinal(_num, period) {
    const num = Number(_num);
    switch (period) {
      case "D":
        return num + (num === 1 ? "er" : "");
      // Words with masculine grammatical gender: mois, trimestre, jour
      default:
      case "M":
      case "Q":
      case "DDD":
      case "d":
        return num + (num === 1 ? "er" : "e");
      // Words with feminine grammatical gender: semaine
      case "w":
      case "W":
        return num + (num === 1 ? "re" : "e");
    }
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var monthsShortDot = "xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_");
var monthsShort$1 = "xan_feb_mar_abr_mai_xuñ_xul_ago_set_out_nov_dec".split("_");
var monthsParse$3 = [/^xan/i, /^feb/i, /^mar/i, /^abr/i, /^mai/i, /^xuñ/i, /^xul/i, /^ago/i, /^set/i, /^out/i, /^nov/i, /^dec/i];
var monthsRegex$2 = /^(xaneiro|febreiro|marzo|abril|maio|xuño|xullo|agosto|setembro|outubro|novembro|decembro|xan\.?|feb\.?|mar\.?|abr\.?|mai\.?|xuñ\.?|xul\.?|ago\.?|set\.?|out\.?|nov\.?|dec\.?)/i;
var glLocale = {
  abbr: "gl",
  months: "xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),
  monthsShort(date, format, isUTC) {
    if (!date) {
      return monthsShortDot;
    }
    if (/-MMM-/.test(format)) {
      return monthsShort$1[getMonth(date, isUTC)];
    }
    return monthsShortDot[getMonth(date, isUTC)];
  },
  monthsRegex: monthsRegex$2,
  monthsShortRegex: monthsRegex$2,
  monthsStrictRegex: /^(xaneiro|febreiro|marzo|abril|maio|xuño|xullo|agosto|setembro|outubro|novembro|decembro)/i,
  monthsShortStrictRegex: /^(xan\.?|feb\.?|mar\.?|abr\.?|mai\.?|xuñ\.?|xul\.?|ago\.?|set\.?|out\.?|nov\.?|dec\.?)/i,
  monthsParse: monthsParse$3,
  longMonthsParse: monthsParse$3,
  shortMonthsParse: monthsParse$3,
  weekdays: "domingo_luns_martes_mércores_xoves_venres_sábado".split("_"),
  weekdaysShort: "dom._lun._mar._mér._xov._ven._sáb.".split("_"),
  weekdaysMin: "do_lu_ma_mé_xo_ve_sá".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY H:mm",
    LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
  },
  calendar: {
    sameDay(date) {
      return "[hoxe á" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    nextDay(date) {
      return "[mañan á" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    nextWeek(date) {
      return "dddd [á" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    lastDay(date) {
      return "[onte á" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    lastWeek(date) {
      return "[o] dddd [pasado á" + (getHours(date) !== 1 ? "s" : "") + "] LT";
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "en %s",
    past: "fai %s",
    s: "uns segundos",
    ss: "%d segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "unha hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un ano",
    yy: "%d anos"
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var heLocale = {
  abbr: "he",
  months: "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
  monthsShort: "ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),
  weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
  weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
  weekdaysMin: "א_ב_ג_ד_ה_ו_ש".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D [ב]MMMM YYYY",
    LLL: "D [ב]MMMM YYYY HH:mm",
    LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
    l: "D/M/YYYY",
    ll: "D MMM YYYY",
    lll: "D MMM YYYY HH:mm",
    llll: "ddd, D MMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[היום ב־]LT",
    nextDay: "[מחר ב־]LT",
    nextWeek: "dddd [בשעה] LT",
    lastDay: "[אתמול ב־]LT",
    lastWeek: "[ביום] dddd [האחרון בשעה] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "בעוד %s",
    past: "לפני %s",
    s: "מספר שניות",
    ss: "%d שניות",
    m: "דקה",
    mm: "%d דקות",
    h: "שעה",
    hh(num) {
      if (num === 2) {
        return "שעתיים";
      }
      return num + " שעות";
    },
    d: "יום",
    dd(num) {
      if (num === 2) {
        return "יומיים";
      }
      return num + " ימים";
    },
    M: "חודש",
    MM(num) {
      if (num === 2) {
        return "חודשיים";
      }
      return num + " חודשים";
    },
    y: "שנה",
    yy(num) {
      if (num === 2) {
        return "שנתיים";
      } else if (num % 10 === 0 && num !== 10) {
        return num + " שנה";
      }
      return num + " שנים";
    }
  },
  meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
  isPM(input) {
    return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
  },
  meridiem(hour, minute, isLower) {
    if (hour < 5) {
      return "לפנות בוקר";
    } else if (hour < 10) {
      return "בבוקר";
    } else if (hour < 12) {
      return isLower ? 'לפנה"צ' : "לפני הצהריים";
    } else if (hour < 18) {
      return isLower ? 'אחה"צ' : "אחרי הצהריים";
    } else {
      return "בערב";
    }
  }
};
var symbolMap$1 = {
  1: "१",
  2: "२",
  3: "३",
  4: "४",
  5: "५",
  6: "६",
  7: "७",
  8: "८",
  9: "९",
  0: "०"
};
var numberMap$1 = {
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
  "०": "0"
};
var hiLocale = {
  abbr: "hi",
  months: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),
  monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),
  monthsParseExact: true,
  weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
  weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
  weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
  longDateFormat: {
    LT: "A h:mm बजे",
    LTS: "A h:mm:ss बजे",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY, A h:mm बजे",
    LLLL: "dddd, D MMMM YYYY, A h:mm बजे"
  },
  calendar: {
    sameDay: "[आज] LT",
    nextDay: "[कल] LT",
    nextWeek: "dddd, LT",
    lastDay: "[कल] LT",
    lastWeek: "[पिछले] dddd, LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s में",
    past: "%s पहले",
    s: "कुछ ही क्षण",
    ss: "%d सेकंड",
    m: "एक मिनट",
    mm: "%d मिनट",
    h: "एक घंटा",
    hh: "%d घंटे",
    d: "एक दिन",
    dd: "%d दिन",
    M: "एक महीने",
    MM: "%d महीने",
    y: "एक वर्ष",
    yy: "%d वर्ष"
  },
  preparse(str) {
    return str.replace(/[१२३४५६७८९०]/g, function(match) {
      return numberMap$1[match];
    });
  },
  postformat(str) {
    return str.replace(/\d/g, function(match) {
      return symbolMap$1[match];
    });
  },
  // Hindi notation for meridiems are quite fuzzy in practice. While there exists
  // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
  meridiemParse: /रात|सुबह|दोपहर|शाम/,
  meridiemHour(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "रात") {
      return hour < 4 ? hour : hour + 12;
    } else if (meridiem === "सुबह") {
      return hour;
    } else if (meridiem === "दोपहर") {
      return hour >= 10 ? hour : hour + 12;
    } else if (meridiem === "शाम") {
      return hour + 12;
    }
  },
  meridiem(hour, minute, isLower) {
    if (hour < 4) {
      return "रात";
    } else if (hour < 10) {
      return "सुबह";
    } else if (hour < 17) {
      return "दोपहर";
    } else if (hour < 20) {
      return "शाम";
    } else {
      return "रात";
    }
  },
  week: {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6
    // The week that contains Jan 1st is the first week of the year.
  }
};
var weekEndings = "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");
function translate$4(num, withoutSuffix, key, isFuture) {
  switch (key) {
    case "s":
      return isFuture || withoutSuffix ? "néhány másodperc" : "néhány másodperce";
    case "ss":
      return num + (isFuture || withoutSuffix ? " másodperc" : " másodperce");
    case "m":
      return "egy" + (isFuture || withoutSuffix ? " perc" : " perce");
    case "mm":
      return num + (isFuture || withoutSuffix ? " perc" : " perce");
    case "h":
      return "egy" + (isFuture || withoutSuffix ? " óra" : " órája");
    case "hh":
      return num + (isFuture || withoutSuffix ? " óra" : " órája");
    case "d":
      return "egy" + (isFuture || withoutSuffix ? " nap" : " napja");
    case "dd":
      return num + (isFuture || withoutSuffix ? " nap" : " napja");
    case "M":
      return "egy" + (isFuture || withoutSuffix ? " hónap" : " hónapja");
    case "MM":
      return num + (isFuture || withoutSuffix ? " hónap" : " hónapja");
    case "y":
      return "egy" + (isFuture || withoutSuffix ? " év" : " éve");
    case "yy":
      return num + (isFuture || withoutSuffix ? " év" : " éve");
  }
  return "";
}
function week(date, isFuture) {
  return (isFuture ? "" : "[múlt] ") + "[" + weekEndings[getDayOfWeek(date)] + "] LT[-kor]";
}
var huLocale = {
  abbr: "hu",
  months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
  monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
  weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
  weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
  weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "YYYY.MM.DD.",
    LL: "YYYY. MMMM D.",
    LLL: "YYYY. MMMM D. H:mm",
    LLLL: "YYYY. MMMM D., dddd H:mm"
  },
  meridiemParse: /de|du/i,
  isPM(input) {
    return input.charAt(1).toLowerCase() === "u";
  },
  meridiem(hours, minutes, isLower) {
    if (hours < 12) {
      return isLower === true ? "de" : "DE";
    } else {
      return isLower === true ? "du" : "DU";
    }
  },
  calendar: {
    sameDay: "[ma] LT[-kor]",
    nextDay: "[holnap] LT[-kor]",
    nextWeek(date) {
      return week(date, true);
    },
    lastDay: "[tegnap] LT[-kor]",
    lastWeek(date) {
      return week(date, false);
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "%s múlva",
    past: "%s",
    s: translate$4,
    ss: translate$4,
    m: translate$4,
    mm: translate$4,
    h: translate$4,
    hh: translate$4,
    d: translate$4,
    dd: translate$4,
    M: translate$4,
    MM: translate$4,
    y: translate$4,
    yy: translate$4
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var hrLocale = {
  abbr: "hr",
  months: "Siječanj_Veljača_Ožujak_Travanj_Svibanj_Lipanj_Srpanj_Kolovoz_Rujan_Listopad_Studeni_Prosinac".split("_"),
  monthsShort: "Sij_Velj_Ožu_Tra_Svi_Lip_Srp_Kol_Ruj_Lis_Stu_Pro".split("_"),
  weekdays: "Nedjelja_Ponedjeljak_Utorak_Srijeda_Četvrtak_Petak_Subota".split("_"),
  weekdaysShort: "Ned_Pon_Uto_Sri_Čet_Pet_Sub".split("_"),
  weekdaysMin: "Ne_Po_Ut_Sr_Če_Pe_Su".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY.",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Danas u] LT",
    nextDay: "[Sutra u] LT",
    nextWeek: "dddd [u] LT",
    lastDay: "[Jučer u] LT",
    lastWeek: "[Zadnji] dddd [u] LT",
    sameElse: "L"
  },
  invalidDate: "Neispravan datum",
  relativeTime: {
    future: "za %s",
    past: "%s prije",
    s: "nekoliko sekundi",
    ss: "%d sekundi",
    m: "minuta",
    mm: "%d minuta",
    h: "sat",
    hh: "%d sati",
    d: "dan",
    dd: "%d dana",
    M: "mjesec",
    MM: "%d mjeseci",
    y: "godina",
    yy: "%d godina"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
  ordinal(_num) {
    const num = Number(_num);
    const b = num % 10, output = ~~(num % 100 / 10) === 1 ? "." : b === 1 ? "." : b === 2 ? "." : b === 3 ? "." : ".";
    return num + output;
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var idLocale = {
  abbr: "id",
  months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
  monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
  weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
  weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
  weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
  longDateFormat: {
    LT: "HH.mm",
    LTS: "HH.mm.ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY [pukul] HH.mm",
    LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
  },
  meridiemParse: /pagi|siang|sore|malam/,
  meridiemHour(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "pagi") {
      return hour;
    } else if (meridiem === "siang") {
      return hour >= 11 ? hour : hour + 12;
    } else if (meridiem === "sore" || meridiem === "malam") {
      return hour + 12;
    }
  },
  meridiem(hours, minutes, isLower) {
    if (hours < 11) {
      return "pagi";
    } else if (hours < 15) {
      return "siang";
    } else if (hours < 19) {
      return "sore";
    } else {
      return "malam";
    }
  },
  calendar: {
    sameDay: "[Hari ini pukul] LT",
    nextDay: "[Besok pukul] LT",
    nextWeek: "dddd [pukul] LT",
    lastDay: "[Kemarin pukul] LT",
    lastWeek: "dddd [lalu pukul] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "dalam %s",
    past: "%s yang lalu",
    s: "beberapa detik",
    ss: "%d detik",
    m: "semenit",
    mm: "%d menit",
    h: "sejam",
    hh: "%d jam",
    d: "sehari",
    dd: "%d hari",
    M: "sebulan",
    MM: "%d bulan",
    y: "setahun",
    yy: "%d tahun"
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 7
    // The week that contains Jan 1st is the first week of the year.
  }
};
var itLocale = {
  abbr: "it",
  months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
  monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
  weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"),
  weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
  weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Oggi alle] LT",
    nextDay: "[Domani alle] LT",
    nextWeek: "dddd [alle] LT",
    lastDay: "[Ieri alle] LT",
    lastWeek(date) {
      switch (getDayOfWeek(date)) {
        case 0:
          return "[la scorsa] dddd [alle] LT";
        default:
          return "[lo scorso] dddd [alle] LT";
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future(num) {
      return (/^[0-9].+$/.test(num.toString(10)) ? "tra" : "in") + " " + num;
    },
    past: "%s fa",
    s: "alcuni secondi",
    ss: "%d secondi",
    m: "un minuto",
    mm: "%d minuti",
    h: "un'ora",
    hh: "%d ore",
    d: "un giorno",
    dd: "%d giorni",
    M: "un mese",
    MM: "%d mesi",
    y: "un anno",
    yy: "%d anni"
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var jaLocale = {
  abbr: "ja",
  months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
  monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
  weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
  weekdaysShort: "日_月_火_水_木_金_土".split("_"),
  weekdaysMin: "日_月_火_水_木_金_土".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY/MM/DD",
    LL: "YYYY年M月D日",
    LLL: "YYYY年M月D日 HH:mm",
    LLLL: "YYYY年M月D日 HH:mm dddd",
    l: "YYYY/MM/DD",
    ll: "YYYY年M月D日",
    lll: "YYYY年M月D日 HH:mm",
    llll: "YYYY年M月D日 HH:mm dddd"
  },
  meridiemParse: /午前|午後/i,
  isPM(input) {
    return input === "午後";
  },
  meridiem(hour, minute, isLower) {
    if (hour < 12) {
      return "午前";
    } else {
      return "午後";
    }
  },
  calendar: {
    sameDay: "[今日] LT",
    nextDay: "[明日] LT",
    nextWeek: "[来週]dddd LT",
    lastDay: "[昨日] LT",
    lastWeek: "[前週]dddd LT",
    sameElse: "L"
  },
  dayOfMonthOrdinalParse: /\d{1,2}日/,
  ordinal(num, period) {
    switch (period) {
      case "d":
      case "D":
      case "DDD":
        return num + "日";
      default:
        return num.toString(10);
    }
  },
  relativeTime: {
    future: "%s後",
    past: "%s前",
    s: "数秒",
    ss: "%d秒",
    m: "1分",
    mm: "%d分",
    h: "1時間",
    hh: "%d時間",
    d: "1日",
    dd: "%d日",
    M: "1ヶ月",
    MM: "%dヶ月",
    y: "1年",
    yy: "%d年"
  }
};
var kaLocale = {
  abbr: "ka",
  months: {
    format: "იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_"),
    standalone: "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_")
  },
  monthsShort: "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
  weekdays: {
    standalone: "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
    format: "კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_"),
    isFormat: /(წინა|შემდეგ)/
  },
  weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
  weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY h:mm A",
    LLLL: "dddd, D MMMM YYYY h:mm A"
  },
  calendar: {
    sameDay: "[დღეს] LT[-ზე]",
    nextDay: "[ხვალ] LT[-ზე]",
    lastDay: "[გუშინ] LT[-ზე]",
    nextWeek: "[შემდეგ] dddd LT[-ზე]",
    lastWeek: "[წინა] dddd LT-ზე",
    sameElse: "L"
  },
  relativeTime: {
    future(s) {
      var st = s.toString();
      return /(წამი|წუთი|საათი|წელი)/.test(st) ? st.replace(/ი$/, "ში") : st + "ში";
    },
    past(s) {
      var st = s.toString();
      if (/(წამი|წუთი|საათი|დღე|თვე)/.test(st)) {
        return st.replace(/(ი|ე)$/, "ის წინ");
      }
      if (/წელი/.test(st)) {
        return st.replace(/წელი$/, "წლის წინ");
      }
    },
    s: "რამდენიმე წამი",
    ss: "%d წამი",
    m: "წუთი",
    mm: "%d წუთი",
    h: "საათი",
    hh: "%d საათი",
    d: "დღე",
    dd: "%d დღე",
    M: "თვე",
    MM: "%d თვე",
    y: "წელი",
    yy: "%d წელი"
  },
  dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
  ordinal(_num, _period) {
    const num = Number(_num);
    if (num === 0) {
      return num.toString();
    }
    if (num === 1) {
      return num + "-ლი";
    }
    if (num < 20 || num <= 100 && num % 20 === 0 || num % 100 === 0) {
      return "მე-" + num;
    }
    return num + "-ე";
  },
  week: {
    dow: 1,
    doy: 4
  }
};
var suffixes$1 = {
  0: "-ші",
  1: "-ші",
  2: "-ші",
  3: "-ші",
  4: "-ші",
  5: "-ші",
  6: "-шы",
  7: "-ші",
  8: "-ші",
  9: "-шы",
  10: "-шы",
  20: "-шы",
  30: "-шы",
  40: "-шы",
  50: "-ші",
  60: "-шы",
  70: "-ші",
  80: "-ші",
  90: "-шы",
  100: "-ші"
};
var kkLocale = {
  abbr: "kk",
  months: "қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"),
  monthsShort: "қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"),
  weekdays: "жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"),
  weekdaysShort: "жек_дүй_сей_сәр_бей_жұм_сен".split("_"),
  weekdaysMin: "жк_дй_сй_ср_бй_жм_сн".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Бүгін сағат] LT",
    nextDay: "[Ертең сағат] LT",
    nextWeek: "dddd [сағат] LT",
    lastDay: "[Кеше сағат] LT",
    lastWeek: "[Өткен аптаның] dddd [сағат] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s ішінде",
    past: "%s бұрын",
    s: "бірнеше секунд",
    ss: "%d секунд",
    m: "бір минут",
    mm: "%d минут",
    h: "бір сағат",
    hh: "%d сағат",
    d: "бір күн",
    dd: "%d күн",
    M: "бір ай",
    MM: "%d ай",
    y: "бір жыл",
    yy: "%d жыл"
  },
  dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
  ordinal(_num) {
    const a = _num % 10;
    const b = _num >= 100 ? 100 : null;
    return _num + (suffixes$1[_num] || suffixes$1[a] || suffixes$1[b]);
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 7
    // The week that contains Jan 7th is the first week of the year.
  }
};
var koLocale = {
  abbr: "ko",
  months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
  monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
  weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
  weekdaysShort: "일_월_화_수_목_금_토".split("_"),
  weekdaysMin: "일_월_화_수_목_금_토".split("_"),
  longDateFormat: {
    LT: "A h:mm",
    LTS: "A h:mm:ss",
    L: "YYYY.MM.DD",
    LL: "YYYY년 MMMM D일",
    LLL: "YYYY년 MMMM D일 A h:mm",
    LLLL: "YYYY년 MMMM D일 dddd A h:mm",
    l: "YYYY.MM.DD",
    ll: "YYYY년 MMMM D일",
    lll: "YYYY년 MMMM D일 A h:mm",
    llll: "YYYY년 MMMM D일 dddd A h:mm"
  },
  calendar: {
    sameDay: "오늘 LT",
    nextDay: "내일 LT",
    nextWeek: "dddd LT",
    lastDay: "어제 LT",
    lastWeek: "지난주 dddd LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s 후",
    past: "%s 전",
    s: "몇 초",
    ss: "%d초",
    m: "1분",
    mm: "%d분",
    h: "한 시간",
    hh: "%d시간",
    d: "하루",
    dd: "%d일",
    M: "한 달",
    MM: "%d달",
    y: "일 년",
    yy: "%d년"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(일|월|주)/,
  ordinal: function(num, period) {
    switch (period) {
      case "d":
      case "D":
      case "DDD":
        return num + "일";
      case "M":
        return num + "월";
      case "w":
      case "W":
        return num + "주";
      default:
        return num.toString(10);
    }
  },
  meridiemParse: /오전|오후/,
  isPM: function(token) {
    return token === "오후";
  },
  meridiem: function(hour, minute, isUpper) {
    return hour < 12 ? "오전" : "오후";
  }
};
var units = {
  ss: "sekundė_sekundžių_sekundes",
  m: "minutė_minutės_minutę",
  mm: "minutės_minučių_minutes",
  h: "valanda_valandos_valandą",
  hh: "valandos_valandų_valandas",
  d: "diena_dienos_dieną",
  dd: "dienos_dienų_dienas",
  M: "mėnuo_mėnesio_mėnesį",
  MM: "mėnesiai_mėnesių_mėnesius",
  y: "metai_metų_metus",
  yy: "metai_metų_metus"
};
function translateSeconds(num, withoutSuffix, key, isFuture) {
  if (withoutSuffix) {
    return "kelios sekundės";
  } else {
    return isFuture ? "kelių sekundžių" : "kelias sekundes";
  }
}
function translateSingular(num, withoutSuffix, key, isFuture) {
  return withoutSuffix ? forms(key)[0] : isFuture ? forms(key)[1] : forms(key)[2];
}
function special(num) {
  return num % 10 === 0 || num > 10 && num < 20;
}
function forms(key) {
  return units[key].split("_");
}
function translate$3(num, withoutSuffix, key, isFuture) {
  let result = num + " ";
  if (num === 1) {
    return result + translateSingular(num, withoutSuffix, key[0], isFuture);
  } else if (withoutSuffix) {
    return result + (special(num) ? forms(key)[1] : forms(key)[0]);
  } else {
    if (isFuture) {
      return result + forms(key)[1];
    } else {
      return result + (special(num) ? forms(key)[1] : forms(key)[2]);
    }
  }
}
var ltLocale = {
  abbr: "lt",
  months: {
    format: "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
    standalone: "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),
    isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
  },
  monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
  weekdays: {
    format: "sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"),
    standalone: "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),
    isFormat: /dddd HH:mm/
  },
  weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
  weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY-MM-DD",
    LL: "YYYY [m.] MMMM D [d.]",
    LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
    LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
    l: "YYYY-MM-DD",
    ll: "YYYY [m.] MMMM D [d.]",
    lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
    llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
  },
  calendar: {
    sameDay: "[Šiandien] LT",
    nextDay: "[Rytoj] LT",
    nextWeek: "dddd LT",
    lastDay: "[Vakar] LT",
    lastWeek: "[Praėjusį] dddd LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "po %s",
    past: "prieš %s",
    s: translateSeconds,
    ss: translate$3,
    m: translateSingular,
    mm: translate$3,
    h: translateSingular,
    hh: translate$3,
    d: translateSingular,
    dd: translate$3,
    M: translateSingular,
    MM: translate$3,
    y: translateSingular,
    yy: translate$3
  },
  dayOfMonthOrdinalParse: /\d{1,2}-oji/,
  ordinal(num) {
    return num + "-oji";
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var lvLocale = {
  abbr: "lv",
  months: "Janvāris_Februāris_Marts_Aprīlis_Maijs_Jūnijs_Jūlijs_Augusts_Septembris_Oktobris_Novembris_Decembris".split("_"),
  monthsShort: "Jan_Feb_Mar_Apr_Mai_Jūn_Jūl_Aug_Sep_Okt_Nov_Dec".split("_"),
  weekdays: "Svētdiena_Pirmdiena_Otrdiena_Trešdiena_Ceturtdiena_Piektdiena_Sestdiena".split("_"),
  weekdaysShort: "Svētd_Pirmd_Otrd_Trešd_Ceturtd_Piektd_Sestd".split("_"),
  weekdaysMin: "Sv_Pi_Ot_Tr_Ce_Pk_Se".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "[Last] dddd [at] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "pēc %s",
    past: "pirms %s",
    s: "dažām sekundēm",
    ss: "%d sekundēm",
    m: "minūtes",
    mm: "%d minūtēm",
    h: "stundas",
    hh: "%d stundām",
    d: "dienas",
    dd: "%d dienām",
    M: "mēneša",
    MM: "%d mēnešiem",
    y: "gada",
    yy: "%d gadiem"
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal(num) {
    return num + ".";
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
function translate$2(num, withoutSuffix, key, isFuture) {
  switch (key) {
    case "s":
      return withoutSuffix ? "хэдхэн секунд" : "хэдхэн секундын";
    case "ss":
      return num + (withoutSuffix ? " секунд" : " секундын");
    case "m":
    case "mm":
      return num + (withoutSuffix ? " минут" : " минутын");
    case "h":
    case "hh":
      return num + (withoutSuffix ? " цаг" : " цагийн");
    case "d":
    case "dd":
      return num + (withoutSuffix ? " өдөр" : " өдрийн");
    case "M":
    case "MM":
      return num + (withoutSuffix ? " сар" : " сарын");
    case "y":
    case "yy":
      return num + (withoutSuffix ? " жил" : " жилийн");
    default:
      return num.toString(10);
  }
}
var mnLocale = {
  abbr: "mn",
  months: "Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар".split("_"),
  monthsShort: "1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар".split("_"),
  monthsParseExact: true,
  weekdays: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"),
  weekdaysShort: "Ням_Дав_Мяг_Лха_Пүр_Баа_Бям".split("_"),
  weekdaysMin: "Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY-MM-DD",
    LL: "YYYY оны MMMMын D",
    LLL: "YYYY оны MMMMын D HH:mm",
    LLLL: "dddd, YYYY оны MMMMын D HH:mm"
  },
  meridiemParse: /ҮӨ|ҮХ/i,
  isPM: function(input) {
    return input === "ҮХ";
  },
  meridiem: function(hour, minute, isLower) {
    if (hour < 12) {
      return "ҮӨ";
    } else {
      return "ҮХ";
    }
  },
  calendar: {
    sameDay: "[Өнөөдөр] LT",
    nextDay: "[Маргааш] LT",
    nextWeek: "[Ирэх] dddd LT",
    lastDay: "[Өчигдөр] LT",
    lastWeek: "[Өнгөрсөн] dddd LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s дараа",
    past: "%s өмнө",
    s: translate$2,
    ss: translate$2,
    m: translate$2,
    mm: translate$2,
    h: translate$2,
    hh: translate$2,
    d: translate$2,
    dd: translate$2,
    M: translate$2,
    MM: translate$2,
    y: translate$2,
    yy: translate$2
  },
  dayOfMonthOrdinalParse: /\d{1,2} өдөр/,
  ordinal: function(num, period) {
    switch (period) {
      case "d":
      case "D":
      case "DDD":
        return num + " өдөр";
      default:
        return num.toString(10);
    }
  }
};
var nbLocale = {
  abbr: "nb",
  months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
  monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
  monthsParseExact: true,
  weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
  weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"),
  weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY [kl.] HH:mm",
    LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
  },
  calendar: {
    sameDay: "[i dag kl.] LT",
    nextDay: "[i morgen kl.] LT",
    nextWeek: "dddd [kl.] LT",
    lastDay: "[i går kl.] LT",
    lastWeek: "[forrige] dddd [kl.] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "om %s",
    past: "%s siden",
    s: "noen sekunder",
    ss: "%d sekunder",
    m: "ett minutt",
    mm: "%d minutter",
    h: "en time",
    hh: "%d timer",
    d: "en dag",
    dd: "%d dager",
    M: "en måned",
    MM: "%d måneder",
    y: "ett år",
    yy: "%d år"
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var monthsShortWithDots$1 = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_");
var monthsShortWithoutDots$1 = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
var monthsParse$2 = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
var monthsRegex$1 = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
var nlBeLocale = {
  abbr: "nl-be",
  months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
  monthsShort(date, format, isUTC) {
    if (!date) {
      return monthsShortWithDots$1;
    } else if (/-MMM-/.test(format)) {
      return monthsShortWithoutDots$1[getMonth(date, isUTC)];
    } else {
      return monthsShortWithDots$1[getMonth(date, isUTC)];
    }
  },
  monthsRegex: monthsRegex$1,
  monthsShortRegex: monthsRegex$1,
  monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
  monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
  monthsParse: monthsParse$2,
  longMonthsParse: monthsParse$2,
  shortMonthsParse: monthsParse$2,
  weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
  weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
  weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[vandaag om] LT",
    nextDay: "[morgen om] LT",
    nextWeek: "dddd [om] LT",
    lastDay: "[gisteren om] LT",
    lastWeek: "[afgelopen] dddd [om] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "over %s",
    past: "%s geleden",
    s: "een paar seconden",
    ss: "%d seconden",
    m: "één minuut",
    mm: "%d minuten",
    h: "één uur",
    hh: "%d uur",
    d: "één dag",
    dd: "%d dagen",
    M: "één maand",
    MM: "%d maanden",
    y: "één jaar",
    yy: "%d jaar"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
  ordinal(_num) {
    const num = Number(_num);
    return num + (num === 1 || num === 8 || num >= 20 ? "ste" : "de");
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var monthsShortWithDots = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_");
var monthsShortWithoutDots = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
var monthsParse$1 = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
var nlLocale = {
  abbr: "nl",
  months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
  monthsShort(date, format, isUTC) {
    if (!date) {
      return monthsShortWithDots;
    } else if (/-MMM-/.test(format)) {
      return monthsShortWithoutDots[getMonth(date, isUTC)];
    } else {
      return monthsShortWithDots[getMonth(date, isUTC)];
    }
  },
  monthsRegex,
  monthsShortRegex: monthsRegex,
  monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
  monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
  monthsParse: monthsParse$1,
  longMonthsParse: monthsParse$1,
  shortMonthsParse: monthsParse$1,
  weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
  weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
  weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD-MM-YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[vandaag om] LT",
    nextDay: "[morgen om] LT",
    nextWeek: "dddd [om] LT",
    lastDay: "[gisteren om] LT",
    lastWeek: "[afgelopen] dddd [om] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "over %s",
    past: "%s geleden",
    s: "een paar seconden",
    ss: "%d seconden",
    m: "één minuut",
    mm: "%d minuten",
    h: "één uur",
    hh: "%d uur",
    d: "één dag",
    dd: "%d dagen",
    M: "één maand",
    MM: "%d maanden",
    y: "één jaar",
    yy: "%d jaar"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
  ordinal(_num) {
    const num = Number(_num);
    return num + (num === 1 || num === 8 || num >= 20 ? "ste" : "de");
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var monthsNominative = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_");
var monthsSubjective = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");
function plural$3(num) {
  return num % 10 < 5 && num % 10 > 1 && ~~(num / 10) % 10 !== 1;
}
function translate$1(num, withoutSuffix, key) {
  let result = num + " ";
  switch (key) {
    case "ss":
      return result + (plural$3(num) ? "sekundy" : "sekund");
    case "m":
      return withoutSuffix ? "minuta" : "minutę";
    case "mm":
      return result + (plural$3(num) ? "minuty" : "minut");
    case "h":
      return withoutSuffix ? "godzina" : "godzinę";
    case "hh":
      return result + (plural$3(num) ? "godziny" : "godzin");
    case "MM":
      return result + (plural$3(num) ? "miesiące" : "miesięcy");
    case "yy":
      return result + (plural$3(num) ? "lata" : "lat");
  }
}
var plLocale = {
  abbr: "pl",
  months(date, format, isUTC) {
    if (!date) {
      return monthsNominative;
    } else if (format === "") {
      return "(" + monthsSubjective[getMonth(date, isUTC)] + "|" + monthsNominative[getMonth(date, isUTC)] + ")";
    } else if (/D MMMM/.test(format)) {
      return monthsSubjective[getMonth(date, isUTC)];
    } else {
      return monthsNominative[getMonth(date, isUTC)];
    }
  },
  monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
  weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
  weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"),
  weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Dziś o] LT",
    nextDay: "[Jutro o] LT",
    nextWeek(date) {
      switch (getDayOfWeek(date)) {
        case 0:
          return "[W niedzielę o] LT";
        case 2:
          return "[We wtorek o] LT";
        case 3:
          return "[W środę o] LT";
        case 5:
          return "[W piątek o] LT";
        case 6:
          return "[W sobotę o] LT";
        default:
          return "[W] dddd [o] LT";
      }
    },
    lastDay: "[Wczoraj o] LT",
    lastWeek(date) {
      switch (getDayOfWeek(date)) {
        case 0:
          return "[W zeszłą niedzielę o] LT";
        case 3:
          return "[W zeszłą środę o] LT";
        case 4:
          return "[W zeszłą czwartek o] LT";
        case 5:
          return "[W zeszłą piątek o] LT";
        case 6:
          return "[W zeszłą sobotę o] LT";
        default:
          return "[W zeszły] dddd [o] LT";
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "za %s",
    past: "%s temu",
    s: "kilka sekund",
    ss: translate$1,
    m: translate$1,
    mm: translate$1,
    h: translate$1,
    hh: translate$1,
    d: "1 dzień",
    dd: "%d dni",
    M: "miesiąc",
    MM: translate$1,
    y: "rok",
    yy: translate$1
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var ptBrLocale = {
  abbr: "pt-br",
  months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
  monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
  weekdays: "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
  weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
  weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
    LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm"
  },
  calendar: {
    sameDay: "[Hoje às] LT",
    nextDay: "[Amanhã às] LT",
    nextWeek: "dddd [às] LT",
    lastDay: "[Ontem às] LT",
    lastWeek(date) {
      return getDayOfWeek(date) === 0 || getDayOfWeek(date) === 6 ? "[Último] dddd [às] LT" : (
        // Saturday + Sunday
        "[Última] dddd [às] LT"
      );
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "em %s",
    past: "%s atrás",
    s: "poucos segundos",
    ss: "%d segundos",
    m: "um minuto",
    mm: "%d minutos",
    h: "uma hora",
    hh: "%d horas",
    d: "um dia",
    dd: "%d dias",
    M: "um mês",
    MM: "%d meses",
    y: "um ano",
    yy: "%d anos"
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº"
};
function relativeTimeWithPlural$2(num, withoutSuffix, key) {
  let format = {
    ss: "secunde",
    mm: "minute",
    hh: "ore",
    dd: "zile",
    MM: "luni",
    yy: "ani"
  };
  let separator = " ";
  if (num % 100 >= 20 || num >= 100 && num % 100 === 0) {
    separator = " de ";
  }
  return num + separator + format[key];
}
var roLocale = {
  abbr: "ro",
  months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
  monthsShort: "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
  monthsParseExact: true,
  weekdays: "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),
  weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
  weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY H:mm",
    LLLL: "dddd, D MMMM YYYY H:mm"
  },
  calendar: {
    sameDay: "[azi la] LT",
    nextDay: "[mâine la] LT",
    nextWeek: "dddd [la] LT",
    lastDay: "[ieri la] LT",
    lastWeek: "[fosta] dddd [la] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "peste %s",
    past: "%s în urmă",
    s: "câteva secunde",
    ss: relativeTimeWithPlural$2,
    m: "un minut",
    mm: relativeTimeWithPlural$2,
    h: "o oră",
    hh: relativeTimeWithPlural$2,
    d: "o zi",
    dd: relativeTimeWithPlural$2,
    M: "o lună",
    MM: relativeTimeWithPlural$2,
    y: "un an",
    yy: relativeTimeWithPlural$2
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 7
    // The week that contains Jan 1st is the first week of the year.
  }
};
function plural$2(word, num) {
  let forms2 = word.split("_");
  return num % 10 === 1 && num % 100 !== 11 ? forms2[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms2[1] : forms2[2];
}
function relativeTimeWithPlural$1(num, withoutSuffix, key) {
  let format = {
    ss: withoutSuffix ? "секунда_секунды_секунд" : "секунду_секунды_секунд",
    mm: withoutSuffix ? "минута_минуты_минут" : "минуту_минуты_минут",
    hh: "час_часа_часов",
    dd: "день_дня_дней",
    MM: "месяц_месяца_месяцев",
    yy: "год_года_лет"
  };
  if (key === "m") {
    return withoutSuffix ? "минута" : "минуту";
  }
  return num + " " + plural$2(format[key], +num);
}
var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];
var ruLocale = {
  abbr: "ru",
  months: {
    format: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),
    standalone: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_")
  },
  monthsShort: {
    // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
    format: "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),
    standalone: "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_")
  },
  weekdays: {
    standalone: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
    format: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"),
    isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
  },
  weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
  weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
  monthsParse,
  longMonthsParse: monthsParse,
  shortMonthsParse: monthsParse,
  // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
  monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
  // копия предыдущего
  monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
  // полные названия с падежами
  monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
  // Выражение, которое соотвествует только сокращённым формам
  monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY г.",
    LLL: "D MMMM YYYY г., H:mm",
    LLLL: "dddd, D MMMM YYYY г., H:mm"
  },
  calendar: {
    sameDay: "[Сегодня в] LT",
    nextDay: "[Завтра в] LT",
    lastDay: "[Вчера в] LT",
    nextWeek(date, now) {
      if (getWeek(now) !== getWeek(date)) {
        switch (getDayOfWeek(date)) {
          case 0:
            return "[В следующее] dddd [в] LT";
          case 1:
          case 2:
          case 4:
            return "[В следующий] dddd [в] LT";
          case 3:
          case 5:
          case 6:
            return "[В следующую] dddd [в] LT";
        }
      } else {
        if (getDayOfWeek(date) === 2) {
          return "[Во] dddd [в] LT";
        } else {
          return "[В] dddd [в] LT";
        }
      }
    },
    lastWeek(date, now) {
      if (getWeek(now) !== getWeek(date)) {
        switch (getDayOfWeek(date)) {
          case 0:
            return "[В прошлое] dddd [в] LT";
          case 1:
          case 2:
          case 4:
            return "[В прошлый] dddd [в] LT";
          case 3:
          case 5:
          case 6:
            return "[В прошлую] dddd [в] LT";
        }
      } else {
        if (getDayOfWeek(date) === 2) {
          return "[Во] dddd [в] LT";
        } else {
          return "[В] dddd [в] LT";
        }
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "через %s",
    past: "%s назад",
    s: "несколько секунд",
    ss: relativeTimeWithPlural$1,
    m: relativeTimeWithPlural$1,
    mm: relativeTimeWithPlural$1,
    h: "час",
    hh: relativeTimeWithPlural$1,
    d: "день",
    dd: relativeTimeWithPlural$1,
    M: "месяц",
    MM: relativeTimeWithPlural$1,
    y: "год",
    yy: relativeTimeWithPlural$1
  },
  meridiemParse: /ночи|утра|дня|вечера/i,
  isPM(input) {
    return /^(дня|вечера)$/.test(input);
  },
  meridiem(hour, minute, isLower) {
    if (hour < 4) {
      return "ночи";
    } else if (hour < 12) {
      return "утра";
    } else if (hour < 17) {
      return "дня";
    } else {
      return "вечера";
    }
  },
  dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
  ordinal(_num, period) {
    const num = Number(_num);
    switch (period) {
      case "M":
      case "d":
      case "DDD":
        return num + "-й";
      case "D":
        return num + "-го";
      case "w":
      case "W":
        return num + "-я";
      default:
        return num.toString(10);
    }
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var months$1 = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_");
var monthsShort = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");
function plural$1(num) {
  return num > 1 && num < 5 && ~~(num / 10) !== 1;
}
function translate(num, withoutSuffix, key, isFuture) {
  const result = num + " ";
  switch (key) {
    case "s":
      return withoutSuffix || isFuture ? "pár sekúnd" : "pár sekundami";
    case "ss":
      if (withoutSuffix || isFuture) {
        return result + (plural$1(num) ? "sekundy" : "sekúnd");
      } else {
        return result + "sekundami";
      }
    // break;
    case "m":
      return withoutSuffix ? "minúta" : isFuture ? "minútu" : "minútou";
    case "mm":
      if (withoutSuffix || isFuture) {
        return result + (plural$1(num) ? "minúty" : "minút");
      } else {
        return result + "minútami";
      }
    // break;
    case "h":
      return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";
    case "hh":
      if (withoutSuffix || isFuture) {
        return result + (plural$1(num) ? "hodiny" : "hodín");
      } else {
        return result + "hodinami";
      }
    // break;
    case "d":
      return withoutSuffix || isFuture ? "deň" : "dňom";
    case "dd":
      if (withoutSuffix || isFuture) {
        return result + (plural$1(num) ? "dni" : "dní");
      } else {
        return result + "dňami";
      }
    // break;
    case "M":
      return withoutSuffix || isFuture ? "mesiac" : "mesiacom";
    case "MM":
      if (withoutSuffix || isFuture) {
        return result + (plural$1(num) ? "mesiace" : "mesiacov");
      } else {
        return result + "mesiacmi";
      }
    // break;
    case "y":
      return withoutSuffix || isFuture ? "rok" : "rokom";
    case "yy":
      if (withoutSuffix || isFuture) {
        return result + (plural$1(num) ? "roky" : "rokov");
      } else {
        return result + "rokmi";
      }
  }
}
var skLocale = {
  abbr: "sk",
  months: months$1,
  monthsShort,
  weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
  weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
  weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY H:mm",
    LLLL: "dddd D. MMMM YYYY H:mm",
    l: "D. M. YYYY"
  },
  calendar: {
    sameDay: "[dnes o] LT",
    nextDay: "[zajtra o] LT",
    nextWeek(date) {
      switch (getDayOfWeek(date)) {
        case 0:
          return "[v nedeľu o] LT";
        case 1:
        case 2:
          return "[v] dddd [o] LT";
        case 3:
          return "[v stredu o] LT";
        case 4:
          return "[vo štvrtok o] LT";
        case 5:
          return "[v piatok o] LT";
        case 6:
          return "[v sobotu o] LT";
      }
    },
    lastDay: "[včera o] LT",
    lastWeek(date) {
      switch (getDayOfWeek(date)) {
        case 0:
          return "[minulú nedeľu o] LT";
        case 1:
        case 2:
          return "[minulý] dddd [o] LT";
        case 3:
          return "[minulú stredu o] LT";
        case 4:
        case 5:
          return "[minulý] dddd [o] LT";
        case 6:
          return "[minulú sobotu o] LT";
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "o %s",
    past: "pred %s",
    s: translate,
    ss: translate,
    m: translate,
    mm: translate,
    h: translate,
    hh: translate,
    d: translate,
    dd: translate,
    M: translate,
    MM: translate,
    y: translate,
    yy: translate
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
function processRelativeTime(number, withoutSuffix, key, isFuture) {
  var result = number + " ";
  switch (key) {
    case "s":
      return withoutSuffix || isFuture ? "nekaj sekund" : "nekaj sekundami";
    case "ss":
      if (number === 1) {
        result += withoutSuffix ? "sekundo" : "sekundi";
      } else if (number === 2) {
        result += withoutSuffix || isFuture ? "sekundi" : "sekundah";
      } else if (number < 5) {
        result += withoutSuffix || isFuture ? "sekunde" : "sekundah";
      } else {
        result += withoutSuffix || isFuture ? "sekund" : "sekund";
      }
      return result;
    case "m":
      return withoutSuffix ? "ena minuta" : "eno minuto";
    case "mm":
      if (number === 1) {
        result += withoutSuffix ? "minuta" : "minuto";
      } else if (number === 2) {
        result += withoutSuffix || isFuture ? "minuti" : "minutama";
      } else if (number < 5) {
        result += withoutSuffix || isFuture ? "minute" : "minutami";
      } else {
        result += withoutSuffix || isFuture ? "minut" : "minutami";
      }
      return result;
    case "h":
      return withoutSuffix ? "ena ura" : "eno uro";
    case "hh":
      if (number === 1) {
        result += withoutSuffix ? "ura" : "uro";
      } else if (number === 2) {
        result += withoutSuffix || isFuture ? "uri" : "urama";
      } else if (number < 5) {
        result += withoutSuffix || isFuture ? "ure" : "urami";
      } else {
        result += withoutSuffix || isFuture ? "ur" : "urami";
      }
      return result;
    case "d":
      return withoutSuffix || isFuture ? "en dan" : "enim dnem";
    case "dd":
      if (number === 1) {
        result += withoutSuffix || isFuture ? "dan" : "dnem";
      } else if (number === 2) {
        result += withoutSuffix || isFuture ? "dni" : "dnevoma";
      } else {
        result += withoutSuffix || isFuture ? "dni" : "dnevi";
      }
      return result;
    case "M":
      return withoutSuffix || isFuture ? "en mesec" : "enim mesecem";
    case "MM":
      if (number === 1) {
        result += withoutSuffix || isFuture ? "mesec" : "mesecem";
      } else if (number === 2) {
        result += withoutSuffix || isFuture ? "meseca" : "mesecema";
      } else if (number < 5) {
        result += withoutSuffix || isFuture ? "mesece" : "meseci";
      } else {
        result += withoutSuffix || isFuture ? "mesecev" : "meseci";
      }
      return result;
    case "y":
      return withoutSuffix || isFuture ? "eno leto" : "enim letom";
    case "yy":
      if (number === 1) {
        result += withoutSuffix || isFuture ? "leto" : "letom";
      } else if (number === 2) {
        result += withoutSuffix || isFuture ? "leti" : "letoma";
      } else if (number < 5) {
        result += withoutSuffix || isFuture ? "leta" : "leti";
      } else {
        result += withoutSuffix || isFuture ? "let" : "leti";
      }
      return result;
  }
}
var slLocale = {
  abbr: "sl",
  months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
  monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
  monthsParseExact: true,
  weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
  weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
  weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY H:mm",
    LLLL: "dddd, D. MMMM YYYY H:mm"
  },
  calendar: {
    sameDay: "[danes ob] LT",
    nextDay: "[jutri ob] LT",
    nextWeek(date) {
      switch (getDayOfWeek(date)) {
        case 0:
          return "[v] [nedeljo] [ob] LT";
        case 3:
          return "[v] [sredo] [ob] LT";
        case 6:
          return "[v] [soboto] [ob] LT";
        case 1:
        case 2:
        case 4:
        case 5:
          return "[v] dddd [ob] LT";
      }
    },
    lastDay: "[včeraj ob] LT",
    lastWeek(date) {
      switch (getDayOfWeek(date)) {
        case 0:
          return "[prejšnjo] [nedeljo] [ob] LT";
        case 3:
          return "[prejšnjo] [sredo] [ob] LT";
        case 6:
          return "[prejšnjo] [soboto] [ob] LT";
        case 1:
        case 2:
        case 4:
        case 5:
          return "[prejšnji] dddd [ob] LT";
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "čez %s",
    past: "pred %s",
    s: processRelativeTime,
    ss: processRelativeTime,
    m: processRelativeTime,
    mm: processRelativeTime,
    h: processRelativeTime,
    hh: processRelativeTime,
    d: processRelativeTime,
    dd: processRelativeTime,
    M: processRelativeTime,
    MM: processRelativeTime,
    y: processRelativeTime,
    yy: processRelativeTime
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 7
    // The week that contains Jan 1st is the first week of the year.
  }
};
var sqLocale = {
  abbr: "sq",
  months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
  monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
  weekdays: "E Dielë_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
  weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
  weekdaysMin: "Di_He_Ma_Me_En_Pr_Sh".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Sot në] LT",
    nextDay: "[Nesër në] LT",
    nextWeek: "dddd [në] LT",
    lastDay: "[Dje në] LT",
    lastWeek: "dddd [e kaluar në] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "në %s",
    past: "para %sve",
    s: "disa sekonda",
    ss: "%d sekonda",
    m: "një minut",
    mm: "%d minuta",
    h: "një orë",
    hh: "%d orë",
    d: "një ditë",
    dd: "%d ditë",
    M: "një muaj",
    MM: "%d muaj",
    y: "një vit",
    yy: "%d vite"
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  // need clarification
  ordinal: "%d.",
  // need clarification
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var svLocale = {
  abbr: "sv",
  months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
  monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
  weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
  weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
  weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY-MM-DD",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY [kl.] HH:mm",
    LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
    lll: "D MMM YYYY HH:mm",
    llll: "ddd D MMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Idag] LT",
    nextDay: "[Imorgon] LT",
    lastDay: "[Igår] LT",
    nextWeek: "[På] dddd LT",
    lastWeek: "[I] dddd[s] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "om %s",
    past: "för %s sedan",
    s: "några sekunder",
    ss: "%d sekunder",
    m: "en minut",
    mm: "%d minuter",
    h: "en timme",
    hh: "%d timmar",
    d: "en dag",
    dd: "%d dagar",
    M: "en månad",
    MM: "%d månader",
    y: "ett år",
    yy: "%d år"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
  ordinal(_num) {
    const num = Number(_num);
    let b = num % 10, output = ~~(num % 100 / 10) === 1 ? "e" : b === 1 ? "a" : b === 2 ? "a" : b === 3 ? "e" : "e";
    return num + output;
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var thLocale = {
  abbr: "th",
  months: "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
  monthsShort: "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"),
  monthsParseExact: true,
  weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
  weekdaysShort: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
  // yes, three characters difference
  weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY เวลา H:mm",
    LLLL: "วันddddที่ D MMMM YYYY เวลา H:mm"
  },
  meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
  isPM(input) {
    return input === "หลังเที่ยง";
  },
  meridiem(hour, minute, isLower) {
    if (hour < 12) {
      return "ก่อนเที่ยง";
    } else {
      return "หลังเที่ยง";
    }
  },
  calendar: {
    sameDay: "[วันนี้ เวลา] LT",
    nextDay: "[พรุ่งนี้ เวลา] LT",
    nextWeek: "dddd[หน้า เวลา] LT",
    lastDay: "[เมื่อวานนี้ เวลา] LT",
    lastWeek: "[วัน]dddd[ที่แล้ว เวลา] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "อีก %s",
    past: "%sที่แล้ว",
    s: "ไม่กี่วินาที",
    ss: "%d วินาที",
    m: "1 นาที",
    mm: "%d นาที",
    h: "1 ชั่วโมง",
    hh: "%d ชั่วโมง",
    d: "1 วัน",
    dd: "%d วัน",
    M: "1 เดือน",
    MM: "%d เดือน",
    y: "1 ปี",
    yy: "%d ปี"
  }
};
var thBeLocale = {
  abbr: "th-be",
  months: "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
  monthsShort: "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"),
  monthsParseExact: true,
  weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
  weekdaysShort: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
  weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY เวลา H:mm",
    LLLL: "วันddddที่ D MMMM YYYY เวลา H:mm"
  },
  meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
  isPM(input) {
    return input === "หลังเที่ยง";
  },
  meridiem(hour, minute, isLower) {
    if (hour < 12) {
      return "ก่อนเที่ยง";
    } else {
      return "หลังเที่ยง";
    }
  },
  calendar: {
    sameDay: "[วันนี้ เวลา] LT",
    nextDay: "[พรุ่งนี้ เวลา] LT",
    nextWeek: "dddd[หน้า เวลา] LT",
    lastDay: "[เมื่อวานนี้ เวลา] LT",
    lastWeek: "[วัน]dddd[ที่แล้ว เวลา] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "อีก %s",
    past: "%sที่แล้ว",
    s: "ไม่กี่วินาที",
    ss: "%d วินาที",
    m: "1 นาที",
    mm: "%d นาที",
    h: "1 ชั่วโมง",
    hh: "%d ชั่วโมง",
    d: "1 วัน",
    dd: "%d วัน",
    M: "1 เดือน",
    MM: "%d เดือน",
    y: "1 ปี",
    yy: "%d ปี"
  },
  preparse(str, format) {
    const _format = thBeLocale.longDateFormat[format] ? thBeLocale.longDateFormat[format] : format;
    if (_format.indexOf("YYYY", _format.length - "YYYY".length) !== -1) {
      const ddMM = str.substr(0, str.length - 4);
      const yyyy = parseInt(str.substr(str.length - 4), 10) - 543;
      return ddMM + yyyy;
    }
    return str;
  },
  getFullYear(date, isUTC = false) {
    return 543 + (isUTC ? date.getUTCFullYear() : date.getFullYear());
  }
};
var suffixes = {
  1: "'inci",
  5: "'inci",
  8: "'inci",
  70: "'inci",
  80: "'inci",
  2: "'nci",
  7: "'nci",
  20: "'nci",
  50: "'nci",
  3: "'üncü",
  4: "'üncü",
  100: "'üncü",
  6: "'ncı",
  9: "'uncu",
  10: "'uncu",
  30: "'uncu",
  60: "'ıncı",
  90: "'ıncı"
};
var trLocale = {
  abbr: "tr",
  months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
  monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
  weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
  weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
  weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[bugün saat] LT",
    nextDay: "[yarın saat] LT",
    nextWeek: "[gelecek] dddd [saat] LT",
    lastDay: "[dün] LT",
    lastWeek: "[geçen] dddd [saat] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s sonra",
    past: "%s önce",
    s: "birkaç saniye",
    ss: "%d saniye",
    m: "bir dakika",
    mm: "%d dakika",
    h: "bir saat",
    hh: "%d saat",
    d: "bir gün",
    dd: "%d gün",
    M: "bir ay",
    MM: "%d ay",
    y: "bir yıl",
    yy: "%d yıl"
  },
  dayOfMonthOrdinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
  ordinal(_num) {
    const num = Number(_num);
    if (num === 0) {
      return num + "'ıncı";
    }
    let a = num % 10, b = num % 100 - a, c = num >= 100 ? 100 : null;
    return num + (suffixes[a] || suffixes[b] || suffixes[c]);
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 7
    // The week that contains Jan 1st is the first week of the year.
  }
};
function plural(word, num) {
  let forms2 = word.split("_");
  return num % 10 === 1 && num % 100 !== 11 ? forms2[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms2[1] : forms2[2];
}
function relativeTimeWithPlural(num, withoutSuffix, key) {
  let format = {
    ss: withoutSuffix ? "секунда_секунди_секунд" : "секунду_секунди_секунд",
    mm: withoutSuffix ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
    hh: withoutSuffix ? "година_години_годин" : "годину_години_годин",
    dd: "день_дні_днів",
    MM: "місяць_місяці_місяців",
    yy: "рік_роки_років"
  };
  if (key === "m") {
    return withoutSuffix ? "хвилина" : "хвилину";
  }
  if (key === "h") {
    return withoutSuffix ? "година" : "годину";
  }
  return num + " " + plural(format[key], +num);
}
function weekdaysCaseReplace(date, format, isUTC) {
  let weekdays = {
    nominative: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
    accusative: "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),
    genitive: "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")
  };
  if (!date) {
    return weekdays.nominative;
  }
  let nounCase = /(\[[ВвУу]\]) ?dddd/.test(format) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(format) ? "genitive" : "nominative";
  return weekdays[nounCase][getDayOfWeek(date, isUTC)];
}
function processHoursFunction(str) {
  return function(date) {
    return str + "о" + (getHours(date) === 11 ? "б" : "") + "] LT";
  };
}
var ukLocale = {
  abbr: "uk",
  months: {
    format: "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),
    standalone: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")
  },
  monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
  weekdays: weekdaysCaseReplace,
  weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY р.",
    LLL: "D MMMM YYYY р., HH:mm",
    LLLL: "dddd, D MMMM YYYY р., HH:mm"
  },
  calendar: {
    sameDay: processHoursFunction("[Сьогодні "),
    nextDay: processHoursFunction("[Завтра "),
    lastDay: processHoursFunction("[Вчора "),
    nextWeek: processHoursFunction("[У] dddd ["),
    lastWeek(date) {
      switch (getDayOfWeek(date)) {
        case 0:
        case 3:
        case 5:
        case 6:
          return processHoursFunction("[Минулої] dddd [")(date);
        case 1:
        case 2:
        case 4:
          return processHoursFunction("[Минулого] dddd [")(date);
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "за %s",
    past: "%s тому",
    s: "декілька секунд",
    ss: relativeTimeWithPlural,
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: "годину",
    hh: relativeTimeWithPlural,
    d: "день",
    dd: relativeTimeWithPlural,
    M: "місяць",
    MM: relativeTimeWithPlural,
    y: "рік",
    yy: relativeTimeWithPlural
  },
  // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
  meridiemParse: /ночі|ранку|дня|вечора/,
  isPM(input) {
    return /^(дня|вечора)$/.test(input);
  },
  meridiem(hour, minute, isLower) {
    if (hour < 4) {
      return "ночі";
    } else if (hour < 12) {
      return "ранку";
    } else if (hour < 17) {
      return "дня";
    } else {
      return "вечора";
    }
  },
  dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
  ordinal(_num, period) {
    const num = Number(_num);
    switch (period) {
      case "M":
      case "d":
      case "DDD":
      case "w":
      case "W":
        return num + "-й";
      case "D":
        return num + "-го";
      default:
        return num.toString();
    }
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 7
    // The week that contains Jan 1st is the first week of the year.
  }
};
var viLocale = {
  abbr: "vi",
  months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
  monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
  monthsParseExact: true,
  weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
  weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  weekdaysParseExact: true,
  meridiemParse: /sa|ch/i,
  isPM(input) {
    return /^ch$/i.test(input);
  },
  meridiem(hours, minutes, isLower) {
    if (hours < 12) {
      return isLower ? "sa" : "SA";
    } else {
      return isLower ? "ch" : "CH";
    }
  },
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM [năm] YYYY",
    LLL: "D MMMM [năm] YYYY HH:mm",
    LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
    l: "DD/M/YYYY",
    ll: "D MMM YYYY",
    lll: "D MMM YYYY HH:mm",
    llll: "ddd, D MMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Hôm nay lúc] LT",
    nextDay: "[Ngày mai lúc] LT",
    nextWeek: "dddd [tuần tới lúc] LT",
    lastDay: "[Hôm qua lúc] LT",
    lastWeek: "dddd [tuần trước lúc] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s tới",
    past: "%s trước",
    s: "vài giây",
    ss: "%d giây",
    m: "một phút",
    mm: "%d phút",
    h: "một giờ",
    hh: "%d giờ",
    d: "một ngày",
    dd: "%d ngày",
    M: "một tháng",
    MM: "%d tháng",
    y: "một năm",
    yy: "%d năm"
  },
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal(_num) {
    return "" + _num;
  },
  week: {
    dow: 1,
    // Thứ Hai là ngày đầu tuần.
    doy: 4
    // Tuần chứa ngày 4 tháng 1 là tuần đầu tiên trong năm.
  }
};
var zhCnLocale = {
  abbr: "zh-cn",
  months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
  monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
  weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
  weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
  weekdaysMin: "日_一_二_三_四_五_六".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY/MM/DD",
    LL: "YYYY年M月D日",
    LLL: "YYYY年M月D日Ah点mm分",
    LLLL: "YYYY年M月D日ddddAh点mm分",
    l: "YYYY/M/D",
    ll: "YYYY年M月D日",
    lll: "YYYY年M月D日 HH:mm",
    llll: "YYYY年M月D日dddd HH:mm"
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "凌晨" || meridiem === "早上" || meridiem === "上午") {
      return hour;
    } else if (meridiem === "下午" || meridiem === "晚上") {
      return hour + 12;
    } else {
      return hour >= 11 ? hour : hour + 12;
    }
  },
  meridiem(hour, minute, isLower) {
    let hm = hour * 100 + minute;
    if (hm < 600) {
      return "凌晨";
    } else if (hm < 900) {
      return "早上";
    } else if (hm < 1130) {
      return "上午";
    } else if (hm < 1230) {
      return "中午";
    } else if (hm < 1800) {
      return "下午";
    } else {
      return "晚上";
    }
  },
  calendar: {
    sameDay: "[今天]LT",
    nextDay: "[明天]LT",
    nextWeek: "[下]ddddLT",
    lastDay: "[昨天]LT",
    lastWeek: "[上]ddddLT",
    sameElse: "L"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal(_num, period) {
    const num = Number(_num);
    switch (period) {
      case "d":
      case "D":
      case "DDD":
        return num + "日";
      case "M":
        return num + "月";
      case "w":
      case "W":
        return num + "周";
      default:
        return num.toString();
    }
  },
  relativeTime: {
    future: "%s内",
    past: "%s前",
    s: "几秒",
    ss: "%d 秒",
    m: "1 分钟",
    mm: "%d 分钟",
    h: "1 小时",
    hh: "%d 小时",
    d: "1 天",
    dd: "%d 天",
    M: "1 个月",
    MM: "%d 个月",
    y: "1 年",
    yy: "%d 年"
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var symbolMap = {
  1: "١",
  2: "٢",
  3: "٣",
  4: "٤",
  5: "٥",
  6: "٦",
  7: "٧",
  8: "٨",
  9: "٩",
  0: "٠"
};
var numberMap = {
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
  "٠": "0"
};
var pluralForm = function(num) {
  return num === 0 ? 0 : num === 1 ? 1 : num === 2 ? 2 : num % 100 >= 3 && num % 100 <= 10 ? 3 : num % 100 >= 11 ? 4 : 5;
};
var plurals = {
  s: ["کمتر از یک ثانیه", "یک ثانیه", ["دو ثانیه", "دو ثانیه"], "%d ثانیه", "%d ثانیه", "%d ثانیه"],
  m: ["کمتر از یک دقیقه", "یک دقیقه", ["دو دقیقه", "دو دقیقه"], "%d دقیقه", "%d دقیقه", "%d دقیقه"],
  h: ["کمتر از یک ساعت", "یک ساعت", ["دو ساعت", "دو ساعت"], "%d ساعت", "%d ساعت", "%d ساعت"],
  d: ["کمتر از یک روز", "یک روز", ["دو روز", "دو روز"], "%d روز", "%d روز", "%d روز"],
  M: ["کمتر از یک ماه", "یک ماه", ["دو ماه", "دو ماه"], "%d ماه", "%d ماه", "%d ماه"],
  y: ["کمتر از یک سال", "یک سال", ["دو سال", "دو سال"], "%d سال", "%d سال", "%d سال"]
};
var pluralize = function(u) {
  return function(num, withoutSuffix) {
    const f = pluralForm(num);
    let str = plurals[u][pluralForm(num)];
    if (f === 2) {
      str = str[withoutSuffix ? 0 : 1];
    }
    return str.replace(/%d/i, num.toString());
  };
};
var months = ["ژانویه", "فوریه", "مارس", "آوریل", "می", "ژوئن", "جولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"];
var faLocale = {
  abbr: "fa",
  months,
  monthsShort: months,
  weekdays: "یکشنبه_دوشنبه_سه شنبه_چهارشنبه_پنج شنبه_جمعه_شنبه".split("_"),
  weekdaysShort: "یکشنبه_دو‌شنبه_سه‌شنبه_چهار‌شنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
  weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "D/‏M/‏YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm"
  },
  meridiemParse: /ص|م/,
  isPM(input) {
    return "م" === input;
  },
  meridiem(hour, minute, isLower) {
    if (hour < 12) {
      return "ص";
    } else {
      return "م";
    }
  },
  calendar: {
    sameDay: "[امروز در ساعت] LT",
    nextDay: "[فردا در ساعت] LT",
    nextWeek: "dddd [در ساعت] LT",
    lastDay: "[دیروز در ساعت] LT",
    lastWeek: "dddd [در ساعت] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "بعد %s",
    past: "پیش %s",
    s: pluralize("s"),
    ss: pluralize("s"),
    m: pluralize("m"),
    mm: pluralize("m"),
    h: pluralize("h"),
    hh: pluralize("h"),
    d: pluralize("d"),
    dd: pluralize("d"),
    M: pluralize("M"),
    MM: pluralize("M"),
    y: pluralize("y"),
    yy: pluralize("y")
  },
  preparse(str) {
    return str.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(match) {
      return numberMap[match];
    }).replace(/،/g, ",");
  },
  postformat(str) {
    return str.replace(/\d/g, function(match) {
      return symbolMap[match];
    }).replace(/,/g, "،");
  },
  week: {
    dow: 6,
    // Saturday is the first day of the week.
    doy: 80
    // The week that contains March 21th is the first week of the year.
  }
};

export {
  isDate,
  isDateValid,
  isArray,
  getDay,
  getMonth,
  getFullYear,
  getFirstDayOfMonth,
  isFirstDayOfWeek,
  isSameMonth,
  isSameYear,
  isSameDay$1,
  shiftDate,
  setFullDate,
  startOf,
  endOf,
  getSetGlobalLocale,
  defineLocale,
  updateLocale,
  getLocale,
  listLocales,
  formatDate,
  parseDate,
  utcAsLocal,
  isAfter,
  isBefore,
  isDisabledDay,
  isSame,
  add,
  subtract,
  arLocale,
  bgLocale,
  caLocale,
  csLocale,
  daLocale,
  deLocale,
  enGbLocale,
  esDoLocale,
  esLocale,
  esPrLocale,
  esUsLocale,
  etLocale,
  fiLocale,
  frLocale,
  frCaLocale,
  glLocale,
  heLocale,
  hiLocale,
  huLocale,
  hrLocale,
  idLocale,
  itLocale,
  jaLocale,
  kaLocale,
  kkLocale,
  koLocale,
  ltLocale,
  lvLocale,
  mnLocale,
  nbLocale,
  nlBeLocale,
  nlLocale,
  plLocale,
  ptBrLocale,
  roLocale,
  ruLocale,
  skLocale,
  slLocale,
  sqLocale,
  svLocale,
  thLocale,
  thBeLocale,
  trLocale,
  ukLocale,
  viLocale,
  zhCnLocale,
  faLocale
};
/*! Bundled license information:

ngx-bootstrap/chronos/fesm2022/ngx-bootstrap-chronos.mjs:
  (*! moment.js locale configuration *)
  (*! locale : Arabic [ar] *)
  (*! author : Abdel Said: https://github.com/abdelsaid *)
  (*! author : Ahmed Elkhatib *)
  (*! author : forabi https://github.com/forabi *)
  (*! locale : Bulgarian [bg] *)
  (*! author : Iskren Ivov Chernev : https://github.com/ichernev *)
  (*! author : Kunal Marwaha : https://github.com/marwahaha *)
  (*! author : Matt Grande : https://github.com/mattgrande *)
  (*! author : Isaac Cambron : https://github.com/icambron *)
  (*! author : Venelin Manchev : https://github.com/vmanchev *)
  (*! locale : Catalan [ca] *)
  (*! author : Xavier Arbat : https://github.com/XavisaurusRex *)
  (*! locale : Czech [cs] *)
  (*! author : petrbela : https://github.com/petrbela *)
  (*! locale : Danish (Denmark) [da] *)
  (*! author : Per Hansen : https://github.com/perhp *)
  (*! locale : German [de] *)
  (*! author : lluchs : https://github.com/lluchs *)
  (*! author: Menelion Elensúle: https://github.com/Oire *)
  (*! author : Mikolaj Dadela : https://github.com/mik01aj *)
  (*! locale : English (United Kingdom) [en-gb] *)
  (*! author : Chris Gedrim : https://github.com/chrisgedrim *)
  (*! locale : Spanish (Dominican Republic) [es-do] *)
  (*! locale : Spanish [es] *)
  (*! author : Julio Napurí : https://github.com/julionc *)
  (*! locale : Spanish (Puerto Rico) [es-pr] *)
  (*! locale : Spanish (United States) [es-us] *)
  (*! author : bustta : https://github.com/bustta *)
  (*! locale : Estonian [et] *)
  (*! author : Chris Gedrim : https://github.com/a90machado *)
  (*! locale : French [fr] *)
  (*! author : John Fischer : https://github.com/jfroffice *)
  (*! locale : French Canadian [fr-ca] *)
  (*! author : Ali Hasan : https://github.com/alihasan00 *)
  (*! locale : Galician [gl] *)
  (*! author : Darío Beiró : https://github.com/quinobravo *)
  (*! locale : Hebrew [he] *)
  (*! author : Tomer Cohen : https://github.com/tomer *)
  (*! author : Moshe Simantov : https://github.com/DevelopmentIL *)
  (*! author : Tal Ater : https://github.com/TalAter *)
  (*! locale : Hindi [hi] *)
  (*! author : Mayank Singhal : https://github.com/mayanksinghal *)
  (*! locale : Hungarian [hu] *)
  (*! author : Adam Brunner : https://github.com/adambrunner *)
  (*! locale : Croatian [hr] *)
  (*! author : Danijel Grmec : https://github.com/cobaltsis *)
  (*! locale : Indonesia [id] *)
  (*! author : Romy Kusuma : https://github.com/rkusuma *)
  (*! reference: https://github.com/moment/moment/blob/develop/locale/id.js *)
  (*! locale : Italian [it] *)
  (*! author : Lorenzo : https://github.com/aliem *)
  (*! author: Mattia Larentis: https://github.com/nostalgiaz *)
  (*! locale : Japanese [ja] *)
  (*! author : LI Long : https://github.com/baryon *)
  (*! locale : Georgian [ka] *)
  (*! author : Irakli Janiashvili : https://github.com/irakli-janiashvili *)
  (*! author : Levan Tskipuri : https://github.com/tskipa *)
  (*! locale : Korean [ko] *)
  (*! author : Kyungwook, Park : https://github.com/kyungw00k *)
  (*! author : Jeeeyul Lee <jeeeyul@gmail.com> *)
  (*! locale : Lithuanian [lt] *)
  (*! author : Stanislavas Guk : https://github.com/ixoster *)
  (*! locale : Latvian [lv] *)
  (*! author : Matiss Janis Aboltins : https://github.com/matissjanis *)
  (*! locale : Mongolian [mn] *)
  (*! author : Javkhlantugs Nyamdorj : https://github.com/javkhaanj7 *)
  (*! locale : Norwegian Bokmål [nb] *)
  (*! authors : Espen Hovlandsdal : https://github.com/rexxars *)
  (*!           Sigurd Gartmann : https://github.com/sigurdga *)
  (*! locale : Dutch (Belgium) [nl-be] *)
  (*! author : Joris Röling : https://github.com/jorisroling *)
  (*! author : Jacob Middag : https://github.com/middagj *)
  (*! locale : Dutch [nl] *)
  (*! locale : Polish [pl] *)
  (*! author : Rafal Hirsz : https://github.com/evoL *)
  (*! locale : Portuguese (Brazil) [pt-br] *)
  (*! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira *)
  (*! author : Vlad Gurdiga : https://github.com/gurdiga *)
  (*! author : Valentin Agachi : https://github.com/avaly *)
  (*! locale : Russian [ru] *)
  (*! author : Viktorminator : https://github.com/Viktorminator *)
  (*! Author : Menelion Elensúle : https://github.com/Oire *)
  (*! author : Коренберг Марк : https://github.com/socketpair *)
  (*! locale : Slovak [sk] *)
  (*! author : Jozef Pažin : https://github.com/atiris *)
  (*! locale : Slovenian [sl] *)
  (*! author : mihan : https://github.com/mihan *)
  (*! locale : Albanian [sq] *)
  (*! author : Agon Cecelia : https://github.com/agoncecelia *)
  (*! locale : Swedish [sv] *)
  (*! author : Jens Alm : https://github.com/ulmus *)
  (*! locale : Turkish [tr] *)
  (*! authors : Erhan Gundogan : https://github.com/erhangundogan, *)
  (*!           Burak Yiğit Kaya: https://github.com/BYK *)
  (*! locale : Ukrainian [uk] *)
  (*! author : zemlanin : https://github.com/zemlanin *)
  (*! locale : Việt Nam [vi] *)
  (*! locale : Chinese (China) [zh-cn] *)
  (*! author : suupic : https://github.com/suupic *)
  (*! author : Zeno Zeng : https://github.com/zenozeng *)
  (*! locale : Persian [fa] *)
  (*! author : Meysam Bahadori: https://github.com/MeysamBahadori *)
*/
//# sourceMappingURL=chunk-IBKJQ2E6.js.map
