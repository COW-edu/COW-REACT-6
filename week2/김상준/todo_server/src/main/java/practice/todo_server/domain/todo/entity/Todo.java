package practice.todo_server.domain.todo.entity;

import jakarta.persistence.*;
import lombok.*;
import practice.todo_server.domain.user.entity.User;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "todos")
@AllArgsConstructor
@Builder
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 할 일 내용
    @Column(nullable = false)
    private String text;

    // 완료 여부
    @Column(nullable = false)
    private boolean done = false;

    // User FK (연관관계의 주인)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 생성자
    @Builder
    public Todo(String text) {
        this.text = text;
    }

    public void changeDoneState(boolean done) {
        this.done = done;
    }

    public void updateText(String newText) {
        if (newText == null || newText.isBlank()) {
            throw new IllegalArgumentException("할 일 내용은 비워둘 수 없습니다.");
        }
        this.text = newText;
    }

    public void changeText(String newText) {
        if (newText == null || newText.trim().isEmpty()) {
            throw new IllegalArgumentException("할 일 내용은 비워둘 수 없습니다.");
        }
        this.text = newText;
    }

    // 양방향 관계 동기화
    public void assignUser(User user) {
        this.user = user;
        if (!user.getTodos().contains(this)) {
            user.getTodos().add(this);
        }
    }
}
