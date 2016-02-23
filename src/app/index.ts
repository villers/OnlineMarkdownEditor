/// <reference path="../../.tmp/typings/tsd.d.ts" />
///<reference path="main/main.controller.ts"/>
///<reference path="directive/markdown.ts"/>
///<reference path="directive/navbar.ts"/>
///<reference path="directive/editor.ts"/>

module artifact {
  'use strict';

  angular.module('artifact', ['ngStorage', 'ngSanitize', 'ngSanitize'])
    .directive('navbar', NavbarDirective.Factory)
    .provider('markdownprovider', MarkdownProvider)
    .directive('markdown', MarkdownDirective.Factory)
    .directive('editor', EditorDirective.Factory)

    // overrides the default regular expression that is used for whitelisting of safe urls during a[href] sanitization.
    .config(($compileProvider: angular.ICompileProvider) => {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
    })

    /** @ngInject */
    .run(($localStorage: any) => {
      // init sessionStorage
      $localStorage.$default({
        document: {
          name: 'Untitled Document.md',
          text: '',
          url: ''
        }
      });
    });
}
