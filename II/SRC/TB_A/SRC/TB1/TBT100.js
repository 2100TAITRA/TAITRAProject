/*
DATE	SA		PRG		MGR_NO		DESC
0960507			Matte	000904		清除鍵無法清除欄位資料
0960713			Matte	000966		新增附件描述欄位
0970828			Leo		001674		新增通知全部及merge清除全部功能
0980612	Stella	David	0980278		儲存前紀錄附件最新資訊
0980901	Stella	David	0980347		於附件DataGrid中執行區域新增開啟功能鍵，點選後可開啟該附件
0980918	Stella	David	0980455		使用WebFileIO時，應傳入Artifact
0990311	Stella	David	0990165		新增來文機關欄位，OnBlur及機關查詢子視窗配合修改
0990625	------	David	0990024		新增紀錄附件類型
0990726	------	David	0990071		AJAX CalculateDate()、CalculateDays()須用到機關代碼，多傳入
0991215	------	David	0990750		新增發布對象可選擇角色
0991231	------	David	0991039		公告對象帶入EMAIL通知選項勾選預設值依參數設定
1000519	------	David	1000453		如為內部發文公告，刪除時跳出提示訊息
1010501 David   Cloud   1010322 	日期欄位新增小日曆
1020517	Kevin	Kevin	1020257		帳號發布對象新增儲存單位
1020801	David	Cloud	1020607		修正發布對象為帳號時，點擊名稱帶不回來的bug
1030304	David	Cloud	1030110		修正開啟含附件公告儲存後會出現異常的bug
1030410	Cloud	Cloud	1000854		支援ASP架構，進行程式修改
1038013	------	Cloud	-------		補消失的code
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1031030	Cloud	Eric	1030701		增加附件描述字數限制以及錯誤訊息
1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1051114	Cloud	Kevin_C	1050234		取得系統參數WE_ATTACH_CHECK進行副檔名檢核
1060112	Cloud	Kevin_C	1050234		修正附檔名取得邏輯
1060510	Cloud	Kevin_C	1050087		升二代
1060627	Cloud	Kevin_C	1060508		修正附件DG顯示不正確的問題
1060822	Cloud	Kevin_C	1060765		修正IE環境txFilePath未定義的問題
1061201	Cloud	Kevin_C	1061157		修正TBT100說明欄位無法換行的問題
1070803 Kevin   Justin	1070678		弱掃修正Client Cookies Inspection
1071001	Leslie	Kevin_C	1070678		因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
1071031	Cloud	Cloud	---			修正檔案大小紀錄錯誤問題
1071107	Cloud	Kevin_C	1071115		改成上傳結束後才POST BACK
1071116 Cloud	Kevin_C	1071115		修正無附件時無法發布公告的問題
1071224 Cloud	Kevin_C	1071115		修正開啟有附件的公告時無法儲存的問題
1080318	Kevin	Joe		1080098		弱掃修正禁用WSDL
1080904	Kevin	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理
1090612 David	Zen 	1071180     附件上傳至AP邏輯改於Server執行
1090821 Leslie  Zen     1090550     修正多次加入附件的情況下發布公告錯誤之問題
1090914 Leslie  Zen     1090643     修正開啟SSL後未轉換網址導致取得機關名稱錯誤
1090914 Leslie  Zen     1090664     修正發布公告中點擊功能鍵導致多次發布重複公告之問題
1100201	Leslie	Joe		1090927		取消使用document.activeElement
1100218	Kevin	Joe		1100203		弱掃修正No Request Validation
1110103 Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1120811 Kevin   Zen     1120693     滲透測試弱掃修正
1121220	Leslie	Leslie	--			各機關問題彙整表 序346，修正可開啟使用者當前夾帶的附件
1130805	Zen		Zen		序169		刪除非末筆附件後再加入發布錯誤
1131015 Kevin   Zen     1130941     弱掃XSS修正
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
var wsCalculateDateID;
var wsCalculateDaysID;
var wsCalOrgInfo;

//1060510	Kevin_C	1050087	升二代 -S
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1061201	Kevin_C	1061157		修正TBT100說明欄位無法換行的問題
document.all.txContent.onkeydown = fnHandleTextarea;
var AllFiles = [];//用於存放檔案物件
//1060510	Kevin_C	1050087	升二代 -E
document.all.rbSelectOrg.onclick = fnSelectClick;
document.all.rbSelectGroup.onclick = fnSelectClick;

//1060510	Kevin_C	1050087	升二代，避開AJAXPRO -S
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        }
        else
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
//1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題，紀錄附件夾帶次數
var nInputFileCnt = '';

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060510	Kevin_C	1050087	升二代 -s
    //jf_CallWA(jf_Trim(document.all.txInsideTBWS.value), "", false, null);
    //var strUrl = "http://"+document.all.WEDEP_SERVER_NAME.value+"/WEDEP/WEOrgInfo.asmx";
    //jf_CallW(strUrl, "", false, null);
    //richedit.appendHTML(document.all.txContent.value); //顯示內文
    //richedit.setFocus(); //設定focus到內文區
    //RTELoaded(window.richedit);
    //1060510	Kevin_C	1050087	升二代 -e

    jf_fnShowDG();
    jf_CheckInSideOutSide();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl() {
function ClientButtonControl(e)
{
    // var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    var btAddClear;
    //1100201	Joe		1090927		取消使用document.activeElement
    // if (document.activeElement.id.indexOf("btAddClear") != -1)
    if (xObjectName.indexOf("btAddClear") != -1)
        btAddClear = xObjectName;
    Page_BlockSubmit = true;
    switch (xObjectName)
    {
        case btAddClear:
            fnbtAddClearItem();
            break;
        case "btAddFile":
            //1060822	Kevin_C	1060765	修正IE環境txFilePath未定義的問題
            //txFilePath.click();
            //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題
            //$('#txFilePath').click();
            $('#txFilePath' + nInputFileCnt).click();
            //1060510	Kevin_C	1050087	升二代
            //fnAddFile();
            break;
        //0970107 Iris 清除所有受文者
        case "btCleanAll":
            fnCleanAllDg();
            break;
        //0990311 David 0990165 新增機關查詢子視窗
        case "btHelp":
            var strUrl = "";
            strUrl = "http://" + document.all.WEDEP_SERVER_NAME.value + "/WEDEP/WEM010C1.aspx?OrgID=" + document.all.H_OrgNo.value + "&K1=WEM020Help";
            jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
            break;
        //1010501 Cloud   1010322 日期欄位新增小日曆
        case "btPasteDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txPasteDate, event.screenX, event.screenY);
            fnCalculateDays();
            break;
        case "btExpireDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txExpireDate, event.screenX, event.screenY);
            fnCalculateDays();
            break;
    }
}

function jf_CheckInSideOutSide()
{
    if (document.all["rbInside"].checked)
    {
        if (document.all["rbRange2"])
            document.all["rbRange2"].disabled = "disabled";
        if (document.all["rbRange3"])
            document.all["rbRange3"].disabled = "disabled";
        document.all["rbOther"].disabled = "";
        document.all["rbUnit"].disabled = "";
        document.all["rbOrg"].disabled = "";
    }
    else
    {
        if (document.all["rbRange2"])
            document.all["rbRange2"].disabled = "";
        if (document.all["rbRange3"])
            document.all["rbRange3"].disabled = "";
        document.all["rbOther"].disabled = "disabled";
        document.all["rbUnit"].disabled = "disabled";
        document.all["rbOrg"].disabled = "disabled";
        document.all["rbOrg"].checked = true;
        jf_fnShowDG();
    }
}
//顯示公告對象其他條件時，輸入之dg
function jf_fnShowDG()
{
    if (document.all.dgtarget)
    {
        if (document.all["rbOther"].checked)
        {
            document.all.dgtarget.disabled = false;
            document.all.rbSelectOrg.disabled = false;
            document.all.rbSelectGroup.disabled = false;
            document.all.btCleanAll.disabled = false;//iris 0970107
            document.all.cbDiv.className = "hide";
            if (document.all.rbSelectOrg && document.all.rbSelectGroup)
            {
                if (document.all.rbSelectOrg.checked == false && document.all.rbSelectGroup.checked == false)
                    document.all.rbSelectOrg.click();
            }
            if (document.all.txEnableOD17.value == "Y")//0970916 Leo 
                document.all.cbUnitSpan.className = "hide";
        }
        else
        {
            document.all.dgtarget.disabled = true;
            document.all.btCleanAll.disabled = true;//iris 0970107
            document.all.rbSelectOrg.disabled = true;
            document.all.rbSelectGroup.disabled = true;
            document.all.cbDiv.className = "";
            document.all.cbUnitSpan.className = "";
        }
    }
}
//瀏覽並加入附件
function fnAddFile()
{
    if (!document.all.dgAttach)
        return;
    //1060510	Kevin_C	1050087	升二代 -S
    //var strFileFullPath = "";
    //document.all["BF"].Title = "請選擇待上傳檔案路徑";

    //if(document.all["BF"].ShowDialog(0) != 0)  //有指定值
    //	strFileFullPath = document.all["BF"].Path;
    //else
    //	return;
    //if (!strFileFullPath)
    //	return;
    //var fso = new ActiveXObject("Scripting.FileSystemObject");
    //var oFile = fso.GetFile(strFileFullPath);
    //var nFileSize = (oFile.Size == 0) ? 0 : Math.ceil(oFile.Size / 1024);
    //var nFileSizeLimit = (document.all.txFileSizeLimit.value == "" ) ? 0 : parseInt(document.all.txFileSizeLimit.value, 10);
    // if (nFileSizeLimit < nFileSize && !document.all.txManager.value)
    // {
    // jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您所選取的檔案大小為[" + nFileSize + "KB]，已超過附件檔案大小上限[" + nFileSizeLimit + "KB]，\n故無法選擇此檔，若仍要上傳，請洽公布欄管理員處理。"])),"");
    // return;
    // }
    //var strFileName = strFileFullPath.substr(strFileFullPath.lastIndexOf("\\") + 1);
    //1051114	Kevin_C	1050234		取得系統參數WE_ATTACH_CHECK進行副檔名檢核
    // if(document.all["WE_ATTACH_CHECK"].value!="")
    // {
    // if(document.all["WE_ATTACH_CHECK"].value.indexOf("|") != -1)
    // {
    // var strSystemSet = document.all["WE_ATTACH_CHECK"].value.split("|");

    // var strWhiteList = strSystemSet[1].split(";");
    // var bIsInWhiteList = false;
    ////1060112	Kevin_C	1050234	修正附檔名取得邏輯
    ////var strFileExt = strFileName.split(".")[1].toUpperCase();
    // var arrTempFileExt = strFileName.split(".");
    // var strFileExt = arrTempFileExt[arrTempFileExt.length-1].toUpperCase();
    // for(var nList = 0; nList < strWhiteList.length; nList++)
    // if(strFileExt == strWhiteList[nList].toUpperCase())
    // {
    // bIsInWhiteList = true;
    // break;
    // }
    ////若副檔名不在白名單中
    // if(!bIsInWhiteList)
    // {
    // if(strSystemSet[0]=="C")
    // {
    // jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["依行政院國發會函頒「推動ODF-CNS15251為政府文件標準格式實施計畫」，106年全面推動各機關使用可編輯ODF-CNS15251文書軟體。執行期間:抱歉您的附件無法存檔，請用ODF軟體轉成PDF或ODF的文件以符合規定。PDF與ODF文件轉換方式，請參閱「員工入口網」->「網路資料夾」->「公用表單」->「資訊室」->「105年公文線上簽核教育訓練教材」->「推動ODF時程資料」。"])),"");
    // return;
    // }
    // else if(strSystemSet[0]=="W")
    // if(!confirm("依行政院國發會函頒「推動ODF-CNS15251為政府文件標準格式實施計畫」，106年全面推動各機關使用可編輯ODF-CNS15251文書軟體。宣導最後階段:請將您的附件用ODF軟體轉成PDF或ODF的文件以符合規定。PDF與ODF文件轉換方式，請參閱「員工入口網」->「網路資料夾」->「公用表單」->「資訊室」->「105年公文線上簽核教育訓練教材」->「推動ODF時程資料。"))
    // return;
    // }
    // }
    // else
    // alert("系統參數WE_ATTACH_CHECK設定值錯誤");
    // }
    // var rowCnt = document.all.dgAttach.rows.length;
    // for (var i = 1; i < document.all.dgAttach.rows.length; i++)
    // {
    // var strSrcFileName = document.all.dgAttach.rows[i].cells[1].childNodes[0].innerText;
    // if (strFileName == strSrcFileName)
    // {
    // document.all.btAddFile.focus();
    // jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已有相同檔名之檔案存在，無法加入。"])),"");
    // return;
    // }
    // }
    var arrLegalFile = new Array();
    var strFileFullPath = "";
    var strSizeErr = "";
    var strNameErr = "";
    var strSepSizeErr = "";
    var strSepNameErr = "";
    var bCheckSuccess;
    var nAllowAddFile = 0;
    var bIsShowWhiteListMsg = false;

    //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題
    var txFileInput = $('#txFilePath' + nInputFileCnt)[0]

    //檢查所有選取的檔案
    //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題
    //for (var nFile = 0; nFile < $('#txFilePath')[0].files.length; nFile++) {
    for (var nFile = 0; nFile < txFileInput.files.length; nFile++)
    {
        bCheckSuccess = true;
        //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題--begin
        //var strFileName = $('#txFilePath')[0].files[nFile].name;
        //var nFileSize = $('#txFilePath')[0].files[nFile].size;
        var strFileName = txFileInput.files[nFile].name;
        var nFileSize = txFileInput.files[nFile].size;
        //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題--end
        //檢查檔案大小
        if (nFileSize != 0)
            nFileSize = Math.ceil(nFileSize / 1024);
        var nFileSizeLimit = (document.all.txFileSizeLimit.value == "") ? 0 : parseInt(document.all.txFileSizeLimit.value, 10);
        if (nFileSizeLimit < nFileSize && !document.all.txManager.value)
        {
            strSizeErr += strSepSizeErr + strFileName + "(檔案大小" + nFileSize + "KB)";
            strSepSizeErr = "、";
            bCheckSuccess = false;
        }
        //檢查檔名是否重複
        if (bCheckSuccess)
        {
            for (var i = 1; i < document.all.dgAttach.rows.length; i++)
            {
                var strSrcFileName = document.all.dgAttach.rows[i].cells[1].childNodes[0].textContent;
                if (strFileName == strSrcFileName)
                {
                    strNameErr += strSepNameErr + strFileName;
                    strSepNameErr = "、";
                    bCheckSuccess = false;
                }
            }
            //取得系統參數WE_ATTACH_CHECK進行副檔名檢核
            if (bCheckSuccess)
            {
                if (document.all["WE_ATTACH_CHECK"].value != "")
                {
                    if (document.all["WE_ATTACH_CHECK"].value.indexOf("|") == -1)
                    {
                        alert("系統參數WE_ATTACH_CHECK設定值錯誤");
                        return;
                    }
                    var strSystemSet = document.all["WE_ATTACH_CHECK"].value.split("|");
                    var strWhiteList = strSystemSet[1].split(";");
                    var bIsInWhiteList = false;
                    var arrTempFileExt = strFileName.split(".");
                    var strFileExt = arrTempFileExt[arrTempFileExt.length - 1].toUpperCase();
                    for (var nList = 0; nList < strWhiteList.length; nList++)
                        if (strFileExt == strWhiteList[nList].toUpperCase())
                        {
                            bIsInWhiteList = true;
                            break;
                        }
                    //若副檔名不在白名單中
                    if (!bIsInWhiteList)
                    {
                        if (strSystemSet[0] == "C")
                        {
                            if (nAllowAddFile == 0)
                                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["依行政院國發會函頒「推動ODF-CNS15251為政府文件標準格式實施計畫」，106年全面推動各機關使用可編輯ODF-CNS15251文書軟體。執行期間:抱歉您的附件無法存檔，請用ODF軟體轉成PDF或ODF的文件以符合規定。PDF與ODF文件轉換方式，請參閱「員工入口網」->「網路資料夾」->「公用表單」->「資訊室」->「105年公文線上簽核教育訓練教材」->「推動ODF時程資料」。"])), "");
                            nAllowAddFile = 2;
                            bCheckSuccess = false;
                        }
                        else if (strSystemSet[0] == "W")
                        {
                            if (nAllowAddFile == 1 || confirm("依行政院國發會函頒「推動ODF-CNS15251為政府文件標準格式實施計畫」，106年全面推動各機關使用可編輯ODF-CNS15251文書軟體。宣導最後階段:請將您的附件用ODF軟體轉成PDF或ODF的文件以符合規定。PDF與ODF文件轉換方式，請參閱「員工入口網」->「網路資料夾」->「公用表單」->「資訊室」->「105年公文線上簽核教育訓練教材」->「推動ODF時程資料。"))
                            {
                                //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題
                                //arrLegalFile.push($('#txFilePath')[0].files[nFile]);
                                arrLegalFile.push(txFileInput.files[nFile]);
                                nAllowAddFile = 1;
                            }
                        }

                        bIsShowWhiteListMsg = true;
                    }
                    else
                        //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題
                        //arrLegalFile.push($('#txFilePath')[0].files[nFile]);
                        arrLegalFile.push(txFileInput.files[nFile]);
                }
                else
                    //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題
                    //arrLegalFile.push($('#txFilePath')[0].files[nFile]);
                    arrLegalFile.push(txFileInput.files[nFile]);
            }
        }
    }
    if (strSizeErr != "")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strSizeErr + "，已超過附件檔案大小上限[" + nFileSizeLimit + "KB]，\n故無法選擇此檔，若仍要上傳，請洽公布欄管理員處理。"])), "");
    }
    if (strNameErr != "")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strNameErr + "，已有相同檔名之檔案存在，無法加入。"])), "");
    }
    //1060510	Kevin_C	1050087	升二代 -E

    //1060510	Kevin_C	1050087	升二代
    //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題，註解無用邏輯
    //if (arrLegalFile.length != 0)
    //    strFileFullPath = $('#txFilePath')[0]

    var rowCnt = document.all.dgAttach.rows.length
    for (var nFile = 0; nFile < arrLegalFile.length; nFile++)
    {
        //設定row的背景色
        //1060510	Kevin_C	1050087	升二代
        //var rowBgColor = (rowCnt % 2) ? "#F7F7DE" : "White";
        //create row
        var row = document.createElement("TR");
        //1060510	Kevin_C	1050087	升二代
        //row.style.backgroundColor = rowBgColor;

        //create column
        var TbFD = document.all["TBFileDesc"].value;//0960713 MATTE 000966
        var colSeq = document.createElement("TD");
        //0980612	David 0980278	更改新增附件時，加入dg之語法 --start
        //1060510	Kevin_C	1050087	升二代 -S
        //colSeq.setAttribute("nowrap", "nowrap");
        //colSeq.setAttribute("align", "middle");
        //colSeq.className = "InputFieldLabel";
        //1060510	Kevin_C	1050087	升二代 -E
        colSeq.innerHTML = "<SPAN class=InputFieldLabel id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_lbSEQ_NO\">" + rowCnt + "</SPAN>";
        /*colSeq.setAttribute("align","middle");
        colSeq.setAttribute("nowrap","nowrap");
        colSeq.className = "InputFieldLabel";
        colSeq.innerText = rowCnt;
	
        var colFile = document.createElement("TD");
        colFile.setAttribute("align","Left");
        var spanFileName = document.createElement("SPAN");
        var spanFilePath = document.createElement("SPAN");
        var spanFileSize = document.createElement("SPAN");
        spanFileName.innerText = strFileName;
        spanFilePath.innerText = strFileFullPath;
        spanFileSize.innerText = nFileSize;
        spanFileName.className = "InputFieldLabel";
        spanFilePath.style.display = "none";
        spanFileSize.style.display = "none";
        colFile.appendChild(spanFileName);
        colFile.appendChild(spanFilePath);
        colFile.appendChild(spanFileSize);*/

        var colFile = document.createElement("TD");
        colFile.setAttribute("align", "left");
        //1060510	Kevin_C	1050087	升二代 -S
        //colFile.innerHTML = "<SPAN class=InputFieldLabel id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_lbFileName\">" + strFileName + "</SPAN>";
        //colFile.innerHTML += "<SPAN class=hide id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_lbFilePath\">" + strFileFullPath + "</SPAN>";
        colFile.innerHTML = "<SPAN class=InputFieldLabel id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_lbFileName\">" + arrLegalFile[nFile].name + "</SPAN>";
        colFile.innerHTML += "<SPAN class=hide id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_lbFilePath\">" + "NEW" + "</SPAN>";
        //1060510	Kevin_C	1050087	升二代 -E

        var colFileSize = document.createElement("TD");
        //1060510	Kevin_C	1050087	升二代
        //colFileSize.setAttribute("align", "middle");
        colFileSize.className = "hide";
        //1060510	Kevin_C	1050087	升二代
        //1071031	Cloud	修正檔案大小紀錄錯誤問題
        /*colFileSize.innerHTML = "<SPAN class=hide id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_lbFileSize\">" +
        arrLegalFile[nFile].size + "</SPAN>";*/
        if (arrLegalFile[nFile].size != 0)
            nFileSize = Math.ceil(arrLegalFile[nFile].size / 1024);
        colFileSize.innerHTML = "<SPAN class=hide id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_lbFileSize\">" + nFileSize + "</SPAN>";
        //End
        if (TbFD == "Y")//0960713 MATTE 000966
        {
            var coldes = document.createElement("TD");
            coldes.setAttribute("align", "middle");
            coldes.setAttribute("nowrap", "nowrap");
            coldes.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_txFileDesc\" type=\"TextBox\"/>";
        }
        var colDel = document.createElement("TD");
        //1060510	Kevin_C	1050087	升二代 -S
        //colDel.setAttribute("align", "middle");
        //colDel.setAttribute("nowrap", "nowrap");
        //colDel.innerHTML = "<INPUT type=\"button\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" />";
        ////0980901	David	0980347	新增開啟功能鍵
        //var strOpenPath = strFileFullPath.replace(/\\/g, "\\\\");
        //colDel.innerHTML += "&nbsp;<INPUT type=\"button\" value=\"開啟\" onclick=\"OpenFile('" + strOpenPath + "')\" />";
        colDel.innerHTML = "<INPUT type=\"submit\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" />";
        //1120811 Zen 1120693 滲透測試弱掃修正
        //colDel.innerHTML += "&nbsp;<INPUT disabled type=\"submit\" value=\"開啟\" onclick=\"OpenFile(arrLegalFile[nFile])\" />";
        //1121220	Leslie	各機關問題彙整表 序346，修正可開啟使用者當前夾帶的附件
        // colDel.innerHTML += "&nbsp;<INPUT disabled type=\"submit\" value=\"開啟\" onclick=\"OpenFile(arrLegalFile[nFile], " + document.all['H_txSourceOrgno'].value + ")\" />";
        let objectURL = URL.createObjectURL(arrLegalFile[nFile]);
        //1131015 Zen 1130941 弱掃XSS修正
        //colDel.innerHTML += `&nbsp;<INPUT type="submit" value="開啟" onclick="OpenFile('${arrLegalFile[nFile].name}', '${document.all['H_txSourceOrgno'].value}', '${objectURL}' )\" />`;
        colDel.innerHTML += `&nbsp;<INPUT type="submit" value="開啟" onclick="OpenFile('${arrLegalFile[nFile].name}', '${HtmlEncode(document.all['H_txSourceOrgno'].value)}', '${objectURL}' )\" />`;
        //1060510	Kevin_C	1050087	升二代 -E

        //0990625 David 0990024 於TBT100100加入的附件皆為公告附件
        var colFileType = document.createElement("TD");
        //1060627	Kevin_C	1060508	修正附件DG顯示不正確的問題
        colFileType.className = "hide";
        colFileType.innerHTML += "<SPAN class=hide id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_lbFileType\">1</SPAN>";

        //Add to dgAttach
        row.appendChild(colSeq);
        row.appendChild(colFile);
        row.appendChild(colFileSize);//0980612	David	0980278	更改新增附件時，加入dg之語法
        if (TbFD == "Y")//0960713 MATTE 000966
            row.appendChild(coldes);
        row.appendChild(colDel);
        row.appendChild(colFileType);//0990625 David 0990024 新增紀錄附件類型
        //1060510	Kevin_C	1050087	升二代
        //document.all.dgAttach.children.tags("TBODY")[0].appendChild(row);
        document.all.dgAttach.children[0].appendChild(row);
        //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題，註解無用邏輯
        //AllFiles.push($('#txFilePath')[0].files[nFile]);
    }

    //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題，新增新Input物件供後續再次夾帶附件
    if (nInputFileCnt == '')
        nInputFileCnt = 0;

    nInputFileCnt = Number(nInputFileCnt) + 1;
    var InputFile = document.createElement("INPUT");
    InputFile.setAttribute("type", "file");
    InputFile.setAttribute("id", "txFilePath" + nInputFileCnt);
    InputFile.setAttribute("name", "txFilePath" + nInputFileCnt);
    InputFile.setAttribute("class", "hide");
    InputFile.setAttribute("onchange", "fnAddFile()");
    InputFile.setAttribute("multiple", "multiple");
    var fileDiv = $('#txFilePath')[0].parentNode
    fileDiv.appendChild(InputFile)

    //將focus設到加入附件的按鈕以便使用者繼續加入
    //1060510	Kevin_C	1050087	升二代
    //document.all.btAddFile.focus();
    $('btAddFile').focus();
}

