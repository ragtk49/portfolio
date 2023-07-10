(function (window) {

    function _registerEvent(target, eventType, cb) {
        if (target.addEventListener) {
            target.addEventListener(eventType, cb);
            return {
                remove: function () {
                    target.removeEventListener(eventType, cb);
                }
            };
        } else {
            target.attachEvent(eventType, cb);
            return {
                remove: function () {
                    target.detachEvent(eventType, cb);
                }
            };
        }
    }

    function _createHiddenIframe(target, uri) {
        var iframe = document.createElement("iframe");
        iframe.src = uri;
        iframe.id = "hiddenIframe";
        iframe.style.display = "none";
        target.appendChild(iframe);
        return iframe;
    }



    function openUriWithTimeoutHack(uri, failCb,successCallback) {
    	top.window.focus();
        var handler = _registerEvent(window, "blur", onBlur);
        var timeout = setTimeout(function () {
        	if(window.localStorage){
		   		 var storage=window.localStorage;
		   		 if(storage.getItem("protocolInstallSuccess")=="success"){
		   			 handler.remove();
		   			 if(typeof(successCallback) !="undefined"){
		             	successCallback();
		             }
		   			 return;
		   		 }
		   	}
            failCb();
            handler.remove();
        }, 1000);
        function onBlur() {
        	clearTimeout(timeout);
            handler.remove();
        	if(window.localStorage){
	        	var storage=window.localStorage;
	        	storage.setItem("protocolInstallSuccess","success");
        	}
            if(typeof(successCallback) !="undefined"){
            	successCallback();
            }
        }
        top.window.location = uri;
    }

    function openUriUsingFirefox(uri, failCb) {
        var iframe = document.querySelector("#hiddenIframe");
        if (!iframe) {
            iframe = _createHiddenIframe(document.body, "about:blank");
        }
        try {
            iframe.contentWindow.location.href = uri;
        } catch (e) {
                failCb();
        }
    }

    
    function checkua(){
    	var ua= navigator.userAgent;
    	if(ua.indexOf("wbx 1.0.0")!=-1){
    		return true;
    	}else{
    		return false;
    	}
    	
    }
    
    function openUriUsingIEInOlderWindows(uri, failCb) {
    	if(getInternetExplorerVersion() === 11||getInternetExplorerVersion() === 9||getInternetExplorerVersion() === 10){
    		if(checkua()){
    			iframe = _createHiddenIframe(document.body, "about:blank");
    			iframe.contentWindow.location.href = uri;
    		}else{
    			failCb();
    		}
    	}else{
    		failCb();
    	}
    }



    
    function openUriWithMsLaunchUri( ) {
    	 window.edgecall();
    }
    window.edgecall=function (){
    	if(window.uri_g.indexOf("DocShow")!=-1){
    		navigator.msLaunchUri(window.uri_g,function(){
    			window.succCallback();
    		},function(){
    			window.failshowui();
    		});
    		return;
    	}
    	navigator.msLaunchUri(window.uri_g,function () { }, window.failshowui );
    }

    function checkBrowser() {
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        return {
            isOpera: isOpera,
            isFirefox: /Firefox/.test(navigator.userAgent),
            isChrome: /Chrome/.test(navigator.userAgent),
            isIE: ((/MSIE/.test(navigator.userAgent)) || (/Trident/.test(navigator.userAgent)))&&(navigator.userAgent.indexOf("Edge")==-1)  // At least IE6
        }
    }

    function getInternetExplorerVersion() {
        var rv = -1;
        if (navigator.appName === "Microsoft Internet Explorer") {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        else if (navigator.appName === "Netscape") {
            var ua = navigator.userAgent;
            var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    }
   
    window.failshowui=null;
    window.uri_g=null;
    window.protocolCheck = function (uri, failCb,succ) {
    	window.uri_g=uri;
    	function failCallback() {
            failCb && failCb();
        }
    	
    	window.succCallback = function(){
    		succ && succ();
        }
    	
    	window.failshowui=function(){
    		failCb && failCb();
    	}
    	var browser = checkBrowser();
    	if (navigator.msLaunchUri&&!browser.isIE) { //for IE and Edge in Win 8 and Win 10
            openUriWithMsLaunchUri();
        } else {
        	if (browser.isIE) {
                openUriUsingIEInOlderWindows(uri, failCallback);
            }else if (browser.isFirefox) {
                openUriUsingFirefox(uri, failCallback);
            } else if (browser.isChrome) {
                openUriWithTimeoutHack(uri, failCallback,succ);
            }else{
                openUriUsingFirefox(uri, failCallback);
            }
        }
    }
} (window));


var browserType = null;
var browserVersion = null;
(
    function() {
        var ua = navigator.userAgent.toLowerCase();
        var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        var tem = [];

        /*if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+.?\d*)/g.exec(ua) || [];
            type = 'Internet Explorer';
            version = tem[1];
        }
        else*/ if(/firefox/i.test(M[1])) {
            tem = /\brv[ :]+(\d+.?\d*)/g.exec(ua) || [];
            browserType = 'firefox';
            browserVersion = tem[1];
        }
        /*
        else if(/safari/i.test(M[1])) {
            var opera = ua.match(/\b
        }
         */
        else if(/chrome/i.test(M[1])) {
            tem = ua.match(/\b(chrome)\/(\d+.?\d*.?\d*.?\d*)/);
            browserType = 'chrome';
            browserVersion = tem[2];

            // TODO, Need further judgment: opera, edge, chrome
        }
    }
)();

var NativeMessaging = function(self) {
	self.about = {
		name: 'Cisco WebEx Meeting SDK (Native Messaging)',
		version: 1.0
	};
	self.token_ = '';
	self.unloading = false;

	var extensionId = 'jlhmfgmfgeifomenelglieieghnjghma';
	self.resUrl = '';

	var kExtensionNotInstalled = 'ExtensionNotInstalled';
	var kHostNotInstalled = 'HostNotInstalled';
	var kOK = 'ok';

	var Error = {
		Err_ExtensionNotInstalled: {
			ErrorCode: 1001,
			ErrorString: kExtensionNotInstalled
		},
		Err_HostNotInstalled: {
			ErrorCode: 1002,
			ErrorString: kHostNotInstalled
		},
		Err_NotConnected: {
			ErrorCode: 1003,
			ErrorString: 'NotConnected'
		},
		Err_HasConnected: {
			ErrorCode: 1004,
			ErrorString: 'HasConnected'
		},
		Err_BadDocshow: {
			ErrorCode: 1005,
			ErrorString: 'BadDocshow'
		}
	};

	var ConnectionStatus = {
		UNKNOWN:		1,
		CONNECTING: 	2,
		CONNECTED: 		4,
		DISCONNECTING: 	8,
		DISCONNECTED: 	16
	};

	var getConnectionStatus = function(status) {
		switch (status) {
			case ConnectionStatus.CONNECTING:
				return 'ConnectionStatus.CONNECTING';
			case ConnectionStatus.CONNECTED:
				return 'ConnectionStatus.CONNECTED';
			case ConnectionStatus.DISCONNECTING:
				return 'ConnectionStatus.DISCONNECTING';
			case ConnectionStatus.DISCONNECTED:
				return 'ConnectionStatus.DISCONNECTED';
			default:
				return 'ConnectionStatus.UNKNOWN';
		}
	};

	var iframeId = 'wbx-extension-iframe-43c85c0d-d633-af5e-c056-32dc7efc570b';
	var iframeSrc ='cwcsf-nativemsg-iframe-43c85c0d-d633-af5e-c056-32dc7efc570b.html'; 
	var _useEdgeExt= false;
	var state_ = {
		ExtState: { 'result': false, 'reason': kExtensionNotInstalled },
		HostState: { 'result': false, 'reason': kHostNotInstalled }
	};
	var oldState_ = null;
	var document_ = null;
	var handlers_ = [];
	var connStatus_ = ConnectionStatus.UNKNOWN;
	var lastError_ = '';
	var extTimes_ = 0;
	var hostTimes_ = 0;
	var timeout_ = 2000;
	var hostUpdating_ = false;
	var hostForcedUpdating_ = false;	//bug CSCut76264
	var docshow_ = null;
	var intervalId = null;
	var loopcountwarmup=null;
	var handleIframeLoad = function() {
		if(loopcountwarmup!=null&&loopcountwarmup!=undefined){
			loopcountwarmup++;
			if(loopcountwarmup>1){
				return;
			}
		}
		console.log('[NativeMessaging] handleIframeLoad: state_.ExtState.result=', state_.ExtState.result, 'extTimes_=', extTimes_);
		if (state_.ExtState.result != true) {
			// FIXME
			if (extTimes_ == 0) {
				state_.ExtState.result = false;
				state_.ExtState.reason = kExtensionNotInstalled;
			}
			if (extTimes_ == 1 && _useEdgeExt) {
				notifyStateChanged(state_, false);
			}else if(extTimes_==0&&!_useEdgeExt){
				notifyStateChanged(state_, false);
			}
			setTimeout(function() {
				extTimes_++;
				var iframeObj = document.getElementById(iframeId);
				if (iframeObj != null) {
					var url = iframeObj.src
					if(_useEdgeExt){
						iframeSrc="cwcsf-nativemsg-iframe-47c988a4-c91d-4ba8-a458-91d6542be08b.html";
						url = iframeObj.src.replace("cwcsf-nativemsg-iframe-43c85c0d-d633-af5e-c056-32dc7efc570b.html","cwcsf-nativemsg-iframe-47c988a4-c91d-4ba8-a458-91d6542be08b.html");
					}
					iframeObj.src = url;
				}
			}, timeout_);
		} else {
			console.log('[NativeMessaging] checking extension... READY');
			if (typeof(extensionHelpDialog)!="undefined"&&extensionHelpDialog) {
				extensionHelpDialog.close();
			}
		}
	};

	var appendIframe = function() {
		console.log('[NativeMessaging] appendIframe');
		var iframeObj = document.getElementById(iframeId);
		//if (iframeObj == null) {
		//	var iframeObj = document.createElement('iframe');
		//	document.body.appendChild(iframeObj);
		//	iframeObj.setAttribute('src', iframeSrc);
		//}
		//iframeObj.setAttribute('id', iframeId);
		//iframeObj.setAttribute('frameborder', 'none');
		//iframeObj.setAttribute('style', 'width:0px;height:0px;');
		
		iframeObj.onload = handleIframeLoad;
		var url = iframeObj.src;
		iframeObj.src = url;
	};

	self.handleHelloAck = function() {
		state_.HostState.result = true;
		state_.HostState.reason = kOK;
		connStatus_ = ConnectionStatus.CONNECTED;
		if (!hostUpdating_) {
			notifyStateChanged(state_, false);
		} else {
			//console.log('[NativeMessaging] handleNativeMessage: docshow_=', docshow_);
			hostUpdating_ = false;
			if (hostForcedUpdating_) {	//bug CSCut76264
				notifyStateChanged(state_, true);
				hostForcedUpdating_ = false;
			} else {
				if (docshow_ != null) {
					self.sendMessage(docshow_);
					docshow_ = null;
				} else {
					// TODO
				}
			}
		}
	};

	self.handleHostNotify = function(json_msg) {
		var msg = json_msg.message;
		if (msg.result == '0') {			// update success
			hostUpdating_ = true;
			hostForcedUpdating_ = false;
			self.disconnect();
		} else {
			// NEVER HAPPENED
		}
	};

	self.handleNativeDisconnect = function(json_msg) {
		console.log('[NativeMessaging] handleNativeDisconnect: connStatus_=', getConnectionStatus(connStatus_), 'hostTimes_=', hostTimes_);
		if (!hostUpdating_) {
			if (connStatus_ == ConnectionStatus.DISCONNECTED) {
				state_.HostState.result = false;
				state_.HostState.reason = json_msg.message;
				notifyStateChanged(state_, false);
				return;
			}
			if (connStatus_ == ConnectionStatus.CONNECTING && hostTimes_ < 1) {
				return;
			}
			
			state_.HostState.result = false;
			state_.HostState.reason = json_msg.message;
			if (connStatus_ != ConnectionStatus.DISCONNECTING) {	// extension disabled or host killed
				//notifyStateChanged(state_, false);
				try {
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() {
						console.log('[NativeMessaging] handleNativeDisconnect: readyState=', xmlhttp.readyState, 
										'status=', xmlhttp.status);
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
							state_.ExtState.result = true;
							state_.ExtState.reason = kOK;
							notifyStateChanged(state_, false);
						} else {
						}
					}

					if (browserType == 'chrome')
						xmlhttp.open('GET', 'chrome-extension://' + extensionId + '/' + iframeSrc, false);
					else if (browserType == 'firefox')
						xmlhttp.open('GET', self.resUrl, false);
					xmlhttp.send();
				} catch (err) {
					console.log('[NativeMessaging] handleNativeDisconnect: err=', err);
					if (!self.unloading) {
						state_.ExtState.result = false;
						state_.ExtState.reason = kExtensionNotInstalled;
						notifyStateChanged(state_, false);
					}
				}
			} else {
				state_.ExtState.result = false;
				state_.ExtState.reason = kExtensionNotInstalled;
				notifyStateChanged(state_, false);
			}

			//extTimes_ = 0;
			//handleIframeLoad();

			connStatus_ = ConnectionStatus.DISCONNECTED;
		} else {
			connStatus_ = ConnectionStatus.DISCONNECTED;
			if (hostForcedUpdating_) {	// bug CSCut76264
				setTimeout(function() {
					self.connect();
				}, timeout_);
			} else {
				setTimeout(function() {
					self.connect();
				},3000);
			}
		}
	};

	self.handleStateChanged = function(json_msg) {
		console.log('[NativeMessaging] handleStateChanged: json_msg=', json_msg);
		console.log('[NativeMessaging] handleStateChanged: state_=', state_);
		console.log('[NativeMessaging] handleStateChanged: connStatus_=', getConnectionStatus(connStatus_));
		if (typeof json_msg.message.ExtState != undefined && json_msg.message.ExtState != null) {
			state_.ExtState.result = json_msg.message.ExtState.result;
			state_.ExtState.reason = json_msg.message.ExtState.reason;
			console.log('[NativeMessaging] handleStateChanged: state_=', state_);
			if (state_.ExtState.result == true) {
 				if (browserType == 'firefox')
					self.resUrl = json_msg.message.res_url;

				document_ = document.getElementById(iframeId).contentWindow.document;
				if (state_.HostState.result == false) {
					self.connect();
					if (intervalId == null) {
						intervalId = setInterval(function() {
							if (state_.HostState.result == true) {
								clearInterval(intervalId);
								intervalId = null;
							} else {
								self.connect();
								if(intervalId!=null){
									if(loopcountwarmup!=null&&loopcountwarmup!=undefined){
										loopcountwarmup++;
										if(loopcountwarmup>1){
											clearInterval(intervalId);
											return;
										}
									}
								}
								console.log('[NativeMessaging] reconnecting to HOST... hostTimes_=', hostTimes_);
							}
						}, timeout_);
					}
					return;
				} else {
					// TODO, NEVER HAPPEN ??? !!!
				}
			} else {
				if (intervalId != null) {
					clearInterval(intervalId);
					intervalId = null;
				}
				if (connStatus_ == ConnectionStatus.CONNECTING) {
					extTimes_ = 0;
					handleIframeLoad();
				}
				connStatus_ = ConnectionStatus.DISCONNECTED;//UNKNOWN
			}
		}
		if (typeof json_msg.message.HostState != undefined && json_msg.message.HostState != null) {
			state_.HostState = json_msg.message.HostState;
		} else {
			// TODO
		}
		notifyStateChanged(state_, false);
	};

	self.handleNativeMessage = function(event) {
		console.log('[NativeMessaging] handleNativeMessage: event.detail=', event.detail);
		console.log('[NativeMessaging] handleNativeMessage: connStatus_=', getConnectionStatus(connStatus_), 'hostUpdating_=', hostUpdating_);

		var json_msg = "";
		if (browserType == 'chrome')
			json_msg = event.detail;
		else if (browserType == 'firefox')
			json_msg = JSON.parse(event.detail);
		
		if(json_msg.token&&self.token_!=json_msg.token){
			console.log("[NativeMessaging] handleNativeMessage:multiple occur....",json_msg.token);
			return;
		}
		if (json_msg.message_type == 'state_changed') {
			self.handleStateChanged(json_msg);
		} else if (json_msg.message_type == 'hello_ack') {
			self.handleHelloAck();
		} else if (json_msg.message_type == 'host_notify') {
			self.handleHostNotify(json_msg);
		} else if (json_msg.message_type == 'disconnect_ack') {
			connStatus_ = ConnectionStatus.DISCONNECTING;
		} else if (json_msg.message_type == 'disconnect') {
			self.handleNativeDisconnect(json_msg);
		} else if (json_msg.message_type == 'error') {
			self.handleError(json_msg.message);
		} else {
			var h = null;
			for (var i = 0; i < handlers_.length; i++) {
				h = handlers_[i];
				if (h != null && h.messageType == json_msg.message_type) {
					h.handler(json_msg.message);
				}
			}
		}
		event.preventDefault();
	};

	self.init = function(token,warmupCount,useEdgeExt) {
		console.log('[NativeMessaging] NativeMessaging Init');
		if(typeof(warmupCount)!="undefined"){
			loopcountwarmup=warmupCount;
		}
		_useEdgeExt = useEdgeExt;
		if(useEdgeExt==true){
			extensionId="ikdddppdhmjcdfgilpnbkdeggoiicjgo";
			iframeSrc="cwcsf-nativemsg-iframe-47c988a4-c91d-4ba8-a458-91d6542be08b.html";
		}
		//addLog({'event_type': 'DocJsInitNativeMessage', 'error_code': 9810});
		document.addEventListener('native_message', self.handleNativeMessage);
		self.token_ = token;
		appendIframe();
	};

	self.getServiceState = function() {
		return state_;
	};

	self.cleanup = function() {
		state_ = {
			ExtState: { 'result': false, 'reason': kExtensionNotInstalled },
			HostState: { 'result': false, 'reason': kHostNotInstalled }
		};
		oldState_ = null;

		var iframeObj = document.getElementById(iframeId);
		if (iframeObj != null) {
			var parentNode = iframeObj.parentNode;
			parentNode.removeChild(iframeObj);
		}
		document_ = null;
		handlers_ = [];
		connStatus_ = ConnectionStatus.UNKNOWN;
	};

	var dispatchEvent = function(event) {
		if (document_ == null && !state_.ExtState.result) {
			self.handleError({
				'error_code': Error.Err_ExtensionNotInstalled.ErrorCode,
				'error_message': Error.Err_ExtensionNotInstalled.ErrorString
			});
		} else {
			document_.dispatchEvent(event);
		}
	}

	self.connect = function() {
		if(loopcountwarmup!=null&&loopcountwarmup!=undefined && loopcountwarmup>=1 && !hostUpdating_){
			return;
		}
		hostTimes_++;
		console.log('[NativeMessaging] connect: connStatus_=', getConnectionStatus(connStatus_));
		if (connStatus_ != ConnectionStatus.CONNECTED) {
			connStatus_ = ConnectionStatus.CONNECTING;
			var event = new CustomEvent('connect', {
				detail: {
					'timestamp': (new Date()).toUTCString(),
					'token': self.token_,
					'message_type': 'connect',
					'message': extensionId
				}
			});
			dispatchEvent(event);
		} else {
			self.handleError({
				'error_code': Error.Err_HasConnected.ErrorCode,
				'error_message': Error.Err_HasConnected.ErrorString
			});
		}
	};

	self.disconnect = function() {
		console.log('[NativeMessaging] disconnect: connStatus_=', getConnectionStatus(connStatus_));
		if (connStatus_ == ConnectionStatus.CONNECTED) {
			connStatus_ = ConnectionStatus.DISCONNECTING;
			var event = new CustomEvent('message', {
				detail: {
					'timestamp': (new Date()).toUTCString(),
					'token': self.token_,
					'message_type': 'disconnect',
					'message': 'disconnect'
				}
			});
			dispatchEvent(event);
		} else {
			self.handleError({
				'error_code': Error.Err_NotConnected.ErrorCode,
				'error_message': Error.Err_NotConnected.ErrorString
			});
		}
	};

	self.sendMessage = function(json_msg) {
		if (connStatus_ != ConnectionStatus.CONNECTED) {
			self.handleError({
				'error_code': Error.Err_NotConnected.ErrorCode,
				'errro_string': Error.Err_NotConnected.ErrorString
			});
		} else {
			// if message type is launch_meeting, buffer the docshow for further use
			if (json_msg.message_type == 'launch_meeting') {
				try {
					JSON.parse(json_msg.message);
				} catch (err) {
					self.handleError({
						'error_code': Error.Err_BadDocshow.ErrorCode,
						'errro_string': Error.Err_BadDocshow.ErrorString
					});
					return;
				}
				docshow_ = json_msg;
			}
			var event = new CustomEvent('message', {
				detail: json_msg
			});
			dispatchEvent(event);
		}
	};

	self.handleError = function(error) {
		console.log('[NativeMessaging] handleError: error=', error);
		if(error.error_code == '1003'){
			return;
		}
		if (error.error_code == '2004') {	//bug CSCut76264
			hostUpdating_ = true;
			self.disconnect();
			if (hostForcedUpdating_) {
				state_.HostState.result = false;
				state_.HostState.reason = error.message.error_message;
				return;
			}
			hostForcedUpdating_ = true;
		}
		var h = null;
		for (var i = 0; i < handlers_.length; i++) {
			h = handlers_[i];
			if (h != null && h.messageType == 'error') {
				h.handler(error);
			}
		}
	};

	var addLog = function(log) {
		console.log('[NativeMessaging] addLog: log=', log);
		var h = null;
		for (var i = 0; i < handlers_.length; i++) {
			h = handlers_[i];
			if (h != null && h.messageType == 'jmf_log') {
				h.handler(log);
			}
		}
	}

	var notifyStateChanged = function(state, force) {
		console.log('[NativeMessaging] notifyStateChanged: state.ExtState.result=', state.ExtState.result,
				', oldState_.ExtState.result=', oldState_ != null ? oldState_.ExtState.result : '');
		console.log('[NativeMessaging] notifyStateChanged: state.HostState.result=', state.HostState.result,
				', oldState_.HostState.result=', oldState_ != null ? oldState_.HostState.result : '');
		if (!force && oldState_ != null && oldState_.ExtState.result == state.ExtState.result && oldState_.HostState.result == state.HostState.result)
			return;

		oldState_ = {
			ExtState: { 'result': state.ExtState.result, 'reason': state.ExtState.reason },
			HostState: { 'result': state.HostState.result, 'reason': state.HostState.reason }
		};
		console.log('[NativeMessaging] notifyStateChanged: state=', state);
		var h = null;
		for (var i = 0; i < handlers_.length; i++) {
			h = handlers_[i];
			if (h != null && h.messageType == 'state_changed') {
				h.handler(state);
			}
		}
	};

	var Handler_ = function(messageType, handler) {
		this.handler = handler;
		this.messageType = messageType;
	};

	self.addHandler = function(messageType, handler) {
		handlers_.push(new Handler_(messageType, handler));
	};

	return self;
};

window.onbeforeunload = function() {
	NativeMessaging.unloading = true;
};

var WarmMeetingAPI = (function(self) {
	self.about = {
		name: 'Cisco WebEx Meeting API',
		version: 1.0
	};
	
	self.METHOD = {
		MEETINGAPI_NATIVE_MESSAGING: 1,
		MEETINGAPI_WEBSOCKET: 2
	};
	
	//self.lastError = null;
	self.jmfLog_ = null;
	self.service_ = null;
	self.token_ = 'x' + (new Date()).getTime().toString(16);
	
	var onError_ = function(err) {
		var errMsg = {
			'timestamp': (new Date()).toUTCString(),
			'token': self.token_,
			'message_type': 'error',
			'message': err
		};
		self.onError.dispatch(errMsg);
	}
	
	self.init = function(method, jmfLog,warmupCount,useEdgeExt) {
		self.jmfLog_ = jmfLog;
		if (method == self.METHOD.MEETINGAPI_NATIVE_MESSAGING) {
			console.log('[MeetingAPI], MEETINGAPI_NATIVE_MESSAGING, init');
			self.service_ = new NativeMessaging(NativeMessaging || {});
			self.service_.init(self.token_,warmupCount,useEdgeExt);
			
			self.service_.addHandler('connect_ack', function(msg) {
				self.onConnect.dispatch(msg);
			});
			self.service_.addHandler('disconnect_ack', function(msg) {
				self.onDisconnect.dispatch(msg);
			});
			self.service_.addHandler('error', function(msg) {
				self.onError.dispatch(msg);
			});
			self.service_.addHandler('launch_meeting_ack', function(msg) {
				self.onLaunched.dispatch(msg);
			});
			self.service_.addHandler('state_changed', function(msg) {
				self.onServiceStateChanged.dispatch(msg);
			});
			self.service_.addHandler('message', function(msg) {
				self.onMessage.dispatch(msg);
			});
			self.service_.addHandler('jmf_log', function(msg) {
				if (self.jmfLog_ != null && self.jmfLog_ != '') {
					self.jmfLog_.addLog({event_type: msg.event_type, error_code: msg.error_code});
				}
			});
			
		} else {
			console.log('[MeetingAPI], MEETINGAPI_WEBSOCKET, NotImplemented');
		}
	};
	
	self.cleanup = function() {
		if (self.service_ != null) {
			self.service_.cleanup();
		}
	};

	self.getServiceState = function () {
		if (self.service_ != null) {
			return self.service_.getServiceState();
		}
		return false;
	};

	self.connect = function() {
		if (self.service_ != null) {
			self.service_.connect();
		}
	};
	
	self.disconnect = function() {
		if (self.service_ != null) {
			self.service_.disconnect();
		}
	};

	self.launchMeeting = function(param) {
		if (self.service_ != null) {
			try {
				var msg = {
					'timestamp': (new Date()).toUTCString(),
					'token': self.token_,
					'message_type': 'launch_meeting',
					'message': param
				};
				self.service_.sendMessage(msg);
			} catch (e) {
				console.log(e.toString());
				onError_(e.toString());
			}
		}
	};
	
	self.sendMessage = function(message) {
		if (self.service_ != null) {
			try {
				var msg = {
					'timestamp': (new Date()).toUTCString(),
					'token': self.token_,
					'message_type': 'message',
					'message': message
				};
				self.service_.sendMessage(msg);
			} catch (e) {
				console.log(e.toString());
				onError_(e.toString());
			}
		}
	};
	
	var Event_ = function(eventName) {
		//console.log('[MeetingAPI] New Event', eventName);
		this.eventName_ = eventName;
		this.listeners_ = new Array();
	};
	
	Event_.prototype.addListener = function(cb) {
		if (cb != null) {
			this.listeners_.push(cb);
		}
	};

	Event_.prototype.dispatch = function(args) {
		//console.log('[MeetingAPI]', this.eventName_, 'args:', args);
		for (var i = 0; i < this.listeners_.length; i++) {
			this.listeners_[i](args);
		}
	};
	
	self.onConnect = new Event_('onConnect');
	self.onDisconnect = new Event_('onDisconnect');
	self.onError = new Event_('onError');
	self.onLaunched = new Event_('onLaunched');
	self.onServiceStateChanged = new Event_('onServiceStateChanged');
	self.onMessage = new Event_('onMessage');
	
	return self;
})(WarmMeetingAPI || {});
var TrainWarmUpAPI = (function(){
	
	var warmupParam=null;
	var $=null;
	var _iframepath="";
	var predownloadRefreshTime = "";
	var checkBrowser=function () {
	        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	        return {
	            isOpera: isOpera,
	            isNewEdge:/Edg/.test(navigator.userAgent),
	            isFirefox: /Firefox/.test(navigator.userAgent),
	            isSafari: /Safari/.test(navigator.userAgent),
	            isChrome: /Chrome/.test(navigator.userAgent),
	            isEdge:navigator.userAgent.indexOf("Edge") > -1,
	            isIE: ((/MSIE/.test(navigator.userAgent)) || (/Trident/.test(navigator.userAgent)))&&(navigator.userAgent.indexOf("Edge")==-1)
	        }
	    }
	
	var inits = function(param,domContain,iframepath,warmupRefreshTime){
		warmupParam=param;
		var uesEdgeExtenison=false;
		try{
			uesEdgeExtenison = ("true"==JSON.parse(warmupParam).useEdgeExtension)
		}catch(e){
			uesEdgeExtenison=false;
		}
		
		predownloadRefreshTime=warmupRefreshTime
		$=domContain;
		if(typeof(iframepath)!="undefined"){
			_iframepath=iframepath;
		}
		beginewarmup(uesEdgeExtenison);
	}
	
	var	setCookie =function(c_name,value){
		if(window.localStorage){
			var storage=window.localStorage;
			storage.setItem(c_name,value);
		}
	}
	
	
	
	var getCookie =function(c_name){
		if(window.localStorage){
	   		 var storage=window.localStorage;
	   		 return storage.getItem(c_name);    
	   	}else{
	   		return null;
	   	}
	}
	
	
	var onMeetingLaunchEvent = function(msg){
        if(msg){
        	WarmMeetingAPI.disconnect();
        	window.removeEventListener("unload",wdisconnect);
        }
    };
   var  onMeetingErrorEvent = function(message){
	   console.log(message);
	   WarmMeetingAPI.disconnect();
	   window.removeEventListener("unload",wdisconnect);
    };
    
    
   var wdisconnect = function(){
	   WarmMeetingAPI.disconnect();
   }
   var warmupcount =0; 
   var warmupchangeStates= function(serviceStatus) {
       var extensionStatus = serviceStatus.ExtState.result;
       var nativeHostStatus = serviceStatus.HostState.result;
	   if(extensionStatus && nativeHostStatus&&warmupcount==0){
		   warmupcount++;
		   WarmMeetingAPI.launchMeeting(String(warmupParam));
	   }else if (warmupcount==0){
	   }
   }
   
   
	var beginewarmup=function(useEdgeExt){
		var version = (navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie|chrome|version)[\/: ]([\d]+)/) || [0, '0'])[1];
		var isWinDocshowOs= /Win/.test(navigator.platform);
		var isMacDocshowOs= /Mac/.test(navigator.platform);
		if(navigator.userAgent.indexOf("linux")!=-1){
			
        }
		if(!isWinDocshowOs && !isMacDocshowOs){
			return;
		}
		var browser=checkBrowser();

		if(!warmupParam || warmupParam == "null" ){
			return;
		}

		var warmupTime = getCookie("warmupTime")
		var currentTime = new Date().getTime();
		if(warmupTime && ((parseInt(warmupTime) + predownloadRefreshTime*60*1000) - currentTime) > 0){
			return;
		}else{
			setCookie("warmupTime", currentTime);
		}
		if (warmupParam.indexOf("GpcDownloadOnly") > 0) {
			downloadType = "preDownload";
		}
		if(browser.isEdge||browser.isIE){
			 if (typeof(window.protocolCheck)!="undefined") {
				   window.protocolCheck("wbx:DocShow:"+warmupParam,
                        function () {
					   
                        }, function () {
                        	
                        });
			 }
		}else if(browser.isChrome||browser.isFirefox){
			if(browser.isChrome&&version<38){
				return;
			}
			if(browser.isFirefox&&version<52){
				return;
			}
			if(useEdgeExt){
				_iframepath = _iframepath.replace("cwcsf-nativemsg-iframe-43c85c0d-d633-af5e-c056-32dc7efc570b.html","cwcsf-nativemsg-iframe-47c988a4-c91d-4ba8-a458-91d6542be08b.html");
			}
			$.innerHTML=""
			$.innerHTML='<iframe id="wbx-extension-iframe-43c85c0d-d633-af5e-c056-32dc7efc570b" src="'+_iframepath.replace("?ver=","")+'"></iframe>';
			if(typeof(WarmMeetingAPI)!="undefined"){
				WarmMeetingAPI.init(WarmMeetingAPI.METHOD.MEETINGAPI_NATIVE_MESSAGING, null,0,useEdgeExt);
				WarmMeetingAPI.onLaunched.addListener(onMeetingLaunchEvent);
				WarmMeetingAPI.onError.addListener(onMeetingErrorEvent);
				WarmMeetingAPI.onServiceStateChanged.addListener(warmupchangeStates);
			}
			
			window.addEventListener('unload', wdisconnect);
			
		}
		
	}
	
	return {
		init:function(param,domContain,iframepath,warmupRefreshTime){
            inits(param,domContain,iframepath,warmupRefreshTime);
		}
	}
	
	
	
})()