/*
DATE    	SA			PRG		MGR_NO		DESC
0970221 	Stella  	Iris    0960339     決行統計表提供轉出excel檔之功能
1050516		Kevin		Joe		1050087 	二代系統升級
1050520		KEVIN		JOE		1050087		二代系統升級，調整focus寫法
1050803		Kevin		Joe		1050087		修改子視窗大小
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050516	Joe	1050087	二代系統升級--START--
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);
//1050516	Joe	1050087	二代系統升級--END--

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

//1050516	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050516	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "ODP420.aspx?nMode=EXEC";
			//1050803	Joe		1050087		修正子視窗大小
			// jf_OpenChildWin(xUrl,"ODP420",760,500);
			jf_OpenChildWin(xUrl,"ODP420",800,600);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
		case "btExcel":
			if(document.all.txYear.value=="")
			{
				alert("統計月份不可為空白!!");
				//1050520	Joe	1050087	二代系統升級，調整focus寫法
				//document.all.txYear.focus();
				$('#' + document.all.txYear.id).focus();
				Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = !ConfirmData();
				
			//1050516	Joe	1050087	二代系統升級
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
				document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			else
				document.all["lbMaxYear"].textContent = "目前統計最大年度："+
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
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txYear"].focus();
			$('#txYear').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}

	return bRtnbool;
}