// Network
// ========
// 提供移动平台网络在线，离线的监听
define("#network/0.9.0/network-debug", [], function(require, exports, module) {
    var Network = exports,
        loopFn = null,
        onlineCallbacks = [],
        offlineCallbacks = [];

    Network.online = function(callback) {
        callback = addIDtoCallback(callback);
        onlineCallbacks.push(callback);
    };

    Network.offline = function(callback) {
        callback = addIDtoCallback(callback);
        offlineCallbacks.push(callback);
    };

    Network.destroy = function() {
        clearTimeout(loopFn);
    };

    function startLoop() {
        switch (navigator.onLine) {
            case true:
                online();
            break;
            case false:
                offline();
            break;
        }

        loopFn = setTimeout(startLoop, 200);
    }

    startLoop();

    function online() {
        onlineCallbacks.forEach(function(callback) {
            calling(callback);
        });
        offlineCallbacks.forEach(function(callback) {
            if (callback) {
                callback.called = false;
            }
        });
    }

    function offline() {
        offlineCallbacks.forEach(function(callback) {
            calling(callback);
        });
        onlineCallbacks.forEach(function(callback) {
            if (callback) {
                callback.called = false;
            }
        });
    }

    // 为每个回调函数添加一个是否已调用的标识
    // 用于处理在 setTimeout 中重复调用回调函数问题
    function addIDtoCallback(callback) {
        callback.called = false;
        return callback;
    }

    function calling(callback) {
        if (callback && !callback.called) {
            callback();
            callback.called = true;//标识回调函数已经调用，防止重复调用
        }
    }
});
