# 商品管理

## 建表

```sql
-- auto-generated definition
create table product
(
    id             varchar(36)    not null
        primary key,
    created_time   datetime(6)    not null,
    edited_time    datetime(6)    not null,
    creator_id     varchar(36)    not null,
    editor_id      varchar(36)    not null,
    name           varchar(255)   not null,
    price          decimal(10, 2) not null,
    cover          varchar(255)   not null,
    brand          varchar(255)   not null,
    category_id    varchar(36)    not null,
    stock          int            not null,
    description    text           not null,
    tags           varchar(255)   not null,
    specifications text           not null,
    attributes     text           not null
);
```
