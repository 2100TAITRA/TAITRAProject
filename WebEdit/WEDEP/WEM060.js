/*
DATE	SA		PRG		MGR_NO	DESC
0970923	Stella	Yvonne	---		新增程式FOR檔管局
0980918	Stella	David	0980455	使用WebFileIO時，應傳入Artifact
1040617	Leslie 	Gabby	1040324	增加WebFileIO錯誤訊息處理
1060810	Cloud	Kevin_C	1050087	升二代
1100201	Leslie	Joe		1090927	取消使用document.activeElement
1110103	Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060810	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060810	Kevin_C	1050087	升二代 -S
	//if (document.all["ValidationSummary1"].innerText != "")
		//alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
	//1060810	Kevin_C	1050087	升二代 -E
}

//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
function ClientButtonControl(e)
{
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	switch (xObjectName)
	{
		case "btFloderAll":
			try
			{
				document.all["BF"].Title = "請指定欲讀入的完整機關資訊檔";				
				if(document.all["BF"].ShowDialog(0) !="")
				{
					document.all.txPathAll.value = document.all["BF"].Path;
				}

				Page_BlockSubmit = true;
			}
			catch(e)
			{}
			break;
		case "btFloderDiff":
			try
			{
				document.all["BF"].Title = "請指定欲讀入的差異機關資訊檔";				
				if(document.all["BF"].ShowDialog(0) !="")
				{
					document.all.txPathDiff.value = document.all["BF"].Path;
				}
				Page_BlockSubmit = true;
			}
			catch(e)
			{}
			break;
	}	
}

//1060810	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}

	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1060810	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOutDiff":
			//1060810	Kevin_C	1050087	升二代 -S
			//document.all.FILEPATH.value = document.all.txPathAll.value;
			//if (ConfirmCreatDiff())//是否通過產生差異檔前的檢查
			//{
			//	if(!UploadFile())
			//		Page_BlockSubmit = true;					
			//	IsServerHandling = true;
			//	jf_ShowWaitState();	
			//	Page_BlockSubmit = false;
			//}
			//IsServerHandling = false;
			//for (var i = 0; i < document.all.length; i++)
			//{
			//	document.all[i].style.cursor = "";
			//}
			//window.status = "";
			//else
			//	Page_BlockSubmit = true;
			//jf_ToolBarSubmit();
			if ($('#txPathAll')[0].files[0] === undefined)
			{
				alert("請先選擇要讀入的完整機關資訊檔!");
				Page_BlockSubmit = true;
			}
			else
			{
				UploadFile([$('#txPathAll')[0].files[0]]);
			}
			jf_ToolBarSubmit(xObjectName);
			document.body.style.cursor = "";
			//1060810	Kevin_C	1050087	升二代 -E
			
			break;			
		case "btLoad":
			//1060810	Kevin_C	1050087	升二代 -S
			//document.all.FILEPATH.value = document.all.txPathDiff.value;
			//if(ConfirmLoad())//是否通過載入機關檔前的檢查
			//{
			//	if(!UploadFile())
			//		Page_BlockSubmit = true;
			//	IsServerHandling = true;
			//	jf_ShowWaitState();	
			//	Page_BlockSubmit = false;
			//}
			//IsServerHandling = false;
			//for (var i = 0; i < document.all.length; i++)
			//{
			//	document.all[i].style.cursor = "";
			//}
			//window.status = "";
			//else
			//	Page_BlockSubmit = true;
			//jf_ToolBarSubmit();	
			if ($('#txPathDiff')[0].files[0] === undefined)
			{
				alert("請先選擇要讀入的差異機關資訊檔!");
				Page_BlockSubmit = true;
			}
			else
			{
				UploadFile([$('#txPathDiff')[0].files[0]]);
			}
			jf_ToolBarSubmit(xObjectName);
			//1060810	Kevin_C	1050087	升二代 -E
			
			break;
			
		case "btPrintDiff":
			if(document.all.dg1)
			{
				//1060810	Kevin_C	1050087	升二代
				//IsServerHandling = true;
				//Page_BlockSubmit = false;
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
			{
				alert("請先載入差異機關資訊檔");
			}
			break;
		case "btConfirm":
			//1060810	Kevin_C	1050087	升二代 -S
			//document.all.FILEPATH.value = document.all.txPathDiff.value;
			//if(ConfirmCommit())//是否通過確認更新前的檢查
			//{
				//if(!UploadFile())
					//Page_BlockSubmit = true;
				//IsServerHandling = true;
				//jf_ShowWaitState();	
				//Page_BlockSubmit = false;
			//}
			//else
			//	Page_BlockSubmit = true;
			//jf_ToolBarSubmit();
			//IsServerHandling = false;
			//for (var i = 0; i < document.all.length; i++)
			//{
			//	document.all[i].style.cursor = "";
			//}
			//window.status = "";
			if ($('#txPathDiff')[0].files[0] === undefined)
			{
				alert("請先選擇要讀入更新的差異機關資訊檔!");
				Page_BlockSubmit = true;
			}
			else
			{
				UploadFile([$('#txPathDiff')[0].files[0]]);
			}
			jf_ToolBarSubmit(xObjectName);
			//1060810	Kevin_C	1050087	升二代 -E
			break;
		case "btSearch":
			Page_BlockSubmit = true;
			var strUrl = "WEM060C1.aspx?rtnObj=lbReturnValue";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			//1060810	Kevin_C	1050087	升二代
			//jf_OpenChildWin(strUrl, "WEM060C1", 700, 300);
			openDlg(strUrl, "1", "URL");
			break;					
	}
}

function CallBack(argCallerId)
{
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
	jf_SetFolder();
	ShowMsg();
}

function OnWSResult(argResult)
{
    //webserver回傳後動作
    //檢查回傳的webserverID
    /*//範例
    if (argResult.id == wsGetGrpNameID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["txGrp_Name"].value = argResult.value.RtnField0[0];
		}
		else
		{
			document.all["txGrp_Name"].value = "";
			document.all["txGrp_No"].focus();
		}
	}
	*/
}

