/*
Date	SA		PRG		MGR_NO		DESC	
0980715	Stella	Howard	--			修正儲存時發生無法呼叫js檔中的Returnvalue()函式
1030328	Cloud	Eileen	1030182		清查將原使用AKC320分類號查詢改使用EAC005
1060724 Cloud   Justin  1050087     二代公文修改
1110103	Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
var IsRtnOpener=false;
//1060724 Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
window.onunload = jf_WindowOnUnLoad;


function ShowMsg()
{
    //1060724 Justin [1050087] 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//    alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

//1060724 Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1060724 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			if(document.all["tbCase_name"].value == "")
			{
				alert("案名欄位不可為空白!!!");
				Page_BlockSubmit = true;
			}
		    //1060724 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			var pUrl = "";
			//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
			/*pUrl = "AKC320.aspx?k1="+document.all["tbCls_no"].value;
			//open(pUrl);
			jf_OpenChildWin(pUrl,"AKC320",750,550);*/
		    //1060724 Justin [1050087] 二代公文修改
			//pUrl = "../../EA/EA01/EAC005.aspx?nFrom=AKM330C1&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txCaseYear.value) + "&FILE_CLS=" + jf_Trim(document.all.tbCls_no.value) + "&SAMLart=" + GetParam("SAMLart");
			//jf_OpenChildWin(pUrl, "EAC005", 750, 550);
			pUrl = "../../EA/EA01/EAC005.aspx?nFrom=AKM330C1&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txCaseYear.value) + "&FILE_CLS=" + jf_Trim(document.all.tbCls_no.value);
			jf_OpenChildWin(pUrl, "EAC005", 800, 600);
			//Eileen -- end 
			Page_BlockSubmit = true;
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	opener.document.all.lbReturnValue.length = 0;
	ShowMsg();	
	//0980715 Howard -- 修正儲存時發生無法呼叫js檔中的Returnvalue()函式	
	if(document.all.CompleteSave)
	{
		if(document.all.CompleteSave.value =="Y")
			ReturnValue();
	}
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function SaveClientProc()
{
	opener.document.all["txCaseName"].vale = document.all["tbCase_name"].value;
	opener.document.all["htxCaseKey"].vale = document.all["txCaseKey"].value;
	
	opener.document.all["tbCASE"].focus();
	window.close();
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];

	document.all[argTextBoxId].value = obj.text;
    //1060724 Justin [1050087] 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function ReturnValue()
{
    opener.document.all.lbReturnValue.length = 3;
    opener.document.all.lbReturnValue.options[0].text  = "1";
	opener.document.all.lbReturnValue.options[0].value = "1";
    opener.document.all.lbReturnValue.options[1].text  = document.all["tbCase_name"].value;
    opener.document.all.lbReturnValue.options[1].value = document.all["tbCase_name"].value;
    opener.document.all.lbReturnValue.options[2].text  = document.all["txCaseKey"].value;
    opener.document.all.lbReturnValue.options[2].value = document.all["txCaseKey"].value;
    opener.window.CallBack("AKM330C1");
    
    close();
}

function jf_WindowOnUnLoad()
{
	if (opener.document.all.lbReturnValue.length != 3)
	{
		opener.document.all.lbReturnValue.length = 3;
        opener.document.all.lbReturnValue.options[0].text  = "1";
		opener.document.all.lbReturnValue.options[0].value = "1";
		opener.document.all.lbReturnValue.options[1].text  = "";
		opener.document.all.lbReturnValue.options[1].value = "";
		opener.document.all.lbReturnValue.options[2].text  = "";
		opener.document.all.lbReturnValue.options[2].value = "";
	}
    opener.window.CallBack("AKM330C1");
}

//1060724 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
	if(!IsServerHandling)
	{
	    //1060724 Justin [1050087] 二代公文修改
	    //var xObjectName = document.activeElement.id;
	    var xObjectName = e.target.id;
		
		switch (xObjectName)
		{
			case "btPrint": //cancel ?
			case "btPrintImg":
				Page_BlockSubmit = true;
				opener.window.CallBack("AKM330C1");
				opener.document.all["tbCASE"].focus();
				close();
				break;		
		}
	}
	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	else
		Page_BlockSubmit = true;
}

function DoClick()
{
	if (document.all.cbYear.checked)
		document.all["txCaseYear"].value=document.all["tbCase_year"].value;
	else
		document.all["txCaseYear"].value="";
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