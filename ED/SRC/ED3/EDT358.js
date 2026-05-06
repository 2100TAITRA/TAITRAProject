/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 1000520		Yvonne	1000426		增加人工傳遞選項及相關檢核
 * 1031112	    Kevin_C 1020726	    於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 1051019      Kenny   1050087     二代公文修改
 * 1060518      Zen     1060215     innerText相關修改 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*
DATE	SA		PRG		MGR_NO		DESC
1110307	David	David	1110129		以內政部5.1.0.43版本EDT358為底，作為共通版程式使用，上述歷程為歷史修改
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

//1050714 Zen 1050087 二代公文修改
//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050714 Zen 1050087 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
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
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btHelp"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		//CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
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
		case btHelp:
				fnQueryOrgNo(pNo);
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050714 Zen 1050087 二代公文修改
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
	
    //1050714 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050714 Zen 1050087 二代公文修改
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
		    //1050714 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050714 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1050714 Zen 1050087 二代公文修改
			//document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();
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
	
	if (document.all["txIssueDate"].value == "")
	{
		strErrMsg += "發文日期不可空白\n";
	    //1050714 Zen 1050087 二代公文修改
		//document.all["txIssueDate"].focus();
		$('#txIssueDate').focus();
	}
	
	if (document.all["txIssueWord"].value == "")
	{
		strErrMsg += "發文字不可空白\n";
	    //1050714 Zen 1050087 二代公文修改
		//document.all["txIssueWord"].focus();
		$('#txIssueWord').focus();
    }
	
	if (document.all["txIssueNo"].value == "")
	{
		strErrMsg += "發文號不可空白\n";
	    //1050714 Zen 1050087 二代公文修改
		//document.all["txIssueNo"].focus();
		$('#txIssueNo').focus();
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
	var Cnt;
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//受文者不為空白時
		if(document.all["dg1__ctl" + i + "_txOrgName"].value != "")
		{
			//本別不可空白
			if(document.all["dg1__ctl" + i + "_ddlDocType"].value == "")
			{
				InValidName += ",本別欄位不可為空白";			
				InValidControlName = "dg1__ctl" + i + "_ddlDocType";
			}
			
			//1000520	Yvonne	沒勾選的時候才檢核--start--
			if (document.all["dg1__ctl"+i+"_dgCbUserSend"].checked == false)
			{
				//郵寄方式不可空白
				if(document.all["dg1__ctl" + i + "_dgDllSendType"].value == "")
				{
					InValidName += ",郵寄方式欄位不可為空白(或請選為人工傳遞)";			
					InValidControlName = "dg1__ctl" + i + "_dgDllSendType";
				}
				//住址不可空白
				if(document.all["dg1__ctl" + i + "_txAddress"].value == "")
				{
					InValidName += ",住址欄位不可為空白";				
					InValidControlName = "dg1__ctl" + i + "_txAddress";
				}
				//郵遞區號不可空白
				if(document.all["dg1__ctl" + i + "_txPostCode"].value == "")
				{
					InValidName += ",郵遞區號欄位不可為空白";
					InValidControlName = "dg1__ctl" + i + "_txPostCode";
				}
			}
			//--end--
			//ddlDocType
			//txPostCode
			//txAddress
			//dgDllSendType
		
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
			    //1060518 Zen 1060215 innerText相關修正				//jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
			    //1050714 Zen 1050087 二代公文修改
				//document.all[InValidControlName].focus();
				$('#' + InValidControlName).focus();
				return false;
			}
		}
		//受文者代碼不為空白時
		if(document.all["dg1__ctl" + i + "_txOrgNo"].value != "")
		{
			//_txOrgName不可空白
			if(document.all["dg1__ctl" + i + "_txOrgName"].value == "")
			{
				InValidName += "受文者名稱不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txOrgName";
			}
			
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
			    //1060518 Zen 1060215 innerText相關修正				//jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
			    //1050714 Zen 1050087 二代公文修改
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
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
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
	//來文機關查詢子視窗
	if(argCallerId == "WEM010C1")
	{
	    var DeptInfo = document.all["lbReturnValue"].options[0].value;
	    //1050714 Zen 1050087 二代公文修改
	    //var DeptArray = DeptInfo.split(',');
	    var DeptArray = DeptInfo.split('^');
		if(DeptArray.length > 0)  
		{   
			document.all[uOrgNo_ID].value = jf_Trim(DeptArray[1]);
			document.all[uOrgName_ID].value = jf_Trim(DeptArray[2]); 
			SetOrgInfo(jf_Trim(DeptArray[1]),uRowNum); 
		}
		uOrgNo_ID = null;
		uOrgName_ID = null;
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
function txOrgNo_onblur()
{
	var RowNum=getRowIndex();
	var txOrgNo = document.all["dg1__ctl" + RowNum + "_txOrgNo"].value;

	if (txOrgNo)
		SetOrgInfo(txOrgNo, RowNum);
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex()
{
	var xObjectName = event.srcElement.id;
	return xObjectName.substring(8,xObjectName.indexOf("_",8));   
}

var wsGetOrgInfoID;
function SetOrgInfo(argOrg,argRowNum)
{
	var len = document.all["dg1"].rows.length;
	var wsParam = new Array();
	wsParam[0] = argOrg;
	wsParam[1] = document.all.H_OrgNo.value;
	wsParam[2] = document.all.H_DeptNo.value;
	wsParam[3] = document.all.H_UserId.value;
	var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx","GetOrgInfo",false,wsParam);
	
	//檢查執行是否成功
	if(jf_IsWebServiceSuccess(CallWsObj))
	{		
		if(!CallWsObj.value.error)
		{
			if(CallWsObj.value.Count > 0)
			{
				rowflag=0;  
				
                if(CallWsObj.value.Count > 1)   
                {                                                       
					strOrgName = jf_Trim(document.all["dg1__ctl" + argRowNum + "_txOrgName"].value);
				                                                            
					for(CWIndex = 0;CWIndex < CallWsObj.value.Count; CWIndex++)        
					{
							if( jf_Trim(CallWsObj.value.OrgName[CWIndex]) == strOrgName)
							{
								rowflag = CWIndex;
								break;
							}
					}
			    }
				document.all["dg1__ctl" + argRowNum + "_txOrgNo"].value = jf_Trim(CallWsObj.value.OrgID[rowflag]);
				document.all["dg1__ctl" + argRowNum + "_txOrgName"].value = jf_Trim(CallWsObj.value.OrgName[rowflag]);
				document.all["dg1__ctl" + argRowNum + "_txPostCode"].value = jf_Trim(CallWsObj.value.PostNo[rowflag]);
				document.all["dg1__ctl" + argRowNum + "_txAddress"].value = jf_Trim(CallWsObj.value.Address[rowflag]);
			}
			else
			{
				//alert("查無資料。");
			}		
		}
		else
		{
			alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
		}
	}
	if(argRowNum==len)
	{
		btInsertClick1();
	}
}

function txOrgName_onblur()
{
	var len = document.all["dg1"].rows.length;
	var RowNum=getRowIndex();
	var txOrgName = document.all["dg1__ctl" + RowNum + "_txOrgName"].value;
	if (txOrgName)
	{
		SetOrgInfo(txOrgName, RowNum);
	}
}

function btInsertClick1()
{
    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
    IsServerHandling = true;
	__doPostBack("btAdd",0);	
}

function fnQueryOrgNo(RowNum)
{
	var strOrgNo_ID = "dg1__ctl" + RowNum + "_txOrgNo";
	var strOrgName_ID = "dg1__ctl" + RowNum + "_txOrgName";

	Page_BlockSubmit = true;
	if (!document.all[strOrgNo_ID])
  		return;
  	uOrgNo_ID = strOrgNo_ID;
  	uOrgName_ID = strOrgName_ID;
    uRowNum = RowNum;

    //1050714 Zen 1050087 二代公文修改
    //var strUrl = "../../../ODDEP/WEM010C1.aspx?OrgID=" + document.all.H_OrgNo.value + "&amp;K1=WEM010&amp;Search=" + document.all[strOrgNo_ID].value;
    var path = document.all.H_Wed010C1Path.value;
    var strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.H_OrgNo.value + "&K1=WEM010";
    //1050714 Zen 1050087 二代公文修改
    jf_OpenChildWin(strUrl, "EDT354", 700, 500);
}
//1000520	Yvonne	增加人工傳遞選項及相關檢核--start--
function dgCbUserSend_onclick()
{
	var len = document.all["dg1"].rows.length;
	var RowNum=getRowIndex();
	if (document.all["dg1__ctl"+ RowNum +"_dgCbUserSend"].checked)
	{
		//有勾，郵寄方式、郵資機、彙整為disable
		document.all["dg1__ctl"+ RowNum +"_dgDllSendType"].selectedIndex = 0;
		
		SetControlDisable("dg1__ctl"+ RowNum +"_cbSelect");
		SetControlDisable("dg1__ctl"+ RowNum +"_dgCbIsCombine");
		SetControlDisable("dg1__ctl"+ RowNum +"_dgDllSendType");
		document.all["dg1__ctl"+ RowNum +"_cbSelect"].checked = false;
		document.all["dg1__ctl"+ RowNum +"_dgCbIsCombine"].checked = false;
	}
	else
	{
		//沒勾，郵寄方式、郵資機、彙整為enable
		SetControlEnable("dg1__ctl"+ RowNum +"_cbSelect");
		SetControlEnable("dg1__ctl"+ RowNum +"_dgCbIsCombine");
		SetControlEnable("dg1__ctl"+ RowNum +"_dgDllSendType");
		//1000520	[1000426]	Yvonne	針對核選方塊特別處理
		document.all["dg1__ctl"+ RowNum +"_cbSelect"].parentElement.disabled = false;
		document.all["dg1__ctl"+ RowNum +"_dgCbIsCombine"].parentElement.disabled = false;		
	}
}

//設定控制項為Disable
function SetControlDisable(argControlName)
{	
	if(document.all[argControlName].type == "text")
	{
		document.all[argControlName].style.backgroundColor = "LightGrey";
		document.all[argControlName].readOnly  = true;
	}
	else
	{
		document.all[argControlName].disabled  = true;
	}
}

//設定控制項為Enable
function SetControlEnable(argControlName)
{
	if(document.all[argControlName].type == "text")
	{
		document.all[argControlName].style.backgroundColor = "";
		document.all[argControlName].readOnly  = false;
	}
	else
	{
		document.all[argControlName].disabled  = false;
	}
}
//--end--