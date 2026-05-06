/*
DATE	SA		PRG		MGR_NO		DESC
0980402	Stella	Jane	0980129		CheckCowork()增加傳入參數-判斷是否不可提供人民申請案件的子文併案陳核
0990921	------	Jane	0990413		加入查詢功能鍵開啟EDI460待辦查詢子視窗
1001116	Kevin	Ivory	1000876		根據單號0990413 Merge查詢功能,點選可帶回承辦人目前待辦公文
1001214	David	David	1000129		新增紙本併同歸檔相關欄位及處理	
1010626	David	David	1010363		DG2併件欄位改為CheckBox，並新增是否更新子文分類案次號欄位
1011004	Kevin	Jagle	1010529		新增母文文號查詢功能
1031112	Leslie	Kevin_C	1020726		於__doPostBack前加上IsServerHandling=true,避免重複執行
1040203	David	David	1030377		加入公文時新增紀錄LAST_UPDATE_PROG欄位
1040604 David   David   1030504     新增紀錄LAST_UPDATE_TIME欄位
1050629	Kevin	Kevin_C	1050087		升級二代公文系統
1050930	Kevin	Kevin_C	1050087		避免加入後，Page_BlockSubmit變為FALSE，導致使用DG_toolBar進ClientOnLoad會PostBack
1051019 Leslie  Kenny   1050087     二代公文修改
1051102	-----	Kevin_C	1050087		修正ClientButtonControl回傳需要使用doPostBack
1061025	David	Kevin_C	1060953		彙辦選項需連動DG的併件選項
1070524	David	Kevin_C	1060953		彙辦選項隱藏時不連動
1081120	David	Joe		1080986		新增判斷若有待併或已併公文與母文不同簽核類型，不可勾選彙併辦
1100201	Leslie	Joe		1090927		取消使用document.activeElement
1110103	Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1110216 Kevin   Kevin   1101626     鐵道局更新子文限辦日期
1110302	Kevin   Zen     1101495     新增紀錄子文併案順序
1111020 Kevin   Zen     1110918     (銓敘部)支援依公文類型及文號大小調整彙併辦母文號
1120526 Kevin   Zen     1110918     (銓敘部)修正批次加入併案未支援調整母文之問題
1121026 Kevin   Zen     1120092     修正刪除後再新增子文之顯示異常問題
1140109 Zen     Zen     1131058     將創稿公文作為子文彙併辦時額外顯示提示訊息
1141028 Zen     Zen     1141012     (外貿)隱藏分類號、保存年限相關欄位並預設彙併辦後不將子文之檔號更新為與母文相同
1141231 Zen     Zen     1141012     (外貿)修正新增彙併辦時誤檢核保存年限不可為0之問題
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
var strTableFields = new Array("_lbDg1DocNo", "_txDg1Cnt");
//0950622 Charles 也指定清除併件欄位
//1121026 Zen 1120092 修正歷史Bug
//var strTableFields2 = new Array("_txDg2DocNo", "_txDg2Cnt", "_txDg2ComStatus");
var strTableFields2 = new Array("_txDg2DocNo", "_txDg2Cnt", "_cbDg2ComStatus");

//1050629	Kevin_C	1050087		升級二代公文系統 -S
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect1.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg2)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//1050629	Kevin_C	1050087		升級二代公文系統 -E

//1001214 David 1000129 紀錄是否有紙本併同歸檔
var bRcvFile = false;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051019   Kenny   [1050087]   二代公文修改；移除無用CODE
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //1051019   Kenny   [1050087]   二代公文修改；移除無用CODE
    //jf_CallWA("../EDLIB/EDWS.asmx", "CheckCowork", false, null);

    if (document.all.H_txCanAppRoleList.value != "")
    {
        //1050629	Kevin_C	1050087		升級二代公文系統，取消IEControl，直接到DB查詢資料
        //jf_InitdlAppUserName();
        //0950628 Charles 因為此下拉式選單是每次回到Server端就被清空，所以每次必須重新取得核決者列表
        //又因為無法知道回Server端前到底選了什麼，所以用H_txSelectedIdx紀錄。
        //所以如果H_txSelectedIdx不是空值代表已經有選過了，從H_txSelectedIdx欄位取得之前選的是哪一個
        if (document.all.H_txSelectedIdx.value != "")
            document.all.dlAppUserName.selectedIndex = GetSplitStr(document.all.H_txSelectedIdx.value, ";", 0);
    }
    else
    {
        document.all.lbAppUserName.className = "hide";
        document.all.dlAppUserName.className = "hide";
    }

    //0950622 Charles 設定是否預設併件
    //1010626 David 1010363 Dg2併件欄位改為CheckBox，加入時之CheckBox取消
    /*if(document.all.EDP460_DefaultComStatus.value == "Y")
        document.all.cbComStatus.checked = true;
    else
        document.all.cbComStatus.checked = false;*/

    //1001214 David 1000129 依簽合類型及是否有紙本併同歸檔判斷欄位是否可輸入
    for (var i = 2; i <= document.all.dg2.rows.length; i++)
    {
        if (jf_Trim(document.all["dg2__ctl" + i + "_txDg2DocNo"].value) != "")
        {
            var strSignType = jf_Trim(document.all["dg2__ctl" + i + "_H_txDg2SignType"].value);
            var strIsRcvFile = jf_Trim(document.all["dg2__ctl" + i + "_H_txDg2IsRcvFile"].value);
            if (strSignType != "E" || strIsRcvFile != "1")
            {
                document.all["dg2__ctl" + i + "_txDg2FileCnt"].className = "DisplayOnly";
                document.all["dg2__ctl" + i + "_txDg2FileCnt"].readOnly = true;
                document.all["dg2__ctl" + i + "_txDg2FileCnt"].title = "此文非線上簽核公文或無紙本併同歸檔附件，不需輸入";
            }
            else
                document.all["dg2__ctl" + i + "_txDg2FileCnt"].className = "InputFieldNumeric";
        }
    }
    cbComTypeOnClick();
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

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    //1050930	Kevin_C	1050087	避免加入後，Page_BlockSubmit變為FALSE，導致使用DG toolBar進來後會POST BACK
    Page_BlockSubmit = true;

    switch (xObjectName)
    {
        case "btNewAdd"://新加入公文功能鍵
            if (jf_CheckBeforeNewAdd())
            {
                Page_BlockSubmit = false;
                //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
                IsServerHandling = true;
                //1051102	Kevin_C	1050087	修正ClientButtonControl回傳需要使用doPostBack
                __doPostBack("btNewAdd", event.flatIndex);
            }
            else
                Page_BlockSubmit = true;
            break;
        //0990921 加入查詢功能鍵開啟EDI460待辦查詢子視窗[0990413]-Jane
        case "btOpenSearch":
            Page_BlockSubmit = true;
            var strUrl = "EDI460.aspx?RtnObj=lbReturnValue&nFrom=EDP460&SAMLart=" + document.all["SsoArtifact"].value + "&UserId=" + document.all["H_txUserName"].value + "&OuId=" + document.all["H_txOuId"].value;
            //1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，紀錄子視窗ID
            //jf_OpenChildWin(strUrl, "EDI460", 700, 500);
            let objCurrComNo = { OrgNickName: $('#OrgNickName').val(), ComNo: $('#txComNo').val(), NewByOu: $('#H_txComNoNewByOu').val(), dlAppUserNameClass: document.all['dlAppUserName'].className };
            localStorage.setItem("EDP460", JSON.stringify(objCurrComNo));
            let childEDI460 = jf_OpenChildWin(strUrl, "EDI460", 800, 600);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050629	Kevin_C	1050087		升級二代公文系統
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
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050629	Kevin_C	1050087		升級二代公文系統
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050629	Kevin_C	1050087		升級二代公文系統
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btAdd":
            if (jf_ConfirmAdd()) //是否通過新增前必要檢查
            {
                //1111020 Zen 1110918 (銓敘部)支援依公文類型及文號大小調整彙併辦母文號，調整母文後額外顯示訊息
                if ($('#OrgNickName').val() == 'MOCS' && $('#H_txOldComNo').val() != '' && $('#H_txNewComNo').val() != '')
                {
                    alert('前母文' + $('#H_txOldComNo').val() + '稿件將不使用，請先將文稿複製至新母文文號' + $('#H_txNewComNo').val() + '後，再進行彙併辦作業。');
                    $('#H_txOldComNo').val('');
                    $('#H_txNewComNo').val('');
                }

                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
                //1061025	Kevin_C	1060953	PostBack前enable CheckBox避免值無法傳到SERVER端
                for (var i = 2; i <= document.all.dg2.rows.length; i++)
                    document.all["dg2__ctl" + i + "_cbDg2ComStatus"].disabled = false;
            }
            else
                Page_BlockSubmit = true;
            //1050629	Kevin_C	1050087		升級二代公文系統
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btRemove":
            //1111020 Zen 1110918 (銓敘部)支援依公文類型及文號大小調整彙併辦母文號，執行此功能時因已提示不再檢核
            //if (jf_ConfirmDelete())
            if ($('#H_NewDocList').val() != '' || jf_ConfirmDelete())
            {
                Page_BlockSubmit = !jf_CheckBeforeRemove();
            }
            else
                Page_BlockSubmit = true;
            //1050629	Kevin_C	1050087		升級二代公文系統
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1050629	Kevin_C	1050087		升級二代公文系統
            //document.all["txComNo"].focus();
            $('txComNo').focus();
            break;
        case "btModify":
            if (jf_CheckBeforeModify())
            {
                Page_BlockSubmit = false;
                //1050629	Kevin_C	1050087		升級二代公文系統
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();

            //1111020 Zen 1110918 (銓敘部)支援依公文類型及文號大小調整彙併辦母文號，取消時清空新舊母文號紀錄
            $('#H_txOldComNo').val('');
            $('#H_txNewComNo').val('');

            //1050629	Kevin_C	1050087		升級二代公文系統
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        //以下屬於DataGrid ToolBar  dg1
        case "btSelectAll1":
            Page_BlockSubmit = true;
            SelectAll("dg1", "_cbSelect", "_txDg1DocNo");
            break;
        case "btSelectInverse1":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg1", "_cbSelect");
            break;
        //以下屬於DataGrid ToolBar  dg2
        case "btSelectAll":
            Page_BlockSubmit = true;
            SelectAll("dg2", "_cbSelect2", "_txDg2DocNo");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg2", "_cbSelect2");
            break;
        case "btDeleteSelected":
            Page_BlockSubmit = !jf_DeleteSelected("dg2", "_cbSelect2", strTableFields2);
            //1110302 Zen 1101495 新增紀錄子文併案順序，修正歷史Bug
            //jf_SelectBarSubmit();
            jf_SelectBarSubmit(xObjectName);
            break;
        //1011004	Jagle	[1010529]		新增母文文號查詢功能
        case "btSearch":
            var strUrl = "";
            //strUrl = "EDP460S.aspx?RtnObj=lbReturnValue&nFrom=EDP460&SAMLart="+document.all["SsoArtifact"].value;
            strUrl = "EDP460S.aspx?SAMLart=" + document.all["SsoArtifact"].value;
            jf_OpenChildWin(strUrl, "EDP460S", 760, 420);
            Page_BlockSubmit = true;
            //1050629	Kevin_C	1050087		升級二代公文系統
            //jf_ToolBarSubmit();
            break;
    }
}

