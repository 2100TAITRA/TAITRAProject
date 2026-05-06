/*
DATE    SA		PRG		MGR_NO	        DESC
1110103	Kevin   Zen     1101292			修正多次點擊重複PostBack之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050715 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050715 Zen 1050087 二代公文修改
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
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

//1050715 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1050715 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckCondition();
		    //1050715 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = !fnCheckBeforeSave();
		    //1050715 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function ClientOnLoad()
{
	ShowMsg();
	if (!document.all.dg1)
		document.all.tbSelect.style.display = "none";
	else
		document.all.tbSelect.style.display = "";
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
		    //1050715 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
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
	    //1050715 Zen 1050087 二代公文修改
	    //document.all["txSDate"].focus();
	    $('#txSDate').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少輸入一個條件"])),"");
		return false;
	}
	return true;
}

//檢查是否有勾選要列印的項目
function fnCheckBeforeSave()
{
	if (!document.all["dg1"])
	{
		alert("必須有查詢結果才可儲存。");
		return false;
	}
	for(var i = 2; i < document.all.dg1.rows.length + 1 ; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
			return true;
	}
	alert("請至少選取一筆才可儲存。");
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

function fnChangeOrgType(argOrgType, argStdId, argCabinetNo, argElcType, argIssueType, argContactPsn)
{
	var strOrgType = document.all[argOrgType].options[document.all[argOrgType].selectedIndex].value;
	switch (strOrgType)
	{
		case "1":	//機關
		case "2":	//單位
			document.all[argStdId].disabled			= false;
			document.all[argCabinetNo].disabled		= false;
			document.all[argElcType].disabled		= false;
			document.all[argIssueType].disabled		= false;
			document.all[argContactPsn].disabled	= false;
			break;
		case "3":	//公司行號
			document.all[argStdId].disabled			= true;
			document.all[argCabinetNo].disabled		= true;
			document.all[argElcType].disabled		= true;
			document.all[argIssueType].disabled		= true;
			document.all[argContactPsn].disabled	= false;
			break;
		case "5":	//個人
			document.all[argStdId].disabled			= true;
			document.all[argCabinetNo].disabled		= true;
			document.all[argElcType].disabled		= true;
			document.all[argIssueType].disabled		= true;
			document.all[argContactPsn].disabled	= true;
			break;
	}
}
