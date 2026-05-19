import AuthProvider from "@/auth/AuthContext";

const AppProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;