import {getStore, setStore} from './store';
import common from './common'
let isIOS = common.isIos()
let iosVersion = common.getIosVersion()

let uniqueId = 1;

const bridge = {};

const generateCallbackName = () => {
  const callbackName = `ar_${uniqueId += 1}_${new Date().getTime()}`;
  return callbackName;
};

function parseCallbackArgs(args, resultParse) {
  let result = args.slice();
  if (resultParse) {
    result = resultParse(args);
  }
  return result;
}

if (!isIOS) {
  const ANDROID_NAMESPACE = 'proxyBridge';
  const functionRoot = window[ANDROID_NAMESPACE] || {};
  bridge.callHandler = (handlerName, data, resultParse) => new Promise((resolve) => {
    try {
      const callbackName = generateCallbackName();
      window[callbackName] = function callback(...args) {
        const result = parseCallbackArgs(args, resultParse);
        resolve(result);
        window[callbackName] = undefined;
      };
      const handler = functionRoot[handlerName];
      if (data && handler && typeof handler === 'function') {
        data.callback = callbackName;
        handler.call(functionRoot, JSON.stringify(data));
      } else {
        handler.call(functionRoot);
      }
    } catch (ex) {
      console.log(ex);
    }
  });
} else if (!window.WebViewJavascriptBridge) {
  let messagingIframe;
  const sendMessages = [];

  const CUSTOM_PROTOCOL_SCHEME = 'bridge';
  const SEND_URL = JSON.stringify({
    receive: 'WebViewJavascriptBridge.getMessage',
    callback: 'WebViewJavascriptBridge.runCallback',
  });

  const responseCallbacks = {};

  const createQueueReadyIframe = (doc, url) => {
    url = url || `${CUSTOM_PROTOCOL_SCHEME}://{}`;
    if (iosVersion >= 10) {
      location.href = url;
      return;
    }
    if (messagingIframe) {
      doc.documentElement.removeChild(messagingIframe);
    }
    messagingIframe = doc.createElement('iframe');
    messagingIframe.style.display = 'none';
    messagingIframe.src = url;
    doc.documentElement.appendChild(messagingIframe);
  };

  const callHandler = bridge.callHandler = (handlerName, data, resultParse) =>
    new Promise((resolve) => {
      try {
        const requestId = generateCallbackName();
        const message = {
          id: requestId,
          command: handlerName,
          data: (data || {}),
        };
        if (responseCallbacks) {
          responseCallbacks[requestId] = function callback(...args) {
            const result = parseCallbackArgs(args, resultParse);
            resolve(result);
            responseCallbacks[requestId] = undefined;
          };
        }
        sendMessages.push(message);
        createQueueReadyIframe(document, `${CUSTOM_PROTOCOL_SCHEME}://${SEND_URL}`);
      } catch (ex) {
        console.log(ex);
      }
    });

  const getMessage = () => {
    const message = sendMessages.shift();
    if (!message) {
      return '';
    }
    return JSON.stringify(message);
  };

  const runCallback = (res) => {
    let callback;
    if (!res) {
      return;
    }
    if (res === res.toString()) {
      res = JSON.parse(res);
    }

    if (res && res.id && (res.id in responseCallbacks)) {
      callback = responseCallbacks[res.id];
      callback(res.data);
    }
  };
  window.WebViewJavascriptBridge = {
    getMessage,
    runCallback,
    callHandler,
  };
}

export default {
  goBack() {
    bridge.callHandler('back');
  },
  goHome() {
    bridge.callHandler('showNativePage', {
      target: 'Home',
    }, null);
  },
  goNative(nativePage) {
    bridge.callHandler('showNativePage', {
      target: nativePage,
    }, null);
  },
  popLogin(successCallback) {
    const resultParse = (args) => {
      let result = {
        token: args[0],
        intType: args[1],
      };
      if (isIOS) {
        result = args[0];
      }

      if (successCallback) {
        // getStore().getters.memberCallback.reloadSucceed = successCallback;
        successCallback(result)
      }
      // getStore().commit('UPDATE_SESSION_ID', result.token);
      setStore('toekn', result.token)
    };
    bridge.callHandler('userLogin', {}, resultParse);
  },
  getUserToken(inToken, callback) {
    const resultParse = (args) => {
      let result = {
        token: args[0],
        intType: args[1],
        os: args[2],
        deviceToken: args[3],
        version: args[4],
        packageName: args[5],
        channel: args[6],
      };
      if (isIOS) {
        result = args[0];
      }
      callback(result);
    };
    const params = {
      token: inToken,
    };
    bridge.callHandler('getUserToken', params, resultParse);
  },
  openPage(url, token, header, footerBar, title) {
    bridge.callHandler('openPage', {
      url,
      token,
      header,
      footerBar,
      title,
    });
  },
  showNativePage(data, callback) {
    bridge.callHandler('showNativePage', data, callback);
  },
  doPay(data, callback) {
    bridge.callHandler('pay', (isIOS ? data : { data : data }), (args) => {
      console.log('args:', args);
      if (isIOS) {
        if (args[0].success == true) {
          callback({success: true});
          return;
        }
        callback({ success: false });
      } else {
        if (args[0] == 1) {
          callback({success: true});
          return;
        }
        callback({ success: false });
      }
    });
  },
  setShareOptions(shareData, callback) {
    bridge.callHandler('setShareOptions', {
      enabled: true,
      title: shareData.title,
      description: shareData.desc,
      iconUrl: shareData.imgUrl,
      url: shareData.link,
    }, callback);
  },
  doShare(shareData) {
    bridge.callHandler('doShare', {
      url: shareData.link,
      pic: shareData.imgUrl,
      title: shareData.title,
      desp: shareData.desc,
    });
  },
  sendTrackInfo(pageCode, moduleId) {
    bridge.callHandler('sendTrackInfo', {
      pageCode,
      moduleId,
    });
  },
};
