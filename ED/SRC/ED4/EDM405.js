/*
 * DATE		PRG		MGR_NO		DESC
 * 1050727   Justin   1050087     二代公文修改
 * 1051019   Kenny    1050087     二代公文修改
 * 1110103	Zen     1101292     修正多次點擊重複PostBack之問題
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

//1050727 Justin 1050087 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	jf_HandleComboxStatus("dlSect");
	//jf_HandleComboxStatus("dlUser");
	if(document.all["H_Dept_Value"].value!="")
	{
		dlDept_Text_onblur("NotInit","true");
	}
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

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
    /*1050727 Justin 1050087 二代公文修改
	switch (xObjectName)
	{
		case "btAppDate":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txAppDate, event.screenX, event.screenY);
			break;
	}*/
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050727 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1050727 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050727 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(!CheckDATE("txAppDate","用印日期",true)) //是否通過儲存前必要檢查
			{
				Page_BlockSubmit = true;
				break;
			}
			if(!dlDept_Text_onblur("",true)) //是否通過儲存前必要檢查
			{
				Page_BlockSubmit = true;
				break;
			}
			if(document.all["dlSect_Container"].className != "hide" && !dlSect_Text_onblur(true)) //是否通過儲存前必要檢查
			{
				Page_BlockSubmit = true;
				break;
			}
			if(!dlUser_Text_onblur(true)) //是否通過儲存前必要檢查
			{
				Page_BlockSubmit = true;
				break;
			}
			if(jf_CheckBeforSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050727 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050727 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050727 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["dlSect_Container"].className = "hide";
		    //document.all["dlUser_Container"].className = "hide";
		    /*1050727 Justin 1050087 二代公文修改
			document.all["txApplyNo"].focus();*/
			$('#txApplyNo').focus();
			break;
		case "btSearch":
			strUrl = "EDI405.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "EDI405", 800, 600 );
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var strSubject=document.all["txSubject"].value;
	
	if (jf_Trim(document.all["dlDept_Text"].value) == "")
	{
		strErrMsg += "申請單位不可空白\n";		
	}
	if (jf_Trim(document.all["dlUser_Text"].value) == "")
	{
		strErrMsg += "申請人不可空白\n";	
	}
	if (jf_Trim(document.all["txCopies"].value) == "")
	{
	    strErrMsg += "份數不可空白\n";
	    /*1050727 Justin 1050087 二代公文修改
		document.all["txCopies"].focus();*/
	    $('#txCopies').focus();
	}
	if (jf_Trim(document.all["txSubject"].value) == "")
	{
	    strErrMsg += "主旨不可空白\n";
	    /*1050727 Justin 1050087 二代公文修改
		document.all["txCopies"].focus();*/
	    $('#txCopies').focus();
	}
	if (jf_Trim(document.all["txAppDate"].value) == "")
	{
	    strErrMsg += "用印日期不可空白\n";
	    /*1050727 Justin 1050087 二代公文修改
		document.all["txAppDate"].focus();*/
	    $('#txAppDate').focus();
	}
	if (document.all["txSubject"].value.length>300)
	{
	    strErrMsg += "主旨長度超過300請縮短\n";
	    /*1050727 Justin 1050087 二代公文修改
		document.all["txSubject"].focus();*/
	    $('#txSubject').focus();
	}
	if (document.all["txDesc"].value.length>300)
	{
	    strErrMsg += "備註長度超過300請縮短\n";
	    /*1050727 Justin 1050087 二代公文修改
		document.all["txDesc"].focus();*/
	    $('#txDesc').focus();
	}
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}

	return bRtnbool;
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
	if(argCallerId == "EDI405")
	{
		document.all["txApplyNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txApplyNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    /*1050727 Justin 1050087 二代公文修改
		document.all["txApplyNo"].focus();*/
		$('#txApplyNo').focus();
	}

	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var uDeptChecked = false;
function dlDept_Text_onblur(Mode,argIsCheckDone)
{
	if(uDeptChecked)
	{
		uDeptChecked = false;
		return;
	}
	uDeptChecked = true;		
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value && Mode=="NotInit"))
	{
		if(Mode=="OPEN")
		{
			document.all["dlDept_Text"].value=document.all["H_Dept"].value;
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
		}
		//呼叫ED_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(ComboBoxCheck("dlDept", "承辦單位"))
		{
			if(Mode=="OPEN")
			{	
				for(var i=0;i<document.all["dlDept"].options.length;i++)
				{
					if(document.all["dlDept"].options[i].value==document.all["H_Dept_Value"].value)
					{
						document.all["dlDept"].selectedIndex=i;
						break;
					}	
				}
			}
			else
			{
				//存ComboBox_Text的value
				document.all["H_Dept"].value = document.all["dlDept_Text"].value;
				//存所選擇的ComboBox項目的value
				document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
			}
		    //先顯示二級單位選項 避免隱藏不調整
		    //1050727 Justin 1050087 二代公文修改
			//document.all["dlSect_Container"].className = "InputFieldText";
			document.all["dlSect_Container"].className = "custom-combobox";
			edjf_SetdlDept("dlDept","dlSect","dlUser","",false,false);	//初始dlSect、dlUser的處理
			if(Mode=="NotInit")
			{
				document.all["dlSect_Text"].value=document.all["H_Sect"].value;
				document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			}
			else
			{
				document.all["H_Sect"].value = document.all["dlSect_Text"].value;
				document.all["H_User"].value = document.all["dlUser_Text"].value;
				document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
				document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
				document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
			}
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
			if(Mode=="NotInit")
			{
				document.all["dlUser_Text"].value=document.all["H_User"].value;
			}
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if(document.all["dlSect"].options.length ==1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;
				
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
				
			//無值不顯示
			jf_HandleComboxStatus("dlSect");
			//jf_HandleComboxStatus("dlUser");
			
		}
		else
		{	
			uDeptChecked = true;
			document.all["dlDept_Text"].value="";
			document.all["H_Dept"].value="";
			alert("申請單位不存在");
			return false;	
		}
	}
	uDeptChecked = false;
	return true;
}
var uSectChecked = false;
function dlSect_Text_onblur(argIsCheckDone)
{ 
	if(uSectChecked)
	{
		uSectChecked = false;
		return;
	}
	uSectChecked = true;
	//值若變更時作處理
	if (jf_Trim(document.all["dlSect_Text"].value)!="" && document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{
		
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			
			edjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);	//初始化承辦人選單

			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
			
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
		}
		else
		{
			uSectChecked = true;
			document.all["dlSect_Text"].value="";
			document.all["H_Sect"].value="";
			alert("申請單位不存在");
			return false;
		}
	}
	uSectChecked = false;
	return true;
}

