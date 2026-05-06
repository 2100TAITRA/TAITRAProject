/*
單號		DATE		SA		PRG		DESC
[1010112]	1010301		Leslie	Cloud	新增離職選項，並將啟用改為在職
[1010398]	1010427		Leslie	Cloud	修改依II WEBCONFIG內LogonByLDAP設定判斷是否啟用密碼欄位相關功能
[1010506]	1010605		Leslie	Leslie	配合僑委會升級至V3.0.16版，整併原客製化需求至IF專案對應程式
[1010829]	1011008		Leslie	Cloud	此單一併增加畫面名稱條件為必要欄位
[1020346]	1020516		Leslie	Leslie	配合系統轉至DB版本，依國健局新增需求，一併建置DB版密碼管理功能
[1030931]   1040210	    Kevin	Kenny	開啟IFC020前增加寫入Cookie資訊
[1030930]	1040402		Kevin	Kenny	開啟IFM300C1前增加紀錄單位管理人所屬單位，以調整組織樹顯示範圍只限於其管理單位
[1040296]   1040507     Kevin   Kenny   開啟IFC020時增加傳入單位代碼
[1050311]	1050614		Kevin	Kevin_C	性別選項未顯示時不檢核性別
[1050087]   1050726     Kevin	Kenny	二代公文系統相關修改
[1050928]   1050824     Kevin   Justin  儲存時未異動密碼欄位不驗證，解鎖後新增一筆II_ACCESS_LOG為0登入成功
[1050928]   1051011     Kevin   Justin  除修改模式下且未異動密碼欄位，儲存時皆需驗證
[1050087]	1051019		Leslie	Joe		二代修改配合行動平台
[1060824]	1060510		Kevin	Joe		修正代理取得方式
[1070678]	1070717		Kevin  	Joe		弱掃修正Client Potential XSS、Heap Inspection
[1070678]	1070803		Kevin	Joe		修正弱掃Client Cookies Inspection
[1070678]   1070817     Kevin   Zen     弱掃XSS修正
[1070678]   1070823		Kevin	Joe		修正弱掃Use Of Hardcoded mima
[1070678]	1070830		Kevin	Joe		配合內政部IIS環境設定改為使用AjaxPro
[1070678]	1070904		Kevin	Justin	弱掃修正CookieHttpOnly
[1070678]	1070905		Kevin	Joe		修正二代升級組織樹改寫遺漏功能
[1080628]	1080816 	Kevin	Joe		修正開啟子視窗前需進行編碼
[1080664]	1080820		Kevin	Kevin_C	配合弱掃移除ASPX檔的ValidateRequest="false"，增加對密碼進行htmlencode編碼
1100991		1100818		Kevin	Joe  	弱掃修正Client DOM XSS
--			1101214		Joe		Joe		性別選項不納入檢核
--			1110727		Joe		Joe		修正原密碼欄位不需進行複雜度檢核
1111367		1111130		Kevin	Joe		滲透測試弱點修正
1111367		1120214		Joe		Joe		修改IFM300系統維護與個人維護拆分
1130409		序56		Zen		Zen		修正姓名欄位(單位名稱)欄位未自動換行之問題
線上序150	1130718		Zen		Alexander   (中榮)代理人設定維護畫面日期欄位長度不足7碼、調整子視窗大小
1140110     屏東序1348  Zen		Zen		修正提示訊息內文錯字
1140616     1140473     Kevin   Kevin   退輔會前端介接、新增行動電話、職等
1140917		1140811		Zen		Andy	新增航港局客製化功能-帳號附件上傳及下載
1140919     1141127     Zen     Zen     新增帳號帳號啟用、停用日期欄位
1141127     1141106     Zen     Andy    調整帳號啟用、停用日期欄位相關功能-仍有公文時，出現提示視窗
1141162     1141223     Leslie  Andy    新增檔案大小檢核
1150206		序63		Zen		Andy	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1111130	Joe		1111367		調整為開啟後才執行
//CheckPriv();
//紀錄Call WebService物件的id
var wsDuplicateID;
//1111130	Joe		1111367		滲透測試修改
var mode;

//1050726	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--S
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--E

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1111130	Joe		1111367		滲透測試修改
    mode = document.all["nMode"].value;
    //1020328	Leslie	這行不需要(1.已使用W32於內網可直接叫用WS，2.僑委會海外不能用W32也不會用到WS)
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    if (document.all.DUMMY_USERKEY != null)
    {
        //1070717	Joe		1070678		修正弱掃Heap Inspection
        // document.all.txPassword.value =  document.all.DUMMY_USERKEY.value;
        document.all.txMima.value = document.all.DUMMY_USERKEY.value;
    }

    //1070817 Zen 1070678 弱掃XSS修正
    //if (document.all.nPlayRole != null)
    //document.all.playRole.innerHTML = document.all.nPlayRole.value;

    //1010605(Merge[1010018])	Leslie[1010506]	判斷是否需重新載入組織樹
    if (document.all.nReload != null)
    {
        if (document.parentWindow != null && GetAllParamStr().indexOf("OpenByTree") != -1)
        {
            //1070803	Joe		1070678		修正弱掃Client Cookies Inspection
            // parent.navbar.location="IFC021.htm" + GetAllParamStr();
            //1100818	Joe		1100991		弱掃修正Client DOM XSS
            // parent.navbar.location="IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=Account";
            parent.navbar.location = "IFC021.aspx" + encodeURI(GetAllParamStr()) + "&iic021SelectType=Account";
        }
    }
    //1140811   Andy    1140917 新增帳號上傳附件功能
    // 綁定「新增」按鈕事件
    document.getElementById("btFileChange").addEventListener("click", function ()
    {
        Page_BlockSubmit = true;
        document.getElementById("fileInput").click();
    });
    // 綁定「下載」按鈕事件
    document.getElementById("btFileOpen").addEventListener("click", function ()
    {
        Page_BlockSubmit = true;
        fnFileDownload();
    });
    // 綁定「刪除」按鈕事件
    document.getElementById("btFileDelete").addEventListener("click", function ()
    {
        Page_BlockSubmit = true;
        fnDeleteAttachItem();
    });
    CheckPriv();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019	joe		1050087		二代修改配合行動平台
    // var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btDeployPrivilege":
            Page_BlockSubmit = true;
            var param = ReplaceParamStrForOrgNo(GetAllParamStr(), document.all["dlOrgno"].value);
            //1070904 Justin [1070678]弱掃修正CookieHttpOnly
            //jf_SaveCookie("nObject",document.all.nObject.value);
            //1050726	Kenny   [1050087]	二代公文系統相關修改
            //jf_ShowModal("IFM210C2.htm" + param,"480","500");
            //1070904 Justin [1070678]弱掃修正CookieHttpOnly
            //jf_ShowModal("IFM210C2.htm" + param,"800","600");
            // 1130718 Alexander 線上序150  (中榮)調整子視窗大小(畫面顯示不完整)
            //jf_ShowModal("IFM210C2.htm" + param + "&nObject=" + document.all.nObject.value,"800","600");
            //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
            //jf_ShowModal("IFM210C2.htm" + param + "&nObject=" + document.all.nObject.value, "1024", "660");
            jf_ShowModal("IFM210C2.htm" + param + "&nObject=" + document.all.nObject.value);
            break;
        case "btSetProxy":
            Page_BlockSubmit = true;
            var param = ReplaceParamStrForOrgNo(GetAllParamStr(), document.all["dlOrgno"].value);
            //1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
            //jf_SaveCookie("nObject",document.all.nObject.value);
            //1050726	Kenny   [1050087]	二代公文系統相關修改
            //jf_ShowModal("IFM300C2.htm" + param,"880","640");
            //1060824	Joe		1060510		修正代理取得方式
            if (document.all.H_PROXY_MODE.value == "1")
                //jf_ShowModal("IFM300C2.htm" + param,"900","660");
                //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
                //jf_ShowModal("IFM300C2.htm" + param + "&nObject=" + document.all.nObject.value, "900", "660");
                jf_ShowModal("IFM300C2.htm" + param + "&nObject=" + document.all.nObject.value);
            //1060824	Joe		1060510		修正代理取得方式--S
            else
                //jf_ShowModal("IFM305.aspx",900,660);
                // 1130718 Alexander 線上序150  (中榮)調整子視窗大小(畫面顯示不完整)
                //jf_ShowModal("IFM305.aspx" + "?nObject=" + document.all.nObject.value,"900","660");
                //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
                //jf_ShowModal("IFM305.aspx" + "?nObject=" + document.all.nObject.value, "1024", "660");
                jf_ShowModal("IFM305.aspx" + "?nObject=" + document.all.nObject.value);
            //1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
            //1060824	Joe		1060510		修正代理取得方式--E
            break;
        //1010605(Merge[1000974])	Leslie[1010506]	僑委會新增需求，新增「IIM300C5 密碼設定子視窗」
        //1070816	Joe		1070678		修正弱掃Heap Inspection
        // case "btSetPassWord":
        case "btSetMima":
            Page_BlockSubmit = true;
            var param = ReplaceParamStrForOrgNo(GetAllParamStr(), document.all["dlOrgno"].value);	//Leslie	Copy來後，改dlOrg→dlOrgno
            //1010605	Leslie	配合原II程式的寫法(原本是傳AD中帳號物件的DN)，改為傳入帳號再由該程式自己去AD中找
            //jf_SaveCookie("nObject",document.all.nObject.value);
            //1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
            //jf_SaveCookie("nObject",document.all.txAccount.value);
            //1010605	Leslie	增加判斷使用者開始模式，以決定子視窗大小
            var childHeight = 360;
            //1111130	Joe		1111367		滲透測試修改
            //if(document.all["nMode"] == null)
            if (mode == "1")
                childHeight = 260;
            //jf_ShowModal("IIM300C5.htm" + param,"360",childHeight);
            //1080816	Joe		1080628		新增開啟子視窗前轉碼
            // jf_ShowModal("IIM300C5.htm" + param + "&nObject=" + document.all.txAccount.value,"360",childHeight);
            jf_ShowModal("IIM300C5.htm" + param + "&nObject=" + encodeURIComponent(document.all.txAccount.value), "360", childHeight);
            //1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
            break;
        //1010605(Merge[1000974])	Leslie[1010506]	僑委會新增需求，新增「IIM300C6 網域群組設定子視窗」
        case "btSetGroup":
            Page_BlockSubmit = true;
            var param = ReplaceParamStrForOrgNo(GetAllParamStr(), document.all["dlOrgno"].value);	//Leslie	Copy來後，改dlOrg→dlOrgno
            //1010605	Leslie	配合原II程式的寫法(原本是傳AD中帳號物件的DN)，改為傳入帳號再由該程式自己去AD中找
            //jf_SaveCookie("nObject",document.all.nObject.value);
            //1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
            //jf_SaveCookie("nObject",document.all.txAccount.value);
            //jf_ShowModal("IIM300C6.htm" + param,"700","500");
            //1080816	Joe		1080628		新增開啟子視窗前轉碼
            // jf_ShowModal("IIM300C6.htm" + param + "&nObject=" + document.all.txAccount.value,"700","500");
            //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
            //jf_ShowModal("IIM300C6.htm" + param + "&nObject=" + encodeURIComponent(document.all.txAccount.value), "700", "500");
            jf_ShowModal("IIM300C6.htm" + param + "&nObject=" + encodeURIComponent(document.all.txAccount.value));
            //1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
            break;
        case "ibDateS":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txAccountExpires, event.screenX, event.screenY);
            var strDate = document.all.txAccountExpires.value;
            if (strDate.indexOf("/") == -1 && strDate != "")	//1010204	Leslie	加上空字串判斷
            {
                strDate = strDate.substring(0, 3) + "/" + strDate.substring(3, 5) + "/" + strDate.substring(5);
                document.all.txAccountExpires.value = strDate;
            }
            break;
        //1140616 Kevin 1140473 退輔會前端介接、新增行動電話、職等
        case "btGetInfoByEip":
            Page_BlockSubmit = true;
            GetVacEipInfo();
            break;
        //1140811   Andy    1140917 新增帳號上傳附件功能
        case "":
            document.getElementById('fileInput').click();
            Page_BlockSubmit = true;
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050726	Kenny   [1050087]	二代公文系統相關修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050726	Kenny   [1050087]	二代公文系統相關修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1080820	Kevin_C	1080664	配合弱掃移除ASPX檔的ValidateRequest="false"，增加對密碼進行htmlencode編碼
            document.all.txMima.value = HtmlEncode(document.all.txMima.value);
            //1050726	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //1141106   Andy    1141127 調整帳號啟用、停用日期欄位相關功能-仍有公文時，出現提示視窗
            if (document.all["rbDisable"].checked)
            {
                var rtnBool = IF1.IFM301.CheckDocUser(document.all["dlOrgno"].value, document.all.txAccount.value);
                if (rtnBool.value) {
                    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["此帳號仍有未辦畢公文，不允停用。"])), "");
                    document.getElementById("rbDisable").focus();
                    Page_BlockSubmit = true;
                    return;
                }
                Page_BlockSubmit = !jf_CheckKeyObject();
                if (Page_BlockSubmit)
                    return;
            }
            //1080820	Kevin_C	1080664	配合弱掃移除ASPX檔的ValidateRequest="false"，增加對密碼進行htmlencode編碼
            document.all.txMima.value = HtmlEncode(document.all.txMima.value);
            //1140812   Andy    1140917 新增帳號上傳附件功能
            document.getElementById("H_UpLoad").value = WaitUpLoadFiles.join("|");
            //1010427 1010398 Cloud 修改依II WEBCONFIG內LogonByLDAP設定判斷是否啟用密碼欄位相關功能
            if (document.all.txLdapSet.value == "N")
            {
                //1010605(Merge[1000974])	Leslie[1010506]	密碼欄位若為Disabled，則無需檢核是否為空(新增模式會由Server端給予預設密碼)
                //1070717	Joe		1070678		修正弱掃Heap Inspection
                // if(!document.all.txPassword.disabled)
                if (!document.all.txMima.disabled)
                {
                    //1070717	Joe		1070678		修正弱掃Heap Inspection
                    // if(jf_Trim(document.all.txPassword.value)=="")
                    if (jf_Trim(document.all.txMima.value) == "")
                    {
                        alert("密碼不可為空白,請重新輸入");
                        //1050726	Kenny   [1050087]	二代公文系統相關修改
                        //document.all.txPassword.focus();
                        //1070717	Joe		1070678		修正弱掃Heap Inspection
                        // $('#txPassword').focus();
                        $('#txMima').focus();
                        Page_BlockSubmit = true;
                        return;
                    }
                    //1020516	Leslie[1020346]	配合系統轉至DB版本，依國健局新增需求，一併建置DB版密碼管理功能
                    else if (document.all["H_T2100OD_RUN_MODE"].value == "1")	//純DB模式
                    {
                        //1070717	Joe		1070678		修正弱掃Heap Inspection
                        // var strPass = document.all.txPassword.value;
                        var strPass = document.all.txMima.value;
                        var arPWDRule = document.all["H_PWD_RULE"].value.split('|')
                        var regexStr = arPWDRule[0];
                        if (arPWDRule.length < 2)
                            arPWDRule[1] = "密碼格式不正確,請重新輸入";
                        //1050824   Justin[1050928]  儲存時未異動密碼欄位不驗證
                        //if (regexStr != "")
                        //1051011   Justin[1050928]  除修改模式下且未異動密碼欄位，儲存時皆需驗證--S
                        //if (regexStr != "" && strPass != document.all.DUMMY_USERKEY.value)
                        if (regexStr != "")
                        {
                            if (document.all.TemplateMode.value == "1" && strPass == document.all.DUMMY_USERKEY.value)
                            { }
                            else if (strPass.match(regexStr) != strPass)
                            {
                                //1051011   Justin[1050928]  除修改模式下且未異動密碼欄位，儲存時皆需驗證--E
                                alert(arPWDRule[1]);
                                //1050726	Kenny   [1050087]	二代公文系統相關修改
                                //document.all.txPassword.focus();
                                //1070717	Joe		1070678		修正弱掃Heap Inspection
                                // $('#txPassword').focus();
                                $('#txMima').focus();
                                Page_BlockSubmit = true;
                                return;
                            }
                            //1091125	Joe		1090886		修改當使用者可輸入原密碼時，需檢核原密碼欄位
                            if (document.all.txOldMima.className != "hide" && strPass != document.all.DUMMY_USERKEY.value)
                            {
                                strPass = document.all.txOldMima.value;

                                if (strPass == "")
                                {
                                    alert('原密碼欄位不可為空');
                                    $('#txMima').focus();
                                    Page_BlockSubmit = true;
                                    return;
                                }
                                //1110727	Joe		--		修正原密碼欄位不需進行複雜度檢核
                                /*
                                else if (strPass.match(regexStr) != strPass){
                                    alert(arPWDRule[1]);
                                    $('#txMima').focus();
                                    Page_BlockSubmit=true;			
                                    return;
                                }
                                */
                            }
                        }
                    }
                }
            }
            if (jf_Trim(document.all.txBirthday.value) != "")
            {
                if (!jf_CheckCDATE(document.all.txBirthday.value))
                {
                    alert("您輸入之日期格式不合法，請重新確認", "");
                    //1050726	Kenny   [1050087]	二代公文系統相關修改
                    //document.all.txBirthday.focus();
                    $('#txBirthday').focus();
                    return;
                }
            }
            //1101214	Joe		--		性別選項不納入檢核--S
            /*
            //1050614	Kevin_C	1050311	性別選項未顯示時不檢核性別
            if(document.all["Label3"].className != "hide")
            if (document.all["rbMale"].checked == false && document.all["rbFemale"].checked == false )
            {
                alert("性別尚未選擇");
                //1050726	Kenny   [1050087]	二代公文系統相關修改
                //document.all["rbMale"].focus();
                $('#rbMale').focus();   
                return;
            }
            */
            //1101214	Joe		--		性別選項不納入檢核--E
            //1111130	Joe		1111367		調整使用者可異動之權限，看不到的選項不檢核
            if (mode == "2")
            {
                if (document.all["rbEnable"].checked == false && document.all["rbDisable"].checked == false && document.all["rbQuit"].checked == false)
                {
                    alert("帳號狀態尚未選擇");
                    //1050726	Kenny   [1050087]	二代公文系統相關修改
                    //document.all["rbEnable"].focus();
                    $('#rbEnable').focus();
                    return;
                }
            }
            //[1010829]1011008	Cloud	此單一併增加畫面名稱條件為必要欄位
            if (jf_Trim(document.all.txName.value) == "")
            {
                alert("名稱不可為空白,請重新輸入");
                //1050726	Kenny   [1050087]	二代公文系統相關修改
                //document.all.txName.focus();
                $('#txName').focus();
                Page_BlockSubmit = true;
                return;
            }
            Page_BlockSubmit = !jf_ConfirmSave();
            if (Page_BlockSubmit)
                return;
            //1050726	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050726	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050726	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            if (jf_ConfirmClean())
            {
                document.all.rbEnable.checked = true;
                document.all.rbMale.checked = true;
            }
            //document.all["txKeyFld"].focus();
            break;
        case "btSearch":
            var filter = document.all.txAccount.value;
            //1050726	Kenny   [1050087]	二代公文系統相關修改--Start--
            //var ret = jf_ShowPersonDialog(filter, document.all["dlOrgno"].value);
            //
            //if(ret!=null)
            //{
            //	//回傳格式=代碼,名稱,DN
            //	Page_BlockSubmit = false;
            //	document.all.txAccount.value=GetElement(ret,0);
            //	jf_OpenButtonSubmit();
            //}
            jf_ShowPersonDialog(filter, document.all["dlOrgno"].value);
            //1050726	Kenny   [1050087]	二代公文系統相關修改--End--
            break;
        case "btPrint":
            Page_BlockSubmit = false;
            //1050726	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            break;
        case "btAccSync":
            Page_BlockSubmit = false;
            //1050726	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    //1140919 Zen 1141127 新增帳號帳號啟用、停用日期欄位
    strErrMsg += CheckDate('txEnableDate', '預計啟用日', true, 7);
    strErrMsg += CheckDate('txDisableDate', '預計停用日', true, 7);

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            //document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
        }
        else
        {
            //document.all["txReadOnly"].value = "";
        }
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
    /*
    if(argCallerId == "SII020")
    {
        document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
        document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
        if(document.all["txKeyFld"].value != "")
        {
            Page_BlockSubmit=false;
            jf_OpenButtonSubmit();
        }
        document.all["txKeyFld"].focus();
    }
    */

    //1050726	Kenny   [1050087]	二代公文系統相關修改--Start--
    if (argCallerId == "IFC020") 
    {
        if (IsRationalValue(document.all["lbReturnValue"].options))
            document.all["txAccount"].value = document.all.lbReturnValue.options[0].value.split('|')[0];

        if (document.all["txAccount"].value != "")
        {
            Page_BlockSubmit = false;
            jf_ToolBarSubmit('btOpen');
        }
    }
    else if (argCallerId == "IFM300C1") 
    {
        Page_BlockSubmit = false;
        jf_ToolBarSubmit('btOpen');
    }
    else if (argCallerId == "IFM300C3") 
    {
        Page_BlockSubmit = false;
        jf_ToolBarSubmit('btOpen');
    }
    //1050726	Kenny   [1050087]	二代公文系統相關修改--End--

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function jf_ConfirmSave()//判斷帳號是否已存在
{
    var bRtn = false;

    //1010605	Leslie[1010506]	修正一整個混亂的模式判斷，應該回歸僅"新增"模式需判斷即可
    //if ( ( jf_GetActionMode()!=LayoutModeNew && document.all["nMode"] == null ) || ( jf_GetActionMode()==LayoutModeNew && document.all["nMode"] != null ) )
    if (jf_GetActionMode() == LayoutModeNew)
    {

        //1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
        // if(IFM300.CheckUsernameExist(jf_Trim(document.all["txAccount"].value),jf_Trim(document.all["dlOrgno"].value)).value)
        //1120214		Joe		1111367		修改IFM300系統維護與個人維護拆分
        // if(IF1.IFM300.CheckUsernameExist(jf_Trim(document.all["txAccount"].value),jf_Trim(document.all["dlOrgno"].value)).value)
        if (IF1.IFM301.CheckUsernameExist(jf_Trim(document.all["txAccount"].value), jf_Trim(document.all["dlOrgno"].value)).value)
        {
            //1140110 屏東序1348 Zen 修正提示訊息內文錯字
            //if (window.confirm("此帳號以存在，是否覆蓋資料"))//提醒是否覆蓋存檔
            if (window.confirm("此帳號已存在，是否覆蓋資料"))
                bRtn = true;
            else
                bRtn = false;
        }
        else
            bRtn = true;
    }
    else
        bRtn = true;

    return bRtn;
}
function StatusChange()
{
    //if(document.all.rbEnable.checked==true)
    //1010112  1010301    Cloud   新增離職選項，並將啟用改為在職
    if (document.all.rbEnable.checked == true || document.all.rbQuit.checked == true)
        document.all.btSetProxy.disabled = "disable";
    if (document.all.rbDisable.checked == true)
    {
        if (document.all.nObject != null)
            document.all.btSetProxy.disabled = "";
    }
}

