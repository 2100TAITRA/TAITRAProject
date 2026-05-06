/*
DATE 	    SA		PRG		MGR_NO		DESC
1071004     Cloud   Zen     1050087     二代升級
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
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//1071004 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1071004 Zen 1050087 二代升級    //jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, null);
    //jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1071004 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1071004 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
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
//1071004 Zen 1050087 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1071004 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        //1071004 Zen 1050087 二代升級        //case "btOpen":
        //    Page_BlockSubmit = !jf_CheckKeyObject();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btSave":
        //    if (jf_ConfirmSave()) //是否通過儲存前必要檢查
        //    {
        //        IsServerHandling = true;
        //        jf_ShowWaitState();
        //        Page_BlockSubmit = false;
        //    }
        //    else
        //        Page_BlockSubmit = true;
        //    jf_ToolBarSubmit();
        //    break;
        //case "btDelete":
        //    Page_BlockSubmit = !jf_ConfirmDelete();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btCancel":
        //    Page_BlockSubmit = !jf_ConfirmCancel();
        //    jf_ToolBarSubmit();
        //    break;
        case "btClean":
            Page_BlockSubmit = true;
            var tmp = document.all["H_Source"].value;
            jf_ConfirmClean(true);
            //document.all["txKeyFld"].focus();
            document.all["H_Source"].value = tmp;
            break;
        case "btSearch":
            /*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
            break;
        case "btPrint": 
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1071004 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1071004 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

            //1071004 Zen 1050087 二代升級            ////以下屬於DataGrid ToolBar
            //case "btSelectAll":
            //    Page_BlockSubmit = true;
            //    jf_SelectAll("dg1", "_cbSelect");
            //    break;
            //case "btSelectInverse":
            //    Page_BlockSubmit = true;
            //    jf_SelectInverse("dg1", "_cbSelect");
            //    break;
            //case "btSelectClear":
            //    Page_BlockSubmit = true;
            //    jf_SelectClear("dg1", "_cbSelect");
            //    break;
            //case "btDeleteSelected":
            //    Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
            //    jf_SelectBarSubmit();
            //    break;
            //case "btUp":
            //    Page_BlockSubmit = true;
            //    jf_RowUp("dg1", "_cbSelect", strTableFields);
            //    break;
            //case "btDown":
            //    Page_BlockSubmit = true;
            //    jf_RowDown("dg1", "_cbSelect", strTableFields);
            //    break;
    }
}

//1071004 Zen 1050087 二代升級///********** 以下為按下儲存鍵後相關處理 **********/
////儲存前檢查
//function jf_ConfirmSave()
//{
//    var bRtnbool = false;

//    if (jf_CheckBeforSave())
//    {
//        // 新增模式需檢查鍵值是否已存在
//        if (jf_GetActionMode() == LayoutModeNew)
//        {
//            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
//            {
//                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
//                    bRtnbool = true;
//            }
//            else
//                bRtnbool = true;
//        }
//        else
//            bRtnbool = true;
//    }

//    return bRtnbool;
//}

////儲存前之欄位檢查
//function jf_CheckBeforSave()
//{
//    var bRtnbool = true;
//    var strErrMsg = "";

//    if (document.all["txKeyFld"].value == "")
//    {
//        strErrMsg += "鍵值欄位不可空白\n";
//        document.all["txKeyFld"].focus();
//    }

//    if (document.all["txRequireFld"].value == "")
//    {
//        strErrMsg += "必要欄位不可空白\n";
//        document.all["txRequireFld"].focus();
//    }

//    if (!jf_CheckBlankAndAlert())
//        bRtnbool = false;

//    if (strErrMsg != "")
//    {
//        bRtnbool = false;
//        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
//    }

//    return bRtnbool;
//}

////檢查DataGrid資料列是否填完整
//function jf_CheckBlankAndAlert()
//{
//    var InValidName = "";
//    var InValidControlName = "";

//    for (var i = 2; i <= document.all.dg1.rows.length; i++)
//    {
//        //txInput1不為空白時
//        if (document.all["dg1__ctl" + i + "_txInput1"].value != "")
//        {
//            //txInput2不可空白
//            if (document.all["dg1__ctl" + i + "_txInput2"].value == "")
//            {
//                InValidName += ",Input2不可空白";
//                InValidControlName = "dg1__ctl" + i + "_txInput2";
//            }

