import 'package:area_app/screens/add_service_screen.dart';
import 'package:flutter/material.dart';
import 'package:area_app/screens/service.dart';

class CreateWorkflowScreen extends StatefulWidget {
  const CreateWorkflowScreen({Key? key}) : super(key: key);

  @override
  State<CreateWorkflowScreen> createState() => _CreateWorkflowScreenState();
}

class _CreateWorkflowScreenState extends State<CreateWorkflowScreen> {
  String serverUrl = "http://localhost:8080/services";

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
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
        body: Padding(
          padding: const EdgeInsets.all(1.0),
          child: Column(
            children: <Widget>[
              SizedBox(
                height: 20,
              ),
              Text('Création de workflow',
                  textScaleFactor: 2,
                  textAlign: TextAlign.left,
                  style: TextStyle(color: Colors.white)),
              SizedBox(
                height: 11,
              ),
              Text('Les Actions',
                  textScaleFactor: 1.5,
                  textAlign: TextAlign.left,
                  style: TextStyle(color: Colors.white)),
              SizedBox(
                height: 12,
              ),
              CreateActions(),
              SizedBox(height: 21),
              SizedBox(
                height: 50,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      width: 164,
                      height: 50,
                      child: Card(
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10)),
                        color: Color.fromARGB(255, 61, 61, 61),
                        child: TextButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => AddServiceView()),
                              );
                            },
                            style: ButtonStyle(
                              backgroundColor:
                                  MaterialStateProperty.resolveWith<Color?>(
                                      (Set<MaterialState> states) {
                                if (states.contains(MaterialState.pressed)) {
                                  return Theme.of(context)
                                      .colorScheme
                                      .primary
                                      .withOpacity(1);
                                }
                                return null;
                              }),
                            ),
                            child: Center(
                              child: Row(
                                children: [
                                  Text(
                                    'Ajouter une action',
                                    style: TextStyle(color: Colors.white),
                                  )
                                ],
                              ),
                            )),
                      ),
                    ),
                    SizedBox(
                      width: 164,
                      height: 50,
                      child: Card(
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10)),
                        color: Color.fromARGB(255, 61, 61, 61),
                        child: TextButton(
                            onPressed: () {
                              Navigator.pushNamed(context,
                                  '/homePage/createWorkflow/addReaction');
                            },
                            style: ButtonStyle(
                              backgroundColor:
                                  MaterialStateProperty.resolveWith<Color?>(
                                      (Set<MaterialState> states) {
                                if (states.contains(MaterialState.pressed)) {
                                  return Theme.of(context)
                                      .colorScheme
                                      .primary
                                      .withOpacity(1);
                                }
                                return null;
                              }),
                            ),
                            child: Center(
                              child: Row(
                                children: [
                                  Text('Passer aux réactions',
                                      style: TextStyle(color: Colors.white))
                                ],
                              ),
                            )),
                      ),
                    )
                  ],
                ),
              ),
            ],
          ),
        ));
  }
}
