/*
DATE 	    SA		PRG		MGR_NO		DESC
1060/03     Cloud   Zen     1050087     二代升級
1141121     Zen     Andy    1131229     組織樹重構，改以JSON字串紀錄
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

//1060803 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060803 Zen 1050087 二代升級    //jf_CallWS("EAI304WS.asmx", "OpenImage", false, null); //使用WebService前必須先呼叫一次
    //1141118	Andy	1131229	調整組織樹寫法改以JSON組合
    var setting = {
        check: {
            enable: true,      // ← 啟用 checkbox
            chkStyle: "checkbox"
        },
        data: {
            simpleData: {
                enable: true
            },
            key: {
                title: "title"
            }
        },
        view: {
            addDiyDom: addDiyDom
        },
        callback: {
            beforeClick: function (treeId, treeNode) {
                return false;
            },
            onAsyncSuccess: function (event, treeId, treeNode, msg) {
                var zTree = $.fn.zTree.getZTreeObj(treeId);
                var nodes = treeNode ? treeNode.children : zTree.getNodes();

                for (var i = 0; i < nodes.length; i++) {
                    addDiyDom(treeId, nodes[i]);
                }
            }
        }
    };

    if (document.all['H_JsonData000'])
        document.all['H_JsonData'].value = document.all['H_JsonData000'].value;

    if (document.all.H_JsonData.value != "" && document.all['H_JsonData000']) {

        document.all.H_JsonData.value = document.all.H_JsonData.value.replace(/&quot;/g, "\"");
        var zNodes = JSON.parse('[' + document.all.H_JsonData.value + ']');

        var nJsonDataCnt = document.all['H_JsonDataCnt'].value;
        for (let i = 1; i <= nJsonDataCnt; i++) {
            let idx = jf_PADL(i + '', 3, '0');

            document.all['H_JsonData' + idx].value = document.all['H_JsonData' + idx].value.replace(/&quot;/g, "\"");
            zNodes = zNodes.concat(JSON.parse('[' + document.all['H_JsonData' + idx].value + ']'));
        }

        var zTree = $.fn.zTree.init($("#Classtree"), setting, zNodes);
        zTree.expandAll(true);
        zTree.expandAll(false);
    }
    //1060803 Zen 1050087 呼叫公文清單已準備完成，呼叫母視窗函式
    var DocList = $('#DocListPrepared');
    if (DocList && DocList.val() == '1')
    {
        var theSSO = opener.opener.theSSO;
        if (!theSSO)
            theSSO = opener.opener.opener.theSSO;

        theSSO.MP.queryDocList.CallBackByImgView();
        alert("檢索清單已準備完成，請由檢索側屜調閱公文影像。");
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060803 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060803 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

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
        /*
		case "":
			break;
		*/
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060803 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060803 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btReqDoc":		// 申請調檔
            Page_BlockSubmit = true;
            BorrowProc();
            //1060803 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            break;
        case "btImage":			// 線上瀏覽
            Page_BlockSubmit = true;
            OpenImage();
            //1060803 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btRtnSubject":
            Page_BlockSubmit = true;
            RtnSubject();
            break;
    }
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
    if (argResult.id == callID_OpenImage)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.RtnStr.indexOf(".UNV") != -1)
            //1060803 Zen 1050087 二代升級            //open(argResult.value.RtnStr);
            {
                document.all.H_UNVPath.value = argResult.value.RtnStr;
                Page_BlockSubmit = false;
            }
            else
                alert(argResult.value.RtnStr);
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

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    /*
	try
	{
	    opener.document.all.lbReturnValue.length = 3;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.document.all.lbReturnValue.options[2].value = argRead2;
	    opener.window.CallBack("SII020");
	    close();
	}
	catch (e) {}
    */
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBox(oCheckBox, oLevel, oVol, oSeq_S, oSeq_E)
{
    var oParentCheckBox = jf_GetParentCheckBox(oCheckBox);

    if (!oCheckBox.checked)
    {
        jf_UnCheckAllParent(oCheckBox);
        //1060803 Zen 1050087 二代升級        //jf_UnCheckAllChildren(oCheckBox);
        //1141121	Andy 1131229	組織樹重構，改以JSON字串紀錄-改用jQuery一次取消勾選下層所有CheckBox&改成zTree的架構
        //UnCheckAllChildren(oCheckBox);
        $(oCheckBox).find(' ~ ul:first input').prop('checked', false);
    }
    else
    {
        //1060803 Zen 1050087 二代升級        //jf_CheckAllChildren(oCheckBox);
        //1141121	Andy 1131229	組織樹重構，改以JSON字串紀錄-改用jQuery一次取消勾選下層所有CheckBox&改成zTree的架構
        //CheckAllChildren(oCheckBox);
        $(oCheckBox).find(' ~ ul:first input').prop('checked', true);
    }
}

