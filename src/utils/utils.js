export function createUniqueID() {
  return crypto.randomUUID();
}

export function validateProjectFields(title, description, dueDate) {
  if (!title) {
    return { valid: false, message: "Title cannot be empty" };
  }

  if (!description) {
    return { valid: false, message: "Description cannot be empty" };
  }

  if (!dueDate || new Date(dueDate) < new Date()) {
    return { valid: false, message: "Invalid date" };
  }

  return { valid: true };
}
