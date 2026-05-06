/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 96.03.12		David	951270	附件抽存明細
 * 96.12.12		Leo		951269	增加Call WebService發生異常時的處理
 * 96.12.12		Leo		951269	當單位代碼有變動時才要重新撈承辦人
 *106.02.14		Joe		1050087	二代升級
 * 1120712		Joe		1120074	考試院新增查詢條件
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");

//1060214	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
var Username = ""; //用來記錄目前的承辦人
var OldDeptNo = ""; //用來記錄目前的單位代碼
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//1060214	Joe		1050087		二代公文修改
	// jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1060214	Joe		1050087		二代公文修改
	// jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, null);
	//由於從子視窗帶回資料時，不會觸發txGroupNo的onblur事件，無法去呼叫WS，但是會重新load一次
	//jf_CallGetGroupData();
	
	//1060214	Joe		1050087		二代公文修改，修改承辦單位底下人員帶出方式(參考EAR810)--S
	fnDeptOnblur("dListDeptNo");
	
	Username = document.all["txEmpName"].value;
	OldDeptNo = document.all["txDeptNo"].value;
	if(document.all["htxEmpName"].value !="")
		SetDdlEmpName();
}


/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060214	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060214	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		//1060214	joe		1050087		二代修改配合行動平台--S
		// case "ibExtDateS":
		// {
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all.txExtfileDateS, event.screenX, event.screenY);
			// break;
		// }
		// case "ibExtDateE":
		// {
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all.txExtfileDateE, event.screenX, event.screenY);
			// break;
		// }
		// case "ibFileDateS":
		// {
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all.txFileDateS, event.screenX, event.screenY);
			// break;
		// }
		// case "ibFileDateE":
		// {
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all.txFileDateE, event.screenX, event.screenY);
			// break;
		// }
		//1060214	joe		1050087		二代修改配合行動平台--E
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060214 Joe 1050087 二代公文修改，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	/*
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	*/
	//1060214 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			if (ChecktxDate())
			{
				CheckTypeAndTrans();
				Page_BlockSubmit = !jf_CheckKeyObject();
			//1060214 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			}
			else 
				Page_BlockSubmit = true;
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060214 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060214 Joe 1050087 二代公文修改
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
		case "btDeleteSelected":
			Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
			jf_SelectBarSubmit();
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
			break;
		case "btCls":
			window.close();
			break;
	}
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }
	
	//1060214	Joe		1050087		二代公文修改，修改承辦單位底下人員帶出方式(參考EAR810)--S
    if(argResult.id == ws_DeptID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
			AccessDDL(argResult,"dListEmpName");			
		}
		else
		{
			//document.all["txReadOnly"].value = "";
			alert("取得WebSerVice服務失敗");
		}		
    }
	//1060214	Joe		1050087		二代公文修改，修改承辦單位底下人員帶出方式(參考EAR810)--E
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink)
{
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.window.CallBack("EAR151");
	    close();
	}
	catch (e) {}
    
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1060214	Joe		1050087		二代公文修改，修改承辦單位底下人員帶出方式(參考EAR810)--S
/*
function DeptFind()
{
    
	//0961212 Leo 當單位代碼有變動時才要重新撈承辦人
	
	if(OldDeptNo != "" && OldDeptNo == document.all["txDeptNo"].value)
		return;
		
	var xObjectName = document.activeElement.id;
	var index = document.all.dListDeptNo.selectedIndex;
	var DeptValue = document.all.txDeptNo.value;
	//var DropCount = (document.all.tags("option").length)/2;
	//95.11.23 955202 David 承辦單位承辦人輸入錯誤值會發生錯誤且未清空原有資料
	var DropCount = document.all["dltempDept"].length;
	var j = 0;	
 	for(i=0;i<DropCount;i++)
	{
		if (DeptValue==document.all.dltempDept.options[i].value)
		{
			j=1;
			index=i;
			break;
		}
	}	
	//判斷使DeptNo為空 或 為空白時不為錯誤
	document.all.txDeptNo.value = jf_Trim(document.all.txDeptNo.value);
	
	if(document.all.txDeptNo.value == "")
		j=1;
	
	if(j==1)
	{
		document.all.dListDeptNo.options.value = document.all.dListDeptNo.options[index].value;
		var temp = document.all.txDeptNo.value;
		OldDeptNo  = document.all.txDeptNo.value;
		//alert(temp);
	 
		callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, temp);
		var EmpCount; 
		
		if (!callObj.error && callObj.value.EmpName != null)  //0961212 Leo 增加Call WebService發生異常時的處理
			EmpCount = callObj.value.EmpName.length;
		else
		{
			while(document.all.dListEmpName.options[0] != null)
			{
				document.all.dListEmpName.options[0]=null;
				document.all.dltempEmp.options[0]=null;
			}
			document.all.txEmpName.value = "";
			document.all.txDeptNo.value = "";
			return;
		}
		
		var DropListChild = document.createElement("OPTION");
		var DropListChild2 = document.createElement("OPTION");
				
		if(EmpCount != null)
		{
			//清空dListEmpName
			//清空暫存的DL
			document.all.txEmpName.value="";
			while(document.all.dListEmpName.options[0] != null)
			{
				document.all.dListEmpName.options[0]=null;
				document.all.dltempEmp.options[0]=null;
			}
			//於dListEmpName的第一個增加一個空白的選項
			DropListChild.text = "";
			DropListChild.value = "";
			document.all.dListEmpName.options.add(DropListChild);
			
			//於暫存的dltempEmp中的第一個增加一個空白的選項
			DropListChild2.text = "";
			DropListChild2.value = "";
			document.all.dltempEmp.options.add(DropListChild2);
					
			//把DeptName塞入dListEmpName
			//把對應的EmpName塞入暫存的DL中
			document.all["htxEmpName"].value ="";
			document.all["htxUserName"].value = "";
			var Compart = "";
			for(i=0;i<EmpCount;i++)
			{
				var deptDropListChild = document.createElement("OPTION");
				deptDropListChild.text = callObj.value.EmpName[i];
				deptDropListChild.value = callObj.value.EmpName[i];
				document.all.dListEmpName.options.add(deptDropListChild);
				var empDropListChild = document.createElement("OPTION");
				empDropListChild.text = callObj.value.UserName[i];
				empDropListChild.value = callObj.value.UserName[i];
				document.all.dltempEmp.options.add(empDropListChild);
				
				document.all["htxEmpName"].value += Compart + callObj.value.EmpName[i] ;
				document.all["htxUserName"].value += Compart + callObj.value.UserName[i] ; 
				Compart = "|";
			}
		}
	}
	else
	{
		//document.all["txDeptNo"].focus();
		document.all.txDeptNo.value="";
		//95.11.23 955202 David 承辦單位承辦人輸入錯誤值會發生錯誤且未清空原有資料
		document.all["dListDeptNo"].selectedIndex = 0;
		document.all["txEmpName"].value = "";
		while(document.all.dListEmpName.options[0] != null)
		{
			document.all.dListEmpName.options[0]=null;
			document.all.dltempEmp.options[0]=null;
		}
		
		
		alert("單位代碼不存在! 請重新輸入.");
	}
 }

function EmpFind()
{
	var xObjectName = document.activeElement.id;
	var index = document.all.dListEmpName.selectedIndex;
	var EmpValue = document.all.txEmpName.value;
	var DropCount = document.all.dltempEmp.length;
	var j = 0;		//1:有對應的EmpName;	2:DeptNo為空,判斷不為錯;	0:沒有對應的EmpName
	
	//DropCount	0:不作比對動作 其他:作比對動作	
	if (DropCount != 0)
	{
		//95.12.29 951269 David
		//for(i=0;i<=DropCount;i++)
		for(i=0;i<DropCount;i++)
		{
			if (EmpValue==document.all.dltempEmp.options[i].value)
			{
				j=1;
				index=i;
				break;
			}
		}
	}
	
	//判斷使txEmpName為空 或 為空白時不為錯誤
	document.all.txEmpName.value = jf_Trim(document.all.txEmpName.value);
	if(document.all.txEmpName.value == "")
		j=2;
	
	if(j==0)
	{
		document.all.txEmpName.value="";
		alert("輸入的承辦人代碼不存在! 請重新輸入.");
	}
	if(j==1)
	{
		document.all.dListEmpName.options.value = document.all.dListEmpName.options[index].value;
	}
}

function dlDeptSet()
{
	var index = document.all.dListDeptNo.selectedIndex;
	
	document.all.txDeptNo.value = document.all.dltempDept.options[index].value;
	DeptFind();
}

function dlEmpSet()
{
	var index = document.all.dListEmpName.selectedIndex;
	
	document.all.txEmpName.value = document.all.dltempEmp.options[index].value;
	EmpFind();
}
*/
//1060214	Joe		1050087		二代公文修改，修改承辦單位底下人員帶出方式(參考EAR810)--E

