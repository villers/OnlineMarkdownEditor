'use strict';

import IInjectorService = angular.auto.IInjectorService;
import {IPromise, IHttpPromiseCallbackArg} from 'angular';
import {Config} from './app/models/config';

import './app/app';
import './index.styl';
import './preview.styl';

/**
 * Asynchronously load config.json
 */
function getConfiguration(): IPromise<Config> {
  var configuration = angular.module('configuration', []);
  var initInjector: IInjectorService = angular.injector(['ng']);
  var $http: any = initInjector.get('$http');

  return $http.get('config.json').then((response: IHttpPromiseCallbackArg<Config>) => {
    configuration.constant('Config', response.data);
  }, () => {
    console.error('json not loaded');
  });
}

/**
 * Bootstrap application when angular and config is ready
 */
angular.element(document).ready(() => {
  getConfiguration().then(() => {
    angular.bootstrap(document, ['markdown']);
  });
});
