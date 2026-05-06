/* jshint -W100 */

/* DATE		MGRNO		SA		PG		Desc
1061012     1060819     Eric    Eric    憑證登入及傳送簽章時若跨平台網頁元件作業異常, 提示使用者錯誤訊息
1060421					Eric	Eric	修改取HiCOS LocalServer元件版本失敗時異常提示內容.
2016.10.18 								因叫用AuthWS使用SOAPClient, 故使用本Lib的網頁須include RD-soapclient.js
2016.7.11 				Eric Peng		HiCOS LocalSignServer wrapper 
*/

/* SCard_MajorErrorReason() / SCard_MinorErrorReason() are port from CHT errorcode.js */
function SCard_MajorErrorReason(rcode) {
    switch(rcode) {
        case 0x76000001:
            return "未輸入金鑰";
        case 0x76000002:
            return "未輸入憑證";
        case 0x76000003:
            return "未輸入待簽訊息";
        case 0x76000004:
            return "未輸入密文";
        case 0x76000005:
            return "未輸入函式庫檔案路徑";
        case 0x76000006:
            return "未插入IC卡";
        case 0x76000007:
            return "未登入";
        case 0x76000008:
            return "型態錯誤";
        case 0x76000009:
            return "檔案錯誤";
        case 0x7600000A:
            return "檔案過大";
        case 0x7600000B:
            return "JSON格式錯誤";
        case 0x7600000C:
            return "參數錯誤";
        case 0x7600000D:
            return "執行檔錯誤或逾時";
        case 0x7600000E:
            return "不支援的方法";
        case 0x76000031:
            return "在未授權的網坫執行元件";
        case 0x76000998:
            return "未輸入PIN碼";
        case 0x76000999:
            return "使用者已取消動作";
        case 0x76001000:
            return "輸入參數錯誤: No SOPIN";
        case 0x76001001:
            return "輸入參數錯誤: No Cert1";
        case 0x76001002:
            return "輸入參數錯誤: No Cert2";	
        case 0x76001003:
            return "輸入參數錯誤: No UserPIN";
        case 0x76001004:
            return "輸入參數錯誤: No ToBeSign";
        case 0x76001005:
            return "輸入參數錯誤: No SignKeyNo";			
        case 0x76100001:
            return "無法載入IC卡函式庫檔案";
        case 0x76100002:
            return "結束IC卡函式庫失敗";
        case 0x76100003:
            return "無可用讀卡機";
        case 0x76100004:
            return "取得讀卡機資訊失敗";
        case 0x76100005:
            return "取得session失敗";
        case 0x76100006:
            return "IC卡登入失敗";
        case 0x76100007:
            return "IC卡登出失敗";
        case 0x76100008:
            return "IC卡取得金鑰失敗";
        case 0x76100009:
            return "IC卡取得憑證失敗";
        case 0x76200001:
            return "pfx初始失敗";
        case 0x76200006:
            return "pfx登入失敗";
        case 0x76200007:
            return "pfx登出失敗";
        case 0x76200008:
            return "不支援的CA";
        case 0x76300001:
            return "簽章初始錯誤";
        case 0x76300002:
            return "簽章型別錯誤";
        case 0x76300003:
            return "簽章內容錯誤";
        case 0x76300004:
            return "簽章執行錯誤";
        case 0x76300005:
            return "簽章憑證錯誤";
        case 0x76300006:
            return "簽章DER錯誤";
        case 0x76300007:
            return "簽章結束錯誤";
        case 0x76400001:
            return "解密DER錯誤";
        case 0x76400002:
            return "解密型態錯誤";
        case 0x76400003:
            return "解密錯誤";
        case 0x76600001:
            return "Base64編碼錯誤";
        case 0x76600002:
            return "Base64解碼錯誤";
        case 0x76700001:
            return "伺服金鑰解密錯誤";
        case 0x76700002:
            return "未登錄伺服金鑰";
        case 0x76700003:
            return "伺服金鑰加密錯誤";
        case 0x76210001:
            return "身分證字號或外僑號碼比對錯誤";
        case 0x76210002:
            return "未支援的憑證型別";
        case 0x76210003:
            return "非元大寶來憑證";
        case 0x76210004:
            return "非中華電信通用憑證管理中心發行之憑證";
        case -536870893: //0xE0000013
            return "金鑰不相符";
        case -536870894: //0xE0000012
            return "使用者取消";
        case -536870896: //0xE0000010
            return "建立金鑰容器失敗，可能是因為權限不足";
        case -536870897: //0xE000000F
            return "找不到任一家CA發的該類別用戶憑證，但中華電信該憑證類別中有找到其他用戶";
        case -536870898: //0xE000000E
            return "開啟物件(p7b)失敗";
        case -536870899: //0xE000000D
            return "HEX字串格式錯誤";
        case -536870900: //0xE000000C
            return "HEX字串長度錯誤";
        case -536870901: //0xE000000B
            return "寬位元字串轉多位元字串轉換失敗";
        case -536870902: //0xE000000A
            return "開啟CertStore失敗";
        case -536870903: //0xE0000009
            return "匯出檔案失敗";
        case -536870904: //0xE0000008
            return "匯入檔案失敗";
        case -536870905: //0xE0000007
            return "必須輸入檔案路徑";
        case -536870906: //0xE0000006
            return "找不到任一家CA發的該類別用戶憑證";
        case -536870907: //0xE0000005
            return "找不到中華電信該類別用戶憑證，但找得到其他CA發的該類別用戶憑證";
        case -536870908: //0xE0000004
            return "未支援的參加單位代碼";
        case -536870909: //0xE0000003
            return "金鑰的雜湊值不一致";
        case -536870910: //0xE0000002
            return "程式配置記憶體失敗";
        case -536870911: //0xE0000001
            return "找不到由中華電信所核發且合乎搜尋條件的憑證";
        default:
            return rcode.toString(16);
    }
}

