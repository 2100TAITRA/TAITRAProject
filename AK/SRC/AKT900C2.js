/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1030328	Eileen	1030182	清查將原使用AKC320分類號查詢改使用EAC005
 * 1060615	Joe		1050087	二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060615	Joe	1050087	二代系統升級--S
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

// if (document.all["ValidationSummary1"].innerText != "")
	// alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1060615	Joe	1050087	二代系統升級--E

var ActiveBtn="";
//1060615	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060615	Joe	1050087	二代系統升級
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
		case "btClsHelp":	//分類號(起)
			//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
			/*var strUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all["txSCls"].value;
			jf_OpenChildWin(strUrl,"AKC320",760,500);*/
			var strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT900C2&MODE=1&SHOWALL=1";
			strUrl +="&FILE_YEAR="+jf_Trim(document.all.txSYear.value)+"&FILE_CLS="+jf_Trim(document.all.txSCls.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);
			//Eileen -- end
			ActiveBtn="btClsHelp";
			Page_BlockSubmit = true;
			break;
		case "btSCaseHelp":	//案次號(起)
			//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
			/*var strUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all["txSCase"].value;
			jf_OpenChildWin(strUrl,"AKC320",760,500);*/
			var strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT900C2&MODE=2&SHOWALL=1";
			strUrl +="&FILE_YEAR="+jf_Trim(document.all.txSYear.value)+"&FILE_CLS="+jf_Trim(document.all.txSCls.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);
			//Eileen -- end
			ActiveBtn="btSCaseHelp";
			Page_BlockSubmit = true;
			break;
		case "btECaseHelp":	//案次號(迄)
			//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
			/*var strUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all["txECase"].value;
			jf_OpenChildWin(strUrl,"AKC320",760,500);*/
			var strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT900C2&MODE=2&SHOWALL=1";
			strUrl +="&FILE_YEAR="+jf_Trim(document.all.txEYear.value)+"&FILE_CLS="+jf_Trim(document.all.txECls.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);
			//Eileen -- end
			ActiveBtn="btECaseHelp";
			Page_BlockSubmit = true;
			break;
	}	
}

//1060615	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060615	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			if (ConfirmSave())
				SetCanSubmit();
			else
				SetCanNotSubmit();
			//1060615	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			document.all["rbOriginal"].checked = true;
			break;
		case "btExit":
			Page_BlockSubmit = true;
			//1060615	Joe	1050087	二代系統升級
			//jf_ConfirmExit();
			var ret = window.confirm("確定要離開本程式嗎？");
			if (ret)
				DlgClose();
			break;
	}
}

function CallBack(argCallerId)
{
	//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
	/*if (argCallerId=="AKC320")
	{
		if(ActiveBtn == "btClsHelp" || ActiveBtn == "btSCaseHelp")
		{
			if(document.all["lbReturnValue"].length>0)
			{
				document.all["txSCls"].value=document.all["lbReturnValue"].options[0].value;
				document.all["txECls"].value=document.all["lbReturnValue"].options[0].value;
				document.all["txSCase"].value=document.all["lbReturnValue"].options[0].text;
				if(document.all["lbReturnValue"].options[1].text!="")
				{
					document.all["txSYear"].value=document.all["lbReturnValue"].options[1].text;
					document.all["txEYear"].value=document.all["lbReturnValue"].options[1].text;
				}
			}
		}
		else if (ActiveBtn == "btECaseHelp")
		{
			if(document.all["lbReturnValue"].length>0)
			{
				document.all["txSCls"].value=document.all["lbReturnValue"].options[0].value;
				document.all["txECls"].value=document.all["lbReturnValue"].options[0].value;
				document.all["txECase"].value=document.all["lbReturnValue"].options[0].text;
				if(document.all["lbReturnValue"].options[1].text!="")
				{
					document.all["txSYear"].value=document.all["lbReturnValue"].options[1].text;
					document.all["txEYear"].value=document.all["lbReturnValue"].options[1].text;
				}
			}
		}
	}*/
	//lbReturnValue[0]=年度號
	//lbReturnValue[1]=分類號
	//lbReturnValue[2]=案次號
	//lbReturnValue[3]=案次號鍵值case_key
	//lbReturnValue[4]=分類號鍵值cls_key
	//lbReturnValue[5]=版本別
	//lbReturnValue[6]=分類號名稱
	if (argCallerId=="EAC005")
	{
		if ( document.all.lbReturnValue.length > 0 )
		{
			document.all.txSCls.value = document.all.lbReturnValue.options[1].value;
			document.all.txECls.value = document.all.lbReturnValue.options[1].value;
			document.all.txSYear.value = document.all.lbReturnValue.options[0].value;
			document.all.txEYear.value = document.all.lbReturnValue.options[0].value;
			
			if(ActiveBtn == "btClsHelp" || ActiveBtn == "btSCaseHelp")
				document.all.txSCase.value = document.all.lbReturnValue.options[2].value;
			else if (ActiveBtn == "btECaseHelp")
				document.all.txECase.value = document.all.lbReturnValue.options[2].value;
		}
	}
	if(document.all.lbReturnValue.options != null)//清空lbReturnValue物件
		document.all.lbReturnValue.options.length = 0;
	//Eileen -- end
}

function ClientOnLoad()
{
	
}

function OnWSResult(argResult)
{
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1060615	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
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

//############################################################################################
//							ToolBar Click function
//############################################################################################
function ConfirmSave()
{
	var bRtnbool = true;
	return bRtnbool;
}
//############################################################################################
//							Server Register function
//############################################################################################
//TextBox中enter的功能
function fnHandleTextarea()
{
	if(event.keyCode==13)
		event.cancelBubble = true;
}

//起值onblur帶出迄值
function fnHandleFileNo(argBegObj,argEndObj)
{
	argEndObj.value = argBegObj.value;
}

//############################################################################################
//							其	他	function
//############################################################################################
function SetCanSubmit()
{
	IsServerHandling = true;
	jf_ShowWaitState();	
	Page_BlockSubmit = false;
}

function SetCanNotSubmit()
{
	Page_BlockSubmit = true;
}
//1030328 Eileen [1030182] 取得SAMLart網址參數
function GetParam(p)
{
	var strUrl = document.location.toString();
	strUrl = unescape(strUrl);
	var rg_szItems = strUrl.split("?");
	if(rg_szItems.length==2)
	{
		var rg_szItems2 = rg_szItems[1].split("&");
		for(var i=0; i<rg_szItems2.length; i++)
		{
			var rg_items = rg_szItems2[i].split("=");
			if(rg_items[0] == "SAMLart")
				return rg_items[1];
		}
	}
}