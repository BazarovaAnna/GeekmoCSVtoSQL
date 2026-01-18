import { Model } from 'objection';
import { GeekmoUser } from './GeekmoUser.js';
import { Game } from './Game.js';

export class LOPlayer extends Model {
  static get tableName() {
    return 'LO_players';
  }

  static get idColumn() {
  return 'vk_id';
}

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['vk_id', 'priority', 'game_name'],

      properties: {
        vk_id: { type: 'string' },
        priority: { type: 'number' },
        game_name: { type: ['string', 'null'] }
      }
    };
  }

  
    static get relationMappings() {
      return {
        // one LOPlayer entity -> one GeekmoUser
        geekmoUserRef: {
          relation: Model.BelongsToOneRelation,
          modelClass: GeekmoUser,
          join: {
            from: 'LO_players.vk_id',
            to: 'geekmo_users.vk_id'
          }
        },
        // one LOPlayer entity -> one last played Game
        gameRef: {
          relation: Model.BelongsToOneRelation,
          modelClass: Game,
          join: {
            from: 'LO_players.game_name',
            to: '_games.game_name'
          }
        }
      };
    }


}
