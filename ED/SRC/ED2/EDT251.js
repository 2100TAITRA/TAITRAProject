/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期	    SA	     	PM          單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 1040518  Kevin       Gabby       1040134     新增EDT251專案申請批次核可作業
 * 1050524	Cloud       Kenny	    1050087	    二代公文系統相關修改
 * 1051019  Leslie      Kenny       1050087     二代公文修改
 * 1110103  Kevin		Zen			1101292     修正多次點擊重複PostBack之問題
 * 1140527	Cloud		Cloud		1140178		修正取得最大角色及下一流程問題
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
//* 1140527	Cloud		1140178		修正取得最大角色及下一流程問題
const cMaxrole = {};


//1050524	Kenny   [1050087]	二代公文系統相關修改
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
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case btHelp:
			break;
		//1050524	Kenny   [1050087]	二代公文系統相關修改，調整至ClientButtonControl--Start--
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
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		//1050524	Kenny   [1050087]	二代公文系統相關修改，調整至ClientButtonControl--End--
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

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050524	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btCommit":
			if(jf_CheckBeforSave()) //是否通過儲存前必要檢查
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
		case "btBack":
			if(jf_CheckBeforSave()) //是否通過儲存前必要檢查
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
	    case "btSearch":
	        Page_BlockSubmit = false;
	        //1050524	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
	        break;

		//1050524	Kenny   [1050087]	二代公文系統相關修改，調整至ClientButtonControl--Start--
		//以下屬於DataGrid ToolBar
		//case "btSelectAll":
		//	Page_BlockSubmit = true;
		//	jf_SelectAll("dg1", "_cbSelect");
		//	break;
		//case "btSelectInverse":
		//	Page_BlockSubmit = true;
		//	jf_SelectInverse("dg1", "_cbSelect");
		//	break;
		//case "btSelectClear":
		//	Page_BlockSubmit = true;
		//	jf_SelectClear("dg1", "_cbSelect");
		//	break;
		//1050524	Kenny   [1050087]	二代公文系統相關修改，調整至ClientButtonControl--End--
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
function jf_OpenApplyUrl(argUrl)
{
	if(argUrl == "")
		return false;
	//開啟ODT251專案核示作業
	var strArtifact=GetParam("SAMLart");
    var ret = jf_ShowModal(argUrl + "&SAMLart=" + strArtifact,800, 650);
	if (ret != null)
	{
	    document.all.ToolBarSenderID.value = "btSearch";

	    if (Page_BlockSubmit == false)
	    {
	        IsServerHandling = true;
	        jf_ShowWaitState();
	        __doPostBack("tbTool", 0);
	    }
	}
	
}
//取得參數值
function GetParam(p)
{
	var arr = this.GetParamArray();
	if( p == "" )	return "";
	for(var i=0 ; i<arr.length ; i++)
		if( arr[i][0] == p )
			return arr[i][1];
	return "";		
}
function GetParamArray()
{
	var arrayOfParamLen = 0;
	var arrayOfParam = new Array(0);
	
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i,j,k;
		i = pUrl.indexOf("?");
		var paramStr = pUrl.substr(i+1); 
		var arr = paramStr.split("&");
		for(j=0 ; j<arr.length ; j++)
		{
			
			k = arr[j].indexOf("=");
			if( k != -1 )
			{
				arrayOfParam[arrayOfParamLen] = new Array(2);
				arrayOfParam[arrayOfParamLen][0] = arr[j].substr(0,k);
				arrayOfParam[arrayOfParamLen][1] = arr[j].substr(k+1);
				arrayOfParamLen++;
			}
		}
	}
	return arrayOfParam;
}
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
	var index	= document.all["dlPhraseNo"].selectedIndex;
	//1050524	Kenny   [1050087]	二代公文系統相關修改
	//var val		= document.all["dlPhraseNo"].options[index].innerText;
	var val		= document.all["dlPhraseNo"].options[index].textContent;
	document.all["txAuditMsg"].value += val;
	document.all["dlPhraseNo"].options[0].selected = true;
	//1050524	Kenny   [1050087]	二代公文系統相關修改
	//document.all["txAuditMsg"].focus();
	$('#txAuditMsg').focus();
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
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if(!document.all.dg1)
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["目前無專案待核示公文!!"]) ), "" );
		return false;
	}
		
	if(!jf_CheckBlankAndAlert())
	{
		strErrMsg="請勾選一筆待核示公文!!";
		bRtnbool = false;
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}
//* 1140527	Cloud		1140178		修正取得最大角色及下一流程問題
function GetMaxRoleInfo(id) {
	//叫用Ajax 取得是否有核可權及最大角色
	if (document.all[id].checked) {

		var id_secs = new Array(4);
		id_secs = id.split("_", 4);
		var strMsgID = id_secs[0] + "__" + id_secs[2] + "_lbMsgId";
		var strOuid = id_secs[0] + "__" + id_secs[2] + "_lbOwnOuId";
		var strHasExtDays = id_secs[0] + "__" + id_secs[2] + "_lbAppDays";
		var strMaxRole = id_secs[0] + "__" + id_secs[2] + "_H_MAXROLE";
		var strEnabled = id_secs[0] + "__" + id_secs[2] + "_H_Enabled";
		var strStep = id_secs[0] + "__" + id_secs[2] + "_lbSTEP";


		//沒取過才CallAjax-否則從物件裡取
		var bGetRole = true;
		var MaxRoleid = document.all[strOuid].textContent + "|" + document.all[strStep].textContent + "|" + document.all[strHasExtDays].textContent;

		if (cMaxrole[MaxRoleid] != undefined) {
			bGetRole = false;
			var TempValue = cMaxrole[MaxRoleid].split('|');
			document.all[strMaxRole].value = TempValue[0] + "|" + TempValue[1];
			document.all[strEnabled].value = TempValue[2];
		}

		//CheckRoleEnable(source_orgno, string strFlowNo, string strOuid, string strStep, string strMsgID, string strHasExtDays, string strUserName)
		if (bGetRole) {
			var ApplyInfo = ED2.EDT251.CheckRoleEnable(document.all["SOURCENO"].value, "OD02", document.all[strOuid].textContent, document.all[strStep].textContent, document.all[strMsgID].textContent, document.all[strHasExtDays].textContent, document.all["H_OWNUSER"].value).value;
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