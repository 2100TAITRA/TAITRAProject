/*
DATE	SA		PRG		MGR_NO			DESC
0960113	Stella	David	000146			台科大電子交換
0990831	------	David	0990552			電子交換第一二類改為電子交換
1000104	Yvonne	David	0990556			(陸委會)新增立委質詢案件轉出路徑設定
1000923	Yvonne	Jeff	1000775			只要發文人員更動電子檔轉出路徑則會記錄至II_ACCESS_LOG
1000923	Yvonne	Jeff	1000819			改變是否開放立委質詢按鈕判斷邏輯
1010611	Yvonne	Ken		1010502			儲存時，更改XML存放位置
1010611	Yvonne	Ken		1010414			儲存時，修改前後異動的值記錄至II_ACCESS_LOG
1021004 --		Erin	1020632			台科大merge至共通版
1051031 --      Zen     1050087         修正修改二代行動平台之衍生問題
1060518 Leslie  Zen     1060215         innerText相關修改
1070817 Kevin   Zen     1070678         弱掃XSS修正
1071017 Kevin   Zen     1070678         弱掃Client Potential XSS修正
1100201	Leslie	Joe		1090927			取消使用document.activeElement
*/
var IsServerHandling = new Boolean();
//1010502	Ken	 101/06/11 更改XML存放位置
//var gIssueXml = 'C:/Issue.XML';
var gIssueXml = 'C:/2100/Issue.XML';
var gDoc = null;
var gIsSaved = false;
IsServerHandling = false;
var gIsBFOpen = false;

//1000923	Jeff	1000775		記錄修改前的路徑
var beforeDIPath = "";
var beforeAttPath = "";
var berforeLgPath = "";
window.onbeforeunload = fnWindowOnBeforeUnLoad;
document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1060518 Zen 1060215 innerText相關修正
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btDocPath1":
            //case "btDocPath2":
            //case "btDocPath3":
        case "btAttPath1":
            //case "btAttPath2":
            //case "btAttPath3":
            //case "btDocEncPath1":
            //case "btDocEncPath2":
            //case "btDocEncPath3":
            //case "btAttEncPath1":
            //case "btAttEncPath2":
            //case "btAttEncPath3":
            //96.01.09 000146 David
        case "btDocPath1_1":
            //case "btDocPath2_2":
            //case "btDocPath3_3":
        case "btAttPath1_1":
            //case "btAttPath2_2":
            //case "btAttPath3_3":
            //case "btDocEncPath1_1":
            //case "btDocEncPath2_2":
            //case "btDocEncPath3_3":
            //case "btAttEncPath1_1":
            //case "btAttEncPath2_2":
            //case "btAttEncPath3_3":*/
            Page_BlockSubmit = true;
            btPathClick(xObjectName);
            break;
            //1000104 David 0990556 調整路徑設定選項
        case "tb1":
        case "Legislator":
            Page_BlockSubmit = true;
            ImageOnClick();
            break;
            //1000104 David 0990556 新增立委質詢路徑設定按鈕
        case "btLGPath":
            Page_BlockSubmit = true;
            btLGPathClick();
    }
}

