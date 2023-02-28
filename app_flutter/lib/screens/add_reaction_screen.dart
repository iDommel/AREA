import 'package:flutter/material.dart';

class AddReactionView extends StatelessWidget {
  const AddReactionView({Key? key}) : super(key: key);

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
        body: Center(
          child: Padding(
              padding: const EdgeInsets.all(1.0),
              child: Column(children: <Widget>[
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
                Text('Les Réactions',
                    textScaleFactor: 1.5,
                    textAlign: TextAlign.left,
                    style: TextStyle(color: Colors.white)),
                SizedBox(
                  height: 12,
                ),
                Stack(alignment: Alignment.bottomCenter, children: <Widget>[
                  SizedBox(
                    width: 336,
                    height: 420,
                    child: Card(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20)),
                      color: Color.fromARGB(255, 61, 61, 61),
                      child: Column(children: [
                        SizedBox(
                          height: 27,
                        ),
                        SizedBox(
                          width: 305,
                          height: 42,
                          child: Card(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10)),
                            color: Color.fromARGB(255, 217, 217, 217),
                            child: DropdownButton(
                              items: [],
                              onChanged: (value) {},
                              hint: Text("Service de la réaction"),
                            ),
                          ),
                        ),
                        SizedBox(
                          height: 26,
                        ),
                        SizedBox(
                          width: 305,
                          height: 42,
                          child: Card(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10)),
                            color: Color.fromARGB(255, 217, 217, 217),
                            child: DropdownButton(
                              items: [],
                              onChanged: (value) {},
                              hint: Text("La réaction"),
                            ),
                          ),
                        ),
                        SizedBox(
                          height: 16,
                        ),
                        SizedBox(
                          width: 305,
                          height: 241,
                          child: Card(
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10)),
                              color: Color.fromARGB(255, 217, 217, 217),
                              child: TextField(
                                obscureText: true,
                                decoration: InputDecoration(
                                  hintStyle: TextStyle(color: Colors.black),
                                  hintText: 'Que fait le bail',
                                ),
                              )),
                        )
                      ]),
                    ),
                  ),
                ]),
                SizedBox(height: 21),
                SizedBox(
                    height: 50,
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SizedBox(
                            width: 50,
                            height: 50,
                            child: Card(
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10)),
                              color: Color.fromARGB(255, 61, 61, 61),
                              child: TextButton(
                                onPressed: () {},
                                style: ButtonStyle(
                                  backgroundColor:
                                      MaterialStateProperty.resolveWith<Color?>(
                                          (Set<MaterialState> states) {
                                    if (states
                                        .contains(MaterialState.pressed)) {
                                      return Theme.of(context)
                                          .colorScheme
                                          .primary
                                          .withOpacity(1);
                                    }
                                    return null;
                                  }),
                                ),
                                child: Icon(Icons.arrow_back_sharp),
                              ),
                            )),
                        SizedBox(
                          width: 164,
                          height: 50,
                          child: Card(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10)),
                            color: Color.fromARGB(255, 61, 61, 61),
                            child: TextButton(
                                onPressed: () {},
                                style: ButtonStyle(
                                  backgroundColor:
                                      MaterialStateProperty.resolveWith<Color?>(
                                          (Set<MaterialState> states) {
                                    if (states
                                        .contains(MaterialState.pressed)) {
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
                                        'Ajouter une réaction',
                                        style: TextStyle(color: Colors.white),
                                      )
                                    ],
                                  ),
                                )),
                          ),
                        ),
                        SizedBox(
                          width: 110,
                          height: 50,
                          child: Card(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10)),
                            color: Color.fromARGB(255, 61, 61, 61),
                            child: TextButton(
                                onPressed: () {
                                  Navigator.popUntil(context,
                                      ModalRoute.withName('/homePage'));
                                },
                                style: ButtonStyle(
                                  backgroundColor:
                                      MaterialStateProperty.resolveWith<Color?>(
                                          (Set<MaterialState> states) {
                                    if (states
                                        .contains(MaterialState.pressed)) {
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
                                      Text('Sauvegarder',
                                          style: TextStyle(color: Colors.white))
                                    ],
                                  ),
                                )),
                          ),
                        )
                      ],
                    ))
              ])),
        ));
  }
}
