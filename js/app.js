'use strict';
class Router {
  replaceLinks(document) {
  }
}

class AmpPage {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  _fetchDocument(url) {
    return new Promise((resolve, reject) => {
      this.xhr_ = new XMLHttpRequest();
      this.xhr_.open('GET', url, true);
      this.xhr_.responseType = 'document';
      this.xhr_.setRequestHeader('Accept', 'text/*');
      this.xhr_.onreadystatechange = () => {
        if (this.xhr_.readyState < 2) {
          return;
        }
        if (this.xhr_.status < 100 || this.xhr_.status > 599) {
          this.xhr_.onreadystatechange = null;
          reject(new Error(`Unknown HTTP status ${this.xhr_.status}`));
          this.xhr_ = null;
          return;
        }
        if (this.xhr_.readyState === 4) {
          if (this.xhr_.responseXML) {
            resolve(this.xhr_.responseXML);
          } else {
            reject(new Error('No xhr.responseXML'));
          }
          this.xhr_ = null;
        }
      };
      this.xhr_.onerror = () => { reject(new Error('Network failure')); };
      this.xhr_.onabort = () => { reject(new Error('Request aborted')); };
      this.xhr_.send();
    });
  };

  loadDocument(url) {

  }
}

const ampReadyPromise = new Promise(resolve => {
  (window.AMP = window.AMP || []).push(resolve);
});
const router = new Router();
