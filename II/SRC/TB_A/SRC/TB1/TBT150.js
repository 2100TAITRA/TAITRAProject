/*
 * 0960625	Charles Matte   000945		(中興)來文掃描影像走線上簽核且無稿件TBT150發布有誤
 * 0960713	--      Matte   000966		新增附件描述欄位
 * 0961008	Caesar  Caesar  001664		中企處要求提供可將已存在掃描影像作為發佈之附件.
 * 0961008	Caesar  Caesar  001663      中企處要求第三類發佈時,將稿件受文者預設帶入到公告對象
 * 0961114	Caesar  Matte   0960132     正式公文列印時列印出受文者
 * 0970111	------	Matte   -------     更新取得組織架構以及受文者資訊
 * 0970118	Stella  Iris    0970075		配合依權限發佈對象選擇"本單位"或"其他"頁籤 
 * 0970130	Stella  Iris    0970107     新增清除所有受文者之功能鍵
 * 0970515	Andy    Leo     0970375     修正當nRecvList為空白時也要排除，使用者無權發布其它公告對象時就不要帶入
 * 0970828			Leo		001674		新增通知全部
 * 0980212			Yvonne  -------		修正檔管局刪除附件後無法發佈的問題(document.all[...]是NULL或不是一個物件
 * 0980513			Albert  0980210		以批示文面發布時增加取得SfolderUtil的錯誤訊息
 * 0980612	Stella	David	0980278		修正來文電子檔之描述及修改取得附件描述欄位值
 * 0980813	Stella	David	0980309		發生錯誤時應return，畢免發布錯誤的公告資訊
 * 0980901	Stella	David	0980347		於附件DataGrid中執行區域新增開啟功能鍵，點選後可開啟該附件
 * 0980902	Stella	David	0980466		將公告發布時間，紀錄為13碼(YYYMMDDhhmmss)
 * 0980916	Stella	David	0980456		(檔管局)使用簽與便簽發布公告時，跳出提示訊息
 * 0980916	Stella	David	0980455		使用WebFileIO時，應傳入Artifact
 * 0990625	------	David	0990024		1.發布公告時，多紀錄附件類型
 *        	      	     	       		2.修改預設附件描述
 * 0990726	------	David	0990071		AJAX CalculateDate()、CalculateDays()須用到機關代碼，多傳入
 * 0991215	------	David	0990750		新增發布對象可選擇角色
 * 0991231	------	David	0991039		公告對象帶入EMAIL通知選項勾選預設值依參數設定
 * 1000322	David	David	1000278		新增「內部發文」選項
 * 1010112	David	David	1010023		轉PDF時，需轉出正確的文別
 * 1010306	David	David	1010041		1.「含來文電子檔」「內部發文」選相依預設值判斷是否勾選。
                                        2.附件顯示依稿件各別顯示，切換稿件時需重新顯示。
 * 1010501  David   Cloud   1010322     日期欄位新增小日曆
 * 1010420	David	David	1010008		新增投信投顧公會客製化需求
 * 1020221	Kevin 	Cloud 	[1020084] 	修正由TBT150發佈公告時，來文機關如為代碼會直接顯示代碼的問題
 * 1020221	Kevin	Cloud	1020085		FOR修正單號1010533 衍伸BUG 增加儲存承辦單位承辦科別資訊
 * 1020324	Kevin	Cloud	1020013		修改當通知對象為機關、單位時，公告以參數ShowTbForSetRole以及是否勾選僅通知登記桌決定是否只有[僅通知登記桌功能]設定角色能看到
 * 1020516	Kevin	Kevin	1010781		新增上傳檔案錯誤處理
 * 1020517	Kevin	Kevin	1020257		帳號發布對象新增儲存單位
 * 1020618	Kevin	Cloud	[1020430]	修改來文掃描檔，可由畫面含來文電子檔CheckBox控制發佈時是否一併發佈
 * 1020702	Kevin	Kevin	1010781		因批示文面元件自行上傳PDF導致可能不需要叫用元件，新增檢核是否叫用WS
 * 1030410	Cloud	Cloud	1000854		支援ASP架構，進行程式修改
 * 1031016	Cloud	Eric	1030701		增加附件描述字數限制以及錯誤訊息
 * 1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
 * 1040323	Cloud	Kevin_C	1040136		在發布成功的提示訊息後加上公告編號
 * 1040602	Cloud	Kenny	1040284		增加判斷投信投顧使用時附件刪除鍵隱藏邏輯
 * 1040609  CLOUD   CLOUD   1040278     增加發布方式按鈕連動，及發布時判斷所選發布方式
 * 1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
 * 1040716	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
 * 1040820	Cloud	Kevin_C	1040671		修正取不到最後一個公告對象的問題
 * 1050204	Cloud	Kevin_C	1041040		註冊隱藏欄位記錄畫面預設選項
 * 1051013  Cloud   Cloud   1050087     升級二代調整為自行下載公文稿件     
 * 1051114	Cloud	Kevin_C	1050234		取得系統參數WE_ATTACH_CHECK進行副檔名檢核
 * 1051214  Kevin   Kenny   1051150     修改弱掃Client Potential Code Injection
 * 1060112	Cloud	Kevin_C	1050234		修正附檔名取得邏輯
 * 1060512  Cloud   Cloud   1050087     升級二代    
 //1060612  Kevin   Zen     1060456     弱掃XSS修正
 * 1060726  Cloud   Cloud   --          修正，本文轉成pdf使用文號.xml才對
 * 1060802	Cloud	Cloud	--			修正使用錯誤屬性，導致程式不正常執行問題
 * 1060822	Cloud	Kevin_C	1060765		修正TBT150下載後檔案內容為空的問題
 * 1060908 	--		Cloud	--			修正公告對象點選[其他]設定資訊後又點選本單位或全機關，不會將datagrid清空問題
 * 1061205	Cloud	Cloud	--			修正上傳附件轉檔工作站，異常問題、補上異常未unlock部分
 * 1070403	Cloud	Cloud	--			調整轉檔工作站訊息
 * 1070502	Cloud	Cloud	--			修改TB-為TB_
 * 1070709  Kevin   Zen     1070678     弱掃XSS修正
 * 1070904	Kevin	Justin	1070678		弱掃修正CookieHttpOnly
 * 1071017 	Kevin	Joe		1070678		弱掃修正Client Potential XSS
 * 1071019  Cloud   Cloud   --          因不同瀏覽器針對由c#設定radiobutton.enable的解讀方式不同，於chrome、firefox，此設定方式無效，故修改
 * 1071031  Cloud   Cloud   1071100     修改公佈欄轉檔工作站支援ASP架構
 * 1071115 	Cloud	Cloud	--			補升級二代漏改部分
 * 1080104  David   Zen     1071254     修正公告對象為本單位時一率寄送通知Email之問題
 * 1080107  Cloud   Zen     1071077     (航港局)新增Email標題選單及通知預設原承辦人
 * 1080122	David	Zen		內政部序1354	修正公告期限、刊登天數欄位未onblur直接發布後資料異常問題
 * 1080116	Kevin	Kevin_C	1070678		修正弱掃Client Potential XSS
 * 1080115	Kevin	Joe		1080049		修正弱掃Hardcoded Absolute Path
 * 1080131	David	Zen		內政部序1354	修正點選公告期限小日曆後發布未更新刊登天數之問題
 * 1080214	Kevin	Joe		1080179		弱掃修正Reflected XSS Specific Clients
 * 1080220	David	Zen		1071077		修正稿件受文者含內部單位時公告對象未預帶出原承辦人之問題
 * 1080318	Kevin	Joe		1080098		弱掃修正禁用WSDL
 * 1080604	Kevin	Joe		1080481		弱掃Client Potential Code Injection修正
 * 1080618	Kevin	Joe		1080481		弱掃Client Potential Code Injection修正
 * 1080710	David	David	1071180		發布公告行為改於Server上執行
 * 1080904	Kevin	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理
 * 1081001	Kevin	Kevin_C	1070678		修正HtmlEncode名稱錯誤
 * 1081203	David	David	-------		修正發布紙本掃描影像資訊錯誤問題
 * 1090219  David   Zen     1090106     修正開啟公文後預設主旨非當前稿件主旨之問題
 * 1090422  David   Zen     1090245     調整"以批示文面方式發佈"選項UI為RadioButton
 * 1090821  Leslie  Zen     1090550     修正多次加入附件的情況下發布公告錯誤之問題
 * 1090914  Leslie  Zen     1090664     修正發布公告中點擊功能鍵導致多次發布重複公告之問題
 * 1100201	Leslie	Joe		1090927		取消使用document.activeElement
 * 1110103  Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
 * 1120907	Leslie	Zen		屏東縣序193 修正公告附件路徑組串異常之問題
 * 1121018  Leslie  Zen     序261       修正從ODT351開啟發布公告後未顯示發布成功訊息之問題
 * 1121201	Leslie	Zen		1111264		修正因變數語法不嚴謹導致發布失敗之問題
 * 1121220	Leslie	Leslie	--			各機關問題彙整表 序346，修正可開啟使用者當前夾帶的附件
 * 1130805	Zen		Zen		序169		刪除非末筆附件後再加入發布錯誤
 * 1131205	Zen		Zen		屏東序801	修正取無閒置工作站時未顯示對應提示訊息之問題
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
//1020221	Cloud [1020084] 修正由TBT150發佈公告時，來文機關如為代碼會直接顯示代碼的問題
var wsCalOrgInfo;
//1060518 Cloud 1050087 升級二代-修改取得檔案資訊方式-存放檔案物件及暫存(格式檢核未放入)
var AllFiles = [];
var AllWaitForCheckFiles = [];

//* 1060512  Cloud  1050087     升級二代
/*document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/
document.all.rbSelectOrg.onclick = fnSelectClick;
document.all.rbSelectGroup.onclick = fnSelectClick;
//2014.12.05	Cloud	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-S
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
//2014.12.05	Cloud	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-E

//1080122 Zen 內政部序1354 修正公告期限、刊登天數欄位未onblur直接發布後資料異常問題
var strFinalFocusId = '';
document.all['txExpireDate'].onfocus = function () { strFinalFocusId = 'txExpireDate'; }
document.all['txPasteDays'].onfocus = function () { strFinalFocusId = 'txPasteDays'; }

//1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題，紀錄附件夾帶次數
var nInputFileCnt = '';

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{	
    //* 1060512  Cloud  1050087     升級二代
    //jf_CallWS("../../../ODDEP/ODT351WS.asmx", "GetDocFilesInfo", false, null);
    //jf_CallWA(jf_Trim(document.all.txInsideTBWS.value), "", false, null);
    //jf_CallWS(jf_Trim(document.all.txInsideTBWS.value), "PasteDocBulletin", false, null);

    jf_fnShowDG();
    jf_CheckInSideOutSide();

    //1090219 Zen 1090106 修正開啟公文後預設主旨非當前稿件主旨之問題，移至dlDoc_onchange()前執行避免預設值被改變
    if (document.all['H_Subject'])
        document.all['txSubject'].value = document.all['H_Subject'].value;

    dlDoc_onchange();

    //1121018 Zen 序261 修正從ODT351開啟發布公告後未顯示發布成功訊息之問題，移至上方
    if (document.all.ErrMsgWin && document.all.ErrMsgWin.value != "")
        alert(document.all.ErrMsgWin.value);
    else if (document.all.MsgWin && document.all.MsgWin.value != "")
        alert(document.all.MsgWin.value);

    if (jf_GetActionMode() == LayoutModeNew)
        document.all.dlCategory.selectedIndex = document.all.txDefaultCategroy.value;

    //1121018 Zen 序261 修正從ODT351開啟發布公告後未顯示發布成功訊息之問題，調整為不關閉視窗避免縮小後未見公告編號即關閉子視窗
    //if (document.all.nClose != null && document.all.nClose.value == "Y")
    //    window.close();
    //1010420 David 1010008 依H_txSITCA欄位判斷投信投顧公會客製化欄位是否顯示
    if (document.all.H_txSITCA.value == "Y")
        document.all.divSITCA.style.display = "";
    else
        document.all.divSITCA.style.display = "none";

    //1090219 Zen 1090106 修正開啟公文後預設主旨非當前稿件主旨之問題，移至dlDoc_onchange()前執行避免預設值被改變
    ////1080214	Joe		1080179		弱掃修正Reflected XSS Specific Clients--S
    //if (document.all.H_Subject)
    //    document.all.txSubject.value = document.all.H_Subject.value;
    ////1080214	Joe		1080179		弱掃修正Reflected XSS Specific Clients--E

    //1121018 Zen 序261 修正從ODT351開啟發布公告後未顯示發布成功訊息之問題，移至上方
    ////1080710 David 1071180 發布公告行為改於Server上執行，異常時顯示錯誤訊息
    //if (document.all.ErrMsgWin && document.all.ErrMsgWin.value != "")
    //    alert(document.all.ErrMsgWin.value);
    //else if (document.all.MsgWin && document.all.MsgWin.value != "")
    //    alert(document.all.MsgWin.value);

	//1130805 Zen 序169 修正DG顯示問題
	$(window).trigger('resize');
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl() {
// var xObjectName = document.activeElement.id;
function ClientButtonControl(e)
{
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
            //1060524 Cloud 升級二代修改附件加入邏輯
            //fnAddFile();
            //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題，紀錄附件夾帶次數
            //document.getElementById('fileInput').click();
            document.getElementById('fileInput' + nInputFileCnt).click();
            break;
        case "btAddScanImg":
            //0961008 Caesar 001664 中企處要求提供可將已存在掃描影像作為發佈之附件.
            fnAddScanImg();
            break;
        //0970107 Iris 清除所有受文者
        case "btCleanAll":
            fnCleanAllDg();
            break;
        //1010501 Cloud 1010322 新增小日曆
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
    //1071019  Cloud   因不同瀏覽器針對由c#設定radiobutton.enable的解讀方式不同，於chrome、firefox，此設定方式無效，故修改-S
    if (document.all["rbInsideEnabled"].value != "TRUE")
        document.all["rbInside"].disabled = "disabled";
    if (document.all["rbBothEnabled"].value != "TRUE")
        document.all["rbBoth"].disabled = "disabled";
    if (document.all["rbOutsideEnabled"].value != "TRUE")
        document.all["rbOutside"].disabled = "disabled";
    //1071019  Cloud   因不同瀏覽器針對由c#設定radiobutton.enable的解讀方式不同，於chrome、firefox，此設定方式無效，故修改-E
    if (document.all["rbInside"].checked)
    {
        if (document.all["rbRange2"])
            document.all["rbRange2"].disabled = "disabled";
        if (document.all["rbRange3"])
            document.all["rbRange3"].disabled = "disabled";
        document.all["rbOther"].disabled = "";
        document.all["rbUnit"].disabled = "";
        document.all["rbOrg"].disabled = "";
        //1000321 David 1000278 內部時，預設部勾選
        //1010306 David 1010041 依設定判斷是否預設勾選
        if (document.all["txDispatch"].value.toUpperCase() == "Y")
            document.all["cbDispatch"].checked = true;
        else
            document.all["cbDispatch"].checked = false;

        //1010420 David 1010008 選則內部時，投信投顧公會客製化欄位不可輸入
        document.all.txSitcaIssueType.disabled = "disabled";
        document.all.txSitcaIssueType.value = "";
        document.all.cbSitcaRegulation.disabled = "disabled";
        document.all.cbSitcaRegulation.checked = false;
        fncbSitcaRegulationCheck();
        document.all.txSitcaBasis.disabled = "disabled";
        document.all.txSitcaBasis.value = "";
        //1071019  Cloud   因不同瀏覽器針對由c#設定radiobutton.enable的解讀方式不同，於chrome、firefox，此設定方式無效，故修改
        if (document.all["rbOrgEnabled"].value != "TRUE")
            document.all["rbOrg"].disabled = "disabled";
        if (document.all["rbUnitEnabled"].value != "TRUE")
            document.all["rbUnit"].disabled = "disabled";
        if (document.all["rbOtherEnabled"].value != "TRUE")
            document.all["rbOther"].disabled = "disabled";
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
        //1071019  Cloud   因不同瀏覽器針對由c#設定radiobutton.enable的解讀方式不同，於chrome、firefox，此設定方式無效，故修改
        if (document.all["rbOrgEnabled"].value == "TRUE")
            document.all["rbOrg"].checked = true;
        //1000321 David 1000278 外部時，DISABLE
        document.all["cbDispatch"].disabled = "disabled";
        jf_fnShowDG();

        //1010420 David 1010008 選則內部時，投信投顧公會客製化欄位不可輸入
        document.all.txSitcaIssueType.disabled = "";
        document.all.cbSitcaRegulation.disabled = "";
        fncbSitcaRegulationCheck();
        document.all.txSitcaBasis.disabled = "";
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

            //1000321 David 1000278 點選其他時，才可編輯
            document.all["cbDispatch"].disabled = "";

            //1010306 David 1010041 依設定判斷是否預設勾選
            if (document.all["txDispatch"].value.toUpperCase() == "Y")
                document.all["cbDispatch"].checked = true;
            else
                document.all["cbDispatch"].checked = false;

            //1080107 Zen 1071077 (航港局)新增Email標題選單及通知預設原承辦人
            if (document.all['strOrgNickName'].value == 'MPB' && document.all['TemplateMode'].value == '1')
            {
                var objCInfo = new Object();
                var strSuperiorUnitCode = document.all['strRpsSectNo'].value
                if (strSuperiorUnitCode == '')
                    strSuperiorUnitCode = document.all['strRpsDeptNo'].value

                objCInfo.Code = document.all['strRpsUser'].value;
                objCInfo.Name = document.all['strRpsEmpName'].value;
                objCInfo.SuperiorUnitCode = strSuperiorUnitCode;
                objCInfo.SourceOrgNo = document.all['H_OrgNo'].value;
                objCInfo.InfoType = 'Account';
                fnAddOrgTarget(objCInfo);
            }
        }
        else
        {
            document.all.dgtarget.disabled = true;
            document.all.btCleanAll.disabled = true;//iris 0970107
            document.all.rbSelectOrg.disabled = true;
            document.all.rbSelectGroup.disabled = true;
            document.all.cbDiv.className = "";
            document.all.cbUnitSpan.className = "";
            //1000321 David 1000278 點選其他時，才可編輯
            document.all["cbDispatch"].checked = false;
            document.all["cbDispatch"].disabled = "disabled";
            // 1060908 	Cloud	修正公告對象點選[其他]設定資訊後又點選本單位或全機關，不會將datagrid清空問題
            $('#dgtarget').find('input[type="text"]').val('');
            $('#dgtarget').find('input[type="checkbox"]').prop("checked", false);
        }
    }
}

//0980901	David	0980347	新增OpenFile函式，供點選附件DataGrid中開啟功能鍵使用--Start
/*
1.開啟原公文附件時，傳入附件名稱
2.開啟新加入附件時，傳入完整路徑名稱
*/
//1121220	Leslie	各機關問題彙整表 序346，修正可開啟使用者當前夾帶的附件
// function OpenFile(argFileName) {
function OpenFile(argFileName, argUrlPath)
{
    /* var OpenFildPath = "";
     var localPathForAtt	= "C:\\TEMP\\";*/
    //建立工作暫存區
    /* CreateAllFolder(localPathForAtt);		
     
     try
     {
         //1060524 Cloud 升級二代一律改為下載功能
         if(argFileName.indexOf('\\') != -1)//表示為新加入之附件，將檔案複製至本機C:\TEMP下
         {
             //1060524 Cloud 升級二代一律改為下載功能-新檔案先上傳在下載
             /*var fso = new ActiveXObject("Scripting.FileSystemObject");
             fso.CopyFile(argFileName,localPathForAtt,true);
             var strName =  argFileName.substr(argFileName.lastIndexOf("\\") + 1);
             OpenFildPath = localPathForAtt + strName;*/

    //    }
    //    else//表示為公文附件，點選開啟時將檔案下載至本機C:\TEMP下
    //    {
    //        var soap = new ActiveXObject("WSWrapper.WebFileIO");
    //        //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
    //        //soap.Init(document.all["H_ServiceURL"].value);
    //        var serviceURL = document.all["H_ServiceURL"].value ;
    //        if ( document.all.II_USE_SSL != null )
    //        {
    //            if ( document.all.II_USE_SSL.value == "Y" )
    //                serviceURL = serviceURL.replace("http://", "https://") ;
    //        }
    //        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
    //        try
    //        {
    //            soap.Init(serviceURL);

    //            var serverAtt = document.all["wsiworkpath"].value+"Attach\\";
    //            var serverAttName = argFileName;
    //            soap.AddFile(serverAtt,serverAttName);
    //            //0980916	David	0980455	使用WebFileIO時，應傳入Artifact
    //            //soap.Download("", false, localPathForAtt);
    //            soap.Download(document.all["SsoArtifact"].value, false, localPathForAtt);
    //            //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
    //            //if(soap.hasError)
    //            //{
    //            //	alert('附件檔案下載失敗，錯誤訊息為：' + soap.ErrorMessage);
    //            //	return;
    //            //}
    //            //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
    //            soap = null;
    //            OpenFildPath = localPathForAtt + "\\"+serverAttName;
    //            //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
    //        }
    //        catch(e)
    //        {
    //            var strErrMsg = e.message;		
    //            if (soap.hasError)
    //                strErrMsg += soap.ErrorMessage;
    //            alert("連接伺服器"+serviceURL+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg);
    //            return;
    //        }
    //        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
    //    }
    //    //開啟檔案
    //    var oShell = new ActiveXObject("Shell.Application");
    //    oShell.ShellExecute(OpenFildPath, "", "", "", 4);
    //}
    //catch(e)
    //{
    //    var ErrorMessage = e.message;
    //    alert('處理檔案時發生錯誤，訊息為：'+ErrorMessage);
    //}*/
    //1060822	Kevin_C	1060765	修正TBT150下載後檔案內容為空的問題
    //* 1070502	Cloud	--			修改TB-為TB_
    //argFileName = document.all["wsiworkpath"].value+ "\\TB-" + document.all.txDocNo.value + "\\" +"Attach\\"+argFileName;
    //1080710 David 1071180 修正抓取公文附件路徑
    //argFileName = document.all["wsiworkpath"].value + "\\TB_" + document.all.txDocNo.value + "\\" + "Attach\\" + argFileName;

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


    argFileName = document.all["wsiworkpath"].value + "\\" + document.all.H_OrgNo.value + "\\TB_" + document.all.txDocNo.value + "\\" + "Attach\\" + argFileName;
    var rtnVal = TB1.TBT150.AttDownLoad(argFileName).value;
    if (rtnVal[1] != "")
        alert(rtnVal[1]);
    else
        openDlg(rtnVal[0] + "&OpenType=download", document.all["SsoArtifact"].value, "");

}//End

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//* 1060512  Cloud  1050087     升級二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
{
    //* 1060512  Cloud  1050087     升級二代
    //document.all.tbTool.focus();

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
    //* 1060512  Cloud  1050087     升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            if (document.all.txDocNo.value == "")
            {
                Page_BlockSubmit = true;
                alert("請輸入文號。");
                //* 1060512  Cloud  1050087     升級二代
                //document.all.txDocNo.focus();
                $('txDocNo').focus()
            }
            else
            {
                Page_BlockSubmit = false;
            }
            //* 1060512  Cloud  1050087     升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = true;
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                //LoadDraftDocInfo();
                //1080710 David 1071180 發布改為POSTBACK處理
                //PostBulletin();
                //Page_BlockSubmit = false;
                //取得工作站
                if (queryState())
                {
                    GetPastFileInfo();
                    Page_BlockSubmit = false;
                    jf_ToolBarSubmit("btSave");
                }
                else
                    Page_BlockSubmit = true;
				
				//1131205 Zen 屏東序801 修正取無閒置工作站時未顯示對應提示訊息之問題，避免顯示訊息後無法再次發布
                IsServerHandling = false;
            }
            //* 1060512  Cloud  1050087     升級二代
            //jf_ToolBarSubmit();
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //* 1060512  Cloud  1050087     升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            // 1050204	Kevin_C	1041040		設定預設選項 -S
            if (jf_ConfirmClean(false))
            {
                document.all[document.all.H_rbBoardSide.value].checked = true;
                document.all[document.all.H_rbAllowType.value].checked = true;
                jf_CheckInSideOutSide();
            }
            // 1050204	Kevin_C	1041040		設定預設選項 -E
            //* 1060512  Cloud  1050087     升級二代
            //document.all["txDocNo"].focus();
            $('txDocNo').focus();
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//1080710 David 1071180 發布公告行為改於Server上執行，紀錄發布所需資訊
function GetPastFileInfo()
{
    var ret = TB1.TBT150.GetDocFilesInfo(encodeURI(document.all["SsoArtifact"].value), encodeURI(document.all["txDocNo"].value));
    var HasDI = false;
    var objDoc = ret.value.Documents;

    //1121201 Zen 1111264 修正因變數語法不嚴謹導致發布失敗之問題
    let sPrintXSLPathName = '';

    //選擇發佈本份文稿件才紀錄DI-非發布批示文面
    //1090422 Zen 1090245 調整"以批示文面方式發佈"選項UI為RadioButton
    //if (objDoc && objDoc.length > 0 && (document.all.cbDocInfo && document.all.cbDocInfo.checked == true))
    if (objDoc && objDoc.length > 0 && (document.all.cbDocInfo && document.all.cbDocInfo.checked == true || document.all.rbPateInstructed && document.all.rbPateInstructed.checked == true))
    {
        //取得xsl檔全徑名
        var sDocName = objDoc[document.all["dlDoc"].value].DocType;
        for (var i = 0; i < ret.value.XslMaps.length; i++)
        {
            if (ret.value.XslMaps[i].strDocCategory == sDocName)
            {

                sPrintXSLPathName = document.all["PrintXSLPath"].value + document.all.H_OrgNo.value + "\\" + ret.value.XslMaps[i].strMapXslName;
                break;
            }
        }
        //取得DI檔儲存路徑|DIXSL檔名|DI檔名|XML檔名
        document.all.H_DOCDIINFO.value += ret.value.DIServerPath + '|' + sPrintXSLPathName + '|' + objDoc[document.all["dlDoc"].value].DIFileName + '|' + objDoc[document.all["dlDoc"].value].DraftFileName;
    }
    //取得欲發布的附件資訊
    var arrFileInfo = fnGetAttFileInfoForUpload();
    if (arrFileInfo && arrFileInfo.length > 0)
    {
        for (var i = 0; i < arrFileInfo.length; i++)
        {
            //1120907 Zen 屏東縣序193 修正公告附件路徑組串異常之問題
            //document.all.H_ATTINFOLIST.value += _lockedPath + "\\" + document.all.H_OrgNo.value + "\\TB_" + document.all.txDocNo.value + "\\Attach\\" + arrFileInfo[i].FileName + '|';
            document.all.H_ATTINFOLIST.value += document.all['wsiworkpath'].value + "\\" + document.all.H_OrgNo.value + "\\TB_" + document.all.txDocNo.value + "\\Attach\\" + arrFileInfo[i].FileName + '|';
            document.all.H_ATTDETAILINFOLIST.value += arrFileInfo[i].FileName + ';' + arrFileInfo[i].FileDesc + ';' + arrFileInfo[i].FileSize + '|';
        }
    }
    //有發布來文時取得來文檔案相關資訊
    var IsNeedHandleFromFile = false;
    if (document.all.cbRcvFile)
    {
        if (document.all.cbRcvFile.checked && ret.value.ElecRcvFiles && ret.value.ElecRcvFiles.length > 0)
            IsNeedHandleFromFile = true;
        else if (document.all.cbRcvFile.checked && ret.value.ScanFileInfo && ret.value.ScanFileInfo.length > 0)
            IsNeedHandleFromFile = true;
        else if ((document.all.rbPasteRcvE.checked || document.all.cbRcvPateInstructed.checked) && ret.value.ElecRcvFiles && ret.value.ElecRcvFiles.length > 0)
            IsNeedHandleFromFile = true;
        else if ((document.all.rbPasteRcvE.checked || document.all.cbRcvPateInstructed.checked) && ret.value.ScanFileInfo && ret.value.ScanFileInfo.length > 0)
            IsNeedHandleFromFile = true;
    }
    if (IsNeedHandleFromFile && ret.value.ElecRcvFiles && ret.value.ElecRcvFiles.length > 0)
    {
        for (var i = 0; i < ret.value.ElecRcvFiles.length; i++)
        {
            //路徑;檔名;別稱;TYPE;檔案大小
            document.all.H_RCVFILEINFO.value += ret.value.AttachServerPath + ';' + ret.value.ElecRcvFiles[i].strFileName + ';';
            //修改預設附件描述 DI檔：來文DI檔；附件：來文附件檔；R.FDF：來文PDF檔
            //1.修改預設附件描述 附件：來文附件原始檔；R.FDF：來文本文及附件合併PDF檔
            //2.紀錄附件類型
            var AttachName = ret.value.ElecRcvFiles[i].strFileName;
            if (AttachName == "R.PDF")
            {

                document.all.H_RCVFILEINFO.value += "來文本文及附件合併PDF檔;2;";
            }
            else if (AttachName.substr(AttachName.lastIndexOf(".")).toUpperCase() == ".DI")
            {

                document.all.H_RCVFILEINFO.value += "來文DI檔;3;";
            }
            else
            {

                document.all.H_RCVFILEINFO.value += "來文附件原始檔;4;";
            }
            document.all.H_RCVFILEINFO.value += ret.value.ElecRcvFiles[i].strFileSize + "|";
        }
    }
    //紀錄來文影像檔資訊至發布物件
    if (ret.value.ScanFileInfo && IsNeedHandleFromFile)
    {
        if (ret.value.ScanFileInfo.length > 0)
        {
            //來文影像檔最後再加入，如此，可於TBI140中列於最後
            for (var i = 0; i < ret.value.ScanFileInfo.length; i++)
            {
                //1081203 David 修正發布紙本掃描影像資訊錯誤問題
                //document.all.H_RCVSCANFILEINFO.value += ret.value.AttachServerPath + ";" + ret.value.ScanFileInfo[i].AttachFileName + ";來文影像檔;" + ret.value.ScanFileInfo[i].AttachSize + ";4|";
                //路徑;檔名;別稱;TYPE;檔案大小
                document.all.H_RCVSCANFILEINFO.value += ret.value.AttachServerPath + ";" + ret.value.ScanFileInfo[i].AttachFileName + ";來文影像檔;4;" + ret.value.ScanFileInfo[i].AttachSize + "|";
            }
        }
    }
    document.all.H_SIGNTYPE.value = ret.value.SignType + "|" + ret.value.DocFileServerPath + "|" + ret.value.DocFileServerWebFileIo;
    //取得發布日期
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    if (hour < 10) { hour = "0" + hour; }
    if (min < 10) { min = "0" + min; }
    if (sec < 10) { sec = "0" + sec; }
    document.all.txPasteDate.value = document.all.txPasteDate.value + hour + min + sec
}

