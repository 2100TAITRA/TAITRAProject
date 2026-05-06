/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
0981203			Albert	0980336		修改不再自網址參數取得Artifact
1050804	Cloud   Kenny	1050087	    二代公文系統相關修改
1051019	Leslie	Joe		1050087 	二代修改配合行動平台
1061103 Kevin   Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
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

//1050804	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050804	Kenny   [1050087]	二代公文系統相關修改；取消無用CODE
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    if (document.all.Completed != null)
    {
        if (document.all.Completed.value.toUpperCase() == "Y")
            window.close();
    }
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

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
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
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050804	Kenny   [1050087]	二代公文系統相關修改
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

    //1050804	Kenny   [1050087]	二代公文系統相關修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id

    switch (xObjectName)
    {
        case "btBack":
            if (jf_ConfirmSave())
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050804	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCommit":
            if (jf_ConfirmSave())
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050804	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
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
            //1050804	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
            //1050804	Kenny   [1050087]	二代公文系統相關修改；已無此按鈕，一併移除--Start--
            //case "btCheck":
            //	Page_BlockSubmit = false;
            //	jf_ToolBarSubmit();
            //	break;
            //1050804	Kenny   [1050087]	二代公文系統相關修改；已無此按鈕，一併移除--End--
        case "btSearchFlow":
            var strUrl = "";
            var WebServerName = jf_Trim(document.all.H_WebServer.value);
            var strOrgNo = jf_Trim(document.all.nSourceOrgno.value);
            var strBorNo = document.all.txBorNo.value;
            //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
            //var strArtifact = fnGetArtifact();
            //0981203	Albert	0980336	不再自網址參數取得Artifact
            var strArtifact = document.all.SsoArtifact.value;
            strUrl = "http://" + WebServerName + "/ED/ED2/EDI200.aspx?SOURCE_ORGNO=" + strOrgNo + "&argMsgFrom=EAT310&argTargetNo=" + strBorNo + "&SAMLart=" + strArtifact;
            jf_OpenChildWin(strUrl, "EDI200", 700, 500);
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
    /*
	if (jf_Trim(document.all["txReborCode"].value) == "")
	{
		strErrMsg += "[審核意見]欄位不可空白\n";
		document.all["txReborCode"].focus();
	}
	*/

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    else
    {
        //1050804	Kenny   [1050087]	二代公文系統相關修改--Start--
        //var ddlIdx=3;
        //var nextOpt = GetToolbarCtrl(ddlIdx);
        //if(nextOpt==null)
        //	alert('null');
        //var aOptions = nextOpt.getOptions();
        //if(aOptions.length != 0)
        //{
        //	document.all.SelectedUser.value = aOptions.value;
        //	document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;
        //}
        if (document.all.ddlNextUser.options.length != 0)
        {
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
        }
        //1050804	Kenny   [1050087]	二代公文系統相關修改--End--
    }

    return bRtnbool;
}

//1050804	Kenny   [1050087]	二代公文系統相關修改--Start--
//function GetToolbarCtrl(argId)
//{
//	return document.all.tbTool.getItem(argId);
//	for(var i=0;i<20;i++)
//	{
//		var o=document.all.tbTool.getItem(i);
//		if(o!=null)
//		{
//			alert(o.getAttribute("ID"));
//			if(o.getAttribute("ID")==argId)
//				return o;
//		}
//	}
//	return null;
//}
//1050804	Kenny   [1050087]	二代公文系統相關修改--End--

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

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050804	Kenny   [1050087]	二代公文系統相關修改
    //var val		= document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txReborCode"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    //1050804	Kenny   [1050087]	二代公文系統相關修改
    //document.all["txReborCode"].focus();
    $('#txReborCode').focus();
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