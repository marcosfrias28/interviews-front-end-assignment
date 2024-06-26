import { Link, useParams } from "react-router-dom";
import useRecipeStore from "../hooks/useRecipeStore";
import { useEffect, useState } from "react";
import { Layout } from "../Layout";
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
import moment from "moment";
import ReplyButton from "../components/ui/buttons/ReplyButton";
import { getRecipeById } from "../utils/getRecipeById";
import { API_URL } from "../utils/API_URL";

const initialCommentState = {
  comment: "",
  rating: 4,
  date: new Date(),
};

function handleReply() {
  const $textarea = document.querySelector("#comment") as HTMLTextAreaElement;
  $textarea.focus();
}

function DetailsPage() {
  const { id } = useParams();
  const { cuisines } = useRecipeStore();
  const [currentRecipe, setCurrentRecipe] = useState<newRecipesType | {}>({});
  const [created, setCreated] = useState(false);
  const [comment, setComment] = useState(initialCommentState);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log(e.target.name, e.target.value);

    setComment({ ...comment, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function getData () {
      const recipe = await getRecipeById(id as string)
      setCurrentRecipe(recipe)
    }
    getData()
  }, [created]);

  function handleSumbit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post(`${API_URL}/recipes/${id}/comments`, comment)
      .then((res) => {
        console.log(res.data);
        setCreated(!created);
        toast.success("Thanks for your comment! It was created");
        setComment(initialCommentState);
      })
      .catch(() => toast.error("Something went wrong"));
  }

  const {
    name,
    cuisineId,
    ingredients,
    comments,
    instructions,
    difficultyId,
    image,
  } = currentRecipe as unknown as newRecipesType;

  console.log(comments);
  

  useTitle(name);

  return (
    <Layout>
      <div className="flex-grow-0 h-24 mx-5">
        <h1 className="font-black pb-10 text-5xl md:text-6xl font-lato text-center">
          {name}
        </h1>
      </div>

      <section className="bg-zinc-100 rounded-3xl shadow-2xl flex xl:flex-row flex-col px-5 mt-10 mb-44 w-dvh min-w-dvw lg:w-[1550px] lg:h-[1000px] lg:max-h-[1000px] max-w-screen-2xl">
        <article className="w-full h-fit">
          <div className="relative w-full rounded-lg h-full max-h-[800px] overflow-hidden mb-4">
            <img
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x400?text=Recipe";
              }}
              className="h-full w-full aspect-square sm:aspect-video object-cover object-center transition-all"
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
          <div className="flex flex-col justify-between mb-7 ml-5">
            <section className="ingredients"></section>
            <h2 className="text-center font-semibold font-lato text-lg lg:text-2xl mb-5">
              Ingredients
            </h2>
            <ul className="w-full min-h-24">
              {ingredients?.map((ingredient: ingredientType, index) => (
                <li
                  key={index}
                  className="items-center gap-2 list-inside list-item list-disc"
                >
                  <span className="text-sm">{ingredient}</span>
                </li>
              ))}
            </ul>
            <section className="instructions text-center">
              <h3 className="font-semibold font-lato text-lg lg:text-2xl mb-5">
                instructions
              </h3>
              <div className="w-full text-center">
                <p className="w-full max-w-[800px] mx-auto">{instructions}</p>
              </div>
            </section>
          </div>
        </article>
        <section className="bg-white flex flex-col gap-5 justify-between rounded-b-3xl rounded-tr-3xl dark:bg-gray-900 py-4 px-5 md:px-10 md:py-8 w-full">
          <div className="w-full h-full max-h-[500px] mx-auto px-4 overflow-scroll overflow-x-hidden">
            {comments?.length > 0 &&
              comments.map((comment) => (
                <article className="p-6 mb-3 text-base bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <div className="flex justify-between items-center mb-2">
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
                        <time>{moment(comment.date).format("LLL")}</time>
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {comment.comment}
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    <ReplyButton onClick={handleReply} />
                  </div>
                </article>
              ))}
          </div>

          <form onSubmit={handleSumbit} className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Comments {`${comments?.length ? `(${comments?.length})` : ""}`}
              </h2>
            </div>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                onChange={handleChange}
                value={comment.comment}
                rows={6}
                name="comment"
                className="px-0 resize-none w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
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
