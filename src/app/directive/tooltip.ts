module artifact {
  'use strict';

  import IDirective = angular.IDirective;

  /**
   * show navbar
   * <navbar></navbar>
   */
  export class ToolTipDirective {
    /** @ngInject */
    static Factory($document: angular.IDocumentService, $compile: angular.ICompileService): IDirective {
      return {
        restrict: 'A',
        scope: true,
        link: (scope: angular.IScope, element, attrs) => {
          var tip = $compile('<div class="mytooltip tooltip-down" ng-bind-html="text"></div>')(scope);
          var tipActiveClassName = 'tooltip-show';
          scope['text'] = attrs['tooltip'];

          $document.find('body').append(tip);

          element.bind('mouseover', (e: any) => {
            tip.addClass(tipActiveClassName);

            var pos = e.target.getBoundingClientRect();
            var offset = tip.offset();
            var tipWidth = tip.outerWidth();
            var elWidth = pos.width || pos.right - pos.left;
            var elHeight = pos.height || pos.bottom - pos.top;
            var tipOffset = 10;

            offset.top = pos.top + elHeight + tipOffset;
            offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
            tip.offset(offset);
          });

          element.bind('mouseout', () => {
            tip.removeClass(tipActiveClassName);
          });

          tip.bind('mouseover', () => {
            tip.addClass(tipActiveClassName);
          });

          tip.bind('mouseout', () => {
            tip.removeClass(tipActiveClassName);
          });
        }
      };
    }
  }
}
