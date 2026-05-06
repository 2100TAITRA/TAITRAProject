/*
 * DATE    SA	   PRG		MGR_NO		DESC
 * 1050628 David   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*1050628 Justin 1050087 二代公文修改 
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;*/

function ShowMsg()
{
    /*1050628 Justin 1050087 二代公文修改 
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
		/*
		*/
	}	
}

//1050628 Justin 1050087 二代公文修改 
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
	
    //1050628 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btFastSearch":
			Page_BlockSubmit = false;
		    //1050628 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
		    strUrl = "ODI391C1.aspx";
		    //1050729 Justin 1050087 二代公文修改
		    //jf_OpenChildWin(strUrl, "ODI391C1", 700, 500);
		    jf_OpenChildWin(strUrl, "ODI391C1", 800, 600);
			Page_BlockSubmit=true;
			break;
		case "btQuery":
			Page_BlockSubmit = !CheckBeforQuery();
		    //1050628 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = true;
		    //1050628 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = true;
		    //1050628 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//###############################################################################
//							Button Click Function
//###############################################################################

//查詢前欄位檢查
function CheckBeforQuery()
{
	var bRtnbool = true;
	document.all.txPostDateS.value = jf_Trim(document.all.txPostDateS.value);
	document.all.txPostDateE.value = jf_Trim(document.all.txPostDateE.value);
	document.all.txPostSeqS.value = jf_Trim(document.all.txPostSeqS.value);
	document.all.txPostSeqE.value = jf_Trim(document.all.txPostSeqE.value);
	document.all.txPropNoS.value = jf_Trim(document.all.txPropNoS.value);
	document.all.txPropNoE.value = jf_Trim(document.all.txPropNoE.value);
	if(document.all.txPostDateS.value == "" 
	  && document.all.txPostDateE.value == ""
	  && document.all.txPostSeqS.value == ""
	  && document.all.txPostSeqE.value == ""
	  && document.all.txPropNoS.value == ""
	  && document.all.txPropNoE.value == "" )	
    {
	    alert("郵寄日期、郵寄編號、拆帳單編號至少需輸入一項");
	    /*1050628 Justin 1050087 二代公文修改
		document.all.txPostDateS.focus();*/
		$('#txPostDateS').focus();
		bRtnbool = false;
    }
    return bRtnbool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	if (document.all.dg1)
		return true;
	else 
	{
		alert("請先查詢資料後再列印。");
		return false;
	}
}


//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################

