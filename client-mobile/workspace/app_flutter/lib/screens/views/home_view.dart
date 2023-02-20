import 'package:flutter/material.dart';

class HomeView extends StatelessWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
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
                            WorkflowBox(),
                            WorkflowBox(),
                            WorkflowBox(),
                            WorkflowBox(),
                            WorkflowBox(),
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
                            ServiceBox(),
                            ServiceBox(),
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
    );
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
              } // <-- Splash color
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
            onPressed: () {},
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
