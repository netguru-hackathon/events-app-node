const JSONAPISerializer = require('jsonapi-serializer').Serializer;

export default new JSONAPISerializer('sessions', {
  attributes: ['token'],
});
