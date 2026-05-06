/*
DATE	SA		PRG		MGR_NO			DESC
0970104			Leo     001016			增加回傳OuterNo
0990517	------	David	0990338			新增明細區相關選取功能鍵
0991001	------	David	0990469			(勞委會)新增刪除人民陳情公文時，檢核刪除原因
0991102	----	Yvonne	0990556			組出ReturnValue時，加上LEGISLATOR_NO(立委質詢案件流水號)、B_TYPE_NO(業務類別)
1010103	David	Kevin	1000976			DOC_TEMP新增回傳意見信箱之郵件編號、寄件者EMAIL、原始內容
1001019	------	David	1000539			因應AD to DB修改，CheckOrgno()內不呼叫GetUnitInfo WS，改由WEOrgInfo WS之GetOrgInfo取得
1010504	Kevin	Ivory	1010382			來文機關查詢改開啟WEM010C1,且III600以不再維護
1020503 David	Jagle	1011012			DOC_TEMP新增回傳來源別細項
1030514	David	David	1020724			ReturnValue新增ASSIGN_DOC_NO(上級收文號)、ASSIGN_RCV_DATE(上級收文日期)
1040119 Daivd	Eric	1040033			ReturnValue新增DOC_TEMP.MOIGROUP_CASE_NO
1040304 David   Eric    --              修改高榮、中榮、北榮使用時主旨可顯示完整
1041222	David	Kevin_C	1040838			(104年法規)加入重覆來文原因備註欄位，配合調整大小
1050602	David	David	1040838			當查詢資料無DM資訊時，ODT134畫面不顯示重複來文資訊欄位
1050712 David   Zen     1050087         二代公文修改
1050927	David	David	1050087			電子收文明細改開啟EDI011
1060518 Leslie  Zen     1060215         innerText相關修改
1070619	David	David	1070063			ReturnValue新增DOCUMENT_ID
1090415 Kevin   Zen     1090155         明細區新增寄送鈕
1100630 Kevin   Zen     1100428         新增註記刪除、復原之功能
1110216 Kevin   Zen     1101450         (考試院)新增個人專區相關功能
1120614 Kevin   Zen     1101450         (考試院)張貼日期條件改為區間查詢
1130227 Kevin   Zen     序42            修正中榮開啟後異常
1140814 Kevin   Zen     1140873         (中興大學)客製化個人專區需求
1140915 Kevin   Zen     1140873         (中興大學)修正簽收時間資料來源及支援以明細枝個人專區簽收時間排序
*/
var CurrOrgIdObj;
var CurrOrgNameObj;
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050711 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050711 Zen 1050087 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1050902 Zen 1050087 改於js檔宣告避免開啟時錯誤
if (document.all.dlSort)
    document.all.dlSort.onchange = dataSort;

//1110216 Zen 1101450 (考試院)新增個人專區相關功能
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

//1140915 Zen 1140873 (中興大學)修正簽收時間資料來源及支援以明細之個人專區發布時間排序，記錄原始查詢狀態
let strOriSearchType;
if (document.all['rbToLogin'].checked)
    strOriSearchType = 'rbToLogin';
else if (document.all['rbToDelete'].checked)
    strOriSearchType = 'rbToDelete';