function ChangeImages(node, imgpath, imgMain, imgPlusMinusPrefix, imgPlusMinus)
{
    bSetMainImage = (imgMain != ""); //don't set main image in text modes
    if (node.children.length > 0)
    {
        if (node.children.item(0).tagName == "IMG")
        {
            if (imgPlusMinus != "No") //"No" indicates that it is not needed Plus or Minus image
                node.children.item(0).src = imgpath + imgPlusMinusPrefix + imgPlusMinus + ".gif";
            else //if is not needed Plus/Minus image
            {
                if (bSetMainImage) //if node has image that must be changed
                {
                    node.children.item(0).src = imgpath + imgMain;
                    bSetMainImage = false;
                }
            }
        }
    }

    // process situation <A..><Checkbox><needed image></A>
    if (bSetMainImage && node.children.length > 1)
    {
        if (node.children.item(0).tagName == "INPUT" && node.children.item(1).tagName == "IMG")
        {
            node.children.item(1).src = imgpath + imgMain;
            bSetMainImage = false;
        }
    }

    //process next tag
    if (bSetMainImage)
    {
        nextNode = node.nextSibling;
        if (nextNode.tagName == "INPUT") //skip checkbox
            nextNode = nextNode.nextSibling;

        if (nextNode.tagName == "IMG") //next tag is needed image
            nextNode.src = imgpath + imgMain;
        else //next tag is <A...>
            if (nextNode.children.length > 0)
            {
                pos = 0;
                if (nextNode.children.item(0).tagName == "INPUT" && nextNode.children.length > 1)
                    pos = 1; // <A..> <Checkbox> <needed image>

                if (nextNode.children.item(pos).tagName == "IMG")
                    nextNode.children.item(pos).src = imgpath + imgMain;
            }
    }
}

