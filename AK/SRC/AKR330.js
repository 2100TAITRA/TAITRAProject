 // 程式修改歷程 Latest Updated by Andy 2006.10.16
 // -------------------------------------------------------------------------------------------------
 // 日期			修改人	單號	概要
 // -------------------------------------------------------------------------------------------------
 // 2007.12.10	Cola	0960140	修改選擇二級單位時，點選預覽會出現『無此範圍資料』之問題
 // 2008.3.11	Cola	0960332	新增功能鍵『編卷』，專門負責編卷，不負責列印
 // 2008.3.11	Cola	0970146	承辦單位部份依點收人員可負責之單位帶出 
 // 2017.03.20	Kevin_C	1050087	升二代
// 1070830      Zen     1070678 弱掃Ajax修正
// 1090304		Kevin_C	1081156	修正二級單位隱藏後就不再顯示的問題// 1100204      Zen     1090927 取消使用document.activeElement
// 1110411			Cloud	1110215	修正清除後會將併件勾選問題
 
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060320	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//[0960140]Add by Cola 判斷是否為二層式登記桌
var OD_FLOW_TYPE = document.all["OD_FLOW_TYPE"].value;
	
//[0960140]Add by Cola dlSect依據相關數值判斷是否顯示
//if(document.all["dlSect_Text"].value == "")
//	document.all["dlSect_Container"].className = "Hide";
//1060320	Kevin_C	1050087	升二代，無法於此處隱藏，同AKS116改寫於SERVER端
//if(OD_FLOW_TYPE == "1")
	//document.all["dlSect_Container"].className = "Hide";

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

function ShowMsg()
{
	//1060320	Kevin_C	1050087	升二代
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

//1060320	Kevin_C	1050087	升二代
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
	
	//1060320	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			var argMaxPage = document.all.txMaxPage.value;
			var argTolerance = document.all.txTolerance.value;
			var argPage = document.all.txPage.value;
			jf_ConfirmClean();
			setDefault(argMaxPage,argTolerance,argPage);
			//1060320	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave"://[0960332]Add by Cola 新增編卷鍵
		case "btPrint":
		case "btPreview":
			var IsExit = false;
			for(i=0;i<document.all["dlAcpUser"].options.length;i++)
			{
				if(document.all["dlAcpUser"].options[i].value == document.all["dlAcpUser_Text"].value || document.all["dlAcpUser"].options[i].text == document.all["dlAcpUser_Text"].value)
				{
					document.all["dlAcpUser"].selectedIndex = i;
					//document.all["dlAcpUser_Text"].value = document.all["dlAcpUser"].options[document.all["dlAcpUser"].selectedIndex].value;
					IsExit = true;
					break;
				}			
			}
			if(!IsExit)
			{
				document.all["dlAcpUser_Text"].value = "";
				alert("您輸入的帳號並非為檔管人員帳號，請重新輸入。");
				document.all["dlAcpUser_Text"].focus = "";
				return;
			}		
			if(FormValid())
			{
				jf_ShowWaitState();
				IsServerHandling = true;
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1060320	Kevin_C	1050087	升二代
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
	ShowMsg();
	
	//[0970146]Add by Cola 若成功編卷顯示訊息 -- start --
	if (document.all["SaveDone"] != null)
	{
		if (document.all["SaveDone"].value == "1")
			alert("編卷完成");
	}		
	//Cola -- end --
}

function OnWSResult(argResult)
{
    if(argResult.id == iCallID_CLS)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			document.all["txClsName"].value = WSResult.ClsName;
		}
		else
		{
			document.all["txClsName"].value = "";
			//1060320	Kevin_C	1050087	升二代
			//document.all["txCls"].focus();
			$('txCls').focus();
		}
    }
    //[0960140]Add by Cola 當承辦單位更換時, 科別之變動
    //95.10.12 950489 David
    //同步化二級科室
    if(argResult.id == CallWS_ID_SECT)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			WSResult = argResult.value;		
			
			//95.11.27 950489 David
			//1060320	Kevin_C	1050087	升二代 -S
			//document.all["dlSect_Container"].className = "";
			//document.all["dlSect"].className = "";
			//document.all["dlSect_Text"].className = "";
			//1060320	Kevin_C	1050087	升二代 -E
			
			//95.11.27 950489 David
			document.all["dlSect_Text"].value = "";
			
			while(document.all.dlSect.options[0] != null)
			{
				document.all.dlSect.options[0]=null;				
			}
			
			var DropListChild = document.createElement("OPTION");
			DropListChild.text = "";
			DropListChild.value = "";
			document.all.dlSect.options.add(DropListChild);
			
			if(WSResult.SecNo.length != 0)
			{	
				//[001209]Add by Cola -- start --
				ClearDL(document.all["dlSect"]);			
				
				var Blank_Data = document.createElement("OPTION");
				Blank_Data.text = "";
				Blank_Data.value = ":";				
				document.all.dlSect.options.add(Blank_Data);
				//Cola -- end --
				
				for(var i=0;i<WSResult.SecNo.length;i++)
				{
					var SectDropListChild = document.createElement("OPTION");
					SectDropListChild.text = WSResult.SecName[i];
					SectDropListChild.value = WSResult.DeptNo[i]+":"+WSResult.DeptName[i]+":"+WSResult.SecNo[i]+":"+WSResult.SecName[i];
					document.all.dlSect.options.add(SectDropListChild);
				}
				if(document.all["dlSect"].options.length > 10)
				{
					document.all["dlSect"].size = 10;
				}
				// 1090304		Kevin_C	1081156	修正二級單位隱藏後就不再顯示的問題
				document.all["dlSect_Container"].className = "custom-combobox";	
				SyncDL("NoSect2");
				//SyncDL("dlSect");
			}
			else
			{				
				while(document.all.dlSect.options[0] != null)
				{
					document.all.dlSect.options[0]=null;				
				}	
				
				//95.11.27 950489 David
				//1060320	Kevin_C	1050087	升二代
				//document.all["dlSect_Container"].className = "Hide";	
				document.all["dlSect_Container"].className = "hide";	
				SyncDL("NoSect1");
			}
		}				
    }
    
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

	
//ComOnChange();
ConditionOnChange();

