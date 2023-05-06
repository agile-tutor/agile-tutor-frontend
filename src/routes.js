import { Route, Routes } from "react-router-dom";
import Comision from "./components/Comision";
import PorcentajeAsistencia from "./components/PorcentajeAsistencia";
import PassAttendance from "./routes/PassAttendance";
import EditCourse from "./routes/EditCourse";
import ComisionEdit from "./components/ComisionEdit";
import Home from "./routes/Home";
import SchedulerTask from "./routes/SchedulerTask";
import Search from "./routes/Search";
//import AlumnoModal from "./components/AlumnoModal";

export const AttendanceRoutes = () =>

    <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/comision/" element={<Comision />} />
        <Route path="/comisionEdit" element={<ComisionEdit />} />
        <Route path="/passAttendance/" element={<PassAttendance />} />
        <Route path="/editCourse/" element={<EditCourse />} />
        <Route path="/attendancePercent/" element={<PorcentajeAsistencia />} />
        <Route path="/tasks/" element={<SchedulerTask />} />
    </Routes>
