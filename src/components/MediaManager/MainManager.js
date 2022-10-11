import React, { useEffect, useState } from "react"
import { Tree } from "antd"
import ViewFolder from "./ViewFolder"
import { apiMedia } from "api"
import { getName, searchTree } from "./Comp"
import ItemTitle from "./ItemTitle"

const { DirectoryTree } = Tree

export function converDataTree(_list) {
  let list = [..._list]
  function loop(__list) {
    for (let i = 0; i < __list.length; i++) {
      __list[i].title = __list[i].item_name
      __list[i].key = __list[i].id
      __list[i].children = __list[i].childs
      if (__list[i].children && __list[i].children.length > 0) {
        loop(__list[i].children)
      }
    }
  }
  loop(list)
  return list
}

export default function MainManager({ onChangeFile }) {
  const [treeData, setTree] = useState([])
  const [selected, setSelected] = useState({
    id: 0,
    item_name: "This PC"
  })

  const fetch = async () => {
    try {
      const { data } = await apiMedia.getTrees()
      const _newData = data
      setTree(converDataTree(_newData))
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  async function onAction(k, node, v) {
    if (k === "edit") {
      await apiMedia.updateFolder({
        id: node.id,
        item_name: v,
        parent_id: node.parent_id,
        parent_id_text: v.parent_id_text
      })
    }
    if (k === "add") {
      const element = {
        id: "test",
        children: treeData
      }
      const item = searchTree(element, node.id)
      let newName = "New folder"
      if (item.children?.find((i) => i.item_name === newName)) {
        newName = getName(item.children, newName, 1)
      }
      await apiMedia.createFolder({
        item_name: newName,
        parent_id: node.id,
        parent_id_text: node.item_name
      })
      fetch()
    }
    if (k === "delete") {
      await apiMedia.deleteFile([node.id])
      fetch()
    }
  }

  function backFolder() {
    const item = searchTree(
      {
        children: treeData,
        id: 0,
        item_name: "This PC"
      },
      selected.parent_id
    )
    setSelected({
      id: selected.parent_id,
      item_name: selected.parent_id_text,
      parent_id: item?.parent_id || 0,
      parent_id_text: item?.parent_id_text || "This PC"
    })
  }

  function onSelect(selectedKeys, selectedNodes) {
    setSelected(selectedNodes.node)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <article>
      <div className="flex">
        <div className="overflow-auto __tree_left ">
          <div
            className="p-2 text-lg font-semibold shadow sticky top-0 z-10 mb-2"
            style={{ height: 48 }}
          >
            Media onnews
          </div>
          <DirectoryTree
            defaultExpandAll={true}
            treeData={treeData}
            onSelect={onSelect}
            titleRender={(nodeData) => (
              <ItemTitle
                item_name={nodeData.item_name}
                onAction={(k, v) => onAction(k, nodeData, v)}
              />
            )}
          />
        </div>
        <div className="overflow-auto flex-grow __tree_right bg-white">
          <ViewFolder
            selected={selected}
            reLoad={fetch}
            onChangeFile={onChangeFile}
            backFolder={backFolder}
            setSelected={setSelected}
          />
        </div>
      </div>
    </article>
  )
}