function jf_ToolBarHandle()
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

    xObjectName = window.event.srcNode.getAttribute("ID");

    switch (xObjectName)
    {
        case "btSave":
            //1000923	Jeff	1000775		異動電子檔轉出路徑時寫入紀錄至II_ACCESS_LOG	
            fnPathSaveForDI();
            fnPathSaveForLg();
            //1000406 David 0990556 新增立委質詢案件儲存處理
            if (fnSaveLGPath())
                fnSaveXML();
            Page_BlockSubmit = true;
            jf_ToolBarSubmit();
            break;
        case "btCancel":
            jf_ConfirmCancel();
            Page_BlockSubmit = true;
            //jf_ToolBarSubmit();
            break;
        case "btClean":
            //1000923	Jeff	1000775	避免清除時把隱藏欄位也清空
            var H_OrgNo = document.all['H_OrgNo'].value;
            var H_Artifact = document.all["H_Artifact"].value;
            var H_txUserName = document.all['H_txUserName'].value;
            var H_txIp = document.all['H_txIp'].value;
            jf_ConfirmClean();
            document.all['H_OrgNo'].value = H_OrgNo;
            document.all['H_txUserName'].value = H_txUserName;
            document.all['H_txIp'].value = H_txIp;
            document.all['H_Artifact'].value = H_Artifact;
            Page_BlockSubmit = true;
            //jf_ToolBarSubmit();
            break;
    }
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    ShowMsg();
    fnLoadXML();
    //1000104 David 0990556 新增立委質詢案件設定處理
    fnGetLGPath();
    //96.01.09 000146 David
    //0990831 David 台科大版本，共通版無用
    //1021004 Erin [1020632] 台科大merge至共通版 取消mark --start
    if (document.all["txCheckFile"].value == "Y")
        fnLoadXML2();
    else
    {
        document.all["Fieldset1"].className = "Hide";
        //document.all["Fieldset5"].className = "Hide";
        //document.all["Fieldset6"].className = "Hide";
        //document.all["Fieldset7"].className = "Hide";
        //document.all["Fieldset8"].className = "Hide";
        //document.all["Fieldset9"].className = "Hide";
        //document.all["Fieldset10"].className = "Hide";
    }
    //1021004 Erin [1020632] 台科大merge至共通版 取消mark --end
    //10000923	Jeff	1000775	 紀錄修改前路徑
    beforeDIPath = jf_Trim(document.all['txDoc1'].value);
    beforeAttPath = jf_Trim(document.all['txAtt1'].value);
    //如果有使用立委質詢才做紀錄動作
    if (document.all.H_txLgUse.value == "Y")
        berforeLgPath = jf_Trim(document.all['txLGPath'].value);
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}

function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function fnLoadXML()
{
    var xDoc = new ActiveXObject("MSXML2.DOMDocument");
    gDoc = xDoc.load(gIssueXml);
    var ndlIssueType = xDoc.selectNodes("//電子交換");
    if (ndlIssueType == null || ndlIssueType.length == 0) return;
    //0990831 David 0990552 電子交換一二類改為電子交換
    /*for (var nSidx = 1; nSidx < 4 ; nSidx++)
	{
		var ndlSend = xDoc.selectNodes("//電子交換[@類別='"+nSidx+"']");
		for (var i = 0 ; i < ndlSend.length ; i++)
		{
			if (ndlSend[i].attributes[1]!=null)
			{
				if (ndlSend[i].attributes[1].value == '否')
				{
					document.all['txDoc'+nSidx].value = ndlSend[i].selectSingleNode("DI").text;
					document.all['txAtt'+nSidx].value = ndlSend[i].selectSingleNode("ATTACH").text;
				}
				else if(ndlSend[i].attributes[1].value == '是')
				{
					document.all['txDocEnc'+nSidx].value = ndlSend[i].selectSingleNode("DI").text;
					document.all['txAttEnc'+nSidx].value = ndlSend[i].selectSingleNode("ATTACH").text;
				}
			} 
		}	
	}*/
    if (ndlIssueType[0] != null)
    {
        document.all['txDoc1'].value = ndlIssueType[0].selectSingleNode("DI").text;
        document.all['txAtt1'].value = ndlIssueType[0].selectSingleNode("ATTACH").text;
    }
    //0990831 David 0990552 電子交換一二類改為電子交換--END
}

