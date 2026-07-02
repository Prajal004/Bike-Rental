import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LanguageProvider extends ChangeNotifier {
  String _currentLanguage = 'en';
  final SharedPreferences? prefs;

  LanguageProvider(this.prefs) {
    _loadLanguage();
  }

  bool get isNepali => _currentLanguage == 'ne';
  Locale get locale => Locale(_currentLanguage);
  bool get hasSelectedLanguage => true;

  void _loadLanguage() {
    _currentLanguage = prefs?.getString('language') ?? 'en';
    notifyListeners();
  }

  void setLanguage(String language) {
    if (language != 'ne' && language != 'en') return;
    _currentLanguage = language;
    prefs?.setString('language', language);
    notifyListeners();
  }
}
