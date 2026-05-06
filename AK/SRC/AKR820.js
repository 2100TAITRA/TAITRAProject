/*
DATE		SA		PRG		MGR_NO			DESC
0980403	Stella	David							增加判斷，若稽催次數欄位為空時提醒使用者
1030410	Cloud	Eileen		1030230			停用GetEmp函式改使用GetUnitAllUsers
1060207 Cloud   Justin      1050087         二代公文修改
1140410 Cloud   Levi        1140123         新增逾期天數條件&匯出 Excel、 ODS功能
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060207  Justin [1050087] 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060207  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060207  Justin [1050087] 二代公文修改
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
	    /*1060207  Justin [1050087] 二代公文修改
		case "btCalendarF":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txEntryDateS, event.screenX, event.screenY);
			break;
		case "btCalendarT":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txEntryDateE, event.screenX, event.screenY);
			break;
        */
	}	
}

//1060207  Justin [1050087] 二代公文修改 
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
	
    //1060207  Justin [1050087] 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    //1060207  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = jf_CheckInspectCount();
		    //1060207  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = jf_CheckInspectCount();
		    //1060207  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;

	        //1140410   Levi        1140123 新增Excel、ODS匯出-S
		case "btExcel":
		case "btODS":
			Page_BlockSubmit = jf_CheckInspectCount();
			jf_ToolBarSubmit(xObjectName);
			break;
			//1140410   Levi        1140123 新增Excel、ODS匯出-E
	}
}

function CallBack(argCallerId)
{

}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //1060207  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	//jf_CallWS("Lib/AK_LIB.asmx", "GetEmp", false, null);
	//1091022	Cloud 	1090574		新增信保客製化報表
	if (document.all["Orgnickname"] && document.all["Orgnickname"].value == "SMEG")
	{
		document.all["RPTSET"].className = "dTR";
	}
}

function OnWSResult(argResult)
{
    /*if(jf_IsWebServiceSuccess(argResult))
    {
    }
    */
    //修改人：FERDY 日期：95???? 內容：增加調案人員COMBOBOX 區塊編號：02
    if(argResult.error || argResult.value.ErrorClass.IsErr)
    {
		if( argResult.value.ErrorClass.IsErr )
		{
			alert('資料庫中無此承辦單位');
		}
    }
    else
    {
		if(argResult.id == wsGetEmpID)
		{
			//alert( argResult.value.EmpName.length );
			//將所取得之使用者資訊塞入Select物件中
			for( i = 0 ; i < argResult.value.EmpName.length ; i++ )
			{
			    /*1060207  Justin [1050087] 二代公文修改
				var strDeptName = "";
				if( argResult.value.SectName[i] == "")
					strDeptName = "("+argResult.value.DeptName[i]+")";
				else
					strDeptName = "("+argResult.value.DeptName[i]+"-"+argResult.value.SectName[i]+")";
				*/
				var objOption = new Option(argResult.value.EmpName[i],argResult.value.UserName[i]);
				
				document.all["dlUser"].options[i+1] = objOption;
				
			}
				
			document.all["dlUser"].size = "10";
			
			//if( argResult.value.EmpName.length == -1 )
			//	alert( argResult.value.SectName[0] );
		}
		else
		{		
		}
    }
}
function Onblur1()
{
    if(document.all.txEntryDateS.value=="")
	return;
	
	//日期檢查
	if (!jf_CheckCDATE(document.all.txEntryDateS.value))
	{
		document.all.txEntryDateS.focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["稽催起始日期"])),"");
					
	}
	
	
}
function Onblur2()
{
	if(document.all.txEntryDateE.value=="")
	return;
	
	//日期檢查
	
	if (!jf_CheckCDATE(document.all.txEntryDateE.value))
	{
		document.all.txEntryDateE.focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["稽催終止日期"])),"");
		
	}
		
	
}
function Onblur3()
{
	if(document.all.txInspectCount.value=="")
		return;
	
	/*
	if (document.all.txInspectCount.value <= 0)
	{
		document.all.txInspectCount.focus();
		alert("只允許輸入大於0的數字!!");
		
	}
	*/
	//#2006.09.17 Andy
	if (document.all.txInspectCount.value < 0)
	{
		document.all.txInspectCount.focus();
		alert("不允許輸入小於0的數字!!");
		
	}	
	
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060207  Justin [1050087] 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//修改人：FERDY 日期：95???? 內容：增加調案人員COMBOBOX 區塊編號：03 END
//有選承辦單位呼叫ws GeteEmp 取得承辦人 放入dlUser ComboBox
/******************************************************************
 name : BuilddlUser
 param: none        
 rtn  : none
 desc : 當cbDept onchange時，則填入dlUser適當之使用者
******************************************************************/
function BuilddlUser()
{
	var Unitindex	= document.all["cbDept"].selectedIndex;
	var Unitobj		= document.all["cbDept"].options[Unitindex];
	var strDept     = Unitobj.value;
	strDept = strDept.substring(0, 2);
	
	//alert( strDept );
			
	//清空dlUser的option
	
	document.all["dlUser_Text"].value = "";
	
	var dlUserCount = document.all.dlUser.length;
	
	for( j = 0 ; j < dlUserCount ; j++ )
	{
		document.all["dlUser"].options[0]=null;
	}
	var objOptionSpace = new Option("","");
	
	document.all["dlUser"].options[0] = objOptionSpace;
	//清空dlUser的option	
	
	if( strDept == "" )
	{		
				
	}
	else
	{	
		//1030410 Eileen [1030230] 停用GetEmp函式改使用GetUnitAllUsers -- start
		var params = new Array(3);
		params[0]= strDept;
		params[1]= "";
		params[2]= true;
		//callObj = jf_CallWS("Lib/AK_LIB.asmx", "GetEmp", false, strDept );
		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, params);
		//Eileen -- end
		
		if(callObj.error)
		{
			alert(callObj.errorDetail.string);
		}
		else
		{
			wsGetEmpID = callObj.id;
			OnWSResult(callObj);
		}		
	}
	
}
//設定調案人員
function SetUser()
{
    //alert(document.all["dlUser"].value);
    //1060207  Justin [1050087] 二代公文修改
    //document.all["txUser"].innerText = document.all["dlUser"].value;
    document.all["txUser"].value = document.all["dlUser"].value;
}
//0980403	David	增加判斷，若稽催次數欄位為空時提醒使用者
function jf_CheckInspectCount()
{
	var bCheck = false;
	var CheckInspectCount = jf_Trim(document.all.txInspectCount.value);
	if(CheckInspectCount == "")
	{
		bCheck = true;
		alert("稽催次數欄位不可為空！");
	}
	return bCheck;
}

//1140410   Levi        1140123         新增逾期天數條件
function fillOverDay() {

	var dlOverDay = document.getElementById("dlOverDay");
	var txOverDay = document.getElementById("txOverDay");

	txOverDay.value = dlOverDay.options[dlOverDay.selectedIndex].value;	
	dlOverDay.value = "";
	txOverDay.focus();
}