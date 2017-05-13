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

  app.get('/slack/auth', SessionController.create);
  app.post('/api/session', SessionController.create);
};
