/*
DATE	SA		PRG		MGR_NO			DESC
0980219	Yvonne	Albert	0971022			增加"識別碼"欄位，並依DL_HAS_DOCHASH判斷是否顯示此欄位
1000225 Leslie  Davis   0991043         新增異動紀錄及下載紀錄功能鍵
1000719 David   Kevin   1000582         回復儲存功能
1010619	David	David	-------			修正單號1000582衍生BUG
1030926	Cloud	Gabby	1030746			修正由程式帶出的公文附件無法直接回存的問題
1031028	Leslie	Kenny	1030836			配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324			增加WebFileIO錯誤訊息處理
1050330	Cloud   Kenny	1050168    	    補上IsServerHandling判斷避免doPostback後未回到server
1050512 Cloud   Zen     1050087         二代公文修改(方案)
1050811 Kevin   Zen     1050700         弱掃XSS修正
1051019	Leslie	Joe		1050087		    二代修改配合行動平台
1060116 Cloud   Zen     1050087         修正無法移除檔案之錯誤
1080122	Kevin	Joe		1080049			弱掃修正XSS
1080214	Kevin	Joe		1080179			弱掃修正Client Potential XSS
1080318	Kevin	Joe		1080098			弱掃修正禁用WSDL
1080605 David   Zen     1080478         修正儲存後附件大小單位為byte之問題(應為KB)
1080905	Kevin	Joe		1080657			改為透過AJAX處理重複檢核
1100201	Leslie	Joe		1090927			取消使用document.activeElement
1110103 Kevin   Zen     1101292         修正多次點擊重複PostBack之問題
1130905 Kevin   Cloud   1130747         配合TWCERT架構調整，修改檔案上傳方式-取得AP WEBFILEIO-跟暫存位置
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

//1050512 Zen 1050087 二代公文修改(方案)
//用於存放檔案物件
var AllFiles = [];
//紀錄原有檔案數
var nOriFiles;
//1050512 Zen 1050087 二代公文修改(方案)--end

//1050512 Zen 1050087 二代公文修改(方案)
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if (document.all.dg1)
//    document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

//1080905		Joe		1080657			改為透過AJAX處理重複檢核--S
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
//1080905		Joe		1080657			改為透過AJAX處理重複檢核--E

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1080122	Joe		1080049		弱掃修正XSS--S
	//1080214	Joe		1080179		弱掃修正Reflected XSS Specific Clients--S
	// var div = document.createElement('div');
	// div.innerHTML = document.all["tbSubject"].value;
	// document.all["tbSubject"].value = div.innerText;
	if(document.all.H_Subject)
		document.all.tbSubject.value = document.all.H_Subject.value;
	//1080214	Joe		1080179		弱掃修正Reflected XSS Specific Clients--E
	//1080122	Joe		1080049		弱掃修正XSS--E
    //1050512 Zen 1050087 二代公文修改(方案)--begin
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWA("../DLLIB/DLWS.asmx", "GetFileIOInfo", false, null);
    //jf_CallWA(jf_Trim(document.all.txDLWS.value), "GetFileIOInfo", false, null);
    if (document.all.dgAttach.rows.length > 1)
    {
        document.all.dgAttach.style.display = '';
        document.all.dgAttachhead.style.display = '';
    }
    else
    {
        document.all.dgAttach.style.display = 'none';
        document.all.dgAttachhead.style.display = 'none';
    }
    //1050512 Zen 1050087 二代公文修改(方案)--end
    //1000719 [1000582] kevin 新增判斷新增模式下為唯讀
    if (jf_GetActionMode() == LayoutModeNew)
    {
        document.all["tbIssueNo"].readOnly = false;
        document.all["tbIssueDate"].readOnly = false;
        document.all["tbSubject"].readOnly = false;
        document.all["ddlDept"].readOnly = false;
        //1050530 Zen 1050087 二代公文修改
        document.all.tbIssueDate.nextSibling.Enabled = true;
    }
    else //jf_GetActionMode()==LayoutModeModify
    {
        document.all["tbIssueNo"].readOnly = true;
        document.all["tbIssueDate"].readOnly = true;
        document.all["tbSubject"].readOnly = true;
        document.all["ddlDept"].readOnly = true;
        document.all["tbIssueNo"].className = "DisplayOnly";
        document.all["tbIssueDate"].className = "DisplayOnly";
        document.all["tbSubject"].className = "DisplayOnly";
        //1050530 Zen 1050087 二代公文修改
        document.all.tbIssueDate.nextSibling.Enabled = false;
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019	joe		1050087		二代修改配合行動平台
    // var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	//1100201	Joe		1090927		取消使用document.activeElement
    //var actE = document.activeElement;
    // var dglbtargetName0 = actE.id.substring(0, actE.id.indexOf("btAddOrg"));
    var dglbtargetName0 = xObjectName.substring(0, xObjectName.indexOf("btAddOrg"));

    //1050330	Kenny	[1050168]	補上IsServerHandling判斷避免doPostback後未回到server
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
    switch (xObjectName)
    {
        case "imgdate1":
            Page_BlockSubmit = true;
            if (!fnCalculateDays())
            {
                document.all["tbIssueDate"].value = "";
                document.all["tbIssueDate"].focus();
            }
            break;
        case "imgdate2":
            Page_BlockSubmit = true;
            if (!fnCalculateDays())
            {
                document.all["tbExpireDate"].value = "";
                document.all["tbExpireDate"].focus();
            }
            break;
        case "btAddFile":
            Page_BlockSubmit = true;
            fnAddFile();
            break;
    }
}
/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050512 Zen 1050087 二代公文修改(方案)
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

    //1050512 Zen 1050087 二代公文修改(方案)
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050512 Zen 1050087 二代公文修改(方案)
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //1050512 Zen 1050087 二代公文修改(方案)--begin
            //if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            //{
            //	IsServerHandling = true;
            //	jf_ShowWaitState();
            //	Page_BlockSubmit = false;
            //}
            //else
            //	Page_BlockSubmit = true;
            //jf_ToolBarSubmit();
            Page_BlockSubmit = true;
            jf_ConfirmSave();
            //1050512 Zen 1050087 二代公文修改(方案)--end
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050512 Zen 1050087 二代公文修改(方案)
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050512 Zen 1050087 二代公文修改(方案)
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            var FileSizeLimit = document.all.txFileSizeLimit.value;
            var DLWS = document.all.txDLWS.value;
            //0980302	Yvonne	0971022	修正隱藏欄位被清空，無法重新取得識別碼之問題
            var H_DocHash = document.all["H_DocHash"].value;
            var H_OdWsLocation = document.all["H_OdWsLocation"].value;
            var H_OrgNo = document.all["H_OrgNo"].value;
            //0980227 Albert 0971022 清除後設定發布單位為使用者身份所屬單位
            var ddl = document.getElementById("ddlDept");
            var ddlindex = document.all.H_DefaultDept.value;
            Page_BlockSubmit = true;
            //1130905  Cloud   1130747   配合TWCERT架構調整，修改檔案上傳方式 - 調整檔案上傳至AP方式
            var txdlWEBWS = document.all["H_DL_AP_WEBFILEWS"].value;
            var txdlApPath = document.all["txFileLocation"].value;
            if (jf_ConfirmClean(true))
            {
                document.all["H_DocHash"].value = H_DocHash;
                document.all["H_OdWsLocation"].value = H_OdWsLocation;
                document.all["H_OrgNo"].value = H_OrgNo;
                document.all.txFileSizeLimit.value = FileSizeLimit;
                document.all.txDLWS.value = DLWS;
                document.all.H_DefaultDept.value = ddlindex;
                ddl.options[ddlindex].selected = true;
                var Rows = document.getElementById("dgAttach").rows;
                for (var i = Rows.length; i > 1; i--)
                {
                    document.getElementById("dgAttach").deleteRow();
                }
                document.all["tbIssueNo"].focus();
                //1130905  Cloud   1130747   配合TWCERT架構調整，修改檔案上傳方式 - 調整檔案上傳至AP方式
                document.all["H_DL_AP_WEBFILEWS"].value = txdlWEBWS;
                document.all["txFileLocation"].value = txdlApPath;
            }
            break;
        case "btSearch":
            //1050518 Zen 1050087 二代公文修改(方案)
            Page_BlockSubmit = true;
            var strUrl = "";
            var strIssueNo = jf_Trim(document.all["tbIssueNo"].value);
            var strSubject = escape(encodeURIComponent(jf_Trim(document.all["tbSubject"].value)));
            strUrl = "DLMC100.aspx?rtnObj=lbReturnValue&argIssueNo=" + strIssueNo + "&argSubject=" + strSubject;
            jf_OpenChildWin(strUrl, "SII020", 750, 500);
            break;
            //[0991043]davis新增
        case "btRecord":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1050512 Zen 1050087 二代公文修改(方案)
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //[0991043]davis新增
        case "btDownload":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1050512 Zen 1050087 二代公文修改(方案)
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
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
            //1050518 Zen 1050087 二代公文修改(方案)
            //if (fnUploadAttach())
            if (fnCheckExistDL())
            {
                if (fnCalculateDays())
                {
                    //1050518 Zen 1050087 二代公文修改(方案)
                    //1000719 [1000582] kevin 檢查是否已存在附件下載區
                    //if (fnCheckExistDL())
					//1060116 Cloud	調整運作邏輯
                    /*if (fnUploadAttach())
                        bRtnbool = true;
                    else
                        bRtnbool = false;*/
						fnUploadAttach();
                }
                else
                    bRtnbool = false;

            }
            else
                bRtnbool = false;
        }
        else
        {
            alert("至少加入一個附件");
            bRtnbool = false;
        }
    }

    //1050518 Zen 1050087 二代公文修改(方案)
    //return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";
    //0980302	0971022	Yvonne	勞委會(未導入識別碼機制)原有限制需輸入發文號、發文日期、卸載日期
    //上線後因其操作需求拿掉這些條件(目前無法還原確認原因)，但導入識別碼機制時應要限制發文號有值較合理
    if (document.all["H_DocHash"].value == "Y")
    {
        if (document.all["tbIssueNo"].value == "")
        {
            strErrMsg += "發文號不可空白\n";
            document.all["tbIssueNo"].focus();
        }
        if (document.all["tbIssueDate"].value == "")
        {
            strErrMsg += "發文日期不可空白\n";
            document.all["tbIssueDate"].focus();
        }
    }
    /*if (document.all["tbIssueNo"].value == "")
	{
		strErrMsg += "發文號不可空白\n";
		document.all["tbIssueNo"].focus();
	}
	if (document.all["tbIssueDate"].value == "")
	{
		strErrMsg += "發文日期不可空白\n";
		document.all["tbIssueDate"].focus();
	}*/
    if (document.all["tbSubject"].value == "")
    {
        strErrMsg += "主旨不可空白\n";
        document.all["tbSubject"].focus();
    }
    /*if (document.all["tbExpireDate"].value == "")
	{
		strErrMsg += "卸載日期不可空白\n";
		document.all["tbExpireDate"].focus();
	}*/
    if (strErrMsg != "")
    {
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
            //document.all["tbIssueNo"].value = jf_Trim(argResult.value.RtnStr);
        }
        else
        {
            //document.all["txReadOnly"].value = "";
        }
    }
    //0980220 Albert 0971022 公文文號on blur取得識別碼
    if (argResult.id == wsIdentifyCodeID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            document.all["tbIdentifyCode"].value = jf_Trim(CallWsObj.value.RtnValue);
        }
        else
        {
            document.all["tbIdentifyCode"].value = CallWsObj.value.ErrMsg;
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
    if (argCallerId == "DLMT100")
    {
        document.all["H_FileInfo_Id"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        //document.all["H_DeptNo"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        if (document.all["H_FileInfo_Id"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
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
//瀏覽並加入附件
function fnAddFile()
{
    //1050518 Zen 1050087 二代公文修改(方案)
    if (document.all.tbIdentifyCode.value == '')
        return;
    else
    {
        document.all.dgAttach.style.display = '';
        document.all.dgAttachhead.style.display = '';
        $('#window').trigger('resize');
    }

    var strFileFullPath = "";
    //1050518 Zen 1050087 二代公文修改(方案)--begin
    //document.all["BF"].Title = "請選擇待上傳檔案路徑";

    //if (document.all["BF"].ShowDialog(0) != 0)  //有指定值
    //	strFileFullPath = document.all["BF"].Path;
    //else
    //	return;
    //if (!strFileFullPath)
    //	return;
    //var fso = new ActiveXObject("Scripting.FileSystemObject");
    //var oFile;
    //try {
    //	oFile = fso.GetFile(strFileFullPath);
    //}
    //catch (e) 
    //{
    //	alert("找不到此檔案!\r\n" + strFileFullPath);
    //	return;
    //}
    //1050518 Zen 1050087 二代公文修改(方案)--end

    var strErrMsg = '以下檔案 : \n';
    var strNameMsg = '';
    var strSizeMsg = '';
    var nFileSizeLimit = (document.all.txFileSizeLimit.value == "") ? 0 : parseInt(document.all.txFileSizeLimit.value, 10);

    //1050518 Zen 1050087 二代公文修改(方案)
    for (var iFile = 0 ; iFile < $('#fileInput')[0].files.length ; iFile++)
    {
        //1050518 Zen 1050087 二代公文修改(方案)--begin
        var bFileNameCheck = true;
        var bFileSizeCheck = true;
        var currentFile = $('#fileInput')[0].files[iFile];
        //var strFileName = "";
        var strFileName = currentFile.name;
        var nFileSize = Math.ceil(currentFile.size / 1024);
        var rowCnt = document.all.dgAttach.rows.length;
        //1050518 Zen 1050087 二代公文修改(方案)--end

        //1050518 Zen 1050087 二代公文修改(方案) 檔案重複檢核--begin
        //for (var i = 1; i < document.all.dgAttach.rows.length; i++) 
        //{
        //	var strSrcFileName = document.all.dgAttach.rows[i].cells[1].childNodes[0].innerText;
        //	if (strFileName == strSrcFileName) 
        //	{
        //		document.all.btAddFile.focus();
        //		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已有相同檔名之檔案存在，無法加入。"])), "");
        //		return;
        //	}
        //}
        for (var i = 1 ; i < document.all.dgAttach.rows.length ; i++)
            if (document.all.dgAttach.rows[i].cells[1].children[0].textContent == currentFile.name)
            {
                bFileNameCheck = false;
                strNameMsg += strFileName + '\n';
                break;
            }
        //1050518 Zen 1050087 二代公文修改(方案) 檔案重複檢核--end

        //1050518 Zen 1050087 二代公文修改(方案) 檔案大小檢核--begin
        //var nFileSize = (oFile.Size == 0) ? 0 : Math.ceil(oFile.Size / 1024);
        //var nFileSizeLimit = (document.all.txFileSizeLimit.value == "") ? 0 : parseInt(document.all.txFileSizeLimit.value, 10);
        //if (nFileSizeLimit < nFileSize && !document.all.txManager.value)
        //{
        //	jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您所選取的檔案大小為[" + nFileSize + "KB]，已超過附件檔案大小上限[" + nFileSizeLimit + "KB]，\n故無法選擇此檔。"])), "");
        //	return;
        //}
        if (nFileSize > nFileSizeLimit)
        {
            bFileSizeCheck = false;
            strSizeMsg += strFileName + '(' + Math.ceil(currentFile.size / 1024) + 'KB)\n';
        }
        //1050518 Zen 1050087 二代公文修改(方案) 檔案大小檢核--end

        //1050518 Zen 1050087 二代公文修改(方案)
        if (bFileNameCheck && bFileSizeCheck && document.all.tbIdentifyCode.value != '')
        {
            //設定row的背景色
            //1050518 Zen 1050087 二代公文修改(方案)
            //var rowBgColor = (rowCnt % 2) ? "#F7F7DE" : "White";
            //create row
            var row = document.createElement("TR");
            //1050518 Zen 1050087 二代公文修改(方案)
            //row.style.backgroundColor = rowBgColor;

            //create column
            var colSeq = document.createElement("TD");
            colSeq.setAttribute("align", "middle");
            colSeq.setAttribute("nowrap", "nowrap");
            colSeq.className = "InputFieldLabel";
            //1050518 Zen 1050087 二代公文修改(方案)
            colSeq.textContent = rowCnt;

            var colFile = document.createElement("TD");
            //1050518 Zen 1050087 二代公文修改(方案)
            colFile.setAttribute("align", "Left");
            colFile.setAttribute("align", "middle");
            var spanFileName = document.createElement("SPAN");
            var spanFilePath = document.createElement("SPAN");
            var spanFileSize = document.createElement("SPAN");
            //1050518 Zen 1050087 二代公文修改(方案)--begin
            //spanFileName.innerText = strFileName;
            //spanFilePath.innerText = strFileFullPath;
            //spanFileSize.innerText = nFileSize;
            spanFileName.textContent = strFileName;
            spanFilePath.textContent = strFileFullPath;
            spanFileSize.textContent = nFileSize;
            //1050518 Zen 1050087 二代公文修改(方案)--end
            spanFileName.className = "InputFieldLabel";
            spanFilePath.style.display = "none";
            spanFileSize.style.display = "none";
            colFile.appendChild(spanFileName);
            colFile.appendChild(spanFilePath);
            colFile.appendChild(spanFileSize);
            var colDel = document.createElement("TD");
            colDel.setAttribute("align", "middle");
            colDel.setAttribute("nowrap", "nowrap");
            //1050518 Zen 1050087 二代公文修改(方案)
            //colDel.innerHTML = "<INPUT type=\"button\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" />";
            colDel.innerHTML = "<INPUT type=\"submit\" value=\"刪除\" onclick=\"fnDeleteAttachItem(this)\" />";
            //Add to dgAttach
            row.appendChild(colSeq);
            row.appendChild(colFile);
            row.appendChild(colDel);
            //1050518 Zen 1050087 二代公文修改(方案)
            //document.all.dgAttach.children.tags("TBODY")[0].appendChild(row);
            document.all.dgAttach.children[0].appendChild(row);
            AllFiles.push($('#fileInput')[0].files[iFile]);

            //將focus設到加入附件的按鈕以便使用者繼續加入
            //1050518 Zen 1050087 二代公文修改(方案)
            //document.all.btAddFile.focus();
            $('#fileInput').focus();
        }
    }
    //1050518 Zen 1050087 二代公文修改(方案) 檢核結果--begin
    if (strNameMsg != '')
        strNameMsg += '已有相同名稱之檔案存在，無法加入。\n\n';
    if (strSizeMsg != '')
        strSizeMsg += '已超過附件上限設定之' + nFileSizeLimit + 'KB，無法選擇此檔';
    if (strNameMsg != '' || strSizeMsg != '')
        alert(strErrMsg + strNameMsg + strSizeMsg);
    if (document.all.dgAttach.rows.length > 1)
        document.all.dgAttach.hidden = false;
    //1050518 Zen 1050087 二代公文修改(方案) 檢核結果--end
}

//1050518 Zen 1050087 二代公文修改(方案)
//function fnDeleteAttachItem()
function fnDeleteAttachItem(event)
{
    Page_BlockSubmit = true;
    //先刪除資料
    //1050518 Zen 1050087 二代公文修改(方案)
    //var deleteRow = event.srcElement.parentNode.parentNode;
    //1060116 Zen 1050087 修正無法移除檔案之錯誤
    //var deleteRow = event.parentNode.parentNode;
    var deleteRow = event.target.parentNode.parentNode;

    //1050518 Zen 1050087 二代公文修改(方案)--begin
    /*
	//取出FilePath，如果沒有則表示此檔案已存在於DB中，刪除時要加入待刪除清單(lbDelFile)中
	if (!deleteRow.cells[1].childNodes[1].innerText)
	{
		if (document.all.txDelFileNames.value)
			document.all.txDelFileNames.value += "," + deleteRow.cells[1].childNodes[0].innerText;
		else
			document.all.txDelFileNames.value = deleteRow.cells[1].childNodes[0].innerText;
	}
	*/
    //1050518 Zen 1050087 二代公文修改(方案)
    //若於隱藏欄位lbFileSize有值，表示其為尚未寫入資料庫之檔案
    if (deleteRow.cells[1].children[2].textContent != '')
        for (var i = 0; i < AllFiles.length; i++)
        {
            if (AllFiles[i].name == deleteRow.cells[1].children[0].textContent)
            {
                AllFiles.splice(i, 1);
                break;
            }
        }
    else if (document.all.txDelFileNames.value)
        document.all.txDelFileNames.value += "," + deleteRow.cells[1].children[0].textContent;
    else
        document.all.txDelFileNames.value = deleteRow.cells[1].children[0].textContent;
    //1050518 Zen 1050087 二代公文修改(方案)--end

    //1050518 Zen 1050087 二代公文修改(方案)
    //document.all.dgAttach.children.tags("TBODY")[0].removeChild(deleteRow);
    document.all.dgAttach.children[0].removeChild(deleteRow);

    //1050811 Zen 1050087 二代公文修改(方案)
    if (document.all.dgAttach.rows.length == 1)
    {
        document.all.dgAttach.style.display = 'none';
        document.all.dgAttachhead.style.display = 'none';
    }
    else//再重設序號及style
        for (var i = 1; i < document.all.dgAttach.rows.length; i++)
        {
            var row = document.all.dgAttach.rows[i];
            //1050518 Zen 1050087 二代公文修改(方案)
            //var rowBgColor = (i % 2) ? "#F7F7DE" : "White";
            //row.style.backgroundColor = rowBgColor;

            //1050518 Zen 1050087 二代公文修改(方案)
            //row.childNodes[0].innerText = i;
            row.children[0].textContent = i;
        }
}
function fnCalculateDays()
{
    //檢查日期格式
    var strSDate = document.all.tbIssueDate.value;
    var strEDate = document.all.tbExpireDate.value;
    if (strSDate != "" && strSDate.length < 7)
    {
        strSDate = jf_PADL(strSDate, 7, '0');
        document.all.tbIssueDate.value = strSDate;
    }
    if (strEDate != "" && strEDate.length < 7)
    {
        strEDate = jf_PADL(strEDate, 7, '0');
        document.all.tbExpireDate.value = strEDate;
    }
    if (strSDate != "" && !jf_CheckCDATE(strSDate))
    {
        document.all.tbIssueDate.focus();
        //0980227	0971022	Albert	修改訊息內容以辨識哪個欄位輸入有誤
        jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["發文日期"])), "");
        return false;
    }
    if (strEDate != "" && !jf_CheckCDATE(strEDate))
    {
        document.all.tbExpireDate.focus();
        //0980227	0971022	Albert	修改訊息內容以辨識哪個欄位輸入有誤
        jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["卸載日期"])), "");
        return false;
    }
    if (strEDate != "" && strSDate > strEDate)
    {
        alert("卸載日期不可以小於發文日期!");
        return false;
    }
    else
        return true;
}
//1000719 [1000582] kevin 檢查是否已存在附件下載區
function fnCheckExistDL()
{
    //1010619 David 修正BUG，新增模式下才判斷文號存不存在
    //if(document.all["txDelFileNames"].value == "")
    if (jf_GetActionMode() == LayoutModeNew)
    {
		//1080318	Joe		1080098		弱掃修正禁用WSDL--S
		/*
        var arWSParam = new Array(5);
        var strDlDocNo = jf_Trim(document.all["tbIssueNo"].value);
        arWSParam[0] = strDlDocNo;
        arWSParam[1] = "";
        arWSParam[2] = "";
        arWSParam[3] = "";
        arWSParam[4] = "";
        arWSParam[5] = "";
        arWSParam[6] = "N";
        arWSParam[7] = document.all.H_OrgNo.value;

        //1050811 Zen 1050700 弱掃XSS修正
        arWSParam[0] = encodeURI(arWSParam[0]);
        arWSParam[7] = encodeURI(arWSParam[7]);

        //1050811 Zen 1050700 弱掃XSS修正
        //var callObj = jf_CallWS(document.all["H_DL_OUTSIDE_AP_WS"].value, "SearchAttachInfoSession", false, arWSParam);
        var callObj = jf_CallWS(encodeURI(document.all["H_DL_OUTSIDE_AP_WS"].value), "SearchAttachInfoSession", false, arWSParam);
		*/
        //1080905	Joe		1080657		DLMT100改為透過Ajax檢核附件是否重複--S
		/*
		var params = new SOAPClientParameters();
		params.add('argSessionID',  jf_GetArtifact());
		params.add('argDocNo', encodeURI(jf_Trim(document.all["tbIssueNo"].value)));
		params.add('argIssueDateStart', "");
		params.add('argIssueDateEnd', "");
		params.add('argSubject', "");
		params.add('argUnitCode', "");
		params.add('argIdentifyCode', "");
		params.add('argFromOutSide', "N");
		params.add('argOrgNo', encodeURI(document.all.H_OrgNo.value));
		var GetDicInfoWS = encodeURI(document.all["H_DL_OUTSIDE_AP_WS"].value);
		var callObj = SOAPClient.invokeJSON(GetDicInfoWS, "SearchAttachInfoSession", params ,false, null)
		*/
        var callObj = DLM1.DLMT100.SearchAttachInfo(encodeURI(document.all["H_DL_OUTSIDE_AP_WS"].value), jf_GetArtifact(), encodeURI(jf_Trim(document.all["tbIssueNo"].value)), encodeURI(document.all.H_OrgNo.value));
        //1080905	Joe		1080657		DLMT100改為透過Ajax檢核附件是否重複--E
		//1080318	Joe		1080098		弱掃修正禁用WSDL--E
        if (callObj.error)
        {
            alert("搜尋文號是否存在於附件下載區時失敗：" + callObj.errorDetail.string);
            return false;
        }
        else
        {
            if (callObj.value.m_bSuccess == false)
            {
                alert("取得文號是否存在於附件下載區資訊時發生錯誤：" + callObj.value.m_strErrMsg);
                return false;
            }
            else
            {
                if (callObj.value.Info.length > 0)
                {
                    //有資料--提示確認
                    alert("該文號已存在於附件下載區，請由查詢子視窗開啟資料做修改。");
                    return false;
                }
                else
                    return true;
            }
        }
    }
    //1010619 David 修正BUG，通過檢核後需回傳true，不然會沒反應
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

    //取得AP FileIO資訊

	//1080318	Joe		1080098		弱掃修正禁用WSDL--S
	/*
    var arWSParam = new Array(0);
    //callObj = jf_CallWA("../DLLIB/DLWS.asmx", "GetFileIOInfo", false, arWSParam);
    callObj = jf_CallWA(jf_Trim(document.all.txDLWS.value), "GetFileIOInfo", false, arWSParam);
	*/
    //1130905  Cloud   1130747   配合TWCERT架構調整，修改檔案上傳方式 - 調整檔案上傳至AP方式
	/*var params = new SOAPClientParameters();
	var GetDicInfoWS = jf_Trim(document.all.txDLWS.value);
	var callObj = SOAPClient.invokeJSON(GetDicInfoWS, "GetFileIOInfo", params ,false, null)
	//1080318	Joe		1080098		弱掃修正禁用WSDL--E
    if (!jf_IsWebServiceSuccess(callObj))
        return false;
    var strWebService = callObj.value.Info.WebService;
    var strFileLocation = callObj.value.Info.StartPath;*/
    var strWebService = document.all["H_DL_AP_WEBFILEWS"].value;
    var strFileLocation = document.all["txFileLocation"].value;
    var strArtifact = jf_GetArtifact();
    document.all.txFileLocation.value = strFileLocation;
    //1050518 Zen 1050087 二代公文修改(方案)
    //var soap = new ActiveXObject("WSWrapper.WebFileIO");
    var strFileNames = "";
    var strFileSizes = "";
    var strBuf = "";
    try
    {
        //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
        if (document.all.II_USE_SSL != null)
        {
            if (document.all.II_USE_SSL.value == "Y")
                strWebService = strWebService.replace("http://", "https://");
        }
        //1050518 Zen 1050087 二代公文修改(方案)
        //soap.Init(strWebService);

        //1050518 Zen 1050087 二代公文修改(方案)--begin
        //for (var i = 1; i < document.all.dgAttach.rows.length; i++)
        //{
        //	var cell = document.all.dgAttach.rows[i].cells[1];
        //	if (cell.childNodes[1].innerText) {
        //		var strFN = cell.childNodes[0].innerText;
        //		var strFP = cell.childNodes[1].innerText;
        //		strFileNames += strBuf + strFN;
        //		strFileSizes += strBuf + cell.childNodes[2].innerText;
        //		strBuf = ",";
        //		strFP = strFP.substring(0, strFP.lastIndexOf("\\"));
        //		soap.AddFile(strFileLocation, strFN, strFP);
        //		soap.Upload(strArtifact, true);//1030926 Gabby[1030746] 修正由程式帶出的公文附件無法直接回存的問題(有做AddFile才須Upload)
        //	}
        //}
        for (var i = 0 ; i < AllFiles.length ; i++)
        {
            var strFN = AllFiles[i].name;
            strFileNames += strBuf + strFN;
            //1080605 Zen 1080478 修正儲存後附件大小單位為byte之問題(應為KB)
            //strFileSizes += strBuf + AllFiles[i].size;
            strFileSizes += strBuf + Math.round(AllFiles[i].size / 1024);
            strBuf = ",";
        }
        //1050518 Zen 1050087 二代公文修改(方案)--end
    }
    catch (e)
    {
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        //var ErrorMessage = "";
        var ErrorMessage = e.message;
        //1050518 Zen 1050087 二代公文修改(方案)
        //if (soap.hasError)
        //	ErrorMessage += soap.ErrorMessage;
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        //jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["上傳附件檔案至AP伺服器失敗，錯誤訊息為：" + ErrorMessage + "請稍後再試！"]) ), "" );
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["連接伺服器" + strWebService + "上傳附件檔案至AP伺服器失敗，錯誤訊息為：" + ErrorMessage + "請稍後再試！"])), "");
        return false;
    }
    document.all.txAddFileNames.value = strFileNames;
    document.all.txAddFileSizes.value = strFileSizes;

    //1050518 Zen 1050087 二代公文修改(方案)--begin
    if (AllFiles.length > 0)
    {
        var ioWS = new WebFileIO(strWebService, strArtifact);
        jf_ShowWaitState();
        ioWS.upload(strFileLocation, AllFiles, UploadCallBack);
    }
    else
    {
        Page_BlockSubmit = false;
        jf_ToolBarSubmit('btSave');
    }
    //1050518 Zen 1050087 二代公文修改(方案)--end
}
//1050518 Zen 1050087 二代公文修改(方案)--begin
function UploadCallBack(result)
{
    if (result.hasError)
    {
        alert(result.ErrorMessage)
        Page_BlockSubmit = true;
        jf_ToolBarSubmit('btSave');
    }
    else
    {
        //alert('檔案上傳成功');
        IsServerHandling = true;
        Page_BlockSubmit = false;
        jf_ToolBarSubmit('btSave');
    }
}
//1050518 Zen 1050087 二代公文修改(方案)--end

