/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050714  Kevin   Justin  1050087     二代公文修改
 * 1110722	David	Joe		1110090		新增批次修改功能
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050714 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    /*1050714 Justin 1050087 二代公文修改
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
	
	/*開啟子視窗測試範例
	var xObject = document.activeElement;
	switch (xObject.value)
	{
		//設定
		case "取得":
			var strUrl = "";
			var strDocNo = document.all["txDocNo"].value;
			strUrl = "ODT380.aspx?rtnObj=lbReturnValue&nDocNo="+strDocNo;
			jf_OpenChildWin(strUrl, "ODT380", 750, 650 );	
			break;
	}	
	*/
	
	/*
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
	*/
	//1110722	Joe		1110090		新增批次修改郵務資料功能--S
	switch (xObjectName)
	{
		case "btSet":
		    Page_BlockSubmit = true;
			SetDgMailInfo();
			break;
	}	
	//1110722	Joe		1110090		新增批次修改郵務資料功能--E
}

//1050714 Justin 1050087 二代公文修改 
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
	
    //1050714 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050714 Justin 1050087 二代公文修改 
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
		    //1050714 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050714 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050714 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSelectAll":
			Page_BlockSubmit = true;
			SelectAll();
			break;
		case "btClear":
			Page_BlockSubmit = true;
			SelectClear();
			break;
		case "btReverse":
			Page_BlockSubmit = true;
			SelectInverse();
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
	//檢查各項資料的正確性
	if(!CheckItemAndAlert())
		return false;
	//檢查郵遞方式及郵資
	//若目前選擇之郵遞方式其基本郵資不為0且彙整欄位未Check,則郵資欄位必須大於0
	if(!CheckPostCostAndAlert())
		return false;
	return true;
}

/*
Hardy:0908，ODT380尚不需要這些函式
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
*/

//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################
function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    /*1050714 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	jf_CallWS("lib/OD_LIB.asmx", "GetPostCost", false, null);*/
	ShowMsg();
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	odjf_InitPostMachine();
}

function OnWSResult(argResult)
{
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050714 Justin 1050087 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//###############################################################################
//						Server端Register之Function
//###############################################################################

function fnDocNoOnBlur()
{
	if (OriginalKeyCode == 13)
	{
		OriginalKeyCode = 0;
		Page_BlockSubmit = !jf_CheckKeyObject();
		jf_OpenButtonSubmit();
	}
}
//1110722	Joe		1110090		新增批次修改功能--S
function fnGetPostCost(argType)
{
	//取得DataGrid中作用之物件
	var PostNO, Weight, RowNum;
	if(argType == "Set"){
		PostNO = document.all["dlSetSendType"].options[document.all["dlSetSendType"].selectedIndex].value;
		Weight = document.all["txSetWeight"].value;
	}
	else{
		//取得DataGrid中作用之物件
		// var RowNum = getRowIndex();
		// var PostNO = document.all["dg1__ctl" + RowNum + "_dgDllSendType"].options[document.all["dg1__ctl" + RowNum + "_dgDllSendType"].selectedIndex].value;
		// var Weight = document.all["dg1__ctl" + RowNum + "_txWeight"].value;
		RowNum = getRowIndex();
		PostNO = document.all["dg1__ctl" + RowNum + "_dgDllSendType"].options[document.all["dg1__ctl" + RowNum + "_dgDllSendType"].selectedIndex].value;
		Weight = document.all["dg1__ctl" + RowNum + "_txWeight"].value;
	}
//1110722	Joe		1110090		新增批次修改功能--E
	var	arWSParam = new Array(2);
	arWSParam[0] = PostNO;
	arWSParam[1] = Weight;
	
	if (PostNO == null || PostNO == "")
	{
		return;
	}

	callObj = jf_CallWS("lib/OD_LIB.asmx", "GetPostCost", false, arWSParam);
	if(!callObj.error)
	{
		var cost = callObj.value.RtnStr;
		if (cost != null && cost != "")
		{
			//1110722	Joe		1110090		新增批次修改功能--S
			if(argType == "Set")
				document.all["txSetCost"].value = cost;
			else
			//1110722	Joe		1110090		新增批次修改功能--E
				document.all["dg1__ctl" + RowNum + "_dgTxPostCost"].value = cost;
		}
	}

	
	/*顯示錯誤訊息所用之程式碼
	if(callObj.error)
	{
		if (callObj.errorDetail.string)
			alert(callObj.errorDetail.string);
	}
	else
	{
		var cost = callObj.value.RtnStr;
		if (cost != null && cost != "")
		{
			document.all["dg1__ctl" + RowNum + "_dgTxPostCost"].value = cost;
		}
		else
		{
			if(callObj.value.ErrorClass.ErrMessage && callObj.value.ErrorClass.ErrMessage[0].text)
				alert(callObj.value.ErrorClass.ErrMessage[0].text);
		}
	}
	*/	
}

//###############################################################################
//						private Function
//###############################################################################

/*
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

function FocusAt(argObj)
{
    /*1050714 Justin 1050087 二代公文修改
	if(!argObj.disabled)
	    argObj.focus();
    */
	if (!document.all[argObj].disabled)
	    $('#' + argObj).focus();
}

