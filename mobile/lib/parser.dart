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

ActionsArea actionsFromJson(String str) =>
    ActionsArea.fromJson(json.decode(str));

String actionsToJson(ActionsArea data) => json.encode(data.toJson());

class ActionsArea {
  ActionsArea({
    required this.actions,
    required this.count,
  });

  List<ActionArea> actions;
  int count;

  factory ActionsArea.fromJson(Map<String, dynamic> json) => ActionsArea(
        actions: List<ActionArea>.from(
            json["actions"].map((x) => ActionArea.fromJson(x))),
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

// To parse this JSON data, do
//
//     final serviceStatuses = serviceStatusesFromJson(jsonString);

ServiceStatuses serviceStatusesFromJson(String str) =>
    ServiceStatuses.fromJson(json.decode(str));

String serviceStatusesToJson(ServiceStatuses data) =>
    json.encode(data.toJson());

class ServiceStatuses {
  ServiceStatuses({
    required this.serviceStatuses,
    required this.count,
  });

  List<ServiceStatus> serviceStatuses;
  int count;

  factory ServiceStatuses.fromJson(Map<String, dynamic> json) =>
      ServiceStatuses(
        serviceStatuses: List<ServiceStatus>.from(
            json["serviceStatuses"].map((x) => ServiceStatus.fromJson(x))),
        count: json["count"],
      );

  Map<String, dynamic> toJson() => {
        "serviceStatuses":
            List<dynamic>.from(serviceStatuses.map((x) => x.toJson())),
        "count": count,
      };
}

class ServiceStatus {
  ServiceStatus({
    this.auth,
    required this.isConnected,
    required this.isEnabled,
    required this.id,
    required this.service,
    required this.serviceName,
    required this.user,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  Auth? auth;
  bool isConnected;
  bool isEnabled;
  String id;
  String service;
  String serviceName;
  String user;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  factory ServiceStatus.fromJson(Map<String, dynamic> json) => ServiceStatus(
        auth: json["auth"] == null ? null : Auth.fromJson(json["auth"]),
        isConnected: json["isConnected"],
        isEnabled: json["isEnabled"],
        id: json["_id"],
        service: json["service"],
        serviceName: json["serviceName"],
        user: json["user"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "auth": auth?.toJson(),
        "isConnected": isConnected,
        "isEnabled": isEnabled,
        "_id": id,
        "service": service,
        "serviceName": serviceName,
        "user": user,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

class Auth {
  Auth({
    required this.accessToken,
    this.refreshToken,
    required this.expiresIn,
  });

  String accessToken;
  String? refreshToken;
  int expiresIn;

  factory Auth.fromJson(Map<String, dynamic> json) => Auth(
        accessToken: json["accessToken"],
        refreshToken: json["refreshToken"],
        expiresIn: json["expires_in"],
      );

  Map<String, dynamic> toJson() => {
        "accessToken": accessToken,
        "refreshToken": refreshToken,
        "expires_in": expiresIn,
      };
}

// To parse this JSON data, do
//
//     final workflowStatuses = workflowStatusesFromJson(jsonString);

WorkflowStatuses workflowStatusesFromJson(String str) =>
    WorkflowStatuses.fromJson(json.decode(str));

String workflowStatusesToJson(WorkflowStatuses data) =>
    json.encode(data.toJson());

class WorkflowStatuses {
  WorkflowStatuses({
    required this.workflows,
    required this.count,
  });

  List<Workflow> workflows;
  int count;

  factory WorkflowStatuses.fromJson(Map<String, dynamic> json) =>
      WorkflowStatuses(
        workflows: List<Workflow>.from(
            json["workflows"].map((x) => Workflow.fromJson(x))),
        count: json["count"],
      );

  Map<String, dynamic> toJson() => {
        "workflows": List<dynamic>.from(workflows.map((x) => x.toJson())),
        "count": count,
      };
}

class Workflow {
  Workflow({
    required this.description,
    required this.actions,
    required this.reactions,
    required this.serviceAction,
    required this.serviceReaction,
    required this.id,
    required this.additionalData,
    required this.name,
    required this.relativeUser,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  String description;
  List<String> actions;
  List<String> reactions;
  String serviceAction;
  String serviceReaction;
  String id;
  List<AdditionalDatum> additionalData;
  String name;
  String relativeUser;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  factory Workflow.fromJson(Map<String, dynamic> json) => Workflow(
        description: json["description"],
        actions: List<String>.from(json["actions"].map((x) => x)),
        reactions: List<String>.from(json["reactions"].map((x) => x)),
        serviceAction: json["serviceAction"],
        serviceReaction: json["serviceReaction"],
        id: json["_id"],
        additionalData: List<AdditionalDatum>.from(
            json["additionalData"].map((x) => AdditionalDatum.fromJson(x))),
        name: json["name"],
        relativeUser: json["relativeUser"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "description": description,
        "actions": List<dynamic>.from(actions.map((x) => x)),
        "reactions": List<dynamic>.from(reactions.map((x) => x)),
        "serviceAction": serviceAction,
        "serviceReaction": serviceReaction,
        "_id": id,
        "additionalData":
            List<dynamic>.from(additionalData.map((x) => x.toJson())),
        "name": name,
        "relativeUser": relativeUser,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

class AdditionalDatum {
  AdditionalDatum({
    required this.repoOwner,
    required this.repoName,
    required this.prNumber,
    required this.repoOwner2,
    required this.repoName2,
    required this.titleIssue,
    required this.bodyIssue,
    required this.localisation,
    required this.subject,
    required this.content,
    required this.to,
    required this.subjectEvent,
    required this.contentEvent,
    required this.startDate,
    required this.endDate,
    required this.playlistUrl,
    required this.newPlaylistName,
    required this.trackName,
    required this.issueNb,
    this.projectId,
    this.branch,
    this.commitMessage,
    this.filePath,
  });

  String repoOwner;
  String repoName;
  String prNumber;
  String repoOwner2;
  String repoName2;
  String titleIssue;
  String bodyIssue;
  String localisation;
  String subject;
  String content;
  String to;
  String subjectEvent;
  String contentEvent;
  String startDate;
  String endDate;
  String playlistUrl;
  String newPlaylistName;
  String trackName;
  String issueNb;
  String? projectId;
  String? branch;
  String? commitMessage;
  String? filePath;

  factory AdditionalDatum.fromJson(Map<String, dynamic> json) =>
      AdditionalDatum(
        repoOwner: json["repoOwner"],
        repoName: json["repoName"],
        prNumber: json["prNumber"],
        repoOwner2: json["repoOwner2"],
        repoName2: json["repoName2"],
        titleIssue: json["titleIssue"],
        bodyIssue: json["bodyIssue"],
        localisation: json["localisation"],
        subject: json["subject"],
        content: json["content"],
        to: json["to"],
        subjectEvent: json["subjectEvent"],
        contentEvent: json["contentEvent"],
        startDate: json["startDate"],
        endDate: json["endDate"],
        playlistUrl: json["playlistUrl"],
        newPlaylistName: json["newPlaylistName"],
        trackName: json["trackName"],
        issueNb: json["issueNb"],
        projectId: json["projectID"],
        branch: json["branch"],
        commitMessage: json["commitMessage"],
        filePath: json["filePath"],
      );

  Map<String, dynamic> toJson() => {
        "repoOwner": repoOwner,
        "repoName": repoName,
        "prNumber": prNumber,
        "repoOwner2": repoOwner2,
        "repoName2": repoName2,
        "titleIssue": titleIssue,
        "bodyIssue": bodyIssue,
        "localisation": localisation,
        "subject": subject,
        "content": content,
        "to": to,
        "subjectEvent": subjectEvent,
        "contentEvent": contentEvent,
        "startDate": startDate,
        "endDate": endDate,
        "playlistUrl": playlistUrl,
        "newPlaylistName": newPlaylistName,
        "trackName": trackName,
        "issueNb": issueNb,
        "projectID": projectId,
        "branch": branch,
        "commitMessage": commitMessage,
        "filePath": filePath,
      };
}
