/* DATE		SA		PRG		MGR_NO			DESC
 * 1031120  Cloud	Kevin_C 1030835			新增EAR209
 * 1050802  Cloud	Joe		1050837			修正欄位及報表格式
 * 1070323  Cloud   Justin  1050087         二代公文修改
 * 1090311  Cloud   Cloud	1081109         配合客委會客製化需求修改，調整不輸入上方版本別，改為由行列輸入且支援由輸入年度後自行轉換
 * 1100316	Cloud	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息
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
//1070323 Justin [1050087] 二代公文修改
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
//1070323 Justin [1050087] 二代公文修改
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
		/*
		case "":
			break;
		*/
	}
}
/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070323 Justin [1050087] 二代公文修改 
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
	
    //1070323 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			var tmp = document.all["H_Source"].value;
			//1090312 CLOUD	1081109 補回隱藏欄位
			var tmp2 = document.all["H_Source"].value;
			if (jf_ConfirmClean(false))
			{
				document.all["rblClsCaseName"][1].checked = true;
			}
			document.all["H_Source"].value = tmp;
			//1090312 CLOUD	1081109 補回隱藏欄位
			break;
		case "btPrint":
			Page_BlockSubmit=true;
			if(jf_CheckBlankAndAlert())
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
			}
		    //1070323 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit=true;
			if(jf_CheckBlankAndAlert())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
			}
		    //1070323 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	//1080311 Cloud 1081109-補上版本別檢核
	if (document.all["OrgNickName"].value != "HAC" && document.all["txVerNo"].value == "")
	{
		alert('版本別不可空白。'); return false;
	}

	var InValidControlName = "";
	var strTempControlName = "";
	var strErrMsg = "";
	var strTempMsg= "";
	var nColumnBlank = 0;
	//1050802 調整欄位左右對調
	//var strDesideLR = ["左","右"];
	var strDesideLR = ["右", "左"];
	var bLeastOneRow = false;
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		for(j=1; j<3; j++)
		{
			strTempMsg = "";
			nColumnBlank = 0;
			
			if(document.all["rblClsCaseName"][1].checked)
				if(j==1)
					continue;
			
			if(jf_Trim(document.all["dg1__ctl" + i + "_txVol"+j].value) == "")
			{
				strTempMsg = "序"+(i-1)+"，"+strDesideLR[j-1]+"，需輸入完整資訊\n";
				strTempControlName = "dg1__ctl" + i + "_txVol"+j;
				nColumnBlank++;
			}
			if(jf_Trim(document.all["dg1__ctl" + i + "_txCase"+j].value) == "")
			{
				strTempMsg = "序"+(i-1)+"，"+strDesideLR[j-1]+"，需輸入完整資訊\n";
				strTempControlName = "dg1__ctl" + i + "_txCase"+j;
				nColumnBlank++;
			}
			if(jf_Trim(document.all["dg1__ctl" + i + "_txClass"+j].value) == "")
			{
				strTempMsg = "序"+(i-1)+"，"+strDesideLR[j-1]+"，需輸入完整資訊\n";
				strTempControlName = "dg1__ctl" + i + "_txClass"+j;
				nColumnBlank++;
			}
			if(jf_Trim(document.all["dg1__ctl" + i + "_txYear"+j].value) == "")
			{
				strTempMsg = "序"+(i-1)+"，"+strDesideLR[j-1]+"，需輸入完整資訊\n";
				strTempControlName = "dg1__ctl" + i + "_txYear"+j;
				nColumnBlank++;
			}
			//1090311 Cloud	1081109 客委會客製化功能調整檢核機制-S
			if (document.all["OrgNickName"].value == "HAC")
			{
				if (jf_Trim(document.all["dg1__ctl" + i + "_txVerNo" + j].value) == "")
				{
					strTempMsg = "序" + (i - 1) + "，" + strDesideLR[j - 1] + "，需輸入完整資訊\n";
					strTempControlName = "dg1__ctl" + i + "_txVerNo" + j;
					nColumnBlank++;
				}
				if (nColumnBlank > 0 && nColumnBlank < 5)
				{
					InValidControlName = strTempControlName;
					strErrMsg += strTempMsg;
				}
			}//1090311 Cloud	1081109 客委會客製化功能調整檢核機制-E
			else
			{
				if (nColumnBlank > 0 && nColumnBlank < 4)
				{
					InValidControlName = strTempControlName;
					strErrMsg += strTempMsg;
				}
			}
			if(nColumnBlank==0)
			{
				bLeastOneRow = true;
			}
		}
	}
	if(bLeastOneRow==false)
	{
		if(strErrMsg=="")
			strErrMsg += "請至少輸入一筆資料";
	}
	if(strErrMsg!="")
	{
	    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	    //1070323 Justin [1050087] 二代公文修改
	    //document.all[InValidControlName].focus();
	    $('#' + InValidControlName).focus();
		return false;
	}
	return true;
}
/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
var O = document.all;
var bClassOk = true;//案號檢查正確
var bCaseOk = true;//卷號檢查正確
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var O = document.all;
var bClassOk = true;//案號檢查正確
var bCaseOk = true;//卷號檢查正確
//1090311  Cloud   Cloud	1081109    配合客委會客製化需求修改，調整不輸入上方版本別，改為由行列輸入且支援由輸入年度後自行轉換
//function jf_chkVerNo()
function jf_chkVerNo(nIndex)
{
	//1090311  Cloud   1081109   配合客委會客製化需求修改，調整不輸入上方版本別，改為由行列輸入且支援由輸入年度後自行轉換-DATAGRID版本處理-S
	if (nIndex != undefined && nIndex != "")
	{
	
		var srcE = event.srcElement;
		var actE = document.activeElement;
		if (actE != null)
			if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
		//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-自行處理-客委會不該跳過第一筆
		if (document.all["OrgNickName"].value != "HAC")
		{	
			if (document.all["rblClsCaseName"][1].checked)
				if (srcE.id.substring(srcE.id.length - 1) == "1")
					return;
		}
		var pNo = srcE.id.substring(8, srcE.id.indexOf("_txVerNo" + nIndex));
		if (document.all["dg1__ctl" + pNo + "_h_txVerNo" + nIndex].value != "" && document.all["dg1__ctl" + pNo + "_h_txVerNo" + nIndex].value != document.all[srcE.id].value)
		{
			if (window.confirm("變更版本後將清空該列卷號，是否繼續?"))
			{
				document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value = "";
				document.all["dg1__ctl" + pNo + "_txClass" + nIndex].value = "";
				document.all["dg1__ctl" + pNo + "_txCase" + nIndex].value = "";
				document.all["dg1__ctl" + pNo + "_txVol" + nIndex].value = "";
				document.all["dg1__ctl" + pNo + "_H_ClsKey" + nIndex].value = "";
				document.all["dg1__ctl" + pNo + "_h_txVerNo" + nIndex].value = document.all[srcE.id].value;
			}
			else
			{
				document.all[srcE.id].value = document.all["dg1__ctl" + pNo + "_h_txVerNo" + nIndex].value;
				return;
			}
		}
		else
			document.all["dg1__ctl" + pNo + "_h_txVerNo" + nIndex].value = document.all[srcE.id].value;
		if (jf_Trim(srcE.value) != "")
		{
			var arWSParam = new Array(3);
			arWSParam[0] = document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value;
			arWSParam[1] = document.all[srcE.id].value;
			arWSParam[2] = "VerNo";
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetVerYear", false, arWSParam);
			if (jf_IsWebServiceSuccess(callObj))
			{
				var dt = new Date();
				var strSysYear = dt.getFullYear() - 1911;
				var WSResult = callObj.value;
				if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
				{
					if (document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value == "" || document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
					{
						if (document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value != "")//不為空再跳提醒
							alert("該版本啟用中，系統將預設帶入系統年。");
						document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value = strSysYear;
					}
				}
				else//停用版本
				{
					//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
					if (document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value == "" || document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value < WSResult.strSdate || document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value > WSResult.strEdate)
					{
						if (document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value != "")//不為空再跳提醒
						{
							if (WSResult.strSdate != WSResult.strEdate)
								alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
							else
								alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
						}
						document.all["dg1__ctl" + pNo + "_txYear" + nIndex].value = WSResult.strEdate;
					}
				}
				if (document.all["dg1__ctl" + pNo + "_txClass" + nIndex].value!="")//版本別ONBLUR後如分類號有值 叫用分類號檢核
				{
					jf_IsExistClass(nIndex, pNo, document.all["dg1__ctl" + pNo + "_txClass" + nIndex].value);
				}
			}
			else
			{
				document.all["dg1__ctl" + pNo + "_h_txVerNo" + nIndex].value = document.all[srcE.id].value = "";
				$('#' + srcE.id).focus();
			}
		}
	}
	//1090311  Cloud   1081109   配合客委會客製化需求修改，調整不輸入上方版本別，改為由行列輸入且支援由輸入年度後自行轉換-DATAGRID版本處理-E
	else
	{
		if (document.all["txVerNo"].value == document.all["H_VerNo2"].value)
			return;
		if (window.confirm("變更版本後將清空所有卷號，是否繼續?"))
		{
			for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
			{
				document.all["dg1__ctl" + iRow + "_txYear1"].value = "";
				document.all["dg1__ctl" + iRow + "_txYear2"].value = "";
				document.all["dg1__ctl" + iRow + "_txClass1"].value = "";
				document.all["dg1__ctl" + iRow + "_txClass2"].value = "";
				document.all["dg1__ctl" + iRow + "_txCase1"].value = "";
				document.all["dg1__ctl" + iRow + "_txCase2"].value = "";
				document.all["dg1__ctl" + iRow + "_txVol1"].value = "";
				document.all["dg1__ctl" + iRow + "_txVol2"].value = "";
				document.all["dg1__ctl" + iRow + "_H_ClsKey1"].value = "";
				document.all["dg1__ctl" + iRow + "_H_ClsKey2"].value = "";
			}
			document.all["H_VerNo2"].value = document.all["txVerNo"].value;
		}
		else
		{
			document.all["txVerNo"].value = document.all["H_VerNo2"].value;
		}
	}
}
//1090311  Cloud   Cloud	1081109    配合客委會客製化需求修改，調整不輸入上方版本別，改為由行列輸入且支援由輸入年度後自行轉換
//function jf_chkYear()
function jf_chkYear(nIndex)
{
	var srcE = event.srcElement;
	var actE = document.activeElement;
	//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-自行處理-客委會不該跳過第一筆
	if (document.all["OrgNickName"].value != "HAC")
	{	
		if(document.all["rblClsCaseName"][1].checked)
			if(srcE.id.substring(srcE.id.length-1)=="1")
				return;
	}
	if (actE != null)
	if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
	jf_PADCHAR(srcE, 3, "0");
	//1090311  Cloud   1081109   配合客委會客製化需求修改，調整不輸入上方版本別，支援由輸入年度後自行轉換-DATAGRID版本處理-S
	if (document.all["OrgNickName"].value == "HAC")
	{
		var srcE = event.srcElement;
		var actE = document.activeElement;
		if (actE != null)
			if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
		var pNo = srcE.id.substring(8, srcE.id.indexOf("_txYear" + nIndex));
		if (jf_Trim(srcE.value) != "")
		{
			var arWSParam = new Array(3);
			arWSParam[0] = document.all[srcE.id].value;
			arWSParam[1] = document.all["dg1__ctl" + pNo + "_txVerNo" + nIndex].value;
			arWSParam[2] = "Year";
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetVerYear", false, arWSParam);
			//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-自行處理
			//if (jf_IsWebServiceSuccess(callObj))
			if(!callObj.error && callObj.value.m_bSuccess) 
			{
				document.all["dg1__ctl" + pNo + "_txVerNo" + nIndex].value = callObj.value.strVerNo;
				if (document.all["dg1__ctl" + pNo + "_txClass" + nIndex].value != "")//版本別ONBLUR後如分類號有值 叫用分類號檢核
				{
					jf_IsExistClass(nIndex, pNo, document.all["dg1__ctl" + pNo + "_txClass" + nIndex].value);
				}
			}
			else
			{
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-S
				var bAlert = true;
				if (callObj.value.m_strErrMsg.indexOf("輸入年度含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
				{
					if(document.all["dg1__ctl" + pNo + "_txVerNo" + nIndex].value!="")
					{
						var checkmsg = callObj.value.m_strErrMsg.split('版本')
						for(var i=0 ;i<checkmsg.length;i++)
						{
							if(checkmsg[i].indexOf("啟用區間為")!=-1)
							{
								if(checkmsg[i].split('啟用區間為')[0]==document.all["dg1__ctl" + pNo + "_txVerNo" + nIndex].value)
								{
									bAlert = false;
									break;
								}
							}
						}

					}
					if(bAlert)
					{
						document.all["dg1__ctl" + pNo + "_txVerNo" + nIndex].value = "";
						document.all["dg1__ctl" + pNo + "_txVerNo" + nIndex].focus();
						bClassOk = false;//版本別空白，則不檢核案次
						alert(callObj.value.m_strErrMsg);
					}
					//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-E
					
				}
				else
				{
					document.all[srcE.id].value = "";
					$('#' + srcE.id).focus();
					//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息
					alert(callObj.value.m_strErrMsg);
				}
			}
		}
	}
	//1090311  Cloud   1081109   配合客委會客製化需求修改，調整不輸入上方版本別，支援由輸入年度後自行轉換-DATAGRID版本處理-E
	if (bCaseOk && bClassOk)
		jf_IsExistCase();
	
}
//檢查分類是否有值; 分類是否正確; call jf_IsChkCase
//1090312 Cloud 1081109 修改支援年度/版本互轉
//function jf_IsExistClass(nIndex)
function jf_IsExistClass(nIndex, argpNo,argClsNo)
{
	var srcE = event.srcElement;
	var actE = document.activeElement;
	if(document.all["rblClsCaseName"][1].checked)
		if(srcE.id.substring(srcE.id.length-1)=="1")
			return;
	if (actE != null)
		if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
	//1090312 Cloud 1081109 修改支援年度/版本互轉
	var pNo = "";
	if (argpNo != undefined)
		pNo = argpNo;
		else
	pNo = srcE.id.substring(8, srcE.id.indexOf("_txClass"+nIndex));
	if(jf_Trim(srcE.value) != "" )
	{
		var arWSParam = new Array(4);
		arWSParam[0] = document.all["H_Source"].value;
		//1090311  Cloud   1081109   配合客委會客製化需求修改，調整不輸入上方版本別，支援由輸入年度後自行轉換-DATAGRID版本處理-客委會版本來源為DATAGRID
		if (document.all["OrgNickName"].value == "HAC")
			arWSParam[1] = document.all["dg1__ctl" + pNo + "_txVerNo" + nIndex].value;
		else
			arWSParam[1] = document.all["txVerNo"].value;
		if (argClsNo!=undefined)
			arWSParam[2] = argClsNo;
		else
			arWSParam[2] = document.all[srcE.id].value;
		arWSParam[3] = "";
		callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);
		if(jf_IsWebServiceSuccess(callObj))
		{
			document.all["dg1__ctl"+pNo+"_H_ClsKey"+nIndex].value= callObj.value.ClsKey;
			if (callObj.value.ClsKey == "")
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array("分類號不存在")), "");
				//1070323 Justin [1050087] 二代公文修改
				//document.all[srcE.id].focus();
				$('#' + srcE.id).focus();
			}
			//1090312 Cloud 1081109 檢核正確設定變數
			else
				bClassOk = true;
		}
		else
		{
		    //1070323 Justin [1050087] 二代公文修改
			//document.all[srcE.id].focus();
			//1080311 Cloud 1081109 有多版本時，focus至版本別
			if (callObj.value.m_strErrMsg.indexOf("請輸入正確版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
			{
				document.all["dg1__ctl" + pNo + "_txVerNo" + nIndex].value = "";
				document.all["dg1__ctl" + pNo + "_txVerNo" + nIndex].focus();
			}
			else
				$('#' + srcE.id).focus();
		}
	}
}
//檢查案號是否正確; call jf_IsExistDoc
function jf_IsExistCase()
{
	var strSource	= document.all["H_Source"].value;
	var srcE = event.srcElement;
	var actE = document.activeElement;
	if(document.all["rblClsCaseName"][1].checked)
		if(srcE.id.substring(srcE.id.length-1)=="1")
			return;
	if (actE != null)
	if ( (actE.id == "btExit") || (actE.id == "btCancel")) return;
	var dgID = "";
	var ndgID = 0;
	var i = 1;
	for (i=1;i<=3;i++)
	{
		var strdgClass = "txClass"+i;
		var strdgCase = "txCase"+i;
		var strdgYear = "txYear"+i;
		var strdgVol = "txVol"+i;
		if (srcE.id.indexOf(strdgClass) != -1)
			{ndgID = srcE.id.indexOf(strdgClass); break;}
		else if (srcE.id.indexOf(strdgCase) != -1)
			{ndgID = srcE.id.indexOf(strdgCase); break;}
		else if (srcE.id.indexOf(strdgYear) != -1)
			{ndgID = srcE.id.indexOf(strdgYear); break;}
		else if (srcE.id.indexOf(strdgVol) != -1)
			{ndgID = srcE.id.indexOf(strdgVol); break;}
	}
	dgID=srcE.id.substring(0,ndgID);
	if(document.all[dgID+"txClass"+i].value !="" && document.all[dgID+"txCase"+i].value !="")
	{
		var arWSParam = new Array(4);
		arWSParam[0] = strSource;
		arWSParam[1] = document.all[dgID+"txYear"+i].value;
		arWSParam[2] = document.all[dgID+"H_ClsKey"+i].value;
		arWSParam[3] = document.all[dgID+"txCase"+i].value;
		var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, arWSParam);
		wsGetClsCaseID = callObj.id;
		OnWSResult(callObj);
		if(jf_IsWebServiceSuccess(callObj))
		{
			
		}
		else
		{
			if(document.all[srcE.id].value !="")
			{
			    document.all[srcE.id].value = "";
			    //1070323 Justin [1050087] 二代公文修改
			    //document.all[srcE.id].focus();
			    $('#' + srcE.id).focus();
			}
		}
	}
}
//檢查卷號是否有值 是否為4碼 ==>否 補0 ;call jf_IsExistDoc	
//		
function jf_chkVol()
{
	var srcE = event.srcElement;
	var actE = document.activeElement;
	if(document.all["rblClsCaseName"][1].checked)
		if(srcE.id.substring(srcE.id.length-1)=="1")
			return;
	if (actE != null)
	if ( (actE.id == "btExit") || (actE.id == "btCancel")) return;
	if(jf_Trim(srcE.value) != "" && (jf_Trim(srcE.value)).length < 4 )
	jf_PADCHAR(srcE,4,"0")
}