import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainContainer from "./components/main-container/MainContainer";
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