//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
        bRtnbool = true;
    else
        return bRtnbool;

    //0980916	David	0980456	(檔管局)使用簽與便簽發布公告時，跳出提示訊息--Start
    var IssueDocName = "";
    if (document.all.dlDoc.options.length > 0)
        IssueDocName = document.all.dlDoc.options[document.all.dlDoc.selectedIndex].text;
    if (!document.all.rbInside.checked && document.all["TB_ARCMODE"].value == "Y" && (IssueDocName.indexOf("(便簽)") != -1 || IssueDocName.indexOf("(簽)") != -1))
    {
        var bPost = window.confirm("此公告因文別不符，不提供轉入局內網，是否發布公告?");
        if (!bPost)
            bRtnbool = false;
    }
    //End
    //1031016 Eric	1030701	增加附件描述字數限制

    for (var i = 2; i <= document.all.dgAttach.rows.length; i++)
    {
        var FileDesc = "";
        //1031127	CloudD 快解
        //1130805 Zen 序169 刪除非末筆附件後再加入發布錯誤--begin
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
        FileDesc = document.all['dgAttach'].rows[i - 1].children[2].children[0].value
        if (FileDesc.length > 50)
        {
            alert("附件描述字數過長，不可超過50字");
            bRtnbool = false;
            return bRtnbool;
        }
        //1130805 Zen 序169 刪除非末筆附件後再加入發布錯誤--end
    }

    //1080122 Zen 內政部序1354 修正公告期限、刊登天數欄位未onblur直接發布後資料異常問題
    if (strFinalFocusId == 'txExpireDate')
        fnCalculateDays();
    else if (strFinalFocusId == 'txPasteDays')
        fnCalculateDate();

    return bRtnbool;
}


//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";
    var objFocus = null;

    if (jf_Trim(document.all.dlCategory.value) == "")
    {
        strErrMsg += "類別不可空白。\n";
        //* 1060512  Cloud  1050087     升級二代
        //objFocus = document.all.dlCategory;
        objFocus = $('dlCategory');
    }

    if (jf_Trim(document.all.txSubject.value) == "")
    {
        strErrMsg += "主旨欄位不可空白。\n";
        //* 1060512  Cloud  1050087     升級二代
        //objFocus = document.all.txSubject;
        objFocus = $('txSubject');
    }

    if (document.all.txPasteDate.value == "")
    {
        strErrMsg += "公告日期不可空白。\n";
        if (!objFocus)
            //* 1060512  Cloud  1050087     升級二代
            //objFocus = document.all.txPasteDate;
            objFocus = $('txPasteDate');
    }

    if (document.all.txExpireDate.value == "")
    {
        strErrMsg += "公告期限不可空白。\n";
        if (!objFocus)
            //* 1060512  Cloud  1050087     升級二代
            //objFocus = document.all.txExpireDate;
            objFocus = $('txExpireDate');
    }

    if (!jf_CheckCDATE(document.all.txPasteDate.value))
    {
        strErrMsg += "公告日期錯誤。\n";
        if (!objFocus)
            //* 1060512  Cloud  1050087     升級二代
            //objFocus = document.all.txPasteDate;
            objFocus = $('txPasteDate');
    }
    if (!jf_CheckCDATE(document.all.txExpireDate.value))
    {
        strErrMsg += "公告期限錯誤。\n";
        if (!objFocus)
            //* 1060512  Cloud  1050087     升級二代
            //objFocus = document.all.txExpireDate;
            objFocus = $('txExpireDate');
    }

    //1010420 David 1010008 新增投信投顧客製化檢核
    if (document.all.H_txSITCA.value == "Y" && document.all.rbInside.checked == false)
    {
        if (jf_Trim(document.all.txSitcaIssueType.value) == "")
        {
            strErrMsg += "受文對象不可空白。\n";
            if (!objFocus)
                //* 1060512  Cloud  1050087     升級二代
                //objFocus = document.all.txSitcaIssueType;
                objFocus = $('txSitcaIssueType');
        }
        else
        {
            var strCheck = "ABCDEF";
            var strChecked = "";
            var strSitcaIssueType = document.all.txSitcaIssueType.value;
            var iTargetLrngth = strSitcaIssueType.length;
            for (var iStr = 0; iStr < iTargetLrngth; iStr++)
            {
                var strTarget = strSitcaIssueType.substr(iStr, 1);
                if (strCheck.indexOf(strTarget) == -1)
                {
                    strErrMsg += "受文對象代碼輸入錯誤。\n";
                    if (!objFocus)
                        //* 1060512  Cloud  1050087     升級二代
                        //objFocus = document.all.txSitcaIssueType;
                        objFocus = $('txSitcaIssueType');
                    break;
                }
                else
                {
                    if (strChecked.indexOf(strTarget) != -1)
                    {
                        strErrMsg += "受文對象代碼不可重複。\n";
                        if (!objFocus)
                            //* 1060512  Cloud  1050087     升級二代
                            //objFocus = document.all.txSitcaIssueType;
                            objFocus = $('document.all.txSitcaIssueType');
                        break;
                    }
                    else
                        strChecked += strTarget;
                }
            }
        }

        if (document.all.cbSitcaRegulation.checked)
        {
            var iSitcaRegulation = 0;
            for (var iRows = 0; iRows < document.all.cblSitcaRegulation.rows.length; iRows++)
            {
                for (var iCells = 0; iCells < document.all.cblSitcaRegulation.rows[iRows].cells.length; iCells++)
                {
                    if (document.all.cblSitcaRegulation.rows[iRows].cells[iCells].childNodes[0].checked)
                        iSitcaRegulation++;
                }
            }
            if (iSitcaRegulation == 0)
            {
                strErrMsg += "法規函令選項至少勾選一個。\n";
                if (!objFocus)
                    //* 1060512  Cloud  1050087     升級二代
                    //objFocus = document.all.cbSitcaRegulation;
                    objFocus = $('document.all.cbSitcaRegulation');
            }
        }
    }

    if (document.all.rbBoth)
    {
        if (document.all.rbBoth.checked)
        {
            if (document.all.rbUnit.checked)
            {
                strErrMsg += "公布欄位置包含外部時，公告對象必須為全機關。\n";
                if (!objFocus)
                    //* 1060512  Cloud  1050087     升級二代
                    //objFocus = document.all.rbOrg;
                    objFocus = d$('rbOrg');
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
                    //* 1060512  Cloud  1050087     升級二代
                    //objFocus = document.all.txExpireDate;
                    objFocus = $('txExpireDate');
            }
        }
    }
    //1080131 Zen 內政部序1354 修正點選公告期限小日曆後發布未更新刊登天數之問題
    var bCalculateDate;
    var bCalculateDays;

    if (strFinalFocusId == 'txExpireDate')
    {
        bCalculateDays = fnCalculateDays();
        bCalculateDate = fnCalculateDate();
    }
    else
    {
        bCalculateDate = fnCalculateDate();
        bCalculateDays = fnCalculateDays();
    }

    //1080131 Zen 內政部序1354 修正點選公告期限小日曆後發布未更新刊登天數之問題
    //if (!fnCalculateDate() || !fnCalculateDays())
    if (!bCalculateDate || !bCalculateDays)
    {
        return false;
        strErrMsg += "。\n";
        if (!objFocus)
            //* 1060512  Cloud  1050087     升級二代
            //objFocus = document.all.rbOrg;
            objFocus = $('rbOrg');
    }

    if (strErrMsg != "")
    {
        objFocus.focus();
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
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
    //1020221	Cloud [1020084] 增加轉換機關代碼為名稱
    if (argResult.id == wsCalOrgInfo)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.Count > 0)
            {
                if (jf_Trim(argResult.value.OrgName[0]) != "")
                    document.all["txFromOrgName"].value = jf_Trim(argResult.value.OrgName[0]);
            }
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
    //1060524 Cloud 1050087 升級二代 子視窗回傳方式不同
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
        //* 1060512  Cloud  1050087     升級二代
        //document.all.txPasteDays.focus();
        $('txPasteDays').focus();
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["刊登天數必須為正整數。"])), "");
        return false;
    }

    document.all.txExpireDate.value = "";
    //0990726 David 0990071 多傳入機關代碼
    //var result = TBT150.CalculateDate(document.all.txPasteDate.value, strDays, document.all.txPasteDaysType.value);
    var result = TB1.TBT150.CalculateDate(document.all.txPasteDate.value, strDays, document.all.txPasteDaysType.value, document.all.H_OrgNo.value);
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
        //* 1060512  Cloud  1050087     升級二代
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
        //* 1060512  Cloud  1050087     升級二代
        //document.all.txExpireDate.focus();
        $('txExpireDate').focus();
        jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["公告期限"])), "");
        return false;
    }
    if (strEDate <= strSDate)
    {
        //* 1060512  Cloud  1050087     升級二代
        //document.all.txExpireDate.focus();
        $('txExpireDate').focus();
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公告期限必須超過公告日期。"])), "");
        return false;
    }

    document.all.txPasteDays.value = "";
    if (strEDate.indexOf("999") != -1)//若為永久公告, 則不再計算刊登天數
        return true;
    //0990726 David 0990071 多傳入機關代碼
    //var result = TBT150.CalculateDays(strSDate, strEDate, document.all.txPasteDaysType.value);
    var result = TB1.TBT150.CalculateDays(strSDate, strEDate, document.all.txPasteDaysType.value, document.all.H_OrgNo.value);

    if (result.value.bSuccess)
        document.all.txPasteDays.value = result.value.Rtn + "";
    else
    {
        alert(result.value.sErrMsg);
        return false;
    }
    return true;
}

var xDraftDoc = null;

function LoadDraftDocInfo()
{
    //取得稿件資訊
    if (document.all["txDraftUrl"].value == "")
    {
        alert("稿件網址錯誤");
        return;
    }
    xDraftDoc = new ActiveXObject("MSXML2.DOMDocument");
    xDraftDoc.async = false;
    xDraftDoc.resolveExternals = false;
    xDraftDoc.load(document.all["txDraftUrl"].value);
}
//1060519 Cloud 升級二代-調整附件上傳邏輯-調整為全域變數
var ret = null;
function PostBulletin()
{
    //要求系統將相關檔案存放在AP伺服器上，並回傳相關資料
    //10605019 Cloud 升級二代-調整附件上傳邏輯-調整為全域變數
    //var ret = TBT150.GetDocFilesInfo(document.all["SsoArtifact"].value, document.all["txDocNo"].value);
    //1070709 Zen 1070678 弱掃XSS修正
    //ret = TB1.TBT150.GetDocFilesInfo(document.all["SsoArtifact"].value, document.all["txDocNo"].value);
    ret = TB1.TBT150.GetDocFilesInfo(encodeURI(document.all["SsoArtifact"].value), encodeURI(document.all["txDocNo"].value));
    if (ret.value.m_bSuccess == false)
        alert("取得相關檔案與資料時發生錯誤：" + ret.value.m_strErrMsg);
    else
    {
        //10605019 Cloud 升級二代-調整附件上傳邏輯-有附件先將附件上傳，無附件將工作路徑下檔案搬到工作站-後續在判斷是要搬移WSI檔或是DI檔
        //document.all["exp"].style.display = "block";
        if (AllFiles.length > 0)
        {

            //先將不存在的附件移掉
            for (var i = 1; i < document.all.dgAttach.rows.length; i++)
            {
                var bIsFileExist = false;
                var strSrcFileName = document.all.dgAttach.rows[i].cells[1].childNodes[0].textContent;
                for (var iArrfile = 0; iArrfile < AllFiles.length; iArrfile++)
                {
                    if (AllFiles[iArrfile].name == strSrcFileName)
                    {
                        bIsFileExist = true;
                        break;
                    }
                }
                if (!bIsFileExist)
                    AllFiles.splice(iArrfile, 1);
            }
            try
            {
                var ioWS = new WebFileIO(document.all.txApWebFileio.value, document.all["SsoArtifact"].value);
                ioWS.upload(ret.value.AttachServerPath, AllFiles, UploadCallBack);
            }
            catch (e)
            {

            }
        }
        else
        {
            fnMoveAttToWork(ret.value);
        }
        //1060523 Cloud 1050087 -二代已不用-mark
        //document.all["exp"].style.display = "none";
    }
}
//10605019 Cloud 升級二代-調整附件上傳邏輯-有附件先將附件上傳無附件直接呼叫發布
function UploadCallBack(result)
{
    if (result.hasError)
    {
        alert("上傳附件至SERVER端失敗：" + result.ErrorMessage)
        Page_BlockSubmit = true;
    }
    else
    {
        IsServerHandling = true;
        fnMoveAttToWork(ret.value)
    }
}
//1060530 Cloud 1050087 升級二代 無用mark
/*function CreateAllFolder(argPath)
{
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if(argPath.lastIndexOf("\\") != argPath.length - 1)
        argPath += "\\";
    var idx = argPath.indexOf("\\");
    idx = argPath.indexOf("\\", idx + 1);
    while(idx != -1)
    {
        var subPath = argPath.substring(0, idx);
        if(fso.FolderExists(subPath) == false)
            fso.CreateFolder(subPath);
        idx = argPath.indexOf("\\", idx + 1);
    }
}*/

function AttachInfo()
{
    this.AttachFileName = "";
    this.AttachDesp = "";
    this.AttachSize = "";
    //0990625 David 0990024 增加紀錄附件類型
    this.AttachType = "";
}
//1060523 Cloud 1050087 升級二代，取得可用轉檔工作站-S
var _serverList = new ServerList();

var _lockedUrl = "";
var _lockedPath = "";
var _bUplading = false;

