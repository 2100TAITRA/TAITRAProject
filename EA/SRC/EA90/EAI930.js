/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			SA		PG		單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1060104      Cloud   Justin  1050087     二代公文修改
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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

//1060104  Justin [1050087] 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
	
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060104  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060104  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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
		case "btCls":	//分類號子視窗
				var pUrl = "";
				document.all("SubWinRtn").length=0;
				pUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAI300&MODE=1&FILE_CLS="+document.all["tbCLS"].value;
				ActiveBtn="btCls";
				jf_OpenChildWin(pUrl,"EAC005",750,550);
				Page_BlockSubmit = true;
				break;
		case "btECls":	//迄止分類號子視窗
				var pUrl = "";
				document.all("SubWinRtn").length=0;
				pUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAI300&MODE=1&FILE_CLS="+document.all["txECLS"].value;
				ActiveBtn="btECls";
				jf_OpenChildWin(pUrl,"EAC005",750,550);
				Page_BlockSubmit = true;
				break;
		case "btClass":	//案次號子視窗
				var pUrl = "";
				document.all("SubWinRtn").length=0;
				pUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAI300&MODE=2&FILE_CASE="+document.all["tbCASE"].value;
				ActiveBtn="btClass";
				jf_OpenChildWin(pUrl,"EAC005",750,550);
				Page_BlockSubmit = true;
				break;
		case "btECase": //迄止案次號子視窗
				var pUrl = "";
				document.all("SubWinRtn").length=0;
				pUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAI300&MODE=2&FILE_CASE="+document.all["txECase"].value;
				ActiveBtn="btECase";
				jf_OpenChildWin(pUrl,"EAC005",750,550);
				Page_BlockSubmit = true;
				break;
		/*1060104  Justin [1050087] 二代公文修改
		case "btBaseDateFrom":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txFrom, event.screenX, event.screenY);
			break;
		case "btBaseDateTo":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txTo, event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060104  Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
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
	
    //1060104  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = false;!jf_CheckKeyObject();
		    //1060104  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1060104  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1060104  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmClean(true);
		    //1060104  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
		case "btClean":
			Page_BlockSubmit = true;
			
			//1060104  Justin [1050087] 二代公文修改
			//document.all["txDocNo"].focus();
			$('#txDocNo').focus();
			break;
		case "btSearch":
		    Page_BlockSubmit = false;
		    if((jf_Trim(document.all.tbYEAR.value) != "" || jf_Trim(document.all.tbCLS.value) != "" || jf_Trim(document.all.tbCASE.value) != "" || jf_Trim(document.all.tbVOL.value) != "" || jf_Trim(document.all.tbSEQ.value) != "") 
		    || (jf_Trim(document.all.txEYear.value) != ""  || jf_Trim(document.all.txECLS.value) != "" || jf_Trim(document.all.txECase.value) != "" || jf_Trim(document.all.txEVol.value) != "" || jf_Trim(document.all.txESeq.value) != "")) 
		    {			
				if(!CheckFileNo("tbYEAR","tbCLS","tbCASE","tbVOL","tbSEQ"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.tbYEAR.focus();
				    $('#tbYEAR').focus();
					return;
				}		
				if(!CheckFileNo("txEYear","txECLS","txECase","txEVol","txESeq"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.txEYear.focus();
				    $('#txEYear').focus();
					return;
				}
				//起訖項目需一致 起 S 訖 E
				if(!CheckFileNoMatch("tbYEAR","tbCLS","tbCASE","tbVOL","tbSEQ","txEYear","txECLS","txECase","txEVol","txESeq"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.tbYEAR.focus();
				    $('#tbYEAR').focus();
					return;
				}
			}
			if(jf_Trim(document.all.txFrom.value) != "" && jf_Trim(document.all.txTo.value) != "")
			{			
				if (!jf_CheckCDATE(document.all.txFrom.value))
				{
					Page_BlockSubmit = true;
					alert("(起始)日期格式輸入錯誤");
				    //1060104  Justin [1050087] 二代公文修改
					//document.all.txFrom.focus();
					$('#txFrom').focus();
					return;
				}
				if (!jf_CheckCDATE(document.all.txTo.value))
				{
					Page_BlockSubmit = true;
					alert("(迄)日期格式輸入錯誤");
				    //1060104  Justin [1050087] 二代公文修改
					//document.all.txTo.focus();
					$('#txTo').focus();
					return;
				}
				if (document.all.txFrom.value > document.all.txTo.value)
				{
					Page_BlockSubmit = true;
					alert("輸入日期起必須小於迄");
				    //1060104  Justin [1050087] 二代公文修改
					//document.all.txTo.focus();
					$('#txTo').focus();
					return;
				}
			}
		    if(document.all.ck2.checked==false && document.all.ck3.checked==false && document.all.ck4.checked==false && document.all.ckPrint.checked==false && document.all.ckSaveAs.checked==false)
		    {
			    alert("作業項目請至少勾選一項!!");
			    Page_BlockSubmit = true;
			    return;
		    }		    
		    //1060104  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		    Page_BlockSubmit = false;
		     if((jf_Trim(document.all.tbYEAR.value) != "" || jf_Trim(document.all.tbCLS.value) != "" || jf_Trim(document.all.tbCASE.value) != "" || jf_Trim(document.all.tbVOL.value) != "" || jf_Trim(document.all.tbSEQ.value) != "") 
		    || (jf_Trim(document.all.txEYear.value) != ""  || jf_Trim(document.all.txECLS.value) != "" || jf_Trim(document.all.txECase.value) != "" || jf_Trim(document.all.txEVol.value) != "" || jf_Trim(document.all.txESeq.value) != "")) 
		    {		
				if(!CheckFileNo("tbYEAR","tbCLS","tbCASE","tbVOL","tbSEQ"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.tbYEAR.focus();
				    $('#tbYEAR').focus();
					return;
				}			
				if(!CheckFileNo("txEYear","txECLS","txECase","txEVol","txESeq"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.txEYear.focus();
				    $('#txEYear').focus();
					return;
				}
				
				//起訖項目需一致 起 S 訖 E
				if(!CheckFileNoMatch("tbYEAR","tbCLS","tbCASE","tbVOL","tbSEQ","txEYear","txECLS","txECase","txEVol","txESeq"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.tbYEAR.focus();
				    $('#tbYEAR').focus();
					return;
				}
			}
		    if(document.all.ck2.checked==false && document.all.ck3.checked==false && document.all.ck4.checked==false && document.all.ckPrint.checked==false && document.all.ckSaveAs.checked==false)
		    {
		    alert("作業項目請至少勾選一項!!");Page_BlockSubmit = true;return;
		    }		    
		    //1060104  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		    Page_BlockSubmit = false;
		     if((jf_Trim(document.all.tbYEAR.value) != "" || jf_Trim(document.all.tbCLS.value) != "" || jf_Trim(document.all.tbCASE.value) != "" || jf_Trim(document.all.tbVOL.value) != "" || jf_Trim(document.all.tbSEQ.value) != "") 
		    || (jf_Trim(document.all.txEYear.value) != ""  || jf_Trim(document.all.txECLS.value) != "" || jf_Trim(document.all.txECase.value) != "" || jf_Trim(document.all.txEVol.value) != "" || jf_Trim(document.all.txESeq.value) != "")) 
			{			
				if(!CheckFileNo("tbYEAR","tbCLS","tbCASE","tbVOL","tbSEQ"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.tbYEAR.focus();
				    $('#tbYEAR').focus();
					return;
				}			
				if(!CheckFileNo("txEYear","txECLS","txECase","txEVol","txESeq"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.txEYear.focus();
				    $('#txEYear').focus();
					return;
				}
				
				//起訖項目需一致 起 S 訖 E
				if(!CheckFileNoMatch("tbYEAR","tbCLS","tbCASE","tbVOL","tbSEQ","txEYear","txECLS","txECase","txEVol","txESeq"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.tbYEAR.focus();
				    $('#tbYEAR').focus();
					return;
				}
			}
		    if(document.all.ck2.checked==false && document.all.ck3.checked==false && document.all.ck4.checked==false && document.all.ckPrint.checked==false && document.all.ckSaveAs.checked==false)
		    {
		    alert("作業項目請至少勾選一項!!");Page_BlockSubmit = true;return;
		    }		    
		    //1060104  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btDS":
		    Page_BlockSubmit = false;
		    if(jf_Trim(document.all.tbYEAR.value) != "" && jf_Trim(document.all.txEYear.value) != "")
			{			
				if(!CheckFileNo("tbYEAR","tbCLS","tbCASE","tbVOL","tbSEQ"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.tbYEAR.focus();
				    $('#tbYEAR').focus();
					return;
				}			
			}
		    if(jf_Trim(document.all.txFrom.value) != "" && jf_Trim(document.all.txTo.value) != "")
			{			
				if (!jf_CheckCDATE(document.all.txFrom.value))
				{
					Page_BlockSubmit = true;
					alert("(起始)日期格式輸入錯誤");
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.txFrom.focus();
					$('#txFrom').focus();
					return;
				}
				if (!jf_CheckCDATE(document.all.txTo.value))
				{
					Page_BlockSubmit = true;
					alert("(迄)日期格式輸入錯誤");
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.txTo.focus();
					$('#txTo').focus();
					return;
				}
				if (document.all.txFrom.value > document.all.txTo.value)
				{
					Page_BlockSubmit = true;
					alert("輸入日期起必須小於迄");
				    //1060104  Justin [1050087] 二代公文修改
					//document.all.txTo.focus();
					$('#txTo').focus();
					return;
				}
			}
			else
			{	
				Page_BlockSubmit = true;
				alert("日期欄位不可為空");
		        //1060104  Justin [1050087] 二代公文修改
				//document.all.txTo.focus();
				$('#txTo').focus();
				return;
			}
		    //1060104  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPS":
		    Page_BlockSubmit = false;
		    if(jf_Trim(document.all.tbYEAR.value) != "" && jf_Trim(document.all.txEYear.value) != "")
			{			
				if(!CheckFileNo("tbYEAR","tbCLS","tbCASE","tbVOL","tbSEQ"))
				{
				    Page_BlockSubmit = true;
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.tbYEAR.focus();
				    $('#tbYEAR').focus();
					return;
				}			
			}
		    if(jf_Trim(document.all.txFrom.value) != "" && jf_Trim(document.all.txTo.value) != "")
			{			
				if (!jf_CheckCDATE(document.all.txFrom.value))
				{
					Page_BlockSubmit = true;
					alert("(起始)日期格式輸入錯誤");
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.txFrom.focus();
					$('#txFrom').focus();
					return;
				}
				if (!jf_CheckCDATE(document.all.txTo.value))
				{
					Page_BlockSubmit = true;
					alert("(迄)日期格式輸入錯誤");
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.txTo.focus();
					$('#txTo').focus();
					return;
				}
				if (document.all.txFrom.value > document.all.txTo.value)
				{
					Page_BlockSubmit = true;
					alert("輸入日期起必須小於迄");
				    //1060104  Justin [1050087] 二代公文修改
				    //document.all.txTo.focus();
					$('#txTo').focus();
					return;
				}
			}
			else
			{	
				Page_BlockSubmit = true;
				alert("日期欄位不可為空");
		        //1060104  Justin [1050087] 二代公文修改
				//document.all.txTo.focus();
				$('#txTo').focus();
				return;
			}
		    //1060104  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txDocNo"].value == "")
	{
	    strErrMsg += "鍵值欄位不可空白\n";
	    //1060104  Justin [1050087] 二代公文修改
	    //document.all["txDocNo"].focus();
	    $('#txDocNo').focus();
	}
	

	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
			    InValidName = InValidName.substr(1, InValidName.length);
			    //1060104  Justin [1050087] 二代公文修改 
			    //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
			    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
			    //1060104  Justin [1050087] 二代公文修改
			    //document.all[InValidControlName].focus();
			    $('#' + InValidControlName).focus();
				return false;
			}
		}
	}
	return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txDocNo"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if (argCallerId=="EAC005")
	{
		if(ActiveBtn == "btCls" || ActiveBtn == "btClass")
		{
			if(document.all["lbReturnValue"].length>0)
			{
				document.all["tbCLS"].value=document.all["lbReturnValue"].options[1].value;
				document.all["tbCASE"].value=document.all["lbReturnValue"].options[2].value;
				if(document.all["lbReturnValue"].options[0].value!="")
					document.all["tbYEAR"].value=document.all["lbReturnValue"].options[0].value;
			}
		}
		else if (ActiveBtn == "btECls" || ActiveBtn == "btECase")
		{
			if(document.all["lbReturnValue"].length>0)
			{
				document.all["txECLS"].value=document.all["lbReturnValue"].options[1].value;
				document.all["txECase"].value=document.all["lbReturnValue"].options[2].value;
				if(document.all["lbReturnValue"].options[0].value!="")
					document.all["txEYear"].value=document.all["lbReturnValue"].options[0].value;				
			}
		}
	}
	
	if (argCallerId == "EAT400C1")
	{
		if (whoCallMe == "btKeyHelpFrom")
		{
		    document.all["txFrom"].value = document.all["lbReturnValue"].options[0].value;
		    //1060104  Justin [1050087] 二代公文修改
		    //document.all["txFrom"].focus();
		    $('#txFrom').focus();
		}
		if (whoCallMe == "btKeyHelpTo")
		{
		    document.all["txTo"].value = document.all["lbReturnValue"].options[0].value;
		    //1060104  Justin [1050087] 二代公文修改
		    //document.all["txTo"].focus();
		    $('#txTo').focus();
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
function PADZERO(obj,num)
{
	if(obj.value!="")
	{
		obj.value = jf_PADL(obj.value,num,"0");
	}
}

function IsValidToSearch()
{
	//檢查起始檔號是否合法
	if(!(document.all.tbYEAR.value == "" && document.all.tbCLS.value == "" && document.all.tbCASE.value == ""	&& document.all.tbVOL.value == "" && document.all.tbSEQ.value == ""))
	{
		if(!CheckFileNo("tbYEAR","tbCLS","tbCASE","tbVOL","tbSEQ"))
		{
			FocusAtEmpty("tbYEAR","tbCLS","tbCASE","tbVOL","tbSEQ");
			return false;
		}
	}
	//檢查迄止檔號是否合法
	if(!(document.all.txEYear.value == "" && document.all.txECLS.value == "" && document.all.txECase.value == ""	&& document.all.txEVol.value == "" && document.all.txESeq.value == ""))
	{
		if(!CheckFileNo("txEYear","txECLS","txECase","txEVol","txESeq"))
		{
			FocusAtEmpty("txEYear","txECLS","txECase","txEVol","txESeq");
			return false;
		}
	}
	return true;
}

function FocusAtEmpty()
{
	for(var argNum = 0 ;argNum<arguments.length;argNum++)
	{
		if(document.all[FocusAtEmpty.arguments[argNum]].value == "")
		{
		    //1060104  Justin [1050087] 二代公文修改
		    //document.all[FocusAtEmpty.arguments[argNum]].focus();
		    $('#' + FocusAtEmpty.arguments[argNum]).focus();
			break;			
		}
	}
}


//-------------------------------------------------------------
//案號
function OpenWindow2(argUrl)
{
	var gChidkWinStyle = "left=0,top=0,height="+(screen.height-50)+",width="+(screen.width-10)+",titlebar=yes,status=yes,resizeable=yes";//"fullscreen=yes";
	uChildWinHandle=open(argUrl,null,gChidkWinStyle);
	moveBy(screen.width,screen.height);
}

function WaitClose2()
{ 
	if (uChildWinHandle.closed) 
	{	
		clearInterval(uTimerID);
		if (document.all("SubWinRtn").length > 0 )
		{
			document.all("tbCLS").value=document.all("SubWinRtn").options[0].value;
			document.all("tbCASE").value=document.all("SubWinRtn").options[2].value;
			var oldlength = document.all("SubWinRtn").length;
			for(i=0;i<oldlength;i++)
			{
				document.all["SubWinRtn"].remove(0);
			}	
		}
		if(screenLeft>400)
			moveTo(0,0);
	}
} 

//------------------------------------------------------------
//分類號
function OpenWindow(argUrl)
{
	var gChidkWinStyle = "left=0,top=0,height="+(screen.height-50)+",width="+(screen.width-10)+",titlebar=yes,status=yes,resizeable=yes";//"fullscreen=yes";
	uChildWinHandle=open(argUrl,null,gChidkWinStyle);
}

function WaitClose()
{ 
	if (uChildWinHandle.closed) 
	{	
		clearInterval(uTimerID);
		if (document.all("SubWinRtn").length > 0 )
		{
			document.all("tbCLS").value=document.all("SubWinRtn").options[0].value;
			var oldlength = document.all("SubWinRtn").length;
			for(i=0;i<oldlength;i++)
			{
				document.all["SubWinRtn"].remove(0);
			}	
		}
		if(screenLeft>400)
			moveTo(0,0);
	}
} 

/**********************************************************************************************
  Name : function CheckFileNo(argYear,argCls,argCase,argVol,argSeq)
  Desc : 檢查檔號正確性(分類號有值，年度號不可空白....等等)
  Parm :	argYear     : string 年度號物件id
    	    argCls		: string 分類號物件id
    	    argCase		: string 案次號物件id
    	    argVol		: string 卷次號物件id
    	    argSeq		: string 目次號物件id
  Rtn  : bool
 **********************************************************************************************/	
