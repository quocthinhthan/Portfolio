# Thiết lập RSVP với Google Sheets

Form có ba lựa chọn, theo thứ tự:

1. **Chắc chắn rồi** — Mình sẽ đến chung vui cùng Thịnh.
2. **Mình sẽ báo lại nhé** — Để mình sắp xếp thêm một chút, rồi hẹn Thịnh nhé.
3. **Tiếc quá, mình không thể đến** — Gửi Thịnh một lời chúc từ xa.

Khách chỉ điền tên (bắt buộc, tối đa 48 ký tự), lựa chọn tham dự (bắt buộc) và lời nhắn (không bắt buộc, tối đa 600 ký tự). Không cần tài khoản Google, email hay số điện thoại.

## 1. Tạo Google Sheet và cài script

1. Dùng tài khoản Google cá nhân của bạn, tạo một Google Sheet mới tên **Graduation 2026 — RSVP**. Giữ quyền chia sẻ của file là **Restricted / Bị hạn chế**.
2. Trong Sheet, chọn **Extensions / Tiện ích mở rộng → Apps Script**.
3. Trong file `Code.gs`, thay nội dung mẫu bằng toàn bộ nội dung của [`google-sheets/Code.gs`](./google-sheets/Code.gs) trong dự án. Lưu lại và đặt tên project là **Graduation RSVP**.
4. Chọn hàm **setupRSVP** trên thanh công cụ rồi bấm **Run / Chạy**. Chấp thuận quyền đọc/ghi Google Sheet cho script bạn vừa tạo; không cần chia sẻ Sheet công khai.
5. Nếu Google báo app chưa được xác minh, kiểm tra đúng project và tài khoản của bạn trước khi tiếp tục cấp quyền. Nếu tài khoản trường/công ty chặn triển khai công khai, dùng tài khoản Google cá nhân; không thay đổi chính sách tài khoản tổ chức.
6. Quay lại Sheet: script đã tạo hai tab **RSVP** và **TongQuan**, định dạng thời gian Việt Nam, cố định tiêu đề và bật bộ lọc. Tab mặc định trống có thể giữ lại hoặc xóa thủ công.

Không cần tự gõ header, tạo công thức hoặc tạo secret. Chạy lại `setupRSVP` sẽ giữ nguyên dữ liệu và secret đã có.

## 2. Các field được lưu

| Cột | Field | Ý nghĩa |
|---|---|---|
| A | `response_id` | Mã ngẫu nhiên giữ trong trình duyệt, dùng để gửi lại/chỉnh phản hồi |
| B | `created_at` | Thời gian gửi lần đầu |
| C | `updated_at` | Thời gian cập nhật gần nhất |
| D | `name` | Tên khách nhập |
| E | `attendance` | `yes`, `maybe` hoặc `no` |
| F | `attendance_label` | Sẽ tham dự / Sẽ báo lại / Không tham dự |
| G | `message` | Lời nhắn, có thể trống |

**TongQuan** tự đếm riêng cả ba trạng thái và tổng phản hồi. Số “Sẽ tham dự” là số phản hồi xác nhận, không phải tổng số người đi cùng; bản đầu chưa có field người đi cùng.

Giữ nguyên tên tab `RSVP`, tiêu đề và thứ tự A:G. Bạn có thể lọc/sắp xếp toàn bộ bảng; đừng sắp xếp một cột độc lập. Có thể thêm cột ghi chú cá nhân từ H trở đi, script không ghi vào chúng. Không công khai các lời nhắn trên website.

## 3. Deploy Apps Script

1. Trong Apps Script, chọn **Deploy → New deployment**.
2. Bấm biểu tượng bánh răng, chọn **Web app**.
3. Description: `Graduation RSVP v1`.
4. **Execute as: Me** (tài khoản chủ Sheet).
5. **Who has access: Anyone** — backend website cần gọi mà không đăng nhập Google. File Sheet vẫn giữ **Restricted**; mỗi request ghi dữ liệu phải có secret hợp lệ.
6. Bấm **Deploy**, copy **Web app URL** có dạng `https://script.google.com/macros/s/.../exec`. Dùng URL `/exec`, không dùng `/dev` hay URL của trình soạn thảo.

