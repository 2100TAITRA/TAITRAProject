 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2010.01.08	Albert	0980336	修正呼叫EA_LIB.asmx的GetUserInfo回傳物件並無ErrorClass屬性之錯誤
 * 2011.07.04	Davy	1000450	配合AK_LIB.GetUserInfo()修改，一併修改EA_LIB.GetUserInfo()
 * 2014.06.26	Eric	1030340	新增akjf_DeptCheck2函式供DROPDOWNLIST使用
 * 2015.05.29	Gabby	1040325	增加中興大學客製化報表，新增DropDownList用共用函式
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var SPLIT = "|";
function ProjectOnLoad()
{
}

//取消TextBox中enter的功能
function jf_HandleTextarea()
{
	if(event.keyCode==13)
		event.cancelBubble = true;
}

//日期onblur
function jf_CallCheckCDATE(argObj,errMsg)
{
	if (argObj.value != "")
	{
		if (argObj.value.length < 7)
			argObj.value = jf_PADL(argObj.value,7,'0');
		if (!jf_CheckCDATE(argObj.value))
		{
			jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([errMsg])),"");
			argObj.focus();
		}
	}
}

/**********************************************************************************************
 Begin : 新加 For EA71群組 #Andy
 **********************************************************************************************/
function jf_OpenSumDocWin(sUrl)
{
	SumDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height=550,Width=790,Top="+String((window.screen.height-600)/2)+",Left="+String((window.screen.width-800)/2)+",Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
	SumDocWin.focus();
}

function jf_OpenDetDocWin(sUrl)
{
	DetDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
	DetDocWin.focus();
}

function jf_OpenSumComWin(sUrl)
{
	SumComWin = open(sUrl,"SumComWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
	SumComWin.focus();
}

function jf_OpenDetComWin(sUrl)
{
	DetComWin = open(sUrl,"SumComWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
	DetComWin.focus();
}

function jf_OpenPDFWin(sUrl)
{
	PDFWin = open(sUrl,"PDFWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
	PDFWin.focus();
}

function jf_OpenTreeWin(sUrl)
{
	TreeWin = open(sUrl,"TreeWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
	TreeWin.focus();
}

/**********************************************************************************************
  Name : function akjf_DeptCheck()
  Desc : 離開部門欄位的合理性檢查與人員欄位的連動處理
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
function akjf_DeptCheck(argDeptComboBoxID, argUserComboBoxID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var i, j, len;
	var checkOK = false;
	for( i=0 ; i<DeptComboBoxObj.options.length ; i++ )
	{
		if( checkOK ) break;
		var arr = DeptComboBoxObj.options[i].value.split(":");
		for(j=3 ; j>=0 ; j--)
		{
			if( arr[j] == DeptComboBoxTextObj.value)
			{
				checkOK = true;
				DeptComboBoxObj.selectedIndex = i;
				break;
			}
		}
	}
	if( !checkOK )
	{
		alert("單位輸入錯誤");
		return;
	}
	/*** END ***/

	var val = DeptComboBoxObj.value;
	var arr = val.split(":");

	if( arr.length != 4 ) return;

	if( arr[2] == "" ) val = arr[0];
	else val = arr[2];

	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, val);

	var resultObj = null;
	if( callObj.error )
	{
		alert(callObj.errorDetail.string);
	}
	else
	{
		if( jf_IsWebServiceSuccess(callObj) )
			resultObj = callObj.value;
	}

	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	var UserNameMem = DeptComboBoxTextObj.value;

	//clear the ComboBox of User
	len = UserComboBoxObj.length;
	for( i=0 ; i<len ; i++ )
		UserComboBoxObj.remove(0);

	//add new data into the ComboBox of User
	len = resultObj.UserName.length;
	UserComboBoxObj.options.add(new Option("",""));
	for( i=0 ; i<len ; i++ )
	{
		var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i])
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
}
//2014.06.26  Eric	1030340	新增akjf_DeptCheck2函式供DROPDOWNLIST使用
function akjf_DeptCheck2(argDeptObjID, argUserObjID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	var DeptObj     = document.all[argDeptObjID];
	var i, j, len;
	var val = DeptObj.options[DeptObj.selectedIndex].value;
	var arr = val.split(":");

	if( arr.length != 4 ) return;

	if( arr[2] == "" ) val = arr[0];
	else val = arr[2];

	//0961213 Stella 改為呼叫AK_LIB的GetUnitAllUsers，將承辦人排序同ODDEP處理--start--
	var params = new Array(3);
	params[0] = val;
	params[1] = "";
	params[2] = true;
	
	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, val);
	//callObj = jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, val);
	//0961213 Stella 改為呼叫AK_LIB的GetUnitAllUsers，將承辦人排序同ODDEP處理--end--

	var resultObj = null;
	if( callObj.error )
	{
		alert(callObj.errorDetail.string);
	}
	else
	{
		if( jf_IsWebServiceSuccess(callObj) )
			resultObj = callObj.value;
	}

	var UserObj     = document.all[argUserObjID];
	var UserNameMem = DeptObj.options[DeptObj.selectedIndex].text;

	//clear
	len = UserObj.length;
	for( i=0 ; i<len ; i++ )
		UserObj.remove(0);

	//add new data
	len = resultObj.UserName.length;
	UserObj.options.add(new Option("",""));
	for( i=0 ; i<len ; i++ )
	{
		var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i])
		UserObj.options.add(objOption);
	}

	UserObj.selectedIndex = -1;
	for( i=0 ; i<len ; i++ )
	{
		if( UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i] )
		{
			UserObj.selectedIndex = i;
			break;
		}
	}

    
}

