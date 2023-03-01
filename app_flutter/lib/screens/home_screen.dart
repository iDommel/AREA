import 'dart:convert';
import 'dart:developer' as dev;
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final PageController _pageController = PageController(initialPage: 0);

  late bool status_;
  late String message;

  String serverUrl = "http://localhost:8080/services";
  @override
  void initState() {
    status_ = false;
    message = "";

    super.initState();
  }

  Future<void> getService() async {
    final response = await http.get(Uri.parse(serverUrl),
        headers: {"Content-Type": "application/json"});

    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      setState(() {
        status_ = false;
        message = "good";
        //dev.log(json.encode(data));
      });
    }
  }

  @override
  void dispose() {
    _pageController.dispose();

    super.dispose();
  }

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
                child: TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/');
                  },
                  child: Text('Disconnect'),
                ),
              ),
            )),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(1.0),
            child: Column(
              children: <Widget>[
                SizedBox(
                  height: 55,
                ),
                Text('Workflow', textScaleFactor: 3, textAlign: TextAlign.left),
                SizedBox(
                  height: 28,
                ),
                Stack(alignment: Alignment.bottomCenter, children: <Widget>[
                  SizedBox(
                    width: 330,
                    height: 146,
                    child: Card(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20)),
                      color: Color.fromARGB(255, 61, 61, 61),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          SizedBox(
                              width: 300,
                              height: 80,
                              child: ListView(
                                scrollDirection: Axis.horizontal,
                                children: [
                                  WorkflowBox(),
                                ],
                              ))
                        ],
                      ),
                    ),
                  ),
                ]),
                SizedBox(
                  height: 55,
                ),
                Text('Services', textScaleFactor: 3, textAlign: TextAlign.left),
                SizedBox(
                  height: 28,
                ),
                Stack(alignment: Alignment.bottomCenter, children: <Widget>[
                  SizedBox(
                    width: 330,
                    height: 146,
                    child: Card(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20)),
                      color: Color.fromARGB(255, 61, 61, 61),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          SizedBox(
                              width: 300,
                              height: 80,
                              child: ListView(
                                scrollDirection: Axis.horizontal,
                                children: [
                                  ServiceBox(),
                                ],
                              ))
                        ],
                      ),
                    ),
                  ),
                ]),
              ],
            ),
          ),
        ));
  }
}

class ServiceBox extends StatelessWidget {
  const ServiceBox({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: 80,
        height: 80,
        child: ElevatedButton(
          onPressed: () {},
          style: ButtonStyle(
            shape: MaterialStateProperty.all(CircleBorder()),
            padding: MaterialStateProperty.all(EdgeInsets.all(20)),
            backgroundColor:
                MaterialStateProperty.all(Colors.blue), // <-- Button color
            overlayColor: MaterialStateProperty.resolveWith<Color?>((states) {
              if (states.contains(MaterialState.pressed)) {
                return Colors.red;
              }
              return null; // <-- Splash color
            }),
          ),
          child: Image.asset('assets/spotify.png'),
        ));
  }
}

class WorkflowBox extends StatelessWidget {
  const WorkflowBox({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 80,
      height: 80,
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        color: Color.fromARGB(255, 217, 217, 217),
        child: TextButton(
            onPressed: () {
              Navigator.pushNamed(context, '/homePage/createWorkflow');
            },
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.resolveWith<Color?>(
                  (Set<MaterialState> states) {
                if (states.contains(MaterialState.pressed)) {
                  return Theme.of(context).colorScheme.primary.withOpacity(1);
                }
                return null;
              }),
            ),
            child: Center(
              child: Row(
                children: <Widget>[Icon(Icons.add)],
              ),
            )),
      ),
    );
  }
}
