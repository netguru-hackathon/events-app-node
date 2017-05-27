import { EventBasicSerializer, EventSerializer } from '../serializers/event';

const Event = require('../../models').Event;

function index(_, res) {
  Event.findAll().then(events => res.status(200).json(EventBasicSerializer.serialize(events)));
}

function get(req, res) {
  Event.find({ where: { id: req.params.eventId } })
  .then((event) => {
    if (event) {
      res.status(200).json(EventSerializer.serialize(event));
    } else {
      res.status(404).send('Not Found');
    }
  });
}

export default {
  index,
  get,
};
