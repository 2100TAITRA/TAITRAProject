/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1050506      Cloud   1050087 升級二代
 * 1051019      Kenny   1050087 二代公文修改
 * 1140523		Cloud	1140178	修正代理最大角色取錯問題
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
//* 1140523		Cloud	1140178	修正代理最大角色取錯問題
const cMaxrole = {};

//* 1050506      Cloud   1050087 升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	if(document.all.h_CantExtendDocList)
	{
		alert("公文文號:"+ document.all.h_CantExtendDocList.value+"。\n以上公文可能已不存在或其狀態不可進行展期，無法繼續處理，已將該申請作廢。");
	}
	if(document.all.h_CantGetNextFlow)
	{
		if(document.all.h_CantGetNextFlow.value == "N")
			alert("無法取得使用者的傳送對像，故無法進行傳送動作!");
	}
	//1050506   Cloud   1050087 升級二代
	if (document.all.dg1) {
		if (document.all.dg1.style.display == "")
			document.all.tbSelect.style = "";
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var btHelp;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

    //1050506 Cloud [1050087] 升級二代   
	switch (xObjectName) {
	    //以下屬於DataGrid ToolBar
	    case "btSelectAll":
	        Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			//* 1140523		Cloud	1140178	修正代理最大角色取錯問題-調整取得最大角色方式
			for (i = 2; i <= document.all["dg1"].rows.length; i++) {
				var obj = document.all["dg1__ctl" + i + "_cbSelect"];
				if (obj.disabled == false) {
					obj.checked = true;
					GetMaxRoleInfo("dg1__ctl" + i + "_cbSelect");
				}
			}
	        break;
	    case "btSelectInverse":
	        Page_BlockSubmit = true;
	        jf_SelectInverse("dg1", "_cbSelect");
	        break;
	    case "btSelectClear":
	        Page_BlockSubmit = true;
	        jf_SelectClear("dg1", "_cbSelect");
	        break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle()
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
    //1050506 Cloud [1050087] 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btCommit":
			if(jf_ConfirmCommit()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
			    Page_BlockSubmit = true;
		    //1050506 Cloud [1050087] 升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btBack":
			if(jf_ConfirmBack()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050506 Cloud [1050087] 升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1050506 Cloud [1050087] 升級二代   
		//以下屬於DataGrid ToolBar
		/*case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;*/
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//退回前檢查
function jf_ConfirmBack()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		bRtnbool = true;
	}
		
	return bRtnbool;
}
//核可前檢查
function jf_ConfirmCommit()
{
	var bRtnbool = true;
	var strErrMsg= "";
		
	if(!document.all.dg1)
	{
		alert("目前無展期待核示公文!!");
		return false;
	}
		
	if(!jf_CheckBlankAndAlert())
	{
		alert("請勾選一筆展期待核示!!");
		bRtnbool = false;
	}
	if(!jf_CheckCanCommit())
	{
		bRtnbool = false;
	}
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
		
	return bRtnbool;
}
//退回前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if(!document.all.dg1)
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["目前無展期待核示公文!!"]) ), "" );
		return false;
	}
		
	if(!jf_CheckBlankAndAlert())
	{
		strErrMsg="請勾選一筆待核示之展期公文!!";
		bRtnbool = false;
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整 
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	var bHaveCheck = false ;
	
	if(!document.all.dg1)
		return bHaveCheck ;
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//若有勾選時
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked == true)
		{
			bHaveCheck = true;
			break;
		}
	}
	return bHaveCheck;
}
//檢查是否有核可權
function jf_CheckCanCommit()
{
	var CantCommitList  = "";
	var strErrMsg		= "";
	var bHaveCheck = true ;
	
	if(!document.all.dg1)
		return false ;
	//0990524	Howard[0990350]修正無權限核可之公文，自動傳送至下一個流程
	/*
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//檢核勾選展示欲核可之公文時應再檢核使用者是否有權限
		//若核可權為N時，則紀錄該筆序列
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked == true)
		{
			if(document.all["dg1__ctl" + i + "_lbCanCommit"].innerText == "N")
			{
				if(CantCommitList == "" )
					CantCommitList = document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText;
				else
					CantCommitList += "、" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText;
			}
		}
	}
	
	if(CantCommitList != "")
	{
		strErrMsg = "序"+CantCommitList+"之列中的公文\n您並無核可之權利，無法進行核可作業！"；
	}
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}*/
	return bHaveCheck;
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
		if(jf_IsWebServiceSuccess(argResult))
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//審核意見字數檢核
function fnHandleTextarea()
{
    var xObjectName = document.activeElement.id;
		
    if(xObjectName =="txAuditMsg" && document.all["txAuditMsg"].value.length >200)
    {
        if(event.keyCode!=8)
        {     alert("最多僅能輸入200字");
              event.returnValue = false;
        }
    }
}

//常用審核意見
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050506 Cloud [1050087] 升級二代
    //var val		= document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
	document.all["txAuditMsg"].value += val;
	document.all["dlPhraseNo"].options[0].selected = true;
	document.all["txAuditMsg"].focus();
}

