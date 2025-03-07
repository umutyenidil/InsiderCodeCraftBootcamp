import {buildProductCard} from "./component/productCard.js";

$(function () {
    $.ajax({
        type: "GET",
        url: "assets/data/data.json",
        headers: {
            "Access-Control-Allow-Origin": "https://www.nike.com",
        },
        success: function (data) {
            for (const productGrouping of data["productGroupings"]) {
                for (const product of productGrouping["products"]) {
                    $(".product-grid").append(buildProductCard(product));
                }
            }
        }
    });
});