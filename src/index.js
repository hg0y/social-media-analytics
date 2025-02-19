import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// تعيين الوضع الحالي عند تحميل الصفحة
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);

// البحث عن العنصر الجذري للتأكد من وجوده قبل محاولة التهيئة
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // قياس الأداء (اختياري)
  reportWebVitals();
} else {
  console.error("لم يتم العثور على العنصر الجذري 'root'. تأكد من وجوده في index.html.");
}
