/* Simple Particle Engine using SVG+GSAP */
var particleSets = {active:false, id:''};
var timelines = [];
const svgns = "http://www.w3.org/2000/svg";
/**
 * setupParticles function
 * setup an inline SVG inside given div container
 * 
 * @param {*} _containerID an HTMLElement id 
 * @param {*} _particles_class an HTMLElement class for the particle style
 * @param {*} _params particle animation parameters
 * @return {*} GSAP TimelineMax
 */
function setupParticles(_containerID, _params){
    var timeline = gsap.timeline({defaults:{force3D:true, ease:'sine.inOut', onStart:idleStop, onStartParams:[_params], repeat:_params.playState.repeat, yoyo:_params.playState.yoyo}});
    if(_containerID != particleSets.id){
        var total = _params.count , container = document.getElementById(_containerID) ,
        w = container.offsetWidth , h = container.offsetHeight;
        var svgElement = createParticleContainer(container);
        for (var i=0 , div ; i<total; i++){ 
            circ = document.createElementNS(svgns, 'circle');   
                if(container.childElementCount < total) {
                svgElement.getElementsByTagName('g')[0].appendChild(circ);
                timeline.set(circ, {
                    attr: {
                        cx: `random(${_params.start.x.from}, ${_params.start.x.to}, 1)`,
                        cy: `random(${_params.start.y.from}, ${_params.start.y.to}, 1)`,
                        r: `random(${_params.start.size.from}, ${_params.start.size.to})`,
                        fill: _params.start.color == 'random' ? randomColor() : _params.start.color
                    },
                    opacity: `random(${_params.start.opacity.from}, ${_params.start.opacity.to})`
                }, 0);
                circ.params = _params;
                animateParticle(circ, timeline);
            }
        };
        container.appendChild(svgElement);
        particleSets.id = _containerID;
    }
    timelines.push(timeline);
    return timelines;
}

/**
 * animateParticle function
 * animate every single particle based on given parameters
 * @param {*} elm single element generated by setupParticles function
 * @param {*} _tl GSAP TimelineMax generated by setupParticles function
 * @return {*} GSAP TimelineMax
 */
function animateParticle(elm, _tl){   
    /* Y-Axis animation */
    _tl.to(elm, {
        duration: `random(${elm.params.duration.from}, ${elm.params.duration.to})`,
        attr: {
            cy: `random(${elm.params.end.y.from}, ${elm.params.end.y.to}, 1)`
        },
        ease: "none",
    }, .1);
    /* X-Axis animation */
    _tl.to(elm, {
        duration: `random(${elm.params.duration.from}, ${elm.params.duration.to})`,
        attr: {
            cx: `random(${elm.params.end.x.from}, ${elm.params.end.x.to}, 1)`
        },
    }, .1);
    /* Size animation */
    _tl.to(elm, {
        duration: `random(${elm.params.duration.from}, ${elm.params.duration.to})`,
        attr: {
            r: `random(${elm.params.end.size.from}, ${elm.params.end.size.to})`
        },
    }, .1);
    /* Color Fill animation */
    _tl.to(elm, {
        duration: `random(${elm.params.duration.from}, ${elm.params.duration.to})`,
        attr: {
            fill: elm.params.colorOverlife ? elm.params.end.color == 'random' ? randomColor() : elm.params.end.color : elm.params.start.color
        },
    }, .1);
    /* Opacity animation */
    _tl.to(elm, {
        duration: `random(${elm.params.duration.from}, ${elm.params.duration.to})`,
        opacity: `random(${elm.params.end.opacity.from}, ${elm.params.end.opacity.to})`,
    }, .1);
    /* Rotation animation */
    _tl.to(elm, {
        duration: `random(${elm.params.duration.from}, ${elm.params.duration.to})`,
        rotation: `random(${elm.params.end.rotation.from}, ${elm.params.end.rotation.to}, 1)`,
    }, .1);
    return _tl;
};
/**
 * playParticle function
 * play specific particle set in the specific time
 * @param {*} _index index of target GSAP timeline within the SVG
 * @param {*} _sec specific second of the particle animation in lifecycle
 */
Array.prototype.playParticle = function(_index, _sec){
    this[_index].play(_sec ? _sec : timelines[_index].time());
}
/**
 * playParticles function
 * play all particles in the stage from current position
 */
Array.prototype.playParticles = function(){
    this.forEach(timeline => {
        timeline.play(timeline.time());
    });
}
/**
 * pauseParticle function
 * pause specific particle set
 * @param {*} _index index of target GSAP timeline
 */
Array.prototype.pauseParticle = function(_index){
    this[_index].pause();
}
/**
 * pauseParticles function
 * pause all particles in the stage
 */
Array.prototype.pauseParticles = function(){
    this.forEach(timeline => {
        timeline.pause();
    });
}
Array.prototype.isParticlesPlaying = function(){
    return this.reduce((previousValue, currentValue) => previousValue.isActive() && currentValue.isActive(), this[0]);
}
/**
 * destroyParticle function
 * if you don't need it, just destroy it. Only looser hide the things!
 * @param {*} _containerID HTMLElement id that contain the particles
 */
Array.prototype.destroyParticle = function(_containerID){
    document.getElementById(_containerID).innerHTML = ''; 
    particleSets = false;
}

/**
 * createParticleContainer function
 * generate inline SVG to contain all particles
 * @param {*} _parentElement given parent name
 * @return {*} The root of SVGElement
 */
function createParticleContainer(_parentElement) {
    var svgElement = document.createElementNS(svgns, "svg");
    svgElement.id = "svgParticleContainer";
    svgElement.class = "container";
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');
    svgElement.setAttribute('viewBox', `0 0 ${_parentElement.offsetWidth} ${_parentElement.offsetHeight}`);
    svgElement.appendChild(document.createElementNS(svgns, "defs"));
    var group = document.createElementNS(svgns, "g");
    svgElement.appendChild(group);
    return svgElement;
}

/**
 * idleStop function
 * stop any animation after specific amount of time
 * @param {*} _params particle parameter
 */
function idleStop(_params){
    gsap.delayedCall(_params.idleDie.idleTime, function(){
        if(_params.idleDie.active){
            /* pause all particles */
            if(timelines.length > 0) timelines.pauseParticles();
        }
    })
}
/**
 * randomColor function
 * generate random color in hexadecimal format
 * @return {*} return a single random color in hexadecimal format
 */
function randomColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}