function ExpCol(node, imgpath, imgPlusMinus, imgCollapsed, imgExpanded, nodekey)
{
    if (node != null)
    {
        nextNode = node.nextSibling;
        bFinded = false;

        while (nextNode != null && bFinded == false)
        {
            if (nextNode.tagName == "DIV")
                bFinded = true;
            else
                nextNode = nextNode.nextSibling;
        }

        if (nextNode != null && bFinded)
        {
            if (nextNode.style.display == 'none')
            {
                nextNode.style.display = '';
                ChangeImages(node, imgpath, imgExpanded, 'tv_minus', imgPlusMinus);
            }
            else
            {
                nextNode.style.display = 'none';
                ChangeImages(node, imgpath, imgCollapsed, 'tv_plus', imgPlusMinus);
            }
        }
    }
}
function HighlightNode(nNodeID, arg, arg2)
{
    //jf_SetTreeViewMode(nNodeID,2);
    parent.viewer.WebForm1.all.guid.value = arg2;
    parent.viewer.WebForm1.submit();
}

function jf_SetTreeViewMode(nNodeID, argMode)
{
    if (argMode == 1)
        document.getElementById("tv_" + nNodeID).style.backgroundColor = '#ffffff';
    else
        document.getElementById("tv_" + nNodeID).style.backgroundColor = '#ccccff';
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    document.all[argLabelId].innerText = obj.value;
}

