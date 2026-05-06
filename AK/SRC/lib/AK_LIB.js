/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1040306  Cloud	Gabby	1040090		修正AKI800承辦人下拉式選單會出現空白問題 
 * 1050414  Leslie	Kenny	1050087		二代公文系統相關修改 
 * 1100623	Kevin	Joe		1100789		弱掃修正Client Potential Code Injection
 * 1101001	Kevin	Cloud	1100789		修正弱掃延伸問題
 * 1120215	Leslie	Zen		考試院序10	支援以離職人員查詢
 */
function ProjectOnLoad()
{
	//1050809	Leslie	二代修改，拿掉無用邏輯
	//jf_CallWS("LIB/AK_LIB.asmx","BubbleFun"  ,false,  null);
	//jf_CallWS("Template/LIB/SYS.asmx","BubbleFun"  ,false,  null);
}

/**********************************************************************************************
 檔管系統共用JavaScript 功能概述	
 改版時間: 
 **********************************************************************************************
 #-------------------------------------------------------- OII800 WebService
 jf_OII800Service 		呼叫OII800 WebService，以調閱單筆PDF電子檔
 onWSresult				呼叫OII800 WebService後，判斷是否成功，若成功則調閱單筆PDF電子檔；否則顯示錯誤訊息
 #-------------------------------------------------------- OII800 WebService


var gServiceID = 0;
/**********************************************************************************************
  Name : function jf_OII800Service(argUser, argWorkGrp, argDoc_no, argSource_orgno, argChkPriv)
  Desc : 呼叫OII800 WebService，以調閱單筆PDF電子檔
  Parm : argUser         : string 使用者代碼
		 argWorkGrp      : string 工作站群組編號
		 argDoc_no       : string 公文文號
		 argSource_orgno : string 公文原產生機關代碼
		 argChkPriv      : string 是否需檢查調閱權限 # 0:否 1:是
  Rtn  : none
 **********************************************************************************************/
function jf_OII800Service(argUser, argWorkGrp, argDoc_no, argSource_orgno, argChkPriv)
{   	
    service.useService("/OII800.asmx?WSDL","OII800");    
    gServiceID = service.OII800.callService("GetDocPdf", String(argUser), "", String(argWorkGrp), String(argDoc_no), String(argSource_orgno), String(argChkPriv));  
}

/**********************************************************************************************
  Name : function onWSresult()
  Desc : 呼叫OII800 WebService 後，判斷是否成功，若成功則調閱單筆PDF電子檔；否則顯示錯誤訊息
  Parm : none
  Rtn  : none
 **********************************************************************************************/	
function onWSresult()
{
    if((event.result.error) && (gServiceID==event.result.id))
    {
        var xfaultcode   = event.result.errorDetail.code;
        var xfaultstring = event.result.errorDetail.string;
        var xfaultsoap   = event.result.errorDetail.raw;
    }
    else if((!event.result.error) && (gServiceID == event.result.id))
    {
		var result = event.result.value;
        if (result.substring(0,1) == "0")
			jf_OpenPDFWin(result.substring(1,result.length),null,"fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes");
		else
		{
			if (result.substring(0,1) == "1" || result.substring(0,1) == "2")
				alert(result.substring(1,result.length));
			else
				alert(result);
		}
    }
    else
    {
        alert("Something else fired the event!");
    }
}

/**********************************************************************************************
  Name : function akjf_DeptCheck2()
  Desc : 離開部門欄位的合理性檢查與人員欄位的連動處理
  Parm : argDeptDDLID      : string 部門DropDownList 物件 ID
		 argUserDDLID      : string 人員DropDownList 物件 ID
  Rtn  : none
 **********************************************************************************************/
