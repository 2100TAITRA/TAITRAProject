/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1050826   Justin   1050087     二代公文修改
 * 1051019   Kenny    1050087     二代公文修改
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
var strTableFields = new Array("_lbSUnit","_lbSUser","_lbRcvUnit","_lbRcvUser","_lbDocNo","_lbTxName","_lbTxTime","_lbSignTime","_lbSubject");
//1050826 Justin 1050087 二代公文修改 
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
    //1050826 Justin 1050087 二代公文修改 移除無用jf_CallWS
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    view();
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
	/*if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
	    /*1050826 Justin 1050087 二代公文修改 
		case "btCalendar1":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txDateS, event.screenX, event.screenY);
			break;
		case "btCalendar2":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txDateE, event.screenX, event.screenY);
			break;*/
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050826 Justin 1050087 二代公文修改 
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
	
    //1050826 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			if(document.all["dlSendUnit_Text"].value == "" && document.all["dlRcvUnit_Text"].value == "" )
			{
				alert('送件單位/收件單位　需擇一進行查詢。');
				return;
			}
			if(document.all["txDateS"].value == "" || document.all["txDateE"].value == "" )
			{
				alert('傳送日期起/迄　不可為空白。');
				return;
			}
			Page_BlockSubmit = false;
		    //1050826 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all.rbDocNo.checked = true;
			document.all.rbTypeP.checked = true;
			document.all.rbRptSend.checked = true;
			break;
		case "btPrint":
			if(document.all["dlSendUnit_Text"].value == "" && document.all["dlRcvUnit_Text"].value == "" )
			{
				alert('送件單位/收件單位　需擇一進行預覽。');
				return;
			}		
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1050826 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(document.all["dlSendUnit_Text"].value == "" && document.all["dlRcvUnit_Text"].value == "" )
			{
				alert('送件單位/收件單位　需擇一進行列印。');
				return;
			}		
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1050826 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
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
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function dlTimeOnBlur()
{
	var idx = document.all.dlTime.selectedIndex;
	var iValue = document.all["dlTime"].options[idx].value;
	var arrTime = new Array();
	if(iValue.indexOf("-") != -1)
	{	
		arrTime = iValue.split("-");
		document.all.txTimeS.value = arrTime[0];
		document.all.txTimeE.value = arrTime[1];
	}
	else
	{
		document.all.txTimeS.value = "";
		document.all.txTimeE.value = "";
	}
}

function dlSendUnit_Text_onblur()
{
	//edjf_SectCheck("dlSendUnit","dlSendUser","dlUser");
}

function dlRcvUnit_Text_onblur()
{
	//edjf_SectCheck("dlRcvUnit","dlRcvUser","dlUser");
}
function view()
{
	//alert("==="+document.all["getCbText"].childNodes[0].childNodes[1].innerHTML+"===");
    if (document.all["rbTypeE"].checked)
        //1050826 Justin 1050087 二代公文修改
	    //document.all["getCbText"].childNodes[1].childNodes[1].innerHTML = '僅列出目前停留收件人之公文';
        $("#cbOnlyRcv").next("label").html('僅列出目前停留收件人之公文');
	else if(document.all["rbTypeP"].checked)
	    //document.all["getCbText"].childNodes[1].childNodes[1].innerHTML = '僅列出目前停留收件單位之公文';
	    $("#cbOnlyRcv").next("label").html('僅列出目前停留收件單位之公文');
}