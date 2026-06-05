/*
DATE	SA	PRG	MGR_NO	DESC
0950912	Stella	Charles	950355	新增edjf_DeptCheck、edjf_SectCheck、edjf_UserCheck三個檢查下拉式選單的函式
0960115	Stella	Charles	000138	因應台科大新增EDT130等新程式須使用二層式架構，參考ODDEP之程式碼區塊
0981127 Stella  Jane    0980578	二層式登紀桌架構,將edjf_SetdlDept()改為多載方式,多傳入一參數判斷承辦科別下拉選單是否顯示"(僅含一級單位)"的選項
0991011			Johnny	0990698	新增edjf_SetdlSect當科別變動時可連帶變動使用者下拉選單
1010413 Kevin   Cloud   ------- 修正初始化COMBOBOX取得邏輯錯誤
1010921	Kevin	Kevin	1010903	呼叫IIC021增加傳入權杖
1050712 Kevin   Joe		1050087	修正ShowModalDialog視窗開啟問題  
1050803	Kevin	Joe		1050087	修改子視窗大小
1050810	Kevin	Joe		1050700	弱掃修正
1060803	--		Joe		1050087	因應二代升級，調整focus寫法
1070803 Kevin   Justin	1070678	弱掃修正Client Cookies Inspection
1080916	Kevin	Joe		1070678	修正未指定機關代碼傳入undefined至IFC021，導致開啟失敗的問題
1120524	Joe		Joe		序228	(Merge1070661)修正onblur檢核後不斷alert之問題
*/

var SPLIT = "|";
function ProjectOnLoad()
{

} 

/*****************************************************************************
*
*   開啟選擇單位、角色、人員子視窗
* 
*****************************************************************************/
function jf_ShowOrgDialogForPersonWithOrgNo(argOrgNo)
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--S
	//var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	//return ret;
	jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--E	
}

function jf_ShowOrgDialogForAllWithOrgNo(argOrgNo)
{
	var arrSelectType = new Array(3);
	arrSelectType[0] = "Unit";
	arrSelectType[1] = "Role";
	arrSelectType[2] = "Account";
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--S
	//var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	//return ret;
	jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--E	
}

function jf_ShowOrgDialogForPesonUnitWithOrgNo(argOrgNo)
{
	var arrSelectType = new Array(2);
	arrSelectType[0] = "Unit";
	arrSelectType[1] = "Account";
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--S
	//var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	//return ret;
	jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--E	
}

function jf_ShowOrgDialogForPerson()
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--S
	//var ret = jf_ShowOrgDialogByLevel("0", arrSelectType);
	//return ret;
	//1080916	Joe		1070678		修正未指定機關代碼傳入undefined至IFC021，導致開啟失敗的問題
	// jf_ShowOrgDialogByLevel("0", arrSelectType);
	jf_ShowOrgDialogByLevel("0", arrSelectType, "");
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--E	
}

function jf_ShowOrgDialogForPesonUnit()
{
	var arrSelectType = new Array(2);
	arrSelectType[0] = "Unit";
	arrSelectType[1] = "Account";
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--S
	//var ret = jf_ShowOrgDialogByLevel("0", arrSelectType);
	//return ret;
	//1080916	Joe		1070678		修正未指定機關代碼傳入undefined至IFC021，導致開啟失敗的問題
	// jf_ShowOrgDialogByLevel("0", arrSelectType);
	jf_ShowOrgDialogByLevel("0", arrSelectType, "");
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--E	
}

function jf_ShowOrgDialogForAll()
{
	var arrSelectType = new Array(3);
	arrSelectType[0] = "Unit";
	arrSelectType[1] = "Role";
	arrSelectType[2] = "Account";
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--S
	//var ret = jf_ShowOrgDialogByLevel("0", arrSelectType);
	//return ret;
	//1080916	Joe		1070678		修正未指定機關代碼傳入undefined至IFC021，導致開啟失敗的問題
	// jf_ShowOrgDialogByLevel("0", arrSelectType);
	jf_ShowOrgDialogByLevel("0", arrSelectType, "");
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題--E	
}

