/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* 程式修改歷程 
* -------------------------------------------------------------------------------------------------
* 日期			系統分析師	修改人	單號			概要
* -------------------------------------------------------------------------------------------------
* 100.09.27		kevin		Cloud	1000789			修改以combobox取代textbox帶出代理人及被代理人資料並以登入者資訊取得機關代碼
* 103.11.12	    Leslie		Kevin_C	1020726			於__doPostBack前加上IsServerHandling=true,避免重複執行
//1051121       David       Zen     1050087         二代公文修改
* 1081211       Kevin       Zen     1081023         新增權限檢核及類別查詢條件
* 1090107		Kevin_C		Joe		1081095			修正JS使用函式避免IE不支援導致程式判斷錯誤
* 1100604       Kevin       Zen     1100484         重新定義類別判斷邏輯及新增明細欄位
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//1051121 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //10000789 1000927 修改以combox取代textbox帶出代理人及被代理人資料
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_User"].value = document.all["dlUser_Text"].value;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
    document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
    document.all["H_Deptp"].value = document.all["dlDeptp_Text"].value;
    document.all["H_Sectp"].value = document.all["dlSectp_Text"].value;
    document.all["H_Userp"].value = document.all["dlUserp_Text"].value;
    document.all["H_Deptp_Value"].value = edjf_GetSelectValue(document.all["dlDeptp"], document.all["H_Deptp"].value);
    document.all["H_Sectp_Value"].value = edjf_GetSelectValue(document.all["dlSectp"], document.all["H_Sectp"].value);
    document.all["H_Userp_Value"].value = edjf_GetSelectValue(document.all["dlUserp"], document.all["H_Userp"].value);
    document.all["H_dlSectp_Value"].value = edjf_SaveCurrDL(document.all["dlSectp"]);
    document.all["H_dlUserp_Value"].value = edjf_SaveCurrDL(document.all["dlUserp"]);
    //無值不顯示
    jf_HandleComboxStatus("dlSect");
    jf_HandleComboxStatus("dlSectp");
    jf_HandleComboxStatus("dlUser");
    jf_HandleComboxStatus("dlUserp");
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051121 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051121 Zen 1050087 二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btDocData"));
    var btDocData;

    var pNo1 = xObjectName.substring(8, xObjectName.indexOf("_btEDocP"));
    var btEDocP;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btDocData"] != null)
    {
        btDocData = document.all["dg1__ctl" + pNo + "_btDocData"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }
    else if (document.all["dg1__ctl" + pNo1 + "_btEDocP"] != null)
    {
        btEDocP = document.all["dg1__ctl" + pNo1 + "_btEDocP"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo1 + "_txInput1"];
    }

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
        case btDocData:
            //jf_OpenDetDocWin("../../../AK/AKI888.ASPX?SourceOrgno=301060000C&DocNo="+document.all["dg1__ctl" + pNo + "_lbDOC_NO"].innerText+"&SAMLart="+document.all.txArtifact.value);
            //10000789 1000927 Cloud 修改以隱藏欄位取得機關代碼
            //1051121 Zen 1050087 二代公文修改
            //jf_OpenDetDocWin(document.all["H_ChildWinPath"].value + "?SourceOrgno=" + document.all["H_SourceOrgno"].value + "&DocNo=" + document.all["dg1__ctl" + pNo + "_lbDOC_NO"].innerText + "&SAMLart=" + document.all["txArtifact"].value);
            jf_OpenDetDocWin(document.all["H_ChildWinPath"].value + "?SourceOrgno=" + document.all["H_SourceOrgno"].value + "&DocNo=" + document.all["dg1__ctl" + pNo + "_lbDOC_NO"].textContent + "&SAMLart=" + document.all["txArtifact"].value);
            break;
        case btEDocP:
            //1051121 Zen 1050087 二代公文修改--begin
            //document.all["txFROM_SUBJECT"].value = document.all["dg1__ctl" + pNo1 + "_lbFROM_SUBJECT"].innerText;
            //document.all["txDOC_NO"].value = document.all["dg1__ctl" + pNo1 + "_lbDOC_NO"].innerText;
            document.all["txFROM_SUBJECT"].value = document.all["dg1__ctl" + pNo1 + "_lbFROM_SUBJECT"].textContent;
            document.all["txDOC_NO"].value = document.all["dg1__ctl" + pNo1 + "_lbDOC_NO"].textContent;
            //1051121 Zen 1050087 二代公文修改--end
            //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
            IsServerHandling = true;
            jf_ShowWaitState()
            //1051121 Zen 1050087 二代線上瀏覽--begin
            var strArtifact = encodeURI(document.all.txArtifact.value);
            var strDocNo = encodeURI(document.all.txDOC_NO.value);
            var strOrgNo = encodeURI(document.all.H_SourceOrgno.value);
            DownloadDocument(strArtifact, strDocNo, strOrgNo);
            //1051121 Zen 1050087 二代線上瀏覽--end
            __doPostBack("", "");
            break;
        case "ibDateS":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txDateS, event.screenX, event.screenY);
            break;
        case "ibDateE":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txDateE, event.screenX, event.screenY);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051121 Zen 1050087 二代公文修改
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

    //1051121 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            if (jf_CheckBeforOpen()) //是否通過開啟前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1051121 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1051121 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1051121 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下開啟鍵後相關處理 **********/
