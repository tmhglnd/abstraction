
bpm = 120
speed = 1
setResolution(640, 360)

setResolution(1280, 720)

setResolution(1920, 1080)

H.synth.time = 0;

// squiggle
gradient(1, 0.5)
  .colorama(0.2)
  .mask(shape(100).scale(3, 0.56))
  .modulate(noise(2), 2)
.out(o0)

// mosaic
osc(10,0.1,4)
  .colorama(0.31)
  .kaleid(4)
  .modulate(osc(1,0.1,1).rotate(2))
  .modulateScrollX(voronoi(20,1,0.2))
.out(o1)

// paint
noise(0.6,0.1)
  //.thresh(0.1)
  .colorama(4)
  .hue(-0.5)
  .modulate(noise(5))
  //.modulate(src(o2))
  .out(o2)

// glass
osc(10,0.1,3)
  .modulateKaleid(shape(4,0.2,0.5).repeat(3),6)
  .colorama(0.3)
.out(o3)

// travel
src(o0)
  .modulate(noise(1),0.001)
  .scale(1.01).hue(1.00)
  .diff(osc(4, -0.3, 2).colorama(0.1).mask(shape(2,0.005,0)))
.out(o0)

osc(2, 0.5, 5)
  .mult(shape(4))
  .scale(1, 0.56)
  .diff(src(o2).modulate(noise(3), 0.01))
.out(o2)

solid(0)
  .diff(src(o2).modulate(noise(5), 0.01))
  .saturate(()=>Math.sin(time)+1.5)
.out(o2)

src(o2).modulate(src(o1), 1).out(o3)

render()