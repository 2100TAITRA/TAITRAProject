/*
 * DATE    SA	   PRG		MGR_NO		DESC
 * 1050419 Kevin   Justin   1050087     二代公文修改
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050419 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1050419 Justin 1050087 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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

//1050419 Justin 1050087 二代公文修改 
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

    //1050419 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
		    Page_BlockSubmit = !CheckBeforeSearch();
		    //1050419 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050419 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050419 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
			
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
	}
}

function CallBack(argCallerId)
{

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
    //1050419 Justin 1050087 二代公文修改
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

function IsRationalValue(val)
{
	if (val == undefined)
		return false;
	if (val == null)
		return false;
	return true;
}

function CheckBeforeSearch()
{
	var bRtnbool = CheckBeforePrint();
	return bRtnbool;
}

/********** 以下為DataGrid ToolBar處理區 **********/
var i,j;

//全部選取
function jf_SelectAll(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
	
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
			obj.checked = true;	
	}
}

//反向選取
function jf_SelectInverse(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
		{
			if(obj.checked)
				obj.checked = false;
			else
				obj.checked = true;
		}
	}
}

//清除選取
function jf_SelectClear(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
			obj.checked = false;
	}
}

function CheckBeforePrint()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked)
			return true;
	}
	jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"]) ), "" );
	return false;
}
function jf_ShowMsg(Context,HeadTest)
{
	if (HeadTest!="")
	{s = HeadTest + "\n";}
	else
	{s= ""}
    
    switch (document.all["ValidationSummary1"].displaymode) 
    {
           case "List":
                      s += Context + "\n";
                      break;
                                
           case "BulletList":
                      default: 
                      s += Context + "\n";
                      break;
                                
           case "SingleParagraph":
					  s += Context + " ";
                      break;
    }
	alert(s);
}	
