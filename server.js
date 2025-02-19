require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// ✅ تفعيل الميدلويرز لحماية وأمان التطبيق
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// ✅ نقطة النهاية الرئيسية لاختبار عمل السيرفر
app.get("/api", (req, res) => {
  res.send("🚀 سيرفر API يعمل بنجاح على Vercel!");
});

// ✅ نقطة نهاية جلب البيانات الوهمية
app.get("/api/analytics", (req, res) => {
  try {
    const { user, platform } = req.query;

    if (!user || !platform) {
      return res.status(400).json({ error: "❌ يجب تقديم اسم المستخدم والمنصة." });
    }

    // 🔹 توليد بيانات عشوائية لمحاكاة تحليل البيانات
    const randomFollowers = Math.floor(Math.random() * 100000) + 1000;
    const randomPosts = Math.floor(Math.random() * 500) + 10;
    const randomEngagementRate = (Math.random() * 10).toFixed(2);

    // 🔹 إرسال البيانات على شكل JSON
    return res.json({
      user,
      platform,
      followers: randomFollowers,
      posts: randomPosts,
      engagementRate: parseFloat(randomEngagementRate),
      postsData: Array.from({ length: 3 }, (_, i) => ({
        name: `📌 منشور ${i + 1}`,
        engagement: Math.floor(Math.random() * 500) + 100,
      })),
    });

  } catch (error) {
    console.error("❌ خطأ في معالجة الطلب:", error);
    return res.status(500).json({ error: "❌ حدث خطأ غير متوقع في السيرفر." });
  }
});

// ✅ تصدير التطبيق ليتمكن `Vercel` من تشغيله
module.exports = app;