function fnDeleteAttachItem()
{
    Page_BlockSubmit = true;
    //先刪除資料
    var deleteRow = event.srcElement.parentNode.parentNode;
    //取出FilePath，如果沒有則表示此檔案已存在於DB中，刪除時要加入待刪除清單(lbDelFile)中
    //1060510	Kevin_C	1050087	升二代
    //if (!deleteRow.cells[1].childNodes[1].innerText)
    if (!deleteRow.cells[1].children[1].textContent)
    {
        if (document.all.txDelFileNames.value)
            //1060510	Kevin_C	1050087	升二代
            //document.all.txDelFileNames.value += "," + deleteRow.cells[1].childNodes[0].innerText;
            document.all.txDelFileNames.value += "," + deleteRow.cells[1].children[0].textContent;
        else
            //1060510	Kevin_C	1050087	升二代
            //document.all.txDelFileNames.value = deleteRow.cells[1].childNodes[0].innerText;
            document.all.txDelFileNames.value = deleteRow.cells[1].children[0].textContent;
    }
    //1060510	Kevin_C	1050087	升二代
    //document.all.dgAttach.children.tags("TBODY")[0].removeChild(deleteRow);
    document.all.dgAttach.children[0].removeChild(deleteRow);

    //再重設序號及style
    for (var i = 1; i < document.all.dgAttach.rows.length; i++)
    {
        var row = document.all.dgAttach.rows[i];
        //1060510	Kevin_C	1050087	升二代 -S
        //var rowBgColor = (i % 2) ? "#F7F7DE" : "White";
        //row.style.backgroundColor = rowBgColor;
        //row.childNodes[0].innerText = i;
        row.children[0].textContent = i;
        //1060510	Kevin_C	1050087	升二代 -E
    }
}
//0980901	David	0980347	新增OpenFile函式，供點選附件DataGrid中開啟功能鍵使用--Start
//1120811 Zen 1120693 滲透測試弱掃修正
//function OpenFile(argFileName)
//1121220	Leslie	各機關問題彙整表 序346，修正可開啟使用者當前夾帶的附件
// function OpenFile(argFileName, argSourceOrgno)
function OpenFile(argFileName, argSourceOrgno, argUrlPath)
{
    //1060510	Kevin_C	1050087	升二代 -S
    // var OpenFildPath = "";
    // var localPathForAtt	= "C:\\TEMP\\";
    ////建立工作暫存區
    // var fso = new ActiveXObject("Scripting.FileSystemObject");
    // if(fso.FolderExists(localPathForAtt) == false)
    // fso.CreateFolder(localPathForAtt);

    // try
    // {
    // if(argFileName.indexOf('\\') != -1)//表示為新加入之附件，直接開啟
    // {
    // var fso = new ActiveXObject("Scripting.FileSystemObject");
    // fso.CopyFile(argFileName,localPathForAtt,true);
    // var strName =  argFileName.substr(argFileName.lastIndexOf("\\") + 1);
    // OpenFildPath = localPathForAtt + strName;
    // }
    // else//表示為舊有附件，點選開啟時將檔案下載至本機C:\TEMP下
    // {
    // var soap = new ActiveXObject("WSWrapper.WebFileIO");
    ////1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
    ////soap.Init(document.all["H_ServiceURL"].value);
    // var serviceURL = document.all["H_ServiceURL"].value ;
    // if ( document.all.II_USE_SSL != null )
    // {
    // if ( document.all.II_USE_SSL.value == "Y" )
    // serviceURL = serviceURL.replace("http://", "https://") ;
    // }
    ////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
    // try
    // {			
    // soap.Init(serviceURL);

    // var serverAtt = document.all["workpath"].value+"Attach\\";
    // var serverAttName = argFileName;
    // soap.AddFile(serverAtt,serverAttName);
    ////0980918	David	0980455	使用WebFileIO時，應傳入Artifact
    ////soap.Download("", false, localPathForAtt);
    // soap.Download(document.all["SsoArtifact"].value, false, localPathForAtt);
    ////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
    ////if(soap.hasError)
    ////{
    ////	alert('附件檔案下載失敗，錯誤訊息為：' + soap.ErrorMessage);
    ////	return;
    ////}
    ////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
    // soap = null;
    // OpenFildPath = localPathForAtt + "\\"+serverAttName;
    ////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
    // }
    // catch(e)
    // {
    // var strErrMsg = e.message;		
    // if (soap.hasError)
    // strErrMsg += soap.ErrorMessage;
    // alert("連接伺服器"+serviceURL+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg);
    // return;
    // }
    ////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
    // }
    ////開啟檔案
    // var oShell = new ActiveXObject("Shell.Application");
    // oShell.ShellExecute(OpenFildPath, "", "", "", 4);
    // }
    // catch(e)
    // {
    // var ErrorMessage = e.message;
    // alert('處理檔案時發生錯誤，訊息為：'+ErrorMessage);
    // }
    //1120811 Zen 1120693 滲透測試弱掃修正
    //var rtnVal = TB1.TBT100.AttDownLoad(argFileName).value;

    //1121220	Leslie	各機關問題彙整表 序346，修正可開啟使用者當前夾帶的附件
    if (argUrlPath?.match(/^blob/))
    {
        Page_BlockSubmit = true;
        let bDownload = "PDF;JPG;GIF;PNG".indexOf(argFileName.substring(argFileName.lastIndexOf('.') + 1).toUpperCase()) < 0;
        let $dlLink = $('<A style="display:none">下載</A>').attr({
            "data-role": "none",
            "href": argUrlPath,
            "rel": "external",
            "data-ajax": "false",
            "target": "_blank",
        });

        if (bDownload)
            $dlLink.attr({ "download": argFileName });

        $dlLink[0].click();
        return;
    }

    var rtnVal = TB1.TBT100.AttDownLoad(argFileName, argSourceOrgno).value;
    if (rtnVal[1] != "")
        alert(rtnVal[1]);
    else
        openDlg(rtnVal[0] + "&OpenType=download", document.all["SsoArtifact"].value, "");
    //1060510	Kevin_C	1050087	升二代 -E
}//End

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1071224 Kevin_C	1071115	修正開啟有附件的公告時無法儲存的問題
var isUpload = false;
//1060510	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    //1060510	Kevin_C	1050087	升二代
    //document.all.tbTool.focus();
    $('tbTool').focus();

    var xObjectName;
    var evBtn;

    //1090914 Zen 1090664 修正發布公告中點擊功能鍵導致多次發布重複公告之問題
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

    //1060510	Kevin_C	1050087	升二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1100218	Joe		1100203		弱掃修正No Request Validation
            if (Page_BlockSubmit == false)
                jf_EncodeSubject();
            //1060510	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //1071107	Kevin_C	1071115	改成上傳結束後才POST BACK
            Page_BlockSubmit = true;
            if (!fnCalculateDate() || !fnCalculateDays())
                return;
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                if_GetNewAttInfo();//0980612	David	0980278	儲存前紀錄附件最新資訊
                //1060510	Kevin_C	1050087	升二代
                //document.all.txContent.value = richedit.getHTML();
                //1071107	Kevin_C	1071115	改成上傳結束後才POST BACK -S
                //IsServerHandling = true;
                //jf_ShowWaitState();	
                //Page_BlockSubmit = false;
                //1071107	Kevin_C1071115	改成上傳結束後才POST BACK -E
                //1071224 Kevin_C	1071115	沒上傳才能直接POST BACK
                //1090612 Zen 1071180 附件上傳邏輯改於Server執行，一律PostBack
                //if (!isUpload)
                {
                    //1100218	Joe		1100203		弱掃修正No Request Validation
                    jf_EncodeSubject();
                    Page_BlockSubmit = false;
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    jf_ToolBarSubmit(xObjectName);
                }
            }
            //1071116 Kevin_C	1071115	修正無附件時無法發布公告的問題
            //1071224 Kevin_C	1071115	修正開啟有附件的公告時無法儲存的問題
            //if(document.all.dgAttach.rows.length <=1)
            // if(AllFiles.length <=1)
            // {
            // Page_BlockSubmit = false;
            // IsServerHandling = true;
            // jf_ShowWaitState();
            // jf_ToolBarSubmit('btSave');	
            // }
            //1071107	Kevin_C	1071115	改成上傳結束後才POST BACK
            //else
            //	Page_BlockSubmit = true;
            //1060510	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();	
            //1071107	Kevin_C	1071115	改成上傳結束後才POST BACK
            //jf_ToolBarSubmit(xObjectName);	
            break;
        case "btDelete":
            //1000519 David 1000453 如為內部發文公告，刪除時顯示提示視窗
            //Page_BlockSubmit = !jf_ConfirmDelete();
            Page_BlockSubmit = !jf_CheckBeforDelete();
            //1100218	Joe		1100203		弱掃修正No Request Validation
            if (Page_BlockSubmit == false)
                jf_EncodeSubject();
            //1060510	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1100218	Joe		1100203		弱掃修正No Request Validation
            if (Page_BlockSubmit == false)
                jf_EncodeSubject();
            //1060510	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            //Page_BlockSubmit = true;
            //0990311 David 0990165 將隱藏欄位值KEEP住
            var strOrgNo = document.all.H_OrgNo.value;
            var strWedep = document.all.WEDEP_SERVER_NAME.value;
            jf_ConfirmClean(true);
            //1060510	Kevin_C	1050087	升二代
            //richedit._initEditor();//0960507  Matte   000904  清除鍵無法清除欄位資料
            //1060510	Kevin_C	1050087	升二代
            //document.all["txSubject"].focus();
            $('txSubject').focus();
            document.all.rbInside.checked = true;
            document.all.rbOrg.checked = true;
            //0990311 David 0990165 將隱藏欄位值設定回去
            document.all.H_OrgNo.value = strOrgNo;
            document.all.WEDEP_SERVER_NAME.value = strWedep;
            break;
        case "btSearch":
            var strUrl = "";
            var strBulletinId = jf_Trim(document.all.txBulletinId.value);
            strUrl = "TBC200.aspx?rtnObj=lbReturnValue&nSearch=" + strBulletinId;
            jf_OpenChildWin(strUrl, "TBT100", 700, 500);
            //1060822	Kevin_C	1060765	一併修正查詢會PostBack的問題
            Page_BlockSubmit = true;
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
        if (document.all.dgAttach.rows.length > 1)
        {
            if (fnUploadAttach())
            {
                // 新增模式時輸入鍵值(公告編號)無效
                if (jf_GetActionMode() == LayoutModeNew)
                    document.all.txBulletinId.value = "";
                bRtnbool = true;
            }
            else
                bRtnbool = false;
        }
        else
            bRtnbool = true;
    }
    //1031030 Eric	1030701	增加附件描述字數限制
    for (var i = 2; i <= document.all.dgAttach.rows.length; i++)
    {
        var FileDesc = "";
        //1130805 Zen 序169 刪除非末筆附件後再加入發布錯誤--begin
        ////1031127	Cloud 快解
        //if (document.all["dgAttach__ctl" + i + "_txFileDesc"])
        //{
        //    if (document.all["dgAttach__ctl" + i + "_txFileDesc"].value != "")
        //    {
        //        FileDesc = document.all["dgAttach__ctl" + i + "_txFileDesc"].value
        //    }
        //    if (FileDesc.length > 50)
        //    {
        //        alert("附件描述字數過長，不可超過50字");
        //        bRtnbool = false;
        //        return bRtnbool;
        //    }
        //}
        FileDesc = document.all['dgAttach'].rows[i - 1].children[3].children[0].value;
        if (FileDesc.length > 50)
        {
            alert("附件描述字數過長，不可超過50字");
            bRtnbool = false;
            return bRtnbool;
        }
        //1130805 Zen 序169 刪除非末筆附件後再加入發布錯誤--end
    }
    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";
    var objFocus = null;

    if (jf_Trim(document.all.txSubject.value) == "")
    {
        strErrMsg += "主旨欄位不可空白。\n";
        objFocus = document.all.txSubject;
    }
    if (document.all.txPasteDate.value == "")
    {
        strErrMsg += "公告日期不可空白。\n";
        if (!objFocus)
            objFocus = document.all.txExpireDate;
    }
    if (document.all.txExpireDate.value == "")
    {
        strErrMsg += "公告期限不可空白。\n";
        if (!objFocus)
            objFocus = document.all.txExpireDate;
    }

    if (!jf_CheckCDATE(document.all.txPasteDate.value))
    {
        strErrMsg += "公告日期錯誤。\n";
        if (!objFocus)
            objFocus = document.all.txPasteDate;
    }
    if (!jf_CheckCDATE(document.all.txExpireDate.value))
    {
        strErrMsg += "公告期限錯誤。\n";
        if (!objFocus)
            objFocus = document.all.txExpireDate;
    }
    if (document.all.rbBoth)
    {
        if (document.all.rbBoth.checked)
        {
            if (document.all.rbUnit.checked)
            {
                strErrMsg += "公布欄位置包含外部時，公告對象必須為全機關。\n";
                if (!objFocus)
                    objFocus = document.all.rbOrg;
            }
        }
    }

    if (document.all.rbOther)
    {
        if (document.all.rbOther.checked)
        {
            var bSelected = false;
            document.all.btCleanAll.disabled = true;//iris 0970107
            for (var i = 1; i < document.all.dgtarget.rows.length; i++)
            {
                var lbtargetNameObj = document.all["dgtarget__ctl" + (i + 1) + "_lbtargetName"];
                if (lbtargetNameObj.value == "")
                    continue;
                bSelected = true;
                break;
            }

            if (bSelected == false)
            {
                strErrMsg += "尚未選擇公告對象。\n";
                if (!objFocus)
                    objFocus = document.all.txExpireDate;
            }
        }
    }
    txFromOrg_OnBlur();

    if (strErrMsg != "")
    {
        //1060510	Kevin_C	1050087	升二代
        //objFocus.focus();
        $('objFocus').focus();
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}