//1050518 Zen 1050087 二代公文修改(方案) 重複程式碼--begin
/*
function fnDeleteAttachItem()
{
	Page_BlockSubmit = true;
	//先刪除資料
	var deleteRow = event.srcElement.parentNode.parentNode;
	//取出FilePath，如果沒有則表示此檔案已存在於DB中，刪除時要加入待刪除清單(lbDelFile)中
	if (!deleteRow.cells[1].childNodes[1].innerText) {
		if (document.all.txDelFileNames.value)
			document.all.txDelFileNames.value += "," + deleteRow.cells[1].childNodes[0].innerText;
		else
			document.all.txDelFileNames.value = deleteRow.cells[1].childNodes[0].innerText;
	}
	document.all.dgAttach.children.tags("TBODY")[0].removeChild(deleteRow);

	//再重設序號及style
	for (var i = 1; i < document.all.dgAttach.rows.length; i++) {
		var row = document.all.dgAttach.rows[i];
		var rowBgColor = (i % 2) ? "#F7F7DE" : "White";
		row.style.backgroundColor = rowBgColor;
		row.childNodes[0].innerText = i;
	}
}
*/
//1050518 Zen 1050087 二代公文修改(方案)--end
//0980220 Albert 0971022 公文文號on blur取得識別碼
function tbIssue_No_Onblur()
{
    if (document.all["H_DocHash"].value == "Y")
    {
		//1080318	Joe		1080098		弱掃修正禁用WSDL--S
		/*
        var strOrgNo = jf_Trim(document.all["H_OrgNo"].value);
        var strIssueNo = jf_Trim(document.all["tbIssueNo"].value);
        var argWSParam = new Array(2);
        if (strIssueNo == "")
        {
            document.all["tbIdentifyCode"].value = "";
            return;
        }
        argWSParam[0] = strOrgNo;
        argWSParam[1] = strIssueNo;
        var strOdWsLocation = document.all["H_OdWsLocation"].value;
        CallWsObj = jf_CallW(strOdWsLocation, "GetDocHash", false, argWSParam);
		*/
		var params = new SOAPClientParameters();
		params.add('strOrgNo', jf_Trim(document.all["H_OrgNo"].value));
		params.add('strDocNo',jf_Trim(document.all["tbIssueNo"].value));
		var GetDicInfoWS = document.all["H_OdWsLocation"].value;
		CallWsObj = SOAPClient.invokeJSON(GetDicInfoWS, "GetDocHash", params ,false, null)
		//1080318	Joe		1080098		弱掃修正禁用WSDL--E
        wsIdentifyCodeID = CallWsObj.id;
        OnWSResult(CallWsObj);
    }
}