/// <summary>
/// argParam等於0時(預設)，顯示機關,單位,角色與扮演人員
/// argParam等於1時，顯示機關,單位與放置在機關單位底下的AD帳號物件
/// argSelectType is a string array, the element may be: Org, Unit, Role or Account
///  so, it means user can select Org, Unit, Role and Account
/// argOrgNo為機關代碼, 表示指定顯示某個特定機關即可, 若傳入值為null,undefined or空字串,則表不指定
/// 回傳的物件型態有兩種, 分別為CURInfo與CAccountInfo, 其屬性分別如下
/// CURInfo
/// 
/// InfoType //其值有可能為Org, Unit或Role
/// Code//單位代碼或角色代碼
/// Name
/// Path
/// UnitType
/// UnitMode
/// SuperiorUnitCode
/// SourceOrgNo
/// SourceOrgName
/// FullName
/// Description
/// ChildCount
/// DisplayRank
/// 
/// CAccountInfo
/// 
/// InfoType = EnumInfoType.Account.ToString();//Account
/// Code
/// Name
/// Path
/// 
/// 呼叫此共用函式得到回傳值時可先判斷InfoType的值, 若其值為Account, 
/// 則表示所回傳的物件型態為CAccountInfo
/// <summary>
function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo)
{
	var sSelectType = "";
	for(var i=0; i<argSelectType.length; i++)
	{
		if(i != 0)
			sSelectType += ",";
		//1070803 Justin [1070678]弱掃修正Client Cookies Inspection--S
        //sSelectType += "'" + argSelectType[i] + "'";
		sSelectType += argSelectType[i];
    }
    //jf_SaveCookie("iic021StrctureType", argParam);
    //jf_SaveCookie("iic021SelectType", sSelectType);
    //if (argOrgNo)
    //    jf_SaveCookie("iic021OrgNo", argOrgNo);
	//1070803 Justin [1070678]弱掃修正Client Cookies Inspection--E
		
	//1010921 Kevin 1010903 增加傳入權杖
	//var ret= jf_ShowModal("../../../II/IIC021.htm","288","470");
	var sPara = location.search;
	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題
	//var ret= jf_ShowModal("../../../II/IIC021.htm"+sPara,"288","470");
	//1050803	Joe		1050087		修正子視窗大小
	// jf_ShowModal("../../../IF/IF1/IFC021.aspx" + sPara, "288", "470");
	//1070803 Justin [1070678]弱掃修正Client Cookies Inspection
	//jf_ShowModal("../../../IF/IF1/IFC021.aspx" + sPara, "800", "600");
	jf_ShowModal("../../../IF/IF1/IFC021.aspx" + sPara + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "800", "600");
	
	//清除Cookie
	//1070803 Justin [1070678]弱掃修正Client Cookies Inspection
	//if(argOrgNo)
	//	jf_SaveCookie("iic021OrgNo", "");

	//1050712 Joe 1050087 二代公文修改，修正ShowModalDialog視窗開啟問題
	//return ret;
}

/*
function jf_ShowOrgDialogForPerson(strOrgNo)
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
	var ret = jf_ShowOrgDialogByLevel(strOrgNo, "0", arrSelectType);
	return ret;
}

function jf_ShowOrgDialogForUnit(strOrgNo)
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Unit";
	var ret = jf_ShowOrgDialogByLevel(strOrgNo, "0", arrSelectType);
	return ret;
}


function jf_ShowOrgDialogForAll(strOrgNo)
{
	var arrSelectType = new Array(4);
	arrSelectType[0] = "Org";
	arrSelectType[1] = "Unit";
	arrSelectType[2] = "Role";
	arrSelectType[3] = "Account";
	var ret = jf_ShowOrgDialogByLevel(strOrgNo, "0", arrSelectType);
	return ret;
}

function jf_ShowOrgDialogForCustom(strOrgNo, arrSelectType)
{
	var ret = jf_ShowOrgDialogByLevel(strOrgNo, "0", arrSelectType);
	return ret;
}

/// <summary>
/// argParam等於0時(預設)，顯示機關,單位,角色與扮演人員
/// argParam等於1時，顯示機關,單位與放置在機關單位底下的AD帳號物件
/// argSelectType is a string array, the element may be: Org, Unit, Role or Account
///  so, it means user can select Org, Unit, Role and Account
/// <summary>
function jf_ShowOrgDialogByLevel(strOrgNo, argParam, argSelectType)
{
	var sSelectType = "";
	for(var i=0; i<argSelectType.length; i++)
	{
		if(i != 0)
			sSelectType += ",";
		sSelectType += "'" + argSelectType[i] + "'";
	}
	jf_SaveCookie("iic021StrctureType", argParam);
	jf_SaveCookie("iic021SelectType", sSelectType);
	var ret= jf_ShowModal("../../../II/IIC021.htm","288","470"); //回傳值：CN, displayName, Path, Desc, CInfo
	return ret;
}
*/

