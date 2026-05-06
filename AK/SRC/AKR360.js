/*
DATE 	SA		PRG		MGR_NO	DESC
1060216	Cloud	Joe		1050087	二代升級
1060925	Cloud	Joe		1060867	二代升級修正
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060215	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060215	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	

//1060215	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060215	Joe	1050087	二代系統升級
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
		/*
		case "":
			break;
		*/
	}	
}

//1060215	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060215	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":
			var xUrl = "AKP210.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"AKP210",760,500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
			if (CheckEmpty())
				Page_BlockSubmit = !CheckLevel();
			else
				Page_BlockSubmit = true;
			//1060215	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="AKP210")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
			if (strMaxUseDate == "")
				document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			else
				document.all["lbMaxYear"].textContent = "目前統計最大年度："+
													strMaxUseDate.substr(0,3)+"年";
		}
	}
}

function ClientOnLoad()
{
	//1060925	Joe		1060867		二代升級修正
	// jf_CallWS("lib/AK_LIB.asmx", "GetCKA", false, null);
	
	//1010903	Jagle	1010637	有錯誤資料時跳出提示訊息
	if(document.all.H_DATA_ERROR && document.all.H_DATA_ERROR.value == "Y")
	{
		alert("取得資料時發現異常資料，異常文號："+document.all.H_DATA_ERROR.value+"\r\n詳細訊息請見LOG檔，或洽詢系統管理員");
		document.all.H_DATA_ERROR.value = "N";
	}
}

function OnWSResult(argResult,argElementId,argHiddenId)
{
	if (argResult.id == wsCheckCls)
	{
		if(jf_IsWebServiceSuccess(argResult))
			document.all[argHiddenId].value = argResult.value.ClsLvl;
		else
		{
			document.all[argHiddenId].value = "";
			//1060215	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argElementId].focus();
			$('#' + argElementId).focus();
		}
	}
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

var wsCheckCls;
function CheckCls(argElementId,argHiddenId)
{
	var strValue = jf_Trim(document.all[argElementId].value);
	if (strValue != "")
	{
		var arWSParam = new Array(1);
		arWSParam[0] = strValue;
		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA", false, arWSParam);
		wsCheckCls = callObj.id;
		OnWSResult(callObj,argElementId,argHiddenId);
	}
	else
		document.all[argHiddenId].value = "";
}

function CheckEmpty()
{
	var strYear = jf_Trim(document.all["txYear"].value);
	//var strSDate = jf_Trim(document.all["txSDate"].value);
	//var strEDate = jf_Trim(document.all["txEDate"].value);
	var strErrMsg = "";
	var bRtn = true;
	/*
	if (strEDate == "")
	{
		strErrMsg = "編目日期(迄)不可空白\n"+strErrMsg;
		document.all["txEDate"].focus();
	}
	if (strSDate == "")
	{
		strErrMsg = "編目日期(起)不可空白\n"+strErrMsg;
		document.all["txSDate"].focus();
	}
	*/
	if (strYear == "")
	{
		strErrMsg = "編目年度不可空白\n"+strErrMsg;
		//1060215	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txYear"].focus();
		$('#txYear').focus();
	}
	
	if (strErrMsg != "")
	{
		bRtn = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}
	return bRtn;
}

function CheckLevel()
{
	return true;
	
	var strSlv = document.all["H_Slv"].value;
	var strElv = document.all["H_Elv"].value;
	var bRtn = true;
	if (strSlv+strElv != "")
	{
		if (strSlv != strElv)
		{
			bRtn = false;
			//1060215	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txSCls"].focus();
			$('#txSCls').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["統計分類號所屬階層不一致，請設定為相同階層再執行"])),"");
		}
	}
	return bRtn;
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
//1060215	Joe	1050087	二代系統升級，修正日期Onblur寫法--s
// function CheckCDATE(argObj,strMsg)
// {
	// var strDate = document.all[argObj].value;
	// if (strDate != "")
	// {
		// if (strDate.length < 7)
		// {
			// strDate = jf_PADL(strDate,7,'0');
			// document.all[argObj].value = strDate;
		// }
		// if (!jf_CheckCDATE(strDate))
		// {
			// jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			// document.all[argObj].focus();
		// }
	// }
// }
//1060215	Joe	1050087	二代系統升級，修正日期Onblur寫法--e

function txYear_onblur()
{
	var strYear = document.all.txYear.value;
	if (strYear != "")
	{
		//1060215	Joe	1050087	二代系統升級，修正日期Onblur寫法--s
		// if (strDate.length < 3)
		if (strYear.length < 3)
		{
			// strDate = jf_PADL(strYear,3,'0');
			strYear = jf_PADL(strYear,3,'0');
			// document.all[argObj].value = strYear;
			document.all.txYear.value = strYear;
		}
		
		// if (!jf_CheckCDATE(strDate))
		// {
			// jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			// document.all[argObj].focus();
		// }
		
		//1060215	Joe	1050087	二代系統升級，修正日期Onblur寫法--e
	}
}