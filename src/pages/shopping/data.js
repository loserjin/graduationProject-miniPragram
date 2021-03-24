// 饭堂id
// 饭堂名字
// 饭堂菜单:{
//     菜单id
//     菜单内容:[
//         {
//             分类id
//             分类名字
//             分类内容:[
//                 {
//                     菜id
//                     菜名
//                     价钱
//                     重量
//                     数量
//                 }
//             ]
//         }
//     ]
// }


const shoppingCart = {
    menuData: {
        "data":[{
            "floorId":"1",
            "floor":"一",
            "shop_name":"鸿园",
            "shop_menu":{
                "menu_id":"01",
                "category":[
                    {
                        "category_id":"001",
                        "category_name":"清淡饮食1",
                        "foods":[
                            {"food_id":1,"food_name":"炒鸡蛋","food_price":"4","food_weight":"400"},
                            {"food_id":2,"food_name":"炒鸡蛋","food_price":"4","food_weight":"400"},
                            {"food_id":3,"food_name":"炒鸡蛋","food_price":"4","food_weight":"400"},
                            {"food_id":4,"food_name":"炒鸡蛋","food_price":"4","food_weight":"400"},
                            {"food_id":5,"food_name":"炒鸡蛋","food_price":"4","food_weight":"400"},
                            {"food_id":6,"food_name":"炒鸡蛋","food_price":"4","food_weight":"400"},
                            {"food_id":7,"food_name":"炒鸡蛋","food_price":"4","food_weight":"400"},
                        ]
                    },
                    {
                        "category_id":"002",
                        "category_name":"北方风味2",
                        "foods":[
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                        ]
                    },
                    {
                        "category_id":"003",
                        "category_name":"南方风味3",
                        "foods":[
                            {"food_id":1,"food_name":"炒青菜","food_price":"6","food_weight":"600"},
                            {"food_id":1,"food_name":"炒青菜","food_price":"6","food_weight":"600"},
                            {"food_id":1,"food_name":"炒青菜","food_price":"6","food_weight":"600"},
                            {"food_id":1,"food_name":"炒青菜","food_price":"6","food_weight":"600"}
                        ]
                    },
                    {
                        "category_id":"004",
                        "category_name":"南方风味4",
                        "foods":[]
                    },
                    {
                        "category_id":"005",
                        "category_name":"南方风味5",
                        "foods":[]
                    },
                    {
                        "category_id":"6",
                        "category_name":"南方风味6",
                        "foods":[]
                    },
                    {
                        "category_id":"7",
                        "category_name":"南方风味7",
                        "foods":[]
                    },
                    {
                        "category_id":"8",
                        "category_name":"南方风味8",
                        "foods":[]
                    },
                    {
                        "category_id":"9",
                        "category_name":"南方风味9",
                        "foods":[]
                    },
                    {
                        "category_id":"10",
                        "category_name":"南方风味10",
                        "foods":[]
                    },
                    {
                        "category_id":"11",
                        "category_name":"南方风味",
                        "foods":[]
                    },
                    {
                        "category_id":"12",
                        "category_name":"南方风味",
                        "foods":[]
                    }
                    
                ]
            }
        },
        {
            "floorId":"2",
            "floor":"二",
            "shop_name":"鸿园",
            "shop_menu":{
                "menu_id":"01",
                "category":[
                    {
                        "category_id":"001",
                        "category_name":"清淡饮食1",
                        "foods":[
                            {"food_id":1,"food_name":"炒鸡蛋2","food_price":"4","food_weight":"400"},
                            {"food_id":2,"food_name":"炒鸡蛋2","food_price":"4","food_weight":"400"},
                            {"food_id":3,"food_name":"炒鸡蛋2","food_price":"4","food_weight":"400"},
                            {"food_id":4,"food_name":"炒鸡蛋2","food_price":"4","food_weight":"400"},
                            {"food_id":5,"food_name":"炒鸡蛋2","food_price":"4","food_weight":"400"},
                            {"food_id":6,"food_name":"炒鸡蛋2","food_price":"4","food_weight":"400"},
                            {"food_id":7,"food_name":"炒鸡蛋2","food_price":"4","food_weight":"400"},
                        ]
                    },
                    {
                        "category_id":"002",
                        "category_name":"北方风味2",
                        "foods":[
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                            {"food_id":1,"food_name":"炒面条","food_price":"5","food_weight":"500"},
                        ]
                    },
                    {
                        "category_id":"003",
                        "category_name":"南方风味3",
                        "foods":[
                            {"food_id":1,"food_name":"炒青菜","food_price":"6","food_weight":"600"},
                            {"food_id":1,"food_name":"炒青菜","food_price":"6","food_weight":"600"},
                            {"food_id":1,"food_name":"炒青菜","food_price":"6","food_weight":"600"},
                            {"food_id":1,"food_name":"炒青菜","food_price":"6","food_weight":"600"}
                        ]
                    },
                    {
                        "category_id":"004",
                        "category_name":"南方风味4",
                        "foods":[]
                    },
                    {
                        "category_id":"005",
                        "category_name":"南方风味5",
                        "foods":[]
                    },
                    {
                        "category_id":"6",
                        "category_name":"南方风味6",
                        "foods":[]
                    },
                    {
                        "category_id":"7",
                        "category_name":"南方风味7",
                        "foods":[]
                    },
                    {
                        "category_id":"8",
                        "category_name":"南方风味8",
                        "foods":[]
                    },
                    {
                        "category_id":"9",
                        "category_name":"南方风味9",
                        "foods":[]
                    },
                    {
                        "category_id":"10",
                        "category_name":"南方风味10",
                        "foods":[]
                    },
                    {
                        "category_id":"11",
                        "category_name":"南方风味",
                        "foods":[]
                    },
                    {
                        "category_id":"12",
                        "category_name":"南方风味",
                        "foods":[]
                    }
                    
                ]
            }
        }
    ],
        "code": 0,
        "msg": "成功"
    }
}

export {shoppingCart}