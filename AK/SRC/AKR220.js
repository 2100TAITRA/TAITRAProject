/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060224   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060224  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

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
			Page_BlockSubmit = false;
		    //1060224  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = false;
		    //1060224  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}
function CheckYear()
{
   if(document.all["txYear"].value=="000") 
	 {
       alert("請輸入正確列印年度!");
       //1060224  Justin [1050087] 二代公文修改
       //document.all["txYear"].focus();
       $('#txYear').focus();
		Page_BlockSubmit =true;
	 }
   if(parseInt(document.all["txYear"].value,10) > parseInt(document.all["txHideYear"].value,10) ) 
     {
       alert("請輸入正確列印年度!");
       //1060224  Justin [1050087] 二代公文修改
       //document.all["txYear"].focus();
       $('#txYear').focus();
		Page_BlockSubmit =true;
     }
   if(document.all["txYear"].value=="") 
	 {
       alert("請輸入列印年度!");
       //1060224  Justin [1050087] 二代公文修改
       //document.all["txYear"].focus();
       $('#txYear').focus();
		Page_BlockSubmit =true;
	 }
}
function jfDeptOnChange()
{
	if (document.all["dgDept"].selectedIndex!=0)
	{
	    if(document.all["rb_personal"].checked) document.all["rb_personal"].checked=true;
	    else document.all["rb_level2"].checked=true;
	    if(document.all["rb_level2"].checked) document.all["rb_level2"].checked=true;
		else document.all["rb_personal"].checked=true;
		document.all["rb_level1"].disabled=true;	
	}
	else
	{
	   document.all["rb_level1"].disabled=false;
	}
}

function DoClick()
{
	if (document.all["dgDept"].selectedIndex!=0)
	{
	   document.all["rb_level2"].checked=true;
	}
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    
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
				document.all["txMaxUseDate"].value = "您尚未執行過統計作業";			
			else
				document.all["txMaxUseDate"].value = "目前統計最大年月：" + 
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
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
    //1060224  Justin [1050087] 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

