var babylon = require('babylon');

babylon.plugins.thinArrow = function(instance) {
	instance.extend('getTokenFromCode', function(inner) {
		return function(code) {
			if (code === 45) {
				var next = this.input.charCodeAt(this.state.pos + 1);
				if (next === 62) {
					this.state.pos += 2;
					return this.finishToken(babylon.tokTypes.arrow, 'thin');
				}
			}
			return inner.call(this, code);
		};
	});

	instance.extend('parseArrowExpression', function(inner) {
		return function (node, params, isAsync) {
			var prevToken = this.state.tokens[this.state.tokens.length - 1];
			if (prevToken.type === babylon.tokTypes.arrow && prevToken.value === 'thin') {
				this.initFunction(node, isAsync);
				node.params = this.toAssignableList(params, true);
				this.parseFunctionBody(node, true);
				return this.finishNode(node, 'FunctionExpression');
			}
			else {
				return inner.call(this, node, params, isAsync);
			}
		};
	});
};

module.exports = function() {
	return {
		manipulateOptions(opts, parserOpts) {
			parserOpts.plugins.push('thinArrow');
		},
	};
}
