/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		SA		單號		概要
 * -------------------------------------------------------------------------------------------------
 * 2011.08.26	Jeff		-		1000631		新增程式
 * 2014.11.06	Hank		Cloud	1030603		新增支援二級單位
 * 2015.11.17	Kevin_C		Cloud	1040922		增加回傳特殊媒體編號
 * 1060516      Justin      Cloud   1060400     二代公文修改
 * 1070830      Zen         Kevin   1070678     弱掃Ajax修正
 * 1110103		Zen			Kevin	1101292     修正多次點擊重複PostBack之問題
 ****************************************************************************************************/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;


//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");
//1060516 Justin [1060400] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1070830 Zen 1070678 弱掃Ajax修正
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//配合密等下拉選單，調整某些欄位一開始無法使用
	SecNoAct();
	
	GetComBoValue("dlDept_Text","dlDept");
	GetComBoValue("dlUser_Text","dlUser");

	if(document.all["txTransfer"].value != "")
	{
		alert(document.all["txTransfer"].value);
		window.close();
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060516 Justin [1060400] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}

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
	    /*1060516 Justin [1060400] 二代公文修改
		case "btMdate":
			 Page_BlockSubmit = true;
           jf_CallCalendar(document.all.txCrtDate, event.screenX, event.screenY);
           break;
       case "btRmSec":
			 Page_BlockSubmit = true;
           jf_CallCalendar(document.all.txRmvsecDate, event.screenX, event.screenY);
           break;
       case "btPdate":
			 Page_BlockSubmit = true;
           jf_CallCalendar(document.all.txAttExtFileDate, event.screenX, event.screenY);
           break;
       case "btAdate":
			 Page_BlockSubmit = true;
           jf_CallCalendar(document.all.txAdate, event.screenX, event.screenY);
           break;*/
       case "btKeyHelp": 
           var strUrl = "";
			strUrl = "UDI100.aspx?rtnObj=lbReturnValue&MODE=1";
			//1031124 Hank 新增串入網址參數 科別名稱 承辦人 [1030603]
			strUrl = strUrl += "&SectName="+document.all["dlSectName_Text"].value+"&User="+document.all["dlUser_Text"].value;
            //1060516 Justin [1060400] 二代公文修改
			//jf_OpenChildWin(strUrl, "UDI100", 700, 500);
			jf_OpenChildWin(strUrl, "UDI100", 800, 600);
			break;
		case "btClsNo":
			Page_BlockSubmit = true;
			var strUrl = "../EA01/EAC005.aspx?FILE_CLS="+document.all["txFileCls"].value+"&FILE_YEAR="+"&MODE=1&nFrom=EAT230&VER_NO=";
		    //1060516 Justin [1060400] 二代公文修改
			//jf_OpenChildWin(strUrl, "EAC005", 700, 500);
			jf_OpenChildWin(strUrl, "EAC005", 800, 600);
			break;
                
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060516 Justin [1060400] 二代公文修改 
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
	
    //1060516 Justin [1060400] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if(!fnBeforeOpen())
			{
				Page_BlockSubmit=true;
				alert("請輸入特殊媒體編號 或 申請單號");
			}
			else
			{
				Page_BlockSubmit = !jf_CheckKeyObject();
			    //1060516 Justin [1060400] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btSave":
			//1031121 Hank 新增檢核網址參數 科別名稱 承辦人 [1030603]
			if(CheckDl())
			{
				if(jf_ConfirmSave() && Comcheck() && SyncDL("dlUser_Text","dlUser") && saveBeforeDateCheck()) //是否通過儲存前必要檢查
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			    //1060516 Justin [1060400] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1060516 Justin [1060400] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060516 Justin [1060400] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			//1031106 Hank 備份下拉選單text值 [1030603] start
			var strDeptTempTx = document.all["dlDept_Text"].value;
			var strUserTempTx = document.all["dlUser_Text"].value;
			var strSectNameTempTx = document.all["dlSectName_Text"].value;
			//1031106 Hank 備份下拉選單text值 [1030603] end			
			jf_ConfirmClean(true);
			//1031106 Hank 寫回下拉選單text值 [1030603] start
			document.all["dlDept_Text"].value = strDeptTempTx;
			document.all["dlUser_Text"].value = strUserTempTx;
			document.all["dlSectName_Text"].value = strSectNameTempTx;
			//1031106 Hank 寫回下拉選單text值 [1030603] end
			
			//1031106 Hank 重設下拉選單selectedIndex [1030603] start
			for(var i=0;i<document.all["dlDept"].length;i++ )
			{ 
				if(document.all["dlDept"].options[i].text == strDeptTempTx)
				{
					document.all["dlDept"].selectedIndex = i;
				}
			}
			for(var i=0;i<document.all["dlSectName"].length;i++ )
			{ 
				if(document.all["dlSectName"].options[i].text == strSectNameTempTx)
				{
					document.all["dlSectName"].selectedIndex = i;
				}
			}
			for(var i=0;i<document.all["dlUser"].length;i++ )
			{ 
				if(document.all["dlUser"].options[i].text == strUserTempTx)
				{
					document.all["dlUser"].selectedIndex = i;
				}
			}
			//1031106 Hank 重設下拉選單selectedIndex [1030603] end
		    //1060515 Justin [1060400] 二代公文修改
			//document.all["txItemNo"].focus();
			$('#txItemNo').focus();
			//1031106 Hank dlUser選單內容必須保留 [1030603]
			//document.all["dlUser"].options.length=0;
			break;
		case "btSearch":
			var strUrl = "";
			strUrl = "UDI100.aspx?rtnObj=lbReturnValue&MODE=1";
			//1031120 Hank 新增串入網址參數 科別名稱 承辦人 [1030603]
			strUrl = strUrl += "&SectName="+document.all["dlSectName_Text"].value+"&User="+document.all["dlUser_Text"].value;
		    //1060516 Justin [1060400] 二代公文修改
			//jf_OpenChildWin(strUrl, "UDI100", 700, 500);
			jf_OpenChildWin(strUrl, "UDI100", 800, 600);
			break;
		case "btPrint":
			//1031121 Hank 新增檢核網址參數 科別名稱 承辦人 [1030603]
			if(CheckDl())
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
			    //1060516 Justin [1060400] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPreview":
			//1031121 Hank 新增檢核網址參數 科別名稱 承辦人 [1030603]
			if(CheckDl())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
			    //1060516 Justin [1060400] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;	
		case "btCheck":
		    //1060516 Justin [1060400] 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
		    Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
		    //1060516 Justin [1060400] 二代公文修改 
		    //jf_SelectBarSubmit();
		    jf_SelectBarSubmit(xObjectName);
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = true;
	
	bRtnbool=jf_CheckBeforSave();
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (jf_Trim(document.all["txItemName"].value) == "")
	{
	    strErrMsg += "名稱不可空白\n";
	    //1060515 Justin [1060400] 二代公文修改
	    //document.all["txItemName"].focus();
	    $('#txItemName').focus();
	}	
	if (jf_Trim(document.all["txItemFormat"].value) == "")
	{
	    strErrMsg += "規格不可空白\n";
	    //1060515 Justin [1060400] 二代公文修改
	    //document.all["txItemFormat"].focus();
	    $('#txItemFormat').focus();
	}
	if (jf_Trim(document.all["txItemMaker"].value) == "")
	{
	    strErrMsg += "製作者不可空白\n";
	    //1060515 Justin [1060400] 二代公文修改
	    //document.all["txItemMaker"].focus();
	    $('#txItemMaker').focus();
	}
	if (jf_Trim(document.all["txCrtDate"].value) == "")
	{
	    strErrMsg += "製作日期不可空白\n";
	    //1060515 Justin [1060400] 二代公文修改
	    //document.all["txCrtDate"].focus();
	    $('#txCrtDate').focus();
	}
	if (jf_Trim(document.all["txFileCnt"].value) == "")
	{
	    strErrMsg += "媒體數量不可空白\n";
	    //1060515 Justin [1060400] 二代公文修改
	    //document.all["txFileCnt"].focus();
	    $('#txFileCnt').focus();
	}
	if (jf_Trim(document.all["txFileCls"].value) == "")
	{
	    strErrMsg += "分類號不可空白\n";
	    //1060515 Justin [1060400] 二代公文修改
	    //document.all["txFileCls"].focus();
	    $('#txFileCls').focus();
	}
	if (jf_Trim(document.all["txItemDesc"].value) == "")
	{
	    strErrMsg += "內容概要不可空白\n";
	    //1060515 Justin [1060400] 二代公文修改
	    //document.all["txItemDesc"].focus();
	    $('#txItemDesc').focus();
	}
	else
	{
		if (!jf_CheckTextLength(document.all["txItemDesc"].value,1,300))
		{
		    if (strErrMsg == "")
		        //1060515 Justin [1060400] 二代公文修改
		        //document.all["txItemDesc"].focus();
		        $('#txItemDesc').focus();
			strErrMsg += "[內容概要]欄位不可超過300個字\n";
		}
	}
	if (jf_Trim(document.all["txAdate"].value) == "")
	{
	    strErrMsg += "核決日期不可空白\n";
	    //1060515 Justin [1060400] 二代公文修改
	    //document.all["txAdate"].focus();
	    $('#txAdate').focus();
	}
	if (jf_Trim(document.all["dlUser_Text"].value) == "")
	{
		strErrMsg += "承辦人不可空白\n";
	}
	if (jf_Trim(document.all["dlDept_Text"].value) == "")
	{
		strErrMsg += "承辦單位不可空白\n";
	}
	if (jf_Trim(document.all["txKeepYear"].value) == "")
	{
		strErrMsg += "保存年限不可空白\n";
	}
	if (document.all["dlMediaNo"].options[document.all["dlMediaNo"].selectedIndex].value == "")
	{
		strErrMsg += "媒體型式不可空白\n";
	}
	if (document.all["dlAppUser"].options[document.all["dlAppUser"].selectedIndex].text == "")
	{
		strErrMsg += "核決者不可空白\n";
	}
	if (document.all["dlSecNo"].options[document.all["dlSecNo"].selectedIndex].value!= "1")
	{
		if(jf_Trim(document.all["txRmvsecDate"].value) == "" && jf_Trim(document.all["dlRmvsecCond_Text"].value) == "")
			strErrMsg += "解密日期、解密條件不可都為空白\n";
	}	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//附件名稱不為空白時
		if(document.all["dg1__ctl" + i + "_txFileDesc"].value != "")
		{
			//媒體型式不可空白
			if(document.all["dg1__ctl" + i + "_dlMediaType"].options[document.all["dg1__ctl" + i + "_dlMediaType"].selectedIndex].value == "")
			{
				InValidName += ",媒體型式不可空白";			
				InValidControlName = "dg1__ctl" + i + "_dlMediaType";
			}
			//計量單位不可空白
			if(document.all["dg1__ctl" + i + "_dlUnit"].options[document.all["dg1__ctl" + i + "_dlUnit"].selectedIndex].value == "")
			{
				InValidName += ",計量單位不可空白";			
				InValidControlName = "dg1__ctl" + i + "_dlUnit";
			}
			//數量不可空白
			if(jf_Trim(document.all["dg1__ctl" + i + "_txCnt"].value) == "")
			{
				InValidName += ",數量不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txCnt";
			}				
			if(InValidName != "")
			{
			    InValidName = InValidName.substr(1, InValidName.length);
			    //1060516 Justin [1060400] 二代公文修改
			    //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");
			    //document.all[InValidControlName].focus();
			    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
			    $('#' + InValidControlName).focus();
				return false;
			}			
		}
		else if(Checkdg())
		{
			if(jf_Trim(document.all["txAttExtFileDate"].value) == "")
			{
				alert("抽存續辦預計歸檔日期不可為空白");
				return false;
			}
		}
		//如果沒有抽存續辦的附件則自動把日期欄位清空
		else if(!Checkdg())
				document.all["txAttExtFileDate"].value="";	
	}
	return true;
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
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
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
	
	if(argCallerId == "EAC005")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all["txFileCls"].value=document.all["lbReturnValue"].options[1].value;
		}
	    //1060515 Justin [1060400] 二代公文修改
		//document.all["txFileCls"].focus();
		$('#txFileCls').focus();
	}

	if(argCallerId == "UDI100")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			//1041117	Kevin_C	1040922	增加回傳特殊媒體編號
			var strRtn = document.all["lbReturnValue"].options[0].value.split(":");
			if (strRtn[0] == "DocNo")
				document.all["txItemNo"].value = strRtn[1];
			else
				document.all["txApplyNo"].value=document.all["lbReturnValue"].options[0].value;
		}
		if (document.all["txApplyNo"].value != "" || document.all["txItemNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
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
//Combobox Onblur處理
function SyncDL(argObject,argName)
{	
	var bDept = false;
	var IsOk=true;
	//如果不為空
	if (jf_Trim(document.all[argObject].value) != "")
	{
		for ( var i = 0 ; i < document.all[argName].length ; i++)
		{
			if(document.all[argName].options[i].text == document.all[argObject].value )
			{
				document.all[argName].selectedIndex = i;
				bDept = true;
				break;
			}
		}		
		if (!bDept)
		{	
			document.all[argName].selectedIndex = 0;
			document.all[argObject].value = "";
			if(argName=="dlUser")
				alert('您所輸入之承辦人不存在於系統中。');
		    //1060515 Justin [1060400] 二代公文修改
			//document.all[argObject].focus();
			$('#' + argObject).focus();
			return;	
		}	
		GetComBoValue(argObject,argName);
	}
	//如果為空清除
	else
	{
		if(argName=="dlDept")
		{
			document.all["dlUser"].options.length = 0;
			document.all["dlUser_Text"].value="";
			document.all["H_dlUser_Value"].value = "";	
			document.all["H_dlDept_Text"].value="";
			document.all["H_dlDept_Value"].value = "";				
		}
		else
			document.all["H_"+argName+"_Value"].value="";
	}
	return IsOk;
}
//ComBoBox Onchange檢核
function OnChangeCheck(argObject,argName)
{
	
	if(argObject=="dlDept_Text" && jf_Trim(document.all[argObject].value)!=jf_Trim(document.all["H_"+argName+"_Text"].value))
	{
		//清空承辦人相關欄位
		document.all["dlUser_Text"].value="";
		document.all["H_dlUser_Value"].value = "";
	}
	GetComBoValue(argObject,argName);

	
}
//只單獨檢查承辦單位(點選儲存時)，因為承辦單位onblur檢核在lib裡面。如果寫在跟承辦人同一地方 會跳兩次錯誤訊息
function Comcheck()
{
	var IsOk=true;
	if(jf_Trim(document.all["dlDept_Text"].value)!=jf_Trim(document.all["H_dlDept_Text"].value) && jf_Trim(document.all["dlDept_Text"].value)!="")
	{
		alert("該承辦單位不存在");
		document.all["H_dlDept_Value"].value="";
		document.all["H_dlDept_Text"].value = "";
	    //1060515 Justin [1060400] 二代公文修改
		//document.all["dlDept_Text"].focus();
		$('#dlDept_Text').focus();
		document.all["H_dlUser_Value"].value="";
		document.all["dlUser_Text"].value="";
		document.all["dlUser"].options.length = 0;
		IsOk= false;
	}
	
	return IsOk;
	
}
//取得ComBox值
function GetComBoValue(argObject,argName)
{
	var strArr1 = new Array();
	if(jf_Trim(document.all[argObject].value)!="")
	{
		//1031121	Hank 增加檢查selectedIndex是否為-1 [1030603]
		if(document.all[argName].selectedIndex>=0)
		{
			strArr1 = document.all[argName].options[document.all[argName].selectedIndex].value.split(':');
			//1031121	Hank 增加檢查字串切割長度 避免取到不存在部分 [1030603]
			if(strArr1.length>=4)
			{	
				if(argName=="dlUser")
				{
					document.all["H_"+argName+"_Value"].value = strArr1[2];		
				}
				else
				{
					document.all["H_"+argObject].value = strArr1[1];
					document.all["H_"+argName+"_Value"].value = strArr1[0];
				}	
			}
			else
			{
					document.all["H_"+argName+"_Value"].value = "";
					document.all["H_"+argObject].value = "";
					document.all["H_"+argName+"_Value"].value = "";
			}
		}
		else
		{
			document.all["H_"+argName+"_Value"].value = "";
			document.all["H_"+argObject].value = "";
			document.all["H_"+argName+"_Value"].value = "";
		}
	}
}
//檢查是否有勾選
function Checkdg()
{
	var InOk=false;
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			InOk=true;
		}
	}
	return InOk;

}
//分類號OnBlur
function txFileClsOnBlur()
{
	if (jf_Trim(document.all["txFileCls"].value) != "")
	{
        //1070830 Zen 1070678 弱掃Ajax修正
        //var CheckResult = UDT102.CheckCls(document.all.nSourceOrgno.value, document.all["txFileCls"].value).value;
        var CheckResult = UD.UDT102.CheckCls(document.all.nSourceOrgno.value, document.all["txFileCls"].value).value;
		if (CheckResult.split(',')[0] == "false")
		{
			document.all["txFileCls"].value  = "";
			document.all["txClsKey"].value   = "";
			document.all["txKeepYear"].value = "";
			alert(CheckResult.split(',')[1]);
		    //1060515 Justin [1060400] 二代公文修改
			//document.all["txFileCls"].focus();
			$('#txFileCls').focus();
		}
		else
		{
			document.all["txClsKey"].value = CheckResult.split(',')[2];
			document.all["txKeepYear"].value = CheckResult.split(',')[3];
		}
	}
	else
		document.all["txKeepYear"].value="";
		
	
}

