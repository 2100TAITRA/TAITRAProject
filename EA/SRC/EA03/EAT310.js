/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
0980911	--		Leslie	0980474		增加日期格式之檢核，以避免AKT810儲存時發生錯誤
0990106			Albert	0980336		修正變數錯誤
1001012	--		Davy	--			新增預覽/列印功能鍵(for檔管驗證)
1020110	Kevin	Kevin	1011168		標檢局帶入預設歸還日期
1020220	Kevin	Kevin	1020030		調整檢核機制供共通版使用
1050524	Cloud   Kenny	1050087	    二代公文系統相關修改
1051019	Leslie	Joe		1050087		二代修改配合行動平台
1061103 Kevin   Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1080423	Cloud	Kevin_C	1080047		增加字數檢核
1080916 Kevin	Kevin_C	1080774		新增撤回功能
1110103 Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
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

//1050524	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050524	Kenny   [1050087]	二代公文系統相關修改，一併移除無用code
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    //1050524	Kenny   [1050087]	二代公文系統相關修改--Start--
    //if(document.all.dg1.className == "hide")
    //{
    //	document.all.trDg1.className = "hide";
    //	document.all.trApplyData.className = "hide";
    //	document.all.trApplyReason.className = "hide";
    //	document.all.trApplyReason1.className = "hide";
    //	document.all.trCurrStatus.className = "hide";
    //}
    //else
    //{
    //	document.all.trDg1.className = "";
    //	document.all.trApplyData.className = "";
    //	document.all.trApplyReason.className = "";
    //	document.all.trApplyReason1.className = "";
    //	document.all.trCurrStatus.className = "";
    //}

    if (document.all.dg1.className == "hide")
    {
        document.getElementById("trDg1").style.display = "none";
        document.getElementById("trApplyData").style.display = "none";
        document.getElementById("trApplyReason").style.display = "none";
        document.getElementById("trApplyReason1").style.display = "none";
        document.getElementById("trCurrStatus").style.display = "none";
    }
    else
    {
        document.getElementById("trDg1").style.display = "table-row";
        document.getElementById("trApplyData").style.display = "table-row";
        document.getElementById("trApplyReason").style.display = "table-row";
        document.getElementById("trApplyReason1").style.display = "table-row";
        document.getElementById("trCurrStatus").style.display = "table-row";
    }
    //1050524	Kenny   [1050087]	二代公文系統相關修改--end--
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
        //1050524	Kenny   [1050087]	二代公文系統相關修改
        //case 'btCalendar':
        //	Page_BlockSubmit=true;
        //	jf_CallCalendar(document.all["txApplyData"], event.screenX, event.screenY);
        //	break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050524	Kenny   [1050087]	二代公文系統相關修改
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

    //1050524	Kenny   [1050087]	二代公文系統相關修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearch":
            //1080916   Kevin_C	1080774     開子視窗不該POSTBACK
            Page_BlockSubmit = true;
            var strUrl = "";
            var WebServerName = jf_Trim(document.all.H_WebServer.value);
            var Artifact = jf_Trim(document.all.SsoArtifact.value);
            //0980924	Leslie	配合SSL機制啟用，修正跨站台之子視窗URL，改以相對路徑開啟以避免資料傳遞發生錯誤
            //strUrl = "http://"+WebServerName+"/AK/AKS502.aspx?SAMLart="+Artifact+"&nMode=User";
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //strUrl = "../../../AK/AKS502.aspx?SAMLart="+Artifact+"&nMode=User";
            strUrl = "../../../AK/AKS502.aspx?SAMLart=" + Artifact + "&nMode=User";
            jf_OpenChildWin(strUrl, "AKS502", 700, 500);
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
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btOnlySave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = false;
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCheck":
            Page_BlockSubmit = false;
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearchFlow":
            //1080916   Kevin_C	1080774     開子視窗不該POSTBACK
            Page_BlockSubmit = true;
            if (jf_CheckKeyObject())
            {
                var strUrl = "";
                var WebServerName = jf_Trim(document.all.H_WebServer.value);
                var strOrgNo = jf_Trim(document.all.nSourceOrgno.value);
                var strBorNo = document.all.txBorNo.value;
                //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
                //0990106 Albert 0980336 修正變數錯誤
                //var Artifact = jf_Trim(document.all.SsoArtifact.value);
                var strArtifact = jf_Trim(document.all.SsoArtifact.value);
                //1050524	Kenny   [1050087]	二代公文系統相關修改
                //strUrl = "http://"+WebServerName+"/ED/ED2/EDI200.aspx?SOURCE_ORGNO="+strOrgNo+"&argMsgFrom=EAT310&argTargetNo="+strBorNo+"&SAMLart=" +strArtifact;
                strUrl = "http://" + WebServerName + "/ED/ED2/EDI200.aspx?SOURCE_ORGNO=" + strOrgNo + "&argMsgFrom=EAT310&argTargetNo=" + strBorNo + "&SAMLart=" + strArtifact;
                jf_OpenChildWin(strUrl, "EDI200", 700, 500);
            }
            break;
            //1001012	Davy 新增預覽/列印功能鍵(for檔管驗證)
        case "btPreview":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
			//1080916   Kevin_C	1080774		新增撤回
		case "btBack":
			Page_BlockSubmit = !window.confirm("確定要撤回嗎?");
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
	//1080423	Kevin_C	1080047	增加字數檢核
	if (!isMaxLength(document.all.txApplyReason,'展期理由','100'))
        return false;
    var bRtnbool = true;
    var strErrMsg = "";

    if (jf_Trim(document.all["txApplyData"].value) == "")
    {
        if (strErrMsg == "")
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //document.all["txApplyData"].focus();
            $('#txApplyData').focus();
        strErrMsg += "[預計歸還日]欄位不可空白\n";
    }
    else
    {
        //0980911	Leslie[0980474]	增加"預計歸還日"之檢核
        strErrMsg += CheckDate(document.all["txApplyData"], "[預計歸還日期]");
        if (strErrMsg != "")
        {
            strErrMsg += "\n";
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //document.all["txApplyData"].focus();
            $('#txApplyData').focus();
        }
        else
        {
            if (document.all["txApplyData"].value.length == 7 && document.all["txBorDueDate"].value.length == 7)
            {
                if (document.all["txApplyData"].value <= document.all["txBorDueDate"].value)
                {
                    if (strErrMsg == "")
                        //1050524	Kenny   [1050087]	二代公文系統相關修改
                        //document.all["txApplyData"].focus();
                        $('#txApplyData').focus();
                    strErrMsg += "[預計歸還日]日期應在[原調案期限]日期之後\n";
                }
            }

            //1020220 Kevin 1020030 新增預設不檢核歸還日期
            if (document.all["REBOR_DAYS"] && document.all["REBOR_DATE"])
            {
                //1020220 Kevin 1020030 調整檢核機制
                //1020110 Kevin 1011168 標檢局帶入預設歸還日期
                //if(document.all["REBOR_DAY"] && document.all["txApplyData"].value.length == 7 && document.all["REBOR_DAY"].value.length == 7)
                if (document.all["txApplyData"].value.length == 7 && document.all["REBOR_DATE"].value.length == 7)
                {
                    //1020220 Kevin 1020030 調整檢核機制
                    //if(document.all["txApplyData"].value > document.all["REBOR_DAY"].value)
                    if (document.all["txApplyData"].value > document.all["REBOR_DATE"].value)
                    {
                        if (strErrMsg == "")
                            //1050524	Kenny   [1050087]	二代公文系統相關修改
                            //document.all["txApplyData"].focus();
                            $('#txApplyData').focus();
                        //1020220 Kevin 1020030 調整檢核機制
                        //strErrMsg += "[預計歸還日]日期應在[原調案期限]十四日內\n";
                        strErrMsg += "[預計歸還日]日期應在[原調案期限] " + document.all["REBOR_DAYS"].value + "日內\n";
                    }
                }
            }
        }
    }

    if (jf_Trim(document.all["txApplyReason"].value) == "")
    {
        if (strErrMsg == "")
            //1050524	Kenny   [1050087]	二代公文系統相關修改
            //document.all["txApplyReason"].focus();
            $('#txApplyReason').focus();
        strErrMsg += "[展期理由]欄位不可空白\n";
    }
    else
    {
        if (!jf_CheckTextLength(document.all["txApplyReason"].value, 1, 100))
        {
            if (strErrMsg == "")
                //1050524	Kenny   [1050087]	二代公文系統相關修改
                //document.all["txApplyReason"].focus();
                $('#txApplyReason').focus();
            strErrMsg += "[展期理由]欄位不可超過100個字\n";
        }
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    else
    {
        //1050524	Kenny   [1050087]	二代公文系統相關修改--Start--
        //var ddlIdx=6;
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
        //1050524	Kenny   [1050087]	二代公文系統相關修改--End--
    }

    return bRtnbool;
}

