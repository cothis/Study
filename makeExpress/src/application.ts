import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { debug as Debug } from './debug';
import { staticServe } from './static-serve';
const debug = Debug('app');

const mimeType: { [index: string]: string } = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/font-sfnt',
};

export class Application {
  private readonly server: http.Server;
  private readonly middlewares: Function[] = [];

  constructor() {
    this.server = http.createServer((req, res) => {
      const runMw = (middlewares: Function[], i: number, err: Error | null): void => {
        if (i < 0 || i >= middlewares.length) return;

        const nextMw = middlewares[i];
        const next = () => (e: Error) => runMw(this.middlewares, i + 1, e);

        if (err) {
          const isErrorMw = (mw: Function) => mw.length === 4;
          if (isErrorMw(nextMw)) nextMw(err, req, res, next());

          // 에러가 있고, 다음에 실행할 미들웨어가 에러처리기가 아니면 그 다음 미들웨어를 찾는다
          return runMw(middlewares, i + 1, err);
        }

        return nextMw(req, res, next());
      };

      runMw(this.middlewares, 0, null);
    });
  }

  public use(fn: Function) {
    this.middlewares.push(fn);
  }

  public listen(port: number = 3000, hostname: string = '127.0.0.1', fn: () => void) {
    debug('listen()');
    this.server.listen(port, hostname, undefined, fn);
  }
}
