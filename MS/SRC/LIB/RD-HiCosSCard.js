/* jshint -W100 */

/* DATE		MGRNO		SA		PG		Desc
1061012     1060819     Eric    Eric    憑證登入及傳送簽章時若跨平台網頁元件作業異常, 提示使用者錯誤訊息
1060421					Eric	Eric	修改取HiCOS LocalServer元件版本失敗時異常提示內容.
2016.10.18 								因叫用AuthWS使用SOAPClient, 故使用本Lib的網頁須include RD-soapclient.js
2016.7.11 				Eric Peng		HiCOS LocalSignServer wrapper 
2020.09.24  1090703     Eric	Kevin   複製至STDN\LIB獨立WebForm使用，避免新增僅MS適用功能導致異常
2020.12.22  1090689     Eric    Eric    使用簽章功能前檢核跨平台網頁元件版本
2022.11.28	1110939		Leslie	Leslie	修改支援第三代CA憑證的標籤命名
1121212		1110608		Leslie	Joe		修正憑證政策錯誤提示訊息
1130329		1120589		Leslie	Leslie	[中榮][1030910]新增個人憑證可支援特殊憑證(HCA)
1130827		序215		Leslie	Leslie	調整模組異常時的處理機制，模組異常時，改回阻擋傳送
1130905		序215		Leslie	Leslie	[中榮] 調整元件異常時，增加可設定客製化訊息
1131004		序272		Leslie	Leslie	[北榮] 快解HCA憑證會被MOICA抓去跑加簽的問題
1131118		序382		Leslie	Leslie	[北榮] 修正使用HCA憑證，但回傳仍為MOICA跨平台元件的異常訊息
1131206		序382		Leslie	Leslie	[北榮] 修正錯誤碼判斷，一律強制轉數字以避免未預期的變成文字型別
1140707		1131250		Leslie	Leslie	[退輔會]新增機關憑證的即將到期檢核，增加處理>0的部分，到外面再重新判斷(需取得憑證資訊)
1141009     1141352     Kevin   Kevin   修正安全性問題
1141218		1141658		Leslie	Leslie	修正錯誤的ClearTimeout()行為，一併Merge針對中華電信憑證的Retry機制
*/

/* 2020.12 - 1090689 Eric, update error reason */
/* SCard_MajorErrorReason() / SCard_MinorErrorReason() are port from CHT errorcode.js */
function SCard_MajorErrorReason(rcode) {
    if(rcode<0) rcode=0xFFFFFFFF + rcode + 1;
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
		case 0x7600000F:
			return "禁止存取的網域";
		case 0x76000998:
			return "未輸入PIN碼";
		case 0x76000999:
			return "使用者已取消動作";
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
		case 0x7610000A:
			return "取得函式庫資訊失敗";
		case 0x7610000B:
			return "IC卡卡片資訊失敗";
		case 0x7610000C:
			return "找不到指定憑證";
		case 0x7610000D:
			return "找不到指定金鑰";
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
		case 0x76300008:
			return "簽章驗證錯誤";
		case 0x76300009:
			return "簽章BIO錯誤";
		case 0x76400001:
			return "解密DER錯誤";
		case 0x76400002:
			return "解密型態錯誤";
		case 0x76400003:
			return "解密錯誤";
		case 0x76500001:
			return "憑證尚未生效";
		case 0x76500002:
			return "憑證已逾期";
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
			
		case 0x77100001:
			return "圖形驗證碼不符";
		case 0x77200001:
			return "未輸入附卡授權SNO碼";
		case 0x77200002:
			return "讀附卡授權證發生錯誤:Buffer太小";
		case 0x77200003:
			return "讀附卡授權證發生錯誤:卡片空間不足";
		case 0x77200004:
			return "讀附卡授權證發生錯誤:資料太大";                        
		case 0x77200005:
			return "讀附卡授權證發生錯誤:DLL載入發生錯誤(E_NOT_LOAD_DLL)";
		case 0x77200006:
			return "讀附卡授權證發生錯誤:支援函數錯誤(E_NOT_SUPPORT_FUNCTION)";
		case 0x77200007:
			return "讀附卡授權證發生錯誤:讀卡slot錯誤(E_SLOT)";
		case 0x77200008:
			return "讀附卡授權證發生錯誤:Index格式錯誤";                      
		case 0x77200009:
			return "讀附卡授權證發生錯誤:讀卡機未選擇(READER_NOT_SELECT_ERROR)";
		case 0x77200010:
			return "讀附卡授權證發生錯誤:SNO碼錯誤(SNO_EXIST)";
		case 0x77200011:
			return "讀附卡授權證發生錯誤:SNO碼錯誤(SNO_NO_EXIST)";    
		case 0x77200101:
			return "寫新憑證功能發生錯誤：寫新憑證前刪除舊憑證發生錯誤";
		case 0x77200102:
			return "寫新憑證功能發生錯誤：要寫入新憑證時發生錯誤";
		case 0x77200103:
			return "寫新憑證功能發生錯誤：輸入內容PIN和SOPIN不可同時有值";
		case 0x77301001:
			return "JSON PARSER無法處理CONSOLE程式輸入的參數";
		case 0x77301002:
			return "CONSOLE程式輸入的參數少於指定的參數值";
		case 0x77301003:
			return "CONSOLE輸入的JSON值中少了指定的func";
		case 0x77301004:
			return "執行BUILDUNBLOCKCARDREQ中少了readername";
		case 0x77301005:
			return "執行BUILDUNBLOCKCARDREQ中少了caname";
		case 0x77301006:
			return "執行BUILDUNBLOCKCARDREQ中少了sid";
		case 0x77301007:
			return "執行BUILDUNBLOCKCARDREQ中少了newpin";
		case 0x77301008:
			return "執行執行UNBLOCKCARD時缺少CMSRESPONSE的值";
		case 0x77301009:
			return "執行UNBLOCKCARD時缺少SID的值";
		case 0x77301010:
			return "執行BUILDREASETUSERPINREQ時缺少READERNAME的值";
		case 0x77301011:
			return "執行BUILDREASETUSERPINREQ時缺少CANAME的值";
		case 0x77301012:
			return "執行RESTUSERPIN時缺少CMSRESPONSE的值";
		case 0x77301013:
			return "執行RESTUSERPIN時缺少SID的值";
		case 0x77301014:
			return "執行BUILDOPENCARDGETUSERPINREQ缺少CAName的值";
		case 0x77301015:
			return "執行BUILDOPENCARDGETUSERPINREQ缺少ReaderName的值";
		case 0x77301016:
			return "執行BUILDOPENCARDGETUSERPINREQ缺少SID的值";
		case 0x77301017:
			return "執行BUILDOPENCARDGETUSERPINREQ缺少NEWPIN的值";
		case 0x77301018:
			return "執行BUILDOPENCARDVALIDATEUSERREQ缺少CMSRESONSE的值";
		case 0x77301019:
			return "執行BUILDOPENCARDVALIDATEUSERREQ缺少SID的值";
		case 0x77301020:
			return "執行OPENCARD缺少CMSRESONSE的值";
		case 0x77301021:
			return "執行OPENCARD缺少SID的值";
		case 0x77301022:
			return "執行OPENCARD缺少RADERNAME的值";
		case 0x77301023:
			return "執行OPENCARD缺少CURRENTPIN的值";
		case 0x77301024:
			return "執行OPENCARD缺少NEWPIN的值";
		case 0x77301025:
			return "無支援此功能名稱";
		case 0x77301026:
			return "執行BUILDREASETUSERPINREQ缺少SID的值";
		case 0x77301027:
			return "執行CHANGEUSERPIN缺少CARDID的值";
		case 0x77301028:
			return "執行BUILDUNBLOCKCARDREQ缺少CARDID的值";
		case 0x77301029:
			return "執行BUILDOPENCARDGETUSERPINREQ缺少CARDID的值";
		case 0x77301030:
			return "執行BUILDREASETUSERPINREQ缺少CARDID的值";	
		case 0x77301031:
			return "解密失敗(umakesig)";
		case 0x77301032:
			return "無法開啟簽章程式(umakesig)";	
		case 0x77301033:
			return "輸入簽章值內容為空(umakesig)";
		case 0x77301034:
			return "輸入Hash演算法內容為空(umakesig)";	
		case 0x77301035:
			return "輸入TBS值為空(umakesig)";
		case 0x77301036:
			return "輸入PIN值為空(umakesig)";	
		case 0x77301037:
			return "輸入PIN值解base64失敗(umakesig)";
		case 0x77301038:
			return "簽章結果錯誤(umakesig)";	
		case 0x77301039:
			return "簽章結果為空(umakesig)";
		case 0x77301040:
			return "剖析簽章回傳JSON值錯誤(umakesig)";
		case 0x77301041:
			return "呼叫簽章函數錯誤(umakesig)";	
		case 0x77301042:
			return "呼叫簽章函數錯誤2(umakesig)";
			
		case 0xE0000013: //0xE0000013
			return "金鑰不相符";
		case 0xE0000012: //0xE0000012
			return "使用者取消";
		case 0xE0000010: //0xE0000010
			return "建立金鑰容器失敗，可能是因為權限不足";
		case 0xE000000F: //0xE000000F
			return "找不到任一家CA發的該類別用戶憑證，但中華電信該憑證類別中有找到其他用戶";
		case 0xE000000E: //0xE000000E
			return "開啟物件(p7b)失敗";
		case 0xE000000D: //0xE000000D
			return "HEX字串格式錯誤";
		case 0xE000000C: //0xE000000C
			return "HEX字串長度錯誤";
		case 0xE000000B: //0xE000000B
			return "寬位元字串轉多位元字串轉換失敗";
		case 0xE000000A: //0xE000000A
			return "開啟CertStore失敗";
		case 0xE0000009: //0xE0000009
			return "匯出檔案失敗";
		case 0xE0000008: //0xE0000008
			return "匯入檔案失敗";
		case 0xE0000007: //0xE0000007
			return "必須輸入檔案路徑";
		case 0xE0000006: //0xE0000006
			return "找不到任一家CA發的該類別用戶憑證";
		case 0xE0000005: //0xE0000005
			return "找不到中華電信該類別用戶憑證，但找得到其他CA發的該類別用戶憑證";
		case 0xE0000004: //0xE0000004
			return "未支援的參加單位代碼";
		case 0xE0000003: //0xE0000003
			return "金鑰的雜湊值不一致";
		case 0xE0000002: //0xE0000002
			return "程式配置記憶體失敗";
		case 0xE0000001: //0xE0000001
			return "找不到由中華電信所核發且合乎搜尋條件的憑證";

		//開卡鎖卡解鎖錯誤碼
		case 0x81000001: return	"沒有CONTENT_LENGTH";
		case 0x81000002: return "CONTENT_LENGTH_SIZE太大";
		case 0x81000003: return	"讀取設定檔錯誤";
		case 0x81000004: return "解析加密JSON錯誤(不是JSON格式)";
		case 0x81000005: return "解析加密JSON參數錯誤";
		case 0x81000111: return "解析JSON錯誤(不是JSON格式)";
		case 0x81000112: return "解析JSON參數錯誤";
		case 0x81000113: return "解析JSON API版本錯誤";
		case 0x81000114: return "解析JSON METHOD錯誤";
		case 0x81000115: return "解析JSON 請求逾時";
		case 0x81000201: return "用戶代碼錯誤1次";
		case 0x81000202: return "用戶代碼錯誤2次";
		case 0x81000203: return "用戶代碼錯誤3次";
		case 0x81000221: return "DB連線錯誤";
		case 0x81000222: return "DB連線錯誤";
		case 0x81000223: return "DB連線錯誤";
		case 0x81000224: return "DB卡號不存在";
		case 0x81000225: return "DB卡號未開卡";
		case 0x81000226: return "DB卡號已開卡";
		case 0x81000227: return "用戶代碼已鎖定";
		case 0x81000228: return "DB UNBLOCK錯誤";
		case 0x81000229: return "DB USERPIN錯誤";
		case 0x81000230: return "DB 輸入參數錯誤";
		case 0x81000231: return "DB錯誤";
		case 0x81000232: return "DB UNBLOCK解析錯誤";
		case 0x81000233: return "DB USERPIN解析錯誤";
		case 0x81000301: return "連線到RA錯誤";
		case 0x81000302: return "RA回應格式錯誤";
		case 0x81011000: return "底層錯誤Buffer size";
		case 0x81011001: return "底層錯誤 RSA加密";
		case 0x81011002: return "底層錯誤 RSA解密";
		case 0x81011003: return "底層錯誤 RSA簽章";
		case 0x81011004: return "底層錯誤 RSA驗簽";
		case 0x81011005: return "底層錯誤 AES加密";
		case 0x81011006: return "底層錯誤 AES解密";

		case 0x82000003: return "解析加密JSON錯誤(不是JSON格式)";
		case 0x82000004: return "解析加密JSON參數錯誤";
		case 0x82000111: return "解析JSON錯誤(不是JSON格式)";
		case 0x82000112: return "解析JSON參數錯誤";
		case 0x82000113: return "解析JSON API版本錯誤";
		case 0x82000114: return "解析JSON METHOD錯誤";
		case 0x82000115: return "用戶代碼參數比對錯誤";
		case 0x82000116: return "卡號參數比對錯誤";
		case 0x82000117: return "CANAME參數比對錯誤";
		case 0x82000118: return "回應逾時";
		case 0x83000100: return "插入的卡片不符合要求(非GPKI卡片)";
		case 0x83000101: return "選錯服務，您使用MOICA卡";
		case 0x83000102: return "選錯服務，您使用MOEACA卡";
		case 0x83000103: return "選錯服務，您使用GCA卡";
		case 0x83000104: return "選錯服務，您使用XCA卡";
		case 0x83000105: return "輸入之PIN碼格式錯誤";
		case 0x83000106: return "輸入之用戶代碼格式錯誤";
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
        case 0xFFFFFFFF80000001:
        case -2147483647:
            return "PIN碼錯誤，剩餘一次機會";
        case 0xFFFFFFFF80000002:
        case -2147483646:
            return "PIN碼錯誤，剩餘兩次機會";
        default:
            return rcode.toString(16);
    }
}
    
