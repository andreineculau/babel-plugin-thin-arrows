**NOTE** https://bitbucket.org/rainydio/node-babel-plugin-thin-arrows fork

Works on babel v6
IFF `babylon/lib/index.js` is patched with `exports.plugins = plugins;`.

---

Thin arrow function expression syntax for [babel].

```
[1, 2, 3].map(v -> {
	return v * 2;
});
```

### Installation

```
npm install --save-dev git+https://github.com/andreineculau/babel-plugin-thin-arrows
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

[babel]: https://babeljs.io/
[babylon]: https://github.com/babel/babel/tree/master/packages/babylon
[babel-types]: https://github.com/babel/babel/tree/master/packages/babel-types
