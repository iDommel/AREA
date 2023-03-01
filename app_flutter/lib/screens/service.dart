import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:area_app/parser.dart';
import 'dart:developer' as dev;

class ServiceWidget extends StatefulWidget {
  const ServiceWidget({super.key});

  @override
  State<ServiceWidget> createState() => _ServiceWidgetState();
}

class _ServiceWidgetState extends State<ServiceWidget> {
  String serverUrl = "http://localhost:8080/services";
  late Service? service;

  Future<Service?> getService() async {
    final response = await http.get(Uri.parse(serverUrl), headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Charset": 'utf-8'
    });
    final Service service;
    if (response.statusCode == 200) {
      service = serviceFromJson(response.body);
      return service;
    } else if (response.statusCode != 200) {
      return null;
    }
    return null;
  }

  List<DropdownMenuItem<Object>>? getActions(Service? service) {
    List<DropdownMenuItem<Object>>? actions = [];
    for (var i = 0; i < service!.services[0].reactions.length; i++) {
      actions.add(DropdownMenuItem(child: Text(service.services[5].name)));
    }
    return actions;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getService(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done &&
            snapshot.data != null) {
          return DropdownButton(
            items: getActions(snapshot.data),
            onChanged: (value) {
              print("$value");
            },
          );
        } else {
          return CircularProgressIndicator();
        }
      },
    );
  }
}
