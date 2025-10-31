# Face Attendance System - Frontend

Mô tả ngắn

- Frontend: React + Vite + TypeScript
- Styling: Tailwind CSS
- State: Zustand
- Một số lib bổ sung: framer-motion, react-icons, lucide-react
- Mock data lưu trong Local Storage

Yêu cầu

- Node 16+ (hoặc LTS)
- npm hoặc yarn

Cài đặt lần đầu

1. Clone repository:

   - git clone <repository-url>
   - cd cuoiky

2. Cài dependencies:
   - npm install
     hoặc
   - yarn

Thiết lập môi trường (tuỳ chọn)

- Tạo file `.env.development` (nếu cần):
  ```
  VITE_API_MOCK=true
  VITE_APP_TITLE=Face Attendance System
  ```

Chạy ở chế độ phát triển

- npm run dev
- Mở http://localhost:5173

Build & Preview

- npm run build
- npm run preview

Tài khoản demo

- Lecturer:
  - Email: lecturer@example.com
  - Password: 123456
- Student:
  - Email: student@example.com
  - Password: 123456

Mock data

- Khi chạy dev ở môi trường development, mock data được khởi tạo tự động (hàm `initializeMockData`).
- Nếu cần reset dữ liệu, xóa localStorage keys bắt đầu bằng `session_` hoặc gọi lại `initializeMockData()`.

Các lỗi thường gặp & cách khắc phục nhanh

1. Lỗi thiếu plugin `@vitejs/plugin-react-swc`

   - Cài plugin chuẩn hoặc đổi về plugin react:
     - npm install -D @vitejs/plugin-react
   - Kiểm tra `vite.config.ts` dùng `import react from '@vitejs/plugin-react'`

2. Lỗi thiếu `tailwindcss-animate` do config:

   - Nếu bạn không dùng plugin này, mở `tailwind.config.js` và xoá `require('tailwindcss-animate')` khỏi `plugins`.
   - Hoặc cài plugin nếu cần:
     - npm install -D tailwindcss-animate

3. Lỗi liên quan PostCSS / Tailwind (sai cú pháp trong `src/index.css`)

   - File `src/index.css` tối giản nên chỉ chứa:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```
   - Không để code JS/TS trong file CSS.

4. Xóa cache Vite / cài lại packages (Windows PowerShell)
   - Remove node_modules:
     ```powershell
     Remove-Item -Recurse -Force node_modules
     ```
   - Xóa cache vite:
     ```powershell
     Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
     ```
   - Cài lại và chạy:
     ```powershell
     npm install
     npm run dev
     ```

Debug nhanh trong trình duyệt

- Mở DevTools (F12) → Console: xem lỗi runtime.
- Network → kiểm tra `index.css` có load (status 200).

Liên hệ

- Nếu vẫn lỗi, gửi nội dung file sau để hỗ trợ nhanh:
  - vite.config.ts
  - tailwind.config.js
  - postcss.config.js
  - src/index.css
  - package.json

Chúc bạn chạy được dự án. Nếu muốn, tôi có thể cập nhật README bổ sung các lệnh scripts, hoặc tạo file `.env.example`.