//開啟前之欄位檢查
function jf_CheckBeforOpen()
{
    var bRtnbool = true;
    var strErrMsg = "";

    //if (document.all["txAccountP"].value == "" && document.all["txAccount"].value == "")
    //10000789 1000927 Cloud修改以combobox取代textbox帶出代理人及被代理人資料
    if (document.all["H_User_Value"].value == "" && document.all["H_Userp_Value"].value == "")
    {
        strErrMsg += "被代理人、代理人不可皆為空白\n";
        //document.all["txAccountP"].focus();
        //1051121 Zen 1050087 二代公文修改
        //document.all["H_User_Value"].focus();
        $('#H_User_Value').focus();
    }

    var strDateS = document.all["txDateS"].value;
    var strDateE = document.all["txDateE"].value;
    if (strDateS == "" && strDateE == "")
        strErrMsg += "代理期間不可為空白\n";
    else if (strDateS == "" || strDateE == "")
    {
        if (document.all["txDateE"].value != "")
            document.all["txDateS"].value = document.all["txDateE"].value;
        else if (document.all["txDateS"].value != "")
            document.all["txDateE"].value = document.all["txDateS"].value;
    }
    else if (strDateS > strDateE)
    {
        document.all["txDateS"].value = strDateE;
        document.all["txDateE"].value = strDateS;
    }

    //1081211 Zen 1081023 新增權限檢核及類別查詢條件
    var dlUser = '';
    var dlUserp = '';
    if (document.all['dlUser'].selectedIndex != -1)
		//1090107	Joe		1081095		修正取選單值的函式，避免IE不支援
        // dlUser = document.all['dlUser'].selectedOptions[0].text;
        dlUser = document.all.dlUser.options[document.all.dlUser.selectedIndex].text;
    if (document.all['dlUserp'].selectedIndex != -1)
		//1090107	Joe		1081095		修正取選單值的函式，避免IE不支援
        // dlUserp = document.all['dlUserp'].selectedOptions[0].text
        dlUserp = document.all.dlUserp.options[document.all.dlUserp.selectedIndex].text;

    if (document.all['H_HasII0002'].value == 'N' && !(document.all['H_Username'].value == dlUser || document.all['H_Username'].value == dlUserp))
        strErrMsg += "被代理人、代理人需至少有一欄位為當前帳號。\n";

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//10000789 1000927 Cloud修改以combobox取代textbox帶出代理人及被代理人資料
//function CallGetAccountName(argAccountId, argNameId)
//{

//var sArt = document.all.txArtifact.value;
//var sAuthws = document.all.authWS.value;

//if(sArt == "" || sAuthws == "")
//return;
//document.all[argAccountId].value = jf_Trim(document.all[argAccountId].value);
//if(document.all[argAccountId].value == "")
//{
//document.all[argNameId].value = "";
//return;
//}

//var param = new Array(2);
//param[0] = sArt;
//param[1] = document.all[argAccountId].value;
//var result = jf_CallW(sAuthws, "GetAccountName", false , param);
//if(result.error == false)
//{
//if(result.value == "")
//{
//document.all[argAccountId].value = "";
//document.all[argNameId].value = "";
//document.all[argAccountId].focus();
//alert("帳號不存在。");
//}
//else
//{
//document.all[argNameId].value = result.value;
//}
//}
//else
//alert(result.errorDetail.string);
//}

function CheckDate(id, str)
{
    var strDateValue;
    strDateValue = document.all[id].value;
    if (strDateValue == "")
    {
        return;
    }

    strDateValue = jf_PADL(strDateValue, 7, "0");
    document.all[id].value = strDateValue;
    if (!jf_CheckCDATE(strDateValue))
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([str])), "");
        document.all[id].value = "";
        //1051121 Zen 1050087 二代公文修改
        //document.all[id].focus();
        $('#' + id).focus();
    }
}
//1000789 1000928 Cloud Cloud修改以combobox帶出代理人及被代理人資料
//function jf_SetProxy(argAccountId, argNameId)
//{
//Page_BlockSubmit=true;
//var arrSelectType = new Array(1);
//arrSelectType[0] = "Account";
//var ret = jf_ShowOrgDialogByLevel(0, arrSelectType);
//if(ret!=null)
//{
//document.all[argAccountId].value		= ret.Code;
//document.all[argNameId].value			= ret.Name;
//}	
//}