/********** 以下為按下新增彙併辦鍵後相關處理 **********/
/*新增前檢查*/
function jf_ConfirmAdd()
{
    var bRtnbool = false;
    if (jf_CheckBlankAndAlert())
    {
        //1001214 David 1000129 修正提示訊息內容
        //1010626 David 1010363 修正提示訊息內容
        //var Msg = "本作業將會修正母子文關係，並將子文分類及案次號更新與母文相同，請通知承辦人員關閉相關的母子文，";
        var Msg = "本作業將會修正母子文關係，並將子文分類及案次號依畫面設定更新與母文相同，請通知承辦人員關閉相關的母子文，";

        //1110216 Kevin 1101626 鐵道局更新子文限辦日期
        if (document.all.OrgNickName.value == 'RRB')
            Msg = "本作業將會修正母子文關係，並將子文公文性質、業務類別、限辦日期、分類及案次號依畫面設定更新與母文相同，請通知承辦人員關閉相關的母子文，";


        Msg += "\n待本作業完成後再開啟，以避免資料流失。繼續本作業請按「確定」，否則請按「取消」。"
        if (bRcvFile)
        {
            //1010626 David 1010363 修正提示訊息內容
            //Msg  = "本作業將會修正母子文關係，並將子文分類及案次號更新與母文相同，請通知承辦人員關閉相關的母子文，";
            Msg = "本作業將會修正母子文關係，並將子文分類及案次號依畫面設定與母文相同，請通知承辦人員關閉相關的母子文，";

            //1110216 Kevin 1101626 鐵道局更新子文限辦日期
            if (document.all.OrgNickName.value == 'RRB')
                Msg = "本作業將會修正母子文關係，並將子文公文性質、業務類別、限辦日期、分類及案次號依畫面設定更新與母文相同，請通知承辦人員關閉相關的母子文，";

            Msg += "\n待本作業完成後再開啟，以避免資料流失。且完成彙併辦之子文無法修改併同歸檔數量，需解除彙併辦後才可修改。";
            Msg += "\n繼續本作業請按「確定」，否則請按「取消」。";
        }
        if (window.confirm(Msg))
            bRtnbool = true;
        else
            bRtnbool = false;
    }
    else
        bRtnbool = false;

    return bRtnbool;
}

