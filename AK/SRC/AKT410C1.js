/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060220   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060220  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060220  Justin [1050087] 二代公文修改
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

//1060220  Justin [1050087] 二代公文修改 
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
	
    //1060220  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = false;
			if(document.all["txDate1"].value=="" || document.all["txDate2"].value=="")
			{
				Page_BlockSubmit = true;
				var pErrMsg = "制定日期起訖皆須輸入\n";
				if(document.all["txDate1"].value=="")
				{
				    alert(pErrMsg);
				    //1060220  Justin [1050087] 二代公文修改
					//document.all["txDate1"].focus();
					$('#txDate1').focus();
				}
				else
				{
				    alert(pErrMsg);
				    //1060220  Justin [1050087] 二代公文修改
					//document.all["txDate2"].focus();
					$('#txDate2').focus();
				}
			}
			else
			{
				if(parseInt(document.all["txDate1"].value,10)>parseInt(document.all["txDate2"].value,10))
				{
					Page_BlockSubmit = true;
					alert("制定日期起不可以大於迄!!");
				    //1060220  Justin [1050087] 二代公文修改
					//document.all["txDate1"].focus();
					$('#txDate1').focus();
				}	
			}
		    //1060220  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1060220  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1060220  Justin [1050087] 二代公文修改 
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
    //1060220  Justin [1050087] 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue(argVal)
{
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].text = argVal;
    opener.document.all.lbReturnValue.options[0].value = argVal;
    opener.window.CallBack("AKT410C1");
    close();
}

function TbOnBlur(strObjName)
{
	var pVal1 = "";
	var pStr ="";
	var strExt = strObjName.substr(strObjName.length-1,1);

	if(strObjName == "txDate1" || strObjName == "txDate2")
	{
		pVal1=jf_Trim(document.all[strObjName].value);
		if(pVal1!="")
		{
			document.all[strObjName].value = jf_PADL(pVal1,7,"0");
			if (!jf_CheckCDATE(pVal1))
			{
			    alert("日期格式錯誤：" + pVal1);
			    //1060220  Justin [1050087] 二代公文修改
			    //document.all[strObjName].focus();
			    $('#' + strObjName).focus();
			}
		}
		return;
	}

}
