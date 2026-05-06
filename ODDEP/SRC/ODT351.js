/*
DATE	SA		PRG		MGR_NO			DESC
0951207	Stella	Zoey	951006			新增開啟文稿基資功能(ODT351.aspx, ODT351.aspx,cs , ODT351.js)
0960113	Stella	David	000146			台科大電子交換
0960616	Caesar	Caesar	000232			IE 7.0修正問題
0960629	Caesar	Charles	960167			(中企處)「提供輸入無法電子交換原因」相關修改
0960703	Stella	Cola	000812			(國合會)Email發文
0960831 Stella  Matte   001262_001259   國合會新增帶出附件電子檔及可批次備註註記
0960917 Stella  Matte   001260          (藥檢局)新增此欄位以提供辨識是否有隨文附件
0961008 Caesar	Caesar	001663			中企處要求第三類發佈時,將稿件受文者預設帶入到公告對象
0961114 Stella  Matte   000408          修改發文後insert DELIV_UNIT table中ORG_NO為正式名稱非全銜
0970108	Stella  Matte   950913          電子檔轉出限制附件總大小小於1mb
0970129 Stella  Matte   0970034         線上簽核公文封裝作業
0970313 Stella  Matte   0970232         線上簽核公文封裝要考慮到OD_ODT351_DEFAULT_SEND的設定
0970828 Stella  Iris    0970784         文稿編輯提供儲存功能
0971020 Stella  Iris    0970810         提供受文者可設定一種電子公佈欄的發文方式
0971024 Stella  Iris    0971010         修改公文多稿附件之附件名稱字串宣告方式
0971024 Stella  Iris    0970985         新增上級機關誤判改分公文註記欄位
0980304	Stella	Yvonne	0971022			附件上傳到附件下載區前判斷是否已存在
0980917 Stella	David	0980455			使用WebFileIO時，應傳入Artifact
0981026 Stella	David	0980530			配合系統參數OD_SUPPORT_EMAIL重新定義，修改相關判斷
0981119 Stella	David	0980532			轉出電子檔時，檢核需電子交換收文者是否需要轉出附件，如無，附件不轉出
0990719 ------	David	      			清除時需保留Artifact隱藏欄位
0990809	------	Davy	0990429			使用者將發文方式切換為紙本時，一併勾選[不適用電子交換]。
0990831	------	David	0990552			1.畫面調整。2.取消電子交換一二類方式。3.整合公布欄。4.發文資料更新時一併執行電子檔轉出。新增用印傳送別。
0990915	------	David	0990589			電子檔轉出附件限制大小，依環境變數設定判斷
0991202	------	David	0990652			調整發文方式(電子公布欄)
0991203	------	David	0990800			發文資料更新時，檢核受文者發文方式與本分文發文方式合理性
0991203	------	David	0990892			密等公文不可採電子發文
0991203	------	David	-------			依參數設定是否自動轉出DI
1000105	Yvonne	David	0990556			1.發文資料更新時，新增傳入稿件段落內容及承辦人資訊。2.新增下載立委質詢案件轉出檔案
1000303	------	David	1000246			受文者發文方式有電子交換及電子公布欄，應以電子交換為主
1000323	Yvonne	Yvonne	1000289			電子檔轉出時，會檢核合理發文別為1234，如有內部公布欄，則發文別=5亦為合理發文別
1000427	David	Linda	1000016			新增一按鈕"重新載入稿件",點擊此按鈕時,呼叫btOpenProc()函式,而略過受文者比對直接由稿件帶出
1000502	David	David	1000211			上傳至附件下載區時，依各稿件分別處理，調整判斷方式
1000511	Yvonne	Yvonne	1000245			調整發文資料更新機制，將原叫用ODT351WS.asmx中UpdateSendDocInfo的處理，搬至ODT351Common.cs中
1000624	------	zola	1000421			同步MAPPLY<UPDATE_DATE>, TASK_DETAIL<TASK_DATE> ,DOC_MAIN<CLOSE_DATE>  
1000831	Yvonne	Jeff	1000419			[CDC]希望可做密收普發，故開放不以密等為密以上(含密)鎖住電子檔轉出按鈕，改提示訊息告知使用者該份公文為密件不適合電子檔轉出
1000906	David	Jeff	1000678			配合僑委會海外公文系統，新增海外發文方式
1001025	David	Jeff	1000884			配合僑委會調整畫面，跳過郵寄方式檢核
1001116 Yvonne	Jeff	1000640			配合增加受文方式細項選單，修改相關檢核邏輯
1010113	David	Jeff	1010047			修改提示訊息
1010306	David	Kevin	1010041			(中企處)新增發布公布欄時多傳入選取稿件
1010314 David	David	-------			修正自動發布公告時，未傳入承辦人資訊及來文機關BUG
1010326	Kevin   Jeff	1010235		    修正誤取消原本抄本不檢核發文方式判斷
1010418	David	David	1000854			附件下載區支援ASP架構，WS呼叫方式配合修改
1010608	David	David	1010539			海外發文可依各稿件判斷後發布
1010829	David	David	1010878			修正fnIssueOrgInit()內檢核邏輯(單號1000640之BUG)
1011015	Kevin	Kevin	1010999			修正電子檔轉出附件大小由公文改為各稿件檢核
1011029	Kevin	Kevin	1010774			系統參數OD_ODT351_TRANSDI_MODE新增TYPE=3：附件大小超過設定值則不轉出附件
1020523 Kevin   Jagle	1000751			配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
1020615 Yvonne	Kevin	1020264			新增發文內外閘道電子檔轉出
1020730 Yvonne	Kevin	1020486			傳送前重新判斷是否僅Email寄送
1020814	Kevin	Erin	1020384			電子檔轉出後檢查檔案是否確實位於目的地，並回傳成功或失敗訊息
1020823 Kevin	Erin	1020384			修正檢查邏輯，與檢查路徑的斜線
1021015 Yvonne	Kevin	1020486			依照受文者發文方式決定是否可按下電子檔轉出
1030127 Kevin	Kevin	1020384			修正檢查邏輯
1030617	David	Eric	1030384			修正取消不適用電子交換會連帶修改發文方式為電子交換邏輯
1030916 David	David	1030393			新增上傳附件下載區獨立功能鍵
1031022	David	Eric	1030818			增加控制會議型式是否顯示
1031028	Leslie	Kenny	1030836			配合SSL修改傳入元件之URL
1040129	David	David	1040033			新增內政部人團系統介接處理
1040303	David	David	1040033			呼叫人團系統WS改透過介接站台處理
1040402 David	Eric	1040173			修改轉出電子檔檔案大小訊息與實際大小不符問題
1040429 David	Eric	1040267			修改清除按鈕導致隱藏欄位h_txRole清除，開啟時會出現錯誤問題
1040521	David	David	1020384			修正1020384產生之BUG，導致檔案不存在時無法正確跳出警示訊息
1040617	Leslie 	Gabby	1040324			增加WebFileIO錯誤訊息處理
1040729	David	David	1030160			如為他機關外陳外會公文，開啟公文製作時需特殊處理
1041225	David	David	1040838			(104年法規)新增重新發文原因相關功能(DM檔)
1050316	David	Kevin_C	1050122			附件大小超過限制時將dg1的附件選項一併取消勾選，避免信件夾帶附件
1050802 David   Zen     1050087         二代公文修改
1050906	David	David	1050087			二代轉DI功能修改
1051019	David	David	1050087			二代修改，文稿編輯改以二代模組開啟
1051021	David	David	1050087			傳送加簽功能支援二代
1051214	David	David	-------			執行功能鍵時，把文號欄位Trim掉
1060119 Eric_P  Eric_P  -------			二代線上公文發文後傳送封裝作業, 改用SI的hash值給client元件(HiCOS LocalServer)加簽
1060522	David	David	1050087			新增「檔案下載」按鈕，供使用者轉出電子檔並另存於系統參數設定路徑
1060601	David	David	1050087			判斷使用機關為FDA、瀏覽器為IE且由一代系統登入，「文稿編輯」功能鍵行為同一代邏輯開啟公文製作
1060609	David	David	1050087			配合TBT150二代升級完成，修改開啟TBT150行為
1060613 Kevin	Justin	1060456			弱掃Client Potential Code Injection修正
1060731	David	David	-------			修正二代ODT351開啟簽核模組的SIGNTYPE資料來源，避免ODT352開啟ODT351時，無法開啟簽核模組
1060904	David	David	1060782			檢核Email依DataGrid紀錄資訊檢核，不由H_txEmail欄位檢核
1061023	David	David	1060906			調整加簽完成後觸發btUpdate行為
1061221	David	David	1061264			調整判斷電郵發文方式不排除抄本，同受文者編輯子視窗邏輯
1070731	Kevin   Joe     1070678 		修正弱掃Hardcoded Absolute Path
1070824	Kevin   Joe     1070678 		修正弱掃Hardcoded Absolute Path
1070920	David	David	1070621			發文資料更新時，如判斷受文者有包含電郵發文，需顯示提示訊息
1071001	Leslie	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
1071029	David	David	1071050			因二代加簽改為非同步處理，調整原一代加簽處理後的程式行為執行順序
1071107	David	David	-------			發文資料更新時，有選擇傳送行為就需進行加簽處理，調整判斷方式
1080116	Kevin	Kevin_C	1070678			修正弱掃Use Of Hardcoded Password
1080125	David	David	1080049			弱掃修正Reflected XSS Specific Clients
1080122	Kevin   Joe     1080049 		修正弱掃Hardcoded Absolute Path
1080214	Kevin	David	1080179			修正弱掃，憑證pincode改依MP使用的物件紀錄，ODT351不自行記錄
1080318	Kevin	Joe		1080098			弱掃修正禁用WSDL
1080531 Kevin	Joe		1080481			弱掃Client Potential Code Injection修正
1080905	Kevin 	Joe		1080657			ODT351改為透過Ajax檢核附件是否重複
1090221 Eric    Eric    1090154         修正ODT351公文傳送, 支援104年法規之SHA256演算法
1090930	David	David	1050087			立委質詢案件轉出二代處理
1091110	David	Joe		1090725			改以二維陣列紀錄附件是否需勾選，避免使用者從無附件->有附件時選項不會正常連動
1091117	David	David	1090521			修改需加簽時才要求金鑰密碼
1091210	David	David	1090891			修改滲透測試，移除無用的本地端路徑資訊
1100304	David	Joe		1100161			修正使用者自行選取上傳附件下載區時，附件不隨文轉出
1100310	David	David	1090610			判斷受文者數量超過上限時，自動開啟ODT352
1110103 Kevin   Zen     1101292         修正多次點擊重複PostBack之問題
1110225	David	David	1101481			新增個人專區發文方式，考試院客製化人工傳遞處理
1110304	David	David	1101451			個人專區發文處理
1110704	David	Joe		1101044			修正附件隨文連動判斷
1120104	David	David	-------			調整加簽檢核邏輯，因RD-HiCosSCard內已於單號1090689新增檢核跨平台元件版本，ODT351不需重複檢核
1121025	David	Zen		--				(陸委會快解)支援開啟舊版之TBT150
1130815 Joe     Joe     1130747     	調整附件下載區上傳方式
1131106	Joe		Joe		序357			修正如受文者不含附件則不需判斷附件大小
1140512	Leslie	David	1140331			支援工作站加簽，調整加簽處理
1141110	David	David	1141112			海外發文支援外貿使用
1141114	David	David	1141126			調整發文結案前檢核，符合擴充電子交換發文方式，視為可電子交換
1150129	Cloud	Cloud	外貿序118		修正當僅有一筆外貿駐外受文者時，會被誤判為不做電子檔轉出，造成Client端阻擋postback問題
*/

//1060609 David 1050087 配合TBT150二代升級完成，修改開啟TBT150行為
window.SSO_CONFIG = opener.SSO_CONFIG;

//1050803 Zen 1050087 二代公文修改--begin
document.all.Tab1.onmouseover = function ()
{
    if (this.src.indexOf("images/IssueOrg.gif") != -1)
        this.src = "images/IssueOrgo.gif";
}

document.all.Tab1.onmouseout = function ()
{
	if (this.src.indexOf("images/IssueOrgo.gif") != -1)
        this.src = "images/IssueOrg.gif";
}

document.all.Tab2.onmouseover = function ()
{
	if (this.src.indexOf("images/Attach.gif") != -1)
        this.src = "images/Attacho.gif";
}

document.all.Tab2.onmouseout = function ()
{
	if (this.src.indexOf("images/Attacho.gif") != -1)
        this.src = "images/Attach.gif";
}

document.all.Tab2.onclick = function ()
{
    this.src = 'images/AttachS.gif';
	document.all.Tab1.src = 'images/IssueOrg.gif';
    document.all.Page1.setAttribute('class', 'hide');
    document.all.Page2.setAttribute('class', '');
	fnAdjustAttachOfIssueOrg();
	$(window).trigger('resize');
}
//1091110	Joe		1090725		因連動為受文者是否有附件->附件隨文是否勾選，故判斷改為點選附件頁簽後觸發較為合理
document.all.Tab1.onclick = function ()
{
    this.src = 'images/IssueOrgS.gif';
	document.all.Tab2.src = 'images/Attach.gif';
    document.all.Page2.setAttribute('class', 'hide');
    document.all.Page1.setAttribute('class', '');
	$(window).trigger('resize');
}
//1091110	Joe		1090725		因連動為受文者是否有附件->附件隨文是否勾選，故判斷改為點選附件頁簽後觸發較為合理
//1050803 Zen 1050087 二代公文修改--end

var IsServerHandling = new Boolean();
IsServerHandling = false;
//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		} else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) {

	}
	finally {

	}
}
//zoey [951006, 95/12/07]
//1050906 David WAIT
//var fso = new ActiveXObject("Scripting.FileSystemObject");
uClientPath = "";

//記錄是否已檢核過DataGrid中的欄位值(通常發生在有註冊onblur事件的欄位，輸入完後直接按下儲存鍵時)
var bHasCheck = false;

//0960703 Stella
var nTransCnt = "0";

//1050802 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//1050906 David WAIT
//document.all.exp.style.display = "none";

//96.01.13 000146 David
var CheckFile = document.all["txCheckFile"].value;
//0970784
var gEDTMPFile = "EDTMP.xml";
var LOCATION = "";
//0970784

//1051021 David 1050087 紀錄是否加簽中
var bSignCert = false;
//1070920 David 1070621 紀錄是否有電郵受文者
var bHasEmailIssue = false;
//1080214 David 1080179 調整pincode紀錄方式
var strIgotu = "";
//1141110 David 1141112 海外發文支援外貿使用，調整文字
var gOsIssueName = "海外";
var gOsIssueFullName = "海外發文";