/*檢查DataGrid資料列是否至少有一筆資料*/
function jf_CheckBlankAndAlert()
{
    var InValid = true;
    var strMsg = "";

    if (jf_Trim(document.all.txCnt.value) == 0)
    {
        strMsg = "母文之數量不可為0或空白";
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])), "");
        InValid = false;
        return InValid;
    }

    //1141231 Zen 1141012 (外貿)修正新增彙併辦時誤檢核保存年限不可為0之問題
    //if (jf_Trim(document.all.txKeepYear.value) == 0)
    if (document.all['TAITRA'] == undefined && jf_Trim(document.all.txKeepYear.value) == 0)
    {
        strErrMsg = "保存年限欄位不可為0或空白";
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        InValid = false;
        return InValid;
    }

    if (jf_Trim(document.all["dg2__ctl2_txDg2DocNo"].value) == "")
    {
        strMsg = "請至少輸入一筆資料\n";
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])), "");
        InValid = false;
        return InValid;
    }

    var strCnt = "";
    for (var i = 2; i <= document.all.dg2.rows.length; i++)
    {
        if (jf_Trim(document.all["dg2__ctl" + i + "_txDg2DocNo"].value) != "")
        {
            strCnt = jf_Trim(document.all["dg2__ctl" + i + "_txDg2Cnt"].value);
            if ((strCnt == "0") || (strCnt == ""))
            {
                strMsg += "數量欄位不得為0或為空白。";
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])), "");
                InValid = false;
                return InValid;
            }
        }
    }

    //0951115 Stella   
    //修正因為H_txSelectedIdx欄位值是在核決者下拉選單onchange時才會塞值，而若依照預設的第一個核決者選項去新增彙併辦時，該隱藏欄位為空值的bug
    //所以於新增彙併辦前判斷目前核決者選單是否顯示，若為顯示則表示目前為併案陳核關係
    //檢核H_txSelectedIdx欄位是否不為空白，若為空白代表核決者為預設的第一筆，故將該筆資訊存入隱藏欄位
    //0951120 Stella取消檢核，因修改為第一筆為空白所以若有選擇核決者隱藏欄位一定會有值
    /*if(document.all.lbAppUserName.className == "InputFieldLabel")
    {
        if(jf_Trim(document.all.H_txSelectedIdx.value) == "")
        {
            document.all.H_txSelectedIdx.value = "0" + ";" +
                document.all.dlAppUserName.options(0).text + "|" + document.all.dlAppUserName.options(0).value;
        }
    }*/

    //1001214 David 1000129 新增紙本併同歸檔相關檢核--START
    for (var i = 2; i <= document.all.dg2.rows.length; i++)
    {
        if (jf_Trim(document.all["dg2__ctl" + i + "_txDg2DocNo"].value) != "")
        {
            var strDocNo = jf_Trim(document.all["dg2__ctl" + i + "_txDg2DocNo"].value);
            var strSignType = jf_Trim(document.all["dg2__ctl" + i + "_H_txDg2SignType"].value);
            var strIsRcvFile = jf_Trim(document.all["dg2__ctl" + i + "_H_txDg2IsRcvFile"].value);
            var strRcvFileCnt = jf_Trim(document.all["dg2__ctl" + i + "_txDg2FileCnt"].value);
            if (strSignType == "E" && strIsRcvFile == "1")
            {
                bRcvFile = true;
                if (strRcvFileCnt == "" || parseInt(strRcvFileCnt, 10) == 0)
                {
                    strMsg += "公文" + strDocNo + "之紙本併同歸檔數量不可為0或空\n";
                    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])), "");
                }
            }
        }
    }
    if (strMsg != "")
    {
        InValid = false;
        return InValid;
    }
    //1001214 David 1000129 新增紙本併同歸檔相關檢核--END

    return InValid;
}

