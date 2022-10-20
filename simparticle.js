/**
 * Simple Particle Engine using SVG+GSAP
 * This class depend on the GSAP to animate the particles
 * @class SimpleParticle
 */
class SimpleParticle{
    
    static #SVGNS = "http://www.w3.org/2000/svg";
    #timelines = [];
    #particleSetCount = 0;
    #containerID;
    // default params
    #params = {
        count: 10, /* particle count */
        duration: {from:5, to:7}, /* duration range, the bigger the slower particles are moving */
        type: 'circle', /* can be circle, square, text or img*/
        colorOverlife: true, /* if true, the particle colour will change from start to end. If false, the particle colour will take starting color only */
        idleDie: {
            active: true, /* if true, timer will start on given time below */
            idleTime: 5 /* in second before animation stop when no interaction */
        },
        playState:{
            repeat: -1, /* -1 or 0 to repeat endlessly, 2 to repeat the particles 2 times, 3  to repeat the particles 2 times, and so on */
            yoyo: 0 /* 0 for to loop cycle the timeline, 1 to loop the timeline back and forth*/
        },
        start:{
            x:{from:0, to:300},
            y:{from:-50, to:-10},
            opacity:{from:0.5, to:0.8},
            size:{from:7.5, to:10.5},
            rotation:{from:0, to:0},
            color: 'random' /* random return random color from #000000 to #ffffff, any other CSS acceptable colours */
        },
        end:{
            x:{from:0, to:300},
            y:{from:300, to:320},
            opacity:{from:0.3, to:0.5},
            size:{from:.5, to:1},
            rotation:{from:0, to:0},
            color: 'white' /* random return random color from #000000 to #ffffff, any other CSS acceptable colours */
        },
        filter:{ /* this effects is heavy resource, it will slows down your machine if use carelessly */
            blur:{
                active: true,
                value: 1
            }, /* another filter to be added */
        }
    };
    
    constructor(_containerID, _params){
        this.#containerID = _containerID;
        this.#setupParticles(this.#containerID, _params ? _params : this.#params);
    }
    /**
     * setupParticles function
     * private function to setup an inline SVG inside given div container
     * 
     * @param {*} _containerID an HTMLElement id 
     * @param {*} _particles_class an HTMLElement class for the particle style
     * @param {*} _params particle animation parameters
     * @return {*} Array of GSAP TimelineMax
     */
    #setupParticles(_containerID, _params){
        var timeline = gsap.timeline({
            defaults: {
                force3D: true,
                ease: 'sine.inOut',
                onStart: this.#idleStop,
                onStartParams: [_params, this.#timelines],
                onComplete: ()=>{console.log('Finished');},
                repeat: _params.playState.repeat,
                yoyo: _params.playState.yoyo
            }
        });
        var total = _params.count , container = document.querySelector(_containerID);
        var svgElement = this.#createParticleContainer(container, _params, true);
        for (var i=0 ; i<total; i++){ 
            var circ = document.createElementNS(SimpleParticle.#SVGNS, 'circle');   
                if(container.childElementCount < total) {
                svgElement.getElementsByTagName('g')[0].appendChild(circ);
                timeline.set(circ, {
                    attr: {
                        cx: `random(${_params.start.x.from}, ${_params.start.x.to}, 1)`,
                        cy: `random(${_params.start.y.from}, ${_params.start.y.to}, 1)`,
                        r: `random(${_params.start.size.from}, ${_params.start.size.to})`,
                        fill: _params.start.color == 'random' ? this.#randomColor() : _params.start.color
                    },
                    opacity: `random(${_params.start.opacity.from}, ${_params.start.opacity.to})`
                }, 0);
                circ.params = _params;
                this.#animateParticle(circ, timeline);
            }
        };
        container.appendChild(svgElement);
        this.#timelines.push(timeline);
        if(!this.isParticlesPlaying()){
            this.#timelines.forEach(element => {
                element.play(Math.floor(Math.random() * (_params.playState.repeat < 0 ? 3105 : element.duration()))+1);
            });
        }
        return this.#timelines;
    }
    
    addParticle(_containerID, _params){
        if(!_params) _params = this.#params;
        var timeline = gsap.timeline({
            defaults: {
                force3D: true,
                ease: 'sine.inOut',
                onStart: this.#idleStop,
                onStartParams: [_params, this.#timelines],
                onComplete: ()=>{console.log('Finished');},
                repeat: _params.playState.repeat,
                yoyo: _params.playState.yoyo
            }
        });
        var total = _params.count , container = document.querySelector(_containerID);
        var svgElement = this.#createParticleContainer(container, _params);
        var group = svgElement.getElementsByTagName('g')[svgElement.getElementsByTagName('g').length-1];
        for (var i=0 ; i<total; i++){ 
            var circ = document.createElementNS(SimpleParticle.#SVGNS, 'circle');   
                if(container.childElementCount < total) {
                group.appendChild(circ);
                timeline.set(circ, {
                    attr: {
                        cx: `random(${_params.start.x.from}, ${_params.start.x.to}, 1)`,
                        cy: `random(${_params.start.y.from}, ${_params.start.y.to}, 1)`,
                        r: `random(${_params.start.size.from}, ${_params.start.size.to})`,
                        fill: _params.start.color == 'random' ? this.#randomColor() : _params.start.color
                    },
                    opacity: `random(${_params.start.opacity.from}, ${_params.start.opacity.to})`
                }, 0);
                circ.params = _params;
                this.#animateParticle(circ, timeline);
            }
        };
        container.appendChild(svgElement);
        this.#timelines.push(timeline);
        if(!this.isParticlesPlaying()){
            this.#timelines.forEach(element => {
                element.play(Math.floor(Math.random() * (_params.playState.repeat < 0 ? 3105 : element.duration()))+1);
            });
        }
        return this.#timelines;
    }
    /**
     * animateParticle function
     * private function to animate every single particle based on given parameters
     * @param {*} elm single element generated by setupParticles function
     * @param {*} _tl GSAP TimelineMax generated by setupParticles function
     * @return {*} GSAP TimelineMax
     */
    #animateParticle(elm, _tl){
        var randomDuration = `random(${Math.round(elm.params.duration.from)}, ${Math.round(elm.params.duration.to)})`;
        /* Y-Axis animation */
        _tl.to(elm, {
            duration: randomDuration,
            attr: {
                cy: `random(${elm.params.end.y.from}, ${elm.params.end.y.to}, 1)`
            },
            ease: "none",
        }, .1);
        /* X-Axis animation */
        _tl.to(elm, {
            duration: randomDuration,
            attr: {
                cx: `random(${elm.params.end.x.from}, ${elm.params.end.x.to}, 1)`
            }
        }, .2);
        /* Size animation */
        _tl.to(elm, {
            duration: randomDuration,
            attr: {
                r: `random(${elm.params.end.size.from}, ${elm.params.end.size.to})`
            },
        }, .1);
        /* Color Fill animation */
        _tl.to(elm, {
            duration: randomDuration,
            attr: {
                fill: elm.params.colorOverlife ? elm.params.end.color == 'random' ? this.#randomColor() : elm.params.end.color : elm.params.start.color
            },
        }, .1);
        /* Opacity animation */
        _tl.to(elm, {
            duration: randomDuration,
            opacity: `random(${elm.params.end.opacity.from}, ${elm.params.end.opacity.to})`,
        }, .1);
        /* Rotation animation */
        _tl.to(elm, {
            duration: randomDuration,
            rotation: `random(${elm.params.end.rotation.from}, ${elm.params.end.rotation.to}, 1)`,
        }, .1);
        return _tl;
    };
    /**
     * playParticle function
     * public function to play specific particle set in the specific time
     * @param {*} _index index of target GSAP timeline within the SVG
     * @param {*} _sec specific second of the particle animation in lifecycle
     */
    playParticle(_index, _sec){
        this.#timelines[_index].play(_sec ? _sec : this.#timelines[_index].time());
    }
    /**
     * playParticles function
     * public function to play all particles in the stage from current position
     */
    playParticles(){
        this.#timelines.forEach(timeline => {
            timeline.play(timeline.time());
        });
    }
    /**
     * pauseParticle function
     * public function pause specific particle set
     * @param {*} _index index of target GSAP timeline
     */
    pauseParticle(_index){
        this[_index].pause();
    }
    /**
     * pauseParticles function
     * public function pause all particles in the stage
     */
    pauseParticles(){
        this.#timelines.forEach(timeline => {
            timeline.pause();
        });
    }

    /**
     * isParticlesPlaying
     * public function to get playing states of the particles
     * @return {*} boolean of playing states of the particles
     * @memberof SimpleParticle
     */
    isParticlesPlaying(){
        var tlActiveStatus = [];
        this.#timelines.forEach(element => {
            tlActiveStatus.push(element.isActive());
        });
        return tlActiveStatus.reduce(function (a, b) {
            return a && b
        }, tlActiveStatus[0]);
    }
    /**
     * destroyParticle function
     * public function if you don't need it, just destroy it. Only looser hide the things!
     * @param {*} _containerID HTMLElement id that contain the particles
     */
    destroyParticle(_containerID){
        this.pauseParticles();
        document.querySelector(_containerID).innerHTML = ''; 
    }
    /**
     * createParticleContainer function
     * private function to generate inline SVG to contain all particles
     * @param {*} _parentElement given parent name
     * @param {*} _isNewParticle check if the caller need to create new instance of SVG or add a new group
     * @return {*} The root of SVGElement
     */
    #createParticleContainer(_parentElement, _params, _isNewParticle) {
        var svgElement;
        if(_isNewParticle){
            svgElement = document.createElementNS(SimpleParticle.#SVGNS, "svg");
            svgElement.id = "svgParticleContainer";
            svgElement.class = "container";
            svgElement.setAttribute('width', '100%');
            svgElement.setAttribute('height', '100%');
            svgElement.setAttribute('viewBox', `0 0 ${_parentElement.offsetWidth} ${_parentElement.offsetHeight}`);
            
            var group = document.createElementNS(SimpleParticle.#SVGNS, "g");
            group.id = "particle_set" + this.#particleSetCount;
            svgElement.appendChild(group);
            
            svgElement.appendChild(document.createElementNS(SimpleParticle.#SVGNS, "defs")); // for future update of using SVG filters
            if(_params.filter.blur.active){
                let blurFilter = this.#createFilter(group, _params);
                svgElement.getElementsByTagName('defs')[0].appendChild(blurFilter);
            }
            
            this.#particleSetCount++;
            return svgElement;
        }else{
            svgElement = document.querySelector('#svgParticleContainer');
            var group = document.createElementNS(SimpleParticle.#SVGNS, "g");
            group.id = "particle_set" + this.#particleSetCount;
            if(_params.filter.blur.active){
                let blurFilter = this.#createFilter(group, _params);
                svgElement.getElementsByTagName('defs')[0].appendChild(blurFilter);
            }
            this.#particleSetCount++;
            svgElement.appendChild(group);
            return svgElement; 
        }
    }
    #createFilter(_target, _params) {
        let filter = document.createElementNS(SimpleParticle.#SVGNS, "filter");
        let gaussian = document.createElementNS(SimpleParticle.#SVGNS, "feGaussianBlur");
        gaussian.setAttribute("stdDeviation", _params.filter.blur.value);
        filter.setAttribute("id", "blur-effect"+this.#particleSetCount);
        filter.appendChild(gaussian);
        _target.style.filter = "url(#blur-effect"+this.#particleSetCount+")";
        return filter;
    }
    /**
     * idleStop function
     * private function to stop any animation after specific amount of time
     * @param {*} _params particle parameter
     */
    #idleStop(_params, _timelines){
        gsap.delayedCall(_params.idleDie.idleTime, function(){
            if(_params.idleDie.active){
                /* pause all particles */
                if(_timelines.length > 0){
                    _timelines.forEach(element => {
                        element.pause();
                    });
                };
            }
        })
    }
    /**
     * randomColor function
     * private function to generate random color in hexadecimal format
     * @return {*} return a single random color in hexadecimal format
     */
    #randomColor(){
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
}