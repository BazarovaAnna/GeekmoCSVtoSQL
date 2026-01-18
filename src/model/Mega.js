import { Model } from 'objection';
import { Game } from './Game.js';
import { Master } from './Master.js';

export class Mega extends Model {
  static get tableName() {
    return '_megas';
  }
  static get idColumn() {
    return 'mega';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['mega'],

      properties: {
        mega: { type: 'string' },
      }
    };
  }
  
  static get relationMappings() {
    return {
      // one Mega -> many Games
      gamesRef: {
        relation: Model.HasManyRelation,
        modelClass: Game,
        join: {
          from: '_megas.mega',
          to: '_games.mega'
        }
      },
      // one Mega -> many Masters
      mastersRef: {
        relation: Model.HasManyRelation,
        modelClass: Master,
        join: {
          from: '_megas.mega',
          to: '_masters.mega'
        }
      }
    };
  }
}
