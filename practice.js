
const canvas = document.querySelector("#canvas_2")
const ctx = canvas.getContext("2d")
const particlesArr = []
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let hue = 0

window.addEventListener("resize", () => {
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const mouse = {
    x: null,
    y: null
}

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.x
    mouse.y = event.y
    for (let i = 0; i < 10; i++) {    
       particlesArr.push(new Particle)
    }
})
canvas.addEventListener("click", (event) => {
    mouse.x = event.x
    mouse.y = event.y
    for (let i = 0; i < 10; i++) {    
       particlesArr.push(new Particle)
    }
})


// create circle particles
class Particle {
    constructor() {

        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 6 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `hsl(${hue}, 100%, 50%)`
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.2) {
            this.size -= 0.1
        }
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}


function handleParticles() {
    for(let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update()
        particlesArr[i].draw()
        for (let j = i; j < particlesArr.length; j++) {
            // find distance between particles using pythagoras theorem
            const dx = particlesArr[i].x - particlesArr[j].x
            const dy = particlesArr[i].y  - particlesArr[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)
    
            if (distance < 40) {

                ctx.beginPath()
                ctx.strokeStyle = particlesArr[i].color
                ctx.lineWidth = 0.2
                ctx.moveTo(particlesArr[i].x, particlesArr[i].y)
                ctx.lineTo(particlesArr[j].x, particlesArr[j].y)
                ctx.stroke()
            }
        }

        if(particlesArr[i].size <= 0.9) {
            particlesArr.splice(i, 1)
            i--
            
        }

       
    }
}


function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleParticles()
    hue+= 1
    requestAnimationFrame(animateParticles)
   
}
animateParticles()







