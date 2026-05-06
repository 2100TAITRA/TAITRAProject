/*
DATE		SA		PRG		    MGR_NO			DESC
1090917     Cloud   Joe		    1090567         新增程式
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
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;
	
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
		case "ibtAcp1":
		case "ibtAcp2":
			Page_BlockSubmit = true;
			ActionWin = xObjectName;
			var xUrl = "../../../AK/AKR330C2.aspx?SAMLart=" + document.all.SsoArtifact.value;
			jf_OpenChildWin(xUrl, "AKR330C2", 800, 600);
			break;
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
		case "btPreview":
			if (document.all.txAcpNoS.value == "" && document.all.txAcpNoE.value == "")
			{
			    alert('點收批號區間不可皆為空白');
			    $('#txAcpNoS').focus();
				Page_BlockSubmit = true;
			}
			else
			{
				if (document.all.txAcpNoS.value == "")
					document.all.txAcpNoS.value = document.all.txAcpNoE.value;
				else if (document.all.txAcpNoE.value == "")
					document.all.txAcpNoE.value = document.all.txAcpNoS.value;
				else if (document.all.txAcpNoS.value > document.all.txAcpNoE.value) {
					var temp = document.all.txAcpNoE.value;
					document.all.txAcpNoE.value = document.all.txAcpNoS.value;
					document.all.txAcpNoS.value = temp;
				}
				Page_BlockSubmit = false;
			}

			jf_ToolBarSubmit(xObjectName);
			break;
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
	if (argCallerId == "AKR330C2") {
		if (document.all["lbReturnValue"].length > 0) {
			if (ActionWin == "ibtAcp1") {
				document.all["txAcpNoS"].value = document.all["lbReturnValue"].options[0].value;
			}
			else {
				document.all["txAcpNoE"].value = document.all["lbReturnValue"].options[0].value;
			}

			var oldlength = document.all["lbReturnValue"].length;
			for (i = 0; i < oldlength; i++) {
				document.all["lbReturnValue"].remove(0);
			}
		}
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
