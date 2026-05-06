/*
DATE		SA		PGR		MGR_NO		DESC
1110324		Kevin	Joe		1101364		新增程式
 */

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

	xObjectName = event.target.id;

	switch (xObjectName)
	{
        case "btSearch":
            if (document.all.txYear.value == "") {
                alert('請輸入統計年份');
                Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}


function ClientOnLoad()
{
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function CallBack(argCallerId) {
}

function ReturnValue()
{    
}
