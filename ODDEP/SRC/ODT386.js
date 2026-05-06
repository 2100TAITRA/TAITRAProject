/*
DATE	SA 		PRG		MGR_NO			DESC
1050608 David	Zen     1050087         二代公文修改
1060518 Leslie  Zen     1060215         innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050608 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050608 Zen 1050087 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

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
//1050608 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    //1050608 Zen 1050087 二代公文修改
    //document.all.tbTool.focus();
    $('#tbTool').focus();
	if (jf_GetActionMode()==LayoutModeModify)
		ThisProg_onblur();

	var xObjectName;
	var evBtn;

	if(IsServerHandling)
	   return;

	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

    //1050608 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btBatch"://成批
			Page_BlockSubmit = !CheckBeforeBatch();
		    //1050608 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btOpen":
			Page_BlockSubmit = !CheckBeforeOpen();
		    //1050608 Zen 1050087 二代公文修改
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
		    //1050608 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050608 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050608 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
		    //1050608 Zen 1050087 二代公文修改
			//document.all["txDate"].focus();
			$('#txDate').focus();
			break;
		case "btSearch":
		    //1050608 Zen 1050087 二代公文修改
		    Page_BlockSubmit = true;
		    var strUrl = "";
			var strPostDate = document.all["txDate"].value;
			var strPostSeq = document.all["txPostSeq"].value;
			strUrl = "ODC386.aspx?rtnObj=lbReturnValue&argPostDate="+strPostDate+"&argPostSeq="+strPostSeq;
			jf_OpenChildWin(strUrl, "ODC386", 480, 370 );
			break;
		case "btPrint":
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = true;
		    //1050608 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = true;
		    //1050608 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "ODC386")
	{
		document.all["txPostSeq"].value = document.all["lbReturnValue"].options[0].text;
		OpenButtonSubmit();
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
}

function ClientOnLoad()
{
    //1050608 Zen 1050087 二代公文修改
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
    ShowMsg();
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
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
			bRtnbool = true;
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
	var bRtnbool = true;
	
	return bRtnbool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = true;
	
	return bRtnbool;
}

function CheckBeforeBatch()
{
	var bRtnbool = true;
	var strErrMsg="";

	if (document.all["txDate"].value == "")
	{
		strErrMsg = "郵寄日期不可空白";
	    //1050608 Zen 1050087 二代公文修改
		//document.all["txDate"].focus();
		$('#txDate').focus();
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}
	return bRtnbool;
}

function CheckBeforeOpen()
{
	var bRtnbool = true;
	var strErrMsg="";

	if (document.all["txPostSeq"].value == "")
	{
		strErrMsg = "郵資機使用編號不可空白";
	    //1050608 Zen 1050087 二代公文修改
		//document.all["txPostSeq"].focus();
		$('#txPostSeq').focus();
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}
	return bRtnbool;
}
/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
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
		    //1050608 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
		}
	}
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

//只允許數字及小數點輸入且小數點後面只允許輸入一位數
function InpNumAndPoint()
{
	var kc = event.keyCode;
	var argObj = document.all[event.srcElement.id];

	var index = argObj.value.indexOf('.');
	if (index > 0)
	{
		//Only allow 0-9, the other will set to nothing
		if ( (kc < 48) || (kc > 57) )
			event.keyCode = 0;
		if (argObj.value.length == index+2)
			event.keyCode = 0;
	}
	else
	{
		//Only allow 0-9 & '.' , the other will set to nothing
		if ( (kc != 46) && (kc < 48) || (kc > 57) )
			event.keyCode = 0;
	}
}

function ThisProg_onblur()
{
	var strThisProg = document.all["txThisProg"].value;
	var strLastProg = document.all["txLastProg"].value;
	var strUseCnt = document.all["txUseCnt"].value;
	var strRealCnt=document.all["txRealCnt"].value;
	if((Number(strThisProg)-Number(strLastProg)-Number(strRealCnt)) <0)
	{
		alert('本次異動數字有誤,請重新輸入;\n或執行[ODT387 郵資機遞增及遞減數維護作業]以維護相關數據');
	    //1050608 Zen 1050087 二代公文修改
		//document.all.txThisProg.focus();
		$('#txThisProg').focus();
		return;
	}
	/*
	//註銷數字=使用數字+前次遞增數-本次遞增數(修改後)
	document.all["txCancelCnt"].value = Number(strUseCnt) + Number(strLastProg) - Number(strThisProg);
	//實際使用數字=使用數字-註銷數字
	var strCancelCnt = document.all["txCancelCnt"].value;
	document.all["txRealCnt"].value = Number(strUseCnt) - Number(strCancelCnt);
	*/
	//使用數字=本次異動-前次紀錄
	document.all["txUseCnt"].value = Number(strThisProg)-Number(strLastProg);
	//註銷數字=本次異動-前次紀錄-實際使用數字
	document.all["txCancelCnt"].value = Number(strThisProg)-Number(strLastProg)-Number(strRealCnt);
}

function OpenButtonSubmit()
{
	document.all.ToolBarSenderID.value = "btOpen";
	
	if(Page_BlockSubmit==false)
	{
		IsServerHandling = true;
		jf_ShowWaitState();
		__doPostBack("tbTool",1);
	}
}

function txPostCost_onblur()
{
	var strPostCost = jf_Trim(document.all["txPostCost"].value);
	var strLastTotal = document.all["txLastTotal"].value;
	//var strRealCnt=document.all["txRealCnt"].value;
	//document.all["txThisDiminish"].value = Number(strPostCost) + Number(strLastTotal)-Number(strRealCnt);
	var strThisProg = document.all["txThisProg"].value;
	document.all["txThisDiminish"].value = Number(strPostCost) + Number(strLastTotal)-Number(strThisProg);
	document.all["txThisTotal"].value = Number(strPostCost) + Number(strLastTotal);
}
