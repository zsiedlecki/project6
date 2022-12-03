
console.log("CIRCLE")
class Circle {
	// Create a branching system  Each branch can hold other branches
	constructor(aof) {
		
		this.aof = aof
		this.center = new Vector()

		
	}


	update(p, t, dt) {
		
	}	

	draw(p) {
		let t = p.millis()*.001

		// All values are [0,1]
		let hue = this.aof.get("hue")*360
		let radius = (this.aof.get("radius")*40) + 15
		let bounceSpeed = this.aof.get("bounceSpeed")*4 + 1

		let bounce = 10*Math.sin(t*bounceSpeed)

		p.push()
		p.translate(0, -radius + bounce)

		for (var i = 0; i < 5; i++) {
			p.push()
			p.translate(20*Math.sin(t + i), -i*radius*1.6)

			p.fill(hue, 100, 50)
			p.circle(0, 0, radius)

			p.fill(hue, 100, 80)
			p.ellipse(0, -radius*.4, radius*.6, radius*.4)

			p.pop()
		}
	
		p.pop()

		// let angle = this.aof.get("angle")
		// p.push()
		// p.rotate(angle)
		// let w = this.aof.get("width")*100 + 50
		// let h = this.aof.get("height")*300 + 100
		
		// p.fill(hue, 100, 50)
		// p.rect(0, 0, w, -h)
		// p.pop()
	}
}






// Optional background: drawn once per population
Circle.drawBackground = function(p) {
	p.background(190, 80, 90)
}

// Static properties for this class
Circle.landmarks = {
	"christine": [0.24,0.86,0.47,0.81,0.44,0.31,0.01],
	"herbert": [0.80,0.00,0.00,0.86,0.93,0.94,0.84],
	"sharon": [0.98,0.39,0.15,0.89,0.74,0.44,0.49],
	"carlos": [0.88,0.60,0.24,0.44,0.44,0.70,0.53],
	"tyler": [0.67,0.16,1.00,0.81,0.21,0.00,0.01]
}
Circle.labels = ["hue", "radius", "bounceSpeed"]

