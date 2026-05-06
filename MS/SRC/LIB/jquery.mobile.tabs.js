/*
* jQuery Mobile Framework : "tabs" plugin
*/

// 1080923  1080339     Kevin   Eric    jQuery 3.0 upgrade

(function($, undefined ) {
    $.widget( "mobile.tabs", $.mobile.widget, {
        options: {
            iconpos: 'top',
            grid: null,
            load: function(event, ui) { },
            beforeTabHide: function(event, ui) { },
            beforeTabShow: function(event, ui) { },
            afterTabShow: function(event, ui) { }
        },
        _create: function(){
            var
            $this = this,
            $tabs = this.element,
            $navbtns = $tabs.find("a"),
            iconpos = $navbtns.filter('[data-icon]').length ? this.options.iconpos : undefined;
            // Raymond mod, 取消搜尋最近一層data-role=page, 以支援巢狀Tabs
            //var $content = $tabs.closest('div[data-role="page"]').find('div[data-role="content"]');
            var $content = $tabs.closest('div:jqmData(role="content")');
            //assert($content.length == 1);

            $tabs
            .addClass('ui-navbar')
            .attr("role","navigation")
            .find("ul")
            .grid({grid: this.options.grid });

            if( !iconpos ){
                $tabs.addClass("ui-navbar-noicons");
            }

            $navbtns
            .buttonMarkup({
                corners: false,
                shadow: false,
                iconpos: iconpos,
                theme: 'c'
            })
            .removeClass('ui-link');

            // Set up the direct children of the page as the tab content, hide them
            //Raymond mod, 加入篩選條件data-role!='tabs'以容許Tabbar放在Page content區
            $content.children(':jqmData(role!="tabs")')
                .addClass('ui-tabs-content')
                .addClass(($tabs.jqmData('tabpos') == "left")?"ui-tabs-content-right":"ui-tabs-content-left");

            // Raymond add, 放在Page content區的tabbar套用ui-tabs-bar樣式
            $tabs.addClass('ui-tabs-bar');
            
            // Raymond add, 增加count bubble
            $navbtns.each(function(i, elm) {
                var $ti = $(elm).parent("li");
                if($ti.jqmData("subitems") !== undefined) {
                    $ti.append("<span class='ui-btn-up-c ui-li-count ui-btn-corner-all'>" + $ti.jqmData("subitems") + "</span>");
                }
            });

            // Now show the one that's active
            if( $navbtns.filter('.ui-btn-active').length == 0 ) {
                $navbtns.first().addClass('ui-btn-active');

                // Raymond add, 判斷active的tab item是否有子item的屬性
                var $ti = $navbtns.first().parent("li");
                if(!$ti.hasClass("ui-tabs-subitem")) {
                    $ti.parent("ul").children("li.ui-tabs-subitem").removeClass("ui-tabs-subitem-expanded");
                    var n = $ti.jqmData("subitems");
                    if(n > 0) {
                        console.log("next:" + $ti.nextAll("li:lt(" + n + ")").length);
                        $ti.nextAll("li:lt(" + n + ")").addClass("ui-tabs-subitem-expanded");
                        $ti.addClass("ui-tabs-item-expanded");
                    }
                }
                
                // Raymond add, 最後要呼叫afterTabShow
                var callAfterTabShowCallback = true;
            }
            $content.children('#' + $navbtns.eq($this.currentTab()).attr('href')).addClass('ui-tabs-content-active');

            $navbtns.on('click', function(event) { // 2016.5 - Eric Peng, live -> on
                navButtonClick.call(this, event);
                return false;
            })
            .on('tap', function(event){
                navButtonClick.call(this, event);
                return false;
            });
            this.setupBtn = function($newLi, $newContent) {
                $newLi.find("a").on('click', function(event) {
                    navButtonClick.call(this, event);
                    return false;
                })
                .on('tap', function(event) {
                    navButtonClick.call(this, event);
                    return false;
                });
                $newContent.addClass('ui-tabs-content')
                        .addClass(($tabs.jqmData('tabpos') == "left")?"ui-tabs-content-right":"ui-tabs-content-left");
            }

            function navButtonClick(event) {
                $navbtns.removeClass( "ui-btn-active" );
                $( this ).addClass( "ui-btn-active" );
                
                // Raymond add, 先將高度調為100%, 以免由縮合狀態(高度小)展開時(高度大), 會出現下半部不顯示的問題
                $(this).closest("ul").css("height", "100%");
                
                // Raymond add, 判斷active的tab item是否有子item的屬性
                var $ti = $(this).parent("li");
                if(!$ti.hasClass("ui-tabs-subitem")) {
                    //$ti.parent("ul").children("li.ui-tabs-subitem").removeClass("ui-tabs-subitem-expanded");
                    if(!$ti.hasClass("ui-tabs-item-expanded")) {
                        $ti.parent("ul").children(".ui-tabs-subitem-expanded").slideUp("slow", function(event) {
                            $(this).removeClass("ui-tabs-subitem-expanded");
                        });
                        $ti.parent("ul").children(".ui-tabs-item-expanded").removeClass("ui-tabs-item-expanded");
                    }
                    var n = $ti.jqmData("subitems");
                    if(n > 0) {
                        console.log("next:" + $ti.nextAll("li:lt(" + n + ")").length);
                        if(!$ti.hasClass("ui-tabs-item-expanded")) {
                            $ti.nextAll("li:lt(" + n + ")").slideDown("slow", function(event) {
                                $(this).addClass("ui-tabs-subitem-expanded");
                                $ti.addClass("ui-tabs-item-expanded");
                                
                                // 取消指定高度, 回復為展開後的高度(自動)
                                $(this).closest("ul").css("height","");
                                // 整合iScroll
                                if($tabs.data("iScroll"))
                                    $tabs.iscroll("refresh");
                            });
                        }
                        else {
                            $ti.nextAll("li:lt(" + n + ")").slideUp("slow", function(event) {
                                $(this).removeClass("ui-tabs-subitem-expanded");
                                $ti.removeClass("ui-tabs-item-expanded");
                                
                                // 取消指定高度, 回復為縮合後的高度(自動)
                                $(this).closest("ul").css("height","");
                                // 整合iScroll
                                if($tabs.data("iScroll"))
                                    $tabs.iscroll("refresh");
                            });
                        }
                    }
                    else {  // 取消指定高度, 回復為縮合後的高度(自動)
                        $(this).closest("ul").css("height","");
                        // 整合iScroll
                        if($tabs.data("iScroll"))
                            $tabs.iscroll("refresh");
                    }
                }
                
                $this.changeTab(event, {
                    currentTab: $navbtns.eq($this.currentTab()),
                    nextTab: $(this),
                    currentContent: $this.currentContent(),
                    nextContent: $content.children($(this).attr('href'))
                });
                event.preventDefault();
                
                /* 整合iScroll, 改到每個Animation結束後Refresh iScroll
                if($tabs.data("iScroll")) {
                    $tabs.iscroll("refresh");
                }*/
            }

            this._trigger('load', null, {
                currentTab: $navbtns.eq($this.currentTab()),
                currentContent: $this.currentContent()
            });
            
            // Raymond add, 最後要呼叫afterTabShow
            if(typeof callAfterTabShowCallback !== "undefined") {
                this._trigger('afterTabShow', null, {
                    currentTab: $navbtns.eq($this.currentTab()),
                    currentContent: $this.currentContent()
                });
            }
        },
        currentTab: function() {
            var $tabs = this.element,
            $navbtns = $tabs.find("a");
            return this.element.find('.ui-btn-active').parent().prevAll().length;
        },
        currentContent: function() {
            //return this.element.closest('div[data-role="page"]').find('div[data-role="content"]').children().filter('.ui-tabs-content-active');
            return this.element.closest('div[data-role="content"]').children().filter('.ui-tabs-content-active');
        },
        changeTab: function(event, ui) {
            if( this._trigger('beforeTabHide', event, ui) ) {
                // 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
                //ui.currentContent.siblings().andSelf().removeClass('ui-tabs-content-active');
                ui.currentContent.siblings().addBack().removeClass('ui-tabs-content-active');
            }

            if( this._trigger('beforeTabShow', event, ui) )
                ui.nextContent.addClass('ui-tabs-content-active');
            this._trigger('afterTabShow', event, $.extend({}, ui, { previousContent: ui.currentContent, currentContent: ui.nextContent, nextContent: null }));
        },
        // Raymond add, 設定目前active tab item
        setCurrent: function(selector) {
            var $navbtns = this.element.find("a");
            var $selTab = $navbtns.filter('[href="' + selector + '"]');
            if($selTab.length == 1) {
                this.changeTab(event, {
                    currentTab: $navbtns.eq(this.currentTab()),
                    nextTab: $selTab,
                    currentContent: this.currentContent(),
                    nextContent: this.element.closest('div[data-role="content"]').children(selector)
                });
                $navbtns.eq(this.currentTab()).removeClass("ui-btn-active")
                $selTab.addClass("ui-btn-active");
            }
        }
    });
})( jQuery );

/*$(function() {
    $('[data-role=page]').live('pagecreate', function(e) {
        $(this).find('[data-role="tabs"]').tabs({
            load: function(event, ui) {
                //alert("load " + $(this).attr("data-layer"));
                if($(this).attr("data-layer") == "folio") {
                    //loadDraft("1000001008", "0");
                }
            }
        });
    });
});*/