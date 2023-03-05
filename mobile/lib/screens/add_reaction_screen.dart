import 'package:area_app/screens/service.dart';
import 'package:flutter/material.dart';

class AddReactionView extends StatelessWidget {
  const AddReactionView({Key? key}) : super(key: key);

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
              child: Column(children: <Widget>[
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
                const Text('Les Réactions',
                    textScaleFactor: 1.5,
                    textAlign: TextAlign.left,
                    style: TextStyle(color: Colors.white)),
                const SizedBox(
                  height: 12,
                ),
                const CreateReaction(),
                const SizedBox(height: 21),
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
                              color: const Color.fromARGB(255, 61, 61, 61),
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
                                child: const Icon(Icons.arrow_back_sharp),
                              ),
                            )),
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
                                    children: const [
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
                            color: const Color.fromARGB(255, 61, 61, 61),
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
                                    children: const [
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
