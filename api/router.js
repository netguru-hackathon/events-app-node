import passport from 'passport';
import path from 'path';
import SessionController from './controllers/session';

export default (app) => {
  app.get('/', (req, res) => res.send('Hello in sample events app api !!!'));

  app.get('/secured', passport.authenticate('bearer', { session: false }), (req, res) => {
    res.json({ message: 'SECURED CIA INFO' });
  });

  app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./log_button.html'));
  });


  app.get('/api/events', (req, res) => {
    res.json(
      [
        {
          "name": 'WOWOOW',
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis justo non dui tincidunt egestas. Curabitur sed vestibulum arcu. Sed in enim vel augue pulvinar sollicitudin. Sed convallis tristique leo vel aliquam.",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGBbRtzgNfNaHPP9X28Gj6OQF0l6ZaiqgxJlujX5QsE5g35Or18WijxY3"
        },
        {
          "name": 'WOWOWO2',
          "description": "convallis justo non dui tincidunt egestas. Curabitur sed vestibulum arcu. Sed in enim vel augue pulvinar sollicitudin. Sed convallis tristique leo vel aliquam.",
          "image": "http://aurora-awards.com/wp-content/uploads/2017/05/image-image-7.jpg"
        }
      ]);
  });

  app.get('/slack/auth', SessionController.create);
  app.post('/api/session', SessionController.create);
};
