# Lab: Configurable rolling windows and time shifts

**Tài liệu gốc:** [Configurable rolling windows and time shifts](/recipes/data-modeling/dynamic-rolling-windows)  
**Model thực hành:** [`GrossSales.js`](../../cube/schema/GrossSales.js)  
**Query nạp sẵn:** [`query.json`](query.json)

## Tình huống

Dashboard Data360 cần cho người quản lý chọn cửa sổ 3, 6, 9 hoặc 12 tháng để xem doanh số hiện tại so với đúng cửa sổ liền trước. Ta không muốn tạo bốn dashboard hay để client tự ghép SQL.

## Dữ liệu

Cube `GrossSales` dùng 24 điểm doanh số tổng hợp theo tháng, từ tháng 1/2023 đến tháng 12/2024. Mỗi tháng tăng 10 đơn vị, bắt đầu ở 100. Đây là chuỗi giả lập nhỏ, độc lập với bảng đơn hàng; nhờ vậy có đủ lịch sử để quan sát rolling window và time shift. Query chọn tháng 12/2024 và cửa sổ `9m`.

## Thực hành

1. Chạy `docker compose up -d` trong thư mục `lab`, mở `http://localhost:8080` và chọn bài này.
2. Trong tab REST API, xem JSON đã nạp. Bấm **Chạy REST**. Với cửa sổ 9 tháng, kết quả mong đợi là hiện tại `2610`, kỳ trước `1800`, chênh lệch `810`, tăng trưởng `45%`.
3. Đổi `filters.values` từ `9m` thành `3m`, `6m`, rồi `12m`; mỗi lần bấm chạy để xem cùng một bộ measure đổi theo lựa chọn.
4. Xóa filter nhưng giữ dimension `GrossSales.growthWindow` trong query để xem các cửa sổ cạnh nhau.

## Đọc query theo từng phần

- `measures` yêu cầu bốn kết quả đã định nghĩa trong model: tổng hiện tại, tổng cửa sổ liền trước, chênh lệch và phần trăm thay đổi. Client không truyền số tháng vào công thức.
- `dimensions` phải có `GrossSales.growthWindow`: đây là switch dimension cho phép các measure `case` biết cần dispatch nhánh nào.
- `timeDimensions` giới hạn điểm cần tính ở tháng 12/2024. Dùng time dimension thay vì filter thường để Cube nhận biết đây là truy vấn chuỗi thời gian.
- `filters` chọn `9m`. Nó lọc giá trị của switch dimension, không thay đổi định nghĩa measure.
- Trong model, mỗi rolling measure tính tổng trailing N tháng; measure `priorR...` dịch cùng phép tính lùi N tháng. Các measure `case` chọn cặp tương ứng, rồi measure change/growth tính hiệu và tỷ lệ.

## Giới hạn cần nhớ

`rollingWindow` và `timeShift` thuộc định nghĩa measure, không phải tham số tùy ý gửi trong query. Switch chỉ chọn trong danh sách được cho phép. Tài liệu gốc cũng yêu cầu `case` có nhánh `else` và query phải gồm switch dimension. Ví dụ này dùng chuỗi tổng hợp, không phải số tiền trong bảng `orders`.
