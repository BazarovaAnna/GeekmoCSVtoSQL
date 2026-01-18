import { Model } from 'objection';
import { Mega } from './Mega.js';
import { GeekmoUser } from './GeekmoUser.js';

export class Master extends Model {
  static get tableName() {
    return '_masters';
  }

  static get idColumn() {
  return ['vk_id', 'mega'];
}

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['vk_id', 'mega', 'owner'],

      properties: {
        vk_id: { type: 'string' },
        mega: { type: 'string'},
        owner: { type: 'boolean' }
      }
    };
  }

  
    static get relationMappings() {
      return {
        // one Master entity -> one Mega
        megaRef: {
          relation: Model.BelongsToOneRelation,
          modelClass: Mega,
          join: {
            from: '_masters.mega',
            to: '_megas.mega'
          }
        },
        // one Master entity -> one GeekmoUser
        geekmoUserRef: {
          relation: Model.BelongsToOneRelation,
          modelClass: GeekmoUser,
          join: {
            from: '_masters.vk_id',
            to: 'geekmo_users.vk_id'
          }
        }
      };
    }


}
