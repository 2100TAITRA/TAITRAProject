/*date      sa	    pg		mgr_no		desc
            --	    Cloud	1040386		因應net4.5 postback行為改變，增加判斷觸發鈕是否為null
            Cloud   Justin  1050087     二代公文修改
  1051019   Leslie  Kenny   1050087     二代公文修改
  1080906   Kevin   Kevin_C 1080775		MERGE[1070552]新增陳核中表單、待核批表單查詢模式
  1140701	Cloud	Cloud	1140175		修正支援查當下代理資訊，有輸入申請人時才啟用該選項
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
//1051005 Justin 1050087 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

var isNotAlert = false;
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051005 Justin 1050087 二代公文修改 
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("EDR402.asmx", "GetDeptAllUsers", false, null);
	
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_User"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
	document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
	
	//無值不顯示
	jf_HandleComboxStatus("dlSect");
	
	var objVal = document.all["dlApplyType"].value;
	if( objVal == "AKT800" || objVal == "EAT310" || objVal == "EAT800")
	{
		document.all["trDocNo"].style.display = "none";
		document.all["txDocNoStar"].value = "";
		document.all["txDocNoEnd"].value = "";
	}
	else
	    document.all["trDocNo"].style.display = "";

    //1080906 Kevin_C	1080775	MERGE[1070552]新增陳核中表單、待核批表單查詢模式
	SetUI();
	//1140701	Cloud	Cloud	1140175		修正支援查當下代理資訊，有輸入申請人時才啟用該選項
	if(document.all["H_User_Value"].value!="")
		fnSetProxy(true);
	else
		fnSetProxy(false);
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
	
	var Href;
	
	switch (xObjectName)
	{
	    /*1051005 Justin 1050087 二代公文修改
		case "ibTxDate":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.dateBegin, event.screenX, event.screenY);
			break;
		case "ibTxDateE":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.dateEnd, event.screenX, event.screenY);
			break;*/
		default:
			var pNo = xObjectName.substring(8, xObjectName.indexOf("_btopen"));
			//取得申請單主程式網址，並加上Artifact
			//1041002	Cloud	[1040386] 因應net4.5 postback行為改變，增加判斷觸發鈕是否為null
			if(document.all["dg1__ctl" + pNo + "_txURL"]!=null)
			{
				//1051005 Justin 1050087 二代公文修改
				//Href = document.all["dg1__ctl" + pNo + "_txURL"].value;
				Href = document.all["dg1__ctl" + pNo + "_txURL"].textContent;
				Href += "&SAMLart="+document.all["H_Art"].value;
				//jf_OpenChildWin(Href, "Open By EAT802", 800, 600 );	//會沒有scrollbars可以用~~@@
				//jf_ShowModal(Href,screen.width,screen.height-20);		//可以設定大小，但是不能最大化~~@@
				jf_OpenMsgWin(Href,"OpenByEDR482");		//有scrollbars，也可以設定大小，但是初始大小一定是700*500~~@@
				Page_BlockSubmit=true;
			}
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051005 Justin 1050087 二代公文修改 
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
	
    //1051005 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit=!CheckBeforSearch();
		    //1051005 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !CheckBeforSearch();
		    //1051005 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckBeforSearch();
		    //1051005 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下搜尋鍵後相關處理 **********/

