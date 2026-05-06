/*
 * DATE    SA	   PRG		MGR_NO		DESC
 * 1050419 Kevin   Justin   1050087     二代公文修改
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050419 Justin 1050087 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	var pNo     = xObjectName.substring(8,xObjectName.indexOf("_btHelp"));
	var pNoHelp = "dg1__ctl"+pNo+"_btHelp";
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case pNoHelp:
			Page_BlockSubmit=true;
			ShowModal("IFC000" + GetAllParamStr());
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
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
		case "btSave":
			Page_BlockSubmit = false;
		    //1050419 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;

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

function ShowModal(argWin)
{
	var strChildWin = argWin + ".aspx";
	window.showModalDialog(strChildWin, "", "dialogHeight: 500 px;dialogWidth:450px");
}


function jf_DeleteItem(argTextBoxId, argIdx)
{
	Page_BlockSubmit = true;
	var obj = document.all.ddUnit;

	if( argIdx >= obj.length ) return;

	obj[argIdx].text  = "";
	obj[argIdx].value = "";
	document.all[argTextBoxId].value = "";
}

function jf_SetItem(argTextBoxId,argIdx)
{
	Page_BlockSubmit = true;

	var ddUnitobj = document.all.ddUnit;
	var ret = jf_ShowOrgDialog(SHOW_ORG);//回傳格式=名稱,說明,PATH
	if(ret!=null)
	{
		//若是對已有值的組織TextBox作重新設定，則必須先刪除該組織再行新增
		if( argIdx < ddUnitobj.length )
			if(ddUnitobj[argIdx].value != "")
				jf_DeleteItem(argTextBoxId, argIdx);

		//新增option到ddUnit中，並顯示組織名稱於組織TextBox中
		var oOption = document.createElement("OPTION");
		ddUnitobj.add(oOption);
		oOption.value = GetElement(ret, 2);
	    //1050419 Justin 1050087 二代公文修改 
		//oOption.innerText = oOption.value;
		oOption.textContent = oOption.value;
		document.all[argTextBoxId].value = GetElement(ret,0);
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
