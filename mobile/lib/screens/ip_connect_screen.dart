import 'dart:ffi';

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
            backgroundColor: const Color.fromARGB(255, 73, 71, 131),
            toolbarHeight: 88,
            title: const SizedBox(
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
              const SizedBox(
                height: 63,
              ),
              Stack(alignment: Alignment.center, children: <Widget>[
                SizedBox(
                  width: 263,
                  height: 471,
                  child: Card(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                    color: const Color.fromARGB(255, 217, 217, 217),
                    child: Column(
                      children: [
                        const SizedBox(
                          height: 85,
                        ),
                        const Text('Connect to server',
                            textScaleFactor: 2, textAlign: TextAlign.left),
                        SizedBox(
                            width: 177,
                            height: 48,
                            child: Card(
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(10)),
                                color: const Color.fromARGB(255, 61, 61, 61),
                                child: TextField(
                                  controller: TextEditingController(text: ip),
                                  onChanged: (value) {
                                    ip = value;
                                  },
                                  decoration: const InputDecoration(
                                    hintStyle: TextStyle(color: Colors.white54),
                                    labelText: 'Enter IP+Port',
                                  ),
                                ))),
                        const SizedBox(
                          height: 10,
                        ),
                        Container(
                            width: 177,
                            height: 48,
                            color: const Color.fromARGB(255, 73, 71, 131),
                            child: Consumer<AuthContext>(
                                builder: (context, auth, child) {
                              return TextButton(
                                onPressed: () {
                                  auth.updateServerIp(ip);
                                  Navigator.pushNamed(context, '/login');
                                },
                                child: const Text('Connect',
                                    style: TextStyle(color: Colors.white)),
                              );
                            })),
                      ],
                    ),
                  ),
                ),
              ]),
               Stack(alignment: Alignment.bottomCenter, children: const <Widget>[
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
