var IsServerHandling = new Boolean();
IsServerHandling = false;

function ClientButtonControl()
{
	var xObjectName = document.activeElement.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btLogNew":
			Page_BlockSubmit=true;
			var strLogFilePath = "../../WORKPATH/New_" + window.opener.document.all["txLogFileName"].value;
			jf_OpenChildWin(strLogFilePath, "MsgDiagLog", 700, 500);
			break;
		case "btLogAll":
			Page_BlockSubmit=true;
			var strLogFilePath = "../../WORKPATH/All_" + window.opener.document.all["txLogFileName"].value;
			jf_OpenChildWin(strLogFilePath, "MsgDiagLog", 700, 500);
			break;
	}	
}

function ProjectOnLoad()
{
}

function ClientOnLoad()
{
	var parentwin = window.opener;
	document.all.lbState.innerText = parentwin.document.all["txState"].value;
	document.all.lbErrMsg.innerText = parentwin.document.all["txErrMsg"].value;
	
	if(parentwin.document.all["txState"].value != "未執行")
	{	
		var nRecords = parentwin.document.all["txRecords"].value;
		var rowSql = "";
		var rowRmk = "";
	
		rowSql = parentwin.document.all["txSql_0"].value;
		rowRmk = parentwin.document.all["txRmk_0"].value;
		jf_SetFirstRowInDatagrid(rowSql, rowRmk);
		
		for(var nCount = 1; nCount < nRecords; nCount++)
		{
			rowSql = parentwin.document.all["txSql_" + nCount].value;
			rowRmk = parentwin.document.all["txRmk_" + nCount].value;
			jf_InsertRowToDatagrid(rowSql, rowRmk);
		}
	}
}

function jf_SetFirstRowInDatagrid(argSql, argRmk)
{
	//SQL指令
	document.all.dg1__ctl2_txSql.value = argSql;
	//描述
	document.all.dg1__ctl2_txRmk.value = argRmk;
}

function jf_InsertRowToDatagrid(argSql, argRmk)
{
	var InsertRow = document.all.dg1.insertRow();
	var len = document.all.dg1.rows.length;	//先Insert so長度已+1
	
	//ID整除==單數序
	if (len % 2==0)
		InsertRow.style.backgroundColor = "#F7F7DE";
	
	//置中
	InsertRow.style.textAlign = "Center";
	
	//序
	var lbNo = document.createElement("span");
	lbNo.setAttribute("id", "dg1__ctl" + len + "_lbNo");
	lbNo.setAttribute("innerText", len-1);
	InsertRow.insertCell(0).appendChild(lbNo);
	lbNo.style.width = "16px";
	lbNo.style.color = "Black";
	
	//SQL指令
	var txSql = document.createElement("textarea");
	txSql.setAttribute("value", argSql);
	txSql.setAttribute("id", "dg1__ctl" + len + "_txSql");
	InsertRow.insertCell(1).appendChild(txSql);
	txSql.style.width = "325px";
	txSql.style.height = "100px";
	txSql.style.color = "Black";
	txSql.className = "TextLabel";
	txSql.tabIndex = -1;
	txSql.readOnly = true;
	
	//描述
	var txRmk = document.createElement("textarea");
	txRmk.setAttribute("value", argRmk);
	txRmk.setAttribute("id", "dg1__ctl" + len + "_txRmk");
	InsertRow.insertCell(2).appendChild(txRmk);
	txRmk.style.width = "325px";
	txRmk.style.height = "100px";
	txRmk.style.color = "Black";
	txRmk.className = "TextLabel";
	txRmk.tabIndex = -1;
	txRmk.readOnly = true;
}