import 'package:flutter/material.dart';

class PaymentScreen extends StatefulWidget {
  const PaymentScreen({super.key});

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  String _selectedMethod = 'esewa';
  bool _isLoading = false;

  final List<Map<String, dynamic>> _paymentMethods = [
    {'id': 'esewa', 'name': 'eSewa', 'icon': Icons.wallet, 'color': Colors.green},
    {'id': 'khalti', 'name': 'Khalti', 'icon': Icons.account_balance_wallet, 'color': Colors.purple},
    {'id': 'fonepay', 'name': 'Fonepay QR', 'icon': Icons.qr_code_scanner, 'color': Colors.blue},
    {'id': 'cash', 'name': 'Cash on Pickup', 'icon': Icons.money, 'color': Colors.orange},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Payment'),
        backgroundColor: const Color(0xFF1A394F),
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Select Payment Method',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1A394F),
              ),
            ),
            const SizedBox(height: 16),
            ..._paymentMethods.map((method) => _buildPaymentOption(method)),
            const Spacer(),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade300),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Total Payment',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'Rs 300',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: const Color(0xFF1A394F),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: _isLoading ? null : _processPayment,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1A394F),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: _isLoading
                    ? const CircularProgressIndicator(color: Colors.white)
                    : const Text(
                        'Pay Now',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPaymentOption(Map<String, dynamic> method) {
    final isSelected = _selectedMethod == method['id'];
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedMethod = method['id'];
        });
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected ? Colors.blue.shade50 : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? const Color(0xFF1A394F) : Colors.grey.shade300,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: method['color'].withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(
                method['icon'],
                color: method['color'],
                size: 28,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                method['name'],
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Radio(
              value: method['id'],
              groupValue: _selectedMethod,
              onChanged: (value) {
                setState(() {
                  _selectedMethod = value as String;
                });
              },
              activeColor: const Color(0xFF1A394F),
            ),
          ],
        ),
      ),
    );
  }

  void _processPayment() async {
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(seconds: 2));
    setState(() => _isLoading = false);
    
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Payment Successful! 🎉'),
        backgroundColor: Colors.green,
      ),
    );
    
    Navigator.pushNamed(context, '/confirmation');
  }
}
