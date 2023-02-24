import 'package:area_app/screens/home_screen.dart';
import 'package:area_app/screens/login_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AREA',
      theme: ThemeData(
          primaryColor: Color.fromARGB(255, 67, 67, 67),
          backgroundColor: Color.fromARGB(255, 67, 67, 67),
          scaffoldBackgroundColor: Color.fromARGB(255, 101, 101, 101)),
      debugShowCheckedModeBanner: false,
      home: const LoginScreen(),
    );
  }
}
