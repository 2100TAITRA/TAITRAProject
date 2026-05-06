/* jshint -W100 */

/*
DATE	MGRNO		SA		PG		Desc
1060421 1060217		Eric 	Eric	UniView顯示橫式頁面影像不正確問題修正.
1080924 1080339     Kevin   Eric    jQuery 3.0 upgrade
1100630 1100780		Raymond	Raymond	一般機關的文字浮水印新增UserId、UserTitle、ClientIP欄位
1110331 1110164		Raymond	Raymond	弱掃修正, 原本宣告在RD-UVPrint.html的theUVPrint全域物件, 移至JS宣告
*/

window._debug = false;

// 2019.2.15 - Eric Peng, 公司測試環境啟用debug
if (window.location.host.indexOf('docvip.fdat.com.tw')!=-1) {
    window._debug = true;
}

// 1110331 Raymond 1110164 弱掃修正, 原本宣告在RD-UVPrint.html的theUVPrint全域物件, 移至JS宣告
window.theUVPrint = {};

(function($) {
    console.log('-I- RD-UVPrint.js started...');

    // 2021.12.20 - 1101330 Eric, 計算頁面影像顯示區域
    function _calcAspectRatioRect(rcWindow, imgWidth, imgHeight) {
        var rcAspectRatio = $.extend({}, rcWindow);
        var szWindow = { cx:Math.abs(rcWindow.right-rcWindow.left), cy:Math.abs(rcWindow.bottom-rcWindow.top)};

        var nShrink=0, nTargetWidth=0, nTargetHeight=0;
        var ratio = 1;
        if (imgWidth>szWindow.cx) {
            // 暫定寬度
            nTargetWidth = szWindow.cx; 

            // 縮放比
            ratio = (szWindow.cx / imgWidth);

            // 暫定高度
            nTargetHeight = imgHeight * ratio;

            if (nTargetHeight>szWindow.cy) {
                // 暫定高度超過->szWinodw.cy為最終高度
                ratio = (szWindow.cy / imgHeight);

                nTargetWidth = imgWidth * ratio;
                nTargetHeight = szWindow.cy;
            }
        }
        else if (imgHeight>szWindow.cy) {
            // 暫定高度
            nTargetHeight = szWindow.cy; 

            // 縮放比
            ratio = (szWindow.cy / imgHeight);

            // 暫定寬度
            nTargetWidth = imgWidth * ratio;

            if (nTargetWidth>szWindow.cx) {
                // 暫定寬度超過->szWinodw.cx為最終寬度
                ratio = (szWindow.cx / imgWidth);

                nTargetHeight = imgHeight * ratio;
                nTargetWidth = szWindow.cx;
            }
        }
        else {
            // imgWidth/imgHeight皆小於或等於szWindow
            nTargetHeight = imgHeight;
            nTargetWidth = imgWidth;
        }

        var left = rcWindow.left + ((szWindow.cx - nTargetWidth)/2);
        var top = rcWindow.top + ((szWindow.cy - nTargetHeight)/2);
        return {'left':left, 'top':top, 'right':(left+nTargetWidth), 'bottom':(top+nTargetHeight)};
    }
    
    var errIMGs = [];
    var loadedIMGs = [];
    if (typeof window.UVUitl=='undefined' || window.UVUtil===null) {
        window.UVUtil = {
            imgloadError: function(event, ui) {
                var src = this.src;
                var b64file = $(this).attr('data-file');
                errIMGs.push({'src':src, 'handle':b64file});
            },
            imgloaded: function(event, ui) {
                var src = this.src;
                var b64file = $(this).attr('data-file');
                loadedIMGs.push({'src':src, 'handle':b64file});
            },
            validateImages: function() {
                errIMGs = [];
                var $imgs = $('img');
                var i=0, _img=null, src='', handle='';
                for(i=0; i<$imgs.length; i++) {
                    _img = $imgs[i];
                    if (_img.width<=0 || _img.height<=0) {
                        src = $(_img).attr('src');
                        handle = $(_img).attr('data-file');
                        errIMGs.push({'src':src, 'handle':handle});
                    }
                }
            },
            getErrIMGs: function() {
                return errIMGs;
            },
            getLoadedIMGs: function() {
                return loadedIMGs;
            },
            setupPageImage: function(artifact, data, idxPage, cntPage, _pgGroup, opts, $pages, pm, _printJob) {
                var _dfd = $.Deferred();
                
                // 2016.12.20 - "pg"也要設w/h...
                var $pg = $('<div class="pg" style="width:' + (210 + (pm * 2)) + 'mm; height:' + (297 + (pm * 2) - 3) + 'mm"></div>').appendTo($pages);
                var $img, $imgTmp;
                if (opts.enableForceWaterMark) {
                    $imgTmp = $('<img class="WMImage"></img>');
                }
                
                // data: {grpIdx: idx, pgIdx:i, pgCount:n, fileName:data.Filename, imgtran:data.imgtran, res:dpi}
                var imgtran = true; //data.imgtran; 2017.1.15 - 目前UniView使用時機, 應該都要用imgtran
                var imgUrl = '';
                var nDPI = data.res;
                if (imgtran) {
                    // 用影像處理網頁服務解決解析度問題
                    var ODToolUrl = _pgGroup.odToolUrl; //SSO_CONFIG.ServerHost + "/odtools/imgtran.ashx";
                    
                    // 2016.1.22 Base64編碼後可能有+、=等Base64字元, 用URI encoding處理成%HEX的形式, 以避免Server無法解讀      
                    var b64Filename = Base64.encode(data.fileName);
                    var b64FilePath = Base64.encode(_pgGroup.filePath);
                    imgUrl = ODToolUrl + '?FileIOWS='+ _pgGroup.wsUrl + '&FilePath=' + encodeURIComponent(b64FilePath) +
                                     '&FileName=' + encodeURIComponent(b64Filename) + '&Pixel=' + data.res + 'dpi&Format=33&SAMLart=' + artifact;
                    
                    var nDPI = data.res;
                    if (isNaN(nDPI)) {
                        nDPI = 300;
                    }
                    $img = $('<img data-idxPage="' + idxPage + '" data-file="' + b64Filename + '" class="attachment" style="width:' + (210 + (pm * 2)) + 'mm; height:' + (297 + (pm * 2) - 3) + 'mm" />');
                }
                $img.appendTo($pg);
                
                var $pgInfo = $('<div class="att-po" style="display:' + (opts.printPageNo?'block':'none') + '">第 ' + (idxPage + 1) + ' 頁，共 ' + cntPage + ' 頁</div>');
                $pgInfo.appendTo($pg);
                
                if (opts.enableForceWaterMark) {
                    // 2019.9.16 - 1080339 Eric
                    // 2019.2.14 - 1080179 Eric, [from Kevin]弱點掃描項目修改(all $img.load => $img.bind('load', function() {...}), .error??)
                    $img.on('load', function(event) {
                        console.log('頁面影像#' + idxPage + '.on' + event.type + '(' + event.target.naturalWidth + ' x ' + event.target.naturalHeight + ')');
                    //     2016.12.28 - 因imgtrans未依指定DPI回應影像, 暫時取消此處指定size作業!
                    //    if("naturalWidth" in event.target && "naturalHeight" in event.target) {
                    //        var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為300dpi, 若有傳入dpi參數則以dpi為準
                    //            h = event.target.naturalHeight / (dpi || 300);
                    //        $img.css({width: w + "in", height: h + "in"});
                    //    }
                    //    
                    //     2016.12.28 - if wait for img readly, resolve here...

                        // 2021.12.20 - 1101330 Eric, 歷史公文頁面可能非A4尺寸
                        let portriat = (event.target.naturalWidth > event.target.naturalHeight)?false:true;
                        let w_page = portriat ? 210.0 : 297.0; // 使用A4
                        let h_page = portriat ? 297.0 : 210.0;
                        let rc_img_mm = _calcAspectRatioRect({left:0, top:0, right:w_page, bottom:h_page}, event.target.naturalWidth, event.target.naturalHeight);

                        let w_page_px = portriat ? $pg.width() : $pg.height();
                        let h_page_px = portriat ? $pg.height() : $pg.width();
                        let rc_image_px = _calcAspectRatioRect({left:0, top:0, right:w_page_px, bottom:h_page_px}, event.target.naturalWidth, event.target.naturalHeight);

                        let l_img = 0, t_img = 0, h_img=100.0, w_img = 100.0;
                        let shrinkX = false, shrinkY = false;
                        if (((rc_img_mm.left*100.0)/w_page) > 3.0) {
                            // 影像比頁面窄
                            l_img = rc_img_mm.left;
                            w_img = rc_img_mm.right - rc_img_mm.left;
                            shrinkX = true;
                        }
                        else if (((rc_img_mm.top*100.0)/h_page) > 3.0) {
                            // 影像比頁面低
                            t_img = rc_img_mm.top;
                            h_img = rc_img_mm.bottom - rc_img_mm.top;
                            shrinkY = true;

                            console.log('-I- shrinkY=true, rc_image_px={l:' + rc_image_px.left + ' r:' + rc_image_px.right + ', t=' +  rc_image_px.top + ', b=' + rc_image_px.bottom + '}');
                        }
                    
                        // 2017.4.20
                        if (event.target.naturalWidth > event.target.naturalHeight) {
                            // 2021.12.20 - 1101330 Eric, 歷史公文頁面可能非A4尺寸
                            if (shrinkY) {
                                $pg.css({'background-color':'#EEE'});
                                //$img.css({height: (rc_img_mm.bottom-rc_img_mm.top).toString() + 'mm', width: '297mm', 'user-select': 'none', 'transform-origin': 'left top 0px', 'transform': 'rotate(270deg) scale(1) translate(-' + rc_image_px.right.toString() + 'px,' + rc_image_px.top.toString() + 'px)'});
                                $img.css({height: (rc_img_mm.bottom-rc_img_mm.top).toFixed(2).toString() + 'mm', width: '297mm', 'user-select': 'none', 
                                         'transform-origin': 'left top 0px', 'transform': 'rotate(90deg) scale(1) translate(0px, -' + rc_image_px.bottom.toString() + 'px)'});
                            }
                            else {
                                //$img.css({width: '297mm', height: '210mm', 'user-select': 'none', 'transform-origin': 'left top 0px', 'transform': 'rotate(270deg) scale(1) translate(-' + rc_image_px.right + 'px, 0px)'});
                                $img.css({width: '297mm', height: '210mm', 'user-select': 'none', 'transform-origin': 'left top 0px', 
                                         'transform': 'rotate(90deg) scale(1) translate(0px, -' + rc_image_px.bottom.toString() + 'px)'});
                            }
                        }
                        else {
                            // 2021.12.20 - 1101330 Eric, 歷史公文頁面可能非A4尺寸
                            if (shrinkX) {
                                $pg.css({'background-color':'#EEE'});
                                $img.css({position: 'absolute', left: l_img.toFixed(2).toString() + 'mm', 
                                          width: w_img.toFixed(2).toString() + 'mm', height: '297mm', 'user-select': 'none'});
                            }
                        }
                    
                        _dfd.resolve({success:true});

                        delete $imgTmp[0];
                    });
                    
                    // 2019.9.16 - 1080339 Eric
                    $img.on('error', function(event){
                        console.log('頁面影像#' + idxPage + '.on' + event.type);
                        _dfd.reject('取得影像時發生錯誤!');
                    });

                    // 2019.9.16 - 1080339 Eric
                    // 2019.2.14 - 1080179 Eric, [from Kevin]弱點掃描項目修改
                    $imgTmp.on('load', function(event) {
                        // 2020.9.11 - 1090529 Eric, 支援信保基金浮水印格式及內容.
                        let _userInfo = null;
                        if (_printJob.userInfo.OrgNickName=='SMEG') {
                            /*OUName: that.UNVObj.OU_NAME,
                              UserId: that.UNVObj.USER_ID,
                              UserTitle: that.UNVObj.USER_TITLE, 
                              ClientIP: that.UNVObj.CLIENT_IP */
                            _userInfo = { OrgNickName: _printJob.userInfo.OrgNickName, OUName:_printJob.userInfo.OUName, UserId:_printJob.userInfo.UserId, 
                                  UserTitle:(_printJob.userInfo.UserTitle||''), ClientIP:(_printJob.userInfo.ClientIP||'')};
                        }
                        else {
							// 1100630 Raymond 1100780 一般機關的文字浮水印新增UserId、UserTitle、ClientIP欄位
                            //_userInfo = { OrgNickName: _printJob.userInfo.OrgNickName, OUName:_printJob.userInfo.OUName, UserName:_printJob.userInfo.UserName};
                            _userInfo = { OrgNickName: _printJob.userInfo.OrgNickName, OUName:_printJob.userInfo.OUName, UserName:_printJob.userInfo.UserName,
								UserId:_printJob.userInfo.UserId, UserTitle:(_printJob.userInfo.UserTitle||''), ClientIP:(_printJob.userInfo.ClientIP||'')};
                        }

                        $imgTmp.watermark({position:'middle-center', className:'WMImage', 
                                            userInfo: _userInfo,
                                            path:_printJob.fwmPath, settings: _printJob.fwmSettings, 'dpi': nDPI, 
                                            'theApp': theUVPrint,
                                            'forceWaterMark' : true,
                                            callback: function(rslt) {
                                                if (rslt.success && typeof rslt.imgStr=='string' && rslt.imgStr.length) {
                                                    $img[0].src = rslt.imgStr; //rslt.img.css({'width':'100%'});
                                                }
                                            }

                        });
                    });

                    // 2019.9.16 - 1080339 Eric
                    $imgTmp.on('error', function(event){
                        console.log('頁面影像#' + idxPage + '.on' + event.type);
                        _dfd.reject('取得影像時發生錯誤!');
                    });
                                    
                    $imgTmp.attr("src", imgUrl);
                }
                else {
                    // 2019.9.16 - 1080339 Eric
                    // 2019.2.14 - 1080179 Eric, [from Kevin]弱點掃描項目修改
                    $img.on('load', function(event) {
                        console.log('頁面影像#' + idxPage + '.on' + event.type + '(' + event.target.naturalWidth + ' x ' + event.target.naturalHeight + ')');
                    //     2016.12.28 - 因imgtrans未依指定DPI回應影像, 暫時取消此處指定size作業!
                    //    if("naturalWidth" in event.target && "naturalHeight" in event.target) {
                    //        var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為300dpi, 若有傳入dpi參數則以dpi為準
                    //            h = event.target.naturalHeight / (dpi || 300);
                    //        $img.css({width: w + "in", height: h + "in"});
                    //    }
                    //    
                    //     2016.12.28 - if wait for img readly, resolve here...
                    
                        // 2021.12.20 - 1101330 Eric, 歷史公文頁面可能非A4尺寸
                        let portriat = (event.target.naturalWidth > event.target.naturalHeight)?false:true;
                        let w_page = portriat ? 210.0 : 297.0; // 使用A4
                        let h_page = portriat ? 297.0 : 210.0;
                        let rc_img_mm = _calcAspectRatioRect({left:0, top:0, right:w_page, bottom:h_page}, event.target.naturalWidth, event.target.naturalHeight);

                        let w_page_px = portriat ? $pg.width() : $pg.height();
                        let h_page_px = portriat ? $pg.height() : $pg.width();
                        let rc_image_px = _calcAspectRatioRect({left:0, top:0, right:w_page_px, bottom:h_page_px}, event.target.naturalWidth, event.target.naturalHeight);

                        let l_img = 0, t_img = 0, h_img=100.0, w_img = 100.0;
                        let shrinkX = false, shrinkY = false;
                        if (((rc_img_mm.left*100.0)/w_page) > 3.0) {
                            // 影像比頁面窄
                            l_img = rc_img_mm.left;
                            w_img = rc_img_mm.right - rc_img_mm.left;
                            shrinkX = true;
                        }
                        else if (((rc_img_mm.top*100.0)/h_page) > 3.0) {
                            // 影像比頁面低
                            t_img = rc_img_mm.top;
                            h_img = rc_img_mm.bottom - rc_img_mm.top;
                            shrinkY = true;

                            console.log('-I- shrinkY=true, rc_image_px={l:' + rc_image_px.left + ' r:' + rc_image_px.right + ', t=' +  rc_image_px.top + ', b=' + rc_image_px + '}');
                        }

                        // 2017.4.20
                        if (event.target.naturalWidth > event.target.naturalHeight) {
                            // 2021.12.20 - 1101330 Eric, 歷史公文頁面可能非A4尺寸
                            //$img.css({width: '294mm', height: '210mm', 'user-select': 'none', 'transform-origin': 'left top 0px', 'transform': 'rotate(270deg) scale(1) translate(-1123px,0px)'});
                        
                            if (shrinkY) {
                                $pg.css({'background-color':'#EEE'});
                                //$img.css({height: (rc_img_mm.bottom-rc_img_mm.top).toString() + 'mm', width: '297mm', 'user-select': 'none', 
                                //         'transform-origin': 'left top 0px', 'transform': 'rotate(270deg) scale(1) translate(-' + rc_image_px.right.toString() + 'px,' + rc_image_px.top.toString() + 'px)'});
                                $img.css({height: (rc_img_mm.bottom-rc_img_mm.top).toFixed(2).toString() + 'mm', width: '297mm', 'user-select': 'none', 
                                         'transform-origin': 'left top 0px', 'transform': 'rotate(90deg) scale(1) translate(0px, -' + rc_image_px.bottom.toString() + 'px)'});
                            }
                            else {
                                //$img.css({width: '297mm', height: '210mm', 'user-select': 'none', 'transform-origin': 'left top 0px', 'transform': 'rotate(270deg) scale(1) translate(-' + rc_image_px.right + 'px, 0px)'});
                                $img.css({width: '297mm', height: '210mm', 'user-select': 'none', 'transform-origin': 'left top 0px', 
                                         'transform': 'rotate(90deg) scale(1) translate(0px, -' + rc_image_px.bottom.toString() + 'px)'}); // 2022.3.11 - Eric, fix typo [rz_image_px -> rc_image_px]
                            }
                        }
                        else {
                            // 2021.12.20 - 1101330 Eric, 歷史公文頁面可能非A4尺寸
                            if (shrinkX) {
                                $pg.css({'background-color':'#EEE'});
                                $img.css({position: 'absolute', left: l_img.toFixed(2).toString() + 'mm', 
                                          width: w_img.toFixed(2).toString() + 'mm', height: '297mm', 'user-select': 'none'});
                            }
                        }
                    
                        _dfd.resolve({success:true});
                    });
                    
                    // 2019.9.16 - 1080339 Eric
                    $img.on('error', function(event){
                        console.log('頁面影像#' + idxPage + '.on' + event.type);
                        _dfd.reject('取得影像時發生錯誤!');
                    });
                    
                    $img.attr("src", imgUrl);
                }
                
                // 2016.12.28 - if not wait for img ready, resolve here...
                //_dfd.resolve({success:true});
                return _dfd.promise();
            }
        };
    }
})(jQuery);

