/*
DATE        SA      PRG     單號        DESC
10311031    Cloud	Hank    030603      新增支援二級單位
10605161    Cloud   Justin  060400      二代公文修改
10610311            Justin  060400      無二級單位時不須檢核是否存在於選單中
1061103		Kevin   Zen		1061071     修正點擊核可多次會收到重複通知之問題
1070830     Kevin   Zen     1070678     弱掃Ajax修正
1081231		Cloud	Kevin_C	1081095		修正取下拉選單選項的屬性在IE不支援的問題
1110103     Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
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
    //1060516 Justin [1060400] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	if(document.all["txTransfer"].value != "")
	{
		alert(document.all["txTransfer"].value);
		window.close();
	}
	jf_dlSecNoOnChange();
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
		case "btCrtDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txCrtDate, event.screenX, event.screenY);
			break;
		case "btRmvsecDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txRmvsecDate, event.screenX, event.screenY);
			break;
		case "btAttExtFileDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txAttExtFileDate, event.screenX, event.screenY);
			break;*/
		case "btClsNo":
			var strUrl = "../EA01/EAC005.aspx?FILE_CLS="+document.all["txFileCls"].value+"&FILE_YEAR="+"&MODE=1&nFrom=EAT230&VER_NO=";
		    //1060516 Justin [1060400] 二代公文修改 
		    //jf_OpenChildWin(strUrl, "EAC005", 700, 500);
			jf_OpenChildWin(strUrl, "EAC005", 800, 600);
			Page_BlockSubmit = true;
			break;
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
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
	
	if (IsServerHandling)
	{
	    //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
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
			//Page_BlockSubmit = !jf_CheckKeyObject();
			Page_BlockSubmit = false;
		    //1060516 Justin [1060400] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btTransfer":
			//1031120 Hank 新增檢核網址參數 科別名稱 承辦人 [1030603]
			if(CheckDl())
			{
			    var ddlIdx = 2;
			    /*1060516 Justin [1060400] 二代公文修改
				var nextOpt = GetToolbarCtrl(ddlIdx);
				var aOptions = nextOpt.getOptions();
				document.all.SelectedUser.value = aOptions.value;
				document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;*/
				//1081231	Kevin_C	1081095		修正取下拉選單選項的屬性在IE不支援的問題
			    //document.all.SelectedUser.value = document.all.ddlNextUser.selectedOptions[0].value;
			    //document.all.SelectedUser2.value = document.all.ddlNextUser.selectedOptions[0].text;
				document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
                document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
				if(jf_ConfirmSave()) //是否通過儲存前必要檢查
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
		case "btSave":
			//1031120 Hank 新增檢核網址參數 科別名稱 承辦人 [1030603]
			if(CheckDl())
			{
				if(jf_ConfirmSave()) //是否通過儲存前必要檢查
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
			for(var i=0;i<document.all["dlUser"].length;i++ )
			{ 
				if(document.all["dlUser"].options[i].text == strUserTempTx)
				{
					document.all["dlUser"].selectedIndex = i;
				}
			}
			for(var i=0;i<document.all["dlSectName"].length;i++ )
			{ 
				if(document.all["dlSectName"].options[i].text == strSectNameTempTx)
				{
					document.all["dlSectName"].selectedIndex = i;
				}
			}
			//1031106 Hank 重設下拉選單selectedIndex [1030603] end
		    //1060516 Justin [1060400] 二代公文修改
			//document.all["txApplyNo"].focus();
			$('#txApplyNo').focus();
			break;
		case "btSearch":
			Page_BlockSubmit = true;
			var strArtifact = document.all.SsoArtifact.value;
			var strApplyNo = document.all["txApplyNo"].value;
			var strHttp =document.all.nHttp.value;
			var strSourceOrgno = document.all.nSourceOrgno.value;
			var	strUrl = strHttp +"EDI200.aspx?SOURCE_ORGNO="+strSourceOrgno+"&argMsgFrom=UDT100&argMsgFromId="+strApplyNo+"&SAMLart=" + strArtifact;
		    //1060516 Justin [1060400] 二代公文修改
			//jf_OpenChildWin(strUrl, "EDI200", 700, 500);
			jf_OpenChildWin(strUrl, "EDI200", 800, 600);
			break;
	    case "btFind":
			var strUrl = "";
			/*
			var strKeyCol = jf_Trim(document.all["txApplyNo"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			*/
			strUrl = "UDI100.aspx?rtnObj=lbReturnValue&MODE=1";//&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			//1031120 Hank 新增串入網址參數 科別名稱 承辦人 [1030603]
			strUrl = strUrl += "&SectName="+document.all["dlSectName_Text"].value+"&User="+document.all["dlUser_Text"].value;
		    //1060516 Justin [1060400] 二代公文修改
	        //jf_OpenChildWin(strUrl, "UDI100", 700, 500);
			Page_BlockSubmit = true;
			jf_OpenChildWin(strUrl, "UDI100", 800, 600);
			break;
		case "btPrint":
			//1031120 Hank 新增檢核網址參數 科別名稱 承辦人 [1030603]
			if(CheckDl())
			{
				Page_BlockSubmit = !jf_ConfirmSave();
			    //1060516 Justin [1060400] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPreview":
			//1031120 Hank 新增檢核網址參數 科別名稱 承辦人 [1030603]
			if(CheckDl())
			{
				Page_BlockSubmit = !jf_ConfirmSave();
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
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
	    // 新增模式需檢查鍵值是否已存在
	    /*1060821 Justin [1060400] 二代公文修改
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist("") && document.all["txApplyNo"].value !="")//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else*/
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var strControlName = "";
	
	//先檢查承辦單位/承辦人選單
	jf_DeptCheck('dlDept','dlUser');
	jf_UserCheck('dlUser');
/*	
	if (document.all["txApplyNo"].value == "")
	{
		strErrMsg += "鍵值欄位不可空白\n";
		document.all["txApplyNo"].focus();
	}
*/
	if (document.all["dlDept_Text"].value == "")
	{
		strErrMsg += "承辦單位不可空白\n";
		if(strControlName == "")
			strControlName = "dlDept_Text";
	}
	if (document.all["dlUser_Text"].value == "")
	{
		strErrMsg += "承辦人不可空白\n";
		if(strControlName == "")
			strControlName = "dlUser_Text";
	}
	if (document.all["txItemName"].value == "")
	{
		strErrMsg += "名稱不可空白\n";
		if(strControlName == "")
			strControlName = "txItemName";
	}
	if (document.all["txItemFormat"].value == "")
	{
		strErrMsg += "規格不可空白\n";
		if(strControlName == "")
			strControlName = "txItemFormat";
	}
	if (document.all["txItemMaker"].value == "")
	{
		strErrMsg += "製作者不可空白\n";
		if(strControlName == "")
			strControlName = "txItemMaker";
	}
	if (document.all["txCrtDate"].value == "")
	{
		strErrMsg += "製作日期不可空白\n";
		if(strControlName == "")
			strControlName = "txCrtDate";
	}
	if (document.all["dlMediaNo"].value == "")
	{
		strErrMsg += "媒體型式不可空白\n";
		if(strControlName == "")
			strControlName = "dlMediaNo";
	}
	if (document.all["txFileCnt"].value == "")
	{
		strErrMsg += "媒體數量不可空白\n";
		if(strControlName == "")
			strControlName = "txFileCnt";
	}
	if (document.all["txFileCls"].value == "")
	{
		strErrMsg += "分類號不可空白\n";
		if(strControlName == "")
			strControlName = "txFileCls";
	}
	if (document.all["txItemDesc"].value == "")
	{
		strErrMsg += "內容概要不可空白\n";
		if(strControlName == "")
			strControlName = "txItemDesc";
	}
	if (document.all["txItemDesc"].value.length > 300)
	{
		strErrMsg += "內容概要不可超過300個字\n";
		if(strControlName == "")
			strControlName = "txItemDesc";
	}
	if (document.all["dlSecNo"].options[document.all["dlSecNo"].selectedIndex].value!= "1")
	{
		if(jf_Trim(document.all["txRmvsecDate"].value) == "" && jf_Trim(document.all["dlRmvsecCond_Text"].value) == "")
		{
			strErrMsg += "解密日期、解密條件不可皆為空白\n";
			if(strControlName == "")
				strControlName = "txRmvsecDate";
		}
		else if(jf_Trim(document.all["txRmvsecDate"].value) != "" && jf_Trim(document.all["dlRmvsecCond_Text"].value) != "")
		{
			strErrMsg += "解密日期、解密條件僅可擇一填寫\n";
			if(strControlName == "")
				strControlName = "txRmvsecDate";
		}
	}	

	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;

	if (strControlName != "")
	    //1060516 Justin [1060400] 二代公文修改
	    //document.all[strControlName].focus();
	    $('#' + strControlName).focus();
		
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
			    //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
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
			    //1060516 Justin [1060400] 二代公文修改
			    //document.all["txAttExtFileDate"].focus();
			    $('#txAttExtFileDate').focus();
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
    //1031103 Hank 處理第二級欄位(Reference from EAM005) [1030603] start
    if (argResult.id !=null)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{	
			if(argResult.id == CallWS_ID_SECT)
			{
				if(jf_IsWebServiceSuccess(argResult))
				{			
					WSResult = argResult.value;		
					
					document.all["dlSectName_Container"].className = "";
					document.all["dlSectName"].className = "";
					document.all["dlSectName_Text"].className = "";
					
					document.all["dlSectName_Text"].value = "";
					
					while(document.all.dlSectName.options[0] != null)
					{
						document.all.dlSectName.options[0]=null;				
					}
					
					var DropListChild = document.createElement("OPTION");
					DropListChild.text = "";
					DropListChild.value = "";
					document.all.dlSectName.options.add(DropListChild);
					
					if(WSResult.SecNo.length != 0)
					{

						ClearDL(document.all["dlSectName"]);			
						
						var Blank_Data = document.createElement("OPTION");
						Blank_Data.text = "";
						Blank_Data.value = ":";				
						document.all.dlSectName.options.add(Blank_Data);
													
						for(var i=0;i<WSResult.SecNo.length;i++)
						{
							var SectDropListChild = document.createElement("OPTION");
							SectDropListChild.text = WSResult.SecName[i];
							//為了與EA_LIB.CS中Function組出元素相同，額外新增兩欄位
							SectDropListChild.value = WSResult.DeptNo[i]+":"+WSResult.DeptName[i]+":"+WSResult.SecNo[i]+":"+WSResult.SecName[i];
							document.all.dlSectName.options.add(SectDropListChild);
						}
						if(document.all["dlSectName"].options.length > 10)
						{
							document.all["dlSectName"].size = 10;
						}
						else
							document.all["dlSectName"].size = document.all["dlSectName"].options.length;
						
						document.all["dlSectName_Container"].disabled = false;

					}
					else
					{				
						while(document.all.dlSectName.options[0] != null)
						{
							document.all.dlSectName.options[0]=null;				
						}
						document.all["dlSectName_Container"].disabled = true;	

					}
				}	
			}
			else
			{
			    //1060516 Justin [1060400] 二代公文修改
			    //document.all["lbUpperClsName"].innerText = jf_Trim(argResult.value.RtnField0[0]);
			    document.all["lbUpperClsName"].textContent = jf_Trim(argResult.value.RtnField0[0]);
			}		
		}
    }    
    //1031103 Hank 處理第二級欄位(Reference from EAM005) [1030603] end
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
	    //1060516 Justin [1060400] 二代公文修改
		//document.all["txFileCls"].focus();
		$('#txFileCls').focus();
	}

	if(argCallerId == "UDI100")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all["txApplyNo"].value=document.all["lbReturnValue"].options[0].value;
		    //1060516 Justin [1060400] 二代公文修改
			document.all["H_txApplyNo"].value = document.all["lbReturnValue"].options[0].value;
		}
		if(document.all["txApplyNo"].value != "")
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
/*取得tbTool的物件*/
function GetToolbarCtrl(argId)
{
	return document.all.tbTool.getItem(argId);
	for(var i=0;i<20;i++)
	{
		var o=document.all.tbTool.getItem(i);
		if(o!=null)
		{
			alert(o.getAttribute("ID"));
			if(o.getAttribute("ID")==argId)
				return o;
		}
	}
	return null;
}

/**********************************************************************************************
  Name : function akjf_DeptCheck()
  Desc : 離開部門欄位的合理性檢查與人員欄位的連動處理
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
//1000821 Davy 調整檢核邏輯
function jf_DeptCheck(argDeptComboBoxID, argUserComboBoxID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];

	if(DeptComboBoxTextObj.value == "")
		return;

	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	var UserNameMem = DeptComboBoxTextObj.value;

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
				DeptComboBoxTextObj.value = DeptComboBoxObj.options[i].value.split(":")[1];
				break;
			}
		}
	}
	if( !checkOK )
	{
		ClearDL(UserComboBoxObj);
		DeptComboBoxTextObj.value = "";
		UserComboBoxTextObj.value = "";
		return;
	}
	/*** END ***/

	if(DeptComboBoxObj.value.split(":")[0] == UserComboBoxObj.value.split(":")[0])
		return

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

	//clear the ComboBox of User
	len = UserComboBoxObj.length;
	for( i=0 ; i<len ; i++ )
		UserComboBoxObj.remove(0);

	//add new data into the ComboBox of User
	len = resultObj.UserName.length;
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

//1000821 Davy 調整檢核邏輯
function jf_UserCheck(argUserComboBoxID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	if(UserComboBoxTextObj.value == "")
		return;
	
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
				UserComboBoxTextObj.value = UserComboBoxObj.options[i].value.split(":")[3];
				break;
			}
		}
	}
	if( !checkOK )
	{
		//1031118	Hank 新增輸入承辦人不存在時跳出警告 [1030603]
	    alert("您所輸入的承辦人不存在");
	    //1060516 Justin [1060400] 二代公文修改
	    //UserComboBoxTextObj.focus();
	    $('#' + argUserComboBoxID + "_Text").focus();
		UserComboBoxTextObj.value = "";
	}
	
	return;
	
	/*** END ***/
}

