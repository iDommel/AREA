import 'package:flutter/material.dart';

class AddServiceView extends StatelessWidget {
  const AddServiceView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
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
                        hint: Text("Service de l'Action"),
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
                        hint: Text("L'action"),
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
                        ),
                      ))
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
    );
  }
}
