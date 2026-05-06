/*
 * DATE         PRG	    MGR_NO	        DESC
 * 1060411   Justin   1050087     二代公文修改 * 1100204      Zen     1090927         取消使用document.activeElement
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060411 Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060411 Justin [1050087] 二代公文修改 
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060411 Justin [1050087] 二代公文修改
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
		
	}	
}

//1060411 Justin [1050087] 二代公文修改 
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
	
    //1060411 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btCancel":
			Page_BlockSubmit=true;
			window.close();
			break;
		case "btSearch":
			Page_BlockSubmit=false;
			if(jf_Trim(document.all.txFileCls.value)=="")
			{
				Page_BlockSubmit=true;
				alert('請先輸入分類號!!');
			    //1060411 Justin [1050087] 二代公文修改
				//document.all.txFileCls.focus();
				$('#txFileCls').focus();
			}
		    //1060411 Justin [1050087] 二代公文修改
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
    //1060411 Justin [1050087] 二代公文修改，調整DG第一列使其對齊
    $(window).trigger('resize');
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
    //1060411 Justin [1050087] 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
//1100204 Zen 1090927 取消使用document.activeElement//function ReturnValue()
function ReturnValue(argStockNo)
{
    opener.document.all.lbReturnValue.length = 1;
    //1060411 Justin [1050087] 二代公文修改
    //opener.document.all.lbReturnValue.options[0].text = document.activeElement.innerText;
    //opener.document.all.lbReturnValue.options[0].value = document.activeElement.innerText;
    //1100204 Zen 1090927 取消使用document.activeElement--begin    //opener.document.all.lbReturnValue.options[0].text = document.activeElement.textContent;
    //opener.document.all.lbReturnValue.options[0].value = document.activeElement.textContent;
    opener.document.all.lbReturnValue.options[0].text = argStockNo;
    opener.document.all.lbReturnValue.options[0].value = argStockNo;
    //1100204 Zen 1090927 取消使用document.activeElement--end    opener.window.CallBack("AKM330C4");
    close();
}

function ProcClick(strStockNo)
{
	Page_BlockSubmit=true;
	var pUrl = "";
	pUrl = "AKM330C5.aspx?k1="+strStockNo;
    //1060411 Justin [1050087] 二代公文修改
    //jf_OpenChildWin(pUrl, "AKM330C5", 750, 550);
	jf_OpenChildWin(pUrl, "AKM330C5", 800, 600);
	//OpenWindow(pUrl);
	Page_BlockSubmit = true;
}