//1050524	Kenny   [1050087]	二代公文系統相關修改--Start--
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
//1050524	Kenny   [1050087]	二代公文系統相關修改--End--

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
    if (argCallerId == "AKS502")
    {
        document.all["txBorNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        if (document.all["txBorNo"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1050524	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txBorNo"].focus();
        $('#txBorNo').focus();
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

/**********************************************************************************************
  Name : function jf_CheckTextLength(argString, argMinLength, argMaxLength)
  Desc : 備註欄位檢查是否超過200個字
  Parm : argStr			: string 被檢查之字串
         argMinLength	: int    最小長度
         argMaxLength	: int    最大長度
  Rtn  : bool 回傳是否通過檢查(是:true 否:false)
 **********************************************************************************************/
function jf_CheckTextLength(argString, argMinLength, argMaxLength)
{
    //re=/^.{1,100}$/;
    //因為最小及最大長度是變數，所以不能用上面直接指定，要改用下面的宣告方法
    re = new RegExp("^.{" + argMinLength + "," + argMaxLength + "}$");
    if (re.test(argString))
        return true;
    else
        return false;
}

function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050524	Kenny   [1050087]	二代公文系統相關修改
    //var val		= document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txApplyReason"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    //1050524	Kenny   [1050087]	二代公文系統相關修改
    //document.all["txApplyReason"].focus();
    $('#txApplyReason').focus();
}

