/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060224   Justin   1050087     二代公文修改
 * 1130222   Jason   1130049 修正報表呈現資訊與畫面選項無法對應問題
 * 1140422	Daniel	 1140246	增加匯出Excel與ODS功能
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060224  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060224  Justin [1050087] 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//    alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

//1060224  Justin [1050087] 二代公文修改
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

//1060224  Justin [1050087] 二代公文修改 
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
	
    //1060224  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
	//1140264 Daniel 1140422 增加匯出Excel與ODS
		case "btOds":
		case "btExcel":
			if(document.all.txYear.value=="")
		    {
			    alert("統計年度不可為空白!!");
			    //1060224  Justin [1050087] 二代公文修改
			    //document.all.txYear.focus();
			    $('#txYear').focus();
				Page_BlockSubmit = true;
		    }
		    else
				Page_BlockSubmit = false;
		    //1060224  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btStatic":  //執行統計
			var xUrl = "AKP210.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"AKP210",760,500);
			Page_BlockSubmit = true;
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
			if (strMaxUseDate == "")
				document.all["txMaxUseDate"].value = "您尚未執行過統計作業";			
			else
				document.all["txMaxUseDate"].value = "目前統計最大年月：" + 
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
		}
	}
}
function CheckYear()
{
	var strValue ;
	strValue = document.all.txYear.value;
	if(strValue=="")
	return;
	else		
	document.all.txYear.value  = jf_PADL(strValue,3,"0");
	
}

function ClientOnLoad()
{
	ShowMsg();
	//1130222      Jason   1130049 修正報表呈現資訊與畫面選項無法對應問題 --S
	if (document.all["Akp210Mode"].value == "N")
		document.all["minStatistics"].className = "hide";
	//1130222      Jason   1130049 修正報表呈現資訊與畫面選項無法對應問題 --E
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
    //1060224  Justin [1050087] 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

