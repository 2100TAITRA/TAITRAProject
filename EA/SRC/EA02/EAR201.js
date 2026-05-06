/*
DATE	SA	    PRG	    MGR_NO	DESC
1041001 Cloud   Kevin_C 1040750 檢核同一列的最上層分類號是否相同
1041026	Cloud	Kevin_C	1040750	修正基港消檢核錯誤
1060215 Cloud   Justin  1050087 二代公文修改
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
//1060215  Justin [1050087] 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060215  Justin [1050087] 二代公文修改 移除無用jf_CallWS
    //jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, null);
    //jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, null);
	//jf_CallWS("../../../STD/../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null);
	//jf_CallWS("../../../STD/../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060215  Justin [1050087] 二代公文修改
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
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060215  Justin [1050087] 二代公文修改 
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
	
    //1060215  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			//1041005	Kevin_C	1040750	將不用清除的欄位值記下來-S
			var strVerNo = document.all["H_VerNo"].value;
			var strVerNo2 = document.all["H_VerNo2"].value;
			var strOrgNo = document.all["H_Source"].value;
			var strNickName = document.all["H_OrgNickName"].value;
			var strClsLenSet = document.all["H_ClsLenSet"].value;
			//1041005	Kevin_C	1040750	將不用清除的欄位值記下來-E
			if (jf_ConfirmClean(false))
			{
				document.all["rblClsCaseName"][3].checked = true;
				//document.all["rblClsCaseName_2"].checked=true;
				//1041005	Kevin_C	1040750	將不用清除的欄位值寫回-S
				document.all["H_VerNo"].value = strVerNo;
				document.all["H_VerNo2"].value = strVerNo2;
				document.all["H_Source"].value = strOrgNo;
				document.all["H_OrgNickName"].value = strNickName;
				document.all["H_ClsLenSet"].value = strClsLenSet;
				//1041005	Kevin_C	1040750	將不用清除的欄位值寫回-E
			}
			break;
		case "btPrint":
			//jf_chkVol();
			if(checkvalue())
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
			    //1060215  Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPreview":
			if(checkvalue())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
				jf_btchkVol();
			    //1060215  Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
	}
}
function checkvalue()
{
	var count = 0;
	var strErrMsg = "";
	//1041001	Kevin_C	1040750	基港消調整列數
	//for(var i=2; i<6 ; i++)
	for (var i = 2; i < document.all.dg1.rows.length+1 ; i++)
	{
		if(count == -1)
		{
			break;
		}
		for(var j=1 ; j<4 ; j++)
		{
		    //1041026	Kevin_C	1040750	修正基港消檢核錯誤
		    //1060215  Justin [1050087] 二代公文修改
		    //if (!document.getElementsByName("rblClsCaseName")[4].checked && document.getElementById("H_OrgNickName").value == "KLHFD")
		    if (!document.getElementById("rblClsCaseName_3").checked && document.getElementById("H_OrgNickName").value == "KLHFD")
			{
		        //if ((document.getElementsByName("rblClsCaseName")[1].checked && j == 3) || (document.getElementsByName("rblClsCaseName")[2].checked && j != 2) || document.getElementsByName("rblClsCaseName")[3].checked || document.getElementsByName("rblClsCaseName")[4].checked)
		        if ((document.getElementById("rblClsCaseName_0").checked && j == 3) || (document.getElementById("rblClsCaseName_1").checked && j != 2) || document.getElementById("rblClsCaseName_2").checked || document.getElementById("rblClsCaseName_3").checked)
					if (jf_Trim(document.all["dg1__ctl" + i + "_txYear" + j + ""].value) != "" && jf_Trim(document.all["dg1__ctl" + i + "_txClass" + j + ""].value) != "" && jf_Trim(document.all["dg1__ctl" + i + "_txCase" + j + ""].value) != "" && jf_Trim(document.all["dg1__ctl" + i + "_txVol" + j + ""].value) != "") {
						count = -1;
						break;
					}
					else {
						count++;
					}
			}
			else
			{
				if (jf_Trim(document.all["dg1__ctl" + i + "_txYear" + j + ""].value) != "" && jf_Trim(document.all["dg1__ctl" + i + "_txClass" + j + ""].value) != "" && jf_Trim(document.all["dg1__ctl" + i + "_txCase" + j + ""].value) != "" && jf_Trim(document.all["dg1__ctl" + i + "_txVol" + j + ""].value) != "") {
					count = -1;
					break;
				}
				else {
					count++;
				}
			}
		}
	}
    //1041001	Kevin_C	1040750	檢核同一列的最上層分類號應相同，若不同不進行PostBack -E
    //1060215  Justin [1050087] 二代公文修改
    //if (!document.getElementsByName("rblClsCaseName")[4].checked && document.getElementById("H_OrgNickName").value == "KLHFD") {
	if (!document.getElementById("rblClsCaseName_3").checked && document.getElementById("H_OrgNickName").value == "KLHFD") {
		var arrClsLenSet = document.getElementById("H_ClsLenSet").options;
		var strVerNo = document.getElementById("txVerNo").value;
		var strLen = "";
		//取得最上層分類號長度
		for (var nClsLenSet = 0; nClsLenSet < arrClsLenSet.length; nClsLenSet++)
			if (arrClsLenSet[nClsLenSet].innerHTML == strVerNo) {
				strLen = arrClsLenSet[nClsLenSet].value;
				strLen = strLen.split("|")[1];
				break;
			}
		//檢核最上層分類號
		for (var i = 2; i < document.all.dg1.rows.length + 1 ; i++) {
			var strUpperClsNo = "";
			//1041026	Kevin_C	1040750	修正基港消檢核錯誤
			var strRowNumber = "";
			for (var j = 1 ; j < 4 ; j++) {
				if (jf_Trim(document.all["dg1__ctl" + i + "_txYear" + j + ""].value) != "" && jf_Trim(document.all["dg1__ctl" + i + "_txClass" + j + ""].value) != "" && jf_Trim(document.all["dg1__ctl" + i + "_txCase" + j + ""].value) != "" && jf_Trim(document.all["dg1__ctl" + i + "_txVol" + j + ""].value) != "")
				{
					strRowNumber+=j;
					if (strLen != "") {
						if (strUpperClsNo == "")
							strUpperClsNo = document.all["dg1__ctl" + i + "_txClass" + j + ""].value.substring(0, parseInt(strLen))
						else if (strUpperClsNo != document.all["dg1__ctl" + i + "_txClass" + j + ""].value.substring(0, parseInt(strLen))) {
							{
								strErrMsg += "第" + (i - 1) + "組卷脊，最上層分類號應相同\n";
								break;
							}
						}
					}
				}
			}
		    //1041026	Kevin_C	1040750	修正基港消檢核錯誤
		    //1060215  Justin [1050087] 二代公文修改
		    //if (document.getElementsByName("rblClsCaseName")[2].checked && strRowNumber != "" && strRowNumber != "13" && strRowNumber != "123" && strRowNumber != "2") {
			if (document.getElementById("rblClsCaseName_1").checked && strRowNumber != "" && strRowNumber != "13" && strRowNumber != "123" && strRowNumber != "2") {
				alert("序" + (i - 1) + "輸入不完整，雙卷次卷脊應輸入左右兩組資料");
				return false;
			}
		    //1060215  Justin [1050087] 二代公文修改
		    //if (document.getElementsByName("rblClsCaseName")[3].checked && strRowNumber != "" && strRowNumber != "123") {
			if (document.getElementById("rblClsCaseName_2").checked && strRowNumber != "" && strRowNumber != "123") {
				alert("序" + (i - 1) + "輸入不完整，三卷次卷脊應輸入左中右三組資料");
				return false;
			}
		}
	}
	if (strErrMsg != "")
	{
		strErrMsg = strErrMsg.substring(0, strErrMsg.length - 1)
		alert(strErrMsg);
		return false;
	}
	//1041001	Kevin_C	1040750	檢核同一列的最上層分類號應相同，若不同不進行PostBack -E
	if(count == -1)
	{
		return true;
	}
	//1041001	Kevin_C	1040750	基港消調整列數
	//if(count ==12)
	//1041026	Kevin_C	1040750	修正基港消檢核錯誤
	//if (count == (document.all.dg1.rows.length - 1) * 3)
	if (count != -1)
	{
		alert("請至少輸入一筆資料");
		return false;
	}
	
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
			    InValidName = InValidName.substr(1, InValidName.length);
			    //1060215  Justin [1050087] 二代公文修改
			    //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
			    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
				//document.all[InValidControlName].focus();
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
	/*var srcE = event.srcElement;
	var actE = document.activeElement;
    if (argResult.id == wsGetClsCaseID)
    	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			var RtnObj = argResult.value;
			if (RtnObj.CaseYear != "" )
			{
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
					if(RtnObj.CaseYear != O[dgID+"txYear"+i].value)
					{	
						document.all[actE.id].value ="";
						alert("無此案次號");
						document.all[srcE.id].focus();
					}
			}
		}
		else
		{
			document.all[actE.id].value ="";
			alert("無此案次號");
			document.all[srcE.id].focus();
		}

	}*/
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
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
		for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
		{
			document.all["dg1__ctl"+iRow+"_txYear1"].value = "";
			document.all["dg1__ctl"+iRow+"_txYear2"].value = "";
			document.all["dg1__ctl"+iRow+"_txYear3"].value = "";
			document.all["dg1__ctl"+iRow+"_txClass1"].value = "";
			document.all["dg1__ctl"+iRow+"_txClass2"].value = "";
			document.all["dg1__ctl"+iRow+"_txClass3"].value = "";
			document.all["dg1__ctl"+iRow+"_txCase1"].value = "";
			document.all["dg1__ctl"+iRow+"_txCase2"].value = "";
			document.all["dg1__ctl"+iRow+"_txCase3"].value = "";
			document.all["dg1__ctl"+iRow+"_txVol1"].value = "";
			document.all["dg1__ctl"+iRow+"_txVol2"].value = "";
			document.all["dg1__ctl"+iRow+"_txVol3"].value = "";
			document.all["dg1__ctl"+iRow+"_H_ClsKey1"].value = "";
			document.all["dg1__ctl"+iRow+"_H_ClsKey2"].value = "";
			document.all["dg1__ctl"+iRow+"_H_ClsKey3"].value = "";
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
			document.all["dg1__ctl"+pNo+"_H_ClsKey"+nIndex].value= callObj.value.ClsKey;
		}
		else
		{
		    //1060215  Justin [1050087] 二代公文修改
		    //document.all[srcE.id].focus();
		    $('#' + srcE.id).focus();
		}
	}
}

