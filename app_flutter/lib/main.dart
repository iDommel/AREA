import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/basic.dart';
import 'package:flutter/src/widgets/framework.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AREA',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final ButtonStyle style = TextButton.styleFrom( foregroundColor: Colors.black,
      textStyle: const TextStyle(fontSize: 40),
      backgroundColor: const Color.fromARGB(255, 217, 217, 217),
    );
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 101, 101, 101),
      appBar: AppBar(
        title: Text("AREA"),
        centerTitle: true,
        backgroundColor: Color.fromARGB(255, 73, 71, 131),
      ),
      body: Padding(
        padding: EdgeInsets.fromLTRB(30.0, 40.0, 30.0, 0),
        child: Row(
          children: <Widget>[
            TextButton(
              style: style,
              onPressed: () {},
              child: Text('+'),
            ),
          ],
        ),
        
      ),
    );
  }
}

// class Workflow extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       floatingActionButton: FloatingActionButton(
//         onPressed: () {},
//         child: Text('+'),
//       ),
//     );
//   }
// }

// class Services extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       floatingActionButton: FloatingActionButton(
//         onPressed: () {},
//         child: Text('+'),
//       ),
//     );
//   }
// }