/*****************************************************************************
*
*   專案共用函式
* 
*****************************************************************************/
//紀錄是否已檢核過有註冊onblur事件的欄位的值(通常發生在輸入完後直接按下儲存件時)
var bHasCheck = false;

//檢查日期格式
function CheckCDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
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
			//1060803	Joe		1050087		因二代升級修正Focus寫法
			// document.all[argObj].focus();
			$('#' + argObj).focus();		
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}

//檢查時間格式
function CheckTIME(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strTime = document.all[argObj].value;
	if (strTime != "")
	{
		if (strTime.length < 6)
		{
			strTime = jf_PADR(strTime,0,'0');
			document.all[argObj].value = strTime;
		}
		var strH = strTime.substr(0,2);
		var strM = strTime.substr(2,2);
		var strS = strTime.substr(4,2);
		if (strH > 23 || strM > 59 || strS > 59)
		{
			//1060803	Joe		1050087		因二代升級修正Focus寫法
			// document.all[argObj].focus();
			$('#' + argObj).focus();		
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}

//檢查DataGrid內容是否重複輸入
function jf_CheckDataGridDuplicate(dgObj, mainCol, mainColName, bCanEmpty)
{
	var strBuf = "";
	var strMain = "";
	var strCheck = "";
	for (var i = 2; i <= document.all[dgObj].rows.length; i++)
	{
		//以人員為主要欄位，未輸入者則該筆資料將被忽略或刪除
		var strMainID = "dg1__ctl" + i + "_" + mainCol;
		var strMain = jf_Trim(document.all[strMainID].value);
		if (strMain == "")
			continue;

		strCheck += strBuf + strMain;
		strBuf = ",";
	}

	if (strCheck == "")
	{
		if (bCanEmpty)
			return true;
		else
		{
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["請至少輸入一筆資料。"]) ), "" );
			return false;
		}
	}
	
	var arCheck = strCheck.split(",");
	arCheck.sort();
	for (var iRow = 0; iRow < arCheck.length - 1; iRow++)
	{
		if (arCheck[iRow] == "") continue;
		if (arCheck[iRow] == arCheck[iRow+1])
		{
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([mainColName + "不可重複。"]) ), "" );
			return false;
		}
	}

	return true;
}

//取得目前系統日期
function jf_GetDateNow()
{
	var DateNow;
	var date;
	var tempY
	var yy;
	var	tempM;
	var	mm;
	var tempD;
	var	dd;
	date = new Date();
	
	tempY	=	date.getFullYear() - 1911	;
	tempY	=	tempY.toString();
	yy		=	jf_PADL(tempY, 3, "0");
	
	tempM	=	(date.getMonth()+1);
	tempM	=	tempM.toString();
	mm		=	jf_PADL(tempM, 2, "0");
	
	tempD	=	date.getDate();
	tempD	=	tempD.toString();
	dd		=	jf_PADL(tempD, 2, "0");
	
	DateNow	=	yy + mm + dd;

	return DateNow;
}

//取得目前系統時間
function jf_GetTimeNow()
{
	var DateNow;
	var date;
	var tempH
	var hh;
	var	tempM;
	var	mm;
	var tempS;
	var	ss;
	date = new Date();
	
	tempH	=	date.getHours();
	tempH	=	tempH.toString();
	hh		=	jf_PADL(tempH, 2, "0");
	
	tempM	=	date.getMinutes();
	tempM	=	tempM.toString();
	mm		=	jf_PADL(tempM, 2, "0");
	
	tempS	=	date.getSeconds();
	tempS	=	tempS.toString();
	ss		=	jf_PADL(tempS,2,"0");
	
	DateNow	=	hh + mm + ss;

	return DateNow;
}

