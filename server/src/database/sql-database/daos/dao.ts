// Local Imports
import { ConnectionManager } from '../connection-manager';
import { UsedAbstractDAOError } from '../../../errors/used-abstract-dao-error';

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
   * Properties of T.
   */
  _keys: string[];

  /**
   * Creates the table if not already made.
   *
   * @returns {Promise<void>} Promise of action.
   */
  async createTable(): Promise<void> {
    if (ConnectionManager.connection) {
      return await ConnectionManager.connection.query(this._getCreateTableQuery());
    }
  }

  /**
   * Inserts a new item into the database.
   *
   * @param {T} item Item to insert. 
   * @returns {Promise<number>} Number of rows inserted.
   */
  async insert(item: T): Promise<number> {
    if (this._keys === undefined) {
      this._keys = Object.keys(item);

      if (!(this._keys.includes('id'))) {
        this._keys.push('id');
      }
    }

    if (ConnectionManager.connection) {
      return (await ConnectionManager.connection.query(
        this._getInsertQuery(),
        item,
      )).affectedRows;
    }
    return 0;
  }

  /**
   * Finds items that fit the conditions and applies projection.
   *
   * @param {IQueryConditions} conditions Conditions items should fit.
   * @param {IQueryProjection} projection Projection to be applied.
   * @returns {Promise<Record<string, IDatabaseColumnTypes>[]>} Items that fit the conditions with projection.
   */
  async find(
    conditions: IQueryConditions = {},
    projection: IQueryProjection = {},
  ): Promise<Record<string, IDatabaseColumnTypes>[]> {
    if (ConnectionManager.connection) {
      const query =  `SELECT ${this._createProjection(projection)} FROM ${this._getTableName()}${this._createConditions(conditions)}`;

      return await ConnectionManager.connection.query(query);
    }
  }

  /**
   * Deletes items that fit a set of conditions.
   *
   * @param {IQueryConditions} conditions Conditions items should fit.
   * @returns {Promise<number>} The number of items deleted.
   */
  async delete(conditions: IQueryConditions = {}): Promise<number> {
    if (ConnectionManager.connection) {
      const query =  `DELETE FROM ${this._getTableName()}${this._createConditions(conditions)}`;

      return (await ConnectionManager.connection.query(query)).affectedRows;
    }
  }

  /**
   * Updates items that fit a set of conditions.
   *
   * @param {IQueryConditions} conditions Conditions items should fit.
   * @param {IQueryUpdate} update Updates to be applied
   * @returns {Promise<number>} The number of items updated.
   */
  async update(
    conditions: IQueryConditions = {},
    update: IQueryUpdate = {},
  ): Promise<number> {
    if (ConnectionManager.connection) {
      const query =  `UPDATE ${this._getTableName()}${this._createUpdate(update)}${this._createConditions(conditions)}`;

      return (await ConnectionManager.connection.query(query)).affectedRows;
    }
    return 0;
  }

  /**
   * Converts a condition object to SQL.
   *
   * @param {IQueryConditions} conditions Conditions to be converted.
   * @returns {string} SQL where condition.
   */
  _createConditions(conditions: IQueryConditions): string {
    if (Object.keys(conditions).length === 0) {
      return '';
    }

    return ` WHERE ${Object.keys(conditions).map(key => {
      return `${key} = ${conditions[key]}`;
    }).join(' AND ')}`;
  }

  /**
   * Converts a projection object to SQL.
   *
   * @param {IQueryProjection} projection Projection to be converted.
   * @returns {string} SQL projection.
   */
  _createProjection(projection: IQueryProjection): string {
    const keys = Object.keys(projection);

    if (keys.length === 0) {
      return '*';
    }

    const columns = [];
    let isExclude = false;

    for (let i = 0; i < keys.length; i += 1) {
      if (projection[keys[i]] === false) {
        isExclude = true;
        break;
      }

      if (projection[keys[i]]) {
        columns.push(keys[i]);
      }
    }

    if (isExclude) {
      for (let i = 0; i < this._keys.length; i += 1) {
        const column = this._keys[i];

        if (!(column in projection) || projection[column]) {
          columns.push(column);
        }
      }
    }

    return columns.join(', ');
  }

  /**
   * Converts a update object to SQL.
   *
   * @param {IQueryUpdate} update Update set to be converted.
   * @returns {string} SQL update.
   */
   _createUpdate(update: IQueryUpdate): string {
    if (Object.keys(update).length === 0) {
      return '';
    }

    return ` SET ${Object.keys(update).map(key => {
      return `${key} = ${update[key]}`;
    }).join(', ')}`;
  }

  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    throw new UsedAbstractDAOError();
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    throw new UsedAbstractDAOError();
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getTableName(): string {
    throw new UsedAbstractDAOError();
  }
}
