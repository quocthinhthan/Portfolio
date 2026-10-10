# Link thiệp riêng và triển khai Vercel

Link mới: `/graduation/ten-khach/Ab12Cd`. Mã 6 ký tự phân biệt chữ hoa/thường xác định lời mời; tên trong đường dẫn chỉ giúp dễ đọc. Tên trên thiệp và `invited_name` trong Sheet lấy từ file trên server.

## 1. Quản lý danh sách trong một file

File gốc: [`invitations/registry.json`](./invitations/registry.json). Đã tạo lời mời cho **Trần Khải Tấn**, theo tên bạn đưa làm ví dụ. Xem link có thể copy trong [`invitations/LINKS.md`](./invitations/LINKS.md).

Thêm người bằng cách thêm một object vào mảng `invitations`, giữ nguyên những object đã có:

```json
{ "name": "Thầy Nguyễn Văn An" }
```

Sau đó, ở gốc dự án, chạy:

```sh
npm run invitations:generate
```

Lệnh sinh UUID và token ngẫu nhiên 6 ký tự chữ/số, kiểm tra trùng, tạo slug bỏ dấu và cập nhật `LINKS.md`. Chạy lại giữ nguyên ID/token của lời mời đã có. Hai người trùng tên vẫn có thể có hai object với ID/token khác nhau. Tên tối đa 48 ký tự, có thể kèm danh xưng.

- **Đổi tên:** sửa `name` trong object hiện có, giữ nguyên `id` và `token`, chạy lại lệnh. Link với slug cũ sẽ chuyển về slug mới.
- **Tắt lời mời:** đổi `active` thành `false`, chạy lại lệnh và redeploy. Link không mở/gửi RSVP được nữa; dữ liệu đã lưu trong Sheet vẫn giữ.
- **Đổi mã bị lộ:** xóa riêng field `token` của object đó rồi chạy lại lệnh. Giữ `id` để link mới vẫn cập nhật cùng dòng RSVP. Redeploy; token cũ hết hiệu lực trên deployment mới.
- **Domain khác:** `npm run invitations:generate -- --base-url https://your-domain.example`.

Commit `registry.json` và `LINKS.md` vào repo private của bạn. Không đặt chúng trong `public`, không chia sẻ toàn bộ danh sách cho khách. Module đọc file được đánh dấu `server-only`; chỉ tên và token của đúng lời mời đang mở được truyền cho giao diện.

## 2. Cập nhật Google Apps Script trước khi deploy website mới

1. Mở project Apps Script hiện tại của Google Sheet.
2. Thay toàn bộ nội dung `Code.gs` bằng [`google-sheets/Code.gs`](./google-sheets/Code.gs) mới trong dự án; lưu lại.
3. Chọn **setupRSVP → Run**. Script giữ nguyên dữ liệu A:G và thêm:
   - H: `invitation_id` — mã lời mời ổn định.
   - I: `invited_name` — tên chuẩn của người được mời.
4. Nếu bạn có cột ghi chú riêng từ H trở đi, script chèn hai cột mới, đẩy ghi chú sang J trở đi. Chạy lại không thêm cột lần nữa. Bộ lọc cũ chỉ phủ A:G sẽ được tạo lại để phủ A:I.
5. **Deploy → Manage deployments → Edit → Version: New version → Deploy**. Giữ **Execute as: Me**, **Who has access: Anyone** và deployment URL `/exec` hiện tại.

Secret được giữ nguyên, không cần tạo Google Sheet mới. Nếu tạo deployment URL mới thì cập nhật `RSVP_SCRIPT_URL` ở local và Vercel.

Các dòng RSVP cũ không được tự gán vào khách dựa trên tên, vì có thể trùng tên hoặc không đúng người được mời. Hai cột mới để trống trên các dòng cũ. Phản hồi từ link mới được tìm/cập nhật theo `invitation_id`; `response_id` ở cột A có dạng `invite_<UUID>`.

