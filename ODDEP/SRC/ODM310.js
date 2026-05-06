/*
Date        SA      PG      NO          DESC
1050718     David   Zen     1050087     二代公文修改
1060518 Leslie  Zen     1060215         innerText相關修改1070913     Kevin   Justin  1070678     若掃修正CookieHttpOnly*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050720 Zen 1050087  二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050720 Zen 1050087  二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
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
		case "btStep":
		    Page_BlockSubmit=true;
		    /*1070913 Justin [1070678]若掃修正CookieHttpOnly
			var strBTypeNo = document.all["txBTypeNo"].value;
			jf_SaveCookie("argBTypeNo",strBTypeNo);
			var ret = jf_ShowModal("ODM313.htm", 480, 420 );
			jf_SaveCookie("argBTypeNo","");
			document.all["txTotalLeadTime"].value = GetReturnValue(ret);*/
			break;
		case "btPty":
			Page_BlockSubmit=true;
			//0990319	Howard	0990167	修正點選設定時，帶入類別代碼及設定可使用之單位代碼
			//var strUrl = "../ODM310C1.aspx?Return=true";
			var strBTypeNo = document.all["txBTypeNo"].value;
			var strUseDept = document.all["txHideDept"].value;
			var strOrgNo =	document.all["SourceOrgNo"].value;
			var strUrl = "ODM310C1.aspx?Return=true&argOrgNo="+strOrgNo+"&argTypeNo="+strBTypeNo+"&argUseDept="+strUseDept;
			jf_OpenChildWin(strUrl, "ODM310", 660, 400 );
			break;
		case "btCleanText":
			Page_BlockSubmit=true;
			document.all.txUseDept.value = "";
			document.all.txHideDept.value = "";
			break;
	}	
}

//1050720 Zen 1050087  二代公文修改
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
	
    //1050720 Zen 1050087  二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050720 Zen 1050087  二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050720 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050720 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050720 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			document.all["ddLTBy"].selectedIndex = 0;
			document.all["txLeadTime"].value = "0";
			document.all["txLeadTime"].disabled = true;
			document.all["txTotalLeadTime"].value = "0";
			document.all["ddLTUOM"].selectedIndex = 0;
			document.all["ddLTUOM"].disabled = true;
			document.all["cbUDIssue"].checked = true;
			document.all["cbUDClose"].checked = true;
			document.all["cbUDOverDue"].checked = true;
			document.all["rbTotal"].checked = true;
		    //1050720 Zen 1050087  二代公文修改
			//document.all["txBTypeNo"].focus();
			$('#txBTypeNo').focus();
			//0991127	Howard	0990696	加入申復案及查登類別
			document.all["snApply"].style.display = "none";
			document.all["txApplyType"].value = "";
			document.all["cbPreMark"].checked = false;
			break;
		case "btSearch":
		    //1050720 Zen 1050087  二代公文修改
		    Page_BlockSubmit = true;
		    var strUrl = "";
			var strBTypeNo = document.all["txBTypeNo"].value;
			strUrl = "ODI310.aspx?rtnObj=lbReturnValue&argBTypeNo="+strBTypeNo;
			//0990319	Howard	0990166	修正開啟畫面長度
			//jf_OpenChildWin(strUrl, "ODI310", 480, 370 );
			jf_OpenChildWin(strUrl, "ODI310", 800, 600 );
			break;		
	}
}

