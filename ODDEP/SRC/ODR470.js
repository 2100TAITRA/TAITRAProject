/*
1050530 Kevin   Zen     1050087 二代公文修改
1060518 Leslie  Zen     1060215 innerText相關修改
1110425	Kevin	Joe		1110008	新增件數報表分類*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050530 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050530 Zen 1050087 二代公文修改--begin
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
    //1050530 Zen 1050087 二代公文修改--end
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
//1050530 Zen 1050087 二代公文修改
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
	
    //1050530 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "ODP420.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"ODP420",760,500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
			if(document.all.txYearSt.value=="")
		    {
				alert("統計年度不可為空白!!");
			    //1050530 Zen 1050087 二代公文修改
				//document.all.txYearSt.focus();
				$('#txYearSt').focus();
				Page_BlockSubmit = true;
		    }
		    else
				Page_BlockSubmit = false;
		    //1050530 Zen 1050087 二代公文修改
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
			{
			    //1060518 Zen 1060215 innerText相關修正			    //document.all["lbMaxYear"].innerText = "您尚未執行過統計作業";
			    document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			}
			else
			{
			    //document.all["lbMaxYear"].innerText = "目前統計最大年月："+
			    document.all["lbMaxYear"].textContent = "目前統計最大年月：" +
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
				//iris 修改檢核列印月份不可大於目前統計月份之欄位
			    //document.all["h_txYM"].innerText = strMaxUseDate;
			    document.all["h_txYM"].textContent = strMaxUseDate;
			}
		}
	}
}

function ClientOnLoad()
{
    ShowMsg();	
    //1110425	Joe		1110008		新增件數報表分類
    fnrptTypeCtrl();
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

//1110425	Joe		1110008		新增件數報表分類
function fnrptTypeCtrl(){
	if(document.all.cbIssueCount.checked)
		document.all.rptCtrl.className = "dTR";
	else
		document.all.rptCtrl.className = "hide";
}