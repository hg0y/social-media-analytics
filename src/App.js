import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./App.css";

// ✅ دالة لتوليد بيانات عشوائية مع بيانات المخطط
const generateRandomData = () => {
  const followers = Math.floor(Math.random() * 40000) + 1000;
  const posts = Math.floor(Math.random() * 1000) + 100;
  const engagementRate = (Math.random() * 10).toFixed(2.5);

  return {
    followers,
    posts,
    engagementRate,
    chartData: [
      { name: "المتابعين", value: followers },
      { name: "المنشورات", value: posts },
      { name: "التفاعل", value: parseFloat(engagementRate) * 1000 }, // تحويل النسبة المئوية إلى قيمة أكبر للمخطط
    ],
  };
};

const App = () => {
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ تحديث دالة البحث لتوليد بيانات عشوائية مع المخطط
  const fetchData = () => {
    if (!username.trim()) {
      setError("❌ الرجاء إدخال اسم المستخدم");
      return;
    }
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setData(generateRandomData());
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container">
      <ThemeToggle />

      <h1 className="main-title">تحليل بيانات والفعالية</h1>
      <p className="sub-title">منصتك الموثوقة لمعرفة الإحصائيات والتفاعل.</p>

      {/* ✅ شريط البحث */}
      <div className="search-box">
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="TikTok">🎵 TikTok</option>
          <option value="YouTube">📹 YouTube</option>
          <option value="Instagram">📸 Instagram</option>
        </select>
        <button className="search-btn" onClick={fetchData}>بحث</button>
      </div>

      {/* ✅ عرض رسالة خطأ عند عدم إدخال اسم المستخدم */}
      {error && <p className="error-message">{error}</p>}

      {/* ✅ عرض حالة التحميل */}
      {loading && <p className="loading-message">⏳ جاري التحميل...</p>}

      {/* ✅ عرض النتائج عند البحث */}
      {data && !loading && (
        <>
          <div className="stats-container">
            <div className="stats-card glowing-card">
              <h3>عدد المتابعين</h3>
              <p>{data.followers.toLocaleString()}</p>
            </div>
            <div className="stats-card glowing-card">
              <h3>عدد المنشورات</h3>
              <p>{data.posts}</p>
            </div>
            <div className="stats-card glowing-card">
              <h3>نسبة التفاعل</h3>
              <p>{data.engagementRate}%</p>
            </div>
          </div>

          {/* ✅ عرض المخطط البياني */}
          <div className="chart-container">
            <h2>📊 تحليل البيانات</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data.chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6c63ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      <footer className="footer">© 2025 منصة تحليل البيانات - جميع الحقوق محفوظة</footer>
    </div>
  );
};

export default App;
