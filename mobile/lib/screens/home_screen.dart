import 'dart:convert';
import 'package:provider/provider.dart';
import 'package:area_app/screens/auth.dart';
import 'package:http/http.dart' as http;
import 'package:area_app/parser.dart';
import 'package:url_launcher/url_launcher.dart';

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
    final response = await http.get(Uri.parse("$serverUrl?populate=service"),
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

Future<ServiceStatuses?> getServicesSatusesHttp(String auth) async {
  final response = await http.get(
      Uri.parse("http://localhost:8080/service-statuses?user=${auth}"),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Charset": 'utf-8'
      });
  print(auth);
  final ServiceStatuses serviceStatuses;
  if (response.statusCode == 200) {
    serviceStatuses = serviceStatusesFromJson(response.body);
    return serviceStatuses;
  } else if (response.statusCode != 200) {
    return null;
  }
  return null;
}

Future<WorkflowStatuses?> getWorkflowSatusesHttp(String auth) async {
  final response = await http.get(
      Uri.parse("http://localhost:8080/workflows?relativeUser=${auth}"),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Charset": 'utf-8'
      });
  print(auth);
  final WorkflowStatuses workflowStatuses;
  if (response.statusCode == 200) {
    workflowStatuses = workflowStatusesFromJson(response.body);
    return workflowStatuses;
  } else if (response.statusCode != 200) {
    return null;
  }
  return null;
}

class ServiceBox extends StatelessWidget {
  const ServiceBox({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthContext>(context);
    ServiceStatuses serviceStatuses;
    return SizedBox(
        width: 300,
        height: 80,
        child: FutureBuilder(
            future: getServicesSatusesHttp(auth.user),
            builder: ((context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done &&
                  snapshot.data != null) {
                serviceStatuses = snapshot.data!;
                List<Widget> services = getListService(serviceStatuses);
                return ListView(
                  scrollDirection: Axis.horizontal,
                  children: services,
                );
              } else {
                print(snapshot.data);
                return CircularProgressIndicator();
              }
            })));
  }

  List<Widget> getListService(ServiceStatuses serviceStatuses) {
    List<Widget> services = [];
    for (var serviceStatus in serviceStatuses.serviceStatuses) {
      services.add(
        ElevatedButton(
          onPressed: () async {
            if (serviceStatus.isEnabled == true &&
                serviceStatus.isConnected == true) {
              serviceStatus.isEnabled = false;
            } else {
              serviceStatus.isEnabled = true;
            }
            // if (serviceStatus.isConnected == true) {
            // serviceStatus.isConnected = false;
            // } else {
            // final response = await http.get(Uri.parse(
            // "http://localhost:8080${serviceStatus.service.route}"));
            // if (response.statusCode == 200) {
            // Uri url = Uri.parse(response.body);
            // if (await canLaunchUrl(url)) {
            // await launchUrl(url);
            // } else {
            // throw 'Could not launch $url';
            // }
            // } else {
            // throw 'Request failed with status: ${response.statusCode}.';
            // }
            // }
          },
          style: ButtonStyle(
            shape: MaterialStateProperty.all(CircleBorder()),
            padding: MaterialStateProperty.all(EdgeInsets.all(20)),
            backgroundColor:
                MaterialStateProperty.resolveWith<Color?>((states) {
              if (serviceStatus.isEnabled == true) {
                return Colors.green;
              }
              if (serviceStatus.isEnabled == false &&
                  serviceStatus.isConnected == true) {
                return Colors.red;
              } else {
                return Colors.grey;
              }
            }), // <-- Button color
          ),
          child: Image.asset('assets/${serviceStatus.serviceName}.png'),
        ),
      );
    }
    return services;
  }
}

class WorkflowBox extends StatelessWidget {
  const WorkflowBox({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthContext>(context);
    WorkflowStatuses workflowStatuses;

    return SizedBox(
      width: 300,
      height: 80,
      child: FutureBuilder(
          future: getWorkflowSatusesHttp(auth.user),
          builder: ((context, snapshot) {
            if (snapshot.connectionState == ConnectionState.done &&
                snapshot.data != null) {
              workflowStatuses = snapshot.data!;
              List<Widget> services =
                  getListWorkflow(workflowStatuses, context);
              return ListView(
                scrollDirection: Axis.horizontal,
                children: services,
              );
            } else {
              print(snapshot.data);
              return CircularProgressIndicator();
            }
          })),
    );
  }

  List<Widget> getListWorkflow(
      WorkflowStatuses workflowStatuses, BuildContext context) {
    List<Widget> workflow = [];
    for (var workflowStatus in workflowStatuses.workflows) {
      workflow.add(
        SizedBox(
          width: 80,
          height: 80,
          child: ElevatedButton(
              onPressed: () async {},
              style: ButtonStyle(
                padding: MaterialStateProperty.all(EdgeInsets.all(20)),
                backgroundColor: MaterialStateProperty.all(Colors.grey),
              ),
              child: Text(workflowStatus.name)),
        ),
      );
    }
    workflow.add(
      SizedBox(
        width: 80,
        height: 80,
        child: ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/homePage/createWorkflow');
            },
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all(Colors.grey),
            ),
            child: Center(
              child: Row(
                children: <Widget>[Icon(Icons.add)],
              ),
            )),
      ),
    );
    return workflow;
  }
}
