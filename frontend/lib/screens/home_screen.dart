import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/language_provider.dart';
import '../widgets/sos_button.dart';
import '../widgets/language_switch.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final languageProvider = Provider.of<LanguageProvider>(context);
    final isNepali = languageProvider.isNepali;

    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      body: SafeArea(
        child: Stack(
          children: [
            SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '🏠 Home',
                            style: const TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF1A394F),
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            isNepali ? 'नमस्ते, prajal' : 'Hello, prajal',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey.shade600,
                            ),
                          ),
                        ],
                      ),
                      const LanguageSwitch(),
                    ],
                  ),
                  const SizedBox(height: 20),
                  // Rent x4
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: [
                      _buildChip('🚲 Rent'),
                      _buildChip('🚲 Rent'),
                      _buildChip('🚲 Rent'),
                      _buildChip('🚲 Rent'),
                    ],
                  ),
                  const SizedBox(height: 20),
                  // prajal
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1A394F),
                      borderRadius: BorderRadius.circular(30),
                    ),
                    child: const Text(
                      'prajal 🚴‍♂️',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  // Bike Types
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: [
                      _buildChip('🚲 CityBike'),
                      _buildChip('⚡ E-Bike'),
                      _buildChip('⛰️ MTB'),
                      _buildChip('🏁 RoadBike'),
                      _buildChip('🛵 Scooty'),
                      _buildChip('🏍️ Cruiser'),
                      _buildChip('🐘 FatBike'),
                      _buildChip('🔄 Hybrid'),
                      _buildChip('🚵 Tour Bike'),
                    ],
                  ),
                  const SizedBox(height: 20),
                  _buildChip('🏠 Home'),
                  const SizedBox(height: 16),
                  // Service, BikeLock, Helmet
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: [
                      _buildChip('⚙️ Service'),
                      _buildChip('🔒 BikeLock'),
                      _buildChip('🪖 Helmet'),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // Bike, eBike
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: [
                      _buildChip('🚲 Bike'),
                      _buildChip('🛵 eBike'),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // Home x8
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: [
                      _buildChip('🏠 Home'),
                      _buildChip('🏠 Home'),
                      _buildChip('🏠 Home'),
                      _buildChip('🏠 Home'),
                      _buildChip('🏠 Home'),
                      _buildChip('🏠 Home'),
                      _buildChip('🏠 Home'),
                      _buildChip('🏠 Home'),
                    ],
                  ),
                  const SizedBox(height: 20),
                  // Hot Deals
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF1A394F), Color(0xFF2A5F8F)],
                      ),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          '🔥 Hot Deals',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: Colors.amber,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: const Text(
                            '⚡ 50% OFF',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF1A394F),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                  // Bottom Nav
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.1),
                          spreadRadius: 2,
                          blurRadius: 8,
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildNavItem('🏠', 'Home'),
                        _buildNavItem('🚲', 'Rent'),
                        _buildNavItem('📊', 'Rides'),
                        _buildNavItem('👤', 'Profile'),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
            // SOS Button
            const Positioned(
              bottom: 20,
              right: 16,
              child: SOSButton(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildChip(String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.05),
            spreadRadius: 1,
            blurRadius: 4,
          ),
        ],
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          color: Color(0xFF1A394F),
        ),
      ),
    );
  }

  Widget _buildNavItem(String icon, String label) {
    return Column(
      children: [
        Text(icon, style: const TextStyle(fontSize: 20)),
        const SizedBox(height: 2),
        Text(
          label,
          style: const TextStyle(
            fontSize: 10,
            color: Color(0xFF1A394F),
          ),
        ),
      ],
    );
  }
}
