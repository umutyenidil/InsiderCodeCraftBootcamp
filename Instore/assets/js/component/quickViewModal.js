const buildStyle = () => {
    $("<style id='quick-view'>").html(
        `        
        .quick-view__overlay {
            position: fixed;
            
            width: 100%;
            height: 100vh;
            
            top: 0;
            
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            opacity: 0;
            
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .quick-view__overlay .modal {
            width: 70%;
            height: 512px;
            
            padding: 18px;
            
            transform: translateX(-200%);
            
            display: flex;
            flex-direction: column;
            row-gap: 12px;
            
            background-color: #ffffff;
        }  
        
        .quick-view__overlay .modal .modal__actions {
            display: flex;
            justify-content: end;
            column-gap: 12px
        }
        
        .quick-view__overlay .modal .modal__actions button {
            appearance: none;
            outline: none;
            border: none;
           
            display: block;
            
            height: fix-content;
            width: fit-content;
            
            padding: 4px;
            
            font-size: 32px;
        }
        
        .quick-view__overlay .modal .modal__actions button i {
            display: block
        }
        
        .quick-view__overlay .modal .modal__content {
            width: 100%;
            height: 100%;
            overflow: hidden; 
            
            display: flex;
        }
        
        .quick-view__overlay .modal .modal__content .product-gallery {
            width: 50%;
            height: 100%;
            
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            row-gap: 12px;
            
        }
        
        .quick-view__overlay .modal .modal__content .product-gallery .product-gallery__main {
            width: 100%;
            height: calc(100% - 60px); 
            
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .quick-view__overlay .modal .modal__content .product-gallery .product-gallery__main img {
            width: 100%;
            height: 100%;
            
            display: block;
            
            object-fit: contain; 
        }
        
        .quick-view__overlay .modal .modal__content .product-gallery .product-gallery__thumbnails {
            height: 48px
            
            display: flex;
            
        }
        
        .quick-view__overlay .modal .modal__content .product-gallery .product-gallery__thumbnails img {
            height: 48px
        }
        
        .quick-view__overlay .modal .modal__content .product-details {
            width: 50%;
            height: 100%;
            
            display: flex;
            flex-direction: column;
            row-gap: 12px;
        }
        
        .quick-view__overlay .modal .modal__content .product-details .product-details__header {
            display: flex;
            flex-direction: column;
            row-gap: 4px;
        }
        
        .quick-view__overlay .modal .modal__content .product-details .product-details__header .label{
            font-size: 14px;
            color: red;
        }
        
        .quick-view__overlay .modal .modal__content .product-details .product-details__header .title{
            font-size: 20px;
            font-weight: 600;
        }
        
        .quick-view__overlay .modal .modal__content .product-details .product-details__header .subtitle{
            font-size: 16px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.5);
        }
        
        .quick-view__overlay .modal .modal__content .product-details .product-details__pricing .price {
            font-size: 24px;
            font-weight: 600;
        }
        
        .quick-view__overlay .modal .modal__content .product-details .product-details__info {
            height: 100%;
            overflow-y: auto;
        }
        
        .quick-view__overlay .modal .modal__content .product-details .product-details__info p{
            font-size: 14px;
            font-weight: 300;
        }
        
        .quick-view__overlay .modal .modal__content .product-details .cart-btn {
            appearance: none;
            outline: none;
            border: none;
           
            cursor: pointer;
           
            display: block;
            
            width: 100%;
            height: fix-content;
            
            padding: 8px 16px;
            
            font-size: 15px;
            
            transition: background-color 0.1s ease;
        }
        
        .quick-view__overlay .modal .modal__content .product-details .cart-btn:hover {
            background-color: #e2e2e2;
        }
        `.replace(/\s+/g, " ")
    ).appendTo("head");
};

const buildElement = (data) => {
    const id = data["globalProductId"];

    const label = data['badgeLabel'];

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

    $("<div class='quick-view__overlay'>").html(
        `
        <div class="modal">
            <div class="modal__actions">
                <button class="modal__actions-close"><i class="bx bx-x"></i></button>
            </div>
            
            <div class="modal__content">
                <div class="product-gallery">
                    <div class="product-gallery__main">
                        <img src="${imageUrl}" alt="${imageUrl}"/>
                    </div>
                    <div class="product-gallery__thumbnails">
                        <img src="https://picsum.photos/512?random=1" alt="https://picsum.photos/512?random=1"/>
                        <img src="https://picsum.photos/512?random=2" alt="https://picsum.photos/512?random=2"/>
                        <img src="https://picsum.photos/512?random=3" alt="https://picsum.photos/512?random=3"/>
                        <img src="https://picsum.photos/512?random=4" alt="https://picsum.photos/512?random=4"/>
                        <img src="https://picsum.photos/512?random=5" alt="https://picsum.photos/512?random=5"/>
                    </div>
                </div>
                <div class="product-details">
                    <div class="product-details__header">
                        <span class="label">${label}</span>
                        <span class="title">${title}</span>
                        <span class="subtitle">${subtitle}</span>
                    </div>
                    
                    <div class="product-details__pricing">
                        <span class="price">${formattedPrice}</span>
                    </div>
                    
                    <div class="product-details__info">
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purposIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose</p>
                    </div>
                    
                    <button class="cart-btn">Sepete Ekle</button>
                </div>
            </div>
        </div>
        `
    ).appendTo("body");
};

const buildScript = () => {
    const animateModalIn = () => {
        $(".quick-view__overlay").animate(
            {opacity: 1},
            200,
            function () {
                $(this).animate(
                    {dummy: 1},
                    {
                        duration: 350,
                        step: function (now) {
                            $(this).find(".modal").css("transform", `translateX(${(now - 1) * 200}%)`);
                        },
                        complete: function () {
                            $(this).find(".modal").css("transform", "translateX(0)");
                        }
                    }
                );
            }
        );
    };

    const animateModalOut = () => {
        $('.quick-view__overlay').animate(
            {dummy: 0},
            {
                duration: 350,
                step: function (now) {
                    $(this).find(".modal").css("transform", `translateX(${(1 - now) * 200}%)`);
                },
                complete: function () {
                    $(this).animate(
                        {opacity: 0},
                        200, function () {
                            $(this).remove();
                        }
                    );
                }
            }
        );
    };

    animateModalIn();
    $(".quick-view__overlay").on("click", function (e) {
        if ($(e.target).is(".quick-view__overlay") || $(e.target).is(".modal__actions-close") || $(e.target).closest("button").hasClass("modal__actions-close")) animateModalOut();

        if ($(e.target).is("img") && $(e.target).closest("div").hasClass("product-gallery__thumbnails")) {
            $(this).find(".product-gallery__main img").animate(
                {
                    opacity: 0,
                },
                {
                    duration: 200,
                    complete: () => {
                        $(this).find(".product-gallery__main img").attr("src", $(e.target).attr("src"));
                        $(this).find(".product-gallery__main img").animate(
                            {
                                opacity: 1,
                            },
                            200
                        );
                    }
                }
            );
        }
    });

};

export const buildQuickViewModal = (data) => {
    buildStyle();

    buildElement(data);

    buildScript();
};