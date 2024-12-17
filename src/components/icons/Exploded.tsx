import { FC, ImgHTMLAttributes } from "react";
import exploded from "../../assets/exploded.png";

export const Exploded: FC<
  Omit<ImgHTMLAttributes<HTMLImageElement>, "onContextMenu">
> = ({ width = "36px", height = "36px", alt = "exploded", ...rest }) => {
  return (
    <img
      src={exploded}
      style={{ width: width, height: height }}
      alt={alt}
      {...rest}
    />
  );
};
