import { Providers } from "./providers";
import { Router } from "./routes/router";

import "./global.less";

function App() {
  return (
    <div>
      <Providers>
        <Router />
      </Providers>
    </div>
  );
}

export default App;
