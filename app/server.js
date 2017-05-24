// const dotEnvPath = `.env.${process.env.NODE_ENV || 'development'}`;
// require('dotenv').config({ path: dotEnvPath });

import app from './app';
import config from './config/config';

// const port = process.env.PORT || 10010;
app.listen(config.port);

console.log(`Server started at port ${config.port}`);
export default app;