function akjf_DeptCheck2(argDeptObjID, argUserObjID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	var DeptObj     = document.all[argDeptObjID];
	var i, j, len;
	//1100623	Joe		1100789		弱掃修正Client Potential Code Injection
	// var val = DeptObj.options[DeptObj.selectedIndex].value;
	var val = encodeURI(DeptObj.options[DeptObj.selectedIndex].value);
	var arr = val.split(":");

	if( arr.length != 4 ) return;

	if( arr[2] == "" ) val = arr[0];
	else val = arr[2];

	//0961213 Stella 改為呼叫AK_LIB的GetUnitAllUsers，將承辦人排序同ODDEP處理--start--
	var params = new Array(3);
	params[0] = val;
	params[1] = "";
	params[2] = true;
	
	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, params);
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
  Name : function akjf_DeptCheck()
  Desc : 離開部門欄位的合理性檢查與人員欄位的連動處理
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
//1120215 Zen 考試院序10 支援以離職人員查詢
//function akjf_DeptCheck(argDeptComboBoxID, argUserComboBoxID)
function akjf_DeptCheck(argDeptComboBoxID, argUserComboBoxID, argHasLeaver)
{
	//1120215 Zen 考試院序10 支援以離職人員查詢
	if (argHasLeaver != true)
		argHasLeaver = false;

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
	/*
	if( !checkOK )
	{
		alert("單位輸入錯誤");
		return;
	}*/
	/*** END ***/

	var val = DeptComboBoxObj.value;
	var arr = val.split(":");

	if( arr.length != 4 ) return;

	if( arr[2] == "" ) val = arr[0];
	else val = arr[2];

	//0961213 Stella 改為呼叫AK_LIB的GetUnitAllUsers，將承辦人排序同ODDEP處理--start--
	//1120215 Zen 考試院序10 支援以離職人員查詢
	//var params = new Array(3);
	var params = new Array();
	params[0] = val;
	params[1] = "";
	params[2] = true;
	//1120215 Zen 考試院序10 支援以離職人員查詢
	if (argHasLeaver)
		params[3] = true;
	
	//callObj = jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, val);
	//1120215 Zen 考試院序10 支援以離職人員查詢
	if (argHasLeaver)
		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsersWithLeaver", false, params);
	else
		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, params);

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
		//1040306 Gabby[1040090]修正AKI800承辦人下拉式選單會出現空白問題
		if(resultObj.UserName[i] !="" && resultObj.EmpName[i]!="")
		{
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i])
			UserComboBoxObj.options.add(objOption);
		}
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
	
	//Leslie	0970866	設定UserComboBox長度
	if(UserComboBoxObj.options.length > 10)
		UserComboBoxObj.size = 10;
	else if(UserComboBoxObj.options.length ==1)
		UserComboBoxObj.size = 2;
	else
		UserComboBoxObj.size = UserComboBoxObj.options.length;

    
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
	//1100623	Joe		1100789		弱掃修正Client Potential Code Injection
	// var UserNameInput = document.all[argUserComboBoxID + '_Text'].value;
	//* 1101001	Kevin	Cloud	1100789		修正弱掃延伸問題
	//var UserNameInput = encodeURI(document.all[argUserComboBoxID + '_Text'].value);
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
	//* 1101001	Kevin	Cloud	1100789		修正弱掃延伸問題
	UserNameInput = encodeURI(UserNameInput);

	//取得User的資訊
	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUserInfo", false, UserNameInput);
	if( callObj.error )
	{
		alert(callObj.errorDetail.string);
	}
	else
	{
		if(callObj.value.ErrorClass.IsErr)
		{
			//2004-08-18修改 (人員不存在為歷史資料，不顯示錯誤)
			//alert(callObj.value.ErrorClass.ErrMessage[0].text);
			//document.all[argDeptComboBoxID + "_Text"].value = "";
			//document.all[argDeptComboBoxID].selectedIndex = -1;
			return;
		}
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

	//0961213 Stella 改為呼叫AK_LIB的GetUnitAllUsers，將承辦人排序同ODDEP處理--start--
	var params = new Array(3);
	params[0] = DeptNo;
	params[1] = "";
	params[2] = true;
	
	var i, len;
	//callObj = jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, DeptNo);
	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, params);
	//0961213 Stella 改為呼叫AK_LIB的GetUnitAllUsers，將承辦人排序同ODDEP處理--end--
   
    if( callObj.error )
    {
		alert(callObj.errorDetail.string);
    }
    else
    {
		if(callObj.value.ErrorClass.IsErr)
		{
			alert(callObj.value.ErrorClass.ErrMessage[0].text);
			return;
		}
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
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["檔號"])),"");
		
	return bRtnBool;
}

