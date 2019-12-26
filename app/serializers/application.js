import RESTSerializer from '@ember-data/serializer/rest';
import config from '../config/environment';

const primaryKey = config['ember-cli-mirage'].enabled || config.environment === 'test' ? "id" : "_id"

export default RESTSerializer.extend({
  primaryKey
});
