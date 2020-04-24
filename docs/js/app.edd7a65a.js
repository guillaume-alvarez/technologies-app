(function(e){function t(t){for(var r,i,s=t[0],c=t[1],l=t[2],h=0,f=[];h<s.length;h++)i=s[h],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/technologies-app/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"034f":function(e,t,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},"12eb":function(e,t,n){"use strict";var r=n("1502"),a=n.n(r);a.a},1502:function(e,t,n){},"1fb2":function(e,t,n){},"242d":function(e,t,n){},4928:function(e,t,n){"use strict";var r=n("1fb2"),a=n.n(r);a.a},"5c45":function(e){e.exports=JSON.parse('["Stone Age","Bronze Age","Iron Age","Antiquity","Dark Age","Feudal Age","Age of Discovery","Age of Enlightenment","Industrial Age","World Wars","Information Age"]')},7850:function(e,t,n){"use strict";var r=n("fe9a"),a=n.n(r);a.a},"85ec":function(e,t,n){},a035:function(e,t,n){e.exports=n.p+"img/tools.3cdfa5c7.svg"},a244:function(e,t,n){var r={"./enlightenment.svg":"b624","./swords.svg":"b276","./tools.svg":"a035","./village.svg":"d676","./wheat.svg":"b859"};function a(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id="a244"},b276:function(e,t,n){e.exports=n.p+"img/swords.41bbaeea.svg"},b624:function(e,t,n){e.exports=n.p+"img/enlightenment.fc633994.svg"},b859:function(e,t,n){e.exports=n.p+"img/wheat.34c77b85.svg"},cd49:function(e,t,n){"use strict";n.r(t),n.d(t,"bus",(function(){return je})),n.d(t,"default",(function(){return je}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var r,a=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Board")],1)},i=[],s=n("d4ec"),c=n("262e"),l=n("2caf"),u=n("9ab4"),h=(n("92c6"),n("60a3")),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"board"}},[n("Summary",{attrs:{name:"Future",techs:e.playerTechs}}),n("CardsRow",{attrs:{name:"Future",techs:e.futureTechs,highlightedTechs:e.highlightedTechs}}),n("CardsRow",{attrs:{name:"Present",techs:e.presentTechs,highlightedTechs:e.highlightedTechs}}),n("CardsRow",{attrs:{name:"Past",techs:e.pastTechs,highlightedTechs:e.highlightedTechs}})],1)},p=[],d=(n("99af"),n("4de4"),n("4160"),n("caad"),n("c975"),n("a434"),n("b0c0"),n("2532"),n("159b"),n("2909")),v=n("bee2"),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"cards-row"},[n("section",{staticClass:"section"},[n("div",{staticClass:"columns is-multiline"},[n("h1",{staticClass:"column is-narrow title is-uppercase"},[e._v(" "+e._s(e.name)+" ")]),e._l(e.techs,(function(t){return n("TechCard",{key:t.id,attrs:{id:t.id,tech:t,highlight:e.highlight(t)}})}))],2)])])},g=[],b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("CardMove",{attrs:{duration:500}},[n("div",{staticClass:"tech column is-narrow",on:{click:function(t){return e.onClick()}}},[n("div",{staticClass:"card",class:e.highlight?"highlight":"",on:{mouseover:function(t){return e.onMouseOver()},mouseleave:function(t){return e.onMouseLeave()}}},[n("header",{staticClass:"card-header"},[n("p",{staticClass:"card-header-title"},[e._v(" "+e._s(e.tech.name)+" ")]),n("div",{staticClass:"card-header-icon"},[n("span",{staticClass:"era",attrs:{title:e.tech.era.name}},[e._v(e._s(e.tech.era.roman))]),e._l(e.tech.effects,(function(e,t){return n("EffectIcon",{key:t,attrs:{name:t,value:"+"+e,tooltip:"+"+e+" "+t}})}))],2)]),n("div",{staticClass:"card-content"},[n("div",{staticClass:"content tech-text"},[e._v(" "+e._s(e.text)+" ")])])])])])},y=[],C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"card-move",css:!1},on:{"before-leave":e.beforeLeave}},[e._t("default")],2)},O=[],k=(n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),r=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return Object(v["a"])(n,[{key:"mounted",value:function(){var e=r.previousPositions.get(this.$el.id);e?this.move(e,this.$el.getBoundingClientRect()):this.startPositionInspection()}},{key:"startPositionInspection",value:function(){var e=this,t=this.$el.getBoundingClientRect();this.intervalIndex=setInterval((function(){var n=e.$el.getBoundingClientRect();n.x===t.x&&n.y===t.y||e.move(t,n)}),10)}},{key:"move",value:function(e,t){var n=this;clearInterval(this.intervalIndex),this.$el.animate([{transform:"translate(".concat(e.x-t.x,"px, ").concat(e.y-t.y,"px)")},{transform:"translate(0, 0)"}],{duration:this.duration,easing:"cubic-bezier(0,0,0.32,1)"}).addEventListener("finish",(function(){return n.startPositionInspection()}))}},{key:"beforeLeave",value:function(e){r.previousPositions.set(e.id,e.getBoundingClientRect())}}]),n}(h["c"]));k.previousPositions=new Map,Object(u["a"])([Object(h["b"])()],k.prototype,"duration",void 0),k=r=Object(u["a"])([h["a"]],k);var j=k,x=j,w=n("2877"),T=Object(w["a"])(x,C,O,!1,null,"362cf4d9",null),S=T.exports,P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("figure",{staticClass:"image is-32x32 effect"},[n("img",{attrs:{src:e.getIconPath,title:e.tooltip}}),n("p",{staticClass:"effect-value"},[e._v(e._s(e.value))])])},I=[],M=function(e){Object(c["a"])(r,e);var t=Object(l["a"])(r);function r(){return Object(s["a"])(this,r),t.apply(this,arguments)}return Object(v["a"])(r,[{key:"getIconPath",get:function(){var e=n("a244");switch(this.name){case"prod":return e("./tools.svg");case"strength":return e("./swords.svg");case"food":return e("./wheat.svg");case"social":return e("./village.svg");case"tech":return e("./enlightenment.svg");default:return""}}}]),r}(h["c"]);Object(u["a"])([Object(h["b"])()],M.prototype,"name",void 0),Object(u["a"])([Object(h["b"])()],M.prototype,"value",void 0),Object(u["a"])([Object(h["b"])()],M.prototype,"tooltip",void 0),M=Object(u["a"])([h["a"]],M);var A=M,B=A,E=(n("e6b3"),Object(w["a"])(B,P,I,!1,null,"a109acb0",null)),_=E.exports,W=function(e){Object(c["a"])(r,e);var t=Object(l["a"])(r);function r(){var e;return Object(s["a"])(this,r),e=t.apply(this,arguments),e.getIconPath=function(e){var t=n("a244");switch(e){case"prod":return t("./tools.svg");case"strength":return t("./swords.svg");case"food":return t("./wheat.svg");case"social":return t("./village.svg");case"tech":return t("./enlightenment.svg");default:return""}},e}return Object(v["a"])(r,[{key:"onClick",value:function(){je.$emit("select-tech",this.tech)}},{key:"onMouseOver",value:function(){je.$emit("hover-tech",this.tech,!0)}},{key:"onMouseLeave",value:function(){je.$emit("hover-tech",this.tech,!1)}},{key:"text",get:function(){return this.tech.text}},{key:"id",get:function(){return this.tech.id}}]),r}(h["c"]);Object(u["a"])([Object(h["b"])()],W.prototype,"tech",void 0),Object(u["a"])([Object(h["b"])()],W.prototype,"highlight",void 0),W=Object(u["a"])([Object(h["a"])({components:{CardMove:S,EffectIcon:_}})],W);var L=W,D=L,F=(n("4928"),Object(w["a"])(D,b,y,!1,null,"8cfe413e",null)),H=F.exports,$=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return Object(v["a"])(n,[{key:"highlight",value:function(e){return this.highlightedTechs.includes(e)}}]),n}(h["c"]);Object(u["a"])([Object(h["b"])()],$.prototype,"name",void 0),Object(u["a"])([Object(h["b"])()],$.prototype,"techs",void 0),Object(u["a"])([Object(h["b"])()],$.prototype,"highlightedTechs",void 0),$=Object(u["a"])([Object(h["a"])({components:{TechCard:H}})],$);var G=$,R=G,X=(n("12eb"),Object(w["a"])(R,m,g,!1,null,"332670be",null)),z=X.exports,V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"summary level"},e._l(e.effects,(function(e){return n("div",{key:e.name,staticClass:"level-item"},[n("EffectIcon",{attrs:{name:e.name,value:"+"+e.value,tooltip:e.sources.join("\n")}})],1)})),0)},N=[],J=(n("a630"),n("a623"),n("d81d"),n("45fc"),n("b64b"),n("e8f1")),K=(n("38cf"),n("5c45")),q=function e(t,n,r){Object(s["a"])(this,e),this.name=t,this.id=n,this.roman=r};function U(e){var t=["","I","II","III","IV","V","VI","VII","VIII","IX","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],n="",r=e,a=0;while(r>0&&a<3)n=t[r%10+10*a]+n,r=Math.floor(r/10),a+=1;return"M".repeat(r)+n}var Q=new Map,Y=new Map;function Z(e){var t;return t="number"===typeof e?Q.get(e):Y.get(e),t||Q.get(1)}K.forEach((function(e,t){var n=new q(e,t+1,U(t+1));Q.set(n.id,n),Y.set(n.name,n)}));var ee=["food","prod","social","strength","tech"],te=function e(t,n,r,a,o,i,c,l){Object(s["a"])(this,e),this.id=t,this.name=n,this.root=r,this.effects=a,this.previous=c,this.help=l,this.text=o,this.era=i},ne=J,re=new Map,ae=new Array;function oe(e,t){return e.previous.every((function(e){return t.some((function(t){return t===e}))}))}Object.keys(ne).forEach((function(e){var t=ne[e],n=new te(t.id,t.name,t.root,t.effects,t.text,Z(t.era),t.previous.map((function(e){return re.get(e)})),t.help.map((function(e){return re.get(e)})));re.set(e,n),ae.push(n)}));var ie=function(){function e(t){Object(s["a"])(this,e),this.value=0,this.sources=new Array,this.name=t}return Object(v["a"])(e,[{key:"append",value:function(e){var t=e.effects[this.name];t&&(this.value+=t,this.sources.push("+".concat(t," from ").concat(e.name)))}}]),e}(),se=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return Object(v["a"])(n,[{key:"effects",get:function(){var e=new Map;return ee.forEach((function(t){e.set(t,new ie(t))})),this.techs.forEach((function(t){ee.forEach((function(n){e.get(n).append(t)}))})),Array.from(e.values())}}]),n}(h["c"]);Object(u["a"])([Object(h["b"])()],se.prototype,"techs",void 0),se=Object(u["a"])([Object(h["a"])({components:{EffectIcon:_}})],se);var ce,le=se,ue=le,he=(n("7850"),Object(w["a"])(ue,V,N,!1,null,"2bc05aca",null)),fe=he.exports,pe=ce=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(s["a"])(this,n),e=t.apply(this,arguments),e.highlightedTechs=new Array,e.pastTechs=new Array,e.presentTechs=ae.filter((function(e){return e.root})).sort(ce.compareTech).reverse(),e}return Object(v["a"])(n,[{key:"created",value:function(){var e=this;je.$on("select-tech",(function(t){e.onSelectTech(t)})),je.$on("hover-tech",(function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var a=n[0],o=n[1];e.onHoverTech(a,o)}))}},{key:"addPresentTech",value:function(e){var t=this;this.presentTechs.push(e),this.presentTechs.sort(ce.compareTech).reverse(),e.previous.forEach((function(e){ce.removeTech(t.presentTechs,e)&&t.addPastTech(e)}))}},{key:"addPastTech",value:function(e){this.pastTechs.push(e),this.pastTechs.sort(ce.compareTech).reverse()}},{key:"onSelectTech",value:function(e){ce.removeTech(this.futureTechs,e)?this.addPresentTech(e):ce.removeTech(this.presentTechs,e)&&this.addPastTech(e)}},{key:"onHoverTech",value:function(e,t){this.highlightedTechs=t?[e].concat(Object(d["a"])(e.previous),Object(d["a"])(this.futureTechs.filter((function(t){return t.previous.includes(e)})))):[]}},{key:"playerTechs",get:function(){return[].concat(Object(d["a"])(this.presentTechs),Object(d["a"])(this.pastTechs))}},{key:"futureTechs",get:function(){var e=this;return ae.filter((function(t){return!e.pastTechs.includes(t)})).filter((function(t){return!e.presentTechs.includes(t)})).filter((function(t){return oe(t,e.pastTechs)||oe(t,e.presentTechs)})).sort(ce.compareTech).reverse()}}],[{key:"removeTech",value:function(e,t){var n=e.indexOf(t);return n>=0&&(e.splice(n,1),!0)}},{key:"compareNumber",value:function(e,t){return e?t?e<t?-1:e>t?1:0:1:t?-1:0}},{key:"compareEffect",value:function(e,t,n){return ce.compareNumber(t.effects[e],n.effects[e])}},{key:"compareTech",value:function(e,t){var n=ce.compareEffect("food",e,t);return 0!==n?n:(n=ce.compareEffect("prod",e,t),0!==n?n:(n=ce.compareEffect("social",e,t),0!==n?n:(n=ce.compareEffect("tech",e,t),0!==n?n:(n=ce.compareEffect("strength",e,t),0!==n?n:e.name.localeCompare(t.name)))))}}]),n}(h["c"]);pe=ce=Object(u["a"])([Object(h["a"])({components:{CardsRow:z,Summary:fe}})],pe);var de=pe,ve=de,me=Object(w["a"])(ve,f,p,!1,null,"522d89b6",null),ge=me.exports,be=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return n}(h["c"]);be=Object(u["a"])([Object(h["a"])({components:{Board:ge}})],be);var ye=be,Ce=ye,Oe=(n("034f"),Object(w["a"])(Ce,o,i,!1,null,null,null)),ke=Oe.exports;a["a"].config.productionTip=!1;var je=new a["a"];new a["a"]({render:function(e){return e(ke)}}).$mount("#app")},d676:function(e,t,n){e.exports=n.p+"img/village.4c96a3d3.svg"},e6b3:function(e,t,n){"use strict";var r=n("242d"),a=n.n(r);a.a},e8f1:function(e){e.exports=JSON.parse('{"Hunting":{"id":"Hunting","name":"Hunting","rank":0,"root":true,"text":"Mammoths\\nAurochs\\nSheep","effects":{"prod":1,"strength":1,"food":1},"previous":[],"help":[],"era":1},"Gathering":{"id":"Gathering","name":"Gathering","rank":0,"root":true,"text":"Wheat\\nBarley\\nSorghum\\nStones\\nCopper\\nGold","effects":{"tech":1,"prod":1,"food":1},"previous":[],"help":[],"era":1},"Animism":{"id":"Animism","name":"Animism","rank":0,"root":true,"text":"Shaman\\nSpirits\\nRituals","effects":{"tech":1,"social":1},"previous":[],"help":[],"era":1},"Pantheism":{"id":"Pantheism","name":"Pantheism","rank":1,"root":false,"text":"Gods\\nSpirits\\nRituals","effects":{"social":1},"previous":["Animism"],"help":[],"era":2},"Polytheism":{"id":"Polytheism","name":"Polytheism","rank":2,"root":false,"text":"Gods\\nSpirits\\nRituals\\nCults\\nTemple\\nClergy","effects":{"social":2},"previous":["Pantheism"],"help":[],"era":3},"Monotheism":{"id":"Monotheism","name":"Monotheism","rank":3,"root":false,"text":"God\\nSaints\\nMarturs\\nRituals\\nCults\\nTemple\\nClergy\\nMissionaries","effects":{"social":3},"previous":["Polytheism"],"help":[],"era":4},"Nationalism":{"id":"Nationalism","name":"Nationalism","rank":4,"root":false,"text":"Nation\\nLeader\\nRituals\\nSoldiers","effects":{"social":4},"previous":["Monotheism"],"help":[],"era":9},"Firewood":{"id":"Firewood","name":"Firewood","rank":0,"root":true,"text":"Oak\\nBirch\\nPoplar","effects":{"prod":1},"previous":[],"help":[],"era":1},"Taming":{"id":"Taming","name":"Taming","rank":1,"root":false,"text":"Wheat\\nBarley\\nSorghum\\nDog\\nCat\\nCow\\nCamel\\nHorse\\nLlama\\nGoat\\nSheep","effects":{"food":1},"previous":["Gathering"],"help":[],"era":2},"Domestication":{"id":"Domestication","name":"Domestication","rank":2,"root":false,"text":"Wheat\\nBarley\\nSorghum\\nDog\\nCow\\nCamel\\nHorse\\nLlama\\nGoat\\nSheep","effects":{"food":1},"previous":["Taming"],"help":[],"era":3},"Cultivation":{"id":"Cultivation","name":"Cultivation","rank":3,"root":false,"text":"Wheat\\nBarley\\nSorghum","effects":{"food":2},"previous":["Domestication"],"help":[],"era":4},"Cattle":{"id":"Cattle","name":"Cattle","rank":3,"root":false,"text":"Cow\\nCamel\\nHorse\\nGoat\\nSheep\\nLlama","effects":{"food":2},"previous":["Domestication"],"help":[],"era":4},"Irrigation":{"id":"Irrigation","name":"Irrigation","rank":4,"root":false,"text":"Wheat\\nBarley\\nSorghum","effects":{"food":3},"previous":["Cultivation"],"help":["Cattle"],"era":5},"Tools":{"id":"Tools","name":"Tools","rank":0,"root":true,"text":"Stick\\nHammer","effects":{"tech":1,"prod":2},"previous":[],"help":[],"era":1},"Woodworking":{"id":"Woodworking","name":"Woodworking","rank":1,"root":false,"text":"Cedar\\nOak\\nBirch\\nFir\\nCherry\\nMapple\\nPine\\nChestnut\\nAspen","effects":{"prod":1},"previous":["Tools"],"help":[],"era":2},"Metallurgy":{"id":"Metallurgy","name":"Metallurgy","rank":2,"root":false,"text":"Copper\\nGold\\nSilver\\nTin\\nIron\\nLead\\nFurnace","effects":{"prod":2},"previous":["Woodworking"],"help":[],"era":1},"Bronze":{"id":"Bronze","name":"Bronze","rank":3,"root":false,"text":"Arsenical Bronze\\nFurnace","effects":{"prod":2},"previous":["Metallurgy"],"help":["Woodworking"],"era":2},"Iron":{"id":"Iron","name":"Iron","rank":4,"root":false,"text":"Furnace","effects":{"prod":3},"previous":["Bronze"],"help":[],"era":3},"Coal":{"id":"Coal","name":"Coal","rank":1,"root":false,"text":"","effects":{"prod":3},"previous":["Firewood"],"help":[],"era":8},"Steel":{"id":"Steel","name":"Steel","rank":5,"root":false,"text":"","effects":{"prod":4},"previous":["Iron"],"help":["Coal"],"era":9},"Oil":{"id":"Oil","name":"Oil","rank":2,"root":false,"text":"","effects":{"prod":4},"previous":["Coal"],"help":[],"era":10},"Weapons":{"id":"Weapons","name":"Weapons","rank":1,"root":false,"text":"Club\\nStones\\nJavelin\\nSpear\\nKnife\\nSword\\nBow\\nArrows","effects":{"strength":1},"previous":["Hunting"],"help":[],"era":2},"Archery":{"id":"Archery","name":"Archery","rank":2,"root":false,"text":"Bow\\nArrows","effects":{"strength":2},"previous":["Weapons"],"help":["Woodworking"],"era":3},"Swordsmanship":{"id":"Swordsmanship","name":"Swordsmanship","rank":2,"root":false,"text":"Sword\\nDagger\\nShield\\nScabbard\\nPoint\\nEdge\\nPommel\\nHilt\\nGuard","effects":{"strength":2},"previous":["Weapons"],"help":["Bronze","Iron"],"era":3},"Armor":{"id":"Armor","name":"Armor","rank":2,"root":false,"text":"Helmet\\nCuirasse\\nShield\\nLeather\\nPlates\\nChainmail","effects":{"strength":2},"previous":["Weapons"],"help":["Bronze","Iron","Clothes"],"era":3},"Plastic":{"id":"Plastic","name":"Plastic","rank":6,"root":false,"text":"Bakelite\\nNylon\\nVinyl","effects":{"prod":7},"previous":["Steel"],"help":["Oil"],"era":10},"Tribe":{"id":"Tribe","name":"Tribe","rank":0,"root":true,"text":"Tents\\nStrongman\\nLineage\\nKinship\\nWarriors","effects":{"social":5},"previous":[],"help":[],"era":1},"Village":{"id":"Village","name":"Village","rank":1,"root":false,"text":"Strongman\\nKinship\\nFamily\\nChief\\nWarriors","effects":{"social":2},"previous":["Tribe"],"help":[],"era":2},"Chiefdom":{"id":"Chiefdom","name":"Chiefdom","rank":2,"root":false,"text":"Chief\\nKing\\nFamily\\nWarriors","effects":{"social":3},"previous":["Village"],"help":[],"era":3},"Monarchy":{"id":"Monarchy","name":"Monarchy","rank":3,"root":false,"text":"King\\nMinister\\nLineage\\nLaws\\nSoldiers","effects":{"social":4},"previous":["Chiefdom"],"help":["Monotheism"],"era":4},"Theocracy":{"id":"Theocracy","name":"Theocracy","rank":4,"root":false,"text":"Priest\\nClergy\\nInquisition","effects":{"strength":1,"social":4},"previous":["Monarchy"],"help":["Monotheism"],"era":5},"Empire":{"id":"Empire","name":"Empire","rank":4,"root":false,"text":"King\\nEmpire\\nLaws\\nBureaucracy\\nSoldiers","effects":{"social":5},"previous":["Monarchy"],"help":[],"era":5},"Construction":{"id":"Construction","name":"Construction","rank":2,"root":false,"text":"Porch\\nBeams\\nHut\\nHouse","effects":{"social":1},"previous":["Village"],"help":[],"era":3},"Stonecraft":{"id":"Stonecraft","name":"Stonecraft","rank":3,"root":false,"text":"Flint\\nLimestone\\nGranite","effects":{"prod":1},"previous":["Construction"],"help":[],"era":4},"Architecture":{"id":"Architecture","name":"Architecture","rank":4,"root":false,"text":"Porch\\nBeams\\nHut\\nHouse","effects":{"social":2},"previous":["Stonecraft"],"help":[],"era":5},"City":{"id":"City","name":"City","rank":2,"root":false,"text":"Forum\\nTemplate\\nGranary\\nCitizens\\nFamily\\nLaws","effects":{"social":3},"previous":["Village"],"help":["Architecture"],"era":3},"Republic":{"id":"Republic","name":"Republic","rank":3,"root":false,"text":"Forum\\nTemplate\\nGranary\\nCitizens\\nLaws\\nParliament","effects":{"social":4},"previous":["City"],"help":[],"era":4},"Democracy":{"id":"Democracy","name":"Democracy","rank":4,"root":false,"text":"Forum\\nTemplate\\nGranary\\nCitizens\\nLaws\\nParliament","effects":{"social":4},"previous":["Republic"],"help":[],"era":5},"Wheel":{"id":"Wheel","name":"Wheel","rank":0,"root":false,"text":"Cart","effects":{"prod":1},"previous":[],"help":["Tools"],"era":1},"Pottery":{"id":"Pottery","name":"Pottery","rank":1,"root":false,"text":"Clay\\nPots\\nKiln\\nBricks","effects":{"food":1},"previous":["Wheel"],"help":["Firewood","Cultivation"],"era":2},"Earthenware":{"id":"Earthenware","name":"Earthenware","rank":2,"root":false,"text":"Jugs\\nBottles\\nPlates","effects":{"food":2},"previous":["Pottery"],"help":[],"era":3},"Stoneware":{"id":"Stoneware","name":"Stoneware","rank":3,"root":false,"text":"Jugs\\nBottles\\nPlates","effects":{"food":3},"previous":["Earthenware"],"help":[],"era":4},"Porcelain":{"id":"Porcelain","name":"Porcelain","rank":4,"root":false,"text":"Jugs\\nBottles\\nPlates","effects":{"food":4},"previous":["Stoneware"],"help":["Coal"],"era":5},"Chariot":{"id":"Chariot","name":"Chariot","rank":2,"root":false,"text":"Horse\\nBow\\nSpear","effects":{"strength":3},"previous":["Weapons"],"help":["Cattle","Wheel"],"era":3},"Cavalry":{"id":"Cavalry","name":"Chariot","rank":3,"root":false,"text":"Horse\\nSword\\nSpear\\nShield","effects":{"strength":4},"previous":["Chariot"],"help":[],"era":4},"Band":{"id":"Band","name":"Band","rank":1,"root":false,"text":"Chief\\nWarriors","effects":{"strength":1},"previous":["Tribe"],"help":["Weapons"],"era":2},"Army":{"id":"Army","name":"Army","rank":2,"root":false,"text":"Chief\\nLeader\\nSoldiers","effects":{"strength":2},"previous":["Band"],"help":["City"],"era":3}}')},fe9a:function(e,t,n){}});
//# sourceMappingURL=app.edd7a65a.js.map