function CheckDate(argObj,argObjName)
{
	if(argObj.value != "")
	{
		jf_PADCHAR(argObj,7,'0');
		if(!jf_CheckCDATE(argObj.value))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName+"格式不正確"])),"");						
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
*/

/*
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
*/

//檢查欄位值是否為空白,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName, argFieldName)
{
	if(document.all[argObjName].value == "")
	{
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName+"不可為空白"])), "");
	    /*1050714 Justin 1050087 二代公文修改
		FocusAt(document.all[argObjName]);*/
	    FocusAt(argObjName);
		return false;
	}
	return true;
}

//檢查郵遞區號及地址是否為空白,除了回傳true false外,並顯示訊息
function CheckPostCodeAddressAndAlert()
{
	var EmptySeqNo = "";
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_txRcvOrg"].value != "")
		{
			if(document.all["dg1__ctl" + i + "_txPostCode"].value == "" ||
			document.all["dg1__ctl" + i + "_txAddress"].value == "")
			{
			    //1050714 Justin 1050087 二代公文修改 
			    //EmptySeqNo += "," + document.all["dg1__ctl" + i + "_lbSeq"].innerText;
			    EmptySeqNo += "," + document.all["dg1__ctl" + i + "_lbSeq"].textContent;
			}
		}
	}
	if(EmptySeqNo != "")
	{
		EmptySeqNo  = EmptySeqNo.substr(1, EmptySeqNo.length-1);
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序：" + EmptySeqNo + "中的郵遞區號及地址不可為空白"])), "");						
		return false;				
	}
	return true;	
}

//檢查各項資料是否有誤,除了回傳true false外,並顯示訊息
function CheckItemAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//郵遞方式不可空白
		if(document.all["dg1__ctl" + i + "_dgDllSendType"].value == "")
		{
			InValidName += ",郵遞方式欄位不可為空白";			
			InValidControlName = "dg1__ctl" + i + "_dgDllSendType";
		}
		//郵遞區號不可空白
		if(document.all["dg1__ctl" + i + "_txPostCode"].value == "")
		{
			InValidName += ",郵遞區號欄位不可為空白";
			InValidControlName = "dg1__ctl" + i + "_txPostCode";
		}
		//住址不可空白
		if(document.all["dg1__ctl" + i + "_txAddress"].value == "")
		{
			InValidName += ",住址欄位不可為空白";				
			InValidControlName = "dg1__ctl" + i + "_txAddress";
		}
		//郵資金額檢查
		var objCost = document.all["dg1__ctl" + i + "_dgTxPostCost"];
		if (objCost.value != "")
		{
			var str = objCost.value;
			var num = parseFloat(str);
			if ( num != str )
			{
				InValidName += ",郵資金額必須為數字。";
				InValidControlName = "dg1__ctl" + i + "_dgTxPostCost";
			}
			else if ( num < 0 )
			{
				InValidName += ",郵資金額必須大於零。";
				InValidControlName = "dg1__ctl" + i + "_dgTxPostCost";
			}
			else if ( num >= 100000 )
			{
				InValidName += ",郵資金額必須小於100000。";
				InValidControlName = "dg1__ctl" + i + "_dgTxPostCost";
			}					
		}					
		
		if(InValidName != "")
		{
		    InValidName = InValidName.substr(1, InValidName.length);
		    /*1050714 Justin 1050087 二代公文修改 
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號"+document.all["dg1__ctl" + i + "_lbSeq"].innerText+"中"+InValidName])),"");						
		    FocusAt(document.all[InValidControlName]);*/
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號" + document.all["dg1__ctl" + i + "_lbSeq"].textContent + "中" + InValidName])), "");
			FocusAt(InValidControlName);
			return false;
		}
	}
	return true;
}

