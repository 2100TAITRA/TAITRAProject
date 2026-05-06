/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		SA			PG			單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1000825	 David	      Kevin 	   1000713	 新增非發文郵件登錄作業
 * 1040422	 David		  Eric		   1040257	 修正儲存功能無作用的問題
 * 1070830   Kevin        Justin       1070678   弱掃AJAX修改
 * 1110103	Kevin		Zen			1101292     修正多次點擊重複PostBack之問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060818	Kevin_C	1050087	升二代
//if(document.all.tbTool)
	//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1070830 Justin [1070678]弱掃AJAX修改
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060818	Kevin_C	1050087	升二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);

	//無值不顯示
	jf_HandleComboxStatus("dlSect");
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
function ClientButtonControl(event)
{
	// var xObjectName = document.activeElement.id;
	var xObjectName = event.target.id;
	var strSearchValue;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		//1060818	Kevin_C	1050087	升二代
		// case "btSendDate":
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all["txSendDate"], event.screenX, event.screenY);
			// break;
		case "btOrgHelp":
			Page_BlockSubmit=true;
			
			if(jf_Trim(document.all["txOrgId"].value)!="")
				strSearchValue = document.all["txOrgId"].value
			else
				strSearchValue = document.all["txOrgName"].value;
				
			strUrl = "../../../WEDEP/WEM010C1.aspx?OrgID="+document.all.H_OrgNo.value+"&K1=Dlg_Dept&Search="+strSearchValue;
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			break;
		
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060818	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1060818	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			Page_BlockSubmit = !jfCheckOuId();
			//1060818	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1060818	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060818	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060818	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			var strOuId   = document.all["H_OuIdInit"].value;
			var strDept = "";
			var strSect = "";
			var strUser = "";
			
			if(strOuId!="92")
			{
				strDept = document.all["dlDept_Text"].value;
				if(strOuId.lenth=="3")
					strSect = document.all["dlSect_Text"].value;
			}
			
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			
			dlDept_Text_onblur();
			
			if(strOuId!="92")
			{
				document.all["dlDept_Text"].value = strDept;
				if(strOuId.lenth=="3")
					document.all["dlSect_Text"].value = strSect;
			}
			else
				document.all["dlSect"].options.length = 0;

			//1060818	Kevin_C	1050087	升二代
			//document.all["txSeqNo"].focus();			
			$('#txSeqNo').focus();			
			document.all["H_OuIdInit"].value = strOuId;
			
			ClientOnLoad();
			break;
		case "btSearch":
			var strUrl = "EDI520.aspx";
			jf_OpenChildWin(strUrl, "EDI520", 840, 500 );
			//1060818	Kevin_C	1050087	升二代
			Page_BlockSubmit = true;
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060818	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060818	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if(!CheckCDATE("txSendDate","郵寄日期"))
		return false;
	
	var strName = new Array("日期"      , "時間"      , "承辦單位"   , "內容物"   , "受文者名稱", "郵遞區號", "地址" );
	var strID   = new Array("txSendDate", "txSendTime", "dlDept_Text", "txContent", "txOrgName" , "txCode"  , "txAdd");
	
	var strDlName = new Array("國別"         , "郵寄地區"  , "郵寄大類" , "郵寄小類"    );
	var strDlID   = new Array("dlCountryType", "dlRegionNo", "dlClassNo", "dlSubclassNo");
			
	for(var i = 0; i < strName.length; i++)
	{
		strErrMsg += jf_CheckRequireFld(strName[i],strID[i],strErrMsg)
	}
	
	for(var i = 0; i < strDlName.length; i++)
	{
		strErrMsg += jf_CheckRequireDlFld(strDlName[i],strDlID[i],strErrMsg)
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	//dlSubNo值ASP無法直接抓取，因此透過H_SubNo
	document.all["H_SubNo"].value =jf_GetDLValue(document.all["dlSubclassNo"]);
	
	return bRtnbool;
}

