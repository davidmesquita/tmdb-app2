import { BrowserRouter, Route, Routes as RouterProvider } from "react-router-dom";
import { Home } from "./Home";
import { Navbar } from "./components/NavBar";
import { FilterProvider } from "./components/context/filterContext"
import { Details } from "./details";
export function Routes() {
  return (
    <BrowserRouter>
      <FilterProvider>
        <Navbar />
        <RouterProvider>
          <Route path="/" element={<Home />}/>
          <Route path="/detail/:typeContent/:id" element={<Details/>}/>
        </RouterProvider>
      </FilterProvider>
    </BrowserRouter>
  )
}