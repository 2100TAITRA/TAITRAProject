/*
DATE 	SA		PRG		MGR_NO	DESC
1050414	David	Joe		1050087 二代系統升級
1050520	David	JOE		1050087	二代系統升級，調整focus寫法
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050414	Joe	1050087	二代系統升級--START
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
	
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();	
//1050414	Joe	1050087	二代系統升級--END
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

//1050414	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050414	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050414	Joe	1050087	二代系統升級
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
			//1050414	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050414	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050414	Joe	1050087	二代系統升級
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
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = true;
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
		strMon = "一";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon1"].focus();
		$('#txMon1').focus();
	}
	else if (!CheckWord(strMon2))
	{
		strMon = "二";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon2"].focus();
		$('#txMon2').focus();
	}
	else if (!CheckWord(strMon3))
	{
		strMon = "三";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon3"].focus();
		$('#txMon3').focus();
	}
	else if (!CheckWord(strMon4))
	{
		strMon = "四";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon4"].focus();
		$('#txMon4').focus();
	}
	else if (!CheckWord(strMon5))
	{
		strMon = "五";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon5"].focus();
		$('#txMon5').focus();
	}
	else if (!CheckWord(strMon6))
	{
		strMon = "六";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon6"].focus();
		$('#txMon6').focus();
	}
	else if (!CheckWord(strMon7))
	{
		strMon = "七";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon7"].focus();
		$('#txMon7').focus();
	}
	else if (!CheckWord(strMon8))
	{
		strMon = "八";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon8"].focus();
		$('#txMon8').focus();
	}
	else if (!CheckWord(strMon9))
	{
		strMon = "九";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon9"].focus();
		$('#txMon9').focus();
	}
	else if (!CheckWord(strMon10))
	{
		strMon = "十";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon10"].focus();
		$('#txMon10').focus();
	}
	else if (!CheckWord(strMon11))
	{
		strMon = "十一";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txMon11"].focus();
		$('#txMon11').focus();
	}
	else if (!CheckWord(strMon12))
	{
		strMon = "十二";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
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