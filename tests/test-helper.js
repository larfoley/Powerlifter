import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import './helpers/flash-message';

import setupSinon from 'ember-sinon-qunit';

setApplication(Application.create(config.APP));

setupSinon();

start();
