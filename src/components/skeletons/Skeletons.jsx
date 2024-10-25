import { Skeleton } from "primereact/skeleton";

import React from "react";

const Skeletons = ({ className = "" }) => {
  return (
    <Skeleton
      className={`!z-[0] rounded-3xl bg-[#c7c7c7] ${className}`}
      height="100%"
      width="100%"
    ></Skeleton>
  );
};

export default Skeletons;
