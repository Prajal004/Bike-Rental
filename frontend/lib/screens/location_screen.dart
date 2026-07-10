import 'package:flutter/material.dart';

class LocationScreen extends StatefulWidget {
  const LocationScreen({super.key});

  @override
  State<LocationScreen> createState() => _LocationScreenState();
}

class _LocationScreenState extends State<LocationScreen> {
  String? _selectedPickupDistrict;
  String? _selectedReturnDistrict;
  String? _pickupAddress;
  String? _returnAddress;

  final List<String> _districts = [
    'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Kaski',
    'Chitwan', 'Parsa', 'Bara', 'Rautahat', 'Sarlahi',
    'Mahottari', 'Dhanusha', 'Siraha', 'Saptari', 'Sunsari',
    'Morang', 'Jhapa', 'Ilam', 'Panchthar', 'Taplejung',
    'Sankhuwasabha', 'Solukhumbu', 'Okhaldhunga', 'Khotang',
    'Bhojpur', 'Dhankuta', 'Tehrathum', 'Udayapur', 'Sindhuli',
    'Ramechhap', 'Dolakha', 'Sindhupalchok', 'Kavrepalanchok',
    'Nuwakot', 'Rasuwa', 'Dhading', 'Makwanpur', 'Gorkha',
    'Lamjung', 'Tanahun', 'Syangja', 'Parbat', 'Baglung',
    'Myagdi', 'Mustang', 'Manang', 'Gulmi', 'Arghakhanchi',
    'Palpa', 'Rupandehi', 'Kapilvastu', 'Nawalparasi',
    'Rukum', 'Rolpa', 'Salyan', 'Dang', 'Banke',
    'Bardiya', 'Surkhet', 'Dailekh', 'Jajarkot', 'Dolpa',
    'Humla', 'Jumla', 'Kalikot', 'Mugu', 'Bajura',
    'Bajhang', 'Achham', 'Doti', 'Kailali', 'Kanchanpur',
    'Dadeldhura', 'Baitadi', 'Darchula'
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Location'),
        backgroundColor: const Color(0xFF1A394F),
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Pickup Location',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1A394F),
              ),
            ),
            const SizedBox(height: 8),
            _buildDistrictDropdown(
              label: 'Select Pickup District',
              value: _selectedPickupDistrict,
              onChanged: (value) {
                setState(() {
                  _selectedPickupDistrict = value;
                });
              },
            ),
            const SizedBox(height: 8),
            TextField(
              decoration: InputDecoration(
                labelText: 'Pickup Address',
                hintText: 'Enter full address',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onChanged: (value) {
                setState(() {
                  _pickupAddress = value;
                });
              },
            ),
            const SizedBox(height: 24),
            const Text(
              'Return Location',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1A394F),
              ),
            ),
            const SizedBox(height: 8),
            _buildDistrictDropdown(
              label: 'Select Return District',
              value: _selectedReturnDistrict,
              onChanged: (value) {
                setState(() {
                  _selectedReturnDistrict = value;
                });
              },
            ),
            const SizedBox(height: 8),
            TextField(
              decoration: InputDecoration(
                labelText: 'Return Address',
                hintText: 'Enter full address',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onChanged: (value) {
                setState(() {
                  _returnAddress = value;
                });
              },
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  if (_selectedPickupDistrict == null ||
                      _selectedReturnDistrict == null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Please select both locations'),
                        backgroundColor: Colors.red,
                      ),
                    );
                    return;
                  }
                  Navigator.pop(context, {
                    'pickup': {
                      'district': _selectedPickupDistrict,
                      'address': _pickupAddress,
                    },
                    'return': {
                      'district': _selectedReturnDistrict,
                      'address': _returnAddress,
                    },
                  });
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1A394F),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: const Text(
                  'Confirm Location',
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

  Widget _buildDistrictDropdown({
    required String label,
    required String? value,
    required ValueChanged<String?> onChanged,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        borderRadius: BorderRadius.circular(12),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: value,
          hint: Text(label),
          isExpanded: true,
          items: _districts.map((district) {
            return DropdownMenuItem(
              value: district,
              child: Text(district),
            );
          }).toList(),
          onChanged: onChanged,
        ),
      ),
    );
  }
}
