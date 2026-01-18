import { Model } from 'objection';
import { Master } from './Master.js';

export class GeekmoUser extends Model {
  static get tableName() {
    return 'geekmo_users';
  }

  static get idColumn() {
    return 'vk_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['vk_id', 'vk_nickname', 'name'],

      properties: {
        vk_id: { type: 'string' },
        vk_nickname: { type: 'string'},
        name: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
      return {
        // one user -> many Masters entries
        mastersRef: {
          relation: Model.HasManyRelation,
          modelClass: Master,
          join: {
            from: 'geekmo_users.vk_id',
            to: '_masters.vk_id'
          }
        },
      };
    }

}
