package practice.todo_server.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;
import practice.todo_server.domain.todo.entity.Todo;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA용 기본 생성자
@Table(name = "users")
public class User {

    // 내부용 식별자 (DB 기본키)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 외부 노출용 식별자 (REST API용)
    @Column(nullable = false, unique = true, updatable = false)
    private UUID publicId = UUID.randomUUID();

    // 닉네임 (생성 시 1회만 설정, 이후 변경 불가)
    @Column(nullable = false, unique = true, length = 50, updatable = false)
    private String nickname;

    // 유저가 가진 할 일 목록 (User 삭제 시 Todo도 삭제)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Todo> todos = new ArrayList<>();

    // 생성자 (Builder 또는 직접 new 가능)
    @Builder
    public User(String nickname) {
        this.nickname = nickname;
    }

    // 양방향 관계 편의 메서드
    public void addTodo(Todo todo) {
        todos.add(todo);
        todo.assignUser(this);
    }
}
