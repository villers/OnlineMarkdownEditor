module artifact {
  'use strict';

  interface IDocument {
    name: string;
    text: string
  }

  export class MainCtrl {
    private document: IDocument;

    /** @ngInject */
    constructor ($localStorage: any) {
      this.document = $localStorage.document;
    }
  }
}
