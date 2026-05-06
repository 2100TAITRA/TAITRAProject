/*
DATE			SA          PRG		MGR_NO	DESC
1050811         David       Zen     1050087 二代公文修改
1060518         Leslie      Zen     1060215 innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050811 Zen 1050700 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050811 Zen 1050700 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

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

//1050811 Zen 1050700 二代公文修改
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
	
    //1050811 Zen 1050700 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "ODP420.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"ODP420",800,600);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
			Page_BlockSubmit = !ConfirmData();
		    //1050811 Zen 1050700 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="ODP420")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
			if (strMaxUseDate == "")
			    //1060518 Zen 1060215 innerText相關修正			    //document.all["lbMaxYear"].innerText = "您尚未執行過統計作業";
			    document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			else
			    //1060518 Zen 1060215 innerText相關修正			    //document.all["lbMaxYear"].innerText = "目前統計最大年度：" +
			    document.all["lbMaxYear"].textContent = "目前統計最大年度：" +
													strMaxUseDate.substr(0,3)+"年";
		}
	}
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
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
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
function ConfirmData()
{
		if(document.all.h_txYM.value=="")
		{
			return  false;
		}
		var bRtnbool = true;
		var year1 = parseInt(document.all.txYear.value.substr(0,3));
		if(year1 == 0)
			year1 = parseInt(document.all.txYear.value.substr(1,2));

		var year2 = parseInt(document.all.h_txYM.value.substr(0,3));
		if(year2 == 0)
			year2 = parseInt(document.all.h_txYM.value.substr(1,2));

		if(year1>year2)
		{
		    strErrMsg = "列印年份不可大於目前統計最大年份\n";
		    //1050811 Zen 1050700 二代公文修改
		    //document.all["txYear"].focus();
		    $('#txYear').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}

	return bRtnbool;
}