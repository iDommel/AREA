import 'package:flutter/material.dart';

final List<Map<String, dynamic>> createWorkflow = [
  {
    'workflow': '#flutter',
  },
  {
    'workflow': '#dart',
  },
];

class CreateWorkflowView extends StatelessWidget {
  const CreateWorkflowView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return createWorkflow.isEmpty
        ? const Center(
            child: Text('No Workflow'),
          )
        : ListView.builder(
            itemCount: createWorkflow.length,
            itemBuilder: ((context, index) {
              return Dismissible(
                  key: Key(index.toString()),
                  onDismissed: (direction) {
                    ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('$index dimissed')));
                  },
                  background: Container(
                    color: Colors.black12,
                  ),
                  child: Card(
                    child: ListTile(
                      title: Text(createWorkflow[index]['name']),
                    ),
                  ));
            }),
          );
  }
}
