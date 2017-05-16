import { EventBasicSerializer, EventSerializer } from '../serializers/event';

function index(_, res) {
  const fakeData = [
    {
      id: 1,
      name: 'WOWOOW',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis justo non dui tincidunt egestas. Curabitur sed vestibulum arcu. Sed in enim vel augue pulvinar sollicitudin. Sed convallis tristique leo vel aliquam.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGBbRtzgNfNaHPP9X28Gj6OQF0l6ZaiqgxJlujX5QsE5g35Or18WijxY',
    },
    {
      id: 2,
      name: 'WOWOWO2',
      description: 'convallis justo non dui tincidunt egestas. Curabitur sed vestibulum arcu. Sed in enim vel augue pulvinar sollicitudin. Sed convallis tristique leo vel aliquam.',
      image: 'http://aurora-awards.com/wp-content/uploads/2017/05/image-image-7.jpg',
    },
  ];
  res.json(EventBasicSerializer.serialize(fakeData));
}

function get(req, res) {
  const fakeData = {
    id: req.params.eventId,
    name: 'WOWOOW',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis justo non dui tincidunt egestas. Curabitur sed vestibulum arcu. Sed in enim vel augue pulvinar sollicitudin. Sed convallis tristique leo vel aliquam.',
    image: 'http://mm.pwn.pl/ency/jpg/583/1s/d03i0120.jpg',
    items: [
      {
        id: 1,
        event_id: req.params.eventId,
        type: 'schedule',
        name: 'schedule item #1',
        start_time: '2017-06-12T15:00:00+00:00',
        end_time: '2017-06-12T17:00:00+00:00',
      },
      {
        id: 2,
        event_id: req.params.eventId,
        type: 'schedule',
        name: 'schedule item #2',
        start_time: '2017-06-12T17:00:00+00:00',
        end_time: '2017-06-12T18:00:00+00:00',
      },
      {
        id: 3,
        event_id: req.params.eventId,
        type: 'schedule',
        name: 'schedule item #3',
        start_time: '2017-06-12T18:00:00+00:00',
        end_time: '2017-06-12T22:00:00+00:00',
      },
      {
        id: 4,
        event_id: req.params.eventId,
        type: 'attraction',
        name: 'attraction item 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 4,
        event_id: req.params.eventId,
        type: 'attraction',
        name: 'attraction item 2',
        description: 'consectetur adipiscing elit. Ut convallis justo non dui tincidunt egestas. Curabitur sed vestibulum arcu. Sed in enim vel augue pulvinar sollicitudin.',
      },
    ],
  };

  res.json(EventSerializer.serialize(fakeData));
}

export default {
  index,
  get,
};
