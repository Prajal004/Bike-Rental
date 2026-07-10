import 'package:flutter/material.dart';

class BookingSummaryScreen extends StatelessWidget {
  final Map<String, dynamic> bookingData;

  const BookingSummaryScreen({super.key, required this.bookingData});

  @override
  Widget build(BuildContext context) {
    final bike = bookingData['bike'] ?? {};
    final location = bookingData['location'] ?? {};
    final duration = bookingData['duration'] ?? {};

    return Scaffold(
      appBar: AppBar(
        title: const Text('Booking Summary'),
        backgroundColor: const Color(0xFF1A394F),
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSection('Bike Details', [
              _buildDetailRow('Name', bike['name'] ?? 'N/A'),
              _buildDetailRow('Brand', bike['brand'] ?? 'N/A'),
              _buildDetailRow('Price', 'Rs ${bike['price'] ?? 0}/day'),
            ]),
            const SizedBox(height: 16),
            _buildSection('Location', [
              _buildDetailRow('Pickup', location['pickup']?['district'] ?? 'N/A'),
              _buildDetailRow('Return', location['return']?['district'] ?? 'N/A'),
            ]),
            const SizedBox(height: 16),
            _buildSection('Duration', [
              _buildDetailRow('Start', duration['start'] ?? 'N/A'),
              _buildDetailRow('End', duration['end'] ?? 'N/A'),
              _buildDetailRow('Days', '${duration['days'] ?? 0} days'),
              _buildDetailRow(
                'Total Price',
                'Rs ${duration['totalPrice'] ?? 0}',
                isTotal: true,
              ),
            ]),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/payment');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1A394F),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: const Text(
                  'Proceed to Payment',
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

  Widget _buildSection(String title, List<Widget> children) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Color(0xFF1A394F),
            ),
          ),
          const SizedBox(height: 8),
          ...children,
        ],
      ),
    );
  }

  Widget _buildDetailRow(String label, String value, {bool isTotal = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: isTotal ? 16 : 14,
              fontWeight: isTotal ? FontWeight.bold : FontWeight.normal,
            ),
          ),
          Text(
            value,
            style: TextStyle(
              fontSize: isTotal ? 16 : 14,
              fontWeight: isTotal ? FontWeight.bold : FontWeight.normal,
              color: isTotal ? const Color(0xFF1A394F) : Colors.black,
            ),
          ),
        ],
      ),
    );
  }
}
