function CartService() {
    var cartService = new Object();
    cartService.create = function(product, numProduct) {
        var cart = new Object();
        cart.product = product;
        cart.id = product.id;
        cart.numProduct = numProduct;
        return cart;
    };

    cartService.getAll = function() {
        var jsonCarts = localStorage.getItem("carts");
        var carts = new Array();
        if (jsonCarts != null) carts = JSON.parse(jsonCarts);

        if (carts == null) carts = new Array();

        for (var i = 0; i < carts.length; i++) {
            var product = ProductService().createFromObject(carts[i].product);
            carts[i].product = product;
        }
        return carts;
    };

    cartService.remove = function(cartId) {
        var carts = this.getAll();
        var removedCarts = new Array();
        for (var i = 0; i < carts.length; i++) {
            var cart = carts[i];
            if (cart.id != cartId) {
                removedCarts.push(cart);
            }
        }
        this.updateToLocaStorage(removedCarts);
        return removedCarts;
    };

    cartService.updateToLocaStorage = function(carts) {
        localStorage.setItem("carts", JSON.stringify(carts));
        return carts;
    };

    cartService.add = function(product, numProduct) {
        var carts = this.getAll();
        var isExist = false;
        for (var i = 0; i < carts.length; i++) {
            var cart = carts[i];
            if (
                cart.product != null &&
                cart.product.id != null &&
                cart.product.id == product.id
            ) {
                carts[i].numProduct = cart.numProduct + numProduct;
                isExist = true;
            }
        }
        if (!isExist) {
            var cart = this.create(product, numProduct);
            carts.push(cart);
        }
        this.updateToLocaStorage(carts);
        return carts;
    };

    cartService.toHtmlItem = function(cart) {
        var html = "";
        html += '<div class="cart-item">';
        html +=
            '    <div class="cart-item-thumb"><img src="' +
            cart.product.thumb +
            '" alt="" srcset=""></div>';
        html +=
            '    <span class="cart-item-title">' + cart.product.title + "</span>";
        html += '    <div class="cart-item-price">';
        html +=
            '        <span class="cart-item-price-origin">' +
            cart.product.originPrice +
            "đ</span>";
        html +=
            '        <span class="cart-item-price-sale">' +
            cart.product.salePrice() +
            " đ</span>";
        html += "    </div>";
        html += '    <div class="cart-item-action-add-quantity">';
        html +=
            '       <input value="' +
            cart.numProduct +
            '" type="number" name="quantity" id="quantity">';
        html += "    </div>";
        html +=
            '    <span class="cart-item-price-sum">' +
            cart.product.salePrice() * cart.numProduct +
            " đ</span>";
        html +=
            '    <div class="cart-item-action-delete"><i onclick="removeFromCart(' +
            cart.id +
            ')" class="fas fa-trash"></i></div>';
        html += "</div>";
        return html;
    };

    cartService.toHtmlItems = function(carts = []) {
        var html = '<div class="cart-items">';
        for (var i = 0; i < carts.length; i++) {
            html += this.toHtmlItem(carts[i]);
        }
        html += "</div>";
        return html;
    };
    return cartService;
}