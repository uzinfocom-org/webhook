// Find out whether what kind of github webhook event it is
export const stateFinder = (data: any): string => {
  const { action, pull_request, issue, comment } = data;
  if (action === "opened" && pull_request) {
    return "pull_request_opened";
  } else if (action === "closed" && pull_request) {
    return "pull_request_closed";
  } else if (action === "created" && issue) {
    return "issue_created";
  } else if (action === "created" && comment) {
    return "comment_created";
  } else {
    return "unknown";
  }
}
