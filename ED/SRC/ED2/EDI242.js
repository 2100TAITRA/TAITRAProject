/*
*DATE		SA			PRG		MGR_NO	DESC
*1020625	KEVIN  		SKY     1020061	新增本作業 
*1050415	KEVIN		JOE		1050087	二代系統升級
*1050520	KEVIN		JOE		1050087	二代系統升級，調整focus寫法
1051019     Leslie      Kenny   1050087 二代公文修改
 */
var isDateValid = true;
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1050415 Joe 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
	//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051019   Kenny   [1050087]   二代公文修改；移除無用CODE
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

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
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
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
        //1051019   Kenny   [1050087]   二代公文修改--Start--
		//case "btTxDateS":
		//	Page_BlockSubmit=true; 
		//	jf_CallCalendar(document.all["txDateS"], event.screenX, event.screenY);
		//	break;
		//case "btTxDateE":
		//	Page_BlockSubmit=true; 
		//	jf_CallCalendar(document.all["txDateE"], event.screenX, event.screenY);
		//	break;
        //1051019   Kenny   [1050087]   二代公文修改--End--
		//case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			//break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050415 Joe 1050087 二代公文修改，傳入event參數
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
	
	//1050415 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if(jf_CheckBeforSave())
			{
				Page_BlockSubmit = !jf_CheckKeyObject();
				//1050415 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050415 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050415 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050415 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();
			break;
		case "btSearch":
			if(jf_CheckBeforSave()) //是否通過前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			
			//1050415 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			if(jf_CheckBeforSave()) //是否通過前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//Page_BlockSubmit = !jf_ConfirmPrint();
			//1050415 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(jf_CheckBeforSave()) //是否通過前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//Page_BlockSubmit = !jf_ConfirmPreview();
			//1050415 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var isColumnInputed = 4;
	
	if ((document.all["dlTranDept"].selectedIndex == -1 || document.all["dlTranDept"].selectedIndex == 0) &&
		(document.all["dlTranUser"].selectedIndex == -1 || document.all["dlTranUser"].selectedIndex == 0))
	{
		isColumnInputed--;
	}
	
	if ((document.all["dlRecevDept"].selectedIndex == -1 || document.all["dlRecevDept"].selectedIndex == 0) &&
		(document.all["dlRecevUser"].selectedIndex == -1 || document.all["dlRecevUser"].selectedIndex == 0))
	{
		isColumnInputed--;
	}
	
	if (document.all["txDateS"].value == "" && document.all["txDateE"].value == "")
	{
		isColumnInputed--;
	}
	
	if (document.all["txDocNo"].value == "")
	{
		isColumnInputed--;
	}
	
	if(isColumnInputed < 1)
	{
		bRtnbool = false;
		alert('至少輸入一項條件！');
	}
	
	if(!DateCheck("txDateS","異動日期(起)") || !DateCheck("txDateE","異動日期(迄)"))
		bRtnbool = false;
	
	/*if(!CheckDateValidSS())
	{
		alert("日期輸入錯誤！");
		//document.all.txDateS.focus();
		bRtnbool = false;
	}
	
	if(!CheckDateValidEE())
	{
		alert("日期輸入錯誤！");
		//document.all.txDateE.focus();
		bRtnbool = false;
	}*/
		
	//if (strErrMsg != "")
	//{
		//bRtnbool = false;
		//jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	//}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");		
				//1050520	Joe	1050087	二代系統升級，調整focus寫法
				//document.all[InValidControlName].focus();
				$('#' + InValidControlName).focus();
				return false;
			}
		}
	}
	return true;
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
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢核日期格式
var bDateCheck = false;
function DateCheck(argObj,strMsg)
{
	if (bDateCheck)
	{
		bDateCheck = false;
		return;
	}
	bDateCheck = true;
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
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bDateCheck = false;
			return false;
		}
	}
	bDateCheck = false;
	return true;
}
fnFromUserSwitch(document.all.txH_TranDept.value);//如果是查詢回來將之前選的值帶入下拉式選單回來
function fnFromUserSwitch(input)
{
	var target;
	if(input == null)
	{
		target = document.all.dlTranDept.value;
		document.all.txH_TranUser.value = "";
	}
	else
		target = input;
	document.all.dlTranUser.options.length = 0;
	var new_op = new Option("", "");        
	document.all.dlTranUser.options.add(new_op);
	
	for(var i = 0; i < document.all.dlHiddenFromUser.options.length; i++)
	{
		if(target == document.all.dlHiddenFromUser.options[i].value)
		{
			var ary = document.all.dlHiddenFromUser.options[i].text.split("|");
			var new_option = new Option(ary[1], ary[0]);        
			document.all.dlTranUser.options.add(new_option);
			
		}
	}
	
	if(input != null && input != "")
	{
		for(var i = 0; i < document.all.dlTranUser.options.length; i++)
		{
			if(document.all.txH_TranUser.value == document.all.dlTranUser.options[i].value)
			{
				document.all.dlTranUser.selectedIndex = i;
				break;
			}
		}
	}
}
fnToUserSwitch(document.all.txH_RecevDept.value);//如果是查詢回來將之前選的值帶入下拉式選單回來
function fnToUserSwitch(input)
{
	//var target = document.all.dlRecevDept.value;
	var target;
	if(input == null)
	{
		target = document.all.dlRecevDept.value;
		document.all.txH_RecevUser.value = "";
	}
	else
		target = input;
	document.all.dlRecevUser.options.length = 0;
	var new_op = new Option("", "");        
	document.all.dlRecevUser.options.add(new_op);
	
	for(var i = 0; i < document.all.dlHiddenToUser.options.length; i++)
	{
		if(target == document.all.dlHiddenToUser.options[i].value)
		{
			var ary = document.all.dlHiddenToUser.options[i].text.split("|");
			var new_option = new Option(ary[1], ary[0]);        
			document.all.dlRecevUser.options.add(new_option);
			
		}
	}
	
	if(input != null && input != "")
	{
		for(var i = 0; i < document.all.dlRecevUser.options.length; i++)
		{
			if(document.all.txH_RecevUser.value == document.all.dlRecevUser.options[i].value)
			{
				document.all.dlRecevUser.selectedIndex = i;
				break;
			}
		}
	}
}

function fnFromUserPASS()
{
	var target = document.all.dlTranUser.value;
	document.all.txH_TranUser.value = target;
}

function fnToUserPASS()
{
	var target = document.all.dlRecevUser.value;
	document.all.txH_RecevUser.value = target;
}