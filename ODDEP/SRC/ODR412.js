/*
DATE	SA		PRG		MGR_NO		DESC
0960129	Stella	Stella	000337		多傳入網址參數artifact，以避免ODI260預覽時會發生錯誤
0960403	Caesar	Caesar	000562		提供催辦通知功能,開啟ODT220設定為scrollbar可出現
1031112	Leslie	Kevin_C	1020726		於__doPostBack前加上IsServerHandling=true,避免重複執行
1051128	Kevin	Joe		1050087 	二代系統升級
1080523 Kevin   Zen     1080403     修正開啟ODT220未傳入Artifact導致後續開啟子視窗異常之問題
1101012 Kevin   Joe  	1100330 	(Merge 1070671)修正ODR412查詢範圍權限
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
//1051128	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}

//1051128	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051128	Joe	1050087	二代系統升級
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	if(xObjectName.indexOf("btWrite")!=-1)
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

//1051128	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1051128	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckCondition();
			//1051128	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
			Page_BlockSubmit = !CheckCondition();
			//1051128	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	//1101012 Joe  1100330 (Merge 1070671)修正ODR412查詢範圍權限--S
	// document.all["H_Value"].value = document.all["dlDept_Text"].value;
	// document.all["H_Change"].value = "";
	document.all["H_Dept_Text"].value = document.all["dlDept_Text"].value;
	document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Text"].value);
	document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
	document.all["H_User_AllValue"].value = odjf_SaveCurrDL(document.all["dlUser"]);
	//1101012 Joe  1100330 (Merge 1070671)修正ODR412查詢範圍權限--E
	//1050720	Joe	1050087	二代系統升級--S
	// if (document.all["dg1"] == null)
		// document.all["dtHead"].className = "hide";
	// else
		// document.all["dtHead"].className = "";
	//1050720	Joe	1050087	二代系統升級--E
	ShowMsg();
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function dlDept_Onblur()
{
    //1101012 Joe  1100330 (Merge 1070671)修正ODR412查詢範圍權限
	var PriNo = document.all["H_Privilege"].value;
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		//1101012 Joe  1100330 (Merge 1070671)修正ODR412查詢範圍權限--S
		// if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
		if (document.all["dlDept_Text"].value != document.all["H_Dept_Text"].value)
		{
			/*
			document.all["H_Change"].value = document.all["dlDept_Text"].value;
		    //__doPostBack();//for .NET Framework 1.0
		    //1031112    Kevin_C[1020726]   IsServerHandling = true;放在__doPostBack下面無效，交換順序
			IsServerHandling = true;
		    //jf_ShowWaitState();
			__doPostBack("", "");//for .NET Framework 1.1
			*/
			
			//存ComboBox_Text的value
			document.all["H_Dept_Text"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Text"].value);
			if (PriNo == "0003")
				odjf_SetdlDept("dlDept","dlSect","dlUser","",bSubTree,true);
			else
			{	
			    //1070822 Kevin 1070671 修正ODR411查詢範圍權限 Start
			    if (document.all["H_Dept_Value"].value.split(':').length == 6)
					{
			        while (document.all["dlUser"].length > 0)
			            document.all["dlUser"].remove(0);
			        document.all["dlUser"].options.add(new Option("", ""));
						}
			    else if (document.all["H_Dept_Value"].value.split(':').length == 2)
						{
			        SetUser(document.all["H_Dept_Value"].value.split(':')[0], true);
						}
			    else if (document.all["H_Dept_Value"].value.split(':').length == 4)
								{
			        SetUser(document.all["H_Dept_Value"].value.split(':')[2], true);
				}
			}
			
			CheckUserNo = "";//清空已存在承辦人帳號，供下次連動時紀錄
			strBuf = "";
			
			document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
			document.all["H_User_AllValue"].value = odjf_SaveCurrDL(document.all["dlUser"]);
				
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
			//1101012 Joe  1100330 (Merge 1070671)修正ODR412查詢範圍權限--E
		}
		else{
			bCheckOK = false;
		}
	} 
}

function CheckCondition()
{
	var strDept = jf_Trim(document.all["dlDept_Text"].value);
	var strUser = jf_Trim(document.all["dlUser_Text"].value);
	var strSDate= jf_Trim(document.all["txSDate"].value);
	var strEDate= jf_Trim(document.all["txEDate"].value);
	var index   = document.all["dlProperty"].selectedIndex;
	var strProp = document.all["dlProperty"].options[index].text;
	var strSubject=jf_Trim(document.all["txFromSubject"].value);
	if (strDept+strUser+strSDate+strEDate+strSubject+strProp == "")
	{
		//1051128	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["dlDept_Text"].focus();
		$('#dlDept_Text').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少輸入一個條件"])),"");
		return false;
	}
	return true;
}

