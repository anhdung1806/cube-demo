# Cube + Data360: lab thực hành

Lab chạy Cube, PostgreSQL và trang gọi API bằng Docker Compose, theo cách tổ chức `examples/recipes`: cấu hình Cube ở `cube/cube.js`, mỗi cube nghiệp vụ là một file schema, dữ liệu khởi tạo ở `postgres/init.sql`. Cube Store lưu metastore và pre-aggregations trong volume ghi được riêng, tách khỏi thư mục cấu hình chỉ đọc. Bộ bảng dùng chung giả lập một nền tảng B2B đa tenant gồm đơn hàng, khách hàng và sản phẩm; các bài học cùng query trên dữ liệu này.

## Chạy

```sh
cd lab
docker compose up -d
```

Mở trang thử nghiệm tại http://localhost:8080, Cube Playground tại http://localhost:4000. Trang web có REST API và SQL API HTTP ở tab bên trái; kết quả hiển thị dạng bảng, JSON hoặc SQL nguồn đã sinh. SQL client như `psql` cũng có thể kết nối Cube qua PostgreSQL protocol tại cổng `15432`. PostgreSQL nguồn có thể xem tại `localhost:5433` (cube / cube-local-only). Dừng bằng `docker compose down`; xóa cả dữ liệu volume bằng `docker compose down -v`.

## Bài học

Có **48 bài lab**, mỗi thư mục trong `recipes/` ứng với một trang hướng dẫn trong `docs-mintlify/recipes`. Mỗi bài có README tiếng Việt và query JSON được nạp vào trang web để chạy thử. Chọn bài trong danh sách ở `http://localhost:8080`.

Đọc [hướng dẫn lab tổng quan](../docs-mintlify/recipes/data360-lab/index.mdx) trước. Bộ dữ liệu chung mô phỏng khách hàng doanh nghiệp, đơn hàng, sản phẩm, sự kiện sử dụng, thuộc tính EAV, lịch sử trạng thái và dòng tiền. Các bài về dịch vụ ngoài như dbt, SSL, multi-database và Chat API giải thích cách nối kiến thức vào tình huống Data360; chúng không giả lập dịch vụ ngoài trong Docker Compose này.

## Phạm vi demo

Đây là môi trường học tập đơn máy, có dữ liệu nhỏ, secret tĩnh và chế độ dev. Không công khai ra Internet hoặc dùng secret/data thật. Nó minh họa semantic model, JWT/security context, chính sách tenant, pre-aggregation, REST và kết nối SQL; không đại diện cấu hình HA, hiệu năng hay SLA production. Với 350.000 khách hàng doanh nghiệp, cần benchmark theo kích thước tenant, độ đồng thời, độ trễ nguồn, số lượng rollup/partition và yêu cầu cách ly trước khi chọn kiến trúc.

Compose hiện dùng volume `lab-db-v2` để seed thêm các bảng `events`, `customer_attributes`, `order_status_history` và `cash_flows`. Volume demo cũ được giữ nguyên; không cần xóa volume thủ công.