else if (document.all['rbPersonalArea'].checked)
    strOriSearchType = 'rbPersonalArea';

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btOpenElec"));
    var btElec;
    if (document.all["dg1__ctl" + pNo + "_btOpenElec"] != null)
        btElec = document.all["dg1__ctl" + pNo + "_btOpenElec"].id;

    //1090415 Zen 1090155 明細區新增寄送鈕
    var pSendMailNo = xObjectName.substring(8, xObjectName.indexOf("_btSendMail"));
    var btSendMail;
    if (document.all["dg1__ctl" + pSendMailNo + "_btSendMail"] != null)
        btSendMail = document.all["dg1__ctl" + pSendMailNo + "_btSendMail"].id;

    //1110216 Zen 1101450 (考試院)新增個人專區相關功能
    var pPostNo = xObjectName.substring(8, xObjectName.indexOf("_btPost"));
    var btPost;
    if (document.all["dg1__ctl" + pPostNo + "_btPost"] != null)
        btPost = document.all["dg1__ctl" + pPostNo + "_btPost"].id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btHelp":
            //1010504	Ivory	1010382		來文機關查詢改開啟WEM010C1,且III600以不再維護		
            /*
            var strUrl = "";
            strUrl = "III600.aspx?rtnObj=lbReturnValue&nMode=1";
            jf_OpenChildWin(strUrl, "III600", 700, 500 );
            Page_BlockSubmit=true;
            break;
            */
            CurrOrgIdObj = document.all.txOrgno;
            CurrOrgNameObj = document.all.txOrgName;
            var strUrl = "";
            //1050714 Zen 1050087 WEM010C1子視窗修改--begin
            //strUrl = "WEM010C1.aspx?OrgID=" + document.all.H_SourceOrgno.value + "&amp;K1=WEM010&amp;Search=" + escape(CurrOrgIdObj.value);
            var path = document.all.H_Wed010C1Path.value;
            strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.h_OrgNo.value + "&K1=WEM010";
            //1050714 Zen 1050087 WEM010C1子視窗修改--end
            jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
            Page_BlockSubmit = true;
            break;
        case btElec:
            var Sysid = document.all["dg1__ctl" + pNo + "_H_ID"].value;
            //1050927 David 1050087 電子收文明細改開啟EDI011
            /*var At21ServerName = document.all["H_Name"].value;
            var AtWeb = document.all["atweb"].value;
            var strUrl = "";
            strUrl = "http://"+At21ServerName+"/"+AtWeb+"/ATI011.aspx?kv1="+Sysid+"&kv2=OD"+"&SAMLart="+document.all.Artifact.value;
            jf_OpenChildWin(strUrl, "ATI011", 760, 520 );*/
            if (document.all.ED_PATH && document.all.ED_PATH.value != "")
            {
                var strUrl = document.all.ED_PATH.value + "/ED0/EDI011.aspx?SAMLart=" + jf_GetArtifact() + "&kv1=" + Sysid + "&kv2=od";
                jf_OpenChildWin(strUrl, "ATI011", 760, 520);
            }
            else
                alert("環境變數WS_ED_SITE設定不正確，無法開啟");
            Page_BlockSubmit = true;
            break;
        //0990517 David 0990338 新增明細區相關選取功能鍵
        case "btSelectAll":
            Page_BlockSubmit = true;
            SelectAll();
            break;
        case "btClear":
            Page_BlockSubmit = true;
            SelectClear();
            break;
        case "btReverse":
            Page_BlockSubmit = true;
            SelectInverse();
            break;
        case "btSDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all["txSDate"], event.screenX, event.screenY);
            break;
        case "btEDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all["txEDate"], event.screenX, event.screenY);
            break;
        //1090415 Zen 1090155 明細區新增寄送鈕
        case btSendMail:
            Page_BlockSubmit = true;
            var Sysid = document.all["dg1__ctl" + pSendMailNo + "_H_ID"].value;
            jf_OpenChildWin('ODT134C1.aspx?kv1=' + Sysid, 'ODT134C1', 800, 600);
            break;
        //1110216 Zen 1101450 (考試院)新增個人專區相關功能
        case btPost:
            Page_BlockSubmit = true;
            let strSysid = document.all["dg1__ctl" + pPostNo + "_H_ID"].value;
            let strPAUrl = document.all['PAT001Url'].value + '?SYSID=' + strSysid;
            OpenPAT001(strPAUrl);
            break;
    }
}
//1050711 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
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

    //1050711 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id
    switch (xObjectName)
    {
        case "btSearch":
        //1110216 Zen 1101450 (考試院)新增個人專區相關功能
        case "btPreview":
            Page_BlockSubmit = !CheckBeforeSearch();
            //1050711 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            var index = 0;
            if (document.all["dlSecNo"].className == "DisplayOnly")
                index = document.all["dlSecNo"].selectedIndex;
            //950424 Charles 清除時不用跳出"確定要清除嗎"確認視窗，直接清除
            //jf_ConfirmClean();
            jf_Clean();
            document.all["dlSecNo"].selectedIndex = index;
            //1050712 Zen 1050087 二代公文修改
            //document.all["txSDate"].focus();
            $('#txSDate').focus();
            break;
        case "btDelete":
            Page_BlockSubmit = true;

            //判斷是否有選取
            var nSelected = 0;
            var pDg1Len = document.all.dg1.rows.length;
            var strCbDelete = "";
            var strPD = "";

            //1050712 Zen 1050087 二代公文修改
            for (var i = 2; i < pDg1Len + 1; i++)
            {
                strCbDelete = "dg1__ctl" + i + "_cbDelete";
                if (!document.all[strCbDelete].checked) continue;
                nSelected++;

                //0991001 David 0990469 新增檢核人民陳情公文刪除原因
                if (document.all.H_ODT132.value == "Y")
                {
                    if (document.all["dg1__ctl" + i + "_txOuterNo"].value != "" && document.all["dg1__ctl" + i + "_txDelReason"].value == "")
                    {
                        if (strPD == "")
                            strPD = "序" + (i - 1);
                        else
                            strPD += "," + (i - 1);
                    }
                }
            }

            if (nSelected == 0)
            {
                alert("請先選取要刪除的公文");
                return;
            }
            //0991001 David 0990469 新增檢核人民陳情公文刪除原因
            if (strPD != "")
            {
                alert(strPD + "，為人民陳情公文，請輸入刪除原因");
                return;
            }

            if (confirm("確定要刪除所選的這 " + nSelected + " 筆公文?"))
            {
                Page_BlockSubmit = false;
                //1050711 Zen 1050087 二代公文修改
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;


        //1100630 Zen 1100428 新增註記刪除、復原之功能
        case "btMarkDelete":
        case "btRestore":
            Page_BlockSubmit = true;
            if (!CheckSelected())
                return;

            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
    //1010504	Ivory	1010382	來文機關查詢改開啟WEM010C1
    if (argCallerId == "WEM010C1")
    {
        var DeptInfo = document.all["lbReturnValue"].options[0].value;
        //1050518 Zen 1050087 WEM010C1子視窗修改
        //var DeptArray = DeptInfo.split(',');
        var DeptArray = DeptInfo.split('^');
        CurrOrgNameObj.value = DeptArray[1];
        if (DeptArray[9] == "")
        { CurrOrgIdObj.value = DeptArray[1]; }
        else
        { CurrOrgIdObj.value = DeptArray[9]; }
    }

    //1110216 Zen 1101450 (考試院)新增個人專區相關功能
    if (argCallerId == "PAT001")
    {
        let bIsPost = document.all["lbReturnValue"].options[0];
        document.all["lbReturnValue"].options.length = 0;

        if (bIsPost)
            $('#btSearch').click();
    }

    /*
    if (argCalledId == "III600")
    {
        document.all["txOrgno"].value  = document.all["lbReturnValue"].options[0].value;
        document.all["txOrgName"].value= document.all["lbReturnValue"].options[1].value;
    }*/
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    //1050712 Zen 1050087 二代公文修改
    //jf_CallWS("lib/OD_LIB.asmx", "GetUnitInfo", false, null);

    //0991001 David 0990469 刪除註記欄位設定

    //1050712 Zen 1050087 二代公文修改--begin
    //if (document.all.H_ODT132.value == "Y")
    //    document.all.tdDel.className = "";
    //else
    //	//1020503	Jagle	[1011012]	配合調整大小
    //	//document.all.div.style.width = "873px";
    //	//1041222	Kevin_C	1040838	加入重覆來文原因備註欄位，配合調整大小
    //	//document.all.div.style.width = "995px";
    //    document.all.div.style.width = "1024px";
    //1050712 Zen 1050087 二代公文修改--end

    //1040304 Eric 修改高榮、中榮、北榮使用時主旨可顯示完整
    if (document.all.OrgNickName.value == "TVGH" || document.all.OrgNickName.value == "KVGH" || document.all.OrgNickName.value == "TPVGH")
    {
        if (document.all.dg1 != null)
        {
            var pDg1Len = document.all.dg1.rows.length;
            //1130227 Zen 序42 修正中榮開啟後異常
            //for (var i = 2; i <= pDg1Len + 1; i++)
            for (var i = 2; i <= pDg1Len; i++)
            {
                document.all["dg1__ctl" + i + "_lbFromSubject"].style.overflow = "visible"
                //1130227 Zen 序42 修正中榮開啟後異常
                let strId = "dg1__ctl" + i + "_lbFromSubject";
                document.all[strId].style.display = '';
                document.all[strId].className = '';
                $('#' + strId).off('mouseover');
                $('#' + strId).off('click');
            }
        }
    }

    //1050712 Zen 1050087 二代公文修改--begin
    ////1050602 David 1040838 無DM資訊不顯示欄位
    //if (document.all.HasDm && document.all.HasDm.value == "N")
    //{
    //	document.all.tdDmInfo.className = "hide";
    //	document.all.tdRcvOrg.style.width = "180px";
    //	document.all.tdSubject.style.width = "220px";
    //	if (document.all.dg1 != null)
    //	{
    //		var pDg1Len = document.all.dg1.rows.length;
    //		for (var i = 2; i <= pDg1Len + 1; i++)
    //		{
    //			document.all["dg1__ctl" + i + "_lbRCV_ORG"].style.width = "180px";
    //			document.all["dg1__ctl" + i + "_lbFromSubject"].style.width = "220px";
    //		}
    //	}
    //    document.all.div.style.width = "918px";
    //    ;
    //}
    //else
    //    document.all.tdDmInfo.className = "";
    //1050712 Zen 1050087 二代公文修改--end

    //1100630 Zen 1100428 新增註記刪除、復原之功能
    ControlButtonStatus();
}

function OnWSResult(argResult)
{
    if (argResult.id == wsGetOrgNameID)
    {
        //檢查執行是否成功
        if (!argResult.error)
            document.all["txOrgName"].value = argResult.value[0][1];
    }
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].innerText = obj.value;
}
//function ReturnValue(argSysID,argRcvDate,argRcvTime,argFromDate,argFromOrg,argRcvOrgno,argRcvOrg,argFromWord,argFromNo,argSubject,argSecNo,argSpeed,argDocCategory,argDocType,argFolderDir,argRcvStatus,argFromOrgno,argDocNo,argSourceType,argInnerNo,argOuterNo)
//1010103 Kevin 1000976 DOC_TEMP新增回傳意見信箱之郵件編號、寄件者EMAIL、原始內容
//function ReturnValue(argSysID,argRcvDate,argRcvTime,argFromDate,argFromOrg,argRcvOrgno,argRcvOrg,argFromWord,argFromNo,argSubject,argSecNo,argSpeed,argDocCategory,argDocType,argFolderDir,argRcvStatus,argFromOrgno,argDocNo,argSourceType,argInnerNo,argOuterNo,argLGNo,argBTypeNo)
//1020503 	Jagle	[1011012]			DOC_TEMP新增回傳來源別細項
//function ReturnValue(argSysID,argRcvDate,argRcvTime,argFromDate,argFromOrg,argRcvOrgno,argRcvOrg,argFromWord,argFromNo,argSubject,argSecNo,argSpeed,argDocCategory,argDocType,argFolderDir,argRcvStatus,argFromOrgno,argDocNo,argSourceType,argInnerNo,argOuterNo,argLGNo,argBTypeNo,argSuggestNo,argSuggestEmail,argSuggestContent)
//1030514 David 1020724 ReturnValue新增ASSIGN_DOC_NO(上級收文號)、ASSIGN_RCV_DATE(上級收文日期)
//function ReturnValue(argSysID,argRcvDate,argRcvTime,argFromDate,argFromOrg,argRcvOrgno,argRcvOrg,argFromWord,argFromNo,argSubject,argSecNo,argSpeed,argDocCategory,argDocType,argFolderDir,argRcvStatus,argFromOrgno,argDocNo,argSourceType,argInnerNo,argOuterNo,argLGNo,argBTypeNo,argSuggestNo,argSuggestEmail,argSuggestContent,argRcvDescNo)
//1040119 Eric	1040033	ReturnValue新增DOC_TEMP.MOIGROUP_CASE_NO
//function ReturnValue(argSysID,argRcvDate,argRcvTime,argFromDate,argFromOrg,argRcvOrgno,argRcvOrg,argFromWord,argFromNo,argSubject,argSecNo,argSpeed,argDocCategory,argDocType,argFolderDir,argRcvStatus,argFromOrgno,argDocNo,argSourceType,argInnerNo,argOuterNo,argLGNo,argBTypeNo,argSuggestNo,argSuggestEmail,argSuggestContent,argRcvDescNo,argAssignDocNo,argAssignRcvDate)
//1041223 Kevin_C	1040838	ReturnValue新增RCV_DM_TYPE及RCV_DM_DESC
//function ReturnValue(argSysID,argRcvDate,argRcvTime,argFromDate,argFromOrg,argRcvOrgno,argRcvOrg,argFromWord,argFromNo,argSubject,argSecNo,argSpeed,argDocCategory,argDocType,argFolderDir,argRcvStatus,argFromOrgno,argDocNo,argSourceType,argInnerNo,argOuterNo,argLGNo,argBTypeNo,argSuggestNo,argSuggestEmail,argSuggestContent,argRcvDescNo,argAssignDocNo,argAssignRcvDate,argMoiGroupCaseNo)
//1070619 David 1070063 ReturnValue新增DOCUMENT_ID
//function ReturnValue(argSysID,argRcvDate,argRcvTime,argFromDate,argFromOrg,argRcvOrgno,argRcvOrg,argFromWord,argFromNo,argSubject,argSecNo,argSpeed,argDocCategory,argDocType,argFolderDir,argRcvStatus,argFromOrgno,argDocNo,argSourceType,argInnerNo,argOuterNo,argLGNo,argBTypeNo,argSuggestNo,argSuggestEmail,argSuggestContent,argRcvDescNo,argAssignDocNo,argAssignRcvDate,argMoiGroupCaseNo,argRcvDmType,argRcvDmDesc)
function ReturnValue(argSysID, argRcvDate, argRcvTime, argFromDate, argFromOrg, argRcvOrgno, argRcvOrg, argFromWord, argFromNo, argSubject, argSecNo, argSpeed, argDocCategory, argDocType, argFolderDir, argRcvStatus, argFromOrgno, argDocNo, argSourceType, argInnerNo, argOuterNo, argLGNo, argBTypeNo, argSuggestNo, argSuggestEmail, argSuggestContent, argRcvDescNo, argAssignDocNo, argAssignRcvDate, argMoiGroupCaseNo, argRcvDmType, argRcvDmDesc, argDocumentID)
{
    var pFromOrg = argFromOrg;
    var pFromOrgNo = argFromOrgno;
    if (pFromOrgNo == "")
    {
        pFromOrgNo = pFromOrg;
        pFromOrg = "";
    }

    //1010103 Kevin 1000976 DOC_TEMP新增回傳意見信箱之郵件編號、寄件者EMAIL、原始內容	
    //opener.document.all.lbReturnValue.length = 23;
    //1020503 	Jagle	[1011012]			DOC_TEMP新增回傳來源別細項
    //opener.document.all.lbReturnValue.length = 26;
    //1030514 David 1020724 ReturnValue新增ASSIGN_DOC_NO(上級收文號)、ASSIGN_RCV_DATE(上級收文日期)
    //opener.document.all.lbReturnValue.length = 27;
    //1040119 Eric	1040033	ReturnValue新增DOC_TEMP.MOIGROUP_CASE_NO
    //opener.document.all.lbReturnValue.length = 29;
    //1041223 Kevin_C	1040838	ReturnValue新增RCV_DM_TYPE及RCV_DM_DESC
    //opener.document.all.lbReturnValue.length = 30;
    //1070619 David 1070063 ReturnValue新增DOCUMENT_ID
    //opener.document.all.lbReturnValue.length = 32;
    opener.document.all.lbReturnValue.length = 33;
    opener.document.all.lbReturnValue.options[0].text = argSysID;
    opener.document.all.lbReturnValue.options[1].text = argRcvDate;
    opener.document.all.lbReturnValue.options[2].text = argRcvTime;
    opener.document.all.lbReturnValue.options[3].text = argFromDate;
    opener.document.all.lbReturnValue.options[4].text = pFromOrg;  //來文機關名稱
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
    opener.document.all.lbReturnValue.options[16].text = pFromOrgNo;  //來文機關代碼
    opener.document.all.lbReturnValue.options[17].text = argDocNo;
    opener.document.all.lbReturnValue.options[18].text = argSourceType;
    opener.document.all.lbReturnValue.options[19].text = argInnerNo; //新增SOURCE_TYPE及INNER_NO兩欄位 #2006.01.10 Andy
    opener.document.all.lbReturnValue.options[20].text = argOuterNo;//0970103 Leo 新增OuterNo
    //0991102	[0990556]	Yvonne	組出ReturnValue時，加上LEGISLATOR_NO(立委質詢案件流水號)、B_TYPE_NO(業務類別)
    opener.document.all.lbReturnValue.options[21].text = argLGNo;
    opener.document.all.lbReturnValue.options[22].text = argBTypeNo;

    //1010103 Kevin 1000976 DOC_TEMP新增回傳意見信箱之郵件編號、寄件者EMAIL、原始內容
    opener.document.all.lbReturnValue.options[23].text = argSuggestNo;
    opener.document.all.lbReturnValue.options[24].text = argSuggestEmail;
    opener.document.all.lbReturnValue.options[25].text = argSuggestContent;

    //1020503 	Jagle	[1011012]			DOC_TEMP新增回傳來源別細項
    opener.document.all.lbReturnValue.options[26].text = argRcvDescNo;

    //1030514 David 1020724 ReturnValue新增ASSIGN_DOC_NO(上級收文號)、ASSIGN_RCV_DATE(上級收文日期)
    opener.document.all.lbReturnValue.options[27].text = argAssignDocNo;
    opener.document.all.lbReturnValue.options[28].text = argAssignRcvDate;

    //1040119 Eric	1040033	ReturnValue新增DOC_TEMP.MOIGROUP_CASE_NO
    opener.document.all.lbReturnValue.options[29].text = argMoiGroupCaseNo;

    //1041223 Kevin_C	1040838	ReturnValue新增RCV_DM_TYPE及RCV_DM_DESC
    opener.document.all.lbReturnValue.options[30].text = argRcvDmType;
    opener.document.all.lbReturnValue.options[31].text = argRcvDmDesc;

    //1070619 David 1070063 ReturnValue新增DOCUMENT_ID
    opener.document.all.lbReturnValue.options[32].text = argDocumentID;

    opener.window.CallBack("ODT134");

    if (jf_Trim(document.all.H_txIsClose.value) == "N")
        opener.window.focus();
    else
        close();
}

