import { BrowserRouter, Route, Routes as RouterProvider } from "react-router-dom";
import { Home } from "./Home";
import { Navbar } from "./components/NavBar";
export function Routes() {
  return (
    <BrowserRouter>
    <Navbar/>
      <RouterProvider>
        <Route path="/" element={<Home/>}>
        </Route>
      </RouterProvider>
    </BrowserRouter>
  )
}