/********** 以下為按下刪除鍵後相關處理 **********/
//1000519 David 1000453 如為內部發文公告，刪除時跳出提示訊息
function jf_CheckBeforDelete()
{
    if (document.all.H_txDispatch.value == "1")
    {
        var strDocNo = document.all.H_txDocNo.value;
        var strFormatPasteDate = document.all.H_txAllPasteDate.value;
        var strMessage = "目前公告為內部發文公告(公文" + strDocNo + "，發布時間為" + strFormatPasteDate + ")\n\n";
        strMessage += "刪除時會一併刪除該份公文所有受文者之公告，請問是否刪除？";
        return window.confirm(strMessage);
    }
    else
        return jf_ConfirmDelete();
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
        if (jf_IsWebServiceSuccess(argResult))
        {
            //document.all["txSubject"].value = jf_Trim(argResult.value.RtnStr);
        }
    }

    if (argResult.id == wsCalculateDateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
            document.all.txExpireDate.value = jf_Trim(argResult.value.RtnStr);
        else
            document.all.txExpireDate.value = "";
    }

    if (argResult.id == wsCalculateDaysID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            var rtn = jf_Trim(argResult.value.RtnStr);
            if (parseInt(rtn, 10) != rtn || parseInt(rtn, 10) <= 0)
                document.all.txPasteDays.value = "";
            else
                document.all.txPasteDays.value = rtn;
        }
        else
            document.all.txPasteDays.value = "";
    }
    //0990311 David 0990165 新增WS回傳處理
    if (argResult.id == wsCalOrgInfo)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.Count > 0)
            {
                if (jf_Trim(argResult.value.OrgID[0]) != "")
                    document.all.txFromOrg.value = jf_Trim(argResult.value.OrgID[0]);
                if (jf_Trim(argResult.value.OrgName[0]) != "")
                    document.all.txFromOrg1.value = jf_Trim(argResult.value.OrgName[0]);
            }
            else
                document.all.txFromOrg1.value = "";
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
    if (argCallerId == "TBC200")
    {
        document.all.txBulletinId.value = jf_Trim(document.all.lbReturnValue.options[0].value);
        if (document.all.txBulletinId.value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
    }
    if (argCallerId == "WEM010C1")
    {
        var DeptInfo = document.all["lbReturnValue"].options[0].value;
        var DeptArray = DeptInfo.split('^');
        var FromOrgNo = DeptArray[2];
        if (DeptArray[3] != "")
            FromOrgNo += DeptArray[3];
        document.all.txFromOrg.value = FromOrgNo;
        document.all.txFromOrg1.value = DeptArray[1];
    }
    //1071087
    if (argCallerId == "IFC021")
    {
        var argCInfo = new Object();
        if (document.all["lbReturnValue"].options[1].value == "Account")
        {
            argCInfo.Code = document.all["lbReturnValue"].options[0].value;
            argCInfo.Name = document.all["lbReturnValue"].options[2].value;
        }
        else if (document.all["lbReturnValue"].options[1].value == "Unit")
        {
            argCInfo.Code = document.all["lbReturnValue"].options[8].value;
            argCInfo.Name = document.all["lbReturnValue"].options[9].value;
        }
        else if (document.all["lbReturnValue"].options[1].value == "Role")
        {
            argCInfo.Code = document.all["lbReturnValue"].options[4].value;
            argCInfo.FullName = document.all["lbReturnValue"].options[9].value + ' ' + document.all["lbReturnValue"].options[5].value;
        }
        else if (document.all["lbReturnValue"].options[1].value == "Org")
        {
            argCInfo.Code = document.all["lbReturnValue"].options[4].value;
            argCInfo.Name = document.all["lbReturnValue"].options[6].value;
        }
        argCInfo.SuperiorUnitCode = document.all["lbReturnValue"].options[8].value;
        argCInfo.SourceOrgNo = document.all["lbReturnValue"].options[7].value;
        argCInfo.InfoType = document.all["lbReturnValue"].options[1].value;
        fnAddOrgTarget(argCInfo);
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢查刊登天數並計算公告期限
function fnCalculateDate()
{
    var strDays = document.all.txPasteDays.value;
    if (strDays == "")
        return true;
    if (parseInt(strDays, 10) != strDays || parseInt(strDays, 10) < 0)
    {
        //1060510	Kevin_C	1050087	升二代
        //document.all.txPasteDays.focus();
        $('txPasteDays').focus();
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["刊登天數必須為正整數。"])), "");
        return false;
    }

    document.all.txExpireDate.value = "";
    //0990726 David 0990071 多傳入機關代碼
    //var result = TBT100.CalculateDate(document.all.txPasteDate.value, strDays, document.all.txPasteDaysType.value);
    //1071001	Kevin_C	1070678		因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
    //var result = TBT100.CalculateDate(document.all.txPasteDate.value, strDays, document.all.txPasteDaysType.value,document.all.H_OrgNo.value);
    var result = TB1.TBT100.CalculateDate(document.all.txPasteDate.value, strDays, document.all.txPasteDaysType.value, document.all.H_OrgNo.value);
    if (result.value.bSuccess)
        document.all.txExpireDate.value = result.value.Rtn;
    else
    {
        alert(result.value.sErrMsg);
        return false;
    }
    return true;
}

