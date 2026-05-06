// 人員異動設定子視窗
//	
/* DATE		MGRNO		SA		PG		Desc
   1051014	--			Cloud	Cloud	調整呼叫函式，避免與transfer混淆
   1081008	1080905		David	David	iOS升級後瀏覽器判斷已無"iPad"字樣，調整判斷方式
   1081008	1080339		Kevin	Joe		jQuery升級3.4.1
   1100510	1100221		Kevin	David	支援jQuery3.5.1，調整jQuery.trim用法
*/
var EmployeeChangelWidths = [];
var nsEditor = nsEditor||{};
var gEmployeeChangeNode;
var gEmployeeChangeRootNode;
//人員異動設定
nsEditor.fnSettingEmployeeChange = function(dm, $dlg, refreshView)
{
		gEmployeeChangeRootNode = dm.accquireXml();
		//隱藏獎懲相關欄位
		function fnInit()
		{
			//進行子視窗的初始化
			if(EmployeeChangelWidths.length==0)
				$dlg.find(".ui-table-header-PC_EmpChan .ui-table-column-header").each(function(i, elem) {EmployeeChangelWidths.push($(elem).css("width"));});
				
				gEmpChanNode = $(gEmployeeChangeRootNode).find("異動人員列表").clone();
			//1051108	Cloud	開啟一代辦一半公文，資訊來源會是異動項次
			//1081008 David 1080905 修正物件錯誤問題
			/*if(gTransferNode.find("人員").length==0)
			{
				$(gTransferRootNode).find("異動人員列表").remove();
				if($(gTransferRootNode).find("異動項次").find("人員").length!=0)//將會稿單位列表轉為廠商投標資訊
				{
					fnTranWrap($(gTransferRootNode).find("異動項次"),"異動人員列表");
				}
				gTransferNode = $(gTransferRootNode).find("異動人員列表").clone();
			}*/
			if(gEmpChanNode.find("人員").length==0)
			{
				$(gEmployeeChangeRootNode).find("異動人員列表").remove();
				if($(gEmployeeChangeRootNode).find("異動項次").find("人員").length!=0)//將會稿單位列表轉為廠商投標資訊
				{
					fnTranWrap($(gEmployeeChangeRootNode).find("異動項次"),"異動人員列表");
				}
				gEmpChanNode = $(gEmployeeChangeRootNode).find("異動人員列表").clone();
			}
			
			if(gEmpChanNode.length!=0)
			{
				gEmpChanNode.children("人員").each(doPopulateForTrans);//取得
				
				function doPopulateForTrans(i, node){ //產生節點並放入畫面
						
						var $list = $dlg.find("#EmpChan_receiverList");//取得TABLE 畫面要放入區塊
						
						var $li = $("<li class='ui-table-item-PC'></li>");

						fnsetEmpChanTablaColumn($("<div style='width: 2%; display: inline-block;'><input type='checkbox'></div>").appendTo($li).find("input"),EmployeeChangelWidths[0],"","EmpChan_cbSel_"+i,"選");
						
						fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[1],$(node).find("姓名").text(),"EmpChan_Name_"+i,"姓名");
							                                          
						fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[2],$(node).find("原職稱").text(),"EmpChan_OTitle_"+i,"原職稱");
							                                          
						fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[3],$(node).find("原科別").text(),"EmpChan_ODept_"+i,"原科別");
												                      
						fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[4],$(node).find("新職稱").text(),"EmpChan_NTitle_"+i,"新職稱");
                                                                      
						fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[5],$(node).find("新科別").text(),"EmpChan_NDept_"+i,"新科別");
						                                              
						fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[6],$(node).find("新分機").text(),"EmpChan_NTel_"+i,"新分機");
						fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[7],$(node).find("原因").text(),"EmpChan_Reason_"+i,"原因");
						fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[8],$(node).find("年月日").text(),"EmpChan_YYMMDD_"+i,"年月日");
						fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[9],$(node).find("備註").text(),"EmpChan_DESC_"+i,"備註");
							
						$li.appendTo($list);
				}
			}
			else
			{
				var nodeTranList = gEmployeeChangeRootNode.createElement("異動人員列表");
				$(gEmployeeChangeRootNode.documentElement).append(nodeTranList);
				gEmpChanNode = $(gEmployeeChangeRootNode).find("異動人員列表").clone();

			}
		}
		//************************************************************註冊事件****************************************************//
		//加入
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#EmpChan_Addnew").click(function() {
		$dlg.find("#EmpChan_Addnew").on("click", function() {
			
			//取得TABLE 畫面要放入區塊
			var EmpChan = 
			{
				//1100510 David 1100221 移除jQuery.trim()
				/*"Name" :jQuery.trim($("#EmpChan_Name").val()),
				"OTitle" :jQuery.trim($("#EmpChan_OTitle").val()),
				"ODept" :jQuery.trim($("#EmpChan_ODept").val()),
				"NTitle" :jQuery.trim($("#EmpChan_NTitle").val()),
				"NDept" :jQuery.trim($("#EmpChan_NDept").val()),
				"NTel" :jQuery.trim($("#EmpChan_NTel").val()),
				"Reason" :jQuery.trim($("#EmpChan_Reason").val()),
				"YYMMDD" :jQuery.trim($("#EmpChan_YYMMDD").val()),
				"DESC" :jQuery.trim($("#EmpChan_DESC").val()),*/
				"Name" :jf_Trim($("#EmpChan_Name").val())
				,"OTitle" :jf_Trim($("#EmpChan_OTitle").val())
				,"ODept" :jf_Trim($("#EmpChan_ODept").val())
				,"NTitle" :jf_Trim($("#EmpChan_NTitle").val())
				,"NDept" :jf_Trim($("#EmpChan_NDept").val())
				,"NTel" :jf_Trim($("#EmpChan_NTel").val())
				,"Reason" :jf_Trim($("#EmpChan_Reason").val())
				,"YYMMDD" :jf_Trim($("#EmpChan_YYMMDD").val())
				,"DESC" :jf_Trim($("#EmpChan_DESC").val())
			}
			var $list = $dlg.find("#EmpChan_receiverList");
			var seq = $dlg.find("#EmpChan_receiverList").children().length;
			var Xmlseq = $dlg.find("#EmpChan_receiverList").children().length+1;
						
			var $li = $("<li class='ui-table-item-PC'></li>");

			fnsetEmpChanTablaColumn($("<div style='width: 2%; display: inline-block;'><input type='checkbox'></div>").appendTo($li).find("input"),EmployeeChangelWidths[0],"","EmpChan_cbSel_"+seq,"選");

			fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[1],EmpChan.Name,"EmpChan_Name_"+seq,"姓名");
			
			fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[2],EmpChan.OTitle,"EmpChan_OTitle_"+seq,"原職稱");
				
			fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[3],EmpChan.ODept,"EmpChan_ODept_"+seq,"原科別");
									
			fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[4],EmpChan.NTitle,"EmpChan_NTitle_"+seq,"新職稱");

			fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[5],EmpChan.NDept,"EmpChan_NDept_"+seq,"新科別");

			fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[6],EmpChan.NTel,"EmpChan_NTel_"+seq,"新分機");

			fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[7],EmpChan.Reason,"EmpChan_Reason_"+seq,"原因");

			fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[8],EmpChan.YYMMDD,"EmpChan_YYMMDD_"+seq,"年月日");

			fnsetEmpChanTablaColumn($("<div style='width: 9%; display: inline-block;'><input></div>").appendTo($li).find("input"),EmployeeChangelWidths[9],EmpChan.DESC,"EmpChan_DESC_"+seq,"備註");
				
			$li.appendTo($list);
			
			//建立XML
			var newNode = gEmployeeChangeRootNode.createElement("人員");
				newNode.setAttribute("序",Xmlseq);
			fnCreatEmpNode("序",Xmlseq,newNode);
			fnCreatEmpNode("姓名",EmpChan.Name,newNode);
			fnCreatEmpNode("原職稱",EmpChan.OTitle,newNode);
			fnCreatEmpNode("原科別",EmpChan.ODept,newNode);
			fnCreatEmpNode("新職稱",EmpChan.NTitle,newNode);
			fnCreatEmpNode("新科別",EmpChan.NDept,newNode);
			fnCreatEmpNode("新分機",EmpChan.NTel,newNode);
			fnCreatEmpNode("原因",EmpChan.Reason,newNode);
			fnCreatEmpNode("年月日",EmpChan.YYMMDD,newNode);
			fnCreatEmpNode("備註",EmpChan.DESC,newNode);
			$(gEmpChanNode).append(newNode);
			$("#EmpChan_Name").val("");
			$("#EmpChan_OTitle").val("");
			$("#EmpChan_ODept").val("");
			$("#EmpChan_NTitle").val("");
			$("#EmpChan_NDept").val("");
			$("#EmpChan_NTel").val("");
			$("#EmpChan_Reason").val("");
			$("#EmpChan_YYMMDD").val("");
			$("#EmpChan_DESC").val("");
		});
		
		//儲存
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#EmpChan_Save").click(function() {
		$dlg.find("#EmpChan_Save").on("click", function() {
				
			if(confirm('您是否要儲存目前畫面中的異動人員資訊內容？'))
			{
				$(gEmployeeChangeRootNode.documentElement).find("異動人員列表").replaceWith(gEmpChanNode);
				//叫用refreshView更新畫面
				if($.isFunction(refreshView))
					refreshView();
				$.modal.close();
			}
			else
				return;
		});
		//離開
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#EmpChan_Close").click(function() {
		$dlg.find("#EmpChan_Close").on("click", function() {
			$.modal.close();
		});
		
		//刪除
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#EmpChan_btDelete").click(function() {
		$dlg.find("#EmpChan_btDelete").on("click", function() {
			
			var icheckboxlength = $("#EmpChan_receiverTable").find("input[id^='EmpChan_cbSel_']").length;
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#EmpChan_receiverTable").find("input[id^='EmpChan_cbSel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i+1;//xml的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲刪除的異動人員資訊');
				return;
			}	
			
			if(!confirm('請確認是否刪除第'+arCheckedIdx+'筆異動人員資訊？'))
				return;
				
			//1051014	--			Cloud	Cloud	調整呼叫函式，避免與transfer混淆
			//fnDelete(arCheckedIdx,$("#EmpChan_receiverList"));
			fnDeleteEmp(arCheckedIdx,$("#EmpChan_receiverList"));
		});
		//上移
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#EmpChan_btMoveUp").click(function() 
		$dlg.find("#EmpChan_btMoveUp").on("click", function() 
		{
			
			var icheckboxlength = $("#EmpChan_receiverTable").find("input[id^='EmpChan_cbSel_']").length;
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#EmpChan_receiverTable").find("input[id^='EmpChan_cbSel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i;//畫面的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲移動的異動人員資訊');
				return;
			}	
			arCheckedIdx.sort();
			//1051014	Cloud	調整函式名稱避免混淆	
			//fnMoveUp(arCheckedIdx);
			fnEmpMoveUp(arCheckedIdx);
		});
		//下移
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#EmpChan_btMoveDown").click(function() 
		$dlg.find("#EmpChan_btMoveDown").on("click", function() 
		{
			var icheckboxlength = $("#EmpChan_receiverTable").find("input[id^='EmpChan_cbSel_']").length;
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#EmpChan_receiverTable").find("input[id^='EmpChan_cbSel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i;//xml的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲移動的異動人員');
				return;
			}	
			arCheckedIdx.reverse();	//由大到小
			//1051014	Cloud	調整函式名稱避免混淆	
			//fnMoveDown(arCheckedIdx,icheckboxlength);
			fnEmpMoveDown(arCheckedIdx,icheckboxlength);
		});
		fnInit();
		
}