var uUserChecked = false;
function dlUser_Text_onblur(argIsCheckDone)
{
	if (uUserChecked)
	{
		uUserChecked = false;
		return;
	}
	uUserChecked = true;
	//值若變更時作處理
	if (jf_Trim(document.all["dlUser_Text"].value)!="" && document.all["dlUser_Text"].value != document.all["H_User"].value)
	{
		//呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(ComboBoxCheck("dlUser", "承辦人"))
		{
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
		}
		else
		{
			uUserChecked = true;
			document.all["dlUser_Text"].value="";
			document.all["H_User"].value="";
			alert("申請人不存在");
			return false;
		}
	}
	uUserChecked = false;
	return true;
}
//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
	    //1050727 Justin 1050087 二代公文修改
	    //document.all[argComboxID+"_Container"].className = "InputFieldText";
	    document.all[argComboxID + "_Container"].className = "custom-combobox";
}
var CheckedDate = false;
var strBDate = "";
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	var strDate = jf_Trim(document.all[argObj].value);
	
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}

		if(CheckedDate)
		{
			CheckedDate = false;
			return true;
		}
		if(argIsCheckDone)
			CheckedDate = true;

		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    /*1050727 Justin 1050087 二代公文修改
			document.all[argObj].focus();*/
			$('#' + argObj).focus();
			CheckedDate = false;
			return false;
		}
		else
			return true;
	}
	else
		return true;
}
function CheckCopies()
{
	var strErrMsg= "";
	if (document.all["txCopies"].value == "0")
	{
	    strErrMsg += "份數不可輸入0\n";
	    /*1050727 Justin 1050087 二代公文修改
		document.all["txCopies"].focus();*/
	    $('#txCopies').focus();
	}
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
}
/**********************************************************************************************
  Name : function ComboBoxCheck()
  Desc : 離開ComboBox欄位的合理性檢查，檢查輸入值是否存在於選單中
  Parm : argComboBoxID      : string Combobox 物件 ID
		 argKeyMsg			: string 錯誤時顯示的ComboBox名稱
  Rtn  : none
 **********************************************************************************************/
function ComboBoxCheck(argComboBoxID, argKeyMsg)
{
	var bRtnBool = false;
	var ComboBoxObj     = document.all[argComboBoxID];
	var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];
	var i, j;
	if (ComboBoxObj == null || ComboBoxTextObj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["["+argComboBoxID+"]下拉選單不存在"])),"");
		return bRtnBool;
	}
	for( i=0 ; i<ComboBoxObj.options.length ; i++ )
	{
		if (ComboBoxTextObj.value == ComboBoxObj.options[i].text)
		{
			bRtnBool = true;
			break;
		}
	}
	if (!bRtnBool)
	{
	    /*1050727 Justin 1050087 二代公文修改
		ComboBoxTextObj.focus();*/
	    $('#' + argComboBoxID + "_Text").focus();
	    ComboBoxTextObj.select();
	}
	return bRtnBool;
}