//1130329	Leslie[1120589]	配合新增HCA憑證，修改原MOICA(CHT)憑證的模組
// function SmartCard() {
function CHT_SmartCard() {
    // constances
	//1141218	Leslie[1141658]	一併Merge針對中華電信憑證的Retry機制
    var _timeout = 15000; // 2017.10.12 - 1060819 (調整為15秒)
	var _retryCnt = (('MoicaRetryCnt' in SSO_CONFIG && SSO_CONFIG.MoicaRetryCnt > 0))?SSO_CONFIG.MoicaRetryCnt:0;
    var _arRetryCode = (('MoicaModuleRetryWithCode' in SSO_CONFIG && SSO_CONFIG.MoicaModuleRetryWithCode.length))?SSO_CONFIG.MoicaModuleRetryWithCode:[];
	var _timeoutRetryCnt = (('MoicaTimeoutRetryCnt' in SSO_CONFIG && SSO_CONFIG.MoicaTimeoutRetryCnt > 0))?SSO_CONFIG.MoicaTimeoutRetryCnt:0;
    
    var _validOrigin = "http://localhost:61161";
    // 2022.9.21 - Eric - 測MCA Smartcard
    //if (SSOUtil.isValueTrue(localStorage.dev_mca_card_test)) {
    //    _validOrigin = 'http://localhost:16888';
    //}
    
    var _postTarget = null;
    var _timeoutId = 0;
    var _SCJobDfd = null, _jobParam = null;

    // 2020.12.22 - 1090689 Eric, 檢核跨平台網頁元件版本
    var WinVer="1.3.4.103328";
    var MacVer="1.3.4.13";
    var LinuxVer="1.3.4.3";

    // 2020.12.22 - 1090689 Eric, 檢核跨平台網頁元件版本 (compact version)
    function _checkHiCOSWebSignVersion(output) {
        var hiCOSWebSignInfo = JSON.parse(output);
        if (hiCOSWebSignInfo.ret_code == 0x76000031) {
            return { success: false, 
                     errMsg: window.location.hostname + '非信任網站，請先加入信任網站'};
        }

        var nVer = navigator.appVersion;
        var version =  hiCOSWebSignInfo.serverVersion;
        if (nVer.indexOf("Win") >= 0) {
            theLogger.log('-I- checkHiCOS version, module version=' + version + ', [Min]WinVer=' + WinVer);
            if (version < WinVer) { return { success:false, errMsg: '請升級[跨平台網頁元件]至' + WinVer + '以後!\r\n目前版本:' + version}; }
            else { return { success: true} }
        } else if (nVer.indexOf("Mac") >= 0) {
            theLogger.log('-I- checkHiCOS version, module version=' + version + ', [Min]MacVer=' + MacVer);
            if (version < MacVer) {return { success:false, errMsg: '請升級[跨平台網頁元件]至' + MacVer + '以後!\r\n目前版本:' + version}; }
            else { return { success: true} }
        } else if (nVer.indexOf("Linux") >= 0) {
            theLogger.log('-I- checkHiCOS version, module version=' + version + ', [Min]LinuxVer=' + LinuxVer);
            if (version < LinuxVer) { return { success:false, errMsg: '請升級[跨平台網頁元件]至' + LinuxVer + '以後!\r\n目前版本:' + version}; }
            else { return { success: true} }
        }
        return { success:false, errMsg:'未知的瀏覽器類型, 無法判定[跨平台網頁元件]版本! [navigator.appVersion="' + nVer + '"]'}
    }
   
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
				//1141218	Leslie[1141658]	一併Merge針對中華電信憑證的Retry機制
				if(_timeoutRetryCnt-- > 0){
                    theLogger.error(`-E- 簽核元件異常Timeout判定重試，剩餘次數：${_timeoutRetryCnt}`);
                    _stopMessageListen();   //_startJob()裡面會重建Event
                    _startJob(_SCJobDfd);
                }
                else{
					_SCJobDfd.reject({success:false, _errMsg: '逾時未回應, 請檢查是否尚未安裝跨平台(簽章)元件.'});
					_stopMessageListen();
				}
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
            // 2022.9.21 - Eric - 測MCA Smartcard
            //if (SSOUtil.isValueTrue(localStorage.dev_mca_card_test)) {
            //    url = 'http://localhost:16888/popupForm';
            //}

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
        
		//1111128	Leslie[1110939]	修改支援第三代CA憑證，XCA、GCA與GRCA都是GRCA發行的，排除後可避免抓錯憑證
		var GRCA = 'Government Root Certification Authority';
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
                // 2020.12 - 1090835 Eric, support New eID
                let strLabel = certs[indexCert].label;
                if (typeof strLabel=='string') {
                    strLabel = strLabel.toLowerCase();
                }
                else {
                    strLabel = '';
                }

                if ((typeof certs[indexCert].usage=='string') && (certs[indexCert].usage.indexOf(usage)!==-1) && // 取usage包含指定字串者
					//1111128	Leslie[1110939]	修改支援第三代CA憑證的標籤命名
                    // (strLabel.length==0 || (strLabel!=='ca cert' && strLabel!=='root ca cert'))) // 2020.12.16 - 1090835 Eric, support New eID - check label. 不可為'CA Cert'/'ROOT CA Cert'
                    (strLabel.length==0 || ((strLabel.match(/root\s?ca\s?cert/) || strLabel.match(/ca\s?cert/))?false:true)) // 2022.11.28	Leslie	Match時，表示不是要找的憑證，所以丟出false
					&& (typeof certs[indexCert].usage=='string' && certs[indexCert].issuerDN.indexOf(GRCA) === -1 ))
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

		//1141218	Leslie[1141658]	一併Merge針對中華電信憑證的Retry機制
		function _CheckRetry(rtnData){
            var retCheck = JSON.parse(rtnData);
            if (typeof retCheck=='undefined' || retCheck===null || (typeof retCheck.ret_code == 'undefined') || retCheck.ret_code===null) {
                if (!!_SCJobDfd) {
                    _SCJobDfd.reject({success:false, _errMsg: 'parse rtnData info failed. value=' + rtnData});
                    _stopMessageListen();
                }
            }
            else if (retCheck.ret_code!==0 && _arRetryCode.includes(retCheck.ret_code)){
                theLogger.error(`-E- 簽核元件回應異常，errMsg=${SCard_MajorErrorReason(ret.ret_code)}(ret_code=[${retCheck.ret_code}])，判定重試，剩餘次數：${_retryCnt}`);
                return true;
            } 
            return false;
        }

		function _reOpenPopAndSendJson(){
            //有Error時，視窗會直接被元件關閉，重開視窗
            var url = "http://localhost:61161/popupForm"; // "about:blank"
            if (!!_postTarget) {
                _postTarget.close();
                _postTarget = null;
            }
            if (window.location.href.indexOf('RD-DocSubmit.html')!==-1) {
                let wDlg = 200, hDlg = 200;
                let left = window.screen.width - wDlg;
                let top = window.screen.height - hDlg - 60;
                let sOpenParam = "height=" + hDlg + ", width=" + wDlg + ", left=" + left + ", top=" + top;
                theLogger.log('sOpenParam=' + sOpenParam);
                setTimeout(()=>{
                    _postTarget = window.open(url, "簽章中", sOpenParam);
                    if (_postTarget===null) {
                        if (!!_SCJobDfd) {
                            ua = window.navigator.userAgent;
                            _SCJobDfd.reject({success:false, _errMsg:'開啟HiCosLocalSign網頁失敗. [NONE-IE, ua="' + ua + '"]'});
                        }
                        _stopMessageListen();
                        return;
                    }
                },100);
            }
            else {
                setTimeout(()=>{
                    _postTarget = window.open(url, "簽章中","height=200, width=200, left=100, top=20");
                    if (_postTarget===null) {
                        if (!!_SCJobDfd) {
                            ua = window.navigator.userAgent;
                            _SCJobDfd.reject({success:false, _errMsg:'開啟HiCosLocalSign網頁失敗. [NONE-IE, ua="' + ua + '"]'});
                        }
                        _stopMessageListen();
                        return;
                    }
                },100);
            }
        }
        
        var ret = null, json;
        try {
			//1141218	Leslie[1141658]	一併Merge針對中華電信憑證的Retry機制
			theLogger.log(`-I- receiveMessage：${event.data}`);
            ret = JSON.parse(event.data);
            if (!!ret && ret.func) {
                /* 收到此訊息表示HiCOS local server 網頁已ready, 可以postMessage以執行後續作業 */
                if (ret.func=="getTbs") {
					//1141218	Leslie[1141658]	修正錯誤的ClearTimeout()行為
                    //clearTimeout(_timeoutId);
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
						//1141218	Leslie[1141658]	一併Merge針對中華電信憑證的Retry機制
						theLogger.log(`-I- 送出待加簽內容：${json}`);
						//1141009 Kevin 1141352 修正安全性問題
                        //_postTarget.postMessage(json,"*");
                        _postTarget.postMessage(json,_validOrigin);
                    }
                    else {
                        if (!!_SCJobDfd) {
                            _SCJobDfd.reject({success:false, _errMsg:'getTbs時, _jobParam為null.'});
                        }
                    }
                }
                /* 收到此訊息表示HiCOS local server 網頁已完成加簽作業, 可以在event.data取得簽體及憑證內容 */
                else if(ret.func=="sign") {
					//1141218	Leslie[1141658]	一併Merge針對中華電信憑證的Retry機制
					if (_retryCnt > 0 && _CheckRetry(event.data)){
                        _reOpenPopAndSendJson();
                        _retryCnt--;
                    }
                    else{
						_setSignature(event.data);
						_postData = null;
						//1141218	Leslie[1141658]	修正錯誤的ClearTimeout()行為，作業完成再ClearTimeout()
						if (typeof _timeoutId=='number' && _timeoutId!==0) {
							clearTimeout(_timeoutId);
						}
					}
                }
                /* 收到此訊息表示HiCOS local server 網頁已完成取憑證作業, 可以在event.data取得卡片內憑證內容 */
                else if(ret.func=="pkcs11info"){
					//1141218	Leslie[1141658]	一併Merge針對中華電信憑證的Retry機制
					if (_retryCnt > 0 && _CheckRetry(event.data)){
                        _reOpenPopAndSendJson();
                        _retryCnt--;
                    }
                    else{
						_setUserCert(event.data);
						//1141218	Leslie[1141658]	修正錯誤的ClearTimeout()行為，作業完成再ClearTimeout()
						if (typeof _timeoutId=='number' && _timeoutId!==0) {
							clearTimeout(_timeoutId);
						}
					}
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
    function _getSCardModuleInfo(checkModuleVer) {
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

        // 2020.12.22 - 1090689 Eric, 檢核跨平台網頁元件版本 (預設須檢核!)
        checkModuleVer = (typeof checkModuleVer=='boolean') ? checkModuleVer : true;

        var _dfd = $.Deferred();
        var img = null;
        var ctx;
        var output='', moduleInfo=null;
        var ua = window.navigator.userAgent;
        var not_start_msg = '未安裝跨平台網頁[簽章]元件客戶端程式或未啟動服務！'

        // 2023.2.16 - Eric, 考試院保固需求序4, 訊息應提示異常排除的FAQ文件
        if ('HiCOS_FAQ' in SSO_CONFIG && SSO_CONFIG.HiCOS_FAQ.length) {
            not_start_msg += '\n請參閱說明文件：\"' + SSO_CONFIG.HiCOS_FAQ + '\"以排除異常。';
        }

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
                        // 2020.12.22 - 1090689 Eric, 檢核跨平台網頁元件版本
                        if (checkModuleVer) {
                            let rslt = _checkHiCOSWebSignVersion(JSON.stringify(moduleInfo));
                            if (rslt.success) {
                                _dfd.resolve({success:true, SCModuleInfo: moduleInfo});
                            }
                            else {
                                _dfd.reject({success:false, _errMsg: rslt.errMsg});    
                            }
                        }
                        else {
                            _dfd.resolve({success:true, SCModuleInfo: moduleInfo});
                        }
                    }
                }
                else {
                    // 2023.2.16 - Eric, 考試院保固需求序4, 訊息應提示異常排除的FAQ文件
                    _dfd.reject({success:false, _errMsg: not_start_msg + '\n[@GetSCardInfo, output data error!]', _showError:true});
                    //_dfd.reject({success:false, _errMsg: '未安裝跨平台網頁[簽章]元件客戶端程式或未啟動服務!\n[@GetSCardInfo, output data error!]', _showError:true});
                }
            };
            
            img.onerror = function() {
                // 2023.2.16 - Eric, 考試院保固需求序4, 訊息應提示異常排除的FAQ文件
                _dfd.reject({success:false, _errMsg: not_start_msg + '\n[@GetSCardInfo, img.onerror]', _showError:true});
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
                        // 2020.12.22 - 1090689 Eric, 檢核跨平台網頁元件版本
                        if (checkModuleVer) {
                            let rslt = _checkHiCOSWebSignVersion(JSON.stringify(moduleInfo));
                            if (rslt.success) {
                                _dfd.resolve({success:true, SCModuleInfo: moduleInfo});
                            }
                            else {
                                _dfd.reject({success:false, _errMsg: rslt.errMsg});    
                            }
                        }
                        else {
                            _dfd.resolve({success:true, SCModuleInfo: moduleInfo});
                        }
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

		//1141218	Leslie[1141658]	一併Merge針對中華電信憑證的Retry機制
		 _retryCnt = (('MoicaCardTimeout' in SSO_CONFIG && SSO_CONFIG.MoicaCardTimeout > 0))?SSO_CONFIG.MoicaCardTimeout:0;
        _timeoutRetryCnt = (('MoicaTimeoutRetryCnt' in SSO_CONFIG && SSO_CONFIG.MoicaTimeoutRetryCnt > 0))?SSO_CONFIG.MoicaTimeoutRetryCnt:0;
    
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

//1130329	Leslie[1120589]	增加HCA憑證模組
/*
 *  CGCAIPATL 部分元件錯誤代碼
 */
function GetErrorMessage(ErrCode) { //將錯誤代碼轉換為人看得懂的訊息
	var msg = "";
	function fnJSLanguageVer(sWordC, sWordE){
		return sWordC;
	}
	
	//1131206	Leslie[各機關序382]	[北榮]修正錯誤碼判斷，一律強制轉數字以避免未預期的變成文字型別
	ErrCode = parseInt(ErrCode)||ErrCode;	//若成功則轉數字，反之，保持原值

	switch(ErrCode){

		case 0:
			msg += fnJSLanguageVer('完成', 'Success ');
			break;
		case 13:
			msg += fnJSLanguageVer("[" + "5001" + '] 一般性錯誤，請確認讀卡機有接上，或是卡片重新拔插再試一次', "[" + "5001" + '] general error ');
			break;
		case 5001:
			msg += fnJSLanguageVer("[" + ErrCode + '] 一般性錯誤', "[" + ErrCode + '] general error ');
			break;
		case 5002:
			msg += fnJSLanguageVer("[" + ErrCode + '] 記憶體配置錯誤',"[" + ErrCode + '] Memory Allocation Error');
			break;
		case 5003:
			msg += fnJSLanguageVer("[" + ErrCode + '] Buffer too small',"[" + ErrCode + '] Buffer too small');
			break;
		case 5005:
			msg += fnJSLanguageVer("[" + ErrCode + '] 參數錯誤',"[" + ErrCode + '] Invalid parameter');
			break;
		case 5006:
			msg += fnJSLanguageVer("[" + ErrCode + '] Invalid handle',"[" + ErrCode + '] Invalid handle');
			break;
		case 5007:
			msg += fnJSLanguageVer("[" + ErrCode + '] 元件已過期',"[" + ErrCode + '] TrialVersion Library is expired');
			break;
		case 5008:
			msg += fnJSLanguageVer("[" + ErrCode + '] Base64 Encoding/Decoding Error',"[" + ErrCode + '] Base64 Encoding/Decoding Error');
			break;

		case 5010:
			msg += fnJSLanguageVer("[" + ErrCode + '] 找不到符合憑證',"[" + ErrCode + '] certificate not found');
			break;
		case 5011:
			msg += fnJSLanguageVer("[" + ErrCode + '] 憑證已過期',"[" + ErrCode + '] Certicate Expired');
			break;
		case 5012:
			msg += fnJSLanguageVer("[" + ErrCode + '] 憑證尚未有效',"[" + ErrCode + '] Certificate can not be used now');
			break;

		case 5014:
			msg += fnJSLanguageVer("[" + ErrCode + '] 憑證主旨比對錯誤',"[" + ErrCode + '] Certificate subject not match');
			break;

		case 5015:
			msg += fnJSLanguageVer("[" + ErrCode + '] 找不到憑證發行者',"[" + ErrCode + '] Unable to find certificate issuer');
			break;

		case 5016:
			msg += fnJSLanguageVer("[" + ErrCode + '] 憑證簽章值無效',"[" + ErrCode + '] Certificate signature is invalid');
			break;

		case 5017:
			msg += fnJSLanguageVer("[" + ErrCode + '] 錯誤的金鑰使用方式',"[" + ErrCode + '] Invalid ertificate keyusage');
			break;

		case 5020:
		case 5021:
		case 5022:
		case 5023:
		case 5024:
		case 5025:
		case 5026:
		case 5028:
			msg += fnJSLanguageVer("[" + ErrCode + '] 憑證已撤銷',"[" + ErrCode + '] Certificate is revoked');
			break;

		case 5030:
			msg += fnJSLanguageVer("[" + ErrCode + '] CRL 已過期',"[" + ErrCode + '] CRL expired.');
			break;
		case 5031:
			msg += fnJSLanguageVer("[" + ErrCode + '] CRL 尚未有效',"[" + ErrCode + '] CRL not yet valid.');
			break;
		case 5032:
			msg += fnJSLanguageVer("[" + ErrCode + '] 找不到 CRL ',"[" + ErrCode + '] CRL not found.');
			break;
		case 5034:
			msg += fnJSLanguageVer("[" + ErrCode + '] CRL 的簽章值錯誤 ',"[" + ErrCode + '] CRL signature invalid.');
			break;
		case 5036:
			msg += fnJSLanguageVer("[" + ErrCode + '] 資料的簽章值錯誤 ',"[" + ErrCode + '] Invalid data signature.');
			break;
		case 5037:
			msg += fnJSLanguageVer("[" + ErrCode + '] 簽章的原文錯誤 ',"[" + ErrCode + '] Content not match.');
			break;
		case 5038:
			msg += fnJSLanguageVer("[" + ErrCode + '] 圖形驗證碼錯誤 ',"[" + ErrCode + '] Incorrect captcha.');
			break;
		case 5040:
			msg += fnJSLanguageVer("[" + ErrCode + '] 錯誤的憑證格式 ',"[" + ErrCode + '] Incorrect Certificate format.');
			break;

		case 5041:
			msg += fnJSLanguageVer("[" + ErrCode + '] 錯誤的 CRL 格式 ',"[" + ErrCode + '] Incorrect CRL format.');
			break;

		case 5042:
			msg += fnJSLanguageVer("[" + ErrCode + '] 錯誤的 PKCS#7 格式 ',"[" + ErrCode + '] Incorrect PKCS7 format.');
			break;

		case 5050:
			msg += fnJSLanguageVer("[" + ErrCode + '] 找不到指定物件 ',"[" + ErrCode + '] CG_RTN_OBJ_NOT_FOUND.');
			break;
		case 5071:
			msg += fnJSLanguageVer("[" + ErrCode + '] 密碼不正確 ',"[" + ErrCode + '] CG_RTN_PASSWD_INVALID.');
			break;

		case 5204:
			msg += fnJSLanguageVer("[" + ErrCode + '] 找不到私密金鑰 ',"[" + ErrCode + '] CG_RTN_OBJ_NOT_FOUND.');
			break;
		case 5205:
			msg += fnJSLanguageVer("[" + ErrCode + '] 憑證無法匯出 ',"[" + ErrCode + '] CGCAPI_RTN_UNEXPORTABLE.');
			break;
		case 5206:
			msg += fnJSLanguageVer("[" + ErrCode + '] 權限不足 ',"[" + ErrCode + '] CGCAPI_RTN_STORE_ACCESSDENY.');
			break;
		case 5902:
			msg += fnJSLanguageVer("[" + ErrCode + '] 找不到檔案 ',"[" + ErrCode + '] CG_RTN_FILE_NOT_FOUND.');
			break;
		case 5906:
			msg += fnJSLanguageVer("[" + ErrCode + '] 沒有權限存取 ',"[" + ErrCode + '] CG_RTN_ACCESS_DENIED.');
			break;

		// PKCS#11 return code
		case 9005:
			msg += fnJSLanguageVer("[" + ErrCode + '] 此 PKCS#11 不支援此 Function ',"[" + ErrCode + '] CGP11_RTN_OBJECT_NOT_EXIST.');
			break;
		case 9006:
			msg += fnJSLanguageVer("[" + ErrCode + '] PKCS#11 參數錯誤 ',"[" + ErrCode + '] CGP11_RTN_ARGUMENTS_BAD.');
			break;
		case 9039:
		case 9040:
			msg += fnJSLanguageVer("[" + ErrCode + '] PKCS#11 Pin 碼錯誤 ',"[" + ErrCode + '] CGP11_RTN_PIN_INCORRECT.');
			break;
		case 9043:
		//1131118	Leslie[序382]	[北榮]順便調整鎖卡錯誤訊息
			// msg += fnJSLanguageVer("[" + ErrCode + '] PKCS#11 Pin Lock ',"[" + ErrCode + '] CGP11_RTN_PIN_INCORRECT.');
			msg += fnJSLanguageVer("[" + ErrCode + '] PIN碼已鎖定，請至HCA2.0網站進行解鎖後再進行操作。',"[" + ErrCode + '] CGP11_RTN_PIN_INCORRECT.');
			break;


		case 9100:
			msg += fnJSLanguageVer("[" + ErrCode + '] 物件不存在 ',"[" + ErrCode + '] CGP11_RTN_OBJECT_NOT_EXIST.');
			break;

		case 9100:
			msg += fnJSLanguageVer("[" + ErrCode + '] 物件不存在 ',"[" + ErrCode + '] CGP11_RTN_OBJECT_NOT_EXIST.');
			break;
		case 9101:
			msg += fnJSLanguageVer("[" + ErrCode + '] 物件已存在 ',"[" + ErrCode + '] CGP11_RTN_OBJECT_EXIST.');
			break;
		case 9102:
			msg += fnJSLanguageVer("[" + ErrCode + '] 物件發生問題(可能是因為一個以上) ',"[" + ErrCode + '] CGP11_RTN_OBJECT_HAS_PROBLEM.');
			break;

		case 9110:
		case 9111:
			msg += fnJSLanguageVer("[" + ErrCode + '] Load Library 失敗 ',"[" + ErrCode + '] CGP11_RTN_LIBRARY_NOT_LOAD.');
			break;

		case 9112:
			msg += fnJSLanguageVer("[" + ErrCode + '] 找不到 slot ',"[" + ErrCode + '] CGP11_RTN_SLOT_NOT_FOUND.');
			break;
			
		case 61001:
			msg += fnJSLanguageVer("[" + ErrCode + '] 一般性錯誤，ServiSign主程式-未安裝完成，請重新安裝試試看.', "[" + ErrCode + '] General Error, ');
			break;
		case 61003:
			msg += fnJSLanguageVer("[" + ErrCode + '] 字元轉換錯誤，請洽服務窗口協調廠商調整程式.', "[" + ErrCode + '] Library atoi transfer Error. ');
			break;	
		case 61004:
			msg += fnJSLanguageVer("[" + ErrCode + '] 字元轉換錯誤 字元為空，請洽服務窗口協調廠商調整程式',"[" + ErrCode + '] Library atoi transfer Error, character is null. ');
			break;	
		case 61005:
			msg += fnJSLanguageVer("[" + ErrCode + '] 參數錯誤，請洽工程師',"[" + ErrCode + '] Paramater Error ');
			break;
		case 61006:
			msg += fnJSLanguageVer("[" + ErrCode + '] 請檢查Changingtec憑證是否匯入憑證庫成功',"[" + ErrCode + '] Please Check Changingtec CA Certificate in your CertStore. ');
			break;			
		case 61007:
			msg += fnJSLanguageVer("[" + ErrCode + '] 元件已過期', "[" + ErrCode + '] Component was Expired. ');
			break;			
		case 61008:
			msg += fnJSLanguageVer("[" + ErrCode + '] SSL連線請使用TLS1.1以上連線方式',"[" + ErrCode + '] Please Check your SSL Protocol is higher than TLS 1.1. ');
			break;		
		case 61201:
			msg += fnJSLanguageVer("[" + ErrCode + '] 元件版本格式錯誤',"[" + ErrCode + '] Library version format Error. ');
			break;	
		case 61202:
			msg += fnJSLanguageVer("[" + ErrCode + '] ServiSign Adapter程式版本錯誤，請洽工程師',"[" + ErrCode + '] JavaScript Adapter version Error. ');
			break;		
		case 61203:
			msg += fnJSLanguageVer("[" + ErrCode + '] ServiSign Adapter所述版本錯誤，請洽工程師',"[" + ErrCode + '] ServiSign JS written version Error. ');
			break;		
		case 61204:
			msg += fnJSLanguageVer("[" + ErrCode + '] ServiSign Library版本錯誤，請洽工程師',"[" + ErrCode + '] ServiSign library version Error. ');
			break;				
		case 61902:
			msg += fnJSLanguageVer("[" + ErrCode + '] 找不到對應的LibName，請洽工程師',"[" + ErrCode + '] LibName Not Found. ');
			break;					
		case 61904:
			msg += fnJSLanguageVer("[" + ErrCode + '] 錯誤的Service路徑，不是打到Localhost',"[" + ErrCode + '] Bad Net Path, Service is not from localhost. ');
			break;			
		case 61905:
			msg += fnJSLanguageVer("[" + ErrCode + '] Service初始化失敗，請重新啟動電腦。',"[" + ErrCode + '] ServiSign initialize fail, Please restart your PC. ');
			break;	
		case 61906:
			msg += fnJSLanguageVer("[" + ErrCode + '] 元件無法存取。',"[" + ErrCode + '] ServiSign Access Denied. ');
			break;	
		case 61908:
			msg += fnJSLanguageVer("[" + ErrCode + '] 元件尚未認證。',"[" + ErrCode + '] Component was not Authorized. ');
			break;	



		default:
			msg += fnJSLanguageVer('其他錯誤,請參考元件手冊: (',  'Unknown Error, please reference document: (') + ErrCode + ") " ;
		  	return msg;

	}

	return msg;
}

function getHCAAPISVIAdapterObj() {
	
	//如有任何參數問題，請參考第 10, 11點
	//https://redmine.changingtec.com/redmine/projects/servisign/wiki/%E5%95%8F%E9%A1%8C%E8%88%87%E8%A7%A3%E7%AD%94

	//最低 ServiSign 版本 0.0.0.0 = 預設不開啟
	var minServiSignVersion = "0.0.0.0"
	//最低元件版本 0.0.0.0 = 預設不開啟
	var minLibVersion = "0.0.0.0"

	//底層元件 Adapter 名稱
	var LibName = ""
	//底層元件 Adapter 所在位置
	var LibDir = ""
	//Path ID
	var PathID = "6BD4EA2493354E298DD0B09B72A5EA59"

	//最低不需更新安裝包版本
	var MinimalInstallerVersion = "1.0.20.0310"
	var MinimalInstallerVersion_Mac = ""
	var MinimalInstallerVersion_Linux = ""
	//JS 模板版本號 ServiSign 主程式會做相容性版本確認
	var JSVersion = "1.0.18.1219"

	//Tab 以分頁做為轉換模式，行為模式與 ActiveX 元件相同
	var ServiSignTabMode_Tab = 			0x0
	//Browser 模式則是以瀏覽器為單位，整個瀏覽器關掉才會釋放元件
	var ServiSignTabMode_Browser = 		0x1

	var ServiSignTabMode = ServiSignTabMode_Tab

	//預設不使用 cookie 儲存 Try port 的結果
	var useCookieTryPort = false
	
	//路徑保護
	//DataObj.pfxpath_servisignflag = true
    //DataObj.pfxpath = pfxpath.replace(/\\/g, "*")
	
	//開啟元件 UI 置頂功能
	//DataObj.topuidetect = true
	//開啟全系統 UI 置頂功能
	//DataObj.topuialldetect = true
	//開啟非同步功能
	//DataObj.asynchronously = true
	
	//資料斜線保護功能
	//DataObj.XXXXX_ServiSignSlashFlag = true
	//DataObj.XXXXX = inputXXXXXX.replaceAll("\\", "==ServiSignSlash==")
	//資料 Base64 保護功能
	//DataObj.XXXXX_ServiSignBase64Flag = true
	//DataObj.XXXXX = Base64Encode(XXXXX)
	//使用主線程呼叫 API
	//DataObj.ServiSignMainThread = true
	//變數保護功能
	//目前已經針對 pin, pw 跟 pass 等關鍵字顯示時自動遮蔽內容
	//如果想要額外遮蔽可在此調整:D
	//DataObj.XXXXX_ServiSignHide = true
	//回傳時可以隱藏 log  
	//DataObj.hide_result = true

	
	function ServiSignConnectError() {
		//ServiSign_RTN_CONNECTION_ERROR
		ServiSignErrorCode = 61006
	}
	function ServiSignLoadComponentError() {
		//Handing load component error
    }
	function ServiSignDisconnectError() {
		//Handing disconnect error
		ServiSignErrorCode = 61015
    }
    
    var VersionCompare_Error = 			0x00
	var VersionCompare_Bigger =			0x01
	var VersionCompare_Smaller = 		0x02
	var VersionCompare_Same = 			0x03

	function ServiSignLog(LogMessage) {
		console.log("[ServiSign Log] " + LogMessage)
	}
	function Sleep(milliseconds) {
		var start = new Date().getTime()
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				break
			}
		}
	}
	function Base64Encode(input) {
		return encodeURIComponent(window.btoa(unescape(encodeURIComponent(input))))
	}
	function Base64Decode(input) {
		if(input == undefined) return ""
		return decodeURIComponent(escape(window.atob(input)))
	}
	function FixArray(inputArray) {
		ServiSignLog("FixArray: " + inputArray)
		var array = inputArray.split(";")

		// while(array.indexOf("") != -1){
		// 	var EmptyIndex = array.indexOf("")
		// 	array.splice(EmptyIndex, 1)
		// }
		
		array.toArray = function(){
			return this
		}
		array.splice(-1, 1);
		return array
	}
	function KeepAlive(DataObj) {
		var temp = ""
		DataObj.KeepAlive = true
		DataObj.topuidetect = true
		DataObj.ServiSignMainThread = true
		do{
			temp = ServiSignObj.Send(DataObj)
		}while(temp == "heartbeat")
		return temp
	}
	function isServiSignErrorCode(input) {
		var ErrorCode = parseInt(input) || 0
		return (61000 < ErrorCode && ErrorCode < 61999)
	}
	function getCookie(CookieName) {
		var TargetName = CookieName + "="
		var CookieArray = document.cookie.split(';')
		for (var i = 0; i < CookieArray.length; i++) {
			var CookieElement = CookieArray[i]
			while (CookieElement.charAt(0) == ' ') {
				CookieElement = CookieElement.substring(1)
			}
			if (CookieElement.indexOf(TargetName) == 0) {
				return CookieElement.substring(TargetName.length, CookieElement.length)
			}
		}
		return ""
	}
	function VersionCompare(VersionA, VersionB) {
		var iVersionA = parseInt(VersionA.replaceAll(",","").replaceAll(".","").replaceAll(" ","")) || 0
		var iVersionB = parseInt(VersionB.replaceAll(",","").replaceAll(".","").replaceAll(" ","")) || 0
		
		if(iVersionA == 0 || iVersionB == 0) return VersionCompare_Error
		if(iVersionA > iVersionB) return VersionCompare_Bigger
		if(iVersionA < iVersionB) return VersionCompare_Smaller
		return VersionCompare_Same
	}
	function BrowserDetection() {
		var sBrowser, sUsrAg = navigator.userAgent

		if(sUsrAg.indexOf("Edge") > -1){
			sBrowser = "Edge"
		} else if(sUsrAg.indexOf("Chrome") > -1) {
			sBrowser = "Chrome"
		} else if (sUsrAg.indexOf("Safari") > -1) {
			sBrowser = "Safari"
		} else if (sUsrAg.indexOf("Opera") > -1) {
			sBrowser = "Opera"
		} else if (sUsrAg.indexOf("Firefox") > -1) {
			sBrowser = "Firefox"
		} else if (sUsrAg.indexOf("MSIE") > -1 || sUsrAg.indexOf("Trident/7.0") > -1) {
			sBrowser = "Internet Explorer"
		} else {
			sBrowser = "unknown"
		}
		
		return sBrowser
	}
	function detectOS() {
		// https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js
		var userAgent = window.navigator.userAgent,
			platform = window.navigator.platform,
			macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
			windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
			os = null;
	  
		if (macosPlatforms.indexOf(platform) !== -1) {
		  	os = 'Mac'
		}
		else if (windowsPlatforms.indexOf(platform) !== -1) {
		  	os = 'Windows'
		}
		else if (!os && /Linux/.test(platform)) {
		  	os = 'Linux'
		}
	  
		return os
	}
	function verifyURL(input){
		
		if(input.indexOf("alert(") >= 0){
			return ""
		}

		if(input.indexOf('https://localhost:') != 0 && input.indexOf('https://127.0.0.1:') != 0){
			return ""
		}

		return encodeURI(input)
	}
	function getServiSignObj() {
		var portList = [56445, 56545, 56645]
        var InstallerName = "HCAServiSignAdapterSetup"
		
		var Url_Part1_DNS = 'https://localhost:'
		var Url_Part1_IP = 'https://127.0.0.1:'
		var SessionID =""
		var ServiSignUrl = ""

		var realServiSignVersion = ""
		var realLibVersion = ""
		var realInstallerVersion = ""
		var CurrenOSMinimalInstallerVersion = null
		
		var needUpdate = false
		var Browser = ""
		var OS = null

		var ServiSignObjResultObj = undefined

		var CallbackFunction = []
		var CallbackFunctionIndex = 0
		var isCloseAsynchronously = false
		
		var ServiSignObj = 
		{
			clearServiSignCallback : function(){
				ServiSignLog("CallbackFunction empty")
				CallbackFunction = []
				CallbackFunctionIndex = 0
			},
			setServiSignCallback : function(InputFunction){
				if(typeof InputFunction != "function"){
					CallbackFunction.splice(CallbackFunctionIndex + 1, 0, function(){return ;})
				}
				else{
					CallbackFunction.splice(CallbackFunctionIndex + 1, 0, InputFunction)
				}
			},
			sendData : function(url, DataObj){
				var XMLHttpRequestAsynchronously = (CallbackFunction.length != 0)
				var xhr = new XMLHttpRequest()
				
				try{
					if(verifyURL(url) == ""){
						return undefined
					}
					xhr.open('MagicMethodA|POST|MagicMethodB'.split('|')[1], verifyURL(url), XMLHttpRequestAsynchronously)
				}
				catch(err) {
					return undefined
				}
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
				var onLoadHandler = function(event){
					try {
						ServiSignObjResultObj = JSON.parse(this.responseText)
					}
					catch(err) {
						return undefined
					}

					if(XMLHttpRequestAsynchronously){
						CallbackFunction[CallbackFunctionIndex++](Base64Decode(ServiSignObjResultObj.result), this.ServiSignUrl);
						
						if(CallbackFunctionIndex == CallbackFunction.length){
							ServiSignObj.clearServiSignCallback();
						}
					}
				}
				xhr.onload = onLoadHandler

				DataObj.comname = LibName
				DataObj.libdir = LibDir
				if(ServiSignTabMode == ServiSignTabMode_Tab){
					DataObj.sessionid = SessionID
				}
				else if(ServiSignTabMode == ServiSignTabMode_Browser){
					DataObj.sessionid = Browser
				}
				DataObj.ServiSignTabMode = ServiSignTabMode
				DataObj.ServiSignBrowser = Browser
				DataObj.JSVersion = JSVersion
				DataObj.minlibversion = minLibVersion
				DataObj.minserverversion = minServiSignVersion
				DataObj.InstallerName = InstallerName
				DataObj.PathID = PathID
				DataObj.ServiSignJSGenTime = "2020-03-10 13:29:41"
				
				// For new version form 20190416
				DataObj.AdapterJsonKeyCheck = true				

				var readyDataObj = "Parameter=" + Base64Encode(JSON.stringify(DataObj))
				
				try {
					xhr.send(readyDataObj)
				}
				catch(err) {
					var header = xhr.getResponseHeader("via")
					if (header) {
						ServiSignErrorCode = 61014
					}
					else{
						ServiSignDisconnectError()
					}
					return undefined
				}
				return ServiSignObjResultObj
			},
			TryPort : function() {
				var resultObj
				var DataObj = new Object()
				var ErrorCode = 0

				OS = detectOS()
				Browser = BrowserDetection()

				ServiSignLog(OS)
				ServiSignLog(Browser)

				// DataObj.functionname = "ServiSignEcho"
				DataObj.functionname = "Echo"
				// if(useCookieTryPort){
				// 	ServiSignUrl = getCookie("ServiSignUrl")
				// }
				// else{
				// 	ServiSignUrl = ""
				// }
				ServiSignUrl = ""

				if(ServiSignUrl == "" || ServiSignUrl == "fail") {
					var EchoSuccess = false
					for (var i = 0; i < portList.length; i++) {
						var url
						if(OS == "Mac"){
							url = Url_Part1_DNS + (portList[i] - 2000)
						}
						else{
							url = Url_Part1_DNS + portList[i]
						}

						ServiSignLog("Echo URL: " + url)

						resultObj = this.sendData(url, DataObj)
						if(resultObj != undefined){
							
							ErrorCode = Base64Decode(resultObj.result)
				
							if(ErrorCode != "" && ErrorCode != "0") {
								ServiSignLog("Error code: " + ErrorCode)
								ServiSignErrorCode = parseInt(ErrorCode)
								continue
							}
							ServiSignUrl = url
							EchoSuccess = true
							break
						}
						if(ServiSignErrorCode == 61014){
							// 使用了 Proxy
							// if(useCookieTryPort){
							// 	document.cookie = "ServiSignUrl=fail"
							// }
							ServiSignLog("Using proxy")
							return false
						}
					}
					if(!EchoSuccess){
						for (var i = 0; i < portList.length; i++) {
							var url
							if(OS == "Mac"){
								url = Url_Part1_IP + (portList[i] - 2000)
							}
							else{
								url = Url_Part1_IP + portList[i]
							}

							ServiSignLog("Echo URL: " + url)

							resultObj = this.sendData(url, DataObj)
							if(resultObj != undefined){
								
								ErrorCode = Base64Decode(resultObj.result)
					
								if(ErrorCode != "" && ErrorCode != "0") {
									ServiSignLog("Error code: " + ErrorCode)
									continue
								}
								ServiSignUrl = url
								break
							}
							if(ServiSignErrorCode == 61014){
								// 使用了 Proxy
								// if(useCookieTryPort){
								// 	document.cookie = "ServiSignUrl=fail"
								// }
								ServiSignLog("Using proxy")
								return false
							}
						}
					}
				}
				else{
					ServiSignLog("Echo URL: " + url)
					resultObj = this.sendData(ServiSignUrl, DataObj)
				}

				if(resultObj == undefined){
					// if(useCookieTryPort){
					// 	document.cookie = "ServiSignUrl=fail"
					// }
					ServiSignConnectError()
					return false
				}
				
				ServiSignErrorCode = parseInt(ErrorCode) || 0
				if(ServiSignErrorCode == 0){
					// if(useCookieTryPort){
					// 	document.cookie = "ServiSignUrl=" + ServiSignUrl
					// }
				}
				else{
					// if(useCookieTryPort){
					// 	document.cookie = "ServiSignUrl=fail"
					// }
					return false
				}
				
				realServiSignVersion = Base64Decode(resultObj.ServerVersion)
				realLibVersion = Base64Decode(resultObj.LibVersion)
				realInstallerVersion = Base64Decode(resultObj.InstallerVersion)
				
				if(SessionID == "") {
					SessionID = Base64Decode(resultObj.SessionID)
				}

				if(OS == "Windows"){
					CurrenOSMinimalInstallerVersion = MinimalInstallerVersion
				}
				else if(OS == "Mac"){
					CurrenOSMinimalInstallerVersion = MinimalInstallerVersion_Mac
				}
				else if(OS == "Linux"){
					CurrenOSMinimalInstallerVersion = MinimalInstallerVersion_Linux
				}
				
				needUpdate = (VersionCompare(CurrenOSMinimalInstallerVersion, realInstallerVersion) == VersionCompare_Bigger || VersionCompare(CurrenOSMinimalInstallerVersion, realInstallerVersion) == VersionCompare_Error)
				
				ServiSignErrorCode = 0
				return true
			},
			Send : function(DataObj) {
				DataObj.comname = LibName
				var resultObj = this.sendData(ServiSignUrl, DataObj)
				try {
					return Base64Decode(resultObj.result)
				}
				catch(err) {
					return ""
				}
			},
			getCGServiSignVersion : function() {
				return realServiSignVersion
			},
			getLibVersion : function() {
				return realLibVersion
			},
			getInstallerVersion : function() {
				return realInstallerVersion
			},
			getMinimalInstallerVersion : function() {
				return CurrenOSMinimalInstallerVersion
			},
			ServiSigninit : function() {
				var XMLHttpRequestSupported = typeof new XMLHttpRequest().responseType === 'string'
				
				if(!XMLHttpRequestSupported) {
					alert("This Browser does NOT support XMLHttpRequest")
					return false
				}
				return this.TryPort()
			},
			ServiSignRelease : function() {
				if(ServiSignErrorCode != 0){
					return
				}

				var empty_func = function() { return undefined; };
				this.setServiSignCallback(empty_func)

				var DataObj = new Object()
				DataObj.functionname = "ServiSignRelease"
				DataObj.minlibversion = minLibVersion
				this.Send(DataObj)

				realServiSignVersion = ""
				realLibVersion = ""
				realInstallerVersion = ""
				CurrenOSMinimalInstallerVersion = null
				
				SessionID = ""
				needUpdate = false
				ServiSignErrorCode = 0
			},
			ServiSignForceRelease : function() {
				var DataObj = new Object()
				DataObj.functionname = "ServiSignForceRelease"
				DataObj.minlibversion = minLibVersion
				this.Send(DataObj)

				realServiSignVersion = ""
				realLibVersion = ""
				realInstallerVersion = ""
				CurrenOSMinimalInstallerVersion = null
				
				SessionID = ""
				needUpdate = false
				ServiSignErrorCode = 0
			},
			needUpdateInstaller : function() {
				return needUpdate
			},
			setServiSignValue : function(channel, domain_list, timeout, value){
				var DataObj = new Object()
				DataObj.functionname = "setServiSignValue"
				DataObj.channel = channel
				DataObj.domain_list = domain_list
				DataObj.timeout = timeout
				DataObj.value = value
				DataObj.value_ServiSignHide = true
				return this.Send(DataObj)
			},
			getServiSignValue : function(channel){
				var DataObj = new Object()
				DataObj.functionname = "getServiSignValue"
				DataObj.channel = channel
				DataObj.hide_result = true
				return this.Send(DataObj)
			}
		}
		return ServiSignObj
	}
	var ServiSignObj = getServiSignObj()
	var ServiSignInterface = 
	{
		GetServiSignVersion : function() {
			return ServiSignObj.getCGServiSignVersion()
		},
		GetLibVersion : function() {
			return ServiSignObj.getLibVersion()
		},
		GetInstallerVersion : function() {
			return ServiSignObj.getInstallerVersion()
		},
		GetMinimalInstallerVersion : function() {
			return ServiSignObj.getMinimalInstallerVersion()
		},
		SetServiSignCallback : function(InputFunction) {
			ServiSignObj.setServiSignCallback(InputFunction)
		},
		//1130402	Leslie	為了在非同步的CallBack函式中查詢ErrorCode，開放Clear
		clearServiSignCallback : function(){
			ServiSignObj.clearServiSignCallback();
		},
		NeedUpdateInstaller : function() {
			return ServiSignObj.needUpdateInstaller()
		},
		ServiSignForceRelease : function() {
			return ServiSignObj.ServiSignForceRelease()
		},
		SetServiSignValue : function(channel, domain_list, timeout, value){
			return ServiSignObj.setServiSignValue(channel, domain_list, timeout, value)
		},
		GetServiSignValue : function(channel){
			return ServiSignObj.getServiSignValue(channel)
		},
		GetFakeErrorCode : function(){
			return 0;
		},
		ATL_InitModule : function(moduleName, initArgs){
			var DataObj = new Object()
			DataObj.functionname = "ATL_InitModule"
			DataObj.moduleName_ServiSignBase64Flag = true
			DataObj.moduleName = Base64Encode(moduleName)
			DataObj.initArgs_ServiSignBase64Flag = true
			DataObj.initArgs = Base64Encode(initArgs)
			DataObj.ServiSignFunctionIndex = 0

			return ServiSignObj.Send(DataObj)
		},
		ATL_CloseModule : function(ulModuleHandle){
			var DataObj = new Object()
			DataObj.functionname = "ATL_CloseModule"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.ServiSignFunctionIndex = 1

			return ServiSignObj.Send(DataObj)
		},
		ATL_InitSession : function(ulModuleHandle, iFlags, userPin){
			var DataObj = new Object()
			DataObj.functionname = "ATL_InitSession"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.iFlags = iFlags
			DataObj.userPin_ServiSignBase64Flag = true
			DataObj.userPin = Base64Encode(userPin)
			DataObj.ServiSignFunctionIndex = 2

			return ServiSignObj.Send(DataObj)
		},
		ATL_CloseSession : function(ulModuleHandle, ulSessionHandle){
			var DataObj = new Object()
			DataObj.functionname = "ATL_CloseSession"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.ulSessionHandle = ulSessionHandle
			DataObj.ServiSignFunctionIndex = 3

			return ServiSignObj.Send(DataObj)
		},
		ATL_GetCardHCACardVersion : function(ulModuleHandle){
			var DataObj = new Object()
			DataObj.functionname = "ATL_GetCardHCACardVersion"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.ServiSignFunctionIndex = 4

			return ServiSignObj.Send(DataObj)
		},
		ATL_GetKeyObjectHandle : function(ulModuleHandle, ulSessionHandle, iKeyType, key_id, param){
			var DataObj = new Object()
			DataObj.functionname = "ATL_GetKeyObjectHandle"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.ulSessionHandle = ulSessionHandle
			DataObj.iKeyType = iKeyType
			DataObj.key_id_ServiSignBase64Flag = true
			DataObj.key_id = Base64Encode(key_id)
			DataObj.param_ServiSignBase64Flag = true
			DataObj.param = Base64Encode(param)
			DataObj.ServiSignFunctionIndex = 5

			return ServiSignObj.Send(DataObj)
		},
		ATL_DeleteKeyObject : function(ulModuleHandle, ulSessionHandle, ulKeyObjectHandle){
			var DataObj = new Object()
			DataObj.functionname = "ATL_DeleteKeyObject"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.ulSessionHandle = ulSessionHandle
			DataObj.ulKeyObjectHandle = ulKeyObjectHandle
			DataObj.ServiSignFunctionIndex = 6

			return ServiSignObj.Send(DataObj)
		},
		ATL_GetCertificateFromGPKICard : function(ulModuleHandle, ulSessionHandle, iCertId, readerName){
			var DataObj = new Object()
			DataObj.functionname = "ATL_GetCertificateFromGPKICard"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.ulSessionHandle = ulSessionHandle
			DataObj.iCertId = iCertId
			DataObj.readerName_ServiSignBase64Flag = true
			DataObj.readerName = Base64Encode(readerName)
			DataObj.ServiSignFunctionIndex = 7

			return ServiSignObj.Send(DataObj)
		},
		ATL_HashFunction : function(ulModuleHandle, ulSessionHandle, ulAlgorithm, b64Data){
			var DataObj = new Object()
			DataObj.functionname = "ATL_HashFunction"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.ulSessionHandle = ulSessionHandle
			DataObj.ulAlgorithm = ulAlgorithm
			DataObj.b64Data_ServiSignBase64Flag = true
			DataObj.b64Data = Base64Encode(b64Data)
			DataObj.ServiSignFunctionIndex = 8

			return ServiSignObj.Send(DataObj)
		},
		ATL_GetErrorCode : function(){
			var DataObj = new Object()
			DataObj.functionname = "ATL_GetErrorCode"
			DataObj.ServiSignFunctionIndex = 46

			return ServiSignObj.Send(DataObj)
		},
		ATL_MakeSignatureEx2 : function(ulModuleHandle, ulSessionHandle, ulAlgorithm, ulEndianness, b64Data, ulPvKeyObject){
			var DataObj = new Object()
			DataObj.functionname = "ATL_MakeSignatureEx2"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.ulSessionHandle = ulSessionHandle
			DataObj.ulAlgorithm = ulAlgorithm
			DataObj.ulEndianness = ulEndianness
			DataObj.b64Data_ServiSignBase64Flag = true
			DataObj.b64Data = Base64Encode(b64Data)
			DataObj.ulPvKeyObject = ulPvKeyObject
			DataObj.ServiSignFunctionIndex = 66

			return ServiSignObj.Send(DataObj)
		},
		ATL_CloseModuleEx : function(ulModuleHandle, iFlag){
			var DataObj = new Object()
			DataObj.functionname = "ATL_CloseModuleEx"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.iFlag = iFlag
			DataObj.ServiSignFunctionIndex = 71

			return ServiSignObj.Send(DataObj)
		},
		ATL_SignWithoutHash : function(ulModuleHandle, ulSessionHandle, b64Data, ulPvKeyObject){
			var DataObj = new Object()
			DataObj.functionname = "ATL_SignWithoutHash"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.ulSessionHandle = ulSessionHandle
			DataObj.b64Data_ServiSignBase64Flag = true
			DataObj.b64Data = Base64Encode(b64Data)
			DataObj.ulPvKeyObject = ulPvKeyObject
			DataObj.ServiSignFunctionIndex = 72

			return ServiSignObj.Send(DataObj)
		},
		ATL_GetHCABasicData : function(ulModuleHandle){
			var DataObj = new Object()
			DataObj.functionname = "ATL_GetHCABasicData"
			DataObj.ulModuleHandle = ulModuleHandle
			DataObj.ServiSignFunctionIndex = 59

			return FixArray(ServiSignObj.Send(DataObj))
		},
	}

	window.addEventListener("beforeunload", function (e) {
		if(ServiSignTabMode == ServiSignTabMode_Tab){
			ServiSignObj.ServiSignRelease()
		}
		else if(ServiSignTabMode == ServiSignTabMode_Browser){
			//Do nothing
		}
	})
	if(!ServiSignObj.ServiSigninit()){
		ServiSignLoadComponentError()
		return undefined
	}
	
	return ServiSignInterface
}
    