//檢查公告期限並計算刊登天數
function fnCalculateDays()
{
    //檢查日期格式
    var strSDate = document.all.txPasteDate.value;
    var strEDate = document.all.txExpireDate.value;
    if (strEDate == "")
        return true;
    if (strSDate.length < 7)
    {
        strSDate = jf_PADL(strSDate, 7, '0');
        document.all.txPasteDate.value = strSDate;
    }
    if (!jf_CheckCDATE(strSDate))
    {
        //1060510	Kevin_C	1050087	升二代
        //document.all.txPasteDate.focus();
        $('txPasteDate').focus();
        jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["公告日期"])), "");
        return false;
    }
    if (strEDate.length < 7)
    {
        strEDate = jf_PADL(strEDate, 7, '0');
        document.all.txExpireDate.value = strEDate;
    }
    if (!jf_CheckCDATE(strEDate))
    {
        //1060510	Kevin_C	1050087	升二代
        //document.all.txExpireDate.focus();
        $('txExpireDate').focus();
        jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["公告期限"])), "");
        return false;
    }
    if (strEDate <= strSDate)
    {
        //1060510	Kevin_C	1050087	升二代
        //document.all.txExpireDate.focus();
        $('txExpireDate').focus();
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公告期限必須超過公告日期。"])), "");
        return false;
    }

    document.all.txPasteDays.value = "";
    if (strEDate.indexOf("999") != -1)//若為永久公告, 則不再計算刊登天數
        return true;
    //0990726 David 0990071 多傳入機關代碼
    //var result = TBT100.CalculateDays(strSDate, strEDate, document.all.txPasteDaysType.value);
    //1071001	Kevin_C	1070678		因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
    //var result = TBT100.CalculateDays(strSDate, strEDate, document.all.txPasteDaysType.value,document.all.H_OrgNo.value);
    var result = TB1.TBT100.CalculateDays(strSDate, strEDate, document.all.txPasteDaysType.value, document.all.H_OrgNo.value);

    if (result.value.bSuccess)
    {
        if (result.value.Rtn != -1)
            document.all.txPasteDays.value = result.value.Rtn + "";
    }
    else
    {
        alert(result.value.sErrMsg);
        return false;
    }
    return true;
}

