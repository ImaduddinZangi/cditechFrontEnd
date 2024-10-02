import React from "react";
import RoutesContent from "./Routes/RoutesContent";
import { useTokenRefresh } from "./hooks/refreshToken";

const App: React.FC = () => {
  useTokenRefresh();
  return (
    <div>
      <RoutesContent />
    </div>
  );
};

export default App;