/**********************************************************************************************
  Name : function CheckFileNo(argYearS,argClsS,argCaseS,argVolS,argSeqS,argYearE,argClsE,argCaseE,argVolE,argSeqE)
  Desc : 檢查檔號一致性(當起訖值欄位均有輸入時，起值輸入欄位需與訖值輸入欄位一致)
  Parm :	argYearS    : string 年度號起值物件id
    	    argClsS		: string 分類號起值物件id
    	    argCaseS	: string 案次號起值物件id
    	    argVolS		: string 卷次號起值物件id
    	    argSeqS		: string 目次號起值物件id
        	argYearE    : string 年度號訖值物件id
    	    argClsE		: string 分類號訖值物件id
    	    argCaseE	: string 案次號訖值物件id
    	    argVolE		: string 卷次號訖值物件id
    	    argSeqE		: string 目次號訖值物件id
  Rtn  : bool
 **********************************************************************************************/	
function CheckFileNoMatch(argYearS,argClsS,argCaseS,argVolS,argSeqS,argYearE,argClsE,argCaseE,argVolE,argSeqE)
{
	var bRtnBool = true;
	var strYearS="";
	var strClsS="";
	var strCaseS="";
	var strVolS="";
	var strSeqS="";
	var strYearE="";
	var strClsE="";
	var strCaseE="";
	var strVolE="";
	var strSeqE="";

	if (argYearS != "")
		strYearS = jf_Trim(document.all[argYearS].value);
	if (argClsS != "")
		strClsS  = jf_Trim(document.all[argClsS].value);
	if (argCaseS != "")
		strCaseS = jf_Trim(document.all[argCaseS].value);
	if (argVolS != "")
		strVolS  = jf_Trim(document.all[argVolS].value);
	if (argSeqS != "")
		strSeqS  = jf_Trim(document.all[argSeqS].value);
	
	if (argYearE != "")
		strYearE = jf_Trim(document.all[argYearE].value);
	if (argClsE != "")
		strClsE  = jf_Trim(document.all[argClsE].value);
	if (argCaseE != "")
		strCaseE = jf_Trim(document.all[argCaseE].value);
	if (argVolE != "")
		strVolE  = jf_Trim(document.all[argVolE].value);
	if (argSeqE != "")
		strSeqE  = jf_Trim(document.all[argSeqE].value);

	if( (strYearS != "" || strClsS != "" || strCaseS != "" || strVolS != "" || strSeqS != "") 
	 && (strYearE != "" || strClsE != "" || strCaseE != "" || strVolE != "" || strSeqE != "") ) //起訖值均有欄位有輸入值
	{
		if(strYearS != "" && strYearE =="")
		{
			bRtnBool = false;
			document.all[argYearE].focus();
		}
		else if(strYearS == "" && strYearE !="")
		{
			bRtnBool = false;
			document.all[argYearS].focus();
		}
		else if(strClsS != "" && strClsE =="")
		{
			bRtnBool = false;
			document.all[argClsE].focus();
		}
		else if(strClsS == "" && strClsE !="")
		{
			bRtnBool = false;
			document.all[argClsS].focus();
		}
		else if(strCaseS != "" && strCaseE =="")
		{
			bRtnBool = false;
			document.all[argCaseE].focus();
		}
		else if(strCaseS == "" && strCaseE !="")
		{
			bRtnBool = false;
			document.all[argCaseS].focus();
		}
		else if(strVolS != "" && strVolE =="")
		{
			bRtnBool = false;
			document.all[argVolE].focus();
		}
		else if(strVolS == "" && strVolE !="")
		{
			bRtnBool = false;
			document.all[argVolS].focus();
		}
		else if(strSeqS != "" && strSeqE =="")
		{
			bRtnBool = false;
			document.all[argSeqE].focus();
		}
		else if(strSeqS == "" && strSeqE !="")
		{
			bRtnBool = false;
			document.all[argSeqE].focus();
		}
	}
		
	if (!bRtnBool)
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["檔號一致性"])),"");
		
	return bRtnBool;
}

