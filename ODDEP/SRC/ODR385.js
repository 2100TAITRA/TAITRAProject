/*
 * DATE    SA	   PRG		MGR_NO		DESC
 * 1050628 David   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*1050628 Justin 1050087 二代公文修改 
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;*/

/*1050628 Justin 1050087 二代公文修改 
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
			strUrl = "WEM010C1.aspx?OrgID=341020000A&K1=Dlg_Dept&Search="+document.all.txOrgno.value;
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			Page_BlockSubmit=true;
			break;
	}	
}

//1050628 Justin 1050087 二代公文修改 
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
	
    //1050628 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    //1050628 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
			Page_BlockSubmit = !CheckEmpty();
		    //1050628 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
		var DeptArray = DeptInfo.split(',');
		if(DeptArray.length > 0)
		{
			document.all["txOrgName"].value = DeptArray[1];
			document.all["txOrgno"].value = DeptArray[2];
		}		
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    /*1050628 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,null);*/
	//Zoey [000771]
	if(document.all.rbUser==null)
	{
	 document.all.trRange.className = "hide";
	 document.all.trRange2.className = "hide";
	}
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
    /*1050628 Justin 1050087 二代公文修改 
	document.all[argLabelId].innerText = obj.value;*/
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function CheckEmpty()
{
	if (document.all["txSDate"].value + document.all["txEDate"].value == "")
	{
	    /*1050628 Justin 1050087 二代公文修改
		document.all["txSDate"].focus();*/
	    $('#txSDate').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["遞送日期不可皆為空白"])),"");
		return false;
	}
	return true;
}

var wsGetOrgNameID;//宣告webserver回傳值id
function CheckOrgNo()
{
	var strOrgno = jf_Trim(document.all["txOrgno"].value);
	if (strOrgno=="")
	{
		document.all.txOrgName.value = "";
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
				document.all.txOrgno.value = CallWsObj.value.OrgID[0];
				document.all.txOrgName.value = CallWsObj.value.OrgName[0];
			}		
		}
		else
		{
			alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
		}
	}
}

//####################################################################################
//				其		他		共		用		function
//####################################################################################
//日期onblur
function CheckCDATE(argObj,strMsg)
{
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
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    /*1050628 Justin 1050087 二代公文修改
			document.all[argObj].focus();*/
		    $('#' + argObj).focus();
		}
	}
}