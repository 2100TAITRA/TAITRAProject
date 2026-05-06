/*
DATE		SA		PRG		MGR_NO	DESC
1031112	    Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1050331	    David	Kenny	1050087 二代公文系統相關修改
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050331	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050331	Kenny	[1050087]   二代公文系統相關修改
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

//1050331	Kenny	[1050087]   二代公文系統相關修改
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
	
	//1050331	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = false;
			//1050331	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = false;
			//1050331	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = false;
			//1050331	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "ODT230")
	{
		//無回傳
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
}

function ClientOnLoad()
{
	//1050331   Kenny   [1050087]   二代公文系統相關修改，標頭不另外設定--Start--
	//if (document.all["dg1"] == null)
	//	document.all["dtHead"].className = "hide";
	//else
	//	document.all["dtHead"].className = "";
	//1050331   Kenny   [1050087]   二代公文系統相關修改，標頭不另外設定--End--
    ShowMsg();
	document.all["H_Value"].value = document.all["dlDept_Text"].value;
	document.all["H_Change"].value = "";
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050331   Kenny   [1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function dlDept_Onblur()
{
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
		{
			document.all["H_Change"].value = document.all["dlDept_Text"].value;
		    //__doPostBack();//for .NET Framework 1.0
		    //1031112    Kevin_C[1020726]   IsServerHandling = true;放在__doPostBack下面無效，交換順序
			IsServerHandling = true;
			jf_ShowWaitState();
			__doPostBack("", "");//for .NET Framework 1.1
		}
	} 
}

function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function fnOpenApply(argDocNo)
{
	var strDate  = document.all["H_SysDate"].value;
	var strUrl = "";
	strUrl = "ODT230.aspx?rtnObj=lbReturnValue&argDocNo="+argDocNo+"&applyDate="+strDate;
	jf_OpenChildWin(strUrl, "ODT230", 760, 520 );
}