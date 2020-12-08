export function Enumify<T>() {
   return class Enumify {
      // Static
      static _instances: Record<string, T>;

      static get keys() {
         return Object.keys(this._instances);
      }

      static get values() {
         return Object.values(this._instances);
      }

      // #Instance
      _key!: string;
      _ordinal!: number;

      get key() {
         return this._key;
      }

      get ordinal() {
         return this._ordinal;
      }

      static _closeEnum(callback?: () => void) {
         if (this._instances == null) {
            if (callback) {
               callback();
            }
            const instances: Record<string, T> = {};
            // Traverse the enum entries
            Object.entries(this).forEach(([key, value], index) => {
               instances[key as string] = value as T;
               value._key = key as string;
               value._ordinal = index;
            });
            this._instances = instances;
         }
      }

      static valueOf(str: string): undefined | T {
         return this._instances[str];
      }

      static [Symbol.iterator]() {
         return this.values[Symbol.iterator]();
      }

      static fromString(str: string): undefined | T {
         return this.valueOf(str);
      }

      toJSON() {
         return this.key;
      }

      toString() {
         return this.key;
      }
   }
}
