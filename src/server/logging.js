import { logger as expressLogger, errorLogger as expressErrorLogger } from 'express-winston'
import { createLogger, transports, format } from 'winston'

const OUTPUT_LOG = './logs/output.log'
const ERROR_LOG = './logs/error.log'

const logFormat = format.combine(
  format.timestamp(),
  format.json(),
)

let reqTransports
let errTransports

if (process.env.NODE_ENV === 'production' || process.env.LOGGING === '1') {
  reqTransports = [new transports.File({ filename: OUTPUT_LOG })]
  errTransports = [new transports.File({ filename: ERROR_LOG })]
} else {
  reqTransports = [new transports.Console()]
  errTransports = reqTransports
}

export const logger = createLogger({
  transports: reqTransports,
  exceptionHandlers: errTransports,
  format: logFormat,
})

export const reqLogger = expressLogger({
  transports: reqTransports,
  format: logFormat,
  expressFormat: true,
})

export const errLogger = expressErrorLogger({
  transports: errTransports,
  format: logFormat,
})
