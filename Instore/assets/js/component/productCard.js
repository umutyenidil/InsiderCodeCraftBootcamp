const buildStyle = () => {
    if (!$("style#product-card").exists()) {
        $("<style id='product-card'>").html(
            `
           .container .product-grid .product-grid__item a .product-card {
                width: 100%;
                cursor: pointer;
                transition: box-shadow 0.2s ease;
                overflow: hidden;
            }
            
            .container .product-grid .product-grid__item a .product-card:hover {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }
            
            .container .product-grid .product-grid__item a .product-card .product-card__body {
                width: 100%;
            }
            
            .container .product-grid .product-grid__item a .product-card .product-card__body img {
                width: 100%;
            }
            
            .container .product-grid .product-grid__item a .product-card:hover .product-card__body img {
            }
            
            .container .product-grid .product-grid__item a .product-card .product-card__detail {
                padding: 12px;
                display: flex;
                flex-direction: column;
                row-gap: 12px;
            }
            
            .container .product-grid .product-grid__item a .product-card .product-card__detail .product-card__info {
                display: flex;
                flex-direction: column;
                row-gap: 6px;
            }
            
            .container .product-grid .product-grid__item a .product-card .product-card__detail .product-card__info .product-card__title {
                font-size: 16px;
                font-weight: 600;
            }
            
            .container .product-grid .product-grid__item a .product-card .product-card__detail .product-card__info .product-card__subtitle {
                font-size: 14px;
                font-weight: 500;
                color: rgba(0, 0, 0, .5);
            }
            
            .container .product-grid .product-grid__item a .product-card .product-card__detail .product-card__pricing {
                display: flex;
            }
            
            .container .product-grid .product-grid__item a .product-card .product-card__detail .product-card__price {
                font-size: 20px;
                font-weight: 700;
            }
            `.replace(/\s+/g, " ")
        ).appendTo("head");
    }
};

const buildElement = (data) => {
    const id = data["globalProductId"];

    const title = data["copy"]["title"];

    const subtitle = data["copy"]["subTitle"];

    const imageUrl = data["colorwayImages"]["squarishURL"];

    const price = data["prices"]["currentPrice"];
    const formattedPrice = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);

    const detailUrl = data['pdpUrl']["url"];

    return `
        <li class="product-grid__item" >
            <a target="_blank" href="${detailUrl}">
                <div class="product-card"
                     data-id="${id}"
                     data-json='${encodeURIComponent(JSON.stringify(data))}'>
                    <div class="product-card__body">
                        <img src="${imageUrl}" alt="${imageUrl}"/>
                    </div>
                    <div class="product-card__detail">
                        <div class="product-card__info">
                            <div class="product-card__title">${title}</div>
                            <div class="product-card__subtitle">${subtitle ?? ""}</div>
                        </div>
    
                        <div class="product-card__pricing">
                            <div class="product-card__price">${formattedPrice}</div>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    `;
};

const buildScript = (product) => {
    const id = product["globalProductId"];

    const colorHex = product["displayColors"]["simpleColor"]["hex"];
    const color = `#${colorHex}`;

    $(document).ready(function () {
        $(`.product-card[data-id="${id}"]`).animateHoverColor(color, 200, ".product-card__title");

        $(`.product-card[data-id="${id}"]`).animateHoverTransform("rotate(-30deg) translateX(-16px)", 200, ".product-card__body img");
    });
};

export const buildProductCard = (product) => {

    buildStyle();

    const element = buildElement(product);

    buildScript(product);

    return element;
};