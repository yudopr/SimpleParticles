window.addEventListener('DOMContentLoaded', onDOMLoaded);

function onDOMLoaded(e) {
    var theParticles = setupParticles('particle_container', 'snow', snowParams); // particle index 0
    playParticle(0, 70);

    document.querySelector('#main').addEventListener('click', () => {
        console.log('Hello', theParticles.isParticlesPlaying());
        // theParticles.isParticlesPlaying();
        if(theParticles.isParticlesPlaying()){
             pauseParticle(0);
        }else{
            playParticle(0);
        }
    })

}