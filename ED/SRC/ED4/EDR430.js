/*
DATE	SA		PRG		MGR_NO				DESC
1050421	Kevin	Joe 	1050087				二代公文修改
1050502	Kevin	Joe		1050087				新增ClientButtonControl function，修正沒有此function會造成Postback的問題
1050520	KEVIN	JOE		1050087				二代系統升級，調整focus寫法
1051019 Leslie  Kenny   1050087             二代公文修改
1051114 Kevin   Joe		1050593				新增匯出Excel功能
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050421 Joe 1050087 二代公文修改
/*
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
	
	SetPrintFLD();
	if(document.all.H_ddlPrintFLD_Text.value != "")
		for(var i=0; i < document.all.ddlPrintFLD.length; i++)
		{
			if(document.all.H_ddlPrintFLD_Text.value == document.all.ddlPrintFLD.options[i].text)
			{
				document.all.ddlPrintFLD.selectedIndex = i;
				break;
			}
		}
}

//1050502 Joe 1050087 二代公文修改--START
/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
}
//1050502 Joe 1050087 二代公文修改--END
/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050421 Joe 1050087 二代公文修改，傳入event參數
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050421 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	//postback前先儲存相關欄位
	document.all.H_ddlPrintFLD_Text.value = document.all.ddlPrintFLD.options[document.all.ddlPrintFLD.selectedIndex].text;
	document.all.H_ddlPrintFLD_Value.value = document.all.ddlPrintFLD.options[document.all.ddlPrintFLD.selectedIndex].value;
	
	switch (xObjectName)
	{
		case "btPreview":
		case "btPrint":
		//1051114	Joe		1050593		新增匯出Excel功能
		case "btExcel":
			//document.all["txDateS"].focus();
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1050421 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
function jf_ConfirmPrint()
{
	var bRtn = true;
	var strSMon = jf_Trim(document.all["txDateS"].value);
	var strEMon = jf_Trim(document.all["txDateE"].value);
	if (strSMon + strEMon == "")
	{
		bRtn = false;
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txDateS"].focus();
		$('#txDateS').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["列印月份不可皆為空白"])),"");
		return bRtn;
	}
	var strProperty = document.all.ddlDocProperty.options[document.all.ddlDocProperty.selectedIndex].text;
	if (strProperty == "")
	{
		bRtn = false;
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["ddlDocProperty"].focus();
		$('#ddlDocProperty').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公文性質不可為空白"])),"");
		return bRtn;
	}
	var strPrintItem = document.all.ddlPrintItem.options[document.all.ddlPrintItem.selectedIndex].text;
	if (strPrintItem == "")
	{
		bRtn = false;
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["ddlPrintItem"].focus();
		$('#ddlPrintItem').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["印列項目不可為空白"])),"");
		return bRtn;
	}
	var strPrintFLD = document.all.ddlPrintFLD.options[document.all.ddlPrintFLD.selectedIndex].text;
	if (strPrintFLD == "")
	{
		bRtn = false;
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["ddlPrintFLD"].focus();
		$('#ddlPrintFLD').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["印列欄位不可為空白"])),"");
		return bRtn;
	}
	bRtn = ConfirmData();
	if(!dlDept_Text_onblur())
		return false;
	if(!dlSect_Text_onblur())
		return false;
	return bRtn;
}

//印列日期檢查
function ConfirmData()
{
	var bRtnbool = true;
	var year2  = document.all.H_YearMonth.value.substr(0,3);
	var month2 = document.all.H_YearMonth.value.substr(3,2);
	
	if(document.all.txDateS.value != "")
	{
		if(document.all.txDateS.value.length != 5 )
		{
			strErrMsg = "請輸入5碼年月\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txDateS"].focus();
			$('#txDateS').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
			return bRtnbool;
		}
		var year1 = document.all.txDateS.value.substr(0,3);
		var month1 = document.all.txDateS.value.substr(3,2);
		if(document.all.txDateS.value.substr(3,2) == "00")
		{
			strErrMsg = "列印月份不可等於0\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txDateS"].focus();
			$('#txDateS').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
		
		if(year1>year2||(year1==year2&&month1>month2))
		{
			strErrMsg = "列印月份不可大於目前統計最大月份\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txDateS"].focus();
			$('#txDateS').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
	}
	if(document.all.txDateE.value != "")
	{
		if(document.all.txDateE.value.length != 5)
		{
			strErrMsg = "請輸入5碼年月\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txDateE"].focus();
			$('#txDateE').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
			return bRtnbool;
		}
		year1 = document.all.txDateE.value.substr(0,3);
		month1 = document.all.txDateE.value.substr(3,2);
		if(document.all.txDateE.value.substr(3,2) == "00")
		{
			strErrMsg = "列印月份不可等於0\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txDateE"].focus();
			$('#txDateE').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
			
		if(year1>year2||(year1==year2&&month1>month2))
		{
			strErrMsg = "列印月份不可大於目前統計最大月份\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txDateE"].focus();
			$('#txDateE').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
	}
	return bRtnbool;
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
			
			var bSubTree = true;
			if(document.all["H_OD_FLOW_TYPE"].value == "2")
				bSubTree = false;
			
			edjf_SetdlDept("dlDept","dlSect","","",false,true);	//初始dlSect、dlUser的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
			
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if(document.all["dlSect"].options.length ==1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlSect_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function SetPrintFLD()
{
	var strDocProperty = document.all.ddlDocProperty.options[document.all.ddlDocProperty.selectedIndex].value;
	var strPrintItem = document.all.ddlPrintItem.options[document.all.ddlPrintItem.selectedIndex].value;
	//清空PrintFLD
	document.all.ddlPrintFLD.length=0;
	
	//1110929	Joe		--		所有公文因只有銷號清單選項，調整成選取後鎖定--S
	if(strDocProperty == "0")
	{
		document.all.ddlPrintItem.selectedIndex = 2;
		document.all.ddlPrintItem.disabled = true;
		document.all.ddlPrintFLD.disabled = true;
		strPrintItem = document.all.ddlPrintItem.options[document.all.ddlPrintItem.selectedIndex].value;
	}
	else
	{
		document.all.ddlPrintItem.disabled = false;
		document.all.ddlPrintFLD.disabled = false;
		document.all.ddlPrintFLD.options.add(new Option("","") );
	}
	
	// document.all.ddlPrintFLD.options.add(new Option("","") );
	//1110929	Joe		--		所有公文因只有銷號清單選項，調整成選取後鎖定--E
	for(i=0; i < document.all.H_PrintFLD.length; i++)
	{
		if(document.all.H_PrintFLD.options[i].text == (strDocProperty + ":" + strPrintItem))
		{
			strText = document.all.H_PrintFLD.options[i].value.split(':')[0];
			strValue= document.all.H_PrintFLD.options[i].value.split(':')[1] + ":" + document.all.H_PrintFLD.options[i].value.split(':')[2] + ":" + document.all.H_PrintFLD.options[i].value.split(':')[3];
			document.all.ddlPrintFLD.options.add(new Option(strText,strValue) );
		}
	}
}

