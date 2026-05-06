/*
Date	SA		PG		MGR_NO		DESC
1101020	Joe		Joe		--			支援若現場Session沒關，會導致ED相對路徑判斷錯誤的問題
1120313	Cloud	Cloud	1120203		弱掃修正Client DOM XSS
*/
function ProjectOnLoad()
{
}


//1010605	Leslie[1010506]	配合搬移II程式至IF專案，Copy相關函式至此...
function ReplaceParamStrForOrgNo(argParamStr, argOrgNo)
{
	if(argParamStr == "")
		return "";
	if(typeof(argOrgNo) == "undefined" || argOrgNo == "")
		return argParamStr;

	var ret = "";
	var bStartWithQ = argParamStr.indexOf("?") == 0;
	if(bStartWithQ)
		argParamStr = argParamStr.replace("?", "");
	if(bStartWithQ)
		ret = "?";
		
	var bHasOrgNoParam = false;
	var arrPara = argParamStr.split("&");
	for(var i=0; i<arrPara.length; i++)
	{
		var arrOnePara = arrPara[i].split("=");
		if(arrOnePara[0].toUpperCase() == "nOrgNo".toUpperCase())
		{
			arrOnePara[1] = argOrgNo;
			bHasOrgNoParam = true;
		}
		if(i != 0)
			ret += "&";
		ret += arrOnePara[0] + "=" + arrOnePara[1];
	}
	if(bHasOrgNoParam == false)
		ret += "&nOrgNo=" + argOrgNo;
	return ret;
}

//1010605	Leslie	搬過來順便改一改寫法，改用location.search，可以直接取得"?"(含)之後的部分
function GetAllParamStr()
{
	var strParam = "";
	var pUrl = unescape(this.location.search);	//一樣要經過解碼
	//1091124	Leslie[1090885]	修掉奇怪的網址列判斷
	/*if( pUrl != -1 )
		return pUrl;*/
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
		else
			strParam = "?";	//串上"?"以避免外部呼叫端會串上各程式專用的參數
	}
	//1120313	Cloud	1120203		弱掃修正Client DOM XSS
	//return strParam;
	return encodeURI(strParam);
}

//新增Combobox共用函式
function ifjf_GetSelectValue(argSelect, argText) {
	var RtnValue = "";
	for (var i = 0; i < argSelect.options.length; i++) {
		if (argSelect.options[i].text == argText) {
			RtnValue = argSelect.options[i].value;
			break;
		}
	}
	return RtnValue;
}

/**********************************************************************************************
  Name : function ifjf_ComboBoxCheck()
  Desc : 離開ComboBox欄位的合理性檢查，檢查輸入值是否存在於選單中
  Parm : argComboBoxID      : string Combobox 物件 ID
		 argKeyMsg			: string 錯誤時顯示的ComboBox名稱
  Rtn  : none
 **********************************************************************************************/
function ifjf_ComboBoxCheck(argComboBoxID, argKeyMsg) {
	var bRtnBool = false;
	var ComboBoxObj = document.all[argComboBoxID];
	var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];

	var i, j;
	if (ComboBoxObj == null || ComboBoxTextObj == null) {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["[" + argComboBoxID + "]下拉選單不存在"])), "");
		return bRtnBool;
	}

	for (i = 0; i < ComboBoxObj.options.length; i++) {
		if (ComboBoxTextObj.value == ComboBoxObj.options[i].text) {
			bRtnBool = true;
			break;
		}
	}

	if (!bRtnBool) {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入的" + argKeyMsg + "不在選單當中"])), "");
		//1060803	Joe		1050087		因二代升級修正Focus寫法
		// ComboBoxTextObj.focus();
		$('#' + ComboBoxTextObj.id).focus();
		ComboBoxTextObj.select();
	}
	return bRtnBool;
}