function ED_jf_CheckFull()
{
   if(event.keyCode==9)
      return;
   if(event.keyCode==16)
      return;

   if(document.activeElement.value==null)
      return;
		
   var len1=document.activeElement.value.length;
   var len2=document.activeElement.maxLength;
   var currentMatch=null;
   if(len1 == len2)
   {
	  if (document.activeElement.tabIndex>-1)
	  {
		for(i=0;i< document.activeElement.form.elements.length;i++)
		{
			if(currentMatch == null)
			{
				if(document.activeElement.form.elements[i].tabIndex > document.activeElement.tabIndex)
				{
					if(document.activeElement.form.elements[i].style.visibility == "hidden")
						continue;
					if(document.activeElement.form.elements[i].className=="hidden")
						continue;

					if(document.activeElement.form.elements[i].style.display == "none")
						continue;
					if(document.activeElement.form.elements[i].className=="hide")
						continue;

					if(document.activeElement.form.elements[i].disabled == true)
						continue;

					currentMatch = document.activeElement.form.elements[i];
				}
			}
			else
			{
				if((document.activeElement.form.elements[i].tabIndex < currentMatch.tabIndex)&&
					(document.activeElement.form.elements[i].tabIndex > document.activeElement.tabIndex))
				{
					if(document.activeElement.form.elements[i].style.visibility == "hidden")
						continue;
					if(document.activeElement.form.elements[i].className=="hidden")
						continue;

					if(document.activeElement.form.elements[i].style.display == "none")
						continue;
					if(document.activeElement.form.elements[i].className=="hide")
						continue;

					if(document.activeElement.form.elements[i].disabled == true)
						continue;
					currentMatch = document.activeElement.form.elements[i];
				}
			}
			
		}
	  }
	  if(currentMatch !=null)
		//1060803	Joe		1050087		因二代升級修正Focus寫法
		// currentMatch.focus();
		$('#' + currentMatch.id).focus();		
	     
   }
}

function jf_InpOnly_Eng_Num()
{
	var kc = event.keyCode;
	var type = event.type;
	var shift = event.shiftKey;
	if(shift == true)
	{
		if(kc<48){event.keyCode=0;}
	 	if(kc >57 & kc < 65){event.keyCode=0;}
		if(kc >90 & kc < 97){event.keyCode=0;}
		if(kc>112){event.keyCode=0;}
	}
}

/**********************************************************************************************
  Name : function edjf_DeptCheck()
  Desc : 離開部門欄位的合理性檢查與人員欄位的連動處理	[950355需求單] Charles 0950912
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
function edjf_DeptCheck(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	var bRtnBool = false;
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	
	var i, j, len;
	if (DeptComboBoxTextObj == null || DeptComboBoxObj == null)
		return bRtnBool;

	for( i=0 ; i<DeptComboBoxObj.options.length ; i++ )
	{
		if (DeptComboBoxTextObj.value == DeptComboBoxObj.options[i].text)
		{
			bRtnBool = true;
			break;
		}
	}
	if (!bRtnBool)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入單位不在選單當中"])),"");
		//1060803	Joe		1050087		因二代升級修正Focus寫法
		// DeptComboBoxTextObj.focus();
		$('#' + DeptComboBoxTextObj.id).focus();	
		DeptComboBoxTextObj.select();
		return bRtnBool;
	}
	/*** END ***/

	if(DeptComboBoxTextObj.value == "")
	{
		while(SectComboBoxObj.length > 0)
			SectComboBoxObj.remove(0);
		SectComboBoxObj.size = 2;
		SectComboBoxObj.options.add(new Option("",""));
		SectComboBoxTextObj.value = "";
		while(UserComboBoxObj.length > 0)
			UserComboBoxObj.remove(0);
		UserComboBoxObj.size = 2;
		UserComboBoxObj.options.add(new Option("",""));
		UserComboBoxTextObj.value = "";
		return bRtnBool;
	}

	var val = DeptComboBoxObj.value;

	var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetSubUnit", false, val);
	
	var resultObj = null;
	if( callObj.error )
		alert(callObj.errorDetail.string);
	else
	{
		if( jf_IsWebServiceSuccess(callObj) )
			resultObj = callObj.value;
	}
	
	var SectNameMem = SectComboBoxTextObj.value;

	//clear the ComboBox of Sect
	while(SectComboBoxObj.length > 0)
		SectComboBoxObj.remove(0);

	//add new data into the ComboBox of User
	len = resultObj.SectName.length;
	SectComboBoxObj.size = len > 0 ? (len + 1) : 2;
	SectComboBoxObj.options.add(new Option("",""));
	for( i=0 ; i<len ; i++ )
	{
		var objOption = new Option(resultObj.SectName[i], resultObj.SecNo[i])
		SectComboBoxObj.options.add(objOption);
	}

	//clear the data of ComboBox of User and reset it.
	SectComboBoxTextObj.value = "";
	SectComboBoxObj.selectedIndex = -1;
	for( i=0 ; i<len ; i++ )
	{
		if( SectNameMem == resultObj.SectName[i] || SectNameMem == resultObj.SecNo[i] )
		{
			SectComboBoxTextObj.value = resultObj.SectName[i];
			SectComboBoxObj.selectedIndex = i;
			break;
		}
	}

	var valUser = new Array(2);
	if(SectComboBoxObj.selectedIndex == -1)
		valUser[0] = DeptComboBoxObj.value;
	else
		valUser[0] = SectComboBoxObj.value;
	valUser[1] = false;

	//1050810	Joe		1050700		弱掃修正--S
	valUser[0] = encodeURI(valUser[0]);
	valUser[1] = encodeURI(valUser[1]);	
	//1050810	Joe		1050700		弱掃修正--E
	var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetAllUsers", false, valUser);
	
	resultObj = null;
	if( callObj.error )
		alert(callObj.errorDetail.string);
	else
	{
		if( jf_IsWebServiceSuccess(callObj) )
			resultObj = callObj.value;
	}
	
	var UserNameMem = UserComboBoxTextObj.value;

	//clear the ComboBox of User
	while(UserComboBoxObj.length > 0)
		UserComboBoxObj.remove(0);

	//add new data into the ComboBox of User
	len = resultObj.UserName.length;
	UserComboBoxObj.size = len > 0 ? (len + 1) : 2;
	UserComboBoxObj.options.add(new Option("",""));
	for( i=0 ; i<len ; i++ )
	{
		var objOption = new Option(resultObj.EmpName[i], resultObj.UserName[i])
		UserComboBoxObj.options.add(objOption);
	}

	//clear the data of ComboBox of User and reset it.
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
	return bRtnBool;
}

