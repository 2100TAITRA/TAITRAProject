/*
Date	SA		PRG		MGR_NO		DESC
1050601 Cloud   Zen     1050087     二代公文修改
1051031	Leslie	Joe		1050087	二代修改配合行動平台
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050601 Zen 1050087 二代公文修改--begin
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1050601 Zen 1050087 二代公文修改--end
window.onunload = fnWindowOnUnLoad;
function fnWindowOnUnLoad()
{
	window.returnValue = true;
}

//1051031	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051031	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;

	switch (xObjectName)
	{
		case "btAddAll":
			jf_AddAll();
			Page_BlockSubmit=true;
			break;
		case "btAdd":
			jf_Add();
			Page_BlockSubmit=true;
			break;
		case "btRemove":
			jf_Remove();
			Page_BlockSubmit=true;
			break;
		case "btRemoveAll":
			jf_RemoveAll();
			Page_BlockSubmit=true;
			break;
	}
}
//1050601 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;

    //1050601 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			jf_SavelistCoUnit();
		    //1050601 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{}

function ClientOnLoad()
{
    //1050601 Zen 1050087 二代公文修改
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
}

function OnWSResult(argResult)
{}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
		bRtnbool = CheckBeforSave();
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	var bRtnbool = true;
	var strBuffer="";
	var iSeq;
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		for (var iCol=iRow+1;iCol<document.all["dg1"].rows.length+1;iCol++)
		{
			if (document.all["dg1__ctl"+iRow+"_txUsual"].value == document.all["dg1__ctl"+iCol+"_txUsual"].value)
			{
				bRtnbool = false;
				iSeq = iRow
				break;
			}
		}
		if (!bRtnbool)
			break;
	}
	if (!bRtnbool)
	{
	    //1050601 Zen 1050087 二代公文修改
	    //document.all["dg1__ctl" + iSeq + "_txUsual"].focus();
	    $('#dg1__ctl'+iSeq+'_txUsual').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["常用詞不可重複"])),"");
	}
	else
	{
		for (var i=2;i<document.all["dg1"].rows.length+1;i++)
		{
			document.all["H_KeyWord"].value += strBuffer + document.all["dg1__ctl"+i+"_txUsual"].value;
			strBuffer = "^";
		}
	}
	
	return bRtnbool;
}

function jf_AddAll()
{
	if(document.all.listAllUnit.options.length == 0)
		return;

	var iIdx = document.all.listCoUnit.selectedIndex + 1;
	
	while(document.all.listAllUnit.options.length > 0)
	{
		var oOption = document.createElement("OPTION");
		document.all.listCoUnit.options.add(oOption, iIdx);
        //1050602 Zen 1050087 二代公文修改
		//oOption.innerText = document.all.listAllUnit.options(0).text;
	    //oOption.value = document.all.listAllUnit.options(0).value;
		oOption.textContent = document.all.listAllUnit.options[0].text;
		oOption.value = document.all.listAllUnit.options[0].value;
	    //1050602 Zen 1050087 二代公文修改
		document.all.listAllUnit.options.remove(0);
		iIdx++;
	}
	
	if(document.all.listCoUnit.options.length > 0)
		document.all.listCoUnit.selectedIndex = 0;
}

function jf_Add()
{
	if(document.all.listAllUnit.options.length == 0)
		return;

	var iIdx = document.all.listCoUnit.selectedIndex + 1;
	var iSelected = document.all.listAllUnit.selectedIndex;
	var oOption = document.createElement("OPTION");
	document.all.listCoUnit.options.add(oOption,iIdx);
    //1050602 Zen 1050087 二代公文修改
	//oOption.innerText = document.all.listAllUnit.options(iSelected).text;
	//oOption.value = document.all.listAllUnit.options(iSelected).value;
	oOption.textContent = document.all.listAllUnit.options[iSelected].text;
	oOption.value = document.all.listAllUnit.options[iSelected].value;
    //1050602 Zen 1050087 二代公文修改
	document.all.listAllUnit.options.remove(iSelected);
	if(document.all.listCoUnit.options.length > 0)
		document.all.listCoUnit.selectedIndex = iIdx;
	if(document.all.listAllUnit.options.length > 0)
		document.all.listAllUnit.selectedIndex = iSelected;
}

function jf_Remove()
{
	if(document.all.listCoUnit.options.length == 0)
		return;

	var iIdx = document.all.listAllUnit.selectedIndex + 1;
	var iSelected = document.all.listCoUnit.selectedIndex;
	var oOption = document.createElement("OPTION");
	document.all.listAllUnit.options.add(oOption,iIdx);
    //1050602 Zen 1050087 二代公文修改
	//oOption.innerText = document.all.listCoUnit.options(iSelected).text;
    //oOption.value = document.all.listCoUnit.options(iSelected).value;
	oOption.textContent = document.all.listCoUnit.options[iSelected].text;
	oOption.value = document.all.listCoUnit.options[iSelected].value;
    //1050602 Zen 1050087 二代公文修改
	document.all.listCoUnit.options.remove(iSelected);
	
	if(document.all.listAllUnit.options.length > 0)
		document.all.listAllUnit.selectedIndex = iIdx;
	if(document.all.listCoUnit.options.length > 0)
		document.all.listCoUnit.selectedIndex = iSelected;
}

function jf_RemoveAll()
{
	if(document.all.listCoUnit.options.length == 0)
		return;

	var iIdx = document.all.listAllUnit.selectedIndex + 1;
	
	while(document.all.listCoUnit.options.length > 0)
	{
		var oOption = document.createElement("OPTION");
		document.all.listAllUnit.options.add(oOption,iIdx);
	    //1050602 Zen 1050087 二代公文修改
		//oOption.innerText = document.all.listCoUnit.options(0).text;
	    //oOption.value = document.all.listCoUnit.options(0).value;
		oOption.textContent = document.all.listCoUnit.options[0].text;
		oOption.value = document.all.listCoUnit.options[0].value;
	    //1050602 Zen 1050087 二代公文修改
		document.all.listCoUnit.options.remove(0);
		iIdx++;
	}
	
	if(document.all.listAllUnit.options.length > 0)
		document.all.listAllUnit.selectedIndex = 0;
}

function jf_SavelistCoUnit()
{
	var strValue = "";
	for(var i = 0; i < document.all.listCoUnit.options.length; i++)
	{
		//0960508 Stella [中央大學000805]改為將單位代碼置於前面，以便於排序
		//strValue += document.all.listCoUnit.options(i).text + ":" + document.all.listCoUnit.options(i).value + ",";
		strValue += document.all.listCoUnit.options(i).value + ":" + document.all.listCoUnit.options(i).text + ",";
	}
	
	if(strValue.length > 0)
		strValue = strValue.substr(0,strValue.length-1);
	document.all.h_CoUnit.value = strValue;
}