const path = require('path');

module.exports = env => {
	const { mode } = env;

	const entryPoint = {
		production: './src/index',
		demo: './demo/index'
	};

	const outputPoint = {
		production: ['prod', 'objql.js'],
		demo: ['demo', 'app.js']
	};

	return {
		entry: entryPoint[mode],
		output: {
			path: path.resolve(__dirname, outputPoint[mode][0]),
			filename: outputPoint[mode][1],
			library: 'ObjQL',
			libraryTarget: 'umd',
			umdNamedDefine: true,
			globalObject: 'this'
		}
	};
};