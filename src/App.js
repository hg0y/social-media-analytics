import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { AiOutlineUser, AiOutlineFileText, AiOutlineFire } from "react-icons/ai";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

function App() {
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:5000/analytics?user=${username}&platform=${platform}`);
    const result = await response.json();
    setData(result);
  };

  return (
    <div className="container dark-theme">
      <motion.div className="header" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
        <img src="/logo.svg" alt="Logo" className="logo" />
        <h1>منصة تحليل بيانات المؤثرين</h1>
      </motion.div>

      <motion.div className="search-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="dark-input"
        />
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="dark-select">
          <option value="TikTok">🎵 TikTok</option>
          <option value="YouTube">📹 YouTube</option>
          <option value="Instagram">📸 Instagram</option>
        </select>
        <button onClick={fetchData} className="search-btn dark-btn">
          <FaSearch /> تحليل
        </button>
      </motion.div>

      {data && (
        <motion.div className="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="stats-card dark-card">
            <h2>📊 إحصائيات الحساب</h2>
            <p>
              <AiOutlineUser /> <strong>{data.followers.toLocaleString()}</strong>: المتابعين
            </p>
            <p>
              <AiOutlineFileText /> <strong>{data.posts.toLocaleString()}</strong>: عدد المنشورات
            </p>
            <p>
              ✅ <strong>{data.engagementRate.toFixed(2)}%</strong>: نسبة التفاعل
            </p>
          </div>

          <h3 className="section-title">📋 تحليل أداء المنشورات</h3>
          <div className="posts">
            {data.postsData.map((post, index) => (
              <motion.div className="post-card dark-card" key={index} whileHover={{ scale: 1.05 }}>
                <h4>📌 {post.name}</h4>
                <p>
                  <AiOutlineFire /> التفاعل: <strong>{post.engagement}</strong>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
