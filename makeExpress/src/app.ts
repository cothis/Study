import { Application } from './application';
import { debug as Debug } from './debug';
const debug = Debug('app');

const app = new Application();
debug('app is initiated');
export default app;
