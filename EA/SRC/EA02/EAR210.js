/*
DATE	SA	    PRG	    MGR_NO	DESC
1041001 Cloud   Kevin_C 1040750 檢核同一列的最上層分類號是否相同
1041026	Cloud	Kevin_C	1040750	修正基港消檢核錯誤
1070125 Cloud   Justin  1050087 二代公文修改
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
//1070125 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

var EAC005 = "";

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	rbPrintTypeChange();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1070125 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
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
		case "ibtCLS":
			var pUrl = "";
			EAC005 = "CLS";
			pUrl = "../EA01/EAC005.aspx?FILE_CLS=" + document.all["txClass"].value + "&FILE_YEAR=" + document.all["txYear"].value + "&MODE=1&nFrom=AKM330&VER_NO=" + document.all["txVerNo"].value + "&SAMLart=" + GetParam("SAMLart");
			jf_OpenChildWin(pUrl, "EAC005", 750, 500);
			Page_BlockSubmit = true;
			break;
		case "ibtCASE":
			var pUrl = "";
			EAC005 = "CASE";
			pUrl = "../EA01/EAC005.aspx?FILE_CLS=" + document.all["txClass"].value + "&FILE_YEAR=" + document.all["txYear"].value + "&MODE=2&nFrom=AKM330&VER_NO=" + document.all["txVerNo"].value + "&SAMLart=" + GetParam("SAMLart");
			jf_OpenChildWin(pUrl, "EAC005", 750, 500);
			Page_BlockSubmit = true;
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070125 Justin [1050087] 二代公文修改 
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
	
    //1070125 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			//將不用清除的欄位值記下來
			var strVerNo = document.all["H_VerNo"].value;
			var strVerNo2 = document.all["H_VerNo2"].value;
			var strOrgNo = document.all["H_Source"].value;
			var strNickName = document.all["H_OrgNickName"].value;
			var strClsLenSet = document.all["H_ClsLenSet"].value;
			if (jf_ConfirmClean(false))
			{
				document.all["rblClsCaseName"][3].checked = true;
				//將不用清除的欄位值寫回
				document.all["H_VerNo"].value = strVerNo;
				document.all["H_VerNo2"].value = strVerNo2;
				document.all["H_Source"].value = strOrgNo;
				document.all["H_OrgNickName"].value = strNickName;
				document.all["H_ClsLenSet"].value = strClsLenSet;
			}
			break;
		case "btPrint":
			if(checkvalue())
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
			    //1070125 Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPreview":
			if(checkvalue())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
				jf_btchkVol();
			    //1070125 Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
	}
}
function checkvalue()
{
	var isRowCheck = false;
	var strErrMsg = "";
	var dg = document.all.dg1;
	var strDG = "dg1";
	var rbPrintType = document.getElementById("rbPrintType");
	if (rbPrintType.rows[0].cells[0].childNodes[0].checked == false) {
		dg = document.all.dg2;
		strDG = "dg2";
	}
	for (var i = 2; i < dg.rows.length + 1 ; i++)
	{
		if (isRowCheck == false)
			for(var j=1 ; j<4 ; j++)
			{
				if (jf_Trim(document.all[strDG + "__ctl" + i + "_txYear" + j + ""].value) != "" && jf_Trim(document.all[strDG + "__ctl" + i + "_txClass" + j + ""].value) != "" && jf_Trim(document.all[strDG + "__ctl" + i + "_txCase" + j + ""].value) != "" && jf_Trim(document.all[strDG + "__ctl" + i + "_txVol" + j + ""].value) != "") {
					isRowCheck = true;
					break;
				}
			}
	}
	if (isRowCheck == false && rbPrintType.rows[0].cells[2].childNodes[0].checked==false) {
		alert("請至少輸入一筆資料");
		return false;
	}
	else
		return true;
}

function keepRBT()
{
	var keep = "3";
	if(document.all["rblClsCaseName_0"].checked)
		keep = "1";	
	else
	{ 
		if(document.all["rblClsCaseName_1"].checked)
			keep = "2";	
		else
			keep = "3";
	}
	return keep;
}
function jf_btchkVol()
{
	if(jf_Trim(document.all["dg1__ctl2_txVol1"].value) !="")
		{document.all["dg1__ctl2_txVol1"].value = jf_PADL(document.all["dg1__ctl2_txVol1"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl2_txVol2"].value) !="")
		{document.all["dg1__ctl2_txVol2"].value = jf_PADL(document.all["dg1__ctl2_txVol2"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl2_txVol3"].value) !="")
		{document.all["dg1__ctl2_txVol3"].value = jf_PADL(document.all["dg1__ctl2_txVol3"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl3_txVol1"].value) !="")
		{document.all["dg1__ctl3_txVol1"].value = jf_PADL(document.all["dg1__ctl3_txVol1"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl3_txVol2"].value) !="")
		{document.all["dg1__ctl3_txVol2"].value = jf_PADL(document.all["dg1__ctl3_txVol2"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl3_txVol3"].value) !="")
		{document.all["dg1__ctl3_txVol3"].value = jf_PADL(document.all["dg1__ctl3_txVol3"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl4_txVol1"].value) !="")
		{document.all["dg1__ctl4_txVol1"].value = jf_PADL(document.all["dg1__ctl4_txVol1"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl4_txVol2"].value) !="")
		{document.all["dg1__ctl4_txVol2"].value = jf_PADL(document.all["dg1__ctl4_txVol2"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl4_txVol3"].value) !="")
		{document.all["dg1__ctl4_txVol3"].value = jf_PADL(document.all["dg1__ctl4_txVol3"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl5_txVol1"].value) !="")
		{document.all["dg1__ctl5_txVol1"].value = jf_PADL(document.all["dg1__ctl5_txVol1"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl5_txVol2"].value) !="")
		{document.all["dg1__ctl5_txVol2"].value = jf_PADL(document.all["dg1__ctl5_txVol2"].value, 4, "0");}
	if(jf_Trim(document.all["dg1__ctl5_txVol3"].value) !="")
		{document.all["dg1__ctl5_txVol3"].value = jf_PADL(document.all["dg1__ctl5_txVol3"].value, 4, "0");}
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
				InValidName = InValidName.substr(1,InValidName.length);
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
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
var O = document.all;
var bClassOk = true;//案號檢查正確
var bCaseOk = true;//卷號檢查正確
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if (argCallerId == "EAC005")
	{
		if (EAC005 == "CLS")
		{
			if (document.all["lbReturnValue"].length > 0)
			{
				document.all["txClass"].value = document.all["lbReturnValue"].options[1].value;
				document.all["txVerNo"].value = document.all["lbReturnValue"].options[5].value;
			    //1070125 Justin [1050087] 二代公文修改
				//document.all["txClass"].focus();
				$('#txClass').focus();
				document.all["txClass"].onblur();
			}
		}
		else
		{
			if (document.all["lbReturnValue"].length > 0)
			{
				document.all["txCase"].value = document.all["lbReturnValue"].options[2].value;
				if (document.all["lbReturnValue"].options[0].value != "")
					document.all["txYear"].value = document.all["lbReturnValue"].options[0].value;
				document.all["H_ClsKey"].value = document.all["lbReturnValue"].options[3].value;
			    //1070125 Justin [1050087] 二代公文修改
				//document.all["txCase"].focus();
				$('#txCase').focus();
				document.all["txCase"].onblur();
			}
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
function jf_chkVerNo()
{
	if (document.all["txVerNo"].value == document.all["H_VerNo2"].value)
		return;
	if (window.confirm("變更版本後將清空所有卷號，是否繼續?"))
	{
		var dg = document.all.dg1;
		var strDG = "dg1";
		var rbPrintType = document.getElementById("rbPrintType");
		if (rbPrintType.rows[0].cells[0].childNodes[0].checked == false)
		{
			dg = document.all.dg2;
			strDG = "dg2";
		}
		if (rbPrintType.rows[0].cells[2].childNodes[0].checked)
		{
			document.all.txYear.value = "";
			document.all.txClass.value = "";
			document.all.txCase.value = "";
			document.all.txVolS.value = "";
			document.all.txVolE.value = "";
		}
		else
			for (var iRow = 2; iRow < dg.rows.length + 1; iRow++)
			{
				document.all[strDG+"__ctl"+iRow+"_txYear1"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txYear2"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txYear3"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txClass1"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txClass2"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txClass3"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txCase1"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txCase2"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txCase3"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txVol1"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txVol2"].value = "";
				document.all[strDG+"__ctl"+iRow+"_txVol3"].value = "";
				document.all[strDG+"__ctl"+iRow+"_H_ClsKey1"].value = "";
				document.all[strDG+"__ctl"+iRow+"_H_ClsKey2"].value = "";
				document.all[strDG+"__ctl"+iRow+"_H_ClsKey3"].value = "";
			}
		document.all["H_VerNo2"].value = document.all["txVerNo"].value;
	}
	else
	{
		document.all["txVerNo"].value = document.all["H_VerNo2"].value;
	}
}

//檢查年度是否有值
//	是否為3碼 ==>否 補0
//		call jf_IsExistDoc
function jf_chkYear()
{
	var srcE = event.srcElement;
	var actE = document.activeElement;
	if (actE != null)
	if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
	jf_PADCHAR(srcE,3,"0");
	if (bCaseOk && bClassOk)
		jf_IsExistCase();
}

//檢查分類是否有值
//	分類是否正確
//		call jf_IsChkCase
function jf_IsExistClass(nIndex)
{
	var srcE = event.srcElement;
	var actE = document.activeElement;
	if (actE != null)
	if ( (actE.id == "btExit") || (actE.id == "btCancel")) return;
	var pNo = srcE.id.substring(8, srcE.id.indexOf("_txClass"+nIndex));
	if(jf_Trim(srcE.value) != "" )
	{
		var arWSParam = new Array(4);
		arWSParam[0] = document.all["H_Source"].value;
		arWSParam[1] = document.all["txVerNo"].value;
		arWSParam[2] = document.all[srcE.id].value;
		arWSParam[3] = "";
		callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);
		if(jf_IsWebServiceSuccess(callObj))
		{
			if (srcE.id == "txClass")
				document.all.H_ClsKey.value = callObj.value.ClsKey;
			else
				document.all[srcE.id.substring(0,3)+"__ctl"+pNo+"_H_ClsKey"+nIndex].value= callObj.value.ClsKey;
		}
		else
		{
		    //1070125 Justin [1050087] 二代公文修改
		    //document.all[srcE.id].focus();
		    $('#' + srcE.id).focus();
		}
	}
}

//檢查案和分類是否有值且均無錯誤
function jf_IsChkCase()
{
	var srcE = event.srcElement;
	var actE = document.activeElement;
	var dgID = "";
	var ndgID = 0;
	var i = 1;
	for (i=1;i<=3;i++)
	{
		var strdgClass = "txClass"+i;
		var strdgCase = "txCase"+i;
		if (srcE.id.indexOf(strdgClass) != -1)
		{
			ndgID = srcE.id.indexOf(strdgClass);
			break;
		}
		else if (srcE.id.indexOf(strdgCase) != -1)
		{
			ndgID = srcE.id.indexOf(strdgCase);
			break;
		}
	}
	dgID=srcE.id.substring(0,ndgID);
	if ( actE != null)
	if ( (actE.id == "btExit") || (actE.id == "btCancel")) return;
	if ( jf_Trim(O[dgID+"txClass"+i].value) != "" && jf_Trim(O[dgID+"txCase"+i].value) != "" && bClassOk)
	{
		jf_IsExistCase(dgID,i);
	}
}

//檢查案號是否正確
function jf_IsExistCase()
{
	var strSource	= document.all["H_Source"].value;
	var srcE = event.srcElement;
	var actE = document.activeElement;
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
	dgID = srcE.id.substring(0, ndgID);
	if (srcE.id == "txYear" || srcE.id == "txCase")
	{
		dgID = "";
		i = "";
	}
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
			//alert(callObj.value.CaseKey);
		}
		else
		{
			if(document.all[srcE.id].value !="")
			{
			    document.all[srcE.id].value = "";
			    //1070125 Justin [1050087] 二代公文修改
			    //document.all[srcE.id].focus();
			    $('#' + srcE.id).focus();
			}
		}
	}
}
//檢查卷號是否有值
//	是否為4碼 ==>否 補0
function jf_chkVol() {
	var srcE = event.srcElement;
	var actE = document.activeElement;
	if (actE != null)
		if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
	if (jf_Trim(srcE.value) != "" && (jf_Trim(srcE.value)).length < 4)
		jf_PADCHAR(srcE, 4, "0");
}
var bHasCheck = false;
function rbPrintTypeChange() {
	var rbPrintType = document.getElementById("rbPrintType");
	if (rbPrintType.rows[0].cells[0].childNodes[0].checked == true)
	{
		document.all.tbTitlePrintType2.style.display = 'none';
		document.all.GridTable.style.display = '';
		document.all.GridTable2.style.display = 'none';
	}
	if (rbPrintType.rows[0].cells[1].childNodes[0].checked == true)
	{
		document.all.tbTitlePrintType2.style.display = 'none';
		document.all.GridTable.style.display = 'none';
		document.all.GridTable2.style.display = '';
	}
	if (rbPrintType.rows[0].cells[2].childNodes[0].checked == true)
	{
		document.all.tbTitlePrintType2.style.display = '';
		document.all.GridTable.style.display = 'none';
		document.all.GridTable2.style.display = 'none';
	}
}
//與網址參數的處理有關函式
function GetParam(p) {
	var strUrl = document.location.toString();
	strUrl = unescape(strUrl);
	var rg_szItems = strUrl.split("?");
	if (rg_szItems.length == 2) {
		var rg_szItems2 = rg_szItems[1].split("&");
		for (var i = 0; i < rg_szItems2.length; i++) {
			var rg_items = rg_szItems2[i].split("=");
			if (rg_items[0] == "SAMLart")
				return rg_items[1];
		}
	}
}