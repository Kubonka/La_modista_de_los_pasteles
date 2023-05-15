import React, { useEffect, useRef, useState } from "react";
import mapValue from "../../../scripts/mapValue";
import classnames from "classnames";
import { HiX } from "react-icons/hi";
function Tag({ tag, onClick, isClickable, onRemoveTag, wiggle, small }) {
  const [isDeletable, setIsDeletable] = useState(false);
  const [wiggleStatus, setWiggleStatus] = useState(wiggle);
  //todo tengo que unificar is clickable styles con is deletable styles con base styles
  useEffect(() => {
    setWiggleStatus(wiggle);
  }, [wiggle]);
  return (
    <div className="flex w-full flex-row items-center justify-center">
      <div
        className={classnames(
          "group relative flex w-40 flex-row items-center",
          { "animate-wiggle": wiggleStatus && !isClickable }
        )}
      >
        {/* //$ Rombo */}
        <div
          className={classnames("z-0 aspect-square rotate-45 pl-4", {
            "cursor-pointer bg-primary group-hover:bg-white": isClickable,
            "bg-primaryLo": isDeletable,
            "bg-primary": !isDeletable,
            "h-0 w-0": small,
            " h-[22px] w-[22px] translate-x-[12.5px] rounded-sm ": !small,
          })}
        ></div>
        {/* //$ Circulito */}
        <div
          className={classnames(
            "absolute z-20 h-2 w-2 translate-x-6 rounded-full",
            {
              "border-4": !isClickable,
              "h-[4px] w-[4px] border-[2px]": small,
              "h-2 w-2 border-[2px] bg-white": !small,
              "group-hover:border-primary group-hover:bg-primary": isClickable,
            }
          )}
        ></div>
        {/* //$ Rectangulo Principal container del tag.name */}
        <div
          className={classnames(
            "z-10 flex items-center justify-center rounded-sm ",
            {
              "group-hover:bg-white": isClickable,
              "bg-primaryLo": isDeletable,
              "bg-primary": !isDeletable,
              "h-[26px] w-32 -translate-x-1 pl-2 pr-2": small,
              "h-[30px] pl-4 pr-4": !small,
            }
          )}
          onClick={() => onClick(tag)}
        >
          {/* //$ Texto tag.name */}
          <div
            className={classnames(
              "cursor-default pl-2 pr-2 text-center font-semibold text-white",
              {
                "cursor-pointer group-hover:text-primary": isClickable,
                "w-32 text-xs": small,
                "w-32": !small,
              }
            )}
          >
            {tag.name}
          </div>
        </div>
      </div>
      {/* //$ Cruz de eliminacion de Tag */}
      {!isClickable && (
        <div
          onClick={() => onRemoveTag(tag)}
          className="group ml-[25px] h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-primary group-hover:bg-primaryLo"
          onMouseEnter={() => setIsDeletable(true)}
          onMouseLeave={() => setIsDeletable(false)}
        >
          <HiX className="h-6 w-6  font-bold text-white group-hover:text-pink-500" />
        </div>
      )}
    </div>
  );
}
export default Tag;

// import React, { useEffect, useState } from "react";
// import mapValue from "../../../scripts/mapValue";
// function Tag({ tag, onClick, isClickable, size }) {
//   const [tagSize, setTagSize] = useState({rombus:0,rectangle:});
//   useEffect(() => {
//     mapValue(size,)
//   }, []);

//   function convertSize() {
//     //$ El size del tag tiene como minimo [x-rem] y maximo [y-rem] por cada valor del size entre 1 y 100 mapea entre min y max
//     //ajustar
//     //
//   }

//   return (
//     <div className="group mr-8 flex w-40 flex-row items-center">
//       {/* //$ Rombo */}
//       <div
//         className={
//           isClickable
//             ? "z-0 aspect-square h-[1.84rem] w-[1.84rem] translate-x-[0.98rem] rotate-45 cursor-pointer rounded-sm bg-primary pl-4 group-hover:bg-white"
//             : "z-0 aspect-square h-[1.84rem] w-[1.84rem] translate-x-[0.98rem] rotate-45 rounded-sm bg-primary pl-4 "
//         }
//       ></div>
//       {/* //$ Circulito */}
//       <div className="absolute z-20 h-2 w-2 translate-x-6 rounded-full border-4 bg-white group-hover:border-primary"></div>
//       {/* //$ Rectangulo Principal container del tag.name */}
//       <div
//         className={
//           isClickable
//             ? "z-10 flex h-10 cursor-pointer  items-center justify-center rounded-sm bg-primary pl-4  pr-4 group-hover:bg-white"
//             : "z-10 flex h-10 items-center justify-center rounded-sm bg-primary pl-4 pr-4"
//         }
//         onClick={() => onClick(tag)}
//       >
//         {/* //$ Texto tag.name */}
//         <div
//           className={
//             isClickable
//               ? "w-32 pl-2 pr-2 text-center font-semibold text-white group-hover:font-bold group-hover:text-primary "
//               : "w-32 pl-2 pr-2 text-center font-semibold text-white   "
//           }
//         >
//           {tag.name}
//         </div>
//       </div>
//     </div>
//   );
// }
// // function Tag({ tag, onClick }) {
// //   return (
// //     <div className="flex flex-row group  mr-8 w-40  items-center ">
// //       <div className=" cursor-pointer bg-primary w-7 h-7 rotate-45 aspect-square pl-4 translate-x-[0.9rem] z-0 rounded-sm border-primary border-b border-l group-hover:border-white"></div>
// //       <div
// //         className=" cursor-pointer z-10 flex h-10  pr-4 pl-4 items-center justify-center bg-primary  rounded-sm border-primary border-t border-r border-b  group-hover:border-white"
// //         onClick={() => onClick(tag)}
// //       >
// //         <div className=" w-32 text-center font-semibold pl-2 pr-2 text-white">
// //           {tag.name}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// export default Tag;