/**********************************************************************************************
  Name : function jf_CallW(argService, argFunName, argAsync, argParam)
  Desc : 呼叫WebService API，及相關配套函式
  Parm :	argService		: string WebService位址
    	    argFunName		: string Function名稱
    	    argAsync		: bool   同步 or 非同步
    	    argParam		: Array  參數陣列
  Rtn  : CallID
 **********************************************************************************************/
//1050414	Kenny	[1050087]   二代公文系統相關修改，此部分MARK改使用Template--Start--
//function jf_CallW(argService, argFunName, argAsync, argParam)
//{
//	//Yvonne	0970826	0970817	在此先註冊EVENT觸發後要呼叫的function，避免使用useService後，EVENT已被觸發但未完成註冊EVENT觸發後要呼叫function的動作
//	if(gArServiceName.join(",").indexOf(argService.toUpperCase()) == -1)
//	{
//		gServiceAvailable = false;
//		gArServiceName.push(argService.toUpperCase());
//		service.onserviceavailable=function(){gServiceAvailable = true;o.StopWaiting();};
//		document.body.onunload=function(){gServiceAvailable = true;o.StopWaiting();};//0980105 Leo 0971032 避免離開頁面時while迴圈未停止
//	}
//	else
//		gServiceAvailable = true;
//	var callObj = new Object();
//    callObj.funcName = argFunName;      // Name of the remote function.
//    callObj.async = argAsync;         // A Boolean that specifies the type of call
//    callObj.timeout = 5;         // Timeout for the method call (seconds)
//    // SOAP header information
//    callObj.SOAPHeader = "<SOAP-ENV:Header>";
//    callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
//    callObj.SOAPHeader += 5;
//    callObj.SOAPHeader += "</t:Transaction>";
//    callObj.SOAPHeader += "</SOAP-ENV:Header>";  

//	//in order to avoid the service unavailable problem
//	//conver the service to uppercase cause the uppercase service is invoked
//	//when this page is onloaded, the 2nd invocation of this web service will success
//	argService = argService.toUpperCase();
//	if( document.all.service == null)
//		return;
//	if( document.all.SessionID == null )
//		return;
//    service.useService(argService+"?WSDL","Serv");
//    //無論同步或非同步，皆需等callback function OK之後再callservice
//    //if(!gServiceAvailable && !argAsync)
//    if(!gServiceAvailable)
//	{
//			while(!gServiceAvailable)
//				jf_Wait(1000);
//			return SetgServiceAvailableW(callObj,argAsync,argParam);
//    }
//    else
//		return SetgServiceAvailableW(callObj,argAsync,argParam);
//}
//1050414	Kenny	[1050087]   二代公文系統相關修改，此部分MARK改使用Template--End--

