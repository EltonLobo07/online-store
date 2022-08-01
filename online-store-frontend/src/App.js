import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContainer from "./components/MainContainer";
import "./App.css";

function App() {
    return (
        <MainContainer>
            <Header />
            <Outlet />
            <Footer />
        </MainContainer>
    );
};

export default App;
