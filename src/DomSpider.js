import DomUtils from 'DomUtils'
/*eslint no-unused-vars: 0*/
/*eslint brace-style: ["error", "stroustrup"]*/
export default function (headEl) {
  // var self = this
  var headObserver = {}

  function init () {
    if (typeof headEl === 'string') {
      headEl = document.querySelector(headEl)
    }
    // throw error if headEl is not a DOM element?

    headObserver = new ElementObserver(headEl)
  }

  class NodeObserver {
    constructor (node, options) {
      this.node = node
      // prevSibling
      this.prevSibilngObserver = options.hasOwnProperty('prevSiblingObserver') ? options.prevSiblingObserver : null
      // child
      this.childObserver = createObserver(getChildNode(node), {parentObserver: this})
      // next
      this.nextSiblingObserver = createObserver(getNextSiblingNode(node), {prevSiblingObserver: this})
      // parent
      this.parentObserver = options.hasOwnProperty('parentObserver') ? options.parentObserver : null
      // if (siblingObserver
      console.log('created NodeObserver')
      // discover()
    }

  }

  function createObserver (node, options) {
    if (node.nodeType === 1) {
      return new ElementObserver(node, options)
    }
    else {
      return new TextNodeObserver(node, options)
    }
  }

  function getChildNode (node) {
    return null
  }

  function getNextSiblingNode (node) {
    return null
  }

  function getObserverClass (node) {
    if (node.nodeType === 1) {
      return ElementObserver
    }
    else {
      return TextNodeObserver
    }
  }

  class ElementObserver extends NodeObserver {
    constructor (node, options) {
      options = options || {}
      console.log('created ElementObserver')
      super(node, options)
    }
  }

  class TextNodeObserver extends NodeObserver {
    constructor (node, options) {
      options = options || {}
      console.log('created TextNodeObserver')
      super(node, options)
    }
  }

  init()
}
