/*
DATE	SA		PRG		MGR_NO			DESC
1030717	David	David	1030485			新增程式
1051004 David   Justin  1050087         二代公文修改
1051019 Leslie  Kenny   1050087         二代公文修改
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
//1051004 Justin 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	SetUI();
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
	    /*1051004 Justin 1050087 二代公文修改
		case "btSendDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSendDateS, event.screenX, event.screenY);
			break;
		case "btSendDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSendDateE, event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051004 Justin 1050087 二代公文修改 
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

    //1051004 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_Check();
		    //1051004 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_Check();
		    //1051004 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_Check();
		    //1051004 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_Check()
{
	if(document.all.rbType1.checked)//查詢已派繕才有日期欄位需檢核
	{
		if(document.all["txSendDateS"].value == "" || document.all["txSendDateE"].value == "")
		{
		    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["派繕日期(起)、(迄)不可為空白"])), "");
		    //1051004 Justin 1050087 二代公文修改 
			//document.all["txSendDateS"].focus();
			$('#txSendDateS').focus();
			return false;
		}

		var strDateS = document.all["txSendDateS"].value;
		var strDateE = document.all["txSendDateE"].value;
		if(strDateS != "" && strDateE != "" && strDateS > strDateE)
		{
			document.all["txSendDateS"].value = strDateE;
			document.all["txSendDateE"].value = strDateS;
		}

		if(document.all["txSendTimeS"].value == "")
		{
			document.all["txSendTimeS"].value = "0000"
		}

		if(document.all["txSendTimeE"].value == "")
		{
			document.all["txSendTimeE"].value = "2400"
		}

		if(!CheckCDATE("txSendDateS","派繕日期(起)"))
			return false;
		if(!CheckTime("txSendTimeS","派繕時間(起)"))
			return false;
		if(!CheckCDATE("txSendDateE","派繕日期(迄)"))
			return false;
		if(!CheckTime("txSendTimeE","派繕時間(迄)"))
			return false;
	}
	else
	{
		if(!CheckHour())
			return false;
	}

	return true;
}

//檢核日期格式
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
			if (strMsg)
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1051004 Justin 1050087 二代公文修改 
		    //document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

//檢核時間格式
function CheckTime(argObj,strMsg)
{
	var strTime = document.all[argObj].value;
	if (strTime != "")
	{
		if (strTime.length < 4)
		{
			strTime = jf_PADL(strTime,4,'0');
			document.all[argObj].value = strTime;
		}

		var iHour = parseInt(strTime.substr(0,2));
		var iMinute = parseInt(strTime.substr(2,2));

		if(iHour > 24 || iMinute > 59)
		{
			if (strMsg)
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1051004 Justin 1050087 二代公文修改 
		    //document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

//檢核小時欄位
function CheckHour()
{
	try
	{
		if(document.all.txHour.value == "")
		{
			alert("超過幾小時未處理欄位不可為空");
			return false;
		}

		if(isNaN(document.all.txHour.value) || parseInt(document.all.txHour.value) == 0)
		{
		    alert("超過幾小時未處理欄位請輸入數字或不可為0");
		    //1051004 Justin 1050087 二代公文修改 
			//document.all.txHour.focus();
			$('#txHour').focus();
			return false;
		}
	}
	catch(e)
	{
	    alert("超過幾小時未處理欄位請輸入數字或不可為0");
	    //1051004 Justin 1050087 二代公文修改 
		//document.all.txHour.focus();
		$('#txHour').focus();
		return false;
	}

	return true;
}

//設定顯示欄位
function SetUI()
{
	if(document.all.rbType1.checked)//已派繕
	{
		document.all.lbSendDate.style.display = "";
		document.all.txSendDateS.style.display = "";
		document.all.txSendDateE.style.display = "";
	    //1051004 Justin 1050087 二代公文修改
	    //document.all.btSendDateS.style.display = "";
	    //document.all.btSendDateE.style.display = "";
		document.all.SendDatedtd.style.display = "";
		document.all.txSendTimeS.style.display = "";
		document.all.txSendTimeE.style.display = "";
		document.all.lbSendStamp.style.display = "";
		document.all.lbOrder.style.display = "";
		document.all.dlOrder.style.display = "";
		document.all.lbSign.style.display = "";
		document.all.dlSign.style.display = "";
		SetPersonDisplay("");
		SetHourDisplay("none")
	}
	else if(document.all.rbType2.checked)//未派繕
	{
		document.all.lbSendDate.style.display = "none";
		document.all.txSendDateS.style.display = "none";
		document.all.txSendDateE.style.display = "none";
	    //1051004 Justin 1050087 二代公文修改
	    //document.all.btSendDateS.style.display = "none";
	    //document.all.btSendDateE.style.display = "none";
		document.all.SendDatedtd.style.display = "none";
		document.all.txSendTimeS.style.display = "none";
		document.all.txSendTimeE.style.display = "none";
		document.all.lbSendStamp.style.display = "none";
		document.all.lbOrder.style.display = "none";
		document.all.dlOrder.style.display = "none";
		document.all.lbSign.style.display = "none";
		document.all.dlSign.style.display = "none";
		SetPersonDisplay("none");
		SetHourDisplay("")
	}
	else//未發文
	{
		document.all.lbSendDate.style.display = "none";
		document.all.txSendDateS.style.display = "none";
		document.all.txSendDateE.style.display = "none";
	    //1051004 Justin 1050087 二代公文修改
		//document.all.btSendDateS.style.display = "none";
	    //document.all.btSendDateE.style.display = "none";
		document.all.SendDatedtd.style.display = "none";
		document.all.txSendTimeS.style.display = "none";
		document.all.txSendTimeE.style.display = "none";
		document.all.lbSendStamp.style.display = "none";
		document.all.lbOrder.style.display = "none";
		document.all.dlOrder.style.display = "none";
		document.all.lbSign.style.display = "none";
		document.all.dlSign.style.display = "none";
		SetPersonDisplay("");
		SetHourDisplay("")
	}
}

function SetHourDisplay(argdisplay)
{
	document.all.lbHourS.style.display = argdisplay;
	document.all.lbHourE.style.display = argdisplay;
	document.all.txHour.style.display = argdisplay;
}

function SetPersonDisplay(argdisplay)
{
	document.all.lbPerson.style.display = argdisplay;
	document.all.dlPerson.style.display = argdisplay;
}