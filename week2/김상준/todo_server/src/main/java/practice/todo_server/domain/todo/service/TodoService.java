package practice.todo_server.domain.todo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import practice.todo_server.domain.todo.dto.TodoDto;
import practice.todo_server.domain.todo.entity.Todo;
import practice.todo_server.domain.todo.repository.TodoRepository;
import practice.todo_server.domain.user.entity.User;
import practice.todo_server.domain.user.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    // ✅ 유저의 할 일 목록 조회 (조회 전용)
    @Transactional
    public List<TodoDto> getTodosByUserNickname(String nickname) {
        User user = userRepository.findByNickname(nickname)
                .orElseGet(() -> userRepository.save(new User(nickname)));

        return user.getTodos().stream()
                .map(TodoDto::fromEntity)
                .collect(Collectors.toList());
    }

    // ✅ 새 할 일 추가 (쓰기 가능)
    @Transactional
    public TodoDto addTodo(String nickname, String text) {
        User user = userRepository.findByNickname(nickname)
                .orElseGet(() -> userRepository.save(new User(nickname)));

        Todo todo = Todo.builder().text(text).done(false).build();
        user.addTodo(todo);
        return TodoDto.fromEntity(todoRepository.save(todo));
    }

    // ✅ 완료 상태 변경
    @Transactional
    public boolean toggleDone(Long todoId, boolean done) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 할 일입니다."));
        todo.changeDoneState(done);
        return true;
    }

    // ✅ 할 일 삭제
    @Transactional
    public void deleteTodo(Long todoId) {
        if (!todoRepository.existsById(todoId)) {
            throw new IllegalArgumentException("존재하지 않는 할 일입니다.");
        }
        todoRepository.deleteById(todoId);
    }
}
