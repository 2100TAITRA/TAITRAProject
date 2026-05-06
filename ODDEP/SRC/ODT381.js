/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 0951022	Stella	Zoey	950977		非發文寄送作業帶回的機關代碼長度不正確，若不小心ONBLUR時受文者會變成錯誤的	
 * 0960330	Stella	David	000604		中企處郵寄實務需求修改 - 僅彙整非發文資料
 * 0961107  Stella  Yvonne  001573      將地址DECODE BASE64
 * 0970715  Stella Iris      0970635     提供受文者至最後一個時再新增一列以供輸入
 * 1020523	Kevin	Jagle	1000751		配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
 * 1031112	Leslie	Kevin_C	1020726		於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 1050714  Kevin   Justin  1050087     二代公文修改
 * 1110722	David	Joe		1110090		新增批次修改功能
 */
var CurrOrgIdObj;
var CurrOrgNameObj;
var CurrPostCodeObj;
var CurrAddObj;

var IsServerHandling = new Boolean();
IsServerHandling = false;
var RtnClass = new Object();
RtnClass.OrgName = new Array();
RtnClass.OrgID = new Array();
RtnClass.DeptNo = new Array();
RtnClass.StdID = new Array();
RtnClass.ContactPsn = new Array();
RtnClass.Email = new Array();
RtnClass.PostNo = new Array();
RtnClass.Address = new Array();
RtnClass.IsFep = new Array();
RtnClass.FepID = new Array();
RtnClass.ErrorClass = new Object();

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
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_btOrgPrompt"));
	var btElec;
	if (document.all["dg1__ctl"+pNo+"_btOrgPrompt"] != null)
	{
		btElec = document.all["dg1__ctl"+pNo+"_btOrgPrompt"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txOrgNo"];
		CurrOrgNameObj = document.all["dg1__ctl" + pNo + "_txOrgName"];
		CurrPostCodeObj = document.all["dg1__ctl" + pNo + "_txPostCode"];
		CurrAddObj =  document.all["dg1__ctl" + pNo + "_txAddress"];
	}
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case btElec:
		    Page_BlockSubmit = true;
		    //1050714 Justin 1050087 二代公文修改--Start--
			//strUrl = "WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+CurrOrgIdObj.value;
			var path = document.all.H_Wed010C1Path.value;
			strUrl = path + "WEM010C1.aspx?OrgID=" + document.all.h_OrgNo.value + "&K1=Dlg_Dept&Search=" + CurrOrgIdObj.value;
		    //1050714 Justin 1050087 二代公文修改--End--
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
			break;
		//1110722	Joe		1110090		新增批次修改郵務資料功能
		case "btSet":
		    Page_BlockSubmit = true;
			SetDgMailInfo();
			break;
	}	
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
			Page_BlockSubmit = !CheckBeforOpen();
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
//開啟前檢查
function CheckBeforOpen()
{

	if(!CheckNotEmptyAndAlert("cbxOUId_Text","寄送單位"))
		return false;
	if(!CheckNotEmptyAndAlert("txPostDate","郵寄日期"))
		return false;
	return true;
}
//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
		bRtnbool = CheckBeforSave();
	return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
	//檢查寄送單位不可空白
	if(!CheckNotEmptyAndAlert("cbxOUId_Text","寄送單位"))
		return false;
	//檢查郵寄日期不可為空白
	if(!CheckNotEmptyAndAlert("txPostDate","郵寄日期"))
		return false;
	//檢查受文者名稱不為空白時,郵遞方式、郵遞區號、住址不可為空白
	if(!CheckOrgAndAlert())
		return false;
	//檢查郵遞方式及郵資
	//若目前選擇之郵遞方式其基本郵資不為0且彙整欄位未Check,則郵資欄位必須大於0
	if(!CheckPostCostAndAlert())
		return false;
	return true;
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
	if (argCallerId == "WEM010C1")
	{
	    var DeptInfo = document.all["lbReturnValue"].options[0].value;
	    //1050713 Justin 1050087 二代公文修改
	    //var DeptArray = DeptInfo.split(',');
	    var DeptArray = DeptInfo.split('^');
		if(DeptArray.length > 0)
		{
			CurrOrgNameObj.value = jf_Trim(DeptArray[1]);
			CurrOrgIdObj.value = jf_Trim(DeptArray[2])+jf_Trim(DeptArray[3]);		//zoey [950977, 951013]  	+jf_Trim(DeptArray[3])....DEPT_ID
			CurrPostCodeObj.value = jf_Trim(DeptArray[6]);			
			CurrAddObj.value = utf8to16(base64decode(jf_Trim(DeptArray[7])));	//Yvonne
				
		}		
	}
}

