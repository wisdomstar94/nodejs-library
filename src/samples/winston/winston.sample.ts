import 'winston-daily-rotate-file';
import { createLogger, format, transports } from 'winston';

const applyFormat = format.combine(
  format.label({ label: `[ Label ]` }),
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.colorize(),
  format.printf((info) => {
    let afterMessage = ``;
    if (info.context !== undefined) {
      afterMessage += JSON.stringify(info.context);
    }

    if (info.stack !== undefined) {
      afterMessage += JSON.stringify(info.stack, undefined, 2);
    }

    return ``
      .concat(`${info.timestamp} - ${info.level}: `)
      .concat(`${info.label} `)
      .concat(`${info.message} `)
      .concat(afterMessage);
  }),
);

export const applyTransports = [
  new transports.Console({
    format: applyFormat,
  }),
  new transports.DailyRotateFile({
    filename: 'logs/system.log', // log 폴더에 system.log 이름으로 저장
    zippedArchive: true, // 압축여부
    json: true,
    format: applyFormat,
  }),
];

export const logger = createLogger({
  transports: applyTransports,
});