//日期格式檢查
var CheckedDate = false;
var ObjName = "";
var strBDate = "";
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	if(ObjName != argObj)
		CheckedDate = false;
	ObjName = argObj;
	
	var strDate = jf_Trim(document.all[argObj].value);
		
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}

		if(strBDate != strDate)
			CheckedDate = false;
		
		strBDate = strDate;

		if(CheckedDate)
		{
			CheckedDate = false;
			return true;
		}
		if(argIsCheckDone)
			CheckedDate = true;

		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1060515 Justin [1060400] 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			CheckedDate = false;
			return false;
		}
		else
			return true;
	}
	else
		return true;
}

//密等為密以上解密條件連動處理
function SecNoAct()
{
	if(document.all["dlSecNo"].options[document.all["dlSecNo"].selectedIndex].value=="1")
	{
		document.all["dlRmvsecCond"].className	= "DisplayOnly";
		document.all["dlRmvsecCond"].selectedIndex = 0;
		document.all["dlRmvsecCond"].disabled	= true;
		document.all["dlRmvsecCond_Text"].value="";
		document.all["dlRmvsecCond_Text"].className="DisplayOnly";
		document.all["dlRmvsecCond_Text"].disabled	= true;
		document.all["txRmvsecDate"].className="DisplayOnly";
		document.all["txRmvsecDate"].disabled	= true;
		document.all["txRmvsecDate"].value="";
	    //1060516 Justin [1060400] 二代公文修改
	    //document.all["btRmSec"].disabled	= true;	
	}
	else
	{
	    document.all["dlRmvsecCond"].disabled = false;
	    //1060516 Justin [1060400] 二代公文修改--S
		//document.all["dlRmvsecCond"].className="InputFieldLabel";
	    //document.all["dlRmvsecCond_Text"].className="InputFieldLabel";
	    document.all["dlRmvsecCond"].className = "custom-combobox";
	    document.all["dlRmvsecCond_Text"].className = "custom-combobox";
		document.all["dlRmvsecCond_Text"].disabled = false;
	    //document.all["txRmvsecDate"].className="InputFieldLabel";
		//document.all["txRmvsecDate"].className = "";
		document.all["txRmvsecDate"].disabled	= false;
	    //document.all["btRmSec"].disabled	= false;
		document.all["txRmvsecDate"].className = "DatePicker";
	    //1060516 Justin [1060400] 二代公文修改--E
	}
}
//媒體編號&申請單號檢查
function AppAndItemCheck()
{
	var CheckResult=",";
	if(jf_Trim(document.all["txItemNo"].value)!="")
        //1070830 Zen 1070678 弱掃Ajax修正
        //CheckResult = UDT102.CheckItemNoAndAppNo(document.all.nSourceOrgno.value, document.all["txItemNo"].value, "").value;
        CheckResult = UD.UDT102.CheckItemNoAndAppNo(document.all.nSourceOrgno.value, document.all["txItemNo"].value, "").value;
	else if(jf_Trim(document.all["txApplyNo"].value)!="")
        //1070830 Zen 1070678 弱掃Ajax修正
        //CheckResult = UDT102.CheckItemNoAndAppNo(document.all.nSourceOrgno.value, "", document.all["txApplyNo"].value).value;
        CheckResult = UD.UDT102.CheckItemNoAndAppNo(document.all.nSourceOrgno.value, "", document.all["txApplyNo"].value).value;
	
	if (CheckResult.split(',')[0] == "false")
	{
		alert(CheckResult.split(',')[1]);
		if(jf_Trim(document.all["txItemNo"].value)!="")
		{
		    document.all["txItemNo"].value = "";
		    //1060515 Justin [1060400] 二代公文修改
		    //document.all["txItemNo"].focus();
		    $('#txItemNo').focus();
		}
		else
		{
		    document.all["txApplyNo"].value = "";
		    //1060515 Justin [1060400] 二代公文修改
		    //document.all["txApplyNo"].focus();
		    $('#txApplyNo').focus();
		}
		Page_BlockSubmit=true;	
	}		   	
}
//開啟時特殊媒體編號 與 申請單號 要擇一輸入不可都為空
function fnBeforeOpen()
{
	if(jf_Trim(document.all["txApplyNo"].value)=="" && jf_Trim(document.all["txItemNo"].value)=="")
		return false;
	else 
		return true;
}

