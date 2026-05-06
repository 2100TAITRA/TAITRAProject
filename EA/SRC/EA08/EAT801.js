/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
0981203	--		Albert	0980336		不再自網址參數取得Artifact
1051121	Cloud   Kenny	1050087	    二代公文系統相關修改
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//1051121	Kenny   [1050087]	二代公文系統相關修改--Start--
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//1051121	Kenny   [1050087]	二代公文系統相關修改--End--

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
        case "btApprove"://核可鍵
            Page_BlockSubmit = !jf_CheckOpinion();
            //1051121	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "bttoberecord"://登錄
            Page_BlockSubmit = false;
            //1051121	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete"://刪除訊息鍵
            Page_BlockSubmit = false;
            //1051121	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btReject"://退回鍵
            Page_BlockSubmit = !jf_CheckOpinion();
            //1051121	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClose"://關閉鍵
            Page_BlockSubmit = true;
            jf_CloseWindow("1", "");
            break;
        case "btTransfer":
            Page_BlockSubmit = !jf_CheckOpinion();
            var ddlIdx = 7;
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
        case "btSearchFlow":
            //1051121	Kenny   [1050087]	二代公文系統相關修改；加入Page_BlockSubmit
            Page_BlockSubmit = true;
            if (jf_CheckKeyObject())
            {
                var strOrgNo = jf_Trim(document.all.H_txOrgNo.value);
                var strApplyNo = document.all.txAppNo.value;
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
//1051121	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE--Start--
////儲存前檢查
//function jf_ConfirmSave()
//{
//	var bRtnbool = false;

//	if (jf_CheckBeforSave())
//	{
//		// 新增模式需檢查鍵值是否已存在
//		if (jf_GetActionMode()==LayoutModeNew)
//		{
//			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
//			{
//				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
//					bRtnbool = true;
//			}
//			else
//				bRtnbool = true;
//		}
//		else
//			bRtnbool = true;
//	}

//	return bRtnbool;
//}

////儲存前之欄位檢查
//function jf_CheckBeforSave()
//{
//	var bRtnbool = true;
//	var strErrMsg= "";

//	if (document.all["txKeyFld"].value == "")
//	{
//		strErrMsg += "鍵值欄位不可空白\n";
//		document.all["txKeyFld"].focus();
//	}

//	if (document.all["txRequireFld"].value == "")
//	{
//		strErrMsg += "必要欄位不可空白\n";
//		document.all["txRequireFld"].focus();
//	}

//	if(!jf_CheckBlankAndAlert())
//		bRtnbool = false;

//	if (strErrMsg != "")
//	{
//		bRtnbool = false;
//		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
//	}

//	return bRtnbool;
//}

////檢查DataGrid資料列是否填完整
//function jf_CheckBlankAndAlert()
//{
//	var InValidName = "";
//	var InValidControlName = "";

//	for(var i = 2; i <= document.all.dg1.rows.length; i++)
//	{
//		//txInput1不為空白時
//		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
//		{
//			//txInput2不可空白
//			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
//			{
//				InValidName += ",Input2不可空白";			
//				InValidControlName = "dg1__ctl" + i + "_txInput2";
//			}

//			if(InValidName != "")
//			{
//				InValidName = InValidName.substr(1,InValidName.length);
//				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
//				document.all[InValidControlName].focus();
//				return false;
//			}
//		}
//	}
//	return true;
//}
//1051121	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE--End--

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
//1051121	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE--Start--
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
//1051121	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE--End--

function jf_CheckOpinion()
{
    //如果審核結果及意見均為空白,則提示訊息
    //if(document.all.tbOpinion.value == "" && document.all.ddlVerifyResult.value == "")
    //{
    //	document.all.tbOpinion.focus();
    //	alert("請輸入簽核意見");
    //	return false;
    //}
    return true;

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