function jf_CheckRequireFld(argName,argID)
{
	var argErrMsg = "";
	
	if (document.all[argID].value == "")
	{
		argErrMsg = argName+"不可空白\n";
		//1060818	Kevin_C	1050087	升二代
		//document.all[argID].focus();
		$('#'+argID).focus();
	}
	
	return argErrMsg;
}

function jf_CheckRequireDlFld(argName,argID)
{
	var argErrMsg = "";
	
	if (jf_GetDLValue(document.all[argID]) == "")
	{
		argErrMsg = argName+"不可空白\n";
	}
	
	return argErrMsg;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if(argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
		//1060818 Kevin_C 1050087 WEM010C1子視窗修改
		//var DeptArray = DeptInfo.split(',');
		var DeptArray = DeptInfo.split('^');
		if(DeptArray.length > 0)
		{
			document.all["txOrgName"].value = jf_Trim(DeptArray[1]);
			document.all["txOrgId"].value = jf_Trim(DeptArray[2])+jf_Trim(DeptArray[3]);
			document.all["txCode"].value = jf_Trim(DeptArray[6]);
			document.all["txAdd"].value = utf8to16(base64decode(jf_Trim(DeptArray[7])));
		}
	}
	if(argCallerId == "EDI520")
	{
		document.all["txSeqNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txSeqNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		//1060818	Kevin_C	1050087	升二代
		//document.all["txSeqNo"].focus();
		$('#txSeqNo').focus();
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jfCheckOuId()
{
	var strSeqNo = document.all["txSeqNo"].value;
	
	if(strSeqNo =="")
		return false
		
	var strOrgNo = document.all["H_OrgNo"].value;
	var strOuId = document.all["H_OuId"].value;

    //1070830 Justin [1070678]弱掃AJAX修改
	//var result = EDT520.CheckOuId(strOrgNo, strSeqNo, strOuId);
	var result = ED5.EDT520.CheckOuId(strOrgNo, strSeqNo, strOuId);
	var strResult = result.value.split("|");
	
	if(strResult[0] == "1")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strResult[1]])),"");
		return false;
	}
	return true;
}

//檢核日期格式
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
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1060818	Kevin_C	1050087	升二代
			//document.all[argObj].focus();
			$('#'+argObj).focus();
			return false;
		}
	}
	//1040422 Eric 1040257 修正儲存功能無作用的問題
	//return false;
	return true;
}

function txSendTime_onblur()
{
	if(document.all.txSendTime.value != "")
	{
		if (document.all.txSendTime.value.length < 4)
			document.all.txSendTime.value = jf_PADL(document.all.txSendTime.value,4,'0');

		var strSendTime = document.all.txSendTime.value;
		if(strSendTime != "")
		{
			if(!jf_CheckTime(strSendTime))
			{
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["時間格式不正確!!"])),"");
				//1060818	Kevin_C	1050087	升二代
				//document.all["txSendTime"].focus();
				$('#txSendTime').focus();
			}
		}
	}
}

function jf_CheckTime(argStr) 
{
	var pHour,pMinute;
	var pHour = parseInt(argStr.substr(0,2),10);
	var pMin  = parseInt(argStr.substr(2,2),10);

	if (pHour > 23 || pMin > 59)
		return false;
	else
		return true;
}

function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//呼叫ED_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
			
			var bSubTree = true;
			//先顯示二級單位選項 避免隱藏不調整
			//1060818	Kevin_C	1050087	升二代
			//document.all["dlSect_Container"].className = "InputFieldText";
			document.all["dlSect_Container"].className = "custom-combobox";
			edjf_SetdlDept("dlDept","dlSect","dlUser","",false,false);	//初始dlSect、dlUser的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);

			//依選項多寡固定下拉式選單可見長度
			SetdlLenth(document.all["dlSect"]);

			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function SetdlLenth(argDLObj)
{
	if(argDLObj.options.length > 10)
		argDLObj.size = 10;
	else if(argDLObj.options.length ==1)
		argDLObj.size = 2;
	else
		argDLObj.size = argDLObj.options.length;
}