//儲存前日期檢查
function saveBeforeDateCheck()
{
	var Dateok=true;
	if(!CheckDATE("txCrtDate","製作日期格式有誤",true) || !CheckDATE("txAttExtFileDate","抽存續辦預計歸檔日期格式有誤",true) || !CheckDATE("txRmvsecDate","解密日期格式有誤",true) || !CheckDATE("txAdate","核決日期格式有誤",true))
		Dateok=false;
	return Dateok;	
}
/**********************************************************************************************
  Name : function jf_CheckTextLength(argString, argMinLength, argMaxLength)
  Desc : 備註欄位檢查是否超過200個字
  Parm : argStr			: string 被檢查之字串
         argMinLength	: int    最小長度
         argMaxLength	: int    最大長度
  Rtn  : bool 回傳是否通過檢查(是:true 否:false)
 **********************************************************************************************/
function jf_CheckTextLength(argString, argMinLength, argMaxLength)
{
	//re=/^.{1,100}$/;
	//因為最小及最大長度是變數，所以不能用上面直接指定，要改用下面的宣告方法
	re = new RegExp("^.{" + argMinLength + "," + argMaxLength + "}$");
	if(re.test(argString))
		return true;
	else
		return false;
}

//1031103 Hank 下拉選單變更事件 [1030603] start
var CallWS_ID_SECT;

