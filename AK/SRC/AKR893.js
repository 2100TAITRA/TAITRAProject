/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		 修改人	 單號       概要
 * -------------------------------------------------------------------------------------------------
 * 1060217   Joe	 1050087 	二代系統升級
 * 1130222   Jason   1130049    修正報表呈現資訊與畫面選項無法對應問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060217	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060217	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}

//1060217	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060217	Joe	1050087	二代系統升級
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

//1060217	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060217	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			if(document.all.txYear.value=="")
		    {
		    alert("統計年度不可為空白!!");
			//1060217	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txYear.focus();
			$('#' + document.all.txYear.id).focus();
		    Page_BlockSubmit = true;
		    
		    }else
		    {
			Page_BlockSubmit = false;
			}
			//1060217	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

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
	document.all[argLabelId].textContent = obj.value;
}

