import { Model } from 'objection';

export class LOLanguage extends Model {
  static get tableName() {
    return '_lo_languages';
  }
  static get idColumn() {
    return 'language';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['language'],

      properties: {
        language: { type: 'string' },
      }
    };
  }
  
}
