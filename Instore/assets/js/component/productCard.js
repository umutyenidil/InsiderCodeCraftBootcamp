export const buildProductCard = (product) => {

    const id = product["globalProductId"];

    const title = product["copy"]["title"];

    const subtitle = product["copy"]["subTitle"];

    const imageUrl = product["colorwayImages"]["squarishURL"];

    const price = product["prices"]["currentPrice"];
    const formattedPrice = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);

    const detailUrl = product['pdpUrl']["url"];

    const colorHex = product["displayColors"]["simpleColor"]["hex"];
    const color = `#${colorHex}`;

    return `
        <li class="product-grid__item">
            <style>
                .container .product-grid .product-grid__item #product${id}:hover .product-card__detail .product-card__info .product-card__title {
                    color: ${color}; 
                }
            </style>
            <a target="_blank" href="${detailUrl}">
                <div id="product${id}" class="product-card">
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