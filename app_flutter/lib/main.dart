import 'package:area_app/screens/home_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AREA',
      theme: ThemeData(primarySwatch: Colors.grey),
      debugShowCheckedModeBanner: false,
      home: const HomeScreen(),
    );
  }
}

// class MyHomePage extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     final ButtonStyle style = TextButton.styleFrom(
//       foregroundColor: Colors.black,
//       textStyle: const TextStyle(fontSize: 45),
//       backgroundColor: const Color.fromARGB(255, 217, 217, 217),
//     );
//     return Scaffold(
//       backgroundColor: Color.fromARGB(255, 101, 101, 101),
//       appBar: AppBar(
//         title: Text("AREA"),
//         centerTitle: true,
//         backgroundColor: Color.fromARGB(255, 73, 71, 131),
//       ),
//       body: Padding(
//         padding: EdgeInsets.fromLTRB(30.0, 40.0, 30.0, 0),
//         child: Row(
//           children: <Widget>[
//             ButtonBar(
//               mainAxisSize: MainAxisSize.min,
//               children: <Widget>[
//                 TextButton(
//                   onPressed: () {},
//                   style: style,
//                   child: Text("+"),
//                 ),
//                 TextButton(
//                   onPressed: () {},
//                   style: style,
//                   child: Text("+"),
//                 ),
//                 TextButton(
//                   onPressed: () {},
//                   style: style,
//                   child: Text("+"),
//                 ),
//               ],
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }

// class WorkflowState extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return ListView.builder(
//       itemBuilder: (context, index) {
//         return ListTile(),
     
//       },
//     );
//   }
// }

// Widget Services() {

//   Widget build(BuildContext context) {
//     return Scaffold(
//       floatingActionButton: FloatingActionButton(
//         onPressed: () {},
//         child: Text('+'),
//       ),
//     );
//   }
// }