Website mới kiểm tra protocol `schemaVersion: 2`. Apps Script cũ sẽ từ chối mã response mới, nên không âm thầm ghi phản hồi thiếu `invited_name`. Khi triển khai, cập nhật Apps Script và deploy website liên tiếp; bản website cũ không gửi được RSVP vào script mới trong khoảng chuyển đổi.

## 3. Cấu hình Vercel

Không cần thêm database, server riêng, biến môi trường chứa danh sách hoặc `vercel.json`. JSON được import trực tiếp trong code server và đóng gói cùng deployment. Giữ hai biến server đã cấu hình:

```dotenv
RSVP_SCRIPT_URL=https://script.google.com/macros/s/.../exec
RSVP_SCRIPT_SECRET=secret_dang_dung
```

Trong Vercel **Project → Settings → Environment Variables**, xác nhận chúng có ở **Production** và **Preview** nếu muốn thử preview. Không dùng tiền tố `NEXT_PUBLIC_`.

Commit/push toàn bộ code hiện tại, bao gồm registry, rồi để Vercel build/deploy. Framework Preset là **Next.js**, Build Command `npm run build` (hoặc mặc định của Next.js). Không dùng static export. Không cần rewrite thủ công cho `/graduation/[slug]/[token]`.

Thêm/tắt khách, đổi tên hoặc đổi token cần redeploy để danh sách mới có hiệu lực. Các deployment cũ có snapshot danh sách cũ; khi thu hồi link nhạy cảm, cần gỡ/bảo vệ deployment cũ nếu trước đó đã chia sẻ cả URL deployment đó.

## 4. Kiểm tra

1. `npm run dev`, mở link trong `LINKS.md` bằng domain local (giữ nguyên đường dẫn). Bìa và hero phải hiển thị đúng tên.
2. Đổi slug sang tên khác nhưng giữ token: chuyển lại về slug chuẩn, tên không thay đổi. Thêm `?to=Tên khác` cũng không thay đổi danh tính.
3. Token sai/không hoạt động: trang báo đường dẫn chưa hợp lệ. API không ghi vào Google Sheet.
4. `/graduation` và các link `?to=...` cũ chỉ là thiệp chung, không cho gửi RSVP.
5. Gửi RSVP từ link hợp lệ: Sheet lưu cả `name` (tên người gửi) và `invited_name` (tên chuẩn). Sửa phản hồi hoặc mở cùng link bằng thiết bị khác vẫn cập nhật cùng `invitation_id`.
6. Sau khi deploy, lặp lại các bước trên bằng domain production.

Muốn chạy smoke test mà không ghi đè phản hồi khách thật, thêm một object `{ "name": "TEST RSVP" }`, chạy generator và lấy token của lời mời thử:

```sh
node app/graduation/google-sheets/test-rsvp.mjs http://localhost:3000 TOKEN6
node app/graduation/google-sheets/test-rsvp.mjs https://thanquocthinh.id.vn TOKEN6
```

Script từ chối token thuộc khách thật. Nó tạo maybe, gửi lặp maybe, đổi yes rồi no; cùng token phải chỉ có một dòng. Không tự xóa dòng thử. Chạy lại cập nhật cùng dòng; đặt `active: false` cho lời mời TEST và redeploy khi không cần nữa.

Đây là link riêng dùng để nhận diện lời mời, không phải đăng nhập. Người có link có thể gửi thay khách đó. Mã 6 ký tự không chống được việc chia sẻ link; Apps Script có giới hạn request cơ bản, và có thể bổ sung rate limit qua Vercel Firewall nếu cần.

Tài liệu: [Next.js bảo vệ module server](https://nextjs.org/docs/app/getting-started/server-and-client-components), [Vercel đọc file trong Functions](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions), [Deploy Apps Script](https://developers.google.com/apps-script/guides/web).
