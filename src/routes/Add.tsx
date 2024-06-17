import React, { useEffect, useState } from "react";
import { API_URL, Layout } from "../Layout";
import { formTypes, ingredientType } from "../types/form-types";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useRecipeStore from "../hooks/useRecipeStore";
import Datalists from "../components/ui/Datalists";
import useTitle from "../hooks/useTitle";

function AddRecipePage() {
  const navigate = useNavigate();
  useTitle("Add Recipe");

  const [id, setId] = useState<string>("");

  const {difficulties, getDifficulties, cuisines, getCuisines, diets, getDiets} = useRecipeStore()

  const [formInputs, setFormInputs] = useState<formTypes>({
    name: "",
    ingredients: [""],
    instructions: "",
    cuisineId: "",
    dietId: "",
    difficultyId: "",
    image: null,
  });

  useEffect(() => {
    getDifficulties();
    getCuisines();
    getDiets();
  }, []);


  function handleChangeIngredient(index: number, value: string) {
    const newIngredients = [...formInputs.ingredients];
    newIngredients[index] = value;
    setFormInputs((prevState) => ({
      ...prevState,
      ingredients: newIngredients,
    }));
  }
  function addAnotherIngredient() {
    const newIngredients = [...formInputs.ingredients, ""];
    setFormInputs((prevState) => ({
      ...prevState,
      ingredients: newIngredients,
    }));
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormInputs((prevState) => ({
        ...prevState,
        image: e.target.files && e?.target?.files[0] || null,
      }));
    }
  };

  function handleChangeInput(
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement | undefined
    >
  ) {
    setFormInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleEraseIngredient(index: number) {
    const newIngredients = formInputs.ingredients.toSpliced(index, 1);
    setFormInputs((prevState) => ({
      ...prevState,
      ingredients: newIngredients,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      name,
      ingredients,
      instructions,
      cuisineId,
      dietId,
      difficultyId,
      image,
    } = formInputs;

    const DifficultyId = difficulties.find((diff) => diff.name === difficultyId)?.id;
    if (!DifficultyId) {
      return toast.error("Please select a difficulty");
    }
    const DietId = diets.find((diet) => diet.name === dietId)?.id;
    if (!DietId) {
      return toast.error("Please select a diet");
    }
    const CuisineId = cuisines.find((cuisine) => cuisine.name === cuisineId)?.id;
    if (!CuisineId) {
      return toast.error("Please select a cuisine");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("ingredients", ingredients.join(","));
    formData.append("instructions", instructions);
    formData.append("cuisineId", CuisineId);
    formData.append("dietId", DietId);
    formData.append("difficultyId", DifficultyId);
    if (image) {
      formData.append("image", image);
    }

    axios
      .post(`${API_URL}/recipes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setId(res.data.id)
        toast.success(`Recipe Created`);
      })
      .catch(() => toast.error("Error creating recipe.")).finally(() => navigate(`/details/${id}`));
  };

  return (
    <Layout>
      <section className="bg-[#f7f7f7] dark:bg-gray-900">
        <h1 className="font-lato text-4xl max-w-screen-md text-balance font-bold mx-auto text-center">
          Share your <span className="italic">passion</span> with us by
          <span className="italic">sharing</span> your favorites Recipes..
        </h1>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-black">
            Add a new recipe
          </h2>
          <form onSubmit={handleSubmit} action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Recipe Name
                </label>
                <input
                  autoFocus
                  value={formInputs.name}
                  onChange={(e) => handleChangeInput(e)}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Pizza, Pasta, Rise ..."
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor={`ingredient${formInputs.ingredients.length - 1}`}
                  className="block mb-2 text-sm font-medium"
                >
                  Ingredients
                </label>
                {formInputs.ingredients.map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center gap-3 flex-nowrap"
                  >
                    <button
                      onClick={() => handleEraseIngredient(index)}
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      name="ingredients"
                      id={`ingredient${index + 1}`}
                      value={formInputs.ingredients[index]}
                      onChange={(e) =>
                        handleChangeIngredient(index, e.target.value)
                      }
                      className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={`Qta - Ingredient ${index + 1}`}
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAnotherIngredient}
                  className="mb-2 text-sm font-medium bg-white text-black rounded-full px-3 py-1.5 border-2 border-green-500"
                >
                  <span className="flex flex-nowrap items-center justify-center">                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={24} height={24} viewBox="0 0 24 24">
    <path stroke="#000" d="M6 12h12m-6-6v12" />
  </svg> Add ingredient</span>
                </button>
              </div>
              <div className="w-full">
                <label
                  htmlFor="dietId"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Dietary
                </label>

                <input
                  list="dietId"
                  type="text"
                  name="dietId"
                  id="dietId"
                  value={formInputs.dietId}
                  onChange={(e) => handleChangeInput(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Vegan, Vegetarian, Pescatarian, ..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="difficultyId"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Difficulty
                </label>
                <input
                  list="difficultyId"
                  type="text"
                  id="difficultyId"
                  name="difficultyId"
                  onChange={(e) => handleChangeInput(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  htmlFor="cuisineId"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Cuisine
                </label>
                <input
                  list="cuisineId"
                  type="text"
                  name="cuisineId"
                  id="cuisineId"
                  onChange={(e) => handleChangeInput(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Italian, American, Mexican, ..."
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="instructions"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Instructions
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  onChange={(e) => handleChangeInput(e)}
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your instructions here"
                ></textarea>
              </div>
              <div className="w-full">
                <label htmlFor="image">Recipe Image</label>
                <input onChange={handleChangeImage} required type="file" name="image" id="image" accept="image/*" />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-500 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add Recipe
            </button>
            <Datalists />
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default AddRecipePage;
