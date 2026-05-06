/*
DATE	SA		PRG		MGR_NO		DESC
1110520 Leslie	Leslie	1110371		純檔管升級二代，新增本作業
1110629 Leslie  Zen     交通部序16  修正對尚未轉入檔管系統之公文做線上瀏覽時錯誤訊息不明確之問題
*/

function viewDoc(strDocNo,strSignType) {
    try {
        if (service == undefined)
            service = new Server();
        var wsUrl = encodeURI($('#h_fileiows').text());
        var artifact = encodeURI($('#h_artifact').text());
        var orgNo = encodeURI($('#h_orgno').text());
        var param = [];
        param[0]=encodeURI(artifact);
        param[1]=encodeURI(strDocNo);
        param[2]=encodeURI(orgNo);
       
        var rtnObj = jf_CallW(wsUrl, 'GetDocInfo', false, param);
        //1110629 Zen 交通部序16 修正對尚未轉入檔管系統之公文做線上瀏覽時錯誤訊息不明確之問題
        if (rtnObj.value.RtnStr == '')
        {
            alert('此份公文尚未送歸檔，請於公文系統送歸檔後，再進行查詢及線上瀏覽公文。');
            return;
        }


        var params = new SOAPClientParameters();
        params.add('argArtifact', artifact);
        params.add('argDocNo', encodeURI(strDocNo));
        params.add('argOrgNo', orgNo);

        var rtnObj = SOAPClient.invokeJSON(rtnObj.value.RtnStr, "GetOnLineApplyDocUnvByJSON", params, false, null);
        if (!rtnObj.error) {
            if (rtnObj.value.m_bSuccess) {
                var sUnvObj = rtnObj.value.RtnStr;
                if (sUnvObj !== "") {
                    var UnvObj = JSON.parse(sUnvObj);
                    var OpenType = strSignType == "E" ? "AOL" : "UniView";
                    let _unvDoc = UnvObj.UnvRoot.Doc;
                    let _firstAtt = null;

                    if (typeof _unvDoc == 'object' && _unvDoc != null) {
                        if ($.isArray(_unvDoc.Att)) {
                            _firstAtt = _unvDoc.Att[0];
                        }
                        else {
                            _firstAtt = _unvDoc.Att;
                        }
                    }

                    if (_firstAtt.Type != '7')
                        OpenType = 'UniView';
					
					let _HistoryDoc = false;
					
					if (_unvDoc.Att.length) {
						// 1. 取出所有ATT.Type='8'項目(歷史公文DI), 將其置換為一個AOL項目.
						// 2. 其它項目
						let mainAttArr=[], historyAttArr=[], extraPDocAtt=null;
						if (SSOUtil.typeOf(_unvDoc.Att)=='array' && _unvDoc.Att.length>1) {
							let i=0;
							for(i=0; i<_unvDoc.Att.length; i++) {
								let _att = _unvDoc.Att[i];
								if (_att.Type==='8') {
									historyAttArr.push(_att);
								}
								else {
									mainAttArr.push(_att);
								}
							}
						}

						if (historyAttArr.length) {
							if (mainAttArr.length>=1) {
								extraPDocAtt = {
									Type: '99', // 歷史公文一律給'99', 另以RD-ViewDoc.html內嵌AOL開啟
									Alias: '"來文及文稿檔', 
									PrintEnable: 'TRUE',
									File:{
										Pages: '1', 
										FileName: _unvDoc.DocNo + '-X.XML',
										FilePath: historyAttArr[0].File.FilePath,
										WSDL: historyAttArr[0].File.WSDL
										},
									Group:{GrpName:'來文附件檔-1', StartPO: '0'}
								};
								_openModul = 'UniView';  // 使用UniView模組開啟公文
							}
							else { // 只有一個ATT, Type='8'
								extraPDocAtt = {
									Type: '0', // 單一歷史公文DI, 給'0', 以紙本簽核公文方式開啟
									Alias: '"來文及文稿檔', 
									PrintEnable: 'TRUE',
									File:{
										Pages: '1', 
										FileName: _unvDoc.DocNo + '-X.XML',
										FilePath: historyAttArr[0].FilePath,
										WSDL: historyAttArr[0].WSDL
										},
									Group:{GrpName:'來文附件檔-1', StartPO: '0'}
								};
								_HistoryDoc = true; // for 歷史公文
								_openModul = 'AOL'; // 使用AOL模組開啟公文
							}
							
							mainAttArr.push(extraPDocAtt);
							UnvObj.UnvRoot.Doc.Att = mainAttArr;
							signType = 'P'; // 將公文標記為紙本簽核公文
						}
						//1100827	Leslie[1100784]	因調整Template以支援叡揚舊系統線上簽核，增修配合處理線上簽核歷史公文的調閱行為
						else{
							if(mainAttArr.length && mainAttArr[0].Type!= '7')
								_openModul = 'UniView';
							else if(SSOUtil.typeOf(_unvDoc.Att)=='array' && _unvDoc.Att[0].Type!= '7')
								_openModul = 'UniView';
							//1100927	Leslie[1101164]	修正線上簽核含來文電子檔時，調閱異常的問題
							//else if(doc.Att.Type != '7')
							else if('Type' in _unvDoc.Att && _unvDoc.Att.Type != '7')
								_openModul = 'UniView';
						}
					}

                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "AKT881",
                        openDocModule: OpenType,
                        signType: strSignType,
                        readOnlyMode: true
                    };
                    var $docId = artifact + "_" + (+new Date());
                    localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                    var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + artifact + "&DocId=" + $docId;
                    //window.open(unvUrl, "AKT881ViewDoc");
                    window.open(unvUrl);
                }
            }
            else {
                alert(rtnObj.value.m_strErrMsg);
            }
        }
        else {
            alert(rtnObj.error.errorDetail.string)
        }
    } catch (e) {
        //alert('開啟失敗');
        alert('開啟失敗，異常：' + e);
    }
}

function jf_GetDocPdf(argDoc_no) {
    
    var param = new Array(3);
    param[0] = String(argDoc_no);
    param[1] = "AKI881";
    param[2] = "線上調檔";

    callObj = jf_CallWS("lib/AK_LIB.asmx", "GetDocPdf", false, param);

    if (callObj.error) {
        alert(callObj.errorDetail.string);
    }
    else {
        if (callObj.value.ErrorClass.IsErr == true)
            alert(callObj.value.ErrorClass.ErrMessage[0].text);
        else
        {
            var PDFWin = open(callObj.value.RtnStr, "PDFWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
            PDFWin.focus();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    $('a').on('click', function (event) {
        viewDoc($(this).text(), $(this).data('sign'));
        event.preventDefault();
    })
})
