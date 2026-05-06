/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.08.22
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2020.09.18   Cloud   1090559 新增信保客製化akt116
 * 1100204      Zen     1090927 取消使用document.activeElement
 * 2021.03.02	1100061	配合信保客製化行為[本文][附件]流程不同，調整ODR250_SMEG為附件歸檔不產生待點收，補強點收前檢核未數位化附件須送歸檔才可點收
 * 1120605 		Joe 	1120361 弱掃修正XSS
 * 1120612 		Joe 	1120361 弱掃修正XSS
 * 2025.07.17	Cloud 	1140954 修正Call GetFieldValue 未使用機關代碼問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

var RecordNO = 1;
var ErrMsgTitle = "您輸入之資料有誤，明細如下，請更正後重試";
var rowscount = 0;
var UpdateFlag = 0;
var AKT116_DocList = new Object();
AKT116_DocList.Info = new Array();
AKT116_DocList.Att = new Array();
var AKT116_Detail = new Object();
var IsClsChecked = false;		// 是否檢查過分類號
var IsCanUseInitCase = false;	// 是否可使用通案 
var CheckFlag = true;
var CompareFlag = true


var uExtfileDate;
var uCloseDate;


var ComType = 0;	// 併案狀態

var strDefaultType = "rbType";	//退文至之預設選項

AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}

//demo

var Deptlength = "";
var SendDeptlength = "";
var lbdectlength = "2em";
var lbErrmsglength = "5em";
function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            var xUrl = "";
            
            AK.AKT116_SMEG.SaveDocList(document.all.tbSaveDocNo.value, jf_GetSessionID());
            xUrl = "AKS116.aspx?RtnObj=lbReturnValue&SAMLart=" + jf_ReadCookie("SAMLart");
            OpenWindow(xUrl);
            Page_BlockSubmit = true;
            break;
        case "btSave": //點收

            if (document.all["Record"].length == 0)
            {
                jf_ShowMeg("您尚未輸入點收資料!!", ErrMsgTitle);
                Page_BlockSubmit = true;
                return;
            }

            //檢核退文必須有退文註記 #2007.02.28 Andy
            for (var x = 0; x < AKT116_DocList.Info.length; x++)
            {
                if (AKT116_DocList.Info[x].Doc_State == "15" && AKT116_DocList.Info[x].Tx_No == "")
                {
                    jf_ShowMeg("作業別為退文時必須輸入退文註記!!", ErrMsgTitle);
                    Page_BlockSubmit = true;
                    return;
                }
            }
        	

            var IsSelectData = false;
            for (i = 0; i < document.all["Record"].length; i++)
            {
                if (document.all["cbCLEAR" + (i + 1)].checked) //不點收
                    AKT116_DocList.Info[i].Flag = "1";
                else
                {
                    //1020319	Jagle	避免判斷錯誤，不點收的FLAG應該要為0(土銀測出之問題，一併修正)
                    AKT116_DocList.Info[i].Flag = "0";
                    IsSelectData = true;
                }
            }
			//* 2021.03.02	1100061	配合信保客製化行為[本文][附件]流程不同，調整ODR250_SMEG為附件歸檔不產生待點收，補強點收前檢核未數位化附件須送歸檔才可點收-s
            for (var x = 0; x < AKT116_DocList.Info.length; x++)
            {
            	//線上簽核、點收、含有附件且未設定為附件抽存檢查附件是否送歸檔
            	if ( AKT116_DocList.Info[x].Flag != "1" && AKT116_DocList.Info[x].DocFile_Type == "2" && AKT116_DocList.Info[x].Doc_State == "20" && AKT116_DocList.Info[x].Delay_Att_Flag != "Y" && AKT116_DocList.Att[x].Doc_No[0] != null)
            	{
            		
            		if (AK.AKT116_SMEG.CheckDocSendOD94(document.all["H_ORGNO"].value, AKT116_DocList.Info[x].Doc_No).value == "")//未撈到未數位附件送歸檔
            		{
            			alert("文號：" + AKT116_DocList.Info[x].Doc_No + "，含有未數位化附件，但並未送歸檔且未設定附件抽存，不可進行點收。");
            			Page_BlockSubmit = true;
            			return;
            		}
            	}
            }
        	//* 2021.03.02	1100061	配合信保客製化行為[本文][附件]流程不同，調整ODR250_SMEG為附件歸檔不產生待點收，補強點收前檢核未數位化附件須送歸檔才可點收-e

            if (!IsSelectData)
            {
                jf_ShowMeg("您尚未輸入點收資料(全部選取不點收)!!", ErrMsgTitle);
                Page_BlockSubmit = true;
                return;
            }

            //document.all["tbRecord"].value = Content;
            jf_ShowWaitState();
            //IsServerHandling = true;
            Page_BlockSubmit = true;
            document.all["tbDocNo"].value = "";
            document.all["tbSaveDocNo"].value = "";
            document.all["tbComNo"].value = "";
            
            document.all["txDocSubject"].value = "";
            document.all["txDocSubject"].disabled = false;
            /*********************************************************************/
            
            document.all["txClsNo"].value = "";
            
            document.all["txComNo"].value = "";
            document.all["txCaseNo"].value = "";
            document.all["txCaseName"].value = "";
            //附件
            
            /*********************************************************************/
            document.all["btSelectAll"].style.visibility = "hidden";
            document.all["btClearSelect"].style.visibility = "hidden";
            document.all["btReverse"].style.visibility = "hidden";
            /******************************資料處理WS********************************************/
            
            var Param = new Array(1);
            //2006.08.17 Caesar 點收公文若主旨有特定字元,導致呼叫WebService失敗
            //	              因伺服器端未使用Subject屬性,故先清除之.
            for (var x = 0; x < AKT116_DocList.Info.length; x++)
                AKT116_DocList.Info[x].Subject = "";
            Param[0] = AKT116_DocList;

            
            RtnObj = jf_CallWS("AKT116WS.asmx", "ModifyTable", false, Param);
            iCallID_Save = RtnObj.id;
            OnWSResult(RtnObj);
            /**********************************************************************************/
            if (CompareFlag == false)
            {
                Page_BlockSubmit = true;
            }
            //1060222 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            document.all["txExtfileDate"].value = "";
            document.all["txCloseDate"].value = "";
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060222 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            var pUser = document.all.txUser.value;
            Page_BlockSubmit = !window.confirm("確定要清除全部待點收資料嗎?");
            if (!Page_BlockSubmit)
            {
                document.all["tbSaveDocNo"].value = "";
                
                document.all["txClsNo"].value = "";
                
                document.all["txComNo"].value = "";
                document.all["txCaseNo"].value = "";
                document.all["txCaseName"].value = "";
                
                document.all.txUser.value = pUser;
                document.all["Record"].length = 0;
                
                document.all["DATA1"].outerHTML = "<div id=\"DATA1\" style=\"text-align:center;border-bottom-style:outset\"></div>";
                RecordNO = 1;
                //951354 清除不會將畫面所有欄位清空修正 by whay 0951220 
                document.all.tbDocNo.value = "";
                document.all.tbTxDesc.value = "";
                document.all.txExtfileDate.value = "";
                document.all.txCloseDate.value = "";
                document.all["dlAcceptDoc"].selectedIndex = 0;
                document.all["lbMsg"].value = "";

                
                AKT116_DocList.Info = new Array();
                rowscount = 0;


                
                document.all["txDocSubject"].value = "";
                
                document.all["txDocSubject"].disabled = false;
            }

            break;
        case "btAcpList":
            
            var pUrl = "AKR110.aspx?SAMLart=" + jf_ReadCookie("SAMLart");
            jf_OpenChildWin(pUrl, "AKR110", 750, 500);
            
            Page_BlockSubmit = true;
            break;
        case "btRejectList":
            
            var pUrl = "AKR120.aspx?SAMLart=" + jf_ReadCookie("SAMLart");
            jf_OpenChildWin(pUrl, "AKR110", 750, 500);
            
            Page_BlockSubmit = true;
            break;
    }
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    
    document.all[argLabelId].textContent = obj.value;
}

function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

