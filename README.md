# Hướng dẫn cài đặt

## Môi trường

-   [Nodejs](https://nodejs.org/en)

## Thiết lập biến môi trường

Copy file `.env.example` thành file `.env` và chỉnh sửa các giá trị trong đó cho phù hợp:

-   `PORT`: Cổng mà server sẽ sử dụng
-   `DB_HOST`: Host của database
-   `DB_PORT`: Cổng của database
-   `DB_USERNAME`: Tên người dùng của database
-   `DB_PASSWORD`: Mật khẩu database
-   `DB_DATABASENAME`: Tên cơ sở dữ liệu
-   `DB_DIALECT`: Loại cơ sở dữ liệu (mariadb hoặc mysql)
-   `JWT_SECRET`: Khóa mật dùng để mã hóa và giải mã thông tin người dùng

## Firebase Auth

Do ứng dụng có sử dụng dịch vụ xác thực của Firebase nên cần phải có file service account của firebase

Chi tiết: https://firebase.google.com/docs/admin/setup?hl=vi

Sau khi tải file service account về, các bạn để nó vào thư mục firebase với tên là `key.json`

## Tạo tài khoản

Ứng dụng sử dụng 1 bảng riêng để quản lý giới tính của người dùng nên khi chạy server lần đầu, ta sẽ vào bảng genders để thêm 1 giới tính rồi mới có thể tạo tài khoản mới.

## Cài đặt các gói thư viện

```sh
npm i
```

## Chạy dự án trong môi trường phát triền

```sh
npm run dev
```

## Chạy dự án trong môi trường production

```sh
npm start

```
