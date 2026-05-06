/*
DATE	SA		PRG		MGR_NO		DESC
1061003 Kevin   Justin  1060099     新增本作業
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
		case "btApprove"://核可鍵
			Page_BlockSubmit = !jf_CheckOpinion("");
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete"://刪除訊息鍵
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btReject"://退回鍵
			Page_BlockSubmit = !jf_CheckOpinion("");
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btTransfer":
			Page_BlockSubmit = !jf_CheckOpinion("btTransfer");
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearchFlow":
            Page_BlockSubmit = true;
			if(jf_CheckKeyObject())
			{
				var strOrgNo = jf_Trim(document.all.H_txOrgNo.value);
				var strApplyNo = document.all.txAppNo.value;
				var strArtifact = document.all.SsoArtifact.value;
				strUrl = "../../../ED/ED2/EDI200.aspx?SOURCE_ORGNO="+strOrgNo+"&argMsgFrom=EAT812&argMsgFromId="+strApplyNo+"&SAMLart=" +strArtifact;
                jf_OpenChildWin(strUrl, "EDI200", 800, 600 );
			}
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CheckOpinion(obj)
{
	if (document.all.txOpinion.value == "" && obj != "btTransfer")
	{
		document.all.txOpinion.focus();
		alert("請輸入簽核意見");
		return false;
	}
	else if (document.all["txOpinion"].value.length > 200)
	{
		alert("簽核意見長度不可超過200字!");
		return false;
	}
	return true;
}

//簽核意見
function ddlVerifyResult_onchange()
{
    var index = document.all["ddlVerifyResult"].selectedIndex;
    var val = document.all["ddlVerifyResult"].options[index].textContent;
    document.all["txOpinion"].value += val;
    document.all["ddlVerifyResult"].options[0].selected = true;
    document.all["txOpinion"].focus();
}