function CheckBeforSearch()
{
	if(!dlUser_Text_onblur())
		return false;
		
	var sNo = document.all["txDocNoStar"].value;
	var eNo = document.all["txDocNoEnd"].value;
	if(sNo != "" && eNo == "")
		document.all["txDocNoEnd"].value = sNo;
	if(sNo == "" && eNo != "")
		document.all["txDocNoStar"].value = eNo;
		
	var sANo = document.all["txAppBegin"].value;
	var eANo = document.all["txAppEnd"].value;
	if(sANo != "" && eANo == "")
		document.all["txAppEnd"].value = sANo;
	if(sANo == "" && eANo != "")
		document.all["txAppBegin"].value = eANo;
	
	isNotAlert = true;
	if(!CheckDataFormat(document.all["dateBegin"],"申請日期(起)"))
	{
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["申請日期(起)"])), "");
	    //1051005 Justin 1050087 二代公文修改
	    //document.all["dateBegin"].focus();
	    $('#dateBegin').focus();
		document.all["dateBegin"].value = "";
		isNotAlert = false;
		return false;
	}
	if(!CheckDataFormat(document.all["dateEnd"],"申請日期(迄)"))
	{
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["申請日期(迄)"])), "");
	    //1051005 Justin 1050087 二代公文修改
	    //document.all["dateEnd"].focus();
	    $('#dateEnd').focus();
		document.all["dateEnd"].value = "";
		isNotAlert = false;
		return false;
	}
	var sDate = document.all["dateBegin"].value;
	var eDate = document.all["dateEnd"].value;
	if(sDate != "" && eDate == "")
		document.all["dateEnd"].value = sDate;
	if(sDate == "" && eDate != "")
		document.all["dateBegin"].value = eDate;
		
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_User"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
	document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
	
	var DeptVal = document.all["H_Dept_Value"].value
	var UserVal = document.all["H_User_Value"].value
	if((DeptVal+UserVal+sNo+eNo+sANo+eANo+sDate+eDate) == "")
	{
		alert("除申請類別外，請至少輸入一組條件，以加快查詢速度!");
		return false;
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
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
			
			odjf_SetdlDept("dlDept","dlSect","dlUser","",false);	//初始dlSect、dlUser的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
			document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			
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
		if(odjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			
			odjf_SetdlSect("dlDept","dlSect","dlUser","",false);	//初始化承辦人選單
				
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
			document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			
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

function dlUser_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlUser_Text"].value != document.all["H_User"].value)
	{
		//呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlUser", "承辦人"))
		{
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
		}
		else
			bCheckOK = false;
	}
	//1140701	Cloud	1140175		修正支援查當下代理資訊，有輸入申請人時才啟用該選項
	if(document.all["dlUser_Text"].value=="")
		fnSetProxy(false);
	else
		fnSetProxy(bCheckOK);
	return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
	    //1051005 Justin 1050087 二代公文修改
	    //document.all[argComboxID + "_Container"].className = "InputFieldText";
	    document.all[argComboxID + "_Container"].className = "custom-combobox";
}

/**********************************************************************************************
  Name : function odjf_SetdlDept()
  Desc : 承辦單位下拉式選單變動時，連動變動承辦科別及承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
	if(DeptComboBoxTextObj.value == "")
	{
		if (SectComboBoxObj != null && SectComboBoxTextObj != null)
		{
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);
			SectComboBoxObj.size = 2;
			SectComboBoxObj.options.add(new Option("",""));
			SectComboBoxTextObj.value = "";
		}
		
		if (UserComboBoxObj != null && UserComboBoxTextObj != null)
		{
			while(UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);
			UserComboBoxObj.size = 2;
			UserComboBoxObj.options.add(new Option("",""));
			UserComboBoxTextObj.value = "";
		}
		//1140701	Cloud	1140175		修正支援查當下代理資訊，有輸入申請人時才啟用該選項
		fnSetProxy(false);
		return;
	}
	
	if (SectComboBoxObj != null && SectComboBoxTextObj != null)
	{
		//承辦科別下拉選單不為隱藏才初始
		if(SectComboBoxTextObj.className != "hide")
		{
			var val = DeptComboBoxObj.value.split(":")[0];

			callObj = jf_CallWS("EDR402.asmx", "GetSubUnit", false, val);
			
			var resultObj = null;
			if( callObj.error )
				alert(callObj.errorDetail.string);
			else
			{
				if( jf_IsWebServiceSuccess(callObj) )
					resultObj = callObj.value;
			}
			
			var SectNameMem = SectComboBoxTextObj.value;

			//清空選項
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.SecName.length;
			SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			SectComboBoxObj.options.add(new Option("",""));
			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
				var objOption = new Option(resultObj.SecName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxTextObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				if( SectNameMem == resultObj.SecName[i] || SectNameMem == resultObj.SecNo[i] )
				{
					SectComboBoxTextObj.value = resultObj.SecName[i];
					SectComboBoxObj.selectedIndex = i;
					break;
				}
			}
		}
	}

	if (UserComboBoxObj != null && UserComboBoxTextObj != null)
	{
		//承辦人下拉選單不為隱藏才初始
		if(UserComboBoxTextObj.className != "hide")
		{
			var valUser = new Array(3);
			if(SectComboBoxObj == null)
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else if(SectComboBoxObj.selectedIndex == -1)	//如果承辦科別有選擇就以承辦科別為單位代碼參數
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else
				valUser[0] = SectComboBoxObj.value.split(":")[2];
			valUser[1] = argRoleNo;
			valUser[2] = argSubTree;
			callObj = jf_CallWS("EDR402.asmx", "GetUnitAllUsers", false, valUser);
						
			resultObj = null;
			if( callObj.error )
				alert(callObj.errorDetail.string);
			else
			{
				if( jf_IsWebServiceSuccess(callObj) )
					resultObj = callObj.value;
			}
			
			var UserNameMem = UserComboBoxTextObj.value;

			//清空選項
			while(UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.UserName.length;
			UserComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			UserComboBoxObj.options.add(new Option("",""));
			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
				var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
				UserComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			UserComboBoxTextObj.value = "";
			UserComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				if( UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i] )
				{
					UserComboBoxTextObj.value = resultObj.EmpName[i];
					UserComboBoxObj.selectedIndex = i;
					break;
				}
			}
			//1140701	Cloud	1140175		修正支援查當下代理資訊，有輸入申請人時才啟用該選項
			fnSetProxy(false);
		}
	}
}

/**********************************************************************************************
  Name : function odjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlSect(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	
	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
	if(DeptComboBoxTextObj.value == "")
	{
		if (SectComboBoxObj != null && SectComboBoxTextObj != null)
		{
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);
			SectComboBoxObj.size = 2;
			SectComboBoxObj.options.add(new Option("",""));
			SectComboBoxTextObj.value = "";
		}
		
		if (UserComboBoxObj != null && UserComboBoxTextObj != null)
		{
			while(UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);
			UserComboBoxObj.size = 2;
			UserComboBoxObj.options.add(new Option("",""));
			UserComboBoxTextObj.value = "";
		}
		//1140701	Cloud	1140175		修正支援查當下代理資訊，有輸入申請人時才啟用該選項
		fnSetProxy(false);
		return;
	}
	
	if (UserComboBoxObj != null && UserComboBoxTextObj != null)
	{
		var valUser = new Array(3);
		if(SectComboBoxObj.value == "")
			valUser[0] = DeptComboBoxObj.value.split(":")[0];
		else
			valUser[0] = SectComboBoxObj.value.split(":")[2];
		valUser[1] = argRoleNo;
		valUser[2] = argSubTree;

		callObj = jf_CallWS("EDR402.asmx", "GetUnitAllUsers", false, valUser);
		//var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
		
		resultObj = null;
		if( callObj.error )
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
		}

		var UserNameMem = UserComboBoxTextObj.value;

		//清空選項
		while(UserComboBoxObj.length > 0)
			UserComboBoxObj.remove(0);

		//重新新增選項
		len = resultObj.UserName.length;
		UserComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
		UserComboBoxObj.options.add(new Option("",""));
		for( i=0 ; i<len ; i++ )
		{
			//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
			UserComboBoxObj.options.add(objOption);
		}

		//清空顯示的Text，以及重設選擇
		UserComboBoxTextObj.value = "";
		UserComboBoxObj.selectedIndex = -1;
		for( i=0 ; i<len ; i++ )
		{
			if( UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i] )
			{
				UserComboBoxTextObj.value = resultObj.EmpName[i];
				UserComboBoxObj.selectedIndex = i;
				break;
			}
		}
		//1140701	Cloud	1140175		修正支援查當下代理資訊，有輸入申請人時才啟用該選項
		fnSetProxy(false);
	}
}

/**********************************************************************************************
  Name : function odjf_ComboBoxCheck()
  Desc : 離開ComboBox欄位的合理性檢查與人員欄位的連動處理		Charles 0950921
  Parm : argComboBoxID      : string 部門Combobox 物件 ID
		 argKeyMsg			: string 錯誤時顯示的ComboBox名稱
  Rtn  : none
 **********************************************************************************************/
function odjf_ComboBoxCheck(argComboBoxID, argKeyMsg)
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
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入的" + argKeyMsg + "不在選單當中"])), "");
	    //1051005 Justin 1050087 二代公文修改
	    //ComboBoxTextObj.focus();
	    $('#' + ComboBoxTextObj.id).focus();
		ComboBoxTextObj.select();
	}
	return bRtnBool;
}

