// Hydra code snippets with MIDI controller assignments

setResolution(640, 360)

// gradient(0).hue(()=>1-cc[0]+0.2)
//   .colorama(Math.sin(cc[0]*Math.PI*8)*0.4+0.4)
//   .mask(shape(100).scale(()=>cc[0]*10+2, 0.56))
//   .modulate(noise(2, 0.1), ()=>Math.cos(cc[0]*Math.PI*4)*2+4)
// .out(o0)

gradient(0).pixelate(6,6)
  .hue(() => 1-(cc[0] * 0.5 + 0.4))
  .mask(shape(8).scale( () => cc[0] * 10 + 3, 0.56))
  .rotate(() => cc[0] * pi, 1)
  .modulate(noise(1.5, 0.2), () => cos(cc[0] * pi * 4) * 4 + 5.5)
.out(o0)

// osc(10,0.1,()=>cc[0]*1+2)
//   .colorama(()=>Math.cos(cc[0]*Math.PI*3)*0.2+0.3)
//   .kaleid(4)
//   .modulateScrollX(voronoi(16,1,()=>Math.sin(cc[0]*Math.PI*2)*0.4))
// .out(o0)

osc(4,0.1,() => cc[0] * 2 + 1.7).kaleid(3)
  .colorama(() => cos(cc[0] * pi * 6) * 0.1 + 0.1)  
  .modulatePixelate(voronoi(8, 0.5, 0), () => sin(cc[0] * pi * 4) * 10 + 11)
.out(o0)

// noise(0.6,0.1)
//   .colorama(()=>cc[0]*0.1+4)
//   .hue(()=>cc[0]*-1)
//   .modulate(noise(5))
//   .out(o0)

noise(0.4, 0.05)
.colorama(() => cc[0] * 0.01 + 6)
.hue(() => cc[0] * -0.3)
.modulate(noise(() => cos(cc[0] * pi * 2) * 2 + 4))
.out(o0)

// osc(3,0.5,5)
//   .modulateKaleid(shape(()=>Math.floor(cc[0]*3)+2,0.2,()=>Math.sin(cc[0]*Math.PI*8)*0.5+0.5).repeat(3),6)
//   .colorama(()=>Math.cos(cc[0]*Math.PI*2)*-0.15+0.3)
// .out(o0)

osc(2, 0.4, 0)
  .modulateKaleid(
  	shape(() => int(cc[0] * 4) + 2, 0.2,() => sin(cc[0] * pi * 9) * 0.5 + 0.5).repeat(3), 6)
  	.colorama(() => cos(cc[0] * pi * 2) * 0.01 + 7)
.out(o0)

// src(o0)
//   .modulate(noise(1), ()=>cc[0]*0.01+0.003)
//   .scale(()=>Math.sin(cc[0]*Math.PI*4)*0.01+1).hue(1)
//   .diff(osc(4, -0.3, ()=>cc[0]+2*2).mask(shape(2,0.01,0)), 0.01)
// .out(o0)

src(o0)
	.modulate(src(o0).pixelate(6,6), 0.005)
  .scale(() => sin(cc[0] * pi * 4) * 0.05 + 1).hue(0.001)
  .diff(osc(2, -0.1, () => cc[0] * 2 + 3).mask(shape(2,0.01,0).scrollY(0.5)))
.out(o0)

render(o0)

// hush()