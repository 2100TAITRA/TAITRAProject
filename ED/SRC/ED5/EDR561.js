/*
DATE		SA			PRG			MGR_NO		DESC
0960625		Charles		Zoey		960160		新增批次匯入功能
0961107		Stella		Yvonne		001573      將地址DECODE BASE64
1031028		Leslie		Kenny		1030836		配合SSL修改傳入元件之URL
1031112	    Leslie		Kevin_C		1020726		於__doPostBack前加上IsServerHandling=true,避免重複執行
1040617		Leslie 		Gabby		1040324		增加WebFileIO錯誤訊息處理
1050719		David  		Joe			1050087		二代系統修改  
1050803		David		Joe			1050087		修改子視窗大小
1051019     Leslie      Kenny       1050087     二代公文修改
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//Zoey [960160, 96/06/25]提供由檔案批次匯入受文者功能
//檔案系統物件，用來讀取受文者檔案
var ForReading = 1,ForWriting = 2;
var fso = new ActiveXObject("Scripting.FileSystemObject");
//存放受文者檔案中的受文者資訊
var arrFileValue = new Array();
var ForFile = 1,ForFolder=2;


//紀錄Call WebService物件的id
var wsDuplicateID;
var bHasCheck = false;
//指定DataGrid欄位
var strTableFields = new Array("_txAcp","_txNo","_txAddress");

//1050719 Joe 1050087 二代公文修改--S
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
// if(document.all.dg1)
	// document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//1050719 Joe 1050087 二代公文修改--E

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/

function ClientOnLoad()
{
// 1050719 Joe 1050087 二代公文修改--S
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	// jf_CallWS("../../../ODDEP/lib/WEOrgInfo.asmx", "GetOrgInfo", false, null);
	// 1050719 Joe 1050087 二代公文修改--E
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	DownLoadPrintFile();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	switch (xObjectName)
	{
		case "btHelp":
			//1050719 Joe 1050087 二代公文修改，修正開啟WEM010C1方法--S
			var path = document.all.H_Wed010C1Path.value;
			// var strEnv = document.all["txHiddenEnv"].value;
			//1050719 Joe 1050087 二代公文修改，修正開啟WEM010C1方法--E
			var strOrgNo = document.all["txHiddenOrgNo"].value;
			var strUrl = "";
			//1050719 Joe 1050087 二代公文修改，修正開啟WEM010C1方法
			// strUrl = "../../../ODDEP/WEM010C1.aspx?OrgID="+strOrgNo+"&K1=Dlg_Dept&Search="+escape(document.all["txAcpOrg"].value);
			strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + strOrgNo + "&K1=WEM010";
			//1050803	Joe		1050087		修正子視窗大小
			// jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			jf_OpenChildWin(strUrl, "WEM010C1", 800, 600 );
			Page_BlockSubmit=true;
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050719 Joe 1050087 二代公文修改，參數多加event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050719 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btClean":		
			//1050719 Joe 1050087 二代公文修改
			Page_BlockSubmit =true;
			ConfirmClean(true);
			break;
		case "btPrint":
			Page_BlockSubmit = jf_CheckBlankAndAlert();
			//1050719 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			/*if(document.all.txPositionNo.value != "")
			{
				if(parseInt(document.all.txPositionNo.value) > 16)
				{
					var strErrMsg = "列印位置必須小於等於16!!\n";
					jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
					Page_BlockSubmit = true;
					document.all.txPositionNo.focus();
				}
				else
				{
					Page_BlockSubmit = jf_CheckBlankAndAlert();
				}
			}
			else
			{
				Page_BlockSubmit = jf_CheckBlankAndAlert();
			}*/
			Page_BlockSubmit = jf_CheckBlankAndAlert();
			//1050719 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			SelectAll("dg1", "_cbSelect", "_txAcp");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			SelectInverse("dg1", "_cbSelect", "_txAcp");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
			jf_ResizeDg();
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
			break;
		case "btAdd":
			Page_BlockSubmit = true;
			if(jf_CheckBeforSave())
			{
				if(bHasCheck)
					jf_AddDetail();
				else
				{
					fnCheckOrgNo("txAcpOrg","lbOrg");
					jf_AddDetail();
				}
			}
			break;		
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txAcpOrg"].value == "")
	{
    	strErrMsg += "受文機關欄位不可空白\n";
		//1050719	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txAcpOrg"].focus();
		$('#txAcpOrg').focus();			
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
function CallBack(argCallerId)
{
	if(argCallerId == "WEM010C1")
	{
		var DeptInfo ;
		var nReturnCnt = document.all["lbReturnValue"].options.length;		
		var Count =""; 
		var nRow = document.all.dg1.rows.length;
		for(var i = 2; i <= nRow; i++)
		{
			if(jf_Trim(document.all["dg1__ctl"+ i + "_txAcp"].value) == "")
			{
				Count = i;
				break;
			}
		}
		if(Count == "")
		     Count = nRow+1;
		var strReturnValue ="";
		
		//zoey [950868]
		for(var j = 0; j < nReturnCnt ; j++) 
		{
			if(Count > nRow  )
			 {			      
			      //若受文者數目大於dg1欄位,則將受文者資料以!@%!連接成字串,傳回server
			       DeptInfo = document.all.lbReturnValue.options[j].value;
					//1050719	Joe		修改WEM010C1回傳值處理方式
					// DeptArray = DeptInfo.split(',');
					DeptArray = DeptInfo.split('^');
				   
				    var strTemp ="";
	                var strRep = /\|/g;
	                strTemp = (jf_Trim(DeptArray[1])).replace(strRep,"!@%!");
	                strReturnValue += (strTemp+"|");
	                strTemp =  (jf_Trim(DeptArray[6])).replace(strRep,"!@%!");
					strReturnValue += (strTemp+"|");
					strTemp =  (jf_Trim(DeptArray[7])).replace(strRep,"!@%!");
					strReturnValue += (strTemp+"|");
				   
				   //strReturnValue += (jf_Trim(DeptArray[1])+"|");
				   //strReturnValue += (jf_Trim(DeptArray[6])+"|"); 
				   //strReturnValue += (jf_Trim(DeptArray[7])+"|");
				   Count++;
			 }
			 else
			 {
			    DeptInfo = document.all.lbReturnValue.options[j].value;
				//1050719	Joe		修改WEM010C1回傳值處理方式
				// DeptArray = DeptInfo.split(',');
				DeptArray = DeptInfo.split('^');
				document.all["dg1__ctl" + Count + "_txAcp"].value =  jf_Trim(DeptArray[1]);
				document.all["dg1__ctl" + Count + "_txNo"].value = jf_Trim(DeptArray[6]); 
				document.all["dg1__ctl" + Count + "_txAddress"].value = utf8to16(base64decode(jf_Trim(DeptArray[7])));
				document.all["dg1__ctl" + Count + "_cbSelect"].checked = true;
				Count ++;
			 }
		}
		if((Count-1)> nRow)
		{
		   strReturnValue += Count;
		   document.all["txHideReturn"].value = strReturnValue;
		   //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
		   IsServerHandling = true;
		   __doPostBack("btHelp",0);  //受文者數目大於dg1欄位,則postback回server的btHelp_Click處理
		   return;
		}	  
	}
	
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//加入DataGrid功能
function jf_AddDetail()
{
	var Count =""; 
	var nRow = document.all.dg1.rows.length;
	for(var i = 2; i <= nRow; i++)
	{
		if(jf_Trim(document.all["dg1__ctl"+ i + "_txAcp"].value) == "")
		{
			Count = i;
			break;
		}
	}
	if(Count == "")
	     Count =  nRow+1;
	var strReturnValue ="";
	if(Count>nRow)
	{
	       //zoey [950868] 若受文者數目大於dg1欄位,則將受文者資料以!@%!連接成字串,傳回server
	       
	       var strTemp ="";
	       var strRep = /\|/g;
	       strTemp = (document.all["lbOrg"].textContent + document.all["txAcpName"].value).replace(strRep,"!@%!");
	       strReturnValue += (strTemp+"|");
	        strTemp = (document.all["txMailNo"].value).replace(strRep,"!@%!");
	       strReturnValue += (strTemp+"|");
	        strTemp = (document.all["txAdd"].value).replace(strRep,"!@%!");
	       strReturnValue += (strTemp+"|");
	       //////////////////////////////////////////////////////////////////////////////////
	
	        //strReturnValue += (document.all["lbOrg"].textContent + document.all["txAcpName"].value+"|");
		   // strReturnValue += (document.all["txMailNo"].value+"|"); 
			//strReturnValue += (document.all["txAdd"].value+"|");
			Count++;
		    document.all["txHideReturn"].value = (strReturnValue+Count);
		    
		    document.all["txAcpOrg"].value ="";
			document.all["txAcpName"].value = "";
			document.all["txMailNo"].value = "";
			document.all["txAdd"].value = "";
			document.all["lbOrg"].textContent = "";
			bHasCheck = false;
	        //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			IsServerHandling = true;
		   __doPostBack("btHelp",0); //受文者數目大於dg1欄位,則postback回server的btHelp_Click處理
		   return;
	}
	document.all["dg1__ctl" + Count + "_txAcp"].value =  document.all["lbOrg"].textContent + document.all["txAcpName"].value;
	document.all["dg1__ctl" + Count + "_txNo"].value = document.all["txMailNo"].value;
	document.all["dg1__ctl" + Count + "_txAddress"].value = document.all["txAdd"].value;
	document.all["dg1__ctl" + Count + "_cbSelect"].checked = true;
	document.all["txAcpOrg"].value ="";
	document.all["txAcpName"].value = "";
	document.all["txMailNo"].value = "";
	document.all["txAdd"].value = "";
	document.all["lbOrg"].textContent = "";
	bHasCheck = false;
	//1050719	Joe	1050087	二代系統升級，調整focus寫法
	//document.all["txAcpOrg"].focus();
	$('#txAcpOrg').focus();				
}

//刪除選取
function jf_ResizeDg()
{
	var ArrCount = 0;
	var arrayAcp = new Array(50);
	var arrayNo = new Array(50);
	var arrayAdd = new Array(50);
	var arrOrgNo = new Array(50);
	for(var j = 2; j <= document.all.dg1.rows.length ; j++)
	{
		if(jf_Trim(document.all["dg1__ctl"+ j + "_txAcp"].value) != "")
		{
			if(document.all["dg1__ctl"+ j +"_cbSelect"].checked == true)
			{
				document.all["dg1__ctl"+ j +"_txAcp"].value = "";
				document.all["dg1__ctl"+ j +"_txNo"].value = "";
				document.all["dg1__ctl"+ j +"_txAddress"].value = "";
			}	
			else
			{
				arrayAcp[ArrCount] = document.all["dg1__ctl"+ j +"_txAcp"].value;
				arrayNo[ArrCount] = document.all["dg1__ctl"+ j +"_txNo"].value;
				arrayAdd[ArrCount] = document.all["dg1__ctl"+ j +"_txAddress"].value;			
				ArrCount++;				
			}
		}
		document.all["dg1__ctl"+ j +"_txAcp"].value = "";
		document.all["dg1__ctl"+ j +"_txNo"].value = "";
		document.all["dg1__ctl"+ j +"_txAddress"].value = "";
		document.all["dg1__ctl"+ j +"_cbSelect"].checked = false;
	}
	
	for(var k = 2; k < ArrCount+2 ; k++)
	{	
		document.all["dg1__ctl"+ k +"_txAcp"].value = arrayAcp[k-2];
		document.all["dg1__ctl"+ k +"_txNo"].value = arrayNo[k-2];
		document.all["dg1__ctl"+ k +"_txAddress"].value = arrayAdd[k-2];
	}
}

//檢查DataGrid資料列是否至少有一筆資料
function jf_CheckBlankAndAlert()
{
	var InValid = false;
	var InValidControlName = "";
	var strErrMsg= "";
	var Cnt = 0;
	var strMsg = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if (document.all["dg1__ctl"+i+"_cbSelect"].checked)				
		{
			Cnt ++;
			if(document.all["dg1__ctl" + i + "_txAcp"].value == "")
			{
				if(strMsg !="")
					strMsg += ", ";
				
				strMsg += (i-1); 
			}
		}
	}
	if(strMsg != "")
	{
		strErrMsg = "所勾選之序"+strMsg+"資料列為空白\n";
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );	
		InValid = true;
	}
	if(Cnt == 0)
	{
		strErrMsg = "至少勾選一筆明細資料\n";
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		InValid = true;
	}
	return InValid;
}

