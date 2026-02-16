
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import Layout from "./components/layouts/Layout.jsx";
import AuthLayout from "./pages/auth/AuthLayout.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import RoadmapBuildLayout from "./pages/roadmap-builder/RoadmapBuildLayout.jsx";
import VariableRoadmap from "./pages/roadmap-builder/VariableRoadmap.jsx";
import ResumeRoadmap from "./pages/roadmap-builder/ResumeRoadmap.jsx";
import ExisingRoadmap from "./pages/roadmap-builder/ExisingRoadmap.jsx";
import QuizPageLayout from './pages/quiz-builder/QuizPageLayout.jsx';
import InteractiveQuiz from './pages/quiz-builder/InteractiveQuiz.jsx';
import QuizFromPdf from './pages/quiz-builder/QuizFromPdf.jsx';


export default function App() {
    return (
        <Routes>
            // layout wrapper
            <Route element={<Layout />}>

                // Routes - Valid URL
                <Route path="/" element={<Home />} />

                <Route path='/roadmap-build' element={<RoadmapBuildLayout />}>
                    <Route index element={<VariableRoadmap />} />
                    <Route path="variables" element={<VariableRoadmap />} />
                    <Route path="resume" element={<ResumeRoadmap />} />
                    <Route path="existing" element={<ExisingRoadmap />} />
                </Route>

                <Route path='/profile' element={<Profile />} />

                <Route path='/quiz' element={<QuizPageLayout />}>
                    <Route index element={<InteractiveQuiz />} />
                    <Route path='pdf' element={<QuizFromPdf />} />
                </Route>

                <Route path='/dashboard' element={<Dashboard />} />
                <Route path="/auth" element={<AuthLayout />} >
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Route>

            // handling invalid URL
            <Route path='*' element={<NotFound />} />

        </Routes>
    )
}

