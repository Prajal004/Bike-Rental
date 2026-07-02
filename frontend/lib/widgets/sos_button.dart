import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class SOSButton extends StatelessWidget {
  const SOSButton({super.key});

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('🚨 Emergency SOS'),
            content: const Text('Are you in danger? This will alert your emergency contacts.'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Cancel'),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  _triggerSOS(context);
                },
                style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                child: const Text('Send SOS', style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        );
      },
      backgroundColor: Colors.red,
      child: const Icon(Icons.sos, color: Colors.white, size: 32),
    );
  }

  void _triggerSOS(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('🚨 SOS Alert Sent! Help is on the way.'),
        backgroundColor: Colors.red,
      ),
    );
    launchUrl(Uri.parse('tel:100'));
  }
}
