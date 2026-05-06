/*
DATE	SA		PRG		MGR_NO		DESC
0960920	Stella	Cola	001247		(藥檢局)額外顯示檔號
1050408	David	Kenny	1050087     二代公文系統相關修改
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050408	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050408	Kenny	[1050087]   二代公文系統相關修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

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
		case "btSelectAll":
		    Page_BlockSubmit=true;
		    try
		    {
				SelectAllCb("dg1");
			}
			catch(e){}
			break;
		case "btClean":
		    Page_BlockSubmit=true;
		    try
		    {
				CleanCb("dg1");
			}
			catch(e){}
			break;
		case "btReverse":
			Page_BlockSubmit=true;
			try
			{
				ReverseChecked("dg1");
			}catch(e){}
			break;
	}	
}

//1050408	Kenny	[1050087]   二代公文系統相關修改
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
	
	//1050408	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckCondition();
			//1050408	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			if (fnCheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			//1050408	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (fnCheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1050408	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	   case "btExcel":
	   		if (fnCheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1050408	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function ClientOnLoad()
{
	ShowMsg();
	//1050408	Kenny	[1050087]   二代公文系統相關修改，tbSelect已改為按鍵因此個別處理--Start--
	//if (!document.all.dg1)
	//	document.all.tbSelect.style.display = "none";
	//else
	//	document.all.tbSelect.style.display = "";
	if (!document.all.dg1)
	{
		document.all.btSelectAll.style.display = "none";
		document.all.btClean.style.display = "none";
		document.all.btReverse.style.display = "none";
	}
	else
	{
		document.all.btSelectAll.style.display = "";
		document.all.btClean.style.display = "";
		document.all.btReverse.style.display = "";
	}
	//1050408	Kenny	[1050087]   二代公文系統相關修改，tbSelect已改為按鍵因此個別處理--End--

	//[001247]Cola 當機關不為藥檢局時，不顯示檔號及調整datagrid width -- start --
	if (document.all["ORGNO"].value == "1")
	{
		//1050408	Kenny	[1050087]   二代公文系統相關修改，datagrid總和寬度由Page_Load裡各欄位寬度設定而決定，不另行設定
		//document.all["DIV1"].style.width = "739px";
	}
	//Cola -- end --
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
			//1050408	Kenny	[1050087]   二代公文系統相關修改
			//document.all[argObj].focus();
			$('#'+argObj).focus(); 
		}
	}
}

function CheckCondition()
{
	var strSDate	= jf_Trim(document.all["txSDate"].value);
	var strEDate	= jf_Trim(document.all["txEDate"].value);
	var strDocNo	= jf_Trim(document.all["txDocNo"].value);
	if (strSDate + strEDate + strDocNo == "")
	{
		//1050408	Kenny	[1050087]   二代公文系統相關修改
		//document.all["txSDate"].focus();
		$('#txSDate').focus(); 
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少輸入一個條件"])),"");
		return false;
	}
	return true;
}

//檢查是否有勾選要列印的項目
function fnCheckBeforePrint()
{
	if (!document.all["dg1"])
	{
		alert("必須有查詢結果才可進行列印。");
		return false;
	}
	for(var i = 2; i < document.all.dg1.rows.length + 1 ; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
			return true;
	}
	alert("請至少選取一筆以進行列印。");
	return false;
}

function SelectAllCb(argTableName)
{
	for(var i= 2;i<document.all[argTableName].rows.length+1;i++)
		document.all[argTableName+"__ctl"+i+"_cbSelect"].checked = true;	
}

function CleanCb(argTableName)
{
	for(var i= 2;i<document.all[argTableName].rows.length+1;i++)
		document.all[argTableName+"__ctl"+i+"_cbSelect"].checked = false;	
}

/// <summary>
/// 按反向將CheckBox之Checked屬性反向
/// <summary>
function ReverseChecked(argTableName)
{
	for(var i= 2;i<document.all[argTableName].rows.length+1;i++)
		document.all[argTableName+"__ctl"+i+"_cbSelect"].checked = !(document.all[argTableName+"__ctl"+i+"_cbSelect"].checked);
}