Không chạy `doPost` bằng nút Run: hàm này cần request HTTP. Việc mở URL `/exec` bằng trình duyệt cũng không phải phép thử RSVP vì đây là endpoint chỉ nhận POST.

Sau mỗi lần sửa code Apps Script: **Deploy → Manage deployments → Edit → Version: New version → Deploy**. Lưu code trong editor thôi chưa cập nhật deployment đang dùng.

## 4. Cấu hình website

Mở **Project Settings → Script Properties** trong Apps Script. `setupRSVP` đã tạo:

- `SPREADSHEET_ID`: ID file Google Sheet, chỉ dùng trong Apps Script.
- `RSVP_SCRIPT_SECRET`: secret ngẫu nhiên, copy nguyên giá trị vào biến môi trường server website.

Tại thư mục gốc dự án, tạo hoặc bổ sung `.env.local`:

```dotenv
RSVP_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
RSVP_SCRIPT_SECRET=PASTE_SECRET_FROM_SCRIPT_PROPERTIES
```

Không thêm `NEXT_PUBLIC_` vào hai tên này. Không commit `.env.local`; `.gitignore` hiện tại đã bỏ qua `.env*`. Nếu file này đã có cấu hình khác, giữ nguyên và chỉ bổ sung hai dòng.

Trên hosting, thêm đúng hai biến môi trường trên vào môi trường Production; nếu cần thử trên Preview, thêm riêng cho Preview. Website phải chạy Next.js server/API routes: triển khai chỉ có file tĩnh sẽ không chạy được `POST /api/graduation/rsvp`.

Khởi động lại dev server sau khi thay `.env.local`. Giữ `responses.mode: "demo"` trong `graduation.config.ts` cho đến khi kiểm tra được ghi thật vào Sheet. API có thể được thử độc lập khi giao diện vẫn demo. Sau khi thử đạt, đổi mode thành `live`, build và deploy/redeploy website. Guestbook vẫn là demo riêng và hiện đang ẩn.

Luồng: `RSVP → /api/graduation/rsvp → Apps Script → Google Sheet`. Giao diện chỉ xác nhận gửi thật khi script báo đã ghi thành công. API không trả URL script, secret hay danh sách khách cho trình duyệt.

## 5. Gửi cấu hình lại cho Codex

Gửi mẫu này trong chat, không cần cấp quyền xem/chỉnh sửa Google Sheet:

```text
Hosting hiện tại: Vercel / nhà cung cấp khác (ghi tên)
Domain production: https://...
Google Sheet URL: https://docs.google.com/spreadsheets/d/.../edit
Apps Script Web app URL: https://script.google.com/macros/s/.../exec
setupRSVP: đã chạy thành công / lỗi cụ thể
Deployment: Execute as Me, Who has access Anyone
RSVP_SCRIPT_URL trên hosting: đã thêm / chưa thêm
RSVP_SCRIPT_SECRET trong .env.local: đã thêm / chưa thêm
RSVP_SCRIPT_SECRET trên hosting: đã thêm / chưa thêm
```

**Không cần gửi giá trị secret vào chat.** Lưu secret trong `.env.local` để Codex có thể thử kết nối tại máy và trên hosting để production chạy. Sheet URL chỉ giúp đối chiếu; website dùng Sheet ID đã lưu trong Script Properties, không cần thêm biến môi trường Sheet ID.

Sau khi nhận cấu hình, Codex có thể kiểm tra kết nối ở local, gửi phản hồi thử, xác nhận sửa/gửi lặp không tạo dòng trùng và bật live. Bạn kiểm tra các dòng thử trong Sheet; không tự động xóa dữ liệu khách.

## 6. Kiểm tra trước khi gửi thiệp