function CheckBeforeSearch()
{
    var bRtn = true;
    //1010504	Ivory	1010382	查詢前觸發來文機關ONBLUR
    CheckOrgno();

    var strSDate = document.all["txSDate"].value;
    var strEDate = document.all["txEDate"].value;

    //1120614 Zen 1101450 (考試院)張貼日期條件改為區間查詢
    let strErrMsg = '';
    let strPasteDateS = $('#txPasteDateS').val();
    let strPasteDateE = $('#txPasteDateE').val();

    if (strPasteDateS == '' && strPasteDateE != '')
        $('#txPasteDateS').val(strPasteDateE);
    else if (strPasteDateS != '' && strPasteDateE == '')
        $('#txPasteDateE').val(strPasteDateS);
    else if (Number(strPasteDateS) > (Number(strPasteDateE))) 
    {
        $('#txPasteDateS').val(strPasteDateE);
        $('#txPasteDateE').val(strPasteDateS);
    }

    //1110216 Zen 1101450 (考試院)新增個人專區相關功能，新增張貼日期條件
    //if (strSDate == "" && strEDate == "")
    //1120614 Zen 1101450 (考試院)張貼日期條件改為區間查詢
    //if (strSDate == "" && strEDate == "" && document.all['txPasteDate'].value == '')
    if (strSDate == "" && strEDate == "" && document.all['txPasteDateS'].value == '' && document.all['txPasteDateE'].value == '')
    {
        bRtn = false;
        //1110216 Zen 1101450 (考試院)新增個人專區相關功能，調整提示訊息
        //jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文日期起訖欄位不可皆為空白"])),"");
        //1120614 Zen 1101450 (考試院)張貼日期條件改為區間查詢
        //jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["日期起訖欄位不可為空白"])), "");
        strErrMsg += '日期起訖欄位不可為空白\n';
        //1050712 Zen 1050087 二代公文修改
        //document.all["txSDate"].focus();
        $('#txSDate').focus();
    }

    //1120614 Zen 1101450 (考試院)張貼日期條件改為區間查詢
    if (strErrMsg != '')
    {
        alert(strErrMsg);
        return false;
    }

    return bRtn;
}

