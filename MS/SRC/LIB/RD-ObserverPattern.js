///////////////////////////////////////////////////////////////////////////
// Observer Pattern
//
// 參考knockout.js的Observable實作
// 僅設計Observable被觀察對象, 一般是指Model的成員變數/欄位值
// 未設計Observer觀察者

///////////////////////////////////////////////////////////////////////////
// Subscription class

function Subscription(target, callback, disposeHandler) {
    this.target = target;
    this.callback = callback;
    this.dispose = function() {
        disposeHandler.call(this.target, this);
    }
}

///////////////////////////////////////////////////////////////////////////
// Observable class
// 使用方法:
// 宣告變數是 new Observable(初始值)
// 取值用變數名 + (), 函數的用法
// 設值用變數名 + (新值), 函數的用法, 亦常見於jQuery的function

function Observable(initialValue) {
    
    var _value = initialValue;
    
    this.eventMap = {           // 事件是以Map結構記錄, 各個event是以Array結構記錄Subscriptions
            "beforechange": [], // 預設提供變更前與變更後2個事件
            "change": []
        };
    
    var that = this;
    
    function isEqual(a, b) {
        var primitiveTypes = {'undefined':true, 'boolean':true, 'number':true, 'string':true};
        if(a === null || (typeof(a) in primitiveTypes)) {
            return a === b;
        }
        return false;
    }
    
    function notifySubscribers(event) {
        event = event || "change";
        if(that.eventMap[event]) {
            $.each(that.eventMap[event], function(i, subscription) {
                subscription.callback(_value);
            });
        }
    }
    
    // 替代的公開物件
    function observable() {
        // 給參數時表示設值
        if(arguments.length > 0) {
            if(!isEqual(_value, arguments[0])) {
                notifySubscribers("beforechange");  // 異動前觸發"beforechange"事件
                _value = arguments[0];
                notifySubscribers("change");        // 異動後觸發"change"事件
            }
            return this;    // 允許串接
        }
        else {  // 未給參數時表示取值
            return _value;
        }
    }
    
    // 註冊事件Callback, 未指定事件名稱的話, 預設為"change"事件觸發時才會Callback
    // 返回一個Subscription物件, 其中dispose方法為取消註冊的方法
    // 訂閱者應保留此物件, 並於自身解構或需中途解除監看關係時叫用dispose方法
    observable.subscribe = function(callback, event) {
        event = event || "change";
        var subscription = new Subscription(this, callback, function(subscription) {
            for(var i=0, len=this.eventMap[event].length; i<len; i++) {
                if(this.eventMap[event][i] === subscription) {
                    this.eventMap[event].splice(i, 1);
                    break;
                }
            }
        });
        if(!that.eventMap[event])
            that.eventMap[event] = [];
        that.eventMap[event].push(subscription);
        return subscription;
    }
    
    return observable;
}

(function() {
    // 支援模組管理
    if(window.theModMgr != undefined)
        window.theModMgr.install("RD-ObserverPattern.js").finish();
})();
