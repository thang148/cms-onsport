import { apiLeagues } from "api"
import { useStore } from "components/ui"
import { useMemo } from "react"

const useLeagues = () => {
  const store = useStore()
  const { leagues, setLeagues } = store

  async function getLeagues() {
    try {
      let items = []
      const { data } = await apiLeagues.gets({ page_size: 1000 })
      items = data
      setLeagues(items)
    } catch (error) {
      console.log(error)
    }
  }

  const value = useMemo(
    () => ({ leagues, getLeagues }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store]
  )
  return {
    ...value
  }
}

export default useLeagues
