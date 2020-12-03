# Enumify

A JavaScript library that helps with the enum pattern based on TypeScript.
This fork of [rauschma/enumify](https://github.com/rauschma/enumify) permits to infer the correct type from constructed 
collections: for example, the type of ```enumvalues()``` will be ```Array<YourClass>``` instead of ```Array<Enumify>```.
This can be useful if you want to perform some operation over all the keys or accessing custom properties using ```enumValueOf()```

Installation:

```text
npm install enumify-ts
```

## Basic usage

```ts
  class Color extends Enumify<Color>() {
    static red = new Color();
    static orange = new Color();
    static yellow = new Color();
    static green = new Color();
    static blue = new Color();
    static purple = new Color();
    private static _ = Color.closeEnum()
  }

  // Instance properties
  assert.equal(
    Color.red.enumKey, 'red');
  assert.equal(
    Color.red.enumOrdinal, 0);
  
  // Collections properties
  assert.equal(Weekday.enumValues[5].isWorkDay, false);

  
  // Prototype methods
  assert.equal(
    'Color: ' + Color.red, // .toString()
    'Color: Color.red');
  
  // Static `.enumKeys` and static `.enumValues`
  assert.deepEqual(
    Color.enumKeys,
    ['red', 'orange', 'yellow', 'green', 'blue', 'purple']);
  assert.deepEqual(
    Color.enumValues,
    [ Color.red, Color.orange, Color.yellow,
      Color.green, Color.blue, Color.purple ]);

  // Static `.enumValueOf()`
  assert.equal(
    Color.enumValueOf('yellow'),
    Color.yellow);
  
  // Iterability
  const result = [];
  const iterated = [...Color];
  for (const c of Color) {
    result.push('Color: ' + c);
  }
  assert.deepEqual(
    iterated, [
      Color.red,
      Color.orange,
      Color.yellow,
      Color.green,
      Color.blue,
      Color.purple,
    ]);
```

## More examples

See:

* `ts/test/index.spec.ts`
* `ts/test/state.ts`

Run tests like this (after compiling TypeScript, e.g. via `npm run build`):

```
npm t dist/test/index.spec.js
```

## Support for public static fields

The enum pattern and Enumify are based on public static fields. Support for them currently looks as follows:

* [MDN lists support for public static fields in various JavaScript engines.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields#Browser_compatibility)
* [Babel has the plugin `plugin-proposal-class-properties` for public static fields.](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
* TypeScript has supported static fields in classes for a very long time.

## Further reading

* Blog post [“A class-based enum pattern for JavaScript”](https://2ality.com/2020/01/enum-pattern.html)
* Blog post [“ECMAScript proposal: public class fields”](https://2ality.com/2019/07/public-class-fields.html)
