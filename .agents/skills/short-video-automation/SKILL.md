---
name: short-video-automation
description: Quy trình sản xuất video ngắn tự động (TikTok/Shorts/Reels 9:16) chuẩn điện ảnh: Phân tích Input thông minh, Lựa chọn B-Roll tiết kiệm chi phí/token, Kiến trúc 3 tầng thị giác, Hệ thống Rung/Giật theo chủ đề, và Nguyên tắc Preview-First.
---

# Quy Trình Tự Động Hóa Video Ngắn (Short Craft Video Automation Standard)

Tài liệu này là **Quy chuẩn Vận hành Tiêu chuẩn (SOP)** bắt buộc áp dụng khi sản xuất bất kỳ video ngắn định dạng dọc (9:16) nào từ kịch bản văn bản hoặc link video YouTube nguồn.

---

## 🧭 I. BƯỚC KHỞI ĐẦU: PHÂN TÍCH INPUT & GỢI Ý NGUỒN B-ROLL THÔNG MINH

Để tránh tốn thời gian và lãng phí token hình ảnh AI không cần thiết, Agent **bắt buộc phải phân tích dữ liệu đầu vào** và chủ động đưa ra bảng gợi ý/hỏi người dùng trước khi tải hoặc sinh tư liệu:

### 1. Phân Loại Đầu Vào (Input Classification)
- **Nếu đầu vào là LINK YOUTUBE**:
  - Ưu tiên **Giải pháp 1 (Khuyên dùng)**: Dùng `yt-dlp` và `ffmpeg` trích xuất các đoạn B-Roll 3s–5s trực tiếp từ video gốc.
  - *Lợi ích*: Chân thực 100%, đúng ngữ cảnh tin tức/tư liệu, **0 tốn token AI**, xử lý cực nhanh.
- **Nếu đầu vào là KỊCH BẢN CHỮ (TEXT SCRIPT)**:
  - Ưu tiên **Giải pháp 2 (Khuyên dùng)**: Gọi API / Scraping kho video & ảnh stock miễn phí (**Pexels API, Pixabay API, Wikimedia Commons**).
  - *Lợi ích*: Kho hàng triệu video/ảnh thực tế chất lượng cao, **0 tốn token AI**.
- **Giải pháp 3 (DỰ PHÒNG / TÙY CHỌN): Tự Động Tạo Ảnh Bằng AI (`generate_image`)**:
  - Chỉ sử dụng khi:
    1. Cảnh có nội dung mang tính trừu tượng, viễn tưởng, concept tương lai mà kho stock/YouTube không có.
    2. Người dùng chủ động yêu cầu "Hãy tự vẽ/tạo ảnh AI cho video".

### 2. Mẫu Lời Nhắc Chuẩn Trao Quyền Cho Người Dùng:
> *"Em nhận diện được đầu vào là [Link YouTube / Kịch bản Text]. Để tối ưu thời gian và chi phí token, em đề xuất 3 nguồn B-Roll sau, anh muốn ưu tiên phương án nào?*
> 1. **(Khuyên dùng nếu có Link YouTube)**: Cắt clip B-Roll trực tiếp từ video nguồn (Chân thực 100%, 0 tốn token AI).
> 2. **(Khuyên dùng nếu là Text/Chủ đề chung)**: Lấy clip/ảnh stock miễn phí tự động qua Pexels / Pixabay / Wikimedia (Không tốn token).
> 3. **AI Gen Image**: Tự tạo ảnh AI mới (Đẹp điện ảnh nhưng tốn thời gian ~20s/ảnh và tốn token)."*

---

## 🏛️ II. LUẬT 3 TẦNG THỊ GIÁC (THE 3-LAYER RULE)

Mọi cảnh trong video **tuyệt đối không được để chữ chạy trên nền đen trần trụi**. Mọi scene phải cấu thành từ 3 tầng:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TẦNG 3: ĐỒ HỌA & NỘI DUNG (Top Layer)                                   │
│ - Kinetic Typography lớn (70-95px), Subtitle ăn khớp từng từ            │
│ - Badge trạng thái (🚨 BREAKING, WARNING, TAG)                           │
│ - Số liệu nhảy tự động (Odometer / Counter Roll)                       │
├─────────────────────────────────────────────────────────────────────────┤
│ TẦNG 2: HIỆU ỨNG MÔI TRƯỜNG & KHÔNG GIAN (Atmosphere & Camera FX)       │
│ - Rung/giật màn hình (Screen Shake) theo xung động SFX & Beat drop      │
│ - Khói lửa, tàn tro bay (Embers), vạch quét radar (Scanlines)           │
│ - Nhiễu phim (Film Grain 15-25%), Viền tối điện ảnh (Vignette)          │
├─────────────────────────────────────────────────────────────────────────┤
│ TẦNG 1: FOOTAGE NỀN / B-ROLL (Background Material)                     │
│ - Video ngắn 3-5s lặp mượt hoặc Ảnh chất lượng cao Ken Burns 2.5D       │
│ - Lớp phủ Scrim tối (Dark Overlay 45% - 65%) để tôn chữ Tầng 3         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ III. HỆ THỐNG RUNG / GIẬT & PHONG CÁCH ĐỘNG THEO CHỦ ĐỀ (THEME MATRIX)

