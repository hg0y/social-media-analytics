const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // إضافة Middleware لـ CORS

app.get("/analytics", (req, res) => {
  const { user, platform } = req.query;

  // توليد بيانات عشوائية لمحاكاة التحليل
  const randomFollowers = Math.floor(Math.random() * 100000) + 1000;
  const randomPosts = Math.floor(Math.random() * 500) + 10;
  const randomEngagementRate = (Math.random() * 10).toFixed(2);

  // إرجاع البيانات على شكل JSON
  res.json({
    followers: randomFollowers,
    posts: randomPosts,
    engagementRate: parseFloat(randomEngagementRate),
    postsData: [
      { name: "📌 منشور 1", engagement: Math.floor(Math.random() * 500) + 100 },
      { name: "📌 منشور 2", engagement: Math.floor(Math.random() * 500) + 100 },
      { name: "📌 منشور 3", engagement: Math.floor(Math.random() * 500) + 100 },
    ],
  });
});

app.listen(5000, () => {
  console.log("🚀 السيرفر يعمل على http://localhost:5000");
});