//取得上傳檔案所需資訊
function fnUploadAttach()
{
    if (!document.all.dgAttach)
    {
        bUploadSuccess = false;
        return true;
    }

    //1090612 Zen 1071180 附件上傳至AP邏輯改於Server執行
    ////1080318	Joe		1080098		弱掃修正禁用WSDL--S
    ///*
    ////取得AP FileIO資訊
    //var arWSParam = new Array(0);
    //callObj = jf_CallWA(jf_Trim(document.all.txInsideTBWS.value), "GetFileIOInfo", false, arWSParam);
    //*/
    ////1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--S
    //// var params = new SOAPClientParameters();
    //// params.add('argArtifact',  jf_GetArtifact());
    //// var callObj = SOAPClient.invokeJSON(jf_Trim(document.all.txInsideTBWS.value), "GetFileIOInfo", params ,false, null)
    //var arWSParam = new Array(0);
    //callObj = jf_CallWA(jf_Trim(document.all.txInsideTBWS.value), "GetFileIOInfo", false, arWSParam);
    ////1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--E
    ////1080318	Joe		1080098		弱掃修正禁用WSDL--E
    //if(!jf_IsWebServiceSuccess(callObj))
    //	return false;
    //
    //var strWebService = callObj.value.Info.WebService;
    //var strFileLocation = callObj.value.Info.StartPath;
    //var strArtifact = jf_GetArtifact();
    //document.all.txFileLocation.value = strFileLocation;

    //1060510	Kevin_C	1050087	升二代
    //var soap = new ActiveXObject("WSWrapper.WebFileIO");
    var strFileNames = "";
    var strFileSizes = "";
    var strhideattdesc = "";//0960713 MATTE 000966
    var strFileTypes = "";//0990625 David 0990024
    var strBuf = "";

    var TbFD = document.all["TBFileDesc"].value;//0960713 MATTE 000966
    //1030304	Cloud	[1030110]	修正開啟含附件公告儲存後會出現異常的bug
    var isHasAttach = false;


    try
    {
        //1090612 Zen 1071180 附件上傳至AP邏輯改於Server執行
        ////1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
        //if ( document.all.II_USE_SSL != null )
        //{
        //	if ( document.all.II_USE_SSL.value == "Y" )
        //		strWebService = strWebService.replace("http://", "https://") ;
        //}
        //1060510	Kevin_C	1050087	升二代 -S
        //soap.Init(strWebService);
        //1090612 Zen 1071180 附件上傳至AP邏輯改於Server執行
        //var ioWS = new WebFileIO(strWebService, strArtifact);
        var arrFileName = new Array();
        //1060510	Kevin_C	1050087	升二代 -E
        //0980612 David	0980278	修改取dg值之取法
        for (var i = 1; i < document.all.dgAttach.rows.length; i++)
        {
            var cell = document.all.dgAttach.rows[i];//document.all.dgAttach.rows[i].cells[1]; 
            //1060510	Kevin_C	1050087	升二代 -S
            //if (cell.cells[1].childNodes[1].innerText)
            if (cell.cells[1].children[1].textContent == "NEW")
            {
                //var strFN = cell.cells[1].childNodes[0].innerText;//cell.childNodes[0].innerText;
                //var strFP = cell.cells[1].childNodes[1].innerText;//cell.childNodes[1].innerText;
                var strFN = cell.cells[1].children[0].textContent;
                var strFP = cell.cells[1].children[1].textContent;
                arrFileName.push(strFN);
                //1060510	Kevin_C	1050087	升二代 -E
                strFileNames += strBuf + strFN;
                //1060510	Kevin_C	1050087	升二代
                //strFileSizes += strBuf + cell.cells[2].childNodes[0].innerText;//cell.childNodes[2].innerText;
                strFileSizes += strBuf + cell.cells[2].children[0].textContent;
                //1060510	Kevin_C	1050087	升二代
                if (TbFD == "Y")//0960713 MATTE 000966
                {
                    //1060510	Kevin_C	1050087	升二代
                    //strhideattdesc += strBuf + cell.cells[3].childNodes[0].value;//document.all["dgAttach__ctl"+ (i+1) +"_txFileDesc"].value;
                    strhideattdesc += strBuf + cell.cells[3].children[0].textContent;
                    //0990625 David 0990024 新增紀錄附件類型
                    //1060510	Kevin_C	1050087	升二代
                    //var strFT = cell.cells[5].childNodes[0].innerText;
                    var strFT = cell.cells[5].children[0].textContent;
                    strFileTypes += strBuf + strFT;
                }
                else//0990625 David 0990024 DataGrid的cells[]會因是否顯示附件描述而有所不同，故分別處理
                {
                    //0990625 David 0990024 新增紀錄附件類型
                    //1060510	Kevin_C	1050087	升二代
                    //var strFT = cell.cells[4].childNodes[0].innerText;
                    var strFT = cell.cells[4].children[0].textContent;
                    strFileTypes += strBuf + strFT;
                }

                strBuf = ",";

                strFP = strFP.substring(0, strFP.lastIndexOf("\\"));
                //1030812	CLoud	補回消失的code
                //1060510	Kevin_C	1050087	升二代
                //soap.AddFile(strFileLocation, strFN, strFP);
                //1030304	Cloud	[1030110]	修正開啟含附件公告儲存後會出現異常的bug
                isHasAttach = true;
            }
            //1030304	Cloud	[1030110]	修正開啟含附件公告儲存後會出現異常的bug
            //soap.Upload(strArtifact, true);
        }
        //1030304	Cloud	[1030110]	修正開啟含附件公告儲存後會出現異常的bug
        if (isHasAttach)
        {
            //1071224 Kevin_C	1071115	沒上傳才能直接POST BACK
            isUpload = true;
            //1060510	Kevin_C	1050087	升二代 -S
            //soap.Upload(strArtifact, true);
            //若DG沒有同名檔案，從AllFiles移除檔案
            var bIsFileExist = false;
            for (var i = 0; i < AllFiles.length; i++)
            {
                for (var j = 0; j < arrFileName.length; j++)
                {
                    if (AllFiles[i].name == arrFileName[j])
                    {
                        bIsFileExist = true;
                        break;
                    }
                }
                if (!bIsFileExist)
                    AllFiles.splice(i, 1);
            }
            //1090612 Zen 1071180 附件上傳至AP邏輯改於Server執行
            //ioWS.upload(strFileLocation, AllFiles, UploadCallBack);
            //1060510	Kevin_C	1050087	升二代 -E
        }
    }
    catch (e)
    {
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        //var ErrorMessage = "";
        var ErrorMessage = e.message;
        if (soap.hasError)
            ErrorMessage += soap.ErrorMessage;
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        //jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["上傳附件檔案至AP伺服器失敗，錯誤訊息為：" + ErrorMessage + "請稍後再試！"]) ), "" );
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["連接伺服器" + strWebService + "上傳附件檔案至AP伺服器失敗，錯誤訊息為：" + ErrorMessage + "請稍後再試！"])), "");
        return false;
    }

    document.all.txAddFileNames.value = strFileNames;
    document.all.txAddFileSizes.value = strFileSizes;
    if (TbFD == "Y")//0960713 MATTE 000966
        document.all.hideattdesc.value = strhideattdesc;
    //0990625 David 0990024 增紀錄附件類型
    document.all.txAddFileTypes.value = strFileTypes;
    return true;
}
//1051028	Kevin_C	1050087	升二代
function UploadCallBack(result)
{
    if (result.hasError)
    {
        alert(result.ErrorMessage)
    }
    //1071107	Kevin_C	1071115	改成上傳結束後才POST BACK
    else
    {
        IsServerHandling = true;
        jf_ShowWaitState();
        Page_BlockSubmit = false;
        jf_ToolBarSubmit('btSave');
    }
}

