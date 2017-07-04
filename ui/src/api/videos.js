
export function logSuccess({ data }) {
    console.log(error);
};

export function logFail(error) {;
    console.log(error);
};

export function uploadVideoRequest({ file, title, description }) {  
    let data = new FormData();
    data.append('video', document);
    data.append('description', description);
    data.append('name', name);
 
    const request = {
        method: 'post',
        body: data
    };    
    
    fetch('/api/',request,)
        .then(response => logSuccess(response))
        .catch(error => logFail(error));
    
}