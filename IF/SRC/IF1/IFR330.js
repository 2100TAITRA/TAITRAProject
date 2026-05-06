/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2011.11/28	CLOUD	    1000539	新增程式
 * 2016.07.13   Zen         1050087 二代公文修改
 * 1051019		Joe			1050087	二代修改配合行動平台
 * 2016.11.09	JOE		    1050700	弱掃修正
 * 1060518      Zen         1060215 innerText相關修改
 * 1060613		JOE		    1060456	弱掃修正
 * 1070803		Joe			1070678	修正弱掃Client Cookies Inspection
 * 1070830		Joe			1070678	配合內政部IIS環境設定改為使用AjaxPro
 * 1070905		Joe			1070678	修正弱掃Client Cookies Inspection
 * 1100201		Joe			1090927	取消使用document.activeElement
 * 1150206		Andy		序63    修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
 ****************************************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050713 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--S
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
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--E

//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
		case "btSelect":
			Page_BlockSubmit=true;
			var ret = jf_ShowOrgDialogForPerson();
			if (IsRationalValue(ret))
			{
				document.all["txTarget"].value = ret.Name;
				document.all["txAccount"].value = ret.Code;
			}
			break;
	}
}

//1050713 Zen 1050087 二代公文修改
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

    //1050713 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
			jfSetSubDept();
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050713 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050713 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050713 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}
//1050713 Zen 1050087 二代公文修改
var currAccountId;
var currNameId;

function CallBack(argCallerId)
{
    //1050713 Zen 1050087 二代公文修改--begin
    if(argCallerId == "IFC021")
    {
        document.all[currAccountId].value = $('#lbReturnValue')[0].options[0].value;
        document.all[currNameId].value = $('#lbReturnValue')[0].options[2].value;
    }
    //1050713 Zen 1050087 二代公文修改--end
}

function ClientOnLoad()
{
	var sAuthws = document.all.authWS.value;
	if(sAuthws == "")
		return;
    //1050713 Zen 1050087 二代公文修改
	//fnCallWS(sAuthws, "GetAccountName", null);
	jfGetSubDept(true);
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
    //1060518 Zen 1060215 innerText相關修正
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function ReturnValue()
{
    
}

function IsRationalValue(val)
{
	if (val == undefined)
		return false;
	if (val == null)
		return false;
	return true;
}

function CheckBeforeSearch()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var iDeptIdx = document.all["dlDept"].selectedIndex;
	var strSDate	=	jf_Trim(document.all.txDateS.value);//代理日期起
	var strEDate	=	jf_Trim(document.all.txDateE.value);//代理日期迄
	if(!CheckDATE("txDateS","代理日期(起)"))
	{  
	   bRtn = false;	 
	   return;
	}
	if(!CheckDATE("txDateE","代理日期(迄)"))
	{
	 
		bRtn = false;
		return;
	}	
	if(strSDate != "" && strEDate != "" && strSDate > strEDate)
	{
		document.all.txDateE.value = strSDate;
		document.all.txDateS.value = strEDate;
	}
	if(strSDate == "" && strEDate != "")
	{ 
	document.all.txDateS.value = strEDate;
	
	}
	if(strSDate != "" && strEDate == "")
	{ 
	document.all.txDateE.value = strSDate;
	
	}
	if (document.all["txAccount"].value == "" && document.all["txAccountP"].value =="" && iDeptIdx <= 0)
	{
		
	    strErrMsg = "被代理人組室、代理人帳號或被代理人帳號需則一輸入";
	    //1050713 Zen 1050087 二代公文修改
	    //document.all["txAccount"].focus();
	    $('#txAccount').focus();
	}
	
	if (document.all["txDateS"].value == "" && document.all["txDateE"].value == "")
	{
	    strErrMsg += "\代理期間不可空白";
	    //1050713 Zen 1050087 二代公文修改
	    //document.all["txDateS"].focus();
	    $('#txDateS').focus();
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		alert(strErrMsg);
	
	}

	return bRtnbool;
}