function jf_CheckEmail(argEmail)
{
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return filter.test(argEmail);
}
//1060510	Kevin_C	1050087	升二代 -S
//1061201	Kevin_C	1061157		修正TBT100說明欄位無法換行的問題
function fnHandleTextarea()
{
    if (event.keyCode == 13)
        event.cancelBubble = true;
}
// function RTELoaded(w)
// {
// w.setToolbar("tbimage",false)	
// w.setSkin("#idToolbar {border: 1px black solid; background:#FFFFFF}")
// if (document.composeform && document.composeform.RTEbgcolor.value != "")
// window.richedit.setBGColor(document.composeform.RTEbgcolor.value);
// }
//1060510	Kevin_C	1050087	升二代 -E
function fnAddOrgTarget(argCInfo)
{
    for (var i = 1; i < document.all.dgtarget.rows.length; i++)
    {
        var lbtargetNameObj = document.all["dgtarget__ctl" + (i + 1) + "_lbtargetName"];
        if (lbtargetNameObj.value != "")
            continue;

        var sType = "";
        if (argCInfo.InfoType != "Account" && argCInfo.InfoType != "Role" && argCInfo.InfoType != "Unit" && argCInfo.InfoType != "Org")
            return;

        document.all["dgtarget__ctl" + (i + 1) + "_txUserCode"].value = "";
        document.all["dgtarget__ctl" + (i + 1) + "_txRoleCode"].value = "";
        document.all["dgtarget__ctl" + (i + 1) + "_txUnitCode"].value = "";
        document.all["dgtarget__ctl" + (i + 1) + "_txGroupCode"].value = "";
        document.all["dgtarget__ctl" + (i + 1) + "_txOrgCode"].value = "";
        if (argCInfo.InfoType == "Account")
        {
            sType = "0";
            document.all["dgtarget__ctl" + (i + 1) + "_txUserCode"].value = argCInfo.Code;
            //1020517 Kevin 1020257 帳號發布對象新增儲存單位
            document.all["dgtarget__ctl" + (i + 1) + "_txUnitCode"].value = argCInfo.UnitCode;
            //1020801	Cloud	1020607		修正發布對象為帳號時，點擊名稱帶不回來的bug
            lbtargetNameObj.value = argCInfo.Name;
        }
        else if (argCInfo.InfoType == "Role")
        {
            sType = "1";
            document.all["dgtarget__ctl" + (i + 1) + "_txUnitCode"].value = argCInfo.SuperiorUnitCode;
            document.all["dgtarget__ctl" + (i + 1) + "_txRoleCode"].value = argCInfo.Code;
            lbtargetNameObj.value = argCInfo.FullName;
        }
        else if (argCInfo.InfoType == "Unit")
        {
            sType = "2";
            document.all["dgtarget__ctl" + (i + 1) + "_txUnitCode"].value = argCInfo.Code;
            lbtargetNameObj.value = argCInfo.Name;
        }
        else if (argCInfo.InfoType == "Org")
        {
            sType = "4";
            document.all["dgtarget__ctl" + (i + 1) + "_txOrgCode"].value = argCInfo.Code;
            lbtargetNameObj.value = argCInfo.Name;
        }

        document.all["dgtarget__ctl" + (i + 1) + "_txOrgNo"].value = argCInfo.SourceOrgNo;
        document.all["dgtarget__ctl" + (i + 1) + "_txIdType"].value = sType;

        //0991231 David 0991039 公告對象帶入EMAIL通知選項勾選預設值依參數設定--START
        if (document.all.H_RbEmailType.value == "1")
        {
            document.all["dgtarget__ctl" + (i + 1) + "_cbSelectEmail"].checked = true;
            document.all["dgtarget__ctl" + (i + 1) + "_cbSelectUnit"].checked = true;
        }
        else if (document.all.H_RbEmailType.value == "2")
            document.all["dgtarget__ctl" + (i + 1) + "_cbSelectEmail"].checked = true;
        //0991231 David 0991039 公告對象帶入EMAIL通知選項勾選預設值依參數設定--END

        fnUnCheckAll("cbSelectEmail")//0970915 Leo 
        fnUnCheckAll("cbSelectAttach")
        fnUnCheckAll("cbSelectUnit")
        break;
    }
}

