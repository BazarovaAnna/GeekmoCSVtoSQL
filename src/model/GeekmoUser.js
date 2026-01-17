import { Model } from 'objection';

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


}