//1020315	Leslie[1020057]	增加原II功能「設定角色子視窗」
function SetPlayRole()
{
    //1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
    //jf_SaveCookie("nObject",document.all.nObject.value);
    //jf_SaveCookie("nOrgNo", document.all.dlOrgno.value);
    var param = ReplaceParamStrForOrgNo(GetAllParamStr(), document.all["dlOrgno"].value);
    //1040402	Kenny	[1030930]	增加紀錄單位管理人所屬單位至隱藏欄位，以調整IFM301C1組織樹顯示單位
    //jf_SaveCookie("DeptNo", document.all.H_txUnitNo.value);

    //1050726	Kenny   [1050087]	二代公文系統相關修改--Start--
    //var ret = jf_ShowModal("IFM300C1.htm" + param,"480","500");//jf_OpenChildWin("IFM300C1.htm" + param,"","480","500");//
    //if(ret!=null)
    //	jf_OpenButtonSubmit();
    //jf_ShowModal("IFM300C1.htm" + param,"800","600");
    //1070905	Joe		1070678		修正二代升級組織樹改寫遺漏功能
    // jf_ShowModal("IFM300C1.htm" + param + "&nObject=" + document.all.nObject.value,"800","600");DeptNo
    // 1130718 Alexander 線上序150  (中榮)調整子視窗大小(畫面顯示不完整)
    //jf_ShowModal("IFM300C1.htm" + param + "&nObject=" + document.all.nObject.value + "&DeptNo=" + document.all.DeptNo.value,"800","600");
    //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
    //jf_ShowModal("IFM300C1.htm" + param + "&nObject=" + document.all.nObject.value + "&DeptNo=" + document.all.DeptNo.value, "1024", "660");
    jf_ShowModal("IFM300C1.htm" + param + "&nObject=" + document.all.nObject.value + "&DeptNo=" + document.all.DeptNo.value);
    //1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
    Page_BlockSubmit = true;
    //1050726	Kenny   [1050087]	二代公文系統相關修改--End--
}

