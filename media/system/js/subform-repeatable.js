!function(e){"use strict";e.subformRepeatable=function(t,o){if(this.$container=e(t),this.$container.data("subformRepeatable"))return r;this.$container.data("subformRepeatable",r),this.options=e.extend({},e.subformRepeatable.defaults,o),this.template="",this.prepareTemplate(),this.$containerRows=this.options.rowsContainer?this.$container.find(this.options.rowsContainer):this.$container;var r=this;this.$container.on("click",this.options.btAdd,function(t){t.preventDefault();var o=e(this).parents(r.options.repeatableElement);o.length||(o=null),r.addRow(o)}),this.$container.on("click",this.options.btRemove,function(t){t.preventDefault();var o=e(this).parents(r.options.repeatableElement);r.removeRow(o)}),this.options.btMove&&this.$containerRows.sortable({items:this.options.repeatableElement,handle:this.options.btMove,tolerance:"pointer"}),this.$container.trigger("subform-ready")},e.subformRepeatable.prototype.prepareTemplate=function(){if(this.options.rowTemplateSelector)this.template=e.trim(this.$container.find(this.options.rowTemplateSelector).last().html())||"";else{var t=this.$container.find(this.options.repeatableElement).get(0),o=e(t).clone();try{this.clearScripts(o)}catch(e){window.console&&console.log(e)}this.template=o.prop("outerHTML")}},e.subformRepeatable.prototype.addRow=function(t){var o=this.$containerRows.find(this.options.repeatableElement).length;if(o>=this.options.maximum)return null;var r=e.parseHTML(this.template);t?e(t).after(r):this.$containerRows.append(r);var a=e(r);a.attr("data-new","true"),this.fixUniqueAttributes(a,o);try{this.fixScripts(a)}catch(e){window.console&&console.log(e)}return this.$container.trigger("subform-row-add",a),a},e.subformRepeatable.prototype.removeRow=function(e){this.$containerRows.find(this.options.repeatableElement).length<=this.options.minimum||(this.$container.trigger("subform-row-remove",e),e.remove())},e.subformRepeatable.prototype.fixUniqueAttributes=function(t,o,r,a){var i=void 0===r?t.attr("data-group"):r,n=void 0===a?t.attr("data-base-name"):a,s=void 0===o?0:o,l=n+s;t.attr("data-group",l);for(var p=t.find("[name]"),f={},c=0,d=p.length;c<d;c++){var u=e(p[c]),h=u.attr("name"),m=h.replace(/(\[\]$)/g,"").replace(/(\]\[)/g,"__").replace(/\[/g,"_").replace(/\]/g,""),b=h.replace("["+i+"][","["+l+"]["),v=m.replace(i,l),w=0,g=m;"checkbox"===u.prop("type")&&h.match(/\[\]$/)?((w=f[m]?f[m].length:0)||(u.closest("fieldset.checkboxes").attr("id",v),t.find('label[for="'+m+'"]').attr("for",v).attr("id",v+"-lbl")),g+=w,v+=w):"radio"===u.prop("type")&&((w=f[m]?f[m].length:0)||(u.closest("fieldset.radio").attr("id",v),t.find('label[for="'+m+'"]').attr("for",v).attr("id",v+"-lbl")),g+=w,v+=w),f[m]?f[m].push(!0):f[m]=[!0],u.attr("name",b),u.attr("id",v),t.find('label[for="'+g+'"]').attr("for",v).attr("id",v+"-lbl")}for(var R=t.find(this.options.rowTemplateSelector),$=0;$<R.length;$++){var x=e(e(R[$]).prop("content"));this.fixUniqueAttributes(x,s,i,n)}},e.subformRepeatable.prototype.clearScripts=function(t){e.fn.chosen&&t.find("select.chzn-done").each(function(){var t=e(this);t.next(".chzn-container").remove(),t.show().addClass("fix-chosen")})},e.subformRepeatable.prototype.fixScripts=function(t){t.find('a[onclick*="jInsertFieldValue"]').each(function(){var t=e(this),o=t.siblings('input[type="text"]').attr("id"),r=t.prev(),a=r.attr("href");t.attr("onclick","jInsertFieldValue('', '"+o+"');return false;"),r.attr("href",a.replace(/&fieldid=(.+)&/,"&fieldid="+o+"&"))}),e.fn.fieldMedia&&t.find(".field-media-wrapper").fieldMedia(),e.fn.fieldUser&&t.find(".field-user-wrapper").fieldUser(),window.SqueezeBox&&window.SqueezeBox.assign&&SqueezeBox.assign(t.find("a.modal").get(),{parse:"rel"}),t.find("div.subform-repeatable").subformRepeatable()},e.subformRepeatable.defaults={btAdd:".group-add",btRemove:".group-remove",btMove:".group-move",minimum:0,maximum:10,repeatableElement:".subform-repeatable-group",rowTemplateSelector:"template.subform-repeatable-template-section",rowsContainer:null},e.fn.subformRepeatable=function(t){return this.each(function(){var t=t||{},o=e(this).data();if(!o.subformRepeatable){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r]);var a=new e.subformRepeatable(this,t);e(this).data("subformRepeatable",a)}})},e(window).on("load",function(){e("div.subform-repeatable").subformRepeatable()})}(jQuery);