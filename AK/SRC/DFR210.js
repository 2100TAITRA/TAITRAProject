/*
DATE	SA		PRG		MGR_NO		DESC
1060426	Cloud	Joe		1050087		二代升級 
1111213	Leslie	Zen		1110897		新增明細表匯出Excel功能
*/

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
		//1111213 Zen 1110897 新增明細表匯出Excel功能
		case "btExcel":
			var Sdate =document.all["txScanDateS"].value;
			var Edate=document.all["txScanDateE"].value;
		
			if(Sdate=="" || Edate=="")
			{
				alert("請指定掃描期間"); 
				Page_BlockSubmit = true;
				if(Sdate=="")
				//1060426	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txScanDateS"].focus();
				$('#txScanDateS').focus();
				else
				//1060426	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txScanDateE"].focus();
				$('#txScanDateE').focus();
			}
			else
			{
				if(Sdate>Edate)
				{
					alert("掃描期間起不可以大於迄");
					//1060426	Joe	1050087	二代系統升級，調整focus寫法
					//document.all["txScanDateS"].focus();
					$('#txScanDateS').focus();
					Page_BlockSubmit = true;
				}
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


function CheckDate(obj)
{	
	//1060426	Joe	1050087	傳入參數改為控制項ID
	// if(obj.value=="")
	if(document.all[obj].value=="")
		return;
	//1060426	Joe	1050087	日期欄位補0
	document.all[obj].value = jf_PADL(document.all[obj].value,7,'0');
	//1060426	Joe	1050087	傳入參數改為控制項ID
	// if(!jf_CheckCDATE(obj.value))
	if(!jf_CheckCDATE(document.all[obj].value))
	{
		var ErrName = new Array(1);
		ErrName[0] = "日期";
		alert(FormatStr(jf_GetErrMsg(InFormatErr2),ErrName));
		//1060426	Joe	1050087	二代系統升級，調整focus寫法
		//obj.focus();
		$('#' + obj).focus();
	}
}

//1111213 Zen 1110897 新增明細表匯出Excel功能
function SetTbTool()
{
	if (document.all['rbDetail'].checked)
		document.all['btExcel'].disabled = false;
	else
		document.all['btExcel'].disabled = true;
}
