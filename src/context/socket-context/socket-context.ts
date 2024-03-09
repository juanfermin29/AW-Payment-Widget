import { map } from "nanostores";
import { Socket } from "socket.io-client";

export const $socketContext = map<{
  $socket: Socket | null;
}>({
  $socket: null,
});
