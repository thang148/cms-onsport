export function searchTree(node, id) {
  if (node.id === id) {
    return node
  } else if (node.children && node.children.length > 0) {
    var i
    var result = null
    for (i = 0; result == null && i < node.children.length; i++) {
      result = searchTree(node.children[i], id)
    }
    return result
  }
  return null
}

export function getName(list, newName, index) {
  const _name = newName + index
  if (!list.find((i) => i.item_name === _name)) {
    return _name
  } else {
    index++
    return getName(list, newName, index)
  }
}
