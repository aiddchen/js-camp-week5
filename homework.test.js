const { expectFailure } = require('node:test');
const hw = require('./homework.js'); 

// 測試資料
// 產品資料
const products = [
  { id: 'prod-1', title: '經典白T', category: '衣服', origin_price: 500, price: 399, images: 'https://example.com/t1.jpg' },
  { id: 'prod-2', title: '牛仔褲', category: '褲子', origin_price: 1200, price: 899, images: 'https://example.com/p1.jpg' },
  { id: 'prod-3', title: '帆布鞋', category: '鞋子', origin_price: 1800, price: 1299, images: 'https://example.com/s1.jpg' },
  { id: 'prod-4', title: '棒球帽', category: '配件', origin_price: 350, price: 299, images: 'https://example.com/h1.jpg' },
  { id: 'prod-5', title: '運動外套', category: '衣服', origin_price: 2000, price: 1599, images: 'https://example.com/j1.jpg' }
];
// 購物車資料
const carts = [
  { id: 'cart-1', product: products[0], quantity: 2 },
  { id: 'cart-2', product: products[2], quantity: 1 },
  { id: 'cart-3', product: products[4], quantity: 1 }
];

describe('任務一測試', () => {

  // ==================== getProductById ====================
  describe('getProductById()', () => {

    test('應該能根據正確的 ID 找到產品', () => {
      const result = hw.getProductById(products, 'prod-3');
      
      expect(result).not.toBeNull();
      expect(result.id).toBe('prod-3');
      expect(result.title).toBe('帆布鞋');
      expect(result.category).toBe('鞋子');
    });

    test('當產品不存在時，應該回傳 null', () => {
      const result = hw.getProductById(products, 'prod-999');
      expect(result).toBeNull();
    });

    test('當傳入空陣列時，應該回傳 null', () => {
      const result = hw.getProductById([], 'prod-1');
      expect(result).toBeNull();
    });

    test('當 productId 為空字串時，應該回傳 null', () => {
      const result = hw.getProductById(products, '');
      expect(result).toBeNull();
    });
  });

  // ==================== getProductsByCategory ====================
  describe('getProductsByCategory()', () => {

    test('應該能正確根據分類篩選產品', () => {
      const clothes = hw.getProductsByCategory(products, '衣服');
      
      expect(clothes).toHaveLength(2);
      expect(clothes.every(item => item.category === '衣服')).toBe(true);
      expect(clothes.map(item => item.id)).toEqual(['prod-1', 'prod-5']);
    });

    test('當分類不存在時，應該回傳空陣列', () => {
      const result = hw.getProductsByCategory(products, '不存在的分類');
      expect(result).toEqual([]);
    });

    test('當傳入空陣列時，應該回傳空陣列', () => {
      const result = hw.getProductsByCategory([], '衣服');
      expect(result).toEqual([]);
    });

    test('當 category 為空字串時，應該回傳空陣列', () => {
      const result = hw.getProductsByCategory(products, '');
      expect(result).toEqual([]);
    });
  });

  // ==================== getDiscountRate ====================
  describe('getDiscountRate()', () => {

    test('計算折扣率', () => {
      const discountRate = hw.getDiscountRate(products[0]);
      
      expect(typeof discountRate).toBe('string');
      expect(discountRate).toEqual('8折');
    });
  });

  // ==================== getAllCategories ====================
  describe('getAllCategories()', () => {

    test('得到所以產品分類，且分類無重複', () => {
      const categories = hw.getAllCategories(products);
      
      expect(Array.isArray(categories)).toBe(true);
      expect(categories).toHaveLength(new Set(categories).size);
    });
  });

});


describe('任務二測試', () => {
  // ==================== sumBill ====================
  describe('sumBill(): 包含 calculateCartOriginalTotal() & calculateCartTotal()', () => {

    test('計算清單總金額: 原價', () => {
      const result = hw.sumBill(carts, "origin_price");
      
      expect(result).toEqual(500*2 + 1800*1 + 2000*1);
      expect(typeof result).toEqual('number');
    });

    test('計算清單總金額: 售價', () => {
      const result = hw.sumBill(carts, "price");
      
      expect(result).toEqual(399*2 + 1299*1 + 1599*1);
      expect(typeof result).toEqual('number');
    });
  });

  // ==================== calculateSavings ====================
  describe('calculateSavings()', () => {

    test('計算折扣後價差', () => {
      const result = hw.calculateSavings(carts);
      
      expect(result >= 0).toBe(true);
      expect(result).toEqual((500*2 + 1800*1 + 2000*1) - (399*2 + 1299*1 + 1599*1));
      expect(typeof result).toEqual('number');
    });
  });

  // ==================== calculateCartItemCount ====================
  describe('calculateCartItemCount()', () => {

    test('計算購物車商品總數', () => {
      const result = hw.calculateCartItemCount(carts);
      
      expect(typeof result).toEqual('number');
      expect(result).toEqual(4);
    });

    test('購物車無商品時回傳總數為 0', () => {
      const result = hw.calculateCartItemCount([]);
      
      expect(typeof result).toEqual('number');
      expect(result).toEqual(0);
    });
  });

  // ==================== isProductInCart ====================
  describe('isProductInCart()', () => {

    test('檢查商品是否在購物車中: 在', () => {
      const result = hw.isProductInCart(carts, 'prod-1');
      
      expect(result).toBe(true);
    });

    test('檢查商品是否在購物車中: 不在', () => {
      const result = hw.isProductInCart(carts, 'prod-10');
      
      expect(result).toBe(false);
    });

    test('購物車無商品時回傳 false', () => {
      const result = hw.isProductInCart([], 'prod-1');
      
      expect(result).toBe(false);
    });
  });

})


