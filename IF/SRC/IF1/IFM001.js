/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2011.10.03	CLOUD	  1000539	新增程式
 * 105.07.18    Justin    1050087   二代公文修改
 * 1051019		Joe		  1050087	二代修改配合行動平台
 * 1070803		Joe		  1070678	修正弱掃Client Cookies Inspection
 * 1070905		Joe		  1070678	修改弱掃Client Cookies Inspection前次錯誤
 * 1150206		Andy	  序63		修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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


/*1050718 Justin 1050087 二代公文修改 
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/
var UserId = "";
var UserName = "";
/*if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	if(document.all["H_CheckOrgMgr"].value=="1")
	{
	  alert("非系統管理人員或機關管理人員，不可進行機關資訊維護，本作業將於確認後關閉");
	  window.close();
	}
	CheckName();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
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
//1050718 Justin 1050087 二代公文修改 
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
	
    //1050718 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050718 Justin 1050087 二代公文修改 
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
		    //1050718 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050718 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050718 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1050718 Justin 1050087 二代公文修改 
			//document.all["txSourceOrgno"].focus();
			$('#txSourceOrgno').focus();
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
	
	if (jf_Trim(document.all["txSourceOrgno"].value) == "")
	{
		strErrMsg += "機關代碼不可空白\n";
	    //1050718 Justin 1050087 二代公文修改 
	    //document.all["txSourceOrgno"].focus();
		$('#txSourceOrgno').focus();
	}
	
	if (jf_Trim(document.all["txMissionOgrName"].value) == "")
	{
	    strErrMsg += "機關名稱不可空白\n";
	    //1050718 Justin 1050087 二代公文修改 
	    //document.all["txMissionOgrName"].focus();
	    $('#txMissionOgrName').focus();
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
    //1050718 Justin 1050087 二代ShowModalDialog修改，行為改成與window.open() 相似，都由CallBack()負責取得回傳值與執行後續行為
    if (argCallerId == "IFC021") {
        if (IsRationalValue(document.all["lbReturnValue"].options)) {
            document.all[UserId].value = document.all.lbReturnValue.options[0].value;
            document.all[UserName].value = document.all.lbReturnValue.options[2].value;
            UserId = "";
            UserName = "";
            //修改showmodaldialog開啟視窗，清除Cookie
            jf_SaveCookie("iic021OrgNo", "");
        }
    }
    //1050718 Justin 1050087 二代ShowModalDialog修改--END--
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}
//1050718 Justin 1050087 二代ShowModalDialog修改
function IsRationalValue(val) {
    if (val == undefined)
        return false;
    if (val == null)
        return false;
    return true;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckName()//檢核帳號是否輸入重複以及以帳號帶出使用者名字
{
	var nUSERno;
	for(var Index=2;Index<= document.all.dg1.rows.length; Index++)
	{
		if(Index==2)
		{
			nUSERno=1;
			document.all["H_ORGMGR1"].value=(document.all["dg1__ctl" + Index + "_txUserName"].value).toUpperCase();
			
			GetEmpName(nUSERno,Index);
		}
		if(Index==3)
		{ nUSERno=2;
			document.all["H_ORGMGR2"].value=(document.all["dg1__ctl" + Index + "_txUserName"].value).toUpperCase();
			
			if(document.all["H_ORGMGR2"].value!="" && document.all["H_ORGMGR1"].value!="")
			{
				if(document.all["H_ORGMGR2"].value==document.all["H_ORGMGR1"].value || document.all["H_ORGMGR2"].value==document.all["H_ORGMGR3"].value)
				{
				    //1050718 Justin 1050087 二代公文修改
				    //document.all["dg1__ctl" + Index + "_txUserName"].focus();
				    $('#dg1__ctl' + Index + '_txUserName').focus();
					alert("輸入帳號重複");
					return;
				}
			}
			GetEmpName(nUSERno,Index);
			
		}
		if(Index==4)
		{ nUSERno=3;
			document.all["H_ORGMGR3"].value=(document.all["dg1__ctl" + Index + "_txUserName"].value).toUpperCase();
		
			if(document.all["H_ORGMGR3"].value!="" && document.all["H_ORGMGR2"].value!="" && document.all["H_ORGMGR1"].value!="")
			{
				if(document.all["H_ORGMGR3"].value==document.all["H_ORGMGR2"].value || document.all["H_ORGMGR3"].value==document.all["H_ORGMGR1"].value)
				{
				    //1050718 Justin 1050087 二代公文修改
				    //document.all["dg1__ctl" + Index + "_txUserName"].focus();
				    $('#dg1__ctl' + Index + '_txUserName').focus();
					alert("輸入帳號重複");
					return;
				}
			}
			GetEmpName(nUSERno,Index);
		}
		
	}
	
}
function GetEmpName(nUSERno,Index)//取得帳號擁有者名字
{
 if(nUSERno==1)
 {
	if(document.all["dg1__ctl" + Index + "_txUserName"].value=="")
	{
		document.all["dg1__ctl" + Index + "_txEmpName"].value=""
		return;
	}
	for(var i=0 ; i<document.all["H_dlUSERNAME"].options.length;i++)
	{
	    if(document.all["H_ORGMGR1"].value==document.all["H_dlUSERNAME"].options[i].value)
	    {	
			document.all["dg1__ctl" + Index + "_txEmpName"].value=document.all["H_dlUSERNAME"].options[i].text;
			return;
		}
	}
  }
  if(nUSERno==2)
 {
	if(document.all["dg1__ctl" + Index + "_txUserName"].value=="")
	{
		document.all["dg1__ctl" + Index + "_txEmpName"].value=""
		return;
	}
	for(var i=0 ; i<document.all["H_dlUSERNAME"].options.length;i++)
	{
	    if(document.all["H_ORGMGR2"].value==document.all["H_dlUSERNAME"].options[i].value)
	    {	
			document.all["dg1__ctl" + Index + "_txEmpName"].value=document.all["H_dlUSERNAME"].options[i].text;
			return;
		}
	}
  }
  if(nUSERno==3)
 {
	if(document.all["dg1__ctl" + Index + "_txUserName"].value=="")
	{
		document.all["dg1__ctl" + Index + "_txEmpName"].value=""
		return;
	}
	for(var i=0 ; i<document.all["H_dlUSERNAME"].options.length;i++)
	{
	    if(document.all["H_ORGMGR3"].value==document.all["H_dlUSERNAME"].options[i].value)
	    {	
			document.all["dg1__ctl" + Index + "_txEmpName"].value=document.all["H_dlUSERNAME"].options[i].text;
			return;
		}
		
	}
  }
}
function jf_SetOccupant(argTextBoxId1,argTextBoxId2)
{
	var selectType = "'Account'";
	//var ret = jf_ShowOrgDialogForPerson("0");
	var ActiveSource = jf_Trim(document.all["txSourceOrgno"].value);
	if(ActiveSource="")
	{alert("尚未輸入機關代碼");
					return;}
    /*1050718 Justin 1050087 二代ShowModalDialog修改
	var ret = jf_ShowOrgDialogForPersonWithOrgNo(document.all["txSourceOrgno"].value);
	if(ret!=null)
	{
		
		document.all[argTextBoxId1].value=ret.Name;
		document.all[argTextBoxId2].value=ret.Code;
	}*/
	UserName = argTextBoxId1;
	UserId = argTextBoxId2;
	jf_ShowOrgDialogForPersonWithOrgNo(document.all["txSourceOrgno"].value);
}
function jf_DeleteOccupant(argTextBoxId,argIdx)
{
	//document.all.lbRoleOccupant.options[argIdx].text='';
	document.all[argTextBoxId].value="";
	//document.all[argTextBoxId].previousSibling.previousSibling.value = "";
}
function jf_ShowOrgDialogForPersonWithOrgNo(argOrgNo)
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
    /*1050718 Justin 1050087 二代ShowModalDialog修改
	var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	return ret;*/
	jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
}
function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo)
{
	var sSelectType = "";
	for(var i=0; i<argSelectType.length; i++)
	{
		if(i != 0)
			sSelectType += ",";
		//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
		//sSelectType += "'" + argSelectType[i] + "'";
		sSelectType += argSelectType[i];
	}
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--S
	//jf_SaveCookie("iic021StrctureType", argParam);
	//_SaveCookie("iic021SelectType"	, sSelectType);
	//if(argOrgNo)
		//jf_SaveCookie("iic021OrgNo"	, argOrgNo);
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--E
    /*1050718 Justin 1050087 二代ShowModalDialog修改
    var ret = fnOpen("IFC021.htm", "288", "470");*/
	Page_BlockSubmit = true;
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//jf_ShowModal("IFC021.aspx" + GetAllParamStr(), "288", "470");
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--S
	if (argOrgNo)
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "288", "470");
		jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo);
	else
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--E
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType, "288", "470");
		jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType);
	//清除Cookie
	//if(argOrgNo)
	//	jf_SaveCookie("iic021OrgNo"	, "");
    /*1050718 Justin 1050087 二代ShowModalDialog修改
	return ret;*/
}
/*1050718 Justin 1050087 二代ShowModalDialog修改
function fnOpen(arg,argW,argH)
{
   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
   var ret = window.showModalDialog(arg, "", sFeatures);
   return ret;
}*/