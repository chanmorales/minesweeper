import { FC, ImgHTMLAttributes } from "react";
import mine from "../../assets/mine.svg";

export const Mine: FC<
  Omit<ImgHTMLAttributes<HTMLImageElement>, "onContextMenu">
> = ({ width = "36px", height = "36px", alt = "mine", ...rest }) => (
  <img
    src={mine}
    width={width}
    height={height}
    alt={alt}
    onContextMenu={(e) => e.preventDefault()}
    {...rest}
  />
);