function ShowMsg()
{
    //1050802 Zen 1050087 二代公文修改
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

if (document.all.dg1)
{
    var dgObj = document.all["dg1"];
    for (var i = 2; i < dgObj.rows.length + 1; i++)
    {
        var strIssueTypeID = "dg1__ctl" + i + "_IssueType";
        var IssueTypeObj = document.all[strIssueTypeID];
        IssueTypeObj.onblur = fnHandleIssueType;
    }
}
//1091110	Joe		1090725		因連動為受文者是否有附件->附件隨文是否勾選，故判斷改為點選附件頁簽後觸發較為合理
/*
if (document.all["Tab1"])
{
    //當點選受文機關的Tab時, 檢查附件資訊Tab中的資料與受文機關Tab的連動影響
    document.all["Tab1"].onclick = fnAdjustAttachOfIssueOrg;
}
*/

function fnHandleIssueType()
{
    var strIssueTypeID = event.srcElement.id;
    strIssueTypeID
    var idx = event.srcElement.id.indexOf("_IssueType");
    var len = "dg1__ctl".length;
    var num = event.srcElement.id.substring(len, idx);

    var strHiddenDataID = "dg1__ctl" + num + "_txHiddenData";
    var hiddenData = document.all[strHiddenDataID].value;
    var arrHiddenData = hiddenData.split(';');
    fnIssueTyprBlur(arrHiddenData[0], arrHiddenData[1], arrHiddenData[2], arrHiddenData[3]);
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
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
	
	//1051021 David 1050087 如為加簽中不觸發功能
	if(bSignCert)
		return;

    switch (xObjectName)
    {
        //0990831 David 0990552 此欄位用不到
        /*case "btPrevious":
			Page_BlockSubmit=false;
			break;
		case "btNext":
			Page_BlockSubmit=false;
			break;*/
        //1050906 David 1050087 二代轉DI修改，已無作用
        /*case "btFepOther":
            Page_BlockSubmit = true;
            document.all["BF"].Title = "請選擇轉出檔案所存放的目錄";
            if (document.all["BF"].ShowDialog(0) != 0)  //有指定值
            {
                if (document.all["BF"].Path.charAt(document.all["BF"].Path.length - 1) != "\\")
                    document.all["txFpeTypeOther"].value = document.all["BF"].Path + "\\";
                else
                    document.all["txFpeTypeOther"].value = document.all["BF"].Path;
            }
            break;*/
            //0990831 David 0990552 取消另送附件相關欄位
            /*case "btTranFolder":
                Page_BlockSubmit=true;
                document.all["BF"].Title = "請選擇轉出檔案所存放的目錄";
                if(document.all["BF"].ShowDialog(0) !=0)  //有指定值
                {
                    if (document.all["BF"].Path.charAt(document.all["BF"].Path.length-1) != "\\")
                        document.all["txTranFolder"].value = document.all["BF"].Path+"\\";
                    else
                        document.all["txTranFolder"].value = document.all["BF"].Path;
                }
                break;*/
        case "btdg1SelectAll":
            Page_BlockSubmit = true;
            for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
            {
                if (!document.all["dg1__ctl" + iRow + "_cbIssueOrg"].disabled)
                    document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked = true;
            }
            break;
        case "btdg1Reverse":
            Page_BlockSubmit = true;
            for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
            {
                if (!document.all["dg1__ctl" + iRow + "_cbIssueOrg"].disabled)
                    document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked = !document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked;
            }
            break;
        case "btPasteBulletin":
            Page_BlockSubmit = true;
            if (fnCheckBeforeBulletin())
                ShowBulletinSetting();
            break;
		//1060522 David 1050087 新增「檔案下載」按鈕
		case "btTranToOther":
			//檢核是否有電子交換受文者
			var HasEIssue = false;
            if (document.all.dg1)
			{
				var dgObj = document.all["dg1"];

				for (var i = 2; i < dgObj.rows.length + 1; i++)
				{
					var strIssueTypeID = "dg1__ctl" + i + "_IssueType";

					if (document.all[strIssueTypeID].value == "1")
					{
						HasEIssue = true;
						break;
					}
						
				}
			}
			if(!HasEIssue)
			{
				alert("無電子交換發文方式受文者，無法執行電子檔「檔案下載」功能");
				return;
			}

            fnAdjustAttachOfIssueOrg();
            if (SecElcAlert())
            {
                if (ConfirmSave())//是否通過轉出電子檔前必要檢查
                {
                    if (document.all.cbIsFep.checked)
                    {
                        Page_BlockSubmit = false;
                        IsServerHandling = true;
                        jf_ShowWaitState();
						document.all.H_TransDiByOther.value = "1";//紀錄是點選「檔案下載」
						//透過原本的電子檔轉出功能轉出電子檔
						document.all.ToolBarSenderID.value = "btTransfer";
						__doPostBack("tbTool","");
                    }
					Page_BlockSubmit = true;
                }
                else
                    Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = true;
            break;
    }
}

//1050802 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;
    if (IsServerHandling)
	{
        console.log('重複PostBack Page_BlockSubmit' + Page_BlockSubmit);

        //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
        Page_BlockSubmit = true;

        return;
	}

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

	//1051021 David 1050087 如為加簽中不觸發功能
	if(bSignCert)
		return;

    //1050802 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

	//1051214 David 執行功能鍵時，把文號欄位Trim掉
	document.all.txDocNo.value = jf_Trim(document.all.txDocNo.value);

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050802 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btTransfer"://電子發文轉出
            //1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
            CheckEmailOnly();
			//1110704	Joe		1101044		修正操作順序，故判斷為點選附件頁簽再進行連動
			//fnAdjustAttachOfIssueOrg();//檢查附件資訊Tab中的資料與受文機關Tab的連動影響
            //1000830	Jeff	1000419		密件做電子檔轉出前提示---start---
            if (SecElcAlert())
            {
                if (ConfirmSave())//是否通過轉出電子檔前必要檢查
                {
					//1110304 David 1101451 新增判斷個人專區發文方式，調整邏輯
                    /*if (document.all.cbIsFep.checked)
                    {
                        Page_BlockSubmit = false;
                        IsServerHandling = true;
                        jf_ShowWaitState();
                    }
                        //Matte 0961218 新增判斷是否只有email寄送
                        //1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
                        //else if(document.all.OnlyEmailIssue)
                    else if (document.all.OnlyEmailIssue.value == "Y")
                    {
                        Page_BlockSubmit = false;
                        IsServerHandling = true;
                        jf_ShowWaitState();
                    }*/
					//1141110 David 1141112 支援海外發文
					//if(document.all.cbIsFep.checked || document.all.OnlyEmailIssue.value == "Y" || $("#HasPAIssue").val() == "Y")
					if(document.all.cbIsFep.checked || document.all.OnlyEmailIssue.value == "Y" || $("#HasPAIssue").val() == "Y" || $("#HasOSIssue").val() == "Y")
					{
						Page_BlockSubmit = false;
                        IsServerHandling = true;
                        jf_ShowWaitState();
					}
                    else
                        Page_BlockSubmit = true;
                }
                else
                    Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = true;
            //---end--	
            //1050802 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSetup"://設定電子發文路徑
            Page_BlockSubmit = true;
            jf_SetupPath(CheckFile);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050802 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            //1040429 Eric 1040267	避免隱藏欄位h_txRole被清除，造成開啟公文時錯誤
            var strRole = document.all.h_txRole.value;
            //0990719 David 避免隱藏欄位Artifact被清除，造成發文資料更新傳送錯誤
            var strArtifact = document.all.H_Artifact.value;
            Page_BlockSubmit = true;
            jf_ConfirmClean(false);
            document.all.txSubject.value = "";
            document.all.txIssueWord.value = "";
            document.all.txIssueNo.value = "";
            document.all["H_Name"].options.length = 0;
            //0990719 David 設定隱藏欄位Artifact
            document.all.H_Artifact.value = strArtifact;
            //1040429 Eric 1040267	避免隱藏欄位h_txRole被清除，造成開啟公文時錯誤
            document.all.h_txRole.value = strRole;
            //1050802 Zen 1050087 二代公文修改
            //document.all["txDocNo"].focus();
            $('#txDocNo').focus();
            break;
        case "btUpdate"://發文資料更新
            //1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
            CheckEmailOnly();
            //1000511	[1000245]	Yvonne	依照Frank所述的標準程式處理邏輯，先設定IsServerHandling再作合理性檢核
            IsServerHandling = true;
            //0991203 David 0990800 檢核受文者發文方式與本分文發文方式合理性
            if (!CheckOrgIssueType())
            {
                //1000511	[1000245]	Yvonne	先設定IsServerHandling再作合理性檢核，檢核不通過要設定回來
                IsServerHandling = false;
				//1061221 David 1061264 補上Page_BlockSubmit設定
				Page_BlockSubmit = true;
                return;
            }
            //0990831 David 0990552 發文資料更新後一併執行電子檔轉出--START
            //判斷發文方式是否為電子交換
            var bEIssue = false;
            //0991203 David 依設定判斷是否自動轉出DI
            //if(&& document.all.rbActualIssue2.checked)
            var bAutoTrans = (document.all.H_AutoTransDi.value == "Y") ? true : false;
            if (bAutoTrans)
            {
                if (document.all.rbActualIssue2.checked)
                {
					//1110704	Joe		1101044		修正操作順序，故判斷為點選附件頁簽再進行連動
					//fnAdjustAttachOfIssueOrg();
                    bEIssue = ConfirmSave();
                }
            }
            else
                bEIssue = true;

            //1000105 David 0990556 新增檢核立委質詢案件相關設定
			//1090930 David 1050087 立委質詢轉出改由WS統一處理，此處不需要
            /*if (document.all["LEGISLATOR_NO"])
            {
				//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
                //var LGObj = ODT351.GetLGDownLoadPath(document.all["H_Artifact"].value).value;
				var LGObj = OD.ODT351.GetLGDownLoadPath(document.all["H_Artifact"].value).value;
                if (LGObj.ErrMsg != "")
                {
                    alert(LGObj.ErrMsg);
                    //1000511	[1000245]	Yvonne	先設定IsServerHandling再作合理性檢核，檢核不通過要設定回來
                    IsServerHandling = false;
					//1061221 David 1061264 補上Page_BlockSubmit設定
					Page_BlockSubmit = true;
                    return;
                }
            }*/
            if (document.all.rbActualIssue1.checked || (document.all.rbActualIssue2.checked && bEIssue) || document.all.rbActualIssue3.checked)
            {
				//1071029 David 1071050 因二代加簽改為非同步處理，調整原一代加簽處理後的程式行為執行順序
				UploadToDL();
				if(document.all.H_OrgNickName.value == "NCHU" && bHasEmailIssue)
					alert("本公文有電郵發文，請使用EDT360進行電子郵件確認及寄送");

                if (jf_UpdateSendDocInfo())
                {
					//1071029 David 1071050 因二代加簽改為非同步處理，調整原一代加簽處理後的程式行為執行順序
                    //UploadToDL();

                    //1000906 [1000678] Jeff 判斷是否做過海外發文
					//1141110 David 1141112 移除一代海外CLIENT發布處理
                    //CheckOsSecondSend();

                    if (bAutoTrans && document.all.rbActualIssue2.checked && bEIssue)
                    {
                        //1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
                        //if(document.all.cbIsFep.checked || document.all.OnlyEmailIssue)
						//1150129	Cloud	外貿序118		修正當僅有一筆外貿駐外受文者時，會被誤判為不做電子檔轉出，造成Client端阻擋postback問題
                        //if (document.all.cbIsFep.checked || document.all.OnlyEmailIssue.value == "Y")
						if (document.all.cbIsFep.checked || document.all.OnlyEmailIssue.value == "Y" || $("#HasPAIssue").val() == "Y" || $("#HasOSIssue").val() == "Y")
                        {
                            Page_BlockSubmit = false;
                            //1000511	[1000245]	Yvonne	此處不需處理，Template中jf_ToolBarSubmit的會作
                            //IsServerHandling = true;
                            //jf_ShowWaitState();
                        }
                        else
							Page_BlockSubmit = true;
                    }
                    else
						Page_BlockSubmit = false;
                }
                else
					Page_BlockSubmit = true;
            }
            else
				Page_BlockSubmit = true;
            //1000511	[1000245]	Yvonne	先設定IsServerHandling再作合理性檢核，檢核不通過要設定回來
            if (Page_BlockSubmit == true)
                IsServerHandling = false;
			else
			{
				//1070920 David 1070621 發文資料更新時，如判斷受文者有包含電郵發文，需顯示提示訊息
				//1071029 David 1071050 因二代加簽改為非同步處理，調整原一代加簽處理後的程式行為執行順序
				//if(document.all.H_OrgNickName.value == "NCHU" && bHasEmailIssue)
					//alert("本公文有電郵發文，請使用EDT360進行電子郵件確認及寄送");
			}
            //0990831 David 0990552 發文資料更新後一併執行電子檔轉出--END

            //1040129 David 1040033 呼叫人團系統介接WS
			//1071029 David 共通版無人團系統
            //CallMoiGroupWS();

            //1050802 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            /*
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = true;
			*/
            Page_BlockSubmit = false;
            //1050802 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            /*
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = true;
			*/
            Page_BlockSubmit = false;
            //1050802 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //Zoey [951006, 95/12/07] 新增文稿編輯
        case "btViewPaper":
            Page_BlockSubmit = true;
            jf_ViewPaper();
			//1051021 David 1050087 補上break
			break;
            //1000427 Linda [1000016] 新增一重新載入功能鍵
        case "btRefresh":
            Page_BlockSubmit = false;
            //1050802 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1030916 David 1030393 新增上傳附件下載區獨立功能鍵
        case "btUpdateDL":
            Page_BlockSubmit = !UploadToDL();
            //1050802 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
    /*
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "SYM020C1")
	{
		document.all["txUserName"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txUserNameTxChange"].value = document.all["txUserName"].value;
		//回傳值為鍵值時，觸動TextChange事件
		//__doPostBack();//for .NET Framework 1.0
		__doPostBack("","");//for .NET Framework 1.1
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
	*/

	//1051021 David 1050087 PinCode回傳處理
	if (argCallerId == "ODT351C3")
	{
		var RtnType =  document.all["lbReturnValue"].options[0].value;
		if(RtnType == "1")
		{
			//1080214 David 1080179 調整pincode紀錄方式
			//document.all.txPinCode.value = document.all["lbReturnValue"].options[1].value;;
			fnSetUserIguto(document.all["lbReturnValue"].options[1].value)
			setSignWork();
		}
		else
		{
			alert("線上簽核公文封裝作業，失敗原因：使用者取消輸入金鑰密碼或金鑰密碼為空");
		}
	}

	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
	//1080125 David 1080049 弱掃修正
	//1080214 David 1080179 調整pincode紀錄方式
	//document.all['txPinCode'].value = HtmlDecode(document.all['txPinCode'].value);
	if(opener != null && opener.theSSO != null)
	{
		if(typeof(opener.theSSO.User.igotu) === "string")
		{
			strIgotu = opener.theSSO.User.igotu;
		}
	}
	else if(opener.opener != null && opener.opener.theSSO != null)
	{
		if(typeof(opener.opener.theSSO.User.igotu) === "string")
		{
			strIgotu = opener.opener.theSSO.User.igotu;
		}
	}

	//1141110 David 1141112 海外發文支援外貿使用，調整文字
	if (document.all.H_OrgNickName.value == "TAITRA")
	{
		gOsIssueName = "駐外";
		gOsIssueFullName = "駐外下載";
	}

    //1001207	Jeff
    SetIssueDetail();
    //Cola 新增開啟郵件預覽 -- start --	
    if (document.all.H_txWantToPreview != null)
    {
        if (document.all.H_txWantToPreview.value == "Y" && document.all.H_txContentOfMail.value != "")
        {
            var pUrl = "";
            //pUrl = "\lib\\view.htm?MainName="+document.all.H_txContentOfMail.value;
            pUrl = "../lib/view.htm?MainName=H_txContentOfMail";
            jf_OpenWindow(pUrl, "view", "fullscreen=no,Height=250,width=450");
            document.all.H_txWantToPreview.value = "";
        }
    }
    //Cola -- end --

    if (jf_GetActionMode() == LayoutModeNew)
        document.all.MultiPage.style.display = "none";
    else
        document.all.MultiPage.style.display = "";

    ClientOnLoadCommon();
    //jf_CallWS(jf_Trim(document.all.H_InsideTBWS.value),"PasteInit", false, null);
    //jf_CallWS(jf_Trim(document.all.H_InsideTBWS.value),"PasteOD", false, null);	//byLeslie 1010229
    //jf_CallWS(jf_Trim(document.all.H_OutsideTBWS.value),"PasteOD", false, null);

    if (document.all.HCloseWindow && document.all.HCloseWindow.value == "1")
    {
        //1050906 David 1050087 二代公文修改
        //window.close();
        jf_CloseSelf();
    }
    //1050802 Zen 10500087 二代公文修改
    //if (document.all["ValidationSummary1"].innerText != "")//有錯誤訊息
    if (document.all["ValidationSummary1"].textContent != "")//有錯誤訊息
        document.all["H_Name"].options.length = 0;
    //要下載
    //1000511	[1000245]	Yvonne	調整發文資料更新機制，在此多處理轉出立委質詢電子檔處理及整合公佈欄
    if (document.all.H_POST_BULLETIN)
    {
        if (document.all.H_txDocNo && document.all.H_txSubject && document.all.H_txIssueDate)
        {
            IsServerHandling = true;
			//1080604	Joe		1080481		公布欄功能改為直接開啟TBT150
            // PostBulletin();
        }
        else
            document.all.H_AllMessage.value += "|資訊不足，張貼公布欄失敗。";
    }
	//1141110 David 1141112 移除一代海外邏輯
    /*//1000906 Jeff 1000678 海外發文資料傳送
    if (document.all["H_HAS_OVERSEA"] && document.all.txOsSecIssue && document.all.txOsSecIssue.value == "Y")
    {
		//1080318	Joe		1080098		弱掃修正禁用WSDL--S
        //var arWSParam = new Array();
        //arWSParam[0] = document.all["H_OrgNo"].value;
        //arWSParam[1] = document.all["H_txDocNo"].value;
        //var argDocInfo = new OsDocInfo();
        //var argIssueInfo = new OsIssueInfo();
        //callObj = jf_CallWS("ODT351WS.asmx", "GetIssueInfo", false, arWSParam);
        //var _Search = callObj.value;
        var argDocInfo = new OsDocInfo();
        var argIssueInfo = new OsIssueInfo();
		var params = new SOAPClientParameters();
		params.add('argSessionID',  jf_GetArtifact());
		params.add('argOrgNo', document.all["H_OrgNo"].value);
		params.add('argDocNo', document.all["H_txDocNo"].value);
		var callObj = SOAPClient.invokeJSON("ODT351WS.asmx", "GetIssueInfo", params ,false, null)
        var _Search = callObj.value;
		//1080318	Joe		1080098		弱掃修正禁用WSDL--S

        //1010608 David 1010539 判斷取得海外受文者是否成功，失敗則不叫用海外WS
        if (!_Search.bSuccess)
        {
            document.all.H_AllMessage.value += "|海外發文失敗，錯誤訊息:" + _Search.ErrMsg;
        }
        else
        {
            argIssueInfo = _Search.rtnObj;
			//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
            //var argDocInfo = ODT351.GetDocInfo(document.all["H_OrgNo"].value, document.all["H_txDocNo"].value, document.all["H_Artifact"].value).value;
			var argDocInfo = OD.ODT351.GetDocInfo(document.all["H_OrgNo"].value, document.all["H_txDocNo"].value, document.all["H_Artifact"].value).value;
            argDocInfo.IssueUserName = document.all["USERNAME"].value;

            //1010608 David 1010539 附件資訊依各稿件紀錄，調整邏輯--START
            //var argAttInfo = new AttInfo();
			//if(document.all["H_AttFile"])
			//{
			//	if(document.all.H_AttFile.value.indexOf(",") != -1)
			//	{
			//		var argAtt=	document.all["H_AttFile"].value.split(",");
			//		var count=0;
			//		for(var iAtt=argAtt.length-1;iAtt>-1;iAtt--)
			//		{		
			//			argAttInfo.FileName[count]=argAtt[iAtt];
			//			argAttInfo.FilePath[count]="";
			//			count++;
			//		}
			//	}
			//	else
			//	{
			//		argAttInfo.FileName[0]=document.all["H_AttFile"].value;
			//		argAttInfo.FilePath[0]="";
			//	}
			//}

            var argOsAttInfo = new OsAttInfo();
            if (document.all["H_OsAttFile"])
            {
                //紀錄方式: 稿號|檔案名?檔案名;稿號|檔案名?檔案名
                var OsAttFileDraft = document.all["H_OsAttFile"].value.split(";");

                for (var iOsAtt = 0 ; iOsAtt < OsAttFileDraft.length ; iOsAtt++)
                {
                    var strOsDraft = OsAttFileDraft[iOsAtt].split("|")[0];
                    var strOsDraftAtt = OsAttFileDraft[iOsAtt].split("|")[1];
                    var OsDraftFile = strOsDraftAtt.split("?");

                    for (var iFiles = 0 ; iFiles < OsDraftFile.length ; iFiles++)
                    {
                        argOsAttInfo.FileName[argOsAttInfo.FileName.length] = OsDraftFile[iFiles];
                        argOsAttInfo.FilePath[argOsAttInfo.FilePath.length] = "";
                        argOsAttInfo.DraftNo[argOsAttInfo.DraftNo.length] = strOsDraft;
                    }
                }
            }
            //1010608 David 1010539 附件資訊依各稿件紀錄，調整邏輯--END

            var rtnObject = jf_PublishOS(document.all["H_Artifact"].value, document.all["H_OrgNo"].value, argDocInfo, argIssueInfo, argOsAttInfo);

            if (!rtnObject.bSuccess)
            {
                //1010608 David 1010539 修正錯誤訊息處理方式
                //alert(rtnObject.ErrMsg);
                //return;
                document.all.H_AllMessage.value += "|海外發文失敗，錯誤訊息:" + rtnObject.ErrMsg;
            }
            else
                document.all.H_AllMessage.value += "|海外發文成功。";
        }
        document.all["H_HAS_OVERSEA"].value = "";
    }*/
    //if (document.all.HDownload)
    if (document.all.HDownload || document.all.H_LG_Download)
    {
        IsServerHandling = true;
        fnOnDownload();
        if (jf_GetActionMode() == LayoutModeNew)
        {
            //0990831 David 0990552 取消另送附件相關欄位，代擬代判公文以Http傳送欄位，電子交換一二三類
            /*document.all.txTranFolder.value = "";
			document.all.cbHttpTrans.checked = false;
			document.all.txDecide.value = "";
			document.all.rbFepType1.checked = false;
			document.all.rbFepType2.checked = false;
			document.all.rbFepType3.checked = false;*/
            document.all.txIssueDate.value = "";
            document.all.txDraftCnt.value = "";
            document.all["H_Name"].options.length = 0;
            document.all.cbIsFep.checked = false;
            //1050906 David 1050087 二代轉DI修改，已無作用
            //document.all.rbFepType4.checked = false;
            //document.all.txFpeTypeOther.value = "";
        }
    }
    else
    {
        var Message = "";
        document.all["H_Name"].options.length = 0;
        if (document.all.H_AllMessage.value != "")
        {
            if (document.all.H_AllMessage.value.indexOf("|") != -1)
            {
                var OldMessage = document.all.H_AllMessage.value.split("|");
                for (var iMsg = OldMessage.length - 1 ; iMsg > -1 ; iMsg--)
					Message = OldMessage[iMsg] + "\n\n" + Message;
            }
            else
            {
                Message = document.all.H_AllMessage.value;
            }

            document.all.H_AllMessage.value = "";
        }
        if (document.all.HEmail)
        {
            window.status = '電子郵件發文寄送成功';
            //alert('電子郵件寄送成功共'+document.all.HEmail.value+'件');
            Message += "\n\n電子郵件寄送成功共" + document.all.HEmail.value + "件";
        }
        if (Message != "")
		{
			Message = Message.replace(/@/g, "\n");
            alert(Message);
		}
    }

    if (jf_GetActionMode() == LayoutModeNew)
    {
        //jf_Clean();
        //1050906 David 1050087 二代轉DI修改，已無作用
        //document.all.txFpeTypeOther.value = "";
        //0990831 David 0990552 取消另送附件相關欄位，代擬代判公文以Http傳送欄位，電子交換一二三類
        /*document.all.txTranFolder.value = "";
		document.all.txDecide.value = "";
		document.all.cbHttpTrans.checked = false;
		document.all.rbFepType1.checked = false;
		document.all.rbFepType2.checked = false;
		document.all.rbFepType3.checked = false;*/
        document.all.txIssueDate.value = "";
        document.all.txDraftCnt.value = "";
        document.all.cbIsFep.checked = false;
        //1050906 David 1050087 二代轉DI修改，已無作用
        //document.all.rbFepType4.checked = false;
        document.all["H_Name"].options.length = 0;
        document.all.rbActualIssue1.checked = false;
        document.all.rbActualIssue2.checked = false;
        document.all.cbCanEIssue.checked = false;
    }
    //1050906 David 1050087 二代轉DI修改，已無作用
    //LoadXML(CheckFile);
    //0990831 David 0990552 取消另送附件相關欄位，此function無用
    //jf_TranFolder();
    //jf_Decide();
    //jf_FpeTypeOther();
    IsServerHandling = false;
    //jf_cbCanEIssue();//不由"不適用電子交換"開頭 ，因為此選項由
    jf_rbActualIssue();
    fnIssueOrgInit();

    //[需求單960167] Charles (中企處)依機關代碼決定是否要顯示無法電子交換原因輸入欄位 0960629
    //1001116	Jeff	1000640	變更顯示判斷條件，並增加受文明細下拉選單顯示判斷
    //if(document.all.H_OrgNo.value == "313050000G")
    if (document.all.SHOW_REASON.value == "Y")
        document.all.trReason.className = "";
    else
        document.all.trReason.className = "hide";
    if (document.all.SHOW_P.value == "Y")
        document.all.dlPdetail.className = "";
    else
        document.all.dlPdetail.className = "hide";
    if (document.all.SHOW_E.value == "Y")
        document.all.dlEdetail.className = "";
    else
        document.all.dlEdetail.className = "hide";
    if (document.all.SHOW_T.value == "Y")
        document.all.dlTdetail.className = "";
    else
        document.all.dlTdetail.className = "hide";

    //0990831 David 0990552 依是否整合公布欄判斷發布公告顯示
    if (document.all["H_HasTB"].value == "1")
    {
        document.all.trTB.className = "";
        if (document.all.H_ComBine.value == "N")
            document.all.PasteTBSpan.className = "hide";
        else
        {
            document.all.PasteTBSpan.className = "";
            if (document.all.TB_HAS_OUTSIDE.value == "0")
                document.all.TBOutsideSPan.className = "hide";
        }
    }
    else
        document.all.trTB.className = "hide";

    //1031022 Eric 1030818	設定會議型式
    if (document.all.dlMeetingType.selectedIndex == 1)
        document.all.trMeetingType.className = "";
    else if (document.all.dlMeetingType.selectedIndex == 2)
        document.all.trMeetingType.className = "";
    else
        document.all.trMeetingType.className = "hide";

	//1100310 David 1090610 判斷受文者數量超過上限時，自動開啟ODT352
	if (document.all.H_AutoOpenODT352 && document.all.H_AutoOpenODT352.value != "")
	{
		var strUrl = "ODT352.aspx?DocNo=" + document.all.H_AutoOpenODT352.value;
		jf_OpenChildWin(strUrl, "", 1024, 768 );
	}
}
function fnOnDownload()
{
    try
    {
        //1000624	zola	1000421 順便修掉訊息對話框有 undefine 訊息
        var pFileDownMsg = '';

        //1080116	Kevin_C	1070678	修正弱掃Use Of Hardcoded Password
        //if (document.all.HDownload)
        //{
        //    var soap = new ActiveXObject("WSWrapper.WebFileIO");
        //    var soapAttach = new ActiveXObject("WSWrapper.WebFileIO");
        //    var soapSW = new ActiveXObject("WSWrapper.WebFileIO");
        //    //1041225 David 1040838 新增下載DM檔
        //    var soapDM = new ActiveXObject("WSWrapper.WebFileIO");
        //    //1020814 Erin [1020384] 電子檔轉出路徑
        //    var strDiPath = document.all["H_DILocalPath"].value;
        //    var strAttPath = document.all["H_AttachLocalPath"].value;
        //    //1020823 Erin [1020384] 路徑最後沒\的話 多加一個
        //    if (strDiPath.lastIndexOf("\\") != strDiPath.length - 1)
        //        strDiPath += "\\";
        //    if (strAttPath.lastIndexOf("\\") != strAttPath.length - 1)
        //        strAttPath += "\\";
        //    var nDiCnt = 0; var pDiName = "";
        //    var nSWCnt = 0; var pSWName = "";
        //    var nAttCnt = 0; var pAttName = "";
        //    //1041225 David 1040838 新增下載DM檔
        //    var nDMCnt = 0; var pDMName = "";
        //    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
        //    //soap.Init(document.all["H_ServiceURL"].value);
        //    //soapAttach.Init(document.all["H_ServiceURL"].value);
        //    //soapSW.Init(document.all["H_ServiceURL"].value);
        //    var serviceURL = document.all["H_ServiceURL"].value;
        //    if (document.all.II_USE_SSL != null)
        //    {
        //        if (document.all.II_USE_SSL.value == "Y")
        //            serviceURL = serviceURL.replace("http://", "https://");
        //    }
        //    soap.Init(serviceURL);
        //    soapAttach.Init(serviceURL);
        //    soapSW.Init(serviceURL);
        //    //1041225 David 1040838 新增下載DM檔
        //    soapDM.Init(serviceURL);

        //    //可以AddFile多筆
        //    for (var i = 0 ; i < document.all["H_Name"].options.length ; i++)
        //    {
        //        if (document.all["H_Name"].options[i].text == "DI")
        //        {
        //            soap.AddFile(document.all["H_DIServerPath"].value, document.all["H_Name"].options[i].value);
        //            nDiCnt++;
        //            //1020814 Erin [1020384] 移至下方重組訊息，因要新增檔案大小訊息，要等檔案下載完才可取得檔案大小
        //            //pDiName += document.all["H_Name"].options[i].value+'\n';
        //        }
        //        else
        //        {
        //            if (document.all["H_Name"].options[i].text == "SW")
        //            {
        //                soapSW.AddFile(document.all["H_AttachServerPath"].value, document.all["H_Name"].options[i].value);
        //                nSWCnt++;
        //                //1020814 Erin [1020384] 移至下方重組訊息，因要新增檔案大小訊息，要等檔案下載完才可取得檔案大小
        //                //pSWName += document.all["H_Name"].options[i].value+'\n';
        //            }
        //            if (document.all["H_Name"].options[i].text == "Attach")
        //            {
        //                soapAttach.AddFile(document.all["H_AttachServerPath"].value, document.all["H_Name"].options[i].value);
        //                nAttCnt++;
        //                //1020814 Erin [1020384] 移至下方重組訊息，因要新增檔案大小訊息，要等檔案下載完才可取得檔案大小
        //                //pAttName += document.all["H_Name"].options[i].value + '\n';
        //            }
        //            //1041225 David 1040838 新增下載DM檔
        //            if (document.all["H_Name"].options[i].text == "DM")
        //            {
        //                soapDM.AddFile(document.all["H_AttachServerPath"].value, document.all["H_Name"].options[i].value);
        //                nDMCnt++;
        //            }
        //        }
        //    }
        //    //下載DI檔
        //    //0980917	David	0980455	使用WebFileIO時，應傳入Artifact--Start
        //    //soap.Download("", false, document.all["H_DILocalPath"].value);
        //    soap.Download(document.all["H_Artifact"].value, false, document.all["H_DILocalPath"].value);
        //    //下載附件檔
        //    if (nAttCnt > 0)
        //    {
        //        //0990831 David 0990552 取消另送附件相關欄位
        //        /*if (document.all.cbTranFolder.checked)
		//		{
		//			//soapAttach.Download(jf_GetSessionID(), false, document.all["txTranFolder"].value);
		//			soapAttach.Download(document.all["H_Artifact"].value, false, document.all["txTranFolder"].value);
		//		}
		//		else*/
        //        {
        //            //soapAttach.Download(jf_GetSessionID(), false, document.all["H_AttachLocalPath"].value);
        //            soapAttach.Download(document.all["H_Artifact"].value, false, document.all["H_AttachLocalPath"].value);
        //        }
        //    }
        //    //下載交換檔
        //    if (nSWCnt > 0)
        //    {
        //        //soapSW.Download(jf_GetSessionID(), false, document.all["H_AttachLocalPath"].value);
        //        soapSW.Download(document.all["H_Artifact"].value, false, document.all["H_AttachLocalPath"].value);
        //    }
        //    //1041225 David 1040838 新增下載DM檔
        //    if (nDMCnt > 0)
        //    {
        //        soapDM.Download(document.all["H_Artifact"].value, false, document.all["H_AttachLocalPath"].value);
        //    }

        //    //1020814 Erin [1020384] 重組訊息並檢查檔案是否存在 --start
        //    var result = false;
        //    //1040521 David 1020384 不需要此參數
        //    //var bCatch = false; 
        //    var strFile = "";//1020823 Erin [1020384] 檢查哪些檔案不存在
        //    //1040521 David 1020384 新增變數紀錄錯誤訊息
        //    var strFileNotExist = "";
        //    var strCheckFileErr = "";
        //    var objDi = null; var objSw = null; var objAtt = null;
        //    try
        //    {
        //        for (var i = 0 ; i < document.all["H_Name"].options.length ; i++)
        //        {
        //            if (document.all["H_Name"].options[i].text == "DI")
        //            {
        //                if (fso.FileExists(strDiPath + document.all["H_Name"].options[i].value))
        //                {
        //                    objDi = fso.GetFile(strDiPath + document.all["H_Name"].options[i].value);
        //                    //1040402 Eric 1040173	修改轉出電子檔檔案大小訊息與實際大小不符問題
        //                    //pDiName += document.all["H_Name"].options[i].value + " (" + objDi.size + " KB)" + '\n';
        //                    pDiName += document.all["H_Name"].options[i].value + " (" + Math.floor(objDi.size / 1024) + " KB)" + '\n';
        //                }
        //                result = fso.FileExists(strDiPath + document.all["H_Name"].options[i].value);//檢查檔案是否存在
        //                if (!result) //1020823 Erin [1020384] 記錄哪些檔案不存在
        //                    strFile += document.all["H_Name"].options[i].value + "\n";
        //            }
        //            else
        //            {
        //                if (document.all["H_Name"].options[i].text == "SW")
        //                {
        //                    if (fso.FileExists(strAttPath + document.all["H_Name"].options[i].value))
        //                    {
        //                        objSw = fso.GetFile(strAttPath + document.all["H_Name"].options[i].value);
        //                        //1040402 Eric 1040173	修改轉出電子檔檔案大小訊息與實際大小不符問題
        //                        //pSWName += document.all["H_Name"].options[i].value + " (" + objSw.size + " KB)" + '\n';
        //                        pSWName += document.all["H_Name"].options[i].value + " (" + Math.floor(objSw.size / 1024) + " KB)" + '\n';
        //                    }
        //                    result = fso.FileExists(strAttPath + document.all["H_Name"].options[i].value);//檢查檔案是否存在
        //                    if (!result) //1020823 Erin [1020384] 記錄哪些檔案不存在
        //                        strFile += document.all["H_Name"].options[i].value + "\n";
        //                }
        //                if (document.all["H_Name"].options[i].text == "Attach")
        //                {
        //                    if (fso.FileExists(strAttPath + document.all["H_Name"].options[i].value))
        //                    {
        //                        objAtt = fso.GetFile(strAttPath + document.all["H_Name"].options[i].value);
        //                        //1040402 Eric 1040173	修改轉出電子檔檔案大小訊息與實際大小不符問題
        //                        //pAttName += document.all["H_Name"].options[i].value + " (" + objAtt.size + " KB)" + '\n';
        //                        pAttName += document.all["H_Name"].options[i].value + " (" + Math.floor(objAtt.size / 1024) + " KB)" + '\n';
        //                    }
        //                    result = fso.FileExists(strAttPath + document.all["H_Name"].options[i].value);//檢查檔案是否存在
        //                    if (!result) //1020823 Erin [1020384] 記錄哪些檔案不存在
        //                        strFile += document.all["H_Name"].options[i].value + "\n";
        //                }
        //                //1041225 David 1040838 新增下載DM檔
        //                if (document.all["H_Name"].options[i].text == "DM")
        //                {
        //                    if (fso.FileExists(strAttPath + document.all["H_Name"].options[i].value))
        //                    {
        //                        objSw = fso.GetFile(strAttPath + document.all["H_Name"].options[i].value);
        //                        //1040402 Eric 1040173	修改轉出電子檔檔案大小訊息與實際大小不符問題
        //                        //pSWName += document.all["H_Name"].options[i].value + " (" + objSw.size + " KB)" + '\n';
        //                        pDMName += document.all["H_Name"].options[i].value + " (" + Math.floor(objSw.size / 1024) + " KB)" + '\n';
        //                    }
        //                    result = fso.FileExists(strAttPath + document.all["H_Name"].options[i].value);//檢查檔案是否存在
        //                    if (!result)//記錄哪些檔案不存在
        //                        strFile += document.all["H_Name"].options[i].value + "\n";
        //                }
        //            }
        //        }
        //        //1030127 Kevin 1020384 檢查完成後調整Flag避免無檔案時跳出檢核失敗
        //        //1040521 David 1020384 不需要此參數
        //        //bCatch = true;

        //        //1040521 David 1020384 紀錄錯誤訊息
        //        if (strFile != "")
        //            strFileNotExist = "電子檔轉出失敗！\n檔案不存在於轉出路徑，請重新轉出。\n檢查不存在的檔案如下：\n" + strFile;

        //    }
        //    catch (err) //檢查過程中有誤
        //    {
        //        //1040521 David 1020384 調整錯誤訊息處理邏輯一致
        //        //alert("無法檢查檔案是否轉出，請至轉出路徑檢查。若檔案不存在，請重新轉出。\n錯誤訊息為：" + err.message);
        //        strCheckFileErr = "無法檢查檔案是否轉出，請至轉出路徑檢查。若檔案不存在，請重新轉出。\n錯誤訊息為：" + err.message;
        //        //result = false; bCatch = true; 1020823 Erin [1020384] 修改邏輯
        //        //1040521 David 1020384 不需要此參數
        //        //bCatch = true;
        //    }
        //    //1020814 Erin [1020384] 重組訊息並檢查檔案是否存在 --end
        //    //0990831 David 0990552 配合發文資料更新時一併電子檔，修改訊息顯示方式--start
        //    //var pFileDownMsg = ''; 1000624	zola	1000421 順便修掉訊息對話框有 undefine 訊息--Remark
        //    if (nDiCnt > 0)
        //        pFileDownMsg += nDiCnt + '個DI檔：\n' + pDiName;
        //    if (nSWCnt > 0)
        //        pFileDownMsg += nSWCnt + '個SW檔：\n' + pSWName;
        //    //1041225 David 1040838 新增下載DM檔
        //    if (nDMCnt > 0)
        //        pFileDownMsg += nDMCnt + '個DM檔：\n' + pDMName;
        //    if (nAttCnt > 0)
        //        pFileDownMsg += nAttCnt + '個附件檔：\n' + pAttName;
        //    if (pFileDownMsg != '')
        //        pFileDownMsg = '共 下載：\n' + pFileDownMsg;
        //    if (pFileDownMsg != '')
        //    {
        //        //alert('檔案下載完成！\n'+pFileDownMsg);
        //        //if(document.all.H_ElecType.value=="3")
        //        //	setTimeout("fnInvoke3rdBulletin()",1000);
        //        if (document.all.HEmail)
        //        {
        //            window.status = '電子檔轉出及電子郵件發文寄送成功';
        //            //alert('檔案下載完成！\n'+pFileDownMsg+'\n 電子郵件寄送成功共'+document.all.HEmail.value+'件\n');
        //            pFileDownMsg = "電子檔轉出完成！\n" + pFileDownMsg + "\n 電子郵件寄送成功共" + document.all.HEmail.value + "件\n";
        //        }
        //        else
        //            //alert('檔案下載完成！\n'+pFileDownMsg);
        //            pFileDownMsg = "電子檔轉出完成！\n" + pFileDownMsg;
        //    }
        //    else
        //    {
        //        //0981026 David 0980530 配合系統參數OD_SUPPORT_EMAIL重新定義，修改判斷
        //        //if(document.all.OD_SUPPORT_EMAIL.value == "N" || document.all.OD_SUPPORT_EMAIL.value == "Y" && nTransCnt != 0)
        //        if (document.all.OD_SUPPORT_EMAIL.value == "N" || document.all.OD_SUPPORT_EMAIL.value != "N" && nTransCnt != 0)
        //        {
        //            window.status = '未轉出任何檔案，請查驗是否有選擇轉出機關、附件及文稿資訊';
        //            //alert('未轉出任何檔案，請查驗是否有選擇轉出機關、附件及文稿資訊');
        //            pFileDownMsg = "未轉出任何檔案，請查驗是否有選擇轉出機關、附件及文稿資訊";
        //        }
        //        else
        //        {
        //            window.status = '電子郵件發文Email寄送成功';
        //            //alert('電子郵件發文Email寄送成功');
        //            pFileDownMsg = "電子郵件發文Email寄送成功";
        //        }
        //    }
        //}
        //1000511	[1000245]	Yvonne	調整發文資料更新機制，在此多處理轉出立委質詢電子檔處理
		//1090930 David 1050087 立委質詢轉出改由WS統一處理，此處不需要
        /*if (document.all.H_LG_Download)
        {
            if (document.all["LEGISLATOR_FILE"])
            {
				//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
                //var LGObj = ODT351.GetLGDownLoadPath(document.all["H_Artifact"].value).value;
				var LGObj = OD.ODT351.GetLGDownLoadPath(document.all["H_Artifact"].value).value;
                if (LGObj.ErrMsg == "")
                {
                    var soap = new ActiveXObject("WSWrapper.WebFileIO");
                    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
                    //soap.Init(LGObj.ServerURL);
                    var serviceURL = LGObj.ServerURL;
                    if (document.all.II_USE_SSL != null)
                    {
                        if (document.all.II_USE_SSL.value == "Y")
                            serviceURL = serviceURL.replace("http://", "https://");
                    }
                    soap.Init(serviceURL);

					//1080122	   Joe     1080049 	修正弱掃Hardcoded Absolute Path
                    // soap.AddFile("C:\\TEMP\\", document.all["LEGISLATOR_FILE"].value + "_" + LGObj.NowDate + ".txt");
                    soap.Download(document.all["H_Artifact"].value, false, LGObj.DownLoadPath);
                }
                else
                {
                    document.all.H_AllMessage.value += "|立委質詢案件檔轉出失敗:" + LGObj.ErrMsg;
                }
            }
        }*/
        if (document.all.H_AllMessage.value != "")
        {
            var Message = document.all.H_AllMessage.value.split("|");
            for (var iMsg = Message.length - 1 ; iMsg > -1 ; iMsg--)
                pFileDownMsg = Message[iMsg] + "\n\n" + pFileDownMsg;
            document.all.H_AllMessage.value = "";
        }
        //1020814 Erin [1020384] 檢核檔案是否傳輸成功後，再跳訊息 --start
        //alert(pFileDownMsg);
        //if(result) //檔案存在，已轉出  //1020823 Erin [1020384] 修改邏輯
        //1040521 David 1020384 調整邏輯並修改位置
        /*if(strFile == "")
			alert(pFileDownMsg);
		else if(!bCatch)
			//alert("電子檔轉出失敗！\n檔案不存在於轉出路徑，請重新轉出。");//1020823 Erin [1020384] 修改邏輯
			alert("電子檔轉出失敗！\n檔案不存在於轉出路徑，請重新轉出。\n檢查不存在的檔案如下："+strFile);*/
        //1020814 Erin [1020384] 檢核檔案是否傳輸成功後，再跳訊息 --end	
        //0990831 David 0990552 配合發文資料更新時一併電子檔，修改訊息顯示方式--END

        //1040521 David 1020384 調整邏輯
        if (strCheckFileErr != "")//檢核檔案存在錯誤
            alert(strCheckFileErr);
        else if (strFileNotExist != "")//檔案不存在
            alert(strFileNotExist);
        else
            alert(pFileDownMsg);
    }
    catch (e)
    {
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        //var ErrorMessage = '';
        var ErrorMessage = e.message;
        if (soap.hasError)
            ErrorMessage += soap.ErrorMessage;
        if (soapAttach.hasError)
            ErrorMessage += soapAttach.ErrorMessage;

        var ErrMassage = "";
        if (document.all.H_AllMessage.value != "")
        {
            var Message = document.all.H_AllMessage.value.split("|");
            for (var iMsg = Message.length - 1 ; iMsg > -1 ; iMsg--)
                ErrMassage += Message[iMsg] + "\n\n";
            document.all.H_AllMessage.value = "";
        }
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        //ErrMassage += "\n\n電子交換檔下載失敗，錯誤訊息為："+ErrorMessage+"請稍後再試！";
        ErrMassage += "\n\n連接伺服器" + serviceURL + "電子交換檔下載失敗，錯誤訊息為：" + ErrorMessage + "請稍後再試！";
        alert(ErrMassage);
        //alert('電子交換檔下載失敗，錯誤訊息為：'+ErrorMessage+'請稍後再試！');
        document.all["H_Name"].options.length = 0;
    }
    /* Marked by Hardy 0940607,電子檔轉出成功後不寄送Email通知
	//下載DI檔後，寄送Email通知副本及抄件受文者
	fnEmailNotify();
	*/
}

function fnInvoke3rdBulletin()
{
    if (document.all.n3rdBulletinWS.value == "")
        return;
    var diList = "";
    /*
	for (var i = 0 ; i < document.all["H_Name"].options.length ; i++)
	{
		if (document.all["H_Name"].options[i].text == "DI")
		{
			if(diList!="")
				diList+=";";
			diList = document.all["H_Name"].options[i].value;
		}
	}
	if(diList!="")
	{
		var arWSParam = new Array(1);
		arWSParam[0] = diList;
		callObj = jf_CallWS("ODT351WS.asmx","Invoke3rdBulletinWS", false, arWSParam);
		ws3rdBulletinID = callObj.id;
		OnWSResult(callObj);
	}
	*/
    for (var i = 0 ; i < document.all["H_Name"].options.length ; i++)
    {
        if (document.all["H_Name"].options[i].text == "DI")
        {
            if (diList != "")
                diList += ";";
            var strUrl = document.all.n3rdBulletinWS.value + "?di=" + document.all["H_Name"].options[i].value.toLowerCase();;
            jf_OpenChildWin(strUrl, "", 760, 520);
            //diList = document.all["H_Name"].options[i].value;
        }
    }
}
function OnWSResult(argResult)
{
    //webserver回傳後動作
    //檢查回傳的webserverID
    if (argResult.id == wsUpdateSendDocInfoID)
    {
        //檢查執行是否成功
        if (jf_IsWebServiceSuccess(argResult))
        {
            //1000105 David 0990556 新增下載立委質詢案件檔案
			//1090930 David 1050087 立委質詢轉出改由WS統一處理，此處不需要
            /*if (document.all["LEGISLATOR_NO"])
            {
				//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
                //var LGObj = ODT351.GetLGDownLoadPath(document.all["H_Artifact"].value).value;
				var LGObj = OD.ODT351.GetLGDownLoadPath(document.all["H_Artifact"].value).value;
                if (LGObj.ErrMsg == "")
                {
                    var soap = new ActiveXObject("WSWrapper.WebFileIO");
                    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
                    //soap.Init(LGObj.ServerURL);
                    var serviceURL = LGObj.ServerURL;
                    if (document.all.II_USE_SSL != null)
                    {
                        if (document.all.II_USE_SSL.value == "Y")
                            serviceURL = serviceURL.replace("http://", "https://");
                    }
                    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
                    try
                    {
                        soap.Init(serviceURL);
						//1070824	Joe		1070678		修正弱掃Hardcoded Absolute Path
                        // soap.AddFile("C:\\TEMP\\", document.all["LEGISLATOR_NO"].value + "_" + LGObj.NowDate + ".txt");
                        soap.Download(document.all["H_Artifact"].value, false, LGObj.DownLoadPath);
                        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
                    }
                    catch (e)
                    {
                        var strErrMsg = e.message;
                        if (soap.hasError)
                            strErrMsg += soap.ErrorMessage;
                        alert("連接伺服器" + serviceURL + "下載檔案發生錯誤，錯誤訊息為:" + strErrMsg);
                    }
                    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
                }
                else
                    alert(LGObj.ErrMsg);
            }*/

            document.all.H_AllMessage.value += "更新發文資訊成功";
            //0990831 David 0990552 一併執行公告發布及電子檔轉出--START
			//1080604	Joe		1080481		公布欄功能改為直接開啟TBT150
            // if (document.all["H_HasTB"].value == "1" && document.all.H_ComBine.value == "Y")
                // PostBulletin();
            //0990831 David 0990552 一併執行公告發布及電子檔轉出--END
            return true;
        }
        else
            return false;
    }
        /*
        else if (argResult.id == wsPostBulletinID)
        {
            //檢查執行是否成功
            if(argResult.value == "")
            {
                alert("上傳到公告欄成功。");
            }
            else
            {
                alert("上傳到公告欄失敗。錯誤訊息："+argResult.value);
            }
        }
        */
    else if (argResult.id == wsBulletinID)
    {
        //檢查執行是否成功
        if (jf_IsWebServiceSuccess(argResult))
        {
            jf_PostBulletin(argResult.value);
            //alert("轉出公告用DI檔成功");
            return true;
        }
        else
            return false;
    }
    else if (argResult.id == ws3rdBulletinID)
    {
        //檢查執行是否成功
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.RtnBool == false)
            {
                alert("呼叫第三類佈告欄整合介面失敗");
            }
            return true;
        }
        else
        {
            return false;
        }
    }
}

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (CheckBeforSave())
    {
        //第三類發文則略過
        //0990831 David 0990552 取消第三類發文
        /*if(document.all.rbFepType3.checked)
			bRtnbool = true;
		else*/
        {
            //0981026 David 0980530 配合系統參數OD_SUPPORT_EMAIL重新定義，修改判斷
            //if(document.all.OD_SUPPORT_EMAIL.value == "N" || document.all.OD_SUPPORT_EMAIL.value == "Y" && nTransCnt != 0)
            if (document.all.OD_SUPPORT_EMAIL.value == "N" || document.all.OD_SUPPORT_EMAIL.value != "N" && nTransCnt != 0)
            {
                //1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
                //if(!document.all.OnlyEmailIssue)
                if (document.all.OnlyEmailIssue.value == "N")
                    bRtnbool = jf_ShowChooseDI();
                else
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
    var bRtnbool = true;
    //0990831 David 0990552 取消另送附件相關欄位，代擬代判公文以Http傳送欄位，
    //if (!document.all.cbIsFep.checked && !document.all.cbTranFolder.checked && !document.all.cbDecide.checked && !document.all.cbHttpTrans.checked && !document.all.OnlyEmailIssue)
    //1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
    //if (!document.all.cbIsFep.checked && !document.all.OnlyEmailIssue)
	//1110304 David 1101451 新增判斷個人專區發文方式
    //if (!document.all.cbIsFep.checked && document.all.OnlyEmailIssue.value == "N")
	//1141110 David 1141112 支援海外發文
	//if (!document.all.cbIsFep.checked && $("#OnlyEmailIssue").val() == "N" && $("#HasPAIssue").val() == "")
	if (!document.all.cbIsFep.checked && $("#OnlyEmailIssue").val() == "N" && $("#HasPAIssue").val() == "" && $("#HasOSIssue").val() == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["請至少選擇一項工作項目。"])), "");
        return false;
    }
    var strIssueDate = jf_Trim(document.all.txIssueDate.value);
    if (strIssueDate == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["無發文日期，無法轉出，請修正稿件後再行發文。"])), "");
        return false;
    }
    else
    {
        if (!CheckDate(document.all.txIssueDate, "發文日期"))
            return false;
    }
    if (jf_Trim(document.all.txIssueWord.value) == "" || jf_Trim(document.all.txIssueNo.value) == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["無發文字號，無法轉出，請修正稿件後再行發文。"])), "");
        return false;
    }
    //Matte 0961218 當只有Email寄送時不需要判斷與電子交換相關的行為
    //1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
    //if (document.all.cbIsFep.checked || document.all.OnlyEmailIssue)
	//1110304 David 1101451 新增判斷個人專區發文方式
    //if (document.all.cbIsFep.checked || document.all.OnlyEmailIssue.value == "Y")
	//1141110 David 1141112 支援海外發文
	//if (document.all.cbIsFep.checked || $("#OnlyEmailIssue").val() == "Y" || $("#HasPAIssue").val() == "Y")
	if (document.all.cbIsFep.checked || $("#OnlyEmailIssue").val() == "Y" || $("#HasPAIssue").val() == "Y" || $("#HasOSIssue").val() == "Y")
    {
        //1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
        //if(!document.all.OnlyEmailIssue)
		//1110304 David 1101451 新增判斷個人專區發文方式
        //if (document.all.OnlyEmailIssue.value == "N")
		//1141110 David 1141112 支援海外發文
		//if (document.all.OnlyEmailIssue.value == "N" && $("#HasPAIssue").val() == "")
		if (document.all.OnlyEmailIssue.value == "N" && $("#HasPAIssue").val() == "" && $("#HasOSIssue").val() == "")
        {
            //1050906 David 1050087 二代轉DI修改，已無作用
            /*if (document.all.rbFepType4.checked)//交換方式為其它
            {
                if (jf_Trim(document.all.txFpeTypeOther.value) == "")
                {
                    //1050802 Zen 1050087 二代公文修改
                    //document.all.txFpeTypeOther.focus();
                    $('@txFpeTypeOther').focus();
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["交換轉出路徑"])), "");
                    return false;
                }
            }*/

            //檢查是否有選擇要轉出的稿件
            var bAllDraftNotChecked = true;
            if (document.all.cblDraft)
            {
                //1050906 David 1050087 二代修改
                //var oDraft = document.all.cblDraft.children.tags("INPUT");
                var oDraft = $(document.all.cblDraft).find("INPUT");
                for (var i = 0; i < oDraft.length; i++)
                {
                    if (oDraft[i].checked)
                    {
                        bAllDraftNotChecked = false;
                        break;
                    }
                }
            }
            if (bAllDraftNotChecked && oDraft.length != 0)
            {
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["請至少選擇一份稿件。"])), "");
                return false;
            }
        }
        //檢查是否有選擇可電子交換的受文機關及受文機關的受文別輸入是否合理(不可電子交換者不應設定為電子交換)
        var bAllOrgNotChecked = true;
        var bHasEmail = false;

        //Cola 000812 判斷dg1中相關資訊是否正確
        //0981026 David 0980530 配合系統參數OD_SUPPORT_EMAIL重新定義，修改判斷
        //if (document.all.OD_SUPPORT_EMAIL.value == "Y")
        //1001116	Jeff	1000640		配合增加受文方式細項修改相關檢核
        if (document.all.OD_SUPPORT_EMAIL.value != "N")
        {
            var check = false;
            var check1 = "";
            var check2 = "";
            var check3 = "";
            var check4 = "";
            //Matte ADD 
            var chkEmail = "";
            //1001116	Jeff	1000640		紀錄各發文方式細項
            var Pdetail = document.all.txPDetail.value.split(';');
            var Edetail = document.all.txEDetail.value.split(';');
            var Tdetail = document.all.txTDetail.value.split(';');

            for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
            {
                var strOrgCanEIssueID = "dg1__ctl" + iRow + "_cbOrgCanEIssue";
                var strIssueTypeID = "dg1__ctl" + iRow + "_IssueType";
                if (!fnCheckIssueType(strOrgCanEIssueID, strIssueTypeID))
                    return false;
                //1001128		Jeff	1000640		配合擴充發文方式修改相關判斷
                //if ((document.all["dg1__ctl"+iRow+"_cbIssueOrg"].checked) && (document.all[strIssueTypeID].value == "1"))
                if (document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked)
                {
                    var strTemp = "";
                    for (var i = 0; i < Edetail.length; i++)
                    {
                        if (Edetail[i] == null || Edetail[i] == "")
                            continue;
                        var detail = Edetail[i].split('-');
                        if (detail[0] == document.all[strIssueTypeID].value)
                        {
                            bAllOrgNotChecked = false;
                            nTransCnt++;
                            break;
                        }
                    }
                }
                //Cola
				//1110304 David 1101451 新增判斷個人專區發文方式
                //if ((document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked) && (document.all[strIssueTypeID].value == "4"))
				//1141110 David 1141112 支援海外發文
				//if (document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked && (document.all[strIssueTypeID].value == "4" || document.all[strIssueTypeID].value == "9"))
				if (document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked && (document.all[strIssueTypeID].value == "4" || document.all[strIssueTypeID].value == "9" || document.all[strIssueTypeID].value == "7"))
                    bAllOrgNotChecked = false;

                //1	
                if (document.all["dg1__ctl" + iRow + "_cbOrgCanEIssue"].checked == false)
                {
                    /*if (document.all[strIssueTypeID].value != "2" && document.all[strIssueTypeID].value != "3")
					{
						check1 += "\n";
						check1 += "序"+document.all["dg1__ctl"+iRow+"_lbSeq"].innerText+"：此受文者目前不可使用電子交換或電子郵件，請將發文方式設定為[[2：郵寄、3：人工傳遞]";
						check = true;
					}
					*/
                    check = true;
                    var Msg = "";
                    var strTemp = "";
                    for (var i = 0; i < Pdetail.length; i++)
                    {
                        if (Pdetail[i] == null || Pdetail[i] == "")
                            continue;
                        var detail = Pdetail[i].split('-');
                        if (detail[0] == document.all[strIssueTypeID].value)
                        {
                            check = false;
                        }
                        Msg = Msg + strTemp + detail[0] + "：" + detail[1];
                        strTemp = "、";
                    }
                    for (var i = 0; i < Tdetail.length; i++)
                    {
                        if (Tdetail[i] == null || Tdetail[i] == "")
                            continue;
                        var detail = Tdetail[i].split('-');
                        var strTemp = "";
                        if (detail[0] == document.all[strIssueTypeID].value && document.all["H_HasTB"].value == "1")
                        {
                            check = false;
                        }
                    }
                    if (check)
                    {
                        check1 += "\n";
                        //1050802 Zen 10500087 二代公文修改
                        //check1 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].innerText + "：此受文者目前不可使用電子交換或電子郵件，請將發文方式設定為[" + Msg + "]";
                        check1 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].textContent + "：此受文者目前不可使用電子交換或電子郵件，請將發文方式設定為[" + Msg + "]";
                    }
                }

                //2
                if (document.all[strIssueTypeID].value == "1")
                {
                    //if (document.all["dg1__ctl"+iRow+"_txIssueOrgNo"].value == "")
                    //{
                    //	check2 += "\n";
                    //	check2 += "序"+document.all["dg1__ctl"+iRow+"_lbSeq"].innerText+"：此受文者不適用電子交換發文，請重新輸入。\n[2：郵寄、3：人工傳遞、4：電子郵件]";
                    //	document.all[strIssueTypeID].focus();
                    //	check = true;
                    //}
                    if (document.all["dg1__ctl" + iRow + "_txIssueOrgNo"].value == "")
                    {
                        var Msg = "";
                        var strTemp = "";
                        for (var i = 0; i < Pdetail.length; i++)
                        {
                            if (Pdetail[i] == null || Pdetail[i] == "")
                                continue;
                            var detail = Pdetail[i].split('-');
                            Msg = Msg + strTemp + detail[0] + "：" + detail[1];
                            strTemp = "、";
                        }
                        check2 += "\n";
                        //1010113		Jeff		1010047		修改提示訊息
                        if (document.all.H_txHasOs.value == "Y")
						{
							//1141110 David 1141112 海外發文支援外貿使用，調整文字
                            //Msg += "、7：海外發文";
							Msg += "、7：" + gOsIssueFullName;
						}
                        //1050802 Zen 10500087 二代公文修改
                        //check2 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].innerText + "：此受文者不適用電子交換發文，請重新輸入。\n[" + Msg + "、4：電子郵件]";
                        check2 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].textContent + "：此受文者不適用電子交換發文，請重新輸入。\n[" + Msg + "、4：電子郵件]";
                        //1050802 Zen 1050087 二代公文修改
                        //document.all[strIssueTypeID].focus();
                        $('#' + strIssueTypeID).focus();
                        check = true;
                    }
                }
                //3
                if (document.all[strIssueTypeID].value == "4")
                {
                    //Matte Add
                    chkEmail = "1";
					bHasEmail = true;

					//1060904 David 1060782 檢核EMAIL依DataGrid紀錄資訊檢核，不由H_txEmail欄位檢核
                    //var email = document.all.H_txEmail.value.split(',');

                    //0981026 David 0980530 新增檢核是否可進行內外部mail發文--Start
                    if (document.all.OD_SUPPORT_EMAIL.value == "I" && document.all["dg1__ctl" + iRow + "_cbIsInside"].checked == false)
                    {
                        //1001116	Jeff	1000640		改變顯示訊息---start----
                        var Msg = "";
                        var strTemp = "";
                        for (var i = 0; i < Pdetail.length; i++)
                        {
                            if (Pdetail[i] == null || Pdetail[i] == "")
                                continue;
                            var detail = Pdetail[i].split('-');
                            Msg = Msg + strTemp + detail[0] + "：" + detail[1];
                            strTemp = "、";
                        }
                        check3 += "\n";
                        //check3 += "序"+document.all["dg1__ctl"+iRow+"_lbSeq"].innerText+"：目前只提供內部受文者可進行電子郵件發文，請重新輸入發文方式。\n[2：郵寄、3：人工傳遞]";
                        //1050802 Zen 10500087 二代公文修改
                        //check3 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].innerText + "：目前只提供內部受文者可進行電子郵件發文，請重新輸入發文方式。\n[" + Msg + "]";
                        check3 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].textContent + "：目前只提供內部受文者可進行電子郵件發文，請重新輸入發文方式。\n[" + Msg + "]";
                        check = true;
                    }
                    else if (document.all.OD_SUPPORT_EMAIL.value == "O" && document.all["dg1__ctl" + iRow + "_cbIsInside"].checked == true)
                    {
                        check3 += "\n";
                        //1050802 Zen 10500087 二代公文修改
                        //check3 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].innerText + "：目前只提供外部受文者可進行電子郵件發文，請重新輸入發文方式。\n[1：電子交換、2：郵寄、3：人工傳遞]";
                        check3 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].textContent + "：目前只提供外部受文者可進行電子郵件發文，請重新輸入發文方式。\n[1：電子交換、2：郵寄、3：人工傳遞]";
                        check = true;
                    }//End
                    else
                    {
						//1060904 David 1060782 檢核EMAIL依DataGrid紀錄資訊檢核，不由H_txEmail欄位檢核
                        /*if (email[iRow - 2] == "")
                        {
                            check3 += "\n";
                            //1050802 Zen 10500087 二代公文修改
                            //check3 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].innerText + "：此受文者未設定電子郵件，請至公文製作受文者編輯視窗修改受文者資訊後再進行發文。";
                            check3 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].textContent + "：此受文者未設定電子郵件，請至公文製作受文者編輯視窗修改受文者資訊後再進行發文。";
                            check = true;
                        }*/
						if(document.all["dg1__ctl" + iRow + "_txEmail"].value == "")
						{
							check3 += "\n";
                            check3 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].textContent + "：此受文者未設定電子郵件，請至公文製作受文者編輯視窗修改受文者資訊後再進行發文。";
                            check = true;
						}
                    }
                }
                //4
                //1001116	[1000640]	Jeff	新增發文細項，改變相關檢核邏輯
                //if (document.all[strIssueTypeID].value != "1" && document.all[strIssueTypeID].value != "2" && document.all[strIssueTypeID].value != "3" && document.all[strIssueTypeID].value != "4")
                //{
                //1000323	[1000289]	Yvonne	電子檔轉出時，會檢核合理發文別為1234，如有內部公布欄，則發文別=5亦為合理發文別--start--
                //1000906	[1000678]	Jeff	新增海外發文選項，配合環境變數改變判別方式---start---

                /*if(document.all.H_txHasOs.value=="Y")
                {	if (document.all["H_HasTB"].value == "1" && document.all[strIssueTypeID].value != "5" && document.all[strIssueTypeID].value != "7" )
                    {
                        check4 += "\n";
                        check4 += "序"+document.all["dg1__ctl"+iRow+"_lbSeq"].innerText+"：發文別設定有誤，請重新輸入。\n[1：電子交換、2：郵寄、3：人工傳遞、4：電子郵件、5：內部電子公布欄、7：海外發文]";					
                        check = true;					
                    }
                    else
                    {
                        if (document.all["H_HasTB"].value != "1")
                        {
                            check4 += "\n";
                            check4 += "序"+document.all["dg1__ctl"+iRow+"_lbSeq"].innerText+"：發文別設定有誤，請重新輸入。\n[1：電子交換、2：郵寄、3：人工傳遞、4：電子郵件]";					
                            check = true;
                        }
                    }
                }
                else
                {
                    if (document.all["H_HasTB"].value == "1" && document.all[strIssueTypeID].value != "5")
                    {
                        check4 += "\n";
                        check4 += "序"+document.all["dg1__ctl"+iRow+"_lbSeq"].innerText+"：發文別設定有誤，請重新輸入。\n[1：電子交換、2：郵寄、3：人工傳遞、4：電子郵件、5：內部電子公布欄]";					
                        check = true;					
                    }
                    else
                    {
                        if (document.all["H_HasTB"].value != "1")
                        {
                            check4 += "\n";
                            check4 += "序"+document.all["dg1__ctl"+iRow+"_lbSeq"].innerText+"：發文別設定有誤，請重新輸入。\n[1：電子交換、2：郵寄、3：人工傳遞、4：電子郵件]";					
                            check = true;
                        }
                    }
                }
                */
                //---end---
                //--end---	
                //}

				//1110225 David 1101481 新增個人專區發文方式檢核
				if (document.all[strIssueTypeID].value == "9")
                {
                    if (document.all["dg1__ctl" + iRow + "_txInternalID"].value == "")
                    {
                        var Msg = "";
                        var strTemp = "";
                        for (var i = 0; i < Pdetail.length; i++)
                        {
                            if (Pdetail[i] == null || Pdetail[i] == "")
                                continue;
                            var detail = Pdetail[i].split('-');
                            Msg = Msg + strTemp + detail[0] + "：" + detail[1];
                            strTemp = "、";
                        }
                        check2 += "\n";
                        check2 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].textContent + "：此受文者不適用個人專區發文，請重新輸入。\n[" + Msg + "、4：電子郵件]";
                        $('#' + strIssueTypeID).focus();
                        check = true;
                    }
                }

                var Tb = "";
                var Msg = "";
                var Temp = "";
                var IsOk = false;
                if (document.all["H_HasTB"].value == "1")
                    Tb = document.all.txPDetail.value + ";" + document.all.txEDetail.value + ";" + document.all.txTDetail.value;
                else
                    Tb = document.all.txPDetail.value + ";" + document.all.txEDetail.value;
                var strTemp = Tb.split(';');
                for (var i = 0; i < strTemp.length; i++)
                {
                    if (strTemp[i] == null || strTemp[i] == "")
                        continue;
                    var codeno = strTemp[i].split('-');
                    if (codeno == null || codeno[0] == 0)
                        continue;
                    if (codeno[0] == document.all[strIssueTypeID].value)
                        IsOk = true;
                    Msg = Msg + Temp + codeno[0] + "：" + codeno[1];
                    Temp = "、";
                }
                if (!IsOk)
                {
                    check4 += "\n";
                    //1050802 Zen 10500087 二代公文修改
                    //check4 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].innerText + "：發文別設定有誤，請重新輸入。\n[" + Msg + "]";
                    check4 += "序" + document.all["dg1__ctl" + iRow + "_lbSeq"].textContent + "：發文別設定有誤，請重新輸入。\n[" + Msg + "]";
                    check = true;
                }
            }
            //1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
            //if(document.all.OnlyEmailIssue)
            if (document.all.OnlyEmailIssue.value == "Y")
            {
                if (chkEmail == "")
                {
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["請至少選擇一筆發文方式為電子郵件的受文者。"])), "");
                    return false;
                }
            }

            if (bAllOrgNotChecked)
            {
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["請至少選擇一筆可發文轉出的受文機關。"])), "");
                return false;
            }
            if (check)
            {
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array([check1 + check2 + check3 + check4])), "");
                return false;
            }
        }
        else
        {
            for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
            {
                var strOrgCanEIssueID = "dg1__ctl" + iRow + "_cbOrgCanEIssue";
                var strIssueTypeID = "dg1__ctl" + iRow + "_IssueType";
                if (!fnCheckIssueType(strOrgCanEIssueID, strIssueTypeID))
                    return false;
				//1110304 David 1101451 調整判斷邏輯
                /*if ((document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked) && (document.all[strIssueTypeID].value == "1"))
                    bAllOrgNotChecked = false;
                //Cola
                if ((document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked) && (document.all[strIssueTypeID].value == "4"))
                    bAllOrgNotChecked = false;*/
				if (document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked)
				{
					//1141110 David 1141112 支援海外發文
					//if(document.all[strIssueTypeID].value == "1" || document.all[strIssueTypeID].value == "9")
					if(document.all[strIssueTypeID].value == "1" || document.all[strIssueTypeID].value == "9" || document.all[strIssueTypeID].value == "7")
						bAllOrgNotChecked = false;
				}
            }
            if (bAllOrgNotChecked)
            {
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["請至少選擇一筆可發文轉出的受文機關。"])), "");
                return false;
            }
        }

        //0970108 Matte 950913 
        var nSizeLimit = 0;
        if (document.all["h_TransDiMode"])
        {
            if (document.all["dg2"] != null)
            {
                //1011015 Kevin 1010999 修正電子檔轉出附件大小由公文改為各稿件檢核-Start
                var TranAttSize = (!isNaN(document.all["H_TransAttSize"].value)) ? parseInt(document.all["H_TransAttSize"].value) : 0;

                //1020615 Kevin 1020264 新增發文內外閘道電子檔轉出
                var TranAttInSize = (!isNaN(document.all["H_TransAttInSize"].value)) ? parseInt(document.all["H_TransAttInSize"].value) : 0;

                //參數為空或0時，不限制
                if (TranAttSize != 0)
                {
                    //計算附件大小
                    for (var iRow = 2; iRow < document.all["dg2"].rows.length + 1; iRow++)
                    {
                        if (document.all["dg2__ctl" + iRow + "_cbAttachWithDoc"].checked)
                            //1050802 Zen 10500087 二代公文修改
                            //nSizeLimit += parseInt(document.all["dg2__ctl" + iRow + "_lbAttachFileSize"].innerText);
                            nSizeLimit += parseInt(document.all["dg2__ctl" + iRow + "_lbAttachFileSize"].textContent);

                        if (iRow == document.all["dg2"].rows.length || document.all["dg2__ctl" + iRow + "_txDraftNo"].value != document.all["dg2__ctl" + (iRow + 1) + "_txDraftNo"].value)
                        {
                            //判斷是否超出附件大小限制
                            if (nSizeLimit > TranAttSize && document.all["h_TransDiMode"].value == "1")
                            {
                                if (!window.confirm("附件總檔案大小超過" + TranAttSize / 1024 + "MB，是否繼續電子檔轉出？"))
                                    return false;
                            }
                                //1011029 Kevin 1010774 新增TYPE=3：附件大小超過設定值則不轉出附件
                            else if (nSizeLimit > TranAttSize && document.all["h_TransDiMode"].value == "3")
                            {
                                if (window.confirm("稿件[" + document.all["dg2__ctl" + iRow + "_txDraftNo"].value + "]附件總檔案大小超過" + TranAttSize / 1024 + "MB，是否不轉出附件？"))
                                {
                                    //1050316	Kevin_C	1050122	附件大小超過限制時將dg1的附件選項一併取消勾選，避免信件夾帶附件
                                    for (var nDg1Row = 2; nDg1Row < document.all["dg1"].rows.length + 1; nDg1Row++)
                                        if (document.all["dg2__ctl" + iRow + "_txDraftNo"].value == document.all["dg1__ctl" + nDg1Row + "_txDraftNo"].value)
                                            document.all["dg1__ctl" + nDg1Row + "_cbIncludeAttach"].checked = false;
                                    for (var jRow = 2; jRow < document.all["dg2"].rows.length + 1; jRow++)
                                    {
                                        if (document.all["dg2__ctl" + iRow + "_txDraftNo"].value == document.all["dg2__ctl" + jRow + "_txDraftNo"].value)
                                            document.all["dg2__ctl" + jRow + "_cbAttachWithDoc"].checked = false;
                                    }
                                }
                                else
                                    return false;

                            }
                                //1011029 Kevin 1010774 新增TYPE=3：附件大小超過設定值則不轉出附件
                                //else if (nSizeLimit > TranAttSize && document.all["h_TransDiMode"].value != "1")
                                //1020615 Kevin 1020264 新增發文內外閘道電子檔轉出
                            else if (nSizeLimit > TranAttSize && document.all["h_TransDiMode"].value != "4")
                                //else if(nSizeLimit > TranAttSize)
                            {
                                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["附件總檔案大小超過上限" + TranAttSize / 1024 + "MB，不允許電子檔轉出。"])), "");
                                return false;
                            }
                                //1020615 Kevin 1020264 新增發文內外閘道電子檔轉出
                            else if (document.all["h_TransDiMode"].value == "4")
                            {
                                if (nSizeLimit > TranAttInSize)
                                {
                                    for (var jRow = 2; jRow < document.all["dg1"].rows.length + 1; jRow++)
                                    {
                                        var iDraft = document.all["dg2__ctl" + iRow + "_txDraftNo"].value;
                                        var jDraft = document.all["dg1__ctl" + jRow + "_txDraftNo"].value;

                                        if (iDraft == jDraft && document.all["dg1__ctl" + jRow + "_txIssueGateWay"].value == "I")
                                            document.all["dg1__ctl" + jRow + "_cbIncludeAttach"].checked = false;
                                    }
                                }
                                if (nSizeLimit > TranAttSize)
                                {
                                    for (var jRow = 2; jRow < document.all["dg1"].rows.length + 1; jRow++)
                                    {
                                        var iDraft = document.all["dg2__ctl" + iRow + "_txDraftNo"].value;
                                        var jDraft = document.all["dg1__ctl" + jRow + "_txDraftNo"].value;

                                        if (iDraft == jDraft && document.all["dg1__ctl" + jRow + "_txIssueGateWay"].value == "O")
                                            document.all["dg1__ctl" + jRow + "_cbIncludeAttach"].checked = false;
                                    }
                                }
                            }

                            nSizeLimit = 0;
                        }
                    }
                }
                ////計算附件大小
                //for (var iRow=2;iRow<document.all["dg2"].rows.length+1;iRow++)
                //{
                //	if(document.all["dg2__ctl"+iRow+"_cbAttachWithDoc"].checked)
                //		nSizeLimit += parseInt(document.all["dg2__ctl"+iRow+"_lbAttachFileSize"].innerText);
                //}
                ////0990915 David 0990589 附件大小改以環境變數設定值判斷--START
                //var TranAttSize = (!isNaN(document.all["H_TransAttSize"].value))?parseInt(document.all["H_TransAttSize"].value):0;
                ////參數為空或0時，不限制
                //if(TranAttSize != 0)
                //{
                //	//判斷是否超出附件大小限制
                //	//if (nSizeLimit > 1024 && document.all["h_TransDiMode"].value == "1")
                //	if (nSizeLimit > TranAttSize && document.all["h_TransDiMode"].value == "1")
                //	{
                //		//if(!window.confirm("附件總檔案大小超過1mb，是否繼續電子檔轉出？"))
                //		if(!window.confirm("附件總檔案大小超過"+TranAttSize/1024+"MB，是否繼續電子檔轉出？"))
                //			return false;
                //	}
                //	//else if (nSizeLimit > 1024 && document.all["h_TransDiMode"].value != "1")
                //	else if (nSizeLimit > TranAttSize && document.all["h_TransDiMode"].value != "1")
                //	{
                //		//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["附件總檔案大小超過上限1mb，不允許電子檔轉出。"])),"");						
                //		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["附件總檔案大小超過上限"+TranAttSize/1024+"MB，不允許電子檔轉出。"])),"");
                //		return false;
                //	}
                //}
                ////0990915 David 0990589 附件大小改以環境變數設定值判斷--END
                //1011015 Kevin 1010999 修正電子檔轉出附件大小由公文改為各稿件檢核-End
            }
        }

        //Cola -- end --

        /*
		var nAttachSize = 0;
		*/
        /*//marked by bob for檔管局，不檢查附件大小
		if (document.all.rbFepType1.checked)//第一類
		{
			for (var iRow=2;iRow<document.all["dg2"].rows.length+1;iRow++)
			{
				if(document.all["dg2__ctl"+iRow+"_cbAttachWithDoc"].checked)
					nAttachSize += parseInt(document.all["dg2__ctl"+iRow+"_lbAttachFileSize"].innerText);
			}
			
			if (nAttachSize > 500)
			{
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["附件超過第一類交換上限，請改以第二類交換或調整隨文傳送之附件內容。"])),"");						
				return false;
			}
		}
		*/
        var nAttachSize = 0;
        var nSizeLimit = 0;
        //Matte 0960831 001488 Email發文檢查附件總檔案大小
        //if (document.all[strIssueTypeID].value == "4" && document.all["h_TotalAttachSizeLimit"].value != "0")
        if (bHasEmail && document.all["h_TotalAttachSizeLimit"].value != "0")
        {
            if (document.all["dg2"] != null)
            {
                for (var iRow = 2; iRow < document.all["dg2"].rows.length + 1; iRow++)
                {
                    if (document.all["dg2__ctl" + iRow + "_cbAttachWithDoc"].checked)
					{
						//1131106	Joe		序357		修正有電郵發文的使用者夾帶該附件才計算檔案大小--S
						var iDraft = document.all["dg2__ctl" + iRow + "_txDraftNo"].value;
						var bAdd = false;
						
						for (var jRow = 2; jRow < document.all["dg1"].rows.length + 1; jRow++)
						{
							var jDraft = document.all["dg1__ctl" + jRow + "_txDraftNo"].value;

							//1131112	Joe		序357		修正錯誤
							// if (iDraft == jDraft && document.all["dg1__ctl" + iRow + "_IssueType"].value == "4" && document.all["dg1__ctl" + iRow + "_cbIncludeAttach"].checked == true)
							if (iDraft == jDraft && document.all["dg1__ctl" + jRow + "_IssueType"].value == "4" && document.all["dg1__ctl" + jRow + "_cbIncludeAttach"].checked == true)
							{
								bAdd = true;
								break;
							}
						}
						if(bAdd == true)
						//1131106	Joe		序357		修正有電郵發文的使用者夾帶該附件才計算檔案大小--E
							//1050802 Zen 10500087 二代公文修改
							//nAttachSize += parseInt(document.all["dg2__ctl" + iRow + "_lbAttachFileSize"].innerText);
							nAttachSize += parseInt(document.all["dg2__ctl" + iRow + "_lbAttachFileSize"].textContent);
						
					}
                }
                if (nAttachSize > document.all["h_TotalAttachSizeLimit"].value * 1024)
                {
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["附件總檔案大小超過上限" + document.all["h_TotalAttachSizeLimit"].value + "mb，不允許電子郵件發文。"])), "");
                    return false;
                }
            }
        }
    }
    //0990831 David 0990552 取消另送附件相關欄位，代擬代判以EMAIL傳送欄位
    /*if (document.all.cbTranFolder.checked)//另送附件
	{
		if (jf_Trim(document.all.txTranFolder.value) == "")
		{
			document.all.txTranFolder.focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["轉出位置"])),"");						
			return false;
		}
	}
	if (document.all.cbDecide.checked)//代擬代判
	{
		if (jf_Trim(document.all.txDecide.value) == "")//email不可空白
		{
			document.all.txDecide.focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["Email"])),"");
			return false;
		}
		else if(!checkemail(jf_Trim(document.all.txDecide.value)))//email格式檢查
		{
			document.all.txDecide.focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["電子郵件格式不正確"])),"");
			return false;
		}
	}*/
    //依選項設定轉出路徑
    //0960718 Stella修改若有電子發文才檢查
    //0961218 Matte 檢查是否只有email寄送
    //0981026 David 0980530 配合系統參數OD_SUPPORT_EMAIL重新定義，修改判斷
    //if (document.all.OD_SUPPORT_EMAIL.value == "N" || document.all.OD_SUPPORT_EMAIL.value == "Y" && nTransCnt != 0)
    if (document.all.OD_SUPPORT_EMAIL.value == "N" || document.all.OD_SUPPORT_EMAIL.value != "N" && nTransCnt != 0)
    {
        //1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
        //if(!document.all.OnlyEmailIssue)
        if (document.all.OnlyEmailIssue.value == "N")
            bRtnbool = SetTranPath();
        else
            bRtnbool = true;
    }
    return bRtnbool;
}