/*修正數量前檢查*/
function jf_CheckBeforeModify()
{
    var bChecked = true;
    var strErrMsg = "";
    if (jf_Trim(document.all.txCnt.value) == 0)
    {
        bChecked = false;
        strErrMsg = "母文之數量欄位不可為0或空白";
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        return bChecked;
    }

    if (jf_Trim(document.all.txKeepYear.value) == 0)
    {
        bChecked = false;
        strErrMsg = "保存年限欄位不可為0或空白";
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        return bChecked;
    }

    for (var i = 2; i < document.all.dg1.rows.length; i++)
    {
        if (document.all["dg1__ctl" + i + "_txDg1DocNo"].value != "")
        {
            var strCnt = jf_Trim(document.all["dg1__ctl" + i + "_txDg1Cnt"].value);
            if ((strCnt == "0") || (strCnt == ""))
            {
                bChecked = false;
                strErrMsg = "捲動區中序" + (i - 1) + "數量欄位不可為0或空白";
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
                return bChecked;
            }
        }
    }
    return bChecked;
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
    if (jf_IsWebServiceSuccess(argResult))
    {
        if (argResult.value.ErrMsg == "")
        {
            if (document.all.txNewCnt.value == "")
                document.all.txNewCnt.value = argResult.value.FileCnt;
            document.all.H_txNewRcvDate.value = argResult.value.Rcv_Date;
            document.all.H_txMsgId.value = argResult.value.Msg_Id;
            document.all.H_txNewSubFolder.value = argResult.value.SubFolder;
            document.all.H_txSignType.value = argResult.value.SignType;
            document.all.H_txNewDocDueDate.value = argResult.value.Due_Date;
            document.all.H_txNewDocSDate.value = argResult.value.Start_Date;
            if (argResult.value.DelMsgId != "")
                document.all.H_txDelMsgId.value = argResult.value.DelMsgId;
            //1001214 David 1000129 紀錄是否有紙本併同歸檔及數量
            document.all.H_txIsRcvFile.value = argResult.value.IsRcvFile;
            document.all.H_txRcvFileCnt.value = argResult.value.RcvFileCnt;
            //1040203 David 1030377 新增紀錄LAST_UPDATE_PROG欄位
            document.all.H_txNewLastUpdateProg.value = argResult.value.LastUpdateProg;
            //1040604 David 1030504 新增紀錄LAST_UPDATE_TIME欄位
            document.all.H_txNewLastUpdateTime.value = argResult.value.LastUpdateTime;

            //1111020 Zen 1110918 (銓敘部)支援依公文類型及文號大小調整彙併辦母文號，僅母文未核決時執行
            document.all['H_txDocNoNewByOu'].value = argResult.value.strNewByOu;
            //1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，調整為傳入比較用文號相關屬性
            //if (document.all['OrgNickName'].value == 'MOCS' && document.all['dlAppUserName'].className == 'hide' && ChangeComNo())
            if (document.all['OrgNickName'].value == 'MOCS' && document.all['dlAppUserName'].className == 'hide' && ChangeComNo($('#txNewDocNo').val(), $('#H_txDocNoNewByOu').val()))
            {
                //1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，改寫為函式
                //$('#H_NewDocList').val('');

                //解除彙併辦所有並記錄公文清單
                //$('#btSelectAll1')[0].click();
                //$('#H_txNewComNo').val($('#txNewDocNo').val());
                //$('#H_txOldComNo').val($('#txComNo').val());

                //let bHasCheck = false;
                //for (let i = 2; i <= $('#dg1')[0].rows.length; i++)
                //    if (document.all['dg1__ctl' + i + '_cbSelect'].checked)
                //    {
                //        $('#H_NewDocList')[0].value += document.all['dg1__ctl' + i + '_txDg1DocNo'].value + ';';
                //        bHasCheck = true;
                //    }

                //for (let i = 2; i <= $('#dg2')[0].rows.length; i++)
                //    if (document.all['dg2__ctl' + i + '_txDg2DocNo'].value != '')
                //        $('#H_NewDocList')[0].value += document.all['dg2__ctl' + i + '_txDg2DocNo'].value + ';';

                //$('#H_NewDocList')[0].value += $('#txComNo').val();
                //$('#txNewDocNo').val('');

                //if (bHasCheck)
                //    $('#btRemove')[0].click();
                //else
                //{
                //    $('#txComNo')[0].disabled = false;
                //    $('#txComNo')[0].value = $('#H_txNewComNo').val();
                //    $('#btOpen')[0].click();
                //}
                if (bConFirm = window.confirm('目前加入公文' + $('#txNewDocNo').val() + '為最大號碼，將以本公文進行辦理。確認後，母文' + $('#txComNo').val() + '將先進行解併，再以新母文' + $('#txNewDocNo').val() + '執行彙併辦作業。'))
                    CombineWithNewComNo($('#txNewDocNo').val(), '');
            }

            //1140109 Zen 1131058 將創稿公文作為子文彙併辦時額外顯示提示訊息
            let strMsg = `公文${$('#txNewDocNo').val()}為創稿公文，做為彙併辦子文後於母文檢視時可能衍生無法瀏覽任何稿件、來文內容之情況。`;

            //僅彙併辦且子文為創稿時提示
            if (document.all['dlAppUserName'].className == 'hide' && document.all['H_txDocNoNewByOu'].value == 'Y')
            {
                alert(strMsg);

                if (document.all['OrgNickName'].value == 'RRB')
                    $('#txNewDocNo').val('');
            }

            return;
        }
        else
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([argResult.value.ErrMsg])), "");
            //1050629	Kevin_C	1050087		升級二代公文系統
            //document.all.txNewDocNo.focus();
            $('txNewDocNo').focus();
            return;
        }
    }
    else
    {
        return;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
/*文號欄位onblur call web service*/
function jf_CallWebService()
{
    var strRoleNo = document.all.H_txRoleNo.value;
    var strDocNo = jf_Trim(document.all.txNewDocNo.value);
    if (strDocNo == "")
    {
        document.all.txNewCnt.value = "";
        return;
    }
    var arWSParam = new Array(8);
    arWSParam[0] = document.all.H_txOrgNo.value;
    arWSParam[1] = strDocNo;
    arWSParam[2] = document.all.txComNo.value;
    arWSParam[3] = document.all.H_txOuId.value;
    arWSParam[4] = document.all.H_txUserName.value;
    if (strRoleNo == "OD99")
        arWSParam[5] = "2";
    else if (strRoleNo == "OD17")
        arWSParam[5] = "1";
    arWSParam[6] = document.all.H_txSubFolder.value;
    //0950614 Charles 增加參數，因應後併需求，若母文已核決，則此參數為true
    if (document.all.H_txCanAppRoleList.value != "")
        arWSParam[7] = true;
    else
        arWSParam[7] = false;

    //[0980129]-增加參數-判斷是否不可提供人民申請案件的子文併案陳核-Jane	
    arWSParam[8] = document.all.OD_DOC_PTY_5_MODE.value;
    CallWsObj = jf_CallWA("../EDLIB/EDWS.asmx", "CheckCowork", false, arWSParam);
    OnWSResult(CallWsObj);
}

/*加入公文文號前檢查*/
function jf_CheckBeforeNewAdd()
{
    var DocNo = jf_Trim(document.all.txNewDocNo.value);
    var Cnt = jf_Trim(document.all.txNewCnt.value);
    var MainDocNo = jf_Trim(document.all.txComNo.value);
    var strMsg = "";
    var bChecked = true;
    if (DocNo == "")
        strMsg = "文號欄位不可為空白";
    else if (DocNo == MainDocNo)
        strMsg = "新加入公文文號不可與母文號相同。";
    else if (CheckDocNoExist(DocNo))
        strMsg = "文號：" + DocNo + "已存在於捲動區中，不允許再加入";
    else if (Cnt == 0)
        strMsg = "數量需大於 0 ";

    if (strMsg != "")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])), "");
        bChecked = false;
        //1050629	Kevin_C	1050087		升級二代公文系統
        //document.all.txNewDocNo.focus();
        $('#txNewDocNo').focus();

    }
    return bChecked;
}