/**********************************************************************************************
  Name : function akjf_User2DeptHandle()
  Desc : 離開人員欄位的合理性檢查與部門欄位的連動處理
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
function akjf_User2DeptHandle(argDeptComboBoxID, argUserComboBoxID)
{   
	var UserNameInput = document.all[argUserComboBoxID + '_Text'].value;
	var match = false;
	var resultObj;
	
	if( UserNameInput == "" )
		return;

	for(i=1;i<document.all[argUserComboBoxID].options.length;i++)
	{
		if(UserNameInput == document.all[argUserComboBoxID].options[i].text)
		{
			document.all[argUserComboBoxID].selectedIndex = i;
			return;
		}
		else 
		{
			document.all[argUserComboBoxID].selectedIndex = -1;
		}
		
		if(UserNameInput == (document.all[argUserComboBoxID].options[i].value.split(":"))[2])
		{
			document.all[argUserComboBoxID].selectedIndex = i;
			return;
		}
		else 
		{
			document.all[argUserComboBoxID].selectedIndex = -1;
		}
	}
	//取得User的資訊
	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetUserInfo", false, UserNameInput);
	/*
	if( callObj.error )
	{
		//0990108 Albert 0980336 簡化錯誤訊息
		//alert(callObj.errorDetail.string);
		alert('人員不存在：'+UserNameInput);
		return;
	}*/
	//1000624 Davy [1000450] 配合AK_LIB修改
	if(jf_IsWebServiceSuccess(callObj))
		return;
	else
	{
		//0990108 Albert 0980336 回傳物件無ErrorClass
		//if(callObj.value.ErrorClass.IsErr)
		//{
		//	//2004-08-18修改 (人員不存在為歷史資料，不顯示錯誤)
		//	//alert(callObj.value.ErrorClass.ErrMessage[0].text);
		//	//document.all[argDeptComboBoxID + "_Text"].value = "";
		//	//document.all[argDeptComboBoxID].selectedIndex = -1;
		//	return;
		//}
		resultObj = callObj.value;
		match = true;
	}

	//User與Dept相符合時，將User的ComboBox的文字內容設為User名稱後，離開函式。
	var arr, DeptNo;
	if( match )
	{
		DeptNo = resultObj.EmpDeptNo;
		if( DeptNo == "" )//0940801 justin 若一級單位是空白才取二級單位
			DeptNo = resultObj.EmpSectNo;
		arr = document.all[argDeptComboBoxID].value.split(":");
		if( arr.length == 4 )
		{
			if( arr[2] == "" && DeptNo == arr[0] )
			{
				document.all[argUserComboBoxID + '_Text'].value = resultObj.EmpName;
				return;
			}
			if( arr[2] != "" && DeptNo == arr[2] )
			{
				document.all[argUserComboBoxID + '_Text'].value = resultObj.EmpName;
				return;
			}
		}
	}
	
	var i, len;
    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, DeptNo);
    if( callObj.error )
    {
		//0990108 Albert 0980336 簡化錯誤訊息
		//alert(callObj.errorDetail.string);
		alert('人員不存在：'+UserNameInput);
		UserNameInput.focus();
		return;
    }
    else
    {
		//0990108 Albert 0980336 回傳物件無ErrorClass
		//if(callObj.value.ErrorClass.IsErr)
		//{
		//	alert(callObj.value.ErrorClass.ErrMessage[0].text);
		//	return;
		//}
		resultObj = callObj.value;

		//clear the ComboBox of User
		len = document.all[argUserComboBoxID].length;
		for( i=0 ; i<len ; i++)
			document.all[argUserComboBoxID].remove(0);

		//add new data into the ComboBox of User
		len = resultObj.UserName.length;
		document.all[argUserComboBoxID].options.add(new Option("",""));
		for( var j=0 ; j<len ; j++ )
		{
			var objOption = new Option(resultObj.EmpName[j], resultObj.DeptNo[j] + ":" + resultObj.SectNo[j] + ":" + resultObj.UserName[j])
			document.all[argUserComboBoxID].options.add(objOption);
		}
		for( i=0 ; i<len ; i++)
		{
			if( UserNameInput == resultObj.UserName[i] || UserNameInput == resultObj.EmpName[i] )
			{
				document.all[argUserComboBoxID + "_Text"].value = resultObj.EmpName[i];
				document.all[argUserComboBoxID].selectedIndex = (i+1);//0940801 justin 由於多一空白
				break;
			}
		}

		var DeptStr = "";
		var DeptComboBoxObj = document.all[argDeptComboBoxID];
		var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];

		//clear the data of ComboBox of Dept and reset it.
		DeptComboBoxTextObj.value = "";
		DeptComboBoxObj.selectedIndex = -1;
		len = DeptComboBoxObj.options.length;
		for( i=0 ; i<len ; i++ )
		{
			DeptStr = DeptComboBoxObj.options[i].value;
			arr = DeptStr.split(":");
			if( arr[2] == "" && DeptNo == arr[0] )
			{
				DeptComboBoxTextObj.value = DeptComboBoxObj[i].text;
				DeptComboBoxObj.selectedIndex = i;
				break;
			}
			if( arr[2] != "" && DeptNo == arr[2] )
			{
				DeptComboBoxTextObj.value = DeptComboBoxObj[i].text;
				DeptComboBoxObj.selectedIndex = i;
				break;
			}
		}
	}
}

