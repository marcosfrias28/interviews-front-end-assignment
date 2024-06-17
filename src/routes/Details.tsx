import { Link, useParams } from "react-router-dom";
import useRecipeStore from "../hooks/useRecipeStore";
import { useEffect, useState } from "react";
import { API_URL, Layout } from "../Layout";
import axios from "axios";
import {
  cuisineType,
  ingredientType,
  newRecipesType,
} from "../types/api-types";
import { toast } from "sonner";
import DifficultyLabel from "../components/ui/DifficultyLabel";
import { GetFlag } from "../components/ui/FlagIcons";
import useTitle from "../hooks/useTitle";

function DetailsPage() {
  const { id } = useParams();
  const { cuisines, recipes } = useRecipeStore();
  const [currentRecipe, setCurrentRecipe] = useState<newRecipesType | {}>({});
  useEffect(() => {
    axios
      .get(`${API_URL}/recipes/${id}`)
      .then((resRecipe) => {
        axios
          .get(`${API_URL}/recipes/${id}/comments`)
          .then((resComments) => {
            resRecipe.data.comments = resComments.data;
          })
          .catch((e) => toast.error('Something went wrong getting "comments"'))
          .finally(() => setCurrentRecipe(resRecipe.data));
      })
      .catch((e) => toast.error("Something went wrong"));
  }, []);

  const {
    name,
    cuisineId,
    ingredients,
    comments,
    instructions,
    difficultyId,
    image,
  } = currentRecipe as unknown as newRecipesType;

  useTitle(name);

  return (
    <Layout>
      <h1 className="font-black flex-grow-0 text-7xl font-lato text-center mb-10">
        {name}
      </h1>
      <section className="bg-zinc-100 rounded-3xl shadow-2xl flex xl:flex-row flex-col mt-10 mb-20 w-full h-fit max-w-screen-2xl">
        <article className="sm:px-4 lg:px-4 w-full h-fit">
          <div className="relative w-full rounded-lg h-full max-h-[800px] overflow-hidden mb-4">
            <img
              className="h-full w-full object-cover object-center transition-all"
              src={`${API_URL}${image}`}
              alt={name}
            />
            <div className="absolute z-10 bottom-0 left-1/2 flex gap-5 m-auto -translate-x-1/2 mb-2">
              <span className="flex items-center text-nowrap justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto">
                <GetFlag nationality={cuisineId} />
                {
                  cuisines.find(
                    (cuisine: cuisineType) => cuisine.id === cuisineId
                  )?.name
                }
              </span>
              <span className="flex items-center justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto">
                Difficulty: <DifficultyLabel difficulty={difficultyId} />
              </span>
            </div>
          </div>
          <div className="flex justify-between mb-7">
            <ul className="w-1/2">
              <h2 className="text-center font-semibold font-lato text-lg lg:text-2xl">
                Ingredients
              </h2>
              {ingredients?.map((ingredient: ingredientType, index) => (
                <li key={index} className="items-center gap-2 list-inside list-item list-disc">
                  <span className="text-sm">{ingredient}</span>
                </li>
              ))}
            </ul>
            <div className=" bg-black w-[3px] mx-5" />
            <div className="w-1/2">
              <h3 className="text-center font-semibold text-sm italic">
                instructions
              </h3>
              <p>{instructions}</p>
            </div>
          </div>
          <div className="w-full">
              <h3 className="text-center font-semibold text-sm italic">
                instructions
              </h3>
              <p>{instructions}</p>
            </div>
        </article>
        <section className="bg-white rounded-b-3xl rounded-tr-3xl dark:bg-gray-900 py-8 px-10 w-full">
          <div className="max-w-2xl h-full max-h-[500px] mx-auto px-4 overflow-clip overflow-x-hidden">
            {comments?.length > 0 && comments.map(comment => (
              <article className="p-6 mb-3 text-base bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie Green"
                    />
                    Username
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time dateTime="2022-03-12" title="March 12th, 2022">
                      {comment.date}
                    </time>
                  </p>
                </div>
                <button
                  id="dropdownComment3Button"
                  data-dropdown-toggle="dropdownComment3"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownComment3"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">
                The article covers the essentials, challenges, myths and stages
                the UX designer should consider while creating the design
                strategy.
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                  <svg
                    className="mr-1.5 w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                  </svg>
                  Reply
                </button>
              </div>
            </article>

            ))}
            <article className="p-6 mb-3 text-base bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie Green"
                    />
                    Bonnie Green
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time dateTime="2022-03-12" title="March 12th, 2022">
                      Mar. 12, 2022
                    </time>
                  </p>
                </div>
                <button
                  id="dropdownComment3Button"
                  data-dropdown-toggle="dropdownComment3"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownComment3"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">
                The article covers the essentials, challenges, myths and stages
                the UX designer should consider while creating the design
                strategy.
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                  <svg
                    className="mr-1.5 w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            <article className="p-6 mb-3 text-base bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                      alt="Helene Engels"
                    />
                    Helene Engels
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time dateTime="2022-06-23" title="June 23rd, 2022">
                      Jun. 23, 2022
                    </time>
                  </p>
                </div>
                <button
                  id="dropdownComment4Button"
                  data-dropdown-toggle="dropdownComment4"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownComment4"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">
                Thanks for sharing this. I do came from the Backend development
                and explored some of the tools to design my Side Projects.
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                  <svg
                    className="mr-1.5 w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Comments ({comments?.length || 0})
            </h2>
          </div>
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Leave a comment about this recipe..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-500 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Send comment
            </button>
          </form>
        </section>
      </section>
    </Layout>
  );
}
export default DetailsPage;