function ChangeImages(node, imgpath, imgMain, imgPlusMinusPrefix, imgPlusMinus)
{
    bSetMainImage = (imgMain != ""); //don't set main image in text modes
    if (node.children.length > 0)
    {
        if (node.children.item(0).tagName == "IMG")
        {
            if (imgPlusMinus != "No") //"No" indicates that it is not needed Plus or Minus image
                node.children.item(0).src = imgpath + imgPlusMinusPrefix + imgPlusMinus + ".gif";
            else //if is not needed Plus/Minus image
            {
                if (bSetMainImage) //if node has image that must be changed
                {
                    node.children.item(0).src = imgpath + imgMain;
                    bSetMainImage = false;
                }
            }
        }
    }

    // process situation <A..><Checkbox><needed image></A>
    if (bSetMainImage && node.children.length > 1)
    {
        if (node.children.item(0).tagName == "INPUT" && node.children.item(1).tagName == "IMG")
        {
            node.children.item(1).src = imgpath + imgMain;
            bSetMainImage = false;
        }
    }

    //process next tag
    if (bSetMainImage)
    {
        nextNode = node.nextSibling;
        if (nextNode.tagName == "INPUT") //skip checkbox
            nextNode = nextNode.nextSibling;

        if (nextNode.tagName == "IMG") //next tag is needed image
            nextNode.src = imgpath + imgMain;
        else //next tag is <A...>
            if (nextNode.children.length > 0)
            {
                pos = 0;
                if (nextNode.children.item(0).tagName == "INPUT" && nextNode.children.length > 1)
                    pos = 1; // <A..> <Checkbox> <needed image>

                if (nextNode.children.item(pos).tagName == "IMG")
                    nextNode.children.item(pos).src = imgpath + imgMain;
            }
    }
}

function GetCheckedItems()
{
    var IsCaseChecked = false;
    var IsVolChecked = false;
    var currentVol = "";
    var checkedItem = new Array();
    var itemCount = 0;
    var objHTML = "";
    var objValue = "";
    var LeftIndex = 0;
    var RightIndex = 0;
    var arrValue;
    for (i = 0; i < document.forms[0].elements.length; i++)
    {
        if (document.forms[0].elements[i].type != 'checkbox')
            continue;
        if (!document.forms[0].elements[i].checked)
            continue;
        objHTML = document.forms[0].elements[i].outerHTML;
        LeftIndex = objHTML.indexOf("(");
        RightIndex = objHTML.lastIndexOf(")");
        objValue = objHTML.substring(LeftIndex + 1, RightIndex - 1);
        while (objValue.indexOf("'") != -1)
        {
            objValue = objValue.replace("'", "");
        }

        arrValue = objValue.split(",");
        if (arrValue[1] == "3")
            continue;
        if (IsVolChecked)
        {
            if (arrValue[2].indexOf(currentVol) != -1)
                continue;
            else
            {
                currentVol = "";
                IsVolChecked = false;
            }
        }
        switch (arrValue[1])
        {
            case "1":
                checkedItem[itemCount] = arrValue[2];
                IsCaseChecked = true;
                break;
            case "2":
                checkedItem[itemCount] = arrValue[2];
                currentVol = arrValue[2];
                IsVolChecked = true;
                itemCount++;
                break;
            case "4":
                checkedItem[itemCount] = arrValue[2];
                itemCount++;
                break;
        }
        if (IsCaseChecked)
            break;
    }
    return checkedItem;
}

function BorrowProc()
{
    var checkedItem = GetCheckedItems();
    var pFileNo = "";
    if (checkedItem.length == 0)
    {
        alert("請至少勾選一筆公文");
        return;
    }

    for (i = 0; i < checkedItem.length; i++)
    {
        if (i == 0)
            pFileNo = checkedItem[i];
        else
            pFileNo += " " + checkedItem[i];
    }

    var strURL = "../../../AK/AKT800.aspx?FILE_NO=" + pFileNo + "&SAMLart=" + document.all.SsoArtifact.value;
    jf_OpenChildWin(strURL, "AKT800", 800, 530);
}