Có thể thử API ngay cả khi form còn ở demo. Với dev server đang chạy (`npm run dev`), mở terminal thứ hai ở gốc dự án và chạy:

```sh
node app/graduation/google-sheets/test-rsvp.mjs
```

Script gửi 4 request cùng một `response_id`: tạo maybe, retry maybe, cập nhật yes và cập nhật no. Kiểm tra **chỉ một dòng** tên `TEST RSVP local` cho mã được in ra, trạng thái cuối là `no`, label `Không tham dự`; `created_at` giữ nguyên. Script không tự xóa dòng thử. Mỗi lần chạy lại script sẽ tạo mã thử mới.

Sau khi deploy/redeploy code và hai biến môi trường production, có thể thử tương tự trên domain:

```sh
node app/graduation/google-sheets/test-rsvp.mjs https://thanquocthinh.id.vn
```

Nếu nhận HTTP `404`, bản production chưa có route API RSVP: deploy commit chứa `app/api/graduation/rsvp/route.ts`. HTTP `503` thường là thiếu/sai cấu hình biến môi trường; HTTP `502` là Google chưa xác nhận ghi, cần kiểm tra deployment `/exec`, quyền Anyone và secret trùng nhau. Không gửi secret trong chat hoặc screenshot lỗi. Restart/redeploy sau khi chỉnh biến môi trường.

Sau khi API ghi thành công, bật `responses.mode` thành `live` nếu chưa bật. Mở `/graduation`, chọn một trạng thái, nhập tên thử và gửi bằng form; “Chỉnh lại phản hồi” cho phép sửa cùng dòng từ cùng trình duyệt. Bản production cũng phải được redeploy sau khi bật live.

- Gửi một phản hồi “Sẽ báo lại”; thấy một dòng có `attendance = maybe`, label đúng và TongQuan tăng một.
- Chọn “Chỉnh lại phản hồi”, chuyển thành “Chắc chắn rồi”; vẫn một dòng, `created_at` giữ nguyên, `updated_at` thay đổi, số đếm chuyển từ maybe sang yes.
- Thử “Không tham dự”; không bị tính vào số khách xác nhận đến.
- Retry sau lỗi mạng dùng cùng response ID: không thêm dòng trùng. Không báo thành công nếu Google trả lỗi, hết quota hoặc không xác nhận được ghi.
- Thử trên điện thoại và production sau khi redeploy.

Mỗi trình duyệt có một mã RSVP cho sự kiện này; reload cùng trình duyệt rồi gửi lại cập nhật dòng cũ, nhưng không tự tải lại nội dung từ Sheet. Khác thiết bị/trình duyệt, xóa storage hoặc không cho phép lưu storage sẽ có thể tạo phản hồi mới. Hai người dùng chung trình duyệt sẽ cập nhật cùng dòng. Mã này dùng để sửa phản hồi, không phải xác minh danh tính khách.

Script dùng lock khi tìm/ghi dòng để tránh retry đồng thời bị trùng. Chống spam cơ bản: honeypot, kiểm tra dữ liệu, body tối đa 8 KB ở API, giới hạn 6 request/mã/phút và 120 request tổng/phút qua Script Cache. Cache có thể bị Google thu hồi sớm nên giới hạn này là best-effort; khi cần bảo vệ mạnh hơn, cấu hình rate limit/WAF trên hosting hoặc CAPTCHA xác minh ở server. Origin check không phải cơ chế xác thực khách.

Google Apps Script có quota và không đảm bảo độ trễ. Không đổi chủ sở hữu Sheet/project sát ngày lễ; nếu đổi chủ hoặc sửa deployment, thử lại toàn bộ luồng.

Tài liệu chính thức: [Web apps](https://developers.google.com/apps-script/guides/web), [Script Properties](https://developers.google.com/apps-script/guides/properties), [Lock Service](https://developers.google.com/apps-script/reference/lock/lock-service), [Script Cache](https://developers.google.com/apps-script/reference/cache/cache), [Quotas](https://developers.google.com/apps-script/guides/services/quotas).