//將DropDownList裡的item清除
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;
}

//分類號OnBlur
function txFileClsOnBlur()
{
	if (document.all["txFileCls"].value != "")
	{
        //1070830 Zen 1070678 弱掃Ajax修正
        //var CheckResult = UDT100.CheckCls(document.all.nSourceOrgno.value, document.all["txFileCls"].value).value;
        var CheckResult = UD.UDT100.CheckCls(document.all.nSourceOrgno.value, document.all["txFileCls"].value).value;
		if (CheckResult.split(',')[0] == "false")
		{
			document.all["txFileCls"].value  = "";
			document.all["txClsKey"].value   = "";
			document.all["txKeepYear"].value = "";
			alert(CheckResult.split(',')[1]);
		    //1060516 Justin [1060400] 二代公文修改
			//document.all["txFileCls"].focus();
			$('#txFileCls').focus();
		}
		else
		{
			document.all["txClsKey"].value = CheckResult.split(',')[2];
			document.all["txKeepYear"].value = CheckResult.split(',')[3];
		}
	}
}

//日期格式檢查
//1060516 Justin [1060400] 二代公文修改
//function Check_DATE(obj,focus_obj)
function Check_DATE(argid, focus_obj)
{
    //1060516 Justin [1060400] 二代公文修改
    var obj = document.all[argid];
	if(obj.value != "")
	{
		obj.value = jf_PADL(obj.value,7,"0");
		
		if (!jf_CheckCDATE(obj.value))
		{
			jf_ShowMsg("輸入的日期不合法,請重新輸入","您輸入之資料有誤，明細如下，請更正後重試");
		    //1060516 Justin [1060400] 二代公文修改
		    //obj.focus();
			$('#' + argid).focus();
			Page_BlockSubmit = true;
		}
		else
		{
			if(focus_obj != null)
			{
				focus_obj.focus();
			}
		}
	}
}