function ServerList()
{
    var _list = opener.SSO_CONFIG.getIsoConvertURLs();
    this.add = function (url)
    {
        _list.push(url);
    }
    this.get = function (idx)
    {
        return _list[idx];
    }
    this.suffle = function ()
    {
        var mem = [];
        mem.length = _list.length;
        return {
            pick: function ()
            {
                while (1)
                {
                    var idx = Math.floor(Math.random() * _list.length);
                    if (mem[idx])
                    {
                        var alltry = true;
                        for (var i = 0; i < mem.length; i++)
                        {
                            if (!mem[i])
                            {
                                alltry = false;
                                break;
                            }
                        }
                        if (alltry)
                            return null;
                        continue;
                    }
                    else
                    {
                        mem[idx] = true;
                        return _list[idx];
                    }
                }
            }
        }
    }
}

//1131205 Zen 屏東序801 修正取無閒置工作站時未顯示對應提示訊息之問題，調整宣告時機
let suffle;
function queryState()
{
	//1131205 Zen 屏東序801 修正取無閒置工作站時未顯示對應提示訊息之問題，調整宣告時機
	suffle = _serverList.suffle();
    return doQS();
}
function doQS()
{
	
	//1131205 Zen 屏東序801 修正取無閒置工作站時未顯示對應提示訊息之問題，調整宣告時機
    //var suffle = _serverList.suffle();
    try
    {
        var params = {};
        var url = suffle.pick();
        if (url)
        {
            _url = url;
            var t0 = new Date();
            //1080318	Joe		1080098		弱掃修正禁用WSDL--S

            // var r = jf_CallWS(url, "QueryState", false, params, true);
            //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--S
            // var params = new SOAPClientParameters();
            // var r = SOAPClient.invokeJSON(url, "QueryState", params ,false, null)
            var r = jf_CallWS(url, "QueryState", false, params, true);
            //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--E
            //1080318	Joe		1080098		弱掃修正禁用WSDL--E
            if (typeof r.value === "string" && r.value.length > 0)
            {
                var p = r.value.indexOf("|");
                if (p > 0)
                {
                    var stat = r.value.substring(0, p);
                    if (stat == "Idle")
                    {
                        _lockedUrl = url;
                        _lockedPath = r.value.substring(p + 1);
                        //1080710 David 1071180 發布公告行為改於Server上執行，紀錄發布所需資訊
                        document.all.H_WORKSTURL.value = url;
                        document.all.H_WORKSTPATH.value = r.value.substring(p + 1);
                        return true;
                    }
                    else
                        doQS();
                }
                else if (r.value == "Busy")
                    doQS();
                else
                    alert("回傳格式不正確:'" + r + "'");
            }
            else
            {
                if (r.Err != undefined)
                {
                    alert("轉檔工作站[" + _url.split('/')[2] + "]目前無法正常工作，請連絡公文系統駐點人員或公文管理員處理。\n異常訊息：" + r.Err.ErrMsg);	//2016.11.25	Leslie	修正異常訊息
                }
                else
                    //* 1070403	Cloud	Cloud	--			調整轉檔工作站訊息
                    //alert("呼叫QueryState成功但無返回資料!");
                    alert("所有轉檔工作站均忙碌中，請稍候數分鐘再重新開啟程式發布。");
                return false;
            }
        }
        else
        {
            //* 1070403	Cloud	Cloud	--			調整轉檔工作站訊息
            //alert("所有附件轉檔工作站均忙碌中，請稍候數分鐘再開啟附件管理視窗儲存，以重新轉出。");
            alert("所有轉檔工作站均忙碌中，請稍候數分鐘再重新開啟程式發布。");
            return false;
        }
    }
    catch (e)
    {
        alert(e.message + " - " + e.sourceURL + ":" + e.line);
        return false;
    }
}
function unlockServer()
{
    //* 1070502	Cloud	--			修改TB-為TB_
    //var subdir = "TB-" + document.all.txDocNo.value;
    var subdir = "TB_" + document.all.txDocNo.value;
    var ArrayPaTh = [];
    ArrayPaTh[0] = subdir;
    //1080318	Joe		1080098		弱掃修正禁用WSDL--S
    //var r = jf_CallW(_lockedUrl, "SetQueryStateIdle", false, ArrayPaTh, true);

    //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--S
    // var params = new SOAPClientParameters();
    // params.add('ProcessID', subdir);
    // var r = SOAPClient.invokeJSON(_lockedUrl, "SetQueryStateIdle", params ,false, null)
    var r = jf_CallW(_lockedUrl, "SetQueryStateIdle", false, ArrayPaTh, true);
    //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--E
    //1080318	Joe		1080098		弱掃修正禁用WSDL--E
    _lockedUrl = _lockedPath = "";
}
//1060523 Cloud 1050087 提供函式取得可用轉檔工作站-e
//轉換檔案並張貼至公佈欄-修改幅度過大 直接mark改寫
//function TranFileAndPostBulletin(RtnBulletin)
//{
//	/*
//		if (!RtnBulletin.Documents)
//		{
//			alert("無任何檔案可上傳至公布欄。");
//			return;
//		}
//	*/
//	var iMainDiIdx = document.all["dlDoc"].value;
//	var objDoc = RtnBulletin.Documents;
//	var serviceURL = RtnBulletin.ServiceURL;
//	var serverDI = RtnBulletin.DIServerPath;
//	var serverAtt = RtnBulletin.AttachServerPath;
//	var localPathForDI = "C:\\temp\\TB\\" + document.all["txDocNo"].value + "\\DI\\";
//	var localPathForAtt = "C:\\temp\\TB\\" + document.all["txDocNo"].value + "\\Att\\";
//	var localPathForFromAtt = "C:\\temp\\TB\\" + document.all["txDocNo"].value + "\\FromAtt\\";

//	var IsNeedHandleFromFile = false;
//	if (document.all.cbRcvFile)
//	{
//		if (document.all.cbRcvFile.checked && RtnBulletin.ElecRcvFiles && RtnBulletin.ElecRcvFiles.length > 0)
//			IsNeedHandleFromFile = true;
//			// 1020618	Cloud	[1020430]	修改來文掃描檔，可由畫面含來文電子檔CheckBox控制發佈時是否一併發佈
//		else if (document.all.cbRcvFile.checked && RtnBulletin.ScanFileInfo && RtnBulletin.ScanFileInfo.length > 0)
//			IsNeedHandleFromFile = true;
//			// 1040609  CLOUD  [1040278]     增加發布方式按鈕連動發佈模式選擇直接轉貼來文以及張貼批示文面及來文電子檔時發布來文檔案
//		else if ((document.all.rbPasteRcvE.checked || document.all.cbRcvPateInstructed.checked) && RtnBulletin.ElecRcvFiles && RtnBulletin.ElecRcvFiles.length > 0)
//			IsNeedHandleFromFile = true;
//		else if ((document.all.rbPasteRcvE.checked || document.all.cbRcvPateInstructed.checked) && RtnBulletin.ScanFileInfo && RtnBulletin.ScanFileInfo.length > 0)
//			IsNeedHandleFromFile = true;


//	}

//	var HasDI = false;
//	if (objDoc && objDoc.length > 0)
//		HasDI = true;

//	//建立工作暫存區
//	var fso = new ActiveXObject("Scripting.FileSystemObject");
//	CreateAllFolder(localPathForDI);	//for DI檔
//	CreateAllFolder(localPathForAtt);	//for 附件檔
//	CreateAllFolder(localPathForFromAtt);	//for 來文電子檔

//	var arrFileInfo = fnGetAttFileInfoForUpload();//取得欲發布的附件資訊
//	//下載檔案至Client端
//	try
//	{
//		//下載附件檔
//		if (arrFileInfo && arrFileInfo.length > 0)
//		{

//			var soapAttach = new ActiveXObject("WSWrapper.WebFileIO");
//			//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//			if (document.all.II_USE_SSL != null)
//			{
//				if (document.all.II_USE_SSL.value == "Y")
//					serviceURL = serviceURL.replace("http://", "https://");
//			}

//			soapAttach.Init(serviceURL);
//			var bIsThereFileInServer = false
//			for (var j = 0; j < arrFileInfo.length; j++)
//			{
//				if (arrFileInfo[j].ComeFrom == "Server")
//				{
//					soapAttach.AddFile(serverAtt, arrFileInfo[j].FileName);
//					bIsThereFileInServer = true;
//				}
//			}
//			if (bIsThereFileInServer)
//			{
//				//0980916	David	0980455	使用WebFileIO時，應傳入Artifact
//				//soapAttach.Download("", false, localPathForAtt);
//				soapAttach.Download(document.all["SsoArtifact"].value, false, localPathForAtt);
//				if (soapAttach.hasError)
//				{
//					alert('附件檔案下載失敗，錯誤訊息為：' + soapAttach.ErrorMessage + '請稍後再試！');
//					return;
//				}
//			}
//			soapAttach = null;
//		}
//		//下載DI檔
//		// 1040609  CLOUD  [1040278]     增加發布方式按鈕連動，及發布時判斷所選發布方式
//		//if(HasDI)
//		if (HasDI && (document.all.cbDocInfo && document.all.cbDocInfo.checked == true))//選擇發佈本份文稿件才下載DI
//		{
//			var doc = objDoc[iMainDiIdx];
//			if ((doc.DIFileName && doc.DIFileName != "") || (doc.DraftFileName && doc.DraftFileName != ""))
//			{
//				var soap = new ActiveXObject("WSWrapper.WebFileIO");
//				//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//				if (document.all.II_USE_SSL != null)
//				{
//					if (document.all.II_USE_SSL.value == "Y")
//						serviceURL = serviceURL.replace("http://", "https://");
//				}

//				soap.Init(serviceURL);
//				if (doc.DIFileName && doc.DIFileName != "")
//					soap.AddFile(serverDI, doc.DIFileName);
//				if (doc.DraftFileName && doc.DraftFileName != "")
//					soap.AddFile(serverDI, doc.DraftFileName);

//				//0980916	David	0980455	使用WebFileIO時，應傳入Artifact
//				//soap.Download("", false, localPathForDI);
//				soap.Download(document.all["SsoArtifact"].value, false, localPathForDI);
//				if (soap.hasError)
//				{
//					alert('DI檔案下載失敗，錯誤訊息為：' + soap.ErrorMessage + '請稍後再試！');
//					return;
//				}
//				soap = null;
//			}
//		}
//		//下載來文電子檔
//		//1020618	Cloud	[1020430]	修改來文掃描檔，可由畫面含來文電子檔CheckBox控制發佈時是否一併發佈
//		//if(IsNeedHandleFromFile)
//		if (IsNeedHandleFromFile && RtnBulletin.ElecRcvFiles && RtnBulletin.ElecRcvFiles.length > 0)
//		{
//			var soapFromAttach = new ActiveXObject("WSWrapper.WebFileIO");
//			//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//			//soapFromAttach.Init(RtnBulletin.ElecRcvFiles[0].strWebFileIO);
//			var serviceURL = RtnBulletin.ElecRcvFiles[0].strWebFileIO;
//			if (document.all.II_USE_SSL != null)
//			{
//				if (document.all.II_USE_SSL.value == "Y")
//					serviceURL = serviceURL.replace("http://", "https://");
//			}
//			soapFromAttach.Init(serviceURL);

//			for (var i = 0; i < RtnBulletin.ElecRcvFiles.length; i++)
//				soapFromAttach.AddFile(RtnBulletin.ElecRcvFiles[i].strFolderPath, RtnBulletin.ElecRcvFiles[i].strFileName);
//			//0980916	David	0980455	使用WebFileIO時，應傳入Artifact
//			//soapFromAttach.Download("", false, localPathForFromAtt);
//			soapFromAttach.Download(document.all["SsoArtifact"].value, false, localPathForFromAtt);

//			if (soapFromAttach.hasError)
//			{
//				alert('來文電子檔下載失敗，錯誤訊息為：' + soapFromAttach.ErrorMessage + '請稍後再試！');
//				return;
//			}
//			//查出檔案大小
//			for (var i = 0; i < RtnBulletin.ElecRcvFiles.length; i++)
//			{
//				if (fso.FileExists(localPathForFromAtt + RtnBulletin.ElecRcvFiles[i].strFileName) == false)
//					continue;
//				var f = fso.GetFile(localPathForFromAtt + RtnBulletin.ElecRcvFiles[i].strFileName);
//				RtnBulletin.ElecRcvFiles[i].strFileSize = parseInt(f.size / 1024);
//			}
//			soapFromAttach = null;
//		}
//		//下載來文影像檔
//		//1020618	Cloud	[1020430]	修改來文掃描檔，可由畫面含來文電子檔CheckBox控制發佈時是否一併發佈
//		//if(RtnBulletin.ScanFileInfo)
//		if (RtnBulletin.ScanFileInfo && IsNeedHandleFromFile)
//		{
//			if (RtnBulletin.ScanFileInfo.length > 0)
//			{
//				var soapFromImage = new ActiveXObject("WSWrapper.WebFileIO");
//				//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//				//soapFromImage.Init(RtnBulletin.ServiceURL);
//				var serviceURL = RtnBulletin.ServiceURL;
//				if (document.all.II_USE_SSL != null)
//				{
//					if (document.all.II_USE_SSL.value == "Y")
//						serviceURL = serviceURL.replace("http://", "https://");
//				}
//				soapFromImage.Init(serviceURL);

//				for (var i = 0; i < RtnBulletin.ScanFileInfo.length; i++)
//					soapFromImage.AddFile(RtnBulletin.AttachServerPath, RtnBulletin.ScanFileInfo[i].AttachFileName);

//				//0980916	David	0980455	使用WebFileIO時，應傳入Artifact
//				//soapFromImage.Download("", false, localPathForFromAtt);
//				soapFromImage.Download(document.all["SsoArtifact"].value, false, localPathForFromAtt);

//				if (soapFromImage.hasError)
//				{
//					alert('來文影像檔下載失敗，錯誤訊息為：' + soapFromImage.ErrorMessage + '請稍後再試！');
//					return;
//				}
//				soapFromImage = null;
//			}
//		}
//	}
//	catch (e)
//	{
//		var ErrorMessage = e.message;
//		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
//		//alert('檔案下載失敗，錯誤訊息為：'+ErrorMessage+'請稍後再試！');
//		alert("連接伺服器" + serviceURL + "檔案下載失敗，錯誤訊息為：" + ErrorMessage + "請稍後再試！");
//		return;
//	}

//	//DI檔名
//	var sDIFileName = "";
//	//DI全徑名
//	var sDIPathName = "";
//	//Xml檔名
//	var sXmlFileName = "";
//	//Xml全徑名
//	var sXmlPathName = "";
//	//本文PDF檔名
//	var sPDFFileName = "";
//	//本文PDF全徑名
//	var sPDFPathName = "";
//	//xsl檔全徑名
//	var sPrintXSLPathName = "";

//	var exp = document.all["exp"];

//	//1040609   Cloud   [1040278] 配合增加發佈模式，發佈來文批示頁面及來文電子檔行為同勾選已批示文面發佈改以參數判斷是否勾選以批示文面發佈
//	var bbPateInstructed = false;
//	if (document.all.cbPateInstructed.checked || document.all.cbRcvPateInstructed.checked)
//		bbPateInstructed = true;


//	//if(HasDI)
//	//{
//	//1040609   Cloud   [1040278] 配合增加發佈模式，發佈來文批示頁面及來文電子檔行為同勾選已批示文面發佈改以參數判斷是否勾選以批示文面發佈
//	//if(!document.all.cbPateInstructed.checked)
//	if (!bbPateInstructed)
//	{
//		//1040609   Cloud   [1040278] 增加判斷有勾選發布本份稿件才下載di
//		//if(HasDI)
//		if (HasDI && (document.all.cbDocInfo && document.all.cbDocInfo.checked == true))//選擇發佈本份文稿件才下載DI
//		{
//			//取得DI檔名和Xml檔名
//			sDIFileName = objDoc[iMainDiIdx].DIFileName;
//			sDIPathName = localPathForDI + sDIFileName;
//			sXmlFileName = objDoc[iMainDiIdx].DraftFileName;
//			sXmlPathName = localPathForDI + sXmlFileName;
//			//取得xsl檔全徑名
//			//1010112 David 1010023 取得正確的文別轉PDF檔
//			//var sDocName = objDoc[iMainDiIdx].DocName;
//			var sDocName = objDoc[iMainDiIdx].DocType;
//			for (var i = 0; i < RtnBulletin.XslMaps.length; i++)
//			{
//				if (RtnBulletin.XslMaps[i].strDocCategory == sDocName)
//				{
//					sPrintXSLPathName = document.all["PrintXSLPath"].value + RtnBulletin.XslMaps[i].strMapXslName;
//					break;
//				}
//			}
//			//於Client端將DI檔轉成本文PDF檔
//			try
//			{
//				var sReceiverName = "";
//				var sAttPDFPathName = "";
//				var bKeepSecret = false;	//行文單位保密
//				var bStamp = false;		//是否加蓋正副抄本章
//				var bSeal = false;		//騎縫章
//				var bPageNo = true;		//頁碼
//				var bBarcode = false;		//條碼
//				var sDocNo = document.all["txDocNo"].value;
//				exp.OrgNo = document.all.H_OrgNo.value;
//				exp.PrintXSLFileName = sPrintXSLPathName;
//				exp.DocName = sDocName + "（稿一）";

//				//檢查相關檔案是否存在, 若不存在, 則略過
//				if (fso.FileExists(sDIPathName) && sPrintXSLPathName != "")
//				{	//0980615	David	0980278	更改轉出之檔名，以判斷是否為批示文面發佈(否：A文號.pdf、是：文號.pdf)
//					sPDFFileName = "A" + sDIFileName.substring(0, sDIFileName.indexOf(".")) + ".pdf";
//					sPDFPathName = localPathForDI + sPDFFileName
//					var ret = exp.ConvertDIFile(sXmlPathName, sPDFPathName, sReceiverName, sAttPDFPathName, bKeepSecret, bStamp, bSeal, bPageNo, bBarcode, sDocNo);
//					if (ret != "")
//					{
//						alert("將DI檔轉為PDF檔時失敗：" + ret);
//						return;
//					}
//				}
//				else
//				{
//					//沒有DI檔或不需轉PDF
//				}
//			}
//			catch (e)
//			{
//				var str = "將DI檔轉為PDF檔時發生錯誤：";
//				if (exp.ProcResult)
//					str += exp.ProcResult + " ";
//				str += e.message;
//				alert(str);
//				return;
//			}
//		}
//	}
//	else//MATTE 0960625 000945 --START--
//	{
//		arWSParam = new Array(2);
//		arWSParam[0] = document.all["txDocNo"].value;
//		arWSParam[1] = removeSlash(RtnBulletin.WorkLocation);
//		//增加機關代碼
//		arWSParam[2] = document.all["H_OrgNo"].value;
//		var inTBWS = jf_Trim(document.all.txInsideTBWS.value);
//		//1051013   Cloud   1050087 修改呼叫的ws位置
//		inTBWS = document.all.txInsideTBWS.value.replace("TB_A", "TB_AO");
//		callObj = jf_CallWS(inTBWS, "CreateWsiXml", false, arWSParam);
//		//檢查執行是否成功
//		if (callObj.error)
//		{
//			alert("產生wsi檔時失敗：" + callObj.errorDetail.string);
//			//0980813	David	0980309	發生錯誤時應return，畢免發布錯誤的公告資訊
//			return;
//		}
//		else
//		{
//			if (callObj.value.m_bSuccess == false)
//			{
//				alert("產生wsi檔時發生錯誤。" + callObj.value.m_strErrMsg);
//				//0980813	David	0980309	發生錯誤時應return，畢免發布錯誤的公告資訊
//				return;
//			}
//			else
//			{
//				var DLWsi = new ActiveXObject("WSWrapper.WebFileIO");
//				var DLWsiPath = document.all["wsiworkpath"].value;
//				var localPathForWsi = document.all["wsiworkpath"].value;
//				var DLWsiName = document.all["txDocNo"].value + ".wsi";
//				var DLWsiName2 = document.all["txDocNo"].value + ".xml";
//				var DLRsiName = document.all["txDocNo"].value + ".rsi";
//				var strArtifact = document.all["SsoArtifact"].value;

//				//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//				if (document.all.II_USE_SSL != null)
//				{
//					if (document.all.II_USE_SSL.value == "Y")
//						serviceURL = serviceURL.replace("http://", "https://");
//				}
//				//1040716 Gabby[1040324]增加WebFileIO錯誤訊息處理
//				try
//				{
//					//1051012	Cloud	修改呼叫的ws參數
//					//DLWsi.Init(serviceURL);
//					DLWsi.Init(RtnBulletin.ServiceURL);

//					DLWsi.AddFile(DLWsiPath, DLWsiName);

//					//0980916	David	0980455	使用WebFileIO時，應傳入Artifact
//					//DLWsi.Download("", false, localPathForWsi);
//					DLWsi.Download(document.all["SsoArtifact"].value, false, localPathForWsi);
//					//1040716 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
//					//if (DLWsi.hasError)
//					//{
//					//	alert('wsi下載失敗，錯誤訊息為：' + DLWsi.ErrorMessage + '請稍後再試！');
//					//	return;
//					//}
//					//1040716 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
//					DLWsi = null;

//					//1051013	Cloud	1050087 自行下載所需公文稿件-s
//					DLWsi = new ActiveXObject("WSWrapper.WebFileIO");
//					DLWsi.Init(callObj.value.m_strMsg.split('|')[1]);
//					DLWsi.AddFile(callObj.value.m_strMsg.split('|')[0], "");
//					DLWsi.Download(document.all["SsoArtifact"].value, false, localPathForWsi + "\\TB_" + document.all["txDocNo"].value + "\\");
//					DLWsi = null;
//					DLWsi = new ActiveXObject("WSWrapper.WebFileIO");
//					DLWsi.Init(callObj.value.m_strMsg.split('|')[1]);
//					DLWsi.AddFile(callObj.value.m_strMsg.split('|')[0] + "\\" + document.all["txDocNo"].value + "-00-99", "");
//					DLWsi.Download(document.all["SsoArtifact"].value, false, localPathForWsi + "\\TB_" + document.all["txDocNo"].value + "\\" + document.all["txDocNo"].value + "-00-99" + "\\");
//					//1051013	Cloud	1050087 自行下載所需公文稿件-e
//				}
//				catch (e)
//				{
//					var strErrMsg = e.message;
//					if (DLWsi.hasError)
//						strErrMsg += DLWsi.ErrorMessage;
//					alert("連接伺服器" + serviceURL + "下載檔案發生錯誤，錯誤訊息為:" + strErrMsg);
//					return;
//				}
//				//1040716 Gabby[1040324]增加WebFileIO錯誤訊息處理--END	