//1100204 Zen 1090927 取消使用document.activeElement
//function ClientButtonControl()
function ClientButtonControl(event)
{
    if (!IsServerHandling)
    {
        //1100204 Zen 1090927 取消使用document.activeElement
        //var xObjectName = document.activeElement.id;
        var xObjectName = event.target.id;

        if ((xObjectName != "btExit") && (xObjectName != "btExitImg"))
        {
            if (jf_IsTimeOut())
            {
                Page_BlockSubmit = true;
                return;
            }
        }

        var ret;

        switch (xObjectName)
        {
            case "btOpen":
                Page_BlockSubmit = !jf_CheckKeyObject();
                break;
                /* Using ... */
            case "btCls":	//清除
                //1010718	Jagle	[1010745]	紀錄權仗的隱藏欄位資料要保留
                var strArtif = document.all["H_Artif"].value;
                Page_BlockSubmit = true;
                /*********************************************************************/
                
                document.all["txClsNo"].value = "";
                
                document.all["txComNo"].value = "";
                document.all["txCaseNo"].value = "";
                document.all["txCaseName"].value = "";
                //附件
                
                /*********************************************************************/
                
                document.all["rbAcceptDoc"].checked = true;
                document.all["dlAcceptDoc"].options.selectedIndex = 0;
                
                document.all["tbTxDesc"].value = "";
                

                document.all["tbDocNo"].value = "";
                
                $('#tbDocNo').focus();
                document.all["btConfirm"].disabled = true;
                document.all["btCls"].disabled = true;
                
                document.all["H_Artif"].value = strArtif;
                break;


            case "btConfirm":  //確定
                
                
                document.all["ValidationSummary1"].textContent = "";
                document.all["Validator"].textContent = "";
                document.all["lbMsg"].textContent = "";
                Page_BlockSubmit = true;

                if (!ChkExtDateIsEmpty())
                {
                    Page_BlockSubmit = true;
                    return;
                }
                if (document.all["tbDocNo"].value == "")
                {
                    var ErrMsg = "下列欄位不可空白：\n";
                    if (document.all["tbDocNo"].value == "")
                        ErrMsg += "文號\n";
                    jf_ShowMeg(ErrMsg, ErrMsgTitle);
                    
                    $('#tbDocNo').focus();
                    return;
                }
                else //[950754]Modify by Cola 增加判斷附件抽存部份
                {
                    if (document.all["rbRejectDoc"].checked && document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
                    {
                        var ErrMsg = "下列欄位不可空白：\n";
                        if (document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
                            ErrMsg += "註記\n";
                        jf_ShowMeg(ErrMsg, ErrMsgTitle);
                        //document.all["tbRejectDoc"].focus();
                        return;
                    }
                    //[950754]Add by Cola 若有勾選附件抽存但附件應歸日期確為空，則跳出訊息
                    if (document.all["cbDelayAttFlag"].checked && document.all["txExtfileDate"].value == "")
                    {
                        var ErrMsg = "在有勾選附件抽存情況下，附件預計歸檔日期不可為空";
                        jf_ShowMeg(ErrMsg, ErrMsgTitle);
                        return;
                    }
                    //Cola -- end --
                }

                /**************************************附件*******************************************/
                var pMsg = "";
                

                if (pMsg != "")
                {
                    alert(pMsg);

                    return;
                }

                /*********************************************************************************/
                var DOCNO_Exist_Row_NO;
                
                var strDocNo = HtmlEncode(document.all["tbDocNo"].value);
                if (RecordNO > 1)
                    DOCNO_Exist_Row_NO = Check_DOCNO_Exist(strDocNo);
                else
                    DOCNO_Exist_Row_NO = -1;

                if (DOCNO_Exist_Row_NO == -1)
                {
                
                    Insert_Table(strDocNo, true, false);
                    RecordNO++;
                }
                else
                {
                    Update_Table(strDocNo, DOCNO_Exist_Row_NO + 1);
                }
                document.all["tbDocNo"].value = "";
                document.all["tbTxDesc"].value = "";
                /*********************************************************************/
                
                document.all["txClsNo"].value = "";
                
                document.all["txComNo"].value = "";
                document.all["txCaseNo"].value = "";
                document.all["txCaseName"].value = "";
                //document.all["txFileYear"].value="";

                //附件
               
                /*********************************************************************/


                if (event.type.substr(0, 3) != "key")
               
                    $('#tbDocNo').focus();

                if (RecordNO > 1)
                    document.all["TableTitle"].style.visibility = "visible";

                //新版尚不知如何判斷
               
                document.all["rbAcceptDoc"].checked = true;
                document.all["dlAcceptDoc"].options.selectedIndex = 0;
               
                document.all["tbTxDesc"].value = "";
               

                document.all["btConfirm"].disabled = true;
                document.all["btCls"].disabled = true;
                document.all["txExtfileDate"].value = "";
                document.all["txCloseDate"].value = "";
                //1040714   Kenny   [1040504]   點選確定功能鍵後需清除主旨欄位
                document.all["txDocSubject"].value = "";
                document.all["txDocSubject"].disabled = false;
                break;
            case "btSelectAll"://全選
                Page_BlockSubmit = true;
                for (i = 1; i <= rowscount; i++)
                    document.all["cbCLEAR" + i].checked = true;
                break;
            case "btClearSelect"://清除
                Page_BlockSubmit = true;
                for (i = 1; i <= rowscount; i++)
                    document.all["cbCLEAR" + i].checked = false;
                break;
            case "btReverse"://反向
                Page_BlockSubmit = true;
                for (i = 1; i <= rowscount; i++)
                {
                    if (document.all["cbCLEAR" + i].checked)
                        document.all["cbCLEAR" + i].checked = false;
                    else
                        document.all["cbCLEAR" + i].checked = true;
                }
                break;

            case "btDocInfo": //公文基本資料收合 -> 改為開啟AKM330
                if (document.all.tbDocNo.value == "")
                {
                    alert("公文文號不可空白");
                    //1060817	Kevin_C	1060719	focus轉為JQuery形式
                    //document.all.tbDocNo.focus();
                    $('#tbDocNo').focus();
                    Page_BlockSubmit = true;
                    return;
                }
                //1010718	Jagle	[1010745]	增加傳入權杖
                //var pUrl = "AKM330.aspx?argDocNo=" + document.all.tbDocNo.value + "&argMode=m&Caller=AKT116";//Cola 額外傳Caller用以判斷是否為AKT116呼叫
                var pUrl = "AKM330.aspx?argDocNo=" + document.all.tbDocNo.value + "&argMode=m&Caller=AKT116&SAMLart=" + document.all.H_Artif.value;
                //1060601 Cloud 1050087 升級二代，調整開啟寬度
                //jf_OpenChildWin(pUrl, "AKM330", 800, 600);
                jf_OpenChildWin(pUrl, "AKM330", 1200, 600);
                //window.open(pUrl);
                Page_BlockSubmit = true;
                break;

            case "btChange":
                //檢核必須有選擇退文註記才可更新註記 #2007.02.28 Andy
                if (document.all["rbRejectDoc"].checked && document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
                {
                    var ErrMsg = "下列欄位不可空白：\n";
                    if (document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
                        ErrMsg += "註記\n";
                    jf_ShowMeg(ErrMsg, ErrMsgTitle);
                    Page_BlockSubmit = true;
                    return;
                }

                var indexDesc;
                for (i = 1; i < rowscount + 1; i++)
                {
					if (document.all["cbChange"+i].checked ==  true){
                        var strDocNo = AKT116_DocList.Info[i - 1].Doc_No;
                        Update_Table(strDocNo, i);

                    }
                    else
                        continue;
                }

                //不論點收或退文執行後皆跳回點收避免誤退文 #2007.02.28 Andy
                document.all["rbAcceptDoc"].checked = true;
                document.all["dlAcceptDoc"].options.selectedIndex = 0;
                document.all["tbTxDesc"].value = "";

                Page_BlockSubmit = true;
                break;
        }
    }
}



/********************************* 畫面欄位處理 ********************************************/
//避免使用者輸入 "," 與 ";"  <---特殊用途
function DoFilterStr(argColName)
{
    var strTag = document.all[argColName].value;
    var strTmp = "";
    var strBuf = "";
    for (i = 0; i < strTag.length; i++)
    {
        strBuf = strTag.substring(i, i + 1);
        if (strBuf == "," || strBuf == ";") strBuf = "";
        strTmp += strBuf;
    }
    document.all[argColName].value = strTmp;
}

function DoClick(argColName)
{
    if (argColName == "rbAcceptDoc")
    {
        
        document.all["dlAcceptDoc"].options.selectedIndex = 0;
        
        document.all["cbDelayAttFlag"].disabled = false;

    }
    else if (argColName == "rbRejectDoc")
    {
        document.all["dlAcceptDoc"].options.selectedIndex = 0;
        
        document.all["cbDelayAttFlag"].disabled = true;
    }

}

function CallSearchData(argDocNo)
{
    
    var param = new Array(1);
    param[0] = argDocNo;
    RtnObj = jf_CallWS("AKT116WS.asmx", "SearchData", false, param);

    if (jf_IsWebServiceSuccess(RtnObj))
    { return RtnObj.value; }
}

//1100204 Zen 1090927 取消使用document.activeElement
//function TbOnBlur(argTextBox)
//{
//    //alert(event.srcElement.id)
//    var xObjectName = document.activeElement.id;

//    if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancelImg") || (xObjectName == "btCancel"))
//        return;

    

//    //分類號
//    if (argTextBox == "txClsNo")
//    {
//        if (document.all["txClsNo"].value == "")
//            return;
//        var KeyValue1 = new Array(1);
//        KeyValue1[0] = document.all["txClsNo"].value;
//        var param1 = new Array(1);
//        param1[0] = KeyValue1;
//        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA", false, param1);
//        iCallID_CLS = RtnObj.id;
//        OnWSResult(RtnObj);
        
//    }

//    // 案次號
//    // 改到按下確定鍵時才檢查
//    if (argTextBox == "txCaseNo")
//    {
//        if (document.all["txCaseNo"].value != "" && document.all["txClsNo"].value != "")
//            ChkCaseNoExist(document.all["txClsNo"].value, document.all["txCaseNo"].value);
//    }


//    //併案文號 -> 改叫 參照文號
//    if (argTextBox == "txComNo")
//    {
//        // 原為母文,改變併案狀態
//        if (ComType == 1)
//        {
//            if (document.all["txComNo"].value == document.all["tbDocNo"].value)
//                return;	// 沒有改變併案狀態
//            alert("公文為母文，不可改變併案文號。");
//            document.all["txComNo"].value = document.all["tbDocNo"].value;
//        }
//        else
//        {
//            if (document.all["txComNo"].value == "")
//                return;
//            var KeyValue1 = new Array(1);
//            KeyValue1[0] = document.all["txComNo"].value;
//            var param1 = new Array(1);
//            param1[0] = KeyValue1;
//            RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckMonDoc", false, param1);
//            iCallID_COM = RtnObj.id;
//            OnWSResult(RtnObj);
//        }
//    }


//}

function DlOnBlur(argDl)
{
    

}
function RepForChar(argStr, argCharFrom, argCharTo)
{
    var idx = argStr.indexOf(argCharFrom);
    while (idx != -1)
    {
        argStr = argStr.replace(argCharFrom, argCharTo);
        idx = argStr.indexOf(argCharFrom);
    }
    return argStr;
}
var iCallID_ChkUserDocPriv = null;
var strStoreNo = "";



var gInsertContent = "";

function Insert_Table(argDocNo, IsBatch, IsInsertFinally)
{
    //var DeptNo = Array(2);
    //95.10.23 David
    var DeptNo = Array(4);
    DeptNo = GetDeptNo(argDocNo);
    if (DeptNo[1] == "")
    {
        Msg = "公文文號:" + argDocNo + " 無承辦單位資訊!!" + "\n" + "註：本份公文仍可點收。";
        strErrMsg = FormatStr(jf_GetErrMsg(CustErr), new Array([Msg])) + "\n";
        jf_ShowMeg(strErrMsg, "");
    }
    else
    {
        
        var param = new Array(3);
        param[0] = DeptNo[0];
        param[1] = document.all.txUser.value;
        param[2] = argDocNo;
        
        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "ChkUserDocPriv", false, param);
        iCallID_ChkUserDocPriv = RtnObj.id;
        strStoreNo = "";
        OnWSResult(RtnObj);

        if (strStoreNo == "")  //無庫房代碼=無權限
        {
            CompareFlag = false;
            
            if (document.all.h_StoreMode && document.all.h_StoreMode.value == "1")
            {
                
                var StoreName = AK.AKT116_SMEG.GetStoreName(document.all["H_ORGNO"].value, document.all.tbDocNo.value).value;
                Msg = "抱歉!!公文文號:" + document.all.tbDocNo.value + " 歸檔庫房為" + StoreName + " 非您所管理歸檔庫房公文，系統不允許您點收。";

            }
            else
            {
                Msg = "抱歉!!公文文號:" + document.all.tbDocNo.value + " 承辦單位為" + DeptNo[1] +
					"非您所管理的承辦單位公文，系統不允許您點收。";
            }
            strErrMsg = FormatStr(jf_GetErrMsg(CustErr), new Array([Msg])) + "\n";
            jf_ShowMeg(strErrMsg, "");
            RecordNO--;
            
            $('#tbDocNo').focus();
            return;
        }
    }  // if (DeptNo == "")

    var strDOC_NO = argDocNo;
    var strType = "";
    var strTypeDesc = "";
    var strTxNo = "";
    var strTxNoDesc = "";
    var strTxDesc = "";
    var strErrType = "";
    var stridx = "";
    if (document.all["rbAcceptDoc"].checked)  //作業別
    {
        strType = "20";
        strTypeDesc = "點收";
        strTxNo = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value;
        
        strTxNoDesc = HtmlEncode(document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text);
        stridx = document.all["dlAcceptDoc"].selectedIndex;
    }
    else if (document.all["rbRejectDoc"].checked)
    {
        strType = "15";
        strTypeDesc = "退文";
        strTxNo = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value;
        
        strTxNoDesc = HtmlEncode(document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text);
        stridx = document.all["dlAcceptDoc"].selectedIndex;
        
    }
    
    var strTxDesc = HtmlEncode(document.all["tbTxDesc"].value);
    

    var strDelayAttFlag;
    

    

    uCloseDate = DeptNo[2];
    
    var strExtfileDate = "";
    uExtfileDate = DeptNo[3];

    if (document.all.cbDelayAttFlag.checked == true)
        strDelayAttFlag = "Y";
    else
        strDelayAttFlag = "N";
    
    var insertContent = "";
    var newHTML = "";

    
    AKT116_Detail = CallSearchData(argDocNo);
    //1120605	Joe		1120361		弱掃修正XSS--S
	/*
    var strCloseDate = AKT116_Detail.Info.DOC_EXEC_DATE;
    
    var strSecNo = AKT116_Detail.Info.Sec_No;
    var strSecName = AKT116_Detail.Info.SEC_NAME;
    var strSecDate = AKT116_Detail.Info.EXTRMVSEC_DATE;
    var strSecCond = AKT116_Detail.Info.RMVSEC_COND;
    var strPDueDate = AKT116_Detail.Info.PDUE_DATE;
    ////2014.02.12 Gabby[1040075]--END

    var strDocFileType = AKT116_Detail.Info.DocFile_Type;
    var strSEND_DNM = AKT116_Detail.Info.SEND_DNM;
    //Cola 000991 新增帶出承辦單位 -- start --
    var strDept_Name = AKT116_Detail.Info.Dept_Name;
    //Cola -- end --

    //[001480]Cola 新增帶出結案別
    var strCLOSE_TYPE = AKT116_Detail.Info.CLOSE_TYPE;
    //[001697]Cola 新增帶出DOC_D資訊
    var strDOC_D = AKT116_Detail.Info.DOC_NO1;
	*/
    var strCloseDate = HtmlEncode(AKT116_Detail.Info.DOC_EXEC_DATE);
    
    var strSecNo = HtmlEncode(AKT116_Detail.Info.Sec_No);
    var strSecName = HtmlEncode(AKT116_Detail.Info.SEC_NAME);
    var strSecDate = HtmlEncode(AKT116_Detail.Info.EXTRMVSEC_DATE);
    var strSecCond = HtmlEncode(AKT116_Detail.Info.RMVSEC_COND);
    var strPDueDate = HtmlEncode(AKT116_Detail.Info.PDUE_DATE);
    ////2014.02.12 Gabby[1040075]--END

    var strDocFileType = HtmlEncode(AKT116_Detail.Info.DocFile_Type);
    var strSEND_DNM = HtmlEncode(AKT116_Detail.Info.SEND_DNM);
    //Cola 000991 新增帶出承辦單位 -- start --
    var strDept_Name = HtmlEncode(AKT116_Detail.Info.Dept_Name);
    //Cola -- end --

    //[001480]Cola 新增帶出結案別
    var strCLOSE_TYPE = HtmlEncode(AKT116_Detail.Info.CLOSE_TYPE);
    //[001697]Cola 新增帶出DOC_D資訊
    var strDOC_D = HtmlEncode(AKT116_Detail.Info.DOC_NO1);
    //1120605	Joe		1120361		弱掃修正XSS--E

    //Cola 000991 將退文單位(承辦/歸檔)塞入 -- start --
    if (document.all["rbType1"].checked)  //退文至承辦單位
        AKT116_Detail.Info.RTN_UNIT_TYPE = "1";
    else if (document.all["rbType2"].checked)
        AKT116_Detail.Info.RTN_UNIT_TYPE = "2";

    // var strRTN_UNIT_TYPE = AKT116_Detail.Info.RTN_UNIT_TYPE;
    //1120605	Joe		1120361		弱掃修正XSS
    var strRTN_UNIT_TYPE = HtmlEncode(AKT116_Detail.Info.RTN_UNIT_TYPE);
    //Cola -- end

    //var strErrMsg = AKT116_Detail.Info.Err_Msg;
    var idx = AKT116_Detail.Info.Err_Msg.indexOf("<br>");
    while (idx != -1)
    {
        AKT116_Detail.Info.Err_Msg = AKT116_Detail.Info.Err_Msg.replace("<br>", "");
        idx = AKT116_Detail.Info.Err_Msg.indexOf("<br>");
    }
    AKT116_Detail.Info.Subject = RepForChar(AKT116_Detail.Info.Subject, "<", "＜");
    AKT116_Detail.Info.Subject = RepForChar(AKT116_Detail.Info.Subject, ">", "＞");
    AKT116_Detail.Info.Subject = RepForChar(AKT116_Detail.Info.Subject, "&", "＆");
    //1120612	Joe		1120361		弱掃修正XSS，特殊符號已處理過
	AKT116_Detail.Info.Subject = HtmlEncode(AKT116_Detail.Info.Subject);

    var tempDelayAttFlag = "";
    if (strDelayAttFlag == "Y")
        tempDelayAttFlag = "有";
    else if (strDelayAttFlag == "N")
        tempDelayAttFlag = "無";
    
    //1120605	Joe		1120361		弱掃修正XSS--S
    // var strFile_CLS = AKT116_Detail.Info.Cls_No;
    // var strFile_CNT = AKT116_Detail.Info.File_Cnt;     ////2010.12.10	Debra	0990593	[雲科大]調整Layout新增分頁號及頁數的資料--add strFile_CLS,strFile_CNT
    
    // var strAPP_USER_NAME = AKT116_Detail.Info.APP_USER_NAME;
    var strFile_CLS = HtmlEncode(AKT116_Detail.Info.Cls_No);
    var strFile_CNT = HtmlEncode(AKT116_Detail.Info.File_Cnt);     ////2010.12.10	Debra	0990593	[雲科大]調整Layout新增分頁號及頁數的資料--add strFile_CLS,strFile_CNT
    
    var strAPP_USER_NAME = HtmlEncode(AKT116_Detail.Info.APP_USER_NAME);
    //1120605	Joe		1120361		弱掃修正XSS--E
    
    var idChild = false;
    if (AKT116_Detail.Info.COMBINE_TYPE == "1" || AKT116_Detail.Info.COMBINE_TYPE == "2")
    {
        if (AKT116_Detail.Info.Com_No != argDocNo)
            idChild = true;
    }
    var iAattCount = 0;
    for (var i = 0; i < AKT116_Detail.Att.Doc_No.length; i++)
    {
    	if (AKT116_Detail.Att.Doc_No[i] != undefined && AKT116_Detail.Att.Doc_No[i] != null)
    	{
    		iAattCount++;
    	}
    }
	//1120612	Joe		1120361		弱掃修正XSS
    // insertContent = Insert_One_TableRow(RecordNO, strDOC_NO, strTypeDesc, strTxNo, strTxNoDesc, strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE, strDOC_D, strFile_CLS, strFile_CNT, AKT116_Detail.Info.IS_RCVFILE, AKT116_Detail.Info.RCVFILE_CNT, strAPP_USER_NAME, idChild, AKT116_Detail.Info.Com_No, iAattCount, AKT116_Detail.Info.Case_No);
    insertContent = Insert_One_TableRow(RecordNO, strDOC_NO, strTypeDesc, strTxNo, strTxNoDesc, strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE, strDOC_D, strFile_CLS, strFile_CNT, HtmlEncode(AKT116_Detail.Info.IS_RCVFILE), HtmlEncode(AKT116_Detail.Info.RCVFILE_CNT), strAPP_USER_NAME, idChild, HtmlEncode(AKT116_Detail.Info.Com_No), iAattCount, HtmlEncode(AKT116_Detail.Info.Case_No));

    

    //1060823	Leslie	IE效能調校
    if (!IsInsertFinally)
        $(document.all["DATA1"]).append(insertContent);
    else
        gInsertContent += insertContent;
    //document.all["DATA1"].innerHTML = "";

    //David 95.05.10
    //Modify by Cola 000991 新增退文類型 -- start --
    var objOption = new Option(RecordNO + "," + strDOC_NO + "," + strType + "," + strTxNo + "," + strTxNoDesc + "," + strTxDesc + "," + strErrType + "," + stridx + "," + strDelayAttFlag + "," + strExtfileDate + "," + strCloseDate + "," + strRTN_UNIT_TYPE + ",0", RecordNO + "," + strDOC_NO + "," + strType + "," + strTxNo + "," + strTxNoDesc + "," + strTxDesc + "," + stridx + "," + strErrType + "," + strDelayAttFlag + "," + strExtfileDate + "," + strCloseDate + "," + strRTN_UNIT_TYPE + ",0");
    //Cola -- end --
    

    AKT116_Detail.Info.Doc_State = strType;
    AKT116_Detail.Info.Tx_No = strTxNo;
    AKT116_Detail.Info.Tx_Desc = strTxDesc;

    AKT116_Detail.Info.DELAY_EXTFILE_DATE = strExtfileDate;
    
    AKT116_Detail.Info.Doc_No = strDOC_NO;
    


    AKT116_DocList.Info[RecordNO - 1] = AKT116_Detail.Info;
    AKT116_DocList.Att[RecordNO - 1] = AKT116_Detail.Att;
    /************************************************/
    document.all["Record"].options[(RecordNO - 1)] = objOption;
    if (document.all["tbSaveDocNo"].value != "")
        document.all["tbSaveDocNo"].value += ",";
    document.all["tbSaveDocNo"].value += "'" + strDOC_NO + "'";
    //1060817	Kevin_C	1060719	focus轉為JQuery形式
    //document.all["cbCLEAR" + RecordNO].focus();

	if(!IsInsertFinally){
        $('#cbCLEAR' + RecordNO).focus();
        document.all["cbCLEAR" + RecordNO].blur();
    }
    else
        ClearCheck(RecordNO);


    rowscount++;

    //2014.02.12 Gabby[1040075]新增點收時顯示密等與展期公文資訊功能
    if (document.all["H_ISALERT"].value == "Y")
    {
        if ((strSecNo != "1" && strSecNo != "") || strPDueDate != "")
        {
            var strOrgNo = document.all["H_ORGNO"].value;
            var strUrl = "AKT116C5.aspx?DocNo=" + strDOC_NO + "&OrgNo=" + strOrgNo + "&SecNo=" + strSecNo + "&SecName=" + escape(strSecName) + "&SecDate=" + strSecDate + "&SecCond=" + escape(strSecCond) + "&PDueDate=" + strPDueDate;
            var ret = jf_ShowModal(strUrl, 500, 350);
        }
    }
    //2014.02.12 Gabby[1040075]--END

    //1000713 Davy [1000129] 若為單筆輸入，直接顯示訊息
    if (AKT116_Detail.Info.IS_RCVFILE == "是")
        if (!IsBatch)
            //1060601 Cloud 本來已有Doc_No 直接使用Doc_No
            //alert("公文文號："+AKT116_Detail.Info.DOC_NO+"有紙本來文需要歸檔！");
            alert("公文文號：" + AKT116_Detail.Info.Doc_No + "有紙本來文需要歸檔！");
        else
            return true;

    return false;
}

function ClientOnLoad()
{
    

    
    if (document.all["IS_MOTC"].value == "0")
    {
        if (document.all["txAK_AKT116_SHOW_CLOSETYPE"].value != "Y")
        {
            if (document.all["AKT116_DOC_D"].value != "Y")
            {
                document.all["lbCloseType"].style.display = "none";
                document.all["lbDOC_D"].style.display = "none";
                document.all["TableTitle"].style.width = "100%";
               
                document.all["divSignArea"].style.width = "99.5%";
                document.all["lbDect"].style.width = "2em";
                document.all["lbSendDept"].style.width = "6em";
                document.all["lbDept"].style.width = "5.5em";
                Deptlength = "5.5em";
                SendDeptlength = "6em";
            }
            else
            {
                document.all["lbCloseType"].style.display = "none";
                document.all["TableTitle"].style.width = "100%";
                //1060224 Cloud	1050087 升級二代
                /*document.all["lbDOC_D"].style.width = "80px";
				document.all["lbDOC_D"].innerHTML = "<FONT size='2'>相關文號</FONT>";*/
                document.all["lbDOC_D"].style.width = "5.5em";
                document.all["lbDOC_D"].innerHTML = "相關文號";
                document.all["lbDect"].style.width = "2em";

                //document.all["WorkArea"].style.width = "1200px";
                document.all["WorkArea"].style.width = "100%";
               
                document.all["divSignArea"].style.width = "100%";
                document.all["DATA1"].style.width = "100%";
                document.all["lbSendDept"].style.width = "5.5em";
                document.all["lbDept"].style.width = "5.5em";
                Deptlength = "5.5em";
                SendDeptlength = "5.5em";
            }

        }
        else
        {
            if (document.all["AKT116_DOC_D"].value != "Y")
            {
                
                document.all["divSignArea"].style.width = "100%";
                document.all["lbDOC_D"].style.display = "none";
                //1060224 Cloud	1050087 升級二代
                //document.all["TableTitle"].style.width = "830px";
                document.all["TableTitle"].style.width = "100%";
                document.all["lbSendDept"].style.width = "7em";
                document.all["lbDept"].style.width = "7.5em";
                SendDeptlength = "7em";
                Deptlength = "7.5em";

            }
            else
            {
                
                document.all["TableTitle"].style.width = "100%";
                document.all["lbDOC_D"].style.width = "5.5em";
                document.all["lbDOC_D"].innerHTML = "相關文號";

                
                document.all["WorkArea"].style.width = "100%";
                
                document.all["divSignArea"].style.width = "100%";
                document.all["DATA1"].style.width = "100%";
                document.all["lbSendDept"].style.width = "4.5em";
                document.all["lbDept"].style.width = "4.5em";
                Deptlength = "4.5em";
                SendDeptlength = "4.5em";
                document.all["lbDect"].style.width = "5em";
                lbdectlength = "5em";
            }

        }
    }
        
    else
    {
        
        document.all["divSignArea"].style.width = "100%";
        document.all["lbWorkType"].style.display = "none";//作業別
        document.all["lbRejectType"].style.display = "none";//退文類型
        document.all["lbCloseType"].style.display = "none";
        document.all["lbDOC_D"].style.display = "none";
        //1060224 Cloud	1050087 升級二代
        //document.all["TableTitle"].style.width = "736px";			
        document.all["TableTitle"].style.width = "100%";
        document.all["lbMark"].innerHTML = "點收註記";
        //1060224 Cloud	1050087 升級二代
        document.all["lbSendDept"].style.width = "9em";
        document.all["lbDept"].style.width = "8.5em";
        Deptlength = "8.5em";
        SendDeptlength = "9em";
        document.all["lbDect"].style.width = "7em";
        document.all["lbErrMsg"].style.width = "7m";
        lbdectlength = "7em";
        lbErrmsglength = "7em";

    }
    //Cola -- end -- 	
    document.all["TableTitle"].style.display = "";
    //10602223 Cloud 1050087 升級二代
    //ShowMsg();
    jf_ShowValidator();

    if (document.all["Label13"].className.toLowerCase() != "hide"){	//系統參數RTN_RCVDEPT設為"3,4,5"時，才作下列處理
        strDefaultType = strDefaultType + document.all.H_DefaultType.value;	//組成"rbType1"或"rbType2"
		//* 2021.01.15	Cloud	1090997	修正新增單筆公文時退文對象一律使用系統參數的bug-僅開啟時使用預設值
		document.all[strDefaultType].checked = true;
	}

    //1040330 Gabby[1040141]修正弱點	
    if (document.all["txMsg"].value != "") {
        //1120606   Joe     1120361     弱掃修正XSS--S
        //document.all["lbMsg"].innerHTML = document.all["txMsg"].value.replace('&lt;/g', '<');
        var Msg = document.all["txMsg"].value.split('|');
        var MsgC = document.all["txMsgColor"].value.split('|');
        var Rtn = '';

        for (var i = 0 ; i < Msg.length; i++) {
            if (Rtn != "") {
                Rtn += "<br><br>"
            }
            if (MsgC[i] == "B")
                Rtn += "<font color='blue'>";
            else if (MsgC[i] == "R")
                Rtn += "<font color='red'>";

            Rtn += HtmlEncode(Msg[i]) + '</font>';
        }
        document.all["lbMsg"].innerHTML = Rtn;
        //1120606   Joe     1120361     弱掃修正XSS--E
    }
    //1040330 Gabby[1040141]修正弱點--END
}


//confirm or 確定鍵
function Update_Table(argDocNo, rowNo)
{
    var strDOC_NO = argDocNo;
    var strType = "";
    var strTypeDesc = "";
    var strTxNo = "";
    var strTxNoDesc = "";
    var strTxDesc = "";
    var stridx = "";
    var strErrType = "";
    
    if (document.all["rbAcceptDoc"].checked)  //作業別
    {
        strType = "20";
        strTypeDesc = "點收";
        strTxNo = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value;
        
        strTxNoDesc = HtmlEncode(document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text);
        stridx = document.all["dlAcceptDoc"].selectedIndex;
        
    }
    else if (document.all["rbRejectDoc"].checked)
    {
        strType = "15";
        strTypeDesc = "退文";
        strTxNo = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value;
        
        strTxNoDesc = HtmlEncode(document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text);
        stridx = document.all["dlAcceptDoc"].selectedIndex;
        
    }
    
    var strTxDesc = HtmlEncode(document.all["tbTxDesc"].value);
    
    var oldHTML_Head;
    var oldHTML_Back;
    var InsertContent = "";
    var newHTML = "";

    var strDelayAttFlag;
    
    var strCloseDate = HtmlEncode(document.all["txCloseDate"].value);
    var strExtfileDate = HtmlEncode(document.all["txExtfileDate"].value);
    //1070709 Zen 1070678 弱掃XSS修正--end
    if (document.all.cbDelayAttFlag.checked == true)
        strDelayAttFlag = "Y";
    else
        strDelayAttFlag = "N";
    
    var strDocFileType = GetDocFileType(strDOC_NO);

    //0970328 Cola 0970255 Add
    //new position for get DocFileType
    AKT116_Detail = CallSearchData(argDocNo);

	//1120612	Joe		1120361		弱掃修正XSS--S
	/*
    var strSEND_DNM = AKT116_Detail.Info.SEND_DNM;

    //Cola 000991 新增帶出承辦單位 -- start --
    var strDept_Name = AKT116_Detail.Info.Dept_Name;
    //Cola -- end --

    //[001480]Cola 新增結案別
    var strCLOSE_TYPE = AKT116_Detail.Info.CLOSE_TYPE;

    //[001697]Cola 新增帶出DOC_D資訊
    var strDOC_D = AKT116_Detail.Info.DOC_NO1;
	*/
    var strSEND_DNM = HtmlEncode(AKT116_Detail.Info.SEND_DNM);

    //Cola 000991 新增帶出承辦單位 -- start --
    var strDept_Name = HtmlEncode(AKT116_Detail.Info.Dept_Name);
    //Cola -- end --

    //[001480]Cola 新增結案別
    var strCLOSE_TYPE = HtmlEncode(AKT116_Detail.Info.CLOSE_TYPE);

    //[001697]Cola 新增帶出DOC_D資訊
    var strDOC_D = HtmlEncode(AKT116_Detail.Info.DOC_NO1);
	//1120612	Joe		1120361		弱掃修正XSS--E


    //Cola 000991 將退文單位(承辦/歸檔)塞入 -- start --
    var strRTN_UNIT_TYPE = "";
    if (document.all["rbType1"].checked)  //退文至承辦單位
        strRTN_UNIT_TYPE = "1";
    else if (document.all["rbType2"].checked)
        strRTN_UNIT_TYPE = "2";
    //Cola -- end		

    //var strErrMsg = GetDocErrMsg(strDOC_NO);

    var tempDelayAttFlag = "";
    if (strDelayAttFlag == "Y")
        tempDelayAttFlag = "有";
    else if (strDelayAttFlag == "N")
        tempDelayAttFlag = "無";

    //Modify by Cola 000991 新增兩欄位 strDept_Name:承辦單位, strRTN_UNIT_TYPE:退文類型 -- start --		
    

	//1120612	Joe		1120361		弱掃修正XSS
    // var strFile_CLS = AKT116_Detail.Info.Cls_No;
    // var strFile_CNT = AKT116_Detail.Info.File_Cnt;
    
    // var strAPP_USER_NAME = AKT116_Detail.Info.APP_USER_NAME;
    var strFile_CLS = HtmlEncode(AKT116_Detail.Info.Cls_No);
    var strFile_CNT = HtmlEncode(AKT116_Detail.Info.File_Cnt);
    
    var strAPP_USER_NAME = HtmlEncode(AKT116_Detail.Info.APP_USER_NAME);
    
    var idChild = false;
    if (AKT116_Detail.Info.COMBINE_TYPE == "1" || AKT116_Detail.Info.COMBINE_TYPE == "2")
    {
        if (AKT116_Detail.Info.Com_No != argDocNo)
            idChild = true;
    }
    var iAattCount = 0;
    for(var i=0;i<AKT116_Detail.Att.Doc_No.length;i++)
    {
    	if(AKT116_Detail.Att.Doc_No[i]!=undefined && AKT116_Detail.Att.Doc_No[i]!=null)
    	{
    		iAattCount++;
    	}
    }
	//1120612	Joe		1120361		弱掃修正XSS
    // insertContent = Insert_One_TableRow(rowNo, strDOC_NO, strTypeDesc, strTxNo, strTxNoDesc, strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE, strDOC_D, strFile_CLS, strFile_CNT, AKT116_Detail.Info.IS_RCVFILE, AKT116_Detail.Info.RCVFILE_CNT, strAPP_USER_NAME, idChild, AKT116_Detail.Info.Com_No, iAattCount, AKT116_Detail.Info.Case_No);
    insertContent = Insert_One_TableRow(rowNo, strDOC_NO, strTypeDesc, strTxNo, strTxNoDesc, strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE, strDOC_D, strFile_CLS, strFile_CNT, HtmlEncode(AKT116_Detail.Info.IS_RCVFILE), HtmlEncode(AKT116_Detail.Info.RCVFILE_CNT), strAPP_USER_NAME, idChild, HtmlEncode(AKT116_Detail.Info.Com_No), iAattCount, HtmlEncode(AKT116_Detail.Info.Case_No));
    //Cola -- end --
    
    $(document.all["DATA1"]).find("DIV[id='" + rowNo + "']").replaceWith(insertContent);
    /**************************************************************************************************/
    if (UpdateFlag == 0)
    {
        
        AKT116_DocList.Info[rowNo - 1].Doc_No = strDOC_NO; //951354 註記更改時抓不到tbDocNo by whay
        AKT116_DocList.Info[rowNo - 1].Doc_State = strType;
        

        //Cola 000991 將退文單位(承辦/歸檔)塞入 -- start --
        if (document.all["rbType1"].checked)  //退文至承辦單位
            AKT116_DocList.Info[rowNo - 1].RTN_UNIT_TYPE = "1";
        else if (document.all["rbType2"].checked)
            AKT116_DocList.Info[rowNo - 1].RTN_UNIT_TYPE = "2";
        //Cola -- end		   

        
        if (document.all["txClsNo"].value != "")
            AKT116_DocList.Info[rowNo - 1].Cls_No = document.all["txClsNo"].value;
        
        if (document.all["txComNo"].value != "")
            AKT116_DocList.Info[rowNo - 1].Com_No = document.all["txComNo"].value;
        if (document.all["txCaseNo"].value != "")
            AKT116_DocList.Info[rowNo - 1].Case_No = document.all["txCaseNo"].value;
        if (document.all["txCaseName"].value != "")
            AKT116_DocList.Info[rowNo - 1].Case_Name = document.all["txCaseName"].value;
        

        AKT116_DocList.Info[rowNo - 1].Tx_No = strTxNo;
        AKT116_DocList.Info[rowNo - 1].Tx_Desc = strTxDesc;
        AKT116_DocList.Info[rowNo - 1].Err_Type = strErrType;

        AKT116_DocList.Info[rowNo - 1].Extfile_Date = strExtfileDate;
        AKT116_DocList.Info[rowNo - 1].Delay_Att_Flag = strDelayAttFlag;

        
    }
    else if (UpdateFlag == 1)
    {
        UpdateFlag = 0;
        //Cola 000991 將退文單位(承辦/歸檔)塞入 -- start --
        if (document.all["rbType1"].checked)  //退文至承辦單位
            AKT116_DocList.Info[rowNo - 1].RTN_UNIT_TYPE = "1";
        else if (document.all["rbType2"].checked)
            AKT116_DocList.Info[rowNo - 1].RTN_UNIT_TYPE = "2";
        //Cola -- end		
        AKT116_DocList.Info[rowNo - 1].Doc_State = strType;
        AKT116_DocList.Info[rowNo - 1].Tx_No = strTxNo;
        AKT116_DocList.Info[rowNo - 1].Tx_Desc = strTxDesc;
    }
    /**************************************************************************************************/
    //David 95.05.10
    //Modify by Cola 000991 新增退文類型欄位 strRTN_UNIT_TYPE -- start --
    //[001480]新增結案別
    document.all["Record"].options[rowNo - 1].text = rowNo + "," + strDOC_NO + "," + strType + "," + strTxNo + "," + strTxNoDesc + "," + strTxDesc + "," + strErrType + "," + stridx + "," + strDelayAttFlag + "," + strExtfileDate + "," + strCloseDate + "," + strRTN_UNIT_TYPE;
    document.all["Record"].options[rowNo - 1].value = rowNo + "," + strDOC_NO + "," + strType + "," + strTxNo + "," + strTxNoDesc + "," + strTxDesc + "," + strErrType + "," + stridx + "," + strDelayAttFlag + "," + strExtfileDate + "," + strCloseDate + "," + strRTN_UNIT_TYPE;
    //Cola -- end --
    document.all["cbCLEAR" + (rowNo)].checked = false;

}

/******************************************************************
新增資料至Table中
SEQ:序
DOC_NO:文號
TYPE:檔案種類
TxNo:
TxNoDesc:
TxDesc:備註
DocFileType:檔案種類
argSEND_DNM:歸檔單位
******************************************************************/
function Insert_One_TableRow(SEQ, DOC_NO, Type, TxNo, TxNoDesc, TxDesc, DocFileType, argSEND_DNM, argDelayAttFlag, argExtfileDate, argCloseDate, argDept_Name, argRTN_UNIT_TYPE, argCLOSE_TYPE, argDOC_D, argFile_CLS, argFile_CNT, argIS_RCVFILE, argRCVFILE_CNT, argAPP_USER_NAME, argIsChild, argComNo, argAttCount,argFile_Case)
{
    //1060224 Cloud	1050087 升級二代
    //var param = new Array(new Array(DOC_NO));
    var param = new Array(DOC_NO);
    RtnObj = jf_CallWS("AKT116WS.asmx", "GetCl_Inf", false, param);
    var Err_Type = "";
    var Err_Msg = "";
    if (jf_IsWebServiceSuccess(RtnObj))
    {
        Err_Type = RtnObj.value.Info.Err_Type;
		//1120605	Joe		1120361		弱掃修正XSS
        // Err_Msg = RtnObj.value.Info.Err_Msg;
        Err_Msg = HtmlEncode(RtnObj.value.Info.Err_Msg);
    }
    // AKT116 畫面美工 by whay
    if (TxNoDesc == "")
        TxNoDesc = "&nbsp;";
    if (argExtfileDate == "")
        argExtfileDate = "&nbsp;";
    if (argCloseDate == "")
        argCloseDate = "&nbsp;";
    if (TxDesc == "")
        TxDesc = "&nbsp;";
    if (Err_Msg == "")
        Err_Msg = "&nbsp;";
    var InsertContent = "";
    var InsertContentBegin = "";
    var InsertContentErrType = "";
    var InsertContentEnd = "";

   

    //Cola 000991 依據傳入之退文類型轉換為中文字 -- start -- (當作業別為點收時, 顯示空值)
    var RTN_UNIT_TYPE = "無";
    if (Type == "退文")
    {
        if (argRTN_UNIT_TYPE == "1")
            RTN_UNIT_TYPE = "承辦";
        else if (argRTN_UNIT_TYPE == "2")
        {
            //1040327	Cloud	[1040185] (中榮)改為退回發文	
            if (document.all.AK_BackToIssue.value == "Y")
                RTN_UNIT_TYPE = "總發";
            else
                RTN_UNIT_TYPE = "歸檔";
        }
    }

    //[001480]Cola 依據CLOSE_TYPE轉為發 or 存
    var CLOSE_TYPE = "";
    if (argCLOSE_TYPE == "1" || argCLOSE_TYPE == "2")
        CLOSE_TYPE = "發";
    else
        CLOSE_TYPE = "&nbsp;";
    //Cola -- end --

    //[001697]Cola
    var DOC_D = "";
    if (argDOC_D == "")
        DOC_D = "&nbsp;";
    else
        DOC_D = argDOC_D;
    //Cola -- end --		

    //1060224 	Cloud	1050087 升級二代
    /*InsertContentBegin = "<TR id=" + SEQ + ">"+
					"<TD style='WIDTH: 30px' bgColor='#F7F7DE' align='middle'><font size='2'>";*/
    InsertContentBegin = "<DIV class='dTR' id=" + SEQ + ">" +
					"<DIV style='width: 2em' align='middle' class='Datalist' >";
    /*InsertContentBegin = "<TR id=" + SEQ + ">"+
					"<TD style='WIDTH: 30px' bgColor='#F7F7DE' align='middle'><font size='2'>";*/

    //[001480]Modify by Cola 透過系統參數決定要塞入之資訊 -- start --
    if (document.all["txAK_AKT116_SHOW_CLOSETYPE"].value == "N")
    {
        
        InsertContentEnd = "</DIV><DIV class='Datalist WD_1' align='middle'>";
		
		if (argIsChild)
			InsertContentEnd += "<input id='cbCLEAR" + SEQ + "' childSeqNo='" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' tabindex='-1' style='opacity: 0.4;pointer-events: none;' ClearComNo='" + argComNo + "'/></DIV>";
		else
			InsertContentEnd += "<input id='cbCLEAR" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' onclick='ClearCheck()' tabindex='-1'/></DIV>";
        
        InsertContentEnd += "<DIV class='Datalist WD_1' align='middle'>";
        
        if (argIsChild)
            InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + " tabindex='-1' style='opacity: 0.4;pointer-events: none;' ComNo='" + argComNo + "'/></DIV>";
        else
            InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + "' onclick='CheckChild(cbChange" + SEQ + "," + DOC_NO + ")' tabindex='-1'/></DIV>";

        InsertContentEnd += "<DIV class='Datalist WD_1H' >" + SEQ + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_5H' ><a id='NO" + SEQ + "' href='javascript:SelectRow()' tabindex='-1'>" + DOC_NO + "</a></DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2' >" + GetDocFileTypeDesc(DocFileType) + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2' >" + argFile_CNT + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2' >" + argIS_RCVFILE + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2' >" + argRCVFILE_CNT + "</DIV>";
        if (argAttCount!="0")
            InsertContentEnd += "<DIV class='Datalist WD_2' style='BACKGROUND: YELLOW' ><a id='ATT" + SEQ + "' href='javascript:OpenAKM336(" + DOC_NO + ")' tabindex='-1'>" + argAttCount + "</a></DIV>";
        else
            InsertContentEnd += "<DIV class='Datalist WD_2' >0</DIV>";
        if (argIS_RCVFILE == "是" && argRCVFILE_CNT == "0")
        {
            if (Err_Msg != "")
                Err_Msg += "<BR>";
            Err_Msg += "紙本來文併同歸檔數量不可為0";
        }
        
        InsertContentEnd += "<DIV style='WIDTH: " + SendDeptlength + "' class='Datalist'>" + argSEND_DNM + "</DIV>";
        InsertContentEnd += "<DIV style='WIDTH: " + Deptlength + "' class='Datalist'>" + argDept_Name + "</DIV>";

        
        if (document.all["IS_MOTC"].value != "1")
        {
            
            InsertContentEnd += "<DIV class='Datalist WD_2'>" + Type + "</DIV>";
            InsertContentEnd += "<DIV class='Datalist WD_2'>" + RTN_UNIT_TYPE + "</DIV>";
        }
        
        InsertContentEnd += "<DIV class='Datalist WD_7'>" + TxNoDesc + "</DIV>";

        InsertContentEnd += "<DIV class='Datalist WD_2'>" + argDelayAttFlag + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4'>" + argExtfileDate + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4'>" + argCloseDate + "</DIV>";

        InsertContentEnd += "<DIV class='Datalist WD_4H'>" + argFile_CLS + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4H'>" + argFile_Case + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_3'>" + argAPP_USER_NAME + "</DIV>";

        
        InsertContentEnd += "<DIV style='WIDTH: " + lbdectlength + "' class='Datalist'>" + TxDesc + "</DIV>";
        InsertContentEnd += "<DIV style='WIDTH: " + lbErrmsglength + "' class='Datalist'>" + Err_Msg + "</DIV>";
        //此段先不用信保為客製化
        /*if (document.all["AKT116_DOC_D"].value == "Y" && document.all["IS_MOTC"].value == "0")
        {
            InsertContentEnd += "<DIV style='WIDTH: 5.5em' class='Datalist'>" + DOC_D.replace(/,/gi, "<br>") + "</DIV>";
        }*/

        //1060224 	Cloud	1050087 升級二代					
        //InsertContentEnd+="</font></TR>";
        InsertContentEnd += "</div>";
    }
    else if (document.all["txAK_AKT116_SHOW_CLOSETYPE"].value == "Y")
    {
       
        InsertContentEnd = "</DIV><DIV class='Datalist WD_1' align='middle'>";
		//1081119 Cloud [1080980] 彙併辦子文不可單獨退文-補強取消部分
		if (argIsChild)
			InsertContentEnd += "<input id='cbCLEAR" + SEQ + "' childSeqNo='" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' tabindex='-1' style='opacity: 0.4;pointer-events: none;' ClearComNo='" + argComNo + "'/></DIV>";
		else
        InsertContentEnd += "<input id='cbCLEAR" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' onclick='ClearCheck()' tabindex='-1'/></DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_1'  align='middle'>";
        if (argIsChild)
            InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + " tabindex='-1' style='opacity: 0.4;pointer-events: none;' ComNo='" + argComNo + "'/></DIV>";
        else
            InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + "' onclick='CheckChild('cbChange" + SEQ + "','" + DOC_NO + "')' tabindex='-1'/></DIV>";

        InsertContentEnd += "<DIV class='Datalist WD_1H'>" + SEQ + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_5H'><a id='NO" + SEQ + "' href='javascript:SelectRow()' tabindex='-1'>" + DOC_NO + "</a></DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2'>" + GetDocFileTypeDesc(DocFileType) + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2'>" + argFile_CNT + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2'>" + argIS_RCVFILE + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2'>" + argRCVFILE_CNT + "</DIV>";


        InsertContentEnd += "<DIV style='WIDTH: " + SendDeptlength + "' class='Datalist'>" + argSEND_DNM + "</DIV>";
        InsertContentEnd += "<DIV style='WIDTH: " + Deptlength + "' class='Datalist'>" + argDept_Name + "</DIV>";

        //[0970650]Modify by Cola 若為交通部不顯示
        if (document.all["IS_MOTC"].value != "1")
        {
            InsertContentEnd += "<DIV class='Datalist WD_2'>" + Type + "</DIV>";
            InsertContentEnd += "<DIV class='Datalist WD_2'>" + RTN_UNIT_TYPE + "</DIV>";
        }
        
        InsertContentEnd += "<DIV class='Datalist WD_7'>" + TxNoDesc + "</DIV>";

        InsertContentEnd += "<DIV class='Datalist WD_2'>" + argDelayAttFlag + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4'>" + argExtfileDate + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4'>" + argCloseDate + "</DIV>";

        
        if (document.all["IS_MOTC"].value != "1")
            
            InsertContentEnd += "<DIV class='Datalist WD_2'>" + CLOSE_TYPE + "</DIV>";

        
        InsertContentEnd += "<DIV class='Datalist WD_4H'>" + argFile_CLS + "</DIV>";

        
        InsertContentEnd += "<DIV style='WIDTH: 3em' class='Datalist'>" + argAPP_USER_NAME + "</DIV>";
        InsertContentEnd += "<DIV style='WIDTH: " + lbdectlength + "' class='Datalist'>" + TxDesc + "</DIV>";
        InsertContentEnd += "<DIV style='WIDTH: " + lbErrmsglength + "' class='Datalist'>" + Err_Msg + "</DIV>";




        
        if (document.all["AKT116_DOC_D"].value == "Y" && document.all["IS_MOTC"].value != "1")
        
            InsertContentEnd += "<DIV style='WIDTH: 5.5em' class='Datalist'>" + DOC_D.replace(/,/gi, "<br>") + "</DIV>";

        
        InsertContentEnd += "</DIV>";
    }
    

    switch (Err_Type)
    {
        case "W"://警告
    
            InsertContentErrType = "<a id= 'img_" + SEQ + "' href='javascript:jf_OpenAKT116C2(\"" + HtmlEncode(DOC_NO) + "\")' tabindex ='-1'><font color='red' size='2'>錯誤</font></a>";
            break;
        case "E"://錯誤
    
            InsertContentErrType = "<a id= 'img_" + SEQ + "' href='javascript:jf_OpenAKT116C2(\"" + HtmlEncode(DOC_NO) + "\")' tabindex ='-1'><font color='red' size='2'>錯誤</font></a>";
            break;
        case "1"://有錯誤且有警告
    
            InsertContentErrType = "<a id= 'img_" + SEQ + "' href='javascript:jf_OpenAKT116C2(\"" + HtmlEncode(DOC_NO) + "\")' tabindex ='-1'><font color='red' size='2'>錯誤</font></a>";
            break;
        default:
    
            InsertContentErrType = "<font color='green' size='2'>正常</font>";
            break;
    }
    InsertContent = InsertContentBegin + InsertContentErrType + InsertContentEnd;
    return InsertContent;
}

function SelectRow()
{
    IsClsChecked = false;
    IsCanUseInitCase = false;

    var xObjectName = document.activeElement.id;
    var rowNO = xObjectName.substring(2, xObjectName.length);
    var Record = document.all["Record"].options[rowNO - 1].text;	//David	95.05.10
    var DATA = new Array(Record.length);		//David
    DATA = Record.split(",");
    document.all["tbDocNo"].value = DATA[1];
    //David	95.05.10	
    if (DATA[10] == null)
        document.all["txCloseDate"].value = "";
    else
        document.all["txCloseDate"].value = DATA[10];

    if (DATA[9] == null)
        document.all["txExtfileDate"].value = "";
    else
        document.all["txExtfileDate"].value = DATA[9];

    if (DATA[8] == "Y")
    {
        document.all["cbDelayAttFlag"].checked = true;
    }
    if (DATA[8] == "N")
    {
        document.all["cbDelayAttFlag"].checked = false;
    }
    if (DATA[2] == "20")
    {
        document.all["rbAcceptDoc"].checked = true;
        
        document.all["dlAcceptDoc"].options.selectedIndex = parseInt(DATA[3], 10);		//David 95.05.11
        
    }
    else if (DATA[2] == "15")
    {
        document.all["rbRejectDoc"].checked = true;
        
        document.all["dlAcceptDoc"].options.selectedIndex = parseInt(DATA[3], 10);		//David	95.05.11
    }
    document.all["tbTxDesc"].value = DATA[5];
    /*************************************************************************/
    
    document.all["txClsNo"].value = AKT116_DocList.Info[rowNO - 1].Cls_No;
    
    document.all["txComNo"].value = AKT116_DocList.Info[rowNO - 1].Com_No;
    document.all["txCaseNo"].value = AKT116_DocList.Info[rowNO - 1].Case_No;
    document.all["txCaseName"].value = AKT116_DocList.Info[rowNO - 1].Case_Name;
    

    if (AKT116_DocList.Info[rowNO - 1].Com_No != "")
    {
        if (AKT116_DocList.Info[rowNO - 1].Com_No == AKT116_DocList.Info[rowNO - 1].Doc_No)
            ComType = 1;
        else
            ComType = 2;
    }
    else
        ComType = 0;
    
    document.all.txDocFileType.value = AKT116_DocList.Info[rowNO - 1].DocFile_Type;

    
    document.all["txDocSubject"].value = AKT116_DocList.Info[rowNO - 1].Subject;
    
    document.all["txDocSubject"].disabled = true;

    
    /*************************************************************************/
    document.all["btConfirm"].disabled = false;
    
    if (document.all["cbDelayAttFlag"].checked)
    {
        document.all["txExtfileDate"].style.backgroundColor = "FFFFFF";
        document.all["txExtfileDate"].disabled = false;
        document.all["txExtfileDate"].readOnly = false;
    }
    else
    {
        document.all["txExtfileDate"].style.backgroundColor = "LightGrey";
        document.all["txExtfileDate"].readOnly = true;
        document.all["txExtfileDate"].disabled = true;
        document.all["txExtfileDate"].value = "";
    }

    
    if (AKT116_DocList.Info[rowNO - 1].CLOSE_TYPE == "3")
    {
        document.all["rbType2"].disabled = true;
        document.all["rbType1"].checked = true;
    }
    else
    {
        document.all["rbType2"].disabled = false;
        if (DATA[2] == "15")
        {
            if (DATA[11] == "1")
                document.all["rbType1"].checked = true;
            else
                document.all["rbType2"].checked = true;
        }
        else	//0990707	Leslie	依系統參數設定預設選項
        {
			//* 2021.01.15	Cloud	1090997	修正新增單筆公文時退文對象一律使用系統參數的bug
            //document.all[strDefaultType].checked = true;
        }
    }
}


//1060823	Leslie	IE效能調校
//function ClearCheck()
function ClearCheck(cRow)
{
	if(cRow){
        var rowNO = cRow;
        var oldDATA = document.all["Record"].options[rowNO - 1].text;
        var newDATA = oldDATA.substring(0, oldDATA.length - 1);
        newDATA += "0";
        document.all["Record"].options[rowNO - 1].text = newDATA;
        document.all["Record"].options[rowNO - 1].value = newDATA;
    }
	else{
        var xObject = document.activeElement;
        var rowNO = xObject.id.substring(7, xObject.id.length);
        var oldDATA = document.all["Record"].options[rowNO - 1].text;
		var strDocNo = oldDATA.split(',')[1];
        var newDATA = oldDATA.substring(0, oldDATA.length - 1);
		
		var childType = "";
        if (xObject.checked)
		{
            newDATA += "1";
		
			childType = "1";
		}
        else
		{
            newDATA += "0";
		
			childType = "0";
		}
        document.all["Record"].options[rowNO - 1].text = newDATA;
        document.all["Record"].options[rowNO - 1].value = newDATA;
		
		var objChildList = $("#WorkArea").find("input[ClearComNo^='" + strDocNo + "']");
		if (childType=="1")
			objChildList.prop("checked", true);
		else
			objChildList.prop("checked", false);
		
		for (var iChild = 0; iChild < objChildList.length; iChild++)
		{
			ClearCheckChild(objChildList.attr("childSeqNo"), childType);
		}
    }
}
function ClearCheckChild(cRow, argType) {
	var rowNO = cRow;
	var oldDATA = document.all["Record"].options[rowNO - 1].text;
	var strDocNo = oldDATA.split(',')[1];
	var newDATA = oldDATA.substring(0, oldDATA.length - 1);
	newDATA += argType;
	document.all["Record"].options[rowNO - 1].text = newDATA;
	document.all["Record"].options[rowNO - 1].value = newDATA;
}


function Check_DOCNO_Exist(DOC_NO)
{
    for (i = 0; i < (RecordNO - 1) ; i++)
    {
        var DATA = new Array(7);
        var Record;
        Record = document.all["Record"].options[i].text;
        DATA = Record.split(",");
        if (DOC_NO == DATA[1])
        {
            return i;
            break;
        }
    }
    return -1;
}
function OnDocument()
{
    if (event.keyCode == 13)
    {
        var xObject = event.srcElement;
        if (xObject.type == "submit" || xObject.type == "image")
        {
            //xObject.onclick();
            document.all["AKT116"].onsubmit();
        }
        else
            jf_CancelEnterKey();
    }
}


function AutoTab(previous_obj, obj, next_obj)
{
    var KeyCode = event.keyCode;
    var MaxLength = obj.maxLength;
    var CurrentLength = obj.value.length;
    switch (KeyCode)
    {
        case 13:
            if (next_obj != null)
                next_obj.focus();
            break;
        case 9:
            break;
        default:
            if (CurrentLength == MaxLength && next_obj != null)
                next_obj.focus();
            break;
    }
    event.cancelBubble = true;
}

//避免使用者輸入 "," 與 ";"  <---分隔資料用字元
function AvoidChar()
{

    //44 -> "," 59 -> ";"
    if ((event.keyCode == 44) || (event.keyCode == 59))
    {
        event.returnValue = false;
    }
    ///////////////////MOB 修改 20070502 當系統設定AKT116_DOC_NO_ALLOW_SPACE為"N"，則擋掉空白
    if (document.all.hAllowSpace.value == "N" && event.keyCode == 32)
    {
        event.returnValue = false;
    }
    ///////////////////
}

/********************************* 子視窗 ********************************************/
function OpenWindow(argUrl)
{
    
    var gChidkWinStyle = "left=10, top=10, height=" + (screen.height - 120) + ",width=" + (screen.width - 20) + ", resizable=yes, status=yes,scrollbars=yes";
    uChildWinHandle = open(argUrl, null, gChidkWinStyle);
    uChildWinHandle.strWindowName = "AKT116";
}

function ClickConfirm(argDocNo)
{
    var DOCNO_Exist_Row_NO;
    var strDocNo = argDocNo;
    
    document.all["ValidationSummary1"].textContent = "";
    document.all["Validator"].textContent = "";
    document.all["lbMsg"].textContent = "";

    document.all["tbDocNo"].value = "";

    if (document.all["rbRejectDoc"].checked && document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
    {
        var ErrMsg = "下列欄位不可空白：\n";
        if (document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
            ErrMsg += "註記\n";
        jf_ShowMeg(ErrMsg, ErrMsgTitle);
        return "1";
    }
    //[950754]Add by Cola 若有勾選附件抽存但附件應歸日期確為空，則跳出訊息
    if (document.all["cbDelayAttFlag"].checked && document.all["txExtfileDate"].value == "")
    {
        var ErrMsg = "在有勾選附件抽存情況下，附件預計歸檔日期不可為空";
        jf_ShowMeg(ErrMsg, ErrMsgTitle);
        return "1";
    }
    //Cola -- end --

    if (RecordNO > 1)
        DOCNO_Exist_Row_NO = Check_DOCNO_Exist(strDocNo);
    else
        DOCNO_Exist_Row_NO = -1;

    
    if (document.all["Label13"].className.toLowerCase() != "hide")	
    {
        //* 2021.01.15	Cloud	1090997	修正新增單筆公文時退文對象一律使用系統參數的bug
        //document.all[strDefaultType].checked = true;		
    }

    if (DOCNO_Exist_Row_NO == -1)
    {
    
        Insert_Table(strDocNo, false, false);
        RecordNO++;

    }
    else
    {
        UpdateFlag = 1;
        Update_Table(strDocNo, DOCNO_Exist_Row_NO + 1);
    }
    

    if (RecordNO > 1)
        document.all["TableTitle"].style.visibility = "visible";

    document.all["btSelectAll"].style.visibility = "visible";
    document.all["btClearSelect"].style.visibility = "visible";
    document.all["btReverse"].style.visibility = "visible";
}

function CallBack(argCallerId)
{
    var oldlength = document.all["lbReturnValue"].length;

    //1000713 Davy [1000129] 記錄有紙本來文的文號
    var RcvfileList = "";

    if (argCallerId == "AKS116")
    {
        if (document.all["lbReturnValue"].length > 0)
        {

            
            $('html').css('cursor', 'wait');

            for (idx = 0; idx < oldlength; idx++)
            {
                
                var IsRcvfile = false;
				
				if (document.all["tbCom_Acc"].value != "" && document.all["tbCom_Acc"].value == "1" || document.all["tbCom_Acc"].value == "2")
                {
                    if (document.all["lbReturnValue"].options[idx].text != "")
                    {
                        
                        IsRcvfile = HtmlEncode(ProcessRecord(document.all["lbReturnValue"].options[idx].value));
                        
                        var param = new Array(2);
                        
                        param[0] = document.all["lbReturnValue"].options[idx].value;
                        param[1] = document.all["tbComNo"].value;
                        
                        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetAllComNo", false, param);
                        iCallID_ComNo = RtnObj.id;
                        OnWSResult(RtnObj);
                       
                    }
                    else//無併案狀態
                    {
                        
                        IsRcvfile = HtmlEncode(ProcessRecord(document.all["lbReturnValue"].options[idx].value));
                    }
                }
                else
                    
                    IsRcvfile = HtmlEncode(ProcessRecord(document.all["lbReturnValue"].options[idx].value));

                
                if (IsRcvfile == 'true')
                    RcvfileList += document.all["lbReturnValue"].options[idx].value + ";";

            }

            //1060823	Leslie	二代的IE效能調校，增加傳入參數，大量新增時改為最後一次塞入DOM
			if(gInsertContent != ""){
                document.all["DATA1"].innerHTML += gInsertContent;
                gInsertContent = "";
                $('#divSignArea').animate({ scrollTop: $('#DATA1').height() }, 50);
            }

            //1060823	Leslie	增加滑鼠外觀調整
            $('html').css('cursor', '')

            //rowscount=oldlength;
            document.all["TableTitle"].style.visibility = "visible";
            //1060223 Cloud 1050087 升級二代
            //document.all["Validator"].innerText = "";
            //document.all["lbMsg"].innerText = "";
            document.all["Validator"].textContent = "";
            document.all["lbMsg"].textContent = "";
            document.all["btSelectAll"].style.visibility = "visible";
            document.all["btClearSelect"].style.visibility = "visible";
            document.all["btReverse"].style.visibility = "visible";

            //不論點收或退文執行後皆跳回點收避免誤退文 #2007.02.28 Andy
            document.all["rbAcceptDoc"].checked = true;
            document.all["dlAcceptDoc"].options.selectedIndex = 0;
            document.all["tbTxDesc"].value = "";

            //}

            for (i = 0; i < oldlength; i++)
            {
                document.all["lbReturnValue"].remove(0);
            }

            //1000713 Davy [1000129] 顯示有紙本來文文號
            if (RcvfileList != "")
                alert("下列公文有紙本來文需要歸檔：\n" + RcvfileList.replace(/;/g, "\n"));
            
            AK.AKT116_SMEG.SaveDocList("", jf_GetSessionID());
        }
    } // end if (argCallerId=="AKS116")


    if (argCallerId == "AKM330")
    {
        var strDocNo, strClsNo, strCaseNo, strCaseName, strComStatus, strClsKey;
        var intDOCNO_Exist_Row_NO;

        if (document.all["lbReturnValue"].length > 0)
        {
            //1070709 Zen 1070678 弱掃XSS修正
            //strDocNo = document.all["lbReturnValue"].options[0].value;
            strDocNo = HtmlEncode(document.all["lbReturnValue"].options[0].value);
            strClsNo = document.all["lbReturnValue"].options[1].value;
            strCaseNo = document.all["lbReturnValue"].options[2].value;
            strCaseName = document.all["lbReturnValue"].options[3].value;
            strComStatus = document.all["lbReturnValue"].options[4].value;
            strClsKey = document.all["lbReturnValue"].options[5].value;

            if (RecordNO > 1) intDOCNO_Exist_Row_NO = Check_DOCNO_Exist(strDocNo);
            if (intDOCNO_Exist_Row_NO >= 0)
            {
                
                document.all["txClsNo"].value = strClsNo;
                document.all["txCaseNo"].value = strCaseNo;
                document.all["txCaseName"].value = strCaseName;
                //Cola -- end --
                AKT116_DocList.Info[intDOCNO_Exist_Row_NO].COM_STATUS = strComStatus;
                AKT116_DocList.Info[intDOCNO_Exist_Row_NO].Cls_Key = strClsKey;

                AKT116_DocList.Info[intDOCNO_Exist_Row_NO].Err_Msg = "";
                Update_Table(strDocNo, intDOCNO_Exist_Row_NO + 1);
            }
        } // end if(document.all["lbReturnValue"].length > 0)

        for (i = 0; i < oldlength; i++)
        {
            document.all["lbReturnValue"].remove(0);
        }
    }


}

/************************************ Web Sevice ****************************************************/


// Call WS : ChkPlanNo 
var iCallID_ChkCodeNo = null;
function CheckCodeNo(argColName)
{
    var strType = "";
    var strTxNo = "";
    if (argColName == "tbAcceptDoc" && document.all["tbAcceptDoc"].value != "")
    {
        document.all["tbAcceptDoc"].value = jf_PADL(document.all["tbAcceptDoc"].value, 2, "0");
        document.all["tbRejectDoc"].value = "";
        document.all["rbAcceptDoc"].checked = true;
        strType = "20";	//點收
        strTxNo = document.all["tbAcceptDoc"].value;
    }
    else if (argColName == "tbRejectDoc" && document.all["tbRejectDoc"].value != "")
    {
        document.all["tbRejectDoc"].value = jf_PADL(document.all["tbRejectDoc"].value, 2, "0");
        document.all["tbAcceptDoc"].value = "";
        document.all["rbRejectDoc"].checked = true;
        strType = "15";	//退文
        strTxNo = document.all["tbRejectDoc"].value;
    }
    else return;

    service.useService("lib/AK_LIB.asmx?WSDL", "SR1");
    //iCallID_ChkCodeNo  = service.SR1.callService("ChkCodeNo", document.all["SessionID"].value, strType, strTxNo);
    var param = new Array(2);
    param[0] = strType;
    param[1] = strTxNo;
    callObj = jf_CallWS("lib/AK_LIB.asmx", "ChkCodeNo", false, param);
    iCallID_ChkCodeNo = callObj.id;
    OnWSResult(callObj);
}

// Call WS : ChkDocState
var iCallID_ChkDocState = null;
var iCallID_ComNo = null;
var iCallID_Dept = null;
var iCallID_Emp = null;
var iCallID_Save = null;
var iCallID_CLS = null;
var iCallID_COM = null;
var iCallID_CASE = null;
var iCallID_ComNo1 = null;
var IsNoOk = false;

var gCombineType = "";
function ChkDocState()
{
    

    CheckFlag = true;
    var xObjectName = document.activeElement.id;
    if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancel") || (xObjectName == "btCancelImg") || (xObjectName == "btClean") || (xObjectName == "btCleanImg") || (xObjectName == "btSearch") || (xObjectName == "btSearchImg"))
        return;
    if (document.all["tbDocNo"].value == "")
        return;

    
    var str = AK.AKT116_SMEG.GetDocD(document.all["tbDocNo"].value, document.all["H_ORGNO"].value).value;
    document.all["tbDocNo"].value = str;
    
    var str = AK.AKT116_SMEG.GetDocState(document.all["tbDocNo"].value, document.all["H_ORGNO"].value).value;
	
	gCombineType = str.split('|')[1];
	str = str.split('|')[0];
    if (str != "")
    {
        alert(str);
        document.all["tbDocNo"].value = "";
        
        $('#tbDocNo').focus();
        return;
    }
    //Cola -- end -- 

    service.useService("lib/AK_LIB.asmx?WSDL", "SR1");
    

    callObj = jf_CallWS("lib/AK_LIB.asmx", "ChkDocState", false, document.all["tbDocNo"].value);
    iCallID_ChkDocState = callObj.id;
    document.all.txCloseDate.value = callObj.value.CloseDate;		//David	95.05.10
    OnWSResult(callObj);

    if (IsNoOk)
    {
        IsNoOk = false;
        
        var param = new Array(2);
        
        param[0] = strDocNo;
        param[1] = document.all["tbComNo"].value;;
        
        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetAllComNo", false, param);
        iCallID_ComNo = RtnObj.id;
        OnWSResult(RtnObj);
    }
}

function GetDeptNo(argDocNo)
{
    argsField = new Array(5);
    var TableName = "DOC_MAIN";
    
    var WhereField = new Array(2);
    var WhereCon = new Array(2);
    
    var RtnField = new Array(4);

    var Order = new Array(1);
    
    var arrRtnValue = new Array(4);

    arrRtnValue[0] = "";
    arrRtnValue[1] = "";
    WhereField[0] = "Doc_No";
    WhereCon[0] = argDocNo;
    
    WhereField[1] = "SOURCE_ORGNO";
    WhereCon[1] = document.all["H_ORGNO"].value;
    RtnField[0] = "DEPT_NO";
    RtnField[1] = "DEPT_NAME";

    
    RtnField[2] = "CLOSE_DATE";
    RtnField[3] = "EXTFILE_DATE";

    Order[0] = "";

    argsField[0] = TableName;
    argsField[1] = WhereField;
    argsField[2] = WhereCon;
    argsField[3] = RtnField;
    argsField[4] = Order;
    RtnObj = jf_CallWS("Lib/AK_LIB.asmx", "GetFieldValue", false, argsField);

    if (jf_IsWebServiceSuccess(RtnObj))
    {
        
        arrRtnValue[0] = RtnObj.value.RtnField0[0];
        arrRtnValue[1] = RtnObj.value.RtnField1[0];
        arrRtnValue[2] = RtnObj.value.RtnField2[0];
        arrRtnValue[3] = RtnObj.value.RtnField3[0];
        return arrRtnValue;
    }
}

var strDocNo = "";
function OnWSResult(argResult)
{
    if (argResult.id == iCallID_ChkCodeNo)	//原因代碼
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (document.all["rbAcceptDoc"].checked)
            {
                
                document.all["lbAcceptDoc"].textContent = argResult.value.CodeDesc;
                document.all["lbRejectDoc"].textContent = "";
            }
            else if (document.all["rbRejectDoc"].checked)
            {
                
                document.all["lbAcceptDoc"].textContent = "";
                document.all["lbRejectDoc"].textContent = argResult.value.CodeDesc;
            }
        }
        else
        {
            if (document.all["rbAcceptDoc"].checked)
                
                $('#tbAcceptDoc').focus();
            else if (document.all["rbRejectDoc"].checked)
                
                $('#tbRejectDoc').focus();
        }
    }
    else if (argResult.id == iCallID_ChkDocState)	//公文文號/狀態
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            //檢查公文狀態Doc_State
            if (parseInt(argResult.value.DocState, 10) > 19)	//已結案
            {
                
                alert("該筆公文不在點收範圍");

                
                if (jf_Trim(jf_ReadCookie("Mode")) == "Clean")
                {
                    document.all["tbDocNo"].value = "";
                }
                
                $('#tbDocNo').focus();
                
            }
            else
            {
                strDocNo = document.all["tbDocNo"].value;
                
                if (ClickConfirm(HtmlEncode(document.all["tbDocNo"].value)) == "1")
                    return;
				
				if (document.all["tbCom_Acc"].value != "" && document.all["tbCom_Acc"].value == "1" || document.all["tbCom_Acc"].value == "2" || gCombineType == "1" || gCombineType == "2")
                {
                    if (argResult.value.ComNo != "")
                    {
                    
                        IsNoOk = true;
                       
                    }
                	
					gCombineType = "";
                }
                
                $('#tbDocNo').focus();
            }
        }
        else
        {
            
            if (jf_Trim(jf_ReadCookie("Mode")) == "Clean")
            {
                document.all["tbDocNo"].value = "";
            }
            
            $('#tbDocNo').focus();
            
        }
    }
    else if (argResult.id == iCallID_ComNo)
    {
        if (argResult.value.ErrorClass.IsRedirect != true)
        {
            if (argResult.value.ErrorClass.ErrMessage.length == 0)//有子文
            {
                
                $('html').css('cursor', 'wait')

                for (var idx = 0; idx < argResult.value.ComNo.length; idx++)
                {
                    ProcessRecord(argResult.value.ComNo[idx]);
                }

                //1060823	Leslie	二代的IE效能調校，增加傳入參數，大量新增時改為最後一次塞入DOM
				if(gInsertContent != ""){
                    document.all["DATA1"].innerHTML += gInsertContent;
                    gInsertContent = "";
                    $('#divSignArea').animate({ scrollTop: $('#DATA1').height() }, 50);
                }

                
                $('html').css('cursor', '')

                
                $('#tbDocNo').focus();
            }
            else//無子文
            {
                
                $('#tbDocNo').focus();
            }
        }
    }
    else if (argResult.id == iCallID_Save)
    {
        WSResult = argResult.value;
        if (jf_IsWebServiceSuccess(argResult))
        {
            //document.all["lbMsg"].innerHTML=WSResult.strMsg;
            document.all["txMsg"].value = WSResult.strMsg;
            //1120606   Joe     1120361     弱掃修正XSS
            document.all["txMsgColor"].value = WSResult.strMsgColor;
            if (argResult.value.ErrorClass.IsErr)
                alert(argResult.value.ErrorClass.ErrMessage[0]);
            Page_BlockSubmit = false;
        }
    }
    else if (argResult.id == iCallID_CLS)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            WSResult = argResult.value;
            
            IsClsChecked = true;		// 是否檢查過分類號
            if (WSResult.GenCase == 1)
                IsCanUseInitCase = true;	// 可使用通案
            else
                IsCanUseInitCase = false;	// 不可使用通案
        }
        else
            
            $('#txClsNo').focus();
    }
    else if (argResult.id == iCallID_COM)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            WSResult = argResult.value;
            var str = WSResult.ComType;
            if (str == "2")
            {
                alert("輸入的併案文號為子文\n其母文為" + WSResult.Com_No + "，請重新輸入");
                
                $('#txComNo').focus();
            }
        }
        else
            
            $('#txComNo').focus();
    }
    else if (argResult.id == iCallID_ComNo1)
    {
        var Msg = "";
        if (argResult.value.ErrorClass.IsRedirect != true)
        {
            if (argResult.value.ErrorClass.IsErr)//有子文
            {
                for (var idx = 0; idx < argResult.value.ComNo.length; idx++)
                {
                    Msg += argResult.value.ComNo + "\n";
                }
                if (Msg != "")
                    alert("本公文為母文,有下列子文：\n" + Msg + "不可改變併案文號！")
                $('#txComNo').focus();
            }
        }
    }

    if (argResult.id == iCallID_ChkUserDocPriv)
    {
        if (argResult.value.ErrorClass.IsRedirect != true)
        {
            if (!argResult.value.ErrorClass.IsErr)
                strStoreNo = argResult.value.RtnStr;
            else
                strStoreNo = argResult.value.RtnStr;
        }
        else
            strStoreNo = argResult.value.RtnStr;
    }

}

