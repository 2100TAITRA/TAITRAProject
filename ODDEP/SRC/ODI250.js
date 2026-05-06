/*
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1040310	Gabby	1040109	(航港局)新增ODI250專案申請查詢子視窗
 * 1040602	Gabby	-------	修正共用函式名稱相同問題
 * 1050825  Justin  1050087 二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
/*1050825 Justin 1050087 二代公文修改 
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;*/

function ShowMsg()
{
    /*1050825 Justin 1050087 二代公文修改 
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
	    /*1050825 Justin 1050087 二代公文修改 
		case "ibDue1":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
			break;
		}		
		case "ibDue2":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
			break;
		}*/
	}	
}
//1050825 Justin 1050087 二代公文修改 
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
	
    //1050825 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckBeforeSearch();
			adjust();
		    //1050825 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_CheckBeforePrint();
			adjust();
		    //1050825 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_CheckBeforePrint();
			adjust();
		    //1050825 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	var ddlDept=document.all["dlDept"];
	var SelectItem=ddlDept.options[ddlDept.selectedIndex];
	var strDeptValue=SelectItem.value;
	var strDeptNo=strDeptValue.split(':');
	
	if(document.all["dlSect"].selectedIndex==0 || document.all["dlSect"].selectedIndex==-1)
		//1040602 Gabby修正共用函式名稱相同問題
		//odjf_SetdlSectByUnitCode(strDeptNo[0],"dlSect",true);
		odjf_SetdlSectByUnitCodeDropDownList(strDeptNo[0],"dlSect",true);
	if(document.all["dlUser"].selectedIndex==0 || document.all["dlUser"].selectedIndex==-1)
		//1040602 Gabby修正共用函式名稱相同問題
		//odjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);
		odjf_SetdlSectDropDownList("dlDept","dlSect","dlUser","",false,true);
}
function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function CheckDate(id,str)
{
	var strDateValue ;
	strDateValue = document.all[id].value;
	if (strDateValue == "")
	{  
	return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all[id].value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([str])),"");
	    //1050825 Justin 1050087 二代公文修改
		//document.all[id].focus();
		$('#' + id).focus();
	}
}
function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050825 Justin 1050087 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{

}


function dlDept_Text_onblur()
{
	var bCheckOK = true;
	
	var ddlDept=document.all["dlDept"];
	var SelectItem=ddlDept.options[ddlDept.selectedIndex];
	var strDeptValue=SelectItem.value;
	var strDeptNo=strDeptValue.split(':');
	
	//1040602 Gabby修正共用函式名稱相同問題--START
	//odjf_SetdlSectByUnitCode(strDeptNo[0],"dlSect",true);
	//odjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);
	odjf_SetdlSectByUnitCodeDropDownList(strDeptNo[0],"dlSect",true);
	odjf_SetdlSectDropDownList("dlDept","dlSect","dlUser","",false,true);
	//1040602 Gabby修正共用函式名稱相同問題--END
	
	if(document.all["dlDept"].selectedIndex==-1 || document.all["dlDept"].selectedIndex==0)
	{
		while(document.all["dlUser"].length > 0)
			document.all["dlUser"].remove(0);
		document.all["dlUser"].options.add(new Option("",""));	
	}

	return bCheckOK;
}

