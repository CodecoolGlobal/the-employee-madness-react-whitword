import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        {/* <li className="grow">
          <Link to="/missing">Missing Employees</Link>
        </li> */}
        <li className="grow">
          <Link to="/divisions">Divisions</Link>
        </li>
        <li className="grow">
          <Link to="/equipments">Equipments</Link>
        </li>
        <li className="grow">
          <Link to="/training-sessions">Training sessions</Link>
        </li>
        <li className="grow">
          <Link to="/tools">Tools</Link>
        </li>
        <li className="grow">
          <Link to="/allkittens">Kittens</Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
        <li>
          <Link to="/equipments/create">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