function ChecktxDate()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var ErrMsgCount = 0;	
	Page_BlockSubmit = true;
		
	if (document.all.txExtfileDateS.value != "")
	{
		document.all.txExtfileDateS.value = jf_PADL(document.all.txExtfileDateS.value,7,0);
		if (!jf_CheckCDATE(document.all.txExtfileDateS.value))
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".預計歸檔日期(起)格式不正確\n";
			//1060214	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txExtfileDateS"].focus();
			$('#txExtfileDateS').focus();
			document.all.txExtfileDateS.value="";
		}
	}
	if (document.all.txExtfileDateE.value != "")
	{
		document.all.txExtfileDateE.value = jf_PADL(document.all.txExtfileDateE.value,7,0);
		if (!jf_CheckCDATE(document.all.txExtfileDateE.value))
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".預計歸檔日期(迄)格式不正確\n";
			//1060214	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txExtfileDateE"].focus();
			$('#txExtfileDateE').focus();
			document.all.txExtfileDateE.value="";
		}
	}
	if (document.all.txFileDateS.value != "")
	{
		document.all.txFileDateS.value = jf_PADL(document.all.txFileDateS.value,7,0);
		if (!jf_CheckCDATE(document.all.txFileDateS.value))
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".實際歸檔日期(起)格式不正確\n";
			//1060214	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txFileDateS"].focus();
			$('#txFileDateS').focus();
			document.all.txFileDateS.value="";
		}
	}
	if (document.all.txFileDateE.value != "")
	{
		document.all.txFileDateE.value = jf_PADL(document.all.txFileDateE.value,7,0);
		if (!jf_CheckCDATE(document.all.txFileDateE.value))
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".實際歸檔日期(迄)格式不正確\n";
			//1060214	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txFileDateE"].focus();
			$('#txFileDateE').focus();
			document.all.txFileDateE.value="";
		}
	}
	
	//1120712	Joe		1120074		考試院新增查詢條件--S
	if (document.all.txACPDateS.value != "")
	{
		document.all.txACPDateS.value = jf_PADL(document.all.txACPDateS.value,7,0);
		if (!jf_CheckCDATE(document.all.txACPDateS.value))
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".點收日期(迄)格式不正確\n";
			$('#txACPDateS').focus();
			document.all.txACPDateS.value="";
		}
	}
	if (document.all.txACPDateE.value != "")
	{
		document.all.txACPDateE.value = jf_PADL(document.all.txACPDateE.value,7,0);
		if (!jf_CheckCDATE(document.all.txACPDateE.value))
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".點收日期(迄)格式不正確\n";
			$('#txACPDateE').focus();
			document.all.txACPDateE.value="";
		}
	}
	if (document.all.txFileDateEXAMS.value != "")
	{
		document.all.txFileDateEXAMS.value = jf_PADL(document.all.txFileDateEXAMS.value,7,0);
		if (!jf_CheckCDATE(document.all.txFileDateEXAMS.value))
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".歸檔日期(迄)格式不正確\n";
			$('#txFileDateEXAMS').focus();
			document.all.txFileDateEXAMS.value="";
		}
	}
	if (document.all.txFileDateEXAME.value != "")
	{
		document.all.txFileDateEXAME.value = jf_PADL(document.all.txFileDateEXAME.value,7,0);
		if (!jf_CheckCDATE(document.all.txFileDateEXAME.value))
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".歸檔日期(迄)格式不正確\n";
			$('#txFileDateEXAME').focus();
			document.all.txFileDateEXAME.value="";
		}
	}
	//1120712	Joe		1120074		考試院新增查詢條件--E
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	return bRtnbool;
}

