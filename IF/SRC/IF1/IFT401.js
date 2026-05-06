/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1110326	Leslie	Leslie	1101532		新增本作業
 * 1111208	Leslie	Leslie	1111198		增修合併字型功能
 */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}

//紀錄Call WebService物件的id
var wsDuplicateID;

//全域變數
var uDatafli = 'fli'
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	// call initialization file
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
	var xObjectName = e.target.id;
	var pNo     = xObjectName.substring(8,xObjectName.indexOf("_btHelp"));
	var pNoHelp = "dg1__ctl"+pNo+"_btHelp";
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case pNoHelp:
			Page_BlockSubmit=true;
			break;
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
	        Page_BlockSubmit = true;
	        jf_ShowWaitState();
		    fnUploadAtt(function () {
		        Page_BlockSubmit = false;
		        jf_ToolBarSubmit(xObjectName);
		    });			
			break;

	}
}

function fnUploadAtt(callback) {
	var arAtt = [],arAttInfo=[]
	$('.dpZone').each(function () {
		let fliObj = $(this).data(uDatafli);
		if (fliObj) {
		    fliObj.dpZone = $(this)
		    arAtt.push(fliObj)
			arAttInfo.push($(this).data('font')+';'+fliObj.name )
        }
	})

	if (arAtt.length > 0) {
	    var i = 0;
	    var strWebService = $('#h_wsWebFileIO').val();
	    var strWorkPath = $('#h_WorkPath').val();
	    var strArtifact = jf_GetArtifact();
	    var upLength = 4 * 1024 * 1024, iPart = 0;
	    var utf7 = new Utf7Encoding()

	    function refreshState(obj, msg) {
	        setTimeout(function () {
	            obj.find('.dpInfo').text(msg);
	        }, 1);
	    }

	    function doStart() {
	        if (arAtt.length > i) {
	            var att = arAtt[i];

	            if (att.size > upLength) {
	                let pStart = iPart++ * upLength;
	                let pEnd = (att.blbBase64.length - pStart > upLength) ? pStart + upLength : att.blbBase64.length;
	                let bUPEnd = pEnd == att.blbBase64.length
	                var uploadPart = (bUPEnd) ? att.blbBase64.substr(pStart) : att.blbBase64.substr(pStart, upLength)

	                refreshState(att.dpZone, '上傳中：' + ((pStart / att.blbBase64.length * 100).toFixed(2)) + "%");
					//1110908	Leslie	因考試院環境使用非同步叫用必然發生異常，改為同步執行
					//1111208	Leslie[1111198]	可依設定決定啟用同步/非同步上傳
					if ($("#h_AsyncUpload").val() == "Y") {
						IF1.IFT401.upLoadFont(att.name, att.type, (uploadPart), true, bUPEnd, function (rtn) {
							if (rtn.value) {
								if (bUPEnd) {
									refreshState(att.dpZone, '完成');
									i++;
								}
								doStart();
							}
							else if (rtn.error != undefined && 'Type' in rtn.error && 'Message' in rtn.error) {
								alert("上傳時發生例外：Type「" + rtn.error.Type + "」，Message「" + rtn.error.Message + "」");
							}
							else
								console.log(rtn);
						})
					} else {
						setTimeout(function () {
							var rtn = IF1.IFT401.upLoadFont(att.name, att.type, (uploadPart), true, bUPEnd);
							if (rtn.value) {
								if (bUPEnd) {
									refreshState(att.dpZone, '完成');
									i++;
								}
								doStart();
							}
							else if (rtn.error != undefined && 'Type' in rtn.error && 'Message' in rtn.error) {
								alert("上傳時發生例外：Type「" + rtn.error.Type + "」，Message「" + rtn.error.Message + "」");
							}
							else {
								console.log(rtn);
							}
						}, 1);
					}
	            }
	            else {
	                refreshState(att.dpZone, '上傳中');

					//1110908	Leslie	因考試院環境使用非同步叫用必然發生異常，改為同步執行
					//1111208	Leslie[1111198]	可依設定決定啟用同步/非同步上傳
					if ($("#h_AsyncUpload").val() == "Y") {
						IF1.IFT401.upLoadFont(att.name, att.type, (att.blbBase64), false, true, function (rtn) {
							if (rtn.value) {
								refreshState(att.dpZone, '完成');
								i++;
								doStart();
							}
							else if (rtn.error != undefined && 'Type' in rtn.error && 'Message' in rtn.error) {
								alert("上傳時發生例外：Type「" + rtn.error.Type + "」，Message「" + rtn.error.Message + "」");
							}
						})
					} else {
						setTimeout(function () {
							var rtn = IF1.IFT401.upLoadFont(att.name, att.type, (att.blbBase64), false, true);
							if (rtn.value) {
								refreshState(att.dpZone, '完成');
								i++;
								doStart();
							} else if (rtn.error != undefined && 'Type' in rtn.error && 'Message' in rtn.error) {
								alert("上傳時發生例外：Type「" + rtn.error.Type + "」，Message「" + rtn.error.Message + "」");
							}
						}, 1);
					}
	            }
	        }
	        else {
	            $('#txFontInfo').val(arAttInfo.join('|'));
	            if (callback)
	                callback();
	        }
	    }
	    doStart();
	}
	else {
	    alert('至少需選取一個字型檔。')
	    document.body.style.cursor = "";
	    window.status = "";
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//
// initialize
var clickDP;
function Init() {

	$("#upFile")[0].addEventListener("change", FileSelectHandler, false)
	
	$(".dpM").each(function () {
		this.addEventListener("dragover", FileDragHover, false);
		this.addEventListener("dragleave", FileDragHover, false);
		this.addEventListener("drop", FileSelectHandler, false);
		
	})//.dpZone
	$('.dpZoneCon').each(function () {
		this.addEventListener("click", function (e) {
			if(IsServerHandling)
				return false;
			e.preventDefault();
			clickDP = this;
			$('#upFile').trigger('click');
			return false;
		}, false);
	})

	//1111208	Leslie[1111198]	啟用合併字型時，不顯示完整的字型區塊
	if ($("#h_MakeKaiFont").val() == "Y")
		$('[data-font="Full"]').closest('.dpArea').hide();
}


// file drag hover
function FileDragHover(e) {
	if(IsServerHandling)
		return false;
	e.stopPropagation();
	e.preventDefault();
	if (e.type == "dragover")
		$(e.target).closest('.dpZone').addClass('dpDragHover');
	else
		$(e.target).closest('.dpZone').removeClass('dpDragHover');
}

// file selection
function FileSelectHandler(e) {
	if(IsServerHandling)
		return false;

	// cancel event and hover styling
	FileDragHover(e);

	// fetch FileList object
	var files = e.target.files || e.dataTransfer.files;
	var $dpZone = $(e.target).closest('.dpZone').addClass('dpHasFile');
	if (e.target.id == 'upFile') {
	    $dpZone = $(clickDP).find('.dpZone').addClass('dpHasFile');
	}
	//1111208	Leslie	配合增加TTE檢核
	var fontName = files[0].name.toUpperCase();
	//if (files[0].name.toUpperCase().indexOf('.TTF') < 0) {
	if (fontName.indexOf('.TTF') < 0 && fontName.indexOf('.TTE') < 0) {
	    //alert('選取之檔案格式非合法字型檔(TTF)');
	    alert('選取之檔案格式非合法字型檔(TTF、TTE)');
	    $dpZone.removeClass('dpHasFile')
	    return;
	}
	$('#btSave').prop('disabled', true)
	fnSliceArrayBuffer(files[0], $dpZone, function (fileInfo) {
		console.log(fileInfo);
		
		//$dpZone.find('.dpInfo').text(fileInfo.name);
		$dpZone.data(uDatafli, fileInfo)
	})
}

function fnSliceArrayBuffer(argFile,argCurrObj, ballBack) {
	var file = argFile;
	var maxLength = file.size;
	var currLength = 0;
	var buffer = 4*1024*1024;   //4MB 為一個單位
	var tmpUnit8Array = new Uint8Array(maxLength);

	function sliceRead() {
		let nextRng = ((currLength + buffer) > maxLength) ? maxLength : currLength + buffer;
		var blob = file.slice(currLength, nextRng);
		blobToArrayBuffer(blob, function (resultBuffer) {
			tmpUnit8Array.set(new Uint8Array(resultBuffer), currLength);
			currLength += resultBuffer.byteLength;
			argCurrObj.find('.dpInfo').text("讀取進度：" + ((currLength / maxLength) * 100).toFixed(2) + "%");
			if (currLength < maxLength) //還沒完，繼續切
				sliceRead();
			else {
				var blb = new Blob([tmpUnit8Array.buffer], { type: argFile.type });	// 第1個參數要[]啊
				argCurrObj.find('.dpInfo').text("載入處理中");
				setTimeout(function () {
				    var blbNm = Base64.encode(tmpUnit8Array)//URL.createObjectURL(blb);				  
				    argCurrObj.data(uDatafli).blbBase64 = blbNm;
				    argCurrObj.find('.dpInfo').text(argFile.name);
				    $('#btSave').prop('disabled', false)
				}, 1)
				ballBack({
					blob: blb,
					name: argFile.name,
					type: argFile.type,
					size: argFile.size,
				});
			}
		})
	}
	sliceRead();
}

function blobToArrayBuffer(blob, cb) {
	var reader = new FileReader();
	reader.onloadend = function (evt) {
		if (evt.target.readyState == FileReader.DONE)
			cb(evt.target.result);
	};
	reader.readAsArrayBuffer(blob);
};