var wsGetOrgNameID;//宣告webserver回傳值id
function CheckOrgno()
{
    var strOrgno = jf_Trim(document.all["txOrgno"].value);
    if (strOrgno != "")
    {
        //1001019 David 1000539 修正取得機關資訊，由WEOrgInfo WS之GetOrgInfo取得
        /*
        var arWSParam = new Array(1);
        arWSParam[0] = strOrgno;
        callObj = jf_CallWS("lib/OD_LIB.asmx", "GetUnitInfo", false, arWSParam);
        wsGetOrgNameID = callObj.id;
        OnWSResult(callObj);
        IsServerHandling = true;
        jf_ShowWaitState();
        */
        GetOrgInfo(document.all.txOrgno, document.all.txOrgName);
    }
}

/*******************************************************************************************
                其		他		共		用		function
********************************************************************************************/
//日期onblur
function CheckCDATE(argObj, strMsg)
{
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1050712 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
        }
    }
}

//0990517 David 0990338 新增明細區相關選取功能鍵--START
//全選
function SelectAll()
{
    //1100201 Kevin 1090927 修正Safari效能問題
    //for (var iRow=2;iRow<=document.all.dg1.rows.length+1;iRow++)
    var idg1lenth = document.all.dg1.rows.length;
    for (var iRow = 2; iRow <= idg1lenth; iRow++)
    {
        document.all["dg1__ctl" + iRow + "_cbDelete"].checked = true;
    }
}

