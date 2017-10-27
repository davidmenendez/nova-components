const Request = (method, action) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, action);
  xhr.onload = () => resolve(JSON.parse(xhr.responseText));
  xhr.onerror = () => reject(xhr.statusText);
  xhr.send();
});

export default Request;
