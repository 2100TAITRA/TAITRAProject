/*
DATE	SA		PRG		MGR_NO		DESC
1060612 Kevin   Zen     1060456     弱掃XSS修正
1060727 Leslie  Cloud   1060645 	(航港)99年封裝檔格式以前公文，線上瀏覽時，改為提供副版影像。
1060831 Kevin	Zen     1060742 	弱掃XSS修正
1080904	Cloud	Cloud	1080699		配合舊系統公文轉入時，線簽公文影像需改用紙本型式調閱，增加以UNV內容決定調閱型式
1100107 Cloud	Cloud	----		修正驗證不通過時跳出系統錯誤的問題
*/

function ClientOnLoad()
{

    if (document.all.ShowUnvView)
    {
        if (document.all.ShowUnvView.value == "One")
        {
            try
            {
                //var wsUrl = opener.theWebServices.url('fileiows');
                //1060831 Zen 1060742 弱掃SQL injection修正
                //var wsUrl = document.all.fileiows.value;
                var wsUrl = encodeURI(document.all.fileiows.value);
                var param = [];
                //1060612 Zen 1060456 弱掃XSS修正--begin
                //param[0] = document.all.artifact.value;
                //param[1] = document.all.DocNo.value;
                //param[2] = document.all.Orgno.value;
                param[0] = encodeURI(document.all.artifact.value);
                param[1] = encodeURI(document.all.DocNo.value);
                param[2] = encodeURI(document.all.Orgno.value);
                //1060612 Zen 1060456 弱掃XSS修正--end
				//1080904	Cloud	1080699配合舊系統公文轉入時，線簽公文影像需改用紙本型式調閱，增加以UNV內容決定調閱型式
                //var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
				var rtnObj = jf_CallW(wsUrl, 'GetDocInfo', false, param);
				var params = new SOAPClientParameters();
				params.add('argArtifact', encodeURI(document.all.artifact.value));
				params.add('argDocNo', encodeURI(document.all.DocNo.value));
				params.add('argOrgNo', encodeURI(document.all.Orgno.value));
				
				//var rtnObj = SOAPClient.invokeJSON(rtnObj.value.RtnStr, "GetDocUnvDataByJSON", params ,false, null);
				var rtnObj = SOAPClient.invokeJSON(rtnObj.value.RtnStr, "GetOnLineApplyDocUnvByJSON", params ,false, null);
                if (!rtnObj.error)
                {
                    if (rtnObj.value.m_bSuccess)
                    {
                        var sUnvObj = rtnObj.value.RtnStr;
                        if (sUnvObj !== "")
                        {
                            var UnvObj = JSON.parse(sUnvObj);
							//1080904	Cloud	1080699配合舊系統公文轉入時，線簽公文影像需改用紙本型式調閱，增加以UNV內容決定調閱型式-S
							var OpenType = document.all.SignType.value == "E" ? "AOL" : "UniView";
							let _unvDoc = UnvObj.UnvRoot.Doc;
							let _firstAtt = null;
							
							if (typeof _unvDoc=='object' && _unvDoc!=null) {
								if ($.isArray(_unvDoc.Att)) {
									_firstAtt = _unvDoc.Att[0];
								}
								else {
									_firstAtt = _unvDoc.Att;
								}
							}
							
							if(_firstAtt.Type != '7')
								OpenType = 'UniView';
							
							//1080904	Cloud 1080699配合舊系統公文轉入時，線簽公文影像需改用紙本型式調閱，增加以UNV內容決定調閱型式-E
                            var objViewDoc = {
                                UNVObj: UnvObj,
                                docInfoPage: "AKT881",
								//1080904	Cloud	1080699配合舊系統公文轉入時，線簽公文影像需改用紙本型式調閱，增加以UNV內容決定調閱型式
                                //openDocModule: ,
								openDocModule: OpenType,
                                signType: document.all.SignType.value,
                                readOnlyMode: true
                            };
                            var $docId = jf_GetSessionID() + "_" + (+new Date());
                            localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                            var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
                            jf_OpenChildWin(unvUrl, "AKT881ViewDoc");
                        }
                    }
                    else
                    {
                        alert(rtnObj.value.m_strErrMsg);
                    }
                }
                else
                {
                    alert(rtnObj.error.errorDetail.string)
                }
            } catch (e)
            {
                //alert('開啟失敗');
				alert('開啟失敗，異常：'+e);
            }
        }
        else if (document.all.ShowUnvView.value == "Mult")
        {
            alert('暫不支援同時顯示多筆，請點擊文號進行單筆調閱。');
        }
    }
        //1060727 Cloud   1060645 (航港)99年封裝檔格式以前公文，線上瀏覽時，改為提供副版影像。
    else
    {
    	//1100107 Cloud	----		修正驗證不通過時跳出系統錯誤的問題
    	if (document.all.DocNo)
			jf_GetDocPdf(document.all.DocNo.value);
    }


}
//1060727 Cloud   1060645 (航港)99年封裝檔格式以前公文，線上瀏覽時，改為提供副版影像。-s
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
//1060727 Cloud   1060645 (航港)99年封裝檔格式以前公文，線上瀏覽時，改為提供副版影像。-e