var xDraftDoc = null;
//公告設定物件, 此為物件prototype而非函式, 用以傳遞公告設定的資訊
function BulletinSetting()
{
    this.BoardSide = "1";		//公布欄型態 #1:內部 2:內外部 3:外部
    this.AllowRange = "1";		//公告範圍 #0:會內 1:會屬 2:民眾
    this.EmailType = "0";		//Email通知方式 0:不以Email通知 1:通知單位登記桌 2:通知單位內所有人員
    this.CategoryId = "";		//類別代碼
    this.ExpireDate = "";		//公告期限
}

//0990831 David 0990552 此處為舊行為，因用不到故註解掉--START
/*
function SetTmpBulletinSetting(argBulletinSetting)
{
	SetBulletinSetting(argBulletinSetting);
}

function SetBulletinSetting(argBulletinSetting)
{
	var SettingNode = GetBulletinSettingNode();

	var BoardSideNode = SettingNode.selectSingleNode("//公布欄型態");
	if(BoardSideNode)
		BoardSideNode.text = argBulletinSetting.BoardSide;
	var AllowRangeNode = SettingNode.selectSingleNode("//公告範圍");
	if(AllowRangeNode)
		AllowRangeNode.text = argBulletinSetting.AllowRange;
	var EmailTypeNode = SettingNode.selectSingleNode("//公告Email通知方式");
	if(EmailTypeNode)
		EmailTypeNode.text = argBulletinSetting.EmailType;
	var CategoryIdNode = SettingNode.selectSingleNode("//公告類別代碼");
	if(CategoryIdNode)
		CategoryIdNode.text = argBulletinSetting.CategoryId;
	var ExpireDateNode = SettingNode.selectSingleNode("//公告期限");
	if(ExpireDateNode)
		ExpireDateNode.text = argBulletinSetting.ExpireDate;
}

function GetBulletinSettingNode()
{
	var SettingNode = xDraftDoc.selectSingleNode("//公告設定");
	if(SettingNode)
	{
		//do nothing
	}
	else
	{
		var docNode = xDraftDoc.selectSingleNode("/");
		var rootNode = docNode.documentElement;
		SettingNode = docNode.createElement("公告設定");
		rootNode.appendChild(SettingNode);
		SettingNode.appendChild(docNode.createElement("公布欄型態"));
		SettingNode.appendChild(docNode.createElement("公告範圍"));
		SettingNode.appendChild(docNode.createElement("公告Email通知方式"));
		SettingNode.appendChild(docNode.createElement("公告類別代碼"));
		SettingNode.appendChild(docNode.createElement("公告期限"));
	}
	return SettingNode;
}

function GetBulletinSetting()
{
	var rtn = new BulletinSetting();
	var BoardSideNode	= xDraftDoc.selectSingleNode("//公布欄型態");
	var AllowRangeNode	= xDraftDoc.selectSingleNode("//公告範圍");
	var EmailTypeNode	= xDraftDoc.selectSingleNode("//公告Email通知方式");
	var CategoryIdNode	= xDraftDoc.selectSingleNode("//公告類別代碼");
	var ExpireDateNode	= xDraftDoc.selectSingleNode("//公告期限");
	if(BoardSideNode)
		rtn.BoardSide = BoardSideNode.text;
	if(AllowRangeNode)
		rtn.AllowRange = AllowRangeNode.text;
	if(EmailTypeNode)
		rtn.EmailType = EmailTypeNode.text;
	if(CategoryIdNode)
		rtn.CategoryId = CategoryIdNode.text;
	if(ExpireDateNode)
		rtn.ExpireDate = ExpireDateNode.text;
	return rtn;
}*/
//0990831 David 0990552 此處用不到，註解掉--END

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
function ShowBulletinSetting()
{
    if (document.all["H_HasTB"].value == "1")
    {
        if (document.all.nBulletinUseTBT201.value == "Y")
        {
            LoadDraftDocInfo();
            var ret = window.showModalDialog("TBT201.aspx?argDocNo=" + document.all["txDocNo"].value, window, "dialogHeight:600px; dialogWidth:1000px");
            /*if(ret)
				PostBulletin();*/
        }
        else
        {
            //0961008 Caesar 001663 中企處要求第三類發佈時,將稿件受文者預設帶入到公告對象
            //						若系統SYSTEM_SET設定OD_ODT351_USE_TBT201為N
            //						則開啟TBT150.aspx
            //http://deva.nfa.com.tw/TB_A/TBLIB/TBWS.asmx
            var url = new String(document.all.H_InsideTBWS.value);
            url = url.toUpperCase();
            url = url.replace("TBLIB", "TB1");
            url = url.replace("TBWS.ASMX", "TBT150.aspx");
			
			//1121025 Zen -- (陸委會快解)支援開啟舊版之TBT150			
            //url = url.replace("TB_A", "TB_A2");
			
			//1051021 David 1050087 配合TBT150掛舊版，調整開啟位置
			//1060609 David 1050087 TBT150二代升級完成，取消replace
			//url = url.replace("TB_A", "TB_AO");
            url = url + "?nFrom=ODT351&SAMLart=" + fnGetArtifact() + "&argDocNo=" + document.all["txDocNo"].value;
            //1010306 kevin 1010041 (中企處)新增發布公布欄時多傳入選取稿件
            //1020523	Jagle	[1000751]	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
            //if(document.all.H_OrgNo.value == "313050000G")
            if (document.all.H_OrgNickName.value == "SMEA")
                url = url + fnSelectDraft();
            jf_OpenWindow(url, "view", "fullscreen=no,Height=850,width=1000");
        }
    }
    else
    {
        alert("尚未建立電子公布欄系統，故無法發布公告。");
    }
}
//1010306 kevin 1010041 (中企處)新增發布公布欄時多傳入選取稿件
function fnSelectDraft()
{
    var rtnDraft = "";
    if (document.all.cblDraft)
    {
        var oDraft = document.all.cblDraft.children.tags("INPUT");
        for (var i = 0; i < oDraft.length; i++)
        {
            if (oDraft[i].checked)
            {
                if (rtnDraft != "")
                    return "發文方式為「電子公布欄」時，稿件不得複選；請重新選取後再發布。";
                rtnDraft = "&DraftNO=" + oDraft[i].id.substring(oDraft[i].id.indexOf("_") + 1, oDraft[i].id.length);
            }
        }
    }
    if (rtnDraft == "")
        return "發文方式為「電子公布欄」時，請選取單一稿件後再發布。";

    return rtnDraft;
}
function fnGetArtifact()
{
    return document.all["H_Artifact"].value;
}
//宣告張貼公告用之webserver回傳值id
//var wsPostBulletinID;
var wsBulletinID;
var ws3rdBulletinID;
var wsPasteInit;
var wsPasteOD;
//叫用ws取得要傳到公佈欄的資訊
//1080604	Joe		1080481		公布欄功能改為直接開啟TBT150--S
/*
function PostBulletin()
{
    //要求系統將相關檔案存放在AP伺服器上，並回傳相關資料
	//1080318	Joe		1080098		弱掃修正禁用WSDL--S
	/*
    var arWSParam = new Array(2);
    arWSParam[0] = document.all["H_Artifact"].value;
    //1000511	[1000245]	Yvonne	PostBulletin調整為ClientOnLoad時叫用，所以改為使用隱藏欄位處理
    //arWSParam[1] = document.all["txDocNo"].value;
    arWSParam[1] = document.all.H_txDocNo.value;
    callObj = jf_CallWS("ODT351WS.asmx", "GetDocFilesInfo", false, arWSParam);
	*/
	/*
	var params = new SOAPClientParameters();
	params.add('argSessionID',  jf_GetArtifact());
	//1080531 Joe 1080481 弱掃修正Client Potential Code Injection--S
	// params.add('argArtifact', document.all["H_Artifact"].value);
	// params.add('argDocNo', document.all.H_txDocNo.value);
	params.add('argArtifact', encodeURI(document.all["H_Artifact"].value));
	params.add('argDocNo', encodeURI(document.all.H_txDocNo.value));
	//1080531 Joe 1080481 弱掃修正Client Potential Code Injection--E
	var callObj = SOAPClient.invokeJSON("ODT351WS.asmx", "GetDocFilesInfo", params ,false, null)
	//1080318	Joe		1080098		弱掃修正禁用WSDL--E
    if (callObj.error)
    {
        document.all.H_AllMessage.value += "|發布公告失敗，取得相關檔案與資料時失敗：" + callObj.errorDetail.string;
        //alert("取得相關檔案與資料時失敗：" + callObj.errorDetail.string);
    }
    else
    {
        if (callObj.value.m_bSuccess == false)
            //alert("取得相關檔案與資料時發生錯誤：" + callObj.value.m_strErrMsg);
            document.all.H_AllMessage.value += "\n發布公告失敗，取得相關檔案與資料時失敗：" + callObj.errorDetail.string;
        else
        {
            document.all["exp"].style.display = "block";
            TranFileAndPostBulletin(callObj.value)
            document.all["exp"].style.display = "none";
        }
    }
}
*/
//1080604	Joe		1080481		公布欄功能改為直接開啟TBT150--E

