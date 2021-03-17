class Sky {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.width = window.innerWidth
    this.height = window.innerHeight
  }

  initCanvas() {
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.ctx.fillStyle = "#000"
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  drawStar(star) {
    this.ctx.save()

    this.ctx.fillStyle = star.color
    this.ctx.beginPath()

    this.ctx.translate(star.x, star.y)
    this.ctx.moveTo(0, 0 - star.radius)

    for (let i = 0; i < 5; i++) {
      this.ctx.rotate(Math.PI / 180 * 36)
      this.ctx.lineTo(0, 0 - star.radius * 0.4)
      this.ctx.rotate(Math.PI / 180 * 36)
      this.ctx.lineTo(0, 0 - star.radius)
    }

    this.ctx.fill()
    this.ctx.restore()
  }

  generateStars(count) {
    let stars = []
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 4 + 1

      stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        color: '#fff',
        radius: radius,
        originalRadius: radius,
        speed: Math.random() * 0.1
      })
    }

    this.stars = stars
  }

  drawStars() {
    this.stars.forEach(star => {
      this.drawStar(star)
    })
  }

  updateStars() {
    this.stars.forEach(star => {
      star.x += star.speed
      star.y -= star.speed * (((this.width / 2) - star.x) / 1750)
      star.radius = star.originalRadius * (Math.random() / 9) + 2

      if (star.x > this.width + 2 * star.radius) {
        star.x = -2 * star.radius
      }
    })
  }

  clearCanvas(){
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  draw() {
    this.clearCanvas()
    this.updateStars()
    this.drawStars()

    window.requestAnimationFrame(()=>this.draw())
  }

  run() {
    this.initCanvas()
    this.generateStars(1000)
    this.draw()
  }
}

const sky = new Sky(document.getElementById('canvas'))
sky.run()