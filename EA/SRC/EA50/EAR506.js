/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060315   Justin   1050087     二代公文修改
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");
//1060315  Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1060315  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, null);
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次*/
	
	if (document.all.txNum2.value != "")
	{
	    ObjOnBlur("txNum2");
	    //1060315  Justin [1050087] 二代公文修改
	    //document.all.txDPlan.focus();
	    $('#txDPlan').focus();
	}
	
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	if (document.all["H_VolumeNum"].value != "")
	{
		var tempArr = new Array();
		tempArr = document.all["H_VolumeNum"].value.split(',');
		for (var j=2;j<document.all.dg1.rows.length+1;j++)
		{
			document.all["dg1__ctl"+ j + "_txInput1"].value = tempArr[j-2];
		}	
		jf_AddColVal();
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060315  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	/*var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/
	
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
		case "btHelp": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "EAT501C1.aspx";
		    //1060315  Justin [1050087] 二代公文修改
		    //jf_OpenChildWin(pUrl, "EAT501C1", 750, 500);
		    jf_OpenChildWin(pUrl, "EAT501C1", 800, 600);
			break;			
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll": //設定
			Page_BlockSubmit = true;
			if (document.all.txNum3.value == "")
			{
			    alert("冊數不可空白");
			    //1060315  Justin [1050087] 二代公文修改
			    //document.all.txNum3.focus();
			    $('#txNum3').focus();
				return;
			}
			jf_fnSelectAll("dg1", "_txInput1");
			jf_AddColVal();
			break;
	
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_fnSelectClear("dg1", "_txInput1");
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060315  Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
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
	
    //1060315  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = true;
			if (document.all.txDPlan.value == "")
			{
			    alert("銷毀計畫編號不可空白");
			    //1060315  Justin [1050087] 二代公文修改
			    //document.all.txDPlan.focus();
			    $('#txDPlan').focus();
				return;
			}
			Page_BlockSubmit = false;
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(document.all.txNum2.value!="") //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
			{
			    alert("總箱數不能為空白");
			    //1060315  Justin [1050087] 二代公文修改
			    //document.all.txNum2.focus();
			    $('#txNum2').focus();
				Page_BlockSubmit = true;
			}
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
		case "btSearch":
			Page_BlockSubmit = true;
			strUrl = "EAT501C1.aspx";
		    //1060315  Justin [1050087] 二代公文修改
			//jf_OpenChildWin(strUrl, "EAT501C1", 700, 500);
			jf_OpenChildWin(strUrl, "EAT501C1", 800, 600);
			break;
		case "btPrint":
			Page_BlockSubmit = true;
			var strErrMsg = "";
			if (document.all.txDPlan.value == "")
				strErrMsg += "銷毀計畫編號不可空白";
			if (document.all.txNum2.value == "")
			{
				if (strErrMsg == "")
					strErrMsg += "總箱數不可空白";
				else
					strErrMsg += "\n總箱數不可空白";
			}
			
			if (document.all.rb2.checked)
			{
				if (document.all.txRange.value == "")
				{
					if (strErrMsg == "")
						strErrMsg += "列印範圍不可空白";
					else
						strErrMsg += "\n列印範圍不可空白";
				}
			}
			if (!jf_CheckDgEmpty())
			{
				if (strErrMsg == "")
					strErrMsg += "DataGrid中之冊數不可為空白";
				else
					strErrMsg += "\nDataGrid中之冊數不可為空白";
			}
			if (!jf_CheckDgCount())
			{
				if (strErrMsg == "")
					strErrMsg += "您所設定的總冊數與資料的總冊數不符，請重新輸入";
				else
					strErrMsg += "\n您所設定的總冊數與資料的總冊數不符，請重新輸入";
			}
			if (strErrMsg != "")
			{
			    alert(strErrMsg);
			    //1060315  Justin [1050087] 二代公文修改
			    //document.all.txDPlan.focus();
			    $('#txDPlan').focus();
				return;
			}
			fnBeforePostBack();
			Page_BlockSubmit = false;
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = true;
			var strErrMsg = "";
			if (document.all.txDPlan.value == "")
				strErrMsg += "銷毀計畫編號不可空白";
			if (document.all.txNum2.value == "")
			{
				if (strErrMsg == "")
					strErrMsg += "總箱數不可空白";
				else
					strErrMsg += "\n總箱數不可空白";
			}
			
			if (document.all.rb2.checked)
			{
				if (document.all.txRange.value == "")
				{
					if (strErrMsg == "")
						strErrMsg += "列印範圍不可空白";
					else
						strErrMsg += "\n列印範圍不可空白";
				}
			}
			if (!jf_CheckDgEmpty())
			{
				if (strErrMsg == "")
					strErrMsg += "DataGrid中之冊數不可為空白";
				else
					strErrMsg += "\nDataGrid中之冊數不可為空白";
			}
			if (!jf_CheckDgCount())
			{
				if (strErrMsg == "")
					strErrMsg += "您所設定的總冊數與資料的總冊數不符，請重新輸入";
				else
					strErrMsg += "\n您所設定的總冊數與資料的總冊數不符，請重新輸入";
			}
			if (strErrMsg != "")
			{
			    alert(strErrMsg);
			    //1060315  Justin [1050087] 二代公文修改
			    //document.all.txDPlan.focus();
			    $('#txDPlan').focus();
				return;
			}
			fnBeforePostBack();
			Page_BlockSubmit = false;
		    //1060315  Justin [1050087] 二代公文修改 
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
	
	if (document.all["txDPlan"].value == "")
	{
	    strErrMsg += "銷毀計畫編號不可空白\n";
	    //1060315  Justin [1050087] 二代公文修改
	    //document.all["txDPlan"].focus();
	    $('#txDPlan').focus();
	}
	
	if (document.all["txNum2"].value == "")
	{
	    strErrMsg += "總箱數不可空白\n";
	    //1060315  Justin [1050087] 二代公文修改
	    //document.all["txNum2"].focus();
	    $('#txNum2').focus();
	}
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	/*for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value == "")
		{
			
				InValidName += "冊數不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				document.all[InValidControlName].focus();
				return false;
			}
		}
	}*/
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
	
	if (argCallerId == "EAT501C1")
	{
	    document.all["txDPlan"].value = document.all["lbReturnValue"].options[0].value;
	    //1060315  Justin [1050087] 二代公文修改
	    //document.all["txDPlan"].focus();
	    $('#txDPlan').focus();
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
//設定
function jf_fnSelectAll(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
	
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		obj.value=jf_Trim(document.all.txNum3.value);
	}

}

//清除選取
function jf_fnSelectClear(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		obj.value="";
	}
}

