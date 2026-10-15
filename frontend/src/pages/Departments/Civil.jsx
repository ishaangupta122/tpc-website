import DepartmentPage from "../../components/DepartmentPage";
import { departments } from "../../data/departments";

const CivilDepartment = () => <DepartmentPage {...departments.civil} />;

export default CivilDepartment;