/**********************************************************************************************
  Name : function edjf_SectCheck()
  Desc : 離開二級單位欄位的合理性檢查與人員欄位的連動處理	[950355需求單] Charles 0950912
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
function edjf_SectCheck(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	var bRtnBool = false;
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	
	var i, j, len;
	if (SectComboBoxTextObj == null || SectComboBoxObj == null)
		return bRtnBool;

	for( i=0 ; i<SectComboBoxObj.options.length ; i++ )
	{
		if (SectComboBoxTextObj.value == SectComboBoxObj.options[i].text)
		{
			bRtnBool = true;
			break;
		}
	}
	if (!bRtnBool)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入單位不在選單當中"])),"");
		//1060803	Joe		1050087		因二代升級修正Focus寫法
		// SectComboBoxTextObj.focus();
		$('#' + SectComboBoxTextObj.id).focus();	
		SectComboBoxTextObj.select();
		return bRtnBool;
	}
	/*** END ***/
	
	if(DeptComboBoxTextObj.value == "")
	{
		while(SectComboBoxObj.length > 0)
			SectComboBoxObj.remove(0);
		SectComboBoxObj.size = 2;
		SectComboBoxObj.options.add(new Option("",""));
		SectComboBoxTextObj.value = "";
		while(UserComboBoxObj.length > 0)
			UserComboBoxObj.remove(0);
		UserComboBoxObj.size = 2;
		UserComboBoxObj.options.add(new Option("",""));
		UserComboBoxTextObj.value = "";
		return bRtnBool;
	}
	
	var valUser = new Array(2);
	if(SectComboBoxObj.value == "")
		valUser[0] = DeptComboBoxObj.value;
	else
		valUser[0] = SectComboBoxObj.value;
	valUser[1] = false;

	//1050810	Joe		1050700		弱掃修正--S
	valUser[0] = encodeURI(valUser[0]);
	valUser[1] = encodeURI(valUser[1]);	
	//1050810	Joe		1050700		弱掃修正--E
	var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetAllUsers", false, valUser);
	
	resultObj = null;
	if( callObj.error )
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
	else
	{
		if( jf_IsWebServiceSuccess(callObj) )
			resultObj = callObj.value;
	}

	var UserNameMem = UserComboBoxTextObj.value;

	//clear the ComboBox of User
	while(UserComboBoxObj.length > 0)
		UserComboBoxObj.remove(0);

	//add new data into the ComboBox of User
	len = resultObj.UserName.length;
	UserComboBoxObj.size = len > 0 ? (len + 1) : 2;
	UserComboBoxObj.options.add(new Option("",""));
	for( i=0 ; i<len ; i++ )
	{
		var objOption = new Option(resultObj.EmpName[i], resultObj.UserName[i])
		UserComboBoxObj.options.add(objOption);
	}

	//clear the data of ComboBox of User and reset it.
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
	return bRtnBool;
}