function CallBack(argCallerId)
{
	if (argCallerId == "ODI310")
	{
		document.all["txBTypeNo"].value = document.all.lbReturnValue.options[0].text;
		Page_BlockSubmit = false;
	    //1050720 Zen 1050087  二代公文修改
		//jf_OpenButtonSubmit();
		jf_ToolBarSubmit("btOpen");
	}
	else if(argCallerId == "ODM310C1")
	{
		var Cnt = document.all["lbReturnValue"].options.length;
		var strBusi  = "";
		var strPty  = "";
		var strTempBusi  = "";
		var strTempPty  = "";
		var strTempPtyName = "";
		var strTemp = "";

		for(var n = 0; n < Cnt; n++)
		{
			if(n != 0)
				strTemp = ",";
			strPty += strTemp + "("+ jf_Trim(document.all.lbReturnValue.options[n].value)+")";
			strPty += jf_Trim(document.all.lbReturnValue.options[n].text);
			strTempPty += jf_Trim(document.all.lbReturnValue.options[n].value) + ",";
			strTempPtyName += jf_Trim(document.all.lbReturnValue.options[n].text) + ",";
		}
		document.all["txUseDept"].value = strPty;
		document.all["txHideDept"].value = strTempPty;
		document.all["txHideDeptName"].value = strTempPtyName;
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    ShowMsg();
    //1050720 Zen 1050087  二代公文修改
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//0991127	Howard	0990696	加入申復案及查登類別
	ddDocPropertyOnchange();

    //1050720 Zen 1050087  二代公文修改
	if(document.all.dlDept.getAttribute('class') == "hide")
	    document.all.dlDept_Container.style.display = "none"
}

function OnWSResult(argResult)
{
    
    	//webserver回傳後動作
    	//檢查回傳的webserverID
    	/*//範例
    	if (argResult.id == wsGetGrpNameID)
    	{
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["txGrp_Name"].value = argResult.value.RtnField0[0];
		}
		else
		{
			document.all["txGrp_Name"].value = "";
			document.all["txGrp_No"].focus();
		}
	}
	*/
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
		{
			// 新增模式需檢查鍵值是否已存在
			if (jf_GetActionMode()==LayoutModeNew)
			{
				if(jf_CheckDataExist(""))//檢查鍵值是否已存在
				{
					if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
						bRtnbool = true;
					else
					{
						bRtnbool = false;
						//alert("此筆資料已存在，無法新增。");
					}
				}
				else
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
	var bRtnbool = true;
	var Msg = "";
	if (document.all["txBTypeName"].value == "")
	{
		bRtnbool = false;
		Msg = "業務類別代號欄位不可為空白。";
	}	
	if (document.all["txProvider"].value == "")
	{
		bRtnbool = false;
		Msg += (Msg != "") ? "\n案件系統代號欄位不可為空白。" : "案件系統代號欄位不可為空白。";
	}	
	if (document.all["ddDocProperty"].selectedIndex <= 0)
	{
		bRtnbool = false;
		Msg += (Msg != "") ? "\n公文性質欄位不可為空白。" : "公文性質欄位不可為空白。";
	}	
	if (document.all["ddSumType"].selectedIndex <= 0)
	{
		bRtnbool = false;
		Msg += (Msg != "") ? "\n時效統計類別欄位不可為空白。" : "時效統計類別欄位不可為空白。";
	}
	if (document.all["ddLTBy"].selectedIndex == 2 || document.all["ddLTBy"].selectedIndex == 3)
	{
		if (document.all["rbTotal"].checked)
		{
			if (document.all["txLeadTime"].value == "0" || document.all["txLeadTime"].value == "")
			{
				bRtnbool = false;
				Msg += (Msg != "") ? "\n處理期限天數必須大於０。" : "處理期限天數必須大於０。";
			}
		}
		else if (document.all["rbStep"].checked)
		{
			if (document.all["txTotalLeadTime"].value == "0" || document.all["txTotalLeadTime"].value == "")
			{
				bRtnbool = false;
				Msg += (Msg != "") ? "\n處理期限天數必須大於０。" : "處理期限天數必須大於０。";
			}
		}
	}
	if (Msg != "")
		alert(Msg);	
	
	return bRtnbool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = false;
	
	return bRtnbool;
}

//處理期限方式變更時的處理
function fnLTBY_OnChange()
{
	var ltby = document.all.ddLTBy.options[document.all.ddLTBy.selectedIndex].value;
	if (ltby == "I" || ltby == "S")
	{
		document.all.txLeadTime.disabled = true;
		document.all.ddLTUOM.disabled = true;
	}
	else
	{
		document.all.txLeadTime.disabled = false;
		document.all.ddLTUOM.disabled = false;
	}
}

//取出回傳值過濾掉undefined(透過ShowModal)
function GetReturnValue(argRet)
{
	//若沒有回傳值(直接關掉ODM313)，則帶回原數值
	if (argRet == "")
		return document.all["txTotalLeadTime"].value;
	if (argRet == undefined)
		return document.all["txTotalLeadTime"].value;
	return argRet;
}
//0991123	Howard	0990695	設定辨理期限及使用日數之連動
function fnLtDateOnClick()
{
	if(document.all["rbHd"].checked)
	{
		document.all["cbUDINCHD"].checked = true;
		document.all["cbExtIncHd"].checked = true;
	}
	else
	{
		document.all["cbUDINCHD"].checked = false;
		document.all["cbExtIncHd"].checked = false;
	}
}
//0991127	Howard	0990696	加入申復案及查登類號
function ddDocPropertyOnchange()
{
	var index = document.all["ddDocProperty"].selectedIndex;
	//若為人民申請案件時
	if(document.all["ddDocProperty"].options[index].value== "5")
	{
		document.all["snApply"].style.display = "";
	}
	else
	{
		document.all["snApply"].style.display = "none";
		document.all["txApplyType"].value = "";
		document.all["cbPreMark"].checked = false;
	}
}
//0991123	Howard	0990695 設定案件辦理情形與補件天數之連動 -目前暫無使用故Mark
/*
function fnCaseFlowSet()
{
	if(document.all["cbCaseFlow"].checked)
	{
		document.all["txWt1"].disabled = false;
		document.all["txWt2"].disabled = false;
		document.all["txWt3"].disabled = false;
		document.all["txExt1"].disabled = false;
		document.all["txExt2"].disabled = false;
		document.all["txExt3"].disabled = false;
	}
	else
	{
		//設定啟用補件天數為Enable，且清空補件天數欄位
		document.all["txWt1"].disabled = true;
		document.all["txWt1"].value = "";
		document.all["txWt2"].disabled = true;
		document.all["txWt2"].value = "";
		document.all["txWt3"].disabled = true;
		document.all["txWt3"].value = "";
		document.all["txExt1"].disabled = true;
		document.all["txExt1"].value = "";
		document.all["txExt2"].disabled = true;
		document.all["txExt2"].value = "";
		document.all["txExt3"].disabled = true;
		document.all["txExt3"].value = "";
	}
}
*/