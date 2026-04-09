// ========================================
// 第五週作業：電商資料處理系統
// ========================================

// ========== 提供的資料結構 ==========

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

// 訂單資料
const orders = [
  {
    id: 'order-1',
    createdAt: 1704067200, // Unix timestamp
    paid: false,
    total: 2097,
    user: { name: '王小明', tel: '0912345678', email: 'ming@example.com', address: '台北市信義區', payment: 'ATM' },
    products: [
      { ...products[0], quantity: 2 },
      { ...products[2], quantity: 1 }
    ]
  },
  {
    id: 'order-2',
    createdAt: 1704153600,
    paid: true,
    total: 899,
    user: { name: '李小華', tel: '0923456789', email: 'hua@example.com', address: '台中市西區', payment: 'Credit Card' },
    products: [
      { ...products[1], quantity: 1 }
    ]
  }
];

// ========================================
// 任務一：產品查詢模組 (基礎)
// ========================================

/**
 * 1. 根據 ID 查詢產品
 * @param {Array} products - 產品陣列
 * @param {string} productId - 產品 ID
 * @returns {Object|null} - 回傳產品物件，找不到回傳 null
 */
function getProductById(products, productId) {
  return products.find(obj => obj.id === productId)
}

/**
 * 2. 根據分類篩選產品
 * @param {Array} products - 產品陣列
 * @param {string} category - 分類名稱
 * @returns {Array} - 回傳符合分類的產品陣列，若 category 為 '全部' 則回傳全部產品
 */
function getProductsByCategory(products, category) {
  return products.filter(obj => obj.category === category)
}

/**
 * 3. 計算產品折扣率
 * @param {Object} product - 產品物件
 * @returns {string} - 回傳折扣百分比，例如 '8折' 或 '79折'
 * 計算方式：Math.round((price / origin_price) * 100) / 10
 */
function getDiscountRate(product) {
  return `${Math.round((product.price / product.origin_price) * 100) / 10}折`
}

/**
 * 4. 取得所有產品分類（不重複）
 * @param {Array} products - 產品陣列
 * @returns {Array} - 回傳分類陣列，例如 ['衣服', '褲子', '鞋子', '配件']
 */
function getAllCategories(products) {
  return [...new Set(products.map(v => v.category))]
}

// ========================================
// 任務二：購物車計算模組 (中階)
// ========================================

// 計算金額
function calculateTotal(carts, priceType) {
  return carts.reduce(function(sum, v) {
    return sum + v.product[priceType] * v.quantity
  }, 0)
}

/**
 * 1. 計算購物車原價總金額
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳數字（原價 × 數量 的總和）
 */
function calculateCartOriginalTotal(carts) {
  return calculateTotal(carts, "origin_price")
}

/**
 * 2. 計算購物車售價總金額
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳數字（售價 × 數量 的總和）
 */
function calculateCartTotal(carts) {
  return calculateTotal(carts, "price")
}

/**
 * 3. 計算總共省下多少錢
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳原價總金額 - 售價總金額
 */
function calculateSavings(carts) {
  return calculateCartOriginalTotal(carts) - calculateCartTotal(carts)
}

/**
 * 4. 計算購物車商品總數量
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳所有商品的 quantity 總和
 */
function calculateCartItemCount(carts) {
  return carts.reduce((sum, obj) => sum + obj.quantity, 0)
}

/**
 * 5. 檢查產品是否已在購物車中
 * @param {Array} carts - 購物車陣列
 * @param {string} productId - 產品 ID
 * @returns {boolean} - 回傳 true 或 false
 */
function isProductInCart(carts, productId) {
  return carts.find(obj => obj.product.id === productId)? true:false
}

// ========================================
// 任務三：購物車操作模組 (進階)
// ========================================

/**
 * 1. 新增商品到購物車
 * @param {Array} carts - 購物車陣列
 * @param {Object} product - 產品物件
 * @param {number} quantity - 數量
 * @returns {Array} - 回傳新的購物車陣列（不要修改原陣列）
 * 如果產品已存在，合併數量；如果不存在，新增一筆
 */
function addToCart(carts, product, quantity) {
  // 請實作此函式
}

