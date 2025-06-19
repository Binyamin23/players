interface Todo {
    parentId: string
    id: string
}
    const findChildren = (todos: Todo[], parentId: string): string[] => {
      return todos.filter(todo => todo.parentId === parentId).reduce<string[]>((allDescendants, todo) => {
          return [...allDescendants, todo.id, ...findChildren(todos, todo.id)]
      }, []);
    };

    export const filterChildsTodos = (todos: Todo[], id: string) => {
        const allIdsToRemove = [id, ...findChildren(todos, id)];

        return allIdsToRemove;
    }