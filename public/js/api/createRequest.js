/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest,
  formData = new FormData;
    let url = options.url;

    if (options.method === 'GET') {
      if (options.data) {
         url = options.url + '?';
         for (let prop in options.data) {
            url += prop + '=' + options.data[prop] + '&';
          }
         url = url.substring(0, url.length - 1);
      }
    } else {
        for (let prop in options.data) {           
            formData.append(prop, options.data[prop]);
        }
    }

    xhr.responseType = 'json';

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (err) {
        options.callback(err); 
    }

    xhr.onload = () => {
        if(xhr.response) {
            if(xhr.response.success) {
                options.callback(null, xhr.response);
            }
            else {
                options.callback(xhr.response.error);
            }
        }    
    }
};