function GetDocStateDesc(argDocState)
{
    switch (argDocState)
    {
        case "10":
            return "已結案";
        case "20":
            return "已點收未掃描";
        case "25":
            return "已點收已掃描";
        case "30":
            return "已銷毀";
        case "35":
            return "提供文史機關使用";
        case "40":
            return "已移轉";
        case "50":
            return "已遺失";
        case "90":
            return "待刪除";
    }
    return "未知";
}

function ProcessRecord(argDocNo)
{
    
    var IsRcvfile = false;
    
    var DOCNO_Exist_Row_NO;
    DOCNO_Exist_Row_NO = Check_DOCNO_Exist(argDocNo);

    if (DOCNO_Exist_Row_NO == -1)
    {
        
		IsRcvfile = Insert_Table(HtmlEncode(argDocNo), true, true);
        RecordNO++;
    }
    return IsRcvfile;
}

function DisplayDocInfo()
{
    var IsShow = document.all["htxShowDocInfo"].value;
    if (IsShow == "True")
    {
        document.all["DocInfo"].style.display = "";
        document.all["btDocInfo"].value = "隱藏基資[H]";
    }
    else
    {
        document.all["DocInfo"].style.display = "none";
        document.all["btDocInfo"].value = "顯示基資[H]";
    }
}

