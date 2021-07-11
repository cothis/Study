import app from './app';
import { debug as Debug } from './debug';
import { staticServe } from './static-serve';
const debug = Debug('bin');

const hostname = '127.0.0.1';
const port = 3000;

app.use(staticServe);

app.listen(port, hostname, () => {
  debug(`Server running at https://${hostname}:${port}`);
});