/**
 * 2. 更新購物車商品數量
 * @param {Array} carts - 購物車陣列
 * @param {string} cartId - 購物車項目 ID
 * @param {number} newQuantity - 新數量
 * @returns {Array} - 回傳新的購物車陣列，如果 newQuantity <= 0，移除該商品
 */
function updateCartItemQuantity(carts, cartId, newQuantity) {
  // 請實作此函式
}

/**
 * 3. 從購物車移除商品
 * @param {Array} carts - 購物車陣列
 * @param {string} cartId - 購物車項目 ID
 * @returns {Array} - 回傳移除後的新購物車陣列
 */
function removeFromCart(carts, cartId) {
  // 請實作此函式
}

/**
 * 4. 清空購物車
 * @returns {Array} - 回傳空陣列
 */
function clearCart() {
  // 請實作此函式
}

// ========================================
// 任務四：訂單統計模組 (挑戰)
// ========================================

/**
 * 1. 計算訂單總營收
 * @param {Array} orders - 訂單陣列
 * @returns {number} - 只計算已付款 (paid: true) 的訂單
 */
function calculateTotalRevenue(orders) {
  // 請實作此函式
}

/**
 * 2. 篩選訂單狀態
 * @param {Array} orders - 訂單陣列
 * @param {boolean} isPaid - true 回傳已付款訂單，false 回傳未付款訂單
 * @returns {Array} - 回傳篩選後的訂單陣列
 */
function filterOrdersByStatus(orders, isPaid) {
  // 請實作此函式
}

/**
 * 3. 產生訂單統計報表
 * @param {Array} orders - 訂單陣列
 * @returns {Object} - 回傳格式：
 * {
 *   totalOrders: 2,
 *   paidOrders: 1,
 *   unpaidOrders: 1,
 *   totalRevenue: 899,
 *   averageOrderValue: 1498  // 所有訂單平均金額
 * }
 */
function generateOrderReport(orders) {
  // 請實作此函式
}

/**
 * 4. 依付款方式統計
 * @param {Array} orders - 訂單陣列
 * @returns {Object} - 回傳格式：
 * {
 *   'ATM': [order1],
 *   'Credit Card': [order2]
 * }
 */
function groupOrdersByPayment(orders) {
  // 請實作此函式
}

// ========================================
// 測試區域（可自行修改測試）
// ========================================

// 任務一測試
console.log('=== 任務一測試 ===');
console.log('getProductById:', getProductById(products, 'prod-1'));
console.log('getProductsByCategory:', getProductsByCategory(products, '衣服'));
console.log('getDiscountRate:', getDiscountRate(products[0]));
console.log('getAllCategories:', getAllCategories(products));

// 任務二測試
console.log('\n=== 任務二測試 ===');
console.log('calculateCartOriginalTotal:', calculateCartOriginalTotal(carts));
console.log('calculateCartTotal:', calculateCartTotal(carts));
console.log('calculateSavings:', calculateSavings(carts));
console.log('calculateCartItemCount:', calculateCartItemCount(carts));
console.log('isProductInCart:', isProductInCart(carts, 'prod-1'));

// 任務三測試
console.log('\n=== 任務三測試 ===');
console.log('addToCart:', addToCart(carts, products[1], 2));
console.log('updateCartItemQuantity:', updateCartItemQuantity(carts, 'cart-1', 5));
console.log('removeFromCart:', removeFromCart(carts, 'cart-1'));
console.log('clearCart:', clearCart());

// 任務四測試
console.log('\n=== 任務四測試 ===');
console.log('calculateTotalRevenue:', calculateTotalRevenue(orders));
console.log('filterOrdersByStatus:', filterOrdersByStatus(orders, true));
console.log('generateOrderReport:', generateOrderReport(orders));
console.log('groupOrdersByPayment:', groupOrdersByPayment(orders));

// ========================================
// 匯出函式供測試使用
// ========================================
module.exports = {
  getProductById,
  getProductsByCategory,
  getDiscountRate,
  getAllCategories,
  calculateCartOriginalTotal,
  calculateCartTotal,
  calculateSavings,
  calculateCartItemCount,
  isProductInCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  calculateTotalRevenue,
  filterOrdersByStatus,
  generateOrderReport,
  groupOrdersByPayment
};
