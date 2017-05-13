import jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

import models from '../../models/index';
import { authorizeWithAuthCode } from '../../services/slackAuth';
import SessionSerializer from '../../serializers/session';
import { handleError } from '../../helpers/common';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'turboKoala2000',
};

function create(req, res) {
  authorizeWithAuthCode(req.body.code || req.query.code)
    .then(({ username, slack_id }) => {
      models.User.findOrCreate({ where: { name: username, slack_id } })
        .then((result) => {
          const user = result[0];
          const payload = { id: user.dataValues.id };
          return jwt.sign(payload, jwtOptions.secretOrKey, (err, token) => {
            user.update({ token }).then(() => {
              res.json(SessionSerializer.serialize({ id: user.id, token }));
            });
          });
        });
    }).catch(error => handleError(res, 404, error));
}

export default {
  create,
};