function SetgServiceAvailableW(callObj,argAsync,argParam)
{
	if(!service.Serv) return new ErrCallId(); //0980105 Leo 避免Webservice物件不存在的時候跳錯誤訊息。
	
	if (argParam == null)
       callID = service.Serv.callService(callObj);
    else if (argParam[0] == null)
       callID = service.Serv.callService(callObj ,
							argParam);
	else if (argParam.length ==1 )
       callID = service.Serv.callService(callObj ,
							argParam[0]);
	else if (argParam.length ==2 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1]);
	else if (argParam.length ==3 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2]);
	else if (argParam.length ==4 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3]);
	else if (argParam.length ==5 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4]);
	else if (argParam.length ==6 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6]);
	else if (argParam.length ==8 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8]);
	else if (argParam.length ==10 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9]);
	else if (argParam.length ==11 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10]);
	else if (argParam.length ==12 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11]);
	else if (argParam.length ==13 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12]);
	else if (argParam.length ==14 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13]);
	else if (argParam.length ==15 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14]);
	else if (argParam.length ==16 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14], argParam[15]);
	else if (argParam.length >16 )
	{
       callID.error = true;
       callID.errorDetail.string = "輸入參數超出預設陣列最大值16";
    }

	return callID;
}

function ErrCallId()
{
	var id = 0;
	var error = true;
	var errorDetail = new errDetail();	
}
function errDetail()
{
	var code = "Client";
	var string = "頁面重置";
	var row = null;
}

//程式暫停幾(毫)秒
function jf_Pause( argMilliseconds )
{
    //視窗於幾(毫)秒後關閉
    var sDialogScript = 'window.setTimeout( function () { window.close(); }, ' + argMilliseconds + ');';
    window.showModalDialog('javascript:document.writeln ("<script>' + sDialogScript + '<' + '/script>")');
}