//切換讀入來源
function jf_SetFolder()
{
	if (document.all.rbReadAll.checked)
	{
		//1060810	Kevin_C	1050087	升二代 -S
		//SetControlEnable("btFloderAll");
		//SetControlDisable("btFloderDiff");
		
		//for(var i=0;i<document.all.tbTool.numItems;i++)
		//{
		//	if(document.all.tbTool.getItem(i).getAttribute("ID") != "btOutDiff")
		//		document.all.tbTool.getItem(i).setAttribute("disabled",true);
		//	else
		//		document.all.tbTool.getItem(i).setAttribute("disabled",false);
		//}
		document.all.btOutDiff.disabled = false;
		document.all.btLoad.disabled = true;
		document.all.btPrintDiff.disabled = true;
		document.all.btConfirm.disabled = true;
		//1060810	Kevin_C	1050087	升二代 -E
	}
	else
	{
		//1060810	Kevin_C	1050087	升二代 -S
		//SetControlDisable("btFloderAll");		
		//SetControlEnable("btFloderDiff");
		
		//for(var i=0;i<document.all.tbTool.numItems;i++)
		//{
		//	if(document.all.tbTool.getItem(i).getAttribute("ID") != "btOutDiff")
		//		document.all.tbTool.getItem(i).setAttribute("disabled",false);
		//	else
		//		document.all.tbTool.getItem(i).setAttribute("disabled",true);	
		//}
		document.all.btOutDiff.disabled = true;
		document.all.btLoad.disabled = false;
		document.all.btPrintDiff.disabled = false;
		document.all.btConfirm.disabled = false;
		//1060810	Kevin_C	1050087	升二代 -E
	}
	//1060810	Kevin_C	1050087	升二代
	//for(var i=0;i<document.all.tbTool.numItems;i++)
	//{
	//	if(document.all.tbTool.getItem(i).getAttribute("ID") == "btSearch")
	//		document.all.tbTool.getItem(i).setAttribute("disabled",false);
	//}
}
//設定控制項為Enable
//1060810	Kevin_C	1050087	升二代 -S
//function SetControlEnable(argControlName)
//{
//	if(document.all[argControlName].type == "text")
//	{
//		document.all[argControlName].style.backgroundColor = "";
//		document.all[argControlName].readOnly  = false;
//	}
//	else
//	{
//		document.all[argControlName].disabled  = false;
//	}
//}
////設定控制項為Disable
//function SetControlDisable(argControlName)
//{	
//	if(document.all[argControlName].type == "text")
//	{
//		document.all[argControlName].style.backgroundColor = "LightGrey";
//		document.all[argControlName].readOnly  = true;
//	}
//	else
//	{
//		document.all[argControlName].disabled  = true;
//	}
//}
////讀入完整機關資訊，產生差異檔前的檢查
//function ConfirmCreatDiff()
//{
//	var bRtnbool = true;
//	var strErrMsg= "";
//	var strFileName = document.all["txPathAll"].value;
	
//	var ext = strFileName.substring(strFileName.lastIndexOf(".")+1).toLowerCase();
	
