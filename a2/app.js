// Utility functions
// Given a processing object, a loop length, a radius, and an offset (optional)
function getLoopingNoise({
							 p,
							 loopLength,
							 radius,
							 offset = 0
						 }) {
	let t = p.millis()



	// This number should go from 0 to 1 every loopLength seconds
	// And PI*2 radians every loopLength seconds
	let noiseScale = 1
	let loopPct = (t * .001 / loopLength) % 1

	let theta = 2 * Math.PI * loopPct

	// Place to sample the noise from
	let x = radius * Math.cos(theta)
	let y = radius * Math.sin(theta)

	let noiseVal = p.noise(x * noiseScale, y * noiseScale, offset)
	return noiseVal
}


function getP5Element(index) {
	let element = document.getElementById("drawing" + index).getElementsByClassName("drawing-p5holder")[0]
	return element
}


//===========================================================

const WIDTH = 300
const HEIGHT = 300

// Run this function after the page is loaded
document.addEventListener("DOMContentLoaded", function() {
	console.log("Hello, animation!")

	// Rename your drawing here if you want
	let drawingTitles = ["Squares",
		"Transformation Matrixes",
		"Polar Coordinates",
		"Using Functions",
	]
	let mainElement = document.getElementById("main")

	// Ignore this section if you want
	// This is me adding a label and a canvas-holder to each swatch
	// For each drawing
	for (var i = 0; i < 4; i++) {
		let el = document.createElement("div")
		el.className = "drawing"
		el.id = "drawing" + i
		mainElement.append(el)


		// Add a label
		let label = document.createElement("div")
		label.className = "drawing-label"
		label.innerHTML = "Drawing #" + (i + 1) + ": " + drawingTitles[i]
		el.append(label)

		// Add a div to hold the canvas (so we can resize it independently of the outer frame)
		let canvasHolder = document.createElement("div")
		canvasHolder.className = "drawing-p5holder"
		canvasHolder.style = `width:${WIDTH};height:${HEIGHT}`
		el.append(canvasHolder)
	}

	// Comment out these lines to not draw each
	setupDrawing0()
	setupDrawing1()
	setupDrawing2()
	setupDrawing3()
});


function setupDrawing0() {

	// Do things *once, before* P5 starts drawing
	function setup(p) {
		// Create the canvas in the right dimension
		p.createCanvas(WIDTH, HEIGHT);

		// Set the color mode
		// P5 has lots of ways to express colors
		// I like to use HSL mode, because it's also in CSS,
		// and because I find it easy to do colors:
		// p.fill(180,100,10)	// Very dark blue
		// p.fill(180,100,50)	// Medium blue
		// p.fill(180,100,90)	// Very pale blue
		// p.fill(180,50,50)	// Desaturated blue
		// p.fill(170,50,50)	// greener-blue
		// p.fill(190,50,50)	// purpler-blue
		p.colorMode(p.HSL);

		// Set the background to black
		p.background(0);
	}

	// Draw (or do) things *each frame*
	function draw(p) {
		// Paint the previous canvas black to erase it.
		// What happens if you comment this out?
		p.background(0);

		// How many seconds has it been since we started?
		// To make an animation, what you draw will change over *time*
		// P is the processing object.
		// It has lots of methods for tracking time
		// and methods for drawing to the canvas (p.background, p.fill, p.circle...etc)
		let t = p.millis() * .001


		// Save the hue so I can use it several times
		// In HSL, the hue is from 0 to 360.
		// If the hue is more than 360, I can make it loop with "value%360"
		let hue = (t * 100) % 360

		// You'll use lots of loops for this assignment
		// This one draws 10 circles
		// Change it to 100, and see how it changes
		let count = 11
		for (var i = 0; i < count; i++) {

			// It's convenient to save the percentage of where in the count we are
			// That gives you a number you *know* goes from 0 to 1
			let pct = i / count

			// In HSL, the lightness of the color goes from 0-100,
			// So we can set it to our pct*100
			// so the first circle is black and the last one is white
			// and the middle circles are brightly-colored
			p.fill(hue, 100, pct * 100)

			// A stroke (outline) aound the circle will be slightly darker
			// than the main color (pct*100 - 20)
			p.strokeWeight(10)
			p.stroke(hue, 100, pct * 100 - 20)

			// Where are we going to draw a circle?
			// Set x to the pct (from 0 to 1),
			//   multiplied by with width of the canvas
			// That way, the first circle with be on the left,
			//   and the last one will be on the right
			let x = 5 + ((0.5 + 0.5 * Math.sin(t * 1 + i * 1)) * (p.width * 0.835))

			// Try switching between these values for y
			// One of them just uses the pct but no time, so it won't animate
			// The other one uses *time*
			// let y = pct*HEIGHT
			let y = (pct - 0.05) * p.height

			// Draw the rectangle.  The last two parameters are its width and height
			// Try changing them
			p.rect(x, y, 40, 40)

			// You can add text with P5 too, for debugging or for style
			// Uncomment these to label the circles with a number
       p.noStroke()
       ///p.fill(0)
       p.text("Square" + i, x - 20, y - 10)
		}
	}

	// Setup a P5 instance with these draw and setup functions
	// Yes, this code is very weird.  You can ignore it
	let element = getP5Element(0) // My function to get the element for this index
	let myP5 = new p5(function(p) {
		p.setup = () => setup(p)
		p.draw = () => draw(p)
	}, element);
}