//1020813 SKY [1020643] 由ED_LIB.js複製過來的function --start
//根據所指定的Text值，設定下拉選單物件的選擇
function akjf_SetDDLByText(argSelect, argText)
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
function akjf_SetDDLByValue(argSelect, argValue, argCompart, argIdx)
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
function akjf_GetSelectValue(argSelect, argText)
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
function akjf_SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
	{
		//1031022	Cloud	修改增加檢核空白不放入
		if(argSource.options[i].text!="" && argSource.options[i].value!="")
			strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
	}
	
	return strTemp.substr(0,strTemp.length-1);
}
/**********************************************************************************************
  Name : function akjf_SetdlDept()
  Desc : 一級單位下拉式選單變動時，連動變動二級單位及人員下拉式選單
  Parm : argDeptComboBoxID      : string 一級單位Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function akjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
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

			//1000808	Leslie	補修正錯誤的函式名稱
			//var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetSubUnits", false, val);
			//1031022	Cloud	修正呼叫錯誤位置
			//var callObj = jf_CallWS("../lib/AK_LIB.asmx", "GetSubUnit", false, val);
			var callObj = jf_CallWS("/lib/AK_LIB.asmx", "GetSubUnit", false, val);
			
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
					//1010412 Cloud   ------- 修正單位初始化承辦人INDEXT異常的錯誤
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
			//1031022	Cloud	修正呼叫錯誤位置
			//var callObj = jf_CallWS("../lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
			var callObj = jf_CallWS("/lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
			
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
					//UserComboBoxObj.selectedIndex = i+1;
					//1010412 Cloud   ------- 修正單位初始化承辦人INDEXT異常的錯誤
					UserComboBoxObj.selectedIndex = i+1;
					break;
				}
			}
		}
	}
}
//0981127 akjf_SetdlDept()多傳入一參數argDeptOnly，用來判斷承辦科別下拉選單是否顯示"(僅含一級單位)"的選項[0980578]-Jane
/**********************************************************************************************
  Name : function akjf_SetdlDept()
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
function akjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree, argDeptOnly)
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
			//1031022	Cloud	修正呼叫錯誤位置
			//var callObj = jf_CallWS("../lib/AK_LIB.asmx", "GetSubUnit", false, val);
			var callObj = jf_CallWS("/lib/AK_LIB.asmx", "GetSubUnit", false, val);
			
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
			//len = resultObj.SectName.length;
			len = resultObj.SecName.length;
			SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			SectComboBoxObj.options.add(new Option("",""));
			//0981127 檢核是否加入"(僅含一級單位)"的選項[0980578]-Jane
			if(len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
				SectComboBoxObj.options.add(new Option("(僅含一級單位)",""));
				
			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
				//0981127 變數名稱寫錯修正[0980578]-Jane
				//var objOption = new Option(resultObj.SectName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SectNo[i]+":"+resultObj.SecName[i])
				var objOption = new Option(resultObj.SecName[i], resultObj.SecNo[i]+":"+resultObj.SecName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxTextObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				//0981127 變數名稱寫錯修正[0980578]-Jane
				//if( SectNameMem == resultObj.SectName[i] || SectNameMem == resultObj.SectNo[i] )
				if( SectNameMem == resultObj.SecName[i] || SectNameMem == resultObj.SecNo[i] )
				{
					//0981127 變數名稱寫錯修正[0980578]-Jane
					//SectComboBoxTextObj.value = resultObj.SectName[i];
					SectComboBoxTextObj.value = resultObj.SecName[i];
					//SectComboBoxObj.selectedIndex = i;
					//1010412 Cloud   ------- 修正單位初始化承辦人INDEXT異常的錯誤
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
			//1031022	Cloud	修正呼叫錯誤位置
			//var callObj = jf_CallWS("../lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
			var callObj = jf_CallWS("/lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
			
			var resultObj = null;
			if( jf_IsWebServiceSuccess(callObj) )
			{
					resultObj = callObj.value;
					//return; 知道callObj.valueWEB資料正常之後應該把資料塞入UserComboBoxObj但如果return的話則會直接跳出函式,而不會做塞入資料的動作故把return mark掉 Hank 1000328 
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
					//1010412 Cloud   ------- 修正單位初始化承辦人INDEXT異常的錯誤
					UserComboBoxObj.selectedIndex = i+1;
					break;
				}
			}
		}
	}
}

/**********************************************************************************************
  Name : function akjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function akjf_SetdlSect(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
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
		//1031022	Cloud	修正呼叫錯誤位置
		//callObj = jf_CallWS("../lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
		callObj = jf_CallWS("/lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
		
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
  1000808	Leslie			由OD_LIB.js中複製此函式
  0980824	David	0980391	二層式登記桌架構,將odjf_SetdlSect()新增一多載方式
																多傳入一參數判斷承辦人選單是否適用新規則
 原規則：
 1.一級單位有值，二級單位為空：帶出該單位所有承辦人(包含一二級)
 2.一級單位有值，二級單位為其他二級單位：帶出該二級單位所有承辦人
 新規則：
 1.一級單位有值，二級單位為空：帶出該單位所有承辦人(包含一二級)
 2.一級單位有值，二級單位為(僅含一級單位)：帶出該單位承辦人(不包含二級)
 3.一級單位有值，二級單位為其他二級單位：帶出該二級單位所有承辦人
 
  Name : function akjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
		 argNewRow			: string 是否適用因連動規則
  Rtn  : none
 **********************************************************************************************/
