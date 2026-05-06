/*
DATE	SA		PRG		MGR_NO			DESC
1100917	David	David	1080763			Merge至共通版
*/
var CurrOrgIdObj;
var CurrOrgNameObj;

var IsServerHandling = new Boolean();
IsServerHandling = false;

jf_ShowValidator();

function ClientButtonControl(e) {
    
	var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }
}

function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btSave":
            SetReturnObj();
            Page_BlockSubmit = true;
            break;
    }
}

function SetReturnObj() {
    try {
        var RtnFileName2 = "";
        var RtnFileName = "";
        var RtnFileID = "";
        var pDg1Len = document.all.dg1.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
        var bHachoose = false;
        for (i = 2; i < pDg1Len; i++) {
            if (document.all["dg1__ctl" + i + "_cbFile"].checked) {
                if (RtnFileName != "")
                    RtnFileName += ",";
                RtnFileName += document.all["dg1__ctl" + i + "_h_FileName"].value;
                if (RtnFileName2 != "")
                    RtnFileName2 += "|";
                RtnFileName2 += document.all["dg1__ctl" + i + "_h_FileName"].value;
                if (RtnFileID != "")
                    RtnFileID += "|";
                RtnFileID += document.all["dg1__ctl" + i + "_h_id"].value;
                bHachoose = true;
            }
        }
        opener.document.all.lbReturnValue.length = 3;
        opener.document.all.lbReturnValue.options[0].value = RtnFileName;
        opener.document.all.lbReturnValue.options[1].value = RtnFileName2;
        opener.document.all.lbReturnValue.options[2].value = RtnFileID;
        opener.window.CallBack("WEM070C1");
        if (bHachoose)
            window.close();
        else
        {
            if(window.confirm("並未勾選任何範本，是否關閉視窗?"))
            {
                window.close();
            }
        }
    }
    catch (e) { }
}

function ClientOnLoad() {
    
}

function OnWSResult(argResult) {
}