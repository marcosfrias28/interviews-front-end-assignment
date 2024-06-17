import { useEffect } from "react"

function useTitle (title: string) {
    useEffect(() => {
      document.title = 'RecipeBook - ' + title
    }, [title])
  }

  export default useTitle