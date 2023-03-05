import 'package:flutter/material.dart';

class AddServiceView extends StatelessWidget {
  const AddServiceView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
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
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(1.0),
            child: Column(
              children: <Widget>[
                const SizedBox(
                  height: 20,
                ),
                const Text('Création de workflow',
                    textScaleFactor: 2,
                    textAlign: TextAlign.left,
                    style: TextStyle(color: Colors.white)),
                const SizedBox(
                  height: 11,
                ),
                const Text('Les Actions',
                    textScaleFactor: 1.5,
                    textAlign: TextAlign.left,
                    style: TextStyle(color: Colors.white)),
                const SizedBox(
                  height: 12,
                ),
                Stack(alignment: Alignment.bottomCenter, children: <Widget>[
                  SizedBox(
                    width: 336,
                    height: 420,
                    child: Card(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20)),
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
                            child: DropdownButton(
                              items: const [],
                              onChanged: (value) {},
                              hint: const Text("Service de l'Action"),
                            ),
                          ),
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
                            child: DropdownButton(
                              items: const [],
                              onChanged: (value) {},
                              hint: const Text("L'action"),
                            ),
                          ),
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
                                obscureText: true,
                                decoration: InputDecoration(
                                  hintStyle: TextStyle(color: Colors.black),
                                  hintText: 'Que fait le bail',
                                ),
                              ),
                            ))
                      ]),
                    ),
                  ),
                ]),
                const SizedBox(height: 21),
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
                          color: const Color.fromARGB(255, 61, 61, 61),
                          child: TextButton(
                              onPressed: () {},
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
                              child: const Center(
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
                          color: const Color.fromARGB(255, 61, 61, 61),
                          child: TextButton(
                              onPressed: () {},
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
                              child: const Center(
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
          ),
        ));
  }
}
