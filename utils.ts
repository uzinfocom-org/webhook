// Find out whether what kind of github webhook event it is
// required states: push, pull_request, issues, issue_comment
export const stateFinder = (data: any): string => {
  if (data.issue) {
    return "issues";
  } else if (data.pull_request) {
    return "pull_request";
  } else if (data.comment) {
    return "issue_comment";
  } else if (data.ref) {
    return "push";
  } else {
    return "unknown";
  }
}
