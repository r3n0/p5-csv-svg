let data;
let cellWidth;
let cellHeight;
const margen = 380;

const particulas = [];

function preload() {
	data = loadTable('./src/30canciones.csv', 'csv', 'header');
}

function setup() {
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight);
	cellWidth = (width - margen) / data.columns.length;
	cellHeight = (height - margen) / data.rows.length;

	crearParticulas();
	print(particulas.length);
}

function crearParticulas() {
	for (let i = 0; i < data.columns.length; i++) {
		// background(255);
		const x = i * cellWidth + margen / 2;
		const c = color(random(0, 255), random(0, 100), 50, 50);
		const c2 = color(random(0, 255), random(0, 100), 50);

		// fill(c);
		fill(c2);
		noStroke();
		push();
		translate(x, height - 100);
		rotate(-45);
		scale(1.2);
		// text(data.columns[i].slice(0, 20), 0, 0);
		pop();
		fill(c);
		stroke(c);
		for (let j = 0; j < data.rows.length; j++) {
			const y = j * cellHeight + margen / 2;
			// print(data.columns[i]);
			// circle(x, y, 10);

			const numero = int(data.rows[j].arr[i] / 200000);
			if (numero) {
				for (let k = 0; k < numero; k++) {
					const v = p5.Vector.random2D();
					v.setMag(numero * random(1, 2));
					// strokeWeight(numero / 10);
					const particula = {
						centro: createVector(x, y),
						punta: createVector(v.x, v.y),
						color1: c,
						color2: c2,
						vel: random(-2, 2),
					};
					particulas.push(particula);

					// push();
					// translate(x, y);
					// line(0, 0, v.x, v.y);
					// circle(v.x, v.y, 5);
					// pop();
					// print(numero);
					// text(numero, x, y);
				}
			}
		}
		// save('vector.svg');
	}
}

function draw() {
	background(255, 100);
	strokeWeight(4);
	for (const p of particulas) {
		p.punta.rotate(p.vel);
		push();
		fill(p.color2);
		stroke(p.color1);
		translate(p.centro.x, p.centro.y);
		line(0, 0, p.punta.x, p.punta.y);
		pop();
	}
	// noLoop();
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		save('vector.svg');
		print('hola');
	}
}
