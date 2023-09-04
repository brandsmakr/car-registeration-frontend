import React from "react";

interface messageType {
  message: string ;
}

const WarningAlert = ({ message }: messageType) => {
  return (
    <>
      {message !== "" && (
        <div className="flex justify-start items-center errorColor opacity-90	 text-sm md:text-md p-[0.125rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="w-4 h-4 opacity-90	"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
          <span className="pl-1 ">
            {message[0].toUpperCase() + message.substring(1)}
          </span>
        </div>
      )}
    </>
  );
};

export default WarningAlert;