//Call WebService 查回機關代碼資料
function fnCheckOrgNo(argOrgNo,argOrgName)
{
	var strOrgNo  = jf_Trim(document.all[argOrgNo].value);
	var OrgNo     =	jf_Trim(document.all["txHiddenOrgNo"].value);
	var DeptNo	  = document.all["H_DeptNo"].value ;
	var UserID	  = document.all["H_UserId"].value ;
	
	if(strOrgNo == "")
	{
		document.all[argOrgNo].value = "" ;
		document.all[argOrgName].textContent = "";
		bHasCheck = true;
		return bHasCheck;
	}
	
	var arWSParam = new Array(4);
	
	arWSParam[0] = strOrgNo ;
	arWSParam[1] = OrgNo ;
	arWSParam[2] = DeptNo ;
	arWSParam[3] = UserID ;
	
	CallWsObj = jf_CallWS("../../../ODDEP/lib/WEOrgInfo.asmx", "GetOrgInfo", false, arWSParam);
	if(jf_IsWebServiceSuccess(CallWsObj))
	{
		if(!CallWsObj.value.ErrorClass.IsErr)
		{
			if(CallWsObj.value.Count > 0)
			{
				if(jf_Trim(CallWsObj.value.OrgID[0]) != "" || jf_Trim(CallWsObj.value.OrgName[0]) != "")
				{
					if(CallWsObj.value.Count > 0)
					{
						if(jf_Trim(CallWsObj.value.OrgID[0])!="")
						{
							document.all.txAcpOrg.value = jf_Trim(CallWsObj.value.OrgID[0]);
							document.all["lbOrg"].textContent = jf_Trim(CallWsObj.value.OrgName[0]);
							document.all.txMailNo.value = jf_Trim(CallWsObj.value.PostNo[0]);
							document.all.txAdd.value = jf_Trim(CallWsObj.value.Address[0]);
							bHasCheck = true;
						}
					}
				}
			}
			else
			{
				jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["無此機關代碼"]) ), "" );
				document.all[argOrgName].textContent = "";
				//document.all[argOrgNo].focus();
				bHasCheck = true;
			}
		}
	}
	else
	{
		bHasCheck = true;
	}
	return bHasCheck;
}