function jf_CheckMaxLength(argObjName, argObj, argMaxLength)
{
	if(document.all[argObj].value.length > argMaxLength)
	{
		alert(argObjName+"不可超過"+argMaxLength+"個字");
	    //1060516 Justin [1060400] 二代公文修改
		//document.all[argObj].focus();
		$('#' + argObj).focus();
	}
	//event.keyCode = 0;
}

function jf_dlSecNoOnChange()
{
	if (document.all["dlSecNo"].value > "1")
	{
	    //1060516 Justin [1060400] 二代公文修改--S
		//document.all["btRmvsecDate"].disabled = false;
		document.all["txRmvsecDate"].disabled = false;
		//document.all["txRmvsecDate"].className = "InputFieldText";
		document.all["txRmvsecDate"].className = "DatePicker";
		document.all["dlRmvsecCond"].disabled = false;
	    //document.all["dlRmvsecCond"].className = "InputFieldText";
		document.all["dlRmvsecCond"].className = "custom-combobox";
		document.all["dlRmvsecCond_Text"].disabled = false;
	    //document.all["dlRmvsecCond_Text"].className = "InputFieldText";
		document.all["dlRmvsecCond_Text"].className = "custom-combobox";
	    //1060516 Justin [1060400] 二代公文修改--E
	}
	else
	{
		//document.all["btRmvsecDate"].disabled = true;
		document.all["txRmvsecDate"].disabled = true;
		document.all["txRmvsecDate"].className = "DisplayOnly";
		document.all["dlRmvsecCond"].disabled = true;
		document.all["dlRmvsecCond"].className = "DisplayOnly";
		document.all["dlRmvsecCond_Text"].disabled = true;
		document.all["dlRmvsecCond_Text"].className = "DisplayOnly";
		
		document.all["txRmvsecDate"].value = "";
		document.all["dlRmvsecCond_Text"].value = "";
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
//1031103 Hank 下拉選單變更事件 [1030603] start
var CallWS_ID_SECT;

//dlDept下拉選單連動(Reference from EAM005)
function SyncDL()
{	
	if (document.all["dlDept_Text"].value != "")
	{
		var strArr1 = new Array();
		var strArr2 = new Array();	
		var bAction = true;
		var bDept = false;
		var bSect = false;
		
		for ( var i = 0 ; i < document.all["dlDept"].length ; i++)
		{
			if(document.all["dlDept"].options[i].text == document.all["dlDept_Text"].value )
			{
				document.all["dlDept"].selectedIndex = i;
				document.all["H_txDept"].value = document.all["dlDept"].options[i].value.split(':')[0];
				bDept = true;
				break;
			}
		}
		
		if (!bDept)
		{
			document.all["dlDept"].selectedIndex = -1;
			document.all["dlDept_Text"].value = "";
			document.all["H_txDept"].value = "";
			alert('您所輸入之承辦單位不存在於系統中。');
		}
		
		if(document.all["dlDept"].selectedIndex != -1)
		{
			strArr1 = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');	
			document.all["H_txDept"].value = strArr1[0];
		}
		else
			bAction = false;

		//取二級單位用
		var param1 = new Array(3);
		param1[0] = false;
		param1[1] = true;
		param1[2] = strArr1[0];
		
		var RtnObjSect;	
		
		if(bAction)
		{	
			document.all["H_txSectName"].value =  "";
			RtnObjSect = jf_CallWS("../EALIB/EA_LIB.asmx","GetDepts",false,param1);
			CallWS_ID_SECT = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}

	}
	else
	{
			ClearDL(document.all["dlSectName"]);
	}

}
//dlSectName下拉選單連動(Reference from EAM005)
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
		    //1060516 Justin [1060400] 二代公文修改
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
	    //1060516 Justin [1060400] 二代公文修改
		//document.all["dlDept_Text"].focus();
		$('#dlDept_Text').focus();
	}
	jf_SectNameCheck('dlSectName','dlUser');
}

