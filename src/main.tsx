import ReactDOM from "react-dom/client";
import "./index.css";
import "flowbite";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./routes/Welcome";
import HomePage from "./routes/Home";
import SearchPage from "./routes/Search";
import DetailsPage from "./routes/Details";
import AddRecipePage from "./routes/Add";
import Page404 from "./routes/404";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recipes/:id" element={<DetailsPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="*" element={<Page404></Page404>} />
        <></>
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);
