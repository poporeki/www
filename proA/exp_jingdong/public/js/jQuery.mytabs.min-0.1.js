;(function(b){var a={headPanel:".tab-panel",headItem:".tab-head-item",contentPanel:".tab-content-panel",contentItem:".tab-content-item",_speed:200};b.fn.extend({"tabs":function(f){var g=b.extend({},a,f);var c=b(g.headPanel,this),e=b(g.contentPanel,this),h=b(g.headItem,c),d=b(g.contentItem,e);if(!h==d){return console.log("!=")}d.eq(0).siblings().css({"display":"none"});h.on("mouseover",function(){var i=b(this).index();d.eq(i).css({"display":"block"}).siblings().css({"display":"none"})});return this},"animateTabs":function(g){var h=b.extend({},a,g);var d=b(h.headPanel,this),f=b(h.contentPanel,this),j=b(h.headItem,d),e=b(h.contentItem,f);if(!j==e){return console.log("!=")}f.wrapAll('<div class="content-wrapper"></div');var i=0,c=0;_speed=h._speed;_awid=e.width();b.each(e,function(){i+=b(this).width()});f.width(i);j.on("mouseenter",function(){if(f.is(":animated")){return}var m=b(this).index(),l=parseFloat(f.css("left"));if(m!=0){if(m>c||m<c){var k=m-c;f.animate({"left":l-_awid*k},_speed);c=m;return}}else{if(m==0){f.animate({"left":m},_speed);c=m;return}}});return this}})})(jQuery);