/**********************************************************************************************
  Name : function ifjf_SetdlDept()
  Desc : 一級單位下拉式選單變動時，連動變動二級單位及人員下拉式選單
  Parm : argDeptComboBoxID      : string 一級單位Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function ifjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	//如果一級單位目前所選為空值，則將二級單位及人員設定為無選項且顯示為空值
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

			//1100908	Joe		1100821		修正錯誤的名稱
			// var callObj = jf_CallWS("../../ED/EDLIB/EDWS.asmx", "GetSubUnits", false, val);
			//1101020	Joe		--			支援若現場Session沒關，會導致ED相對路徑判斷錯誤的問題
			// var callObj = jf_CallWS("../../ED/EDLIB/EDWS.asmx", "GetSubUnit", false, val);
			var callObj = jf_CallWS("../../../ED/EDLIB/EDWS.asmx", "GetSubUnit", false, val);
			
			var resultObj = null;
			if( jf_IsWebServiceSuccess(callObj) )
			{
					resultObj = callObj.value;
					return;
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
					//SectComboBoxObj.selectedIndex = i;
					//1010413 CLOUD combobox初始化邏輯錯誤
					SectComboBoxObj.selectedIndex = i+1;
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

			//1050810	Joe		1050700		弱掃修正--S
			valUser[0] = encodeURI(valUser[0]);
			valUser[1] = encodeURI(valUser[1]);	
			valUser[2] = encodeURI(valUser[2]);	
			//1050810	Joe		1050700		弱掃修正--E
			//1101020	Joe		--			支援若現場Session沒關，會導致ED相對路徑判斷錯誤的問題
			// var callObj = jf_CallWS("../../ED/EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
			var callObj = jf_CallWS("../../../ED/EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
			
			var resultObj = null;
			if( jf_IsWebServiceSuccess(callObj) )
			{
					resultObj = callObj.value;
					return;
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
					//UserComboBoxObj.selectedIndex = i;
					//1010413 CLOUD combobox初始化邏輯錯誤
					UserComboBoxObj.selectedIndex = i+1;
					break;
				}
			}
		}
	}
}
//0981127 ifjf_SetdlDept()多傳入一參數argDeptOnly，用來判斷承辦科別下拉選單是否顯示"(僅含一級單位)"的選項[0980578]-Jane
/**********************************************************************************************
  Name : function ifjf_SetdlDept()
  Desc : 一級單位下拉式選單變動時，連動變動二級單位及人員下拉式選單
  Parm : argDeptComboBoxID      : string 一級單位Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
		 argDeptOnly            : string bool   承辦科別下拉選單是否顯示"(僅含一級單位)"的選項
		                          (true:顯示;false:不顯示)
  Rtn  : none
 **********************************************************************************************/
function ifjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree, argDeptOnly)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	//如果一級單位目前所選為空值，則將二級單位及人員設定為無選項且顯示為空值
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

			//1101020	Joe		--			支援若現場Session沒關，會導致ED相對路徑判斷錯誤的問題
			// var callObj = jf_CallWS("../../ED/EDLIB/EDWS.asmx", "GetSubUnit", false, val);
			var callObj = jf_CallWS("../../../ED/EDLIB/EDWS.asmx", "GetSubUnit", false, val);
			
			var resultObj = null;
			if( jf_IsWebServiceSuccess(callObj) )
			{
					resultObj = callObj.value;
			}
			
			var SectNameMem = SectComboBoxTextObj.value;

			//清空選項
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.SectName.length;
			SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			SectComboBoxObj.options.add(new Option("",""));
			if(len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
				SectComboBoxObj.options.add(new Option("(僅含一級單位)",""));
				
			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
				var objOption = new Option(resultObj.SectName[i], resultObj.SecNo[i]+":"+resultObj.SectName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SectName[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxTextObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				if( SectNameMem == resultObj.SectName[i] || SectNameMem == resultObj.SecNo[i] )
				{
					SectComboBoxTextObj.value = resultObj.SectName[i];
					SectComboBoxObj.selectedIndex = i;+1
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

			valUser[0] = encodeURI(valUser[0]);
			valUser[1] = encodeURI(valUser[1]);	
			valUser[2] = encodeURI(valUser[2]);	
			//1101020	Joe		--			支援若現場Session沒關，會導致ED相對路徑判斷錯誤的問題
			// var callObj = jf_CallWS("../../ED/EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
			var callObj = jf_CallWS("../../../ED/EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
			
			var resultObj = null;
			if( jf_IsWebServiceSuccess(callObj) )
			{
					resultObj = callObj.value;
					//return;
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
					//UserComboBoxObj.selectedIndex = i;
					UserComboBoxObj.selectedIndex = i+1;
					break;
				}
			}
		}
	}
}

/**********************************************************************************************
  Name : function ifjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function ifjf_SetdlSect(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
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

		valUser[0] = encodeURI(valUser[0]);
		valUser[1] = encodeURI(valUser[1]);	
		valUser[2] = encodeURI(valUser[2]);	
			//1101020	Joe		--			支援若現場Session沒關，會導致ED相對路徑判斷錯誤的問題
		// callObj = jf_CallWS("../../ED/EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
		callObj = jf_CallWS("../../../ED/EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
		
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

function ifjf_SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
		strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
	
	return strTemp.substr(0,strTemp.length-1);
}