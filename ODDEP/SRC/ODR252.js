/*
 * DATE    SA	   PRG		MGR_NO		DESC
 * 1050414 David   Justin   1050087     二代公文修改
 */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050414 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
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
		/*
		case "":
			break;
		*/
	}	
}

//1050414 Justin 1050087 二代公文修改 
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

    //1050414 Justin 1050087 二代公文修改 
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !CheckBeforePrint();
		    //1050414 Justin 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckBeforePrint();
		    //1050414 Justin 1050087 二代公文修改 
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
    //1050419 Justin 1050087 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
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

function CheckBeforePrint()
{
	var bRtn = true;
	var strDocNo = jf_Trim(document.all["txDocNo"].value);
	document.all["txDocNo"].value = strDocNo;
	if (strDocNo == "")
	{
		bRtn = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["公文文號"])),"");
	}
	//////////////MOB 20070501 新增機密檔案專用封套欄位判斷 格式範例0960101
	if (!CheckPackDate())
	{
		bRtn = false;
	}	
	//////////////	
	return bRtn;
}
/////////////MOB 20070501 新增機密檔案專用封套欄位判斷 格式範例0960101
function CheckPackDate()
{
	var Msg = ""; 
	var bRtnbool = true;
	if(document.all.txPackDate != null)	//判斷txPackDate是否在畫面上
	{
		if (document.all.txPackDate.value != "")
		{
			var tempPackDate = jf_PADL(document.all.txPackDate.value,7,0);
			if (!jf_CheckCDATE(tempPackDate))
			{
				//Page_BlockSubmit = true;
				Msg += "日期格式不正確\n";
			}
			else
				document.all.txPackDate.value = tempPackDate;
		}
	}
	
	if (Msg != "")
	{
		bRtnbool = false;
		alert(Msg);
	}
	return bRtnbool;
}
////////////