function jf_BoxNumber()
{
	var tValue = jf_Trim(document.all.txNum2.value);	
	for(i = 0; i < tValue ; i++)
	{
		var iValue = i + 2;		
		var obj = document.all["dg1__ctl"+ iValue + "_lbRead"];		
		obj.innerHTML= iValue -1;		
	}
}

function ObjOnBlur(argObjName)
{
	switch(argObjName)
	{
		case "txDPlan":
			if (document.all.txDPlan.value != "")
			{
				var param = new Array(1);
				param[0] = document.all.txDPlan.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckDPMByDPlanNo", false , param);
				var iCallID_txDPlan = callObj.id;
				if (callObj.value.RtnBool == false)
				{
				    alert("無此銷毀計畫編號，請重新輸入");
				    //1060315  Justin [1050087] 二代公文修改
				    //document.all.txDPlan.focus();
				    $('#txDPlan').focus();
				}
			}
			break;
		case "txNum2":
			//1. 檢核是否為數字型態
			if (!jf_IsNum(document.all.txNum2.value))
			{
			    alert("必須為數字型態");
			    //1060315  Justin [1050087] 二代公文修改
			    //document.all.txNum2.focus();
			    $('#txNum2').focus();
				return;
			}
			else
			{
				if (document.all.txNum2.value <= 0)
				{
				    alert("總箱數必須大於1");
				    //1060315  Justin [1050087] 二代公文修改
				    //document.all.txNum2.focus();
				    $('#txNum2').focus();
					return;
				}
			}
			var deleteCount = document.all.dg1.rows.length;
			for (var i=0;i<deleteCount-1;i++)
			{
			    //1060315  Justin [1050087] 二代公文修改
			    //document.all.dg1.deleteRow();
			    document.getElementById("dg1").deleteRow(1);
			}
		    //1060315  Justin [1050087] 二代公文修改
			//document.all.lbCurrVolNum.innerText = 0;
			document.all.lbCurrVolNum.textContent = 0;
			for (i=0;i<document.all.txNum2.value;i++)
			{
				var oRow = document.getElementById("dg1").insertRow();
				if (((i+1)%2)==0)
				{
					oRow.className="tr01";
				}
				else
				{
					oRow.className="tr02";
				}				
				oCell = oRow.insertCell();
				oCell.innerHTML = "<span id=\"dg1__ctl"+ (i+2) +"_lbRead\" class=\"InputFieldLabel\" style=\"font-family:細明體;font-size:Small;width:122px;\">"+ (i+1) +"</span>";
				oCell.align = "center";
				oCell = oRow.insertCell();	
				oCell.innerHTML = "<input name=\"dg1:_ctl"+ (i+2) +":txInput1\" type=\"text\" maxlength=\"4\" id=\"dg1__ctl"+ (i+2) + "_txInput1\" class=\"InputFieldText\" style=\"font-family:細明體;font-size:Small;height:25px;width:38px;\" />";
				document.all["dg1__ctl"+(i+2)+"_txInput1"].onkeypress = jf_InpNumOnly;
				document.all["dg1__ctl"+(i+2)+"_txInput1"].onblur = jf_AddColVal;
				oCell.align = "center";
			}			
			
			break;
		case "txRange":
			if (document.all.txRange.value != "" && document.all.txNum2.value != "")
			{
				var param = new Array(2);
				param[0] = document.all.txRange.value;
				param[1] = document.all.txNum2.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckPrintRangeWithMaxVal", false , param);
				var iCallID_txRange = callObj.id;
				if (callObj.value.RtnBool == false)
				{
				    alert("無效之列印範圍，請重新輸入");
				    //1060315  Justin [1050087] 二代公文修改
				    //document.all.txRange.focus();
				    $('#txRange').focus();
				}
			}
			break;			
	}
}
function fnBeforePostBack()
{
	//1. 將H_VolumeNum紀錄Client端所選取的冊數
	document.all.H_VolumeNum.value = "";
	
	var firstAdd = true;
	var tempStr = "";
	for (var j=2;j<document.all.dg1.rows.length+1;j++)
	{
		if (firstAdd)
		{
			tempStr = document.all["dg1__ctl"+ j + "_txInput1"].value;
			firstAdd = false;
		}
		else
		{
			tempStr += "," + document.all["dg1__ctl"+ j + "_txInput1"].value;
		}
	}
	document.all.H_VolumeNum.value = tempStr;
}

//檢核DataGrid是否有空白冊數
function jf_CheckDgEmpty()
{
	for (var j=2;j<document.all.dg1.rows.length+1;j++)
	{
		if (document.all["dg1__ctl"+ j + "_txInput1"].value=="")
		{
			return false;
		}
	}	
	return true;
	
}

//檢核DataGrid是否等於總冊數
function jf_CheckDgCount()
{
    //1060315  Justin [1050087] 二代公文修改
    //if (document.all.lbCurrVolNum.innerText != document.all.txNum1.value)
    if (document.all.lbCurrVolNum.textContent != document.all.txNum1.value)
	{
		return false;
	}
	return true;
}

function jf_AddColVal()
{
	var tempVal = 0;
	for (var j=2;j<document.all.dg1.rows.length+1;j++)
	{
		if (document.all["dg1__ctl"+ j + "_txInput1"].value=="")
		{
		}
		else
			tempVal = tempVal + parseInt(document.all["dg1__ctl"+ j + "_txInput1"].value);
	}
    //1060315  Justin [1050087] 二代公文修改
	//document.all.lbCurrVolNum.innerText = tempVal;
	document.all.lbCurrVolNum.textContent = tempVal;
}