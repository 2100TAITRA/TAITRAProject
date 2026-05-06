/*
 * 程式修改歷程 Latest Updated by Leslie 2009.10.19
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2009.10.19	Leslie	0980493	修正起迄日期為正確之大小順序(起<迄)
 * 2017.02.24   Justin  1050087 二代公文修改
 * 2025.06.02　 Levi　  1140264 新增Excel與ODS匯出
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060224  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060224  Justin [1050087] 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//  alert(document.all["ValidationSummary1"].innerText);
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
		case "btStatic":  //執行統計
			var xUrl = "AKP210.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"AKP210",760,500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
		//1140264　Levi　新增Excel與ODS匯出
		case "btExcel":
		case "btODS":
		if(document.all.txDateS.value=="")
		{
		    alert("統計月份(起)不可為空白!!"); Page_BlockSubmit = true;
		    //1060224  Justin [1050087] 二代公文修改
		    //document.all.txDateS.focus();
		    $('#txDateS').focus();
		}
		else if(document.all.txDateE.value=="")
		{
		    alert("統計月份(迄)不可為空白!!"); Page_BlockSubmit = true;
		    //1060224  Justin [1050087] 二代公文修改
		    //document.all.txDateE.focus();
		    $('#txDateE').focus();
		}
		else
		{
			//0981019	Leslie[0980493]	加上起迄日期之修正
			var strDateS = document.all.txDateS.value;
			var strDateE = document.all.txDateE.value;
			if(strDateS > strDateE)
			{
				document.all.txDateS.value = strDateE;
				document.all.txDateE.value = strDateS;
			}
			//0981019	Leslie	==END==
			Page_BlockSubmit = false;
		}
		//1060224  Justin [1050087] 二代公文修改 
		//jf_ToolBarSubmit();
		jf_ToolBarSubmit(xObjectName);
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
  			    //1060224  Justin [1050087] 二代公文修改
			    //document.all["lbMax"].innerText = "您尚未執行過統計作業";	
  			    document.all["lbMax"].textContent = "您尚未執行過統計作業";
  			else
			    //document.all["lbMax"].innerText = "目前統計最大年月：" + 
  			    document.all["lbMax"].textContent = "目前統計最大年月：" +
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
		}
	}
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
    //1060224  Justin [1050087] 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

