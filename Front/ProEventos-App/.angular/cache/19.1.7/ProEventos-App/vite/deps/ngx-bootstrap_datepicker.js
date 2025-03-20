import {
  TooltipDirective,
  TooltipModule
} from "./chunk-4JFPBZPJ.js";
import {
  endOf,
  formatDate,
  getDay,
  getFirstDayOfMonth,
  getFullYear,
  getLocale,
  getMonth,
  isAfter,
  isArray,
  isBefore,
  isDate,
  isDateValid,
  isDisabledDay,
  isFirstDayOfWeek,
  isSame,
  isSameDay$1,
  isSameMonth,
  isSameYear,
  parseDate,
  setFullDate,
  shiftDate,
  startOf,
  utcAsLocal
} from "./chunk-IBKJQ2E6.js";
import {
  ComponentLoaderFactory,
  PositioningService
} from "./chunk-6U74TVB3.js";
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from "./chunk-TALYY2YA.js";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "./chunk-7HEBVONX.js";
import {
  AsyncPipe,
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase
} from "./chunk-BKMQYTIH.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostBinding,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  forwardRef,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-YKKSFAQN.js";
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  observeOn,
  queueScheduler,
  scan,
  take,
  takeUntil
} from "./chunk-KCJWDZ6W.js";
import "./chunk-WDMUDEB6.js";

// node_modules/ngx-bootstrap/mini-ngrx/fesm2022/ngx-bootstrap-mini-ngrx.mjs
var MiniState = class extends BehaviorSubject {
  constructor(_initialState, actionsDispatcher$, reducer) {
    super(_initialState);
    const actionInQueue$ = actionsDispatcher$.pipe(observeOn(queueScheduler));
    const state$ = actionInQueue$.pipe(scan((state2, action) => {
      if (!action) {
        return state2;
      }
      return reducer(state2, action);
    }, _initialState));
    state$.subscribe((value) => this.next(value));
  }
};
var MiniStore = class _MiniStore extends Observable {
  constructor(_dispatcher, _reducer, state$) {
    super();
    this._dispatcher = _dispatcher;
    this._reducer = _reducer;
    this.source = state$;
  }
  select(pathOrMapFn) {
    const mapped$ = this.source?.pipe(map(pathOrMapFn)) || new Observable().pipe(map(pathOrMapFn));
    return mapped$.pipe(distinctUntilChanged());
  }
  lift(operator) {
    const store = new _MiniStore(this._dispatcher, this._reducer, this);
    store.operator = operator;
    return store;
  }
  dispatch(action) {
    this._dispatcher.next(action);
  }
  next(action) {
    this._dispatcher.next(action);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(err) {
    this._dispatcher.error(err);
  }
  complete() {
  }
};

// node_modules/ngx-bootstrap/timepicker/fesm2022/ngx-bootstrap-timepicker.mjs
function TimepickerComponent_td_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td");
    ɵɵtext(1, "   ");
    ɵɵelementEnd();
  }
}
function TimepickerComponent_td_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td")(1, "a", 1);
    ɵɵlistener("click", function TimepickerComponent_td_7_Template_a_click_1_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changeMinutes(ctx_r1.minuteStep));
    });
    ɵɵelement(2, "span", 2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassProp("disabled", !ctx_r1.canIncrementMinutes || !ctx_r1.isEditable);
  }
}
function TimepickerComponent_td_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td");
    ɵɵtext(1, " ");
    ɵɵelementEnd();
  }
}
function TimepickerComponent_td_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td")(1, "a", 1);
    ɵɵlistener("click", function TimepickerComponent_td_9_Template_a_click_1_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changeSeconds(ctx_r1.secondsStep));
    });
    ɵɵelement(2, "span", 2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassProp("disabled", !ctx_r1.canIncrementSeconds || !ctx_r1.isEditable);
  }
}
function TimepickerComponent_td_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td");
    ɵɵtext(1, "   ");
    ɵɵelementEnd();
  }
}
function TimepickerComponent_td_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "td");
  }
}
function TimepickerComponent_td_15_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td");
    ɵɵtext(1, " : ");
    ɵɵelementEnd();
  }
}
function TimepickerComponent_td_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td", 4)(1, "input", 5);
    ɵɵlistener("wheel", function TimepickerComponent_td_16_Template_input_wheel_1_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext();
      ctx_r1.prevDef($event);
      return ɵɵresetView(ctx_r1.changeMinutes(ctx_r1.minuteStep * ctx_r1.wheelSign($event), "wheel"));
    })("keydown.ArrowUp", function TimepickerComponent_td_16_Template_input_keydown_ArrowUp_1_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changeMinutes(ctx_r1.minuteStep, "key"));
    })("keydown.ArrowDown", function TimepickerComponent_td_16_Template_input_keydown_ArrowDown_1_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changeMinutes(-ctx_r1.minuteStep, "key"));
    })("change", function TimepickerComponent_td_16_Template_input_change_1_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.updateMinutes($event.target));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassProp("has-error", ctx_r1.invalidMinutes);
    ɵɵadvance();
    ɵɵclassProp("is-invalid", ctx_r1.invalidMinutes);
    ɵɵproperty("placeholder", ctx_r1.minutesPlaceholder)("readonly", ctx_r1.readonlyInput)("disabled", ctx_r1.disabled)("value", ctx_r1.minutes);
    ɵɵattribute("aria-label", ctx_r1.labelMinutes);
  }
}
function TimepickerComponent_td_17_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td");
    ɵɵtext(1, " : ");
    ɵɵelementEnd();
  }
}
function TimepickerComponent_td_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td", 4)(1, "input", 5);
    ɵɵlistener("wheel", function TimepickerComponent_td_18_Template_input_wheel_1_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      ctx_r1.prevDef($event);
      return ɵɵresetView(ctx_r1.changeSeconds(ctx_r1.secondsStep * ctx_r1.wheelSign($event), "wheel"));
    })("keydown.ArrowUp", function TimepickerComponent_td_18_Template_input_keydown_ArrowUp_1_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changeSeconds(ctx_r1.secondsStep, "key"));
    })("keydown.ArrowDown", function TimepickerComponent_td_18_Template_input_keydown_ArrowDown_1_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changeSeconds(-ctx_r1.secondsStep, "key"));
    })("change", function TimepickerComponent_td_18_Template_input_change_1_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.updateSeconds($event.target));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassProp("has-error", ctx_r1.invalidSeconds);
    ɵɵadvance();
    ɵɵclassProp("is-invalid", ctx_r1.invalidSeconds);
    ɵɵproperty("placeholder", ctx_r1.secondsPlaceholder)("readonly", ctx_r1.readonlyInput)("disabled", ctx_r1.disabled)("value", ctx_r1.seconds);
    ɵɵattribute("aria-label", ctx_r1.labelSeconds);
  }
}
function TimepickerComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td");
    ɵɵtext(1, "   ");
    ɵɵelementEnd();
  }
}
function TimepickerComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td")(1, "button", 8);
    ɵɵlistener("click", function TimepickerComponent_td_20_Template_button_click_1_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.toggleMeridian());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassProp("disabled", !ctx_r1.isEditable || !ctx_r1.canToggleMeridian);
    ɵɵproperty("disabled", !ctx_r1.isEditable || !ctx_r1.canToggleMeridian);
    ɵɵadvance();
    ɵɵtextInterpolate1("", ctx_r1.meridian, " ");
  }
}
function TimepickerComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td");
    ɵɵtext(1, "   ");
    ɵɵelementEnd();
  }
}
function TimepickerComponent_td_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td")(1, "a", 1);
    ɵɵlistener("click", function TimepickerComponent_td_26_Template_a_click_1_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changeMinutes(-ctx_r1.minuteStep));
    });
    ɵɵelement(2, "span", 7);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassProp("disabled", !ctx_r1.canDecrementMinutes || !ctx_r1.isEditable);
  }
}
function TimepickerComponent_td_27_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td");
    ɵɵtext(1, " ");
    ɵɵelementEnd();
  }
}
function TimepickerComponent_td_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td")(1, "a", 1);
    ɵɵlistener("click", function TimepickerComponent_td_28_Template_a_click_1_listener() {
      ɵɵrestoreView(_r8);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changeSeconds(-ctx_r1.secondsStep));
    });
    ɵɵelement(2, "span", 7);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassProp("disabled", !ctx_r1.canDecrementSeconds || !ctx_r1.isEditable);
  }
}
function TimepickerComponent_td_29_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td");
    ɵɵtext(1, "   ");
    ɵɵelementEnd();
  }
}
function TimepickerComponent_td_30_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "td");
  }
}
var TimepickerActions = class _TimepickerActions {
  static {
    this.WRITE_VALUE = "[timepicker] write value from ng model";
  }
  static {
    this.CHANGE_HOURS = "[timepicker] change hours";
  }
  static {
    this.CHANGE_MINUTES = "[timepicker] change minutes";
  }
  static {
    this.CHANGE_SECONDS = "[timepicker] change seconds";
  }
  static {
    this.SET_TIME_UNIT = "[timepicker] set time unit";
  }
  static {
    this.UPDATE_CONTROLS = "[timepicker] update controls";
  }
  writeValue(value) {
    return {
      type: _TimepickerActions.WRITE_VALUE,
      payload: value
    };
  }
  changeHours(event) {
    return {
      type: _TimepickerActions.CHANGE_HOURS,
      payload: event
    };
  }
  changeMinutes(event) {
    return {
      type: _TimepickerActions.CHANGE_MINUTES,
      payload: event
    };
  }
  changeSeconds(event) {
    return {
      type: _TimepickerActions.CHANGE_SECONDS,
      payload: event
    };
  }
  setTime(value) {
    return {
      type: _TimepickerActions.SET_TIME_UNIT,
      payload: value
    };
  }
  updateControls(value) {
    return {
      type: _TimepickerActions.UPDATE_CONTROLS,
      payload: value
    };
  }
  static {
    this.ɵfac = function TimepickerActions_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TimepickerActions)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TimepickerActions,
      factory: _TimepickerActions.ɵfac,
      providedIn: "platform"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimepickerActions, [{
    type: Injectable,
    args: [{
      providedIn: "platform"
    }]
  }], null, null);
})();
var dex = 10;
var hoursPerDay = 24;
var hoursPerDayHalf = 12;
var minutesPerHour = 60;
var secondsPerMinute = 60;
function isValidDate(value) {
  if (!value) {
    return false;
  }
  if (value instanceof Date && isNaN(value.getHours())) {
    return false;
  }
  if (typeof value === "string") {
    return isValidDate(new Date(value));
  }
  return true;
}
function isValidLimit(controls, newDate) {
  if (controls.min && newDate < controls.min) {
    return false;
  }
  if (controls.max && newDate > controls.max) {
    return false;
  }
  return true;
}
function toNumber(value) {
  if (typeof value === "undefined") {
    return NaN;
  }
  if (typeof value === "number") {
    return value;
  }
  return parseInt(value, dex);
}
function parseHours(value, isPM = false) {
  const hour = toNumber(value);
  if (isNaN(hour) || hour < 0 || hour > (isPM ? hoursPerDayHalf : hoursPerDay)) {
    return NaN;
  }
  return hour;
}
function parseMinutes(value) {
  const minute = toNumber(value);
  if (isNaN(minute) || minute < 0 || minute > minutesPerHour) {
    return NaN;
  }
  return minute;
}
function parseSeconds(value) {
  const seconds = toNumber(value);
  if (isNaN(seconds) || seconds < 0 || seconds > secondsPerMinute) {
    return NaN;
  }
  return seconds;
}
function parseTime(value) {
  if (typeof value === "string") {
    return new Date(value);
  }
  return value;
}
function changeTime(value, diff) {
  if (!value) {
    return changeTime(createDate(/* @__PURE__ */ new Date(), 0, 0, 0), diff);
  }
  if (!diff) {
    return value;
  }
  let hour = value.getHours();
  let minutes = value.getMinutes();
  let seconds = value.getSeconds();
  if (diff.hour) {
    hour = hour + toNumber(diff.hour);
  }
  if (diff.minute) {
    minutes = minutes + toNumber(diff.minute);
  }
  if (diff.seconds) {
    seconds = seconds + toNumber(diff.seconds);
  }
  return createDate(value, hour, minutes, seconds);
}
function setTime(value, opts) {
  let hour = parseHours(opts.hour);
  const minute = parseMinutes(opts.minute);
  const seconds = parseSeconds(opts.seconds) || 0;
  if (opts.isPM && hour !== 12) {
    hour += hoursPerDayHalf;
  }
  if (!value) {
    if (!isNaN(hour) && !isNaN(minute)) {
      return createDate(/* @__PURE__ */ new Date(), hour, minute, seconds);
    }
    return value;
  }
  if (isNaN(hour) || isNaN(minute)) {
    return value;
  }
  return createDate(value, hour, minute, seconds);
}
function createDate(value, hours, minutes, seconds) {
  const newValue = new Date(value.getFullYear(), value.getMonth(), value.getDate(), hours, minutes, seconds, value.getMilliseconds());
  newValue.setFullYear(value.getFullYear());
  newValue.setMonth(value.getMonth());
  newValue.setDate(value.getDate());
  return newValue;
}
function padNumber(value) {
  const _value = value.toString();
  if (_value.length > 1) {
    return _value;
  }
  return `0${_value}`;
}
function isHourInputValid(hours, isPM) {
  return !isNaN(parseHours(hours, isPM));
}
function isMinuteInputValid(minutes) {
  return !isNaN(parseMinutes(minutes));
}
function isSecondInputValid(seconds) {
  return !isNaN(parseSeconds(seconds));
}
function isInputLimitValid(diff, max, min) {
  const newDate = setTime(/* @__PURE__ */ new Date(), diff);
  if (!newDate) {
    return false;
  }
  if (max && newDate > max) {
    return false;
  }
  if (min && newDate < min) {
    return false;
  }
  return true;
}
function isOneOfDatesEmpty(hours, minutes, seconds) {
  return hours.length === 0 || minutes.length === 0 || seconds.length === 0;
}
function isInputValid(hours, minutes = "0", seconds = "0", isPM) {
  return isHourInputValid(hours, isPM) && isMinuteInputValid(minutes) && isSecondInputValid(seconds);
}
function canChangeValue(state2, event) {
  if (state2.readonlyInput || state2.disabled) {
    return false;
  }
  if (event) {
    if (event.source === "wheel" && !state2.mousewheel) {
      return false;
    }
    if (event.source === "key" && !state2.arrowkeys) {
      return false;
    }
  }
  return true;
}
function canChangeHours(event, controls) {
  if (!event.step) {
    return false;
  }
  if (event.step > 0 && !controls.canIncrementHours) {
    return false;
  }
  if (event.step < 0 && !controls.canDecrementHours) {
    return false;
  }
  return true;
}
function canChangeMinutes(event, controls) {
  if (!event.step) {
    return false;
  }
  if (event.step > 0 && !controls.canIncrementMinutes) {
    return false;
  }
  if (event.step < 0 && !controls.canDecrementMinutes) {
    return false;
  }
  return true;
}
function canChangeSeconds(event, controls) {
  if (!event.step) {
    return false;
  }
  if (event.step > 0 && !controls.canIncrementSeconds) {
    return false;
  }
  if (event.step < 0 && !controls.canDecrementSeconds) {
    return false;
  }
  return true;
}
function getControlsValue(state2) {
  const {
    hourStep,
    minuteStep,
    secondsStep,
    readonlyInput,
    disabled,
    mousewheel,
    arrowkeys,
    showSpinners,
    showMeridian,
    showSeconds,
    meridians,
    min,
    max
  } = state2;
  return {
    hourStep,
    minuteStep,
    secondsStep,
    readonlyInput,
    disabled,
    mousewheel,
    arrowkeys,
    showSpinners,
    showMeridian,
    showSeconds,
    meridians,
    min,
    max
  };
}
function timepickerControls(value, state2) {
  const hoursPerDay2 = 24;
  const hoursPerDayHalf2 = 12;
  const {
    min,
    max,
    hourStep,
    minuteStep,
    secondsStep,
    showSeconds
  } = state2;
  const res = {
    canIncrementHours: true,
    canIncrementMinutes: true,
    canIncrementSeconds: true,
    canDecrementHours: true,
    canDecrementMinutes: true,
    canDecrementSeconds: true,
    canToggleMeridian: true
  };
  if (!value) {
    return res;
  }
  if (max) {
    const _newHour = changeTime(value, {
      hour: hourStep
    });
    res.canIncrementHours = max > _newHour && value.getHours() + hourStep < hoursPerDay2;
    if (!res.canIncrementHours) {
      const _newMinutes = changeTime(value, {
        minute: minuteStep
      });
      res.canIncrementMinutes = showSeconds ? max > _newMinutes : max >= _newMinutes;
    }
    if (!res.canIncrementMinutes) {
      const _newSeconds = changeTime(value, {
        seconds: secondsStep
      });
      res.canIncrementSeconds = max >= _newSeconds;
    }
    if (value.getHours() < hoursPerDayHalf2) {
      res.canToggleMeridian = changeTime(value, {
        hour: hoursPerDayHalf2
      }) < max;
    }
  }
  if (min) {
    const _newHour = changeTime(value, {
      hour: -hourStep
    });
    res.canDecrementHours = min < _newHour;
    if (!res.canDecrementHours) {
      const _newMinutes = changeTime(value, {
        minute: -minuteStep
      });
      res.canDecrementMinutes = showSeconds ? min < _newMinutes : min <= _newMinutes;
    }
    if (!res.canDecrementMinutes) {
      const _newSeconds = changeTime(value, {
        seconds: -secondsStep
      });
      res.canDecrementSeconds = min <= _newSeconds;
    }
    if (value.getHours() >= hoursPerDayHalf2) {
      res.canToggleMeridian = changeTime(value, {
        hour: -hoursPerDayHalf2
      }) > min;
    }
  }
  return res;
}
var TimepickerConfig = class _TimepickerConfig {
  constructor() {
    this.hourStep = 1;
    this.minuteStep = 5;
    this.secondsStep = 10;
    this.showMeridian = true;
    this.meridians = ["AM", "PM"];
    this.readonlyInput = false;
    this.disabled = false;
    this.allowEmptyTime = false;
    this.mousewheel = true;
    this.arrowkeys = true;
    this.showSpinners = true;
    this.showSeconds = false;
    this.showMinutes = true;
    this.hoursPlaceholder = "HH";
    this.minutesPlaceholder = "MM";
    this.secondsPlaceholder = "SS";
    this.ariaLabelHours = "hours";
    this.ariaLabelMinutes = "minutes";
    this.ariaLabelSeconds = "seconds";
  }
  static {
    this.ɵfac = function TimepickerConfig_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TimepickerConfig)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TimepickerConfig,
      factory: _TimepickerConfig.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimepickerConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var initialState = {
  value: void 0,
  config: new TimepickerConfig(),
  controls: {
    canIncrementHours: true,
    canIncrementMinutes: true,
    canIncrementSeconds: true,
    canDecrementHours: true,
    canDecrementMinutes: true,
    canDecrementSeconds: true,
    canToggleMeridian: true
  }
};
function timepickerReducer(state2 = initialState, action) {
  switch (action.type) {
    case TimepickerActions.WRITE_VALUE: {
      return Object.assign({}, state2, {
        value: action.payload
      });
    }
    case TimepickerActions.CHANGE_HOURS: {
      if (!canChangeValue(state2.config, action.payload) || !canChangeHours(action.payload, state2.controls)) {
        return state2;
      }
      const _newTime = changeTime(state2.value, {
        hour: action.payload.step
      });
      if ((state2.config.max || state2.config.min) && !isValidLimit(state2.config, _newTime)) {
        return state2;
      }
      return Object.assign({}, state2, {
        value: _newTime
      });
    }
    case TimepickerActions.CHANGE_MINUTES: {
      if (!canChangeValue(state2.config, action.payload) || !canChangeMinutes(action.payload, state2.controls)) {
        return state2;
      }
      const _newTime = changeTime(state2.value, {
        minute: action.payload.step
      });
      if ((state2.config.max || state2.config.min) && !isValidLimit(state2.config, _newTime)) {
        return state2;
      }
      return Object.assign({}, state2, {
        value: _newTime
      });
    }
    case TimepickerActions.CHANGE_SECONDS: {
      if (!canChangeValue(state2.config, action.payload) || !canChangeSeconds(action.payload, state2.controls)) {
        return state2;
      }
      const _newTime = changeTime(state2.value, {
        seconds: action.payload.step
      });
      if ((state2.config.max || state2.config.min) && !isValidLimit(state2.config, _newTime)) {
        return state2;
      }
      return Object.assign({}, state2, {
        value: _newTime
      });
    }
    case TimepickerActions.SET_TIME_UNIT: {
      if (!canChangeValue(state2.config)) {
        return state2;
      }
      const _newTime = setTime(state2.value, action.payload);
      return Object.assign({}, state2, {
        value: _newTime
      });
    }
    case TimepickerActions.UPDATE_CONTROLS: {
      const _newControlsState = timepickerControls(state2.value, action.payload);
      const _newState = {
        value: state2.value,
        config: action.payload,
        controls: _newControlsState
      };
      if (state2.config.showMeridian !== _newState.config.showMeridian) {
        if (state2.value) {
          _newState.value = new Date(state2.value);
        }
      }
      return Object.assign({}, state2, _newState);
    }
    default:
      return state2;
  }
}
var TimepickerStore = class _TimepickerStore extends MiniStore {
  constructor() {
    const _dispatcher = new BehaviorSubject({
      type: "[mini-ngrx] dispatcher init"
    });
    const state2 = new MiniState(initialState, _dispatcher, timepickerReducer);
    super(_dispatcher, timepickerReducer, state2);
  }
  static {
    this.ɵfac = function TimepickerStore_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TimepickerStore)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TimepickerStore,
      factory: _TimepickerStore.ɵfac,
      providedIn: "platform"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimepickerStore, [{
    type: Injectable,
    args: [{
      providedIn: "platform"
    }]
  }], () => [], null);
})();
var TIMEPICKER_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimepickerComponent),
  multi: true
};
var TimepickerComponent = class _TimepickerComponent {
  constructor(_config, _cd, _store, _timepickerActions) {
    this._cd = _cd;
    this._store = _store;
    this._timepickerActions = _timepickerActions;
    this.hourStep = 1;
    this.minuteStep = 5;
    this.secondsStep = 10;
    this.readonlyInput = false;
    this.disabled = false;
    this.mousewheel = true;
    this.arrowkeys = true;
    this.showSpinners = true;
    this.showMeridian = true;
    this.showMinutes = true;
    this.showSeconds = false;
    this.meridians = ["AM", "PM"];
    this.hoursPlaceholder = "HH";
    this.minutesPlaceholder = "MM";
    this.secondsPlaceholder = "SS";
    this.isValid = new EventEmitter();
    this.meridianChange = new EventEmitter();
    this.hours = "";
    this.minutes = "";
    this.seconds = "";
    this.meridian = "";
    this.invalidHours = false;
    this.invalidMinutes = false;
    this.invalidSeconds = false;
    this.labelHours = "hours";
    this.labelMinutes = "minutes";
    this.labelSeconds = "seconds";
    this.canIncrementHours = true;
    this.canIncrementMinutes = true;
    this.canIncrementSeconds = true;
    this.canDecrementHours = true;
    this.canDecrementMinutes = true;
    this.canDecrementSeconds = true;
    this.canToggleMeridian = true;
    this.onChange = Function.prototype;
    this.onTouched = Function.prototype;
    this.config = _config;
    Object.assign(this, this.config);
    this.timepickerSub = _store.select((state2) => state2.value).subscribe((value) => {
      this._renderTime(value);
      this.onChange(value);
      this._store.dispatch(this._timepickerActions.updateControls(getControlsValue(this)));
    });
    _store.select((state2) => state2.controls).subscribe((controlsState) => {
      const isTimepickerInputValid = isInputValid(this.hours, this.minutes, this.seconds, this.isPM());
      const isValid = this.config.allowEmptyTime ? this.isOneOfDatesIsEmpty() || isTimepickerInputValid : isTimepickerInputValid;
      this.isValid.emit(isValid);
      Object.assign(this, controlsState);
      _cd.markForCheck();
    });
  }
  /** @deprecated - please use `isEditable` instead */
  get isSpinnersVisible() {
    return this.showSpinners && !this.readonlyInput;
  }
  get isEditable() {
    return !(this.readonlyInput || this.disabled);
  }
  resetValidation() {
    this.invalidHours = false;
    this.invalidMinutes = false;
    this.invalidSeconds = false;
  }
  isPM() {
    return this.showMeridian && this.meridian === this.meridians[1];
  }
  prevDef($event) {
    $event.preventDefault();
  }
  wheelSign($event) {
    return Math.sign($event.deltaY || 0) * -1;
  }
  ngOnChanges() {
    this._store.dispatch(this._timepickerActions.updateControls(getControlsValue(this)));
  }
  changeHours(step, source = "") {
    this.resetValidation();
    this._store.dispatch(this._timepickerActions.changeHours({
      step,
      source
    }));
  }
  changeMinutes(step, source = "") {
    this.resetValidation();
    this._store.dispatch(this._timepickerActions.changeMinutes({
      step,
      source
    }));
  }
  changeSeconds(step, source = "") {
    this.resetValidation();
    this._store.dispatch(this._timepickerActions.changeSeconds({
      step,
      source
    }));
  }
  updateHours(target) {
    this.resetValidation();
    this.hours = target.value;
    const isTimepickerInputValid = isHourInputValid(this.hours, this.isPM()) && this.isValidLimit();
    const isValid = this.config.allowEmptyTime ? this.isOneOfDatesIsEmpty() || isTimepickerInputValid : isTimepickerInputValid;
    if (!isValid) {
      this.invalidHours = true;
      this.isValid.emit(false);
      this.onChange(null);
      return;
    }
    this._updateTime();
  }
  updateMinutes(target) {
    this.resetValidation();
    this.minutes = target.value;
    const isTimepickerInputValid = isMinuteInputValid(this.minutes) && this.isValidLimit();
    const isValid = this.config.allowEmptyTime ? this.isOneOfDatesIsEmpty() || isTimepickerInputValid : isTimepickerInputValid;
    if (!isValid) {
      this.invalidMinutes = true;
      this.isValid.emit(false);
      this.onChange(null);
      return;
    }
    this._updateTime();
  }
  updateSeconds(target) {
    this.resetValidation();
    this.seconds = target.value;
    const isTimepickerInputValid = isSecondInputValid(this.seconds) && this.isValidLimit();
    const isValid = this.config.allowEmptyTime ? this.isOneOfDatesIsEmpty() || isTimepickerInputValid : isTimepickerInputValid;
    if (!isValid) {
      this.invalidSeconds = true;
      this.isValid.emit(false);
      this.onChange(null);
      return;
    }
    this._updateTime();
  }
  isValidLimit() {
    return isInputLimitValid({
      hour: this.hours,
      minute: this.minutes,
      seconds: this.seconds,
      isPM: this.isPM()
    }, this.max, this.min);
  }
  isOneOfDatesIsEmpty() {
    return isOneOfDatesEmpty(this.hours, this.minutes, this.seconds);
  }
  _updateTime() {
    const _seconds = this.showSeconds ? this.seconds : void 0;
    const _minutes = this.showMinutes ? this.minutes : void 0;
    const isTimepickerInputValid = isInputValid(this.hours, _minutes, _seconds, this.isPM());
    const isValid = this.config.allowEmptyTime ? this.isOneOfDatesIsEmpty() || isTimepickerInputValid : isTimepickerInputValid;
    if (!isValid) {
      this.isValid.emit(false);
      this.onChange(null);
      return;
    }
    this._store.dispatch(this._timepickerActions.setTime({
      hour: this.hours,
      minute: this.minutes,
      seconds: this.seconds,
      isPM: this.isPM()
    }));
  }
  toggleMeridian() {
    if (!this.showMeridian || !this.isEditable) {
      return;
    }
    const _hoursPerDayHalf = 12;
    this._store.dispatch(this._timepickerActions.changeHours({
      step: _hoursPerDayHalf,
      source: ""
    }));
  }
  /**
   * Write a new value to the element.
   */
  writeValue(obj) {
    if (isValidDate(obj)) {
      this.resetValidation();
      this._store.dispatch(this._timepickerActions.writeValue(parseTime(obj)));
    } else if (obj == null) {
      this._store.dispatch(this._timepickerActions.writeValue());
    }
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn) {
    this.onChange = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * This function is called when the control status changes to or from "disabled".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._cd.markForCheck();
  }
  ngOnDestroy() {
    this.timepickerSub?.unsubscribe();
  }
  _renderTime(value) {
    if (!value || !isValidDate(value)) {
      this.hours = "";
      this.minutes = "";
      this.seconds = "";
      this.meridian = this.meridians[0];
      this.meridianChange.emit(this.meridian);
      return;
    }
    const _value = parseTime(value);
    if (!_value) {
      return;
    }
    const _hoursPerDayHalf = 12;
    let _hours = _value.getHours();
    if (this.showMeridian) {
      this.meridian = this.meridians[_hours >= _hoursPerDayHalf ? 1 : 0];
      this.meridianChange.emit(this.meridian);
      _hours = _hours % _hoursPerDayHalf;
      if (_hours === 0) {
        _hours = _hoursPerDayHalf;
      }
    }
    this.hours = padNumber(_hours);
    this.minutes = padNumber(_value.getMinutes());
    this.seconds = padNumber(_value.getUTCSeconds());
  }
  static {
    this.ɵfac = function TimepickerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TimepickerComponent)(ɵɵdirectiveInject(TimepickerConfig), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(TimepickerStore), ɵɵdirectiveInject(TimepickerActions));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TimepickerComponent,
      selectors: [["timepicker"]],
      inputs: {
        hourStep: "hourStep",
        minuteStep: "minuteStep",
        secondsStep: "secondsStep",
        readonlyInput: "readonlyInput",
        disabled: "disabled",
        mousewheel: "mousewheel",
        arrowkeys: "arrowkeys",
        showSpinners: "showSpinners",
        showMeridian: "showMeridian",
        showMinutes: "showMinutes",
        showSeconds: "showSeconds",
        meridians: "meridians",
        min: "min",
        max: "max",
        hoursPlaceholder: "hoursPlaceholder",
        minutesPlaceholder: "minutesPlaceholder",
        secondsPlaceholder: "secondsPlaceholder"
      },
      outputs: {
        isValid: "isValid",
        meridianChange: "meridianChange"
      },
      features: [ɵɵProvidersFeature([TIMEPICKER_CONTROL_VALUE_ACCESSOR, TimepickerStore, TimepickerActions]), ɵɵNgOnChangesFeature],
      decls: 31,
      vars: 33,
      consts: [[1, "text-center", 3, "hidden"], ["href", "javascript:void(0);", 1, "btn", "btn-link", 3, "click"], [1, "bs-chevron", "bs-chevron-up"], [4, "ngIf"], [1, "form-group", "mb-3"], ["type", "text", "maxlength", "2", 1, "form-control", "text-center", "bs-timepicker-field", 3, "wheel", "keydown.ArrowUp", "keydown.ArrowDown", "change", "placeholder", "readonly", "disabled", "value"], ["class", "form-group mb-3", 3, "has-error", 4, "ngIf"], [1, "bs-chevron", "bs-chevron-down"], ["type", "button", 1, "btn", "btn-default", "text-center", 3, "click", "disabled"]],
      template: function TimepickerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "table")(1, "tbody")(2, "tr", 0)(3, "td")(4, "a", 1);
          ɵɵlistener("click", function TimepickerComponent_Template_a_click_4_listener() {
            return ctx.changeHours(ctx.hourStep);
          });
          ɵɵelement(5, "span", 2);
          ɵɵelementEnd()();
          ɵɵtemplate(6, TimepickerComponent_td_6_Template, 2, 0, "td", 3)(7, TimepickerComponent_td_7_Template, 3, 2, "td", 3)(8, TimepickerComponent_td_8_Template, 2, 0, "td", 3)(9, TimepickerComponent_td_9_Template, 3, 2, "td", 3)(10, TimepickerComponent_td_10_Template, 2, 0, "td", 3)(11, TimepickerComponent_td_11_Template, 1, 0, "td", 3);
          ɵɵelementEnd();
          ɵɵelementStart(12, "tr")(13, "td", 4)(14, "input", 5);
          ɵɵlistener("wheel", function TimepickerComponent_Template_input_wheel_14_listener($event) {
            ctx.prevDef($event);
            return ctx.changeHours(ctx.hourStep * ctx.wheelSign($event), "wheel");
          })("keydown.ArrowUp", function TimepickerComponent_Template_input_keydown_ArrowUp_14_listener() {
            return ctx.changeHours(ctx.hourStep, "key");
          })("keydown.ArrowDown", function TimepickerComponent_Template_input_keydown_ArrowDown_14_listener() {
            return ctx.changeHours(-ctx.hourStep, "key");
          })("change", function TimepickerComponent_Template_input_change_14_listener($event) {
            return ctx.updateHours($event.target);
          });
          ɵɵelementEnd()();
          ɵɵtemplate(15, TimepickerComponent_td_15_Template, 2, 0, "td", 3)(16, TimepickerComponent_td_16_Template, 2, 9, "td", 6)(17, TimepickerComponent_td_17_Template, 2, 0, "td", 3)(18, TimepickerComponent_td_18_Template, 2, 9, "td", 6)(19, TimepickerComponent_td_19_Template, 2, 0, "td", 3)(20, TimepickerComponent_td_20_Template, 3, 4, "td", 3);
          ɵɵelementEnd();
          ɵɵelementStart(21, "tr", 0)(22, "td")(23, "a", 1);
          ɵɵlistener("click", function TimepickerComponent_Template_a_click_23_listener() {
            return ctx.changeHours(-ctx.hourStep);
          });
          ɵɵelement(24, "span", 7);
          ɵɵelementEnd()();
          ɵɵtemplate(25, TimepickerComponent_td_25_Template, 2, 0, "td", 3)(26, TimepickerComponent_td_26_Template, 3, 2, "td", 3)(27, TimepickerComponent_td_27_Template, 2, 0, "td", 3)(28, TimepickerComponent_td_28_Template, 3, 2, "td", 3)(29, TimepickerComponent_td_29_Template, 2, 0, "td", 3)(30, TimepickerComponent_td_30_Template, 1, 0, "td", 3);
          ɵɵelementEnd()()();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵproperty("hidden", !ctx.showSpinners);
          ɵɵadvance(2);
          ɵɵclassProp("disabled", !ctx.canIncrementHours || !ctx.isEditable);
          ɵɵadvance(2);
          ɵɵproperty("ngIf", ctx.showMinutes);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showMinutes);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showSeconds);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showSeconds);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showMeridian);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showMeridian);
          ɵɵadvance(2);
          ɵɵclassProp("has-error", ctx.invalidHours);
          ɵɵadvance();
          ɵɵclassProp("is-invalid", ctx.invalidHours);
          ɵɵproperty("placeholder", ctx.hoursPlaceholder)("readonly", ctx.readonlyInput)("disabled", ctx.disabled)("value", ctx.hours);
          ɵɵattribute("aria-label", ctx.labelHours);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showMinutes);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showMinutes);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showSeconds);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showSeconds);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showMeridian);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showMeridian);
          ɵɵadvance();
          ɵɵproperty("hidden", !ctx.showSpinners);
          ɵɵadvance(2);
          ɵɵclassProp("disabled", !ctx.canDecrementHours || !ctx.isEditable);
          ɵɵadvance(2);
          ɵɵproperty("ngIf", ctx.showMinutes);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showMinutes);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showSeconds);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showSeconds);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showMeridian);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.showMeridian);
        }
      },
      dependencies: [NgIf],
      styles: [".bs-chevron{border-style:solid;display:block;width:9px;height:9px;position:relative;border-width:3px 0px 0 3px}.bs-chevron-up{-webkit-transform:rotate(45deg);transform:rotate(45deg);top:2px}.bs-chevron-down{-webkit-transform:rotate(-135deg);transform:rotate(-135deg);top:-2px}.bs-timepicker-field{width:65px;padding:.375rem .55rem}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimepickerComponent, [{
    type: Component,
    args: [{
      selector: "timepicker",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [TIMEPICKER_CONTROL_VALUE_ACCESSOR, TimepickerStore, TimepickerActions],
      encapsulation: ViewEncapsulation.None,
      standalone: true,
      imports: [NgIf],
      template: `<table>
  <tbody>
  <tr class="text-center" [hidden]="!showSpinners">
    <!-- increment hours button-->
    <td>
      <a class="btn btn-link" [class.disabled]="!canIncrementHours || !isEditable"
         (click)="changeHours(hourStep)"
         href="javascript:void(0);"
      ><span class="bs-chevron bs-chevron-up"></span></a>
    </td>
    <!-- divider -->
    <td *ngIf="showMinutes">&nbsp;&nbsp;&nbsp;</td>
    <!-- increment minutes button -->
    <td *ngIf="showMinutes">
      <a class="btn btn-link" [class.disabled]="!canIncrementMinutes || !isEditable"
         (click)="changeMinutes(minuteStep)"
         href="javascript:void(0);"
      ><span class="bs-chevron bs-chevron-up"></span></a>
    </td>
    <!-- divider -->
    <td *ngIf="showSeconds">&nbsp;</td>
    <!-- increment seconds button -->
    <td *ngIf="showSeconds">
      <a class="btn btn-link" [class.disabled]="!canIncrementSeconds || !isEditable"
         (click)="changeSeconds(secondsStep)"
         href="javascript:void(0);"
      >
        <span class="bs-chevron bs-chevron-up"></span>
      </a>
    </td>
    <!-- space between -->
    <td *ngIf="showMeridian">&nbsp;&nbsp;&nbsp;</td>
    <!-- meridian placeholder-->
    <td *ngIf="showMeridian"></td>
  </tr>
  <tr>
    <!-- hours -->
    <td class="form-group mb-3" [class.has-error]="invalidHours">
      <input type="text" [class.is-invalid]="invalidHours"
             class="form-control text-center bs-timepicker-field"
             [placeholder]="hoursPlaceholder"
             maxlength="2"
             [readonly]="readonlyInput"
             [disabled]="disabled"
             [value]="hours"
             (wheel)="prevDef($event);changeHours(hourStep * wheelSign($event), 'wheel')"
             (keydown.ArrowUp)="changeHours(hourStep, 'key')"
             (keydown.ArrowDown)="changeHours(-hourStep, 'key')"
             (change)="updateHours($event.target)" [attr.aria-label]="labelHours"></td>
    <!-- divider -->
    <td *ngIf="showMinutes">&nbsp;:&nbsp;</td>
    <!-- minutes -->
    <td class="form-group mb-3" *ngIf="showMinutes" [class.has-error]="invalidMinutes">
      <input type="text" [class.is-invalid]="invalidMinutes"
             class="form-control text-center bs-timepicker-field"
             [placeholder]="minutesPlaceholder"
             maxlength="2"
             [readonly]="readonlyInput"
             [disabled]="disabled"
             [value]="minutes"
             (wheel)="prevDef($event);changeMinutes(minuteStep * wheelSign($event), 'wheel')"
             (keydown.ArrowUp)="changeMinutes(minuteStep, 'key')"
             (keydown.ArrowDown)="changeMinutes(-minuteStep, 'key')"
             (change)="updateMinutes($event.target)" [attr.aria-label]="labelMinutes">
    </td>
    <!-- divider -->
    <td *ngIf="showSeconds">&nbsp;:&nbsp;</td>
    <!-- seconds -->
    <td class="form-group mb-3" *ngIf="showSeconds" [class.has-error]="invalidSeconds">
      <input type="text" [class.is-invalid]="invalidSeconds"
             class="form-control text-center bs-timepicker-field"
             [placeholder]="secondsPlaceholder"
             maxlength="2"
             [readonly]="readonlyInput"
             [disabled]="disabled"
             [value]="seconds"
             (wheel)="prevDef($event);changeSeconds(secondsStep * wheelSign($event), 'wheel')"
             (keydown.ArrowUp)="changeSeconds(secondsStep, 'key')"
             (keydown.ArrowDown)="changeSeconds(-secondsStep, 'key')"
             (change)="updateSeconds($event.target)" [attr.aria-label]="labelSeconds">
    </td>
    <!-- space between -->
    <td *ngIf="showMeridian">&nbsp;&nbsp;&nbsp;</td>
    <!-- meridian -->
    <td *ngIf="showMeridian">
      <button type="button" class="btn btn-default text-center"
              [disabled]="!isEditable || !canToggleMeridian"
              [class.disabled]="!isEditable || !canToggleMeridian"
              (click)="toggleMeridian()"
      >{{ meridian }}
      </button>
    </td>
  </tr>
  <tr class="text-center" [hidden]="!showSpinners">
    <!-- decrement hours button-->
    <td>
      <a class="btn btn-link" [class.disabled]="!canDecrementHours || !isEditable"
         (click)="changeHours(-hourStep)"
         href="javascript:void(0);"
      >
        <span class="bs-chevron bs-chevron-down"></span>
      </a>
    </td>
    <!-- divider -->
    <td *ngIf="showMinutes">&nbsp;&nbsp;&nbsp;</td>
    <!-- decrement minutes button-->
    <td *ngIf="showMinutes">
      <a class="btn btn-link" [class.disabled]="!canDecrementMinutes || !isEditable"
         (click)="changeMinutes(-minuteStep)"
         href="javascript:void(0);"
      >
        <span class="bs-chevron bs-chevron-down"></span>
      </a>
    </td>
    <!-- divider -->
    <td *ngIf="showSeconds">&nbsp;</td>
    <!-- decrement seconds button-->
    <td *ngIf="showSeconds">
      <a class="btn btn-link" [class.disabled]="!canDecrementSeconds || !isEditable"
         (click)="changeSeconds(-secondsStep)"
         href="javascript:void(0);"
      >
        <span class="bs-chevron bs-chevron-down"></span>
      </a>
    </td>
    <!-- space between -->
    <td *ngIf="showMeridian">&nbsp;&nbsp;&nbsp;</td>
    <!-- meridian placeholder-->
    <td *ngIf="showMeridian"></td>
  </tr>
  </tbody>
</table>
`,
      styles: [".bs-chevron{border-style:solid;display:block;width:9px;height:9px;position:relative;border-width:3px 0px 0 3px}.bs-chevron-up{-webkit-transform:rotate(45deg);transform:rotate(45deg);top:2px}.bs-chevron-down{-webkit-transform:rotate(-135deg);transform:rotate(-135deg);top:-2px}.bs-timepicker-field{width:65px;padding:.375rem .55rem}\n"]
    }]
  }], () => [{
    type: TimepickerConfig
  }, {
    type: ChangeDetectorRef
  }, {
    type: TimepickerStore
  }, {
    type: TimepickerActions
  }], {
    hourStep: [{
      type: Input
    }],
    minuteStep: [{
      type: Input
    }],
    secondsStep: [{
      type: Input
    }],
    readonlyInput: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    mousewheel: [{
      type: Input
    }],
    arrowkeys: [{
      type: Input
    }],
    showSpinners: [{
      type: Input
    }],
    showMeridian: [{
      type: Input
    }],
    showMinutes: [{
      type: Input
    }],
    showSeconds: [{
      type: Input
    }],
    meridians: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    hoursPlaceholder: [{
      type: Input
    }],
    minutesPlaceholder: [{
      type: Input
    }],
    secondsPlaceholder: [{
      type: Input
    }],
    isValid: [{
      type: Output
    }],
    meridianChange: [{
      type: Output
    }]
  });
})();
var TimepickerModule = class _TimepickerModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return {
      ngModule: _TimepickerModule,
      providers: []
    };
  }
  static {
    this.ɵfac = function TimepickerModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TimepickerModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _TimepickerModule,
      imports: [TimepickerComponent],
      exports: [TimepickerComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimepickerModule, [{
    type: NgModule,
    args: [{
      imports: [TimepickerComponent],
      exports: [TimepickerComponent]
    }]
  }], null, null);
})();

