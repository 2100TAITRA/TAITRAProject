/*
DATE	SA		PRG		MGR_NO			DESC
1040107	David	Hank	1030976			新增程式 EDT104 郵件登錄作業
1040112	David	David	1030976			修正ComboBox行為及BUG
1040122 David   David   -------         修正現場反應問題
1050729 David   Justin  1050087         二代公文修改
1051019 Leslie  Kenny   1050087         二代公文修改
1070830 Kevin   Justin  1070678         弱掃AJAX修改
1110103	Kevin   Zen     1101292			修正多次點擊重複PostBack之問題
*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050729 Justin 1050087 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
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
	//1040112 David 1030976 修正ComboBox行為
	document.all["H_Dept"].value = document.all["dlDept_Text"].value ;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value ;
	document.all["H_User"].value = document.all["dlUser_Text"].value ;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
	document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
	
	//無值不顯示
	jf_HandleComboxStatus("dlSect");
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
	    /*1050729 Justin 1050087 二代公文修改，刪除小日曆處理--START
		case "btRcvDate":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txRcvDate"], event.screenX, event.screenY);
			GetWorkDate()
			//1040122 David 依郵件類別計算預計結案日期邏輯
			GetPlanCloseDate();
		break;
		case "btPlanCloseDate":
			Page_BlockSubmit=true; 
			jf_CallCalendar(document.all["txPlanCloseData"], event.screenX, event.screenY);
		break;
		case "btMailSendDate":
			Page_BlockSubmit=true; 
			jf_CallCalendar(document.all["txMailSendDate"], event.screenX, event.screenY);
		break;
		case "btCloseDate":
			Page_BlockSubmit=true; 
		    jf_CallCalendar(document.all["txCloseDate"], event.screenX, event.screenY);
			GetWorkDate()
			break;
		//1050729 Justin 1050087 二代公文修改，刪除小日曆處理--END*/
		case "btDocNo":
			Page_BlockSubmit=true; 
			GetDoc();
		break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050729 Justin 1050087 二代公文修改 
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
	
    //1050729 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050729 Justin 1050087 二代公文修改 
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
		    //1050729 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050729 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050729 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			//1040112 David 1030976 修正BUG，避免機關代碼隱藏欄位被清掉
			var strOrgNo = document.all["H_OrgNo"].value;

			if(jf_ConfirmClean(true))
			{
				ClearDL(document.all["dlSect"]);
				ClearDL(document.all["dlUser"]);
				jf_HandleComboxStatus("dlSect");
				
				//1040112 David 1030976 修正BUG，避免機關代碼隱藏欄位被清掉
				document.all["H_OrgNo"].value = strOrgNo;
				document.all["rbCloseType0"].checked = true;
			}
			break;
		case "btSearch":
		    var strUrl = "";
			strUrl = "EDI104.aspx?rtnObj=lbReturnValue&MODE=1";
			jf_OpenChildWin(strUrl, "EDI102", 950, 600 );
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1050729 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1050729 Justin 1050087 二代公文修改 
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
		//新增模式下不可輸入郵件編號(由系統自動取號)
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_Trim(document.all["txMailSeq"].value)!="")
			{
			    alert("新增資料時郵件編號由系統自動產生\n儲存時請勿輸入郵件編號");
			    /*1050729 Justin 1050087 二代公文修改
				document.all["txMailSeq"].focus();*/
			    $('#txMailSeq').focus();
			}
			else
			{
				bRtnbool = true;
			}
		}
		else
		{
			bRtnbool = true;
		}
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";

	//1040112 David 1030976 修正ComboBox行為
	if(!dlDept_Text_onblur(true))
		return false;
	if(!dlSect_Text_onblur(true))
		return false;
	if(!dlUser_Text_onblur(true))
		return false;

	if(jf_Trim(document.all["txRcvDate"].value)=="")
	{
	    strErrMsg += "收件日期不可空白\n";
	    /*1050729 Justin 1050087 二代公文修改
		document.all["txRcvDate"].focus();*/
	    $('#txRcvDate').focus();
	}
	if(jf_Trim(document.all["txPlanCloseData"].value)=="")
	{
	    strErrMsg += "預定結案日期不可空白\n";
	    /*1050729 Justin 1050087 二代公文修改
		document.all["txPlanCloseData"].focus();*/
	    $('#txPlanCloseData').focus();
	}
	if(jf_Trim(document.all["txMailSender"].value)=="")
	{
	    strErrMsg += "發信人不可空白\n";
	    /*1050729 Justin 1050087 二代公文修改
		document.all["txMailSender"].focus();*/
	    $('#txMailSender').focus();
	}
	if(jf_Trim(document.all["txMailSenderAddress"].value)=="")
	{
	    strErrMsg += "電子郵件不可空白\n";
	    /*1050729 Justin 1050087 二代公文修改
		document.all["txMailSenderAddress"].focus();*/
	    $('#txMailSenderAddress').focus();
	}
	if(jf_Trim(document.all["txSubject"].value)=="")
	{
	    strErrMsg += "案由不可空白\n";
	    /*1050729 Justin 1050087 二代公文修改
		document.all["txSubject"].focus();*/
	    $('#txSubject').focus();
	}
	if(document.all["dlMailTypeNo"].options[document.all["dlMailTypeNo"].selectedIndex].value=="")
	{
	    strErrMsg += "郵件類別不可空白\n";
	    /*1050729 Justin 1050087 二代公文修改
		document.all["dlMailTypeNo"].focus();*/
	    $('#dlMailTypeNo').focus();
	}
	if(jf_Trim(document.all["dlDept_Text"].value)=="")
	{
	    strErrMsg += "承辦單位不可空白\n";
	    /*1050729 Justin 1050087 二代公文修改
		document.all["dlDept_Text"].focus();*/
	    $('#dlDept_Text').focus();
	}

    //1040122 David 修改承辦人欄位為一般欄位，不需檢核
	/*if(jf_Trim(document.all["dlUser_Text"].value)=="")
	{
		strErrMsg += "承辦人不可空白\n";
		document.all["dlUser_Text"].focus();
	}*/
	
	 //檢查收件日期是否大於實際結案日期
	 if(jf_Trim(document.all["txRcvDate"].value)!="" && jf_Trim(document.all["txCloseDate"].value)!="")
	 {
		var strDateS=jf_Trim(document.all["txRcvDate"].value);
		var strDateE=jf_Trim(document.all["txCloseDate"].value);

	    var strValueS = document.all["dlRcvTimeH"].options[document.all["dlRcvTimeH"].selectedIndex].value;
	    strValueS +=	document.all["dlRcvTimeM"].options[document.all["dlRcvTimeM"].selectedIndex].value;
	    strDateS = strDateS+strValueS;
	    
	    var strValueE = document.all["dlCloseTimeH"].options[document.all["dlCloseTimeH"].selectedIndex].value;
	    strValueE +=	document.all["dlCloseTimeM"].options[document.all["dlCloseTimeM"].selectedIndex].value;
		strDateE = strDateE+strValueE;

		if(strDateS>strDateE)
		{
			strErrMsg += "收件日期不可大於實際結案日期\n";
		}
	}
	
	//1040112 David 1030976 修正ComboBox行為
	/*if(edjf_DeptCheck("dlDept","dlSect","dlUser") && edjf_SectCheck("dlDept","dlSect","dlUser") && edjf_UserCheck("dlUser"))
	{}
	else
	{
		bRtnbool = false;
	}*/

	if(CheckCDATE("txRcvDate","收件日期")&&CheckCDATE("txPlanCloseData","預定結案日期")&&CheckCDATE("txMailSendDate","發信日期")&&CheckCDATE("txCloseDate","實際結案日期"))
	{}
	else
	{
	bRtnbool = false;
	}
	
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
		}
		else
		{
		}
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	
	if(argCallerId == "EDI104")
	{
		document.all["txMailSeq"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txMailSeq"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    /*1050729 Justin 1050087 二代公文修改
		document.all["txMailSeq"].focus();*/
		$('#txMailSeq').focus();
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

//1040112 David 1030976 修正ComboBox行為
/*function dlDeptSync()
{
	//1040112 David 1030976 修正ComboBox行為
	edjf_DeptCheck("dlDept","dlSect","dlUser")

	jf_HandleComboxStatus("dlSect");

	//取得使用者
	dlSectSync();
}*/

//1040112 David 1030976 修正ComboBox行為
/*function dlSectSync()
{
	//1040112 David 1030976 修正ComboBox行為
	if (document.all["dlSect_Text"].value != document.all["H_SectValue"].value)
	{
		if(edjf_SectCheck("dlDept","dlSect","dlUser"))
		{
			//檢查dlSect內容是否存在下拉選單內
			var nSelect = 0;
			
			for( i=0 ; i<document.all["dlSect"].length ; i++ )
			{
				if(document.all["dlSect"].options[i].text == document.all["dlSect_Text"].value)
				{
					nSelect=i;
					document.all["dlSect"].selectedIndex=i;
					break;
				}
			}
			document.all["H_SectValue"].value = document.all["dlSect"].options[nSelect].value;
			dlUserSync();
		}
		else
		{
			document.all["H_SectValue"].value = "";
		}
	}
}*/

/*function dlUserSync()
{
	//1040112 David 1030976 修正ComboBox行為
	/*if (document.all["dlUser_Text"].value != document.all["H_UserValue"].value)
	{
		if(edjf_UserCheck("dlUser"))
		{
			//檢查dlUser內容是否存在下拉選單內
			var nSelect = 0;
			
			for( i=0 ; i<document.all["dlUser"].length ; i++ )
			{
				if(document.all["dlUser"].options[i].text == document.all["dlUser_Text"].value)
				{
					nSelect=i;
					document.all["dlUser"].selectedIndex=i;
					break;
				}
			}
			document.all["H_UserValue"].value = document.all["dlUser"].options[nSelect].value;
		}
		else
		{
			document.all["H_UserValue"].value = "";
		}
	}
}*/

//1040112 David 1030976 修正ComboBox行為
var uDeptChecked = false;
function dlDept_Text_onblur(argIsCheckDone)
{
	if(uDeptChecked)
	{
		uDeptChecked = false;
		return true;
	}
	if(argIsCheckDone)
		uDeptChecked = true;

	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//呼叫ED_LIB.js，檢查dlDept_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
			
			//設定承辦科別的下拉選單
			edjf_SetdlDept("dlDept","dlSect","dlUser","",false);
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlFmSubDept的處理
			document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if(document.all["dlSect"].options.length ==1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;
			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//1040112 David 1030976 修正ComboBox行為
var uSectChecked = false;
function dlSect_Text_onblur(argIsCheckDone)
{
	if(uSectChecked)
	{
		uSectChecked = false;
		return true;
	}
	if(argIsCheckDone)
		uSectChecked = true;

	var bCheckOK = true;
	if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlSect", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			
			//初始化承辦人選單
			edjf_SetdlSect("dlDept","dlSect","dlUser","",false);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//1040112 David 1030976 修正ComboBox行為
var uUserChecked = false;
function dlUser_Text_onblur(argIsCheckDone)
{
	if(uUserChecked)
	{
		uUserChecked = false;
		return true;
	}
	if(argIsCheckDone)
		uUserChecked = true;

	var bCheckOK = true;
	if (document.all["dlUser_Text"].value != document.all["H_User"].value)
	{
		//呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlUser", "承辦人"))
		{
			//存ComboBox_Text的value
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//將DropDownList裡的item清除 (Reference from EAM005)
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
    //1050729 Justin 1050087 二代公文修改
	//argObj.className = "InputFieldLabel";
	//document.all[argObj.id + "_Text"].className = "InputFieldLabel";
	argObj.className = "custom-combobox";
	document.all[argObj.id + "_Text"].className = "custom-combobox";
	document.all[argObj.id + "_Text"].value =  "";
	
    //1050729 Justin 1050087 二代公文修改
	//argObj.className = "RequireField";	
	//document.all[argObj.id + "_Text"].className = "RequireField";
	argObj.className = "custom-combobox";
	document.all[argObj.id + "_Text"].className = "custom-combobox";
	return;
}

function CheckDlWorkType()
{
	if(jf_Trim(document.all["txWorkType"].value)=="")
	{
		document.all["txWorkType"].value=document.all["dlWorkType"].options[document.all["dlWorkType"].selectedIndex].text;
	}
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
	    //1050729 Justin 1050087 二代公文修改
	    //document.all[argComboxID+"_Container"].className = "InputFieldText";
	    document.all[argComboxID + "_Container"].className = "custom-combobox";
}

//"帶回"按鈕
function GetDoc()
{
	if(jf_Trim(document.all["txDocNo"].value)!="")
	{
		var strArr;
		//1040112 David 1030976 修正BUG
		//var objData= EDT104.GetDoc(jf_Trim(document.all["txDocNo"].value)).value;
	    //1070830 Justin [1070678]弱掃AJAX修改
		//var objData = EDT104.GetDoc(jf_Trim(document.all["txDocNo"].value), document.all["H_OrgNo"].value).value;
		var objData = ED1.EDT104.GetDoc(jf_Trim(document.all["txDocNo"].value), document.all["H_OrgNo"].value).value;
		if(!objData.bSuccess)
		{
			alert("錯誤訊息:"+objData.strErrMsg);
		}
		strArr = objData.strData;
		if(strArr != null)
		{
			//依序:收件日期,發信人,發信日期,案由,承辦單位,承辦人
			document.all["txRcvDate"].value = strArr[0];
			document.all["txMailSender"].value = strArr[1];
			document.all["txMailSendDate"].value = strArr[2];
			document.all["txSubject"].value = strArr[3];
			
			var strDept = strArr[4];
			var strUser = strArr[5];
			var strSect ="";
			//若為3碼則取二級單位
			if(strDept.length=3)
			{
				strSect=strDept;
				strDept=strDept.substring(0,2);
			}
			//檢查dlDept內容是否存在下拉選單內
			for( i=0 ; i<document.all["dlDept"].length ; i++ )
			{
				if(document.all["dlDept"].options[i].value == strDept)
				{
					document.all["dlDept"].selectedIndex=i;
					document.all["dlDept_Text"].value =document.all["dlDept"].options[i].text;
					break;
				}
			}

			//1040112 David 1030976 修正ComboBox行為
			//dlDeptSync()
			dlDept_Text_onblur();

			//檢查dlSect內容是否存在下拉選單內
			//1040112 David 1030976 有二級單位資料再處理
			if(strSect != "")
			{
				for( i=0 ; i<document.all["dlSect"].length ; i++ )
				{
					//1040112 David 1030976 修正ComboBox行為
					//if(document.all["dlSect"].options[i].value == strSect)
					var tempArr = document.all["dlSect"].options[i].value.split(":");
					if(tempArr[0] == strSect)
					{
						document.all["dlSect"].selectedIndex=i;
						document.all["dlSect_Text"].value =document.all["dlSect"].options[i].text;
						//1040112 David 1030976 修正ComboBox行為
						//document.all["H_SectValue"].value =strSect;
						document.all["H_dlSect_Value"].value =strSect;
						dlSect_Text_onblur();

						break;
					}
				}
			}

			//1040112 David 1030976 修正ComboBox行為
			//dlSectSync();

			//檢查dlUser內容是否存在下拉選單內
			//1040112 David 1030976 有承辦人資料再處理
			if(strUser != "")
			{
				for( i=0 ; i<document.all["dlUser"].length ; i++ )
				{
					//1040112 David 1030976 修正ComboBox行為
					//if(document.all["dlUser"].options[i].value == strUser)
					var tempArr = document.all["dlUser"].options[i].value.split(":");
					if(tempArr[2] == strUser)
					{
						document.all["dlUser"].selectedIndex=i;
						document.all["dlUser_Text"].value =document.all["dlUser"].options[i].text;
						//1040112 David 1030976 修正ComboBox行為
						//document.all["H_UserValue"].value =strUser;
						document.all["H_dlUser_Value"].value =strSect;
						dlUser_Text_onblur();
						break;
					}
				}
			}
		}
		else
		{
			alert("查無此文號資料");
		}
	}
}

//檢核日期格式
function CheckCDATE(argObj,strMsg)
{
    var bRtn=true;
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
		    /*1050729 Justin 1050087 二代公文修改
			document.all[argObj].focus();*/
			$('#' + argObj).focus();
			bRtn=false;
			return bRtn;
		}
	}
	return bRtn;
}

//取得實際處理時間,使用日數
function GetWorkDate()
{
	if(jf_Trim(document.all["txRcvDate"].value)!="" && jf_Trim(document.all["txCloseDate"].value)!="")
	{
		var objData;
		var strArr;

		var strDateS=jf_Trim(document.all["txRcvDate"].value);
		var strDateE=jf_Trim(document.all["txCloseDate"].value);

	    var strValueS = document.all["dlRcvTimeH"].options[document.all["dlRcvTimeH"].selectedIndex].value;
	    strValueS +=	document.all["dlRcvTimeM"].options[document.all["dlRcvTimeM"].selectedIndex].value;
	    strDateS = strDateS+strValueS;

	    var strValueE = document.all["dlCloseTimeH"].options[document.all["dlCloseTimeH"].selectedIndex].value;
	    strValueE +=	document.all["dlCloseTimeM"].options[document.all["dlCloseTimeM"].selectedIndex].value;
		strDateE = strDateE+strValueE;

	    //檢查收件日期是否大於實際結案日期
	    if(strDateS>strDateE)
	    {
			alert("收件日期不可大於實際結案日期");
			return;
	    }

		//1040122 David 因選單VALUE新增紀錄預計結案日期計算邏輯，調整取法
		//var strMailType=document.all["dlMailTypeNo"].options[document.all["dlMailTypeNo"].selectedIndex].value;
		var strMailType = document.all["dlMailTypeNo"].options[document.all["dlMailTypeNo"].selectedIndex].value.split('|')[0];

	    //1070830 Justin [1070678]弱掃AJAX修改
		//objData = EDT104.GetWorkDate(jf_Trim(document.all["H_OrgNo"].value), strDateS, strDateE, strMailType).value;
		objData = ED1.EDT104.GetWorkDate(jf_Trim(document.all["H_OrgNo"].value), strDateS, strDateE, strMailType).value;
		if(!objData.bSuccess)
		{
			//1040122 David 調整錯誤訊息
			//alert("錯誤訊息:"+objData.strErrMsg);
			alert("取得實際處理時間發生錯誤："+objData.strErrMsg);
		}
		else
		{
			strArr = objData.strData;
			if(strArr !=null)
			{
				document.all["H_UseDay"].value = strArr[0];	//H_UseDay:隱藏欄位 保存使用日數
				document.all["txWorkDate"].value = strArr[1];
			}
			else
			{
				document.all["H_UseDay"].value = "";
				document.all["txWorkDate"].value = "";
			}
		}
	}
	else
	{
			document.all["H_UseDay"].value = "";
			document.all["txWorkDate"].value = "";
	}
}

//1040122 David 因新增依郵件類別計算預計結案日期邏輯，調整收件日期OnBlur事件
function txRcvDateOnBlur()
{
	GetWorkDate();
	
	//依郵件類別計算預計結案日期邏輯
	GetPlanCloseDate();
}

//1040122 David 因新增依郵件類別計算預計結案日期邏輯，調整收件時間OnChange事件
function dlRcvTimeOnChange()
{
	GetWorkDate();
	
	//依郵件類別計算預計結案日期邏輯
	GetPlanCloseDate();
}

//1040122 David 因新增依郵件類別計算預計結案日期邏輯，調整郵件類別OnChange事件
function dlMailTypeOnChange()
{
	//計算實際處理時工作日數
	GetWorkDate();

	//依郵件類別計算預計結案日期邏輯
	GetPlanCloseDate();
}

//1040122 David 新增依郵件類別計算預計結案日期邏輯
function GetPlanCloseDate()
{
	if(jf_Trim(document.all["txRcvDate"].value) != "")
	{
		var strMailPlanType = document.all["dlMailTypeNo"].options[document.all["dlMailTypeNo"].selectedIndex].value.split('|')[1];
		var strRcvDate = document.all["txRcvDate"].value;
		var strRcvHour = document.all["dlRcvTimeH"].options[document.all["dlRcvTimeH"].selectedIndex].value;
		var strRcvMin = document.all["dlRcvTimeM"].options[document.all["dlRcvTimeM"].selectedIndex].value;

	    //1070830 Justin [1070678]弱掃AJAX修改
		//var objData = EDT104.GetPlanCloseDate(document.all.SsoArtifact.value, document.all["H_OrgNo"].value, strRcvDate, strRcvHour, strRcvMin, strMailPlanType).value;
		var objData = ED1.EDT104.GetPlanCloseDate(document.all.SsoArtifact.value, document.all["H_OrgNo"].value, strRcvDate, strRcvHour, strRcvMin, strMailPlanType).value;
		if(!objData.bSuccess)
		{
			alert("取得預計結案日期發生錯誤："+objData.strErrMsg);
		}
		else
		{
			strArr = objData.strData;

			if(strMailPlanType == "1")
			{
				document.all["txPlanCloseData"].value = strArr[0];
				edjf_SetDDLByValue(document.all["dlPlanCloseTimeH"],strArr[1],"","");
				edjf_SetDDLByValue(document.all["dlPlanCloseTimeM"],strArr[2],"","");
			}
			else
			{
				document.all["txPlanCloseData"].value = strArr[0];
			}
		}
	}
}