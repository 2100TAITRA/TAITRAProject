/*
DATE	SA	    PRG	    MGR_NO	DESC
0960123	Stella	Charles	000139	台科大新增EDT134，程式誕生
1051019 David   Zen     1050087 二代公文修改
1100201	Leslie	Joe		1090927	取消使用document.activeElement
1110103	Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var iCallID_GetDefaultSubject;
var iDeleteCnt = 0;
var iCancelCnt = 0;
var iTotalCanCancel = 0;

//1051019 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1051019 Zen 1050087 二代公文修改
//document.attachEvent("onkeydown", jf_GetOrgInfoByF2);

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051019 Zen 1050087 二代公文修改
    //jf_CallWS("../EDLIB/EDWS.asmx", "GetOrgInfo", false, null);
	checkDocNo();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019 Zen 1050087 二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_btOpenElec"));
	var btElec;
	if (document.all["dg1__ctl"+pNo+"_btOpenElec"] != null)
		btElec = document.all["dg1__ctl" + pNo + "_btOpenElec"].id;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btSDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
			break;
		case "btEDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
			break;
		case "btHelp":	
			var WebServerName = jf_Trim(document.all.H_WebServer.value);
			var ODVirName = jf_Trim(document.all.OD_VIR_NAME.value);
			var strUrl = "";
			strUrl = "http://"+WebServerName+"/"+ODVirName+"/WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+escape(CurrOrgIdObj.value);
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			Page_BlockSubmit=true;
			break;
		case btElec:
		    var Sysid = document.all["dg1__ctl" + pNo + "_H_ID"].value;
		    //1051019 Zen 1050087 修改開啟位置--begin
			//var At21ServerName = document.all["H_Name"].value;
			//var AtWeb = document.all["atweb"].value;
			//var strUrl = "";
			//strUrl = "http://"+At21ServerName+"/"+AtWeb+"/ATI011.aspx?kv1="+Sysid+"&kv2=OD"+"&SAMLart="+document.all.SsoArtifact.value;
		    //jf_OpenChildWin(strUrl, "ATI011", 760, 520 );
		    if (document.all.ED_PATH && document.all.ED_PATH.value != "")
		    {
		        var strUrl = document.all.ED_PATH.value + "/ED0/EDI011.aspx?SAMLart=" + jf_GetArtifact() + "&kv1=" + Sysid + "&kv2=od";
		        jf_OpenChildWin(strUrl, "EDI011", 800, 600);
		    }
		    else
		        alert("環境變數WS_ED_SITE設定不正確，無法開啟");
		    //1051019 Zen 1050087 修改開啟位置--end
			Page_BlockSubmit = true;
			break;
		case "btSubjectCode":
			var strUrl = "";
			var WebServerName = jf_Trim(document.all.H_WebServer.value);
			var ODVirName = jf_Trim(document.all.OD_VIR_NAME.value);
			strUrl = "http://"+WebServerName+"/"+ODVirName+"/ODT130C1.aspx";
			jf_OpenChildWin(strUrl, "ODT130C1", 700, 500 );
			Page_BlockSubmit=true;
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051019 Zen 1050087 二代公文修改
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
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1051019 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
			//window.external.AutoCompleteSaveForm(EDT134);
		    //1051019 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			if(jf_ConfirmClean(true))
			{
				while(document.all.dg1.rows.length > 0)
					document.all.dg1.deleteRow(0);
			    //1051019 Zen 1050087 二代公文修改
				//document.all["txSDocNo"].focus();
				$('#txSDocNo').focus();
			}
			break;
		case "btDelete":
			Page_BlockSubmit = true;
			
			//判斷是否有選取
			var nSelected=0;
			var pDg1Len = document.all.dg1.rows.length;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			var strCbDelete = "";
			
			for(var i=2;i<pDg1Len+1;i++)
			{
				strCbDelete = "dg1__ctl"+i+"_cbDelete";
				if(!document.all[strCbDelete].checked) continue;
				nSelected++;
			}
						
			if(nSelected==0)
			{
				alert("請先選取要刪除的公文");
				return;
			}
			
			if(confirm("確定要刪除所選的這 "+nSelected+" 筆公文?"))
			{
				Page_BlockSubmit = false;
			    //1051019 Zen 1050087 二代公文修改
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btCancel":
			Page_BlockSubmit = true;
			
			//判斷是否有選取
			var nSelected=0;
			var pDg1Len = document.all.dg1.rows.length;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			var strCbCancel = "";
			
			for(var i=2;i<pDg1Len+1;i++)
			{
				strCbCancel = "dg1__ctl"+i+"_cbCancel";
				if(!document.all[strCbCancel].checked) continue;
				nSelected++;
			}
						
			if(nSelected==0)
			{
				alert("請先選取要銷號的公文");
				return;
			}
			
			if(confirm("確定要對所選的這 "+nSelected+" 筆公文進行銷號?"))
			{
				Page_BlockSubmit = false;
			    //1051019 Zen 1050087 二代公文修改
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
	}
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
    if (argResult.id == iCallID_GetDefaultSubject)
    {
		if(argResult.value.RtnStr != "")
		{
			document.all.txSubject.value = argResult.value.RtnStr;
			return true;
		}
		return false;
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
	if(argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
		var DeptArray = DeptInfo.split(',');
		document.all.txFromOrgNo.value = DeptArray[1];
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argSysID,argRcvDate,argRcvTime,argFromDate,argFromOrg,argRcvOrgno,argRcvOrg,argFromWord,argFromNo,argSubject,argSecNo,argSpeed,argDocCategory,argDocType,argFolderDir,argRcvStatus,argFromOrgno,argDocNo,argSourceType,argInnerNo)
{
	try
	{
	    var pFromOrg=argFromOrg;
		var pFromOrgNo=argFromOrgno;
		if(pFromOrgNo=="")
		{
			pFromOrgNo = pFromOrg;
			pFromOrg = "";
		}
			
		opener.document.all.lbReturnValue.length = 20;
		opener.document.all.lbReturnValue.options[0].text = argSysID;
		opener.document.all.lbReturnValue.options[1].text = argRcvDate;
		opener.document.all.lbReturnValue.options[2].text = argRcvTime;
		opener.document.all.lbReturnValue.options[3].text = argFromDate;
		opener.document.all.lbReturnValue.options[4].text = pFromOrg;  
		opener.document.all.lbReturnValue.options[5].text = argRcvOrgno;
		opener.document.all.lbReturnValue.options[6].text = argRcvOrg;
		opener.document.all.lbReturnValue.options[7].text = argFromWord;
		opener.document.all.lbReturnValue.options[8].text = argFromNo;
		opener.document.all.lbReturnValue.options[9].text = argSubject;
		opener.document.all.lbReturnValue.options[10].text = argSecNo;
		opener.document.all.lbReturnValue.options[11].text = argSpeed;
		opener.document.all.lbReturnValue.options[12].text = argDocCategory;
		opener.document.all.lbReturnValue.options[13].text = argDocType;
		opener.document.all.lbReturnValue.options[14].text = argFolderDir;
		opener.document.all.lbReturnValue.options[15].text = argRcvStatus;
		opener.document.all.lbReturnValue.options[16].text = pFromOrgNo;  
		opener.document.all.lbReturnValue.options[17].text = argDocNo;
		opener.document.all.lbReturnValue.options[18].text = argSourceType;
		opener.document.all.lbReturnValue.options[19].text = argInnerNo; 
		opener.window.CallBack("EDT134");
		
		if(jf_Trim(document.all.H_txIsClose.value) == "N")
			opener.window.focus();
		else
			close();
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//收文日期檢核
function txDate_onblur()
{
	var strSDate = document.all.txSDate.value;
	var strEDate = document.all.txEDate.value;
	if(strSDate != "")
	{
		if(!jf_CheckCDATE(strSDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文日期(起) 格式不正確"])),"");
		    //1051019 Zen 1050087 二代公文修改
			//document.all.txSDate.focus();
			$('#txSDate').focus();
		}
	}
	if(strEDate != "")
	{
		if(!jf_CheckCDATE(strEDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文日期(迄) 格式不正確"])),"");
		    //1051019 Zen 1050087 二代公文修改
			//document.all.txEDate.focus();
			$('#txEDate').focus();
        }
	}
}

//收文時間檢核
function txTime_onblur()
{
	var strSTime = document.all.txSTime.value;
	var strETime = document.all.txETime.value;
	if(strSTime != "")
	{
		if(!jf_CheckTime(strSTime))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文時間(起) 格式不正確"])),"");
		    //1051019 Zen 1050087 二代公文修改
			//document.all.txSTime.focus();
			$('#txSTime').focus();
        }
	}
	if(strETime != "")
	{
		if(!jf_CheckTime(strETime))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文時間(迄) 格式不正確"])),"");
		    //1051019 Zen 1050087 二代公文修改
			//document.all.txETime.focus();
			$('#txETime').focus();
        }
	}
}

//檢核時間格式
function jf_CheckTime(argStr) 
{
	if (argStr.length < 4)
		argStr = jf_PADL(argStr,4,'0');
	var pHour,pMinute;
	pHour=parseInt(argStr.substring(0,2),10);
	pMinute=parseInt(argStr.substring(2,2),10);

	if (pHour > 24 || pMinute > 60) 
		return false;
	else
		return true;
}

//來文機關檢核
function txFromOrgNo_onblur()
{
	if(jf_Trim(document.all.txFromOrgNo.value) != "")
		GetOrgInfo(document.all.txFromOrgNo);
}

//於來文機關輸入欄位按下【F2】時之處理
//1100201	Joe		1090927		取消使用document.activeElement
// function jf_GetOrgInfoByF2()
function jf_GetOrgInfoByF2(event)
{
	//1100201	Joe		1090927		取消使用document.activeElement
	// if(event.keyCode == 113 && document.activeElement.id == "txFromOrgNo")
	if(event.keyCode == 113 && event.target.id == "txFromOrgNo")
		txFromOrgNo_onblur();
}

//主旨代碼檢核
function txSubjectNo_onblur()
{
	document.all.txSubjectNo.value =jf_Trim(document.all.txSubjectNo.value);
	if(document.all.txSubjectNo.value != "" && document.all.txSubject.value =="")
	{
		//取得常用主旨，並代入主旨欄位
		var param = new Array(1);
		param[0] = document.all.txFromOrgNo.value;
		param[1] = document.all.txSubjectNo.value;

		callObj = jf_CallWS("../EDLIB/EDWS.asmx","GetDefaultSubject" ,false, param);
		iCallID_GetDefaultSubject = callObj.id;
		if(!OnWSResult( callObj ))
		{
			alert("無此主旨代碼");
		    //1051019 Zen 1050087 二代公文修改
			//document.all.txSubjectNo.focus();
			$('#txSubjectNo').focus();
		}	
	}
}

//檢查dg1中有文號的話，銷號cb才能啟用
function checkDocNo()
{
	for(var i = 2; i < document.all.dg1.rows.length+1; i++)
	{
	    //1051019 Zen 1050087 二代公文修改
		//if(jf_Trim(document.all["dg1__ctl"+i+"_hlDocNo"].innerText) == "")
	    if (jf_Trim(document.all["dg1__ctl" + i + "_hlDocNo"].textContent) == "")
	        document.all["dg1__ctl" + i + "_cbCancel"].disabled = true;
		else
			iTotalCanCancel++;
	}
}

//標題列的刪除cb點選時之處理
function cbTDelete_onclick(argObj)
{
	if(argObj.checked)
	{
		iDeleteCnt = document.all.dg1.rows.length-1;
		iCancelCnt = 0;
		SetAllcb("_cbTDelete","_cbDelete",true);
		SetAllcb("_cbTCancel","_cbCancel",false);
	}
	else
	{
		iDeleteCnt = 0;
		SetAllcb("_cbTDelete","_cbDelete",false);
	}
}

//標題列的銷號cb點選時之處理
function cbTCancel_onclick(argObj)
{
	if(argObj.checked)
	{
		iCancelCnt = iTotalCanCancel;
		iDeleteCnt = 0;
		SetAllcb("_cbTCancel","_cbCancel",true);
		SetAllcb("_cbTDelete","_cbDelete",false);
	}
	else
	{
		iCancelCnt = 0;
		SetAllcb("_cbTCancel","_cbCancel",false);
	}
}

//刪除cb點選時之處理
function cbDelete_onclick(argObj)
{
	if(argObj.checked)
	{
		iDeleteCnt++;
		iCancelCnt = 0;
		SetAllcb("_cbTCancel","_cbCancel",false);
	}
	else
		iDeleteCnt--;
	
	if(iDeleteCnt == document.all.dg1.rows.length-1)
		document.all.dg1__ctl1_cbTDelete.checked = true;
	else
		document.all.dg1__ctl1_cbTDelete.checked = false;
	
	var strTemp = argObj.id.substr(0,argObj.id.lastIndexOf("_"));
	document.all[strTemp+"_ddlUnit"].disabled = argObj.checked;
}

//銷號cb點選時之處理
function cbCancel_onclick(argObj)
{
	if(argObj.checked)
	{
		iCancelCnt++;
		iDeleteCnt = 0;
		SetAllcb("_cbTDelete","_cbDelete",false);
	}
	else
		iCancelCnt--;
	
	if(iCancelCnt == iTotalCanCancel)
		document.all.dg1__ctl1_cbTCancel.checked = true;
	else
		document.all.dg1__ctl1_cbTCancel.checked = false;
	
	var strTemp = argObj.id.substr(0,argObj.id.lastIndexOf("_"));
	document.all[strTemp+"_ddlUnit"].disabled = !argObj.checked;
}

//標題cb點選時全選或全不選
function SetAllcb(argHeadcb,argBodycb,argChecked)
{
	document.all["dg1__ctl1"+argHeadcb].checked = argChecked;
	for(var i = 2; i < document.all.dg1.rows.length+1; i++)
	{
		if(!document.all["dg1__ctl"+i+argBodycb].disabled)
			document.all["dg1__ctl"+i+argBodycb].checked = argChecked;
		
		if(argBodycb == "_cbCancel")
			document.all["dg1__ctl"+i+"_ddlUnit"].disabled = !argChecked;
	}
}

//查詢前檢查
function CheckBeforeSearch()
{
	var bRtn = true;
	if (document.all["txSDate"].value == "" && document.all["txEDate"].value == "")
	{
		bRtn = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文日期起訖欄位不可皆為空白"])),"");
	    //1051019 Zen 1050087 二代公文修改
		//document.all["txSDate"].focus();
		$('#txSDate').focus();
	}
	else
	{
		Adjust();
	}
	return bRtn;
}

//有起訖值的欄位進行調整
function Adjust()
{
	//公文文號
	var strSDocNo = jf_Trim(document.all.txSDocNo.value);
	var strEDocNo = jf_Trim(document.all.txEDocNo.value);
	if(strSDocNo != "" && strEDocNo == "")
		document.all.txEDocNo.value = strSDocNo;
	else if(strSDocNo == "" && strEDocNo != "")
		document.all.txSDocNo.value = strEDocNo;
	else if(strSDocNo > strEDocNo)
	{
		document.all.txSDocNo.value = strEDocNo;
		document.all.txEDocNo.value = strSDocNo;
	}
	
	//收文日期+收文時間
	var strSDate = document.all.txSDate.value;
	var strEDate = document.all.txEDate.value;
	var strSTime = document.all.txSTime.value;
	var strETime = document.all.txETime.value;
	//收文日期起訖任一為空值，則設定為相同
	if(strSDate != "" && strEDate == "")
	{
		strEDate = strSDate;
		document.all.txEDate.value = strSDate;
	}
	else if(strSDate == "" && strEDate != "")
	{
		strSDate = strEDate;
		document.all.txSDate.value = strEDate;
	}
	//收文時間起訖空值之處理
	if(strSTime == "")
	{
		strSTime = "0000";
		document.all.txSTime.value = "0000";
	}
	if(strETime == "")
	{
		strETime = "2359";
		document.all.txETime.value = "2359";
	}
	//收文日期起大於迄，則交換收文日期及時間
	if(strSDate > strEDate)
	{
		document.all.txSDate.value = strEDate;
		document.all.txEDate.value = strSDate;
		document.all.txSTime.value = strETime;
		document.all.txETime.value = strSTime;
	}	//收文日期起訖相等但收文時間起大於迄，則交換收文時間
	else if(strSDate == strEDate && strSTime > strETime)
	{
		document.all.txSTime.value = strETime;
		document.all.txETime.value = strSTime;
	}
	
	//來文號
	var strSFromNo = jf_Trim(document.all.txSFromNo.value);
	var strEFromNo = jf_Trim(document.all.txEFromNo.value);
	if(strSFromNo != "" && strEFromNo == "")
		document.all.txEFromNo.value = strSFromNo;
	else if(strSFromNo == "" && strEFromNo != "")
		document.all.txSFromNo.value = strEFromNo;
	else if(strSFromNo > strEFromNo)
	{
		document.all.txSFromNo.value = strEFromNo;
		document.all.txEFromNo.value = strSFromNo;
	}
}

//取得機關資訊
function GetOrgInfo(argTxObj)
{
	if(argTxObj.value == "")
		return;
	
	var wsParam = new Array();
	wsParam[0] = argTxObj.value;
	wsParam[1] = document.all.h_OrgNo.value;
	wsParam[2] = document.all.h_DeptNo.value;
	wsParam[3] = document.all.h_UserId.value;
	var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx","GetOrgInfo",false,wsParam);
	
	//檢查執行是否成功
	if(jf_IsWebServiceSuccess(CallWsObj))
	{		
		if(CallWsObj.value.Count == 1)
		{
			argTxObj.value = jf_Trim(CallWsObj.value.OrgName[0]);
		}
		else if(CallWsObj.value.Count > 1)
		{
			var WebServerName = jf_Trim(document.all.H_WebServer.value);
			var ODVirName = jf_Trim(document.all.OD_VIR_NAME.value);
			var strUrl = "";
			strUrl = "http://"+WebServerName+"/"+ODVirName+"/WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+escape(argTxObj.value);
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
		}
	}
}