//function jf_SetProxyP(argAccountId, argNameId)
//{
//Page_BlockSubmit=true;
//var arrSelectType = new Array(1);
//arrSelectType[0] = "Account";
//var ret = jf_ShowOrgDialogByLevel(0, arrSelectType);
//if(ret!=null)
//{
//document.all[argAccountId].value		= ret.Code;
//document.all[argNameId].value			= ret.Name;
//}	
//}
function jf_OpenDetDocWin(sUrl)
{
    //1051121 Zen 1050087 二代公文修改
    //DetDocWin = open(sUrl, "SumDocWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    //DetDocWin.focus();
    jf_OpenChildWin(sUrl, "AKI888", 800, 600);
}
//10000789 1000927 Cloud修改以combobox取代textbox帶出代理人及被代理人資料
//ComboBox 處理
function dlDept_Text_onblur(act)
{
    var dlUser = "dlUser";
    var H_User = "H_User";
    var dlSect = "dlSect";
    var H_Sect = "H_Sect";
    var dlDept = "dlDept";
    var H_dlUser = "H_dlUser";
    var H_Dept = "H_Dept";
    var H_dlSect = "H_dlSect";
    //1000789 1000927 Cloud 如果act不為1擇為代理人
    if (act != 1)
    {
        dlUser += "p";
        H_User += "p";
        dlSect += "p";
        H_Sect += "p";
        dlDept += "p";
        H_dlUser += "p";
        H_Dept += "p";
        H_dlSect += "p";

    }
    var bCheckOK = true;
    if (document.all[dlDept + "_Text"].value != document.all[H_Dept].value)
    {
        //呼叫ED_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck(dlDept, "承辦單位"))
        {
            //存ComboBox_Text的value
            document.all[H_Dept].value = document.all[dlDept + "_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all[H_Dept + "_Value"].value = edjf_GetSelectValue(document.all[dlDept], document.all[H_Dept].value);

            //先顯示二級單位選項 避免隱藏不調整
            //1051121 Zen 1050087 二代公文修改
            //document.all[dlSect + "_Container"].className = "InputFieldText";
            document.all[dlSect + "_Container"].className = "custom-combobox";
            edjf_SetdlDept(dlDept, dlSect, dlUser, "", false, false);	//初始dlSect、dlUser的處理

            document.all[H_Sect].value = document.all[dlSect + "_Text"].value;
            document.all[H_User].value = document.all[dlUser + "_Text"].value;
            document.all[H_Sect + "_Value"].value = edjf_GetSelectValue(document.all[dlSect], document.all[H_Sect].value);
            document.all[H_User + "_Value"].value = edjf_GetSelectValue(document.all[dlUser], document.all[H_User].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all[H_dlSect + "_Value"].value = edjf_SaveCurrDL(document.all[dlSect]);
            document.all[H_dlUser + "_Value"].value = edjf_SaveCurrDL(document.all[dlUser]);

            //依選項多寡固定下拉式選單可見長度
            if (document.all[dlSect].options.length > 10)
                document.all[dlSect].size = 10;
            else if (document.all[dlSect].options.length == 1)
                document.all[dlSect].size = 2;
            else
                document.all[dlSect].size = document.all[dlSect].options.length;

            if (document.all[dlUser].options.length > 10)
                document.all[dlUser].size = 10;
            else if (document.all[dlUser].options.length == 1)
                document.all[dlUser].size = 2;
            else
                document.all[dlUser].size = document.all[dlUser].options.length;

            //無值不顯示
            jf_HandleComboxStatus(dlSect);
            jf_HandleComboxStatus(dlUser);

        }
        else
            bCheckOK = false;
    }
    return bCheckOK;

}

function dlSect_Text_onblur(act)
{
    var dlUser = "dlUser";
    var H_User = "H_User";
    var dlSect = "dlSect";
    var H_Sect = "H_Sect";
    var dlDept = "dlDept";
    var H_dlUser = "H_dlUser";
    //1000789 1000927 Cloud 如果act不為1則為代理人
    if (act != 1)
    {
        dlUser += "p";
        H_User += "p";
        dlSect += "p";
        H_Sect += "p";
        dlDept += "p";
        H_dlUser += "p";
    }

    var bCheckOK = true;
    //值若變更時作處理
    if (document.all[dlSect + "_Text"].value != document.all[H_Sect].value)
    {
        //呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck(dlSect, "承辦科別"))
        {
            //存ComboBox_Text的value
            document.all[H_Sect].value = document.all[dlSect + "_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all[H_Sect + "_Value"].value = edjf_GetSelectValue(document.all[dlSect], document.all[H_Sect].value);

            edjf_SetdlSect(dlDept, dlSect, dlUser, "", false, true);	//初始化承辦人選單

            document.all[H_User].value = document.all[dlUser + "_Text"].value;
            document.all[H_User + "_Value"].value = edjf_GetSelectValue(document.all[dlUser], document.all[H_User].value);
            document.all[H_dlUser + "_Value"].value = edjf_SaveCurrDL(document.all[dlUser]);

            if (document.all[dlUser].options.length > 10)
                document.all[dlUser].size = 10;
            else if (document.all[dlUser].options.length == 1)
                document.all[dlUser].size = 2;
            else
                document.all[dlUser].size = document.all[dlUser].options.length;
            jf_HandleComboxStatus(dlUser);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;


}

function dlUser_Text_onblur(act)
{
    var dlUser = "dlUser";
    var H_User = "H_User";
    //1000789 1000927 Cloud 如果act不為1則為代理人
    if (act != 1)
    {
        dlUser += "p";
        H_User += "p";
    }

    var bCheckOK = true;
    //值若變更時作處理
    if (document.all[dlUser + "_Text"].value != document.all[H_User].value)
    {
        //呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck(dlUser, "承辦人"))
        {
            document.all[H_User].value = document.all[dlUser + "_Text"].value;

            document.all[H_User + "_Value"].value = edjf_GetSelectValue(document.all[dlUser], document.all[H_User].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;

}
//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        //1051121 Zen 1050087 二代公文修改
        //document.all[argComboxID + "_Container"].className = "InputFieldText";
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}
//1051121 Zen 1050087 二代線上瀏覽
function DownloadDocument(argArt, argDocNo, argOrgNo)
{
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;

    try
    {
        var wsUrl = opener.theWebServices.url('fileiows');
        var param = [];
        param[0] = artifact;
        param[1] = strDocNo;
        param[2] = strOrgNo;

        var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
        if (!rtnObj.error)
        {
            if (rtnObj.value.m_bSuccess)
            {
                var sUnvObj = rtnObj.value.RtnStr;
                if (sUnvObj !== "")
                {
                    var UnvObj = JSON.parse(sUnvObj);
                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "AKI802",
                        openDocModule: 'AOL',
                        signType: 'E',
                        readOnlyMode: true
                    };
                    var $docId = jf_GetSessionID() + "_" + (+new Date());
                    localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                    var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
                    jf_OpenChildWin(unvUrl, "ODT251ViewDoc");
                }
            }
            else
            {
                alert(rtnObj.value.m_strErrMsg);
            }
        }
        else
        {
            alert(rtnObj.error.errorDetail.string)
        }
    }
    catch (e)
    {
        alert('開啟失敗');
    }
}

//1100604 Zen 1100484 支援點擊明細區標頭替當前資料排序
function RecordSortType(argSortType)
{
    document.all['H_txSortType'].value = argSortType;
    document.all['btOpen'].click();
}
