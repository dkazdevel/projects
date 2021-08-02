class Emails {
  sendEmailToOffice(emailObj){
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', `/apitry/sendEmail`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve();

      xhr.send(JSON.stringify(emailObj));
    });
  }
}

export default Emails;