var callID_OpenImage = null;
function OpenImage()
{
    var checkedItem = GetCheckedItems();
    if (checkedItem.length == 0)
    {
        alert("請至少勾選一筆公文");
        return;
    }
    var argWSParam = new Array(1);
    argWSParam[0] = checkedItem;
    callObj = jf_CallWS("EAI304WS.asmx", "OpenImage", false, argWSParam);
    callID_OpenImage = callObj.id;
    OnWSResult(callObj);
}

function GetCheckedSubject()
{
    var IsCaseChecked = false;
    var IsVolChecked = false;
    var currentVol = "";
    var checkedItem = new Array();
    var itemCount = 0;
    var objHTML = "";
    var objValue = "";
    var LeftIndex = 0;
    var RightIndex = 0;
    var arrValue;
    for (i = 0; i < document.forms[0].elements.length; i++)
    {
        if (document.forms[0].elements[i].type != 'checkbox')
            continue;
        if (!document.forms[0].elements[i].checked)
            continue;
        objHTML = document.forms[0].elements[i].outerHTML;
        LeftIndex = objHTML.indexOf("(");
        RightIndex = objHTML.lastIndexOf(")");
        objValue = objHTML.substring(LeftIndex + 1, RightIndex - 1);
        while (objValue.indexOf("'") != -1)
        {
            objValue = objValue.replace("'", "");
        }

        arrValue = objValue.split(",");
        if (arrValue[1] == "3")
            continue;
        if (arrValue[1] == '4')
            checkedItem += "	" + arrValue[3];

    }
    return checkedItem;
}

function RtnSubject()
{
    var checkedSubject = GetCheckedSubject();
    //alert(checkedSubject);
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].value = checkedSubject.substring(1, checkedSubject.length);
    opener.window.CallBack("EAI304");
    close();
}

//1060803 Zen 1050087 二代升級function CheckAllChildren(oCheckBox)
{
    var oDiv = oCheckBox.nextSibling;
    while (oDiv != null)
    {
        if (oDiv.tagName == "DIV")
            break;
        if (oDiv.tagName == "INPUT")
            return;
        else
            oDiv = oDiv.nextSibling;
    }
    if (oDiv == null)
        return;

    //1060818 Cloud 升級二代 修改寫法
    /*var nLen = oDiv.children.length;
    for (i = 0; i < nLen; i++)
    {
        var oChild = oDiv.children[i];
        if (oChild.tagName == "INPUT")
        {
            oChild.checked = true;
        }
    }*/
	$(oDiv).find("input[id^='tv_chk_node']").prop('checked',true);
}

//1060803 Zen 1050087 二代升級function UnCheckAllChildren(oCheckBox)
{
    var oDiv = oCheckBox.nextSibling;
    while (oDiv != null)
    {
        if (oDiv.tagName == "DIV")
            break;
        if (oDiv.tagName == "INPUT")
            return;
        else
            oDiv = oDiv.nextSibling;
    }
    if (oDiv == null)
        return;

    //1060818 Cloud 升級二代 修改寫法
    /*var nLen = oDiv.children.length;
    for (i = 0; i < nLen; i++)
    {
        var oChild = oDiv.children[i];
        if (oChild.tagName == "INPUT")
        {
            oChild.checked = false;
        }
    }*/
	$(oDiv).find("input[id^='tv_chk_node']").prop('checked');
}
//1141121	Andy 1131229	組織樹重構，改以JSON字串紀錄-塞入CheckBox
function addDiyDom(treeId, treeNode) {
    var aObj = $("#" + treeNode.tId + "_a");
    var switchObj = $("#" + treeNode.tId + "_switch");

    var chk = $("<input type='checkbox' />")
        .attr("id", "tv_chk_" + treeNode.id)
        .attr("onclick", "javascript:CheckBox(this," + treeNode.level + ",'" + treeNode.rtnValue + "');");

    // 在展開符號 *前面* 插入 checkbox
    chk.insertBefore(switchObj);
}
//1141121	Andy 1131229	組織樹重構，改以JSON字串紀錄-找母節點
function jf_GetParentCheckBox(oCheckBox) {
    var li = $(oCheckBox).closest("li");
    var parentLi = li.parent().closest("li");
    if (parentLi.length === 0) return null;
    return parentLi.find("input[type=checkbox]").get(0);
}