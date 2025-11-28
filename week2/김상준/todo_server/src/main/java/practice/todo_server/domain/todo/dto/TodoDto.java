package practice.todo_server.domain.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import practice.todo_server.domain.todo.entity.Todo;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDto {
    private Long id;
    private String text;
    private boolean done;

    public static TodoDto fromEntity(Todo todo) {
        return TodoDto.builder()
                .id(todo.getId())
                .text(todo.getText())
                .done(todo.isDone())
                .build();
    }
}
