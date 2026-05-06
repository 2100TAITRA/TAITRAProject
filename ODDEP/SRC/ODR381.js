/*
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1050606  Justin  1050087 二代公文修改
 * 1051114	Justin	1050087 WEM010C1子視窗修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*1050606 Justin 1050087 二代公文修改 
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);*/
jf_ShowValidator();

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
		case "btHelp":
		    var strUrl = "";
			//1051114 Justin 1050087 子視窗修改--Start--
		    //strUrl = "WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+document.all.txOrgno.value;
		    var path = document.all.H_Wed010C1Path.value;
		    strUrl = path + "WEM010C1.aspx?OrgID=" + document.all.h_OrgNo.value + "&K1=Dlg_Dept&Search=" + document.all.txOrgno.value;
			//1051114 Justin 1050087 子視窗修改--End--
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			Page_BlockSubmit=true;
			break;
	}	
}

//1050606 Justin 1050087 二代公文修改 
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
	
    //1050606 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    //1050606 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
		    if(document.all.txPostDateS.value=="" && document.all.txPostDateE.value=="") 
		    {
		        //1050606 Justin 1050087 二代公文修改 
		        //document.all.txPostDateS.focus();
		        $('#txPostDateS').focus();
				alert("郵寄日期起訖不可均為空白!!");
				Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = !CheckMailType();
		    //1050606 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
	}
}

var argCallerId;
function CallBack(argCallerId)
{
	if (argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
		//1051114 Justin 1050087 WEM010C1子視窗修改
		//var DeptArray = DeptInfo.split(',');
		var DeptArray = DeptInfo.split('^');
		if(DeptArray.length > 0)
		{
			document.all["txOrgName"].value = jf_Trim(DeptArray[1]);
			document.all["txOrgno"].value = jf_Trim(DeptArray[2]);
		}		
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

var wsGetOrgNameID;//宣告webserver回傳值id
function CheckOrgNo()
{
	var strOrgno = jf_Trim(document.all["txOrgno"].value);
	if (strOrgno=="")	
	if (strOrgno=="")	
	{
		document.all["txOrgno"].value = "";
		document.all["txOrgName"].value = "";
		return;
	}
	var wsParam = new Array();
	wsParam[0] = strOrgno;
	wsParam[1] = document.all.h_OrgNo.value;
	wsParam[2] = document.all.h_DeptNo.value;
	wsParam[3] = document.all.h_UserId.value;
	
	var CallWsObj = jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,wsParam);
	
	//檢查執行是否成功
	if(jf_IsWebServiceSuccess(CallWsObj))
	{		
		if(!CallWsObj.value.ErrorClass.IsErr)
		{
			if(CallWsObj.value.Count > 0)
			{
				document.all.txOrgno.value = jf_Trim(CallWsObj.value.OrgID[0]);
				document.all.txOrgName.value = jf_Trim(CallWsObj.value.OrgName[0]);
			}
		}
	}
}
function OnWSResult(argResult)
{
        
}

function ClientOnLoad()
{
    rbType_OnClick();
    /*1050606 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("lib/OD_LIB.asmx", "GetUnitInfo", false, null);
	jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, null);//共用function jf_CheckDataExist必要*/
}
function CheckDateS()
{
	var strDateValue ;
	strDateValue = document.all.txPostDateS.value;
	if (strDateValue == "")
	{  
	return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all.txPostDateS.value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["遞送日期"])), "");
	    //1050606 Justin 1050087 二代公文修改 
	    //document.all.txPostDateS.focus();
	    $('#txPostDateS').focus();
	}
}
function CheckDateE()
{
	var strDateValue ;
	strDateValue = document.all.txPostDateE.value;
	if (strDateValue == "")
	{  
	return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all.txPostDateE.value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["遞送日期"])), "");
	    /*1050606 Justin 1050087 二代公文修改
		document.all.txPostDateE.focus();*/
		$('#txPostDateE').focus();
	}
}
/*
var wsCheckDataKeyID0 ;
function OnWSResult(argResult)
{
 	if (argResult.id == wsCheckDataKeyID0)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (!argResult.value.ErrorClass.IsErr)
			{
				document.all.txOrgName.value = CallObj0.value.RtnField0[0];
			}		
		}
		else
		{
		    document.all.txOrgId.value=""
			document.all.txOrgId.focus();
		}
    }
}
function CheckOrgNo()
{
	//空白不檢查
	if (document.all.txOrgId.value==""){document.all.txOrgName.value="" ;
		return;} 
	var param       = new Array(3);
	var argKeyName  = new Array(2);
	var argKeyValue = new Array(2);
	var argRtnName  = new Array(1);
	var argRtnOrder = new Array(1);
	
	argKeyName[0]  = "ORG_ID";
	argKeyName[1]  = "SOURCE_ORGNO";
	argKeyValue[0] = document.all.txOrgId.value;
	argKeyValue[1] = document.all.h_OrgNo.value;
	argRtnName[0]  = "ORG_NAME";
	argRtnOrder[0] = "ORG_ID"; 	
	
	param[0] = "MAIL_COLLECT";
	param[1] = argKeyName;
	param[2] = argKeyValue;
	param[3] = argRtnName;
	param[4] = argRtnOrder;
	
	CallObj0  = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
	wsCheckDataKeyID0 = CallObj0.id;
	OnWSResult(CallObj0);
}
function ClientOnLoad()
{
	jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,null);
}
*/
/*
function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}
*/
/*
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}
*/
function CheckMailType()
{
	var bRtn = false;
	for (var iRow = 2; iRow <= document.all.dg1.rows.length; iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbPost"].checked)
		{
			bRtn = true;break;
		}
	}
	if (!bRtn)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆郵寄方式"])),"");
	}
	return bRtn;
}

function dlTime_onchange()
{
	var index = document.all["dlTime"].selectedIndex;
	var obj = document.all["dlTime"].options[index];

	if (obj.value == "") 
	{
		document.all["txSTime"].value = "";
		document.all["txETime"].value = "";
	}
	else
	{
		var argValue = obj.value.split(":");
		document.all["txSTime"].value = argValue[0];
		document.all["txETime"].value = argValue[1];
	}
}

function rbType_OnClick()
{
	if (document.all["rbTypeAll"].checked)
		rbTypeAllOnClick();
	else
		rbTypeSelectOnClick();
}

function rbTypeAllOnClick()
{
	if (document.all.dg1 == null)
		return;
	if (document.all.dg1.rows.length < 2)
		return;
	for (var iRow=2;iRow<=document.all.dg1.rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbPost"].checked = true;
		document.all["dg1__ctl"+iRow+"_cbPost"].disabled = "disabled";
	}
}

function rbTypeSelectOnClick()
{
	if (document.all.dg1 == null)
		return;
	if (document.all.dg1.rows.length < 2)
		return;
	for (var iRow=2;iRow<=document.all.dg1.rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbPost"].disabled = "";
	}
}