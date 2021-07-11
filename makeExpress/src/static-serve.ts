import * as fs from 'fs';
import { IncomingMessage, ServerResponse } from 'http';
import * as path from 'path';
import { debug as Debug } from './debug';
const debug = Debug('static-serve');

export const staticServe = (req: IncomingMessage, res: ServerResponse, next: Function) => {
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

  if (!req.url) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
    return;
  }

  const ext = path.parse(req.url).ext;
  const publicPath = path.join(__dirname, '../public');
  debug('ext:', ext);

  if (Object.keys(mimeType).includes(ext)) {
    fs.readFile(`${publicPath}${req.url}`, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', mimeType[ext]);
      res.end(data);
    });
    return;
  }
};