//判斷txExtfileDate1及txExtfileDate2中是否為空
//如果txExtfileDate1是空但txExtfileDate2不為空
//則將txExtfileDate2中的值塞到txExtfileDate1
//並將txExtfileDate2清空
function CheckTypeAndTrans()
{
	if (document.all.txExtfileDateS.value == "")
	{
		if (document.all.txExtfileDateE.value != "")
		{
			document.all.txExtfileDateS.value = document.all.txExtfileDateE.value;
			document.all.txExtfileDateE.value = "";
		}
	}
	if (document.all.txFileDateS.value == "")
	{
		if (document.all.txFileDateE.value != "")
		{
			document.all.txFileDateS.value = document.all.txFileDateE.value;
			document.all.txFileDateE.value = "";
		}
	}
	
	//1120712	Joe		1120074		考試院新增查詢條件--S
	if (document.all.txACPDateS.value == "")
	{
		if (document.all.txACPDateE.value != "")
		{
			document.all.txACPDateS.value = document.all.txACPDateE.value;
			document.all.txACPDateE.value = "";
		}
	}
	if (document.all.txFileDateEXAMS.value == "")
	{
		if (document.all.txFileDateEXAME.value != "")
		{
			document.all.txFileDateEXAMS.value = document.all.txFileDateEXAME.value;
			document.all.txFileDateEXAME.value = "";
		}
	}
	//1120712	Joe		1120074		考試院新增查詢條件--E
}
//95.12.28 951269 David
//補0
function CallPadFunc(strObjName,argCount)
{		
	if(document.all[strObjName].value != "")				
		document.all[strObjName].value = jf_PADL(document.all[strObjName].value,argCount,"0");			
	if(!jf_CheckCDATE(document.all[strObjName].value) &&jf_Trim(document.all[strObjName].value) != "")
	{
		alert("輸入日期格式不正確，請檢查");
		document.all[strObjName].value = "";
		//1060214	Joe	1050087	二代系統升級，調整focus寫法
		// document.all[strObjName].focus();
		$('#' + strObjName).focus();
	}
}