function CreateAllFolder(argPath)
{
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (argPath.lastIndexOf("\\") != argPath.length - 1)
        argPath += "\\";
    var idx = argPath.indexOf("\\");
    idx = argPath.indexOf("\\", idx + 1);
    while (idx != -1)
    {
        var subPath = argPath.substring(0, idx);
        if (fso.FolderExists(subPath) == false)
            fso.CreateFolder(subPath);
        idx = argPath.indexOf("\\", idx + 1);
    }
}

function AttachInfo()
{
    this.AttacheName = "";
    this.AttachFileName = "";
    this.AttachDesp = "";
    this.AttachSize = "";
    this.AttachType = "";
}

//1080604	Joe		1080481		公布欄功能改為直接開啟TBT150--S
//轉換檔案並張貼至公佈欄
/*
function TranFileAndPostBulletin(RtnBulletin)
{
    //0990831 David 0990552 公文系統整合公布欄--START
    if (!RtnBulletin.Documents)
    {
        //alert("無任何檔案可上傳至公佈欄。");
        document.all.H_AllMessage.value += "|發布公告失敗，無任何稿件可發布至公佈欄";
        return;
    }

    var iMainDiIdx = 0;
    var objDoc = RtnBulletin.Documents;
    var serviceURL = RtnBulletin.ServiceURL;
    var serverDI = RtnBulletin.DIServerPath;
    var serverAtt = RtnBulletin.AttachServerPath;
    //1000511	[1000245]	Yvonne	PostBulletin調整為ClientOnLoad時叫用，所以改為使用隱藏欄位處理
    //var localPathForDI	= "C:\\temp\\TB\\" + document.all["txDocNo"].value + "\\DI\\";
    //var localPathForAtt	= "C:\\temp\\TB\\" + document.all["txDocNo"].value + "\\Att\\";
	//1070824	Joe		1070678		修正弱掃Hardcoded Absolute Path--S
    // var localPathForDI = "C:\\temp\\TB\\" + document.all.H_txDocNo.value + "\\DI\\";
    // var localPathForAtt = "C:\\temp\\TB\\" + document.all.H_txDocNo.value + "\\Att\\";
	//1070824	Joe		1070678		修正弱掃Hardcoded Absolute Path--E

    //建立工作暫存區
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    CreateAllFolder(localPathForDI);	//for DI檔
    CreateAllFolder(localPathForAtt);	//for 附件檔
    //1030911	Cloud	修正無附件時匯處現異常的bug
    var bHasDi = false;
    var bHasAtt = false;

    //下載檔案至Client端
    try
    {
        var soap = new ActiveXObject("WSWrapper.WebFileIO");
        var soapAttach = new ActiveXObject("WSWrapper.WebFileIO");
        //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
        if (document.all.II_USE_SSL != null)
        {
            if (document.all.II_USE_SSL.value == "Y")
                serviceURL = serviceURL.replace("http://", "https://");
        }

        soap.Init(serviceURL);
        soapAttach.Init(serviceURL);
        for (var i = 0; i < objDoc.length; i++)
        {
            var doc = objDoc[i];
            if (doc.DIFileName != "")//不轉出不下載
            {
                if (doc.DIFileName)
                {

                    soap.AddFile(serverDI, doc.DIFileName);
                    //1030911	Cloud	修正無附件時匯處現異常的bug
                    bHasDi = true;
                }
                if (doc.DraftFileName)
                {

                    soap.AddFile(serverDI, doc.DraftFileName);
                    //1030911	Cloud	修正無附件時匯處現異常的bug
                    bHasDi = true;
                }
                if (doc.Attach)
                {
                    var att = doc.Attach;
                    for (var j = 0; j < att.length; j++)
                    {
                        if (att[j])
                        {
                            soapAttach.AddFile(serverAtt, att[j].AttachFileName);
                            //1030911	Cloud	修正無附件時匯處現異常的bug
                            bHasAtt = true;
                        }
                    }
                }
            }
        }
        //0980917	David	0980455	使用WebFileIO時，應傳入Artifact
        //soap.Download("", false, localPathForDI);
        //soapAttach.Download("", false, localPathForAtt);
        //1030911	Cloud	修正無附件時匯處現異常的bug
        if (bHasDi)
            soap.Download(document.all["H_Artifact"].value, false, localPathForDI);
        if (bHasAtt)
            soapAttach.Download(document.all["H_Artifact"].value, false, localPathForAtt);
    }
    catch (e)
    {
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        //var ErrorMessage = '';
        var ErrorMessage = e.message;
        if (soap.hasError)
            ErrorMessage += soap.ErrorMessage;
        if (soapAttach.hasError)
            ErrorMessage += soapAttach.ErrorMessage;
        //alert('檔案下載失敗，錯誤訊息為：'+ErrorMessage+'請稍後再試！');
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        //document.all.H_AllMessage.value += "|發布公告時檔案下載失敗，錯誤訊息為："+ErrorMessage+"請稍後再試！";
        document.all.H_AllMessage.value += "|連接伺服器" + serviceURL + "發布公告時檔案下載失敗，錯誤訊息為：" + ErrorMessage + "請稍後再試！";
        return;
    }

    for (var i = 0; i < objDoc.length ; i++)
    {
        if (objDoc[i].DIFileName != "")
        {
            var DiName = "稿" + (i + 1) + "(" + objDoc[i].DocName + ")";

            var mainDoc = objDoc[i];
            //DI檔名
            var sDIFileName = mainDoc.DIFileName;
            //Xml檔名
            var sXmlFileName = mainDoc.DraftFileName;
            //DI全徑名
            var sDIPathName = localPathForDI + sDIFileName;
            //Xml全徑名
            var sXmlPathName = localPathForDI + sXmlFileName;
            //本文PDF檔名
            var sPDFFileName = "A" + sDIFileName.substring(0, sDIFileName.indexOf(".")) + ".pdf";
            //本文PDF全徑名
            var sPDFPathName = localPathForDI + sPDFFileName;
            //xsl檔全徑名
            var sPrintXSLPathName = "";
            //取得xsl檔全徑名
            for (var iXSL = 0 ; iXSL < document.all.lbPrintXSLPath.options.length ; iXSL++)
            {
                if (document.all.lbPrintXSLPath.options[iXSL].text == mainDoc.DocName)
                {
                    sPrintXSLPathName = document.all.lbPrintXSLPath.options[iXSL].value;
                    break;
                }
            }

            var exp = document.all["exp"];
            //於Client端將DI檔轉成本文PDF檔
            try
            {
                var sReceiverName = "";
                var sAttPDFPathName = "";
                var bKeepSecret = false;	//行文單位保密
                var bStamp = false;		//是否加蓋正副抄本章
                var bSeal = false;		//騎縫章
                var bPageNo = false;		//頁碼
                var bBarcode = false;		//條碼
                //1000511	[1000245]	Yvonne	PostBulletin調整為ClientOnLoad時叫用，所以改為使用隱藏欄位處理
                //var sDocNo = document.all["txDocNo"].value;
                var sDocNo = document.all.H_txDocNo.value;
                exp.OrgNo = document.all.H_OrgNo.value;
                exp.PrintXSLFileName = sPrintXSLPathName;
                exp.DocName = mainDoc.DocName + "（稿一）";
                var ret = exp.ConvertDIFile(sDIPathName, sPDFPathName, sReceiverName, sAttPDFPathName, bKeepSecret, bStamp, bSeal, bPageNo, bBarcode, sDocNo);
                if (ret != "")
                {
                    //alert("將DI檔轉為PDF檔時失敗：" + ret);
                    document.all.H_AllMessage.value += "|" + DiName + " 發布公告時將DI檔轉為PDF檔失敗，錯誤訊息為：" + ret;
                    continue;
                }
            }
            catch (e)
            {
                //alert("將DI檔轉為PDF檔時發生錯誤：" + exp.ProcResult + e.message);
                document.all.H_AllMessage.value += "|" + DiName + " 發布公告時將DI檔轉為PDF檔時發生錯誤，錯誤訊息為：" + exp.ProcResult + e.message;
                continue;
            }

            //附件資訊
            var attachFileArr = new Array();
            if (mainDoc.Attach)
            {
                for (var iAtt = 0 ; iAtt < mainDoc.Attach.length ; iAtt++)
                {
                    if (mainDoc.Attach[iAtt])
                    {
                        var info = new AttachInfo();
                        info.AttachFilePath = serverAtt;
                        info.AttachFileName = mainDoc.Attach[iAtt].AttachFileName;
                        info.AttachDesp = mainDoc.Attach[iAtt].AttachDesp;
                        info.AttacheName = mainDoc.Attach[iAtt].AttacheName;
                        info.AttachSize = mainDoc.Attach[iAtt].AttachSize;
                        info.AttachType = mainDoc.Attach[iAtt].AttachType;
                        attachFileArr[attachFileArr.length] = info;
                    }
                }
            }
            //附件PDF檔名
            var sAttachPDFFileName = sDIFileName.substring(0, sDIFileName.indexOf(".")) + "_Att.pdf";
            //附件PDF全徑名
            var sAttachPDFPathName = localPathForAtt + sAttachPDFFileName;

            //於Client端將附件檔轉成PDF檔
            try
            {
                if (attachFileArr.length > 0)
                {
                    var attachPathNameArr = new Array(attachFileArr.length);
                    for (var j = 0 ; j < attachPathNameArr.length ; j++)
                        attachPathNameArr[j] = localPathForAtt + attachFileArr[j].AttachFileName;

                    var bSeal = false;		//騎縫章
                    var bPageNo = false;		//頁碼
                    var bBarcode = false;		//條碼
                    //1000511	[1000245]	Yvonne	PostBulletin調整為ClientOnLoad時叫用，所以改為使用隱藏欄位處理
                    //var sDocNo = document.all["txDocNo"].value;
                    var sDocNo = document.all.H_txDocNo.value;
                    exp.OrgNo = document.all.H_OrgNo.value;
                    var ret = exp.ConvertAttachFiles(attachPathNameArr, sAttachPDFPathName, bSeal, bBarcode, sDocNo);
                    if (ret != "")
                    {
                        //alert("將附件檔轉為PDF檔時失敗：" + ret);
                        document.all.H_AllMessage.value += "|" + DiName + " 發布公告時將附件檔轉為PDF檔時失敗，錯誤訊息為：" + ret;
                        continue;
                    }
                }
                else
                {
                    //將檔名清掉, 以表示無附件
                    sAttachPDFFileName = "";
                    sAttachPDFPathName = "";
                }
            }
            catch (e)
            {
                //alert("將附件檔轉為PDF檔時發生錯誤：" + exp.ProcResult + e.message);
                document.all.H_AllMessage.value += "|" + DiName + " 發布公告時將附件檔轉為PDF檔發生錯誤，錯誤訊息為：" + exp.ProcResult + e.message;
                continue;
            }

            //將本文PDF與附件PDF上傳到AP伺服器
            var soapUpload = new ActiveXObject("WSWrapper.WebFileIO");
            try
            {
                var sSrvPath = RtnBulletin.WorkLocation;
                //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
                //soapUpload.Init(RtnBulletin.ServiceURL);
                var serviceURL = RtnBulletin.ServiceURL;
                if (document.all.II_USE_SSL != null)
                {
                    if (document.all.II_USE_SSL.value == "Y")
                        serviceURL = serviceURL.replace("http://", "https://");
                }
                soapUpload.Init(serviceURL);

                if (sXmlPathName != "" && fso.FileExists(sXmlPathName))
                    soapUpload.AddFile(sSrvPath, sXmlFileName, localPathForDI);		//本文Xml
                if (fso.FileExists(sPDFPathName))
                    soapUpload.AddFile(sSrvPath, sPDFFileName, localPathForDI);		//本文PDF
                if (sAttachPDFPathName != "" && fso.FileExists(sAttachPDFPathName))
                    soapUpload.AddFile(sSrvPath, sAttachPDFFileName, localPathForAtt);	//附件PDF
                soapUpload.Upload(document.all.H_Artifact.value, true);
            }
            catch (e)
            {
                //alert("上傳檔案至AP伺服器失敗，錯誤訊息為：" + soapUpload.ErrorMessage + e.message);
                document.all.H_AllMessage.value += "|" + DiName + " 發布公告時上傳檔案至AP伺服器失敗，錯誤訊息為：" + soapUpload.ErrorMessage + e.message;
                continue;
            }
            //var bsBulletinSetting = GetBulletinSetting();//沒用到

            //呼叫WebService要求公布欄系統發布公告
            arWSParam = new Array(15);
            arWSParam[0] = document.all.H_Artifact.value;
            //1000511	[1000245]	Yvonne	PostBulletin調整為ClientOnLoad時叫用，所以改為使用隱藏欄位處理
            //arWSParam[1] = document.all["txDocNo"].value;
            arWSParam[1] = document.all.H_txDocNo.value;
            //公布欄，公告範圍
            if (RtnBulletin.TBInfo[i].TBInside == "是" && RtnBulletin.TBInfo[i].TBOutside == "是")
            {
                arWSParam[2] = "2";//內外部
                if (RtnBulletin.TBInfo[i].Public == "是")//民眾
                    arWSParam[3] = "2";
                else//下屬機關
                    arWSParam[3] = "1";
            }
            else if (RtnBulletin.TBInfo[i].TBInside == "是")
            {
                arWSParam[2] = "1";//內部
                arWSParam[3] = "1";
            }
            else if (RtnBulletin.TBInfo[i].TBOutside == "是")
            {
                arWSParam[2] = "3";//外部
                if (RtnBulletin.TBInfo[i].Public == "是")//民眾
                    arWSParam[3] = "2";
                else//下屬機關
                    arWSParam[3] = "1";
            }

            //Email通知方式 0:不以Email通知 1:通知單位登記桌 2:通知單位內所有人員
            if (RtnBulletin.TBInfo[i].TBEmailType == "0")
                arWSParam[4] = "0";
            else if (RtnBulletin.TBInfo[i].TBEmailType == "2")
                arWSParam[4] = "1";
            else if (RtnBulletin.TBInfo[i].TBEmailType == "1")
                arWSParam[4] = "2";

            //公告類別
            arWSParam[5] = document.all.H_TBCategory.value;
            //公告主旨
            //1000511	[1000245]	Yvonne	PostBulletin調整為ClientOnLoad時叫用，所以改為使用隱藏欄位處理
            //arWSParam[6] = document.all.txSubject.value;
            arWSParam[6] = document.all.H_txSubject.value;
            //發布時間
            var time = new Date();
            var hour = time.getHours();
            var min = time.getMinutes();
            var sec = time.getSeconds();
            if (hour < 10) { hour = "0" + hour; }
            if (min < 10) { min = "0" + min; }
            if (sec < 10) { sec = "0" + sec; }
            //1000511	[1000245]	Yvonne	PostBulletin調整為ClientOnLoad時叫用，所以改為使用隱藏欄位處理
            //arWSParam[7] = document.all.txIssueDate.value == "" ? "" : document.all.txIssueDate.value + hour + min + sec;;
            arWSParam[7] = document.all.H_txIssueDate.value == "" ? "" : document.all.H_txIssueDate.value + hour + min + sec;
            //卸載時間
            arWSParam[8] = document.all.H_ExpireDate.value;
            arWSParam[9] = serverDI + sDIFileName;
            arWSParam[10] = attachFileArr;
            arWSParam[11] = RtnBulletin.WorkLocation + sPDFFileName;
            if (sAttachPDFFileName == "")
                arWSParam[12] = "";
            else
                arWSParam[12] = RtnBulletin.WorkLocation + sAttachPDFFileName;
            //發布對象
            arWSParam[13] = RtnBulletin.RecInfo;

            //1010314 David 修正自動發布公告時，未傳入承辦人資訊及來文機關BUG
            var arVal = new Array();
			//1080531 Joe 1080481 弱掃修正Client Potential Code Injection--S
            // arVal[0] = document.all.H_txDocUserAccount.value;//承辦人帳號
            // arVal[1] = document.all.H_txDocUserEmpName.value;//承辦人名稱
            // arVal[2] = document.all.H_txDocFromOrgName.value;//來文機關
            arVal[0] = encodeURI(document.all.H_txDocUserAccount.value);//承辦人帳號
            arVal[1] = encodeURI(document.all.H_txDocUserEmpName.value);//承辦人名稱
            arVal[2] = encodeURI(document.all.H_txDocFromOrgName.value);//來文機關
			//1080531 Joe 1080481 弱掃修正Client Potential Code Injection--E
            arWSParam[14] = arVal;

			//1080318	Joe		1080098		弱掃修正禁用WSDL--S
			/*
            var inTBWS = jf_Trim(document.all.H_InsideTBWS.value);
            callObj = jf_CallWS(inTBWS, "PasteOD", false, arWSParam);
			*/
			/*
			var params = new SOAPClientParameters();
			params.add('argSessionID',  jf_GetArtifact());
			//1080531 Joe 1080481 弱掃修正Client Potential Code Injection--S
			// params.add('argArtifact', arWSParam[0]);
			// params.add('argDocNo', arWSParam[1]);
			params.add('argArtifact', encodeURI(arWSParam[0]));
			params.add('argDocNo', encodeURI(arWSParam[1]));
			//1080531 Joe 1080481 弱掃修正Client Potential Code Injection--E
			params.add('argBoardSide', arWSParam[2]);
			params.add('argAllowRange', arWSParam[3]);
			params.add('argEmailType', arWSParam[4]);
			//1080531 Joe 1080481 弱掃修正Client Potential Code Injection--S
			// params.add('argCategoryId', arWSParam[5]);
			// params.add('argSubject', arWSParam[6]);
			// params.add('argPasteDate', arWSParam[7]);
			// params.add('argExpireDate', arWSParam[8]);
			params.add('argCategoryId', encodeURI(arWSParam[5]));
			params.add('argSubject', encodeURI(arWSParam[6]));
			params.add('argPasteDate', encodeURI(arWSParam[7]));
			params.add('argExpireDate', encodeURI(arWSParam[8]));
			//1080531 Joe 1080481 弱掃修正Client Potential Code Injection--E
			params.add('argDIPathName', arWSParam[9]);
			params.add('argAttachInfo', arWSParam[10]);
			params.add('argDIPDFPathName', arWSParam[11]);
			params.add('argAttachPDFPathName', arWSParam[12]);
			params.add('argReceivers', arWSParam[13]);
			params.add('argVal', arWSParam[14]);
			//1080531 Joe 1080481 弱掃修正Client Potential Code Injection
			// var inTBWS = jf_Trim(document.all.H_InsideTBWS.value);
			var inTBWS = jf_Trim(encodeURI(document.all.H_InsideTBWS.value));
			var callObj = SOAPClient.invokeJSON(inTBWS, "PasteOD", params ,false, null)
			//1080318	Joe		1080098		弱掃修正禁用WSDL--E
            //檢查執行是否成功
            if (callObj.error)
            {
                //alert("發布公告時失敗：" + callObj.errorDetail.string);
                document.all.H_AllMessage.value += "|" + DiName + " 發布公告時失敗：" + callObj.errorDetail.string;
            }
            else
            {
                if (callObj.value.m_bSuccess == false)
                    //alert("發布公告時發生錯誤：" + callObj.value.m_strErrMsg);
                    document.all.H_AllMessage.value += "|" + DiName + " 發布公告時發生錯誤：" + callObj.value.m_strErrMsg;
                else
                    document.all.H_AllMessage.value += "|" + DiName + " 發布公告成功";
                //alert("發布成功。");
            }
        }
    }
    //0990831 David 0990552 公文系統整合公布欄--END
}
*/
//1080604	Joe		1080481		公布欄功能改為直接開啟TBT150--E
function GetServerName()
{
    return document.all["SsoServer"].value;
}