function SetPlayRoleRank()
{
    //1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
    //jf_SaveCookie("nObject", document.all.nObject.value);
    var param = ReplaceParamStrForOrgNo(GetAllParamStr(), document.all["dlOrgno"].value);
    //1050726	Kenny   [1050087]	二代公文系統相關修改--Start--
    //var ret = jf_ShowModal("IFM300C3.htm" + param,"480","500");
    //if(ret!=null)
    //	jf_OpenButtonSubmit();
    //1050726	Kenny   [1050087]	二代公文系統相關修改調整子視窗大小
    //jf_ShowModal("IFM300C3.htm" + param,"600","650");
    //jf_ShowModal("IFM300C3.htm" + param,"800","600");
    // 1130718 Alexander 線上序150  (中榮)調整子視窗大小(畫面顯示不完整)
    //jf_ShowModal("IFM300C3.htm" + param + "&nObject=" + document.all.nObject.value,"800","600");
    //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
    //jf_ShowModal("IFM300C3.htm" + param + "&nObject=" + document.all.nObject.value, "1024", "660");
    jf_ShowModal("IFM300C3.htm" + param + "&nObject=" + document.all.nObject.value);
    //1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
    Page_BlockSubmit = true;
    //1050726	Kenny   [1050087]	二代公文系統相關修改--Start--
}

