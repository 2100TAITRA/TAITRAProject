(function($) {
    $.fn.docSlider = function($target, options) {
        var $_sliders = null;
        var _slider_current_index = -1;
        var _slider_previous_index = -1;
        var _slider_count = 0;
        var _slider_width = _settings._slider_width; // 公文預覽頁面寬度
        var _slider_duration = _settings._slide_duration;
            
        var _defaults = {
            //default settings here....
            _slider_width : 450,
            _slide_duration : 500,
        };
        
        var _settings = $.extend(_defaults, options);
        
        var that = this;
        
        // there's no need to do $(this) because
        // "this" is already a jquery object
        return this.each(function() {
            function _initSlider($container) {
                var $sliders = $container.find('div.flip_content');
                $_sliders = $sliders;
                
                //if (!!width && (width>0)) {
                //    _slider_width = width;
                //}
                    
                var cnt = $sliders.length;
                _slider_count = cnt;
                
                var other_pos = -(_slider_width*2);
                
                for(var i=0; i<cnt; i++) {
                    var zIndex = 0;
                    var left = 0;
                    var $slider = $($sliders[i]);
                    if (i==0) {
                        zIndex = cnt+2;
                        left = 0;
                        $slider.css({"left":""+left+"px", "z-index":zIndex});
                        $slider.css({"z-index":zIndex});
                    }
                    else if (i==1) {
                        zIndex = cnt+1;
                        left = _slider_width;
                        $slider.css({"left": "" + left + "px", "z-index":zIndex});
                    }
                    else {
                        zIndex = i-1;
                        left = other_pos;
                        $slider.css({"left": "" + left + "px", "z-index":zIndex});
                    }
                }
                
                _slider_current_index = 0;
                
                theLogger.log("Slider initialize, slider count=" + _slider_count + ", currentIndex=" + _slider_current_index);
            }
            
            function doSlide(next) {
                if (next<0 || next>=_slider_count || next==_slider_current_index) {
                    return;
                }
                
                var $in = $($_sliders[next]);
                var $out = $($_sliders[_slider_current_index]);
                
                var zIndex = 0;
                
                var in_left_before = 0;
                var out_left_after = 0;
                
                var dir = "slide_left_out";
                var other_pos = -(_slider_width*2);
                
                // if 回上頁 -> 不異動內部頁面物件, 直接transition
                // 調整好內部頁面物件,將次頁置於目前顯示頁面的左(或右)側, 再執行transition
                if (next != _slider_previous_index) {
                    if (next > _slider_current_index) {
                       // 下一頁在右, 將指定之次頁置於右方後, 再往左邊slide.
                       in_left_before = _slider_width;
                       out_left_after = -_slider_width;
                    }
                    else {
                        // 下一頁在左, 將指定之次頁置於右方後, 再往右邊slide.
                        in_left_before = - _slider_width;
                        out_left_after = _slider_width;
                        dir = "slide_right_out";
                    }
                    
                    $in.css({"left":"" + in_left_before + "px", "z-index":_slider_count+2});
                }
                else {
                    if (next > _slider_current_index) {
                       // 下一頁在右, 將指定之次頁置於右方後, 再往左邊slide.
                       in_left_before = _slider_width;
                       out_left_after = -_slider_width;
                    }
                    else {
                        // 下一頁在左, 將指定之次頁置於右方後, 再往右邊slide.
                        in_left_before = - _slider_width;
                        out_left_after = _slider_width;
                        dir = "slide_right_out";
                    }
                }
                
                // 改變index,讓次頁在最上面!
                $in.css({"opacity":0, "z-index":_slider_count+2});
                $out.css({"z-index":_slider_count+1});
                
                //$in.addClass(".slider_target");
                //$out.addClass(".slider_target");
                
                theLogger.debug('$in left, before:' + $in.css('left') + ', after: 0px');
                
                $in.animate({"left":"0px", "opacity":1}, _slider_duration,
                //$in.animate({"left":"225px", "opacity":1}, _slider_duration,  // 2012.12.3-切換到一半的效果
                            function() {
                                // callback here...
                            });
                
                theLogger.debug('$out left, before:' + $out.css('left') + ', after:' + out_left_after);
                
                $out.animate({"left":"" + out_left_after + "px", "opacity":0}, _slider_duration,
                //$out.animate({"left":"-225px", "opacity":1}, _slider_duration, // 2012.12.3-切換到一半的效果
                            function() {
                                // callback here...
                            });
                
                _slider_previous_index = _slider_current_index;
                _slider_current_index = next;
                
                //$in.css({"left":"0px"});
                //$out.css({"left":"" + out_left_after + "px"});
                
                var index = 1;
                for(var i=0;i<_slider_count; i++) {
                    if (i!=_slider_previous_index && i!=_slider_current_index) {
                        zIndex = index++;
                        var $slide = $($_sliders[i]);
                        $slide.css({'left': other_pos.toString() + "px", "z-index":zIndex})
                    }
                }
            }
            
            function navButtonClicked(event) {
                $btn = $(event.currentTarget);
                
                var next = -1;
                if ($btn.hasClass("folio_btn_next")) {
                    // next
                    if (_slider_current_index<(_slider_count-1)) {
                        next = _slider_current_index + 1;
                    }
                    else {
                        return;
                    }
                    
                }
                else if ($btn.hasClass("folio_btn_prev")) {
                    // previous
                    if (_slider_current_index>0) {
                        next = _slider_current_index - 1;
                    }
                    else {
                        return;
                    }
                }
                else {
                    // 指定頁面
                    var sIndex = $btn[0].innerText;
                    next = parseInt(sIndex);
                    if (next<=0 || next>_slider_count) {
                        theLogger.warn('-W- next index:' + next + ' 超出頁面數[' + _slider_count + '] !');
                        return;
                    }
                    next -= 1; // 0-based!
                }
                
                doSlide(next);
            }
            
            that.doSlide = doSlide;
            that.navButtonClicked = navButtonClicked;
            _initSlider($(this));
        });
    };
})(jQuery);