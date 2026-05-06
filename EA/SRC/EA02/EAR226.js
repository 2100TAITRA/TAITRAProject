/*
DATE		SA			PRG		MGR_NO			DESC
1010809		Leslie		Cloud	1010370		依FDA需求修改畫面及新增報表
1020529		Kevin		Jagle	1000751			配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
1060330		Cloud		Joe		1050087		二代公文修改
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

//1060330	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
	
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	for(var i=0;i<document.all["RptType"].length;i++)
	{
		if(document.all["RptType"][i].checked)
			document.all["RptType"][i].click();
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060330	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060330	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
		//1060330	Joe		1050087		二代公文修改--S
		// case "ibFileDateS":
			// Page_BlockSubmit = true;
			// jf_CallCalendar(document.all["txDateS"], event.screenX, event.screenY);
			// break;
		// case "ibFileDateE":
			// Page_BlockSubmit = true;
			// jf_CallCalendar(document.all["txDateE"], event.screenX, event.screenY);
			// break;
		//1060330	Joe		1050087		二代公文修改--E
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060330 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060330 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	//1060330 Joe 1050087 二代公文修改，jf_CheckBeforSave已檢核
	// window.event.srcNode.focus();	//用於觸發日期檢核
		
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":		
			Page_BlockSubmit = !jf_CheckBeforSave();
			//1060330 Joe 1050087 二代公文修改
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
	
	if($$("rbDate").checked)
	{
		$$("txDateS").value = jf_Trim($$("txDateS").value);
		$$("txDateE").value = jf_Trim($$("txDateE").value);
		if ($$("txDateS").value == "" && $$("txDateE").value == "")
		{
			strErrMsg += "日期區間不可均為空白\n";
			//1060330	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txDateS"].focus();
			$('#txDateS').focus();
		}
		else
		{
			if($$("txDateS").value != "")
			{
				bRtnbool = DateOnblueCheck("txDateS","");
				if(!bRtnbool)
					return bRtnbool;
			}
			
			if($$("txDateE").value != "")
			{
				bRtnbool = DateOnblueCheck("txDateE","");
				if(!bRtnbool)
					return bRtnbool;
			}
			
			if($$("txDateS").value == "")
				$$("txDateS").value = $$("txDateE").value;
			if($$("txDateE").value == "")
				$$("txDateE").value = $$("txDateS").value;	
		}		
	}
	
	if($$("rbMonth").checked)
	{
		$$("txMonS").value = jf_Trim($$("txMonS").value);
		$$("txMonE").value = jf_Trim($$("txMonE").value);
		if ($$("txMonS").value == "" && $$("txMonE").value == "")
		{
			//1010809	Cloud	[1010370] 依FDA需求修改畫面及新增報表
			//1020529	Jagle	[1000751]	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
			//if(document.all.H_SourceNo.value=="327220000I")
			if(document.all.H_OrgNickName.value=="FDA")
			strErrMsg += "年報欄位不可為空白\n";
			else
			strErrMsg += "季(年)報區間不可均為空白\n";
			//1060330	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txMonS"].focus();
			$('#txMonS').focus();
		}
		else
		{
			if($$("txMonS").value != "")
			{
				bRtnbool = DateOnblueCheck("txDateS","");
				if(!bRtnbool)
					return bRtnbool;
			}
			
			if($$("txMonE").value != "")
			{
				bRtnbool = DateOnblueCheck("txDateE","");
				if(!bRtnbool)
					return bRtnbool;
			}
			
			if($$("txMonS").value == "")
				$$("txMonS").value = $$("txMonE").value;
			if($$("txMonE").value == "")
				$$("txMonE").value = $$("txMonS").value;
		}
	}
	
	if($$("rbDetail").checked)
	{
		$$("txMonth").value = jf_Trim($$("txMonth").value);
		if ($$("txMonth").value == "")
		{
			strErrMsg += "月份欄位不可為空白\n";
			//1060330	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txMonth"].focus();
			$('#txMonth').focus();
		}
		else
		{
			bRtnbool = DateOnblueCheck("txMonth","");
			if(!bRtnbool)
				return bRtnbool;
		}
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
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_RptTypeChange(argDefaultName)
{
	//1010809	Cloud	[1010370]	[FDA]為FDA新增客製化報表，畫面
	//1020529	Jagle	[1000751]	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
	//if(document.all.H_SourceNo.value=="327220000I")
	if(document.all.H_OrgNickName.value=="FDA")
	{
		SetText($$("txMonS"),false);
		//1060330	Joe	1050087	二代系統升級
		// document.all.LINE.className="HIDE"
		// document.all.LINE2.className="HIDE"
		document.all.LINE.className="hide"
		document.all.LINE2.className="hide"
		return;
	}
		
	//1060330	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	if(document.all.rbDetail.checked == true)
		xObjectName = "rbDetail";
	if(document.all.rbMonth.checked == true)
		xObjectName = "rbMonth";
	if(document.all.rbDate.checked == true)
		xObjectName = "rbDate";

	if(xObjectName == "")
		xObjectName = argDefaultName;
	var bDetail = true,bMonth = true,bDate = true;
	switch(xObjectName)
	{
		case "rbDetail":
				bDetail = false;
			break;
		case "rbMonth":
				bMonth = false;
			break;
		case "rbDate":
				bDate = false;
			break;
	}
	Set_rbDetailText(bDetail);
	Set_rbMonthText(bMonth);
	Set_rbDateText(bDate);
}
function $$(argName)
{
	return document.getElementById(argName);
}

function Set_rbDetailText(bReadOnly)
{
	SetText($$("txMonth"),bReadOnly);
	if(!bReadOnly)
		//1060330	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txMonth"].focus();
		$('#txMonth').focus();
}

function Set_rbMonthText(bReadOnly)
{
	SetText($$("txMonS"),bReadOnly);
	SetText($$("txMonE"),bReadOnly);
	if(!bReadOnly)
		//1060330	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txMonS"].focus();
		$('#txMonS').focus();
}

function Set_rbDateText(bReadOnly)
{
	SetText($$("txDateS"),bReadOnly);
	SetText($$("txDateE"),bReadOnly);
	//1060330	Joe	1050087	二代系統升級
	// $$("ibFileDateS").disabled = bReadOnly;
	// $$("ibFileDateE").disabled = bReadOnly;
	if(!bReadOnly)
		//1060330	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txDateS"].focus();
		$('#txDateS').focus();
}

function SetText(argObj,bReadOnly)
{
	argObj.readOnly = bReadOnly;
	//1060330	Joe	1050087	二代系統升級
	var strClassName = "";
	if(bReadOnly)
	{
		//1060330	Joe	1050087	二代系統升級
		// argObj.className = "displayOnly";
		strClassName = "DisplayOnly";
		argObj.value = "";
	}
	else
		//1060330	Joe	1050087	二代系統升級--S
		// argObj.className = "InputFieldText";
		strClassName = "InputFieldNumeric";
		
	if(argObj.id == "txDateS" && argObj.id == "txDateE")
		strClassName += " DatePicker";
	argObj.className = strClassName;
	//1060330	Joe	1050087	二代系統升級--E
}


function DateOnblueCheck(argObj,strMsg)
{
	var objDate = $$(argObj);
	var strDate = objDate.value;
	if (strDate != "")
	{
		if (strDate.length < 7 && objDate.MaxLength == 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			objDate.value = strDate;
		}
		else
		{
			objDate.value = jf_PADL(strDate,5,'0');
			strDate = objDate.value+"01";
		}
		if (!jf_CheckCDATE(strDate))
		{
			//1060330	Joe	1050087	二代系統升級，調整focus寫法
			// objDate.focus();
			$('#' + objDate.id).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			return false;
		}
	}
	return true;
}