function CheckPriv()
{
    //1111130	Joe		1111367		滲透測試修改
    if (mode == "2")
    {
        if (document.all["ddlPrivLevel"].selectedIndex != -1)
        {
            var selectedindex = document.all["ddlPrivLevel"].selectedIndex;
            //1050726	Kenny   [1050087]	二代公文系統相關修改
            //if(document.all["ddlPrivLevel"](selectedindex).text == "特殊權限")
            if (document.all["ddlPrivLevel"].options[selectedindex].text == "特殊權限")
            {
                //加入判斷是否為管理模式，若是，才顯示"維護鍵"為Enable狀態
                //1111130	Joe		1111367		調整特殊權限選單僅管理者可看到，故不用再判斷一般使用者
                //if (document.all["nMode"] != null)
                //if (document.all["nMode"].value == "2" || document.all["nMode"].value == "3")
                document.all["btPrivUpdate"].disabled = false;
            }
            else
                document.all["btPrivUpdate"].disabled = true;
        }
    }

}

function OpenIFM300C4()
{
    //1070904 Justin [1070678]弱掃修正CookieHttpOnly
    //jf_SaveCookie("nObject", document.all.nObject.value);
    var param = ReplaceParamStrForOrgNo(GetAllParamStr(), document.all["dlOrgno"].value);
    //1050726	Kenny   [1050087]	二代公文系統相關修改
    //var ret = jf_ShowModal("IFM300C4.htm" + param, "550", "500" );
    //1070904 Justin [1070678]弱掃修正CookieHttpOnly
    //jf_ShowModal("IFM300C4.htm" + param, "800", "600" );
    //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
    //jf_ShowModal("IFM300C4.htm" + param + "&nObject=" + document.all.nObject.value, "800", "600");
    jf_ShowModal("IFM300C4.htm" + param + "&nObject=" + document.all.nObject.value);
    Page_BlockSubmit = true;
}