function SetDdlEmpName()
{
		var DropListChild = document.createElement("OPTION");
		var DropListChild2 = document.createElement("OPTION");
		var arrEmpName = document.all["htxEmpName"].value.split("|");
		var arrUserName = document.all["htxUserName"].value.split("|");
				
		if(arrEmpName.length > 0)
		{
			//清空dListEmpName
			//清空暫存的DL
			document.all.txEmpName.value="";
			while(document.all.dListEmpName.options[0] != null)
			{
				document.all.dListEmpName.options[0]=null;
				document.all.dltempEmp.options[0]=null;
			}
			//於dListEmpName的第一個增加一個空白的選項
			DropListChild.text = "";
			DropListChild.value = "";
			document.all.dListEmpName.options.add(DropListChild);
			
			//於暫存的dltempEmp中的第一個增加一個空白的選項
			DropListChild2.text = "";
			DropListChild2.value = "";
			document.all.dltempEmp.options.add(DropListChild2);
					
			//把DeptName塞入dListEmpName
			//把對應的EmpName塞入暫存的DL中
			for(i=0;i<arrEmpName.length;i++)
			{
				var deptDropListChild = document.createElement("OPTION");
				deptDropListChild.text = arrEmpName[i];
				deptDropListChild.value = arrEmpName[i];
				document.all.dListEmpName.options.add(deptDropListChild);
				var empDropListChild = document.createElement("OPTION");
				empDropListChild.text = arrUserName[i];
				empDropListChild.value = arrUserName[i];
				document.all.dltempEmp.options.add(empDropListChild);
			}
			//Leo test
			//alert(deptDropListChild);
			document.all["txEmpName"].value = Username ;
			EmpFind();
		}
}

