/*
日期        PG		單號		DESC
1060123     Kenny   1051332     調整子視窗帶回書審編號方式
1100204     Zen     1090927     取消使用document.activeElement
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1071225	Kevin_C	1050087	升二代 -S
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
	//alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1071225	Kevin_C	1050087	升二代 -E

//1100204 Zen 1090927 取消使用document.activeElement
//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement
    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

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

//1071225	Kevin_C	1050087	升二代
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
	
	//1071225	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		//1071225	Kevin_C	1050087	升二代 -S
		// case "btOpen":
			// Page_BlockSubmit = !jf_CheckKeyObject();
			// jf_ToolBarSubmit();
			// break;
		// case "btSave":
			// Page_BlockSubmit = !jf_CheckKeyObject();
			// jf_ToolBarSubmit();
			// break;
		// case "btDelete":
			// Page_BlockSubmit = !jf_ConfirmDelete();
			// jf_ToolBarSubmit();
			// break;
		// case "btCancel":
			// Page_BlockSubmit = !jf_ConfirmCancel();
			// jf_ToolBarSubmit();
			// break;
		//1071225	Kevin_C	1050087	升二代 -E
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			//1071225	Kevin_C	1050087	升二代
			//document.all.txPubName.focus();
			$('#txPubName').focus();
			break;
		case "btSearch":
			Page_BlockSubmit = false;
			if(!CheckBeforeSearch())
			{
				Page_BlockSubmit = true;
			}
			//1071225	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1071225	Kevin_C	1050087	升二代 -S
		// case "btPrint":
			// Page_BlockSubmit = !jf_ConfirmPrint();
			// break;
		// case "btPreview":
			// Page_BlockSubmit = !jf_ConfirmPreview();
			// break;
		//1071225	Kevin_C	1050087	升二代 -E
	}
}

//開啟前檢查
var pEmptyColumn = "";
var pEmptyColumnFocusValid = true;
function CheckBeforeSearch()
{
	var bRtnbool = false;
	var strObjName = "txApplyDate";
	var pIsValid = true;
	pEmptyColumn = "";
	HasValue("txPubName","申請人姓名");
	HasValue("txPubBirth","申請人出生年月日");
	HasValue("txPubId","申請人身分證明文件字號");
	
	if(pEmptyColumn != "")
	{
		alert("以下欄位不可空白：\n\r" + pEmptyColumn);
		return false
	}
	
	return true;
}

function HasValue(strObjName,strObjDesc)
{
	if(jf_Trim(document.all[strObjName].value) == "")
	{
		pEmptyColumn += strObjDesc + "\n\r";
		if(pEmptyColumnFocusValid) 
		{
			//1071225	Kevin_C	1050087	升二代
			//document.all[strObjName].focus();
			$('#'+strObjName).focus();
			pEmptyColumnFocusValid = false;
		}
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
	//1071225	Kevin_C	1050087	升二代
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function RetSelect(argApplyNo, argPubName, argPubBirth, argPubId)
{
	var pUrl ="";
	pUrl = "AKT850.aspx?k1="+argApplyNo+"&k2="+argPubName+"&k3="+argPubBirth+"&k4="+argPubId;
	jf_OpenWindow(pUrl,"AKT850","");
}

function TbOnBlur(strObjName)
{
	var pIsValid = true;
	var pStr = "";
	
	if(strObjName == "txApplyDateS" || strObjName == "txPubBirth" || strObjName == "txApplyDateE")
	{
		pVal1=jf_Trim(document.all[strObjName].value);
		if(pVal1!="")
		{
			if (!jf_CheckCDATE(pVal1))
			{
				pStr = pStr + "日期格式錯誤："+pVal1+"\n\r";
				//1071225	Kevin_C	1050087	升二代
				//if (pIsValid) document.all[strObjName].focus();
				if (pIsValid) $('#'+strObjName).focus();
				pIsValid = false;
			}
		}
	}

	if(pStr != "")
	{
		alert(pStr);
	}
	return pIsValid;
}

//1060123   Kenny   [1051332]   調整子視窗帶回書審編號方式
//1100204 Zen 1090927 取消使用document.activeElement
//function ReturnValue()
function ReturnValue(argId)
{
    //1100204 Zen 1090927 取消使用document.activeElement
    //var xObjectName = document.activeElement.id;
    var xObjectName = argId;
	var rowstr = xObjectName.substring(0,xObjectName.indexOf("hlBookNo"));
	if(opener != null)
	{
		opener.document.all.lbReturnValue.length = 1;
		//1071225	Kevin_C	1050087	升二代
		//opener.document.all.lbReturnValue.options[0].text = document.all(rowstr+"hlBookNo").innerText;  ;
		opener.document.all.lbReturnValue.options[0].text = document.all(rowstr+"hlBookNo").textContent;  ;
		opener.window.CallBack("AKI850");
		close();
    }
}
