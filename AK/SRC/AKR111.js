/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2011.08.08	Jeff	1000635	修正由子視窗帶回批號作預覽時出現查無資料的錯誤訊息。
 * 2017.01.25	Kenny	1050087 二代公文系統相關修改
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060125	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060125	Kenny	[1050087]   二代公文系統相關修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060125	Kenny	[1050087]   二代公文系統相關修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060125	Kenny	[1050087]   二代公文系統相關修改
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
		case "btAcpNo1":
		case "btAcpNo2":
			var strUrl = "";
			ActionWin = xObjectName;
			strUrl = "AKR330C2.aspx?rtnObj=lbReturnValue";
			//1060125	Kenny	[1050087]   二代公文系統相關修改；調整視窗大小
			//jf_OpenChildWin(strUrl, "AKR330C1", 500, 500);
            jf_OpenChildWin(strUrl, "AKR330C1", 800, 600);
			Page_BlockSubmit = true;
			break;
	}	
}

//1060125	Kenny	[1050087]   二代公文系統相關修改
//function jf_ToolBarHandle()
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
	
	//1060125	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btPrint":
			if (CheckAcpNo())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			//1060125	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (CheckAcpNo())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1060125	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if(argCallerId=="AKR330C2")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			if(ActionWin == "btAcpNo1")
			{
				document.all["txAcpNo1"].value = document.all["lbReturnValue"].options[0].value;
			}
			else
			{
				document.all["txAcpNo2"].value = document.all["lbReturnValue"].options[0].value;
			}
			
			var oldlength = document.all["lbReturnValue"].length;
			for(i=0;i<oldlength;i++)
			{
				document.all["lbReturnValue"].remove(0);
			}
			//100808	Jeff	1000645		當子視窗帶回值時，清空日期欄位避免因為批號日期 與 上面時間不符合造成查無資料的錯誤發生
			document.all["txSDate"].value="";
			document.all["txEDate"].value="";
		}
	}
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
	//1060125	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
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

//檢查點收批號:起訖不可皆為空白
function CheckAcpNo()
{
	var strErrMsg="";
	var strSDate = jf_Trim(document.all["txSDate"].value);
	var strEDate = jf_Trim(document.all["txEDate"].value);
	var strSNo = jf_Trim(document.all["txAcpNo1"].value);
	var strENo = jf_Trim(document.all["txAcpNo2"].value);
	if (strSDate+strEDate+strSNo+strENo == "")
	{
		//1060125	Kenny	[1050087]   二代公文系統相關修改
		//document.all["txSDate"].focus();
		$('#txSDate').focus();
		strErrMsg = "作業日期、點收批號不可皆為空白"+"\n"+strErrMsg;
	}
	
	if (strErrMsg == "")
		return true;
	else
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		return false;
	}
}

/*****************************************************************************************
							其	他	共	用	function
******************************************************************************************/
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
			//1060125	Kenny	[1050087]   二代公文系統相關修改
            //document.all[argObj].focus();
            $('#'+argObj).focus();
		}
	}
}
