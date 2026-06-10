package com.eventmanagement.backend.repository;

import com.eventmanagement.backend.entity.Registration;
import com.eventmanagement.backend.entity.User;
import com.eventmanagement.backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RegistrationRepository
        extends JpaRepository<Registration, Long> {

    boolean existsByUserAndEvent(
            User user,
            Event event
    );

    Registration findByUserAndEvent(
            User user,
            Event event
    );

    List<Registration> findByUser(User user);

    long countByEvent(Event event);
}