//清除功能
function ConfirmClean(argIsCleanAnyway)
{
	var ret = window.confirm("確定要清除嗎?");
	if(ret)
	   jf_CleanForm(argIsCleanAnyway);
	return ret;
}

function jf_CleanForm()
{
	document.all["txAcpOrg"].value ="";
	document.all["txAcpName"].value = "";
	document.all["txMailNo"].value = "";
	document.all["txAdd"].value = "";
	document.all["lbOrg"].textContent = "";

	for(var j = 2; j <= document.all.dg1.rows.length ; j++)
	{
		document.all["dg1__ctl"+ j +"_txAcp"].value = "";
		document.all["dg1__ctl"+ j +"_txNo"].value = "";
		document.all["dg1__ctl"+ j +"_txAddress"].value = "";
		document.all["dg1__ctl"+ j +"_cbSelect"].checked = false;
	}
	
}
function fnKeyEvent()
{
	if(event.keyCode == 115)
	{
		Page_BlockSubmit = true;
		if(jf_CheckBeforSave())
			jf_AddDetail();
	}
}

//全部選取
function SelectAll(argTableName, argCheckBoxName, argTxBox)
{
	var i,j;
	if(document.all[argTableName] == null)
		return;
	
	var len = document.all[argTableName].rows.length + 1;
	
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		var obj2= document.all[argTableName+"__ctl"+ i + argTxBox];
		if(obj.disabled == false)
		{	if(obj2.value != "")
				obj.checked = true;	
		}
	}
}