//設定xml資料
function fnsetEmpChanTablaColumn(argobj,argWith,argval,argId,argTagName)
{
	argobj.css("width", "100%").val(argval).attr("id",argId);
	if(argTagName!="選")
		argobj.parent().addClass("ui-input-text ui-body-inherit ui-corner-all ui-mini ui-shadow-inset")
		//1081008	Joe		1080339		jQuery升級3.4.1
		// .bind("change",function(envnt) {fnSetEmpChanInfo(event.target.id,argTagName,event.target.value);});
		.on("change",function(envnt) {fnSetEmpChanInfo(event.target.id,argTagName,event.target.value);});
	else
	{
		//if(navigator.userAgent.match("Chrome")==null)
		//1081008 David 1080905 iOS升級後瀏覽器判斷已無"iPad"字樣，調整判斷方式
		/*if(navigator.userAgent.match("Chrome")==null && navigator.userAgent.match("iPad")==null)
			argobj.parent().css("border-style","none").addClass("ui-input-text ui-mini");
		else
			argobj.parent().css("border-style","none");*/
		if(navigator.userAgent.indexOf("Trident") > 0)//瀏覽器為IE
			argobj.parent().css("border-style","none").addClass("ui-input-text ui-mini");
		else
			argobj.parent().css("border-style","none");
	}
}
//1051014 	Cloud	調整函式避免與Tranfer混淆
//function fnMoveTranData(argData,newseq)
function fnMoveEmpData(argData,newseq)
{
	var Iputidindex=newseq-1;//新位置的id數字
	for(var iData=0;iData<argData.length;iData++)//逐個INPUT換ID
	{		
		if(argData.eq(iData).attr("id")!="")
		{
			newid = argData.eq(iData).attr("id").split('_')[0]+"_"+argData.eq(iData).attr("id").split('_')[1]+"_"+Iputidindex;
			argData.eq(iData).attr("id",newid);
		}
	}
}

