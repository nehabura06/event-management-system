package com.eventmanagement.backend.repository;

import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository
        extends JpaRepository<Schedule, Long> {

    List<Schedule> findByEvent(Event event);
}