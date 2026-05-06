/*
DATE 	SA		PRG		MGR_NO	DESC
0951025	Stella	Charles	955091	二層式架構修改
0980824	Stella	David	0980391	二級單位選單增加(僅含一級單位)選項
1010731	Kevin	Jagle	1010783	點選展期進入ODT220再點選流程資訊會跳出無權杖錯誤
1010808	Kevin	Jagle	1010789	新增查詢超過原始限辦日期○天以上功能、匯出EXCEL功能
1031112	Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1050308	David	David	1050087	二代公文修改
1070720 David   Zen     1070661 修正onblur檢核後不斷alert之問題
1080120 Kevin   Zen     1090003 修正查詢前承辦人欄位被清空導致結果不符預期之問題
1110127	Kevin   Joe		1110011	增加Client端日期顯示處理
1111101	Kevin   Joe		--		新增ODR240~242判斷不顯示OD17
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050308 David 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050308 David 1050087 二代公文修改
	/*if (document.all["ValidationSummary1"].innerText != "")
		alert(document.all["ValidationSummary1"].innerText);*/
	jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		//1050308 David 1050087 二代公文修改，刪除小日曆處理
		/*case "btSDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
			break;
		case "btEDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
			break;*/
	}	
}

//1050308 David 1050087 二代公文修改
//function jf_ToolBarHandle()
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

	//1050308 David 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	//1010808	Jagle	[1010789]	增加檢核輸入的查詢條件
	var bCheck = jf_CheckCondition();
	if(bCheck == true)
	{
		switch (xObjectName)
		{
			case "btSearch":
				if(jf_CheckBeforeSearch())	//[需求單955091] 查詢前檢查 Charles 0951025
					Page_BlockSubmit = false;
				else
					Page_BlockSubmit = true;
				//1050308 David 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
				break;
			case "btPrint":
			case "btPreview":
				Page_BlockSubmit = !CheckBeforPrint();
				//1050308 David 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
				break;
			//1010808	Jagle	[1010789]	增加匯出EXCEL功能
			case "btExcel":
				Page_BlockSubmit = !CheckBeforPrint();
				//1050308 David 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
				break;
		}
	}
    //1070720 Zen 1070661 修正onblur檢核後不斷alert之問題，Bug修正
    else
	    Page_BlockSubmit = true;
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	/*document.all["H_Value"].value = document.all["dlDept_Text"].value;
	document.all["H_Change"].value = "";
	if (document.all["dg1"] == null)
		document.all["dtHead"].className = "hide";
	else
		document.all["dtHead"].className = "";*/
	ShowMsg();

	//1050308 David 1050087 二代公文修改
	//jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);

	//[需求單955091] 初始時先儲存下拉式選單的Text、Value、所有選項Value Charles 0951025
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
}

function OnWSResult(argResult)
{}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050308 David 1050087 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
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

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = true;
	//[需求單955091] 預覽列印前檢查 Charles 0951025
	if(!jf_CheckBeforeSearch())
		bRtnbool = false;
	return bRtnbool;
}

function dlDept_Onblur()
{
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
		{
			document.all["H_Change"].value = document.all["dlDept_Text"].value;
		    //__doPostBack();//for .NET Framework 1.0
		    //1031112    Kevin_C[1020726]   IsServerHandling = true;放在__doPostBack下面無效，交換順序
			IsServerHandling = true;
			jf_ShowWaitState();
			__doPostBack("","");//for .NET Framework 1.1
		}
	} 
}

function DocFlowInfo(argDocNo)
{
	var strPage  = document.all["H_Url"].value;
	var strWidth = document.all["H_Width"].value;
	var strHeight= document.all["H_Height"].value;
	var strDocNo = argDocNo;
	var strArtifact = document.all["H_Artifact"].value;
	//Zoey [000297, 96/04/02]
	if(document.all.H_SourceOrgNo!=null)
		var strSource = "&SOURCE_ORGNO="+document.all.H_SourceOrgNo.value;
	else
		var strSource = "";
	
	var strUrl = strPage + "?pDocNo=" + strDocNo + "&SAMLart=" + strArtifact+strSource;
	jf_OpenChildWin(strUrl, "FlowPage", strWidth, strHeight );
}

function fnOpenApply(argDocNo)
{
	//1010731	Jagle	[1010783]	增加傳入權杖
	var strArtifact = document.all["H_Artifact"].value;
	var strSysDate = document.all["H_Date"].value;
	var strUrl = "";
	//1010731	Jagle	[1010783]	增加傳入權杖
	//strUrl = "ODT220.aspx?rtnObj=lbReturnValue&argDocNo="+argDocNo+"&applyDate="+strSysDate;
	strUrl = "ODT220.aspx?rtnObj=lbReturnValue&argDocNo="+argDocNo+"&applyDate="+strSysDate+ "&SAMLart=" + strArtifact;
	jf_OpenChildWin(strUrl, "ODT220", 760, 520 );
}

