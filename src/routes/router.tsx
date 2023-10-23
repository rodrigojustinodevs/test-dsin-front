import { useEffect } from "react";

import { useAuth } from "../contexts/contexts";
import { AuthRouter } from "./auth";
import { AuthRouterPublic } from "./authPublic";

export const Router = () => {
  const { signed, token } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [token, signed]);
  
  return signed ? <AuthRouter /> : <AuthRouterPublic />;

};
