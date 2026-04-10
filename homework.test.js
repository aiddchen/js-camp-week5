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
  describe('sumBill()', () => {

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