//[需求單955091] 下拉選單onblur時的檢查 Charles 0951025 ↓
function dlDept_Text_onblur()
{
	var bCheckOK = true;
    //1070720 Zen 1070661 修正onblur檢核後不斷alert之問題
    //1080120 Zen 1090003 修正查詢前承辦人欄位被清空導致結果不符預期之問題
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
			
			//0980824	David	0980391	二級單位選單增加(僅含一級單位)選項
			//odjf_SetdlDept("dlDept","dlSect","dlUser","",bSubTree);
			//1111101	Joe		--		新增ODR240~242判斷不顯示OD17
			// odjf_SetdlDept("dlDept","dlSect","dlUser","",bSubTree,true);	//初始dlSect、dlUser的處理
			odjf_SetdlDeptWithoutOD17("dlDept","dlSect","dlUser","",bSubTree,true);	//初始dlSect、dlUser的處理

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
    //1070720 Zen 1070661 修正onblur檢核後不斷alert之問題
    //1080120 Zen 1090003 修正查詢前承辦人欄位被清空導致結果不符預期之問題
    if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			
			//0980824	David	0980391	配合二級單位選單增加選項，初始承辦人選單配合修改
			//odjf_SetdlSect("dlDept","dlSect","dlUser","",false);	
			//1111101	Joe		--		新增ODR240~242判斷不顯示OD17
			// odjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);//初始化承辦人選單
			odjf_SetdlSectWithoutOD17("dlDept","dlSect","dlUser","",false,true);//初始化承辦人選單
				
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
    //1070720 Zen 1070661 修正onblur檢核後不斷alert之問題
    //1080120 Zen 1090003 修正查詢前承辦人欄位被清空導致結果不符預期之問題
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
	return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
	{
		//1050308 David 1050087 二代公文修改
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
		document.all[argComboxID+"_Container"].className = "custom-combobox";
	}
}

//[需求單955091] 查詢前檢查 Charles 0951025
function jf_CheckBeforeSearch()
{
	//1110127	Joe		1110011		增加Client端日期顯示處理--S
	var strS = jf_Trim(document.all.txSDate.value);
	var strE = jf_Trim(document.all.txEDate.value);
	if(strS != "" && strE == "")
		document.all.txEDate.value = strS;
	else if(strS == "" && strE != "")
		document.all.txSDate.value = strE;
	else if(strS > strE)
	{
		document.all.txSDate.value = strE;
		document.all.txEDate.value = strS;
	}
	//1110127	Joe		1110011		增加Client端日期顯示處理--E
	
	if(!dlDept_Text_onblur(true))
		return false;

	if(!dlSect_Text_onblur(true))
		return false;

	if(!dlUser_Text_onblur(true))
		return false;

    return true;
}
//[需求單955091] 下拉選單檢查 Charles 0951025 ↑

//1010808	Jagle	[1010789]	若僅輸入天數條件(逾期天數、逾原限辦日數)，提出警告、未輸入任何條件提出警告
function jf_CheckCondition()
{
	var bRes = true;
	var strSDoc = document.all["txSDoc"].value;//文號起
	var strEDoc = document.all["txEDoc"].value;//文號迄
	var strDept = document.all["dlDept"].value;//一級單位
	var strSect = document.all["dlSect"].value;//二級單位
	var strUser = document.all["dlUser"].value;//承辦人
	var strSDate = document.all["txSDate"].value;//日期起
	var strEDate = document.all["txEDate"].value;//日期迄
	var strProperty = document.all["dlProperty"].value;//公文性質
	var strSubject = document.all["txFromSubject"].value;//主旨
	var strCount = document.all["txCount"].value;//逾期天數
	var strPDue = document.all["txCountPDue"].value;//逾原限辦日
	var strCondition = strSDoc + strEDoc + strDept + strSect + strUser + strSDate + strEDate + strProperty + strSubject;

	if(strCondition == "" && strCount =="" && strPDue == "")
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["請至少輸入一項條件。"]) ), "" );
		bRes = false;
		return bRes;
	}
	if(strCondition == "" && (strCount !="" || strPDue != ""))
	{
		bRes = confirm("若僅輸入天數條件，搜尋時間較長，使否繼續？");
		return bRes;
	}
	
	return bRes;
}

//1070720 Zen 1070661 修正onblur檢核後不斷alert之問題，Bug修正
function CheckCDATE(argObj, strMsg)
{
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1050720	Joe	1050087	二代系統升級，調整focus寫法
            //document.all[argObj].focus();
            $('#' + argObj).focus();
        }
    }
}