//反向
function SelectInverse()
{
    //1100201 Kevin 1090927 修正Safari效能問題
    //for (var iRow=2;iRow<=document.all.dg1.rows.length+1;iRow++)
    var idg1lenth = document.all.dg1.rows.length;
    for (var iRow = 2; iRow <= idg1lenth; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_cbDelete"].checked)
            document.all["dg1__ctl" + iRow + "_cbDelete"].checked = false;
        else
            document.all["dg1__ctl" + iRow + "_cbDelete"].checked = true;
    }
}

//取消
function SelectClear()
{
    //1100201 Kevin 1090927 修正Safari效能問題
    //for (var iRow=2;iRow<=document.all.dg1.rows.length+1;iRow++)
    var idg1lenth = document.all.dg1.rows.length;
    for (var iRow = 2; iRow <= idg1lenth; iRow++)
    {
        document.all["dg1__ctl" + iRow + "_cbDelete"].checked = false;
    }
}
//0990517 David 0990338 新增明細區相關選取功能鍵--END

//1001019 David 1000539 修正取得機關資訊，由WEOrgInfo WS之GetOrgInfo取得
function GetOrgInfo(argTxObj, argLbObj)
{
    if (argTxObj.value == "")
        return;

    var wsParam = new Array();
    wsParam[0] = argTxObj.value;
    wsParam[1] = document.all.h_OrgNo.value;
    wsParam[2] = document.all.h_DeptNo.value;
    wsParam[3] = document.all.h_UserId.value;
    var CallWsObj = jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, wsParam);

    //檢查執行是否成功
    if (jf_IsWebServiceSuccess(CallWsObj))
    {
        if (!CallWsObj.value.ErrorClass.IsErr)
        {
            if (CallWsObj.value.Count > 0)
            {
                argTxObj.value = CallWsObj.value.OrgID[0];
                argLbObj.value = CallWsObj.value.OrgName[0];
            }
            else //1010504	Ivory	1010382	找不到值時應清空
            {
                argLbObj.value = "";
            }
        }
        else
        {
            alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
        }
    }
}