function SCard_MinorErrorReason(rcode) {
    switch(rcode) {
        case 0x06:
            return "函式失敗";
        case 0xA0:
            return "PIN碼錯誤";
        case 0xA2:
            return "PIN碼長度錯誤";
        case 0xA4:
            return "已鎖卡";
        case 0x150:
            return "記憶體緩衝不足";
        case -2147483647:
            return "PIN碼錯誤，剩餘一次機會";
        case -2147483646:
            return "PIN碼錯誤，剩餘兩次機會";
        default:
            return rcode.toString(16);
    }
}
    
function SmartCard() {
    // constances
    var _timeout = 15000; // 2017.10.12 - 1060819 (調整為15秒)
    var _validOrigin = "http://localhost:61161";
    
    var _postTarget = null;
    var _timeoutId = 0;
    var _SCJobDfd = null, _jobParam = null;
   
    /* IE + ActiveX 內部使用此函式 */
    function _postData(target, data) {
        if (!http.sendRequest) {
            return null;
        }
        http.url = target;
        http.actionMethod="POST";
        var code=http.sendRequest(data);
        if (code!==0) {
            return null;
        }
        return http.responseText;
    }
    
    function _checkFinish() {
        if (_postTarget){
            _postTarget.close();
            if (!!_SCJobDfd) {
                _SCJobDfd.reject({success:false, _errMsg: '逾時未回應, 請檢查是否尚未安裝跨平台(簽章)元件.'});
                _stopMessageListen();
            }
        }
    }
    
    function _stopMessageListen() {
        $(window).off('message', receiveMessage);
    }
    
    function _startJob(dfd) {
        if (typeof dfd == 'undefined') {
            dfd = $.Deferred();
        }
        
        var data = null;
        var ua = window.navigator.userAgent;
        var tbsPackage='';
        var url='', mode='', postDataMain='', postDataParam='';
        var ieSignObj = null, extraErrMsg='';
        if (ua.indexOf("MSIE")!=-1 || ua.indexOf("Trident")!=-1)  { //is IE, use ActiveX
            if (_jobParam.funcName=='GetUserCert') {
                mode = 'Reading';
                postDataMain = 'http://localhost:61161/pkcs11info?withcert=true';
                postDataParam = '';
            }
            else if (_jobParam.funcName=='MakeSignature') {
                mode = 'Signing';
                postDataMain = 'http://localhost:61161/sign';
                
                tbsPackage=_packageTBS(_jobParam.tbs, _jobParam.encode, _jobParam.hashAlgorithm, _jobParam.pincode, _jobParam.funcName);
                postDataParam = "tbsPackage="+tbsPackage;
            }
            else {
                if (!!dfd) {
                    dfd.reject({success:false, _errMsg:'[跨平台(簽章)元件] 未知的funcName:'+_jobParam.funcName});
                }
                //_stopMessageListen();
                return;
            }
            
            // 2017.9.27 - 解決首頁啟用SSL時, IE瀏覽器無法開啟簽章作業彈出視窗問題
            //url= 'http://localhost:61161/waiting.gif';
            url = window.location.protocol + '//' + window.location.hostname + '/MS/IMAGE/waiting.gif';

            // 2020.7.2 - 1090390 Eric, 測試跨平台網頁元件最小size!
            //if (SSOUtil.isValueTrue(localStorage.dev_ConfirmSubmit)) {
            //    _postTarget = window.open(url, "簽章中","height=20, width=20, left=100, top=20");
            //}
            //else {
                _postTarget = window.open(url, mode, "height=200, width=200, left=100, top=20");
            //}
            
            if (_postTarget===null) {
                if (!!dfd) {
                    dfd.reject({success:false, _errMsg:'開啟HiCosLocalSign網頁失敗. [step1, null url]'});
                }
                return;
            }
            
            /*_postTarget.url = url;
            if (_postTarget===null) {
                if (!!dfd) {
                    dfd.reject({success:false, _errMsg:'開啟HiCosLocalSign網頁失敗. [step2, assign url]'});
                }
                return;
            }*/
            
            ieSignObj = document.getElementById("httpObject").innerHTML='<OBJECT id="http" width=1 height=1 style="LEFT: 1px; TOP: 1px" type="application/x-httpcomponent" VIEWASTEXT></OBJECT>';
            if (ieSignObj===null) {
                if (!!dfd) {
                    dfd.reject({success:false, _errMsg:'開啟HiCosLocalSign網頁失敗. [get httpObject elelment return null]'});
                }
                return;
            }
            
            // 2020.6.18 - Eric, 測時間
            //let tmBegin = 0;
            //if (SSOUtil.isValueTrue(localStorage.dev_postData)) {
            //    theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- HiCOS_IE _postData BEGIN...');
            //    tmBegin = Date.now();
            //}
            data = _postData(postDataMain, postDataParam);

            // 2020.6.18 - Eric, 測時間
            //if (SSOUtil.isValueTrue(localStorage.dev_postData)) {
            //    let _log = SSOUtil.dev_getTimeElapseStr('HiCOS_IE _postData', tmBegin);
            //    theLogger.time(_log);
            //}

            _postTarget.close();
            _postTarget=null;
            if (!data) {
                if (!!dfd) {
                    if (_jobParam.funcName=='GetUserCert') {
                        extraErrMsg = 'IE.GetUserCert, _postData return null';
                    }
                    else if (_jobParam.funcName=='MakeSignature') {
                        extraErrMsg = 'IE.MakeSignature, _postData return null';
                    }
                    dfd.reject({success:false, _errMsg:'元件無回應, 請檢查是否尚未安裝跨平台(簽章)元件.'});
                }
            } 
            else {
                if (_jobParam.funcName=='GetUserCert') {
                    _setUserCert(data);	
                }
                else if (_jobParam.funcName=='MakeSignature') {
                    _setSignature(data);
                }
            }   
        }
        /*else if (ua.indexOf('Edge')!=-1)  { //is MS Edge,
            $(window).on('message', receiveMessage);
            
            url = "http://localhost:61161/popupForm"; // "about:blank"
            _postTarget = window.open("", "簽章中","height=200, width=200, left=100, top=20");
            _postTarget.location = url;
            _timeoutId = setTimeout(_checkFinish, _timeout);
        }*/
        else{
            $(window).on('message', receiveMessage);
            
            url = "http://localhost:61161/popupForm"; // "about:blank"

            // 2020.7.2 - 1090390 Eric, 測試跨平台網頁元件最小size!
            if (window.location.href.indexOf('RD-DocSubmit.html')!==-1) {
                let wDlg = 200, hDlg = 200;
                let left = window.screen.width - wDlg;
                let top = window.screen.height - hDlg - 60;
                let sOpenParam = "height=" + hDlg + ", width=" + wDlg + ", left=" + left + ", top=" + top;
                theLogger.log('sOpenParam=' + sOpenParam);
                _postTarget = window.open(url, "簽章中", sOpenParam);
            }
            else {
                _postTarget = window.open(url, "簽章中","height=200, width=200, left=100, top=20");
            }
            
            if (_postTarget===null) {
                if (!!dfd) {
                    ua = window.navigator.userAgent;
                    dfd.reject({success:false, _errMsg:'開啟HiCosLocalSign網頁失敗. [NONE-IE, ua="' + ua + '"]'});
                }
                _stopMessageListen();
                return;
            }
            _timeoutId = setTimeout(_checkFinish, _timeout);
        }
    }
     
    function _packageTBS(tbs, encoding, hashAlgorithm, pincode, funcName) {
        var tbsData = {};
        tbsData.tbs = tbs;
        
        // 2017.1.16 - 支援使用hash值加簽
        if (encoding=='hashBase64') {
            tbsData.tbsEncoding='base64';
            // 不設定hashAlgorithem
            tbsData.signatureType="RAW"; // RAW
        }
        else {
            tbsData.tbsEncoding=encoding; // NONE, base64, 
            tbsData.hashAlgorithm=hashAlgorithm; // SHA1/SHA256/SHA384/SHA512
            tbsData.signatureType="PKCS1"; // PKCS1 / other?
        }
        
        tbsData.pin=pincode;
        tbsData.func=funcName; //"MakeSignature" / 
        var json = JSON.stringify(tbsData).replace(/\+/g,"%2B");
        return json;
    }
    
    function _setSignature(signature) {
        var ret = JSON.parse(signature);
        if (typeof ret=='undefined' || ret===null || (typeof ret.ret_code == 'undefined') || ret.ret_code===null) {
            if (!!_SCJobDfd) {
                _SCJobDfd.reject({success:false, _errMsg: 'parse signature info failed. value=' + signature});
                _stopMessageListen();
            }
        }
        else if (ret.ret_code!==0) {
            if (!!_SCJobDfd) {
                var _errMsg = '錯誤原因(或代碼):' + SCard_MajorErrorReason(ret.ret_code) + '(code=' + ret.ret_code + ')' ;
                if (typeof ret.message=='string' && ret.message.length) { // 2016.12.20 - add error message
                    _errMsg += (', ' + ret.message);
                }
                if (!!ret.last_error) {
                    _errMsg += ', ' + SCard_MinorErrorReason(ret.last_error) + '(code=' + ret.last_error + ')';
                }
                
                _SCJobDfd.reject({success:false,
                                  _errMsg:'跨平台(簽章)元件作業失敗, ' + _errMsg});
                _stopMessageListen();
            }
        }
        else {
            if (!!_SCJobDfd) {
                _SCJobDfd.resolve({success:true, signature: ret.signature, certb64: ret.certb64, ret_code: ret.ret_code });
                _stopMessageListen();
            }
        }
    }
    
    /* HiCOS local server 回傳憑證資訊後叫用, 取加簽用憑證後回傳
     * 
     * certData: HiCOS回傳的raw data (包含CA cert, sign Cert, encrypt Cert及其它憑證相關資訊)
     * usage: 取加簽或加密用憑證, 加簽用-> 'digitalSignature', 加密用-> 'keyEncipherment|dataEncipherment'
     *        (HiCOS亦支援CA Cert, 本模組目前未實作!)
     */
    function _setUserCert(certData, usage) {
        var ret=JSON.parse(certData);
        
        var _errMsg='';
        if (ret.ret_code!==0) {
            if (!!_SCJobDfd) {
                _errMsg = '跨平台(簽章)元件作業失敗, ' + SCard_MajorErrorReason(ret.ret_code) + '(code=' + ret.ret_code + ')';
                if (!!ret.last_error) {
                    _errMsg += ', ' + SCard_MinorErrorReason(ret.last_error) + '(code=' + ret.last_error + ')';
                }
                
                _SCJobDfd.reject({success:false, _errMsg: _errMsg});
                _stopMessageListen();
            }
            return;
        }
        
        /* 預設取簽章用憑證 */
        if (typeof usage == 'undefined')
            usage='digitalSignature'; // "keyEncipherment|dataEncipherment";
            
        /* target: ret.slots[i].token.certs[j] */
        var slots = ret.slots; // slots is an array
        var cntSlot = slots.length; // 讀卡機數量.
        var index, indexCert;
        var certs, cntCert=0;
        var cert=null, certb64='';
        for (index=0; index<slots.length; index++) {
            if ((typeof slots[index].token =='undefined') || slots[index].token===null || slots[index].token==="unknown token") {
                continue;
            }
            
            certs=slots[index].token.certs; // certs is an array
            cntCert += certs.length;
            for(indexCert=0; indexCert<certs.length; indexCert++) {
                // 2017.1.25 - HiCOS LocalServer v1.3.4.102700版, ROOT CA憑證會缺少usage欄位! (undefined)
                if ((typeof certs[indexCert].usage=='string') && (certs[indexCert].usage.indexOf(usage)!==-1)) // 取usage包含指定字串者
                {
                    cert = certs[indexCert];
                    certb64 = certs[indexCert].certb64;
                    break;
                }
            }
            
            if (certb64.length) {
                break;
            }
        }
        
        if (certb64.length) {
            if (!!_SCJobDfd) {
                _SCJobDfd.resolve({success:true, cert: cert});
                _stopMessageListen();
            }
        }
        else {
            if (!!_SCJobDfd) {
                if (cntCert===0) {
                    if (cntSlot===0) {
                        _SCJobDfd.reject({success:false, _errMsg:"無法取得憑證, 請確認讀卡機是否正常連接."});
                    }
                    else {
                        _SCJobDfd.reject({success:false, _errMsg:"無法取得憑證, 請確認是否已插入智慧卡."});
                    }
                    _stopMessageListen();
                }
                else if (usage=='digitalSignature') {
                    _SCJobDfd.reject({success:false, _errMsg:"找不到可用來加簽的憑證"});
                    _stopMessageListen();
                }
                else if (usage=='keyEncipherment|dataEncipherment') {
                    _SCJobDfd.reject({success:false, _errMsg:"找不到可用來加密的憑證"});
                    _stopMessageListen();
                }
            }
        }
    }
    
    /* Create HiCOS local server 網頁後, 該網頁會丟message給公文系統網頁, 在此函式處理該類訊息
     * 
     * Note: eventObj為jQuery包裝過的event物件, 原始event內容記錄在eventObj.originalEvent
     */
    function receiveMessage(eventObj) {
        var event = eventObj.originalEvent;
        
        /* 只處理HiCOS local server 'message' event
         * [HiCOS Lib Note:安全起見，這邊應填入網站位址檢查]
         */
        if (event.origin!=_validOrigin) { // "http://localhost:61161"
            return;
        }
        
        var ret = null, json;
        try {
            ret = JSON.parse(event.data);
            if (!!ret && ret.func) {
                /* 收到此訊息表示HiCOS local server 網頁已ready, 可以postMessage以執行後續作業 */
                if (ret.func=="getTbs") {
                    clearTimeout(_timeoutId);
                    if (_jobParam!==null)
                    {
                        if (_jobParam.funcName=='GetUserCert') {
                            /* 要求執行取憑證作業 */
                            json=JSON.stringify({func: _jobParam.funcName});
                        }
                        else {
                            /* 要求執行加簽作業 */
                            json=_packageTBS(_jobParam.tbs, _jobParam.encode, _jobParam.hashAlgorithm, _jobParam.pincode, _jobParam.funcName);
                        }
                        _postTarget.postMessage(json,"*");
                    }
                    else {
                        if (!!_SCJobDfd) {
                            _SCJobDfd.reject({success:false, _errMsg:'getTbs時, _jobParam為null.'});
                        }
                    }
                }
                /* 收到此訊息表示HiCOS local server 網頁已完成加簽作業, 可以在event.data取得簽體及憑證內容 */
                else if(ret.func=="sign") {
                    _setSignature(event.data);
                    _postData = null;
                }
                /* 收到此訊息表示HiCOS local server 網頁已完成取憑證作業, 可以在event.data取得卡片內憑證內容 */
                else if(ret.func=="pkcs11info"){
                    _setUserCert(event.data);
                }
            }
            /* 其它message event不處理 */
        }
        catch(e){
            if (_SCJobDfd) {
                _SCJobDfd.reject({success:false, _errMsg: 'receiveMessage, exception:' + e.message});
                _stopMessageListen();
            }
        }
    }
    
    /* 使用智慧卡加簽待簽內容
     * 參數:
     *   tbs: 待簽內容
     *   encode: NONE->未編碼字串, base64->以base64編碼的binary content, hashBase64->以base64編碼的hashvalue
     *   pincode: Smartcard pincode
     *   hashAlgorithm: 雜湊演算法, 目前支援: SHA1/SHA256/SHA384/SHA512
     */
    function _makeSignature(tbs, encode, pincode, hashAlgorithm, _newTimeout) {
       _SCJobDfd = $.Deferred();
        
        _jobParam = {
            tbs: tbs,
            encode: encode,
            pincode: encodeURIComponent(pincode), // 2020.7.15 - Eric, (CDC序67)pincode應叫用encodeURIComponent
            hashAlgorithm: hashAlgorithm,
            funcName: 'MakeSignature' // 產出簽體一律給此值.
        };

        if (typeof _newTimeout=='number' && _newTimeout>=5000 && _newTimeout<=60000) {
            _timeout = _newTimeout;
        }
        
        _startJob(_SCJobDfd);
        
        return _SCJobDfd.promise();
    }
    /* 取得智慧卡加簽用憑證
     * (政府發行憑證智慧卡會有2組金鑰對:加簽用/加密用, 目前公文系統只使用加簽金鑰對.)
     */
    function _getCert() {
        _SCJobDfd = $.Deferred();
        
        _jobParam = {
            tbs: '',
            encode: '',
            pincode: '',
            hashAlgorithm: '',
            funcName: 'GetUserCert' // 取憑證給此值.
        };
        
        _startJob(_SCJobDfd);
        
        return _SCJobDfd.promise();
    }
    
    function _checkCertLink(SAMLart, certb64, usage, authWSUrl) {
        if (typeof authws == 'object') {
            return authws.checkCertificateLink(SAMLart, certb64, usage, {url: authWSUrl});
        }
    }
    
    function _checkCertValidity(certb64, usage, sourceOrgNo, authWSUrl) {
        if (typeof authws == 'object') {
            return authws.checkCertificateValidity(certb64, usage, sourceOrgNo, {url: authWSUrl});
        }
    }
    
    /* 2017.10.12 - 1060819, 錯誤回報訊息修訂
       2017.1.17 - 取HiCOS LocalServer元件版本資訊 */
    function _getSCardModuleInfo() {
        /* 非IE使用 */
        function getImageInfo(ctx) {
            var output="";
            for(i=0;i<2000;i++) {
                var data=ctx.getImageData(i,0,1,1).data;
                if (data[2]===0) break;
                output=output+String.fromCharCode(data[2],data[1],data[0]);
            }
            if (output==="") output='{"ret_code": 1979711501, "message": "跨平台網頁[簽章]元件執行檔錯誤或逾時"}';
            return output;
        }
        
        var _dfd = $.Deferred();
        var img = null;
        var ctx;
        var output='', moduleInfo=null;
        var ua = window.navigator.userAgent;
        if (ua.indexOf('MSIE')==-1 && ua.indexOf('Trident')==-1)  { //not IE
            img=document.createElement('img');
            img.crossOrigin = 'Anonymous';
            img.src = 'http://localhost:61161/p11Image.bmp';
            var canvas = document.createElement('canvas');
            canvas.width=2000;canvas.height=1;
            ctx = canvas.getContext('2d');
            
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                output=getImageInfo(ctx);
                if (typeof output=='string' && output.length) {
                    moduleInfo = JSON.parse(output);
                }
                if (typeof moduleInfo =='object') {
                    // 逾時錯誤回傳: '{"ret_code": 1979711501,"message": "執行檔錯誤或逾時"}';
                    if (moduleInfo.ret_code==1979711501) {
                        _dfd.reject({success:false, _errMsg:'跨平台網頁[簽章]元件:執行檔錯誤或逾時', _showError:true});
                    }
                    else {
                        _dfd.resolve({success:true, SCModuleInfo: moduleInfo});
                    }
                }
                else {
                    _dfd.reject({success:false, _errMsg:'未安裝跨平台網頁[簽章]元件客戶端程式或未啟動服務!\n[@GetSCardInfo, output data error!]', _showError:true});
                }
            };
            
            img.onerror = function() {
                _dfd.reject({success:false, _errMsg:'未安裝跨平台網頁[簽章]元件客戶端程式或未啟動服務!\n[@GetSCardInfo, img.onerror]', _showError:true});
            };
        }
        else {
            document.getElementById('httpObject').innerHTML='<OBJECT id="http" width=1 height=1 style="LEFT: 1px; TOP: 1px" type="application/x-httpcomponent" VIEWASTEXT></OBJECT>';
            output = _postData('http://localhost:61161/pkcs11info','');
            
            if (typeof output=='undefined' || output===null) {
                _dfd.reject({success:false, _errMsg:'[IE]未安裝跨平台網頁[簽章]元件客戶端程式或未啟動服務.\n[@GetSCardInfo, _postData return null]', _showErr:true});
            }
            else {
                if (typeof output=='string' && output.length) {
                    moduleInfo = JSON.parse(output);
                }
                
                if (moduleInfo===null) {
                    _dfd.reject({success:false, _errMsg:'[IE]未安裝跨平台網頁[簽章]元件客戶端程式或未啟動服務!\n[@GetSCardInfo, output data error!]', _showErr:true});
                }
                else {
                    // 逾時錯誤回傳: '{"ret_code": 1979711501,"message": "執行檔錯誤或逾時"}';
                    if (moduleInfo.ret_code==1979711501) {
                        _dfd.reject({success:false, _errMsg:'[IE]' + moduleInfo.message, _showError:true});
                    }
                    else {
                        _dfd.resolve({success:true, SCModuleInfo: moduleInfo});
                    }
                }
            }
        }
        return _dfd.promise();
    }
    
    /* 重設元件內部變數 */
    function _reset() {
        if (_timeoutId!==0) {
            clearTimeout(_timeoutId);
            _timeoutId = 0;
        }
    
        _SCJobDfd = null;
        _jobParam = null;
        if (!!_postTarget) {
            _postTarget.close();
            _postTarget = null;
        }
        
        $(window).off('message', receiveMessage);
    }
    
    if (typeof theLogger == 'undefined') {
        theLogger = window.console;
    }
    
    this.getCert = _getCert;
    this.reset = _reset;
    this.makeSignature = _makeSignature;
    this.checkCertLink = _checkCertLink;
    this.checkCertValidity = _checkCertValidity;
    
    this.getSCardModuleInfo = _getSCardModuleInfo;
}
    