//96.01.09 000146 David
//0990831 David 台科大專用，共通版無用
//1021004 Erin [1020632] 台科大merge至共通版 取消mark  電子交換實際發文目錄一二三類改為電子交換
function fnLoadXML2()
{
    var xDoc = new ActiveXObject("MSXML2.DOMDocument");
    gDoc = xDoc.load(gIssueXml);
    var ndlIssueType = xDoc.selectNodes("//電子交換實際發文目錄");
    if (ndlIssueType == null || ndlIssueType.length == 0) return;
    //for (var nSidx = 1; nSidx < 4 ; nSidx++) //電子交換實際發文目錄一二三類改為電子交換
    //{
    //	var ndlSend = xDoc.selectNodes("//電子交換實際發文目錄[@類別='"+nSidx+"']");
    //	for (var i = 0 ; i < ndlSend.length ; i++)
    //	{
    //		if (ndlSend[i].attributes[1]!=null)
    //		{
    //			if (ndlSend[i].attributes[1].value == '否')
    //			{
    //				document.all['txDoc'+nSidx+"_"+nSidx].value = ndlSend[i].selectSingleNode("DI").text;
    //				document.all['txAtt'+nSidx+"_"+nSidx].value = ndlSend[i].selectSingleNode("ATTACH").text;
    //			}
    //			else if(ndlSend[i].attributes[1].value == '是')
    //			{
    //				document.all['txDocEnc'+nSidx+"_"+nSidx].value = ndlSend[i].selectSingleNode("DI").text;
    //				document.all['txAttEnc'+nSidx+"_"+nSidx].value = ndlSend[i].selectSingleNode("ATTACH").text;
    //			}
    //		} 
    //	}
    //}
    if (ndlIssueType[0] != null)
    {
        document.all['txDoc1_1'].value = ndlIssueType[0].selectSingleNode("DI").text;
        document.all['txAtt1_1'].value = ndlIssueType[0].selectSingleNode("ATTACH").text;
    }
}

//按下選取button將目錄資訊帶回textbox
function btPathClick()
{
    if (gIsBFOpen) return;
    gIsBFOpen = true;
	//1100201	Joe		1090927		取消使用document.activeElement
    // var xSrc = document.activeElement;
    var xSrc = event.target;
    if (!xSrc || !xSrc.id || xSrc.id.indexOf('Path') < 0) return;
    //0990831 David 0990552 目前只有一組可設定，此處暫無用
    /*var pEnc = xSrc.id.indexOf('Enc') > -1 ? '加密' : '不加密';
	var pType = xSrc.id.indexOf('1') > -1 ? '【第一類】' : (xSrc.id.indexOf('2') > -1 ? '【第二類】' : (xSrc.id.indexOf('3') > -1 ? '【第三類】' : ''));
	var pTitle = "請選擇"+pType+pEnc+"本文所存放的目錄";*/
    var pTitle = "請選擇本文所存放的目錄";
    var xTx = document.all[xSrc.id.replace('Path', '').replace('bt', 'tx')];
    if (!xTx) return;
    if (xSrc.id && xSrc.id.indexOf('Att') > -1)
        pTitle = "請選擇交換表單、附件檔所存放的目錄";
    document.all["BF"].Title = pTitle;
    if (document.all["BF"].ShowDialog(0) != 0)  //有指定值
    {
        if (document.all["BF"].Path.charAt(document.all["BF"].Path.length - 1) != "\\")
            xTx.value = document.all["BF"].Path + "\\";
        else
            xTx.value = document.all["BF"].Path;
    }
    gIsBFOpen = false;
}

function fnSaveXML()
{
    var xDoc = new ActiveXObject("MSXML2.DOMDocument");
    var pXML = "<?xml version=\"1.0\" encoding=\"Big5\"?>\n\r";
    pXML += "<發文設定>\n\r";
    //0990831 David 0990552 電子交換一二類改為電子交換--START
    /*for (var i = 1 ;i < 4 ; i++)
	{
		pXML += '<電子交換 類別="'+i+'" 加密="否">\n\r';
		pXML += '<DI>'+document.all['txDoc'+i].value+'</DI>\n\r';
		pXML += '<ATTACH>'+document.all['txAtt'+i].value+'</ATTACH>\n\r';
		pXML += '</電子交換>\n\r';
		pXML += '<電子交換 類別="'+i+'" 加密="是">\n\r';
		pXML += '<DI>'+document.all['txDocEnc'+i].value+'</DI>\n\r';
		pXML += '<ATTACH>'+document.all['txAttEnc'+i].value+'</ATTACH>\n\r';
		pXML += '</電子交換>\n\r';
	}*/
    pXML += '<電子交換>\n\r';
    //1071017 Zen 1070678 弱掃Client Potential XSS修正--begin    //pXML += '<DI>' + document.all['txDoc1'].value + '</DI>\n\r';
    //pXML += '<ATTACH>'+document.all['txAtt1'].value+'</ATTACH>\n\r';
    pXML += '<DI>' + HtmlEncode(document.all['txDoc1'].value) + '</DI>\n\r';
    pXML += '<ATTACH>' + HtmlEncode(document.all['txAtt1'].value) + '</ATTACH>\n\r';
    //1071017 Zen 1070678 弱掃Client Potential XSS修正--end    pXML += '</電子交換>\n\r';
    //0990831 David 0990552 電子交換一二類改為電子交換--END
    //96.01.09 000146 David
    //0990831 David 台科大專用，共通版無用
    //1021004 Erin [1020632] 台科大merge至共通版 
    //if(document.all["txCheckFile"].value == "Y")
    //	pXML += fnSaveXML2();
    if (document.all["txCheckFile"].value == "Y")
        pXML += fnSaveXML2();

    pXML += "</發文設定>";
    xDoc.loadXML(pXML);
    xDoc.save(gIssueXml);
    window.status = '儲存完畢';
    gIsSaved = true;
}