function checkemail(arg)
{
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    if (filter.test(arg))
        return true;
    else
        return false;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
    var bRtnbool = false;

    return bRtnbool;
}

function OpenFile(argFileName)
{
    var oShell = new ActiveXObject("Shell.Application");
    var commandtoRun = argFileName;
    oShell.ShellExecute(commandtoRun, "", "", "", 4);
}

function SetTranPath()
{
    //0990831 David 0990552 取消第一二三類及加密選項--START
    /*var strEncrypt = document.all.cbEncrypt.checked ? "是" : "否";
	var strEncrypt = "否";
	if (document.all.rbFepType1.checked)
	{
		for (var i = 0 ; i < nodelist.length ; i++)
		{
			if (nodelist[i].attributes[0].value == "1" && nodelist[i].attributes[1].value == strEncrypt)
			{
				document.all.H_ElecType.value="1";
				document.all.H_DILocalPath.value = nodelist[i].selectSingleNode("DI").text;
				document.all.H_AttachLocalPath.value = nodelist[i].selectSingleNode("ATTACH").text;
				break;
			}
		}
	}
	else if (document.all.rbFepType2.checked)
	{
		for (var i = 0 ; i < nodelist.length ; i++)
		{
			if (nodelist[i].attributes[0].value == "2" && nodelist[i].attributes[1].value == strEncrypt)
			{
				document.all.H_ElecType.value="2";
				document.all.H_DILocalPath.value = nodelist[i].selectSingleNode("DI").text;
				document.all.H_AttachLocalPath.value = nodelist[i].selectSingleNode("ATTACH").text;
				break;
			}
		}
	}
	else if (document.all.rbFepType3.checked)
	{
		for (var i = 0 ; i < nodelist.length ; i++)
		{
			if (nodelist[i].attributes[0].value == "3" && nodelist[i].attributes[1].value == strEncrypt)
			{
				document.all.H_ElecType.value="3";
				document.all.H_DILocalPath.value = nodelist[i].selectSingleNode("DI").text;
				document.all.H_AttachLocalPath.value = nodelist[i].selectSingleNode("ATTACH").text;
				break;
			}
		}
	}
	else if (document.all.rbFepType4.checked)
	{
		document.all.H_ElecType.value="4";
		document.all.H_DILocalPath.value = document.all.txFpeTypeOther.value;
		document.all.H_AttachLocalPath.value = document.all.txFpeTypeOther.value;
	}*/
    //1050906 David 1050087 二代轉DI修改，已無作用
    /*if (document.all.rbFepType4.checked)
    {
        document.all.H_DILocalPath.value = document.all.txFpeTypeOther.value;
        document.all.H_AttachLocalPath.value = document.all.txFpeTypeOther.value;
    }
    else
    {
        if (nodelist != null && nodelist.length > 0)
        {
            document.all.H_DILocalPath.value = nodelist[0].selectSingleNode("DI").text;
            document.all.H_AttachLocalPath.value = nodelist[0].selectSingleNode("ATTACH").text;
        }
        else
        {
            document.all.H_DILocalPath.value = "";
            document.all.H_AttachLocalPath.value = "";
        }
    }
    //0990831 David 0990552 取消第一二三類及加密選項--END
    if (document.all.H_DILocalPath.value == "" || document.all.H_AttachLocalPath.value == "")
    {
        alert("請設定電子交換轉出路徑");
        return false;
    }*/
    /*
	else
	{
		if (document.all.rbFepType4.checked && document.all.txFpeTypeOther.value != "")
		{
			document.all.H_DILocalPath.value == document.all.txFpeTypeOther.value;
			document.all.H_AttachLocalPath.value == document.all.txFpeTypeOther.value;
		}
		return true;
	}
	*/
    return true;
}

function fnCheckBeforeUpdate()
{
    if (jf_Trim(document.all.txIssueDate.value) == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["無發文日期，無法更新發文資訊，請修正稿件後再執行。"])), "");
        return false;
    }
    if (!jf_CheckCDATE(jf_Trim(document.all.txIssueDate.value)))
    {
        if (document.all.txIssueDate.className == "")
            //1050802 Zen 1050087 二代公文修改
            //document.all.txIssueDate.focus();
            $('#txIssueDate').focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["發文日期"])), "");
        return false;
    }
    if (jf_Trim(document.all.txIssueWord.value) == "" || jf_Trim(document.all.txIssueNo.value) == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["無發文字號，無法更新發文資訊，請修正稿件後再執行。"])), "");
        return false;
    }
    if (document.all["dg1"] && document.all["dg1"].rows && document.all["dg1"].rows.length >= 2)
    {
        //Do nothing
    }
    else
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["無受文者，無法更新發文資訊，請修正稿件後再執行。"])), "");
        return false;
    }
    //[需求單960167] Charles (中企處)紙本須輸入無法電子交換原因 0960629
    //1001116	Jeff	1000640		下拉選單改為DropDownList---start---
    //if(document.all["rbActualIssue1"].checked==true && document.all["dlReason_Text"].value=="")
    if (document.all["rbActualIssue1"].checked == true && document.all["dlReason"].selectedIndex < 1)
    {
        if (document.all.trReason.className != "hide")
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["非電子發文，需輸入無法電子交換原因。"])), "");
            //document.all.dlReason_Text.focus();
            //1050802 Zen 1050087 二代公文修改
            //document.all.dlReason.focus();
            $('#dlReason').focus();
            return false;
        }
    }
    //1001116---end--
    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
    {
        //檢查發文別是否正確
        var strOrgCanEIssueID = "dg1__ctl" + iRow + "_cbOrgCanEIssue";
        var strIssueTypeID = "dg1__ctl" + iRow + "_IssueType";
        var strPostTypeID = "dg1__ctl" + iRow + "_dlPostType";
        if (!fnCheckIssueType(strOrgCanEIssueID, strIssueTypeID))
            return false;

        //當發文別是2(郵寄)時，必須選擇郵寄方式
        if (document.all[strIssueTypeID].value == "2")
        {
            //1001025	Jeff	1000884		僑委會發文畫面看不到此下拉選單，故跳過不檢核
            //1001116	Jeff	1000640		配合參數設定有可能會顯示，故增加判斷條件
            //if(document.all["H_txHasOs"].value=="Y")
            if (document.all["H_txHasOs"].value == "Y" && document.all["SHOW_P"].value == "N")
                continue;
            if (document.all[strPostTypeID].selectedIndex < 1)
            {
                //1001230	Jeff	1000640		避免鎖定造成錯誤
                if (document.all[strPostTypeID].disabled)
                    document.all[strPostTypeID].disabled = false;
                //1050802 Zen 1050087 二代公文修改
                //document.all[strPostTypeID].focus();
                $('#' + strPostTypeID).focus();
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["發文別設定為郵寄時，請先選擇郵寄方式。"])), "");
                return false;
            }
        }
    }
    return true;
}
//call ws 更新發文資訊
var wsUpdateSendDocInfoID;//宣告webserver回傳值id
//1000511	[1000245]	Yvonne	此段函式中不再叫用ODT351WS.asmx中UpdateSendDocInfo，僅保留合理性檢核及加簽處理
function jf_UpdateSendDocInfo()
{
    //1000511	[1000245]	Yvonne	保留合理性檢核--strat--
    if (!fnCheckBeforeUpdate()) return false;

    var rtnValue = false;
    /*
	var arAttach = new Array();
	var arIssueDocType = new Array();
	var arIssueType = new Array();
	var arIssueOrgName = new Array();
	var arIssueOrgNo = new Array();
	var arIssueOrgAddress = new Array();
	var arIssueOrgPostCode = new Array();
	var arCabinetNo = new Array();
	var arIssueOrgPostNo = new Array();
	var arIssueOrgPrint = new Array();
	var arIssueOrgCombine = new Array();
	var arIssueOrgDesc = new Array();
	var arHasAttach = new Array();//001260 0960917 Matte

	var nIssueCnt = 0;
	var HasAttachCnt = 0;
	
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_IssueOrg"].innerText != "")
		{
			//本別(正、副本)
			arIssueDocType[nIssueCnt] = document.all["dg1__ctl"+iRow+"_lbDocType"].innerText;
			//發文別
			arIssueType[nIssueCnt] = document.all["dg1__ctl"+iRow+"_IssueType"].value;
			//受文機關名稱 Matte 0961116 000408
			//arIssueOrgName[nIssueCnt] = document.all["dg1__ctl"+iRow+"_IssueOrg"].innerText;lbOrgName
			arIssueOrgName[nIssueCnt] = document.all["dg1__ctl"+iRow+"_lbOrgName"].innerText;
			//受文機關代碼代碼
			arIssueOrgNo[nIssueCnt] = document.all["dg1__ctl"+iRow+"_txIssueOrgNo"].value;
			//受文機關地址
			arIssueOrgAddress[nIssueCnt] = document.all["dg1__ctl"+iRow+"_txOrgAddress"].value;
			//受文機關郵遞區號
			arIssueOrgPostCode[nIssueCnt] = document.all["dg1__ctl"+iRow+"_txOrgPostNo"].value;
			//受文機關櫃號
			arCabinetNo[nIssueCnt] = document.all["dg1__ctl"+iRow+"_txCabinetNo"].value;
			//受文機關郵寄方式
			arIssueOrgPostNo[nIssueCnt] = document.all["dg1__ctl"+iRow+"_dlPostType"].options[document.all["dg1__ctl"+iRow+"_dlPostType"].selectedIndex].value;
			//受文機關郵資機使用與否
			arIssueOrgPrint[nIssueCnt] = (document.all["dg1__ctl"+iRow+"_cbPost"].checked) ? "1" : "0";
			//受文機關郵件彙整與否
			arIssueOrgCombine[nIssueCnt] = (document.all["dg1__ctl"+iRow+"_cbCombine"].checked) ? "1" : "0";
			//受文機關備註
			arIssueOrgDesc[nIssueCnt] = document.all["dg1__ctl"+iRow+"_txIssueDesc"].value;
			nIssueCnt++;
		}
		if(document.all["dg1__ctl"+iRow+"_cbIncludeAttach"].checked) //matte 0960917 001260
		{
			arHasAttach[HasAttachCnt] = "1";
			HasAttachCnt++;
		}
		else
		{
			arHasAttach[HasAttachCnt] = "2";
			HasAttachCnt++;
		}
	}

	if (document.all["dg2"])
	{
		var nAttachCnt = 0;
		for (var iRow=2;iRow<document.all["dg2"].rows.length+1;iRow++)
		{
			if (document.all["dg2__ctl"+iRow+"_lbAttachName"].innerText != "")
			{
				arAttach[nAttachCnt] = document.all["dg2__ctl"+iRow+"_lbAttachName"].innerText;
				nAttachCnt++;
			}
		}
	}
	*/
    //--end--
    //1000511	[1000245]	Yvonne	保留加簽處理，舊的整段mark掉--strat--
    var sErrMsg = "";
	//1070731	   Joe     1070678 	修正弱掃Hardcoded Absolute Path
    // var sWorkPath = "C:\\temp\\sso\\SubmitAOLDocFiles";
    var sTxInfo = "";
    if (document.all["txDocNo"].value != "")
    {
        //0970313 Stella  Matte   0970232
        if (document.all.rbReturn)
        {
			//1071107 David 發文資料更新時，有選擇傳送行為就需進行加簽處理，調整判斷方式
            //if (document.all.rbReturn.checked || document.all.rbArchive.checked)
			if (!document.all.rbNone.checked)
            {
                if (document.all.txSignType.value.toUpperCase() == "E")
                {
                    if (document.all.H_Artifact.value == "")
                    {
                        alert("線上簽核公文封裝作業，失敗原因：無法取得Artifact");
                        return false;
                    }
                    if (document.all.txMsgId.value == "")
                    {
                        alert("線上簽核公文封裝作業，失敗原因：無法取得流程MsgId");
                        return false;
                    }

                    if (document.all.rbArchive.checked)
                        sTxInfo = document.all.TxTrans.value + ";94;檔案室;OD95;檔管人員;;;";
                    else
                        sTxInfo = document.all.h_TxInfo.value;

					//1051021 David 1050087 支援二代加簽處理，此段不需要
					/*if(!document.all.LoginCOM.SetTargetUser(document.all.H_Artifact.value))
                    {
                        alert("線上簽核公文封裝作業，失敗原因：SetTargetUser() fail");
                        return false;
                    }
                    var nRtn = document.all.LoginCOM.SubmitAOLDocFiles(document.all["txDocNo"].value, document.all["txMsgId"].value, sWorkPath, sTxInfo);

                    if (nRtn != 0)
                    {
                        //取得作業錯誤資訊
                        var cnt = document.all.LoginCOM.GetErrorCount();
                        for (var i = 0; i < cnt; i++)
                        {
                            var code = document.all.LoginCOM.GetErrorCode(i);
                            sErrMsg = sErrMsg + document.all.LoginCOM.GetErrorMsg(i) + "\n";
                        }
                        alert("線上簽核公文封裝作業，失敗原因：\n" + sErrMsg);
                        return false;
					}*/

					//1051021 David 1050087 新增二代加簽處理--START

					//PinCode視窗處理
					//1080214 David 1080179 調整pincode紀錄方式
					//if(document.all.txPinCode.value == "")
					//1091117 David 1090521 加簽時才要求金鑰密碼
					//if(strIgotu == "")
					if(document.all.II_SUBMIT_SIGN.value == "Y" && strIgotu == "")
					{
						/*var objODT351C3 = new Object();
						objODT351C3.PinCode = "";
						objODT351C3.bRtn = true;
						
						var cX = event.clientX + 10;
						var cY = event.clientY + 10;
						var screenWidth = screen.availWidth-10;
						var screenheight = screen.availHeight-20;
						var screenLeft = screenWidth/2-120;
						var screenTop = screenheight/2-55;
						cX = Math.min(cX, screenLeft);
						cY = Math.min(cY, screenTop);

						var sFeatures="dialogLeft: "+ cX + "px;dialogTop:"+ cY+"px;dialogWidth:400px;dialogHeight:100px;status:no";
						window.showModalDialog("ODT351C3.htm",objODT351C3, sFeatures);
						if(!objODT351C3.bRtn || objODT351C3.PinCode == "")
						{
							alert("線上簽核公文封裝作業，失敗原因：使用者取消輸入金鑰密碼或金鑰密碼為空");
							return false;
						}

						document.all.txPinCode.value = objODT351C3.PinCode;*/
						
						jf_ShowModal("ODT351C3.aspx?SAMLart=" + document.all.H_Artifact.value , "560","250");
						//由setSignWork()內觸發後續行為，此處一律回傳false
						return false;
					}
					else
					{
						setSignWork();
						//由setSignWork()內觸發後續行為，此處一律回傳false
						return false;
					}
					//1051021 David 1050087 新增二代加簽處理--END
                }
            }
        }
        rtnValue = true;
    }
    return rtnValue;


    //	if (!IsServerHandling)
    //	{
    //		if (document.all["txDocNo"].value != "")
    //		{
    //			var arWSParam = new Array();
    //			//發文資訊：發文日期、發文字號、公文文號
    //			var arIssueInfo = new Array();
    //			arIssueInfo[0] = document.all.txIssueDate.value;
    //			arIssueInfo[1] = document.all.txIssueWord.value;
    //			arIssueInfo[2] = document.all.txIssueNo.value;
    //			arIssueInfo[3] = document.all.txDocNo.value;
    //			//[需求單960167] Charles (中企處)無法電子交換原因 0960629
    //			arIssueInfo[4] = document.all.dlReason_Text.value;
    //			//電子交換資訊：是否加密、電子交換方式、可否電子交換
    //			var arUserExtraInfo = new Array();
    //			//0990831 David 0990552 取消加密選項，一律為不加密
    //			//arUserExtraInfo[0] = document.all.cbEncrypt.checked ? 1 : 0;//現在變為是否加密
    //			arUserExtraInfo[0] = 0;
    //			arUserExtraInfo[1] = 1;
    //			if (document.all.rbActualIssue1.checked)
    //				arUserExtraInfo[1] = 1;
    //			//0990831 David 0990552 取消電子交換一二三類--START
    //			else if(document.all.rbActualIssue2.checked)
    //				arUserExtraInfo[1] = 2;
    //			//0991202 David 0990652 判斷電子公布欄發文
    //			else if(document.all.rbActualIssue3.checked)
    //				arUserExtraInfo[1] = 4;
    //			/*if (document.all.rbFepType1.checked)
    //				arUserExtraInfo[1] = 2;
    //			else if (document.all.rbFepType2.checked)
    //				arUserExtraInfo[1] = 3
    //			else if(document.all.rbFepType3.checked)
    //					arUserExtraInfo[1] = 4;*/
    //			//0990831 David 0990552 取消電子交換一二三類--END
    //			arUserExtraInfo[2] = document.all.cbCanEIssue.checked ? "N" : "Y";	//不適用電子交換
    //			
    //			//發文更新後傳送模式
    //			var strMode = "0";
    //			if (document.all.rbReturn)
    //			{
    //				if (!document.all.rbReturn.disabled)	//如果傳送模式disable，則視同不傳送
    //				{
    //					if (document.all.rbReturn.checked)
    //						strMode = "1";
    //					else if (document.all.rbArchive.checked)
    //						strMode = "2";
    //					else if (document.all.rbNone.checked)
    //						strMode = "3";
    //					//0990831 David 0990552 新增用印傳送別
    //					else if (document.all.rbStamp.checked)
    //						strMode = "6";
    //				}
    //			}
    //
    //			//判斷單位發文或總發文
    //			var strCloseType = "";
    //			if(document.all.rbAll.checked)
    //				strCloseType = "1";
    //			else
    //				strCloseType = "2";
    //
    //			//0970034 Matte 0970129 線上簽核公文封裝作業
    //			var sErrMsg = "";
    //			var sWorkPath = "C:\\temp\\sso\\SubmitAOLDocFiles";
    //			var sTxInfo = ""; 
    //
    //			//Iris    0970985         新增上級機關誤判改分公文註記欄位
    //			var strRetransfer;
    //			if(document.all.cb_retransfer.checked)
    //				strRetransfer = "Y";
    //			else
    //				strRetransfer = "N";
    //				
    //			//0970313 Stella  Matte   0970232
    //			if(document.all.rbReturn)
    //			{
    //				if(document.all.rbReturn.checked || document.all.rbArchive.checked)
    //				{
    //					if(document.all.txSignType.value.toUpperCase() == "E")
    //					{
    //						if(document.all.H_Artifact.value == "")
    //						{
    //							alert("線上簽核公文封裝作業，失敗原因：無法取得Artifact");
    //							return ;
    //						}
    //						if(document.all.txMsgId.value == "")
    //						{
    //							alert("線上簽核公文封裝作業，失敗原因：無法取得流程MsgId");
    //							return ;
    //						}
    //
    //						if(document.all.rbArchive.checked) 
    //							sTxInfo = document.all.TxTrans.value+";94;檔案室;OD95;檔管人員;;;"; 
    //						else 
    //							sTxInfo = document.all.h_TxInfo.value;
    //						if(!document.all.LoginCOM.SetTargetUser(document.all.H_Artifact.value))
    //						{
    //							alert("線上簽核公文封裝作業，失敗原因：SetTargetUser() fail");
    //							return ;
    //						}
    //						var nRtn = document.all.LoginCOM.SubmitAOLDocFiles(document.all["txDocNo"].value, document.all["txMsgId"].value, sWorkPath, sTxInfo);
    //						
    //						if(nRtn != 0)
    //						{
    //							//取得作業錯誤資訊
    //							var cnt = document.all.LoginCOM.GetErrorCount();
    //							for(var i = 0; i < cnt; i++)
    //							{
    //								var code = document.all.LoginCOM.GetErrorCode(i);
    //								sErrMsg = sErrMsg + document.all.LoginCOM.GetErrorMsg(i)+"\n";
    //							}
    //							alert("線上簽核公文封裝作業，失敗原因：\n"+sErrMsg);
    //							return ;
    //						}
    //					}
    //				}
    //			}
    //
    //			arWSParam[0] = document.all.H_Artifact.value;
    //			arWSParam[1] = arIssueInfo;
    //			arWSParam[2] = arUserExtraInfo;
    //			arWSParam[3] = arAttach;
    //			arWSParam[4] = arIssueDocType;
    //			arWSParam[5] = arIssueType;
    //			arWSParam[6] = arIssueOrgName;
    //			arWSParam[7] = arIssueOrgNo;
    //			arWSParam[8] = arIssueOrgAddress;
    //			arWSParam[9] = arIssueOrgPostCode;
    //			arWSParam[10] = arCabinetNo;
    //			arWSParam[11] = arIssueOrgPostNo;
    //			arWSParam[12] = arIssueOrgPrint;
    //			arWSParam[13] = arIssueOrgCombine;
    //			arWSParam[14] = arIssueOrgDesc;
    //			arWSParam[15] = strMode;
    //			arWSParam[16] = strCloseType;
    //			arWSParam[17] = arHasAttach;
    //			//1000105 David 0990556 新增傳入稿件段落內容及承辦人資訊，調整傳入參數設定
    //			//arWSParam[18] = strRetransfer;//Iris    0970985         新增上級機關誤判改分公文註記欄位
    //			var arWSPara = new Array();
    //			arWSPara[0] = strRetransfer;
    //			arWSPara[1] = document.all.txContent.value;
    //			arWSPara[2] = document.all.txDocUserEmpName.value;
    //			arWSPara[3] = document.all.txDocUserPhnoe.value;
    //			arWSParam[18] = arWSPara;
    //			callObj = jf_CallWS("ODT351WS.asmx","UpdateSendDocInfo", false, arWSParam);
    //			wsUpdateSendDocInfoID = callObj.id;
    //			
    //			rtnValue = OnWSResult(callObj);
    //		}
    //	}
    //	//--end--
    //	return rtnValue;
    //--end--
}
//0990831 David 0990552 取消另送附件相關欄位，代擬代判以EMAIL傳送欄位，下列function無用
/*function jf_TranFolder()
{
	if (document.all.cbTranFolder.checked)
	{
		document.all.txTranFolder.readOnly = false;
		document.all.txTranFolder.className = "";
		document.all.btTranFolder.disabled = false;
	}
	else
	{
		document.all.txTranFolder.readOnly = true;
		document.all.txTranFolder.className = "DisplayOnly";
		document.all.btTranFolder.disabled = true;
	}
}
function jf_Decide()
{
	if (document.all.cbDecide.checked)
	{
		document.all.txDecide.readOnly = false;
		document.all.txDecide.className = "";
	}
	else
	{
		//document.all.txDecide.readOnly = true;
		//document.all.txDecide.className = "DisplayOnly";
	}
}*/

