package practice.todo_server.domain.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import practice.todo_server.domain.todo.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