//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
	if(!IsServerHandling)
	{ 
	    //1100204 Zen 1090927 取消使用document.activeElement	    //var xObjectName = document.activeElement.id;
	    var xObjectName = event.target.id;
		
		if ((xObjectName != "btExit") && (xObjectName != "btExitImg"))
		{
			if(jf_IsTimeOut())
			{
				Page_BlockSubmit=true;
				return;
			}		
		}
		
		var ret;
		
		switch (xObjectName)
		{
			case "ibtScan1":
			case "ibtScan2":
				Page_BlockSubmit = true;
				ActionWin = xObjectName;
				var xUrl ="AKR330C1.aspx";
				jf_OpenChildWin(xUrl,"AKR310C1",500,520);
				break;
			case "ibtAcp1":
			case "ibtAcp2":
				Page_BlockSubmit = true;
				ActionWin = xObjectName;
				var xUrl ="AKR330C2.aspx";
				jf_OpenChildWin(xUrl,"AKR310C2",560,520);
				break;
			//1060320	Kevin_C	1050087	升二代 -S
			// case 'btCalendarS':
				// Page_BlockSubmit=true;
				// jf_CallCalendar(document.all["txAcpDate1"], event.screenX, event.screenY);
				// break;
			// case 'btCalendarE':
				// Page_BlockSubmit=true;
				// jf_CallCalendar(document.all["txAcpDate2"], event.screenX, event.screenY);
				// break;
			//1060320	Kevin_C	1050087	升二代 -E
		}
	}
}

