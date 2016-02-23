module artifact {
  'use strict';

  import IServiceProvider = angular.IServiceProvider;
  import ISanitizeService = angular.sanitize.ISanitizeService;
  import IScope = angular.IScope;
  import IRootElementService = angular.IRootElementService;
  import IAttributes = angular.IAttributes;
  import IDirective = angular.IDirective;

  /*
   * import showdown library
   */
  declare var showdown;

  /**
   * provider for MarkdownDirective
   * angular.module('myApp', [
   *   'ngSanitize'
   * ]).
   * config(function (markdownprovider) {
   *   markdownConverterProvider.config({
   *     extensions: ['twitter']
   *   });
   * });
   */
  export class MarkdownProvider implements IServiceProvider {
    private opts: any = {};

    public config(newOpts: any) {
      this.opts = newOpts;
    }

    public $get() {
      return new showdown.Converter(this.opts);
    }
  }

  /**
   * markdownDirective
   * convert mdfile to html
   * <div markdown="markdown string"></div>
   */
  export class MarkdownDirective {
    /** @ngInject */
    static Factory(markdownprovider: any, $sanitize: ISanitizeService): IDirective {
      return {
        restrict: 'AE',
        scope: {
          markdown: '='
        },
        link: (scope: IScope, element: IRootElementService, attrs: IAttributes) => {
          scope.$watch('markdown', (text: string) => {
            var html: any = $sanitize(markdownprovider.makeHtml(text));
            element.html(html);
          });
        }
      };
    }
  }
}
