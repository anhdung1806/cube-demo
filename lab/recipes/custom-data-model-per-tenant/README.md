# Lab: Providing a custom data model for each tenant

**Hướng dẫn tương ứng:** [Providing a custom data model for each tenant](/recipes/configuration/custom-data-model-per-tenant)  
**Dữ liệu dùng chung:** `orders`, `customers`, `products` trong PostgreSQL của lab.

## Tình huống thực tế

Một số doanh nghiệp Data360 dùng bộ chỉ tiêu riêng, còn số khác dùng mô hình chuẩn.

## Mục tiêu học

Tách phần model dùng chung và phần mở rộng theo tenant; cân nhắc chi phí triển khai, kiểm soát phiên bản và rủi ro schema drift.

## Làm bài

1. Chạy stack một lần từ thư mục `lab`: `docker compose up -d`.
2. Mở `http://localhost:8080`, chọn **Providing a custom data model for each tenant**. Chọn tenant `101` hoặc `202`; trang tự nạp query tương ứng.
3. Chạy REST API với tenant 101. Model `TenantSales` công bố `revenue`, `orderCount`, `averageOrderValue`; tenant này thấy `averageOrderValue`.
4. Đổi Tenant ID sang `202`, chạy lại. Model của tenant này công bố `revenue`, `orderCount`, `distinctOrders`; tenant này thấy `distinctOrders` thay cho `averageOrderValue`.
5. Thử sửa query để yêu cầu member của tenant còn lại. Cube không đưa member đó vào model tenant hiện tại nên query sẽ bị từ chối. Bộ lọc tenant vẫn được `queryRewrite` tự động thêm.
6. `contextToAppId` tạo app ID riêng theo tenant để tách cache; `COMPILE_CONTEXT.securityContext` chọn member trong `TenantSales.js`. Vì vậy đây là hai model khác nhau khi biên dịch, không chỉ là hai bộ lọc dòng.
5. Mở hướng dẫn tương ứng ở đầu trang để áp dụng phần cấu hình/schema đầy đủ. Các mẫu nâng cao nằm cạnh dữ liệu dùng chung trong `lab/cube/schema`.

## Tự kiểm tra

- Tenant có thể dùng sai query mẫu bằng cách đổi Tenant ID sau khi đã sửa query thủ công không?
- Tách model theo tenant làm tăng số lần biên dịch và cache cần quản lý ra sao?
- Có cần công bố thành viên khác nhau theo từng khách hàng hay nên dùng một model chuẩn có role/filter?
- Kỹ thuật này tác động thế nào đến độ mới, thời gian phản hồi và chi phí khi dữ liệu tăng?

> Dữ liệu lab là dữ liệu giả lập nhỏ để kiểm tra logic. Bài về dịch vụ ngoài (như dbt, SSL, database thứ hai hoặc Chat API) dùng query này làm nền và thực hành phần tích hợp theo hướng dẫn; Compose không giả lập các dịch vụ đó.
