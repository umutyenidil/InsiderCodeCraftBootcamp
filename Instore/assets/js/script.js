import {buildProductCard} from "./component/productCard.js";
import {buildQuickViewModal} from "./component/quickViewModal.js";

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

    setTimeout(()=>{
        const encodedProductData = $(".product-card:first-child")?.data("json");

        if(encodedProductData) {
            const productData = JSON.parse(decodeURIComponent(encodedProductData));

            buildQuickViewModal(productData);
        }
    }, 100);

    $(document).find(".product-grid").on("click", (e) => {
        e.preventDefault();

        const encodedProductData = $(e.target)?.closest(".product-card")?.data("json");

        if(encodedProductData) {
            const productData = JSON.parse(decodeURIComponent(encodedProductData));

            buildQuickViewModal(productData);
        }
    });
});