/*檢查文號是否已存在*/
function CheckDocNoExist(strDocNo)
{
    if (document.all.dg2.rows.length == 0)
        return false;
    if (document.all.dg2 == null)
        return false;
    for (var RowCount = 2; RowCount < document.all.dg2.rows.length + 1; RowCount++)
    {
        if (document.all["dg2__ctl" + RowCount + "_txDg2DocNo"].value == strDocNo)
            return true;
    }
    return false;
}
/*解除彙併辦前檢查*/
function jf_CheckBeforeRemove()
{
    var strMsg = "";
    var InValid = true
    var Cnt = 0;
    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked)				
        {
            Cnt++;
            if (jf_Trim(document.all["dg1__ctl" + i + "_txDg1DocNo"].value) == "")
            {
                if (strMsg != "")
                    strMsg += ", ";

                strMsg += (i - 1);
            }
        }
    }

    if (strMsg != "")
    {
        strMsg = "所勾選之序" + strMsg + "資料列為空白\n";
        InValid = false;
    }
    if (Cnt == 0)
    {
        strMsg = "請至少勾選一筆明細資料\n";
        InValid = false;
    }
    if (strMsg != "")
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])), "");

    return InValid;
}
/*全部選取*/
function SelectAll(argTableName, argCheckBoxName, argTxBox)
{
    var i, j;
    if (document.all[argTableName] == null)
        return;

    var len = document.all[argTableName].rows.length + 1;

    for (i = 2; i < len; i++)
    {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        var obj2 = document.all[argTableName + "__ctl" + i + argTxBox];
        if (obj.disabled == false)
        {
            if (obj2.value != "")
                obj.checked = true;
        }
    }
}

