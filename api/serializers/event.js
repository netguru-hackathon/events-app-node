const JSONAPISerializer = require('jsonapi-serializer').Serializer;

export const EventBasicSerializer = new JSONAPISerializer('events', {
  attributes: ['name', 'description', 'image'],
});

export const EventSerializer = new JSONAPISerializer('events', {
  attributes: ['name', 'description', 'image', 'items'],
  items: {
    ref: 'id',
    attributes: ['type', 'name', 'description', 'start_time', 'end_time'],
  },
});

export default EventSerializer;