//	if (strFileName=="")
//	{
//		strErrMsg = "請先選擇要讀入的完整機關資訊檔!";
//		bRtnbool = false;
//	}
//	else if (ext!="csv")//檢查檔案格式是否為CSV
//	{
//		strErrMsg ="檔案格式不符!(只允許*.csv檔案)";
//		bRtnbool = false;
//	}
//	if (strErrMsg !="")
//		alert(strErrMsg);
//	return bRtnbool;
//}
//1060810	Kevin_C	1050087	升二代 -E
//確認更新前的檢查
function ConfirmCommit()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var strFileName = document.all["txPathDiff"].value;
	
	var ext = strFileName.substring(strFileName.lastIndexOf(".")+1).toLowerCase();
	
	if (strFileName=="")
	{
		strErrMsg = "請先選擇要讀入更新的差異機關資訊檔!";
		bRtnbool = false;
	}
	else if (ext!="csv")//檢查檔案格式是否為CSV
	{
		strErrMsg ="檔案格式不符!(只允許*.csv檔案)";
		bRtnbool = false;
	}
	if (strErrMsg !="")
		alert(strErrMsg);

	return bRtnbool;
}

//載入前檢查
//1060810	Kevin_C	1050087	升二代
//function ConfirmLoad()
//{
//	var bRtnbool = true;
//	var strErrMsg= "";
//	var strFileName = document.all["txPathDiff"].value;
	
//	var ext = strFileName.substring(strFileName.lastIndexOf(".")+1).toLowerCase();
	
//	if (!argFIle)
//	{
//		strErrMsg = "請先選擇要讀入的差異機關資訊檔!";
//		bRtnbool = false;
//	}
//	else if (ext!="csv")//檢查檔案格式是否為CSV
//	{
//		strErrMsg ="檔案格式不符!(只允許*.csv檔案)";
//		bRtnbool = false;
//	}
//	if (strErrMsg !="")
//		alert(strErrMsg);

//	return bRtnbool;
//}

//1060810	Kevin_C	1050087	升二代
//function UploadFile()
function UploadFile(argFile)
{
	//上傳檔案至server
	//1060810	Kevin_C	1050087	升二代 -S
	// if (document.all.FILEPATH.value == "")
	// {
		// return false;
	// }
	// var strFullPath = document.all.FILEPATH.value;
	// var strFileName,strClientPath;
	
	// var start = strFullPath.lastIndexOf("\\");

	// if (start != -1)
	// {
		// strFileName = strFullPath.substring(start+1);
		// strClientPath = strFullPath.substring(0,start);
	// }
	// else
	// {
		// return false;
	// }
	
	// var soap = new ActiveXObject("WSWrapper.WebFileIO");
	////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
	// try
	// {
		// soap.Init(document.all["AP_FILEIO_WS"].value);

		// var strWorkPath = document.all["AP_WORK_PATH"].value;
	////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
	////try
	////{
		// document.all["AP_FILENAME"].value = strFileName;
		// soap.AddFile(strWorkPath, strFileName , strClientPath); //指定檔案上傳資訊
		////0980918	David	0980455	使用WebFileIO時，應傳入Artifact
		////soap.Upload(jf_GetSessionID(), true);
		// soap.Upload(document.all["H_Artifact"].value, true);
		// return true;
	// }
	// catch(e)
	// {
		// document.all["AP_FILENAME"].value ="";
		////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
		////alert(e.message);
		// var strErrMsg = e.message;		
		// if (soap.hasError)
			// strErrMsg += soap.ErrorMessage;
		// alert("連接伺服器"+document.all["AP_FILEIO_WS"].value+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg);
		////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END		

		// return false;
	// }
	document.all["AP_FILENAME"].value = argFile[0].name;
	var strWorkPath = document.all["AP_WORK_PATH"].value;
	var strFileIOWS = document.all["AP_FILEIO_WS"].value;
	if ( document.all.II_USE_SSL != null )
	{
		if ( document.all.II_USE_SSL.value == "Y" )
			strFileIOWS = strFileIOWS.replace("http://", "https://") ;
	}
	var strArtifact = jf_GetSessionID();
	var ioWS = new WebFileIO(strFileIOWS, strArtifact);
	ioWS.upload(strWorkPath, argFile, UploadCallBack);
	//1060810	Kevin_C	1050087	升二代 -E
}
//1060810	Kevin_C	1050087	升二代
function UploadCallBack(result) {
    if (result.hasError) {
    	alert(result.ErrorMessage)
    	Page_BlockSubmit = true;
    }
}