//1050712 Zen 1050087 二代公文修改--begin

arrOfOrder = [document.getElementById('hlFromDate').getAttribute('href'),
document.getElementById('hlFromOrg').getAttribute('href'),
document.getElementById('hlFromWord').getAttribute('href'),
document.getElementById('hlRCV_ORG').getAttribute('href'),
//1140915 Zen 1140873 (中興大學)修正簽收時間資料來源及支援以明細枝個人專區簽收時間排序
//document.getElementById('hllaDateTime').getAttribute('href')];
document.getElementById('hllaDateTime').getAttribute('href')
, document.getElementById('hlSignDate').getAttribute('href')
];
function dataSort()
{
    window.location.href = arrOfOrder[document.getElementById('dlSort').selectedIndex];
}
//1050712 Zen 1050087 二代公文修改--end

//1100630 Zen 1100428 新增註記刪除、復原之功能
function SearchTypeClick(argId)
{
    ControlButtonStatus();

    //1140915 Zen 1140873 (中興大學)修正簽收時間資料來源及支援以明細之個人專區發布時間排序，依原始查詢狀態調整查詢、排序方式
    if (strOriSearchType == 'rbPersonalArea' && argId != 'rbPersonalArea' && document.all['dlSort'].selectedOptions[0].text == '個人專區')
        window.location.href = document.all['hllaDateTime'].href;
    else
        $('#btSearch').click();
}

