/*
DATE	SA		PRG		MSG_NO		DESC	
1050506	Kevin	Zen		1050087		二代系統升級
1051019	Leslie	Joe		1050087		二代修改配合行動平台
1060518 Leslie  Zen     1060215     innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050506 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
window.setTimeout(fnRefresh, 60000);

function fnRefresh()
{
	//呼叫WebService以偵測系統是否正常
	jf_CallWS(document.all.SystemWS.value, document.all.IsAliveFuncName.value);
}
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	var pNo     = xObjectName.substring(8,xObjectName.indexOf("_btHelp"));
	var pNoHelp = "dg1__ctl"+pNo+"_btHelp";
	
	if(IsServerHandling)
	   return;
	
	switch (xObjectName)
	{
		case pNoHelp:
			Page_BlockSubmit=true;
			ShowModal("IIC000");
			break;
	}	
}
//1050506 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{

	var xObjectName;
	var evBtn;

	if(IsServerHandling)
	   return;

    //1050506 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = false;
		    //1050506 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSendOne":
			Page_BlockSubmit = !ChkMsg();
			if(Page_BlockSubmit == false)
				Page_BlockSubmit = !ChkSelect();
		    //1050506 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSendAll":
			Page_BlockSubmit = !ChkMsg();
		    //1050506 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btForceLogout":
			Page_BlockSubmit = !ChkSelect();
		    //1050506 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		    //1050506 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btExit":
			Page_BlockSubmit = true;
			close();
			break;
	}
}

//檢查是否有勾選項目
function ChkSelect()
{
	var tbl = document.all.dg1;
	//1050509 Zen 1050087 二代公文修改--begin
	/*
	for(var i=1; i<tbl.rows.length; i++)
	{
		if(tbl.rows(i).cells(1).firstChild.checked)
			return true;
	}
	*/
	for (var i = 2; i <= tbl.rows.length; i++)
	{
		if (document.getElementById('dg1__ctl' + i + '_cbSelect').checked)
			return true;
	}
	//1050509 Zen 1050087 二代公文修改--end
	alert("請選擇對象");
	return false;
}

function ChkMsg()
{
	if(document.all.txMsg.value == "")
	{
		alert("請輸入訊息");
		document.all.txMsg.focus();
		return false;
	}
	return true;
}

function CallBack(argCallerId)
{

}

function ShowMsg()
{
    //1050506 Zen 1050087 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}
function ClientOnLoad()
{
	ShowMsg();
	
	//Matte 0961210 0960337
	if(document.all.nMode)
	{
		if(document.all.nMode.value == "2" || document.all.nMode.value == "3")
		{
			document.all.Button1.disabled = false ;
			document.all.Button2.disabled = false ;
			document.all.Button3.disabled = false ;
		}
	}
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function ShowModal(argWin)
{
	var strChildWin = argWin + ".aspx";
	window.showModalDialog(strChildWin, "", "dialogHeight: 450 px;dialogWidth:450px");
}


function jf_DeleteItem(argTextBoxId, argIdx)
{
	Page_BlockSubmit = true;
	var obj = document.all.ddUnit;

	if( argIdx >= obj.length ) return;

	obj[argIdx].text  = "";
	obj[argIdx].value = "";
	document.all[argTextBoxId].value = "";
}

function jf_SetItem(argTextBoxId,argIdx)
{
	Page_BlockSubmit = true;

	var ddUnitobj = document.all.ddUnit;
	var ret = jf_ShowOrgDialog(SHOW_ORG);//回傳格式=名稱,說明,PATH
	if(ret!=null)
	{
		//若是對已有值的組織TextBox作重新設定，則必須先刪除該組織再行新增
		if( argIdx < ddUnitobj.length )
			if(ddUnitobj[argIdx].value != "")
				jf_DeleteItem(argTextBoxId, argIdx);

		//新增option到ddUnit中，並顯示組織名稱於組織TextBox中
		var oOption = document.createElement("OPTION");
		ddUnitobj.add(oOption);
		oOption.value     = GetElement(ret,2);
	    //1060518 Zen 1060215 innerText相關修正		//oOption.innerText = oOption.value;
		oOption.textContent = oOption.value;
		document.all[argTextBoxId].value = GetElement(ret,0);
	}
}
//1050506 Zen 1050087 二代公文修改
/*
function fnCallWS(argWS, argFuncName)
{
    var callObj = new Object();
    callObj.funcName = argFuncName;      // Name of the remote function.
    callObj.async = true;         // A Boolean that specifies the type of call
    callObj.timeout = 20;         // Timeout value for the method call (seconds)
    // SOAP header information
    callObj.SOAPHeader = "<SOAP-ENV:Header>";
    callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
    callObj.SOAPHeader += 5;
    callObj.SOAPHeader += "</t:Transaction>";  
    callObj.SOAPHeader += "</SOAP-ENV:Header>";  

    service.useService(argWS + "?WSDL", "f1");
    iCallID = service.f1.callService(wsResults, callObj);
}
*/
function wsResults(result)
{
    if(result.error)
    {
        var xfaultcode   = result.errorDetail.code;
        var xfaultstring = result.errorDetail.string;
        var xfaultsoap   = result.errorDetail.raw;
    }
    else
    {
        if(result.value)
        {
			//重新載入
			var idx = 0;
			for(idx=0; idx<document.all.tbTool.numItems; idx++)
				if(document.all.tbTool.getItem(idx).getAttribute("ID") == "btOpen")
					break;
			if(document.all.tbTool.numItems > idx)
				document.all.tbTool.getItem(idx).click();
		}
    }
}