//展期申請
function DocExtend(argType, argDocNo, argUserId, argApplyDate, argSourceOrgNo)
{
	var strLocation = document.all["H_WSLocation"].value;
	var strUrl = "";
	
	if (strLocation != "")
	{
		strUrl = "http://" + strLocation;
	}
	strUrl += "ODT220.aspx?rtnObj=lbReturnValue";
	strUrl += "&argDocNo="+argDocNo;
	strUrl += "&applyDate=" + argApplyDate;
    //1080523 Zen 1080403 修正開啟ODT220未傳入Artifact導致後續開啟子視窗異常之問題
	strUrl += "&SAMLart=" + jf_GetArtifact();
	if (argType == "True")
	{
		strUrl += "&ACC="+argUserId;
		strUrl += "&SOURCE_ORGNO="+argSourceOrgNo;
	}
	//jf_OpenChildWin(strUrl, "ODT220", 760, 520 );
	var strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes,scrollbars=yes,height=600,width=945,left=50,top=50";
	jf_OpenWindow(strUrl, "ODT220", strWinStyle);
}

//檢視公文流程
function DocFlowInfo(argDocNo, argUserId, argSourceOrgNo)
{
	var strPage  = document.all["H_Url"].value;
	if (strPage == "")
	{
		strPage = "ODI260.aspx";
	}
	var strWidth = document.all["H_Width"].value;
	var strHeight= document.all["H_Height"].value;
	var strDocNo = argDocNo;
	var strArtifact = document.all["H_Artifact"].value;
	//0960129 Stella [000337]多傳入網址參數artifact，以避免ODI260預覽時會發生錯誤
	var strUrl = strPage + "?pDocNo=" + strDocNo + "&ACC=" + argUserId + "&SOURCE_ORGNO=" + argSourceOrgNo + "&SAMLart=" + strArtifact;
	jf_OpenChildWin(strUrl, "FlowPage", strWidth, strHeight );
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
function CheckCDATE(argObj,strMsg)
{
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
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1051128	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}

function DocWritePaper(argType,argDocNo,argUserId,argOrgNo)
{
	var strLocation = document.all["H_WSLocation"].value;
	var strUrl = "";
	
	if (strLocation != "")
	{
		strUrl = "http://" + strLocation;
	}
	strUrl += "ODT410Main.aspx?rtnObj=lbReturnValue";
	strUrl += "&argDocNo="+argDocNo;
	
	if(argType == "True")
	{
		strUrl += "&ACC="+argUserId;
		strUrl += "&SOURCE_ORGNO="+argOrgNo;
	}
	
	jf_OpenChildWin(strUrl, "", 760, 520 );
}

//1101012 Joe  1100330 (Merge 1070671)修正ODR412查詢範圍權限--S
var CheckUserNo = "";
var strBuf = "";
function SetUser(argUnitNo,argSetAllready)
{
	var valUser = new Array(3);
	valUser[0] = argUnitNo;
	valUser[1] = "";
	valUser[2] = false;
	
	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
	
	resultObj = null;
	if( callObj.error )
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
	else
	{
		if( jf_IsWebServiceSuccess(callObj) )
			resultObj = callObj.value;
	}
	
	var UserNameMem = document.all["dlUser_Text"].value;
	
	//清空選項
	if(argSetAllready)
	{
		while(document.all["dlUser"].length > 0)
			document.all["dlUser"].remove(0);
		document.all["dlUser"].options.add(new Option("",""));
	}
	
	//重新新增選項
	len = resultObj.UserName.length;
	
	for( i=0 ; i<len ; i++ )
	{
		if(CheckAdd(resultObj.UserName[i]))//檢查是否已加入
		{
			//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
			document.all["dlUser"].options.add(objOption);
			
			CheckUserNo += strBuf + resultObj.UserName[i];
			strBuf = ":";
		}
	}
	
	//清空顯示的Text，以及重設選擇
	document.all["dlUser_Text"].value = "";
	document.all["dlUser"].selectedIndex = -1;
	for( i=0 ; i<len ; i++ )
	{
		if( UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i] )
		{
			UserComboBoxTextObj.value = resultObj.EmpName[i];
			document.all["dlUser"].selectedIndex = i;
			break;
		}
	}
}

//檢查是否加入
function CheckAdd(argUserNo)
{
	if(argUserNo == "")
		return false;
	if(CheckUserNo == "")
		return true;
	if(CheckUserNo.indexOf(argUserNo) != -1)
		return false;
	return true;
}

function dlUser_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlUser_Text"].value != document.all["H_User_Text"].value)
	{
		//呼叫OD_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlUser", "承辦人"))
		{
			document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
			
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}
//1101012 Joe  1100330 (Merge 1070671)修正ODR412查詢範圍權限--E
