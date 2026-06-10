package com.eventmanagement.backend.repository;

import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.entity.Feedback;
import com.eventmanagement.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository
        extends JpaRepository<Feedback, Long> {

    boolean existsByUserAndEvent(
            User user,
            Event event);

    List<Feedback> findByEvent(
            Event event);
}