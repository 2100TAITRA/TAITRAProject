/*
DATE 	SA		PRG		MGR_NO	DESC
0951024	Stella	Charles	955091	二層式架構修改
0980824	Stella	David	0980391	二級單位選單增加(僅含一級單位)選項
0990819			Johnny	0990402 新增excel匯出 (CDC需求單)
1031112	Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1050307	David	Kenny	1050087 二代公文系統相關修改
1090519	Kevin	Joe		1090222	新增影像開啟功能
1100629	Kevin	Joe		1100632	高大新增Uniview開啟
1110127	Kevin   Joe		1110011	增加Client端日期顯示處理
1111101	Kevin   Joe		--		新增ODR240~242判斷不顯示OD17
1140801	Zen		Zen		1140922	線上瀏覽功能調整為不可編輯模式
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050307	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050307	Kenny	[1050087]   二代公文系統相關修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

//1050307	Kenny	[1050087]   二代公文系統相關修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1050307	Kenny	[1050087]   二代公文系統相關修改
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
		//1050307	Kenny	[1050087]   二代公文系統相關修改，以JQueryUI取代
		//case "btSDate":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
		//	break;
		//case "btEDate":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
		//	break;
	}
}

//1050307	Kenny	[1050087]   二代公文系統相關修改
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
	
	//1050307	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			if (document.all.dg1)
			{
				document.all.dg1.outerHTML = "";
			}
			Page_BlockSubmit = !CheckCondition();
			//1050307	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
		//0990819 新增excel匯出 (CDC需求單) [0990402]-Johnny
		case "btExcel":
			if (document.all.dg1)
			{
				document.all.dg1.outerHTML = "";
			}
			Page_BlockSubmit = !CheckCondition();
			//1050307	Kenny	[1050087]   二代公文系統相關修改
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
	/*document.all["H_Value"].value = document.all["dlDept_Text"].value;
	document.all["H_Change"].value = "";
	if (document.all["dg1"] == null)
		document.all["dtHead"].className = "hide";
	else
		document.all["dtHead"].className = "";*/
	ShowMsg();
	
    //1040307   Kenny   取消無用Code
	//jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);
	//[需求單955091] 初始時先儲存下拉式選單的Text、Value、所有選項Value Charles 0951024
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_User"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
	document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
	
	//ZOEY [955194, 95/11/22]
	if(document.all["rb3"].checked !=true)
	{
	  if(document.all["rbfile1"]!=null)
	  {
		document.all["rbfile1"].disabled=true;
		document.all["rbfile2"].disabled=true;
		document.all["rbfile3"].disabled=true;
	   }
	}
	
	//無值不顯示
	jf_HandleComboxStatus("dlSect");
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
	//1050307	Kenny	[1050087]   二代公文系統相關修改
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
			__doPostBack("", "");//for .NET Framework 1.1
		}
	} 
}

function CheckCondition()
{
	var strSDoc		= jf_Trim(document.all["txSDoc"].value);
	var strEDoc		= jf_Trim(document.all["txEDoc"].value);
	var strDept		= jf_Trim(document.all["dlDept_Text"].value);
	var strUser		= jf_Trim(document.all["dlUser_Text"].value);
	var strSDate	= jf_Trim(document.all["txSDate"].value);
	var strEDate	= jf_Trim(document.all["txEDate"].value);
	var index		= document.all["dlProperty"].selectedIndex;
	var strProp		= document.all["dlProperty"].options[index].text;
	var strSubject	= jf_Trim(document.all["txFromSubject"].value);
	if (strSDoc+strEDoc+strDept+strUser+strSDate+strEDate+strSubject+strProp == "")
	{
		//1050307	Kenny	[1050087]   二代公文系統相關修改
		//document.all["dlDept_Text"].focus();
		$('#dlDept_Text').focus()
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請至少輸入一個條件"])),"");
		return false;
	}
	
	// 0950407 Charles [收創文日起迄]欄位在[文號起迄]欄位有值時為非必要欄位，因此再加上一層判斷
	if (strSDoc+strEDoc == "")
	{
		if(strSDate+strEDate == "")
		{
			//1050307	Kenny	[1050087]   二代公文系統相關修改
			//document.all["txSDate"].focus();
			$('#txSDate').focus()
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請至少輸入一個日期條件"])),"");
			return false;
		}	
		else
		{
			// 0950407 Charles [收創文日起迄]欄位有值時才判斷日期合理性
			if (!CheckCDATE("txSDate", "日期欄位(起)") || !CheckCDATE("txEDate", "日期欄位(訖)"))
				return false;
		}
	}
	
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
	
	//[需求單955091] 下拉式選單檢查 Charles 0951024
	if(!jf_CheckBeforeSearch())
		return false;
		
	return true;
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

//[需求單955091] 下拉選單onblur時的檢查 Charles 0951024 ↓
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
			//odjf_SetdlSect("dlDept","dlSect","dlUser","",false);	//初始化承辦人選單
			//1111101	Joe		--		新增ODR240~242判斷不顯示OD17
			// odjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);
			odjf_SetdlSectWithoutOD17("dlDept","dlSect","dlUser","",false,true);
							
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
	return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
	    //1050307	Kenny	[1050087]   二代公文系統相關修改
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
		document.all[argComboxID+"_Container"].className = "custom-combobox";
}