//dlSectName下拉選單連動(merge from EAM005)
function SyncSc()
{
	if (document.all["dlDept_Text"].value != "")
	{
		var bDept = false;
		var bSect = false;
		
		for ( var i = 0 ; i < document.all["dlSectName"].length ; i++)
		{
			if(document.all["dlSectName"].options[i].text == document.all["dlSectName_Text"].value )
			{
				document.all["dlSectName"].selectedIndex = i;
				document.all["H_txSectName"].value = document.all["dlSectName"].options[i].value.split(':')[2];
				bSect = true;
				break;
			}
		}
		
		if (!bSect)
		{
			document.all["dlSectName"].selectedIndex = -1;
			document.all["dlSectName_Text"].value = "";
			document.all["H_txSectName"].value = "";
			alert('您所輸入之承辦科別不存在於該承辦單位下。');
		    //1060515 Justin [1060400] 二代公文修改
			//document.all["dlSectName_Text"].focus();
			$('#dlSectName_Text').focus();
		}
	}
	else
	{
		document.all["dlSectName"].selectedIndex = -1;
		document.all["dlSectName_Text"].value = "";
		document.all["H_txSectName"].value = "";	
		alert('請先選擇承辦單位再選擇承辦科別。');
	    //1060515 Justin [1060400] 二代公文修改
		//document.all["dlDept_Text"].focus();
		$('#dlDept_Text').focus();
	}
	jf_SectNameCheck('dlSectName','dlUser');
}