function ControlButtonStatus()
{
    if (document.all['rbToLogin'].checked)
    {
        document.all['btMarkDelete'].className = '';
        document.all['btRestore'].className = 'hide';
        document.all['btDelete'].className = 'hide';
        //1110216 Zen 1101450 (考試院)新增個人專區相關功能
        document.all['btPreview'].className = 'hide';
        document.all['htrRcvDate'].className = '';
        document.all['htrPasteDate'].className = 'hide';
    }
    else if (document.all['rbToDelete'].checked)
    {
        document.all['btMarkDelete'].className = 'hide';
        document.all['btRestore'].className = '';
        document.all['btDelete'].className = '';
        //1110216 Zen 1101450 (考試院)新增個人專區相關功能
        document.all['btPreview'].className = 'hide';
        document.all['htrRcvDate'].className = '';
        document.all['htrPasteDate'].className = 'hide';
    }
    //1110216 Zen 1101450 (考試院)新增個人專區相關功能
    else if (document.all['rbPersonalArea'].checked)
    {
        document.all['btMarkDelete'].className = 'hide';
        document.all['btRestore'].className = 'hide';
        document.all['btDelete'].className = 'hide';
        document.all['btPreview'].className = '';
        document.all['htrRcvDate'].className = 'hide';
        document.all['htrPasteDate'].className = '';
    }
}

