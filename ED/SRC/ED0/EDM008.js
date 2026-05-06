/*
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 1050616	Justin	1050391	    新增EDM008分層決行共用項目維護作業
 * 1050624  Justin  1050087     二代公文修改
 * 1051019  Kenny   1050087     二代公文修改
 * 1110103  Zen     1101292     修正多次點擊重複PostBack之問題
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
/*1050624 Justin 1050087 二代公文修改 
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1050624 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次*/
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
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050624 Justin 1050087 二代公文修改 
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
	
    //1050624 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	    case "btOpen":
	        CheckLength("txPINo");
			Page_BlockSubmit = !jf_CheckKeyObject();
	        //1050624 Justin 1050087 二代公文修改 
	        //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	    case "btSave":
	        CheckLength("txPINo");
	        CheckLength("txDefaultNo");
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050624 Justin 1050087 二代公文修改 
	        //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050624 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050624 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    /*1050624 Justin 1050087 二代公文修改
			document.all["txPINo"].focus();*/
			$('#txPINo').focus();
			break;
		case "btSearch":
			var strUrl = "EDC008.aspx?Return=true";
			var strKeyCol = jf_Trim(document.all["txPINo"].value);
			jf_OpenChildWin(strUrl, "EDM008", 1000, 500 );
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
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
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
	var strErrMsg= "";
	
	if (jf_Trim(document.all["txPIName"].value) == "")
	{
	    strErrMsg += "分層項目名稱欄位不可空白\n";
	    /*1050624 Justin 1050087 二代公文修改
	    document.all["txPIName"].focus();*/
	    $('#txPIName').focus();
	}
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

function CheckLength(id) {
    var strValue;
    strValue = document.all[id].value;
    if (strValue == "") {
        return;
    }
    if (id == "txPINo")
        strValue = jf_PADL(strValue, 4, "0");
    else
        strValue = jf_PADL(strValue, 3, "0");
    document.all[id].value = strValue;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{	
    if (argCallerId == "EDC008")
	{
		document.all["txPINo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txPINo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
        /*1050624 Justin 1050087 二代公文修改
		document.all["txPINo"].focus();*/
		$('#txPINo').focus();
	}
		
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}
