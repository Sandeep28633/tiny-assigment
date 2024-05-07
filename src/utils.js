const getUsersFromLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    return users || [];
}

const saveUserstoLocalStorage = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
}

export {getUsersFromLocalStorage, saveUserstoLocalStorage};