function jf_ShowPersonDialog(argParam, argOrgNo)
{
    //1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
    //jf_SaveCookie("nSearch",argParam);	
    //1040210	Kenny	[1030390]	開啟IFC020前增加寫入Cookie資訊
    //jf_SaveCookie("PrivType", document.all.PrivType.value);
    //1040507   Kenny   [1040296]   增加傳入單位代碼
    //jf_SaveCookie("DeptNo", document.all.DeptNo.value);

    var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
    //1050726	Kenny   [1050087]	二代公文系統相關修改--Start--
    //var ret= fnOpen("IFC020.htm" + param,"480","370"); //回傳值：CN, displayName, Path
    //return ret;
    //1050726	Kenny   [1050087]	二代公文系統相關修改調整子視窗大小
    //jf_ShowModal("IFC020.htm" + param,"480","370");
    //jf_ShowModal("IFC020.htm" + param, "800", "600");
    //1080816	Joe		1080628		新增開啟子視窗前轉碼
    // jf_ShowModal("IFC020.htm" + param + "&nSearch=" + argParam + "&PrivType=" + document.all.PrivType.value + "&DeptNo=" + document.all.DeptNo.value, "800", "600");
    //1130409 Zen 序56 調整子視窗大小
    //jf_ShowModal("IFC020.htm" + param + "&nSearch=" + encodeURIComponent(argParam) + "&PrivType=" + document.all.PrivType.value + "&DeptNo=" + document.all.DeptNo.value, "800", "600");
    //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
    //jf_ShowModal("IFC020.htm" + param + "&nSearch=" + encodeURIComponent(argParam) + "&PrivType=" + document.all.PrivType.value + "&DeptNo=" + document.all.DeptNo.value, "1024", "768");
    jf_ShowModal("IFC020.htm" + param + "&nSearch=" + encodeURIComponent(argParam) + "&PrivType=" + document.all.PrivType.value + "&DeptNo=" + document.all.DeptNo.value);
    //1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
    Page_BlockSubmit = true;
    //1050726	Kenny   [1050087]	二代公文系統相關修改--End--

}

//1050726	Kenny   [1050087]	二代公文系統相關修改；改以jf_ShowModal開啟子視窗，MARK此部分--Start--
//function fnOpen(arg,argW,argH)
//{
//   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
//   var ret = window.showModalDialog(arg, "", sFeatures);
//   return ret;
//}
//1050726	Kenny   [1050087]	二代公文系統相關修改；改以jf_ShowModal開啟子視窗，MARK此部分--End--

function ReplaceParamStrForOrgNo(argParamStr, argOrgNo)
{
    if (argParamStr == "")
        return "";
    if (typeof (argOrgNo) == "undefined" || argOrgNo == "")
        return argParamStr;

    var ret = "";
    var bStartWithQ = argParamStr.indexOf("?") == 0;
    if (bStartWithQ)
        argParamStr = argParamStr.replace("?", "");
    if (bStartWithQ)
        ret = "?";

    var bHasOrgNoParam = false;
    var arrPara = argParamStr.split("&");
    for (var i = 0; i < arrPara.length; i++)
    {
        var arrOnePara = arrPara[i].split("=");
        if (arrOnePara[0].toUpperCase() == "nOrgNo".toUpperCase())
        {
            arrOnePara[1] = argOrgNo;
            bHasOrgNoParam = true;
        }
        if (i != 0)
            ret += "&";
        ret += arrOnePara[0] + "=" + arrOnePara[1];
    }
    if (bHasOrgNoParam == false)
        ret += "&nOrgNo=" + argOrgNo;
    return ret;
}

function GetAllParamStr()
{
    var strParam = "";
    var pUrl = unescape(this.location);
    if (pUrl != -1)
    {
        var i = pUrl.indexOf("?");
        if (i != -1)
            strParam = pUrl.substr(i);
    }
    return strParam;
}
function GetElement(argStr, argIdx)
{
    var SPLIT = "|";
    var ss = argStr.split(SPLIT);
    return ss[argIdx];
}


//1010605	Leslie[1010506]	由IIM300複製至此
function ExpiresStatusChange()
{
    //1111130	Joe		1111367		滲透測試修改
    if (mode == "2")
    {
        if (document.all["rbAccountExpires"].checked)
        {
            document.all["txAccountExpires"].disabled = false;
            document.all["ibDateS"].disabled = false;
        }
        else
        {
            document.all["txAccountExpires"].disabled = true;
            document.all["ibDateS"].disabled = true;
        }
    }
}

//1050726	Kenny   [1050087]	二代公文系統相關修改--Start--
function IsRationalValue(val)
{
    if (val == undefined)
        return false;
    if (val == null)
        return false;
    return true;
}
//1050726	Kenny   [1050087]	二代公文系統相關修改--End--

//1070817 Zen 1070678 弱掃XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