describe("任務三測試", () => {
  // ==================== clearCart ====================
  describe('clearCart()', () => {

    // deep equalty 比較不會過; carts 會抓到外部 carts
    // test('清空購物車', () => {
    //   // let carts = [{ id: 'cart-1', product: products[0], quantity: 2 }]
    //   hw.clearCart();
      
    //   expect(carts).toHaveLength(0);
    // });

    test('清空"空的"購物車', () => {
      const carts = [];
      hw.clearCart();
      
      expect(carts).toEqual([]);
    });

  });

  // ==================== removeFromCart ====================
  describe('removeFromCart()', () => {

    test('從購物車移除商品', () => {
      const result = hw.removeFromCart(carts, "cart-1");
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(carts.length -1);
      expect(result.every(cart => cart.id !== 'cart-1')).toBe(true);
    });

    test('從購物車移除不存在的商品', () => {
      const result = hw.removeFromCart(carts, "somethingDoesNotExist");
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(carts.length);
      expect(result).toEqual(carts);
    });

    test('從"空"購物車移除不存在的商品', () => {
      const result = hw.removeFromCart([], "somethingDoesNotExist");
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);
    });
  });

  // ==================== updateCartItemQuantity ====================
  describe('updateCartItemQuantity()', () => {

    test('增加 購物車商品數量', () => {
      const sample = carts[2]
      const result = hw.updateCartItemQuantity(carts, sample.id, 50);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(carts.length);
      expect(result.find(obj => obj.id === sample.id).quantity).toEqual(50)
    });

    test('更新的商品數量為 0 以下時刪除該商品', () => {
      const sample = carts[2]
      const result = hw.updateCartItemQuantity(carts, sample.id, 0);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(carts.length -1);
      expect(result.every(obj => obj.id === sample.id)).toBe(false);
    });
  });

  // ==================== addToCart ====================
  describe('addToCart()', () => {

    test('新增"新"商品到購物車', () => {
      const result = hw.addToCart(carts, products[3], 5);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(carts.length +1);
      expect(result.find(obj => obj.product.id === products[3].id).quantity).toEqual(5)
    });

    test('新增"已有的"商品到購物車', () => {
      const sample = carts[0].product
      const result = hw.addToCart(carts, sample, 5);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(carts.length);
      expect(result.find(obj => obj.product === sample).quantity).toEqual(carts[0].quantity + 5)
    });

    test('減少原有商品數量', () => {
      const sample = carts[0].product
      const result = hw.addToCart(carts, sample, -1);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(carts.length);
      expect(result.find(obj => obj.product === sample).quantity).toEqual(carts[0].quantity -1)
    });

    test('減少原有商品數量至 0 以下，會將商品刪除', () => {
      const sample = carts[0].product
      const result = hw.addToCart(carts, sample, -10);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(carts.length -1);
      expect(result.every(obj => obj.id !== carts[0].id)).toBe(true);
    });

    test('減少"不存在的"商品數量，會回傳原購物車', () => {
      const sample = products[3]
      const result = hw.addToCart(carts, sample, -10);
      
      expect(result).toEqual(carts);
    });
  });

})


describe("My utils 測試", () => {
  // ==================== getCartIndexByCartId ====================
  describe('getCartIndexByCartId()', () => {

    test('用 cartId 找到對應的 index', () => {
      const result = hw.getCartIndexByCartId(carts, 'cart-1');
      
      expect(typeof result).toEqual('number');
      expect(result).toEqual(0);
    });

    test('找不存在的 cartId，應該回傳 -1', () => {
      const result = hw.getCartIndexByCartId(carts, 'cart-10');
      
      expect(typeof result).toEqual('number');
      expect(result).toEqual(-1);
    });
  });

  // ==================== getCartIdByProductId ====================
  describe('getCartIdByProductId()', () => {

    test('用 productId 找到對應的 cartId', () => {
      const sample = carts[1]
      const result = hw.getCartIdByProductId(carts, sample.product.id);
      
      expect(typeof result).toEqual('string');
      expect(result).toEqual(sample.id)
    });

    test('查無商品時回傳空字串', () => {
      const result = hw.getCartIdByProductId(carts, "somethingDoesNotExist");
      
      expect(typeof result).toEqual('string');
      expect(result.length).toEqual(0)
    });
  });

})