//檢查郵資欄位值是否必須大於零,除了回傳true false外,並顯示訊息
function CheckPostCostAndAlert()
{
	var PostNO = "";
	var Weight = 0; //郵件重量設為零以查詢各郵遞方式的基本郵資
	var Combine = false;
	var	arWSParam = new Array(2);
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		var txCost = document.all["dg1__ctl" + i + "_dgTxPostCost"].value;
		//當郵資欄位為空白或是零時，進一步檢查所選取的郵遞方式其基本郵資是否大於零
		if ( txCost == "" || txCost == "0" )
		{
		
			PostNO = document.all["dg1__ctl" + i + "_dgDllSendType"].options[document.all["dg1__ctl" + i + "_dgDllSendType"].selectedIndex].value;
			Combine= document.all["dg1__ctl" + i + "_dgCbIsCombine"].checked;
			
			//選擇任一郵遞方式且彙整欄位未勾選時，才取基本郵資以進一步檢查
			if (PostNO != null && PostNO != "" && !Combine)
			{
				arWSParam[0] = PostNO;
				arWSParam[1] = Weight;
				//呼叫WebService取得基本郵資
				callObj = jf_CallWS("lib/OD_LIB.asmx", "GetPostCost", false, arWSParam);
				if(!callObj.error)
				{
					var cost = callObj.value.RtnStr;
					//當郵資大於零時，顯示警示訊息告知使用者郵資欄位的值必須大於零
					if (cost != null && cost != "" &&  cost != "0")
					{
					    /*1050714 Justin 1050087 二代公文修改 
					    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號" + document.all["dg1__ctl" + i + "_lbSeq"].innerText + "中郵遞方式所規定的郵資>0,且彙整欄位未勾選,故郵資欄位不得為空白或0"])), "");
					    FocusAt(document.all["dg1__ctl" + i + "_dgTxPostCost"]);*/
					    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號" + document.all["dg1__ctl" + i + "_lbSeq"].textContent + "中郵遞方式所規定的郵資>0,且彙整欄位未勾選,故郵資欄位不得為空白或0"])), "");
						FocusAt("dg1__ctl" + i + "_dgTxPostCost");
						return false;
					}
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

function fnSetPostCost(argCost)
{
	if(document.activeElement!=null)
	{
		var id = document.activeElement.id;
		if(id.indexOf("dgTxPostCost")!=-1)
		{
			document.all[id].value=argCost;
			var num = id.replace("dg1__ctl","");
			num = num.replace("_dgTxPostCost","");
			var RowNum = num;
			var PostNO = document.all["dg1__ctl" + RowNum + "_dgDllSendType"].options[document.all["dg1__ctl" + RowNum + "_dgDllSendType"].selectedIndex].value;
			var Cost   = argCost;
			var	arWSParam = new Array(2);
			arWSParam[0] = PostNO;
			arWSParam[1] = Cost;
	
			if (PostNO == null || PostNO == "")
			{
				return;
			}
			callObj = jf_CallWS("lib/OD_LIB.asmx", "GetPostWeight", false, arWSParam);
			if(!callObj.error)
			{
				if(callObj.value.ErrorClass.IsErr)
				{
					alert( callObj.value.ErrorClass.ErrMessage[0].text);
					return;
				}
				var weight = callObj.value.RtnStr;
				if (weight != null && weight != "")
					document.all["dg1__ctl" + RowNum + "_txWeight"].value = weight;
			}

		}
	}
}

//1110722	Joe		1110090		新增批次修改郵務資料功能--S
function SetDgMailInfo()
{
	if(document.all.dlSetSendType.selectedOptions[0].value + document.all.txSetWeight.value + document.all.txSetCost.value == ""){
		alert("批次設定選項(郵遞方式、重量、郵資)，至少需輸入一項。")
		return;
	}
	var bSetSelect = false;
	for(var i = 2; i <= document.all.dg1.rows.length; i++){
		if(document.all["dg1__ctl" + i + "_cbSetSelect"].checked == true){
			bSetSelect = true;
			document.all["dg1__ctl" + i + "_dgTxPostCost"].value = document.all.txSetCost.value;
			document.all["dg1__ctl" + i + "_txWeight"].value = document.all.txSetWeight.value ;
			document.all["dg1__ctl" + i + "_dgDllSendType"].selectedIndex = document.all.dlSetSendType.selectedIndex;
		}
	}
	
	if(bSetSelect == false){
		alert("至少需選取一筆受文者。");
	}
}

//全選
function SelectAll()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbSetSelect"].checked = true;
	}
}

//反向
function SelectInverse()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbSetSelect"].checked)
			document.all["dg1__ctl"+iRow+"_cbSetSelect"].checked = false;
		else
			document.all["dg1__ctl"+iRow+"_cbSetSelect"].checked = true;
	}
}

//取消
function SelectClear()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbSetSelect"].checked = false;
	}
}
//1110722	Joe		1110090		新增批次修改郵務資料功能--E