var ActionWin = null;
function CallBack(argCallerId)
{
	if(argCallerId=="AKR330C1")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			if(ActionWin == "ibtScan1")
			{
				document.all["txScanNo1"].value = document.all["lbReturnValue"].options[0].value;
			}
			else
			{
				document.all["txScanNo2"].value = document.all["lbReturnValue"].options[0].value;
			}
			
			var oldlength = document.all["lbReturnValue"].length;
			for(i=0;i<oldlength;i++)
			{
				document.all["lbReturnValue"].remove(0);
			}
		}
	}
	else if(argCallerId=="AKR330C2")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			if(ActionWin == "ibtAcp1")
			{
				document.all["txAcpNo1"].value = document.all["lbReturnValue"].options[0].value;
			}
			else
			{
				document.all["txAcpNo2"].value = document.all["lbReturnValue"].options[0].value;
			}
			
			var oldlength = document.all["lbReturnValue"].length;
			for(i=0;i<oldlength;i++)
			{
				document.all["lbReturnValue"].remove(0);
			}
		}
	}
}

function FormValid()
{
	var fr = document.AKR330;
	var pRtnValue = true;
	var ConditionType;

	if(fr.cbAutoChangeVol.checked)
	{
		if(fr.txVolMaxPage.value =="" || isNaN(fr.txVolMaxPage.value) || parseFloat(fr.txVolMaxPage.value) < 1)
		{
			alert("每卷最大頁數至少需為 1");
			//1060320	Kevin_C	1050087	升二代
			//fr.txVolMaxPage.focus();
			$('#'+fr.txVolMaxPage.id).focus();
			return false;
		}
		
		if(fr.txVolTolerance.value =="" || isNaN(fr.txVolTolerance.value)) 
		{
			alert("寬限值至少需為 0");
			//1060320	Kevin_C	1050087	升二代
			//fr.txVolTolerance.focus();
			$('#'+fr.txVolTolerance.id).focus();
			return false;
		}
		
		if(fr.txDocPage.value == "" || isNaN(fr.txDocPage.value) || parseFloat(fr.txDocPage.value) < 1)
		{
			alert("每卷最大頁數至少需為 1");
			//1060320	Kevin_C	1050087	升二代
			//fr.txDocPage.focus();
			$('#'+fr.txDocPage.id).focus();
			return false;
		}
	}
		
	if(fr.rbScan.checked)
		ConditionType = "SCAN";
	else if(fr.rbAcpNo.checked)
		ConditionType = "ACP";
	else
		ConditionType = "OTHER";
	
	switch(ConditionType)
	{
		case "SCAN":
			if(fr.txScanNo1.value=="" && fr.txScanNo2.value=="")
			{
				pRtnValue = false;
				alert("掃描批號不可為空白");
				//1060320	Kevin_C	1050087	升二代
				//fr.txScanNo1.focus();
				$('#'+fr.txScanNo1.id).focus();
			}
			
			if(fr.txScanNo1.value!="" && fr.txScanNo2.value!="")
			{
				if(parseInt(fr.txScanNo1.value,10)>parseInt(fr.txScanNo2.value,10))
				{
					pRtnValue = false;
					alert("批號起不可以大於迄");
					//1060320	Kevin_C	1050087	升二代
					//fr.txScanNo1.focus();
					$('#'+fr.txScanNo1.id).focus();
				}	
			}
			break;
		case "ACP":
			if(fr.txAcpNo1.value=="" && fr.txAcpNo2.value=="")
			{
				pRtnValue = false;
				alert("點收批號不可為空白");
				//1060320	Kevin_C	1050087	升二代
				//fr.txAcpNo1.focus();
				$('#'+fr.txAcpNo1.id).focus();
			}
			
			if(fr.txAcpNo1.value!="" && fr.txAcpNo2.value!="")
			{
				if(parseInt(fr.txAcpNo1.value,10)>parseInt(fr.txAcpNo2.value,10))
				{
					pRtnValue = false;
					alert("批號起不可以大於迄");
					//1060320	Kevin_C	1050087	升二代
					//fr.txAcpNo1.focus();
					$('#'+fr.txAcpNo1.id).focus();
				}	
			}
			break;
		case "OTHER":
			if(fr.txAcpDate1.value=="" && fr.txAcpDate2.value=="")
			{
				pRtnValue = false;
				alert("點收日期不可為空白");
				//1060320	Kevin_C	1050087	升二代
				//fr.txAcpDate1.focus();
				$('#'+fr.txAcpDate1.id).focus();
			}
			
			if(fr.txAcpDate1.value!="" && fr.txAcpDate2.value!="")
			{
				if(parseInt(fr.txAcpDate1.value,10)>parseInt(fr.txAcpDate2.value,10))
				{
					pRtnValue = false;
					alert("點收日期 起不可以大於迄");
					//1060320	Kevin_C	1050087	升二代
					//fr.txAcpDate1.focus();
					$('#'+fr.txAcpDate1.id).focus();
				}	
			}
			break;
	}	

	return pRtnValue;
}