function ChkCaseNoExist(ClsNo, CaseNo)
{
    if (ClsNo != "" && CaseNo != "")
    {

        var param = new Array(4);
        param[0] = document.all["txFileYear"].value;
        param[1] = ClsNo;
        param[2] = CaseNo;
        param[3] = "";
    }
}

//呼叫錯誤訊息子視窗
function jf_OpenAKT116C2(argDocNo)
{
    var xUrl = "AKT116C2.aspx?k1=" + argDocNo + "&k2=116";
    jf_OpenChildWin(xUrl, "AKT116C2", 500, 300);
}

function GetDocFileTypeDesc(argDocFileType)
{
    switch (argDocFileType)
    {
        case "1": return "紙本";
        case "2": return "電子";
        default: return "未知格式";
    }
}

function GetDocFileType(argDocNo)
{

    argsField = new Array(5);
    var TableName = "DOC_MAIN";
	//* 2025.07.17	Cloud 	1140954 修正Call GetFieldValue 未使用機關代碼問題
    //var WhereField = new Array(1);
    //var WhereCon = new Array(1);
	var WhereField = new Array(2);
	var WhereCon = new Array(2);
    var RtnField = new Array(1);
    var Order = new Array(1);

    WhereField[0] = "Doc_No";
	//* 2025.07.17	Cloud 	1140954 修正Call GetFieldValue 未使用機關代碼問題
	WhereField[1] = "SOURCE_ORGNO";
	
    WhereCon[0] = argDocNo;
	//* 2025.07.17	Cloud 	1140954 修正Call GetFieldValue 未使用機關代碼問題
	WhereCon[1] = document.all["H_ORGNO"].value;
    RtnField[0] = "DOCFILE_TYPE";
    Order[0] = "";

    argsField[0] = TableName;
    argsField[1] = WhereField;
    argsField[2] = WhereCon;
    argsField[3] = RtnField;
    argsField[4] = Order;
    RtnObj = jf_CallWS("Lib/AK_LIB.asmx", "GetFieldValue", false, argsField);

    if (jf_IsWebServiceSuccess(RtnObj))
    { return RtnObj.value.RtnField0[0]; }

}

