/*
DATE	SA		PRG		MGR_NO	DESC
0961214	Stella	Yvonne	001669	(中企)指定識別碼匯入，若ORGMAIN中已存在則不匯入
1050419	David	David	1050087	二代公文修改
1051031	Leslie	Joe		1050087	二代修改配合行動平台
1110103	Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050419 David 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050419 David 1050087 二代公文修改
	/*if (document.all["ValidationSummary1"].innerText != "")
		alert(document.all["ValidationSummary1"].innerText);*/
	jf_ShowValidator();
}

//1051031	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051031	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
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

//1050419 David 1050087 二代公文修改
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
	/*
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	*/

	//1050419 David 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btImport":
			if (jf_Trim(document.all.txFile.value) == '')
			{
				alert('請先選擇要匯入的檔案!');
				document.all.txFile.focus();
				//1050419 David 1050087 二代公文修改
				Page_BlockSubmit = true;
				return;
			}
			
			else
			{
				if(document.all.rbAllimport_0.checked ==true)//Yvonne 選擇匯入一筆失敗則全部不匯入
				{
					if(!window.confirm("選擇匯入一筆失敗則全部不匯入，需要較多的處理時間，您是否確定以此方式匯入？"))
					{
						//1050419 David 1050087 二代公文修改
						Page_BlockSubmit = true;
						return;
					}
					//1050419 David 1050087 二代公文修改
					//jf_ToolBarSubmit();
				}

				var nFileIdx = document.all.txFile.value.lastIndexOf('.');
				var pExtFileName = document.all.txFile.value.substring(nFileIdx+1,document.all.txFile.value.length);
				if (pExtFileName == 'txt' || pExtFileName == 'csv')
				{
					//1050419 David 1050087 二代公文修改
					//jf_ToolBarSubmit();
					Page_BlockSubmit = false;
					jf_ToolBarSubmit(xObjectName);
				}
				else
				{
					alert('請匯入正確的檔案格式!(*.txt或*.csv)');
					document.all.txFile.focus();
					//1050419 David 1050087 二代公文修改
					Page_BlockSubmit = true;
					return;
				}
			}
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	ShowMsg();	
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050419 David 1050087 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}