function setDefault(argMaxPage,argTolerance,argPage)
{
	var fr = document.AKR330;
	
	fr.rbScan.checked = true;
	fr.cbUnfinish.checked = true;
	fr.cbScan.checked = false;
	fr.rbContinue.checked = true;
	// 1110411			Cloud	1110215	修正清除後會將併件勾選問題
	//fr.cbChild.checked = true;
	//ComOnChange();
	ConditionOnChange();	
	//1060320	Kevin_C	1050087	升二代
	//fr.txScanNo1.focus();
	$('#'+fr.txScanNo1.id).focus();
	fr.txVolMaxPage.innerText = argMaxPage;
	fr.txVolTolerance.innerText = argTolerance;
	fr.txDocPage.innerText = argPage;
	fr.txMaxPage.innerText = argMaxPage;
	fr.txTolerance.innerText = argTolerance;
	fr.txPage.innerText = argPage;	
}

/*function ComOnChange()
{
	var fr = document.AKR330;
	if(fr.cbCOM.checked)
		fr.cbChild.disabled = false;
	else
	{
		fr.cbChild.checked = false;
		fr.cbChild.disabled = true;	
	}
}*/

function ConditionOnChange()
{
	//1060320	Kevin_C	1050087	升二代，需先呼叫一次否則會出錯 -S
	$('#dlDept').combobox();
	$('#dlAcpUser').combobox();
	if(OD_FLOW_TYPE == "2")
		$('#dlSect').combobox();
	//1060320	Kevin_C	1050087	升二代，需先呼叫一次否則會出錯 -E
	var fr = document.AKR330;
	if(fr.rbScan.checked)
	{
		fr.txScanNo1.disabled = false;
		fr.txScanNo2.disabled = false;
		//1060320	Kevin_C	1050087	升二代
		//fr.txScanNo1.style.backgroundColor = "FFFFFF";
		//fr.txScanNo2.style.backgroundColor = "FFFFFF";
		fr.cbUnfinish.disabled = false;
		document.all["ibtScan1"].disabled = false;
		document.all["ibtScan2"].disabled = false;
		
		fr.txAcpNo1.disabled = true;
		fr.txAcpNo2.disabled = true;
		//1060320	Kevin_C	1050087	升二代
		//fr.txAcpNo1.style.backgroundColor = "LightGrey";
		//fr.txAcpNo2.style.backgroundColor = "LightGrey";
		document.all["ibtAcp1"].disabled = true;
		document.all["ibtAcp2"].disabled = true;
		
		fr.txAcpDate1.disabled = true;
		fr.txAcpDate2.disabled = true;
		fr.cbScan.disabled = true;
		//fr.txAcpUser.disabled = true;
		//1060320	Kevin_C	1050087	升二代
		//fr.dlAcpUser.disabled = true;
		$('#dlAcpUser').combobox('setDisable');
		//fr.txDept.disabled = true;
		//1060320	Kevin_C	1050087	升二代 -S
		//fr.dlDept.disabled = true;
		$('#dlDept').combobox('setDisable');
		if(OD_FLOW_TYPE == "2")
			$('#dlSect').combobox('setDisable');
		//1060320	Kevin_C	1050087	升二代 -E
		fr.txCls.disabled = true;
		//1060320	Kevin_C	1050087	升二代 -S
		//fr.txAcpDate1.style.backgroundColor = "LightGrey";
		//fr.txAcpDate2.style.backgroundColor = "LightGrey";
		//fr.txAcpUser.style.backgroundColor = "LightGrey";
		//fr.txDept.style.backgroundColor = "LightGrey";
		//fr.txCls.style.backgroundColor = "LightGrey";
		//fr.dlAcpUser.style.backgroundColor = "LightGrey";
		//fr.dlDept.style.backgroundColor = "LightGrey";
		//1060320	Kevin_C	1050087	升二代 -E
		fr.rbNormal.disabled = true;
		fr.rbSec.disabled = true;
		fr.rbAll.disabled = true;
	}
	else if(fr.rbAcpNo.checked)
	{
		fr.txScanNo1.disabled = true;
		fr.txScanNo2.disabled = true;
		//fr.txScanNo1.style.backgroundColor = "LightGrey";
		//fr.txScanNo2.style.backgroundColor = "LightGrey";
		fr.cbUnfinish.disabled = true;
		document.all["ibtScan1"].disabled = true;
		document.all["ibtScan2"].disabled = true;
		
		fr.txAcpNo1.disabled = false;
		fr.txAcpNo2.disabled = false;
		//1060320	Kevin_C	1050087	升二代
		//fr.txAcpNo1.style.backgroundColor = "FFFFFF";
		//fr.txAcpNo2.style.backgroundColor = "FFFFFF";
		document.all["ibtAcp1"].disabled = false;
		document.all["ibtAcp2"].disabled = false;
		
		fr.txAcpDate1.disabled = true;
		fr.txAcpDate2.disabled = true;
		fr.cbScan.disabled = true;
		//fr.txAcpUser.disabled = true;
		//1060320	Kevin_C	1050087	升二代
		//fr.dlAcpUser.disabled = true;
		$('#dlAcpUser').combobox('setDisable');
		//fr.txDept.disabled = true;
		//1060320	Kevin_C	1050087	升二代 -S
		//fr.dlDept.disabled = true;
		$('#dlDept').combobox('setDisable');
		if(OD_FLOW_TYPE == "2")
			$('#dlSect').combobox('setDisable');
		//1060320	Kevin_C	1050087	升二代 -E
		fr.txCls.disabled = true;
		//1060320	Kevin_C	1050087	升二代 -S
		//fr.txAcpDate1.style.backgroundColor = "LightGrey";
		//fr.txAcpDate2.style.backgroundColor = "LightGrey";
		//fr.txAcpUser.style.backgroundColor = "LightGrey";
		//fr.txDept.style.backgroundColor = "LightGrey";
		//fr.txCls.style.backgroundColor = "LightGrey";
		//fr.dlAcpUser.style.backgroundColor = "LightGrey";
		//fr.dlDept.style.backgroundColor = "LightGrey";
		//1060320	Kevin_C	1050087	升二代 -E
		fr.rbNormal.disabled = true;
		fr.rbSec.disabled = true;
		fr.rbAll.disabled = true;
	}
	else
	{
		fr.txScanNo1.disabled = true;
		fr.txScanNo2.disabled = true;
		fr.cbUnfinish.disabled = true;
		//1060320	Kevin_C	1050087	升二代
		//fr.txScanNo1.style.backgroundColor = "LightGrey";
		//fr.txScanNo2.style.backgroundColor = "LightGrey";
		document.all["ibtScan1"].disabled = true;
		document.all["ibtScan2"].disabled = true;
		
		fr.txAcpNo1.disabled = true;
		fr.txAcpNo2.disabled = true;
		//1060320	Kevin_C	1050087	升二代
		//fr.txAcpNo1.style.backgroundColor = "LightGrey";
		//fr.txAcpNo2.style.backgroundColor = "LightGrey";
		document.all["ibtAcp1"].disabled = true;
		document.all["ibtAcp2"].disabled = true;
		
		//1060320	Kevin_C	1050087	升二代 -S
		//fr.txAcpDate1.style.backgroundColor = "FFFFFF";
		//fr.txAcpDate2.style.backgroundColor = "FFFFFF";
		//document.all["btCalendarS"].disabled = false;
		//document.all["btCalendarE"].disabled = false;
		//1060320	Kevin_C	1050087	升二代 -E
		
		fr.txAcpDate1.disabled = false;
		fr.txAcpDate2.disabled = false;
		fr.cbScan.disabled = false;
		//fr.txAcpUser.disabled = false;
		//1060320	Kevin_C	1050087	升二代
		//fr.dlAcpUser.disabled = false;
		$('#dlAcpUser').combobox('setEnable');
		//fr.txDept.disabled = false;
		//1060320	Kevin_C	1050087	升二代 -S
		//fr.dlDept.disabled = false;
		$('#dlDept').combobox('setEnable');
		if(OD_FLOW_TYPE == "2")
			$('#dlSect').combobox('setEnable');
		//1060320	Kevin_C	1050087	升二代 -E
		fr.dlDept.disabled = false;
		fr.txCls.disabled = false;
		//1060320	Kevin_C	1050087	升二代 -S
		//fr.txAcpDate1.style.backgroundColor = "FFFFFF";
		//fr.txAcpDate2.style.backgroundColor = "FFFFFF";
		//fr.txAcpUser.style.backgroundColor = "FFFFFF";
		//fr.txDept.style.backgroundColor = "FFFFFF";
		//fr.txCls.style.backgroundColor = "FFFFFF";
		//fr.dlAcpUser.style.backgroundColor = "FFFFFF";
		//fr.dlDept.style.backgroundColor = "FFFFFF";
		//1060320	Kevin_C	1050087	升二代 -E
		fr.rbNormal.disabled = false;
		fr.rbSec.disabled = false;
		fr.rbAll.disabled = false;
	}
	if(fr.cbAutoChangeVol.checked)
	{
		fr.txVolMaxPage.disabled = false;
		//1060320	Kevin_C	1050087	升二代
		//fr.txVolMaxPage.style.backgroundColor = "FFFFFF";
		fr.txVolTolerance.disabled = false;
		//1060320	Kevin_C	1050087	升二代
		//fr.txVolTolerance.style.backgroundColor = "FFFFFF";
		fr.txDocPage.disabled = false;
		//1060320	Kevin_C	1050087	升二代
		//fr.txDocPage.style.backgroundColor = "FFFFFF";
	}
	else
	{
		fr.txVolMaxPage.disabled = true;
		//1060320	Kevin_C	1050087	升二代
		//fr.txVolMaxPage.style.backgroundColor = "LightGrey";
		fr.txVolTolerance.disabled = true;
		//1060320	Kevin_C	1050087	升二代
		//fr.txVolTolerance.style.backgroundColor = "LightGrey";
		fr.txDocPage.disabled = true;
		//1060320	Kevin_C	1050087	升二代
		//fr.txDocPage.style.backgroundColor = "LightGrey";
	}
}