function jf_cbCanEIssue()
{

    if (document.all.cbCanEIssue.checked)
    {
        document.all.rbActualIssue1.checked = true;//紙本
        document.all.rbActualIssue2.disabled = true;
        document.all.rbActualIssue3.disabled = true;
        //[需求單960167] Charles (中企處)若原來沒輸入，則自動帶出無法電子交換原因 0960629
        //1001116	Jeff	1000640		下拉選單改為DropDownList 不自動帶出
        //if(document.all.dlReason_Text.value=="")
        //	document.all.dlReason_Text.value="不適用電子交換";
        //1001116	Jeff	1000640 新增受文明細下拉選單
        if (document.all.dlEdetail)
            document.all.dlEdetail.disabled = true;
        if (document.all.dlTdetail)
            document.all.dlTdetail.disabled = true;
        //1030617 Eric 1030384	修改為只有勾選才進行jf_rbActualIssue()
        jf_rbActualIssue();
    }
    else
    {
        //1030617 Eric 1030384	取消修改發文方式為電子交換邏輯
        /*
		if(document.all.rbActualIssue1.checked)
		{
			document.all.rbActualIssue1.checked = false;
			document.all.rbActualIssue2.checked = true;//電子交換
		}
		*/
        document.all.rbActualIssue2.disabled = false;
        document.all.rbActualIssue3.disabled = false;
        //1001116	Jeff	1000640 新增受文明細下拉選單
        if (document.all.dlEdetail)
            document.all.dlEdetail.disabled = false;
        if (document.all.dlTdetail)
            document.all.dlTdetail.disabled = false;
    }
    //1030617 Eric 1030384	修改為只有勾選才進行jf_rbActualIssue()
    //jf_rbActualIssue();
}

var gReason = "";	//[需求單960167] Charles (中企處)無法電子交換原因 0960629
function jf_rbActualIssue()
{
    if (document.all.rbActualIssue1.checked)//紙本
    {
        //0990831 David 0990552 取消電子交換一二三類及加密選項
        /*document.all.cbEncrypt.disabled = true;
		document.all.rbFepType1.disabled = true;
		document.all.rbFepType2.disabled = true;
		document.all.rbFepType3.disabled = true;*/
        //1050906 David 1050087 二代轉DI修改，已無作用
        /*document.all.rbFepTypeUpper.disabled = true;
        document.all.rbFepType4.checked = true;*/
        document.all.cbIsFep.checked = false;
        //[需求單960167] Charles (中企處)無法電子交換原因 0960629
        //1001116	Jeff	1000640		下拉選單改為DropDownList---start---
        //document.all.dlReason_Text.disabled = false;
        document.all.dlReason.disabled = false;
        //document.all.dlReason_Text.className = "";
        //if(document.all.dlReason_Text.value=="")
        //	document.all.dlReason_Text.value=gReason;
        if (gReason != "")
            document.all["dlReason"].selectedIndex = gReason;
        //---end---
        //0990809	Davy	0990429	使用者將發文方式切換為紙本時，一併勾選[不適用電子交換]。
        if (document.all.H_txAutoChkEIssue.value == "Y")
        {
            document.all.cbCanEIssue.checked = true;
            document.all.rbActualIssue2.disabled = true;
            document.all.rbActualIssue3.disabled = true;
        }
        document.all.btPasteBulletin.disabled = true;
        //1001116	Jeff	1000640 新增受文明細下拉選單
        if (document.all.dlEdetail)
            document.all.dlEdetail.disabled = true;
        if (document.all.dlTdetail)
            document.all.dlTdetail.disabled = true;
    }
    else if (document.all.rbActualIssue2.checked || document.all.rbActualIssue3.checked)//電子交換or電子公布欄
    {
        //0990831 David 0990552 取消電子交換一二三類及加密選項
        /*document.all.cbEncrypt.disabled = false;
		document.all.rbFepType1.disabled = false;
		document.all.rbFepType2.disabled = false;
		document.all.rbFepType3.disabled = false;
		if (!document.all.rbFepType1.checked && !document.all.rbFepType2.checked && !document.all.rbFepType3.checked)
			document.all.rbFepType1.checked = true;*/
        //1050906 David 1050087 二代轉DI修改，已無作用
        /*document.all.rbFepTypeUpper.checked = true;
        document.all.rbFepTypeUpper.disabled = false;*/
        //[需求單960167] Charles (中企處)無法電子交換原因 0960629
        //1001116	Jeff	1000640		下拉選單改為DropDownList---start---
        //document.all.dlReason_Text.disabled = true;
        document.all.dlReason.disabled = true;
        //document.all.dlReason_Text.className = "DisplayOnly";
        //gReason=document.all.dlReason_Text.value;
        //document.all.dlReason_Text.value = "";
        gReason = document.all["dlReason"].selectedIndex;
        document.all["dlReason"].selectedIndex = 0;
        //--end---
        if (jf_GetActionMode() != LayoutModeNew)
            document.all.btPasteBulletin.disabled = false;
        //0991202 David 0990652 調整連動行為
        document.all.cbCanEIssue.checked = false;
        document.all.rbActualIssue2.disabled = false;
        document.all.rbActualIssue3.disabled = false;
        //document.all.cbIsFep.checked = true;
        //1001116	Jeff	1000640 新增受文明細下拉選單
        if (document.all.dlEdetail)
            document.all.dlEdetail.disabled = false;
        if (document.all.dlTdetail)
            document.all.dlTdetail.disabled = false;
    }

    if (event.srcElement != null && event.srcElement != document.all.cbIsFep)
        jf_cbIsFep();
    //1050906 David 1050087 二代轉DI修改，已無作用
    //jf_FpeTypeOther();
}

//1050906 David 1050087 二代轉DI修改，已無作用
/*function jf_FpeTypeOther()
{
    if (document.all.rbFepType4.checked)
    {
        document.all.rbFepTypeUpper.checked = false;
        document.all.txFpeTypeOther.readOnly = false;
        document.all.txFpeTypeOther.className = "";
        document.all.btFepOther.disabled = false;
    }
    else
    {
        document.all.rbFepTypeUpper.checked = true;
        document.all.txFpeTypeOther.readOnly = true;
        document.all.txFpeTypeOther.className = "DisplayOnly";
        document.all.btFepOther.disabled = true;
        //0990831 David 0990552 取消電子交換第一二三類及加密選項
        //var strEncryptMode = document.all.nEncryptMode.value;
		//if (document.all.rbFepType1.checked)
		//	document.all.cbEncrypt.checked = strEncryptMode.substr(0,1) == "Y";
		//else if (document.all.rbFepType2.checked)
		//	document.all.cbEncrypt.checked = strEncryptMode.substr(1,1) == "Y";
		//else if (document.all.rbFepType3.checked)
		//{
		//	document.all.cbEncrypt.checked = strEncryptMode.substr(2,1) == "Y";
		//	document.all.btPasteBulletin.disabled = false;
		//}
    }
}*/

function jf_rbFepTypeUpperClick()
{
    //如果電子交換有check，才將第一類的選項設定為check
    //0990831 David 0990552 取消電子交換第一二三類及加密選項
    /*if (document.all.rbActualIssue2.checked)
		document.all.rbFepType1.checked = true;
	var strEncryptMode = document.all.nEncryptMode.value;
	document.all.cbEncrypt.checked = strEncryptMode.substr(0,1) == "Y";*/
    //1050906 David 1050087 二代轉DI修改，已無作用
    /*document.all.rbFepTypeUpper.checked = true;
    document.all.rbFepType4.checked = false;
    document.all.txFpeTypeOther.readOnly = true;
    document.all.txFpeTypeOther.className = "DisplayOnly";
    document.all.btFepOther.disabled = true;*/

    /*
	alert(document.all.txContent.value);
	var AttaFileCount = document.all.lbAttaListFile.options.length;
	var AttaFileName = new Array(AttaFileCount);
	var AttaFileDesc = new Array(AttaFileCount);
	for (var i = 0; i < AttaFileCount; i++)
	{
		AttaFileName[i] = document.all.lbAttaListFile.options[i].value;
		AttaFileDesc[i] = document.all.lbAttaListFile.options[i].text;
	}
	alert(AttaFileName);
	alert(AttaFileDesc);
	*/
    //alert(document.all.txCommonWS.value);
}

function jf_cbIsFep()
{
    //1050906 David 1050087 二代轉DI修改，已無作用
    /*if (document.all.cbIsFep.checked)
    {
        document.all.rbFepTypeUpper.disabled = false;
        document.all.rbFepType4.disabled = false;
    }
    else
    {
        document.all.rbFepTypeUpper.checked = false;
        document.all.rbFepTypeUpper.disabled = true;
        document.all.rbFepType4.disabled = false;
        document.all.rbFepType4.checked = false;
        //document.all.rbFepType4.disabled = true;
    }*/
    if (event.srcElement != null && event.srcElement == document.all.cbIsFep)
    {
        jf_cbCanEIssue();
    }
    //1050906 David 1050087 二代轉DI修改，已無作用
    //jf_FpeTypeOther();
}

function jf_btBullet()
{
    Page_BlockSubmit = true;
    /*
	var strDate = document.all.txBulletEndDate.value;
	//if (jf_Trim(strDate) == "" || ! jf_CheckCDATE(strDate))
	if (jf_Trim(strDate) == "")
	{
		document.all.txBulletEndDate.focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["公告期限日期"])),"");
		return;
	}
	*/
    if (fnCheckBeforeBulletin())
        jf_Bulletin();
}

function fnCheckBeforeBulletin()
{
    //檢查系統公告發布路徑是否存在
    if (jf_Trim(document.all.H_InsideTBWS.value) == "")
    {
        alert("系統未正確設定系統公告發布路徑，請聯絡系統管理員。");
        return false;
    }
    /*
	//檢查日期欄位
	var strDate = document.all.txBulletEndDate.value;
	if (jf_Trim(strDate) == "")
	{
		document.all.txBulletEndDate.focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["公告期限日期"])),"");
		return false;
	}
	if (!jf_CheckCDATE(strDate))
	{
		document.all.txBulletEndDate.focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["公告期限日期"])),"");
		return false;
	}

	//檢查類別項目
	if (!document.all.dlCategory)
	{
		alert("公告類別選項不存在，請洽系統管理員處理。");
		return false;
	}
	if (document.all.dlCategory.options[document.all.dlCategory.selectedIndex].value == "")	
	{
		document.all.dlCategory.focus();
		alert("公告類別必須設定。");
		return false;
	}
	*/
    //1010306 kevin 1010041 (中企處)新增發布公布欄時多傳入選取稿件
    if (document.all.H_OrgNo.value == "313050000G" && fnSelectDraft().indexOf("發文方式") != -1)
    {
        alert(fnSelectDraft());
        return false;
    }
    //檢查通過	
    return true;
}

function jf_btEmail()
{
    Page_BlockSubmit = true;
    fnEmailNotify();
}

/*
function CheckCDATE()
{
	if (!event.srcElement) return;
	if (jf_Trim(event.srcElement.value) == "") return;
	if(!jf_CheckCDATE(event.srcElement.value))
	{
		event.srcElement.focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["公告期限日期"])),"");
	}
}
*/
function fnOpenWin(arg)
{
    var newWin = window.open(arg);
    newWin.focus();
}

//檢查日期格式,並顯示訊息
function CheckDate(argObj, argObjName)
{
    if (argObj.value != "")
    {
        jf_PADCHAR(argObj, 7, '0');
        if (!jf_CheckCDATE(argObj.value))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
            return false;
        }
    }
    return true;
}

function fnEmailNotify()
{
    //寄送Email通知前檢查
    var bIsNotifyMain = document.all.cbEmailNotifyMain.checked;
    var bIsNotifyCopy = document.all.cbEmailNotifyCopy.checked;
    var bIsNotifyScript = document.all.cbEmailNotifyScript.checked;

    //當要以Email通知受文者時，檢查相關環境變數是否已設定
    if (bIsNotifyMain || bIsNotifyCopy || bIsNotifyScript)
    {
        if (!jf_CheckForEmail())
            return;
        jf_EmailNotify(document.all.txDocNo.value, bIsNotifyMain, bIsNotifyCopy, bIsNotifyScript, document.all.H_NotifyRole.value);
    }

}
//0970810 IRIS 新增一內部電子公欄位發文
function fnCheckIssueType(argOrgCanEIssueID, argIssueTypeID)
{
    if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;

    var strIssueType = document.all[argIssueTypeID].value;
    //1001116	Jeff	1000640	配合新增參數有可能增加發文方式，修改判斷邏輯
    var Pdetail = document.all.txPDetail.value.split(';');
    var Edetail = document.all.txEDetail.value.split(';');
    var Tdetail = document.all.txTDetail.value.split(';');
    //if (!document.all[argOrgCanEIssueID].checked && strIssueType == "1")
    var Msg = "";
    var Temp = "";
    var EIsOk = true;
    var PIsOk = false;
    var TIsOk = false;
    if (!document.all[argOrgCanEIssueID].checked)
    {
        for (var i = 0; i < Edetail.length; i++)
        {
            if (Edetail[i] == null || Edetail[i] == "")
                continue;
            var detail = Edetail[i].split('-');
			if (detail[0] != 4 && detail[0] == strIssueType)
            {
				EIsOk = false;
				break;
            }
        }
        for (var i = 0; i < Pdetail.length; i++)
        {
            if (Pdetail[i] == null || Pdetail[i] == "")
                continue;
            var detail = Pdetail[i].split('-');
            if (detail[0] == null || detail[0] == "")
                continue;
            if (detail[0] == strIssueType)
                PIsOk = true;
            Msg = Msg + Temp + detail[0] + "：" + detail[1];
            Temp = "、";
        }
        for (var i = 0; i < Tdetail.length; i++)
        {
            if (Tdetail[i] == null || Tdetail[i] == "")
                continue;
            var detail = Tdetail[i].split('-');
            if (detail[0] == null || detail[0] == "")
                continue;
            if (detail[0] == strIssueType)
                TIsOk = true;
            Msg = Msg + Temp + detail[0] + "：" + detail[1];
            Temp = "、";
        }
        if (!EIsOk && document.all.rbActualIssue2 != null && document.all.rbActualIssue2.checked)
        {
			//1141114 David 1141126 符合擴充電子交換發文方式，視為可電子交換
			if($('#ExtEIssueType').val() != "")
			{
				if($('#ExtEIssueType').val().includes(strIssueType))
					return true;
			}

            //1050802 Zen 1050087 二代公文修改
            //document.all[argIssueTypeID].focus();
            $('#' + argIssueTypeID).focus();
            //jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["此受文者不適用電子交換發文，請重新輸入。\n[2：郵寄、3：人工傳遞]"])),"");
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["此受文者不適用電子交換發文，請重新輸入。\n[" + Msg + "]"])), "");
            bHasCheck = false;
            return false;
        }
        else if (!PIsOk && !TIsOk && strIssueType != 4)
        {
            //1050802 Zen 1050087 二代公文修改
            //document.all[argIssueTypeID].focus();
            $('#' + argIssueTypeID).focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["不存在的發文方式，請重新輸入。\n[" + Msg + "]"])), "");
            bHasCheck = false;
            return false;
        }
    }
        //0981026 David 0980530 
    else
    {
        //Cola 000812
        //1000906	Jeff	1000678		新增海外發文選項，並且依照環境變數HAS_OS來改變限制輸入發文方式----strat
        //if (strIssueType != "1" && strIssueType != "2" && strIssueType != "3" && strIssueType != "4"&& strIssueType != "5"&& strIssueType != "6")//0970810 iris 取得是否有外部電子公佈欄系統
        //1001116	Jeff	1000640		配合以後有可能增加新的發文方式，變更檢核方式
        //if(document.all.H_txHasOs.value=="Y")
        //{
        //	if (strIssueType != "1" && strIssueType != "2" && strIssueType != "3" && strIssueType != "4"&& strIssueType != "5"&& strIssueType != "6" && strIssueType != "7")
        //	{
        //		document.all[argIssueTypeID].focus();
        //		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["發文別錯誤，請重新輸入。\n[1：電子交換、2：郵寄、3：人工傳遞]"])),"");
        //		bHasCheck = false;
        //		return false;
        //	}
        //}
        //else
        //{
        //	if (strIssueType != "1" && strIssueType != "2" && strIssueType != "3" && strIssueType != "4"&& strIssueType != "5"&& strIssueType != "6")
        //{
        //	document.all[argIssueTypeID].focus();
        //	jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["發文別錯誤，請重新輸入。\n[1：電子交換、2：郵寄、3：人工傳遞]"])),"");
        //	bHasCheck = false;
        //	return false;
        //}
        var IsOk = false;
        var strTemp = document.all.txPDetail.value + ";" + document.all.txEDetail.value + ";" + document.all.txTDetail.value;
        var detail = strTemp.split(';');
        for (var i = 0; i < detail.length; i++)
        {
            var strCodeNo = detail[i].split('-');
            if (strCodeNo[0] == strIssueType)
            {
                IsOk = true;
            }
        }
        if (!IsOk)
        {
            document.all[argIssueTypeID].focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["發文別錯誤，請重新輸入。\n[1：電子交換、2：郵寄、3：人工傳遞]"])), "");
            bHasCheck = false;
            return false;
        }
        //----end----
    }
    bHasCheck = false;
    return true;
}

//當發文別變動時，變更cbeckbox是否enable與checked
function fnIssueTyprBlur(bOrgCanEIssue, txIssueTypeID, cbIsseOrgID, dlPostType)
{
    //1001128	Jeff	1000640		配合擴充發文方式，修改判斷邏輯---start--
    var Pdetail = document.all.txPDetail.value.split(';');
    var Edetail = document.all.txEDetail.value.split(';');

    if (bOrgCanEIssue)
    {
        if (document.all[txIssueTypeID].value == "1")
        {
            document.all[cbIsseOrgID].disabled = false;
            document.all[cbIsseOrgID].checked = true;
            document.all[dlPostType].disabled = true;
        }
        else if (document.all[txIssueTypeID].value == "2")
        {
            document.all[cbIsseOrgID].disabled = true;
            document.all[cbIsseOrgID].checked = false;
            document.all[dlPostType].disabled = false;
        }
        else
        {
            document.all[cbIsseOrgID].disabled = true;
            document.all[cbIsseOrgID].checked = false;
            document.all[dlPostType].disabled = true;
        }
        //Cola 000812 新增判斷是否為電子郵件發文 -- start --
        //0981026 David 0980530 配合系統參數OD_SUPPORT_EMAIL重新定義，修改判斷
        //if (document.all.OD_SUPPORT_EMAIL.value == "Y")
        if (document.all.OD_SUPPORT_EMAIL.value != "N")
        {
            if (document.all[txIssueTypeID].value == "4")
            {
                document.all[cbIsseOrgID].disabled = false;
                document.all[cbIsseOrgID].checked = true;
                document.all[dlPostType].disabled = true;
            }
        }
        //Cola -- end --
        for (var i = 0; i < Edetail.length; i++)
        {
            if (Edetail[i] == null || Edetail[i] == "")
                continue;
            var detail = Edetail[i].split('-');
            if (detail[0] == null || detail[0] == "")
                continue;
            if (detail[0] == document.all[txIssueTypeID].value)
            {
                document.all[cbIsseOrgID].disabled = false;
                document.all[cbIsseOrgID].checked = true;
                document.all[dlPostType].disabled = true;
                break;
            }
        }
    }
    //---end----

    //1021015 Kevin 1020486 檢查是否需要電子檔轉出
    fnCheckBtTransfer();
}

//1021015 Kevin 1020486 檢查是否需要電子檔轉出
function fnCheckBtTransfer()
{
	//1100305	Joe		1100222		未通過檢核鎖定選項
	if(document.all.AttCheckFailed != null){
		document.all.btTransfer.disabled = true;
		document.all.btUpdate.disabled = true;
		document.all.btTransfer.title = document.all.AttCheckFailed.value;
		document.all.btUpdate.title = document.all.AttCheckFailed.value;
		return;
	}
    //1050802 Zen 10500087 二代公文修改
    //document.all.tbTool.getItem(2).setAttribute("disabled", true);
    document.all.btTransfer.disabled = true;

    if (!document.all.dg1)
        return;

    var Edetail = document.all.txEDetail.value.split(';');

    for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
    {

        if (document.all["dg1__ctl" + iRow + "_IssueType"].value == "1"
		|| document.all["dg1__ctl" + iRow + "_IssueType"].value == "4")
        {
            //1050802 Zen 10500087 二代公文修改
            //document.all.tbTool.getItem(2).setAttribute("disabled", false);
            document.all.btTransfer.disabled = false
            break;
        }

        for (var i = 0; i < Edetail.length; i++)
        {
            if (Edetail[i] == null || Edetail[i] == "")
                continue;

            if (document.all["dg1__ctl" + iRow + "_IssueType"].value == Edetail[i].split('-')[0])//表示此受文者之發文方式為電子交換類型
            {
                //1050802 Zen 10500087 二代公文修改
                //document.all.tbTool.getItem(2).setAttribute("disabled", false);
                document.all.btTransfer.disabled = false
                break;
            }
        }
    }
}