function CheckFileNo(argYear,argCls,argCase,argVol,argSeq)
{
	var bRtnBool = false;
	var strYear="";
	var strCls="";
	var strCase="";
	var strVol="";
	var strSeq="";
	
	if (argYear != "")
		strYear = jf_Trim(document.all[argYear].value);
	if (argCls != "")
		strCls  = jf_Trim(document.all[argCls].value);
	if (argCase != "")
		strCase = jf_Trim(document.all[argCase].value);
	if (argVol != "")
		strVol  = jf_Trim(document.all[argVol].value);
	if (argSeq != "")
		strSeq  = jf_Trim(document.all[argSeq].value);

	if ( (strYear=="") && (strCls=="") && (strCase=="") && (strVol=="") && (strSeq=="") )
	{
		bRtnBool = true;
		return bRtnBool;
	}
	
	if (strSeq != "")
	{
	    if (strVol == "")
	        //1060104  Justin [1050087] 二代公文修改focus-S
	        //document.all[argVol].focus();
	        $('#' + argVol).focus();
		else if (strCase == "")
		    //document.all[argCase].focus();
		    $('#' + argCase).focus();
		else if (strCls == "")
		    //document.all[argCls].focus();
		    $('#' + argCls).focus();
		else if (strYear == "")
		    //document.all[argYear].focus();
		    $('#' + argYear).focus();
		else
			bRtnBool = true;
	}
	else if (strVol != "")
	{
		if (strCase == "")
		    //document.all[argCase].focus();
		    $('#' + argCase).focus();
		else if (strCls == "")
		    //document.all[argCls].focus();
		    $('#' + argCls).focus();
		else if (strYear == "")
		    //document.all[argYear].focus();
		    $('#' + argYear).focus();
		else
			bRtnBool = true;
	}
	else if (strCase != "")
	{
		if (strCls == "")
		    //document.all[argCls].focus();
		    $('#' + argCls).focus();
		else if (strYear == "")
		    //document.all[argYear].focus();
		    $('#' + argYear).focus();
		else
			bRtnBool = true;
	}
	else if (strCls != "")
	{
		if (strYear == "")
		    //document.all[argYear].focus();
		    $('#' + argYear).focus();
		    //1060104  Justin [1050087] 二代公文修改focus-E
		else
			bRtnBool = true;
	}
	else if (strYear != "")
		bRtnBool = true;
	
	if (!bRtnBool)
		jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["檔號"])),"");
		
	return bRtnBool;
}

