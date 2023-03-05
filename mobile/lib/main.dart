import 'package:area_app/screens/add_reaction_screen.dart';
import 'package:area_app/screens/create_workflow_screen.dart';
import 'package:area_app/screens/home_screen.dart';
import 'package:area_app/screens/login_screen.dart';
import 'package:area_app/screens/ip_connect_screen.dart';
import 'package:flutter/material.dart';
import 'package:area_app/screens/auth.dart';

void main() {
  runApp(const AuthProvider(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (context) => const IpConnectScreen(),
        '/login': (context) => const LoginScreen(),
        '/homePage': (context) => const HomeScreen(),
        '/homePage/createWorkflow': (context) => const CreateWorkflowScreen(),
        '/homePage/createWorkflow/addReaction': (context) =>
            const AddReactionView()
      },
      title: 'AREA',
      theme: ThemeData(
          primaryColor: const Color.fromARGB(255, 67, 67, 67),
          backgroundColor: const Color.fromARGB(255, 67, 67, 67),
          scaffoldBackgroundColor: const Color.fromARGB(255, 101, 101, 101)),
      debugShowCheckedModeBanner: false,
    );
  }
}