function setupDrawing1() {

	function setup(p) {
		p.createCanvas(WIDTH, HEIGHT);
		p.colorMode(p.HSL);
		p.background(0);
	}

	function draw(p) {

		// Or try it with trails
		// p.background(0, 0, 0);
		p.background(0, 0, 0, .03);

		let t = p.frameCount * .025



		// Sometimes its easiest to translate into the center of the screen
		// so that the origin (0,0) is at the center and not the top left
		p.push()
		p.translate(p.width / 2, p.height / 2)

		p.noStroke()
		p.fill(250, 150, 150)

		// See? The (0,0) point is now in the center of the screen
		p.circle(0, 0, 0, 0)


		let sides = 20

		// To make mandalas or other forms of repetition,
		// run your drawing function *multiple times*

		// Here, I'm running it "sides" times,
		// and each time, rotating a little more
		// to create a flower shape
		for (var i = 0; i < sides; i++) {

			p.rotate(Math.PI * 2 / sides)


			// Create a number of dots that are positioned with noise
			let dotCount = 20
			for (var j = 0; j < dotCount; j++) {
				let offsetX = 200 * p.noise(t + 500, j * .1) - 80
				let offsetY = 300 * p.noise(t + 600, j * .1) - 80

				let hue = 360 * i / sides
				p.fill(hue, 100, 30 + 60 * j / dotCount, .5)
				p.circle(offsetX, offsetY - 2, 10)
				p.fill(hue, 100, 90)
				p.circle(offsetX, offsetY, 5)
			}

		}

		// Always match each push to a pop.
		// Pop() resets the translation to where it was at the last
		// pop, no matter how many transformations there were
		p.pop()

	}


	let element = getP5Element(1) // <- Make sure to change this to the right index
	let myP5 = new p5(function(p) {
		p.setup = () => setup(p)
		p.draw = () => draw(p)
	}, element);
}

function setupDrawing2() {

	// Pick out a random hue,
	// and declare it up here in the outer scope
	// where both setup and draw have access to it

	let hue = Math.random() * 360

	function setup(p) {
		p.createCanvas(WIDTH, HEIGHT);
		p.colorMode(p.HSL);
		p.background(0);
	}

	function draw(p) {
		p.background(0, 0, 20)
		let t = p.millis() * .001

		p.push()
		p.translate(p.width / 2, p.height / 2)

		p.noiseDetail(5, 0.3);
		p.scale(0.75);


		let count = 160
		for (var i = 0; i < count; i++) {
			let theta = i * .1 + t

			// I'm using "r" as a radius
			// it gets bigger with bigger i values
			// so it spirals outwards
			// But also I'm adding some noise
			// so it wiggles a bit
			let r = i + 90 * p.noise(i * .8 + t * 40, t)

			// Convert from polar coordinates to x,y
			let x = r * Math.cos(theta)
			let y = r * Math.sin(theta)

			p.line(0, 0, x, y)
			p.fill(100, 100, 100)
			p.circle(x, y, i * .075 + 1)

		}


		p.pop()
	}


	let element = getP5Element(2) // <- Make sure to change this to the right index
	let myP5 = new p5(function(p) {
		p.setup = () => setup(p)
		p.draw = () => draw(p)
	}, element);
}

function setupDrawing3() {

	let hue = Math.random() * 360
	let loopLength = 6



	function setup(p) {
		p.createCanvas(WIDTH, HEIGHT);
		p.colorMode(p.HSL);
		p.background(0);
	}

	function draw(p) {
		p.background(0, 0, 0)

		let t = p.millis() * .0015

		p.push()
		p.translate(p.width / 2, p.height / 2)

		// Make a blue-purple gradient by stacking circles
		for (var i = 0; i < 6; i++) {
			p.fill(210 + i * 10, 100, 20, .1)
			let r = 1 + .2 * i
			p.ellipse(0, 0, r * 200, r * 140)
		}

		// Here's a function to draw a star that fades out as it ages
		function drawStar(index, agePct) {

			// Flicker 10 times per lifespan
			let blink = .4 + .3 * Math.sin(agePct * Math.PI * 20)
			p.fill(0, 100, 100, blink)
			//p.circle(0, 0, 5)

			//p.fill((index * 20) % 360, 100, 80, fade * blink * .1)
			p.circle(0, 0, 10 * blink)

			//p.fill(0, 100, 100, fade * .8)
			p.beginShape()
			let starPts = 10

			p.endShape()
		}

		let starCount = 440
		for (var i = 0; i < starCount; i++) {
			// Each star has an age, and cycles from 0 to 1
			// But with an offset, so they don't all do it at the same time
			let agePct = ((i * 2.9 + t) % loopLength) / loopLength

			// Arrange the stars in a spiral
			let r = 3 * Math.pow(i, .7)
			let theta = 0.6 * Math.pow(i, .7)

			let x = r * Math.cos(theta)
			let y = r * Math.sin(theta)

			p.push()
			p.translate(x, y)

			drawStar(i, agePct)
			p.pop()

		}
		p.pop()

	}



	let element = getP5Element(3) // <- Make sure to change this to the right index
	let myP5 = new p5(function(p) {
		p.setup = () => setup(p)
		p.draw = () => draw(p)
	}, element);
}
