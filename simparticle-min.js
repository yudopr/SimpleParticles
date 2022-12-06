class SimpleParticle{static#t="http://www.w3.org/2000/svg";#e=[];#a=0;#r;#i={count:10,duration:{from:5,to:7},type:"circle",colorOverlife:!0,idleDie:{active:!0,idleTime:5},playState:{repeat:-1,yoyo:0},start:{x:{from:0,to:300},y:{from:-50,to:-10},opacity:{from:.5,to:.8},size:{from:7.5,to:10.5},rotation:{from:0,to:0},color:"random"},end:{x:{from:0,to:300},y:{from:300,to:320},opacity:{from:.3,to:.5},size:{from:.5,to:1},rotation:{from:0,to:0},color:"white"},filter:{blur:{active:!0,value:1}}};constructor(t,e){this.#r=t,this.#o(this.#r,e||this.#i)}#o(t,e){for(var a=gsap.timeline({defaults:{force3D:!0,ease:"sine.inOut",onStart:this.#l,onStartParams:[e,this.#e],onComplete:()=>{},repeat:e.playState.repeat,yoyo:e.playState.yoyo}}),r=e.count,i=document.querySelector(t),o=this.#n(i,e,!0),l=0;l<r;l++){var n=document.createElementNS(SimpleParticle.#t,"circle");i.childElementCount<r&&(n.setAttribute("id",o.getElementsByTagName("g")[0].getAttribute("id")+"-"+l),o.getElementsByTagName("g")[0].appendChild(n),a.set(n,{attr:{cx:`random(${e.start.x.from}, ${e.start.x.to}, 1)`,cy:`random(${e.start.y.from}, ${e.start.y.to}, 1)`,r:`random(${e.start.size.from}, ${e.start.size.to})`,fill:"random"==e.start.color?this.#s():e.start.color},opacity:`random(${e.start.opacity.from}, ${e.start.opacity.to})`},0),n.params=e,this.#m(n,a))}return i.appendChild(o),this.#e.push(a),this.isParticlesPlaying()||this.#e.forEach((t=>{t.play(Math.floor(Math.random()*(e.playState.repeat<0?3105:t.duration()))+1)})),this.#e}addParticle(t,e){e||(e=this.#i);for(var a=gsap.timeline({defaults:{force3D:!0,ease:"sine.inOut",onStart:this.#l,onStartParams:[e,this.#e],onComplete:()=>{},repeat:e.playState.repeat,yoyo:e.playState.yoyo}}),r=e.count,i=document.querySelector(t),o=this.#n(i,e),l=o.getElementsByTagName("g")[o.getElementsByTagName("g").length-1],n=0;n<r;n++){var s=document.createElementNS(SimpleParticle.#t,"circle");s.setAttribute("id",l.getAttribute("id")+"-"+n),i.childElementCount<r&&(l.appendChild(s),a.set(s,{attr:{cx:`random(${e.start.x.from}, ${e.start.x.to}, 1)`,cy:`random(${e.start.y.from}, ${e.start.y.to}, 1)`,r:`random(${e.start.size.from}, ${e.start.size.to})`,fill:"random"==e.start.color?this.#s():e.start.color},opacity:`random(${e.start.opacity.from}, ${e.start.opacity.to})`},0),s.params=e,this.#m(s,a))}return i.appendChild(o),this.#e.push(a),this.isParticlesPlaying()||this.#e.forEach((t=>{t.play(Math.floor(Math.random()*(e.playState.repeat<0?3105:t.duration()))+1)})),this.#e}#m(t,e){var a=`random(${Math.round(t.params.duration.from)}, ${Math.round(t.params.duration.to)})`;return e.to(t,{duration:a,attr:{cy:`random(${t.params.end.y.from}, ${t.params.end.y.to}, 1)`},ease:"none"},.1),e.to(t,{duration:a,attr:{cx:`+=${gsap.utils.random(t.params.end.x.from,t.params.end.x.to,1)}`}},.2),e.to(t,{duration:a,attr:{r:`random(${t.params.end.size.from}, ${t.params.end.size.to})`}},.1),e.to(t,{duration:a,attr:{fill:t.params.colorOverlife?"random"==t.params.end.color?this.#s():t.params.end.color:t.params.start.color}},.1),e.to(t,{duration:a,opacity:`random(${t.params.end.opacity.from}, ${t.params.end.opacity.to})`},.1),e.to(t,{duration:a,rotation:`random(${t.params.end.rotation.from}, ${t.params.end.rotation.to}, 1)`},.1),e}playParticle(t,e){this.#e[t].play(e||this.#e[t].time())}playParticles(){this.#e.forEach((t=>{t.play(t.time())}))}pauseParticle(t){this[t].pause()}pauseParticles(){this.#e.forEach((t=>{t.pause()}))}isParticlesPlaying(){var t=[];return this.#e.forEach((e=>{t.push(e.isActive())})),t.reduce((function(t,e){return t&&e}),t[0])}destroyParticle(t){this.pauseParticles(),document.querySelector(t).innerHTML=""}#n(t,e,a){var r;if(a){var i;if((r=document.createElementNS(SimpleParticle.#t,"svg")).id="svgParticleContainer",r.class="container",r.setAttribute("width","100%"),r.setAttribute("height","100%"),r.setAttribute("viewBox",`0 0 ${t.offsetWidth} ${t.offsetHeight}`),(i=document.createElementNS(SimpleParticle.#t,"g")).id="particle_set"+this.#a,r.appendChild(i),r.appendChild(document.createElementNS(SimpleParticle.#t,"defs")),e.filter.blur.active){let t=this.#c(i,e);r.getElementsByTagName("defs")[0].appendChild(t)}return this.#a++,r}if(r=document.querySelector("#svgParticleContainer"),(i=document.createElementNS(SimpleParticle.#t,"g")).id="particle_set"+this.#a,e.filter.blur.active){let t=this.#c(i,e);r.getElementsByTagName("defs")[0].appendChild(t)}return this.#a++,r.appendChild(i),r}#c(t,e){let a=document.createElementNS(SimpleParticle.#t,"filter"),r=document.createElementNS(SimpleParticle.#t,"feGaussianBlur");return r.setAttribute("stdDeviation",e.filter.blur.value),a.setAttribute("id","blur-effect"+this.#a),a.appendChild(r),t.style.filter="url(#blur-effect"+this.#a+")",a}#l(t,e){gsap.delayedCall(t.idleDie.idleTime,(function(){t.idleDie.active&&e.length>0&&e.forEach((t=>{t.pause()}))}))}#s(){return"#"+Math.floor(16777215*Math.random()).toString(16)}#d(t,e){return Math.floor(Math.random()*(Math.floor(e)-Math.ceil(t)+1)+Math.ceil(t))}}