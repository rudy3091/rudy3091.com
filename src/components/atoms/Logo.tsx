import * as React from "react";
import { Link } from "gatsby";

export interface LogoProps {
  routeHome?: boolean;
}

const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  return (
    <div>
      <Link to={props.routeHome ? "/" : ""}>
        <span>This will be logo</span>
      </Link>
    </div>
  );
};

export default Logo;