/***************************************************************************
新增專屬程式
***************************************************************************/

function ChkExtDateIsEmpty()
{
    var Msg = "";
    var Num = "";
    var bRtnbool = true;
    if (document.all.txExtfileDate.value == "")
    {
        Num += document.all.tbDocNo.value + "\n";

        if (Num != "")
        {
            if (document.all.cbDelayAttFlag.checked == true)
            {
                Msg += "公文文號：" + Num + "註記為附件抽存,預計歸還日期不可空白\n";
            }
        }
    }
    if (document.all.txExtfileDate.value != "")
    {
        var tempExtDate = jf_PADL(document.all.txExtfileDate.value, 7, 0);
        if (!jf_CheckCDATE(tempExtDate))
        {
            Msg += "日期格式不正確\n";
        }
        else
            document.all.txExtfileDate.value = tempExtDate;
    }
    if (document.all.txExtfileDate.value < document.all.txCloseDate.value)
    {
        if (document.all["cbDelayAttFlag"].checked)
        {
            Msg += "預計歸檔日期 不可小於 實際歸檔日期\n";
            
            $('#txExtfileDate').focus();
        }
    }

    if (Msg != "")
    {
        bRtnbool = false;
        alert(Msg);
    }
    return bRtnbool;
}

function OpenCalendar()
{
    Page_BlockSubmit = true;
    jf_CallCalendar(document.all.txExtfileDate, event.screenX, event.screenY);
}

