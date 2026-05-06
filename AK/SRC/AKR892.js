/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060220   Justin   1050087     二代公文修改
 * 1130222   Jason    1130049     修正報表呈現資訊與畫面選項無法對應問題
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060220  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060220  Justin [1050087] 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060220  Justin [1050087] 二代公文修改
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

//1060220  Justin [1050087] 二代公文修改 
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
	
    //1060220  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			if(document.all.txYear.value=="")
		    {
			    alert("統計年度不可為空白!!");
			    //1060220  Justin [1050087] 二代公文修改
			    //document.all.txYear.focus();
			    $('#txYear').focus();
			    Page_BlockSubmit = true;
		    
		    }else
			{
			    Page_BlockSubmit = false;
			}
		    //1060220  Justin [1050087] 二代公文修改 
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

function CheckYear()
{
	var strValue ;
	strValue = document.all.txYear.value;
	if(strValue=="")
	return;
	else		
	document.all.txYear.value  = jf_PADL(strValue,3,"0");
	
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060220  Justin [1050087] 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
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