function CallBack(argCallerId)
{
	if (argCallerId == "ODI391C1")
	{
		document.all.txPropNoS.value = document.all["lbReturnValue"].options[0].value;
		document.all.txPropNoE.value = document.all["lbReturnValue"].options[0].value;
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    ShowMsg();
    /*1050628 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要*/
	//jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, null);//共用function jf_CheckDataExist必要
}

function OnWSResult(argResult)
{
    
    //webserver回傳後動作
    //檢查回傳的webserverID
    //範例
    /*
    if (argResult.id == wsGetOrgInfoID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["txGrp_Name"].value = argResult.value.RtnField0[0];
		}
		else
		{
			//document.all["txGrp_Name"].value = "";
			//document.all["txGrp_No"].focus();
		}
	}
	*/
	
}

/*
function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}
*/

//###############################################################################
//						Server端Register之Function
//###############################################################################

//Client端物件onblur事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;
	
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txGrp_No"].value != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "GRP_NO";
			arKeyValue[0]   = document.all["txGrp_No"].value;
			arRtnFldName[0] = "GRP_NAME";
			arOrdFldName[0] = "GRP_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "GRP_HEADER";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsGetGrpNameID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
*/
/*
function txPostDate_onblur()
{
	if(!CheckDate(document.all.txPostDate,"郵寄日期"))
		FocusAt(document.all.txPostDate);
}
*/
/*
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
*/
/*
function txOrgNo_onblur()
{
	var RowNum=getRowIndex();
	SetOrgInfo(document.all["dg1__ctl" + RowNum + "_txOrgNo"].value,RowNum)
}

function txOrgName_onblur()
{
	var RowNum=getRowIndex();
	SetOrgInfo(document.all["dg1__ctl" + RowNum + "_txOrgName"].value,RowNum)
}

function btOrgPrompt_onclick()
{
	Page_BlockSubmit=true;
	var RowNum=getRowIndex();
	CurrOrgIdObj = document.all["dg1__ctl" + RowNum + "_txOrgNo"];
	CurrOrgNameObj = document.all["dg1__ctl" + RowNum + "_txOrgName"];
	CurrPostCodeObj = document.all["dg1__ctl" + RowNum + "_txPostCode"];
	CurrAddObj =  document.all["dg1__ctl" + RowNum + "_txAddress"];
	strUrl = "WEM010C1.aspx?OrgID=341020000A&K1=Dlg_Dept&Search="+document.all.txOrgno.value;
	jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
}
*/
//###############################################################################
//						private Function
//###############################################################################
/*
var wsGetOrgInfoID;
function SetOrgInfo(argOrg,argRowNum)
{
	var wsParam = new Array();
	wsParam[0] = argOrg;
	wsParam[1] = document.all.h_OrgNo.value;
	wsParam[2] = document.all.h_DeptNo.value;
	wsParam[3] = document.all.h_UserId.value;
	var CallWsObj = jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,wsParam);
	
	//檢查執行是否成功
	if(jf_IsWebServiceSuccess(CallWsObj))
	{		
		if(!CallWsObj.value.ErrorClass.IsErr)
		{
			if(CallWsObj.value.Count > 0)
			{
				document.all["dg1__ctl" + argRowNum + "_txOrgNo"].value = CallWsObj.value.OrgID[0];
				document.all["dg1__ctl" + argRowNum + "_txOrgName"].value = CallWsObj.value.OrgName[0];
				document.all["dg1__ctl" + argRowNum + "_txPostCode"].value = CallWsObj.value.PostNo[0];
				document.all["dg1__ctl" + argRowNum + "_txAddress"].value = CallWsObj.value.Address[0];
			}		
		}
		else
		{
			alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
		}
	}
	
}

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
*/

/*1050628 Justin 1050087 二代公文修改
function FocusAt(argObj)
{
	if(!argObj.disabled)
		argObj.focus();
}*/

//檢查日期格式,並顯示訊息
function CheckCDATE(argObj,argObjName)
{
	if(document.all[argObj].value != "")
	{
		jf_PADCHAR(document.all[argObj],7,'0');
		if(!jf_CheckCDATE(document.all[argObj].value))
		{
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName+"格式不正確"])),"");			
		    /*1050628 Justin 1050087 二代公文修改
			FocusAt(document.all[argObj]);*/
		    $('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

/*

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

//透過Value值選取DropDownList中的Item
function SetDDlSelectByValue(argSelectId,argSelectValue)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		//有可能Value的形式為 v1,v2,v3
		if(GetValueFromValueArray(document.all[argSelectId].options[i].value) == argSelectValue)
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

//透過Text值選取DropDownList中的Item
function SetDDlSelectByText(argSelectId,argSelectText)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		if(document.all[argSelectId].options[i].Text == argSelectText)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName,argFieldName)
{
	var ControlValue="";
	//判別Element型別
	if(document.all[argObjName].type == 'text')
		ControlValue = document.all[argObjName].value;
	if(document.all[argObjName].type == 'select-one')
		ControlValue = document.all[argObjName].options[document.all[argObjName].selectedIndex].text;
	
	if(ControlValue == "")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName+"不可為空白"])),"");						
		FocusAt(document.all[argObjName]);
		return false;
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

//依照ID取得Toolbar物件
//用法：
//var TxDocNoObj =  getToolBarItemObjById("btOpen");
//TxDocNoObj.setAttribute("Text","TTT");
function getToolBarItemObjById(argId)
{
	for(var i=0;i<document.all.tbTool.numItems;i++)
	{
		if(document.all.tbTool.getItem(i).getAttribute("ID") == argId)
			return document.all.tbTool.getItem(i);		
	}
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
					FocusAt(document.all["dg1__ctl" + i + "_dgTxPostCost"]);
					return false;
				}
			}
		}
	}
	return true;
}

function CheckOrgAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	for(var i=2;i<document.all.dg1.rows.length+1;i++)
	{
		//受文者名稱不為空白
		if(document.all["dg1__ctl" + i + "_txOrgName"].value != "")
		{
			//遞送方式不可空白
			if(document.all["dg1__ctl" + i + "_dgDllSendType"].value == "")
			{
				InValidName += ","+"遞送方式";			
				InValidControlName = "dg1__ctl" + i + "_dgDllSendType";
			}
			//住址不可空白		
			if(document.all["dg1__ctl" + i + "_txAddress"].value == "")
			{
				InValidName += ","+"住址";				
				InValidControlName = "dg1__ctl" + i + "_txAddress";
			}
			//郵遞區號不可空白
			if(document.all["dg1__ctl" + i + "_txPostCode"].value == "")
			{
				InValidName += ","+"郵遞區號";
				InValidControlName = "dg1__ctl" + i + "_txPostCode";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號"+document.all["dg1__ctl" + i + "_lbSeq"].innerText+"中"+InValidName+"欄位不可為空白"])),"");						
				FocusAt(document.all[InValidControlName]);
				return false;
			}
		}
	}
	return true;
}
*/