function dlSect_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
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
		//1060818	Kevin_C	1050087	升二代
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
		document.all[argComboxID+"_Container"].className = "custom-combobox";
}

function jf_GetDLValue(argDLObj)
{
	if(argDLObj.selectedIndex == -1)
		return "";
	return argDLObj.options[argDLObj.selectedIndex].value;	
}

function dlClassNoOnChange()
{
	var strAccM = jf_GetDLValue(document.all["dlClassNo"]);
	
	//清空郵寄小類選項
	document.all["dlSubclassNo"].options.length = 0;
	if (strAccM != "")
	{
		//重新設定郵寄小類選項
		for(var i = 0; i < document.all["H_dlSubclassNo"].length; i++)
		{
			var strAccNo = document.all["H_dlSubclassNo"].options[i].value.split("|");
			
			if (strAccM == strAccNo[0])
			{
				var opt = document.createElement("option");
				opt.text = document.all["H_dlSubclassNo"].options[i].text;
				opt.value = strAccNo[1];
				document.all["dlSubclassNo"].options.add(opt);
			}
		}
	}
}

function txOrgId_onblur()
{
	if(document.all["txOrgId"] != null)
	{
		var strOrgno = jf_Trim(document.all["txOrgId"].value);
		if(strOrgno == "")
			return;
		var wsParam = new Array();
		wsParam[0] = strOrgno;
		wsParam[1] = document.all["H_OrgNo"].value;
		wsParam[2] = "92";
		wsParam[3] = document.all["H_OrgNo"].value;

		var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx","GetOrgInfo",false,wsParam);
		if(jf_IsWebServiceSuccess(CallWsObj))
		{
			if(CallWsObj.value.Count > 0)
			{
				document.all["txOrgId"].value = jf_Trim(CallWsObj.value.OrgID[0]);
				document.all["txOrgName"].value = jf_Trim(CallWsObj.value.OrgName[0]);
				document.all["txCode"].value = jf_Trim(CallWsObj.value.PostNo[0]);
				document.all["txAdd"].value = jf_Trim(CallWsObj.value.Address[0]);
			}
			else
			{
				document.all["txOrgId"].value = "";
				alert("此機關代碼不存在");
			}
		}
	}
}

function utf8to16(str) 
{
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len)
    {
		c = str.charCodeAt(i++);
		switch(c >> 4)
		{
			case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
				// 0xxxxxxx
				out += str.charAt(i-1);
				break;
			case 12: case 13:
				// 110x xxxx   10xx xxxx
				char2 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
				break;
			case 14:
				// 1110 xxxx  10xx xxxx  10xx xxxx
				char2 = str.charCodeAt(i++);
				char3 = str.charCodeAt(i++);
				out += String.fromCharCode( ((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) |  ((char3 & 0x3F) << 0));
				break;
		}
    }
    return out;
}



function base64decode(str)
{
	var base64DecodeChars = new Array(
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) 
    {
		/* c1 */
		do 
		{
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		}while(i < len && c1 == -1)
		
		if(c1 == -1)
			break;

		/* c2 */
		do
		{
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		}while(i < len && c2 == -1);
			
		if(c2 == -1)
			break;

		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

		/* c3 */
		do
		{
			c3 = str.charCodeAt(i++) & 0xff;
			if(c3 == 61)
				return out;
			c3 = base64DecodeChars[c3];
		}while(i < len && c3 == -1);
			
		if(c3 == -1)
			break;

		out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

		/* c4 */
		do 
		{
			c4 = str.charCodeAt(i++) & 0xff;
			if(c4 == 61)
			return out;
			c4 = base64DecodeChars[c4];
		}while(i < len && c4 == -1);
		
		if(c4 == -1)
			break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
    return out;
}