//預計歸還日_onChange()
function txApplyData_onchange(argObj)
{
    var ErrMsg = CheckDate(argObj, "預計歸還日期");

    if (ErrMsg != "")
    {
        //1050524	Kenny   [1050087]	二代公文系統相關修改
        //argObj.focus();	
        $('#' + argObj.id).focus();
        alert(ErrMsg);
    }
}

//檢查日期格式,回傳錯誤訊息
function CheckDate(argObj, argObjName)
{
    if (argObj.value != "")
    {
        jf_PADCHAR(argObj, 7, '0');
        if (!jf_CheckCDATE(argObj.value))
        {
            return FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"]));
        }
    }
    return "";
}

//1080423	Kevin_C	1080047	增加字數檢核 -S
var bHasCheck = false;
function isMaxLength(obj,argText,argMaxNum)
{
	if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
	bHasCheck = true;
	var nMaxNum = parseInt(argMaxNum);
    if (obj.value.length == nMaxNum)
    {
		var nCode = parseInt(event.keyCode);
        if (nCode != 8 && nCode!=9 && nCode != 13 && nCode != 16 && nCode != 46 && (nCode < 33 || nCode > 40))
		{
            event.returnValue = false;
			jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
			bHasCheck = false;
			return false;
		}
    } else if (obj.value.length > nMaxNum)
    {
        event.returnValue = false;
        jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
        obj.value = obj.value.substring(0, nMaxNum);
		bHasCheck = false;
		return false;
    }
	bHasCheck = false;
	return true;
}
//1080423	Kevin_C	1080047	增加字數檢核 -E