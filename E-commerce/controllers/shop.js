const Product = require('../models/product');
const Category = require('../models/category');
const product = require('../models/product');

exports.getIndex = (req, res, next) => {
    
    Product.find()
        .then(products=>{
            return products;
        })
        .then(products=>{
            Category.find()
                .then(categories=>{
                    res.render('shop/index', {
                        title: 'Shopping',
                        products: products,
                        path: '/',
                        categories:categories
                    });   
                })
        })
        .catch((err)=>{console.log(err)});
    
}

exports.getProducts = (req, res, next) => {
    
    Product.find()
    .then(products=>{
        return products;    
    })
    .then(products=>{
        Category.find()
        .then(categories=>{
            res.render('shop/products', {
                title: 'Products',
                products: products,
                path: '/',
                categories:categories
            });   
        })   
    })
    .catch((err)=>{console.log(err)});
}

exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid=req.params.categoryid;
    const model=[];
    Category.find()
        .then(categories=>{
            model.categories=categories;
            return Product.find({
                categories:categoryid
            })
        })
        .then(products=>{
            res.render('shop/products', {
                title: 'Products',
                products: products,
                categories:model.categories,
                selectedCategory:categoryid,
                path: '/products'
            });
        })
        .catch((err)=>{console.log(err)});

    
}

exports.getProduct = (req, res, next) => {
    
    Product.findById(req.params.productid)
    .then((product)=>{
        res.render("shop/product-detail",{
            title:product.name,
            product:product,
            path:'/products'
        })
    })
    .catch((err)=>{console.log(err)});
    
    
    /*Product.findByPk(req.params.productid)
        .then((product)=>{
            res.render("shop/product-detail",{
                title:product.name,
                product:product,
                path:'/products'
            })
        })
        .catch((err)=>{console.log(err)});
        */
    
    
}



exports.getCart = (req, res, next) => {
   
    req.user.getCart()
        .then(products=>{
            res.render('shop/cart', {
                title: 'Cart',
                path: '/cart',
                products:products
            }); 
        })
        .catch(err=>{console.log(err)}) 
}

exports.postCart = (req, res, next) => {
    const productId=req.body.productId;
    Product.findById(productId)
        .then(product=>{
            return req.user.addToCart(product)
        })
        .then(()=>{
            res.redirect('/cart')
        })
        .catch(err=>{console.log(err)})
}

exports.postCartItemDelete = (req, res, next) => {
    const productid=req.body.productid;
    req.user
        .deleteCartItem(productid)
        .then(()=>{
            res.redirect('/cart');
        })

    
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders() 
        .then(orders=>{
            res.render('shop/orders', {
                title: 'Orders',
                path: '/orders',
                orders:orders
            });
        })
        .catch(err=>{console.log(err)})

    
}
exports.postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(()=>{
            res.redirect('/cart')
        })
        .catch(err=>{console.log(err)})
}

