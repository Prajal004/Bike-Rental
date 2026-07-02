import 'package:flutter/material.dart';

class RentalProvider extends ChangeNotifier {
  List<Map<String, dynamic>> _rentals = [];
  bool _isLoading = false;

  List<Map<String, dynamic>> get rentals => _rentals;
  bool get isLoading => _isLoading;

  void setRentals(List<Map<String, dynamic>> rentals) {
    _rentals = rentals;
    notifyListeners();
  }

  void setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void addRental(Map<String, dynamic> rental) {
    _rentals.insert(0, rental);
    notifyListeners();
  }

  void clearRentals() {
    _rentals = [];
    notifyListeners();
  }
}
