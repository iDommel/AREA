// To parse this JSON data, do
//
//     final service = serviceFromJson(jsonString);

import 'dart:convert';

Service serviceFromJson(String str) => Service.fromJson(json.decode(str));

String serviceToJson(Service data) => json.encode(data.toJson());

class Service {
  Service({
    required this.services,
    required this.count,
  });

  List<ServiceElement> services;
  int count;

  factory Service.fromJson(Map<String, dynamic> json) => Service(
        services: List<ServiceElement>.from(
            json["services"].map((x) => ServiceElement.fromJson(x))),
        count: json["count"],
      );

  Map<String, dynamic> toJson() => {
        "services": List<dynamic>.from(services.map((x) => x.toJson())),
        "count": count,
      };
}

class ServiceElement {
  ServiceElement({
    required this.description,
    required this.actions,
    required this.reactions,
    required this.globallyEnabled,
    required this.id,
    required this.name,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
    required this.route,
  });

  String description;
  List<String> actions;
  List<String> reactions;
  bool globallyEnabled;
  String id;
  String name;
  DateTime createdAt;
  DateTime updatedAt;
  int v;
  String route;

  factory ServiceElement.fromJson(Map<String, dynamic> json) => ServiceElement(
        description: json["description"],
        actions: List<String>.from(json["actions"].map((x) => x)),
        reactions: List<String>.from(json["reactions"].map((x) => x)),
        globallyEnabled: json["globallyEnabled"],
        id: json["_id"],
        name: json["name"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
        route: json["route"],
      );

  Map<String, dynamic> toJson() => {
        "description": description,
        "actions": List<dynamic>.from(actions.map((x) => x)),
        "reactions": List<dynamic>.from(reactions.map((x) => x)),
        "globallyEnabled": globallyEnabled,
        "_id": id,
        "name": name,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
        "route": route,
      };
}

// To parse this JSON data, do
//
//     final reactions = reactionsFromJson(jsonString);

Reactions reactionsFromJson(String str) => Reactions.fromJson(json.decode(str));

String reactionsToJson(Reactions data) => json.encode(data.toJson());

class Reactions {
  Reactions({
    required this.reactions,
    required this.count,
  });

  List<Reaction> reactions;
  int count;

  factory Reactions.fromJson(Map<String, dynamic> json) => Reactions(
        reactions: List<Reaction>.from(
            json["reactions"].map((x) => Reaction.fromJson(x))),
        count: json["count"],
      );

  Map<String, dynamic> toJson() => {
        "reactions": List<dynamic>.from(reactions.map((x) => x.toJson())),
        "count": count,
      };
}

class Reaction {
  Reaction({
    required this.description,
    required this.isEnabled,
    required this.needsAuth,
    required this.id,
    required this.name,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  String description;
  bool isEnabled;
  bool needsAuth;
  String id;
  String name;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  factory Reaction.fromJson(Map<String, dynamic> json) => Reaction(
        description: json["description"],
        isEnabled: json["isEnabled"],
        needsAuth: json["needsAuth"],
        id: json["_id"],
        name: json["name"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "description": description,
        "isEnabled": isEnabled,
        "needsAuth": needsAuth,
        "_id": id,
        "name": name,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

// To parse this JSON data, do
//
//     final actions = actionsFromJson(jsonString);

ActionsArea actionsFromJson(String str) => ActionsArea.fromJson(json.decode(str));

String actionsToJson(ActionsArea data) => json.encode(data.toJson());

class ActionsArea {
  ActionsArea({
    required this.actions,
    required this.count,
  });

  List<ActionArea> actions;
  int count;

  factory ActionsArea.fromJson(Map<String, dynamic> json) => ActionsArea(
        actions:
            List<ActionArea>.from(json["actions"].map((x) => ActionArea.fromJson(x))),
        count: json["count"],
      );

  Map<String, dynamic> toJson() => {
        "actions": List<dynamic>.from(actions.map((x) => x.toJson())),
        "count": count,
      };
}

class ActionArea {
  ActionArea({
    required this.description,
    required this.isEnabled,
    required this.needsAuth,
    required this.id,
    required this.name,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  String description;
  bool isEnabled;
  bool needsAuth;
  String id;
  String name;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  factory ActionArea.fromJson(Map<String, dynamic> json) => ActionArea(
        description: json["description"],
        isEnabled: json["isEnabled"],
        needsAuth: json["needsAuth"],
        id: json["_id"],
        name: json["name"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "description": description,
        "isEnabled": isEnabled,
        "needsAuth": needsAuth,
        "_id": id,
        "name": name,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}
