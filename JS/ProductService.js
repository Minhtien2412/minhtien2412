function ProductService() {
    var productService = new Object();

    productService.create = function(id, thumb, title, originPrice, sale) {
        var product = new Object();
        product.id = id;
        product.thumb = thumb;
        product.title = title;
        product.originPrice = originPrice;
        product.sale = sale;

        product.salePrice = function() {
            var salePrice = (this.originPrice * (100 - this.sale)) / 100;
            return salePrice;
        };
        return product;
    };

    productService.createFromObject = function(rawProduct) {
        var product = new Object();
        product.id = rawProduct.id;
        product.thumb = rawProduct.thumb;
        product.title = rawProduct.title;
        product.originPrice = rawProduct.originPrice;
        product.sale = rawProduct.sale;

        product.salePrice = function() {
            var salePrice = (this.originPrice * (100 - this.sale)) / 100;
            return salePrice;
        };
        return product;
    };

    productService.toHomeHtmlItem = function(product) {
        var html = "";
        html += '<div class="product-item">';
        html += '<div class="product-item-thumb">';
        html += '    <img src="' + product.thumb + '"';
        html += '             alt="" srcset="">';
        html += "     </div>";
        html += '     <h1 class="product-item-title">' + product.title + "</h1>";
        html += '     <div class="product-item-price">';
        html +=
            '         <span class="product-item-price-origin">' +
            product.originPrice +
            " đ</span>";
        html +=
            '         <span class="product-item-price-sale">' +
            product.salePrice() +
            " đ</span>";
        html += "     </div>";
        html +=
            '     <button onclick="addToCart(' +
            product.id +
            ')" class="btn btn-primary">Đưa vào giỏ</button>';
        html += " </div>";
        return html;
    };

    productService.toHomeHtmlItems = function(products = []) {
        var html = '<div class="product-items">';
        for (var i = 0; i < products.length; i++) {
            html += this.toHomeHtmlItem(products[i]);
        }
        html += "</div>";
        return html;
    };

    productService.getAll = function() {
        var products = new Array();
        var iphone5 = this.create(
            1,
            "https://cdn.tgdd.vn/Products/Images/42/60546/iphone-5s-16gb-7-400x460.png",
            "Iphone 5",
            5000000,
            20
        );
        var iphone6 = this.create(
            2,
            "https://cdn.tgdd.vn/Products/Images/42/92962/iphone-6-32gb-gold-hh-600x600-600x600-600x600.jpg",
            "Iphone 6",
            7000000,
            20
        );
        var iphone7 = this.create(
            3,
            "https://cdn.nguyenkimmall.com/images/detailed/554/dien-thoai-iphone-7-black-32gb-02_3bjd-ic.jpg",
            "Iphone 7",
            10000000,
            20
        );
        var iphone8 = this.create(
            4,
            "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1923694765.jpeg",
            "Iphone 8",
            12000000,
            20
        );
        var iphoneX = this.create(
            5,
            "https://images.fpt.shop/unsafe/fit-in/465x465/filters:quality(90):fill(white)/cdn.fptshop.com.vn/Uploads/Originals/2017/12/8/636483219613202713_3.jpg",
            "iPhoneX",
            20000000,
            30
        );
        for (var i = 0; i < 10; i++) {
            var itemIphone5 = this.create(
                iphone5.id,
                iphone5.thumb,
                iphone5.title,
                iphone5.originPrice,
                iphone5.sale
            );
            var itemIphone6 = this.create(
                iphone6.id,
                iphone6.thumb,
                iphone6.title,
                iphone6.originPrice,
                iphone6.sale
            );
            var itemIphone7 = this.create(
                iphone7.id,
                iphone7.thumb,
                iphone7.title,
                iphone7.originPrice,
                iphone7.sale
            );
            var itemIphone8 = this.create(
                iphone8.id,
                iphone8.thumb,
                iphone8.title,
                iphone8.originPrice,
                iphone8.sale
            );
            var itemIphoneX = this.create(
                iphoneX.id,
                iphoneX.thumb,
                iphoneX.title,
                iphoneX.originPrice,
                iphoneX.sale
            );

            itemIphone5.id = itemIphone5.id + i * 5;
            itemIphone6.id = itemIphone6.id + i * 5;
            itemIphone7.id = itemIphone7.id + i * 5;
            itemIphone8.id = itemIphone8.id + i * 5;
            itemIphoneX.id = itemIphoneX.id + i * 5;

            products.push(itemIphone5);
            products.push(itemIphone6);
            products.push(itemIphone7);
            products.push(itemIphone8);
            products.push(itemIphoneX);
        }
        console.log(products);
        return products;
    };

    productService.getById = function(id) {
        var products = this.getAll();
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == id) return products[i];
        }
        return null;
    };

    return productService;
}