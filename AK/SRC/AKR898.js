/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2011.08.05	Jeff  1000696	修正報表程式TITLE部分年度出現錯誤
 * 2017.04.26	Cloud	1050087	二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060426	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060426	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].innerText != "")
		// alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();	
}

//1060426	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060426	Joe	1050087	二代系統升級
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

//1060426	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060426	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			//1140414	Joeko	1140264	新增匯出Excel、ODS功能
		case "btExcel":
		case "btODS":
			if(document.all.txYear.value=="")
		    {
		    alert("統計年度不可為空白!!");
			//1060426	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txYear.focus();
			$('#' + document.all.txYear.id).focus();
		    Page_BlockSubmit = true;
		    
		    }else
		    {
				//1000805	Jeff	1000696		修正如果直接輸入兩碼數字按下預覽會找出錯誤資料
				document.all.txYear.value  = jf_PADL(document.all.txYear.value,3,"0");
			Page_BlockSubmit = false;
			}
			
			//1060426	Joe	1050087	二代系統升級
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
	//1060426	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