//1140616 Kevin 1140473 退輔會前端介接、新增行動電話、職等
function GetVacEipInfo()
{
    var arWSParam = new Array(1);
    //1140819 Kevin 1140473 改為HR介接
    //arWSParam[0] = document.all.txUserNid.value;
    arWSParam[0] = document.all["dlOrgno"].value;
    arWSParam[1] = document.all.txUserNid.value;

    if (arWSParam[0] == '')
        return;

    //1140819 Kevin 1140473 改為HR介接
    //var wsRet = jf_CallWA('../../VAC/GetEipInfo.asmx', "GetEipAccInfo", false, arWSParam, true);
    var wsRet = jf_CallW('../../VAC/GetEipInfo.asmx', "GetHrAccInfo", false, arWSParam, true);

    if (wsRet.value.ErrMsg == '')
    {
        //1140819 Kevin 1140473 改為HR介接
        document.all.txName.value = wsRet.value.Empname;
        document.all.txOfficePhone.value = wsRet.value.Tel;
        document.all.txExt.value = wsRet.value.Ext;
        document.all.txEmail.value = wsRet.value.Email;
        document.all.txTitle.value = wsRet.value.Title;
    }
    else
    {
        //1140819 Kevin 1140473 改為HR介接
        //alert("叫用EIP失敗:" + wsRet.value.ErrMsg);
        alert("查詢失敗:" + wsRet.value.ErrMsg);
        return;
    }
}
//1140811   Andy    1140917 新增帳號上傳附件功能 
var WaitUpLoadFiles = [];
function fnAddFile()
{
    var fileInput = document.querySelector('input[type="file"][id$="fileInput"]');
    var currentFile = fileInput.files[0];
    var strFileName = currentFile.name;
    //1141223   Andy    1141162     新增檔案大小檢核
    var nFileSize = currentFile.size;
    var strSizeErr = "";

    //檔名格式驗證
    if (!CheckAllowAtt(strFileName))
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["上傳之檔案並非PDF格式，無法加入。"])), "");
        fileInput.value = "";
        return;
    }
    //1141223   Andy    1141162     新增檔案大小檢核
    if (nFileSize != 0)
        nFileSize = Math.ceil(nFileSize / 1024);
    var nFileSizeLimit = (document.all["TB_FILE_SIZE_LIMIT"].value == "") ? 0 : parseInt(document.all["TB_FILE_SIZE_LIMIT"].value, 10);
    if (nFileSizeLimit < nFileSize) {
        strSizeErr += strFileName + "(檔案大小" + nFileSize + "KB)";
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strSizeErr + "，已超過檔案大小上限[" + nFileSizeLimit + "KB]\n故無法選擇此檔。"])), "");
        return;
    }
    //Sever儲存區檔案是否重複驗證
    var rtnBool = IF1.IFM301.CheckFileExists(document.all["dlOrgno"].value, document.all.txAccount.value, strFileName);
    if (rtnBool.value)
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["檔案儲存區已有相同檔名之檔案存在，無法加入。"])), "");
        fileInput.value = "";
        document.getElementById("btFileChange").focus();
        return;
    }

    fnAddAttach(strFileName);
    WaitUpLoadFiles.push(strFileName);
}
//1140811   Andy    1140917 新增帳號上傳附件功能 
//新增加入附件
function fnAddAttach(argFileName)
{
    if (document.getElementById("txFileName").value != "")
    {
        if (document.getElementById("H_FileDel").value != "")
            document.getElementById("H_FileDel").value += "|" + document.getElementById("txFileName").value;
        else
            document.getElementById("H_FileDel").value += document.getElementById("txFileName").value;
    }
    document.getElementById("txFileName").value = argFileName;
    document.getElementById("btFileOpen").className = "";
    document.getElementById("btFileChange").value = "更換";
    document.getElementById("btFileDelete").className = "";
}
//1140811   Andy    1140917 新增帳號上傳附件功能 
//檔案格式檢驗
function CheckAllowAtt(argFilename)
{
    var blAllow = false;
    var arrAllowAtt = "PDF";

    var File = argFilename.split('.').pop().toUpperCase();

    if (arrAllowAtt.includes(File))
    {
        blAllow = true;
    }

    return blAllow;
}
function base64EncodeUnicode(str)
{
    return btoa(unescape(encodeURIComponent(str)));
}
//1140811   Andy    1140917 新增帳號上傳附件功能 
//下載檔案
function fnFileDownload()
{

    var strFileIOWS = document.getElementById("H_WebService").value;
    var strFilePath = document.getElementById("H_StartPath").value;
    var strArtifact = document.getElementById("H_Artifact").value;
    var strFileName = document.getElementById("txFileName").value;
    var fileInput = document.querySelector('input[type="file"][id$="fileInput"]').files[0];
    var url = "/odtools/docatt.ashx?DocNo=IFM301&SAMLart=" + strArtifact + "&FileIOWS=" + strFileIOWS + "&FilePath=" + base64EncodeUnicode(strFilePath) + "&FileName=" + base64EncodeUnicode(strFileName);


    if (fileInput)
    {
        var fileURL = URL.createObjectURL(fileInput);
        window.open(fileURL);
    }
    else
    {
        window.open(url);
    }

}
//1140811   Andy    1140917 新增帳號上傳附件功能 
function fnDeleteAttachItem()
{

    //Page_BlockSubmit = true;
    //先刪除資料

    var strDelFileName = "";
    var spanFileName = document.getElementById("txFileName").value;

    strDelFileName = spanFileName;

    if (document.getElementById("H_FileDel").value != "")
        document.getElementById("H_FileDel").value += "|" + strDelFileName;
    else
        document.getElementById("H_FileDel").value += strDelFileName;

    document.getElementById("txFileName").value = "";

    document.getElementById("btFileOpen").className = "hide";
    document.getElementById("btFileChange").value = "檔案";
    document.getElementById("btFileDelete").className = "hide";

    if (WaitUpLoadFiles.includes(strDelFileName))
    {
        var index = WaitUpLoadFiles.indexOf(strDelFileName);
        WaitUpLoadFiles.splice(index, 1);
    }

    document.querySelector('input[type="file"][id$="fileInput"]').files[0] = "";
}

//1140919 Zen 1141127 新增帳號帳號啟用、停用日期欄位
function CheckDate(argObj, argMsg, argFromTbtool, argLength) 
{
    let strErrMsg = '';
    let strDate = $('#' + argObj).val();
    if (strDate != '')
    {
        if (strDate.length < argLength) 
        {
            strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
            $('#' + argObj).val(strDate);
        }

        if (!jf_CheckCDATE(strDate)) 
        {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
        }
    }
    return strErrMsg;
}