//ClientOnLoad時，依發文別設定cbeckbox是否勾選
function fnIssueOrgInit()
{
    if (!document.all.dg1)
        return;
    var Pdetail = document.all.txPDetail.value.split(';');
    var Edetail = document.all.txEDetail.value.split(';');
    var EisOk = false;
    var PisOk = false;
    for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
    {
        //0960703 Stella
        //1001128 Jeff 1000640 配合發文方式擴充，修改判斷邏輯
        for (var i = 0; i < Edetail.length; i++)
        {
            if (Edetail[i] == null || Edetail[i] == "")
                continue;
            var detail = Edetail[i].split('-');
            //1010829 David 1010878 調整判斷邏輯
            //if(document.all["dg1__ctl"+iRow+"_IssueType"].value==4 || detail[0]==document.all["dg1__ctl"+iRow+"_IssueType"].value)
            if (document.all["dg1__ctl" + iRow + "_IssueType"].value == detail[0])//表示此受文者之發文方式為電子交換類型
            {
                EisOk = true;
                break;
            }
        }
        //if (document.all["dg1__ctl"+iRow+"_IssueType"].value == "1" || document.all["dg1__ctl"+iRow+"_IssueType"].value == "4")
        if (EisOk)
        {
            document.all["dg1__ctl" + iRow + "_dlPostType"].disabled = true;
        }
        else if (document.all["dg1__ctl" + iRow + "_IssueType"].value == "2")
        {
            document.all["dg1__ctl" + iRow + "_cbIssueOrg"].disabled = true;
            document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked = false;
        }
        else
        {
            document.all["dg1__ctl" + iRow + "_cbIssueOrg"].disabled = true;
            document.all["dg1__ctl" + iRow + "_cbIssueOrg"].checked = false;
            document.all["dg1__ctl" + iRow + "_dlPostType"].disabled = true;
        }
        //1010829 David 1010878 設回預設值
        EisOk = false;
    }
    //1021015 Kevin 1020486 檢查是否需要電子檔轉出
    fnCheckBtTransfer();
}

function fnDocNoOnBlur()
{
    if (OriginalKeyCode == 13)
    {
        OriginalKeyCode = 0;
        Page_BlockSubmit = !jf_CheckKeyObject();
        jf_OpenButtonSubmit();
    }
}

function fnIssueDescTypeOnBlur(txIssueDescType, txIssueDesc)
{
    if (!document.all.dlIssueDescType.options || jf_Trim(document.all[txIssueDescType].value) == "")
        return;
    for (var i = 0; i < document.all.dlIssueDescType.options.length; i++)
    {
        if (jf_Trim(document.all[txIssueDescType].value) == document.all.dlIssueDescType.options[i].value)
        {
            document.all[txIssueDesc].value = document.all.dlIssueDescType.options[i].text;
            return;
        }
    }
    /*
	document.all[txIssueDescType].focus();
	jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無法找到相對應的發文附件註記，請重新輸入代碼。"])),"");
	return;
	*/
}

function fnAdjustAttachOfIssueOrg()
{
    //1050802 Zen 1050087 二代公文修改
	//1091110	Joe		1090725		因連動為受文者是否有附件->附件隨文是否勾選，故判斷改為點選附件頁簽後觸發較為合理--改由onclick鍵處理
	/*
    this.src = 'images/IssueOrgS.gif';
	document.all.Tab2.src = 'images/Attach.gif';
    document.all.Page2.setAttribute('class', 'hide');
    document.all.Page1.setAttribute('class', '');
	*/

    if (document.all["dg1"] && document.all["dg1"].rows && document.all["dg2"] && document.all["dg2"].rows)
    {
        //Do nothing
    }
    else
        return;

    //0981119 David 0980532 檢核是否需要轉出附件--START
    //調整附件Datagrid中附件隨文CheckBox是否需取消勾選，依據原則如下：
    //某稿件所有需電子交換的受文者若皆不需附件時，將該稿件於附件Datagrid中的附件隨文欄位皆不勾選
    var arrDraftNeedAtt = new Array();
    var OldDraftNo = "";
    var needAtt = false;
    for (var iRow = 2 ; iRow < document.all.dg1.rows.length + 1 ; iRow++)
    {
        var NewDraftNo = document.all["dg1__ctl" + iRow + "_txDraftNo"].value;
        if (OldDraftNo == "")
            OldDraftNo = NewDraftNo;

        if (OldDraftNo != NewDraftNo)//稿號不同
        {
			//1091110	Joe		1090725		改以二維陣列紀錄附件是否需勾選
            // if (!needAtt)
                // arrDraftNeedAtt[arrDraftNeedAtt.length] = OldDraftNo;//紀錄不轉出附件的稿號
			arrDraftNeedAtt[arrDraftNeedAtt.length] = [OldDraftNo, needAtt];
            needAtt = false;
            OldDraftNo = NewDraftNo;
        }

        var isChecked = document.all["dg1__ctl" + iRow + "_cbIssueOrg"];
        var cbIncludeAttach = document.all["dg1__ctl" + iRow + "_cbIncludeAttach"];
        if (isChecked.checked && cbIncludeAttach.checked)//有勾選且要轉出附件
            needAtt = true;

			//1091110	Joe		1090725		改以二維陣列紀錄附件是否需勾選
        // if (iRow == document.all.dg1.rows.length && !needAtt)//最後一筆
            // arrDraftNeedAtt[arrDraftNeedAtt.length] = OldDraftNo;//紀錄不轉出附件的稿號
        if (iRow == document.all.dg1.rows.length)//最後一筆
            arrDraftNeedAtt[arrDraftNeedAtt.length] = [OldDraftNo, needAtt];
    }

    for (var iRow = 2 ; iRow < document.all.dg2.rows.length + 1 ; iRow++)
    {
		//1100305	Joe		1100161		當紙本、或附件上傳DL時，鎖定選項不異動--S
		if(document.all["dg2__ctl" + iRow + "_cbAttachWithDoc"].disabled)
			continue;
		//1100305	Joe		1100161		當紙本、或附件上傳DL時，鎖定選項不異動--E
        var sDraftNo = document.all["dg2__ctl" + iRow + "_txDraftNo"].value;

        for (var j = 0 ; j < arrDraftNeedAtt.length ; j++)
        {
			//1091110	Joe		1090725		改以二維陣列紀錄附件是否需勾選
            // if (sDraftNo == arrDraftNeedAtt[j])//將不需轉出附件的稿號，於附件Datagrid中的附件隨文欄位不勾選
                // document.all["dg2__ctl" + iRow + "_cbAttachWithDoc"].checked = false;
            if (sDraftNo == arrDraftNeedAtt[j][0])//將不需轉出附件的稿號，於附件Datagrid中的附件隨文欄位不勾選
                document.all["dg2__ctl" + iRow + "_cbAttachWithDoc"].checked = arrDraftNeedAtt[j][1];
        }
    }
	

    //因調整連動邏輯以下Mark掉
    /*
	//調整受文機關Datagrid中附件的CheckBox是否需取消勾選，依據原則如下：
	//某一稿件在附件資訊Datagrid中的"附件隨文"欄位皆未勾選，則將該稿件於受文機關Datagrid中的"附件"欄位皆uncheck
	var arrDraftNo = new Array();
	for (var iRow=2;iRow<document.all.dg2.rows.length+1;iRow++)
	{
		var bAttachWithDoc	= document.all["dg2__ctl"+iRow+"_cbAttachWithDoc"].checked;
		if(bAttachWithDoc == false)
			continue;

		var sDraftNo		= document.all["dg2__ctl"+iRow+"_txDraftNo"].value;
		arrDraftNo[arrDraftNo.length] = sDraftNo;
	}

	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		var objIncludeAttach	= document.all["dg1__ctl"+iRow+"_cbIncludeAttach"];

		if(objIncludeAttach.disabled)
			continue;
		if(objIncludeAttach.checked == false)
			continue;

		var bCheckOK	= false;
		var sDraftNo	= document.all["dg1__ctl"+iRow+"_txDraftNo"].value;
		for(var j=0; j<arrDraftNo.length; j++)
		{
			if(sDraftNo == arrDraftNo[j])
			{
				bCheckOK = true;
				break;
			}
		}
		if(bCheckOK == false)
			objIncludeAttach.checked = false;
	}*/
    //END
}

function UploadToDL()
{
    //1020615 Kevin 1020264 新增發文內外閘道電子檔轉出
    if (document.all["h_TransDiMode"].value == "4" && document.all["h_TransDiMode"] && document.all["dg2"] && document.all.H_Draft_AttachName.options.length > 0 && document.all["H_HasDL"].value == "1")
    {
        //1020615 Kevin 1020264 因DI轉出文面皆包含附件下載區，故一律上傳至附件下載區
        document.all["txUploadToDL"].value = "Y";
        //1030916 David 1030393 因新增上傳附件下載區獨立功能鍵，修改回傳值
        //return;
        return true;

        //var TranAttSize = (!isNaN(document.all["H_TransAttSize"].value)) ? parseInt(document.all["H_TransAttSize"].value) : 0;
        //var TranAttInSize = (!isNaN(document.all["H_TransAttInSize"].value)) ? parseInt(document.all["H_TransAttInSize"].value) : 0;
        //var nSizeLimit = 0;
        //
        ////參數為空或0時，不限制
        //if(TranAttSize != 0)
        //{
        //	//計算附件大小
        //	for (var iRow=2;iRow<document.all["dg2"].rows.length+1;iRow++)
        //	{
        //		if(document.all["dg2__ctl"+iRow+"_cbAttachWithDoc"].checked)
        //			nSizeLimit += parseInt(document.all["dg2__ctl"+iRow+"_lbAttachFileSize"].innerText);
        //			
        //		if(iRow==document.all["dg2"].rows.length || document.all["dg2__ctl"+iRow+"_txDraftNo"].value!=document.all["dg2__ctl"+(iRow+1)+"_txDraftNo"].value)
        //		{
        //			if(nSizeLimit > TranAttInSize)
        //			{
        //				for (var jRow=2;jRow<document.all["dg1"].rows.length+1;jRow++)
        //				{
        //					var iDraft = document.all["dg2__ctl" + iRow + "_txDraftNo"].value;
        //					var jDraft = document.all["dg1__ctl" + jRow + "_txDraftNo"].value;
        //					
        //					if(iDraft==jDraft && document.all["dg1__ctl" + jRow + "_txIssueGateWay"].value == "I")
        //						document.all["txUploadToDL"].value += iDraft + "|";
        //				}
        //			}
        //			if(nSizeLimit > TranAttSize)
        //			{
        //				for (var jRow=2;jRow<document.all["dg1"].rows.length+1;jRow++)
        //				{
        //					var iDraft = document.all["dg2__ctl" + iRow + "_txDraftNo"].value;
        //					var jDraft = document.all["dg1__ctl" + jRow + "_txDraftNo"].value;
        //					
        //					if(iDraft==jDraft && document.all["dg1__ctl" + jRow + "_txIssueGateWay"].value == "O")
        //						document.all["txUploadToDL"].value += iDraft + "|";
        //				}
        //			}
        //		}
        //	}
        //}
        //
        //if(document.all["txUploadToDL"].value == "")
        //	document.all["txUploadToDL"].value = "N";
        //else
        //	document.all["txUploadToDL"].value = "Y|" + document.all["txUploadToDL"].value;
        //	
        //return;
    }


    document.all["txUploadToDL"].value = "N";

    if (document.all["H_HasDL"].value != "1")
    {
        //1030916 David 1030393 因新增上傳附件下載區獨立功能鍵，修改回傳值
        //return;
        return false;
    }

    //1000502 David 1000211 已於SERVER端取得資訊，此處不需要
    /*LoadDraftDocInfo();
	var bIsUploadToDL = IsUploadToDL();
	if(bIsUploadToDL)*/
    if (document.all.H_Draft_AttachName.options.length > 0)
    {
        if (window.confirm("是否將附件檔案傳送至附件下載區？"))
        {
			//1080318	Joe		1080098		弱掃修正禁用WSDL--S
			/*
            //檢查是否已存在附件下載區
            var arWSParam = new Array(8);
            //1000502 David 1000211 因改為各稿件分別上傳，發文號有可能包含支號，故一律取前10碼進行查詢
			//1060613 Justin [1060456] 弱掃Client Potential Code Injection修正
			//var strDlDocNo = document.all.H_Draft_IssueNo.options[0].text.substr(0, 10);
			var strDlDocNo = encodeURI(document.all.H_Draft_IssueNo.options[0].text.substr(0, 10));
            //arWSParam[0] = document.all["txDocNo"].value;
            arWSParam[0] = strDlDocNo;
            arWSParam[1] = "";
            arWSParam[2] = "";
            arWSParam[3] = "";
            arWSParam[4] = "";
            arWSParam[5] = "";
            arWSParam[6] = "N";
            //1010418 David 1000854 新增傳入機關代碼
            //1060613 Justin [1060456] 弱掃Client Potential Code Injection修正
			//arWSParam[7] = document.all["H_NowOrgNo"].value;
			arWSParam[7] = encodeURI(document.all["H_NowOrgNo"].value);

            //1060613 Justin [1060456] 弱掃Client Potential Code Injection修正
			//var callObj = jf_CallWS(document.all["H_DL_OUTSIDE_AP_WS"].value, "SearchAttachInfoSession", false, arWSParam);
			var callObj = jf_CallWS(encodeURI(document.all["H_DL_OUTSIDE_AP_WS"].value), "SearchAttachInfoSession", false, arWSParam);
			*/
        	//1080905	Joe		1080657		ODT351改為透過Ajax檢核附件是否重複--S
			/*
			var params = new SOAPClientParameters();
			params.add('argSessionID',  jf_GetArtifact());
			//1080531 Joe 1080481 弱掃修正Client Potential Code Injection
			// params.add('argDocNo', document.all.H_Draft_IssueNo.options[0].text.substr(0, 10));
			params.add('argDocNo', encodeURI(document.all.H_Draft_IssueNo.options[0].text.substr(0, 10)));
			params.add('argIssueDateStart', "");
			params.add('argIssueDateEnd', "");
			params.add('argSubject', "");
			params.add('argUnitCode', "");
			params.add('argIdentifyCode', "");
			params.add('argFromOutSide', "N");
			//1080531 Joe 1080481 弱掃修正Client Potential Code Injection--S
			// params.add('argOrgNo', document.all["H_NowOrgNo"].value);
			// var callObj = SOAPClient.invokeJSON(document.all["H_DL_OUTSIDE_AP_WS"].value, "SearchAttachInfoSession", params ,false, null)
			params.add('argOrgNo', encodeURI(document.all["H_NowOrgNo"].value));
			var callObj = SOAPClient.invokeJSON(encodeURI(document.all["H_DL_OUTSIDE_AP_WS"].value), "SearchAttachInfoSession", params, false, null)
			*/
			//1130815   Joe     1130747     調整附件下載區上傳方式
        	// var callObj = OD.ODT351.SearchAttachInfo(encodeURI(document.all["H_DL_OUTSIDE_AP_WS"].value), jf_GetArtifact(), encodeURI(document.all.H_Draft_IssueNo.options[0].text.substr(0, 10)), encodeURI(document.all["H_NowOrgNo"].value));
        	var callObj = OD.ODT351.SearchAttachInfo(encodeURI(document.all["H_DLUPLOAD_WS"].value), jf_GetArtifact(), encodeURI(document.all.H_Draft_IssueNo.options[0].text.substr(0, 10)), encodeURI(document.all["H_NowOrgNo"].value));
        	//1080905	Joe		1080657		ODT351改為透過Ajax檢核附件是否重複--E
			//1080531 Joe 1080481 弱掃修正Client Potential Code Injection--E
			//1080318	Joe		1080098		弱掃修正禁用WSDL--E

            if (callObj.error)
            {
                alert("搜尋文號是否存在於附件下載區時失敗：" + callObj.errorDetail.string);
            }
            else
            {
                if (callObj.value.m_bSuccess == false)
                    alert("取得文號是否存在於附件下載區資訊時發生錯誤：" + callObj.value.m_strErrMsg);
                else
                {
                    if (callObj.value.Info.length > 0)
                    {
                        //有資料--提示確認
                        if (window.confirm("此文號已有資料於附件下載區中，是否要覆蓋？"))
                            document.all["txUploadToDL"].value = "Y";
                    }
                    else
                        document.all["txUploadToDL"].value = "Y";
                }
            }
        }
    }

    //1030916 David 1030393 因新增上傳附件下載區獨立功能鍵，修改回傳值
    if (document.all["txUploadToDL"].value == "Y")
        return true;
    else
        return false;
}

function IsUploadToDL()
{
    var rtn = false;

    var IsUploadNode = xDraftDoc.selectSingleNode("//是否上傳至附件下載區");
    if (IsUploadNode)
    {
        if (IsUploadNode.text == "Y")
            rtn = true;
    }
    return rtn;
}

//ZOEY [951006, 95/12/07] 文稿編輯
function jf_ViewPaper()
{
	//1051019 David 1050087 二代修改，文稿編輯改以二代模組開啟
    /*var artifact = document.all.H_Artifact.value;
    var strDocNo = document.all["txDocNo"].value;
    var ret;
    ret = document.all.ocx.SetTargetUser(artifact);
    if (ret == false)
    {
        alert("使用者權杖(Artifact) 驗證失敗，無法執行文稿調閱");
        return;
    }
    uClientPath = document.all.H_WorkPath.value + "ODT351_EDIT_TMP\\";
    if (!fso.FolderExists(uClientPath))
        fso.CreateFolder(uClientPath)

    ret = document.all.ocx.DownloadDocument3(artifact, document.all["H_NowOrgNo"].value, strDocNo, uClientPath);

    if (ret)
        OpenEdit(strDocNo);
    else
        alert("下載公文檔案失敗，無法開啟文稿編輯");*/

	//1091210 David 1090891 FDA已有客製化版本，共通版不需此邏輯，移除功能
	/*//1060601 David 1050087 判斷使用機關為FDA、瀏覽器為IE且由一代系統登入，「文稿編輯」功能鍵行為同一代邏輯開啟公文製作
	var bOpenByODP = false;
	if (document.all.H_OrgNickName.value == "FDA" && getIEVersion() != -1)
	{
		var artifact = document.all.H_Artifact.value;
		var strDocNo = document.all["txDocNo"].value;
		var ret;
		try
		{
			//可以設定成功表示是由一代系統登入
			ret = document.all.ocx.SetTargetUser(artifact);
			if (ret == true)
				bOpenByODP = true;
		}
		catch(e){}
	}

	if(bOpenByODP)
	{
		uClientPath = document.all.H_WorkPath.value + "ODT351_EDIT_TMP\\";
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		if (!fso.FolderExists(uClientPath))
			fso.CreateFolder(uClientPath)

		var ret = document.all.ocx.DownloadDocument3(artifact, document.all["H_NowOrgNo"].value, strDocNo, uClientPath);
		if (ret)
			OpenEdit(strDocNo);
		else
			alert("下載公文檔案失敗，無法開啟文稿編輯");
	}
	else
	{
		try
		{
			//1060731 David 修正簽核類型來源
			//var sSignType = document.all.SIGN_TYPE.value;
			var sSignType = document.all.txSignType.value;
			var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
			unvSrc = unvSrc.replace('#artifact#',document.all.H_Artifact.value);
			unvSrc = unvSrc.replace('#DocNo#',document.all["txDocNo"].value);
			unvSrc = unvSrc.replace(/#SourceOrgNo#/g,document.all["H_NowOrgNo"].value);
			var objViewDoc = {
				UNVObj: JSON.parse(unvSrc),
				docInfoPage: "AKI802",
				openDocModule: 'AOL',
				signType: sSignType,
				readOnlyMode: false,
				disableSave: true
			};
			var $docId = jf_GetSessionID() + "_" + (+new Date());
			localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
			var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + document.all.H_Artifact.value + "&DocId=" + $docId;
			jf_OpenChildWin(unvUrl, "AKI802ViewDoc");
		} catch (e) {
			alert('開啟失敗');
		}
	}*/
	try
	{
		//1060731 David 修正簽核類型來源
		//var sSignType = document.all.SIGN_TYPE.value;
		var sSignType = document.all.txSignType.value;
		var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
		unvSrc = unvSrc.replace('#artifact#',document.all.H_Artifact.value);
		unvSrc = unvSrc.replace('#DocNo#',document.all["txDocNo"].value);
		unvSrc = unvSrc.replace(/#SourceOrgNo#/g,document.all["H_NowOrgNo"].value);
		var objViewDoc = {
			UNVObj: JSON.parse(unvSrc),
			docInfoPage: "AKI802",
			openDocModule: 'AOL',
			signType: sSignType,
			readOnlyMode: false,
			disableSave: true
		};
		var $docId = jf_GetSessionID() + "_" + (+new Date());
		localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
		var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + document.all.H_Artifact.value + "&DocId=" + $docId;
		jf_OpenChildWin(unvUrl, "AKI802ViewDoc");
	} catch (e) {
		alert('開啟失敗');
	}
}

function fnPatchIssueDesc()//0960831 001262 Matte
{
    Page_BlockSubmit = true;
    if (document.all.dg1)
    {
        var dgObj = document.all["dg1"];
        for (var i = 2; i < dgObj.rows.length + 1; i++)
        {
            document.all["dg1__ctl" + i + "_txIssueDescType"].value = document.all["txPathIssueDescType"].value;
            document.all["dg1__ctl" + i + "_txIssueDesc"].value = document.all["txPathIssueDesc"].value;
        }
    }
}

//1051019 David 1050087 二代修改，文稿編輯改以二代模組開啟，此處不需要
//1060601 David 1050087 取消MARK，供FDA使用
function OpenEdit(argDocNo)
{
	//1060601 David 1050087 新增宣告
	var fso = new ActiveXObject("Scripting.FileSystemObject");

    //0970784 iris
    //取得環境變數 OD_WS_LOCATION 填入 WSDL4USERINFO參數
    var WSDL4USERINFO = document.all.OD_WS_LOCATION.value;
    var EditPath = "file:///C:/2100/公文製作/MainCtrl.html";//?MODE=4&ID="+document.all["USERNAME"].value +"&PW="+fnGetArtifact()+"&ReadOnly=No&Action=NEW&WSREQUEST=NO&WSDL4USERINFO="+WSDL4USERINFO+"&Location=";
    var pQuerry = "Action=NEW&MODE=3&ID=" + document.all["USERNAME"].value + "&PW=" + fnGetArtifact() + "&ReadOnly=No&WSREQUEST=NO&WSDL4USERINFO=" + WSDL4USERINFO + "&SIGNTYPE=P&Location=";
    if (document.all.SIGN_TYPE.value == "E")
        pQuerry = "Action=Open&MODE=2&ID=" + document.all["USERNAME"].value + "&PW=" + fnGetArtifact() + "&ReadOnly=Yes&WSREQUEST=NO&WSDL4USERINFO=" + WSDL4USERINFO + "&Location=";
    //找尋是否有製作檔 FOLDER = 文號-00-99
    var IsFolderExist = false;
    // 公文製作檔目錄
    //1040729 David 1030160 如為他機關外陳外會公文，開啟公文製作時需特殊處理
    //var pDocFolder = uClientPath +  argDocNo + "-00-99";
    var pDocFolder = uClientPath;
    if (document.all.IsComeOthers)//他機關外陳外會公文
    {
        pDocFolder += argDocNo + "-" + document.all["H_NowOrgNo"].value + "-00-99";
    }
    else//一般公文
    {
        pDocFolder += argDocNo + "-00-99";
    }

    LOCATION = uClientPath;

    if (fso.FolderExists(pDocFolder))
        IsFolderExist = true;
    if (IsFolderExist)
    {
        //while(pDocFolder.indexOf("\\") != -1)
        //{
        //	pDocFolder = pDocFolder.replace("\\","/");
        //}
        //EditPath +=pDocFolder + "\\";
        pQuerry += pDocFolder + "\\";

        try
        {
            //EditPath +="&OrgID="+document.all["H_OrgNo"].value;
            pQuerry += "&OrgID=" + document.all["H_NowOrgNo"].value;
            //不可shell iris 0970784
            if (document.all.ocx.GetEnvSet("AKI802_WEBEDIT_BY_SHELL") == "Y")
            {
                //caesar 0940519 避免XP SP2問題
                //改以ShellExecute開啟公文製作
                var oShell = new ActiveXObject("Shell.Application");
                var strFeature = "";
                var strWidth = "";
                var strHeight = "";
                var strWinName = "";
                //iris 0970784 create edtmp.xml
                CrtEDTmpXML();
                //Stella 修改會出現IE網址列問題
                var param = "file:///C:/2100/SSO/Medium.html?Feature=" + strFeature + "&TargetUrl=" + escape(encodeURIComponent(EditPath + "?" + pQuerry)) + "&WinName=" + strWinName + "&Feature=" + strFeature + "&Width=" + strWidth + "&Height=" + strHeight;
                var commandtoRun = "";
                //0960616 000232 Caesar 修正於IE7.0環境下,以ShellExecute執行Iexplore.exe時
                //		所傳入指址參數無法於網頁中正確取得,修正將參數先寫入C:\2100\sso\WebEdit.TXT中.
                //		再於開啟時讀取之
                var fsolog = new ActiveXObject("Scripting.FileSystemObject");
				//1070824	Joe		1070678		修正弱掃Hardcoded Absolute Path
                // var pLogFile = fsolog.CreateTextFile("c:\\2100\\SSO\\WebEdit.TXT", true);
                pLogFile.write(param);
                pLogFile.close();
                //
                var editwin = oShell.ShellExecute("IEXPLORE.EXE", param, null, null, "0");
            }
            else
            {
                //iris 0970784 create edtmp.xml
                CrtEDTmpXML();
                uEditWin = jf_OpenChildWin(EditPath + "?" + pQuerry);

                uTimerID = setInterval("WaitClose();", 500);
            }
        }
        catch (e)
        {
            alert(e.message)
        }
    }
    else
    {
        alert("公文製作檔不存在");
    }
}
function WaitClose()
{
    if (uEditWin.closed)
    {
        clearInterval(uTimerID);
        Page_BlockSubmit = !jf_CheckKeyObject();
        jf_OpenButtonSubmit();
    }
}

//0970784 IRIS CREATE EDTMP.XML
function CrtEDTmpXML()
{
    var xOutDoc = new ActiveXObject("MSXML2.DOMDocument");
    var pXmlNode;

    pUrlStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n\r<DOC_CONTENT>\n\r</DOC_CONTENT>"
    xOutDoc.loadXML(pUrlStr);

    pXmlNode = xOutDoc.createElement("DocNo")
    pXmlNode.text = document.all.txDocNo.value;
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("Subject")
    pXmlNode.text = document.all.txSubject.value;
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("Deptment")
    pXmlNode.text = document.all.H_UnitName.value;
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("Username")
    pXmlNode.text = document.all.USERNAME.value; //WDCM的承辦人名稱
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("FromOrg")//來文機關
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("FromOrgNo")//來文機關代碼
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("PostCode")//郵遞區號
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("Address")//住址
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("SendType")//住址
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("ClassNo") //分類號
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("KeepYear")
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("SecNo");//密等
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("RMVSecCond");//解密條件
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("RMVSecDate");//保密期限
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("FromNoWord");//來文字
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("FromNoNo");//來文字
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("FromDate");//來文日期
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("RcvDate");//收文日期
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("DueDate");//限辦日期
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("SpdNo");//速別
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("CaseNo");//案次號
    pXmlNode.text = "";
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("WebFileIOURL");//遠端伺服器的WebFileIO   取得環境變數ERCV_WEBIO
    pXmlNode.text = document.all.ERCV_WEBIO.value;
    xOutDoc.documentElement.appendChild(pXmlNode);

    pXmlNode = xOutDoc.createElement("RemoteSavePath");//公文夾應上傳儲存的子目錄全路徑
    var strSubPath = "";
    if (document.all.txDocNo.value != "")
        strSubPath = document.all.txDocNo.value + "-00-99";
    else
        strSubPath = "00-99";

    pXmlNode.text = document.all.STORAGE_PATH.value + "\\" + document.all.SUB_DIR.value + "\\" + strSubPath;

    xOutDoc.documentElement.appendChild(pXmlNode);

    xOutDoc.save(LOCATION + gEDTMPFile);
}

//0991203 David 0990800 檢核發文方式與受文者發文方式合理性
function CheckOrgIssueType()
{
    var bOrgBulletin = false;
    var bOrgEIssue = false;
    var bOrgInSideBulletin = false;
    //1001116	Jeff	1000640		紀錄各發文方式細項
    var Pdetail = document.all.txPDetail.value.split(';');
    var Edetail = document.all.txEDetail.value.split(';');
    var Tdetail = document.all.txTDetail.value.split(';');

    //1010326	Jeff	1010235		判斷是否只有抄本
    var TransCript = false;
    if (document.all.OD_TRANSCRIPT_CHECK != null && document.all.OD_TRANSCRIPT_CHECK.value == "N")
    {
        for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
        {
            //1050802 Zen 10500087 二代公文修改
            //if (document.all["dg1__ctl" + iRow + "_lbDocType"].innerText != "抄本")
            if (document.all["dg1__ctl" + iRow + "_lbDocType"].textContent != "抄本")
                TransCript = true;
        }
    }

    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
    {
        //1010326	Jeff 1010235  如果受文者不全部為抄本且參數設為N時，抄本不檢核
        //1050802 Zen 10500087 二代公文修改
        //if (document.all.OD_TRANSCRIPT_CHECK != null && document.all.OD_TRANSCRIPT_CHECK.value == "N" && TransCript && document.all["dg1__ctl" + iRow + "_lbDocType"].innerText == "抄本")
        if (document.all.OD_TRANSCRIPT_CHECK != null && document.all.OD_TRANSCRIPT_CHECK.value == "N" && TransCript && document.all["dg1__ctl" + iRow + "_lbDocType"].textContent == "抄本")
            continue;
        //1050802 Zen 10500087 二代公文修改
        //if (document.all["dg1__ctl" + iRow + "_IssueOrg"].innerText == "全國政府機關電子公布欄" && document.all["dg1__ctl" + iRow + "_IssueType"].value == "1")
        if (document.all["dg1__ctl" + iRow + "_IssueOrg"].textContent == "全國政府機關電子公布欄" && document.all["dg1__ctl" + iRow + "_IssueType"].value == "1")
        {
            bOrgBulletin = true;
            bOrgEIssue = true;
            break;
        }
        //1050802 Zen 10500087 二代公文修改
        //else if (document.all["dg1__ctl" + iRow + "_IssueType"].value == "1" || (document.all["dg1__ctl" + iRow + "_lbDocType"].innerText != "抄本" && document.all["dg1__ctl" + iRow + "_IssueType"].value == "4"))
		//1061221 David 1061264 調整判斷電郵發文方式不排除抄本，同受文者編輯子視窗邏輯
        //else if (document.all["dg1__ctl" + iRow + "_IssueType"].value == "1" || (document.all["dg1__ctl" + iRow + "_lbDocType"].textContent != "抄本" && document.all["dg1__ctl" + iRow + "_IssueType"].value == "4"))
		else if (document.all["dg1__ctl" + iRow + "_IssueType"].value == "1" || document.all["dg1__ctl" + iRow + "_IssueType"].value == "4")
        {
            bOrgEIssue = true;
        }
        else if (document.all["dg1__ctl" + iRow + "_IssueType"].value == "5")
        {
            bOrgInSideBulletin = true;
        }
        //1000906	Jeff	1000678		新增海外發文檢核判斷
        if (document.all["H_txHasOs"].value == "Y" && document.all["dg1__ctl" + iRow + "_IssueType"].value == "7" && document.all["dg1__ctl" + iRow + "_txIsOverSea"].value != "1")
        {
            //1050802 Zen 10500087 二代公文修改
            //alert("序" + document.all["dg1__ctl" + iRow + "_lbSeq"].innerText + "：發文別設定有誤，非海外單位不可做海外發文]");
			//1141110 David 1141112 海外發文支援外貿使用，調整文字
            //alert("序" + document.all["dg1__ctl" + iRow + "_lbSeq"].textContent + "：發文別設定有誤，非海外單位不可做海外發文]");
			alert("序" + document.all["dg1__ctl" + iRow + "_lbSeq"].textContent + "：發文別設定有誤，非" + gOsIssueName + "單位不可做" + gOsIssueFullName + "]");
            return;
        }
        //1001116 Jeff 1000640 新增發文方式細項，修改相關檢核邏輯---statr-----	
        for (var i = 0; i < Edetail.length; i++)
        {
            var detail = Edetail[i].split('-');
            //1010326	Jeff	1010235		修正誤取消原本抄本不檢核發文方式判斷
            //if(detail[0]==document.all["dg1__ctl"+iRow+"_IssueType"].value)
            //1050802 Zen 10500087 二代公文修改
            //if (detail[0] == document.all["dg1__ctl" + iRow + "_IssueType"].value && document.all["dg1__ctl" + iRow + "_lbDocType"].innerText != "抄本")
            if (detail[0] == document.all["dg1__ctl" + iRow + "_IssueType"].value && document.all["dg1__ctl" + iRow + "_lbDocType"].textContent != "抄本")
            {
                bOrgEIssue = true;
                break;
            }
        }
        for (var i = 0; i < Tdetail.length; i++)
        {
            var detail = Tdetail[i].split('-');
            if (detail[0] == document.all["dg1__ctl" + iRow + "_IssueType"].value)
            {
                bOrgInSideBulletin = true;
                break;
            }
        }
        //---end----		
    }

    //0991203 David 0990892 密等公文不可採電子發文
    if ((bOrgEIssue || bOrgInSideBulletin) && document.all.H_SecNo.value != "1")
    {
        //1000105 David 調整密等公文處理方式
        //alert("本份文為密不可採電子交換或電子公布欄發文，請調整受文者發文方式及本分文發文方式");
        if (!window.confirm("本份文密等為密以上，發文方式是否維持電子交換或電子公布欄發文(如不是請於公文製作調整受文者發文方式)"))
            return false;
    }

    var Msg = "";
    var NowIssueStr = "";
    var NowIssueType = "";
    if (document.all.rbActualIssue1.checked)
        NowIssueStr = "紙本";
    else if (document.all.rbActualIssue2.checked)
        NowIssueStr = "電子交換";
    else
        NowIssueStr = "電子公布欄";

    if (bOrgBulletin && document.all.rbActualIssue3.checked == false)
    {
        Msg = "[" + NowIssueStr + "]調整為[電子公布欄]";
        NowIssueType = "1";
    }
    else if (bOrgEIssue && document.all.rbActualIssue2.checked == false)
    {
        Msg = "[" + NowIssueStr + "]調整為[電子交換]";
        NowIssueType = "2";
    }
        //1000303 David 1000246 如有電子交換，應以電子交換為主
        //else if(bOrgInSideBulletin && document.all.rbActualIssue3.checked == false)
    else if (!bOrgEIssue && bOrgInSideBulletin && document.all.rbActualIssue3.checked == false)
    {
        Msg = "[" + NowIssueStr + "]調整為[電子公布欄]";
        NowIssueType = "3";
    }
    else if (!bOrgBulletin && !bOrgEIssue && !bOrgInSideBulletin && document.all.rbActualIssue1.checked == false)
    {
        Msg = "[" + NowIssueStr + "]調整為[紙本]";
        NowIssueType = "4";
    }

    if (NowIssueType != "")
    {
        var showMsg = "目前發文方式與受文者發文方式不符，發文方式將由" + Msg + "，是否繼續執行發文資料更新？";
        if (window.confirm(showMsg))
        {
            switch (NowIssueType)
            {
                case "1":
                    document.all.rbActualIssue1.checked = false;
                    document.all.rbActualIssue2.checked = false;
                    document.all.rbActualIssue3.checked = true;
                    break;
                case "2":
                    document.all.rbActualIssue1.checked = false;
                    document.all.rbActualIssue2.checked = true;
                    document.all.rbActualIssue3.checked = false;
                    break;
                case "3":
                    document.all.rbActualIssue1.checked = false;
                    document.all.rbActualIssue2.checked = false;
                    document.all.rbActualIssue3.checked = true;
                    break;
                case "4":
                    document.all.rbActualIssue1.checked = true;
                    document.all.rbActualIssue2.checked = false;
                    document.all.rbActualIssue3.checked = false;
                    break;
            }
            jf_rbActualIssue();
        }
        else
            return false;
    }

    return true;
}
//1141110 David 1141112 移除一代海外CLIENT發布處理
/*//1000906 Jeff 1000678 重複海外發文判斷
function CheckOsSecondSend()
{
    var NeedCheck = false;
    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_IssueType"].value == "7")
        {
            NeedCheck = true;
            break;
        }
    }
    if (!NeedCheck)
        return;
    document.all.H_txOsSecIssue.value = "";
    var strWs = document.all.H_OS_WS.value;
	//1080318	Joe		1080098		弱掃修正禁用WSDL--S
	//var arWSParam = new Array();
    //arWSParam[0] = document.all["H_OrgNo"].value;
    //arWSParam[1] = document.all["txDocNo"].value;
    //var callObj = jf_CallWS(strWs, "SearchDocInfoSession", false, arWSParam);
	var params = new SOAPClientParameters();
	params.add('SessionID',  jf_GetArtifact());
	params.add('argSourceOrgno', document.all["H_OrgNo"].value);
	params.add('argDocNo', document.all["txDocNo"].value);
	var callObj = SOAPClient.invokeJSON(strWs, "SearchDocInfoSession", params ,false, null)
	//1080318	Joe		1080098		弱掃修正禁用WSDL--E
    var _SaveL = callObj.value;
    if (_SaveL.error)
    {
        alert(_SaveL.m_strErrMsg);
        return;
    }
    else
    {
        //如果已經存在
        if (_SaveL.bExist)
        {
            if (window.confirm("此份公文已做過海外發文，繼續執行會將最新的公文資訊及附件重新傳送至海外系統\n\n請問是否繼續執行海外發文？"))
                document.all.H_txOsSecIssue.value = "Y";
        }
        else
            document.all.H_txOsSecIssue.value = "Y";
    }
}*/
//1001207	Jeff	1000640	設定發文細項
function SetIssueDetail()
{
    var DetailNo = jf_Trim(document.all.txIssueDetailNo.value);
    if (DetailNo == "")
        return;
    if (document.all.rbActualIssue1.checked && document.all.dlPdetail)
    {
        SetDDlSelectByValue("dlPdetail", DetailNo);
    }
    if (document.all.rbActualIssue2.checked && document.all.dlEdetail)
    {
        SetDDlSelectByValue("dlEdetail", DetailNo);
    }
    if (document.all.rbActualIssue3.checked && document.all.dlTdetail)
    {
        SetDDlSelectByValue("dlTdetail", DetailNo);
    }
}
//透過Value值選取DropDownList中的Item
function SetDDlSelectByValue(argSelectId, argSelectValue)
{
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        if (document.all[argSelectId].options[i].value == argSelectValue)
        {
            document.all[argSelectId].selectedIndex = i;
            break;
        }
    }
}
//1000831	Jeff	1000419	密件做電子轉出提示
function SecElcAlert()
{
    var SecNo = document.all.H_SecNo.value;
    var IsOk = true;
    //密等如果不為普通
    if (SecNo != "1")
    {
        if (confirm("該份公文密等為密(含以上)，不應採電子交換發文，是否仍需轉出電子檔?"))
            IsOk = true;
        else
            IsOk = false;
    }

    return IsOk;
}

