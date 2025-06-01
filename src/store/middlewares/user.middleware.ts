const user = () => (next: any) => (action: any) => {
    let result = next(action);
    return result;
}

export default user;
