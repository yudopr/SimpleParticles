window.addEventListener('DOMContentLoaded', onDOMLoaded);

let particleParams = {
    count: 50, /* particle count */
    duration: {from:5, to:7}, /* duration range, the bigger the slower particles are moving */
    type: 'circle', /* can be circle, square, text or img*/
    colorOverlife: true, /* if true, the particle colour will change from start to end. If false, the particle colour will take starting color only */
    idleDie: {
        active: true, /* if true, timer will start on given time below */
        idleTime: 10 /* in second before animation stop when no interaction */
    },
    playState:{
        repeat: -1, /* -1 for repeat endlessly, 2 to repeat the particles 2 times, 3  to repeat the particles 2 times, and so on */
        yoyo: 0 /* 0 for to loop cycle the timeline, 1 to loop the timeline back and forth*/
    },
    start:{
        x:{from:0, to:300},
        y:{from:-50, to:-10},
        opacity:{from:0.5, to:0.8},
        size:{from:5, to:5.5},
        rotation:{from:0, to:0},
        color: 'random' /* random return random color from #000000 to #ffffff, any other CSS acceptable colours */
    },
    end:{
        x:{from:0, to:300},
        y:{from:300, to:320},
        opacity:{from:0.3, to:0.5},
        size:{from:1, to:1.5},
        rotation:{from:0, to:0},
        color: 'orange' /* random return random color from #000000 to #ffffff, any other CSS acceptable colours */
    },
};

function onDOMLoaded(e) {
    var theParticles = setupParticles('particle_container', particleParams); // particle index 0
    theParticles.playParticle(0, 150);

    document.querySelector('#main').addEventListener('click', () => {
        if(theParticles.isParticlesPlaying()){
            theParticles.pauseParticles();
        }else{
            theParticles.playParticles();
        }
    })
}