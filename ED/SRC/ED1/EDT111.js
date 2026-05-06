/* DATE     SA		PRG		MGR_NO		DESC
* 1090908  Kevin	Joe		1090556     新增EDT111 公文提號作業
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

AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		} else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) {

	}
	finally {

	}
}

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
	    case "btSearch":
	        Page_BlockSubmit = true;
	        var strUrl = "EDI111.aspx?rtnObj=lbReturnValue&" + jf_GetArtifact();
			jf_OpenChildWin(strUrl, "EDI111", 800, 600);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			if(jf_ConfirmClean(true))
				document.all.txMaxNo.value = "0";
			$('#txYear').focus();
			break;
		case "btDelete":
			Page_BlockSubmit = false;
			if (jf_GetActionMode() != LayoutModeNew && document.all.txMaxNo.value != "0") {
				alert("該文號區間已被使用，不允許刪除。");
				Page_BlockSubmit = true;
			}
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
			if (jf_CheckDataExist(""))//檢查鍵值是否已存在
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
	var DocNoS = jf_Trim(document.all["txDocNoS"].value);
	var DocNoE = jf_Trim(document.all["txDocNoE"].value);
	if (DocNoS != "" || DocNoE != "") {
		if (DocNoS != "" && DocNoE == "")
			document.all["txDocNoE"].value = DocNoS;
		else if (DocNoS == "" && DocNoE != "")
			document.all["txDocNoS"].value = DocNoE;
		else if (DocNoS > DocNoE) {
			document.all["txDocNoS"].value = DocNoE;
			document.all["txDocNoE"].value = DocNoS;
		}
		var arWSParam = new Array(8);
		arWSParam[0] = document.all.H_OrgNo.value;
		arWSParam[1] = document.all.txYear.value;
		arWSParam[2] = document.all.dlUseDept.options[document.all.dlUseDept.selectedIndex].value;
		arWSParam[3] = document.all.dlUseDept.options[document.all.dlUseDept.selectedIndex].text;
		arWSParam[4] = document.all.txDocNoS.value;
		arWSParam[5] = document.all.txDocNoE.value;
		arWSParam[6] = document.all.txMaxNo.value;
		arWSParam[7] = document.all.TemplateMode.value;

		strErrMsg = ED1.EDT111.CheckDocState(arWSParam).value;
	}
	else {
		strErrMsg = "文號區間不可為空";
	}

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
    if (argCallerId == "EDI111")
	{
    	document.all["txYear"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
    	for (var i = 0 ; i < document.all.dlUseDept.options.length ; i++) {
    		if (document.all.dlUseDept.options[i].value == jf_Trim(document.all.lbReturnValue.options[1].value)) {
    			document.all["dlUseDept"].selectedIndex = i;
    			break;
    		}
    	}
    	jf_ToolBarSubmit("btOpen");
    }
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}
