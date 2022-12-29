import pino from 'pino';
import config from 'config';

const stream = [
    { stream: process.stdout}
]

const options = ( config.has('logger.options')) ? Object.assign({}, config.get('logger.options')) : {}
let logger = pino(options, pino.multistream(stream))

export default logger