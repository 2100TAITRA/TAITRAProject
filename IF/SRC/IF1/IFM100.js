/*
DATE 	SA		PRG		MGR_NO	DESC
1031204	Kevin	Kevin	--		新增ClientButtonControl()之宣告避免錯誤
1050601 Kevin   Zen     1050087 二代公文修改
1070904	Kevin	Justin	1070678	弱掃修正CookieHttpOnly
1080816 Kevin	Joe		1080628	修正開啟子視窗前需進行編碼
1150206	Zen		Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");
//1050601 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
//1031204 Kevin 新增ClientButtonControl()之宣告避免錯誤
function ClientButtonControl()
{

}
/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050601 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
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
	
    //1050601 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050601 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":			
			Page_BlockSubmit = !jf_ConfirmSave();
		    //1050601 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050601 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050601 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);			
			break;
		case "btSearch":
			//1050621	Leslie	二代ShowModalDialog修改Sample
			//var ret = jf_ShowServerDialog(document.all.txSrvNo.value);
			jf_ShowServerDialog(document.all.txSrvNo.value);
			Page_BlockSubmit = true;
			
			//1050621	Leslie	二代ShowModalDialog修改Sample，行為改成與window.open() 相似，都由CallBack()負責取得回傳值與執行後續行為
			/*if(ret != null)
			{
				document.all.txSrvNo.value = GetElement(ret, 0);
				Page_BlockSubmit = false;
			}
			else
			{
				Page_BlockSubmit = true;
				return;
			}
		    //1050601 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);*/
			//1050621	Leslie	二代ShowModalDialog修改Sample	--END--
			break;
					
			/*var strUrl = "";
			var strSrvNo = jf_Trim(document.all["txSrvNo"].value);			
			strUrl = "IFC010.aspx?rtnObj=lbReturnValue&argstrSrvNo="+strSrvNo;
			jf_OpenChildWin(strUrl, "IFC010", 700, 500 );
			break;*/	
	}
}
function jf_ShowServerDialog(argParam)
{
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nSearch",argParam);
	//1050621	Leslie	二代ShowModalDialog修改Sample
	//var ret= fnOpen("IFC010.htm" + GetAllParamStr(),"460","400"); //回傳值：CN, displayName, Path
	//jf_ShowModal("IFC010.htm" + GetAllParamStr(),"800","600");
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("IFC010.htm" + GetAllParamStr() + "&nSearch=" + argParam,"800","600");
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFC010.htm" + GetAllParamStr() + "&nSearch=" + encodeURIComponent(argParam),"800","600");
	jf_ShowModal("IFC010.htm" + GetAllParamStr() + "&nSearch=" + encodeURIComponent(argParam));
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
	//return ret;
	//1050621	Leslie	二代ShowModalDialog修改Sample	--END--
}
function GetAllParamStr()
{
	var strParam = "";
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
	}
	return strParam;
}
function fnOpen(arg,argW,argH)
{
   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
   var ret = window.showModalDialog(arg, "", sFeatures);
   return ret;
}
function GetElement(argStr,argIdx)
{
	var SPLIT		= '|';
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
}
/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{		
			// 新增模式需檢查鍵值是否已存在
			if (jf_GetActionMode()==LayoutModeNew)
			{
				if(jf_CheckDataExist(""))//檢查鍵值是否已存在
				{
					if (window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
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
	if(argCallerId == "IFC010")
	{
		//1050621	Leslie	二代ShowModalDialog修改Sample，行為改成與window.open() 相似，都由CallBack()負責取得回傳值與執行後續行為
		//document.all["txSrvNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);	
		$('#txSrvNo').val(GetElement(jf_Trim($('#lbReturnValue')[0].options[0].value),0));
		
		if(document.all["txSrvNo"].value != "")
		{
			Page_BlockSubmit=false;
			//1050621	Leslie	二代ShowModalDialog修改Sample
			//jf_OpenButtonSubmit();
			jf_ToolBarSubmit('btSearch');
		}
	    //1050601 Zen 1050087 二代公文修改
		//document.all["txSrvNo"].focus();
		$('#txSrvNo').focus();
	}	
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/