//				DeleteFile(localPathForWsi + DLRsiName);
//				//0980513 Albert 0980210 增加取得SFolderUtil的錯誤訊息(回傳值小於0)--start
//				if (document.all.sfu.genCopyPDF(strArtifact, localPathForWsi + DLWsiName, localPathForWsi + DLRsiName) < 0)
//				{
//					alert('產生批示文面本文PDF發生錯誤：\n\n' + document.all.sfu.ErrDescription);
//					return;
//				}
//				//0980513--end
//				sPDFFileName = document.all["txDocNo"].value + ".pdf";
//				sXmlFileName = document.all["txDocNo"].value + ".xml";

//			}
//		}
//	}//MATTE 0960625 000945 --END--
//	//}
//	//轉為WS可接受的附件資訊
//	var attachFileArr = new Array();
//	if (arrFileInfo && arrFileInfo.length > 0)
//	{
//		for (var i = 0; i < arrFileInfo.length; i++)
//		{
//			var info = new AttachInfo();
//			info.AttachFilePath = serverAtt;
//			info.AttachFileName = arrFileInfo[i].FileName;
//			info.AttachDesp = arrFileInfo[i].FileDesc;
//			info.AttachSize = arrFileInfo[i].FileSize;
//			//0990625 David 0990024 紀錄附件類型
//			info.AttachType = "1";
//			attachFileArr[attachFileArr.length] = info;
//		}
//	}
//	//附件PDF檔名
//	var sAttachPDFFileName = sDIFileName.substring(0, sDIFileName.indexOf(".")) + "_Att.pdf";
//	//附件PDF全徑名
//	var sAttachPDFPathName = localPathForAtt + sAttachPDFFileName;

//	//於Client端將附件檔轉成PDF檔
//	try
//	{
//		if (arrFileInfo.length > 0)
//		{
//			var attachPathNameArr = new Array(arrFileInfo.length);
//			for (var i = 0; i < arrFileInfo.length; i++)
//			{
//				if (arrFileInfo[i].ComeFrom == "Client")
//					attachPathNameArr[i] = arrFileInfo[i].FilePath;
//				else
//					attachPathNameArr[i] = localPathForAtt + arrFileInfo[i].FileName;
//			}

//			var bSeal = false;		//騎縫章
//			var bPageNo = true;		//頁碼
//			var bBarcode = false;		//條碼
//			var sDocNo = document.all["txDocNo"].value;
//			exp.OrgNo = document.all.H_OrgNo.value;
//			var ret = exp.ConvertAttachFiles(attachPathNameArr, sAttachPDFPathName, bSeal, bBarcode, sDocNo);
//			if (ret != "")
//			{
//				sAttachPDFFileName = "";
//				sAttachPDFPathName = "";
//				alert("將附件檔轉為PDF檔時失敗：" + ret + "。系統將略過此動作。");
//			}
//		}
//		else
//		{
//			//將檔名清掉, 以表示無附件
//			sAttachPDFFileName = "";
//			sAttachPDFPathName = "";
//		}
//	}
//	catch (e)
//	{
//		var str = "將附件檔轉為PDF檔時發生錯誤：";
//		if (exp.ProcResult)
//			str += exp.ProcResult + " ";
//		str += e.message;
//		alert(str);
//		return;
//	}

//	//將本文PDF與附件PDF上傳到AP伺服器
//	var soapUpload = new ActiveXObject("WSWrapper.WebFileIO");
//	try
//	{
//		var sSrvPath = RtnBulletin.WorkLocation;
//		//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//		//soapUpload.Init(RtnBulletin.ServiceURL);
//		var serviceURL = RtnBulletin.ServiceURL;
//		if (document.all.II_USE_SSL != null)
//		{
//			if (document.all.II_USE_SSL.value == "Y")
//				serviceURL = serviceURL.replace("http://", "https://");
//		}
//		soapUpload.Init(serviceURL);

//		//1020702 Kevin 1010781 因批示文面元件自行上傳PDF導致可能不需要叫用元件，新增檢核
//		var IsNeedUpLoad = false;

//		if (sXmlPathName != "" && fso.FileExists(sXmlPathName))
//		{
//			//1020702 Kevin 1010781 因批示文面元件自行上傳PDF導致可能不需要叫用元件，新增檢核
//			IsNeedUpLoad = true;
//			soapUpload.AddFile(sSrvPath, sXmlFileName, localPathForDI);		//本文Xml
//		}
//		if (sPDFPathName != "" && fso.FileExists(sPDFPathName))
//		{
//			//1020702 Kevin 1010781 因批示文面元件自行上傳PDF導致可能不需要叫用元件，新增檢核
//			IsNeedUpLoad = true;
//			soapUpload.AddFile(sSrvPath, sPDFFileName, localPathForDI);		//本文PDF
//		}
//		if (sAttachPDFPathName != "" && fso.FileExists(sAttachPDFPathName))
//		{
//			//1020702 Kevin 1010781 因批示文面元件自行上傳PDF導致可能不需要叫用元件，新增檢核
//			IsNeedUpLoad = true;
//			soapUpload.AddFile(sSrvPath, sAttachPDFFileName, localPathForAtt);	//附件PDF
//		}

//		//1020702 Kevin 1010781 因批示文面元件自行上傳PDF導致可能不需要叫用元件，新增檢核
//		if (IsNeedUpLoad)
//			soapUpload.Upload(document.all["SsoArtifact"].value, true);

//		//1020516 Kevin 1010781 新增錯誤處理
//		if (soapUpload.hasError)
//		{
//			//1020702 Kevin 1010781 調整錯誤訊息
//			//alert('上傳檔案至AP伺服器失敗，錯誤訊息為：' + soapUpload.ErrorMessage + '請稍後再試！');
//			alert('上傳本文PDF至AP伺服器失敗，錯誤訊息為：' + soapUpload.ErrorMessage + '請稍後再試！');
//			return;
//		}
//	}
//	catch (e)
//	{
//		//1020702 Kevin 1010781 調整錯誤訊息
//		//alert("上傳檔案至AP伺服器失敗，錯誤訊息為：" + soapUpload.ErrorMessage + e.message);
//		alert("上傳本文PDF至AP伺服器失敗，錯誤訊息為：" + soapUpload.ErrorMessage + e.message);
//		return;
//	}

//	//將來文電子檔上傳到AP伺服器
//	//1020618	Cloud	[1020430]	修改來文掃描影像可由checkbox(含來文電子檔)控制是否一併發佈
//	//if(IsNeedHandleFromFile)
//	if (IsNeedHandleFromFile && RtnBulletin.ElecRcvFiles && RtnBulletin.ElecRcvFiles.length > 0)
//	{
//		for (var i = 0; i < RtnBulletin.ElecRcvFiles.length; i++)
//		{
//			var info = new AttachInfo();
//			info.AttachFilePath = serverAtt;
//			info.AttachFileName = RtnBulletin.ElecRcvFiles[i].strFileName;
//			//0980612 David 0980278	修改預設附件描述 DI檔：來文DI檔；附件：來文附件檔；R.FDF：來文PDF檔
//			//0990625 David 0990024 1.修改預設附件描述 附件：來文附件原始檔；R.FDF：來文本文及附件合併PDF檔
//			//                      2.紀錄附件類型
//			var AttachName = RtnBulletin.ElecRcvFiles[i].strFileName;
//			if (AttachName == "R.PDF")
//			{
//				//info.AttachDesp		= "來文PDF檔";
//				info.AttachDesp = "來文本文及附件合併PDF檔";
//				info.AttachType = "2";
//			}
//			else if (AttachName.substr(AttachName.lastIndexOf(".")).toUpperCase() == ".DI")
//			{
//				info.AttachDesp = "來文DI檔";
//				info.AttachType = "3";
//			}
//			else
//			{
//				//info.AttachDesp		= "來文附件檔";
//				info.AttachDesp = "來文附件原始檔";
//				//info.AttachDesp		= "來文電子檔";
//				info.AttachType = "4";
//			}
//			info.AttachSize = RtnBulletin.ElecRcvFiles[i].strFileSize;
//			attachFileArr[attachFileArr.length] = info;
//		}
//		var soapUpload2 = new ActiveXObject("WSWrapper.WebFileIO");
//		try
//		{
//			var sSrvPath = serverAtt;
//			//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//			//soapUpload2.Init(RtnBulletin.ServiceURL);
//			var serviceURL = RtnBulletin.ServiceURL;
//			if (document.all.II_USE_SSL != null)
//			{
//				if (document.all.II_USE_SSL.value == "Y")
//					serviceURL = serviceURL.replace("http://", "https://");
//			}
//			soapUpload2.Init(serviceURL);

//			for (var i = 0; i < RtnBulletin.ElecRcvFiles.length; i++)
//				soapUpload2.AddFile(sSrvPath, RtnBulletin.ElecRcvFiles[i].strFileName, localPathForFromAtt);
//			soapUpload2.Upload(document.all["SsoArtifact"].value, true);

//			//1020516 Kevin 1010781 新增錯誤處理
//			if (soapUpload2.hasError)
//			{
//				//1020702 Kevin 1010781 調整錯誤訊息
//				//alert('上傳檔案至AP伺服器失敗，錯誤訊息為：' + soapUpload2.ErrorMessage + '請稍後再試！');
//				alert('上傳來文電子檔至AP伺服器失敗，錯誤訊息為：' + soapUpload2.ErrorMessage + '請稍後再試！');
//				return;
//			}
//		}
//		catch (e)
//		{
//			//1020702 Kevin 1010781 調整錯誤訊息
//			//alert("上傳檔案至AP伺服器失敗，錯誤訊息為：" + soapUpload2.ErrorMessage + e.message);
//			alert("上傳來文電子檔至AP伺服器失敗，錯誤訊息為：" + soapUpload2.ErrorMessage + e.message);
//			return;
//		}
//	}
//	//將來文影像檔上傳到Server上
//	// 1020618	Cloud	[1020430]		修改來文掃描檔，可由畫面含來文電子檔CheckBox控制發佈時是否一併發佈
//	//if(RtnBulletin.ScanFileInfo)
//	if (RtnBulletin.ScanFileInfo && IsNeedHandleFromFile)
//	{
//		if (RtnBulletin.ScanFileInfo.length > 0)
//		{
//			//來文影像檔最後再加入，如此，可於TBI140中列於最後
//			for (var i = 0; i < RtnBulletin.ScanFileInfo.length; i++)
//			{
//				var info = new AttachInfo();
//				info.AttachFilePath = serverAtt;
//				info.AttachFileName = RtnBulletin.ScanFileInfo[i].AttachFileName;
//				info.AttachDesp = "來文影像檔";//作為TBI140顯示時的依據
//				info.AttachSize = RtnBulletin.ScanFileInfo[i].AttachSize;
//				//0990625 David 0990024 紀錄附件類型
//				info.AttachType = "4";
//				attachFileArr[attachFileArr.length] = info;
//			}
//			var soapUpload3 = new ActiveXObject("WSWrapper.WebFileIO");
//			try
//			{
//				var sSrvPath = serverAtt;
//				//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//				//soapUpload3.Init(RtnBulletin.ServiceURL);
//				var serviceURL = RtnBulletin.ServiceURL;
//				if (document.all.II_USE_SSL != null)
//				{
//					if (document.all.II_USE_SSL.value == "Y")
//						serviceURL = serviceURL.replace("http://", "https://");
//				}
//				soapUpload3.Init(serviceURL);

//				for (var i = 0; i < RtnBulletin.ScanFileInfo.length; i++)
//					soapUpload3.AddFile(sSrvPath, RtnBulletin.ScanFileInfo[i].AttachFileName, localPathForFromAtt);
//				soapUpload3.Upload(document.all["SsoArtifact"].value, true);

//				//1020516 Kevin 1010781 新增錯誤處理
//				if (soapUpload3.hasError)
//				{
//					//1020702 Kevin 1010781 調整錯誤訊息
//					//alert('上傳檔案至AP伺服器失敗，錯誤訊息為：' + soapUpload3.ErrorMessage + '請稍後再試！');
//					alert('上傳來文影像檔至AP伺服器失敗，錯誤訊息為：' + soapUpload3.ErrorMessage + '請稍後再試！');
//					return;
//				}
//			}
//			catch (e)
//			{
//				alert("上傳來文影像檔至AP伺服器失敗，錯誤訊息為：" + soapUpload3.ErrorMessage + e.message);
//				return;
//			}
//		}
//	}

//	//將Client端的附件上傳到Server上
//	if (arrFileInfo && arrFileInfo.length > 0)
//	{
//		var bIsThereFileInClient = false;
//		var soapUpload3 = new ActiveXObject("WSWrapper.WebFileIO");
//		try
//		{
//			var sSrvPath = serverAtt;
//			//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//			//soapUpload3.Init(RtnBulletin.ServiceURL);
//			var serviceURL = RtnBulletin.ServiceURL;
//			if (document.all.II_USE_SSL != null)
//			{
//				if (document.all.II_USE_SSL.value == "Y")
//					serviceURL = serviceURL.replace("http://", "https://");
//			}
//			soapUpload3.Init(serviceURL);

//			for (var i = 0; i < arrFileInfo.length; i++)
//			{
//				if (arrFileInfo[i].ComeFrom == "Client")
//					soapUpload3.AddFile(sSrvPath, arrFileInfo[i].FileName, fnGetPath(arrFileInfo[i].FilePath));
//				else
//					soapUpload3.AddFile(sSrvPath, arrFileInfo[i].FileName, localPathForAtt);
//				bIsThereFileInClient = true;
//			}
//			if (bIsThereFileInClient)
//				soapUpload3.Upload(document.all["SsoArtifact"].value, true);

//			//1020516 Kevin 1010781 新增錯誤處理
//			if (soapUpload3.hasError)
//			{
//				//1020702 Kevin 1010781 調整錯誤訊息
//				//alert('上傳檔案至AP伺服器失敗，錯誤訊息為：' + soapUpload3.ErrorMessage + '請稍後再試！');
//				alert("上傳Client端的附件檔案至AP伺服器失敗，錯誤訊息為：" + soapUpload3.ErrorMessage + '請稍後再試！');
//				return;
//			}
//		}
//		catch (e)
//		{
//			alert("上傳Client端的附件檔案至AP伺服器失敗，錯誤訊息為：" + soapUpload3.ErrorMessage + e.message);
//			return;
//		}
//	}

//	//公布欄
//	var sBoardSide = "1";
//	if (document.all.rbInside)
//		if (document.all.rbInside.checked)
//			sBoardSide = "1";
//	if (document.all.rbBoth)
//		if (document.all.rbBoth.checked)
//			sBoardSide = "2";
//	if (document.all.rbOutside)
//		if (document.all.rbOutside.checked)
//			sBoardSide = "3";
//	//公告範圍
//	var sAllowRange = "2";
//	if (document.all.rbRange1)
//		if (document.all.rbRange1.checked)
//			sAllowRange = "0";
//	if (document.all.rbRange2)
//		if (document.all.rbRange2.checked)
//			sAllowRange = "1";
//	if (document.all.rbRange3)
//		if (document.all.rbRange3.checked)
//			sAllowRange = "2";
//	//Email通知
//	var sEmailType = "0";
//	/*if(document.all.rbMailNobody)
//		if(document.all.rbMailNobody.checked)
//			sEmailType = "0";
//	//if(document.all.rbMailUnit)
//	if(document.all.cbUnit && document.all.cbUnit.checked)
//		sEmailType = "1";
//	if(document.all.rbMailAll)
//		if(document.all.rbMailAll.checked)
//			sEmailType = "2";*/

//	//0970915 Leo 修改判定EMAIL_TYPE 邏輯
//	if (document.all.rbOther && document.all.rbOther.checked)
//	{
//		if (document.all.txEnableOD17.value == "Y")
//			sEmailType = "2";
//		else
//		{
//			if (document.all.cbUnit && document.all.cbUnit.checked)
//				sEmailType = "1";
//			else
//				sEmailType = "2";
//		}
//	}
//	else if (document.all["cbMail"] && document.all["cbMail"].checked)
//	{
//		if (document.all.cbUnit && document.all.cbUnit.checked)
//			sEmailType = "1";
//		else
//			sEmailType = "2";
//	}
//	//1020324	Cloud	1020013		修改當通知對象為機關、單位時，公告以參數ShowTbForSetRole以及是否勾選僅通知登記桌決定是否只有[僅通知登記桌功能]設定角色能看到
//	if (document.all.ShowTbForSetRole.value == "Y" && (document.all["cbUnit"] && document.all["cbUnit"].checked))
//		sEmailType = "1";

//	//1000322 David 1000278 紀錄是否為內部發文
//	//內部發文
//	var strDispatch = "0";

//	//公告對象
//	var arrReceiverInfo = new Array();
//	if (document.all.rbOrg)
//		if (document.all.rbOrg.checked)
//			;//Do Nothing
//	if (document.all.rbUnit)
//	{
//		if (document.all.rbUnit.checked)
//		{
//			arrReceiverInfo[0] = new ReceiverInfo();
//			arrReceiverInfo[0].OrgNo = document.all.H_OrgNo.value;
//			arrReceiverInfo[0].OrgType = "Unit";
//			arrReceiverInfo[0].Id = document.all.dlUnit.value;
//			arrReceiverInfo[0].Name = document.all.dlUnit.text;
//			arrReceiverInfo[0].Email = false;
//			if (document.all["cbMail"] && document.all["cbMail"].checked)
//				arrReceiverInfo[0].Email = true;

//			arrReceiverInfo[0].Attach = false;
//			if (document.all["cbAttach"] && document.all["cbAttach"].checked)
//				arrReceiverInfo[0].Attach = true;
//			//0970915 Leo 001674
//			arrReceiverInfo[0].MailType = "0";
//			if (arrReceiverInfo[0].Email = true)
//			{
//				if (document.all["cbUnit"] && document.all["cbUnit"].checked)
//					arrReceiverInfo[0].MailType = "1";
//				else
//					arrReceiverInfo[0].MailType = "2";
//			}
//		}
//	}
//	if (document.all.rbOther)
//	{
//		if (document.all.rbOther.checked)
//		{
//			document.all.btCleanAll.disabled = true;//iris 0970107
//			//1040820	Kevin_C	1040671	修正取不到最後一個公告對象的問題
//			//for(var i=2 ; i<document.all.dgtarget.rows.length ; i++)
//			for (var i = 2 ; i <= document.all.dgtarget.rows.length ; i++)
//			{
//				//公告對象型態
//				var sIdType = document.all["dgtarget__ctl" + i + "_txIdType"].value;
//				if (sIdType == "0") sIdType = "Account";
//				else if (sIdType == "1") sIdType = "Role";
//				else if (sIdType == "2") sIdType = "Unit";
//				else if (sIdType == "3") sIdType = "Group";
//				else if (sIdType == "4") sIdType = "Org";
//				else continue;

//				var sId1 = "", sId2 = "";
//				var sOrgNo = document.all["dgtarget__ctl" + i + "_txOrgNo"].value;
//				var sOrgCode = document.all["dgtarget__ctl" + i + "_txOrgCode"].value;
//				var sGroupCode = document.all["dgtarget__ctl" + i + "_txGroupCode"].value;
//				var sUnitCode = document.all["dgtarget__ctl" + i + "_txUnitCode"].value;
//				var sRoleCode = document.all["dgtarget__ctl" + i + "_txRoleCode"].value;
//				var sUserCode = document.all["dgtarget__ctl" + i + "_txUserCode"].value;
//				var sName = document.all["dgtarget__ctl" + i + "_lbtargetName"].value;
//				if (sName == "")
//					continue;

//				var idxArr = arrReceiverInfo.length;
//				arrReceiverInfo[idxArr] = new ReceiverInfo();
//				// 1030410	Cloud	[1000854]	支援ASP架構，進行程式修改
//				//arrReceiverInfo[idxArr].OrgNo	= document.all.H_OrgNo.value;
//				arrReceiverInfo[idxArr].OrgNo = sOrgNo;
//				arrReceiverInfo[idxArr].OrgType = sIdType;
//				if (sIdType == "Org")
//					arrReceiverInfo[idxArr].Id = sOrgCode;
//				else if (sIdType == "Group")
//					arrReceiverInfo[idxArr].Id = sGroupCode;
//				else if (sIdType == "Unit")
//					arrReceiverInfo[idxArr].Id = sUnitCode;
//				else if (sIdType == "Role")
//				{
//					arrReceiverInfo[idxArr].Id = sUnitCode;
//					arrReceiverInfo[idxArr].Id2 = sRoleCode;
//				}
//				else if (sIdType == "Account")
//				{
//					arrReceiverInfo[idxArr].Id = sUserCode;
//					//1020517 Kevin 1020257 帳號發布對象新增儲存單位
//					arrReceiverInfo[idxArr].Id2 = sUnitCode;
//				}
//				arrReceiverInfo[idxArr].Name = sName;
//				arrReceiverInfo[idxArr].Email = false;
//				arrReceiverInfo[idxArr].Attach = false;
//				arrReceiverInfo[idxArr].MailType = false;

//				if (document.all["dgtarget__ctl" + i + "_cbSelectEmail"] && document.all["dgtarget__ctl" + i + "_cbSelectEmail"].checked)
//				{
//					arrReceiverInfo[idxArr].Email = true;
//				}
//				if (document.all["dgtarget__ctl" + i + "_cbSelectAttach"] && document.all["dgtarget__ctl" + i + "_cbSelectAttach"].checked)
//					arrReceiverInfo[idxArr].Attach = true;