//1000923	Jeff	1000775		異動電子檔轉出路徑時寫入紀錄至II_ACCESS_LOG	---strat----
function fnPathSaveForDI()
{
    var DocPath = jf_Trim(document.all['txDoc1'].value);
    var AttPath = jf_Trim(document.all['txAtt1'].value);

    if (beforeDIPath == DocPath && beforeAttPath == AttPath)
        return;
    var UserInfo = new Array();
    UserInfo[0] = document.all['H_OrgNo'].value;
    UserInfo[1] = document.all['H_txUserName'].value;
    UserInfo[2] = document.all['H_txIp'].value;
    //1010414	Ken		101/06/11  儲存時，修改前後的資料都記錄至II_ACCESS_LOG
    //var rtnObj = ODT351C1.fnSavePathForLog(document.all["H_Artifact"].value,"ODT351_1",DocPath,AttPath,"",UserInfo).value;
    var rtnObj = ODT351C1.fnSavePathForLog(document.all["H_Artifact"].value, "ODT351_1", DocPath, AttPath, "", UserInfo, beforeDIPath, beforeAttPath, "").value;
    if (rtnObj != "")
    {
        alert(rtnObj);
    }
    beforeDIPath = jf_Trim(document.all['txDoc1'].value);
    beforeAttPath = jf_Trim(document.all['txAtt1'].value);
}
function fnPathSaveForLg()
{
    if (document.all.H_txLgUse.value == "N")
        return;
    var LgPath = jf_Trim(document.all['txLGPath'].value);
    if (LgPath == berforeLgPath)
        return;
    var UserInfo = new Array();

    UserInfo[0] = document.all['H_OrgNo'].value;
    UserInfo[1] = document.all['H_txUserName'].value;
    UserInfo[2] = document.all['H_txIp'].value;

    //1010414	Ken		101/06/11  儲存時，修改前後的資料都記錄至II_ACCESS_LOG
    //var rtnObj = ODT351C1.fnSavePathForLog(document.all["H_Artifact"].value,"ODT351_2","","",LgPath,UserInfo).value;
    var rtnObj = ODT351C1.fnSavePathForLog(document.all["H_Artifact"].value, "ODT351_2", "", "", LgPath, UserInfo, "", "", berforeLgPath).value;
    if (rtnObj != "")
    {
        alert(rtnObj);
    }
    berforeLgPath = jf_Trim(document.all['txLGPath'].value);
}
//---------end-----------
//96.01.09 000146 David
//0990831 David 台科大專用，共通版無用 
//1021004 Erin [1020632] 台科大merge至共通版 取消mark 取消1.2.3類、加密
function fnSaveXML2()
{
    var pXML = "";
    //for (var i = 1 ;i < 4 ; i++)
    //{
    //	pXML += '<電子交換實際發文目錄 類別="'+i+'" 加密="否">\n\r';
    //	pXML += '<DI>'+document.all['txDoc'+i+"_"+i].value+'</DI>\n\r';
    //	pXML += '<ATTACH>'+document.all['txAtt'+i+"_"+i].value+'</ATTACH>\n\r';
    //	pXML += '</電子交換實際發文目錄>\n\r';
    //	pXML += '<電子交換實際發文目錄 類別="'+i+'" 加密="是">\n\r';
    //	pXML += '<DI>'+document.all['txDocEnc'+i+"_"+i].value+'</DI>\n\r';
    //	pXML += '<ATTACH>'+document.all['txAttEnc'+i+"_"+i].value+'</ATTACH>\n\r';
    //	pXML += '</電子交換實際發文目錄>\n\r';
    pXML += '<電子交換實際發文目錄>\n\r';
    //1071017 Zen 1070678 弱掃Client Potential XSS修正--begin    //pXML += '<DI>' + document.all["txDoc1_1"].value + '</DI>\n\r';
    //pXML += '<ATTACH>'+document.all["txAtt1_1"].value+'</ATTACH>\n\r';
    pXML += '<DI>' + HtmlEncode(document.all["txDoc1_1"].value) + '</DI>\n\r';
    pXML += '<ATTACH>' + HtmlEncode(document.all["txAtt1_1"].value) + '</ATTACH>\n\r';
    //1071017 Zen 1070678 弱掃Client Potential XSS修正--end    pXML += '</電子交換實際發文目錄>\n\r';
    //}
    return pXML;
}

