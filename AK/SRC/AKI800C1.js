/*
DATE	SA		PRG		MGR_NO			DESC

*/

var IsServerHandling = new Boolean();
IsServerHandling = false;


function ShowMsg()
{
	jf_ShowValidator();	
}

function ClientButtonControl(e)
{
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
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

function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
	    case "btSave":
	        Page_BlockSubmit = !SaveRecord();	       
	        if (Page_BlockSubmit)
	            alert('條件說明欄位不可為空白。');
			jf_ToolBarSubmit(xObjectName);
			break;
	    case "btDelete":
	        if (jf_ConfirmDelete())
	            DeleteRecord();
	        Page_BlockSubmit = true;
			break;
	    case "btCommit":
	        if (CommitRecord()) {
	            opener.window.CallBack("AKI800C1");
	            jf_CloseSelf();
	        }
			Page_BlockSubmit = true;
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
	}
}


function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    var strRecord = $('#h_txCondRecord').val().replace(/&quot;/g, "\"");
    var condRecord = strRecord == "" ? null : JSON.parse(strRecord);
    if (condRecord && 'Root' in condRecord) {
        condRecord.Root.forEach(function (cond,idx) {
            $H_cond = $('input[id$="txCond"]').eq(idx);
            $lbCond = $('span[id$="lbCond"]').eq(idx);
            $txDexc = $('input[id$="txCondDesc"]').eq(idx);
            $H_cond.val(JSON.stringify(cond));
            $H_cond.data('condObj', cond);
            let strCond = initCondInfo(cond)
            if (strCond != "")
                $lbCond.text((strCond.length > 40?strCond.substring(0, 40) + '...':strCond)).attr('title', strCond);;
            $txDexc.val(cond.DESC);
        })
    }

    if (jf_GetActionMode() == "0") {    //新增模式下，才帶入AKI800暫存的條件設定
        var currCond = JSON.parse(localStorage["USER_CONDITION_" + jf_GetArtifact()]);
        var $record;
        $('input[id$="txCond"]').each(function (i, obj) { if ($(obj).val() == "" && !$record) $record = $(obj) });
        if (!$record) {
            alert('自訂條件已滿，請刪除不需要之項目，重新設定')
        } else {
            let strCond = initCondInfo(currCond)
            if (strCond != "") {
                $record.val(JSON.stringify(currCond.Root[0]));
                $record.data('condObj', currCond.Root[0]);
                $record.parent().find('[id$="lbCond"]').text((strCond.length > 40 ? strCond.substring(0, 40) + '...' : strCond)).attr('title', strCond);
            }
        }
    }
	$('input[id$="txCondDesc"]').on('blur', function () {
	    let $cond = $(this).closest('tr').find('[id$="txCond"]');
	    let condObj = $cond.data('condObj');
	    condObj.DESC = $(this).val();
	    $cond.val(JSON.stringify(condObj));
	})
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function initCondInfo(currCond,idx) {
	var cond;
	if (currCond && 'Root' in currCond && currCond.Root.length) {
		cond = currCond.Root[idx || 0];
	} else
		cond = currCond;
	var arCond = [];
	cond.Conds.forEach(function (o) { arCond.push(o.CondName + ":" + o.CondValue) })
	if (arCond.length == 0)
	    return "";
	return arCond.join(',');
}

function SaveRecord() {
    var ret = true;
    var arRecord = []
    $('input[id$="txCond"]').each(function (i, obj) {
        let $condObj = $(obj);
        let $Desc = $condObj.closest('tr').find('[id$="txCondDesc"]')

        if ($condObj.val() != "") {
            if ($Desc.val() == "")
                ret = false;
            arRecord.push(JSON.parse($condObj.val()));
        }
    })
    $('#h_txCondRecord').val(JSON.stringify({ Root: arRecord }));
    return ret;
}

function DeleteRecord() {
    var $check = $('td>:checked');
    if(!$check.length)
        return false;
    $check.each(function (i, obj) {
        $(obj).prop('checked', false);
        let $tr = $(obj).closest('tr');
        $tr.find('[id$="txCondDesc"]').val("");
        $tr.find('span[id$="lbCond"]').text('');
        let $H_cond = $tr.find('input[id$="txCond"]');
        $H_cond.val("").data('condObj', null);
    })
    return true;
}

function CommitRecord() {
    var $check = $('td>:checked');
    if (!$check.length || $check.length > 1){
        alert('請勾選一個查詢條件。')
        return false;
    }
    let $tr = $check.closest('tr');
    let $cond = $tr.find('input[id$="txCond"]');
    localStorage["USER_CONDITION_" + jf_GetArtifact()] = $cond.val();
    return true;
}