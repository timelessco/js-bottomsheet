export const setToLocalStorage = item => {
  localStorage.setItem("array", item);
};

export const removeFromLocalStorage = () => {
  localStorage.removeItem("array");
};
