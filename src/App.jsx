import AppProvider from "./app/providers";
import Router from "./app/router";
import { SearchProvider } from "./components/layout/SearchContext";

function App() {
  return (
    <SearchProvider>

    <AppProvider>
      <Router />
    </AppProvider>
    </SearchProvider>
  );
}

export default App;