/**********************************************************************************************
  Name : function CheckFileNo(argYear,argCls,argCase,argVol,argSeq)
  Desc : 檢查檔號正確性(分類號有值，年度號不可空白....等等)
  Parm :	argYear     : string 年度號物件id
    	    argCls		: string 分類號物件id
    	    argCase		: string 案次號物件id
    	    argVol		: string 卷次號物件id
    	    argSeq		: string 目次號物件id
  Rtn  : bool
 **********************************************************************************************/	
function CheckFileNo(argYear,argCls,argCase,argVol,argSeq)
{
	var bRtnBool = false;
	var strYear="";
	var strCls="";
	var strCase="";
	var strVol="";
	var strSeq="";
	
	if (argYear != "")
		strYear = jf_Trim(document.all[argYear].value);
	if (argCls != "")
		strCls  = jf_Trim(document.all[argCls].value);
	if (argCase != "")
		strCase = jf_Trim(document.all[argCase].value);
	if (argVol != "")
		strVol  = jf_Trim(document.all[argVol].value);
	if (argSeq != "")
		strSeq  = jf_Trim(document.all[argSeq].value);

	if ( (strYear=="") && (strCls=="") && (strCase=="") && (strVol=="") && (strSeq=="") )
	{
		bRtnBool = true;
		return bRtnBool;
	}
	
	if (strSeq != "")
	{
		if (strVol == "")
			document.all[argVol].focus();
		else if (strCase == "")
			document.all[argCase].focus();
		else if (strCls == "")
			document.all[argCls].focus();
		else if (strYear == "")
			document.all[argYear].focus();
		else
			bRtnBool = true;
	}
	else if (strVol != "")
	{
		if (strCase == "")
			document.all[argCase].focus();
		else if (strCls == "")
			document.all[argCls].focus();
		else if (strYear == "")
			document.all[argYear].focus();
		else
			bRtnBool = true;
	}
	else if (strCase != "")
	{
		if (strCls == "")
			document.all[argCls].focus();
		else if (strYear == "")
			document.all[argYear].focus();
		else
			bRtnBool = true;
	}
	else if (strCls != "")
	{
		if (strYear == "")
			document.all[argYear].focus();
		else
			bRtnBool = true;
	}
	else if (strYear != "")
		bRtnBool = true;
	
	if (!bRtnBool)
		jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["檔號"])),"");
		
	return bRtnBool;
}

