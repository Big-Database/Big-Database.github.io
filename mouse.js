const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 0; 
 
function scrollWinCon(id){
    const targetElement = document.getElementById(id);
    window.scrollTo(0, targetElement.offsetTop);
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined, 

}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(event);
    for (let i = 0; i < 10 ; i++){
        particleArray.push(new Particle());
    }
})


canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x; 
    mouse.y = event.y; 
    particleArray.push(new Particle())
});

class Particle{
    constructor(){
        this.x = mouse.x; 
        this.y = mouse.y; 
        //this.x = Math.random() * canvas.width; 
        //this.y = Math.random() * canvas.height; 
        this.size = Math.random() * 8 + 1;
        this.speedX = Math.random()*3 -1.5; 
        this.speedY = Math.random()*3 -1.5; 
        this.color = 'hsl(' + hue+',100%, 50%)'

    }
    update(){ // shifts the particle position from the mouse to somewhere else
        this.x += this.speedX;
        this.y += this.speedY; //2D movement on Canvas 
        if(this.size > 0 ){
            this.size -= 0.1
        }
    }
    draw(){
        ctx.fillStyle = 'hsl('+ hue+',100%, 50%)';
        ctx.lineWidth = 1
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

}
//function init(){
  //  for (let i = 0; i <100; i++){
    //    particleArray.push(new Particle());
    //}
//}
//init();

function handleParticles(){
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].update(); 
        particleArray[i].draw(); 
        for(let j = i; j < particleArray.length; j++){
            const dx = particleArray[i].x - particleArray[j].x
            const dy  = particleArray[i].y - particleArray[j].y
            const dist = Math.sqrt(dx*dx + dy*dy); 
            if(dist < 100){
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color; 
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke(); 

            }
        }
        if(particleArray[i].size <= 0.3){
            particleArray.splice(i, 1);
            i--; 
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the entire canvas
    //ctx.fillStyle = 'rgb(0,0,0,0.01)'; 
    //ctx.fillRect(0,0, canvas.width, canvas.height); // covers the old paint again and agains
    handleParticles();
    console.log(particleArray.length);
    requestAnimationFrame(animate);  
    hue += 2; 
}
animate(); 
