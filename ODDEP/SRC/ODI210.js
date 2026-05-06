/*
DATE	SA		PRG		MSG_NO		DESC	
0981203			Albert	0980336		修改不再自網址參數取得Artifact
1050418	Cloud	Joe		1050087		二代系統升級
1050520	Cloud	JOE		1050087		二代系統升級，調整focus寫法
1050721	David	David	1050087		二代系統升級，調整ODC010回傳值處理
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050418	Joe	1050087	二代系統升級
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050418	Joe	1050087	二代系統升級
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btAll":
			for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked == false)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = true;
			}
			Page_BlockSubmit = true;
			break;
		case "btClear":
			for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked == true)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = false;
			}
			Page_BlockSubmit = true;
			break;
		case "btChange":
			for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = false;
				else
					document.all["dg1__ctl"+iRow+"_cb1"].checked = true;
			}
			Page_BlockSubmit = true;
			break;
	}	
}

//1050418	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050418	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckSearch();
			//1050418	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (CheckBeforePrint())
				Page_BlockSubmit = !CheckDataGrid();
			else
				Page_BlockSubmit = true;
			//1050418	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCase":
			if (CheckBeforePrint())
				Page_BlockSubmit = !CheckDataGrid();
			else
				Page_BlockSubmit = true;
			//1050418	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	
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
	document.all[argLabelId].textContent = obj.value;
}

function ReturnValue(argCaseNo,argCaseName)
{
	if(document.all.nFromODC010.value=="True")
	{
		//1050721 David 1050087 二代系統升級，調整ODC010回傳值處理
		/*fnSetMsg("CASENO"	,argCaseNo);
		fnSetMsg("CASENAME"	,argCaseName);
		close();*/
		var $rtnCaseNo = parent.$("#txRtnCaseNo");
		$rtnCaseNo.val(argCaseNo);
		var $dlg = parent.$("#ODC010_ODI210_DIV");
		var $btn = $dlg.find("a#Dlg_close_btn");
		$btn.click();
	}
	else
	{
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].text = argCaseNo;
		opener.document.all.lbReturnValue.options[0].value = argCaseName;
		opener.window.CallBack("ODI210");
		close();
	}
}

function CheckSearch()
{
	var bRtn = true;
	var strSDate = jf_Trim(document.all["txSDate"].value);
	var strEDate = jf_Trim(document.all["txEDate"].value);
	var strWord  = jf_Trim(document.all["txWord"].value);
	var strDocNo = jf_Trim(document.all["txDocNo"].value);
	
	if (strSDate + strEDate + strWord + strDocNo == "")
	{
		bRtn = false;
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txSDate"].focus();
		$('#txSDate').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少輸入一個條件"])),"");
	}
	return bRtn;
}

function CheckBeforePrint()
{
	var bRtn = true;
	if (document.all.dg1 == null)
	{
		bRtn = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請先執行搜尋鍵"])),"");
	}
	return bRtn;
}

function CheckDataGrid()
{
	var bRtn = false;
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cb1"].checked)
		{
			bRtn = true;break
		}
	}
	if (!bRtn)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])),"");
	}
	return bRtn;
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}

function fnSetMsg(argName,argValue)
{
	var artifact = fnGetArtifact();
	if(!document.all.IEControl.SetTargetUser(artifact))
	{
		alert("無此對應之使用者");
		return false;	
	}
	document.all.IEControl.SetMsg(argName,argValue)
	return true;
}

function fnGetArtifact()
{
	//0981203 Albert 0980336 修改不再自網址參數取得Artifact
	/*
	var str = document.location.href;	
	var SAMLartStr = "";
	if (str.indexOf("?") != -1)
	{	
		var arr = str.split("?");
		str = arr[arr.length-1];
		var idx = str.indexOf("SAMLart=");
		str = str.substring(idx, str.length).replace("SAMLart=", "");
		idx = str.indexOf("&");
		if (idx == -1)
			idx = str.length;
		str = str.substring(0, idx);
		SAMLartStr = str;
	}
	*/
	var SAMLartStr = document.all.SsoArtifact.value;
	return SAMLartStr;
}
