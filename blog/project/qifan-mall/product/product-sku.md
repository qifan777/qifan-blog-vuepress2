# 商品SKU

## 建表

```sql
-- auto-generated definition
create table product_sku
(
    id           varchar(36)    not null
        primary key,
    created_time datetime(6)    not null,
    edited_time  datetime(6)    not null,
    creator_id   varchar(36)    not null,
    editor_id    varchar(36)    not null,
    `values`     varchar(255)   not null,
    name         varchar(255)   not null,
    product_id   varchar(255)   not null,
    cover        varchar(255)   null,
    price        decimal(38, 2) null,
    stock        int            null,
    description  varchar(255)   null
);
```
