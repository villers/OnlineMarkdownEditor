'use strict';

import {NavbarDirective} from './directive/navbar';
import {MarkdownDirective} from './directive/markdown';
import {EditorDirective} from './directive/editor';
import {ToolTipDirective} from './directive/tooltip';

angular.module('artifact', ['ngStorage', 'ngSanitize'])
  .directive('navbar', NavbarDirective.Factory)
  .directive('markdown', MarkdownDirective.Factory)
  .directive('editor', EditorDirective.Factory)
  .directive('tooltip', ToolTipDirective.Factory)

  /**
   * overrides the default regular expression that is used for
   * whitelisting of safe urls during a[href] sanitization.
   */
  .config(($compileProvider: angular.ICompileProvider) => {
    'ngInject';
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
  })

  .run(($localStorage: any) => {
    'ngInject';
    $localStorage.$default({
      document: {
        name: 'Untitled Document.md',
        text: '',
        url: ''
      }
    });
  });