/**********************************************************************************************
 End : 新加 For EA71群組 #Andy
 **********************************************************************************************/
 
 //1040529 Gabby[1040325]新增DropDownList用共用函式
/**********************************************************************************************
  Name : function odjf_SetdlSectByUnitCode()
  Desc : 根據單位代碼初始承辦科別下拉選單
  Parm : argDeptNo		        : string 一級單位代碼
		 argSectDropDownListID	: string 二級單位DropDownList 物件 ID
		 argDeptOnly            : bool   承辦科別下拉選單是否顯示"(僅含一級單位)"的選項
		                          (true:顯示;false:不顯示)
  Rtn  : none
 **********************************************************************************************/
function eajf_SetdlSectByUnitCode(argDeptNo, argSectDropDownListID, argDeptOnly)
{
	//取得DropDownList物件
	var obj=document.all[argSectDropDownListID]
	
	if (obj == null || obj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["["+argSectDropDownListID+"]下拉選單不存在"])),"");
	}
	else
	{
			//單位代碼為空值，則將承辦科別設定為無選項且顯示為空值
		if(argDeptNo == "" || argDeptNo == null || argDeptNo == "undefined")
		{
			if (obj != null)
			{
				while(obj.length > 0)
					obj.remove(0);
				obj.options.add(new Option("",""));
			}
			return;
		}
	
		var val = argDeptNo;
		callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetSubUnit", false, val);
		
		var resultObj = null;
		if( callObj.error )
			alert(callObj.errorDetail.string);
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
		}

		//清空選項
		while(obj.length > 0)
			obj.remove(0);

		//重新新增選項
		len = resultObj.SecName.length;
		
		//檢核是否加入"(僅含一級單位)"的選項
		if(len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
		{
			obj.options.add(new Option("",""));
			obj.options.add(new Option("(僅含一級單位)",""));
		}
		else
			obj.options.add(new Option("",""));
		
		for( i=0 ; i<len ; i++ )
		{
			//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
			var objOption = new Option(resultObj.SecName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
			obj.options.add(objOption);
		}

		//清空顯示的Text，以及重設選擇
		obj.selectedIndex = -1;
	}
}
//1040529 Gabby[1040325]新增DropDownList用共用函式
/**********************************************************************************************
  二層式登記桌架構,將odjf_SetdlSect()新增一多載方式，多傳入一參數判斷承辦人選單是否適用新規則
 原規則：
 1.一級單位有值，二級單位為空：帶出該單位所有承辦人(包含一二級)
 2.一級單位有值，二級單位為其他二級單位：帶出該二級單位所有承辦人
 新規則：
 1.一級單位有值，二級單位為空：帶出該單位所有承辦人(包含一二級)
 2.一級單位有值，二級單位為(僅含一級單位)：帶出該單位承辦人(不包含二級)
 3.一級單位有值，二級單位為其他二級單位：帶出該二級單位所有承辦人
 
  Name : function odjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptDropDownListID      : string 部門Combobox 物件 ID
		 argSectDropDownListID		: string 二級單位Combobox 物件 ID
		 argUserDropDownListID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
		 argNewRow			: string 是否適用因連動規則
  Rtn  : none
 **********************************************************************************************/
