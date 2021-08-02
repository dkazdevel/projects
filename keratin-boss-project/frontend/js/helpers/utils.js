export const parseRequestURL = () => {
    const url = location.hash.slice(2),
        request = {};

    [request.resource, request.lang] = url.split('/');
    
    return request;
};
