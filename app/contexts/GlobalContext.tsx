import { create } from "zustand";

interface NavToggleContext {
  isOpen: boolean;
  toggleNav: (navToggle: boolean) => void;
}

export const useNavToggle = create<NavToggleContext>((set) => ({
  isOpen: false,
  toggleNav: (navToggle: boolean) => set({ isOpen: navToggle }),
}));

interface AnimationToggleContext {
  isAnimation: boolean;
  toggleAnimation: (navToggle: boolean) => void;
}

export const useAnimationToggle = create<AnimationToggleContext>((set) => ({
  isAnimation: false, // ← was true
  toggleAnimation: (animationToggle: boolean) =>
    set({ isAnimation: animationToggle }),
}));