Mức độ rung lắc, giật màn hình và hiệu ứng môi trường phải biến hóa thích ứng theo đúng chủ đề kịch bản:

| Chủ đề (Topic) | Nhịp Điệu (Pacing) | Rung Màn Hình (Screen Shake) | Hiệu Ứng Môi Trường (Layer 2) | Bộ SFX Chủ Đạo |
|---|---|---|---|---|
| **Chiến sự / Tin nóng khẩn cấp** | Dồn dập, gắt, cắt nhanh 2–3s/shot | **Giật mạnh (Slam Shake 10–14px)** khi có tiếng nổ/từ khóa sốc | Scanlines radar đỏ/xanh, khói, Vignette đỏ nhấp nháy, Film Grain 30% | `impact-cine-big`, `stomp-apocalyptic`, `riser-cine` |
| **Tài chính / BĐS / Kinh tế** | Vừa phải, chắc chắn, dứt khoát | **Nhẹ nhàng, nảy nén (Spring Bounce 3–5px)** khi hiện số tiền | Dark Glassmorphism, tia sáng quét nhẹ (Sheen), biểu đồ neon | `pen-click-twice`, `keyboard`, `cash-register`, `ui-tech` |
| **Công nghệ / AI / Khoa học** | Hiện đại, trơn tru (Cyber smooth) | **Gần như không rung (Micro-shake 1–2px)**, zoom mượt mà | Vạch laser xanh Cyan HUD, lưới tọa độ không gian, hạt nano | `sweep-scifi-fast`, `transition-tech-slide`, `warp-slide` |
| **Lịch sử / Bí ẩn / Tài liệu** | Chậm rãi, sâu lắng (Heavy cinematic) | **Không giật, trôi chậm (Slow Drift)**, Ken Burns kéo dài | Bụi cổ điển (Dust particles), Film scratch, Sepia/BW tint | `air-whoosh-deep`, `wind-pass-vibrate`, `cinematic-drone` |

### Công Thức Rung Màn Hình Chuẩn Toán Học (Camera Shake Formula):
```tsx
// Áp dụng khi có Impact SFX hoặc Beat Drop tại frame F_IMPACT:
const elapsed = frame - F_IMPACT;
const shake = elapsed >= 0 && elapsed <= 15
  ? Math.sin(elapsed * 1.8) * Math.exp(-elapsed * 0.25) * SHAKE_INTENSITY
  : 0;
// Áp dụng: transform: `translate(${shake}px, ${shake * 0.6}px)`
```

---

## 🎙️ IV. CHUẨN HÓA ÂM THANH & GIỌNG ĐỌC

1. **Đồng nhất 100% Giọng đọc**:
   - Toàn bộ video từ giây đầu đến cuối chỉ dùng duy nhất **1 giọng đọc** (Nam: `vi-VN-NamMinhNeural` hoặc Nữ: `vi-VN-HoaiMyNeural`). Tuyệt đối không được trộn lẫn giọng nữ/nam giữa các cảnh.
2. **Tỷ lệ Âm lượng (Audio Mix Ratio)**:
   - **Voiceover**: Đặt ở mức **`1.3` – `1.4`** (nổi bật, rõ từng âm tiết, dứt khoát).
   - **BGM (Nhạc nền)**: Đặt ở mức **`0.08` – `0.12`** (làm nền chìm phía sau, không át giọng).
   - **SFX**: Khớp chính xác với từng frame chuyển động (Impact: `0.8 - 1.0`, Transition: `0.5 - 0.7`).
3. **Breathing Room (Khoảng thở âm hình)**:
   - Visual và SFX xuất hiện trước 0.3s – 0.5s để mắt người xem tiếp nhận thông tin -> Sau đó giọng đọc mới cất lên.

---

## ⏱️ V. NGUYÊN TẮC PREVIEW-FIRST (KHÔNG RENDER MÙ QUÁNG)

1. **Quy tắc bất di bất dịch**:
   - Tuyệt đối **KHÔNG TỰ Ý CHẠY LỆNH RENDER MP4** ngay sau khi code xong.
   - Render file video 1-2 phút gây tốn thời gian, khó debug và lãng phí tài nguyên của cả hai bên.
2. **Quy trình chuẩn**:
   - **Bước 1**: Khởi động server Remotion Studio ngầm (`npm.cmd run dev` trên port `3000`).
   - **Bước 2**: Gửi ngay link **`http://localhost:3000`** cho người dùng để xem phát thử trực tiếp trên web (tua frame, nghe âm thanh, kiểm tra nhịp thở).
   - **Bước 3**: Khi người dùng xem trên web hài lòng và gõ lệnh **"OK render"** -> Agent mới tiến hành chạy lệnh render ra file `.mp4`.