//檢查案和分類是否有值且均無錯誤
//	call jf_IsExistCase
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
//	call jf_IsExistDoc
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
			//alert(callObj.value.CaseKey);
		}
		else
		{
			if(document.all[srcE.id].value !="")
			{
			    document.all[srcE.id].value = "";
			    //1060215  Justin [1050087] 二代公文修改
			    //document.all[srcE.id].focus();
			    $('#' + srcE.id).focus();
			}
		}
	}
}

//檢查卷號是否有值
//	是否為4碼 ==>否 補0
//		call jf_IsExistDoc
function jf_chkVol()
{
	var srcE = event.srcElement;
	var actE = document.activeElement;
	if (actE != null)
	if ( (actE.id == "btExit") || (actE.id == "btCancel")) return;
	if(jf_Trim(srcE.value) != "" && (jf_Trim(srcE.value)).length < 4 )
	jf_PADCHAR(srcE,4,"0")
	if (bCaseOk && bClassOk)
	jf_IsExistDoc();
}

//檢查年度、分類、案號、卷號是否均有值
//	檢查是否存在於DOC_MAIN
function jf_IsExistDoc()
{
	/*
	var srcE = event.srcElement;
	var actE = document.activeElement;
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
			{
				ndgID = srcE.id.indexOf(strdgClass); break;
			}
		else if (srcE.id.indexOf(strdgCase) != -1)
			{
				ndgID = srcE.id.indexOf(strdgCase); break;
			}
		else if (srcE.id.indexOf(strdgYear) != -1)
			{
				ndgID = srcE.id.indexOf(strdgYear); break;
			}
		else if (srcE.id.indexOf(strdgVol) != -1)
			{
				ndgID = srcE.id.indexOf(strdgVol); break;
			}
	}
	dgID=srcE.id.substring(0,ndgID);
	if ( actE != null)
	if ( (actE.id == "btExit") || (actE.id == "btCancel")) return;
	if ( jf_Trim(O[dgID+"txClass"+i].value) != "" && jf_Trim(O[dgID+"txCase"+i].value) != "" && jf_Trim(O[dgID+"txYear"+i].value) != "" && jf_Trim(O[dgID+"txVol"+i].value) != "" )
	{
		var arKeyName = new Array("FILE_YEAR","FILE_CLS","FILE_CASE","FILE_VOL");
		var arKeyValue = new Array(4);
		arKeyValue[0] = O[dgID+"txYear"+i].value;
		arKeyValue[1] = O[dgID+"txClass"+i].value;
		arKeyValue[2] = O[dgID+"txCase"+i].value;
		arKeyValue[3] = O[dgID+"txVol"+i].value;
		var arWSParam = new Array(3);
		arWSParam[0] = "DOC_MAIN";
		arWSParam[1] = arKeyName;
		arWSParam[2] = arKeyValue;
		callObj = jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);
		if(jf_IsWebServiceSuccess(callObj))
			{	
			if(callObj.value.RtnBool==false)
				{
					document.all[srcE.id].value ="";
					alert("無此卷次號");
					document.all[srcE.id].focus();
				}
			}
		else
			{	
			if(callObj.value.RtnBool==false)
				{
					document.all[srcE.id].value ="";
					alert("無此卷次號");
					document.all[srcE.id].focus();
				}
			}
	}*/
}