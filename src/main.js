import Vue from 'vue'
// import App from './App'
import DomSpider from './DomSpider'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  data: {
    spider: {}
  },
  ready: function () {
    debugger
    this.spider = new DomSpider('body')
  }
})
