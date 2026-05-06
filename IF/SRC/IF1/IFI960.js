/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1060518		Joe			1050087	二代升級SCI960移至IF(更名為IFI960)
 ****************************************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

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
	Page_BlockSubmit=true;
	switch (xObjectName)
	{
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
	
	xObjectName = event.target.id
	
	Page_BlockSubmit=false;

	switch (xObjectName)
	{
		case "btSearch":
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			jf_ToolBarSubmit(xObjectName);
			break;
	}	
}
function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    if (document.all.AlertMsgForNonePriv != null)
        window.close();
    if (document.all.ErrMsg != null)
        alert(document.all.ErrMsg.value);
    if (document.all.SuccessMsg != null)
        alert(document.all.SuccessMsg.value);
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function CheckCDate(argID)
{
	argObj = document.all[argID];
	
    if (argObj.value != "") {
        while (argObj.value.length < 7)
        {
            argObj.value = "0" + argObj.value;
        }
        var pYear, pMonth, pDay;
        pYear = parseInt(argObj.value.substring(0, 3), 10) + 1911;
        pMonth = parseInt(argObj.value.substring(3, 5), 10);
        pDay = parseInt(argObj.value.substring(5, 7), 10);

        if (!ValidDate(pYear, pMonth - 1, pDay)) {
            if (argObj.id == "txNewDateS")
                alert("申請日期(起)格式錯誤!")
            else if (argObj.id == "txNewDateE")
                alert("申請日期(訖)格式錯誤!")
            else if (argObj.id == "txCertExpDateS")
                alert("憑證到期日(起)格式錯誤!")
            else if (argObj.id == "txCertExpDateE")
                alert("憑證到期日(訖)格式錯誤!")
			$('#' + argID).focus(); 
        }
    }
}
function ValidDate(y, m, d) // m = 0..11
{ with (new Date(y, m, d)) return ((getDate() == d) && (getMonth() == m)) }
