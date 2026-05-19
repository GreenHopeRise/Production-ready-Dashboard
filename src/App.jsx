import AppProvider from "./app/providers";
import Router from "./app/router";

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;