//            if (InValidName != "")
//            {
//                InValidName = InValidName.substr(1, InValidName.length);
//                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
//                document.all[InValidControlName].focus();
//                return false;
//            }
//        }
//    }
//    return true;
//}

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
        if (jf_IsWebServiceSuccess(argResult))
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
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var O = document.all;
var bClassOk = true;//案號檢查正確
var bCaseOk = true;//卷號檢查正確
//檢查年度是否有值
//	是否為3碼 ==>否 補0
//		call jf_IsExistDoc
function jf_chkYear()
{
    var srcE = event.srcElement;
    var actE = document.activeElement;
    if (actE != null)
        if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
    jf_PADCHAR(srcE, 3, "0");
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
        if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
    var pNo = srcE.id.substring(8, srcE.id.indexOf("_txClass" + nIndex));
    if (jf_Trim(srcE.value) != "")
    {
        var arWSParam = new Array(4);
        arWSParam[0] = document.all["H_Source"].value;
        arWSParam[1] = document.all["txVerNo"].value;
        arWSParam[2] = document.all[srcE.id].value;
        arWSParam[3] = "";
        callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);
        if (jf_IsWebServiceSuccess(callObj))
        {
            document.all["dg1__ctl" + pNo + "_H_ClsKey" + nIndex].value = callObj.value.ClsKey;
            if (callObj.value.ClsKey == "")
            {
                alert('分類號不存在，請重新輸入');
                document.all[srcE.id].value = "";
                //1071004 Zen 1050087 二代升級                //document.all[srcE.id].focus();
                $('#' + srcE.id).focus();
            }
        }
        else
        {
            //1071004 Zen 1050087 二代升級            //document.all[srcE.id].focus();
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
    for (i = 1; i <= 6; i++)
    {
        var strdgClass = "txClass" + i;
        var strdgCase = "txCase" + i;
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
    dgID = srcE.id.substring(0, ndgID);
    if (actE != null)
        if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
    if (jf_Trim(O[dgID + "txClass" + i].value) != "" && jf_Trim(O[dgID + "txCase" + i].value) != "" && bClassOk)
    {
        jf_IsExistCase(dgID, i);
    }
}

//檢查案號是否正確
//	call jf_IsExistDoc
function jf_IsExistCase()
{
    var strSource = document.all["H_Source"].value;
    var srcE = event.srcElement;
    var actE = document.activeElement;
    if (actE != null)
        if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
    var dgID = "";
    var ndgID = 0;
    var i = 1;
    for (i = 1; i <= 6; i++)
    {
        var strdgClass = "txClass" + i;
        var strdgCase = "txCase" + i;
        var strdgYear = "txYear";
        var strdgVol = "txVol" + i;
        if (srcE.id.indexOf(strdgClass) != -1)
        { ndgID = srcE.id.indexOf(strdgClass); break; }
        else if (srcE.id.indexOf(strdgCase) != -1)
        { ndgID = srcE.id.indexOf(strdgCase); break; }
        else if (srcE.id.indexOf(strdgYear) != -1)
        { ndgID = srcE.id.indexOf(strdgYear); break; }
        else if (srcE.id.indexOf(strdgVol) != -1)
        { ndgID = srcE.id.indexOf(strdgVol); break; }
    }
    dgID = srcE.id.substring(0, ndgID);

    if (document.all[dgID + "txClass" + i].value != "" && document.all[dgID + "txCase" + i].value != "")
    {
        var arWSParam = new Array(4);
        arWSParam[0] = strSource;
        arWSParam[1] = document.all[dgID + "txYear"].value;
        arWSParam[2] = document.all[dgID + "H_ClsKey" + i].value;
        arWSParam[3] = document.all[dgID + "txCase" + i].value;
        var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, arWSParam);
        wsGetClsCaseID = callObj.id;
        OnWSResult(callObj);
        if (jf_IsWebServiceSuccess(callObj))
        {
            //alert(callObj.value.CaseKey);
        }
        else
        {
            if (document.all[srcE.id].value != "")
            {
                document.all[srcE.id].value = "";
                //1071004 Zen 1050087 二代升級                //document.all[srcE.id].focus();
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
        if ((actE.id == "btExit") || (actE.id == "btCancel")) return;
    if (jf_Trim(srcE.value) != "" && (jf_Trim(srcE.value)).length < 4)
        jf_PADCHAR(srcE, 4, "0")
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
function jf_chkVerNo()
{
    if (document.all["txVerNo"].value == document.all["H_VerNo2"].value)
        return;
    if (window.confirm("變更版本後將清空所有卷號，是否繼續?"))
    {
        for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
        {
            document.all["dg1__ctl" + iRow + "_txYear"].value = "";

            document.all["dg1__ctl" + iRow + "_txClass1"].value = "";
            document.all["dg1__ctl" + iRow + "_txClass2"].value = "";
            document.all["dg1__ctl" + iRow + "_txClass3"].value = "";
            document.all["dg1__ctl" + iRow + "_txClass4"].value = "";
            document.all["dg1__ctl" + iRow + "_txClass5"].value = "";
            document.all["dg1__ctl" + iRow + "_txClass6"].value = "";
            document.all["dg1__ctl" + iRow + "_txCase1"].value = "";
            document.all["dg1__ctl" + iRow + "_txCase2"].value = "";
            document.all["dg1__ctl" + iRow + "_txCase3"].value = "";
            document.all["dg1__ctl" + iRow + "_txCase4"].value = "";
            document.all["dg1__ctl" + iRow + "_txCase5"].value = "";
            document.all["dg1__ctl" + iRow + "_txCase6"].value = "";
            document.all["dg1__ctl" + iRow + "_txVol1"].value = "";
            document.all["dg1__ctl" + iRow + "_txVol2"].value = "";
            document.all["dg1__ctl" + iRow + "_txVol3"].value = "";
            document.all["dg1__ctl" + iRow + "_txVol4"].value = "";
            document.all["dg1__ctl" + iRow + "_txVol5"].value = "";
            document.all["dg1__ctl" + iRow + "_txVol6"].value = "";
            document.all["dg1__ctl" + iRow + "_H_ClsKey1"].value = "";
            document.all["dg1__ctl" + iRow + "_H_ClsKey2"].value = "";
            document.all["dg1__ctl" + iRow + "_H_ClsKey3"].value = "";
            document.all["dg1__ctl" + iRow + "_H_ClsKey4"].value = "";
            document.all["dg1__ctl" + iRow + "_H_ClsKey5"].value = "";
            document.all["dg1__ctl" + iRow + "_H_ClsKey6"].value = "";
        }
        document.all["H_VerNo2"].value = document.all["txVerNo"].value;
    }
    else
    {
        document.all["txVerNo"].value = document.all["H_VerNo2"].value;
    }
}