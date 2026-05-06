/*
Date        SA      PG      NO          DESC
1050721     David   Zen     1050087     二代公文修改
1060518     Leslie  Zen     1060215     innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050721 Zen 1050087  二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

//指定DataGrid欄位
var strTableFields = new Array("_txDeptNo","_txDeptName");


function ShowMsg()
{
    //1050721 Zen 1050087  二代公文修改
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

//1050721 Zen 1050087  二代公文修改
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
	
    //1050721 Zen 1050087  二代公文修改
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    //1050721 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
			
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			SelectAll();
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			SelectInverse();
			break;
		case "btSelectBack":
			SelectReturnValue();
			Page_BlockSubmit = false;
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
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//組出回傳值
function ReturnValue(argNo, argName)
{
	try
	{
		opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argNo;
	    opener.document.all.lbReturnValue.options[0].text  = argName;
	    opener.window.CallBack("ODM310C1");
	    close();
	}
	catch(e){}
}
function SelectReturnValue()
{
	var intCount=0;
	for (var i=2; i < document.all.dg1.rows.length+1 ; i++)
	{
		if (document.all["dg1__ctl"+i+"_cbSelect"].checked)				
		{	
			opener.document.all.lbReturnValue.length = intCount + 1;
			opener.document.all.lbReturnValue.options[intCount].value = document.all["dg1__ctl"+i+"_txDeptNo"].value;
			opener.document.all.lbReturnValue.options[intCount].text = document.all["dg1__ctl"+i+"_txDeptName"].value;
			intCount++;
		}
	}
	if (intCount==0)
	{ 
		alert("至少勾選一筆明細資料");
		IsServerHandling = false;
		return;
	}
	else
	{
		opener.window.CallBack("ODM310C1");			
		close();			
	}
}

function SelectAll()
{
	if( document.all.dg1 != null ) 
	{
		for (var iRow = 2;iRow < document.all.dg1.rows.length+1; iRow++)
		{
			document.all["dg1__ctl"+iRow+"_cbSelect"].checked = true;
		}
	}	
}

//反向
function SelectInverse()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked)
			document.all["dg1__ctl"+iRow+"_cbSelect"].checked = false;
		else
			document.all["dg1__ctl"+iRow+"_cbSelect"].checked = true;
	}
}