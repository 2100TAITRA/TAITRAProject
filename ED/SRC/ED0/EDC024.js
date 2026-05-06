/*
DATE 		SA		PRG		MGR_NO		DESC
1031013		--		Cloud	1030659		新增核決層級查詢程式
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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    var strTitleAttribute = '';
    strTitleAttribute = 'description';

    var setting = {
        data: {
            simpleData: {
                enable: true
            }
            , key: {
                title: strTitleAttribute
            }
        },
        view: {
        },
        callback: {
            onClick: RtnValue
        }
    };

    //1100305 Zen 1100243 以200筆資料切分Json字串，避免Chrome瀏覽器崩潰
    if (document.all['H_JsonData000'])
        document.all['H_JsonData'].value = document.all['H_JsonData000'].value;

    if (document.all.H_JsonData.value != "" && document.all['H_JsonData000'])
    {
        document.all.H_JsonData.value = document.all.H_JsonData.value.replace(/&quot;/g, "\"");
        var zNodes = JSON.parse('[' + document.all.H_JsonData.value + ']');

        var nJsonDataCnt = document.all['H_JsonDataCnt'].value;
        for (let i = 1; i <= nJsonDataCnt; i++)
        {
            let idx = jf_PADL(i + '', 3, '0');

            document.all['H_JsonData' + idx].value = document.all['H_JsonData' + idx].value.replace(/&quot;/g, "\"");
            zNodes = zNodes.concat(JSON.parse('[' + document.all['H_JsonData' + idx].value + ']'));
        }

        $.fn.zTree.init($("#Classtree"), setting, zNodes);
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
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
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            IsServerHandling = true;
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btExcel":
            IsServerHandling = true;
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
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
    if (argResult.id == wsDuplicateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
        }
        else
        {
        }
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function RtnValue(event, treeId, treeNode)
{
    let Info = treeNode.INFO.split('|');
    let strIsLowest = treeNode.IS_LOWEST;

    if (document.all["H_txMode"].value == "2" && strIsLowest == "1")
    {
        alert('上層模式，僅點選非最末層可回傳。');
        return;
    }

    if (document.all["H_txMode"].value == "3" && strIsLowest == "0")
    {
        alert('末層模式，僅點選最末層可回傳。');
        return;
    }

    RestRtnValue(Info[0], Info[1], Info[2], Info[3], Info[4], Info[5], Info[6]);

}

function RestRtnValue(argRespNo, argRespContent, argRespDesc, argUpperRespNo, argApplistNo, argApplistAppName, argIsLowest)
{
    let strFrom = document.all["H_txFrom"].value;

    if (strFrom == "Custom")
    {
        var rtnobj =
        {
            "argRespNo": argRespNo,
            "argRespContent": argRespContent,
            "argRespDesc": argRespDesc,
            "argUpperRespNo": argUpperRespNo,
            "argApplistNo": argApplistNo,
            "argApplistAppName": argApplistAppName,
            "argIsLowest": argIsLowest,
        };
        parent.$("#extdlg_close_btn").trigger("click", rtnobj);
    }
    else
    {
        opener.document.all.lbReturnValue.length = 7;
        opener.document.all.lbReturnValue.options[0].value = argRespNo;
        opener.document.all.lbReturnValue.options[1].value = argRespContent;
        opener.document.all.lbReturnValue.options[2].value = argRespDesc;
        opener.document.all.lbReturnValue.options[3].value = argUpperRespNo;
        opener.document.all.lbReturnValue.options[4].value = argApplistNo;
        opener.document.all.lbReturnValue.options[5].value = argApplistAppName;
        opener.document.all.lbReturnValue.options[6].value = argIsLowest;
        opener.window.CallBack("EDC024");
        close();
    }
}