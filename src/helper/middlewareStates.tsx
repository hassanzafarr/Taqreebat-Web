import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist();

export const showSwipeableDrawerAtom = atom({
    key: "swipeableDrawer",
    default: false,
  });


export const bookingRequest = atom({
    key: "bookingRequest",
    default: {},
  effects_UNSTABLE: [persistAtom],
  });