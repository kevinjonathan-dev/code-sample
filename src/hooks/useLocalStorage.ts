function useLocalStorage(): {
  read: (key: string) => any;
  write: (key: string, value: any) => any;
} {
  const read = (key: string) => {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  };

  const write = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));

    return value;
  };

  return { read, write };
}

export default useLocalStorage;
