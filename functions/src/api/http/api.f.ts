import fastify, { type FastifyServerFactoryHandler } from 'fastify';
import Sensible from '@fastify/sensible';
import Cors from '@fastify/cors';
import * as functions from 'firebase-functions';
import http from 'http';

let requestHandler: FastifyServerFactoryHandler;

const serverFactory = (handler: FastifyServerFactoryHandler) => {
    requestHandler = handler;

    return http.createServer();
}

const app = fastify({ logger: true, serverFactory });

await app.register(Sensible);
await app.register(Cors, { origin: false });
await app.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    try {
        var json = JSON.parse(body as string);
        done(null, json);
    } catch (err: any) {
        err.statusCode = 400;
        done(err, undefined);
    }
});

app.get('/hello', async (req, res) => {
    return "hello";
});

export default functions.https.onRequest((req, res) => {
    app.ready((err) => {
        if (err) throw err;
        requestHandler(req, res);
    });
});