//將畫面異動資訊設定至XML物件
function fnSetEmpChanInfo(argId,argTagName,argVal)
{
	var sTmp = argId.split("_")[2];
	var sFindNum = parseInt(sTmp)+1;
	//1051014	Cloud	調整函式名稱避免混淆	
	//fnSetTextOfElement(gEmpChanNode.find(">人員[序='"+sFindNum+"']").children(argTagName),jf_Trim(argVal));
	fnSetEmpTextOfElement(gEmpChanNode.find(">人員[序='"+sFindNum+"']").children(argTagName),jf_Trim(argVal));
}
//1051014	Cloud	調整函式名稱避免混淆	
//function fnSetTextOfElement(objElement,textValue)
function fnSetEmpTextOfElement(objElement,textValue)
{
	for(var i=0,maxIdx = objElement.length;i<maxIdx;i++){
		var u = objElement.get(i);
		if("text" in u)
			u.text = textValue;
		else
			u.textContent = textValue;
	}
	return objElement;	//把傳進來的物件再回傳出去，方便再接著呼叫其他JQuery功能
}
function fnCreatEmpNode(argNodeName,argNodeVal,argMomNode)
{
	var newNodeInfo = gEmployeeChangeRootNode.createElement(argNodeName); 
		if("text" in newNodeInfo)
			newNodeInfo.text = argNodeVal;
		else
			newNodeInfo.textContent = argNodeVal;
	$(argMomNode).append(newNodeInfo);
}
//刪除
//1051014	--	Cloud	調整呼叫函式，避免與transfer混淆
//function fnDelete(argArray,argTablobj)
function fnDeleteEmp(argArray,argTablobj)
{
	var xmlObj ;
			
	for(var i=argArray.length-1;i>=0;i--)
	{
		xmlObj = gEmpChanNode.find("人員[序='"+argArray[i]+"']");
	
		argTablobj.find("li.ui-table-item-PC").eq(argArray[i]-1).remove();
		xmlObj.remove();
	}
	//序重建
	xmlObj = gEmpChanNode.find("人員");
	var NewSeq;
	for(var iXml=0;iXml<xmlObj.length;iXml++)
	{
		NewSeq = iXml+1;
		xmlObj.get(iXml).setAttribute("序",NewSeq);
		xmlObj.find("序").text(NewSeq);
		//1051014	--	Cloud	調整呼叫函式，避免與transfer混淆
		//fnMoveTranData($("li.ui-table-item-PC").eq(iXml).find("input"),NewSeq);
		fnMoveEmpData($("li.ui-table-item-PC").eq(iXml).find("input"),NewSeq);
	}
}
//上移
//1051014	--	Cloud	調整呼叫函式，避免與transfer混淆
//function fnMoveUp(argArray)
function fnEmpMoveUp(argArray)
{
	for(var iDept=0;iDept<argArray.length;iDept++)
	{
		if (argArray[iDept]>0)
		{
			var Nowseq = parseInt(argArray[iDept]);//現在異動的受文者序
			var Newseq = Nowseq;//新的位置序
			var XMLseq = Nowseq+1;//現在受文者在XML序
			var NewXMLseq = XMLseq;//新受文者在XML序
			Newseq--;
			NewXMLseq--;
			
			
			gEmpChanNode.find("人員[序='"+XMLseq+"']").prev().attr("序","");//序交換
			
			gEmpChanNode.find("人員[序='"+XMLseq+"']").insertBefore(gEmpChanNode.find("人員[序='"+XMLseq+"']").prev()).attr("序",NewXMLseq);
			
			gEmpChanNode.find("人員[序='"+NewXMLseq+"']").next().attr("序",XMLseq);//序交換
			//做完交換，更新TAG的序
			gEmpChanNode.find("人員[序='"+XMLseq+"']").find("序").text(XMLseq);
			gEmpChanNode.find("人員[序='"+NewXMLseq+"']").find("序").text(NewXMLseq);
			
			//1051014	Cloud	調整函式名稱避免混淆	
			//fnMoveTranData($("li.ui-table-item-PC").eq(Nowseq).find("input"),NewXMLseq);//替換現在上移的ID
			//fnMoveTranData($("li.ui-table-item-PC").eq(Nowseq).prev().find("input"),XMLseq);//替換被移下來的ID
			fnMoveEmpData($("li.ui-table-item-PC").eq(Nowseq).find("input"),NewXMLseq);//替換現在上移的ID
			fnMoveEmpData($("li.ui-table-item-PC").eq(Nowseq).prev().find("input"),XMLseq);//替換被移下來的ID
			//畫面資料搬移
			$("li.ui-table-item-PC").eq(Nowseq).insertBefore($("li.ui-table-item-PC").eq(Nowseq).prev());
		}
		else
		{
			alert('已移到第一筆');
			return;
		}	
	}
}
//下移
//1051014	Cloud	調整函式名稱避免混淆	
//function fnMoveDown(argArray,argMaxLength)
function fnEmpMoveDown(argArray,argMaxLength)
{
	for(var iDept=0;iDept<argArray.length;iDept++)
	{
		if (argArray[iDept] < argMaxLength) 
		{
			var Nowseq = parseInt(argArray[iDept]);//現在異動的序
			var Newseq = Nowseq;//新的位置序-判斷上下移之後再做++ --
			var XMLseq = Nowseq+1;//現在受文者在XML序
			var NewXMLseq = XMLseq;//新受文者在XML序-判斷上下移之後再做++ --
			Newseq++;
			NewXMLseq++;

			if(argMaxLength==XMLseq)//新的序已經是最大長度，不做移動
			{
				alert("已移到最後一筆");
				return;
			}
				
			//把下一筆的序換成暫存
			gEmpChanNode.find("人員[序='"+XMLseq+"']").next().attr("序","");
			//把自己塞到下一筆後面去
			gEmpChanNode.find("人員[序='"+XMLseq+"']").insertAfter(gEmpChanNode.find("人員[序='"+XMLseq+"']").next()).attr("序",NewXMLseq);
			gEmpChanNode.find("人員[序='"+NewXMLseq+"']").prev().attr("序",XMLseq);
			//做完交換，更新TAG的序
			gEmpChanNode.find("人員[序='"+XMLseq+"']").find("序").text(XMLseq);
			gEmpChanNode.find("人員[序='"+NewXMLseq+"']").find("序").text(NewXMLseq);
			//做ID交換完畢再做畫面資料更換
			//1051014	Cloud	調整函式名稱避免混淆	
			//fnMoveTranData($("li.ui-table-item-PC").eq(Nowseq).find("input"),NewXMLseq);//替換現在的受文者ID
			//fnMoveTranData($("li.ui-table-item-PC").eq(Nowseq).next().find("input"),XMLseq);//替換被移下來的受文者ID
			fnMoveEmpData($("li.ui-table-item-PC").eq(Nowseq).find("input"),NewXMLseq);//替換現在的受文者ID
			fnMoveEmpData($("li.ui-table-item-PC").eq(Nowseq).next().find("input"),XMLseq);//替換被移下來的受文者ID
			//畫面資料搬移
			$("li.ui-table-item-PC").eq(Nowseq).insertAfter($("li.ui-table-item-PC").eq(Nowseq).next());
		
		}
		else
		{
			alert('已移到最後一筆');
			return;
		}
	}
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-EmpChan.js").finish();
})();
