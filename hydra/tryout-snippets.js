// a list of all possible visual snippets
let codeMap = {
	'noise' : (o, v) => `noise(${v*20})\n.colorama(2)\n.out(${o})`,
	'osc' : (o, v) => `osc(4, 0.2, ${v*10})\n.out(${o})`,
	'shape' : (o, v) => `shape(${v*10})\n.repeat(4, 4)\n.out(${o})`
}

let codeMap2 = {
	'noise' : (o, v) => `noise(() => ${v}*20)\n.colorama(2).\nout(${o})`,
	'osc' : (o, v) => `osc(4, 0.2, () => ${v}*10)\n.out(${o})`,
	'shape' : (o, v) => `shape(() => ${v}*10).\nrepeat(4, 4).\nout(${o})`
}