/**********************************************************************************************
  Name : function edjf_UserCheck()
  Desc : 離開人員欄位的合理性檢查	[950355需求單] Charles 0950912
  Parm : argUserComboBoxID      : string 人員Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
function edjf_UserCheck(argUserComboBoxID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	var bRtnBool = false;
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	
	if (UserComboBoxTextObj == null || UserComboBoxObj == null)
		return bRtnBool;

	for( i=0 ; i<UserComboBoxObj.options.length ; i++ )
	{
		if (UserComboBoxTextObj.value == UserComboBoxObj.options[i].text)
		{
			bRtnBool = true;
			break;
		}
	}
	if (!bRtnBool)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入人員不在選單當中"])),"");
		//1060803	Joe		1050087		因二代升級修正Focus寫法
		// UserComboBoxTextObj.focus();
		$('#' + UserComboBoxTextObj.id).focus();	
		UserComboBoxTextObj.select();
	}
	return bRtnBool;
	/*** END ***/
}

//[需求單000138] Charles 因應台科大新增EDT130等新程式須使用二層式架構，參考ODDEP之程式碼區塊 ↓ 0960109
/**********************************************************************************************
  Name : function edjf_ComboBoxCheck()
  Desc : 離開ComboBox欄位的合理性檢查，檢查輸入值是否存在於選單中
  Parm : argComboBoxID      : string Combobox 物件 ID
		 argKeyMsg			: string 錯誤時顯示的ComboBox名稱
  Rtn  : none
 **********************************************************************************************/
function edjf_ComboBoxCheck(argComboBoxID, argKeyMsg)
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
		//1060803	Joe		1050087		因二代升級修正Focus寫法
		// ComboBoxTextObj.focus();
		//1120524	Joe		序228		(Merge1070661)修正onblur檢核後不斷alert之問題
		// $('#' + ComboBoxTextObj.id).focus();	
		// ComboBoxTextObj.select();
	}
	return bRtnBool;
}