function ClientOnLoad()
{
    ShowMsg();
    /*1050714 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, null);//共用function jf_CheckDataExist必要
	jf_CallWS("lib/OD_LIB.asmx", "GetPostCost", false, null);
	jf_CallWS("lib/OD_LIB.asmx", "GetPostWeight", false, null);*/
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	odjf_InitPostMachine();
	
    //1050714 Justin 1050087 二代公文修改--START--
    //if(document.all["lblen"].innerText !="")
	if (document.all["lblen"].textContent != "")
	{
	    //var len = document.all["lblen"].innerText;
		//document.all["dg1__ctl"+ len +"_txOrgNo"].focus();
	    //document.all["lblen"].innerText = "";
		var len = document.all["lblen"].textContent;
		$('#dg1__ctl'+ len +'_txOrgNo').focus();
		document.all["lblen"].textContent = "";
	    //1050714 Justin 1050087 二代公文修改--END--
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
    //1050714 Justin 1050087 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//###############################################################################
//						Server端Register之Function
//###############################################################################
function txPostDate_onblur()
{
    if(!CheckDate(document.all.txPostDate,"郵寄日期"))
        /*1050714 Justin 1050087 二代公文修改
		FocusAt(document.all.txPostDate);*/
        FocusAt(txPostDate);
}

//1110722	Joe		1110090		新增批次修改功能--S
// function fnGetPostCost()
function fnGetPostCost(argType)
{
	
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

function txOrgNo_onblur()
{
	var RowNum=getRowIndex();
	var txOrgNo = document.all["dg1__ctl" + RowNum + "_txOrgNo"].value;

	if (txOrgNo)
		SetOrgInfo(txOrgNo, RowNum);
}

//###############################################################################
//						private Function
//###############################################################################
var wsGetOrgInfoID;
function SetOrgInfo(argOrg,argRowNum)
{
	var len = document.all["dg1"].rows.length;
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
                 		rowflag=0;  
                 		 //zoey [950977, 951013]  當傳回多筆時,則去找OrgName是否有相符的,若有則顯示該筆資料, 若沒有則顯示第一筆
                		 if(CallWsObj.value.Count > 1)   
                 		{                                                       
					strOrgName = jf_Trim(document.all["dg1__ctl" + argRowNum + "_txOrgName"].value);
				                                                            
					for(CWIndex = 0;CWIndex < CallWsObj.value.Count; CWIndex++)        
					{
							if( jf_Trim(CallWsObj.value.OrgName[CWIndex]) == strOrgName)
							{
								rowflag = CWIndex;
								break;
							}
					}
			      }
				document.all["dg1__ctl" + argRowNum + "_txOrgNo"].value = jf_Trim(CallWsObj.value.OrgID[rowflag]);
				document.all["dg1__ctl" + argRowNum + "_txOrgName"].value = jf_Trim(CallWsObj.value.OrgName[rowflag]);
				document.all["dg1__ctl" + argRowNum + "_txPostCode"].value = jf_Trim(CallWsObj.value.PostNo[rowflag]);
				document.all["dg1__ctl" + argRowNum + "_txAddress"].value = jf_Trim(CallWsObj.value.Address[rowflag]);
			}
			else
			{
				alert("查無資料。");
				
			}		
		}
		else
		{
			alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
		}
	}
	//0970635 IRIS
	if(argRowNum==len)
	{
		btInsertClick1();
		
	}
	
}
//0970635 IRIS
function txOrgName_onblur()
{
	var len = document.all["dg1"].rows.length;
	var RowNum=getRowIndex();
	//0970635 IRIS
	var txOrgName = document.all["dg1__ctl" + RowNum + "_txOrgName"].value;
	if (txOrgName)
	{
		if(RowNum==len)
		{
			btInsertClick1();

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

function FocusAt(argObj)
{
    /*1050714 Justin 1050087 二代公文修改
	if(!argObj.disabled)
	    argObj.focus();
    */
    if (!document.all[argObj].disabled)
        $('#' + argObj).focus();
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
*/

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
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
	    /*1050714 Justin 1050087 二代公文修改
		FocusAt(document.all[argObjName]);*/
	    FocusAt(argObjName);
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
/*1050714 Justin 1050087 二代公文修改
function getToolBarItemObjById(argId)
{
	for(var i=0;i<document.all.tbTool.numItems;i++)
	{
		if(document.all.tbTool.getItem(i).getAttribute("ID") == argId)
			return document.all.tbTool.getItem(i);		
	}
}*/

function CheckPostCostAndAlert()
{
	var PostNO = "";
	var Weight = 0; //郵件重量設為零以查詢各郵遞方式的基本郵資
	var Combine = false;
	var	arWSParam = new Array(2);
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		var txCost = document.all["dg1__ctl" + i + "_dgTxPostCost"].value;
		var txOrgName = document.all["dg1__ctl" + i + "_txOrgName"].value;
		//若受文者名稱為空白時則不檢查
		if(!txOrgName)
			continue;
		
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
					    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號"+document.all["dg1__ctl" + i + "_lbNo"].innerText+"中郵遞方式所規定的郵資>0,且彙整欄位未勾選,故郵資欄位不得為空白或0"])), "");
					    FocusAt(document.all["dg1__ctl" + i + "_dgTxPostCost"]);*/
					    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號" + document.all["dg1__ctl" + i + "_lbNo"].textContent + "中郵遞方式所規定的郵資>0,且彙整欄位未勾選,故郵資欄位不得為空白或0"])), "");
						FocusAt("dg1__ctl" + i + "_dgTxPostCost");
						return false;
					}
				}
			}
		}	
	}
	return true;
}

