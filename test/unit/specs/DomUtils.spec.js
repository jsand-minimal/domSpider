import Vue from 'vue'
import * as DomUtils from 'src/DomUtils'

describe('DomUtils', () => {
  it('should return the first child ElementNode', () => {
    var vm = new Vue({
      template: '<div><p id="first-child-node">Hey there</p><p id="second-child-node"></p></div>'
    }).$mount()
    var resNodeChild = DomUtils.getFirstNodeChild(vm.$el)
    expect(resNodeChild.id).to.equal('first-child-node')
  })
  it('should return the first child TextNode', () => {
    var vm = new Vue({
      template: '<div>First child node</div>'
    }).$mount()
    var resNodeChild = DomUtils.getFirstNodeChild(vm.$el)
    expect(resNodeChild.nodeValue).to.equal('First child node')
  })
  it('should return the first child CommentNode', () => {
    var vm = new Vue({
      template: '<div><!--First child node-->Not the first child node</div>'
    }).$mount()
    var resNodeChild = DomUtils.getFirstNodeChild(vm.$el)
    expect(resNodeChild.nodeValue).to.equal('First child node')
  })
  it('should not return the first CommentNode', () => {
    var vm = new Vue({
      template: '<div id="head-node"><!--First child comment node--></div>'
    }).$mount()
    var resNodeChild = DomUtils.getFirstNodeChild(vm.$el, {filter: 8})
    expect(resNodeChild).to.be.null
  })
  it('should not return the first CommentNode or TextNode', () => {
    var vm = new Vue({
      template: '<div id="head-node"><!--First child comment node-->First text node</div>'
    }).$mount()
    var resNodeChild = DomUtils.getFirstNodeChild(vm.$el, {filter: [8, 3]})
    expect(resNodeChild).to.be.null
  })
  it('should return the first ElementNode', () => {
    var vm = new Vue({
      template: '<div><!--First child comment node-->First text node<p id="first-element-child-node"></p></div>'
    }).$mount()
    var resNodeChild = DomUtils.getFirstNodeChild(vm.$el, {filter: [8, 3]})
    expect(resNodeChild.id).to.equal('first-element-child-node')
  })
  it('should return the first ElementNode', () => {
    var vm = new Vue({
      template: '<div><!--First child comment node-->First text node<p id="first-element-child-node"></p></div>'
    }).$mount()
    var resNodeChild = DomUtils.getFirstNodeChild(vm.$el, {target: 1})
    expect(resNodeChild.id).to.equal('first-element-child-node')
  })
  it('should return null', () => {
    var vm = new Vue({
      template: '<div></div>'
    }).$mount()
    var resNodeChild = DomUtils.getFirstNodeChild(vm.$el)
    expect(resNodeChild).to.be.null
  })
  it('should not return the empty TextNode', () => {
    var vm = new Vue({
      template: '<div> <p id="first-element-child-node"></p></div>'
    }).$mount()
    var resNodeChild = DomUtils.getFirstNodeChild(vm.$el)
    expect(resNodeChild.id).to.equal('first-element-child-node')
  })

  it('should return the next sibling ElementNode', () => {
    var vm = new Vue({
      template: '<div><div id="start-node"></div><p id="next-sibling-node">Hey there</p><p></p></div>'
    }).$mount()
    var resNodeSibling = DomUtils.getNextNodeSibling(vm.$el.querySelector('#start-node'))
    expect(resNodeSibling.id).to.equal('next-sibling-node')
  })
  it('should return the next sibling TextNode', () => {
    var vm = new Vue({
      template: '<div><div id="start-node"></div>Next sibling node</div>'
    }).$mount()
    var resNodeSibling = DomUtils.getNextNodeSibling(vm.$el.querySelector('#start-node'))
    expect(resNodeSibling.nodeValue).to.equal('Next sibling node')
  })
  it('should return the next sibling CommentNode', () => {
    var vm = new Vue({
      template: '<div><div id="start-node"></div><!--Next sibling node-->Not the next sibling node</div>'
    }).$mount()
    var resNodeSibling = DomUtils.getNextNodeSibling(vm.$el.querySelector('#start-node'))
    expect(resNodeSibling.nodeValue).to.equal('Next sibling node')
  })
  it('should not return the next CommentNode', () => {
    var vm = new Vue({
      template: '<div><div id="start-node"></div><!--Next sibling comment node--></div>'
    }).$mount()
    var resNodeSibling = DomUtils.getNextNodeSibling(vm.$el.querySelector('#start-node'), {filter: 8})
    expect(resNodeSibling).to.be.null
  })
  it('should not return the next CommentNode or TextNode', () => {
    var vm = new Vue({
      template: '<div><div id="start-node"></div><!--Next sibling comment node-->First text node</div>'
    }).$mount()
    var resNodeSibling = DomUtils.getNextNodeSibling(vm.$el.querySelector('#start-node'), {filter: [8, 3]})
    expect(resNodeSibling).to.be.null
  })
  it('should return the next ElementNode', () => {
    var vm = new Vue({
      template: '<div><div id="start-node"></div><!--Next sibling comment node-->First text node<p id="next-element-node"></p></div>'
    }).$mount()
    var resNodeSibling = DomUtils.getNextNodeSibling(vm.$el.querySelector('#start-node'), {filter: [8, 3]})
    expect(resNodeSibling.id).to.equal('next-element-node')
  })
  it('should return the next ElementNode', () => {
    var vm = new Vue({
      template: '<div><div id="start-node"></div><!--Next sibling comment node-->First text node<p id="first-element-child-node"></p></div>'
    }).$mount()
    var resNodeSibling = DomUtils.getNextNodeSibling(vm.$el.querySelector('#start-node'), {target: 1})
    expect(resNodeSibling.id).to.equal('first-element-child-node')
  })
  it('should return null', () => {
    var vm = new Vue({
      template: '<div><div id="start-node"></div></div>'
    }).$mount()
    var resNodeSibling = DomUtils.getNextNodeSibling(vm.$el.querySelector('#start-node'))
    expect(resNodeSibling).to.be.null
  })
})
