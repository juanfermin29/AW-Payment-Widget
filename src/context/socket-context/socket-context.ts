import { atom } from "nanostores";
import { Socket } from "socket.io-client";

export const $socketContext = atom<{
  $socket: Socket | null;
}>({
  $socket: null,
});

