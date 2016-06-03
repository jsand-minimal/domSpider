/*eslint no-unused-vars: 0*/
/*eslint brace-style: ["error", "stroustrup"]*/
const nodeTypes = {
  elementNode: 1,
  textNode: 3,
  processingInstructionNode: 7,
  commentNode: 8,
  documentNode: 9,
  documentTypeNode: 10,
  documentFragmentNode: 11
}
const TEXT_NODE_TYPE = 3
export function getFirstNodeChild (node, options) {
  // format options object
  options = options || {}
  if (!Array.isArray(options.filter)) {
    options.filter = typeof options.filter === 'number' ? [options.filter] : []
  }
  if (!Array.isArray(options.target)) {
    if (options.target) {
      options.target = [options.target]
    }
    else {
      options.target = []
      for (var nodeType in nodeTypes) {
        options.target.push(nodeTypes[nodeType])
      }
    }
  }
  var targetNodeTypes = options.target.filter(nodeType => {
    return options.filter.indexOf(nodeType) < 0
  })
  var nodeList = node.childNodes
  for (var n = 0; n < nodeList.length; n++) {
    if (targetNodeTypes.indexOf(nodeList[n].nodeType) >= 0) {
      if (!(nodeList[n].nodeType === TEXT_NODE_TYPE && nodeList[n].nodeValue.replace(/\s+/, '').length === 0)) {
        return nodeList[n]
      }
    }
  }
  return null
}
export function getNextNodeSibling (node, options) {
  // format options object
  options = options || {}
  if (!Array.isArray(options.filter)) {
    options.filter = typeof options.filter === 'number' ? [options.filter] : []
  }
  if (!Array.isArray(options.target)) {
    if (options.target) {
      options.target = [options.target]
    }
    else {
      options.target = []
      for (var nodeType in nodeTypes) {
        options.target.push(nodeTypes[nodeType])
      }
    }
  }
  var targetNodeTypes = options.target.filter(nodeType => {
    return options.filter.indexOf(nodeType) < 0
  })
  var nextNode = node.nextSibling
  while (nextNode) {
    if (targetNodeTypes.indexOf(nextNode.nodeType) >= 0) {
      if (!(nextNode.nodeType === TEXT_NODE_TYPE && nextNode.nodeValue.replace(/\s+/, '').length === 0)) {
        return nextNode
      }
    }
    nextNode = nextNode.nextSibling
  }
  return nextNode
}
