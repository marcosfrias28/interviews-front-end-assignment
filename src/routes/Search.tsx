import { useEffect } from "react";
import { useRecipeStore } from "../store/recipeStore";
import { Layout } from "../App";

function SearchPage () {
    const searchResults = useRecipeStore(state => state.searchResults)

    useEffect(() => {
    console.log(searchResults);
    }, [searchResults])
    
    return (
      <Layout>
        <h1>Search Page</h1>
      </Layout>
    )
  }

export default SearchPage;