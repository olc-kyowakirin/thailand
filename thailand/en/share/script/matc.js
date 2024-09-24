/**
 * matc.js
 * MITSUE-LINKS Auto Tracking Code
 * Version 2.6.0
 * Copyright (C) 2009-2013 MITSUE-LINKS
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 */

(function (win) {
'use strict';

var MATC = win.MATC = win.MATC;
var doc, loc;

// MATC 既存チェック
if (MATC) {
    throw new Error('MATC has already been defined');
}
// ------------------------------------------------------------------------
// gaオブジェクト初期化
// ------------------------------------------------------------------------
win._gaq = win._gaq ? win._gaq : [];

// ------------------------------------------------------------------------
// 内部利用値
// ------------------------------------------------------------------------
doc  = win.document;
loc  = win.location;

function _MATC () {
    // グローバル化
    win.MATC = MATC = this;

    // ------------------------------------------------------------------------
    // 定数
    // ------------------------------------------------------------------------

    // バージョン番号
    // @type String
    this.VERSION = '2.6.0';


    // ライブラリ ID
    // @type Number
    this.ID = Number((String(Math.random() * 10)).replace(/\D/g, ''));


    // ------------------------------------------------------------------------
    // トラッキング情報セッティング
    // ------------------------------------------------------------------------
    this.setting = {
        // 統合解析ドメイン
        integratedDomain : null,
        // 1stサブドメイン
        firstSubDomain   : null,
        // 2ndサブドメイン
        secondSubDomain  : null,
        // 3ndサブドメイン
        thirdSubDomain   : null,
        // 4thサブドメイン
        fourthSubDomain  : null,
        // 外部ドメイン
        externalDomain   : /\./i,
        // 外部パス
        externalPath     : '/outgoing/',
        // メールプロトコル
        mailProtocol     : 'mailto:',
        // TELプロトコル
        telProtocol      : 'tel:',
        // ファイルタイプ
        fileType         : /\.(doc|eps|svg|xls|ppt|pdf|zip|vsd|vxd|rar|exe|wma|mov|avi|wmv|mp3|mp4|jpg|zip|sit|exe|sea|gif)/i,
        // 接頭辞の有無
        disablePrefix     : false
    };

    // トラッキング スクリプトの URL
    // @type string
    this.scriptURL = ('https:' === loc.protocol ? 'https://ssl.' : 'http://www.') + 'google-analytics.com/ga.js';

    // トラッキング スクリプトのロード状況
    // ロード中なら true
    // @type boolean
    this.scriptLoading = false;

    // トラッキング スクリプト重複ロードチェック
    // @type boolean
    // _gatがオブジェクトである（＝ga.jsがロード済）
    this.duplicated = (typeof win._gat === 'object') ? true :false;

    // トラッキング スクリプトのロード後に実行するリスナの集合
    // @type Array
    this.listenerStack = [];

    // トラッキング スクリプトをロードするために用いた script 要素
    // @type HTMLScriptElement|null
    this.script = null;

    // _gaqにpushする配列を保持するスタック
    //@type;Array
    this.propertyStack = [];

    // ユニークを保持するスタック
    //@type;Array
    this.nameStack = [];

    //保持しているユニークをセットするArray
    // @type Number
    this.nameStackLeng = 0;


    // DOM Events デフォルト設定一覧
    // {
    //     'イベント名' : {
    //         type : 'DOM インタフェイス名',
    //         init : '初期化メソッド名',
    //         args : [初期化メソッド第2引数, ..., 初期化メソッド第n引数]
    //     }, ...
    // }
    this._TYPES = (function () {
        // 初期化メソッド名
        var EVENT      = 'Event';
        var INIT_EVENT = 'initEvent';

        return {
            // 未定義時のデフォルト
            'DEFAULT' : {
                type : EVENT,
                init : INIT_EVENT,
                args : [true,  true]
            }
        };
    }());

    // オブジェクトに束縛したデータ構造を取得する。
    //
    // @private
    // @function
    //
    // @param {Object} obj
    //     束縛対象。
    //
    // @return {Object}
    //     束縛されたデータ構造。

    this._getData = (function (self) {
        // 追加プロパティ名
        var prop = 'MATC_DATA_ID_' + self.ID;
        // 次に利用する ID
        var nextId = 1;
        // 実データ
        var data = [];
        return function (obj) {
            // グローバルオブジェクトにはプロパティを追加しないよう配慮
            var id = obj === win ? 0 : obj[prop],
                ret;
            if (!self.isObject(obj)) {
                throw new Error('target is not a object');
            }
            if (!self.isNumber(id)) {
                obj[prop] = id = nextId++;
            }
            // データ構造を定義
            ret = data[id];
            if (!ret) {
                data[id] = ret = {};
            }
            return ret;
        };
    }(this));

    // ------------------------------------------------------------------------
    // IEチェック用
    // ------------------------------------------------------------------------
    this.TEST_NODE = doc.createElement('div');

    this.TEST_NODE_PARENT = doc.createElement('div');

    this.TEST_NODE_STYLE = this.TEST_NODE.style;

    this.IEversion = 0;

    this.isTrident = (function (self) {
        var result = false;
        if (self.isObject(win.ActiveXObject) && 'function' === typeof win.ActiveXObject) {
            result = true;
            self.IEVersion = doc.documentMode || ( self.has(self.TEST_NODE_STYLE, 'maxHeight') ? 7 : 6 );
        }
        return result;
    }(this));

    this.init();
}


// ------------------------------------------------------------------------
// ユーティリティ MATCオリジナル
// ------------------------------------------------------------------------
_MATC.prototype = {
    // @param {Function} listener
    //     実行するリスナ
    // @return MATC

    push : function (listener) {
        this.listenerStack.push(listener);
        return this;
    },

    // @param {Function} listener
    //     実行するリスナ
    // @return MATC

    unshift : function (listener) {
        this.listenerStack.unshift(listener);
        return this;
    },

    // 初期化
    // @return MATC
    init : function () {
        this._setOrgins();
        this._loadScript();
        this._autoTracking();

        // ------------------------------------
        // メモリリーク防止
        // ------------------------------------
        this.add(win, 'unload', function () {
            var stack = MATC.listenerStack;
            var nstack = stack.length;
            var s;

            // 追加したイベントをすべて削除
            for (s = 0; s < nstack; s++) {
                MATC.remove.apply(MATC, stack[s]);
            }
        });
    },

    // ------------------------------------------------------------------------
    // ユーティリティ
    // ------------------------------------------------------------------------

    // オブジェクトにプロパティが定義されているか判定する。
    // Object.prototype.hasOwnProperty() と同一の挙動。
    // プロトタイプチェインは遡らない。
    //
    // @param {Object} obj
    //     チェック対象。DOM 関連オブジェクト（Node など）も指定可能。
    //
    // @param {string} prop
    //     プロパティ名。
    //
    // @return {boolean}
    //     true なら obj[prop] が定義済。
    //
    // @see
    //     <a href="http://es5.github.com/#x15.2.4.5" title="Annotated ES5">15.2.4.5 Object.prototype.hasOwnProperty</a>
    has : function (obj, prop) {
        var result = false;
        if (this.isObject(obj) && prop && 'string' === typeof prop) {
            // BUG IE6-8:
            //   DOM 関連オブジェクトは Object オブジェクトの
            //   prototype プロパティに定義されたプロパティが参照できない
            result = Object.prototype.hasOwnProperty.call(obj, prop);
        }
        return result;
    },

    // Object オブジェクトの判定を行う。
    //
    // @param obj
    //     チェック対象。
    //
    // @return {boolean}
    //     true ならオブジェクト（プリミティブ値ではない）。
    isObject : function (obj) {
        var type = typeof obj;
        // null は除外
        return ('object' === type && null !== obj) || 'function' === type;
    },

    // Array オブジェクトの判定を行う。
    //
    // @function
    //
    // @param obj
    //     チェック対象。
    //
    // @return {boolean}
    //     true なら Array オブジェクト。

    isArray : Array.isArray ? function (obj) {
        return Array.isArray(obj);
    } : function (obj) {
        return obj instanceof Array;
    },

    // 数値リテラルの判定を行う。
    //
    // @param obj
    //     チェック対象。
    //
    // @return {boolean}
    //     true なら数値リテラル。

    isNumber : function (num) {
        // NaN, Number オブジェクトは除外
        return 'number' === typeof num && !isNaN(num);
    },

    // オブジェクトにデータを束縛する。
    //
    // @param {Object} obj
    //     束縛対象。
    //
    // @param {string} key
    //     束縛するデータのキー。
    //
    // @param value
    //     束縛するデータ。
    //
    // @return
    //     すでに束縛していた前のデータ。

    setData : function (obj, key, value) {
        var data = this._getData(obj),
            // 束縛済のデータがあれば返値にする
            ret = ( this.has(data, key) )? data[key] : null;
        data[key] = value;
        return ret;
    },


    // オブジェクトに束縛したデータを取得する。
    //
    // @param {Object} obj
    //     取得対象。
    //
    // @param {string} key
    //     束縛したデータのキー。
    //
    // @return
    //     束縛したデータ。

    getData : function (obj, key) {
        var data = this._getData(obj);
        return this.has(data, key) ? data[key] : null;
    },

    // オリジナルイベントの関連データを取得する。
    //
    // @private
    //
    // @param {Object} obj
    //     対象。
    //
    // @param {string} type
    //     イベント名。
    //
    // @return {Object}
    //     関連データ。
    _getOriginData : function (obj, type) {
        var data = this.getData(obj, 'event');
        var result;

        // イベント関連データ 生成
        if (!data) {
            data = {
                // 'イベント種類' : データ, ...
            };
            this.setData(obj, 'event', data);
        }
        result = data[type];
        // 種類別データ 生成
        if (!result) {
            data[type] = result = {
                init      : false, // 初期化実行是非 (是: true, 非: false)
                listeners : []     // イベントリスナ集合
            };
        }
        // イベント関連データ全体ではなく、種類別データを返す
        return result;
    },

    _appendTestElem : function () {
        this.TEST_NODE_PARENT.appendChild(this.TEST_NODE);
        this.isTrident();
    },

    // ------------------------------------------------------------------------
    // イベント関連機能
    // ------------------------------------------------------------------------

    // Event オブジェクトの target プロパティに相当するオブジェクトを取得し、
    // A要素を検索した後に返す
    // @param {Event} event
    // @return AnchorNode|null
    getAnchorElement : function (event) {
        var el = event.target || event.srcElement || null;

        if (!el) {
            return;
        }

        while (el.tagName !== 'A') {
            el = el.parentNode;
        }

        return el;
    },

    // textcontentsを取得する。
    // クロスブラウザの処理を内部で行う。
    // @param {Element} Elem
    // @return Text|null
    getTextContent : function (el) {
        return el.text || el.textContent || el.innerText;
    },

    // イベントリスナを追加する。
    // unload 時に追加された全イベントを削除している。
    //
    // @param {Object} node
    //     対象オブジェクト。
    //
    // @param {string} type
    //     イベント名。
    //
    // @param {Function} listener
    //     イベントリスナ。
    //
    // @param {boolean} [useCapture=false]
    //     イベントを取得するフェイズを変更する。
    //     true なら capture phase。
    //     false なら bubble phase。
    //     addEventListener をサポートしている環境でのみ効果がある。
    add : function (node, type, listener, useCapture) {
        var ret = this._wrapAfterCare(listener);
        useCapture = true === useCapture;
        if (this._origins[type]) {         // オリジナル（DOMContentLoaded)
            ret = this._addOrigin(node, type, ret);
        } else {
            if (node.addEventListener) {   // W3C DOM
                node.addEventListener(type, ret, useCapture);
            } else if (node.attachEvent) { // IE6-8
                node.attachEvent('on' + type, ret);
            }
            // メモリリーク防止 (win.onunload を除く)
            if (win !== node && 'unload' !== type) {
                // イベントをスタックにストア
                this.push([node, type, ret, useCapture]);
            }
        }
        return ret;
    },

    // イベント実行後のアフターケア処理をラッピング
    _wrapAfterCare : function (listener) {
        return function (event) {
            if (!event && win.event) { // IE6-8
                event = win.event;
            }
            // 実行
            if (false === listener(event)) {
                MATC.cancel(event);
            }
        };
    },

    // イベントリスナを削除する。
    //
    // @param {Object} node
    //     対象オブジェクト。
    //
    // @param {string} type
    //     イベント名。
    //
    // @param {Function} listener
    //     イベントリスナ。
    //
    // @param {boolean} [useCapture=false]
    //     add で指定した useCapture の値。

    remove : function (node, type, listener, useCapture) {
        var ret = listener;
        useCapture = true === useCapture;
        if (this._origins[type]) {             // オリジナル
            ret = this._removeOrigin(node, type, listener, useCapture);
        } else if (node.removeEventListener) { // W3C DOM
            node.removeEventListener(type, listener, useCapture);
        } else if (node.detachEvent) {         // IE6-8
            node.detachEvent('on' + type, listener);
        }
        return ret;
    },

    // 検証用キャンセルオブジェクト
    cancel : function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
        if(event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    // イベントを発送する。
    //
    // @param {Object} node
    //     対象オブジェクト。
    //
    // @param {string} type
    //     イベント名。
    //
    // @param {Object} [options]
    //     生成した Event オブジェクトに設定するプロパティ。
    //
    // @param {boolean}
    //     実際に発送が行われたかの是非。
    //     true なら発送された。

    dispatch : doc.createEvent ? function (node, type, options) { // W3C DOM
        var event;
        // 初期化メソッドに与える引数が未指定なら既定値を利用
        if (!options) {
            options = this._TYPES[type] || this._TYPES.DEFAULT;
            // 遅延評価が必要なものは評価後の返値を利用
            if ('function' === typeof options) {
                options = options(node);
            }
        }
        // event オブジェクト生成・初期化
        event = doc.createEvent(options.type);
        event[options.init].apply(event, [type].concat(options.args));

        // 発送
        return this._origins[type] ? this._dispatchOrigin(node, type, event)
                                   : node.dispatchEvent(event);
    } : doc.fireEvent ? function (node, type, options) { // IE6-8
        var event;
        // 初期化メソッドに与える引数が未指定なら既定値を利用
        if (!options) {
            options = this._TYPES[type] || this._TYPES.DEFAULT;
            // 遅延評価が必要なものは評価後の返値を利用
            if ('function' === typeof options) {
                options = options(node);
            }
        }
        // event オブジェクト生成・初期化
        event              = doc.createEventObject();
        event.type         = type;
        event.cancelBubble = false === options.args[0];

        // 発送
        return this._origins[type] ? this._dispatchOrigin(node, type, event)
                                   : node.fireEvent('on' + type, event);
    } : undefined,


    _setOrgins : function () {
        this._origins = this._origins();
    },

    // DOMContentLoaded の疑似実装。
    //
    // @type Object
    //
    // @see
    //     <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-endl">12.2.6 The end ? HTML Standard</a>
    _origins : function () {
        var self = this;
        return {
            DOMContentLoaded : self.isTrident && self.isTrident && self.IEversion < 9 ? {
                // IE6-8: DOMContentLoaded 未実装
                init : function () {
                    var id = null, wait;
                    // ロードされたウインドウの種類によってチェックが変化
                    // BUG IE6-8:
                    //   win === win.win の場合に false となってしまう
                    if (win == win.top) {
                        // 通常ウインドウ
                        // documentready イベントで代替可能だが、HTC でしか使えない
                        // see also: http://msdn.microsoft.com/en-us/library/ms531024
                        //
                        // doScroll が実行可能（= 例外を投げない）になる
                        // のは documentready イベント後とみなせる現象を利用
                        // して、documentready イベントをエミュレート可能
                        // see also: http://msdn.microsoft.com/en-us/library/ms531426
                        wait = function () {
                            var complete = true;
                            // 念のため確実に停止
                            win.clearTimeout(id);
                            // doScroll が実行可能か監視
                            try {
                                doc.documentElement.doScroll('left');
                            } catch (e) {
                                // doScroll が実行不能なので
                                // documentready イベント前とみなす
                                complete = false;
                            }
                            if (complete) {
                                //送付
                                self.dispatch(doc, 'DOMContentLoaded');
                                self.dispatch(win, 'DOMContentLoaded');
                            } else {
                                id = win.setTimeout(wait, 0);
                            }
                        };
                        // 監視開始
                        wait();
                    } else {
                        // サブウインドウ (iframe など) でロードされた場合は
                        // doScroll が利用できないことがある
                        // readystatechange イベントでエミュレート可能
                        wait = function () {
                            var result = true;
                            if ('complete' === doc.readyState) {
                                result = false;
                                // 2重起動を防止
                                doc.detachEvent('onreadystatechange', wait);
                                self.dispatch(doc, 'DOMContentLoaded');
                                self.dispatch(win, 'DOMContentLoaded');
                            }
                            return result;
                        };
                        // 監視開始
                        if (wait()) {
                            doc.attachEvent('onreadystatechange', wait);
                        }
                    }
                }
            } : undefined
        }
    },

    // オリジナルイベントのイベントリスナを追加する。
    //
    // @private
    //
    // @param {Object} node
    //     対象オブジェクト。
    //
    // @param {string} type
    //     イベント名。
    //
    // @param {Function} listener
    //     イベントリスナ。

    _addOrigin : function (node, type, listener) {
        var data       = this._getOriginData(node, type);
        var origin     = this._origins[type];
        var nlisteners = data.listeners.length;
        // 初期化
        if (!data.init) {
            if (origin && origin.init) {
                origin.init.apply(this, arguments);
            }
            data.init = true;
        }

        // 追加
        if (origin && origin.add) {
            origin.add.apply(this, arguments);
        }
        data.listeners[nlisteners] = listener;
        // 独自イベントリスナを返す
        //   -> 追加したイベントリスナ集合における配列インデックス
        return nlisteners;
    },

    // オリジナルイベントのイベントリスナを削除する。
    // @private
    //
    // @param {Object} node
    //     対象オブジェクト。
    //
    // @param {string} type
    //     イベント名。
    //
    // @param {Function} listener
    //     イベントリスナ。

    _removeOrigin : function (node, type, listener) {
        var data   = this._getOriginData(node, type);
        var origin = this._origins[type];
        // 初期化済でないと意味がない
        if (data.init) {
            if (origin && origin.remove) {
                origin.remove.apply(this, arguments);
            }
            delete data.listeners[listener];
        }
        return listener;
    },

    // オリジナルイベントを発送する。
    //
    // @private
    //
    // @param {Object} node
    //     対象オブジェクト。
    //
    // @param {string} type
    //     イベント名。
    //
    // @param {Event} event
    //     実行したイベントリスナに与える Event オブジェクト。
    //
    // @param {boolean}
    //     実際に発送が行われたかの是非。
    //     true なら発送された。

    _dispatchOrigin : function (node, type, event) {
        var data       = this._getOriginData(node, type);
        var result     = false;
        var listeners  = data.listeners;
        var nlisteners = listeners.length;
        var l, listener;

        for (l = 0; l < nlisteners; l++) {
            listener = listeners[l];
            if (listener) {
                listener(event);
                result = true;
            }
        }
        return result;
    },

    startTracking : function (arg) {
        // UAIDの数だけPrefixを用意する
        this._createPrefix(arg['_setAccount']);

        // オブジェクトの順をならしオブジェクトに成形
        this._readyStack(arg);

        // 全てのUAIDの末尾に通し番号をつけたtarckPageviewを付与
        this._pushGAQ(arg);
    },

    _createPrefix : function (arg) {
        var pre = 'matc'
        var argLeng = this.isObject(arg) ? arg.length : 1;
        var str, i;

        for (i = 0; i < argLeng; i++) {
            str = pre + (i + 1) + '.';

            this.nameStack[i] = str;
            this.propertyStack[i] = [];
        }


        if (this.setting.disablePrefix) {
            this.nameStack.unshift('');
            this.nameStack.pop();
        }


        this.nameStackLeng = this.nameStack.length;
    },

    _readyStack : function (arg) {
        var i, nmArr, mergeArr, _arrPush;

        for (var prop in arg) {
            if (prop === '_trackPageview') {
                break;
            }

            for (i = 0; i < this.nameStackLeng; i++) {
                if (prop === '_setCustomVar') {
                    nmArr = [this.nameStack[i] + prop];
                    mergedArr = [];
                    _arrPush = Array.prototype.push;

                    _arrPush.apply(mergedArr,nmArr);
                    _arrPush.apply(mergedArr,arg[prop]);

                    this.propertyStack[i].push(mergedArr);
                    continue;
                }

                this.propertyStack[i].push([
                    this.nameStack[i] + prop,
                    this.isObject(arg[prop]) ? arg[prop][i] : arg[prop]
                ]);
            }
        }
    },

    _pushGAQ : function (arg) {
        var secoundArg = arg['_trackPageview'] ? true : false;
        var pvArr, j, n, pLeng;

        for (j = 0; j < this.nameStackLeng; j++) {
            pvArr = [this.nameStack[j] + '_trackPageview'];

            if (secoundArg) {
                pvArr.push(arg['_trackPageview']);
            }

            this.propertyStack[j].push(pvArr);

            for (n = 0, pLeng = this.propertyStack[j].length; n < pLeng; n++) {
                win._gaq.push(this.propertyStack[j][n]);
            }
        }
    },

    // ------------------------------------------------------------------------
    // トラッキング関連機能
    // ------------------------------------------------------------------------

    // トラッキング スクリプトをロード
    _loadScript : function () {
        if (!this.duplicated) {
            // 未ロード
            var script = this.script = doc.createElement('script');
            var insertTarget = doc.getElementsByTagName('head')[0];

            script.type  = 'text/javascript';
            script.async = true;
            script.src   = this.scriptURL;
            insertTarget.appendChild(script);
        }
        this.scriptLoading = true;
        return this;
    },

    // 個別にリスナを登録
    // DOMReady後、最優先で実行される
    _autoTracking : function () {
        if (!this.scriptLoading) {
            return;
        }
        this.add(win, 'DOMContentLoaded', function () {
            var ancs     = doc.getElementsByTagName('a');
            var ancLeng  = ancs.length;
            var pageHost = loc.hostname;

            for (var i = 0; i < ancLeng; i++) {
                var anc  = ancs[i];
                var hn = anc.hostname;
                var path = anc.pathname;
                var ancPrt = anc.protocol;
                var subTransition = (pageHost.match(MATC.setting.firstSubDomain) && hn.match(MATC.setting.firstSubDomain))
                                  || (pageHost.match(MATC.setting.secondSubDomain) && hn.match(MATC.setting.secondSubDomain))
                                  || (pageHost.match(MATC.setting.thirdSubDomain) && hn.match(MATC.setting.thirdSubDomain))
                                  || (pageHost.match(MATC.setting.fourthSubDomain) && hn.match(MATC.setting.fourthSubDomain));

                if (!hn) {
                    //ドメインを持たない場合の遷移 ＝ プロトコルがmailto:等
                    if (ancPrt === MATC.setting.mailProtocol || ancPrt === MATC.setting.telProtocol) {
                        MATC.add(anc, 'click', MATC.trackSpecialProtocol, false);
                    }
                } else if (pageHost === hn) {
                    //ページホストとアンカーのホストが同一ドメインの場合
                    if (path.match(MATC.setting.fileType)) {
                        MATC.add(anc, 'click', MATC.trackSpecialExtension, false);
                    }
                } else if (subTransition) {
                    //ページホストとアンカーのホストがサブドメインと同一の場合
                    MATC.add(anc, 'click', MATC.trackCrossDomainTransition, false);
                    if (path.match(MATC.setting.fileType)) {
                        MATC.add(anc, 'click', MATC.trackSpecialExtension, false);
                    }
                } else if (hn.match(MATC.setting.integratedDomain)) {
                    //アンカーのホストが統合解析ドメインに含まれている場合
                    MATC.add(anc, 'click', MATC.trackCrossDomainTransition, false);
                    if (path.match(MATC.setting.fileType)) {
                        MATC.add(anc, 'click', MATC.trackSpecialExtension, false);
                    } else {
                        MATC.add(anc, 'click', MATC.trackIntegrateTransition, false);
                    }
                } else if (hn.match(MATC.setting.externalDomain)) {
                    //外部遷移の場合
                    MATC.add(anc, 'click', MATC.trackExitTransition, false);
                }
            }
        });
    },

    //_trackEvent専用、連番生付与関数
    dispatchAddedPrefix : function (methodName /* ... */) {
        var nLeng = this.nameStack.length;
        var slicedArgs = Array.prototype.slice.call(arguments, 1);
        var i, fakeCopy;

        for (i = 0; i < nLeng; i++) {
            fakeCopy = slicedArgs.slice(0);
            fakeCopy.unshift(this.nameStack[i] + methodName);
            win._gaq.push(fakeCopy);
        }
    },

    //通常のトラックイベント
    trackCrossDomainTransition : function (e) {
        var elem = MATC.getAnchorElement(e);
        var hn = loc.hostname;
        var pth = loc.pathname;

        MATC.dispatchAddedPrefix(
            '_trackEvent',
            'CrossDomainTracking',
            hn + ' > ' + elem.hostname,
            hn + pth.replace('index.html', '') + loc.search + ' > ' + elem.href.replace('index.html', '')
        );
    },

    // 統合ドメインへの遷移トラッキング
    trackIntegrateTransition : function (e) {
/*        var elem = MATC.getAnchorElement(e);
        var ehash, pre;

        if (!elem) {
            return;
        }

        ehash = elem.hash ? false : true;
        pre = MATC.setting.disablePrefix ? '' : 'matc1';

        if(elem.onclick) {

        } else if (elem.target) {
            win._gaq.push(function () {
                win.open(
                    win._gat._getTrackerByName(pre)._getLinkerUrl(elem.href, ehash),
                    elem.target
                );
            });
            MATC.cancel(e);
        } else {
            pre = pre ? pre + '.' : '';

            win._gaq.push([pre + '_link', elem.href, ehash]);
            MATC.cancel(e);
        } */
    },

    // ダウンロードファイル、特殊な拡張子ファイルの計測
    trackSpecialExtension : function (e) {
        var elem = MATC.getAnchorElement(e);
        var ePath, eHost, lnk;

        if (!elem) {
            return;
        }

        ePath = elem.pathname;
        eHost = elem.hostname;

        lnk = (function () {
            var pt = ePath.charAt(0) === '/' ? ePath : '/' + ePath;
            if (eHost !== loc.hostname) {
                pt = '/' + eHost + pt;
            }
            if (elem.search && ePath.indexOf(elem.search) < 0) {
                pt += elem.search;
            }
            return pt;
        }());

        MATC.dispatchAddedPrefix('_trackPageview', {
            page : lnk,
            title : MATC.getTextContent(elem)
        });
    },

    // メール・TELリンクのトラッキング
    trackSpecialProtocol : function (e) {
        var elem = MATC.getAnchorElement(e);

        if (!elem) {
            return;
        }

        MATC.dispatchAddedPrefix(
            '_trackEvent',
            elem.protocol.replace(':', ''),
            elem.href,
            MATC.getTextContent(elem)
        );
    },

    //外部遷移のトラッキング
    trackExitTransition : function (e) {
        var elem = MATC.getAnchorElement(e);

        if (!elem) {
            return;
        }

        MATC.dispatchAddedPrefix(
            '_trackEvent',
            'ExitTracking',
            elem.href,
            loc.hostname + loc.pathname + loc.search
        );
    }
};
// ------------------------------------------------------------------------
// 疑似名前空間
// ------------------------------------------------------------------------
// @namespace MATC
new _MATC();

}(this));