//1020730 Kevin 1020486 傳送前重新判斷是否僅Email寄送
function CheckEmailOnly()
{
    var EmailCount = 0;
    var OtherCount = 0;

    if (document.all.dg1)
    {
        var dgObj = document.all["dg1"];

        for (var i = 2; i < dgObj.rows.length + 1; i++)
        {
            var strIssueTypeID = "dg1__ctl" + i + "_IssueType";

            if (document.all[strIssueTypeID].value == "4")
			{
                EmailCount++;
				//1070920 David 1070621 紀錄是否有電郵受文者
				bHasEmailIssue = true;
			}
            else if (document.all[strIssueTypeID].value == "1")
                OtherCount++;
			else if(document.all[strIssueTypeID].value == "9")//1110304 David 1101451 新增判斷個人專區發文方式
				$("#HasPAIssue").val("Y");
			else if(document.all[strIssueTypeID].value == "7")//1141110 David 1141112 支援海外發文
				$("#HasOSIssue").val("Y");
        }

        if (EmailCount != 0 && OtherCount == 0)
            document.all.OnlyEmailIssue.value = "Y";
        else
            document.all.OnlyEmailIssue.value = "N";
    }
}

//1040129 David 1040033 呼叫人團系統介接WS
function CallMoiGroupWS()
{
    //1040303 David 1040033 呼叫人團系統WS改透過介接站台處理
    //if(!document.all.NeedCallMoiGroupWS || document.all.MoiGroupWsUrl.value == "")
    if (!document.all.NeedCallMoiGroupWS || document.all.MoiGroupWsUrl.value == "" || document.all.DocLinkMoiWs.value == "")
        return;

    //轉PDF處理
    var strDocNo = document.all.txDocNo.value;
    var strServiceURL = document.all.MoiGroupServiceURL.value;
    var strServerPath = document.all.MoiGroupServerPath.value;
	//1070824	Joe		1070678		修正弱掃Hardcoded Absolute Path
    // var local = "C:\\temp";
    var strArtifact = document.all.H_Artifact.value;
    var strDraftXml = document.all.MoiGroupDraftXml.value;

    //下載檔案
    var soap = new ActiveXObject("WSWrapper.WebFileIO");
    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
    try
    {
        soap.Init(strServiceURL);
        soap.AddFile(strServerPath, strDraftXml);
        soap.Download(strArtifact, false, local);
        //alert("local:"+local);
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
    }
    catch (e)
    {
        var strErrMsg = e.message;
        if (soap.hasError)
            strErrMsg += soap.ErrorMessage;
        alert("連接伺服器" + strServiceURL + "下載檔案發生錯誤，錯誤訊息為:" + strErrMsg);
    }
    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END

    //稿件轉PDF相關設定處理
    var strPDFMode = document.all.H_PDFMode.value;
    var bAttPDF = (strPDFMode.substr(0, 1) == "Y") ? true : false;//是否含附件
    var bKeepSecret = (strPDFMode.substr(2, 1) == "Y") ? true : false;//行文保密
    var bSealMark = (strPDFMode.substr(3, 1) == "Y") ? true : false;//騎縫章
    var bStamp = (strPDFMode.substr(4, 1) == "Y") ? true : false;//正副抄本章
    var bBarcode = (strPDFMode.substr(5, 1) == "Y") ? true : false;//本文條碼
    var bAttBarcode = (strPDFMode.substr(6, 1) == "Y") ? true : false;//附件條碼
    var bPageNo = (strPDFMode.substr(7, 1) == "Y") ? true : false;//頁碼

    var strDiName = local + "\\" + strDraftXml;
    var strOutputPdfName = local + "\\" + strDocNo + ".PDF";

    //ConvertDIFile(稿件檔完整路徑,輸出之PDF檔完整路徑,受文者名稱,附件PDF檔完整路徑,行文單位保密,正副抄本章,騎縫章,頁碼,條碼,公文文號)
    var strDraftErrMsg = document.all["PDF"].ConvertDIFile(strDiName, strOutputPdfName, "", "", bKeepSecret, bStamp, bSealMark, bPageNo, bAttBarcode, strDocNo);
    if (strDraftErrMsg != "")
    {
        //alert("公文文號[" + RtnEmail.m_DocNo + "]，文別[" + strDocName + "]轉出公文PDF檔有誤，錯誤訊息如下：\n" + strDraftErrMsg);
        return;
    }

    //上傳PDF檔
    var soapUp = new ActiveXObject("WSWrapper.WebFileIO");
    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
    try
    {
        soapUp.Init(strServiceURL);
        soapUp.AddFile(strServerPath, strDocNo + ".PDF", local);
        soapUp.Upload(strArtifact, true);
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
    }
    catch (e)
    {
        var strErrMsg = e.message;
        if (soapUp.hasError)
            strErrMsg += soapUp.ErrorMessage;
        alert("連接伺服器" + strServiceURL + "上傳檔案至AP伺服器失敗，錯誤訊息為:" + strErrMsg);
    }
    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END

    //上傳完成後刪除CLIENT檔案
    try
    {
        var FileObject = new ActiveXObject("Scripting.FileSystemObject");
        FileObject.DeleteFile(strOutputPdfName);
        FileObject.DeleteFile(strDiName);
    }
    catch (ex)
    { }

    //透過AJAX取得PDF轉Base64格式字串
	//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
    //var Base64Obj = ODT351.TranBase64(strServerPath + strDocNo + ".PDF").value;
	var Base64Obj = OD.ODT351.TranBase64(strServerPath + strDocNo + ".PDF").value;
    if (Base64Obj.bSuccess)
    {
        //1040303 David 1040033 取得發文日期
        var strMoiIssueDate = document.all.txIssueDate.value;
        if (strMoiIssueDate.length == 7)
            strMoiIssueDate = strMoiIssueDate.substr(0, 3) + "-" + strMoiIssueDate.substr(3, 2) + "-" + strMoiIssueDate.substr(5, 2);

        //1040303 David 1040033 呼叫人團系統WS改透過介接站台處理，調整參數
        /*var arWSParam = new Array(3);
		arWSParam[0] = document.all.H_OrgNo.value;
		arWSParam[1] = document.all.MoiGroupCaseNo.value;
		arWSParam[2] = strDocNo;
		arWSParam[3] = Base64Obj.strBase64;*/
		//1080318	Joe		1080098		弱掃修正禁用WSDL--E
		/*
        var arWSParam = new Array();
        arWSParam[0] = document.all.MoiGroupWsUrl.value;
        arWSParam[1] = document.all.H_OrgNo.value;
        arWSParam[2] = document.all.MoiGroupCaseNo.value;
        arWSParam[3] = strDocNo;
        arWSParam[4] = document.all.txSubject.value;
        arWSParam[5] = document.all.MoiContext.value;
        arWSParam[6] = strMoiIssueDate;
        arWSParam[7] = Base64Obj.strBase64;
		*/
		params.add('argWsUrl', document.all.MoiGroupWsUrl.value);
		params.add('argSourceOrgNo', document.all.H_OrgNo.value);
		params.add('argMoiGroupCaseNo', document.all.MoiGroupCaseNo.value);
		params.add('argDocNo', strDocNo);
		params.add('argSubject', document.all.txSubject.value);
		params.add('argSections', document.all.MoiContext.value);
		params.add('argIssueDate', strMoiIssueDate);
		params.add('argPDFBase64', Base64Obj.strBase64);

        try
        {
            //1040303 David 1040033 呼叫人團系統WS改透過介接站台處理
            //jf_CallW(document.all.MoiGroupWsUrl.value, "ApproveDoc", true, arWSParam);
            // jf_CallW(document.all.DocLinkMoiWs.value, "ApproveDoc", true, arWSParam);
			var callObj = SOAPClient.invokeJSON(document.all.DocLinkMoiWs.value, "ApproveDoc", params ,false, null)
			//1080318	Joe		1080098		弱掃修正禁用WSDL--E
        }
        catch (ex)
        { }
    }
}

//1051021 David 1050087 新增封裝處理
function setSignWork()
{
	//設定加簽處理中
	bSignCert = true;
	
	//SignWork.xml檔案處理及簽體處理
	var strAuthWS = document.all.II_AUTH_WS.value;
	var strSubmitSign = document.all.II_SUBMIT_SIGN.value;
	var strArtifact = document.all.H_Artifact.value;
	var strOrgNo = document.all.H_NowOrgNo.value;
	var strDocNo = document.all.txDocNo.value;
	var strMsgId = document.all.txMsgId.value;
	//1080214 David 1080179 調整pincode紀錄方式
	//var strPinCode = document.all.txPinCode.value;
	var strAccount = document.all.txAccount.value;
	var strEmpName = document.all.txEmpName.value;
	var strOuName = document.all.txOuName.value;
	var strRoleName = document.all.txRoleName.value;
	var strTxName = document.all.TxTrans.value;
	if(document.all.rbReturn.checked) 
		strTxName = document.all.h_TxInfo.value.split(';')[0];

	var sHashHeaderb64 = "MCEwCQYFKw4DAhoFAAQU"; // 2017.1.18 - Eric Peng, 若回傳待簽資料hash, 則header為此值!
	/* 2020.2.20 - 1090154 Eric, bug-fix
	   1. 新增SHA256 Hash header
	   2. 因aspx.cs代碼已改為一律使用hash, 故此處移除待簽內容為<SignedInfo>XML相關作業
	*/
	var sHashHeaderb64_SHA256 = 'MDEwDQYJYIZIAWUDBAIBBQAEI'; // 2017.3.16 - 若回傳待簽資料hash(SHA256), 則header為此值!
	
	//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
	//var DocSignObj = ODT351.SetSignWork(strArtifact, strOrgNo, strDocNo, strMsgId, strAccount, strEmpName, strOuName, strRoleName, strTxName).value;
	var DocSignObj = OD.ODT351.SetSignWork(strArtifact, strOrgNo, strDocNo, strMsgId, strAccount, strEmpName, strOuName, strRoleName, strTxName).value;
	if(!DocSignObj.bSuccess)
	{
		alert("線上簽核公文封裝作業，失敗原因：\n"+DocSignObj.ErrMsg);
		bSignCert = false;
		return false;
	}
	else
	{
		if(strSubmitSign == "Y")
		{
			var strCertb64 = "";
			var strSignature = "";

			// 2017.1.18 - Eric Peng, WebFileIO.updateEnvelope改為回傳待簽內容的hash值
			var fHashSign = false;
			var _encodeMethod = "base64";
			var _hashAlg = "SHA1";
			if (DocSignObj.SignStr.indexOf(sHashHeaderb64)===0 || DocSignObj.SignStr.indexOf(sHashHeaderb64_SHA256)===0) { /* 2020.2.20 - 1090154 Eric, 104法規SHA256 */
				fHashSign = true;
			}
			else { // 2020.2.21 - 1090154 Eric, ODT351不支援非hash值之待簽內容!
				alert("回傳之待簽內容不正確[非Hash值]! ToBeSign=" + DocSignObj.SignStr);
				bSignCert = false;
				return false;
			}

			if (fHashSign) {
				_encodeMethod = "hashBase64";
				_hashAlg = "";
			}

			//加簽處理
			var sc = new SmartCard();
			sc.getSCardModuleInfo() // 2017.1.18 - 檢核[跨平台簽章元件]版本資訊, 須為V1.3.4.1027版以後才支援使用hash值簽章
			.then(function(rslt){
				//1120104 David RD-HiCosSCard內已於單號1090689新增檢核跨平台元件版本，此處不需重複檢核
				/*var validSCVersion = false;
				var verSegment;
				var verRequired = ['1', '3', '4', '1027'];
				if (typeof rslt.SCModuleInfo=='object' && typeof rslt.SCModuleInfo.serverVersion=='string' && rslt.SCModuleInfo.serverVersion.length) {
					verSegment = rslt.SCModuleInfo.serverVersion.split('.');
					if (verSegment.length>=4 && verSegment[0]>=verRequired[0] &&
						verSegment[1]>=verRequired[1] && verSegment[2]>=verRequired[2] && verSegment[3]>=verRequired[3]) {
						validSCVersion = true;
					}
				}
				
				if (validSCVersion===false) {
					var _dfd = $.Deferred();
					if (verSegment.length) {
						_dfd.reject({success:false, _errMsg:'目前跨平台簽章元件為:V' + rslt.SCModuleInfo.serverVersion + '版, 請更新到V1.3.4.102700版以上再重試作業!'});
						bSignCert = false;
					}
					else {
						_dfd.reject({success:false, _errMsg:'無法取得[跨平台簽章元件]版本資訊.'});
						bSignCert = false;
					}
					return _dfd.promise();
				}
				else {
					//1080214 David 1080179 調整pincode紀錄方式
					//return sc.makeSignature(DocSignObj.SignStr, _encodeMethod, document.all.txPinCode.value , _hashAlg)
					return sc.makeSignature(DocSignObj.SignStr, _encodeMethod, strIgotu , _hashAlg)
				}*/
				return sc.makeSignature(DocSignObj.SignStr, _encodeMethod, strIgotu , _hashAlg)
			})
			.then(function(rslt) {
				//憑證
				strCertb64 = rslt.certb64;
				//簽體
				strSignature = rslt.signature;
				//成功
				return sc.checkCertLink(strArtifact ,strCertb64, "2", strAuthWS)
			})
			.then(function(){
				return sc.checkCertValidity(strCertb64, "2", strOrgNo, strAuthWS)
			})
			.then(function(){

				//呼叫WebFileIO.signEnvelope進行加簽
				//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
				//var signObj = ODT351.signEnvelope(strArtifact, strOrgNo, strDocNo, strMsgId, DocSignObj.FileWebService, strSignature, strCertb64).value;
				//1140512 David 1140331 傳入呼叫UpdateEnvelope的URL及識別碼
				//var signObj = OD.ODT351.signEnvelope(strArtifact, strOrgNo, strDocNo, strMsgId, DocSignObj.FileWebService, strSignature, strCertb64).value;
				var signObj = OD.ODT351.signEnvelope(strArtifact, strOrgNo, strDocNo, strMsgId, DocSignObj.FileWebService, strSignature, strCertb64, DocSignObj.ImgConvertUrl, DocSignObj.GuId).value;
				if(!signObj.bSuccess)
				{
					alert("線上簽核公文封裝作業，失敗原因：\n"+signObj.ErrMsg);
					bSignCert = false;
				}
				else
				{
					//完成後設定回來
					bSignCert = false;

					//1061023 David 1060906 調整加簽完成後觸發btUpdate行為
					//__doPostBack("btUpdate","");
					Page_BlockSubmit = false;
					IsServerHandling = true;
					jf_ShowWaitState();
					document.all.ToolBarSenderID.value = "btUpdate";
					__doPostBack("tbTool","");
				}
			})
			.fail(function(e)
			{
				//1080214 David 1080179 加簽失敗清除紀錄的PINCODE
				fnSetUserIguto("");

				//加簽失敗
				var errObj = e;
				var errMsg = '', showErr=true;
				if (errObj)
				{
					if (typeof errObj.errMsg=='string' && errObj.errMsg.length) {
						errMsg = errObj.errMsg;
						bSignCert = false;
					}
					else if (typeof errObj._errMsg=='string' && errObj._errMsg.length) {
						errMsg = errObj._errMsg;
						bSignCert = false;
					}
					if (typeof errObj._showError=='boolean' && errObj._showError===false) {
						showErr = false;
						bSignCert = false;
					}
					if (errMsg.length && showErr) {
						alert('線上簽核公文封裝作業，錯誤說明:' + errMsg);
						bSignCert = false;
					}
				}
			});
		}
		else
		{
			//完成後設定回來
			bSignCert = false;

			//1061023 David 1060906 調整加簽完成後觸發btUpdate行為
			//__doPostBack("btUpdate","");
			Page_BlockSubmit = false;
			IsServerHandling = true;
			jf_ShowWaitState();
			document.all.ToolBarSenderID.value = "btUpdate";
			__doPostBack("tbTool","");
		}
	}
}

//1060601 David 1050087 判斷瀏覽器
function getIEVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    else if (navigator.appName == 'Netscape') {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");  //for IE 11
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

//1080125 David 1080049 弱掃修正
function HtmlDecode(s)
{
    var div = document.createElement('div');
    div.innerHTML = s;
    return div.textContent;
}

//1080214 David 1080179 調整pincode紀錄方式
function fnSetUserIguto(argIgotu)
{
	strIgotu = argIgotu;

	if(opener != null && opener.theSSO != null)
		opener.theSSO.User.igotu = strIgotu;
	else if(opener.opener != null && opener.opener.theSSO != null)
		opener.opener.theSSO.User.igotu = strIgotu;
}

//1110704	Joe		1101044		增加於附件隨文點選時判斷，若稿件附件全部取消，則詢問使用者是否取消稿件受文者夾帶附件--S
//傳入參數為稿號、選項ID(供使用者取消異動時把選項加回來)
function fncbAttachCheck(argDraftNo, argCbId){
	var bAllCancel = true;
	for (var iRow=2;iRow<document.all["dg2"].rows.length+1;iRow++){
		if(document.all["dg2__ctl"+iRow+"_txDraftNo"].value == argDraftNo && document.all["dg2__ctl"+iRow+"_cbAttachWithDoc"].checked == true){
			bAllCancel = false;
			break;
		}
	}
	
	//同稿件全部取消時詢問使用者是否取消受文者夾帶附件
	if(bAllCancel){
		if(window.confirm("因稿號" + argDraftNo + "所有附件皆不隨文夾帶，將取消該稿件所有受文者含附件選項，是否進行本次異動？")){
			for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++){
				if(document.all["dg1__ctl"+iRow+"_txDraftNo"].value == argDraftNo){
					document.all["dg1__ctl"+iRow+"_cbIncludeAttach"].checked = false;
				}
			}
		}
		else{
			document.all[argCbId].checked = true;
		}
	}
}
//1110704	Joe		1101044		增加於附件隨文點選時判斷，若稿件附件全部取消，則詢問使用者是否取消稿件受文者夾帶附件--E