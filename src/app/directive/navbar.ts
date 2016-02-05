'use strict';
'ngInject';

import IDirective = angular.IDirective;

/**
 * show navbar
 * <navbar></navbar>
 */
export class NavbarDirective {
  static Factory(): IDirective {
    return {
      template: `
        <nav class="navigation clearfix">
          <ul>
            <li><a href="#" class="brand">Online Markdown Editor</a></li>
            <li><a href="http://www.writage.com/" target="_blank">Markdown plugin for Microsoft Word</a></li>
          </ul>
        </nav>
      `,
      replace: true
    };
  }
}
