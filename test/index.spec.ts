import {expect} from 'chai';
import {Enumify} from '../src';

class Color extends Enumify<Color>() {
   static Red = new Color();
   static Orange = new Color();
   static Yellow = new Color();
   static Green = new Color();
   static Blue = new Color();
   static Purple = new Color();
   private static _ = Color._closeEnum();
}

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

class Mode extends Enumify() {
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

describe('Enumify-ts basic tests', () => {

   it('should have correct instance properties', () => {
      expect(Color.Red.key).to.equal('Red');
      expect(Color.Red.ordinal).to.equal(0);
      expect(Weekday.Sunday.isWorkDay).to.be.false;
      expect(Weekday.Monday.isWorkDay).to.be.true;
   });

   it('should have correct instance methods', () => {
      expect(`${Color.Red}`).to.equal('Red');
      expect(Color.Blue.toJSON()).to.equal('Blue');
   });

   it('should have correct static enumkeys', () => {
      expect(Color.keys).to.deep.equal(['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']);
      expect(Weekday.keys).to.deep.equal(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
   });

   it('should have correct static enumValues', () => {
      expect(Color.values).to.deep.equal(
         [Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Blue, Color.Purple]
      );
      expect(Weekday.values).to.deep.equal(
         [Weekday.Monday, Weekday.Tuesday, Weekday.Wednesday, Weekday.Thursday, Weekday.Friday, Weekday.Saturday, Weekday.Sunday]
      );
   });

   it('should find the correct instance when valueOf() is called', function () {
      expect(Color.valueOf('Yellow')).to.equal(Color.Yellow);
   });

   it('should return all instances when iterated', function () {
      const iterated = [];
      for (const value of Color.values) {
         iterated.push(value);
      }
      expect([...Color]).to.deep.equal(iterated)
   });

   it('should infer type when iterated ', function () {
      expect(Weekday.values[0].isWorkDay).to.be.true;
      expect(Weekday.values[5].isWorkDay).to.be.false;
   });

   it('should do the JSON serialization', function () {
      expect(JSON.stringify({day: Weekday.Monday})).to.equal('{"day":"Monday"}');
      expect(Weekday.fromString('Friday')).to.equal(Weekday.Friday);
   });

   it('should hold properties assigned in _closeEnum()', function () {
      expect(Weekday.Friday.nextDay).to.be.equal(Weekday.Saturday);
      expect(Weekday.Sunday.nextDay).to.be.equal(Weekday.Monday);

   });

   it('should work with arbitrary enum values', function () {
      expect(Mode.user_r.n | Mode.user_w.n | Mode.user_x.n | Mode.group_r.n | Mode.group_x.n | Mode.all_r.n | Mode.all_x.n)
         .to.be.equal(0o755);
      expect(Mode.user_r.n | Mode.user_w.n | Mode.user_x.n | Mode.group_r.n)
         .to.be.equal(0o740);
   });
});
