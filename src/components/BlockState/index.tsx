import { Div, P } from "@stylin.js/elements";
import React, { useState } from "react";

const BlockState = () => {
  const [blockState, setBlockState] = useState<Object | null>(null);

  const getBlockState = () => {
    if (blockState) return setBlockState(null);
    
    fetch("http://localhost:8000/api/latest-block/")
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });

        setBlockState(JSON.parse(data));
      });
  };

  return (
    <Div position="relative" ml="2rem">
      <Div
        p="0.5rem"
        bg="#686868"
        onClick={getBlockState}
        borderRadius="0.25rem"
      >
        See current State
      </Div>
      {blockState && (
        <Div
          bg="#fff"
          p="1rem"
          borderRadius="0.5rem"
          position="absolute"
          maxHeight="20rem"
          maxWidth="20rem"
          overflow="auto"
        >
          {Object.entries(blockState).map(([key, item], index) => (
            <P key={index}>
              {key}: {JSON.stringify(item)}
            </P>
          ))}
        </Div>
      )}
    </Div>
  );
};

export default BlockState;
