
export const users = [ { id: 1, name: "Amos", email: "amos@example.com", role: "admin", active: true }, 
  { id: 2, name: "John", email: "john@example.com", role: "developer", active: true }, 
  { id: 3, name: "Mary", email: "mary@example.com", role: "developer", active: false }];

export const projects = [ 
  { id: 1, 
    name: "TaskForge API", 
    description: "Backend training project", 
    ownerId: 1, 
    status: "active" },

    { id: 2, 
    name: "Bassirou Test", 
    description: "Linux Training", 
    ownerId: 1, 
    status: "active" }

];

export const tasks = [ 
  { 
    id: 1, 
    title: "Create project routes", 
    description: "Build all project endpoints", 
    projectId: 1, 
    assignedTo: 2, 
    priority: "high", 
    status: "todo" }, 
    { id: 2, 
      title: "Create task controller", 
      description: "Implement task CRUD operations", 
      projectId: 2, 
      assignedTo: 3, 
      priority: "medium", 
      status: "in-progress" }];
