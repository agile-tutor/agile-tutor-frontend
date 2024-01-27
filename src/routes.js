import { Route, Routes } from "react-router-dom";
import Comision from "./components/Comision";
import PorcentajeAsistencia from "./components/PorcentajeAsistencia";
import ComisionEdit from "./components/ComisionEdit";
import Home from "./routes/Home";
import SchedulerTask from "./routes/SchedulerTask";
import Search from "./routes/Search";
import SignUp from "./routes/SignUp.js";
import Survey from "./routes/Survey.js";
import UploadFiles from "./routes/UploadFiles";
import SchedulerDay from "./components/SchedulerDay.js";
import Encuentros from "./components/Encuentros.js";

export const AttendanceRoutes = () =>

    <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route path="/register/" element={<SignUp />} />
        <Route path="/meetings/" element={<Encuentros />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/survey/" element={<Survey />} />
        <Route path="/uploadFiles/" element={<UploadFiles />} />
        <Route path="/comision/" element={<Comision />} />
        <Route path="/comisionEdit" element={<ComisionEdit />} />
        <Route path="/attendancePercent/" element={<PorcentajeAsistencia />} />
        <Route path="/tasks/" element={<SchedulerTask />} />
        <Route path="/scheduler-day/" element={<SchedulerDay />} />
        <Route path="*" component={<Home />} />
    </Routes>