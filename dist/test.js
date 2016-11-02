/*!
 * spreadsheet
 * A JavaScript spreedsheet designer based on Handsontable.
 * 
 * @version v1.0.0
 * @author zhangq
 * @license MIT
 * 
 * Build on: Mon Oct 31 2016 10:19:23 GMT+0800 (CST)
 * Handsontable version: 0.28.3
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process){
"use strict";

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
    var o = function o(k, v, _o, l) {
        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {}return _o;
    },
        $V0 = [1, 5],
        $V1 = [1, 8],
        $V2 = [1, 6],
        $V3 = [1, 7],
        $V4 = [1, 9],
        $V5 = [1, 14],
        $V6 = [1, 15],
        $V7 = [1, 16],
        $V8 = [1, 12],
        $V9 = [1, 13],
        $Va = [1, 17],
        $Vb = [1, 19],
        $Vc = [1, 20],
        $Vd = [1, 21],
        $Ve = [1, 22],
        $Vf = [1, 23],
        $Vg = [1, 24],
        $Vh = [1, 25],
        $Vi = [1, 26],
        $Vj = [1, 27],
        $Vk = [1, 28],
        $Vl = [5, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30],
        $Vm = [5, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 32],
        $Vn = [1, 37],
        $Vo = [5, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 34],
        $Vp = [5, 10, 11, 13, 14, 15, 16, 17, 29, 30],
        $Vq = [5, 10, 13, 14, 15, 16, 29, 30],
        $Vr = [5, 10, 11, 13, 14, 15, 16, 17, 18, 19, 29, 30],
        $Vs = [13, 29, 30],
        $Vt = [5, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 31, 35];
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "expressions": 3, "expression": 4, "EOF": 5, "variableSequence": 6, "number": 7, "STRING": 8, "&": 9, "=": 10, "+": 11, "(": 12, ")": 13, "<": 14, ">": 15, "NOT": 16, "-": 17, "*": 18, "/": 19, "^": 20, "FUNCTION": 21, "expseq": 22, "cell": 23, "ABSOLUTE_CELL": 24, "RELATIVE_CELL": 25, "MIXED_CELL": 26, ":": 27, "ARRAY": 28, ";": 29, ",": 30, "VARIABLE": 31, "DECIMAL": 32, "NUMBER": 33, "%": 34, "#": 35, "!": 36, "$accept": 0, "$end": 1 },
        terminals_: { 5: "EOF", 8: "STRING", 9: "&", 10: "=", 11: "+", 12: "(", 13: ")", 14: "<", 15: ">", 16: "NOT", 17: "-", 18: "*", 19: "/", 20: "^", 21: "FUNCTION", 24: "ABSOLUTE_CELL", 25: "RELATIVE_CELL", 26: "MIXED_CELL", 27: ":", 28: "ARRAY", 29: ";", 30: ",", 31: "VARIABLE", 32: "DECIMAL", 33: "NUMBER", 34: "%", 35: "#", 36: "!" },
        productions_: [0, [3, 2], [4, 1], [4, 1], [4, 1], [4, 3], [4, 3], [4, 3], [4, 3], [4, 4], [4, 4], [4, 4], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 2], [4, 2], [4, 3], [4, 4], [4, 1], [4, 1], [4, 2], [23, 1], [23, 1], [23, 1], [23, 3], [23, 3], [23, 3], [23, 3], [23, 3], [23, 3], [23, 3], [23, 3], [23, 3], [22, 1], [22, 1], [22, 3], [22, 3], [6, 1], [6, 3], [7, 1], [7, 3], [7, 2], [2, 3], [2, 4]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:

                    return $$[$0 - 1];

                    break;
                case 2:

                    this.$ = yy.callVariable($$[$0][0]);

                    break;
                case 3:

                    this.$ = yy.toNumber($$[$0]);

                    break;
                case 4:

                    this.$ = yy.trimEdges($$[$0]);

                    break;
                case 5:

                    this.$ = yy.evaluateByOperator('&', [$$[$0 - 2], $$[$0]]);

                    break;
                case 6:

                    this.$ = yy.evaluateByOperator('=', [$$[$0 - 2], $$[$0]]);

                    break;
                case 7:

                    this.$ = yy.evaluateByOperator('+', [$$[$0 - 2], $$[$0]]);

                    break;
                case 8:

                    this.$ = yy.toNumber($$[$0 - 1]);

                    break;
                case 9:

                    this.$ = yy.evaluateByOperator('<=', [$$[$0 - 3], $$[$0]]);

                    break;
                case 10:

                    this.$ = yy.evaluateByOperator('>=', [$$[$0 - 3], $$[$0]]);

                    break;
                case 11:

                    this.$ = yy.evaluateByOperator('<>', [$$[$0 - 3], $$[$0]]);

                    break;
                case 12:

                    this.$ = yy.evaluateByOperator('NOT', [$$[$0 - 2], $$[$0]]);

                    break;
                case 13:

                    this.$ = yy.evaluateByOperator('>', [$$[$0 - 2], $$[$0]]);

                    break;
                case 14:

                    this.$ = yy.evaluateByOperator('<', [$$[$0 - 2], $$[$0]]);

                    break;
                case 15:

                    this.$ = yy.evaluateByOperator('-', [$$[$0 - 2], $$[$0]]);

                    break;
                case 16:

                    this.$ = yy.evaluateByOperator('*', [$$[$0 - 2], $$[$0]]);

                    break;
                case 17:

                    this.$ = yy.evaluateByOperator('/', [$$[$0 - 2], $$[$0]]);

                    break;
                case 18:

                    this.$ = yy.evaluateByOperator('^', [$$[$0 - 2], $$[$0]]);

                    break;
                case 19:

                    var n1 = yy.invertNumber($$[$0]);

                    this.$ = n1;

                    if (isNaN(this.$)) {
                        this.$ = 0;
                    }

                    break;
                case 20:

                    var n1 = yy.toNumber($$[$0]);

                    this.$ = n1;

                    if (isNaN(this.$)) {
                        this.$ = 0;
                    }

                    break;
                case 21:

                    this.$ = yy.callFunction($$[$0 - 2]);

                    break;
                case 22:

                    this.$ = yy.callFunction($$[$0 - 3], $$[$0 - 1]);

                    break;
                case 26:case 27:case 28:

                    this.$ = yy.cellValue($$[$0]);

                    break;
                case 29:case 30:case 31:case 32:case 33:case 34:case 35:case 36:case 37:

                    this.$ = yy.rangeValue($$[$0 - 2], $$[$0]);

                    break;
                case 38:case 42:

                    this.$ = [$$[$0]];

                    break;
                case 39:

                    var result = [];
                    var arr = eval("[" + yytext + "]");

                    arr.forEach(function (item) {
                        result.push(item);
                    });

                    this.$ = result;

                    break;
                case 40:case 41:

                    $$[$0 - 2].push($$[$0]);
                    this.$ = $$[$0 - 2];

                    break;
                case 43:

                    this.$ = Array.isArray($$[$0 - 2]) ? $$[$0 - 2] : [$$[$0 - 2]];
                    this.$.push($$[$0]);

                    break;
                case 44:

                    this.$ = $$[$0];

                    break;
                case 45:

                    this.$ = ($$[$0 - 2] + '.' + $$[$0]) * 1;

                    break;
                case 46:

                    this.$ = $$[$0 - 1] * 0.01;

                    break;
                case 47:case 48:

                    this.$ = yy.throwError($$[$0 - 2] + $$[$0 - 1] + $$[$0]);

                    break;
            }
        },
        table: [{ 2: 11, 3: 1, 4: 2, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 1: [3] }, { 5: [1, 18], 9: $Vb, 10: $Vc, 11: $Vd, 14: $Ve, 15: $Vf, 16: $Vg, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }, o($Vl, [2, 2], { 32: [1, 29] }), o($Vl, [2, 3], { 34: [1, 30] }), o($Vl, [2, 4]), { 2: 11, 4: 31, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 32, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 33, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 12: [1, 34] }, o($Vl, [2, 23]), o($Vl, [2, 24], { 2: 35, 31: [1, 36], 35: $Va }), o($Vm, [2, 42], { 35: $Vn }), o($Vo, [2, 44], { 32: [1, 38] }), o($Vl, [2, 26], { 27: [1, 39] }), o($Vl, [2, 27], { 27: [1, 40] }), o($Vl, [2, 28], { 27: [1, 41] }), { 31: [1, 42] }, { 1: [2, 1] }, { 2: 11, 4: 43, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 44, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 45, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 48, 6: 3, 7: 4, 8: $V0, 10: [1, 46], 11: $V1, 12: $V2, 15: [1, 47], 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 50, 6: 3, 7: 4, 8: $V0, 10: [1, 49], 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 51, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 52, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 53, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 54, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 55, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 31: [1, 56] }, o($Vo, [2, 46]), { 9: $Vb, 10: $Vc, 11: $Vd, 13: [1, 57], 14: $Ve, 15: $Vf, 16: $Vg, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }, o($Vp, [2, 19], { 9: $Vb, 18: $Vi, 19: $Vj, 20: $Vk }), o($Vp, [2, 20], { 9: $Vb, 18: $Vi, 19: $Vj, 20: $Vk }), { 2: 11, 4: 60, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 13: [1, 58], 17: $V3, 21: $V4, 22: 59, 23: 10, 24: $V5, 25: $V6, 26: $V7, 28: [1, 61], 31: $V8, 33: $V9, 35: $Va }, o($Vl, [2, 25]), { 35: $Vn }, { 31: [1, 62] }, { 33: [1, 63] }, { 24: [1, 64], 25: [1, 65], 26: [1, 66] }, { 24: [1, 67], 25: [1, 68], 26: [1, 69] }, { 24: [1, 70], 25: [1, 71], 26: [1, 72] }, { 36: [1, 73] }, o($Vl, [2, 5]), o([5, 10, 13, 29, 30], [2, 6], { 9: $Vb, 11: $Vd, 14: $Ve, 15: $Vf, 16: $Vg, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }), o($Vp, [2, 7], { 9: $Vb, 18: $Vi, 19: $Vj, 20: $Vk }), { 2: 11, 4: 74, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 75, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, o($Vq, [2, 14], { 9: $Vb, 11: $Vd, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }), { 2: 11, 4: 76, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, o($Vq, [2, 13], { 9: $Vb, 11: $Vd, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }), o([5, 10, 13, 16, 29, 30], [2, 12], { 9: $Vb, 11: $Vd, 14: $Ve, 15: $Vf, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }), o($Vp, [2, 15], { 9: $Vb, 18: $Vi, 19: $Vj, 20: $Vk }), o($Vr, [2, 16], { 9: $Vb, 20: $Vk }), o($Vr, [2, 17], { 9: $Vb, 20: $Vk }), o([5, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30], [2, 18], { 9: $Vb }), o($Vm, [2, 43]), o($Vl, [2, 8]), o($Vl, [2, 21]), { 13: [1, 77], 29: [1, 78], 30: [1, 79] }, o($Vs, [2, 38], { 9: $Vb, 10: $Vc, 11: $Vd, 14: $Ve, 15: $Vf, 16: $Vg, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }), o($Vs, [2, 39]), { 36: [1, 80] }, o($Vo, [2, 45]), o($Vl, [2, 29]), o($Vl, [2, 30]), o($Vl, [2, 31]), o($Vl, [2, 32]), o($Vl, [2, 33]), o($Vl, [2, 34]), o($Vl, [2, 35]), o($Vl, [2, 36]), o($Vl, [2, 37]), o($Vt, [2, 47]), o($Vq, [2, 9], { 9: $Vb, 11: $Vd, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }), o($Vq, [2, 11], { 9: $Vb, 11: $Vd, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }), o($Vq, [2, 10], { 9: $Vb, 11: $Vd, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }), o($Vl, [2, 22]), { 2: 11, 4: 81, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, { 2: 11, 4: 82, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: 10, 24: $V5, 25: $V6, 26: $V7, 31: $V8, 33: $V9, 35: $Va }, o($Vt, [2, 48]), o($Vs, [2, 40], { 9: $Vb, 10: $Vc, 11: $Vd, 14: $Ve, 15: $Vf, 16: $Vg, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk }), o($Vs, [2, 41], { 9: $Vb, 10: $Vc, 11: $Vd, 14: $Ve, 15: $Vf, 16: $Vg, 17: $Vh, 18: $Vi, 19: $Vj, 20: $Vk })],
        defaultActions: { 18: [2, 1] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                var _parseError = function _parseError(msg, hash) {
                    this.message = msg;
                    this.hash = hash;
                };

                _parseError.prototype = Error;

                throw new _parseError(str, hash);
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                tstack = [],
                // token stack
            vstack = [null],
                // semantic value stack
            lstack = [],
                // location stack
            table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;

            var args = lstack.slice.call(arguments, 1);

            //this.reductionCount = this.shiftCount = 0;

            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            // copy state
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }

            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);

            var ranges = lexer.options && lexer.options.ranges;

            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }

            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }

            _token_stack: var lex = function lex() {
                var token;
                token = lexer.lex() || EOF;
                // if token isn't its numeric value, convert
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };

            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                // retreive state number from top of stack
                state = stack[stack.length - 1];

                // use default actions if available
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    // read action for current state and first input
                    action = table[state] && table[state][symbol];
                }

                _handle_error:
                // handle parse error
                if (typeof action === 'undefined' || !action.length || !action[0]) {

                    // Return the rule stack depth where the nearest error rule can be found.
                    // Return FALSE when no error recovery rule was found.
                    var locateNearestErrorRecoveryRule = function locateNearestErrorRecoveryRule(state) {
                        var stack_probe = stack.length - 1;
                        var depth = 0;

                        // try to recover from error
                        for (;;) {
                            // check for error recovery rule in this state
                            if (TERROR.toString() in table[state]) {
                                return depth;
                            }
                            if (state === 0 || stack_probe < 2) {
                                return false; // No suitable error recovery rule available.
                            }
                            stack_probe -= 2; // popStack(1): [symbol, action]
                            state = stack[stack_probe];
                            ++depth;
                        }
                    };

                    var error_rule_depth;
                    var errStr = '';

                    if (!recovering) {
                        // first see if there's any chance at hitting an error recovery rule:
                        error_rule_depth = locateNearestErrorRecoveryRule(state);

                        // Report error
                        expected = [];
                        for (p in table[state]) {
                            if (this.terminals_[p] && p > TERROR) {
                                expected.push("'" + this.terminals_[p] + "'");
                            }
                        }
                        if (lexer.showPosition) {
                            errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                        } else {
                            errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                        }
                        this.parseError(errStr, {
                            text: lexer.match,
                            token: this.terminals_[symbol] || symbol,
                            line: lexer.yylineno,
                            loc: yyloc,
                            expected: expected,
                            recoverable: error_rule_depth !== false
                        });
                    } else if (preErrorSymbol !== EOF) {
                        error_rule_depth = locateNearestErrorRecoveryRule(state);
                    }

                    // just recovered from another error
                    if (recovering == 3) {
                        if (symbol === EOF || preErrorSymbol === EOF) {
                            throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                        }

                        // discard current lookahead and grab another
                        yyleng = lexer.yyleng;
                        yytext = lexer.yytext;
                        yylineno = lexer.yylineno;
                        yyloc = lexer.yylloc;
                        symbol = lex();
                    }

                    // try to recover from error
                    if (error_rule_depth === false) {
                        throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
                    }
                    popStack(error_rule_depth);

                    preErrorSymbol = symbol == TERROR ? null : symbol; // save the lookahead token
                    symbol = TERROR; // insert generic error symbol as new lookahead
                    state = stack[stack.length - 1];
                    action = table[state] && table[state][TERROR];
                    recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
                }

                // this shouldn't happen, unless resolve defaults are off
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }

                switch (action[0]) {
                    case 1:
                        // shift
                        //this.shiftCount++;

                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]); // push state
                        symbol = null;
                        if (!preErrorSymbol) {
                            // normal execution/no error
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            // error just occurred, resume old lookahead f/ before error
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;

                    case 2:
                        // reduce
                        //this.reductionCount++;

                        len = this.productions_[action[1]][1];

                        // perform semantic action
                        yyval.$ = vstack[vstack.length - len]; // default to $$ = $1
                        // default location, uses first token for firsts, last for lasts
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                        if (typeof r !== 'undefined') {
                            return r;
                        }

                        // pop off stack
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }

                        stack.push(this.productions_[action[1]][0]); // push nonterminal (reduce)
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        // goto new state = table[STATE][NONTERMINAL]
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;

                    case 3:
                        // accept
                        return true;
                }
            }

            return true;
        } };

    /* generated by jison-lex 0.3.4 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function setInput(input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function more() {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function less(n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function next() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        /* skip whitespace */
                        break;
                    case 1:
                        return 8;
                        break;
                    case 2:
                        return 8;
                        break;
                    case 3:
                        return 21;
                        break;
                    case 4:
                        return 24;
                        break;
                    case 5:
                        return 26;
                        break;
                    case 6:
                        return 26;
                        break;
                    case 7:
                        return 25;
                        break;
                    case 8:
                        return 21;
                        break;
                    case 9:
                        return 31;
                        break;
                    case 10:
                        return 31;
                        break;
                    case 11:
                        return 33;
                        break;
                    case 12:
                        return 28;
                        break;
                    case 13:
                        /* skip whitespace */
                        break;
                    case 14:
                        return 9;
                        break;
                    case 15:
                        return ' ';
                        break;
                    case 16:
                        return 32;
                        break;
                    case 17:
                        return 27;
                        break;
                    case 18:
                        return 29;
                        break;
                    case 19:
                        return 30;
                        break;
                    case 20:
                        return 18;
                        break;
                    case 21:
                        return 19;
                        break;
                    case 22:
                        return 17;
                        break;
                    case 23:
                        return 11;
                        break;
                    case 24:
                        return 20;
                        break;
                    case 25:
                        return 12;
                        break;
                    case 26:
                        return 13;
                        break;
                    case 27:
                        return 15;
                        break;
                    case 28:
                        return 14;
                        break;
                    case 29:
                        return 16;
                        break;
                    case 30:
                        return '"';
                        break;
                    case 31:
                        return "'";
                        break;
                    case 32:
                        return "!";
                        break;
                    case 33:
                        return 10;
                        break;
                    case 34:
                        return 34;
                        break;
                    case 35:
                        return 35;
                        break;
                    case 36:
                        return 5;
                        break;
                }
            },
            rules: [/^(?:\s+)/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:[A-Za-z]{1,}[A-Za-z_0-9\.]+(?=[(]))/, /^(?:\$[A-Za-z]+\$[0-9]+)/, /^(?:\$[A-Za-z]+[0-9]+)/, /^(?:[A-Za-z]+\$[0-9]+)/, /^(?:[A-Za-z]+[0-9]+)/, /^(?:[A-Za-z\.]+(?=[(]))/, /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+)/, /^(?:[A-Za-z_]+)/, /^(?:[0-9]+)/, /^(?:\[(.*)?\])/, /^(?:\$)/, /^(?:&)/, /^(?: )/, /^(?:[.])/, /^(?::)/, /^(?:;)/, /^(?:,)/, /^(?:\*)/, /^(?:\/)/, /^(?:-)/, /^(?:\+)/, /^(?:\^)/, /^(?:\()/, /^(?:\))/, /^(?:>)/, /^(?:<)/, /^(?:NOT\b)/, /^(?:")/, /^(?:')/, /^(?:!)/, /^(?:=)/, /^(?:%)/, /^(?:[#])/, /^(?:$)/],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
    exports.parser = parser;
    exports.Parser = parser.Parser;
    exports.parse = function () {
        return parser.parse.apply(parser, arguments);
    };

    if (typeof module !== 'undefined' && require.main === module) {
        exports.main(process.argv.slice(1));
    }
}

}).call(this,require('_process'))
},{"_process":1}],3:[function(require,module,exports){
'use strict';

var _grammar = require('./grammar');

console.log(_grammar.Parser);
/*parser.parse("SUM(A1,A2)");*/
/*var fs = require("fs");
var jison = require("jison");

var bnf = fs.readFileSync("grammar.jison", "utf8");
var parser = new jison.Parser(bnf);*/

},{"./grammar":2}]},{},[3]);
