/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1070116   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1070116 Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);

//1070116 Justin [1050087] 二代公文修改
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

//1070116 Justin [1050087] 二代公文修改 
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
	
    //1070116 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1070116 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1070116 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1070116 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1070116 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			if(jf_ConfirmClean())
			{
				document.all.rbVol.checked = true;
				document.all.dlDate.selectedIndex = 0;
				dlDateOnChange();
			    //1070116 Justin [1050087] 二代公文修改
				//document.all.dlDate.focus();
				$('#dlDate').focus();
			}
			break;
		case "btSearch":
			break;
		case "btPrint":
		case "btPreview":
			if(!document.all.ck1.checked && !document.all.ck2.checked && !document.all.ck3.checked)
			{
				alert('至少需選取一項檔案種類');
				return;
			}
			Page_BlockSubmit = false;
		    //1070116 Justin [1050087] 二代公文修改 
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
	dlDateOnChange();
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
    //1070116 Justin [1050087] 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}


function dlDateOnChange()
{
	//var pTemp = document.all.dlDate.options[document.all.dlDate.selectedIndex].value;
	//1121222 Justin1120709 修改弱掃Sql Injection--修改開啟時的錯誤訊息
	//if(pTemp == "") return;
	var pTemp = "";
	if (document.all.dlDate.selectedIndex == -1) {
		return
	}
	else {
		pTemp = document.all.dlDate.options[document.all.dlDate.selectedIndex].value;
    }
	var pTempAry = pTemp.split(',');  //moveo_store,movei_Store
	
	if(pTempAry[0] != null && pTempAry[0] != "")
	{
		for(var i=0;i<document.all.dlStoreOut.length ;i++)
		{
			if(document.all.dlStoreOut.options[i].value == pTempAry[0])
				document.all.dlStoreOut.selectedIndex = i;
		}
	}

	if(pTempAry[1] != null && pTempAry[1] != "")
	{
		for(var i=0;i<document.all.dlStoreIn.length ;i++)
		{
			if(document.all.dlStoreIn.options[i].value == pTempAry[1])
				document.all.dlStoreIn.selectedIndex = i;
		}
	}
		
}
