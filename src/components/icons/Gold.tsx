import { FC, ImgHTMLAttributes } from "react";
import gold from "../../assets/gold.png";

export const Gold: FC<
  Omit<ImgHTMLAttributes<HTMLImageElement>, "onContextMenu">
> = ({ width = "36px", height = "36px", alt = "gold", ...rest }) => {
  return (
    <img
      src={gold}
      style={{ width: width, height: height }}
      alt={alt}
      {...rest}
    />
  );
};
