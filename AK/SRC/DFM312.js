/*
DATE	SA		PRG		MGR_NO	DESC
1060609	Cloud	Joe	    1050087	二代升級
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060609	Joe	1050087	二代系統升級--S
	// if (document.all["ValidationSummary1"].innerText != "")
		// alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();	
	//1060609	Joe	1050087	二代系統升級--E
}

//1060609	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060609	Joe	1050087	二代系統升級
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

//1060609	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060609	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060609	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			IsServerHandling = true;
			jf_ShowWaitState();	
			Page_BlockSubmit = false;
			//1060609	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060609	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060609	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
		case "btSearch":
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
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
	document.all[argLabelId].innerText = obj.value;
}
function ShowSample()
{ 
  strdlDirSep=document.all.dlDirSep.options[document.all.dlDirSep.selectedIndex].value;
  if(document.all.dlDirLvl.selectedIndex==0)
	//1060609	Joe	1050087	二代系統升級
  // {document.all.lbSample.value=document.all.lbSourceOrgNo.innerText+"＼分類號＼年度"+strdlDirSep+"案"+strdlDirSep+"卷" ;}
  {document.all.lbSample.value=document.all.lbSourceOrgNo.textContent+"＼分類號＼年度"+strdlDirSep+"案"+strdlDirSep+"卷" ;}
   if(document.all.dlDirLvl.selectedIndex==1)
	//1060609	Joe	1050087	二代系統升級
  // {document.all.lbSample.value=document.all.lbSourceOrgNo.innerText+"＼分類號＼年度＼案"+strdlDirSep+"卷" ;}
  {document.all.lbSample.value=document.all.lbSourceOrgNo.textContent+"＼分類號＼年度＼案"+strdlDirSep+"卷" ;}
    if(document.all.dlDirLvl.selectedIndex==2)
	//1060609	Joe	1050087	二代系統升級
  // {document.all.lbSample.value=document.all.lbSourceOrgNo.innerText+"＼分類號＼年度＼案＼卷" ;}
  {document.all.lbSample.value=document.all.lbSourceOrgNo.textContent+"＼分類號＼年度＼案＼卷" ;}

}
function dlCopyMediaOnchange()
{
  if(document.all.dlCopyMedia.selectedIndex==0)
  {document.all.txMediaCapacity.value="4000";}
  else if(document.all.dlCopyMedia.selectedIndex==1)
  {document.all.txMediaCapacity.value="600";}
  
}
function OnblurOne()
{
  if(parseInt(document.all.txReserveCapacity.value) > parseInt(document.all.txMediaCapacity.value))
	//1060609	Joe	1050087	二代系統升級，調整focus寫法	
  // {alert("保留容量數值不可大於可用容量!!");document.all.txReserveCapacity.focus();}
  {alert("保留容量數值不可大於可用容量!!");$('#' + document.all.txReserveCapacity.id).focus();}
}
function OnblurTwo()
{
  if(parseInt(document.all.txDfMaxseq.value) > 999 || parseInt(document.all.txDfMaxseq.value) < 1)
	//1060609	Joe	1050087	二代系統升級，調整focus寫法
  // {alert("電子檔案每卷容量只允許輸入1~999數字!!");document.all.txDfMaxseq.focus();}
  {alert("電子檔案每卷容量只允許輸入1~999數字!!");$('#' + document.all.txDfMaxseq.id).focus();}
}