function eajf_SetdlSect(argDeptDropDownListID, argSectDropDownListID, argUserDropDownListID, argRoleNo, argSubTree,argNewRow)
{
	//取得Combo物件
	var DeptDropDownListObj     = document.all[argDeptDropDownListID];
	var SectDropDownListObj     = document.all[argSectDropDownListID];
	var UserDropDownListObj     = document.all[argUserDropDownListID];
	
	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
	if(DeptDropDownListObj.selectedIndex==-1)
	{
		if (SectDropDownListObj != null)
		{
			while(SectDropDownListObj.length > 0)
				SectDropDownListObj.remove(0);
			SectDropDownListObj.options.add(new Option("",""));
		}
		if (UserDropDownListObj != null)
		{
			while(UserDropDownListObj.length > 0)
				UserDropDownListObj.remove(0);
			UserDropDownListObj.options.add(new Option("",""));
		}
		return;
	}
	
	if (UserDropDownListObj != null)
	{
		var valUser = new Array(3);
		//依新帶出規則判斷
		var DeptselectItem=DeptDropDownListObj.options[DeptDropDownListObj.selectedIndex];
		if(!argNewRow)
		{
			if(selectItem.value == "")
				valUser[0] = DeptselectItem.value.split(":")[0];
			else
				valUser[0] = DeptselectItem.value.split(":")[2];
			valUser[2] = argSubTree;
		}
		else
		{
			var SectselectItem="";
			if(SectDropDownListObj.selectedIndex!=-1 && SectDropDownListObj.selectedIndex!=0)
				SectselectItem=SectDropDownListObj.options[SectDropDownListObj.selectedIndex];
			if(SectDropDownListObj.selectedIndex==-1 || SectDropDownListObj.selectedIndex==0)//二級單位下拉選單為空
			{
				valUser[0] = DeptselectItem.value.split(":")[0];
				valUser[2] = true;
			}
			else if(SectselectItem.text != "" && SectselectItem.value == "")//二級單位為僅含一級單位
			{
				valUser[0] = DeptselectItem.value.split(":")[0];
				valUser[2] = argSubTree;
			}
			else//其他二級單位
			{
				valUser[0] = SectselectItem.value.split(":")[2];
				valUser[2] = argSubTree;
			}
		}
		valUser[1] = argRoleNo;

		callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetUnitAllUsers", false, valUser);
		
		resultObj = null;
		if( callObj.error )
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
		}

		//清空選項
		while(UserDropDownListObj.length > 0)
			UserDropDownListObj.remove(0);

		//重新新增選項
		len = resultObj.UserName.length;
		UserDropDownListObj.options.add(new Option("",""));
		for( i=0 ; i<len ; i++ )
		{
			//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
			UserDropDownListObj.options.add(objOption);
		}

		//清空顯示的Text，以及重設選擇
		UserDropDownListObj.selectedIndex = -1;

	}
}