function fnWindowOnBeforeUnLoad()
{
    window.returnValue = gIsSaved;
    if (!gIsSaved)
    {
        if (window.confirm('資訊已經變動，您是否要存儲更動？'))
        {
            //1000923	Jeff	1000775		異動電子檔轉出路徑時寫入紀錄至II_ACCESS_LOG
            fnPathSaveForDI()
            fnPathSaveForLg();
            //1000406 David 0990556 新增立委質詢案件儲存處理
            if (fnSaveLGPath())
                fnSaveXML();
        }
    }
}

function ImageOnClick()
{
    //var xObjectName = document.activeElement.id;
    //1051031 Zen 1050087 修正修改二代行動平台之衍生問題
    // var xObjectName = e.target.id;
	//1100201	Joe		1090927		取消使用document.activeElement
    // var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;
    if (xObjectName == "tb1")
    {
        document.all.Page1.style.display = "";
        document.all.Page2.style.display = "none";
    }
    else if (xObjectName == "Legislator")
    {
        document.all.Page1.style.display = "none";
        document.all.Page2.style.display = "";
    }
}

//1000104 David 0990556 新增立委質詢路徑設定按鈕
function btLGPathClick()
{
    if (gIsBFOpen) return;
    gIsBFOpen = true;

    var pTitle = "請選擇立委質詢TXT檔所存放的目錄";
    document.all["BF"].Title = pTitle;
    if (document.all["BF"].ShowDialog(0) != 0)  //有指定值
    {
        if (document.all["BF"].Path.charAt(document.all["BF"].Path.length - 1) != "\\")
            document.all.txLGPath.value = document.all["BF"].Path + "\\";
        else
            document.all.txLGPath.value = document.all["BF"].Path;
    }
    gIsBFOpen = false;
}

//1000104 David 0990556 新增立委質詢案件設定處理
function fnGetLGPath()
{
    //10000923	Jeff	1000819			改變是否開放立委質詢按鈕判斷邏輯
    //if(document.all.H_OrgNo.value == "357000000A")
    if (document.all.H_txLgUse.value == "Y")
    {
        var rtnObj = ODT351C1.GetLGPath(document.all["H_Artifact"].value);
        if (rtnObj.value != "")
        {
            document.all["txLGPath"].value = rtnObj.value;
        }
    }
}

//1000104 David 0990556 新增立委質詢案件儲存處理
function fnSaveLGPath()
{
    //10000923	Jeff	1000819			改變是否開放立委質詢按鈕判斷邏輯
    //if(document.all.H_OrgNo.value == "357000000A")
    if (document.all.H_txLgUse.value == "Y")
    {
        var rtnObj = ODT351C1.SetLGPath(document.all["H_Artifact"].value, "OD_ODT351_LG_PATH", document.all["txLGPath"].value);
        if (rtnObj.value != "")
        {
            alert(rtnObj.value);
            return false;
        }
    }
    return true;
}

//1070817 Zen 1070678 弱掃XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}