import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:area_app/screens/auth.dart';

class IpConnectScreen extends StatefulWidget {
  const IpConnectScreen({Key? key}) : super(key: key);
  @override
  State<IpConnectScreen> createState() => _IpConnectScreenState();
}

class _IpConnectScreenState extends State<IpConnectScreen> {
  String ip = '';

  @override
  Widget build(BuildContext context) {
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
                        Text('Connect to server',
                            textScaleFactor: 2, textAlign: TextAlign.left),
                        SizedBox(
                            width: 177,
                            height: 48,
                            child: Card(
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(10)),
                                color: Color.fromARGB(255, 61, 61, 61),
                                child: TextField(
                                  obscureText: true,
                                  controller: TextEditingController(text: ip),
                                  onChanged: (value) {
                                    ip = value;
                                  },
                                  decoration: InputDecoration(
                                    hintStyle: TextStyle(color: Colors.white54),
                                    labelText: 'Enter IP+Port',
                                  ),
                                ))),
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
                                  Navigator.pushNamed(context, '/login');
                                },
                                child: Text('Connect',
                                    style: TextStyle(color: Colors.white)),
                              );
                            })),
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
