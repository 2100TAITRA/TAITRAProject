/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期	    SA	     	PG          單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 1060323  Cloud       Zen         1050087     二代公文修改
 * 1070830  Kevin       Zen         1070678 弱掃Ajax修正
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

//1060323 Zen 1050087 二代公文修改
//if (document.all.tbTool)
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
    //1060323 Zen 1050087 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060323 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060323 Zen 1050087 二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
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

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060323 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1060323 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	    //1060323 Zen 1050087 二代公文修改
	    //case "btOpen":
		//	Page_BlockSubmit = !jf_CheckKeyObject();
		//	jf_ToolBarSubmit();
		//	break;
		case "btSave":
			if(jf_CheckBeforSave()) //是否通過儲存前必要檢查
			{
                //1070830 Zen 1070678 弱掃Ajax修正
                //var GetNum = EAT009.GetAlterNum(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
                var GetNum = EA01.EAT009.GetAlterNum(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
				if (GetNum == "0")
				{
					alert("無公文需要調整。");
					Page_BlockSubmit = true;
				}
				else
				{
					if (!window.confirm("此次調整將調整"+GetNum+" 筆公文之保存年限及擬銷毀日期，確定要繼續？"))
					{
						Page_BlockSubmit = true;
					}
					else
					{
						IsServerHandling = true;
						jf_ShowWaitState();	
						Page_BlockSubmit = false;					
					}
				}
			}
			else
				Page_BlockSubmit = true;
		    //1060323 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	    //1060323 Zen 1050087 二代公文修改
	    //case "btDelete":
		//	Page_BlockSubmit = !jf_ConfirmDelete();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btCancel":
		//	Page_BlockSubmit = !jf_ConfirmCancel();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btClean":
		//	Page_BlockSubmit = true;
		//	jf_ConfirmClean(true);
		//	document.all["txKeyFld"].focus();
		//	break;
		//case "btSearch":
		//	/*
		//	var strUrl = "";
		//	var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
		//	var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
		//	var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
		//	var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
		//	strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
		//	jf_OpenChildWin(strUrl, "SII020", 700, 500 );
		//	*/
		//	break;
		//case "btPrint":
		//	Page_BlockSubmit = !jf_ConfirmPrint();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btPreview":
		//	Page_BlockSubmit = !jf_ConfirmPreview();
		//	jf_ToolBarSubmit();
		//	break;
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
		/*if (jf_GetActionMode()==LayoutModeNew)
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
			bRtnbool = true;*/
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txVerNo"].value == "")
	{
		strErrMsg += "版本別欄位不可空白\n";
	    //1060323 Zen 1050087 二代公文修改
		//document.all["txVerNo"].focus();
		$('#txVerNo').focus();
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
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	if(argCallerId == "EAC004")
	{
		document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);		
		txVeronBlur();
	}
		
	if(argCallerId == "EAC005")
	{		
		if ( document.all["txFileCls"] != null )		
			document.all["txFileCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		//Cola 新增帶回 板本別 -- start
		if ( document.all["txVerNo"] != null )			
			document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);				
		//Cola -- end --			
		if ( document.all["lbFILE_CLS1"] != null )			
			document.all["lbFILE_CLS1"].value = jf_Trim(document.all.lbReturnValue.options[6].value);

		txFileClsOnBlur();

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
function txVeronBlur()
{
	if (document.all["txVerNo"].value != "")
	{
		if (document.all["txFileCls"].value =="")
		{
            //1070830 Zen 1070678 弱掃Ajax修正
            //var CheckResult = EAT009.CheckVer(document.all["txVerNo"].value, document.all["txOrgNo"].value, "").value;
            var CheckResult = EA01.EAT009.CheckVer(document.all["txVerNo"].value, document.all["txOrgNo"].value, "").value;
			if (CheckResult.split(',')[0] == "false")
			{
				document.all["txVerNo"].value = "";
				document.all["txKeepYear"].value = "";
				alert(CheckResult.split(',')[1]);
			    //1060323 Zen 1050087 二代公文修改
			    //document.all["txVerNo"].focus();
				$('#txVerNo').focus();
			}
		}
		else
		{
            //1070830 Zen 1070678 弱掃Ajax修正
            //var CheckResult = EAT009.CheckVer(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
            var CheckResult = EA01.EAT009.CheckVer(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
			if (CheckResult.split(',')[0] == "false")
			{
				document.all["txVerNo"].value = "";
				document.all["txKeepYear"].value = "";
				alert(CheckResult.split(',')[1]);
			    //1060323 Zen 1050087 二代公文修改
			    //document.all["txVerNo"].focus();
				$('#txVerNo').focus();
			}
			else if (CheckResult.split(',')[0] == "true")
			{
				document.all["txKeepYear"].value = CheckResult.split(',')[1];//帶出保存年限
				document.all["lbFILE_CLS1"].value = CheckResult.split(',')[2];//帶出類別名
			}
		}
	}
	else
		document.all["txKeepYear"].value = "";	
}
function txFileClsOnBlur()
{
	if (document.all["txFileCls"].value != "")
	{
		if (document.all["txVerNo"].value =="")
		{
            //1070830 Zen 1070678 弱掃Ajax修正
            //var CheckResult = EAT009.CheckCls(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
            var CheckResult = EA01.EAT009.CheckCls(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
			if (CheckResult.split(',')[0] == "false")
			{
				if (CheckResult.split(',')[1] == "無此分類號，請重新輸入，或點選查詢子視窗查詢分類號。")
				{
					document.all["txFileCls"].value = "";
					document.all["lbFILE_CLS1"].value = "";
					alert(CheckResult.split(',')[1]);
				    //1060323 Zen 1050087 二代公文修改
					//document.all["txFileCls"].focus();
					$('#txFileCls').focus();
				}
				else
				{
					document.all["lbFILE_CLS1"].value = "";
					alert(CheckResult.split(',')[1]);				
				    //1060323 Zen 1050087 二代公文修改
				    //document.all["txVerNo"].focus();
					$('#txVerNo').focus();
				}
				document.all["txKeepYear"].value = "";
			}
			else
			{
				document.all["txKeepYear"].value = CheckResult.split(',')[1];//帶出保存年限
				document.all["lbFILE_CLS1"].value = CheckResult.split(',')[2];//帶出類別名
				document.all["txVerNo"].value = CheckResult.split(',')[3];//帶出版別
			}
		}
		else
		{
            //1070830 Zen 1070678 弱掃Ajax修正
            //var CheckResult = EAT009.CheckCls(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
            var CheckResult = EA01.EAT009.CheckCls(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
			if (CheckResult.split(',')[0] == "false")
			{
				document.all["txFileCls"].value = "";
				document.all["lbFILE_CLS1"].value = "";
				document.all["txKeepYear"].value = "";
				alert(CheckResult.split(',')[1]);
			    //1060323 Zen 1050087 二代公文修改
			    //document.all["txFileCls"].focus();
				$('#txFileCls').focus();
			}
			else if (CheckResult.split(',')[0] == "true")
			{
				document.all["txKeepYear"].value = CheckResult.split(',')[1];//帶出保存年限
				document.all["lbFILE_CLS1"].value = CheckResult.split(',')[2];//帶出類別名
			}
		}
	}
	else
	{
		document.all["txKeepYear"].value = "";
		document.all["lbFILE_CLS1"].value = "";
	}
}
function ibCls_Onclick()
{
	var strVerNo = document.all["txVerNo"].value;

	Page_BlockSubmit=true;			
	var strUrl = "EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAT009" + "&VER_NO=" + strVerNo+"&MODE=1";
    //1060323 Zen 1050087 二代公文修改
	//jf_OpenChildWin(strUrl, "EAT009", 700, 500);
	jf_OpenChildWin(strUrl, "EAT009", 800, 600);
}
function ibVer_Onclick()
{
	Page_BlockSubmit=true;	
	var strUrl = "EAC004.aspx";
    //1060323 Zen 1050087 二代公文修改
	//jf_OpenChildWin(strUrl, "EAT009", 700, 500);
	jf_OpenChildWin(strUrl, "EAT009", 800, 600);
}
