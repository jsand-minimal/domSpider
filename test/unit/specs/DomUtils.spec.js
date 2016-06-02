import * as DomUtils from 'src/DomUtils'

describe('DomUtils', () => {
  it('should return the first child node', () => {
    var bodyNode = document.querySelector('body')
    expect(DomUtils.getFirstChildNode(bodyNode)).to.equal(bodyNode)
  })
})
