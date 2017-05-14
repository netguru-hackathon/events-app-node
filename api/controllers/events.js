import { EventBasicSerializer } from '../serializers/event';

function index(_, res) {
  const fakeData = [
    {
      name: 'WOWOOW',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis justo non dui tincidunt egestas. Curabitur sed vestibulum arcu. Sed in enim vel augue pulvinar sollicitudin. Sed convallis tristique leo vel aliquam.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGBbRtzgNfNaHPP9X28Gj6OQF0l6ZaiqgxJlujX5QsE5g35Or18WijxY',
    },
    {
      name: 'WOWOWO2',
      description: 'convallis justo non dui tincidunt egestas. Curabitur sed vestibulum arcu. Sed in enim vel augue pulvinar sollicitudin. Sed convallis tristique leo vel aliquam.',
      image: 'http://aurora-awards.com/wp-content/uploads/2017/05/image-image-7.jpg',
    },
  ];
  res.json(EventBasicSerializer.serialize(fakeData));
}

export default {
  index,
};