//0950614 Charles 設定核決者選項內容 start
//1050629	Kevin_C	1050087		升級二代公文系統，取消IEControl，直接到DB查詢資料 -S
//function jf_InitdlAppUserName()
//{
//	if(document.all.SsoArtifact == null) return false;
//	if(document.all.SsoArtifact.value=="") return false;

//	try
//	{
//		if(!document.all.IEControl.SetTargetUser(document.all.SsoArtifact.value))
//			return false;

//		var nApplyRoleList	= document.all.H_txCanAppRoleList.value;
//		var strOrgNo		= document.all.H_txOrgNo.value;
//		var strDeptNo		= document.all.H_txDeptNo.value;
//		var nNum			= document.all.IEControl.GetApplyUserListOfUnit(nApplyRoleList,strOrgNo,strDeptNo);
//		fnDelOptions(document.all.dlAppUserName);
//		//0950628 Charles 不用新增一個空白的選項
//		//0951120 Stella 新增一個空白選項(因可以不用選核決者)
//		fnAddOption(document.all.dlAppUserName, "", "");
//		var sOdApproveType = document.all.IEControl.GetEnvSet("OD_APPROVE_TYPE");
//
//		if(sOdApproveType && sOdApproveType.toUpperCase()=="ROLE")
//		{
//			var arrRole = new Array();
//			arrRole.AddStr = AddStr;//增加method
//			for(var i=0;i<nNum;i++)
//			{
//				//格式=帳號|姓名|角色代碼|角色名稱
//				var appMakeup	= document.all.IEControl.GetApplyUserNameOfUnit(i);
//				var appRole	= GetSplitStr(appMakeup,"|",2);
//				var appRoleName	= GetSplitStr(appMakeup,"|",3);
//				arrRole.AddStr(appRole + "|" + appRoleName);
//			}
//			arrRole.sort();
//			for(var i=0; i<arrRole.length; i++)
//			{
//				var appRole	= GetSplitStr(arrRole[i], "|", 0);
//				var appRoleName	= GetSplitStr(arrRole[i], "|", 1);
//				if(appRoleName == "")
//					appRoleName = GetRoleName(appRole);
//				fnAddOption(document.all.dlAppUserName, "|" + arrRole[i], appRoleName);
//			}
//		}
//		else
//		{
//			for(var i=0;i<nNum;i++)
//			{
//				//格式=帳號|姓名|角色
//				var appMakeup	= document.all.IEControl.GetApplyUserNameOfUnit(i);
//				var appAcc	= GetSplitStr(appMakeup,"|",0);
//				var appName	= GetSplitStr(appMakeup,"|",1);
//				var appRole	= GetSplitStr(appMakeup,"|",2);
//				fnAddOption(document.all.dlAppUserName,appAcc+"|"+appRole,appName);
//			}
//		}
//	}
//	catch(e)
//	{
//		return false;
//	}

//	return true;
//}

function fnDelOptions(argObj)
{
    var idx = argObj.options.length;
    for (var i = idx - 1; i >= 0; i--)
    {
        argObj.options.remove(i);
    }
}

function fnAddOption(argDDL, argValue, argText)
{
    var oOption = document.createElement("OPTION");
    var tagname = argDDL.tagName.toUpperCase();

    if (tagname == "SELECT")
    {
        oOption.text = argText;
        oOption.value = argValue;
        argDDL.add(oOption);
    }
    else if (tagname == "COMBOBOX")
    {
        argDDL.options.add(oOption);
        //1050629	Kevin_C	1050087		升級二代公文系統
        //oOption.innerText = argText;
        oOption.textContent = argText;
        oOption.Value = argValue;
        oOption.VALUE = argValue;
    }
}

function GetSplitStr(argStr, argSep, argIdx)
{
    var rg_szItems = argStr.split(argSep);
    if (argIdx < rg_szItems.length)
        return rg_szItems[argIdx];
    return "";
}
//0950614 Charles 設定核決者選項內容 end

//0950628 Charles 當下拉式選單onchange時呼叫，紀錄所選為何
//並記錄該選項的核決者姓名、核決者ID、核決者角色，以供新增彙併辦時的資料庫處理
function dlAppUserNameChange()
{
    //1050629	Kevin_C	1050087		升級二代公文系統 -S
    //document.all.H_txSelectedIdx.value = document.all.dlAppUserName.selectedIndex + ";" +
    //	document.all.dlAppUserName.options(document.all.dlAppUserName.selectedIndex).text + "|" +
    //	document.all.dlAppUserName.options(document.all.dlAppUserName.selectedIndex).value;
    document.all.H_txSelectedIdx.value = document.all.dlAppUserName.selectedIndex + ";" +
        document.all.dlAppUserName.options[document.all.dlAppUserName.selectedIndex].text + "|" +
        document.all.dlAppUserName.options[document.all.dlAppUserName.selectedIndex].value;
    //1050629	Kevin_C	1050087		升級二代公文系統 -S
}