function jf_SetProxy(argAccountId, argNameId)
{
	Page_BlockSubmit=true;
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";

    //1050713 Zen 1050087 二代公文修改
    //var ret = jf_ShowOrgDialogByLevel(0, arrSelectType);
	jf_ShowOrgDialogByLevel(0, arrSelectType);
	currAccountId = argAccountId;
	currNameId = argNameId;

    //1050713 Zen 1050087 移至callback執行
    //if(ret!=null)
	//{
	//	document.all[argAccountId].value		= ret.Code;
	//	document.all[argNameId].value			= ret.Name;
	//}	
}function jf_SetProxyP(argAccountId, argNameId)
{
	Page_BlockSubmit=true;
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";

    //1050713 Zen 1050087 二代公文修改 
	//var ret = jf_ShowOrgDialogByLevel(0, arrSelectType);
	jf_ShowOrgDialogByLevel(0, arrSelectType);
	currAccountId = argAccountId;
	currNameId = argNameId;

    //1050713 Zen 1050087 移至callback執行
	//if(ret!=null)
	//{
	//	document.all[argAccountId].value		= ret.Code;
	//	document.all[argNameId].value			= ret.Name;
	//}	
}
function CallGetAccountName(argAccountId, argNameId)
{

	var sArt = document.all.SsoArtifact.value;
	//1060613	Joe		1060456		弱掃修正
	// var sAuthws = document.all.authWS.value;
	var sAuthws = encodeURI(document.all.authWS.value);

	if(sArt == "" || sAuthws == "")
		return;
	document.all[argAccountId].value = jf_Trim(document.all[argAccountId].value);
	if(document.all[argAccountId].value == "")
	{
		document.all[argNameId].value = "";
		return;
	}

	var param = new Array(2);
	param[0] = sArt;
	param[1] = document.all[argAccountId].value;
	//1050810 Zen 1050087 二代公文修改 
	//var result = fnCallWS(sAuthws, "GetAccountName", param);
	//1051109	Joe		1050700		弱掃修正--S
	param[0] = encodeURI(param[0]);
	param[1] = encodeURI(param[1]);	
	//1051109	Joe		1050700		弱掃修正--E
	var result = jf_CallW(sAuthws, "GetAccountName", false, param);
	
	if(result.error == false)
	{
		if(result.value == "")
		{
			document.all[argAccountId].value = "";
			document.all[argNameId].value = "";
		    //1050713 Zen 1050087 二代公文修改
			//document.all[argAccountId].focus();
			$('#' + argAccountId).focus();
			alert("帳號不存在。");
		}
		else
		{
			document.all[argNameId].value = result.value;
		}
	}
	else
		alert(result.errorDetail.string);
}
var bHasCheck = false;
function CheckDATE(argObj,strMsg)
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
		    //1050713 Zen 1050087 二代公文修改
		    //document.all[argObj].focus();
		    $('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function fnCallWS(argWS, argFuncName, argParam)
{
	var callObj = new Object();
	callObj.funcName = argFuncName;      // Name of the remote function.
	callObj.async = false;         // A Boolean that specifies the type of call
	callObj.timeout = 20;         // Timeout value for the method call (seconds)
	callObj.SOAPHeader = "<SOAP-ENV:Header>";
	callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
	callObj.SOAPHeader += 5;
	callObj.SOAPHeader += "</t:Transaction>";  
	callObj.SOAPHeader += "</SOAP-ENV:Header>";  

	service.useService(argWS + "?WSDL", "Serv");
	
	if(argParam == null || argParam.length == 0)
		return service.Serv.callService(callObj, argParam);
	else if (argParam.length ==1 )
		callID = service.Serv.callService(callObj , argParam[0]);
	else if (argParam.length ==2 )
		callID = service.Serv.callService(callObj , argParam[0] , argParam[1]);

	return callID;
}
/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100201	Joe		1090927		無用廢除，前面已有一個
/*
function ClientButtonControl()
{
	var xObjectName = document.activeElement.id;
	
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
		case "ibDateS":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txDateS, event.screenX, event.screenY);
			break;
		}		
		case "ibDateE":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txDateE, event.screenX, event.screenY);
			break;
		}				
	}	
}
*/

function jfGetSubDept(argIsKeepSEct)
{
	var dlSect = document.all["dlSect"];//必宣告，每次"."都會耗費時間，只做一次比較看不出影響
	var str = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
	if(document.all["dlDept"].selectedIndex > 0)//index有可能是0"空白"的情況
	{
		//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
		// var value = IFR330.GetSub(document.all["SsoArtifact"].value,str).value;
		var value = IF1.IFR330.GetSub(document.all["SsoArtifact"].value,str).value;
		fnClearDropDownList(dlSect);//呼叫清空dlSect物件
		if(!argIsKeepSEct)
			document.all["H_txSectNo"].value = "";
		if(value.length > 0)
		{
			dlSect.options.add(new Option("",""));//DropDownList新增一個空白
			dlSect.options.add(new Option("僅含一級單位",str));
			for(var i=0;i<value.length;i++)
			{
				var strSect = value[i];
				dlSect.options.add(new Option(strSect.split('|')[0],strSect.split('|')[1]));//將name和value分別存入strSect中
			}
			
			if(document.all["H_txSectNo"].value != "")
				jfSetDlSect();
			dlSect.className = "InputFieldText";
		}
		else
		{
			fnClearDropDownList(dlSect);
			document.all["H_txSectNo"].value = "";
			dlSect.className = "Hide";
		}
	}
	else
	{
		fnClearDropDownList(dlSect);
		document.all["H_txSectNo"].value = "";
		dlSect.className = "Hide";
	}
}

function jfSetDlSect()
{
	var dlSect = document.all["dlSect"];
	var strSect = document.all["H_txSectNo"].value;
	if(dlSect.options.length > 0 && strSect != "")
	{
		for(var i=0;i<dlSect.options.length;i++)
		{
			if(dlSect.options[i].value == strSect)
			{
				dlSect.selectedIndex = i;
				break;
			}
		}
	}
}

function jfSetSubDept()
{
	var dlSect = document.all["dlSect"];
	if(dlSect.selectedIndex > 0)
	{
		document.all["H_txSectNo"].value = dlSect.options[dlSect.selectedIndex].value;
	}
	else
		document.all["H_txSectNo"].value = ""; 
}

function fnClearDropDownList(obj)//專用呼叫清空
{
	while(obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
		obj.options.remove(0);	
}
function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo)
{
	var sSelectType = "";
	for(var i=0; i<argSelectType.length; i++)
	{
		if(i != 0)
			sSelectType += ",";
		//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
		// sSelectType += "'" + argSelectType[i] + "'";
		sSelectType += argSelectType[i];
	}
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--S
	// jf_SaveCookie("iic021StrctureType"	, argParam);
	// jf_SaveCookie("iic021SelectType"	, sSelectType);
	// if(argOrgNo)
		// jf_SaveCookie("iic021OrgNo"	, argOrgNo);
    //1050713 Zen 1050087 二代公文修改
	//var ret = fnOpen("IFC021.htm", "288", "470");
	// jf_ShowModal("IFC021.htm" + GetAllParamStr(), "460", "400");
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--S
	if(argOrgNo)
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "460", "400");
		jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo);
	else
		// jf_ShowModal("IFC021.htm" + GetAllParamStr() + "&iic021SelectType=" + sSelectType, "460", "400");
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType, "460", "400");
		jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType);
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--E
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--S
	//清除Cookie
	if(argOrgNo)
	    jf_SaveCookie("iic021OrgNo", "");

    //1050713 Zen 1050087 二代公文修改
	//return ret;
}
//1050713 Zen 1050087 二代公文修改
/*
function fnOpen(arg,argW,argH)
{
   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
   var ret = window.showModalDialog(arg, "", sFeatures);
   return ret;
}
*/