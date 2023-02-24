import 'package:area_app/screens/views/add_reaction_view.dart';
import 'package:area_app/screens/views/add_service_view.dart';
import 'package:area_app/screens/views/create_workflow_view.dart';
import 'package:area_app/screens/views/home_view.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final PageController _pageController = PageController(initialPage: 0);

  int _currentIndex = 0;

  @override
  void dispose() {
    _pageController.dispose();

    super.dispose();
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
      body: PageView(
        onPageChanged: (index) {
          setState(() => _currentIndex = index);
        },
        controller: _pageController,
        children: const <Widget>[
          HomeView(),
          CreateWorkflowView(),
          AddReactionView(),
          AddServiceView(),
        ],
      ),
      // bottomNavigationBar: BottomNavigationBar(
      //   currentIndex: _currentIndex,
      //   onTap: (index) {
      //     setState(() => _currentIndex = index);

      //     _pageController.jumpToPage(_currentIndex);
      //   },
      //   items: const <BottomNavigationBarItem>[
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.home),
      //       label: 'Home',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.add_box),
      //       label: 'Create Workflow',
      //     ),
      //   ],
      // ),
    );
  }
}

Widget workflow() {
  return ButtonBar(
    mainAxisSize: MainAxisSize.min,
    children: <Widget>[
      TextButton(
        onPressed: () {},
        child: Text("+"),
      ),
      TextButton(
        onPressed: () {},
        child: Text("+"),
      ),
      TextButton(
        onPressed: () {},
        child: Text("+"),
      ),
    ],
  );
}
