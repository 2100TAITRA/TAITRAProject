/*
DATE	SA		PRG		MGR_NO		DESC
1111028	David	David	1110885		新增EDT232_MOCS銓敘部銓敘公文登錄作業
1120503	David	David	-------		(銓敘部問題彙整表序278)紀錄目前是否為代理人開啟
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
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	ddlSec_onchange();

	//1120503 David 紀錄目前是否為代理人開啟
	$('#hProxyAccount').val(opener.theSSO.User.PlayRoles[opener.theSSO.User.activeRoleIndex].proxyAccount);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
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

	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
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
		if (jf_GetActionMode()==LayoutModeNew)
		{
		    if (jf_CheckDataExists())//檢查鍵值是否已存在
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
	var strErrMsg = "";

	if($('#txSubject').val() == "")
		strErrMsg = "主旨不可為空";

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
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
		}
		else
		{
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
    if (argCallerId == "EDI232")
	{
    	document.all["txYear"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
    	document.all["txDocNo"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
    	jf_ToolBarSubmit("btOpen");
    }
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ddlSec_onchange()
{
	if (document.all.ddlSec.options[document.all.ddlSec.selectedIndex].value != "1")
	{
		$('#dlRmvSecCond').combobox('setEnable');
		if($('#cbIsOnLine')[0].checked)
		{
			$('#cbIsOnLine')[0].checked = false;
			alert("密件公文不可走線上簽核");
		}
		$('#cbIsOnLine').prop('disabled', true);
	}
	else
	{
		$('#dlRmvSecCond_Text').val('');
		$('#dlRmvSecCond')[0].selectedIndex = 0;
		$('#dlRmvSecCond').combobox('setDisable');
		$('#cbIsOnLine').prop('disabled', false);
	}
}