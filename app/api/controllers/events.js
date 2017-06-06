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

function create(req, res) {
  const { name, description } = req.body || req.query;
  Event.create({ name, description })
    .then(event => res.json(EventSerializer.serialize(event)))
    .catch(error => res.render('error', { error }));
}

function findAndUpdate(req, res) {
  const { name, description } = req.body || req.query;
  Event.find({ where: { id: req.params.eventId } })
    .then((event) => {
      event.update({ name, description })
      .then(updatedEvent => res.json(EventSerializer.serialize(updatedEvent)));
    });
}

export default {
  index,
  get,
  create,
  findAndUpdate,
};
