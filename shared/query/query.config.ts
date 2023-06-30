export const createPostQuery = (url: string, body: any) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });

export const createGetQuery = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });

export const createPutQuery = (url: string, body: any) =>
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });

export const createDeleteQuery = (url: string) =>
  fetch(url, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });
