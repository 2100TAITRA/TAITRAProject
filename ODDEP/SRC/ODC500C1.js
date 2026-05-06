/*
DATE	SA		PRG		MGR_NO		DESC
1050425 David   Zen     1050087     二代公文修改
1060518 Leslie  Zen     1060215     innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050425 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050425 Zen 1050087 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
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
//1050425 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
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
	
    //1050425 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			jf_ToolBarSubmit();
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			jf_ToolBarSubmit();
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit();
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    //1050425 Zen 1050087 二代公文修改
    document.getElementById('tbTool').hidden = true;
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
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
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

//新增一筆Row
function InsertRows(argObj)
{
	var InsertRow;
	var len;
	
	InsertRow = document.all["dg1"].insertRow();
	len = document.all["dg1"].rows.length;	//先Insert so長度已+1
	
	//ID整除==單數序
	if (len % 2==0)
		InsertRow.style.backgroundColor = "#F7F7DE";
	//置中
	InsertRow.style.textAlign = "Center";
	
	//序
	var lbNo = document.createElement("span");
	lbNo.setAttribute("id","dg1__ctl"+len+"_lbNo");
	lbNo.setAttribute("innerText",len-1);
	InsertRow.insertCell(0).appendChild(lbNo);
	lbNo.style.color = "Black";

	//訊息代號(hide)
	var lbMsg = document.createElement("span");
	lbMsg.setAttribute("id","dg1__ctl"+len+"_H_Msg");
	lbMsg.setAttribute("innerText",argObj.MsgID);
	lbMsg.setAttribute("className","hide");
	InsertRow.cells[0].appendChild(lbMsg);
	lbMsg.style.color = "Black";
	lbMsg.className = "hide";

	//選取
	var cb1 = document.createElement("input");
	cb1.setAttribute("type","checkbox");
	cb1.setAttribute("id","dg1__ctl"+len+"_cb1");
	InsertRow.insertCell(1).appendChild(cb1);
	cb1.style.color = "Black";
	
	//公文文號
	var txDoc = document.createElement("input");
	txDoc.setAttribute("type","text");
	txDoc.setAttribute("value",argObj.DocNo);
	txDoc.setAttribute("id","dg1__ctl"+len+"_txDoc");
	InsertRow.insertCell(2).appendChild(txDoc);
	txDoc.style.width = "100px";
	txDoc.style.color = "Black";
	txDoc.className = "TextLabel";
	txDoc.tabIndex = -1;
	txDoc.readOnly = true;

	//送文單位
	var lbIssueDept = document.createElement("span");
	lbIssueDept.setAttribute("id","dg1__ctl"+len+"_lbIssueDept");
	lbIssueDept.setAttribute("innerText",argObj.DeptName);
	InsertRow.insertCell(3).appendChild(lbIssueDept);
	lbIssueDept.style.color = "Black";
	
	//送文別
	var lbType = document.createElement("span");
	lbType.setAttribute("id","dg1__ctl"+len+"_lbType");
	lbType.setAttribute("innerText",argObj.TxName);
	InsertRow.insertCell(4).appendChild(lbType);
	lbType.style.color = "Black";
	
	//承辦單位
	var lbDept = document.createElement("span");
	lbDept.setAttribute("id","dg1__ctl"+len+"_lbDept");
	lbDept.setAttribute("innerText",argObj.DeptName);
	InsertRow.insertCell(5).appendChild(lbDept);
	lbDept.style.color = "Black";
	
	//主旨
	var txSubject = document.createElement("input");
	txSubject.setAttribute("type","text");
	txSubject.setAttribute("value",argObj.Subject);
	txSubject.setAttribute("id","dg1__ctl"+len+"_txSubject");
	InsertRow.insertCell(6).appendChild(txSubject);
	txSubject.style.width = "150px";
	txSubject.style.color = "Black";
	txSubject.className = "TextLabel";
	txSubject.tabIndex = -1;
	txSubject.readOnly = true;
}