function Check_DATE(obj)
{
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, 7, "0");

        if (!jf_CheckCDATE(obj.value))
        {
            alert("輸入的日期不合法,請重新輸入");
            obj.value = "";
            obj.focus();
        }
    }
}
function cbDelay()
{
    if (document.all["tbDocNo"].value != "")
    {
        if (document.all["cbDelayAttFlag"].checked)
        {
            //透過Ajax檢核有無附件
            
            if (AK.AKT116_SMEG.CheckAttach(document.all["tbDocNo"].value, document.all["H_ORGNO"].value).value == "0")
            {
                alert("本公文目前並沒有附件資訊，若有附件資訊需註記，請先點選基資維護開啟AKM330維護後再勾選。");
                document.all["cbDelayAttFlag"].checked = false;
                return;
            }
            document.all["txExtfileDate"].style.backgroundColor = "FFFFFF";
            document.all["txExtfileDate"].readOnly = false;
            document.all["txExtfileDate"].disabled = false;
        }
        else if (!document.all["cbDelayAttFlag"].checked)
        {
            document.all["txExtfileDate"].style.backgroundColor = "LightGrey";
            document.all["txExtfileDate"].readOnly = true;
            document.all["txExtfileDate"].disabled = true;
            document.all["txExtfileDate"].value = "";
        }
    }
    else
    {
        if (document.all["cbDelayAttFlag"].checked)
        {
            document.all["txExtfileDate"].style.backgroundColor = "FFFFFF";
            document.all["txExtfileDate"].readOnly = false;
            document.all["txExtfileDate"].disabled = false;
        }
        else if (!document.all["cbDelayAttFlag"].checked)
        {
            document.all["txExtfileDate"].style.backgroundColor = "LightGrey";
            document.all["txExtfileDate"].readOnly = true;
            document.all["txExtfileDate"].disabled = true;
            document.all["txExtfileDate"].value = "";
        }
    }
}

function Enter()
{
    if (event.keyCode == 13 && document.all["tbDocNo"].value == "")
        event.returnValue = false;
}

function CheckChild(argId, argDocNo)
{
    if ($(argId)[0].checked)
    {
        $("#WorkArea").find("input[ComNo^='" + argDocNo + "']").prop("checked", true);
    }
    else
    {
        $("#WorkArea").find("input[ComNo^='" + argDocNo + "']").prop("checked", false);
    }
}


function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
function OpenAKM336(argDocNo)
{
	//rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&k2="+document.all["tbCrtDate"].value+"&k3="+document.all["h_signType"].value
	var pUrl = "AKM336.aspx?rtnObj=SubWinRtn&m=p&k1=" + argDocNo + "&k2=''&k3=''&SAMLart=" + jf_ReadCookie("SAMLart")+"&argMode=ReadOnly";
	OpenWindow(pUrl);
}