function fnAddGroupTarget(argGroup)
{
    for (var i = 1; i < document.all.dgtarget.rows.length; i++)
    {
        var lbtargetNameObj = document.all["dgtarget__ctl" + (i + 1) + "_lbtargetName"];
        if (lbtargetNameObj.value != "")
            continue;
        document.all["dgtarget__ctl" + (i + 1) + "_txUserCode"].value = "";
        document.all["dgtarget__ctl" + (i + 1) + "_txRoleCode"].value = "";
        document.all["dgtarget__ctl" + (i + 1) + "_txUnitCode"].value = "";
        document.all["dgtarget__ctl" + (i + 1) + "_txGroupCode"].value = argGroup.GroupNo;
        document.all["dgtarget__ctl" + (i + 1) + "_txOrgCode"].value = "";
        document.all["dgtarget__ctl" + (i + 1) + "_txIdType"].value = "3";
        //0991231 David 0991039 公告對象帶入EMAIL通知選項勾選預設值依參數設定--START
        if (document.all.H_RbEmailType.value == "1")
        {
            document.all["dgtarget__ctl" + (i + 1) + "_cbSelectEmail"].checked = true;
            document.all["dgtarget__ctl" + (i + 1) + "_cbSelectUnit"].checked = true;
        }
        else if (document.all.H_RbEmailType.value == "2")
            document.all["dgtarget__ctl" + (i + 1) + "_cbSelectEmail"].checked = true;
        //0991231 David 0991039 公告對象帶入EMAIL通知選項勾選預設值依參數設定--END
        lbtargetNameObj.value = argGroup.GroupName;
        //1030410	Cloud	[1000854]	配合程式修改ASP架構
        document.all["dgtarget__ctl" + (i + 1) + "_txOrgNo"].value = document.all.H_OrgNo.value;

        fnUnCheckAll("cbSelectEmail")//0970915 Leo 
        fnUnCheckAll("cbSelectAttach")
        fnUnCheckAll("cbSelectUnit")
        break;
    }
}

function fnSelectClick()
{
    if (document.all.rbSelectOrg.checked == false && document.all.rbSelectGroup.checked == false)
        document.all.rbSelectOrg.checked = true;

    if (document.all.rbSelectOrg.checked)
    {
        var argParam = "0";

        //0991215 David 0990750 新增可選擇角色
        //var argSelectType = new Array(3);
        var argSelectType = new Array(4);
        //1030410	Cloud	[1000854]	配合程式修改ASP架構
        //argSelectType[0] = "Org";
        argSelectType[0] = "";
        argSelectType[1] = "Unit";
        //0991215 David 0990750 新增可選擇角色
        argSelectType[2] = "Role";
        argSelectType[3] = "Account";

        var sSelectType = "";
        for (var i = 0; i < argSelectType.length; i++)
        {
            if (i != 0)
                sSelectType += ",";
            //1070803 Justin [1070678]弱掃修正Client Cookies Inspection--S
            //sSelectType += "'" + argSelectType[i] + "'";
            sSelectType += argSelectType[i];
        }
        //jf_SaveCookie("iic021StrctureType"	, argParam);
        //jf_SaveCookie("iic021SelectType"	, sSelectType);

        //1001117 David 1000854 新增傳入目前機關代碼給IIC021
        //jf_SaveCookie("iic021OrgNo"	, document.all.H_OrgNo.value);

        if (document.all.TargetNavbar.src != document.all["hOrgPage"].value)
            //document.all.TargetNavbar.src = document.all["hOrgPage"].value;
            document.all.TargetNavbar.src = document.all["hOrgPage"].value + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + document.all.H_OrgNo.value;
        //1070803 Justin [1070678]弱掃修正Client Cookies Inspection--E
    }
    else
    {
        if (document.all.TargetNavbar.src != document.all["hGroupPage"].value)
            document.all.TargetNavbar.src = document.all["hGroupPage"].value;
    }
}

