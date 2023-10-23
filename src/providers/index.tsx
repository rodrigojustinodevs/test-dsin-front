import { ChildrenType } from "../@types";
import { AuthProvider } from "../contexts/contexts";

export const Providers = ({ children }: ChildrenType) => (
  <AuthProvider>{children}</AuthProvider>
);
