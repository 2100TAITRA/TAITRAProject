/*
DATE    SA      PRG		   MGR_NO       DESC
0970603 Stella  Iris       0970596      (藥檢局)新增excel匯出及承辦科別下拉式選單
1050419 Kevin   Justin     1050087      二代公文修改
1051019 Leslie  Kenny      1050087      二代公文修改
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050421 Justin 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
//0970596 iris 
    //1051019   Kenny   [1050087]   二代公文修改；移除無用CODE
	//jf_CallWS("EDR402.asmx", "GetDeptAllUsers", false, null);
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
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
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050421 Justin 1050087 二代公文修改 
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
	
    //1050421 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStat":
			dlDept_Text_onblur();
			dlSect_Text_onblur();
			Page_BlockSubmit = !fnCheckBeforeStat();
		    //1050421 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
			dlDept_Text_onblur();
			dlSect_Text_onblur();
			Page_BlockSubmit = !fnCheckBeforeSample();
		    //1050421 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSample":
			dlDept_Text_onblur();
			dlSect_Text_onblur();
			Page_BlockSubmit = !fnCheckBeforeSample();
		    //1050421 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function odjf_SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
		strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
	
	return strTemp.substr(0,strTemp.length-1);
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
			
			var bSubTree = true;
			if(document.all["H_OD_FLOW_TYPE"].value == "2")
				bSubTree = false;
			
			odjf_SetdlDept("dlDept","dlSect","","",false);	//初始dlSect的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
			
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
		if(odjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			
			odjf_SetdlSect("dlDept","dlSect","","",false);	//初始化承辦人選單
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID,argLabelID)
{
	if(document.all[argComboxID].options.length <=1)
	{
		document.all[argComboxID+"_Container"].className = "hide";
		document.all[argLabelID].className = "hide";
	}
	else
	{
	    //1050421 Justin 1050087 二代公文修改
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
		//document.all[argLabelID].className = "InputFieldLabel";
		document.all[argComboxID + "_Container"].className = "custom-combobox";
		document.all[argLabelID].className = "custom-combobox";
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
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入的"+argKeyMsg+"不在選單當中"])),"");
	    /*1050505 Justin 1050087 二代公文修改
		ComboBoxTextObj.focus();*/
	    $('#' + argComboBoxID + "_Text").focus();
		ComboBoxTextObj.select();
	}
	return bRtnBool;
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
	}
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
		}
	}
}


function fnCheckBeforeStat()
{
	if (!CheckCDATE("txDateS", "收文日期(起)") || !CheckCDATE("txDateE", "收文日期(訖)"))
		return false;
	if (!jf_Trim(document.all.txDateS.value) && !jf_Trim(document.all.txDateE.value))
	{
	    /*1050505 Justin 1050087 二代公文修改
	    document.all.txDateS.focus();*/
	    $('#txDateS').focus();
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["收文日期起訖不可同時為空白。"]) ), "" );
		return false;
	}
	return true;
}

function fnCheckBeforeSample()
{
	if (!document.all.dg1)
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["請先執行統計後再抽樣。"]) ), "" );
		return false;
	}
	var bHasData = false;
	var strTotal = "";
	var strSample = "";
	var nSubtract = 0;
	for (var i = 2; i < document.all.dg1.rows.length+1; i++)
	{
	    //1050421 Justin 1050087 二代公文修改
	    //strTotal = document.all["dg1__ctl" + i + "_lbTotal"].innerText;
	    strTotal = document.all["dg1__ctl" + i + "_lbTotal"].textContent;
		strSample = document.all["dg1__ctl"+i+"_txSample"].value;
		if (strSample > 0)
		{
			if (parseInt(strTotal, 10) < parseInt(strSample, 10))
			{
			    //1050505 Justin 1050087 二代公文修改
				//document.all["dg1__ctl"+i+"_txSample"].focus();
				$("#dg1__ctl" + i + "_txSample").focus();
				jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["抽樣件數不可超過公文件數。"]) ), "" );
				return false;
			}
			bHasData = true;
		}
	}
	
	if (!bHasData)
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["請先輸入抽樣件數。"]) ), "" );
		return false;
	}
	return true;
}