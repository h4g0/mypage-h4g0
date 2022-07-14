// Estrutura da order

export type ITEMS = ORDERCLIENT_ITEM[]

export type SHOP_MONEY = {
    "amount": string,
    "currency_code": string
} 

export type  ORDERCLIENT_ITEM = {
    "id": number,
    "admin_graphql_api_id": string,
    "fulfillable_quantity": number,
    "fulfillment_service": string,
    "fulfillment_status": string,
    "gift_card": boolean,
    "grams": number,
    "name": string,
    "price": string,
    "price_set": {
        "shop_money": SHOP_MONEY,
        "presentment_money": SHOP_MONEY
    },
    "product_exists": true,
    "product_id": number,
    "properties": [],
    "quantity": number,
    "requires_shipping": true,
    "sku": string,
    "taxable": true,
    "title": string,
    "total_discount": string,
    "total_discount_set": {
        "shop_money": SHOP_MONEY,
        "presentment_money": SHOP_MONEY
    },
    "variant_id": number,
    "variant_inventory_management": string,
    "variant_title": string,
    "vendor": string,
    "tax_lines": [],
    "duties": [],
    "discount_allocations": []
}

export type ORDER_CLIENT = {
    "order_id": number | string,
    "order_number": number | string,
    "email": string,
    "total_price": string | number,
    "wms": boolean,
    "state": string,
    "billing_address": {
        "first_name": string,
        "address1": string,
        "phone": string,
        "city": string,
        "zip": string,
        "province": string,
        "country": string,
        "last_name": string,
        "address2": string,
        "company": string,
        "latitude": string,
        "longitude": string,
        "name": string,
        "country_code": string,
        "province_code": string
    },
    "line_items": ITEMS,
    "shipping_address": {
        "first_name": string,
        "address1": string,
        "phone": string,
        "city": string,
        "zip": string,
        "province": string,
        "country": string,
        "last_name": string,
        "address2": string,
        "company": string,
        "latitude": string | number,
        "longitude": string | number,
        "name": string,
        "country_code": string,
        "province_code": string
    },
}