function akjf_SetdlSect(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree,argNewRow)
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
		//0980824	David	0980391	依新帶出規則判斷
		if(!argNewRow)
		{
			if(SectComboBoxObj.value == "")
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else
				valUser[0] = SectComboBoxObj.value.split(":")[2];
			valUser[2] = argSubTree;
		}
		else
		{
			if(SectComboBoxTextObj.value == "" && SectComboBoxObj.value == "")//二級單位下拉選單為空
			{
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
				valUser[2] = true;
			}
			else if(SectComboBoxTextObj.value != "" && SectComboBoxObj.value == "")//二級單位為僅含一級單位
			{
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
				valUser[2] = argSubTree;
			}
			else//其他二級單位
			{
				valUser[0] = SectComboBoxObj.value.split(":")[2];
				valUser[2] = argSubTree;
			}
		}
		valUser[1] = argRoleNo;
		//1031022	Cloud	修正呼叫錯誤位置
		//callObj = jf_CallWS("../lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
		callObj = jf_CallWS("/lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
		
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

//1031106 Gabby [1030742] 增加設定科別DropDownList的共用函式
/**********************************************************************************************
  Name : function akjf_SetdlDept()
  Desc : 一級單位下拉式選單變動時，連動變動二級單位及人員下拉式選單
  Parm : argDeptComboBoxID      : string 一級單位代碼
		 argSectComboBoxID		: string 二級單位物件 ID
		 argSubTree				: string 是否包含次級單位
		 argDeptOnly            : string bool   承辦科別下拉選單是否顯示"(僅含一級單位)"的選項
		                          (true:顯示;false:不顯示)
  Rtn  : none
 **********************************************************************************************/
function akjf_SetdlDropDownListDept(argDeptID, argSectComboBoxID, argSubTree, argDeptOnly)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptID];
	var SectComboBoxObj     = document.all[argSectComboBoxID];	

	//如果一級單位目前所選為空值，則將二級單位及人員設定為無選項且顯示為空值
	if(argDeptID == "")
	{
		if (SectComboBoxObj != null)
		{
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);
			SectComboBoxObj.options.add(new Option("",""));
		}
		return;
	}
	
	if (SectComboBoxObj != null)
	{
		//承辦科別下拉選單不為隱藏才初始
		if(SectComboBoxObj.className != "hide")
		{
			var val = argDeptID;

			var callObj = jf_CallWS("/lib/AK_LIB.asmx", "GetSubUnit", false, val);
			
			var resultObj = null;
			if( jf_IsWebServiceSuccess(callObj) )
			{
					resultObj = callObj.value;
			}
			
			var SectNameMem = SectComboBoxObj.value;

			//清空選項
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.SecName.length;
			SectComboBoxObj.options.add(new Option("",""));

			if(len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
				SectComboBoxObj.options.add(new Option("(僅含一級單位)",""));
								
			for( i=0 ; i<len ; i++ )
			{
				var objOption = new Option(resultObj.SecName[i], resultObj.SecNo[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				
				if( SectNameMem == resultObj.SecName[i] || SectNameMem == resultObj.SecNo[i] )
				{
					
					SectComboBoxObj.value = resultObj.SecName[i];
					SectComboBoxObj.selectedIndex = i+1;
					break;
				}
			}	
		}
	}
}
//1120215   Cloud 銓敘部序31 增加函式for 建立承辦人選單
function akjf_DeptUser(argDeptObjID, argUserObjID) {
    var DeptObj = document.all[argDeptObjID];
    var i, j, len;
    var val = DeptObj.options[DeptObj.selectedIndex].value;
    var arr = val.split(":");
    var UserObj = document.all[argUserObjID];

    if (arr.length == 4) 
    {

        if (arr[2] == "") val = arr[0];
        else val = arr[2];
        //1120215 Cloud 增加判斷空值清空選單
        if (val == "") {
            if (UserObj != null) {
                while (UserObj.length > 0)
                    UserObj.remove(0);
                UserObj.options.add(new Option("", ""));
            }
            return;
        }
    }
    var params = new Array(3);
    params[0] = val;
    params[1] = "";
    params[2] = true;

    callObj = jf_CallWS("/lib/AK_LIB.asmx", "GetDeptAllUsers", false, val);
    
    var resultObj = null;
    if (callObj.error) {
        alert(callObj.errorDetail.string);
    }
    else {
        if (jf_IsWebServiceSuccess(callObj))
            resultObj = callObj.value;
    }

    
    var UserNameMem = DeptObj.options[DeptObj.selectedIndex].text;

    //clear
    len = UserObj.length;
    for (i = 0 ; i < len ; i++)
        UserObj.remove(0);

    //add new data
    len = resultObj.UserName.length;
    UserObj.options.add(new Option("", ""));
    for (i = 0 ; i < len ; i++) {
        var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i])
        UserObj.options.add(objOption);
    }

    UserObj.selectedIndex = -1;
    for (i = 0 ; i < len ; i++) {
        if (UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i]) {
            UserObj.selectedIndex = i;
            break;
        }
    }
}