//1100201	Joe		1090927		取消使用document.activeElement--S
// function fnbtAddClearItem() {
// var actE = document.activeElement;
// var dglbtargetName = actE.id.substring(0, actE.id.indexOf("btAddClear"));
function fnbtAddClearItem()
{
    var dglbtargetName = event.target.id.substring(0, event.target.id.indexOf("btAddClear"));
    //1100201	Joe		1090927		取消使用document.activeElement--E
    document.all[dglbtargetName + "txOrgNo"].value = "";
    document.all[dglbtargetName + "txIdType"].value = "";
    document.all[dglbtargetName + "txOrgCode"].value = "";
    document.all[dglbtargetName + "txGroupCode"].value = "";
    document.all[dglbtargetName + "txUnitCode"].value = "";
    document.all[dglbtargetName + "txRoleCode"].value = "";
    document.all[dglbtargetName + "txUserCode"].value = "";
    document.all[dglbtargetName + "lbtargetName"].value = "";
    //Iris 0970107 清除通知 附件check
    document.all[dglbtargetName + "cbSelectEmail"].checked = false;
    document.all[dglbtargetName + "cbSelectAttach"].checked = false;
    document.all[dglbtargetName + "cbSelectUnit"].checked = false;//0970915 Leo 

    fnUnCheckAll("cbSelectEmail")//0970915 Leo 
    fnUnCheckAll("cbSelectAttach")
    fnUnCheckAll("cbSelectUnit")
}

function fnbtAddClearItemById(argId)
{
    var dglbtargetName = argId.substring(0, argId.indexOf("btAddClear"));
    document.all[dglbtargetName + "txOrgNo"].value = "";
    document.all[dglbtargetName + "txIdType"].value = "";
    document.all[dglbtargetName + "txOrgCode"].value = "";
    document.all[dglbtargetName + "txGroupCode"].value = "";
    document.all[dglbtargetName + "txUnitCode"].value = "";
    document.all[dglbtargetName + "txRoleCode"].value = "";
    document.all[dglbtargetName + "txUserCode"].value = "";
    document.all[dglbtargetName + "lbtargetName"].value = "";
    //Iris 0970107 清除通知 附件check
    document.all[dglbtargetName + "cbSelectEmail"].checked = false;
    document.all[dglbtargetName + "cbSelectAttach"].checked = false;
    document.all[dglbtargetName + "cbSelectUnit"].checked = false;//0970915 Leo 
}

function fnCbAttClick()
{
    if (document.all["cbAttach"].checked == true)
        document.all["cbMail"].checked = true;
    else
        document.all["cbMail"].checked = false;
}

function fnCleanAllDg()
{
    var sArr = document.all.nClearBtnList.value.split(';');
    for (var i = 0; i < sArr.length; i++)
    {
        if (sArr[i] != "")
            fnbtAddClearItemById(sArr[i]);
    }
    document.all["cbSelectEmail"].checked = false;//0970915 Leo 
    document.all["cbSelectAttach"].checked = false;
    document.all["cbSelectUnit"].checked = false;

}
//0970915 Leo E-mail通知新增全選功能
function fnCheckAll(argCol)
{
    var bCheck = document.all[argCol].checked
    var dgCnt = document.all.dgtarget.rows.length
    for (var i = 1; i < dgCnt; i++)
    {
        var lbtargetNameObj = document.all["dgtarget__ctl" + (i + 1) + "_lbtargetName"];
        if (lbtargetNameObj.value == "")
        {
            document.all["dgtarget__ctl" + (i + 1) + "_" + argCol].checked = false;
            continue;
        }
        document.all["dgtarget__ctl" + (i + 1) + "_" + argCol].checked = bCheck;
    }
}
function fnUnCheckAll(argCol)
{
    var bCheck = document.all[argCol].checked
    var dgCnt = document.all.dgtarget.rows.length
    var iNameCnt = 0;
    var iCheckCnt = 0;
    for (var i = 1; i < dgCnt; i++)
    {
        var lbtargetNameObj = document.all["dgtarget__ctl" + (i + 1) + "_lbtargetName"];
        if (lbtargetNameObj.value != "")
        {
            iNameCnt++;
            if (document.all["dgtarget__ctl" + (i + 1) + "_" + argCol].checked)
                iCheckCnt++;
        }
    }
    document.all[argCol].checked = (iNameCnt == iCheckCnt) && (iNameCnt != 0);

}
function fnCheckMailChecked()
{
    var argUnit = event.srcElement.id;
    var argMail = argUnit.replace("cbSelectUnit", "cbSelectEmail")
    if (document.all[argUnit].checked)
        document.all[argMail].checked = true;
}
function fnCheckUnitUnChecked()
{
    var argMail = event.srcElement.id;
    var argUnit = argMail.replace("cbSelectEmail", "cbSelectUnit");
    if (!document.all[argMail].checked)
        document.all[argUnit].checked = false;
}
//0980612	David	0980278 儲存前紀錄附件最新資訊
//Start
function if_GetNewAttInfo()
{
    var TbFD = document.all["TBFileDesc"].value;
    var strSymbol = "";
    var strNewAttName = "";
    var strNewAttSize = "";
    var strNewAttdDesc = "";
    //0990625 David 0990024 新增紀錄附件類型
    var strNewAttType = "";

    for (var i = 1; i < document.all.dgAttach.rows.length; i++)
    {
        var row = document.all.dgAttach.rows[i];
        //1060510	Kevin_C	1050087	升二代 -S
        //strNewAttName +=  strSymbol+ row.cells[1].childNodes[0].innerText;
        //strNewAttSize +=  strSymbol+row.cells[2].childNodes[0].innerText;
        strNewAttName += strSymbol + row.cells[1].children[0].textContent;
        strNewAttSize += strSymbol + row.cells[2].children[0].textContent;
        //1060510	Kevin_C	1050087	升二代 -E
        if (TbFD == "Y")
            //1060510	Kevin_C	1050087	升二代
            //strNewAttdDesc +=  strSymbol+row.cells[3].childNodes[0].value;
            strNewAttdDesc += strSymbol + row.cells[3].children[0].value;
        //0990625 David 0990024 新增紀錄附件類型，DataGrid的cells[]會因是否顯示附件描述而有所不同，故分別處理
        if (TbFD == "Y")
            //1060510	Kevin_C	1050087	升二代
            //strNewAttType += strSymbol+ row.cells[5].childNodes[0].innerText;
            strNewAttType += strSymbol + row.cells[5].children[0].textContent;
        else
            //1060510	Kevin_C	1050087	升二代
            //strNewAttType += strSymbol+ row.cells[4].childNodes[0].innerText;
            strNewAttType += strSymbol + row.cells[4].children[0].textContent;
        strSymbol = "|";
    }
    document.all["txNewAttName"].value = strNewAttName;
    document.all["txNewAttSize"].value = strNewAttSize;
    document.all["txNewAttDesc"].value = strNewAttdDesc;
    //0990625 David 0990024 新增紀錄附件類型
    document.all["txNewAttType"].value = strNewAttType;
}
//End
//0990311 David 0990165 新增來文機關OnBlur
function txFromOrg_OnBlur()
{
    if (document.all.txFromOrg.value == "")
    {
        document.all.txFromOrg1.value = "";
        return;
    }
    //1080318	Joe		1080098		弱掃修正禁用WSDL--S
    /*
    var wsParam = new Array(4);
    wsParam[0] = document.all.txFromOrg.value;
    wsParam[1] = document.all.H_OrgNo.value;
    wsParam[2] = document.all.H_OrgNo.value;
    wsParam[3] = document.all.H_OrgNo.value;
    var strUrl = "http://"+document.all.WEDEP_SERVER_NAME.value+"/WEDEP/WEOrgInfo.asmx";
    var CallWsObj = jf_CallW(strUrl,"GetOrgInfo",false,wsParam);
    */
    //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--S
    // var params = new SOAPClientParameters();
    // params.add('argFullName', document.all.txFromOrg.value);
    // params.add('OrgNo', document.all.H_OrgNo.value);
    // params.add('DeptNo', document.all.H_OrgNo.value);
    // params.add('UserID', document.all.H_OrgNo.value);
    // var strUrl = "http://"+document.all.WEDEP_SERVER_NAME.value+"/WEDEP/WEOrgInfo.asmx";
    // var CallWsObj = SOAPClient.invokeJSON(strUrl, "GetOrgInfo", params ,false, null)
    var wsParam = new Array(4);
    wsParam[0] = document.all.txFromOrg.value;
    wsParam[1] = document.all.H_OrgNo.value;
    wsParam[2] = document.all.H_OrgNo.value;
    wsParam[3] = document.all.H_OrgNo.value;
    var strUrl = "http://" + document.all.WEDEP_SERVER_NAME.value + "/WEDEP/WEOrgInfo.asmx";
    //1090914 Zen 1090643 修正開啟SSL後未轉換網址導致取得機關名稱錯誤
    if (document.all.II_USE_SSL != null)
    {
        if (document.all.II_USE_SSL.value == "Y")
            strUrl = strUrl.replace("http://", "https://");
    }
    var CallWsObj = jf_CallW(strUrl, "GetOrgInfo", false, wsParam);
    //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--E
    //1080318	Joe		1080098		弱掃修正禁用WSDL--E

    wsCalOrgInfo = CallWsObj.id;
    OnWSResult(CallWsObj);
}

//1100218	Joe		1100203		弱掃修正No Request Validation--S
function jf_EncodeSubject()
{
    document.all["txSubject"].value = encodeURIComponent(document.all["txSubject"].value);
    document.all["txContent"].value = encodeURIComponent(document.all["txContent"].value);
}
//1100218	Joe		1100203		弱掃修正No Request Validation--E