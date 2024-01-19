# 商品类别

## 建表

```sql
-- auto-generated definition
create table product_category
(
    id           varchar(36)  not null
        primary key,
    created_time datetime(6)  not null,
    edited_time  datetime(6)  not null,
    creator_id   varchar(36)  not null,
    editor_id    varchar(36)  not null,
    name         varchar(50)  not null,
    parent_id    varchar(36)  null,
    image        varchar(100) null,
    description  text         not null,
    sort_order   int          not null
);
```
