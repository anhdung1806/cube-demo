# Lab: Passing dynamic parameters in a query

**Tài liệu gốc:** [Passing dynamic parameters in a query](/recipes/data-modeling/passing-dynamic-parameters-in-a-query)  
**Model thực hành:** [`ProvinceShare.js`](../../cube/schema/ProvinceShare.js)  
**Query nạp sẵn:** [`query.json`](query.json)

## Tình huống

Một trang phân tích muốn cho người dùng chọn tỉnh rồi trả lời: “Doanh nghiệp ở tỉnh này chiếm bao nhiêu phần trăm toàn bộ doanh nghiệp trong tập dữ liệu?” Lựa chọn tỉnh chỉ điều khiển tử số; nếu lọc cả query theo tỉnh thì mẫu số cũng chỉ còn tỉnh đó và tỷ trọng luôn thành 100%.

## Dữ liệu

Lab dùng bảng `customers` như danh sách khách hàng doanh nghiệp: 5 doanh nghiệp ở Hà Nội, Đà Nẵng, TP Hồ Chí Minh và Cần Thơ. Query mẫu chọn Hà Nội. Theo dữ liệu seed, có 2/5 doanh nghiệp ở Hà Nội, nên kết quả dự kiến là 40%.

## Thực hành

1. Khởi động stack từ thư mục `lab`, mở `http://localhost:8080` và chọn bài này.
2. Chạy query REST mẫu. Bảng kết quả cần có tổng số doanh nghiệp `5`, số doanh nghiệp tại tỉnh chọn `2`, tỷ trọng `40`.
3. Đổi `ProvinceShare.provinceFilter` lần lượt thành `Đà Nẵng`, `TP Hồ Chí Minh`, `Cần Thơ`; chạy lại và đối chiếu lần lượt 20%, 20%, 20%.
4. Để thấy lỗi tư duy thường gặp, thêm `ProvinceShare.province` vào `dimensions`. Dimension này mô tả tỉnh của từng dòng dữ liệu; nó khác `provinceFilter`, là giá trị người dùng chọn để truyền vào phép tính.

## Đọc query theo từng phần

- `totalBusinesses` đếm toàn bộ dòng khách hàng doanh nghiệp trong tập dữ liệu.
- `businessesInSelectedProvince` cũng đếm dòng, nhưng có filter nội bộ `province = provinceFilter`. Filter nằm bên trong định nghĩa measure nên chỉ áp dụng vào measure này.
- `provinceShare` lấy số doanh nghiệp trong tỉnh chọn chia cho tổng số doanh nghiệp, nhân 100; `NULLIF` tránh chia cho 0.
- Query chỉ truyền filter trên `ProvinceShare.provinceFilter`. SQL của cube dùng `FILTER_PARAMS` để lấy tỉnh đã chọn trong CTE `selected_province`, sau đó cross join giá trị đó với các dòng doanh nghiệp. Vì vậy query vẫn giữ các dòng cần thiết để tính mẫu số.
- Không có dimension trong query nên kết quả là một hàng tổng hợp cho lựa chọn hiện tại.

## Khác biệt với bài gốc và giới hạn

> Tài liệu Cube minh họa cùng kỹ thuật bằng người dùng, thành phố và tỷ lệ một nhóm giới tính. Lab chuyển sang dữ liệu doanh nghiệp/tỉnh thành sẵn có, giữ nguyên ý tưởng quan trọng: lấy một giá trị được chọn từ dữ liệu rồi dùng nó trong một measure mà không lọc mất mẫu số. Đây là dữ liệu seed nhỏ, không có phân quyền tenant cho cube minh họa này; không dùng mẫu đó trực tiếp làm endpoint công khai.
