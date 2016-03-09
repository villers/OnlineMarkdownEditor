'use strict';

import {IDirective, IWindowService} from 'angular';
import {Api} from '../services/api';
import {Config} from '../models/config';

interface IDocument {
  name: string;
  text: string;
  url: string;
}

class EditorCtrl {
  private document: IDocument;

  private tooltiptext: any = {
    Download: 'Download',
    Title: `
      # H1<br>
      ## H2<br>
      ### H3<br>
      #### H4<br>
      ##### H5<br>
      ###### H6<br>`,
    'List': `
      1. First ordered list item<br>
      2. Another item<br>
      * First unordered list<br>
      * Another item<br>`,
    'Link': `
      [I'm an inline-style link](https://www.google.com)<br>
      [I'm an inline-style link with title](https://www.google.com "Google's Homepage")<br>
      [I'm a relative reference to a repository file](../blob/master/LICENSE)<br>`,
  };

  constructor (private $localStorage: any, private $window: IWindowService, private api: Api, private Config: Config) {
    'ngInject';

    this.document = this.$localStorage.document;
  }

  download() {
    this.api.exportPdf(this.document.name, this.document.text).then((result: any) => {
      var url = `${this.Config.api}${result.data.type}/${result.data.name}`;
      this.$window.open(url, '_self');
    }, (error: angular.IHttpPromiseCallbackArg<string>) => {
      alert(error.data || `Check if API url is correct: ${this.Config.api}`);
    });
  }
}

/**
 * show editor
 * <editor></editor>
 */
export class EditorDirective {
  static Factory(): IDirective {
    return {
      template: `
        <div>
          <div class="header">
            <h2 class="title">Document Name</h2>
            <input class="title-document" type="text" ng-model="vm.document.name">
          </div>

          <div class="editor">

            <div class="editor-header">
              <h3 class="title">Markdown</h3>
              <a ng-click="vm.download()" download tooltip="{{vm.tooltiptext.Download}}" position="bottom">
                <i class="glyphicon glyphicon-download-alt"></i>
              </a>

              <span class="text-right">
                <a href="#" tooltip="{{vm.tooltiptext.Title}}" position="bottom">Title</a>
                <a href="#" tooltip="{{vm.tooltiptext.List}}" position="bottom">List</a>
                <a href="#" tooltip="{{vm.tooltiptext.Link}}" position="bottom">Link</a>
              </span>

            </div>

            <div class="editor-header">
              <h3 class="title">Preview</h3>
            </div>

            <textarea class="split split-editor"
              wrap="off"
              autocapitalize="off"
              spellcheck="false"
              ng-model="vm.document.text"
              ng-change="vm.download()">
            </textarea>

            <div class="split split-preview" markdown="vm.document.text"></div>

          </div>
        </div>
      `,
      replace: true,
      controller: EditorCtrl,
      controllerAs: 'vm'
    };
  }
}
