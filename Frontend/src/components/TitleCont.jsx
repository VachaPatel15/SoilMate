import React from "react";

const TitleCont = (props) => {
  return (
    <p className="text-center text-dark-green font-semibold text-3xl my-4 w-full">
      {props.title}
    </p>
  );
};

export default TitleCont;
