import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'providers/auth_provider.dart';
import 'providers/language_provider.dart';
import 'providers/rental_provider.dart';
import 'screens/splash_screen.dart';
import 'screens/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => LanguageProvider(prefs)),
        ChangeNotifierProvider(create: (_) => RentalProvider()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final languageProvider = Provider.of<LanguageProvider>(context);
    final authProvider = Provider.of<AuthProvider>(context);
    
    return MaterialApp(
      title: 'BikeRent Nepal',
      theme: ThemeData(
        primaryColor: const Color(0xFF1A394F),
        scaffoldBackgroundColor: Colors.grey.shade50,
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
          centerTitle: true,
          iconTheme: IconThemeData(color: Color(0xFF1A394F)),
          titleTextStyle: TextStyle(
            color: Color(0xFF1A394F),
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      locale: languageProvider.locale,
      supportedLocales: const [Locale('en'), Locale('ne')],
      home: authProvider.isAuthenticated 
          ? const HomeScreen() 
          : const SplashScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