(function($) {
    
    if (typeof window.authws=='undefined') {
        window.authws = {
            checkCertificateValidity: function (cert, usage, sourceOrgNo, options) {
                /* 取得驗證錯誤說明 */
                function _getErrStr(code)
                {
                    if (code == -100) {
                        return '有效性檢核作業時發生錯誤!';
                    }
                    switch (code) {
                        case -1: return '憑證已過效期';
                        case -2: return '憑證CA簽章驗證失敗';
                        case -3: return '憑證已廢止';
                        case -4: return '憑證用途錯誤';
                        case -5: return '憑證未設定指定用途';
                        case -6: return '機關憑證未鏈結';
                        default:
                            return '憑證驗證作業失敗[Server], 未知的代碼:' + code;
                    }
                }

                var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : '';
                if (!wsUrl || wsUrl.length === 0) {
                    theLogger.error('-ERR- AuthWS.checkCertificateValidity was invoked, but WS\'s url was missing!');
                    _dfd.reject({ success: false, errCode: -101, errMsg: 'AuthWS尚未設定服務網址URL' });
                    return _dfd.promise();
                }

                var async = false;
                if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
                    async = true;
                }

                var params = new SOAPClientParameters();
                params.add('X509Cert', cert);
                params.add('Usage', usage);
                params.add('SOURCE_ORGNO', sourceOrgNo);

                /* SOAPClient.invoke() params:
                 *   url, method name, method parameter values,
                 *   call mode (async=true, sync=false), callback method
                 */
                SOAPClient.invoke(wsUrl, 'CheckCertificateValidity', params, async,
                                  function (r)
                                  {
                                      // CheckCertificateValidity完成會直接回傳long: 
                                      theLogger.log("-I- AuthWS.CheckCertificateValidity returns:" + r);
                                      if (r !== 0) {
                                          var errStr = _getErrStr(r);
                                          _dfd.resolve({ success: false, errCode: r, errMsg: errStr });
                                      }
                                      else {
                                          _dfd.resolve({ success: true });
                                      }
                                  });
                return _dfd.promise();
            },
            checkCertificateLink: function (SAMLart, cert, usage, options) {
                var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : '';
                if (!wsUrl || wsUrl.length === 0) {
                    theLogger.error('-ERR- AuthWS.checkCertLink was invoked, but WS\'s url was missing!');
                    _dfd.reject({ success: false, errCode: -101, errMsg: 'AuthWS尚未設定服務網址URL' });
                    return _dfd.promise();
                }

                var async = false;
                if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
                    async = true;
                }

                var params = new SOAPClientParameters();
                params.add('argArtifact', SAMLart);
                params.add('X509Cert', cert);
                params.add('Usage', usage);

                /* SOAPClient.invoke() params:
                 *   url, method name, method parameter values,
                 *   call mode (async=true, sync=false), callback method
                 */
                SOAPClient.invoke(wsUrl, 'CheckCertLink', params, async,
                                  function (r) {
                                      // CheckCertLink完成會直接回傳long: 
                                      theLogger.log("-I- AuthWS.CheckCertLink returns:" + r);
                                      if (typeof r=='string' && r.length) {
                                          if (r.indexOf('ERR-')!==-1) {
                                            var errStr = r;
                                            _dfd.reject({success: false, errCode: 0, errMsg: errStr });  
                                          }
                                          else {
                                            _dfd.resolve({success: true, account: r}); 
                                          }
                                      }
                                      else {
                                          _dfd.reject({ success: false, errCode: -1, errMsg: '叫用AuthWS.CheckCertLink(), 回傳值非字串' });
                                      }
                                  });
                return _dfd.promise();
            },
        };
    }
    
    
    //for IE8
    //var console=console||{"log":function(){}, "debug":function(){}, "error":function(){}};
    if (typeof theLogger == 'undefined') {
        theLogger = window.console;
    }
    
    /* include此js後會有全域物件 window.SmartCard
     * 
     * 注意: makeSignature/getCert皆為非同步作業, 須使用回傳的Deferred object執行後續處理!
     * 
     * 提供以下函式:
     * makeSignature: 產生簽體
     * getCert: 取得加簽用金鑰對的憑證
     * reset: 重設物件內部變數(建議每次叫用makeSignature/getCert完成後叫用)
     */    
    /*window.SmartCard = {
        makeSignature : _makeSignature, //(tbs, encode, pincode, hashAlgorithm)
        getCert: _getCert,
        reset: _reset,
    };*/

})(jQuery);