/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		 修改人	 單號       概要
 * -------------------------------------------------------------------------------------------------
 * 1060215   Joe	 1050087 	二代系統升級
 * 1130125   Cloud   1130049    修正報表呈現資訊與畫面選項無法對應問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


var IsServerHandling = new Boolean();
IsServerHandling = false;

	//1060215	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

	//1060215	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	

//1060215	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060215	Joe	1050087	二代系統升級
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

//1060215	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060215	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":
			var xUrl = "AKP210.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"AKP210",760,500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
			//Ericks start 2005/10/13
			if (CheckIsStatic()) 
			{
				if (CheckBeforePrint())
				{
					Page_BlockSubmit = !jf_ConfirmPrint();
				}
				else
				{
					Page_BlockSubmit = true;	
				}
			}
			else
			{
				Page_BlockSubmit = true;
				alert("尚未經過統計，無法列印");		
			}
			//Ericks end 2005/10/13
								
			//1060215	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		
			//Ericks start 2005/10/13
			if (CheckIsStatic()) 
			{
				if (CheckBeforePrint())
				{
					Page_BlockSubmit = !jf_ConfirmPrint();
				}
				else
				{
					Page_BlockSubmit = true;	
				}
			}
			else
			{
				Page_BlockSubmit = true;
				alert("尚未經過統計，無法預覽");		
			}
			//Ericks end 2005/10/13	
				
			//1060215	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="AKP210sp")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
			if (strMaxUseDate == "")
				document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			else
				document.all["lbMaxYear"].textContent = "目前統計最大年月："+
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
		}
	}
}

function ClientOnLoad()
{
    //* 1130125   Cloud   1130049    修正報表呈現資訊與畫面選項無法對應問題
    if(document.all["Akp210Mode"].value="N")
        document.all["drPrintLv"].className = "hide";
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
	var bRtnBool=true;				
	
	if (document.all["rbMonth"].checked == true)
	{
		if (document.all["txSDate"].value + document.all["txEDate"].value == "")
		{
			bRtnBool = false;
			//1060215	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txSDate"].focus();
			$('#txSDate').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["列印月份"])),"");
		}
	}
	else
	{
		if (document.all["txYear"].value == "")
		{
			bRtnBool = false;
			//1060215	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txYear"].focus();
			$('#txYear').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["列印年度"])),"");
		}
	}
	
	return bRtnBool;
}

function rbMonth_onclick()
{
	//1060215	Joe	1050087	二代系統升級，調整focus寫法
	//document.all["txSDate"].focus();
	$('#txSDate').focus();
}

function rbYear_onclick()
{
	//1060215	Joe	1050087	二代系統升級，調整focus寫法
	//document.all["txYear"].focus();
	$('#txYear').focus();
}

function CheckDateFormula(argId,strMsg)
{
	var strDate = document.all[argId].value;
	if (strDate != "")
	{
		if (strDate.length < 5)
		{
			strDate = jf_PADL(strDate,5,'0');
			document.all[argId].value = strDate;
		}
		if (!jf_CheckCDATE(strDate+"01"))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1060215	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argId].focus();
			$('#'+argId).focus();
		}
	}
}

function CheckYearFormula(argId)
{
	var strDate = document.all[argId].value;
	if (strDate != "")
	{
		if (strDate.length < 3)
		{
			strDate = jf_PADL(strDate,3,'0');
			document.all[argId].value = strDate;
		}
	}
}

//Ericks start 2005/10/13
function CheckIsStatic()
{
	var strIsStatic = document.all["IsStatic"].value;			
	if (strIsStatic=="Y")
		return true;
	else
		return false;			

}
//Ericks end 2005/10/13
/*************************************************
		測試程式
**************************************************/
function akjf_DeptCheck()
{}