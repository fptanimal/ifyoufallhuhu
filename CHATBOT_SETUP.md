# 🤖 Hướng Dẫn Setup Chatbot AI

## Vấn đề đã sửa
❌ **Trước đó**: API endpoint gọi tới `https://ollama.com/api/chat` - không hợp lệ  
✅ **Hiện tại**: Chatbot hoạt động với fallback thông minh:
- Thử gọi Vercel API endpoint (`/api/chat`)
- Nếu fail, thử localhost backend (`:8899`)
- Nếu fail, dùng chế độ **Offline Mode** (AI có sẵn, không cần API)

---

## 🚀 Cách Chạy Chatbot

### **Cách 1: Offline Mode (Không cần API)**
✅ **Đơn giản nhất - không cần cấu hình**

Chatbot sẽ tự động dùng Offline Mode khi:
- Không có kết nối API
- Hoặc backend server không chạy

**Tính năng Offline**:
- AI phản hồi dựa trên MEDICAL_DATA database
- Câu trả lời thông minh về sức khỏe, đột quỵ, tim mạch
- Fallback logic thông minh

---

### **Cách 2: Chạy Backend Server (Có API)**
💪 **Mạnh mẽ hơn - dùng Gemini API**

**Yêu cầu**:
1. Node.js đã cài (v14+)
2. Gemini API Key từ Google

**Bước 1**: Tạo file `.env` trong thư mục `backend/`:
```
AI_API_KEY=your_gemini_api_key_here
AI_MODEL=gemini-2.0-flash
PORT=8899
```

**Bước 2**: Cài dependencies:
```bash
cd backend
npm install
```

**Bước 3**: Chạy server:
```bash
npm start
```

Server sẽ chạy tại `http://localhost:8899`

**Bước 4**: Mở frontend:
- `http://localhost:8899` - Frontend sẽ tự load
- Hoặc mở `index.html` trực tiếp

Frontend sẽ tự động detect backend server và dùng nó!

---

### **Cách 3: Deploy lên Vercel**
🌐 **Deploy toàn bộ ứng dụng**

**Bước 1**: Setup Vercel:
```bash
npm install -g vercel
vercel
```

**Bước 2**: Thêm Environment Variables trong Vercel Dashboard:
- `GEMINI_API_KEY=your_key_here`

**Bước 3**: Deploy:
```bash
vercel --prod
```

API endpoint sẽ là: `https://your-domain.vercel.app/api/chat`

---

## 🔑 Lấy Gemini API Key

1. Vào https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy API Key
4. Thêm vào `.env` hoặc Vercel environment variables

**LƯU Ý**: 
- Gemini miễn phí cho ~60 request/phút
- Nếu vượt giới hạn, sẽ tự fallback sang Offline Mode

---

## 🧪 Test Chatbot

Mở DevTools (F12) trong browser và test:

```javascript
// Test hỏi về sức khỏe
```

Chatbot sẽ trả lời theo cấu hình system prompt.

---

## 🐛 Xử Lý Sự Cố

### **Chatbot không phản hồi?**
1. ✅ Mở DevTools (F12)
2. ✅ Vào tab Console
3. ✅ Xem lỗi gì xuất hiện
4. ✅ Kiểm tra có API Key không

### **Lỗi "Invalid API Key"**
→ Kiểm tra lại Gemini API Key trong `.env`

### **Localhost backend không kết nối?**
→ Chắc chắn backend server đang chạy ở port 8899:
```bash
# Kiểm tra port 8899 đang chạy không
netstat -ano | findstr :8899
```

### **Offline Mode xuất hiện**
→ Đó là tình trạng bình thường! Có thể:
- Backend không chạy
- API Key hết hạn
- Network error

Offline Mode vẫn hoạt động tốt!

---

## 📊 Status Indicator

Chatbot sẽ hiển thị:
- 🟢 **Xanh**: Đang dùng API online
- 🔴 **Đỏ**: Offline Mode (nhưng vẫn hoạt động)

---

## 💡 Lưu Ý

⚠️ **QUAN TRỌNG**: Chatbot AI là **mô phỏng giáo dục**, KHÔNG thay thế bác sĩ thật!

Mọi câu trả lời sẽ có disclaimer:
```
⚠️ Lưu ý: Đây là thông tin tham khảo từ AI, không phải chẩn đoán y khoa.
🏥 Nếu bạn có triệu chứng bất thường, hãy đến bệnh viện hoặc gọi 115 ngay.
```

---

## 📞 Cần Giúp?

Kiểm tra logs:
- Browser Console (F12)
- Backend console (terminal chạy server)
- Vercel logs (nếu deploy lên Vercel)
