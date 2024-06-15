import useRecipeStore from "../hooks/useRecipeStore";
import { cuisineType, dietType, difficultyType } from "../types/api-types";

function Datalists() {

    const { cuisines, difficulties, diets } = useRecipeStore()


    return ( 
        <>
    <datalist id="cuisineId">
        {cuisines.map((cuisine: cuisineType) => (
          <option key={cuisine.id} value={cuisine.name} />
        ))}
      </datalist>
      <datalist id="difficultyId">
        {difficulties.map((difficulty: difficultyType) => (
          <option key={difficulty.id} value={difficulty.name} />
        ))}
      </datalist>
      <datalist id="dietId">
        {diets.map((diet: dietType) => (
          <option key={diet.id} value={diet.name} />
        ))}
      </datalist>
        </>
     );
}

export default Datalists