//檢查分類號正確性
var iCallID_CLS = null;
function CheckClsNo()
{
	var strCLS = document.all["txCls"].value;
	
	if(strCLS != "")
	{
		var param = new Array(1);
		param[0] = strCLS;
	
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param);
		iCallID_CLS = RtnObj.id;
		OnWSResult(RtnObj);
	}
	else
		document.all["txClsName"].value = "";
}

function CheckDate(obj)
{
	if(obj.value=="")
		return;
		
	var strDate = obj.value;
	 if (strDate!="")
	 {
	  if (strDate.length < 7)
	  {
		strDate = jf_PADL(strDate,7,'0');
		obj.value = strDate;
	  }
	
	 if(!jf_CheckCDATE(obj.value))
	 {
		var ErrName = new Array(1);
		ErrName[0] = "日期";
		alert(FormatStr(jf_GetErrMsg(InFormatErr2),ErrName));
		//1060320	Kevin_C	1050087	升二代
		//obj.focus();
		$('#'+obj.id).focus();
	 }
	}
}
//[0960140]Add by Cola 判斷是否為檔管人員帳號
function tb_onblur()
{
	if (document.all["dlAcpUser_Text"].value == "")
	{
		ClearDL(document.all["dlDept"]);//先清空
		ClearDL(document.all["dlSect"]);//先清空
		document.all["dlDept_Text"].value = "";
		document.all["dlDept"].selectedIndex = -1;		
		document.all["dlSect_Text"].value = "";
		document.all["dlSect"].selectedIndex = -1;	
		
		for(var i=0 ; i<document.all["dlDept_bak"].length;i++ )
		{
			var DropListChild = document.createElement("OPTION");
			DropListChild.text = document.all["dlDept_bak"].options[i].text;
			DropListChild.value = document.all["dlDept_bak"].options[i].value;
			document.all["dlDept"].options.add(DropListChild);
		}
		if(document.all["dlDept"].options.length > 10)
		{
			document.all["dlDept"].size = 10;
		}	
		else
			document.all["dlDept"].size = document.all["dlDept"].options.length;		
		return;
	}
		
	var IsExit = false;
	for(i=0;i<document.all["dlAcpUser"].options.length;i++)
	{
		if(document.all["dlAcpUser"].options[i].value == document.all["dlAcpUser_Text"].value || document.all["dlAcpUser"].options[i].text == document.all["dlAcpUser_Text"].value)
		{
			document.all["dlAcpUser"].selectedIndex = i;
			//document.all["dlAcpUser_Text"].value = document.all["dlAcpUser"].options[document.all["dlAcpUser"].selectedIndex].value;
			IsExit = true;
			break;
		}			
	}
	if(!IsExit)
	{
		alert("您輸入的帳號並非為檔管人員帳號，請重新輸入。");
		document.all["dlAcpUser_Text"].value = "";
		document.all["dlAcpUser_Text"].focus = "";
		document.all["dlDept_Text"].value = "";
		document.all["dlSect_Text"].value = "";
		document.all["dlDept"].selectedIndex = -1;
		document.all["dlSect"].selectedIndex = -1;		
		return;
		
	}	
	//[0970146]Add by Cola 若該單位非點收人員負責, 則移除 -- start --
    //1070830 Zen 1070678 弱掃Ajax修正
    //var resultE = AKR330.GetDeptNo(document.all["h_sourceorgno"].value, document.all["dlAcpUser"].options[document.all["dlAcpUser"].selectedIndex].value).value;
    var resultE = AK.AKR330.GetDeptNo(document.all["h_sourceorgno"].value, document.all["dlAcpUser"].options[document.all["dlAcpUser"].selectedIndex].value).value;
	
	ClearDL(document.all["dlDept"]);//先清空
	ClearDL(document.all["dlSect"]);//先清空
	document.all["dlDept_Text"].value = "";
	document.all["dlDept"].selectedIndex = -1;		
	document.all["dlSect_Text"].value = "";
	document.all["dlSect"].selectedIndex = -1;	
	
	for(var i=0 ; i<document.all["dlDept_bak"].length;i++ )
	{
		var DropListChild = document.createElement("OPTION");
		DropListChild.text = document.all["dlDept_bak"].options[i].text;
		DropListChild.value = document.all["dlDept_bak"].options[i].value;
		document.all["dlDept"].options.add(DropListChild);
	}	
	
	for(var m=document.all["dlDept"].length-1 ; m>=0;m-- )
	{
		if ( document.all["dlDept"].options[m].text !="")
		{
			if ( resultE.indexOf(document.all["dlDept"].options[m].value.split(':')[0]) == -1 )
				document.all["dlDept"].remove(m);
		}
	}
	
	if(document.all["dlDept"].options.length > 6)
	{
		document.all["dlDept"].size = 6;
	}	
	else
		document.all["dlDept"].size = document.all["dlDept"].options.length;
	

	//Cola -- end --
}
function TextBox_DropDownList(txObj,dlObj,ActiveObjID,ItemName)
{
	var IsExit = false;
	if(ActiveObjID == txObj.id)
	{
		if(txObj.value == "")
		{
			dlObj.selectedIndex = 0;
			return;
		}
		for(i=0;i<dlObj.options.length;i++)
		{
			if(dlObj.options[i].value == txObj.value || dlObj.options[i].text == txObj.value)
			{
				dlObj.selectedIndex = i;
				txObj.value = dlObj.options[dlObj.selectedIndex].value;
				IsExit = true;
				break;
			}			
		}

		if(!IsExit)
		{
			if(ItemName=="USER")
			{
				alert("您輸入的帳號並非為檔管人員帳號，請重新輸入。");
			}
			else
			{
				alert("您輸入的承辦處室不存在，請重新輸入。");
			}
			//1060320	Kevin_C	1050087	升二代
			//txObj.focus();
			$('#'+txObj.id).focus();
		}
	}
	else if(ActiveObjID == dlObj.id)
	{
		if(dlObj.options[dlObj.selectedIndex].value == "")
		{
			txObj.value = "";
			return;
		}
		txObj.value = dlObj.options[dlObj.selectedIndex].value;
	}
	
}
//[0960140]Add by Cola 因應需新增科別之combobox,因此將code自AKM330 copy過來使用
//95.10.11 950489 David
var CallWS_ID_SECT
var CallWS_ID_Emp1
var CallWS_ID_Emp2
function SyncDL(argDLObj)
{	
	//alert(document.all["dlDept1"].options[document.all["dlDept1"].selectedIndex].value);
	var strArr1 = new Array();
	var strArr2 = new Array();	
	var bAction = true;
	if(argDLObj == "dlDept1" || argDLObj == "NoSect1" || argDLObj == "NoSect2")
	{
		if(document.all["dlDept"].selectedIndex != -1)
		{
			strArr1 = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');	
			document.all["txDeptNo_h"].value = strArr1[0];
			//95.10.13 950489 David 
			document.all["txSectNo_h"].value = "";
			document.all["txSectName_h"].value = strArr1[1];
		}
		else
			bAction = false;
	}
	if(argDLObj == "dlSect")	
	{			
		if(document.all["dlSect"].selectedIndex != -1 && jf_Trim(document.all["dlSect_Text"].value) != "" )
		{
			strArr2 = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value.split(':');				
			document.all["txSectNo_h"].value = strArr2[2];
			document.all["txSectName_h"].value = strArr2[3];
		}
		else if(document.all["dlSect_Text"].value == "")
		{
			strArr1 = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');	
			document.all["txDeptNo_h"].value = strArr1[0];
			//95.10.13 950489 David 
			document.all["txSectNo_h"].value = "";
			document.all["txSectName_h"].value = strArr1[1];	
			argDLObj = "dlDept1";
			bAction = true;		
		}
		else
			bAction = false;
	}
	//取二級單位用
	var param1 = new Array(3);
	param1[0] = false;
	param1[1] = true;
	param1[2] = strArr1[0];
	//取承辦人用
	var param2 = new Array(1);
	param2[0] = strArr2[0];	
	//無二級單位時取承辦人用
	var param3 = new Array(1);
	param3[0] = strArr1[0];
	
	var RtnObjSect;	
	
	//96.02.26 000189 David
	if(OD_FLOW_TYPE == "2")
	{
		if(argDLObj == "dlDept1" && bAction)
		{	
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDepts",false,param1);
			CallWS_ID_SECT = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
		if(argDLObj == "dlSect" && bAction)
		{
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param2);
			CallWS_ID_Emp1 = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
	
		//若無二級單位，則以一級單位為主，取得其下承辦人
		if(argDLObj == "NoSect1" && bAction)
		{
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param3);
			CallWS_ID_Emp1 = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
		if(argDLObj == "NoSect2" && bAction)
		{
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param3);
			CallWS_ID_Emp2 = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
	}
	else	//96.02.26 000189 David
	{
		argDLObj = "NoSect2";
		if(argDLObj == "NoSect2" && bAction)
		{
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param3);
			CallWS_ID_Emp1 = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
	}
}
//將DropDownList裡的item清除
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;
}