//反向選取
function SelectInverse(argTableName, argCheckBoxName, argTxBox)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		var obj2= document.all[argTableName+"__ctl"+ i + argTxBox];
		if(obj.disabled == false)
		{
			if(obj.checked)
				obj.checked = false;
			else
			{
				if(obj2.value != "")
				{	obj.checked = true;}
			}
		}
	}
}
//Zoey [960160, 96/06/25]提供由檔案批次匯入受文者功能
function jf_ReadTextFile(argFilePath,argType)
{
	if(!fso.FileExists(argFilePath))
	{
		if(argType==ForFile)
		{
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["檔案不存在!!"]) ), "" );
			//1050719	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txFile"].focus();
			$('#txFile').focus();				
		}
		return false;
	}
	var ExtName = fso.GetExtensionName(argFilePath);
    if(!(ExtName.toUpperCase()=="CSV"||ExtName.toUpperCase()=="TXT"))
    {
		if(argType==ForFile)
		{
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["檔案格式不正確請輸入CSV檔或TXT檔!!"]) ), "" );
			//1050719	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txFile"].focus();
			$('#txFile').focus();				
		}
		return false;
    }
	var f = fso.OpenTextFile(argFilePath,ForReading);
	while(!f.AtEndOfStream)
	{
		var LineValue = f.ReadLine();
		var tempArr = LineValue.split(',');
		if(tempArr.length!=3)
			continue;
		if(tempArr[0]=="受文者")
			continue;
		arrFileValue[arrFileValue.length] = tempArr;
	}
	f.close();
	return true;
}

