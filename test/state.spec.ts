import {describe} from "mocha";
import {expect} from 'chai';
import {Enumify} from '../src';


export class State extends Enumify() {
   static Start = new State({
      done: false,
      accept(x: string) {
         if (x === '1') {
            return State.One;
         } else {
            return State.Start;
         }
      },
   });
   static One = new State({
      done: false,
      accept(x: string) {
         if (x === '1') {
            return State.Two;
         } else {
            return State.Start;
         }
      },
   });
   static Two = new State({
      done: false,
      accept(x: string) {
         if (x === '1') {
            return State.Three;
         } else {
            return State.Start;
         }
      },
   });
   static Three = new State({
      done: true,
   });
   private static _ = State._closeEnum();

   //#################### Instance

   done!: boolean;

   accept(x: string): State {
      throw new Error('Must be overridden');
   }

   constructor(props: { [k: string]: any }) {
      super();
      Object.defineProperties(
         this, Object.getOwnPropertyDescriptors(props));
   }
}

function run(state: State, inputString: string) {
   const trace = [];
   for (const ch of inputString) {
      if (state.done) {
         break;
      }
      state = state.accept(ch);
      trace.push(`${ch} --> ${state}`);
   }
   return trace;
}

describe('Enumify-ts state tests', () => {
   it('should correctly run the function', function () {
      expect(run(State.Start, '01011100'))
         .to.deep.equal(
         [
            '0 --> Start',
            '1 --> One',
            '0 --> Start',
            '1 --> One',
            '1 --> Two',
            '1 --> Three',
         ]
      );

   });
});
