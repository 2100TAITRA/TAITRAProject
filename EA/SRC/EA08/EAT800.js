/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
0981203	--		Albert	0980336		不再自網址參數取得Artifact
1051121	Cloud   Kenny	1050087	    二代公文系統相關修改
1061103	Kevin	Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1080423	Cloud	Kevin_C	1080047		增加字數檢核
1110103 Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1140331 Cloud   Cloud   1140331     增加支援設定到人
*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1051121	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051121	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //1140331 Cloud     1140331     增加支援設定到人-僅退輔會支援離職人員
    if (document.all["H_txOrgNickName"].value == "VAC") {
        document.all["lbTouser"].textContent = "人員：(";
        document.all["rbLeave"].className = "";
        document.all["rbOnWork"].className = "";
        ShowPerson("rbLeave");
    }
    else {
        document.all["lbTouser"].textContent = "人員：";
        document.all["rbOnWork"].checked = true;
        document.all["rbOnWork"].className = "hide";
        document.all["rbLeave"].className = "hide";
    }
        
    
    
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051121	Kenny   [1050087]	二代公文系統相關修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051121	Kenny   [1050087]	二代公文系統相關修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case 'btKeyHelp':
            Page_BlockSubmit = true;
            //新增模式下才可查詢
            if (jf_GetActionMode() == LayoutModeNew && !document.all["txAppno"].readOnly)
            {
                var strUrl = "";
                var strSearch = jf_Trim(document.all.txAppno.value);
                strUrl = "EAT802.aspx?FROM=EAT800&APPLY_TYPE=01&rtnObj=lbReturnValue";
                //1051121	Kenny   [1050087]	二代公文系統相關修改
                //jf_OpenChildWin(strUrl, "EAT800", 700, 500 );
                jf_OpenChildWin(strUrl, "EAT800", 800, 600);
            }
            break;
            //1051121	Kenny   [1050087]	二代公文系統相關修改--Start--
            //case 'btCalendar':
            //	Page_BlockSubmit=true;
            //	jf_CallCalendar(document.all["txAppDate"], event.screenX, event.screenY);
            //	break;
            //1051121	Kenny   [1050087]	二代公文系統相關修改--End--
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051121	Kenny   [1050087]	二代公文系統相關修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1051121	Kenny   [1050087]	二代公文系統相關修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1051121	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1051121	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1051121	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1051121	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(false);
            document.all["rbInSect"].checked = true;
            document.all["rbDueDate0"].checked = true;

            break;
            //1051121	Kenny   [1050087]	二代公文系統相關修改；無此按鍵，移除
            //case "btSearch":
            //	var strUrl = "";
            //	var strSearch = jf_Trim(document.all.txAppno.value);
            //	strUrl = "EAT802.aspx?FROM=EAT800&APPLY_TYPE=01&rtnObj=lbReturnValue";
            //	jf_OpenChildWin(strUrl, "EAT800", 700, 500 );
            //	break;
        case "btTransfer":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            var ddlIdx = 4;
            //1051121	Kenny   [1050087]	二代公文系統相關修改--Start--
            //var nextOpt = GetToolbarCtrl(ddlIdx);
            //if(nextOpt==null)
            //	alert('null');
            //1051121	Kenny   [1050087]	二代公文系統相關修改--End--
            //CAESAR DEBUGGING CODE
            /*
			var aOptions = nextOpt.getOptions();	
				alert(aOptions.value);
				alert(aOptions.selectedIndex);
				if(aOptions!=null)
				{
					alert(aOptions[0].innerText);
					alert(aOptions[0].value);
				}
			
			*/
            //1051121	Kenny   [1050087]	二代公文系統相關修改--Start--
            //var aOptions = nextOpt.getOptions();
            //document.all.SelectedUser.value = aOptions.value;
            //document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;
            //jf_ToolBarSubmit();

            if (document.all.ddlNextUser.options.length != 0)
            {
                document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
                var strOuName = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text.split('-')[0];
                var strRoleName = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text.split('-')[2];
                var strID = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value.split('|')[0];
                document.all.SelectedUser2.value = strOuName + "--" + strRoleName + "--" + strID;
            }
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            //1051121	Kenny   [1050087]	二代公文系統相關修改--End--
            break;
        case "btCheck":
            Page_BlockSubmit = false;
            //1051121	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearchFlow":
            //1051121	Kenny   [1050087]	二代公文系統相關修改；加入Page_BlockSubmit
            Page_BlockSubmit = true;
            if (jf_CheckKeyObject())
            {
                var strOrgNo = jf_Trim(document.all.H_txOrgNo.value);
                var strApplyNo = document.all.txAppno.value;
                //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
                //0981203	Albert	0980336	不再自網址參數取得Artifact
                //var strArtifact = fnGetArtifact();
                var strArtifact = document.all.SsoArtifact.value;
                strUrl = "../../../ED/ED2/EDI200.aspx?SOURCE_ORGNO=" + strOrgNo + "&argMsgFrom=EAT800&argMsgFromId=" + strApplyNo + "&SAMLart=" + strArtifact;
                //1051121	Kenny   [1050087]	二代公文系統相關修改
                //jf_OpenChildWin(strUrl, "EDI200", 700, 500 );
                jf_OpenChildWin(strUrl, "EDI200", 800, 600);
            }
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
            //if(jf_CheckDataExist(""))//檢查鍵值是否已存在
            //{
            //	if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
            //		bRtnbool = true;
            //}
            //else
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

    if (document.all["txAppreason"].value == "")
    {
        strErrMsg += "申請原因不可空白";
        //1051121	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txAppreason"].focus();
        $('#txAppreason').focus();
    }
    else if (document.all["rbDueDate1"].checked)
    {
        if (!jf_CheckCDATE(document.all["txForEverDate"].value))
        {
            strErrMsg += "申請有效期限格式不正確";
            //1051121	Kenny   [1050087]	二代公文系統相關修改
            //document.all["txForEverDate"].focus();
            $('#txForEverDate').focus();
        }
    }
        /*
        else if (document.all.dlPrivNo.value==document.all.Priv_Level.value)
        {
            //var PrivName = document.all["dlPrivNo"].value;
            var PrivName = document.all["dlPrivNo"].options[(document.all["dlPrivNo"].selectedIndex)].text;
            strErrMsg += "您目前的調檔權限已為["+ PrivName +"],不需要申請";
        }*/
    else if (document.all["rbInSect"].checked)
    {
        if (Number(document.all.Priv_Level.value) > 1)
        {
            var PrivName = document.all["dlPriv"].options[document.all.Priv_Level.value].text;
            strErrMsg += "您目前的調檔權限已為[" + PrivName + "],不需要申請";
        }
    }
    else if (document.all["rbCrossSect"].checked)
    {
        if (document.all["dlPrivNo"].options[(document.all["dlPrivNo"].selectedIndex)].text != "")
        {
            if (Number(document.all.Priv_Level.value) > 2 && Number(document.all.Priv_Level.value) != 3)
            {
                var PrivName = document.all["dlPriv"].options[document.all.Priv_Level.value].text;
                strErrMsg += "您目前的調檔權限已為[" + PrivName + "],不需要申請";
            }
        }
        else
            strErrMsg += "請選取所要調檔之科室";
    }

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
    if (argCallerId == "EAT802")
    {
        document.all["txAppno"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        if (document.all["txAppno"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
    }


    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function GetToolbarCtrl(argId)
{
    return document.all.tbTool.getItem(argId);
    for (var i = 0; i < 20; i++)
    {
        var o = document.all.tbTool.getItem(i);
        if (o != null)
        {
            alert(o.getAttribute("ID"));
            if (o.getAttribute("ID") == argId)
                return o;
        }
    }
    return null;
}
//常用申請原因
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1051121	Kenny   [1050087]	二代公文系統相關修改
    //var val		= document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent
    document.all["txAppreason"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    //1051121	Kenny   [1050087]	二代公文系統相關修改
    //document.all["txAppreason"].focus();
    $('#txAppreason').focus();
}

//0981203 Albert 0980336 以下fn已不使用
/*
//取得網址列中的Artifact
function fnGetArtifact()
{
	var str = document.location.href;	
	var SAMLartStr = "";
	if (str.indexOf("?") != -1)
	{	
		var arr = str.split("?");
		str = arr[arr.length-1];
		var idx = str.indexOf("SAMLart=");


		var endx = str.lastIndexOf("#")
		if(endx==-1)
			str = str.substring(idx, str.length).replace("SAMLart=", "");
		else
			str = str.substring(idx,endx).replace("SAMLart=", "");
		idx = str.indexOf("&");
		if (idx == -1)
			idx = str.length;
		str = str.substring(0, idx);
		SAMLartStr = str;
	}
   return SAMLartStr;
}
*/
//1080423	Kevin_C	1080047	增加字數檢核 -S
function isMaxLength(obj,argText,argMaxNum)
{
	var nMaxNum = parseInt(argMaxNum);
    if (obj.value.length == nMaxNum)
    {
		var nCode = parseInt(event.keyCode);
        if (nCode != 8 && nCode!=9 && nCode != 13 && nCode != 16 && nCode != 46 && (nCode < 33 || nCode > 40))
		{
            event.returnValue = false;
			jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
		}
    } else if (obj.value.length > nMaxNum)
    {
        bHasCheck = true;
        jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
        bHasCheck = false;
        obj.value = obj.value.substring(0, nMaxNum)
    }
}
//1080423	Kevin_C	1080047	增加字數檢核 -E
//1130331   Cloud  1131294 增加支援設定到人
function jf_DeptCheck(argDeptID, argUserID) {
    var DeptObj = document.all[argDeptID];
    var i, j, len;

    var val = DeptObj.value;

    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, val);

    var resultObj = null;
    if (callObj.error) {
        alert(callObj.errorDetail.string);
    }
    else {
        if (jf_IsWebServiceSuccess(callObj))
            resultObj = callObj.value;
    }

    var UserObj = document.all[argUserID];
    
    //clear the ComboBox of User
    var len = UserObj.length;
    for (i = 0; i < len; i++)
        UserObj.remove(0);
    document.all["h_dlEmpList"].value = "";
    //add new data into the ComboBox of User
    len = resultObj.UserName.length;
    UserObj.options.add(new Option("", ""));
    for (i = 0; i < len; i++) {
        var objOption = new Option(resultObj.EmpName[i], resultObj.UserName[i]);
        document.all["h_dlEmpList"].value += resultObj.EmpName[i]+";"+resultObj.UserName[i]+"|";
        UserObj.options.add(objOption);
    }
}
function GetLeaveEmp() {
    if (document.all["txleaveEmpName"].value != "") {
        var RtnObj = EA08.EAT800.GetLeavePerSon(document.all["H_txOrgNo"].value, document.all["txleaveEmpName"].value).value;
        if (RtnObj.indexOf("ERR") != -1) {
            alert(RtnObj);
        }
        else {
            document.all["H_SaveEmpList"].value = RtnObj;
        }
    }
    else {
        document.all["H_SaveEmpList"].value = "";
    }

}
function ShowPerson(argId) {
    if (argId == "rbLeave") {
        document.all["dlEmpName"].className = "hide";
        document.all["txleaveEmpName"].className = "";
        document.all["dlEmpName"].selectedIndex = 0;
    }
    else {
        document.all["dlEmpName"].className = "";
        document.all["txleaveEmpName"].className = "hide";
        document.all["H_SaveEmpList"].value = "";
        document.all["txleaveEmpName"].value = "";
    }
}
function dlUserChange() {
    document.all["h_dlSelectEmp"].value = document.all["dlEmpName"].options[document.all["dlEmpName"].selectedIndex].text;
    document.all["h_dlSelectUser"].value = document.all["dlEmpName"].options[document.all["dlEmpName"].selectedIndex].value;
}