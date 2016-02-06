'use strict';

import IDocumentService = angular.IDocumentService;
import IDirective = angular.IDirective;
import ICompileService = angular.ICompileService;
import IWindowService = angular.IWindowService;
import IScope = angular.IScope;
import IRootElementService = angular.IRootElementService;
import IAttributes = angular.IAttributes;
import IAugmentedJQuery = angular.IAugmentedJQuery;

/**
 * show navbar
 * <navbar></navbar>
 */
export class ToolTipDirective {
  static Factory($document: IDocumentService, $compile: ICompileService, $window: IWindowService): IDirective {
    'ngInject';
    return {
      restrict: 'A',
      scope: true,
      link: (scope: IScope, element: IRootElementService, attrs: IAttributes) => {
        var tip: IAugmentedJQuery = $compile('<div class="mytooltip tooltip-down" ng-bind-html="text"></div>')(scope);
        var tipActiveClassName = 'tooltip-show';
        scope['text'] = attrs['tooltip'];

        $document.find('body').append(tip);

        element.bind('mouseover', (e: any) => {
          tip.addClass(tipActiveClassName);
          tip.css(ToolTipDirective.calculPosition(e, element, $window, tip, attrs));
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

  private static calculPosition(e: any, element: IRootElementService, $window: IWindowService, tip: IAugmentedJQuery, attrs: IAttributes) {
    var boundingClientRect = e.target.getBoundingClientRect();
    var position: any = {
      width: element.prop('offsetWidth'),
      height: element.prop('offsetHeight'),
      top: boundingClientRect.top + $window.pageYOffset,
      left: boundingClientRect.left + $window.pageXOffset
    };
    var ttWidth: number = tip.prop( 'offsetWidth' );
    var ttHeight: number = tip.prop( 'offsetHeight' );

    switch (attrs['position']) {
      case 'right':
        return {
          top: (position.top + position.height / 2 - ttHeight / 2) + 'px',
          left: (position.left + position.width) + 'px'
        };
      case 'bottom':
        return {
          top: (position.top + position.height) + 'px',
          left: (position.left + position.width / 2 - ttWidth / 2) + 'px'
        };
      case 'left':
        return {
          top: (position.top + position.height / 2 - ttHeight / 2) + 'px',
          left: (position.left - ttWidth) + 'px'
        };
      default:
        return {
          top: (position.top - ttHeight) + 'px',
          left: (position.left + position.width / 2 - ttWidth / 2) + 'px'
        };
    }
  };
}
