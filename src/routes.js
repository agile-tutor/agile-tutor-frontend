import { Route, Routes } from "react-router-dom";
import Comision from "./components/Comision";
import PorcentajeAsistencia from "./components/PorcentajeAsistencia";


export const AttendanceRoutes = () =>

    <Routes>
        <Route exact={true} path="/" element={<Comision />} />
        <Route path="/attendancePercent/" element={<PorcentajeAsistencia />} />
    </Routes>
