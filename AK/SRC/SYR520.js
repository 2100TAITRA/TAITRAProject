/*
DATE 	SA		PRG		MGR_NO	DESC
1020426 Leslie  Jagle	1020186	增加匯出EXCEL功能
1060315	Cloud	Kevin_C	1050087	升二代1100204 Leslie  Zen     1090927 取消使用document.activeElement
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060315	Kevin_C	1050087	升二代 -S
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1060315	Kevin_C	1050087	升二代 -E
	
//1020426	Jagle	[1020186]	設定EXCEL按鈕
SetTbTool();

//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
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

//1060315	Kevin_C	1050087	升二代
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
	
	//1060315	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060315	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060315	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060315	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060315	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			document.all["rbTotal"].checked = true;
			break;
		case "btStatic":
			var xUrl = "AKP210.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"AKP210",760,500);
			Page_BlockSubmit = true;
			break;
		//1020426	Jagle	[1020186]	增加匯出EXCEL功能
		case "btExcel":
			if(document.all["txSMonth"].value=="" || document.all["txEMonth"].value=="" || !document.all["rbUser"].checked && !document.all["rbDept"].checked && !document.all["rbTotal"].checked)
			{
				var AlertStr = "";
				var FocusAt = "";
				if(document.all["txSMonth"].value=="")
			    { 
					AlertStr= AlertStr + "列印月份，起始月份不可為空白!\n";
				    if(FocusAt=="") FocusAt="txSMonth";
			    }
				if(document.all["txEMonth"].value=="")
				{ 
					AlertStr= AlertStr + "列印月份，迄止月份不可為空白!\n";
					if(FocusAt=="") FocusAt="txEMonth";
				}
				if(!document.all["rbUser"].checked && !document.all["rbDept"].checked && !document.all["rbTotal"].checked)
				{
					AlertStr= AlertStr + "請選擇欲分析報表類別!\n";
					if(FocusAt=="") FocusAt="rbUser";
				}
				alert(AlertStr);
				//1060315	Kevin_C	1050087	升二代
				//document.all[FocusAt].focus();
				$(FocusAt).focus();
				Page_BlockSubmit =true;
			}
			else
			{
				if(document.all["txSMonth"].value != document.all["txEMonth"].value) 
				{
					var AlertStr = "使用匯出EXCEL功能時，列印月份起迄必須相同!\n";
					if(FocusAt=="") FocusAt="txSMonth";
					alert(AlertStr);
					//1060315	Kevin_C	1050087	升二代
					//document.all[FocusAt].focus();
					$(FocusAt).focus();
					Page_BlockSubmit =true;
				}
				else
					Page_BlockSubmit =false;
			}
			//1060315	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
			if(document.all["txSMonth"].value=="" || document.all["txEMonth"].value=="" || !document.all["rbUser"].checked && !document.all["rbDept"].checked && !document.all["rbTotal"].checked)
			{
				var AlertStr = "";
				var FocusAt = "";
				if(document.all["txSMonth"].value=="")
			    { 
					AlertStr= AlertStr + "列印月份，起始月份不可為空白!\n";
				    if(FocusAt=="") FocusAt="txSMonth";
			    }
				if(document.all["txEMonth"].value=="")
				{ 
					AlertStr= AlertStr + "列印月份，迄止月份不可為空白!\n";
					if(FocusAt=="") FocusAt="txEMonth";
				}
				if(!document.all["rbUser"].checked && !document.all["rbDept"].checked && !document.all["rbTotal"].checked)
				{
					AlertStr= AlertStr + "請選擇欲分析報表類別!\n";
					if(FocusAt=="") FocusAt="rbUser";
				}
				alert(AlertStr);
				//1060315	Kevin_C	1050087	升二代
				//document.all[FocusAt].focus();
				$(FocusAt).focus();
				Page_BlockSubmit =true;
			}
			else
			{
				if(parseInt(document.all["txSMonth"].value,10)>parseInt(document.all["txEMonth"].value,10)) 
				{
					AlertStr= AlertStr + "列印月份，起始月份不可大於迄止月份!\n";
					if(FocusAt=="") FocusAt="txSMonth";
					alert(AlertStr);
					//1060315	Kevin_C	1050087	升二代
					//document.all[FocusAt].focus();
					$(FocusAt).focus();
					Page_BlockSubmit =true;
				}
				else
					Page_BlockSubmit =false;
			}
			//1060315	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="AKP210")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
  			var strUseDate = document.all["txMsg"].value;
			if (strMaxUseDate == "")
				document.all["txMsg"].value = "您尚未執行過統計作業";			
			else
			{
				if (fnGetNumber(strMaxUseDate) > fnGetNumber(strUseDate))
					document.all["txMsg"].value = "目前統計最大年月：" + strMaxUseDate.substr(0,3)+"年"+strMaxUseDate.substr(3,2)+"月";
			}
		}
	}
}

function fnGetNumber(argStr)
{ 
	var StrLen    = argStr.length;
	var NumStr   = "";
	var returnStr = "";

	for (i = 0; i < StrLen ; i++) 
	{ 
		NumStr = argStr.substring(i,i+1);
		if (fnIsNum(NumStr))
			returnStr = returnStr + NumStr;
	}
	return  returnStr;
}

function fnIsNum(s)
{
	switch (s)
	{
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return true;
			break;
	}
	return false;	
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
	document.all[argLabelId].innerText = obj.value;
}

function CheckDateType()
{
	if(document.all["txSMonth"].value =="") return;
	var strDate;
	strDate=document.all["txSMonth"].value;
	strDate=jf_PADL(strDate,5,'0')
	document.all["txSMonth"].value=strDate;
	
    if (!jf_CheckCDATE(strDate+"01"))
	{   
	    jf_ShowMeg("請確認日期格式","格式錯誤");
		//1060315	Kevin_C	1050087	升二代
		//document.all["txSMonth"].focus();
		$('txSMonth').focus();
		return;
	}
}
function CheckDateType1()
{
	if(document.all["txEMonth"].value =="") return;
	var strDate;
	strDate=document.all["txEMonth"].value;
	strDate=jf_PADL(strDate,5,'0')
	document.all["txEMonth"].value=strDate;
	
    if (!jf_CheckCDATE(strDate+"01"))
	{   
	    jf_ShowMeg("請確認日期格式","格式錯誤");
		//1060315	Kevin_C	1050087	升二代
		//document.all["txEMonth"].focus();
		$('txEMonth').focus();
		return;
	}
}

//1020426	Jagle	[1020186]	增加匯出EXCEL功能(僅選擇人員別工作量統計表時啟用)
function SetTbTool()
{
	if(document.all.rbTotal.checked)
		//1060315	Kevin_C	1050087	升二代
		//document.all.tbTool.getItem(12).setAttribute("disabled",false);
		document.all.btExcel.disabled = false;
	else
		//1060315	Kevin_C	1050087	升二代
		//document.all.tbTool.getItem(12).setAttribute("disabled",true);
		document.all.btExcel.disabled = true;
}
