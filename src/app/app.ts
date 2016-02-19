'use strict';

import {NavbarDirective} from './directive/navbar';
import {MarkdownDirective} from './directive/markdown';
import {EditorDirective} from './directive/editor';
import {ToolTipDirective} from './directive/tooltip';
import {Api} from './services/api';

angular.module('markdown', ['ngStorage', 'ngSanitize', 'configuration'])
  .directive('navbar', NavbarDirective.Factory)
  .directive('markdown', MarkdownDirective.Factory)
  .directive('editor', EditorDirective.Factory)
  .directive('tooltip', ToolTipDirective.Factory)
  .service('api', Api)

  .run(($localStorage: any) => {
    'ngInject';
    $localStorage.$default({
      document: {
        name: 'Untitled Document.md',
        text: ''
      }
    });
  });
