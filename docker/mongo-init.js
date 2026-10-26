// MongoDB Replica Set and Index Initializer for CoBuild
try {
  const status = rs.status();
  print("Replica set already initiated: " + status.set);
} catch (e) {
  print("Initiating replica set rs0...");
  rs.initiate({
    _id: "rs0",
    members: [{ _id: 0, host: "localhost:27017" }]
  });
}

// Switch to cobuild database
db = db.getSiblingDB("cobuild");

// Collections and Index definitions
print("Creating initial collections and indexes...");

// users: email unique, roles index
db.createCollection("users");
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ roles: 1 });
db.users.createIndex({ status: 1 });

// skills: canonicalName unique
db.createCollection("skills");
db.skills.createIndex({ canonicalName: 1 }, { unique: true });
db.skills.createIndex({ aliases: 1 });

// requirementPosts: text search index, compound filters
db.createCollection("requirementPosts");
db.requirementPosts.createIndex({
  title: "text",
  businessContext: "text",
  deliverables: "text"
});
db.requirementPosts.createIndex({ status: 1, categoryId: 1, createdAt: -1 });
db.requirementPosts.createIndex({ ownerId: 1, status: 1 });
db.requirementPosts.createIndex({ requiredSkillIds: 1 });

// applications: UNIQUE partial index on (postId, builderId) for active applications
db.createCollection("applications");
db.applications.createIndex(
  { postId: 1, builderId: 1 },
  { 
    unique: true, 
    partialFilterExpression: { status: { $in: ["PENDING", "SHORTLISTED", "ACCEPTED"] } } 
  }
);
db.applications.createIndex({ postId: 1, status: 1 });
db.applications.createIndex({ builderId: 1, status: 1 });

// collaborations: UNIQUE on applicationId
db.createCollection("collaborations");
db.collaborations.createIndex({ applicationId: 1 }, { unique: true });
db.collaborations.createIndex({ founderId: 1, status: 1 });
db.collaborations.createIndex({ builderId: 1, status: 1 });

// conversations: participantIds & collaborationId
db.createCollection("conversations");
db.conversations.createIndex({ collaborationId: 1 });
db.conversations.createIndex({ participantIds: 1 });

// messages: conversationId + createdAt compound
db.createCollection("messages");
db.messages.createIndex({ conversationId: 1, createdAt: -1 });

// reviews: UNIQUE (collaborationId, reviewerId)
db.createCollection("reviews");
db.reviews.createIndex({ collaborationId: 1, reviewerId: 1 }, { unique: true });

// reports: targetType + targetId, status
db.createCollection("reports");
db.reports.createIndex({ targetType: 1, targetId: 1 });
db.reports.createIndex({ status: 1, createdAt: -1 });

// adminAuditLogs: append-only index on actorId, targetId, createdAt
db.createCollection("adminAuditLogs");
db.adminAuditLogs.createIndex({ actorId: 1, createdAt: -1 });
db.adminAuditLogs.createIndex({ targetType: 1, targetId: 1 });

print("CoBuild database initialization completed successfully.");