//將DropDownList裡的item清除 (merge from EAM005)
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	
	//1031104 Hank 將cssClass調整為RequireField [1030603]
    //1060516 Justin [1060400] 二代公文修改
    //argObj.className = "RequireField";
    //document.all[argObj.id + "_Text"].className = "RequireField";
	argObj.className = "custom-combobox RequireField";
	document.all[argObj.id + "_Text"].className = "custom-combobox RequireField";
		
	return;
}

//1031120 Hank 重建選單 [1030603]
function jf_SectNameCheck(argSectComboBoxID, argUserComboBoxID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];

	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	var UserNameMem = SectComboBoxTextObj.value;

	var val = SectComboBoxObj.value;
	var arr = val.split(":");
	if( arr[2] == "" ) val = arr[0];
	else val = arr[2];

	//二級欄位為空則取一級
	if(SectComboBoxTextObj.value == "")
	{
		val = document.all["dlDept"].value.split(":")[0];
	}
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
	
	//clear the ComboBox of User
	len = UserComboBoxObj.length;
	for( i=0 ; i<len ; i++ )
		UserComboBoxObj.remove(0);

	//add new data into the ComboBox of User
	len = resultObj.UserName.length;
	UserComboBoxObj.size = len > 0 ? (len + 1) : 2;
	UserComboBoxObj.options.add(new Option("",""));
	for( i=0 ; i<len ; i++ )
	{
		var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i] + ":" + resultObj.EmpName[i])
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
//檢查comboBox輸入值是否在選單中
function CheckDl()
{
	var CheckFlag = true;
	var bDept = false;
	//Dept
	for ( var i = 0 ; i < document.all["dlDept"].length ; i++)
	{
		if(document.all["dlDept"].options[i].text == document.all["dlDept_Text"].value )
		{
			document.all["dlDept"].selectedIndex = i;
			bDept = true;
			break;
		}
	}
	
	if (!bDept)
	{
		CheckFlag=false;
		document.all["dlDept"].selectedIndex = -1;
		//document.all["dlDept_Text"].value = "";
		alert('您所輸入之承辦單位不存在於系統中。');
	}
	
	//Sect
	var bSect = false;
	
	for ( var i = 0 ; i < document.all["dlSectName"].length ; i++)
	{
		if(document.all["dlSectName"].options[i].text == document.all["dlSectName_Text"].value )
		{
			document.all["dlSectName"].selectedIndex = i;
			document.all["H_txSectName"].value = document.all["dlSectName"].options[i].value.split(':')[2];
			bSect = true;
			break;
		}
	}
	
	if (!bSect)
	{
		CheckFlag=false;
		document.all["dlSectName"].selectedIndex = -1;
		//document.all["dlSectName_Text"].value = "";
		document.all["H_txSectName"].value = "";
		alert('您所輸入之承辦科別不存在於該承辦單位下。');
	    //1060515 Justin [1060400] 二代公文修改
		//document.all["dlSectName_Text"].focus();
		$('#dlSectName_Text').focus();
	}
	
	//User
	var UserComboBoxObj     = document.all["dlUser"];
	var UserComboBoxTextObj = document.all["dlUser" + "_Text"];

	var i, j, len;
	var checkOK = false;
	for( i=0 ; i<UserComboBoxObj.options.length ; i++ )
	{
		if( checkOK ) break;
		var arr = UserComboBoxObj.options[i].value.split(":");
		for(j=3 ; j>=0 ; j--)
		{
			if( arr[j] == UserComboBoxTextObj.value)
			{
				checkOK = true;
				UserComboBoxObj.selectedIndex = i;
				//檢查切割後長度 避免取到不存在的位置
				var strTempCut =UserComboBoxObj.options[i].value.split(":");
				if(strTempCut.length>=4)
				{
					UserComboBoxTextObj.value = UserComboBoxObj.options[i].value.split(":")[3];
				}
				else
				{
					UserComboBoxTextObj.value = "";
				}
				break;
			}
		}
	}
	if( !checkOK )
	{
		CheckFlag=false;
		//UserComboBoxTextObj.focus();
		//UserComboBoxTextObj.value = "";
		alert("您所輸入的承辦人不存在");
	}
	
	return CheckFlag;
}
//1031103 Hank 下拉選單變更事件 [1030603] end