/*
DATE	SA		PRG		MGR_NO		DESC
1050523 David   Zen     1050087     二代公文修改
1060202	Kevin	Joe		1060007		扣抵連修調整，預設1/1號為假日
1060518 Leslie  Zen     1060215     innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050523 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1050523 Zen 1050087 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
//if (document.all["ValidationSummary1"].textContent != "")
//    jf_ShowValidator();
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

//1050523 Zen 1050087 二代公文修改
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
	
    //1050523 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050523 Zen 1050087 二代公文修改
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
		    //1050523 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050523 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050523 Zen 1050087 二代公文修改
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
    //1050523 Zen 1050087 二代公文修改，判斷瀏覽器--begin
    var isFirefox = false;
    if (navigator.userAgent.match("Firefox"))
        isFirefox = true;

    if (isFirefox)
    {
        document.all.Label1.style.width = "13em";
        document.all.Label2.style.width = "9.25em";
        document.all.Label3.style.width = "9.125em";
        document.all.Label4.style.width = "13em";
        document.all.Label5.style.width = "9.25em";
        document.all.Label6.style.width = "9.125em";
    }
    //1050523 Zen 1050087 二代公文修改判斷瀏覽器--begin
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	
	//1060202	Joe		1060007		扣抵連修調整，預設1/1號為假日
	document.all.cbSelect1.checked = true;
}

function OnWSResult(argResult)
{
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
	if (CheckLength())
	{
		if (CheckBeforSave())
			bRtnbool = CheckMonthLength();
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	var bRtnbool = true;
	var strMon = "";
	var strMon1 = document.all["txMon1"].value;
	var strMon2 = document.all["txMon2"].value;
	var strMon3 = document.all["txMon3"].value;
	var strMon4 = document.all["txMon4"].value;
	var strMon5 = document.all["txMon5"].value;
	var strMon6 = document.all["txMon6"].value;
	var strMon7 = document.all["txMon7"].value;
	var strMon8 = document.all["txMon8"].value;
	var strMon9 = document.all["txMon9"].value;
	var strMon10 = document.all["txMon10"].value;
	var strMon11 = document.all["txMon11"].value;
	var strMon12 = document.all["txMon12"].value;
	
	if (!CheckWord(strMon1))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "一";
	    strMon += "一";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon1"].focus();
	    $('#txMon1').focus();
    }
	else if (!CheckWord(strMon2))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "二";
	    strMon += "二";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon2"].focus();
	    $('#txMon2').focus();
    }
	else if (!CheckWord(strMon3))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "三";
	    strMon += "三";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon3"].focus();
	    $('#txMon3').focus();
    }
	else if (!CheckWord(strMon4))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "四";
	    strMon += "四";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon4"].focus();
	    $('#txMon4').focus();
    }
	else if (!CheckWord(strMon5))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "五";
	    strMon += "五";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon5"].focus();
	    $('#txMon5').focus();
    }
	else if (!CheckWord(strMon6))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "六";
	    strMon += "六";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon6"].focus();
	    $('#txMon6').focus();
    }
	else if (!CheckWord(strMon7))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "七";
	    strMon += "七";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon7"].focus();
	    $('#txMon7').focus();
    }
	else if (!CheckWord(strMon8))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "八";
	    strMon += "八";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon8"].focus();
	    $('#txMon98').focus();
    }
	else if (!CheckWord(strMon9))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "九";
	    strMon += "九";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon9"].focus();
	    $('#txMon9').focus();
    }
	else if (!CheckWord(strMon10))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "十";
	    strMon += "十";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon10"].focus();
	    $('#txMon10').focus();
    }
	else if (!CheckWord(strMon11))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "十一";
	    strMon += "十一";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon11"].focus();
	    $('#txMon11').focus();
    }
	else if (!CheckWord(strMon12))
	{
	    //1050523 Zen 1050087 修改錯誤訊息邏輯
	    //strMon = "十二";
	    strMon += "十二";
	    //1050523 Zen 1050087 二代公文修改
	    //document.all["txMon12"].focus();
	    $('#txMon12').focus();
	}
	
	if (strMon != "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMon + "月 有不正確字元"])),"");
	}
	else
		bRtnbool = true;
	
	return bRtnbool;
}

function CheckWord(argMon)
{
	var bRtn = true;
	var argArr = argMon.split('');
	for (var iLen=0;iLen<argArr.length;iLen++)
	{
		if (argArr[iLen] != "Ｈ" && argArr[iLen] != "Ｏ" && argArr[iLen] != "＄" && argArr[iLen] != "　")
		{
			bRtn = false;
			break;
		}
	}
	return bRtn;
}

function CheckLength()
{
	var bRtnbool = true;
	var strMon = ""
	var strMon1 = document.all["txMon1"].value;
	var strMon2 = document.all["txMon2"].value;
	var strMon3 = document.all["txMon3"].value;
	var strMon4 = document.all["txMon4"].value;
	var strMon5 = document.all["txMon5"].value;
	var strMon6 = document.all["txMon6"].value;
	var strMon7 = document.all["txMon7"].value;
	var strMon8 = document.all["txMon8"].value;
	var strMon9 = document.all["txMon9"].value;
	var strMon10 = document.all["txMon10"].value;
	var strMon11 = document.all["txMon11"].value;
	var strMon12 = document.all["txMon12"].value;
	
	if (strMon1.length != 31)
	{
	    strMon = "一";
	    //1050606 Zen 1050087 二代公文修改
	    //document.all["txMon1"].focus();
	    $('#txMon1').focus();
	}
	else if (strMon2.length != 31)
	{
		strMon = "二";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon2"].focus();
		$('#txMon2').focus();
	}
	else if (strMon3.length != 31)
	{
		strMon = "三";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon3"].focus();
		$('#txMon3').focus();
	}
	else if (strMon4.length != 31)
	{
		strMon = "四";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon4"].focus();
		$('#txMon4').focus();
	}
	else if (strMon5.length != 31)
	{
		strMon = "五";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon5"].focus();
		$('#txMon5').focus();
	}
	else if (strMon6.length != 31)
	{
		strMon = "六";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon6"].focus();
		$('#txMon6').focus();
	}
	else if (strMon7.length != 31)
	{
		strMon = "七";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon7"].focus();
		$('#txMon7').focus();
	}
	else if (strMon8.length != 31)
	{
		strMon = "八";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon8"].focus();
		$('#txMon8').focus();
	}
	else if (strMon9.length != 31)
	{
		strMon = "九";
	    //1050606 Zen 1050087 二代公文修改
	    //document.all["txMon9"].focus();
		$('#txMon9').focus();
	}
	else if (strMon10.length != 31)
	{
		strMon = "十";
	    //1050606 Zen 1050087 二代公文修改
	    //document.all["txMon10"].focus();
		$('#txMon10').focus();
	}
	else if (strMon11.length != 31)
	{
		strMon = "十一";
	    //1050606 Zen 1050087 二代公文修改
	    //document.all["txMon11"].focus();
		$('#txMon11').focus();
	}
	else if (strMon12.length != 31)
	{
		strMon = "十二";
	    //1050606 Zen 1050087 二代公文修改
	    //document.all["txMon12"].focus();
		$('#txMon12').focus();
	}
	
	if (strMon != "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMon + "月長度不正確"])),"");
	}
	else
		bRtnbool = true;

	return bRtnbool;
}

function CheckMonthLength()
{
    //1050523 Zen 1050087 判斷邏輯修改
	//var len;
	var bRtnbool = true;
	var strMon = "";
	var strMon2 = document.all["txMon2"].value;
	var strMon4 = document.all["txMon4"].value;
	var strMon6 = document.all["txMon6"].value;
	var strMon9 = document.all["txMon9"].value;
	var strMon11 = document.all["txMon11"].value;
    //1050523 Zen 1050087 判斷邏輯修改
	len=0;
	//for (var iArr=0;iArr<strMon2.length;iArr++)
	//{
	//	if (strMon2.charAt(iArr) != "＄")
	//		len++;
	//}
    //if (len != document.all["H_Len"].value)
	if (strMon2.indexOf('＄') != document.all["H_Len"].value)
	//1050523 Zen 1050087 判斷邏輯修改
	{
	    strMon = "二";
	    //1050606 Zen 1050087 二代公文修改
	    //document.all["txMon2"].focus();
	    $('#txMon2').focus();
	}
	else if (strMon4.indexOf('＄') != 30)
	{
		strMon = "四";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon4"].focus();
		$('#txMon4').focus();
    }
	else if (strMon6.indexOf('＄') != 30)
	{
		strMon = "六";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon6"].focus();
		$('#txMon6').focus();
    }
	else if (strMon9.indexOf('＄') != 30)
	{
		strMon = "九";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon9"].focus();
		$('#txMon9').focus();
    }
	else if (strMon11.indexOf('＄') != 30)
	{
		strMon = "十一";
	    //1050606 Zen 1050087 二代公文修改
		//document.all["txMon11"].focus();
		$('#txMon11').focus();
    }
	
	if (strMon != "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMon + "月 日數不正確"])),"");
	}
	else
		bRtnbool = true;
		
	return bRtnbool;
}