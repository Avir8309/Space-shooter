console.log(gsap);
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
const score=document.querySelector('#sco');

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.x = x;
    this.y = y;
    this.draw();
  }
}
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.x = this.x + this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}
class enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.x = this.x + this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}
class particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha=1;
  }
  draw() {
    c.save();
    c.globalAlpha=this.alpha;
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore();
    this.alpha-=0.005;
  }
  update() {
    this.draw();
    this.velocity.x*=0.99;
    this.velocity.y+=0.03;
    this.x = this.x + this.velocity.x;
    this.y += this.velocity.y;
    
    this.alpha-=0.01;
    
  }
}
let scor=0;
const enemies = [];
function spawnenemies() {
  setInterval(() => {
    const radius = 60*(Math.random()+0.2);
    const color = colorarray[Math.floor(Math.random() * 6)];
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;

    } else {
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      x = Math.random() * canvas.width;
    }
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new enemy(x, y, radius, color, velocity));
    console.log("yo");
  }, 1000);
}
const projectiles = [];
let animationid;
const colorarray = [
  "#B3FFAE",
  "#FF6464",
  "#E0144C",
  "#EA047E",
  "#FCE700",
  "#00FFD1",
];


let particles=[];
function animate() {
  animationid = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  projectiles.forEach((projectile) => {
    projectile.update();
  });
  particles.forEach((particle,index)=>{
    particle.update();
    if(particle.alpha<=0){
      particles.splice(index,1);
    }
    else{
      particle.update();
    }
    
  })
  enemies.forEach((enemy, index) => {
    enemy.update();
    const d = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (d - player.radius - enemy.radius < 1) {
      cancelAnimationFrame(animationid);
    }
    projectiles.forEach((projectile, projectileindex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
      if (dist - projectile.radius - enemy.radius < 1) {
        scor+=100;
        score.innerHTML=scor;
        const ang=(Math.PI*2)/50;
        for(let i=0;i<50;i++){

            
          particles.push(new particle(enemy.x,enemy.y,3,enemy.color,{
            x:3*Math.cos(ang*i)*Math.random(),
            y:3*Math.sin(ang*i)*Math.random()
          }))
        }
        

        if (enemy.radius > 30) {
          gsap.to(enemy,{
            radius: enemy.radius-30
          })
          
          projectiles.splice(projectileindex, 1);
          
        } else {

          
         
          
          
          enemies.splice(index, 1);
          projectiles.splice(projectileindex, 1);
        }
      }
    });
  });
  player.update();
}
window.addEventListener("click", (Event) => {
  const angle = Math.atan2(
    Event.clientY - canvas.height / 2,
    Event.clientX - canvas.width / 2
  );
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 10, "#F7ECDE", {
      x: 20 * Math.cos(angle),
      y: 20 * Math.sin(angle),
    })
  );

  console.log("go");
});
const x = innerWidth / 2;
const y = innerHeight / 2;
const player = new Player(x, y, 30, "#DFF6FF");
player.draw();

animate();
spawnenemies();