// 2019.10.21 - 1080339 Eric, jQuery 3.0 upgrade
//$(document).on('ready', function() {
$(function($) {
    console.log('document.ready @RD-UVPrint.js...');
    
    /* 2017.1.15 - 取得頁面群組資訊 => 記錄FilePath, WSUrl, ODToolUrl */
    function _getPrintPageGroup(prtGroups, grpIdx) {
        var i=0, group;
        for(i=0; i<prtGroups.length; i++) {
            group = prtGroups[i];
            if (!!group && group.grpIdx==grpIdx) {
                return group;
            }
        }
        return null;
    }
        
    function _processPageImage(printJob, idx, $pages) {
        var _dfd = $.Deferred();
        console.log('-I- gonna process page#' + idx);
        
        /*printJob = { 'pm': pm, 'opts': opts, 'prtPages': prtPages, 'prtGroups': prtGroup, SAMLart: artifact };*/
        var pg = printJob.prtPages[idx]; // pg: {grpIdx: idx, pgIdx:i, pgCount:n, fileName:data.Filename, imgtran:data.imgtran, res:dpi}
        var _pgGroup = _getPrintPageGroup(printJob.prtGroups, pg.grpIdx);
        if (_pgGroup===null) {
             _dfd.reject({success:false, errMsg:'找不到idx=' + pg.grpIdx + ' 的群組資訊'});
             return _dfd.promise();
        }
        
        UVUtil.setupPageImage(printJob.SAMLart, pg, pg.pgIdx, pg.pgCount, _pgGroup, printJob.opts, $pages, printJob.pm, printJob)
        .done(function(){
            console.log('-I- page#' + idx + ' DONE!');
            var cntPage = printJob.prtPages.length;
            if (idx<(cntPage-1)) {
                _processPageImage(printJob, idx+1, $pages)
                .done(function(){
                    _dfd.resolve({success:true});
                })
                .fail(function(rslt){
                    _dfd.reject(rslt);
                });
            }
            else {
                _dfd.resolve({success:true});
            }
        })
        .fail(function(rslt) {
            _dfd.reject(rslt);
        });
        return _dfd.promise();
    }
    
    var jobId = SSOUtil.getURLParameter('JobId');
    var sPrintJob = localStorage[jobId];
    if (typeof sPrintJob=='string' && sPrintJob.length) {
        var printJob = JSON.parse(sPrintJob);
        if (typeof printJob!=='undefined') {
            var $pages = $.find('div.pages');
            
            /*_printJob = { 'pm': pm, 'opts': opts, 'prtPages': prtPages, 'prtGroups': prtGroups, SAMLart: artifact }; */
            var cntPage = printJob.prtPages.length;
            if ($pages.length && cntPage>0) {
                _processPageImage(printJob, 0, $pages)
                .done(function() {
                    if (typeof _debug!=='boolean' || _debug===false) {
                        //alert('gonna clear localStorage.' + jobId);
                        localStorage[jobId] = '';
                    }
                    $('div.holdon_mask').hide();
                })
                .fail(function() {
                    if (typeof _debug!=='boolean' || _debug===false) {
                        //alert('gonna clear localStorage.' + jobId);
                        localStorage[jobId] = '';
                    }
                    alert('載入頁面影像失敗!');
                });
            }
        }
    }
    
    var h = $(window).height();
    $('div.holdon_mask').css({height:h+'px'});
    
    // 2019.2.14 - 1080179 Eric, [from Kevin]弱點掃描項目修改
    $('div.pg > img').on('load', function(event, ui){
        UVUtil.imgloaded(event, ui);
    });
    $('div.pg > img').on('error', function(event, ui){
        UVUtil.imgloadError(event, ui);
    });
    
    $(document).on('click', '#validateImages', function() {
        validateImages();
    });

    theLogger = console; // 2021.12.27 - Eric, bug-fix
});