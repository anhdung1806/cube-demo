# Lab: Daily, Weekly, Monthly Active Users (DAU, WAU, MAU)

**Tài liệu gốc:** [Daily, Weekly, Monthly Active Users](/recipes/data-modeling/active-users)  
**Model thực hành:** [`Events.js`](../../cube/schema/Events.js)  
**Query nạp sẵn:** [`query.json`](query.json)

## Tình huống

Đội sản phẩm Data360 muốn biết có bao nhiêu khách hàng doanh nghiệp đã tương tác với sản phẩm trong ngày gần nhất, 7 ngày gần nhất và 30 ngày gần nhất. Số sự kiện không đồng nghĩa với số khách hàng: một khách có thể tạo nhiều sự kiện.

## Dữ liệu

Bảng `events` có một dòng cho mỗi tương tác, gồm `customer_id`, loại sự kiện, phiên và thời điểm. Ngày được chọn là 27/03/2025. Trong seed, một khách hàng hoạt động ngày đó; hai khách hoạt động trong 7 ngày; ba khách hoạt động trong 30 ngày. Query có JWT tenant như giao diện; model tự thêm điều kiện tenant.

## Làm bài

1. Chạy Compose trong thư mục `lab`, mở `http://localhost:8080`, chọn bài này.
2. Chạy query mẫu. Kết quả mong đợi: DAU `1`, WAU `2`, MAU `3`, WAU/MAU `0.6667` (xấp xỉ 66.67%).
3. Đổi ngày trong `dateRange` thành `2025-03-03`. Chạy lại để thấy cửa sổ tính theo ngày được chọn thay đổi.
4. Mở `Events.js` và đối chiếu ba `rollingWindow`: chỉ khác độ dài cửa sổ; tất cả đều đếm `customer_id` duy nhất.

## Đọc query từng phần

- `measures` yêu cầu DAU, WAU, MAU và tỷ lệ WAU/MAU. Các measure được định nghĩa trong Cube, nên client không tự tính lại từ số sự kiện.
- `timeDimensions.dimension` chọn trục thời gian `Events.occurredAt`.
- `dateRange` chỉ định ngày cần trả kết quả. Rolling window sẽ đọc lịch sử trước ngày đó để tính khoảng lùi tương ứng.
- `granularity: day` yêu cầu một điểm theo ngày. Với nhiều ngày trong khoảng, Cube trả một hàng cho mỗi ngày.
- `wauToMau` chia số khách hoạt động 7 ngày cho số khách hoạt động 30 ngày; `NULLIF` bảo vệ mẫu số bằng 0.

## Điểm cần phân biệt

Bài gốc định nghĩa rolling windows cố định: 1, 7 và 30 ngày. Người dùng không gửi độ dài bất kỳ vào query. Nếu cần dropdown chọn độ dài lúc chạy, xem bài [Configurable rolling windows](/recipes/data-modeling/dynamic-rolling-windows). Dữ liệu seed nhỏ nên mục đích là kiểm tra logic và grain, không đại diện cho tải production.
