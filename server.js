import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 10010;
app.listen(port);

console.log(`Server started at port ${port}`);
export default app;
