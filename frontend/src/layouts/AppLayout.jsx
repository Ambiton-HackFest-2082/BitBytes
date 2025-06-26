import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const AppLayout = ({ children }) => {
  return (
    <div>
      {children}

      <Outlet />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