//取得下拉選單物件中，與指定Text相對應的值
function odjf_GetSelectValue(argSelect, argText)
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

//將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function odjf_SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
		strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
	
	return strTemp.substr(0,strTemp.length-1);
}

function dlApplyType_onClick(argObj)
{
	var objVal = argObj.value;
	if( objVal == "AKT800" || objVal == "EAT310" || objVal == "EAT800")
	{
		document.all["trDocNo"].style.display = "none";
		document.all["txDocNoStar"].value = "";
		document.all["txDocNoEnd"].value = "";
	}
	else
		document.all["trDocNo"].style.display = "";
}

function CheckDataFormat(argObj,str)
{
	if(argObj.value != "")
	{
		var strValue = argObj.value;
		argObj.value = jf_PADL(strValue,7,"0");
		if(!jf_CheckCDATE(argObj.value))
		{
			if(!isNotAlert)
			{
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([str])), "");
			    //1051005 Justin 1050087 二代公文修改
			    //argObj.focus();
			    $('#' + argObj.id).focus();
				argObj.value = "";
			}
			return false;
		}
	}
	return true;
}

//1080906 Kevin_C	1080775	MERGE[1070552]新增陳核中表單、待核批表單查詢模式
function SetUI() {
    if (document.all.rbSearch1.checked) {
        document.all.RStatus.className = "";
        document.all.Label9.textContent = "申請單位：";
        document.all.Label8.textContent = "申請人：";
    }
    else if (document.all.rbSearch2.checked) {
        document.all.RStatus.className = "hide";
        document.all.Label9.textContent = "審核單位：";
        document.all.Label8.textContent = "審核長官：";
    }
}
//1140701	Cloud	1140175		修正支援查當下代理資訊
function fnSetProxy(argWork) {
	if (argWork) {
		document.all["ckInProxy"].disabled = false;
		document.all["ckInProxy"].checked = true;
	}
	else {
		document.all["ckInProxy"].disabled = true;
		document.all["ckInProxy"].checked = false;
	}

}