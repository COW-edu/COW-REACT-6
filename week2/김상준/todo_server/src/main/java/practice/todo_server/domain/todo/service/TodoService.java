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

    // ✅ 유저의 할 일 목록 조회
    @Transactional(readOnly = true)
    public List<TodoDto> getTodosByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        return user.getTodos().stream()
                .map(TodoDto::fromEntity)
                .collect(Collectors.toList());
    }

    // ✅ 새 할 일 생성
    @Transactional
    public TodoDto addTodo(Long userId, String text) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        Todo todo = Todo.builder()
                .text(text)
                .done(false)
                .build();

        user.addTodo(todo);

        return TodoDto.fromEntity(todoRepository.save(todo));
    }

    // ✅ 완료 상태 변경 (보안 강화)
    @Transactional
    public TodoDto toggleDone(Long userId, Long todoId, boolean done) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 할 일입니다."));

        // 🚨 내 Todo인지 확인
        if (!todo.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("해당 할 일에 대한 권한이 없습니다.");
        }

        todo.changeDoneState(done);
        return TodoDto.fromEntity(todo);
    }

    // ✅ 삭제 (보안 강화)
    @Transactional
    public void deleteTodo(Long userId, Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 할 일입니다."));

        if (!todo.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("해당 할 일에 대한 권한이 없습니다.");
        }

        todoRepository.delete(todo);
    }

    // ✅ 텍스트 수정 (보안 강화)
    @Transactional
    public TodoDto updateTodoText(Long userId, Long todoId, String newText) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 할 일입니다."));

        if (!todo.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("해당 할 일에 대한 권한이 없습니다.");
        }

        todo.changeText(newText);
        return TodoDto.fromEntity(todo);
    }
}
