'use strict';

import IScope = angular.IScope;
import IRootElementService = angular.IRootElementService;
import IAttributes = angular.IAttributes;
import IDirective = angular.IDirective;

var hljs: any = require('highlight.js');
var MarkdownIt: any = require('markdown-it');

/**
 * markdownDirective
 * convert mdfile to html
 * <div markdown="markdown string"></div>
 */
export class MarkdownDirective {
  static Factory(): IDirective {
    return {
      restrict: 'AE',
      scope: {
        markdown: '='
      },
      link: (scope: IScope, element: IRootElementService, attrs: IAttributes) => {
        scope.$watch('markdown', (text: string) => {
          element.html(MarkdownDirective.Markdown(text));
        });
      }
    };
  }

  private static Markdown(text: string): string {
    var md: any = new MarkdownIt({
      linkify: true,
      typographer: true,
      highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(lang, str).value;
        } else {
          return hljs.highlightAuto(str).value;
        }
      }
    }).use(require('markdown-it-toc'))
      .use(require('markdown-it-footnote'))
      .use(require('markdown-it-sub'))
      .use(require('markdown-it-sup'))
      .use(require('markdown-it-mark'))
      .use(require('markdown-it-deflist'))
      .use(require('markdown-it-ins'))
      .use(require('markdown-it-abbr'))
      .use(require('markdown-it-checkbox'))
      .use(require('markdown-it-emoji'));

    md.renderer.rules.table_open = function () {
      return '<table class="table table-striped">\n';
    };
    return md.render(text);
  }
}
