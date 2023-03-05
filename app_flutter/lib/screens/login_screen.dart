import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:area_app/screens/auth.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String email = '';
  String password = '';

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthContext>(context);
    return Scaffold(
        appBar: AppBar(
            automaticallyImplyLeading: false,
            centerTitle: true,
            backgroundColor: Color.fromARGB(255, 73, 71, 131),
            toolbarHeight: 88,
            title: SizedBox(
              width: 101,
              height: 101,
              child: Card(
                color: Colors.white,
              ),
            )),
        persistentFooterAlignment: AlignmentDirectional.center,
        body: Center(
            child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: <Widget>[
              SizedBox(
                height: 63,
              ),
              Stack(alignment: Alignment.center, children: <Widget>[
                SizedBox(
                  width: 263,
                  height: 471,
                  child: Card(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                    color: Color.fromARGB(255, 217, 217, 217),
                    child: Column(
                      children: [
                        SizedBox(
                          height: 85,
                        ),
                        Text('Login',
                            textScaleFactor: 2, textAlign: TextAlign.left),
                        SizedBox(
                          height: 12,
                        ),
                        SizedBox(
                            width: 177,
                            height: 48,
                            child: Card(
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10)),
                              color: Color.fromARGB(255, 61, 61, 61),
                              child: TextField(
                                controller: TextEditingController(text: email),
                                onChanged: (value) {
                                  email = value;
                                },
                                keyboardType: TextInputType.name,
                                scribbleEnabled: false,
                                style: TextStyle(
                                    color: Color.fromARGB(255, 255, 255, 255)),
                                decoration: InputDecoration(
                                    hintStyle: TextStyle(color: Colors.white54),
                                    labelText: 'Enter your Email'),
                              ),
                            )),
                        SizedBox(
                          height: 10,
                        ),
                        SizedBox(
                            width: 177,
                            height: 48,
                            child: Card(
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(10)),
                                color: Color.fromARGB(255, 61, 61, 61),
                                child: TextField(
                                  obscureText: true,
                                  controller:
                                      TextEditingController(text: password),
                                  onChanged: (value) {
                                    password = value;
                                  },
                                  decoration: InputDecoration(
                                    hintStyle: TextStyle(color: Colors.white54),
                                    labelText: 'Enter your Password',
                                  ),
                                ))),
                        Text(
                          'Forgot Password',
                          textScaleFactor: 0.5,
                          textAlign: TextAlign.right,
                          style: (TextStyle(color: Colors.blueAccent)),
                        ),
                        SizedBox(
                          height: 10,
                        ),
                        Container(
                            width: 177,
                            height: 48,
                            color: Color.fromARGB(255, 73, 71, 131),
                            child: Consumer<AuthContext>(
                                builder: (context, auth, child) {
                              return TextButton(
                                onPressed: () {
                                  setState(() {});
                                  auth.login(email, password);
                                  if (auth.isAuthenticated) {
                                    Navigator.pushNamed(context, '/homePage');
                                  }
                                },
                                child: Text('Connect',
                                    style: TextStyle(color: Colors.white)),
                              );
                            })),
                        Text('Connect With :',
                            textScaleFactor: 1.5, textAlign: TextAlign.right),
                        SizedBox(
                          height: 9,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            SizedBox(
                                width: 50,
                                height: 50,
                                child: ElevatedButton(
                                  onPressed: () {},
                                  style: ButtonStyle(
                                    shape: MaterialStateProperty.all(
                                        CircleBorder()),
                                    padding: MaterialStateProperty.all(
                                        EdgeInsets.all(5)),
                                    backgroundColor: MaterialStateProperty.all(
                                        Colors.white), // <-- Button color
                                    overlayColor: MaterialStateProperty
                                        .resolveWith<Color?>((states) {
                                      if (states
                                          .contains(MaterialState.pressed)) {
                                        return Colors.white38;
                                      }
                                      return null; // <-- Splash color
                                    }),
                                  ),
                                  child: Image.asset('assets/Google.png'),
                                )),
                            SizedBox(
                                width: 50,
                                height: 50,
                                child: ElevatedButton(
                                  onPressed: () {},
                                  style: ButtonStyle(
                                    shape: MaterialStateProperty.all(
                                        CircleBorder()),
                                    padding: MaterialStateProperty.all(
                                        EdgeInsets.all(5)),
                                    backgroundColor: MaterialStateProperty.all(
                                        Colors.white), // <-- Button color
                                    overlayColor: MaterialStateProperty
                                        .resolveWith<Color?>((states) {
                                      if (states
                                          .contains(MaterialState.pressed)) {
                                        return Colors.white38;
                                      }
                                      return null; // <-- Splash color
                                    }),
                                  ),
                                  child: Image.asset('assets/Microsoft.png'),
                                )),
                            SizedBox(
                                width: 50,
                                height: 50,
                                child: ElevatedButton(
                                  onPressed: () {},
                                  style: ButtonStyle(
                                    shape: MaterialStateProperty.all(
                                        CircleBorder()),
                                    padding: MaterialStateProperty.all(
                                        EdgeInsets.all(5)),
                                    backgroundColor: MaterialStateProperty.all(
                                        Colors.white), // <-- Button color
                                    overlayColor: MaterialStateProperty
                                        .resolveWith<Color?>((states) {
                                      if (states
                                          .contains(MaterialState.pressed)) {
                                        return Colors.white38;
                                      }
                                      return null; // <-- Splash color
                                    }),
                                  ),
                                  child: Image.asset('assets/GitHub.png'),
                                ))
                          ],
                        )
                      ],
                    ),
                  ),
                ),
              ]),
              Stack(alignment: Alignment.bottomCenter, children: <Widget>[
                SizedBox(
                  width: 177,
                  height: 10,
                ),
              ]),
            ],
          ),
        )));
  }
}

Widget workflow() {
  return ButtonBar(
    mainAxisSize: MainAxisSize.min,
    children: <Widget>[
      TextButton(
        onPressed: () {},
        child: Text("+"),
      ),
      TextButton(
        onPressed: () {},
        child: Text("+"),
      ),
      TextButton(
        onPressed: () {},
        child: Text("+"),
      ),
    ],
  );
}
