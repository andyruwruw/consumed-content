// Types
import {
  IQueryConditions,
  IQueryProjection,
  IQueryUpdate,
} from '../../../types';
import { IDatabaseColumnTypes } from '../../../../../shared/types';

/**
 * Abstract Data Access Object, use concrete implementations.
 */
export class DataAccessObject<T> {
  /**
   * Cached items.
   */
  _items: T[];

  /**
   * Creates the table if not already made.
   *
   * @returns {Promise<void>} Promise of action.
   */
  async createTable(): Promise<void> {
    this._items = [];
  }

  /**
   * Inserts a new item into the database.
   *
   * @param {T} item Item to insert. 
   * @returns {Promise<number>} Number of items added.
   */
  async insert(item: T): Promise<number> {
    if (!('id' in item)) {
      item['id'] = this._items.length;
    }

    this._items.push(item);

    return 1;
  }

  /**
   * Finds items that fit the conditions and applies projection.
   *
   * @param {IQueryConditions} conditions Conditions items should fit.
   * @param {IQueryProjection} projection Projection to be applied.
   * @returns {Promise<Record<string, IDatabaseColumnTypes>[]>} Items that fit the conditions with projection.
   */
  async find(
    conditions: IQueryConditions,
    projection: IQueryProjection,
  ): Promise<Record<string, IDatabaseColumnTypes>[]> {
    const items = this._applyConditions(conditions);

    return this._applyProjection(items, projection);
  }

  /**
   * Deletes items that fit a set of conditions.
   *
   * @param {IQueryConditions} conditions Conditions items should fit.
   * @returns {Promise<number>} The number of items deleted.
   */
  async delete(conditions: IQueryConditions): Promise<number> {
    const itemIds = this._applyConditions(conditions).map(item => {
      if ('id' in item) {
        return item['id'];
      }
      return 'no-id';
    });

    this._items = this._items.filter((item) => {
      if ('id' in item) {
        return !itemIds.includes(item['id']);
      }
      return false;
    });

    return itemIds.length;
  }

  /**
   * Updates items that fit a set of conditions.
   *
   * @param {IQueryConditions} conditions Conditions items should fit.
   * @param {IQueryUpdate} update Updates to be applied
   * @returns {Promise<number>} The number of items updated.
   */
  async update(
    conditions: IQueryConditions,
    update: IQueryUpdate,
  ): Promise<number> {
    const itemIds = this._applyConditions(conditions).map(item => {
      if ('id' in item) {
        return item['id'];
      }
      return 'no-id';
    });

    for (let i = 0; i < this._items.length; i += 1) {
      const item = this._items[i];

      if ('id' in item && itemIds.includes(item['id'])) {
        this._updateItem(
          i,
          update,
        );
      }
    }

    return itemIds.length;
  }

  /**
   * Applies conditions to items.
   *
   * @param {IQueryConditions} conditions Conditions to be applied.
   * @returns {T[]} The items that fit the conditions.
   */
  _applyConditions(conditions: IQueryConditions): T[] {
    const approved = [] as boolean[];
    const keys = Object.keys(conditions);

    if (keys.length === 0) {
      return this._items;
    }

    for (let i = 0; i < this._items.length; i += 1) {
      const item = this._items[i] as unknown as Record<string, IDatabaseColumnTypes>;

      if (approved.length === i) {
        approved.push(true);
      }

      for (let j = 0; j < keys.length; j += 1) {
        const value = item[keys[j]];
        const conditionValue = conditions[keys[j]];

        if (typeof(conditionValue) === 'object'){
          const conditionValueKeys = Object.keys(conditionValue);

          for (let k = 0; k < conditionValueKeys.length; k += 1) {
            if (conditionValueKeys[k] === '$in') {
              const array = (conditionValue as Record<string, IDatabaseColumnTypes[]>)[conditionValueKeys[k]];

              if (!(array.includes(value))) {
                approved[i] = false;
                break;
              }
            }
          }

          if (approved[i] === false) {
            break;
          }
        } else if (conditionValue as any instanceof Array
          && value as any instanceof Array) {
          const requiredArray = (conditionValue as unknown as IDatabaseColumnTypes[]);

          if (requiredArray.length !== (value as unknown as any[]).length) {
            approved[i] = false;
            break;
          }

          for (let k = 0; k < requiredArray.length; k += 1) {
            const requiredValue = requiredArray[k];

            if (!((value as unknown as IDatabaseColumnTypes[]).includes(requiredValue))) {
              approved[i] = false;
              break;
            }
          }

          if (approved[i] === false) {
            break;
          }
        } else if (value !== conditionValue) {
          approved[i] = false;
          break;
        }
      }
    }

    const filteredItems = [] as T[];

    for (let i = 0; i < approved.length; i += 1) {
      if (approved[i]) {
        filteredItems.push(this._items[i]);
      }
    }

    return filteredItems;
  }

  /**
   * Applies a projection to a set of items.
   *
   * @param {T[]} items Items to apply projection to.
   * @param {IQueryProjection} projection Projection to be applied.
   * @returns {Record<string, IDatabaseColumnTypes>[]} Items with applied projection.
   */
  _applyProjection(
    items: T[],
    projection: IQueryProjection,
  ): Record<string, IDatabaseColumnTypes>[] {
    const projectedItems = [] as Record<string, IDatabaseColumnTypes>[];
    const fields = Object.keys(projection);

    if (fields.length === 0) {
      return items as unknown as Record<string, IDatabaseColumnTypes>[];
    }

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i] as unknown as Record<string, IDatabaseColumnTypes>;
      const projectedItem = {} as Record<string, IDatabaseColumnTypes>;

      for (let j = 0; j < fields.length; j += 1) {
        const field = fields[j];

        projectedItem[fields[j]] = item[field] as IDatabaseColumnTypes;
      }

      projectedItems.push(projectedItem);
    }

    return projectedItems;
  }

  /**
   * Updates an item at a given index.
   *
   * @param {number} index Index of the item to be updated.
   * @param {IQueryUpdate} update The update to be applied.
   */
  _updateItem(
    index: number,
    update: IQueryUpdate,
  ): void {
    const oldItem = this._items[index];
    const newItem = {} as Record<string, IDatabaseColumnTypes>;
    const fields = Object.keys(oldItem);

    for (let i = 0; i < fields.length; i += 1) {
      if (fields[i] in update) {
        newItem[fields[i]] = (update as unknown as Record<string, IDatabaseColumnTypes>)[fields[i]];
      } else {
        newItem[fields[i]] = (oldItem as unknown as Record<string, IDatabaseColumnTypes>)[fields[i]];
      }
    }

    this._items[index] = newItem as unknown as T;
  }
}