//				//0970915 Leo 001674
//				arrReceiverInfo[idxArr].MailType = "0";
//				if (arrReceiverInfo[idxArr].Email == true)
//				{
//					if (document.all["dgtarget__ctl" + i + "_cbSelectUnit"] && document.all["dgtarget__ctl" + i + "_cbSelectUnit"].checked)
//						arrReceiverInfo[idxArr].MailType = "1";
//					else
//						arrReceiverInfo[idxArr].MailType = "2";
//				}
//			}
//			//1000322 David 1000278 點選其他時，才判斷是否為內部發文
//			if (document.all.cbDispatch.checked)
//				strDispatch = "1";
//		}
//	}
//	var Email = false;
//	if (document.all["cbMail"])
//		if (document.all["cbMail"].checked)
//			Email = true;

//	var Attach = false;
//	if (document.all["cbAttach"])
//		if (document.all["cbAttach"].checked)
//			Attach = true;

//	//呼叫WebService要求公布欄系統發布公告
//	arWSParam = new Array(6);
//	argAllDataInfo = new AllDataInfo();
//	argAllDataInfo.DocNo = document.all["txDocNo"].value;	//arWSParam[1] = document.all["txDocNo"].value;
//	argAllDataInfo.BoardSide = sBoardSide;	//arWSParam[2] = sBoardSide;
//	argAllDataInfo.AllowRange = sAllowRange;	//arWSParam[3] = sAllowRange;
//	argAllDataInfo.EmailType = sEmailType;	//arWSParam[4] = sEmailType;
//	argAllDataInfo.CateGoryId = document.all.dlCategory.value;	//arWSParam[5] = document.all.dlCategory.value;
//	argAllDataInfo.Subject = document.all.txSubject.value;	//arWSParam[6] = document.all.txSubject.value;
//	//0980902	David	0980466	將公告發布時間紀錄為13碼--Start
//	//argAllDataInfo.PasteDate = document.all.txPasteDate.value;	//arWSParam[7] = document.all.txPasteDate.value;
//	var time = new Date();
//	var hour = time.getHours();
//	var min = time.getMinutes();
//	var sec = time.getSeconds();
//	if (hour < 10) { hour = "0" + hour; }
//	if (min < 10) { min = "0" + min; }
//	if (sec < 10) { sec = "0" + sec; }
//	argAllDataInfo.PasteDate = document.all.txPasteDate.value + hour + min + sec;
//	//End
//	argAllDataInfo.ExpireDate = document.all.txExpireDate.value;	//arWSParam[8] = document.all.txExpireDate.value;
//	argAllDataInfo.DiPathName = serverDI + sDIFileName;	//arWSParam[9] = serverDI + sDIFileName;
//	argAllDataInfo.DipdfPathName = RtnBulletin.WorkLocation + sPDFFileName;	//arWSParam[11] = RtnBulletin.WorkLocation + sPDFFileName;
//	if (sAttachPDFFileName == "")
//		argAllDataInfo.AttachPdfPathName = "";
//	else
//		argAllDataInfo.AttachPdfPathName = RtnBulletin.WorkLocation + sAttachPDFFileName;	//arWSParam[12] = RtnBulletin.WorkLocation + sAttachPDFFileName;
//	argAllDataInfo.UnitCode = document.all.dlUnit[document.all.dlUnit.selectedIndex].value;	//arWSParam[14] = document.all.dlUnit[document.all.dlUnit.selectedIndex].value;
//	argAllDataInfo.UnitName = document.all.dlUnit[document.all.dlUnit.selectedIndex].text;	//arWSParam[15] = document.all.dlUnit[document.all.dlUnit.selectedIndex].text;	
//	//1020221	Cloud [1020084]	新增轉換機關代碼為名稱
//	//1020227	Cloud [1020084]	增加判斷來文機關名稱為空時，不進行撈取
//	if (document.all["txFromOrgName"].value != "")
//		GetFromOrgName(document.all["txFromOrgName"].value)
//	argAllDataInfo.FromOrgName = document.all["txFromOrgName"].value;
//	//0991208 David 0990998 新增紀錄承辦人資訊
//	argAllDataInfo.FounderAccount = document.all["txFounderAccount"].value;
//	argAllDataInfo.FounderName = document.all["txFounderName"].value;
//	//1000322 David 1000278 紀錄是否為內部發文
//	argAllDataInfo.Dispatch = strDispatch;
//	// 1020221	Cloud	1020085		FOR修正單號1010533 衍伸BUG 增加儲存承辦單位承辦科別資訊
//	argAllDataInfo.FounderDpetNo = document.all["txFounderDeptNo"].value;
//	argAllDataInfo.FounderDpetName = document.all["txFounderDeptName"].value;
//	argAllDataInfo.FounderSectNo = document.all["txFounderSectNo"].value;
//	argAllDataInfo.FounderSectName = document.all["txFounderSectName"].value;

//	//1010420 David 1010008 新增紀錄投信投顧客製化資訊
//	if (document.all.H_txSITCA.value == "Y" && sBoardSide != "1")
//	{
//		argAllDataInfo.objSITCA = new ObjSITCA();
//		argAllDataInfo.objSITCA.bSITCA = true;
//		argAllDataInfo.objSITCA.DocNo = document.all["txDocNo"].value;
//		//受文對象欄位內容
//		argAllDataInfo.objSITCA.SitcaIssueType = document.all.txSitcaIssueType.value;
//		//法規函令選項代碼
//		var strSitcaRegulation = "";
//		if (document.all.cbSitcaRegulation.checked)
//		{
//			for (var iRows = 0 ; iRows < document.all.cblSitcaRegulation.rows.length ; iRows++)
//			{
//				for (var iCells = 0 ; iCells < document.all.cblSitcaRegulation.rows[iRows].cells.length ; iCells++)
//				{
//					if (document.all.cblSitcaRegulation.rows[iRows].cells[iCells].childNodes[0].checked)
//					{
//						strSitcaRegulation += GetSitcaRegulationValue(document.all.cblSitcaRegulation.rows[iRows].cells[iCells].innerText);
//					}
//				}
//			}
//		}
//		argAllDataInfo.objSITCA.SitcaRegulation = strSitcaRegulation;
//		//法令依據欄位內容
//		argAllDataInfo.objSITCA.SitcaBasis = document.all.txSitcaBasis.value;
//	}
//	arWSParam[0] = document.all["SsoArtifact"].value;
//	arWSParam[1] = attachFileArr;
//	arWSParam[2] = arrReceiverInfo;
//	arWSParam[3] = argAllDataInfo;
//	arWSParam[4] = Email;
//	arWSParam[5] = Attach;