//[需求單955091] 查詢前檢查 Charles 0951024
function jf_CheckBeforeSearch()
{
	if(!dlDept_Text_onblur(true))
		return false;

	if(!dlSect_Text_onblur(true))
		return false;

	if(!dlUser_Text_onblur(true))
		return false;

    return true;
}
//[需求單955091] 下拉選單檢查 Charles 0951024 ↑

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
function rb3_onClick()
{
	document.all["rbfile1"].disabled=false;
	document.all["rbfile2"].disabled=false;
	document.all["rbfile3"].disabled=false;
    //1050307   Kenny   [1050087]   一併修正辦畢否由全部切換為已半畢，歸檔否選項沒有預設值問題
    document.all["rbfile3"].checked=true;
}
function rb1_onClick()
{
	document.all["rbfile1"].disabled=true;
	document.all["rbfile2"].disabled=true;
	document.all["rbfile3"].disabled=true;
}

//記錄是否已檢核過有註冊onblur事件的欄位的值(通常發生在輸入完後直接按下儲存件時)
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
			//1050307	Kenny	[1050087]   二代公文系統相關修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}

//1090519	Joe		1090222		新增影像開啟功能--S
function btDocViewOnClick(argArt, argDocNo, argOrgNo, argSignType) {
	try {
		//1100629	Joe		1100632		高大新增Uniview開啟--S
		if(document.all.H_UNIVIEW_MODE.value == "U"){
			var wsUrl = opener.theWebServices.url('fileiows');
			var param = [];
			param[0] = argArt;
			param[1] = argDocNo;
			param[2] = argOrgNo;

			var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
			if (!rtnObj.error) {
				if (rtnObj.value.m_bSuccess) {
					var sUnvObj = rtnObj.value.RtnStr;
					if (sUnvObj !== "") {
						var UnvObj = JSON.parse(sUnvObj);
						var objViewDoc = {
							UNVObj: UnvObj,
							docInfoPage: "AKI802",
							openDocModule: argSignType == "E" ? "AOL" : "UniView",
							signType: argSignType,
							readOnlyMode: true
						};
						var $docId = jf_GetSessionID() + "_" + (+new Date());
						localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
						var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
						jf_OpenChildWin(unvUrl, "ODR240ViewDoc");
					}
				}
				else{
					alert(rtnObj.value.m_strErrMsg);
				}
			}
			else{
				alert(rtnObj.error.errorDetail.string)
			}
		}
		else if(document.all.H_UNIVIEW_MODE.value == "A"){
		//1100629	Joe		1100632		高大新增Uniview開啟--E
			var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
			unvSrc = unvSrc.replace('#artifact#',argArt);
			unvSrc = unvSrc.replace('#DocNo#',argDocNo);
			unvSrc = unvSrc.replace(/#SourceOrgNo#/g,argOrgNo);
			
			var objViewDoc = {
				UNVObj: JSON.parse(unvSrc),
				docInfoPage: "AKI802",
				openDocModule: 'AOL',
				signType: argSignType,
				//1140801 Zen 1140922 線上瀏覽功能調整為不可編輯模式
				//readOnlyMode: false,
				readOnlyMode: true,
				disableSave: true
			};
			var $docId = jf_GetSessionID() + "_" + (+new Date());
			localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
			var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
			jf_OpenChildWin(unvUrl, "ODR240ViewDoc");
		}
	} catch (e) {
		alert('開啟失敗');
	}
}
//1090519	Joe		1090222		新增影像開啟功能--E