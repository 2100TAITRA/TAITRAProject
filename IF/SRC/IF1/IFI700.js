/*
Date		SA		PRG		MGR_NO		DESC	
1031113		Kevin	Kenny	1030868		增加下載檔案所需資訊，開啟IFI700C1時增加串入Artifact
1040911		Kevin	Kevin_C	1040625		去掉多餘的斜線
1050503     Kevin   Zen     1050087     二代公文修改
1051007     Kevin   Zen     1050087     修正資料顯示問題
1051019	    Leslie	Joe		1050087		二代修改配合行動平台
1060103     Kevin   Kenny   1051253     修改公告內容文字無法複製問題
1060518     Leslie  Zen     1060215     innerText相關修改
1071113		Joe		Joe		--			因應弱掃修改cookie，修正IFI700開啟後公告未正確顯示的問題
1100818		Kevin	Joe		1100991		弱掃修正Client DOM XSS
1110614		Kevin	Joe		1110325		弱掃修正Client DOM XSS
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1050503 Zen 1050087 二代公文修改
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
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	Page_BlockSubmit=true;
	
	//1040911	Kevin_C	1040625	去掉多餘的斜線
	//var webaddr = location.protocol + "//" + location.hostname + "/" + location.pathname;
	//1100818	Joe		1100991		弱掃修正Client DOM XSS
	//var webaddr = location.protocol + "//" + location.hostname + location.pathname;
	var webaddr = encodeURI(location.protocol) + "//" + encodeURI(location.hostname) + encodeURI(location.pathname);
	
	switch (xObjectName)
	{
		case "btFirstPage":
			location.href = webaddr + "?nPage=1";
			break;
		case "btPreviousPage":
			location.href = webaddr + "?nPage=" + document.all.hPrevPage.value;
			break;
		case "btNextPage":
			location.href = webaddr + "?nPage=" + document.all.hNextPage.value;
			break;
		case "btLastPage":
			location.href = webaddr + "?nPage=" + document.all.hLastPage.value;
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050503 Zen 1050087 二代公文修改
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
	
    //1050503 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	Page_BlockSubmit=true;
	//1040911	Kevin_C	1040625	去掉多餘的斜線
	//var webaddr = location.protocol + "//" + location.hostname + "/" + location.pathname;
	//1110614	Joe		1110325		弱掃修正Client DOM XSS
	// var webaddr = location.protocol + "//" + location.hostname + location.pathname;
	var webaddr = encodeURI(location.protocol) + "//" + encodeURI(location.hostname) + encodeURI(location.pathname);
	switch (xObjectName)
	{
		case "btFirstPage":
			location.href = webaddr + "?nPage=1";
			break;
		case "btPrevPage":
			location.href = webaddr + "?nPage=" + document.all.hPrevPage.value;
			break;
		case "btNextPage":
			location.href = webaddr + "?nPage=" + document.all.hNextPage.value;
			break;
		case "btLastPage":
			location.href = webaddr + "?nPage=" + document.all.hLastPage.value;
			break;
	}	
}



/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
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
    //1060518 Zen 1060215 innerText相關修正
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}


function storeCookie(argPath)
{
	//1071113		Joe		--			因應弱掃修改cookie，修正IFI700開啟後公告未正確顯示的問題
	//jf_SaveCookie("nIFI700C1", argPath);
	//1031113	Kenny	[1030868]	增加下載檔案所需資訊
	//var ret = jf_ShowModal("IFI700C1.htm",700,600);
	var strArtifact = document.all["H_Artifact"].value;
    //1060103   Kenny   [1051253]   修改公告內容文字無法複製問題
	//var ret = jf_ShowModal("IFI700C1.htm?SAMLart="+strArtifact,700,600);
	//1071113		Joe		--			因應弱掃修改cookie，修正IFI700開啟後公告未正確顯示的問題
    var ret = window.open("IFI700C1.aspx?SAMLart="+strArtifact+"&nIFI700C1="+argPath,"","top=20,left=20,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=700,height=600");
	
	//1051007 Kevin Zen 1050087 修正資料顯示問題
	//jf_SaveCookie("nIFI700C1", "");
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