//	var inTBWS = jf_Trim(document.all.txInsideTBWS.value);
//	//1000322 David 1000278 新增各別公告處理(內部發文)，改呼叫BeforePasteDocBulletin處理
//	//callObj = jf_CallWS(inTBWS, "PasteDocBulletin", false, arWSParam);
//	callObj = jf_CallWS(inTBWS, "BeforePasteDocBulletin", false, arWSParam);
//	//檢查執行是否成功
//	if (callObj.error)
//	{
//		alert("發布公告時失敗：" + callObj.errorDetail.string);
//	}
//	else
//	{
//		if (callObj.value.m_bSuccess == false)
//			alert("發布公告時發生錯誤：" + callObj.value.m_strErrMsg);
//		else
//			//1040323	Kevin_C	1040136		在發布成功的提示訊息後加上公告編號
//			//alert("發布成功。");
//			alert("發布成功，公告編號：" + callObj.value.m_strMsg);
//	}
//}
var webFileIoApToWork = new T2100FileIoService(document.all.txApWebFileio.value, document.all.WEBIOID.value, document.all["SsoArtifact"].value);
var WorkwebFileIo = "";
var bPostBulletin = false;
function fnMoveAttToWork(RtnBulletin)
{
    if (document.all.rbPasteRcvE.checked && AllFiles.length == 0 && document.all.dgAttach.rows.length == 1)//直接轉貼來文且沒有附件-直接發布
    {
        TranFileAndPostBulletin(RtnBulletin);
    }
    else
    {
        if (!queryState())
            return;
        try
        {
            WorkwebFileIo = _lockedUrl.substr(0, _lockedUrl.indexOf('ImgConvert')) + "\\WebFileIo\\T2100FileIOService.asmx";
            //* 1070502	Cloud	--			修改TB-為TB_
            //webFileIoApToWork.copy(RtnBulletin.AttachServerPath, "", _lockedPath + "\\TB-" + document.all.txDocNo.value + "\\", "",
            webFileIoApToWork.copy(RtnBulletin.AttachServerPath, "", _lockedPath + "\\TB_" + document.all.txDocNo.value + "\\", "",
                { toWebFileIOUrl: WorkwebFileIo, delSourse: false, overWrite: true, restore: false }).done(function (r)
                {
                    //bPostBulletin = true;
                    //搬完附件判斷是搬移WSI檔還是DI檔
                    //配合增加發佈模式，發佈來文批示頁面及來文電子檔行為同勾選已批示文面發佈改以參數判斷是否勾選以批示文面發佈
                    var HasDI = false;
                    var objDoc = RtnBulletin.Documents;
                    if (objDoc && objDoc.length > 0)
                        HasDI = true;
                    var bbPateInstructed = false;
                    //1090422 Zen 1090245 調整"以批示文面方式發佈"選項UI為RadioButton
                    //if (document.all.cbPateInstructed.checked || document.all.cbRcvPateInstructed.checked)
                    if (document.all.rbPateInstructed.checked || document.all.cbRcvPateInstructed.checked)
                        bbPateInstructed = true;

                    if (!bbPateInstructed)
                    {
                        if (HasDI && (document.all.cbDocInfo && document.all.cbDocInfo.checked == true))//選擇發佈本份文稿件將DI檔搬移至工作站
                        {
                            //1060726 Cloud 修正使用文號.xml檔
                            //webFileIoApToWork.copy(RtnBulletin.DIServerPath, objDoc[document.all["dlDoc"].value].DIFileName, _lockedPath + "\\TB-" + document.all.txDocNo.value + "\\", objDoc[document.all["dlDoc"].value].DIFileName,
                            //* 1070502	Cloud	--			修改TB-為TB_
                            //webFileIoApToWork.copy(RtnBulletin.DIServerPath, objDoc[document.all["dlDoc"].value].DraftFileName, _lockedPath + "\\TB-" + document.all.txDocNo.value + "\\", objDoc[document.all["dlDoc"].value].DraftFileName,
                            webFileIoApToWork.copy(RtnBulletin.DIServerPath, objDoc[document.all["dlDoc"].value].DraftFileName, _lockedPath + "\\TB_" + document.all.txDocNo.value + "\\", objDoc[document.all["dlDoc"].value].DraftFileName,
                                { toWebFileIOUrl: WorkwebFileIo, delSourse: false, overWrite: true, restore: false }).done(function (r)
                                {
                                    TranFileAndPostBulletin(RtnBulletin);
                                }
                                )
                                .fail(function (r)
                                {
                                    alert('將DI檔上傳至工作站失敗：' + r.errMsg);
                                    //1061205	Cloud	修正上傳附件轉檔工作站，異常問題、補上異常未unlock部分
                                    unlockServer();
                                });
                        }
                        else
                        {
                            TranFileAndPostBulletin(RtnBulletin);
                        }
                    }
                    else//產生WSI檔並搬移至工作站
                    {
                        //1080318	Joe		1080098		弱掃修正禁用WSDL--S
                        /*
                        var arWSParam = new Array(2);
                        arWSParam[0] = document.all["txDocNo"].value;
                        arWSParam[1] = removeSlash(RtnBulletin.WorkLocation);
                        //增加機關代碼
                        arWSParam[2] = document.all["H_OrgNo"].value;
                        var inTBWS = jf_Trim(document.all.txInsideTBWS.value);
                        callObj = jf_CallWS(inTBWS, "CreateWsiXml", false, arWSParam);
                        */
                        //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--S
                        // var params = new SOAPClientParameters();
                        // params.add('sessionID', jf_GetArtifact());
                        // params.add('argDocNo', document.all["txDocNo"].value);
                        // params.add('argWorkLocation', removeSlash(RtnBulletin.WorkLocation));
                        // var callObj = SOAPClient.invokeJSON(jf_Trim(document.all.txInsideTBWS.value), "CreateWsiXml", params ,false, null)
                        var arWSParam = new Array(2);
                        arWSParam[0] = document.all["txDocNo"].value;
                        arWSParam[1] = removeSlash(RtnBulletin.WorkLocation);
                        //增加機關代碼
                        arWSParam[2] = document.all["H_OrgNo"].value;
                        var inTBWS = jf_Trim(document.all.txInsideTBWS.value);
                        callObj = jf_CallWS(inTBWS, "CreateWsiXml", false, arWSParam);
                        //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--E
                        //1080318	Joe		1080098		弱掃修正禁用WSDL--E
                        //檢查執行是否成功
                        if (callObj.error)
                        {
                            alert("產生wsi檔時失敗：" + callObj.errorDetail.string);
                            //1061205	Cloud	修正上傳附件轉檔工作站，異常問題、補上異常未unlock部分
                            unlockServer();
                            return;
                        }
                        else
                        {
                            if (callObj.value.m_bSuccess == false)
                            {
                                alert("產生wsi檔時發生錯誤。" + callObj.value.m_strErrMsg);
                                //1061205	Cloud	修正上傳附件轉檔工作站，異常問題、補上異常未unlock部分
                                unlockServer();
                                return;
                            }
                            else
                            {
                                //* 1070502	Cloud	--			修改TB-為TB_
                                //webFileIoApToWork.copy(document.all["wsiworkpath"].value, document.all["txDocNo"].value + ".wsi", _lockedPath + "\\TB-" + document.all.txDocNo.value + "\\", document.all["txDocNo"].value + ".wsi",
                                webFileIoApToWork.copy(document.all["wsiworkpath"].value, document.all["txDocNo"].value + ".wsi", _lockedPath + "\\TB_" + document.all.txDocNo.value + "\\", document.all["txDocNo"].value + ".wsi",
                                    { toWebFileIOUrl: WorkwebFileIo, delSourse: false, overWrite: true, restore: false }).done(function (r)
                                    {

                                        var webFileIoFileToWork = new T2100FileIoService(callObj.value.m_strMsg.split('|')[1], document.all.WEBIOID.value, document.all["SsoArtifact"].value);
                                        //* 1061205	Cloud	--			修正上傳附件轉檔工作站，異常問題
                                        //webFileIoFileToWork.copy(callObj.value.m_strMsg.split('|')[0], "", "c:\\TEMP\\TB_" + document.all.txDocNo.value + "\\", "",
                                        //* 1070502	Cloud	--			修改TB-為TB_
                                        //webFileIoFileToWork.copy(callObj.value.m_strMsg.split('|')[0], "", "c:\\TEMP\\TB-" + document.all.txDocNo.value + "\\", "",
                                        //1080115	Joe		1080049		修正弱掃Hardcoded Absolute Path
                                        // webFileIoFileToWork.copy(callObj.value.m_strMsg.split('|')[0], "", "c:\\TEMP\\TB_" + document.all.txDocNo.value + "\\", "",
                                        webFileIoFileToWork.copy(callObj.value.m_strMsg.split('|')[0], "", document.all.H_webFileIoFileToWork.value + document.all.txDocNo.value + "\\", "",
                                            { toWebFileIOUrl: WorkwebFileIo, delSourse: false, overWrite: true, restore: false }).done(function (r)
                                            {

                                                webFileIoFileToWork.copy(callObj.value.m_strMsg.split('|')[0] + "\\" + document.all["txDocNo"].value + "-00-99", "",
                                                    //* 1061205	Cloud	--			修正上傳附件轉檔工作站，異常問題											
                                                    //"c:\\TEMP\\TB_" + document.all["txDocNo"].value + "\\" + document.all["txDocNo"].value + "-00-99" + "\\", "", {
                                                    //* 1070502	Cloud	--			修改TB-為TB_
                                                    //"c:\\TEMP\\TB-" + document.all["txDocNo"].value + "\\" + document.all["txDocNo"].value + "-00-99" + "\\", "", {
                                                    //1080115	Joe		1080049		修正弱掃Hardcoded Absolute Path
                                                    //"c:\\TEMP\\TB_" + document.all["txDocNo"].value + "\\" + document.all["txDocNo"].value + "-00-99" + "\\", "", {
                                                    document.all.H_webFileIoFileToWork.value + document.all["txDocNo"].value + "\\" + document.all["txDocNo"].value + "-00-99" + "\\", "", {
                                                    toWebFileIOUrl: WorkwebFileIo, delSourse: false, overWrite: true, restore: false
                                                })
                                                    .done(function (r)
                                                    {
                                                        TranFileAndPostBulletin(RtnBulletin);
                                                    }
                                                    )
                                                    .fail(function (r)
                                                    {
                                                        if (r.errMsg.indexOf("不存在。") == -1)
                                                        {
                                                            alert('將公文資夾00-99上傳至工作站失敗：' + r.errMsg);
                                                            unlockServer();
                                                        }
                                                        else
                                                            TranFileAndPostBulletin(RtnBulletin);
                                                    });
                                            }
                                            )
                                            .fail(function (r)
                                            {
                                                alert('將公文資夾上傳至工作站失敗：' + r.errMsg);
                                                //1061205	Cloud	修正上傳附件轉檔工作站，異常問題、補上異常未unlock部分
                                                unlockServer();
                                            });
                                    }
                                    )
                                    .fail(function (r)
                                    {
                                        alert('將批示文面工作檔上傳至工作站失敗：' + r.errMsg);
                                        unlockServer();
                                    });

                            }
                        }
                    }
                })
                .fail(function (r)
                {
                    alert('附件檔案上傳至工作站失敗：' + r.errMsg);
                    unlockServer();
                });
        }
        catch (e)
        {
            unlockServer();
        }
    }
}
function TranFileAndPostBulletin(RtnBulletin)//1060526 修改幅度過大複製出來改寫
{
    var iMainDiIdx = document.all["dlDoc"].value;
    var objDoc = RtnBulletin.Documents;
    var serviceURL = RtnBulletin.ServiceURL;
    var serverDI = RtnBulletin.DIServerPath;
    var serverAtt = RtnBulletin.AttachServerPath;
    var IsNeedHandleFromFile = false;
    /*var localPathForDI = "C:\\temp\\TB\\" + document.all["txDocNo"].value + "\\DI\\";
    var localPathForAtt = "C:\\temp\\TB\\" + document.all["txDocNo"].value + "\\Att\\";
    var localPathForFromAtt = "C:\\temp\\TB\\" + document.all["txDocNo"].value + "\\FromAtt\\";*/

    if (document.all.cbRcvFile)
    {
        if (document.all.cbRcvFile.checked && RtnBulletin.ElecRcvFiles && RtnBulletin.ElecRcvFiles.length > 0)
            IsNeedHandleFromFile = true;
        else if (document.all.cbRcvFile.checked && RtnBulletin.ScanFileInfo && RtnBulletin.ScanFileInfo.length > 0)
            IsNeedHandleFromFile = true;
        else if ((document.all.rbPasteRcvE.checked || document.all.cbRcvPateInstructed.checked) && RtnBulletin.ElecRcvFiles && RtnBulletin.ElecRcvFiles.length > 0)
            IsNeedHandleFromFile = true;
        else if ((document.all.rbPasteRcvE.checked || document.all.cbRcvPateInstructed.checked) && RtnBulletin.ScanFileInfo && RtnBulletin.ScanFileInfo.length > 0)
            IsNeedHandleFromFile = true;
    }

    var HasDI = false;
    if (objDoc && objDoc.length > 0)
        HasDI = true;

    var arrFileInfo = fnGetAttFileInfoForUpload();//取得欲發布的附件資訊-用於後續轉為ws可用資訊

    //DI檔名
    var sDIFileName = "";
    //DI全徑名
    var sDIPathName = "";
    //Xml檔名
    var sXmlFileName = "";
    //Xml全徑名
    var sXmlPathName = "";
    //本文PDF檔名
    var sPDFFileName = "";
    //本文PDF全徑名
    var sPDFPathName = "";
    //xsl檔全徑名
    var sPrintXSLPathName = "";

    //1040609   Cloud   [1040278] 配合增加發佈模式，發佈來文批示頁面及來文電子檔行為同勾選已批示文面發佈改以參數判斷是否勾選以批示文面發佈
    var bbPateInstructed = false;
    //1090422 Zen 1090245 調整"以批示文面方式發佈"選項UI為RadioButton
    //if (document.all.cbPateInstructed.checked || document.all.cbRcvPateInstructed.checked)
    if (document.all.rbPateInstructed.checked || document.all.cbRcvPateInstructed.checked)
        bbPateInstructed = true;

    var paramsConVerPdf = new Array(11);
    var arrAttFileName = new Array();
    paramsConVerPdf[2] = document.all.txApWebFileio.value;
    paramsConVerPdf[3] = RtnBulletin.WorkLocation;
    paramsConVerPdf[5] = false;
    paramsConVerPdf[6] = false;
    paramsConVerPdf[8] = document.all.H_OrgNo.value;
    paramsConVerPdf[9] = document.all.txDocNo.value;
    paramsConVerPdf[10] = document.all.SsoArtifact.value;


    if (!bbPateInstructed)
    {
        if (HasDI && (document.all.cbDocInfo && document.all.cbDocInfo.checked == true))//選擇發佈本份文稿件才紀錄DI
        {
            //取得DI檔名和Xml檔名
            sDIFileName = objDoc[iMainDiIdx].DIFileName;
            sXmlFileName = objDoc[iMainDiIdx].DraftFileName;
            //取得xsl檔全徑名
            var sDocName = objDoc[iMainDiIdx].DocType;
            for (var i = 0; i < RtnBulletin.XslMaps.length; i++)
            {
                if (RtnBulletin.XslMaps[i].strDocCategory == sDocName)
                {
                    //1071031  Cloud   1071100     修改公佈欄轉檔工作站支援ASP架構
                    //sPrintXSLPathName = document.all["PrintXSLPath"].value + RtnBulletin.XslMaps[i].strMapXslName;
                    sPrintXSLPathName = document.all["PrintXSLPath"].value + document.all.H_OrgNo.value + "\\" + RtnBulletin.XslMaps[i].strMapXslName;
                    break;
                }
            }
            //1060726 Cloud 修正使用文號.xml檔
            //paramsConVerPdf[0] = _lockedPath + "\\TB-" + document.all.txDocNo.value + "\\" + sDIFileName;
            //* 1070502	Cloud	--			修改TB-為TB_
            //paramsConVerPdf[0] = _lockedPath + "\\TB-" + document.all.txDocNo.value + "\\" + sXmlFileName;
            paramsConVerPdf[0] = _lockedPath + "\\TB_" + document.all.txDocNo.value + "\\" + sXmlFileName;
            paramsConVerPdf[4] = false;
            paramsConVerPdf[7] = sPrintXSLPathName;
            sPDFFileName = "A" + sDIFileName.substring(0, sDIFileName.indexOf(".")) + ".pdf";
        }
        else
        {
            paramsConVerPdf[0] = "";
            paramsConVerPdf[4] = false;
            paramsConVerPdf[7] = "";
        }
    }
    else//以批示文面發布-
    {
        //* 1070502	Cloud	--			修改TB-為TB_
        //paramsConVerPdf[0] = _lockedPath + "\\TB-" + document.all.txDocNo.value + "\\" + document.all["txDocNo"].value + ".wsi";
        paramsConVerPdf[0] = _lockedPath + "\\TB_" + document.all.txDocNo.value + "\\" + document.all["txDocNo"].value + ".wsi";
        paramsConVerPdf[4] = true;
        paramsConVerPdf[7] = "";
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection
        // sPDFFileName = document.all["txDocNo"].value + ".PDF";
        sPDFFileName = encodeURI(document.all["txDocNo"].value + ".PDF");
    }
    //轉為WS可接受的附件資訊
    var attachFileArr = new Array();
    if (arrFileInfo && arrFileInfo.length > 0)
    {
        for (var i = 0; i < arrFileInfo.length; i++)
        {
            var info = new AttachInfo();
            info.AttachFilePath = serverAtt;
            info.AttachFileName = arrFileInfo[i].FileName;
            info.AttachDesp = arrFileInfo[i].FileDesc;
            info.AttachSize = arrFileInfo[i].FileSize;
            info.AttachType = "1";
            attachFileArr[attachFileArr.length] = info;
            //記錄欲轉檔附件明細
            //* 1070502	Cloud	--			修改TB-為TB_
            //arrAttFileName.push(_lockedPath + "\\TB-" + document.all.txDocNo.value + "\\" + info.AttachFileName);
            arrAttFileName.push(_lockedPath + "\\TB_" + document.all.txDocNo.value + "\\" + info.AttachFileName);
        }
    }
    //附件PDF檔名

    var sAttachPDFFileName = sDIFileName.substring(0, sDIFileName.indexOf(".")) + "_Att.pdf";
    if (AllFiles.length == 0)//無附件則清空
        sAttachPDFFileName = "";

    paramsConVerPdf[1] = arrAttFileName;
    var bpast = false;
    if (document.all.rbPasteRcvE.checked && AllFiles.length == 0 && document.all.dgAttach.rows.length == 1)//直接轉貼來文且沒有附件-直接發布
    {
        bpast = true;
    }
    else
    {
        //1080318	Joe		1080098		弱掃修正禁用WSDL--S
        //var rtn = jf_CallW(_lockedUrl, "PDFConvert", false, paramsConVerPdf, true);
        //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--S
        // var params = new SOAPClientParameters();
        // params.add('DiFile', paramsConVerPdf[0]);
        // params.add('AttFiles', paramsConVerPdf[1]);
        // params.add('FileIOWS', paramsConVerPdf[2]);
        // params.add('UploadPath', paramsConVerPdf[3]);
        // params.add('PateInstructed', paramsConVerPdf[4]);
        // params.add('MergeFile', paramsConVerPdf[5]);
        // params.add('UploadResource', paramsConVerPdf[6]);
        // params.add('PrintXSL', paramsConVerPdf[7]);
        // params.add('OrgNo', paramsConVerPdf[8]);
        // params.add('DocNo', paramsConVerPdf[9]);
        // params.add('SAMLart', paramsConVerPdf[10]);
        // params.add('argurl', paramsConVerPdf[11]);
        // var rtn = SOAPClient.invokeJSON(_lockedUrl, "PDFConvert", params ,false, null)
        var rtn = jf_CallW(_lockedUrl, "PDFConvert", false, paramsConVerPdf, true);
        //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--E
        //1080318	Joe		1080098		弱掃修正禁用WSDL--E
        if (rtn.value.rtnErr && rtn.value.rtnErr.length == 0)
        {
            unlockServer();//轉完即可解鎖後續都是TB的工作了
            bpast = true;
        }
        else
        {
            alert("發布公告時發生錯誤-檔案轉換PDF發生異常：" + rtn.value.m_strMsg);
            unlockServer();
        }
    }
    if (bpast)
    {
        //紀錄來文電子檔資訊至發布物件
        if (IsNeedHandleFromFile && RtnBulletin.ElecRcvFiles && RtnBulletin.ElecRcvFiles.length > 0)
        {
            for (var i = 0; i < RtnBulletin.ElecRcvFiles.length; i++)
            {
                var info = new AttachInfo();
                info.AttachFilePath = serverAtt;
                info.AttachFileName = RtnBulletin.ElecRcvFiles[i].strFileName;
                //修改預設附件描述 DI檔：來文DI檔；附件：來文附件檔；R.FDF：來文PDF檔
                //1.修改預設附件描述 附件：來文附件原始檔；R.FDF：來文本文及附件合併PDF檔
                //2.紀錄附件類型
                var AttachName = RtnBulletin.ElecRcvFiles[i].strFileName;
                if (AttachName == "R.PDF")
                {
                    info.AttachDesp = "來文本文及附件合併PDF檔";
                    info.AttachType = "2";
                }
                else if (AttachName.substr(AttachName.lastIndexOf(".")).toUpperCase() == ".DI")
                {
                    info.AttachDesp = "來文DI檔";
                    info.AttachType = "3";
                }
                else
                {
                    info.AttachDesp = "來文附件原始檔";
                    info.AttachType = "4";
                }
                info.AttachSize = RtnBulletin.ElecRcvFiles[i].strFileSize;
                attachFileArr[attachFileArr.length] = info;
            }
        }
        //紀錄來文影像檔資訊至發布物件
        if (RtnBulletin.ScanFileInfo && IsNeedHandleFromFile)
        {
            if (RtnBulletin.ScanFileInfo.length > 0)
            {
                //來文影像檔最後再加入，如此，可於TBI140中列於最後
                for (var i = 0; i < RtnBulletin.ScanFileInfo.length; i++)
                {
                    var info = new AttachInfo();
                    info.AttachFilePath = serverAtt;
                    info.AttachFileName = RtnBulletin.ScanFileInfo[i].AttachFileName;
                    info.AttachDesp = "來文影像檔";//作為TBI140顯示時的依據
                    info.AttachSize = RtnBulletin.ScanFileInfo[i].AttachSize;
                    info.AttachType = "4";
                    attachFileArr[attachFileArr.length] = info;
                }
            }
        }
        //公布欄
        var sBoardSide = "1";
        if (document.all.rbInside)
            if (document.all.rbInside.checked)
                sBoardSide = "1";
        if (document.all.rbBoth)
            if (document.all.rbBoth.checked)
                sBoardSide = "2";
        if (document.all.rbOutside)
            if (document.all.rbOutside.checked)
                sBoardSide = "3";
        //公告範圍
        var sAllowRange = "2";
        if (document.all.rbRange1)
            if (document.all.rbRange1.checked)
                sAllowRange = "0";
        if (document.all.rbRange2)
            if (document.all.rbRange2.checked)
                sAllowRange = "1";
        if (document.all.rbRange3)
            if (document.all.rbRange3.checked)
                sAllowRange = "2";
        //Email通知
        var sEmailType = "0";

        if (document.all.rbOther && document.all.rbOther.checked)
        {
            if (document.all.txEnableOD17.value == "Y")
                sEmailType = "2";
            else
            {
                if (document.all.cbUnit && document.all.cbUnit.checked)
                    sEmailType = "1";
                else
                    sEmailType = "2";
            }
        }
        else if (document.all["cbMail"] && document.all["cbMail"].checked)
        {
            if (document.all.cbUnit && document.all.cbUnit.checked)
                sEmailType = "1";
            else
                sEmailType = "2";
        }
        if (document.all.ShowTbForSetRole.value == "Y" && (document.all["cbUnit"] && document.all["cbUnit"].checked))
            sEmailType = "1";

        //內部發文
        var strDispatch = "0";

        //公告對象
        var arrReceiverInfo = new Array();
        if (document.all.rbOrg)
            if (document.all.rbOrg.checked)
                ;//Do Nothing
        if (document.all.rbUnit)
        {
            if (document.all.rbUnit.checked)
            {
                arrReceiverInfo[0] = new ReceiverInfo();
                //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--S
                // arrReceiverInfo[0].OrgNo = document.all.H_OrgNo.value;
                arrReceiverInfo[0].OrgNo = encodeURI(document.all.H_OrgNo.value);
                arrReceiverInfo[0].OrgType = "Unit";
                //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--S
                // arrReceiverInfo[0].Id = document.all.dlUnit.value;
                // arrReceiverInfo[0].Name = document.all.dlUnit.text;
                arrReceiverInfo[0].Id = encodeURI(document.all.dlUnit.value);
                arrReceiverInfo[0].Name = encodeURI(document.all.dlUnit.text);
                //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--E
                arrReceiverInfo[0].Email = false;
                if (document.all["cbMail"] && document.all["cbMail"].checked)
                    arrReceiverInfo[0].Email = true;

                arrReceiverInfo[0].Attach = false;
                if (document.all["cbAttach"] && document.all["cbAttach"].checked)
                    arrReceiverInfo[0].Attach = true;
                arrReceiverInfo[0].MailType = "0";
                //1080104 Zen 1071254 修正公告對象為本單位時一率寄送通知Email之問題
                //if (arrReceiverInfo[0].Email = true)
                if (arrReceiverInfo[0].Email == true)
                {
                    if (document.all["cbUnit"] && document.all["cbUnit"].checked)
                        arrReceiverInfo[0].MailType = "1";
                    else
                        arrReceiverInfo[0].MailType = "2";
                }
            }
        }
        if (document.all.rbOther)
        {
            if (document.all.rbOther.checked)
            {
                document.all.btCleanAll.disabled = true;
                for (var i = 2; i <= document.all.dgtarget.rows.length; i++)
                {
                    //公告對象型態
                    //1080604 Joe 1080481 弱掃修正Client Potential Code Injection
                    // var sIdType = document.all["dgtarget__ctl" + i + "_txIdType"].value;
                    var sIdType = encodeURI(document.all["dgtarget__ctl" + i + "_txIdType"].value);
                    if (sIdType == "0") sIdType = "Account";
                    else if (sIdType == "1") sIdType = "Role";
                    else if (sIdType == "2") sIdType = "Unit";
                    else if (sIdType == "3") sIdType = "Group";
                    else if (sIdType == "4") sIdType = "Org";
                    else continue;

                    var sId1 = "", sId2 = "";
                    //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--S
                    // var sOrgNo = document.all["dgtarget__ctl" + i + "_txOrgNo"].value;
                    // var sOrgCode = document.all["dgtarget__ctl" + i + "_txOrgCode"].value;
                    // var sGroupCode = document.all["dgtarget__ctl" + i + "_txGroupCode"].value;
                    // var sUnitCode = document.all["dgtarget__ctl" + i + "_txUnitCode"].value;
                    // var sRoleCode = document.all["dgtarget__ctl" + i + "_txRoleCode"].value;
                    // var sUserCode = document.all["dgtarget__ctl" + i + "_txUserCode"].value;
                    // var sName = document.all["dgtarget__ctl" + i + "_lbtargetName"].value;
                    var sOrgNo = encodeURI(document.all["dgtarget__ctl" + i + "_txOrgNo"].value);
                    var sOrgCode = encodeURI(document.all["dgtarget__ctl" + i + "_txOrgCode"].value);
                    var sGroupCode = encodeURI(document.all["dgtarget__ctl" + i + "_txGroupCode"].value);
                    var sUnitCode = encodeURI(document.all["dgtarget__ctl" + i + "_txUnitCode"].value);
                    var sRoleCode = encodeURI(document.all["dgtarget__ctl" + i + "_txRoleCode"].value);
                    var sUserCode = encodeURI(document.all["dgtarget__ctl" + i + "_txUserCode"].value);
                    var sName = encodeURI(document.all["dgtarget__ctl" + i + "_lbtargetName"].value);
                    //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--E
                    if (sName == "")
                        continue;

                    var idxArr = arrReceiverInfo.length;
                    arrReceiverInfo[idxArr] = new ReceiverInfo();
                    arrReceiverInfo[idxArr].OrgNo = sOrgNo;
                    arrReceiverInfo[idxArr].OrgType = sIdType;
                    if (sIdType == "Org")
                        arrReceiverInfo[idxArr].Id = sOrgCode;
                    else if (sIdType == "Group")
                        arrReceiverInfo[idxArr].Id = sGroupCode;
                    else if (sIdType == "Unit")
                        arrReceiverInfo[idxArr].Id = sUnitCode;
                    else if (sIdType == "Role")
                    {
                        arrReceiverInfo[idxArr].Id = sUnitCode;
                        arrReceiverInfo[idxArr].Id2 = sRoleCode;
                    }
                    else if (sIdType == "Account")
                    {
                        arrReceiverInfo[idxArr].Id = sUserCode;
                        arrReceiverInfo[idxArr].Id2 = sUnitCode;
                    }
                    arrReceiverInfo[idxArr].Name = sName;
                    arrReceiverInfo[idxArr].Email = false;
                    arrReceiverInfo[idxArr].Attach = false;
                    arrReceiverInfo[idxArr].MailType = false;

                    if (document.all["dgtarget__ctl" + i + "_cbSelectEmail"] && document.all["dgtarget__ctl" + i + "_cbSelectEmail"].checked)
                    {
                        arrReceiverInfo[idxArr].Email = true;
                    }
                    if (document.all["dgtarget__ctl" + i + "_cbSelectAttach"] && document.all["dgtarget__ctl" + i + "_cbSelectAttach"].checked)
                        arrReceiverInfo[idxArr].Attach = true;

                    //0970915 Leo 001674
                    arrReceiverInfo[idxArr].MailType = "0";
                    if (arrReceiverInfo[idxArr].Email == true)
                    {
                        if (document.all["dgtarget__ctl" + i + "_cbSelectUnit"] && document.all["dgtarget__ctl" + i + "_cbSelectUnit"].checked)
                            arrReceiverInfo[idxArr].MailType = "1";
                        else
                            arrReceiverInfo[idxArr].MailType = "2";
                    }
                }
                //1000322 David 1000278 點選其他時，才判斷是否為內部發文
                if (document.all.cbDispatch.checked)
                    strDispatch = "1";
            }
        }
        var Email = false;
        if (document.all["cbMail"])
            if (document.all["cbMail"].checked)
                Email = true;

        var Attach = false;
        if (document.all["cbAttach"])
            if (document.all["cbAttach"].checked)
                Attach = true;

        //呼叫WebService要求公布欄系統發布公告
        var arWSParam = new Array(6);
        argAllDataInfo = new AllDataInfo();
        //1080618 Joe 1080481 弱掃修正Client Potential Code Injection
        // argAllDataInfo.DocNo = document.all["txDocNo"].value;	//arWSParam[1] = document.all["txDocNo"].value;
        argAllDataInfo.DocNo = encodeURI(document.all["txDocNo"].value);	//arWSParam[1] = document.all["txDocNo"].value;
        argAllDataInfo.BoardSide = sBoardSide;	//arWSParam[2] = sBoardSide;
        argAllDataInfo.AllowRange = sAllowRange;	//arWSParam[3] = sAllowRange;
        argAllDataInfo.EmailType = sEmailType;	//arWSParam[4] = sEmailType;
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--S
        // argAllDataInfo.CateGoryId = document.all.dlCategory.value;	//arWSParam[5] = document.all.dlCategory.value;
        // argAllDataInfo.Subject = document.all.txSubject.value;	//arWSParam[6] = document.all.txSubject.value;
        argAllDataInfo.CateGoryId = encodeURI(document.all.dlCategory.value);	//arWSParam[5] = document.all.dlCategory.value;
        argAllDataInfo.Subject = encodeURI(document.all.txSubject.value);	//arWSParam[6] = document.all.txSubject.value;
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--E
        var time = new Date();
        var hour = time.getHours();
        var min = time.getMinutes();
        var sec = time.getSeconds();
        if (hour < 10) { hour = "0" + hour; }
        if (min < 10) { min = "0" + min; }
        if (sec < 10) { sec = "0" + sec; }
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--S
        // argAllDataInfo.PasteDate = document.all.txPasteDate.value + hour + min + sec;
        argAllDataInfo.PasteDate = encodeURI(document.all.txPasteDate.value + hour + min + sec);
        //End
        // argAllDataInfo.ExpireDate = document.all.txExpireDate.value;	//arWSParam[8] = document.all.txExpireDate.value;
        argAllDataInfo.ExpireDate = encodeURI(document.all.txExpireDate.value);	//arWSParam[8] = document.all.txExpireDate.value;
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--E
        argAllDataInfo.DiPathName = serverDI + sDIFileName;	//arWSParam[9] = serverDI + sDIFileName;
        argAllDataInfo.DipdfPathName = RtnBulletin.WorkLocation + sPDFFileName;	//arWSParam[11] = RtnBulletin.WorkLocation + sPDFFileName;
        if (sAttachPDFFileName == "")
            argAllDataInfo.AttachPdfPathName = "";
        else
            //1060612 Zen 1060456 弱掃XSS修正
            //argAllDataInfo.AttachPdfPathName = RtnBulletin.WorkLocation + sAttachPDFFileName;	//arWSParam[12] = RtnBulletin.WorkLocation + sAttachPDFFileName;
            argAllDataInfo.AttachPdfPathName = encodeURI(RtnBulletin.WorkLocation + sAttachPDFFileName);	//arWSParam[12] = RtnBulletin.WorkLocation + sAttachPDFFileName;
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection
        // argAllDataInfo.UnitCode = document.all.dlUnit[document.all.dlUnit.selectedIndex].value;	//arWSParam[14] = document.all.dlUnit[document.all.dlUnit.selectedIndex].value;
        argAllDataInfo.UnitCode = encodeURI(document.all.dlUnit[document.all.dlUnit.selectedIndex].value);	//arWSParam[14] = document.all.dlUnit[document.all.dlUnit.selectedIndex].value;
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection
        // argAllDataInfo.UnitName = document.all.dlUnit[document.all.dlUnit.selectedIndex].text;	//arWSParam[15] = document.all.dlUnit[document.all.dlUnit.selectedIndex].text;	
        argAllDataInfo.UnitName = encodeURI(document.all.dlUnit[document.all.dlUnit.selectedIndex].text);	//arWSParam[15] = document.all.dlUnit[document.all.dlUnit.selectedIndex].text;	
        if (document.all["txFromOrgName"].value != "")
            GetFromOrgName(document.all["txFromOrgName"].value)
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--S
        /*
        argAllDataInfo.FromOrgName = document.all["txFromOrgName"].value;
        //0991208 David 0990998 新增紀錄承辦人資訊
        argAllDataInfo.FounderAccount = document.all["txFounderAccount"].value;
        argAllDataInfo.FounderName = document.all["txFounderName"].value;
        //1000322 David 1000278 紀錄是否為內部發文
        argAllDataInfo.Dispatch = strDispatch;
        // 1020221	Cloud	1020085		FOR修正單號1010533 衍伸BUG 增加儲存承辦單位承辦科別資訊
        argAllDataInfo.FounderDpetNo = document.all["txFounderDeptNo"].value;
        argAllDataInfo.FounderDpetName = document.all["txFounderDeptName"].value;
        argAllDataInfo.FounderSectNo = document.all["txFounderSectNo"].value;
        argAllDataInfo.FounderSectName = document.all["txFounderSectName"].value;
        */
        argAllDataInfo.FromOrgName = encodeURI(document.all["txFromOrgName"].value);
        //0991208 David 0990998 新增紀錄承辦人資訊
        argAllDataInfo.FounderAccount = encodeURI(document.all["txFounderAccount"].value);
        argAllDataInfo.FounderName = encodeURI(document.all["txFounderName"].value);
        //1000322 David 1000278 紀錄是否為內部發文
        argAllDataInfo.Dispatch = strDispatch;
        // 1020221	Cloud	1020085		FOR修正單號1010533 衍伸BUG 增加儲存承辦單位承辦科別資訊
        argAllDataInfo.FounderDpetNo = encodeURI(document.all["txFounderDeptNo"].value);
        argAllDataInfo.FounderDpetName = encodeURI(document.all["txFounderDeptName"].value);
        argAllDataInfo.FounderSectNo = encodeURI(document.all["txFounderSectNo"].value);
        argAllDataInfo.FounderSectName = encodeURI(document.all["txFounderSectName"].value);
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection--E

        //1010420 David 1010008 新增紀錄投信投顧客製化資訊
        if (document.all.H_txSITCA.value == "Y" && sBoardSide != "1")
        {
            argAllDataInfo.objSITCA = new ObjSITCA();
            argAllDataInfo.objSITCA.bSITCA = true;
            //1080604 Joe 1080481 弱掃修正Client Potential Code Injection
            // argAllDataInfo.objSITCA.DocNo = document.all["txDocNo"].value;
            argAllDataInfo.objSITCA.DocNo = encodeURI(document.all["txDocNo"].value);
            //受文對象欄位內容
            //1080604 Joe 1080481 弱掃修正Client Potential Code Injection
            // argAllDataInfo.objSITCA.SitcaIssueType = document.all.txSitcaIssueType.value;
            argAllDataInfo.objSITCA.SitcaIssueType = encodeURI(document.all.txSitcaIssueType.value);
            //法規函令選項代碼
            var strSitcaRegulation = "";
            if (document.all.cbSitcaRegulation.checked)
            {
                for (var iRows = 0; iRows < document.all.cblSitcaRegulation.rows.length; iRows++)
                {
                    for (var iCells = 0; iCells < document.all.cblSitcaRegulation.rows[iRows].cells.length; iCells++)
                    {
                        if (document.all.cblSitcaRegulation.rows[iRows].cells[iCells].childNodes[0].checked)
                        {
                            strSitcaRegulation += GetSitcaRegulationValue(document.all.cblSitcaRegulation.rows[iRows].cells[iCells].innerText);
                        }
                    }
                }
            }
            //1080618 Joe 1080481 弱掃修正Client Potential Code Injection--S
            // argAllDataInfo.objSITCA.SitcaRegulation = strSitcaRegulation;
            // 法令依據欄位內容
            // argAllDataInfo.objSITCA.SitcaBasis = document.all.txSitcaBasis.value;			
            argAllDataInfo.objSITCA.SitcaRegulation = encodeURI(strSitcaRegulation);
            argAllDataInfo.objSITCA.SitcaBasis = encodeURI(document.all.txSitcaBasis.value);
            //1080618 Joe 1080481 弱掃修正Client Potential Code Injection--E
        }

        //1080107 Zen 1071077 (航港局)新增Email標題選單及通知預設原承辦人
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection
        // argAllDataInfo.EmailTitle = document.all['dlEmailTitle_Text'].value;
        argAllDataInfo.EmailTitle = encodeURI(document.all['dlEmailTitle_Text'].value);

        //1051214   Kenny   [1051150]   修改Client Potential Code Injection
        //arWSParam[0] = document.all["SsoArtifact"].value;	
        //1080318	Joe		1080098		弱掃修正禁用WSDL
        /*
        
        arWSParam[0] = encodeURI(document.all["SsoArtifact"].value);
        arWSParam[1] = attachFileArr;
        arWSParam[2] = arrReceiverInfo;
        arWSParam[3] = argAllDataInfo;
        arWSParam[4] = Email;
        arWSParam[5] = Attach;

        var inTBWS = jf_Trim(document.all.txInsideTBWS.value);
        callObj = jf_CallWS(inTBWS, "BeforePasteDocBulletin", false, arWSParam);
        */
        //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--S
        /*
        var params = new SOAPClientParameters();
        params.add('argSessionID', jf_GetArtifact());
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection
        // params.add('argArtifact', document.all["SsoArtifact"].value);
        params.add('argArtifact', encodeURI(document.all["SsoArtifact"].value));
        params.add('argAttachInfo', attachFileArr);
        params.add('argReceivers', arrReceiverInfo);
        params.add('argAllDataInfo', argAllDataInfo);
        params.add('Email', Email);
        params.add('Attach', Attach);
        //1080604 Joe 1080481 弱掃修正Client Potential Code Injection
        // var callObj = SOAPClient.invokeJSON(jf_Trim(document.all.txInsideTBWS.value), "BeforePasteDocBulletin", params ,false, null)
        var callObj = SOAPClient.invokeJSON(jf_Trim(encodeURI(document.all.txInsideTBWS.value)), "BeforePasteDocBulletin", params ,false, null)
        */
        arWSParam[0] = encodeURI(document.all["SsoArtifact"].value);
        arWSParam[1] = attachFileArr;
        arWSParam[2] = arrReceiverInfo;
        arWSParam[3] = argAllDataInfo;
        arWSParam[4] = Email;
        arWSParam[5] = Attach;

        var inTBWS = jf_Trim(document.all.txInsideTBWS.value);
        callObj = jf_CallWS(inTBWS, "BeforePasteDocBulletin", false, arWSParam);
        //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--E
        //1080318	Joe		1080098		弱掃修正禁用WSDL--E
        //檢查執行是否成功
        if (callObj.error)
        {
            alert("發布公告時失敗：" + callObj.errorDetail.string);
        }
        else
        {
            if (callObj.value.m_bSuccess == false)
                alert("發布公告時發生錯誤：" + callObj.value.m_strErrMsg);
            else
                alert("發布成功，公告編號：" + callObj.value.m_strMsg);
            jf_ToolBarSubmit("btSave");
        }
    }
}
//1060526 Cloud 將發布功能改寫-E

