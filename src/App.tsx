import './scss/app.scss';
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cart from './pages/Cart.tsx';
import {Route, Routes} from "react-router-dom";
import FullPizza from "./pages/FullPizza.tsx";
import MainLayout from "./layouts/MainLayout.tsx";


function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='' element={<Home />}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path='pizza/:id' element={<FullPizza/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>

    );
};

export default App;