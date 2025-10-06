import './css/App.css'
import MovieCard from "./components/MovieCard"
import NavBar from "./components/NavBar"
import Favourites from "./pages/Favourites"
import Home from "./pages/Home"
import {Routes, Route} from "react-router-dom"
function App() {
  return (
    <div>
      <NavBar />

    <main className ="main-content">
      <Routes>
        <Route path="/Favourites" element={<Favourites />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
    </div>
  );
}
export default App