/**********************************************************************************************
  Name : function edjf_SetdlDept()
  Desc : 一級單位下拉式選單變動時，連動變動二級單位及人員下拉式選單
  Parm : argDeptComboBoxID      : string 一級單位Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function edjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
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

			var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetSubUnits", false, val);
			
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
			var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
			
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
//0981127 edjf_SetdlDept()多傳入一參數argDeptOnly，用來判斷承辦科別下拉選單是否顯示"(僅含一級單位)"的選項[0980578]-Jane
/**********************************************************************************************
  Name : function edjf_SetdlDept()
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
function edjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree, argDeptOnly)
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

			//0981127 呼叫的函式名稱錯誤修正[0980578]-Jane
			//var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetSubUnits", false, val);
			var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetSubUnit", false, val);
			
			var resultObj = null;
			if( jf_IsWebServiceSuccess(callObj) )
			{
					resultObj = callObj.value;
					//return;
			}
			
			var SectNameMem = SectComboBoxTextObj.value;

			//清空選項
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);

			//重新新增選項
			//0981127 變數名稱寫錯修正[0980578]-Jane
			//len = resultObj.SecName.length;
			len = resultObj.SectName.length;
			SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			SectComboBoxObj.options.add(new Option("",""));
			//0981127 檢核是否加入"(僅含一級單位)"的選項[0980578]-Jane
			if(len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
				SectComboBoxObj.options.add(new Option("(僅含一級單位)",""));
				
			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
				//0981127 變數名稱寫錯修正[0980578]-Jane
				//var objOption = new Option(resultObj.SecName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
				var objOption = new Option(resultObj.SectName[i], resultObj.SecNo[i]+":"+resultObj.SectName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SectName[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxTextObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				//0981127 變數名稱寫錯修正[0980578]-Jane
				//if( SectNameMem == resultObj.SecName[i] || SectNameMem == resultObj.SecNo[i] )
				if( SectNameMem == resultObj.SectName[i] || SectNameMem == resultObj.SecNo[i] )
				{
					//0981127 變數名稱寫錯修正[0980578]-Jane
					//SectComboBoxTextObj.value = resultObj.SecName[i];
					SectComboBoxTextObj.value = resultObj.SectName[i];
					//SectComboBoxObj.selectedIndex = i;
					//CLOUD 1010413 修正初始化combobox邏輯錯誤
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

			//1050810	Joe		1050700		弱掃修正--S
			valUser[0] = encodeURI(valUser[0]);
			valUser[1] = encodeURI(valUser[1]);	
			valUser[2] = encodeURI(valUser[2]);	
			//1050810	Joe		1050700		弱掃修正--E
			var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
			
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
					//CLOUD 1010413 修正初始化combobox邏輯錯誤
					UserComboBoxObj.selectedIndex = i+1;
					break;
				}
			}
		}
	}
}

/**********************************************************************************************
  Name : function edjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function edjf_SetdlSect(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
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

		//1050810	Joe		1050700		弱掃修正--S
		valUser[0] = encodeURI(valUser[0]);
		valUser[1] = encodeURI(valUser[1]);	
		valUser[2] = encodeURI(valUser[2]);	
		//1050810	Joe		1050700		弱掃修正--E
		callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
		
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
  Name : function edjf_SetdlUserByUnitCode()
  Desc : 設定人員下拉選單	Charles 0951020
  Parm : argDeptNo		        : string 單位代碼
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function edjf_SetdlUserByUnitCode(argDeptNo, argUserComboBoxID, argRoleNo, argSubTree)
{
	//取得Combo物件
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	
	if (UserComboBoxObj == null || UserComboBoxTextObj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["["+argUserComboBoxID+"]下拉選單不存在"])),"");
	}
	else
	{
		//單位代碼為空值，則將承辦人設定為無選項且顯示為空值
		if(argDeptNo == "" || argDeptNo == null || argDeptNo == "undefined")
		{
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
	
		var valUser = new Array(3);
		valUser[0] = argDeptNo;
		valUser[1] = argRoleNo;
		valUser[2] = argSubTree;

		var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
		
		var resultObj = null;
		if( jf_IsWebServiceSuccess(callObj) )
		{
				resultObj = callObj.value;
				//0970116 Matte  001683 MARKED
				//return;
		}
		else
			return;

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

//根據所指定的Text值，設定下拉選單物件的選擇
function edjf_SetDDLByText(argSelect, argText)
{
	for(var i = 0; i < argSelect.options.length; i++)
	{
		if(argSelect.options[i].text == argText)
		{
			argSelect.selectedIndex = i;
			break;
		}
	}
}

//根據所指定的Value值，設定下拉選單物件的選擇
//至於 argCompart, argIdx 兩參數意義分別為 下拉選單選項值以何分隔符號分隔, split之後以第幾個為比對標準
function edjf_SetDDLByValue(argSelect, argValue, argCompart, argIdx)
{
	var RtnValue = "";
	for(var i = 0; i < argSelect.options.length; i++)
	{
		if(argCompart != "")	//下拉選單之選項是許多值以分隔符號分隔組合而成
		{
			var tempArr = argSelect.options[i].value.split(argCompart);
			
			if(argIdx != "")	//有指定比對標的索引
			{
				if(tempArr[argIdx] == argValue)
				{
					argSelect.selectedIndex = i;
					break;
				}
			}
			else				//未指定比對標的索引
			{
				var bSetOK = false;
				for(var j = 0; j < tempArr.length; j++)
				{
					if(tempArr[j] == argValue)
					{
						argSelect.selectedIndex = i;
						bSetOK = true;
						break;
					}
				}
				if(bSetOK)
					break;
			}
		}
		else					//下拉選單之選項是單一值
		{
			if(argSelect.options[i].value == argValue)
			{
				argSelect.selectedIndex = i;
				break;
			}
		}
	}
	return RtnValue;
}

//取得下拉選單物件中，與指定Text相對應的值
function edjf_GetSelectValue(argSelect, argText)
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
function edjf_SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
		strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
	
	return strTemp.substr(0,strTemp.length-1);
}
//[需求單000138] Charles 因應台科大新增EDT130等新程式須使用二層式架構，參考ODDEP之程式碼區塊 ↑ 0960109
