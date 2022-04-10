'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const dotenv = winext.require('dotenv');
const chalk = winext.require('chalk');
const amqp = require('amqplib/callback_api');
const { get } = lodash;

function RabbitMqStore(params = {}) {
  const requestId = get(params, 'requestId');
  const loggerFactory = get(params, 'loggerFactory');
  const loggerTracer = get(params, 'loggerTracer');
  // config env
  dotenv.config();

  this.startAMQP = async function () {
    try {
      loggerFactory.info(`AMQP connection has been start`, {
        requestId: `${requestId}`,
      });

      loggerFactory.info(`AMQP connection has been end`, {
        requestId: `${requestId}`,
      });
    } catch (err) {
      loggerFactory.error(`AMQP redis has been error : ${err}`, {
        requestId: `${requestId}`,
        args: { err },
      });
      return Promise.reject(err);
    }
  };
}

exports = module.exports = new RabbitMqStore();
exports.register = RabbitMqStore;
