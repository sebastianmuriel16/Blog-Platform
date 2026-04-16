import { NavBar } from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { PostDetailPage } from "./pages/PostDetailPage/PostDetailPage";
import { NewPostPage } from "./pages/NewPostPage/NewPostPage";
import { DraftPostsPage } from "./pages/DraftPostsPage/DraftPostsPage";
import { UpdatePostPage } from "./pages/UpdatePost/UpdatePostPage";
import { CategoriesPage } from "./pages/CategoriesPage/CategoriesPage";
import { TagPage } from "./pages/TagPage/TagPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/new" element={<NewPostPage />} />
        <Route path="/posts/drafts" element={<DraftPostsPage />} />
        <Route path="/posts/update/:id" element={<UpdatePostPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/tags" element={<TagPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
