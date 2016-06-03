import * as DomUtils from 'src/DomUtils'
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
      if (!node) return
      this.node = node
      // prevSibling
      this.prevSibilngObserver = options.hasOwnProperty('prevSiblingObserver') ? options.prevSiblingObserver : null
      // child
      this.childObserver = createObserver(DomUtils.getFirstNodeChild(node), {parentObserver: this})
      // next
      this.nextSiblingObserver = createObserver(DomUtils.getNextNodeSibling(node), {prevSiblingObserver: this})
      // parent
      this.parentObserver = options.hasOwnProperty('parentObserver') ? options.parentObserver : null
      // if (siblingObserver
      console.log('created NodeObserver')
      // discover()
    }

    broadcast (message) {
      if (true || message) {
        this.takeAction()
      }
      this.childObserver.broadcast()
      this.nextSiblingObserver.broadcast()
    }

    takeAction () {
      console.log(this.node)
    }
  }

  function createObserver (node, options) {
    if (!node) {
      return new NullObserver()
    }
    if (node.nodeType === 1) {
      return new ElementObserver(node, options)
    }
    else {
      return new TextNodeObserver(node, options)
    }
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

    takeAction () {
      this.node.nodeValue += 'hi'
    }
  }

  class NullObserver extends NodeObserver {
    constructor () {
      super(null)
    }
    broadcast () {
    }
    takeAction () {
    }
  }

  init()
  headObserver.broadcast()
}
