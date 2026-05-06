/*
DATE	SA		PRG		MGR_NO	DESC
1050714 David   Zen     1050087 二代公文修改
1060518 Leslie  Zen     1060215 innerText相關修改
1060606 David   Zen     1050087 二代升級問題修正
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

var btnModifyIndex = 4;
var btnDeleteRowIndex = 5;

//1050714 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050714 Zen 1050087 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	var pNo;
	var btnModify;
	var btnDeleteRow;

	if (xObjectName.indexOf("_btModify") > -1)
	{
		pNo = xObjectName.substring(8, xObjectName.indexOf("_btModify"));
		btnModify = document.all["dg1__ctl" + pNo + "_btModify"].id;
	}
	if (xObjectName.indexOf("_btDeleteRow") > -1)
	{
		pNo = xObjectName.substring(8, xObjectName.indexOf("_btDeleteRow"));
		btnDeleteRow = document.all["dg1__ctl" + pNo + "_btDeleteRow"].id;
	}

	if(IsServerHandling)
	   return;

	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	if (document.all["txDate"] != null)
		document.all["txDate"].disabled = false;//disabled=true會導致server看不到value

	switch (xObjectName)
	{
		case "btAddDate":
		    Page_BlockSubmit = !CheckBeforeAddDate();
		    //1060606 Zen 1050087 二代升級問題修正
		    jf_ToolBarSubmit(xObjectName);
			break;
	    case "btSaveDate":
	        //1060606 Zen 1050087 二代升級問題修正
	        jf_ToolBarSubmit(xObjectName);
			break;
		case btnModify:
		    //1060606 Zen 1050087 二代升級問題修正
		    //Page_BlockSubmit = true;
		    Page_BlockSubmit = false;
			document.all["txSelectedIndex"].value = pNo;
			jf_ToolBarCustomSubmit("btnModify", btnModifyIndex);
			break;
		case btnDeleteRow:
		    //1060606 Zen 1050087 二代升級問題修正
		    //Page_BlockSubmit = true;
		    Page_BlockSubmit = false;
			document.all["txSelectedIndex"].value = pNo;
			jf_ToolBarCustomSubmit("btnDeleteRow", btnDeleteRowIndex);
			break;
	}
}

//1050714 Zen 1050087 二代公文修改
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

	if (document.all["txDate"] != null)
		document.all["txDate"].disabled = false;//disabled=true會導致server看不到value
	
    //1050714 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050714 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050714 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050714 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050714 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
		    //1050714 Zen 1050087 二代公文修改
			//document.all["txYear"].focus();
			$('#txYear').focus();
			break;
	}
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    //1050714 Zen 1050087 二代公文修改
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	if (document.all["txDate"] != null)
	{
		if (document.all["txDate"].readOnly == true)
			document.all["txDate"].disabled = true;//避免觸發onclick事件
		else
			document.all["txDate"].disabled = false;//disabled=true會導致server看不到value
	}
}

function OnWSResult(argResult)
{
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
		{
			// 新增模式需檢查鍵值是否已存在
			if (jf_GetActionMode()==LayoutModeNew)
			{
				if(jf_CheckDataExist())//檢查鍵值是否已存在
				{
					//所顯示訊息請各自系統自行規劃
					//以下訊息以檔管系統範例
					//  
					//	if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					//	bRtnbool = true;
					//
				}
				else
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
	var bRtnbool = false;
	return bRtnbool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = false;
	return bRtnbool;
}

function CheckBeforeAddDate()
{
	var bRtnbool = false;
	if (CheckUnAllowEmpty())
	{
		if (CheckYear())
			bRtnbool = CheckDuplicate();
	}
	return bRtnbool;
}

function CheckUnAllowEmpty()
{
	var bRtnbool = true;
	var strErrMsg = "";

	if (document.all["txDate"].value == "")
	{
		strErrMsg = "日期不可空白";
	    //1050714 Zen 1050087 二代公文修改
		//document.all["txDate"].focus();
		$('#txDate').focus();
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMeg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	return bRtnbool;
}

function CheckYear()
{
	var bRtnbool = true;
	var strErrMsg = "";

	var strDate = jf_Trim(document.all["txDate"].value);
	var strYear = jf_Trim(document.all["txYear"].value);
	if (strDate.substring(0,3) != strYear)
	{
		strErrMsg = "日期與年度不符合";
	    //1050714 Zen 1050087 二代公文修改
		//document.all["txDate"].focus();
		$('#txDate').focus();
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMeg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	return bRtnbool;
}

function CheckDuplicate()
{
	var strType = GetDropDownListSelectedText("dlType");
	var strDate = document.all["txDate"].value;
	var strOuNm = GetOuName("dlDept");

	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
	    //1060518 Zen 1060215 innerText相關修正--begin
	    //var strDgType = document.all["dg1__ctl" + iRow + "_lbType"].innerText;
		//var strDgDate = document.all["dg1__ctl"+iRow+"_lbDate"].innerText;
	    //var strDgOuNm = document.all["dg1__ctl"+iRow+"_lbOuName"].innerText;
	    var strDgType = document.all["dg1__ctl" + iRow + "_lbType"].textContent;
	    var strDgDate = document.all["dg1__ctl" + iRow + "_lbDate"].textContent;
	    var strDgOuNm = document.all["dg1__ctl" + iRow + "_lbOuName"].textContent;
	    //1060518 Zen 1060215 innerText相關修正--end
		strDgDate = ReplaceAll(strDgDate, "/", "");
		//if (GetCompareValue(strDgType, strDgDate, strDgOuNm) == GetCompareValue(strType, strDate, strOuNm))
		if (IsAddRow(strDgType, strDgDate, strDgOuNm, strType, strDate, strOuNm))
		{
		    //1050714 Zen 1050087 二代公文修改
		    //document.all["txDate"].focus();
		    $('#txDate').focus();
			jf_ShowMeg( FormatStr( jf_GetErrMsg(CustErr), new Array(["與序"+(iRow-1)+"重複，不允許加入"]) ), "" );
			return false;
		}
	}
	return true;
}

//將value中的oldValue取代成newValue
function ReplaceAll(value, oldValue, newValue)
{
	while (value.indexOf(oldValue) > -1)
	{
		value = value.replace(oldValue, newValue);
	}
	return value;
}

//取出DropDownList的selected text
function GetDropDownListSelectedText(argObjId)
{
	var index = document.all[argObjId].selectedIndex;
	return document.all[argObjId].options[index].text;
}

function GetOuName()
{
	if (document.all["rbSource"].checked)
		return "全機關";
	return GetDropDownListSelectedText("dlDept");
}

//以Text值設定DropDownList哪一個Item被Select
function SetDropDownListByText(argObjId, argText)
{
	for (var iArr=0;iArr<document.all[argObjId].options.length;iArr++)
	{
		if (document.all[argObjId].options[iArr].text == argText)
			document.all[argObjId].selectedIndex = iArr;
	}
}

function SetUsedDept(strOuNm)
{
	if (document.all["rbSource"].text == strOuNm)
		document.all["rbSource"].checked = true;
	else
	{
		document.all["rbDept"].checked = true;
		SetDropDownListByText("dlDept_Text", strOuNm);
	}
}

function jf_ToolBarCustomSubmit(argObjId, argObjIndex)
{
	document.all.ToolBarSenderID.value = argObjId;

	//if(Page_BlockSubmit==false)為了檔button_click故在此不做Page_BlockSubmit檢查
	//{
		IsServerHandling = true;
		jf_ShowWaitState();
		__doPostBack("tbTool",argObjIndex);
	//}
}

function IsAddRow(argDgType, argDgDate, argDgOuNm, argType, argDate, argOuNm)
{
	if (argDgOuNm == "全機關")//如果已經有'全機關'，就不允許同一天再加入
	{
		if (GetCompareValue1(argDgType, argDgDate, argDgOuNm) == GetCompareValue1(argType, argDate, argOuNm))
			return true;
		else
			return false;
	}
	//若沒有'全機關'，則同一天允許不同單位再加入，若加入的是'全機關'，則server會刪除子單位
	if (GetCompareValue2(argDgType, argDgDate, argDgOuNm) == GetCompareValue2(argType, argDate, argOuNm))
		return true;
	else
		return false;
}

function GetCompareValue1(argType, argDate, argOuNm)
{
	return argDate;
}

function GetCompareValue2(argType, argDate, argOuNm)
{
	return argDate + "-" + argOuNm;
}

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
		    //1050714 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}