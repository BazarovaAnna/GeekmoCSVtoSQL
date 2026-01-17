import { Model } from 'objection';

export class Game extends Model {
  static get tableName() {
    return '_games';
  }

  static get idColumn() {
    return 'game_name';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['game_name', 'game_date', 'mega'],

      properties: {
        game_name: { type: 'string' },
        game_date: { type: 'string'},
        mega: { type: 'string' }
      }
    };
  }


}