function jf_BatchAddDetail()
{
//alert("jf_BatchAddDetail");
	var DeptInfo ;
	var nReturnCnt =arrFileValue.length;
	var Count =""; 
	var nRow = document.all.dg1.rows.length;
	for(var i = 2; i <= nRow; i++)
	{
		if(jf_Trim(document.all["dg1__ctl"+ i + "_txAcp"].value) == "")
		{
			Count = i;
			break;
		}
	}
	if(Count == "")
		    Count = nRow+1;
	var strReturnValue ="";
	
	//zoey [950868]
	for(var j = 0; j < nReturnCnt ; j++) 
	{
		if(Count > nRow  )
		{
			//若受文者數目大於dg1欄位,則將受文者資料以!@%!連接成字串,傳回server
			DeptArray =arrFileValue[j];
			
			var strTemp ="";
	        var strRep = /\|/g;
	        strTemp = (jf_Trim(DeptArray[0])).replace(strRep,"!@%!");
	        strReturnValue += (strTemp+"|");
	        strTemp =  (jf_Trim(DeptArray[1])).replace(strRep,"!@%!");
			strReturnValue += (strTemp+"|");
			strTemp =  (jf_Trim(DeptArray[2])).replace(strRep,"!@%!");
			strReturnValue += (strTemp+"|");
			
			Count++;
		}
		else
		{
			DeptArray = arrFileValue[j];
			document.all["dg1__ctl" + Count + "_txAcp"].value =  jf_Trim(DeptArray[0]);
			document.all["dg1__ctl" + Count + "_txNo"].value = jf_Trim(DeptArray[1]); 
			document.all["dg1__ctl" + Count + "_txAddress"].value = jf_Trim(DeptArray[2]);
			document.all["dg1__ctl" + Count + "_cbSelect"].checked = true;
			Count ++;
		}
	}
	if((Count-1)> nRow)
	{
		strReturnValue += Count;
		document.all["txHideReturn"].value = strReturnValue;
	    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
		IsServerHandling = true;
		__doPostBack("btHelp",0);  //受文者數目大於dg1欄位,則postback回server的btHelp_Click處理
		return;
	}	  
	arrFileValue.length=0;
}
function jf_CancelKey()
{
	if(event.keyCode == 8||event.keyCode == 13)
		event.cancelBubble = true;
	if(event.keyCode == 13)
		event.returnValue = false;
}

function jf_ReadFolder(argPath)
{
	var f,strFileName,fc1;
	var f=fso.GetFolder(argPath);
	var fc1= new Enumerator(f.files);
	for (; !fc1.atEnd(); fc1.moveNext())
	{
		//取得檔案名稱
		objFile = fc1.item();
		strFileName = objFile.Path;
		if(strFileName.substr(strFileName.lastIndexOf("\.")+1).toUpperCase() == "CSV" || strFileName.substr(strFileName.lastIndexOf("\.")+1).toUpperCase() == "TXT")
		{
			jf_ReadTextFile(strFileName,ForFolder);
		}
	}
	return true;
}

