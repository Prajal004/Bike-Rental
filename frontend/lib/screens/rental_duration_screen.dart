import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class RentalDurationScreen extends StatefulWidget {
  const RentalDurationScreen({super.key});

  @override
  State<RentalDurationScreen> createState() => _RentalDurationScreenState();
}

class _RentalDurationScreenState extends State<RentalDurationScreen> {
  DateTime? _startDate;
  DateTime? _endDate;
  int _days = 0;
  int _pricePerDay = 280;
  int _totalPrice = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Rental Duration'),
        backgroundColor: const Color(0xFF1A394F),
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Select Rental Duration',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1A394F),
              ),
            ),
            const SizedBox(height: 24),
            _buildDatePicker(
              label: 'Start Date',
              date: _startDate,
              onTap: () async {
                final picked = await showDatePicker(
                  context: context,
                  initialDate: DateTime.now(),
                  firstDate: DateTime.now(),
                  lastDate: DateTime.now().add(const Duration(days: 365)),
                );
                if (picked != null) {
                  setState(() {
                    _startDate = picked;
                    _calculateTotal();
                  });
                }
              },
            ),
            const SizedBox(height: 16),
            _buildDatePicker(
              label: 'End Date',
              date: _endDate,
              onTap: () async {
                if (_startDate == null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Please select start date first'),
                      backgroundColor: Colors.red,
                    ),
                  );
                  return;
                }
                final picked = await showDatePicker(
                  context: context,
                  initialDate: _startDate!.add(const Duration(days: 1)),
                  firstDate: _startDate!.add(const Duration(days: 1)),
                  lastDate: _startDate!.add(const Duration(days: 30)),
                );
                if (picked != null) {
                  setState(() {
                    _endDate = picked;
                    _calculateTotal();
                  });
                }
              },
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade300),
              ),
              child: Column(
                children: [
                  _buildSummaryRow('Duration', '$_days days'),
                  _buildSummaryRow('Price per day', 'Rs $_pricePerDay'),
                  const Divider(),
                  _buildSummaryRow(
                    'Total Price',
                    'Rs $_totalPrice',
                    isTotal: true,
                  ),
                ],
              ),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: _startDate != null && _endDate != null
                    ? () {
                        Navigator.pop(context, {
                          'startDate': _startDate,
                          'endDate': _endDate,
                          'days': _days,
                          'totalPrice': _totalPrice,
                        });
                      }
                    : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1A394F),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: const Text(
                  'Confirm Duration',
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

  Widget _buildDatePicker({
    required String label,
    required DateTime? date,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.shade300),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            const Icon(Icons.calendar_today, color: Color(0xFF1A394F)),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                date != null
                    ? DateFormat('MMM dd, yyyy').format(date)
                    : label,
                style: TextStyle(
                  fontSize: 16,
                  color: date != null ? Colors.black : Colors.grey.shade600,
                ),
              ),
            ),
            const Icon(Icons.arrow_forward_ios, size: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryRow(String label, String value, {bool isTotal = false}) {
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

  void _calculateTotal() {
    if (_startDate != null && _endDate != null) {
      final difference = _endDate!.difference(_startDate!).inDays;
      _days = difference > 0 ? difference : 0;
      _totalPrice = _days * _pricePerDay;
      setState(() {});
    }
  }
}
