
// const ENDPOINT = 'http://localhost:3000/api/v1';
const ENDPOINT = 'http://ancient-temple-15209.herokuapp.com/api/v1';

async function _parseResponse(response) {
  if (!response) {
    throw new Error(`Tried to parse null fetch response`);
  }
  if (response.status >= 400 && response.status < 600) {
    throw new Error(`Received bad status code: ${response.status}`);
  }

  let json;
  let contentType = response.headers.get('Content-Type');
  if (contentType && contentType.indexOf('json') !== -1) {
    json = await response.json();
  } else {
    throw new Error(`Expected json but got Content-Type: ${contentType}`);
  }

  return json;
}

async function getEstablishmentAsync(placeId) {
  const url = `${ENDPOINT}/bars/${placeId}`;
  const response = await fetch(url, {
    method: 'get',
  });
  return _parseResponse(response);
}

async function addEstablishmentAsync(data) {
  const url = `${ENDPOINT}/bars`;
  const opts = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, opts);
  return _parseResponse(response);
}

async function updateEstablishmentAsync(id, hasHooks) {
  const url = `${ENDPOINT}/bars/${id}`;
  const data = {
    has_hooks: hasHooks,
  };
  const opts = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, opts);
  return _parseResponse(response);
}

export {
  getEstablishmentAsync,
  addEstablishmentAsync,
  updateEstablishmentAsync,
}

