import { Model } from 'objection';
import { Mega } from './Mega.js';

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

  static get relationMappings() {
    return {
      // one Game -> one Mega
      megaRef: {
        relation: Model.BelongsToOneRelation,
        modelClass: Mega,
        join: {
          from: '_games.mega',
          to: '_megas.mega'
        }
      }
    };
  }
}
