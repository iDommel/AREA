import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:area_app/parser.dart';

Future<Service?> getServiceHttp() async {
  final response = await http.get(Uri.parse("http://localhost:8080/services"),
      headers: {
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

Future<ActionsArea?> getActionsHttp() async {
  final response = await http.get(Uri.parse("http://localhost:8080/actions"),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Charset": 'utf-8'
      });
  final ActionsArea actions;
  if (response.statusCode == 200) {
    actions = actionsFromJson(response.body);
    return actions;
  } else if (response.statusCode != 200) {
    return null;
  }
  return null;
}

Future<Reactions?> getReactionsHttp() async {
  final response = await http.get(Uri.parse("http://localhost:8080/reactions"),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Charset": 'utf-8'
      });
  final Reactions reaction;
  if (response.statusCode == 200) {
    reaction = reactionsFromJson(response.body);
    return reaction;
  } else if (response.statusCode != 200) {
    return null;
  }
  return null;
}

List<DropdownMenuItem<Object>>? getActions(
    ActionsArea? actions, String serviceName, Service? service) {
  List<DropdownMenuItem<Object>>? action = [];
  for (var i = 0; i < actions!.actions.length; i++) {
    if (service != null &&
        service.services
            .singleWhere((element) => element.name == serviceName)
            .actions
            .contains(actions.actions[i].id)) {
      var newItem = DropdownMenuItem(
        value: actions.actions[i].name,
        child: Text(actions.actions[i].name),
      );
      action.add(newItem);
    }
  }
  return action;
}

List<DropdownMenuItem<Object>>? getReactions(
    Reactions? reaction, String serviceName, Service? service) {
  List<DropdownMenuItem<Object>>? reactions = [];
  for (var i = 0; i < reaction!.reactions.length; i++) {
    if (service != null &&
        service.services
            .singleWhere((element) => element.name == serviceName)
            .reactions
            .contains(reaction.reactions[i].id)) {
      var newItem = DropdownMenuItem(
        value: reaction.reactions[i].name,
        child: Text(reaction.reactions[i].name),
      );
      reactions.add(newItem);
    }
  }
  return reactions;
}

List<DropdownMenuItem<Object>>? getServices(Service? service) {
  List<DropdownMenuItem<Object>>? services = [];
  for (var i = 0; i < service!.count; i++) {
    var newItem = DropdownMenuItem(
      value: service.services[i].name,
      child: Text(service.services[i].name),
    );
    services.add(newItem);
  }
  return services;
}

class CreateActions extends StatefulWidget {
  const CreateActions({
    Key? key,
  }) : super(key: key);

  @override
  State<CreateActions> createState() => _CreateActionsState();
}

class _CreateActionsState extends State<CreateActions> {
  Service? service;
  String? selectedService = 'Spotify';
  String? selectedAction;

  @override
  Widget build(BuildContext context) {
    return Stack(alignment: Alignment.bottomCenter, children: <Widget>[
      SizedBox(
        width: 336,
        height: 420,
        child: Card(
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          color: const Color.fromARGB(255, 61, 61, 61),
          child: Column(children: [
            const SizedBox(
              height: 27,
            ),
            SizedBox(
              width: 305,
              height: 42,
              child: Card(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                  color: const Color.fromARGB(255, 217, 217, 217),
                  child: FutureBuilder(
                    future: getServiceHttp(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.done &&
                          snapshot.data != null) {
                        service = snapshot.data;
                        List<DropdownMenuItem<Object>>? services =
                            getServices(snapshot.data);
                        return DropdownButton(
                          items: services,
                          value: selectedService,
                          onChanged: ((value) {
                            setState(() {
                              selectedService = value as String;
                              selectedAction = null;
                            });
                          }),
                          autofocus: true,
                        );
                      } else {
                        return const CircularProgressIndicator();
                      }
                    },
                  )),
            ),
            const SizedBox(
              height: 26,
            ),
            SizedBox(
              width: 305,
              height: 42,
              child: Card(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                  color: const Color.fromARGB(255, 217, 217, 217),
                  child: FutureBuilder(
                    future: getActionsHttp(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.done &&
                          snapshot.data != null) {
                        List<DropdownMenuItem<Object>>? actions = getActions(
                            snapshot.data, selectedService!, service);
                        return DropdownButton(
                          items: actions,
                          value: selectedAction,
                          onChanged: ((value) {
                            setState(() {
                              print("actions: $actions");
                              print("selectedAction $selectedAction");
                              print("value $value");
                              selectedAction = value as String;
                            });
                          }),
                          autofocus: true,
                        );
                      } else {
                        return const CircularProgressIndicator();
                      }
                    },
                  )),
            ),
            const SizedBox(
              height: 16,
            ),
            SizedBox(
              width: 305,
              height: 241,
              child: Card(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                  color: const Color.fromARGB(255, 217, 217, 217),
                  child: const TextField(
                    obscureText: false,
                    decoration: InputDecoration(
                      hintStyle: TextStyle(color: Colors.black),
                      hintText: 'Que fait le bail',
                    ),
                  )),
            )
          ]),
        ),
      ),
    ]);
  }
}

