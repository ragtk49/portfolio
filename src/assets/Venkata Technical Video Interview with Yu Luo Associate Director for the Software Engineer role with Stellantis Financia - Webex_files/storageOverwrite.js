//walkMe_wm-po-q,walkMe_wm-po-p,walkMe_wm-po-r,9e9b087ed0d448fdb6981e565d6cba3cpriority
const functionStorageList = ["wm-state","wm-preload-data", "wm-lang", "walkMe_wm-wmv","walkMe_wm-lnchr-ply-ssn",
  "walkMe_wm-wtchd-19", "walkMe_wm-ASRep-19-606689", "walkMe_wm-flw-preplay", "walkMe_wm-flow-stack","walkMe_wm-smtp-init","walkMe_wm-session-per-user","walkMe_wm-ueug","walkMe_wm-fgug","walkMe_wm-cdplay","walkMe_wm-ldv"]

const performanceStorageList = ["ADRUM_AGENT_INFO","ADRUM_CLIENTINFO","telemetryInitData", "telemetrySends","doiQueue","currentJmtData","pb_first_join",
  "isRetUser","endMeetingReasonFlag", "endMeetingReasonInfo", "confid3rdLogin"]
const Cookie_Consent_Option = "CookieConsentOption"

const originSetItem = Storage.prototype.setItem
Storage.prototype.setItem = function () {
    try {
      let selection = readStorageCookieConsentOption()
      if (selection.functionalValue == 0 && functionStorageList.find(element => arguments[0] === element)) {
         return;
       }
     if (selection.performanceValue == 0 && performanceStorageList.find(element => arguments[0] === element)) {
         return;
       }
      originSetItem.apply(this, arguments)
      //console.log("set Storage:" +  arguments[0])

    } catch (e) {
        originSetItem.apply(this, arguments)
        console.log("overwrite storage error" + arguments[0] + e)
    }
}

//when user select cookie banner to reject.
function cookieBannerReject() {
  let str = readStorageCookieConsentOption()

  if (str.functionalValue == 0) {
    for (let i = 0; i < functionStorageList.length; ++i) {
      localStorage.removeItem(functionStorageList[i])
      sessionStorage.removeItem(functionStorageList[i])
    }
  }
  if (str.performanceValue == 0) {
    for (let i = 0; i < performanceStorageList.length; ++i) {
      localStorage.removeItem(performanceStorageList[i])
      sessionStorage.removeItem(performanceStorageList[i])
    }
  }
  return;
}

function readStorageCookieConsentOption() {
  let selection = {
    functionalValue: 1,
    performanceValue: 1,
  };
  try {
    const itemStr = localStorage.getItem(Cookie_Consent_Option)
    if (!itemStr) {
      return  selection;
    }
    const item = JSON.parse(itemStr)
      if (item.expiry) {
        const now = new Date()
        const date = new Date(Date.parse(item.expiry))
        if (now.getTime() > date.getTime())
          localStorage.removeItem(Cookie_Consent_Option)
      }
      if (item.value) {
        const str = JSON.parse(JSON.stringify(item.value));
        if (str != null && (str.functionalValue === 0 || str.functionalValue === 1))
          selection.functionalValue = str.functionalValue;
        if (str != null && (str.performanceValue === 0 || str.performanceValue === 1))
          selection.performanceValue = str.performanceValue;
      }
  }catch (e) {
    console.log("unknown error");
  }
  return selection;
}

function initStorageCookieConsentOption(functional, performance) {
  let itemStr = localStorage.getItem("CookieConsentOption");
  if (itemStr == null) {
    let defalut = {
      functionalValue: functional,
      performanceValue: performance,
    };
    writeStorageCookieConsentOption(defalut);
  }
}

function writeStorageCookieConsentOption(params) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  const item = {
    value: params,
    expiry: date,
  };
  localStorage.setItem('CookieConsentOption', JSON.stringify(item));
}

window.cleanStorageItem = cookieBannerReject
window.initStorageCookieConsentOption = initStorageCookieConsentOption
window.writeStorageCookieConsentOption = writeStorageCookieConsentOption






