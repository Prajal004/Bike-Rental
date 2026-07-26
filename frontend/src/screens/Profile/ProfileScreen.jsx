// Add this in menu section

{/* Customer Verification */}
<TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('VerifyCustomer')}>
  <Text style={styles.menuIcon}>📄</Text>
  <Text style={styles.menuText}>Customer Verification</Text>
  <Text style={styles.menuArrow}>›</Text>
</TouchableOpacity>

{/* Shop Owner Verification */}
{isShopOwner && (
  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('VerifyShop')}>
    <Text style={styles.menuIcon}>🏪</Text>
    <Text style={styles.menuText}>Shop Verification</Text>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
)}
