/* jshint -W100 */

/*
DATE	MGRNO		SA		PG
1080530 n/a         Eric    Eric    修正語法錯誤, 造成圖示模示開啟公文, 公文關閉後未拉出側屜問題.
1070115 1061276		David 	Eric	傳送/儲存公文提示錯誤訊息內容改善.
1061024	1060953		David	David	鐵工局如為彙辦公文，可使用承辦人自行決行
1061024 1060975		David 	Eric	[預排流程]功能使用, 不排除會辦公文.
1061017 1060748     David   Eric    預排流程設定UI調整, 子視窗結束後同步傳送選項功能.
1061012 1060819     Eric    Eric    憑證登入及傳送簽章時若跨平台網頁元件作業異常, 提示使用者錯誤訊息
1060821	1060783		Eric	David	修改_updatePDocTransTargetFromDI()內，新增判斷當DOC_STATE異動時重組異動別選單
1060603 1060292     Eric	Eric	iOS平台,分會設定子視窗無法以touch scrol內容問題.(iframe inside an iframe)		
1060512	1060309		Eric 	Eric    未申請臨時憑證時,Pincode子視窗隱藏相關選項
1060508				Eric	Eric    選[順會]/[分會]等異動別,開啟傳送設定子視窗異常問題.
1060421 1060272     Eric	Eric    傳送對象設定子視窗第2次開啟時, 異動別與傳送選單連動失效問題修正.
1051007             Eric    Eric    iPad顯示bug-fix
1051006 			Eric    Eric    (序344)配合系統部修改, TX_NAME異動後叫用fnODC011ChangeRemark().
1050929 			Eric    Eric    (序317)叫用saveView函式回傳錯誤時不顯示錯誤訊息.
									調整傳送作業, 不先取憑證驗證, 於加簽後取得憑證再驗證.
1050926 			Eric    Eric    (序279)實作右鍵傳送功能
1050911 			Eric    Eric    實作紙本分會流程設定功能
1050909 			Eric    Eric    線上簽核公文傳送叫用WebFileIO.UpdateEnveloped/UpdateDraftEnvelope時傳入後續是否加簽flag.(0x10000)
1050907 			Eric    Eric    線上簽核公文傳送加簽程序修改, 取消取憑證作業. (直接加簽,再由回傳的憑證驗證簽章有效性.)
									首次承辧退文判定修正.
1050906 			Eric    Eric    公文是否核決, 新增APP_ROLE_ID判定.
1050825 			Eric    Eric    傳送公文時, 若ODWWKF有異動, 一併上傳ODWWKF-XX.XML檔
1050824             Eric    Eric    [公文傳送]將_uploadDocInfo移到_saveMsg內執行. (after FolioModel.saveView(), before ODMSSP.SaveMsg)
1050823             Eric    Eric    [紙本傳送]公文儲存完成後再上傳基資檔(ODWMSG.XML/ODWDCM.XML)
                                    SSOUtil.updatePDocTransTargetFromDI, 指定nextTarget時, 作業完成後依原始資訊判定match status!
1050821             Eric    Eric    叫用SSOUtil.updatePDocTransTargetFromDI後, 立即更新公文基資異動別及傳送對象相關欄位值.
1050819	   		    Eric	Eric	修改開啟公文時, ODWMSG.TX_NAME不在MenuRule設定項目時, 未正確顯示傳送選單問題.
                                    第一次開啟公文, 傳送選單帶出預設選項, 未回寫docObj對應欄位問題.
                                    來文分辦, 未有文稿時, 應毋須異動封裝檔(不用加簽).
1060825	1060515		Leslie	Leslie	高港警需求，呼叫SaveView時增加傳入當前作業"傳送"文字
1061018	1060453		Leslie	Leslie	[退單補修]鐵工局密件邏輯
1070112	1060452		Raymond	Raymond	鐵工局直屬長官傳送成功後刪除秘書簽辦意見檔
1071023				Raymond	Raymond	RRB_ENABLE_SCRECT_DOC_LOGIC=Y(鐵工局客製需求)避免因簽稿會核單禁止非承辦人異動文稿等特殊限制, 造成傳送時轉圈圈問題
1080923 1080339     Kevin   Eric    jQuery 3.0 upgrade
1081230	1080194		Raymond	Raymond	配合fnWebEditSave改為非同步呼叫, saveView也改為非同步
1091127 N/A         Eric    Eric    bug-fix 檢核憑證有效性失敗處理異常.
1091127 1090786		Eric	Eric	新增log以追查公文傳送/關閉後待辦清單頁未拉出問題.
1091217 信保序95    Eric    Eric    User異動核決狀態後, 套件未立即異動ODWMSG.APP_xxx對應欄位, 造成後續再次異動核決狀態時, 傳送選項未正確更新問題修正
1100708	1100648		Raymond	Raymond	配合啟用分文稿記錄簽核意見功能時, 禁止修改全文唯一的簽核意見(實際是合併了多稿的簽核意見)欄位
1100914 1101143		Raymond	Raymond	新增傳送呼叫theAOL.getCurrFolio().save()時傳入extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作, 以避免發生退文失敗, 又按儲存, 只有文稿管理檔不存在Server上文號-00-99的問題
1101116	1101147		David	David	調整客委會核判區分檢核，新增系統參數設定要進行應核決未核決檢核的異動別名稱
1110119	1101462		David	David	預排流程設定作業支援會辦單位使用模式，新增傳入參數
1110316	1101388		David	David	紙本簽核依參數判斷開啟的預排流程作業
1110624	1110629		Leslie	Leslie	新增可依客製化設定(Custom_機關)，設定金鑰對話框的文字
1110629	1110629		Leslie	Leslie	考試院UI/UX需求，修改傳送選單
1111011	1110865		Leslie	Leslie	配合新增的簽閱附件，新增配套邏輯
1111118	1111286		Leslie	Leslie	針對考試院環境，強制觸發儲存前檢核「預設發文方式」
1111222	-------		David	David	銓敘部序304(彙整表序61)，新增任審案需檢核任審身份證字號不可為空
1120313	-------		Leslie	Leslie	銓敘部彙整表 序124，繕校退回時未輸入退回原因需檢核及提示
1120919	1120757		Leslie	Leslie	修正來文簽辦公文，未正確初始化異動別選單問題
1120920 1120750     Eric    Eric    組改公文封裝檔機關代碼處理
1121228	-------		Leslie	Leslie	[線上彙整表序152]	修正行動平台模式的核決選項異常
1130130	1120330		Leslie	Leslie	修正當要傳送至一層決行，而預排流程中仍有未完成的會辦流程時，則強制送會辦或中斷傳送(依有無可用異動別)
1130226	1120589		Leslie	Leslie	[中榮][1040146]新增初次使用憑證加簽時，可依設定自動執行憑證鏈結
1130408	序64		Leslie	Leslie	[中榮][問題彙整序64]一層決行單位的傳送，不再檢核有無會辦單位，且僅顯示一次提示訊息
1130503	序99		Leslie	Leslie	[中榮][問題彙整序99]修正因逆向檢核造成的傳送對象錯序
1130730	彙整表序159	Leslie	Leslie	[中榮][彙整表序159]臨時憑證增加PinCode記憶功能
1130806	1130509		Leslie	Leslie	[中榮]配合依設定取消加蓋核示語詞時顯示的發文方式對話框，當啟用時，儲存前一律檢核是否異動發文方式
1130808	序180		Leslie	Leslie	[中榮]啟用背景傳送+自動開啟下一筆公文時，於臨時憑證加簽時，應略過_endMainPageSubmit()以避免找不到公文(實際上為前景傳送)
1130809	序183		Leslie	Leslie	[中榮]彙併辦傳送時，應正確傳入是否支援Hash加簽(HCA憑證，目前不支援Hash加簽)
1130812	1130466		Leslie	Leslie	[北榮]新增支援PC端軟體正式憑證功能
1130820	序183		Leslie	Leslie	[中榮]彙併辦傳送，補上RawData簽署時會用到的演算法函式
1130827	序215		Leslie	Leslie	[中榮]調整模組異常時的處理機制，模組異常時，改回阻擋傳送
1130830	1130531		Leslie	Leslie	[北榮]增修MENUTO_DETAIL選單可依設定增加顯示隸屬單位
1130830	序215		Leslie	Leslie	[中榮]於簽章元件異常時，增加顯示客製化訊息
1130905	序215		Leslie	Leslie	[中榮]調整依客製化設定決定在PinCode前或後，再檢核 SCardModuleInfo 是否合法
1130916	1130864		JOE		Leslie	[北榮]修改預排流程功能鍵UI邏輯，當流程設定為不啟用時，直接將按鍵隱藏
1130919	序215		Leslie	Leslie	[中榮]依會議結論，增加於不更新封裝的傳送行為下，略過簽章元件的模組驗證
1130923	北榮序3		Leslie	Leslie	[北榮]修正設定不為true時的處理
1131016	北榮序303	Leslie	Leslie	[北榮]軟體正式憑證要優先於一般憑證
1131016	北榮序296	Leslie	Leslie	[北榮]紙本簽核公文也不取下一筆(自動開啟下一筆公文，僅針對線上簽核公文)
1131021	標檢序269	Leslie	Leslie	[標檢]修正於序215衍生可能造成全域Deferred()物件錯亂的問題
1131101	1130977		Kevin	Leslie	移除MobiScroll
1131112	領務序369	Leslie	Leslie	補修正缺漏的非同步物件宣告
1131204	1131151		Leslie	Leslie	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題	
1131216	1131050		Leslie	Leslie	系統啟用背景傳送時，若跨平台元件未啟動或異常停止，新增逾時通知目前使用者功能
1140204	驗證序20	Leslie	Leslie	修正彙併辦+臨時憑證傳送的模式判斷
1140318	1140443		Leslie	Leslie	針對背景傳送，調整錯誤訊息處理與停用重置PinCode
1140321	1131289		David	Leslie	增加可傳送給流程有經過的人員
1140508	1140331		Leslie	Leslie	[退輔會]Merge[1111194]依設定決定是否改走工作站模式
1140527	1140321		Raymond	Raymond	修正平板模式在傳送對象子視窗中勾選「核決」後, 直接點「確認傳送」會傳送成「送會簽」的問題
1140609	問題序73	Leslie	Leslie	調整簽核元件異常處置，修正檢核的錯誤訊息，及背景傳送斷鍊問題
1140610	1131183		Leslie	Leslie	[Merge]新增行動自然人憑證模組[1110117、1111006]
1140627	退輔會序46	Leslie	Leslie	追加背景傳送使用行動自然人憑證時，相關邏輯修正
1140724	1140865		David	David	調整紙本分會設定子視窗改開啟EDT227
1140814 1140460     Leslie  Leslie  修正核決對話框於取消時，應恢復"退承辦人"功能鍵的預設值
1140923	1140848		David	Leslie	開啟可核決公文時先記錄預排流程的傳送對象，供取消核決時設定之用
1140924	退輔會序170	Leslie	Leslie	修正複數機關環境，彙併辦子文因重覆文號造成子文未正確加簽的問題
1140925 1140759     David   Leslie  北榮新增傳送前檢核，僅簽核會核單時不允許陳核至一層決行
1141027 1140845     Leslie  Leslie  新增密碼欄位顯示功能
1141030 1140855 	Leslie	Leslie	新增北榮稿件決行層次的傳送前檢核
1141204	彙整表序422	Leslie	Leslie	北榮臨時憑證增加PinCode記憶功能
1141205 彙整表序423	Leslie	Leslie	北榮修正公文儲存後重開，取消核決時重抓預排流程
1141208	彙整表序430	Leslie	Leslie	修正判斷null vs undefined的問題
1141217 問題彙序430	Leslie	Leslie	抓不到預排流程時,改用OD_LIBWS.GetENextTarget()取得下一個傳送對象
1141218 1141658     Leslie  Leslie  [北榮]修正背景傳送的signDataDeferred全域物件宣告，並增加背景傳送的提示訊息(未開下一筆公文時才會留在畫面)
1141229 1141507		Leslie	Leslie 增對軟體正式憑證檢核失敗做處置
*/

(function($) {
    if (!window.SSOUtil) {
		window.SSOUtil = {};
	}
    
    function _txDDL_GetRoleTitle_EDoc(option) {
        var display = '';
        if (typeof option.present == 'string' && option.present.length) {
            if (option.present=='role') {
                return '[不指定人員]';
            }
            else if (option.present=='unit') {
                return '[不指定單位]';
            }
        }
        if (option.toOUId.length > sso_const.FIRSTCLASS_UNITNO_LEN) {
            display = option.toOUName + ' - ';
        }
        display += option.toRoleName;
        return display;
    }
    
    function _getOptionTitle(option, signType, chooseLv) {
        if ((typeof (option.title) != 'undefined') && option.title.length) {
            return option.title;
        }
        
        if (signType=='P' && chooseLv>=1 && chooseLv<=3) {
            // 2016.8 - 紙本調整顯示title
            if (option.finalTarget && option.toUserName.length) {
                return option.toUserName;
            }
            
            // 2021.6.11 - 1100747 Eric, bug-fix [醫策會TO_OU='U']
            let _title = '';
            switch(chooseLv) {
            case 1: _title = option.toOUName; break;
            case 2: _title = option.toRoleName; break;
            case 3: _title = option.toUserName; break;
            }

            if (_title.length==0 && option.toOU=='U') {
                _title = option.toOUName;
            }
            return _title;
        }
        //1130830	Leslie[1130531]	[北榮]增修MENUTO_DETAIL選單可依設定增加顯示隸屬單位
		if ((typeof (option.display) != 'undefined') && option.display.length) {
			return option.display;
		}else
        if ((typeof (option.toUserId) != 'undefined') && option.toUserId.length) {
            return option.toUserName;
        }
        else if ((typeof (option.toRoleId) != 'undefined') && option.toRoleId.length) {
            if (signType=='P') {
                return option.toRoleName;
            }
            else if (signType=='E') {
                return _txDDL_GetRoleTitle_EDoc(option);
            }
            else {
                return '--OOOOPS--';
            }
        }
        else if ((typeof (option.toOUId) != 'undefined') && option.toOUId.length) {
            if (typeof option.present=='string' && option.present.length) {
                if (option.present=='unit')
                    return '[不指定單位]';
            }
            return option.toOUName;
        }
    }
    
    var _selecting = false;
    
    /* 異動別或上層傳送對象選項異動後, 改變下層傳送對象選項 DDL1/DDL2/DDL3 */
    function _changeSelectContent(signType, selectList, options, targetIndexs) {
        "use strict";
        
        function _getChooseLevel(elemId) {
            switch(elemId) {
            case 'chooseB': case 'tdlg_chooseB': return 1;
            case 'chooseC': case 'tdlg_chooseC': return 2;
            case 'chooseD': case 'tdlg_chooseD': return 3;
            }
            return -1;
        }
        
        var useTargetIndexs = false;
        if ((typeof targetIndexs !== 'undefined') && !!targetIndexs) {
            if (selectList.length<targetIndexs.length) {
                return null;
            }
            useTargetIndexs = true;
        }
    
        var i=0, processNext=false;
        var $choose=null, option=null, selectOption=null;
        var $newOptions=null, sOption='', $newOption=null, $targetOption=null;
        var theOptions = options;
        var lv = 0, elemId=''; // 紙本公文依lv設定決定title
        for(i=0; i<selectList.length; i++) {
            $choose = selectList[i];
            elemId = $choose.attr('id');
            lv = _getChooseLevel(elemId);
            if (!!$choose && $choose.length)
            {
                $choose.closest('.ui-select').show();
                for(j=0; j<theOptions.length; j++) {
                    option = theOptions[j];
                    if (typeof option=='undefined' || option===null) continue;
                
                    // 2021.10 - 1100991 Eric, add htmlEncode
                    // data-idx, data-next, data-txname
                    sOption = '<option value="' + theSSO.Util.htmlEncode(j.toString()) + '" data-next="' + theSSO.Util.htmlEncode(option.toOU) + '" >' + 
                              theSSO.Util.htmlEncode(_getOptionTitle(option, signType, lv)) + '</option>';
                    $newOption = $(sOption);
                
                    $newOption.appendTo($choose);
                }
                
                $newOptions = $choose.find('option');
                if (useTargetIndexs && (targetIndexs.length>i) && $newOptions.length) {
                    $targetOption = $($newOptions[targetIndexs[i]]);
                    // 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
                    //$targetOption.attr('selected', 'selected');
                    $targetOption.prop('selected', true);
                    selectOption = theOptions[targetIndexs[i]];
                }
                else if ($newOptions.length) {
                    $targetOption = $($newOptions[0]);
                    // 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
                    //$targetOption.attr('selected', 'selected');
                    $targetOption.prop('selected', true);
                    selectOption = theOptions[0];
                }
                $choose.selectmenu('refresh'); 
            
                processNext = false; theOptions = null;
                if (!!selectOption.options && selectOption.options.length) {
                    theOptions = selectOption.options;
                    processNext = true;
                } 
            }
            
            if (!processNext || theOptions===null) {
                break;
            }
        }
        return selectOption;
    }
    
    function _updateDocTransTarget(transTarget, ruleOption, _docObj) {
        if (!!transTarget && typeof transTarget.txName == 'undefined') {
            theAOL.nextTarget.TxName = ((typeof transTarget.TxName!=='undefined') &&  transTarget.TxName) ? transTarget.TxName : '';
            theAOL.nextTarget.OUId = ((typeof transTarget.OUId!=='undefined') &&  transTarget.OUId) ? transTarget.OUId : '';
            theAOL.nextTarget.RoleId = ((typeof transTarget.RoleId!=='undefined') &&  transTarget.RoleId) ? transTarget.RoleId : '';
            theAOL.nextTarget.UserId = ((typeof transTarget.UserId!=='undefined') &&  transTarget.UserId) ? transTarget.UserId : '';
            theAOL.nextTarget.OUName = ((typeof transTarget.Unit!=='undefined') &&  transTarget.Unit) ? transTarget.Unit : '';
            theAOL.nextTarget.RoleName = ((typeof transTarget.RoleName!=='undefined') &&  transTarget.RoleName) ? transTarget.RoleName : '';
            theAOL.nextTarget.UserName = ((typeof transTarget.UserName!=='undefined') &&  transTarget.UserName) ? transTarget.UserName : '';
        }
        else {
            theAOL.nextTarget.TxName = ((typeof transTarget.txName!=='undefined') &&  transTarget.txName) ? transTarget.txName : '';
            theAOL.nextTarget.OUId = ((typeof transTarget.toOUId!=='undefined') &&  transTarget.toOUId) ? transTarget.toOUId : '';
            theAOL.nextTarget.RoleId = ((typeof transTarget.toRoleId!=='undefined') &&  transTarget.toRoleId) ? transTarget.toRoleId : '';
            theAOL.nextTarget.UserId = ((typeof transTarget.toUserId!=='undefined') &&  transTarget.toUserId) ? transTarget.toUserId : '';
            theAOL.nextTarget.OUName = ((typeof transTarget.toOUName!=='undefined') &&  transTarget.toOUName) ? transTarget.toOUName : '';
            theAOL.nextTarget.RoleName = ((typeof transTarget.toRoleName!=='undefined') &&  transTarget.toRoleName) ? transTarget.toRoleName : '';
            theAOL.nextTarget.UserName = ((typeof transTarget.toUserName!=='undefined') &&  transTarget.toUserName) ? transTarget.toUserName : '';
        }
        theAOL.nextTarget.ruleOption = ruleOption;
        
        theAOL.nextTarget.approved = (_docObj.get('ODWMSG', 'APP_USER_ID').length || _docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
        theAOL.nextTarget.rejected = false;
        if (!theAOL.nextTarget.approved) {
            theAOL.nextTarget.rejected = _docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
        }
        
        if (typeof _docObj !== 'undefined') {
            _docObj.txName = theAOL.nextTarget.TxName;
            _docObj.toOUId = (!!theAOL.nextTarget.OUId) ? theAOL.nextTarget.OUId : '';
            _docObj.toRoleId = (!!theAOL.nextTarget.RoleId) ? theAOL.nextTarget.RoleId : '';
            _docObj.toUserId = (!!theAOL.nextTarget.UserId) ? theAOL.nextTarget.UserId : '';
            _docObj.toOUName = (!!theAOL.nextTarget.OUName) ? theAOL.nextTarget.OUName : '';
            _docObj.toRoleName = (!!theAOL.nextTarget.RoleName) ? theAOL.nextTarget.RoleName : '';
            _docObj.toUserName = (!!theAOL.nextTarget.UserName) ? theAOL.nextTarget.UserName : ''; // 2016.9.17 - bug-fix, theAOL.nextTarget.UserName[e] -> theAOL.nextTarget.UserName
        }
		
		//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
		var sTransTarget = '';
        if (typeof theAOL.nextTarget.UserName === 'string') {
            sTransTarget = theAOL.nextTarget.TxName + "：" + theAOL.nextTarget.OUName + ' ' + theAOL.nextTarget.UserName;
            if (theAOL.nextTarget.RoleName.length) {
                sTransTarget += ' (' + theAOL.nextTarget.RoleName + ')';
            }
        }
        else if (typeof theAOL.nextTarget.RoleName === 'string') {
            sTransTarget = theAOL.nextTarget.TxName + "：" + theAOL.nextTarget.OUName + ' ' + theAOL.nextTarget.RoleName;
        }
        else if (typeof theAOL.nextTarget.OUName === 'string') {
            sTransTarget = theAOL.nextTarget.TxName + "：" + theAOL.nextTarget.OUName;
        }
        else {
            sTransTarget = theAOL.nextTarget.TxName;
        }		
        $('#transTargetDisplay span').text(sTransTarget);
		
		$('#pcSubmit ,#pcUtil').removeClass('hideIcon');
		let leftLimit = $('#tcControl1').offset().left + $('#tcControl1').width();
		let txLeft = ($('#pcTxList').offset().left | $('#pcTxEasy').offset().left) - 48;
		if(txLeft < leftLimit && txLeft > 0)	//壓到左邊選單
			$('#pcSubmit ,#pcUtil').addClass('hideIcon');
		else
			$('#pcSubmit ,#pcUtil').removeClass('hideIcon');
		//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單	==END==
    }
    
    // 2017.4.21 - 1060272 select#chooseX 避免選到傳送子視窗
	//1110916	Leslie	修改觸發流程，於確定完成onChange後，才觸發傳送
    // $(document).on('change', '#aol #transPanel select#chooseA', function(event) {
    $(document).on('change', '#aol #transPanel select#chooseA', function(event, callback) {
    //$('select#chooseA').on('change', function(event) {
        _selecting = true;
		
		var _nextOptions = theAOL.docObj.nextOptions;
        if (_nextOptions===null) return;
        
        // 2016.11.24 - [紙本簽核公文]若任一異動項目SpecialCheck有'F'項目, 在切換完成後須叫用fnDllTxNameExChange()
        var callDllTxNamExchange = false;
        var i=0, theOption=null;
        if (theAOL.docObj.signType=='P') {
            for(i=0; i<_nextOptions.length; i++) {
                theOption = _nextOptions[i];
                if (!!theOption) {
                    if (typeof theOption.ruleOption=='object' && theOption.ruleOption.specialCheck.indexOf('F')!==-1) {
                        callDllTxNamExchange = true;
                        break;
                    }
                }
            }
        }
        
        var signType = theAOL.docObj.signType;
        
        // 顯示select 選單
        var $chooseA = $('#aol #transPanel select#chooseA');
        var $chooseB = $('#aol #transPanel select#chooseB');
        var $chooseC = $('#aol #transPanel select#chooseC');
        var $chooseD = $('#aol #transPanel select#chooseD');
        var processNext = false;
        var subOptions = null;
        var selectedIndex = -1;
        var $targetOption, targetOption;
        
        //var value = '';
        if ($chooseA.length) {
            $chooseB.closest('.ui-select').hide();
            $chooseC.closest('.ui-select').hide();
            $chooseD.closest('.ui-select').hide();
            $chooseB.html(''); $chooseC.html(''); $chooseD.html('');
            
            /* 2016.12.12 - Eric Peng, 若TxSel採native menu, 則強制顯示<select>控制項!
             * FDA部份client在jQM處理完後, <select>會被設成display:none. (偶發, 原因尚未查明!)
            */
            if ($chooseA.attr('data-native-menu')=='true') {
                $chooseA.show(); $chooseB.show();
                $chooseC.show(); $chooseD.show();
            }
            
            //value = this.options[event.target.selectedIndex].text;
            $targetOption = $(this.options[event.target.selectedIndex]);  //$('select#chooseA').find('option[value="'+ value +'"]');
            if ($targetOption.length===0) {
                _selecting = false;
				
				//1110916	Leslie	修改觸發流程，於確定完成onChange後，才觸發傳送
				if(typeof callback == "function")
					callback();
                return;
            }
            
            selectedIndex = parseInt($targetOption.attr('value'));
            if (selectedIndex>=0) {
                targetOption = _nextOptions[selectedIndex];
                if (!!targetOption.options && targetOption.options.length) {
                    subOptions = targetOption.options;
                    processNext = true;
                }
            }
        }
        
        if (targetOption.txName!=='分會') {
            $('#aol #btnCoworkProcSetting').hide();
        }
        
        var txName = '', ruleOption = null;
        if (processNext===false) {
            _updateDocTransTarget(targetOption, targetOption.ruleOption, theAOL.docObj);
            fnODC011ChangeRemark(); // 2016.10.6 - 異動別改變後叫用此函式! (系統部要求)
            if (!!callDllTxNamExchange) { // 2016.11.24
                fnDllTxNameExChange();
            }
            
            // 2016.9.9 - 顯示分會設定button
            if (targetOption.txName=='分會' && theAOL.docObj.signType=='P') { // 2016.9.26, 紙本公文才顯示!
                $('#aol #btnCoworkProcSetting').show();
            }
            
            _selecting = false;
			
			//1110916	Leslie	修改觸發流程，於確定完成onChange後，才觸發傳送
			if(typeof callback == "function")
				callback();
			
            return;
        }
        else {
            txName = targetOption.txName;
            ruleOption = targetOption.ruleOption;
        }
        
        //var $chooseB = $('#aol #transPanel select#chooseB'), $chooseC = $('#aol #transPanel select#chooseC'), $chooseD = $('#aol #transPanel select#chooseD');
        targetOption = _changeSelectContent(signType, [$chooseB,  $chooseC,  $chooseD], subOptions, null);
        if (!!targetOption) {
            _updateDocTransTarget($.extend({'txName':txName}, targetOption), ruleOption, theAOL.docObj);
            fnODC011ChangeRemark(); // 2016.10.6 - 異動別改變後叫用此函式! (系統部要求)
            
            if (!!callDllTxNamExchange) { // 2016.11.24
                fnDllTxNameExChange();
            }
        }
        
         _selecting = false;
		 
		 //1110916	Leslie	修改觸發流程，於確定完成onChange後，才觸發傳送
		if(typeof callback == "function")
			callback();
    });
    
    $(document).on('change', '#aol #transPanel select#chooseB', function (event) {
        if (_selecting) return;
        _selecting = true;
        
        function _getMaxLevel(nextOptions) {
            function _getLevel(target, idx) {
                var i=0, j=0, k=0;
                var optLv1, optLv2, optLv3;
                var maxLv = 1;
                var arrIdx = [idx];
                var arrIdxErr=null;
                
                // TX_NAME有子項目DDL1 => Lv2
                if (!!target.options && target.options.length) {
                    if (maxLv<2) {
                        maxLv = 2;
                        arrIdx = [idx, 0];
                    }
                }
                
                for(i=0; i<target.options.length; i++) {
                    optLv1 = target.options[i];
                    if (!!optLv1.options && optLv1.options.length) {
                        if (maxLv<3) {
                            maxLv = 3;
                            arrIdx = [idx, i, 0];
                        }
                        for(j=0; j<optLv1.options.length; j++) {
                            optLv2 = optLv1.options[j];
                            if (!!optLv2.options && optLv2.options.length) {
                                if (maxLv<4) {
                                    maxLv = 4;
                                    arrIdx = [idx, i, j, 0];
                                }
                                for(k=0; k<optLv2.options.length; k++) {
                                    optLv3 = optLv2.options[k];
                                    if (!!optLv3.options && optLv3.options.length) {
                                        if (!!optLv3.options && optLv3.options.length) {
                                            arrIdxErr = [idx, i, j, k];
                                            console.log('-W- nextTarget lv4 has sub-options, arrIdx=' + arrIdx.toString());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return arrIdx;
            }
            
            var maxLv = 0, arrIdx, maxIdx;
            var i=0, option;
            for(i=0; i<nextOptions.length; i++) {
                option = nextOptions[i];
                arrIdx = _getLevel(option, i);
                if (arrIdx.length > maxLv) {
                    maxIdx = arrIdx;
                    maxLv = arrIdx.length;
                }
            }
            
            console.log('-I- maxLv=' + maxLv + ', max lenght indexs:' + maxIdx.toString());
        }
        
        var _nextOptions = theAOL.docObj.nextOptions;
        if (_nextOptions===null) return;
        
        var signType = theAOL.docObj.signType;
        
        /*if (_debug) { _getMaxLevel(_nextOptions); } */
        
        
        var $chooseA = $('#aol #transPanel select#chooseA');
        //var $chooseB = $('#aol select#chooseB');
        var $chooseC = $('#aol #transPanel select#chooseC');
        var $chooseD = $('#aol #transPanel select#chooseD');
        
        $chooseC.closest('.ui-select').hide(); $chooseC.html(''); 
        $chooseD.closest('.ui-select').hide(); $chooseD.html('');
        
        // 顯示select 選單
        var processNext = false;
        var subOptions = null;
        var selectedIndexA = -1, selectedIndexB = -1;
        var $targetOption, targetOption;
        
        $targetOption = $chooseA.find('option:selected');
        if (typeof $targetOption=='undefined' || $targetOption.length===0) {
            _selecting = false;
            return;
        }
        
        selectedIndexA = parseInt($targetOption.attr('value'));
        if (selectedIndexA>=0) {
            targetOption = _nextOptions[selectedIndexA];
            if (!!targetOption.options && targetOption.options.length) {
                subOptions = targetOption.options;
            }
        }
        
        var txName = targetOption.txName;
        var ruleOption = targetOption.ruleOption;
         
        $targetOption =  $(this.options[event.target.selectedIndex]); //$chooseB.find('option[value="'+ value +'"]');
        selectedIndexB = event.target.selectedIndex;
        if (selectedIndexB>=0) {
            targetOption = subOptions[selectedIndexB];
            if (!!targetOption.options && targetOption.options.length) {
                subOptions = targetOption.options;
                processNext = true;
            }
        }
        
        if (processNext===false) {
            _updateDocTransTarget($.extend({'txName': txName}, targetOption), ruleOption, theAOL.docObj);
        }
        else {
            targetOption = _changeSelectContent(signType, [$chooseC, $chooseD], subOptions, null);
            _updateDocTransTarget($.extend({'txName': txName}, targetOption), ruleOption, theAOL.docObj);
        }

        _selecting = false;
    });
    
    $(document).on('change', '#aol #transPanel select#chooseC', function(event) {
        if (_selecting) return;
        _selecting = true;
        
        var _nextOptions = theAOL.docObj.nextOptions;
        if (_nextOptions===null) return;
        var signType = theAOL.docObj.signType;
        
        /*if (_debug) { _getMaxLevel(_nextOptions); } */
            
        var $chooseA = $('#aol #transPanel select#chooseA');
        var $chooseB = $('#aol #transPanel select#chooseB');
        //var $chooseC = $('#aol select#chooseC');
        var $chooseD = $('#aol #transPanel select#chooseD');
        
        $chooseD.closest('.ui-select').hide(); $chooseD.html('');
        
        // 顯示select 選單
        var processNext = false;
        var subOptions = null;
        var selectedIndexA = -1, selectedIndexB = -1, selectedIndexC = -1;
        var $targetOption, targetOption;
        
        $targetOption = $chooseA.find('option:selected');
        if (typeof $targetOption=='undefined' || $targetOption.length===0) {
            _selecting = false;
            return;
        }
        
        selectedIndexA = parseInt($targetOption.attr('value'));
        if (selectedIndexA>=0) {
            targetOption = _nextOptions[selectedIndexA];
            if (!!targetOption.options && targetOption.options.length) {
                subOptions = targetOption.options;
            }
        }
        
        var txName = targetOption.txName;
        var ruleOption = targetOption.ruleOption;
        
        $targetOption = $chooseB.find('option:selected');
        if (typeof $targetOption=='undefined' || $targetOption.length===0) {
            _selecting = false;
            return;
        }
        
        selectedIndexB = parseInt($targetOption.attr('value'));
        if (selectedIndexB>=0) {
            targetOption = subOptions[selectedIndexB];
            if (!!targetOption.options && targetOption.options.length) {
                subOptions = targetOption.options;
            }
        }
        
        //$targetOption =  $(this.options[event.target.selectedIndex]); //$chooseB.find('option[value="'+ value +'"]');
        selectedIndexC = event.target.selectedIndex;
        if (selectedIndexC>=0) {
            targetOption = subOptions[selectedIndexC];
            if (!!targetOption.options && targetOption.options.length) {
                subOptions = targetOption.options;
                processNext = true;
            }
        }
        
        if (processNext===false) {
            _updateDocTransTarget($.extend({'txName':txName}, targetOption), ruleOption, theAOL.docObj);
        }
        else {
            targetOption = _changeSelectContent(signType, [$chooseD], subOptions, null);
            _updateDocTransTarget($.extend({'txName':txName}, targetOption), ruleOption, theAOL.docObj);
        }
                
        _selecting = false;
    });
    
    $(document).on('change', '#aol #transPanel select#chooseD', function(event) {
        if (_selecting) return;
        _selecting = true;
        
        var _nextOptions = theAOL.docObj.nextOptions;
        if (_nextOptions===null) return;
                
        var $chooseA = $('#aol #transPanel select#chooseA');
        var $chooseB = $('#aol #transPanel select#chooseB');
        var $chooseC = $('#aol #transPanel select#chooseC');
        
        // 顯示select 選單
        var subOptions = null;
        var selectedIndexA = -1, selectedIndexB = -1, selectedIndexC = -1, selectedIndexD = -1;
        var $targetOption, targetOption;
        
        $targetOption = $chooseA.find('option:selected');
        if (typeof $targetOption=='undefined' || $targetOption.length===0) {
            _selecting = false;
            return;
        }
        
        selectedIndexA = parseInt($targetOption.attr('value'));
        if (selectedIndexA>=0) {
            targetOption = _nextOptions[selectedIndexA];
            if (!!targetOption.options && targetOption.options.length) {
                subOptions = targetOption.options;
            }
        }
        
        var txName = targetOption.txName;
        var ruleOption = targetOption.ruleOption;
        
        $targetOption = $chooseB.find('option:selected');
        if (typeof $targetOption=='undefined' || $targetOption.length===0) {
            _selecting = false;
            return;
        }
        
        selectedIndexB = parseInt($targetOption.attr('value'));
        if (selectedIndexB>=0) {
            targetOption = subOptions[selectedIndexB];
            if (!!targetOption.options && targetOption.options.length) {
                subOptions = targetOption.options;
            }
        }
        
        $targetOption = $chooseC.find('option:selected');
        if (typeof $targetOption=='undefined' || $targetOption.length===0) {
            _selecting = false;
            return;
        }
        
        selectedIndexC = parseInt($targetOption.attr('value'));
        if (selectedIndexC>=0) {
            targetOption = subOptions[selectedIndexC];
            if (!!targetOption.options && targetOption.options.length) {
                subOptions = targetOption.options;
            }
        }
        
        //$targetOption =  $(this.options[event.target.selectedIndex]); //$chooseB.find('option[value="'+ value +'"]');
        selectedIndexD = event.target.selectedIndex;
        if (selectedIndexD>=0) {
            targetOption = subOptions[selectedIndexD];
            if (!!targetOption.options && targetOption.options.length) {
                //subOptions = targetOption.options;
                
                //processNext = true;
                var arrIdx = [selectedIndexA, selectedIndexB, selectedIndexC, selectedIndexD];
                console.log('-W- invalid DDL3 item: has child options! optionIdx=' + arrIdx.toString());
            }
        }
        
        if (!!targetOption) {
            _updateDocTransTarget($.extend({'txName':txName}, targetOption), ruleOption, theAOL.docObj);
        }
        
        _selecting = false;
    });
    
    function _showCoworkProcSettingDlg(_docObj) {
        function _makePDoc_COWWKFItem(orgNo, arrUnit) {
			// {unitNo:ownOUId, unitName:unit.name}
			var txName = '分會';
			var coworkRoleId='OD17';
            var coworkRoleName='登記桌';
			var rootItem = {
                OWN_USER_ID: '',
                OWN_USER_NAME: '',
                OWN_OU_ID: '',
                OWN_OU_NAME: '',
                OWN_ROLE_ID: '',
                OWN_ROLE_NAME: '',
                
                CREATE_BY: '',
                SEND_BY: '',
                SEND_TIME: '',
                ADDBY: '1', // 分會項目: '1'
                RADIO_SELECTED_1: '3', // 分會項目: '3'
                SIGN_F: 'N',
                
                TX_NAME: txName,
			};
			
			
			var orgNode = SSOUtil.getOrgNode(orgNo);
			if (orgNode===null) {
				theLogger.error('ERROR! _makeNewInnerItem() OrgInfo找不到機關資訊[機關代碼=' + orgNo + ']');
				return [];
			}
			
			var listItem = [];
			var i=0, unit=null, sUnitItem='';
            var unitNo='', unitName='';
			
			var $unit_xn=null;
			var rootUnitName = '';
			for(i=0; i<arrUnit.length; i++) {
				sUnitItem = arrUnit[i];
                if (sUnitItem.indexOf(';')!==-1) {
                    unit = sUnitItem.split(';');
                    unitNo = unit[0];
                    if (unit.length>=2) {
                        unitName = unit[1];
                    }
                }
                else {
                    theLogger.error('ERROR! _makePDoc_COWWKFItem() 項目:"' + sUnitItem + '" 格式不符, 略過. [應為:"UnitNo;UnitName"]');
                    continue; // 格式不為 UnitNo;UnitName項目, 不處理
                }
                
				$unit_xn = $(orgNode).find('Unit[UnitCode="' + unitNo + '"]');
				if ($unit_xn.length) {
                    if (rootItem!==null) {
                        if (rootUnitName.length) {
                            rootUnitName += (' ' + unitName);
                        }
                        else {
                            rootUnitName = unitName;
                        }
                    }
                    
                    listItem.push({
                        OWN_USER_ID: '',
                        OWN_USER_NAME: '',
                        OWN_OU_ID: unitNo,
                        OWN_OU_NAME: unitName,
                        OWN_ROLE_ID: coworkRoleId, // 寫入分辦人員角色
                        OWN_ROLE_NAME: coworkRoleName,
                        
                        CREATE_BY: '',
                        SEND_BY: '',
                        SEND_TIME: '',
                        ADDBY: (rootItem===null) ? '0' : '1', // 順會:'0', 分會項目: '1'
                        RADIO_SELECTED_1: (rootItem===null) ? '1' : '3', // 順會:'1', 分會項目: '3'
                        SIGN_F: 'N',
                        
                        TX_NAME: txName,
                    });
				}
			}
			
			if (typeof rootItem=='object' && rootItem!==null && listItem.length>1) {
				rootItem.OWN_OU_NAME = rootUnitName;
				rootItem.COWORK_OPTIONS = listItem;
				return rootItem;
			}
			else {
				return null;
			}
		}
        
        function _getCoworkFlowInfo(_wwkf) {
            if (SSOUtil.typeOf(_wwkf)!=='array') {
                return {srcItem:null, idx:-1, arrUnit: []};
            }
            
            var i=0, j=0, item=null, option=null;
            for(i=0; i<_wwkf.length; i++) {
                item = _wwkf[i];
                if (item===null) continue;
                if (item.SIGN_F=='Y') continue;
                
                if (item.TX_NAME=='分會') {
                    var _arrUnit = [];
                    for(j=0; j<item.COWORK_OPTIONS.length; j++) {
                        option = item.COWORK_OPTIONS[j];
                        if (option===null) continue;
                        if (typeof option.OWN_OU_ID == 'string' && option.OWN_OU_ID.length &&
                            typeof option.OWN_OU_NAME == 'string' && option.OWN_OU_NAME.length) {
                            _arrUnit.push(option.OWN_OU_ID); // + ';' + option.OWN_OU_NAME);
                        }
                    }
                    return {srcItem:item, idx:i, arrUnit:_arrUnit};   
                }
            }
            return {srcItem:null, idx:-1, arrUnit:[]};
        }
        
        function _getMSCoworkPageUrl(_docObj, _orgCOFlowInfo) {
			//1140724 David 1140865 調整紙本分會設定子視窗改開啟EDT227
            //var pageUrl = 'MS-Cowork_' + _docObj.sourceOrgNo + '.htm';
			var pageUrl = '../../ED/ED2/EDT227.aspx';
            var txName = escape(encodeURIComponent('分會'));
            var sDeptShowMode = theSSO.User.EnvSettings.get('DeptShowMode');
            if (typeof sDeptShowMode!=='string') {
                sDeptShowMode = '';
            }
            
			//1140724 David 1140865 調整紙本分會設定子視窗模式
            //var urlWithParam = pageUrl + '?Mode=2&TX_NAME=' + txName + '&DEPT_NO=' + _docObj.ICOUId +
            //    '&SAMLart=' + localStorage.Artifact + '&DeptShowMode=' + sDeptShowMode;
			var urlWithParam = pageUrl + '?DEPT_NO=' + _docObj.ICOUId + '&DeptShowMode=' + sDeptShowMode;
            
            // {srcItem:null, idx:-1, arrUnit: []};
            if (_orgCOFlowInfo.arrUnit.length) {
                var i=0; strUnit='';
                for(i=0; i<_orgCOFlowInfo.arrUnit.length; i++) {
                    if (i<(_orgCOFlowInfo.arrUnit.length-1)) {
                        strUnit += (_orgCOFlowInfo.arrUnit[i] + '|');
                    }
                    else {
                        strUnit += _orgCOFlowInfo.arrUnit[i];
                    }
                }
                if (strUnit.length) {
                    urlWithParam += ('&OuList=' + strUnit);
                }
            }
            return urlWithParam;
        }
        
        function _onOKClick() {
            var sCoUnits = localStorage.MsCoworkRtn;
            
            if (typeof sCoUnits!=='string' || sCoUnits.length===0) {
                _dfdProcWWKF.reject({success:false, 'doUpdateProcess':false, errMsg:'DoubleTrigger, cancel action...'});
                $('#PDoc_CoWWKFDialog').popup('close');
            return;
        }
        
            localStorage.MsCoworkRtn = '';
            var rslt = {success:true, 'doUpdateProcess':true, 'coUnits':sCoUnits};
            
            var coUnits = [];
            if (typeof sCoUnits=='string' && sCoUnits.length) {
                if (sCoUnits.indexOf('|')==-1) {
                    coUnits.push(sCoUnits);
                }
                else {
                    coUnits = sCoUnits.split('|');
                }
            }
            
            if (coUnits.length) {
                var newItem = _makePDoc_COWWKFItem(_docObj.sourceOrgNo, coUnits);
                if (orgCOFlowInfo.srcItem!==null && orgCOFlowInfo.idx>=0 && orgCOFlowInfo.idx<wwkf.length) {
                    _docObj.replaceAsynCOWWKItem(newItem, orgCOFlowInfo.idx);
                }
                else {
                    _docObj.insertWWKFItemTail(newItem);
                }
            }
            
            _dfdProcWWKF.resolve(rslt);
            $('#PDoc_CoWWKFDialog').popup('close');
        }
        
        function _onCancelClick(){
            _dfdProcWWKF.resolve({success:true, doUpdateProcess:false});
            $('#PDoc_CoWWKFDialog').popup('close');
        }
        
        var signType = _docObj.signType;
        if (signType!=='P') {
            theLogger.log('-I- #btnCoworkProcSetting clicked, 非紙本公文取消後續作業.');
            return;
        }
        
        var $theDlg = $('#PDoc_CoWWKFDialog');
        var _dfdProcWWKF = $.Deferred();
        var orgCOFlowInfo=null;
        
        $(document).on('popupafteropen', '#PDoc_CoWWKFDialog', function(event, ui) {
            
        });
        
        // 結束後清除 selectmenu object
        $(document).on('popupafterclose', '#PDoc_CoWWKFDialog', function(event, ui) {
            //setTimeout(function() {$theDlg.popup('destroy');}, 200);
             $('#PDoc_CoWWKFDialog #btn_PDocCoWWKFCancel').unbind('click', _onCancelClick);
             $('#PDoc_CoWWKFDialog #btn_PDocCoWWKFDOK').unbind('click', _onOKClick);
        });
        
        $('#PDoc_CoWWKFDialog #btn_PDocCoWWKFCancel').on('click', _onCancelClick);
        
        //$('#PDoc_CoWWKFDialog-popup #PDoc_CoWWKFDialog #btn_PDocCoWWKFDOK').on('click', function() {
        $('#PDoc_CoWWKFDialog #btn_PDocCoWWKFDOK').on('click', _onOKClick);
        
        var wwkf = _docObj.getODWWKF();
        if (wwkf===null) {
            _docObj.initODWWKF();
            wwkf = _docObj.getODWWKF();
            if (wwkf===null) {
                theLogger.log('-I- _updateWWKFCoWorkFlow() 無法取得公文ODWWKF內容.');
                _dfdProcWWKF.reject({success:false, update:false, errMsg: ' 無法取得公文ODWWKF內容.'});
                return _dfdProcWWKF.promise();
            }
        }
        
        orgCOFlowInfo = _getCoworkFlowInfo(wwkf);
                    
        var _options = {corners: false, history: false, positionTo: 'window' }; 
        $theDlg.popup(_options);
        
        var h_w = $('#home').height();
        var h =  Math.floor(h_w * 0.75);
        $theDlg.css('height', h+'px');
        
        var url = _getMSCoworkPageUrl(_docObj, orgCOFlowInfo);
        $theDlg.find('#msCoworkSelectFrame')[0].src=url;
        
        $('#PDoc_CoWWKFDialog').popup('open', _options);
        SSOUtil.loading('hide');
        return _dfdProcWWKF.promise();
    }

    // 2016.9.9 - 分會設定按鈕
    $(document).on('click', '#aol a#btnCoworkProcSetting', function (event) {
        _showCoworkProcSettingDlg(theAOL.docObj);
    });
    
	/* 2015.10 - 依結案類型取預設傳送對象.
	 */
	function _getDefaultTargetForCloseType(closeType, approveUserLevel) {
		var txName='', toOU='', value='', items=null;
        if (closeType<sso_const.APPROVAL_MIN || closeType>sso_const.APPROVAL_MAX) {
			alert('結案類型設定值:\'' + closeType + '\'不正確!');
			return null;
		}
		else {
			if (closeType===sso_const.APPROVAL_PUBLISH_ORG) {
				value = theSSO.User.EnvSettings.get('OD_AOL_TX_FOR_SEND');
			}
			else if (closeType===sso_const.APPROVAL_PUBLISH_UNIT) {
				value = theSSO.User.EnvSettings.get('OD_AOL_TX_FOR_USEND');
			}
			else if (closeType===sso_const.APPROVAL_PERMISSION) {
				value = theSSO.User.EnvSettings.get('OD_AOL_TX_FOR_FILE');
			}
			
			var defaultTarget = null;
			if ((typeof value!=='undefined') && value.length)
			{
				if (value.indexOf(';')!==-1) {
					var settings = value.split(';');
					if (settings.length>1) {
						if (approveUserLevel===1) {
							value = settings[0];
						}
						else {
							value = settings[1];
						}
						
						items = value.split('|');
						if (items.length) {
							txName = items[0];
							if (items.length>=2) {
								toOU = items[1];
							}
						}
						else {
							txName = '';
							toOU = '';
						}
					}
					else {
						txName = '';
						toOU= '';
					}
				}
				else {
					items = value.split('|');
					if (items.length) {
						txName = items[0];
						if (items.length>=2) {
							toOU = items[1];
						}
					}
					else {
						txName = '';
						toOU = '';
					}
				}
				defaultTarget =  {
					TxName : txName,
					ToOU : toOU,
                    OUId : '', RoleId : '', UserId : '',
					OUName : '', RoleName : '', UserName : ''
				};
			}
			return defaultTarget;
		}
	}
	
	/* ODWMSG設定的傳送對象不在清單內=>取第一個為預設項目 */
	function _getFirstItemIndexs(nextOptions) {
		var firstItemIndexs = [];
		var theOption, options;
		if (nextOptions.length) {
			firstItemIndexs.push(0);
			theOption = nextOptions[0];
			options = theOption.options;
				
			while(theOption.finalTarget!==true && options.length) {
				firstItemIndexs.push(0);
				
				theOption = options[0];
				options = theOption.options;	
			}
		}
		return firstItemIndexs;
	}
    
    /* 改變傳送對象顯示內容
     */
    function _changeTransTarget(nextTarget, _docObj, targetIndex, exOptions) {
        function _getCurrentFlow(docObj, SAMLart) {
            var flowBuilder = null;
            if (docObj.signType=='E' && theAOL.flowData.length===0) {
                flowBuilder = new FlowBuilder();
                flowBuilder.setupFlowData(docObj, SAMLart);
            }
        
            // 2015.6.18 - 承辦前封裝檔可能沒有流程內容!
            var currentFlow = null;
            if (docObj.signType=='E' && !!theAOL.flowData && theAOL.flowData.length) {
                currentFlow = _findCurrentFlow(theAOL.flowData);
            }
            
            if (!currentFlow) {
                var rslt = theAOL.docObj.get('ODWMSG', ['FOLDER', 'SUBFOLDER', 'OWN_OU_ID', 'OWN_ROLE_ID', 'OWN_USER_ID']);
                if (!!rslt) {
                    currentFlow = {};
                    currentFlow.Folder = (!!rslt.FOLDER) ? rslt.FOLDER : '';
                    currentFlow.SubFolder = (!!rslt.SUBFOLDER) ? rslt.SUBFOLDER : '';
                    currentFlow.OUId = (!!rslt.OWN_OU_ID) ? rslt.OWN_OU_ID : '';
                    currentFlow.RoleId = (!!rslt.OWN_ROLE_ID) ? rslt.OWN_ROLE_ID : '';
                    currentFlow.UserId = (!!rslt.OWN_USER_ID) ? rslt.OWN_USER_ID : '';
                    if (currentFlow.UserId.length===0) {
                        currentFlow.UserId = theSSO.User.account;
                    }
                }
            }
            return currentFlow;
        }
        
        // update ODWMSG
        if (typeof _docObj == 'undefined')
            _docObj = theAOL.docObj;
        
        var $dlg = null;
        var dlgProc = false;
        if (typeof exOptions=='object' && typeof exOptions.$parentDlg=='object' && exOptions.$parentDlg.length) {
            $dlg = exOptions.$parentDlg;
            dlgProc = true;
        }
        
        var signType = _docObj.signType;
        var nextOptions = _docObj.nextOptions;
        var i=0, menuRule=null;
        var orgNode = null, currentFlow = null, SAMLart='';
        if (typeof nextOptions == 'undefined' || nextOptions===null) {
            orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
            SAMLart = localStorage.Artifact;
            currentFlow = _getCurrentFlow(_docObj, SAMLart);
            if (signType=='E') {
                menuRule = SSOUtil.getMenuRule_Obj(SAMLart, _docObj.sourceOrgNo, signType);
                if (typeof _docObj.nextOptions=='undefined' || _docObj.nextOptions===null) {
                    nextOptions = _buildEDocNextOptions(currentFlow, menuRule, orgNode, _docObj, {mode:'submitTargets'});
                    if (!!nextOptions) {
                        _docObj.nextOptions = nextOptions;
                    }
                }
                else {
                    nextOptions = _docObj.nextOptions;
                }
            }
            else if(signType=='P') {
                if (typeof window._buildPDocNextOptions == 'undefined') {
                    return;
                }
                
                menuRule = SSOUtil.getMenuRule_Obj(SAMLart, _docObj.sourceOrgNo, signType);
                if (typeof _docObj.nextOptions =='undefined' || _docObj.nextOptions===null) {
                    nextOptions = _buildPDocNextOptions(currentFlow, menuRule, orgNode, _docObj);
                    if (!!nextOptions) {
                        _docObj.nextOptions = nextOptions;
                    }
                }
                else {
                    nextOptions = _docObj.nextOptions;
                }
            }
        }
        
        var newTransTarget = null;
        if (!!nextTarget && !!nextOptions && (typeof targetIndex == 'undefined')) {
            targetIndex = WorkFlowUtil.getNextIndexs(nextTarget, nextOptions);
        }
        
        if (targetIndex===null || targetIndex.length===0) {
            targetIndex = _getFirstItemIndexs(nextOptions);
        }
         
        // 直接由MeneRule取傳送對象   
        if (!!targetIndex && !!nextOptions) {
            newTransTarget = WorkFlowUtil.getNewTarget(targetIndex, nextOptions);
			//1140412	Leslie[1131309]	追加紀錄預排流程異動結果，以協助追查
			theLogger.log(`由MeneRule取傳送對象：${JSON.stringify(newTransTarget)}`)
        }
        
        if (newTransTarget!==null) {
            nextTarget.TxName = newTransTarget.TxName;
            nextTarget.OUId = (typeof newTransTarget.OUId == 'string') ? newTransTarget.OUId : '';
            orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
            if (typeof orgNode == 'object' && nextTarget.OUId.length) {
                nextTarget.OUName = SSOUtil.getOrgUnitName(orgNode, nextTarget.OUId);
            }
            
            if (typeof nextTarget.OUName !== 'string') {
                nextTarget.OUName = '';
            }
            
            nextTarget.RoleId = (typeof newTransTarget.RoleId == 'string') ? newTransTarget.RoleId : '';
            nextTarget.RoleName = (typeof newTransTarget.RoleName == 'string') ? newTransTarget.RoleName : '';
            nextTarget.UserId = (typeof newTransTarget.UserId == 'string') ? newTransTarget.UserId : '';
            nextTarget.UserName = (typeof newTransTarget.UserName == 'string') ? newTransTarget.UserName : '';
        }
        
		//1140412	Leslie[1131309]	追加紀錄預排流程異動結果，以協助追查
		theLogger.log(`更新傳送對象：${JSON.stringify(nextTarget)}`)
        
        _docObj.txName = nextTarget.TxName;
        _docObj.toOUId = (!!nextTarget.OUId) ? nextTarget.OUId : '';
        _docObj.toRoleId = (!!nextTarget.RoleId) ? nextTarget.RoleId : '';
        _docObj.toUserId = (!!nextTarget.UserId) ? nextTarget.UserId : '';
        _docObj.toOUName = (!!nextTarget.OUName) ? nextTarget.OUName : '';
        _docObj.toRoleName = (!!nextTarget.RoleName) ? nextTarget.RoleName : '';
        _docObj.toUserName = (!!nextTarget.UserName) ? nextTarget.UserName : '';
        
		//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
		var aolEnableEasyModeFolder = theSSO.User.EnvSettings.get("AOL_ENABLE_EASY_MODE_FOLDER")
		var currFolder = _docObj.ODWMSG.FOLDER+'-'+_docObj.ODWMSG.SUBFOLDER;
		if(aolEnableEasyModeFolder.indexOf(currFolder) > -1 && currFolder != '' && $('#swTranMode').val() == 'on'){
			var wwkf = theAOL.docObj.getODWWKF();
			if (wwkf===null) {
				theAOL.docObj.initODWWKF();
				wwkf = theAOL.docObj.getODWWKF();
				if (wwkf===null) {
					theLogger.log('-I- _updateWWKFCoWorkFlow() 無法取得公文ODWWKF內容.');
				}
			}
			
			if(wwkf !== null){
				nextWWKF = wwkf.find(function(o){ return o.SIGN_F == 'N';})
				//1110719	Leslie	修正若是沒有下一個流程時，直接Pass
				if(nextWWKF != undefined && 'TX_NAME' in nextWWKF && 'OWN_OU_ID' in nextWWKF && 'OWN_ROLE_ID' in nextWWKF)
				//1110729	Leslie	遇到預排流程為順會或後會(傳送到單位的角色，但角色選單為空)時，則視為相符
				if(!((nextWWKF.OWN_ROLE_ID == 'OD16' || nextWWKF.OWN_ROLE_ID == 'OD17') && nextTarget.RoleId == '' && nextTarget.OUId == nextWWKF.OWN_OU_ID))
				//1110810 David 預排流程無指定角色(通常是給單位)，目前流程有指定單位登記桌/分辦人員時，視為相符
				if(!(nextWWKF.OWN_ROLE_ID == '' && (nextTarget.RoleId == 'OD16' || nextTarget.RoleId == 'OD17') && nextTarget.OUId == nextWWKF.OWN_OU_ID))
				if(nextTarget.TxName != nextWWKF.TX_NAME || nextTarget.OUId != nextWWKF.OWN_OU_ID || nextTarget.RoleId != nextWWKF.OWN_ROLE_ID){
					//目前選定的選單流程，與預排流程不符，
					alert('目前傳送對象與預排流程不同');
					$('#swTranMode').val('off').slider('refresh');
					$('#pcTxList').show();
					$('#pcTxEasy').hide();
				}
			}
		}
		
		//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單，內含有"TO_OU=D"(該異動別會退回到承辦人)
		if (nextOptions.some(function(o){return o.next == "D";}) && _docObj.ODWDCM.CANCEL_APP_ENABLE == 'Y'){
			$('#btnSendBack').show();
		}
		//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單	==END==
        
        // update UI
        var sTransTarget = '';
        if (typeof nextTarget.UserName === 'string') {
            sTransTarget = nextTarget.TxName + "：" + nextTarget.OUName + ' ' + nextTarget.UserName;
            if (nextTarget.RoleName.length) {
                sTransTarget += ' (' + nextTarget.RoleName + ')';
            }
        }
        else if (typeof nextTarget.RoleName === 'string') {
            sTransTarget = nextTarget.TxName + "：" + nextTarget.OUName + ' ' + nextTarget.RoleName;
        }
        else if (typeof nextTarget.OUName === 'string') {
            sTransTarget = nextTarget.TxName + "：" + nextTarget.OUName;
        }
        else {
            sTransTarget = nextTarget.TxName;
        }
        
        if (!dlgProc) {
            $('#moTransTargetSetup span').text(sTransTarget);
			
			//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
            $('#transTargetDisplay span').text(sTransTarget);
        }
        
        var updateUI = false;
        if (!dlgProc) {
            //1120919	Leslie[1120757]	修正來文簽辦公文，未正確初始化異動別選單問題
            // updateUI = $('#chooseA-button').is(':visible'); // 2016.10.5 - change from: 'a#chooseA-button' (iOS will be 'div#chooseA-button')
            updateUI = $('#chooseA-button').is(':visible') || $('#btnSendBack').is(':visible'); // 2016.10.5 - change from: 'a#chooseA-button' (iOS will be 'div#chooseA-button')
            
            if (!updateUI && !!nextOptions && !!targetIndex && targetIndex.length) {
                var targetOptionA = nextOptions[targetIndex[0]];
                if (!!targetOptionA) {
                    theAOL.nextTarget.ruleOption = targetOptionA.ruleOption;
                }
            }
        }
        else {
            updateUI = true;
        }
        
        if (!!nextOptions && !!targetIndex && targetIndex.length && updateUI) {
            var $chooseA=null, $chooseB=null, $chooseC=null, $chooseD=null;
            if (dlgProc && typeof $dlg=='object' && $dlg.length) {
                $chooseA = $dlg.find('select#tdlg_chooseA'); $chooseB = $dlg.find('select#tdlg_chooseB');
                $chooseC = $dlg.find('select#tdlg_chooseC'); $chooseD = $dlg.find('select#tdlg_chooseD');
            }
            else {
                // 2017.4.21 - 1060272 select#chooseX 避免選到傳送子視窗
                $chooseA = $('#aol #transPanel select#chooseA'); $chooseB = $('#aol #transPanel select#chooseB');
                $chooseC = $('#aol #transPanel select#chooseC'); $chooseD = $('#aol #transPanel select#chooseD');
            }
            $chooseA.html('');
            $chooseB.html('').closest('.ui-select').hide();
            $chooseC.html('').closest('.ui-select').hide();
            $chooseD.html('').closest('.ui-select').hide();
            
            // 顯示select 選單
            var processNext = false;
            var subOptions = null;
            var sNewOption, option, $newOption, $options, targetOption;
            var display = '';
            if ($chooseA.length) {
                for(i=0; i<nextOptions.length; i++) {
                    option = nextOptions[i];
                    if (typeof option=='undefined' || option===null) continue;
                   
                    // 2021.6 - 1100748 Eric, TO_OU="V"項目, 直接顯示option.txName
                    // 2016.12.12 - bug-fix
                    // data-idx, data-next, data-txname
                    if (typeof option.ruleOption=='object' && typeof option.ruleOption.display=='string' && option.ruleOption.display.length && option.ruleOption.next!=='V') {
                        display = option.ruleOption.display;
                    }
                    else {
                        display = option.txName;
                    }

                    // 2021.10 - 1100991 Eric, add htmlEncode
                    sNewOption = '<option value="' + theSSO.Util.htmlEncode(i.toString()) + '" data-next="' + theSSO.Util.htmlEncode(option.next) + '" data-txname="' + 
                                  theSSO.Util.htmlEncode(option.txName) + '"' + '>' + theSSO.Util.htmlEncode(display) + '</option>';
                    $newOption = $(sNewOption);
                    $newOption.appendTo($chooseA);
                }
                
                $options = $chooseA.find('option');
                if (!!targetIndex && targetIndex.length) {
                    // 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
                    //$($options[targetIndex[0]]).attr('selected', 'selected');
                    $($options[targetIndex[0]]).prop('selected', true);
                    targetOption = nextOptions[targetIndex[0]];
                }
                else {
                    // 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
                    //$($options[0]).attr('selected', 'selected');
                    $($options[0]).prop('selected', true);
                    targetOption = nextOptions[0];
                }
                $chooseA.selectmenu('refresh');
                
                if (!dlgProc && !!targetOption) {
                    theAOL.nextTarget.ruleOption = targetOption.ruleOption;
                }
                else if(dlgProc && exOptions.nextTarget) {
                    exOptions.nextTarget.ruleOption = targetOption.ruleOption;
                }
               
                if (targetOption.options.length) {
                    subOptions = targetOption.options;
                    processNext = true;
                }
            }
            
            if (processNext===false) {
                return;
            }

            var subIndexs = targetIndex.slice(1);
            _changeSelectContent(signType, [$chooseB,  $chooseC,  $chooseD], subOptions, subIndexs);
        }
    }
    
    /* 公文基資頁面設定異動時, 叫用此函式以同步變更傳送選項!
     * aolDocObj: aol開啟公文的docObj(theAOL.docObj)
     * nextTarget: 設定傳送對象, 內部欄位: { TxName, TxName, OUId, OUName, RoleId, RoleName, UserId, UserName}, 可不設定, 給null
     * odwmsg/odwdcm: 最新公文基資內容. 格式比照docObj.ODWMSG, docObj.ODWDCM
     */
    function _updatePDocTransTargetFromDI(aolDocObj, nextTarget, odwmsg, odwdcm) {
        var _docObj = theSSO.MP.todolist.builder.docFromODWMSGObj(aolDocObj.isDraft, odwmsg, odwdcm);
        if (!!_docObj) {
            var approvedOld = false;
            if (!!theAOL.nextTarget) {
                approvedOld = theAOL.nextTarget.approved;
            }
            else {
                approvedOld = (theAOL.docObj.get('ODWMSG', 'APP_USER_ID').length || _docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
            }
            
			var rejectedOld = false;
            if (!approvedOld) {
                if (!!theAOL.nextTarget) {
                    rejectedOld = theAOL.nextTarget.rejected;
                }
                else {
                    rejectedOld = theAOL.docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
                }
            }
            
            var approvedNew = (odwmsg.APP_USER_ID.length  || odwmsg.APP_ROLE_ID.length) ? true : false;
			var rejectedNew = odwmsg.REJECT_USER_NAME.length ? true : false;
            var targetChanged = false;
            
			//1060821 David 1060783 取得目前DocState跟傳入的DocState
			var OldDocState = theAOL.docObj.get('ODWMSG', 'DOC_STATE');
			var NewDocState = odwmsg.DOC_STATE;

            var orgNextTarget = $.extend({}, nextTarget); // for target match process!
			//1060821 David 1060783 新增判斷當DOC_STATE異動時重組異動別選單
            //if (approvedOld!==approvedNew || rejectedOld!==rejectedNew) {
			if (approvedOld!==approvedNew || rejectedOld!==rejectedNew || OldDocState !== NewDocState) {
                _updateTransTarget_PDoc(approvedNew, rejectedNew, _docObj, nextTarget);
                targetChanged = true;
            }
            else {
                if (!!nextTarget) {
                    _docObj.nextOptions = aolDocObj.nextOptions.slice(); // 直接複製現在傳送選項
                    _changeTransTarget(nextTarget, _docObj);
                    targetChanged = true;
                }
                else {
                    theLogger.warn('-W- _updatePDocTransTargetFromDI() 公文核決未異動, 且未設定傳送對象, 不處理...');
                }
            }
            
            if (targetChanged) {
                var rslt = null;
                if (typeof nextTarget!=='undefined' && nextTarget!==null) {
                    rslt = WorkFlowUtil.getNextIndexs(orgNextTarget, theAOL.docObj.nextOptions, true);
                    // rslt: { match_level:0, indexs: [i], match_all: true/false } 0:txName, 1: ouId, 2: roleId, 3: userId
                    
                    // 2016.8.21 - 立即異動theAOL.nextTarget
                    theAOL.nextTarget = nextTarget;
                }
                    
                // 2016.8.21 - 立即異動theAOL.docObj內的txName及toXXX相關欄位設定值!
                aolDocObj.txName = theAOL.nextTarget.TxName;
                aolDocObj.toOUId = (!!theAOL.nextTarget.OUId) ? theAOL.nextTarget.OUId : '';
                aolDocObj.toRoleId = (!!theAOL.nextTarget.RoleId) ? theAOL.nextTarget.RoleId : '';
                aolDocObj.toUserId = (!!theAOL.nextTarget.UserId) ? theAOL.nextTarget.UserId : '';
                aolDocObj.toOUName = (!!theAOL.nextTarget.OUName) ? theAOL.nextTarget.OUName : '';
                aolDocObj.toRoleName = (!!theAOL.nextTarget.RoleName) ? theAOL.nextTarget.RoleName : '';
                aolDocObj.toUserName = (!!theAOL.nextTarget.UserName) ? theAOL.nextTarget.UserName : '';
            
                // 2020.12.17 - 信保序95 Eric, user異動核決狀態時後, 套件未立即異動ODWMSG.APP_xxx對應欄位, 
                //  造成後續再次異動核決狀態時, 傳送選項未正確更新問題修正
                if (approvedOld!==approvedNew) {
                    if (approvedNew) {
                        aolDocObj.set2('aol', 'ODWMSG', {APP_USER_ID: _docObj.appUserId});
                        aolDocObj.set2('aol', 'ODWMSG', {APP_USER_NAME: _docObj.appUserName});
                        aolDocObj.set2('aol', 'ODWMSG', {APP_ROLE_ID: _docObj.appRoleId});
                    }
                    else {
                        aolDocObj.set2('aol', 'ODWMSG', {APP_USER_ID:''});
                        aolDocObj.set2('aol', 'ODWMSG', {APP_USER_NAME:''});
                        aolDocObj.set2('aol', 'ODWMSG', {APP_ROLE_ID: ''});
                    }
                }

                if (typeof rslt =='object') {
                    return rslt;
                }
            }
        }
    }
    
    /* 由公文基資取得次簽核人員資訊(TX_NAME, TO_OU_ID/NAME, TO_ROLE_ID/NAME, TO_USER_ID/NAME)
     */
    function _getCurrentTransTarget(target, _docObj) {
        if (typeof _docObj == 'undefined' || _docObj===null) {
            _docObj = theAOL.docObj;
        }
        target.TxName	= _docObj.txName;
        target.OUId		= _docObj.toOUId;
        target.RoleId	= _docObj.toRoleId;
        target.UserId	= _docObj.toUserId;
        target.OUName	= _docObj.toOUName;
        target.RoleName	= _docObj.toRoleName;
        target.UserName	= _docObj.toUserName;
        return true;
    }
    
    function _findCurrentFlow(flowData) {
        var idx = 0;
        for (idx=0; idx<flowData.length; idx++) {
            var flowItem = flowData[idx];
            if (flowItem.Status=='2') {
                return flowItem;
            }
        }
        return null;
    }
    
    function _updateSignerComment(sSignerComment) {
        var currentFlow = _findCurrentFlow(theAOL.flowData);
        if (!!currentFlow) {
            currentFlow.Comment = sSignerComment;
			// 1100708 Raymond 1100648 啟用分文稿記錄簽核意見功能時, 不能用signComment存回全文唯一的簽核意見
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y")
            theAOL.signComment(sSignerComment);
        }
    }

    /* 2021.7 - 1100433 Eric, merge: 2017.9.7 - 1060389, 紙本公文核決, 取一層決行單位核決人員 */
    function _getPDocAppUserInfo(orgNode, unitNo) {
        var officerRoleList = sso_const.APPORVAL_OFFICER;

        if (typeof orgNode!='object' || orgNode===null) return null;
        if (typeof unitNo!='string' || unitNo.length===0) return null;

        var unitPath = 'Unit[UnitCode="' + unitNo + '"]';
        var occupantPath = 'RoleOccupant';

        var $unitNode = $(orgNode).find(unitPath);

        var userInfo = null;
        var $roleOccupants=null, occupantNode=null;
        var rolePath = '', unitName='', roleNo='', roleName='', userId='', userName='';
        var isProxy = false, _excludeProxy=true;
        if ($unitNode.length) {
            unitNode = $unitNode[0];
            unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
            
            for(var i=0; i<officerRoleList.length; i++) {
                roleNo = officerRoleList[i];
                if (typeof roleNo!='string' || roleNo.length===0) continue;
                rolePath = 'Role[RoleNo="' + roleNo + '"]';
                $roleNode = $(unitNode).find(rolePath);
                if ($roleNode.length) {
                    if (!!($roleNode[0])) {
                        roleName = SSOUtil.xml_getChildNodeValue($roleNode[0], 'RoleName');
                        $roleOccupants = $($roleNode[0]).children(occupantPath);
                        if ($roleOccupants.length) {
                            for(j=0; j<$roleOccupants.length; j++) {
                                occupantNode = $roleOccupants[j];
                                if (occupantNode) {
                                    isProxy = false;
                                    if (_excludeProxy) {
                                        isProxy = SSOUtil.xml_getAttrValue(occupantNode, 'IsProxy');
                                        if (typeof isProxy === 'undefined') {
                                            isProxy = false;
                                        }
                                        if (isProxy) continue;
                                    }
                                    
                                    userName = SSOUtil.xml_getChildNodeValue(occupantNode, 'Name');
                                    userId = SSOUtil.xml_getChildNodeValue(occupantNode, 'Account');
                                    userInfo =  {
                                        OUId: unitNo,
                                        OUName: unitName,
                                        RoleId: roleNo,
                                        RoleName: roleName,
                                        UserId: userId,
                                        UserName: userName
                                    };
                                    return userInfo;
                                }
                            }
                        }
                    }
                }
            }
        }
        return userInfo;
    }
    
    function _updateApproveReject(approved, rejected, docObj, approveDetail) {    
        // 核可/剔退 checkbox controls
        $('#aol #chkApprove').prop('checked', approved).checkboxradio('refresh');	
        $('#aol #chkReject').prop('checked', rejected).checkboxradio('refresh');
        
        $('#aol #moChkApprove').prop('checked', approved).checkboxradio('refresh');	
        $('#aol #moChkReject').prop('checked', rejected).checkboxradio('refresh');
    
        /*
         *@ODWMSG: APP_USER_ID / APP_USER_NAME / APP_ROLE_ID / REJECT_USER_NAME
         *@ODWDCM: CLOSE_TYPE / IS_NOTIFY
        */
        
        var excludeRoleList; // 2016.10.24
        var isProxy = docObj.get('ODWMSG', 'IS_PROXY_DOC'); // 代理公文
        
        var userId='', userName=''; // 2015.5 - add userId

        // 2021.7 - 1100433 Eric, merge: 2017.9.7 - 1060389, 紙本公文核決人員判定
        var appUserInfo = null, roleId='';
        var orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo);

        if (!approved) {
            docObj.set('aol', 'ODWMSG', [
                { fieldname : 'APP_USER_ID', value: '' },
                { fieldname : 'APP_USER_NAME', value: '' },
                { fieldname : 'APP_ROLE_ID', value: '' }
            ]);
        }
        else {
            // 2015.5 - Eric Peng, docObj.ownUserId may be a null string!
            userId = docObj.ownUserId;
            roleId = docObj.ownRoleId; // 2021.7 - 1100433 Eric, merge 1060389 (roleId)

            // 2021.7 - 1100433 Eric, merge: 2017.9.7 - 1060389, 紙本公文若在一層決行單位時, 取該單位最大可核決角色
            var setAsOfficerApprove = false; // 2018.9.3 - 1070880, 紙本代理公文, 若以判定之核決角色為核決者, 不在姓名後面加[代理]字樣.
			//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
            // if (docObj.signType=='P' && (parseInt(docObj.ownOUId)>=window.sso_const.APPROVEUNIT_NUM)) {
            if (docObj.signType=='P' && (docObj.ownOUId>=window.sso_const.APPROVEUNIT_NUM)) {
                appUserInfo = _getPDocAppUserInfo(orgNode, docObj.ownOUId);
                if (appUserInfo!=null && typeof appUserInfo.UserId=='string' && appUserInfo.UserId.length) {
                    userId = appUserInfo.UserId;
                    roleId = appUserInfo.RoleId;
                    setAsOfficerApprove = true;
                }
            }
            if (userId.length===0) {
                userId = theSSO.User.account;
            }
            
            // 2016.10.24 - 代理人核決, 核決人員記錄應為代理人員
            if (!setAsOfficerApprove && typeof isProxy!=='undefined' && isProxy.length && isProxy=='1') {
                userId = theSSO.User.account;
            }

            /* 2016.12.12 - 改由登入人員Profile直接取姓名
             2015.10 - 代理人核決, 姓名後面加'[代理]' */
            // 2021.7 - 1100433 Eric, merge: 2017.9.7 - 1060389 紙本公文可在套件核決
            if (!!appUserInfo) {
                userName = appUserInfo.UserName;
            }
            else {
                userName = theSSO.User.name; //userInfo.UserName;
            }
            
            // 2021.7 - 1100433 Eric, merge: 2018.9.3 - 1070880, 紙本代理公文, 若以判定之核決角色為核決者, 不在姓名後面加[代理]字樣.
            if (!setAsOfficerApprove && SSOUtil.isValueTrue(docObj.get('ODWMSG', 'IS_PROXY_DOC'))) {
                userName += '[代理]';
            }
            
            docObj.set('aol', 'ODWMSG', [
                { fieldname: 'APP_USER_ID', value: userId }, // 2016.12.12 - 取目前userId
                { fieldname: 'APP_ROLE_ID', value: roleId }, // 2021.10.7 - Eric, bug-fix replace: docObj.ownRoleId,
                { fieldname: 'APP_USER_NAME', value: userName }
            ]);
            
            if (docObj.ODWMSG.CLOSE_TYPE==='') {
                var _defaultCloseType = theSSO.User.EnvSettings.get('AOL_DEFAULT_CLOSE_TYPE');
                if (!!_defaultCloseType && _defaultCloseType.Length) {
                    docObj.set('aol', 'ODWMSG', [{fieldname:'CLOSE_TYPE', value: _defaultCloseType}]);
                }
                else {
                    docObj.set('aol', 'ODWMSG', [{fieldname:'CLOSE_TYPE', value: '3'}]); // P2一律設為存查!;
                }
            }
        
            /* @ODWDCM: CLOSE_TYPE / IS_NOTIFY */	
            if (!!approveDetail) {
                docObj.set('aol', 'ODWMSG', [
                    { fieldname:'CLOSE_TYPE', value:approveDetail.closeType }
                ]);
                
                docObj.set('aol', 'ODWDCM', [
                    { fieldname:'CLOSE_TYPE', value:approveDetail.closeType },
                    { fieldname:'IS_NOTIFY', value:approveDetail.sendMail }
                ]);
            }
			
			//1111118	Leslie[1111286]	針對考試院環境，強制觸發儲存前檢核「預設發文方式」
			//1130806	Leslie[1130509]	[中榮]配合依設定取消加蓋核示語詞時顯示的發文方式對話框，當啟用時，儲存前一律檢核是否異動發文方式
			// if(SSO_CONFIG.OrgNickName == 'EXAM')
			if(SSO_CONFIG.OrgNickName == 'EXAM' || SSOUtil.isValueTrue(theSSO.User.EnvSettings.get('AOL_STAMP_APPROVE_ACTION_ONLY')))
				theAOL.getCurrFolio().setDraftListChanged(true);
        }
        
        if (!rejected) {
            docObj.ODWMSG.REJECT_USER_NAME = '';
        }
        else {
            /* 2016.12.12 - 改由登入人員Profile直接取姓名 */
            userName = theSSO.User.name; //userInfo.UserName;
            if (SSOUtil.isValueTrue(docObj.get('ODWMSG', 'IS_PROXY_DOC'))) {
                userName += '[代理]';
            }
            docObj.ODWMSG.REJECT_USER_NAME = userName;
        }
    }
    
    /* 依最新的核決/剔退狀態, 更新傳送對象 */
    function _updateTransTarget(approved, rejected, docObj, nextTarget, exOptions) {
        var updateAOLNextTarget = true;
        var tdlgProc = false;
        if (typeof exOptions=='object' && typeof exOptions.$parentDlg=='object' && exOptions.$parentDlg.length) {
            updateAOLNextTarget = false;
            tdlgProc = true;
        }
        
        nextTarget = (typeof nextTarget !== 'undefined') ? nextTarget : null;
        
        var SAMLart = localStorage.Artifact;
        docObj = (typeof docObj !== 'undefined') ? docObj : theAOL.docObj;
        
        if (theAOL.flowData.length===0) {
            var flowBuilder = new FlowBuilder();
            flowBuilder.setupFlowData(docObj, SAMLart);
        }
    
        // 2015.6.18 - 承辦前封裝檔可能沒有流程內容!
        var currentFlow = null;
        if (!!theAOL.flowData && theAOL.flowData.length) {
            currentFlow = _findCurrentFlow(theAOL.flowData);
        }
        
        if (!currentFlow) {
            var rslt = docObj.get('ODWMSG', ['FOLDER', 'SUBFOLDER', 'OWN_OU_ID', 'OWN_ROLE_ID', 'OWN_USER_ID']);
            if (!!rslt) {
                currentFlow = {};
                currentFlow.Folder = (!!rslt.FOLDER) ? rslt.FOLDER : '';
                currentFlow.SubFolder = (!!rslt.SUBFOLDER) ? rslt.SUBFOLDER : '';
                currentFlow.OUId = (!!rslt.OWN_OU_ID) ? rslt.OWN_OU_ID : '';
                currentFlow.RoleId = (!!rslt.OWN_ROLE_ID) ? rslt.OWN_ROLE_ID : '';
                currentFlow.UserId = (!!rslt.OWN_USER_ID) ? rslt.OWN_USER_ID : '';
                if (currentFlow.UserId.length===0) {
                    currentFlow.UserId = theSSO.User.account;
                }
            }
        }
    
        var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
        var orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo);
        
        // 更新傳送選單
        var options = {
            extraValidNext : ['O1', 'M', 'B-', 'E', 'L', 'A'],
            'approved' : approved,
            'rejected' : rejected,
            mode: 'submitTargets',
        };
        
        /* 2013.12 - 取得預設異動別&TO_OU */
        var nextOptions = _buildEDocNextOptions(currentFlow, menuRule, orgNode, docObj, options);
        
        /* 2016.7 - 記錄在docObj內 */
        if (!!nextOptions) {
            docObj.nextOptions = nextOptions;
        }
        
        /* 2015.10 - [未完成] 取預設傳送對象 (核決才有) 
        if (!nextTarget && approved) {
            var defaultTxName = '';
            // 須先決定公文核決類型再取得預設異動別!
            // OD_AOL_TX_FOR_SEND, OD_AOL_TX_FOR_FILE, OD_AOL_TX_FOR_USEND
            var value = theSSO.User.EnvSettings.get('OD_AOL_TX_FOR_SEND');
            if (defaultTxName.length) {
                nextTarget = {
                    TxName : defaultTxName,
                    OUId : '', RoleId : '', UserId : '',
                    OUName : '', RoleName : '', UserName : ''
                }
            }	
        }*/
        
        var targetIndex = null;
        if (nextOptions && nextOptions.length) {
            if (nextTarget && (typeof nextTarget.TxName !=='undefined') && nextTarget.TxName.length) {
                // 由傳入的傳送對象, 找到最接近的項目
                targetIndex = WorkFlowUtil.getNextIndexs(nextTarget, nextOptions);
            }
            
            // 未傳入傳送對象或該項目異常 -> 取第一個可用對象
            if (targetIndex===null || targetIndex.length===0) {
                //1140923	Leslie[1140848]	開啟可核決公文時先記錄預排流程的傳送對象，供取消核決時設定之用
                //1141217 Leslie[彙整表序423]	北榮修正公文儲存後重開，取消核決時重抓預排流程
                /*var wwkfNextTarget = SSOUtil.getWWKFNextTarget(docObj);
                if(wwkfNextTarget !== null){
                    var rslt = WorkFlowUtil.getNextIndexs(wwkfNextTarget, nextOptions, true);
                    if (typeof rslt!='undefined' && SSOUtil.typeOf(rslt.indexs)=='array' && rslt.indexs.length) {
                        targetIndex = rslt.indexs;
                    }
                }*/
                //1141205 Leslie[彙整表序423]	北榮修正公文儲存後重開，取消核決時重抓預排流程
                //else{
                    var wwkf = theAOL.docObj.getODWWKF();
                    if (wwkf===null) {
                        theAOL.docObj.initODWWKF();
                        wwkf = theAOL.docObj.getODWWKF();
                        if (wwkf===null) {
                            theLogger.log('-I- _updateTransTarget() 無法取得公文ODWWKF內容.');
                        }
                    }
			
                    if(wwkf !== null){
                        nextWWKF = wwkf.find(function(o){ return o.SIGN_F == 'N';})
                        //1141208	Leslie[問題彙整表 序430]	修正判斷null vs undefined的問題
                        // if(nextWWKF !== null){
                        if(nextWWKF != undefined){
                            var nextObj = {
                                TxName: nextWWKF.TX_NAME, 
                                ToOU: '', 
                                OUId: nextWWKF.OWN_OU_ID, 
                                OUName: nextWWKF.OWN_OU_NAME, 
                                RoleId: nextWWKF.OWN_ROLE_ID, 
                                RoleName: nextWWKF.OWN_ROLE_NAME, 
                                UserId: nextWWKF.OWN_USER_ID, 
                                UserName: nextWWKF.OWN_USER_NAME,
                            }
                            var rslt = WorkFlowUtil.getNextIndexs(nextObj, nextOptions, true);
                            if (typeof rslt!='undefined' && SSOUtil.typeOf(rslt.indexs)=='array' && rslt.indexs.length) {
                                targetIndex = rslt.indexs;
                            }
                        }
                        //1141217   Leslie[問題彙整表 序430]    抓不到預排流程時,改用OD_LIBWS.GetENextTarget()取得下一個傳送對象
                        else if(theSSO.User.SystemSets.get('NOWWKF_USE_DEFTARGET') == 'Y'){
                            var params = new SOAPClientParameters(),res;
                            params.add('argArtifact'    , localStorage.Artifact);
                            params.add('argOrgNo'	    , docObj.sourceOrgNo);
                            params.add('argInChargeOu'	, docObj.ODWMSG.INCHARGE_OU);
                            params.add('argUserName'    , docObj.ODWMSG.IC_USER_ID);
                            params.add('argEmpName'	    , docObj.ODWMSG.IC_USER_NAME);
                            params.add('argOwnOuId'	    , docObj.ODWMSG.OWN_OU_ID);
                            params.add('argOwnRoleId'	, docObj.ODWMSG.OWN_ROLE_ID);
                            var wsFuncName = 'GetENextTarget';
                            var wsUrl = SSO_CONFIG.getWSUrl('odlibws');
                            
                            SOAPClient.invokeJSON(wsUrl, wsFuncName, params, false,
                                                function(rslt){
                                                    theLogger.log('-I- odlibws.' + wsFuncName + ' returns:');
                                                    theLogger.log(rslt);
                                                    if (typeof rslt === 'object') {
                                                        res = rslt.value;
                                                    }
                                                    else {
                                                        throw new Error('叫用 odlibws.' + wsFuncName + ' 時發生錯誤!');
                                                    }
                                                });
                            if(typeof res == 'object' && 'RtnBool' in res && res.RtnBool == true){
                                var nextObj = {
                                    TxName: res.NextTxName, 
                                    ToOU: '', 
                                    OUId: res.NextOuId, 
                                    OUName: res.NextOuName, 
                                    RoleId: res.NextRoleId, 
                                    RoleName: res.NextRoleName, 
                                    UserId: res.NextUserId, 
                                    UserName: res.NextEmpName,
                                }
                                var rslt = WorkFlowUtil.getNextIndexs(nextObj, nextOptions, true);
                                if (typeof rslt!='undefined' && SSOUtil.typeOf(rslt.indexs)=='array' && rslt.indexs.length) {
                                    targetIndex = rslt.indexs;
                                }
                            }
                        }
                    }
                //}

                //1140923	Leslie[1140848]	開啟可核決公文時先記錄預排流程的傳送對象，供取消核決時設定之用，依舊取不到時，依原行為取第一個可用對象
                if (targetIndex===null || targetIndex.length===0)
                targetIndex = _getFirstItemIndexs(nextOptions);
            }
        }
    
        var newTransTarget = null;
        if (!!targetIndex && !!nextOptions) {
            newTransTarget = WorkFlowUtil.getNewTarget(targetIndex, nextOptions);
        }
        
        if (!!newTransTarget) {
            if (updateAOLNextTarget) {
                theAOL.nextTarget.TxName = ((typeof newTransTarget.TxName!=='undefined') &&  newTransTarget.TxName) ? newTransTarget.TxName : '';
                theAOL.nextTarget.OUId = ((typeof newTransTarget.OUId!=='undefined') &&  newTransTarget.OUId) ? newTransTarget.OUId : '';
                theAOL.nextTarget.RoleId = ((typeof newTransTarget.RoleId!=='undefined') &&  newTransTarget.RoleId) ? newTransTarget.RoleId : '';
                theAOL.nextTarget.UserId = ((typeof newTransTarget.UserId!=='undefined') &&  newTransTarget.UserId) ? newTransTarget.UserId : '';
                theAOL.nextTarget.OUName = ((typeof newTransTarget.Unit!=='undefined') &&  newTransTarget.Unit) ? newTransTarget.Unit : '';
                theAOL.nextTarget.RoleName = ((typeof newTransTarget.RoleName!=='undefined') &&  newTransTarget.RoleName) ? newTransTarget.RoleName : '';
                theAOL.nextTarget.UserName = ((typeof newTransTarget.UserName!=='undefined') &&  newTransTarget.UserName) ? newTransTarget.UserName : '';
                
                theAOL.nextTarget.approved = (docObj.get('ODWMSG', 'APP_USER_ID').length || docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
                theAOL.nextTarget.rejected = false;
                if (!theAOL.nextTarget.approved) {
                    theAOL.nextTarget.rejected = docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
                }
                _changeTransTarget(theAOL.nextTarget, docObj, targetIndex);
            }
            else {
                nextTarget.TxName = ((typeof newTransTarget.TxName!=='undefined') &&  newTransTarget.TxName) ? newTransTarget.TxName : '';
                nextTarget.OUId = ((typeof newTransTarget.OUId!=='undefined') &&  newTransTarget.OUId) ? newTransTarget.OUId : '';
                nextTarget.RoleId = ((typeof newTransTarget.RoleId!=='undefined') &&  newTransTarget.RoleId) ? newTransTarget.RoleId : '';
                nextTarget.UserId = ((typeof newTransTarget.UserId!=='undefined') &&  newTransTarget.UserId) ? newTransTarget.UserId : '';
                nextTarget.OUName = ((typeof newTransTarget.Unit!=='undefined') &&  newTransTarget.Unit) ? newTransTarget.Unit : '';
                nextTarget.RoleName = ((typeof newTransTarget.RoleName!=='undefined') &&  newTransTarget.RoleName) ? newTransTarget.RoleName : '';
                nextTarget.UserName = ((typeof newTransTarget.UserName!=='undefined') &&  newTransTarget.UserName) ? newTransTarget.UserName : '';
                
                nextTarget.approved = (docObj.get('ODWMSG', 'APP_USER_ID').length || docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
                nextTarget.rejected = false;
                if (!nextTarget.approved) {
                    nextTarget.rejected = docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
                }
                
                var extraOptions;
                if (tdlgProc) {
                    extraOptions = {$parentDlg:exOptions.$parentDlg, 'nextTarget':nextTarget};
                }
                _changeTransTarget(nextTarget, docObj, targetIndex, extraOptions);
            }
        }
        //var nextTarget = 
        //var nextIndexs = WorkFlowUtil.getNextIndexs(nextTarget, nextOptions);
    }

    /* 依最新的核決/剔退狀態, 更新傳送對象 */
    // 2022.6.22 - 1110180 Eric, 傳送對象設定子視窗支援紙本公文! (新增exOptions)
    function _updateTransTarget_PDoc(approved, rejected, docObj, nextTarget, exOptions) {
        var tdlgProc = false;
        var updateAOLNextTarget = true;
        if (typeof exOptions=='object' && typeof exOptions.$parentDlg=='object' && exOptions.$parentDlg.length) {
            updateAOLNextTarget = false;
            tdlgProc = true;
        }

        nextTarget = (typeof nextTarget !== 'undefined') ? nextTarget : null;
        
        var SAMLart = localStorage.Artifact;
        docObj = (typeof docObj !== 'undefined') ? docObj : theAOL.docObj;
        
        /*if (theAOL.flowData.length===0) {
            var flowBuilder = new FlowBuilder();
            flowBuilder.setupFlowData(docObj, SAMLart);
        }*/
    
        // 2015.6.18 - 承辦前封裝檔可能沒有流程內容!
        var currentFlow = null;
        var rslt = docObj.get('ODWMSG', ['FOLDER', 'SUBFOLDER', 'OWN_OU_ID', 'OWN_ROLE_ID', 'OWN_USER_ID']);
        if (!!rslt) {
            currentFlow = {};
            currentFlow.Folder = (!!rslt.FOLDER) ? rslt.FOLDER : '';
            currentFlow.SubFolder = (!!rslt.SUBFOLDER) ? rslt.SUBFOLDER : '';
            currentFlow.OUId = (!!rslt.OWN_OU_ID) ? rslt.OWN_OU_ID : '';
            currentFlow.RoleId = (!!rslt.OWN_ROLE_ID) ? rslt.OWN_ROLE_ID : '';
            currentFlow.UserId = (!!rslt.OWN_USER_ID) ? rslt.OWN_USER_ID : '';
            if (currentFlow.UserId.length===0) {
                currentFlow.UserId = theSSO.User.account;
            }
        }
    
        var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
        var orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo);
        
        // 更新傳送選單
        var options = {
            'approved' : approved,
            'rejected' : rejected
        };
        
        /* 2013.12 - 取得預設異動別&TO_OU */
        var nextOptions = _buildPDocNextOptions(currentFlow, menuRule, orgNode, docObj, options);
        if (nextOptions!==null) {
            theAOL.docObj.nextOptions = nextOptions; // 2016.8.11 - 新的nextOptions直接記錄在theAOL.docObj
        }
        
        var targetIndex = null;
        if (nextOptions && nextOptions.length) {
            if (nextTarget && (typeof nextTarget.TxName !=='undefined') && nextTarget.TxName.length) {
                // 由傳入的傳送對象, 找到最接近的項目
                targetIndex = WorkFlowUtil.getNextIndexs(nextTarget, nextOptions);
            }
            
            // 未傳入傳送對象或該項目異常 -> 取第一個可用對象
            if (targetIndex===null || targetIndex.length===0) {
                targetIndex = _getFirstItemIndexs(nextOptions);
            }
        }
    
        var newTransTarget = WorkFlowUtil.getNewTarget(targetIndex, nextOptions);
        
        if (!!newTransTarget) {
            // 2022.6.22 - 1110180 Eric.
            if (updateAOLNextTarget) {
                theAOL.nextTarget.TxName = ((typeof newTransTarget.TxName!=='undefined') &&  newTransTarget.TxName) ? newTransTarget.TxName : '';
                theAOL.nextTarget.OUId = ((typeof newTransTarget.OUId!=='undefined') &&  newTransTarget.OUId) ? newTransTarget.OUId : '';
                theAOL.nextTarget.RoleId = ((typeof newTransTarget.RoleId!=='undefined') &&  newTransTarget.RoleId) ? newTransTarget.RoleId : '';
                theAOL.nextTarget.UserId = ((typeof newTransTarget.UserId!=='undefined') &&  newTransTarget.UserId) ? newTransTarget.UserId : '';
                theAOL.nextTarget.OUName = ((typeof newTransTarget.Unit!=='undefined') &&  newTransTarget.Unit) ? newTransTarget.Unit : '';
                theAOL.nextTarget.RoleName = ((typeof newTransTarget.RoleName!=='undefined') &&  newTransTarget.RoleName) ? newTransTarget.RoleName : '';
                theAOL.nextTarget.UserName = ((typeof newTransTarget.UserName!=='undefined') &&  newTransTarget.UserName) ? newTransTarget.UserName : '';
                
                theAOL.nextTarget.approved = approved;
                theAOL.nextTarget.rejected = rejected;

                _changeTransTarget(theAOL.nextTarget, docObj, targetIndex);
            }
            else {
                nextTarget.TxName = ((typeof newTransTarget.TxName!=='undefined') &&  newTransTarget.TxName) ? newTransTarget.TxName : '';
                nextTarget.OUId = ((typeof newTransTarget.OUId!=='undefined') &&  newTransTarget.OUId) ? newTransTarget.OUId : '';
                nextTarget.RoleId = ((typeof newTransTarget.RoleId!=='undefined') &&  newTransTarget.RoleId) ? newTransTarget.RoleId : '';
                nextTarget.UserId = ((typeof newTransTarget.UserId!=='undefined') &&  newTransTarget.UserId) ? newTransTarget.UserId : '';
                nextTarget.OUName = ((typeof newTransTarget.Unit!=='undefined') &&  newTransTarget.Unit) ? newTransTarget.Unit : '';
                nextTarget.RoleName = ((typeof newTransTarget.RoleName!=='undefined') &&  newTransTarget.RoleName) ? newTransTarget.RoleName : '';
                nextTarget.UserName = ((typeof newTransTarget.UserName!=='undefined') &&  newTransTarget.UserName) ? newTransTarget.UserName : '';
                
                nextTarget.approved = (docObj.get('ODWMSG', 'APP_USER_ID').length || docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
                nextTarget.rejected = false;
                if (!nextTarget.approved) {
                    nextTarget.rejected = docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
                }
                
                var extraOptions;
                if (tdlgProc) {
                    extraOptions = {$parentDlg:exOptions.$parentDlg, 'nextTarget':nextTarget};
                }
                _changeTransTarget(nextTarget, docObj, targetIndex, extraOptions);
            }
        }
    }

    function _showTransTargetSetupDialog(event, UISetting) {
        /* inner function */
        function _updateDlgDocTransTarget(transTarget, ruleOption, _docObj) {
            if (!!transTarget && typeof transTarget.txName == 'undefined') {
                _dlgNextTarget.TxName = ((typeof transTarget.TxName!=='undefined') &&  transTarget.TxName) ? transTarget.TxName : '';
                _dlgNextTarget.OUId = ((typeof transTarget.OUId!=='undefined') &&  transTarget.OUId) ? transTarget.OUId : '';
                _dlgNextTarget.RoleId = ((typeof transTarget.RoleId!=='undefined') &&  transTarget.RoleId) ? transTarget.RoleId : '';
                _dlgNextTarget.UserId = ((typeof transTarget.UserId!=='undefined') &&  transTarget.UserId) ? transTarget.UserId : '';
                _dlgNextTarget.OUName = ((typeof transTarget.Unit!=='undefined') &&  transTarget.Unit) ? transTarget.Unit : '';
                _dlgNextTarget.RoleName = ((typeof transTarget.RoleName!=='undefined') &&  transTarget.RoleName) ? transTarget.RoleName : '';
                _dlgNextTarget.UserName = ((typeof transTarget.UserName!=='undefined') &&  transTarget.UserName) ? transTarget.UserName : '';
            }
            else {
                _dlgNextTarget.TxName = ((typeof transTarget.txName!=='undefined') &&  transTarget.txName) ? transTarget.txName : '';
                _dlgNextTarget.OUId = ((typeof transTarget.toOUId!=='undefined') &&  transTarget.toOUId) ? transTarget.toOUId : '';
                _dlgNextTarget.RoleId = ((typeof transTarget.toRoleId!=='undefined') &&  transTarget.toRoleId) ? transTarget.toRoleId : '';
                _dlgNextTarget.UserId = ((typeof transTarget.toUserId!=='undefined') &&  transTarget.toUserId) ? transTarget.toUserId : '';
                _dlgNextTarget.OUName = ((typeof transTarget.toOUName!=='undefined') &&  transTarget.toOUName) ? transTarget.toOUName : '';
                _dlgNextTarget.RoleName = ((typeof transTarget.toRoleName!=='undefined') &&  transTarget.toRoleName) ? transTarget.toRoleName : '';
                _dlgNextTarget.UserName = ((typeof transTarget.toUserName!=='undefined') &&  transTarget.toUserName) ? transTarget.toUserName : '';
            }
            _dlgNextTarget.ruleOption = ruleOption;
            
            _dlgNextTarget.approved = (_docObj.get('ODWMSG', 'APP_USER_ID').length || _docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
            _dlgNextTarget.rejected = false;
            if (!_dlgNextTarget.approved) {
                _dlgNextTarget.rejected = _docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
            }
            
            if (typeof _docObj !== 'undefined') {
                _docObj.txName = _dlgNextTarget.TxName;
                _docObj.toOUId = (!!_dlgNextTarget.OUId) ?_dlgNextTarget.OUId : '';
                _docObj.toRoleId = (!!_dlgNextTarget.RoleId) ? _dlgNextTarget.RoleId : '';
                _docObj.toUserId = (!!_dlgNextTarget.UserId) ? _dlgNextTarget.UserId : '';
                _docObj.toOUName = (!!_dlgNextTarget.OUName) ? _dlgNextTarget.OUName : '';
                _docObj.toRoleName = (!!_dlgNextTarget.RoleName) ? _dlgNextTarget.RoleName : '';
                _docObj.toUserName = (!!_dlgNextTarget.UserNamee) ? _dlgNextTarget.UserName : '';
            }
        }
        
        $(document).on('change', '.simplemodal-wrap #dlgDocSendTarget select#tdlg_chooseA', function(event) {
        //$('select#chooseA').on('change', function(event) {
            _selecting = true;
            
            var _nextOptions = _theNextOptions;
            if (_nextOptions===null) return;
            
            var signType = _dlgDocObj.signType;
            
            // 2017.4.21 - 1060272
            var $dlg = $('#aol #dlgDocSendTarget.simplemodal-data');
            
            // 顯示select 選單
            var $chooseA = [];
            if (typeof $dlg=='object' && $dlg.length) {
                $chooseA = $dlg.find('select#tdlg_chooseA');
            }
            var processNext = false;
            var subOptions = null;
            var selectedIndex = -1;
            var $targetOption, targetOption;
            
            //var value = '';
            if ($chooseA.length && typeof $dlg=='object' && $dlg.length) {
                $dlg.find('select#tdlg_chooseB').closest('.ui-select').hide();
                $dlg.find('select#tdlg_chooseC').closest('.ui-select').hide();
                $dlg.find('select#tdlg_chooseD').closest('.ui-select').hide();
                $dlg.find('select#tdlg_chooseB').html(''); $dlg.find('select#tdlg_chooseC').html(''); $dlg.find('select#tdlg_chooseD').html('');
                
                //value = this.options[event.target.selectedIndex].text;
                $targetOption = $(this.options[event.target.selectedIndex]);  //$('select#chooseA').find('option[value="'+ value +'"]');
                if ($targetOption.length===0) {
                    _selecting = false;
                    return;
                }
                
                selectedIndex = parseInt($targetOption.attr('value'));
                if (selectedIndex>=0) {
                    targetOption = _nextOptions[selectedIndex];
                    if (!!targetOption.options && targetOption.options.length) {
                        subOptions = targetOption.options;
                        processNext = true;
                    }
                }
            }
            
            var txName = '', ruleOption = null;
            if (processNext===false) {
                _updateDlgDocTransTarget(targetOption, targetOption.ruleOption, _dlgDocObj);
                 
                _selecting = false;
                return;
            }
            else {
                txName = targetOption.txName;
                ruleOption = targetOption.ruleOption;
            }
            
            var $chooseB = $dlg.find('select#tdlg_chooseB'), $chooseC = $dlg.find('select#tdlg_chooseC'), $chooseD = $dlg.find('select#tdlg_chooseD');
            targetOption = _changeSelectContent(signType, [$chooseB,  $chooseC,  $chooseD], subOptions, null);
            if (!!targetOption) {
                _updateDlgDocTransTarget($.extend({'txName':txName}, targetOption), ruleOption, _dlgDocObj);
            }
            
             _selecting = false;
        });
    
        $(document).on('change', '#dlgDocSendTarget select#tdlg_chooseB', function (event) {
            if (_selecting) return;
            _selecting = true;
            
            function _getMaxLevel(nextOptions) {
                function _getLevel(target, idx) {
                    var i=0, j=0, k=0;
                    var optLv1, optLv2, optLv3;
                    var maxLv = 1;
                    var arrIdx = [idx];
                    var arrIdxErr=null;
                    
                    // TX_NAME有子項目DDL1 => Lv2
                    if (!!target.options && target.options.length) {
                        if (maxLv<2) {
                            maxLv = 2;
                            arrIdx = [idx, 0];
                        }
                    }
                    
                    for(i=0; i<target.options.length; i++) {
                        optLv1 = target.options[i];
                        if (!!optLv1.options && optLv1.options.length) {
                            if (maxLv<3) {
                                maxLv = 3;
                                arrIdx = [idx, i, 0];
                            }
                            for(j=0; j<optLv1.options.length; j++) {
                                optLv2 = optLv1.options[j];
                                if (!!optLv2.options && optLv2.options.length) {
                                    if (maxLv<4) {
                                        maxLv = 4;
                                        arrIdx = [idx, i, j, 0];
                                    }
                                    for(k=0; k<optLv2.options.length; k++) {
                                        optLv3 = optLv2.options[k];
                                        if (!!optLv3.options && optLv3.options.length) {
                                            if (!!optLv3.options && optLv3.options.length) {
                                                arrIdxErr = [idx, i, j, k];
                                                console.log('-W- nextTarget lv4 has sub-options, arrIdx=' + arrIdx.toString());
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return arrIdx;
                }
                
                var maxLv = 0, arrIdx, maxIdx;
                var i=0, option;
                for(i=0; i<nextOptions.length; i++) {
                    option = nextOptions[i];
                    arrIdx = _getLevel(option, i);
                    if (arrIdx.length > maxLv) {
                        maxIdx = arrIdx;
                        maxLv = arrIdx.length;
                    }
                }
                
                console.log('-I- maxLv=' + maxLv + ', max lenght indexs:' + maxIdx.toString());
            }
            
            var _nextOptions = _theNextOptions;
            if (_nextOptions===null) return;
            
            var signType = _dlgDocObj.signType;
            
            // 2017.4.21 - 1060272
            var $dlg = $('#aol #dlgDocSendTarget.simplemodal-data');
            
            var $chooseA = $dlg.find('select#tdlg_chooseA');
            //var $chooseB = $dlg.find('select#tdlg_chooseB');
            var $chooseC = $dlg.find('select#tdlg_chooseC');
            var $chooseD = $dlg.find('select#tdlg_chooseD');
            
            $chooseC.closest('.ui-select').hide(); $chooseC.html(''); 
            $chooseD.closest('.ui-select').hide(); $chooseD.html('');
            
            // 顯示select 選單
            var processNext = false;
            var subOptions = null;
            var selectedIndexA = -1, selectedIndexB = -1;
            var $targetOption, targetOption;
            
            $targetOption = $chooseA.find('option:selected');
            if (typeof $targetOption=='undefined' || $targetOption.length===0) {
                _selecting = false;
                return;
            }
            
            selectedIndexA = parseInt($targetOption.attr('value'));
            if (selectedIndexA>=0) {
                targetOption = _nextOptions[selectedIndexA];
                if (!!targetOption.options && targetOption.options.length) {
                    subOptions = targetOption.options;
                }
            }
            
            var txName = targetOption.txName;
            var ruleOption = targetOption.ruleOption;
             
            $targetOption =  $(this.options[event.target.selectedIndex]); //$chooseB.find('option[value="'+ value +'"]');
            selectedIndexB = event.target.selectedIndex;
            if (selectedIndexB>=0) {
                targetOption = subOptions[selectedIndexB];
                if (!!targetOption.options && targetOption.options.length) {
                    subOptions = targetOption.options;
                    processNext = true;
                }
            }
            
            if (processNext===false) {
                _updateDlgDocTransTarget($.extend({'txName': txName}, targetOption), ruleOption, _dlgDocObj);
            }
            else {
                targetOption = _changeSelectContent(signType, [$chooseC, $chooseD], subOptions, null);
                _updateDlgDocTransTarget($.extend({'txName': txName}, targetOption), ruleOption, _dlgDocObj);
            }
    
            _selecting = false;
        });
        
        $(document).on('change', '#dlgDocSendTarget select#tdlg_chooseC', function(event) {
            if (_selecting) return;
            _selecting = true;
            
            var _nextOptions = _theNextOptions;
            if (_nextOptions===null) return;
            var signType = _dlgDocObj.signType;
            
            /*if (_debug) { _getMaxLevel(_nextOptions); } */
                
            // 2017.4.21 - 1060272
            var $dlg = $('#aol #dlgDocSendTarget.simplemodal-data');
            
            var $chooseA = $dlg.find('select#tdlg_chooseA');
            var $chooseB = $dlg.find('select#tdlg_chooseB');
            //var $chooseC = $dlg.find('select#tdlg_chooseC');
            var $chooseD = $dlg.find('select#tdlg_chooseD');
            
            $chooseD.closest('.ui-select').hide(); $chooseD.html('');
            
            // 顯示select 選單
            var processNext = false;
            var subOptions = null;
            var selectedIndexA = -1, selectedIndexB = -1, selectedIndexC = -1;
            var $targetOption, targetOption;
            
            $targetOption = $chooseA.find('option:selected');
            if (typeof $targetOption=='undefined' || $targetOption.length===0) {
                _selecting = false;
                return;
            }
            
            selectedIndexA = parseInt($targetOption.attr('value'));
            if (selectedIndexA>=0) {
                targetOption = _nextOptions[selectedIndexA];
                if (!!targetOption.options && targetOption.options.length) {
                    subOptions = targetOption.options;
                }
            }
            
            var txName = targetOption.txName;
            var ruleOption = targetOption.ruleOption;
            
            $targetOption = $chooseB.find('option:selected');
            if (typeof $targetOption=='undefined' || $targetOption.length===0) {
                _selecting = false;
                return;
            }
            
            selectedIndexB = parseInt($targetOption.attr('value'));
            if (selectedIndexB>=0) {
                targetOption = subOptions[selectedIndexB];
                if (!!targetOption.options && targetOption.options.length) {
                    subOptions = targetOption.options;
                }
            }
            
            //$targetOption =  $(this.options[event.target.selectedIndex]); //$chooseB.find('option[value="'+ value +'"]');
            selectedIndexC = event.target.selectedIndex;
            if (selectedIndexC>=0) {
                targetOption = subOptions[selectedIndexC];
                if (!!targetOption.options && targetOption.options.length) {
                    subOptions = targetOption.options;
                    processNext = true;
                }
            }

            if (processNext===false) {
                _updateDlgDocTransTarget($.extend({'txName':txName}, targetOption), ruleOption, _dlgDocObj);
            }
            else {
                targetOption = _changeSelectContent(signType, [$chooseD], subOptions, null);
                _updateDlgDocTransTarget($.extend({'txName':txName}, targetOption), ruleOption, _dlgDocObj);
            }
                    
            _selecting = false;
        });
        
        $(document).on('change', '#dlgDocSendTarget select#tdlg_chooseD', function(event) {
            if (_selecting) return;
            _selecting = true;
            
            var _nextOptions = _theNextOptions;
            if (_nextOptions===null) return;
                    
            // 2017.4.21 - 1060272
            var $dlg = $('#aol #dlgDocSendTarget.simplemodal-data');
            
            var $chooseA = $dlg.find('select#tdlg_chooseA');
            var $chooseB = $dlg.find('select#tdlg_chooseB');
            var $chooseC = $dlg.find('select#tdlg_chooseC');
            
            // 顯示select 選單
            var subOptions = null;
            var selectedIndexA = -1, selectedIndexB = -1, selectedIndexC = -1, selectedIndexD = -1;
            var $targetOption, targetOption;
            
            $targetOption = $chooseA.find('option:selected');
            if (typeof $targetOption=='undefined' || $targetOption.length===0) {
                _selecting = false;
                return;
            }
            
            selectedIndexA = parseInt($targetOption.attr('value'));
            if (selectedIndexA>=0) {
                targetOption = _nextOptions[selectedIndexA];
                if (!!targetOption.options && targetOption.options.length) {
                    subOptions = targetOption.options;
                }
            }
            
            var txName = targetOption.txName;
            var ruleOption = targetOption.ruleOption;
            
            $targetOption = $chooseB.find('option:selected');
            if (typeof $targetOption=='undefined' || $targetOption.length===0) {
                _selecting = false;
                return;
            }
            
            selectedIndexB = parseInt($targetOption.attr('value'));
            if (selectedIndexB>=0) {
                targetOption = subOptions[selectedIndexB];
                if (!!targetOption.options && targetOption.options.length) {
                    subOptions = targetOption.options;
                }
            }
            
            $targetOption = $chooseC.find('option:selected');
            if (typeof $targetOption=='undefined' || $targetOption.length===0) {
                _selecting = false;
                return;
            }
            
            selectedIndexC = parseInt($targetOption.attr('value'));
            if (selectedIndexC>=0) {
                targetOption = subOptions[selectedIndexC];
                if (!!targetOption.options && targetOption.options.length) {
                    subOptions = targetOption.options;
                }
            }
            
            //$targetOption =  $(this.options[event.target.selectedIndex]); //$chooseB.find('option[value="'+ value +'"]');
            selectedIndexD = event.target.selectedIndex;
            if (selectedIndexD>=0) {
                targetOption = subOptions[selectedIndexD];
                if (!!targetOption.options && targetOption.options.length) {
                    //subOptions = targetOption.options;
                    
                    //processNext = true;
                    var arrIdx = [selectedIndexA, selectedIndexB, selectedIndexC, selectedIndexD];
                    console.log('-W- invalid DDL3 item: has child options! optionIdx=' + arrIdx.toString());
                }
            }
            
            if (!!targetOption) {
                _updateDlgDocTransTarget($.extend({'txName':txName}, targetOption), ruleOption, _dlgDocObj);
            }
            
            _selecting = false;
        });
    
        function _setupNegotiateControls(envSets, $dlg) {
            var negotiateSetting = envSets.get('PAD_NEGOTIABLE');
            $dlg.find('#openNegotiateSettingDlg').hide();
            
            /* for develope test -
             * if ((typeof negotiateSetting==='undefined') || negotiateSetting.length==0) {
             *	negotiateSetting = 'Y|待處理-待核示;待處理-待簽核|通知-待議公文';
            }*/
            
            /* ex. 'Y|待處理-待核示;待處理-待簽核|通知-待議公文' */
            if ((typeof negotiateSetting!=='undefined') && negotiateSetting.length>0)
            {
                var settings = negotiateSetting.split('|');
                if (settings.length<2)
                    return;
                
                var sEnable = settings[0];
                if ((typeof sEnable==='undefined') || (sEnable!=='Y' && sEnable!=='y')) {
                    return;
                }
                
                var sEnableFolders = settings[1];
                if ((typeof sEnableFolders==='undefined') || sEnableFolders.length===0) {
                    return;
                }
                
                var folders = sEnableFolders.split(';');
                if (folders.length===0) return;
                                
                var currentFolder = theAOL.docObj.folder + '-' + theAOL.docObj.subfolder;
                var i = 0;
                var enable = false;
                for(i=0;i<folders.length; i++) {
                    var enableFolder = folders[i];
                    if (enableFolder===currentFolder) {
                        enable = true; break;
                    }
                }
                
                if (enable) {
                    var _docObj = theAOL.docObj;
                    
                    // url with params: [EPT010.aspx URL]?SAMLart=xxx&MsgId=xxx&DocNo=xxx&OWN_OU_ID=xxx&OWN_ROLE_ID=xxx
                    var url = SSO_CONFIG.iOSSYSProg_URLs.EP_NEGOTIATE;
                    if ((typeof url !== 'undefined') && url.length) {
                        var param = '?SAMLart=' + localStorage.Artifact + '&MsgId=' + _docObj.msgId + '&DocNo=' + _docObj.docNo +
                                '&OWN_OU_ID=' + _docObj.ownOUId + '&OWN_ROLE_ID=' + _docObj.ownRoleId;
                        url += param;
                    }
                                
                    if (url.length) {
                        $dlg.find('#openNegotiateSettingDlg').attr('data-url', url);
                    }
                    $dlg.find('#openNegotiateSettingDlg').show();
                }
                else {
                    $dlg.find('#openNegotiateSettingDlg').hide();
                }
            }
        }
        
        /* 2015.10 - 榮總-回閱設定 */
        function _setupSendBackControls(menuRule, $dlg) {
            var _docObj = theAOL.docObj;
            var curFolder = _docObj.folder;
            var curSubFolder = _docObj.subfolder;
            var rule = menuRule.getRule(curFolder, curSubFolder);
            var enableBtn = false;
            if((typeof rule !== 'undefined') && (typeof rule.buttonF !== 'undefined')) {
                var btnFlag = rule.buttonF;
                if (typeof btnFlag!='undefined' && btnFlag.length) {
                    btnFlag = btnFlag.toLowerCase();
                    var idx = btnFlag.indexOf('c');
                    if (idx!=-1) {
                        enableBtn = true;
                    }
                }
            }
            
            $dlg.find('#openSendBackSettingDlg').hide();
            
            if (enableBtn) {
                // url with params: [EPT011.aspx URL]?SAMLart=權杖&SourceOrgNo=301060000C&DocNo=1020000001&OuId=04&RoleId=OD11&UserId=David&MsgId=xxx
                var url = SSO_CONFIG.iOSSYSProg_URLs.ED_RESIGN;
                if ((typeof url !== 'undefined') && url.length) {
                    var userId = _docObj.ownUserId;
                    if (userId.length==0) {
                        userId = theSSO.User.account;
                    }
                    var isProxy = _docObj.get('ODWMSG', 'IS_PROXY_DOC'); // 代理公文
                    var sProxy = '0';
                    if (typeof isProxy!=='undefined' && isProxy.length && isProxy=='1') {
                        sProxy = '1';
                    }
                    var param = '?SAMLart=' + localStorage.Artifact + '&SourceOrgNo=' + _docObj.sourceOrgNo + '&DocNo=' + _docObj.docNo +
                            '&OuId=' + _docObj.ownOUId + '&RoleId=' + _docObj.ownRoleId + '&UserId=' + userId +'&MsgId=' + _docObj.msgId + '&IsProxy=' + sProxy;
                    url += param;
                }
                            
                if ((typeof url !== 'undefined') && url.length) {
                    $dlg.find('#openSendBackSettingDlg').attr('data-url', url);
                }
                $dlg.find('#openSendBackSettingDlg').show();
            }
            else {
                $dlg.find('#openSendBackSettingDlg').hide();
            }
        }
        
        /* 2015.12 - 1040735, 榮總-預排流程設定 */
        function _setupWWKFEditControls(menuRule, $dlg) {
            /* inner function */
            function _getFullUrl(filename) {
                var _href = window.location.href;
                var idxLastSlash = _href.lastIndexOf('/');
                var fullPathname = _href.substr(0, idxLastSlash+1) + filename;
                return fullPathname;
            }
                        
            var _docObj = theAOL.docObj;
            var curFolder = _docObj.folder;
            var curSubFolder = _docObj.subfolder;
            var rule = menuRule.getRule(curFolder, curSubFolder);
            var enableBtn = false;
            /*
             * PC版實作, [@MPRuleE_$OrgNo$.xml] <EDOL_UI_RULE><WEBPAGE>不為空字串時可開啟預排流程, 此處套用此設定,
             * 但開啟的 WebPage取 SSO_CONFIG.iOSPage_URLs.wwkfEdit設定值
             */
            if((typeof rule !== 'undefined') && (typeof rule.webPage !== 'undefined') && rule.webPage.length) {
                var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
                enableBtn = true;
                if (typeof orgNode!=='undefined'){
                    // 會辦單位開啟不能使用預排流程設定!
                    var isConsultDoc = SSOUtil.isConsultingDoc(_docObj, theSSO.User.EnvSettings, orgNode);
                    if (isConsultDoc) {
                        enableBtn = false;
                    }
                }
            }
            
            $dlg.find('#openWWKFEditDlg').hide();
            
            if (enableBtn) {
                var wwkfPage = SSO_CONFIG.iOSPage_URLs.wwkfEdit;
                var url = _getFullUrl(wwkfPage);
                if ((typeof url !== 'undefined') && url.length) {
                    $dlg.find('#openWWKFEditDlg').attr('data-url', url);
                }
                $dlg.find('#openWWKFEditDlg').show();
            }
            else {
                $dlg.find('#openWWKFEditDlg').hide();
            }
        }
        
        // 2022.6.20 - 1110180 Eric, ToDo: 支援紙本公文! (高大紙本公文可傳送到人, 行動簽核應支援!)

        // 2016.7 - 紙本不支援
        // 2022.6.20 - 1110180 Eric, dev test - 使用平版UI!
        let supportPDoc = false;
        if (SSO_CONFIG.OrgNickName=='NUK' || ('dev_mobileUI' in localStorage && SSOUtil.isValueTrue(localStorage.dev_mobileUI))) {
            supportPDoc = true;
        }

        if (theAOL.docObj.signType!=='E' && !supportPDoc) {
            return;
        }
        
        /*
         * 注意: $('#dlgDocSendTarget')之內容須在 jQM 的 page 之外, 否則 $dlg.trigger('create')
         * 將會沒有作用 => 核可/剔退 checkbox會沒有作用
         * 
         * 2013.4 - 目前div#dlgDocSendTarget HTML DOM內容放在mSSO.html內!
        */
        var $dlg = $("#dlgDocSendTarget").clone(true);
        
        var mscrollerId='', $tree=null;
        var $chooseA=null, $chooseB=null, $chooseC=null, $chooseD=null;
        // 2019.10.8 - 1080905 Eric, iPadOS 13 quick-fix
        //var mobileDevice = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
        var mobileDevice = window.iOS_device;
		//1131101	Leslie[1130977]	移除MobiScroll
        // if (mobileDevice) {
            // // placeholder for mobiscroller (異動別/傳送對象選項清單)
            // mscrollerId = 'nextOptions';
            // $tree = $dlg.find('#' + mscrollerId); //'#nextOptions');
            // $dlg.find('.selectNextOptions').hide();
        // }
        // else {
            $dlg.find('#nextOptions').hide();
            $dlg.find('.selectNextOptions').show();
            $chooseA = $dlg.find('#tdlg_chooseA');
            $chooseB = $dlg.find('#tdlg_chooseB');
            $chooseC = $dlg.find('#tdlg_chooseC');
            $chooseD = $dlg.find('#tdlg_chooseD');
        // }
        
        var appchoiceboxname = 'app_choice_sendTargetDlg';
        var postfix = '_sendTargetDlg';
            
        $dlg.find('input[name="app_choice"]').attr('name', 'app_choice' + postfix);
        $dlg.find('input[id="rbox_send"]').attr('id', 'rbox_send' + postfix);
        $dlg.find('input[id="rbox_accept"]').attr('id', 'rbox_accept' + postfix);
        $dlg.find('label[for="rbox_send"]').attr('for', 'rbox_send' + postfix);
        $dlg.find('label[for="rbox_accept"]').attr('for', 'rbox_accept' + postfix);
        
        var $approveCheckbox = $dlg.find('#checkbox_approve');
        var $rejectCheckbox = $dlg.find('#checkbox_reject');
        var $approveSendRBox = $dlg.find('#rbox_send' + postfix);
        var $approveAcceptBox = $dlg.find('#rbox_accept' + postfix);
        var $rejectUICntr = $dlg.find('div.reject_ui_container'); // 2015.8.28
        
        // #cbox_unitSend, #cbox_extra (單位發文, 發布到公布欄)
        var $unitSendCheckbox = $dlg.find('#cbox_unitSend');
        var $extraCheckbox = $dlg.find('#cbox_extra');
        
        var SAMLart = localStorage.Artifact;
        var docObj = theAOL.docObj;
        var orgNo = docObj.sourceOrgNo;
        
        var isApproved = (theAOL.docObj.get('ODWMSG', 'APP_USER_ID').length || theAOL.docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
        var isRejected = (theAOL.docObj.get('ODWMSG', 'REJECT_USER_NAME').length) ? true : false;

        // 2022.6.24 - 1110180 Eric
        if (theAOL.docObj.signType=='P') {
            $dlg.find('div.approve_setting').css({'display':'none'});
            $dlg.find('div.signer_comment').css({'display':'none'});
        }
        
        var _onUISetup = false;
        
        // 2015.10 - 是否可核決, 可設定簽辦意見
        var uiState = window._getUIStatus();
        $dlg.find('a#checkbox_approve').prop('disabled', uiState.enableApproveBtn?false:true);
        $dlg.find('a#app_opt_show').prop('disabled', uiState.enableApproveBtn?false:true);
        $dlg.find('div.signer_comment textarea').prop('disabled', uiState.readOnly);
        
        var _approveSetting = {
            closeType : docObj.get('ODWMSG', 'CLOSE_TYPE'), // 結案類型
            unitSend : false,
            UI : UISetting //theSSO.Util.getApproveOptionsDlgDisplaySettings(theAOL, theSSO.User.EnvSettings) //_getApproveProcUISettings(docObj, isApproved, isRejected)
        };
        
        if (docObj.signType=='E' && theAOL.flowData.length===0) { // 2022.6.21 - 1110180 Eric, support EDoc only.
            var flowBuilder = new FlowBuilder();
            flowBuilder.setupFlowData(docObj, SAMLart);
            // see flowBuilder.initFlowItems($flowSetCurrent);
        }
            
        // 2015.6.18 - 公文承辦前封裝檔可能無任何流程, 取基資的內容
        var currentFlow = null;
        if (docObj.signType=='E' && !!theAOL.flowData && theAOL.flowData.length) { // 2022.6.21 - 1110180 Eric, support EDoc only.
            currentFlow = _findCurrentFlow(theAOL.flowData);
        }
        
        if (!currentFlow) {
            var rslt = theAOL.docObj.get('ODWMSG', ['FOLDER', 'SUBFOLDER', 'OWN_OU_ID', 'OWN_ROLE_ID', 'OWN_USER_ID']);
            if (!!rslt) {
                currentFlow = {};
                currentFlow.Folder = (!!rslt.FOLDER) ? rslt.FOLDER : '';
                currentFlow.SubFolder = (!!rslt.SUBFOLDER) ? rslt.SUBFOLDER : '';
                currentFlow.OUId = (!!rslt.OWN_OU_ID) ? rslt.OWN_OU_ID : '';
                currentFlow.RoleId = (!!rslt.OWN_ROLE_ID) ? rslt.OWN_ROLE_ID : '';
                currentFlow.UserId = (!!rslt.OWN_USER_ID) ? rslt.OWN_USER_ID : '';
                if (currentFlow.UserId.length===0) {
                    currentFlow.UserId = theSSO.User.account;
                }
            }
        }
        theLogger.log('currentFlow=' + currentFlow);
        
        var $txtComment = $dlg.find('.signer_comment textarea');
            
        if (!!currentFlow) {
            if (theAOL.signComment!==undefined) {
                $txtComment.text(theAOL.signComment());
            }
			// 1100708 Raymond 1100648 啟用分文稿記錄簽核意見功能時, 禁止修改全文唯一的簽核意見(實際是合併了多稿的簽核意見)
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
				$txtComment.on("blur", function() {
					if(this.value != theAOL.signComment()) {
						alert("請使用簽辦意見窗格設定各文稿之簽核意見,\n此欄位僅用於顯示所有文稿合併後的簽核意見。");
						this.value = theAOL.signComment();
					}
				});
			}
        }
        
        // 2015.8.28 - 1040692, 隱藏[剔退]按鈕
        var envSets = theSSO.User.EnvSettings;
        var showRejectUI = envSets.get('MP_ENABLE_REJECTUSER');
        if ((typeof showRejectUI!=='undefined') && (showRejectUI=='Y' || showRejectUI=='y')) {
            $rejectUICntr.show();
        }
        else {
            $rejectUICntr.hide();
        }
        
        // 2015.9.22 - 1040701, 隱藏/顯示 [待討論]按鈕 (a#openNegotiateSettingDlg)
        _setupNegotiateControls(envSets, $dlg);
        
        var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, orgNo, docObj.signType);
        
        // 2015.10 - 回閱設定.
        _onUISetup = true;
        _setupSendBackControls(menuRule, $dlg);
        _setupWWKFEditControls(menuRule, $dlg); // 2015.12.3 - 1040735, 預排流程設定功能.
        _onUISetup = false;
        
        var orgNode = SSOUtil.getOrgNode(orgNo);
        
        // 'O1' 內會, 'M' 順會/後會, 'B-' 複閱, 'E' 送單位發文, 'L' 歸檔,
        // 'E' (Next Role='OD11:OD12:OD13') 退回承辦單位長官, [EMPTY]辦畢, [EMPYT]分會,
        // 'A' 順會至人
        var options = {
            extraValidNext : ['O1', 'M', 'B-', 'E', 'L', 'A']
        };
        
        var folderKey = 'nextOptions_' + docObj.folder + '-' + docObj.subfolder;
        
        // 2013.12 - 傳送選項建立後儲存於localStorage備用!
        var _theNextOptions = null;
        if (typeof docObj.nextOptions=='object' && docObj.nextOptions.length) {
            _theNextOptions = docObj.nextOptions;
        }
        
        if (_theNextOptions===null) {
            // 2013.12 - 依目前的核決狀態列出選單!
            //isApproved = $('#aol #chkApprove').is(':checked');
            //isRejected = $('#aol #chkReject').is(':checked');
            options.approved = isApproved;
            options.rejected = isRejected;
            options.mode='submitTargets';
            
            // 2022.6.21 - 1110180 Eric, support PDoc (高大)
            if (docObj.signType=='P') {
                _theNextOptions = _buildPDocNextOptions(currentFlow, menuRule, orgNode, docObj, options);
            }
            else {
                // 尚未建立傳送選項, 叫用函式建立!
                _theNextOptions = _buildEDocNextOptions(currentFlow, menuRule, orgNode, docObj, options);
            }
        }
        
        // 初始化傳送選項
        var nextIndexs = null;
        var _dlgNextTarget = $.extend(true, {}, theAOL.nextTarget);
        var _dlgDocObj = theSSO.MP.todolist.builder.docFromODWMSGObj(docObj.isDraft, $.extend(true, {}, docObj.ODWMSG), $.extend(true, {}, docObj.ODWDCM));
		//1131101	Leslie[1130977]	移除MobiScroll
        // if (mobileDevice) {
            // WorkFlowUtil.initNextOptions($tree, _theNextOptions); //_nextOptions);
            // nextIndexs = WorkFlowUtil.getNextIndexs(_dlgNextTarget, _theNextOptions);
            // _dlgDocObj.nextOptions = _theNextOptions;
        // }
        // else {
            _dlgDocObj.nextOptions = _theNextOptions;
            nextIndexs = WorkFlowUtil.getNextIndexs(_dlgNextTarget, _theNextOptions);
        // }
        
        if (nextIndexs.length===0) {
            nextIndexs = _getFirstItemIndexs(_theNextOptions);
        }
        
        var onMobiBeforeShow = function(inst) {
            var wheels = inst.settings.wheels;
            theLogger.debug('wheel length=' + wheels.length);
        };
        
        // 初始化為選定目前傳送項目!
        var onMobiShowFunc = function (html, valueText, inst) {
            //$tree.mobiscroll('setValue', [0, 1, 0, 0]);
        };
        
		//1131101	Leslie[1130977]	移除MobiScroll
        // if (mobileDevice) {
            // // 將傳送選單轉為mobiscroll控制項(ul -> mobiscroll)
            // $tree.mobiscroll().treelist({
                        // theme: 'ios',
                        // display: 'inline',
                        // mode: 'scroller',
                        // labels: ['異動別', '傳送對象', ' ', ' '], // 2012.12 - 若theme設為'ios', 則 labels 不會顯示!
                        // inputClass: 'mobiscroll-trans-txt',
                        // onShow : onMobiShowFunc,
                        // onBeforeShow : onMobiBeforeShow,
                        // width: 100,
                        // defaultValue: nextIndexs
                    // });
            
            // // hide mobiscroll's dummy input
            // //$dlg.find('#' + id + '_dummy').css({display:'none'});
        // }
        // else {
            
        // }
        
        /* 按下[確認傳送]鍵 */
        $dlg.find("a#targetDlgOK").on('click', function(event) {
            // 2013.2.4 - 記錄使用者選擇項目
            var transTargetIndex = [];
			//1131101	Leslie[1130977]	移除MobiScroll
            // if (mobileDevice) {
                // transTargetIndex = $tree.mobiscroll('getValue');// 新增流程內容(由MobiScroll元件選定)
                // $tree.mobiscroll('destroy'); // 刪除mobiscroll object*/
            // }
            // else {
                transTargetIndex = WorkFlowUtil.getNextIndexs(_dlgNextTarget, _theNextOptions);
            // }
    
            var sSignerComment = $txtComment.val();
            
            var approved = $approveCheckbox.is(':checked');
            var rejected = $rejectCheckbox.is(':checked');
            
            var txNameBefore = theAOL.docObj.txName; // 2016.10.6 - 序344
             
            var approved_before = (theAOL.docObj.get('ODWMSG', 'APP_USER_ID').length || theAOL.docObj.get('ODWMSG', 'APP_ROLE_ID').length)? true : false;
            var reject_before = false;
            if (!approved_before) {
                reject_before = theAOL.docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
            }
            
            /* 2017.11.28 - 1061183, 未變更核決狀態時, 不異動APP_USER_ID/APP_USER_NAME/APP_ROLE_ID 
              => 目前CANCEL_APP_ENABLE欄位值, 即使公文已在先前流程核決, 仍有可能為"Y"
              => 公文核決後, 若開啟傳送對象設定子視窗, 在未異動核決狀態時, 不應更新ODWMSG的核決人員欄位記錄
            */
            var canApprove = SSOUtil.isValueTrue(theAOL.docObj.get('ODWDCM', 'CANCEL_APP_ENABLE'));
            var _updApprove = false;
            if (canApprove && (approved!==approved_before || rejected!==reject_before)) {
                _updApprove = true;
            }

            /* 2014.10 - 核決取進階設定 */
            var approveDetail = getApproveDetail();
            
            $.modal.close();
            
            // 2015.10 - 唯讀模式不異動公文(及基資)內容. (=>可異動傳送對象, ex.回閱)
            var uiState = _getUIStatus();
            if (!uiState.readOnly) {
                _updateSignerComment(sSignerComment);
                if (canApprove && _updApprove) { /* 2017.11.28 - 1061183, 未變更核決狀態時, 不異動APP_USER_ID/APP_USER_NAME/APP_ROLE_ID */
                    _updateApproveReject(approved, rejected, theAOL.docObj, approveDetail);
                }
                else if (approved && !!approveDetail) {
                    theAOL.docObj.set2('aol', 'ODWMSG', {'CLOSE_TYPE': approveDetail.closeType });
                }
            }
            
            // 異動傳送對象
            var newTransTarget = WorkFlowUtil.getNewTarget(transTargetIndex, _theNextOptions);
            if (!!newTransTarget) {
                // 2022.6.28 - 1110180 Eric, ToDo: for PDOC, 檢核是否應叫用 fnDllTxNameExChange()
                // => 與David確認毋須叫用! 

                theAOL.nextTarget.TxName = ((typeof newTransTarget.TxName!=='undefined') &&  newTransTarget.TxName) ? newTransTarget.TxName : '';
                theAOL.nextTarget.OUId = ((typeof newTransTarget.OUId!=='undefined') &&  newTransTarget.OUId) ? newTransTarget.OUId : '';
                theAOL.nextTarget.RoleId = ((typeof newTransTarget.RoleId!=='undefined') &&  newTransTarget.RoleId) ? newTransTarget.RoleId : '';
                theAOL.nextTarget.UserId = ((typeof newTransTarget.UserId!=='undefined') &&  newTransTarget.UserId) ? newTransTarget.UserId : '';
                theAOL.nextTarget.OUName = ((typeof newTransTarget.Unit!=='undefined') &&  newTransTarget.Unit) ? newTransTarget.Unit : '';
                theAOL.nextTarget.RoleName = ((typeof newTransTarget.RoleName!=='undefined') &&  newTransTarget.RoleName) ? newTransTarget.RoleName : '';
                theAOL.nextTarget.UserName = ((typeof newTransTarget.UserName!=='undefined') &&  newTransTarget.UserName) ? newTransTarget.UserName : '';
                
				/* 1140527 Raymond 1140321 修正平板模式在傳送對象子視窗中勾選「核決」後, 直接點「確認傳送」會傳送成「送會簽」的問題
				上面2691行已經取過approved_before了, 這裡因為經過了_updateApproveReject, 再取會取到跟_dlgDocObj一樣的APP_USER_ID、APP_ROLE_ID, 變成2752行的比對會不成立, 而沒有走到_updateTransTarget, 若未核決的傳送對象清單中沒有「辦畢退回」的話, 會導致同步到外面時, 會對不到子視窗中選的已核決傳送對象「辦畢退回」而改取第一個傳送對象, 通常就是「送會簽」
                var approved_before = (theAOL.docObj.get('ODWMSG', 'APP_USER_ID').length || theAOL.docObj.get('ODWMSG', 'APP_ROLE_ID').length)? true : false;
                var reject_before = false;
                if (!approved_before) {
                    reject_before = theAOL.docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
                }*/
                
                theAOL.nextTarget.approved = (_dlgDocObj.get('ODWMSG', 'APP_USER_ID').length || _dlgDocObj.get('ODWMSG', 'APP_ROLE_ID').length)? true : false;
                theAOL.nextTarget.rejected = false;
                if (!theAOL.nextTarget.approved) {
                    theAOL.nextTarget.rejected = _dlgDocObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
                }
                
                if (theAOL.nextTarget.approved!==approved_before ||
                    theAOL.nextTarget.rejected!==reject_before) {
                    // 2022.6.22 - 1110180 Eric, support PDoc
                    if (theAOL.docObj.singType=='P') {
                        SSOUtil.updateTransTarget_PDoc(approved, rejected, theAOL.docObj, theAOL.nextTarget);
                        theAOL.docObj.nextOptions = _theNextOptions;
                    }
                    else {
                        _updateTransTarget(approved, rejected, theAOL.docObj, theAOL.nextTarget);
                        theAOL.docObj.nextOptions = _theNextOptions;
                    }
                }
                else {
                    _changeTransTarget(theAOL.nextTarget, theAOL.docObj, transTargetIndex);
                }
                
                var txNameAfter = theAOL.docObj.txName;
                if (txNameBefore!==txNameAfter) {
                    // 2022.6.22 - 1110180 Eric, ToDo: 確認紙本簽核公文是否須叫用? (with DVD)
                    // => 與David確認毋須叫用! 
                    fnODC011ChangeRemark(); // 2016.10.6 - 異動別改變後叫用此函式! (系統部要求)
                }
            }
    
            // 2014.10 - 觸發傳送作業
            $('#btnSubmit').trigger('click');
        });
        
        /* 按下[儲存,稍後傳送]鍵 */
        $dlg.find("a#targetDlgSave").on('click', function(event) {
            // 2013.2.4 - 記錄使用者選擇項目
            var transTargetIndex = [];
			//1131101	Leslie[1130977]	移除MobiScroll
            // if (mobileDevice) {
                // transTargetIndex = $tree.mobiscroll('getValue'); // 新增流程內容(由MobiScroll元件選定)
                // $tree.mobiscroll('destroy'); // 刪除mobiscroll object*/    
            // }
            // else {
                transTargetIndex = WorkFlowUtil.getNextIndexs(_dlgNextTarget, _theNextOptions);
            // }
            
            var sSignerComment = $txtComment.val();
            
            var approved = $approveCheckbox.is(':checked');
            var rejected = $rejectCheckbox.is(':checked');
            
            var txNameBefore = theAOL.docObj.txName; // 2016.10.6 - 序344
            
            var approved_before = (theAOL.docObj.get('ODWMSG', 'APP_USER_ID').length || theAOL.docObj.get('ODWMSG', 'APP_ROLE_ID').length)? true : false;
            var reject_before = false;
            if (!approved_before) {
                reject_before = theAOL.docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
            }
            
            /* 2017.11.28 - 1061183, 未變更核決狀態時, 不異動APP_USER_ID/APP_USER_NAME/APP_ROLE_ID */
            var canApprove = SSOUtil.isValueTrue(theAOL.docObj.get('ODWDCM', 'CANCEL_APP_ENABLE'));
            var _updApprove = false;
            if (canApprove && (approved!==approved_before || rejected!==reject_before)) {
                _updApprove = true;
            }

            /* 2014.10 - 核決取進階設定 */
            var approveDetail = getApproveDetail();
            
            $.modal.close();
            
            // 2015.10 - 唯讀模式不異動公文(及基資)內容. (=>可異動傳送對象, ex.回閱)
            var uiState = _getUIStatus();
            if (!uiState.readOnly) {
                _updateSignerComment(sSignerComment);

                if (canApprove && _updApprove) { /* 2017.11.28 - 1061183, 未變更核決狀態時, 不異動APP_USER_ID/APP_USER_NAME/APP_ROLE_ID */
                    _updateApproveReject(approved, rejected, theAOL.docObj, approveDetail);
                }
                else if (approved && !!approveDetail) {
                    theAOL.docObj.set2('aol', 'ODWMSG', {'CLOSE_TYPE': approveDetail.closeType });
                }
            }
            
            // 異動傳送對象
            var newTransTarget = WorkFlowUtil.getNewTarget(transTargetIndex, _theNextOptions);
            if (!!newTransTarget) {
                // 2022.6.28 - 1110180 Eric, ToDo: for PDOC, 檢核是否應叫用 fnDllTxNameExChange()
                // => 與David確認毋須叫用! 

                theAOL.nextTarget.TxName = ((typeof newTransTarget.TxName!=='undefined') &&  newTransTarget.TxName) ? newTransTarget.TxName : '';
                theAOL.nextTarget.OUId = ((typeof newTransTarget.OUId!=='undefined') &&  newTransTarget.OUId) ? newTransTarget.OUId : '';
                theAOL.nextTarget.RoleId = ((typeof newTransTarget.RoleId!=='undefined') &&  newTransTarget.RoleId) ? newTransTarget.RoleId : '';
                theAOL.nextTarget.UserId = ((typeof newTransTarget.UserId!=='undefined') &&  newTransTarget.UserId) ? newTransTarget.UserId : '';
                theAOL.nextTarget.OUName = ((typeof newTransTarget.Unit!=='undefined') &&  newTransTarget.Unit) ? newTransTarget.Unit : '';
                theAOL.nextTarget.RoleName = ((typeof newTransTarget.RoleName!=='undefined') &&  newTransTarget.RoleName) ? newTransTarget.RoleName : '';
                theAOL.nextTarget.UserName = ((typeof newTransTarget.UserName!=='undefined') &&  newTransTarget.UserName) ? newTransTarget.UserName : '';
                
                theAOL.nextTarget.approved = (_dlgDocObj.get('ODWMSG', 'APP_USER_ID').length || _dlgDocObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
                theAOL.nextTarget.rejected = false;
                if (!theAOL.nextTarget.approved) {
                    theAOL.nextTarget.rejected = _dlgDocObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
                }
                
                if (theAOL.nextTarget.approved!==approved_before ||
                    theAOL.nextTarget.rejected!==reject_before) {
                    _updateTransTarget(approved, rejected, theAOL.docObj, theAOL.nextTarget);
                    theAOL.docObj.nextOptions = _theNextOptions;
                }
                else {
                    _changeTransTarget(theAOL.nextTarget, theAOL.docObj, transTargetIndex);
                }
                
                var txNameAfter = theAOL.docObj.txName;
                if (txNameBefore!==txNameAfter) {
                    fnODC011ChangeRemark(); // 2016.10.6 - 異動別改變後叫用此函式! (系統部要求)
                }
            }
        });
        
        /* 按下[取消]鍵 */
        $dlg.find("a#targetDlgCancel").on('click', function(event) {
            $.modal.close();
                //$tree.mobiscroll('destroy'); // 刪除 mobiscroll object
        });
        
        /* 2015.9.21 - CDC需求-1040701, 按下[待討論]鍵 */
        $dlg.find("a#openNegotiateSettingDlg").on('click', function(event) {
            var url = $(event.currentTarget).attr('data-url');
            if ((typeof url!=='undefined') && url.length)
            {
                //alert('EPT010 url=' + url);
                
                var w = $dlg.width() + 5;
                var h = $dlg.height() + 5;
                var $pane = $dlg.find("div#docSysSettingDlgContainer");
                $pane.width(w); $pane.height(h);
                
                var $frame = $pane.find('#docSysSettingPage');
                if ($frame.length && url.length) {
                    $frame[0].src = url;
                }
                $pane.css('display', 'block');	
            }
        });
        
        /* 2015.10 - 中榮需求-1040784, 按下[回閱設定]鍵 */
        $dlg.find("a#openSendBackSettingDlg").on('click', function(event) {
            var url = $(event.currentTarget).attr('data-url');
            if ((typeof url!=='undefined') && url.length)
            {
                //alert('EPT011 url=' + url);
                var w = $dlg.width() + 5;
                var h = $dlg.height() + 5;
                var $pane = $dlg.find("div#docSysSettingDlgContainer");
                $pane.width(w); $pane.height(h);
                
                var $frame = $pane.find('#docSysSettingPage');
                if ($frame.length && url.length) {
                    $frame[0].src = url;
                }
                $pane.css('display', 'block');	
            }
        });
        
        /* 2015.12 - 中榮需求-1040735, 按下[流程設定]鍵 */
        $dlg.find("a#openWWKFEditDlg").on('click', function(event) {
            var url = $(event.currentTarget).attr('data-url');
            if ((typeof url!=='undefined') && url.length)
            {
                var w = $dlg.width() + 5;
                var h = $dlg.height() + 5;
                var $pane = $dlg.find("div#docSysSettingDlgContainer");
                $pane.width(w); $pane.height(h);
                
                var $frame = $pane.find('#docSysSettingPage');
                if ($frame.length && url.length) {
                    $frame[0].src = url;
                }
                $pane.css('display', 'block');	
            }
        });
        
        /* 2015.9.21 - 按下設定子視窗的關閉鍵 [待討論/回閱功能使用/流程設定] */
        $dlg.find("a#docSysDlg_close_btn").on('click', function(event, extra){
            /* 2015.12 - 1040735, 預排流程關閉時可能由extra參數傳入最新的異動對象 */
            if ((typeof extra !== 'undefined') && (typeof extra.TxName !== 'undefined') && (extra.TxName.length)) {
                var defaultTarget = extra;
                var nextIndexs;
                // 取預設異動別
                if (defaultTarget!==null) {
                    nextIndexs = WorkFlowUtil.getNextIndexs(defaultTarget, _theNextOptions);
                    if ((typeof nextIndexs !== 'undefined') && nextIndexs.length) {
                        // 2016.11.4 - 
						//1131101	Leslie[1130977]	移除MobiScroll
                        // if (mobileDevice) {
                        // $tree.mobiscroll('setValue', nextIndexs);
                    // }
                        // else {
                            _dlgNextTarget = WorkFlowUtil.getNewTarget(nextIndexs, _theNextOptions);
                            var ruleOption = _theNextOptions[nextIndexs[0]].ruleOption;
                            if (typeof _dlgNextTarget.ruleOption!='object') {
                                _dlgNextTarget.ruleOption = ruleOption;
                            }
                            SSOUtil.changeTransTarget(_dlgNextTarget, _dlgDocObj, nextIndexs, {$parentDlg:$dlg, nextTarget:_dlgNextTarget});
                        // }
                    }
                }
            }
            
            var $pane = $dlg.find("div#docSysSettingDlgContainer");
            // clear iframe aspx content
            var $frame = $pane.find("iframe#docSysSettingPage");
            if ($frame.length) {
                var frameDoc = $frame[0].contentDocument || $frame[0].contentWindow.document;
                frameDoc.documentElement.innerHTML = "";
            }
            
            // hide setting window
            $pane.css('display', 'none');
			
			$dlg.find("textarea").trigger('focus');	// 2017.3.9 修正IE若游標停留在隱藏的欄位時, 關閉子視窗後點一般contentEditable的欄位會點不出來游標, 須點到其它input或select的欄位才會恢復的問題, 航港序-411
        });
        
        /* 2015.10 測試用 - 系統部設定子視窗關閉用 */
        $dlg.find("a#docSysDlgDone").on('click', function(){
            $dlg.find("a#docSysDlg_close_btn").trigger('click');
        });
        
        // 2017.6.2 - 1060292, 預排流程設定子視窗要求開啟分會子視窗
        $dlg.find('a#docAdvDlg_open_btn').on('click', function(event, ui){
            if (typeof ui=='object' && typeof ui.webPage=='string' && ui.webPage.length) {
                var $advDlgPane = $dlg.find('#docAdvancedSettingDlgContainer');
                var $frame = $advDlgPane.find('#docAdvSettingPage');
                
                if ($frame.length) {
                    $advDlgPane.css({width:'100%', height:'100%', 'overflow-y':'hidden', 'overflow-x':'hidden', '-webkit-overflow-scrolling':'touch'});
                    if (typeof window.iOS_device=='boolean' && window.iOS_device===true) {
                        $advDlgPane.css({'overflow-y':'scroll'});
                    }

                    $advDlgPane.addClass('ui-slide-pane-active');
                    $advDlgPane.show();
                    
                    //$dlg.find('#docSysSettingPage').hide(); // 隱藏預排流程設定子視窗iframe
                    
                    $frame.css({width: '100%', height:'100%'});

                    // reload page content
                    if (ui.webPage.indexOf('openTM')==-1) {
                        var date = new Date();
                        var sTime = '&' + date.getFullYear() + SSOUtil.padLeft(date.getMonth(), 2) + SSOUtil.padLeft(date.getDay(), 2) +
                                    SSOUtil.padLeft(date.getHours(), 2) + SSOUtil.padLeft(date.getMinutes(), 2) + SSOUtil.padLeft(date.getSeconds(), 2);
                        ui.webPage += sTime;
                    }

                    // 開啟前先清除內容
                    localStorage.MsCoworkRtn = '';
                    localStorage.MsCoworkUpdated = '';

                    $frame[0].src = ui.webPage;
                }
            }
        });
        
        // 2017.6.2 - 1060292, 分會設定子視窗關閉, 重現預排流程設定子視窗
        $dlg.find('a#docAdvDlg_close_btn').on('click', function() {
            var $advDlgPane = $dlg.find('#docAdvancedSettingDlgContainer');
            var $frame = $advDlgPane.find('#docAdvSettingPage');
            $advDlgPane.removeClass('ui-slide-pane-active'); 

            if ($frame.length) {
                $frame[0].src = '';
            }
            $advDlgPane.hide();
        });
                
        var w = $(window).width(),
            h = $(window).height(); // - 80;
        theLogger.debug("新增指定傳送流程組對話方塊, w:" + w + ",h:" + h);

        var _dlgMinHeight = 500;
        if (theAOL.docObj.signType=='P') {
            _dlgMinHeight = 350;
        }

        $.modal($dlg,
                { appendTo:$('#aol #mainContent'),
                  overlayCss:{height:h, width:w},
                  minWidth:680, minHeight: _dlgMinHeight,
                  onShow: function() {
                    $dlg.enhanceWithin(); //trigger('create');
                    $approveCheckbox.prop('checked', isApproved).checkboxradio('refresh');
                    $rejectCheckbox.prop('checked', isRejected).checkboxradio('refresh');
                    
                    // 2016.9.19 - 非行動裝置, 初始化<select>控制項內容.
					//1131101	Leslie[1130977]	移除MobiScroll
                    // if (!mobileDevice) {
                        if (_dlgNextTarget.TxName.length===0 ||
                            (_dlgNextTarget.TxName.length>0 && _dlgNextTarget.UserId.length===0)) {
                            // 2022.6.22 - 1110180 Eric, 傳送設定子視窗支援紙本簽核公文
                            if (_dlgDocObj.signType=='P') {
                                SSOUtil.updateTransTarget_PDoc(isApproved, isRejected, _dlgDocObj, _dlgNextTarget, {updateAOLNextTarget:false, $parentDlg:$dlg, nextTarget:_dlgNextTarget});
                                nextIndexs = WorkFlowUtil.getNextIndexs(_dlgNextTarget, _theNextOptions);
                            }
                            else {
                                // 2017.5.8 - Eric Peng, 1060293
                                //SSOUtil.updateTransTarget(approved, rejected, _dlgDocObj, _dlgNextTarget, {updateAOLNextTarget:false, $parentDlg:$dlg, nextTarget:_dlgNextTarget});
                                SSOUtil.updateTransTarget(isApproved, isRejected, _dlgDocObj, _dlgNextTarget, {updateAOLNextTarget:false, $parentDlg:$dlg, nextTarget:_dlgNextTarget});
                                nextIndexs = WorkFlowUtil.getNextIndexs(_dlgNextTarget, _theNextOptions);
                            }
                        }
                        else {
                            if (_dlgDocObj.signType=='P') {
                                nextIndexs = WorkFlowUtil.getNextIndexs(_dlgNextTarget, _theNextOptions);
                                SSOUtil.changeTransTarget(_dlgNextTarget, _dlgDocObj, nextIndexs, {$parentDlg:$dlg, nextTarget:_dlgNextTarget});
                            }
                            else {
                                nextIndexs = WorkFlowUtil.getNextIndexs(_dlgNextTarget, _theNextOptions);
                                SSOUtil.changeTransTarget(_dlgNextTarget, _dlgDocObj, nextIndexs, {$parentDlg:$dlg, nextTarget:_dlgNextTarget});
                            }
                        }
                    // }
                    // else {
					if(mobileDevice){
                        // 2021.2.2 - 1090927, support iOS(iPhone)
                        // 2022.6.4 - Eric, fix condition.
                        //if (window.location.href.indexOf('docvip.fdat.com.tw')!=-1 && window.iOS_device && window.innerWidth<1024 && window.innerHeight<700) {
                        if (window.iOS_device && window.innerWidth<1024 && window.innerHeight<700) {
                            let h_dlg = $dlg.height();
                            let h_title = $dlg.find('h1').height();
                            let $content = $dlg.find('div.setting_panel').parent();
                            $content.height(h_dlg-h_title);
                            $content.css('overflow-y', 'scroll');
                        }
                    }
                    _setupDialogControls(docObj, _approveSetting, isApproved, isRejected);
                  }
                });
        
        //$dlg.enhanceWithin(); //trigger('create');
        //$approveCheckbox.prop('checked', isApproved).checkboxradio('refresh');
        //$rejectCheckbox.prop('checked', isRejected).checkboxradio('refresh');
        //_setupDialogControls(docObj, _approveSetting, isApproved, isRejected);
    
        // 開啟dialog時預設隱藏核決進階選項UI
        $dlg.find('div.approve_options').hide();
        
        /* 勾選[核決] checkbox */
        $dlg.find('#checkbox_approve').on('change', function(event, ui) {
            var approved = $approveCheckbox.is(':checked');
            if (approved) {
                // 2021.3.23 - 1090836 Eric, 客委會核決時檢核是否符合[核判區分]設定.
                let draftAppRole = theAOL.docObj.get('ODWDCM', 'DRAFT_APP_ROLE');
				let _orgNickName = theUserInfo.OrgNickName;
				if (_orgNickName==='HAC' && draftAppRole.length) {
					let ownRoleId = theAOL.docObj.ownRoleId;
					if (draftAppRole!==ownRoleId) {
						let appRoleName = draftAppRole;
						let orgNode =  SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo);
						if (!!orgNode) {
							appRoleName = SSOUtil.getRoleNameForDraftAppRole(orgNode, draftAppRole, theAOL.docObj.ICOUId);
							if (appRoleName.length===0) {
								appRoleName = draftAppRole;
							}
						}
						alert('目前公文核判區分設定為['+ appRoleName + ']，請調整核判區分後再進行核決!');
                        $approveCheckbox.prop('checked', false).checkboxradio('refresh');
						return;
					}
				}

                // un-check reject checkbox
                $rejectCheckbox.prop('checked', false).checkboxradio('refresh');
                
                if (_approveSetting.closeType==='1' || _approveSetting.closeType==='2') {
                    $dlg.find('div.approve_options input[name="' + appchoiceboxname + '"]:first').prop('checked', true);
                    // 發文禁用SendMail
                    if (UISetting.enableSendMail) {
                        $extraCheckbox.prop('checked', false).checkboxradio('refresh');
                        $extraCheckbox.checkboxradio('disable');
                    }
                }
                else {
                    $dlg.find('div.approve_options input[name="' + appchoiceboxname + '"]:last').prop('checked', true);
                    
                    $unitSendCheckbox.prop('checked', false).checkboxradio('refresh');
                    $unitSendCheckbox.checkboxradio('disable');
                    
                    if (UISetting.enableSendMail) {
                        $extraCheckbox.checkboxradio('enable');
                    }
                }
                $dlg.find('div.approve_options input[type="radio"]').checkboxradio('refresh');
                
                // 2014.10 - 顯示核決設定子視窗
                $dlg.find('a#app_opt_show').show();
                if (_approveSetting.UI.askCloseType) {
                    $dlg.find('div.approve_options').show();
                }
            }
            else {
                // 取消核決
                $dlg.find('a#app_opt_show').hide();
                $dlg.find('div.approve_options').hide();
            }
            
            var rejected = $rejectCheckbox.is(':checked');
            _resetTransTarget(approved, rejected);
        });
        
        /* 勾選[剔退] checkbox */
        $dlg.find('#checkbox_reject').on('change', function(event) {
            var rejected = $rejectCheckbox.is(':checked');
            if (rejected) {
                // un-check approve checkbox
                $approveCheckbox.prop('checked', false).checkboxradio('refresh');
                
                // 隱藏核決設定 button & UI
                $dlg.find('a#app_opt_show').hide();
                $dlg.find('div.approve_options').hide();
            }
            
            var approved = $approveCheckbox.is(':checked');
            _resetTransTarget(approved, rejected);
        });
        
        // 2014.4 - 核決設定子窗格
        $dlg.find('a#app_opt_close').on('click', function(){
            $dlg.find('div.approve_options').hide();
        });
        
        $dlg.find('a#app_opt_show').on('click', function(){
            $dlg.find('div.approve_options').show();
        });
        
        /* 異動核決類型 */
        $dlg.find('input[name="' + appchoiceboxname + '"]').on('change', function(event, ui){
            var send = $approveSendRBox.is(':checked');
            if (send) {
                $unitSendCheckbox.checkboxradio('enable');
                
                // 發文禁用SendMail
                if (UISetting.enableSendMail) {
                    $extraCheckbox.prop('checked', false).checkboxradio('refresh');
                    $extraCheckbox.checkboxradio('disable');
                }
            }
            else {
                $unitSendCheckbox.prop('checked', false).checkboxradio('refresh');
                $unitSendCheckbox.checkboxradio('disable');
                
                if (UISetting.enableSendMail) {
                    $extraCheckbox.checkboxradio('enable');
                }
            }
            
            var approved = $approveCheckbox.is(':checked');
            var rejected = $rejectCheckbox.is(':checked');
            _resetTransTarget(approved, rejected);
        });
        
        /* 設定單位發文 */
        $dlg.find('input[name="app_unit_send"]').on('change', function(event, ui) {
            var approved = $approveCheckbox.is(':checked');
            if (approved) {
                _resetTransTarget(true, false);
            }
        });
        
        /* 開啟傳送設定子視窗時初始化dialog controls
         */
        function _setupDialogControls(docObj, approveSettings, isApproved, isRejected) {
            // Global
            if (!approveSettings.UI.enableUnitIssue) {
                $dlg.find('div.approve_options #cbox_unitSend').parent().parent().hide();
            }
            if (!approveSettings.UI.enableSendMail) {
                $dlg.find('div.approve_options #cbox_extra').parent().parent().hide();
            }
            else if (approveSettings.UI.sendMailMsg.length) {
                $dlg.find('div.approve_options #cbox_extra').parent().find('label').text(_approveSetting.UI.sendMailMsg);
            }
            
            // 已核決
            if (isApproved) {
                $approveCheckbox.prop('checked', true).checkboxradio('refresh');
                
                if (_approveSetting.closeType==='1' || _approveSetting.closeType==='2') {
                    $dlg.find('div.approve_options input[name="' + appchoiceboxname + '"]:first').prop('checked', true);
                    $dlg.find('div.approve_options input[type="radio"]').checkboxradio('refresh');
                    
                    if (_approveSetting.closeType==='2') {
                        $unitSendCheckbox.prop('checked', true).checkboxradio('refresh');
                    }
                    
                    if (approveSettings.UI.enableSendMail) {
                        $extraCheckbox.prop('checked', false).checkboxradio('refresh');
                        $extraCheckbox.checkboxradio('disable');
                    }
                }
                else {
                    $dlg.find('div.approve_options input[name="' + appchoiceboxname + '"]:last').prop('checked', true);
                    $dlg.find('div.approve_options input[type="radio"]').checkboxradio('refresh');
                    
                    $unitSendCheckbox.prop('checked', false).checkboxradio('refresh');
                    $unitSendCheckbox.checkboxradio('disable');
                    
                    if (approveSettings.UI.enableSendMail) {
                        $extraCheckbox.prop('checked', approveSettings.UI.sendMail).checkboxradio('refresh');
                        $extraCheckbox.checkboxradio('enable');
                    }
                }
                
                $dlg.find('a#app_opt_show').show();
            }
            else if (isRejected) {
                $rejectCheckbox.prop('checked', true).checkboxradio('refresh');
            }
    
                
            // Enable/Disable 核決剔退
            var fEnableApprove = SSOUtil.isValueTrue(docObj.get('ODWDCM', 'CANCEL_APP_ENABLE'));
            if (!fEnableApprove) {
                $approveCheckbox.checkboxradio('disable');
                $rejectCheckbox.checkboxradio('disable');
                
                $approveSendRBox.checkboxradio('disable');
                $approveAcceptBox.checkboxradio('disable');
                $unitSendCheckbox.checkboxradio('disable');
                $extraCheckbox.checkboxradio('disable');
            }
        }
        
        /* 2015.10 - 取核決取進階設定 */
        function getApproveDetail() {
            var approveDetail = null;
            var approved = $approveCheckbox.is(':checked');
            var closeType = '' + sso_const.APPROVAL_PUBLISH_ORG;
            if (approved) {
                var send = $approveSendRBox.is(':checked');
                if (send) {
                    var unitSend = $unitSendCheckbox.is(':checked');
                    if (unitSend) {
                        closeType = '' + sso_const.APPROVAL_PUBLISH_UNIT;
                    }
                    else {
                        closeType = '' + sso_const.APPROVAL_PUBLISH_ORG;
                    }
                }
                else {
                    closeType = '' + sso_const.APPROVAL_PERMISSION;
                }
                var sendMail = $extraCheckbox.is(':checked');
                approveDetail = {
                    closeType : closeType,
                    sendMail : sendMail ? 'Y' : 'N'  /* 2015.3.6 - Eric Peng, value應為'Y/N' */
                };
            }
            return approveDetail;
        }
        
        /* 重設傳送對象清單 */
        function _resetTransTarget(approved, rejected) {
            // 更新傳送選單
            var options = {
                extraValidNext : ['O1', 'M', 'B-', 'E', 'L', 'A'],
                'approved' : approved,
                'rejected' : rejected,
                mode: 'submitTargets',
            };
            
            //var _tmpDocObj = jQuery.extend(true, {}, docObj);
            _updateApproveFields(options.approved, options.rejected, _dlgDocObj);
            
            // reset next options
            _theNextOptions = _buildEDocNextOptions(currentFlow, menuRule, orgNode, _dlgDocObj, options);
        
            // 初始化傳送選項(update raw <ul> items)
			//1131101	Leslie[1130977]	移除MobiScroll
            // if (mobileDevice) {
                // $tree.empty();
                // WorkFlowUtil.initNextOptions($tree, _theNextOptions); //_nextOptions);
            // }
            // else {
                _dlgDocObj.nextOptions = _theNextOptions;
            // }
            
            var defaultTarget = null;
            if (approved) {
                var approveDetail = getApproveDetail();
                defaultTarget = _getDefaultTargetForCloseType(parseInt(approveDetail.closeType), _approveSetting.UI.userLevel);
            }
                        
            // 取預設異動別
            var nextIndexs = [];
            if (defaultTarget!==null) {
                nextIndexs = WorkFlowUtil.getNextIndexs(defaultTarget, _theNextOptions);
            }
            else {
                nextIndexs = _getFirstItemIndexs(_theNextOptions);
                defaultTarget = WorkFlowUtil.getNewTarget(nextIndexs, _theNextOptions);
            }
            
            if (nextIndexs===null || nextIndexs.length===0) {
                nextIndexs = _getFirstItemIndexs(_theNextOptions); //WorkFlowUtil.getNextIndexs(_nextTarget, _theNextOptions);
            }
            
			//1131101	Leslie[1130977]	移除MobiScroll
            // if (mobileDevice) {
                // $dlg.find('div.trans_target > div.dw-inline').remove();
                
                // // 將傳送選單轉為mobiscroll控制項(ul -> mobiscroll)
                // $tree.mobiscroll().treelist({
                            // theme: 'ios',
                            // display: 'inline',
                            // mode: 'scroller',
                            // labels: ['異動別', '傳送對象', ' ', ' '], // 2012.12 - 若theme設為'ios', 則 labels 不會顯示!
                            // inputClass: 'mobiscroll-trans-txt',
                            // onShow : onMobiShowFunc,
                            // onBeforeShow : onMobiBeforeShow,
                            // width: 100,
                            // defaultValue: nextIndexs
                        // });
            // }
            // else {
                var ruleOption = null;
                SSOUtil.updateTransTarget(approved, rejected, _dlgDocObj, defaultTarget, {updateAOLNextTarget:false, $parentDlg:$dlg, nextTarget:_dlgNextTarget});
                if (SSOUtil.typeOf(nextIndexs)=='array' && nextIndexs.length) {
                    ruleOption = _theNextOptions[nextIndexs[0]].ruleOption;
                    _dlgNextTarget = WorkFlowUtil.getNewTarget(nextIndexs, _theNextOptions);
                    if (typeof _dlgNextTarget.ruleOption!='object') {
                        _dlgNextTarget.ruleOption = ruleOption;
                    }
                }
            // }
            
            function _updateApproveFields(approved, rejected, _docObj) {
                'use strict';
                /*
                @ODWMSG: APP_USER_ID / APP_USER_NAME / APP_ROLE_ID / REJECT_USER_NAME
                @ODWDCM: CLOSE_TYPE / IS_NOTIFY
                */
                
                // 2021.10.7 - Eric, bug-fix add roleId
                var userId='', userName='', roleId='';
				//1121228	Leslie[線上彙整表序152]	修正行動平台模式的核決選項異常
				var appUserInfo = null;
                
                // 2016.10.24 - 代理人核決, 核決/剔退人員記錄應為代理人員
                var excludeRoleList;
                var isProxy = docObj.get('ODWMSG', 'IS_PROXY_DOC'); // 代理公文
                
                if (!approved) {
                    _docObj.set2('aol', 'ODWMSG', {APP_USER_ID:''});
                    _docObj.set2('aol', 'ODWMSG', {APP_USER_NAME:''});
                    _docObj.set2('aol', 'ODWMSG', {APP_ROLE_ID: ''});
                }
                else {
                    // 2015.5 - Eric Peng, _docObj.ownUserId may be a null string!
                    userId = _docObj.ownUserId;
                    roleId = _docObj.ownRoleId; // 2021.7 - 1100433 Eric, merge 1060389; 2021.10.9 - Eric, typo fix

                    // 2021.7 - 1100433 Eric, merge: 2017.9.7 - 1060389, 紙本公文若在一層決行單位時, 取該單位最大可核決角色
                    var setAsOfficerApprove = false; // 2018.9.6 - 1070880, 紙本代理公文, 若以判定之核決角色為核決者, 不在姓名後面加[代理]字樣.
					//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
                    // if (SSO_CONFIG.OrgNickName=='NUK' && _docObj.signType=='P' && (parseInt(_docObj.ownOUId)>=window.sso_const.APPROVEUNIT_NUM)) {
                    if (SSO_CONFIG.OrgNickName=='NUK' && _docObj.signType=='P' && (_docObj.ownOUId>=window.sso_const.APPROVEUNIT_NUM)) {
                        var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
                        appUserInfo = _getPDocAppUserInfo(orgNode, _docObj.ownOUId);
                        if (appUserInfo!=null && typeof appUserInfo.UserId=='string' && appUserInfo.UserId.length) {
                            userId = appUserInfo.UserId;
                            roleId = appUserInfo.RoleId;
                            setAsOfficerApprove = true;
                        }
                    }

                    if (userId.length===0) {
                        userId = theSSO.User.account;
                    }
                    
                    // 2016.10.24 - 代理人核決, 核決人員記錄應為代理人員
                    if (!setAsOfficerApprove && typeof isProxy!=='undefined' && isProxy.length && isProxy=='1') {
                        userId = theSSO.User.account;
                    }
                    _docObj.set2('aol', 'ODWMSG', {APP_USER_ID: userId});
                    _docObj.set2('aol', 'ODWMSG', {APP_ROLE_ID: roleId}); // 2021.10.5 - Eric, bug-fix, roleId replace _docObj.ownRoleId;
            
                    /* 2015.10 - 代理人核決, 姓名後面加'[代理]' */
                     /* 2015.10 - 代理人核決, 姓名後面加'[代理]' */
                     if (!!appUserInfo) {
                        userName = appUserInfo.UserName;
                    }
                    else {
                        userName = theSSO.User.name;
                    }

                    // 2021.7 - 1100433 Eric, merge: 2018.9.6 - 1070880, 紙本代理公文, 若以判定之核決角色為核決者, 不在姓名後面加[代理]字樣.
                    if (!setAsOfficerApprove && SSOUtil.isValueTrue(docObj.get('ODWMSG', 'IS_PROXY_DOC'))) {
                        userName += '[代理]';
                    }
                    _docObj.set2('aol', 'ODWMSG', {APP_USER_NAME: userName});
                    
                    if (_docObj.ODWMSG.CLOSE_TYPE==='') {
                        _docObj.set2('aol', 'ODWMSG', {CLOSE_TYPE:'3'}); // P2一律設為存查!
                    }
                }
                
                if (!rejected) {
                    _docObj.set2('aol', 'ODWMSG', {REJECT_USER_NAME:''});
                }
                else {
                    userName = theSSO.User.name;
                    if (SSOUtil.isValueTrue(docObj.get('ODWMSG', 'IS_PROXY_DOC'))) {
                        userName += '[代理]';
                    }
                    _docObj.set2('aol', 'ODWMSG', {REJECT_USER_NAME:userName});
                }
                /* @ODWDCM: CLOSE_TYPE / IS_NOTIFY */
            }
            /* End of Inner functions */
        }
    }/* End of _showTransTargetSetupDialog */
	
    /*
	 * 使用者在未核決時按'核決'button,會叫用此函式執行公文核決設定作業
	 */
	function _showApproveConfirmDialog(sCloseType, UISettings, cntr) {
		var _onUISetup = false;
        var closeType = parseInt(sCloseType); // 2016.2.19 - bug-fix
        
		function _setupDialogControls(docObj, closeType, UISettings) {
			_onUISetup = true;
			if (!UISettings.enableUnitIssue) {
				$dlg.find('#cbox_unitSend').parent().parent().hide();
			}
			if (!UISettings.enableSendMail) {
				$dlg.find('#cbox_extra').parent().parent().hide();
			}
			else if (UISettings.sendMailMsg.length) {
				$dlg.find('#cbox_extra').parent().find('label').text(UISettings.sendMailMsg);
			}
			
			if (closeType===sso_const.APPROVAL_PUBLISH_ORG || closeType===sso_const.APPROVAL_PUBLISH_UNIT) {
				// 判發
				$dlg.find('input[name="app_choice_appconfirm_dlg"]:first').prop('checked', true);
				$dlg.find('input[type="radio"]').checkboxradio('refresh');
				
				if (closeType===sso_const.APPROVAL_PUBLISH_UNIT) {
					$unitSendCheckbox.prop('checked', true).checkboxradio('refresh');
				}
				
				// 發文禁用SendMail
				if (UISettings.enableSendMail) {
					$extraCheckbox.prop('checked', false).checkboxradio('refresh');
					$extraCheckbox.checkboxradio('disable');
				}
			}
			else {
				// 存查
				$dlg.find('input[name="app_choice_appconfirm_dlg"]:last').prop('checked', true);
				$dlg.find('input[type="radio"]').checkboxradio('refresh');
				
				$unitSendCheckbox.prop('checked', false).checkboxradio('refresh');
				$unitSendCheckbox.checkboxradio('disable');
				
				// 存查才可能使用SendMail
				if (UISettings.enableSendMail) {
					$extraCheckbox.prop('checked', UISettings.sendMail).checkboxradio('refresh');
					$extraCheckbox.checkboxradio('enable');
				}
			}
			
			if (UISettings.enableSendMail) {
				$extraCheckbox.prop('checked', false).checkboxradio('refresh');
			}
			
			_onUISetup = false;
		}
	    
	    /*
		 * 注意: $('#dlgApproveConfirm')之內容須在 jQM 的 page 之外, 否則 $dlg.trigger('create')
		 * 將會沒有作用
		 * 
		 * 2013.4 - 目前div#dlgApproveConfirm HTML DOM內容放在mSSO.html內!
	    */
		var $dlg = $("#dlgApproveConfirm").clone(true);
        
        // change name and id
        var appchoiceboxname = 'app_choice_appconfirm_dlg';
        
        $dlg.find('input[name="app_choice"]').attr('name', 'app_choice_appconfirm_dlg');
        $dlg.find('input[id="rbox_send"]').attr('id', 'rbox_send_appconfirm_dlg');
        $dlg.find('input[id="rbox_accept"]').attr('id', 'rbox_accept_appconfirm_dlg');
        $dlg.find('label[for="rbox_send"]').attr('for', 'rbox_send_appconfirm_dlg');
        $dlg.find('label[for="rbox_accept"]').attr('for', 'rbox_accept_appconfirm_dlg');
                	   
		var $approveSendRBox = $dlg.find('#rbox_send_appconfirm_dlg');
		var $approveAcceptBox = $dlg.find('#rbox_accept_appconfirm_dlg');
		var $rejectUICntr = $dlg.find('div.reject_ui_container'); // 2015.8.28
	   
		// #cbox_unitSend, #cbox_extra (單位發文, 發布到公布欄)
		var $unitSendCheckbox = $dlg.find('#cbox_unitSend');
		var $extraCheckbox = $dlg.find('#cbox_extra');
        
        // 2016.5
        //$dlg.enhanceWithin();
        //$approveSendRBox.checkboxradio();
        //$approveAcceptBox.checkboxradio();
        //$unitSendCheckbox.checkboxradio();
        //$extraCheckbox.checkboxradio();
                
		var SAMLart = localStorage.Artifact;
		var docObj = theAOL.docObj;
		var orgNo = docObj.sourceOrgNo;
		
		var buttonClose = false;

		var w = $(window).width(),
		h = $(window).height(); // - 80;
		theLogger.debug("新增指定傳送流程組對話方塊, w:" + w + ",h:" + h);
		$.modal($dlg,
				{ appendTo:$('#aol #mainContent'),
                  overlayCss:{height:h, width:w},
                  maxWidth:450, maxHeight:350,
				  onShow: function(dlg) {
                    //$dlg.trigger('create');
                    $dlg.enhanceWithin();
                    _setupDialogControls(docObj, closeType, UISettings);
 
					// 2021.2.18 - 1090927 Eric, support iOS (iPhone)
                    if (window.SDLMode) { // 2021.4.19 - Eric
                        //dlg.container.css({left:left+'px', top:'.5em'});
                    }
                    else {
                        var newW = 450, newH = 250;
                        var w = dlg.container.width();
                        var h = dlg.container.height();
                        var pos = dlg.container.position();
                        var left = pos.left + ((w-newW) / 2);
                        var top = pos.top + ((h-newH) / 2);
                        if (UISettings.enableSendMail) {
                            newH += 30;
                        }
                        dlg.container.width(newW);
                        dlg.container.height(newH); //css({height:'300px', width:'450px'});
                        dlg.container.css({left:left+'px', top:top+'px'});
                    }
				  },
				  onClose: function(dlg) {
					if (!buttonClose) { // 取消核決check
						var $approve = $('#aol #chkApprove');
                        var $approveB = $('#aol #moChkApprove');
                        window._docAppRejChanging = true;
                        
                        // 2019.8.28 - 1080339 Eric, jQuery 3.x upgrade
						//$approve.attr('checked', false).checkboxradio('refresh'); // un-check approve checkbox
                        //$approveB.attr('checked', false).checkboxradio('refresh');
                        $approve.prop('checked', false).checkboxradio('refresh'); // un-check approve checkbox
                        $approveB.prop('checked', false).checkboxradio('refresh');

                        //1140814   Leslie[1140460] 修正核決對話框於取消時，應恢復"退承辦人"功能鍵的預設值
                        if($('#btnSendBack').is(':visible'))
				            $('#btnSendBack span').text('退承辦人');

						window._docAppRejChanging = false;
					}
					$.modal.close(); // must call this!
				  }
				});
		
        // 2016.5
		/*$dlg.trigger('create'); */
		//_setupDialogControls(docObj, closeType, UISettings);
			   
		/* 異動核決類型 */
		$dlg.find('input[name="' + appchoiceboxname + '"]').on('change', function(event, ui) {
			if (_onUISetup) {
				return;
			}
			
			_onUISetup = true;
			var send = $approveSendRBox.is(':checked');
			if (send) {
				if (UISettings.enableUnitIssue) {
					$unitSendCheckbox.checkboxradio('enable');
				}
				
				// 發文禁用SendMail
				if (UISettings.enableSendMail) {
					$extraCheckbox.prop('checked', false).checkboxradio('refresh');
					$extraCheckbox.checkboxradio('disable');
				}
			}
			else {
				$unitSendCheckbox.prop('checked', false).checkboxradio('refresh');
				$unitSendCheckbox.checkboxradio('disable');
				
				if (UISettings.enableSendMail) {
					$extraCheckbox.checkboxradio('enable');
				}
			}
			_onUISetup = false;
		});
		
		/* 設定單位發文 */
		/*$dlg.find('input[name="app_unit_send"]').on('change', function(event, ui) {
			if (_onUISetup) {
				return;
			}
			
			var unitSend = $unitSendCheckbox.is(':checked');
		});*/
	   
		/* 按下[確定]鍵 */
		$dlg.find("a#targetDlgOK").on('click', function(event) {
			// do approve process...
			var send = $approveSendRBox.is(':checked');
			var unitSend = false;
			if (send) {
				unitSend = $unitSendCheckbox.is(':checked');
			}
			var closeType = sso_const.APPROVAL_PUBLISH_ORG;
			if (!send) {
				closeType = sso_const.APPROVAL_PERMISSION;
			}
			else if (unitSend) {
				closeType = sso_const.APPROVAL_PUBLISH_UNIT;
			}
			
			// 傳送電子郵件!
			var sendMail = $extraCheckbox.is(':checked');
			
			// 更新公文基資欄位值
			theAOL.docObj.set('aol', 'ODWMSG', [
				{ fieldname: 'CLOSE_TYPE', value: ''+closeType }					
			]);
			theAOL.docObj.set('aol', 'ODWDCM', [
				{ fieldname: 'CLOSE_TYPE', value: ''+closeType },
				{ fieldname: 'IS_NOTIFY', value: sendMail ? 'Y' : 'N' }	
			]);
			
			var defaultTarget = _getDefaultTargetForCloseType(closeType, UISettings.userLevel);
						
			if ((typeof theAOL != 'undefined') && (typeof theAOL.docObj != 'undefined')) {
				SSOUtil.updateApproveReject(true, false, theAOL.docObj); // 異動公文基資內容!
				
                // 2021.7.20 - 1100433 Eric, merge: 2017.9.7 - 1060389, 成大紙本公文可核決
                //SSOUtil.updateTransTarget(true, false, theAOL.docObj, defaultTarget); // 異動傳送選項
                if (theAOL.docObj.signType=='E') {
                    SSOUtil.updateTransTarget(true, false, theAOL.docObj, defaultTarget);
                }
                else {
                    SSOUtil.updateTransTarget_PDoc(true, false, theAOL.docObj, defaultTarget);
                }
			}
			
			buttonClose = true;
			$.modal.close();
			
			// 取消上方工具列[剔退]勾選
			var $reject = $('#chkReject');
            var $rejectB = $('#moChkReject');
            window._docAppRejChanging = true;
            
			$reject.prop('checked', false).checkboxradio('refresh'); // un-check reject checkbox
            $rejectB.prop('checked', false).checkboxradio('refresh');
			window._docAppRejChanging = false;
		});
		
		/* 按下[取消]鍵 */
		$dlg.find("a#targetDlgCancel").on('click', function(event) {
			buttonClose = true;
			
			$.modal.close();
			
			var $approve = $('#aol #chkApprove');
            var $approveB = $('#aol #moChkApprove');
			window._docAppRejChanging = true;
			$approve.prop('checked', false).checkboxradio('refresh'); // un-check approve checkbox
            $approveB.prop('checked', false).checkboxradio('refresh');
			
			//1140814   Leslie[1140460] 修正核決對話框於取消時，應恢復"退承辦人"功能鍵的預設值
			if($('#btnSendBack').is(':visible'))
				$('#btnSendBack span').text('退承辦人');
			
			window._docAppRejChanging = false;
		});
	} // EOF _showApproveConfirmDialog


    /* 公文傳送作業使用函式 */

    /* 草稿傳送前檢核, 若系統已有相同文號, 停止後續作業 */
    function _checkDocDuplicate(SAMLart, _docObj) {
        var _dfd = $.Deferred();
        if (_docObj.isDraft) {
            var _dfdGDI2 = $.Deferred(); // 2017.5.26 - Eric Peng, 1060327
            theWebServices.odmssp.getDocumentInfo2(SAMLart, _docObj.sourceOrgNo, _docObj.docNo, _dfdGDI2, {async:true})
            .then(function(rslt){
                if (rslt.success===true) {
                    if (rslt.todoList.length) {
                        _dfd.resolve({success:true, existDoc: true}); // 2017.5.26 - Eric Peng, 1060327
                    }
                    else {
                        if (!!_debug) {
                            _dfd.resolve({success:true, existDoc:true});
                        }
                        else {
                            _dfd.resolve({success:true, existDoc:false});
                        }
                    }
                }
                else {
                    var _dfd2 = $.Deferred();
                    _dfd2.reject(rslt);
                    return _dfd2.promise();
                }
            })
            .fail(function(rslt) {
                theLogger.error(rslt.errMsg);
                _dfd.reject(rslt);
            });
        }
        else {
             _dfd.resolve({success:true});
        }
        return _dfd.promise();
    }

    /* 2016.2 - 1050049 - 實作先閱功能 (來文簽辦+承辦前簽核)
     */
    function _shouldCreateRcvDocDraft(aol) {
        if (!!aol) {
            /* 最後一個<簽核點定義> */
            var signDefs = aol.getCurrFolio().getSignFolder().eCaps().capsCntn.eFile.aol.aolInfo.signDefs;
            var lastSignDef = (!!signDefs && signDefs.length) ? signDefs[signDefs.length-1] : null;
            if (lastSignDef==null) {
                /* 沒有任何簽核點定義 */
                return false;
            }
            
            var fromFolder = lastSignDef.obj.signInfo.fromFolder;
            if (typeof fromFolder==='undefined' || fromFolder==null) {
                /* 沒有來文 (無<來文文件夾>) */
                return false;
            }
            
            var fromDoc = fromFolder.fromDoc;
            if (typeof fromDoc==='undefined' || fromDoc==null) {
                /* 沒有來文 (無<來文>) */
                return false;
            }
            
            /* 取本流程有新增物件的 Draft or Attach (Draft含來文) */
            var arrCntr = aol.getCurrFolio().getChangedDraftOrAttachIDs();
            var i=0, j=0;
            var cntCntr = arrCntr.length;
            var cntAttach = (!!fromDoc.attachs) ? fromDoc.attachs.length : 0;
            var id = '', attach = null;
            for(i=0; i<cntCntr; i++) {
                id = arrCntr[i];
                if (!!id && id.length) {
                    if (id==='來文內容') {
                        theLogger.log('新增簽核物件在來文本文上, CntrId=' + id);
                        return true; /* 來文本文頁面有簽核物件 */
                    }
                    else {
                        for(j=0; j<cntAttach; j++) {
                            attach = fromDoc.attachs[j];
                            if (!!attach) {
                                if (attach.id==id) {
                                    theLogger.log('新增簽核物件在來文附件上, AOLObj Id=' + id);
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    } // EOF _shouldCreateRcvDocDraft
    
    /* 傳送前時將ODWMSG/ODWDCM/ODWWWKF內容上傳至server (SSOUtil.readOnlySubmit / SSOUtil.submitDocProcess叫用)
     * useODWMSG: true -> 取用_docObj.ODWMSG.WEB_SERVICE欄位值內容為公文電子檔路徑
     *            (預設使用docObj.fileIOWS欄位)
     */
    function _uploadDocInfo(_docObj, serverPath, useODWMSG) {
        if (typeof useODWMSG == 'undefined')
            useODWMSG = false;
            
        // 2019.7 - Eric Peng, 改為非同步叫用WebFileIO
        let _dfd = $.Deferred();

        var ODWMSG_XmlObj = null, ODWDCM_XmlObj = null;
        var failed = false;
        ODWMSG_XmlObj = SSOUtil.getODWMSG_XMLDOMObj(_docObj);
        if ((typeof ODWMSG_XmlObj=='undefined') || ODWMSG_XmlObj===null) {
            theLogger.error('-ERR- upload ODWMSG.XML failed. [ODWMSG_XmlObj==null]');
            _dfd.reject({success:false, _errMsg:'無法取得ODWMSG XML DOM物件.'})
            return _dfd.promise();
        }
        
        let _dfdODWMSG=null, _prmODWMSG=null;
        var wfio1=null, wfio2=null, _wsUrl='';
        if (!useODWMSG) {
            _wsUrl = _docObj.fileIOWS;
        }
        else {
            _wsUrl = _docObj.get('ODWMSG', 'WEB_SERVICE');
        }

        wfio1 = new WebFileIO(_wsUrl);
        // 2019.7 - Eric, 改為非同步
        wfio1.upload(serverPath, "ODWMSG.xml", ODWMSG_XmlObj)
        .then(function() {
            theLogger.log("-=ODWMSG.xml上傳完畢=-");

            let _dfdIn = $.Deferred();

            // 2016.9.21 - 若為[主辦待分辦]公文, 依設定
            if (_docObj.subfolder=='主辦待分辦') {
                var sShowEmpBeforeDisp = theSSO.User.EnvSettings.get('MP_SHOWEMP_BEFORE_DISP');
                if (typeof sShowEmpBeforeDisp=='string' && sShowEmpBeforeDisp.length) {
                    sShowEmpBeforeDisp = sShowEmpBeforeDisp.toLowerCase();
                    if (sShowEmpBeforeDisp=='y') {
                        _docObj.set2('aol', 'ODWDCM', {EMP_NAME:_docObj.toUserName});
                        theLogger.log('-I- SUBFOLDER=' + _docObj.subfolder + ', 設定ODWDCM.EMP_NAME值為:' + _docObj.toUserName);
                    }
                }
            }

            ODWDCM_XmlObj = SSOUtil.getODWDCM_XMLDOMObj(_docObj.getODWDCM());
            if ((typeof ODWDCM_XmlObj=='undefined') || ODWDCM_XmlObj===null) {
                theLogger.error('-ERR- upload ODWDCM.XML failed. [ODWDCM_XmlObj==null]');
                _dfdIn.reject({success:false, _errMsg:'無法取得ODWDCM XML DOM物件.'})
                return _dfdIn.promise();
            }

            wfio2 = new WebFileIO(_wsUrl);
            return wfio2.upload(serverPath, "ODWDCM.xml", ODWDCM_XmlObj);
        })
        .then(function() {
            theLogger.log("-=ODWDCM.xml上傳完畢=-")

            /* 2016.8 - Eric Peng, 儲存時將ODWWKF-XX.XML內容上傳至server */
            var _uploadWWKF = false;
            var ODWWKF_XmlObj = null;
            if (_docObj.isODWWKUpdated() && _docObj.getODWWKF()!==null) {
                ODWWKF_XmlObj = _docObj.getODWWKF_XMLDOMObj();
                _uploadWWKF = true;
            }

            if (_uploadWWKF) {
                let _dfdODWWKF=null, _prmODWWKF=null;

                _dfdODWWKF = $.Deferred();
                var wfio3 = new WebFileIO(_wsUrl);
                
                var thread = _docObj.get('ODWMSG', 'THREAD');
                if (typeof thread == 'string' && thread.length==1) {
                    thread = '0' + thread;
                }
                if (typeof thread !== 'string' || thread.length!==2) {
                    thread = '00';
                }
                var wwkfFilename = 'ODWWKF-' + thread + '.XML';
                return wfio3.upload(serverPath, wwkfFilename, ODWWKF_XmlObj);
            }
            else {
                let _dfdIn = $.Deferred();
                _dfdIn.resolve({success:true});
                return _dfdIn.promise();
            }
        })
        .then(function() {
            _dfd.resolve({success:true});
        })
        .fail(function(errRslt){
            theLogger.error('-ERR- _uploadDocInfo process failed.');
            _dfd.reject(errRslt);
        })
        return _dfd.promise();
    } // EOF _uploadDocInfo
       
    /* 儲存公文內容
     * (SSOUtil.readOnlySubmit / SSOUtil.submitDocProcess叫用)
     */
    function _saveMsg(SAMLart, _aol, _docObj, aolSubmitStatus) {
        /* 儲存整筆公文包括異動的文稿、DraftMgmt.xml、簽核物件、SignWork.xml
        * 2013.9.3 - 已完成簽核物件及SignWork.xml的上傳
        * 2013.9.13 - Raymond, 儲存公文改用getCurrFolio方法取得當前Model物件
        */
        var _dfd = $.Deferred();
        
        var tmBeginSaveView=null, tmBeginSave=null;
        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- currFolio.saveView() BEGIN...');
            tmBeginSaveView = Date.now();
        }
        
		// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫, saveView也改為非同步
		// 2014.10.21 - Raymond, 儲存時叫用FolioModel的saveView, 2016.7.19 新增回傳值, 若不是true要中止儲存作業
		//1060825	Leslie[1060515]	高港警需求，呼叫SaveView時增加傳入當前作業"傳送"文字
		//if(!_aol.getCurrFolio().saveView()) {
		//if(!_aol.getCurrFolio().saveView("傳送")) {
		//	_dfd.reject({success:false, errMsg:'叫用theAOL.getCurrFolio().saveView()回傳false.', _showError:false});
		//	return _dfd.promise();
		//}
		theAOL.getCurrFolio().saveView("傳送").done(function(res) {
			if(!res) {
				_dfd.reject({success:false, errMsg:'叫用theAOL.getCurrFolio().saveView()回傳false.', _showError:false});
			}
			else {
        
        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            let _log = SSOUtil.dev_getTimeElapseStr('currFolio.saveView()', tmBeginSaveView);
            theLogger.time(_log);
            
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- currFolio.save() BEGIN...');
            tmBeginSave = Date.now();
        }
        
        // 2016.9.17
        var extraOptions;
        if (typeof aolSubmitStatus=='object' && aolSubmitStatus!==null) {
            if (typeof aolSubmitStatus.inchargeSendBack=='boolean' && aolSubmitStatus.inchargeSendBack===true) {
                extraOptions =  {
                    delAllDrafts: true,
                };
                theLogger.warn('-W- before getCurrFolio().save() delAllDrafts==true');
            }
        }
        
		//1061018	Leslie[1060453]	配合鐵工客製化密件邏輯，將原儲存邏輯以函式打包，以避免程式執行順序異常
		var fm = _aol.getCurrFolio();
		var dlDeffer = [];
        function _doNormalSave(){
			// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
			var _saveEndCallback = null;
			//1140610	Leslie[1131183]	[Merge-1111006]新增應刪除檔案清單回傳值
			var _mustDelFiles = null;
	        _aol.getCurrFolio().save(extraOptions)
			// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
	        //.then(function() {
			//1140610	Leslie[1131183]	[Merge-1111006]新增應刪除檔案清單回傳值
	        // .then(function(saveEndCallback) {
	        .then(function(saveEndCallback, mustDelFiles) {
				if(!!saveEndCallback){
					_saveEndCallback = saveEndCallback;
					_mustDelFiles = mustDelFiles;	//1140610	Leslie[1131183]	[Merge-1111006]新增應刪除檔案清單回傳值
				}
	            if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    let _log = SSOUtil.dev_getTimeElapseStr('currFolio.save()', tmBeginSave);
	                theLogger.time(_log);
	            }
	                
	            var serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
                /* 傳送前時將ODWMSG/ODWDCM內容上傳至server */
                return _uploadDocInfo(_docObj, serverPath);

                // if (!_uploadDocInfo(_docObj, serverPath)) {
	            //     SSOUtil.loading('hide');
	            //     SSOUtil.toggleFuncButton(0x3, true);
	            //     _dfd.reject({success:false, errMsg:_errMsg});
	            //     return _dfd.promise();
	            // }
	        })
	        .then(function() {
	            // TODO: 叫用WebService更新公文狀態/傳送資料
	            theLogger.log('-I- theAOL.getCurrFolio.save() done.');
	            
	            // 叫用ODMSSP.saveMsg以儲存公文基資異動!
	            var rslt = null;
	            if (_docObj.isDraft) {
	                rslt = theWebServices.odmssp.saveDraftMsg(SAMLart, _docObj, {async:true});
	            }
	            else {
	                rslt = theWebServices.odmssp.saveMsg(SAMLart, _docObj.msgId, {async:true});
	            }
	            if (rslt.success===true) {
                    theLogger.log('-I- invoke ODMSSP.SaveMsg() succeeded.');
                    
                    // 2020.1.13 - 1080701 草稿儲存完須更新ODWDCM.LAST_UPDATE_PROG/LAST_UPDATE_TIME
                    if (_docObj.isDraft) {
                        if (typeof rslt.LastUpdateProg == 'string') {
                            _docObj.set2('aol', 'ODWDCM', {LAST_UPDATE_PROG:rslt.LastUpdateProg});
                        }
                        if (typeof rslt.LastUpdateTime == 'string') {
                            _docObj.set2('aol', 'ODWDCM', {LAST_UPDATE_TIME:rslt.LastUpdateTime});
                        }
                    }
					
					// 1070112 Raymond 1060452 鐵工局直屬長官傳送成功後刪除秘書簽辦意見檔
					if(_aol.getCurrFolio().getSignFolder().isSupervisor()) {
						theLogger.log('-I- 鐵工局直屬長官角色傳送成功後刪除秘書簽辦意見檔');
						var wfio = new WebFileIO(_docObj.fileIOWS);
						var serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
						wfio.del([{filePath: serverPath, fileName: "SecretarySignComment.xml"}])
							.done(function() {
								theLogger.log("SecretarySignComment.xml刪除成功");
							})
							.fail(function(res) {
								theLogger.error("SecretarySignComment.xml刪除失敗! " + res.errCode + ", " + res.errMsg);
							});
					}
					
					// 1100913 Raymond 1101143 若theAOL.getCurrFolio().save()有回傳callback function, 則再傳入
					if(!!_saveEndCallback) {
						//1140610	Leslie[1131183]	[Merge-1111006]新增應刪除檔案清單回傳值
						// _dfd.resolve(rslt, _saveEndCallback);
						_dfd.resolve(rslt, _saveEndCallback, _mustDelFiles);
					}
					else
	                _dfd.resolve(rslt);
	            }
	            else {
	                if (rslt.success!==true) {
	                    theLogger.error('-I- invoke ODMSSP.SaveMsg() failed. ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg);
                        
                        var _errMsg = '';
                        // 2018.1.15 - 1061276
                        var _checkDataErr = false;
	                    if (typeof rslt.checkDataErr=='boolean' && rslt.checkDataErr===true) {
                            _errMsg =  rslt.errMsg;
                            _checkDataErr = true;
                        }
                        else {
                            _errMsg = '叫用ODMSSP.SaveMsg失敗! ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg;
                        }

	                    SSOUtil.loading('hide');
	                    SSOUtil.toggleFuncButton(0x3, true);
	                    _dfd.reject({success:false, errMsg:_errMsg, checkDataErr: _checkDataErr}); // 2018.1.15 - 1061276
	                }
	            }
	        })
	        .fail(function(errorText) {
	            theLogger.error('_saveMsg failed, errMsg=' + errorText);
	            _dfd.reject({success:false, errMsg:errorText});
	            SSOUtil.loading('hide');
	            SSOUtil.toggleFuncButton(0x3, true);
	        });
		}
		
		//1060905	Leslie[1060453]	鐵工局客製化密件邏輯，改為一律提示另存新檔
		function dlSingle(idx) {
			var dfdSingle =  $.Deferred();
			var dname = fm.getDraftName(idx);
			var fname = fm.getDraftFileName(idx);
			theLogger.log("下載'" + dname + "' - '" + fname + "'");
			// 預設檔名用文號-序, 或UserID + MsgID + 序
			if(fm.getDocNo().length > 0)
				fname = fm.getDocNo() + "-" + Util.padLeft(idx + 1, 3) + ".xml";
			else
				fname = theUserInfo.UserID + "_" + fm.getMsgId() + "-" + Util.padLeft(idx + 1, 3) + ".xml";
			theLogger.log("預設下載檔名'" + fname + "'");
			
			fm.accquireDraftModel(idx)
				.done(function(dm) {
					var data = dm.accquireXml();
					var xml = Util.getXml(data, false, "UTF-8");	// 指定encoding屬性為UTF-8, 因為下載後的檔案會變成UTF-8
					theLogger.log("下載第" + i + "個文稿檔(" + fname + ")");
					var blob = new Blob([xml], {type: "application/octet-stream"});
					if("msSaveBlob" in navigator)	// IE10/11專屬下載function
						navigator.msSaveBlob(blob, fname);
					else {	// Chrome用A的click事件
						var url = URL.createObjectURL(blob);
						var $a = $("<a data-role='none' rel='external' data-ajax='false' download='" + fname + "' href='" + url + "'></a>").appendTo("body");
						$a[0].click();	// 2016.12.22	Leslie	改回DOM的標準Click，加上"[0]"
						$a.remove();
					}
				})
				.fail(function(errorText) {
					alert(errorText);
				});
		}
		
		if(_docObj.secret > '1' && theSSO.User.SystemSets.get('RRB_ENABLE_SCRECT_DOC_LOGIC') == 'Y'){
			
			var n = fm.getDraftCounts();
			for(var i=0; i<n; i++) {
				dlDeffer.push(dlSingle(i));
			}
			
			$.when.apply(this,dlDeffer).done(function(){
				//非列印的儲存，提示另存新檔後，清除稿件主旨
				dlDeffer.length = 0;
				if(window.confirm('所有稿件均已完成另存\r\n即將修訂「主旨」為"密不錄由"，並清除「段落」內容\r\n是否繼續傳送作業?')){
					for(var i=0;i<n;i++){
						dlDeffer.push(fm.accquireDraftModel(i).done(function(dm){
							// 1071023 Raymond 避免因簽稿會核單禁止非承辦人異動文稿等特殊限制, 造成傳送時轉圈圈問題
							if(!dm.getEditable())
								return;
										
							if(dm.nodes('//主旨/文字').length > 0){
								dm.text('//主旨/文字',"密不錄由");
							}
							var nd = dm.nodes('//段落');
							if(nd.length > 0){
								for(var j=0;j<nd.length;j++){
									//1061018	Leslie	增加處理段落中的<文字>
									var objTxt = $(nd[j]).find('文字')[0];
									if("text" in objTxt)	// for IE-compatible
										objTxt.text = "";
									else
										objTxt.textContent = "";
									
									$(nd[j]).find('條列').each(function(idx){
										var $txt = $(this).find('文字'); 
										if($txt.length){
											if("text" in $txt[0])	// for IE-compatible
												$txt[0].text = "";
											else
												$txt[0].textContent = "";
										}
										if(idx>0)
											$(this).remove();
									})
								}
							}
						}))
					}
					$.when.apply(this,dlDeffer).done(function(){
						$("#aol #leftPart .viewPort").find(".pages").flip("refresh");	// 重新整理頁面
						_doNormalSave();
					})
				}
				else{	//取消，不儲存，應復原相關UI
					SSOUtil.loading('hide');
					SSOUtil.toggleFuncButton(0x3, true);
					dfd.reject("使用者取消儲存作業。");
				}
			})
		}
		else
			_doNormalSave();
		//1061018	Leslie[1060453]	配合鐵工客製化密件邏輯，將原儲存邏輯以函式打包，以避免程式執行順序異常	--END--
				
			}	// 1081230 Raymond 1080194 end of else
		})	// 1081230 Raymond 1080194 end of saveView().done callback function
		.fail(function(errorText) {	// saveView().fail callback function
			_dfd.reject({success:false, errMsg:errorText});
		});
        return _dfd.promise();
    } // EOF _saveMsg

    /* 傳送前檢核公文基資欄位內容 */
    function _checkSuitable_PreSubmit(_docObj, _ruleOption, _errItem, _aol) {
        function jf_Trim(argStr) { 
            var StrLen    = argStr.length;
            var trimStr   = "";
            var returnStr = "";
        
            for (i = 0; i < StrLen ; i++) { 
                argStr.substring(i,i+1);
                trimStr = argStr.substring(i,i+1);
                if ((trimStr == " ") && (i != StrLen )) { trimStr = ""; }
                returnStr = returnStr + trimStr;
            }
            return  returnStr;
        }
        
        function _getRule(orgNo, signType, folder, subfolder) {
            var menuRule = SSOUtil.getMenuRule_Obj(localStorage.Artifact, orgNo, signType);
            if (!!menuRule) {
                return {rule: menuRule.getRule(folder, subfolder), ruleEnvSetting: menuRule.ruleEnvSetting};
            }
            return null;
        }
        
        function _doCancelCheck_AOL(_ruleEnvSet, _ruleOption, _docObj, tranDeskForCancel, _errItem) {
            var subfolder = _docObj.subfolder;
            var rtn = true;
            
            if (_ruleEnvSet.mainCancelSubfolder.indexOf(subfolder)!==-1 && (!tranDeskForCancel)) {
                if (_ruleOption._advancedCheck.indexOf('5')!==-1) { // 銷號原因
                    if (_docObj.get('ODWMSG', 'TX_REASON').length===0) {
                        _errItem.push('\n#銷號/改分原因不可為空白! [文件夾SUBFOLDER="' + subfolder + '"在 MainCancelSubfolder 內]');
                        rtn = false;
                    }
                    
                    if (_docObj.ODWDCM.COM_NO.length && _docObj.get('ODWDCM', "COMBINE_TYPE")=='1') {
                        _errItem.push('\n#此份公文尚有彙併辦之公文，不可傳送! [文件夾SUBFOLDER="' + subfolder + '" 在 MainCancelSubfolder 內]');
                        rtn = false;
                    }
                }
                return rtn;
            }
            else if (_docObj.get('ODWMSG', 'IS_OURCV')==='1') {
                if (_ruleOption._advancedCheck.indexOf('5')!==-1) {
                    var _sIsOURcv = _docObj.get('ODWMSG', 'TX_REASON');
                    if (_sIsOURcv.length===0) {
                        _errItem.push('銷號/改分原因不可為空白! [單位收文, IS_OURCV=' + _sIsOURcv + ']');
                        rtn = false;
                    }
                    
                    if (_docObj.ODWDCM.COM_NO.length && _docObj.get('ODWDCM', "COMBINE_TYPE")=='1') {
                        _errItem.push('\n#此份公文尚有彙併辦之公文，不可傳送! [單位收文]');
                        rtn = false;
                    }
                }
                return rtn;
            }
            else if (_ruleEnvSet.draftCancelByDesk=='Y' &&
                     _docObj.get('ODWMSG', 'NEW_BY_OU')=='Y') {
                if (_ruleOption._advancedCheck.indexOf('5')!==-1) {
                    if (_docObj.get('ODWMSG', 'TX_REASON').length===0) {
                        _errItem.push('\n#銷號/改分原因不可為空白! [創稿, 登記桌可銷號; NEW_BY_OU=' + _docObj.get('ODWMSG', 'NEW_BY_OU') + ', 環境變數:DraftCancelByDesk=Y]');
                        rtn = false;
                    }
                    
                    if (_docObj.ODWDCM.COM_NO.length && _docObj.get('ODWDCM', "COMBINE_TYPE")=='1') {
                        _errItem.push('\n#此份公文尚有彙併辦之公文，不可傳送! [創稿, 登記桌可銷號/改分; NEW_BY_OU=' + _docObj.get('ODWMSG', 'NEW_BY_OU') + ', 環境變數:DraftCancelByDesk=Y]');
                        rtn = false;
                    }
                }
                return rtn;
            }
            else if (_docObj.get('ODWMSG', 'DUE_DATE').length===0) {
                if (_ruleOption._advancedCheck.indexOf('5')!==-1) {
                    if (_docObj.get('ODWMSG', 'TX_REASON').length===0) {
                        _errItem.push('\n#銷號/改分原因不可為空白! [未出組室(DUE_DATE未設值)]');
                        rtn = false;
                    }
                    
                    if (_docObj.ODWDCM.COM_NO.length && _docObj.get('ODWDCM', "COMBINE_TYPE")=='1') {
                        _errItem.push('\n#份公文尚有彙併辦之公文，不可傳送! [未出組室(DUE_DATE未設值)]');
                        rtn = false;
                    }
                }
                return rtn;
            }
            else {
                var _sErr = '\n#銷號/改分檢查失敗! [不符合列出之所有銷號條件]:\n' +
						    '   1. SUBFOLDER=' + _docObj.subfolder + ' 不在 MainCancelSubfolder 內.\n' + 
						    '   2. 不為單位收文, IS_OURCV="' + _docObj.get('ODWMSG', 'IS_OURCV') +'".\n' +
                            '   3. 非創稿, 登記桌可銷號/改分, NEW_BY_OU="' + _docObj.get('ODWMSG', 'NEW_BY_OU') + '", 環境變數:DraftCancelByDesk="' + _ruleEnvSet.draftCancelByDesk + '".\n' +
                            '   4. 已出組室 DUE_DATE="' + _docObj.get('ODWMSG', 'DUE_DATE') + '"\n';
                _errItem.push(_sErr);
                return false;
            }
        }
        
        function _checkSuitable_PDoc(_docObj, _ruleOption, _errItem) {
            var rule = _getRule(_docObj.sourceOrgNo, 'P', _docObj.folder, _docObj.subfolder);
            if (rule===null) {
                _errItem.push('\n無法取得文件夾[' + _docObj.folder + '-' + _docOjb.subfolder + '] 的MPRule項目');
                return false;
            }
            
            var _ruleEnvSet = rule.ruleEnvSetting;
            
            var x=0, CheckItem = '';
            if (typeof _errItem == 'undefined' || _errItem===null) {
                _errItem = [];
            }
            
            for(x=0;x<_ruleOption.advancedCheck.length;x++)
            {
                CheckItem = _ruleOption.advancedCheck.substring(x, x+1);
                switch(CheckItem) {
                case "1":  	//主旨+文號
                    {
                        if (jf_Trim(_docObj.docNo)==="")
                            _errItem.push("\n#公文文號尚未要號");
                        if (jf_Trim(_docObj.subject)==="")
                            _errItem.push("\n#主旨不可為空白。");

						//1111222 David 銓敘部新增任審案需檢核任審身份證字號不可為空
						if (SSO_CONFIG.OrgNickName=='MOCS')
						{
							let sProperty = _docObj.get("ODWDCM", "DOC_PROPERTY");
							let sTADocProperty = theSSO.User.SystemSets.get("MOCS_TA_DOC_PROPERTY");
							let sTAPersonID = _docObj.get("ODWDCM", "PERSON_ID");
							if(sProperty == sTADocProperty && sTAPersonID == "")
								_errItem.push("\n#任審案需輸入任審人員身分證號。");
						}
                    }
                    break;
                case "2":	//分類號+案次號
                    {
                        if (jf_Trim(_docObj.get('ODWMSG', 'FILE_CLS'))==="")
                            _errItem.push("\n#分類號不可為空白。");
                            
                        // 檢核案次號
                        var checkFileCase = theSSO.User.EnvSettings.get('OD_CHECK_FILE_CASE');
                        if (checkFileCase.toUpperCase() == "Y") {
                            if(jf_Trim(_docObj.get('ODWMSG', 'FILE_CASE'))==="")
                                _errItem.push("\n#案次號不可為空白。");
                        }
                    }
                    break;
                case "3":	//保存年限
                    {
                        var sKeepYear = _docObj.get('ODWMSG', 'KEEP_YEAR');
                        if (jf_Trim(sKeepYear) === "")
                            _errItem.push("\n#保存年限不可為空白。");
                    }
                    break;
                case "4":	//檔案數量
                    {
                        var strFileCnt = _docObj.get('ODWMSG', 'FILE_CNT');
                        strFileCnt=strFileCnt.replace("0","");
                        if(jf_Trim(strFileCnt) === "" )
                            _errItem.push("\n#檔案數量不可為空白或0。");
                    }
                    break;
                case "5":	//銷號原因
                    {
                        var strTranMark = _docObj.get('ODWMSG', 'TX_REASON');
                        if(jf_Trim(strTranMark) === "")
                        {
                            _errItem.push("\n#銷號/改分原因不可為空白。");
                        }
            
                        //1040312 David 1040111 傳送銷號流程時，新增檢核彙併辦公文不可傳送
                        var cntComNo = _docObj.ODWDCM.COM_NO.length;
                        var strCombineType = _docObj.get('ODWDCM', 'COMBINE_TYPE');
                        if(cntComNo!==0 && strCombineType == "1")
                            _errItem.push("\n#此份公文尚有彙併辦公文，不可傳送。");
                    }
                    break;
                case "6":	//關鍵字
                    {
                        var strKeyWord = _docObj.get('ODWMSG', 'KEY_WORD');
                        if(jf_Trim(strKeyWord) === "")
                            _errItem.push("\n#關鍵字不可為空白。");
                    }
                    break;
                case "7":	//核決者剔退者擇一
                    {
                        var strAppName	= _docObj.get('ODWMSG', 'APP_USER_NAME');
                        var strRejectName	= _docObj.get('ODWMSG', 'REJECT_USER_NAME');
                        if (jf_Trim(strAppName) === "" && jf_Trim(strRejectName) === "")
                            _errItem.push("\n#核決者剔退者需擇一輸入。");
                    }
                    break;
                case "8":	//開會通知->開會日期
                    {
                        var sCheckTypeNo = theSSO.User.EnvSettings.get('OD_CHECKMEETDATE_BTYPENO');
                        var sBTypeNo = _docObj.get('ODWMSG', 'B_TYPE_NO');
                        if (sBTypeNo == sCheckTypeNo)
                        {
                            var sMeetDate= _docObj.get('ODWMSG', 'MEET_DATE');
                            if (jf_Trim(sMeetDate)==="")
                                _errItem.push("\n#開會日期不可空白。");
                        }				
                    }
                    break;
				//1120313	Leslie[銓敘部序124]	新增退文等特殊異動別時，增加檢核異動原因
				case "R":	//異動原因
                    {
                        var strTranMark = _docObj.get('ODWMSG', 'TX_REASON');
                        if (jf_Trim(strTranMark) === "")
                        {
                            _errItem.push(`\n#${_ruleOption.txName}原因不可為空白。`);
                        }
                    }
                    break;
                }
            }
            
            // 2016.12.5 - "F" 業務類別是否符合
            if (_ruleOption.specialCheck.indexOf('F')!==-1) {
                // 2016.12.5 - 1051175, FDA才會檢核核決者, 其它機關會在TSP作業中自動給值! (此時尚未設值)
                if (SSO_CONFIG.OrgNickName=='FDA' && _docObj.ODWMSG.APP_USER_NAME.length===0) {
                    _errItem.push("\n#核決者不可空白。");
                }
                
                if (_docObj.ODWMSG.COM_TYPE != '2') {
                    _errItem.push("\n#須為子文。");
                }
                
                sBTypeNoList = _ruleEnvSet.OD99CanApproveBTypeNo; // BTypeNoList string format: '52;11;14'
                if (sBTypeNoList.length) {
                   BTypeNoList = sBTypeNoList.split(';');
                }
                
				//2017.10.24 - 1060953 鐵工局如為彙辦公文，可使用承辦人自行決行
				var match = false;
				if (SSO_CONFIG.OrgNickName=='RRB' && _docObj.ODWDCM.COMBINE_TYPE_2 === "1"){
					match = true;
				}
				else
				{
  	            	match = false;
    	            for(i=0; i<BTypeNoList.length; i++) {
        	            var sBTypeNoT = BTypeNoList[i];
            	        if (sBTypeNoT.length) {
                	        if (sBTypeNoT==_docObj.ODWMSG.B_TYPE_NO) {
                    	        match = true;
                        	    break;
                        	}
                    	}
                	}
				}
                
                if (!match) {
                   _errItem.push("\n#業務類別不符合。");
                }
            }
            return (_errItem.length===0);
        }
        
        function _checkSuitable_EDoc(_docObj, _ruleOption, _errItem, _aol) {
            var rule = _getRule(_docObj.sourceOrgNo, 'E', _docObj.folder, _docObj.subfolder);
            if (rule===null) {
                _errItem.push('\n無法取得文件夾[' + _docObj.folder + '-' + _docOjb.subfolder + '] 的MPRule項目');
                return false;
            }
            
            var _ruleEnvSet = rule.ruleEnvSetting;
            
            var x=0, CheckItem = '';
            if (typeof _errItem == 'undefined' || _errItem===null) {
                _errItem = [];
            }
            
            var _rtn = true;
            if (_ruleOption._specialCheck.indexOf('C')!==-1) { // 銷號檢查[C]
                return _doCancelCheck_AOL(_ruleEnvSet, _ruleOption, _docObj, false, _errItem);
            }
            else if (_ruleOption._specialCheck.indexOf('D')!==-1) { // 線上簽核傳送分辦人員銷號異動別檢核 [D]
                return _doCancelCheck_AOL(_ruleEnvSet, _ruleOption, _docObj, true, _errItem);
            }
            else if (_ruleOption._specialCheck.indexOf('E')!==-1) { // 送研考人員銷號檢核
                if (_ruleOption._advancedCheck.indexOf('5')!==-1) { // 銷號原因
                    if (_docObj.get('ODWMSG', 'TX_REASON').length===0) {
                        _errItem.push('\n#銷號/改分原因不可為空白!');
                        _rtn = false;
                    }
                    
                    if (_docObj.ODWDCM.COM_NO.length && _docObj.get('ODWDCM', "COMBINE_TYPE")=='1') {
                        _errItem.push('\n#此份公文尚有彙併辦之公文，不可傳送!');
                        _rtn = false;
                    }
                }
                return _rtn;
            }
            
            for(x=0;x<_ruleOption._advancedCheck.length;x++) 
            {
                CheckItem = _ruleOption._advancedCheck.substring(x, x+1);
                switch(CheckItem) {
                case "1":  	//主旨+文號
                    {
                        if (jf_Trim(_docObj.docNo)==="")
                            _errItem.push("\n#公文文號尚未要號");
                        if (jf_Trim(_docObj.subject)==="")
                            _errItem.push("\n#主旨不可為空白。");

						//1111222 David 銓敘部新增任審案需檢核任審身份證字號不可為空
						if (SSO_CONFIG.OrgNickName=='MOCS')
						{
							let sProperty = _docObj.get("ODWDCM", "DOC_PROPERTY");
							let sTADocProperty = theSSO.User.SystemSets.get("MOCS_TA_DOC_PROPERTY");
							let sTAPersonID = _docObj.get("ODWDCM", "PERSON_ID");
							if(sProperty == sTADocProperty && sTAPersonID == "")
								_errItem.push("\n#任審案需輸入任審人員身分證號。");
						}
                    }
                    break;
                case "2":	//分類號+案次號
                    {
                        if (jf_Trim(_docObj.get('ODWMSG', 'FILE_CLS'))==="")
                            _errItem.push("\n#分類號不可為空白。");
                            
                        // 檢核案次號
                        var checkFileCase = theSSO.User.EnvSettings.get('OD_CHECK_FILE_CASE');
                        if (checkFileCase.toUpperCase() == "Y") {
                            if(jf_Trim(_docObj.get('ODWMSG', 'FILE_CASE'))==="")
                                _errItem.push("\n#案次號不可為空白。");
                        }
                    }
                    break;
                case "3":	//保存年限
                    {
                        var sKeepYear = _docObj.get('ODWMSG', 'KEEP_YEAR');
                        if (jf_Trim(sKeepYear) === "")
                            _errItem.push("\n#保存年限不可為空白。");
                    }
                    break;
                case "4":	//檔案數量
                    {
                        var strFileCnt = _docObj.get('ODWMSG', 'FILE_CNT');
                        strFileCnt=strFileCnt.replace("0","");
                        if(jf_Trim(strFileCnt) === "" )
                            _errItem.push("\n#檔案數量不可為空白或0。");
                    }
                    break;
                case "5":	//銷號原因
                    {
                        var strTranMark = _docObj.get('ODWMSG', 'TX_REASON');
                        if (jf_Trim(strTranMark) === "")
                        {
                            _errItem.push("\n#銷號/改分原因不可為空白。");
                        }
            
                        //1040312 David 1040111 傳送銷號流程時，新增檢核彙併辦公文不可傳送
                        var cntComNo = _docObj.ODWDCM.COM_NO.length;
                        var strCombineType = _docObj.get('ODWDCM', 'COMBINE_TYPE');
                        if(cntComNo!==0 && strCombineType == '1')
                            _errItem.push("\n#此份公文尚有彙併辦公文，不可傳送。");
                    }
                    break;
                case "6":	//關鍵字
                    {
                        var strKeyWord = _docObj.get('ODWMSG', 'KEY_WORD');
                        if(jf_Trim(strKeyWord) === "")
                            _errItem.push("\n#關鍵字不可為空白。");
                    }
                    break;
                case "7":	//核決者剔退者擇一
                    {
                        var strAppName	= _docObj.get('ODWMSG', 'APP_USER_NAME');
                        var strRejectName	= _docObj.get('ODWMSG', 'REJECT_USER_NAME');
                        if (jf_Trim(strAppName) === "" && jf_Trim(strRejectName) === "")
                            _errItem.push("\n#核決者/剔退者需擇一輸入。");
                    }
                    break;
                case "8":	//開會通知->開會日期
                    {
                        var sCheckTypeNo = _ruleEnvSet.checkMeetDateBTypeNo;
                        var sBTypeNo = _docObj.get('ODWMSG', 'B_TYPE_NO');
                        if (sBTypeNo == sCheckTypeNo)
                        {
                            var sMeetDate= _docObj.get('ODWMSG', 'MEET_DATE');
                            if (jf_Trim(sMeetDate)==="") {
                                _errItem.push("\n#開會日期不可空白。");
                            }
                            else if (jf_Trim(sMeetDate).length!==7) {
                                 _errItem.push('\n#開會日期格式錯誤:"' + sMeetDate +'"');
                            }
                        }				
                    }
                    break;
				//1120313	Leslie[銓敘部序124]	新增退文等特殊異動別時，增加檢核異動原因
				case "R":	//異動原因
                    {
                        var strTranMark = _docObj.get('ODWMSG', 'TX_REASON');
                        if (jf_Trim(strTranMark) === "")
                        {
                            _errItem.push(`\n#${_ruleOption.txName}原因不可為空白。`);
                        }
                    }
                    break;
                case "G":	// 檢核併同歸檔數量設定是否正確
                    {
                        var sIsRcvFile = _docObj.get('ODWMSG', 'IS_RCVFILE').toLowerCase();
                        if (sIsRcvFile==='1') {
                            var sRcvFileCnt = _docObj.get('ODWMSG', 'RCVFILE_CNT');
                            var _cntRcvFile = -1;
                            if (sRcvFileCnt.length) {
                                _cntRcvFile = parseInt(sRcvFileCnt);
                            }
                            
                            if (_cntRcvFile<=0) {
                                 _errItem.push('\n#紙本來文須併同歸檔，但未設定頁數! (請於公文基資頁修改設定)');
                            }
                        }				
                    }
                    break;
                case 'I':
                    if (_docObj.get('ODWDCM', 'COORG_NO').length===0 && _docObj.get('ODWDCM', 'COORG_NAME').length===0) {
                        _errItem.push('\n#會簽機關尚未設定! (請於流程設定子視窗修改設定)');
                    }
                    break;
                case 'K':
                    if (_docObj.get('ODWDCM', 'COSIGN_TYPE')!=='1' || _docObj.get('ODWMSG', 'DOC_STATE')!=='01') {
                        _errItem.push('\n#須為送外機關會簽公文才能使用此異動別! (請於流程設定基資子視窗修改會簽設定)');
                    }
                    break;
                case 'L': // 2017.8.24 - Eric, 1060512 檢核前檢核公文是否有文字意見
                    {
                        if (typeof theAOL=='undefined' || typeof theAOL.signComment=='undefined'){
                            _errItem.push('\n#無法取得本流程點文字意見! (內部錯誤!)');
                        }
                        else {
                            var signComment = theAOL.signComment();
                            if (typeof signComment!='string' || signComment.length===0) {
                                _errItem.push('\n#為確保承辦人了解您的批核意見，請以文字意見工具進行簽核，或按「簽辦意見」、「傳送設定」鈕輸入您的簽核意見，再進行傳送動作');
                            }
                        }
                    }
                    break;
                }
            }
            
            // 2016.12.8 - "F" 業務類別是否符合 (支援線上公文)
            if (_ruleOption.specialCheck.indexOf('F')!==-1) {
                // 2016.12.5 - 1051175, FDA才會檢核核決者, 其它機關會在TSP作業中自動給值! (此時尚未設值)
                if (SSO_CONFIG.OrgNickName=='FDA' && _docObj.ODWMSG.APP_USER_NAME.length===0) {
                    _errItem.push("\n#核決者不可空白。");
                }
                
                if (_docObj.ODWMSG.COM_TYPE != '2') {
                    _errItem.push("\n#須為子文。");
                }
                
                sBTypeNoList = _ruleEnvSet.OD99CanApproveBTypeNo; // BTypeNoList string format: '52;11;14'
                if (sBTypeNoList.length) {
                   BTypeNoList = sBTypeNoList.split(';');
                }
                
				//2017.10.24 - 1060953 鐵工局如為彙辦公文，可使用承辦人自行決行
				var match = false;
				if (SSO_CONFIG.OrgNickName=='RRB' && _docObj.ODWDCM.COMBINE_TYPE_2 === "1"){
					match = true;
				}
				else
				{
        	        match = false;
            	    for(i=0; i<BTypeNoList.length; i++) {
                	    var sBTypeNoT = BTypeNoList[i];
                    	if (sBTypeNoT.length) {
                        	if (sBTypeNoT==_docObj.ODWMSG.B_TYPE_NO) {
                            	match = true;
                            	break;
                        	}
                    	}
                	}
				}
                
                if (!match) {
                   _errItem.push("\n#業務類別不符合。");
                }
            }
            
            // 2021.3.15 - 1090854/1090836 Eric, 客委會公文: 1. 出組室前檢核是否有文稿, 2.傳送前檢核公文核決狀態是否符合核判區分
            // => 此處 signType必為'E', 故不再檢核!
            if (theUserInfo.OrgNickName==='HAC' && (typeof _aol !== 'undefined') && _aol!==null) {
                // 1. 1090854 出組室前檢核是否有文稿
                let newByOU = _docObj.get('ODWMSG', 'NEW_BY_OU');
                let ICOUId_Lv1 = _docObj.ICOUId;
                let OwnOUId_Lv1 = _docObj.ownOUId;
                if (ICOUId_Lv1.length>sso_const.FIRSTCLASS_UNITNO_LEN) {
                    ICOUId_Lv1 = ICOUId_Lv1.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN);
                }
                if (OwnOUId_Lv1.length>sso_const.FIRSTCLASS_UNITNO_LEN) {
                    OwnOUId_Lv1 = OwnOUId_Lv1.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN);
                }
                let toOUId_Lv1 = _aol.nextTarget.OUId;
                if (toOUId_Lv1.length>sso_const.FIRSTCLASS_UNITNO_LEN) {
                    toOUId_Lv1 = toOUId_Lv1.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN);
                }

                // 來文公文, 目前在組室內.
                if (newByOU=='N' && ICOUId_Lv1==OwnOUId_Lv1) {
                    if (toOUId_Lv1!==sso_const.UNIT_RECEIVE && // 總收
                        toOUId_Lv1!==sso_const.UNIT_RDEXAM &&  // 研考
                        toOUId_Lv1!==sso_const.UNIT_FILEROOM && // 檔管
                        toOUId_Lv1!==ICOUId_Lv1) {
                        let cntDraft = _aol.getCurrFolio().getSignFolder().getDraftCounts();	// 只找文稿頁面
                        if (_aol.getCurrFolio().getSignFolder().hasFromDoc()) {
                            --cntDraft;	// 檢核標的不含來文(或來文文稿), 來文的index是最後一個
                        }
                        if (cntDraft<1) {
                            // '本份公文未擬稿，請調整後再行傳送。';
                            _errItem.push("\n#本份公文未擬稿，請調整後再行傳送。");
                        }
                    }
                }

                // 2. 1090836 傳送前檢核公文核決狀態是否符合核判區分
                let cancelAppEnable = _docObj.get('ODWDCM', 'CANCEL_APP_ENABLE');
                if (cancelAppEnable=='Y') {
                    let draftAppRole = _docObj.get('ODWDCM', 'DRAFT_APP_ROLE');
                    let approved = (_docObj.get('', 'APP_USER_ID').length || _docObj.get('', 'APP_ROLE_ID').length) ? true : false;
					//1100820 David 新增判斷不應核決但核決的檢核，調整邏輯
                    /*if (draftAppRole.length && approved===false) {
                        if (_docObj.ownRoleId==draftAppRole) {
                            _errItem.push("\n#目前公文核決層級設定為您批准，如要繼續陳核請調整核判區分。");
                        }
                    }*/
					if (draftAppRole.length) {
						if( approved===false && _docObj.ownRoleId==draftAppRole) {
							//1101116 David 1101147 新增判斷有設定應核決未核決檢核異動別時，符合的異動別再進行檢核
							let strCheckDraftAppTxName = theSSO.User.SystemSets.CHECK_DRAFT_APP_TXNAME;
							if(typeof strCheckDraftAppTxName !== 'undefined' && strCheckDraftAppTxName != "")
							{
								let arrCheckDraftAppTxName = strCheckDraftAppTxName.split(';');
								if(arrCheckDraftAppTxName.indexOf(theAOL.docObj.txName) != -1)
									_errItem.push("\n#目前公文核決層級設定為您批准，如要繼續陳核請調整核判區分。");
							}
							else
								_errItem.push("\n#目前公文核決層級設定為您批准，如要繼續陳核請調整核判區分。");
						}
						else if(approved===true && _docObj.get('', 'APP_ROLE_ID') !== draftAppRole) {
							_errItem.push("\n#目前公文核決層級設定非您可批准，請調整核判區分或取消核決。");
						}
                    }
                }
            }

            return (_errItem.length===0);
        }

        //1140925   Leslie[1140759] 北榮新增傳送前檢核，僅簽核會核單時不允許陳核至一層決行
        if(SSO_CONFIG.OrgNickName == "TPVGH"){
            let OUId = _docObj.toOUId;
            OUId = (OUId.length>sso_const.FIRSTCLASS_UNITNO_LEN)?OUId.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN):OUId;
            if (OUId.length) {
                if (OUId>=sso_const.APPROVEUNIT_NUM) {  //傳送至一層決行單位
                    if(_docObj.get('ODWMSG', 'DRAFT_TYPE') === '1')
                        _errItem.push("\n#本份公文僅有簽稿會核單，不允許陳核至院部長官。");

                    //1141030 Leslie[1140855]	新增北榮稿件決行層次的傳送前檢核
                    let approved = (_docObj.get('', 'APP_USER_ID').length || _docObj.get('', 'APP_ROLE_ID').length) ? true : false;
                    if(!approved){
                        if(_docObj.get('ODWMSG', 'DRAFT_MAX_APPLVL') != '1')
                            _errItem.push("\n#決行層級設定非院部長官，不允許直接陳核傳送。");
                    }
                }
			}
        }
         
        if (_docObj.signType=='E') {
            return _checkSuitable_EDoc(_docObj, _ruleOption, _errItem, _aol);
        }
        else if (_docObj.signType=='P') {
            return _checkSuitable_PDoc(_docObj, _ruleOption, _errItem);
        }
        theLogger.warn('-W- _checkSuitable_PreSubmit() invalid signType="' + _docObj.signType + '", docNo=' + _docObj.docNo);
        _errItem.push('無效的SignType:' + _docObj.signType);
        return false;
    } // EOF _checkSuitable_PreSubmit
    
    /* 2017.8.25 - 1060728, 最後一流程傳送前提示核決設定 */
    // 2019.6 - Eric Peng, 確認未使用 (最後方案由ODTSP執行檢核)
    // function _showLastSiteWarningMsg(_aol, _docObj) {
    // } // EOF _showLastSiteWarningMsg

    /* 2017.8.25 - 1060728, 傳送前線上簽核封裝內容檢核 */
    function _checkEDocContent_PreSubmit(_aol) {
        var _dfdIn = $.Deferred();

        var _theDocObj = _aol.docObj;
        if (_theDocObj.signType!=='E') {
            _dfdIn.reject({success:false, _errMsg:'非線上簽核公文要求執行傳送前檢核!'});
            return _dfdIn.promise();
        }

        var _isApproved = (_theDocObj.get('ODWMSG', 'APP_USER_ID').length || _theDocObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
        var fWWKFMark = (_theDocObj.get('ODWMSG', 'WWFK_MARK')=='1')? true : false; // ToDo: 2019.7 - Eric Peng, 正確欄位應為'WWKF_MARK'
        if (fWWKFMark && _isApproved) {
            return showLastSiteWarningMsg(); //_showLastSiteWarningMsg(); ToDo: 2019.7 - Eric Peng, 改為正確函式名稱? 目前是否有效? 使用時機確認!
        }
        _dfdIn.resolve({success:true, _continue:true});
        return _dfdIn.promise();
    } // EOF _checkEDocContent_PreSubmit

    /* 2021.9.15 - 1090862 Eric, 歸檔傳送前檢核若公文有可發文文稿且未發文, 須提示使用者決定是否傳送 */
    function _checkDocIssueStatus_PreSubmit(_aol, _async) {
        let _dfdIn = $.Deferred();

        let _theDocObj = _aol.docObj;
        let signType = _theDocObj.signType;

        // 總上/紙本公文 + 客委會需求功能
        if (SSO_CONFIG.OrgNickName!=='HAC' || (signType!=='E' && signType!=='P')) {
            if (_async) {
                _dfdIn.resolve({success:true, _continue:true});
                return _dfdIn.promise();
            }
            return true;
        }

        // 歸檔傳送異動別清單[系統參數]
        let targetTXs = theSSO.User.SystemSets.get('ARC_TX_NAME').split(';');
        if (targetTXs.length==0) {
            if (_async) {
                _dfdIn.resolve({success:true, _continue:true});
                return _dfdIn.promise();
            }
            return true;
        }

        let closeMsgId = _theDocObj.get('ODWDCM', 'CLOSE_MSG_ID');
        
        // 檢核(1)是否未執行發文資料更新, (2)異動別是否為指定的歸檔異動別!
        let fSend = (closeMsgId!=='' && closeMsgId!=='0')?true:false; // ODWDCM.CLOSE_MSG_ID值不為空字串且不為'0'=>已發文!
        if (fSend || _theDocObj.txName=='' || targetTXs.indexOf(_theDocObj.txName)==-1) {
            // 已發文或異動別不符, 毋須檢核!
            if (_async) {
                _dfdIn.resolve({success:true, _continue:true});
                return _dfdIn.promise();
            }
            return true;
        }

        theLogger.log('-I- DocNo=' + _theDocObj.docNo + ' closeMsgId=' + closeMsgId + ', txName=' + _theDocObj.txName + ' => 未發文送歸檔公文!');

        let closeTypeSendDraftTypes = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").split(";");
        let n = 0;
        if (signType=='E') {
            n = _aol.getCurrFolio().getSignFolder().getDraftCounts();
        }
        else if (signType=='P') {
            n = _aol.getCurrFolio().getDraftCounts();
        }

        let showConfirm = false;
        for (i=0; i<n; i++) {
            let draftType = _aol.getCurrFolio().getDraftDocType(i);
            if (closeTypeSendDraftTypes.indexOf(draftType)!=-1) {
                theLogger.log('-I- 有可發文稿件類型:' + draftType + ', 須提示使用者.')
                showConfirm = true;
                break;
            }
        }

        let confirmRslt = true;
        if (showConfirm) {
            confirmRslt = confirm('稿件內包含可發文之文別且尚未送繕發文，是否仍需送歸檔？');
            //confirm('稿件內包含可發文之文別且尚未送繕發文，是否仍需送歸檔？');
        }

        if (_async) {
            if (confirmRslt==true) {
                _dfdIn.resolve({success:true, _continue:true});
            }
            else {
                _dfdIn.reject({success:false, _continue:false});
            }
            return _dfdIn.promise();
        }
        return confirmRslt;
    }
    
    function _getAOLSubmitStatus(_aol, _docObj) {
        /* 2017.11.15 - 1061105 */
        function _getMsgIdFromAolFlowId(flowId) {
            var sPrefix = 'FLOW_';
            var msgId = '';
            if (flowId.indexOf(sPrefix)===0) {
                msgId = flowId.substr(sPrefix.length);
                return msgId;
            }
        
            // 非預期格式, 回傳AOL	
            return '';
        }

        // 2020.8.4 - 1090409 Eric, 判定本此傳送是否須匯出抄本頁面 (異動公文封裝檔文稿內容)
        function _shouldGenFormalPage(_docObj) {
            let _folderStr = _docObj.folder + '-' + _docObj.subfolder;

            /* _matchGenFormalFolder */
            function _matchGenFormalItem(item, index, theArray) {
                let _setting = item.split('|');
                if (!!_setting && _setting.length == 2) {
                    if (_folderStr == _setting[0] && _docObj.txName == _setting[1]) {
                        return true;
                    }
                }
                return false;
            }

            // 2020.7.30 - 1090409 Eric
            // (1)公文FOLDER,SUBFOLDER,TX_NAME是否符合AOL_GEN_FORMAL_FOLDER_TXNAME_FORCE設定
            let _genFormalPage = false;

            // 2021.3.9 - 1090409 Eric, bug-fix 結案類型為存查則不產生抄本!
            if (_docObj.get('ODWMSG', 'CLOSE_TYPE')=='3') {
                return _genFormalPage;
            }

            let sFroceGenFormalFolder = theSSO.User.EnvSettings.get('AOL_GEN_FORMAL_FOLDER_TXNAME_FORCE');
            if (typeof sFroceGenFormalFolder == 'string' && sFroceGenFormalFolder.length) {
                // for dev test
                if (SSOUtil.isValueTrue(localStorage['dev_debugForceGenFormal'])) {
                    let _extraSetting = _folderStr + '|' + _docObj.txName + ';';
                    if (sFroceGenFormalFolder.slice(-1) !== ';') {
                        sFroceGenFormalFolder += ';'
                    }
                    sFroceGenFormalFolder += _extraSetting;
                }

                let forceGenFormalFolders = sFroceGenFormalFolder.split(';');
                if (Array.isArray(forceGenFormalFolders) && forceGenFormalFolders.length) {
                    _genFormalPage = forceGenFormalFolders.some(_matchGenFormalItem);
                }

                if (_genFormalPage) {
                    theLogger.log('-I- _getAOLSubmitStatus() DocNo=' + _docObj.docNo + ' 傳送時產出抄本頁面, folderStr=' + folderStr + ', TxName=' + _docObj.txName + '符合[AOL_GEN_FORMAL_FOLDER_TXNAME_FORCE].');
                }
            }

            // (2) 公文[FOLDER,SUBFOLDER,TX_NAME是否符合AOL_GEN_FORMAL_FOLDER_TXNAME_OPTION設定] 且 [有異動可發文文稿]
            if (!_genFormalPage) {
                let sOptionalGenFormalFolder = theSSO.User.EnvSettings.get('AOL_GEN_FORMAL_FOLDER_TXNAME_OPTION');
                if (typeof sOptionalGenFormalFolder == 'string' && sOptionalGenFormalFolder.length) {
                    // for dev test
                    if (SSOUtil.isValueTrue(localStorage['dev_debugOptionalGenFormal'])) {
                        let _extraSetting = _folderStr + '|' + _docObj.txName + ';';
                        if (sFroceGenFormalFolder.slice(-1) !== ';') {
                            sFroceGenFormalFolder += ';'
                        }
                        sFroceGenFormalFolder += _extraSetting;
                    }

                    let optionalGenFormalFolders = sOptionalGenFormalFolder.split(';');
                    if (Array.isArray(optionalGenFormalFolders) && optionalGenFormalFolders.length) {
                        let _matched = optionalGenFormalFolders.some(_matchGenFormalItem);
                        if (_matched) {
                            let isSendDraftModified = _aol.getCurrFolio().isSendDraftContentChanged(); // 公文可發文文稿是否異動.
                            if (isSendDraftModified) {
                                theLogger.log('-I- _getAOLSubmitStatus() DocNo=' + _docObj.docNo + ' 傳送時產出抄本頁面, folderStr=' + folderStr + ', TxName=' + _docObj.txName + '符合[AOL_GEN_FORMAL_FOLDER_TXNAME_OPTION]且可發文文稿有異動.');
                                _genFormalPage = true;
                            }
                        }
                    }
                }
            }
            return _genFormalPage;
        }

        var folderStr = _docObj.folder + '-' + _docObj.subfolder;
        var submitStatus = {
            updateEnvelope: true,
            atNotSignList: false,
            docModified: true,
            inchargeSendBack: false, // 承辦流程退文....(docIncharge + 退文txName)
        };
        
        if (typeof folderStr=='string' && folderStr.length) {
            var sEnveExcludeFolder = theSSO.User.EnvSettings.get('AOL_ENVE_EXCLUDE_FOLDERS');
            if (typeof sEnveExcludeFolder == 'string' && sEnveExcludeFolder.length) {
                var enveExcludeFolders = sEnveExcludeFolder.split(';');
                if (enveExcludeFolders.indexOf(folderStr)!=-1) {
                    submitStatus.updateEnvelope = false;
                }
            }
            
            var sNotSignList = theSSO.User.EnvSettings.get('OD_AOL_NOTSIGNLIST');
            if (typeof sNotSignList == 'string' && sNotSignList.length) {
                var notSignFolders = sNotSignList.split(';');
                if (notSignFolders.indexOf(folderStr)!=-1) {
                    submitStatus.atNotSignList = true;
                }
            }
            
            if (!_aol.getCurrFolio()) {
                theLogger.error('ERROR! _getAOLSubmitStatus() invoke theAOL.getCurrFolio() return false.');
                return null;
            }
            
            // 檢核公文內容是否異動(封裝檔相關:文稿及簽核物件)
            submitStatus.docModified = _aol.getCurrFolio().isContentChanged();

            // 2020.8.4 - 1090409 Eric, 是否匯出抄本頁面
            submitStatus.genFormalPage = _shouldGenFormalPage(_docObj); 
                     
            // 檢核是否為首次承辦 => 沒有任何文稿!
            // 首次承辦判定: (1)在承辦文件夾[AOL_INCHARGE_FOLDER], (2)本流程之前, 除了來文文稿外,沒有其它文稿
            var atInchargeFolder=false, firstIncharge=false;
            var sInchargeFolder = theSSO.User.EnvSettings.get('AOL_INCHARGE_FOLDER');
            if (typeof sInchargeFolder == 'string' && sInchargeFolder.length) {
                var inchargeFolders = sInchargeFolder.split(';');
                if (inchargeFolders.indexOf(folderStr)!=-1) {
                    atInchargeFolder = true;
                }
            }
            
            if (atInchargeFolder) {
                firstIncharge = _aol.getCurrFolio().isFirstSign();
            }
            
            if (firstIncharge) {
                // AOL_INCHARGE_SUBMIT_TXNAME
                var sSubmitTxName = theSSO.User.EnvSettings.get('AOL_INCHARGE_SUBMIT_TXNAME');
                if (typeof sSubmitTxName == 'string' && sSubmitTxName.length) {
                    var submitTxNames = sSubmitTxName.split(';');
                    if (submitTxNames.indexOf(_docObj.txName)==-1) { // 2016.9.7 - 不符合者為退文
                        submitStatus.inchargeSendBack = true;
                    }
                }
            }

            // 2017.11.14 - 1061105, 若封裝檔內已有本流程封裝內容, 但此次傳送判定未異動, 則應強制執行重新封裝作業!
            if (submitStatus.atNotSignList && !submitStatus.docModified) {
                var aolFlows = _aol.signFolder.getAolFlow();
                
                var idxFlow=0, cntFlow=aolFlows.flows.length;
                var aolFlow=null, flowMsgId='';
                var todoMsgId=_docObj.msgId;
                for(idxFlow=0; idxFlow<cntFlow; idxFlow++) {
                    aolFlow=null; flowMsgId=''; // reset
                    aolFlow = aolFlows.flows[idxFlow];
                    flowMsgId = (!!aolFlow) ? _getMsgIdFromAolFlowId(aolFlow.id) : '';
                    if (flowMsgId.length && (flowMsgId===todoMsgId)) {
                        // 2017.11.10 - 1061105, 若封裝檔已有本流程之封裝內容, 但本次傳送判定毋須異動封裝檔 
                        // *** 本次實作採重新封裝方案!!!
                        submitStatus.docModified = true;
                    }
                }
            }
            return submitStatus;
        }
        return null;
    } // EOF _getAOLSubmitStatus
    
    /* 2017.8.23 - 1060823, 取得公文是否為承辦狀態資訊 */
    function _getInchargSubmitInfo(_theDocObj) {
        if (typeof _theDocObj=='undefined' || _theDocObj===null) {
            return null;
        }

        var rslt = {
            docIncharge: false,
            docFolder: '',
            submitTx: false,
            submitTxName: ''
        };

        var _docIncharge=false, _submitTx=false;
        var sInchargeFolders=theSSO.User.EnvSettings.get('AOL_INCHARGE_FOLDER');
        var inchargeFolders = [];
        if (typeof sInchargeFolders=='string' && sInchargeFolders.length) {
            inchargeFolders = sInchargeFolders.split(';');
        }

        // 判定是否在承辦公文夾
        var _docFolder = _theDocObj.folder + '-' + _theDocObj.subfolder;
        var idx=0, _folder='';
        for(idx=0; idx<inchargeFolders.length; idx++) {
            _folder = inchargeFolders[idx];
            if (_folder==_docFolder) {
                _docIncharge = true;
                rslt.docIncharge = true;
                rslt.docFolder=_folder;
                break;
            }
        }

        // 判定是否為[送請簽核]異動別(送內會也算)
        var sInchageSubmitTx='', sSubmitTx='';
        var docSubmitTx = _theDocObj.txName;
        if (_docIncharge) {
            sInchageSubmitTx=theSSO.User.EnvSettings.get('AOL_INCHARGE_SUBMIT_TXNAME');
            var submitTxList = sInchageSubmitTx.split(';');
            if (typeof submitTxList=='object' && submitTxList.length) {
                for(idx=0; idx<submitTxList.length; idx++) {
                    sSubmitTx = submitTxList[idx];
                    if (sSubmitTx.length && sSubmitTx==docSubmitTx) {
                        rslt.submitTx=true;
                        rslt.submitTxName=sSubmitTx;
                        break;
                    }
                }
            }
        }
        return rslt;
    } // EOF _getInchargSubmitInfo

    /* 取得 pincode (顯示 Pincode dialog)
        * (1) tempCert=true, 軟體憑證的pincode (Server加簽用!)
        * (2) tempCert=false, SmartCard的pincode (PC加簽用!)
        */
    function _getPincode(_aol, certType, submitSign) {
        var _dfdPincode = $.Deferred(); // 2017.2.13 - button-click callback會使用, 故先宣告!
        theSSO.MP.dlgPincodeDeferred = _dfdPincode;
        theSSO.MP.canUseTempSoftCert = false; // 2017.5.12 - Eric Peng, 1060309
		theSSO.MP.canUseFormalSoftCert = false;	// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
        
        function _cbOkBtnClicked(event) {
            var $dlg = $('#dlgPincode');
            var pincode = $dlg.find('#pincodeText')[0].value;
            var useTmpCert = $dlg.find('#useTmpCert').prop('checked'); // 2017.1.24 - 使用軟體臨時憑證
			var useFormalSoftCert = theSSO.MP.canUseFormalSoftCert;	// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
			//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]，SSO_CONFIG.enableMobileMoica
			var useMobileMoica = $dlg.find('#useMobileMoica').prop('checked');	
            //1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
			if(useMobileMoica){
				var fidoCert = theSSO.User.Certs.find(function(o){return o.isFido == true;})
				if(fidoCert != undefined){
					var moicaAPI = $dlg.find('#apiMode').val();
					theSSO.MP.dlgPincodeDeferred.resolve({success:true, rslt:'useMoibleMoica', 'verifyMode':moicaAPI});
				}
				else
					alert('找不到行動自然人憑證');
			}
            else if (pincode.length) {
				// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
                // theSSO.MP.dlgPincodeDeferred.resolve({success:true, rslt:'ok', password:pincode, 'useTmpCert':useTmpCert});
                theSSO.MP.dlgPincodeDeferred.resolve({success:true, rslt:'ok', password:pincode, 'useTmpCert':useTmpCert, 'useFormalSoftCert': useFormalSoftCert});
                //$(document).off('click', '#dlgPincode a#OKBtn', _cbOkBtnClicked);
            }
            else { // 2017.2.13
                if (useTmpCert) {
                    alert('請輸入軟體臨時憑證金鑰密碼!');
                }
                else {
					// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
					if(useFormalSoftCert)
						alert('請輸入「軟體正式憑證」金鑰密碼!');
					else
                    alert('請輸入憑證智慧卡金鑰密碼!');
                }
                event.preventDefault();
            }
        }
        
        function _cbCancelBtnClicked() {
            var $dlg = $('#dlgPincode');
            //1080118 Kevin 1080049 修正Client Server Empty Password
            theSSO.MP.dlgPincodeDeferred.resolve({success: true, rslt:'cancel', password:theSSO.Artifact});
            //$(document).off('click', '#dlgPincode a#CancelBtn', _cbCancelBtnClicked);
        }

        // 2019.7 - Eric, _canUseTempSoftCert只有此處用到, 移入
        // 是否可使用軟體臨時憑證
		// 1130812	Leslie[1130466]	修改檢查軟體憑證函式，改為可依傳入參數決定查找正式或臨時憑證
        // function _canUseTempSoftCert() {
        function _canUseSoftCertByType(softCertType) {
            var i=0, cntCert=0, cert=null;
            if (SSOUtil.typeOf(theSSO.User.Certs)=='array' && theSSO.User.Certs.length) {
                cntCert = theSSO.User.Certs.length;
                for(i=0; i<cntCert; i++) {
                    cert = theSSO.User.Certs[i];
					// 1130812	Leslie[1130466]	修改檢查軟體憑證函式，改為可依傳入參數決定查找正式或臨時憑證
                    // if (cert.softCert===true && cert.tempCert===true) {
                    if (cert.softCert===true && cert.tempCert === (softCertType == 'tempCert')) {
                        return true;
                    }
                }
            }
            return false;
        }
        
        if ((typeof certType == 'undefined') || certType===null || certType==='') {
            certType = 'SCardCert';
        }
        
        // 2017.1.24 - 確認是否可使用軟體臨時憑證
		// 1130812	Leslie[1130466]	修改檢查軟體憑證函式，改為可依傳入參數決定查找正式或臨時憑證
        // theSSO.MP.canUseTempSoftCert = _canUseTempSoftCert();
        theSSO.MP.canUseTempSoftCert = _canUseSoftCertByType('tempCert');
		
		// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能，PC使用智慧卡簽署時，檢查是否有軟體正式憑證，若有則優先使用
		if(certType=='SCardCert')
			theSSO.MP.canUseFormalSoftCert = _canUseSoftCertByType('formalCert');
        
        if (submitSign===false) {
            //1080118 Kevin 1080049 修正Use Of Hardcoded Password
            _dfdPincode.resolve({success: true, rslt:'skip', pincode:theSSO.Artifact});
            return _dfdPincode.promise();
        }
    
        /* 2015.6 - Quick-fix (暫行方案), 若只有來文, 不加簽! */
        var n = _aol.getCurrFolio().getSignFolder().getDraftCounts();
        let cntDraftAll = n;

        // 2017.9.11 - 1060865
        //var hasDraft = (n>0)?true:false;
        var draftType = 0;
        if(_aol.getCurrFolio().getSignFolder().hasFromDoc())
            --n; // 檢核標的不含來文文稿, 來文的index是最後一個
        var hasDraft = (n>0)?true:false;
        if (n===0) {
            /* 2017.9.8 - 1060685 判斷第一個文稿是否為來文簽辦, 若是, 則須異動封裝檔! */
            if (cntDraftAll>0) {
                draftType = _aol.getCurrFolio().isFromDoc(0);
            }

            if (draftType==1) {
                /* 2016.7 - 沒有文稿, 且不異動封裝檔, skip */
                /* 2016.2 - 確認來文或其附件上是否有簽核物件,若有, 則須執行封裝作業, 產出來文文稿 */
                if (!SSOUtil.shouldCreateRcvDocDraft(_aol)) {
                    //1080118 Kevin 1080049 修正Use Of Hardcoded Password
                    _dfdPincode.resolve({success:true, rslt:'skip', password: theSSO.Artifact});
                    return _dfdPincode.promise();
                }
            }
        }
		//1130815	Leslie[1130466]	新增支援PC端軟體正式憑證功能，以軟體正式憑證加簽後記憶PinCode
		//1131016	Leslie[北榮序303]	北榮的軟體正式憑證要優先於一般憑證，移到最前面
		if(typeof theSSO.User.figotu=='string' && theSSO.User.figotu.length){
			_dfdPincode.resolve({success:true, rslt:'ok', password:theSSO.User.figotu, 'useTmpCert':false, 'useFormalSoftCert': true});
			return _dfdPincode.promise();
		}
        
		//1131016	Leslie[北榮序303]	北榮的軟體正式憑證要優先於一般憑證，即使使用憑證登入，也需用軟體憑證加簽
		if(SSO_CONFIG.OrgNickName == "TPVGH" && theSSO.MP.canUseFormalSoftCert)
			console.log('-I- TPVGH，優先使用軟體正式憑證');
		else
        // use keeped pin...
        if (typeof theSSO.User.igotu=='string' && theSSO.User.igotu.length) {
            _dfdPincode.resolve({success:true, rslt:'ok', password:theSSO.User.igotu, 'useTmpCert':false});
            theSSO.User.igotu_uncheck = ''; // 2020.7.9 - 1090390 Eric, clear temp pincode.
            return _dfdPincode.promise();
        }
		
		//1130730	Leslie[彙整表序159]	中榮臨時憑證增加PinCode記憶功能
		//1141204	Leslie[彙整表序422]	北榮臨時憑證增加PinCode記憶功能
		// if(SSO_CONFIG.OrgNickName == "TVGH" && typeof theSSO.User.tigotu=='string' && theSSO.User.tigotu.length){
		if(["TVGH","TPVGH"].includes(SSO_CONFIG.OrgNickName) && typeof theSSO.User.tigotu=='string' && theSSO.User.tigotu.length){
			_dfdPincode.resolve({success:true, rslt:'ok', password:theSSO.User.tigotu, 'useTmpCert':true});
			return _dfdPincode.promise();
		}

        // 2019.7 - verify pin
        if (typeof theSSO.User.igotu_uncheck=='string' && theSSO.User.igotu_uncheck.length) {
            if ((typeof theSSO.MP.submitDocProcWnd!=='undefined' && theSSO.MP.submitDocProcWnd!==null && theSSO.MP.submitDocProcWnd.closed!==true) || 
                (typeof theSSO.MP.submitDocProcFrameWnd!=='undefined' && theSSO.MP.submitDocProcFrameWnd!==null && theSSO.MP.submitDocProcFrameWnd.closed!==true)) {
                let isPinOK = false; // theSSO.MP.submitDocProcWnd.isPinVerified();
                let sKeyVerify = localStorage.key_verified;
                if (typeof sKeyVerify=='string' && sKeyVerify.length) {
                    let key_verify = JSON.parse(sKeyVerify);
                    if (typeof key_verify=='object' && key_verify!==null) {
                        let _hash = CryptoJS.SHA256(theSSO.User.igotu_uncheck).toString(CryptoJS.enc.Base64);
                        if (key_verify.verified && key_verify.hash == _hash) {
                            isPinOK = true;
                            console.log('-I- Pincode Verified....');
                        }
                    }
                }

                if (isPinOK) {
                    theSSO.User.igotu = theSSO.User.igotu_uncheck;
                    theSSO.User.igotu_uncheck = '';
                    _dfdPincode.resolve({success:true, rslt:'ok', password:theSSO.User.igotu, 'useTmpCert':false});
                    return _dfdPincode.promise();
                }
            }
        }
        
        // 2017.2.13 - 只註冊callback function一次, 以防止該function被重複叫用!
        if (typeof theSSO.registerd_dlgPincodeCallBack!='boolean' || theSSO.registerd_dlgPincodeCallBack===false) {
			
			//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
			$(document).on('pagebeforecreate', '#dlgPincode', function() {
				if(SSO_CONFIG.enableMobileMoica){
					var fidoCert = theSSO.User.Certs.find(function(o){return o.isFido == true;})
					if(fidoCert == undefined){
						$('#lbMobileMoica').hide();
						$('#apiMode').hide();
					}
					
					if(certType=='SCardCert')
						$('#apiMode').find('option[value="WebToAPP"]').remove();
					else if(certType=='mobileMoica')
						$('#apiMode').find('option[value="PUSH"]').remove();
				}
				var fidoCert = theSSO.User.Certs.find(function(o){return o.isFido == true;})
				if(fidoCert == undefined){
					$('#lbMobileMoica').remove();
					$('#apiMode').remove();
				}
			})
			$(document).on('pageshow', '#dlgPincode', function() {
				if(SSO_CONFIG.enableMobileMoica){
					var tagSelect = $('#lbMobileMoica').closest('.ui-checkbox').get(0);
					if(tagSelect != undefined)
					$('#apiMode').closest('.ui-select').css({
						'position': 'absolute',
						'z-index': '1001',
						'top': (tagSelect.offsetTop?(tagSelect.offsetTop - 1):142)+'px',
						'right': '10%'
					})
				}

                //1141027	Leslie[1140845]	新增密碼欄位顯示功能
                $('[type="password"]:visible').each(function(i,o){
                    var $pwdParent = $(o).parent().css('position','relative');	//設定上層定位為相對模弍
                    var $pwd = $(o);
                    $('<div class="eye showPW"></div>')
                    .css('left',`calc(${$pwd.width()}px - 1em)`)
                    .on('click',function(e){
                        let pw = $pwd.get(0);
                        const type = pw.getAttribute('type') === 'password' ? 'text' : 'password';
                        pw.setAttribute('type', type);
                        
                        e.target.classList.toggle("hidePW");
                        e.target.classList.toggle("showPW");
                    })
                    .appendTo($pwdParent);
                })
			})
			//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]	==END==
		
 
           /* 2013.4 - 目前#dlgPincode HTML DOM內容放在RD-DlgPincode.html內! */
            $(document).on('pageinit', '#dlgPincode', function() {
                var $dlg = $('#dlgPincode');
                
                // pageinit 時, 才可以在目前頁面找到button elements
                if (typeof theSSO.registerd_dlgPincodeBtnCallBack!='boolean' || theSSO.registerd_dlgPincodeBtnCallBack===false) {
                    $(document).on('click', '#dlgPincode a#OKBtn', _cbOkBtnClicked);
                    $(document).on('click', '#dlgPincode a#CancelBtn', _cbCancelBtnClicked);
                    theSSO.registerd_dlgPincodeBtnCallBack = true;

                    // 2023.4.11 - Eric, 銓敘部問題彙整表 序197 press "Enter" to continue the process
                    //$(document).on('keypress', '#dlgPincode #pincodeText', function(e) {
                    $(document).on('keypress', '#dlgPincode', function(e) {
                        if(e.which == 10 || e.which == 13) { // Enter pressed?
                            if ($('#dlgPincode a#OKBtn').is(":visible")) {
                                $('#dlgPincode a#OKBtn').trigger( 'click' );
                            }
                        }
                    });
										
					//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
					var tmpPinCode = '';
					$(document).on('change', '#useMobileMoica', function(){
						if($(this).prop('checked')){
							tmpPinCode = $dlg.find('#pincodeText').val();
							$dlg.find('#pincodeText').val('');
						}
						else
							$dlg.find('#pincodeText').val(tmpPinCode);
					})
                }
            });
            
            $(document).on('pagebeforeshow', '#dlgPincode', function(){
                var $dlg = $('#dlgPincode');
                $dlg.find('#pincodeText').val('');
                
                if (certType=='SCardCert') {
                    $dlg.find('div.prompt').text('請插入憑證智慧卡並輸入智慧卡金鑰密碼：');
					//1110624	Leslie[1110629]	新增by機關的客製化設定對話框文字
					if('CustomSet' in theCustom && 'CustomPincodeWord' in theCustom.CustomSet && theCustom.CustomSet['CustomPincodeWord'] != '')
						$dlg.find('div.prompt').text(theCustom.CustomSet['CustomPincodeWord'] + '：');
					
					// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
					if(theSSO.MP.canUseFormalSoftCert)
						$dlg.find('div.prompt').text('使用「軟體正式憑證」加簽，請輸入憑證密碼：');
                }
				
				//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
				if(certType=='mobileMoica'){
					$dlg.find('div.prompt').text('請選擇行動自然人憑證的驗證模式：');
					$('#pincodeText').closest('div').addClass('ui-disabled');
					$('#useTmpCert').closest('div').addClass('ui-disabled');
					$('#useMobileMoica').prop('checked',true);
				}
				if(!SSO_CONFIG.enableMobileMoica || ((typeof iOS_device=='boolean' && iOS_device) && certType=='formalCert')){
					$('#lbMobileMoica').closest('.ui-checkbox').hide();
					$('#apiMode').closest('.ui-select').hide();
				}                
                
                // 2017.2.8 - PC/iOS 臨時憑證支援
                var $pcTmpCert = $dlg.find('#useTmpCert');
                var $iOSPrompt = $dlg.find('#iOSPrompt');
                if (typeof iOS_device=='boolean' && iOS_device) {
                    $pcTmpCert.parent().hide();
                    if (certType=='formalCert') {
                        $iOSPrompt.text('行動平台使用軟體正式憑證');
                    }
                    else {
                        $iOSPrompt.text('行動平台使用軟體臨時憑證, 須補簽!');
                    }
                    $iOSPrompt.show();
                }
                else {
                    // 2017.1.24
                    $pcTmpCert.prop('disabled', !theSSO.MP.canUseTempSoftCert); // 2017.6.1 - bug-fix
                    // 2017.5.9 - Eric, 問題單1060309
                    if (!theSSO.MP.canUseTempSoftCert) {
                        $pcTmpCert.parent().hide();
                    }
                    $iOSPrompt.hide();
                }
                
                // 隱藏左上方close button!
                $dlg.find('.ui-header a.ui-btn-icon-notext').css({display: 'none'});
                
                // if (!tempCert) { // change prompt text here? }
            });
        
            theSSO.registerd_dlgPincodeCallBack = true; // once only
        }
        // 2019.10.30 - 1080339 Eric, jQuery 3.0 upgrade
        //$('#lnkDialog').trigger('click');
        $("body").pagecontainer("change", 'RD-DlgPincode.html?ver=5.0.34.001', {transition:'slidedown', changeHash: false, history:false});  // 2016.5
        return _dfdPincode.promise();
    } // EOF _getPincode
    
    /* 2015.2 - 確認有鏈結的軟體臨時憑證!
     * 2016.1 - 新增usage參數: 0: Any, 2:正式憑證, 3:臨時憑證
    */
    function _existLinkedSoftCert(usage) {
        theLogger.log('-I- _existLinkedSoftCert(usage='+ usage + ') Invoked...');
        
        if (!usage || (usage!==2 && usage!==3)) {
            theLogger.log("Error! 無效的usage參數!");
            return false;
        }
        
        var cert = null;
        var i=0, cnt = theSSO.User.Certs.length;
        for(i=0; i<cnt; i++) {
            cert = theSSO.User.Certs[i];
            if (cert && cert.softCert) {
                if (usage==2 && !cert.tempCert) {
                    return true;
                }
                else if (usage==3 && cert.tempCert) {
                    return true;
                }
            }
        }
        return false;
    } // EOF _existLinkedSoftCert
	
	//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
	function _waitResult(docNo,msgId,dfd){
		if (typeof dfd == 'undefined' || dfd===null) {
			dfd = $.Deferred();
		}
		theMoica.verifyTimeOut = 180;
		var $timer = $('#dlgQrCode .countDown');
		theMoica.countDown = setInterval(function(){
			theMoica.verifyTimeOut--;
			if($timer.length)
				$timer.text(theMoica.verifyTimeOut);
			else
				$timer = $('#dlgQrCode .countDown');
			if(theMoica.verifyTimeOut == 0){
				clearInterval(theMoica.countDown);
				$.mobile.changePage( window.location.href+'#home')
				dfd.reject("Moica驗證等候逾時");
			}
			if(theMoica.verifyTimeOut%3 == 0){
				theMoica.CheckResultByMobileMoica({async:true,url:SSO_CONFIG.getWSUrl('authws')}).then(function(rslt){
					if(rslt.isSuccess){
						clearInterval(theMoica.countDown);
						$.mobile.changePage( window.location.href+'#home');	//收掉QRCode對話框
						//驗證成功
						dfd.resolve({success:true, 'docNo':docNo, 'msgId':msgId, signCert:rslt.signCert, signValue:rslt.signedData});
					}
					else if(!rslt.isSuccess && rslt.errorMsg.indexOf('尚未完成') == 0){
						clearInterval(theMoica.countDown);
						$.mobile.changePage( window.location.href+'#home')
						dfd.reject(rslt.errorMsg);
					}
				})
				.fail(function(err){
					clearInterval(theMoica.countDown);
					$.mobile.changePage( window.location.href+'#home')
					alert(err.errMsg)
					dfd.reject(new Error(err.errMsg));
				})
			}
		},1000)
		return 	dfd.promise();
	}
	
	function _signDocWithMobileMoica(SAMLart, docNo, msgId, tbs, mobileMoica, dfd){
		if (typeof dfd == 'undefined' || dfd===null) {
			dfd = $.Deferred();
		}
		if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
			theLogger.debug(SSOUtil.dev_getCurrentTimeStr() +  '-tm- moica.makeSignature() BEGIN...');
			var tmBeginMakeSignature = Date.now();
		}
		theMoica.moicaDeferred = dfd;
		theMoica.toBeSign = tbs;
		
		theMoica.InitSignDataByMoica(SAMLart,tbs,mobileMoica.verifyMode,{async:true,url:SSO_CONFIG.getWSUrl('authws')})
		.then(function(rslt){
			sessionStorage["trancation_id"]=rslt.trancation_id;
			sessionStorage["sp_ticket_id"]=rslt.sp_ticket_id;
			theLogger.log('-I- call InitSignDataByMoica()...isSuccess='+rslt.isSuccess+' verifyMode='+mobileMoica.verifyMode);
			
			if(rslt.isSuccess){
				if(mobileMoica.verifyMode == theMoica.verifyMode.WebToAPP){
					theMoica.actionMoicaAPP(theUserInfo.UserID, rslt.sp_ticket);
				}
				else if(mobileMoica.verifyMode == theMoica.verifyMode.QRCode){
					sessionStorage["QrCode"] = rslt.sp_ticket;
					sessionStorage['AuthwsURL'] = SSO_CONFIG.getWSUrl('authws');
					$("body").pagecontainer("change", 'RD-MoicaQrCode.html', {transition:'slidedown', changeHash: false, history:false, data:'Sign'}); 
				}
				return _waitResult(docNo,msgId,dfd);
			}
			else
				dfd.reject(new Error(rslt.errorMsg));
		})
		return dfd.promise();
	}
	//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]	==END==


    /* 2016.7 - 使用憑證智慧卡加簽 */
    function _signDocWithSCard(docNo, msgId, tbs, encode, pincode, hashAlg, dfd, _newTimeout) {
        if (typeof dfd == 'undefined' || dfd===null) {
            dfd = $.Deferred();
        }
        
        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() +  ' -tm- sc.makeSignature() BEGIN...');
            var tmBeginMakeSignature = Date.now();
        }
        var sc = new SmartCard();
        sc.makeSignature(tbs, encode, pincode, hashAlg, _newTimeout)
        .then(function(rslt){
            if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                let _log = SSOUtil.dev_getTimeElapseStr('sc.makeSignature()', tmBeginMakeSignature);
                theLogger.time(_log);
            }
            // rslt = {success:true, signature: ret.signature, certb64: ret.certb64, ret_code: ret.ret_code };
            dfd.resolve({success:true, 'docNo':docNo, 'msgId':msgId, signCert:rslt.certb64, signValue:rslt.signature});
            sc.reset();
        })
        .fail(function(e) {
			//1140609	Leslie[問題序73]	調整簽核元件異常處置，修正檢核的錯誤訊息，及背景傳送斷鍊問題
			theLogger.error(`簽核元件異常：${JSON.stringify(e)}`);
			
            // 加簽失敗, 清除先前保留之key
            if (typeof theSSO.User.igotu=='string' && theSSO.User.igotu.length) {
                theSSO.User.igotu = '';
            }
			//1130827	Leslie[序215]	傳送失敗後，應清空保存的SCardModuleInfo，重新檢查元件是否正常可用
			if (typeof theSSO.MP.SCardModuleInfo!='undefined' && theSSO.MP.SCardModuleInfo!=null) {
                theSSO.MP.SCardModuleInfo = null;
			}
			//1140609	Leslie[問題序73]	調整簽核元件異常處置，修正檢核的錯誤訊息，及背景傳送斷鍊問題
            // dfd.reject(e);
            dfd.reject($.extend({csReject:true},e));
        });
        return dfd.promise();
    } // EOF _signDocWithSCard

    /* 2015.2 - Eric Peng, 
     * *** iOS DocSignApp使用之憑證不會在User.Certs清單內, 故checkLinked不可為true
     * ToDo: 憑證政策檢核(checkCertificateValidaty)
    */
    function _verifyCert_iOSApp(certInfo, sourceOrgNo, checkLinked) {
        function _getDateFromStr(strDate) {
            var s = strDate;
            var year = 0, month=0, day=0, hour = 0, minute=0, second=0;
            var _date = null;
            if (s.length!=13 && s.length!=11) { 
                return {success:false, errMsg:'無效的日期字串:' + s};
            }
            else {
                year = parseInt(s.substr(0, 3)) + 1911;
                month = parseInt(s.substr(3,2)) - 1; // month: 0-11
                day = parseInt(s.substr(5,2));
                hour = parseInt(s.substr(7,2));
                minute = parseInt(s.substr(9,2));
                
                _date = new Date(year, month, day, hour, minute, 0);
                if (!!_date) {
                    return {success:true, date:_date };
                }
                return {success:false, errMsg:'無效的日期字串:' + s};
            }
        }
        
        /*certInfo = {exist: true, cert: _cert, subject: _subject, ca: _ca, startDate: _startDate, endDate: _endDate};*/
        if (typeof checkLinked=='undefined')
            checkLinked = false;
            
        var i=0, _sCert='', linked=false;
        if (checkLinked) {
            for(i=0; i<theSSO.User.Certs.length; i++) {
                _sCert = theSSO.User.Certs[i];
                if (_sCert.length && _sCert==certInfo._cert) {
                    linked = true;
                    break;
                }
            }
            if (!linked) {
                return {valid: false, errMsg: '指定的憑證未鏈結!'};
            }
        }
        
        var _sSDate = certInfo.startDate;
        var _sEDate = certInfo.endDate;
        var _subject = certInfo.subject;
        if (!!_sSDate && _sSDate.length &&
            !!_sEDate && _sEDate.length &&
            !!_subject && _subject.length)
        {
            var timeNow = new Date();
            
            /* 2015.3.6 - 不檢核姓名, CHT憑證之Subject為身份證字號 */
            
            /* YYYMMddhhmm(ss)
             * 01234567890 12
             */
            var start, end;
            var _theDate = _getDateFromStr(_sSDate);
            if (!_theDate.success) {
                return {valid:false, errMsg:'無效的憑證效期啟始時間:' + _sSDate};
            }
            else if (_theDate.date) {
                start = _theDate.date;
                if (start.getTime() > timeNow.getTime()) {
                    return {valid:false, errMsg:'尚未到憑證啟始效期:' + _sSDate};
                }
            }
            
            _theDate = _getDateFromStr(_sEDate);
            if (!_theDate.success) {
                return {valid:false, errMsg:'無效的憑證效期逾期時間:'+_sEDate};
            }
            else if (_theDate.date) {
                end = _theDate.date;
                if (end.getTime() < timeNow.getTime()) {
                    return {valid:false, errMsg:'憑證已逾效期:' + _sEDate};
                }
            }
            
            /* 目前先以同步方式叫用authws.CheckCertificateValidity檢核憑證有效性 */
            var usage = 2; //usage: 1:org, 2:personal, 3:temp
            var promise = window.theWebServices.authws.checkCertificateValidity(certInfo.cert, usage, sourceOrgNo);
            var _rslt = null;
            promise.done(function(rslt) {
                if (rslt.success)
                {
                    _rslt = {valid:true};
                }
                else {
                    var sErr = rslt.errMsg;
                    theLogger.log("憑證未通過驗證:" + sErr);
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                    _rslt = {valid:false, errMsg:"憑證未通過驗證: " + sErr};
                }
            })
            .fail(function(errObj){
                _rslt = {valid:false, errMsg:rslt.errMsg};
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
            });
            return _rslt;
        }
        else {
            SSOUtil.loading('hide');
            SSOUtil.toggleFuncButton(0x3, true);
            return {valid:false, errMsg:'憑證效期資訊無效或毀損,無法驗證有效性!'};
        }
    } // EOF _verifyCert_iOSApp
    
    /* 2016.7.8 - Eric Peng, 驗證Smartcard憑證:
     * (1)憑證是否鏈結, (2)憑證有效性檢核(checkCertificateValidaty)
     * sourceOrgNo, certb64, sStartDate, sEndDate, checkLine(true/false)
     */
    function _verifyCert2(sourceOrgNo, certb64, sNotBefore, sNotAfter, checkLinked) {
        function _verifyCertValidDate(sNotBefore, sNotAfter) {
            var now = new Date();
            var sNow = (now.getFullYear()-1911).toString() + SSOUtil.padLeft((now.getMonth()+1).toString(), 2) + SSOUtil.padLeft(now.getDate().toString(), 2) +
                             SSOUtil.padLeft(now.getHours().toString(), 2) + SSOUtil.padLeft(now.getMinutes().toString(), 2) + SSOUtil.padLeft(now.getSeconds().toString(), 2);
            if (sNow < sNotBefore || sNow > sNotAfter) {
                return false;
            }
            return true;
        }

        let _dfd = $.Deferred();

        // 2022.9.22 - Eric - 測MCA Smartcard
        if (SSOUtil.isValueTrue(localStorage.dev_mca_card_test)) {
            _dfd.resolve({valid:true, 'tmpCert':false});
            return _dfd.promise();
        }

        if (typeof checkLinked=='undefined')
            checkLinked = false;
		
		//1130226	Leslie[1120589]	[中榮][1040146]新增初次使用憑證加簽時，可依設定自動執行憑證鏈結
		var bAutoLinkCert = SSOUtil.isValueTrue(theSSO.User.EnvSettings.get('II_AUTO_LINKCERT'));
            
        let i=0, _sCert='', linked=false, tmpCert=false;
        if (checkLinked) {
            for(i=0; i<theSSO.User.Certs.length; i++) {
                _sCert = theSSO.User.Certs[i].base64;
                if (_sCert.length && _sCert==certb64) {
					//1130426	Leslie[1120589]	已鍊結的無需重覆執行
					bAutoLinkCert = false;
                    linked = true;
                    tmpCert = theSSO.User.Certs[i].tempCert;
                    break;
                }
            }
            if (!linked) {
				//1130226	Leslie[1120589]	[中榮][1040146]新增初次使用憑證加簽時，可依設定自動執行憑證鏈結
				if(!bAutoLinkCert){
					// _dfd.reject({valid: false, errMsg: '指定的憑證未鏈結!'});
					_dfd.reject({valid: false, errMsg: '指定的憑證未鏈結，請以IFM900完成個人憑證鏈結。'});
					return _dfd.promise();
				}
            }
        }
        
        if (typeof sNotBefore=='string' && sNotBefore.length && typeof sNotAfter=='string' && sNotAfter.length) {
            if (!_verifyCertValidDate(sNotBefore, sNotAfter)) {
                _dfd.reject({ valid: false, errMsg: '不在憑證效期! (NotBefore:' + sNotBefore + ', NotAfter:' + sNotAfter + ')'});
                return _dfd.promise();
            }
        }
                        
        /* 目前先以同步方式叫用authws.CheckCertificateValidity檢核憑證有效性 */
        let usage = 2; //usage: 1:org, 2:personal, 3:temp
        let _promise = null;
        if (!tmpCert) {
            // 2019.7 - Eric, 改async叫用!
            _promise = window.theWebServices.authws.checkCertificateValidity(certb64, usage, sourceOrgNo, {async: true});
        }
        else { // 臨時憑證毋須驗證有效性!
            let _dfdTmp = $.Deferred();
            _dfdTmp.resolve({success:true, 'tmpCert': true});
            _promise = _dfdTmp.promise();
        }
		        
        var _rslt = null;
        _promise.done(function(rslt) {
            if (rslt.success) {
				//1130226	Leslie[1120589]	[中榮][1040146]新增初次使用憑證加簽時，可依設定自動執行憑證鏈結
				if(bAutoLinkCert){
					//憑證未鏈結
					var sc = new SmartCard();
					sc.getCert().then(function(rslt){
						if (rslt.success) {
							//檢查姓名是否正確
							if(rslt.cert.subjectCN == theSSO.User.name){
								window.theWebServices.authws.LinkCert(certb64, sourceOrgNo, theSSO.User.account, localStorage.Artifact)
								.then(function(rslt){
									if(rslt.success)
										_dfd.resolve({valid:true, 'tmpCert':tmpCert});
									else
										_dfd.reject({valid:false, errMsg:rslt.errMsg});
								});
							}
							else
								_dfd.reject({valid: false, errMsg: '指定的憑證未鏈結，請以IFM900完成個人憑證鏈結。'});
						}
						else
							_dfd.reject({valid: false, errMsg: rslt.errMsg});
					})					
				}
				else	//憑證已鏈結
                _dfd.resolve({valid:true, 'tmpCert':tmpCert});
            }
            else {
                var sErr = rslt.errMsg;
                theLogger.log("憑證未通過驗證:" + sErr);

                // 2019.7 - Eric, UI free
                //SSOUtil.loading('hide');
                //SSOUtil.toggleFuncButton(0x3, true);

                _dfd.reject({valid:false, errMsg:"憑證未通過驗證: " + sErr});
            }
        })
        .fail(function(errRslt){
            _dfd.reject({valid:false, errMsg:errRslt.errMsg});

            // 2019.7 - Eric, UI free
            //SSOUtil.loading('hide');
            //SSOUtil.toggleFuncButton(0x3, true);
        });
        return _dfd.promise();
    } // EOF _verifyCert2
   
    /* 2015.2 - 取得本裝置安裝金鑰的憑證資訊 (行動裝置使用App簽章時叫用) */
    function _getInstalledCertInfo(orgNo, account) {
        /* inner function */
        function _getFullUrl(filename) {
            var _href = window.location.href;
            var idxLastSlash = _href.lastIndexOf('/');
            var fullPathname = _href.substr(0, idxLastSlash+1) + filename;
            return fullPathname;
        }
        
        theLogger.log('_getInstalledCertInfo() Begin...');
        
        var _errMsg = '';
        var _dfd = $.Deferred();
        var iOS_device = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        // 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
        // 2019.10.23 - 1080927 iPad OS 13 support
        if (!iOS_device && !window.realMac) {
            iOS_device = (navigator.userAgent.match(/Macintosh/g) ? true : false );
        }

        if (!iOS_device) {
            _dfd.reject({success:false, certExist:false, errMsg:'非iOS裝置, 叫用_getInstalledCertInfo無效.'});
            return _dfd.promise();
            
        }
        var rsltPage = SSO_CONFIG.iOSPage_URLs.queryCertRslt;
        if (!rsltPage || (rsltPage.length===0)) {
            _errMsg = '未設定iOS queryCert之回傳網頁[SSO_CONFIG.queryCertRslt]';
            theLogger.error('Error! ' + _errMsg);
            _dfd.reject({success:false, errMsg:_errMsg});
            return _dfd.promise();
        }
        
        var rsltUrl = _getFullUrl(rsltPage);

        theSSO.MP.queryCertDeferred = _dfd;

        theLogger.log('-I- before iOS_QueryCert()...');
        theSSO.MP.envelopeUtil.iOS_QueryCert(orgNo, account, rsltUrl, _dfd);
        theLogger.log('-I- after iOS_QueryCert()...');
        
        /* 10秒鐘沒有回應視為未安裝App */
        setTimeout(function() {
            if (!!theSSO.MP.queryCertDeferred) {
				//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
				var fidoCert = theSSO.User.Certs.find(function(o){return o.isFido == true;})
				if(fidoCert != undefined)
					theSSO.MP.queryCertDeferred.resolve({success:false, certExist:false, certInfo:null, mobileMoica: true});				
                theSSO.MP.queryCertDeferred.reject({success:false, errMsg:'-TimeOut- iOS公文簽章App沒有回應！請確認是否已安裝。'});
                theLogger.error('ERROR! 叫用iOSApp queryCert逾時...');
            }
        }, 10000);
        
        return _dfd.promise();
    } // EOF _getInstalledCertInfo

    /* 叫用 ODMSSP.SubmitMsg */
    function _submitMsg(SAMLart, _docObj, _aol, exParam) {
        var _dfd = $.Deferred();
        let fStage2Submit = false;
        let fAOLEDocSubmit = false;
        if (typeof exParam!='undefined' && exParam!=null) {
            if ('Stage2Submit' in exParam && typeof exParam.Stage2Submit=='boolean') {
                fStage2Submit = exParam.Stage2Submit;
            }
            if ('AOLEDocSubmit' in exParam && typeof exParam.AOLEDocSubmit=='boolean') {
                fAOLEDocSubmit = true;
            }
        }
        
        // 2014.8 叫用sumbitMsg
        var _doSubmit = theSSO._doRealSubmit;

        // 2020.5.8 - 1080867 Eric, for dev. only, 阻擋測試公文傳送
        if (SSOUtil.isValueTrue(localStorage['dev_ConfirmSubmit'])) {
            let _confirmSubmit = confirm('Process real submit?');
            if (_confirmSubmit==false) {
                _doSubmit = false;
            }
        }

        var rsltSubmit = null;
        if (!_doSubmit) {
            theLogger.log('-DEV- 跳過ODMSSP.SubmitMsg, for 後續刪文及MP頁面切換行為測試...');
            alert('僅測試傳送公文行為作業, 跳過ODMSSP.SubmitMsg實際叫用!');
        }
        else {
            var remotePath = '', _wsUrl = '', _msgId = '', _errMsg='';
            if (_docObj.isDraft) {
                remotePath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                _wsUrl = _docObj.get('ODWMSG', 'WEB_SERVICE');
                _msgId = _docObj.get('ODWMSG', 'MSG_ID');
            }
            else {
                remotePath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
                _wsUrl = _docObj.fileIOWS;
                _msgId = _docObj.msgId;
            }
            theLogger.log('-I- _submitMsg() _wsUrl="' + _wsUrl + '", _msgId="' + _msgId + '"\r\n\tremotePath="' + remotePath + '"');
            
            if (_docObj.signType=='P' && !_docObj.isDraft &&
                (_docObj.txName=='待辦退回' || _docObj.txName=='退回' || _docObj.txName=='退文' ||
                 _docObj.txName=='辦畢退回' || _docObj.txName=='退會' || _docObj.txName=='回文'))
            {
                // 2016.12.5 - Eric , fix
                var menuSetting = ''; //_docObj.txName;
                if (_docObj.toOUId.length || _docObj.toRoleId.length || _docObj.toUserId.length) {
                    menuSetting = _docObj.txName + '@' + _docObj.toOUId  + '@' + _docObj.toOUName  + '@' +
                                  _docObj.toRoleId  + '@' + _docObj.toRoleName + '@' + _docObj.toUserId  + '@' + _docObj.toUserName;
                }
                else {
                    menuSetting = _docObj.txName;
                }
                rsltSubmit = theWebServices.odmssp.menuSubmit(SAMLart, _docObj.sourceOrgNo, _msgId, _docObj.docNo, menuSetting, remotePath, _wsUrl);
                if (rsltSubmit.success!==true) {
                    theLogger.error('Error! invoke theWebService.odmssp.menuSubmit() failed.');
                    // 2018.1.15 - 1061276
                    var _checkDataErr = false;
                    if (typeof rsltSubmit.checkDataErr=='boolean' && rsltSubmit.checkDataErr) {
                        _errMsg = rslt.Submit.errMsg;
                        _checkDataErr = true;
                    }
                    else {
                        _errMsg = '叫用ODMSSP.MenuSubmitg失敗, 錯誤說明:' + rsltSubmit.errMsg;
                    }
                    alert(_errMsg);
                    _dfd.reject({success:false, errMsg:_errMsg, checkDataErr: _checkDataErr}); // 2018.1.15 - 1061276
                    return _dfd.promise();
                }
            }
            else {
                rsltSubmit = theWebServices.odmssp.submitMsg(SAMLart, _msgId, _docObj.isDraft, remotePath, _wsUrl);
                if (rsltSubmit.success!==true) {
                    theLogger.error('Error! invoke theWebService.odmssp.submitMsg() failed.');
                    // 2018.1.15 - 1061276
                    var _checkDateErr = false;
	                if (typeof rsltSubmit.m_CheckDataErr=='boolean' && rsltSubmit.m_CheckDataErr===true) {
                        _errMsg = rsltSubmit.errMsg;
                        _checkDateErr = true;
                    }
                    else {
                        _errMsg = '叫用ODMSSP.SubmitMsg失敗, 錯誤說明:' + rsltSubmit.errMsg;
                    }
                    alert(_errMsg);
                    _dfd.reject({success:false, errMsg:_errMsg, checkDataErr: _checkDataErr}); // 2018.1.15 - 1061276
                    return _dfd.promise();
                }
            }
        }
        
        _docObj.submitProcessing = true;
        
        // 2019.7 - 1080654 Eric, 支援不關閉套件, 自動開啟次筆公文!
        let _tmBefore = null;
        let _nextDocNo='', _nextMsgId = '';
        let _nextDocObj = null;
        let rsltENextId = null;

        // 將對應的ToDoList項目刪除...
        if (!fStage2Submit && fAOLEDocSubmit) {
            // 2019.7 - 1080654 Eric, 支援不關閉套件, 自動開啟次筆公文!
            //   要在異動todolist內容之前先找出下一筆公文資訊!
            if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 清除已傳送公文作業 BEGIN...');
                _tmBefore = Date.now();
            }

            let _openNextDoc = false;
            let _openNextDocAdvMode = false;
            if ('submitOptions' in theSSO.MP) {
                if (typeof (theSSO.MP.submitOptions.openNextDoc)=='boolean') {
                    _openNextDoc = theSSO.MP.submitOptions.openNextDoc;

                    if (typeof (theSSO.MP.submitOptions.openNextDocAdvMode)=='boolean') {
                        _openNextDocAdvMode = theSSO.MP.submitOptions.openNextDocAdvMode;
                    }
                }
            }
			
			//1131016	Leslie[序296]	紙本簽核公文也不取下一筆
            // if (_openNextDoc && !_docObj.isDraft) { // 草稿不取次筆公文!
            if (_openNextDoc && !_docObj.isDraft && _docObj.signType == 'E') { // 草稿不取次筆公文!
                let _currMsgId = _docObj.msgId;
                rsltENextId = theSSO.MP.todolist.builder.getENextId(_currMsgId, _openNextDocAdvMode);
                /* let rslt = {
                    success: true,
                    currentFolder: false,
                    nextMsgId: _doc.msgId,
                    fromHead: rtnFromHead,
                    folder: _doc.folder,
                    subfolder: _doc.subfolder,
                };*/
                if (typeof rsltENextId!='undefined' && rsltENextId.success) {
                    _nextDocNo = rsltENextId.docNo;
                    _nextDocObj = theSSO.MP.todolist.builder.getDocByMsgId(rsltENextId.nextMsgId);
                    if (typeof _nextDocObj!='undefined' && _nextDocObj!==null) {
                        _nextMsgId = _nextDocObj.msgId;
                        _nextDocNo = _nextDocObj.docNo;
                    }
                }
                            
                if (typeof _nextDocObj=='undefined' || _nextDocObj===null) {
                    theLogger.log('DocNo:' + _docObj.docNo + ', MsgId=' + _docObj.msgId + '沒有次筆待辦項目!');
                    _rsltENextId = null;
                }
            }

            theLogger.log('-I- gonna invoke todolist.deleteMsg()');
            if (_docObj.isDraft) { // 2017.1.23
                theSSO.MP.PreviewCtrl.removePreviewItem(_docObj.get('ODWMSG', 'DRAFT_MSG_ID'));
            }
            else {
                theSSO.MP.PreviewCtrl.removePreviewItem(_docObj.msgId);
            }
        }

        // 2017.8.29 - Eric Peng, bug-fix, 若為草稿傳送, 須回復公文基資欄位值! (否則MsgId會比對不到)
        if (_docObj.isDraft && typeof _docObj._draftSubmitRestore!=='undefined' && _docObj._draftSubmitRestore!==null) {
            _docObj.set2('aol', 'ODWMSG', _docObj._draftSubmitRestore);
            _docObj._draftSubmitRestore = null;
        }

        // 2019.7 - Eric Peng, 傳送效能修改, 若由傳送子視窗叫用, 則毋須執行後面套件內容重設作業!
        //                     (已於phrase 1完成後執行!)
        if (fStage2Submit) {
            _dfd.resolve({success:true});
            return _dfd.promise();
        }

        //
        // 2019.7 - Eric, 以下為一般傳送作業 (fStage2Submit==false)
        //

        theSSO.MP.todolist.deleteMsg(_docObj, false, true);

        // 2015.12.23 - Raymond, 傳送成功後要先清除暫存資料
        if (typeof _aol==='object' && _aol!==null && _aol.getCurrFolio()) {
            _aol.getCurrFolio().clearTemp();
			_aol.getCurrFolio().termAutoBackup();	// 2016.12.22 - Raymond, 關閉後清除自動備份檔
            _aol.getCurrFolio = function() {	// 2016.8.1 - Raymond, 關閉後清除
                return false;
            };
            // 2016.8.2 - Raymond, 頁籤文字改為空白表示未開啟公文
            $("#tabbar ul li:first").find("a")
                .attr({href: "folio_", id: "folio_"})
                .html("&nbsp;")
                .data("model", null);
                
            // 2017.4.21 - 1060272 select#chooseX 避免選到傳送子視窗
            // 2016.8 - Eric Peng, 傳送選單UI清空
            $('#aol #transPanel select#chooseA').html('');
            $('#aol #transPanel select#chooseB').html('').hide();
            $('#aol #transPanel select#chooseC').html('').hide();
            $('#aol #transPanel select#chooseD').html('').hide();
            
            // 2021.3.3 - 1090927 Eric Peng, MS Edge study.
            if (typeof _nextDocObj!='undefined' && _nextDocObj!=null ) {
                theLogger.log('-I- _submitMsg() _nextDocObj=' +  JSON.stringify(_nextDocObj));
            }
            else {
                theLogger.log('-I- _submitMsg() invalid _nextDocObj=' + _nextDocObj);
            }

            if (!!_nextDocObj && _nextDocObj.signType=='E') {
                // 2021.3.3 - 1090927 Eric Peng, MS Edge study.
                theLogger.log('-I- _submitMsg() got nextEDoc processing...[load next EDoc]');

                if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 次筆公文: DocNo=' + _nextDocNo + ' MsgId=' + _nextMsgId + '.');
                }

				if (_nextMsgId.length) {
					if (!!_nextDocObj && _nextDocObj.signType==='W') {
						_dfd.reject({success:false, errMsg:'invalid _nextDocObj!'});
                    }
                    else {
                        // 2021.3.3 - 1090927 Eric Peng, MS Edge study.
                        theLogger.log('-I- _submitMsg() resolve with nextEDoc, msgId=' + _nextMsgId + ', nextDocNo=' + _nextDocNo);
                        _dfd.resolve({success:true, nextMsgId:_nextMsgId, nextDocNo: _nextDocNo, nextDocObj:_nextDocObj});
                    }
                    
                    // 2019.8.14 - 1080654 Eric, 搬移至clientSignSubmit結束再執行!
					// let SAMLart = localStorage.Artifact;
					// theSSO.MP.todolist.builder.checkMsgValidity(SAMLart, _nextDocObj)
					// .then(function(rslt) {
					// 	var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, _nextDocObj.sourceOrgNo, _nextDocObj.signType);
					// 	if (menuRule) {
					// 		if (_nextDocObj.signType=='E' || _nextDocObj.signType=='P') {
					// 			var rule = menuRule.getRule(_nextDocObj.folder, _nextDocObj.subfolder);
					// 			if (typeof rule=='undefined' || rule===null) {
					// 				alert('無法取得公文夾[' + _nextDocObj.folder + '-' + _nextDocObj.subfolder +']MenuRule設定');
					// 				_dfd.reject({success:false, errMsg:'無法取得公文夾[' + _nextDocObj.folder + '-' + _nextDocObj.subfolder +']MenuRule設定!'});
				    //             }
					// 		}
                            
                    //         SSOUtil.toggleFuncButton(0x3, true);

					// 		// 開啟次筆待辦公文
                    //         theSSO.MP.openDocWithAOL(SAMLart, _nextDocObj, 'todolist', true); // list item touch
                    //         _dfd.resolve({success:true});
					// 	}
					// 	else {
                    //         alert('無法取得MenuRule設定');
                    //         _dfd.reject({success:false, errMsg:'無法取得MenuRule!'});
					// 	}
					// })
					// .fail(function(rslt){
					// 	if(!!rslt && !!rslt.msg) {
					// 		theLogger.error(rslt.msg);
					// 	}
					// 	else {
					// 		theLogger.error('檢核MsgId有效性或loadDocPreview failed.');
                    //     }
                    //     _dfd.reject(rslt);
					// });
				}
            }
            else {
                // 2021.3.3 - 1090927 Eric Peng, MS Edge study.
                theLogger.log('-I- _submitMsg() none nextEDoc processing...[show MP todolist content]');

                // 回TodoList頁
                /* 2016.6 */
                $('#docWorkPane').hide();
                
                /*開啟todolist*/
                // 2019.7 - Eric, IE bug-fix + 改成與關閉行為致!
                let $displayPane=null, $hiddenPane=null;
                let _displayMode = ('mp_display_mode' in localStorage)?localStorage.mp_display_mode:'';
                //let showSidePage = false;
                if (_displayMode=='icon') {
                    $displayPane = $('#todolistContainer #iconPane');
                    $hiddenPane = $('#todolistContainer #listPane');
                }
                else {
                    $displayPane = $('#todolistContainer #listPane');
                    $hiddenPane = $('#todolistContainer #iconPane');

                    // 2021.1.7 - 1090786 Eric, 追查MP todolist未顯示問題
                    theLogger.log('-I- @_submitMsg() $displayPane length=' + $displayPane.length + ', $hiddenPane length=' + $hiddenPane.length + '[displayPane=#listPane, hiddenPane=#iconPane]');
                }

                $('#todolistContainer #sidePane').hide();
                $hiddenPane.hide();
                $displayPane.show(); 

                let $listPane = $('#todolistContainer #listPane');
                
                // 2017.3.7 -
                if ($listPane.length && $listPane.data('resize')=='true') {
                    // 2021.1.7 - 1090786 Eric, 追查MP todolist未顯示問題
                    theLogger.log('-I- @_submitMsg() #listPane html=' + $listPane[0].outerHTML.substr(0, 256) + '...');

                    theSSO.MP.resizeListPane(null, null, $listPane);

                    // 2021.1.7 - 1090786 Eric, 追查MP todolist未顯示問題
                    theLogger.log('-I- @_submitMsg() [AFTER resizeListPane!] #listPane html=' + $listPane[0].outerHTML.substr(0, 256) + '...');
                }

                // 2021.3.3 - 1090927 Eric Peng, MS Edge study.
                theLogger.log('-I- _submitMsg() #todolistContainer addClass:doc_desktop_showpage');
                $('#todolistContainer').removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
                
                // 2021.1.7 - 1090786, Eric - 測公文傳送/關閉後待辦清單頁未拉出問題.
                let strClass =  $('#todolistContainer').attr('class');
                theLogger.log('-I- #todolistContainer\'s class=\'' + strClass + '\' after REMOVE doc_desktop_hiddenpage, and ADD doc_desktop_showpage');
                                
                // 2016.7 - 新增文稿側桌=>創稿側桌
                theSSO.MP.changeNewDocSidePaneTitle(false);
                //$.mobile.changePage($('#home'), {transition: 'slide', reverse:true, changeHash:false });
                _dfd.resolve({success:true});
            }
        }
        else {
            _dfd.resolve({success:true});
        }
        return _dfd.promise();
    } // EOF _submitMsg
    
    /* 異動公文封裝檔內容 (叫用WebFileIO.UpdateDraftEnvelope/UpdateEnvelopd)
        * 參數說明
        * SAMLart: 權杖
        * sPincode: 金鑰密碼(for ServerSign pfx), 若為空字串, 則不在server加簽.
        * _docObj: 待傳送公文
        * fSubmitSign: 是否加簽, false->不加簽(內部測試用!)
        * fServerSign: 是否在server加簽, false->回傳待簽內容或hash值, 在client加簽.
        * fGenFormalPage: 是否匯出抄本頁面 // 2020.7.30 - 1090409 Eric
        */
    function _updateDocEnvelope(SAMLart, sPincode, _docObj, fSubmitSign, fServerSign, fSupportHashSign, fUseTmpSoftCert, fGenFormalPage, fUseLastSiteContent) {
        if (theSSO._showSubmitAlert===true) {
            alert('即將叫用ODMSSP.UpdateEnvelope函式...');
        }
 
        fServerSign = (typeof fServerSign=='boolean') ? fServerSign : false;
        var _dfd = $.Deferred();

        if (SSOUtil.isValueTrue(localStorage['dev_stopBeforeUpdateEnvelop'])) {
            _dfd.reject({success: false, errMsg: 'dev. debug stop before updateEnvelop'});
            return _dfd.promise();
        }

        // 2017.1.18 - 要求回傳hash值(原回傳<SignedInfo>內容)加簽
        var fSignWithHash = (typeof fSupportHashSign=='boolean' && !!fSupportHashSign)?true:false;

        if (typeof fSubmitSign!=='boolean') {
            fSubmitSign = true;
            if (typeof iOS_device=='boolean' && !!iOS_device) {
                fSignWithHash = false;
            }
        }
        
        var flags = 0; // 2014.9 - 未來草稿傳送等狀況使用, 目前一律給0
        if (fSubmitSign && !fServerSign) {
            flags += 0x10000; // 使用暫存檔機制更新封裝檔 (Client加簽才用)
            if (fSignWithHash) {
                flags += 0x8; // 2016.1.18 - 封裝作業完成, 須回傳hash值!
            }
        }
            
        // 2017.2.7 - 告知WebFileIO.updateEnvelope函式server憑證為正式或臨時憑證
        fUseTmpSoftCert = (typeof fUseTmpSoftCert=='boolean') ? fUseTmpSoftCert : false;
        if (fServerSign) {
            if (fUseTmpSoftCert) {
                flags += 0x2; // server憑證為臨時憑證
            }
            else {
                flags += 0x4; // server憑證為正式憑證
            }
        }

        // 2020.7.30 - 1090409 Eric, 匯出抄本頁面
        if (fGenFormalPage) {
            flags += 0x100;
        }

        // 2020.9.4 - 1090564 Eric, [信保基金WEB系統自行創稿]公文封裝.
        let fSMEGWebDoc = false;
        if (SSO_CONFIG.OrgNickName=='SMEG' && _docObj.get('ODWDCM', 'DRAFT_SOURCE_TYPE')=='2') {
            fSMEGWebDoc = true;
        }
        if (fSMEGWebDoc) {
            flags += 0x200; // 信保基金系統WEB自行創稿公文封裝時, 新增flag值告知SFolderUtil元件.
        }

        if (fUseLastSiteContent===true) {
            flags += 0x400; // 2020.09.17 - 1090671 Eric, 銷號傳送時若已刪除所有文稿應特殊處理.
        }
        
        /* 2015.3.17 - Eric Peng, updateEnvelope移至WebFileIO實作 */
        var fileIOUrl = _docObj.fileIOWS;
        let sMsg = 'gonna invoke wfio.' + (_docObj.isDraft?'updateDraftEnvelope':'updateEnvelope') + '...[flags=0x' +
                   ((flags===0)?'0':SSOUtil.padLeft(Number(flags).toString(16), 8)) + ']';
        theLogger.log(sMsg);
        
        var promise = null;
        if (_docObj.isDraft) {
            // 草稿公文, 叫用ODMSSP.updateDraftEnvelope
            flags += 1; // 草稿傳送
            console.log('-I- before WFIO.updateDraftEnvelope dwFlags=' + flags);
            promise = theWebServices.webFileIO.updateDraftEnvelope(SAMLart, _docObj.docNo, _docObj.ICUserId, _docObj.msgId, 'SignWork.xml', flags.toString(),
                        _docObj.sourceOrgNo, sPincode, {async:true, url:fileIOUrl});
        }
        else {
            // 非草稿, 叫用ODMSSP.updateEnvelope
            console.log('-I- before WFIO.updateEnvelope dwFlags=' + flags);
            promise = theWebServices.webFileIO.updateEnvelope(SAMLart, _docObj.docNo, _docObj.msgId, 'SignWork.xml', flags,
                        _docObj.sourceOrgNo, sPincode, {async:true, url:fileIOUrl});
        }
        
        promise.done(function(rslt) {
            // 作業成功
            // 2015.5 - rslt.toBeSigned 可能未定義!
            if (rslt.success===true && (!!rslt.toBeSigned && rslt.toBeSigned.length))
            {
                theLogger.log('invoke wfio.updateEnvelope success!');
                var _signed = (!!sPincode && sPincode.lenght) ? true : false;
                _dfd.resolve({success:true, signed:_signed, tobeSign:rslt.toBeSigned, serverSigned:fServerSign});
            }
            else {
                var _errMsg = '';
                if (rslt.success!==true) {
                    _errMsg = '叫用FileIOWS.UpdateEnvelope失敗! ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg;
                    theLogger.error('Error! invoke ODMSSP.UpdateEnvelope失敗! rslt=' + rslt);
                    SSOUtil.loading('hide');
                }
                else if (!rslt.toBeSigned || rslt.toBeSigned.length===0) {
                    _errMsg = '待簽內容不可為空字串!';
                    theLogger.error('Error! invoke FileIOWS.UpdateEnvelope失敗, rslt.toBeSigned為空值!');
                    SSOUtil.loading('hide');
                }
                SSOUtil.toggleFuncButton(0x3, true);
                _dfd.reject({success:false, errMsg:_errMsg});
            }
        })
        .fail(function(err) {
			//1141229   Leslie[1141507] 增對軟體正式憑證檢核失敗做處置
			if(fServerSign && (!!sPincode && !!sPincode.length) && !fUseTmpSoftCert && err.errMsg.indexOf('憑證') > -1){
				err.errMsg += '，請重新申請。';
				let idxDel = theSSO.User.Certs.findIndex((o)=>o.softCert&&!o.tempCert);
				if(idxDel > -1)
					theSSO.User.Certs.splice(idxDel,1);
			}
            _dfd.reject(err);
        });
        return _dfd.promise();	
    } // EOF _updateDocEnvelope

    /* 2021.5 - 1100093 merge: 1081168 
        * 傳送前時將ODWMSG/ODWDCM內容上傳至server工作檔, 檔名:FromUser_$MsgId$.xml (子文封裝作業叫用)
        * useODWMSG: true -> 取用_docObj.ODWMSG.WEB_SERVICE欄位值內容為公文電子檔路徑
        *            (預設使用docObj.fileIOWS欄位)
        */
    function _uploadCOMDocFromUserInfo(docNo, msgId, wsUrl, serverPath, fromUser) {
        function _makeFromUserXMLDOMObj(_fromUser) {
            var xmlDoc = document.implementation.createDocument('', 'ODWMSG', null);
            for(var propertyName in _fromUser) {
                var elem = xmlDoc.createElement(propertyName);
                var txtElem = xmlDoc.createTextNode(_fromUser[propertyName]);
                elem.appendChild(txtElem);
                xmlDoc.documentElement.appendChild(elem);
            }
            return xmlDoc;
        }

        let _dfd = $.Deferred();
        let FromUser_XmlObj = _makeFromUserXMLDOMObj(fromUser);
        if ((typeof FromUser_XmlObj=='undefined') || FromUser_XmlObj===null) {
            theLogger.error('-ERR- upload FromUser info failed. [FromUser_XmlObj==null, DocNo=' + docNo + ']');
            _dfd.reject({success:false, errMsg:'DocNo=' + docNo + ' upload FromUser info failed. [FromUser_XmlObj==null]'});
            return _dfd.promise();
        }
        
        var wfio=null, _wsUrl='';
        _wsUrl = wsUrl;
		
		//1140508	Leslie[1140331]	[退輔會]Merge[1111194]依設定決定是否改走工作站模式
		if(theSSO.User.SystemSets.get('DOCSIGN_BY_WORKSTATION') == 'Y'){
			var wksObj = theWebServices.webFileIO.ws_GetWebSfolder(wsUrl,false,false);
			_wsUrl = wksObj.Url.replace("WebSFolder/WebSFolder.asmx","WebFileIO/T2100FileIoService.asmx");
		}
		
        wfio = new WebFileIO(_wsUrl);
        let filename = "FromUser_" + msgId + ".xml";
        wfio.upload(serverPath, filename, FromUser_XmlObj, {
            success: function() {
                theLogger.log("-=" + filename + "上傳完畢=-");
                _dfd.resolve({success:true});
            },
            error: function(errorText) {
                theLogger.error('ERROR! _uploadCOMDocFromUserInfo() DocNo=' + docNo + 'FromUser file:' +  filename + " 上傳失敗! ErrMsg=" + errorText);
                _dfd.reject({success:false, errMsg: ''+ filename + "上傳失敗! " + errorText});
            },
            async: true,
        });
        return _dfd.promise();
    }

    // 2021.5 - 1100093 merge: 2020.3.3 - 1081168 Eric, 子文彙併辦流程 & [本件公文/子文]解彙併辦流程封裝
    function _processSubDocEnve(_mainDocObj, COMNo, flags, pincode, clientSignMode, fSubmitSign, fSupportHashSign) {
        // ODMSSP.getDocToDoList: function (artifact, docNo, options)
        // WebFileIO.getCOMDocMergeStatus : function(artifact, orgNo, docNo, msgId, mainDocNo, mainDocMsgId, flags, options) {
        // WebFileIO.updateCOMDocEnvelope : function(artifact, docNo, msgId, mainDocNo, mainDocMsgId, flags, orgNo, pincode, options) {
			
		//1130820	Leslie[序183]	彙併辦傳送，補上RawData簽署時會用到的演算法函式
		function _getHashAlgorithm(sTobeSignXML) {
            var _hashAlg = 'SHA1';
            if (!!sTobeSignXML && sTobeSignXML.length && sTobeSignXML.indexOf('http://www.w3.org/2001/04/xmlenc#sha256')!==-1) {
                _hashAlg = 'SHA256';
            }
            return _hashAlg;
        }

        theLogger.log('-I- _processSubDocEnve(..., subDocNo='+ COMNo + ', flags=' + flags + ', pin) Begin...');
        let _dfdSubDocEnve = $.Deferred();
        let sourceOrgNo = _mainDocObj.sourceOrgNo;
        let SAMLart = localStorage.Artifact;
        let _msgId = '', _endJob = false;
        let tmBeginUpdateSubDocEnve = null;

        let __fSubmitSign = SSOUtil.isValueTrue(theSSO.User.EnvSettings.II_SUBMIT_SIGN);
        let __clientSignMode = SSO_CONFIG.getClientSignMode();
        let fServerSign = false;
        let _clientSignMode = clientSignMode;
        if (_clientSignMode=='NONE' && fSubmitSign) {
            fServerSign = true;
        }
        let useTmpCert = false;
        if (fServerSign) {
            useTmpCert = true;
			
			//1130812	Leslie[1130466]	調整軟體憑證的「正式/臨時」判定邏輯
			var tmpCert = _mainDocObj.get('ODWMSG', 'TMP_CER')
			// var serverSignMode = theSSO.User.SystemSets.II_SIGN_MODE; // Server上的加簽pfx為臨時(3,預設)或正式(2)憑證, 行動簽核使用!
            // if (typeof serverSignMode=='string' && serverSignMode==='2') {
			if (tmpCert == 'N'){
                useTmpCert = false; // 2021.5 - Eric, bug-fix
                // theLogger.log('-I- 軟體憑證為正式憑證! II_SIGN_MODE=\'' + serverSignMode + '\'');
                theLogger.log('-I- 軟體憑證為正式憑證!');
            }
        }

        // 2020.3.5 - 1081168 Eric, ToDo: confirm SignFlags
        let signFlags = 0;
        if (fSubmitSign) {
            if (!fServerSign) {
                signFlags += 0x10000; // 使用暫存檔機制更新封裝檔 (Client加簽才用)
                signFlags += fSupportHashSign?0x8:0;
            }
            else {
                signFlags += (useTmpCert)?0x2:0x4; // 使用server軟體[臨時]憑證/server軟體[正式]憑證
            }
        }

        let _fileIOWSUrl = '';
        let _serverPath = '';
        var _dfdGDI2 = $.Deferred(); // 2017.5.26 - Eric Peng, 1060327
        theWebServices.odmssp.getDocumentInfo2(SAMLart, sourceOrgNo, COMNo, _dfdGDI2, {async:true})
        .then(function(rslt) {
            let _dfdSub = $.Deferred(); 
            if (rslt.success!==true || Array.isArray(rslt.todoList)!==true || rslt.todoList.length===0) {
                _dfdSub.reject({success:false, errMsg:'叫用ODMSSP.GetDocumentInfo2發生錯誤. [DocNo='+ COMNo +']'});
                return _dfdSub.promise();
            }
            _fileIOWSUrl = SSOUtil.xml_getChildNodeValue(rslt.todoList[0], 'WEB_SERVICE');
            let storagePath = SSOUtil.xml_getChildNodeValue(rslt.todoList[0], 'STORAGE_PATH');
            let subDir = SSOUtil.xml_getChildNodeValue(rslt.todoList[0], 'SUB_DIR');
            _serverPath = SSOUtil.combineLocalPath(storagePath, subDir);

            if (typeof _fileIOWSUrl!=='string' || _fileIOWSUrl.length===0) {
                _dfdSub.reject({success:false, errMsg:'無法取得子文(DocNo='+ COMNo +')之 WebFileIO Url. [叫用ODMSSP.GetDocumentInfo2回傳內容異常]'});
                return _dfdSub.promise();
            }
			//1140924	Leslie[退輔會序170]	修正複數機關環境，彙併辦子文因重覆文號造成子文未正確加簽的問題
            // return SSOUtil.getDocToDoList(COMNo, SAMLart, {async:true});
            return SSOUtil.getDocToDoList2(sourceOrgNo, COMNo, SAMLart, {async:true});
        })
        .then(function(rsltDTDL) {
            let _dfdSub = $.Deferred();
            let cntTDL = rsltDTDL.docToDoList.length;

            // 2021.5.23 - 1100093 Eric, '解除彙併辦'為倒數第二個DocToDoList項目
            let _lastTDL = null;
            let txName = '';
            if (flags & 0x10) {
                _lastTDL = rsltDTDL.docToDoList[cntTDL-1];
                txName = _lastTDL.txName;
            }
            else if (flags & 0x20) {
                if ((cntTDL-2)>0) {
                    _lastTDL = rsltDTDL.docToDoList[cntTDL-2];
                    txName = _lastTDL.txName;
                }
            }
            let signType = _lastTDL.signType;

            //sc.MergeDocTxName = '彙併辦'; sc.RemoveMergeDocTxName = '解除彙併辦';
            if (signType=='E' && (txName==sso_const.MergeDocTxName || txName==sso_const.RemoveMergeDocTxName)) {
                let action = 0;
                if ((flags & 0x10) && txName==sso_const.MergeDocTxName) {
                    action = 1;
                }
                else if ((flags & 0x20) && txName==sso_const.RemoveMergeDocTxName) {
                    action = 2;
                }

                let flagsForQuery = 0;
                if (flags & 0x10) {
                    flagsForQuery = 0x1;
                }
                else if (flags & 0x20) {
                    flagsForQuery = 0x2;
                }

                // 2020.3.5 - 1081168 Eric, ToDo: flags value?
                _msgId = _lastTDL.msgId;
                theWebServices.webFileIO.getCOMDocMergeStatus(SAMLart, sourceOrgNo, COMNo, _msgId, 
                        _mainDocObj.docNo, _mainDocObj.msgId, flagsForQuery, {async:true, url:_fileIOWSUrl})
                .then(function(rslt) {
                    //res.success = true;
                    //res.mergeStateCode = rslt.mergeStateCode;
                    //res.removeTmpContent = rstl.removeTmpContent;
                    //res.errCode = res.errMsg = '';
                    let stateCode = rslt.mergeStateCode;
                    let removeTmpContent = rslt.removeTmpContent;
                    // 2023.3.29 - Eric, 法規驗證小組回報子文使用臨時憑證簽章問題追查修正, 作業結束立即寫出log.
                    // stateCode = 5 => AMS_UNENVELOP_MERGEFLOW(1) + AMS_UNENVELOP_REPLACEOLD(4)
                    if (stateCode==1 || stateCode==5 || stateCode==2) { // AMS_UNENVELOP_MERGEFLOW | AMS_UNENVELOP_REPLACEOLD | AMS_UNENVELOP_REMOVEMERGEFLOW
                        // MSG_ID,TX_NAME,SOURCE_ORGNO,OWN_OU_NAME, OWN_OU_ID, OWN_ROLE_ID, [OwnRoleName], OWN_USER_ID, [OwnUserName]
                        // TransInfo.FromUser: UnitName, Title, UserName, RoleName
                        let xnOrg = SSOUtil.getOrgNode(sourceOrgNo);
                        let _orgName = SSOUtil.xml_getChildNodeValue(xnOrg, 'OrgName')
                        let _unitName = SSOUtil.getOrgUnitName(xnOrg, _lastTDL.ownOUId);
                        let _roleName = SSOUtil.getOrgRoleName(xnOrg, _lastTDL.ownOUId, _lastTDL.ownRoleId)

                        // 2023.9.20 - 1120750 Eric, 組改機關代碼處理
                        var _orgCode = sourceOrgNo;   // <機關代碼>內容預設以ODWMSG.SOURCE_ORGNO填入, 若有組改設定的轉換代碼, 則改以轉換後的新代碼填入
                        if(!!theSSO && !!theSSO.OrgMap) {
                            if(_orgCode in theSSO.OrgMap) {
                                theLogger.log("'" + _orgCode + "'依OrgMap轉換為新代碼:" + theSSO.OrgMap[_orgCode]);
                                _orgCode = theSSO.OrgMap[_orgCode];
                            }
                            else {
                                theLogger.warn("OrgMap中無'" + _orgCode + "'對應新機關代碼!");
                            }
                        }

                        let _fromUser = {
                            OrgCode: _orgCode, // 2023.9.20 - 1120750, 組改機關代碼處理
                            OrgName: _orgName,
                            Title: theSSO.User.title,
                            UnitName: _unitName,
                            RoleName: _roleName,
                            UserName: theSSO.User.name,
                        };
						
						//1140508	Leslie[1140331]	[退輔會]Merge[1111194]依設定決定是否改走工作站模式
						if(theSSO.User.SystemSets.get('DOCSIGN_BY_WORKSTATION') == 'Y')
							_serverPath = rslt.workStationPath;
						
                        _dfdSub.resolve({success:true, 'stateCode':stateCode, 'removeTmpContent': removeTmpContent, msgId: _msgId, docNo: COMNo, 
                                         mainDocNo: _mainDocObj.docNo, mainDocMsgId: _mainDocObj.msgId, fromUser:_fromUser});
                    }
                    else {
                        _endJob = true;
                        _dfdSub.resolve({success:true, processCOMEnve: false});
                    }
                })
                .fail(function(errRslt) {
                    _dfdSub.reject(errRslt);
                });
            }
            else {
                _endJob = true;
                _dfdSub.resolve({success:true, processCOMEnve: false});
            }
            return _dfdSub.promise();
        })
        .then(function(rsltMergeState) {
            let _dfdSub = $.Deferred();
            if (_endJob) {
                _dfdSub.resolve(rsltMergeState); return _dfdSub.promise();
            }

            // 上傳 <異動資訊>之<簽核人員>資訊, 檔名: FromUser_$MsgId$.XML
            _uploadCOMDocFromUserInfo(COMNo, _msgId, _fileIOWSUrl, _serverPath, rsltMergeState.fromUser)
            .then(function() {
                _dfdSub.resolve(rsltMergeState);
            })
            .fail(function(errRslt) {
                _dfdSub.rfeject(errRslt);
            });
            return _dfdSub.promise();
        })
        .then(function(rsltMergeState) {
            let _dfdSub = $.Deferred();
            if (_endJob) {
                _dfdSub.resolve(rsltMergeState); return _dfdSub.promise();
            }

            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + '-tm- updateCOMDocEnvelope(DocNo=' + COMNo + ') BEGIN...');
                tmBeginUpdateSubDocEnve = Date.now();
            }

            // #define MS_UPDATE_ENV_DRAFT			0x1
            // #define MS_UPDATE_ENV_TMPCERT		0x2 // Server的軟體憑證為臨時憑證!
            // #define MS_UPDATE_ENV_SOFTCERT		0x4 // 2016.1.27 - Server的軟體憑證為正式憑證!
            // #define MS_UPDATE_ENV_RETURN_HASH	0x8 // 2017.1.17 - 回傳<SignedInfo>的hash值
            // #define MS_UPDATE_ENV_WITH_SIGN		0x10000 // 2016.1.27 - 確認後續傳送作業是否會執行加簽程序
            // #define MS_UPDATE_ENV_MERGED_COMDOC		0x10 // 2020.2.26 - 彙併辦子文封裝
            // #define MS_UPDATE_ENV_UNMERGED_COMDOC	0x20 // 2020.2.26 - 解彙併辦子文封裝
            // #define MS_UPDATE_ENV_TEST_COMDOC	0x20000 // 2020.2.24 - 測試子文封裝叫用
            
            let updateFlags = flags + signFlags;
            // function(artifact, docNo, msgId, mainDocNo, mainDocMsgId, flags, orgNo, pincode, options)
            return theWebServices.webFileIO.updateCOMDocEnvelope(SAMLart, COMNo, rsltMergeState.msgId, 
                rsltMergeState.mainDocNo, rsltMergeState.mainDocMsgId, updateFlags, sourceOrgNo, 
                fServerSign?pincode:'', {async:true, url:_fileIOWSUrl});
        })
        .then(function(updateRslt) {
            let _dfdSub = $.Deferred();
            if (_endJob) {
                _dfdSub.resolve(updateRslt);
                return _dfdSub.promise();
            }

            // res.success = true;
            // res.toBeSigned = rslt.RtnStr;
            // res.errCode = res.errMsg = '';
            if (!fSubmitSign) {
                _endJob = true;
                _dfdSub.resolve({success:true}); 
                return _dfdSub.promise();
            }

            // 2023.3.24 - Eric, bug-fix - merge 2017.1.24 - 若使用server臨時憑證加簽, 再跳過加簽程序
            var serverCertSigned = false;
            if (typeof updateRslt=='object' && fServerSign) {
                serverCertSigned = true;
            }

            // 2021.6 - 1100676 Eric, 調整程序.
            // 2017.1.24 - 若使用server憑證加簽, 再跳過加簽程序
            if (typeof updateRslt=='object' && fServerSign) {
                _dfdSub.resolve({serverSigned:serverCertSigned});
                return _dfdSub.promise();
            }

            var sHashHeaderb64_SHA1 = 'MCEwCQYFKw4DAhoFAAQU'; // 2017.1.18 - 若回傳待簽資料hash, 則header為此值!
            var sHashHeaderb64_SHA256 = 'MDEwDQYJYIZIAWUDBAIBBQAEI'; // 2017.3.16 - 若回傳待簽資料hash, 則header為此值!
            
            theLogger.log('-I- updateCOMDocEnvelope(' + COMNo + ') finished.');
            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                SSOUtil.dev_logTimeElapse('updateCOMDocEnvelope(' + COMNo + ')', tmBeginUpdateSubDocEnve);
            }
                
            var fHashSign = false;  
            var tobeSign = updateRslt.toBeSigned;
            if (updateRslt.success===true && tobeSign.length) {
                if (SSO_CONFIG.getClientSignMode()=='iOSApp') {
                    theLogger.log('-I- gonna call iOS_SignData()...');
                    // signData : function(_orgNo, _account, _docNo, _msgId, _tobeSign, _rsltUrl, _dfd)
                    var rsltPage = SSO_CONFIG.iOSPage_URLs.signDocRslt;
                    if (!rsltPage || (rsltPage.length===0)) {
                        _dfdSub.reject({success:false, errMsg:'Error! 未設定iOS SignData之回傳網頁[SSO_CONFIG.signDocRslt].'});
                        return _dfdSub.promise();
                    }
                    
                    // 2022.1.4 - 1101443 Eric, support hash sign
                    if (tobeSign.indexOf(sHashHeaderb64_SHA1)===0 || tobeSign.indexOf(sHashHeaderb64_SHA256)===0) {
                        fHashSign = true;
                    }

                    var rsltUrl = _getFullUrl(rsltPage);
                    return theSSO.MP.envelopeUtil.iOS_SignData(sourceOrgNo, theSSO.User.account, COMNo, _msgId,
                                                           tobeSign, fHashSign, rsltUrl, _dfdSub);
                }
                else {
                    if (tobeSign.indexOf(sHashHeaderb64_SHA1)===0 || tobeSign.indexOf(sHashHeaderb64_SHA256)===0) {
                        fHashSign = true;
                    }
                    
                    var sTobeSignXml='', _hashAlg='';
                    var _encodeMethod = fHashSign ? 'hashBase64' : 'base64';
                    // 2017.1.17 - 回傳資訊為<SignedInfo>內容時, 才要判定_hashAlg; 若為hash value, 則HiCOS LocalServer會自動判定
                    if (!fHashSign) {
                        sTobeSignXml = Base64.decode(tobeSign);
                        _hashAlg = _getHashAlgorithm(sTobeSignXml);
                    }
                    return _signDocWithSCard(COMNo, _msgId, tobeSign, _encodeMethod, pincode, _hashAlg, _dfdSub);
                }
            }
            else {
                theLogger.error('Error! FileIOWS.UpateEnvelope, 未回傳待簽資訊!');
                _dfdSub.reject({success:false, errMsg:updateRslt.errMsg});
                return _dfdSub.promise();
            }
        })
        .then(function(signRslt) {
            let _dfdSub = $.Deferred();
            if (_endJob) {
                _dfdSub.resolve({success:true, docNo:COMNo});
                return _dfdSub.promise();
            }

            // 使用臨時憑證 => 設定本次加簽使用臨時憑證!
            // call ODMSSP.SetToDoListTmpCerState()
            theLogger.log('-I- iOS_SignData/_signDocWithSCard/ServerTmpCertSign finished.');
            
            var serverSigned = false;
            if (typeof signRslt=='object' && typeof signRslt.serverSigned=='boolean' && signRslt.serverSigned) {
                serverSigned = true;
            }
            
            // 2023.3.24 - Eric, dev-test
            theLogger.log('-I- serverSigned=' + serverSigned?'Y':'N')

            var serverPath='', sErrMsg='';
            // 若設定不加簽或不異動封裝檔(或已在server使用臨時憑證加簽) => 跳過
            if (serverSigned) {
                // 2020.7.17 - 1090470 Eric, 一律叫用, state: 'Y'|'N'
                // 1081168 - call ODMSSP.SetTodoListTmpCerState() 
                let state = 'N';
                if (useTmpCert) {
                    // 若使用臨時憑證,須更新ODWMSG.TMP_CER並重新上傳ODWMSG.XML
                    state = 'Y'
                }
                
                // 2023.3.24 - Eric, dev-test
                theLogger.log('-I- before invoke ODMSSP.setTodoListTmpCerState() state="' + state + '" COMNo=' + COMNo + '.')

                theWebServices.odmssp.setTodoListTmpCerState(SAMLart, sourceOrgNo, _msgId, state, COMNo, {async:true})
                .then(function(rslt){
                    _dfdSub.resolve($.extend({docNo:COMNo, 'useTmpCert':useTmpCert}, signRslt));
                })
                .fail(function(errRslt){
                    _dfdSub.reject($.extended({success:false}, errRslt));
                });

                // server sign 毋須執行後續作業
                return _dfdSub.promise();
            }
            
            // {success:true, docNo:signDocNo, msgId:signMsgId, signCert:_signCert, signValue:_signValue}
            if (signRslt.docNo!==COMNo || signRslt.msgId!=_msgId) {
                _dfdSub.reject({success:false, _errMsg:'簽章App回傳的docNo/msgId與目前開啟公文不符! [子文封裝, DocNo=' + COMNo + ']'});
                return _dfdSub.promise();;
            }
            
            if (!signRslt.signCert || (signRslt.signCert.length===0) ||
                !signRslt.signValue || (signRslt.signValue.length===0)) {
                _dfdSub.reject({success:false, _errMsg:'簽章App回傳的signCert/signValue不可為空白! [子文封裝, DocNo=' + COMNo + ']'});
                return _dfdSub.promise();;
            }
            
            /* 在此處驗證憑證有效性 */
            let rslt = null;
            let _prmVerifyCert = null;
            let _dfdVerifyCert = $.Deferred();
            if (clientSignMode=='SCard')  {
                _verifyCert2(sourceOrgNo, signRslt.signCert, '', '', true)
                .done(function(rsltVerifyCert){
                    // _rslt = {valid:true, 'tmpCert':tmpCert};
                    if (rsltVerifyCert.valid!==true) {
                        _dfdVerifyCert.reject({success:false, _errMsg:'憑證有效性驗證未通過! 原因:' + rslt.errMsg});
                    }
                    else {
                        // 有效性檢核通過, 記錄PinCode
                        if ((typeof theSSO.User.igotu !== 'string' || theSSO.User.igotu.length===0) && pincode.length) {
                            var keepPin = true;
                            var rememberPincode = theSSO.User.EnvSettings.get('MP_REMEMBER_AOL_PINCODE');
                            if (typeof rememberPincode=='string' && rememberPincode.length) {
                                rememberPincode = rememberPincode.toLowerCase();
                                if (rememberPincode=='false' || rememberPincode=='0') {
                                    keepPin = false;
                                }
                            }
                            if (keepPin) {
                                theSSO.User.igotu = pincode;
                            }
                        }
                        let rtnObj = $.extend({success:true}, rsltVerifyCert);
                        _dfdVerifyCert.resolve(rtnObj);
                    }
                })
                .fail(function(errRslt) {
                    let rtnObj = $.extend({success:false}, errRslt);
                    _dfdVerifyCert.reject(rtnObj); // 2020.11.20 - N/A Eric, bug-fix, resolve(rtnObj);
                })
                _prmVerifyCert = _dfdVerifyCert.promise();
            }
            else if (clientSignMode=='iOSApp') { // 2016.11.15 - 以iOS DocSign App簽章, 前面已檢核過了, 此處不用再執行!
                _dfdVerifyCert.resolve({
                    valid: true,
                    tmpCert: false
                });
                _prmVerifyCert = _dfdVerifyCert.promise();
            }
            else {
                _dfdVerifyCert.resolve({
                    valid: true,
                    tmpCert: false
                });
                _prmVerifyCert = _dfdVerifyCert.promise();
            }

            _prmVerifyCert.done(function(rslt) {
                // 使用正式/臨時憑證智慧卡.
                if (typeof rslt!=='undefined' && typeof rslt.tmpCert=='boolean' && rslt.tmpCert===true) {
                    useTmpCert = true;
                }
                else {
                    useTmpCert = useTmpCert;
                }

                // 2020.9.9 - Eric, bug-fix
                // 2020.7.16 - 1090470 Eric, 若使用臨時憑證簽章, 須叫用 ODMSSP.SetToDoListTmpCerState, 後續才能補簽!
                let state = 'N'; // value: Y|N
                if (useTmpCert) {
                    state = 'Y';
                }
                theWebServices.odmssp.setTodoListTmpCerState(SAMLart, sourceOrgNo, _msgId, state, COMNo, {async:true, })
                .then(function(rslt) {
                    _dfdSub.resolve($.extend({docNo:COMNo}, signRslt));
                })
                .fail(function(errRslt) {
                    _dfdSub.reject($.extended({success:false}, errRslt));
                });
            })
            .fail(function(errRslt) {
                _dfdSub.reject(errRslt);
            });
            return _dfdSub.promise();
        })
        .then(function(signRslt) {
            // 2021.5.23 - 1100093 Eric, bug-fix (若子文已封裝彙併辦流程, 毋須再執行時, 跳過相關加簽作業!)
            let _dfdSub = $.Deferred();
            if (_endJob) {
                _dfdSub.resolve({success:true, docNo:COMNo});
                return _dfdSub.promise();
            }

            if (signRslt.serverSigned) {
                let _dfdIn = $.Deferred();
                _dfdIn.resolve({success:true, docNo:COMNo});
                return _dfdIn.promise();
            }

            theLogger.log('-I- gonna signEnvelope()...');
            let ICUserId = '';  
			//1140508	Leslie[1140331]	[退輔會]Merge[1111194]改用彙併辦子文專用以區分是否改用工作站模式
            // return theSSO.MP.envelopeUtil.signEnvelope(SAMLart, COMNo, ICUserId, _msgId, signRslt.signValue,
                    // signRslt.signCert, sourceOrgNo, _fileIOWSUrl);
			//1140813	Leslie[序181]	修正子文加簽用的Url參數
			// return theWebServices.webFileIO.comDocSignEnvelope(SAMLart, COMNo, _msgId, signRslt.signValue,
                    // signRslt.signCert, sourceOrgNo, _fileIOWSUrl);
			return theWebServices.webFileIO.comDocSignEnvelope(SAMLart, COMNo, _msgId, signRslt.signValue,
                    signRslt.signCert, sourceOrgNo, {async:true, url:_fileIOWSUrl});
        })
        .then(function() {
            _dfdSubDocEnve.resolve({success:true, docNo:COMNo});
        })
        .fail(function(errRslt) {
            theLogger.log('-E- _processSubDocEnve() last fail_callback(), msg=' + errRslt.errMsg);
            _dfdSubDocEnve.reject(errRslt);
        });
        return _dfdSubDocEnve.promise();
    }

    // 2021.5 - 1100093 merge: 2020.3.3 - 1081168 Eric, 子文彙併辦流程 & [本件公文/子文]解彙併辦流程封裝
    function _processSubDoc(_docObj, pincode, clientSignMode, fSubmitSign, fServerSign, fSupportHashSign) {
        let _dfdProcSubDoc = $.Deferred();

        // 由公文封裝檔及ODWMSG.COM_NO取得彙併辦子文清單, 若有異動, 則須執行子文[彙併辦]/[解除彙併辦]流程封裝作業!
        let enveCOMNos = SSOUtil.getEnveFileCOMDoc(_docObj);
        if ((Array.isArray(enveCOMNos) && enveCOMNos.length) ||
            (Array.isArray(_docObj.ODWDCM.COM_NO) && _docObj.ODWDCM.COM_NO.length)) {
            // 檢核是否異動子文清單!
            let newMergeDocs = [];
            let unMergeDocs = [];
            let i=0;
            let cntCOMDoc = _docObj.ODWDCM.COM_NO.length;    
            let newCOMNos = [];
            for(i=0; i<cntCOMDoc; i++) {
                let comDoc = _docObj.ODWDCM.COM_NO[i];
                if (comDoc.COM_DOC_NO!=_docObj.docNo && comDoc.COM_COMBINE_TYPE==='1') {
                    let comDocNo = comDoc.COM_DOC_NO;
                    if (enveCOMNos==null || (enveCOMNos.indexOf(comDocNo)==-1)) {
                        newMergeDocs.push(comDocNo);
                    }
                }
                newCOMNos.push(comDoc.COM_DOC_NO);
            }

            if (enveCOMNos!==null) {
                for(i=0; i<enveCOMNos.length; i++) {
                    let comNo = enveCOMNos[i];
                    if (newCOMNos.indexOf(comNo)==-1) {
                        unMergeDocs.push(comNo);
                    }
                }
            }

            let _dfdProc = $.Deferred(), 
                _dfdNext = _dfdProc;
            
            // 未異動子文清單, 不處理!
            if (newMergeDocs.length==0  && unMergeDocs.length==0) {
                _dfdProcSubDoc.resolve({success:true});
                theLogger.log('-I- _processSubDoc() 未異動子文清單, 不處理!');
                return _dfdProcSubDoc.promise();
            }

            // 2020.7.16 - 1090470 Eric, 子文封裝支援臨時憑證加簽!
            let _signMode = clientSignMode;
            if (fServerSign && _signMode=='SCard') {
                _signMode = 'NONE';
            }

            _dfdProc.resolve({success:true}); // start the queue!
            let arrJob = []
            for(i=0; i<newMergeDocs.length; i++) {
                let newCOMNo = newMergeDocs[i];
                arrJob.push(newCOMNo);

                _dfdNext = _dfdNext.then(function() {
                    var subDocNo = arrJob.shift();
                    return _processSubDocEnve(_docObj, subDocNo, 0x10, pincode, _signMode, fSubmitSign, fSupportHashSign)
                        .done(function(rslt) {
                            theLogger.log('-I- _processSubDocEnve(..., subDocNo='+ rslt.docNo + ', flags, pin) finished.');
                            if (unMergeDocs.length==0 && rslt.docNo==newMergeDocs[newMergeDocs.length-1]) {
                                theLogger.log('-I- _processSubDoc() finished.');
                                _dfdProcSubDoc.resolve({success:true});
                            }
                        })
                        .fail(function(errRslt) {
                            theLogger.log('-E- call _processSubDocEnve() fail_callback(), msg=' + errRslt.errMsg);
                            _dfdProcSubDoc.reject(errRslt);
                        });
                });
            }

            for(i=0; i<unMergeDocs.length; i++) {
                let newCOMNo = unMergeDocs[i];
                arrJob.push(newCOMNo);

                _dfdNext = _dfdNext.pipe(function() {
                    var subDocNo = arrJob.shift();
					//1130812	Leslie[1130466]	一併修正彙併辦的SignMode錯誤，彙併/解併都應該用同一個SignMode
                    // return _processSubDocEnve(_docObj, subDocNo, 0x20, pincode, clientSignMode, fSubmitSign, fSupportHashSign)
                    return _processSubDocEnve(_docObj, subDocNo, 0x20, pincode, _signMode, fSubmitSign, fSupportHashSign)
                        .done(function(rslt) {
                            if (rslt.docNo==unMergeDocs[unMergeDocs.length-1]) {
                                theLogger.log('-I- _processSubDoc() finished.');

                                // 2020.7.15 - 1090470 Eric, support temp cert.
                                if (SSOUtil.isValueTrue(localStorage['dev_subDocProc'])) {
                                    _dfdProcSubDoc.reject({success:false, errMsg:'subDocProc develope test, return fail.'});
                                }
                                else {
                                    _dfdProcSubDoc.resolve({success:true});
                                }
                            }
                        })
                        .fail(function(errRslt) {
                            theLogger.log('-E- call _processSubDocEnve() fail_callback(), msg=' + errRslt.errMsg);
                            _dfdProcSubDoc.reject(errRslt);
                        });
                });
            }
            return _dfdProcSubDoc.promise();
        }
        else {
            _dfdProcSubDoc.resolve({success:true});
            return _dfdProcSubDoc.promise();
        }
    }

    // 2021.5 - 1100093 - merge: 2021.1.4 - 1090821 Eric, 支援送外機關陳核會稿公文
    function _shouldGenCoPDF(_docObj) {
        let sOutputCoPresentFolder = theSSO.User.EnvSettings.get('AOL_OUTPUT_PRESENT_FOLDER');
        if (typeof sOutputCoPresentFolder=='string' && sOutputCoPresentFolder.length) {
            let currentFolder = _docObj.folder;
            let currentSubFolder = _docObj.subfolder;
            let currentTxName = _docObj.txName;

            let folders = sOutputCoPresentFolder.split(';');
            let i=0;
            for(i=0; i<folders.length; i++) {
                let folderSetting = folders[i];
                if (typeof folderSetting=='string' && folderSetting.length) {
                    let setting = folderSetting.split('|');
                    if (setting.length==3) {
                        if (currentFolder === setting[0] && currentSubFolder === setting[1] && currentTxName === setting[2]) {
                            theLogger.log('-I- doc:' + _docObj.docNo + ', folder:' + currentFolder + '-' + currentSubFolder + ', TX_NAME=' + currentTxName + ', 應輸出CoPresentPages!');
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    // submit doc functions
    function _doServerSignSubmit(_aol, SAMLart, pincode, _docObj, _ruleOption, updateEnve, fSubmitSign, aolSubmitStatus) {
        var _dfdServerSignSubmit = $.Deferred();

        // 2021.5 - 1100093 - merge: 2020.12 - 1090821 Eric, 支援送外機關陳核會稿公文
        let fGenCoPDF = false;

		// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
		var _saveEndCallback = null;
		//1140610	Leslie[1131183]	[Merge-1111006]新增傳送成功後應刪除檔案清單
		var _mustDelFiles = null;
		
		//1130130	Leslie[1120330]	修正當要傳送至一層決行，而預排流程中仍有未完成的會辦流程時則強制送會辦，調整傳送流程(先檢核再儲存)
		_checkUnfinishedCoworkFlow(_docObj, _aol.nextTarget)	//因為Deferred流程，改到裡面才判斷
		.then(function(){
			return _saveMsg(SAMLart, _aol, _docObj, aolSubmitStatus);
		})		
        //_saveMsg(SAMLart, _aol, _docObj, aolSubmitStatus)		//1130130	Leslie[1120330]	配合調整流程，移到上面叫用
		// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
        //.then(function() { // 2021.4.20 - 1080768, merge MOI-1070655 傳送一層決行單位前檢核是否有未完成的會辦流程.
		//1140610	Leslie[1131183]	[Merge-1111006]新增傳送成功後應刪除檔案清單回傳值
		// .then(function(rslt, saveEndCallback) {
		.then(function(rslt, saveEndCallback, mustDelFiles) {
			if(!!saveEndCallback){
				_saveEndCallback = saveEndCallback;
				//1140610	Leslie[1131183]	[Merge-1111006]新增傳送成功後應刪除檔案清單
                _mustDelFiles = mustDelFiles;
			}
			//1130130	Leslie[1120330]	配合調整流程，儲存後直接接後續檢核
            // let sVal = theSSO.User.EnvSettings.get('CHECK_UNFINISHED_COWORK_FLOW');
            // if (SSOUtil.isValueTrue(sVal)) {
                // return _checkUnfinishedCoworkFlow(_docObj, _aol.nextTarget)
            // }
            // else {
                let _dfdInner = $.Deferred();
                _dfdInner.resolve({success:true})
                return _dfdInner.promise();
            // }
        })
        .then(function() {
            // 2021.9.15 - 1090862 Eric, 歸檔傳送前檢核若公文有可發文文稿且未發文, 須提示使用者決定是否傳送
            return _checkDocIssueStatus_PreSubmit(_aol, true);
        })
        .then(function() {
            var _dfd = $.Deferred();
            
            var _ruleErrItem = [];
            if (!_checkSuitable_PreSubmit(_docObj, _ruleOption, _ruleErrItem, _aol)) {
                var _ruleErrStr = '無法傳送公文文號[' + _docObj.docNo + ']:' + _ruleErrItem.toString();
                _dfd.reject({success:false, _showError:true, _errMsg: _ruleErrStr});
                return _dfd.promise();
            }
            
            // 2017.8.25 - 1060728, 傳送前檢核補齊
            var _prm = _checkEDocContent_PreSubmit(_aol);
            _prm.done(function(rsltContentCheck) {
                // 2021.5 - 1100093 - merge: 2021.1.4 - 1090821 Eric, 支援送外機關陳核會稿公文
                fGenCoPDF = _shouldGenCoPDF(_docObj);
                if (!fGenCoPDF && (_docObj.docNo===localStorage.dev_CreatePresentPDF_DocNo)) {
                    fGenCoPDF = true;
                }

                if (!rsltContentCheck.success || !rsltContentCheck._continue) {
                    var _errMsgIn = '';
                    if (!rsltContentCheck.success) {
                        _errMsgIn = '檢核最後預排流程點作業時發生錯誤!';
                        _dfd.reject({success:false, _errMsg: _errMsgIn});
                    }
                    else {
                        _dfd.reject({success:false, _showError:false, _errMsg: '使用者取消傳送作業! [最後流程傳送確認]'});
                    }
                    return;
                }

                /* 2015.6 - QuickFix, 承辦前分辦公文時不異動封裝檔 */
                if (updateEnve) {
                    /* 2017.2.7 - 以ODWMSG.TMP_CER判定加簽使用的憑證為[正式]或[臨時憑證]
                    =>前面作業會使用系統參數II_SIGN_MODE判定, 並設定此欄位值 */
                    var useTmpSoftCert = true;
					
                    if (fSubmitSign) {
                        var tmpCert = _docObj.get('ODWMSG', 'TMP_CER');
                        if (tmpCert=='N') {
                            useTmpSoftCert = false;
                        }
                    }

                    // 2021.5 - 1100093 - merge: 2020.3.4 - 1081168 Eric, 彙併辦子文封裝作業!
                    let _prmProcSubDoc = null;

                    // 2021.12.28 - Eric, 將預設值改為true (彙併辦母文傳送時一併封裝子文)
                    let fProcessSubDoc = true;
                    let sVal = theSSO.User.EnvSettings.get('SSO_ENVELOP_COMDOC');
                    if (typeof sVal=='string' && sVal.length && SSOUtil.isValueFalse(sVal)) {
                        fProcessSubDoc = false;
                    }

                    if (fSubmitSign && fProcessSubDoc) {
						//1130809	Leslie[序183]	彙併辦傳送時，應正確傳入是否支援Hash加簽(Server加簽不支援Hash加簽)
                        // _prmProcSubDoc = _processSubDoc(_docObj, pincode, 'NONE', fSubmitSign, true, aolSubmitStatus);
                        _prmProcSubDoc = _processSubDoc(_docObj, pincode, 'NONE', fSubmitSign, true, false);
                    }
                    else {
                        // 2021.5 - 1100093 Eric - 若公文設定毋須加簽, 則不處理彙併辦子文封裝. 
                        let _dfdProcSubDoc = $.Deferred();
                        _dfdProcSubDoc.resolve({success:true});
                        _prmProcSubDoc = _dfdProcSubDoc.promise();
                    }

                    _prmProcSubDoc
                    .done(function() {
                        let tmBeginUpdateEnve = 0;
                        if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- 更新公文封裝檔(updateDocEnvelope) BEGIN...');
                            tmBeginUpdateEnve = Date.now();
                        }

                        // 2020.7.30 - 1090409 Eric, 支援公文傳送時匯出抄本頁面功能 (_getAOLSubmitStatus)
                        // aolSubmitStatus.genFormalPage
                        var _prmUpdateDocEnve = _updateDocEnvelope(SAMLart, pincode, _docObj, fSubmitSign, true, false, useTmpSoftCert, aolSubmitStatus.genFormalPage);
                        _prmUpdateDocEnve.done(function(rsltUpdateDocEnve){
                            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                                let _log = SSOUtil.dev_getTimeElapseStr('更新公文封裝檔 (updateDocEnvelope)', tmBeginUpdateEnve);
                                theLogger.time(_log);
                            }
                            _dfd.resolve(rsltUpdateDocEnve);
                        })
                        .fail(function(errRsltUpdateDocEnve) {
                            _dfd.reject(errRsltUpdateDocEnve);
                        });
                    })
                    .fail(function(errRsltProcSubDoc){
                        _dfd.reject(errRsltProcSubDoc);
                    });
                }
                else {
                    _dfd.resolve({success:true, signed:false, tobeSign:''});
                }
            })
            .fail(function(rsltContentCheck) {
                if (!rsltContentCheck.success || !rsltContentCheck._continue) {
                    var _errMsgIn = '';
                    if (!rsltContentCheck.success) {
                        _errMsgIn = '檢核最後預排流程點作業時發生錯誤!';
                        _dfd.reject({success:false, _errMsg: _errMsgIn});
                    }
                    else {
                        _dfd.reject({success:false, _showError:false, _errMsg: _errMsgIn});
                    }
                }
            });

            return _dfd.promise();
        })
        .then(function(rslt){
            theLogger.log('-I- updateEnvelope() finished, success:' + (rslt.success ? 'Y':'N'));
            
            // 2020.3.25 - 1090193 Eric, 若PC使用Server軟體臨時憑證, 則不記錄pincode
            let _tmpCert = SSOUtil.isValueTrue(_docObj.tmpCert);
            let _clientSignMode = SSO_CONFIG.getClientSignMode();
            let _pcTmpServerCert = false;
            if (_clientSignMode=='SCard' && _tmpCert) {
                _pcTmpServerCert = true;
            }
            
            // 2019.8.22 - 1080654 Eric, 補記錄pincode
            if (fSubmitSign && !_pcTmpServerCert && typeof pincode=='string' && pincode.length) {
                var keepPin = true;
				var rememberPincode = theSSO.User.EnvSettings.get('MP_REMEMBER_AOL_PINCODE');
				if (typeof rememberPincode=='string' && rememberPincode.length) {
					rememberPincode = rememberPincode.toLowerCase();
					if (rememberPincode=='false' || rememberPincode=='0') {
						keepPin = false;
					}
				}
				if (keepPin) {
					theSSO.User.igotu = pincode;
				}
            }

            var _dfd = $.Deferred();
            
            var _go = true;
            if ((typeof _debugSubmit!=='undefined') && _debugSubmit && (theSSO.User.account=='POLLY'||theSSO.User.account=='LIFENH')) {
                _go = confirm('SubmitMsg-Debug: updateEnvelope完成, 繼續執行傳送作業?');
            }
            
            if (_go===false) {
                theLogger.warn('SubmitMsg-Debug: updateEnvelope完成, 中止後續作業!');
                _dfd.reject($.extend({_showError: false}, {_errMsg:'Debug Cancel!'}, ture));
                return _dfd.promise();
            }
            
            var draftFilePath='', destServerWSUrl='', destRootPath='', destFilePath='', subDirDate='';
            var newMsgInfo = null;
            // 若為草稿, 須搬移電子檔至公文正式儲存區
            if (_docObj.isDraft) {
                _docObj._draftSubmitRestore = null;
                
                // 1. 取得公文正式儲存區資訊
                theWebServices.odmssp.newMsg(SAMLart, _docObj.sourceOrgNo)
                .then(function(rslt){
                    // 2. 搬移檔案到正式儲存區
                    // draftFilePath, destServerWSUrl, destFilePath
                    draftFilePath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                    destServerWSUrl= rslt.newMsgInfo.wsUrl;
                    destRootPath = rslt.newMsgInfo.storagePath;
                    
                    var now = new Date();
                    var dirYYYMM = (now.getFullYear()-1911).toString() + SSOUtil.padLeft((now.getMonth()+1).toString(), 2);
                    var dirDate = SSOUtil.padLeft(now.getDate().toString(), 2);
                    subDirDate = SSOUtil.combineLocalPath(dirYYYMM, dirDate);
                    
                    destFilePath = SSOUtil.combineLocalPath(destRootPath, _docObj.sourceOrgNo);
                    destFilePath = SSOUtil.combineLocalPath(destFilePath, subDirDate);
                    destFilePath = SSOUtil.combineLocalPath(destFilePath, _docObj.docNo);
                    
                    newMsgInfo = rslt.newMsgInfo;
                    
                    var hasRefAttFile = false;
                    if ($.isFunction(_aol.getCurrFolio().getRefAttachsFileCnt)) {
                        hasRefAttFile = (_aol.getCurrFolio().getRefAttachsFileCnt()>0);
                    }

					//1111011	Leslie[1110865]	配合新增的簽閱附件，新增配套邏輯
					var hasTmpAttFile = false;
					if ( SSO_CONFIG.OrgNickName == "MOCS" && $.isFunction(_aol.getCurrFolio().getTmpAttachsFileCnt)){
						hasTmpAttFile = (_aol.getCurrFolio().getTmpAttachsFileCnt() > 0);
					}

                    // 2020.9.15 - 1090564 Eric, 草稿電子檔搬移時須調整檔案/子目錄清單!
                    let _option = {
                        async: true, 
                        url: _docObj.fileIOWS,
                        fSMEGWebDoc: false
                    };
                    if (SSO_CONFIG.OrgNickName=='SMEG' && _docObj.get('ODWDCM', 'DRAFT_SOURCE_TYPE')=='2') {
                        _option.fSMEGWebDoc = true;
                    }
					
					//1111011	Leslie[1110865]	配合新增的簽閱附件，新增配套邏輯
                    // return theWebServices.webFileIO.copyDraftFilesToStoragePath(SAMLart, _docObj.docNo, _docObj.signType, hasRefAttFile, draftFilePath, destServerWSUrl, destFilePath, _option);
                    return theWebServices.webFileIO.copyDraftFilesToStoragePath(SAMLart, _docObj.docNo, _docObj.signType, hasRefAttFile, draftFilePath, destServerWSUrl, destFilePath, _option, hasTmpAttFile);
                })
                .then(function(rslt){
                    // 3. 異動公文基資的電子檔儲存位置相關欄位
                    var _subDir = SSOUtil.combineLocalPath(_docObj.sourceOrgNo, subDirDate); // $OrgNo$/YYYMM/DD/$DocNo$
                    _subDir = SSOUtil.combineLocalPath(_subDir, _docObj.docNo);
                    
                    var _dfd_in = $.Deferred();
                    
                    if (_docObj.isDraft) {
                        _docObj._draftSubmitRestore = {
                            MSG_ID: _docObj.get('ODWMSG', 'MSG_ID'),
                            DRAFT_MSG_ID: _docObj.get('ODWMSG', 'DRAFT_MSG_ID'),
                            WEB_SERVICE: _docObj.get('ODWMSG', 'WEB_SERVICE'),
                            STORAGE_PATH: _docObj.get('ODWMSG', 'STORAGE_PATH'),
                            SRV_NO: _docObj.get('ODWSMG', 'SRV_NO'),
                            SUB_DIR: _docObj.get('ODWSMG', 'SUB_DIR')
                        };
                    }
                    
                    var msgIdTrue = _docObj.msgId;
                    _docObj.set2('', 'ODWMSG', { MSG_ID: '0', SRV_NO: newMsgInfo.srvNo,
                                           DRAFT_MSG_ID: msgIdTrue, WEB_SERVICE: newMsgInfo.wsUrl,
                                           STORAGE_PATH: newMsgInfo.storagePath, SUB_DIR: _subDir});
                    
                    // 4. 上傳公文基資檔到正式儲存區
                    var _newServerPath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                    _uploadDocInfo(_docObj, _newServerPath, true)
                    .done(function() {
                        _dfd_in.resolve({success:true});
                    })
                    .fail(function(errRslt){
                        if (!!_docObj._draftSubmitRestore) {
                            _resoterDraftDocInfo(_docObj);
                        }
                        _dfd_in.reject({success:false, _errMsg:'重設正式公文基資後上傳基資檔作業失敗!'});
                    });
                    return _dfd_in.promise();
                })
                .then(function(){
                    _dfd.resolve({success:true});
                })
                .fail(function(rslt){
                    if (!!_docObj._draftSubmitRestore) {
                        _resoterDraftDocInfo(_docObj);
                    }
                    theLogger.error(rslt._errMsg);
                    _dfd.reject($.extend({_showError: true}, rslt, true));
                });
                return _dfd.promise();
            }
            else {
                // 2021.5 - 1100093 - merge: 2021.1.14 - 1090821 Eric, 支援送外機關陳核會稿公文 [送會簽/回退文前應輸出呈現檔!]
                if (fGenCoPDF) {
                    // 叫用ODMSSP產出呈現檔函式!
                    let draftFilename = theAOL.getCurrFolio().getDraftFileName(0);
                    if (typeof draftFilename=='string' && draftFilename.length) {
                        let idxExtension = draftFilename.lastIndexOf('.');
                        if (idxExtension!=-1) {
                            draftFilename = draftFilename.substr(0, idxExtension);
                            // 2021.5 - 1100093 Eric merge: 2021.3.16 - 1090821 Eric, bug-fix. (回傳之文槁檔名可能為 XXX-tc.xml, 去除'-tc')
                            draftFilename = draftFilename.replace('-tc', '');
                        }
                        return theWebServices.odmssp.genCoPDF(SAMLart, _docObj.sourceOrgNo, _docObj.docNo, draftFilename,  {async:true});
                    }
                    else {
                        _dfd.reject({success:false, errMsg:'產出呈現檔作業, 無法取得文稿原始檔名稱.'});
                        return _dfd.promise();    
                    }
                }
                else {
                    _dfd.resolve({success:true});
                    return _dfd.promise();
                }
            }
        })
        .then(function() {
            var _go = true; //confirm('叫用ODMSSP.SubmitMsg?');
            if (typeof SSO_CONFIG.debugSubmit=='boolean' && SSO_CONFIG.debugSubmit===true) {
                _go = confirm('SubmitMsg-Debug: 叫用ODMSSP.SubmitMsg執行傳送作業?');
            }
            
            if (_go) {
                return _submitMsg(SAMLart, _docObj, _aol, {Stage2Submit:false, AOLEDocSubmit:true});
            }
            else {
                var _dfd = $.Deferred();
                _dfd.reject({success:false, errMsg:'For debug!取消公文傳送作業!'});
                return _dfd.promise();
            }
        })
        .then(function(rsltSubmit) {
            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                _log = SSOUtil.dev_getTimeElapseStr('公文傳送作業', window.tmBeginSubmit, window.tmGetPIN);
                theLogger.time(_log);
                window.tmBeginSubmit = 0; window.tmAfterGetPIN = 0; window.tmGetPIN = 0;
            }

            // 2019.8.14 - 1080654 Eric, 傳送後自動開次筆功能
            let _dfd = $.Deferred();
            if ('nextDocObj' in rsltSubmit && rsltSubmit.nextDocObj!=null) {
                window.tmBeginOpenDoc = Date.now();
                window.tmBeginOpenDoc2 = window.tmBeginOpenDoc;
                if (window.iOS_device) {
                    window.tmBeginOpenDoc3 = window.tmBeginOpenDoc;
                }
                else {
                    window.tmBeginOpenDoc3 = 0;
                }

                let _nextDocObj = rsltSubmit.nextDocObj;
                let SAMLart = localStorage.Artifact;
                theSSO.MP.todolist.builder.checkMsgValidity(SAMLart, _nextDocObj)
                .then(function(rslt) {
                    var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, _nextDocObj.sourceOrgNo, _nextDocObj.signType);
                    if (menuRule) {
                        if (_nextDocObj.signType=='E' || _nextDocObj.signType=='P') {
                            var rule = menuRule.getRule(_nextDocObj.folder, _nextDocObj.subfolder);
                            if (typeof rule=='undefined' || rule===null) {
                                alert('無法取得公文夾[' + _nextDocObj.folder + '-' + _nextDocObj.subfolder +']MenuRule設定');
                                _dfd.reject({success:false, errMsg:'無法取得公文夾[' + _nextDocObj.folder + '-' + _nextDocObj.subfolder +']MenuRule設定!'});
                            }
                        }
                        
                        SSOUtil.toggleFuncButton(0x3, true);

                        // 開啟次筆待辦公文
                        theSSO.MP.openDocWithAOL(SAMLart, _nextDocObj, 'todolist', true); // list item touch
                        _dfd.resolve({success:true});
                    }
                    else {
                        alert('無法取得MenuRule設定');
                        _dfd.reject({success:false, errMsg:'無法取得MenuRule!'});
                    }
                })
                .fail(function(rslt){
                    if(!!rslt && !!rslt.msg) {
                        theLogger.error(rslt.msg);
                    }
                    else {
                        theLogger.error('檢核MsgId有效性或loadDocPreview failed.');
                    }
                    _dfd.reject(rslt);
                });
            }
            else {
                _dfd.resolve({success:true});
            }
            return _dfd.promise();
        })
        .then(function(){
			// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
			if(!!_saveEndCallback && $.isFunction(_saveEndCallback)) {
				theLogger.log("傳送成功, 呼叫theAOL.getCurrFolio().save()時傳入的callback function...");
				_saveEndCallback();
			}
            _dfdServerSignSubmit.resolve({success:true});
        })
        .fail(function(errObj) {
            var errMsg = '';
            if (errObj) {
                var showErr = true;
                if (typeof errObj._showError=='boolean' && errObj._showError===false) {
                    showErr = false;
                }
                
                if (!!errObj.errMsg && errObj.errMsg.length) {
                    errMsg = errObj.errMsg;
                }
                else if (!!errObj._errMsg && errObj._errMsg.length) {
                    errMsg = errObj._errMsg;
                }
                if (errMsg.length && showErr) {
                    // 2018.1.15 - 1061276
                    if (typeof errObj.checkDataErr=='boolean' && errObj.checkDataErr===true) {
                        alert(errMsg);
                    }
                    else {
                        alert('公文傳送作業失敗[Server加簽模式], 錯誤說明:' + errMsg);
                    }
                }
            }
            
            theLogger.error('-ERR- _doServerSignSubmit() failed.');
            SSOUtil.loading('hide'); // 2016.9.6 - 序115
            SSOUtil.toggleFuncButton(0x3, true);
            _dfdServerSignSubmit.reject({success:false, errMsg:errMsg});
        });
        return _dfdServerSignSubmit.promise();
    } // EOF _doServerSignSubmit

    /* 2015.2 - client加簽模式 */
    function _doClientSignSubmit(_aol, SAMLart, _docObj, clientSignMode, pincode, updateEnve, fSubmitSign, aolSubmitStatus) {
		//1140318	Leslie[1140443]	針對背景傳送，調整錯誤訊息處理與停用重置PinCode
        // theLogger.log('Begin of _doClientSignSubmit()...\r\nupdateEnve=' + updateEnve?'true':'false' + ', fSubmitSign=' + fSubmitSign?'true':'false');
		theLogger.log(`Begin of _doClientSignSubmit()...updateEnve=${updateEnve?'true':'false'}, fSubmitSign=${fSubmitSign?'true':'false'}`);
        
        /* inner function */
        function _getFullUrl(filename) {
            var _href = window.location.href;
            var idxLastSlash = _href.lastIndexOf('/');
            var fullPathname = _href.substr(0, idxLastSlash+1) + filename;
            return fullPathname;
        }
        
        /* 由 待簽資訊判定hash algorithm: 'SHA1' / 'SHA256' */
        function _getHashAlgorithm(sTobeSignXML) {
            var _hashAlg = 'SHA1';
            if (!!sTobeSignXML && sTobeSignXML.length && sTobeSignXML.indexOf('http://www.w3.org/2001/04/xmlenc#sha256')!==-1) {
                _hashAlg = 'SHA256';
            }
            return _hashAlg;
        }
        
        function _resoterDraftDocInfo(theDocObj) {
            if (!!theDocObj._draftSubmitRestore) {
                theDocObj.set2('aol', 'ODWMSG', theDocObj._draftSubmitRestore);
                theDocObj._draftSubmitRestore = null;
            }
        }
        
        if (typeof pincode=='undefined') {
            pincode = '';
        }
        if (typeof updateEnve=='undefined') {
            updateEnve = true;
        }
        if (typeof fSubmitSign=='undefined') {
            fSubmitSign = true;
        }
        
        var tobeSign = '';
        var useTmpSoftCert = false;
		// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
		var useFormalSoftCert = false;
		//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
		var mobileMoica = {};
        
        var _dfdClientSignSubmit = $.Deferred();
        
        var tmBeginGetPIN, tmBeginUpdateEnve, tmBeginDraftProc; // time tracking...
        tmBeginGetPIN = 0;  window.tmGetPIN = 0; window.tmAfterGetPIN = 0;

        /* 儲存公文內容 */
		// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
		var _saveEndCallback = null;
		//1140610	Leslie[1131183]	[Merge-1111006]新增傳送成功後應刪除檔案清單
		var _mustDelFiles = null;
		
		//1130130	Leslie[1120330]	修正當要傳送至一層決行，而預排流程中仍有未完成的會辦流程時則強制送會辦，調整傳送流程(先檢核再儲存)
		_checkUnfinishedCoworkFlow(_docObj, _aol.nextTarget)	//因為Deferred流程，改到裡面才判斷
		.then(function(){
			// 2023.5.17 - 1111006 Eric, merge: 2022.11.3 - Eric, 新增'signPageP2'屬性是否存在檢核
			//  1101623 Eric: 使用傳送子視窗(背景傳送)時, 若使用者決定使用行自動然人憑證加簽, 會叫用此函式完成公文封裝,簽章及傳送作業.
			//  因叫用函式(_clientSignSubmit_withSignPage)已完成下列作業:
			//  _saveMsg/_checkUnfinishedCoworkFlow/_checkEDocContent_PreSubmit/_getPincode作業, 
			//  故本函式作業須跳過部份程序!
			if (typeof aolSubmitStatus == 'object' && aolSubmitStatus!=null && 
				'signPageP2' in aolSubmitStatus && aolSubmitStatus.signPageP2) {
				let _dfdSaveMsg = $.Deferred();
				_dfdSaveMsg.resolve({success:true});
				return _dfdSaveMsg.promise();
			}
			else
				return _saveMsg(SAMLart, _aol, _docObj, aolSubmitStatus);
		})		
		
        //_saveMsg(SAMLart, _aol, _docObj, aolSubmitStatus)		//1130130	Leslie[1120330]	配合調整流程，移到上面叫用
		// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
        //.then(function() { // 2021.4.20 - 1080768, merge MOI-1070655 傳送一層決行單位前檢核是否有未完成的會辦流程.
		//1140610	Leslie[1131183]	[Merge-1111006]新增傳送成功後應刪除檔案清單回傳值
		// .then(function(rslt, saveEndCallback) {
		.then(function(rslt, saveEndCallback, mustDelFiles) {
			if(!!saveEndCallback){
				_saveEndCallback = saveEndCallback;
				//1140610	Leslie[1131183]	[Merge-1111006]新增傳送成功後應刪除檔案清單
                _mustDelFiles = mustDelFiles;
			}
			
			//1130130	Leslie[1120330]	配合調整流程，儲存後直接接後續檢核
            // let sVal = theSSO.User.EnvSettings.get('CHECK_UNFINISHED_COWORK_FLOW');
            // if (SSOUtil.isValueTrue(sVal)) {
                // return _checkUnfinishedCoworkFlow(_docObj, _aol.nextTarget)
            // }
            // else {
                let _dfdInner = $.Deferred();
                _dfdInner.resolve({success:true})
                return _dfdInner.promise();
            // }
        })
        .then(function() {			
			// 2023.5.17 - 1111006 Eric, 若aolSubmitStatus.signPageP2 == true 則跳過部份程序.
            if (typeof aolSubmitStatus == 'object' && aolSubmitStatus!=null &&
                'signPageP2' in aolSubmitStatus && aolSubmitStatus.signPageP2) {
                let _dfdPreSignMsg = $.Deferred();
                _dfdPreSignMsg.resolve({success:true});
                return _dfdPreSignMsg.promise();
            }
			
            // 2021.9.15 - 1090862 Eric, 歸檔傳送前檢核若公文有可發文文稿且未發文, 須提示使用者決定是否傳送
            return _checkDocIssueStatus_PreSubmit(_aol, true);
        })
        .then(function() {
			// 2023.5.17 - 1111006 Eric, 若aolSubmitStatus.signPageP2 == true 則跳過部份程序.
            if (typeof aolSubmitStatus == 'object' && aolSubmitStatus!=null &&
                'signPageP2' in aolSubmitStatus && aolSubmitStatus.signPageP2) {
				//1140627	Leslie[退輔會序46]	支援送外機關陳核會稿公文在背景傳送，應該在PageP2階段才做，補上
				fGenCoPDF = _shouldGenCoPDF(_docObj);
                if (!fGenCoPDF && (_docObj.docNo===localStorage.dev_CreatePresentPDF_DocNo)) {
                    fGenCoPDF = true;
                }
					
                let _dfdPreSignMsg = $.Deferred();
                _dfdPreSignMsg.resolve({success:true});
                return _dfdPreSignMsg.promise();
            }
			
            var _dfdIn = $.Deferred();
            let _ruleOption = _aol.nextTarget.ruleOption;
            let _ruleErrItem = [];
            if (!_checkSuitable_PreSubmit(_docObj, _ruleOption, _ruleErrItem, _aol)) {
                var _ruleErrStr = '無法傳送公文文號[' + _docObj.docNo + ']:' + _ruleErrItem.toString();
                _dfdIn.reject({success:false, _showError:true, _errMsg: _ruleErrStr, checkDataError: true}); // 2018.1.5 - 1061276
                return _dfdIn.promise();
            }

            // 2017.8.25 - 1060728, 傳送前檢核補齊
            var _prm = _checkEDocContent_PreSubmit(_aol);
            _prm.done(function(rsltContentCheck) {
                // 2021.5 - 1100093 - merge: 2021.1.4 - 1090821 Eric, 支援送外機關陳核會稿公文
                fGenCoPDF = _shouldGenCoPDF(_docObj);
                if (!fGenCoPDF && (_docObj.docNo===localStorage.dev_CreatePresentPDF_DocNo)) {
                    fGenCoPDF = true;
                }

                if (!rsltContentCheck.success || !rsltContentCheck._continue) {
                    var _errMsgIn = '';
                    if (!rsltContentCheck.success) {
                        _errMsgIn = '檢核最後預排流程點作業時發生錯誤!';
                        _dfdIn.reject({success:false, _errMsg: _errMsgIn});
                    }
                    else {
                        _dfdIn.reject({success:false, _showError:false, _errMsg: '使用者取消傳送作業! [最後流程傳送確認]'});
                    }
                }
                else {
                    _dfdIn.resolve({success:true});
                }
            })
            .fail(function(rsltContentCheck) {
                if (!rsltContentCheck.success || !rsltContentCheck._continue) {
                    var _errMsgIn = '';
                    if (!rsltContentCheck.success) {
                        _errMsgIn = '檢核最後預排流程點作業時發生錯誤!';
                        _dfdIn.reject({success:false, _errMsg: _errMsgIn});
                    }
                    else {
                        _dfdIn.reject({success:false, _showError:false, _errMsg: _errMsgIn, _checkDataError: true}); // 2018.1.5 - 1061276
                    }
                }
            });
            return _dfdIn.promise();
        })
        .then(function(rslt) {
			//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]，背景傳送針對Fido的修正處理，一併Merge
			// 2022.6.5  - 1101623 Eric, merge: 108654
            if (typeof aolSubmitStatus == 'object' && aolSubmitStatus!=null &&
                'signPageP2' in aolSubmitStatus && aolSubmitStatus.signPageP2) { // 2022.11.3 - Eric, 新增'signPageP2'屬生是否存在檢核
                let _dfdIn = $.Deferred();
                // 接收使用行動自然人憑證時, 先前叫用_getPincode()的回傳值:
                // aolSubmitStatus.verifyPinRslt = {success:true, rslt:'useMoibleMoica', 'verifyMode':moicaAPI}
                _dfdIn.resolve(aolSubmitStatus.verifyPinRslt);
                return _dfdIn.promise();
            }
			
            if (clientSignMode=='SCard' && updateEnve)  {
                if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    let _log = SSOUtil.dev_getTimeElapseStr('取Pincode前作業', window.tmBeginSubmit);
                    theLogger.time(_log);
                    theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- _getPincode() BEGIN...');
                    tmBeginGetPIN = Date.now();
                    window.tmGetPIN = 0;
                }
                return _getPincode(theAOL, 'SCardCert', fSubmitSign);    
            }
			//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
			else if(clientSignMode=='mobileMoica' && updateEnve){
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('取Pincode前作業', window.tmBeginSubmit);
					theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + '-tm- _getPincode() BEGIN...');
					tmBeginGetPIN = Date.now();
					window.tmGetPIN = 0;
				}
				return _getPincode(theAOL, 'mobileMoica', fSubmitSign);    
			}
            else {
                //1080118 Kevin 1080049 修正Use Of Hardcoded Password
                return {rslt:'skip', password:theSSO.Artifact};
            }
        })
        .then(function(obj) {
            var _dfd = $.Deferred();
            if (obj.rslt==='ok' && (obj.password.length>0) || obj.rslt=='skip')
            {
                SSOUtil.loading('show', { text:'公文傳送作業中', textVisible:true });
                
                if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    if (tmBeginGetPIN) {
                        window.tmGetPIN = Date.now() - tmBeginGetPIN;
                    }
                    let _log = SSOUtil.dev_getTimeElapseStr('_getPincode()', tmBeginGetPIN);
                    theLogger.time(_log);
                    window.tmAfterGetPIN = Date.now();
                }
                
                if (obj.rslt=='ok') {
                    pincode = obj.password;
                    theLogger.log("已取得Pincode");
                    useTmpSoftCert = obj.useTmpCert;
					// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
					useFormalSoftCert = obj.useFormalSoftCert;
                }
                else {
                    pincode = '';
                    theLogger.log("不使用Pincode");
                }
                
                // 2021.5 - 1100093 - merge: 2020.7.16 - 1090470 Eric, 子文封裝支援臨時憑證.
				// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
                // if (clientSignMode=='SCard' && useTmpSoftCert==true) {
                if (clientSignMode=='SCard' && (useTmpSoftCert==true || useFormalSoftCert==true)) {
                    fServerSign = true;
					
					//1140204	Leslie[驗證序20]	增修臨時憑證傳送設定，以避免彙併辦子文傳送用錯模式
					//1140418	Leslie[114問題彙整序75]	修正判斷臨時憑證
					// if(useTmpCert){
					if(useTmpSoftCert){
						_docObj.set2('aol', 'ODWMSG', {'TMP_CER':'Y'});
						_docObj.tmpCert = 'Y';
					}
                }
                else {
                    fServerSign = false;
                }
            }
			//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
			else if(obj.rslt === 'useMoibleMoica'){
				theLogger.log("使用行動自然人憑證加簽--驗證模式["+obj.verifyMode+"]");
				SSOUtil.loading('show', { text:'公文傳送作業中', textVisible:true ,html:'<span class="ui-icon-loading"></span><h1>公文傳送作業中..<a href="#" id="cancleMoibleMoica">取消</a></h1>'});
				//PUSH：顯示PUSH中,請稍後
				//QRCoce：show CRCoce
				mobileMoica['useMoibleMoica'] = true;
				mobileMoica['verifyMode'] = obj.verifyMode;
				fServerSign = false;
			}
            else {
                _dfd.reject({success:false, _showError: false, _errMsg:'使用者取消作業(輸入Pincode)'});
                 return _dfd.promise();
            }
            /* END */
                   
            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + '-tm- _processSubDoc() BEGIN...');
                tmBeginProcSubDoc = Date.now();
            }

            // 2021.5 - 1100093 - merge: 2020.3.4 - 1081168 Eric, 彙併辦子文封裝作業!
            // 2021.5 - 1100093 Eric - 若公文設定毋須加簽, 則不處理彙併辦子文封裝. 
            let _prmProcSubDoc = null;
            let fProcessSubDoc = true;
            let sVal = theSSO.User.EnvSettings.get('SSO_ENVELOP_COMDOC');
            if (typeof sVal=='string' && sVal.length && SSOUtil.isValueFalse(sVal)) {
                fProcessSubDoc = false;
            }
            if (fSubmitSign && fProcessSubDoc) {
				//1130809	Leslie[序183]	彙併辦傳送時，應正確傳入是否支援Hash加簽
                // _prmProcSubDoc = _processSubDoc(_docObj, pincode, clientSignMode, fSubmitSign, fServerSign, aolSubmitStatus);
                _prmProcSubDoc = _processSubDoc(_docObj, pincode, clientSignMode, fSubmitSign, fServerSign, aolSubmitStatus?.supportHashSign);		//1130813	Leslie[序186]	補個?，避免不異動封裝檔的傳送時，物件未初始化
            }
            else {
                let _dfdProcSubDoc = $.Deferred();
                _dfdProcSubDoc.resolve({success:true});
                _prmProcSubDoc = _dfdProcSubDoc.promise();
            }

            _prmProcSubDoc.then(function(rslt) {
                if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                    SSOUtil.dev_logTimeElapse('_processSubDoc()', tmBeginProcSubDoc);
                }

                theLogger.log('-I- gonna updateDocEnvelope()...');
                /* 封裝公文並回傳待簽內容 */
                if (updateEnve) {
                    if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                        theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- 更新公文封裝檔(updateDocEnvelope) BEGIN...');
                        tmBeginUpdateEnve = Date.now();
                    }
                    
                    // 2017.1.24
                    var serverSign = false;
                    if (useTmpSoftCert) {
                        serverSign = true;
                    _docObj.set2('aol', 'ODWMSG', {'TMP_CER':'Y'}); // 2017.2.21
                    _docObj.tmpCert = 'Y';
                    
                    console.log('-I- 使用軟體臨時憑證加簽(@server)'); 
                    }
					// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
					else if(useFormalSoftCert){
						serverSign = true;
						console.log('-I- 使用軟體正式憑證加簽(@server)'); 
					}
					
					//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
					if('useMoibleMoica' in mobileMoica && mobileMoica.useMoibleMoica === true)
						aolSubmitStatus.supportHashSign = true;
					

                    // 2020.7.30 - 1090409 Eric, 支援公文傳送時匯出抄本頁面功能 (_getAOLSubmitStatus)
                    // aolSubmitStatus.genFormalPage
					// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
                    // _updateDocEnvelope(SAMLart, useTmpSoftCert ? pincode : '', _docObj, fSubmitSign, serverSign, aolSubmitStatus.supportHashSign, useTmpSoftCert, aolSubmitStatus.genFormalPage)
                    _updateDocEnvelope(SAMLart, (useTmpSoftCert || useFormalSoftCert) ? pincode : '', _docObj, fSubmitSign, serverSign, aolSubmitStatus.supportHashSign, useTmpSoftCert, aolSubmitStatus.genFormalPage)
                    .done(function(rslt){
						//1130730	Leslie[彙整表序159]	中榮臨時憑證增加PinCode記憶功能
						//1141204	Leslie[彙整表序422]	北榮臨時憑證增加PinCode記憶功能
						//if(SSO_CONFIG.OrgNickName == "TVGH" && useTmpSoftCert)
						if(["TVGH","TPVGH"].includes(SSO_CONFIG.OrgNickName) && useTmpSoftCert)
							theSSO.User.tigotu = pincode;
						
						//1130815	Leslie[1130466]	新增支援PC端軟體正式憑證功能
						if(useFormalSoftCert)
							theSSO.User.figotu = pincode;
						
                        _dfd.resolve(rslt);
                    })
                    .fail(function(errRslt){
                        _dfd.reject(errRslt);
                    })
                }
                else {
                    theLogger.log('-I- 毋須異動封裝檔!');
                    _dfd.resolve({success:true});
                }
            }) 
            .fail(function(errRslt) {
                theLogger.log('-E- call _processSubDoc fail_callback, errMsg=' + errRslt.errMsg);
                _dfd.reject(errRslt);
            });  
            return _dfd.promise();
        })
        .then(function(updateRslt) {
            var sHashHeaderb64_SHA1 = 'MCEwCQYFKw4DAhoFAAQU'; // 2017.1.18 - 若回傳待簽資料SHA1 hash, 則header為此值!
            var sHashHeaderb64_SHA256 = 'MDEwDQYJYIZIAWUDBAIBBQAEI'; // 2017.3.16 - 若回傳待簽資料SHA256 hash, 則header為此值!
            var sXMLToBeSignHeader = 'PFNpZ25lZEluZm8+PENhbm9uaWNhbGl6YXRpb25NZXRob2Q'; // 2020.2.20 - 1090154 Eric, 確認是否為XML待簽內容: <SignedInfo><CanonicalizationMethod...
            
            theLogger.log('-I- updateEnvelope() finished.');
            
            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                let _log = SSOUtil.dev_getTimeElapseStr('更新公文封裝檔 (updateDocEnvelope)', tmBeginUpdateEnve);
                theLogger.time(_log);
            }
                
            var fHashSign = false;
            theSSO.MP.signDataDeferred = $.Deferred();
            
            var _dfd = theSSO.MP.signDataDeferred;
            
            // 2017.1.24 - 若使用server臨時憑證加簽, 再跳過加簽程序
            var serverTmpCertSigned = false;
            if (typeof updateRslt=='object' && typeof updateRslt.serverSigned=='boolean' && updateRslt.serverSigned) {
                serverTmpCertSigned = true;
            }
            
            // 若設定不加簽或不異動封裝檔 => 跳過
            if (!fSubmitSign || !updateEnve || serverTmpCertSigned) {
                _dfd = $.Deferred(); _dfd.resolve({serverSigned:serverTmpCertSigned}); 
                return _dfd.promise();
            }
            
            var tobeSign = updateRslt.tobeSign;
            if (updateRslt.success===true && tobeSign.length) {
				//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
                // if (SSO_CONFIG.getClientSignMode()=='iOSApp') {
				if (SSO_CONFIG.getClientSignMode()=='iOSApp' && clientSignMode!='mobileMoica') {	
                    theLogger.log('-I- gonna call iOS_SignData()...');
                    /* signData : function(_orgNo, _account, _docNo, _msgId, _tobeSign, _rsltUrl, _dfd) */
                    var rsltPage = SSO_CONFIG.iOSPage_URLs.signDocRslt;
                    if (!rsltPage || (rsltPage.length===0)) {
                        _dfd.reject({success:false, errMsg:'Error! 未設定iOS SignData之回傳網頁[SSO_CONFIG.signDocRslt].'});
                        return _dfd.promise();
                    }
                    
                    // 2019.7- 1080654 Eric, 傳送效能測試
                    if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                        theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 使用iOS App加簽 BEGIN...');
                    }

                    // 2022.1.3 - 1101433 Eric
                    if (SSOUtil.isValueTrue(localStorage.dev_docSignSubmit)) {
                        alert('ToBeSign=' + tobeSign);
                    }

                    // 2022.1.4 - 1101443 Eric, support hash sign
                    if (tobeSign.indexOf(sHashHeaderb64_SHA1)===0 || tobeSign.indexOf(sHashHeaderb64_SHA256)===0) {
                        fHashSign = true;
                    }

                    var rsltUrl = _getFullUrl(rsltPage);
                    return theSSO.MP.envelopeUtil.iOS_SignData(_docObj.sourceOrgNo, theSSO.User.account, _docObj.docNo, _docObj.msgId,
                                                           tobeSign, fHashSign, rsltUrl, _dfd);
                }
				//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
				else if('useMoibleMoica' in mobileMoica && mobileMoica.useMoibleMoica === true){
					return _signDocWithMobileMoica(SAMLart, _docObj.docNo, _docObj.msgId, tobeSign, mobileMoica, _dfd);
				}
                else { 
                    if (tobeSign.indexOf(sHashHeaderb64_SHA1)===0 || tobeSign.indexOf(sHashHeaderb64_SHA256)===0) {
                        fHashSign = true;
                    }
                    else { // 2020.2.20 - [1090154] Eric, 確認是否為XML待簽內容: <SignedInfo><CanonicalizationMethod...
                        if (tobeSign.indexOf(sXMLToBeSignHeader)!==0) {
                            let sToBeSign = Base64.decode(tobeSign);
                            sToBeSign = sToBeSign.lenght>32?(sToBeSign.substr(0, 32)):sToBeSign;
                            _dfd.reject({success:false, errMsg:'Error! 回傳之待簽內容不正確[非Hash值]! ToBeSign=' + sToBeSign});
                            return _dfd.promise();
                        }
                    }
                    
                    var sTobeSignXml='', _hashAlg='';
                    var _encodeMethod = fHashSign ? 'hashBase64' : 'base64';
                    // 2017.1.17 - 回傳資訊為<SignedInfo>內容時, 才要判定_hashAlg; 若為hash value, 則HiCOS LocalServer會自動判定
                    if (!fHashSign) {
                        sTobeSignXml = Base64.decode(tobeSign);
                        _hashAlg = _getHashAlgorithm(sTobeSignXml);
                    }

                    // 2019.7- 1080654 Eric, 傳送效能測試
                    if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                        theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 使用智慧卡憑證加簽 BEGIN...');
                        window.tmBeginSignDocWithSCard = Date.now();
                    }

                    return _signDocWithSCard(_docObj.docNo, _docObj.msgId, tobeSign, _encodeMethod, pincode, _hashAlg, _dfd);
                }
            }
            else {
                theLogger.error('Error! FileIOWS.UpateEnvelope, 未回傳待簽資訊!');
                _dfd.reject({success:false, errMsg:updateRslt.errMsg});
                return _dfd.promise();
            }
        })
        .then(function(signRslt){
            theLogger.log('-I- iOS_SignData/_signDocWithSCard/ServerTmpCertSign finished.');

            // 2020.8.7 - 1090490 Eric
            if (theSSO.MP.signDataDeferred!=null) {
                theSSO.MP.signDataDeferred = null;
            }

            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- iOS_SignData/_signDocWithSCard/ServerTmpCertSign finished.');
            }

            var _dfd = $.Deferred();
            
            var serverSigned = false;
            if (typeof signRslt=='object' && typeof signRslt.serverSigned=='boolean' && signRslt.serverSigned) {
                serverSigned = true;
            }
            var serverPath='', sErrMsg='';
            // 若設定不加簽或不異動封裝檔(或已在server使用臨時憑證加簽) => 跳過
            if (!fSubmitSign || !updateEnve || serverSigned) {
                if (updateEnve && serverSigned) {
                    // 2017.2.22 - 若使用臨時憑證,須更新ODWMSG.TMP_CER並重新上傳ODWMSG.XML
                    if (_docObj.get('ODWMSG', 'TMP_CER')=='Y') {
                        _docObj.tmpCert = 'Y';
                        serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
                        _uploadDocInfo(_docObj, serverPath)
                        .done(function(){
                            _dfd.resolve(signRslt);
                        })
                        .fail(function(errRslt) {
                            sErrMsg = '更新ODWMSG.TMP_CER欄位, 叫用_uploadDocInfo()時發生錯誤: ' + errRslt._errMsg;
                            theLogger.error('Error! ' + sErrMsg);
                            _dfd.reject({success:false, errMsg:sErrMsg});
                        });
                    }
                    else {
                        _docObj.tmpCert = 'N';
                        _dfd.resolve(signRslt);
                    }
                }
                else {
                    _dfd.resolve({success:true, 'serverSigned':serverSigned});
                }
                return _dfd.promise();
            }
            
            // {success:true, docNo:signDocNo, msgId:signMsgId, signCert:_signCert, signValue:_signValue}
            if (signRslt.docNo!==_docObj.docNo || signRslt.msgId!=_docObj.msgId) {
                _dfd.reject({success:false, _errMsg:'簽章App回傳的docNo/msgId與目前開啟公文不符!'});
                return _dfd.promise();
            }
            
            if (!signRslt.signCert || (signRslt.signCert.length===0) ||
                !signRslt.signValue || (signRslt.signValue.length===0)) {
                _dfd.reject({success:false, _errMsg:'簽章App回傳的signCert/signValue不可為空白!'});
                return _dfd.promise();
            }
            
            /* 2016.9.7 - Eric, 改在此處驗證憑證有效性 */
            let _prm = null; // 2019.7 - Eric Peng, 將_verifyCert2改為非同步叫用WebService函式!
            let _dfdVerifyCert = $.Deferred();
			//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
            // if (clientSignMode=='SCard' && updateEnve)  {
			if ((clientSignMode=='SCard' || clientSignMode=='mobileMoica') && updateEnve)  {
                _verifyCert2(_docObj.sourceOrgNo, signRslt.signCert, '', '', true)
                .done(function(rslt) {
                    // _rslt = {valid:true, 'tmpCert':tmpCert};
                    if (rslt.valid!==true) {
                        _dfdVerifyCert.reject({success:false, _errMsg:'憑證有效性驗證未通過! 原因:' + rslt.errMsg});
                    }
                    else {
                        // 有效性檢核通過, 記錄PinCode
                        if ((typeof theSSO.User.igotu !== 'string' || theSSO.User.igotu.length===0) && pincode.length) {
                            var keepPin = true;
                            var rememberPincode = theSSO.User.EnvSettings.get('MP_REMEMBER_AOL_PINCODE');
                            if (typeof rememberPincode=='string' && rememberPincode.length) {
                                rememberPincode = rememberPincode.toLowerCase();
                                if (rememberPincode=='false' || rememberPincode=='0') {
                                    keepPin = false;
                                }
                            }
                            if (keepPin) {
                                theSSO.User.igotu = pincode;
                            }
                        }
                        let rtnObj = $.extend({success:true}, rslt);
                        _dfdVerifyCert.resolve(rtnObj);
                    }
                })
                .fail(function(errRslt){
                    let rtnObj = $.extend({success:false}, errRslt);
                    _dfdVerifyCert.reject(rtnObj); // 2020.11.20 - N/A Eric, bug-fix, resolve(rtnObj);
                });
                _prm = _dfdVerifyCert.promise();
            }
            else { // 2016.11.15 - 以iOS DocSign App簽章, 前面已檢核過了, 此處不用再執行!
                _dfdVerifyCert.resolve({
                    valid: true,
                    tmpCert: false
                });
                _prm = _dfdVerifyCert.promise();
            }

            _prm.done(function(rslt) {
                // 使用正式/臨時憑證智慧卡.
                if (typeof rslt!=='undefined' && typeof rslt.tmpCert=='boolean' && rslt.tmpCert===true) {
                    _docObj.tmpCert = 'Y';
                }
                else {
                    _docObj.tmpCert = 'N';
                }
                    
                // 2017.2.22 - 若使用臨時憑證,須更新ODWMSG.TMP_CER並重新上傳ODWMSG.XML
                if (_docObj.tmpCert=='Y') {
                    _docObj.set2('aol', 'ODWMSG', {'TMP_CER':'Y'});
                    serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
                    _uploadDocInfo(_docObj, serverPath)
                    .done(function() {
                        _dfd.resolve(signRslt);
                    })
                    .fail(function() {
                        sErrMsg = '更新ODWMSG.TMP_CER欄位, 叫用_uploadDocInfo()時發生錯誤!';
                        theLogger.error('Error! ' + sErrMsg);
                        _dfd.reject({success:false, errMsg:sErrMsg});
                    });
                }
                else {
                    _dfd.resolve(signRslt);
                }
            })
            .fail(function(errRslt) {
                _dfd.reject(errRslt);
            });
            return _dfd.promise();
        })
        .then(function(signRslt) {
            /* 2016.9.17 - 不異動封裝檔或不加簽則跳過 */
            var serverSigned = (typeof signRslt=='object' && typeof signRslt.serverSigned=='boolean' && signRslt.serverSigned) ? true : false;
            if (!updateEnve || !fSubmitSign || serverSigned) {
                var _dfd = $.Deferred();
                _dfd.resolve({success:true, 'serverSigned':serverSigned});
                return _dfd.promise();
            }
            
            theLogger.log('-I- gonna signEnvelope()...');
            /* 2015.3.17 - Eric Peng, 新增 fileIOUrl 參數 */
            var fileIOUrl = _docObj.fileIOWS;
            var ICUserId = '';
            if (_docObj.isDraft) {
                ICUserId = _docObj.ICUserId;
            }
            
            if (updateEnve) {
                return theSSO.MP.envelopeUtil.signEnvelope(SAMLart, _docObj.docNo, ICUserId, _docObj.msgId, signRslt.signValue,
                        signRslt.signCert, _docObj.sourceOrgNo, fileIOUrl);
            }
            else {
                theLogger.log('-I- 不異動封裝檔, 不加簽!');
            }
        })
        .then(function(rslt){
            theLogger.log('-I- signEnvelope() finished, success:' + (rslt.success ? 'Y':'N'));

            // 2019.7- 1080654 Eric, 傳送效能測試
            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                if ('tmBeginSignDocWithSCard' in window && window.tmBeginSignDocWithSCard) {
                    let _log = SSOUtil.dev_getTimeElapseStr('使用智慧卡憑證加簽', window.tmBeginSignDocWithSCard);
                    theLogger.time(_log);
                }
                window.tmBeginSignDocWithSCard = 0;
            }
             
            var _dfd = $.Deferred();
            
            var _go = true;
            if (_go===false) {
                theLogger.warn('SubmitMsg-Debug: signEnvelope完成, 中止後續作業!');
                _dfd.reject($.extend({_showError: false}, {_errMsg:'Debug Cancel!'}, ture));
                return _dfd.promise();
            }
            
            var draftFilePath='', destServerWSUrl='', destRootPath='', destFilePath='', subDirDate='';
            var newMsgInfo = null;
            // 若為草稿, 須搬移電子檔至公文正式儲存區
            if (_docObj.isDraft) {
                if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- processDraftDoc BEGIN...');
                    tmBeginDraftProc = Date.now();
                }

                _docObj._draftSubmitRestore = null;
                
                // 1. 取得公文正式儲存區資訊
                theWebServices.odmssp.newMsg(SAMLart, _docObj.sourceOrgNo)
                .then(function(rslt){
                    // 2. 搬移檔案到正式儲存區
                    // draftFilePath, destServerWSUrl, destFilePath
                    draftFilePath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                    destServerWSUrl= rslt.newMsgInfo.wsUrl;
                    destRootPath = rslt.newMsgInfo.storagePath;
                    
                    var now = new Date();
                    var dirYYYMM = (now.getFullYear()-1911).toString() + SSOUtil.padLeft((now.getMonth()+1).toString(), 2);
                    var dirDate = SSOUtil.padLeft(now.getDate().toString(), 2);
                    subDirDate = SSOUtil.combineLocalPath(dirYYYMM, dirDate);
                    
                    destFilePath = SSOUtil.combineLocalPath(destRootPath, _docObj.sourceOrgNo);
                    destFilePath = SSOUtil.combineLocalPath(destFilePath, subDirDate);
                    destFilePath = SSOUtil.combineLocalPath(destFilePath, _docObj.docNo);
                    
                    newMsgInfo = rslt.newMsgInfo;
                    
                    var hasRefAttFile = false;
                    if ($.isFunction(_aol.getCurrFolio().getRefAttachsFileCnt)) {
                        hasRefAttFile = (_aol.getCurrFolio().getRefAttachsFileCnt()>0);
                    }

					//1111011	Leslie[1110865]	配合新增的簽閱附件，新增配套邏輯
					var hasTmpAttFile = false;
					if ( SSO_CONFIG.OrgNickName == "MOCS" && $.isFunction(_aol.getCurrFolio().getTmpAttachsFileCnt)){
						hasTmpAttFile = (_aol.getCurrFolio().getTmpAttachsFileCnt() > 0);
					}

                    // 2020.9.15 - 1090564 Eric, 草稿電子檔搬移時須調整檔案/子目錄清單!
                    let _option = {
                        async: true, 
                        url: _docObj.fileIOWS,
                        fSMEGWebDoc: false
                    };
                    if (SSO_CONFIG.OrgNickName=='SMEG' && _docObj.get('ODWDCM', 'DRAFT_SOURCE_TYPE')=='2') {
                        _option.fSMEGWebDoc = true;
                    }
					//1111011	Leslie[1110865]	配合新增的簽閱附件，新增配套邏輯
                    // return theWebServices.webFileIO.copyDraftFilesToStoragePath(SAMLart, _docObj.docNo, _docObj.signType, hasRefAttFile, draftFilePath, destServerWSUrl, destFilePath, _option);
                    return theWebServices.webFileIO.copyDraftFilesToStoragePath(SAMLart, _docObj.docNo, _docObj.signType, hasRefAttFile, draftFilePath, destServerWSUrl, destFilePath, _option, hasTmpAttFile);
                })
                .then(function(){
                    // 3. 異動公文基資的電子檔儲存位置相關欄位
                    var _subDir = SSOUtil.combineLocalPath(_docObj.sourceOrgNo, subDirDate); // $OrgNo$/YYYMM/DD/$DocNo$
                    _subDir = SSOUtil.combineLocalPath(_subDir, _docObj.docNo);
                    
                    var _dfd_in = $.Deferred();
                    
                    if (_docObj.isDraft) {
                        _docObj._draftSubmitRestore = {
                            MSG_ID: _docObj.get('ODWMSG', 'MSG_ID'),
                            DRAFT_MSG_ID: _docObj.get('ODWMSG', 'DRAFT_MSG_ID'),
                            WEB_SERVICE: _docObj.get('ODWMSG', 'WEB_SERVICE'),
                            STORAGE_PATH: _docObj.get('ODWMSG', 'STORAGE_PATH'),
                            SRV_NO: _docObj.get('ODWSMG', 'SRV_NO'),
                            SUB_DIR: _docObj.get('ODWSMG', 'SUB_DIR')
                        };
                    }
                    
                    var msgIdTrue = _docObj.msgId;
                    _docObj.set2('', 'ODWMSG', { MSG_ID: '0', SRV_NO: newMsgInfo.srvNo,
                                           DRAFT_MSG_ID: msgIdTrue, WEB_SERVICE: newMsgInfo.wsUrl,
                                           STORAGE_PATH: newMsgInfo.storagePath, SUB_DIR: _subDir});
                    
                    // 4. 上傳公文基資檔到正式儲存區
                    var _newServerPath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                    _uploadDocInfo(_docObj, _newServerPath, true)
                    .done(function() {
                        _dfd_in.resolve({success:true});
                    })
                    .fail(function(errRslt) {
                        if (!!_docObj._draftSubmitRestore) {
                            _resoterDraftDocInfo(_docObj);
                        }
                        _dfd_in.reject({success:false, _errMsg:'重設正式公文基資後上傳基資檔作業失敗!'});
                    });
                    return _dfd_in.promise();
                })
                .then(function(){
                    _dfd.resolve({success:true});
                })
                .fail(function(rslt){
                    if (!!_docObj._draftSubmitRestore) {
                        _resoterDraftDocInfo(_docObj);
                    }
                    theLogger.error(rslt._errMsg);
                    _dfd.reject($.extend({_showError: true}, rslt, true));
                    return _dfd.promise();
                });
                return _dfd.promise();
            }
            else {
                // 2021.5 - 1100093 - merge: 2021.1.14 - 1090821 Eric, 支援送外機關陳核會稿公文 [送會簽/回退文前應輸出呈現檔!]
                if (fGenCoPDF) {
                    // 叫用ODMSSP產出呈現檔函式!
                    let draftFilename = theAOL.getCurrFolio().getDraftFileName(0);
                    if (typeof draftFilename=='string' && draftFilename.length) {
                        let idxExtension = draftFilename.lastIndexOf('.');
                        if (idxExtension!=-1) {
                            draftFilename = draftFilename.substr(0, idxExtension);
                            // 2021.5.26 - 1100093 Eric merge: 2021.3.16 - 1090821 Eric, bug-fix. (回傳之文槁檔名可能為 XXX-tc.xml, 去除'-tc')
                            draftFilename = draftFilename.replace('-tc', '');
                        }
                        return theWebServices.odmssp.genCoPDF(SAMLart, _docObj.sourceOrgNo, _docObj.docNo, draftFilename,  {async:true});
                    }
                    else {
                        _dfd.reject({success:false, errMsg:'產出呈現檔作業, 無法取得文稿原始檔名稱.'});
                        return _dfd.promise();    
                    }
                }
                else {
                    _dfd.resolve({success:true});
                    return _dfd.promise();
                }
            }
        })
        .then(function() {
            if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true && _docObj._draftSubmitRestore!==null) {
                let _log = SSOUtil.dev_getTimeElapseStr('processDraftDoc', tmBeginDraftProc);
                theLogger.time(_log);
            }
            
            var _dfd = $.Deferred();
            var _go = true;
            if (typeof SSO_CONFIG.debugSubmit=='boolean' && SSO_CONFIG.debugSubmit===true) {
                _go = confirm('SubmitMsg-Debug: 叫用ODMSSP.SubmitMsg執行傳送作業?');
            }
            
            if (_go===false) {
                _dfd = $.Deferred();
                _dfd.reject({success:false, errMsg:'測試傳送功能, 強制取消作業!'});
                return _dfd.promise();
            }
            else {
                return _submitMsg(SAMLart, _docObj, _aol, {Stage2Submit:false, AOLEDocSubmit:true});
            }
        })
        .then(function(rsltSubmit) {
            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                let _log = SSOUtil.dev_getTimeElapseStr('取Pincode後作業', window.tmAfterGetPIN);
                theLogger.time(_log);
                _log = SSOUtil.dev_getTimeElapseStr('公文傳送作業', window.tmBeginSubmit, window.tmGetPIN);
                theLogger.time(_log);
                window.tmBeginSubmit = 0; window.tmAfterGetPIN = 0; window.tmGetPIN = 0;
            }

            // 2019.8.14 - 1080654 Eric, 傳送後自動開次筆功能
            let _dfd = $.Deferred();
            if ('nextDocObj' in rsltSubmit && rsltSubmit.nextDocObj!=null) {
                window.tmBeginOpenDoc = Date.now();
                window.tmBeginOpenDoc2 = window.tmBeginOpenDoc;
                if (window.iOS_device) {
                    window.tmBeginOpenDoc3 = window.tmBeginOpenDoc;
                }
                else {
                    window.tmBeginOpenDoc3 = 0;
                }
                        
                let _nextDocObj = rsltSubmit.nextDocObj;
                let SAMLart = localStorage.Artifact;
                theSSO.MP.todolist.builder.checkMsgValidity(SAMLart, _nextDocObj)
                .then(function(rslt) {
                    var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, _nextDocObj.sourceOrgNo, _nextDocObj.signType);
                    if (menuRule) {
                        if (_nextDocObj.signType=='E' || _nextDocObj.signType=='P') {
                            var rule = menuRule.getRule(_nextDocObj.folder, _nextDocObj.subfolder);
                            if (typeof rule=='undefined' || rule===null) {
                                alert('無法取得公文夾[' + _nextDocObj.folder + '-' + _nextDocObj.subfolder +']MenuRule設定');
                                _dfd.reject({success:false, errMsg:'無法取得公文夾[' + _nextDocObj.folder + '-' + _nextDocObj.subfolder +']MenuRule設定!'});
                            }
                        }
                        
                        SSOUtil.toggleFuncButton(0x3, true);

                        // 開啟次筆待辦公文
                        theSSO.MP.openDocWithAOL(SAMLart, _nextDocObj, 'todolist', true); // list item touch
                        _dfd.resolve({success:true});
                    }
                    else {
                        alert('無法取得MenuRule設定');
                        _dfd.reject({success:false, errMsg:'無法取得MenuRule!'});
                    }
                })
                .fail(function(rslt){
                    if(!!rslt && !!rslt.msg) {
                        theLogger.error(rslt.msg);
                    }
                    else {
                        theLogger.error('檢核MsgId有效性或loadDocPreview failed.');
                    }
                    _dfd.reject(rslt);
                });
            }
            else {
                _dfd.resolve({success:true});
            }
            return _dfd.promise();
        })
        .then(function() {
			// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
			if(!!_saveEndCallback && $.isFunction(_saveEndCallback)) {
				theLogger.log("傳送成功, 呼叫theAOL.getCurrFolio().save()時傳入的callback function...");
				_saveEndCallback();
			}
            _dfdClientSignSubmit.resolve({success:true});
        })
        .fail(function(rslt) {
            if (!!_docObj._draftSubmitRestore) {
                _resoterDraftDocInfo(_docObj);
            }
             
            // 2017.10.12 - 1060819, 調整錯誤提示!
            var errObj = rslt;
            var errMsg = '', showErr=true;
            if (errObj) {
                if (typeof errObj.errMsg=='string' && errObj.errMsg.length) {
                    errMsg = errObj.errMsg;
                }
                else if (typeof errObj._errMsg=='string' && errObj._errMsg.length) {
                    errMsg = errObj._errMsg;
                }
                if (typeof errObj._showError=='boolean' && errObj._showError===false) {
                    showErr = false;
                }
                if (errMsg.length && showErr) {
                    // 2018.1.15 - 1061276
                    if (typeof errObj.checkDataErr=='boolean' && errObj.checkDataErr===true) {
                        alert(errMsg);
                    }
                    else {
                        alert('公文傳送作業失敗[Client加簽模式], 錯誤說明:' + errMsg);
                    }
                    showErr = false;
                }
            }
            
            theLogger.log('-ERR- _doClientSignSubmit() failed.');
            _dfdClientSignSubmit.reject($.extend({_showError:showErr}, rslt));
        });
        return _dfdClientSignSubmit.promise();
    } // EOF _doClientSignSubmit

    /* 2015.2 - client加簽模式 */
    function _clientSignSubmit_withSignPage(_aol, SAMLart, _docObj, clientSignMode, pincode, updateEnve, fSubmitSign, aolSubmitStatus) {
        theLogger.log('Begin of _clientSignSubmit_withSignPage()...\r\nupdateEnve=' + updateEnve?'true':'false' + ', fSubmitSign=' + fSubmitSign?'true':'false');
        
        /* inner functions */
        function _resoterDraftDocInfo(theDocObj) {
            if (!!theDocObj._draftSubmitRestore) {
                theDocObj.set2('aol', 'ODWMSG', theDocObj._draftSubmitRestore);
                theDocObj._draftSubmitRestore = null;
            }
        }
        
        if (typeof pincode=='undefined') {
            pincode = '';
        }
        if (typeof updateEnve=='undefined') {
            updateEnve = true;
        }
        if (typeof fSubmitSign=='undefined') {
            fSubmitSign = true;
        }
        
        var tobeSign = '';
        var useTmpSoftCert = false;
        let _ruleOption = _aol.nextTarget.ruleOption;
		// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
		var useFormalSoftCert = false;
        
        var _dfdClientSignSubmit = $.Deferred();
        var tmBeginGetPIN, tmBeginUpdateEnve, tmBeginDraftProc; // time tracking...
        
        /* 儲存公文內容 */
		// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
		var _saveEndCallback = null;
		//1140610	Leslie[1131183]	[Merge-1111006]新增傳送成功後應刪除檔案清單
		var _mustDelFiles = null;
		var _submitMsgInvoked = false;
		
		//1130130	Leslie[1120330]	修正當要傳送至一層決行，而預排流程中仍有未完成的會辦流程時則強制送會辦，調整傳送流程(先檢核再儲存)
		_checkUnfinishedCoworkFlow(_docObj, _aol.nextTarget)	//因為Deferred流程，改到裡面才判斷
		.then(function(){
			return _saveMsg(SAMLart, _aol, _docObj, aolSubmitStatus);
		})	
		
        //_saveMsg(SAMLart, _aol, _docObj, aolSubmitStatus)		//1130130	Leslie[1120330]	配合調整流程，移到上面叫用
		// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
        //.then(function() { // 2021.4.20 - 1080768, merge MOI-1070655 傳送一層決行單位前檢核是否有未完成的會辦流程.
		//1140610	Leslie[1131183]	[Merge-1111006]新增傳送成功後應刪除檔案清單回傳值
		// .then(function(rslt, saveEndCallback) {
		.then(function(rslt, saveEndCallback, mustDelFiles) {
			if(!!saveEndCallback){
				_saveEndCallback = saveEndCallback;
				//1140610	Leslie[1131183]	[Merge-1111006]新增傳送成功後應刪除檔案清單
				_mustDelFiles = mustDelFiles;
			}
			//1130130	Leslie[1120330]	配合調整流程，儲存後直接接後續檢核
            // let sVal = theSSO.User.EnvSettings.get('CHECK_UNFINISHED_COWORK_FLOW');
            // if (SSOUtil.isValueTrue(sVal)) {
                // return _checkUnfinishedCoworkFlow(_docObj, _aol.nextTarget)
            // }
            // else {
                let _dfdInner = $.Deferred();
                _dfdInner.resolve({success:true})
                return _dfdInner.promise();
            // }
        })
        .then(function() {
            // 2021.9.15 - 1090862 Eric, 歸檔傳送前檢核若公文有可發文文稿且未發文, 須提示使用者決定是否傳送
            return _checkDocIssueStatus_PreSubmit(_aol, true);
        })
        .then(function() {
            var _dfdIn = $.Deferred();
            let _ruleErrItem = [];
            if (!_checkSuitable_PreSubmit(_docObj, _ruleOption, _ruleErrItem, _aol)) {
                var _ruleErrStr = '無法傳送公文文號[' + _docObj.docNo + ']:' + _ruleErrItem.toString();
                _dfdIn.reject({success:false, _showError:true, _errMsg: _ruleErrStr, checkDataError: true}); // 2018.1.5 - 1061276
                return _dfdIn.promise();
            }

            // 2017.8.25 - 1060728, 傳送前檢核補齊
            var _prm = _checkEDocContent_PreSubmit(_aol);
            _prm.done(function(rsltContentCheck) {
                if (!rsltContentCheck.success || !rsltContentCheck._continue) {
                    var _errMsgIn = '';
                    if (!rsltContentCheck.success) {
                        _errMsgIn = '檢核最後預排流程點作業時發生錯誤!';
                        _dfdIn.reject({success:false, _errMsg: _errMsgIn});
                    }
                    else {
                        _dfdIn.reject({success:false, _showError:false, _errMsg: '使用者取消傳送作業! [最後流程傳送確認]'});
                    }
                }
                else {
                    _dfdIn.resolve({success:true});
                }
            })
            .fail(function(rsltContentCheck) {
                if (!rsltContentCheck.success || !rsltContentCheck._continue) {
                    var _errMsgIn = '';
                    if (!rsltContentCheck.success) {
                        _errMsgIn = '檢核最後預排流程點作業時發生錯誤!';
                        _dfdIn.reject({success:false, _errMsg: _errMsgIn});
                    }
                    else {
                        _dfdIn.reject({success:false, _showError:false, _errMsg: _errMsgIn, _checkDataError: true}); // 2018.1.5 - 1061276
                    }
                }
            });
            return _dfdIn.promise();
        })
        .then(function(rslt) {
            if (clientSignMode=='SCard' && updateEnve)  {
                if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    let _log = SSOUtil.dev_getTimeElapseStr('取Pincode前作業', window.tmBeginSubmit);
                    theLogger.time(_log);
                    theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- _getPincode() BEGIN...');
                    tmBeginGetPIN = Date.now();
                    window.tmGetPIN = 0;
                }
                return _getPincode(theAOL, 'SCardCert', fSubmitSign);    
            }
            else {
                //1080118 Kevin 1080049 修正Use Of Hardcoded Password
                return {rslt:'skip', password:theSSO.Artifact};
            }
        })
		//1130905	Leslie[序215]	調整依客製化設定決定在PinCode前或後，再檢核 SCardModuleInfo 是否合法
		.then(function(obj){
			//1140627	Leslie[退輔會序46]	追加背景傳送使用行動自然人憑證時，無需檢核SCardModuleInfo
			// if (obj.useTmpCert || obj.useFormalSoftCert){
			if (obj.useTmpCert || obj.useFormalSoftCert || obj.rslt === 'useMoibleMoica'){
				//1131021	Leslie[序269]	應宣告為區域變數，避免Deferred()物件錯亂
				// _dfd = $.Deferred();
				let _dfd = $.Deferred();
				_dfd.resolve({success:true, passPingObj: obj});
				return _dfd.promise();
			}
			//1131115	Leslie[序369]	修改為一律套用取得PinCode後，再檢核SCardModuleInfo，以避免未預期的異常
			//else if (theCustom.getCustomSet('CheckSCardModuleInfoAfterPinCode') === true){
			if (true){
				var sc = new SmartCard();
				if (typeof theSSO.MP.SCardModuleInfo=='undefined' || theSSO.MP.SCardModuleInfo===null) {
					let _dfdGetSC = $.Deferred();
					sc.getSCardModuleInfo()
					.done(function(rslt) {
						_dfdGetSC.resolve({success:true, SCModuleInfo: rslt.SCModuleInfo, passPingObj: obj});
					})
					.fail(function(errRslt){
						_dfdGetSC.reject($.extend({_showError: true}, errRslt, true));
					});
					return _dfdGetSC.promise();
				}
				else {
					//1131021	Leslie[序269]	應宣告為區域變數，避免Deferred()物件錯亂
					// _dfd = $.Deferred();
					let _dfd = $.Deferred();
					_dfd.resolve({success:true, SCModuleInfo: theSSO.MP.SCardModuleInfo, passPingObj: obj});
					return _dfd.promise();
				}
			}
			//1130923	Leslie[北榮序3]	修正設定不為true時的處理
			else{
				//1131021	Leslie[序269]	應宣告為區域變數，避免Deferred()物件錯亂
				// _dfd = $.Deferred();
				let _dfd = $.Deferred();
				_dfd.resolve({success:true, passPingObj: obj});
				return _dfd.promise();
			}
		})
		.then(function(rslt){
			var supportHashSign = false;
			if (typeof rslt.SCModuleInfo=='object' && typeof rslt.SCModuleInfo.serverVersion=='string' && rslt.SCModuleInfo.serverVersion.length) {
					supportHashSign = true;

				// 2019.7 - 1080654 Eric, cache SCardModuleInfo
				if ('submitOptions' in theSSO.MP && 'cacheSCardInfo' in theSSO.MP.submitOptions && theSSO.MP.submitOptions.cacheSCardInfo===true &&
					(typeof theSSO.MP.SCardModuleInfo=='undefined' || theSSO.MP.SCardModuleInfo===null)) {
					theSSO.MP.SCardModuleInfo = rslt.SCModuleInfo;
				}
			}
			
			if (typeof aolSubmitStatus=='object' && aolSubmitStatus!==null) {
				aolSubmitStatus.supportHashSign = false;
				if (supportHashSign) {
				   aolSubmitStatus.supportHashSign = true;
				}
			}
			
			//1131021	Leslie[序269]	應宣告為區域變數，避免Deferred()物件錯亂
			let _dfd = $.Deferred();
			
			//已輸入過PinCode，但又出現"未插入IC卡"(可能是換卡或HCA模組單獨停擺)
			if(rslt.SCModuleInfo == '未插入IC卡' && rslt.passPingObj.rslt === 'ok' && rslt.passPingObj.password.length > 0){
				theSSO.User.igotu_uncheck = '';	
				theSSO.User.igotu = '';
				//1131021	Leslie[序269]	應宣告為區域變數，避免Deferred()物件錯亂
				// _dfd = $.Deferred();
				let customErrMsg = '';
				if ('certModuleErrMsg' in SSO_CONFIG && SSO_CONFIG.certModuleErrMsg.length)
					customErrMsg = `\n\n${SSO_CONFIG.certModuleErrMsg}\n\n`
				_dfd.reject({success:false, _showError: true, _errMsg:`簽章作業異常：${customErrMsg}請檢查IC卡是否正確插好。`});
			}
			else{
				//1131021	Leslie[序269]	應宣告為區域變數，避免Deferred()物件錯亂
				// _dfd = $.Deferred();
				_dfd.resolve(rslt.passPingObj);
			}
			return _dfd.promise();
		})	//1130905	Leslie[序215]	調整依客製化設定決定在PinCode前或後，再檢核 SCardModuleInfo 是否合法	==END==
        .then(function(obj) {
            var _dfd = $.Deferred();
			//1140627	Leslie[退輔會序46]	追加背景傳送使用行動自然人憑證時，視為通過genPincode()
            // if (obj.rslt==='ok' && (obj.password.length>0) || obj.rslt=='skip') {
            if (obj.rslt==='ok' && (obj.password.length>0) || obj.rslt=='skip' || obj.rslt === 'useMoibleMoica') {
                SSOUtil.loading('show', { text:'公文傳送作業中', textVisible:true });
                
                if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    if (tmBeginGetPIN) {
                        window.tmGetPIN = Date.now() - tmBeginGetPIN;
                    }
                    let _log = SSOUtil.dev_getTimeElapseStr('_getPincode()', tmBeginGetPIN);
                    theLogger.time(_log);
                    window.tmAfterGetPIN = Date.now();
                }
                
                if (obj.rslt=='ok') {
                    pincode = obj.password;
                    theLogger.log("已取得Pincode");
                    useTmpSoftCert = obj.useTmpCert;
					// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
					useFormalSoftCert = obj.useFormalSoftCert;
                }
                else {
                    pincode = '';
                    theLogger.log("不使用Pincode");
                }
                
                // 2020.3.19 - 1090193 Eric, support 臨時憑證!
                if (useTmpSoftCert) {
                    fServerSign = true;
                }
				// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
				else if(useFormalSoftCert){
					//1130923	Leslie[北榮序3]	一併修正軟體正式憑證的錯誤變數
					fServerSign = true;
					console.log('-I- 使用軟體正式憑證加簽(@server)'); 
				}
                else {
                    fServerSign = false;
                }
            }
            else {
                _dfd.reject({success:false, _showError: false, _errMsg:'使用者取消作業(輸入Pincode)'});
                 return _dfd.promise();
            }
            /* END */

            theLogger.log('-I- gonna updateDocEnvelope()...');
            /* 封裝公文並回傳待簽內容 */
            if (updateEnve) {
                // 2019.7 - Eric, 使用傳送公文子視窗.

                // 2020.3.19 - 1090193 Eric, 若使用軟體臨時憑證, 則直接叫用 _doServerSignSubmit
                if (fServerSign) {
                    // [in] _aol, SAMLart, _docObj, clientSignMode, pincode, updateEnve, fSubmitSign, aolSubmitStatus
                    // _doServerSignSubmit(_theAOL, SAMLart, sPincode, _docObj, _ruleOption, updateEnve, fSubmitSign, aolSubmitStatus);
					// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能
					if(useTmpSoftCert){
						_docObj.set2('aol', 'ODWMSG', {'TMP_CER':'Y'});
						_docObj.tmpCert = 'Y';
					}
                
                    var rslt = null;
                    // 叫用 ODMSSP.SetTodoListTmpCerState設定使用臨時憑證!
                    var setTmpDone = false;
                    // 若使用臨時憑證,須更新ODWMSG.TMP_CER並重新上傳ODWMSG.XML
                    var serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
                    _uploadDocInfo(_docObj, serverPath)
                    .done(function(){
                        _doServerSignSubmit(_aol, SAMLart, pincode, _docObj, _aol.nextTarget.ruleOption, updateEnve, fSubmitSign, aolSubmitStatus)
                        .then(function(rslt){
							//1130730	Leslie[彙整表序159]	中榮臨時憑證增加PinCode記憶功能
							//1141204	Leslie[彙整表序422]	北榮臨時憑證增加PinCode記憶功能
							// if(SSO_CONFIG.OrgNickName == "TVGH" && useTmpSoftCert)
							if(["TVGH","TPVGH"].includes(SSO_CONFIG.OrgNickName) && useTmpSoftCert)
								theSSO.User.tigotu = pincode;
							
							//1130815	Leslie[1130466]	新增支援PC端軟體正式憑證功能
							if(useFormalSoftCert)
								theSSO.User.figotu = pincode;
							//1130808	Leslie[序180]	[中榮]啟用背景傳送+自動開啟下一筆公文時，於臨時憑證加簽時，應略過_endMainPageSubmit()以避免找不到公文(實際上為前景傳送)
                            // _dfd.resolve({success:true});
                            _dfd.resolve({success:true, byPassEndMain:true});
                        })
                        .fail(function(errRslt){
                            _dfd.reject(errRslt);
                        })
                    })
                    .fail(function(errRslt){
                        _dfd.reject(errRslt);
                    });
                }
				else if (obj.rslt === 'useMoibleMoica') { // 2023.5.17 - 1111006 Eric merge: 2022.6.3 1101623 Eric, ToDo: 支援行動自動然化憑證簽核!
                    // call _doClientSignSubmit or clientSignSubmit_withSignPageP2
                    aolSubmitStatus.signPageP2 = true;
                    aolSubmitStatus.verifyPinRslt = obj;

                    _doClientSignSubmit(_aol, SAMLart, _docObj, 'mobileMoica', '', true, true, aolSubmitStatus)
                    .then(function(rslt) {
                        _submitMsgInvoked = true; // 2023.5.17 - 1111006 Eric, 有實際叫用_submitMsg
                        _dfd.resolve({success:true, useSignPage: false}); // 2022.6.5 - 1101623 Eric, add useSignPage flag
                    })
                    .fail(function(errRslt){
                        _dfd.reject(errRslt);
                    })
                }
                else if ('submitDocProcWnd' in theSSO.MP && theSSO.MP.submitDocProcWnd!==null && 
                    theSSO.MP.submitDocProcWnd.closed!==true && clientSignMode=='SCard') {

                    //1141218   Leslie[1141658] 新增背景傳送時，畫面中顯示提示訊息以避免使用者直接關閉視窗
                    SSOUtil.loading("show", {text: "公文傳送中，請勿關閉。", textVisible: true});

                    // 2020.7.30 - 1090409 Eric, 支援公文傳送時匯出抄本頁面功能 (新增aolSubmitStatus.genFormalPage)
                    // 叫用子視窗傳送公文
                    // window.submitDoc = function(SAMLart, sDocObj, pincode, fSubmitSign, fSupportHashSign, clientSignMode) {
                    theSSO.MP.submitDocProcWnd.submitDoc(SAMLart, JSON.stringify(_docObj), pincode, fSubmitSign, (fServerSign ? false : aolSubmitStatus.supportHashSign), (fServerSign ? 'NONE' : clientSignMode), aolSubmitStatus.genFormalPage)
                    .then(function(rslt) {
                        theLogger.time('公文傳送作業完成! [DocNo=' + _docObj.docNo + ', MsgId=' + _docObj.msgId + ']');
						_submitMsgInvoked = true; // 2023.5.17 - 1111006 Eric, 有實際叫用_submitMsg
                        _dfd.resolve({success:true});

                        // 2019.7 - Keep unverified data
                        theSSO.User.igotu_uncheck = pincode;
                    })
                    .fail(function(rslt) {
                        theLogger.time('公文傳送作業失敗! 原因:' + rslt.errMsg + '. [DocNo=' + _docObj.docNo + ', MsgId=' + _docObj.msgId + ']');
                        _dfd.reject({success:true, useSubmitProcWnd:true, _showError:false, 
                                     errMsg:'使用傳送子視窗, 叫用signPage.submitDoc發生錯誤!'});
                    });
                }
                else if ('submitDocProcFrameWnd' in theSSO.MP && theSSO.MP.submitDocProcFrameWnd!==null && 
                    theSSO.MP.submitDocProcFrameWnd.closed!==true && clientSignMode=='SCard') { // 2020.7.8 - 1090390 Eric, iFrame mode.
                    /*theSSO.MP.submitDocProcFrameWnd.postMessage({type:'requestSubmitDoc', data:{
                        SAMLart: SAMLart, 
                        sDocObj: JSON.stringify(_docObj), 
                        sPincode: pincode, 
                        fSubmitSign: fSubmitSign, 
                        fServerSign: fServerSign?false:aolSubmitStatus.supportHashSign,
                        signMode: fServerSign?'NONE':clientSignMode
                    }});
                    _dfd.resolve({success:true});*/
					
					// 2023.5.17 - 1111006 Eric, ToDo: 完整實作若_saveEndCallback不為null時, 也會有待刪除公文文稿檔案清單(主辦退分辦作業)
                    //   應將檔案清單傳入submit作業後半段作業!
                    if (_mustDelFiles!=null &&_mustDelFiles.length) {
                        // ToDo: 將_mustDelFiles傳入submitDoc, 後加入_submitItem以執行刪檔作業!
                        // _submitItem.mustDelFiles = _mustDelFiles.map((x) => x); // sample code to clone list items
                    }

                    //1141218   Leslie[1141658] 新增背景傳送時，畫面中顯示提示訊息以避免使用者直接關閉視窗
                    SSOUtil.loading("show", {text: "公文傳送中，請勿關閉。", textVisible: true});

                    // 2020.7.30 - 1090409 Eric, 支援公文傳送時匯出抄本頁面功能 (新增aolSubmitStatus.genFormalPage)
                    theSSO.MP.submitDocProcFrameWnd.submitDoc(SAMLart, JSON.stringify(_docObj), pincode, fSubmitSign, (fServerSign ? false : aolSubmitStatus.supportHashSign), (fServerSign ? 'NONE' : clientSignMode), aolSubmitStatus.genFormalPage)
                    .then(function(rslt) {
                        theLogger.time('公文傳送作業完成! [DocNo=' + _docObj.docNo + ', MsgId=' + _docObj.msgId + ']');
						// 2023.5.17 - 1111006 Eric, ToDo: 目前先標記為有實際叫用_submitMsg觸發下面的刪檔作業, 
                        //   後續應修改為真正叫用_submitMsg後再執行刪檔作業!
                        _submitMsgInvoked = true;
						
                        _dfd.resolve({success:true});

                        // 2019.7 - Keep unverified data
                        theSSO.User.igotu_uncheck = pincode;
                    })
                    .fail(function(rslt) {
                        theLogger.time('公文傳送作業失敗! 原因:' + rslt.errMsg + '. [DocNo=' + _docObj.docNo + ', MsgId=' + _docObj.msgId + ']');
                        _dfd.reject({success:true, useSubmitProcWnd:true, _showError:false, 
                                     errMsg:'使用傳送子視窗, 叫用signPage.submitDoc發生錯誤!'});
                    });
                }
                else {
                    theLogger.log('-I- _clientSignSubmit_withSignPage() 傳送子視窗狀態異常!');
                    _dfd.reject({success:false, _errMsg:'公文傳送子視窗狀態異常!'});
                }
            }
            else {
                theLogger.log('-I- 毋須異動封裝檔!');
                // 2020.6.30 - 1090390 Eric, 若毋須異動封裝檔(Ex.分文/分辦/退回分文,分辦!), 則須叫用SubmitMsg!
                _submitMsg(SAMLart, _docObj, _aol, {Stage2Submit:false, AOLEDocSubmit:true})
                .done(function(rslt){
					_submitMsgInvoked = true; // 2023.5.17 - 1111006 Eric, 有實際叫用_submitMsg
                    _dfd.resolve({success:true});
                })
                .fail(function(errRslt){
                    _dfd.reject(errRslt);
                });
            }
            return _dfd.promise();
        })
		//1130808	Leslie[序180]	[中榮]啟用背景傳送+自動開啟下一筆公文時，於臨時憑證加簽時，應略過_endMainPageSubmit()以避免找不到公文(實際上為前景傳送)
        // .then(function() {
        .then(function(rslt) {
            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                let _log = SSOUtil.dev_getTimeElapseStr('DocSubmitUtil.clientSignSubmit_withSignPage()', window.tmBeginSubmit, window.tmGetPIN);
                theLogger.time(_log);
                //window.tmBeginSubmit = 0; window.tmAfterGetPIN = 0;
                //window.tmGetPIN = 0;
            }
			// 1100914 Raymond 1101143 新增當extraOptions.delAllDrafts為true時(收文第一個承辦人流程點退文), 不立即刪除文稿管理檔及暫存工作檔, 而是回傳一個callback function, 等整個傳送成功後, 再呼叫此callback function完成刪除動作
			// 2023.5.17 - 1111006 Eric, 有實際叫用_submitMsg才叫用saveEndCallback函式!
			// if(!!_saveEndCallback && $.isFunction(_saveEndCallback)) {
			if(_submitMsgInvoked && !!_saveEndCallback && $.isFunction(_saveEndCallback)) {	
				theLogger.log("傳送成功, 呼叫theAOL.getCurrFolio().save()時傳入的callback function...");
				_saveEndCallback();
			}
			//1130808	Leslie[序180]	[中榮]啟用背景傳送+自動開啟下一筆公文時，於臨時憑證加簽時，應略過_endMainPageSubmit()以避免找不到公文(實際上為前景傳送)
			if('byPassEndMain' in rslt)
				_dfdClientSignSubmit.resolve({success:true, byPassEndMain:rslt.byPassEndMain});
			else
            _dfdClientSignSubmit.resolve({success:true});
        })
        .fail(function(rslt) {
            if (!!_docObj._draftSubmitRestore) {
                _resoterDraftDocInfo(_docObj);
            }
             
            // 2017.10.12 - 1060819, 調整錯誤提示!
            var errObj = rslt;
            var errMsg = '', showErr=true;
            if (errObj) {
                if (typeof errObj.errMsg=='string' && errObj.errMsg.length) {
                    errMsg = errObj.errMsg;
                }
                else if (typeof errObj._errMsg=='string' && errObj._errMsg.length) {
                    errMsg = errObj._errMsg;
                }
                if (typeof errObj._showError=='boolean' && errObj._showError===false) {
                    showErr = false;
                }
                if (errMsg.length && showErr) {
                    // 2018.1.15 - 1061276
                    if (typeof errObj.checkDataErr=='boolean' && errObj.checkDataErr===true) {
                        alert(errMsg);
                    }
                    else {
                        alert('公文傳送作業失敗[Client加簽模式], 錯誤說明:' + errMsg);
                    }
                    showErr = false;
                }
            }
            theLogger.log('-ERR- _clientSignSubmit_withSignPage() failed.');
            _dfdClientSignSubmit.reject($.extend({_showError:showErr}, rslt));
        });
        return _dfdClientSignSubmit.promise();
    } // EOF _clientSignSubmit_withSignPage

    /* 2019.7 - Eric, client加簽模式, 於傳送子視窗叫用執行 */
    function _clientSignSubmit_withSignPageP2(SAMLart, _sDocObj, pincode, exParaP2) {
        // exParaP2 = submitSign:fSubmitSign, supportHashSign:fSupportHashSign, serverSign:false, "clientSignMode": clientSignMode,
        //            'verifyPinCallback'
		//1140416	Leslie[1140443]	調整Log
        // theLogger.log('Begin of _clientSignSubmit_withSignPageP2()...\r\n, fSubmitSign=' + exParaP2.fSubmitSign?'Y':'N');
        theLogger.log(`Begin of _clientSignSubmit_withSignPageP2()..., fSubmitSign=${(exParaP2.fSubmitSign?'Y':'N')}`);

        if ('dispLog' in window) {
            dispLog('開始公文傳送作業...');
        }

        /* inner functions */
        /* 由 待簽資訊判定hash algorithm: 'SHA1' / 'SHA256' */
        function _getHashAlgorithm(sTobeSignXML) {
            var _hashAlg = 'SHA1';
            if (!!sTobeSignXML && sTobeSignXML.length && sTobeSignXML.indexOf('http://www.w3.org/2001/04/xmlenc#sha256')!==-1) {
                _hashAlg = 'SHA256';
            }
            return _hashAlg;
        }
        
        function _resoterDraftDocInfo(theDocObj) {
            if (!!theDocObj._draftSubmitRestore) {
                theDocObj.set2('aol', 'ODWMSG', theDocObj._draftSubmitRestore);
                theDocObj._draftSubmitRestore = null;
            }
        }

        let _dfdCSSP2 = $.Deferred();
        var _docObj = null;
        if (typeof _sDocObj=='string' && _sDocObj.length) {
            _docObj = new MPDocObj(_sDocObj);
            if (typeof _docObj=='undefined' || _docObj==null) {
                _dfdCSSP2.reject({success:false, errMsg:'invalid docObj.'});
                return _dfdClientSignSubmit.promise();
            }
        }

        let _docNo = _docObj.docNo;
        let _msgId = _docObj.msgId;

        if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
            var sDocInfo = '[DocNo=' + _docObj.docNo + ', MsgId=' + _docObj.msgId + ']';
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 取Pincode後作業 BEGIN...' + sDocInfo);
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- DocSubmitUtil.clientSignSubmit_withSignPageP2() BEGIN...');
            window.tmAfterGetPIN = Date.now();
            window.tmBeginSubmitStage2 =  Date.now();
        }
        
        if (typeof pincode=='undefined') {
            pincode = '';
        }

        //exParaP2 = {submitSign=true, supportHashSign=true, serverSing=false, clientSignMode=''}
        let fSubmitSign = exParaP2.submitSign;
        if (typeof fSubmitSign=='undefined') {
            fSubmitSign = true;
        }

        let clientSignMode = exParaP2.clientSignMode; 
        let fServerSign = exParaP2.serverSign;
        let updateEnve = true; // 2019.7 - Eric, 叫用此函式一定是要封裝加簽!
        //let fUseTmpSoftCert = false; // 2019.7 - Eric, 目前一定是用Smartcard加簽!
        let fSupportHashSign = exParaP2.supportHashSign;

        var tmBeginUpdateEnve, tmBeginDraftProc; // time tracking...
        if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 更新公文封裝檔(updateDocEnvelope) BEGIN...');
            tmBeginUpdateEnve = Date.now();
        }

        theLogger.log('-I- gonna updateDocEnvelope()...');

        // 2021.5 - 1100093 - merge: 2021.1.4 - 1090821 Eric, 支援送外機關陳核會稿公文
        let fGenCoPDF = _shouldGenCoPDF(_docObj);
        if (!fGenCoPDF && (_docObj.docNo===localStorage.dev_CreatePresentPDF_DocNo)) {
            fGenCoPDF = true;
        }

        // 2020.7.30 - 1090409 Eric, 新增genFormalPage:是否匯出抄本頁面
        _updateDocEnvelope(SAMLart, '', _docObj, fSubmitSign, fServerSign, fSupportHashSign, false, exParaP2.genFormalPage)
        .then(function(updateRslt) {
            var sHashHeaderb64_SHA1 = 'MCEwCQYFKw4DAhoFAAQU'; // 2017.1.18 - 若回傳待簽資料hash, 則header為此值!
            var sHashHeaderb64_SHA256 = 'MDEwDQYJYIZIAWUDBAIBBQAEI'; // 2017.3.16 - 若回傳待簽資料hash, 則header為此值!
            
            theLogger.log('-I- updateEnvelope() finished.');

            if ('dispLog' in window)
                dispLog('公文文號:[' + _docObj.docNo +'] 更新封裝檔作業完成...');
            
            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                let _log = SSOUtil.dev_getTimeElapseStr('更新公文封裝檔 (updateDocEnvelope)', tmBeginUpdateEnve);
                theLogger.time(_log);
            }
                
            // 2020.7.9 - 1090390 Eric, dev test
            if (SSOUtil.isValueTrue(localStorage['dev_ForceSignpageFail'])) {
                let _dfd = $.Deferred(); _dfd.reject({success:true, errMsg:'DEV. ForceSignPageFail=true 中止後續傳送作業!'}); 
                return _dfd.promise();
            }

            var fHashSign = false;
            //1141218   Leslie[1141658] [北榮]修正背景傳送的signDataDeferred全域物件宣告
            //theSSO.MP.signDataDeferred = $.Deferred();
            
            // let _dfd = theSSO.MP.signDataDeferred;
            let _dfd = $.Deferred();
            // 若設定不加簽或不異動封裝檔 => 跳過
            if (!fSubmitSign || !updateEnve) {
                _dfd = $.Deferred(); _dfd.resolve({success:true, serverSigned:false}); 
                return _dfd.promise();
            }

            // 2021.6.8 - 1100676 Eric, [Review submit-sign mode]若使用server臨時憑證加簽, 再跳過加簽程序
            if (typeof updateRslt=='object' && fServerSign) {
                _dfd.resolve({serverSigned:true});
                return _dfd.promise();
            }
            
            var tobeSign = updateRslt.tobeSign;
            if (updateRslt.success===true && tobeSign.length) {
                if (SSO_CONFIG.getClientSignMode()=='iOSApp') {
                    _dfd.reject({success:false, _errMsg:'SignPage模式尚不支援iOSApp加簽!'});
                    return _dfd.promise();
                }
                else {
                    // 回傳之待簽內容為hash值! (符合SHA1/SHA256之指定header內容)
                    if (tobeSign.indexOf(sHashHeaderb64_SHA1)===0 || tobeSign.indexOf(sHashHeaderb64_SHA256)===0) {
                        fHashSign = true;
                    }
                    
                    var sTobeSignXml='', _hashAlg='';
                    var _encodeMethod = fHashSign ? 'hashBase64' : 'base64';
                    // 2017.1.17 - 回傳資訊為<SignedInfo>內容時, 才要判定_hashAlg; 若為hash value, 則HiCOS LocalServer會自動判定
                    if (!fHashSign) {
                        sTobeSignXml = Base64.decode(tobeSign);
                        _hashAlg = _getHashAlgorithm(sTobeSignXml);
                    }

                    // 2019.7-Eric, 傳送效能log
                    let _newTimeout = 0;
                    if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                        theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 使用智慧卡憑證加簽 BEGIN...');
                        window.tmBeginSignDocWithSCard = Date.now();
                        _newTimeout = 60000;
                    }
                    theLogger.log('-I- Before _signDocWithSCard...');
                    return _signDocWithSCard(_docObj.docNo, _docObj.msgId, tobeSign, _encodeMethod, pincode, _hashAlg, _dfd, _newTimeout);
                }
            }
            else {
                theLogger.error('Error! FileIOWS.UpateEnvelope, 未回傳待簽資訊!');
                _dfd.reject({success:false, errMsg:updateRslt.errMsg});
                return _dfd.promise();
            }
        })
        .then(function(signRslt) {
            theLogger.log('-I- _signDocWithSCard finished.');

            if ('dispLog' in window) {
                if (fSubmitSign) {
                    dispLog('使用憑證智慧卡加簽完成...');
                }
                else {
                    dispLog('跳過簽章程序...');
                }
            }

            var _dfd = $.Deferred();

            // 2019.4.10-Eric, 傳送效能測試
            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true && fSubmitSign) {
                let _log = SSOUtil.dev_getTimeElapseStr('signDocWithSCard', window.tmBeginSignDocWithSCard);
                theLogger.time(_log);
            }
            
            var serverPath='', sErrMsg='';
            // 若設定不加簽或不異動封裝檔 => 跳過
            if (!fSubmitSign || !updateEnve) {
                _dfd.resolve({success:true, 'serverSigned':false});
                return _dfd.promise();
            }
            
            // {success:true, docNo:signDocNo, msgId:signMsgId, signCert:_signCert, signValue:_signValue}
            if (signRslt.docNo!==_docObj.docNo || signRslt.msgId!=_docObj.msgId) {
                _dfd.reject({success:false, _errMsg:'簽章App回傳的docNo/msgId與目前開啟公文不符!'});
                return _dfd.promise();
            }
            
            if (!signRslt.signCert || (signRslt.signCert.length===0) ||
                !signRslt.signValue || (signRslt.signValue.length===0)) {
                _dfd.reject({success:false, _errMsg:'簽章App回傳的signCert/signValue不可為空白!'});
                return _dfd.promise();
            }
            
            /* 2016.9.7 - Eric, 改在此處驗證憑證有效性 */
            let _prmCheckCert = null;
            let _dfdCheckCert = $.Deferred();
            if (clientSignMode=='SCard' && updateEnve)  {
                _verifyCert2(_docObj.sourceOrgNo, signRslt.signCert, '', '', true)
                .then(function(rslt) {
                    // 有效性檢核通過, 記錄PinCode
                    if ((typeof theSSO.User.igotu !== 'string' || theSSO.User.igotu.length===0) && pincode.length) {
                        var keepPin = true;
                        var rememberPincode = theSSO.User.EnvSettings.get('MP_REMEMBER_AOL_PINCODE');
                        if (typeof rememberPincode=='string' && rememberPincode.length) {
                            rememberPincode = rememberPincode.toLowerCase();
                            if (rememberPincode=='false' || rememberPincode=='0') {
                                keepPin = false;
                            }
                        }
                        if (keepPin) {
                            if (typeof theSSO.User.igotu!=='string' || theSSO.User.igotu.length==0 ||
                                theSSO.User.igotu!=pincode) {
                                if ('verifyPinCallback' in exParaP2) {
                                    exParaP2.verifyPinCallback(true, pincode);
                                }
                                theSSO.User.igotu = pincode;
                            }
                        }
                    }

                    if ('dispLog' in window) {
                        dispLog('公文['+ _docObj.docNo +'] 驗證憑證完成...');
                    }
                    _dfdCheckCert.resolve($.extend({success:true},rslt));
                })
                .fail(function(errRslt) {
                    // _rslt = {valid:true, 'tmpCert':tmpCert};
                    if (errRslt.valid!==true) {
                        let errMsg = '憑證有效性驗證未通過! 原因:' + errRslt.errMsg;
                        errRslt._errMsg = errMsg;
                        _dfdCheckCert.reject(errRslt);
                    }
                }); 
                _prmCheckCert = _dfdCheckCert.promise();
            }
            else { 
                _dfdCheckCert.resolve({valid: true, tmpCert: false});
                _prmCheckCert = _dfdCheckCert.promise();
            }
            
            _prmCheckCert
            .done(function(rslt) {
                // 使用正式/臨時憑證智慧卡.
                if (typeof rslt!=='undefined' && typeof rslt.tmpCert=='boolean' && rslt.tmpCert===true) {
                    _docObj.tmpCert = 'Y';
                }
                else {
                    _docObj.tmpCert = 'N';
                }
                    
                // 2017.2.22 - 若使用臨時憑證,須更新ODWMSG.TMP_CER並重新上傳ODWMSG.XML
                if (_docObj.tmpCert=='Y') {
                    _docObj.set2('aol', 'ODWMSG', {'TMP_CER':'Y'});
                    serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
                    _uploadDocInfo(_docObj, serverPath)
                    .done(function() {
                        _dfd.resolve(signRslt);
                    })
                    .fail(function(errRslt) {
                        sErrMsg = '更新ODWMSG.TMP_CER欄位, 叫用_uploadDocInfo()時發生錯誤!';
                        theLogger.error('Error! ' + sErrMsg);
                        _dfd.reject({success:false, errMsg:sErrMsg});
                    });
                }
                else {
                    _dfd.resolve(signRslt);
                }
            })
            .fail(function(errRslt) {
                _dfd.reject(errRslt)
            });
            return _dfd.promise();
        })
        .then(function(signRslt) {
            /* 2016.9.17 - 不異動封裝檔或不加簽則跳過 */
            let serverSigned = (typeof signRslt=='object' && typeof signRslt.serverSigned=='boolean' && signRslt.serverSigned) ? true : false;
            if (!updateEnve || !fSubmitSign || serverSigned) {
                let _dfd = $.Deferred();
                _dfd.resolve({success:true, 'serverSigned':serverSigned});
                return _dfd.promise();
            }
            
            theLogger.log('-I- gonna signEnvelope()...');
            /* 2015.3.17 - Eric Peng, 新增 fileIOUrl 參數 */
            var fileIOUrl = _docObj.fileIOWS;
            var ICUserId = '';
            if (_docObj.isDraft) {
                ICUserId = _docObj.ICUserId;
            }
            
            if (updateEnve) {
                // 2019.4.10-Eric, 傳送效能測試
                if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                    theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- WebFileIO.signEnvelop() BEGIN...');
                }

                return theSSO.MP.envelopeUtil.signEnvelope(SAMLart, _docObj.docNo, ICUserId, _docObj.msgId, signRslt.signValue,
                        signRslt.signCert, _docObj.sourceOrgNo, fileIOUrl);
            }
            else {
                theLogger.log('-I- 不異動封裝檔, 不加簽!');
                let _dfd = $.Deferred();
                _dfd.resolve(signRslt);
                return _dfd.promise();
            }
        })
        .then(function(signEnveRslt){
            theLogger.log('-I- signEnvelope() finished, success:' + (signEnveRslt.success ? 'Y':'N'));

            if ('dispLog' in window) {
                dispLog('公文文號:[' + _docObj.docNo +'] 封裝檔加入簽章完成...');
            }

            var _dfd = $.Deferred();
            // 2019.7- 1080654 Eric, 傳送效能測試
            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                let _log = SSOUtil.dev_getTimeElapseStr('使用智慧卡憑證加簽', window.tmBeginSignDocWithSCard);
                theLogger.time(_log);
                window.tmBeginSignDocWithSCard = 0;
            }

            var _go = true;
            if (_go===false) {
                theLogger.warn('SubmitMsg-Debug: signEnvelope完成, 中止後續作業!');
                _dfd.reject($.extend({_showError: false}, {_errMsg:'Debug Cancel!'}, ture));
                return _dfd.promise();
            }
            
            var draftFilePath='', destServerWSUrl='', destRootPath='', destFilePath='', subDirDate='';
            var newMsgInfo = null;
            // 若為草稿, 須搬移電子檔至公文正式儲存區
            if (_docObj.isDraft) {
                if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- processDraftDoc BEGIN...');
                    tmBeginDraftProc = Date.now();
                }

                _docObj._draftSubmitRestore = null;
                
                // 1. 取得公文正式儲存區資訊
                theWebServices.odmssp.newMsg(SAMLart, _docObj.sourceOrgNo)
                .then(function(rslt){
                    // 2. 搬移檔案到正式儲存區
                    // draftFilePath, destServerWSUrl, destFilePath
                    draftFilePath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                    destServerWSUrl= rslt.newMsgInfo.wsUrl;
                    destRootPath = rslt.newMsgInfo.storagePath;
                    
                    var now = new Date();
                    var dirYYYMM = (now.getFullYear()-1911).toString() + SSOUtil.padLeft((now.getMonth()+1).toString(), 2);
                    var dirDate = SSOUtil.padLeft(now.getDate().toString(), 2);
                    subDirDate = SSOUtil.combineLocalPath(dirYYYMM, dirDate);
                    
                    destFilePath = SSOUtil.combineLocalPath(destRootPath, _docObj.sourceOrgNo);
                    destFilePath = SSOUtil.combineLocalPath(destFilePath, subDirDate);
                    destFilePath = SSOUtil.combineLocalPath(destFilePath, _docObj.docNo);
                    
                    newMsgInfo = rslt.newMsgInfo;
                    
                    var hasRefAttFile = false;
                    if ($.isFunction(_theAOL.getCurrFolio().getRefAttachsFileCnt)) {
                        hasRefAttFile = (_theAOL.getCurrFolio().getRefAttachsFileCnt()>0);
                    }

					//1111011	Leslie[1110865]	配合新增的簽閱附件，新增配套邏輯
					var hasTmpAttFile = false;
					if ( SSO_CONFIG.OrgNickName == "MOCS" && $.isFunction(_aol.getCurrFolio().getTmpAttachsFileCnt)){
						hasTmpAttFile = (_aol.getCurrFolio().getTmpAttachsFileCnt() > 0);
					}

                    // 2020.9.15 - 1090564 Eric, 草稿電子檔搬移時須調整檔案/子目錄清單!
                    let _option = {
                        async:true, 
                        url:_docObj.fileIOWS,
                        fSMEGWebDoc: false
                    };
                    if (SSO_CONFIG.OrgNickName=='SMEG' && _docObj.get('ODWDCM', 'DRAFT_SOURCE_TYPE')=='2') {
                        _option.fSMEGWebDoc = true;
                    }
					
					//1111011	Leslie[1110865]	配合新增的簽閱附件，新增配套邏輯
                    // return theWebServices.webFileIO.copyDraftFilesToStoragePath(SAMLart, _docObj.docNo, _docObj.signType, hasRefAttFile, draftFilePath, destServerWSUrl, destFilePath, _option);
                    return theWebServices.webFileIO.copyDraftFilesToStoragePath(SAMLart, _docObj.docNo, _docObj.signType, hasRefAttFile, draftFilePath, destServerWSUrl, destFilePath, _option, hasRefAttFile);
                })
                .then(function() {
                    if ('dispLog' in window) {
                        dispLog('Draft Doc, copyDraftFilesToStoragePath Finished...');
                    }

                    // 3. 異動公文基資的電子檔儲存位置相關欄位
                    var _subDir = SSOUtil.combineLocalPath(_docObj.sourceOrgNo, subDirDate); // $OrgNo$/YYYMM/DD/$DocNo$
                    _subDir = SSOUtil.combineLocalPath(_subDir, _docObj.docNo);
                    
                    var _dfd_in = $.Deferred();
                    
                    if (_docObj.isDraft) {
                        _docObj._draftSubmitRestore = {
                            MSG_ID: _docObj.get('ODWMSG', 'MSG_ID'),
                            DRAFT_MSG_ID: _docObj.get('ODWMSG', 'DRAFT_MSG_ID'),
                            WEB_SERVICE: _docObj.get('ODWMSG', 'WEB_SERVICE'),
                            STORAGE_PATH: _docObj.get('ODWMSG', 'STORAGE_PATH'),
                            SRV_NO: _docObj.get('ODWSMG', 'SRV_NO'),
                            SUB_DIR: _docObj.get('ODWSMG', 'SUB_DIR')
                        };
                    }
                    
                    var msgIdTrue = _docObj.msgId;
                    _docObj.set2('', 'ODWMSG', { MSG_ID: '0', SRV_NO: newMsgInfo.srvNo,
                                           DRAFT_MSG_ID: msgIdTrue, WEB_SERVICE: newMsgInfo.wsUrl,
                                           STORAGE_PATH: newMsgInfo.storagePath, SUB_DIR: _subDir});
                    
                    // 4. 上傳公文基資檔到正式儲存區
                    var _newServerPath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                    _uploadDocInfo(_docObj, _newServerPath, true)
                    .done(function(){
                        if ('dispLog' in window) {
                            dispLog('Draft Doc, update doc info Finished...');
                        }
                        _dfd_in.resolve({success:true});
                    })
                    .fail(function(errRslt){
                        if (!!_docObj._draftSubmitRestore) {
                            _resoterDraftDocInfo(_docObj);
                        }
                        
                        _dfd_in.reject({success:false, _errMsg:'重設正式公文基資後上傳基資檔作業失敗!'});
                        
                    })
                    return _dfd_in.promise();
                })
                .then(function(){
                    _dfd.resolve({success:true});
                })
                .fail(function(rslt){
                    if (!!_docObj._draftSubmitRestore) {
                        _resoterDraftDocInfo(_docObj);
                    }
                    theLogger.error(rslt._errMsg);
                    _dfd.reject($.extend({_showError: true}, rslt, true));
                    return _dfd.promise();
                });
                return _dfd.promise();
            }
            else {
                // 2021.5 - 1100093 - merge: 2021.1.14 - 1090821 Eric, 支援送外機關陳核會稿公文 [送會簽/回退文前應輸出呈現檔!]
                if (fGenCoPDF) {
                    // 叫用ODMSSP產出呈現檔函式!
                    let draftFilename = theAOL.getCurrFolio().getDraftFileName(0);
                    if (typeof draftFilename=='string' && draftFilename.length) {
                        let idxExtension = draftFilename.lastIndexOf('.');
                        if (idxExtension!=-1) {
                            draftFilename = draftFilename.substr(0, idxExtension);
                        }
                        return theWebServices.odmssp.genCoPDF(SAMLart, _docObj.sourceOrgNo, _docObj.docNo, draftFilename,  {async:true});
                    }
                    else {
                        _dfd.reject({success:false, errMsg:'產出呈現檔作業, 無法取得文稿原始檔名稱.'});
                        return _dfd.promise();    
                    }
                }
                else {
                    _dfd.resolve({success:true});
                    return _dfd.promise();
                }
            }
        })
        .then(function() {
            if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true && _docObj._draftSubmitRestore!==null) {
                let _log = SSOUtil.dev_getTimeElapseStr('processDraftDoc', tmBeginDraftProc);
                theLogger.time(_log);
            }
            
            var _dfd = $.Deferred();
            var _go = true;
            if (typeof SSO_CONFIG.debugSubmit=='boolean' && SSO_CONFIG.debugSubmit===true) {
                _go = confirm('SubmitMsg-Debug: 叫用ODMSSP.SubmitMsg執行傳送作業?');
            }
            
            if (_go===false) {
                _dfd = $.Deferred();
                _dfd.reject({success:false, errMsg:'測試傳送功能, 強制取消作業!'});
                return _dfd.promise();
            }
            else {
                return _submitMsg(SAMLart, _docObj, null, {Stage2Submit:true, AOLEDocSubmit:true}); // @submit stage2
            }
        })
        .then(function(submitMsgRslt) {
            if ('dispLog' in window) {
                dispLog('公文文號:[' + _docObj.docNo +'] 完成傳送作業...');
            }

            //1141218   Leslie[1141658] 新增背景傳送時，畫面中顯示提示訊息以避免使用者直接關閉視窗，傳送完成關閉訊息
            SSOUtil.loading("hide");

            if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                var sDocInfo = '[DocNo=' + _docObj.docNo + ', MsgId=' + _docObj.msgId + ']';
                let _log = SSOUtil.dev_getTimeElapseStr('取Pincode後作業', window.tmAfterGetPIN);
                theLogger.time(_log);
                _log = SSOUtil.dev_getTimeElapseStr('DocSubmitUtil.clientSignSubmit_withSignPageP2()' + sDocInfo, window.tmBeginSubmitStage2);
                theLogger.time(_log);
                window.tmBeginSubmitStage2 = 0; window.tmAfterGetPIN = 0;
            }
            _dfdCSSP2.resolve({success:true, docObj:_docObj});
        })
        .fail(function(errRslt) {
            if (!!_docObj._draftSubmitRestore) {
                _resoterDraftDocInfo(_docObj);
            }
             
            // 2017.10.12 - 1060819, 調整錯誤提示!
            var errObj = errRslt;
            var errMsg = '', showErr=true;
            /* 2020.7.9 - 1090390 Eric, 公文傳送子視窗不顯示錯誤訊息!
            if (errObj) {
                if (typeof errObj.errMsg=='string' && errObj.errMsg.length) {
                    errMsg = errObj.errMsg;
                }
                else if (typeof errObj._errMsg=='string' && errObj._errMsg.length) {
                    errMsg = errObj._errMsg;
                }
                if (typeof errObj._showError=='boolean' && errObj._showError===false) {
                    showErr = false;
                }
                if (errMsg.length && showErr) {
                    // 2018.1.15 - 1061276
                    if (typeof errObj.checkDataErr=='boolean' && errObj.checkDataErr===true) {
                        alert(errMsg);
                    }
                    else {
                        alert('公文傳送作業失敗[Client加簽模式], 錯誤說明:' + errMsg);
                    }
                    showErr = false;
                }
            }*/
			
			//1131216	Leslie[1131050]	系統啟用背景傳送時，若跨平台元件未啟動或異常停止，新增逾時通知目前使用者功能
			//1140609	Leslie[問題序73]	調整簽核元件異常處置，修正檢核的錯誤訊息，及背景傳送斷鍊問題(針對憑證異常，一律
			// if(errObj._errMsg?.includes('逾時')){	//SmartCard回來的錯誤訊息放在_errMsg，其他傳送錯誤的訊息放在errMsg
			if(errObj._errMsg?.includes('逾時') || ('csReject' in errObj && errObj.csReject == true)){	//SmartCard回來的錯誤訊息放在_errMsg，其他傳送錯誤的訊息放在errMsg
				let docList = window.submitDocList;				
				if(docList.length > 0){
					var docStrList = docList.reduce(function(arOut,obj){
						let _docObj = JSON.parse(obj.docObjStr)
						arOut.push(`${_docObj.docNo}|||${_docObj.ICOUName}|||${_docObj.ICUserName}|||${_docObj.rcvDate}|||${_docObj.dueDate}|||${_docObj.currLocate}|||${_docObj.fromSubject}`);
						return arOut;
					},[])
					
					let res = theWebServices.odmssp.SendTimeOutNotify(SAMLart, docStrList);
					if(!res.success)
						alert(res.errMsg);
				}
			}

            if ('dispLog' in window) {
                dispLog('公文文號:[' + _docObj.docNo +'] 傳送作業結束, 發生異常未完成!');
            }
            
            theLogger.log('-ERR- _clientSignSubmit_withSignPage2() failed.');
            _dfdCSSP2.reject($.extend({_showError:showErr, errMsg: errRslt.errMsg, docObj:JSON.stringify(_docObj)}, errRslt));
        });
        return _dfdCSSP2.promise();
    } /* END of _clientSignSubmit_withSignPageP2 */
    
    /* 紙本簽核公文傳送 */
    function _doPDocSubmit(_aol, SAMLart, _docObj, _ruleOption) {
        var _dfdPDocSubmit = $.Deferred();

		//1130130	Leslie[1120330]	修正當要傳送至一層決行，而預排流程中仍有未完成的會辦流程時則強制送會辦，調整傳送流程(先檢核再儲存)
		_checkUnfinishedCoworkFlow(_docObj, _aol.nextTarget)	//因為Deferred流程，改到裡面才判斷
		.then(function(){
			return _saveMsg(SAMLart, _aol, _docObj);
		})	
        //_saveMsg(SAMLart, _aol, _docObj)		//1130130	Leslie[1120330]	配合調整流程，移到上面叫用
        .then(function() { // 2021.4.20 - 1080768, merge MOI-1070655 傳送一層決行單位前檢核是否有未完成的會辦流程.
			//1130130	Leslie[1120330]	配合調整流程，儲存後直接接後續檢核
            // let sVal = theSSO.User.EnvSettings.get('CHECK_UNFINISHED_COWORK_FLOW');
            // if (SSOUtil.isValueTrue(sVal)) {
                // return _checkUnfinishedCoworkFlow(_docObj, _aol.nextTarget)
            // }
            // else {
                let _dfdInner = $.Deferred();
                _dfdInner.resolve({success:true})
                return _dfdInner.promise();
            // }
        })
        .then(function() {
            // 2021.9.15 - 1090862 Eric, 歸檔傳送前檢核若公文有可發文文稿且未發文, 須提示使用者決定是否傳送
            return _checkDocIssueStatus_PreSubmit(_aol, true);
        })
        .then(function() {
            var _dfd = $.Deferred();
            if (!!_ruleOption) {
                var _ruleErrItem = [];
                if (!_checkSuitable_PreSubmit(_docObj, _ruleOption, _ruleErrItem)) {
                    
                    var _errStr = '無法傳送公文文號[' + _docObj.docNo + ']:' + _ruleErrItem.toString();
                    _dfd.reject({success:false, _showError:true, _errMsg: _errStr});
                    return _dfd.promise();
                }
            }
            
            // 若為草稿, 須搬移電子檔至公文正式儲存區
            if (_docObj.isDraft) {
                var draftFilePath='', destServerWSUrl='', destRootPath='', destFilePath='', subDirDate='';
                var newMsgInfo = null;
                // 1. 取得公文正式儲存區資訊
                theWebServices.odmssp.newMsg(SAMLart, _docObj.sourceOrgNo)
                .then(function(rslt){
                    // 2. 搬移檔案到正式儲存區
                    // draftFilePath, destServerWSUrl, destFilePath (STORAGE_PATH/$OrgNo$/YYYMM/DD)
                    var _dfd_in = $.Deferred();
                    
                    newMsgInfo = rslt.newMsgInfo;
                    
                    draftFilePath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                    destServerWSUrl= rslt.newMsgInfo.wsUrl;
                    destRootPath = rslt.newMsgInfo.storagePath;
                    
                    var now = new Date();
                    var dirYYYMM = (now.getFullYear()-1911).toString() + SSOUtil.padLeft((now.getMonth()+1).toString(), 2);
                    var dirDate = SSOUtil.padLeft(now.getDate().toString(), 2);
                    subDirDate = SSOUtil.combineLocalPath(dirYYYMM, dirDate);
                    
                    destFilePath = SSOUtil.combineLocalPath(destRootPath, _docObj.sourceOrgNo);
                    destFilePath = SSOUtil.combineLocalPath(destFilePath, subDirDate);
                    destFilePath = SSOUtil.combineLocalPath(destFilePath, _docObj.docNo);
                                
                    theWebServices.webFileIO.copyDraftFilesToStoragePath(SAMLart, _docObj.docNo, _docObj.signType, false, draftFilePath, destServerWSUrl, destFilePath, {async:true, url:_docObj.fileIOWS})
                    .done(function(rslt) {
                        _dfd_in.resolve(rslt);
                    })
                    .fail(function(err) {
                        _dfd_in.reject({success: false, errMsg:err.errMsg, errObj: err});
                    });
                    return _dfd_in.promise();
                })
                .then(function() {
                    // 3. 異動公文基資的電子檔儲存位置相關欄位
                    var _subDir = SSOUtil.combineLocalPath(_docObj.sourceOrgNo, subDirDate); // $OrgNo$/YYYMM/DD/$DocNo$
                    _subDir = SSOUtil.combineLocalPath(_subDir, _docObj.docNo);
                    
                    var _dfd_in = $.Deferred();
                    
                    if (_docObj.isDraft) {
                        _docObj._draftSubmitRestore = {
                            MSG_ID: _docObj.get('ODWMSG', 'MSG_ID'),
                            DRAFT_MSG_ID: _docObj.get('ODWMSG', 'DRAFT_MSG_ID'),
                            WEB_SERVICE: _docObj.get('ODWMSG', 'WEB_SERVICE'),
                            STORAGE_PATH: _docObj.get('ODWMSG', 'STORAGE_PATH'),
                            SRV_NO: _docObj.get('ODWSMG', 'SRV_NO'),
                            SUB_DIR: _docObj.get('ODWSMG', 'SUB_DIR')
                        };
                    }
                    
                    var msgIdTrue = _docObj.msgId;
                    _docObj.set2('aol', 'ODWMSG', { MSG_ID: '0', SRV_NO: newMsgInfo.srvNo,
                                           DRAFT_MSG_ID: msgIdTrue, WEB_SERVICE: newMsgInfo.wsUrl,
                                           STORAGE_PATH: newMsgInfo.storagePath, SUB_DIR: _subDir});
                    
                    /*_docObj.set2('aol', 'ODWMSG', [{ fieldname:'MSG_ID', value: '0'}, {fieldname:'SRV_NO', value: newMsgInfo.srvNo },
                                           {fieldname:'DRAFT_MSG_ID', value: msgIdTrue}, {fieldname:'WEB_SERVICE', value: newMsgInfo.wsUrl},
                                           {fieldname:'STORAGE_PATH', value: newMsgInfo.storagePath}, {fieldname:'SUB_DIR', value: _subDir}]);*/
                    
                    // 4. 上傳公文基資檔到正式儲存區
                    var _newServerPath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                    _uploadDocInfo(_docObj, _newServerPath, true)
                    .done(function() {
                        _dfd_in.resolve({success:true});
                    })
                    .fail(function(errRslt) {
                        _dfd_in.reject({success:false, errMsg:'重設正式公文基資後上傳基資檔作業失敗!'});
                    });
                    return _dfd_in.promise();
                })
                .then(function(){
                    _dfd.resolve({success:true});
                })
                .fail(function(rslt){
                    theLogger.error(rslt.errMsg);
                    _dfd.reject($.extend({_showError: true}, rslt));
                });
            }
            else {
                _dfd.resolve({success:true});
            }
            return _dfd.promise();
        })
        .then(function() {
            var _go = true; //for dev. : confirm('叫用ODMSSP.SubmitMsg?');
            if (_go) {
                return _submitMsg(SAMLart, _docObj, _aol, {Stage2Submit:false, AOLEDocSubmit:false});
            }
            else {
                var _dfd = $.Deferred();
                _dfd.reject({success:false, errMsg:'For debug!取消公文傳送作業!'});
                return _dfd.promise();
            }
        })
        .then(function(){
            _dfdPDocSubmit.resolve({success: true});
        })
        .fail(function(errObj) {
            // 草稿傳送失敗, 須回復公文基資欄位值!
            if (_docObj.isDraft && typeof _docObj._draftSubmitRestore!=='undefined' && _docObj._draftSubmitRestore!==null) {
                 _docObj.set2('aol', 'ODWMSG', _docObj._draftSubmitRestore);
                 _docObj._draftSubmitRestore = null;
            }
            
            var errMsg='';
            var showErr = true;
            if (errObj) {
                if (typeof errObj._showError=='boolean' && errObj._showError===false) {
                    showErr = false;
                }
                
                if (!!errObj.errMsg && errObj.errMsg.length) {
                    errMsg = errObj.errMsg;
                }
                else if (!!errObj._errMsg && errObj._errMsg.length) {
                    errMsg = errObj._errMsg;
                }
                if (errMsg.length && showErr) {
                    // 2018.1.15 - 1061276
                    if (typeof errObj.checkDataErr=='boolean' && errObj.checkDataErr===true) {
                        alert(errMsg);
                    }
                    else {
                        alert('公文傳送作業失敗[紙本], 錯誤說明:' + errMsg);
                    }
                }
            }
            
            theLogger.error('-ERR- _doPDocSubmit() failed.');
            _dfdPDocSubmit.reject({success: false,_showError: false, errMsg: errMsg});
        });
        return _dfdPDocSubmit.promise();
    } // EOF _doPDocSubmit

    /* 2015.10 - 唯讀模式仍可能傳送 (Ex. 回閱) */
    function _readOnlySubmit(_aol, _docObj) {
        if (typeof _docObj=='undefined') {
            _docObj = _aol.docObj;
        }

        var SAMLart = localStorage.Artifact;
        _saveMsg(SAMLart, _aol, _docObj)
        .then(function() {
            return _submitMsg(SAMLart, _docObj, _aol, {Stage2Submit:false, AOLEDocSubmit:true});	
        })
        // 2022.11.10 - Eric, quick-fix merge: [1101623]	Merge[1080654]自動開啟下一筆公文，及配套功能
		.then(function(rsltSubmit) {
			if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
				let _log = SSOUtil.dev_getTimeElapseStr('取Pincode後作業', window.tmAfterGetPIN);
				theLogger.time(_log);
				_log = SSOUtil.dev_getTimeElapseStr('公文傳送作業', window.tmBeginSubmit, window.tmGetPIN);
				theLogger.time(_log);
				window.tmBeginSubmit = 0; window.tmAfterGetPIN = 0; window.tmGetPIN = 0;
			}

			// 2019.8.14 - 1080654 Eric, 傳送後自動開次筆功能
			let _dfd = $.Deferred();
			if ('nextDocObj' in rsltSubmit && rsltSubmit.nextDocObj!=null) {
				window.tmBeginOpenDoc = Date.now();
				window.tmBeginOpenDoc2 = window.tmBeginOpenDoc;
				if (window.iOS_device) {
					window.tmBeginOpenDoc3 = window.tmBeginOpenDoc;
				}
				else {
					window.tmBeginOpenDoc3 = 0;
				}
						
				let _nextDocObj = rsltSubmit.nextDocObj;
				let SAMLart = localStorage.Artifact;
				theSSO.MP.todolist.builder.checkMsgValidity(SAMLart, _nextDocObj)
				.then(function(rslt) {
					var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, _nextDocObj.sourceOrgNo, _nextDocObj.signType);
					if (menuRule) {
						if (_nextDocObj.signType=='E' || _nextDocObj.signType=='P') {
							var rule = menuRule.getRule(_nextDocObj.folder, _nextDocObj.subfolder);
							if (typeof rule=='undefined' || rule===null) {
								alert('無法取得公文夾[' + _nextDocObj.folder + '-' + _nextDocObj.subfolder +']MenuRule設定');
								_dfd.reject({success:false, errMsg:'無法取得公文夾[' + _nextDocObj.folder + '-' + _nextDocObj.subfolder +']MenuRule設定!'});
							}
						}
						
						SSOUtil.toggleFuncButton(0x3, true);

                        // 2022.7.28 - 1101623 Eric, 提示使用者[自已辦理公文]及[代理公文]切換!
                        if ('proxyChange' in rsltSubmit) {
                            let _showWarning = rsltSubmit.proxyChange;
                            // if ('dev_proxy_chagne_setup' in localStorage) {
                            //     let _ans = prompt('是否顯示代理公文切換?\r\n0:不顯示, 1:顯示, 2:顯示[主辦->代理], 3:顯示[代理->主辦]', '1');
                            //     if (_ans=='0') {
                            //         _showWarning = false;
                            //     }
                            //     else if (_ans=='1') {
                            //         _showWarning = true;
                            //     }
                            //     else if (_ans=='2') {
                            //         _showWarning = true;
                            //         _nextDocIsProxy = true;
                            //     }
                            //     else if (_ans=='3') {
                            //         _showWarning = true;
                            //         _nextDocIsProxy = false;
                            //     }
                            // }
                            if (_showWarning) {
                                let proxyChangeWarning = '';
                                let _nextDocIsProxy = SSOUtil.isValueTrue(_nextDocObj.ODWMSG.IS_PROXY_DOC);
                            
                                if (_nextDocIsProxy) {
                                    proxyChangeWarning = '下一筆公文起為代理公文.\r\n代理公文夾：[' +  theSSO.MP.todolist.builder.getDocFolderString(_nextDocObj) + ']';
                                }
                                else {
                                    proxyChangeWarning = '目前公文為代理公文，下一筆公文起為非代理公文.\r\n非代理公文夾：[' +  theSSO.MP.todolist.builder.getDocFolderString(_nextDocObj) + ']';
                                }
                                if (proxyChangeWarning.length) {
                                    alert(proxyChangeWarning);
                                }
                            }
                        }

						// 開啟次筆待辦公文
						theSSO.MP.openDocWithAOL(SAMLart, _nextDocObj, 'todolist', true); // list item touch
						_dfd.resolve({success:true});
					}
					else {
						alert('無法取得MenuRule設定');
						_dfd.reject({success:false, errMsg:'無法取得MenuRule!'});
					}
				})
				.fail(function(rslt){
					if(!!rslt && !!rslt.msg) {
						theLogger.error(rslt.msg);
					}
					else {
						theLogger.error('檢核MsgId有效性或loadDocPreview failed.');
					}
					_dfd.reject(rslt);
				});
			}
			else {
				_dfd.resolve({success:true});
			}
			return _dfd.promise();
		})	// 2022.11.10 - Eric, 內政部自動開次筆公文Quick-fix ==END==
        .fail(function(errObj) {
            var errMsg = '';
            if (errObj) {
                var showErr = true;
                if (typeof errObj._showError=='boolean' && errObj._showError===false) {
                    showErr = false;
                }
                if (!!errObj.errMsg && errObj.errMsg.length) {
                    errMsg = errObj.errMsg;
                }
                else if (!!errObj._errMsg && errObj._errMsg.length) {
                    errMsg = errObj._errMsg;
                }
                if (errMsg.length && showErr) {
                    // 2018.1.15 - 1061276
                    if (typeof errObj.checkDataErr=='boolean' && errObj.checkDataErr===true) {
                        alert(errMsg);
                    }
                    else {
                        alert('公文傳送作業[唯讀模式]失敗, 錯誤說明:' + errMsg);
                    }
                }
            }
            theLogger.error('-ERR- _readOnlySubmit() failed.');
            return false;
        });
        return true;
    } // EOF _readOnlySubmit

    // 2020.7 - 1090390 Eric, IE: signpage, chrome/firefox: iFrame
    // 2019.5 - Eric, test submit doc with child process page
    function _setupDocSubmitProcPage(url, mode) {
        function _waitProcWndReady(theWnd) {
            var _dfd = $.Deferred();
            var _timeout = 3000; // 3000ms = 3s
            var stDT = Date.now();
            var tmInter = setInterval(function() {
                if (typeof theWnd.document!=='undefined' && theWnd.document!==null) {
                    clearInterval(tmInter);
                    _dfd.resolve({success:true});
                }
                else {
                    // 超過3秒仍未ready, 視為異常!
                    if (Date.now()-stDT > _timeout) {
                        _dfd.reject({success:false, errMsg:'time out'});
                    }
                }
            }, 200);
            return _dfd.promise();
        }

        let _dfd = $.Deferred();
        url = (typeof url=='string'&&url.length)?url:SSO_CONFIG.DocSubmitDlgPage; //'RD-DocSubmit.html';
        if (theSSO._doRealSubmit===false) {
            url += '?NoRealSubmit=Y'
        }

        // 2020.7 - 1090390 Eric, check submit mode
        if (typeof mode=='undefined') {
            mode = 'signpage';
        }

        if (typeof mode=='string' && mode=='signpage') {
            if (typeof theSSO.MP.submitDocProcWnd=='undefined' || theSSO.MP.submitDocProcWnd==null || theSSO.MP.submitDocProcWnd.closed==true) 
            {
                DocSubmitUtil.stopDocSubmitPageMessageListen();

                // 2020.6.20 - 1090390 Eric, 傳送子視窗位置調整測試!
                // 1. 目前只有IE會使用傳送子視窗, Chrome/FireFox採WebWorker/iFrame方案!
                // 2. 子視窗開啟位置在視窗右下角, 使用者不易見到並進行操作!
                let leftScnBound = SSOUtil.leftScreenBoundry(); //支援雙螢幕.
                let wDlg=360, hDlg=200;
                //let wDlg=10, hDlg=10;
                //let hTitle = 60;
                //let winSysBarHeight = window.screen.availTop==0?(window.screen.height- window.screen.availHeight):0;
                let left = leftScnBound + window.screen.width - 2;
                let top = window.screen.height - 2; // - winSysBarHeight?
                // directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,
                let sOpenParam = 'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=yes,height=' + hDlg + ', width=' + wDlg + ', left=' + left + ', top=' + top;
                theLogger.log('DocSubmitPage OpenParam=' + sOpenParam);

                let _submitProcWnd = window.open(url, '公文傳送作業', sOpenParam);
                if (typeof _submitProcWnd=='object' && _submitProcWnd!==null) {
                    _waitProcWndReady(_submitProcWnd)
                    .done(function(rslt) {
                        theLogger.time('-I- submitProcWnd.document.readyState=' + _submitProcWnd.document.readyState);
                        if (_submitProcWnd.document.readyState!=='complete') {
                            _submitProcWnd.document.onreadystatechange = function () {
                                if (_submitProcWnd.document.readyState === "complete") {
                                    theLogger.time('-I- [onreadystatechange] callback, submitProcWnd.document.readyState=' + _submitProcWnd.document.readyState);
                                    if (typeof _submitProcWnd.readyCheck=='function' && _submitProcWnd.readyCheck!==null) {
                                        //_submitProcWnd.setUser(theSSO.User);
                                        _submitProcWnd.setUser2(theSSO.RawUser);
                                        theSSO.MP.submitDocProcWnd=_submitProcWnd;

                                        $(window).on('message', DocSubmitUtil.receiveDocSubmitPageMessage);

                                        theLogger.log('-I- SetupDocSubmitProcPage, Popup window loaded...');
                                        _dfd.resolve({success:true, docSubmitProcWnd: _submitProcWnd});
                                    }
                                    else {
                                        // 載入之網頁有異常!
                                        _dfd.reject({success:false, errMsg:'載入之網頁, 無readyCheck function!'})
                                    }
                                }
                            };
                        }
                        else {
                            if (typeof _submitProcWnd.readyCheck=='function' && _submitProcWnd.readyCheck!==null) {
                                _submitProcWnd.setUser(theSSO.User);
                                theSSO.MP.submitDocProcWnd=_submitProcWnd;
                                $(window).on('message', DocSubmitUtil.receiveDocSubmitPageMessage);
                                theLogger.log('-I- SetupDocSubmitProcPage, Popup window loaded...');
                                _dfd.resolve({success:true, docSubmitProcWnd:_submitProcWnd, docSubmitProcFrame:null});
                            }
                            else {
                                // 載入之網頁有異常!
                                _dfd.reject({success:false, errMsg:'載入之網頁, 無readyCheck function!'})
                            }
                        }
                    })
                    .fail(function(errRslt){
                        _dfd.reject(errRslt);
                    });
                }
                else {
                    theLogger.log('-I- SetupDocSubmitProcPage, return exist Popup window...');
                    _dfd.reject({success:false, errMsg:'叫用window.open(url=\'' + url + '\') 發生錯誤! [回傳 null]'});
                }
            }
            else {
                _dfd.resolve({success:true, docSubmitProcWnd: theSSO.MP.submitDocProcWnd, docSubmitProcFrame:null});
            }
        }
        else if (typeof mode=='string' && mode=='iframe') {
            //
            // 2020.7.8 - 1090390 Eric, Chrome/Firefox使用iFrame嵌入[公文傳送作業網頁程式]!
            //
            if (url.indexOf('?')!=-1) {
                url += '&mode=iFrame';
            }
            else {
                url += '?mode=iFrame';
            }

            let $docSubmitPageFrame = $('#submitPageCntr > iFrame');
            if ($docSubmitPageFrame.length==0) {
                DocSubmitUtil.stopDocSubmitPageMessageListen();

                let iframe = document.createElement('iframe');
                // before setting 'src'
                iframe.onload = function() {
                    theLogger.log('-I- SetupDocSubmitProcPage(), iFrame loaded...');

                    //let sUserXML =  (new XMLSerializer()).serializeToString(theSSO.RawUser);
                    //this.contentWindow.postMessage({type:'setUser', data:sUserXML});
                    
                    if (!this.contentWindow.setUser2(theSSO.RawUser)) {
                        $('#submitPageCntr')[0].removeChild(iframe);
                        _dfd.reject({success:false, _errMsg:'叫用傳送子視窗setUser2失敗!'});
                    }
                    else {
                        theSSO.MP.submitDocProcFrameWnd =this.contentWindow;

                        $(window).on('message', DocSubmitUtil.receiveDocSubmitPageMessage);
                        _dfd.resolve({success:true, docSubmitProcFrameWnd:theSSO.MP.submitDocProcFrameWnd, docSubmitProcWnd:null});
                    }
                }; 
                theLogger.log('DocSubmitPageFrame url=' + url);

                iframe.src = url; 
                $('#submitPageCntr')[0].appendChild(iframe); // add it to wherever you need it in the document
            }
            else {
                if (theSSO.MP.submitDocProcFrameWnd!=null) {
                    theLogger.log('-I- SetupDocSubmitProcPage(), return exist iFrame...');
                    _dfd.resolve({success:true, docSubmitProcFrameWnd:theSSO.MP.submitDocProcFrameWnd, docSubmitProcWnd:null});
                }
                else {
                    _dfd.reject({success:false, errMsg:'初始化傳送子視窗發生錯誤! [submitFrame not null, but MP\'s submitProcFrame is null.'});
                }
            }
        }

        return _dfd.promise();
    } // EOF _setupDocSubmitProcPage

    /* 2019.7 - Eric, 公文開啟/傳送效能改善 */
    function _endMainPageSubmit(_theAOL, _docObj) {
        var _dfd = $.Deferred();

        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- _endMainPageSubmit() BEGIN...');
            window.tmBeginEndSubmit = Date.now();
        }

        _docObj.submitProcessing = true;
             
        // 2019.7 - Eric, 要在異動todolist內容之前先找出下一筆公文資訊!
        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 清除已傳送公文作業 BEGIN...');
            window.tmBeginClearDoc = Date.now();
        }

        let _openNextDoc = false;
        let _openNextDocAdvMode = false;
        if ('submitOptions' in theSSO.MP) {
            if (typeof (theSSO.MP.submitOptions.openNextDoc)=='boolean') {
                _openNextDoc = theSSO.MP.submitOptions.openNextDoc;

                if (typeof (theSSO.MP.submitOptions.openNextDocAdvMode)=='boolean') {
                    _openNextDocAdvMode = theSSO.MP.submitOptions.openNextDocAdvMode;
                }
            }
        }

        // 2019.7 - Eric, 不關閉AOL, 直接開啟次筆公文
        let _nextDocNo='', _nextMsgId = '';
        let _nextDocObj = null;
        let rsltENextId = null;
        if (_openNextDoc && !_docObj.isDraft) { // 草稿不取次筆公文!
            let _currMsgId = _docObj.msgId;
            rsltENextId = theSSO.MP.todolist.builder.getENextId(_currMsgId, _openNextDocAdvMode);
            /* let rslt = {
                success: true,
                currentFolder: false,
                nextMsgId: _doc.msgId,
                fromHead: rtnFromHead,
                folder: _doc.folder,
                subfolder: _doc.subfolder,
            };*/
            if (typeof rsltENextId!='undefined' && rsltENextId.success) {
                _nextDocNo = rsltENextId.docNo;
                _nextDocObj = theSSO.MP.todolist.builder.getDocByMsgId(rsltENextId.nextMsgId);
                if (typeof _nextDocObj!='undefined' && _nextDocObj!==null) {
                    _nextMsgId = _nextDocObj.msgId;
                    _nextDocNo = _nextDocObj.docNo;
                }
            }
                        
            if (typeof _nextDocObj=='undefined' || _nextDocObj===null) {
                theLogger.log('DocNo:' + _docObj.docNo + ', MsgId=' + _docObj.msgId + '沒有次筆待辦項目!');
                _rsltENextId = null;
            }
        }

        // 將對應的ToDoList項目刪除...
        theLogger.log('-I- gonna invoke todolist.deleteMsg()');
        if (_docObj.isDraft) { // 2017.1.23
            theSSO.MP.PreviewCtrl.removePreviewItem(_docObj.get('ODWMSG', 'DRAFT_MSG_ID'));
        }
        else {
            theSSO.MP.PreviewCtrl.removePreviewItem(_docObj.msgId);
        }

        // 2017.8.29 - Eric Peng, bug-fix, 若為草稿傳送, 須回復公文基資欄位值! (否則MsgId會比對不到)
        if (_docObj.isDraft && typeof _docObj._draftSubmitRestore!=='undefined' && _docObj._draftSubmitRestore!==null) {
            _docObj.set2('aol', 'ODWMSG', _docObj._draftSubmitRestore);
            _docObj._draftSubmitRestore = null;
        }

        theSSO.MP.todolist.deleteMsg(_docObj, false, true);
        
        // 2015.12.23 - Raymond, 傳送成功後要先清除暫存資料
        if (typeof _theAOL==='object' && _theAOL!==null && _theAOL.getCurrFolio()) {
            _theAOL.getCurrFolio().clearTemp();
			_theAOL.getCurrFolio().termAutoBackup();	// 2016.12.22 - Raymond, 關閉後清除自動備份檔
            _theAOL.getCurrFolio = function() {	// 2016.8.1 - Raymond, 關閉後清除
                return false;
            };
            // 2016.8.2 - Raymond, 頁籤文字改為空白表示未開啟公文
            $("#tabbar ul li:first").find("a")
                .attr({href: "folio_", id: "folio_"})
                .html("&nbsp;")
                .data("model", null);
                
            // 2017.4.21 - 1060272 select#chooseX 避免選到傳送子視窗
            // 2016.8 - Eric Peng, 傳送選單UI清空
            $('#aol #transPanel select#chooseA').html('');
            $('#aol #transPanel select#chooseB').html('').hide();
            $('#aol #transPanel select#chooseC').html('').hide();
            $('#aol #transPanel select#chooseD').html('').hide();

            if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                let _log = SSOUtil.dev_getTimeElapseStr('清除已傳送公文作業',  window.tmBeginClearDoc);
                theLogger.time(_log);
                _log = SSOUtil.dev_getTimeElapseStr('取Pincode後作業(A)', window.tmAfterGetPIN);
                theLogger.time(_log);
                _log = SSOUtil.dev_getTimeElapseStr('公文傳送作業[Stage 1]', window.tmBeginSubmit, window.tmGetPIN);
                theLogger.time(_log);
                
                theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 開啟次筆公文作業[傳送後] BEGIN...');
                window.tmBeginClearDoc = 0;
                window.tmBeginOpenDoc = Date.now();
                window.tmBeginOpenDoc2 = Date.now();
            }

			if (!!_nextDocObj && _nextDocObj.signType=='E') {
                if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 次筆公文: DocNo=' + _nextDocNo + ' MsgId=' + _nextMsgId + '.');
                }

				if (_nextMsgId.length) {
					if (!!_nextDocObj && _nextDocObj.signType==='W') {
						_dfd.reject({success:false, errMsg:'invalid _nextDocObj!'});
					}
					
					let SAMLart = localStorage.Artifact;
					theSSO.MP.todolist.builder.checkMsgValidity(SAMLart, _nextDocObj)
					.then(function(rslt) {
						var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, _nextDocObj.sourceOrgNo, _nextDocObj.signType);
						if (menuRule) {
							if (_nextDocObj.signType=='E' || _nextDocObj.signType=='P') {
								var rule = menuRule.getRule(_nextDocObj.folder, _nextDocObj.subfolder);
								if (typeof rule=='undefined' || rule===null) {
									alert('無法取得公文夾[' + _nextDocObj.folder + '-' + _nextDocObj.subfolder +']MenuRule設定');
									_dfd.reject({success:false, errMsg:'無法取得公文夾[' + _nextDocObj.folder + '-' + _nextDocObj.subfolder +']MenuRule設定!'});
				                }
							}
                            
                            SSOUtil.toggleFuncButton(0x3, true);

							// 開啟次筆待辦公文
                            theSSO.MP.openDocWithAOL(SAMLart, _nextDocObj, 'todolist', true); // list item touch
                            _dfd.resolve({success:true, openNextDoc: true});
						}
						else {
                            alert('無法取得MenuRule設定');
                            _dfd.reject({success:false, errMsg:'無法取得MenuRule!'});
						}
					})
					.fail(function(rslt){
						if(!!rslt && !!rslt.msg) {
							theLogger.error(rslt.msg);
						}
						else {
							theLogger.error('檢核MsgId有效性或loadDocPreview failed.');
                        }
                        _dfd.reject(rslt);
					});
				}
                // 2015.1 - 開啟SignType='W'待辦
                /*
				else if (_nextMsgId.length && _nextDocObj.signType=='W') {
					docItem = theSSO.MP.todolist.builder.getDocByMsgId(_nextMsgId);
					if (!!docItem && !!docItem.url && docItem.url.length) {
						// 2016.6 - 以新分頁開啟ASPX程式
						
                        //theSSO.MP.openASPXDlg(docItem.url, window.localStorage['Artifact']);
                        SSOUtil.toggleFuncButton(0x3, true);
                        var newWnd = theSSO.Util.openASPX_NewFrame(docItem.url, window.localStorage.Artifact);
                        _dfd.resolve({success:true});
					}
				}*/
            }
            else {
                // 2019.5 - Eric, 若無次筆公文, 則直接回TodoList頁
                $('#docWorkPane').hide();
                
                //開啟todolist
                var $listPane = $('#todolistContainer #listPane');
                // 2019.7 - Eric, IE bug-fix + 改成與關閉行為致!
                let $displayPane=null, $hiddenPane=null;
                let _displayMode = ('mp_display_mode' in localStorage)?localStorage.mp_display_mode:'';
                if (_displayMode=='icon') {
                    $displayPane = $('#todolistContainer #iconPane')
                    $hiddenPane = $('#todolistContainer #listPane')
                }
                else {
                    $displayPane = $('#todolistContainer #listPane');
                    $hiddenPane = $('#todolistContainer #iconPane')

                    // 2021.1.7 - 1090786 Eric, 追查MP todolist未顯示問題
                    theLogger.log('-I- @_submitMsg() $displayPane length=' + $displayPane.length + ', $hiddenPane length=' + $hiddenPane.length + '[displayPane=#listPane, hiddenPane=#iconPane]');
                }

                $('#todolistContainer #sidePane').hide();
                $hiddenPane.hide();
                $displayPane.show();

                // 2017.3.7 -
                if ($listPane.length && $listPane.data('resize')=='true') {
                    // 2021.1.7 - 1090786 Eric, 追查MP todolist未顯示問題
                    theLogger.log('-I- @_submitMsg() #listPane html=' + $listPane[0].outerHTML.substr(0, 256) + '...');

                    theSSO.MP.resizeListPane(null, null, $listPane);

                    // 2021.1.7 - 1090786 Eric, 追查MP todolist未顯示問題
                    theLogger.log('-I- @_submitMsg() [AFTER resizeListPane!] #listPane html=' + $listPane[0].outerHTML.substr(0, 256) + '...');
                }

                $('#todolistContainer').removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');

                // 2021.1.7 - 1090786, Eric - 測公文傳送/關閉後待辦清單頁未拉出問題.
				let strClass =  $('#todolistContainer').attr('class');
				theLogger.log('-I- #todolistContainer\'s class=\'' + strClass + '\' after REMOVE doc_desktop_hiddenpage, and ADD doc_desktop_showpage');
                                
                // 2016.7 - 新增文稿側桌=>創稿側桌
                theSSO.MP.changeNewDocSidePaneTitle(false);
                _dfd.resolve({success:true, openNextDoc: false});
            }
        }
        else {
            _dfd.resolve({success:true, openNextDoc: false});
        }
        
        //SSOUtil.loading('hide');
        //_dfd.resolve({success:true});
        return _dfd.promise();
    } // EOF _endMainPageSubmit

    // 2021.4.20 - 1080768 Eric, merge原內政部客製化功能: 2018.7.4 - 1070655, 送一層決行時檢核是否有未完成的會辦(順/分會)流程
    function _checkUnfinishedCoworkFlow(_docObj, _nextTarget) {
        // 是否為一層決行單位?
        function _isArrpoveUnit(OUId) {
            if (typeof OUId != 'string') {
				OUId = '';
            }
            
            OUId = (OUId.length>sso_const.FIRSTCLASS_UNITNO_LEN)?OUId.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN):OUId;
            if (OUId.length) {
				//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
                // let nOUId = parseInt(OUId, 10);
                // if (!isNaN(nOUId) && (nOUId>=sso_const.APPROVEUNIT_NUM)) {
                if (OUId>=sso_const.APPROVEUNIT_NUM) {
                    return true;
                }
			}
			return false;
        }

        // 判定是否為會辦流程
        function _isCoworker(sICOUId, sOUId) {
            // 會辦(不同一級單位)
            let sICOUId_Lv1 = (sICOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? sICOUId.substr(0,sso_const.FIRSTCLASS_UNITNO_LEN) : sICOUId;
            let sOUId_Lv1 = (sOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? sOUId.substr(0,sso_const.FIRSTCLASS_UNITNO_LEN) : sOUId;
			//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
            // let OUNum = parseInt(sOUId_Lv1, 10);
            // if (sOUId_Lv1!=sICOUId_Lv1 && (OUNum<sso_const.VIRTUALUNIT_NUM)) { // 單位碼90以上不為會辦單位!
            if (sOUId_Lv1!=sICOUId_Lv1 && (sOUId_Lv1<sso_const.VIRTUALUNIT_NUM)) { // 單位碼90以上不為會辦單位!
                return true;
            }
            return false;
        }

        function _isUnfinishedCoworkFlow(_wwkfItem, _ICOUId) {
            //  RADIO_SELECTED_1 => '2':順會, '3':分會, '4':後會
            let toOUId = _wwkfItem.OWN_OU_ID;
            if (toOUId.length===0 && _wwkfItem.RADIO_SELECTED_1=='3' && _wwkfItem.COWORK_OPTIONS.length) {
                // 分會流程
                return SSOUtil.isValueFalse(_wwkfItem.SIGN_F);
            }
            else {
                if (SSOUtil.isValueFalse(_wwkfItem.SIGN_F) && _wwkfItem.RADIO_SELECTED_1=='2' && _isCoworker(_ICOUId, toOUId)) {
                    return true;
                }
            }
            return false;
        }

        function _getCoworkUnitName(_wwkfItem) {
            let ownOUName = _wwkfItem.OWN_OU_NAME; // 順會->單一單位名稱, 分會->[會辦單位1];[會辦單位2];[會辦單位3];...;[會辦單位n];
            return ownOUName;
        }
		
		//1130130	Leslie[1120330]	修正當要傳送至一層決行，而預排流程中仍有未完成的會辦流程時則強制送會辦，調整傳送流程(先檢核再儲存)
		let sVal = theSSO.User.EnvSettings.get('CHECK_UNFINISHED_COWORK_FLOW');
		if (!SSOUtil.isValueTrue(sVal)){
			let _dfdInner = $.Deferred();
			_dfdInner.resolve({success:true})
			return _dfdInner.promise();
		}		

        let _dfd = $.Deferred();
        let toOUId = _nextTarget.OUId;
        let toApproveUnit = _isArrpoveUnit(toOUId);
		//1130408	Leslie[問題彙整序64]	一層決行單位的傳送，則不再檢核
		let ownApproveUnit = _isArrpoveUnit(theAOL.docObj.ownOUId);
        // if (toApproveUnit) {
        if (toApproveUnit && !ownApproveUnit) {
            let odwwkf = _docObj.getODWWKF();
            if (typeof odwwkf=='undefined' || odwwkf===null) {
                _docObj.initODWWKF();
                odwwkf = _docObj.getODWWKF();
                if (odwwkf===null) {
                    theLogger.log('-I- _checkUnfinishedCoworkFlow() 無法取得公文ODWWKF內容.');
                    _dfd.reject({success:false, errMsg:' 無法取得公文ODWWKF內容.'});
                    return _dfd.promise();
                }
            }

            // 沒有預排流程, 
            if (odwwkf.length===0) {
                _dfd.resolve({success:true});
                return _dfd.promise();
            }
            
            // 檢核是否有未完成的順會或分會項目!
            let i = -1, cntFlow = odwwkf.length;
            let coworkWWKFItem = [];
            let sUnitName = '';
            for(i=(cntFlow-1); i>=0; i--) {
                let wwkfItem = odwwkf[i];
                if (typeof wwkfItem=='undefined' || wwkfItem===null) continue;

                // 由後面項目開始比對, 若出現已完成項目, 則不再檢核前面的!
                if (wwkfItem.SIGN_F=='Y') {
                    break;
                }

                if (_isUnfinishedCoworkFlow(wwkfItem, _docObj.ICOUId)) {
					//1130503	Leslie[問題彙整表 序99]	修正因逆向檢核造成的傳送對象錯序
                    // coworkWWKFItem.push(wwkfItem);
                    coworkWWKFItem.unshift(wwkfItem);
                    if (sUnitName.length===0) {
                        sUnitName = _getCoworkUnitName(wwkfItem);
                    }
                    else {
						//1130503	Leslie[問題彙整表 序99]	修正因逆向檢核造成的傳送對象錯序
                        // sUnitName += (', ' + _getCoworkUnitName(wwkfItem));
                        sUnitName = _getCoworkUnitName(wwkfItem) + ', ' + sUnitName;
                    }
                    continue;
                }
            }

            if (coworkWWKFItem!=null && coworkWWKFItem.length) {				
				//1130130	Leslie[1120330]	修正當要傳送至一層決行，而預排流程中仍有未完成的會辦流程時，則強制送會辦或中斷傳送(依有無可用異動別)
				for(var _wwkf of coworkWWKFItem){
					var newTarget = { TxName: _wwkf.TX_NAME, OUId: _wwkf.OWN_OU_ID, RoleId: _wwkf.OWN_ROLE_ID, UserId: _wwkf.OWN_USER_ID, OUName: _wwkf.OWN_OU_NAME, RoleName: _wwkf.OWN_ROLE_NAME, UserName: _wwkf.OWN_USER_NAME };
					
					var transTargetIndex = [];
					transTargetIndex = WorkFlowUtil.getNextIndexs(newTarget, _docObj.nextOptions);
					
					var newTransTarget = WorkFlowUtil.getNewTarget(transTargetIndex, _docObj.nextOptions);
					if (!!newTransTarget) {
						var txNameBefore = _docObj.txName;
						
						if(( (newTransTarget.TxName??"") == "" || (newTransTarget.OUId??"") == "") && newTransTarget.TxName != '分會')
							continue;
						
						theAOL.nextTarget.TxName = newTransTarget.TxName??'';
						theAOL.nextTarget.OUId = newTransTarget.OUId??'';
						theAOL.nextTarget.RoleId = newTransTarget.RoleId??'';
						theAOL.nextTarget.UserId = newTransTarget.UserId??'';
						theAOL.nextTarget.OUName = newTransTarget.Unit??'';
						theAOL.nextTarget.RoleName = newTransTarget.RoleName??'';
						theAOL.nextTarget.UserName = newTransTarget.UserName??'';
						
						theAOL.nextTarget.approved = (_docObj.get('ODWMSG', 'APP_USER_ID').length || _docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
						theAOL.nextTarget.rejected = false;
						if (!theAOL.nextTarget.approved) {
							theAOL.nextTarget.rejected = _docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
						}
						
						_changeTransTarget(theAOL.nextTarget, _docObj, transTargetIndex);
						var txNameAfter = _docObj.txName;
						if (txNameBefore!==txNameAfter) {
							fnODC011ChangeRemark(); // 2016.10.6 - 異動別改變後叫用此函式! (系統部要求)
						}
						alert(`公文尚有未執行之會辦流程：${sUnitName}，系統將自動傳送該會辦流程。`);

						_dfd.resolve({success:true});
						
						//1130408	Leslie[問題彙整序64]	只需要跳一次訊息
						return _dfd.promise();
					}
				}
				
                // _dfd.reject({success:false, errMsg:'\n公文尚有未執行之會辦流程:' + sUnitName + '，請調整傳送選項或修正預排流程.'});
                _dfd.reject({success:false, errMsg:'\n公文尚有未執行之會辦流程:' + sUnitName + '，請退回承辦單位或修正預排流程.'});
				//1130130	Leslie[1120330]	修正當要傳送至一層決行，而預排流程中仍有未完成的會辦流程時，則強制送會辦或中斷傳送(依有無可用異動別)
            }
            else {
                _dfd.resolve({success:true});
            }
        }
        else {
            _dfd.resolve({success:true});
        }
        return _dfd.promise();
    }

    function _submitDocProcess(_theAOL) {
        // if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
        //     var _theDocNo = _theAOL.docObj.docNo;
        //     var _theMsgId = _theAOL.docObj.msgId;
        //     theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- DocSubmitUtil.submitDocProcess(DocNo="' +_theDocNo+ '", MsgId="'+ _theMsgId + '") BEGIN...');
        //     window.tmBeginSubmit = Date.now();
        //     window.tmBeginSubmitAndOpenNext = Date.now();
        //     window.tmBeginSubmitAndOpenNext2 = Date.now();
        // }

        /* BEGIN of _submitDocProcess */
        theLogger.log("-I- 公文Submit作業開始... [BOF _submitDocProcess]");

        // 2021.09.16 - 1090862 dev test
        if (localStorage.dev_ConfirmSubmit) {
            let checkRslt = _checkDocIssueStatus_PreSubmit(_theAOL, false);
            theLogger.log('-I- _checkDocIssueStatus_PreSubmit() rslt=' + checkRslt);
            if (checkRslt!=true) {
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
                return;
            }
        }
       
        var _docObj = _theAOL.docObj;
        var _ruleOption = _theAOL.nextTarget.ruleOption;
        
        /* 2013.9 - 儲存ODWMSG.XML
         * a. 先將相關欄位設定存回ODWMSG
         * b. 轉換為XMLDocument
         * c. 回存server ODWMSG.XML檔
         */
        //var serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
        
        // 取得是否Server加簽之設定
        var fServerSign = false;
        
        var sPincode = '';
        var sSubmitSign = theSSO.User.EnvSettings.get('II_SUBMIT_SIGN');
        var fSubmitSign = true;
        if (sSubmitSign==='N' || sSubmitSign==='n' || sSubmitSign=='0'|| _docObj.signType=='P') {
            fSubmitSign = false;
        }
        
        /* 2015.1 - Eric Peng, 支援使用軟體正式憑證加簽(@iOS簽章App)
         * 2014.9 - 現階段實作, Server加簽必定使用臨時憑證!
         */
        var dfd = null;
        var orgNo = _docObj.sourceOrgNo;
        var account = theSSO.User.account;
        var SAMLart = localStorage.Artifact;

        /* 2019.7 - Eric, ToDo: 確認未使用?
        var isDraft = _docObj.isDraft;
        var _ruleErrItem = [];
        var _ruleErrStr = '';
        */
        var updateEnve = true, aolSubmitStatus = null;
        var cntDraft = 0;
        var hasDraft=false, draftType=0; // 2017.9.8 - 1060685 來文簽辦判定是否有來文文稿
        var _clientSignMode = SSO_CONFIG.getClientSignMode();
        
        if (_docObj.signType=='P') {
            //==>紙本公文傳送
            
            /* 紙本公文傳送加簽程序:
            * 1. [草稿]檢核是否已有同文號公文
            * 2. theAOL.getCurrFolio.save()
            * 3. _checkSuitable_PreSubmit
            * 3. 上傳DocInfo (ODWMSG/ODWDCM/ODWWKF/ODWCRQ.XML)
            * 4. ODMSSP.SaveMsg
            * 5. [草稿]newMsg, 搬移電子檔至公文儲存區, 異動ODMWSG並上傳基資檔
            * 5. submit msg!
            */
            _checkDocDuplicate(SAMLart, _docObj)
            .then(function(rslt) {
                if (typeof rslt.success!=='undefined' && rslt.success===true) {
                    if (typeof rslt.existDoc!=='undefined' && rslt.existDoc===true) {
                       let _dfd = $.Deferred();
                       _dfd.reject({success:false, _showError: true, _errMsg:'[' + _docObj.docNo + ']公文文號已存在於伺服器上，此份公文目前已傳送，請刪除之！'}); // 2017.5.26 - Eric, 1060327
                       return _dfd.promise();
                    }
                }
                
                theLogger.debug('-I- 即將叫用_doPDocSignSubmit...');
                return _doPDocSubmit(_theAOL, SAMLart, _docObj, _ruleOption);
            })
            .then(function(p) {
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
            })
            .fail(function(failRslt){
                theLogger.warn(failRslt._errMsg);
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
                if ((typeof failRslt._showError!=='undefined') && failRslt._showError && !!failRslt._errMsg) {
                    alert(failRslt._errMsg);
                    failRslt._showError = false;
                }
            });
            return;
        }
        else if (_clientSignMode=='NONE' || fSubmitSign===false) { // 依SSO_CONFIG.enableClientSign及目前裝置是否安裝憑證，決定是否為Server加簽!
            SSOUtil.loading('hide');
            
            /* 2015.6 - Quick-fix (暫行方案), 若只有來文, 不加簽! */
            updateEnve = true;
            cntDraft = _theAOL.getCurrFolio().getSignFolder().getDraftCounts();
            let cntDraftAll = cntDraft;

            // hasDraft = (cntDraft>0)?true:false;    
            // 2017.9.11 - 1060865, 區分唯一的文稿是來文或來文文稿
            draftType = 0;
            if(theAOL.getCurrFolio().getSignFolder().hasFromDoc())
                --cntDraft; // 有來文, 文稿數減一
            hasDraft = (cntDraft>0)?true:false;    
            if (cntDraft===0) {
                // 2017.8.23 - 1060725
                
                // 2016.11.25 - 承辦公文傳送, 應有文稿 */
                var rsltDocInchageQuery = {
                    docIncharge: false,
                    submitTx: false
                };
                rslt = _getInchargSubmitInfo();
                if (typeof rsltDocInchageQuery!=='object' || rsltDocInchageQuery===null) {
                    theLogger.log('判定公文承辦傳送狀態作業異常!');
                    alert('判定公文承辦傳送狀態作業異常!');
                    SSOUtil.toggleFuncButton(0x3, true);
                    return;
                }
                
                /* 2017.9.8 - 1060865 判斷第一個文稿是否為來文簽辦, 若是, 則須異動封裝檔! */
                if (cntDraftAll>0) {
                    draftType = _theAOL.getCurrFolio().isFromDoc(0);
                }

                if (draftType==1) { // 回傳1:電子來文, 2:來文簽辦, 0:一般文稿
                    /* 2016.2 - 確認來文或其附件上是否有簽核物件,若有, 則須執行封裝作業, 產出來文文稿 */
                    if (!SSOUtil.shouldCreateRcvDocDraft(_theAOL)) {
                        if (rsltDocInchageQuery!==null && !!rsltDocInchageQuery.docIncharge && !!rsltDocInchageQuery.submitTx) {
                            theLogger.log('承辦傳送時公文沒有任何文稿且來文頁面沒有簽核物件!');
                            alert('承辦傳送須加入文稿, 請加入後重試!');
                            SSOUtil.toggleFuncButton(0x3, true);
                            return;
                        }
                        updateEnve = false;
                    }
                }
                else { // 2020.7.14 -  (CDC回報) Eric, ToDo: 1. 送銷號, 毋須封裝, 2. 其它:沒有任何文稿, 應中止傳送!?
                }
            }
            
            if (updateEnve) {
                aolSubmitStatus = _getAOLSubmitStatus(theAOL, _docObj);
                if (aolSubmitStatus===null) {
                    theLogger.log('無法取得公文傳送參數![_getAOLSubmitStatus()]');
                    alert('無法正確取得公文傳送參數，故無法傳送公文!');
                    SSOUtil.toggleFuncButton(0x3, true);
                    return;
                }
                
                if (!aolSubmitStatus.updateEnvelope) {
                    updateEnve = false;
                }
                else if (aolSubmitStatus.inchargeSendBack) {
                    updateEnve = false;
                }
                else if (!aolSubmitStatus.docModified && aolSubmitStatus.atNotSignList) {
                    updateEnve = false;
                }
            }
            
			// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能，一併調整行動版軟體憑證邏輯
			var usage = 2;	//先檢查正式憑證
            // var usage = 3; // 2016.1.27 - 3:軟體憑證為臨時憑證, 2:軟體憑證為正式憑證
            // var serverSignMode = theSSO.User.SystemSets.II_SIGN_MODE; // Server上的加簽pfx為臨時(3,預設)或正式(2)憑證, 行動簽核使用!
            // if (typeof serverSignMode=='string' && serverSignMode==='2') {
                // usage = 2;
                // theLogger.log('-I- 軟體憑證為正式憑證! II_SIGN_MODE=\'' + serverSignMode + '\'');
            // }
                
            /* 2016.1.27 - 支援軟體憑證為正式憑證模式.
             * 2015.2-先確認有鏈結的軟體臨時憑證!
             */
            var certType = '軟體臨時憑證';
            if (updateEnve && fSubmitSign) {
				// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能，一併調整行動版軟體憑證邏輯
                /*if (!_existLinkedSoftCert(usage)) {
                    if (usage==2) {
                        certType = '軟體正式憑證';
                    }
                    theLogger.log('此帳號沒有已鏈結的[' + certType + ']，無法傳送公文(無法加簽)!');
                    alert('此帳號沒有已鏈結的[' + certType + ']，無法傳送公文(無法加簽)!');
                    return false;
                }
                else { // 2017.2.22 - bug-fix
                    if (usage==2) { 
                        certType = '軟體正式憑證';
                    }
                }*/
				if (!_existLinkedSoftCert(usage)){
					usage = 3;	//找不到正式憑證，再找臨時憑證
					if (!_existLinkedSoftCert(usage)){
						theLogger.log('此帳號沒有已鏈結的軟體憑證(正式/臨時)，無法傳送公文(無法加簽)!');
						alert('此帳號沒有已鏈結的軟體憑證(正式/臨時)，無法傳送公文(無法加簽)!');
						return false;
					}
				}
				else
					certType = '軟體正式憑證';
            }
            
            fServerSign = true;
            
            let tmBeginGetPIN, tmBeginUpdateEnve, tmBeginDraftProc; // time tracking...
            tmBeginGetPIN = 0;  window.tmGetPIN = 0; window.tmAfterGetPIN = 0;

            let _prm = null;
            // 取得Pincode
            // 2022.2.17 - 1110020 Eric, 毋須封裝則毋須輸入Pincode (add 'updateEnve' check)
            if (fSubmitSign && updateEnve) {
                if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    let _log = SSOUtil.dev_getTimeElapseStr('取Pincode前作業', window.tmBeginSubmit);
                    theLogger.time(_log);
                    theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- _getPincode() BEGIN...');
                    tmBeginGetPIN = Date.now();
                    window.tmGetPIN = 0;
                }
                _prm = _getPincode(theAOL, (certType=='軟體正式憑證'?'formalCert':'tempCert'), true);
            }
            else {
                let dfd = $.Deferred();
				//1080118 Kevin 1080049 修正Client Server Empty Password
                dfd.resolve({rslt: 'skip', password: theSSO.Artifact});
                _prm = dfd.promise();
            }

            _prm.then(function(obj) {
                var sTmpCert = 'Y';
                var serverPath = '', sErrMsg='';
                let _dfdIn = $.Deferred();
                if ((obj.rslt==='ok' && (obj.password.length>0)) ||
                    obj.rslt=='skip') {

                    if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                        if (tmBeginGetPIN) {
                            window.tmGetPIN = Date.now() - tmBeginGetPIN;
                        }
                        let _log = SSOUtil.dev_getTimeElapseStr('_getPincode()', tmBeginGetPIN);
                        theLogger.time(_log);
                        window.tmAfterGetPIN = Date.now();
                    }

                    // 2019.2.19 - Eric, 只有obj.rlst=='ok'時才記錄Pincode
                    if (obj.rslt==='ok') {
                        sPincode = obj.password;
                    }
                    
                    theLogger.debug('-I- 已取得軟體憑證金鑰密碼...');
                    SSOUtil.loading('show', { text:'公文傳送作業中', textVisible:true });
                    
                    // 2022.2.17 - 1110020 Eric, 有異動封裝檔再設定使用臨時憑證! (add 'updateEnve' check)
                    if (usage===3 && fSubmitSign && updateEnve) {
                        _docObj.set('aol', 'ODWMSG', [{fieldname:'TMP_CER', value:'Y'}]);
                    }
                    else {
                        _docObj.set('aol', 'ODWMSG', [{fieldname:'TMP_CER', value:'N'}]);
                    }
                    
                    if (updateEnve) {
                        /* 2016.1.27 - 判定軟體憑證是否為臨時憑證, 依設定叫用SetTodoListTmpCerState */
                        sTmpCert = 'Y';
                        if ((usage!==3) || !fSubmitSign) { // 2016.9.21 - 不加簽時不為臨時憑證!
                            sTmpCert = 'N';
                        }
                        
                        let _prmUpdateDocInfo=null;
                        if (sTmpCert=='Y') { // 2017.2.22 - Eric, 若使用臨時憑證,須更新ODWMSG.TMP_CER並重新上傳ODWMSG.XML
                            serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
                            
                            _uploadDocInfo(_docObj, serverPath)
                            .done(function() {
                                _dfdIn.resolve({success:true})
                            })
                            .fail(function(errRslt) {
                                sErrMsg = '更新ODWMSG.TMP_CER欄位, 叫用_uploadDocInfo()時發生錯誤!';
                                theLogger.error('Error! ' + sErrMsg);
                                _dfdIn.reject({success:false, _errMsg:sErrMsg});
                            });
                        }
                        else {
                            _dfdIn.resolve({success:true});
                        }   
                    }
                    else {
                        _dfdIn.resolve({success:true});
                    }
                }
                else {
                    theLogger.log('-I- User cancel submit process [input pincode]');
                    _dfdIn.reject({success:false, _showError:false, _errMsg:'使用者取消作業!'});
                }
                return _dfdIn.promise();
            })
            .then(function() {
                return _checkDocDuplicate(SAMLart, _docObj);
            })
            .then(function(rslt) {
                // 2017.5.26, Eric Peng - 1060327
                if (typeof rslt.success!=='undefined' && rslt.success===true) {
                    if (typeof rslt.existDoc!=='undefined' && rslt.existDoc===true) {
                        let _dfd = $.Deferred();
                        _dfd.reject({success:false, _showError: true, _errMsg:'[' + _docObj.docNo + ']公文文號已存在於伺服器上，此份公文目前已傳送，請刪除之！'}); // 2017.5.26 - Eric, 1060327
                        return _dfd.promise();
                    }
                }

                theLogger.debug('-I- 即將叫用_doServerSignSubmit...');

                // 2019.7 - 1080654 Eric, 支援非同步機制修改!
                // 2017.2.7 - 若usage=2, 則server上的軟體憑證為正式憑證!
                return _doServerSignSubmit(_theAOL, SAMLart, sPincode, _docObj, _ruleOption, updateEnve, fSubmitSign, aolSubmitStatus);
            })
            .then(function(rslt) {
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
            })
            .fail(function(rslt) {
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
                theLogger.log('Error! invoke _getPincode() failed.');
            });
            return;
        }
        else {
            /*設定為Client加簽, 且須加簽 */
            
            /* 2015.6 - Quick-fix (暫行方案), 若只有來文, 不加簽! */
            updateEnve = true;
            cntDraft = _theAOL.getCurrFolio().getSignFolder().getDraftCounts();
            let cntDraftAll = cntDraft;

            // 2017.9.8 - 1060865, 區別唯一一份文稿是來文或來文文稿
            //hasDraft = (cntDraft>0)?true:false;
            draftType = 0;
            if(theAOL.getCurrFolio().getSignFolder().hasFromDoc())
                --cntDraft; // 有來文, 文稿數減一
            hasDraft = (cntDraft>0)?true:false;
            if (cntDraft===0) {
                /* 2016.2 - 確認來文或其附件上是否有簽核物件,若有, 則須執行封裝作業, 產出來文文稿 */
                //if (!SSOUtil.shouldCreateRcvDocDraft(_theAOL)) {
                //   updateEnve = false;
                //}

                // 2017.8.23 - 1060725 承辦公文傳送, 應有文稿 */
                var rsltDocInchageQuery = {
                    docIncharge: false,
                    submitTx: false
                };

                rsltDocInchageQuery = _getInchargSubmitInfo(_docObj);
                if (typeof rsltDocInchageQuery!=='object' || rsltDocInchageQuery===null) {
                    theLogger.log('判定公文承辦傳送狀態作業異常!');
                    alert('判定公文承辦傳送狀態作業異常!');

                    // 2017.8.24 - Eric, bug-fix
                    SSOUtil.loading('hide'); 
                    SSOUtil.toggleFuncButton(0x3, true);
                    return;
                }
                
                /* 2017.9.8 - 1060865 判斷第一個文稿是否為來文簽辦, 若是, 則須異動封裝檔! */
                if (cntDraftAll>0) {
                    draftType = theAOL.getCurrFolio().isFromDoc(0);
                }

                if (draftType==1) {
                    /* 2016.2 - 確認來文或其附件上是否有簽核物件,若有, 則須執行封裝作業, 產出來文文稿 */
                    if (!SSOUtil.shouldCreateRcvDocDraft(_theAOL)) {
                        if (rsltDocInchageQuery!==null && !!rsltDocInchageQuery.docIncharge && !!rsltDocInchageQuery.submitTx) {
                            theLogger.log('承辦傳送時公文沒有任何文稿且來文頁面沒有簽核物件!');
                            alert('承辦傳送須加入文稿, 請加入後重試!');
                            
                            // 2017.8.24 - Eric, bug-fix
                            SSOUtil.loading('hide'); 
                            SSOUtil.toggleFuncButton(0x3, true);
                            return;
                        }
                        updateEnve = false;
                    }
                }
            }
            
            if (updateEnve) {
                aolSubmitStatus = _getAOLSubmitStatus(theAOL, _docObj);
                if (aolSubmitStatus===null) {
                    theLogger.log('無法取得公文傳送參數![_getAOLSubmitStatus()]');
                    alert('無法正確取得公文傳送參數，故無法傳送公文!');

                    // 2017.8.24 - Eric, bug-fix
                    SSOUtil.loading('hide'); 
                    SSOUtil.toggleFuncButton(0x3, true);
                    return;
                }
                
                if (!aolSubmitStatus.updateEnvelope) {
                    updateEnve = false;
                }
                else if (aolSubmitStatus.inchargeSendBack) {
                    updateEnve = false;
                }
                else if (!aolSubmitStatus.docModified && aolSubmitStatus.atNotSignList) {
                    updateEnve = false;
                }
            }
            
            // 2017.2.21 - 傳送前將TMP_CER設為"N" (預防重複傳送時,此欄位資料異常!)
            _docObj.set2('aol', 'ODWMSG', {'TMP_CER':'N'});
            _docObj.tmpCert = 'N';
            let _tmBefore = 0;
            if (_clientSignMode=='SCard') {
                //==>公文傳送採 SmartCard 簽章 (PC)
                _checkDocDuplicate(SAMLart, _docObj)
                .then(function(rslt) { // 2017.1.17 - 檢核目前元件是否支援hash值加簽
                    // 2017.5.26, Eric Peng - 1060327
                    if (typeof rslt.success!=='undefined' && rslt.success===true) {
                        if (typeof rslt.existDoc!=='undefined' && rslt.existDoc===true) {
                           let _dfd = $.Deferred();
                           _dfd.reject({success:false, _showError: true, _errMsg:'[' + _docObj.docNo + ']公文文號已存在於伺服器上，此份公文目前已傳送，請刪除之！'}); // 2017.5.26 - Eric, 1060327
                           return _dfd.promise();
                        }
                    }
                    var sc = new SmartCard();
					
					//1130919	Leslie[序215]	依會議結論，增加於不更新封裝的傳送行為下，略過簽章元件的模組驗證
					if(!updateEnve){
						let _dfd = $.Deferred();
                        _dfd.resolve({success:true, SCModuleInfo: "傳送不封裝，略過簽章元件驗證"});
                        return _dfd.promise();
					}

                    // 2019.7 - 1080654 Eric, save SCardModuleInfo
                    if (typeof theSSO.MP.SCardModuleInfo=='undefined' || theSSO.MP.SCardModuleInfo===null) {
                        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- SCard.getSCardModuleInfo() BEGIN...');
                            _tmBefore = Date.now();
                        }

                        // 2020.12.25 - 1090689 Eric, 檢核跨平台網頁元件版本
                        //return sc.getSCardModuleInfo();
                        let _dfdGetSC = $.Deferred();
                        sc.getSCardModuleInfo()
                        .done(function(rslt) {
                            _dfdGetSC.resolve(rslt);
                        })
                        .fail(function(errRslt){
                            _dfdGetSC.reject($.extend({_showError: true}, errRslt, true));
                        });
                        return _dfdGetSC.promise();
                    }
                    else {
                        let _dfd = $.Deferred();
                        _dfd.resolve({success:true, SCModuleInfo: theSSO.MP.SCardModuleInfo});
                        return _dfd.promise();
                    }
                })
                .then(function(rslt) {
                    if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                        let _log = SSOUtil.dev_getTimeElapseStr('SCard.getSCardModuleInfo() DONE!', _tmBefore);
                        theLogger.time(_log);
                        _tmBefore = 0;
                    }

                    let _dfd = $.Deferred();
 
                    // 2017.1.17 - 檢核[跨平台簽章元件]版本資訊, 須為V1.3.4.102700版以後才支援使用hash值簽章
                    var supportHashSign = false;
                    //var verSegment;
                    // var verRequired = ['1', '3', '4', '1027'];
                    if (typeof rslt.SCModuleInfo=='object' && typeof rslt.SCModuleInfo.serverVersion=='string' && rslt.SCModuleInfo.serverVersion.length) {
                        // 2021.4.19 - Eric, bug-fix, 符合資安通報要求的版本皆支援HashSign, 故此處毋須再檢核!
                        //verSegment = rslt.SCModuleInfo.serverVersion.split('.');
                        //if (verSegment.length>=4 && verSegment[0]>=verRequired[0] &&
                        //    verSegment[1]>=verRequired[1] && verSegment[2]>=verRequired[2] && verSegment[3]>=verRequired[3]) {
                            supportHashSign = true;
                        //}

                        // 2019.7 - 1080654 Eric, cache SCardModuleInfo
                        if ('submitOptions' in theSSO.MP && 'cacheSCardInfo' in theSSO.MP.submitOptions && theSSO.MP.submitOptions.cacheSCardInfo===true &&
                            (typeof theSSO.MP.SCardModuleInfo=='undefined' || theSSO.MP.SCardModuleInfo===null)) {
                            theSSO.MP.SCardModuleInfo = rslt.SCModuleInfo;
                        }
                    }
                    
					//2017.1.20 - updateEnve==false時, aolSubmitStatus未定義!
					if (typeof aolSubmitStatus=='object' && aolSubmitStatus!==null) {
						aolSubmitStatus.supportHashSign = false;
						if (supportHashSign) {
						   aolSubmitStatus.supportHashSign = true;
						}
                    }
					
                    fServerSign = false;
                    
                    /* 非cleint SmartCard簽章,公文傳送加簽程序:
                     * 叫用_doClientSignSubmit
                     *    1. 上傳DocInfo (ODWMSG/ODWDCM/ODWWKF/ODWCRQ.XML)
                     *    2. theAOL.getCurrFolio.save()
                     *    3. ODMSSP.SaveMsg
                     *    4. 依憑證檢核結果決定是否使用臨時憑證簽章(_docObj.tmpCert=Y|N, ODMSSP.SetToDoListTmpCerState) [同步叫用!]
                     *    6. ODMSSP.updateEnvelope
                     *    7. signDoc using SmartCard
                     *    8. ODMSSP.signEnvelope
                     *    9. submit msg!
                     */
                    theLogger.debug('-I- 即將叫用_doClientSignSubmit...');
                    _doClientSignSubmit(_theAOL, SAMLart, _docObj, _clientSignMode, sPincode, updateEnve, fSubmitSign, aolSubmitStatus)
                    .done(function(){
                        _dfd.resolve({success:true});    
                    })
                    .fail(function(){
                        _dfd.reject({success:false, _errMsg:'Invoke _doClientSignSubmit failed.'});
                    });
                    return _dfd.promise();
                })
                .then(function() {
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                })
                .fail(function(failRslt_SCSign) {
                    if (!!failRslt_SCSign._errMsg) {
                        theLogger.warn(failRslt_SCSign._errMsg);
                    }
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                    if ((typeof failRslt_SCSign._showError!=='undefined') && failRslt_SCSign._showError && (typeof failRslt_SCSign._errMsg!=='undefined')) {
                        alert(failRslt_SCSign._errMsg);
                    }
                });
                return;
            }
            else {
                //==>公文傳送採 iOS App 簽章
                
                /* 2015.12.23 - 傳送前先清除相關全域物件 */
                if (!!theSSO.MP.queryCertDeferred) {
                    theSSO.MP.queryCertDeferred = null;
                }
                if (!!theSSO.MP.signDataDeferred) {
                    theSSO.MP.queryCertDeferred = null;
                }
                
                var iOSSubmitParam =  {
                    'updateEnve' : updateEnve,
                    serverSign : fServerSign,
                    clientSignMode: _clientSignMode,
                };
                
                _checkDocDuplicate(SAMLart, _docObj)
                .then(function(rslt) { // 2017.8.18 - Eric, bug-fix
                    // 2017.5.26, Eric Peng - 1060327
                    if (typeof rslt.success!=='undefined' && rslt.success===true) {
                        if (typeof rslt.existDoc!=='undefined' && rslt.existDoc===true) {
                           let _dfd = $.Deferred();
                           _dfd.reject({success:false, _showError: true, _errMsg:'[' + _docObj.docNo + ']公文文號已存在於伺服器上，此份公文目前已傳送，請刪除之！'}); // 2017.5.26 - Eric, 1060327
                           return _dfd.promise();
                        }
                    }
                    return _getInstalledCertInfo(orgNo, account);
                })
                .then(function(rslt) {
                    theSSO.MP.queryCertDeferred = null;
                    
                    let _dfd = $.Deferred();
					//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
                    // if (rslt.success===true && rslt.certExist===true) {
					if ((rslt.success===true && rslt.certExist===true) || rslt.mobileMoica === true) {
                        theLogger.log("Client憑證已安裝");
						
						//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
						if(rslt.mobileMoica === true){
							iOSSubmitParam.clientSignMode = 'mobileMoica';
							theLogger.log('使用者已登錄行動自然人憑證，仍由Server端驗證憑證。');
						}
						else{
							/* 2015.2 - Eric Peng, [Kevin]iOS簽章App申請之憑證不會在鏈結清單! */
							var _rsltVerify = _verifyCert_iOSApp(rslt.certInfo, orgNo);
							if (!_rsltVerify.valid) {
								_dfd.reject({success:false, errMsg:_rsltVerify.errMsg});
								return _dfd.promise();
							}
						}                        
						//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]	==END==
						
                        /* client端安裝憑證! -> 在client加簽
                         */
                        fServerSign = false;
                        
                        /* 非server簽章,公文傳送加簽程序:
                         * 1. 設定不使用臨時憑證簽章(ODMSSP.SetToDoListTmpCerState) [同步叫用!]
                         * 2. 上傳DocInfo
                         * 3. theAOL.getCurrFolio.save()
                         * 4. ODMSSP.SaveMsg
                         * 5. ODMSSP.updateEnvelope
                         * 6. iOS App.signDoc
                         * 7. ODMSSP.signEnvelope
                         * (time out!?)
                         */
                        _docObj.tmpCert = 'N';
                        
                        // 2016.12.1 - Eric, 草稿不叫用(for Kevin)
                        var _prm, _dfd_in = $.Deferred();
                        var sErrMsg='';
                        if (_docObj.tmpCert=='N') {
                            _dfd_in.resolve({success:true});
                            _prm = _dfd_in.promise();
                        }
                        else {
                            // 2017.2.22 - 若使用臨時憑證,須更新ODWMSG.TMP_CER並重新上傳ODWMSG.XML
                            var serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
                            _prm = _uploadDocInfo(_docObj, serverPath);
                        }
                        
                        _prm.then(function(rslt) {
                            theLogger.debug('-I- 即將叫用_doClientSignSubmit... [iOS DocSign app加簽]');
                            var sPincode = '';
                            //2017.1.20 - updateEnve==false時, aolSubmitStatus未定義!
							if (typeof aolSubmitStatus=='object' && aolSubmitStatus!==null) {
                                aolSubmitStatus.supportHashSign = true; // 2022.1.4 - 1101433, DocSign app支援傳入hash值加簽模式; 2017.1.19

                                // 2022.1.3 - 1101433 Eric, DocSign App 支援直接傳入SHA256/SHA1雜湊值執行簽章作業!
                                // if (window.location.href.indexOf('docvip.fdat.com.tw')!=-1 && window.iOS_device) {
                                //     let ans = confirm('行動平台使用Hash值為待簽內容?');
                                //     if (ans) {
                                //         rslt.supportHashSign = true;
                                //     }
                                //     else {
                                //         rslt.supportHashSign = false;
                                //     }
                                //     localStorage.dev_docSignSubmit = 'Y';
                                // }
                                //if (rslt.success===true && (typeof rslt.supportHashSign == 'boolean') && rslt.supportHashSign===true) {
                                //    aolSubmitStatus.supportHashSign = true;
                                //}
							}
                            return _doClientSignSubmit(_theAOL, SAMLart, _docObj, iOSSubmitParam.clientSignMode, sPincode, iOSSubmitParam.updateEnve, fSubmitSign, aolSubmitStatus);
                        })
                        .then(function(){
                            // process finished.
                            _dfd.resolve({success:true});
                            theSSO.MP.queryCertDeferred = null; // 2015.12.23
                        })
                        .fail(function(rslt){
                            _dfd.reject({success:false, errMsg:'Invoke _doClientSignSubmit failed.'});
                            theSSO.MP.queryCertDeferred = null; // 2015.12.23
                        });
                        return _dfd.promise();
                    }
                    else if (rslt.success===true && rslt.certExist===false) {
                        /* client端未安裝憑證! -> 在Server加簽  */
                        
                        theSSO.MP.queryCertDeferred = null; // 2015.12.23

                        /* 確認有軟體臨時憑證 */
                        var serverTmpCert = false;
                        if (updateEnve) {
							//1130812	Leslie[1130466]	一併修正未安裝App時，應指定取得臨時憑證(補傳入參數)
                            // serverTmpCert = _existLinkedSoftCert();
                            serverTmpCert = _existLinkedSoftCert(3);	//usage = 3，臨時憑證
                        }
                        else {
                            serverTmpCert = true;
                        }
                        
                        /* server sign process... */
                        iOSSubmitParam.fServerSign = true;
                        fServerSign = true;
                    
                        SSOUtil.loading('hide');
                
                        // 2019.7 - Eric, refactory!!!

                        // 取得Pincode
						//1110802	Leslie[1110567]	行動平台於不需加簽的流程，應無需取得PinCode
                        // let _prm = _getPincode(_theAOL, 'tempCert', true);
                        let _prm = _getPincode(_theAOL, 'tempCert', updateEnve);
                        _prm
                        .then(function(obj) {
                            let _dfdIn = $.Deferred();
                            if (obj.rslt!=='ok' || (obj.password.length==0)) {
                                _dfdIn.resject({success:false, errMsg:'使用者取消傳送作業!', _showError:false});
                                return _dfdIn.promise();
                            }
                            else {
                                sPincode = obj.password;
                                theLogger.debug('-I- 已取得軟體臨時憑證金鑰密碼...');
                                SSOUtil.loading('show', { text:'公文傳送作業中', textVisible:true });
                            
								//1110802	Leslie[1110567]	行動平台於不需加簽的流程，無需註記使用臨時憑證，移至更新封裝檔段落
                                // _docObj.set2('aol', 'ODWMSG', {'TMP_CER':'Y'});
                                // _docObj.tmpCert = 'Y';
                            
                                var rslt = null;
                                if (updateEnve) {
									//1110802	Leslie[1110567]	行動平台於不需加簽的流程，無需註記使用臨時憑證，移至更新封裝檔段落
									_docObj.set2('aol', 'ODWMSG', {'TMP_CER':'Y'});
									_docObj.tmpCert = 'Y';
									
                                    // 叫用 ODMSSP.SetTodoListTmpCerState設定使用臨時憑證!
                                    var setTmpDone = false;
                                    if (_docObj.tmpCert=='Y') {  // 2017.2.22 - Eric, 若使用臨時憑證,須更新ODWMSG.TMP_CER並重新上傳ODWMSG.XML
                                        var serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
                                        _uploadDocInfo(_docObj, serverPath)
                                        .done(function(){
                                            _dfdIn.resolve({success:true, pincode:sPincode});
                                        })
                                        .fail(function(errRslt){
                                            _dfdIn.reject(errRslt);
                                        });
                                    }
                                }
                                else {
                                    _dfdIn.resolve({success:true, pincode:sPincode});
                                }
                            }
                            return _dfdIn.promise(); 
                        })
                        .then(function(rslt) {
                            theLogger.debug('-I- 即將叫用_doServerSignSubmit...');
                            return _doServerSignSubmit(_theAOL, SAMLart, rslt.pincode, _docObj, _ruleOption, updateEnve, fSubmitSign, aolSubmitStatus);
                        })
                        .then(function(rslt) { // 2019.10.30 - 1080339 Eric, jQuery 3 upgrade + bug-fix
                            return _dfd.resolve(rslt);
                        })
                        .fail(function(rslt) {
                            // something wrong...
                            SSOUtil.loading('hide');
                            SSOUtil.toggleFuncButton(0x3, true);
                            theLogger.error('process _doServerSignSubmit() failed.');
                            _dfd.reject(rslt);
                        });
                        return _dfd.promise();
                    }
                    else {
                        // 叫用_getInstalledCertInfo, 未預期的回傳值內容!
                        _dfd.reject(rslt);
                        return _dfd.promise();
                    }
                })
                .then(function() {
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                    theSSO.MP.queryCertDeferred = null;
                })
                .fail(function(rslt) {
                    // 2017.5.26 - Eric Peng, 1060327
                    var errMsg = '';
                    if ('errMsg' in rslt) {
                        errMsg = rslt.errMsg;
                    }
                    else if ('_errMsg' in rslt) {
                        errMsg = rslt._errMsg;
                    }

                    theLogger.error(errMsg);
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                    
                    if (typeof errMsg=='string' && errMsg.length)
                        alert(errMsg);

                    theSSO.MP.queryCertDeferred = null; // 2015.12.23
                });   
                return;
            }
        }
    } /* END of _submitDocProcess() */
    
    /* submit doc process... (使用傳送子視窗)
       支援下列模式之作業:
       1. PC client, 使用智慧卡憑證加簽(正式/臨時憑證皆可!)
       2. PC client, 不加簽! (II_SUBMIT_SIGN='N')
       3. 紙本公文.
     */
    function _submitDocProcess_withSignPage_Step1(_theAOL) {
        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- _submitDocProcess_withSignPage_Step1() BEGIN...');
            window.tmBeginSubmit = Date.now();
        }

		/* BEGIN of _submitDocProcess_withSignPage_Step1 */
        theLogger.log("-I- 公文Submit作業開始... [BOF _submitDocProcess_withSignPage_Step1]");
        
        var _docObj = _theAOL.docObj;
        var _ruleOption = _theAOL.nextTarget.ruleOption;
        
        // 取得是否Server加簽之設定
        var fServerSign = false;
        let _dfdStep1 = $.Deferred();
        
        var sPincode = '';
        var sSubmitSign = theSSO.User.EnvSettings.get('II_SUBMIT_SIGN');
        var fSubmitSign = true;
        if (sSubmitSign==='N' || sSubmitSign==='n' || sSubmitSign=='0'|| _docObj.signType=='P') {
            fSubmitSign = false;
        }
        
        /* 2015.1 - Eric Peng, 支援使用軟體正式憑證加簽(@iOS簽章App)
         * 2014.9 - 現階段實作, Server加簽必定使用臨時憑證!
         */
        var dfd = null;
        //var orgNo = _docObj.sourceOrgNo;
        //var account = theSSO.User.account;
        var SAMLart = localStorage.Artifact;
    
        var updateEnve = true, aolSubmitStatus = null;
        var cntDraft = 0;
        var hasDraft=false, draftType=0; // 2017.9.8 - 1060685 來文簽辦判定是否有來文文稿
        var _clientSignMode = SSO_CONFIG.getClientSignMode();
        
        let _debugSubmit = (typeof window._debugSubmit=='boolean')?window._debugSubmit:false;
        if (_docObj.signType=='P') {
            //==>紙本公文傳送
            
            /* 非server簽章,公文傳送加簽程序:
            * 1. 設定不使用臨時憑證簽章(ODMSSP.SetToDoListTmpCerState) [同步叫用!]
            * 2. 上傳DocInfo (ODWMSG/ODWDCM/ODWWKF/ODWCRQ.XML)
            * 3. theAOL.getCurrFolio.save()
            * 4. ODMSSP.SaveMsg
            * 5. ODMSSP.updateEnvelope
            * 6. signDoc using SmartCard
            * 7. ODMSSP.signEnvelope
            * 8. submit msg!
            */
            _checkDocDuplicate(SAMLart, _docObj)
            .then(function(rslt) {
                var _dfd;
                if (typeof rslt.success!=='undefined' && rslt.success===true) {
                    if (typeof rslt.existDoc!=='undefined' && rslt.existDoc===true) {
                       _dfd = $.Deferred();
                       _dfd.reject({success:false, _showError: true, _errMsg:'[' + _docObj.docNo + ']公文文號已存在於伺服器上，此份公文目前已傳送，請刪除之！'}); // 2017.5.26 - Eric, 1060327
                       return _dfd.promise();
                    }
                }
                
                theLogger.debug('-I- 即將叫用_doPDocSignSubmit...');
                let _openNext = false;
                return _doPDocSubmit(_theAOL, SAMLart, _docObj, _ruleOption, _openNext);
            })
            .then(function(p) {
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
            })
            .fail(function(failRslt){
                theLogger.warn(failRslt._errMsg);
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
                if ((typeof failRslt._showError!=='undefined') && failRslt._showError && !!failRslt._errMsg) {
                    alert(failRslt._errMsg);
                    failRslt._showError = false;
                }
            });
        }
        else if (!_debugSubmit && (_clientSignMode=='NONE' || fSubmitSign===false)) { // 依SSO_CONFIG.enableClientSign及目前裝置是否安裝憑證，決定是否為Server加簽!
            SSOUtil.loading('hide');

            if (fSubmitSign==true) {
                alert('不支援server加簽模式!\n公文傳送作業函式:_submirDocProcess_withSignPage_Step1()');
                theLogger.error('ERROR! _submirDocProcess_withSignPage_Step1() 不支援server加簽模式!');
                _dfdStep1.reject({success:false, _errMsg:'_submirDocProcess_withSignPage_Step1() 不支援server加簽模式!'});
                return _dfdStep1.promise();
            }
            
            updateEnve = true;
            cntDraft = _theAOL.getCurrFolio().getSignFolder().getDraftCounts();
            let cntDraftAll = cntDraft;

            // 2017.9.11 - 1060865, 區分唯一的文稿是來文或來文文稿
            //hasDraft = (cntDraft>0)?true:false;// 2020.6.30 - Eric, 來文不算!
            draftType = 0;
            if (_theAOL.getCurrFolio().getSignFolder().hasFromDoc())
                --cntDraft; // 有來文, 文稿數減一
            
            // 2020.6.30 - Eric, 來文不算!
            hasDraft = (cntDraft>0)?true:false;
                
            if (cntDraft===0) {
                // 2017.8.23 - 1060725
                
                // 2016.11.25 - 承辦公文傳送, 應有文稿 */
                var rsltDocInchageQuery = {
                    docIncharge: false,
                    submitTx: false
                };
                rslt = _getInchargSubmitInfo();
                if (typeof rsltDocInchageQuery!=='object' || rsltDocInchageQuery===null) {
                    theLogger.log('判定公文承辦傳送狀態作業異常!');
                    alert('判定公文承辦傳送狀態作業異常!');
                    _dfdStep1.reject({success:false, _errMsg:'_submirDocProcess_withSignPage_Step1() 判定公文承辦傳送狀態作業異常!'});
                    return _dfdStep1.promise();
                }
                
                /* 2017.9.8 - 1060865 判斷第一個文稿是否為來文簽辦, 若是, 則須異動封裝檔! */
                if (cntDraftAll>0) {
                    draftType = _theAOL.getCurrFolio().isFromDoc(0);
                }

                if (draftType==1) { // 回傳1:電子來文, 2:來文簽辦, 0:一般文稿
                    /* 2016.2 - 確認來文或其附件上是否有簽核物件,若有, 則須執行封裝作業, 產出來文文稿 */
                    if (!SSOUtil.shouldCreateRcvDocDraft(_theAOL)) {
                        if (rsltDocInchageQuery!==null && !!rsltDocInchageQuery.docIncharge && !!rsltDocInchageQuery.submitTx) {
                            theLogger.log('承辦傳送時公文沒有任何文稿且來文頁面沒有簽核物件!');
                            alert('承辦傳送須加入文稿, 請加入後重試!');
                            _dfdStep1.reject({success:false, _errMsg:'_submirDocProcess_withSignPage_Step1() 承辦傳送時公文沒有任何文稿且來文頁面沒有簽核物件!'});
                            return _dfdStep1.promise();
                        }
                        updateEnve = false;
                    }
                }
            }
            
            if (updateEnve) {
                aolSubmitStatus = _getAOLSubmitStatus(_theAOL, _docObj);
                if (aolSubmitStatus===null) {
                    theLogger.log('無法取得公文傳送參數![_getAOLSubmitStatus()]');
                    alert('無法正確取得公文傳送參數，故無法傳送公文!');
                    _dfdStep1.reject({success:false, _errMsg:'_submirDocProcess_withSignPage_Step1() 無法正確取得公文傳送參數，故無法傳送公文!'});
                    return _dfdStep1.promise();
                }
                
                if (!aolSubmitStatus.updateEnvelope) {
                    updateEnve = false;
                }
                else if (aolSubmitStatus.inchargeSendBack) {
                    updateEnve = false;
                }
                else if (!aolSubmitStatus.docModified && aolSubmitStatus.atNotSignList) {
                    updateEnve = false;
                }
            }
            
			// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能，一併調整行動版軟體憑證邏輯
            var usage = 3; // 2:軟體憑證為正式憑證，先抓這個
            /*var usage = 3; // 2016.1.27 - 3:軟體憑證為臨時憑證, 2:軟體憑證為正式憑證
            var serverSignMode = theSSO.User.SystemSets.II_SIGN_MODE; // Server上的加簽pfx為臨時(3,預設)或正式(2)憑證, 行動簽核使用!
            if (typeof serverSignMode=='string' && serverSignMode==='2') {
                usage = 2;
                theLogger.log('-I- 軟體憑證為正式憑證! II_SIGN_MODE=\'' + serverSignMode + '\'');
            }*/
                
            /* 2016.1.27 - 支援軟體憑證為正式憑證模式.
             * 2015.2-先確認有鏈結的軟體臨時憑證!
             */
            var certType = '軟體臨時憑證';
            if (updateEnve && fSubmitSign) {
				// 1130812	Leslie[1130466]	新增支援PC端軟體正式憑證功能，一併調整行動版軟體憑證邏輯
                /*if (!_existLinkedSoftCert(usage)) {
                    if (usage==2) {
                        certType = '軟體正式憑證';
                    }
                    theLogger.log('此帳號沒有已鏈結的[' + certType + ']，無法傳送公文(無法加簽)!');
                    alert('此帳號沒有已鏈結的[' + certType + ']，無法傳送公文(無法加簽)!');
                    _dfdStep1.reject({success:false, _errMsg:'_submirDocProcess_withSignPage_Step1() 此帳號沒有已鏈結的[' + certType + ']，無法傳送公文(無法加簽)!!'});
                    return _dfdStep1.promise();
                }
                else { // 2017.2.22 - bug-fix
                    if (usage==2) { 
                        certType = '軟體正式憑證';
                    }
                }*/
				if (!_existLinkedSoftCert(usage)){
					usage = 3;	//找不到正式憑證，再找臨時憑證
					if (!_existLinkedSoftCert(usage)){
						theLogger.log('此帳號沒有已鏈結的軟體憑證(正式/臨時)，無法傳送公文(無法加簽)!');
						alert('此帳號沒有已鏈結的軟體憑證(正式/臨時)，無法傳送公文(無法加簽)!');
						return false;
					}
				}
				else
					certType = '軟體正式憑證';
            }
            
            fServerSign = true;
            
            // 取得Pincode
            if (fSubmitSign) {
                dfd = _getPincode(_theAOL, (certType=='軟體正式憑證'?'formalCert':'tempCert'), true);
            }
            else {
                dfd = $.Deferred();
				//1080118 Kevin 1080049 修正Client Server Empty Password
				dfd.resolve({rslt: 'skip', password: theSSO.Artifact});
            }
            dfd.then(function(obj) {
                var _rslt = null;
                var sTmpCert = 'Y';
                var serverPath = '', sErrMsg='';
                if ((obj.rslt==='ok' && (obj.password.length>0)) ||
                    obj.rslt=='skip') {

                    // 2019.2.19 - Eric, 只有obj.rlst=='ok'時才記錄Pincode
                    if (obj.rslt==='ok') {
                        sPincode = obj.password;
                    }
                    
                    theLogger.debug('-I- 已取得軟體憑證金鑰密碼...');
                    SSOUtil.loading('show', { text:'公文傳送作業中', textVisible:true });
                    
                    if (usage===3 && fSubmitSign) {
                        _docObj.set('aol', 'ODWMSG', [{fieldname:'TMP_CER', value:'Y'}]);
                    }
                    else {
                        _docObj.set('aol', 'ODWMSG', [{fieldname:'TMP_CER', value:'N'}]);
                    }

                    let _prm = null;
                    let _dfdUpdateEnve = $.Deferred();
                    if (updateEnve) {
                        /* 2016.1.27 - 判定軟體憑證是否為臨時憑證, 依設定叫用SetTodoListTmpCerState */
                        sTmpCert = 'Y';
                        if ((usage!==3) || !fSubmitSign) { // 2016.9.21 - 不加簽時不為臨時憑證!
                            sTmpCert = 'N';
                        }
                        
                        var done = false;
                        if (sTmpCert=='Y') { // 2017.2.22 - Eric, 若使用臨時憑證,須更新ODWMSG.TMP_CER並重新上傳ODWMSG.XML
                            serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
                            _uploadDocInfo(_docObj, serverPath)
                            .done(function() {
                                _dfdUpdateEnve.resolve({success:true})
                            })
                            .fail(function() {
                                sErrMsg = '更新ODWMSG.TMP_CER欄位, 叫用_uploadDocInfo()時發生錯誤!';
                                theLogger.error('Error! ' + sErrMsg);
                                _dfdUpdateEnve.reject({success:false, _errMsg:sErrMsg});
                            });
                        }
                        else {
                            _dfdUpdateEnve.resolve({success:true})
                        }
                    }
                    else {
                        _dfdUpdateEnve.resolve({success:true})
                    }
                    _prm = _dfdUpdateEnve.promise();
                    
                    _prm
                    .then(function() {
                        return _checkDocDuplicate(SAMLart, _docObj)
                    })
                    .then(function(rslt) {
                        // 2017.5.26, Eric Peng - 1060327
                        if (typeof rslt.success!=='undefined' && rslt.success===true) {
                            if (typeof rslt.existDoc!=='undefined' && rslt.existDoc===true) {
                               let _dfd = $.Deferred();
                               _dfd.reject({success:false, _showError: true, _errMsg:'[' + _docObj.docNo + ']公文文號已存在於伺服器上，此份公文目前已傳送，請刪除之！'}); // 2017.5.26 - Eric, 1060327
                               return _dfd.promise();
                            }
                        }
                        theLogger.debug('-I- 即將叫用_doServerSignSubmit...');
                        // 2019.7 - Eric, 支援非同步機制修改!
                        // 2017.2.7 - 若usage=2, 則server上的軟體憑證為正式憑證!
                        return _doServerSignSubmit(_theAOL, SAMLart, sPincode, _docObj, _ruleOption, updateEnve, fSubmitSign, aolSubmitStatus);
                    })
                    .then(function(rslt) {     
                        _dfdStep1.resolve({success:true});
                    })
                    .fail(function(errRslt){
                        if ((typeof errRslt._showError!=='undefined') && errRslt._showError && !!errRslt._errMsg) {
                            alert(errRslt._errMsg);
                            errRslt._showError = false;
                        }
                
                        SSOUtil.loading('hide');
                        SSOUtil.toggleFuncButton(0x3, true);

                        _dfdStep1.reject(errRslt);
                    });
                }
                else {
                    theLogger.log('-I- User cancel submit process [input pincode]');
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                    _dfdStep1.reject({success:false, _showError:false, _errMsg: 'User cancel submit process [input pincode]'});
                }
            })
            .fail(function(rslt) {
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
                theLogger.log('Error! invoke _getPincode() failed.');
                _dfdStep1.reject($.extend({success:false}, rslt));
            });
            return _dfdStep1.promise();
        }
        else {
            /*設定為Client加簽, 且須加簽 */
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-I- _submitDocProcess_withSignPage_Step1() Client加簽且須加簽!');
            
            /* 2015.6 - Quick-fix (暫行方案), 若只有來文, 不加簽! */
            updateEnve = true;
            cntDraft = _theAOL.getCurrFolio().getSignFolder().getDraftCounts();
            let cntDraftAll = cntDraft;

            // 2017.9.8 - 1060865, 區別唯一一份文稿是來文或來文文稿
            //hasDraft = (cntDraft>0)?true:false;
            draftType = 0;
            if(_theAOL.getCurrFolio().getSignFolder().hasFromDoc())
                --cntDraft; // 有來文, 文稿數減一

            hasDraft = (cntDraft>0)?true:false;
            if (cntDraft===0) {
                /* 2016.2 - 確認來文或其附件上是否有簽核物件,若有, 則須執行封裝作業, 產出來文文稿 */
                //if (!SSOUtil.shouldCreateRcvDocDraft(_theAOL)) {
                //   updateEnve = false;
                //}

                // 2017.8.23 - 1060725 承辦公文傳送, 應有文稿 */
                var rsltDocInchageQuery = {
                    docIncharge: false,
                    submitTx: false
                };

                rsltDocInchageQuery = _getInchargSubmitInfo(_docObj);
                if (typeof rsltDocInchageQuery!=='object' || rsltDocInchageQuery===null) {
                    theLogger.log('判定公文承辦傳送狀態作業異常!');
                    alert('判定公文承辦傳送狀態作業異常!');

                    // 2017.8.24 - Eric, bug-fix
                    SSOUtil.loading('hide'); 
                    SSOUtil.toggleFuncButton(0x3, true);
                    _dfdStep1.resolve({success:false, _showError:false, _errMsg:'判定公文承辦傳送狀態作業異常!'});
                    return _dfdStep1.promise();
                }
                
                /* 2017.9.8 - 1060865 判斷第一個文稿是否為來文簽辦, 若是, 則須異動封裝檔! */
                if (cntDraftAll>0) {
                    draftType = _theAOL.getCurrFolio().isFromDoc(0);
                }

                if (draftType==1) {
                    /* 2016.2 - 確認來文或其附件上是否有簽核物件,若有, 則須執行封裝作業, 產出來文文稿 */
                    if (!SSOUtil.shouldCreateRcvDocDraft(_theAOL)) {
                        if (rsltDocInchageQuery!==null && !!rsltDocInchageQuery.docIncharge && !!rsltDocInchageQuery.submitTx) {
                            theLogger.log('承辦傳送時公文沒有任何文稿且來文頁面沒有簽核物件!');
                            alert('承辦傳送須加入文稿, 請加入後重試!');
                            
                            // 2017.8.24 - Eric, bug-fix
                            SSOUtil.loading('hide'); 
                            SSOUtil.toggleFuncButton(0x3, true);
                            _dfdStep1.resolve({success:false, _showError:false, _errMsg:'承辦傳送須加入文稿, 請加入後重試!'});
                            return _dfdStep1.promise();
                        }
                        updateEnve = false;
                    }
                }
            }
            
            if (updateEnve) {
                aolSubmitStatus = _getAOLSubmitStatus(_theAOL, _docObj);
                if (aolSubmitStatus===null) {
                    theLogger.log('無法取得公文傳送參數![_getAOLSubmitStatus()]');
                    alert('無法正確取得公文傳送參數，故無法傳送公文!');

                    // 2017.8.24 - Eric, bug-fix
                    SSOUtil.loading('hide'); 
                    SSOUtil.toggleFuncButton(0x3, true);
                    _dfdStep1.resolve({success:false, _showError:false, _errMsg:'無法正確取得公文傳送參數，故無法傳送公文!'});
                    return _dfdStep1.promise();
                }
                
                if (!aolSubmitStatus.updateEnvelope) {
                    updateEnve = false;
                }
                else if (aolSubmitStatus.inchargeSendBack) {
                    updateEnve = false;
                }
                else if (!aolSubmitStatus.docModified && aolSubmitStatus.atNotSignList) {
                    updateEnve = false;
                }
            }
            
            // 2017.2.21 - 傳送前將TMP_CER設為"N" (預防重複傳送時,此欄位資料異常!)
            _docObj.set2('aol', 'ODWMSG', {'TMP_CER':'N'});
            _docObj.tmpCert = 'N';

            let _tmBefore = 0;
            if (_clientSignMode=='SCard') {
                //==>公文傳送採 SmartCard 簽章 (PC)
                _checkDocDuplicate(SAMLart, _docObj)
                .then(function(rslt) { // 2017.1.17 - 檢核目前元件是否支援hash值加簽
                    // 2017.5.26, Eric Peng - 1060327
                    if (typeof rslt.success!=='undefined' && rslt.success===true) {
                        if (typeof rslt.existDoc!=='undefined' && rslt.existDoc===true) {
							//1131112	Leslie[序369]	補修正缺漏的非同步物件宣告
                           // _dfd = $.Deferred();
                           let _dfd = $.Deferred();
                           _dfd.reject({success:false, _showError: true, _errMsg:'[' + _docObj.docNo + ']公文文號已存在於伺服器上，此份公文目前已傳送，請刪除之！'}); // 2017.5.26 - Eric, 1060327
                           return _dfd.promise();
                        }
                    }
                    var sc = new SmartCard();

                    // 2019.7 - 1080654 Eric, save SCardModuleInfo
					//1130827	Leslie[序215]	為避免背景傳送元件出現異常時，有延遲跳出錯誤的問題，每筆均檢查元件是否正常可用
					//1130830	Leslie[序215]	依長官要求，復原舊有邏輯
					//1130905	Leslie[序215]	調整依客製化設定決定在PinCode前或後，檢核 SCardModuleInfo 是否合法
					//1131115	Leslie[序369]	修改為一律套用取得PinCode後，再檢核SCardModuleInfo，以避免未預期的異常
					// if (theCustom.getCustomSet('CheckSCardModuleInfoAfterPinCode') === true){
					if (true){
						//1131112	Leslie[序369]	補修正缺漏的非同步物件宣告
						// _dfd = $.Deferred();
						let _dfd = $.Deferred();
                        _dfd.resolve({success:true, SCModuleInfo: theSSO.MP.SCardModuleInfo});
                        return _dfd.promise();
					}
                    if (typeof theSSO.MP.SCardModuleInfo=='undefined' || theSSO.MP.SCardModuleInfo===null) {
					// if(true){
                        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- SmartCard.getSCardModuleInfo() BEGIN...');
                            _tmBefore = Date.now();
                        }

                        // 2020.12.25 - 1090689 Eric, 檢核跨平台網頁元件版本
                        //return sc.getSCardModuleInfo();
                        let _dfdGetSC = $.Deferred();
                        sc.getSCardModuleInfo()
                        .done(function(rslt) {
                            _dfdGetSC.resolve(rslt);
                        })
                        .fail(function(errRslt){
                            _dfdGetSC.reject($.extend({_showError: true}, errRslt, true));
                        });
                        return _dfdGetSC.promise();
                    }
                    else {
						//1131112	Leslie[序369]	補修正缺漏的非同步物件宣告
                        // _dfd = $.Deferred();
                        let _dfd = $.Deferred();
                        _dfd.resolve({success:true, SCModuleInfo: theSSO.MP.SCardModuleInfo});
                        return _dfd.promise();
                    }
                })
                .then(function(rslt) {
                    if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                        let _log = SSOUtil.dev_getTimeElapseStr('SmartCard.getSCardModuleInfo() DONE!', _tmBefore);
                        theLogger.time(_log);
                        _tmBefore = 0;
                    }

                    var _dfd = $.Deferred();
                     
                    // 2021.5.21 - Eric, 已通過資安通報版本檢核=>支援使用Hash值簽章, 毋須在此處檢查!
                    // 2017.1.17 - 檢核[跨平台簽章元件]版本資訊, 須為V1.3.4.102700版以後才支援使用hash值簽章
                    var supportHashSign = false;
                    //var verSegment;
                    //var verRequired = ['1', '3', '4', '1027'];
					//1130905	Leslie[序215]	調整依客製化設定決定在PinCode前或後，檢核 SCardModuleInfo 是否合法，增修防呆
                    // if (typeof rslt.SCModuleInfo=='object' && typeof rslt.SCModuleInfo.serverVersion=='string' && rslt.SCModuleInfo.serverVersion.length) {
                    if (typeof rslt.SCModuleInfo=='object' && typeof rslt.SCModuleInfo?.serverVersion=='string' && rslt.SCModuleInfo?.serverVersion?.length) {
                        //if (rslt.SCModuleInfo.ret_code=='')
                        //verSegment = rslt.SCModuleInfo.serverVersion.split('.');
                        //if (verSegment.length>=4 && verSegment[0]>=verRequired[0] &&
                        //    verSegment[1]>=verRequired[1] && verSegment[2]>=verRequired[2] && verSegment[3]>=verRequired[3]) {
                            supportHashSign = true;
                        //}

                        // 2019.7 - 1080654 Eric, cache SCardModuleInfo
                        if ('submitOptions' in theSSO.MP && 'cacheSCardInfo' in theSSO.MP.submitOptions && theSSO.MP.submitOptions.cacheSCardInfo===true &&
                            (typeof theSSO.MP.SCardModuleInfo=='undefined' || theSSO.MP.SCardModuleInfo===null)) {
                            theSSO.MP.SCardModuleInfo = rslt.SCModuleInfo;
                        }
                    }
                    
					//2017.1.20 - updateEnve==false時, aolSubmitStatus未定義!
					if (typeof aolSubmitStatus=='object' && aolSubmitStatus!==null) {
						aolSubmitStatus.supportHashSign = false;
						if (supportHashSign) {
						   aolSubmitStatus.supportHashSign = true;
						}
                    }
					
                    fServerSign = false;
                    
                    /* 非cleint SmartCard簽章,公文傳送加簽程序:
                     * 叫用_doClientSignSubmit
                     *    1. 上傳DocInfo (ODWMSG/ODWDCM/ODWWKF/ODWCRQ.XML)
                     *    2. theAOL.getCurrFolio.save()
                     *    3. ODMSSP.SaveMsg
                     *    4. 依憑證檢核結果決定是否使用臨時憑證簽章(_docObj.tmpCert=Y|N, ODMSSP.SetToDoListTmpCerState) [同步叫用!]
                     *    6. ODMSSP.updateEnvelope
                     *    7. signDoc using SmartCard
                     *    8. ODMSSP.signEnvelope
                     *    9. submit msg!
                     */
                    theLogger.debug('-I- 即將叫用_doClientSignSubmit...');
                    _clientSignSubmit_withSignPage(_theAOL, SAMLart, _docObj, _clientSignMode, sPincode, updateEnve, fSubmitSign, aolSubmitStatus)
					//1130808	Leslie[序180]	[中榮]啟用背景傳送+自動開啟下一筆公文時，於臨時憑證加簽時，應略過_endMainPageSubmit()以避免找不到公文(實際上為前景傳送)
                    // .done(function(){
                    .done(function(rslt){
						if('byPassEndMain' in rslt)
							_dfd.resolve({success:true, byPassEndMain: rslt.byPassEndMain});    
						else
                        _dfd.resolve({success:true});    
                    })
                    .fail(function(errRslt){
                        // 2020.6.22 - 1090390 Eric, bug-fix.
                        let showError = true;
                        if (typeof errRslt._showError=='boolean')
                            showError = errRslt._showError;
                        _dfd.reject({success:false, _showError: showError, _errMsg:'Invoke _doClientSignSubmit failed.'});
                    });
                    return _dfd.promise();
                })
                .then(function(rslt) {
					//1130808	Leslie[序180]	[中榮]啟用背景傳送+自動開啟下一筆公文時，於臨時憑證加簽時，應略過_endMainPageSubmit()以避免找不到公文(實際上為前景傳送)
                    // if ('submitOptions' in theSSO.MP && 'submitMode' in theSSO.MP.submitOptions && 
                    if ('submitOptions' in theSSO.MP && 'submitMode' in theSSO.MP.submitOptions && rslt?.byPassEndMain != true  &&
                        (theSSO.MP.submitOptions.submitMode=='signpage'||theSSO.MP.submitOptions.submitMode=='iframe')) {
                        theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- submitDoc stage 1 finished...');
                        SSOUtil.loading('hide');
                        SSOUtil.toggleFuncButton(0x3, true);
                        return _endMainPageSubmit(_theAOL, _docObj);
                    }  
                    else {
                        let _dfdIn = $.Deferred();
                        _dfdIn.resolve({success:true});
                        return _dfdIn.promise();
                    }
                })
                .then(function(rslt) {
                    SSOUtil.loading('hide');
                    if ('openNextDoc' in rslt && rslt.openNextDoc==true) {
                        // 有開啟次筆公文, 毋須設定上方工具列之按鈕狀態(開公文時會自動執行!)
                    }
                    else {
                        // 2019.9.25 - Eric, add performance log.
                        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                            window.tmEndSubmit = Date.now();
                        }
                        SSOUtil.toggleFuncButton(0x3, true);
                    }
                    _dfdStep1.resolve({success:true});
                })
                .fail(function(failRslt_SCSign) {
                    if (!!failRslt_SCSign._errMsg) {
                        theLogger.warn(failRslt_SCSign._errMsg);
                    }
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                    if ((typeof failRslt_SCSign._showError!=='undefined') && failRslt_SCSign._showError && (typeof failRslt_SCSign._errMsg!=='undefined')) {
                        alert(failRslt_SCSign._errMsg);
                        failRslt_SCSign._showError = false;
                    }
                    _dfdStep1.reject(failRslt_SCSign);
                });
                return _dfdStep1.promise();
            }
            else {
                // ==>公文傳送採 iOS App 簽章
                // 行動平台不支援簽章子視窗功能:
                // 1. 無法開啟子視窗, 
                // 2. DocSign app簽章作業之跳轉模式不適用簽章子視窗)
                theLogger.error('ERROR! _submitDocProcess_withSignPage_Step1() 不支援行動平台簽章!');
                _dfdStep1.reject({success:false, _errMsg:'_submitDocProcess_withSignPage_Step1() 不支援行動平台簽章'});
            }   
            return _dfdStep1.promise();
        }
    } // EOF _submitDocProcess_withSignPage_Step1

    function _doMenuSubmitProc(_docObj, _ruleOption, menuSetting) {
        // 2021.6 - 1100748 Eric, 醫策會 TO_OU="V" 實作
        function _updateAppUser(_theDocObj, _appUser, _remotePath) {
            let _dfd = $.Deferred();

            /*  appUser = {
                user_id: _appUser[1], user_name: _appUser[0], role_id: _appUser[3], role_name: _appUser[2],
            };*/
            _theDocObj.set2('mp', 'ODOWMSG', {APP_USER_NAME:_appUser.user_name, APP_USER_ID:_appUser.user_id, APP_ROLE_ID:_appUser.role_id});
            let ODWMSG_XmlObj = SSOUtil.getODWMSG_XMLDOMObj(_theDocObj);
            if ((typeof ODWMSG_XmlObj=='undefined') || ODWMSG_XmlObj===null) {
                theLogger.error('-ERR- upload ODWDCM.XML failed. [ODWMSG_XmlObj==null]');
                _dfd.reject({success:false, _errMsg:'無法取得ODWMSG XML DOM物件.'})
                return _dfd.promise();
            }

            let _wsUrl = _theDocObj.fileIOWS;
            let wfio = new WebFileIO(_wsUrl);
            return wfio.upload(_remotePath, "ODWMSG.xml", ODWMSG_XmlObj);
        }

        if (!_docObj.isDraft && (typeof menuSetting!=='string' || menuSetting==='')) {
            theLogger.error('ERROR! _doMenuSubmitProc() [非草稿公文]menuSetting不可為空字串或未定義.');
            SSOUtil.loading('hide');
            SSOUtil.toggleFuncButton(0x3, true);
            return false;    
        }
        
        var SAMLart = localStorage.Artifact;
        var remotePath = '', _wsUrl = '', _msgId = '', _errMsg='';
        if (_docObj.isDraft) {
            remotePath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
            _wsUrl = _docObj.get('ODWMSG', 'WEB_SERVICE');
            _msgId = _docObj.get('ODWMSG', 'MSG_ID');
        }
        else {
            remotePath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir);
            _wsUrl = _docObj.fileIOWS;
            _msgId = _docObj.msgId;
        }
            
        var _ruleErrItem = [],  _ruleErrStr='';
        if (!_docObj.isDraft) {
            // 取得ODWDCM內容
            if (typeof _docObj.ODWDCM!=='object' || _docObj.ODWDCM===null) {
                theWebServices.odmssp.setMsgStatus(SAMLart, _docObj.msgId);
                theSSO.MP.todolist.builder.initODWDCM(_docObj, {async:false});
            }

            // 2021.9.15 - 1090862 Eric, 歸檔傳送前檢核若公文有可發文文稿且未發文, 須提示使用者決定是否傳送
            //if (!_checkDocIssueStatus_PreSubmit(_aol, false)) {
            //    theLogger.log('-I- _doMenuSubmitProc')
            //    SSOUtil.loading('hide');
            //    SSOUtil.toggleFuncButton(0x3, true);
            //    return false;
            //}
            
            if (!_checkSuitable_PreSubmit(_docObj, _ruleOption, _ruleErrItem)) {
                _ruleErrStr = '無法傳送公文文號[' + _docObj.docNo + ']:' + _ruleErrItem.toString();
                alert(_ruleErrStr);
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
                return false;
            }
            
            /*var sAlertMsg = 'Gonna invoke ODMMSP.MenuSubmit()\n\tMsgId=' + _msgId + ', OrgNo=' + _docObj.sourceOrgNo + ', DocNo=' + _docObj.docNo + '\n\t' +
                            'MenuSetting=' + menuSetting;
            alert(sAlertMsg);
            SSOUtil.loading('hide');*/
            
            if (_docObj.signType=='P' && _ruleOption.txName=='分會') {
                // 分會右鍵傳送, 一代實作走一般傳送程序
                if (!_uploadDocInfo(_docObj, remotePath)) {
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                    return;
                }
                
                var rslt = theWebServices.odmssp.saveMsg(SAMLart, _docObj.msgId, {async:true});
                var _dfd = $.Deferred();
                if (rslt.success===true) {
                    _dfd.resolve(rslt);
                }
                else {
                    _dfd.reject(rslt);
                }
                
                _dfd.promise()
                .then(function(rslt) {
                    return _submitMsg(SAMLart, _docObj);
                })
                .then(function(rslt) {
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                })
                .fail(function(rslt) {
                    var errMsg = '';
                    if (errObj) {
                        var showErr = true;
                        if (typeof errObj._showError=='boolean' && errObj._showError===false) {
                            showErr = false;
                        }
                    
                        if (!!errObj.errMsg && errObj.errMsg.length) {
                            errMsg = errObj.errMsg;
                        }
                        else if (!!errObj._errMsg && errObj._errMsg.length) {
                            errMsg = errObj._errMsg;
                        }
                        if (errMsg.length && showErr) {
                            // 2018.1.15 - 1061276
                            if (typeof errObj.checkDataErr=='boolean' && errObj.checkDataErr===true) {
                                alert(errMsg);
                            }
                            else {
                                alert('公文傳送作業失敗[右鍵傳送], 錯誤說明:' + errMsg);
                            }
                        }
                    }
                    
                    theLogger.error('-ERR- _doMenuSubmitProc() failed.');
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                });
            }
            else {
                let appUser = null; // 2021.6 - 1100748 Eric, 醫策會 TO_OU="V"
                if (_docObj.signType=='P') {
                    // 2021.6 - 1100748 Eric, 醫策會 TO_OU="V"
                    if (menuSetting.indexOf('$')!=-1) {
                        let parts = menuSetting.split('$');
                        if (parts.length>=2 && parts[0].length) {
                            menuSetting = parts[0];
                            if (parts[1].length) {
                                let sAppUser = parts[1];
                                // _user_name+'@'+_user_id+'@'+_role_name+'@'+_role_id;
                                let _appUser = sAppUser.split('@');
                                if (_appUser.length==4) {
                                    appUser = {
                                        user_id: _appUser[1],
                                        user_name: _appUser[0],
                                        role_id: _appUser[3],
                                        role_name: _appUser[2],
                                    };
                                }
                            }
                        }
                    }

                    if (_docObj.txName=='待辦退回' || _docObj.txName=='退回' || _docObj.txName=='退文' ||
                        _docObj.txName=='辦畢退回' || _docObj.txName=='退會' || _docObj.txName=='回文') {
                        if (_docObj.toOUId.length || _docObj.toRoleId.length || _docObj.toUserId.length) {
                            menuSetting = _docObj.txName + '@' + _docObj.toOUId  + '@' + _docObj.toOUName  + '@' +
                                          _docObj.toRoleId  + '@' + _docObj.toRoleName + '@' + _docObj.toUserId  + '@' + _docObj.toUserName;
                        }
                        else {
                            menuSetting = _docObj.txName;
                        }
                    }
                }
                theLogger.log('-I- menuSubmit() _docObj.docNo="' + _docObj.docNo + '", _msgId="' + _msgId + '"');
                if (!!appUser) {
                    theLogger.log('-I- menuSubmit() appUser=' + JSON.stringify(appUser));
                }
                
                // 2021.6 - 1100748 Eric, TO_OU='V'時, 先設定核決者再傳送公文
                let _prmUpdateODWMSG = null;
                let _doSaveMsg = false;
                if (!!appUser) {
                    _doSaveMsg = true;
                    _prmUpdateODWMSG = _updateAppUser(_docObj, appUser, remotePath);
                }
                else {
                    let _dfdUpdate = $.Deferred();
                    _dfdUpdate.resolve({success:true});
                    _prmUpdateODWMSG = _dfdUpdate.promise();
                }
                
                _prmUpdateODWMSG
                .then(function() {
                    // 2021.6.23 - 1100748 Eric, 應先儲存公文!
                    if (_doSaveMsg) {
                        // call ODMSSP.SaveMsg
                        theLogger.log('-I- doMenuSubmit() gonna invoke ODMSSP.SaveMsg(MsgId=' + _docObj.msgId +'）');
                        return theWebServices.odmssp.saveMsg(SAMLart, _docObj.msgId);
                    }
                    else {
                        let _dfd = $.Deferred();
                        _dfd.resolve({success:true});
                        return _dfd.promise();
                    }
                })
                .then(function() {
                    // 2021.6.17 - 1100747 Eric, for dev. only, 阻擋測試公文傳送
                    let _doSubmit = theSSO._doRealSubmit;
                    if (SSOUtil.isValueTrue(localStorage['dev_ConfirmSubmit'])) {
                        let _confirmSubmit = confirm('Process real submit?');
                        if (_confirmSubmit==false) {
                            _doSubmit = false;
                        }
                    }
                    if (!_doSubmit) {
                        theLogger.log('-DEV- 跳過ODMSSP.SubmitMsg, for 後續刪文及MP頁面切換行為測試...');
                        alert('僅測試傳送公文行為作業, 跳過ODMSSP.SubmitMsg實際叫用!');

                        SSOUtil.loading('hide');
                        SSOUtil.toggleFuncButton(0x3, true);
                        return false;
                    }

                    return theWebServices.odmssp.menuSubmit(SAMLart, _docObj.sourceOrgNo, _msgId, _docObj.docNo, menuSetting, remotePath, _wsUrl, {async:true});
                })
                .then(function(menuSubmitRslt) {
                    if (menuSubmitRslt.success) {
                        _docObj.submitProcessing = true;
                        theSSO.MP.todolist.deleteMsg(_docObj, false, true);
                        SSOUtil.loading('hide');
                        SSOUtil.toggleFuncButton(0x3, true);
                    }
                    else {
                        // 2018.1.15 - 1061276
                        if (typeof menuSubmitRslt.checkDataErr=='boolean' && menuSubmitRslt.checkDataErr===true) {
                            alert(menuSubmitRslt.errMsg);
                        }
                        else {
                            alert('叫用ODMSSP.MenuSubmit()失敗! ErrMsg=' + menuSubmitRslt.errMsg);
                        }
                        theLogger.error('ERROR! _doMenuSubmitProc() invoke theWebServices.mssp.menuSubmit() failed. ErrMsg=' + menuSubmitRslt.errMsg);
                        SSOUtil.loading('hide');
                        SSOUtil.toggleFuncButton(0x3, true);
                    }
                })
                .fail(function(errObj) {
                    var errMsg='';
                    if (errObj) {
                        var showErr = true;
                        if (typeof errObj._showError=='boolean' && errObj._showError===false) {
                            showErr = false;
                        }
                        
                        if (!!errObj.errMsg && errObj.errMsg.length) {
                            errMsg = errObj.errMsg;
                        }
                        else if (!!errObj._errMsg && errObj._errMsg.length) {
                            errMsg = errObj._errMsg;
                        }
                        if (errMsg.length && showErr) {
                            // 2018.1.15 - 1061276
                            if (typeof errObj.checkDataErr=='boolean' && errObj.checkDataErr===true) {
                                alert(errMsg);
                            }
                            else {
                                alert('公文傳送作業失敗[右鍵傳送], 錯誤說明:' + errMsg);
                            }
                        }
                    }
                    
                    theLogger.error('-ERR- _doMenuSubmitProc() failed.');
                    SSOUtil.loading('hide');
                    SSOUtil.toggleFuncButton(0x3, true);
                });
            }
        }
        else {
            // 草稿右鍵傳送
            if (_docObj.docNo==='' || _docObj.signType=='E') {
                if (_docObj.docNo==='') { theLogger.error('ERROR! _doMenuSubmitProc() 文號不可為空白!'); }
                if (_docObj.signType=='E') { theLogger.error('ERROR! _doMenuSubmitProc() 不可為草稿線上簽核公文!'); }
                return;
            }
                        
            if (typeof menuSetting!=='string' || menuSetting==='') {
                _docObj.set2('sso', 'ODWMSG', {TX_NAME:'送請送文'});
            }
            else {
                // 已在右鍵執行基資設定作業, 此處毋須執行!
            }
            
            if (!_checkSuitable_PreSubmit(_docObj, _ruleOption, _ruleErrItem)) {
                _ruleErrStr = '無法傳送公文文號[' + _docObj.docNo + ']:' + _ruleErrItem.toString();
                alert(_ruleErrStr);
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
                return;
            }
            
            var draftFilePath='', destServerWSUrl='', destRootPath='', destFilePath='', subDirDate='';
            var newMsgInfo = null;
                
            theWebServices.odmssp.newMsg(SAMLart, _docObj.sourceOrgNo)
            .then(function(rslt) {
                // 搬移檔案到正式儲存區
                // draftFilePath, destServerWSUrl, destFilePath (STORAGE_PATH/$OrgNo$/YYYMM/DD)
                var _dfd = $.Deferred();
                
                newMsgInfo = rslt.newMsgInfo;
                
                draftFilePath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                destServerWSUrl= rslt.newMsgInfo.wsUrl;
                destRootPath = rslt.newMsgInfo.storagePath;
                
                var now = new Date();
                var dirYYYMM = (now.getFullYear()-1911).toString() + SSOUtil.padLeft((now.getMonth()+1).toString(), 2);
                var dirDate = SSOUtil.padLeft(now.getDate().toString(), 2);
                subDirDate = SSOUtil.combineLocalPath(dirYYYMM, dirDate);
                
                destFilePath = SSOUtil.combineLocalPath(destRootPath, _docObj.sourceOrgNo);
                destFilePath = SSOUtil.combineLocalPath(destFilePath, subDirDate);
                destFilePath = SSOUtil.combineLocalPath(destFilePath, _docObj.docNo);
                            
                theWebServices.webFileIO.copyDraftFilesToStoragePath(SAMLart, _docObj.docNo, _docObj.signType, false, draftFilePath, destServerWSUrl, destFilePath, {async:true, url:_docObj.fileIOWS})
                .done(function(rslt) {
                    _dfd.resolve(rslt);
                })
                .fail(function(err) {
                    _dfd.reject({success: false, errMsg:err.errMsg, errObj: err});
                });
                return _dfd.promise();
            })
            .then(function(rslt){
                // 異動公文基資的電子檔儲存位置相關欄位
                var _subDir = SSOUtil.combineLocalPath(_docObj.sourceOrgNo, subDirDate); // $OrgNo$/YYYMM/DD/$DocNo$
                _subDir = SSOUtil.combineLocalPath(_subDir, _docObj.docNo);
                
                var _dfd_in = $.Deferred();
                 
                if (_docObj.isDraft) {
                    _docObj._draftSubmitRestore = {
                        MSG_ID: _docObj.get('ODWMSG', 'MSG_ID'),
                        DRAFT_MSG_ID: _docObj.get('ODWMSG', 'DRAFT_MSG_ID'),
                        WEB_SERVICE: _docObj.get('ODWMSG', 'WEB_SERVICE'),
                        STORAGE_PATH: _docObj.get('ODWMSG', 'STORAGE_PATH'),
                        SRV_NO: _docObj.get('ODWSMG', 'SRV_NO'),
                        SUB_DIR: _docObj.get('ODWSMG', 'SUB_DIR')
                    };
                }
                
                var msgIdTrue = _docObj.msgId;
                _docObj.set2('aol', 'ODWMSG', { MSG_ID: '0', SRV_NO: newMsgInfo.srvNo,
                                       DRAFT_MSG_ID: msgIdTrue, WEB_SERVICE: newMsgInfo.wsUrl,
                                       STORAGE_PATH: newMsgInfo.storagePath, SUB_DIR: _subDir});
                
                
                _docObj.set2('aol', 'ODWMSG', [{ fieldname:'MSG_ID', value: '0'}, {fieldname:'SRV_NO', value: newMsgInfo.srvNo },
                                       {fieldname:'DRAFT_MSG_ID', value: msgIdTrue}, {fieldname:'WEB_SERVICE', value: newMsgInfo.wsUrl},
                                       {fieldname:'STORAGE_PATH', value: newMsgInfo.storagePath}, {fieldname:'SUB_DIR', value: _subDir}]);
                
                // 上傳公文基資檔到正式儲存區
                var _newServerPath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
                if (!_uploadDocInfo(_docObj, _newServerPath, true)) {
                    _dfd_in.reject({success:false, errMsg:'重設正式公文基資後上傳基資檔作業失敗!'});
                    return _dfd_in.promise();
                }
                else {
                    _dfd_in.resolve({success:true});
                    return _dfd_in.promise();
                }
            })
            .then(function(rslt) {
                var _go = true; //for dev. : confirm('叫用ODMSSP.SubmitMsg?');
                if (_go) {
                    return _submitMsg(SAMLart, _docObj, null, {Stage2Submit:false, AOLEDocSubmit:false}); // artifact, msgId, isDraft, remotePath, webFileIOWSUrl
                }
                else {
                    var _dfd = $.Deferred();
                    _dfd.reject({success:false, errMsg:'For debug!取消公文傳送作業!'});
                    return _dfd.promise();
                }
            })
            .then(function(rslt) {
                _docObj.submitProcessing = true;
                theSSO.MP.todolist.deleteMsg(_docObj, false, true);
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
            })
            .fail(function(errObj) {
                // 草稿傳送失敗, 須回復公文基資欄位值!
                if (_docObj.isDraft && typeof _docObj._draftSubmitRestore!=='undefined' && _docObj._draftSubmitRestore!==null) {
                     _docObj.set2('aol', 'ODWMSG', _docObj._draftSubmitRestore);
                     _docObj._draftSubmitRestore = null;
                }
                
                var errMsg='';
                if (errObj) {
                    var showErr = true;
                    if (typeof errObj._showError=='boolean' && errObj._showError===false) {
                        showErr = false;
                    }
                    
                    if (!!errObj.errMsg && errObj.errMsg.length) {
                        errMsg = errObj.errMsg;
                    }
                    else if (!!errObj._errMsg && errObj._errMsg.length) {
                        errMsg = errObj._errMsg;
                    }
                    if (errMsg.length && showErr) {
                        // 2018.1.15 - 1061276
	                    if (typeof errObj.checkDataErr=='boolean' && errObj.checkDataErr===true) {
                            alert(errMsg);
                        }
                        else {
                            alert('公文傳送作業失敗[右鍵傳送], 錯誤說明:' + errMsg);
                        }
                    }
                }
                
                theLogger.error('-ERR- _doMenuSubmitProc() failed.');
                SSOUtil.loading('hide');
                SSOUtil.toggleFuncButton(0x3, true);
            });
        }
    } // EOF _doMenuSubmitProc

    /* 使用公文傳送子視窗(signpage/iframe)時, 該網頁若發生異常會丟message給MP, 在此函式處理該類訊息
     * Note: eventObj為jQuery包裝過的event物件, 原始event內容記錄在eventObj.originalEvent
     */
    function _receiveDocSubmitPageMessage(eventObj) {
        var event = eventObj.originalEvent;
        
        // 只處理MS網站 'message' event
        let _ServerHost = window.location.protocol + '//' + window.location.hostname;
        if (event.origin!=_ServerHost) {
            return;
        }
        
        var msgObj = null;
        try {
            // msgObj = { 
            //    errObj: { 
            //        errMsg: '',
            //        docList: [msgId1, msgId2, msgId3],
            // }, }
            msgObj = event.data;
            if (typeof msgObj=='string' && msgObj.length) { // 2020.7.20 - 1090390 Eric, @IE msgObj.errObj.targetDoc為null, 改用JSON string傳遞!
                let _msgObj = JSON.parse(msgObj);
                if (_msgObj!==null) {
                    theLogger.log('-I- _receiveDocSubmitPageMessage() msgObj[JSON_string]=' + msgObj);
                    msgObj = _msgObj;
                }
            }
			//1140318	Leslie[1140443]	針對背景傳送，調整錯誤訊息處理與停用重置PinCode
			if(typeof msgObj=='string')
				theLogger.warn(`-W- _receiveDocSubmitPageMessage() msgObj[string]=${msgObj}`);

            if (!!msgObj && typeof msgObj=='object' && msgObj.msgType==='submitErrorObj' && msgObj.errObj) {
                /* 收到此訊息表示submit sign page子視窗作業發生異常, 可提示使用者 */
                let _errMsg = msgObj.errObj.errMsg;
                if (typeof _errMsg=='string' && _errMsg.length) {
					//1130830	Leslie[序215]	傳送失敗後，改用Alert()的強制訊息
                    //theSSO.MP.promptMsg('公文傳送作業', _errMsg);
					//1130905	Leslie[序215]	客製化訊息改至HiCosCard內部處理，本處僅改為Alert()
					// alert(`公文傳送作業失敗：${(!!SSO_CONFIG.certModuleErrMsg.length?"\n\n"+SSO_CONFIG.certModuleErrMsg:"")}\n\n${_errMsg}`);
					
					//1140609	Leslie[問題序73]	調整簽核元件異常處置，修正檢核的錯誤訊息，及背景傳送斷鍊問題
					if(msgObj.errObj.todolist.length > 0){
						var dropDocNoList = msgObj.errObj.todolist.map((o)=>o.docNo);
						_errMsg += `\n背景傳送中止，下列公文[${dropDocNoList.join(',')}]均已被取消，請重新整理待辦。`;
					}
					if('clearModule' in msgObj && msgObj.clearModule === true){
						 // 加簽失敗, 清除先前保留之key
						if (typeof theSSO.User.igotu=='string' && theSSO.User.igotu.length) {
							theSSO.User.igotu = '';
							theSSO.User.igotu_uncheck = '';	
						}
						//1130827	Leslie[序215]	傳送失敗後，應清空保存的SCardModuleInfo，重新檢查元件是否正常可用
						if (typeof theSSO.MP.SCardModuleInfo!='undefined' && theSSO.MP.SCardModuleInfo!=null) {
							theSSO.MP.SCardModuleInfo = null;
						}
						
						//一併清除傳送子視窗以觸發重建
						theSSO.MP.submitDocProcWnd = null;	
						theSSO.MP.submitDocProcFrameWnd = null;
						$('#submitPageCntr > iFrame').remove();	
					}
					
					alert(_errMsg);
                }
				//1140318	Leslie[1140443]	針對背景傳送，調整錯誤訊息處理與停用重置PinCode
				else
					theLogger.warn(`-W- _receiveDocSubmitPageMessage() submitErrorObj.errObj.errMsg [未知的錯誤(內容為空)]，原始內容：${event.data}`);
				
				//1130827	Leslie[序215]	傳送失敗後，應清空保存的SCardModuleInfo，重新檢查元件是否正常可用
				// 加簽失敗, 清除先前保留之key
				//1140318	Leslie[1140443]	針對背景傳送，調整錯誤訊息處理與停用重置PinCode
				// if (typeof theSSO.User.igotu=='string' && theSSO.User.igotu.length) {
					// theSSO.User.igotu = '';
					// theSSO.User.igotu_uncheck = '';	
				// }
				
				if (typeof theSSO.MP.SCardModuleInfo!='undefined' && theSSO.MP.SCardModuleInfo!=null) {
					theSSO.MP.SCardModuleInfo = null;
				}

                // 2020.7.16 - 1090390 Eric, 重新將此項目加回ToDoList
                if (('targetDoc' in msgObj.errObj) && ('msgId' in msgObj.errObj.targetDoc)) {
                    let _SAMLart = (typeof localStorage.Artifact=='string' && localStorage.Artifact.length)?localStorage.Artifact:'';
                    theSSO.MP.processReplyMsg_RTC(_SAMLart, msgObj.errObj.targetDoc.msgId, false);
                }
            }

            /* 其它message event不處理 */
        }
        catch(e){
            theLogger.warn('DocSubmitUtil.receiveDocSubmitPageMessage, exception:' + e.message);
        }
    }

    function _stopDocSubmitPageMessageListen() {
        $(window).off('message', DocSubmitUtil.receiveDocSubmitPageMessage);
    }

    // 2022.11.10 - Eric, 檢核公文是否可不異動封裝檔傳送 (e.g. 毋須封裝文件夾, 分文/分辦, 銷號傳送 etc...)
    function _canEDocSkipUpdate(_aol, _docObj) {
        if (_docObj.signType!='E') {
            theLogger.log('-W- _canEDocSkipUpdate() END [false]. [非線上簽核公文]');
            return false;
        }
        var folderStr = _docObj.folder + '-' + _docObj.subfolder;
		if (typeof folderStr=='string' && folderStr.length) {
			var sEnveExcludeFolder = theSSO.User.EnvSettings.get('AOL_ENVE_EXCLUDE_FOLDERS');
			if (typeof sEnveExcludeFolder == 'string' && sEnveExcludeFolder.length) {
				var enveExcludeFolders = sEnveExcludeFolder.split(';');
				if (enveExcludeFolders.indexOf(folderStr)!=-1) {
                    theLogger.log('-I- _canEDocSkipUpdate() END [true]. 公文在[AOL_ENVE_EXCLUDE_FOLDERS]指定文件夾內! (公文夾=' + folderStr + ', AOL_ENVE_EXCLUDE_FOLDERS=' + sEnveExcludeFolder + ')');
					return true;
				}
			}
			
			var sNotSignList = theSSO.User.EnvSettings.get('OD_AOL_NOTSIGNLIST');
			if (typeof sNotSignList == 'string' && sNotSignList.length) {
				var notSignFolders = sNotSignList.split(';');
				if (notSignFolders.indexOf(folderStr)!=-1) {
					theLogger.log('-I- _canEDocSkipUpdate() END [true]. 公文在[AOL_ENVE_EXCLUDE_FOLDERS]指定文件夾內! (公文夾=' + folderStr + ', AOL_ENVE_EXCLUDE_FOLDERS=' + sEnveExcludeFolder + ')');
					return true;
				}
			}
			
			if (!_aol.getCurrFolio()) {
				theLogger.error('ERROR! _canEDocSkipUpdate() invoke theAOL.getCurrFolio() return false.');
				return false;
			}
			
			// 檢核公文內容是否異動(封裝檔相關:文稿及簽核物件)
			var docModified = theAOL.getCurrFolio().isContentChanged();
							
			// 檢核是否為首次承辦 => 沒有任何文稿!
			// 首次承辦判定: (1)在承辦文件夾[AOL_INCHARGE_FOLDER], (2)本流程之前, 除了來文文稿外,沒有其它文稿
			var atInchargeFolder=false, firstIncharge=false;
			var sInchargeFolder = theSSO.User.EnvSettings.get('AOL_INCHARGE_FOLDER');
			if (typeof sInchargeFolder == 'string' && sInchargeFolder.length) {
				var inchargeFolders = sInchargeFolder.split(';');
				if (inchargeFolders.indexOf(folderStr)!=-1) {
					atInchargeFolder = true;
				}
			}
			
			if (atInchargeFolder) {
				firstIncharge = theAOL.getCurrFolio().isFirstSign();
			}
			
			if (firstIncharge) {
				// AOL_INCHARGE_SUBMIT_TXNAME
				var sSubmitTxName = theSSO.User.EnvSettings.get('AOL_INCHARGE_SUBMIT_TXNAME');
				if (typeof sSubmitTxName == 'string' && sSubmitTxName.length) {
					var submitTxNames = sSubmitTxName.split(';');
					if (submitTxNames.indexOf(_docObj.txName)==-1) { // 2016.9.7 - 不符合者為退文
                        theLogger.log('-I- _canEDocSkipUpdate() END [true]. 公文為首次承辦退文, 毋須異動封裝檔! (TxName=' + _docObj.txName + ', AOL_INCHARGE_SUBMIT_TXNAME=' + sSubmitTxName + ')');
						return true;
					}
				}
			}
			// 2022.2.14	1110174	Leslie	Merge[1090671]銷號無文稿傳送.
			// 條件: 異動別與環境變數AOL_INCHARGE_CANCEL_TXNAME內容一致.
			var sCancelTxName = theSSO.User.EnvSettings.get('AOL_CANCEL_SUBMIT_TXNAME');
			if (typeof sCancelTxName == 'string' && sCancelTxName.length) {
				var cancelTxNames = sCancelTxName.split(';');
				if (cancelTxNames.length && !cancelTxNames[cancelTxNames.length-1]) {
					cancelTxNames.pop();
				}
				if (cancelTxNames.indexOf(_docObj.txName)!==-1) { // 符合者為送銷號傳送.
                    theLogger.log('-I- _canEDocSkipUpdate() END [true]. 公文為送銷號傳送, 毋須異動封裝檔! (TxName=' + _docObj.txName + ', AOL_CANCEL_SUBMIT_TXNAME=' + sCancelTxName + ')');
					return true;
				}
			}
        }
        theLogger.log('-I- _canEDocSkipUpdate() END [false].');
        return false;
    }

    window.DocSubmitUtil = {
        saveMsg: _saveMsg,
        //checkSuitable_PreSubmit: _checkSuitable_PreSubmit,
        //checkEDocContent_PreSubmit: _checkEDocContent_PreSubmit,
        //submitMsg: _submitMsg,

        submitDocProcess: _submitDocProcess, 
        readOnlySubmit: _readOnlySubmit,
        doPDocSubmit: _doPDocSubmit,
        doServerSignSubmit: _doServerSignSubmit,
        
        doClientSignSubmit: _doClientSignSubmit,
        //doServerSignSubmit_withSignPage: _doServerSignSubmit_withSignPage,

        // 2019.7 - Eric Peng, 傳送效能!
        setupDocSubmitProcPage: _setupDocSubmitProcPage,
        submitDocProcess_withSignPage_Step1: _submitDocProcess_withSignPage_Step1,

        // 2019.7.23 - Eric Peng, 目前尚未使用 (紙本簽核公文以傳統方式傳送!)
        //PDocSubmit_withSignPage: _PDocSubmit_withSignPage,
        //PDocSubmit_withSignPageP2: _PDocSubmit_withSignPageP2,

        clientSignSubmit_withSignPage: _clientSignSubmit_withSignPage,
        clientSignSubmit_withSignPageP2: _clientSignSubmit_withSignPageP2,
        //serverSignSubmit_withSignPageP2: _serverSignSubmit_withSignPageP2,

        receiveDocSubmitPageMessage: _receiveDocSubmitPageMessage,  // 接收傳送子視窗訊息
        stopDocSubmitPageMessageListen: _stopDocSubmitPageMessageListen, // 停止接收傳送子視窗訊息

        // 2022.11.8 - Eric, 檢核公文是否可不異動封裝檔傳送 (e.g. 毋須封裝文件夾[回閱], 分文/分辦, 銷號傳送 etc...)
        canEDocSkipUpdate: _canEDocSkipUpdate
    };

    /*function _docPDocMultiFlowSubmit(docObj) { 
    }*/
    function _testDraftSubmit(_docObj) {
        var SAMLart = localStorage.Artifact;
        theWebServices.odmssp.newMsg(SAMLart, _docObj.sourceOrgNo)
        .then(function(rslt) {
            // move file to 正式儲存區
            // draftFilePath, destServerWSUrl, destFilePath
            var _dfd = $.Deferred();
            
            var draftFilePath = SSOUtil.combineLocalPath(_docObj.get('ODWMSG', 'STORAGE_PATH'), _docObj.get('ODWMSG', 'SUB_DIR'));
            var destServerWSUrl= rslt.newMsgInfo.wsUrl;
            var destRootPath = rslt.newMsgInfo.storagePath;
            
            var now = new Date();
            var dirYYYMM = (now.getFullYear()-1911).toString() + SSOUtil.padLeft((now.getMonth()+1).toString(), 2);
            var dirDate = SSOUtil.padLeft(now.getDate().toString(), 2);
            var subDirDate = SSOUtil.combineLocalPath(dirYYYMM, dirDate);
            
            destFilePath = SSOUtil.combineLocalPath(destRootPath, _docObj.sourceOrgNo);
            destFilePath = SSOUtil.combineLocalPath(destFilePath, subDirDate);
            destFilePath = SSOUtil.combineLocalPath(destFilePath, _docObj.docNo);
                        
            theWebServices.webFileIO.copyDraftFilesToStoragePath(SAMLart, _docObj.docNo, _docObj.signType, false, draftFilePath, destServerWSUrl, destFilePath, {async:true, url:_docObj.fileIOWS})
            .done(function(rslt) {
                _dfd.resolve(rslt);
            })
            .fail(function(err) {
                _dfd.reject({success: false, errMsg:err.errMsg, errObj: err});
            });
        })
        .fail(function(errRslt){
        });
    }
    
    /* 取得 MenuRule Object (MenuRuleAOL / MenuRulePDoc)
     */
    function _getMenuRule(artifact, orgNo, signType) {
        var menuRule = null, menuRuleT=null, arrMenuRule=null;
        if (signType=='E') {
            arrMenuRule = theSSO.menuRuleAOL;
        }
        else {
            arrMenuRule = theSSO.menuRulePDoc;
        }
        
        for(var i=0; i<arrMenuRule.length; i++) {
            menuRuleT = arrMenuRule[i];
            if (menuRuleT.orgNo == orgNo) {
                menuRule = menuRuleT;
                break;
            }
        }
        
        if (menuRule===null) {
            if (signType=='E') {
                menuRule = new MenuRuleAOL(artifact, orgNo);
                theSSO.menuRuleAOL.push(menuRule);
            }
            else if (signType=='P') {
                menuRule = new MenuRulePDoc(artifact, orgNo);
                theSSO.menuRulePDoc.push(menuRule);
            }
        }
        return menuRule;
    }
    
    function _hideSubmitUI(hide) {
        if (!!hide) {
            // 2017.4.21 - 1060272 select#chooseX 避免選到傳送子視窗
            $('#aol #transPanel select#chooseA').closest('.ui-select').hide(); $('#aol #transPanel select#chooseB').closest('.ui-select').hide();
            $('#aol #transPanel select#chooseC').closest('.ui-select').hide(); $('#aol #transPanel select#chooseD').closest('.ui-select').hide();
            $('#aol #transPanel select#chooseA').html('');  $('#aol #transPanel select#chooseB').html('');
            $('#aol #transPanel select#chooseC').html(''); $('#aol #transPanel select#chooseD').html('');
            $('#aol #btnSubmit').hide();
            
            $('#aol #moTransTargetSetup').hide();
            $('#aol #moBtnSubmit').hide();
        }
        else {
            var $chooseA = $('#aol #transPanel select#chooseA');
            $chooseA.closest('.ui-select').show();
            
            /* 2016.12.12 - Eric Peng, 若TxSel採native menu, 則強制顯示<select>控制項!
             * FDA部份client在jQM處理完後, <select>會被設成display:none. (偶發, 原因尚未查明!)
            */
            if ($chooseA.attr('data-native-menu')=='true') {
                $chooseA.show();
                $('#aol #transPanel select#chooseB').show();
                $('#aol #transPanel select#chooseC').show();
                $('#aol #transPanel select#chooseD').show();
            }
            
            $('#aol #btnSubmit').show();
            
            $('#aol #moTransTargetSetup').show();
            $('#aol #moBtnSubmit').show();
        }
    }
    
    // 2017.3 - enable/disable save/submit button
    function _toggleFuncButton(flags, on) {
        var BTN_SAVE   = 0x0001;
        var BTN_SUBMIT = 0x0002;
        var $btnSave = $('#aol #btnSave');
        var $moBtnSave = $("#aol #moBtnSave");
        var $btnSubmit = $('#aol #btnSubmit');
        
        on = (typeof on=='boolean' && !!on)?on:false;
        
        if (flags & BTN_SAVE) {
            $btnSave.prop('disabled', !on);
            if (on) {
                $btnSave.removeClass("ui-disabled");
                $moBtnSave.removeClass("ui-disabled");
            }
            else {
                $btnSave.addClass("ui-disabled");
                $moBtnSave.addClass("ui-disabled");
            }
        }
        if (flags & BTN_SUBMIT) {
            $btnSubmit.prop('disabled', !on);
            if (on) {
                $btnSubmit.removeClass("ui-disabled");
            }
            else {
                $btnSubmit.addClass("ui-disabled");
            }
        }
    }
	
	//1130916	Leslie[1130864]	[北榮]修改預排流程功能鍵UI邏輯，當流程設定為不啟用時，直接將按鍵隱藏
	function _showWorkFlowSetupBtn(){
		var _theDocObj = theAOL.docObj;
        if (typeof _theDocObj=='undefined' || _theDocObj===null) {
            return;
        }
		
		var curFolder = _theDocObj.folder;
        var curSubFolder = _theDocObj.subfolder;
        var menuRule = SSOUtil.getMenuRule_Obj(localStorage.Artifact, _theDocObj.sourceOrgNo, _theDocObj.signType);
        var rule = menuRule.getRule(curFolder, curSubFolder);
        var showBtn = false;
		if ((typeof rule !== 'undefined') && (typeof rule.webPage !== 'undefined') && rule.webPage.length)
            showBtn = true;
		
		return showBtn;
	}
    
    /* 2017.10.18 - 1060748, 流程設定直接開啟預排流程設定分頁
     */
    function _showWorkFlowSetupDialog(event, UISetting) {
        var _theDocObj = theAOL.docObj;
        if (typeof _theDocObj=='undefined' || _theDocObj===null) {
            return;
        }

        var fConsultDoc = false;
        var url = '';
        var orgNode = null;

        var curFolder = _theDocObj.folder;
        var curSubFolder = _theDocObj.subfolder;
        var menuRule = SSOUtil.getMenuRule_Obj(localStorage.Artifact, _theDocObj.sourceOrgNo, _theDocObj.signType);
        var rule = menuRule.getRule(curFolder, curSubFolder);
        var enableBtn = false;
        /*
         * PC版實作, [@MPRuleE_$OrgNo$.xml] <EDOL_UI_RULE><WEBPAGE>不為空字串時可開啟預排流程, 此處套用此設定,
         * 但開啟的 WebPage取 SSO_CONFIG.SetWWKF_Path設定值
         */
        if ((typeof rule !== 'undefined') && (typeof rule.webPage !== 'undefined') && rule.webPage.length) {
            enableBtn = true;
            /* 2017.10.23 - 1060975, 會辦單位開啟預排流程判定取消[成大功能,毋須merge至共通版]
            orgNode = SSOUtil.getOrgNode(_theDocObj.sourceOrgNo);
            fConsultDoc = SSOUtil.isConsultingDoc(_theDocObj, theSSO.User.EnvSettings, orgNode);
            if (typeof orgNode!=='undefined'){
                // 會辦單位開啟不能使用預排流程設定!
                if (fConsultDoc) {
                    enableBtn = false;
                }
            }*/
        }

		//1110119 David 1101462 支援會辦單位使用模式，新增判斷是否位於會辦單位
		orgNode = SSOUtil.getOrgNode(_theDocObj.sourceOrgNo);
        fConsultDoc = SSOUtil.isConsultingDoc(_theDocObj, theSSO.User.EnvSettings, orgNode);

        var openMode = 1;
		if (fConsultDoc)
			openMode = 2;

        if (enableBtn && typeof SSO_CONFIG.SetWWKF_Path=='string' && SSO_CONFIG.SetWWKF_Path.length) {
            url = SSO_CONFIG.SetWWKF_Path; // + '?Mode=' + openMode;
			//1110316 David 1101388 紙本簽核依參數判斷開啟的預排流程作業
			if(_theDocObj.signType == "P")
			{
				let sPFlowUseWWKF = theSSO.User.SystemSets.get('P_FLOW_USE_WWKF');
				if(sPFlowUseWWKF == "Y")
					url = url.replace("EDT217","EDT218");
			}
            //1060918 David 1060389 新增傳入SIGN_TYPE及承辦單位代碼
            url += '?SignType=' + _theDocObj.signType + '&IcOuId=' + _theDocObj.ICOUId;
			//1110119 David 1101462 新增傳入使用模式參數
			url += '&Mode=' + openMode;
            theSSO.Util.openASPXDlg(url, localStorage.Artifact);
        }
    }
	
	//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
    function _getDocTodoListTarget(artifact, sourceOrgNo, docNo, userName, ouId, type, fAsync) {
        var _dfd = $.Deferred();

        fAsync = (typeof fAsync=='boolean' && fAsync===false)?false:true;
        if (fAsync) {
            theWebServices.odmssp.GetDocTodoListTarget(artifact, sourceOrgNo, docNo, userName, ouId, type)
            .done(function(rslt){
                _dfd.resolve({success:true, docTodoTarget: rslt.docTodoTarget});
            })
            .fail(function(errRslt){
                _dfd.reject(errRslt);
            });
            return _dfd.promise();
        }
        else {
            return theWebServices.odmssp.GetDocTodoListTarget(artifact, sourceOrgNo, docNo, userName, ouId, type, {'async':fAsync});
        }
    }
	//1140115	Leslie[1131289、序1318]	增加可傳送給流程有經過的人員	==END==
	

    /* 2017.10.18 - 1060748, 預排流程異動後更新公文傳送對象 
        _newTarget = {
            OUId:"23",
            OUName:"南區管理中心",
            RoleId:"OD12",
            RoleName:"副主任",
            TxName:"送請簽核",
            UserId:"BLACKWENZ",
            UserName:"張馨文",
        }
    */
    function _updateTransTarget_WWKF(_newTarget) {
        if (typeof _newTarget=='undefined' || _newTarget===null)  return;
        if (typeof theAOL.docObj=='undefined' || theAOL.docObj===null) return;

		//1140412	Leslie[1131309]	追加紀錄預排流程異動結果，以協助追查
		theLogger.log(`預排流程異動：${JSON.stringify(_newTarget)}`)

        var _theNextOptions = null;
        if (typeof theAOL.docObj.nextOptions=='object' && theAOL.docObj.nextOptions.length) {
            _theNextOptions = theAOL.docObj.nextOptions;
        }
        var transTargetIndex = [];
        transTargetIndex = WorkFlowUtil.getNextIndexs(_newTarget, _theNextOptions);
        
        var newTransTarget = WorkFlowUtil.getNewTarget(transTargetIndex, _theNextOptions);
        if (!!newTransTarget) {
            var txNameBefore = theAOL.docObj.txName;
            theAOL.nextTarget.TxName = ((typeof newTransTarget.TxName!=='undefined') &&  newTransTarget.TxName) ? newTransTarget.TxName : '';
            theAOL.nextTarget.OUId = ((typeof newTransTarget.OUId!=='undefined') &&  newTransTarget.OUId) ? newTransTarget.OUId : '';
            theAOL.nextTarget.RoleId = ((typeof newTransTarget.RoleId!=='undefined') &&  newTransTarget.RoleId) ? newTransTarget.RoleId : '';
            theAOL.nextTarget.UserId = ((typeof newTransTarget.UserId!=='undefined') &&  newTransTarget.UserId) ? newTransTarget.UserId : '';
            theAOL.nextTarget.OUName = ((typeof newTransTarget.Unit!=='undefined') &&  newTransTarget.Unit) ? newTransTarget.Unit : '';
            theAOL.nextTarget.RoleName = ((typeof newTransTarget.RoleName!=='undefined') &&  newTransTarget.RoleName) ? newTransTarget.RoleName : '';
            theAOL.nextTarget.UserName = ((typeof newTransTarget.UserName!=='undefined') &&  newTransTarget.UserName) ? newTransTarget.UserName : '';
            
            theAOL.nextTarget.approved = (theAOL.docObj.get('ODWMSG', 'APP_USER_ID').length || theAOL.docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
            theAOL.nextTarget.rejected = false;
            if (!theAOL.nextTarget.approved) {
                theAOL.nextTarget.rejected = theAOL.docObj.get('ODWMSG', 'REJECT_USER_NAME').length ? true : false;
            }
            
            _changeTransTarget(theAOL.nextTarget, theAOL.docObj, transTargetIndex);
            var txNameAfter = theAOL.docObj.txName;
            if (txNameBefore!==txNameAfter) {
                fnODC011ChangeRemark(); // 2016.10.6 - 異動別改變後叫用此函式! (系統部要求)
            }
        }
    }

    //1140923	Leslie[1140848]	開啟可核決公文時先記錄預排流程的傳送對象，供取消核決時設定之用
    function _getWWKFNextTarget(_docObj) {
        var _wwkfNext = _docObj.getWWKFNext();
        var wwkfNextTarget = null;
        if (typeof _wwkfNext!='undefined' && _wwkfNext!==null && 
            typeof _wwkfNext.txName=='string' && _wwkfNext.txName.length) {
            var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
            if (typeof orgNode!=='undefined' && orgNode!=null) {
                var _OUName='', _RoleName='', _UserName='';
                if (_wwkfNext.toUserId.length) {
                    var userInfo = SSOUtil.getOrgUserInfo(orgNode, _wwkfNext.toOUId, _wwkfNext.toRoleId, _wwkfNext.toUserId);
                    /*OUId: unitNo, OUName: unitName, RoleId: roleNo, RoleName: roleName, UserId: account, UserName: userName */
                    if (userInfo!==null) {
                        _OUName = userInfo.OUName;
                        _RoleName = userInfo.RoleName;
                        _UserName = userInfo.UserName;
                    }
                }
                else {
                    if (_wwkfNext.toRoleId.length) {
                        _RoleName = SSOUtil.getOrgRoleName(orgNode, _wwkfNext.toOUId, _wwkfNext.toRoleId);
                    }
                    if (_wwkfNext.toOUId.length) {
                        _OUName = SSOUtil.getOrgUnitName(orgNode, _wwkfNext.toOUId);
                    }
                }

                wwkfNextTarget = {
                    TxName: _wwkfNext.txName, 
                    ToOU: '', // ruleOption.TO_OU, 預排流程給空字串!
                    OUId: _wwkfNext.toOUId, RoleId: _wwkfNext.toRoleId, UserId: _wwkfNext.toUserId, 
                    OUName: _OUName, RoleName: _RoleName, UserName: _UserName
                };
            }
        }
        return wwkfNextTarget;
    }

    /*
	 * 2013.11 - exported as SSOUtil functions should declare here
	 */
	SSOUtil.showTransTargetSetupDialog = _showTransTargetSetupDialog;
	SSOUtil.updateApproveReject = _updateApproveReject;
	SSOUtil.updateTransTarget = _updateTransTarget;
	SSOUtil.changeTransTarget = _changeTransTarget;
	SSOUtil.getCurrentTransTarget = _getCurrentTransTarget;
    SSOUtil.getDefaultTargetForCloseType = _getDefaultTargetForCloseType;
    
    /* 2016.7 - 支援紙本簽核 */
    SSOUtil.updateTransTarget_PDoc = _updateTransTarget_PDoc;
    //SSOUtil.changeTransTarget = _changeTransTarget;
    
	SSOUtil.showApproveConfirmDialog = _showApproveConfirmDialog;
    SSOUtil.shouldCreateRcvDocDraft = _shouldCreateRcvDocDraft;
    
    // 2019.7 - 1080XXX Eric Peng, 線上簽核公文傳送效能改善! (移至DocSubmitUtil宣告!)
    //SSOUtil.submitDocProcess = _submitDocProcess;
    //SSOUtil.submitDocProcess_withSignPage_Step1 = _submitDocProcess_withSignPage_Step1;
    //SSOUtil.submitDocProcess_Step2 = _submitDocProcess_Step2;
    //SSOUtil.setupDocSubmitProcPage = _setupDocSubmitProcPage;

    SSOUtil.readOnlySubmit = _readOnlySubmit; // 唯讀公文傳送(ex. 回閱)
    
    SSOUtil.getMenuRule_Obj = _getMenuRule;
    SSOUtil.updatePDocTransTargetFromDI = _updatePDocTransTargetFromDI; // 紙本簽核公文基資異動後更新傳送對象(或選單)
    SSOUtil.hideSubmitUI = _hideSubmitUI;
    
    SSOUtil.testDraftSubmit = _testDraftSubmit;
    
    SSOUtil.showCoworkProcSettingDlg = _showCoworkProcSettingDlg;
    SSOUtil.doMenuSubmitProc = _doMenuSubmitProc;
    //SSOUItl.docPDocMultiFlowSubmit = _docPDocMultiFlowSubmit;
    SSOUtil.checkSuitable_PreSubmit = _checkSuitable_PreSubmit;
    
    SSOUtil.toggleFuncButton = _toggleFuncButton;
	
	SSOUtil.getDocTodoListTarget = _getDocTodoListTarget; //1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
    
    //2017.10.6 - 1060748, 預排流程異動後更新公文傳送對象 
    SSOUtil.showWorkFlowSetupDialog = _showWorkFlowSetupDialog;
    SSOUtil.updateTransTarget_WWKF = _updateTransTarget_WWKF;
	//1130916	Leslie[1130864]	[北榮]修改預排流程功能鍵UI邏輯，當流程設定為不啟用時，直接將按鍵隱藏
	SSOUtil.showWorkFlowSetupBtn = _showWorkFlowSetupBtn;

    //1140923	Leslie[1140848]	開啟可核決公文時先記錄預排流程的傳送對象，供取消核決時設定之用
    SSOUtil.getWWKFNextTarget = _getWWKFNextTarget;
})(jQuery);