function CheckSelected()
{
    var nSelected = 0;
    var pDg1Len = document.all['dg1'].rows.length;

    for (var i = 2; i < pDg1Len + 1; i++)
    {
        if (!document.all['dg1__ctl' + i + '_cbDelete'].checked)
            continue;

        nSelected++;
    }

    if (nSelected == 0)
    {
        alert("請先選取公文在執行");
        return false;
    }

    return true;
}

//1110216 Zen 1101450 (考試院)新增個人專區相關功能
var bOpenPAT001 = false;
function OpenPAT001(argUrl)
{
    if (bOpenPAT001)
    {
        alert("已開啟其他公文PAT001視窗，請關閉後再執行開啟");
        return;
    }

    oWinPAT001 = jf_OpenChildWin(argUrl, "PAT001");
    bOpenPAT001 = true;
    oTimerWaitPAT001Close = setInterval("fnWaitPAT001Close()", 500);
}

var oTimerWaitPAT001Close = null;
var oWinPAT001 = null;
function fnWaitPAT001Close()
{
    if (oWinPAT001 == null)
        return;
    try
    {
        if (oWinPAT001.closed)
        {
            bOpenPAT001 = false;
            clearInterval(oTimerWaitPAT001Close);
        }
    }
    catch (e)
    { }
}

//1110216 Zen 1101450 (考試院)新增個人專區相關功能
function PersonalAreaToODT130(argSysid, argPersonalSeq)
{
    //1140814 Zen 1140873 (中興大學)客製化個人專區需求
    var strConfirmtMsg = '本份文已發布過至個人專區，是否從個人專區移除並帶回ODT130進行分文？';
    if (document.all['OrgNickName'].value == 'NCHU')
        strConfirmtMsg = '本份文已發布過至個人專區，是否從個人專區移除並重新搜索？';

    //1140814 Zen 1140873 (中興大學)客製化個人專區需求
    //if (confirm('本份文已發布過至個人專區，是否從個人專區移除並帶回ODT130進行分文？'))
    if (confirm(strConfirmtMsg))
    {
        let strSysidArr = new Array();
        strSysidArr.push(argSysid);

        let strPersonalSeqArr = new Array();
        strPersonalSeqArr.push(argPersonalSeq);

        let rtnObj = OD.ODT134.DeletePersonalDoc(document.all['Artifact'].value, document.all['H_SourceOrgno'].value, strSysidArr, strPersonalSeqArr)
        if (rtnObj.value == '')
            return true;
        else
        {
            alert(strErrMsg);
            return false;
        }
    }
    else
        return false;
}