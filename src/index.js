import { tokTypes } from "babylon";
import { plugins } from "babylon/lib/parser";

plugins.thinArrow = function (instance) {
	instance.extend("getTokenFromCode", function (inner) {
		return function (code) {
			if (code === 45) {
				const next = this.input.charCodeAt(this.state.pos + 1);
				if (next === 62) {
					this.state.pos += 2;
					return this.finishToken(tokTypes.arrow, "thin");
				}
			}
			return inner.call(this, code);
		};
	});

	instance.extend("parseArrowExpression", function (inner) {
		return function (node, params, isAsync) {
			const prevToken = this.state.tokens[this.state.tokens.length - 1];
			if (prevToken.type === tokTypes.arrow && prevToken.value === "thin") {
				this.initFunction(node, isAsync);
				node.params = this.toAssignableList(params, true);
				this.parseFunctionBody(node, true);
				return this.finishNode(node, "FunctionExpression");
			}
			else {
				return inner.call(this, node, params, isAsync);
			}
		};
	});
};

export default function () {
	return {
		manipulateOptions(opts, parserOpts) {
			parserOpts.plugins.push("thinArrow");
		},
	};
}
