'use strict';

import ISanitizeService = angular.sanitize.ISanitizeService;
import IScope = angular.IScope;
import IRootElementService = angular.IRootElementService;
import IAttributes = angular.IAttributes;
import IDirective = angular.IDirective;

var showdown: any = require('showdown/dist/showdown.js');

/**
 * markdownDirective
 * convert mdfile to html
 * <div markdown="markdown string"></div>
 */
export class MarkdownDirective {
  static Factory($sanitize: ISanitizeService): IDirective {
    'ngInject';
    return {
      restrict: 'AE',
      scope: {
        markdown: '='
      },
      link: (scope: IScope, element: IRootElementService, attrs: IAttributes) => {
        scope.$watch('markdown', (text: string) => {
          var converter = new showdown.Converter();
          var html: any = $sanitize(converter.makeHtml(text));
          element.html(html);
        });
      }
    };
  }
}
