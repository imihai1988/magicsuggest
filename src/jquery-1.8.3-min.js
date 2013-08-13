/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function($){"use strict";var MagicSuggest=function(element,options){var ms=this;var defaults={allowFreeEntries:true,cls:"",data:null,dataUrlParams:{},disabled:false,displayField:"name",editable:true,emptyText:function(){return cfg.editable?"Type or click here":"Click here"},emptyTextCls:"ms-empty-text",expanded:false,expandOnFocus:function(){return cfg.editable?false:true},groupBy:null,hideTrigger:false,highlight:true,id:function(){return"ms-ctn-"+$('div[id^="ms-ctn"]').length},infoMsgCls:"",inputCfg:{},invalidCls:"ms-ctn-invalid",matchCase:false,maxDropHeight:290,maxEntryLength:null,maxEntryRenderer:function(e){return"Please reduce your entry by "+e+" character"+(e>1?"s":"")},maxSuggestions:null,maxSelection:10,maxSelectionRenderer:function(e){return"You cannot choose more than "+e+" item"+(e>1?"s":"")},method:"POST",minChars:0,minCharsRenderer:function(e){return"Please type "+e+" more character"+(e>1?"s":"")},name:null,noSuggestionText:"No suggestions",preselectSingleSuggestion:true,renderer:null,required:false,resultAsString:false,selectionCls:"",selectionPosition:"inner",selectionRenderer:null,selectionStacked:false,sortDir:"asc",sortOrder:null,strictSuggest:false,style:"",toggleOnClick:false,typeDelay:400,useTabKey:false,useCommaKey:true,useZebraStyle:true,value:null,valueField:"id",width:function(){return $(this).width()}};var conf=$.extend({},options);var cfg=$.extend(true,{},defaults,conf);if($.isFunction(cfg.emptyText)){cfg.emptyText=cfg.emptyText.call(this)}if($.isFunction(cfg.expandOnFocus)){cfg.expandOnFocus=cfg.expandOnFocus.call(this)}if($.isFunction(cfg.id)){cfg.id=cfg.id.call(this)}this.addToSelection=function(e,t){if(!cfg.maxSelection||_selection.length<cfg.maxSelection){if(!$.isArray(e)){e=[e]}var n=false;$.each(e,function(e,t){if($.inArray(t[cfg.valueField],ms.getValue())===-1){_selection.push(t);n=true}});if(n===true){self._renderSelection();this.empty();if(t!==true){$(this).trigger("selectionchange",[this,this.getSelectedItems()])}}}};this.clear=function(e){this.removeFromSelection(_selection.slice(0))};this.collapse=function(){if(cfg.expanded===true){this.combobox.detach();cfg.expanded=false;$(this).trigger("collapse",[this])}};this.disable=function(){this.container.addClass("ms-ctn-disabled");cfg.disabled=true;ms.input.attr("disabled",true)};this.empty=function(){this.input.removeClass(cfg.emptyTextCls);this.input.val("");ms.input.attr("disabled",false)};this.enable=function(){this.container.removeClass("ms-ctn-disabled");ms.input.attr("disabled",false);cfg.disabled=false};this.expand=function(){if(!cfg.expanded&&(this.input.val().length>=cfg.minChars||this.combobox.children().size()>0)){this.combobox.appendTo(this.container);self._processSuggestions();cfg.expanded=true;$(this).trigger("expand",[this])}};this.isDisabled=function(){return cfg.disabled};this.isValid=function(){return cfg.required===false||_selection.length>0};this.getDataUrlParams=function(){return cfg.dataUrlParams};this.getName=function(){return cfg.name};this.getSelectedItems=function(){return _selection};this.getRawValue=function(){return ms.input.val()!==cfg.emptyText?ms.input.val():""};this.getValue=function(){return $.map(_selection,function(e){return e[cfg.valueField]})};this.removeFromSelection=function(e,t){if(!$.isArray(e)){e=[e]}var n=false;$.each(e,function(e,t){var r=$.inArray(t[cfg.valueField],ms.getValue());if(r>-1){_selection.splice(r,1);n=true}});if(n===true){self._renderSelection();if(t!==true){$(this).trigger("selectionchange",[this,this.getSelectedItems()])}if(cfg.expandOnFocus){ms.expand()}if(cfg.expanded){self._processSuggestions()}}};this.setData=function(e){cfg.data=e;self._processSuggestions()};this.setName=function(e){cfg.name=e;if(ms._valueContainer){ms._valueContainer.name=e}};this.setValue=function(data){var values=data,items=[];if(!$.isArray(data)){if(typeof data==="string"){if(data.indexOf("[")>-1){values=eval(data)}else if(data.indexOf(",")>-1){values=data.split(",")}}else{values=[data]}}$.each(_cbData,function(e,t){if($.inArray(t[cfg.valueField],values)>-1){items.push(t)}});if(items.length>0){this.addToSelection(items)}};this.setDataUrlParams=function(e){cfg.dataUrlParams=$.extend({},e)};var _selection=[],_comboItemHeight=0,_timer,_hasFocus=false,_groups=null,_cbData=[],_ctrlDown=false;var self={_displaySuggestions:function(e){ms.combobox.empty();var t=0,n=0;if(_groups===null){self._renderComboItems(e);t=_comboItemHeight*e.length}else{for(var r in _groups){n+=1;$("<div/>",{"class":"ms-res-group",html:r}).appendTo(ms.combobox);self._renderComboItems(_groups[r].items,true)}t=_comboItemHeight*(e.length+n)}if(t<ms.combobox.height()||t<=cfg.maxDropHeight){ms.combobox.height(t)}else if(t>=ms.combobox.height()&&t>cfg.maxDropHeight){ms.combobox.height(cfg.maxDropHeight)}if(e.length===1&&cfg.preselectSingleSuggestion===true){ms.combobox.children().filter(":last").addClass("ms-res-item-active")}if(e.length===0&&ms.getRawValue()!==""){self._updateHelper(cfg.noSuggestionText);ms.collapse()}},_getEntriesFromStringArray:function(e){var t=[];$.each(e,function(e,n){var r={};r[cfg.displayField]=r[cfg.valueField]=$.trim(n);t.push(r)});return t},_highlightSuggestion:function(e){var t=ms.input.val()!==cfg.emptyText?ms.input.val():"";if(t.length===0){return e}if(cfg.matchCase===true){e=e.replace(new RegExp("("+t+")(?!([^<]+)?>)","g"),"<em>$1</em>")}else{e=e.replace(new RegExp("("+t+")(?!([^<]+)?>)","gi"),"<em>$1</em>")}return e},_moveSelectedRow:function(e){if(!cfg.expanded){ms.expand()}var t,n,r,i;t=ms.combobox.find(".ms-res-item");if(e==="down"){n=t.eq(0)}else{n=t.filter(":last")}r=ms.combobox.find(".ms-res-item-active:first");if(r.length>0){if(e==="down"){n=r.nextAll(".ms-res-item").first();if(n.length===0){n=t.eq(0)}i=ms.combobox.scrollTop();ms.combobox.scrollTop(0);if(n[0].offsetTop+n.outerHeight()>ms.combobox.height()){ms.combobox.scrollTop(i+_comboItemHeight)}}else{n=r.prevAll(".ms-res-item").first();if(n.length===0){n=t.filter(":last");ms.combobox.scrollTop(_comboItemHeight*t.length)}if(n[0].offsetTop<ms.combobox.scrollTop()){ms.combobox.scrollTop(ms.combobox.scrollTop()-_comboItemHeight)}}}t.removeClass("ms-res-item-active");n.addClass("ms-res-item-active")},_processSuggestions:function(e){var t=null,n=e||cfg.data;if(n!==null){if(typeof n==="function"){n=n.call(ms)}if(typeof n==="string"&&n.indexOf(",")<0){$(ms).trigger("beforeload",[ms]);var r=$.extend({query:ms.input.val()},cfg.dataUrlParams);$.ajax({type:cfg.method,url:n,data:r,success:function(e){t=JSON.parse(e);self._processSuggestions(t);$(ms).trigger("load",[ms,t])},error:function(){throw"Could not reach server"}});return}else if(typeof n==="string"&&n.indexOf(",")>-1){_cbData=self._getEntriesFromStringArray(n.split(","))}else{if(n.length>0&&typeof n[0]==="string"){_cbData=self._getEntriesFromStringArray(n)}else{_cbData=n.results||n}}self._displaySuggestions(self._sortAndTrim(_cbData))}},_render:function(e){$(ms).trigger("beforerender",[ms]);var t=$.isFunction(cfg.width)?cfg.width.call(e):cfg.width;ms.container=$("<div/>",{id:cfg.id,"class":"ms-ctn "+cfg.cls+(cfg.disabled===true?" ms-ctn-disabled":"")+(cfg.editable===true?"":" ms-ctn-readonly"),style:cfg.style}).width(t);ms.container.focus($.proxy(handlers._onFocus,this));ms.container.blur($.proxy(handlers._onBlur,this));ms.container.keydown($.proxy(handlers._onKeyDown,this));ms.container.keyup($.proxy(handlers._onKeyUp,this));ms.input=$("<input/>",$.extend({id:"ms-input-"+$('input[id^="ms-input"]').length,type:"text","class":cfg.emptyTextCls+(cfg.editable===true?"":" ms-input-readonly"),value:cfg.emptyText,readonly:!cfg.editable,disabled:cfg.disabled},cfg.inputCfg)).width(t-(cfg.hideTrigger?16:42)-2);ms.input.focus($.proxy(handlers._onInputFocus,this));ms.input.click($.proxy(handlers._onInputClick,this));if(cfg.hideTrigger===false){ms.trigger=$("<div/>",{id:"ms-trigger-"+$('div[id^="ms-trigger"]').length,"class":"ms-trigger",html:'<div class="ms-trigger-ico"></div>'});ms.trigger.click($.proxy(handlers._onTriggerClick,this));ms.container.append(ms.trigger)}ms.combobox=$("<div/>",{id:"ms-res-ctn-"+$('div[id^="ms-res-ctn"]').length,"class":"ms-res-ctn "}).width(t).height(cfg.maxDropHeight);ms.combobox.on("click","div.ms-res-item",$.proxy(handlers._onComboItemSelected,this));ms.combobox.on("mouseover","div.ms-res-item",$.proxy(handlers._onComboItemMouseOver,this));ms.selectionContainer=$("<div/>",{id:"ms-sel-ctn-"+$('div[id^="ms-sel-ctn"]').length,"class":"ms-sel-ctn"});ms.selectionContainer.click($.proxy(handlers._onFocus,this));if(cfg.selectionPosition==="inner"){ms.selectionContainer.append(ms.input)}else{ms.container.append(ms.input)}ms.helper=$("<div/>",{"class":"ms-helper "+cfg.infoMsgCls});self._updateHelper();ms.container.append(ms.helper);$(e).replaceWith(ms.container);switch(cfg.selectionPosition){case"bottom":ms.selectionContainer.insertAfter(ms.container);if(cfg.selectionStacked===true){ms.selectionContainer.width(ms.container.width());ms.selectionContainer.addClass("ms-stacked")}break;case"right":ms.selectionContainer.insertAfter(ms.container);ms.container.css("float","left");break;default:ms.container.append(ms.selectionContainer);break}self._processSuggestions();if(cfg.value!==null){ms.setValue(cfg.value);self._renderSelection()}$(ms).trigger("afterrender",[ms]);$("body").click(function(e){if(ms.container.hasClass("ms-ctn-bootstrap-focus")&&ms.container.has(e.target).length===0&&e.target.className.indexOf("ms-res-item")<0&&e.target.className.indexOf("ms-close-btn")<0&&ms.container[0]!==e.target){handlers._onBlur()}});if(cfg.expanded===true){cfg.expanded=false;ms.expand()}},_renderComboItems:function(e,t){var n=this,r="";$.each(e,function(e,i){var s=cfg.renderer!==null?cfg.renderer.call(n,i):i[cfg.displayField];var o=$("<div/>",{"class":"ms-res-item "+(t?"ms-res-item-grouped ":"")+(e%2===1&&cfg.useZebraStyle===true?"ms-res-odd":""),html:cfg.highlight===true?self._highlightSuggestion(s):s,"data-json":JSON.stringify(i)});o.click($.proxy(handlers._onComboItemSelected,n));o.mouseover($.proxy(handlers._onComboItemMouseOver,n));r+=$("<div/>").append(o).html()});ms.combobox.html(r);_comboItemHeight=ms.combobox.find(".ms-res-item:first").outerHeight()},_renderSelection:function(){var e=this,t=0,n=0,r=[],i=cfg.resultAsString===true&&!_hasFocus;ms.selectionContainer.find(".ms-sel-item").remove();if(ms._valueContainer!==undefined){ms._valueContainer.remove()}$.each(_selection,function(t,n){var s,o,u=cfg.selectionRenderer!==null?cfg.selectionRenderer.call(e,n):n[cfg.displayField];if(i===true){s=$("<div/>",{"class":"ms-sel-item ms-sel-text "+cfg.selectionCls,html:u+(t===_selection.length-1?"":",")}).data("json",n)}else{s=$("<div/>",{"class":"ms-sel-item "+cfg.selectionCls,html:u}).data("json",n);if(cfg.disabled===false){o=$("<span/>",{"class":"ms-close-btn"}).data("json",n).appendTo(s);o.click($.proxy(handlers._onTagTriggerClick,e))}}r.push(s)});ms.selectionContainer.prepend(r);ms._valueContainer=$("<input/>",{type:"hidden",name:cfg.name,value:JSON.stringify(ms.getValue())});ms._valueContainer.appendTo(ms.selectionContainer);if(cfg.selectionPosition==="inner"){ms.input.width(0);n=ms.input.offset().left-ms.selectionContainer.offset().left;t=ms.container.width()-n-(cfg.hideTrigger===true?16:42);ms.input.width(t);ms.container.height(ms.selectionContainer.height())}if(_selection.length===cfg.maxSelection){self._updateHelper(cfg.maxSelectionRenderer.call(this,_selection.length))}else{ms.helper.hide()}},_selectItem:function(e){if(cfg.maxSelection===1){_selection=[]}ms.addToSelection(e.data("json"));e.removeClass("ms-res-item-active");if(cfg.expandOnFocus===false||_selection.length===cfg.maxSelection){ms.collapse()}if(!_hasFocus){ms.input.focus()}else if(_hasFocus&&(cfg.expandOnFocus||_ctrlDown)){self._processSuggestions();if(_ctrlDown){ms.expand()}}},_sortAndTrim:function(e){var t=ms.getRawValue(),n=[],r=[],i=ms.getValue();if(t.length>0){$.each(e,function(e,r){var i=r[cfg.displayField];if(cfg.matchCase===true&&i.indexOf(t)>-1||cfg.matchCase===false&&i.toLowerCase().indexOf(t.toLowerCase())>-1){if(cfg.strictSuggest===false||i.toLowerCase().indexOf(t.toLowerCase())===0){n.push(r)}}})}else{n=e}$.each(n,function(e,t){if($.inArray(t[cfg.valueField],i)===-1){r.push(t)}});if(cfg.sortOrder!==null){r.sort(function(e,t){if(e[cfg.sortOrder]<t[cfg.sortOrder]){return cfg.sortDir==="asc"?-1:1}if(e[cfg.sortOrder]>t[cfg.sortOrder]){return cfg.sortDir==="asc"?1:-1}return 0})}if(cfg.maxSuggestions&&cfg.maxSuggestions>0){r=r.slice(0,cfg.maxSuggestions)}if(cfg.groupBy!==null){_groups={};$.each(r,function(e,t){if(_groups[t[cfg.groupBy]]===undefined){_groups[t[cfg.groupBy]]={title:t[cfg.groupBy],items:[t]}}else{_groups[t[cfg.groupBy]].items.push(t)}})}return r},_updateHelper:function(e){ms.helper.html(e);if(!ms.helper.is(":visible")){ms.helper.fadeIn()}}};var handlers={_onBlur:function(){ms.container.removeClass("ms-ctn-bootstrap-focus");ms.collapse();_hasFocus=false;if(ms.getRawValue()!==""&&cfg.allowFreeEntries===true){var e={};e[cfg.displayField]=e[cfg.valueField]=ms.getRawValue();ms.addToSelection(e)}self._renderSelection();if(ms.isValid()===false){ms.container.addClass("ms-ctn-invalid")}if(ms.input.val()===""&&_selection.length===0){ms.input.addClass(cfg.emptyTextCls);ms.input.val(cfg.emptyText)}else if(ms.input.val()!==""&&cfg.allowFreeEntries===false){ms.empty();self._updateHelper("")}if(ms.input.is(":focus")){$(ms).trigger("blur",[ms])}},_onComboItemMouseOver:function(e){ms.combobox.children().removeClass("ms-res-item-active");$(e.currentTarget).addClass("ms-res-item-active")},_onComboItemSelected:function(e){self._selectItem($(e.currentTarget))},_onFocus:function(){ms.input.focus()},_onInputClick:function(){if(ms.isDisabled()===false&&_hasFocus){if(cfg.toggleOnClick===true){if(cfg.expanded){ms.collapse()}else{ms.expand()}}}},_onInputFocus:function(){if(ms.isDisabled()===false&&!_hasFocus){_hasFocus=true;ms.container.addClass("ms-ctn-bootstrap-focus");ms.container.removeClass(cfg.invalidCls);if(ms.input.val()===cfg.emptyText){ms.empty()}var e=ms.getRawValue().length;if(cfg.expandOnFocus===true){ms.expand()}if(_selection.length===cfg.maxSelection){self._updateHelper(cfg.maxSelectionRenderer.call(this,_selection.length))}else if(e<cfg.minChars){self._updateHelper(cfg.minCharsRenderer.call(this,cfg.minChars-e))}self._renderSelection();$(ms).trigger("focus",[ms])}},_onKeyDown:function(e){var t=ms.combobox.find(".ms-res-item-active:first"),n=ms.input.val()!==cfg.emptyText?ms.input.val():"";$(ms).trigger("keydown",[ms,e]);if(e.keyCode===9&&(cfg.useTabKey===false||cfg.useTabKey===true&&t.length===0&&ms.input.val().length===0)){handlers._onBlur();return}switch(e.keyCode){case 8:if(n.length===0&&ms.getSelectedItems().length>0&&cfg.selectionPosition==="inner"){_selection.pop();self._renderSelection();$(ms).trigger("selectionchange",[ms,ms.getSelectedItems()]);ms.input.focus();e.preventDefault()}break;case 9:case 188:case 13:e.preventDefault();break;case 17:_ctrlDown=true;break;case 40:e.preventDefault();self._moveSelectedRow("down");break;case 38:e.preventDefault();self._moveSelectedRow("up");break;default:if(_selection.length===cfg.maxSelection){e.preventDefault()}break}},_onKeyUp:function(e){var t=ms.getRawValue(),n=$.trim(ms.input.val()).length>0&&ms.input.val()!==cfg.emptyText&&(!cfg.maxEntryLength||$.trim(ms.input.val()).length<=cfg.maxEntryLength),r,i={};$(ms).trigger("keyup",[ms,e]);clearTimeout(_timer);if(e.keyCode===27&&cfg.expanded){ms.combobox.height(0)}if(e.keyCode===9&&cfg.useTabKey===false||e.keyCode>13&&e.keyCode<32){if(e.keyCode===17){_ctrlDown=false}return}switch(e.keyCode){case 40:case 38:e.preventDefault();break;case 13:case 9:case 188:if(e.keyCode!==188||cfg.useCommaKey===true){e.preventDefault();if(cfg.expanded===true){r=ms.combobox.find(".ms-res-item-active:first");if(r.length>0){self._selectItem(r);return}}if(n===true&&cfg.allowFreeEntries===true){i[cfg.displayField]=i[cfg.valueField]=t;ms.addToSelection(i);ms.collapse();ms.input.focus()}break};default:if(_selection.length===cfg.maxSelection){self._updateHelper(cfg.maxSelectionRenderer.call(this,_selection.length))}else{if(t.length<cfg.minChars){self._updateHelper(cfg.minCharsRenderer.call(this,cfg.minChars-t.length));if(cfg.expanded===true){ms.collapse()}}else if(cfg.maxEntryLength&&t.length>cfg.maxEntryLength){self._updateHelper(cfg.maxEntryRenderer.call(this,t.length-cfg.maxEntryLength));if(cfg.expanded===true){ms.collapse()}}else{ms.helper.hide();if(cfg.minChars<=t.length){_timer=setTimeout(function(){if(cfg.expanded===true){self._processSuggestions()}else{ms.expand()}},cfg.typeDelay)}}}break}},_onTagTriggerClick:function(e){ms.removeFromSelection($(e.currentTarget).data("json"))},_onTriggerClick:function(){if(ms.isDisabled()===false&&!(cfg.expandOnFocus===true&&_selection.length===cfg.maxSelection)){$(ms).trigger("triggerclick",[ms]);if(cfg.expanded===true){ms.collapse()}else{var e=ms.getRawValue().length;if(e>=cfg.minChars){ms.input.focus();ms.expand()}else{self._updateHelper(cfg.minCharsRenderer.call(this,cfg.minChars-e))}}}}};if(element!==null){self._render(element)}};$.fn.magicSuggest=function(e){var t=$(this);if(t.size()===1&&t.data("magicSuggest")){return t.data("magicSuggest")}t.each(function(t){var n=$(this);if(n.data("magicSuggest")){return}if(this.nodeName.toLowerCase()==="select"){e.data=[];e.value=[];$.each(this.children,function(t,n){if(n.nodeName&&n.nodeName.toLowerCase()==="option"){e.data.push({id:n.value,name:n.text});if(n.selected){e.value.push(n.value)}}})}var r={};$.each(this.attributes,function(e,t){r[t.name]=t.value});var i=new MagicSuggest(this,$.extend(e,r));n.data("magicSuggest",i);i.container.data("magicSuggest",i)});if(t.size()===1){return t.data("magicSuggest")}return t}})(jQuery)
