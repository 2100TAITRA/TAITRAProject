/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期	    SA	     	PM          單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 1040518  Kevin       Gabby       1040134     新增EDT256專案通案申請批次核可作業
 * 1050524	Cloud       Kenny	    1050087	    二代公文系統相關修改
 * 1051019  Leslie      Kenny       1050087     二代公文修改
 * 1110103  Kevin		Zen			1101292     修正多次點擊重複PostBack之問題
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

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
	//開啟ODT257通案核示作業
	var strArtifact=GetParam("SAMLart");
	var ret = jf_ShowModal(argUrl + "&SAMLart=" + strArtifact, 800, 650);
	if (ret != null)
	{
	    document.all.ToolBarSenderID.value = "btSearch";

	    if (Page_BlockSubmit == false) {
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