function jf_CheckFileFolder(argPath)
{
	if(jf_Trim(argPath)=="")
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["請輸入檔案或資料夾完整路徑!!"]) ), "" );
		//1050719	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txFile"].focus();
		$('#txFile').focus();				
		return false;	
	}
	if(fso.FolderExists(argPath))
	{
		return ForFolder;
	}
	else if(fso.FileExists(argPath))
	{
		return ForFile;
	}
	jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["輸入之檔案或資料夾路徑不存在!!"]) ), "" );
	//1050719	Joe	1050087	二代系統升級，調整focus寫法
	//document.all["txFile"].focus();
	$('#txFile').focus();				
	return false;
}

function DownLoadPrintFile()
{
	if(document.all["FILE_NAME"])
	{
		var strFileName = document.all["FILE_NAME"].value;
		var strBatFileName = document.all["BATCH_FILE_NAME"].value;
		var strPath = document.all["FILE_PATH"].value;
		var strPathServer = document.all["FILE_PATH_SERVER"].value;
		
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var soap = new ActiveXObject("WSWrapper.WebFileIO");
		try
		{
			if(!fso.FolderExists(strPath)) //下載目的資料夾不存在時建立資料夾
				fso.CreateFolder(strPath);
				
			//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
			//soap.Init(document.all["AP_FILEIO_WS"].value);
			var FileIOWS = document.all["AP_FILEIO_WS"].value ;
			if ( document.all.II_USE_SSL != null )
			{
				if ( document.all.II_USE_SSL.value == "Y" )
					FileIOWS = FileIOWS.replace("http://", "https://") ;
			}
			soap.Init(FileIOWS);
			
			soap.AddFile(strPathServer, strFileName);
			soap.Download(document.all["SsoArtifact"].value, true, strPath);
		}
		catch(e)
		{
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
			//alert("下載檔案" + strFileName + "失敗，錯誤訊息：" + e.message);
			alert("連接伺服器"+FileIOWS+"下載檔案" + strFileName + "失敗，錯誤訊息：" + e.message+soap.ErrorMessage);
		}
		try
		{
			soap.AddFile(strPathServer, strBatFileName);
			soap.Download(document.all["SsoArtifact"].value, true, strPath);
		}
		catch(e)
		{
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
			//alert("下載檔案" + strBatFileName + "失敗，錯誤訊息：" + e.message);
			alert("連接伺服器"+FileIOWS+"下載檔案" + strBatFileName + "失敗，錯誤訊息：" + e.message+soap.ErrorMessage);
		}
		
		var objShell = new ActiveXObject("Shell.Application");
                objShell.ShellExecute(strPath + strBatFileName, "", "", "open", 0);
	}
}

//decode base64
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	/* c1 */
	do {
	    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c1 == -1);
	if(c1 == -1)
	    break;

	/* c2 */
	do {
	    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c2 == -1);
	if(c2 == -1)
	    break;

	out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

	/* c3 */
	do {
	    c3 = str.charCodeAt(i++) & 0xff;
	    if(c3 == 61)
		return out;
	    c3 = base64DecodeChars[c3];
	} while(i < len && c3 == -1);
	if(c3 == -1)
	    break;

	out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

	/* c4 */
	do {
	    c4 = str.charCodeAt(i++) & 0xff;
	    if(c4 == 61)
		return out;
	    c4 = base64DecodeChars[c4];
	} while(i < len && c4 == -1);
	if(c4 == -1)
	    break;
	out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }

    return out;

}



function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
	c = str.charCodeAt(i++);
	switch(c >> 4)
	{ 
	  case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	    // 0xxxxxxx
	    out += str.charAt(i-1);
	    break;
	  case 12: case 13:
	    // 110x xxxx   10xx xxxx
	    char2 = str.charCodeAt(i++);
	    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	    break;
	  case 14:
	    // 1110 xxxx  10xx xxxx  10xx xxxx
	    char2 = str.charCodeAt(i++);
	    char3 = str.charCodeAt(i++);
	    out += String.fromCharCode( ((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) |  ((char3 & 0x3F) << 0));
	    break;
	}
    }

    return out;
}