class CreateReaction extends StatefulWidget {
  const CreateReaction({
    Key? key,
  }) : super(key: key);

  @override
  State<CreateReaction> createState() => _CreateReactionState();
}

class _CreateReactionState extends State<CreateReaction> {
  Service? service;
  String? selectedService = 'Spotify';
  String? selectedReaction;

  @override
  Widget build(BuildContext context) {
    return Stack(alignment: Alignment.bottomCenter, children: <Widget>[
      SizedBox(
        width: 336,
        height: 420,
        child: Card(
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          color: const Color.fromARGB(255, 61, 61, 61),
          child: Column(children: [
            const SizedBox(
              height: 27,
            ),
            SizedBox(
              width: 305,
              height: 42,
              child: Card(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                  color: const Color.fromARGB(255, 217, 217, 217),
                  child: FutureBuilder(
                    future: getServiceHttp(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.done &&
                          snapshot.data != null) {
                        service = snapshot.data;
                        List<DropdownMenuItem<Object>>? services =
                            getServices(snapshot.data);
                        return DropdownButton(
                          items: services,
                          value: selectedService,
                          onChanged: ((value) {
                            setState(() {
                              selectedService = value as String;
                              selectedReaction = null;
                            });
                          }),
                          autofocus: true,
                        );
                      } else {
                        return const CircularProgressIndicator();
                      }
                    },
                  )),
            ),
            const SizedBox(
              height: 26,
            ),
            SizedBox(
              width: 305,
              height: 42,
              child: Card(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                  color: const Color.fromARGB(255, 217, 217, 217),
                  child: FutureBuilder(
                    future: getReactionsHttp(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.done &&
                          snapshot.data != null) {
                        List<DropdownMenuItem<Object>>? reaction = getReactions(
                            snapshot.data, selectedService!, service);
                        return DropdownButton(
                          items: reaction,
                          value: selectedReaction,
                          onChanged: ((value) {
                            setState(() {
                              selectedReaction = value as String;
                            });
                          }),
                          autofocus: true,
                        );
                      } else {
                        return const CircularProgressIndicator();
                      }
                    },
                  )),
            ),
            const SizedBox(
              height: 16,
            ),
            SizedBox(
              width: 305,
              height: 241,
              child: Card(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                  color: const Color.fromARGB(255, 217, 217, 217),
                  child: const TextField(
                    obscureText: false,
                    decoration: InputDecoration(
                      hintStyle: TextStyle(color: Colors.black),
                      hintText: 'Que fait le bail',
                    ),
                  )),
            )
          ]),
        ),
      ),
    ]);
  }
}