function GetServerName()
{
    return document.all["SsoServer"].value;
}

//公告對象物件, 此為物件prototype而非函式, 用以傳遞公告對象的資訊
function ReceiverInfo()
{
    this.OrgNo = "";
    this.OrgType = "";
    this.Id = "";
    this.Name = "";
    this.MailType = "";
    this.Email = "";
    this.Attach = "";
}

function AllDataInfo()
{
    this.DocNo = "";
    this.BoardSide = "";
    this.AllowRange = "";
    this.EmailType = "";
    this.CateGoryId = "";
    this.Subject = "";
    this.PasteDate = "";
    this.ExpireDate = "";
    this.DiPathName = "";
    this.DipdfPathName = "";
    this.AttachPdfPathName = "";
    this.UnitCode = "";
    this.UnitName = "";
    this.FromOrgName = "";
    //0991208 David 0990998 新增紀錄承辦人資訊
    this.FounderAccount = "";
    this.FounderName = "";
    //1000322 David 1000278 新增內部發文屬性
    this.Dispatch = "";
    //1010420 David 1010008 新增紀錄投信投顧客製化物件
    this.objSITCA = new ObjSITCA();
    //1020221 Cloud	[1020085] 新增紀錄承辦單位科別	
    this.FounderDeptNo = "";
    this.FounderDeptName = "";
    this.FounderSectNo = "";
    this.FounderSectName = "";
    //1080107 Zen 1071077 (航港局)新增Email標題選單及通知預設原承辦人
    this.EmailTitle = "";
}

function AttFileInfo()
{
    this.FileName = "";
    this.FilePath = "";
    this.FileSize = "";
    this.FileDesc = "";
    this.ComeFrom = "";//Server or Client
    this.DraftSeq = "";
}

//1010420 David 1010008 新增投信投顧客製化物件
function ObjSITCA()
{
    this.bSITCA = false;//是否為投信投顧客製化需求
    this.SourceOrgno = "";	//機關代碼
    this.BulletinID = "";	//公告編號
    this.DocNo = "";	//公文文號
    this.SitcaIssueType = "";	//受文對象欄位內容
    this.SitcaRegulation = "";	//法規函令選項代碼
    this.SitcaBasis = "";	//法令依據欄位內容
}

//
//取得法規函令的Value值
function GetSitcaRegulationValue(TypeName)
{
    for (var i = 0; i < document.all["ddlSitcaRegulation"].options.length; i++)
    {
        if (TypeName == document.all["ddlSitcaRegulation"].options[i].text)
            return document.all["ddlSitcaRegulation"].options[i].value;
    }
}


//瀏覽並加入附件
function fnAddFile()
{
    if (!document.all.dgAttach)
        return;
    var strFileFullPath = "";
    //1060518 Cloud 1050087 升級二代-修改取得檔案資訊方式
    /*document.all["BF"].Title = "請選擇待上傳檔案路徑";

    if(document.all["BF"].ShowDialog(0) != 0)  //有指定值
        strFileFullPath = document.all["BF"].Path;
    else
        return;
    if (!strFileFullPath)
        return;
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var oFile = fso.GetFile(strFileFullPath);
    var nFileSize = (oFile.Size == 0) ? 0 : Math.ceil(oFile.Size / 1024);*/

    var nFileSizeLimit = (document.all.txFileSizeLimit.value == "") ? 0 : parseInt(document.all.txFileSizeLimit.value, 10);
    //1060518 Cloud 1050087 升級二代-//公佈欄一代只支援單筆加入，檢核邏輯不修改-調整取得檔案資訊方式
    //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題，紀錄附件夾帶次數
    //for (var iFile = 0 ; iFile < $('#fileInput')[0].files.length ; iFile++)
    for (var iFile = 0; iFile < $('#fileInput' + nInputFileCnt)[0].files.length; iFile++)
    {
        var bFileNameCheck = true;
        var bFileSizeCheck = true;
        //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題，紀錄附件夾帶次數
        //var currentFile = $('#fileInput')[0].files[iFile];
        var currentFile = $('#fileInput' + nInputFileCnt)[0].files[iFile];

        var strFileName = currentFile.name;
        var nFileSize = Math.ceil(currentFile.size / 1024);
        var rowCnt = document.all.dgAttach.rows.length;
        if (nFileSizeLimit < nFileSize && !document.all.txManager.value)
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您所選取的檔案大小為[" + nFileSize + "KB]，已超過附件檔案大小上限[" + nFileSizeLimit + "KB]，\n故無法選擇此檔，若仍要上傳，請洽公布欄管理員處理。"])), "");
            return;
        }
        //1051114	Kevin_C	1050234		取得系統參數WE_ATTACH_CHECK進行副檔名檢核
        if (document.all["WE_ATTACH_CHECK"].value != "")
        {
            if (document.all["WE_ATTACH_CHECK"].value.indexOf("|") != -1)
            {
                var strSystemSet = document.all["WE_ATTACH_CHECK"].value.split("|");

                var strWhiteList = strSystemSet[1].split(";");
                var bIsInWhiteList = false;
                var strFileExt = strFileName.split(".")[1].toUpperCase();
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
                        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["依行政院國發會函頒「推動ODF-CNS15251為政府文件標準格式實施計畫」，106年全面推動各機關使用可編輯ODF-CNS15251文書軟體。執行期間:抱歉您的附件無法存檔，請用ODF軟體轉成PDF或ODF的文件以符合規定。PDF與ODF文件轉換方式，請參閱「員工入口網」->「網路資料夾」->「公用表單」->「資訊室」->「105年公文線上簽核教育訓練教材」->「推動ODF時程資料」。"])), "");
                        return;
                    }
                    else if (strSystemSet[0] == "W")
                    {
                        if (!confirm("依行政院國發會函頒「推動ODF-CNS15251為政府文件標準格式實施計畫」，106年全面推動各機關使用可編輯ODF-CNS15251文書軟體。宣導最後階段:請將您的附件用ODF軟體轉成PDF或ODF的文件以符合規定。PDF與ODF文件轉換方式，請參閱「員工入口網」->「網路資料夾」->「公用表單」->「資訊室」->「105年公文線上簽核教育訓練教材」->「推動ODF時程資料。"))
                            return;
                    }

                }
            }
            else
                alert("系統參數WE_ATTACH_CHECK設定值錯誤");
        }
        var rowCnt = document.all.dgAttach.rows.length;
        for (var i = 1; i < document.all.dgAttach.rows.length; i++)
        {
            //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題，修正語法錯誤
            //var strSrcFileName = document.all.dgAttach.rows[i].cells[1].childNodes[0].innerText;
            var strSrcFileName = document.all.dgAttach.rows[i].cells[1].children[0].innerText;
            if (strFileName == strSrcFileName)
            {
                //* 1060512  Cloud  1050087     升級二代
                //document.all.btAddFile.focus();
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已有相同檔名之檔案存在，無法加入。"])), "");
                $('btAddFile').focus();
                return;
            }
        }

        //設定row的背景色
        //1010301 David 1010041 加入附件改用共用函式處理
        /*var rowBgColor = (rowCnt % 2) ? "#F7F7DE" : "White";
        //create row
        var row = document.createElement("TR");
        row.style.backgroundColor = rowBgColor;
        
        //create column
        var TbFD       = document.all["TBFileDesc"].value;//0960713 MATTE 000966
                    
        var colSeq = document.createElement("TD");
        colSeq.setAttribute("align","middle");
        colSeq.setAttribute("nowrap","nowrap");
        colSeq.className = "InputFieldLabel";
        colSeq.innerText = rowCnt;
        
        var colFile = document.createElement("TD");
        colFile.setAttribute("align","Left");
        var spanFileName = document.createElement("SPAN");
        var spanFilePath = document.createElement("SPAN");
        var spanFileSize = document.createElement("SPAN");
        var spanFileDesc = document.createElement("SPAN");
        var spanFileComeFrom = document.createElement("SPAN");
        var spanFileDraftSeq = document.createElement("SPAN");
        spanFileName.name		= "FileName";
        spanFileName.innerText	= strFileName;
        spanFilePath.name		= "FilePath";
        spanFilePath.innerText	= strFileFullPath;
        spanFileSize.name		= "FileSize";
        spanFileSize.innerText	= nFileSize;
        spanFileDesc.name		= "FileDesc";
        spanFileDesc.innerText	= "";
        spanFileComeFrom.name		= "FileComeFrom";
        spanFileComeFrom.innerText	= "Client";
        spanFileDraftSeq.name		= "FileDraftSeq";
        spanFileDraftSeq.innerText	= "";
        spanFileName.className = "InputFieldLabel";
        spanFilePath.style.display = "none";
        spanFileSize.style.display = "none";
        spanFileDesc.style.display = "none";
        spanFileComeFrom.style.display = "none";
        spanFileDraftSeq.style.display = "none";
        colFile.appendChild(spanFileName);
        colFile.appendChild(spanFilePath);
        colFile.appendChild(spanFileSize);
        colFile.appendChild(spanFileDesc);
        colFile.appendChild(spanFileComeFrom);
        colFile.appendChild(spanFileDraftSeq);
        if(TbFD == "Y")//0960713 MATTE 000966
        {
            var coldes = document.createElement("TD");
            coldes.setAttribute("align","middle");
            coldes.setAttribute("nowrap","nowrap");
            coldes.innerHTML = "<INPUT id=\"dgAttach__ctl"+ (document.all.dgAttach.rows.length+1) +"_txFileDesc\" type=\"TextBox\"/>";
        }
        var colDel = document.createElement("TD");
        colDel.setAttribute("align","middle");
        colDel.setAttribute("nowrap","nowrap");
        colDel.innerHTML = "<INPUT type=\"button\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" />";
        //0980901	David	0980347	新增開啟功能鍵
        var strOpenPath = strFileFullPath.replace(/\\/g,"\\\\");
        colDel.innerHTML += "&nbsp;<INPUT type=\"button\" value=\"開啟\" onclick=\"OpenFile('"+strOpenPath+"')\" />";
        
        //Add to dgAttach
        row.appendChild(colSeq);
        row.appendChild(colFile);
        if(TbFD == "Y")//0960713 MATTE 000966
            row.appendChild(coldes);
        row.appendChild(colDel);
        document.all.dgAttach.children.tags("TBODY")[0].appendChild(row);*/
        //1121220	Leslie	各機關問題彙整表 序346，修正可開啟使用者當前夾帶的附件
        let strFileFullPath = URL.createObjectURL(currentFile);

        fnAddAttach(strFileName, strFileFullPath, nFileSize, "", "Client", "");
        //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題
        //AllFiles.push($('#fileInput')[0].files[iFile]);
    }

    //1090821 Zen 1090550 修正多次加入附件的情況下發布公告錯誤之問題，新增新Input物件供後續再次夾帶附件
    if (nInputFileCnt == '')
        nInputFileCnt = 0;

    nInputFileCnt = Number(nInputFileCnt) + 1;
    var InputFile = document.createElement("INPUT");
    InputFile.setAttribute("type", "file");
    InputFile.setAttribute("id", "fileInput" + nInputFileCnt);
    InputFile.setAttribute("name", "fileInput" + nInputFileCnt);
    InputFile.setAttribute("class", "hide");
    InputFile.setAttribute("onchange", "fnAddFile()");
    InputFile.setAttribute("multiple", "multiple");
    var fileDiv = $('#fileInput')[0].parentNode
    fileDiv.appendChild(InputFile)

    //將focus設到加入附件的按鈕以便使用者繼續加入
    //* 1060512  Cloud  1050087     升級二代
    //document.all.btAddFile.focus();
    $('btAddFile').focus();
}

function fnAddScanImg()
{
    //alert(document.all.nWS.value);
    //alert(document.all.nScanPDF.value);
    //1060601 Cloud 1050087 此功能調整為自行下載後再加入
    //var soap = new ActiveXObject("WSWrapper.WebFileIO");
    //var serviceURL=document.all.nWS.value;
    //var fso = new ActiveXObject("Scripting.FileSystemObject");
    ////1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
    //if ( document.all.II_USE_SSL != null )
    //{
    //    if ( document.all.II_USE_SSL.value == "Y" )
    //        serviceURL = serviceURL.replace("http://", "https://") ;
    //}
    ////1040716 Gabby[1040324]增加WebFileIO錯誤訊息處理
    //try
    //{
    //    soap.Init(serviceURL);
    //    if(fso.FolderExists("c:\\temp")==false)
    //        fso.CreateFolder("c:\\temp");
    //    var local= "C:\\temp";
    //    soap.AddFile(document.all.nScanPDF.value,document.all.txDocNo.value+"T.PDF");
    //    //0980916	David	0980455	使用WebFileIO時，應傳入Artifact
    //    //soap.Download("", false, local);
    //    soap.Download(document.all["SsoArtifact"].value, false, local);
    //    //1040716 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
    //}
    //catch(e)
    //{
    //    var strErrMsg = e.message;
    //    if (soap.hasError)
    //        strErrMsg += soap.ErrorMessage;
    //    alert("連接伺服器"+serviceURL+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg);
    //    return;
    //}
    ////1040716 Gabby[1040324]增加WebFileIO錯誤訊息處理--END	
    //if (!document.all.dgAttach)
    //    return;
    //var strFileFullPath = "c:\\temp\\"+document.all.txDocNo.value+"T.PDF";
    //if(fso.FileExists(strFileFullPath)==false)
    //{
    //    alert('因不明原因下載檔案失敗,無法繼續後需操作!!');
    //    return;
    //}
    //var oFile = fso.GetFile(strFileFullPath);
    //var nFileSize = (oFile.Size == 0) ? 0 : Math.ceil(oFile.Size / 1024);
    //var nFileSizeLimit = (document.all.txFileSizeLimit.value == "" ) ? 0 : parseInt(document.all.txFileSizeLimit.value, 10);
    //if (nFileSizeLimit < nFileSize && !document.all.txManager.value)
    //{
    //    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您所選取的檔案大小為[" + nFileSize + "KB]，已超過附件檔案大小上限[" + nFileSizeLimit + "KB]，\n故無法選擇此檔，若仍要上傳，請洽公布欄管理員處理。"])),"");
    //    return;
    //}
    //var strFileName = strFileFullPath.substr(strFileFullPath.lastIndexOf("\\") + 1);
    //var rowCnt = document.all.dgAttach.rows.length;

    //for (var i = 1; i < document.all.dgAttach.rows.length; i++)
    //{
    //    //1060512 Cloud 1050087 升級二代
    //    //var strSrcFileName = document.all.dgAttach.rows[i].cells[1].childNodes[0].innerText;
    //    var strSrcFileName = document.all.dgAttach.rows[i].cells[1].childNodes[0].textContent;
    //    if (strFileName == strSrcFileName)
    //    {
    //        //* 1060512  Cloud  1050087     升級二代
    //        //document.all.btAddFile.focus();
    //        $('btAddFile').focus();
    //        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已有相同檔名之檔案存在，無法加入。"])),"");
    //        return;
    //    }
    //}
    ////設定row的背景色
    ////1010306 David 1010041 加入附件改用共用函式處理
    //var rowBgColor = (rowCnt % 2) ? "#F7F7DE" : "White";
    ////create row
    //var row = document.createElement("TR");
    //row.style.backgroundColor = rowBgColor;

    ////create column
    //var TbFD       = document.all["TBFileDesc"].value;//0960713 MATTE 000966

    //var colSeq = document.createElement("TD");
    //colSeq.setAttribute("align","middle");
    //colSeq.setAttribute("nowrap","nowrap");
    //colSeq.className = "InputFieldLabel";
    //colSeq.innerText = rowCnt;

    //var colFile = document.createElement("TD");
    //colFile.setAttribute("align","Left");
    //var spanFileName = document.createElement("SPAN");
    //var spanFilePath = document.createElement("SPAN");
    //var spanFileSize = document.createElement("SPAN");
    //var spanFileDesc = document.createElement("SPAN");
    //var spanFileComeFrom = document.createElement("SPAN");
    //var spanFileDraftSeq = document.createElement("SPAN");
    //spanFileName.name		= "FileName";
    //spanFileName.innerText	= strFileName;
    //spanFilePath.name		= "FilePath";
    //spanFilePath.innerText	= strFileFullPath;
    //spanFileSize.name		= "FileSize";
    //spanFileSize.innerText	= nFileSize;
    //spanFileDesc.name		= "FileDesc";
    //spanFileDesc.innerText	= "";
    //spanFileComeFrom.name		= "FileComeFrom";
    //spanFileComeFrom.innerText	= "Client";
    //spanFileDraftSeq.name		= "FileDraftSeq";
    //spanFileDraftSeq.innerText	= "";
    //spanFileName.className = "InputFieldLabel";
    //spanFilePath.style.display = "none";
    //spanFileSize.style.display = "none";
    //spanFileDesc.style.display = "none";
    //spanFileComeFrom.style.display = "none";
    //spanFileDraftSeq.style.display = "none";
    //colFile.appendChild(spanFileName);
    //colFile.appendChild(spanFilePath);
    //colFile.appendChild(spanFileSize);
    //colFile.appendChild(spanFileDesc);
    //colFile.appendChild(spanFileComeFrom);
    //colFile.appendChild(spanFileDraftSeq);
    //if(TbFD == "Y")//0960713 MATTE 000966
    //{
    //	var coldes = document.createElement("TD");
    //	coldes.setAttribute("align","middle");
    //	coldes.setAttribute("nowrap","nowrap");
    //	coldes.innerHTML = "<INPUT id=\"dgAttach__ctl"+ (document.all.dgAttach.rows.length+1) +"_txFileDesc\" type=\"TextBox\"/>";
    //}
    //var colDel = document.createElement("TD");
    //colDel.setAttribute("align","middle");
    //colDel.setAttribute("nowrap","nowrap");
    //colDel.innerHTML = "<INPUT type=\"button\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" />";

    ////Add to dgAttach
    //row.appendChild(colSeq);
    //row.appendChild(colFile);
    //if(TbFD == "Y")//0960713 MATTE 000966
    //	row.appendChild(coldes);
    //row.appendChild(colDel);
    //document.all.dgAttach.children.tags("TBODY")[0].appendChild(row);*/
    //fnAddAttach(strFileName,strFileFullPath,nFileSize,"","Client","");

    ////將focus設到加入附件的按鈕以便使用者繼續加入
    ////1060512 Cloud 1050087 升級二代
    ////document.all.btAddFile.focus();
    //$('btAddFile').focus();
    var rtnVal = TB1.TBT150.ScanImgDownLoad(document.all.nWS.value, document.all.nScanPDF.value, document.all.txDocNo.value + "T.PDF", document.all.H_AttachServerPath.value).value;
    if (rtnVal[1] != "")
        alert(rtnVal[1]);
    else
        openDlg(rtnVal[0] + "&OpenType=download", document.all["SsoArtifact"].value, "");

}

