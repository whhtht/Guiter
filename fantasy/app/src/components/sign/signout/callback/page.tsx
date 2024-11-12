import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const SignOutCallback: React.FC = () => {
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);
  const lastVisitedPath = localStorage.getItem("lastVisitedPath") || "";
  console.log("lastVisitedPath", lastVisitedPath);

  useEffect(() => {
    if (!hasRedirected) {
      // 设置已重定向状态，防止重复刷新
      setHasRedirected(true);
      localStorage.removeItem("lastVisitedPath");
      navigate(lastVisitedPath);
    }
  }, [hasRedirected, navigate, lastVisitedPath]);

  return <div>正在退出...</div>;
};

export default SignOutCallback;
