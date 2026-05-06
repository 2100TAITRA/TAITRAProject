/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2025.04.23	Joeko	  	1140131	新增程式EDR4021_VAC案件類別清單查詢作業
 ****************************************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

function ClientButtonControl(e)
{

	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	Page_BlockSubmit=true;
	switch (xObjectName)
	{

	}
}

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
	
	xObjectName = event.target.id
	
	Page_BlockSubmit=false;

	switch (xObjectName)
	{
		case "btPreview":
		case "btExcel":
		case "btODS":
			Page_BlockSubmit = !CheckBeforeSearch();
			jf_ToolBarSubmit(xObjectName);
			break;
	}	
}


function CheckBeforeSearch()
{
	let start = document.all.txRcvDateStart.value;
	let end = document.all.txRcvDateEnd.value;
	if (!CheckDATE('txRcvDateStart', "收(創)文日期範圍(起)") || !CheckDATE('txRcvDateEnd', "收(創)文日期範圍(迄)")) {
		return false; 
	}
	if (start == "" && end == "")
	{
		alert("收(創)文日期為必要欄位");
		$('#txRcvDateStart').focus();

		return false;
	}

	else
	{
		if (start != "" && end == "")
			document.all["txRcvDateEnd"].value = start;
		else if (start == "" && end != "")
			document.all["txRcvDateStart"].value = end;
		else if (start > end) {
			document.all["txRcvDateStart"].value = end;
			document.all["txRcvDateEnd"].value = start;
		}

		return true;
	}

}

var bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
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

			$('#'+argObj).focus(); 
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	dlPtyChange();
	dlProTypeChange();
	dlBSTypeChange();

}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function dlPtyChange() {
	$('#ddlPty').change(function () {
		const ptyVal = $(this).val();
		const proVal = $('#ddlProType').val();
		if ((ptyVal === "3" && proVal === "N") || (ptyVal !== "3" && proVal === "P")) {
			$('#ddlProType').val("");
		}
		fnddlPtrChange();
	});
}

function dlProTypeChange() {
	$('#ddlProType').change(function () {
		const proVal = $(this).val();
		const ptyVal = $('#ddlPty').val();
		if ((proVal === "P" && ptyVal !== "3") || (proVal === "N" && ptyVal === "3")) {
			$('#ddlPty').val('');
			fnClearDropDownList($('#ddlBSType')[0]);
			$('#ddlBSType').append($("<option></option>").val("").text(""));
		}
	});
}

function dlBSTypeChange() {
	$('#ddlBSType').change(function () {
		let text = $(this).find("option:selected").text();
		$('#txBSTypeText').val(text);
	});
}

function fnddlPtrChange(objSelect)
{

	var PtyNo = $('#ddlPty').val();
	var ddlBSType = $('#ddlBSType')[0];
	var ddlHidden = $('#ddlHidType')[0];
	fnClearDropDownList(ddlBSType);
	ddlBSType.options.add(new Option("", ""));

	if (PtyNo === "") {
		$('#txBSTypeText').val("");
		return
	};

	for (var i = 0; i < ddlHidden.options.length; i++) {
		var opt = ddlHidden.options[i];
		var valParts = opt.value.split('|');
		if (valParts[0] === PtyNo) {
			ddlBSType.options.add(new Option(opt.text, valParts[1]));
        }
	}
	//if (ddlBSType.options.length > 1) {
	//	//是否預選
	//	//ddlBSType.selectedIndex = 1;
	//	$('#txBSTypeText').val(ddlBSType.options[0].text);
	//}
	//else {
		$('#txBSTypeText').val("");
	/*}*/
	$('#ddlBSType').off('change').on('change', function () {
		var selectedText = $('#ddlBSType option:selected').text();
		if ($(this).val() !== "")
			$('#txBSTypeText').val(selectedText);
		else
			$('#txBSTypeText').val("");
	});
}

function fnClearDropDownList(obj)//專用呼叫清空控制項
{
	while(obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
		obj.options.remove(0);			
}


