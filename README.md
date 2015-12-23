Thin arrow function expression syntax for [babel].

```
[1, 2, 3].map(v -> {
	return v * 2;
});
```

### Installation

```
npm install --save-dev @rainydio/babel-plugin-thin-arrows
```

### Disclaimer

It's *monkey-patching* [babylon] parser to turn `() -> { }` into function expression. Keep in mind that this is not supported and
not recommended by babel developers.

> loganfsmyth [9:26 PM]
>
> custom syntax isn’t supported,
> monkey-patching the parser is really not recommended

### About

It's using somewhat same approach that JSX and Flow plugins.
But cutting a corner by *not* introducing new token
`ThinArrowFunctionExpression`. Mostly because [babel-types] isn't
extensible and it's hard to monkey-patch it.

There are couple of reasons I made this plugin.
* First I'm switching from CoffeScript
* Second is that writing `function` everywhere sucks,
  and I've noticed that people prefer to use `=>` whenever possible.
* Writing mocha tests I have an option of either loosing
  `this` context in tests, which is a big part of mocha
  flow or having gazillion `function` keywords polluting
  my sweet beautiful tests.

```
beforeEach(() -> {
	this.clock = sinon.useFakeTimers();
});
afterEach(() -> {
	this.clock.restore();
});
it("should tick", (done) -> {
	setTimeout(done, 100);
	this.clock.tick(100);
});
```

[babel]: https://babeljs.io/
[babylon]: https://github.com/babel/babel/tree/master/packages/babylon
[babel-types]: https://github.com/babel/babel/tree/master/packages/babel-types
