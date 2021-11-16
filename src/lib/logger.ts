import pino from 'pino';

const Logger = (name?: string) => {
  const logLevel = process.env['LOG_LEVEL'] || 'debug'
  const options: pino.LoggerOptions = {
    level: logLevel,
    prettyPrint: logLevel === 'debug' && process.env['NODE_ENV'] !== 'production',
    base: {
      loggerName: name
    }
  }
  return pino(options)
};

export default Logger
