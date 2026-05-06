/*
DATE	SA	PRG	MGR_NO	DESC
0950912	Stella	Charles	950355	此程式誕生，為新增之人民申請案件辦理情形查詢作業
1010813	Yvonne	Jagle	1010692	FDA新增檢驗統計表
1050711 David   Zen     1050087 二代公文修改
1051019 Leslie  Kenny   1050087 二代公文修改
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
//1050711 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050711 Zen 1050087 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../EDLIB/EDWS.asmx", "GetAllUsers", false, null);
	
	//設定
	document.all["H_Dept_Value"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect_Value"].value = document.all["dlSect_Text"].value;
	document.all["H_User_Value"].value = document.all["dlUser_Text"].value;
	document.all["H_DeptNo_Value"].value = jf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Value"].value);
	document.all["H_SectNo_Value"].value = jf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Value"].value);
	document.all["H_UserNo_Value"].value = jf_GetSelectValue(document.all["dlUser"],document.all["H_User_Value"].value);
	document.all.H_dlSect_Value.value = jf_SaveCurrDL(document.all["dlSect"]);
	document.all.H_dlUser_Value.value = jf_SaveCurrDL(document.all["dlUser"]);
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
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050711 Zen 1050087 二代公文修改
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
	
    //1050711 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		case "btPrint":
		case "btPreview":
			if(jf_CheckBeforSearch())
			{
				if(dlDept_Text_onblur() && dlSect_Text_onblur() && dlUser_Text_onblur())
				{
					//Charles 將所選擇的業務類別代碼以及整個業務類下拉選單存入隱藏欄位 0950928
					jf_SavedlBTypeNo();
					
					Page_BlockSubmit = false;
				    //1050711 Zen 1050087 二代公文修改
					//jf_ToolBarSubmit();
					jf_ToolBarSubmit(xObjectName);
				}
			}
			break;
		case "btClean":
			if(dlDept_Text_onblur() && dlSect_Text_onblur() && dlUser_Text_onblur())
			{
				//Charles 將所選擇的業務類別代碼以及整個業務類下拉選單存入隱藏欄位 0950928
				jf_SavedlBTypeNo();
				
				Page_BlockSubmit = true;
				if(window.confirm("確定要清除嗎?"))
				{
				    //1050711 Zen 1050087 二代公文修改
				    //document.all.dlBType.focus();
				    $('#dlBType').focus();
					if(!document.all["dlUser_Text"].disabled)
					{
						document.all["dlUser_Text"].value = "";
						document.all["H_User_Value"].value = document.all["dlUser_Text"].value;
					    //1050711 Zen 1050087 二代公文修改
						//document.all["dlUser_Text"].focus();
						$('#dlUser_Text').focus();
					}
					if(!document.all["dlSect_Text"].disabled)
					{
						document.all["dlSect_Text"].value = "";
						document.all["H_Sect_Value"].value = document.all["dlSect_Text"].value;
					    //1050711 Zen 1050087 二代公文修改
						//document.all["dlSect_Text"].focus();
						$('#dlSect_Text').focus();
                    }
					if(!document.all["dlDept_Text"].disabled)
					{
						document.all["dlDept_Text"].value = "";
						document.all["H_Dept_Value"].value = document.all["dlDept_Text"].value;
					    //1050711 Zen 1050087 二代公文修改
						//document.all["dlDept_Text"].focus();
						$('#dlDept_Text').focus();
                    }
					document.all.dlBType.selectedIndex = 0;
					document.all.txUpperDocNo.value = "";
					document.all.txKeyWord.value = "";
					document.all.txSRcvDate.value = "";
					document.all.txERcvDate.value = "";
					document.all.txRemainDays.value = "";
					document.all.cbComplement.checked = false;
					document.all.cbInspect.checked = false;
					document.all.cbClosed.checked = false;
				}
			}
			break;
	}
}

/********** 以下為按下查詢鍵後相關處理 **********/
//儲存前之欄位檢查
function jf_CheckBeforSearch()
{
	//1010813	Jagle	1010692		公文文號起迄欄位檢核
	var strSDocNo = jf_Trim(document.all["txSDocNo"].value);
	var strEDocNo = jf_Trim(document.all["txEDocNo"].value);
	if(strSDocNo != "" && strEDocNo == "")
		document.all["txEDocNo"].value = strSDocNo;
	if(strSDocNo == "" && strEDocNo != "")
		document.all["txSDocNo"].value = strEDocNo;
	if(strSDocNo != "" && strEDocNo != "")
	{
		if(strSDocNo > strEDocNo)
		{
			document.all["txEDocNo"].value = strSDocNo;
			document.all["txSDocNo"].value = strEDocNo;
		}
	}
	
	if(jf_Trim(document.all["txSRcvDate"].value) == "" && jf_Trim(document.all["txERcvDate"].value) == "")
	{
		if(!window.confirm("建議您輸入 [收文日期] 為查詢條件，以免資料量龐大，造成您花費過多時間等候結果。\n\n\n若仍要執行此次查詢請按 [確定] ；否則請按 [取消]。"))
		{
		    //1050711 Zen 1050087 二代公文修改
		    //document.all["txSRcvDate"].focus();
		    $('#txSRcvDate').focus();
			return false;
		}
	}
	else if(jf_Trim(document.all["txSRcvDate"].value) == "" && jf_Trim(document.all["txERcvDate"].value) != "")
		document.all["txSRcvDate"].value = document.all["txERcvDate"].value;
	else if(jf_Trim(document.all["txSRcvDate"].value) != "" && jf_Trim(document.all["txERcvDate"].value) == "")
		document.all["txERcvDate"].value = document.all["txSRcvDate"].value;
	else
	{
		if(document.all["txSRcvDate"].value.length == 7 && document.all["txERcvDate"].value.length == 7)
		{
			var strTemp = "";
			if(document.all["txSRcvDate"].value > document.all["txERcvDate"].value)
			{
				strTemp = document.all["txERcvDate"].value;
				document.all["txERcvDate"].value = document.all["txSRcvDate"].value;
				document.all["txSRcvDate"].value = strTemp;
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

//組出回傳值
function ReturnValue(argValue)
{
	var strUrl = "EDI410.aspx?argTBValue="+escape(argValue);
	var iWidth = screen.availWidth;
	var iHeight = screen.availHeight;
	var bNeedScroll = false;
	if (iWidth > 850)
		iWidth = 850;
	if (iHeight > 500)
		iHeight = 500;
	if (iWidth < 850 || iHeight < 500)
		bNeedScroll = true;
	Myjf_OpenChildWin(strUrl, "EDI410", iWidth, iHeight, bNeedScroll);
}

function Myjf_OpenChildWin(argUrl, argWinName, argWidth, argHeight, argNeedScroll)
{
	if(argWinName != "")
	{
		for(var i=0; i<arrWin.length; i++)
		{
			if(arrWin[i][0] == argWinName)
			{
				if(arrWin[i][1].closed)
					arrWin[i][0] = "";
				else
					arrWin[i][1].close();
			}
		}
	}
	
	var strWinStyle, strTop, strLeft;
	strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes";
	if ( (argWidth != "") || (argWidth != "0") )
	{
	   strWinStyle = strWinStyle + ",width="+argWidth;		
	   strLeft = (screen.width-argWidth)/2;
	   strWinStyle = strWinStyle + ", left="+strLeft;
	}
	if ( (argHeight != "") || (argHeight != "0") )
	{
	   strWinStyle = strWinStyle + ",height="+argHeight;		
	   strTop = (screen.height-argHeight)/2-10;
	   strWinStyle = strWinStyle + ", top="+strTop;
	}
	if (argNeedScroll)
	   strWinStyle = strWinStyle + ",scrollbars=yes";

	gWindowID = window.open(argUrl, "", strWinStyle);
	gWindowID.focus();

	arrWin[arrWin.length] = new Array();
	arrWin[arrWin.length - 1][0] = argWinName;
	arrWin[arrWin.length - 1][1] = gWindowID;
	return gWindowID;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlDept_Text"].value != document.all["H_Dept_Value"].value)
	{
		//呼叫ED_LIB.js，檢查dlDept_Text所輸入的值是否存在於下拉式選單，並作初始dlSect與dlUser的處理
		if(edjf_DeptCheck("dlDept","dlSect","dlUser"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept_Value"].value = document.all["dlDept_Text"].value;
			document.all["H_Sect_Value"].value = document.all["dlSect_Text"].value;
			document.all["H_User_Value"].value = document.all["dlUser_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_DeptNo_Value"].value = jf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Value"].value);
			document.all["H_SectNo_Value"].value = jf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Value"].value);
			document.all["H_UserNo_Value"].value = jf_GetSelectValue(document.all["dlUser"],document.all["H_User_Value"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all.H_dlSect_Value.value = jf_SaveCurrDL(document.all["dlSect"]);
			document.all.H_dlUser_Value.value = jf_SaveCurrDL(document.all["dlUser"]);
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
			
			//Charles 增加此函式，使得變動承辦單位時，業務類別連動 0950928
			jf_SetdlBType(document.all["H_DeptNo_Value"].value);
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
	if (document.all["dlSect_Text"].value != document.all["H_Sect_Value"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單，並作初始dlUser的處理
		if(edjf_SectCheck("dlDept","dlSect","dlUser"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect_Value"].value = document.all["dlSect_Text"].value;
			document.all["H_User_Value"].value = document.all["dlUser_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_SectNo_Value"].value = jf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Value"].value);
			document.all["H_UserNo_Value"].value = jf_GetSelectValue(document.all["dlUser"],document.all["H_User_Value"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlUser的處理
			document.all.H_dlUser_Value.value = jf_SaveCurrDL(document.all["dlUser"]);
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//承辦人下拉式選單變更時所呼叫
function dlUser_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlUser_Text"].value != document.all["H_User_Value"].value)
	{
		//呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(edjf_UserCheck("dlUser"))
		{
			document.all["H_User_Value"].value = document.all["dlUser_Text"].value;
			
			document.all["H_UserNo_Value"].value = jf_GetSelectValue(document.all["dlUser"],document.all["H_User_Value"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//取得ComboBox中，與目前ComboBox_Text相對應的值
function jf_GetSelectValue(argSelect, argText)
{
	var RtnValue = "";
	for(var i = 0; i < argSelect.options.length; i++)
	{
		if(argSelect.options[i].text == argText)
		{
			RtnValue = argSelect.options[i].value;
			break;
		}
	}
	return RtnValue;
}

//將ComboBox裡的options轉成字串相加再回傳
function jf_SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
		strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
	
	return strTemp.substr(0,strTemp.length-1);
}

//Charles 增加此函式，使得變動承辦單位時，業務類別連動 0950928
function jf_SetdlBType(argOUID)
{
	var BTypeDLObj = document.all["dlBType"];
	//clear the DropDownList of B_TYPE_NO
	while(BTypeDLObj.length > 0)
		BTypeDLObj.remove(0);

	var arrItems = document.all["H_BTypeNo_List"].value.split(";");

	//add new data into the DropDownList of B_TYPE_NO
	len = arrItems.length;
	BTypeDLObj.options.add(new Option("",""));
	for( i=0 ; i<len ; i++ )
	{
		var arrItemDetail = arrItems[i].split(":");
		if(arrItemDetail[2] == argOUID || arrItemDetail[2] == "")
		{
			var objOption = new Option(arrItemDetail[0], arrItemDetail[1])
			BTypeDLObj.options.add(objOption);
		}
	}
}

//Charles 將所選擇的業務類別代碼以及整個業務類下拉選單存入隱藏欄位 0950928
function jf_SavedlBTypeNo()
{
	var iIdx = document.all["dlBType"].selectedIndex;
	document.all["H_BTypeNo_Value"].value = document.all["dlBType"].options[iIdx].value;
	document.all["H_dlBTypeNo_Value"].value = jf_SaveCurrDL(document.all["dlBType"]);
}

//Charles 增加此檢查函式，於統計月份欄位Onblur時，自動補0以及檢查統計月份欄位是否符合格式 0950910
function Check_Date()
{
	var strSRCVDate = document.all.txSRcvDate.value;
	var strERCVDate = document.all.txERcvDate.value;
	if(strSRCVDate != "")
	{
		if(strSRCVDate.length < 7)
		{
			strSRCVDate = jf_PADL(strSRCVDate,7,"0");
			document.all.txSRcvDate.value = strSRCVDate;
		}

		if(!jf_CheckCDATE(strSRCVDate))
		{
		    jf_ShowMeg("輸入的日期不合法,請重新輸入", "您輸入之資料有誤，明細如下，請更正。");
		    //1050711 Zen 1050087 二代公文修改
			//document.all.txSRcvDate.focus();
		    $('#txSRcvDate').focus();
		}
	}
	if(strERCVDate != "")
	{
		if(strERCVDate.length < 7)
		{
			strERCVDate = jf_PADL(strERCVDate,7,"0");
			document.all.txERcvDate.value = strERCVDate;
		}

		if(!jf_CheckCDATE(strERCVDate))
		{
		    jf_ShowMeg("輸入的日期不合法,請重新輸入", "您輸入之資料有誤，明細如下，請更正。");
		    //1050711 Zen 1050087 二代公文修改
			//document.all.txERcvDate.focus();
		    $('#txERcvDate').focus();
        }
	}
}

//1010813	Jagle	1010692		文號欄位ONBLUR檢核
function jf_DOC_NO_BLUR(obj)
{
  if(obj.value=="")
	return;
  var pMatch = /\W{1,-}/;
  if(pMatch.test(obj.value))
  {
	alert("文號欄位不可輸入非英文字母,非數字的字元。");
      //1050711 Zen 1050087 二代公文修改
	//obj.focus();
	$('#' + obj.id).focus();
}
  if(obj.id=="txSDocNo")
  {
	if(!pMatch.test(obj.value))
	{
		document.all.txEDocNo.value = obj.value;
	}
  }
}