function dlSect_Text_onblur()
{
	var bCheckOK = true;

	//1040602 Gabby修正共用函式名稱相同問題
	//odjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);
	odjf_SetdlSectDropDownList("dlDept","dlSect","dlUser","",false,true);
	
	if(document.all["dlDept"].selectedIndex==-1 || document.all["dlDept"].selectedIndex==0)
	{
		while(document.all["dlUser"].length > 0)
			document.all["dlUser"].remove(0);
		document.all["dlUser"].options.add(new Option("",""));	
	}
	
	return bCheckOK;
}
//查詢前檢查
function jf_CheckDropDownList()
{
		
	if(document.all["dlSect"].selectedIndex!=0 && document.all["dlSect"].selectedIndex!=-1)
	{
		var SectItem=document.all["dlSect"].options[document.all["dlSect"].selectedIndex];
		if(SectItem.value!="")
			document.all["H_Sect_Value"].value=SectItem.value.split(':')[2];
		else
			document.all["H_Sect_Value"].value="";
		document.all["H_Sect_Text"].value=SectItem.text;
		document.all["H_Sect_AllValue"].value = odjf_SaveCurrDL(document.all["dlSect"]);
	}
	else
	{
		document.all["H_Sect_Value"].value="";
		document.all["H_Sect_Text"].value="";
		document.all["H_Sect_AllValue"].value="";
	}
	if(document.all["dlDept"].selectedIndex!=0 && document.all["dlDept"].selectedIndex!=-1)
	{
		var DeptItem=document.all["dlDept"].options[document.all["dlDept"].selectedIndex];
		document.all["H_Dept_Value"].value=DeptItem.value.split(':')[0];
	}
	else
		document.all["H_Dept_Value"].value="";
	if(document.all["dlUser"].selectedIndex!=0 && document.all["dlUser"].selectedIndex!=-1)
	{
		var UserItem=document.all["dlUser"].options[document.all["dlUser"].selectedIndex];
		document.all["H_User_Value"].value=UserItem.value;
		document.all["H_User_AllValue"].value = odjf_SaveCurrDL(document.all["dlUser"]);
	}
	else
	{
		document.all["H_User_Value"].value="";
		document.all["H_User_AllValue"].value = "";
	}
			
    return true;
}
function jf_CheckBeforePrint()
{
	var CheckOK=true;
	if(!jf_CheckDropDownList())
		CheckOK=false;
	
	if(!fnCheckDGSelect("dg1", "_cbSelect"))
	{
		alert("至少需勾選一筆資料。");
		CheckOK= false;
	}		
	return CheckOK;
}
function jf_CheckBeforeSearch()
{
	var CheckOK=true;
	if(!jf_CheckDropDownList())
		CheckOK=false;
	
	var strSDoc=jf_Trim(document.all["txSDoc"].value);
	var strEDoc=jf_Trim(document.all["txEDoc"].value);
	var strSDate=jf_Trim(document.all["txSDate"].value);
	var strEDate=jf_Trim(document.all["txEDate"].value);
	var bHasDept=true;
	var bHasSect=true;
	var bHasUser=true;
	if(document.all["dlDept"].selectedIndex==0 || document.all["dlDept"].selectedIndex==-1)
		bHasDept=false;
	if(document.all["dlSect"].selectedIndex==0 || document.all["dlSect"].selectedIndex==-1)
		bHasSect=false;
	if(document.all["dlUser"].selectedIndex==0 || document.all["dlUser"].selectedIndex==-1)
		bHasUser=false;	
	
	if(strSDoc==""&&strEDoc!="")
		document.all["txSDoc"].value=strEDoc;
	else if(strSDoc!=""&&strEDoc=="")
		document.all["txEDoc"].value=strSDoc;
	else if(strSDoc>strEDoc)
	{
		document.all["txSDoc"].value=strEDoc;
		document.all["txEDoc"].value=strSDoc;
	}
	if(strSDoc==""&&strEDoc==""&&strSDate==""&&strEDate==""&& !bHasDept && !bHasSect && !bHasUser)
	{
		alert("至少需輸入一項條件。");
		CheckOK= false;
	}			
	return CheckOK;
}
function adjust()
{
	var strS = jf_Trim(document.all.txSDate.value);
	var strE = jf_Trim(document.all.txEDate.value);
	if(strS != "" && strE == "")
		document.all.txEDate.value = strS;
	else if(strS == "" && strE != "")
		document.all.txSDate.value = strE;
	else if(strS > strE)
	{
		document.all.txSDate.value = strE;
		document.all.txEDate.value = strS;
	}
	
}
//#############以下為Template V3 的功能####################################################

var i,j;

//全部選取
function jf_SelectAll(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
	
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
			obj.checked = true;	
	}
}

//反向選取
function jf_SelectInverse(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
		{
			if(obj.checked)
				obj.checked = false;
			else
				obj.checked = true;
		}
	}
}

//清除選取
function jf_SelectClear(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
			obj.checked = false;
	}
}
function fnCheckDGSelect(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
	
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false && obj.checked)
			return true;
	}
}