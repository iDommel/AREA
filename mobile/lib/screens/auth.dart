import 'package:flutter/widgets.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class AuthProvider extends StatelessWidget {
  final Widget child;

  const AuthProvider({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AuthContext(),
      child: child,
    );
  }
}

class AuthContext extends ChangeNotifier {
  bool isAuthenticated = false;
  String user = '';
  late String token;
  late String serverIp = 'http://localhost:8080';

  void login(String email, String password) async {
    try {
      final url = Uri.parse('$serverIp/auth/login');
      final response = await http.post(
        url,
        body: json.encode({
          'username': email,
          'password': password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      final responseData = json.decode(response.body);

      if (responseData['token'] != null) {
        isAuthenticated = true;
      }
      if (responseData['error'] != null) {
        throw responseData['error']['message'];
      }

      token = responseData['token'];
      user = responseData['user'];

      final prefs = await SharedPreferences.getInstance();
      final userData = json.encode({
        'token': token,
        'user': user,
      });
      prefs.setString('userData', userData);
      notifyListeners();
    } catch (error) {}
  }

  void logout() {
    // Implement the logout method
  }

  Future<dynamic> fetchAPI(String url, String method,
      [Object? body, String? token]) async {
    final finalUrl = Uri.parse('$serverIp/$url');
    final header = {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };

    switch (method) {
      case "GET":
        final response = await http.get(
          finalUrl,
          headers: header,
        );
        return response;
      case "POST":
        final response = await http.post(
          finalUrl,
          body: body != null ? json.encode(body) : null,
          headers: header,
        );
        return response;
      case "DELETE":
        final response = await http.delete(
          finalUrl,
          headers: header,
        );
        return response;
      default:
        throw UnsupportedError("Unsupported HTTP method: $method");
    }
  }

  void updateServerIp(String newServerIp) {
    serverIp = newServerIp;
    notifyListeners();
  }

  Future<void> refreshToken() async {
    // Implement the refreshToken method
  }

  bool isTokenExpired(String token) {
    // Implement the isTokenExpired method
    return true;
  }
}
