'use strict';

import {IHttpService} from 'angular';
import {Config} from '../models/config';

/**
 * Api Service
 */
export class Api {

  private _api: string;

  /**
   * Dependency injection
   * @param $http         Service is a core Angular service that facilitates communication with the remote HTTP servers
   * via the browser's XMLHttpRequest object or via JSONP.
   */
  constructor(private $http: IHttpService, Config: Config) {
    'ngInject';

    this._api = Config.api;
  }

  /**
   * download currentMarkdown as pdf
   * @param name   search key
   * @returns          markdown string
   */
  exportPdf(name: string, content: string): angular.IPromise<string> {
    return this.$http.post(`${this._api}fetch_pdf`, {name: name, unmd: content});
  }
}
