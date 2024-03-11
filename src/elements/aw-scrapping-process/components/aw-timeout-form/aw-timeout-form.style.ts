import {  css } from "lit";

export const timeFormStyles = css`
.aw-timeout-loader {
  width: 30px;
  height: 30px;
  border: 6px solid #7d51fe;
  border-radius: 50%;
  transform: rotate(45deg);
  box-sizing: border-box;
}

@keyframes prixClipFix {
  100% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(
      50% 50%,
      0 0,
      100% 0,
      100% 100%,
      100% 100%,
      100% 100%
    );
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  0% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
`