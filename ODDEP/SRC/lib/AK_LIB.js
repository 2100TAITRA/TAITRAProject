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
		//if(DeptComboBoxObj.options[i].value == "") continue;
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

	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, val);

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
			alert(callObj.value.ErrorClass.ErrMessage[0].text);
			document.all[argDeptComboBoxID + "_Text"].value = "";
			document.all[argDeptComboBoxID].selectedIndex = -1;
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
		if( resultObj.EmpSectNo != "" )
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
    callObj = jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, DeptNo);
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
		len = resultObj.UserName.length;;
		document.all[argUserComboBoxID].options.add(new Option("",""));
		for( var j=0 ; j<len ; j++ )
		{
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i])
			document.all[argUserComboBoxID].options.add(objOption);
		}
		for( i=0 ; i<len ; i++)
		{
			if( UserNameInput == resultObj.UserName[i] || UserNameInput == resultObj.EmpName[i] )
			{
				document.all[argUserComboBoxID + "_Text"].value = resultObj.EmpName[i];
				document.all[argUserComboBoxID].selectedIndex = i;
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
		strYear = document.all[argYear].value;
	if (argCls != "")
		strCls  = document.all[argCls].value;
	if (argCase != "")
		strCase = document.all[argCase].value;
	if (argVol != "")
		strVol  = document.all[argVol].value;
	if (argSeq != "")
		strSeq  = document.all[argSeq].value;
	
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

