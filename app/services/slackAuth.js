import request from 'request';
import config from '../config/config';

const { clientId, clientSecret, redirectURI } = config.slack;

export function authorizeWithAuthCode(authCode) {
  return new Promise((resolve, reject) => {
    const options = {
      uri: `https://slack.com/api/oauth.access?code=${authCode}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectURI}`,
      method: 'GET',
    };

    request(options, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      if (!JSONresponse.ok) {
        reject(JSONresponse.error);
      } else {
        resolve({
          username: JSONresponse.user.name,
          slack_id: JSONresponse.user.id,
        });
      }
    });
  });
}


export default {
  authorizeWithAuthCode,
};
