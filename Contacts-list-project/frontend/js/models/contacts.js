class Contacts {

  async getContactsList() {
    let response = await fetch('http://localhost:3000/api/getContacts');
    let data = await response.json();

    return data;
  }

  async setNewContact(data) {
    let response = await fetch('http://localhost:3000/api/setNewContact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    return await response.ok;
  }

  async editContact(data) {
    let response = await fetch('http://localhost:3000/api/editContact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })

    return await response.ok;
  }

  async deleteContacts(data) {
    let response = await fetch('http://localhost:3000/api/deleteContacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    return await response.ok;
  }

  async setSearchResult(data) {
    let response = await fetch('http://localhost:3000/api/setSearchResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    return await response.json()
  }

  async getContactData(contactId) {
    let response = await fetch(`http://localhost:3000/api/getContactData/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    return await response.json()
  }

  async getFoundContactsList(searchId) {
    let response = await fetch(`http://localhost:3000/api/getFoundContacts/${searchId}`);

    return response.ok ? await response.json() : response.ok;
  }

  async resetSearch() {
    await fetch('http://localhost:3000/api/resetSearch');
  }

}

export default Contacts;
