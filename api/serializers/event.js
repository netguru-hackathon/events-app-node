const JSONAPISerializer = require('jsonapi-serializer').Serializer;

export const EventBasicSerializer = new JSONAPISerializer('events', {
  attributes: ['name', 'description', 'image'],
});

export default EventBasicSerializer;
