# Enumify-TS · [![npm](https://img.shields.io/npm/v/enumify-ts.svg)](https://www.npmjs.com/package/enumify-ts) [![npm](https://img.shields.io/npm/dm/enumify-ts.svg)](https://www.npmjs.com/package/enumify-ts)

A JavaScript library that helps with the enum pattern based on TypeScript.
This fork of [rauschma/enumify](https://github.com/rauschma/enumify) permits to infer the correct type from constructed 
collections: for example, the type of `values()` will be `Array<YourClass>` instead of `Array<Enumify>`.
This can be useful if you want to perform some operation over all the keys or accessing custom properties using `valueOf()`

Installation:

```text
npm install enumify-ts
```

### Class usage
```ts
class Color extends Enumify<Color>() {
   static Red = new Color();
   static Orange = new Color();
   static Yellow = new Color();
   static Green = new Color();
   static Blue = new Color();
   static Purple = new Color();
   private static _ = Color._closeEnum();
}
```
```ts
class Weekday extends Enumify<Weekday>() {
   static Monday = new Weekday(true);
   static Tuesday = new Weekday(true);
   static Wednesday = new Weekday(true);
   static Thursday = new Weekday(true);
   static Friday = new Weekday(true);
   static Saturday = new Weekday(false);
   static Sunday = new Weekday(false);
   static _ = Weekday._closeEnum(() => {
      Weekday.Monday.nextDay = Weekday.Tuesday;
      Weekday.Tuesday.nextDay = Weekday.Wednesday;
      Weekday.Wednesday.nextDay = Weekday.Thursday;
      Weekday.Thursday.nextDay = Weekday.Friday;
      Weekday.Friday.nextDay = Weekday.Saturday;
      Weekday.Saturday.nextDay = Weekday.Sunday;
      Weekday.Sunday.nextDay = Weekday.Monday;
   });

   public nextDay?: Weekday;

   constructor(public isWorkDay: boolean) {
      super();
   }
}
```
```ts
class Mode extends Enumify<Mode>() {
   static user_r = new Mode(0b100000000);
   static user_w = new Mode(0b010000000);
   static user_x = new Mode(0b001000000);
   static group_r = new Mode(0b000100000);
   static group_w = new Mode(0b000010000);
   static group_x = new Mode(0b000001000);
   static all_r = new Mode(0b000000100);
   static all_w = new Mode(0b000000010);
   static all_x = new Mode(0b000000001);

   private static _ = Mode._closeEnum();

   constructor(public n: number) {
      super();
   }
}
```
### `_closeEnum()` method
It's important to remember calling `_closeEnum()` in order to statically register all the instances in the inner dictionary. Further calls of the method won't be considered.
```ts
static _closeEnum(callback?: () => void)
```
The method accepts an optional callback that will be executed on the first and only call of the method. It can be used to instantiate specific properties of the instances.
An example can be seen in `Weekday`, where the `nextDay` property requires a circular definition.
### Iteration of instances
`Color.keys`: `['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']`

`Color.values`: `[Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Blue, Color.Purple]`

`[...Color]`: `[Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Blue, Color.Purple]`

### Instance properties
`Color.Red.key`: `'Red'`

`Color.Red.ordinal`: `0`

`Weekday.Sunday.isWorkDay`: `false`

`[...Weekday].map(day => day.isWorkDay)`: `[true, true, true, true, true, false, false]`
### toString and Serialization
`` `${Color.Red}` ``: `'Red'`

`Color.Blue.toJSON()`: `'Blue'`

### Value of a key string
`Color.valueOf('Yellow')`: `Color.Yellow`

## More examples

See:

* `test/index.spec.ts`
* `test/state.spec.ts`

Run tests with `npm test`

## Support for public static fields

The enum pattern and Enumify are based on public static fields. Support for them currently looks as follows:

* [MDN lists support for public static fields in various JavaScript engines.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields#Browser_compatibility)
* [Babel has the plugin `plugin-proposal-class-properties` for public static fields.](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
* TypeScript has supported static fields in classes for a very long time.

## Further reading

* Blog post [“A class-based enum pattern for JavaScript”](https://2ality.com/2020/01/enum-pattern.html)
* Blog post [“ECMAScript proposal: public class fields”](https://2ality.com/2019/07/public-class-fields.html)