function CheckOrgAndAlert()
{
	//96.03.30 000604 David 中企處郵寄彙整維護，地址及郵遞區號不檢核
	var OrgNo = document.all["ConFigOrg"].value;
	//1020523	Jagle	[1000751]	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
	var OrgNickName = document.all["ConFigOrgNickName"].value;
	
	var InValidName = "";
	var InValidControlName = "";
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//受文者名稱不為空白
		if(document.all["dg1__ctl" + i + "_txOrgName"].value != "")
		{
			//郵遞方式不可空白
			if(document.all["dg1__ctl" + i + "_dgDllSendType"].value == "")
			{
				InValidName += ",郵遞方式欄位不可為空白";			
				InValidControlName = "dg1__ctl" + i + "_dgDllSendType";
			}
			
			//96.03.30 000604 David 中企處不檢核住址及郵遞區號
			//1020523	Jagle	[1000751]	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
			//if(OrgNo != "313050000G")
			if(OrgNickName != "SMEA")
			{
			//住址不可空白
			if(document.all["dg1__ctl" + i + "_txAddress"].value == "")
			{
				InValidName += ",住址欄位不可為空白";				
				InValidControlName = "dg1__ctl" + i + "_txAddress";
			}
			//郵遞區號不可空白
			if(document.all["dg1__ctl" + i + "_txPostCode"].value == "")
			{
				InValidName += ",郵遞區號欄位不可為空白";
				InValidControlName = "dg1__ctl" + i + "_txPostCode";
			}
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
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號"+document.all["dg1__ctl" + i + "_lbNo"].innerText+"中"+InValidName])),"");						
			    FocusAt(document.all[InValidControlName]);*/
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號" + document.all["dg1__ctl" + i + "_lbNo"].textContent + "中" + InValidName])), "");
				FocusAt(InValidControlName);
				return false;
			}
		}
	}
	return true;
}

function dlTime_onchange()
{
	var index = document.all["dlTime"].selectedIndex;
	var obj = document.all["dlTime"].options[index];

	if (obj.value == "") 
	{
		document.all["txSTime"].value = "";
		document.all["txETime"].value = "";
	}
	else
	{
		var argValue = obj.value.split(":");
		document.all["txSTime"].value = argValue[0];
		document.all["txETime"].value = argValue[1];
	}
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
//0970635 新增提供受文者至最後一個時再新增一列以供輸入 iris
function btInsertClick1()
{
    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
    IsServerHandling = true;
	__doPostBack("btAdd",0);
	
}


//decode base64
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	/* c1 */
	do {
	    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c1 == -1);
	if(c1 == -1)
	    break;

	/* c2 */
	do {
	    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c2 == -1);
	if(c2 == -1)
	    break;

	out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

	/* c3 */
	do {
	    c3 = str.charCodeAt(i++) & 0xff;
	    if(c3 == 61)
		return out;
	    c3 = base64DecodeChars[c3];
	} while(i < len && c3 == -1);
	if(c3 == -1)
	    break;

	out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

	/* c4 */
	do {
	    c4 = str.charCodeAt(i++) & 0xff;
	    if(c4 == 61)
		return out;
	    c4 = base64DecodeChars[c4];
	} while(i < len && c4 == -1);
	if(c4 == -1)
	    break;
	out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }

    return out;

}




function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
	c = str.charCodeAt(i++);
	switch(c >> 4)
	{ 
	  case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	    // 0xxxxxxx
	    out += str.charAt(i-1);
	    break;
	  case 12: case 13:
	    // 110x xxxx   10xx xxxx
	    char2 = str.charCodeAt(i++);
	    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	    break;
	  case 14:
	    // 1110 xxxx  10xx xxxx  10xx xxxx
	    char2 = str.charCodeAt(i++);
	    char3 = str.charCodeAt(i++);
	    out += String.fromCharCode( ((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) |  ((char3 & 0x3F) << 0));
	    break;
	}
    }

    return out;
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