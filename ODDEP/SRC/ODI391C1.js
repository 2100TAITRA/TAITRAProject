/*
 * DATE    SA	   PRG		MGR_NO		DESC
 * 1050718 David   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050718 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    /*1050718 Justin 1050087 二代公文修改 
	if (document.all["ValidationSummary1"].innerText != "")
	    alert(document.all["ValidationSummary1"].innerText);*/
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
		//設定
		case "btSetup":
			Page_BlockSubmit=true;
			if(CheckBeforSetup)
				SetupToDg();
			break;
		//全選
		case "btSelectAll":
			Page_BlockSubmit=true;
			SelectAllCheckBox();
			break;
		//反向
		case "btReverse":
			Page_BlockSubmit=true;
			ReverseCheckBoxSelect();
			break;		
	}	
}

//1050718 Justin 1050087 二代公文修改 
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
	
    //1050718 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050718 Justin 1050087 二代公文修改 
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
		    //1050718 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050718 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050718 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//###############################################################################
//							Button Click Function
//###############################################################################
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
	//檢查郵寄日期不可為空白
	if(!CheckNotEmptyAndAlert("txPostDate","郵寄日期"))
		return false;
	//檢查郵地區號及地址不可為空白
	if(!CheckPostCodeAddressAndAlert())
		return false;
	//檢查遞送方式及郵資
	//若目前選擇之郵遞方式其基本郵資不為0,則郵資欄位不可為0
	if(!CheckPostTypeCostAndAlert())
		return false;
	return true;
}

//需要至少一個CheckBox onCheck
function CheckBeforSetup()
{
	var bRtnbool = false;
	for(var i=2;i<document.all.dg1.rows.length+1;i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			bRtnbool = true;
			break;
		}
	}
	return bRtnbool;
}

function SetupToDg()
{
	for(var i=2;i<document.all.dg1.rows.length+1;i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			//遞送方式
			SetDDlSelectByText("dg1__ctl"+i+"_dgDllSendType",document.all.ddlSendType.options[document.all.ddlSendType.selectedIndex].text);
			//郵資
			document.all["dg1__ctl" + i + "_dgTxPostCost"].value = document.all.txPostCost.value;			
			//彙總
			if(document.all.cbIsCombine.checked)
				document.all["dg1__ctl" + i + "_dgCbIsCombine"].checked = true;
			else
				document.all["dg1__ctl" + i + "_dgCbIsCombine"].checked = false;				
		}
	}
}

function SelectAllCheckBox()
{
	for(var i=2;i<document.all.dg1.rows.length+1;i++)
	{
		document.all["dg1__ctl" + i + "_cbSelect"].checked = true;		
	}
}
function ReverseCheckBoxSelect()
{
	for(var i=2;i<document.all.dg1.rows.length+1;i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
			document.all["dg1__ctl" + i + "_cbSelect"].checked = false;
		else
			document.all["dg1__ctl" + i + "_cbSelect"].checked = true;		
			
	}
}
//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################
function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    /*1050718 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要*/
	ShowMsg();
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050718 Justin 1050087 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//###############################################################################
//						Server端Register之Function
//###############################################################################
function txPostDate_onblur()
{
    if(!CheckDate(document.all.txPostDate,"郵寄日期"))
        /*1050718 Justin 1050087 二代公文修改
		FocusAt(document.all.txPostDate);*/
        FocusAt(txPostDate);
}

function ddlSendType_onchange()
{
	var ddlSendTypeValue = document.all.ddlSendType.options[document.all.ddlSendType.selectedIndex].value;
	var ddlSendTypeValueArray = ddlSendTypeValue.split(",");
	if(document.all.ddlSendType.options[document.all.ddlSendType.selectedIndex].value != "")
	{
		if(ddlSendTypeValueArray[1] != null)
			document.all.txPostCost.value = ddlSendTypeValueArray[1];
	}
	else
	{
		document.all.txPostCost.value = "";
	}
}

function dgDllSendType_onchange()
{
	//取得DataGrid中作用之物件
	var RowNum=getRowIndex();
	var ddlSendTypeValue = document.all["dg1__ctl" + RowNum + "_dgDllSendType"].options[document.all["dg1__ctl" + RowNum + "_dgDllSendType"].selectedIndex].value;
	var ddlSendTypeValueArray = ddlSendTypeValue.split(",");
	if(document.all["dg1__ctl" + RowNum + "_dgDllSendType"].options[document.all["dg1__ctl" + RowNum + "_dgDllSendType"].selectedIndex].value != "")
	{
		if(ddlSendTypeValueArray[1] != null)
			document.all["dg1__ctl" + RowNum + "_dgTxPostCost"].value = ddlSendTypeValueArray[1];
	}
	else
	{
		document.all["dg1__ctl" + RowNum + "_dgTxPostCost"].value = "";
	}
}

//###############################################################################
//						private Function
//###############################################################################
function SetControlDisable(argControlName)
{	
	document.all[argControlName].disabled  = true;
	if(document.all[argControlName].type == "text")
		document.all[argControlName].style.backgroundColor = "LightGrey";
}

function SetControlEnable(argControlName)
{
	document.all[argControlName].disabled  = false;
	if(document.all[argControlName].type == "text")
		document.all[argControlName].style.backgroundColor = "";
}

