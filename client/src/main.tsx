import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initBotId } from "botid/client/core";

initBotId({
  protect: [
    { path: "/api/contact", method: "POST" },
    { path: "/api/newsletter", method: "POST" },
  ],
});

createRoot(document.getElementById("root")!).render(<App />);