/**********************************************************************************************
  Name : function CheckFileNoMatch(argYearS,argClsS,argCaseS,argVolS,argSeqS,argYearE,argClsE,argCaseE,argVolE,argSeqE)
  Desc : 檢查檔號一致性(當起訖值欄位均有輸入時，起值輸入欄位需與訖值輸入欄位一致)
  Parm :	argYearS    : string 年度號起值物件id
    	    argClsS		: string 分類號起值物件id
    	    argCaseS	: string 案次號起值物件id
    	    argVolS		: string 卷次號起值物件id
    	    argSeqS		: string 目次號起值物件id
        	argYearE    : string 年度號訖值物件id
    	    argClsE		: string 分類號訖值物件id
    	    argCaseE	: string 案次號訖值物件id
    	    argVolE		: string 卷次號訖值物件id
    	    argSeqE		: string 目次號訖值物件id
  Rtn  : bool
 **********************************************************************************************/	
function CheckFileNoMatch(argYearS,argClsS,argCaseS,argVolS,argSeqS,argYearE,argClsE,argCaseE,argVolE,argSeqE)
{
	var bRtnBool = true;
	var strYearS="";
	var strClsS="";
	var strCaseS="";
	var strVolS="";
	var strSeqS="";
	var strYearE="";
	var strClsE="";
	var strCaseE="";
	var strVolE="";
	var strSeqE="";

	if (argYearS != "")
		strYearS = jf_Trim(document.all[argYearS].value);
	if (argClsS != "")
		strClsS  = jf_Trim(document.all[argClsS].value);
	if (argCaseS != "")
		strCaseS = jf_Trim(document.all[argCaseS].value);
	if (argVolS != "")
		strVolS  = jf_Trim(document.all[argVolS].value);
	if (argSeqS != "")
		strSeqS  = jf_Trim(document.all[argSeqS].value);
	
	if (argYearE != "")
		strYearE = jf_Trim(document.all[argYearE].value);
	if (argClsE != "")
		strClsE  = jf_Trim(document.all[argClsE].value);
	if (argCaseE != "")
		strCaseE = jf_Trim(document.all[argCaseE].value);
	if (argVolE != "")
		strVolE  = jf_Trim(document.all[argVolE].value);
	if (argSeqE != "")
		strSeqE  = jf_Trim(document.all[argSeqE].value);

	if( (strYearS != "" || strClsS != "" || strCaseS != "" || strVolS != "" || strSeqS != "") 
	 && (strYearE != "" || strClsE != "" || strCaseE != "" || strVolE != "" || strSeqE != "") ) //起訖值均有欄位有輸入值
	{
		if(strYearS != "" && strYearE =="")
		{
		    bRtnBool = false;
		    //1060104  Justin [1050087] 二代公文修改focus-S
		    //document.all[argYearE].focus();
		    $('#' + argYearE).focus();
		}
		else if(strYearS == "" && strYearE !="")
		{
			bRtnBool = false;
			//document.all[argYearS].focus();
			$('#' + argYearS).focus();
		}
		else if(strClsS != "" && strClsE =="")
		{
			bRtnBool = false;
		    //document.all[argClsE].focus();
			$('#' + argClsE).focus();
		}
		else if(strClsS == "" && strClsE !="")
		{
			bRtnBool = false;
		    //document.all[argClsS].focus();
			$('#' + argClsS).focus();
		}
		else if(strCaseS != "" && strCaseE =="")
		{
			bRtnBool = false;
		    //document.all[argCaseE].focus();
			$('#' + argCaseE).focus();
		}
		else if(strCaseS == "" && strCaseE !="")
		{
			bRtnBool = false;
		    //document.all[argCaseS].focus();
			$('#' + argCaseS).focus();
		}
		else if(strVolS != "" && strVolE =="")
		{
			bRtnBool = false;
		    //document.all[argVolE].focus();
			$('#' + argVolE).focus();
		}
		else if(strVolS == "" && strVolE !="")
		{
			bRtnBool = false;
		    //document.all[argVolS].focus();
			$('#' + argVolS).focus();
		}
		else if(strSeqS != "" && strSeqE =="")
		{
			bRtnBool = false;
		    //document.all[argSeqE].focus();
			$('#' + argSeqE).focus();
		}
		else if(strSeqS == "" && strSeqE !="")
		{
			bRtnBool = false;
		    //document.all[argSeqE].focus();
			$('#' + argSeqE).focus();
		    //1060104  Justin [1050087] 二代公文修改focus-E
		}
	}
		
	if (!bRtnBool)
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["檔號一致性"])),"");
		
	return bRtnBool;
}