//1130329	Leslie[1120589]	重做SmartCard()模組
function SmartCard(isGCA = false){
	
	//提供非MS環境程式可讀取SSO_CONFIG設定
	if('GetSSOPage' in window)
		SSO_CONFIG = GetSSOPage().SSO_CONFIG;
	
	//HCA憑證的參數區
	var GET_UTF8_DN = 1;
	var HCAPKCS11_MODULE = "HCAPKCS11.dll"
	var CKF_RW_SESSION		= 0x00000002;
	var CKF_SERIAL_SESSION	= 0x00000004;

	var CKM_MD5				= 0x00000210;
	var CKM_SHA_1			= 0x00000220;
	var CKM_SHA224			= 0x00000255;
	var CKM_SHA256			= 0x00000250;
	var CKM_SHA384			= 0x00000260;
	var CKM_SHA512			= 0x00000270;

	var CKM_RSA_PKCS		= 0x00000001;
	var CKM_SHA1_RSA_PKCS	= 0x00000006;

	var CKM_SHA256_RSA_PKCS = 0x00000040
	var CKM_SHA384_RSA_PKCS = 0x00000041
	var CKM_SHA512_RSA_PKCS = 0x00000042
	var CKM_SHA224_RSA_PKCS = 0x00000046

	var CKM_DES3_ECB		= 0x00000132;
	var CKM_DES3_CBC		= 0x00000133;
	var DES3_KEY_LENGTH = 24;

	var GET_POLICY_ID	= 0;
	var GET_MSG_IMPRINT	= 1;
	var	GET_SERIAL		= 2;
	var	GET_TIME		= 3;
	var	GET_VERSION		= 4;
	var	GET_ACCURACY	= 5;
	var	GET_NONCE		= 6;

	var TS_SERVER_ADDR = "203.65.114.5";
	var TS_SERVER_PORT = "80";//"801";//

	var HCA_OCSP_URL = "http://hcaocsp.nat.gov.tw/cgi-bin/OCSP/ocsp_server.exe";
	var MOICA_OCSP_URL = "http://moica.nat.gov.tw/cgi-bin/OCSP/ocsp_server.exe";

	var OID_SUBJECT_DIRECTORY_ATTRIBUTE = "2.5.29.9";
	var OID_SUBJECT_TYPE = "2.16.886.1.100.2.1";
	var OID_HOP = "2.16.886.1.100.3.2.21";
	var OID_HPC = "2.16.886.1.100.3.1.7";

	var CARD_TYPE_HOP = 0;
	var CARD_TYPE_HPC = 1;

	var m_hModule = 0, m_hSession = 0, m_hSOSession = 0, m_error = 0, m_cardVer = -1, m_cardType = -1, hPriKey = 0;
	
	const MOICA = 'MOICA',HCA='HCA';
	const USER_LAST_CERT = 'USER_LAST_CERT';
	var _isGCA = isGCA;
	//1140108	Leslie	增修For純檔管
	// var defaultModule = JSON.parse(JSON.stringify(SSO_CONFIG.defaultUserCertType||[]));
	var defaultModule = (typeof SSO_CONFIG == 'undefined')?[]:JSON.parse(JSON.stringify(SSO_CONFIG.defaultUserCertType||[]));
	var _moica = null,_hca = null,_MethodName = "", _lastErrMsg = '';
	var _currModule = '';
	//var _SCJobDfd = null, _SCSignJobDfd = null;
	var _arSCJobDfd = [];
	var _Algorithm = function(argAlog){
		return (argAlog == 'SHA1')?CKM_SHA1_RSA_PKCS:CKM_SHA256_RSA_PKCS;
	};
	var m_hCert = '';
	
	if(!defaultModule.includes(MOICA))
		defaultModule.push(MOICA);
	if (typeof theLogger == 'undefined') 
        theLogger = window.console;
	
	//1131004	Leslie[序272]	憑證(登入)時，將登入時的憑證改為優先選項
	if((localStorage['firstCert']?.length??0) > 1)
		defaultModule.unshift(localStorage['firstCert']);
	
	//1131118	Leslie[序382]	[北榮]修正使用HCA憑證，但回傳仍為MOICA跨平台元件的異常訊息
	var _rtnHCAErr = false;
	
	function _getModuleType(){
		if(_isGCA)
			return MOICA;
		// else if('USER_LAST_CERT' in localStorage && localStorage[USER_LAST_CERT] != '')
			// return localStorage[USER_LAST_CERT];
		else{
			if(defaultModule.length > 0)
				return defaultModule.shift();
		}
	}
	
	function _getModule(nextModule){
		if(!_moica || !_hca || nextModule){
			_currModule = _getModuleType();
			if(_currModule == HCA)
				_hca = getHCAAPISVIAdapterObj(); //若是回傳undefiend，表示使用者未安裝HCAServiSign
			else
				_moica = new CHT_SmartCard();
		}
		
		if(_currModule == HCA){
			if(_hca != undefined){
				m_hModule = _hca.ATL_InitModule(HCAPKCS11_MODULE, "");	//預做InitModule
				if( (m_error= _hca.ATL_GetErrorCode())!=0 ){
					_hca = null;
					return _getModule(true);
				}
				//1131118	Leslie[序382]	[北榮]修正使用HCA憑證，但回傳仍為MOICA跨平台元件的異常訊息
				else
					_rtnHCAErr = true;	//HCA模組無法用非HCA卡片完成初始化(m_error=9056)，所以，只要ATL_InitModule()回傳為0，基本可認定使用者用的是HCA卡片
			}
			else
				return _getModule();
		}
		
		return _currModule;
	}
	
	function _handleCallBack(rslt){
		//可能已被做Base64Decode()
		_hca.clearServiSignCallback();	//強制清空非同步CallBack紀錄,不然無法取得ErrorCode
		if( (m_error=_hca.ATL_GetErrorCode())!=0 ){
			_lastErrMsg = GetErrorMessage(m_error)
			if(_arSCJobDfd.length){
				//1130905	Leslie[序215]	[中榮]調整元件異常時，增加可設定客製化訊息
				if ('certModuleErrMsg' in SSO_CONFIG && SSO_CONFIG.certModuleErrMsg.length)
					_lastErrMsg = `跨平台簽章模組發生異常\n\n${SSO_CONFIG.certModuleErrMsg}\n\n${_lastErrMsg}`;
				_arSCJobDfd.pop().reject({success:false, _errMsg: _lastErrMsg});
			}
		}
		else{
			if(_arSCJobDfd.length){				
				if(_MethodName == "getCert"){
					rtn = _hca.ATL_GetHCABasicData(m_hModule);
					if( (m_error= _hca.ATL_GetErrorCode())!=0 ){
						_lastErrMsg = GetErrorMessage(m_error)
						if(_arSCJobDfd.length)
							_arSCJobDfd.pop().reject({success:false, _errMsg: _lastErrMsg});
					}
					var datas = rtn.toArray();
					_arSCJobDfd.pop().resolve({success:true, cert: { 
						certb64: rslt.replaceAll('\n',''),
						subjectCN: datas[0]
					}});
				}
				else 
					//1131004	Leslie[序272]	憑證登入時，將登入時的憑證改為優先選項
					// _arSCJobDfd.pop().resolve({success:true, signature: rslt, certb64: m_hCert.certb64, ret_code: m_error });
					_arSCJobDfd.pop().resolve({success:true, signature: rslt, certb64: m_hCert.certb64, ret_code: m_error , currModule:_currModule});
			}
		}
		
		if(hPriKey!=0){
			_hca.ATL_DeleteKeyObject(m_hModule, m_hSession, hPriKey);
		}
	}
	
	function _getCert(argPin = ''){
		var _SCJobDfd = $.Deferred();
		let bReTry = true;
		if(_currModule == '')
			_getModule();
		
		if(_currModule == HCA){
			//HCA 取憑證，先取Session
			m_hSession = _hca.ATL_InitSession(m_hModule, CKF_RW_SESSION|CKF_SERIAL_SESSION, argPin);
			if( (m_error=_hca.ATL_GetErrorCode())==0 ){
				_MethodName = "getCert";
				_arSCJobDfd.push(_SCJobDfd);
				_hca.SetServiSignCallback(_handleCallBack)
				_hca.ATL_GetCertificateFromGPKICard(m_hModule, m_hSession, 1, "");	//0:CA憑證，1：加簽憑證，2：加密憑證
			}
			else if(bReTry){
				if(_getModule(bReTry) == MOICA){
					theLogger.log(`讀取HCA異常，重試${_currModule}憑證`);
					return _moica.getCert();
				}
				else{
					//1131118	Leslie[序382]	[北榮]修正使用HCA憑證，但回傳仍為MOICA跨平台元件的異常訊息
					if(_rtnHCAErr)
						_SCJobDfd.reject({success:false, _errMsg:GetErrorMessage(m_error)})	
					else
					_SCJobDfd.reject({success:false, _errMsg:_lastErrMsg})
				}
				bReTry = false;
			}
			else
				_SCJobDfd.reject({success:false, _errMsg:_lastErrMsg})
		}
		else{
			_moica.getCert()
			.then(function(rslt){
				_SCJobDfd.resolve(rslt);	//已經是原本SmartCard()包過的物件
			})
			.fail(function(rslt){
				_lastErrMsg = rslt._errMsg;
				if(bReTry){
					if(_getModule(bReTry) == HCA){
						theLogger.log(`讀取MOICA異常，重試${_currModule}憑證`);
						_getCert().then(function(rslt){
							_SCJobDfd.resolve(rslt);
						})
						.fail(function(rslt){
							_SCJobDfd.reject(rslt);
						})
					}
					else
						_SCJobDfd.reject({success:false, _errMsg:_lastErrMsg})
					bReTry = false;
				}
				else
					_SCJobDfd.reject({success:false, _errMsg:_lastErrMsg})
			})
		}
		
		return _SCJobDfd.promise();
	}
	
	//移除CHT專用的簽署用Header
	function _trimSha256Header(base64){
		var binaryString = atob(base64);
		var bytes = new Uint8Array(binaryString.length - 19);
		for (var i = 0; i < bytes.length; i++) {
			bytes[i] = binaryString.charCodeAt(i + 19);
		}
		
		return btoa(String.fromCharCode(...new Uint8Array(bytes.buffer)));
	}
	
	//加上CHT專用的簽署用Header
	function _combinSha256Header(base64) {
		function _appendBuffer(buffer1, buffer2) {
		  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
		  tmp.set(new Uint8Array(buffer1), 0);
		  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
		  return tmp.buffer;
		};
		
		var header = new Uint8Array([0x30, 0x31, 0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x02, 0x01, 0x05, 0x00, 0x04, 0x20])
		var binaryString = atob(base64);
		var bytes = new Uint8Array(binaryString.length);
		for (var i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		
		var hashWithHeader = _appendBuffer(header.buffer,bytes.buffer);
		
		//const base64String = btoa(String.fromCharCode(...new Uint8Array(hashWithHeader)));
		//return bytes.buffer;
		return btoa(String.fromCharCode(...new Uint8Array(hashWithHeader)))
	}
	
	function _makeSignature(tbs, encode, pincode, hashAlgorithm, _newTimeout) {
		var _SCSignJobDfd = $.Deferred();
		//encode：'hashBase64'、'base64'
		//hashAlgorithm：'SHA1'、'SHA256'
		if(_currModule == '')
			_getModule();
		let bReTry = true;
		if(_currModule == HCA){
			_getCert(pincode).then(function(rslt){
				m_hCert = rslt.cert;
				hPriKey = _hca.ATL_GetKeyObjectHandle(m_hModule, m_hSession, 0, "", "1");	//取得PrivKey
				if(	(m_error = _hca.ATL_GetErrorCode())==0 ){
					_MethodName = "makeSignature";
					_arSCJobDfd.push(_SCSignJobDfd);
					_hca.SetServiSignCallback(_handleCallBack)
					if(encode == 'hashBase64')
						//目前簽出來會驗不過
						_hca.ATL_SignWithoutHash(m_hModule, m_hSession, _trimSha256Header(tbs), hPriKey);
					else
						_hca.ATL_MakeSignatureEx2(m_hModule, m_hSession, _Algorithm(hashAlgorithm), 0, tbs, hPriKey);
				}
				else{
					//1131118	Leslie[序382]	[北榮]修正使用HCA憑證，但回傳仍為MOICA跨平台元件的異常訊息
					if(_rtnHCAErr)
						_SCSignJobDfd.reject({success:false, _errMsg:GetErrorMessage(m_error)})	
					else
					_SCSignJobDfd.reject({success:false, _errMsg:_lastErrMsg})					
				}
			})
			.fail(function(rslt){
				_lastErrMsg = rslt._errMsg;
				if(bReTry){
					if(_getModule(bReTry) == MOICA){
						theLogger.log(`HCA啟動異常，重試${_currModule}憑證`);
						return _moica.makeSignature();
					}
					else{
						//1130905	Leslie[序215]	[中榮]調整元件異常時，增加可設定客製化訊息
						if ('certModuleErrMsg' in SSO_CONFIG && SSO_CONFIG.certModuleErrMsg.length)
							_lastErrMsg = `跨平台簽章模組發生異常\n\n${SSO_CONFIG.certModuleErrMsg}\n\n${_lastErrMsg}`;
						_SCSignJobDfd.reject({success:false, _errMsg:_lastErrMsg})
					}
					bReTry = false;
				}
			})
		}else{
			_moica.makeSignature(tbs, encode, pincode, hashAlgorithm, _newTimeout)
			.then(function(rslt){
				//1131004	Leslie[序272]	憑證登入時，將登入時的憑證改為優先選項
				rslt.currModule = _currModule;
				_SCSignJobDfd.resolve(rslt);
			})
			.fail(function(rslt){
				_lastErrMsg = rslt._errMsg;
				if(bReTry){
					if(_getModule(bReTry) == HCA){
						theLogger.log(`MOICA簽署異常，重試${_currModule}憑證`);
						_makeSignature(tbs, encode, pincode, hashAlgorithm, _newTimeout).then(function(rslt){
							_SCSignJobDfd.resolve(rslt);
						})
						.fail(function(rslt){
							_SCSignJobDfd.reject(rslt);
						})
					}
					else{
						//1130905	Leslie[序215]	[中榮]調整元件異常時，增加可設定客製化訊息
						if ('certModuleErrMsg' in SSO_CONFIG && SSO_CONFIG.certModuleErrMsg.length)
							_lastErrMsg = `跨平台簽章模組發生異常\n\n${SSO_CONFIG.certModuleErrMsg}\n\n${_lastErrMsg}`;
						_SCSignJobDfd.reject({success:false, _errMsg:_lastErrMsg})
					}
					bReTry = false;
				}
				else{
					//1130905	Leslie[序215]	[中榮]調整元件異常時，增加可設定客製化訊息
					if ('certModuleErrMsg' in SSO_CONFIG && SSO_CONFIG.certModuleErrMsg.length)
						_lastErrMsg = `跨平台簽章模組發生異常\n\n${SSO_CONFIG.certModuleErrMsg}\n\n${_lastErrMsg}`;
					_SCSignJobDfd.reject({success:false, _errMsg:_lastErrMsg})
				}
			})
		}
		
		return _SCSignJobDfd.promise();
	}
	
    function _getSCardModuleInfo() {
		var _SCJobDfd = $.Deferred();
		_MethodName = "getSCardModuleInfo";
		let bReTry = true;
		
		if(_currModule == '')
			_getModule();
		
		if(_currModule == HCA){
			//1130416	Leslie	調整HCA回應的Module格式，與CHT格式不同時，可改為觸發以RawData加簽
			//_SCJobDfd.resolve({success: true,SCModuleInfo:{serverVersion:_hca.GetInstallerVersion()}});
			_SCJobDfd.resolve({success: true,SCModuleInfo:"HCA"});
		}else{
			_moica.getSCardModuleInfo()
			.then(function(rslt){
				//1130425	Leslie	修正Deferred問題，以修正背景傳送未正確執行問題
				var _SCSignJobDfd = $.Deferred();
				if(rslt.success){
					if(typeof rslt?.SCModuleInfo?.slots[0]?.token == 'object')	//有找到CHT卡片
						_SCJobDfd.resolve(rslt);
					else
						//1130827	Leslie[序215]	調整模組異常時的處理機制，模組異常時，改回阻擋傳送
						// _SCSignJobDfd.reject({success:false, _errMsg:"無法識別的卡片"})
						_SCSignJobDfd.reject({success:true, _errMsg:"無法識別的卡片"})	//有CHT模組，但無法識別卡片(或沒插卡片)
				}
				else
					_SCSignJobDfd.reject({success:false, _errMsg:"無法識別的卡片"})
				//1130425	Leslie	修正Deferred問題，以修正背景傳送未正確執行問題
				return _SCSignJobDfd;
			})
			.fail(function(rslt){
				_lastErrMsg = rslt._errMsg;
				if(bReTry){
					if(_getModule(bReTry) == HCA){
						theLogger.log(`讀取MOICA異常，重試${_currModule}憑證`);
						//1130416	Leslie	調整HCA回應的Module格式，與CHT格式不同時，可改為觸發以RawData加簽
						//_SCJobDfd.resolve({success: true,SCModuleInfo:{serverVersion:_hca.GetInstallerVersion()}});
						_SCJobDfd.resolve({success: true,SCModuleInfo:"HCA"});
					}
					else
						//1130429	Leslie	改為resolve()避免無法使用臨時憑證
						//1130827	Leslie[序215]	調整模組異常時的處理機制，模組異常時，改回阻擋傳送
						if(rslt.success)
							_SCJobDfd.resolve({success: true,SCModuleInfo:"未插入IC卡"});
						else{
							//1130905	Leslie[序215]	[中榮]調整元件異常時，增加可設定客製化訊息
							if ('certModuleErrMsg' in SSO_CONFIG && SSO_CONFIG.certModuleErrMsg.length)
								_lastErrMsg = `跨平台模組檢核異常\n\n${SSO_CONFIG.certModuleErrMsg}\n\n${_lastErrMsg}`;
							_SCJobDfd.reject({success:false, _errMsg:_lastErrMsg})
						}
					bReTry = false;
				}
				else
					_SCJobDfd.reject({success:false, _errMsg:_lastErrMsg})
			})
		}		
		
		return _SCJobDfd.promise();
	}
	
	/* 重設元件內部變數 */
    function _reset() {  
		if(!!_hca){
			if(m_hSession != 0){
				_hca.ATL_CloseSession(m_hModule, m_hSession);
				if( (m_error=_hca.ATL_GetErrorCode())!=0 )
					theLogger.warn(GetErrorMessage(m_error));
			}
			
			if(m_hModule != 0){
				_hca.ATL_CloseModule(m_hModule);
			}
			m_hModule = m_hSession = 0;
		}
		if(!!_moica){
			_moica.reset();
		}
		_arSCJobDfd = [];
	}
	
    function _checkCertLink(SAMLart, certb64, usage, authWSUrl) {
        if (typeof authws == 'object') {
            return authws.checkCertificateLink(SAMLart, certb64, usage, {url: authWSUrl});
        }
    }
    
    function _checkCertValidity(certb64, usage, sourceOrgNo, authWSUrl) {
        if (typeof authws == 'object') {
			//1140707	Leslie[1131250]	[退輔會]新增機關憑證的即將到期檢核，增加處理>0的部分，到外面再重新判斷(需取得憑證資訊)
            // return authws.checkCertificateValidity(certb64, usage, sourceOrgNo, {url: authWSUrl});
			function _BuildDtStr(sDate){	
				//MOICA跨平台元件取得的日期
				//notAfter：270321155959Z，格式：年(2)月(2)日(2)時(2)分(2)秒(2)(GMT)，輸出需+8：2027/03/21 23:59:59 (+8)
				//notAfterT：1805644799(為秒數，轉為Date要用毫秒)，new Date(notAfterT * 1000) 即為正確日期
				var _date;
				if(typeof sDate == 'string'){
					_date = new Date(`20${sDate[0]+sDate[1]}/${sDate[2]+sDate[3]}/${sDate[4]+sDate[5]} ${(sDate[6]+sDate[7])}:${sDate[8]+sDate[9]}:${sDate[10]+sDate[11]}`);
					_date.setHours(_date.getHours() + 8);	//notAfter：依時區+8
				}
				else if(typeof sDate == 'number')
					_date = new Date(sDate * 1000);			//notAfterT：乘1000直接轉換
				else
					return sDate
				return `${_date.toLocaleDateString()} ${_date.toLocaleTimeString()}`;
			}
			
			var _dfd = $.Deferred();
			var _warnCode = 0;
            authws.checkCertificateValidity(certb64, usage, sourceOrgNo, {url: authWSUrl})
			.then(function(rslt){
				if(usage == '1' && 'warnCode' in rslt){
					_warnCode = rslt.warnCode;
					_reset();
					_getCert().then(function(rsltCert){
						var strMsg = '';
						if (rsltCert.success) {
							let _ExpirD = _BuildDtStr(rsltCert.cert.notAfterT);
							win_focus = true;	//強制跳出alert()訊息
							switch (_warnCode){
								case 1: strMsg = `您的機關憑證即將於 ${_ExpirD} 到期，請儘速更新卡片效期，以免無法使用。`;
									break;
								default: strMsg ='未知的憑證狀態';
									break;
							}
						}
						else{
							theLogger.error('-ERR- 憑證有效性驗證後，無法取得憑證資訊!');
						}
						if(strMsg != '')
							_dfd.resolve({ success: true , wornMsg: strMsg});
						else
							_dfd.resolve({ success: true });
					})
					.fail(function(er){
						theLogger.error('-ERR- 憑證有效性驗證後，無法取得憑證資訊!' + er._errMsg);
						_dfd.resolve({ success: true });
					})
				}
				else{
					_dfd.resolve(rslt)
				}
			})
			return _dfd.promise();
        }
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
						//1121212	Joe		1110608		修正憑證政策錯誤提示訊息
                        // case -5: return '憑證未設定指定用途';
                        case -5: return '憑證未設定指定用途，請聯繫系統管理員。';
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
									  //1140707	Leslie[1131250]	[退輔會]新增機關憑證的即將到期檢核，調整判斷條件
                                      // if (r !== 0) {
                                      if (r < 0) {
                                          var errStr = _getErrStr(r);
                                          _dfd.resolve({ success: false, errCode: r, errMsg: errStr });
                                      }
									  //1140707	Leslie[1131250]	[退輔會]新增機關憑證的即將到期檢核，增加處理>0的部分，到外面再重新判斷(需取得憑證資訊)
									  else if(r > 0 && usage == '1'){										  
										  _dfd.resolve({ success: true , warnCode: r});
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