//將DropDownList裡的item清除 (Reference from EAM005)
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
			document.all["H_txDept"].value = document.all["dlDept"].options[i].value.split(':')[0];
			bDept = true;
			break;
		}
	}
	
	if (!bDept)
	{
		CheckFlag=false;
		document.all["dlDept"].selectedIndex = -1;
		//document.all["dlDept_Text"].value = "";
		document.all["H_txDept"].value = "";
		alert('您所輸入之承辦單位不存在於系統中。');
	}
	
	//Sect
	var bSect = false;
	
    //1061031 Justin [1060400] 無二級單位時不須檢核是否存在於選單中
	if (document.all["dlSectName_Text"].value == "")
	    bSect = true;
	else
	{
	    for (var i = 0 ; i < document.all["dlSectName"].length ; i++)
	    {
	        if (document.all["dlSectName"].options[i].text == document.all["dlSectName_Text"].value)
	        {
	            document.all["dlSectName"].selectedIndex = i;
	            document.all["H_txSectName"].value = document.all["dlSectName"].options[i].value.split(':')[2];
	            bSect = true;
	            break;
	        }
	    }
	}
	
	if (!bSect)
	{
		CheckFlag=false;
		document.all["dlSectName"].selectedIndex = -1;
		//document.all["dlSectName_Text"].value = "";
		document.all["H_txSectName"].value = "";
		alert('您所輸入之承辦科別不存在於該承辦單位下。');
	    //1060516 Justin [1060400] 二代公文修改
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