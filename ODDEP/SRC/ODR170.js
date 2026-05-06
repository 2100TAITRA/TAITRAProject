/*
DATE	SA	    PRG		MGR_NO		DESC
1051013 David   Justin  1050087     二代公文修改
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1051013 Justin [1050087] 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1051013 Justin [1050087] 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//    alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

//1051013 Justin [1050087] 二代公文修改
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

//1051013 Justin [1050087] 二代公文修改 
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
	
    //1051013 Justin [1050087] 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if (fnCheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
		    //1051013 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (fnCheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
		    //1051013 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function ClientOnLoad()
{
	ShowMsg();
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function fnCheckBeforePrint()
{
	var strSendDept = document.all.dlSendDept.options[document.all.dlSendDept.selectedIndex].value;
	var strRcvDept = document.all.dlRcvDept.options[document.all.dlRcvDept.selectedIndex].value;
	var strTimeS = document.all.txTimeS.value;
	var strTimeE = document.all.txTimeE.value;

	if (strTimeS == "" || strTimeE == "")
	{
	    if (strTimeE == "")
	        //1051013 Justin [1050087] 二代公文修改
	        //document.all.txTimeS.focus();
	        $('#txTimeS').focus();
		else
	        //document.all.txTimeE.focus();
	        $('#txTimeE').focus();
		alert("送出時間起訖條件不可為空白。");
		return false;
	}	
	/*
	if (strSendDept + strRcvDept + strTimeS + strTimeE == "")
	{
		document.all.txTimeS.focus();
		alert("請至少輸入一個條件。");
		return false;
	}
	*/
	
	if (strSendDept != "" && strRcvDept != "")
	{
		if (strSendDept == strRcvDept)
		{
		    //1051013 Justin [1050087] 二代公文修改
		    //document.all.dlSendDept.focus();
		    $('#dlSendDept').focus();
			alert("收送件單位不能相同。");
			return false;
		}
		else
		{
			var strSendOrg = strSendDept.split('-')[0];
			var strRcvOrg = strRcvDept.split('-')[0];
			if (strSendOrg != strRcvOrg)
			{
			    //1051013 Justin 1050087 二代公文修改
				//document.all.dlSendDept.focus();
			    $('#dlSendDept').focus();
			    alert("收送件單位所屬機關必須相同。");
				return false;
			}
		}
	}
	return true;
}