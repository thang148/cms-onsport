import { apiScreenblockOnTV } from "api"
import { useStore } from "components/ui"
import { useMemo } from "react"

const useBlocks = () => {
  const store = useStore()
  const { blocks, setBlocks } = useStore()

  async function getBlocks() {
    try {
      let items = []
      const { data } = await apiScreenblockOnTV.gets()
      items = data.map(({ id, name, is_active, is_live, is_liveshow }) => {
        return { label: name, value: id, disabled: !is_active, is_live, is_liveshow }
      })
      setBlocks(items)
    } catch (error) {
      console.log(error)
    }
  }

  const value = useMemo(
    () => ({ blocks, getBlocks }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store]
  )
  return {
    ...value
  }
}

export default useBlocks