function jf_OpenExtApplyUrl(argUrl)
{
	if(argUrl == "")
		return false;
	//開啟ODT221展期核示作業
	jf_OpenChildWin(argUrl, "ODT221", 800, 650 );
	
}
//* 1140523		Cloud	1140178	修正代理最大角色取錯問題
function GetMaxRoleInfo(id) {
	//叫用Ajax 取得是否有核可權及最大角色
	if (document.all[id].checked) {

		var id_secs = new Array(4);
		id_secs = id.split("_", 4);
		var strMsgID = id_secs[0] + "__" + id_secs[2] + "_lbNmMsgId";
		var strOuid = id_secs[0] + "__" + id_secs[2] + "_lbOwnOuId";
		var strFlowNo = id_secs[0] + "__" + id_secs[2] + "_lbFlowNo";
		var strExtFlowType = id_secs[0] + "__" + id_secs[2] + "_lbExtFlowType";
		var strHasExtDays = id_secs[0] + "__" + id_secs[2] + "_lbExtDay";
		var strApplyDays = id_secs[0] + "__" + id_secs[2] + "_lbApplyDays";
		var strApplyTime = id_secs[0] + "__" + id_secs[2] + "_lbExtTimes";
		var strMaxRole = id_secs[0] + "__" + id_secs[2] + "_H_MAXROLE";
		var strEnabled = id_secs[0] + "__" + id_secs[2] + "_H_Enabled";
		var strStep = id_secs[0] + "__" + id_secs[2] + "_lbSTEP";
		
		
		//沒取過才CallAjax-否則從物件裡取
		var bGetRole = true;
		var MaxRoleid = document.all[strFlowNo].textContent + "|" + document.all[strOuid].textContent + "|" + document.all[strStep].textContent+"|"+document.all[strApplyDays].textContent+"|"+document.all[strApplyTime].textContent;
		
		if (cMaxrole[MaxRoleid] != undefined) {
			document.all[strFlowNo].textContent = "";
			bGetRole = false;
			var TempValue = cMaxrole[MaxRoleid].split('|');
			document.all[strMaxRole].value = TempValue[0] + "|" + TempValue[1];
			document.all[strEnabled].value = TempValue[2];
		}
		
		//CheckRoleEnable( source_orgno,  strFlowNo,  strOuid,  strStep,  strMsgID,  strHasExtDays,  strApplyDays,  strHasExTimes,  strUserName,  strBusExtFlowType)
		if (bGetRole) {
			var ApplyInfo = ED2.EDT221.CheckRoleEnable(document.all["SOURCENO"].value, document.all[strFlowNo].textContent, document.all[strOuid].textContent, document.all[strStep].textContent
				, document.all[strMsgID].textContent, document.all[strHasExtDays].textContent, document.all[strApplyDays].textContent, document.all[strApplyTime].textContent, document.all["H_OWNUSER"].value, document.all[strExtFlowType].textContent).value;
			if (ApplyInfo.indexOf("ERR") != -1) { }
			else {
				//strRtn += maxRoleiNFO.MaxRole.SuperiorUnitCode.AsString() + "|" + maxRoleiNFO.MaxRole.RoleNo.AsString() + "|" + maxRoleiNFO.strAppEnable+|+strLimit;
				var TempValue = ApplyInfo.split('|');
				document.all[strMaxRole].value = TempValue[0] + "|" + TempValue[1];
				document.all[strEnabled].value = TempValue[2];
				//記錄到物件裡
				if (bGetRole)
					cMaxrole[MaxRoleid] = TempValue[0] + "|" + TempValue[1] + "|" + TempValue[2];
			}
		}
	}

}