function fnDeleteAttachItem()
{
    Page_BlockSubmit = true;
    //先刪除資料

    var deleteRow = event.srcElement.parentNode.parentNode;
    //1060530 Cloud 升級二代
    //document.all.dgAttach.children.tags("TBODY")[0].removeChild(deleteRow);
    document.all.dgAttach.children[0].removeChild(deleteRow);
    //再重設序號及style
    for (var i = 1; i < document.all.dgAttach.rows.length; i++)
    {
        var row = document.all.dgAttach.rows[i];
        var rowBgColor = (i % 2) ? "#F7F7DE" : "White";
        row.style.backgroundColor = rowBgColor;
        row.childNodes[0].innerText = i;
    }
}

function fnGetAttFileInfoForUpload()
{
    var ret = new Array();
    for (var i = 1; i < document.all.dgAttach.rows.length; i++)
    {
        var row = document.all.dgAttach.rows[i];
        var afi = new AttFileInfo();
        var TbFD = document.all["TBFileDesc"].value;//0960713 MATTE 000966

        afi.FileName = fnGetSubNodeValueByEndName(row.cells[1], "FileName");
        afi.FilePath = fnGetSubNodeValueByEndName(row.cells[1], "FilePath");
        afi.FileSize = fnGetSubNodeValueByEndName(row.cells[1], "FileSize");
        if (TbFD == "Y")//0960713 MATTE 000966
            //0980212	Yvonne	修正檔管局刪除附件後無法發佈的問題(document.all[...]是NULL或不是一個物件
            afi.FileDesc = row.cells[2].childNodes[0].value;//0980612	David	0980278 修改抓取附件描述欄位
        //afi.FileDesc = document.all["dgAttach__ctl"+ (i+1) +"_txFileDesc"].value	
        else
            fnGetSubNodeValueByEndName(row.cells[1], "FileDesc");
        afi.ComeFrom = fnGetSubNodeValueByEndName(row.cells[1], "ComeFrom");
        afi.DraftSeq = fnGetSubNodeValueByEndName(row.cells[1], "DraftSeq");

        if (afi.FileName == "")
            continue;
        ret[ret.length] = afi;
    }
    return ret;
}
//取得子節點的innerText值
function fnGetSubNodeValueByEndName(argParentNode, argEndName)
{
    for (var i = 0; i < argParentNode.childNodes.length; i++)
    {
        if (argParentNode.childNodes[i].name && argParentNode.childNodes[i].name.indexOf(argEndName) != -1)
            return argParentNode.childNodes[i].innerText;
        if (argParentNode.childNodes[i].id && argParentNode.childNodes[i].id.indexOf(argEndName) != -1)
            return argParentNode.childNodes[i].innerText;
    }
    return "";
}
function fnGetPath(argFilePathName)
{
    if (argFilePathName[argFilePathName.length - 1] == "\\")
        return argFilePathName;
    var idx = argFilePathName.lastIndexOf("\\");
    if (idx != -1)
        return argFilePathName.substring(0, idx + 1);
    return argFilePathName;
}

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
        //1080710 David 1071180 紀錄名稱
        document.all["dgtarget__ctl" + (i + 1) + "_txName"].value = "";

        if (argCInfo.InfoType == "Account")
        {
            sType = "0";
            //0970111 Matte
            document.all["dgtarget__ctl" + (i + 1) + "_txUserCode"].value = argCInfo.Code;
            //document.all["dgtarget__ctl"+ (i+1) +"_txUserCode"].value	= argCInfo.Account;
            //1020517 Kevin 1020257 帳號發布對象新增儲存單位
            document.all["dgtarget__ctl" + (i + 1) + "_txUnitCode"].value = argCInfo.UnitCode;
            lbtargetNameObj.value = argCInfo.Name;
            //1080710 David 1071180 紀錄名稱
            document.all["dgtarget__ctl" + (i + 1) + "_txName"].value = argCInfo.Name;
        }
        else if (argCInfo.InfoType == "Role")
        {
            sType = "1";
            document.all["dgtarget__ctl" + (i + 1) + "_txUnitCode"].value = argCInfo.SuperiorUnitCode;
            document.all["dgtarget__ctl" + (i + 1) + "_txRoleCode"].value = argCInfo.Code;
            lbtargetNameObj.value = argCInfo.FullName;
            //1080710 David 1071180 紀錄名稱
            document.all["dgtarget__ctl" + (i + 1) + "_txName"].value = argCInfo.FullName;
        }
        else if (argCInfo.InfoType == "Unit")
        {
            sType = "2";
            document.all["dgtarget__ctl" + (i + 1) + "_txUnitCode"].value = argCInfo.Code;
            lbtargetNameObj.value = argCInfo.Name;
            //1080710 David 1071180 紀錄名稱
            document.all["dgtarget__ctl" + (i + 1) + "_txName"].value = argCInfo.Name;
        }
        else if (argCInfo.InfoType == "Org")
        {
            sType = "4";
            document.all["dgtarget__ctl" + (i + 1) + "_txOrgCode"].value = argCInfo.Code;
            lbtargetNameObj.value = argCInfo.Name;
            //1080710 David 1071180 紀錄名稱
            document.all["dgtarget__ctl" + (i + 1) + "_txName"].value = argCInfo.Name;
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
        //1030410	CLOUD	[1000854]	配合ASP架構修改程式
        document.all["dgtarget__ctl" + (i + 1) + "_txOrgNo"].value = document.all.H_OrgNo.value;
        //1080620 Cloud 1071180 紀錄名稱
        document.all["dgtarget__ctl" + (i + 1) + "_txName"].value = argGroup.GroupName;

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
        //1030410	Cloud	[1000854]	配合ASP架構修改程式
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
            //1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
            //sSelectType += "'" + argSelectType[i] + "'";
            sSelectType += argSelectType[i];
        }
        //jf_SaveCookie("iic021StrctureType"	, argParam);
        //jf_SaveCookie("iic021SelectType"	, sSelectType);
        document.all["hOrgPage"].value += "&iic021SelectType=" + sSelectType;
        //1070904 Justin [1070678]弱掃修正CookieHttpOnly--E

        if (document.all.TargetNavbar.src != document.all["hOrgPage"].value)
            document.all.TargetNavbar.src = document.all["hOrgPage"].value;
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
    //1080710 David 1071180 清除新增欄位
    document.all[dglbtargetName + "txName"].value = "";

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
    //1080710 David 1071180 清除新增欄位
    document.all[dglbtargetName + "txName"].value = "";
}

function fnCleanAllDg()
{
    //1080220 Zen 1071077 修正稿件受文者含內部單位時公告對象未預帶出原承辦人之問題，僅Enable時清空
    if (document.all['dgtarget'].disabled)
        return;

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

function removeSlash(argStr)
{
    if (argStr.indexOf("\\\\") != -1)
        return removeSlash(argStr.replace("\\\\", "\\"));
    else
        return argStr;
}

function DeleteFile(argStrPath)
{
    var fso = new ActiveXObject("Scripting.FileSystemObject");

    //Delete RSI
    if (fso.FileExists(argStrPath))
    {
        fso.DeleteFile(argStrPath);
    }
}

function dlDoc_onchange()
{
    if (document.all.nSubjectList != null)
    {
        var sArr = document.all.nSubjectList.value.split(';');
        if (document.all.dlDoc.options.length > 0 && document.all.dlDoc.selectedIndex < sArr.length)
        {
            document.all.txSubject.value = jf_Trim(sArr[document.all.dlDoc.selectedIndex]);
        }
    }
    //0970515 Leo 0970375 修正當nRecvList為空白時也要排除
    //0970515 Leo 使用者無權發布其它公告對象時就不要帶入
    //1060802	Cloud	Cloud	1071087			修正使用錯誤屬性，導致程式不正常執行問題
    //if(document.all.dlDoc.options.length >0  && document.all.nRecvList!=null && document.all.nRecvList.value!="" && document.all["rbOther"].isDisabled == false)  
    if (document.all.dlDoc.options.length > 0 && document.all.nRecvList != null && document.all.nRecvList.value != "" && document.all["rbOther"].disabled == false)
    {
        //0961008 Caesar 001663 中企處要求第三類發佈時,將稿件受文者預設帶入到公告對象
        var sDraft = document.all.nRecvList.value.split('^');
        var sRecvList = "";
        if (sDraft[document.all.dlDoc.selectedIndex] != null)//0970526 Leo 0970375 當稿件的公告對象沒有人的時候就清空
            sRecvList = sDraft[document.all.dlDoc.selectedIndex].split(';');
        document.all.rbOther.checked = true;
        //1080220 Zen 1071077 修正稿件受文者含內部單位時公告對象未預帶出原承辦人之問題，調換執行順序--begin
        //jf_fnShowDG();
        //fnCleanAllDg();
        fnCleanAllDg();
        jf_fnShowDG();
        //1080220 Zen 1071077 修正稿件受文者含內部單位時公告對象未預帶出原承辦人之問題，調換執行順序--end
        for (var i = 0; i < sRecvList.length; i++)
        {
            if (jf_Trim(sRecvList[i]) == "")
                continue;
            var sData = sRecvList[i].split('!');
            var argCInfo = new Object();
            //if(sData[3]=="Unit")
            //	argCInfo.Code		= sData[0];
            //else
            //	argCInfo.Account	= sData[0];
            //0970111  Matte  
            //if(sData[3]=="Account")
            //argCInfo.Account = sData[0].toUpperCase();
            //else
            //0991215 David 0990750 新增可發布至角色
            if (sData[4] == "")
                argCInfo.Code = sData[0].toUpperCase();
            else
            {
                argCInfo.Code = sData[4].toUpperCase();
                argCInfo.FullName = sData[1];
            }
            //0991215 David 0990750 新增可發布至角色
            //argCInfo.SuperiorUnitCode	= "";
            argCInfo.SuperiorUnitCode = sData[0].toUpperCase();
            argCInfo.SourceOrgNo = sData[2];
            argCInfo.Name = sData[1];
            argCInfo.InfoType = sData[3];
            fnAddOrgTarget(argCInfo);
        }
    }

    //1010306 David 1010041 附件顯示依稿件各別顯示，切換稿件時需重新顯示
    if (document.all.dlDoc.options.length > 0)
    {
        //刪除目前所有附件
        fnDeleteAllAttachItem()

        //依隱藏選單紀錄的附件資訊設定附件
        for (var i = 0; i < document.all.dlAttach.options.length; i++)
        {
            if (document.all.dlAttach[i].value == document.all.dlDoc[document.all.dlDoc.selectedIndex].value)
            {
                var DraftAttachInfo = document.all.dlAttach[i].text.split('|');
                //1080116	Kevin_C	1070678	修正弱掃Client Potential XSS
                //var strFileName = DraftAttachInfo[0];
                //1081001	Kevin_C	1070678	修正HtmlEncode名稱錯誤
                //var strFileName = HtmlEncode(DraftAttachInfo[0]);
                var strFileName = htmlencode(DraftAttachInfo[0]);
                var strFileSize = DraftAttachInfo[1];
                var strFileDesc = DraftAttachInfo[2];
                var strFileDraftSeq = document.all.dlAttach[i].value;
                fnAddAttach(strFileName, strFileName, strFileSize, strFileDesc, "Server", strFileDraftSeq);
            }
        }
    }
}

//1010306 David 1010041 新增附件DataGrid全刪函式
function fnDeleteAllAttachItem()
{
    //for (var i = 1; i < document.all.dgAttach.rows.length; i++)
    for (var i = document.all.dgAttach.rows.length - 1; i > 0; i--)
    {
        var deleteRow = document.all.dgAttach.rows[i];
        //* 1071115 	Cloud	補升級二代漏改部分
        //document.all.dgAttach.children.tags("TBODY")[0].removeChild(deleteRow);	
        document.all.dgAttach.children[0].removeChild(deleteRow);
    }
    //1060530 Cloud 1050087 升級二代，一併清空稿件array
    AllFiles = new Array();

}

//1010306 David 1010041 新增加入附件共用函式
function fnAddAttach(argFileName, argFileFullPath, argFileSize, argFileDesc, argFileType, argFileDraftSeq)
{
    var rowCnt = document.all.dgAttach.rows.length;
    //設定row的背景色
    var rowBgColor = (rowCnt % 2) ? "White" : "#C9F3F5";
    //create row
    var row = document.createElement("TR");
    row.style.backgroundColor = rowBgColor;
    //create column
    var TbFD = document.all["TBFileDesc"].value;
    var colSeq = document.createElement("TD");
    colSeq.setAttribute("align", "middle");
    colSeq.setAttribute("nowrap", "nowrap");
    colSeq.className = "InputFieldLabel";
    colSeq.innerText = rowCnt;
    var colFile = document.createElement("TD");
    colFile.setAttribute("align", "Left");
    var spanFileName = document.createElement("SPAN");
    var spanFilePath = document.createElement("SPAN");
    var spanFileSize = document.createElement("SPAN");
    var spanFileDesc = document.createElement("SPAN");
    var spanFileComeFrom = document.createElement("SPAN");
    var spanFileDraftSeq = document.createElement("SPAN");
    spanFileName.name = "FileName";
    //1060512 Cloud 1050087 升級二代
    //spanFileName.innerText	= argFileName;
    spanFileName.textContent = argFileName;
    spanFilePath.name = "FilePath";
    //1060512 Cloud 1050087 升級二代
    //spanFilePath.innerText	= argFileFullPath;
    spanFilePath.textContent = argFileFullPath;
    spanFileSize.name = "FileSize";
    //1060512 Cloud 1050087 升級二代
    //spanFileSize.innerText	= argFileSize;
    spanFileSize.textContent = argFileSize;
    spanFileDesc.name = "FileDesc";
    //1060512 Cloud 1050087 升級二代
    //spanFileDesc.innerText	= argFileDesc;
    spanFileDesc.textContent = argFileDesc;
    spanFileComeFrom.name = "FileComeFrom";
    //1060512 Cloud 1050087 升級二代
    //spanFileComeFrom.innerText	= argFileType;
    spanFileComeFrom.textContent = argFileType;
    spanFileDraftSeq.name = "FileDraftSeq";
    //1060512 Cloud 1050087 升級二代
    //spanFileDraftSeq.innerText	= argFileDraftSeq;
    spanFileDraftSeq.textContent = argFileDraftSeq;
    spanFileName.className = "InputFieldLabel";
    spanFilePath.style.display = "none";
    spanFileSize.style.display = "none";
    spanFileDesc.style.display = "none";
    spanFileComeFrom.style.display = "none";
    spanFileDraftSeq.style.display = "none";
    colFile.appendChild(spanFileName);
    colFile.appendChild(spanFilePath);
    colFile.appendChild(spanFileSize);
    colFile.appendChild(spanFileDesc);
    colFile.appendChild(spanFileComeFrom);
    colFile.appendChild(spanFileDraftSeq);
    if (TbFD == "Y")
    {
        var coldes = document.createElement("TD");
        coldes.setAttribute("align", "middle");
        coldes.setAttribute("nowrap", "nowrap");
        //1071017	Joe		1070678		弱掃修正Client Potential XSS
        // coldes.innerHTML = "<INPUT id=\"dgAttach__ctl"+ (document.all.dgAttach.rows.length+1) +"_txFileDesc\" type=\"TextBox\" value=\""+argFileDesc+"\"/>";
        coldes.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_txFileDesc\" type=\"TextBox\" value=\"" + htmlencode(argFileDesc) + "\"/>";
    }
    /*var coldes = document.createElement("TD");
    coldes.setAttribute("align","middle");
    coldes.setAttribute("nowrap", "nowrap");
    coldes.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_txFileDesc\" type=\"TextBox\" value=\"" + argFileDesc + "\"/>";
    if (TbFD != "Y")
        coldes.setAttribute("class", "hide");*/

    var colDel = document.createElement("TD");
    colDel.setAttribute("align", "middle");
    colDel.setAttribute("nowrap", "nowrap");
    //1040602	Kenny	[1040284]	非投信投顧才顯示刪除按鈕
    var strOrgNickName = document.all.strOrgNickName.value
    colDel.setAttribute("visible", "false");
    if (strOrgNickName != "SITCA")
    {
        colDel.innerHTML = "<INPUT type=\"button\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" />";
        colDel.setAttribute("visible", "true");
    }
    var strOpenPath = argFileFullPath.replace(/\\/g, "\\\\");
    //1060524 Cloud 1050087 修改新增附件不提供開啟功能
    if (argFileType == "Server")
        //1071017	Joe		1070678		弱掃修正Client Potential XSS
        // colDel.innerHTML += "&nbsp;<INPUT type=\"button\" value=\"下載\" onclick=\"OpenFile('"+strOpenPath+"')\" />";
        colDel.innerHTML += "&nbsp;<INPUT type=\"button\" value=\"下載\" onclick=\"OpenFile('" + htmlencode(strOpenPath) + "')\" />";
    //1121220	Leslie	各機關問題彙整表 序346，修正可開啟使用者當前夾帶的附件
    else
        colDel.innerHTML += `&nbsp;<INPUT type="button" value="下載" onclick="OpenFile('${argFileName}','${htmlencode(argFileFullPath)}')" />`;

    //Add to dgAttach
    row.appendChild(colSeq);
    row.appendChild(colFile);
    //1060530 Cloud [1050087] 升級二代調整寫法
    if (TbFD == "Y")
        row.appendChild(coldes);
    row.appendChild(colDel);
    //1060530 Cloud 1050087 升級二代
    //document.all.dgAttach.children.tags("TBODY")[0].appendChild(row);
    document.all.dgAttach.children[0].appendChild(row);

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
    var argMail = argUnit.replace("cbSelectUnit", "cbSelectEmail");
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

//1010420 David 1010008 新增法規函令勾選Event
function fncbSitcaRegulationCheck()
{
    if (document.all.cbSitcaRegulation.checked)
    {
        //1101014	Leslie[1100944]	[投信投顧]補修正升二代缺漏客製化邏輯
        //document.all.cblSitcaRegulation.disabled = "";
        $('#cblSitcaRegulation').find(':checkbox').prop('disabled', '')
    }
    else
    {
        //將項目取消勾選
        for (var iRows = 0; iRows < document.all.cblSitcaRegulation.rows.length; iRows++)
        {
            for (var iCells = 0; iCells < document.all.cblSitcaRegulation.rows[iRows].cells.length; iCells++)
            {
                document.all.cblSitcaRegulation.rows[iRows].cells[iCells].childNodes[0].checked = false;
            }
        }
        //1101014	Leslie[1100944]	[投信投顧]補修正升二代缺漏客製化邏輯
        //document.all.cblSitcaRegulation.disabled = "disabled";
        $('#cblSitcaRegulation').find(':checkbox').prop('disabled', 'disabled')
    }
}
//1020221	Cloud 呼叫ws將機關代碼轉換為機關名稱
function GetFromOrgName(argFromInfo)
{
    //1080318	Joe		1080098		弱掃修正禁用WSDL--S
    /*
    var wsParam = new Array(4);
    wsParam[0] = argFromInfo;
    wsParam[1] = document.all.H_OrgNo.value;
    wsParam[2] = document.all.H_OrgNo.value;
    wsParam[3] = document.all.H_OrgNo.value;
    var strUrl = "http://" + document.all.WEDEP_SERVER_NAME.value + "/WEDEP/WEOrgInfo.asmx";
    var CallWsObj = jf_CallW(strUrl, "GetOrgInfo", false, wsParam);
    */
    //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--S
    // var params = new SOAPClientParameters();
    // params.add('argFullName', argFromInfo);
    // params.add('OrgNo', document.all.H_OrgNo.value);
    // params.add('DeptNo', document.all.H_OrgNo.value);
    // params.add('UserID', document.all.H_OrgNo.value);
    // var strUrl = "http://" + document.all.WEDEP_SERVER_NAME.value + "/WEDEP/WEOrgInfo.asmx";
    // var CallWsObj = SOAPClient.invokeJSON(strUrl, "GetOrgInfo", params ,false, null)
    var wsParam = new Array(4);
    wsParam[0] = argFromInfo;
    wsParam[1] = document.all.H_OrgNo.value;
    wsParam[2] = document.all.H_OrgNo.value;
    wsParam[3] = document.all.H_OrgNo.value;
    var strUrl = "http://" + document.all.WEDEP_SERVER_NAME.value + "/WEDEP/WEOrgInfo.asmx";
    var CallWsObj = jf_CallW(strUrl, "GetOrgInfo", false, wsParam);
    //1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--E
    //1080318	Joe		1080098		弱掃修正禁用WSDL--E


    wsCalOrgInfo = CallWsObj.id;
    OnWSResult(CallWsObj);
}
// 1040609  CLOUD   CLOUD   1040278     增加發布方式按鈕連動
function setUI(argUiID)
{
    switch (argUiID)
    {
        case "rbPasteRcvE"://直接轉貼來文-不可使用以批示文面發佈及含來文電子檔選項
            if (document.all.cbRcvFile)
            {
                document.all.cbRcvFile.checked = false;
                document.all.cbRcvFile.disabled = true;

            }
            //1090422 Zen 1090245 調整"以批示文面方式發佈"選項UI為RadioButton，註解無用邏輯
            //if (document.all.cbPateInstructed)
            //{
            //    document.all.cbPateInstructed.checked = false;
            //    document.all.cbPateInstructed.disabled = true;
            //}
            if (document.all.dlDoc)
            {
                document.all.dlDoc.disabled = true;
            }
            break;
        case "cbDocInfo"://張貼本份公文稿件-使用以批示文面發佈及含來文電子檔選項
            if (document.all.cbRcvFile)
                document.all.cbRcvFile.disabled = false;
            //1090422 Zen 1090245 調整"以批示文面方式發佈"選項UI為RadioButton，註解無用邏輯
            //if (document.all.cbPateInstructed)
            //    document.all.cbPateInstructed.disabled = false;
            if (document.all.dlDoc)
                document.all.dlDoc.disabled = false;
            break;
    }
}

//1071017	Joe		1070678		弱掃修正Client Potential XSS--S
function htmlencode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
//1071017	Joe		1070678		弱掃修正Client Potential XSS--E