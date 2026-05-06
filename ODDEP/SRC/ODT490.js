/*
DATE	SA		PRG		MSG_NO		DESC
1050426 David   Zen     1050087     二代公文修改1060518 Leslie  Zen     1060215     innerText相關修改1100201	Leslie	Joe		1090927		取消使用document.activeElement
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
var CheckDocNoID;
//1050426 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050426 Zen 1050087 二代公文修改
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
		/*
		case "":
			break;
		*/
	}	
}
//1050426 Zen 1050087 二代公文修改
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
	
    //1050426 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
		    //1050426 Zen 1050087 二代公文修改
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
		    //1050426 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !CheckBeforDel();
			if(!Page_BlockSubmit)
				ShowBottomEmpty();
			jf_ToolBarSubmit();
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			if(!Page_BlockSubmit)
				ShowBottomEmpty();
		    //1050426 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
		    //1050606 Zen 1050087 二代公文修改
			//document.all["txDocNo"].focus();
			$('#txDocNo').focus();
			break;
		case "btSearch":
			//SAMPLE CODE
			/*
			var strUrl = "";
			xOldKey = document.all["txUserName"].value;
			strUrl = "SYM020C1.aspx?rtnObj=lbReturnValue&m=p&kv1="+xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "子視窗名稱", 700, 500 );
			*/
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
			jf_ToolBarSubmit();
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
			jf_ToolBarSubmit();
			break;
	}
}

//###############################################################################
//							Button Click Function
//###############################################################################

function CheckBeforOpen()
{
	
	/*if(jf_Trim(document.all.txDocNo.value) == "" )
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["開啟前請先指定公文文號"])),"");						
		return false;
	}*/
	if(jf_CheckKeyObject())	
	{
		parent.bottom.location.href="ODI260.aspx?pDocNo="+document.all.txDocNo.value;
		return true;
	}
	else
		return false;
	
}
//刪除前檢查
function CheckBeforDel()
{
	if(document.all.h_TxCanDelSeqNo.value == "0")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您目前對此筆公文無刪除異動權限"])),"");	
		return false;
	}
	if(!CheckNotEmptyAndAlert("txSeqNo","刪除序號"))
		return false;
	//caesar 0940216
	// 如果是創稿,不允許刪除至原點
	if(document.all.nNewByOu.value=="Y")
	{
		if(StringGetInt(document.all.txSeqNo.value) <= 2)
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前指定刪除之序"+StringGetInt(document.all.txSeqNo.value)+",已超出您被允許之處理範圍"])),"");						
			FocusAt(document.all.txSeqNo);
			return false;
		}
	}
	if(CompareNumber(StringGetInt(document.all.txSeqNo.value),StringGetInt(document.all.h_TxCanDelSeqNo.value)))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前指定刪除之序"+StringGetInt(document.all.txSeqNo.value)+",已超出您被允許之處理範圍"])),"");						
		FocusAt(document.all.txSeqNo);
		return false;
	}
	if(StringGetInt(document.all.txSeqNo.value) == 0)
	{
		FocusAt(document.all.txSeqNo);	
		return false;
	}
	return true;
	
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = true;
	if(jf_Trim(document.all.txNewCloseDate.value)=="")
	{
		alert('結案日期不可為空白');
	    //1050606 Zen 1050087 二代公文修改
		//document.all.txNewCloseDate.focus();
		$('#txNewCloseDate').focus();
		return false;
	}
	if(jf_CheckCDATE(document.all.txNewCloseDate.value)==false)
	{
		alert('結案日期格式有誤,請重新輸入');
	    //1050606 Zen 1050087 二代公文修改
		//document.all.txNewCloseDate.focus();
		$('#txNewCloseDate').focus();
		return false;
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


//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################

function CallBack(argCallerId)
{
	/*
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "SYM020C1")
	{
		document.all["txUserName"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txUserNameTxChange"].value = document.all["txUserName"].value;
		//回傳值為鍵值時，觸動TextChange事件
		//__doPostBack();//for .NET Framework 1.0
		__doPostBack("","");//for .NET Framework 1.1
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
	*/

}

function ClientOnLoad()
{
	ShowMsg();
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	if(document.all.nDelDocNo!=null)
	{
		parent.bottom.location.href="ODI260.aspx?pDocNo="+document.all.nDelDocNo.value;
	}
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
    
    //webserver回傳後動作
    //檢查回傳的webserverID
    if (argResult.id == CheckDocNoID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(!argResult.value.RtnBool)
			{
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入之文號不存在"])),"");						
				document.all.txDocNo.value = "";
				FocusAt(document.all.txDocNo);
				
			}
		}
		
	}	
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}


//###############################################################################
//						Server端Register之Function
//###############################################################################
//1100201	Joe		1090927		未使用，直接MARK--S
/*
function txDocNo_onblur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;

	if(document.all.txDocNo.value == "")
		return;
	var arWSParam = new Array(3);
	arWSParam[0] = "TODO_LIST";
	var arFieldName = new Array(2);
	arFieldName[0] = "SOURCE_ORGNO";
	arFieldName[1] = "DOC_NO";
	arWSParam[1] = arFieldName;
	var arFieldValue = new Array(2);
	arFieldValue[0] = document.all.SourceOrgNo.value;
	arFieldValue[1] = document.all.txDocNo.value;
	arWSParam[2] = arFieldValue;
	callObj = jf_CallWS("template/lib/sys.asmx","CheckDataKeyDuplicate",false,arWSParam);
	CheckDocNoID = callObj.id;
	OnWSResult(callObj);	
}
*/
//1100201	Joe		1090927		未使用，直接MARK--E
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
//檢查日期格式並Alert訊息
function txPostDate_onblur()
{
	if(!CheckDate(document.all.txPostDate,"郵寄日期"))
		FocusAt(document.all.txPostDate);
}
*/


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
	if(!argObj.disabled)
	    //1050606 Zen 1050087 二代公文修改
	    //argObj.focus();
	    $('#' + argObj.id).focus();
}

//檢查日期格式,並顯示訊息
function CheckDate(argObj,argObjName)
{
	if(argObj.value != "")
	{
		jf_PADCHAR(argObj,7,'0');
		if(!jf_CheckCDATE(argObj.value))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName+"格式不正確"])),"");						
			//FocusAt(argObj);
			return false;
		}
	}
	return true;
}

//比較數字大小
//如果argNum1 < argNum2則回傳false
//如果argNum1 >= argNum2則回傳true
function CompareNumber(argNum1,argNum2)
{
	if(argNum1 == Math.max(argNum1,argNum2))
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
	if(document.all[argObjName].value == "")
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

function ShowBottomEmpty()
{
	//parent.bottom.location.href="ODT210Bottom.htm";	
}