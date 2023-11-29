import Keyv from "keyv";
import serialize from "serialize-javascript";

class AppCache<T> {
  private cache: Keyv<T>;

  constructor() {
    this.cache = new Keyv({
      serialize,
      deserialize: (serialized) => eval("(" + serialized + ")"),
    });
  }

  async getOrSet(key: string, callback: () => Promise<T>): Promise<T> {
    const cachedData = await this.cache.get(key);

    if (cachedData !== undefined) {
      return cachedData;
    } else {
      const newData = await callback();

      await this.cache.set(key, newData);

      return newData;
    }
  }

  async clear() {
    return await this.cache.clear();
  }
}

export default AppCache;