// node_modules/ngx-bootstrap/datepicker/fesm2022/ngx-bootstrap-datepicker.mjs
function BsCustomDatesViewComponent_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 2);
    ɵɵlistener("click", function BsCustomDatesViewComponent_button_1_Template_button_click_0_listener() {
      const range_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.selectFromRanges(range_r2));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const range_r2 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassProp("selected", ctx_r2.compareRanges(range_r2));
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", range_r2.label, " ");
  }
}
function BsDatepickerNavigationViewComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵtext(1, " ​ ");
    ɵɵelementStart(2, "button", 2);
    ɵɵlistener("click", function BsDatepickerNavigationViewComponent_ng_container_3_Template_button_click_2_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.view("month"));
    });
    ɵɵelementStart(3, "span");
    ɵɵtext(4);
    ɵɵelementEnd()();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("disabled", ctx_r1.isDisabled);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.calendar.monthTitle);
  }
}
var _c0 = [[["bs-datepicker-navigation-view"]], "*"];
var _c1 = ["bs-datepicker-navigation-view", "*"];
function BsCalendarLayoutComponent_bs_current_date_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "bs-current-date", 4);
  }
}
function BsCalendarLayoutComponent_bs_timepicker_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "bs-timepicker");
  }
}
function BsYearsCalendarViewComponent_tr_4_td_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td", 4);
    ɵɵlistener("click", function BsYearsCalendarViewComponent_tr_4_td_1_Template_td_click_0_listener() {
      const year_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.viewYear(year_r2));
    })("mouseenter", function BsYearsCalendarViewComponent_tr_4_td_1_Template_td_mouseenter_0_listener() {
      const year_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.hoverYear(year_r2, true));
    })("mouseleave", function BsYearsCalendarViewComponent_tr_4_td_1_Template_td_mouseleave_0_listener() {
      const year_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.hoverYear(year_r2, false));
    });
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const year_r2 = ctx.$implicit;
    ɵɵclassProp("disabled", year_r2.isDisabled)("is-highlighted", year_r2.isHovered);
    ɵɵadvance();
    ɵɵclassProp("selected", year_r2.isSelected);
    ɵɵadvance();
    ɵɵtextInterpolate(year_r2.label);
  }
}
function BsYearsCalendarViewComponent_tr_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr");
    ɵɵtemplate(1, BsYearsCalendarViewComponent_tr_4_td_1_Template, 3, 7, "td", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("ngForOf", row_r4);
  }
}
function BsMonthCalendarViewComponent_tr_4_td_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td", 4);
    ɵɵlistener("click", function BsMonthCalendarViewComponent_tr_4_td_1_Template_td_click_0_listener() {
      const month_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.viewMonth(month_r2));
    })("mouseenter", function BsMonthCalendarViewComponent_tr_4_td_1_Template_td_mouseenter_0_listener() {
      const month_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.hoverMonth(month_r2, true));
    })("mouseleave", function BsMonthCalendarViewComponent_tr_4_td_1_Template_td_mouseleave_0_listener() {
      const month_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.hoverMonth(month_r2, false));
    });
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const month_r2 = ctx.$implicit;
    ɵɵclassProp("disabled", month_r2.isDisabled)("is-highlighted", month_r2.isHovered);
    ɵɵadvance();
    ɵɵclassProp("selected", month_r2.isSelected);
    ɵɵadvance();
    ɵɵtextInterpolate(month_r2.label);
  }
}
function BsMonthCalendarViewComponent_tr_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr");
    ɵɵtemplate(1, BsMonthCalendarViewComponent_tr_4_td_1_Template, 3, 7, "td", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("ngForOf", row_r4);
  }
}
var _c2 = ["bsDatepickerDayDecorator", ""];
function BsDaysCalendarViewComponent_th_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "th");
  }
}
function BsDaysCalendarViewComponent_th_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "th", 5);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r1 = ctx.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate1("", ctx_r1.calendar.weekdays[i_r1], " ");
  }
}
function BsDaysCalendarViewComponent_tr_8_td_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 11);
    ɵɵlistener("click", function BsDaysCalendarViewComponent_tr_8_td_1_span_1_Template_span_click_0_listener() {
      ɵɵrestoreView(_r3);
      const week_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.selectWeek(week_r4));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r5 = ɵɵnextContext(2).index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.calendar.weekNumbers[i_r5]);
  }
}
function BsDaysCalendarViewComponent_tr_8_td_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 12);
    ɵɵlistener("click", function BsDaysCalendarViewComponent_tr_8_td_1_span_2_Template_span_click_0_listener() {
      ɵɵrestoreView(_r6);
      const week_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.selectWeek(week_r4));
    })("mouseenter", function BsDaysCalendarViewComponent_tr_8_td_1_span_2_Template_span_mouseenter_0_listener() {
      ɵɵrestoreView(_r6);
      const week_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.weekHoverHandler(week_r4, true));
    })("mouseleave", function BsDaysCalendarViewComponent_tr_8_td_1_span_2_Template_span_mouseleave_0_listener() {
      ɵɵrestoreView(_r6);
      const week_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.weekHoverHandler(week_r4, false));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r5 = ɵɵnextContext(2).index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.calendar.weekNumbers[i_r5]);
  }
}
function BsDaysCalendarViewComponent_tr_8_td_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td", 8);
    ɵɵtemplate(1, BsDaysCalendarViewComponent_tr_8_td_1_span_1_Template, 2, 1, "span", 9)(2, BsDaysCalendarViewComponent_tr_8_td_1_span_2_Template, 2, 1, "span", 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassProp("active-week", ctx_r1.isWeekHovered);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.isiOS);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.isiOS);
  }
}
function BsDaysCalendarViewComponent_tr_8_td_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 17);
    ɵɵlistener("click", function BsDaysCalendarViewComponent_tr_8_td_2_span_1_Template_span_click_0_listener() {
      ɵɵrestoreView(_r7);
      const day_r8 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.selectDay(day_r8));
    })("mouseenter", function BsDaysCalendarViewComponent_tr_8_td_2_span_1_Template_span_mouseenter_0_listener() {
      ɵɵrestoreView(_r7);
      const day_r8 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.hoverDay(day_r8, true));
    })("mouseleave", function BsDaysCalendarViewComponent_tr_8_td_2_span_1_Template_span_mouseleave_0_listener() {
      ɵɵrestoreView(_r7);
      const day_r8 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.hoverDay(day_r8, false));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const day_r8 = ɵɵnextContext().$implicit;
    ɵɵpropertyInterpolate("tooltip", day_r8.tooltipText);
    ɵɵproperty("day", day_r8);
    ɵɵadvance();
    ɵɵtextInterpolate1("", day_r8.label, " 3");
  }
}
function BsDaysCalendarViewComponent_tr_8_td_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 18);
    ɵɵlistener("click", function BsDaysCalendarViewComponent_tr_8_td_2_span_2_Template_span_click_0_listener() {
      ɵɵrestoreView(_r9);
      const day_r8 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.selectDay(day_r8));
    })("mouseenter", function BsDaysCalendarViewComponent_tr_8_td_2_span_2_Template_span_mouseenter_0_listener() {
      ɵɵrestoreView(_r9);
      const day_r8 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.hoverDay(day_r8, true));
    })("mouseleave", function BsDaysCalendarViewComponent_tr_8_td_2_span_2_Template_span_mouseleave_0_listener() {
      ɵɵrestoreView(_r9);
      const day_r8 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.hoverDay(day_r8, false));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const day_r8 = ɵɵnextContext().$implicit;
    ɵɵproperty("day", day_r8);
    ɵɵadvance();
    ɵɵtextInterpolate1("", day_r8.label, " 2");
  }
}
function BsDaysCalendarViewComponent_tr_8_td_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 19);
    ɵɵlistener("click", function BsDaysCalendarViewComponent_tr_8_td_2_span_3_Template_span_click_0_listener() {
      ɵɵrestoreView(_r10);
      const day_r8 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.selectDay(day_r8));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const day_r8 = ɵɵnextContext().$implicit;
    ɵɵproperty("day", day_r8);
    ɵɵadvance();
    ɵɵtextInterpolate1("", day_r8.label, " 1");
  }
}
function BsDaysCalendarViewComponent_tr_8_td_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td", 13);
    ɵɵtemplate(1, BsDaysCalendarViewComponent_tr_8_td_2_span_1_Template, 2, 3, "span", 14)(2, BsDaysCalendarViewComponent_tr_8_td_2_span_2_Template, 2, 2, "span", 15)(3, BsDaysCalendarViewComponent_tr_8_td_2_span_3_Template, 2, 2, "span", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.isiOS && ctx_r1.isShowTooltip);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.isiOS && !ctx_r1.isShowTooltip);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.isiOS);
  }
}
function BsDaysCalendarViewComponent_tr_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr");
    ɵɵtemplate(1, BsDaysCalendarViewComponent_tr_8_td_1_Template, 3, 4, "td", 6)(2, BsDaysCalendarViewComponent_tr_8_td_2_Template, 4, 3, "td", 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const week_r4 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.options && ctx_r1.options.showWeekNumbers);
    ɵɵadvance();
    ɵɵproperty("ngForOf", week_r4.days);
  }
}
var _c3 = ["startTP"];
function BsDatepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-days-calendar-view", 13);
    ɵɵpipe(1, "async");
    ɵɵlistener("onNavigate", function BsDatepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDatepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDatepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.dayHoverHandler($event));
    })("onHoverWeek", function BsDatepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onHoverWeek_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.weekHoverHandler($event));
    })("onSelect", function BsDatepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.daySelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r4 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r4)("isDisabled", ctx_r1.isDatePickerDisabled)("options", ɵɵpipeBind1(1, 5, ctx_r1.options$));
  }
}
function BsDatepickerContainerComponent_div_0_ng_container_4_div_4_timepicker_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "timepicker", 15, 1);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("disabled", ctx_r1.isDatePickerDisabled);
  }
}
function BsDatepickerContainerComponent_div_0_ng_container_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 14);
    ɵɵelement(1, "timepicker", 15, 0);
    ɵɵtemplate(3, BsDatepickerContainerComponent_div_0_ng_container_4_div_4_timepicker_3_Template, 2, 1, "timepicker", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r1.isDatePickerDisabled);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.isRangePicker);
  }
}
function BsDatepickerContainerComponent_div_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 10);
    ɵɵtemplate(2, BsDatepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template, 2, 7, "bs-days-calendar-view", 11);
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
    ɵɵtemplate(4, BsDatepickerContainerComponent_div_0_ng_container_4_div_4_Template, 4, 2, "div", 12);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ɵɵpipeBind1(3, 2, ctx_r1.daysCalendar$));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.withTimepicker);
  }
}
function BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-month-calendar-view", 18);
    ɵɵlistener("onNavigate", function BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.monthHoverHandler($event));
    })("onSelect", function BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.monthSelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r6 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r6);
  }
}
function BsDatepickerContainerComponent_div_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template, 1, 3, "bs-month-calendar-view", 17);
    ɵɵpipe(2, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 1, ctx_r1.monthsCalendar));
  }
}
function BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-years-calendar-view", 18);
    ɵɵlistener("onNavigate", function BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.yearHoverHandler($event));
    })("onSelect", function BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.yearSelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r8 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r8);
  }
}
function BsDatepickerContainerComponent_div_0_div_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template, 1, 3, "bs-years-calendar-view", 17);
    ɵɵpipe(2, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 1, ctx_r1.yearsCalendar));
  }
}
function BsDatepickerContainerComponent_div_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19)(1, "button", 20);
    ɵɵtext(2, "Apply");
    ɵɵelementEnd();
    ɵɵelementStart(3, "button", 21);
    ɵɵtext(4, "Cancel");
    ɵɵelementEnd()();
  }
}
function BsDatepickerContainerComponent_div_0_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24)(1, "button", 25);
    ɵɵlistener("click", function BsDatepickerContainerComponent_div_0_div_8_div_1_Template_button_click_1_listener() {
      ɵɵrestoreView(_r9);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setToday());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("today-left", ctx_r1.todayPos === "left")("today-right", ctx_r1.todayPos === "right")("today-center", ctx_r1.todayPos === "center");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.todayBtnLbl);
  }
}
function BsDatepickerContainerComponent_div_0_div_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 26)(1, "button", 25);
    ɵɵlistener("click", function BsDatepickerContainerComponent_div_0_div_8_div_2_Template_button_click_1_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.clearDate());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("clear-left", ctx_r1.clearPos === "left")("clear-right", ctx_r1.clearPos === "right")("clear-center", ctx_r1.clearPos === "center");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.clearBtnLbl);
  }
}
function BsDatepickerContainerComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵtemplate(1, BsDatepickerContainerComponent_div_0_div_8_div_1_Template, 3, 7, "div", 22)(2, BsDatepickerContainerComponent_div_0_div_8_div_2_Template, 3, 7, "div", 23);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showTodayBtn);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showClearBtn);
  }
}
function BsDatepickerContainerComponent_div_0_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 27)(1, "bs-custom-date-view", 28);
    ɵɵlistener("onSelect", function BsDatepickerContainerComponent_div_0_div_9_Template_bs_custom_date_view_onSelect_1_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.setRangeOnCalendar($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("selectedRange", ctx_r1.chosenRange)("ranges", ctx_r1.customRanges)("customRangeLabel", ctx_r1.customRangeBtnLbl);
  }
}
function BsDatepickerContainerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3)(1, "div", 4);
    ɵɵlistener("@datepickerAnimation.done", function BsDatepickerContainerComponent_div_0_Template_div_animation_datepickerAnimation_done_1_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.positionServiceEnable());
    });
    ɵɵelementStart(2, "div", 5);
    ɵɵpipe(3, "async");
    ɵɵtemplate(4, BsDatepickerContainerComponent_div_0_ng_container_4_Template, 5, 4, "ng-container", 6)(5, BsDatepickerContainerComponent_div_0_div_5_Template, 3, 3, "div", 7)(6, BsDatepickerContainerComponent_div_0_div_6_Template, 3, 3, "div", 7);
    ɵɵelementEnd();
    ɵɵtemplate(7, BsDatepickerContainerComponent_div_0_div_7_Template, 5, 0, "div", 8)(8, BsDatepickerContainerComponent_div_0_div_8_Template, 3, 2, "div", 8);
    ɵɵelementEnd();
    ɵɵtemplate(9, BsDatepickerContainerComponent_div_0_div_9_Template, 2, 3, "div", 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r1.containerClass);
    ɵɵadvance();
    ɵɵproperty("@datepickerAnimation", ctx_r1.animationState);
    ɵɵadvance();
    ɵɵproperty("ngSwitch", ɵɵpipeBind1(3, 9, ctx_r1.viewMode));
    ɵɵadvance(2);
    ɵɵproperty("ngSwitchCase", "day");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "month");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "year");
    ɵɵadvance();
    ɵɵproperty("ngIf", false);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showTodayBtn || ctx_r1.showClearBtn);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.customRanges && ctx_r1.customRanges.length > 0);
  }
}
function BsDatepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-days-calendar-view", 13);
    ɵɵpipe(1, "async");
    ɵɵlistener("onNavigate", function BsDatepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDatepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDatepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.dayHoverHandler($event));
    })("onHoverWeek", function BsDatepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onHoverWeek_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.weekHoverHandler($event));
    })("onSelect", function BsDatepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.daySelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r4 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r4)("isDisabled", ctx_r1.isDatePickerDisabled)("options", ɵɵpipeBind1(1, 5, ctx_r1.options$));
  }
}
function BsDatepickerInlineContainerComponent_div_0_ng_container_4_div_4_timepicker_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "timepicker", 15, 1);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("disabled", ctx_r1.isDatePickerDisabled);
  }
}
function BsDatepickerInlineContainerComponent_div_0_ng_container_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 14);
    ɵɵelement(1, "timepicker", 15, 0);
    ɵɵtemplate(3, BsDatepickerInlineContainerComponent_div_0_ng_container_4_div_4_timepicker_3_Template, 2, 1, "timepicker", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r1.isDatePickerDisabled);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.isRangePicker);
  }
}
function BsDatepickerInlineContainerComponent_div_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 10);
    ɵɵtemplate(2, BsDatepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template, 2, 7, "bs-days-calendar-view", 11);
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
    ɵɵtemplate(4, BsDatepickerInlineContainerComponent_div_0_ng_container_4_div_4_Template, 4, 2, "div", 12);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ɵɵpipeBind1(3, 2, ctx_r1.daysCalendar$));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.withTimepicker);
  }
}
function BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-month-calendar-view", 18);
    ɵɵlistener("onNavigate", function BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.monthHoverHandler($event));
    })("onSelect", function BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.monthSelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r6 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r6);
  }
}
function BsDatepickerInlineContainerComponent_div_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template, 1, 3, "bs-month-calendar-view", 17);
    ɵɵpipe(2, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 1, ctx_r1.monthsCalendar));
  }
}
function BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-years-calendar-view", 18);
    ɵɵlistener("onNavigate", function BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.yearHoverHandler($event));
    })("onSelect", function BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.yearSelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r8 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r8);
  }
}
function BsDatepickerInlineContainerComponent_div_0_div_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template, 1, 3, "bs-years-calendar-view", 17);
    ɵɵpipe(2, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 1, ctx_r1.yearsCalendar));
  }
}
function BsDatepickerInlineContainerComponent_div_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19)(1, "button", 20);
    ɵɵtext(2, "Apply");
    ɵɵelementEnd();
    ɵɵelementStart(3, "button", 21);
    ɵɵtext(4, "Cancel");
    ɵɵelementEnd()();
  }
}
function BsDatepickerInlineContainerComponent_div_0_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24)(1, "button", 25);
    ɵɵlistener("click", function BsDatepickerInlineContainerComponent_div_0_div_8_div_1_Template_button_click_1_listener() {
      ɵɵrestoreView(_r9);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setToday());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("today-left", ctx_r1.todayPos === "left")("today-right", ctx_r1.todayPos === "right")("today-center", ctx_r1.todayPos === "center");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.todayBtnLbl);
  }
}
function BsDatepickerInlineContainerComponent_div_0_div_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 26)(1, "button", 25);
    ɵɵlistener("click", function BsDatepickerInlineContainerComponent_div_0_div_8_div_2_Template_button_click_1_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.clearDate());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("clear-left", ctx_r1.clearPos === "left")("clear-right", ctx_r1.clearPos === "right")("clear-center", ctx_r1.clearPos === "center");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.clearBtnLbl);
  }
}
function BsDatepickerInlineContainerComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵtemplate(1, BsDatepickerInlineContainerComponent_div_0_div_8_div_1_Template, 3, 7, "div", 22)(2, BsDatepickerInlineContainerComponent_div_0_div_8_div_2_Template, 3, 7, "div", 23);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showTodayBtn);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showClearBtn);
  }
}
function BsDatepickerInlineContainerComponent_div_0_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 27)(1, "bs-custom-date-view", 28);
    ɵɵlistener("onSelect", function BsDatepickerInlineContainerComponent_div_0_div_9_Template_bs_custom_date_view_onSelect_1_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.setRangeOnCalendar($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("selectedRange", ctx_r1.chosenRange)("ranges", ctx_r1.customRanges)("customRangeLabel", ctx_r1.customRangeBtnLbl);
  }
}
function BsDatepickerInlineContainerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3)(1, "div", 4);
    ɵɵlistener("@datepickerAnimation.done", function BsDatepickerInlineContainerComponent_div_0_Template_div_animation_datepickerAnimation_done_1_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.positionServiceEnable());
    });
    ɵɵelementStart(2, "div", 5);
    ɵɵpipe(3, "async");
    ɵɵtemplate(4, BsDatepickerInlineContainerComponent_div_0_ng_container_4_Template, 5, 4, "ng-container", 6)(5, BsDatepickerInlineContainerComponent_div_0_div_5_Template, 3, 3, "div", 7)(6, BsDatepickerInlineContainerComponent_div_0_div_6_Template, 3, 3, "div", 7);
    ɵɵelementEnd();
    ɵɵtemplate(7, BsDatepickerInlineContainerComponent_div_0_div_7_Template, 5, 0, "div", 8)(8, BsDatepickerInlineContainerComponent_div_0_div_8_Template, 3, 2, "div", 8);
    ɵɵelementEnd();
    ɵɵtemplate(9, BsDatepickerInlineContainerComponent_div_0_div_9_Template, 2, 3, "div", 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r1.containerClass);
    ɵɵadvance();
    ɵɵproperty("@datepickerAnimation", ctx_r1.animationState);
    ɵɵadvance();
    ɵɵproperty("ngSwitch", ɵɵpipeBind1(3, 9, ctx_r1.viewMode));
    ɵɵadvance(2);
    ɵɵproperty("ngSwitchCase", "day");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "month");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "year");
    ɵɵadvance();
    ɵɵproperty("ngIf", false);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showTodayBtn || ctx_r1.showClearBtn);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.customRanges && ctx_r1.customRanges.length > 0);
  }
}
var _c4 = ["endTP"];
function BsDaterangepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-days-calendar-view", 13);
    ɵɵpipe(1, "async");
    ɵɵlistener("onNavigate", function BsDaterangepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDaterangepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDaterangepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.dayHoverHandler($event));
    })("onHoverWeek", function BsDaterangepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onHoverWeek_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.weekHoverHandler($event));
    })("onSelect", function BsDaterangepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.daySelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r4 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r4)("isDisabled", ctx_r1.isDatePickerDisabled)("options", ɵɵpipeBind1(1, 5, ctx_r1.options$));
  }
}
function BsDaterangepickerContainerComponent_div_0_ng_container_4_div_4_timepicker_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "timepicker", 15, 1);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("disabled", ctx_r1.isDatePickerDisabled);
  }
}
function BsDaterangepickerContainerComponent_div_0_ng_container_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 14);
    ɵɵelement(1, "timepicker", 15, 0);
    ɵɵtemplate(3, BsDaterangepickerContainerComponent_div_0_ng_container_4_div_4_timepicker_3_Template, 2, 1, "timepicker", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r1.isDatePickerDisabled);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.isRangePicker);
  }
}
function BsDaterangepickerContainerComponent_div_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 10);
    ɵɵtemplate(2, BsDaterangepickerContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template, 2, 7, "bs-days-calendar-view", 11);
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
    ɵɵtemplate(4, BsDaterangepickerContainerComponent_div_0_ng_container_4_div_4_Template, 4, 2, "div", 12);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ɵɵpipeBind1(3, 2, ctx_r1.daysCalendar$));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.withTimepicker);
  }
}
function BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-month-calendar-view", 18);
    ɵɵlistener("onNavigate", function BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.monthHoverHandler($event));
    })("onSelect", function BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.monthSelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r6 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r6);
  }
}
function BsDaterangepickerContainerComponent_div_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template, 1, 3, "bs-month-calendar-view", 17);
    ɵɵpipe(2, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 1, ctx_r1.monthsCalendar));
  }
}
function BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-years-calendar-view", 18);
    ɵɵlistener("onNavigate", function BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.yearHoverHandler($event));
    })("onSelect", function BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.yearSelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r8 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r8);
  }
}
function BsDaterangepickerContainerComponent_div_0_div_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template, 1, 3, "bs-years-calendar-view", 17);
    ɵɵpipe(2, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 1, ctx_r1.yearsCalendar));
  }
}
function BsDaterangepickerContainerComponent_div_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19)(1, "button", 20);
    ɵɵtext(2, "Apply");
    ɵɵelementEnd();
    ɵɵelementStart(3, "button", 21);
    ɵɵtext(4, "Cancel");
    ɵɵelementEnd()();
  }
}
function BsDaterangepickerContainerComponent_div_0_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24)(1, "button", 25);
    ɵɵlistener("click", function BsDaterangepickerContainerComponent_div_0_div_8_div_1_Template_button_click_1_listener() {
      ɵɵrestoreView(_r9);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setToday());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("today-left", ctx_r1.todayPos === "left")("today-right", ctx_r1.todayPos === "right")("today-center", ctx_r1.todayPos === "center");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.todayBtnLbl);
  }
}
function BsDaterangepickerContainerComponent_div_0_div_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 26)(1, "button", 25);
    ɵɵlistener("click", function BsDaterangepickerContainerComponent_div_0_div_8_div_2_Template_button_click_1_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.clearDate());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("clear-left", ctx_r1.clearPos === "left")("clear-right", ctx_r1.clearPos === "right")("clear-center", ctx_r1.clearPos === "center");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.clearBtnLbl);
  }
}
function BsDaterangepickerContainerComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵtemplate(1, BsDaterangepickerContainerComponent_div_0_div_8_div_1_Template, 3, 7, "div", 22)(2, BsDaterangepickerContainerComponent_div_0_div_8_div_2_Template, 3, 7, "div", 23);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showTodayBtn);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showClearBtn);
  }
}
function BsDaterangepickerContainerComponent_div_0_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 27)(1, "bs-custom-date-view", 28);
    ɵɵlistener("onSelect", function BsDaterangepickerContainerComponent_div_0_div_9_Template_bs_custom_date_view_onSelect_1_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.setRangeOnCalendar($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("selectedRange", ctx_r1.chosenRange)("ranges", ctx_r1.customRanges)("customRangeLabel", ctx_r1.customRangeBtnLbl);
  }
}
function BsDaterangepickerContainerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3)(1, "div", 4);
    ɵɵlistener("@datepickerAnimation.done", function BsDaterangepickerContainerComponent_div_0_Template_div_animation_datepickerAnimation_done_1_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.positionServiceEnable());
    });
    ɵɵelementStart(2, "div", 5);
    ɵɵpipe(3, "async");
    ɵɵtemplate(4, BsDaterangepickerContainerComponent_div_0_ng_container_4_Template, 5, 4, "ng-container", 6)(5, BsDaterangepickerContainerComponent_div_0_div_5_Template, 3, 3, "div", 7)(6, BsDaterangepickerContainerComponent_div_0_div_6_Template, 3, 3, "div", 7);
    ɵɵelementEnd();
    ɵɵtemplate(7, BsDaterangepickerContainerComponent_div_0_div_7_Template, 5, 0, "div", 8)(8, BsDaterangepickerContainerComponent_div_0_div_8_Template, 3, 2, "div", 8);
    ɵɵelementEnd();
    ɵɵtemplate(9, BsDaterangepickerContainerComponent_div_0_div_9_Template, 2, 3, "div", 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r1.containerClass);
    ɵɵadvance();
    ɵɵproperty("@datepickerAnimation", ctx_r1.animationState);
    ɵɵadvance();
    ɵɵproperty("ngSwitch", ɵɵpipeBind1(3, 9, ctx_r1.viewMode));
    ɵɵadvance(2);
    ɵɵproperty("ngSwitchCase", "day");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "month");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "year");
    ɵɵadvance();
    ɵɵproperty("ngIf", false);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showTodayBtn || ctx_r1.showClearBtn);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.customRanges && ctx_r1.customRanges.length > 0);
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-days-calendar-view", 13);
    ɵɵpipe(1, "async");
    ɵɵlistener("onNavigate", function BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.dayHoverHandler($event));
    })("onHoverWeek", function BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onHoverWeek_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.weekHoverHandler($event));
    })("onSelect", function BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template_bs_days_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.daySelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r4 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r4)("isDisabled", ctx_r1.isDatePickerDisabled)("options", ɵɵpipeBind1(1, 5, ctx_r1.options$));
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_div_4_timepicker_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "timepicker", 15, 1);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("disabled", ctx_r1.isDatePickerDisabled);
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 14);
    ɵɵelement(1, "timepicker", 15, 0);
    ɵɵtemplate(3, BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_div_4_timepicker_3_Template, 2, 1, "timepicker", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r1.isDatePickerDisabled);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.isRangePicker);
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 10);
    ɵɵtemplate(2, BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_bs_days_calendar_view_2_Template, 2, 7, "bs-days-calendar-view", 11);
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
    ɵɵtemplate(4, BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_div_4_Template, 4, 2, "div", 12);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ɵɵpipeBind1(3, 2, ctx_r1.daysCalendar$));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.withTimepicker);
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-month-calendar-view", 18);
    ɵɵlistener("onNavigate", function BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.monthHoverHandler($event));
    })("onSelect", function BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.monthSelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r6 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r6);
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template, 1, 3, "bs-month-calendar-view", 17);
    ɵɵpipe(2, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 1, ctx_r1.monthsCalendar));
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "bs-years-calendar-view", 18);
    ɵɵlistener("onNavigate", function BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onNavigate_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.navigateTo($event));
    })("onViewMode", function BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onViewMode_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setViewMode($event));
    })("onHover", function BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onHover_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.yearHoverHandler($event));
    })("onSelect", function BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onSelect_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.yearSelectHandler($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const calendar_r8 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("bs-datepicker-multiple", ctx_r1.multipleCalendars);
    ɵɵproperty("calendar", calendar_r8);
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_div_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template, 1, 3, "bs-years-calendar-view", 17);
    ɵɵpipe(2, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 1, ctx_r1.yearsCalendar));
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19)(1, "button", 20);
    ɵɵtext(2, "Apply");
    ɵɵelementEnd();
    ɵɵelementStart(3, "button", 21);
    ɵɵtext(4, "Cancel");
    ɵɵelementEnd()();
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24)(1, "button", 25);
    ɵɵlistener("click", function BsDaterangepickerInlineContainerComponent_div_0_div_8_div_1_Template_button_click_1_listener() {
      ɵɵrestoreView(_r9);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.setToday());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("today-left", ctx_r1.todayPos === "left")("today-right", ctx_r1.todayPos === "right")("today-center", ctx_r1.todayPos === "center");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.todayBtnLbl);
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_div_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 26)(1, "button", 25);
    ɵɵlistener("click", function BsDaterangepickerInlineContainerComponent_div_0_div_8_div_2_Template_button_click_1_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.clearDate());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassProp("clear-left", ctx_r1.clearPos === "left")("clear-right", ctx_r1.clearPos === "right")("clear-center", ctx_r1.clearPos === "center");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.clearBtnLbl);
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵtemplate(1, BsDaterangepickerInlineContainerComponent_div_0_div_8_div_1_Template, 3, 7, "div", 22)(2, BsDaterangepickerInlineContainerComponent_div_0_div_8_div_2_Template, 3, 7, "div", 23);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showTodayBtn);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showClearBtn);
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 27)(1, "bs-custom-date-view", 28);
    ɵɵlistener("onSelect", function BsDaterangepickerInlineContainerComponent_div_0_div_9_Template_bs_custom_date_view_onSelect_1_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.setRangeOnCalendar($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("selectedRange", ctx_r1.chosenRange)("ranges", ctx_r1.customRanges)("customRangeLabel", ctx_r1.customRangeBtnLbl);
  }
}
function BsDaterangepickerInlineContainerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3)(1, "div", 4);
    ɵɵlistener("@datepickerAnimation.done", function BsDaterangepickerInlineContainerComponent_div_0_Template_div_animation_datepickerAnimation_done_1_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.positionServiceEnable());
    });
    ɵɵelementStart(2, "div", 5);
    ɵɵpipe(3, "async");
    ɵɵtemplate(4, BsDaterangepickerInlineContainerComponent_div_0_ng_container_4_Template, 5, 4, "ng-container", 6)(5, BsDaterangepickerInlineContainerComponent_div_0_div_5_Template, 3, 3, "div", 7)(6, BsDaterangepickerInlineContainerComponent_div_0_div_6_Template, 3, 3, "div", 7);
    ɵɵelementEnd();
    ɵɵtemplate(7, BsDaterangepickerInlineContainerComponent_div_0_div_7_Template, 5, 0, "div", 8)(8, BsDaterangepickerInlineContainerComponent_div_0_div_8_Template, 3, 2, "div", 8);
    ɵɵelementEnd();
    ɵɵtemplate(9, BsDaterangepickerInlineContainerComponent_div_0_div_9_Template, 2, 3, "div", 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r1.containerClass);
    ɵɵadvance();
    ɵɵproperty("@datepickerAnimation", ctx_r1.animationState);
    ɵɵadvance();
    ɵɵproperty("ngSwitch", ɵɵpipeBind1(3, 9, ctx_r1.viewMode));
    ɵɵadvance(2);
    ɵɵproperty("ngSwitchCase", "day");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "month");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "year");
    ɵɵadvance();
    ɵɵproperty("ngIf", false);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showTodayBtn || ctx_r1.showClearBtn);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.customRanges && ctx_r1.customRanges.length > 0);
  }
}
var BsDatepickerConfig = class _BsDatepickerConfig {
  constructor() {
    this.adaptivePosition = false;
    this.useUtc = false;
    this.isAnimated = false;
    this.startView = "day";
    this.returnFocusToInput = false;
    this.containerClass = "theme-green";
    this.displayMonths = 1;
    this.showWeekNumbers = true;
    this.dateInputFormat = "L";
    this.rangeSeparator = " - ";
    this.rangeInputFormat = "L";
    this.monthTitle = "MMMM";
    this.yearTitle = "YYYY";
    this.dayLabel = "D";
    this.monthLabel = "MMMM";
    this.yearLabel = "YYYY";
    this.weekNumbers = "w";
    this.showTodayButton = false;
    this.showClearButton = false;
    this.todayPosition = "center";
    this.clearPosition = "right";
    this.todayButtonLabel = "Today";
    this.clearButtonLabel = "Clear";
    this.customRangeButtonLabel = "Custom Range";
    this.withTimepicker = false;
    this.allowedPositions = ["top", "bottom"];
    this.keepDatepickerOpened = false;
    this.keepDatesOutOfRules = false;
  }
  static {
    this.ɵfac = function BsDatepickerConfig_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerConfig)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BsDatepickerConfig,
      factory: _BsDatepickerConfig.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var DATEPICKER_ANIMATION_TIMING = "220ms cubic-bezier(0, 0, 0.2, 1)";
var datepickerAnimation = trigger("datepickerAnimation", [state("animated-down", style({
  height: "*",
  overflow: "hidden"
})), transition("* => animated-down", [style({
  height: 0,
  overflow: "hidden"
}), animate(DATEPICKER_ANIMATION_TIMING)]), state("animated-up", style({
  height: "*",
  overflow: "hidden"
})), transition("* => animated-up", [style({
  height: "*",
  overflow: "hidden"
}), animate(DATEPICKER_ANIMATION_TIMING)]), transition("* => unanimated", animate("0s"))]);
var BsDatepickerAbstractComponent = class {
  constructor() {
    this.containerClass = "";
    this.customRanges = [];
    this.chosenRange = [];
    this._daysCalendarSub = new Subscription();
    this.selectedTimeSub = new Subscription();
  }
  set minDate(value) {
    this._effects?.setMinDate(value);
  }
  set maxDate(value) {
    this._effects?.setMaxDate(value);
  }
  set daysDisabled(value) {
    this._effects?.setDaysDisabled(value);
  }
  set datesDisabled(value) {
    this._effects?.setDatesDisabled(value);
  }
  set datesEnabled(value) {
    this._effects?.setDatesEnabled(value);
  }
  set isDisabled(value) {
    this._effects?.setDisabled(value);
  }
  set dateCustomClasses(value) {
    this._effects?.setDateCustomClasses(value);
  }
  set dateTooltipTexts(value) {
    this._effects?.setDateTooltipTexts(value);
  }
  set daysCalendar$(value) {
    this._daysCalendar$ = value;
    this._daysCalendarSub.unsubscribe();
    this._daysCalendarSub.add(this._daysCalendar$.subscribe((value2) => {
      this.multipleCalendars = !!value2 && value2.length > 1;
    }));
  }
  get daysCalendar$() {
    return this._daysCalendar$;
  }
  // todo: valorkin fix
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  setViewMode(event) {
  }
  // eslint-disable-next-line
  navigateTo(event) {
  }
  // eslint-disable-next-line
  dayHoverHandler(event) {
  }
  // eslint-disable-next-line
  weekHoverHandler(event) {
  }
  // eslint-disable-next-line
  monthHoverHandler(event) {
  }
  // eslint-disable-next-line
  yearHoverHandler(event) {
  }
  // eslint-disable-next-line
  timeSelectHandler(date, index) {
  }
  // eslint-disable-next-line
  daySelectHandler(day) {
  }
  // eslint-disable-next-line
  monthSelectHandler(event) {
  }
  // eslint-disable-next-line
  yearSelectHandler(event) {
  }
  // eslint-disable-next-line
  setRangeOnCalendar(dates) {
  }
  // eslint-disable-next-line
  setToday() {
  }
  // eslint-disable-next-line
  clearDate() {
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _stopPropagation(event) {
    event.stopPropagation();
  }
};
var BsDatepickerActions = class _BsDatepickerActions {
  static {
    this.CALCULATE = "[datepicker] calculate dates matrix";
  }
  static {
    this.FORMAT = "[datepicker] format datepicker values";
  }
  static {
    this.FLAG = "[datepicker] set flags";
  }
  static {
    this.SELECT = "[datepicker] select date";
  }
  static {
    this.NAVIGATE_OFFSET = "[datepicker] shift view date";
  }
  static {
    this.NAVIGATE_TO = "[datepicker] change view date";
  }
  static {
    this.SET_OPTIONS = "[datepicker] update render options";
  }
  static {
    this.HOVER = "[datepicker] hover date";
  }
  static {
    this.CHANGE_VIEWMODE = "[datepicker] switch view mode";
  }
  static {
    this.SET_MIN_DATE = "[datepicker] set min date";
  }
  static {
    this.SET_MAX_DATE = "[datepicker] set max date";
  }
  static {
    this.SET_DAYSDISABLED = "[datepicker] set days disabled";
  }
  static {
    this.SET_DATESDISABLED = "[datepicker] set dates disabled";
  }
  static {
    this.SET_DATESENABLED = "[datepicker] set dates enabled";
  }
  static {
    this.SET_IS_DISABLED = "[datepicker] set is disabled";
  }
  static {
    this.SET_DATE_CUSTOM_CLASSES = "[datepicker] set date custom classes";
  }
  static {
    this.SET_DATE_TOOLTIP_TEXTS = "[datepicker] set date tooltip texts";
  }
  static {
    this.SET_LOCALE = "[datepicker] set datepicker locale";
  }
  static {
    this.SELECT_TIME = "[datepicker] select time";
  }
  static {
    this.SELECT_RANGE = "[daterangepicker] select dates range";
  }
  calculate() {
    return {
      type: _BsDatepickerActions.CALCULATE
    };
  }
  format() {
    return {
      type: _BsDatepickerActions.FORMAT
    };
  }
  flag() {
    return {
      type: _BsDatepickerActions.FLAG
    };
  }
  select(date) {
    return {
      type: _BsDatepickerActions.SELECT,
      payload: date
    };
  }
  selectTime(date, index) {
    return {
      type: _BsDatepickerActions.SELECT_TIME,
      payload: {
        date,
        index
      }
    };
  }
  changeViewMode(event) {
    return {
      type: _BsDatepickerActions.CHANGE_VIEWMODE,
      payload: event
    };
  }
  navigateTo(event) {
    return {
      type: _BsDatepickerActions.NAVIGATE_TO,
      payload: event
    };
  }
  navigateStep(step) {
    return {
      type: _BsDatepickerActions.NAVIGATE_OFFSET,
      payload: step
    };
  }
  setOptions(options) {
    return {
      type: _BsDatepickerActions.SET_OPTIONS,
      payload: options
    };
  }
  // date range picker
  selectRange(value) {
    return {
      type: _BsDatepickerActions.SELECT_RANGE,
      payload: value
    };
  }
  hoverDay(event) {
    return {
      type: _BsDatepickerActions.HOVER,
      payload: event.isHovered ? event.cell.date : null
    };
  }
  minDate(date) {
    return {
      type: _BsDatepickerActions.SET_MIN_DATE,
      payload: date
    };
  }
  maxDate(date) {
    return {
      type: _BsDatepickerActions.SET_MAX_DATE,
      payload: date
    };
  }
  daysDisabled(days) {
    return {
      type: _BsDatepickerActions.SET_DAYSDISABLED,
      payload: days
    };
  }
  datesDisabled(dates) {
    return {
      type: _BsDatepickerActions.SET_DATESDISABLED,
      payload: dates
    };
  }
  datesEnabled(dates) {
    return {
      type: _BsDatepickerActions.SET_DATESENABLED,
      payload: dates
    };
  }
  isDisabled(value) {
    return {
      type: _BsDatepickerActions.SET_IS_DISABLED,
      payload: value
    };
  }
  setDateCustomClasses(value) {
    return {
      type: _BsDatepickerActions.SET_DATE_CUSTOM_CLASSES,
      payload: value
    };
  }
  setDateTooltipTexts(value) {
    return {
      type: _BsDatepickerActions.SET_DATE_TOOLTIP_TEXTS,
      payload: value
    };
  }
  setLocale(locale) {
    return {
      type: _BsDatepickerActions.SET_LOCALE,
      payload: locale
    };
  }
  static {
    this.ɵfac = function BsDatepickerActions_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerActions)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BsDatepickerActions,
      factory: _BsDatepickerActions.ɵfac,
      providedIn: "platform"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerActions, [{
    type: Injectable,
    args: [{
      providedIn: "platform"
    }]
  }], null, null);
})();
var BsLocaleService = class _BsLocaleService {
  constructor() {
    this._defaultLocale = "en";
    this._locale = new BehaviorSubject(this._defaultLocale);
    this._localeChange = this._locale.asObservable();
  }
  get locale() {
    return this._locale;
  }
  get localeChange() {
    return this._localeChange;
  }
  get currentLocale() {
    return this._locale.getValue();
  }
  use(locale) {
    if (locale === this.currentLocale) {
      return;
    }
    this._locale.next(locale);
  }
  static {
    this.ɵfac = function BsLocaleService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsLocaleService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BsLocaleService,
      factory: _BsLocaleService.ɵfac,
      providedIn: "platform"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsLocaleService, [{
    type: Injectable,
    args: [{
      providedIn: "platform"
    }]
  }], null, null);
})();
var BsDatepickerEffects = class _BsDatepickerEffects {
  constructor(_actions, _localeService) {
    this._actions = _actions;
    this._localeService = _localeService;
    this._subs = [];
  }
  init(_bsDatepickerStore) {
    this._store = _bsDatepickerStore;
    return this;
  }
  /** setters */
  setValue(value) {
    this._store?.dispatch(this._actions.select(value));
  }
  setRangeValue(value) {
    this._store?.dispatch(this._actions.selectRange(value));
  }
  setMinDate(value) {
    this._store?.dispatch(this._actions.minDate(value));
    return this;
  }
  setMaxDate(value) {
    this._store?.dispatch(this._actions.maxDate(value));
    return this;
  }
  setDaysDisabled(value) {
    this._store?.dispatch(this._actions.daysDisabled(value));
    return this;
  }
  setDatesDisabled(value) {
    this._store?.dispatch(this._actions.datesDisabled(value));
    return this;
  }
  setDatesEnabled(value) {
    this._store?.dispatch(this._actions.datesEnabled(value));
    return this;
  }
  setDisabled(value) {
    this._store?.dispatch(this._actions.isDisabled(value));
    return this;
  }
  setDateCustomClasses(value) {
    this._store?.dispatch(this._actions.setDateCustomClasses(value));
    return this;
  }
  setDateTooltipTexts(value) {
    this._store?.dispatch(this._actions.setDateTooltipTexts(value));
    return this;
  }
  /* Set rendering options */
  setOptions(_config) {
    const _options = Object.assign({
      locale: this._localeService.currentLocale
    }, _config);
    this._store?.dispatch(this._actions.setOptions(_options));
    return this;
  }
  /** view to mode bindings */
  setBindings(container) {
    if (!this._store) {
      return this;
    }
    container.selectedTime = this._store.select((state2) => state2.selectedTime).pipe(filter((times) => !!times));
    container.daysCalendar$ = this._store.select((state2) => state2.flaggedMonths).pipe(filter((months) => !!months));
    container.monthsCalendar = this._store.select((state2) => state2.flaggedMonthsCalendar).pipe(filter((months) => !!months));
    container.yearsCalendar = this._store.select((state2) => state2.yearsCalendarFlagged).pipe(filter((years) => !!years));
    container.viewMode = this._store.select((state2) => state2.view?.mode);
    container.options$ = combineLatest([this._store.select((state2) => state2.showWeekNumbers), this._store.select((state2) => state2.displayMonths)]).pipe(map((latest) => ({
      showWeekNumbers: latest[0],
      displayMonths: latest[1]
    })));
    return this;
  }
  /** event handlers */
  setEventHandlers(container) {
    container.setViewMode = (event) => {
      this._store?.dispatch(this._actions.changeViewMode(event));
    };
    container.navigateTo = (event) => {
      this._store?.dispatch(this._actions.navigateStep(event.step));
    };
    container.dayHoverHandler = (event) => {
      const _cell = event.cell;
      if (_cell.isOtherMonth || _cell.isDisabled) {
        return;
      }
      this._store?.dispatch(this._actions.hoverDay(event));
      _cell.isHovered = event.isHovered;
    };
    container.monthHoverHandler = (event) => {
      event.cell.isHovered = event.isHovered;
    };
    container.yearHoverHandler = (event) => {
      event.cell.isHovered = event.isHovered;
    };
    return this;
  }
  registerDatepickerSideEffects() {
    if (!this._store) {
      return this;
    }
    this._subs.push(this._store.select((state2) => state2.view).subscribe(() => {
      this._store?.dispatch(this._actions.calculate());
    }));
    this._subs.push(this._store.select((state2) => state2.monthsModel).pipe(filter((monthModel) => !!monthModel)).subscribe(() => this._store?.dispatch(this._actions.format())));
    this._subs.push(this._store.select((state2) => state2.formattedMonths).pipe(filter((month) => !!month)).subscribe(() => this._store?.dispatch(this._actions.flag())));
    this._subs.push(this._store.select((state2) => state2.selectedDate).pipe(filter((selectedDate) => !!selectedDate)).subscribe(() => this._store?.dispatch(this._actions.flag())));
    this._subs.push(this._store.select((state2) => state2.selectedRange).pipe(filter((selectedRange) => !!selectedRange)).subscribe(() => this._store?.dispatch(this._actions.flag())));
    this._subs.push(this._store.select((state2) => state2.monthsCalendar).subscribe(() => this._store?.dispatch(this._actions.flag())));
    this._subs.push(this._store.select((state2) => state2.yearsCalendarModel).pipe(filter((state2) => !!state2)).subscribe(() => this._store?.dispatch(this._actions.flag())));
    this._subs.push(this._store.select((state2) => state2.hoveredDate).pipe(filter((hoveredDate) => !!hoveredDate)).subscribe(() => this._store?.dispatch(this._actions.flag())));
    this._subs.push(this._store.select((state2) => state2.dateCustomClasses).pipe(filter((dateCustomClasses) => !!dateCustomClasses)).subscribe(() => this._store?.dispatch(this._actions.flag())));
    this._subs.push(this._store.select((state2) => state2.dateTooltipTexts).pipe(filter((dateTooltipTexts) => !!dateTooltipTexts)).subscribe(() => this._store?.dispatch(this._actions.flag())));
    this._subs.push(this._localeService.localeChange.subscribe((locale) => this._store?.dispatch(this._actions.setLocale(locale))));
    return this;
  }
  destroy() {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
  }
  static {
    this.ɵfac = function BsDatepickerEffects_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerEffects)(ɵɵinject(BsDatepickerActions), ɵɵinject(BsLocaleService));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BsDatepickerEffects,
      factory: _BsDatepickerEffects.ɵfac,
      providedIn: "platform"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerEffects, [{
    type: Injectable,
    args: [{
      providedIn: "platform"
    }]
  }], () => [{
    type: BsDatepickerActions
  }, {
    type: BsLocaleService
  }], null);
})();
var defaultMonthOptions = {
  width: 7,
  height: 6
};
var dayInMilliseconds = 24 * 60 * 60 * 1e3;
var _initialView = {
  date: /* @__PURE__ */ new Date(),
  mode: "day"
};
var initialDatepickerState = Object.assign(new BsDatepickerConfig(), {
  locale: "en",
  view: _initialView,
  selectedRange: [],
  selectedTime: [],
  monthViewOptions: defaultMonthOptions
});
function getStartingDayOfCalendar(date, options) {
  if (isFirstDayOfWeek(date, options.firstDayOfWeek)) {
    return date;
  }
  const weekDay = getDay(date);
  const offset = calculateDateOffset(weekDay, options.firstDayOfWeek);
  return shiftDate(date, {
    day: -offset
  });
}
function calculateDateOffset(weekday, startingDayOffset) {
  const _startingDayOffset = Number(startingDayOffset);
  if (isNaN(_startingDayOffset)) {
    return 0;
  }
  if (_startingDayOffset === 0) {
    return weekday;
  }
  const offset = weekday - _startingDayOffset % 7;
  return offset < 0 ? offset + 7 : offset;
}
function isMonthDisabled(date, min, max) {
  const minBound = min && isBefore(endOf(date, "month"), min, "day");
  const maxBound = max && isAfter(startOf(date, "month"), max, "day");
  return minBound || maxBound || false;
}
function isYearDisabled(date, min, max) {
  const minBound = min && isBefore(endOf(date, "year"), min, "day");
  const maxBound = max && isAfter(startOf(date, "year"), max, "day");
  return minBound || maxBound || false;
}
function isDisabledDate(date, datesDisabled, unit) {
  if (!datesDisabled || !isArray(datesDisabled) || !datesDisabled.length) {
    return false;
  }
  if (unit && unit === "year" && !datesDisabled[0].getDate()) {
    return datesDisabled.some((dateDisabled) => isSame(date, dateDisabled, "year"));
  }
  return datesDisabled.some((dateDisabled) => isSame(date, dateDisabled, "date"));
}
function isEnabledDate(date, datesEnabled, unit) {
  if (!datesEnabled || !isArray(datesEnabled) || !datesEnabled.length) {
    return false;
  }
  return !datesEnabled.some((enabledDate) => isSame(date, enabledDate, unit || "date"));
}
function getYearsCalendarInitialDate(state2, calendarIndex = 0) {
  const model = state2 && state2.yearsCalendarModel && state2.yearsCalendarModel[calendarIndex];
  return model?.years[0] && model.years[0][0] && model.years[0][0].date;
}
function checkRangesWithMaxDate(ranges, maxDate) {
  if (!ranges) return ranges;
  if (!maxDate) return ranges;
  if (!ranges.length && !ranges[0].value) return ranges;
  ranges.forEach((item) => {
    if (!item || !item.value) return ranges;
    if (item.value instanceof Date) return ranges;
    if (!(item.value instanceof Array && item.value.length)) return ranges;
    item.value = compareDateWithMaxDateHelper(item.value, maxDate);
    return ranges;
  });
  return ranges;
}
function checkBsValue(date, maxDate) {
  if (!date) return date;
  if (!maxDate) return date;
  if (date instanceof Array && !date.length) return date;
  if (date instanceof Date) return date;
  return compareDateWithMaxDateHelper(date, maxDate);
}
function compareDateWithMaxDateHelper(date, maxDate) {
  if (date instanceof Array) {
    const editedValues = date.map((item) => {
      if (!item) return item;
      if (isAfter(item, maxDate, "date")) item = maxDate;
      return item;
    });
    return editedValues;
  }
  return date;
}
function setCurrentTimeOnDateSelect(value) {
  if (!value) return value;
  return setCurrentTimeHelper(value);
}
function setDateRangesCurrentTimeOnDateSelect(value) {
  if (!value?.length) return value;
  value.map((date) => {
    if (!date) {
      return date;
    }
    return setCurrentTimeHelper(date);
  });
  return value;
}
function setCurrentTimeHelper(date) {
  const now = /* @__PURE__ */ new Date();
  date.setMilliseconds(now.getMilliseconds());
  date.setSeconds(now.getSeconds());
  date.setMinutes(now.getMinutes());
  date.setHours(now.getHours());
  return date;
}
function createMatrix(options, fn) {
  let prevValue = options.initialDate;
  const matrix = new Array(options.height);
  for (let i = 0; i < options.height; i++) {
    matrix[i] = new Array(options.width);
    for (let j = 0; j < options.width; j++) {
      matrix[i][j] = fn(prevValue);
      prevValue = shiftDate(prevValue, options.shift);
    }
  }
  return matrix;
}
function calcDaysCalendar(startingDate, options) {
  const firstDay = getFirstDayOfMonth(startingDate);
  const initialDate = getStartingDayOfCalendar(firstDay, options);
  const matrixOptions = {
    width: options.width || 0,
    height: options.height || 0,
    initialDate,
    shift: {
      day: 1
    }
  };
  const daysMatrix = createMatrix(matrixOptions, (date) => date);
  return {
    daysMatrix,
    month: firstDay
  };
}
function formatDaysCalendar(daysCalendar, formatOptions, monthIndex) {
  return {
    month: daysCalendar.month,
    monthTitle: formatDate(daysCalendar.month, formatOptions.monthTitle, formatOptions.locale),
    yearTitle: formatDate(daysCalendar.month, formatOptions.yearTitle, formatOptions.locale),
    weekNumbers: getWeekNumbers(daysCalendar.daysMatrix, formatOptions.weekNumbers, formatOptions.locale),
    weekdays: getShiftedWeekdays(formatOptions.locale),
    weeks: daysCalendar.daysMatrix.map((week, weekIndex) => ({
      days: week.map((date, dayIndex) => ({
        date,
        label: formatDate(date, formatOptions.dayLabel, formatOptions.locale),
        monthIndex,
        weekIndex,
        dayIndex
      }))
    })),
    hideLeftArrow: false,
    hideRightArrow: false,
    disableLeftArrow: false,
    disableRightArrow: false
  };
}
function getWeekNumbers(daysMatrix, format, locale) {
  return daysMatrix.map((days) => days[0] ? formatDate(days[0], format, locale) : "");
}
function getShiftedWeekdays(locale) {
  const _locale = getLocale(locale);
  const weekdays = _locale.weekdaysShort();
  const firstDayOfWeek = _locale.firstDayOfWeek();
  return [...weekdays.slice(firstDayOfWeek), ...weekdays.slice(0, firstDayOfWeek)];
}
function flagDaysCalendar(formattedMonth, options) {
  formattedMonth.weeks.forEach((week) => {
    week.days.forEach((day, dayIndex) => {
      const isOtherMonth = !isSameMonth(day.date, formattedMonth.month);
      const isHovered = !isOtherMonth && isSameDay$1(day.date, options.hoveredDate);
      const isSelectionStart = !isOtherMonth && options.selectedRange && isSameDay$1(day.date, options.selectedRange[0]);
      const isSelectionEnd = !isOtherMonth && options.selectedRange && isSameDay$1(day.date, options.selectedRange[1]);
      const isSelected = !isOtherMonth && isSameDay$1(day.date, options.selectedDate) || isSelectionStart || isSelectionEnd;
      const isInRange = !isOtherMonth && options.selectedRange && isDateInRange(day.date, options.selectedRange, options.hoveredDate);
      const isDisabled = options.isDisabled || isBefore(day.date, options.minDate, "day") || isAfter(day.date, options.maxDate, "day") || isDisabledDay(day.date, options.daysDisabled) || isDisabledDate(day.date, options.datesDisabled) || isEnabledDate(day.date, options.datesEnabled);
      const currentDate = /* @__PURE__ */ new Date();
      const isToday = !isOtherMonth && isSameDay$1(day.date, currentDate);
      const customClasses = options.dateCustomClasses && options.dateCustomClasses.map((dcc) => isSameDay$1(day.date, dcc.date) ? dcc.classes : []).reduce((previousValue, currentValue) => previousValue.concat(currentValue), []).join(" ") || "";
      const tooltipText = options.dateTooltipTexts && options.dateTooltipTexts.map((tt) => isSameDay$1(day.date, tt.date) ? tt.tooltipText : "").reduce((previousValue, currentValue) => {
        previousValue.push(currentValue);
        return previousValue;
      }, []).join(" ") || "";
      const newDay = Object.assign({}, day, {
        isOtherMonth,
        isHovered,
        isSelected,
        isSelectionStart,
        isSelectionEnd,
        isInRange,
        isDisabled,
        isToday,
        customClasses,
        tooltipText
      });
      if (day.isOtherMonth !== newDay.isOtherMonth || day.isHovered !== newDay.isHovered || day.isSelected !== newDay.isSelected || day.isSelectionStart !== newDay.isSelectionStart || day.isSelectionEnd !== newDay.isSelectionEnd || day.isDisabled !== newDay.isDisabled || day.isInRange !== newDay.isInRange || day.customClasses !== newDay.customClasses || day.tooltipText !== newDay.tooltipText) {
        week.days[dayIndex] = newDay;
      }
    });
  });
  formattedMonth.hideLeftArrow = options.isDisabled || !!options.monthIndex && options.monthIndex > 0 && options.monthIndex !== options.displayMonths;
  formattedMonth.hideRightArrow = options.isDisabled || (!!options.monthIndex || options.monthIndex === 0) && !!options.displayMonths && options.monthIndex < options.displayMonths && options.monthIndex + 1 !== options.displayMonths;
  formattedMonth.disableLeftArrow = isMonthDisabled(shiftDate(formattedMonth.month, {
    month: -1
  }), options.minDate, options.maxDate);
  formattedMonth.disableRightArrow = isMonthDisabled(shiftDate(formattedMonth.month, {
    month: 1
  }), options.minDate, options.maxDate);
  return formattedMonth;
}
function isDateInRange(date, selectedRange, hoveredDate) {
  if (!date || !selectedRange || !selectedRange[0]) {
    return false;
  }
  if (selectedRange[1]) {
    return date > selectedRange[0] && date <= selectedRange[1];
  }
  if (hoveredDate) {
    return date > selectedRange[0] && date <= hoveredDate;
  }
  return false;
}
function canSwitchMode(mode, minMode) {
  return minMode ? mode >= minMode : true;
}
var height$1 = 4;
var width$1 = 3;
var shift$1 = {
  month: 1
};
function formatMonthsCalendar(viewDate, formatOptions) {
  const initialDate = startOf(viewDate, "year");
  const matrixOptions = {
    width: width$1,
    height: height$1,
    initialDate,
    shift: shift$1
  };
  const monthMatrix = createMatrix(matrixOptions, (date) => ({
    date,
    label: formatDate(date, formatOptions.monthLabel, formatOptions.locale)
  }));
  return {
    months: monthMatrix,
    monthTitle: "",
    yearTitle: formatDate(viewDate, formatOptions.yearTitle, formatOptions.locale),
    hideRightArrow: false,
    hideLeftArrow: false,
    disableRightArrow: false,
    disableLeftArrow: false
  };
}
function flagMonthsCalendar(monthCalendar, options) {
  monthCalendar.months.forEach((months, rowIndex) => {
    months.forEach((month, monthIndex) => {
      let isSelected;
      const isHovered = isSameMonth(month.date, options.hoveredMonth);
      const isDisabled = options.isDisabled || isDisabledDate(month.date, options.datesDisabled) || isEnabledDate(month.date, options.datesEnabled, "month") || isMonthDisabled(month.date, options.minDate, options.maxDate);
      if (!options.selectedDate && options.selectedRange) {
        isSelected = isSameMonth(month.date, options.selectedRange[0]);
        if (!isSelected) {
          isSelected = isSameMonth(month.date, options.selectedRange[1]);
        }
      } else {
        isSelected = isSameMonth(month.date, options.selectedDate);
      }
      const newMonth = Object.assign(
        /*{},*/
        month,
        {
          isHovered,
          isDisabled,
          isSelected
        }
      );
      if (month.isHovered !== newMonth.isHovered || month.isDisabled !== newMonth.isDisabled || month.isSelected !== newMonth.isSelected) {
        monthCalendar.months[rowIndex][monthIndex] = newMonth;
      }
    });
  });
  monthCalendar.hideLeftArrow = !!options.monthIndex && options.monthIndex > 0 && options.monthIndex !== options.displayMonths;
  monthCalendar.hideRightArrow = (!!options.monthIndex || options.monthIndex === 0) && (!!options.displayMonths || options.displayMonths === 0) && options.monthIndex < options.displayMonths && options.monthIndex + 1 !== options.displayMonths;
  monthCalendar.disableLeftArrow = isYearDisabled(shiftDate(monthCalendar.months[0][0].date, {
    year: -1
  }), options.minDate, options.maxDate);
  monthCalendar.disableRightArrow = isYearDisabled(shiftDate(monthCalendar.months[0][0].date, {
    year: 1
  }), options.minDate, options.maxDate);
  return monthCalendar;
}
var height = 4;
var width = 4;
var yearsPerCalendar = height * width;
var initialYearShift = (Math.floor(yearsPerCalendar / 2) - 1) * -1;
var shift = {
  year: 1
};
function formatYearsCalendar(viewDate, formatOptions, previousInitialDate) {
  const initialDate = calculateInitialDate(viewDate, previousInitialDate);
  const matrixOptions = {
    width,
    height,
    initialDate,
    shift
  };
  const yearsMatrix = createMatrix(matrixOptions, (date) => ({
    date,
    label: formatDate(date, formatOptions.yearLabel, formatOptions.locale)
  }));
  const yearTitle = formatYearRangeTitle(yearsMatrix, formatOptions);
  return {
    years: yearsMatrix,
    monthTitle: "",
    yearTitle,
    hideLeftArrow: false,
    hideRightArrow: false,
    disableLeftArrow: false,
    disableRightArrow: false
  };
}
function calculateInitialDate(viewDate, previousInitialDate) {
  if (previousInitialDate && viewDate.getFullYear() >= previousInitialDate.getFullYear() && viewDate.getFullYear() < previousInitialDate.getFullYear() + yearsPerCalendar) {
    return previousInitialDate;
  }
  return shiftDate(viewDate, {
    year: initialYearShift
  });
}
function formatYearRangeTitle(yearsMatrix, formatOptions) {
  const from = formatDate(yearsMatrix[0][0].date, formatOptions.yearTitle, formatOptions.locale);
  const to = formatDate(yearsMatrix[height - 1][width - 1].date, formatOptions.yearTitle, formatOptions.locale);
  return `${from} - ${to}`;
}
function flagYearsCalendar(yearsCalendar, options) {
  yearsCalendar.years.forEach((years, rowIndex) => {
    years.forEach((year, yearIndex) => {
      let isSelected;
      const isHovered = isSameYear(year.date, options.hoveredYear);
      const isDisabled = options.isDisabled || isDisabledDate(year.date, options.datesDisabled, "year") || isEnabledDate(year.date, options.datesEnabled, "year") || isYearDisabled(year.date, options.minDate, options.maxDate);
      if (!options.selectedDate && options.selectedRange) {
        isSelected = isSameYear(year.date, options.selectedRange[0]);
        if (!isSelected) {
          isSelected = isSameYear(year.date, options.selectedRange[1]);
        }
      } else {
        isSelected = isSameYear(year.date, options.selectedDate);
      }
      const newMonth = Object.assign(
        /*{},*/
        year,
        {
          isHovered,
          isDisabled,
          isSelected
        }
      );
      if (year.isHovered !== newMonth.isHovered || year.isDisabled !== newMonth.isDisabled || year.isSelected !== newMonth.isSelected) {
        yearsCalendar.years[rowIndex][yearIndex] = newMonth;
      }
    });
  });
  yearsCalendar.hideLeftArrow = !!options.yearIndex && options.yearIndex > 0 && options.yearIndex !== options.displayMonths;
  yearsCalendar.hideRightArrow = !!options.yearIndex && !!options.displayMonths && options.yearIndex < options.displayMonths && options.yearIndex + 1 !== options.displayMonths;
  yearsCalendar.disableLeftArrow = isYearDisabled(shiftDate(yearsCalendar.years[0][0].date, {
    year: -1
  }), options.minDate, options.maxDate);
  const i = yearsCalendar.years.length - 1;
  const j = yearsCalendar.years[i].length - 1;
  yearsCalendar.disableRightArrow = isYearDisabled(shiftDate(yearsCalendar.years[i][j].date, {
    year: 1
  }), options.minDate, options.maxDate);
  return yearsCalendar;
}
function copyTime(sourceDate, time) {
  if (!sourceDate || !isNaN(sourceDate.getTime())) {
    return;
  }
  sourceDate.setHours(time.getHours());
  sourceDate.setMinutes(time.getMinutes());
  sourceDate.setSeconds(time.getSeconds());
  sourceDate.setMilliseconds(time.getMilliseconds());
}
function bsDatepickerReducer(state2 = initialDatepickerState, action) {
  switch (action.type) {
    case BsDatepickerActions.CALCULATE: {
      return calculateReducer(state2);
    }
    case BsDatepickerActions.FORMAT: {
      return formatReducer(state2);
    }
    case BsDatepickerActions.FLAG: {
      return flagReducer(state2);
    }
    case BsDatepickerActions.NAVIGATE_OFFSET: {
      return navigateOffsetReducer(state2, action);
    }
    case BsDatepickerActions.NAVIGATE_TO: {
      const payload = action.payload;
      if (!state2.view || !payload.unit) {
        return state2;
      }
      const date = setFullDate(state2.view.date, payload.unit);
      let newState;
      let mode;
      if (canSwitchMode(payload.viewMode, state2.minMode)) {
        mode = payload.viewMode;
        newState = {
          view: {
            date,
            mode
          }
        };
      } else {
        mode = state2.view.mode;
        newState = {
          selectedDate: date,
          view: {
            date,
            mode
          }
        };
      }
      return Object.assign({}, state2, newState);
    }
    case BsDatepickerActions.CHANGE_VIEWMODE: {
      if (!canSwitchMode(action.payload, state2.minMode) || !state2.view) {
        return state2;
      }
      const date = state2.view.date;
      const mode = action.payload;
      const newState = {
        view: {
          date,
          mode
        }
      };
      return Object.assign({}, state2, newState);
    }
    case BsDatepickerActions.HOVER: {
      return Object.assign({}, state2, {
        hoveredDate: action.payload
      });
    }
    case BsDatepickerActions.SELECT: {
      if (!state2.view) {
        return state2;
      }
      const newState = {
        selectedDate: action.payload,
        view: state2.view
      };
      if (Array.isArray(state2.selectedTime)) {
        const _time = state2.selectedTime[0];
        if (newState.selectedDate && _time) {
          copyTime(newState.selectedDate, _time);
        }
      }
      const mode = state2.view.mode;
      const _date = action.payload || state2.view.date;
      const date = getViewDate(_date, state2.minDate, state2.maxDate);
      newState.view = {
        mode,
        date
      };
      return Object.assign({}, state2, newState);
    }
    case BsDatepickerActions.SELECT_TIME: {
      const {
        date,
        index
      } = action.payload;
      const selectedTime = state2.selectedTime ? [...state2.selectedTime] : [];
      selectedTime[index] = date;
      return Object.assign({}, state2, {
        selectedTime
      });
    }
    case BsDatepickerActions.SET_OPTIONS: {
      if (!state2.view) {
        return state2;
      }
      const newState = action.payload;
      const mode = newState.minMode ? newState.minMode : state2.view.mode;
      const _viewDate = isDateValid(newState.value) && newState.value || isArray(newState.value) && isDateValid(newState.value[0]) && newState.value[0] || state2.view.date;
      const date = getViewDate(_viewDate, newState.minDate, newState.maxDate);
      newState.view = {
        mode,
        date
      };
      if (newState.value) {
        if (isArray(newState.value)) {
          newState.selectedRange = newState.value;
          newState.selectedTime = newState.value.map((i) => i);
        }
        if (newState.value instanceof Date) {
          newState.selectedDate = newState.value;
          newState.selectedTime = [newState.value];
        }
      }
      return Object.assign({}, state2, newState);
    }
    // date range picker
    case BsDatepickerActions.SELECT_RANGE: {
      if (!state2.view) {
        return state2;
      }
      const newState = {
        selectedRange: action.payload,
        view: state2.view
      };
      newState.selectedRange?.forEach((dte, index) => {
        if (Array.isArray(state2.selectedTime)) {
          const _time = state2.selectedTime[index];
          if (_time) {
            copyTime(dte, _time);
          }
        }
      });
      const mode = state2.view.mode;
      const _date = action.payload && action.payload[0] || state2.view.date;
      const date = getViewDate(_date, state2.minDate, state2.maxDate);
      newState.view = {
        mode,
        date
      };
      return Object.assign({}, state2, newState);
    }
    case BsDatepickerActions.SET_MIN_DATE: {
      return Object.assign({}, state2, {
        minDate: action.payload
      });
    }
    case BsDatepickerActions.SET_MAX_DATE: {
      return Object.assign({}, state2, {
        maxDate: action.payload
      });
    }
    case BsDatepickerActions.SET_IS_DISABLED: {
      return Object.assign({}, state2, {
        isDisabled: action.payload
      });
    }
    case BsDatepickerActions.SET_DATE_CUSTOM_CLASSES: {
      return Object.assign({}, state2, {
        dateCustomClasses: action.payload
      });
    }
    case BsDatepickerActions.SET_DATE_TOOLTIP_TEXTS: {
      return Object.assign({}, state2, {
        dateTooltipTexts: action.payload
      });
    }
    default:
      return state2;
  }
}
function calculateReducer(state2) {
  if (!state2.view) {
    return state2;
  }
  let displayMonths;
  if (state2.displayOneMonthRange && isDisplayOneMonth(state2.view.date, state2.minDate, state2.maxDate)) {
    displayMonths = 1;
  } else {
    displayMonths = state2.displayMonths || 1;
  }
  let viewDate = state2.view.date;
  if (state2.view.mode === "day" && state2.monthViewOptions) {
    if (state2.showPreviousMonth && state2.selectedRange && state2.selectedRange.length === 0) {
      viewDate = shiftDate(viewDate, {
        month: -1
      });
    }
    state2.monthViewOptions.firstDayOfWeek = getLocale(state2.locale).firstDayOfWeek();
    let monthsModel = new Array(displayMonths);
    for (let monthIndex = 0; monthIndex < displayMonths; monthIndex++) {
      monthsModel[monthIndex] = calcDaysCalendar(viewDate, state2.monthViewOptions);
      viewDate = shiftDate(viewDate, {
        month: 1
      });
    }
    if (state2.preventChangeToNextMonth && state2.flaggedMonths && state2.hoveredDate) {
      const viewMonth = calcDaysCalendar(state2.view.date, state2.monthViewOptions);
      if (state2.flaggedMonths.length && state2.flaggedMonths[1].month.getMonth() === viewMonth.month.getMonth()) {
        monthsModel = state2.flaggedMonths.map((item) => {
          if (state2.monthViewOptions) {
            return calcDaysCalendar(item.month, state2.monthViewOptions);
          }
          return null;
        }).filter((item) => item !== null);
      }
    }
    return Object.assign({}, state2, {
      monthsModel
    });
  }
  if (state2.view.mode === "month") {
    const monthsCalendar = new Array(displayMonths);
    for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
      monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, getFormatOptions(state2));
      viewDate = shiftDate(viewDate, {
        year: 1
      });
    }
    return Object.assign({}, state2, {
      monthsCalendar
    });
  }
  if (state2.view.mode === "year") {
    const yearsCalendarModel = new Array(displayMonths);
    for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
      yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, getFormatOptions(state2), state2.minMode === "year" ? getYearsCalendarInitialDate(state2, calendarIndex) : void 0);
      viewDate = shiftDate(viewDate, {
        year: yearsPerCalendar
      });
    }
    return Object.assign({}, state2, {
      yearsCalendarModel
    });
  }
  return state2;
}
function formatReducer(state2) {
  if (!state2.view) {
    return state2;
  }
  if (state2.view.mode === "day" && state2.monthsModel) {
    const formattedMonths = state2.monthsModel.map((month, monthIndex) => formatDaysCalendar(month, getFormatOptions(state2), monthIndex));
    return Object.assign({}, state2, {
      formattedMonths
    });
  }
  const displayMonths = state2.displayMonths || 1;
  let viewDate = state2.view.date;
  if (state2.view.mode === "month") {
    const monthsCalendar = new Array(displayMonths);
    for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
      monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, getFormatOptions(state2));
      viewDate = shiftDate(viewDate, {
        year: 1
      });
    }
    return Object.assign({}, state2, {
      monthsCalendar
    });
  }
  if (state2.view.mode === "year") {
    const yearsCalendarModel = new Array(displayMonths);
    for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
      yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, getFormatOptions(state2));
      viewDate = shiftDate(viewDate, {
        year: 16
      });
    }
    return Object.assign({}, state2, {
      yearsCalendarModel
    });
  }
  return state2;
}
function flagReducer(state2) {
  if (!state2.view) {
    return state2;
  }
  const displayMonths = isDisplayOneMonth(state2.view.date, state2.minDate, state2.maxDate) ? 1 : state2.displayMonths;
  if (state2.formattedMonths && state2.view.mode === "day") {
    const flaggedMonths = state2.formattedMonths.map((formattedMonth, monthIndex) => flagDaysCalendar(formattedMonth, {
      isDisabled: state2.isDisabled,
      minDate: state2.minDate,
      maxDate: state2.maxDate,
      daysDisabled: state2.daysDisabled,
      datesDisabled: state2.datesDisabled,
      datesEnabled: state2.datesEnabled,
      hoveredDate: state2.hoveredDate,
      selectedDate: state2.selectedDate,
      selectedRange: state2.selectedRange,
      displayMonths,
      dateCustomClasses: state2.dateCustomClasses,
      dateTooltipTexts: state2.dateTooltipTexts,
      monthIndex
    }));
    return Object.assign({}, state2, {
      flaggedMonths
    });
  }
  if (state2.view.mode === "month" && state2.monthsCalendar) {
    const flaggedMonthsCalendar = state2.monthsCalendar.map((formattedMonth, monthIndex) => flagMonthsCalendar(formattedMonth, {
      isDisabled: state2.isDisabled,
      minDate: state2.minDate,
      maxDate: state2.maxDate,
      hoveredMonth: state2.hoveredMonth,
      selectedDate: state2.selectedDate,
      datesDisabled: state2.datesDisabled,
      datesEnabled: state2.datesEnabled,
      selectedRange: state2.selectedRange,
      displayMonths,
      monthIndex
    }));
    return Object.assign({}, state2, {
      flaggedMonthsCalendar
    });
  }
  if (state2.view.mode === "year" && state2.yearsCalendarModel) {
    const yearsCalendarFlagged = state2.yearsCalendarModel.map((formattedMonth, yearIndex) => flagYearsCalendar(formattedMonth, {
      isDisabled: state2.isDisabled,
      minDate: state2.minDate,
      maxDate: state2.maxDate,
      hoveredYear: state2.hoveredYear,
      selectedDate: state2.selectedDate,
      datesDisabled: state2.datesDisabled,
      datesEnabled: state2.datesEnabled,
      selectedRange: state2.selectedRange,
      displayMonths,
      yearIndex
    }));
    return Object.assign({}, state2, {
      yearsCalendarFlagged
    });
  }
  return state2;
}
function navigateOffsetReducer(state2, action) {
  if (!state2.view) {
    return state2;
  }
  const date = shiftViewDate(state2, action);
  if (!date) {
    return state2;
  }
  const newState = {
    view: {
      mode: state2.view.mode,
      date
    }
  };
  return Object.assign({}, state2, newState);
}
function shiftViewDate(state2, action) {
  if (!state2.view) {
    return void 0;
  }
  if (state2.view.mode === "year" && state2.minMode === "year") {
    const initialDate = getYearsCalendarInitialDate(state2, 0);
    if (initialDate) {
      const middleDate = shiftDate(initialDate, {
        year: -initialYearShift
      });
      return shiftDate(middleDate, action.payload);
    }
  }
  return shiftDate(startOf(state2.view.date, "month"), action.payload);
}
function getFormatOptions(state2) {
  return {
    locale: state2.locale,
    monthTitle: state2.monthTitle,
    yearTitle: state2.yearTitle,
    dayLabel: state2.dayLabel,
    monthLabel: state2.monthLabel,
    yearLabel: state2.yearLabel,
    weekNumbers: state2.weekNumbers
  };
}
function getViewDate(viewDate, minDate, maxDate) {
  const _date = Array.isArray(viewDate) ? viewDate[0] : viewDate;
  if (minDate && isAfter(minDate, _date, "day")) {
    return minDate;
  }
  if (maxDate && isBefore(maxDate, _date, "day")) {
    return maxDate;
  }
  return _date;
}
function isDisplayOneMonth(viewDate, minDate, maxDate) {
  if (maxDate && isSame(maxDate, viewDate, "day")) {
    return true;
  }
  return minDate && maxDate && minDate.getMonth() === maxDate.getMonth();
}
var BsDatepickerStore = class _BsDatepickerStore extends MiniStore {
  constructor() {
    const _dispatcher = new BehaviorSubject({
      type: "[datepicker] dispatcher init"
    });
    const state2 = new MiniState(initialDatepickerState, _dispatcher, bsDatepickerReducer);
    super(_dispatcher, bsDatepickerReducer, state2);
  }
  static {
    this.ɵfac = function BsDatepickerStore_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerStore)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BsDatepickerStore,
      factory: _BsDatepickerStore.ɵfac,
      providedIn: "platform"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerStore, [{
    type: Injectable,
    args: [{
      providedIn: "platform"
    }]
  }], () => [], null);
})();
var BsCustomDatesViewComponent = class _BsCustomDatesViewComponent {
  constructor() {
    this.onSelect = new EventEmitter();
  }
  selectFromRanges(range) {
    this.onSelect.emit(range);
  }
  compareRanges(range) {
    return JSON.stringify(range?.value) === JSON.stringify(this.selectedRange);
  }
  static {
    this.ɵfac = function BsCustomDatesViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsCustomDatesViewComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsCustomDatesViewComponent,
      selectors: [["bs-custom-date-view"]],
      inputs: {
        ranges: "ranges",
        selectedRange: "selectedRange",
        customRangeLabel: "customRangeLabel"
      },
      outputs: {
        onSelect: "onSelect"
      },
      decls: 2,
      vars: 1,
      consts: [[1, "bs-datepicker-predefined-btns"], ["type", "button", "class", "btn", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", 3, "click"]],
      template: function BsCustomDatesViewComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵtemplate(1, BsCustomDatesViewComponent_button_1_Template, 2, 3, "button", 1);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵproperty("ngForOf", ctx.ranges);
        }
      },
      dependencies: [NgForOf],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsCustomDatesViewComponent, [{
    type: Component,
    args: [{
      selector: "bs-custom-date-view",
      template: `
    <div class="bs-datepicker-predefined-btns">
      <button *ngFor="let range of ranges"
        type="button"
        class="btn"
        (click)="selectFromRanges(range)"
        [class.selected]="compareRanges(range)">
        {{ range.label }}
      </button>
    </div>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgForOf]
    }]
  }], null, {
    ranges: [{
      type: Input
    }],
    selectedRange: [{
      type: Input
    }],
    customRangeLabel: [{
      type: Input
    }],
    onSelect: [{
      type: Output
    }]
  });
})();
var BsNavigationDirection;
(function(BsNavigationDirection2) {
  BsNavigationDirection2[BsNavigationDirection2["UP"] = 0] = "UP";
  BsNavigationDirection2[BsNavigationDirection2["DOWN"] = 1] = "DOWN";
})(BsNavigationDirection || (BsNavigationDirection = {}));
var BsDatepickerNavigationViewComponent = class _BsDatepickerNavigationViewComponent {
  constructor() {
    this.isDisabled = false;
    this.onNavigate = new EventEmitter();
    this.onViewMode = new EventEmitter();
  }
  navTo(down) {
    this.onNavigate.emit(down ? BsNavigationDirection.DOWN : BsNavigationDirection.UP);
  }
  view(viewMode) {
    if (this.isDisabled) {
      return;
    }
    this.onViewMode.emit(viewMode);
  }
  static {
    this.ɵfac = function BsDatepickerNavigationViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerNavigationViewComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsDatepickerNavigationViewComponent,
      selectors: [["bs-datepicker-navigation-view"]],
      inputs: {
        calendar: "calendar",
        isDisabled: "isDisabled"
      },
      outputs: {
        onNavigate: "onNavigate",
        onViewMode: "onViewMode"
      },
      decls: 12,
      vars: 9,
      consts: [["type", "button", 1, "previous", 3, "click", "disabled"], [4, "ngIf"], ["type", "button", 1, "current", 3, "click", "disabled"], ["type", "button", 1, "next", 3, "click", "disabled"]],
      template: function BsDatepickerNavigationViewComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "button", 0);
          ɵɵlistener("click", function BsDatepickerNavigationViewComponent_Template_button_click_0_listener() {
            return ctx.navTo(true);
          });
          ɵɵelementStart(1, "span");
          ɵɵtext(2, "‹");
          ɵɵelementEnd()();
          ɵɵtemplate(3, BsDatepickerNavigationViewComponent_ng_container_3_Template, 5, 2, "ng-container", 1);
          ɵɵtext(4, " ​ ");
          ɵɵelementStart(5, "button", 2);
          ɵɵlistener("click", function BsDatepickerNavigationViewComponent_Template_button_click_5_listener() {
            return ctx.view("year");
          });
          ɵɵelementStart(6, "span");
          ɵɵtext(7);
          ɵɵelementEnd()();
          ɵɵtext(8, " ​ ");
          ɵɵelementStart(9, "button", 3);
          ɵɵlistener("click", function BsDatepickerNavigationViewComponent_Template_button_click_9_listener() {
            return ctx.navTo(false);
          });
          ɵɵelementStart(10, "span");
          ɵɵtext(11, "›");
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          ɵɵstyleProp("visibility", ctx.calendar.hideLeftArrow ? "hidden" : "visible");
          ɵɵproperty("disabled", ctx.calendar.disableLeftArrow);
          ɵɵadvance(3);
          ɵɵproperty("ngIf", ctx.calendar && ctx.calendar.monthTitle);
          ɵɵadvance(2);
          ɵɵproperty("disabled", ctx.isDisabled);
          ɵɵadvance(2);
          ɵɵtextInterpolate(ctx.calendar.yearTitle);
          ɵɵadvance(2);
          ɵɵstyleProp("visibility", ctx.calendar.hideRightArrow ? "hidden" : "visible");
          ɵɵproperty("disabled", ctx.calendar.disableRightArrow);
        }
      },
      dependencies: [NgIf],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerNavigationViewComponent, [{
    type: Component,
    args: [{
      selector: "bs-datepicker-navigation-view",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <button class="previous"
            [disabled]="calendar.disableLeftArrow"
            [style.visibility]="calendar.hideLeftArrow ? 'hidden' : 'visible'"
            type="button"
            (click)="navTo(true)">
      <span>&lsaquo;</span>
    </button>

    <ng-container *ngIf="calendar && calendar.monthTitle">
      &#8203;  <!-- zero-width space needed for correct alignment
                  with preserveWhitespaces: false in Angular -->

      <button class="current"
            type="button"
              (click)="view('month')"
              [disabled]="isDisabled"
      ><span>{{ calendar.monthTitle }}</span>
      </button>
    </ng-container>

    &#8203;  <!-- zero-width space needed for correct alignment
                  with preserveWhitespaces: false in Angular -->

    <button
      class="current"
      (click)="view('year')"
      type="button"
      [disabled]="isDisabled"
    >
      <span>{{ calendar.yearTitle }}</span>
    </button>

    &#8203;  <!-- zero-width space needed for correct alignment
                  with preserveWhitespaces: false in Angular -->

    <button class="next"
            [disabled]="calendar.disableRightArrow"
            [style.visibility]="calendar.hideRightArrow ? 'hidden' : 'visible'"
            type="button"
            (click)="navTo(false)"><span>&rsaquo;</span>
    </button>
  `,
      standalone: true,
      imports: [NgIf]
    }]
  }], null, {
    calendar: [{
      type: Input
    }],
    isDisabled: [{
      type: Input
    }],
    onNavigate: [{
      type: Output
    }],
    onViewMode: [{
      type: Output
    }]
  });
})();
var BsTimepickerViewComponent = class _BsTimepickerViewComponent {
  constructor() {
    this.ampm = "ok";
    this.hours = 0;
    this.minutes = 0;
  }
  static {
    this.ɵfac = function BsTimepickerViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsTimepickerViewComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsTimepickerViewComponent,
      selectors: [["bs-timepicker"]],
      decls: 16,
      vars: 3,
      consts: [[1, "bs-timepicker-container"], [1, "bs-timepicker-controls"], ["type", "button", 1, "bs-decrease"], ["type", "text", "placeholder", "00", 3, "value"], ["type", "button", 1, "bs-increase"], ["type", "button", 1, "switch-time-format"], ["src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAABSElEQVQYV3XQPUvDUBQG4HNuagtVqc6KgouCv6GIuIntYBLB9hcIQpLStCAIV7DYmpTcRWcXqZio3Vwc/UCc/QEqfgyKGbr0I7nS1EiHeqYzPO/h5SD0jaxUZjmSLCB+OFb+UFINFwASAEAdpu9gaGXVyAHHFQBkHpKHc6a9dzECvADyY9sqlAMsK9W0jzxDXqeytr3mhQckxSji27TJJ5/rPmIpwJJq3HrtduriYOurv1a4i1p5HnhkG9OFymi0ReoO05cGwb+ayv4dysVygjeFmsP05f8wpZQ8fsdvfmuY9zjWSNqUtgYFVnOVReILYoBFzdQI5/GGFzNHhGbeZnopDGU29sZbscgldmC99w35VOATTycIMMcBXIfpSVGzZhA6C8hh00conln6VQ9TGgV32OEAKQC4DrBq7CJwd0ggR7Vq/rPrfgB+C3sGypY5DAAAAABJRU5ErkJggg==", "alt", ""]],
      template: function BsTimepickerViewComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
          ɵɵtext(3, "-");
          ɵɵelementEnd();
          ɵɵelement(4, "input", 3);
          ɵɵelementStart(5, "button", 4);
          ɵɵtext(6, "+");
          ɵɵelementEnd()();
          ɵɵelementStart(7, "div", 1)(8, "button", 2);
          ɵɵtext(9, "-");
          ɵɵelementEnd();
          ɵɵelement(10, "input", 3);
          ɵɵelementStart(11, "button", 4);
          ɵɵtext(12, "+");
          ɵɵelementEnd()();
          ɵɵelementStart(13, "button", 5);
          ɵɵtext(14);
          ɵɵelement(15, "img", 6);
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          ɵɵadvance(4);
          ɵɵproperty("value", ctx.hours);
          ɵɵadvance(6);
          ɵɵproperty("value", ctx.minutes);
          ɵɵadvance(4);
          ɵɵtextInterpolate1("", ctx.ampm, " ");
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsTimepickerViewComponent, [{
    type: Component,
    args: [{
      selector: "bs-timepicker",
      template: `
    <div class="bs-timepicker-container">
      <div class="bs-timepicker-controls">
        <button class="bs-decrease" type="button">-</button>
        <input type="text" [value]="hours" placeholder="00">
        <button class="bs-increase" type="button">+</button>
      </div>
      <div class="bs-timepicker-controls">
        <button class="bs-decrease" type="button">-</button>
        <input type="text" [value]="minutes" placeholder="00">
        <button class="bs-increase" type="button">+</button>
      </div>
      <button class="switch-time-format" type="button">{{ ampm }}
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAABSElEQVQYV3XQPUvDUBQG4HNuagtVqc6KgouCv6GIuIntYBLB9hcIQpLStCAIV7DYmpTcRWcXqZio3Vwc/UCc/QEqfgyKGbr0I7nS1EiHeqYzPO/h5SD0jaxUZjmSLCB+OFb+UFINFwASAEAdpu9gaGXVyAHHFQBkHpKHc6a9dzECvADyY9sqlAMsK9W0jzxDXqeytr3mhQckxSji27TJJ5/rPmIpwJJq3HrtduriYOurv1a4i1p5HnhkG9OFymi0ReoO05cGwb+ayv4dysVygjeFmsP05f8wpZQ8fsdvfmuY9zjWSNqUtgYFVnOVReILYoBFzdQI5/GGFzNHhGbeZnopDGU29sZbscgldmC99w35VOATTycIMMcBXIfpSVGzZhA6C8hh00conln6VQ9TGgV32OEAKQC4DrBq7CJwd0ggR7Vq/rPrfgB+C3sGypY5DAAAAABJRU5ErkJggg=="
          alt="">
      </button>
    </div>
  `,
      standalone: true
    }]
  }], null, null);
})();
var BsCurrentDateViewComponent = class _BsCurrentDateViewComponent {
  static {
    this.ɵfac = function BsCurrentDateViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsCurrentDateViewComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsCurrentDateViewComponent,
      selectors: [["bs-current-date"]],
      inputs: {
        title: "title"
      },
      decls: 3,
      vars: 1,
      consts: [[1, "current-timedate"]],
      template: function BsCurrentDateViewComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0)(1, "span");
          ɵɵtext(2);
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵtextInterpolate(ctx.title);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsCurrentDateViewComponent, [{
    type: Component,
    args: [{
      selector: "bs-current-date",
      template: `<div class="current-timedate"><span>{{ title }}</span></div>`,
      standalone: true
    }]
  }], null, {
    title: [{
      type: Input
    }]
  });
})();
var BsCalendarLayoutComponent = class _BsCalendarLayoutComponent {
  static {
    this.ɵfac = function BsCalendarLayoutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsCalendarLayoutComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsCalendarLayoutComponent,
      selectors: [["bs-calendar-layout"]],
      ngContentSelectors: _c1,
      decls: 6,
      vars: 2,
      consts: [["title", "hey there", 4, "ngIf"], [1, "bs-datepicker-head"], [1, "bs-datepicker-body"], [4, "ngIf"], ["title", "hey there"]],
      template: function BsCalendarLayoutComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c0);
          ɵɵtemplate(0, BsCalendarLayoutComponent_bs_current_date_0_Template, 1, 0, "bs-current-date", 0);
          ɵɵelementStart(1, "div", 1);
          ɵɵprojection(2);
          ɵɵelementEnd();
          ɵɵelementStart(3, "div", 2);
          ɵɵprojection(4, 1);
          ɵɵelementEnd();
          ɵɵtemplate(5, BsCalendarLayoutComponent_bs_timepicker_5_Template, 1, 0, "bs-timepicker", 3);
        }
        if (rf & 2) {
          ɵɵproperty("ngIf", false);
          ɵɵadvance(5);
          ɵɵproperty("ngIf", false);
        }
      },
      dependencies: [NgIf, BsCurrentDateViewComponent, BsTimepickerViewComponent],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsCalendarLayoutComponent, [{
    type: Component,
    args: [{
      selector: "bs-calendar-layout",
      template: `
    <!-- current date, will be added in nearest releases -->
    <bs-current-date title="hey there" *ngIf="false"></bs-current-date>

    <!--navigation-->
    <div class="bs-datepicker-head">
      <ng-content select="bs-datepicker-navigation-view"></ng-content>
    </div>

    <div class="bs-datepicker-body">
      <ng-content></ng-content>
    </div>

    <!--timepicker-->
    <bs-timepicker *ngIf="false"></bs-timepicker>
  `,
      standalone: true,
      imports: [NgIf, BsCurrentDateViewComponent, BsTimepickerViewComponent]
    }]
  }], null, null);
})();
var BsYearsCalendarViewComponent = class _BsYearsCalendarViewComponent {
  constructor() {
    this.onNavigate = new EventEmitter();
    this.onViewMode = new EventEmitter();
    this.onSelect = new EventEmitter();
    this.onHover = new EventEmitter();
  }
  navigateTo(event) {
    const step = BsNavigationDirection.DOWN === event ? -1 : 1;
    this.onNavigate.emit({
      step: {
        year: step * yearsPerCalendar
      }
    });
  }
  viewYear(year) {
    this.onSelect.emit(year);
  }
  hoverYear(cell, isHovered) {
    this.onHover.emit({
      cell,
      isHovered
    });
  }
  changeViewMode(event) {
    this.onViewMode.emit(event);
  }
  static {
    this.ɵfac = function BsYearsCalendarViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsYearsCalendarViewComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsYearsCalendarViewComponent,
      selectors: [["bs-years-calendar-view"]],
      inputs: {
        calendar: "calendar"
      },
      outputs: {
        onNavigate: "onNavigate",
        onViewMode: "onViewMode",
        onSelect: "onSelect",
        onHover: "onHover"
      },
      decls: 5,
      vars: 2,
      consts: [[3, "onNavigate", "onViewMode", "calendar"], ["role", "grid", 1, "years"], [4, "ngFor", "ngForOf"], ["role", "gridcell", 3, "disabled", "is-highlighted", "click", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"], ["role", "gridcell", 3, "click", "mouseenter", "mouseleave"]],
      template: function BsYearsCalendarViewComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "bs-calendar-layout")(1, "bs-datepicker-navigation-view", 0);
          ɵɵlistener("onNavigate", function BsYearsCalendarViewComponent_Template_bs_datepicker_navigation_view_onNavigate_1_listener($event) {
            return ctx.navigateTo($event);
          })("onViewMode", function BsYearsCalendarViewComponent_Template_bs_datepicker_navigation_view_onViewMode_1_listener($event) {
            return ctx.changeViewMode($event);
          });
          ɵɵelementEnd();
          ɵɵelementStart(2, "table", 1)(3, "tbody");
          ɵɵtemplate(4, BsYearsCalendarViewComponent_tr_4_Template, 2, 1, "tr", 2);
          ɵɵelementEnd()()();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵproperty("calendar", ctx.calendar);
          ɵɵadvance(3);
          ɵɵproperty("ngForOf", ctx.calendar == null ? null : ctx.calendar.years);
        }
      },
      dependencies: [BsCalendarLayoutComponent, BsDatepickerNavigationViewComponent, NgForOf],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsYearsCalendarViewComponent, [{
    type: Component,
    args: [{
      selector: "bs-years-calendar-view",
      template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>

      <table role="grid" class="years">
        <tbody>
        <tr *ngFor="let row of calendar?.years">
          <td *ngFor="let year of row" role="gridcell"
              (click)="viewYear(year)"
              (mouseenter)="hoverYear(year, true)"
              (mouseleave)="hoverYear(year, false)"
              [class.disabled]="year.isDisabled"
              [class.is-highlighted]="year.isHovered">
            <span [class.selected]="year.isSelected">{{ year.label }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </bs-calendar-layout>
  `,
      standalone: true,
      imports: [BsCalendarLayoutComponent, BsDatepickerNavigationViewComponent, NgForOf]
    }]
  }], null, {
    calendar: [{
      type: Input
    }],
    onNavigate: [{
      type: Output
    }],
    onViewMode: [{
      type: Output
    }],
    onSelect: [{
      type: Output
    }],
    onHover: [{
      type: Output
    }]
  });
})();
var BsMonthCalendarViewComponent = class _BsMonthCalendarViewComponent {
  constructor() {
    this.onNavigate = new EventEmitter();
    this.onViewMode = new EventEmitter();
    this.onSelect = new EventEmitter();
    this.onHover = new EventEmitter();
  }
  navigateTo(event) {
    const step = BsNavigationDirection.DOWN === event ? -1 : 1;
    this.onNavigate.emit({
      step: {
        year: step
      }
    });
  }
  viewMonth(month) {
    this.onSelect.emit(month);
  }
  hoverMonth(cell, isHovered) {
    this.onHover.emit({
      cell,
      isHovered
    });
  }
  changeViewMode(event) {
    this.onViewMode.emit(event);
  }
  static {
    this.ɵfac = function BsMonthCalendarViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsMonthCalendarViewComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsMonthCalendarViewComponent,
      selectors: [["bs-month-calendar-view"]],
      inputs: {
        calendar: "calendar"
      },
      outputs: {
        onNavigate: "onNavigate",
        onViewMode: "onViewMode",
        onSelect: "onSelect",
        onHover: "onHover"
      },
      decls: 5,
      vars: 2,
      consts: [[3, "onNavigate", "onViewMode", "calendar"], ["role", "grid", 1, "months"], [4, "ngFor", "ngForOf"], ["role", "gridcell", 3, "disabled", "is-highlighted", "click", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"], ["role", "gridcell", 3, "click", "mouseenter", "mouseleave"]],
      template: function BsMonthCalendarViewComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "bs-calendar-layout")(1, "bs-datepicker-navigation-view", 0);
          ɵɵlistener("onNavigate", function BsMonthCalendarViewComponent_Template_bs_datepicker_navigation_view_onNavigate_1_listener($event) {
            return ctx.navigateTo($event);
          })("onViewMode", function BsMonthCalendarViewComponent_Template_bs_datepicker_navigation_view_onViewMode_1_listener($event) {
            return ctx.changeViewMode($event);
          });
          ɵɵelementEnd();
          ɵɵelementStart(2, "table", 1)(3, "tbody");
          ɵɵtemplate(4, BsMonthCalendarViewComponent_tr_4_Template, 2, 1, "tr", 2);
          ɵɵelementEnd()()();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵproperty("calendar", ctx.calendar);
          ɵɵadvance(3);
          ɵɵproperty("ngForOf", ctx.calendar == null ? null : ctx.calendar.months);
        }
      },
      dependencies: [BsCalendarLayoutComponent, BsDatepickerNavigationViewComponent, NgForOf],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsMonthCalendarViewComponent, [{
    type: Component,
    args: [{
      selector: "bs-month-calendar-view",
      template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>

      <table role="grid" class="months">
        <tbody>
        <tr *ngFor="let row of calendar?.months">
          <td *ngFor="let month of row" role="gridcell"
              (click)="viewMonth(month)"
              (mouseenter)="hoverMonth(month, true)"
              (mouseleave)="hoverMonth(month, false)"
              [class.disabled]="month.isDisabled"
              [class.is-highlighted]="month.isHovered">
            <span [class.selected]="month.isSelected">{{ month.label }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </bs-calendar-layout>
  `,
      standalone: true,
      imports: [BsCalendarLayoutComponent, BsDatepickerNavigationViewComponent, NgForOf]
    }]
  }], null, {
    calendar: [{
      type: Input
    }],
    onNavigate: [{
      type: Output
    }],
    onViewMode: [{
      type: Output
    }],
    onSelect: [{
      type: Output
    }],
    onHover: [{
      type: Output
    }]
  });
})();
var BsDatepickerDayDecoratorComponent = class _BsDatepickerDayDecoratorComponent {
  constructor(_config, _elRef, _renderer) {
    this._config = _config;
    this._elRef = _elRef;
    this._renderer = _renderer;
    this.day = {
      date: /* @__PURE__ */ new Date(),
      label: ""
    };
  }
  ngOnInit() {
    if (this.day?.isToday && this._config && this._config.customTodayClass) {
      this._renderer.addClass(this._elRef.nativeElement, this._config.customTodayClass);
    }
    if (typeof this.day?.customClasses === "string") {
      this.day?.customClasses.split(" ").filter((className) => className).forEach((className) => {
        this._renderer.addClass(this._elRef.nativeElement, className);
      });
    }
  }
  static {
    this.ɵfac = function BsDatepickerDayDecoratorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerDayDecoratorComponent)(ɵɵdirectiveInject(BsDatepickerConfig), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsDatepickerDayDecoratorComponent,
      selectors: [["", "bsDatepickerDayDecorator", ""]],
      hostVars: 16,
      hostBindings: function BsDatepickerDayDecoratorComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("disabled", ctx.day.isDisabled)("is-highlighted", ctx.day.isHovered)("is-other-month", ctx.day.isOtherMonth)("is-active-other-month", ctx.day.isOtherMonthHovered)("in-range", ctx.day.isInRange)("select-start", ctx.day.isSelectionStart)("select-end", ctx.day.isSelectionEnd)("selected", ctx.day.isSelected);
        }
      },
      inputs: {
        day: "day"
      },
      attrs: _c2,
      decls: 1,
      vars: 1,
      template: function BsDatepickerDayDecoratorComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtext(0);
        }
        if (rf & 2) {
          ɵɵtextInterpolate(ctx.day && ctx.day.label || "");
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerDayDecoratorComponent, [{
    type: Component,
    args: [{
      selector: "[bsDatepickerDayDecorator]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class.disabled]": "day.isDisabled",
        "[class.is-highlighted]": "day.isHovered",
        "[class.is-other-month]": "day.isOtherMonth",
        "[class.is-active-other-month]": "day.isOtherMonthHovered",
        "[class.in-range]": "day.isInRange",
        "[class.select-start]": "day.isSelectionStart",
        "[class.select-end]": "day.isSelectionEnd",
        "[class.selected]": "day.isSelected"
      },
      template: `{{ day && day.label || '' }}`,
      standalone: true
    }]
  }], () => [{
    type: BsDatepickerConfig
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    day: [{
      type: Input
    }]
  });
})();
var BsDaysCalendarViewComponent = class _BsDaysCalendarViewComponent {
  constructor(_config) {
    this._config = _config;
    this.onNavigate = new EventEmitter();
    this.onViewMode = new EventEmitter();
    this.onSelect = new EventEmitter();
    this.onHover = new EventEmitter();
    this.onHoverWeek = new EventEmitter();
    this.isiOS = /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    if (this._config.dateTooltipTexts && this._config.dateTooltipTexts.length > 0) {
      this.isShowTooltip = true;
    }
  }
  navigateTo(event) {
    const step = BsNavigationDirection.DOWN === event ? -1 : 1;
    this.onNavigate.emit({
      step: {
        month: step
      }
    });
  }
  changeViewMode(event) {
    this.onViewMode.emit(event);
  }
  selectDay(event) {
    this.onSelect.emit(event);
  }
  selectWeek(week) {
    if (!this._config.selectWeek && !this._config.selectWeekDateRange) {
      return;
    }
    if (week.days.length === 0) {
      return;
    }
    if (this._config.selectWeek && week.days[0] && !week.days[0].isDisabled && this._config.selectFromOtherMonth) {
      this.onSelect.emit(week.days[0]);
      return;
    }
    const selectedDay = week.days.find((day) => {
      return this._config.selectFromOtherMonth ? !day.isDisabled : !day.isOtherMonth && !day.isDisabled;
    });
    this.onSelect.emit(selectedDay);
    if (this._config.selectWeekDateRange) {
      const days = week.days.slice(0);
      const lastDayOfRange = days.reverse().find((day) => {
        return this._config.selectFromOtherMonth ? !day.isDisabled : !day.isOtherMonth && !day.isDisabled;
      });
      this.onSelect.emit(lastDayOfRange);
    }
  }
  weekHoverHandler(cell, isHovered) {
    if (!this._config.selectWeek && !this._config.selectWeekDateRange) {
      return;
    }
    const hasActiveDays = cell.days.find((day) => {
      return this._config.selectFromOtherMonth ? !day.isDisabled : !day.isOtherMonth && !day.isDisabled;
    });
    if (hasActiveDays) {
      cell.isHovered = isHovered;
      this.isWeekHovered = isHovered;
      this.onHoverWeek.emit(cell);
    }
  }
  hoverDay(cell, isHovered) {
    if (this._config.selectFromOtherMonth && cell.isOtherMonth) {
      cell.isOtherMonthHovered = isHovered;
    }
    if (this._config.dateTooltipTexts) {
      cell.tooltipText = "";
      this._config.dateTooltipTexts.forEach((dateData) => {
        if (isSameDay$1(dateData.date, cell.date)) {
          cell.tooltipText = dateData.tooltipText;
          return;
        }
      });
    }
    this.onHover.emit({
      cell,
      isHovered
    });
  }
  static {
    this.ɵfac = function BsDaysCalendarViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDaysCalendarViewComponent)(ɵɵdirectiveInject(BsDatepickerConfig));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsDaysCalendarViewComponent,
      selectors: [["bs-days-calendar-view"]],
      inputs: {
        calendar: "calendar",
        options: "options",
        isDisabled: "isDisabled"
      },
      outputs: {
        onNavigate: "onNavigate",
        onViewMode: "onViewMode",
        onSelect: "onSelect",
        onHover: "onHover",
        onHoverWeek: "onHoverWeek"
      },
      decls: 9,
      vars: 5,
      consts: [[3, "onNavigate", "onViewMode", "calendar", "isDisabled"], ["role", "grid", 1, "days", "weeks"], [4, "ngIf"], ["aria-label", "weekday", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], ["aria-label", "weekday"], ["class", "week", 3, "active-week", 4, "ngIf"], ["role", "gridcell", 4, "ngFor", "ngForOf"], [1, "week"], [3, "click", 4, "ngIf"], [3, "click", "mouseenter", "mouseleave", 4, "ngIf"], [3, "click"], [3, "click", "mouseenter", "mouseleave"], ["role", "gridcell"], ["bsDatepickerDayDecorator", "", 3, "day", "tooltip", "click", "mouseenter", "mouseleave", 4, "ngIf"], ["bsDatepickerDayDecorator", "", 3, "day", "click", "mouseenter", "mouseleave", 4, "ngIf"], ["bsDatepickerDayDecorator", "", 3, "day", "click", 4, "ngIf"], ["bsDatepickerDayDecorator", "", 3, "click", "mouseenter", "mouseleave", "day", "tooltip"], ["bsDatepickerDayDecorator", "", 3, "click", "mouseenter", "mouseleave", "day"], ["bsDatepickerDayDecorator", "", 3, "click", "day"]],
      template: function BsDaysCalendarViewComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "bs-calendar-layout")(1, "bs-datepicker-navigation-view", 0);
          ɵɵlistener("onNavigate", function BsDaysCalendarViewComponent_Template_bs_datepicker_navigation_view_onNavigate_1_listener($event) {
            return ctx.navigateTo($event);
          })("onViewMode", function BsDaysCalendarViewComponent_Template_bs_datepicker_navigation_view_onViewMode_1_listener($event) {
            return ctx.changeViewMode($event);
          });
          ɵɵelementEnd();
          ɵɵelementStart(2, "table", 1)(3, "thead")(4, "tr");
          ɵɵtemplate(5, BsDaysCalendarViewComponent_th_5_Template, 1, 0, "th", 2)(6, BsDaysCalendarViewComponent_th_6_Template, 2, 1, "th", 3);
          ɵɵelementEnd()();
          ɵɵelementStart(7, "tbody");
          ɵɵtemplate(8, BsDaysCalendarViewComponent_tr_8_Template, 3, 2, "tr", 4);
          ɵɵelementEnd()()();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵproperty("calendar", ctx.calendar)("isDisabled", !!ctx.isDisabled);
          ɵɵadvance(4);
          ɵɵproperty("ngIf", ctx.options && ctx.options.showWeekNumbers);
          ɵɵadvance();
          ɵɵproperty("ngForOf", ctx.calendar.weekdays);
          ɵɵadvance(2);
          ɵɵproperty("ngForOf", ctx.calendar.weeks);
        }
      },
      dependencies: [BsCalendarLayoutComponent, BsDatepickerNavigationViewComponent, NgIf, NgForOf, BsDatepickerDayDecoratorComponent, TooltipModule, TooltipDirective],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDaysCalendarViewComponent, [{
    type: Component,
    args: [{
      selector: "bs-days-calendar-view",
      // changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        [isDisabled]="!!isDisabled"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>
      <!--days matrix-->
      <table role="grid" class="days weeks">
        <thead>
        <tr>
          <!--if show weeks-->
          <th *ngIf="options && options.showWeekNumbers"></th>
          <th *ngFor="let weekday of calendar.weekdays; let i = index"
              aria-label="weekday">{{ calendar.weekdays[i] }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let week of calendar.weeks; let i = index">
          <td class="week" [class.active-week]="isWeekHovered"  *ngIf="options && options.showWeekNumbers">
            <span *ngIf="isiOS" (click)="selectWeek(week)">{{ calendar.weekNumbers[i] }}</span>
            <span *ngIf="!isiOS"
                (click)="selectWeek(week)"
                (mouseenter)="weekHoverHandler(week, true)"
                (mouseleave)="weekHoverHandler(week, false)">{{ calendar.weekNumbers[i] }}</span>
          </td>
          <td *ngFor="let day of week.days" role="gridcell">

            <!-- When we want to show tooltips for dates -->
            <span *ngIf="!isiOS && isShowTooltip" bsDatepickerDayDecorator
                [day]="day"
                (click)="selectDay(day)"
                tooltip="{{day.tooltipText}}"
                (mouseenter)="hoverDay(day, true)"
                (mouseleave)="hoverDay(day, false)">{{ day.label }} 3</span>
            <!-- When tooltips for dates are disabled -->
            <span *ngIf="!isiOS && !isShowTooltip" bsDatepickerDayDecorator
                  [day]="day"
                  (click)="selectDay(day)"
                  (mouseenter)="hoverDay(day, true)"
                  (mouseleave)="hoverDay(day, false)">{{ day.label }} 2</span>

            <!-- For mobile iOS view, tooltips are not needed -->
            <span *ngIf="isiOS" bsDatepickerDayDecorator
                  [day]="day"
                  (click)="selectDay(day)">{{ day.label }} 1</span>
          </td>
        </tr>
        </tbody>
      </table>

    </bs-calendar-layout>
  `,
      standalone: true,
      imports: [BsCalendarLayoutComponent, BsDatepickerNavigationViewComponent, NgIf, NgForOf, BsDatepickerDayDecoratorComponent, TooltipModule]
    }]
  }], () => [{
    type: BsDatepickerConfig
  }], {
    calendar: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    isDisabled: [{
      type: Input
    }],
    onNavigate: [{
      type: Output
    }],
    onViewMode: [{
      type: Output
    }],
    onSelect: [{
      type: Output
    }],
    onHover: [{
      type: Output
    }],
    onHoverWeek: [{
      type: Output
    }]
  });
})();
var BsDatepickerContainerComponent = class _BsDatepickerContainerComponent extends BsDatepickerAbstractComponent {
  set value(value) {
    this._effects?.setValue(value);
  }
  get isDatePickerDisabled() {
    return !!this._config.isDisabled;
  }
  get isDatepickerDisabled() {
    return this.isDatePickerDisabled ? "" : null;
  }
  get isDatepickerReadonly() {
    return this.isDatePickerDisabled ? "" : null;
  }
  constructor(_renderer, _config, _store, _element, _actions, _effects, _positionService) {
    super();
    this._config = _config;
    this._store = _store;
    this._element = _element;
    this._actions = _actions;
    this._positionService = _positionService;
    this.valueChange = new EventEmitter();
    this.animationState = "void";
    this.isRangePicker = false;
    this._subs = [];
    this._effects = _effects;
    _renderer.setStyle(_element.nativeElement, "display", "block");
    _renderer.setStyle(_element.nativeElement, "position", "absolute");
  }
  ngOnInit() {
    this._positionService.setOptions({
      modifiers: {
        flip: {
          enabled: this._config.adaptivePosition
        },
        preventOverflow: {
          enabled: this._config.adaptivePosition
        }
      },
      allowedPositions: this._config.allowedPositions
    });
    this._positionService.event$?.pipe(take(1)).subscribe(() => {
      this._positionService.disable();
      if (this._config.isAnimated) {
        this.animationState = this.isTopPosition ? "animated-up" : "animated-down";
        return;
      }
      this.animationState = "unanimated";
    });
    this.isOtherMonthsActive = this._config.selectFromOtherMonth;
    this.containerClass = this._config.containerClass;
    this.showTodayBtn = this._config.showTodayButton;
    this.todayBtnLbl = this._config.todayButtonLabel;
    this.todayPos = this._config.todayPosition;
    this.showClearBtn = this._config.showClearButton;
    this.clearBtnLbl = this._config.clearButtonLabel;
    this.clearPos = this._config.clearPosition;
    this.customRangeBtnLbl = this._config.customRangeButtonLabel;
    this.withTimepicker = this._config.withTimepicker;
    this._effects?.init(this._store).setOptions(this._config).setBindings(this).setEventHandlers(this).registerDatepickerSideEffects();
    let currentDate;
    this._subs.push(this._store.select((state2) => state2.selectedDate).subscribe((date) => {
      currentDate = date;
      this.valueChange.emit(date);
    }));
    this._subs.push(this._store.select((state2) => state2.selectedTime).subscribe((time) => {
      if (!time || !time[0] || !(time[0] instanceof Date) || time[0] === currentDate) {
        return;
      }
      this.valueChange.emit(time[0]);
    }));
    this._store.dispatch(this._actions.changeViewMode(this._config.startView));
  }
  ngAfterViewInit() {
    this.selectedTimeSub.add(this.selectedTime?.subscribe((val) => {
      if (Array.isArray(val) && val.length >= 1) {
        this.startTimepicker?.writeValue(val[0]);
      }
    }));
    this.startTimepicker?.registerOnChange((val) => {
      this.timeSelectHandler(val, 0);
    });
  }
  get isTopPosition() {
    return this._element.nativeElement.classList.contains("top");
  }
  positionServiceEnable() {
    this._positionService.enable();
  }
  timeSelectHandler(date, index) {
    this._store.dispatch(this._actions.selectTime(date, index));
  }
  daySelectHandler(day) {
    if (!day) {
      return;
    }
    const isDisabled = this.isOtherMonthsActive ? day.isDisabled : day.isOtherMonth || day.isDisabled;
    if (isDisabled) {
      return;
    }
    this._store.dispatch(this._actions.select(day.date));
  }
  monthSelectHandler(day) {
    if (!day || day.isDisabled) {
      return;
    }
    this._store.dispatch(this._actions.navigateTo({
      unit: {
        month: getMonth(day.date),
        year: getFullYear(day.date)
      },
      viewMode: "day"
    }));
  }
  yearSelectHandler(day) {
    if (!day || day.isDisabled) {
      return;
    }
    this._store.dispatch(this._actions.navigateTo({
      unit: {
        year: getFullYear(day.date)
      },
      viewMode: "month"
    }));
  }
  setToday() {
    this._store.dispatch(this._actions.select(/* @__PURE__ */ new Date()));
  }
  clearDate() {
    this._store.dispatch(this._actions.select(void 0));
  }
  ngOnDestroy() {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
    this.selectedTimeSub.unsubscribe();
    this._effects?.destroy();
  }
  static {
    this.ɵfac = function BsDatepickerContainerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerContainerComponent)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(BsDatepickerConfig), ɵɵdirectiveInject(BsDatepickerStore), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(BsDatepickerActions), ɵɵdirectiveInject(BsDatepickerEffects), ɵɵdirectiveInject(PositioningService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsDatepickerContainerComponent,
      selectors: [["bs-datepicker-container"]],
      viewQuery: function BsDatepickerContainerComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c3, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.startTimepicker = _t.first);
        }
      },
      hostAttrs: ["role", "dialog", "aria-label", "calendar", 1, "bottom"],
      hostVars: 2,
      hostBindings: function BsDatepickerContainerComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function BsDatepickerContainerComponent_click_HostBindingHandler($event) {
            return ctx._stopPropagation($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("disabled", ctx.isDatepickerDisabled)("readonly", ctx.isDatepickerReadonly);
        }
      },
      features: [ɵɵProvidersFeature([BsDatepickerStore, BsDatepickerEffects, BsDatepickerActions]), ɵɵInheritDefinitionFeature],
      decls: 2,
      vars: 3,
      consts: [["startTP", ""], ["endTP", ""], ["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"], [1, "bs-datepicker", 3, "ngClass"], [1, "bs-datepicker-container"], ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "bs-media-container", 4, "ngSwitchCase"], ["class", "bs-datepicker-buttons", 4, "ngIf"], ["class", "bs-datepicker-custom-range", 4, "ngIf"], [1, "bs-media-container"], [3, "bs-datepicker-multiple", "calendar", "isDisabled", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"], ["class", "bs-timepicker-in-datepicker-container", 4, "ngIf"], [3, "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", "calendar", "isDisabled", "options"], [1, "bs-timepicker-in-datepicker-container"], [3, "disabled"], [3, "disabled", 4, "ngIf"], [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"], [3, "onNavigate", "onViewMode", "onHover", "onSelect", "calendar"], [1, "bs-datepicker-buttons"], ["type", "button", 1, "btn", "btn-success"], ["type", "button", 1, "btn", "btn-default"], ["class", "btn-today-wrapper", 3, "today-left", "today-right", "today-center", 4, "ngIf"], ["class", "btn-clear-wrapper", 3, "clear-left", "clear-right", "clear-center", 4, "ngIf"], [1, "btn-today-wrapper"], [1, "btn", "btn-success", 3, "click"], [1, "btn-clear-wrapper"], [1, "bs-datepicker-custom-range"], [3, "onSelect", "selectedRange", "ranges", "customRangeLabel"]],
      template: function BsDatepickerContainerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, BsDatepickerContainerComponent_div_0_Template, 10, 11, "div", 2);
          ɵɵpipe(1, "async");
        }
        if (rf & 2) {
          ɵɵproperty("ngIf", ɵɵpipeBind1(1, 1, ctx.viewMode));
        }
      },
      dependencies: [NgIf, NgClass, NgSwitch, NgSwitchCase, NgForOf, BsDaysCalendarViewComponent, TimepickerModule, TimepickerComponent, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent, AsyncPipe],
      encapsulation: 2,
      data: {
        animation: [datepickerAnimation]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerContainerComponent, [{
    type: Component,
    args: [{
      selector: "bs-datepicker-container",
      providers: [BsDatepickerStore, BsDatepickerEffects, BsDatepickerActions],
      host: {
        class: "bottom",
        "(click)": "_stopPropagation($event)",
        role: "dialog",
        "aria-label": "calendar"
      },
      animations: [datepickerAnimation],
      standalone: true,
      imports: [NgIf, NgClass, NgSwitch, NgSwitchCase, NgForOf, BsDaysCalendarViewComponent, TimepickerModule, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent, AsyncPipe],
      template: `<!-- days calendar view mode -->
<div class="bs-datepicker" [ngClass]="containerClass" *ngIf="viewMode | async">
  <div class="bs-datepicker-container"
    [@datepickerAnimation]="animationState"
    (@datepickerAnimation.done)="positionServiceEnable()">
    <!--calendars-->
    <div class="bs-calendar-container" [ngSwitch]="viewMode | async" role="application">
      <!--days calendar-->
      <ng-container *ngSwitchCase="'day'">
        <div class="bs-media-container">
          <bs-days-calendar-view
            *ngFor="let calendar of daysCalendar$ | async"
            [class.bs-datepicker-multiple]="multipleCalendars"
            [calendar]="calendar"
            [isDisabled]="isDatePickerDisabled"
            [options]="options$ | async"
            (onNavigate)="navigateTo($event)"
            (onViewMode)="setViewMode($event)"
            (onHover)="dayHoverHandler($event)"
            (onHoverWeek)="weekHoverHandler($event)"
            (onSelect)="daySelectHandler($event)">
          </bs-days-calendar-view>
        </div>
        <div *ngIf="withTimepicker" class="bs-timepicker-in-datepicker-container">
          <timepicker #startTP [disabled]="isDatePickerDisabled"></timepicker>
          <timepicker #endTP *ngIf="isRangePicker" [disabled]="isDatePickerDisabled"></timepicker>
        </div>
      </ng-container>

      <!--months calendar-->
      <div *ngSwitchCase="'month'" class="bs-media-container">
        <bs-month-calendar-view
          *ngFor="let calendar of monthsCalendar | async"
          [class.bs-datepicker-multiple]="multipleCalendars"
          [calendar]="calendar"
          (onNavigate)="navigateTo($event)"
          (onViewMode)="setViewMode($event)"
          (onHover)="monthHoverHandler($event)"
          (onSelect)="monthSelectHandler($event)">
        </bs-month-calendar-view>
      </div>

      <!--years calendar-->
      <div *ngSwitchCase="'year'" class="bs-media-container">
        <bs-years-calendar-view
          *ngFor="let calendar of yearsCalendar | async"
          [class.bs-datepicker-multiple]="multipleCalendars"
          [calendar]="calendar"
          (onNavigate)="navigateTo($event)"
          (onViewMode)="setViewMode($event)"
          (onHover)="yearHoverHandler($event)"
          (onSelect)="yearSelectHandler($event)">
        </bs-years-calendar-view>
      </div>
    </div>

    <!--applycancel buttons-->
    <div class="bs-datepicker-buttons" *ngIf="false">
      <button class="btn btn-success" type="button">Apply</button>
      <button class="btn btn-default" type="button">Cancel</button>
    </div>

    <div class="bs-datepicker-buttons" *ngIf="showTodayBtn || showClearBtn">
      <div class="btn-today-wrapper"
           [class.today-left]="todayPos === 'left'"
           [class.today-right]="todayPos === 'right'"
           [class.today-center]="todayPos === 'center'"
           *ngIf="showTodayBtn">
        <button class="btn btn-success" (click)="setToday()">{{todayBtnLbl}}</button>
      </div>

        <div class="btn-clear-wrapper"
        [class.clear-left]="clearPos === 'left'"
        [class.clear-right]="clearPos === 'right'"
        [class.clear-center]="clearPos === 'center'"
        *ngIf="showClearBtn">
          <button class="btn btn-success" (click)="clearDate()">{{clearBtnLbl}}</button>
        </div>
    </div>

  </div>

  <!--custom dates or date ranges picker-->
  <div class="bs-datepicker-custom-range" *ngIf="customRanges && customRanges.length > 0">
    <bs-custom-date-view
      [selectedRange]="chosenRange"
      [ranges]="customRanges"
      [customRangeLabel]="customRangeBtnLbl"
      (onSelect)="setRangeOnCalendar($event)">
    </bs-custom-date-view>
  </div>
</div>
`
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: BsDatepickerConfig
  }, {
    type: BsDatepickerStore
  }, {
    type: ElementRef
  }, {
    type: BsDatepickerActions
  }, {
    type: BsDatepickerEffects
  }, {
    type: PositioningService
  }], {
    startTimepicker: [{
      type: ViewChild,
      args: ["startTP"]
    }],
    isDatepickerDisabled: [{
      type: HostBinding,
      args: ["attr.disabled"]
    }],
    isDatepickerReadonly: [{
      type: HostBinding,
      args: ["attr.readonly"]
    }]
  });
})();
var previousDate$1;
var BsDatepickerDirective = class _BsDatepickerDirective {
  get readonlyValue() {
    return this.isDisabled ? "" : null;
  }
  constructor(_config, _elementRef, _renderer, _viewContainerRef, cis) {
    this._config = _config;
    this._elementRef = _elementRef;
    this._renderer = _renderer;
    this.placement = "bottom";
    this.triggers = "click";
    this.outsideClick = true;
    this.container = "body";
    this.outsideEsc = true;
    this.isDestroy$ = new Subject();
    this.isDisabled = false;
    this.bsValueChange = new EventEmitter();
    this._subs = [];
    this._dateInputFormat$ = new Subject();
    Object.assign(this, this._config);
    this._datepicker = cis.createLoader(_elementRef, _viewContainerRef, _renderer);
    this.onShown = this._datepicker.onShown;
    this.onHidden = this._datepicker.onHidden;
    this.isOpen$ = new BehaviorSubject(this.isOpen);
  }
  /**
   * Returns whether or not the datepicker is currently being shown
   */
  get isOpen() {
    return this._datepicker.isShown;
  }
  set isOpen(value) {
    this.isOpen$.next(value);
  }
  /**
   * Initial value of datepicker
   */
  set bsValue(value) {
    if (this._bsValue && value && this._bsValue.getTime() === value.getTime()) {
      return;
    }
    if (!this._bsValue && value && !this._config.withTimepicker) {
      const now = /* @__PURE__ */ new Date();
      copyTime(value, now);
    }
    if (value && this.bsConfig?.initCurrentTime) {
      value = setCurrentTimeOnDateSelect(value);
    }
    this.initPreviousValue();
    this._bsValue = value;
    this.bsValueChange.emit(value);
  }
  get dateInputFormat$() {
    return this._dateInputFormat$;
  }
  ngOnInit() {
    this._datepicker.listen({
      outsideClick: this.outsideClick,
      outsideEsc: this.outsideEsc,
      triggers: this.triggers,
      show: () => this.show()
    });
    this.setConfig();
    this.initPreviousValue();
  }
  initPreviousValue() {
    previousDate$1 = this._bsValue;
  }
  ngOnChanges(changes) {
    if (changes["bsConfig"]) {
      if (changes["bsConfig"].currentValue?.initCurrentTime && changes["bsConfig"].currentValue?.initCurrentTime !== changes["bsConfig"].previousValue?.initCurrentTime && this._bsValue) {
        this.initPreviousValue();
        this._bsValue = setCurrentTimeOnDateSelect(this._bsValue);
        this.bsValueChange.emit(this._bsValue);
      }
      this.setConfig();
      this._dateInputFormat$.next(this.bsConfig && this.bsConfig.dateInputFormat);
    }
    if (!this._datepickerRef || !this._datepickerRef.instance) {
      return;
    }
    if (changes["minDate"]) {
      this._datepickerRef.instance.minDate = this.minDate;
    }
    if (changes["maxDate"]) {
      this._datepickerRef.instance.maxDate = this.maxDate;
    }
    if (changes["daysDisabled"]) {
      this._datepickerRef.instance.daysDisabled = this.daysDisabled;
    }
    if (changes["datesDisabled"]) {
      this._datepickerRef.instance.datesDisabled = this.datesDisabled;
    }
    if (changes["datesEnabled"]) {
      this._datepickerRef.instance.datesEnabled = this.datesEnabled;
    }
    if (changes["isDisabled"]) {
      this._datepickerRef.instance.isDisabled = this.isDisabled;
    }
    if (changes["dateCustomClasses"]) {
      this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
    }
    if (changes["dateTooltipTexts"]) {
      this._datepickerRef.instance.dateTooltipTexts = this.dateTooltipTexts;
    }
  }
  initSubscribes() {
    this._subs.push(this.bsValueChange.subscribe((value) => {
      if (this._datepickerRef) {
        this._datepickerRef.instance.value = value;
      }
    }));
    if (this._datepickerRef) {
      this._subs.push(this._datepickerRef.instance.valueChange.subscribe((value) => {
        this.initPreviousValue();
        this.bsValue = value;
        if (this.keepDatepickerModalOpened()) {
          return;
        }
        this.hide();
      }));
    }
  }
  keepDatepickerModalOpened() {
    if (!previousDate$1 || !this.bsConfig?.keepDatepickerOpened || !this._config.withTimepicker) {
      return false;
    }
    return this.isDateSame();
  }
  isDateSame() {
    return previousDate$1 instanceof Date && this._bsValue?.getDate() === previousDate$1?.getDate() && this._bsValue?.getMonth() === previousDate$1?.getMonth() && this._bsValue?.getFullYear() === previousDate$1?.getFullYear();
  }
  ngAfterViewInit() {
    this.isOpen$.pipe(filter((isOpen) => isOpen !== this.isOpen), takeUntil(this.isDestroy$)).subscribe(() => this.toggle());
  }
  /**
   * Opens an element’s datepicker. This is considered a “manual” triggering of
   * the datepicker.
   */
  show() {
    if (this._datepicker.isShown) {
      return;
    }
    this.setConfig();
    this._datepickerRef = this._datepicker.provide({
      provide: BsDatepickerConfig,
      useValue: this._config
    }).attach(BsDatepickerContainerComponent).to(this.container).position({
      attachment: this.placement
    }).show({
      placement: this.placement
    });
    this.initSubscribes();
  }
  /**
   * Closes an element’s datepicker. This is considered a “manual” triggering of
   * the datepicker.
   */
  hide() {
    if (this.isOpen) {
      this._datepicker.hide();
    }
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
    if (this._config.returnFocusToInput) {
      this._renderer.selectRootElement(this._elementRef.nativeElement).focus();
    }
  }
  /**
   * Toggles an element’s datepicker. This is considered a “manual” triggering
   * of the datepicker.
   */
  toggle() {
    if (this.isOpen) {
      return this.hide();
    }
    this.show();
  }
  /**
   * Set config for datepicker
   */
  setConfig() {
    this._config = Object.assign({}, this._config, this.bsConfig, {
      value: this._config.keepDatesOutOfRules ? this._bsValue : checkBsValue(this._bsValue, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
      isDisabled: this.isDisabled,
      minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
      maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
      daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
      dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
      dateTooltipTexts: this.dateTooltipTexts || this.bsConfig && this.bsConfig.dateTooltipTexts,
      datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
      datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
      minMode: this.minMode || this.bsConfig && this.bsConfig.minMode,
      initCurrentTime: this.bsConfig?.initCurrentTime,
      keepDatepickerOpened: this.bsConfig?.keepDatepickerOpened,
      keepDatesOutOfRules: this.bsConfig?.keepDatesOutOfRules
    });
  }
  unsubscribeSubscriptions() {
    if (this._subs?.length) {
      this._subs.map((sub) => sub.unsubscribe());
      this._subs.length = 0;
    }
  }
  ngOnDestroy() {
    this._datepicker.dispose();
    this.isOpen$.next(false);
    if (this.isDestroy$) {
      this.isDestroy$.next(null);
      this.isDestroy$.complete();
    }
    this.unsubscribeSubscriptions();
  }
  static {
    this.ɵfac = function BsDatepickerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerDirective)(ɵɵdirectiveInject(BsDatepickerConfig), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ComponentLoaderFactory));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BsDatepickerDirective,
      selectors: [["", "bsDatepicker", ""]],
      hostVars: 1,
      hostBindings: function BsDatepickerDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("readonly", ctx.readonlyValue);
        }
      },
      inputs: {
        placement: "placement",
        triggers: "triggers",
        outsideClick: "outsideClick",
        container: "container",
        outsideEsc: "outsideEsc",
        isDisabled: "isDisabled",
        minDate: "minDate",
        maxDate: "maxDate",
        ignoreMinMaxErrors: "ignoreMinMaxErrors",
        minMode: "minMode",
        daysDisabled: "daysDisabled",
        datesDisabled: "datesDisabled",
        datesEnabled: "datesEnabled",
        dateCustomClasses: "dateCustomClasses",
        dateTooltipTexts: "dateTooltipTexts",
        isOpen: "isOpen",
        bsValue: "bsValue",
        bsConfig: "bsConfig"
      },
      outputs: {
        onShown: "onShown",
        onHidden: "onHidden",
        bsValueChange: "bsValueChange"
      },
      exportAs: ["bsDatepicker"],
      features: [ɵɵProvidersFeature([ComponentLoaderFactory]), ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerDirective, [{
    type: Directive,
    args: [{
      selector: "[bsDatepicker]",
      exportAs: "bsDatepicker",
      providers: [ComponentLoaderFactory],
      standalone: true
    }]
  }], () => [{
    type: BsDatepickerConfig
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: ViewContainerRef
  }, {
    type: ComponentLoaderFactory
  }], {
    placement: [{
      type: Input
    }],
    triggers: [{
      type: Input
    }],
    outsideClick: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    outsideEsc: [{
      type: Input
    }],
    onShown: [{
      type: Output
    }],
    onHidden: [{
      type: Output
    }],
    isDisabled: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    ignoreMinMaxErrors: [{
      type: Input
    }],
    minMode: [{
      type: Input
    }],
    daysDisabled: [{
      type: Input
    }],
    datesDisabled: [{
      type: Input
    }],
    datesEnabled: [{
      type: Input
    }],
    dateCustomClasses: [{
      type: Input
    }],
    dateTooltipTexts: [{
      type: Input
    }],
    bsValueChange: [{
      type: Output
    }],
    readonlyValue: [{
      type: HostBinding,
      args: ["attr.readonly"]
    }],
    isOpen: [{
      type: Input
    }],
    bsValue: [{
      type: Input
    }],
    bsConfig: [{
      type: Input
    }]
  });
})();
var BsDatepickerInlineConfig = class _BsDatepickerInlineConfig extends BsDatepickerConfig {
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵBsDatepickerInlineConfig_BaseFactory;
      return function BsDatepickerInlineConfig_Factory(__ngFactoryType__) {
        return (ɵBsDatepickerInlineConfig_BaseFactory || (ɵBsDatepickerInlineConfig_BaseFactory = ɵɵgetInheritedFactory(_BsDatepickerInlineConfig)))(__ngFactoryType__ || _BsDatepickerInlineConfig);
      };
    })();
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BsDatepickerInlineConfig,
      factory: _BsDatepickerInlineConfig.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerInlineConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var BsDatepickerInlineContainerComponent = class _BsDatepickerInlineContainerComponent extends BsDatepickerContainerComponent {
  get disabledValue() {
    return this.isDatePickerDisabled ? "" : null;
  }
  get readonlyValue() {
    return this.isDatePickerDisabled ? "" : null;
  }
  constructor(_renderer, _config, _store, _element, _actions, _effects, _positioningService) {
    super(_renderer, _config, _store, _element, _actions, _effects, _positioningService);
    _renderer.setStyle(_element.nativeElement, "display", "inline-block");
    _renderer.setStyle(_element.nativeElement, "position", "static");
  }
  static {
    this.ɵfac = function BsDatepickerInlineContainerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerInlineContainerComponent)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(BsDatepickerConfig), ɵɵdirectiveInject(BsDatepickerStore), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(BsDatepickerActions), ɵɵdirectiveInject(BsDatepickerEffects), ɵɵdirectiveInject(PositioningService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsDatepickerInlineContainerComponent,
      selectors: [["bs-datepicker-inline-container"]],
      hostVars: 2,
      hostBindings: function BsDatepickerInlineContainerComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function BsDatepickerInlineContainerComponent_click_HostBindingHandler($event) {
            return ctx._stopPropagation($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("disabled", ctx.disabledValue)("readonly", ctx.readonlyValue);
        }
      },
      features: [ɵɵProvidersFeature([BsDatepickerStore, BsDatepickerEffects, PositioningService]), ɵɵInheritDefinitionFeature],
      decls: 2,
      vars: 3,
      consts: [["startTP", ""], ["endTP", ""], ["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"], [1, "bs-datepicker", 3, "ngClass"], [1, "bs-datepicker-container"], ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "bs-media-container", 4, "ngSwitchCase"], ["class", "bs-datepicker-buttons", 4, "ngIf"], ["class", "bs-datepicker-custom-range", 4, "ngIf"], [1, "bs-media-container"], [3, "bs-datepicker-multiple", "calendar", "isDisabled", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"], ["class", "bs-timepicker-in-datepicker-container", 4, "ngIf"], [3, "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", "calendar", "isDisabled", "options"], [1, "bs-timepicker-in-datepicker-container"], [3, "disabled"], [3, "disabled", 4, "ngIf"], [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"], [3, "onNavigate", "onViewMode", "onHover", "onSelect", "calendar"], [1, "bs-datepicker-buttons"], ["type", "button", 1, "btn", "btn-success"], ["type", "button", 1, "btn", "btn-default"], ["class", "btn-today-wrapper", 3, "today-left", "today-right", "today-center", 4, "ngIf"], ["class", "btn-clear-wrapper", 3, "clear-left", "clear-right", "clear-center", 4, "ngIf"], [1, "btn-today-wrapper"], [1, "btn", "btn-success", 3, "click"], [1, "btn-clear-wrapper"], [1, "bs-datepicker-custom-range"], [3, "onSelect", "selectedRange", "ranges", "customRangeLabel"]],
      template: function BsDatepickerInlineContainerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, BsDatepickerInlineContainerComponent_div_0_Template, 10, 11, "div", 2);
          ɵɵpipe(1, "async");
        }
        if (rf & 2) {
          ɵɵproperty("ngIf", ɵɵpipeBind1(1, 1, ctx.viewMode));
        }
      },
      dependencies: [NgIf, NgClass, NgSwitch, NgSwitchCase, NgForOf, BsDaysCalendarViewComponent, TimepickerModule, TimepickerComponent, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent, AsyncPipe],
      encapsulation: 2,
      data: {
        animation: [datepickerAnimation]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerInlineContainerComponent, [{
    type: Component,
    args: [{
      selector: "bs-datepicker-inline-container",
      providers: [BsDatepickerStore, BsDatepickerEffects, PositioningService],
      host: {
        "(click)": "_stopPropagation($event)"
      },
      animations: [datepickerAnimation],
      standalone: true,
      imports: [NgIf, NgClass, NgSwitch, NgSwitchCase, NgForOf, BsDaysCalendarViewComponent, TimepickerModule, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent, AsyncPipe],
      template: `<!-- days calendar view mode -->
<div class="bs-datepicker" [ngClass]="containerClass" *ngIf="viewMode | async">
  <div class="bs-datepicker-container"
    [@datepickerAnimation]="animationState"
    (@datepickerAnimation.done)="positionServiceEnable()">
    <!--calendars-->
    <div class="bs-calendar-container" [ngSwitch]="viewMode | async" role="application">
      <!--days calendar-->
      <ng-container *ngSwitchCase="'day'">
        <div class="bs-media-container">
          <bs-days-calendar-view
            *ngFor="let calendar of daysCalendar$ | async"
            [class.bs-datepicker-multiple]="multipleCalendars"
            [calendar]="calendar"
            [isDisabled]="isDatePickerDisabled"
            [options]="options$ | async"
            (onNavigate)="navigateTo($event)"
            (onViewMode)="setViewMode($event)"
            (onHover)="dayHoverHandler($event)"
            (onHoverWeek)="weekHoverHandler($event)"
            (onSelect)="daySelectHandler($event)">
          </bs-days-calendar-view>
        </div>
        <div *ngIf="withTimepicker" class="bs-timepicker-in-datepicker-container">
          <timepicker #startTP [disabled]="isDatePickerDisabled"></timepicker>
          <timepicker #endTP *ngIf="isRangePicker" [disabled]="isDatePickerDisabled"></timepicker>
        </div>
      </ng-container>

      <!--months calendar-->
      <div *ngSwitchCase="'month'" class="bs-media-container">
        <bs-month-calendar-view
          *ngFor="let calendar of monthsCalendar | async"
          [class.bs-datepicker-multiple]="multipleCalendars"
          [calendar]="calendar"
          (onNavigate)="navigateTo($event)"
          (onViewMode)="setViewMode($event)"
          (onHover)="monthHoverHandler($event)"
          (onSelect)="monthSelectHandler($event)">
        </bs-month-calendar-view>
      </div>

      <!--years calendar-->
      <div *ngSwitchCase="'year'" class="bs-media-container">
        <bs-years-calendar-view
          *ngFor="let calendar of yearsCalendar | async"
          [class.bs-datepicker-multiple]="multipleCalendars"
          [calendar]="calendar"
          (onNavigate)="navigateTo($event)"
          (onViewMode)="setViewMode($event)"
          (onHover)="yearHoverHandler($event)"
          (onSelect)="yearSelectHandler($event)">
        </bs-years-calendar-view>
      </div>
    </div>

    <!--applycancel buttons-->
    <div class="bs-datepicker-buttons" *ngIf="false">
      <button class="btn btn-success" type="button">Apply</button>
      <button class="btn btn-default" type="button">Cancel</button>
    </div>

    <div class="bs-datepicker-buttons" *ngIf="showTodayBtn || showClearBtn">
      <div class="btn-today-wrapper"
           [class.today-left]="todayPos === 'left'"
           [class.today-right]="todayPos === 'right'"
           [class.today-center]="todayPos === 'center'"
           *ngIf="showTodayBtn">
        <button class="btn btn-success" (click)="setToday()">{{todayBtnLbl}}</button>
      </div>

        <div class="btn-clear-wrapper"
        [class.clear-left]="clearPos === 'left'"
        [class.clear-right]="clearPos === 'right'"
        [class.clear-center]="clearPos === 'center'"
        *ngIf="showClearBtn">
          <button class="btn btn-success" (click)="clearDate()">{{clearBtnLbl}}</button>
        </div>
    </div>

  </div>

  <!--custom dates or date ranges picker-->
  <div class="bs-datepicker-custom-range" *ngIf="customRanges && customRanges.length > 0">
    <bs-custom-date-view
      [selectedRange]="chosenRange"
      [ranges]="customRanges"
      [customRangeLabel]="customRangeBtnLbl"
      (onSelect)="setRangeOnCalendar($event)">
    </bs-custom-date-view>
  </div>
</div>
`
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: BsDatepickerConfig
  }, {
    type: BsDatepickerStore
  }, {
    type: ElementRef
  }, {
    type: BsDatepickerActions
  }, {
    type: BsDatepickerEffects
  }, {
    type: PositioningService
  }], {
    disabledValue: [{
      type: HostBinding,
      args: ["attr.disabled"]
    }],
    readonlyValue: [{
      type: HostBinding,
      args: ["attr.readonly"]
    }]
  });
})();
var BsDatepickerInlineDirective = class _BsDatepickerInlineDirective {
  constructor(_config, _elementRef, _renderer, _viewContainerRef, cis) {
    this._config = _config;
    this._elementRef = _elementRef;
    this.isDisabled = false;
    this.bsValueChange = new EventEmitter();
    this._subs = [];
    Object.assign(this, this._config);
    this._datepicker = cis.createLoader(_elementRef, _viewContainerRef, _renderer);
  }
  /**
   * Initial value of datepicker
   */
  set bsValue(value) {
    if (this._bsValue === value) {
      return;
    }
    if (!this._bsValue && value && !this._config.withTimepicker) {
      const now = /* @__PURE__ */ new Date();
      copyTime(value, now);
    }
    if (value && this.bsConfig?.initCurrentTime) {
      value = setCurrentTimeOnDateSelect(value);
    }
    this._bsValue = value;
    this.bsValueChange.emit(value);
  }
  ngOnInit() {
    this.setConfig();
    this.initSubscribes();
  }
  initSubscribes() {
    this.unsubscribeSubscriptions();
    this._subs.push(this.bsValueChange.subscribe((value) => {
      if (this._datepickerRef) {
        this._datepickerRef.instance.value = value;
      }
    }));
    if (this._datepickerRef) {
      this._subs.push(this._datepickerRef.instance.valueChange.subscribe((value) => {
        this.bsValue = value;
      }));
    }
  }
  unsubscribeSubscriptions() {
    if (this._subs?.length) {
      this._subs.map((sub) => sub.unsubscribe());
      this._subs.length = 0;
    }
  }
  ngOnChanges(changes) {
    if (changes["bsConfig"]) {
      if (changes["bsConfig"].currentValue?.initCurrentTime && changes["bsConfig"].currentValue?.initCurrentTime !== changes["bsConfig"].previousValue?.initCurrentTime && this._bsValue) {
        this._bsValue = setCurrentTimeOnDateSelect(this._bsValue);
        this.bsValueChange.emit(this._bsValue);
      }
    }
    if (!this._datepickerRef || !this._datepickerRef.instance) {
      return;
    }
    if (changes["minDate"]) {
      this._datepickerRef.instance.minDate = this.minDate;
    }
    if (changes["maxDate"]) {
      this._datepickerRef.instance.maxDate = this.maxDate;
    }
    if (changes["datesDisabled"]) {
      this._datepickerRef.instance.datesDisabled = this.datesDisabled;
    }
    if (changes["datesEnabled"]) {
      this._datepickerRef.instance.datesEnabled = this.datesEnabled;
      this._datepickerRef.instance.value = this._bsValue;
    }
    if (changes["isDisabled"]) {
      this._datepickerRef.instance.isDisabled = this.isDisabled;
    }
    if (changes["dateCustomClasses"]) {
      this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
    }
    if (changes["dateTooltipTexts"]) {
      this._datepickerRef.instance.dateTooltipTexts = this.dateTooltipTexts;
    }
    this.setConfig();
  }
  /**
   * Set config for datepicker
   */
  setConfig() {
    if (this._datepicker) {
      this._datepicker.hide();
    }
    this._config = Object.assign({}, this._config, this.bsConfig, {
      value: checkBsValue(this._bsValue, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
      isDisabled: this.isDisabled,
      minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
      maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
      dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
      dateTooltipTexts: this.dateTooltipTexts || this.bsConfig && this.bsConfig.dateTooltipTexts,
      datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
      datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
      initCurrentTime: this.bsConfig?.initCurrentTime
    });
    this._datepickerRef = this._datepicker.provide({
      provide: BsDatepickerConfig,
      useValue: this._config
    }).attach(BsDatepickerInlineContainerComponent).to(this._elementRef).show();
    this.initSubscribes();
  }
  ngOnDestroy() {
    this._datepicker.dispose();
    this.unsubscribeSubscriptions();
  }
  static {
    this.ɵfac = function BsDatepickerInlineDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerInlineDirective)(ɵɵdirectiveInject(BsDatepickerInlineConfig), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ComponentLoaderFactory));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BsDatepickerInlineDirective,
      selectors: [["bs-datepicker-inline"]],
      inputs: {
        bsConfig: "bsConfig",
        isDisabled: "isDisabled",
        minDate: "minDate",
        maxDate: "maxDate",
        dateCustomClasses: "dateCustomClasses",
        dateTooltipTexts: "dateTooltipTexts",
        datesEnabled: "datesEnabled",
        datesDisabled: "datesDisabled",
        bsValue: "bsValue"
      },
      outputs: {
        bsValueChange: "bsValueChange"
      },
      exportAs: ["bsDatepickerInline"],
      features: [ɵɵProvidersFeature([ComponentLoaderFactory]), ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerInlineDirective, [{
    type: Directive,
    args: [{
      selector: "bs-datepicker-inline",
      exportAs: "bsDatepickerInline",
      standalone: true,
      providers: [ComponentLoaderFactory]
    }]
  }], () => [{
    type: BsDatepickerInlineConfig
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: ViewContainerRef
  }, {
    type: ComponentLoaderFactory
  }], {
    bsConfig: [{
      type: Input
    }],
    isDisabled: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    dateCustomClasses: [{
      type: Input
    }],
    dateTooltipTexts: [{
      type: Input
    }],
    datesEnabled: [{
      type: Input
    }],
    datesDisabled: [{
      type: Input
    }],
    bsValueChange: [{
      type: Output
    }],
    bsValue: [{
      type: Input
    }]
  });
})();
var BsDaterangepickerInlineConfig = class _BsDaterangepickerInlineConfig extends BsDatepickerConfig {
  constructor() {
    super(...arguments);
    this.displayMonths = 2;
    this.isAnimated = false;
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵBsDaterangepickerInlineConfig_BaseFactory;
      return function BsDaterangepickerInlineConfig_Factory(__ngFactoryType__) {
        return (ɵBsDaterangepickerInlineConfig_BaseFactory || (ɵBsDaterangepickerInlineConfig_BaseFactory = ɵɵgetInheritedFactory(_BsDaterangepickerInlineConfig)))(__ngFactoryType__ || _BsDaterangepickerInlineConfig);
      };
    })();
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BsDaterangepickerInlineConfig,
      factory: _BsDaterangepickerInlineConfig.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDaterangepickerInlineConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var BsDaterangepickerContainerComponent = class _BsDaterangepickerContainerComponent extends BsDatepickerAbstractComponent {
  set value(value) {
    this._effects?.setRangeValue(value);
  }
  get isDatePickerDisabled() {
    return !!this._config.isDisabled;
  }
  get isDatepickerDisabled() {
    return this.isDatePickerDisabled ? "" : null;
  }
  get isDatepickerReadonly() {
    return this.isDatePickerDisabled ? "" : null;
  }
  constructor(_renderer, _config, _store, _element, _actions, _effects, _positionService) {
    super();
    this._config = _config;
    this._store = _store;
    this._element = _element;
    this._actions = _actions;
    this._positionService = _positionService;
    this.valueChange = new EventEmitter();
    this.animationState = "void";
    this._rangeStack = [];
    this.chosenRange = [];
    this._subs = [];
    this.isRangePicker = true;
    this._effects = _effects;
    this.customRanges = this._config.ranges || [];
    this.customRangeBtnLbl = this._config.customRangeButtonLabel;
    _renderer.setStyle(_element.nativeElement, "display", "block");
    _renderer.setStyle(_element.nativeElement, "position", "absolute");
  }
  ngOnInit() {
    this._positionService.setOptions({
      modifiers: {
        flip: {
          enabled: this._config.adaptivePosition
        },
        preventOverflow: {
          enabled: this._config.adaptivePosition
        }
      },
      allowedPositions: this._config.allowedPositions
    });
    this._positionService.event$?.pipe(take(1)).subscribe(() => {
      this._positionService.disable();
      if (this._config.isAnimated) {
        this.animationState = this.isTopPosition ? "animated-up" : "animated-down";
        return;
      }
      this.animationState = "unanimated";
    });
    this.containerClass = this._config.containerClass;
    this.isOtherMonthsActive = this._config.selectFromOtherMonth;
    this.withTimepicker = this._config.withTimepicker;
    this._effects?.init(this._store).setOptions(this._config).setBindings(this).setEventHandlers(this).registerDatepickerSideEffects();
    let currentDate;
    this._subs.push(this._store.select((state2) => state2.selectedRange).subscribe((dateRange) => {
      currentDate = dateRange;
      this.valueChange.emit(dateRange);
      this.chosenRange = dateRange || [];
    }));
    this._subs.push(this._store.select((state2) => state2.selectedTime).subscribe((time) => {
      if (!time || !time[0] || !time[1] || !(time[0] instanceof Date) || !(time[1] instanceof Date) || currentDate && time[0] === currentDate[0] && time[1] === currentDate[1]) {
        return;
      }
      this.valueChange.emit(time);
      this.chosenRange = time || [];
    }));
  }
  ngAfterViewInit() {
    this.selectedTimeSub.add(this.selectedTime?.subscribe((val) => {
      if (Array.isArray(val) && val.length >= 2) {
        this.startTimepicker?.writeValue(val[0]);
        this.endTimepicker?.writeValue(val[1]);
      }
    }));
    this.startTimepicker?.registerOnChange((val) => {
      this.timeSelectHandler(val, 0);
    });
    this.endTimepicker?.registerOnChange((val) => {
      this.timeSelectHandler(val, 1);
    });
  }
  get isTopPosition() {
    return this._element.nativeElement.classList.contains("top");
  }
  positionServiceEnable() {
    this._positionService.enable();
  }
  timeSelectHandler(date, index) {
    this._store.dispatch(this._actions.selectTime(date, index));
  }
  daySelectHandler(day) {
    if (!day) {
      return;
    }
    const isDisabled = this.isOtherMonthsActive ? day.isDisabled : day.isOtherMonth || day.isDisabled;
    if (isDisabled) {
      return;
    }
    this.rangesProcessing(day);
  }
  monthSelectHandler(day) {
    if (!day || day.isDisabled) {
      return;
    }
    day.isSelected = true;
    if (this._config.minMode !== "month") {
      if (day.isDisabled) {
        return;
      }
      this._store.dispatch(this._actions.navigateTo({
        unit: {
          month: getMonth(day.date),
          year: getFullYear(day.date)
        },
        viewMode: "day"
      }));
      return;
    }
    this.rangesProcessing(day);
  }
  yearSelectHandler(day) {
    if (!day || day.isDisabled) {
      return;
    }
    day.isSelected = true;
    if (this._config.minMode !== "year") {
      if (day.isDisabled) {
        return;
      }
      this._store.dispatch(this._actions.navigateTo({
        unit: {
          year: getFullYear(day.date)
        },
        viewMode: "month"
      }));
      return;
    }
    this.rangesProcessing(day);
  }
  rangesProcessing(day) {
    if (this._rangeStack.length === 1) {
      this._rangeStack = day.date >= this._rangeStack[0] ? [this._rangeStack[0], day.date] : [day.date];
    }
    if (this._config.maxDateRange) {
      this.setMaxDateRangeOnCalendar(day.date);
    }
    if (this._rangeStack.length === 0) {
      this._rangeStack = [day.date];
      if (this._config.maxDateRange) {
        this.setMaxDateRangeOnCalendar(day.date);
      }
    }
    this._store.dispatch(this._actions.selectRange(this._rangeStack));
    if (this._rangeStack.length === 2) {
      this._rangeStack = [];
    }
  }
  ngOnDestroy() {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
    this.selectedTimeSub.unsubscribe();
    this._effects?.destroy();
  }
  setRangeOnCalendar(dates) {
    if (dates) {
      this._rangeStack = dates.value instanceof Date ? [dates.value] : dates.value;
    }
    this._store.dispatch(this._actions.selectRange(this._rangeStack));
  }
  setMaxDateRangeOnCalendar(currentSelection) {
    let maxDateRange = new Date(currentSelection);
    if (this._config.maxDate) {
      const maxDateValueInMilliseconds = this._config.maxDate.getTime();
      const maxDateRangeInMilliseconds = currentSelection.getTime() + (this._config.maxDateRange || 0) * dayInMilliseconds;
      maxDateRange = maxDateRangeInMilliseconds > maxDateValueInMilliseconds ? new Date(this._config.maxDate) : new Date(maxDateRangeInMilliseconds);
    } else {
      maxDateRange.setDate(currentSelection.getDate() + (this._config.maxDateRange || 0));
    }
    this._effects?.setMaxDate(maxDateRange);
  }
  static {
    this.ɵfac = function BsDaterangepickerContainerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDaterangepickerContainerComponent)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(BsDatepickerConfig), ɵɵdirectiveInject(BsDatepickerStore), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(BsDatepickerActions), ɵɵdirectiveInject(BsDatepickerEffects), ɵɵdirectiveInject(PositioningService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsDaterangepickerContainerComponent,
      selectors: [["bs-daterangepicker-container"]],
      viewQuery: function BsDaterangepickerContainerComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c3, 5);
          ɵɵviewQuery(_c4, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.startTimepicker = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.endTimepicker = _t.first);
        }
      },
      hostAttrs: ["role", "dialog", "aria-label", "calendar", 1, "bottom"],
      hostVars: 2,
      hostBindings: function BsDaterangepickerContainerComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function BsDaterangepickerContainerComponent_click_HostBindingHandler($event) {
            return ctx._stopPropagation($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("disabled", ctx.isDatepickerDisabled)("readonly", ctx.isDatepickerReadonly);
        }
      },
      features: [ɵɵProvidersFeature([BsDatepickerStore, BsDatepickerEffects, BsDatepickerActions, PositioningService]), ɵɵInheritDefinitionFeature],
      decls: 2,
      vars: 3,
      consts: [["startTP", ""], ["endTP", ""], ["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"], [1, "bs-datepicker", 3, "ngClass"], [1, "bs-datepicker-container"], ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "bs-media-container", 4, "ngSwitchCase"], ["class", "bs-datepicker-buttons", 4, "ngIf"], ["class", "bs-datepicker-custom-range", 4, "ngIf"], [1, "bs-media-container"], [3, "bs-datepicker-multiple", "calendar", "isDisabled", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"], ["class", "bs-timepicker-in-datepicker-container", 4, "ngIf"], [3, "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", "calendar", "isDisabled", "options"], [1, "bs-timepicker-in-datepicker-container"], [3, "disabled"], [3, "disabled", 4, "ngIf"], [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"], [3, "onNavigate", "onViewMode", "onHover", "onSelect", "calendar"], [1, "bs-datepicker-buttons"], ["type", "button", 1, "btn", "btn-success"], ["type", "button", 1, "btn", "btn-default"], ["class", "btn-today-wrapper", 3, "today-left", "today-right", "today-center", 4, "ngIf"], ["class", "btn-clear-wrapper", 3, "clear-left", "clear-right", "clear-center", 4, "ngIf"], [1, "btn-today-wrapper"], [1, "btn", "btn-success", 3, "click"], [1, "btn-clear-wrapper"], [1, "bs-datepicker-custom-range"], [3, "onSelect", "selectedRange", "ranges", "customRangeLabel"]],
      template: function BsDaterangepickerContainerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, BsDaterangepickerContainerComponent_div_0_Template, 10, 11, "div", 2);
          ɵɵpipe(1, "async");
        }
        if (rf & 2) {
          ɵɵproperty("ngIf", ɵɵpipeBind1(1, 1, ctx.viewMode));
        }
      },
      dependencies: [NgIf, NgClass, NgSwitch, NgSwitchCase, NgForOf, BsDaysCalendarViewComponent, TimepickerModule, TimepickerComponent, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent, AsyncPipe],
      encapsulation: 2,
      data: {
        animation: [datepickerAnimation]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDaterangepickerContainerComponent, [{
    type: Component,
    args: [{
      selector: "bs-daterangepicker-container",
      providers: [BsDatepickerStore, BsDatepickerEffects, BsDatepickerActions, PositioningService],
      host: {
        class: "bottom",
        "(click)": "_stopPropagation($event)",
        role: "dialog",
        "aria-label": "calendar"
      },
      animations: [datepickerAnimation],
      standalone: true,
      imports: [NgIf, NgClass, NgSwitch, NgSwitchCase, NgForOf, BsDaysCalendarViewComponent, TimepickerModule, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent, AsyncPipe],
      template: `<!-- days calendar view mode -->
<div class="bs-datepicker" [ngClass]="containerClass" *ngIf="viewMode | async">
  <div class="bs-datepicker-container"
    [@datepickerAnimation]="animationState"
    (@datepickerAnimation.done)="positionServiceEnable()">
    <!--calendars-->
    <div class="bs-calendar-container" [ngSwitch]="viewMode | async" role="application">
      <!--days calendar-->
      <ng-container *ngSwitchCase="'day'">
        <div class="bs-media-container">
          <bs-days-calendar-view
            *ngFor="let calendar of daysCalendar$ | async"
            [class.bs-datepicker-multiple]="multipleCalendars"
            [calendar]="calendar"
            [isDisabled]="isDatePickerDisabled"
            [options]="options$ | async"
            (onNavigate)="navigateTo($event)"
            (onViewMode)="setViewMode($event)"
            (onHover)="dayHoverHandler($event)"
            (onHoverWeek)="weekHoverHandler($event)"
            (onSelect)="daySelectHandler($event)">
          </bs-days-calendar-view>
        </div>
        <div *ngIf="withTimepicker" class="bs-timepicker-in-datepicker-container">
          <timepicker #startTP [disabled]="isDatePickerDisabled"></timepicker>
          <timepicker #endTP *ngIf="isRangePicker" [disabled]="isDatePickerDisabled"></timepicker>
        </div>
      </ng-container>

      <!--months calendar-->
      <div *ngSwitchCase="'month'" class="bs-media-container">
        <bs-month-calendar-view
          *ngFor="let calendar of monthsCalendar | async"
          [class.bs-datepicker-multiple]="multipleCalendars"
          [calendar]="calendar"
          (onNavigate)="navigateTo($event)"
          (onViewMode)="setViewMode($event)"
          (onHover)="monthHoverHandler($event)"
          (onSelect)="monthSelectHandler($event)">
        </bs-month-calendar-view>
      </div>

      <!--years calendar-->
      <div *ngSwitchCase="'year'" class="bs-media-container">
        <bs-years-calendar-view
          *ngFor="let calendar of yearsCalendar | async"
          [class.bs-datepicker-multiple]="multipleCalendars"
          [calendar]="calendar"
          (onNavigate)="navigateTo($event)"
          (onViewMode)="setViewMode($event)"
          (onHover)="yearHoverHandler($event)"
          (onSelect)="yearSelectHandler($event)">
        </bs-years-calendar-view>
      </div>
    </div>

    <!--applycancel buttons-->
    <div class="bs-datepicker-buttons" *ngIf="false">
      <button class="btn btn-success" type="button">Apply</button>
      <button class="btn btn-default" type="button">Cancel</button>
    </div>

    <div class="bs-datepicker-buttons" *ngIf="showTodayBtn || showClearBtn">
      <div class="btn-today-wrapper"
           [class.today-left]="todayPos === 'left'"
           [class.today-right]="todayPos === 'right'"
           [class.today-center]="todayPos === 'center'"
           *ngIf="showTodayBtn">
        <button class="btn btn-success" (click)="setToday()">{{todayBtnLbl}}</button>
      </div>

        <div class="btn-clear-wrapper"
        [class.clear-left]="clearPos === 'left'"
        [class.clear-right]="clearPos === 'right'"
        [class.clear-center]="clearPos === 'center'"
        *ngIf="showClearBtn">
          <button class="btn btn-success" (click)="clearDate()">{{clearBtnLbl}}</button>
        </div>
    </div>

  </div>

  <!--custom dates or date ranges picker-->
  <div class="bs-datepicker-custom-range" *ngIf="customRanges && customRanges.length > 0">
    <bs-custom-date-view
      [selectedRange]="chosenRange"
      [ranges]="customRanges"
      [customRangeLabel]="customRangeBtnLbl"
      (onSelect)="setRangeOnCalendar($event)">
    </bs-custom-date-view>
  </div>
</div>
`
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: BsDatepickerConfig
  }, {
    type: BsDatepickerStore
  }, {
    type: ElementRef
  }, {
    type: BsDatepickerActions
  }, {
    type: BsDatepickerEffects
  }, {
    type: PositioningService
  }], {
    startTimepicker: [{
      type: ViewChild,
      args: ["startTP"]
    }],
    endTimepicker: [{
      type: ViewChild,
      args: ["endTP"]
    }],
    isDatepickerDisabled: [{
      type: HostBinding,
      args: ["attr.disabled"]
    }],
    isDatepickerReadonly: [{
      type: HostBinding,
      args: ["attr.readonly"]
    }]
  });
})();
var BsDaterangepickerInlineContainerComponent = class _BsDaterangepickerInlineContainerComponent extends BsDaterangepickerContainerComponent {
  get disabledValue() {
    return this.isDatePickerDisabled ? "" : null;
  }
  get readonlyValue() {
    return this.isDatePickerDisabled ? "" : null;
  }
  constructor(_renderer, _config, _store, _element, _actions, _effects, _positioningService) {
    super(_renderer, _config, _store, _element, _actions, _effects, _positioningService);
    _renderer.setStyle(_element.nativeElement, "display", "inline-block");
    _renderer.setStyle(_element.nativeElement, "position", "static");
  }
  static {
    this.ɵfac = function BsDaterangepickerInlineContainerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDaterangepickerInlineContainerComponent)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(BsDatepickerConfig), ɵɵdirectiveInject(BsDatepickerStore), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(BsDatepickerActions), ɵɵdirectiveInject(BsDatepickerEffects), ɵɵdirectiveInject(PositioningService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BsDaterangepickerInlineContainerComponent,
      selectors: [["bs-daterangepicker-inline-container"]],
      hostVars: 2,
      hostBindings: function BsDaterangepickerInlineContainerComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function BsDaterangepickerInlineContainerComponent_click_HostBindingHandler($event) {
            return ctx._stopPropagation($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("disabled", ctx.disabledValue)("readonly", ctx.readonlyValue);
        }
      },
      features: [ɵɵProvidersFeature([BsDatepickerStore, BsDatepickerEffects, BsDatepickerActions, PositioningService]), ɵɵInheritDefinitionFeature],
      decls: 2,
      vars: 3,
      consts: [["startTP", ""], ["endTP", ""], ["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"], [1, "bs-datepicker", 3, "ngClass"], [1, "bs-datepicker-container"], ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "bs-media-container", 4, "ngSwitchCase"], ["class", "bs-datepicker-buttons", 4, "ngIf"], ["class", "bs-datepicker-custom-range", 4, "ngIf"], [1, "bs-media-container"], [3, "bs-datepicker-multiple", "calendar", "isDisabled", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"], ["class", "bs-timepicker-in-datepicker-container", 4, "ngIf"], [3, "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", "calendar", "isDisabled", "options"], [1, "bs-timepicker-in-datepicker-container"], [3, "disabled"], [3, "disabled", 4, "ngIf"], [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"], [3, "onNavigate", "onViewMode", "onHover", "onSelect", "calendar"], [1, "bs-datepicker-buttons"], ["type", "button", 1, "btn", "btn-success"], ["type", "button", 1, "btn", "btn-default"], ["class", "btn-today-wrapper", 3, "today-left", "today-right", "today-center", 4, "ngIf"], ["class", "btn-clear-wrapper", 3, "clear-left", "clear-right", "clear-center", 4, "ngIf"], [1, "btn-today-wrapper"], [1, "btn", "btn-success", 3, "click"], [1, "btn-clear-wrapper"], [1, "bs-datepicker-custom-range"], [3, "onSelect", "selectedRange", "ranges", "customRangeLabel"]],
      template: function BsDaterangepickerInlineContainerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, BsDaterangepickerInlineContainerComponent_div_0_Template, 10, 11, "div", 2);
          ɵɵpipe(1, "async");
        }
        if (rf & 2) {
          ɵɵproperty("ngIf", ɵɵpipeBind1(1, 1, ctx.viewMode));
        }
      },
      dependencies: [NgIf, NgClass, NgSwitch, NgSwitchCase, NgForOf, BsDaysCalendarViewComponent, TimepickerModule, TimepickerComponent, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent, AsyncPipe],
      encapsulation: 2,
      data: {
        animation: [datepickerAnimation]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDaterangepickerInlineContainerComponent, [{
    type: Component,
    args: [{
      selector: "bs-daterangepicker-inline-container",
      providers: [BsDatepickerStore, BsDatepickerEffects, BsDatepickerActions, PositioningService],
      host: {
        "(click)": "_stopPropagation($event)"
      },
      animations: [datepickerAnimation],
      standalone: true,
      imports: [NgIf, NgClass, NgSwitch, NgSwitchCase, NgForOf, BsDaysCalendarViewComponent, TimepickerModule, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent, AsyncPipe],
      template: `<!-- days calendar view mode -->
<div class="bs-datepicker" [ngClass]="containerClass" *ngIf="viewMode | async">
  <div class="bs-datepicker-container"
    [@datepickerAnimation]="animationState"
    (@datepickerAnimation.done)="positionServiceEnable()">
    <!--calendars-->
    <div class="bs-calendar-container" [ngSwitch]="viewMode | async" role="application">
      <!--days calendar-->
      <ng-container *ngSwitchCase="'day'">
        <div class="bs-media-container">
          <bs-days-calendar-view
            *ngFor="let calendar of daysCalendar$ | async"
            [class.bs-datepicker-multiple]="multipleCalendars"
            [calendar]="calendar"
            [isDisabled]="isDatePickerDisabled"
            [options]="options$ | async"
            (onNavigate)="navigateTo($event)"
            (onViewMode)="setViewMode($event)"
            (onHover)="dayHoverHandler($event)"
            (onHoverWeek)="weekHoverHandler($event)"
            (onSelect)="daySelectHandler($event)">
          </bs-days-calendar-view>
        </div>
        <div *ngIf="withTimepicker" class="bs-timepicker-in-datepicker-container">
          <timepicker #startTP [disabled]="isDatePickerDisabled"></timepicker>
          <timepicker #endTP *ngIf="isRangePicker" [disabled]="isDatePickerDisabled"></timepicker>
        </div>
      </ng-container>

      <!--months calendar-->
      <div *ngSwitchCase="'month'" class="bs-media-container">
        <bs-month-calendar-view
          *ngFor="let calendar of monthsCalendar | async"
          [class.bs-datepicker-multiple]="multipleCalendars"
          [calendar]="calendar"
          (onNavigate)="navigateTo($event)"
          (onViewMode)="setViewMode($event)"
          (onHover)="monthHoverHandler($event)"
          (onSelect)="monthSelectHandler($event)">
        </bs-month-calendar-view>
      </div>

      <!--years calendar-->
      <div *ngSwitchCase="'year'" class="bs-media-container">
        <bs-years-calendar-view
          *ngFor="let calendar of yearsCalendar | async"
          [class.bs-datepicker-multiple]="multipleCalendars"
          [calendar]="calendar"
          (onNavigate)="navigateTo($event)"
          (onViewMode)="setViewMode($event)"
          (onHover)="yearHoverHandler($event)"
          (onSelect)="yearSelectHandler($event)">
        </bs-years-calendar-view>
      </div>
    </div>

    <!--applycancel buttons-->
    <div class="bs-datepicker-buttons" *ngIf="false">
      <button class="btn btn-success" type="button">Apply</button>
      <button class="btn btn-default" type="button">Cancel</button>
    </div>

    <div class="bs-datepicker-buttons" *ngIf="showTodayBtn || showClearBtn">
      <div class="btn-today-wrapper"
           [class.today-left]="todayPos === 'left'"
           [class.today-right]="todayPos === 'right'"
           [class.today-center]="todayPos === 'center'"
           *ngIf="showTodayBtn">
        <button class="btn btn-success" (click)="setToday()">{{todayBtnLbl}}</button>
      </div>

        <div class="btn-clear-wrapper"
        [class.clear-left]="clearPos === 'left'"
        [class.clear-right]="clearPos === 'right'"
        [class.clear-center]="clearPos === 'center'"
        *ngIf="showClearBtn">
          <button class="btn btn-success" (click)="clearDate()">{{clearBtnLbl}}</button>
        </div>
    </div>

  </div>

  <!--custom dates or date ranges picker-->
  <div class="bs-datepicker-custom-range" *ngIf="customRanges && customRanges.length > 0">
    <bs-custom-date-view
      [selectedRange]="chosenRange"
      [ranges]="customRanges"
      [customRangeLabel]="customRangeBtnLbl"
      (onSelect)="setRangeOnCalendar($event)">
    </bs-custom-date-view>
  </div>
</div>
`
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: BsDatepickerConfig
  }, {
    type: BsDatepickerStore
  }, {
    type: ElementRef
  }, {
    type: BsDatepickerActions
  }, {
    type: BsDatepickerEffects
  }, {
    type: PositioningService
  }], {
    disabledValue: [{
      type: HostBinding,
      args: ["attr.disabled"]
    }],
    readonlyValue: [{
      type: HostBinding,
      args: ["attr.readonly"]
    }]
  });
})();
var BsDaterangepickerInlineDirective = class _BsDaterangepickerInlineDirective {
  /**
   * Initial value of datepicker
   */
  set bsValue(value) {
    if (this._bsValue === value) {
      return;
    }
    if (value && this.bsConfig?.initCurrentTime) {
      value = setDateRangesCurrentTimeOnDateSelect(value);
    }
    this._bsValue = value;
    this.bsValueChange.emit(value);
  }
  constructor(_config, _elementRef, _renderer, _viewContainerRef, cis) {
    this._config = _config;
    this._elementRef = _elementRef;
    this.isDisabled = false;
    this.bsValueChange = new EventEmitter();
    this._subs = [];
    Object.assign(this, this._config);
    this._datepicker = cis.createLoader(_elementRef, _viewContainerRef, _renderer);
  }
  ngOnInit() {
    this.setConfig();
    this.initSubscribes();
  }
  ngOnChanges(changes) {
    if (changes["bsConfig"]) {
      if (changes["bsConfig"].currentValue.initCurrentTime && changes["bsConfig"].currentValue.initCurrentTime !== changes["bsConfig"].previousValue.initCurrentTime && this._bsValue) {
        this._bsValue = setDateRangesCurrentTimeOnDateSelect(this._bsValue);
        this.bsValueChange.emit(this._bsValue);
      }
    }
    if (!this._datepickerRef || !this._datepickerRef.instance) {
      return;
    }
    if (changes["minDate"]) {
      this._datepickerRef.instance.minDate = this.minDate;
    }
    if (changes["maxDate"]) {
      this._datepickerRef.instance.maxDate = this.maxDate;
    }
    if (changes["datesEnabled"]) {
      this._datepickerRef.instance.datesEnabled = this.datesEnabled;
      this._datepickerRef.instance.value = this._bsValue;
    }
    if (changes["datesDisabled"]) {
      this._datepickerRef.instance.datesDisabled = this.datesDisabled;
    }
    if (changes["daysDisabled"]) {
      this._datepickerRef.instance.daysDisabled = this.daysDisabled;
    }
    if (changes["isDisabled"]) {
      this._datepickerRef.instance.isDisabled = this.isDisabled;
    }
    if (changes["dateCustomClasses"]) {
      this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
    }
    this.setConfig();
  }
  /**
   * Set config for datepicker
   */
  setConfig() {
    if (this._datepicker) {
      this._datepicker.hide();
    }
    this._config = Object.assign({}, this._config, this.bsConfig, {
      value: checkBsValue(this._bsValue, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
      isDisabled: this.isDisabled,
      minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
      maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
      daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
      dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
      datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
      datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
      ranges: checkRangesWithMaxDate(this.bsConfig && this.bsConfig.ranges, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
      maxDateRange: this.bsConfig && this.bsConfig.maxDateRange,
      initCurrentTime: this.bsConfig?.initCurrentTime
    });
    this._datepickerRef = this._datepicker.provide({
      provide: BsDatepickerConfig,
      useValue: this._config
    }).attach(BsDaterangepickerInlineContainerComponent).to(this._elementRef).show();
    this.initSubscribes();
  }
  initSubscribes() {
    this.unsubscribeSubscriptions();
    this._subs.push(this.bsValueChange.subscribe((value) => {
      if (this._datepickerRef) {
        this._datepickerRef.instance.value = value;
      }
    }));
    if (this._datepickerRef) {
      this._subs.push(this._datepickerRef.instance.valueChange.pipe(filter((range) => range && range[0] && !!range[1])).subscribe((value) => {
        this.bsValue = value;
      }));
    }
  }
  unsubscribeSubscriptions() {
    if (this._subs?.length) {
      this._subs.map((sub) => sub.unsubscribe());
      this._subs.length = 0;
    }
  }
  ngOnDestroy() {
    this._datepicker.dispose();
    this.unsubscribeSubscriptions();
  }
  static {
    this.ɵfac = function BsDaterangepickerInlineDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDaterangepickerInlineDirective)(ɵɵdirectiveInject(BsDaterangepickerInlineConfig), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ComponentLoaderFactory));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BsDaterangepickerInlineDirective,
      selectors: [["bs-daterangepicker-inline"]],
      inputs: {
        bsValue: "bsValue",
        bsConfig: "bsConfig",
        isDisabled: "isDisabled",
        minDate: "minDate",
        maxDate: "maxDate",
        dateCustomClasses: "dateCustomClasses",
        daysDisabled: "daysDisabled",
        datesDisabled: "datesDisabled",
        datesEnabled: "datesEnabled"
      },
      outputs: {
        bsValueChange: "bsValueChange"
      },
      exportAs: ["bsDaterangepickerInline"],
      features: [ɵɵProvidersFeature([ComponentLoaderFactory]), ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDaterangepickerInlineDirective, [{
    type: Directive,
    args: [{
      selector: "bs-daterangepicker-inline",
      exportAs: "bsDaterangepickerInline",
      standalone: true,
      providers: [ComponentLoaderFactory]
    }]
  }], () => [{
    type: BsDaterangepickerInlineConfig
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: ViewContainerRef
  }, {
    type: ComponentLoaderFactory
  }], {
    bsValue: [{
      type: Input
    }],
    bsConfig: [{
      type: Input
    }],
    isDisabled: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    dateCustomClasses: [{
      type: Input
    }],
    daysDisabled: [{
      type: Input
    }],
    datesDisabled: [{
      type: Input
    }],
    datesEnabled: [{
      type: Input
    }],
    bsValueChange: [{
      type: Output
    }]
  });
})();
var BS_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BsDatepickerInputDirective),
  multi: true
};
var BS_DATEPICKER_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => BsDatepickerInputDirective),
  multi: true
};
var BsDatepickerInputDirective = class _BsDatepickerInputDirective {
  constructor(_picker, _localeService, _renderer, _elRef, changeDetection) {
    this._picker = _picker;
    this._localeService = _localeService;
    this._renderer = _renderer;
    this._elRef = _elRef;
    this.changeDetection = changeDetection;
    this._onChange = Function.prototype;
    this._onTouched = Function.prototype;
    this._validatorChange = Function.prototype;
    this._subs = new Subscription();
  }
  onChange(event) {
    this.writeValue(event.target.value);
    this._onChange(this._value);
    if (this._picker._config.returnFocusToInput) {
      this._renderer.selectRootElement(this._elRef.nativeElement).focus();
    }
    this._onTouched();
  }
  onBlur() {
    this._onTouched();
  }
  hide() {
    this._picker.hide();
    this._renderer.selectRootElement(this._elRef.nativeElement).blur();
    if (this._picker._config.returnFocusToInput) {
      this._renderer.selectRootElement(this._elRef.nativeElement).focus();
    }
  }
  ngOnInit() {
    const setBsValue = (value) => {
      this._setInputValue(value);
      if (this._value !== value) {
        this._value = value;
        this._onChange(value);
        this._onTouched();
      }
      this.changeDetection.markForCheck();
    };
    if (this._picker._bsValue) {
      setBsValue(this._picker._bsValue);
    }
    this._subs.add(this._picker.bsValueChange.subscribe(setBsValue));
    this._subs.add(this._localeService.localeChange.subscribe(() => {
      this._setInputValue(this._value);
    }));
    this._subs.add(this._picker.dateInputFormat$.pipe(distinctUntilChanged()).subscribe(() => {
      this._setInputValue(this._value);
    }));
  }
  ngOnDestroy() {
    this._subs.unsubscribe();
  }
  _setInputValue(value) {
    const initialDate = !value ? "" : formatDate(value, this._picker._config.dateInputFormat, this._localeService.currentLocale);
    this._renderer.setProperty(this._elRef.nativeElement, "value", initialDate);
  }
  validate(c) {
    const _value = c.value;
    if (_value === null || _value === void 0 || _value === "") {
      return null;
    }
    if (isDate(_value)) {
      const _isDateValid = isDateValid(_value);
      if (!_isDateValid) {
        return {
          bsDate: {
            invalid: _value
          }
        };
      }
      if (this._picker && this._picker.minDate && isBefore(_value, this._picker.minDate, "date")) {
        this.writeValue(this._picker.minDate);
        return this._picker.ignoreMinMaxErrors ? null : {
          bsDate: {
            minDate: this._picker.minDate
          }
        };
      }
      if (this._picker && this._picker.maxDate && isAfter(_value, this._picker.maxDate, "date")) {
        this.writeValue(this._picker.maxDate);
        return this._picker.ignoreMinMaxErrors ? null : {
          bsDate: {
            maxDate: this._picker.maxDate
          }
        };
      }
    }
    return null;
  }
  registerOnValidatorChange(fn) {
    this._validatorChange = fn;
  }
  writeValue(value) {
    if (!value) {
      this._value = void 0;
    } else {
      const _localeKey = this._localeService.currentLocale;
      const _locale = getLocale(_localeKey);
      if (!_locale) {
        throw new Error(`Locale "${_localeKey}" is not defined, please add it with "defineLocale(...)"`);
      }
      this._value = parseDate(value, this._picker._config.dateInputFormat, this._localeService.currentLocale);
      if (this._picker._config.useUtc) {
        const utcValue = utcAsLocal(this._value);
        this._value = utcValue === null ? void 0 : utcValue;
      }
    }
    this._picker.bsValue = this._value;
  }
  setDisabledState(isDisabled) {
    this._picker.isDisabled = isDisabled;
    if (isDisabled) {
      this._renderer.setAttribute(this._elRef.nativeElement, "disabled", "disabled");
      return;
    }
    this._renderer.removeAttribute(this._elRef.nativeElement, "disabled");
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  static {
    this.ɵfac = function BsDatepickerInputDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerInputDirective)(ɵɵdirectiveInject(BsDatepickerDirective, 1), ɵɵdirectiveInject(BsLocaleService), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BsDatepickerInputDirective,
      selectors: [["input", "bsDatepicker", ""]],
      hostBindings: function BsDatepickerInputDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("change", function BsDatepickerInputDirective_change_HostBindingHandler($event) {
            return ctx.onChange($event);
          })("blur", function BsDatepickerInputDirective_blur_HostBindingHandler() {
            return ctx.onBlur();
          })("keyup.esc", function BsDatepickerInputDirective_keyup_esc_HostBindingHandler() {
            return ctx.hide();
          })("keydown.enter", function BsDatepickerInputDirective_keydown_enter_HostBindingHandler() {
            return ctx.hide();
          });
        }
      },
      features: [ɵɵProvidersFeature([BS_DATEPICKER_VALUE_ACCESSOR, BS_DATEPICKER_VALIDATOR])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerInputDirective, [{
    type: Directive,
    args: [{
      selector: `input[bsDatepicker]`,
      providers: [BS_DATEPICKER_VALUE_ACCESSOR, BS_DATEPICKER_VALIDATOR],
      standalone: true
    }]
  }], () => [{
    type: BsDatepickerDirective,
    decorators: [{
      type: Host
    }]
  }, {
    type: BsLocaleService
  }, {
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], {
    onChange: [{
      type: HostListener,
      args: ["change", ["$event"]]
    }],
    onBlur: [{
      type: HostListener,
      args: ["blur"]
    }],
    hide: [{
      type: HostListener,
      args: ["keyup.esc"]
    }, {
      type: HostListener,
      args: ["keydown.enter"]
    }]
  });
})();
var BsDaterangepickerConfig = class _BsDaterangepickerConfig extends BsDatepickerConfig {
  constructor() {
    super(...arguments);
    this.displayMonths = 2;
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵBsDaterangepickerConfig_BaseFactory;
      return function BsDaterangepickerConfig_Factory(__ngFactoryType__) {
        return (ɵBsDaterangepickerConfig_BaseFactory || (ɵBsDaterangepickerConfig_BaseFactory = ɵɵgetInheritedFactory(_BsDaterangepickerConfig)))(__ngFactoryType__ || _BsDaterangepickerConfig);
      };
    })();
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BsDaterangepickerConfig,
      factory: _BsDaterangepickerConfig.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDaterangepickerConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var previousDate;
var BsDaterangepickerDirective = class _BsDaterangepickerDirective {
  /**
   * Returns whether or not the daterangepicker is currently being shown
   */
  get isOpen() {
    return this._datepicker.isShown;
  }
  set isOpen(value) {
    this.isOpen$.next(value);
  }
  /**
   * Initial value of daterangepicker
   */
  set bsValue(value) {
    if (this._bsValue === value) {
      return;
    }
    if (value && this.bsConfig?.initCurrentTime) {
      value = setDateRangesCurrentTimeOnDateSelect(value);
    }
    this.initPreviousValue();
    this._bsValue = value;
    this.bsValueChange.emit(value);
  }
  get isDatepickerReadonly() {
    return this.isDisabled ? "" : null;
  }
  get rangeInputFormat$() {
    return this._rangeInputFormat$;
  }
  constructor(_config, _elementRef, _renderer, _viewContainerRef, cis) {
    this._config = _config;
    this._elementRef = _elementRef;
    this._renderer = _renderer;
    this.placement = "bottom";
    this.triggers = "click";
    this.outsideClick = true;
    this.container = "body";
    this.outsideEsc = true;
    this.isDestroy$ = new Subject();
    this.isDisabled = false;
    this.bsValueChange = new EventEmitter();
    this._subs = [];
    this._rangeInputFormat$ = new Subject();
    this._datepicker = cis.createLoader(_elementRef, _viewContainerRef, _renderer);
    Object.assign(this, _config);
    this.onShown = this._datepicker.onShown;
    this.onHidden = this._datepicker.onHidden;
    this.isOpen$ = new BehaviorSubject(this.isOpen);
  }
  ngOnInit() {
    this.isDestroy$ = new Subject();
    this._datepicker.listen({
      outsideClick: this.outsideClick,
      outsideEsc: this.outsideEsc,
      triggers: this.triggers,
      show: () => this.show()
    });
    this.initPreviousValue();
    this.setConfig();
  }
  ngOnChanges(changes) {
    if (changes["bsConfig"]) {
      if (changes["bsConfig"].currentValue?.initCurrentTime && changes["bsConfig"].currentValue?.initCurrentTime !== changes["bsConfig"].previousValue?.initCurrentTime && this._bsValue) {
        this.initPreviousValue();
        this._bsValue = setDateRangesCurrentTimeOnDateSelect(this._bsValue);
        this.bsValueChange.emit(this._bsValue);
      }
      this.setConfig();
      this._rangeInputFormat$.next(changes["bsConfig"].currentValue && changes["bsConfig"].currentValue.rangeInputFormat);
    }
    if (!this._datepickerRef || !this._datepickerRef.instance) {
      return;
    }
    if (changes["minDate"]) {
      this._datepickerRef.instance.minDate = this.minDate;
    }
    if (changes["maxDate"]) {
      this._datepickerRef.instance.maxDate = this.maxDate;
    }
    if (changes["datesDisabled"]) {
      this._datepickerRef.instance.datesDisabled = this.datesDisabled;
    }
    if (changes["datesEnabled"]) {
      this._datepickerRef.instance.datesEnabled = this.datesEnabled;
    }
    if (changes["daysDisabled"]) {
      this._datepickerRef.instance.daysDisabled = this.daysDisabled;
    }
    if (changes["isDisabled"]) {
      this._datepickerRef.instance.isDisabled = this.isDisabled;
    }
    if (changes["dateCustomClasses"]) {
      this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
    }
  }
  ngAfterViewInit() {
    this.isOpen$.pipe(filter((isOpen) => isOpen !== this.isOpen), takeUntil(this.isDestroy$)).subscribe(() => this.toggle());
  }
  /**
   * Opens an element’s datepicker. This is considered a “manual” triggering of
   * the datepicker.
   */
  show() {
    if (this._datepicker.isShown) {
      return;
    }
    this.setConfig();
    this._datepickerRef = this._datepicker.provide({
      provide: BsDatepickerConfig,
      useValue: this._config
    }).attach(BsDaterangepickerContainerComponent).to(this.container).position({
      attachment: this.placement
    }).show({
      placement: this.placement
    });
    this.initSubscribes();
  }
  initSubscribes() {
    this._subs.push(this.bsValueChange.subscribe((value) => {
      if (this._datepickerRef) {
        this._datepickerRef.instance.value = value;
      }
    }));
    if (this._datepickerRef) {
      this._subs.push(this._datepickerRef.instance.valueChange.pipe(filter((range) => range && range[0] && !!range[1])).subscribe((value) => {
        this.initPreviousValue();
        this.bsValue = value;
        if (this.keepDatepickerModalOpened()) {
          return;
        }
        this.hide();
      }));
    }
  }
  initPreviousValue() {
    previousDate = this._bsValue;
  }
  keepDatepickerModalOpened() {
    if (!previousDate || !this.bsConfig?.keepDatepickerOpened || !this._config.withTimepicker) {
      return false;
    }
    return this.isDateSame();
  }
  isDateSame() {
    return this._bsValue?.[0]?.getDate() === previousDate?.[0]?.getDate() && this._bsValue?.[0]?.getMonth() === previousDate?.[0]?.getMonth() && this._bsValue?.[0]?.getFullYear() === previousDate?.[0]?.getFullYear() && this._bsValue?.[1]?.getDate() === previousDate?.[1]?.getDate() && this._bsValue?.[1]?.getMonth() === previousDate?.[1]?.getMonth() && this._bsValue?.[1]?.getFullYear() === previousDate?.[1]?.getFullYear();
  }
  /**
   * Set config for daterangepicker
   */
  setConfig() {
    this._config = Object.assign({}, this._config, this.bsConfig, {
      value: this.bsConfig?.keepDatesOutOfRules ? this._bsValue : checkBsValue(this._bsValue, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
      isDisabled: this.isDisabled,
      minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
      maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
      daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
      dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
      datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
      datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
      ranges: checkRangesWithMaxDate(this.bsConfig && this.bsConfig.ranges, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
      maxDateRange: this.bsConfig && this.bsConfig.maxDateRange,
      initCurrentTime: this.bsConfig?.initCurrentTime,
      keepDatepickerOpened: this.bsConfig?.keepDatepickerOpened,
      keepDatesOutOfRules: this.bsConfig?.keepDatesOutOfRules
    });
  }
  /**
   * Closes an element’s datepicker. This is considered a “manual” triggering of
   * the datepicker.
   */
  hide() {
    if (this.isOpen) {
      this._datepicker.hide();
    }
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
    if (this._config.returnFocusToInput) {
      this._renderer.selectRootElement(this._elementRef.nativeElement).focus();
    }
  }
  /**
   * Toggles an element’s datepicker. This is considered a “manual” triggering
   * of the datepicker.
   */
  toggle() {
    if (this.isOpen) {
      return this.hide();
    }
    this.show();
  }
  unsubscribeSubscriptions() {
    if (this._subs?.length) {
      this._subs.map((sub) => sub.unsubscribe());
      this._subs.length = 0;
    }
  }
  ngOnDestroy() {
    this._datepicker.dispose();
    this.isOpen$.next(false);
    if (this.isDestroy$) {
      this.isDestroy$.next(null);
      this.isDestroy$.complete();
    }
    this.unsubscribeSubscriptions();
  }
  static {
    this.ɵfac = function BsDaterangepickerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDaterangepickerDirective)(ɵɵdirectiveInject(BsDaterangepickerConfig), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ComponentLoaderFactory));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BsDaterangepickerDirective,
      selectors: [["", "bsDaterangepicker", ""]],
      hostVars: 1,
      hostBindings: function BsDaterangepickerDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("readonly", ctx.isDatepickerReadonly);
        }
      },
      inputs: {
        placement: "placement",
        triggers: "triggers",
        outsideClick: "outsideClick",
        container: "container",
        outsideEsc: "outsideEsc",
        isOpen: "isOpen",
        bsValue: "bsValue",
        bsConfig: "bsConfig",
        isDisabled: "isDisabled",
        minDate: "minDate",
        maxDate: "maxDate",
        dateCustomClasses: "dateCustomClasses",
        daysDisabled: "daysDisabled",
        datesDisabled: "datesDisabled",
        datesEnabled: "datesEnabled"
      },
      outputs: {
        onShown: "onShown",
        onHidden: "onHidden",
        bsValueChange: "bsValueChange"
      },
      exportAs: ["bsDaterangepicker"],
      features: [ɵɵProvidersFeature([ComponentLoaderFactory]), ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDaterangepickerDirective, [{
    type: Directive,
    args: [{
      selector: "[bsDaterangepicker]",
      exportAs: "bsDaterangepicker",
      standalone: true,
      providers: [ComponentLoaderFactory]
    }]
  }], () => [{
    type: BsDaterangepickerConfig
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: ViewContainerRef
  }, {
    type: ComponentLoaderFactory
  }], {
    placement: [{
      type: Input
    }],
    triggers: [{
      type: Input
    }],
    outsideClick: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    outsideEsc: [{
      type: Input
    }],
    isOpen: [{
      type: Input
    }],
    onShown: [{
      type: Output
    }],
    onHidden: [{
      type: Output
    }],
    bsValue: [{
      type: Input
    }],
    bsConfig: [{
      type: Input
    }],
    isDisabled: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    dateCustomClasses: [{
      type: Input
    }],
    daysDisabled: [{
      type: Input
    }],
    datesDisabled: [{
      type: Input
    }],
    datesEnabled: [{
      type: Input
    }],
    bsValueChange: [{
      type: Output
    }],
    isDatepickerReadonly: [{
      type: HostBinding,
      args: ["attr.readonly"]
    }]
  });
})();
var BS_DATERANGEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BsDaterangepickerInputDirective),
  multi: true
};
var BS_DATERANGEPICKER_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => BsDaterangepickerInputDirective),
  multi: true
};
var BsDaterangepickerInputDirective = class _BsDaterangepickerInputDirective {
  constructor(_picker, _localeService, _renderer, _elRef, changeDetection) {
    this._picker = _picker;
    this._localeService = _localeService;
    this._renderer = _renderer;
    this._elRef = _elRef;
    this.changeDetection = changeDetection;
    this._onChange = Function.prototype;
    this._onTouched = Function.prototype;
    this._validatorChange = Function.prototype;
    this._subs = new Subscription();
  }
  ngOnInit() {
    const setBsValue = (value) => {
      this._setInputValue(value);
      if (this._value !== value) {
        this._value = value;
        this._onChange(value);
        this._onTouched();
      }
      this.changeDetection.markForCheck();
    };
    if (this._picker._bsValue) {
      setBsValue(this._picker._bsValue);
    }
    this._subs.add(this._picker.bsValueChange.subscribe((value) => {
      this._setInputValue(value);
      if (this._value !== value) {
        this._value = value;
        this._onChange(value);
        this._onTouched();
      }
      this.changeDetection.markForCheck();
    }));
    this._subs.add(this._localeService.localeChange.subscribe(() => {
      this._setInputValue(this._value);
    }));
    this._subs.add(
      // update input value on format change
      this._picker.rangeInputFormat$.pipe(distinctUntilChanged()).subscribe(() => {
        this._setInputValue(this._value);
      })
    );
  }
  ngOnDestroy() {
    this._subs.unsubscribe();
  }
  onKeydownEvent(event) {
    if (event.keyCode === 13 || event.code === "Enter") {
      this.hide();
    }
  }
  _setInputValue(date) {
    let range = "";
    if (date) {
      const start = !date[0] ? "" : formatDate(date[0], this._picker._config.rangeInputFormat, this._localeService.currentLocale);
      const end = !date[1] ? "" : formatDate(date[1], this._picker._config.rangeInputFormat, this._localeService.currentLocale);
      range = start && end ? start + this._picker._config.rangeSeparator + end : "";
    }
    this._renderer.setProperty(this._elRef.nativeElement, "value", range);
  }
  onChange(event) {
    this.writeValue(event.target.value);
    this._onChange(this._value);
    if (this._picker._config.returnFocusToInput) {
      this._renderer.selectRootElement(this._elRef.nativeElement).focus();
    }
    this._onTouched();
  }
  validate(c) {
    let _value = c.value;
    const errors = [];
    if (_value === null || _value === void 0 || !isArray(_value)) {
      return null;
    }
    _value = _value.slice().sort((a, b) => a.getTime() - b.getTime());
    const _isFirstDateValid = isDateValid(_value[0]);
    const _isSecondDateValid = isDateValid(_value[1]);
    if (!_isFirstDateValid) {
      return {
        bsDate: {
          invalid: _value[0]
        }
      };
    }
    if (!_isSecondDateValid) {
      return {
        bsDate: {
          invalid: _value[1]
        }
      };
    }
    if (this._picker && this._picker.minDate && isBefore(_value[0], this._picker.minDate, "date")) {
      _value[0] = this._picker.minDate;
      errors.push({
        bsDate: {
          minDate: this._picker.minDate
        }
      });
    }
    if (this._picker && this._picker.maxDate && isAfter(_value[1], this._picker.maxDate, "date")) {
      _value[1] = this._picker.maxDate;
      errors.push({
        bsDate: {
          maxDate: this._picker.maxDate
        }
      });
    }
    if (errors.length > 0) {
      this.writeValue(_value);
      return errors;
    }
    return null;
  }
  registerOnValidatorChange(fn) {
    this._validatorChange = fn;
  }
  writeValue(value) {
    if (!value) {
      this._value = void 0;
    } else {
      const _localeKey = this._localeService.currentLocale;
      const _locale = getLocale(_localeKey);
      if (!_locale) {
        throw new Error(`Locale "${_localeKey}" is not defined, please add it with "defineLocale(...)"`);
      }
      let _input = [];
      if (typeof value === "string") {
        const trimmedSeparator = this._picker._config.rangeSeparator.trim();
        if (value.replace(/[^-]/g, "").length > 1) {
          _input = value.split(this._picker._config.rangeSeparator);
        } else {
          _input = value.split(trimmedSeparator.length > 0 ? trimmedSeparator : this._picker._config.rangeSeparator).map((_val) => _val.trim());
        }
      }
      if (Array.isArray(value)) {
        _input = value;
      }
      this._value = _input.map((_val) => {
        if (this._picker._config.useUtc) {
          return utcAsLocal(parseDate(_val, this._picker._config.rangeInputFormat, this._localeService.currentLocale));
        }
        return parseDate(_val, this._picker._config.rangeInputFormat, this._localeService.currentLocale);
      }).map((date) => isNaN(date.valueOf()) ? void 0 : date);
    }
    this._picker.bsValue = this._value;
  }
  setDisabledState(isDisabled) {
    this._picker.isDisabled = isDisabled;
    if (isDisabled) {
      this._renderer.setAttribute(this._elRef.nativeElement, "disabled", "disabled");
      return;
    }
    this._renderer.removeAttribute(this._elRef.nativeElement, "disabled");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn) {
    this._onChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  onBlur() {
    this._onTouched();
  }
  hide() {
    this._picker.hide();
    this._renderer.selectRootElement(this._elRef.nativeElement).blur();
    if (this._picker._config.returnFocusToInput) {
      this._renderer.selectRootElement(this._elRef.nativeElement).focus();
    }
  }
  static {
    this.ɵfac = function BsDaterangepickerInputDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDaterangepickerInputDirective)(ɵɵdirectiveInject(BsDaterangepickerDirective, 1), ɵɵdirectiveInject(BsLocaleService), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BsDaterangepickerInputDirective,
      selectors: [["input", "bsDaterangepicker", ""]],
      hostBindings: function BsDaterangepickerInputDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("change", function BsDaterangepickerInputDirective_change_HostBindingHandler($event) {
            return ctx.onChange($event);
          })("keyup.esc", function BsDaterangepickerInputDirective_keyup_esc_HostBindingHandler() {
            return ctx.hide();
          })("keydown", function BsDaterangepickerInputDirective_keydown_HostBindingHandler($event) {
            return ctx.onKeydownEvent($event);
          })("blur", function BsDaterangepickerInputDirective_blur_HostBindingHandler() {
            return ctx.onBlur();
          });
        }
      },
      features: [ɵɵProvidersFeature([BS_DATERANGEPICKER_VALUE_ACCESSOR, BS_DATERANGEPICKER_VALIDATOR])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDaterangepickerInputDirective, [{
    type: Directive,
    args: [{
      selector: `input[bsDaterangepicker]`,
      host: {
        "(change)": "onChange($event)",
        "(keyup.esc)": "hide()",
        "(keydown)": "onKeydownEvent($event)",
        "(blur)": "onBlur()"
      },
      providers: [BS_DATERANGEPICKER_VALUE_ACCESSOR, BS_DATERANGEPICKER_VALIDATOR],
      standalone: true
    }]
  }], () => [{
    type: BsDaterangepickerDirective,
    decorators: [{
      type: Host
    }]
  }, {
    type: BsLocaleService
  }, {
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var BsDatepickerModule = class _BsDatepickerModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return {
      ngModule: _BsDatepickerModule,
      providers: []
    };
  }
  static {
    this.ɵfac = function BsDatepickerModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsDatepickerModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _BsDatepickerModule,
      imports: [CommonModule, TooltipModule, TimepickerModule, BsCalendarLayoutComponent, BsCurrentDateViewComponent, BsCustomDatesViewComponent, BsDatepickerDayDecoratorComponent, BsDatepickerNavigationViewComponent, BsDaysCalendarViewComponent, BsMonthCalendarViewComponent, BsTimepickerViewComponent, BsYearsCalendarViewComponent, BsDatepickerContainerComponent, BsDatepickerDirective, BsDatepickerInlineContainerComponent, BsDatepickerInlineDirective, BsDatepickerInputDirective, BsDaterangepickerContainerComponent, BsDaterangepickerDirective, BsDaterangepickerInlineContainerComponent, BsDaterangepickerInlineDirective, BsDaterangepickerInputDirective],
      exports: [BsDatepickerContainerComponent, BsDatepickerDirective, BsDatepickerInlineContainerComponent, BsDatepickerInlineDirective, BsDatepickerInputDirective, BsDaterangepickerContainerComponent, BsDaterangepickerDirective, BsDaterangepickerInlineContainerComponent, BsDaterangepickerInlineDirective, BsDaterangepickerInputDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule, TooltipModule, TimepickerModule, BsDaysCalendarViewComponent, BsDatepickerContainerComponent, BsDatepickerInlineContainerComponent, BsDaterangepickerContainerComponent, BsDaterangepickerInlineContainerComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDatepickerModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, TooltipModule, TimepickerModule, BsCalendarLayoutComponent, BsCurrentDateViewComponent, BsCustomDatesViewComponent, BsDatepickerDayDecoratorComponent, BsDatepickerNavigationViewComponent, BsDaysCalendarViewComponent, BsMonthCalendarViewComponent, BsTimepickerViewComponent, BsYearsCalendarViewComponent, BsDatepickerContainerComponent, BsDatepickerDirective, BsDatepickerInlineContainerComponent, BsDatepickerInlineDirective, BsDatepickerInputDirective, BsDaterangepickerContainerComponent, BsDaterangepickerDirective, BsDaterangepickerInlineContainerComponent, BsDaterangepickerInlineDirective, BsDaterangepickerInputDirective],
      exports: [BsDatepickerContainerComponent, BsDatepickerDirective, BsDatepickerInlineContainerComponent, BsDatepickerInlineDirective, BsDatepickerInputDirective, BsDaterangepickerContainerComponent, BsDaterangepickerDirective, BsDaterangepickerInlineContainerComponent, BsDaterangepickerInlineDirective, BsDaterangepickerInputDirective]
    }]
  }], null, null);
})();
export {
  BsDatepickerConfig,
  BsDatepickerContainerComponent,
  BsDatepickerDirective,
  BsDatepickerInlineConfig,
  BsDatepickerInlineContainerComponent,
  BsDatepickerInlineDirective,
  BsDatepickerInputDirective,
  BsDatepickerModule,
  BsDaterangepickerConfig,
  BsDaterangepickerContainerComponent,
  BsDaterangepickerDirective,
  BsDaterangepickerInlineConfig,
  BsDaterangepickerInlineContainerComponent,
  BsDaterangepickerInlineDirective,
  BsDaterangepickerInputDirective,
  BsLocaleService
};
//# sourceMappingURL=ngx-bootstrap_datepicker.js.map