//1060214	Joe		1050087		二代公文修改，修改承辦單位底下人員帶出方式(參考EAR810)--S
function fnDeptOnblur(xObjectName)
{	
	var DeptChoose = document.all[xObjectName].selectedIndex;	
	var DeptNo = document.all["dltempDept"].options[DeptChoose].value;
	if(DeptChoose != 0)
	{		
		var subArr = new Array();
		subArr = DeptNo.split(':');
		
		var param = new Array(1);		
		param[0] = subArr[0];
		
		var CallObj_1 = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, param);
		ws_DeptID = CallObj_1.id;
		OnWSResult(CallObj_1);		
	}
	else
	{
		for(var i = document.all.dListEmpName.options.length - 1; i >= 0;i--)
		{
			document.all.dListEmpName.options.remove(i);
			document.all.txEmpName.value = "";
		}
	}

	document.all.txDeptNo.value = DeptNo;
}

function AccessDDL(argCallObj,DestinationObj)
{
	var UserArr = new Array();				
	UserArr = argCallObj.value.UserName;				
	
	var DropListChild = document.createElement("OPTION");
	while(document.all[DestinationObj].options[0] != null)
	{
		document.all[DestinationObj].options[0]=null;
		document.all[DestinationObj].options[0]=null;
	}
	//於dListEmpName的第一個增加一個空白的選項
	DropListChild.text = "";
	DropListChild.value = "";
	document.all[DestinationObj].options.add(DropListChild);
	
    //1050905	Kenny   [1050087]	二代公文系統相關修改；一併修正當「承辦/調案單位」選回空白選項時自動將「承辦/調案人」選項清空
    //                              當回傳物件有值時才設定下拉選單
    if ( UserArr.length != null )
    {
        //1050905	Kenny   [1050087]	二代公文系統相關修改；一併修正當「承辦/調案單位」選回空白選項時自動將「承辦/調案人」選項清空
        //                              取回傳物件長度移至此
        var nCount = UserArr.length;
        
        for(var i=0;i<nCount;i++)
        {
            var deptDropListChild = document.createElement("OPTION");
            deptDropListChild.text = argCallObj.value.EmpName[i];
            deptDropListChild.value = argCallObj.value.UserName[i];
            document.all[DestinationObj].options.add(deptDropListChild);
        }
    }	
}

function fnUserOnblur(xObjectName)
{
	var UserNo = document.all[xObjectName].selectedIndex;
	document.all.txEmpName.value = document.all[xObjectName].options[UserNo].value;
}
function DeptFind()
{
	var strDeptNo = document.all.txDeptNo.value;
	//輸入的單位有變更才執行
	if(OldDeptNo != "" && OldDeptNo == document.all["txDeptNo"].value)
		return;	
	
	OldDeptNo = strDeptNo;
	var bHaveDeptCheck = false;
	var iDeptIndex;
	
	//確認單位是否有變更
	for(var i = 0; i < document.all.dltempDept.options.length;i++)
	{
		if(strDeptNo == document.all.dltempDept.options[i].value)
		{			
			bHaveDeptCheck = true;
			iDeptIndex = i;
			break;
		}
	}
	
	if(bHaveDeptCheck == true)
	{
		document.all.dListDeptNo.selectedIndex = iDeptIndex;		
	}
	else
	{		
		alert("單位代碼不存在! 請重新輸入.");
		document.all.txDeptNo.value = "";
		document.all.dListDeptNo.selectedIndex = 0;
	}
	
	fnDeptOnblur("dListDeptNo");
}
function EmpFind()
{	
	var strUserAccount = document.all.txEmpName.value;
	//輸入的承辦人有變更才執行
	if(Username != "" && Username == document.all.txEmpName.value)
		return;	
	
	Username = strUserAccount;
	var bHaveUserCheck = false;
	var iUserIndex;	
	
	//確認單位是否有變更
	for(var i = 0; i < document.all.dListEmpName.options.length;i++)
	{
		if(strUserAccount == document.all.dListEmpName.options[i].value)
		{			
			bHaveUserCheck = true;
			iUserIndex = i;
			break;
		}
	}
	
	if(bHaveUserCheck == true)
	{
		document.all.dListEmpName.selectedIndex = iUserIndex;		
	}
	else if(strUserAccount != "")
	{		
		alert("輸入的承辦人代碼不存在! 請重新輸入.");
		document.all.txEmpName.value = "";
		document.all.dListEmpName.selectedIndex = 0;
	}	
}
//1060214	Joe		1050087		二代公文修改，修改承辦單位底下人員帶出方式(參考EAR810)--E