//0990921 處理呼叫子視窗回傳值[0990413]-Jane
function CallBack(argCallerId)
{
    if (argCallerId == "EDI460")
    {
        var strRtnValue = "";

        document.all.H_NewDocList.value = jf_Trim(document.all.lbReturnValue.options[0].value);
        //1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，額外取得NEW_BY_OU
        let strRepresentativeDocNo = jf_Trim(document.all.lbReturnValue.options[1].value);
        let bConfirmChangeComNo = JSON.parse(document.all.lbReturnValue.options[2].value);

        //1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，調整後續行為同單筆加入
        if (document.all['OrgNickName'].value == 'MOCS' && document.all['dlAppUserName'].className == 'hide' && bConfirmChangeComNo)
            CombineWithNewComNo(strRepresentativeDocNo, document.all['H_NewDocList'].value)
        else if (document.all.H_NewDocList.value != "")
        {
            //postback回去加入dg
            Page_BlockSubmit = false;
            //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
            IsServerHandling = true;
            __doPostBack("btBatchAddNew", "");//設置一隱藏按鈕供postback事件
        }
    }

    //1011004	Jagle	[1010529]	EDP460S回傳母文設定及開啟
    //搜尋帶回文號後開啟
    if (argCallerId == "EDP460S")
    {
        //公文文號
        document.all["txComNo"].value = document.all["lbReturnValue"].options[0].value;
        if (document.all["txComNo"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//1010626 David 1010363 新增併件與子文更新分類案次欄位連動
function if_CheckComStatus()
{
    //1100201	Joe		1090927		取消使用document.activeElement
    // var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

    var pComStatusNo = xObjectName.substring(8, xObjectName.indexOf("_cbDg2ComStatus"));
    var pUpdateClsCaseNo = xObjectName.substring(8, xObjectName.indexOf("_cbDg2UpdateClsCase"));
    var ComStatusObj;
    var UpdateClsCaseObj;

    if (document.all["dg2__ctl" + pComStatusNo + "_cbDg2ComStatus"] != null)
    {
        ComStatusObj = document.all["dg2__ctl" + pComStatusNo + "_cbDg2ComStatus"].id;
    }
    if (document.all["dg2__ctl" + pUpdateClsCaseNo + "_cbDg2UpdateClsCase"] != null)
    {
        UpdateClsCaseObj = document.all["dg2__ctl" + pUpdateClsCaseNo + "_cbDg2UpdateClsCase"].id;
    }

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case ComStatusObj:
            Page_BlockSubmit = true;
            if (document.all["dg2__ctl" + pComStatusNo + "_cbDg2ComStatus"].checked)
            {
                //1141028 Zen 1141012 (外貿)隱藏分類號、保存年限相關欄位並預設彙併辦後不將子文之檔號更新為與母文相同，不勾選更新子文分類號選項
                if (document.all['TAITRA'] == undefined)
                    document.all["dg2__ctl" + pComStatusNo + "_cbDg2UpdateClsCase"].checked = true;
            }
            break;
        case UpdateClsCaseObj:
            Page_BlockSubmit = true;
            if (document.all["dg2__ctl" + pUpdateClsCaseNo + "_cbDg2ComStatus"].checked && !document.all["dg2__ctl" + pUpdateClsCaseNo + "_cbDg2UpdateClsCase"].checked)
            {
                alert("併件時子文分類案次號需與母文相同");
                document.all["dg2__ctl" + pUpdateClsCaseNo + "_cbDg2UpdateClsCase"].checked = true;
            }
            break;
    }
}
//1061025	Kevin_C	1060953		彙辦選項需連動DG的併件選項
function cbComTypeOnClick()
{
    //1081120	Joe		1080986		新增判斷若有待併或已併公文與母文不同簽核類型，不可勾選彙併辦--S
    var strCheckComType = "";
    var strDocList1 = "";
    var strDocList2 = "";
    var strBuffer = "";
    //1081120	Joe		1080986		新增判斷若有待併或已併公文與母文不同簽核類型，不可勾選彙併辦--E
    //1070524	Kevin_C	1060953	彙辦選項隱藏時不連動
    if ($("#cbComType").closest('span')[0].className != "hide")
    {
        //1081120	Joe		1080986		新增判斷若有待併或已併公文與母文不同簽核類型，不可勾選彙併辦--S
        if (document.all["cbComType"].checked == true)
        {
            for (let i = 2; i <= document.all.dg1.rows.length; i++)
            {
                if (document.all["dg1__ctl" + i + "_H_txDg1SignType"].value != document.all["H_ComSignType"].value && document.all["dg1__ctl" + i + "_H_txDg1SignType"].value != "")
                {
                    strDocList1 += strBuffer + document.all["dg1__ctl" + i + "_txDg1DocNo"].value;
                    strBuffer = "、";
                }
            }
            strBuffer = "";
            for (let i = 2; i <= document.all.dg2.rows.length; i++)
            {
                if (document.all["dg2__ctl" + i + "_H_txDg2SignType"].value != document.all["H_ComSignType"].value && document.all["dg2__ctl" + i + "_H_txDg2SignType"].value != "")
                {
                    strDocList2 += strBuffer + document.all["dg2__ctl" + i + "_txDg2DocNo"].value;
                    strBuffer = "、";
                }
            }
            if (strDocList1 != "")
            {
                strCheckComType += "已彙併辦公文" + strDocList1 + "與母文簽核類型不同，不可進行彙併辦。\n";
            }
            if (strDocList2 != "")
            {
                strCheckComType += "待彙併辦公文" + strDocList2 + "與母文簽核類型不同，不可進行彙併辦。\n";
            }
            if (strCheckComType != "")
            {
                document.all["cbComType"].checked = false;
                alert(strCheckComType);
            }
        }
        //1081120	Joe		1080986		新增判斷若有待併或已併公文與母文不同簽核類型，不可勾選彙併辦--E
        if (document.all["cbComType"].checked == true)
        {
            for (var i = 2; i <= document.all.dg2.rows.length; i++)
            {
                document.all["dg2__ctl" + i + "_cbDg2ComStatus"].checked = true;
                document.all["dg2__ctl" + i + "_cbDg2ComStatus"].disabled = true;
            }
        }
        else
        {
            for (var i = 2; i <= document.all.dg2.rows.length; i++)
            {
                document.all["dg2__ctl" + i + "_cbDg2ComStatus"].checked = false;
                //1081120	Joe		1080986		新增判斷若有待併或已併公文與母文不同簽核類型，不可勾選彙併辦--S
                // document.all["dg2__ctl" + i + "_cbDg2ComStatus"].disabled = false;
                if (document.all["dg2__ctl" + i + "_H_txDg2SignType"].value == document.all["H_ComSignType"].value)
                    document.all["dg2__ctl" + i + "_cbDg2ComStatus"].disabled = false;
                else
                    document.all["dg2__ctl" + i + "_cbDg2ComStatus"].disabled = true;
                //1081120	Joe		1080986		新增判斷若有待併或已併公文與母文不同簽核類型，不可勾選彙併辦--E
            }
        }
    }
}

//1111020 Zen 1110918 (銓敘部)支援依公文類型及文號大小調整彙併辦母文號
//1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，調整為傳入比較用文號相關屬性
//function ChangeComNo()
function ChangeComNo(argDocNo, argNewByOu)
{
    let bChangeComNo = false;
    let bConFirm = false;
    //1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，調整為傳入比較用文號相關屬性
    //let H_txDocNoNewByOu = document.all['H_txDocNoNewByOu'].value;
    let H_txDocNoNewByOu = argNewByOu;
    let H_txComNoNewByOu = document.all['H_txComNoNewByOu'].value;
    //1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，調整為傳入比較用文號相關屬性
    //let txNewDocNo = document.all['txNewDocNo'].value;
    let txNewDocNo = argDocNo;
    let txComNo = document.all['txComNo'].value;

    if (H_txDocNoNewByOu == 'N' && H_txComNoNewByOu == 'Y')
        bChangeComNo = true;
    else if (H_txDocNoNewByOu == H_txComNoNewByOu && Number(txNewDocNo) > Number(txComNo))
        bChangeComNo = true;

    //if (bChangeComNo)
    //    bConFirm = window.confirm('目前加入公文' + txNewDocNo + '為最大號碼，將以本公文進行辦理。確認後，母文' + txComNo + '將先進行解併，再以新母文' + txNewDocNo + '執行彙併辦作業。');

    //return bConFirm;
    return bChangeComNo;
}

//1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，改寫為函式並支援傳入批次新增之文號清單
function CombineWithNewComNo(argNewComNo, argNewDocList)
{
    $('#H_NewDocList').val('');

    $('#btSelectAll1')[0].click();
    $('#H_txNewComNo').val(argNewComNo);
    $('#H_txOldComNo').val($('#txComNo').val());

    //既有子文
    let bHasCheck = false;
    for (let i = 2; i <= $('#dg1')[0].rows.length; i++)
        if (document.all['dg1__ctl' + i + '_cbSelect'].checked)
        {
            $('#H_NewDocList')[0].value += document.all['dg1__ctl' + i + '_txDg1DocNo'].value + ';';
            bHasCheck = true;
        }

    //待加入子文
    for (let i = 2; i <= $('#dg2')[0].rows.length; i++)
        if (document.all['dg2__ctl' + i + '_txDg2DocNo'].value != '')
            $('#H_NewDocList')[0].value += document.all['dg2__ctl' + i + '_txDg2DocNo'].value + ';';

    //批次新增之子文，須排除新母文
    if (argNewDocList != '')
    {
        let strNewDocArr = argNewDocList.split(';');
        for (let i = 0; i < strNewDocArr.length; i++)
            if (strNewDocArr[i] != argNewComNo)
                $('#H_NewDocList')[0].value += strNewDocArr[i] + ';';
    }

    $('#H_NewDocList')[0].value += $('#txComNo').val();

    if (bHasCheck)
        $('#btRemove')[0].click();
    else
    {
        $('#txComNo')[0].disabled = false;
        $('#txComNo')[0].value = $('#H_txNewComNo').val();
        $('#btOpen')[0].click();
    }
}