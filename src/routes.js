import { Route, Routes } from "react-router-dom";
import Comision from "./components/Comision";
import PorcentajeAsistencia from "./components/PorcentajeAsistencia";
import PassAttendance from "./routes/PassAttendance";


export const AttendanceRoutes = () =>

    <Routes>
        <Route exact={true} path="/" element={<PassAttendance />} />
        <Route path="/comision/" element={<Comision />} />
        <Route path="/passAttendance/" element={<PassAttendance />} />
        <Route path="/attendancePercent/" element={<PorcentajeAsistencia />} />
    </Routes>