function SetControlDisplay(argControlName)
{
	document.all[argControlName].style.display = "block";
}
function SetControlHidden(argControlName)
{
	document.all[argControlName].style.display = "none";
}
function SetCombBoxDisable(argControlName)
{
	SetControlDisable(argControlName+"_Text");
	SetControlDisable(argControlName);
}
 
function SetCombBoxEnable(argControlName)
{
	SetControlEnable(argControlName+"_Text");
	SetControlEnable(argControlName);
}

function FocusAt(argObj)
{
    /*1050718 Justin 1050087 二代公文修改
	if(!argObj.disabled)
	    argObj.focus();*/
    if(!document.all[argObj].disabled)
        $('#' + argObj).focus();
}

function CheckCDATE(argObj,argObjName)
{
	if(document.all[argObj].value != "")
	{
		jf_PADCHAR(document.all[argObj],7,'0');
		if(!jf_CheckCDATE(document.all[argObj].value))
		{
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
		    /*1050718 Justin 1050087 二代公文修改
			FocusAt(document.all[argObj]);*/
		    FocusAt(argObj);
			return false;
		}
	}
	return true;
}

//比較數字大小
//如果argNum1 > argNum2則回傳true
//如果argNum1 <= argNum2則回傳true
function CompareNumber(argNum1,argNum2)
{
	if(argNum1 == Math.min(argNum1,argNum2))
		return false;
	else
		return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr)
{
	var num = argNumStr;
	
	if(num.length > 0)
	{
		if(argNumStr.charAt(0) == "0")
			num = argNumStr.substr(1,argNumStr.length-1);
		if(num.charAt(0) == "0" )
			num = StringGetInt(num)
	}
	return num;
}

function SetDDlSelectByValue(argSelectId,argSelectValue)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		//有可能Value的形式為 v1,v2,v3
		if(GetValueFromValueArray(document.all[argSelectId].options[i].value,0) == argSelectValue)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//會取得 "t1,t2,t3"結構中的第argIndex個值
function GetValueFromValueArray(argValueArray,argIndex)
{
	var RtnValueArray = argValueArray.split(",");
	return RtnValueArray[argIndex];
}

function SetDDlSelectByText(argSelectId,argSelectText)
{
	if(argSelectText == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		if(document.all[argSelectId].options[i].text == argSelectText)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName,argFieldName)
{
	if(document.all[argObjName].value == "")
	{
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName+"不可為空白"])),"");	
	    /*1050718 Justin 1050087 二代公文修改
		FocusAt(document.all[argObjName]);*/
	    FocusAt(argObjName);
		return false;
	}
	return true;
}

function CheckPostCodeAddressAndAlert()
{
	var EmptySeqNo="";
	for(var i=2;i<document.all.dg1.rows.length+1;i++)
	{
		if(document.all["dg1__ctl" + i + "_txRcvOrg"].value != "")
		{
			if(document.all["dg1__ctl" + i + "_txPostCode"].value == "" ||
			document.all["dg1__ctl" + i + "_txAddress"].value == "")
			{
				EmptySeqNo += ","+document.all["dg1__ctl" + i + "_lbSeq"].innerText;
			}
		}
	}
	if(EmptySeqNo != "")
	{
		EmptySeqNo  = EmptySeqNo.substr(1,EmptySeqNo.length-1);
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序："+EmptySeqNo+"中的郵遞區號及地址不可為空白"])),"");						
		return false;				
	}
	return true;	
}

function CheckPostTypeCostAndAlert()
{
	for(var i=2;i<document.all.dg1.rows.length+1;i++)
	{
		if(document.all["dg1__ctl" + i + "_dgDllSendType"].options[document.all["dg1__ctl" + i + "_dgDllSendType"].selectedIndex].value != "")
		{
			var RealCost = GetValueFromValueArray(document.all["dg1__ctl" + i + "_dgDllSendType"].options[document.all["dg1__ctl" + i + "_dgDllSendType"].selectedIndex].value,1);
			//傳遞方式規定的郵資
			if(RealCost != "0"  )
			{
				//郵資欄位
				if(document.all["dg1__ctl" + i + "_dgTxPostCost"].value == "" ||
				 document.all["dg1__ctl" + i + "_dgTxPostCost"].value == "0")
				{
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號"+document.all["dg1__ctl" + i + "_lbSeq"].innerText+"中遞送方式所規定的郵資>0,則郵資欄位不得為空白或0"])),"");						
				    /*1050718 Justin 1050087 二代公文修改
					FocusAt(document.all["dg1__ctl" + i + "_dgTxPostCost"]);*/
					FocusAt("dg1__ctl" + i + "_dgTxPostCost");
					return false;
				}
			}
		}
	}
	return true;
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex()
{
   //return intRowIndex = event.srcElement.parentElement.rowIndex;   
	var xObjectName = event.srcElement.id;
	return xObjectName.substring(8,xObjectName.indexOf("_",8));   
}

function ReturnSelect(argPropNo)
{
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].text = argPropNo;
    opener.document.all.lbReturnValue.options[0].value = argPropNo;
    opener.window.CallBack("ODI391C1");
    close();
}
