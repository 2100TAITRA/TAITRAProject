/*
DATE 	SA		PRG		MGR_NO	DESC
1060327	Cloud	Joe		1050818 新增程式
1100127 Cloud   Cloud   1101509 增加核判日期，考試院不提供文號、收創文日期條件
1110914 Cloud   Cloud   1101509 客戶要求提供文號及收創文日查詢條件
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;


function ShowMsg()
{
	jf_ShowValidator();
}

function ClientButtonControl(e)
{
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
	}
}

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
	
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
		case "btPreview":
			Page_BlockSubmit = !CheckCondition();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(xObjectName);
			break;
	}
}

function ClientOnLoad()
{
	
	ShowMsg();
	
	var ddlDept=document.all["dlDept"];
	var SelectItem=ddlDept.options[ddlDept.selectedIndex];
	var strDeptValue=SelectItem.value;
	var strDeptNo=strDeptValue.split(':');
	
	if(document.all["dlSect"].selectedIndex==0 || document.all["dlSect"].selectedIndex==-1)
		odjf_SetdlSectByUnitCodeDropDownList(strDeptNo[0],"dlSect",true);
	if(document.all["dlUser"].selectedIndex==0 || document.all["dlUser"].selectedIndex==-1)
		odjf_SetdlSectDropDownList("dlDept","dlSect","dlUser","",false,true);
	
	if(document.all.dlDept.value != "")
	{
		document.all.dlSect.selectedIndex = document.all.H_Sect_Index.value;
		dlSect_Text_onblur();
	}
	document.all.dlUser.selectedIndex = document.all.H_User_Index.value;
	
	fnCheckSectLength();
    //1100127 Cloud     1101509 增加核判日期，考試院不提供文號、收創文日期條件
	//1110914 Cloud      1101509 客戶要求提供文號及收創文日查詢條件
	/*if (document.all["OrgNickName"].value == "EXAM") {
	    document.all["DocTr"].className = "hide";
	    document.all["RcvDateTr"].className = "hide";
	    document.all["AppTr"].className = "";
	}
	else
	    document.all["AppTr"].className = "hide";*/
}

function CheckCondition()
{
	var SDoc		= document.all["txSDoc"];
	var EDoc		= document.all["txEDoc"];
	var strDept		= document.all["dlDept"].value;
	var strUser		= document.all["dlUser"].value;
	var ApplyDateS	= document.all["txApplyDateS"];
	var ApplyDateE	= document.all["txApplyDateE"];
	var ClsDateS	= document.all["txClsDateS"];
	var ClsDateE	= document.all["txClsDateE"];
	var RcvDateS	= document.all["txRcvDateS"];
	var RcvDateE = document.all["txRcvDateE"];
    //1100127 Cloud      1101509 增加核判日期
	//if (jf_Trim(SDoc.value + EDoc.value + strDept + strUser + ApplyDateS.value + ApplyDateE.value + ClsDateS.value + ClsDateE.value + RcvDateS.value + RcvDateE.value) == "")
	var AppDateS = document.all["txAppDateS"];
	var AppDateE = document.all["txAppDateE"];
	if (jf_Trim(SDoc.value + EDoc.value + strDept + strUser + ApplyDateS.value + ApplyDateE.value + ClsDateS.value + ClsDateE.value + RcvDateS.value + RcvDateE.value + AppDateS.value + AppDateE.value) == "")
	{
		$('#txApplyDateS').focus()
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請至少輸入一個條件"])),"");
		return false;
	}
	
	fnCompareDate(ApplyDateS,ApplyDateE);
	fnCompareDate(txClsDateS,txClsDateE);
	fnCompareDate(txRcvDateS,txRcvDateE);
	fnCompareDate(SDoc, EDoc);
    //1100127 Cloud      1101509 增加核判日期
	fnCompareDate(AppDateS, AppDateE);
	
	//紀錄下拉選單SECT跟USER資訊
	document.all.H_Sect_Index.value = document.all.dlSect.selectedIndex;
	document.all.H_User_Index.value = document.all.dlUser.selectedIndex;
	document.all.H_Sect_Value.value = document.all.dlSect.value;
	document.all.H_User_Value.value = document.all.dlUser.value;
		
	return true;
}


function dlDept_Text_onblur()
{
	var bCheckOK = true;
	
	var ddlDept=document.all["dlDept"];
	var SelectItem=ddlDept.options[ddlDept.selectedIndex];
	var strDeptValue=SelectItem.value;
	var strDeptNo=strDeptValue.split(':');
	
	odjf_SetdlSectByUnitCodeDropDownList(strDeptNo[0],"dlSect",true);
	odjf_SetdlSectDropDownList("dlDept","dlSect","dlUser","",false,true);
	
	if(document.all["dlDept"].selectedIndex==-1 || document.all["dlDept"].selectedIndex==0)
	{
		while(document.all["dlUser"].length > 0)
			document.all["dlUser"].remove(0);
		document.all["dlUser"].options.add(new Option("",""));	
	}
	
	fnCheckSectLength();
	return bCheckOK;
}

function dlSect_Text_onblur()
{
	var bCheckOK = true;

	odjf_SetdlSectDropDownList("dlDept","dlSect","dlUser","",false,true);
	
	if(document.all["dlDept"].selectedIndex==-1 || document.all["dlDept"].selectedIndex==0)
	{
		while(document.all["dlUser"].length > 0)
			document.all["dlUser"].remove(0);
		document.all["dlUser"].options.add(new Option("",""));	
	}
	
	return bCheckOK;
}


/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/

//記錄是否已檢核過有註冊onblur事件的欄位的值(通常發生在輸入完後直接按下儲存件時)
var bHasCheck = false;

function fnCheckSectLength()
{
	if(document.all.dlSect.length <= 1)
		document.all.dlSect.className = "hide";
	else
		document.all.dlSect.className = "";	
}

//比對日期欄位起訖大小
function fnCompareDate(SDate,EDate)
{
	var strTemp = "";
	if(SDate.value == EDate.value)
	{
		return;		
	}
	else if(SDate.value == "")
	{
		SDate.value = EDate.value;
	}
	else if(EDate.value == "")
	{
		EDate.value = SDate.value;
	}
	else if(SDate.value > EDate.value)
	{
		strTemp = EDate.value;
		EDate.value = SDate.value;
		SDate.value = strTemp;
	}
	return;	
}

//檢查日期格式
function CheckCDATE(argObj,strMsg)
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
			$('#'+argObj).focus();
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
