export const parseRequestURL = () => {
    const url = location.hash.slice(2),
        request = {};

    [request.resource, request.action, request.id, request.pageId] = url.split('/');

    return request;
};
