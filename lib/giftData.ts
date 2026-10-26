// ============================================================
// 🎁 GIFT DATA — EDIT HERE to add or change customer content
// ============================================================
// Each key is the URL slug: /gift/aya → id = "aya"
// ============================================================

export interface GiftData {
  name: string;           // Shown in the intro "Make a wish, [name]!"
  senderName?: string;    // Signature at the bottom of the letter (e.g., "Aya ✨")
  envelopeImage: string;  // Path inside /public — the envelope image
  birthdayImage: string;  // Path inside /public — the main birthday card image
  message: string;        // The birthday message (supports \n for line breaks)
  videoUrl?: string;      // Optional: URL to video (default: /video.mp4)
  musicUrl?: string;      // Optional: URL to a background music mp3
  accentColor?: string;   // Optional: custom accent color (default: #38bdf8)
}

// ============================================================
// CUSTOMER DATA
// ============================================================
const defaultGift: GiftData = {
  name: "Hisham",                                     // اسم مستلم الهدية
  senderName: "your love",                            // التوقيع في آخر الرسالة (اختياري)
  envelopeImage: "/images/envelope-aya.png",          // صورة الظرف
  birthdayImage: "/images/birthday-aya.png",          // صورة الهدية النهائية
  accentColor: "#38bdf8",                             // اللون الأزرق الفاتح المتوافق مع التصميم الجديد
  videoUrl: "/video.mp4",                             // مسار الفيديو
  musicUrl: "",                                       // رابط الموسيقى هنا
  message: `Happy birthday to one of the most special people in my life. ❤️ I’m so grateful to have you in my life, and I hope you know how much you mean to me. You deserve all the happiness, love, and beautiful things in this world. I hope this new year of your life brings you endless smiles and everything your heart wishes for. I’m so lucky to have you, and I hope I always get to be a part of your happiest moments. ❤️ I wish you nothing but happiness, success, and countless unforgettable memories. May all your dreams come true, and may you always find reasons to smile, even on your hardest days. I hope we get to share many more beautiful moments together, and that this year brings you everything you’ve been hoping for. Happy birthday once again, and I hope your day is filled with love and joy. ❤️`,
};

const giftData: Record<string, GiftData> = {
  hisham: defaultGift,
  ahmed: defaultGift,
  aya: defaultGift,
};

export default giftData;